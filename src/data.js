for (var i = 0; i < window.parent.document.getElementById('selectTrans').children.length; i++) {
    if (window.parent.document.getElementById('selectTrans').children[i].selected) {
        var selected = window.parent.document.getElementById('selectTrans').children[i].value;
    }
}

var data = {
    logo:'images/Coca-Cola.png',
    url: window.parent.document.getElementById('adLink').value || 'http://us.coca-cola.com/home/',
    origin: {},
    initialPosition: {},
    initialRotation: {},
    enter: {
        type: 'rotateInOut',
        position: {},
        velocity: {},
        rotation: {},
        period: 1000,
        dampingRatio: 0,
        restitution: 0,
        opacity: 1,
        duration: 1000,
        curve: null
    },
    exit: {
        type: 'rotateInOut',
        position: {},
        velocity: {},
        rotation: {},
        period: 1000,
        dampingRatio: 0,
        restitution: 0,
        opacity: 1,
        duration: 1000,
        curve: null
    }
}
// data.logo = window.antipattern|| 'images/Coca-Cola.png';
// Sets transition type
data.enter.type = selected + 'InOut';
data.exit.type = selected + 'InOut';


//Set logo 
if(window.parent.document.getElementById('imgpreview').src.length>50 ){
    data.logo = window.parent.document.getElementById('imgpreview').src || 'images/Coca-Cola.png';
}

// Sets initial parameters
data.origin.x = window.parent.document.getElementById('originX').value;
data.origin.y = window.parent.document.getElementById('originY').value;
data.origin.z = window.parent.document.getElementById('originZ').value;

data.initialPosition.x = window.parent.document.getElementById('initPosX').value;
data.initialPosition.y = window.parent.document.getElementById('initPosY').value;
data.initialPosition.z = window.parent.document.getElementById('initPosZ').value;

data.initialRotation.x = window.parent.document.getElementById('initRotX').value;
data.initialRotation.y = window.parent.document.getElementById('initRotY').value;
data.initialRotation.z = window.parent.document.getElementById('initRotZ').value;

data.opacity = window.parent.document.getElementById('opacity').value;

// Sets enter transition data parameters
if (selected !== 'rotate') {
    data.enter.position.x = window.parent.document.getElementById(selected + 'InPosX').value;
    data.enter.position.y = window.parent.document.getElementById(selected + 'InPosY').value;
    data.enter.position.z = window.parent.document.getElementById(selected + 'InPosZ').value;
}

if (selected === 'rotate') {
    data.enter.rotation.x = window.parent.document.getElementById(selected + 'InRotX').value;
    data.enter.rotation.y = window.parent.document.getElementById(selected + 'InRotY').value;
    data.enter.rotation.z = window.parent.document.getElementById(selected + 'InRotZ').value;
}

if (selected === 'slide' || selected === 'rotate') {
    for (var i = 0; i < window.parent.document.getElementById(selected + 'InCurve').children.length; i++) {
        if (window.parent.document.getElementById(selected + 'InCurve').children[i].selected) {
            window.parent.document.getElementById(selected + 'InCurve').children[i].value;
        }
    }
}

if (selected === 'spring' || selected === 'wall') {
    data.enter.period = window.parent.document.getElementById(selected + 'InPeriod').value;
    data.enter.dampingRatio = window.parent.document.getElementById(selected + 'InDampeningRatio').value;
}

data.enter.opacity = window.parent.document.getElementById(selected + 'InOpacity').value;
data.enter.duration = window.parent.document.getElementById(selected + 'InDuration').value;

// Sets exit transition data parameters
if (selected !== 'rotate') {
    data.exit.position.x = window.parent.document.getElementById(selected + 'OutPosX').value;
    data.exit.position.y = window.parent.document.getElementById(selected + 'OutPosY').value;
    data.exit.position.z = window.parent.document.getElementById(selected + 'OutPosZ').value;
}

if (selected === 'rotate') {
    data.exit.rotation.x = window.parent.document.getElementById(selected + 'OutRotX').value;
    data.exit.rotation.y = window.parent.document.getElementById(selected + 'OutRotY').value;
    data.exit.rotation.z = window.parent.document.getElementById(selected + 'OutRotZ').value;
}

if (selected === 'slide' || selected === 'rotate') {
    for (var i = 0; i < window.parent.document.getElementById(selected + 'OutCurve').children.length; i++) {
        if (window.parent.document.getElementById(selected + 'OutCurve').children[i].selected) {
            window.parent.document.getElementById(selected + 'OutCurve').children[i].value;
        }
    }
}

if (selected === 'spring' || selected === 'wall') {
    data.exit.period = window.parent.document.getElementById(selected + 'OutPeriod').value;
    data.exit.dampingRatio = window.parent.document.getElementById(selected + 'OutDampeningRatio').value;
}

data.exit.opacity = window.parent.document.getElementById(selected + 'OutOpacity').value;
data.exit.duration = window.parent.document.getElementById(selected + 'OutDuration').value;

console.log(data);
module.exports = data;