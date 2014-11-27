$(function(){
    // Sets a default data set
    var data = {
        logo: 'images/trees.png',
        url: 'http://us.coca-cola.com/home/',
        origin: {x: .5, y: 0, z: 0},
        initialPosition: {x: 0, y: 0, z: 0},
        initialVelocity: {x: 0, y: 0, z: 0},
        initialRotation: {x: 0, y: 0, z: 0},
        opacity: 1,
        enter: {
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

    // Hides inactive transition divs
    $('#selectTrans').on('change', function(){
        var selected = $('#selectTrans option:selected').val();
        Array.prototype.forEach.call($('#transitions').children(), function(child) {
            $(child).hide();
        });
        $('#'+selected).show();
    }).trigger('change');
     
    // Creates an object with the name of the company and the data selected to store in the database
    var sentData={
        name: '',
        data: data
    }

    //NEED TO CHECK IF IT EXISTS IN DB FIRST

    // Show's either transitions in or out on button click
    $('.out').hide();
    $('#inButton').on('click', function() {
            $('.out').hide();
            $('.in').show(); 
    });

    $('#outButton').on('click', function() {
        $('.in').hide();
        $('.out').show();
    });
     
    // Posts data to database 
    var saveData =function(data){ 
        $.ajax({
            type: 'POST',
            url: '/user/data',
            data: sentData,
            dataType: 'application/json'
        }).done(function(msg) {
            console.log( 'Data Saved:', msg );
        });
    }
    
    // Retrieves data from database
    var getData = function(){
        $.ajax({
            type: 'GET',
            url: 'user/data',
            data: data
        }).done(function(data) {
            console.log('Data:', data);  
        });
    }

    // Updates data values
    var generateData = function() {
        var selected = $('#selectTrans option:selected').val()
        
        // Sets organization name
        sentData.name = $('#organization').val();

        // Sets initial state data parameters
        sentData.data.campaign = $('#campaign').val();
        sentData.data.logo = sentData.data.logo || $('#logoUrl');
        sentData.data.url = $('#adLink').val();

        sentData.data.origin.x = $('#originX').val();
        sentData.data.origin.y = $('#originY').val();
        sentData.data.origin.z = $('#originZ').val();

        sentData.data.initialPosition.x = $('#initPosX').val();
        sentData.data.initialPosition.y = $('#initPosY').val();
        sentData.data.initialPosition.z = $('#initPosZ').val();

        sentData.data.initialRotation.x = $('#initRotX').val();
        sentData.data.initialRotation.y = $('#initRotY').val();
        sentData.data.initialRotation.z = $('#initRotZ').val();

        sentData.data.opacity = $('#opacity').val();

        // Sets enter transition data parameters
        sentData.data.enter.type = selected + 'InOut';

        sentData.data.enter.position.x = $('#' + selected + 'InPosX').val() || 0;
        sentData.data.enter.position.y = $('#' + selected + 'InPosY').val() || 0;
        sentData.data.enter.position.z = $('#' + selected + 'InPosZ').val() || 0;

        sentData.data.enter.rotation.x = $('#' + selected + 'InRotX').val() || 0;
        sentData.data.enter.rotation.y = $('#' + selected + 'InRotY').val() || 0;
        sentData.data.enter.rotation.z = $('#' + selected + 'InRotZ').val() || 0;

        sentData.data.enter.period = $('#' + selected + 'InPeriod').val() || 1000;
        sentData.data.enter.dampingRatio = $('#' + selected + 'InDampeningRatio').val() || .5;
        sentData.data.enter.opacity = $('#' + selected + 'InOpacity').val() || 1;
        sentData.data.enter.duration = $('#' + selected + 'InDuration').val() || 1000;
        sentData.data.enter.curve = $('#' + selected + 'InCurve option:selected').val() || null;

        // Sets exit transition data parameters
        sentData.data.exit.type = selected + 'InOut';

        sentData.data.exit.position.x = $('#' + selected + 'OutPosX').val() || 0;
        sentData.data.exit.position.y = $('#' + selected + 'OutPosY').val() || 0;
        sentData.data.exit.position.z = $('#' + selected + 'OutPosZ').val() || 0;

        sentData.data.exit.rotation.x = $('#' + selected + 'OutRotX').val() || 0;
        sentData.data.exit.rotation.y = $('#' + selected + 'OutRotY').val() || 0;
        sentData.data.exit.rotation.z = $('#' + selected + 'OutRotZ').val() || 0;

        sentData.data.exit.period = $('#' + selected + 'OutPeriod').val() || 1000;
        sentData.data.exit.dampingRatio = $('#' + selected + 'OutDampeningRatio').val() || .5;
        sentData.data.exit.opacity = $('#' + selected + 'OutOpacity').val() || 1;
        sentData.data.exit.duration = $('#' + selected + 'OutDuration').val() || 1000;
        sentData.data.exit.curve = $('#' + selected + 'OutCurve option:selected').val() || null;
    }

    var module = {};
    
    // Exports data to database
    $('#export').on('click', function(){
        generateData();
        console.log('Sent:', sentData)
        saveData(sentData)
    });


    // Refreshes iFrame on button click
    $('#refresh').on('click', function() {
        generateData();
        var dataPackage = JSON.stringify(sentData.data)
        document.getElementById('Iframe').contentWindow.postMessage(dataPackage, '*');
        // var ifr = $('#Iframe')[0];
        // ifr.src = ifr.src;
    });

    // $('document').on('ready', function() {
        
    // })


    document.getElementById('Iframe').contentWindow.postMessage(sentData, '*')

    $('ul').on('click', 'button', function(e){
        e.preventDefault()
        $(this).parent().children('ul').toggle()
    })
})
