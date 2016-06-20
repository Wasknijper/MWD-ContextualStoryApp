Template.menu.onRendered(function(){
});

Template.menu.helpers({
    impersonating: function(){
        if(Session.get('readingAs')) {
            var readingAs = Session.get('readingAs');
            return readingAs.name;
        }
        return null;
    }
})

Template.menu.events({
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