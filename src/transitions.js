    var Modifier       = require("famous/core/Modifier");
    var Transform      = require("famous/core/Transform");
    var Transitionable = require("famous/transitions/Transitionable");
    var WallTransition = require("famous/transitions/WallTransition");

    var wallModifier = new Modifier({
        align: [.5, .5],
        origin: [.5, .5],
        transform: Transform.translate(0,-50,0)
    });

    function wallTransition(type,period,dampingRatio, velocity,restitution){
        Transitionable.registerMethod("'"+type+"'", WallTransition);
        var wallProps = {
            type: type,
            period: period,
            dampingRatio : dampingRatio,
            velocity: velocity,
            restitution : restitution //how bouncy the wall is
        };
        wallModifier.setTransform(Transform.translate(0,0,0),wallProps);
    
        return {wallModifier: wallModifier} 
    }


    module.exports={walltransition: wallTransition };
