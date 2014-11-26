
define(function(require, exports, module) {
    var Engine     = require("famous/core/Engine");
    var Surface    = require("famous/core/Surface");
    var Scrollview = require("famous/views/Scrollview");
    var StateModifier = require("famous/modifiers/StateModifier")
    var mainContext = Engine.createContext();
    var RenderNode = require("famous/core/RenderNode")
    var scrollview = new Scrollview();
    var surfaces = [];

    for (var i = 0, temp, logo; i < 26; i++) {
      
       if(i > 2 && i%2 === 0 && i < 18) {

            temp = new Surface({
                 size: [116,87],
                 align:[0,0],
                 content: '<img src="./images/'+ i+'.png"/>'
            });

       } else if(i%3===0){
           temp = new Surface({
                 size: [116,87],
                 align:[0,0],
                 content: '<img src="./images/noise.gif"/>'
            });

       } else {
         
            temp = new Surface({
                 size: [116, 87],
                 align:[0,0],
                 properties: {
                     backgroundColor: "hsl(" + (i * 1080 / 40) + ", 100%, 50%)",
                     lineHeight: "200px",
                     textAlign: "left",

                 }
            });

       }
        temp.pipe(scrollview);
        surfaces.push(temp);

    }
     


    scrollview.sequenceFrom(surfaces);
   
    setInterval(function(){
      scrollview.goToNextPage();
    if(scrollview.getCurrentIndex() === scrollview["_node"]["_"].cumulativeSizes.length - 2){
      scrollview.goToPage(1)

    }

    }, Math.random() * 1000 + 500);

    mainContext.add(scrollview);


});
