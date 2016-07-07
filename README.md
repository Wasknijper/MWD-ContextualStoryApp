# MWD-ContextualStoryApp
For the end assignment of my Minor Web Development I will be making a webapp with a story, that changes depending on the user.
It will be used mainly for testing the effect of these kind of stories on user. Marolijn Ruyg is the procject owner, who will use it in her research.

The app will allow (at first only) the writer/admin to add stories with variables that change depending on the user, their location, current weather ect.
Admin will also be able to edit the userprofiles and set wich user can see the stories and in wich order they will be read.

Readers will only be able to create an account, add data and read the stories.

There might be a possiblity in the future to allow other user to make and publish stories through this app, but this will need to be decided by the project owner.

##URL
https://mwd-contextualstoryapp.herokuapp.com/, login with admin@email.nl and password admin. 
You cannot add new users for testing without being added to the facebook developer app.

##Installation 

1. Download and unpack or clone this repo
2. Open your command prompt and navigate to the folder you just cloned/downloaded 
3. Enter the command `meteor` to start the app

###Changing the api-keys

####Facebook
To make the facebook api work, you need to create a Facebook app to obtain your keys. (More information)
After that you can change line 7 and 8 of [server/services.js](https://github.com/Wasknijper/MWD-ContextualStoryApp/blob/master/server/services.js#L7-L8)

```
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '658167194335866',
    secret: '0da9c75c915ffb5dc458aa15f329bb86'
});
```

####OpenWeatherMap 
After signing up you can change [line 2 of /server/api-data/weather.js](https://github.com/Wasknijper/MWD-ContextualStoryApp/blob/master/server/api-data/weather.js#L2) with your id.

`var id = 'af9f0f076c0d6e0117f0123102f62148';`

####ApplyMagicSauce 
After signing up you need to change [line 37 and 38 of /server/api-data/facebook.js](https://github.com/Wasknijper/MWD-ContextualStoryApp/blob/master/server/api-data/facebook.js#L37-38)

```
    HTTP.post('http://api-v2.applymagicsauce.com/auth', {
        data: {
            "customer_id": 2439,
            "api_key": "4qoso5tjvkutnq1kr93pcil24"
        }
    }
```

##Features
For feature list see issues.
[Current sprint](https://github.com/Wasknijper/MWD-ContextualStoryApp/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22Sprint+2%22)
[Sprint 1](https://github.com/Wasknijper/MWD-ContextualStoryApp/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22Sprint+1%22)

##API's
In this project I used the following API's:
- [Facebook Login](https://developers.facebook.com/docs/facebook-login)
- [Facebook Graph](https://developers.facebook.com/docs/graph-api)
- [OpenWeatherMap](http://openweathermap.org/)
- [ApplyMagicSauce](http://applymagicsauce.com/)

##Courses

###Realtime Web
- Making an app with Meteor
- Using user data in a meaningfullway

##Webapp from Scratch
- Making calls to a 3rd party api, manipulating and showing data
- Using JS to add interaction to a website

##Preformance matters
- Semantic HTML
- Optimizing CSS selectors & properties 
- Try to make most API Calls on the server (Except google maps, because we dont want the server location)

##CSS to the Rescue
- Flexbox
- Selecting html elements with out classes, ie: selecting by name attribute
- Vertical centering
- Text readability
