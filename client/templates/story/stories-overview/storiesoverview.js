Template.storiesOverview.onRendered(function () {
    Meteor.subscribe('allStories', Meteor.userId());
});

Template.storiesOverview.helpers({
    stories: () => Story.find({})
});