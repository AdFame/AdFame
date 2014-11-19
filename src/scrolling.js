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


// // Reset banner to initial state helper function 
// var resetBanner = function(){
//     console.log('reset', targetHit)
//     if(targetHit){
//         //reset banner to not called   
//         targetHit = false;
//         //reset banner to initial values
//         console.log('actual reset')
//         mainModifier.setTransform(Transform.rotate(initPosX,initPosY,initPosZ))  
//     }
// }

/******************************************************************
             MAIN  IN/OUT  SCROLLER  DEFAULTS                                     
******************************************************************/

// //default initial state before banner scrolls in 
// var initPosX = 0,
// initPosY = 0,
// initPosZ = 0,
// distance = 100,
transitionCalled = false
// targetHit = false;

// //default state for banner scroll in end 
// var endPosX = Math.PI/2;
// var endPosY = 0;
// var endPosZ = 0;
// var location = 0;

/******************************************************************/


// Create mainModifier
var mainModifier = new Modifier(); 


/******************************************************************
             TARGET  REACHED  EVENT  HANDLER                                      
******************************************************************/
scrollEventsListener.on('targetStartReached', function(){
    // Call adGenerator enter/exit methods when target is reached
    if(!transitionCalled) {
        adGenerator.enter(mainModifier);
        transitionCalled = !transitionCalled;
    } else if (transitionCalled) {
        adGenerator.exit(mainModifier);
        transitionCalled = !transitionCalled;
    }
});

/******************************************************************
             TARGET  END  REACHED  EVENT  HANDLER                                      
******************************************************************/
scrollEventsListener.on('targetEndReached', function(){  
    // Call adGenerator enter/exit methods when target is reached
    if(transitionCalled) {
        adGenerator.exit(mainModifier);
        transitionCalled = !transitionCalled;
    } else if (!transitionCalled) {
        adGenerator.enter(mainModifier);
        transitionCalled = !transitionCalled;
    }
});

// /******************************************************************
//     WINDOW POSITION EVENT HANDLER (inside target reached handler)                                   
// ******************************************************************/
//     // Position is the target position and any padding for the main target div
//     var position = element.targetEndPosition;    

//     scrollEventsListener.on('positionYChange', function(y){ 
//         //track current Y positon of window
//         var tracker = y.position;

//         //link the rotation position to the window scroll
//         rotatePosX = (tracker - position) / distance;


//         //only link rotation to scroll if between init and end positions
//         if(rotatePosX <= endPosX && rotatePosX >= initPosX) {
//             console.log('rotate', rotatePosX)
//             mainModifier.setTransform(Transform.rotate(rotatePosX, 0, 0));
//         }
//     });

module.exports = {mainModifier: mainModifier};