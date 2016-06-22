Template.fallbackSettings.onRendered(function () {
    Meteor.subscribe('fallbacks');
});

Template.fallbackSettings.events({
    'click #submit' : function(e){
        e.preventDefault();
        var elements = $('.fallback-input');
        var newFallbacks = {};
        var fallbacks = Fallback.findOne({});
        for(i = 0; i < elements.length; i++) {
            var key = elements[i].name;
            var value = elements[i].value || '';
            newFallbacks[key] = value;
        }
        Meteor.call('updateFallbacks', fallbacks._id, newFallbacks, function(err, res){
            if(err){
                Session.set('updatedFallback', 'Er is iets mis gegaan');
                console.log(err)
            } else {
                Session.set('updatedFallback', 'Wijzingen opgeslagen');
            }
            $('html, body').animate({ scrollTop: 0 }, 'fast');
        });
    }
});

Template.fallbackSettings.helpers({
    saveMesage: function() {
        return Session.get('updatedFallback');
    },

    values: function() {
        var data = Fallback.findOne({});
        if(data){
            return data;
        }
    }
})
