// Load dependencies
var View = require('famous/core/View');
var AdView = require('./AdView');

// Create AppView class
function AppView() {
    View.apply(this, arguments);
    createAdView.call(this);
}

AppView.prototype = Object.create(View.prototype);
AppView.prototype.constructor = AppView;

// Add adView as child of AppView
function createAdView() {
    var adView = new AdView();
    this.add(adView);
}

// Export AppView
module.exports = AppView;