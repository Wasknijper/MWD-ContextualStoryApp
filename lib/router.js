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
        var readerId;
        if(Session.get('readingAs')){
            readerId = Session.get('readingAs').id;
        } else { readerId = Meteor.userId(); }
        return [Meteor.subscribe("storyById", this.params.id),
                Meteor.subscribe("fallbacks")]
    },
    data: function() {
        var data = {};
        var readerId;
        if(Session.get('readingAs')){
            readerId = Session.get('readingAs').id;
        } else { readerId = Meteor.userId(); }
        if(Story.findOne({_id: this.params.id})){
            data.story = Story.findOne({_id: this.params.id});
        }
        if(Fallback.findOne({})){
            data.fallbacks = Fallback.findOne({});
        }
        // if(Weather.findOne({}, {sort: {createdOn: -1}})){
        //     data.weather = Weather.findOne({}, {sort: {createdOn: -1}});
        // }
        // if(FacebookData.findOne({'userId': readerId})){
        //     console.log('do i happen?');
        //     data.facebook = FacebookData.findOne({'userId': readerId});
        // }
        return data;
    }
});

Router.route('fallbacks', function(){
    this.render('fallbackSettings');
});

Router.route('settings', function(){
    this.render('settings');
});