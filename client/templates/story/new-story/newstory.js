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
                // Session.set('submitStory', 'Je verhaal is opgeslagen. <a href="/story/'+ res +'">Bekijk het verhaal</a>');
                // Session.set('submitStoryId', res);
                // title.value = '';
                // textareaDescription.value = '';
                // textarea.value = '';
                Router.go('/story/' + res);
            }
            $('html, body').animate({ scrollTop: 0 }, 'fast');
        })
    },

    'click .toggle button' : function(e){
        var id = e.currentTarget.id;
        if(id === 'edit-button'){ return };
        var textarea = $("textarea[name=story")[0];
        textarea.value = textarea.value + '{' + id + '}';
    },

    'click .variable-toggle button' : function(e){
        e.preventDefault();
        var target = e.currentTarget.name;
        $(".toggle").addClass(function() {
            return "hidden";
        });
        $("." + target).removeClass('hidden');
        $('.variable-toggle button').removeClass('active');
        $(e.currentTarget).addClass('active');
    }
});

Template.newStory.helpers({
    submitMessage : () => Session.get('submitStory'),
    newStoryId: ()=> Session.get('submitStoryId')
})