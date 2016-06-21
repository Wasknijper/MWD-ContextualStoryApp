Meteor.startup(function(){
    if ( Meteor.users.find().count() === 0 ) {
        var admin = Accounts.createUser({
            email: 'admin@email.nl',
            password: 'admin',
            profile: {
                name: 'Admin',
            }
        });

        console.log(admin);
        Roles.addUsersToRoles(admin, 'admin', 'admins');
    } else {
        var admin = Accounts.findUserByEmail('admin@email.nl');

        if(!Roles.userIsInRole(admin._id, 'admin', 'admins')){
            Roles.addUsersToRoles(admin, 'admin', 'admins');
        }
    }

    if(Fallback.find().count() === 0) {
        Fallback.insert({
            'name' : '',
            'day': '',
            'month': '',
            'time': '',
            'seconds': '',
            'dayandtime': '',
            'weather': '',
            'weatherdescriptive': '',
            'music': '',
            'education': '',
            'school': '',
            'hometown': '',
            'work': '',
            'city': '',
            'street': '',
            'country': ''
        });
    }
});