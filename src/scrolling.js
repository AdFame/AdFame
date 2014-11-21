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

transitionCalled = false

// Create scrollModifier
var scrollModifier = new Modifier(); 


/******************************************************************
             TARGET  REACHED  EVENT  HANDLER                                      
******************************************************************/
scrollEventsListener.on('targetStartReached', function(){
    // Call adGenerator enter/exit methods when target is reached
    adGenerator.transformer.halt();
    if(!transitionCalled) {
        adGenerator.enter();
        transitionCalled = !transitionCalled;
    } else if (transitionCalled) {
        adGenerator.exit();
        transitionCalled = !transitionCalled;
    }
});

/******************************************************************
             TARGET  END  REACHED  EVENT  HANDLER                                      
******************************************************************/
scrollEventsListener.on('targetEndReached', function(){  
    // Call adGenerator enter/exit methods when target is reached
    adGenerator.transformer.halt();
    if(transitionCalled) {
        adGenerator.exit();
        transitionCalled = !transitionCalled;
    } else if (!transitionCalled) {
        adGenerator.enter();
        transitionCalled = !transitionCalled;
    }
});

module.exports = {scrollModifier: scrollModifier};