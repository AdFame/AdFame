  var data = {
    logo: 'images/Coca-Cola.png',
    url: 'http://us.coca-cola.com/home/',
    origin: {x: .5, y: 0, z: 0},
    initialPosition: {x: 0, y: 0, z: 0},
    initialVelocity: {x: 0, y: 0, z: 0},
    initialRotation: {x: 0, y: 0, z: 0},
    opacity: 1,
    enter: {
        type: 'slideInOut',
        position: {x: 0, y: 400, z: 0},
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
        type: 'rotateInOut',
        position: {x: 0, y: 0, z: 0},
        velocity: {x: 0, y: Math.PI, z: 0},
        rotation: {x: 0, y: 0, z: 0},
        period: 1000,
        dampingRatio: 0,
        restitution: 0,
        opacity: 1,
        duration: 1000,
        curve: null
    }
}

var module = {};


$(function(){
    
  $('#selectTrans').on('click', function(){
    var selected = $('input[type="radio"]:checked').val()
    Array.prototype.forEach.call($('#transitions').children(), function(child){
      $(child).hide();
    });
    $('#'+selected).show();
  }).trigger('click');
   
  
  $('#export').on('click', function(){
    var selected = $('input[type="radio"]:checked').val()
    var $info = $("#" + selected)
    
    data.logo = $('#logoUrl')
    data.url = $('#adLink').val();
    data.origin.x = $('#originX').val();
    data.origin.y = $('#originY').val();
    data.origin.z = $('#originZ').val();

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

var el, newPoint, newPlace, offset;

$("input[type='range']").change(function() {
 
   el = $(this);
   
   width = el.width();
   
   newPoint = (el.val() - el.attr("min")) / (el.attr("max") - el.attr("min"));
   
   offset = -1.3;
   
   if (newPoint < 0) { newPlace = 0; }
   else if (newPoint > 1) { newPlace = width; }
   else { newPlace = width * newPoint + offset; offset -= newPoint; }
   
   el.next("output").text(el.val());
 }).trigger('change');





})

module.exports = data;