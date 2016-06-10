Meteor.publish('storyById', function(storyId){
  return Story.find({_id: storyId});
});

Meteor.publish('allStories', function(userId){
  return Story.find({});
});

Meteor.publish('storiesByUser', function(userId){
  return Story.find({createdBy: userId});
});

Meteor.publish('findUserById', function(userId){
  return Meteor.users.find({_id: userId});
});

Meteor.publish('lastWeather', function(){
  return Weather.find({}, {sort: {createdOn: -1}});
});

Meteor.publish('facebookDataCurrentUser', function(id){
  return FacebookData.find({userId: id});
});