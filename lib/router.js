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
    this.render('storyOverview');
});

Router.route('story', function(){
    this.render('story');
});

Router.route('new', function(){
    this.render('newStory');
});

Router.route('edit', function(){
    this.render('editStory');
});


Router.route('edit/:id', {
    name: 'edit story',
    template: 'editStoryDetail',
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