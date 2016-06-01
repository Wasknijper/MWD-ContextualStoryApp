Meteor.startup(function(){
    if ( Meteor.users.find().count() === 0 ) {
        Accounts.createUser({
            email: 'admin@email.nl',
            password: 'admin',
            profile: {
                name: 'Admin',
                isAdmin: true
            }
        });
}
});