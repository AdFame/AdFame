/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var path = require('path');
var transformTools = require('browserify-transform-tools');
var resolve = require('resolve');

var options = {
  jsFilesOnly: true
};

function checkFamous(opts, done) {
  resolve('famous/core/Engine', { basedir: path.dirname(opts.file) }, function (err, res) {
    return done(err, res);
  });
}

module.exports  =  transformTools.makeRequireTransform('famousify', options,
  function (args, opts, done) {
    checkFamous(opts, function (err, res) {
      var splitPath = args[0].split('/');
      var newRequire = '';
      if (err && splitPath[0] === 'famous' && splitPath[1] !== 'src') {
        splitPath.splice(1, 0, 'src');
        newRequire = ['require(\'', splitPath.join('/'), '\')'].join('');
        return done(null, newRequire);
      }
      return done();
    });
  });
