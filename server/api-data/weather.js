var city = 'Amsterdam, nl';
var id = 'af9f0f076c0d6e0117f0123102f62148';
var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + id + '&lang=nl';

var resultWeather = () => HTTP.get(url, function(err, res){
    var descriptive = descibeWeather(res.data.weather[0].id);
    weather = {
        createdOn: new Date(),
        weatherId: res.data.weather[0].id,
        main: res.data.weather[0].main,
        description: [res.data.weather[0].description, descriptive]
    };
    Weather.remove({});
    Weather.insert(weather);
});

var descibeWeather = function(id){
    var description;
    switch(id){
        case 200:
        case 201:
        case 210:
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
            description = 'onweerachtige';
            break;
        case 300:
        case 301:
        case 302:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
            description = 'miezerige';
            break;
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
        case 511:
        case 520:
        case 521:
        case 522:
        case 531:
            description = 'regenachtige';
            break;
        case 600:
        case 601:
        case 602:
        case 611:
        case 612:
        case 615:
        case 616:
        case 620:
        case 621:
        case 622:
            description = 'besneeuwde';
            break;
        case 701:
        case 711:
        case 721:
        case 731:
        case 741:
            description = 'mistige'
            break;
        case 751:
        case 761:
        case 762:
        case 771:
        case 781:
            description = 'stoffige';
            break;
        case 800:
            description = 'mooie';
            break;
        case 801:
        case 802:
            description = 'licht bewolkte'
            break;
        case 803:
        case 804:
            description = 'bewolkte';
            break;
        case 900:
        case 902:
        case 901:
        case 905:
        case 955:
        case 956:
        case 957:
        case 958:
        case 959:
        case 960:
        case 961:
        case 962:
            description = 'winderige';
            break;
        case 903:
            description = 'koude';
            break;
        case 904:
            description = 'warme';
            break;
        case 906:
            description = 'regenachtige'
            break;
        case 951:
        case 952:
        case 954:
            description = 'mooie';
            break;
        default:
            description = '';
    }

    return description;
}

resultWeather();
Meteor.setInterval(resultWeather, 900000);