var Transform = require('famous/core/Transform');
var Modifier = require('famous/core/Modifier');
var EventHandler = require('famous/core/EventHandler');
var Scroll = require('./scroll.js');
var AdGenerator = require('./AdGenerator');

var data = require('./data.js');

// Listens to scroll events
var scrollEventsListener = new EventHandler();

// Subscribes to scroll events
scrollEventsListener.subscribe(Scroll.scrollEvents);

// Requires adGenerator object
var adGenerator = AdGenerator();

transitionCalled = false

// Create scrollModifier
var scrollModifier = new Modifier(); 

// Call adGenerator enter/exit methods when begin target is reached
scrollEventsListener.on('targetStartReached', function(){
    adGenerator.transformer.halt();
    if(!transitionCalled) {
        adGenerator.enter();
        transitionCalled = !transitionCalled;
    } else if (transitionCalled) {
        adGenerator.exit();
        transitionCalled = !transitionCalled;
    }
});

// Call adGenerator enter/exit methods when end target is reached
scrollEventsListener.on('targetEndReached', function(){  
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