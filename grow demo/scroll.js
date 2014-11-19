
define(function(require, exports, module) {
    var Engine     = require("famous/core/Engine");
    var Surface    = require("famous/core/Surface");
    var Scrollview = require("famous/views/Scrollview");
    var StateModifier = require("famous/modifiers/StateModifier")
    var mainContext = Engine.createContext();
    var RenderNode = require("famous/core/RenderNode")
    var scrollview = new Scrollview();
    var surfaces = [];


    for (var i = 0, temp, logo; i < 35; i++) {
      
        temp = new Surface({
           content: 'logo',
             size: [58, 42],
             align:[0,0],
             properties: {
                 backgroundColor: "hsl(" + (i * 360 / 40) + ", 100%, 50%)",
                 lineHeight: "200px",
                 textAlign: "center",

             }
        });
       
        temp.pipe(scrollview);
        surfaces.push(temp);
    }
     


    scrollview.sequenceFrom(surfaces);
   
    setInterval(function(){
      scrollview.goToNextPage();
    if(scrollview.getCurrentIndex() === scrollview["_node"]["_"].cumulativeSizes.length - 2){
      scrollview.goToPage(0)

    }

    }, 1000)

    mainContext.add(scrollview);

});
