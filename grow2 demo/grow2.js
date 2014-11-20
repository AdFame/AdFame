
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

    


 var targetPosition = document.getElementById('famous-container').offsetTop;
 var startPositionDiv = document.getElementById('start-container').offsetTop;
 var startContainerHeight = parseFloat(document.getElementById('start-container').style.height); 
 var initPadding = 300;
 var startContainerWidth = parseFloat(document.getElementById('start-container').style.width);
 var distanceUp = targetPosition - startPositionDiv;

  var logo = new Surface({
    content: '<img src="./pacifico.jpg">',
    origin: [0,0],
    align: [0.1,0]
  });

  var initLogoPosit = new StateModifier({
    transform: Transform.translate(0,-distanceUp,0)
  })

  
  var initRotate = new StateModifier({
    origin: [0,0]
  })

  context.add(initRotate).add(initLogoPosit).add(logo)


  var padding = window.innerHeight - 100;
  var maxHeight = window.innerHeight + padding - 300; 
  var containerHeight = parseFloat(document.getElementById('famous-container').style.height);
  var getContainerHeight = function(){ return parseFloat(document.getElementById('famous-container').style.height); }
  var distanceTravelled = function(){ return window.pageYOffset + padding - targetPosition }
  var getFirstDistanceTraveled = function() { return window.pageYOffset - startPositionDiv + initPadding; }
  var getWidthPercentage = function(){ return (225 - getFirstDistanceTraveled())/225}
  var getStartContainerHeight = function(){ return parseFloat(document.getElementById('start-container').style.height); }

  var transCalled = false;
  var transOutCalled = false
   window.onscroll = function(){
    
    if(startPositionDiv < window.pageYOffset + initPadding) {
      console.log(document.getElementById('start-container').style.height)
     initRotate.setTransform(Transform.rotate(getFirstDistanceTraveled()/150,-getFirstDistanceTraveled()/150,0))
      console.log(getFirstDistanceTraveled(), 'width position:  ', getWidthPercentage());
      
      if(getWidthPercentage() > 0 && getWidthPercentage() < 100){
        document.getElementById('start-container').style.width = getWidthPercentage()*startContainerWidth +"px"; 
      }
    }
    

    // 221-2
    // 2=100%
    // 162 =50%
    // x= 50%
    // 221 = 0%
    // if(getFirstDistanceTraveled() > 100){
    //   document.getElementById('start-container').style.display = 'none';
    // } 

    if( window.pageYOffset + initPadding < startPositionDiv){
      document.getElementById('start-container').style.display = "block"
    } 
    
    if(getContainerHeight() > 200 && !transCalled) {
     
      transCalled = true;
       transOutCalled = false;
    }
    
    if(getContainerHeight() < 85 && !transOutCalled) {
   
      transCalled = false;
      transOutCalled = true;
    }

    // bgmodifier.setTransform(Transform.translate(0,distanceTravelled()/4,-1)) 
    // bgmodifier2.setTransform(Transform.translate(0,-distanceTravelled()/4,-2)) 
    
        //if you have passed the target point(+ padding) and the container height and distance travelled is less than the max
    if(window.pageYOffset + padding > targetPosition && getContainerHeight() + distanceTravelled() < maxHeight) { 
     
     //set height of container to current height + distance travelled past target point
     document.getElementById('famous-container').style.height = containerHeight + distanceTravelled() +"px";
    
    }
  } 
});
