// Load css
require('./styles');
// Load polyfills
require('famous-polyfills');
// Load AdGenerator
var AdGenerator = require('./AdGenerator');

// Import Dependencies
var Engine = require('famous/core/Engine');
var DrawerLayout = require('famous/views/DrawerLayout');
var Surface = require('famous/core/Surface')

// Create container and set to main context
 var el = document.getElementById('famous-container');
Engine.setOptions({ appMode: false });
var container = Engine.createContext(el);

createContainer();

// Fill container with a layout and content from the AdGenerator
function createContainer() {
	console.log(AdGenerator());
	var adObject = AdGenerator();

	container
		.add(adObject.modifier)
		.add(adObject.positionModifier)
		.add(adObject.logo);
}
