// Import additional modules to be used in this view 
var View = require('famous/core/View');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var Modifier   = require("famous/core/Modifier");
var ImageSurface = require('famous/surfaces/ImageSurface')

var StateModifier = require('famous/modifiers/StateModifier');
var GridLayout = require("famous/views/GridLayout");
var Transitionable = require("famous/transitions/Transitionable")
var Transform = require("famous/core/Transform");
var SpringTransition = require("famous/transitions/SpringTransition");

var GenericSync = require("famous/inputs/GenericSync");
var MouseSync   = require("famous/inputs/MouseSync");
var TouchSync   = require("famous/inputs/TouchSync");

// Register sync classes globally for later use in GenericSync
GenericSync.register({
    "mouse" : MouseSync,
    "touch" : TouchSync
});

// Assign mouse and touch syncing methods
var sync = new GenericSync(
    ["mouse", "touch"],
    {direction : GenericSync.DIRECTION_X}
);

// Constructor function for our AppView class
function AppView() {
    var logo = new ImageSurface({
      size: [300, 100],
      content: 'images/Coca-Cola.png',
      classes: ['backfaceVisibility'],
      properties: {
        textAlign: 'center',
        lineHeight: '100px'
      }
    });

    logo.pipe(sync)

    return logo;
}

module.exports = AppView;