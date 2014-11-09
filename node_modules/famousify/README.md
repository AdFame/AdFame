#Famo.usify
####ignore the src directory on upstream famous code

---

[![Build Status](https://travis-ci.org/FamousTools/famousify.svg?branch=master)](https://travis-ci.org/FamousTools/famousify) [![Dependency Status](https://david-dm.org/FamousTools/famousify.svg)](https://david-dm.org/FamousTools/famousify) [![devDependency Status](https://david-dm.org/FamousTools/famousify/dev-status.svg)](https://david-dm.org/FamousTools/famousify#info=devDependencies)

Upstream famo.us now has a src directory at the root. This breaks compatibility with node / browserify unless end users include a src directory inside their requires.  This would be gross, and make code unable to move between various environments.  If you add the famousify transform to your browserify transform stack, you will never have to think about that src directory again!

##License

---

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.