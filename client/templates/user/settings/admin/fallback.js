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
        Meteor.call('updateFallbacks', fallbacks._id, newFallbacks);
    }
});

Template.fallbackSettings.helpers({
    values: function() {
        var data = Fallback.findOne({});
        if(data){
            return data;
        }
    }
})
