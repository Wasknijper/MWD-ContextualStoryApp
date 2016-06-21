Template.storiesOverview.onRendered(function () {
    Meteor.subscribe('allStories', Meteor.userId());
});

Template.storiesOverview.helpers({
    stories: () => Story.find({}),
    user: () => Meteor.user(),
    isAdmin: function() {
        if(Meteor.user().emails[0].address === "admin@email.nl") {
            return true
        } else {
            return false
        }
    }
});