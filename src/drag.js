// Import additional modules to be used in this view 
var Transform = require('famous/core/Transform');
var Modifier = require('famous/core/Modifier');

var MouseSync     = require('famous/inputs/MouseSync');
var TouchSync     = require('famous/inputs/TouchSync');
var ScrollSync    = require('famous/inputs/ScrollSync');
var GenericSync   = require('famous/inputs/GenericSync');

var Transitionable = require('famous/transitions/Transitionable');

// Register sync inputs
GenericSync.register({
    'mouse': MouseSync,
    'touch': TouchSync,
    'scroll': ScrollSync
})

// Create a transitionable for position
var position = new Transitionable([0, 0]);

// Set sync variable for generic sync methods
var sync = new GenericSync({
    'mouse': {},
    'touch': {},
    'scroll': {scale : .5}
});
function drag(surface) {
    // Links sync to our surface parameter
    surface.pipe(sync);

    // Updates position of transitionable
    sync.on('update', function(data){
        var currentPosition = position.get();
        console.log(currentPosition)
        position.set([
            currentPosition[0] + data.delta[0],
            currentPosition[1]
        ]);
    });

    // on dragging to right, like page and open link, else not like and close ad
    surface.on('mouseup', function(){
        var currentPosition = position.get();
        if (currentPosition[0] > 80) {
            console.log('liked');
            surface.setProperties({visibility: 'hidden'})
        } else if (currentPosition[0] < (-80)) {
            console.log('disliked')
        }else{
            position.set([0,0], {curve : 'easeOutBounce', duration : 300});
            console.log('here')
        }
    })
    // on touch drag right like, left dislike
    surface.on('touchend', function(){
        if (currentPosition[0] > 80) {
            console.log('liked');
            surface.setProperties({visibility: 'hidden'})
        } else if (currentPosition[0] < (-80)) {
            console.log('disliked');
        }else{
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
    return {surface: surface, positionModifier: positionModifier};
}

module.exports = drag;