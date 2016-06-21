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