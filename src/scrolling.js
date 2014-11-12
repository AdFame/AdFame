var Transform = require('famous/core/Transform');
var Modifier = require('famous/core/Modifier');

var posX=.5
var called = false;
var location=0;
var rotationModifier = new Modifier({
    size: [100,100],
    origin: [.5,1],
    align:[.5,.08],
    transform: Transform.rotate(1,0,0.1)
}); 
window.onscroll = function(){
  if (window.pageYOffset>20 && !called){
      
      if (window.pageYOffset>location){
      posX+=window.pageYOffset/10000
      called=true;
      }else{
          posX-=window.pageYOffset/10000
      }
      location=window.pageYOffset;
  }
  if (window.pageYOffset>1000){
      called=false;
  }

 rotationModifier.transformFrom(Transform.rotateX(posX));
 return {rotationModifier: rotationModifier};

};
module.exports = onscroll;