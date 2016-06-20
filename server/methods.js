Meteor.methods({
    addStory: function(story){
        Story.insert(story);
    },
    updateStory: function(storyId, story){
        Story.update({_id: storyId}, {$set: {title: story.title, description: story.description, text : story.text}});
    }
});