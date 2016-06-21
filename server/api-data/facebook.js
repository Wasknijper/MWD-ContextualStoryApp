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
    if(url){
        HTTP.get(url, function(err, res){
            var likesData = res.data;
            FacebookData.update({userId: user._id}, {$push: {'data.likes.data' : {$each: likesData.data}}});
            FacebookData.update({userId: user._id}, {$set: {'data.likes.paging' : likesData.paging}});
            getLikes(user, likesData.paging.next);
        });
    } else {
        applyMagicSauce(user._id);
    }
};

var applyMagicSauce = function(userId){
    var data = FacebookData.findOne({'userId': userId}).data.likes.data;
    var likeIds = data.map(function(obj){
        return obj.id
    });
    HTTP.post('http://api-v2.applymagicsauce.com/auth', {
        data: {
            "customer_id": 2439,
            "api_key": "4qoso5tjvkutnq1kr93pcil24"
        }
    }, function(err, res){
        var token = res.data.token;
        HTTP.post('http://api-v2.applymagicsauce.com/like_ids', {
            headers: {
                'X-Auth-Token': token,
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            data: likeIds
        }, function(err, res){
            var data = res.data.predictions;
            //http://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
            data.sort(function(a, b){
                if (a.trait < b.trait){
                    return -1;
                } else if (a.trait > b.trait){
                    return 1;
                } else {
                    return 0;
                }
            });
            var formattedData = {};
            for(var i = 0; i < data.length; i++){
                var key = data[i].trait;
                formattedData[key] = data[i].value;
            }
            FacebookData.update({'userId': userId}, {$set: {'applymagicsauce': formattedData}});
        });
    });
}