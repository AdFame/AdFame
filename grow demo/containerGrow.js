
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
        content: '<img src="rsz_old-tv.png" />'
    
    });
    
    var knob = new Surface({
      size:[15,15],
      content: '<img src="./knob.png" />'
    })

    var tvScreen = new Surface({
        size:[58,42],
        content: '<iframe src="./scroll.html" style="height:42px; width:58px"></iframe>'
    });

    var rotater = new StateModifier({
        transform: Transform.rotateZ(Math.PI/16),
    });

    var aligner = new StateModifier({
      transform: Transform.translate(100, 50, 0)
    });

    var knobpos = new StateModifier({
      origin: [0.5,0.5],
      align: [0.12,0.1],
      transform: Transform.translate(0,0,110)
    })
    
    // var knobrotate = new StateModifier({
    //   origin: [0.5,0.5],
    //   align:[0.5,0.5],
    //   transform: Transform.translate(0,0,110)
    // })


    var mainMod = new StateModifier({
        origin:[0.5,0.5],
        align:[0, 0],
    })
    
    var modScreen = new StateModifier({
      origin:[.41,.54 ],
      transform: Transform.translate(0,0,100)
    });
    
    /****** these are the tv componenets ******/


    //******************render tree****************//
    var node = context.add(aligner).add(rotater).add(mainMod)
           node.add(knobpos).add(knob)
           node.add(modScreen).add(tvScreen)
           node.add(tv);
    
  //******************render tree****************//
    
   
    Transitionable.registerMethod('wall', WallTransition);
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



     setInterval(function(){
         rotater.setTransform(Transform.rotate(0,0,Math.random()/10),spring)
         knobpos.setTransform(Transform.rotate(0,0,Math.random()*Math.random()))
     }, 1500)

    // var bgmodifier = new StateModifier({
    //   origin:[0,0],
    //   align:[0,0],
    //   opacity: .2
    // });

    // var bgsurface = new Surface({
    //    size:[undefined,undefined],
    //    properties: {
    //     backgroundColor: 'blue'
    //    }
    // });


    
    // var bgmodifier2 = new StateModifier({
    //   origin:[0,0],
    //   align:[0,0],
    //   opacity: .2
    // });

    // var bgsurface2 = new Surface({
    //    size:[undefined,undefined],
    //    properties: {
    //     backgroundColor: 'red'
    //    }
    // });


    // context.add(bgmodifier).add(bgsurface)
    // context.add(bgmodifier2).add(bgsurface2);


 var targetPosition = document.getElementById('famous-container').offsetTop;


  //start expading 100px from bottom of page
  console.log(window.innerHeight)
  var padding = window.innerHeight - 100;
  var maxHeight = window.innerHeight + padding - 300; 
  var containerHeight = parseFloat(document.getElementById('famous-container').style.height);
  var getContainerHeight = function(){ return parseFloat(document.getElementById('famous-container').style.height); }
  var distanceTravelled = function(){ return window.pageYOffset + padding - targetPosition }

   window.onscroll = function(){
    // bgmodifier.setTransform(Transform.translate(0,distanceTravelled()/4,-1)) 
    // bgmodifier2.setTransform(Transform.translate(0,-distanceTravelled()/4,-2)) 
        //if you have passed the target point(+ padding) and the container height and distance travelled is less than the max
    if(window.pageYOffset + padding > targetPosition && getContainerHeight() + distanceTravelled() < maxHeight) { 
     
     //set height of container to current height + distance travelled past target point
     document.getElementById('famous-container').style.height = containerHeight + distanceTravelled() +"px";
    
    }
  } 
});
