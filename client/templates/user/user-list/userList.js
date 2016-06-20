Template.userList.onRendered(function () {
    Meteor.subscribe('allUsers', Meteor.user());
});

Template.userList.events({
    'click button' : function(e) {
        console.log(e.currentTarget.name);
        console.log(e.currentTarget.id);
        Session.set('readingAs', {name: e.currentTarget.name, id: e.currentTarget.id});
    }
})

Template.userList.helpers({
    users: () => Meteor.users.find({})
});