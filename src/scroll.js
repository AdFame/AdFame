var EventHandler = require('famous/core/EventHandler');

var windowScrollEvents = {}

//switch for only calling events once on scroll
windowScrollEvents.called = false;
windowScrollEvents.hitEnd = false;

//set up event handlers
var targetReached = new EventHandler();
var targetEndReached = new EventHandler();

//set handlers to object
windowScrollEvents.targetReached = targetReached;
windowScrollEvents.targetEndReached = targetEndReached;

//target elements and duration in pixels
var elementIdStart = 'hello';
var elementIdEnd = 'end';
var duration = 1000;

 window.onscroll = function(){

//position variables
var elementPosition = document.getElementById(elementIdStart).offsetTop;
var windowTopPosition = window.pageYOffset;
var ending = document.getElementById(elementIdEnd).offsetTop; 
 
 console.log(windowTopPosition, 'look')
 
 //check to see if you are at the target element
 if(!windowScrollEvents.called && (windowTopPosition + 100) > elementPosition){
   windowScrollEvents.called = true;
  
   targetReached.emit('targetreached');

   alert('target reached')
 } 
 
 //if you are not yet at the target element, windowScrollEvents.called is false
 if((windowTopPosition + 100) < elementPosition){
   console.log('hellllo')
   windowScrollEvents.called = false;
   windowScrollEvents.hitEnd = false;
 }

 //if you reach the 'ending' element alert and only call once
 if(!windowScrollEvents.hitEnd && (windowTopPosition > ending)) {
  windowScrollEvents.hitEnd = true;
  targetEndReached.emit('targetendreached')
  console.log('reached      '+ elementIdEnd, windowTopPosition, ending, windowTopPosition > ending, !windowScrollEvents.hitEnd )
 }

 //if you reach X duration pixels below target element alert abd only call once
 // if(!windowScrollEvents.hitEnd && windowTopPosition > (elementPosition+duration)){
 //  windowScrollEvents.hitEnd = true;
 //  alert('end reached');
 // }


}


module.exports = windowScrollEvents