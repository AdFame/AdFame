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


//register and set spring transition
Transitionable.registerMethod('spring', SpringTransition);

var spring = {
  method: 'spring',
  period: 1500,
  dampingRatio: 0.4
};

/******set element to container******/
var el = document.getElementById('famous-container');
Engine.setOptions({ appMode: false });
var context = Engine.createContext(el);

//semainBallMod1 color
var colorScheme = "hsl(" + (Math.random() * 3600 / 4) + ", 100%, 50%)";




/******main ball******/
var ball = new Surface ({
  size: [35,35],
  properties: {
    backgroundColor: colorScheme,  
    borderRadius: "17.5px"
  }
})

var bigBallMod = new StateModifier({
    opacity: .5
})


/******inner ball******/
var innerBallShineMod = new StateModifier({
    opacity: .5
})

var innerBallShine = new Surface({
  size: [31,31],
  properties: {
    backgroundColor: '#dddddd',
    borderRadius: '16px'
  }
});


/******small ball shine******/
var tinyBallShine = new Surface({
  size:[13,8],
  properties: {
    backgroundColor: '#dddddd',
    borderRadius: '5px'
  }
});

var tinyBallShineMod = new StateModifier({
    opacity: .5,
    origin:[1,1],
})


/******main ball******/
var banner = new Surface({
    size:[245,70],
    properties: {
    backgroundColor: colorScheme,
    borderRadius: "10px",
    textAlign: "center"
    }
});

var bannerOpacity = new StateModifier({
  opacity: 0.5
})

var bannerMod = new StateModifier({
  align:[0.5,1],
  origin:[0.5,0],
  transform: Transform.translate(0,window.innerHeight + 100,0)
});

var adMod = new StateModifier({
  align: [0,0.5],
  origin: [0,0],
  
})

var ad = new Surface({
  content: '<a href="http://famo.us"><img src="./banner.JPG" /></a>',
  properties: {
    textAlign: 'center',
    zIndex: 200,
    marginTop:'5px'
  }
});

//set initial ball off the screen
var initStateBall = new StateModifier({
  transform: Transform.translate(0,-100,0)
})



//modifiers can pass in functions and you don't need to bind to prerender,
//modifiers if you pass in a function act on every tick



//main click event for ball
innerBallShine.on("click",function(){
  circle.setVelocity([0,.5,0])
  bottomWall.setOptions({restitution:0});

  //if ball collides with bottom wall trigger banner transition in
  bottomWall.on('collision', function(){
    circle.setVelocity[0,0,0]
    bannerMod.setTransform(Transform.translate(0,window.innerHeight - 100, 0), spring, function(){
    });
  });
})


//click events for banner
banner.on('click', function(){
  bannerMod.setTransform(Transform.rotate(0, .5, 0), spring, function(){
    bannerMod.setTransform(Transform.rotate(0,0,0),spring)
  });
});


/******main scroll event handlers******/
var initialVelocityCalled = false;

window.onscroll = function(){

//set color scheme to change based on scroll
   var colorSchemeScroll = "hsl(" + (window.pageYOffset / 5) + ", 100%, 50%)";  

   ball.setProperties({backgroundColor:colorSchemeScroll});
   banner.setProperties({backgroundColor:colorSchemeScroll});

//call random initial velocity on first scroll and not yet called
  if(window.pageYOffset > 0 && !initialVelocityCalled){
    initialVelocityCalled = true;
    circle.setVelocity([Math.random(),Math.random(),0]);
 
  } 


}

var physicsEngine = new PhysicsEngine();

var circle = new Circle({radius:15});

var mainBallModPE = new Modifier({origin:[.5,0.5], align:[0.5,-.1], transform: function(){
    return this.getTransform();
   }.bind(circle)

});

physicsEngine.addBody(circle);

/******render tree******/

//add a functional modfier(apply trnasform) or add a particle 
var mainBanner = context.add(bannerMod)
 mainBanner.add(bannerOpacity).add(banner)
 mainBanner.add(adMod).add(ad)

var node = context.add(initStateBall).add(mainBallModPE)
node.add(innerBallShineMod).add(innerBallShine)
node.add(tinyBallShineMod).add(tinyBallShine)
node.add(bigBallMod).add(ball)

//set up wall boundaries to screen for physics engine
var topWall     = new Wall({normal : [0,1,0],  distance: -10, restitution : 0.4});
var bottomWall  = new Wall({normal : [0,-.9,0], distance: window.innerHeight + 40, restitution : 0.4});
var leftWall    = new Wall({normal : [1,0,0],  distance: window.innerWidth*.5, restitution : 0.4});
var rightWall   = new Wall({normal : [-1,0,0], distance: window.innerWidth*.5, restitution : 0.4});

physicsEngine.attach( leftWall,  [circle]);
physicsEngine.attach( rightWall, [circle]);
physicsEngine.attach( topWall,   [circle]);
physicsEngine.attach( bottomWall,[circle]);

});
