Accounts.onCreateUser(function(options, user) {
    user.profile = options.profile;

    console.log('happening');
    return user
});