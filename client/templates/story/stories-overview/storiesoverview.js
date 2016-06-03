var storyObj;

Template.storyOverview.onCreated(function() {
    Meteor.subscribe("storyById", 'jpoKnKgBSqTHRPrkL');
});

Template.storyOverview.onRendered(function(){
    storyObj = Story.findOne({'_id': 'jpoKnKgBSqTHRPrkL'});
});

Template.storyOverview.helpers({
    story: () => Story.findOne({'_id': 'jpoKnKgBSqTHRPrkL'}),

    variable: function() {
        var date = Chronos.currentTime();

        if(this.text === 'name'){
            var name = Meteor.user().profile.name;
            return name;
        } else if(this.text === 'namefirstletter'){
            var name = Meteor.user().profile.name;
            name = name[0] + ".";
            return name;
        } else if(this.text === 'day'){
            // var date = Chronos.currentTime();
            var day = date.getDay();
            var dayName = convertDay(day);
            return dayName;
        } else if (this.text === 'month'){
            // var date = Chronos.currentTime();
            var month = date.getMonth();
            var monthName = convertMonth(month);
            return monthName;
        } else if(this.text === "time"){
            // var date = Chronos.currentTime();
            var hour = date.getHours();
            var hourName =  convertHour(hour);
            return hourName;
        } else if(this.text === "seconds"){
            // var date = Chronos.currentTime();
            var seconds = date.getSeconds();

            return seconds;
        } else if(this.text === "dayandtime"){
            var hour = convertHour(date.getHours());
            var day = convertDay(date.getDay());
            var together = day.concat(hour);

            return together;
        } else {
        }
    }
});