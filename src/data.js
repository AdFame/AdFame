  var data = {
    logo: 'images/Coca-Cola.png',
    url: 'http://us.coca-cola.com/home/',
    origin: {x: .5, y: 0, z: 0},
    initialPosition: {x: .5, y: 0, z: 0},
    initialVelocity: {x: 0, y: 0, z: 0},
    initialRotation: {x: 3*Math.PI/2, y: 0, z: 0},
    opacity: 1,
    enter: {
        type: 'rotateInOut',
        position: {x: 0, y: 100, z: 0},
        velocity: {x: 0, y: 0, z: 0},
        rotation: {x: Math.PI/2, y: 0, z: 0},
        period: 1000,
        dampingRatio: 0,
        restitution: 0,
        opacity: 1,
        duration: 1000,
        curve: null
    },
    exit: {
        type: 'slideInOut',
        position: {x: 0, y: 0, z: 0},
        velocity: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0},
        period: 1000,
        dampingRatio: 0,
        restitution: 0,
        opacity: 1,
        duration: 1000,
        curve: null
    }
}

var hash = {
    rotateInOut:[]
    slideInOut:
    springInOUt:
    slideInOut:
}


$(function(){
   

  $('#export').on('click', function(){

    var selected = $('input[type="radio"]:checked').val()
    
    var $info = $("#" + selected).find;

    data.url = $('#adLink').val()
    data.origin = $('#origin').val()
    data.initialPosition.x = $('#initPosX').val();
    data.initialPosition.y = $('#initPosY').val();
    data.initialPosition.z = $('#initPosZ').val();

    data.initialVelocity.x = $("#initVelX").val();
    data.initialVelocity.y = $("#initVelY").val();
    data.initialVelocity.z = $("#initVelZ").val();

    data.initialRotation.x = $("#initRotX").val();
    data.initialRotation.y = $("#initRotY").val();
    data.initialRotation.z = $("#initRotZ").val();

    data.opacity = $('#opacity').val();

    data.enter.type = selected;
    
    data.enter.position.x = $("#"+selected+"PosX").val();
    data.enter.position.y = $("#"+selected+"PosY").val();
    data.enter.position.z = $("#"+selected+"PosZ").val();

    data.enter.velocity.x = $("#"+selected+"VelX").val();
    data.enter.velocity.y = $("#"+selected+"VelY").val();
    data.enter.velocity.z = $("#"+selected+"VelZ").val();

    data.enter.rotation.x = $("#"+selected+"RotX").val();
    data.enter.rotation.y = $("#"+selected+"RotY").val();
    data.enter.rotation.z = $("#"+selected+"RotZ").val();
    
    data.enter.period = $("#"+selected+"Period").val();

    data.enter.dampingRatio = $("#"+selected+"DampeningRatio").val();
    data.enter.restitution = $("#"+selected+"Restitution").val();
    data.enter.opacity = $("#"+selected+"Opacity").val()
    data.enter.duration = $("#"+selected+"Duration").val()
    data.enter.curve = $("#"+selected+"Curve").val()


  });


})

module.exports = data;