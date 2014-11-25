
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

     window.addEventListener("message", receiveMessage, false);

    function receiveMessage(event){
      if(event.data === 'clicker'){
        clicker.setSize([60,60], spring)
        //.setTransform(Transform.rotate(0,0,Math.PI/4))

      } else {

        var win = document.getElementById('fe').contentWindow
        win.postMessage(event.data, '*')
        moveWindows(event.data)
      }
    }

    var moveWindows = function(size){
      rainMod.setTransform(Transform.translate(0,-size/2,0));
      treeModifier.setTransform(Transform.translate(0,-size/3,0));
      bgMod.setTransform(Transform.translate(0,-size/20,0));
      tree2Mod.setTransform(Transform.translate(0,-size+size/1.5))
    }

    var mainMod = new StateModifier({
      size: [250,250],
      origin: [0.5,0.5],
      align:[0.5,0.5]
    })
     
    var rain = new Surface({
      content: '<img src="gotas.png" />',
      properties: {
        zIndex: '-10',
        height: '500px',
        width: '500px'
      }
    })

    var rainMod = new StateModifier({
      align:[0,0],
      size: [undefined, undefined ]
    })
    
    var trees = new Surface({
      content: '<img src="trees.png">',
      properties: {
        zIndex: '-20'
      }
    });
    
    var tree2Mod = new StateModifier({
      align:[0,0]
    });
    
     var tree2 = new Surface({
      content: '<img src="trees2.png">',
      properties: {
        zIndex: '-22'
      }
    });
    
    var treeModifier = new StateModifier({
      align:[0,0.05]
    });

    var background = new Surface({
      content: '<img src="background.jpg" />',
      properties: {
        zIndex: '-250'
      }
    });

    var bgMod = new StateModifier({
      align:[0,-.1]
    })


    var camera = new Surface({
       content: "<img src=\"cam1.png\" id=\"camera\"  usemap=\"#camera\" />", 
      properties: {
        zIndex: '10'
      }
    
    });

    var cameraMod = new StateModifier({
      size: [200,250],
    })

    var shutter = new Surface({
      content: "<div id=\"frame\"><iframe id=\"fe\" style=\"z-index:1\"height=\"100\" width=\"150\" src=\"./example.html\"></iframe></div>",
      properties : {
       zIndex: "9"
      }
    })

    var shuttermod = new StateModifier({
      size:[100,150],
      align: [0.25,0.12]
    })


  context.add(bgMod).add(background)
  context.add(treeModifier).add(trees)
   context.add(tree2Mod).add(tree2)
  context.add(rainMod).add(rain)

  var node = context.add(mainMod)

  node.add(shuttermod).add(shutter)
  node.add(cameraMod).add(camera)

  //mainMod.setTransform(Transform.rotate(Math.PI/4,Math.PI/4,0))
    // context.add(bgmodifier).add(bgsurface)
    // context.add(bgmodifier2).add(bgsurface2);


 // var targetPosition = document.getElementById('famous-container').offsetTop;

  
 //  //start expading 100px from bottom of page
 //  console.log(window.innerHeight)
 //  var padding = window.innerHeight - 100;
 //  var maxHeight = window.innerHeight + padding - 300; 
 //  var containerHeight = parseFloat(document.getElementById('famous-container').style.height);
 //  var getContainerHeight = function(){ return parseFloat(document.getElementById('famous-container').style.height); }
 //  var distanceTravelled = function(){ return window.pageYOffset + padding - targetPosition }
 //  var transCalled = false;
 //  var transOutCalled = false
  

 //  window.onscroll = function(){
    
 //    if(getContainerHeight() > 10 && !transCalled) {
 //      aligner.halt();
 //      aligner.setTransform(Transform.translate(70,100,0), spring);
 //      transCalled = true;
 //       transOutCalled = false;
 //    }
    
 //    if(getContainerHeight() < 85 && !transOutCalled) {
 //      aligner.halt();
 //      aligner.setTransform(Transform.translate(-100,-100,0), spring);
 //      transCalled = false;
 //      transOutCalled = true;
 //    }

 //    // bgmodifier.setTransform(Transform.translate(0,distanceTravelled()/4,-1)) 
 //    // bgmodifier2.setTransform(Transform.translate(0,-distanceTravelled()/4,-2)) 
    
 //        //if you have passed the target point(+ padding) and the container height and distance travelled is less than the max
 //    if(window.pageYOffset + padding > targetPosition && getContainerHeight() + distanceTravelled() < maxHeight) { 
     
 //     //set height of container to current height + distance travelled past target point
 //     document.getElementById('famous-container').style.height = containerHeight + distanceTravelled() +"px";
    
 //    }
 //  } 
});
