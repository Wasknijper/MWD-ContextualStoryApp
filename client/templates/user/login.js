Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        console.log("Form submitted.");

        Meteor.loginWithPassword({email: emailVar}, passwordVar, function(err){
            if( err ) $('div#error').html( err.message );
        });
    },

    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({requestPermissions: ['user_actions.books' , 'user_actions.music', 'user_actions.news', 'user_birthday', 'user_education_history', 'user_hometown', 'user_likes',
        'user_location', 'user_relationships', 'user_relationship_details', 'user_religion_politics', 'user_work_history']}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
    }
});