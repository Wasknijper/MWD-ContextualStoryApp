Template.registerHelper('equals', function (a, b) {
    return a === b;
});

//thanks to laberning@stackoverflow: http://stackoverflow.com/a/28746166
Template.registerHelper('breaklines', function(text, options) {
  text = text.replace(/(\r\n|\n|\r)/gm, '<br/>');
  return new Spacebars.SafeString(text);
});

convertHour = function(hour){
    var hourName;

    if (hour >= 19){
        hourName = 'avond';
    } else if (hour >= 12){
        hourName = 'middag';
    } else if (hour >= 5){
        hourName = 'ochtend';
    } else {
        hourName = 'nacht'
    }

    return hourName;
}

convertDay = function(day){
    var dayName;

    switch(day){
        case 0:
            dayName = "zondag";
            break;
        case 1:
            dayName = "maandag";
            break;
        case 2:
            dayName = "dinsdag";
            break;
        case 3:
            dayName = "woensdag";
            break;
        case 4:
            dayName = "donderdag";
            break;
        case 5:
            dayName = "vrijdag";
            break;
        case 6:
            dayName = "zaterdag";
            break;
        default:
            dayName = "Geen geldige dag";
            break;
    }

    return dayName;
}

convertMonth = function(month){
    var monthName;
    switch(month){
        case 0:
            monthName = "januari";
            break;
        case 1:
            monthName = "februari";
            break;
        case 2:
            monthName = "maart";
            break;
        case 3:
            monthName = "april";
            break;
        case 4:
            monthName = "mei";
            break;
        case 5:
            monthName = "juni";
            break;
        case 6:
            monthName = "July";
            break;
        case 7:
            monthName = "august";
            break;
        case 8:
            monthName = "september";
            break;
        case 9:
            monthName = "october";
            break;
        case 10:
            monthName = "november";
            break;
        case 11:
            monthName = "december";
            break;
        default:
          monthName = "Geen geldige maand";
    }

    return monthName;
}

formatStoryText = function(textToFormat) {
    var storyText = textToFormat;

    //splitting regex from http://stackoverflow.com/a/30576287 & http://stackoverflow.com/questions/1721602/regex-match-a-z-a-z-0-9-and
    //ps. I hate regex
    var regex = /\s*(\{[a-zA-Z0-9]+\})\s*/g;
    var storyText = storyText.split(regex).filter(Boolean);
    var text  = [], obj;

    for(i = 0; i < storyText.length; i++){
        if(storyText[i].charAt(0) != '{'){
            obj = {
                text: storyText[i],
                type: 'text'
            }
            text.push(obj);
        } else {
            obj = {
                text: storyText[i].substring(1, storyText[i].length-1),
                type: 'variable'
            }
            text.push(obj);
        }
    }

    return text;
}