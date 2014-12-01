var EventHandler = require('famous/core/EventHandler');
var Transform = require('famous/core/Transform');
var windowScrollEvents = {}

// Set up event handlers ** short names more readable in conditionals below **
var scrollEvents = new EventHandler();

// Set handlers to main exported object
windowScrollEvents.scrollEvents = scrollEvents;

// Switches so event handlers are only called once on scroll
windowScrollEvents.called = false;
windowScrollEvents.hitEnd = false;

// Target elements and duration in pixels;
var elementIdStart = 'startAdFame';
var elementIdEnd = 'endAdFame';

// Native scroll main function
window.onscroll = function (){
    // Position variables
    var targetPosition = document.getElementById(elementIdStart).offsetTop;
    var targetEndPosition = document.getElementById(elementIdEnd).offsetTop; 
    var windowTopPosition = window.pageYOffset;

    // Check to see if you reach enter element scrolling down
    if (!windowScrollEvents.called && (windowTopPosition) > targetPosition) {
        scrollEvents.emit('targetStartReached');
        windowScrollEvents.called = true;
    }

    // Check to see if you reach enter element scrolling up
    if (windowScrollEvents.called && (windowTopPosition) < targetPosition) {
        scrollEvents.emit('targetStartReached');
        windowScrollEvents.called = false;
    }

    // Check to see if you reach end element scrolling down
    if (!windowScrollEvents.hitEnd && (windowTopPosition > targetEndPosition)) {
        scrollEvents.emit('targetEndReached');
        windowScrollEvents.hitEnd = true;
    }

     // Check to see if you reach end element scrolling up
    if (windowScrollEvents.hitEnd && (windowTopPosition < targetEndPosition)) {
        scrollEvents.emit('targetEndReached');
        windowScrollEvents.hitEnd = false;
    }
}

module.exports = windowScrollEvents