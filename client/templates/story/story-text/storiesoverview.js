var storyObj;

Template.storyText.onCreated(function() {
    Meteor.subscribe("storyById", 'jpoKnKgBSqTHRPrkL');
    Meteor.subscribe("lastWeather");
});

Template.storyText.onRendered(function(){
    storyObj = Story.findOne({'_id': 'jpoKnKgBSqTHRPrkL'});
});

Template.storyText.helpers({
    story: () => Template.currentData(),

    variable: function() {
        var date = Chronos.currentTime();
        var weather = Weather.findOne({}, {sort: {createdOn: -1}});
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
            return weather.description[0];
        } else if (this.text === "weatherdescriptive") {
            return weather.description[1];
        } else {
            return;
        }
    }
});