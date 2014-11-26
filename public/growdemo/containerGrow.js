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


    var el = document.getElementById('famous-container');
    Engine.setOptions({ appMode: false });
    var context = Engine.createContext(el);

    

    /****** these are the tv componenets ******/
    
    var tv = new Surface({
        size: [65,65],
        content: '<img src="./growdemo/tv.png" />'
    
    });
    
    var knob = new Surface({
      size:[25,25],
     // origin: [0.5,0.5],
      content: '<img src="./growdemo/knob.png" />',
      properties: {
         //'center',
        zIndex: '100'
      }
    })

    var tvScreen = new Surface({
        size:[116,87],
        content: '<iframe src="./growdemo/scroll.html" style="height:87px; width:116px"></iframe>',
        properties: {
        zIndex: '10'
      }
    });

    var rotater = new StateModifier({
        transform: Transform.rotateZ(Math.PI/16),
    });

    var aligner = new StateModifier({
      transform: Transform.translate(-250, -250, 0)
    });
  
    


    var mainMod = new StateModifier({
        origin:[0.5,0.5],
        align:[0, 0],
    })
    
    var modScreen = new StateModifier({
      origin:[.15,.2],
      
    });
    
    

    /****** these are the tv componenets ******/


    //******************render tree****************//
    var node = context.add(aligner).add(rotater).add(mainMod)
           node.add(modScreen).add(tvScreen)
           node.add(tv)
           // node.add(knobpos).add(knobrotate).add(knob)
    
  //******************render tree****************//
    
   
   
    Transitionable.registerMethod('spring', SpringTransition);
    var transition = {
        method: 'wall',
        period: 1500,
        dampingRatio : 0,
        velocity: 0,
        restitution : 0 
    };
    
    var spring = {
      method: 'spring',
      period: 1000,
      dampingRatio: 0.4
    };



 var targetPosition = document.getElementById('famous-container').offsetTop;

  
  //start expading 100px from bottom of page
  console.log(window.innerHeight)
  var padding = window.innerHeight - 100;
  var maxHeight = window.innerHeight + padding - 300; 
  var containerHeight = parseFloat(document.getElementById('famous-container').style.height);
  var getContainerHeight = function(){ return parseFloat(document.getElementById('famous-container').style.height); }
  var distanceTravelled = function(){ return window.pageYOffset + padding - targetPosition }
  var transCalled = false;
  var transOutCalled = false
   window.onscroll = function(){
    
    if(getContainerHeight() > 10 && !transCalled) {
      aligner.halt();
      aligner.setTransform(Transform.translate(150,75,0), spring);
      transCalled = true;
       transOutCalled = false;
    }
    
    if(getContainerHeight() < 150 && !transOutCalled) {
      aligner.halt();
      aligner.setTransform(Transform.translate(-250,-250,0), spring);
      transCalled = false;
      transOutCalled = true;
    }

  
        //if you have passed the target point(+ padding) and the container height and distance travelled is less than the max
    if(window.pageYOffset + padding > targetPosition && getContainerHeight() + distanceTravelled() < maxHeight) { 
     
     //set height of container to current height + distance travelled past target point
     document.getElementById('famous-container').style.height = containerHeight + distanceTravelled() +"px";
    
    }
  } 
});