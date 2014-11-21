define(function(require, exports, module) {
var Engine          = require('famous/core/Engine');
var Surface         = require('famous/core/Surface');
var EventHandler    = require('famous/core/EventHandler');
var View            = require('famous/core/View');
var Transform       = require('famous/core/Transform');

var StateModifier   = require('famous/modifiers/StateModifier');
var Modifier   = require('famous/core/Modifier');

var PhysicsEngine   = require('famous/physics/PhysicsEngine');
var Body            = require('famous/physics/bodies/Body');
var Circle          = require('famous/physics/bodies/Circle');
var Wall            = require('famous/physics/constraints/Wall');
var ImageSurface = require('famous/surfaces/ImageSurface');
var Transitionable = require('famous/transitions/Transitionable');
var SpringTransition = require('famous/transitions/SpringTransition');
Transitionable.registerMethod('spring', SpringTransition);

//var WallTransition = require('famous/transitions/WallTransition');
//var Draggable = require('famous/modifiers/Draggable');
//var draggable = new Draggable({
    //    xRange: [0, window.innerWidth],
  //      yRange: [0, window.innerHeight]
    //});

//Transitionable.registerMethod('wall', WallTransition);

var el = document.getElementById('famous-container');
Engine.setOptions({ appMode: false });
var context = Engine.createContext(el);

var handler = new EventHandler();

var physicsEngine = new PhysicsEngine();

var colorScheme = "hsl(" + (Math.random() * 3600 / 4) + ", 100%, 50%)";

var ball = new Surface ({
  size: [35,35],
  properties: {
    backgroundColor: colorScheme,  
    borderRadius: "17.5px"
  }
})


var shine = new Surface({
  size: [31,31],
  properties: {
    backgroundColor: '#dddddd',
    borderRadius: '16px'
  }
});

var shine2 = new Surface({
  size:[13,8],
  properties: {
    backgroundColor: '#dddddd',
    borderRadius: '5px'
  }
});

var opacity = new StateModifier({
    opacity: .5
})

var opacity3 = new StateModifier({
    opacity: .5
})

var opacity2 = new StateModifier({
    opacity: .5,
    origin:[1,1],
})


var mod = new StateModifier({
    size: [undefined,undefined]
})





//modifiers can pass in functions and you don't need to bind to prerender,
//modifiers if you pass in a function act on every tick


var circle = new Circle({radius:15});

var ballState = new Modifier({origin:[.5,0.5], align:[0.5,-.1], transform: function(){
    return this.getTransform();
   }.bind(circle)

});




physicsEngine.addBody(circle);

var called = false;

window.onscroll = function(){
   var colorScheme = "hsl(" + (window.pageYOffset / 5) + ", 100%, 50%)";  
    
   ball.setProperties({backgroundColor:colorScheme});
   banner.setProperties({backgroundColor:colorScheme});
  if(window.pageYOffset > 0 && !called){
    called = true;
    circle.setVelocity([Math.random(),Math.random(),0]);
 
  } 


}



var banner = new Surface({
    size:[200,75],
    content: 'Your Ad Here',
    properties: {
    backgroundColor: colorScheme,
    borderRadius: "15px",
    textAlign: "center"
    }
});


var spring = {
  method: 'spring',
  period: 1500,
  dampingRatio: 0.4
};


var bannerInit = new StateModifier({
  align:[0.5,1],
  origin:[0.5,0],
  opacity: .5,
  transform: Transform.translate(0,window.innerHeight + 100,0)
});

banner.on('click', function(){
  bannerInit.setTransform(Transform.rotate(0, .5, 0), spring, function(){
    bannerInit.setTransform(Transform.rotate(0,0,0),spring)
  });
});

shine.on("click",function(){
  console.log('clicked')
   // PhysicsEngine.removeBody(circle);
    //circle
  circle.setVelocity([0,.5,0])
  bottomWall.setOptions({restitution:0});
  bottomWall.on('collision', function(){
    circle.setVelocity[0,0,0]
    bannerInit.setTransform(Transform.translate(0,window.innerHeight - 100, 0), spring, function(){
      // document.getElementById('famous-container').style.height = '200px';
      // bannerInit.setAlign([0.5,0.9,0])
      // document.getElementById('famous-container').style.bottom = 10 + "px";
    });
    //topWall({normal})
  });
});

//add a functional modfier(apply trnasform ) or add a particle 

context.add(bannerInit).add(banner);

var initStateBall = new StateModifier({
  transform: Transform.translate(0,-100,0)
})

var node = context.add(initStateBall).add(ballState)
node.add(opacity).add(shine)
node.add(opacity2).add(shine2)
node.add(opacity3).add(ball)

var topWall     = new Wall({normal : [0,1,0],  distance: -10, restitution : 0.4});
var bottomWall  = new Wall({normal : [0,-.9,0], distance: window.innerHeight + 40, restitution : 0.4});
var leftWall    = new Wall({normal : [1,0,0],  distance: window.innerWidth*.5, restitution : 0.4});
var rightWall   = new Wall({normal : [-1,0,0], distance: window.innerWidth*.5, restitution : 0.4});



physicsEngine.attach( leftWall,  [circle]);
physicsEngine.attach( rightWall, [circle]);
physicsEngine.attach( topWall,   [circle]);
physicsEngine.attach( bottomWall,[circle]);


});

