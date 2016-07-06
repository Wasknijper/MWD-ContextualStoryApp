Template.appLayout.events({
    'mouseenter .story-text-main': function(){
        $('body').addClass('idle');
        Session.set('insideStoryText', true);
    },
    'mouseleave .story-text-main': function(){
        $('body').removeClass('idle')
        Session.set('insideStoryText', false);
    }
});