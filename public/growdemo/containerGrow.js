define(function(require, exports, module) {
  var Engine       = require('famous/core/Engine');
  var EventHandler = require('famous/core/EventHandler');
  var Surface      = require('famous/core/Surface');
  var StateModifier   = require('famous/modifiers/StateModifier');
  var Transform      = require("famous/core/Transform");
  var Transitionable = require("famous/transitions/Transitionable");
  var WallTransition = require("famous/transitions/WallTransition");
  var SpringTransition = require("famous/transitions/SpringTransition")
  var View = require('famous/core/View');


  

  /****** set up container for Ad ******/

  //create app container
  var el = document.getElementById('famous-container');
  Engine.setOptions({ appMode: false });
  var context = Engine.createContext(el);
  
  //add container properties
  var containerStyle = el.style
  containerStyle.display = 'block';
  containerStyle.overflow = 'hidden';
  containerStyle.height = '0px'; 
  containerStyle.width = '100%';   




  /****** tv componenets ******/
  
  var tv = new Surface({
      size: [141,200],
      content: '<img src="./growdemo/tv.png" />'
  
  });
  
  //possibly refactor into a container surface to avoid iframe
  var tvScreen = new Surface({
      size:[116,87],
      content: '<div id="wrapper"><iframe src="./growdemo/scroll.html" scrolling="no" seamless="seamless" frameBorder="0" style="height:87px; width:116px"></iframe></div>',
      properties: {
      zIndex: '10',
      textAlign: 'center'
    }
  });
  
  //tilts the TV and the components within
  var tvTilt = new StateModifier({
      transform: Transform.rotateZ(Math.PI/16),
  });

  //the modifier that handles movement on and off the stage
  var moveTvOnOffStage = new StateModifier({
    transform: Transform.translate(-250, -250, 0)
  });

  //sets size for assembled TV and centers tv and screen 
  var mainMod = new StateModifier({
    origin:[0.5,0.5],
    size:[141,200]
  })

  //aligns tv to modifier above
  var modScreen = new StateModifier({
    origin:[0,0],
    align: [.1,.1]    
  });
  




  /****** render tree ******/

  var node = context.add(moveTvOnOffStage).add(tvTilt).add(mainMod)
  
  //add tv and screen to same branch
  node.add(modScreen).add(tvScreen)
  node.add(tv)
         


  
 
  /****** register transition for TV in and Out ******/
  
  Transitionable.registerMethod('spring', SpringTransition);
 
  var spring = {
    method: 'spring',
    period: 1000,
    dampingRatio: 0.4
  };




/****** scrolling logic ******/

//find distance of target container from top of window
var targetPosition = document.getElementById('famous-container').offsetTop;

//how far from bottom of page to trigger expanding container
var padding = window.innerHeight - 100;

//max height set to 400 px or you can calculate based on window height
var maxHeight = 400; //window.innerHeight - 400; 

//target container height at start
var containerHeightStart = parseFloat(document.getElementById('famous-container').style.height);
var getCurrentContainerHeight = function(){ return parseFloat(document.getElementById('famous-container').style.height); }
var distanceTravelledPastTarget = function(){ return window.pageYOffset + padding - targetPosition }

//trigger animation when container reaches this height
var heightToTriggerIntro = 10;
var heightToTriggerOutro = 150;

//keep track of in/out transitions to avoid multiple calls onscroll
var transCalled = false;
var transOutCalled = false




/****** main native scroll event listener ******/

window.onscroll = function(){

   //INTRO

  //trigger intro animation if container height is past trigger intro height
  if(getCurrentContainerHeight() > heightToTriggerIntro && !transCalled) {
    
    //halt any trans to avoid duplicate calls if trans isnt finished
    moveTvOnOffStage.halt();

    moveTvOnOffStage.setTransform(Transform.translate(110,25,0), spring);
    
    transCalled = true;
    transOutCalled = false;
  }
  
  //OUTRO

  //trigger outro animation if container height is past trigger outro height 
  if(getCurrentContainerHeight() < heightToTriggerOutro && !transOutCalled) {
    
    //halt any trans to avoid duplicate calls if trans isnt finished
    moveTvOnOffStage.halt();

    moveTvOnOffStage.setTransform(Transform.translate(-250,-250,0), spring);
   
    transCalled = false;
    transOutCalled = true;
  }
  
  //SET SCROLLING TO CHANGE CONTAINER SIZE

  //if you have passed the target point + padding and the container height and distance travelled is less than the max
  if(window.pageYOffset + padding > targetPosition && getCurrentContainerHeight() + distanceTravelledPastTarget() < maxHeight) { 
   
   //set height of container to current height + distance travelled past target point
   document.getElementById('famous-container').style.height = containerHeightStart + distanceTravelledPastTarget() +"px";

  }
  
} 


});