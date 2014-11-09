/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
'use strict';
var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var test = require('tape');
var npm = require('npm');
var rimraf = require('rimraf');

var transformTools = require('browserify-transform-tools');
var famousify = require('../');

var famousPath = path.join(__dirname, '../node_modules/famous');
var dummy = path.resolve(__dirname, '../fixtures/dummy.js');

var engineRequire = 'require(\'famous/core/Engine\');';
var contentUnrelated = 'require(\'hacktheplanet\');';
var expectedOutput = 'require(\'famous/src/core/Engine\');';

function testContent(t, content, result) {
  var expected = result || content;
  transformTools.runTransform(famousify, dummy, {content: content}, function (err, transformed) {
    t.plan(2);
    t.equal(err, null);
    t.equal(transformed, expected);
  });
}

function installFamous(repo, t) {
  t.plan(4);
  rimraf.sync(famousPath);
  t.notok(fs.existsSync(famousPath), 'Famous should not exist in node_modules before install');
  npm.load({
    loaded: false
  }, function (err) {
    t.notok(err, 'npm should load without an error');
    npm.commands.install([repo], function (err) {
      t.notok(err, 'install should finish without an error');
      t.ok(fs.existsSync(famousPath), 'Famous should exist in the node_modules folder after npm install');
    });
  });
}

test('clean up npm cache', function (t) {
  t.plan(1);
  exec('npm cache clean', function (err) {
    t.notok(err, 'should exit without an error');
  });
});

test('setup famous with no src direcotry', function (t) {
  installFamous('famous@0.2.2', t);
});

test('famousify should not work on legacy repos', function (t) {
  testContent(t, engineRequire);
});

test('famousify should not work on unrelated requires', function (t) {
  testContent(t, contentUnrelated);
});

test('setup famous with no src direcotry', function (t) {
  installFamous('TheAlphaNerd/famous#new-structure', t);
});

test('famousify should inject a src directory on the head', function (t) {
  testContent(t, engineRequire, expectedOutput);
});

test('remove famous with no src directory', function (t) {
  rimraf.sync(famousPath);
  t.notok(fs.existsSync(famousPath), 'Famous should not exist after tests are done running');
  t.end();
});
