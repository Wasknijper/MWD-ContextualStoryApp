Template.menu.events({
    'click #menu-button': function(event) {
        $('.menu nav').toggleClass('hidden');
    },

    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});