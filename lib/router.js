Router.configure({
    layoutTemplate: 'appLayout',
    notFoundTemplate: "notFound"
});

Router.onBeforeAction(function () {
    if (!Meteor.userId()) {
        // if the user is not logged in, render the Login template
        this.render('loginAndRegister');
    } else {
        this.next();
    }
});

Router.route('/', function(){
    this.render('storiesOverview');
});

Router.route('story', function(){
    this.render('story');
});

Router.route('new', function(){
    if(Meteor.user().emails[0].address === "admin@email.nl"){
        this.render('newStory');
    } else {
        Router.go('/');
    }
});

Router.route('edit', function(){
    if(Meteor.user().emails[0].address === "admin@email.nl"){
        this.render('editStory');
    } else {
        Router.go('/');
    }
});

Router.route('userlist', function(){
    if(Meteor.user().emails[0].address === "admin@email.nl"){
        this.render('userList');
    } else {
        Router.go('/');
    }
});

Router.route('edit/:id', {
    name: 'edit story',
    template: 'editStoryDetail',
    waitOn: function(){
        if(Meteor.user().emails[0].address === "admin@email.nl"){
            return Meteor.subscribe("storyById", this.params.id);
        } else {
            Router.go('/');
        }
    },
    data: function() {
        if(Story.findOne({_id: this.params.id})){
            return Story.findOne({_id: this.params.id});
        }
    }
});

Router.route('story/:id', {
    name: 'story detail',
    template: 'storyText',
    waitOn: function(){
        return Meteor.subscribe("storyById", this.params.id);
    },
    data: function() {
        if(Story.findOne({_id: this.params.id})){
            return Story.findOne({_id: this.params.id});
        }
    }
});

Router.route('settings', function(){
    this.render('settings');
});