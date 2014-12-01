// Import additional modules to be used in this view 
var View = require('famous/core/View');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var Transitionable = require('famous/transitions/Transitionable');
var Modifier   = require('famous/core/Modifier');
var ImageSurface = require('famous/surfaces/ImageSurface');
var Easing = require('famous/transitions/Easing');

var StateModifier = require('famous/modifiers/StateModifier');
var GridLayout = require('famous/views/GridLayout');
var Transform = require('famous/core/Transform');

var TransitionableTransform = require('famous/transitions/TransitionableTransform')
var WallTransition = require('famous/transitions/WallTransition');
var SpringTransition = require('famous/transitions/SpringTransition');
var SnapTransition = require('famous/transitions/SnapTransition');

// Importanting data form data.js dummy file
// var data = require('../public/userinput/userinput.js');
var data = require('./data.js')

// Registry of transitions
var transitionRegistry = {
    'rotateInOut': rotateInOut,
    'slideInOut': slideInOut,
    'springInOut': springInOut,
    'wallInOut': wallInOut
}

// Registry of easings
var easingRegistry = {
    'inQuad': Easing.inQuad,
    'outQuad': Easing.outQuad,
    'inOutQuad': Easing.inOutQuad,
    'inCubic': Easing.inCubic,
    'outCubic': Easing.outCubic,
    'inOutCubic': Easing.inOutCubic,
    'inQuart': Easing.inQuart,
    'outQuart': Easing.outQuart,
    'inOutQuart': Easing.inOutQuart, 
    'inQuint': Easing.inQuint,
    'outQuint': Easing.outQuint,
    'inOutQuint': Easing.inOutQuint,
    'inSine': Easing.inSine,
    'outSine': Easing.outSine,
    'inOutSine': Easing.inOutSine,
    'inExpo': Easing.inExpo,
    'outExpo': Easing.outExpo,
    'inOutExpo': Easing.inOutExpo,
    'inCirc': Easing.inCirc,
    'outCirc': Easing.outCirc,
    'inOutCirc': Easing.inOutCirc,
    'inElastic': Easing.inElastic,
    'outElastic': Easing.outElastic,
    'inOutElastic': Easing.inOutElastic,
    'inBack': Easing.inBack,
    'outBack': Easing.outBack,
    'inOutBack': Easing.inOutBack,
    'inBounce': Easing.inBounce,
    'outBounce': Easing.outBounce,
    'inOutBounce': Easing.inOutBounce
}

// Rester spring and wall transitions
Transitionable.registerMethod('spring', SpringTransition);
Transitionable.registerMethod('wall', WallTransition);

// Create new transitionable transform and set initial rotation
var transformer = new TransitionableTransform();
transformer.setRotate([data.initialRotation.x, data.initialRotation.y, data.initialRotation.z]);

/* GENERATORS */
// Constructor function for our AppView class
function AdGenerator() {
    var logo = getLogo();
    var modifier = getModifier();
    var enter = enterTransition();
    var exit = exitTransition();

    return {
        logo: logo, 
        modifier: modifier, 
        enter: enter, 
        exit: exit,
        transformer: transformer
    };
}

// Creates a surface using the image
// provided by the client
function getLogo() {
    var logo = new ImageSurface({
      size: [240, 80],
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
        origin: [+data.origin.x, +data.origin.y, +data.origin.z],
        align:[+data.initialPosition.x , +data.initialPosition.y, +data.initialPosition.z],
        transform: transformer
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
    return function() {
        var rotationProperties = {
            duration: +dataInput.duration,
            curve: +easingRegistry[dataInput.curve]
        }

        transformer.setRotate(
            [+dataInput.rotation.x, +dataInput.rotation.y, +dataInput.rotation.z],
            rotationProperties
        );
    }
}

function slideInOut(dataInput) {
    return function() {
        var slideProperties = {
            duration: +dataInput.duration,
            curve: +easingRegistry[dataInput.curve]
        }

        transformer.setTranslate(
            [+dataInput.position.x, +dataInput.position.y, +dataInput.position.z],
            slideProperties
        );
    }
}

function springInOut(dataInput) {
    return function() {
        var springProperties = {
            type: 'spring',
            period: +dataInput.period,
            dampingRatio: +dataInput.dampingRatio,
        }

        transformer.setTranslate(
            [+dataInput.position.x, +dataInput.position.y, +dataInput.position.z],
            springProperties
        );
    }
}

function wallInOut(dataInput) {
    return function() {
        
        var wallProperties = {
            method: 'wall',
            period: +dataInput.period,
            dampingRatio : +dataInput.dampingRatio,
        };

        transformer.setTranslate(
            [+dataInput.position.x, +dataInput.position.y, +dataInput.position.z],
            wallProperties
        );
    }
}
module.exports = AdGenerator;