Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        console.log("Form submitted.");

        Meteor.loginWithPassword({email: emailVar}, passwordVar, function(err){
            if( err ) $('div#error').html( err.message );
        });
    }
});