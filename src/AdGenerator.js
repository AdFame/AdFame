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
var logo = getLogo();
var position = [0, 0];
var posX = .5;
var called = false;
var location = 0;
var positionModifier = new Modifier({
    transform : function(){
        return Transform.translate(position[0], position[1], 0);
    }
});
console.log(position)
logo.pipe(sync)
// Constructor function for our AppView class
function AdGenerator() {
    return {logo: logo, modifier: modifier, positionModifier: positionModifier};
}

logo.on('click', function(){ 

    sync.on('update', function(data){
        position[0] += data.delta
    });
})


function getLogo() {
    var logo = new ImageSurface({
      size: [300, 100],
      content: 'images/Coca-Cola.png',
      classes: ['backfaceVisibility'],
      properties: {
        textAlign: 'center',
        lineHeight: '100px'
      }
    });

    return logo;
}

var modifier = new Modifier({
    size: [100,100],
    origin: [.5,1 ],
    align:[.5,.08],
    transform: Transform.rotate(2,0,.1)
});

window.onscroll = function(location, called, posX){
    if (window.pageYOffset>150 && !called){
        
        if (window.pageYOffset>location){
        posX+=window.pageYOffset/100000
        called=true;
        }else{
            posX-=window.pageYOffset/100000
        }
        location=window.pageYOffset;
    }
    if (window.pageYOffset>1000){
        called=false;
    }
    modifier.transformFrom(Transform.rotateX(posX));
};

module.exports = AdGenerator;