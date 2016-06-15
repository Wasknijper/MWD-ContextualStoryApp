var location = undefined;

Template.storyText.onCreated(function() {
    Meteor.subscribe("lastWeather");
    Meteor.subscribe("facebookDataCurrentUser", Meteor.userId());
    if(navigator.geolocation) {
        var onSuccess = function(position) {
            console.log(position.coords.latitude)
            console.log(position.coords.longitude)

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
});

Template.storyText.helpers({
    story: () => Template.currentData(),

    variable: function() {
        var date = Chronos.currentTime();
        var weather = Weather.findOne({}, {sort: {createdOn: -1}});
        var facebook = FacebookData.findOne({userId: Meteor.userId()});
        if(this.text === 'name'){
            var name = Meteor.user().profile.name;
            return name;
        } else if(this.text === 'namefirstletter'){
            var name = Meteor.user().profile.name;
            name = name[0] + ".";
            return name;
        } else if(this.text === 'day'){
            var day = date.getDay();
            var dayName = convertDay(day);
            return dayName;
        } else if (this.text === 'month'){
            var month = date.getMonth();
            var monthName = convertMonth(month);
            return monthName;
        } else if(this.text === "time"){
            var hour = date.getHours();
            var hourName =  convertHour(hour);
            return hourName;
        } else if(this.text === "seconds"){
            var seconds = date.getSeconds();
            return seconds;
        } else if(this.text === "dayandtime"){
            var hour = convertHour(date.getHours());
            var day = convertDay(date.getDay());
            var together = day.concat(hour);
            return together;
        } else if (this.text === "weather") {
            if(!weather){return;}
            return weather.description[0];
        } else if (this.text === "weatherdescriptive") {
            if(!weather){return;}
            return weather.description[1];
        } else if(this.text === "music") {
            if(!facebook){return;}
            return facebook.data.music[0];
        } else if(this.text === "education") {
            if(!facebook){return;}
            var index = facebook.data.education.length - 1;
            return facebook.data.education[index].concentration[0].name
        } else if (this.text === "school") {
            if(!facebook){return;}
            var index = facebook.data.education.length - 1;
            return facebook.data.education[index].school.name
        } else if (this.text === "hometown") {
            if(!facebook){return;}
            var hometown = facebook.data.hometown.name.split(",");
            return hometown[0];
        } else if (this.text === "work") {
            if(!facebook){return;}
            var index = facebook.data.work.length - 1;
            return facebook.data.work[index].employer.name;
        } else if (this.text === "city") {
            if(!location){return;}
            return location.curValue[3].long_name;
        } else if (this.text === "street") {
            if(!location){return;}
            return location.curValue[1].long_name;
        } else if (this.text === "country") {
            if(!location){return;}
            return location.curValue[6].long_name;
        } else {
            return;
        }
    }
});