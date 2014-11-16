// Import additional modules to be used in this view 
var View = require('famous/core/View');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var Modifier   = require('famous/core/Modifier');
var ImageSurface = require('famous/surfaces/ImageSurface');
var Easing = require('famous/transitions/Easing');

var StateModifier = require('famous/modifiers/StateModifier');
var WallTransition = require('famous/transitions/WallTransition');
var GridLayout = require('famous/views/GridLayout');
var Transitionable = require('famous/transitions/Transitionable');
var Transform = require('famous/core/Transform');
var SpringTransition = require('famous/transitions/SpringTransition');

// Importanting data form data.js dummy file
var data = require('./data.js')

/* GENERATORS */

// Constructor function for our AppView class
function AdGenerator() {
    var logo = getLogo();
    var modifier = getModifier();
    var enter = enterTransition();
    var exit = exitTransition();

    return {logo: logo, modifier: modifier, enter: enter, exit: exit};
}

// Creates a surface using the image
// provided by the client
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

// Creates a modifier for the starting
// state
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
    return eval(data.enter.type).call(null, data.enter);
}

// Calls a function which returns a modifier
// depending on the transition type
function exitTransition() {
    return eval(data.exit.type).call(null, data.exit);
}

/* TRANSITIONS */
function rotateInOut(dataInput) {
    var rotate = new Modifier;
    rotate.setTransform(
        Transform.rotate(dataInput.rotation.x, dataInput.rotation.y, dataInput.rotation.z),
        {duration: dataInput.duration, curve: dataInput.curve}
    );

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
    var wallModifier = new Modifier();
    Transitionable.registerMethod('wall', WallTransition);
    
    var wallProperties = {
        type: 'wall',
        period: dataInput.period,
        dampingRatio : dataInput.dampingRatio,
        velocity: dataInput.velocity,
        restitution : dataInput.restitution
    };

    wallModifier.setTransform(Transform.translate(0,0,0), wallProperties);
    
    return wallModifier; 
}

module.exports = AdGenerator;