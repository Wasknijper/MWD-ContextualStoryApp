Template.storyText.onCreated(function() {
    Meteor.subscribe("lastWeather");
    Meteor.subscribe("facebookDataCurrentUser", Meteor.userId());
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
        } else {
            return;
        }
    }
});