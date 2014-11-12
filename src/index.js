//load scrolls
require('./scroll.js');
// Load css
require('./styles');
// Load polyfills
require('famous-polyfills');
// Load AdGenerator
var AdGenerator = require('./AdGenerator');
// Load drag
var drag = require('./drag');
// Load scroll
var scrolled = require('./scrolling')

// Import Dependencies
var Engine = require('famous/core/Engine');
var Surface = require('famous/core/Surface');

// Create container and set to main context
var el = document.getElementById('famous-container');
Engine.setOptions({ appMode: false });
var container = Engine.createContext(el);

createContainer();

// Fill container with a layout and content from the AdGenerator
function createContainer() {
	var adObject = AdGenerator();
  var scrollObject = scrolled()
	var dragObject = drag(adObject.logo);

	container
		.add(adObject.modifier)
		.add(adObject.positionModifier)
		.add(dragObject.positionModifier)
    .add(scrollObject.rotationModifier)
    .add(dragObject.surface)
}
