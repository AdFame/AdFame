var data = {
    logo: 'images/Coca-Cola.png',
    url: 'http://us.coca-cola.com/home/',
    origin: {x: .5, y: 0, z: 0},
    initialPosition: {x: 0, y: 0, z: 0},
    initialVelocity: {x: 0, y: 0, z: 0},
    initialRotation: {x: Math.PI/2, y: 0, z: 0},
    opacity: 1,
    enter: {
        type: 'rotateInOut',
        position: {x: 0, y: 0, z: 0},
        velocity: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0},
        period: 1000,
        dampingRatio: 0,
        restitution: 0,
        opacity: 1,
        duration: 1000,
        curve: null
    },
    exit: {
        type: 'rotateInOut',
        position: {x: 0, y: 0, z: 0},
        velocity: {x: 0, y: 0, z: 0},
        rotation: {x: Math.PI/2, y: 0, z: 0},
        period: 1000,
        dampingRatio: 0,
        restitution: 0,
        opacity: 1,
        duration: 1000,
        curve: null
    }
}

module.exports = data;

// var sentData={
//   name:'Ale',
//   data:data
// }

//   $('#refresh').on('click', function(){
//     var selected = $('input[type='radio']:checked').val()
//     var $info = $('#' + selected)
//     //sets the data parameters to the selected in the input fields
//     sentData.data.campaign = $('#campaign').val();
//     sentData.data.logo = sentData.data.logo || $('#logoUrl');
//     sentData.data.url = $('#adLink').val();
//     sentData.data.origin.x = 
//     sentData.data.origin.y = $('#originY').val();
//     sentData.data.origin.z = $('#originZ').val();

//     sentData.data.initialPosition.x = $('#initPosX').val();
//     sentData.data.initialPosition.y = $('#initPosY').val();
//     sentData.data.initialPosition.z = $('#initPosZ').val();

//     sentData.data.initialVelocity.x = $('#initVelX').val();
//     sentData.data.initialVelocity.y = $('#initVelY').val();
//     sentData.data.initialVelocity.z = $('#initVelZ').val();

//     sentData.data.initialRotation.x = $('#initRotX').val();
//     sentData.data.initialRotation.y = $('#initRotY').val();
//     sentData.data.initialRotation.z = $('#initRotZ').val();

//     sentData.data.opacity = $('#opacity').val();

//     sentData.data.enter.type = selected;
  
//     sentData.data.enter.position.x = $('#'+selected+'PosX').val();
//     sentData.data.enter.position.y = $('#'+selected+'PosY').val();
//     sentData.data.enter.position.z = $('#'+selected+'PosZ').val();

//     sentData.data.enter.velocity.x = $('#'+selected+'VelX').val();
//     sentData.data.enter.velocity.y = $('#'+selected+'VelY').val();
//     sentData.data.enter.velocity.z = $('#'+selected+'VelZ').val();

//     sentData.data.enter.rotation.x = $('#'+selected+'RotX').val();
//     sentData.data.enter.rotation.y = $('#'+selected+'RotY').val();
//     sentData.data.enter.rotation.z = $('#'+selected+'RotZ').val();
  
//     sentData.data.enter.period = $('#'+selected+'Period').val();

//     sentData.data.enter.dampingRatio = $('#'+selected+'DampeningRatio').val();
//     sentData.data.enter.restitution = $('#'+selected+'Restitution').val();
//     sentData.data.enter.opacity = $('#'+selected+'Opacity').val()
//     sentData.data.enter.duration = $('#'+selected+'Duration').val()
//     sentData.data.enter.curve = $('#'+selected+'Curve option:selected').val()
//     console.log(sentData)
//   });
