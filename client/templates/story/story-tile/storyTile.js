Template.storyTile.onRendered(function () {
    var createdBy = Template.currentData().createdBy;
    Meteor.subscribe('findUserById', createdBy);
});

Template.storyTile.helpers({
    username : function(){
        var createdBy = Template.currentData().createdBy;
        var writer = Meteor.users.findOne({'_id' : createdBy});
        if(writer){
           return writer.profile.name;
        } else {
            return '';
        }
    },

    createdOnFormatted: function(){
        var createdOn = Template.currentData().createdOn;
        return createdOn.getDate() + ' - ' + (createdOn.getMonth()+1) + ' - ' + createdOn.getFullYear();
    },

    url: function(){
        var parentTemplateName = Template.instance().view.parentView.parentView.parentView.name;
        if(parentTemplateName === 'Template.editStory') {
            return '/edit/' + Template.currentData()._id;
        } else {
            return '/story/' + Template.currentData()._id;
        }
    }
});