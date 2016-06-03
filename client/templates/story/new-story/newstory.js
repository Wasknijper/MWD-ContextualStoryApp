Template.newStory.onCreated(function newStoryOnCreated() {
    Session.set('submitStory', '');
});

Template.newStory.events({
    'click #submit-button' : function(e){
        var title = $("input[name=title")[0];
        var textarea = $("textarea[name=story")[0];
        var text = formatStoryText(textarea.value);

        console.log(text);

        var story = {
            createdBy : Meteor.userId(),
            createdOn : new Date(),
            title: title.value,
            text: text
        };

        Meteor.call('addStory', story, function(err, res){
            if(err){
                Session.set('submitStory', 'Er is iets mis gegaan');
                console.log(err)
            } else {
                Session.set('submitStory', 'Je verhaal is opgeslagen');
                title.value = '';
                textarea.value = '';
            }
        })
    }
});

Template.newStory.helpers({
    submitMessage : () => Session.get('submitStory')
})