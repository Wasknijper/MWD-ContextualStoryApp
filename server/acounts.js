Accounts.onCreateUser(function(options, user) {
    user.profile = options.profile;

    console.log('happening');
    return user
});

//dont allow users to update their profile through console
//https://dweldon.silvrback.com/common-mistakes
Meteor.users.deny({
  update: function() {
    return true;
  }
});

Accounts.ui.config({
  requestPermissions: {
     facebook: ['public_profile', 'user_actions.books', 'user_actions.music', 'user_birthday', 'user_education_history', 'user_hometown', 'user_likes', 'user_location', 'user_work_history'],
  }
});