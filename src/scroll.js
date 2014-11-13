var EventHandler = require('famous/core/EventHandler');
var Transform = require('famous/core/Transform');
var windowScrollEvents = {}

//set up event handlers ** short names more readable in conditionals below **
var scrollEvents = new EventHandler();

//set handlers to main exported object
windowScrollEvents.scrollEvents = scrollEvents;

//switches so event handlers are only called once on scroll
windowScrollEvents.called = false;
windowScrollEvents.hitEnd = false;

//target elements and duration in pixels;
var elementIdStart = 'hello';
var elementIdEnd = 'end';
var padding = 100;
//var duration = 1000;

console.log('this is working')

//native scroll main function
window.onscroll = scrollHandler;
window.addEventListener("touchmove", scrollHandler, true);
window.addEventListener("gesturechange", scrollHandler, false)

function scrollHandler(){

//position variables
var targetPosition = document.getElementById(elementIdStart).offsetTop;
var targetEndPosition = document.getElementById(elementIdEnd).offsetTop; 
var windowTopPosition = window.pageYOffset;

//emits window position  
 scrollEvents.emit('positionYChange', {position: windowTopPosition});
 
 //check to see if you are at the target element
 if(!windowScrollEvents.called && (windowTopPosition + padding) > targetPosition){
  windowScrollEvents.called = true;
  
  //emit event when target position is reached
  scrollEvents.emit('targetreached', {target:targetPosition, padding:padding });

 } 

 //if you are not yet at the target element, windowScrollEvents.called is false
 if((windowTopPosition + padding) < targetPosition){
  
  windowScrollEvents.called = false;
  windowScrollEvents.hitEnd = false;
  
  //emit event when target not reached 
  scrollEvents.emit('targetnotreached');
  
 }

 //if you reach the 'targetEndPosition' element alert and only call once
 if(!windowScrollEvents.hitEnd && (windowTopPosition > targetEndPosition)) {
  windowScrollEvents.hitEnd = true;
  
 //emit event when target end is reached 
  scrollEvents.emit('targetendreached');

 }

 //if you reach X duration pixels below target element alert abd only call once
 // if(!windowScrollEvents.hitEnd && windowTopPosition > (targetPosition+duration)){
 //  windowScrollEvents.hitEnd = true;
 // }


}


module.exports = windowScrollEvents