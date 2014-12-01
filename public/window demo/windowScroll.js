    var win = document.getElementById('famous-container').contentWindow

    window.onscroll = function() {
  
      var targetPosition = document.getElementById('famous-container').offsetTop; //496
      var padding = 300; // 294
      var maxHeight = 1000; 
      var containerHeight = 100;
      var getContainerHeight = function(){ return parseFloat(document.getElementById('famous-container').height); }
      var distanceTravelled = function(){ return window.pageYOffset + padding - targetPosition }
      var transCalled = false;
      var transOutCalled = false

            //if you have passed the target point(+ padding) and the container height and distance travelled is less than the max
      if(window.pageYOffset + padding > targetPosition && getContainerHeight() + (distanceTravelled()*1.5) < maxHeight) { 
        
        //send info to iframe  
        var message = distanceTravelled();  
        win.postMessage(message, '*')

        document.getElementById('famous-container').height = containerHeight + distanceTravelled()*1.5 +"px";
        
      } 

   
    }