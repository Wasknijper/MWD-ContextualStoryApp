Template.newStory.onCreated(function newStoryOnCreated() {
    Session.set('submitStory', '');
});

Template.newStory.events({
    'click #submit-button' : function(e){
        var title = $("input[name=title")[0];
        var textarea = $("textarea[name=story")[0];
        var storyText = textarea.value;

        //splitting regex from http://stackoverflow.com/a/30576287 & http://stackoverflow.com/questions/1721602/regex-match-a-z-a-z-0-9-and
        //ps. I hate regex
        var regex = /\s*(\{[a-zA-Z0-9]+\})\s*/g;
        var storyText = storyText.split(regex).filter(Boolean);
        var text  = {}, obj;

        for(i = 0; i < storyText.length; i++){
            if(storyText[i].charAt(0) != '{'){
                obj = {
                    text: storyText[i],
                    type: 'text'
                }
                text[i] = obj;
            } else {
                obj = {
                    text: storyText[i].substring(1, storyText[i].length-1),
                    type: 'variable'
                }
                text[i] = obj;
            }
        }

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