Meteor.methods({
    addStory: function(story){
        return Story.insert(story);
    },
    updateStory: function(storyId, story){
        Story.update({_id: storyId}, {$set: {title: story.title, description: story.description, text : story.text}});
    },
    deleteStory: function(storyId){
        Story.remove({'_id' : storyId});
    },
    updateFallbacks: function(id, fallbacks){
        Fallback.update({_id: id}, {$set: fallbacks});
    },
    updateProfile: function(storyId, position){
        var key = 'profile.' + storyId;
        var savePosition = {};
        savePosition[key] = position;
        Meteor.users.update({_id: Meteor.userId()}, {$set: savePosition});
    }
});