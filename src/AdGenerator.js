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
var Scroll = require('./scroll.js');

var EventHandler = require('famous/core/EventHandler');

setInterval(function(){
    console.log(Scroll, "test");

}, 5000)

//listen to scroll events
var targetReachedListener = new EventHandler();
var targetEndReachedListener = new EventHandler();
var targetNotYetReached = new EventHandler();

//subscribe to scroll events
targetReachedListener.subscribe(Scroll.targetReached);
targetEndReachedListener.subscribe(Scroll.targetEndReached);
targetNotYetReached.subscribe(Scroll.targetNotReached)

//act on srcoll events
targetReachedListener.on('targetreached', function(){
  console.log('great success!!!!!!!!!');
});

targetEndReachedListener.on('targetendreached', function(){
  console.log('yipppppeeee!!')
});

targetNotYetReached.on('targetnotreached', function(j){
  console.log('position is:', j.position)
});

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
    var positionModifier = getPositionModifier();

    return {logo: logo, modifier: modifier, positionModifier: positionModifier};
}

function getLogo() {
    var logo = new ImageSurface({
      size: [300, 100],
      content: 'images/Coca-Cola.png',
      properties: {
        textAlign: 'center',
        lineHeight: '100px'
      }
    });

    return logo;
}

function getModifier() {
    var modifier = new Modifier({
        size: [100,100],
        origin: [1,.5 ],
        align:[.5,.25],
        transform: Transform.rotate(2,0,.1)
    });

    return modifier;
}

function getPositionModifier() {
    var position = [0, 0];
    var positionModifier = new Modifier({
        transform : function(){
            return Transform.translate(position[0], position[1], 0);
        }
    });

    return positionModifier;
}

module.exports = AdGenerator;