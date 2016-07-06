var location  = undefined;
var spansChecked = false;
var timeout = undefined;

var fixPunctuation = function() {
    var span = $('.story-text p span');
    for(var i = 0; i < span.length; i++) {
        if(span[i].className){
            var index = i;
            var nextIndex = index + 1;
            if(!span[nextIndex]){
                return;
            }
            var text = span[nextIndex].innerHTML;
            var firstChar = text.substring(0,1);
            if(firstChar === '.' || firstChar === ','){
                span[i].classList.add('formatting');
            }
        }
    }
};

var isScrolledIntoView = function(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while(el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
    );
}


Template.storyText.onCreated(function() {
    timeout = undefined;

    Meteor.subscribe("lastWeather", {
        onReady: () => Session.set('weatherLoaded', true)
    });
    if(Session.get('readingAs')){
        var session = Session.get('readingAs');
        Meteor.subscribe("facebookDataCurrentUser", session.id, {
            onReady: () => Session.set('facebookLoaded', true)
        });
    } else {
        Meteor.subscribe("facebookDataCurrentUser", Meteor.userId(), {
            onReady: () => Session.set('facebookLoaded', true)
        });
    }
    if(navigator.geolocation) {
        var onSuccess = function(position) {
            var geo = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + " ," + position.coords.longitude + "&key=AIzaSyDyViN5tiPa3bD0qtBjZj8ejkFyp8UOXNY";

            $.getJSON(geo).done(function(res) {
                location = new ReactiveVar(res.results[0].address_components);
            });
        }

        var onError = function(err){
            console.log(err);
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    $('body').addClass('reading');
    $('main').addClass('story-text-main');

    $(document).on('mousemove', function() {
        clearTimeout(timeout);
        if($('body').hasClass('reading') === false) {return}
        if(!Session.get('insideStoryText')){
            $('body').removeClass('idle')
        }
        timeout = setTimeout(function() {
            $('body').addClass('idle')
        }, 10000);
    });
});

Template.storyText.onRendered(function(){
    Session.set('readingStory', true);

    var spans = $('.story-text span');
    var spanVisible = 0;
    var savePosition = {};
    var n = window.location.pathname.lastIndexOf('/');
    var id = window.location.pathname.substring(n + 1);

    $(document).scroll(function() {
        var cutoff = $(window).scrollTop();
        $('.story-text span').each(function(i) {
            if ($(this).offset().top > cutoff) {
                var index = i;
                Meteor.call('updateProfile', id, index);
                return false;
            }
        });
    });

    $(window).keydown(function(e) {
        //86 = v key
        if(e.shiftKey && e.keyCode === 86) {
            $('.variable').toggleClass('bold');
        }
    });

    //scroll to the last paragraph user
    if(Meteor.user().profile[id]){
        var num = Meteor.user().profile[id];
        $('html, body').animate({
            scrollTop: ($(spans[num]).offset().top)
        },500);
    };

});

Template.storyText.onDestroyed(function(){
    Session.set('readingStory', false);
    clearTimeout(timeout);
    $('body').removeClass('reading');
    $('body').removeClass('idle');
    $('main').removeClass('story-text-main');
    $(window).off();
    $(document).off();
});

Template.storyText.events({
    'click .plus': function(){
        var fontSize = parseInt($("body").css("font-size"));
        fontSize = fontSize + 1 + "px";
        $("body").css({'font-size':fontSize});
    },

    'click .min': function(){
        var fontSize = parseInt($("body").css("font-size"));
        fontSize = fontSize - 1 + "px";
        $("body").css({'font-size':fontSize});
    }
});

Template.storyText.helpers({
    story: () => Template.currentData().story,

    isAdmin: () => Roles.userIsInRole(Meteor.userId(), 'admin', 'admins'),

    variable: function() {
        fixPunctuation();

        var date = Chronos.currentTime();
        var fallbacks = Template.parentData().fallbacks;
        var weather, facebook;
        var readerId;
        if(Session.get('readingAs')){
            readerId = Session.get('readingAs').id;
        } else { readerId = Meteor.userId(); }

        if(Session.get('facebookLoaded') && Session.get('weatherLoaded')){
            weather = Weather.findOne({}, {sort: {createdOn: -1}});
            facebook = FacebookData.findOne({'userId': readerId});
        }

        var spans = $('.story-text p span');

        switch(this.text){
            case 'name':
                if(Session.get('readingAs')){
                    return name = Session.get('readingAs').name;
                } else if (Meteor.user().profile.name) {
                    return name = Meteor.user().profile.name;
                } else {
                    return name = fallbacks.name;
                }

            case 'namefirstletter':
                var name;
                if(Session.get('readingAs')){
                    name = Session.get('readingAs').name;
                } else if (Meteor.user().profile.name) {
                    name = Meteor.user().profile.name;
                } else {
                    name = fallbacks.name;
                }
                name = name[0] + ".";
                return name;

            case 'day':
                var day = date.getDay();
                var dayName = convertDay(day);
                if(!dayName) { return fallbacks.month }
                return dayName;

            case 'month':
                var month = date.getMonth();
                var monthName = convertMonth(month);
                if(!monthName) { return fallbacks.month }
                return monthName;

            case 'time':
                var hour = date.getHours();
                var hourName =  convertHour(hour);
                if(!hourName) { return fallbacks.hour }
                return hourName;

            case 'seconds':
                var seconds = date.getSeconds();
                if(!seconds) { return fallbacks.seconds }
                return seconds;

            case 'dayandtime':
                var hour = convertHour(date.getHours());
                var day = convertDay(date.getDay());
                var together = day.concat(hour);
                if(!together) { return fallbacks.dayandtime };
                return together;

            case 'weather':
                if(!weather){return fallbacks.weather;}
                return weather.description[0];

            case 'weatherdescriptive':
                if(!weather){return fallbacks.weatherdescriptive;}
                return weather.description[1];

            case 'music':
                if(!facebook){return fallbacks.music;}
                return facebook.data.music.data[0].name;

            case 'education':
                if(!facebook){return fallbacks.education;}
                var index = facebook.data.education.length - 1;
                return facebook.data.education[index].concentration[0].name;

            case 'school':
                if(!facebook){return fallbacks.school;}
                var index = facebook.data.education.length - 1;
                return facebook.data.education[index].school.name;

            case 'hometown':
                if(!facebook){return fallbacks.hometown;}
                var hometown = facebook.data.hometown.name.split(",");
                return hometown[0];

            case 'work':
                if(!facebook){return fallbacks.work;}
                var index = facebook.data.work.length - 1;
                return facebook.data.work[index].employer.name;

            case 'city':
                if(!location){return fallbacks.city;}
                return location.curValue[3].long_name;

            case 'street':
                if(!location){return fallbacks.street;}
                return location.curValue[1].long_name;

            case 'country':
                if(!location){return fallback.country;}
                return location.curValue[6].long_name;

            case 'big5openess':
                if(!facebook || !facebook.applymagicsauce){return fallbacks.big5openess;}
                if(facebook.applymagicsauce.BIG5_Openness < 0.25){
                    return 'beetje open';
                } else if (facebook.applymagicsauce.BIG5_Openness < 0.5){
                    return 'redelijk open';
                } else if (facebook.applymagicsauce.BIG5_Openness < 0.75){
                    return 'tamelijk open';
                } else if (facebook.applymagicsauce.BIG5_Openness < 1){
                    return 'erg open';
                }
                return fallbacks.big5openess; ;

            case 'big5stability':
                if(!facebook || !facebook.applymagicsauce){return fallbacks.big5stability;}
                if(facebook.applymagicsauce.BIG5_Neuroticism < 0.25){
                    return 'beetje stabiel';
                } else if (facebook.applymagicsauce.BIG5_Neuroticism < 0.5){
                    return 'redelijk stabiel';
                } else if (facebook.applymagicsauce.BIG5_Neuroticism < 0.75){
                    return 'tamelijk stabiel';
                } else if (facebook.applymagicsauce.BIG5_Neuroticism < 1){
                    return 'erg stabiel';
                }
                return fallbacks.big5stability;

            case 'big5extroversion':
                if(!facebook || !facebook.applymagicsauce){return fallbacks.big5extroversion;}
                if(facebook.applymagicsauce.BIG5_Extraversion < 0.25){
                    return 'erg introvert';
                } else if (facebook.applymagicsauce.BIG5_Extraversion < 0.5){
                    return 'tamelijk introvert';
                } else if (facebook.applymagicsauce.BIG5_Extraversion < 0.75){
                    return 'tamelijk extravert';
                } else if (facebook.applymagicsauce.BIG5_Extraversion < 1){
                    return 'erg extravert';
                }
                return fallbacks.big5stability;

            case 'big5agreeableness':
                if(!facebook || !facebook.applymagicsauce){return fallbacks.big5agreeableness;}
                if(facebook.applymagicsauce.BIG5_Agreeableness < 0.25){
                    return 'erg bereid om anderen te helpen';
                } else if (facebook.applymagicsauce.BIG5_Agreeableness < 0.5){
                    return 'bereid om anderen te helpen';
                } else if (facebook.applymagicsauce.BIG5_Agreeableness < 0.75){
                    return 'op eigen interesses gericht';
                } else if (facebook.applymagicsauce.BIG5_Agreeableness < 1){
                    return 'erg op eigen interesses gericht';
                }
                return fallbacks.big5stability;

            case 'big5conscientiousness':
                if(!facebook || !facebook.applymagicsauce){return fallbacks.big5conscientiousness;}
                if(facebook.applymagicsauce.BIG5_Conscientiousness < 0.25){
                    return 'erg bewust van eigen handelen';
                } else if (facebook.applymagicsauce.BIG5_Conscientiousness < 0.5){
                    return 'tamelijk bewust van eigen handelen';
                } else if (facebook.applymagicsauce.BIG5_Conscientiousness < 0.75){
                    return 'redelijk bewust van eigen handelen';
                } else if (facebook.applymagicsauce.BIG5_Conscientiousness < 1){
                    return 'beetje bewust van eigen handelen';
                }
                return fallbacks.big5stability;

            case 'predictedage':
                if(!facebook || !facebook.applymagicsauce){return fallbacks.predictedage;}
                if(facebook.applymagicsauce.Age) {
                    return Math.round(facebook.applymagicsauce.Age);
                }
                return fallbacks.predictedage;

            default:
                return 'This variable is not valid!';
        }
    }
});