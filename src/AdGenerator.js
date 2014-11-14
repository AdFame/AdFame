// Import additional modules to be used in this view 
var View = require('famous/core/View');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var Modifier   = require('famous/core/Modifier');
var ImageSurface = require('famous/surfaces/ImageSurface');
var Easing = require('famous/transitions/Easing');

var StateModifier = require('famous/modifiers/StateModifier');
var GridLayout = require('famous/views/GridLayout');
var Transitionable = require('famous/transitions/Transitionable')
var Transform = require('famous/core/Transform');
var SpringTransition = require('famous/transitions/SpringTransition');

// Modeling JSON object of input
var data = {
    logo: 'images/Coca-Cola.png',
    initialPosition: {x: 0, y: 0, z: 0},
    initialVelocity: {x: 0, y: 0, z: 0},
    initialRotation: {x: 0, y: 0, z: 0},
    opacity: 1,
    enter: {
        type: rotateInOut,
        position: {x: 0, y: 0, z: 0},
        velocity: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0},
        period: 1000,
        dampingRatio: 0,
        restitution: 0,
        opacity: 1,
        duration: 1000,
        curve: null,
        link: 'www.google.com'
    },
    exit: {
        type: slideInOut,
        position: {x: 0, y: 0, z: 0},
        velocity: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0},
        period: 1000,
        dampingRatio: 0,
        restitution: 0,
        opacity: 1,
        duration: 1000,
        curve: null,
        link: 'www.google.com'
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
      content: data.logo,
      properties: {
        textAlign: 'center',
        lineHeight: '100px'
      }
    });

    return logo;
}

// Creates a modifier for startin the starting
// position
function getModifier() {
    var modifier = new Modifier({
        size: [undefined,undefined],
        origin: [0.5,0],
        align:[0,0],
        transform: Transform.rotate(1,0,0)
    });

    return modifier;
}

// Calls a function which returns a modifier
// depending on the transition type
function enterTransition() {
    return data.enter.type.call(null, data.enter);
}

// Calls a function which returns a modifier
// depending on the transition type
function exitTransition() {
    return data.exit.type.call(null, data.exit);
}

/* TRANSITIONS */
function rotateInOut(dataInput) {
    var rotate = new Modifier;
    rotate.setTransform(
        Transform.rotate(dataInput.rotation.x, dataInput.rotation.y, dataInput.rotation.z),
        {duration: dataInput.duration, curve: dataInput.curve}
    )

    return rotate;
}

function springInOut(dataInput) {

}

function slideInOut(dataInput) {
    var slide = new Modifier;
    slide.setTransform(
        Transform.translate(dataInput.position.x, dataInput.position.y, dataInput.position.z),
        {duration: dataInput.duration, curve: dataInput.curve}
    )

    return slide;
}

function wallInOut(dataInput) {

}

module.exports = AdGenerator;