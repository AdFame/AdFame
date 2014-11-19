// Import additional modules to be used in this view 
var Transform = require('famous/core/Transform');
var Modifier = require('famous/core/Modifier');
var ImageSurface = require('famous/surfaces/ImageSurface');
var MouseSync     = require('famous/inputs/MouseSync');
var TouchSync     = require('famous/inputs/TouchSync');
var ScrollSync    = require('famous/inputs/ScrollSync');
var GenericSync   = require('famous/inputs/GenericSync');

var Transitionable = require('famous/transitions/Transitionable');

// Register sync inputs
GenericSync.register({
    'mouse': MouseSync,
    'touch': TouchSync
})

// Create a transitionable for position
var position = new Transitionable([0, 0]);

// Set sync variable for generic sync methods
var sync = new GenericSync({
    'mouse': {},
    'touch': {}
});

//create the like/dislike surface
var like = new ImageSurface({
    size: [70, 70],
    align: [1,0],
    content: "images/yess.png",
    classes: ['backfaceVisibility', "bitch"],
});

var notLike = new ImageSurface({
    size: [70, 70],
    align: [1,0],
    content: "images/noo.png",
    classes: ['backfaceVisibility', "bitch"],
});
//Sets the initial opacity of the like and dislike button to be hidden
var opacityYes = new Modifier({
    opacity: 0,
    align: [-.07, 0]
})
var opacityNo = new Modifier({
    opacity: 0,
    align:[.3, 0]
})
function drag(surface, link) {
    // Links sync to our surface parameter
    surface.pipe(sync);

    // Updates position of transitionable
    sync.on('update', function(data){
        var currentPosition = position.get();

        //Sets the position of the surface to the X position of the mouse

        position.set([
            currentPosition[0] + data.delta[0],
            currentPosition[1]
        ]);

        // Optionally modifies the opacity of the logo 
            // opacityLogo.setOpacity(1-Math.abs(currentPosition[0])/(window.innerWidth*.4));
        //Modifies the opacity of the like button    
            if(currentPosition[0]>0){
                opacityYes.setOpacity(currentPosition[0]/(window.innerWidth*.3));
            }
        // Modifies the opacity of the dislike button
            if(currentPosition[0]<0){
                opacityNo.setOpacity(Math.abs(currentPosition[0])/window.innerWidth*3);
            }
    });

    // on dragging to right, like page and open link, else not like and close ad
    surface.on('mouseup', function(){
        var currentPosition = position.get();
        //resets the opacity of the like and dislike to be hidden
        opacityYes.setOpacity(0);
        opacityNo.setOpacity(0);

        if (currentPosition[0] > 200) {
           //Redirect to link if dragged right
            position.set([0,0], {curve : 'easeOutBounce', duration : 300});
            window.open(link, '_blank');
        } else if (currentPosition[0] < (-200)) {
           // Transition out of dragged left
            position.set([-window.innerWidth,0], {curve : 'easeOutBounce', duration : 800});
        }else{
             //Bounces the surface back to center if the drag was insufficient
            position.set([0,0], {curve : 'easeOutBounce', duration : 300});
        }
    })
    // on touch drag right like, left dislike
    surface.on('touchend', function(){
        var currentPosition = position.get();
        console.log(currentPosition)
     //resets the opacity of the like and dislike to be hidden
        opacityYes.setOpacity(0);
        opacityNo.setOpacity(0);
        //Redirect to link if dragged right
        if (currentPosition[0] > 150) {
            position.set([250,window.innerHeight], {curve : 'easeOutBounce', duration : 300});
            window.open(link, '_blank');
        }else if (currentPosition[0] < (-150)) {
        // Transition out of dragged left
            position.set([window.innerWidth,0], {curve : 'easeOutBounce', duration : 800});
        }else{
            //Bounces the surface back to center if the drag was insufficient
            position.set([0,0], {curve : 'easeOutBounce', duration : 300});

        }
    })

    // Applies updated position to surface
    var positionModifier = new Modifier({
        transform: function(){
            var currentPosition = position.get();
            return Transform.translate(currentPosition[0], currentPosition[1], 0);
        }
    });

    // Sends back the modified surface and position modifier
    return {surface: surface, positionModifier: positionModifier, like: like, notLike:notLike, opacityNo:opacityNo, opacityYes:opacityYes};
}

module.exports = drag;