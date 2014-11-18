var Transform = require('famous/core/Transform');
var Modifier = require('famous/core/Modifier');
var EventHandler = require('famous/core/EventHandler');
var Scroll = require('./scroll.js');
var AdGenerator = require('./AdGenerator');

var data = require('./data.js');

//listen to scroll events
var scrollEventsListener = new EventHandler();

//subscribe to scroll events
scrollEventsListener.subscribe(Scroll.scrollEvents);

//add adGenerator that contains entry transitions
var adGenerator = AdGenerator();


//reset banner to initial state helper function 
var resetBanner = function(){
  console.log('reset', targetHit)
  if(targetHit){
    //reset banner to not called   
    targetHit = false;
    //reset banner to initial values
    console.log('actual reset')
    // mainModifier.setTransform(Transform.rotate(initPosX,initPosY,initPosZ))  
  }
}

/******************************************************************
             MAIN  IN/OUT  SCROLLER  DEFAULTS                                     
******************************************************************/

//default initial state before banner scrolls in 
var initPosX = 0,
initPosY = 0,
initPosZ = 0,
distance = 100,
transitionCalled = false
targetHit = false;

//default state for banner scroll in end 
var endPosX = Math.PI/2;
var endPosY = 0;
var endPosZ = 0;
var location = 0;

/******************************************************************/


//Main rotation modifier with initial state listed above
var mainModifier = new Modifier({
    transform: Transform.rotate(initPosX,initPosY,initPosZ)
}); 


/******************************************************************
             TARGET  REACHED  EVENT  HANDLER                                      
******************************************************************/

scrollEventsListener.on('targetreached', function(element){
  //position is the target position and any padding for the main target div     
    var position = element.targetPosition - element.padding;      
   //if transition hasn't been called add the transition from AdGenerator
  if(!transitionCalled) {
    //set the main modifier to the entry modifier from AdGenerator 
    adGenerator.enter(mainModifier);

    //wait until after the transition is over to enable 'scrolling' modifier ( default in and out scroll)
    setTimeout(function(){ 
      transitionCalled = true;
    }, data.enter.duration);  
     
  }

 /******************************************************************
    WINDOW POSITION EVENT HANDLER (inside target reached handler)                                   
  ******************************************************************/

  scrollEventsListener.on('positionYChange', function(y){ 
    
    //track current Y positon of window
    var track = y.position;

    //link the rotation position to the window scroll
    rotatePosX = initPosX + ((track - position)/distance);

    //only link rotation to scroll if between init and end positions
    if(rotatePosX <= endPosX && rotatePosX >= initPosX && transitionCalled){
       targetHit = true;
       console.log('target hit', targetHit)
       mainModifier.setTransform(Transform.rotate(rotatePosX,0,0))  
    }
    
  });
});



/******************************************************************
             TARGET  NOT  REACHED  EVENT  HANDLER                                      
******************************************************************/

scrollEventsListener.on('targetnotreached', function(){
  // resetBanner();
});


/******************************************************************
             TARGET  END  REACHED  EVENT  HANDLER                                      
******************************************************************/

scrollEventsListener.on('targetendreached', function(){  
   // resetBanner();
   console.log('FINISHED')
   adGenerator.exit(mainModifier)
});


module.exports = {mainModifier: mainModifier};