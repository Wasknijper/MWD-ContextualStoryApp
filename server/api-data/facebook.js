

Accounts.onLogin(function(obj){
    var user = obj.user;

    if (user && user.hasOwnProperty('services') && user.services.hasOwnProperty('facebook')  ) {
        var result = HTTP.get('https://graph.facebook.com/v2.4/' + user.services.facebook.id + '?access_token=' + user.services.facebook.accessToken + '&fields=birthday, gender, location, education, hometown, likes, music, relationship_status, significant_other, work', function(err, res){
            var data = res.data;
            var document = FacebookData.findOne({userId: user._id});
            document ? FacebookData.update({_id: document._id}, {$set: {userId : user._id, data: data}}) : FacebookData.insert({userId : user._id, data: data}, getLikes(user, res.data.likes.paging.next));
            if(document && document.data.likes.paging.next){
                getLikes(user, document.data.likes.paging.next);
            }
        });
    }
});


var getLikes = function(user, url){
    HTTP.get(url, function(err, res){
        var likesData = res.data;
        FacebookData.update({userId: user._id}, {$push: {'data.likes.data' : {$each: likesData.data}}});
        FacebookData.update({userId: user._id}, {$set: {'data.likes.paging' : likesData.paging}});
        console.log(likesData.paging.next)
        if(likesData.paging.next){
            getLikes(user, likesData.paging.next);
        }
    });
}