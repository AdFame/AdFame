var db = require('./config');

var mongoose = require('mongoose');

db.adData.pre('save', function(next){
    });

var adModel = mongoose.model('adModel', db.adData);

module.exports = adModel;