Template.menu.onRendered(function(){
    if($(window).innerWidth() > 960) {
        $('.menu nav').removeClass('hidden');
    } else {
        console.log('wat');
    }
});

Template.menu.helpers({
    readingStory: () => Session.get('readingStory'),

    isAdmin: () => Roles.userIsInRole(Meteor.userId(), 'admin', 'admins'),

    impersonating: function(){
        if(Session.get('readingAs')) {
            var readingAs = Session.get('readingAs');
            return readingAs.name;
        }
        return null;
    }
})

Template.menu.events({
    'click #back': function(event) {
        window.history.back();
    },

    'click #menu-button': function(event) {
        $('.menu nav').toggleClass('hidden');
    },

    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    },

    'click #clear': function(event){
        event.preventDefault();
        Session.set('readingAs', undefined);
    }
});