var EventHandler = require('famous/core/EventHandler');

var windowScrollEvents = {}


//set up event handlers ** short names more readable in conditionals below **
var targetReached = new EventHandler();
var targetEndReached = new EventHandler();
var targetNotReached = new EventHandler();
var positionY = new EventHandler();

//set handlers to main exported object
windowScrollEvents.targetReached = targetReached;
windowScrollEvents.targetEndReached = targetEndReached;
windowScrollEvents.targetNotReached = targetNotReached;
windowScrollEvents.positionY = positionY

//switches so event handlers are only called once on scroll
windowScrollEvents.called = false;
windowScrollEvents.hitEnd = false;

//target elements and duration in pixels;
var elementIdStart = 'hello';
var elementIdEnd = 'end';
//var duration = 1000;


//native scroll main function
window.onscroll = function(){

	//position variables
	var targetPosition = document.getElementById(elementIdStart).offsetTop;
	var targetEndPosition = document.getElementById(elementIdEnd).offsetTop; 
	var windowTopPosition = window.pageYOffset;

	//emits window position  
	 positionY.emit('positionYChange', {position: windowTopPosition});
	 
	 //check to see if you are at the target element
	 if(!windowScrollEvents.called && (windowTopPosition + 100) > targetPosition){
	  windowScrollEvents.called = true;
	  
	  //emit event when target position is reached
	  targetReached.emit('targetreached');

	 } 
	 
	 //if you are not yet at the target element, windowScrollEvents.called is false
	 if((windowTopPosition + 100) < targetPosition){
	  
	  windowScrollEvents.called = false;
	  windowScrollEvents.hitEnd = false;
    
    //emit event when target not reached 
    targetNotReached.emit('targetnotreached');
    
	 }

	 //if you reach the 'targetEndPosition' element alert and only call once
	 if(!windowScrollEvents.hitEnd && (windowTopPosition > targetEndPosition)) {
	  windowScrollEvents.hitEnd = true;

   //emit event when target end is reached 
	  targetEndReached.emit('targetendreached');

	 }

	 //if you reach X duration pixels below target element alert abd only call once
	 // if(!windowScrollEvents.hitEnd && windowTopPosition > (targetPosition+duration)){
	 //  windowScrollEvents.hitEnd = true;
	 // }


}


module.exports = windowScrollEvents