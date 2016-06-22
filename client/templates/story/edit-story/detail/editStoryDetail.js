Template.editStoryDetail.onCreated(function editStoryDetailOnCreated() {
    Session.set('editStory', '');
});


Template.editStoryDetail.onRendered(function editStoryDetailOnRendered() {
    $(".toggle").addClass(function() {
      return "hidden";
    });
});

Template.editStoryDetail.events({
    'click #delete-button' : function(e){
        var confirmAlert = confirm('Weet je zeker dat je dit verhaal wilt verwijderen?');
        if(confirmAlert){
            Meteor.call('deleteStory', Template.currentData()._id);
            Router.go('/edit');
        }
    },

    'click #edit-button' : function(e){
        var title = $("input[name=title")[0];
        var textarea = $("textarea[name=story")[0];
        var textareaDescription = $("textarea[name=description")[0];
        var storyText = formatStoryText(textarea.value);
        var storyId = Template.currentData()._id;

        var story = {
            title: title.value,
            description: textareaDescription.value,
            text: storyText
        };

        Meteor.call('updateStory', storyId, story, function(err, res){
            if(err){
                Session.set('editStory', 'Er is iets mis gegaan');
                console.log(err)
            } else {
                Session.set('editStory', 'Je verhaal is opgeslagen');
            }
            $('html, body').animate({ scrollTop: 0 }, 'fast');
        });
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
        $('.variable=toggle button').removeClass('active');
        $(e.currentTarget).addClass('active');
    }
});


Template.editStoryDetail.helpers({
    editMessage : () => Session.get('editStory'),
    storyText : function(){
        var storyData = Template.currentData();
        var textArray = storyData.text;

        var formattedText = '';
        for (var i = 0, len = textArray.length; i < len; i++) {
            if(textArray[i].type === 'variable'){
                var curlyBracketOpen = '{', curlyBracketClosed = '}';
                var newValue = curlyBracketOpen + textArray[i].text + curlyBracketClosed;
                formattedText =  formattedText + newValue;
            } else {
                formattedText = formattedText + textArray[i].text;
            }
        }
        return formattedText;
    }
})