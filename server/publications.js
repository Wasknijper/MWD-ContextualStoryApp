Meteor.publish('storyById', function(storyId){
  return Story.find({_id: storyId});
});

Meteor.publish('storiesByUser', function(userId){
  return Story.find({createdBy: userId});
});


Meteor.publish('findUserById', function(userId){
  return Meteor.users.find({_id: userId});
});