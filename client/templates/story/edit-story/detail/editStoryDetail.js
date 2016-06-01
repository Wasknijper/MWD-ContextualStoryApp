Template.editStoryDetail.onCreated(function editStoryDetailOnCreated() {
    Session.set('editStory', '');
    console.log(Template.currentData());
});

Template.editStoryDetail.events({
    'click #edit-button' : function(e){
        var title = $("input[name=title")[0];
        var textarea = $("textarea[name=story")[0];
        var storyText = textarea.value;
        var storyId = Template.currentData()._id;

        var story = {
            title: title.value,
            text: {storyText}
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
    editMessage : () => Session.get('editStory')
})