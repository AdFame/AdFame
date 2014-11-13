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

var GenericSync = require('famous/inputs/GenericSync');
var MouseSync   = require('famous/inputs/MouseSync');
var TouchSync   = require('famous/inputs/TouchSync');



// Register sync classes globally for later use in GenericSync
GenericSync.register({
    'mouse' : MouseSync,
    'touch' : TouchSync
});

// Assign mouse and touch syncing methods
var sync = new GenericSync(
    ['mouse', 'touch'],
    {direction : GenericSync.DIRECTION_X}
);

// Constructor function for our AppView class
function AdGenerator() {
    var logo = getLogo();
    var modifier = getModifier();
    // var positionModifier = getPositionModifier();

    return {logo: logo, modifier: modifier};
}

function getLogo() {
    var logo = new ImageSurface({
      size: [300, 100],
      content: 'images/apple.jpg',
      properties: {
        textAlign: 'center',
        lineHeight: '100px'
      }
    });

    return logo;
}



function getModifier() {
    var modifier = new Modifier({
        size: [undefined,undefined],
        origin: [0.5,0.5],
        align:[.5,0],
        transform: Transform.rotate(1,0,0)
    });

    return modifier;
}


module.exports = AdGenerator;