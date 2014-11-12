var Transform = require('famous/core/Transform');
var Modifier = require('famous/core/Modifier');
var Scroll = require('./scroll.js');

var EventHandler = require('famous/core/EventHandler');

//listen to scroll events
var scrollEventsListener = new EventHandler();

//subscribe to scroll events
scrollEventsListener.subscribe(Scroll.scrollEvents);


var rotatePosX=1;
var called = false;
var location=0;


var rotationModifier = new Modifier({
    size: [100,100],
    transform: Transform.rotate(1,0,0.1)
}); 

scrollEventsListener.on('targetreached', function(element){
  scrollEventsListener.on('positionYChange', function(y){ 
    rotatePosX-=y.position/10000
    console.log(rotatePosX);
    if(rotatePosX){
       rotationModifier.setTransform(Transform.rotateX(rotatePosX))  
    }
  });
});

scrollEventsListener.on('targetnotreached', function(){
 console.log("haven't yet reached target")
});

scrollEventsListener.on('targetendreached', function(){
  console.log("target end reached!")
});

  scrollEventsListener.on('positionYChange', function(y){

  //   if (y.position>20 && !called){
        
  //       if (y.position>location){
  //       rotatePosX+=y.position/10000
  //       called=true;
  //       }else{
  //           rotatePosX-=y.position/10000
  //       }
  //       location=y.position;
  //   }
  //   if (y.position>1000){
  //       called=false;
  //   }

  // rotationModifier.setTransform(Transform.rotateX(rotatePosX));

  })

console.log('this is running!!!!!', rotationModifier);

module.exports = {rotationModifier: rotationModifier};