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

var selected = 'rotate';
console.log(selected, 'selected!!!wqerqwerqwer')
var data = {
        logo: 'images/Coca-Cola.png',
        url: window.parent.document.getElementById('adLink').value || 'http://us.coca-cola.com/home/',
        origin: {},
        initialPosition: {},
        initialRotation: {},
       enter: {
        type: 'rotateInOut',
        position: {x: 0, y: 200, z: 0},
        velocity: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0},
        period: 1000,
        dampingRatio: 0,
        restitution: 0,
        opacity: 1,
        duration: 1000,
        curve: null
        },
      exit: {
        type: 'rotateInOut',
        position: {x: 0, y: 0, z: 0},
        velocity: {x: 0, y: 0, z: 0},
        rotation: {x: Math.PI/2, y: 0, z: 0},
        period: 1000,
        dampingRatio: 0,
        restitution: 0,
        opacity: 1,
        duration: 1000,
        curve: null
       }
}  

        data.origin.x = window.parent.document.getElementById('originX').value;
        data.origin.y = window.parent.document.getElementById('originY').value;
        data.origin.z = window.parent.document.getElementById('originZ').value;

        data.initialPosition.x = window.parent.document.getElementById('initPosX').value;
        data.initialPosition.y = window.parent.document.getElementById('initPosY').value;
        data.initialPosition.z = window.parent.document.getElementById('initPosZ').value;

        data.initialRotation.x = window.parent.document.getElementById('initRotX').value;
        data.initialRotation.y = window.parent.document.getElementById('initRotY').value;
        data.initialRotation.z = window.parent.document.getElementById('initRotZ').value;

        data.opacity = window.parent.document.getElementById('opacity').value;

        // Sets enter transition data parameters

     
        try{
        data.enter.position.x = window.parent.document.getElementById(selected + 'InPosX').value;
        } catch(error) {
          console.log(error);
        }
        try{
        data.enter.position.y = window.parent.document.getElementById(selected + 'InPosY').value || 0;
        } catch(error) {
          console.log(error);
        }
        try{
        data.enter.position.z = window.parent.document.getElementById(selected + 'InPosZ').value || 0;
        } catch(error) {
          console.log(error);
        }
        try{
        data.enter.rotation.x = window.parent.document.getElementById(selected + 'InRotX').value || 0;
        } catch(error) {
          console.log(error);
        }
        try{
        data.enter.rotation.y = window.parent.document.getElementById(selected + 'InRotY').value || 0;
        } catch(error) {
          console.log(error);
        }
        try{
        data.enter.rotation.z = window.parent.document.getElementById(selected + 'InRotZ').value || 0;
        } catch(error) {
          console.log(error);
        }
        try{
        data.enter.period = window.parent.document.getElementById(selected + 'InPeriod').value || 1000;
        } catch(error) {
          console.log(error);
        }
        try{
        data.enter.dampingRatio = window.parent.document.getElementById(selected + 'InDampeningRatio').value || .5;
        } catch(error) {
          console.log(error);
        }
        try{
        data.enter.opacity = window.parent.document.getElementById(selected + 'InOpacity').value || 1;
        } catch(error) {
          console.log(error);
        }
        
        try{
        data.enter.duration = window.parent.document.getElementById(selected + 'InDuration').value || 1000;
        } catch(error) {
          console.log(error);
        }
        try{
        data.enter.curve = window.parent.document.getElementById(selected + 'InCurve option:selected').value || null;
        } catch(error) {
          console.log(error);
        }
        try{
        data.exit.position.x = window.parent.document.getElementById(selected + 'OutPosX').value || 0;
        } catch(error) {
          console.log(error);
        }
        try{
        data.exit.position.y = window.parent.document.getElementById(selected + 'OutPosY').value || 0;
        } catch(error) {
          console.log(error);
        }
        try{
        data.exit.position.z = window.parent.document.getElementById(selected + 'OutPosZ').value || 0;
        } catch(error) {
          console.log(error);
        }
        try{
        data.exit.rotation.x = window.parent.document.getElementById(selected + 'OutRotX').value || 0;
        } catch(error) {
          console.log(error);
        }
        try{
        data.exit.rotation.y = window.parent.document.getElementById(selected + 'OutRotY').value || 0;
        } catch(error) {
          console.log(error);
        }
        try{
        data.exit.rotation.z = window.parent.document.getElementById(selected + 'OutRotZ').value || 0;
        } catch(error) {
          console.log(error);
        }
        try{
        data.exit.period = window.parent.document.getElementById(selected + 'OutPeriod').value || 1000;
        } catch(error) {
          console.log(error);
        }
        try{
        data.exit.dampingRatio = window.parent.document.getElementById(selected + 'OutDampeningRatio').value || .5;
        } catch(error) {
          console.log(error);
        }
        try{
        data.exit.opacity = window.parent.document.getElementById(selected + 'OutOpacity').value || 1;
        } catch(error) {
          console.log(error);
        }
        try{
        data.exit.duration = window.parent.document.getElementById(selected + 'OutDuration').value || 1000;
        } catch(error) {
          console.log(error);
        }
        try{
        data.exit.curve = window.parent.document.getElementById(selected + 'OutCurve option:selected').value || null;
        } catch(error) {
          console.log(error);
        }
        
        


        // Sets exit transition data parameters





console.log(data, 'allthe data')
window.addEventListener('message', recieveMessage, false);

function recieveMessage(event) {
    // data = JSON.parse(event.data);
    console.log(event)
    AdGenerator();
}



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
Transitionable.registerMethod('spring', SnapTransition);
Transitionable.registerMethod('wall', WallTransition);

// Create new transitionable transform and set initial rotation
var transformer = new TransitionableTransform();
transformer.setRotate([data.initialRotation.x, data.initialRotation.y, data.initialRotation.z]);

/* GENERATORS */

// Constructor function for our AppView class
function AdGenerator() {
    console.log('in ad generator')
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