// import dependencies
require('famous/polyfills');
var Engine = require('famous/engine');
var App = require('app');

// create the App from the template
var myApp = new App();

// create a display context and hook in the App
var mainDisplay = Engine.createContext();
mainDisplay.link(myApp);
Engine.pipe(myApp);
