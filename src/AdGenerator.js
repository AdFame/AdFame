// Import additional modules to be used in this view 
var View = require('famous/core/View');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var Modifier   = require('famous/core/Modifier');
var ImageSurface = require('famous/surfaces/ImageSurface')

var StateModifier = require('famous/modifiers/StateModifier');
var GridLayout = require('famous/views/GridLayout');
var Transitionable = require('famous/transitions/Transitionable')
var Transform = require('famous/core/Transform');
var SpringTransition = require('famous/transitions/SpringTransition');

// Modeling JSON object of input
var data = {
    logo: 'images/Coca-Cola.png',
    initialPosition: {x: 0, y: 0, z: 0},
    initialRotation: {x: 0, y: 0, z: 0},
    opacity: 1,
    enter: {
        type: rotateInOut,
        translate: {x: 0, y: 0, z: 0},
        rotate: {x: 0, y: 0, z: 0},
        opacity: 1
    },
    exit: {
        type: rotateInOut,
        translate: {x: 0, y: 0, z: 0},
        rotate: {x: 0, y: 0, z: 0},
        opacity: 1
    }
}

/* GENERATORS */

// Constructor function for our AppView class
function AdGenerator() {
    var logo = getLogo();
    var modifier = getModifier();
    var enter = enterTransition();
    var exit = exitTransition();

    return {logo: logo, modifier: modifier, enter: enter, exit: exit};
}

// 
function getLogo() {
    var logo = new ImageSurface({
        size: [300, 100],
        origin: [0.5,0.5],
        align:[.5,0],
        content: data.logo
    });

    return logo;
}

// Creates a modifier for startin the starting
// position
function getModifier() {
    var modifier = new Modifier({
        // size: [undefined,undefined],
        // origin: [0.5,0.5],
        // align:[.5,0],
        transform: Transform.rotate(1,0,0)
    });

    return modifier;
}

// Calls a function which returns a modifier
// depending on the transition type
function enterTransition() {
    // return data.type(data.enter);
}

// Calls a function which returns a modifier
// depending on the transition type
function exitTransition() {
    // return data.type(data.exit);
}

/* TRANSITIONS */
function rotateInOut(data) {
    var rotate = new Modifier({
        transform: Transform.rotate(
            data.rotate.x, 
            data.rotate.y, 
            data.rotate.z
        )
    });

    return rotate;
}

function springInOut(data) {

}

function slideInOut(data) {

}

module.exports = AdGenerator;