//load scrolls
require('./scroll.js');
// Load css
require('./styles');
// Load polyfills
require('famous-polyfills');

// Import Dependencies
var Engine = require('famous/core/Engine');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var AppView = require('./views/AppView');

// Create container and set to main context
var el = document.getElementById('famous-container');
Engine.setOptions({ appMode: false });
var container = Engine.createContext(el);
container.setPerspective(500);
// Add utility function that grabs ad data
function initAdFame(data) {
    var appView = new AppView({ data: data });
    container.add(appView);
};

// Instantiate AppView using data
var data = require('./data')
initAdFame(data);