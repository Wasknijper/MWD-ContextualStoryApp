Template.loginAndRegister.onRendered(function(){
    $('body').addClass('log-in');
});

Template.loginAndRegister.onDestroyed(function(){
    $('body').removeClass('log-in');
});