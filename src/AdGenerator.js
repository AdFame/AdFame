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

var transitionRegistry = {
    'rotateInOut': rotateInOut,
    'slideInOut': slideInOut,
    'springInOut': springInOut,
    'wallInOut': wallInOut
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
        size: [undefined, undefined],
        origin: [data.origin.x, data.origin.y, data.origin.z],
        align:[data.initialPosition.x , data.initialPosition.y, data.initialPosition.z],
        transform: Transform.rotate(data.initialRotation.x, data.initialRotation.y, data.initialRotation.z)
    });

    return modifier;
}

// Calls a function which returns a modifier
// depending on the transition type
function enterTransition() {
    return transitionRegistry[data.enter.type](data.enter);
}

// Calls a function which returns a modifier
// depending on the transition type
function exitTransition() {
    return transitionRegistry[data.exit.type](data.exit);
}

/* TRANSITIONS */
function rotateInOut(dataInput) {
    return function(modifier) {
        modifier.setTransform(
            Transform.rotate(dataInput.rotation.x, dataInput.rotation.y, dataInput.rotation.z),
            {duration: dataInput.duration, curve: dataInput.curve}
        );
    }
}

function slideInOut(dataInput) {
    return function(modifier) {
        modifier.setTransform(
            Transform.translate(dataInput.position.x, dataInput.position.y, dataInput.position.z),
            {duration: dataInput.duration, curve: dataInput.curve}
        )
    }
}

function springInOut(dataInput) {
    return function(modifier) {
        Transitionable.registerMethod('spring', SpringTransition);

        var springProperties = {
            type: 'spring',
            period: dataInput.period,
            dampingRatio: dataInput.dampingRatio,
        }

        modifier.setTransform(Transform.translate(0,0,0), springProperties)
    }
}

function wallInOut(dataInput) {
    return function(modifier) {
        Transitionable.registerMethod('wall', WallTransition);
        
        var wallProperties = {
            type: 'wall',
            period: dataInput.period,
            dampingRatio : dataInput.dampingRatio,
            velocity: dataInput.velocity,
            restitution : dataInput.restitution
        };

        modifier.setTransform(Transform.translate(0,0,0), wallProperties);
    }
}
module.exports = AdGenerator;