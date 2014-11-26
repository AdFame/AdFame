
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
    
    var bannerCalled = false;

    function receiveMessage(event){
        moveWindows(event.data)
    
    }

    var moveWindows = function(size){
      rainMod.setTransform(Transform.translate(0,-size/2,0));
      mainMod.setTransform(Transform.translate(0,-size/2,0))
      treeModifier.setTransform(Transform.translate(0,-size,0));
      tree2Mod.setTransform(Transform.translate(0,-size/1.6, 0));
      headingMod.setTransform(Transform.translate(0,-size*2,0));
    }

    //inital banner logo
    var heading = new Surface({
      content: '<a href="http://famo.us" target="_parent"><img src="./images/heading.png" ></a>',
       properties: {
      zIndex: '100',
      textAlign: 'center',
      fontFamily: 'verdana'
     }
    })

    var headingMod = new StateModifier({
      align: [0,0],
      origin: [0,0]
    });
    
    //logo on sticky note
    var logo = new Surface({
     content: '<a href="http://famo.us" target="_parent"><img src="./images/logo.png" ></a></br >famo.us',
     properties: {
      zIndex: '100',
      textAlign: 'center',
      fontFamily: 'verdana'
     }
    });
    
      //tilt logo to match tilt of sticky note
    var logoMod2 = new StateModifier({
      transform: Transform.rotate(0,0,-6.25)
    });

    var logoMod = new StateModifier({
      origin: [0.5,0.5],
      align:[0.48,0.65]
    });
    
    //sticky note
    var note = new Surface({
       content: '<img src="./images/note.png">',
       properties: {
        zIndex: '10',
        textAlign: 'center'
       }
    }); 
    
    var noteMod = new StateModifier({
      align:[0.5,0.4],
      origin: [0.5,0.5]
    })
 
    //controls movement of sticky note and logo
    var mainMod = new StateModifier({
      size: [undefined,undefined],
      origin: [0.5,0.5],
      align:[0.5, 1.25]
    })
     
    //large rain window pane 
    var rain = new Surface({
      content: '<img src="./images/gotas2.png" />',
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
    
    //first row of green trees 
    var trees = new Surface({
      content: '<img src="./images/trees.png">',
      properties: {
        zIndex: '-20'
      }
    });
    
    var treeModifier = new StateModifier({
      align:[-0.15,0.3]
    });
    
    //2nd row of trees modifier
    var tree2Mod = new StateModifier({
      align:[-.3,0.1]
    });
    
    var tree2 = new Surface({
      content: '<img src="./images/trees2.png">',
      properties: {
        zIndex: '-22'
      }
    });

    //main bg image
    var background = new Surface({
      content: '<img src="./images/background.jpg" />',
      properties: {
        zIndex: '-250'
      }
    });

    var bgMod = new StateModifier({
      align:[-0.12,-.15]
    })




  context.add(headingMod).add(heading)
  context.add(bgMod).add(background)
  context.add(treeModifier).add(trees)
  context.add(tree2Mod).add(tree2)
  context.add(rainMod).add(rain)

  var node = context.add(mainMod)
   
   node.add(noteMod).add(note)
   node.add(logoMod).add(logoMod2).add(logo)

});
