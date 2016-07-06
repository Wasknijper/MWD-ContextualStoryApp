Template.textNode.onRendered(function(){

});

Template.textNode.helpers({
    varValue: function(){
        return '<span class="variable">' + Template.currentData() + '</span>';
    }
});