Template.editStory.onRendered(function () {
    Meteor.subscribe('storiesByUser', Meteor.userId());
});

Template.editStory.helpers({
    stories: () => Story.find({'createdBy': Meteor.userId()})
});