// Load Dependencies
var View = require('famous/core/View');

// Load files
var BannerView = require('./BannerView');
var AdGenerator = require('../AdGenerator');
var drag = require('../Drag');
var scrolled = require('../scrolling')

// Add modifier objects
var adObject = AdGenerator();
var dragObject = drag(adObject.logo);
var scrollObject = scrolled;

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
    this.add(adObject.modifier)
        .add(dragObject.positionModifier)
        .add(scrollObject.mainModifier)
        .add(dragObject.surface);
}

function _createBanner() {
    this.add(adObject.modifier)
        .add(scrollObject.mainModifier);
}

// Exports AdView
module.exports = AdView;