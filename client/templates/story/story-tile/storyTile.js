Template.storyTile.onRendered(function () {
    var createdBy = Template.currentData().createdBy;
    Meteor.subscribe('findUserById', createdBy);
});

Template.storyTile.helpers({
    username : function(){
        var createdBy = Template.currentData().createdBy;
        var user = Meteor.users.findOne({'_id' : createdBy});
        return user.profile.name;
    },

    createdOnFormatted: function(){
        var createdOn = Template.currentData().createdOn;
        return createdOn.getDate() + ' - ' + (createdOn.getMonth()+1) + ' - ' + createdOn.getFullYear();
    }
});