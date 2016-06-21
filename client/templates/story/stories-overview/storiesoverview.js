Template.storiesOverview.onRendered(function () {
    Meteor.subscribe('allStories', Meteor.userId());
});

Template.storiesOverview.helpers({
    stories: () => Story.find({}),
    user: () => Meteor.user(),
    isAdmin: () => Roles.userIsInRole(Meteor.userId(), 'admin', 'admins')
});