

Accounts.onLogin(function(obj){
    var user = obj.user;

    if (user && user.hasOwnProperty('services') && user.services.hasOwnProperty('facebook')  ) {
        var result = HTTP.get('https://graph.facebook.com/v2.4/' + user.services.facebook.id + '?access_token=' + user.services.facebook.accessToken + '&fields=first_name, last_name, birthday, email, gender, location');
        console.log(result.data.first_name);
        console.log(result.data.last_name);
        console.log(result.data.birthday);
        console.log(result.data.email);
        console.log(result.data.gender);
        console.log(result.data.location);
    }
})