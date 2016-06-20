Template.newStory.onCreated(function newStoryOnCreated() {
    Session.set('submitStory', '');
});

Template.newStory.onRendered(function newStoryOnRendered() {
    $(".toggle").addClass(function() {
      return "hidden";
    });
});

Template.newStory.events({
    'click #submit-button' : function(e){
        var title = $("input[name=title")[0];
        var textarea = $("textarea[name=story")[0];
        var textareaDescription = $("textarea[name=description")[0];
        var text = formatStoryText(textarea.value);

        console.log(text);

        var story = {
            createdBy : Meteor.userId(),
            createdOn : new Date(),
            title: title.value,
            description: textareaDescription.value,
            text: text
        };

        Meteor.call('addStory', story, function(err, res){
            if(err){
                Session.set('submitStory', 'Er is iets mis gegaan');
                console.log(err)
            } else {
                Session.set('submitStory', 'Je verhaal is opgeslagen');
                title.value = '';
                textareaDescription.value = '';
                textarea.value = '';
            }
        })
    },

    'click button' : function(e){
        var id = e.currentTarget.id;
        var textarea = $("textarea[name=story")[0];
        textarea.value = textarea.value + '{' + id + '}';
    },

    'click .variableToggle a' : function(e){
        e.preventDefault();
        var target = e.currentTarget.hash.substr(1);
        $(".toggle").addClass(function() {
            return "hidden";
        });
        $("." + target).removeClass('hidden');
    }
});

Template.newStory.helpers({
    submitMessage : () => Session.get('submitStory')
})