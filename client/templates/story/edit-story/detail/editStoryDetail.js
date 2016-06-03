Template.editStoryDetail.onCreated(function editStoryDetailOnCreated() {
    Session.set('editStory', '');
});

Template.editStoryDetail.events({
    'click #edit-button' : function(e){
        var title = $("input[name=title")[0];
        var textarea = $("textarea[name=story")[0];
        var storyText = formatStoryText(textarea.value);
        var storyId = Template.currentData()._id;

        var story = {
            title: title.value,
            text: storyText
        };

        Meteor.call('updateStory', storyId, story, function(err, res){
            if(err){
                Session.set('editStory', 'Er is iets mis gegaan');
                console.log(err)
            } else {
                Session.set('editStory', 'Je verhaal is opgeslagen');
            }
        })
        console.log(story);
    }
});

Template.editStoryDetail.helpers({
    editMessage : () => Session.get('editStory'),
    storyText : function(){
        var storyData = Template.currentData();
        var textArray = storyData.text;
        console.log(textArray);
        var formattedText = '';
        for (var i = 0, len = textArray.length; i < len; i++) {
            if(textArray[i].type === 'variable'){
                var curlyBracketOpen = ' {', curlyBracketClosed = '} ';
                var newValue = curlyBracketOpen + textArray[i].text + curlyBracketClosed;
                console.log(newValue);
                formattedText =  formattedText + newValue;
            } else {
                formattedText = formattedText + textArray[i].text;
            }
        }
        return formattedText;
    }
})