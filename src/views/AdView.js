// Load Dependencies
var View = require('famous/core/View');

// Load files
var AdGenerator = require('../AdGenerator');
var drag = require('../Drag');

var scrolled = require('../scrolling')
var data = require('../data') 

// Add modifier objects
var adObject = AdGenerator();
var dragObject = drag(adObject.logo, data.url);
var scrollObject = scrolled;


// Create Adview
function AdView() {
    View.apply(this, arguments);
    _createAd.call(this);
    // _createBanner.call(this);
}

AdView.prototype = Object.create(View.prototype);
AdView.prototype.constructor = AdView;

// Applies surface and modifier so AdView
function _createAd() {
    var mainNode= this.add(adObject.modifier)
        .add(dragObject.positionModifier)
        .add(scrollObject.mainModifier);

        var likeNode = mainNode;
        
        mainNode.add(dragObject.surface);
        
        likeNode.add(dragObject.opacityYes)
        .add(dragObject.like);

        likeNode.add(dragObject.opacityNo)
        .add(dragObject.notLike);
}

// Exports AdView
module.exports = AdView;