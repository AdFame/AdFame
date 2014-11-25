
define(function(require, exports, module) {
    // import dependencies
    var Engine  = require('famous/core/Engine');
    var Matrix  = require('famous/math/Matrix');
    var Vector  = require('famous/math/Vector');
    var Surface = require('famous/core/Surface');
    var StateModifier   = require('famous/modifiers/StateModifier');
    var Transform       = require('famous/core/Transform');
    var SpringTransition = require("famous/transitions/SpringTransition")
    var Transitionable = require("famous/transitions/Transitionable");
    var EventHandler = require('famous/core/EventHandler');

    Transitionable.registerMethod('spring', SpringTransition);
    
    var spring = {
      method: 'spring',
      period: 1500,
      dampingRatio: 0.4
    };

    


    window.addEventListener("message", receiveMessage, false);

    function receiveMessage(event){
      if(event.data === 'clicker'){
        clicker.setSize([60,60], spring)
        //.setTransform(Transform.rotate(0,0,Math.PI/4))

      } else {
       moveShutter(event.data)
      }
    }

    var mainContext = Engine.createContext();
    
    // var shutter1a = new Surface({
  //   size: [50,30],
  //   properties: {
  //     backgroundColor: '#555555',
  //     borderBottom: '2px solid black',
  //     borderTop: '2px solid black'
  //     borderRight:'2px solid black'
  //   }
  // });

  // var modifier1a = new StateModifier({
  //   align:[0,0],
  //   origin:[0,0.5]
  // });
  
  // var modifier1b = new StateModifier({
  //   transform: Transform.translate(0,0,10)
  // });

  var backgroundColor = new Surface({
    size:[500,500],
    properties:{
      backgroundColor: '#3D4747',
      zIndex: '-100'
    }
  });


 var clicker = new Surface ({
    size: [55,55],
    content: 'CLICK',
    properties: {
      borderRadius: '27.5px',
      fontWeight: 'bold',
      backgroundColor: 'red',
      color: '#999999',
      textAlign: 'center',
      paddingTop: '15px',
      backgroundImage:'linear-gradient(#E83535, #BF0003)',
      zIndex: '-1'
    }
 });

 // clicker.on('click', function(){
 //   console.log('clickedl;skj;')
 //   clicker.setSize([60,60]);
 // })
  var modifierClick = new StateModifier({
    origin: [0.5,.5],
    align: [0.5,1.1]
  });
  
 var skew = 2*Math.PI;
    var shutter1 = new Surface({
    size: [200,75],
    properties: {
      borderRight: 'none',
      boxShadow: '2px 2px 2px #222222',
      zIndex: '-1',
      backgroundImage:'linear-gradient(#222222, #777777)'
    }
  });

  var modifier1 = new StateModifier({
    align:[0.5,0],
    origin:[0.5,0.5],
    transform: Transform.rotate(0,skew, 0)
  });
  
  var shutter2 = new Surface({
    size: [200,75],
    properties: {
      boxShadow: '2px 2px 2px #222222',
      backgroundImage:'linear-gradient(#222222, #777777)'
    }
  });

  var modifier2 = new StateModifier({
    align:[1,0],
    origin:[0.5,0],
    transform: Transform.rotate(0,0,Math.PI/3)
  });

  var shutter3 = new Surface({
    size: [200,75],
    properties: {
      boxShadow: '2px 2px 2px 2px black',
      backgroundImage:'linear-gradient(#777777,#222222)'
    }
  });

  var modifier3 = new StateModifier({
    align:[1,1],
    origin:[.5,1],
    transform: Transform.rotate(0,0,-Math.PI/3)
  });



  var shutter4 = new Surface({
    size: [200,75],
    properties: {
      boxShadow: '2px 2px 2px 2px black',
      backgroundImage:'linear-gradient(#777777, #222222)'

    }
  });

  var modifier4 = new StateModifier({
    align:[0.5,1],
    origin:[0.5,0.5],
    transform: Transform.rotate(0,0,0)
  });

  var shutter5 = new Surface({
    size: [200,75],
    properties: {
      boxShadow: '2px 2px 2px 2px black',
      backgroundImage:'linear-gradient(#777777,#222222)'
    }
  });

  var modifier5 = new StateModifier({
    align:[0,1],
    origin:[.5,1],
    transform: Transform.rotate(0,0,Math.PI/3)
  });

  var shutter6 = new Surface({
    size: [200,75],
    properties: {
      backgroundImage:'linear-gradient(#222222, #777777)',
      boxShadow: '1px 1px 1px #222222'
    }
  });

  var modifier6 = new StateModifier({
    align:[0,0],
    origin:[0.5,0],
    transform: Transform.rotate(0,0,-Math.PI/3)
  });

  var rotater = new StateModifier({
    origin:[0.5,0.5],
    align:[0.5,0.5],
    size:[undefined, undefined], 
  });


 // var trig = new Surface({
 //    size:[0,0],
 //    properties:{
 //    width: '0px',
 //    height: '0px',
 //    borderTop: '101px solid transparent',
 //    borderBottom: '0px solid transparent',
 //    borderLeft: '58px solid #555555',
 //    zIndex: '100'
 //    }
 // });

 // var trigMod = new StateModifier({
 //    align:[0.55,-.158],
 //    origin:[0.5,0.5]
 // });



  var context = mainContext.add(rotater)
  
  context.add(backgroundColor);
  context.add(modifier1).add(shutter1) 
  context.add(modifier2).add(shutter2) 
  context.add(modifier3).add(shutter3) 
  context.add(modifier4).add(shutter4) 
  context.add(modifier5).add(shutter5) 
  context.add(modifier6).add(shutter6) 
  context.add(modifierClick).add(clicker);
  
  var clickerCalled = false;


  var moveShutter = function(size){
    //45 - 245
    console.log('this is the size', size)
      
      // rotater.setTransform(Transform.rotate(0,0,0), spring);

      // shutter1.setSize([200, size], spring);
      // shutter2.setSize([200, size], spring);
      // shutter3.setSize([200, size], spring);
      // shutter4.setSize([200, size], spring);
      // shutter5.setSize([200, size], spring);
      // shutter6.setSize([200, size], spring);

  }
  //    context.add(trigMod).add(trig);
  // context.add(lensPos).add(lens)
  // context.add(holePos).add(hole)
  // context.add(modifier1b).add(modifier1a).add(shutter1a)

  // shutter1a.setTransform(Transform.skew(-3,4,0))
  // var num = 1;
  // setInterval(function(){
  //    num+=.05
  //   rotater.setTransform(Transform.rotate(0,0,num));
  // //  trigMod.setTransform(Transform.translate(-num,num,0))

  //   shutter1.setSize([shutter1.getSize()[0], shutter1.getSize()[1]+1]);
  //   shutter2.setSize([shutter2.getSize()[0], shutter2.getSize()[1]+1]);
  //   shutter3.setSize([shutter3.getSize()[0], shutter3.getSize()[1]+1]);
  //   shutter4.setSize([shutter4.getSize()[0], shutter4.getSize()[1]+1]);
  //   shutter5.setSize([shutter5.getSize()[0], shutter5.getSize()[1]+1]);
  //   shutter6.setSize([shutter6.getSize()[0], shutter6.getSize()[1]+1]);
  //   // console.log(shutter1a.getSize()[0])
  //   //  if(shutter1a.getSize()[0]<198){
  //   // shutter1a.setSize([shutter1a.getSize()[0]+1, shutter1a.getSize()[1]+1]);
  //   // } else {
  //   //   console.log('look')
  //   //     shutter1a.setSize([shutter1a.getSize()[0], shutter1a.getSize()[1]+1]);
  //   // } 
  // },50)


});
