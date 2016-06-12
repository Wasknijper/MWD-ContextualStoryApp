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