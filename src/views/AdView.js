// Load Dependencies
var View = require('famous/core/View');

// Load files
var BannerView = require('./BannerView');
var AdGenerator = require('../AdGenerator');
var drag = require('../Drag');
<<<<<<< HEAD
var scrollObject = require('../scrolling')

// Add modifier objects
var adObject = AdGenerator();
var dragObject = drag(adObject.logo);
=======
var scrolled = require('../scrolling')
var data = require('../data') 

// Add modifier objects
var adObject = AdGenerator();
var dragObject = drag(adObject.logo, data.url);
var scrollObject = scrolled;
>>>>>>> nytimes, dragging like and not like feature

// Create Adview
function AdView() {
    View.apply(this, arguments);
    _createAd.call(this);
    // _createBanner.call(this);
}

AdView.prototype = Object.create(View.prototype);
AdView.prototype.constructor = AdView;

// AdView.DEFAULT_OPTIONS = {
//     data: undefined
// }

// Applies surface and modifier so AdView
function _createAd() {
    var mainNode= this.add(adObject.modifier)
        .add(dragObject.positionModifier)
<<<<<<< HEAD
        .add(scrollObject.mainModifier)
        .add(dragObject.surface);
}

function _createBanner() {
    this.add(adObject.modifier)
        .add(scrollObject.mainModifier);
=======
        .add(scrollObject.mainModifier);
        var likeNode= mainNode;
        mainNode.add(dragObject.surface);
        likeNode.add(dragObject.opacityYes)
        .add(dragObject.like);
        likeNode.add(dragObject.opacityNo)
        .add(dragObject.notLike);
>>>>>>> nytimes, dragging like and not like feature
}

function _createBanner() {
        // this.add(adObject.modifier)
        // .add(scrollObject.mainModifier)
        // var notLike= like;
        // .add(dragObject.opacityNopacityYes)
        // .add(dragObject.like);
        // notLike.add(dragObject.opacityNo)
        // .add(dragObject.notLike);
}

// Exports AdView
module.exports = AdView;