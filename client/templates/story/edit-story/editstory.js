Template.editStory.onRendered(function () {
    Meteor.subscribe('allStories');
});

Template.editStory.helpers({
    stories: () => Story.find({})
});