var View = require('famous/view');

function App(options) {
    // extend from view
    View.apply(this, arguments);
};

App.prototype = Object.create(View.prototype);
App.prototype.constructor = App;

App.DEFAULT_OPTIONS = {};

module.exports = App;
