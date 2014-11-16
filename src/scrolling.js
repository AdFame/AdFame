var Transform = require('famous/core/Transform');
var Modifier = require('famous/core/Modifier');
var EventHandler = require('famous/core/EventHandler');
var Scroll = require('./scroll.js');


//listen to scroll events
var scrollEventsListener = new EventHandler();

//subscribe to scroll events
scrollEventsListener.subscribe(Scroll.scrollEvents);


//initial state
var initPosX = Math.PI, 
initPosY = 0,
initPosZ = 0.1,
distance = 100;

var rotationModifier = new Modifier({
    transform: Transform.rotate(initPosX,initPosY,initPosZ)
}); 



//transform to state
var endPosX=Math.PI/2;
var location=0;

 

scrollEventsListener.on('targetreached', function(element){
   console.log("target has been reached")
  scrollEventsListener.on('positionYChange', function(y){ 
      var position = element.target - element.padding;      
      var track = y.position

    rotatePosX = initPosX + ((track - position)/distance);
    if(rotatePosX <= 5.54 && rotatePosX > Math.PI){
       rotationModifier.setTransform(Transform.rotate(rotatePosX,0,0))  
    }
    
  });
});

scrollEventsListener.on('targetnotreached', function(){
 if(Scroll.called){
  Scroll.called = false;
  rotationModifier.setTransform(Transform.rotate(initPosX,initPosY,initPosZ))  
 }
});

scrollEventsListener.on('targetendreached', function(){
  console.log("target ends reached!")
  if(Scroll.called) {
    Scroll.called = false;
    rotationModifier.setTransform(Transform.rotate(initPosX,initPosY,initPosZ))  
  }
 
});

scrollEventsListener.on('positionYChange', function(y){
 
});


module.exports = {rotationModifier: rotationModifier};