// Load Dependencies
var View = require('famous/core/View');
var Surface = require('famous/core/Surface');

// Load files
var BannerView = require('./BannerView');
var AdGenerator = require('../AdGenerator');
var drag = require('../Drag');
var scrollObject = require('../scrolling')

// Add modifier objects
var adObject = AdGenerator();
var dragObject = drag(adObject.logo);

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

// Creates ad surface with modifiers and attaches
// it to AdView
function _createAd() {
    this.add(adObject.modifier)
        .add(scrollObject.mainModifier)
        .add(dragObject.positionModifier)
        .add(dragObject.surface);
}

// Creates background surface with modifiers and
// attaches it to the AdView
function _createBanner() {
    this.add(banner);
}

var banner = new Surface({
	size: [100, 100],
	properties: {backgroundColor: 'blue'}
});

// Exports AdView
module.exports = AdView;