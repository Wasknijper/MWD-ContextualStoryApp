Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        console.log("Form submitted.");

        var options = {
            email: event.target.registerEmail.value,
            password: event.target.registerPassword.value,
            profile: {
                name:  event.target.registerName.value
            }
        };

        Accounts.createUser( options , function(err){
            if( err ) $('div#error').html( err.message );
        });
    }
});