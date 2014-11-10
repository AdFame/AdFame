(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/cssify/browser.js":[function(require,module,exports){
module.exports = function (css, customDocument) {
  var doc = customDocument || document;
  if (doc.createStyleSheet) {
    var sheet = doc.createStyleSheet()
    sheet.cssText = css;
    return sheet.ownerNode;
  } else {
    var head = doc.getElementsByTagName('head')[0],
        style = doc.createElement('style');

    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(doc.createTextNode(css));
    }

    head.appendChild(style);
    return style;
  }
};

module.exports.byUrl = function(url) {
  if (document.createStyleSheet) {
    return document.createStyleSheet(url).ownerNode;
  } else {
    var head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = url;

    head.appendChild(link);
    return link;
  }
};

},{}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous-polyfills/classList.js":[function(require,module,exports){

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 2011-06-15
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

if (typeof document !== "undefined" && !("classList" in document.createElement("a"))) {

(function (view) {

"use strict";

var
      classListProp = "classList"
    , protoProp = "prototype"
    , elemCtrProto = (view.HTMLElement || view.Element)[protoProp]
    , objCtr = Object
    , strTrim = String[protoProp].trim || function () {
        return this.replace(/^\s+|\s+$/g, "");
    }
    , arrIndexOf = Array[protoProp].indexOf || function (item) {
        var
              i = 0
            , len = this.length
        ;
        for (; i < len; i++) {
            if (i in this && this[i] === item) {
                return i;
            }
        }
        return -1;
    }
    // Vendors: please allow content code to instantiate DOMExceptions
    , DOMEx = function (type, message) {
        this.name = type;
        this.code = DOMException[type];
        this.message = message;
    }
    , checkTokenAndGetIndex = function (classList, token) {
        if (token === "") {
            throw new DOMEx(
                  "SYNTAX_ERR"
                , "An invalid or illegal string was specified"
            );
        }
        if (/\s/.test(token)) {
            throw new DOMEx(
                  "INVALID_CHARACTER_ERR"
                , "String contains an invalid character"
            );
        }
        return arrIndexOf.call(classList, token);
    }
    , ClassList = function (elem) {
        var
              trimmedClasses = strTrim.call(elem.className)
            , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
            , i = 0
            , len = classes.length
        ;
        for (; i < len; i++) {
            this.push(classes[i]);
        }
        this._updateClassName = function () {
            elem.className = this.toString();
        };
    }
    , classListProto = ClassList[protoProp] = []
    , classListGetter = function () {
        return new ClassList(this);
    }
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
    return this[i] || null;
};
classListProto.contains = function (token) {
    token += "";
    return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function (token) {
    token += "";
    if (checkTokenAndGetIndex(this, token) === -1) {
        this.push(token);
        this._updateClassName();
    }
};
classListProto.remove = function (token) {
    token += "";
    var index = checkTokenAndGetIndex(this, token);
    if (index !== -1) {
        this.splice(index, 1);
        this._updateClassName();
    }
};
classListProto.toggle = function (token) {
    token += "";
    if (checkTokenAndGetIndex(this, token) === -1) {
        this.add(token);
    } else {
        this.remove(token);
    }
};
classListProto.toString = function () {
    return this.join(" ");
};

if (objCtr.defineProperty) {
    var classListPropDesc = {
          get: classListGetter
        , enumerable: true
        , configurable: true
    };
    try {
        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
    } catch (ex) { // IE 8 doesn't support enumerable:true
        if (ex.number === -0x7FF5EC54) {
            classListPropDesc.enumerable = false;
            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
        }
    }
} else if (objCtr[protoProp].__defineGetter__) {
    elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(self));

}

},{}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous-polyfills/functionPrototypeBind.js":[function(require,module,exports){
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis
                ? this
                : oThis,
                aArgs.concat(Array.prototype.slice.call(arguments)));
        };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

},{}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous-polyfills/index.js":[function(require,module,exports){
require('./classList.js');
require('./functionPrototypeBind.js');
require('./requestAnimationFrame.js');
},{"./classList.js":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous-polyfills/classList.js","./functionPrototypeBind.js":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous-polyfills/functionPrototypeBind.js","./requestAnimationFrame.js":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous-polyfills/requestAnimationFrame.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous-polyfills/requestAnimationFrame.js":[function(require,module,exports){
// adds requestAnimationFrame functionality
// Source: http://strd6.com/2011/05/better-window-requestanimationframe-shim/

window.requestAnimationFrame || (window.requestAnimationFrame =
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  function(callback, element) {
    return window.setTimeout(function() {
      callback(+new Date());
  }, 1000 / 60);
});

},{}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Context.js":[function(require,module,exports){
var RenderNode = require('./RenderNode');
var EventHandler = require('./EventHandler');
var ElementAllocator = require('./ElementAllocator');
var Transform = require('./Transform');
var Transitionable = require('../transitions/Transitionable');
var _zeroZero = [
        0,
        0
    ];
var usePrefix = !('perspective' in document.documentElement.style);
function _getElementSize(element) {
    return [
        element.clientWidth,
        element.clientHeight
    ];
}
var _setPerspective = usePrefix ? function (element, perspective) {
        element.style.webkitPerspective = perspective ? perspective.toFixed() + 'px' : '';
    } : function (element, perspective) {
        element.style.perspective = perspective ? perspective.toFixed() + 'px' : '';
    };
function Context(container) {
    this.container = container;
    this._allocator = new ElementAllocator(container);
    this._node = new RenderNode();
    this._eventOutput = new EventHandler();
    this._size = _getElementSize(this.container);
    this._perspectiveState = new Transitionable(0);
    this._perspective = undefined;
    this._nodeContext = {
        allocator: this._allocator,
        transform: Transform.identity,
        opacity: 1,
        origin: _zeroZero,
        align: _zeroZero,
        size: this._size
    };
    this._eventOutput.on('resize', function () {
        this.setSize(_getElementSize(this.container));
    }.bind(this));
}
Context.prototype.getAllocator = function getAllocator() {
    return this._allocator;
};
Context.prototype.add = function add(obj) {
    return this._node.add(obj);
};
Context.prototype.migrate = function migrate(container) {
    if (container === this.container)
        return;
    this.container = container;
    this._allocator.migrate(container);
};
Context.prototype.getSize = function getSize() {
    return this._size;
};
Context.prototype.setSize = function setSize(size) {
    if (!size)
        size = _getElementSize(this.container);
    this._size[0] = size[0];
    this._size[1] = size[1];
};
Context.prototype.update = function update(contextParameters) {
    if (contextParameters) {
        if (contextParameters.transform)
            this._nodeContext.transform = contextParameters.transform;
        if (contextParameters.opacity)
            this._nodeContext.opacity = contextParameters.opacity;
        if (contextParameters.origin)
            this._nodeContext.origin = contextParameters.origin;
        if (contextParameters.align)
            this._nodeContext.align = contextParameters.align;
        if (contextParameters.size)
            this._nodeContext.size = contextParameters.size;
    }
    var perspective = this._perspectiveState.get();
    if (perspective !== this._perspective) {
        _setPerspective(this.container, perspective);
        this._perspective = perspective;
    }
    this._node.commit(this._nodeContext);
};
Context.prototype.getPerspective = function getPerspective() {
    return this._perspectiveState.get();
};
Context.prototype.setPerspective = function setPerspective(perspective, transition, callback) {
    return this._perspectiveState.set(perspective, transition, callback);
};
Context.prototype.emit = function emit(type, event) {
    return this._eventOutput.emit(type, event);
};
Context.prototype.on = function on(type, handler) {
    return this._eventOutput.on(type, handler);
};
Context.prototype.removeListener = function removeListener(type, handler) {
    return this._eventOutput.removeListener(type, handler);
};
Context.prototype.pipe = function pipe(target) {
    return this._eventOutput.pipe(target);
};
Context.prototype.unpipe = function unpipe(target) {
    return this._eventOutput.unpipe(target);
};
module.exports = Context;
},{"../transitions/Transitionable":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/Transitionable.js","./ElementAllocator":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/ElementAllocator.js","./EventHandler":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventHandler.js","./RenderNode":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/RenderNode.js","./Transform":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Transform.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/ElementAllocator.js":[function(require,module,exports){
function ElementAllocator(container) {
    if (!container)
        container = document.createDocumentFragment();
    this.container = container;
    this.detachedNodes = {};
    this.nodeCount = 0;
}
ElementAllocator.prototype.migrate = function migrate(container) {
    var oldContainer = this.container;
    if (container === oldContainer)
        return;
    if (oldContainer instanceof DocumentFragment) {
        container.appendChild(oldContainer);
    } else {
        while (oldContainer.hasChildNodes()) {
            container.appendChild(oldContainer.removeChild(oldContainer.firstChild));
        }
    }
    this.container = container;
};
ElementAllocator.prototype.allocate = function allocate(type) {
    type = type.toLowerCase();
    if (!(type in this.detachedNodes))
        this.detachedNodes[type] = [];
    var nodeStore = this.detachedNodes[type];
    var result;
    if (nodeStore.length > 0) {
        result = nodeStore.pop();
    } else {
        result = document.createElement(type);
        this.container.appendChild(result);
    }
    this.nodeCount++;
    return result;
};
ElementAllocator.prototype.deallocate = function deallocate(element) {
    var nodeType = element.nodeName.toLowerCase();
    var nodeStore = this.detachedNodes[nodeType];
    nodeStore.push(element);
    this.nodeCount--;
};
ElementAllocator.prototype.getNodeCount = function getNodeCount() {
    return this.nodeCount;
};
module.exports = ElementAllocator;
},{}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/ElementOutput.js":[function(require,module,exports){
var Entity = require('./Entity');
var EventHandler = require('./EventHandler');
var Transform = require('./Transform');
var usePrefix = !('transform' in document.documentElement.style);
var devicePixelRatio = window.devicePixelRatio || 1;
function ElementOutput(element) {
    this._matrix = null;
    this._opacity = 1;
    this._origin = null;
    this._size = null;
    this._eventOutput = new EventHandler();
    this._eventOutput.bindThis(this);
    this.eventForwarder = function eventForwarder(event) {
        this._eventOutput.emit(event.type, event);
    }.bind(this);
    this.id = Entity.register(this);
    this._element = null;
    this._sizeDirty = false;
    this._originDirty = false;
    this._transformDirty = false;
    this._invisible = false;
    if (element)
        this.attach(element);
}
ElementOutput.prototype.on = function on(type, fn) {
    if (this._element)
        this._element.addEventListener(type, this.eventForwarder);
    this._eventOutput.on(type, fn);
};
ElementOutput.prototype.removeListener = function removeListener(type, fn) {
    this._eventOutput.removeListener(type, fn);
};
ElementOutput.prototype.emit = function emit(type, event) {
    if (event && !event.origin)
        event.origin = this;
    var handled = this._eventOutput.emit(type, event);
    if (handled && event && event.stopPropagation)
        event.stopPropagation();
    return handled;
};
ElementOutput.prototype.pipe = function pipe(target) {
    return this._eventOutput.pipe(target);
};
ElementOutput.prototype.unpipe = function unpipe(target) {
    return this._eventOutput.unpipe(target);
};
ElementOutput.prototype.render = function render() {
    return this.id;
};
function _addEventListeners(target) {
    for (var i in this._eventOutput.listeners) {
        target.addEventListener(i, this.eventForwarder);
    }
}
function _removeEventListeners(target) {
    for (var i in this._eventOutput.listeners) {
        target.removeEventListener(i, this.eventForwarder);
    }
}
function _formatCSSTransform(m) {
    m[12] = Math.round(m[12] * devicePixelRatio) / devicePixelRatio;
    m[13] = Math.round(m[13] * devicePixelRatio) / devicePixelRatio;
    var result = 'matrix3d(';
    for (var i = 0; i < 15; i++) {
        result += m[i] < 0.000001 && m[i] > -0.000001 ? '0,' : m[i] + ',';
    }
    result += m[15] + ')';
    return result;
}
var _setMatrix;
if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    _setMatrix = function (element, matrix) {
        element.style.zIndex = matrix[14] * 1000000 | 0;
        element.style.transform = _formatCSSTransform(matrix);
    };
} else if (usePrefix) {
    _setMatrix = function (element, matrix) {
        element.style.webkitTransform = _formatCSSTransform(matrix);
    };
} else {
    _setMatrix = function (element, matrix) {
        element.style.transform = _formatCSSTransform(matrix);
    };
}
function _formatCSSOrigin(origin) {
    return 100 * origin[0] + '% ' + 100 * origin[1] + '%';
}
var _setOrigin = usePrefix ? function (element, origin) {
        element.style.webkitTransformOrigin = _formatCSSOrigin(origin);
    } : function (element, origin) {
        element.style.transformOrigin = _formatCSSOrigin(origin);
    };
var _setInvisible = usePrefix ? function (element) {
        element.style.webkitTransform = 'scale3d(0.0001,0.0001,0.0001)';
        element.style.opacity = 0;
    } : function (element) {
        element.style.transform = 'scale3d(0.0001,0.0001,0.0001)';
        element.style.opacity = 0;
    };
function _xyNotEquals(a, b) {
    return a && b ? a[0] !== b[0] || a[1] !== b[1] : a !== b;
}
ElementOutput.prototype.commit = function commit(context) {
    var target = this._element;
    if (!target)
        return;
    var matrix = context.transform;
    var opacity = context.opacity;
    var origin = context.origin;
    var size = context.size;
    if (!matrix && this._matrix) {
        this._matrix = null;
        this._opacity = 0;
        _setInvisible(target);
        return;
    }
    if (_xyNotEquals(this._origin, origin))
        this._originDirty = true;
    if (Transform.notEquals(this._matrix, matrix))
        this._transformDirty = true;
    if (this._invisible) {
        this._invisible = false;
        this._element.style.display = '';
    }
    if (this._opacity !== opacity) {
        this._opacity = opacity;
        target.style.opacity = opacity >= 1 ? '0.999999' : opacity;
    }
    if (this._transformDirty || this._originDirty || this._sizeDirty) {
        if (this._sizeDirty)
            this._sizeDirty = false;
        if (this._originDirty) {
            if (origin) {
                if (!this._origin)
                    this._origin = [
                        0,
                        0
                    ];
                this._origin[0] = origin[0];
                this._origin[1] = origin[1];
            } else
                this._origin = null;
            _setOrigin(target, this._origin);
            this._originDirty = false;
        }
        if (!matrix)
            matrix = Transform.identity;
        this._matrix = matrix;
        var aaMatrix = this._size ? Transform.thenMove(matrix, [
                -this._size[0] * origin[0],
                -this._size[1] * origin[1],
                0
            ]) : matrix;
        _setMatrix(target, aaMatrix);
        this._transformDirty = false;
    }
};
ElementOutput.prototype.cleanup = function cleanup() {
    if (this._element) {
        this._invisible = true;
        this._element.style.display = 'none';
    }
};
ElementOutput.prototype.attach = function attach(target) {
    this._element = target;
    _addEventListeners.call(this, target);
};
ElementOutput.prototype.detach = function detach() {
    var target = this._element;
    if (target) {
        _removeEventListeners.call(this, target);
        if (this._invisible) {
            this._invisible = false;
            this._element.style.display = '';
        }
    }
    this._element = null;
    return target;
};
module.exports = ElementOutput;
},{"./Entity":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Entity.js","./EventHandler":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventHandler.js","./Transform":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Transform.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Engine.js":[function(require,module,exports){
var Context = require('./Context');
var EventHandler = require('./EventHandler');
var OptionsManager = require('./OptionsManager');
var Engine = {};
var contexts = [];
var nextTickQueue = [];
var deferQueue = [];
var lastTime = Date.now();
var frameTime;
var frameTimeLimit;
var loopEnabled = true;
var eventForwarders = {};
var eventHandler = new EventHandler();
var options = {
        containerType: 'div',
        containerClass: 'famous-container',
        fpsCap: undefined,
        runLoop: true,
        appMode: true
    };
var optionsManager = new OptionsManager(options);
var MAX_DEFER_FRAME_TIME = 10;
Engine.step = function step() {
    var currentTime = Date.now();
    if (frameTimeLimit && currentTime - lastTime < frameTimeLimit)
        return;
    var i = 0;
    frameTime = currentTime - lastTime;
    lastTime = currentTime;
    eventHandler.emit('prerender');
    for (i = 0; i < nextTickQueue.length; i++)
        nextTickQueue[i].call(this);
    nextTickQueue.splice(0);
    while (deferQueue.length && Date.now() - currentTime < MAX_DEFER_FRAME_TIME) {
        deferQueue.shift().call(this);
    }
    for (i = 0; i < contexts.length; i++)
        contexts[i].update();
    eventHandler.emit('postrender');
};
function loop() {
    if (options.runLoop) {
        Engine.step();
        window.requestAnimationFrame(loop);
    } else
        loopEnabled = false;
}
window.requestAnimationFrame(loop);
function handleResize(event) {
    for (var i = 0; i < contexts.length; i++) {
        contexts[i].emit('resize');
    }
    eventHandler.emit('resize');
}
window.addEventListener('resize', handleResize, false);
handleResize();
function initialize() {
    window.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, true);
    document.body.classList.add('famous-root');
    document.documentElement.classList.add('famous-root');
}
var initialized = false;
Engine.pipe = function pipe(target) {
    if (target.subscribe instanceof Function)
        return target.subscribe(Engine);
    else
        return eventHandler.pipe(target);
};
Engine.unpipe = function unpipe(target) {
    if (target.unsubscribe instanceof Function)
        return target.unsubscribe(Engine);
    else
        return eventHandler.unpipe(target);
};
Engine.on = function on(type, handler) {
    if (!(type in eventForwarders)) {
        eventForwarders[type] = eventHandler.emit.bind(eventHandler, type);
        if (document.body) {
            document.body.addEventListener(type, eventForwarders[type]);
        } else {
            Engine.nextTick(function (type, forwarder) {
                document.body.addEventListener(type, forwarder);
            }.bind(this, type, eventForwarders[type]));
        }
    }
    return eventHandler.on(type, handler);
};
Engine.emit = function emit(type, event) {
    return eventHandler.emit(type, event);
};
Engine.removeListener = function removeListener(type, handler) {
    return eventHandler.removeListener(type, handler);
};
Engine.getFPS = function getFPS() {
    return 1000 / frameTime;
};
Engine.setFPSCap = function setFPSCap(fps) {
    frameTimeLimit = Math.floor(1000 / fps);
};
Engine.getOptions = function getOptions(key) {
    return optionsManager.getOptions(key);
};
Engine.setOptions = function setOptions(options) {
    return optionsManager.setOptions.apply(optionsManager, arguments);
};
Engine.createContext = function createContext(el) {
    if (!initialized && options.appMode)
        Engine.nextTick(initialize);
    var needMountContainer = false;
    if (!el) {
        el = document.createElement(options.containerType);
        el.classList.add(options.containerClass);
        needMountContainer = true;
    }
    var context = new Context(el);
    Engine.registerContext(context);
    if (needMountContainer) {
        Engine.nextTick(function (context, el) {
            document.body.appendChild(el);
            context.emit('resize');
        }.bind(this, context, el));
    }
    return context;
};
Engine.registerContext = function registerContext(context) {
    contexts.push(context);
    return context;
};
Engine.getContexts = function getContexts() {
    return contexts;
};
Engine.deregisterContext = function deregisterContext(context) {
    var i = contexts.indexOf(context);
    if (i >= 0)
        contexts.splice(i, 1);
};
Engine.nextTick = function nextTick(fn) {
    nextTickQueue.push(fn);
};
Engine.defer = function defer(fn) {
    deferQueue.push(fn);
};
optionsManager.on('change', function (data) {
    if (data.id === 'fpsCap')
        Engine.setFPSCap(data.value);
    else if (data.id === 'runLoop') {
        if (!loopEnabled && data.value) {
            loopEnabled = true;
            window.requestAnimationFrame(loop);
        }
    }
});
module.exports = Engine;
},{"./Context":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Context.js","./EventHandler":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventHandler.js","./OptionsManager":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/OptionsManager.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Entity.js":[function(require,module,exports){
var entities = [];
function get(id) {
    return entities[id];
}
function set(id, entity) {
    entities[id] = entity;
}
function register(entity) {
    var id = entities.length;
    set(id, entity);
    return id;
}
function unregister(id) {
    set(id, null);
}
module.exports = {
    register: register,
    unregister: unregister,
    get: get,
    set: set
};
},{}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventEmitter.js":[function(require,module,exports){
function EventEmitter() {
    this.listeners = {};
    this._owner = this;
}
EventEmitter.prototype.emit = function emit(type, event) {
    var handlers = this.listeners[type];
    if (handlers) {
        for (var i = 0; i < handlers.length; i++) {
            handlers[i].call(this._owner, event);
        }
    }
    return this;
};
EventEmitter.prototype.on = function on(type, handler) {
    if (!(type in this.listeners))
        this.listeners[type] = [];
    var index = this.listeners[type].indexOf(handler);
    if (index < 0)
        this.listeners[type].push(handler);
    return this;
};
EventEmitter.prototype.addListener = EventEmitter.prototype.on;
EventEmitter.prototype.removeListener = function removeListener(type, handler) {
    var listener = this.listeners[type];
    if (listener !== undefined) {
        var index = listener.indexOf(handler);
        if (index >= 0)
            listener.splice(index, 1);
    }
    return this;
};
EventEmitter.prototype.bindThis = function bindThis(owner) {
    this._owner = owner;
};
module.exports = EventEmitter;
},{}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventHandler.js":[function(require,module,exports){
var EventEmitter = require('./EventEmitter');
function EventHandler() {
    EventEmitter.apply(this, arguments);
    this.downstream = [];
    this.downstreamFn = [];
    this.upstream = [];
    this.upstreamListeners = {};
}
EventHandler.prototype = Object.create(EventEmitter.prototype);
EventHandler.prototype.constructor = EventHandler;
EventHandler.setInputHandler = function setInputHandler(object, handler) {
    object.trigger = handler.trigger.bind(handler);
    if (handler.subscribe && handler.unsubscribe) {
        object.subscribe = handler.subscribe.bind(handler);
        object.unsubscribe = handler.unsubscribe.bind(handler);
    }
};
EventHandler.setOutputHandler = function setOutputHandler(object, handler) {
    if (handler instanceof EventHandler)
        handler.bindThis(object);
    object.pipe = handler.pipe.bind(handler);
    object.unpipe = handler.unpipe.bind(handler);
    object.on = handler.on.bind(handler);
    object.addListener = object.on;
    object.removeListener = handler.removeListener.bind(handler);
};
EventHandler.prototype.emit = function emit(type, event) {
    EventEmitter.prototype.emit.apply(this, arguments);
    var i = 0;
    for (i = 0; i < this.downstream.length; i++) {
        if (this.downstream[i].trigger)
            this.downstream[i].trigger(type, event);
    }
    for (i = 0; i < this.downstreamFn.length; i++) {
        this.downstreamFn[i](type, event);
    }
    return this;
};
EventHandler.prototype.trigger = EventHandler.prototype.emit;
EventHandler.prototype.pipe = function pipe(target) {
    if (target.subscribe instanceof Function)
        return target.subscribe(this);
    var downstreamCtx = target instanceof Function ? this.downstreamFn : this.downstream;
    var index = downstreamCtx.indexOf(target);
    if (index < 0)
        downstreamCtx.push(target);
    if (target instanceof Function)
        target('pipe', null);
    else if (target.trigger)
        target.trigger('pipe', null);
    return target;
};
EventHandler.prototype.unpipe = function unpipe(target) {
    if (target.unsubscribe instanceof Function)
        return target.unsubscribe(this);
    var downstreamCtx = target instanceof Function ? this.downstreamFn : this.downstream;
    var index = downstreamCtx.indexOf(target);
    if (index >= 0) {
        downstreamCtx.splice(index, 1);
        if (target instanceof Function)
            target('unpipe', null);
        else if (target.trigger)
            target.trigger('unpipe', null);
        return target;
    } else
        return false;
};
EventHandler.prototype.on = function on(type, handler) {
    EventEmitter.prototype.on.apply(this, arguments);
    if (!(type in this.upstreamListeners)) {
        var upstreamListener = this.trigger.bind(this, type);
        this.upstreamListeners[type] = upstreamListener;
        for (var i = 0; i < this.upstream.length; i++) {
            this.upstream[i].on(type, upstreamListener);
        }
    }
    return this;
};
EventHandler.prototype.addListener = EventHandler.prototype.on;
EventHandler.prototype.subscribe = function subscribe(source) {
    var index = this.upstream.indexOf(source);
    if (index < 0) {
        this.upstream.push(source);
        for (var type in this.upstreamListeners) {
            source.on(type, this.upstreamListeners[type]);
        }
    }
    return this;
};
EventHandler.prototype.unsubscribe = function unsubscribe(source) {
    var index = this.upstream.indexOf(source);
    if (index >= 0) {
        this.upstream.splice(index, 1);
        for (var type in this.upstreamListeners) {
            source.removeListener(type, this.upstreamListeners[type]);
        }
    }
    return this;
};
module.exports = EventHandler;
},{"./EventEmitter":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventEmitter.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Modifier.js":[function(require,module,exports){
var Transform = require('./Transform');
var Transitionable = require('../transitions/Transitionable');
var TransitionableTransform = require('../transitions/TransitionableTransform');
function Modifier(options) {
    this._transformGetter = null;
    this._opacityGetter = null;
    this._originGetter = null;
    this._alignGetter = null;
    this._sizeGetter = null;
    this._proportionGetter = null;
    this._legacyStates = {};
    this._output = {
        transform: Transform.identity,
        opacity: 1,
        origin: null,
        align: null,
        size: null,
        proportions: null,
        target: null
    };
    if (options) {
        if (options.transform)
            this.transformFrom(options.transform);
        if (options.opacity !== undefined)
            this.opacityFrom(options.opacity);
        if (options.origin)
            this.originFrom(options.origin);
        if (options.align)
            this.alignFrom(options.align);
        if (options.size)
            this.sizeFrom(options.size);
        if (options.proportions)
            this.proportionsFrom(options.proportions);
    }
}
Modifier.prototype.transformFrom = function transformFrom(transform) {
    if (transform instanceof Function)
        this._transformGetter = transform;
    else if (transform instanceof Object && transform.get)
        this._transformGetter = transform.get.bind(transform);
    else {
        this._transformGetter = null;
        this._output.transform = transform;
    }
    return this;
};
Modifier.prototype.opacityFrom = function opacityFrom(opacity) {
    if (opacity instanceof Function)
        this._opacityGetter = opacity;
    else if (opacity instanceof Object && opacity.get)
        this._opacityGetter = opacity.get.bind(opacity);
    else {
        this._opacityGetter = null;
        this._output.opacity = opacity;
    }
    return this;
};
Modifier.prototype.originFrom = function originFrom(origin) {
    if (origin instanceof Function)
        this._originGetter = origin;
    else if (origin instanceof Object && origin.get)
        this._originGetter = origin.get.bind(origin);
    else {
        this._originGetter = null;
        this._output.origin = origin;
    }
    return this;
};
Modifier.prototype.alignFrom = function alignFrom(align) {
    if (align instanceof Function)
        this._alignGetter = align;
    else if (align instanceof Object && align.get)
        this._alignGetter = align.get.bind(align);
    else {
        this._alignGetter = null;
        this._output.align = align;
    }
    return this;
};
Modifier.prototype.sizeFrom = function sizeFrom(size) {
    if (size instanceof Function)
        this._sizeGetter = size;
    else if (size instanceof Object && size.get)
        this._sizeGetter = size.get.bind(size);
    else {
        this._sizeGetter = null;
        this._output.size = size;
    }
    return this;
};
Modifier.prototype.proportionsFrom = function proportionsFrom(proportions) {
    if (proportions instanceof Function)
        this._proportionGetter = proportions;
    else if (proportions instanceof Object && proportions.get)
        this._proportionGetter = proportions.get.bind(proportions);
    else {
        this._proportionGetter = null;
        this._output.proportions = proportions;
    }
    return this;
};
Modifier.prototype.setTransform = function setTransform(transform, transition, callback) {
    if (transition || this._legacyStates.transform) {
        if (!this._legacyStates.transform) {
            this._legacyStates.transform = new TransitionableTransform(this._output.transform);
        }
        if (!this._transformGetter)
            this.transformFrom(this._legacyStates.transform);
        this._legacyStates.transform.set(transform, transition, callback);
        return this;
    } else
        return this.transformFrom(transform);
};
Modifier.prototype.setOpacity = function setOpacity(opacity, transition, callback) {
    if (transition || this._legacyStates.opacity) {
        if (!this._legacyStates.opacity) {
            this._legacyStates.opacity = new Transitionable(this._output.opacity);
        }
        if (!this._opacityGetter)
            this.opacityFrom(this._legacyStates.opacity);
        return this._legacyStates.opacity.set(opacity, transition, callback);
    } else
        return this.opacityFrom(opacity);
};
Modifier.prototype.setOrigin = function setOrigin(origin, transition, callback) {
    if (transition || this._legacyStates.origin) {
        if (!this._legacyStates.origin) {
            this._legacyStates.origin = new Transitionable(this._output.origin || [
                0,
                0
            ]);
        }
        if (!this._originGetter)
            this.originFrom(this._legacyStates.origin);
        this._legacyStates.origin.set(origin, transition, callback);
        return this;
    } else
        return this.originFrom(origin);
};
Modifier.prototype.setAlign = function setAlign(align, transition, callback) {
    if (transition || this._legacyStates.align) {
        if (!this._legacyStates.align) {
            this._legacyStates.align = new Transitionable(this._output.align || [
                0,
                0
            ]);
        }
        if (!this._alignGetter)
            this.alignFrom(this._legacyStates.align);
        this._legacyStates.align.set(align, transition, callback);
        return this;
    } else
        return this.alignFrom(align);
};
Modifier.prototype.setSize = function setSize(size, transition, callback) {
    if (size && (transition || this._legacyStates.size)) {
        if (!this._legacyStates.size) {
            this._legacyStates.size = new Transitionable(this._output.size || [
                0,
                0
            ]);
        }
        if (!this._sizeGetter)
            this.sizeFrom(this._legacyStates.size);
        this._legacyStates.size.set(size, transition, callback);
        return this;
    } else
        return this.sizeFrom(size);
};
Modifier.prototype.setProportions = function setProportions(proportions, transition, callback) {
    if (proportions && (transition || this._legacyStates.proportions)) {
        if (!this._legacyStates.proportions) {
            this._legacyStates.proportions = new Transitionable(this._output.proportions || [
                0,
                0
            ]);
        }
        if (!this._proportionGetter)
            this.proportionsFrom(this._legacyStates.proportions);
        this._legacyStates.proportions.set(proportions, transition, callback);
        return this;
    } else
        return this.proportionsFrom(proportions);
};
Modifier.prototype.halt = function halt() {
    if (this._legacyStates.transform)
        this._legacyStates.transform.halt();
    if (this._legacyStates.opacity)
        this._legacyStates.opacity.halt();
    if (this._legacyStates.origin)
        this._legacyStates.origin.halt();
    if (this._legacyStates.align)
        this._legacyStates.align.halt();
    if (this._legacyStates.size)
        this._legacyStates.size.halt();
    if (this._legacyStates.proportions)
        this._legacyStates.proportions.halt();
    this._transformGetter = null;
    this._opacityGetter = null;
    this._originGetter = null;
    this._alignGetter = null;
    this._sizeGetter = null;
    this._proportionGetter = null;
};
Modifier.prototype.getTransform = function getTransform() {
    return this._transformGetter();
};
Modifier.prototype.getFinalTransform = function getFinalTransform() {
    return this._legacyStates.transform ? this._legacyStates.transform.getFinal() : this._output.transform;
};
Modifier.prototype.getOpacity = function getOpacity() {
    return this._opacityGetter();
};
Modifier.prototype.getOrigin = function getOrigin() {
    return this._originGetter();
};
Modifier.prototype.getAlign = function getAlign() {
    return this._alignGetter();
};
Modifier.prototype.getSize = function getSize() {
    return this._sizeGetter ? this._sizeGetter() : this._output.size;
};
Modifier.prototype.getProportions = function getProportions() {
    return this._proportionGetter ? this._proportionGetter() : this._output.proportions;
};
function _update() {
    if (this._transformGetter)
        this._output.transform = this._transformGetter();
    if (this._opacityGetter)
        this._output.opacity = this._opacityGetter();
    if (this._originGetter)
        this._output.origin = this._originGetter();
    if (this._alignGetter)
        this._output.align = this._alignGetter();
    if (this._sizeGetter)
        this._output.size = this._sizeGetter();
    if (this._proportionGetter)
        this._output.proportions = this._proportionGetter();
}
Modifier.prototype.modify = function modify(target) {
    _update.call(this);
    this._output.target = target;
    return this._output;
};
module.exports = Modifier;
},{"../transitions/Transitionable":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/Transitionable.js","../transitions/TransitionableTransform":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/TransitionableTransform.js","./Transform":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Transform.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/OptionsManager.js":[function(require,module,exports){
var EventHandler = require('./EventHandler');
function OptionsManager(value) {
    this._value = value;
    this.eventOutput = null;
}
OptionsManager.patch = function patchObject(source, data) {
    var manager = new OptionsManager(source);
    for (var i = 1; i < arguments.length; i++)
        manager.patch(arguments[i]);
    return source;
};
function _createEventOutput() {
    this.eventOutput = new EventHandler();
    this.eventOutput.bindThis(this);
    EventHandler.setOutputHandler(this, this.eventOutput);
}
OptionsManager.prototype.patch = function patch() {
    var myState = this._value;
    for (var i = 0; i < arguments.length; i++) {
        var data = arguments[i];
        for (var k in data) {
            if (k in myState && (data[k] && data[k].constructor === Object) && (myState[k] && myState[k].constructor === Object)) {
                if (!myState.hasOwnProperty(k))
                    myState[k] = Object.create(myState[k]);
                this.key(k).patch(data[k]);
                if (this.eventOutput)
                    this.eventOutput.emit('change', {
                        id: k,
                        value: this.key(k).value()
                    });
            } else
                this.set(k, data[k]);
        }
    }
    return this;
};
OptionsManager.prototype.setOptions = OptionsManager.prototype.patch;
OptionsManager.prototype.key = function key(identifier) {
    var result = new OptionsManager(this._value[identifier]);
    if (!(result._value instanceof Object) || result._value instanceof Array)
        result._value = {};
    return result;
};
OptionsManager.prototype.get = function get(key) {
    return key ? this._value[key] : this._value;
};
OptionsManager.prototype.getOptions = OptionsManager.prototype.get;
OptionsManager.prototype.set = function set(key, value) {
    var originalValue = this.get(key);
    this._value[key] = value;
    if (this.eventOutput && value !== originalValue)
        this.eventOutput.emit('change', {
            id: key,
            value: value
        });
    return this;
};
OptionsManager.prototype.on = function on() {
    _createEventOutput.call(this);
    return this.on.apply(this, arguments);
};
OptionsManager.prototype.removeListener = function removeListener() {
    _createEventOutput.call(this);
    return this.removeListener.apply(this, arguments);
};
OptionsManager.prototype.pipe = function pipe() {
    _createEventOutput.call(this);
    return this.pipe.apply(this, arguments);
};
OptionsManager.prototype.unpipe = function unpipe() {
    _createEventOutput.call(this);
    return this.unpipe.apply(this, arguments);
};
module.exports = OptionsManager;
},{"./EventHandler":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/EventHandler.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/RenderNode.js":[function(require,module,exports){
var Entity = require('./Entity');
var SpecParser = require('./SpecParser');
function RenderNode(object) {
    this._object = null;
    this._child = null;
    this._hasMultipleChildren = false;
    this._isRenderable = false;
    this._isModifier = false;
    this._resultCache = {};
    this._prevResults = {};
    this._childResult = null;
    if (object)
        this.set(object);
}
RenderNode.prototype.add = function add(child) {
    var childNode = child instanceof RenderNode ? child : new RenderNode(child);
    if (this._child instanceof Array)
        this._child.push(childNode);
    else if (this._child) {
        this._child = [
            this._child,
            childNode
        ];
        this._hasMultipleChildren = true;
        this._childResult = [];
    } else
        this._child = childNode;
    return childNode;
};
RenderNode.prototype.get = function get() {
    return this._object || (this._hasMultipleChildren ? null : this._child ? this._child.get() : null);
};
RenderNode.prototype.set = function set(child) {
    this._childResult = null;
    this._hasMultipleChildren = false;
    this._isRenderable = child.render ? true : false;
    this._isModifier = child.modify ? true : false;
    this._object = child;
    this._child = null;
    if (child instanceof RenderNode)
        return child;
    else
        return this;
};
RenderNode.prototype.getSize = function getSize() {
    var result = null;
    var target = this.get();
    if (target && target.getSize)
        result = target.getSize();
    if (!result && this._child && this._child.getSize)
        result = this._child.getSize();
    return result;
};
function _applyCommit(spec, context, cacheStorage) {
    var result = SpecParser.parse(spec, context);
    var keys = Object.keys(result);
    for (var i = 0; i < keys.length; i++) {
        var id = keys[i];
        var childNode = Entity.get(id);
        var commitParams = result[id];
        commitParams.allocator = context.allocator;
        var commitResult = childNode.commit(commitParams);
        if (commitResult)
            _applyCommit(commitResult, context, cacheStorage);
        else
            cacheStorage[id] = commitParams;
    }
}
RenderNode.prototype.commit = function commit(context) {
    var prevKeys = Object.keys(this._prevResults);
    for (var i = 0; i < prevKeys.length; i++) {
        var id = prevKeys[i];
        if (this._resultCache[id] === undefined) {
            var object = Entity.get(id);
            if (object.cleanup)
                object.cleanup(context.allocator);
        }
    }
    this._prevResults = this._resultCache;
    this._resultCache = {};
    _applyCommit(this.render(), context, this._resultCache);
};
RenderNode.prototype.render = function render() {
    if (this._isRenderable)
        return this._object.render();
    var result = null;
    if (this._hasMultipleChildren) {
        result = this._childResult;
        var children = this._child;
        for (var i = 0; i < children.length; i++) {
            result[i] = children[i].render();
        }
    } else if (this._child)
        result = this._child.render();
    return this._isModifier ? this._object.modify(result) : result;
};
module.exports = RenderNode;
},{"./Entity":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Entity.js","./SpecParser":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/SpecParser.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/SpecParser.js":[function(require,module,exports){
var Transform = require('./Transform');
function SpecParser() {
    this.result = {};
}
SpecParser._instance = new SpecParser();
SpecParser.parse = function parse(spec, context) {
    return SpecParser._instance.parse(spec, context);
};
SpecParser.prototype.parse = function parse(spec, context) {
    this.reset();
    this._parseSpec(spec, context, Transform.identity);
    return this.result;
};
SpecParser.prototype.reset = function reset() {
    this.result = {};
};
function _vecInContext(v, m) {
    return [
        v[0] * m[0] + v[1] * m[4] + v[2] * m[8],
        v[0] * m[1] + v[1] * m[5] + v[2] * m[9],
        v[0] * m[2] + v[1] * m[6] + v[2] * m[10]
    ];
}
var _zeroZero = [
        0,
        0
    ];
SpecParser.prototype._parseSpec = function _parseSpec(spec, parentContext, sizeContext) {
    var id;
    var target;
    var transform;
    var opacity;
    var origin;
    var align;
    var size;
    if (typeof spec === 'number') {
        id = spec;
        transform = parentContext.transform;
        align = parentContext.align || _zeroZero;
        if (parentContext.size && align && (align[0] || align[1])) {
            var alignAdjust = [
                    align[0] * parentContext.size[0],
                    align[1] * parentContext.size[1],
                    0
                ];
            transform = Transform.thenMove(transform, _vecInContext(alignAdjust, sizeContext));
        }
        this.result[id] = {
            transform: transform,
            opacity: parentContext.opacity,
            origin: parentContext.origin || _zeroZero,
            align: parentContext.align || _zeroZero,
            size: parentContext.size
        };
    } else if (!spec) {
        return;
    } else if (spec instanceof Array) {
        for (var i = 0; i < spec.length; i++) {
            this._parseSpec(spec[i], parentContext, sizeContext);
        }
    } else {
        target = spec.target;
        transform = parentContext.transform;
        opacity = parentContext.opacity;
        origin = parentContext.origin;
        align = parentContext.align;
        size = parentContext.size;
        var nextSizeContext = sizeContext;
        if (spec.opacity !== undefined)
            opacity = parentContext.opacity * spec.opacity;
        if (spec.transform)
            transform = Transform.multiply(parentContext.transform, spec.transform);
        if (spec.origin) {
            origin = spec.origin;
            nextSizeContext = parentContext.transform;
        }
        if (spec.align)
            align = spec.align;
        if (spec.size || spec.proportions) {
            var parentSize = size;
            size = [
                size[0],
                size[1]
            ];
            if (spec.size) {
                if (spec.size[0] !== undefined)
                    size[0] = spec.size[0];
                if (spec.size[1] !== undefined)
                    size[1] = spec.size[1];
            }
            if (spec.proportions) {
                if (spec.proportions[0] !== undefined)
                    size[0] = size[0] * spec.proportions[0];
                if (spec.proportions[1] !== undefined)
                    size[1] = size[1] * spec.proportions[1];
            }
            if (parentSize) {
                if (align && (align[0] || align[1]))
                    transform = Transform.thenMove(transform, _vecInContext([
                        align[0] * parentSize[0],
                        align[1] * parentSize[1],
                        0
                    ], sizeContext));
                if (origin && (origin[0] || origin[1]))
                    transform = Transform.moveThen([
                        -origin[0] * size[0],
                        -origin[1] * size[1],
                        0
                    ], transform);
            }
            nextSizeContext = parentContext.transform;
            origin = null;
            align = null;
        }
        this._parseSpec(target, {
            transform: transform,
            opacity: opacity,
            origin: origin,
            align: align,
            size: size
        }, nextSizeContext);
    }
};
module.exports = SpecParser;
},{"./Transform":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Transform.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Surface.js":[function(require,module,exports){
var ElementOutput = require('./ElementOutput');
function Surface(options) {
    ElementOutput.call(this);
    this.options = {};
    this.properties = {};
    this.attributes = {};
    this.content = '';
    this.classList = [];
    this.size = null;
    this._classesDirty = true;
    this._stylesDirty = true;
    this._attributesDirty = true;
    this._sizeDirty = true;
    this._contentDirty = true;
    this._trueSizeCheck = true;
    this._dirtyClasses = [];
    if (options)
        this.setOptions(options);
    this._currentTarget = null;
}
Surface.prototype = Object.create(ElementOutput.prototype);
Surface.prototype.constructor = Surface;
Surface.prototype.elementType = 'div';
Surface.prototype.elementClass = 'famous-surface';
Surface.prototype.setAttributes = function setAttributes(attributes) {
    for (var n in attributes) {
        if (n === 'style')
            throw new Error('Cannot set styles via "setAttributes" as it will break Famo.us.  Use "setProperties" instead.');
        this.attributes[n] = attributes[n];
    }
    this._attributesDirty = true;
};
Surface.prototype.getAttributes = function getAttributes() {
    return this.attributes;
};
Surface.prototype.setProperties = function setProperties(properties) {
    for (var n in properties) {
        this.properties[n] = properties[n];
    }
    this._stylesDirty = true;
    return this;
};
Surface.prototype.getProperties = function getProperties() {
    return this.properties;
};
Surface.prototype.addClass = function addClass(className) {
    if (this.classList.indexOf(className) < 0) {
        this.classList.push(className);
        this._classesDirty = true;
    }
    return this;
};
Surface.prototype.removeClass = function removeClass(className) {
    var i = this.classList.indexOf(className);
    if (i >= 0) {
        this._dirtyClasses.push(this.classList.splice(i, 1)[0]);
        this._classesDirty = true;
    }
    return this;
};
Surface.prototype.toggleClass = function toggleClass(className) {
    var i = this.classList.indexOf(className);
    if (i >= 0) {
        this.removeClass(className);
    } else {
        this.addClass(className);
    }
    return this;
};
Surface.prototype.setClasses = function setClasses(classList) {
    var i = 0;
    var removal = [];
    for (i = 0; i < this.classList.length; i++) {
        if (classList.indexOf(this.classList[i]) < 0)
            removal.push(this.classList[i]);
    }
    for (i = 0; i < removal.length; i++)
        this.removeClass(removal[i]);
    for (i = 0; i < classList.length; i++)
        this.addClass(classList[i]);
    return this;
};
Surface.prototype.getClassList = function getClassList() {
    return this.classList;
};
Surface.prototype.setContent = function setContent(content) {
    if (this.content !== content) {
        this.content = content;
        this._contentDirty = true;
    }
    return this;
};
Surface.prototype.getContent = function getContent() {
    return this.content;
};
Surface.prototype.setOptions = function setOptions(options) {
    if (options.size)
        this.setSize(options.size);
    if (options.classes)
        this.setClasses(options.classes);
    if (options.properties)
        this.setProperties(options.properties);
    if (options.attributes)
        this.setAttributes(options.attributes);
    if (options.content)
        this.setContent(options.content);
    return this;
};
function _cleanupClasses(target) {
    for (var i = 0; i < this._dirtyClasses.length; i++)
        target.classList.remove(this._dirtyClasses[i]);
    this._dirtyClasses = [];
}
function _applyStyles(target) {
    for (var n in this.properties) {
        target.style[n] = this.properties[n];
    }
}
function _cleanupStyles(target) {
    for (var n in this.properties) {
        target.style[n] = '';
    }
}
function _applyAttributes(target) {
    for (var n in this.attributes) {
        target.setAttribute(n, this.attributes[n]);
    }
}
function _cleanupAttributes(target) {
    for (var n in this.attributes) {
        target.removeAttribute(n);
    }
}
function _xyNotEquals(a, b) {
    return a && b ? a[0] !== b[0] || a[1] !== b[1] : a !== b;
}
Surface.prototype.setup = function setup(allocator) {
    var target = allocator.allocate(this.elementType);
    if (this.elementClass) {
        if (this.elementClass instanceof Array) {
            for (var i = 0; i < this.elementClass.length; i++) {
                target.classList.add(this.elementClass[i]);
            }
        } else {
            target.classList.add(this.elementClass);
        }
    }
    target.style.display = '';
    this.attach(target);
    this._opacity = null;
    this._currentTarget = target;
    this._stylesDirty = true;
    this._classesDirty = true;
    this._attributesDirty = true;
    this._sizeDirty = true;
    this._contentDirty = true;
    this._originDirty = true;
    this._transformDirty = true;
};
Surface.prototype.commit = function commit(context) {
    if (!this._currentTarget)
        this.setup(context.allocator);
    var target = this._currentTarget;
    var size = context.size;
    if (this._classesDirty) {
        _cleanupClasses.call(this, target);
        var classList = this.getClassList();
        for (var i = 0; i < classList.length; i++)
            target.classList.add(classList[i]);
        this._classesDirty = false;
        this._trueSizeCheck = true;
    }
    if (this._stylesDirty) {
        _applyStyles.call(this, target);
        this._stylesDirty = false;
        this._trueSizeCheck = true;
    }
    if (this._attributesDirty) {
        _applyAttributes.call(this, target);
        this._attributesDirty = false;
        this._trueSizeCheck = true;
    }
    if (this.size) {
        var origSize = context.size;
        size = [
            this.size[0],
            this.size[1]
        ];
        if (size[0] === undefined)
            size[0] = origSize[0];
        if (size[1] === undefined)
            size[1] = origSize[1];
        if (size[0] === true || size[1] === true) {
            if (size[0] === true && (this._trueSizeCheck || this._size[0] === 0)) {
                var width = target.offsetWidth;
                if (this._size && this._size[0] !== width) {
                    this._size[0] = width;
                    this._sizeDirty = true;
                }
                size[0] = width;
            } else {
                if (this._size)
                    size[0] = this._size[0];
            }
            if (size[1] === true && (this._trueSizeCheck || this._size[1] === 0)) {
                var height = target.offsetHeight;
                if (this._size && this._size[1] !== height) {
                    this._size[1] = height;
                    this._sizeDirty = true;
                }
                size[1] = height;
            } else {
                if (this._size)
                    size[1] = this._size[1];
            }
            this._trueSizeCheck = false;
        }
    }
    if (_xyNotEquals(this._size, size)) {
        if (!this._size)
            this._size = [
                0,
                0
            ];
        this._size[0] = size[0];
        this._size[1] = size[1];
        this._sizeDirty = true;
    }
    if (this._sizeDirty) {
        if (this._size) {
            target.style.width = this.size && this.size[0] === true ? '' : this._size[0] + 'px';
            target.style.height = this.size && this.size[1] === true ? '' : this._size[1] + 'px';
        }
        this._eventOutput.emit('resize');
    }
    if (this._contentDirty) {
        this.deploy(target);
        this._eventOutput.emit('deploy');
        this._contentDirty = false;
        this._trueSizeCheck = true;
    }
    ElementOutput.prototype.commit.call(this, context);
};
Surface.prototype.cleanup = function cleanup(allocator) {
    var i = 0;
    var target = this._currentTarget;
    this._eventOutput.emit('recall');
    this.recall(target);
    target.style.display = 'none';
    target.style.opacity = '';
    target.style.width = '';
    target.style.height = '';
    _cleanupStyles.call(this, target);
    _cleanupAttributes.call(this, target);
    var classList = this.getClassList();
    _cleanupClasses.call(this, target);
    for (i = 0; i < classList.length; i++)
        target.classList.remove(classList[i]);
    if (this.elementClass) {
        if (this.elementClass instanceof Array) {
            for (i = 0; i < this.elementClass.length; i++) {
                target.classList.remove(this.elementClass[i]);
            }
        } else {
            target.classList.remove(this.elementClass);
        }
    }
    this.detach(target);
    this._currentTarget = null;
    allocator.deallocate(target);
};
Surface.prototype.deploy = function deploy(target) {
    var content = this.getContent();
    if (content instanceof Node) {
        while (target.hasChildNodes())
            target.removeChild(target.firstChild);
        target.appendChild(content);
    } else
        target.innerHTML = content;
};
Surface.prototype.recall = function recall(target) {
    var df = document.createDocumentFragment();
    while (target.hasChildNodes())
        df.appendChild(target.firstChild);
    this.setContent(df);
};
Surface.prototype.getSize = function getSize() {
    return this._size ? this._size : this.size;
};
Surface.prototype.setSize = function setSize(size) {
    this.size = size ? [
        size[0],
        size[1]
    ] : null;
    this._sizeDirty = true;
    return this;
};
module.exports = Surface;
},{"./ElementOutput":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/ElementOutput.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Transform.js":[function(require,module,exports){
var Transform = {};
Transform.precision = 0.000001;
Transform.identity = [
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1
];
Transform.multiply4x4 = function multiply4x4(a, b) {
    return [
        a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3],
        a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3],
        a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3],
        a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3],
        a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7],
        a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7],
        a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7],
        a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7],
        a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11],
        a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11],
        a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11],
        a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11],
        a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15],
        a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15],
        a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15],
        a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15]
    ];
};
Transform.multiply = function multiply(a, b) {
    return [
        a[0] * b[0] + a[4] * b[1] + a[8] * b[2],
        a[1] * b[0] + a[5] * b[1] + a[9] * b[2],
        a[2] * b[0] + a[6] * b[1] + a[10] * b[2],
        0,
        a[0] * b[4] + a[4] * b[5] + a[8] * b[6],
        a[1] * b[4] + a[5] * b[5] + a[9] * b[6],
        a[2] * b[4] + a[6] * b[5] + a[10] * b[6],
        0,
        a[0] * b[8] + a[4] * b[9] + a[8] * b[10],
        a[1] * b[8] + a[5] * b[9] + a[9] * b[10],
        a[2] * b[8] + a[6] * b[9] + a[10] * b[10],
        0,
        a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12],
        a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13],
        a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14],
        1
    ];
};
Transform.thenMove = function thenMove(m, t) {
    if (!t[2])
        t[2] = 0;
    return [
        m[0],
        m[1],
        m[2],
        0,
        m[4],
        m[5],
        m[6],
        0,
        m[8],
        m[9],
        m[10],
        0,
        m[12] + t[0],
        m[13] + t[1],
        m[14] + t[2],
        1
    ];
};
Transform.moveThen = function moveThen(v, m) {
    if (!v[2])
        v[2] = 0;
    var t0 = v[0] * m[0] + v[1] * m[4] + v[2] * m[8];
    var t1 = v[0] * m[1] + v[1] * m[5] + v[2] * m[9];
    var t2 = v[0] * m[2] + v[1] * m[6] + v[2] * m[10];
    return Transform.thenMove(m, [
        t0,
        t1,
        t2
    ]);
};
Transform.translate = function translate(x, y, z) {
    if (z === undefined)
        z = 0;
    return [
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        x,
        y,
        z,
        1
    ];
};
Transform.thenScale = function thenScale(m, s) {
    return [
        s[0] * m[0],
        s[1] * m[1],
        s[2] * m[2],
        0,
        s[0] * m[4],
        s[1] * m[5],
        s[2] * m[6],
        0,
        s[0] * m[8],
        s[1] * m[9],
        s[2] * m[10],
        0,
        s[0] * m[12],
        s[1] * m[13],
        s[2] * m[14],
        1
    ];
};
Transform.scale = function scale(x, y, z) {
    if (z === undefined)
        z = 1;
    if (y === undefined)
        y = x;
    return [
        x,
        0,
        0,
        0,
        0,
        y,
        0,
        0,
        0,
        0,
        z,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.rotateX = function rotateX(theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return [
        1,
        0,
        0,
        0,
        0,
        cosTheta,
        sinTheta,
        0,
        0,
        -sinTheta,
        cosTheta,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.rotateY = function rotateY(theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return [
        cosTheta,
        0,
        -sinTheta,
        0,
        0,
        1,
        0,
        0,
        sinTheta,
        0,
        cosTheta,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.rotateZ = function rotateZ(theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return [
        cosTheta,
        sinTheta,
        0,
        0,
        -sinTheta,
        cosTheta,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.rotate = function rotate(phi, theta, psi) {
    var cosPhi = Math.cos(phi);
    var sinPhi = Math.sin(phi);
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    var cosPsi = Math.cos(psi);
    var sinPsi = Math.sin(psi);
    var result = [
            cosTheta * cosPsi,
            cosPhi * sinPsi + sinPhi * sinTheta * cosPsi,
            sinPhi * sinPsi - cosPhi * sinTheta * cosPsi,
            0,
            -cosTheta * sinPsi,
            cosPhi * cosPsi - sinPhi * sinTheta * sinPsi,
            sinPhi * cosPsi + cosPhi * sinTheta * sinPsi,
            0,
            sinTheta,
            -sinPhi * cosTheta,
            cosPhi * cosTheta,
            0,
            0,
            0,
            0,
            1
        ];
    return result;
};
Transform.rotateAxis = function rotateAxis(v, theta) {
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    var verTheta = 1 - cosTheta;
    var xxV = v[0] * v[0] * verTheta;
    var xyV = v[0] * v[1] * verTheta;
    var xzV = v[0] * v[2] * verTheta;
    var yyV = v[1] * v[1] * verTheta;
    var yzV = v[1] * v[2] * verTheta;
    var zzV = v[2] * v[2] * verTheta;
    var xs = v[0] * sinTheta;
    var ys = v[1] * sinTheta;
    var zs = v[2] * sinTheta;
    var result = [
            xxV + cosTheta,
            xyV + zs,
            xzV - ys,
            0,
            xyV - zs,
            yyV + cosTheta,
            yzV + xs,
            0,
            xzV + ys,
            yzV - xs,
            zzV + cosTheta,
            0,
            0,
            0,
            0,
            1
        ];
    return result;
};
Transform.aboutOrigin = function aboutOrigin(v, m) {
    var t0 = v[0] - (v[0] * m[0] + v[1] * m[4] + v[2] * m[8]);
    var t1 = v[1] - (v[0] * m[1] + v[1] * m[5] + v[2] * m[9]);
    var t2 = v[2] - (v[0] * m[2] + v[1] * m[6] + v[2] * m[10]);
    return Transform.thenMove(m, [
        t0,
        t1,
        t2
    ]);
};
Transform.skew = function skew(phi, theta, psi) {
    return [
        1,
        Math.tan(theta),
        0,
        0,
        Math.tan(psi),
        1,
        0,
        0,
        0,
        Math.tan(phi),
        1,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.skewX = function skewX(angle) {
    return [
        1,
        0,
        0,
        0,
        Math.tan(angle),
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.skewY = function skewY(angle) {
    return [
        1,
        Math.tan(angle),
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.perspective = function perspective(focusZ) {
    return [
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        -1 / focusZ,
        0,
        0,
        0,
        1
    ];
};
Transform.getTranslate = function getTranslate(m) {
    return [
        m[12],
        m[13],
        m[14]
    ];
};
Transform.inverse = function inverse(m) {
    var c0 = m[5] * m[10] - m[6] * m[9];
    var c1 = m[4] * m[10] - m[6] * m[8];
    var c2 = m[4] * m[9] - m[5] * m[8];
    var c4 = m[1] * m[10] - m[2] * m[9];
    var c5 = m[0] * m[10] - m[2] * m[8];
    var c6 = m[0] * m[9] - m[1] * m[8];
    var c8 = m[1] * m[6] - m[2] * m[5];
    var c9 = m[0] * m[6] - m[2] * m[4];
    var c10 = m[0] * m[5] - m[1] * m[4];
    var detM = m[0] * c0 - m[1] * c1 + m[2] * c2;
    var invD = 1 / detM;
    var result = [
            invD * c0,
            -invD * c4,
            invD * c8,
            0,
            -invD * c1,
            invD * c5,
            -invD * c9,
            0,
            invD * c2,
            -invD * c6,
            invD * c10,
            0,
            0,
            0,
            0,
            1
        ];
    result[12] = -m[12] * result[0] - m[13] * result[4] - m[14] * result[8];
    result[13] = -m[12] * result[1] - m[13] * result[5] - m[14] * result[9];
    result[14] = -m[12] * result[2] - m[13] * result[6] - m[14] * result[10];
    return result;
};
Transform.transpose = function transpose(m) {
    return [
        m[0],
        m[4],
        m[8],
        m[12],
        m[1],
        m[5],
        m[9],
        m[13],
        m[2],
        m[6],
        m[10],
        m[14],
        m[3],
        m[7],
        m[11],
        m[15]
    ];
};
function _normSquared(v) {
    return v.length === 2 ? v[0] * v[0] + v[1] * v[1] : v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
}
function _norm(v) {
    return Math.sqrt(_normSquared(v));
}
function _sign(n) {
    return n < 0 ? -1 : 1;
}
Transform.interpret = function interpret(M) {
    var x = [
            M[0],
            M[1],
            M[2]
        ];
    var sgn = _sign(x[0]);
    var xNorm = _norm(x);
    var v = [
            x[0] + sgn * xNorm,
            x[1],
            x[2]
        ];
    var mult = 2 / _normSquared(v);
    if (mult >= Infinity) {
        return {
            translate: Transform.getTranslate(M),
            rotate: [
                0,
                0,
                0
            ],
            scale: [
                0,
                0,
                0
            ],
            skew: [
                0,
                0,
                0
            ]
        };
    }
    var Q1 = [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1
        ];
    Q1[0] = 1 - mult * v[0] * v[0];
    Q1[5] = 1 - mult * v[1] * v[1];
    Q1[10] = 1 - mult * v[2] * v[2];
    Q1[1] = -mult * v[0] * v[1];
    Q1[2] = -mult * v[0] * v[2];
    Q1[6] = -mult * v[1] * v[2];
    Q1[4] = Q1[1];
    Q1[8] = Q1[2];
    Q1[9] = Q1[6];
    var MQ1 = Transform.multiply(Q1, M);
    var x2 = [
            MQ1[5],
            MQ1[6]
        ];
    var sgn2 = _sign(x2[0]);
    var x2Norm = _norm(x2);
    var v2 = [
            x2[0] + sgn2 * x2Norm,
            x2[1]
        ];
    var mult2 = 2 / _normSquared(v2);
    var Q2 = [
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1
        ];
    Q2[5] = 1 - mult2 * v2[0] * v2[0];
    Q2[10] = 1 - mult2 * v2[1] * v2[1];
    Q2[6] = -mult2 * v2[0] * v2[1];
    Q2[9] = Q2[6];
    var Q = Transform.multiply(Q2, Q1);
    var R = Transform.multiply(Q, M);
    var remover = Transform.scale(R[0] < 0 ? -1 : 1, R[5] < 0 ? -1 : 1, R[10] < 0 ? -1 : 1);
    R = Transform.multiply(R, remover);
    Q = Transform.multiply(remover, Q);
    var result = {};
    result.translate = Transform.getTranslate(M);
    result.rotate = [
        Math.atan2(-Q[6], Q[10]),
        Math.asin(Q[2]),
        Math.atan2(-Q[1], Q[0])
    ];
    if (!result.rotate[0]) {
        result.rotate[0] = 0;
        result.rotate[2] = Math.atan2(Q[4], Q[5]);
    }
    result.scale = [
        R[0],
        R[5],
        R[10]
    ];
    result.skew = [
        Math.atan2(R[9], result.scale[2]),
        Math.atan2(R[8], result.scale[2]),
        Math.atan2(R[4], result.scale[0])
    ];
    if (Math.abs(result.rotate[0]) + Math.abs(result.rotate[2]) > 1.5 * Math.PI) {
        result.rotate[1] = Math.PI - result.rotate[1];
        if (result.rotate[1] > Math.PI)
            result.rotate[1] -= 2 * Math.PI;
        if (result.rotate[1] < -Math.PI)
            result.rotate[1] += 2 * Math.PI;
        if (result.rotate[0] < 0)
            result.rotate[0] += Math.PI;
        else
            result.rotate[0] -= Math.PI;
        if (result.rotate[2] < 0)
            result.rotate[2] += Math.PI;
        else
            result.rotate[2] -= Math.PI;
    }
    return result;
};
Transform.average = function average(M1, M2, t) {
    t = t === undefined ? 0.5 : t;
    var specM1 = Transform.interpret(M1);
    var specM2 = Transform.interpret(M2);
    var specAvg = {
            translate: [
                0,
                0,
                0
            ],
            rotate: [
                0,
                0,
                0
            ],
            scale: [
                0,
                0,
                0
            ],
            skew: [
                0,
                0,
                0
            ]
        };
    for (var i = 0; i < 3; i++) {
        specAvg.translate[i] = (1 - t) * specM1.translate[i] + t * specM2.translate[i];
        specAvg.rotate[i] = (1 - t) * specM1.rotate[i] + t * specM2.rotate[i];
        specAvg.scale[i] = (1 - t) * specM1.scale[i] + t * specM2.scale[i];
        specAvg.skew[i] = (1 - t) * specM1.skew[i] + t * specM2.skew[i];
    }
    return Transform.build(specAvg);
};
Transform.build = function build(spec) {
    var scaleMatrix = Transform.scale(spec.scale[0], spec.scale[1], spec.scale[2]);
    var skewMatrix = Transform.skew(spec.skew[0], spec.skew[1], spec.skew[2]);
    var rotateMatrix = Transform.rotate(spec.rotate[0], spec.rotate[1], spec.rotate[2]);
    return Transform.thenMove(Transform.multiply(Transform.multiply(rotateMatrix, skewMatrix), scaleMatrix), spec.translate);
};
Transform.equals = function equals(a, b) {
    return !Transform.notEquals(a, b);
};
Transform.notEquals = function notEquals(a, b) {
    if (a === b)
        return false;
    return !(a && b) || a[12] !== b[12] || a[13] !== b[13] || a[14] !== b[14] || a[0] !== b[0] || a[1] !== b[1] || a[2] !== b[2] || a[4] !== b[4] || a[5] !== b[5] || a[6] !== b[6] || a[8] !== b[8] || a[9] !== b[9] || a[10] !== b[10];
};
Transform.normalizeRotation = function normalizeRotation(rotation) {
    var result = rotation.slice(0);
    if (result[0] === Math.PI * 0.5 || result[0] === -Math.PI * 0.5) {
        result[0] = -result[0];
        result[1] = Math.PI - result[1];
        result[2] -= Math.PI;
    }
    if (result[0] > Math.PI * 0.5) {
        result[0] = result[0] - Math.PI;
        result[1] = Math.PI - result[1];
        result[2] -= Math.PI;
    }
    if (result[0] < -Math.PI * 0.5) {
        result[0] = result[0] + Math.PI;
        result[1] = -Math.PI - result[1];
        result[2] -= Math.PI;
    }
    while (result[1] < -Math.PI)
        result[1] += 2 * Math.PI;
    while (result[1] >= Math.PI)
        result[1] -= 2 * Math.PI;
    while (result[2] < -Math.PI)
        result[2] += 2 * Math.PI;
    while (result[2] >= Math.PI)
        result[2] -= 2 * Math.PI;
    return result;
};
Transform.inFront = [
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0.001,
    1
];
Transform.behind = [
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    -0.001,
    1
];
module.exports = Transform;
},{}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/famous.css":[function(require,module,exports){
var css = "/* This Source Code Form is subject to the terms of the Mozilla Public\n * License, v. 2.0. If a copy of the MPL was not distributed with this\n * file, You can obtain one at http://mozilla.org/MPL/2.0/.\n *\n * Owner: mark@famo.us\n * @license MPL 2.0\n * @copyright Famous Industries, Inc. 2014\n */\n\n.famous-root {\n    width: 100%;\n    height: 100%;\n    margin: 0px;\n    padding: 0px;\n    overflow: hidden;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n}\n\n.famous-container, .famous-group {\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    bottom: 0px;\n    right: 0px;\n    overflow: visible;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-backface-visibility: visible;\n    backface-visibility: visible;\n    pointer-events: none;\n}\n\n.famous-group {\n    width: 0px;\n    height: 0px;\n    margin: 0px;\n    padding: 0px;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n}\n\n.famous-surface {\n    position: absolute;\n    -webkit-transform-origin: center center;\n    transform-origin: center center;\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    -webkit-tap-highlight-color: transparent;\n    pointer-events: auto;\n}\n\n.famous-container-group {\n    position: relative;\n    width: 100%;\n    height: 100%;\n}\n"; (require("/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/cssify"))(css); module.exports = css;
},{"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/cssify":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/cssify/browser.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/surfaces/ImageSurface.js":[function(require,module,exports){
var Surface = require('../core/Surface');
function ImageSurface(options) {
    this._imageUrl = undefined;
    Surface.apply(this, arguments);
}
var urlCache = [];
var countCache = [];
var nodeCache = [];
var cacheEnabled = true;
ImageSurface.enableCache = function enableCache() {
    cacheEnabled = true;
};
ImageSurface.disableCache = function disableCache() {
    cacheEnabled = false;
};
ImageSurface.clearCache = function clearCache() {
    urlCache = [];
    countCache = [];
    nodeCache = [];
};
ImageSurface.getCache = function getCache() {
    return {
        urlCache: urlCache,
        countCache: countCache,
        nodeCache: countCache
    };
};
ImageSurface.prototype = Object.create(Surface.prototype);
ImageSurface.prototype.constructor = ImageSurface;
ImageSurface.prototype.elementType = 'img';
ImageSurface.prototype.elementClass = 'famous-surface';
ImageSurface.prototype.setContent = function setContent(imageUrl) {
    var urlIndex = urlCache.indexOf(this._imageUrl);
    if (urlIndex !== -1) {
        if (countCache[urlIndex] === 1) {
            urlCache.splice(urlIndex, 1);
            countCache.splice(urlIndex, 1);
            nodeCache.splice(urlIndex, 1);
        } else {
            countCache[urlIndex]--;
        }
    }
    urlIndex = urlCache.indexOf(imageUrl);
    if (urlIndex === -1) {
        urlCache.push(imageUrl);
        countCache.push(1);
    } else {
        countCache[urlIndex]++;
    }
    this._imageUrl = imageUrl;
    this._contentDirty = true;
};
ImageSurface.prototype.deploy = function deploy(target) {
    var urlIndex = urlCache.indexOf(this._imageUrl);
    if (nodeCache[urlIndex] === undefined && cacheEnabled) {
        var img = new Image();
        img.src = this._imageUrl || '';
        nodeCache[urlIndex] = img;
    }
    target.src = this._imageUrl || '';
};
ImageSurface.prototype.recall = function recall(target) {
    target.src = '';
};
module.exports = ImageSurface;
},{"../core/Surface":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Surface.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/MultipleTransition.js":[function(require,module,exports){
var Utility = require('../utilities/Utility');
function MultipleTransition(method) {
    this.method = method;
    this._instances = [];
    this.state = [];
}
MultipleTransition.SUPPORTS_MULTIPLE = true;
MultipleTransition.prototype.get = function get() {
    for (var i = 0; i < this._instances.length; i++) {
        this.state[i] = this._instances[i].get();
    }
    return this.state;
};
MultipleTransition.prototype.set = function set(endState, transition, callback) {
    var _allCallback = Utility.after(endState.length, callback);
    for (var i = 0; i < endState.length; i++) {
        if (!this._instances[i])
            this._instances[i] = new this.method();
        this._instances[i].set(endState[i], transition, _allCallback);
    }
};
MultipleTransition.prototype.reset = function reset(startState) {
    for (var i = 0; i < startState.length; i++) {
        if (!this._instances[i])
            this._instances[i] = new this.method();
        this._instances[i].reset(startState[i]);
    }
};
module.exports = MultipleTransition;
},{"../utilities/Utility":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/utilities/Utility.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/Transitionable.js":[function(require,module,exports){
var MultipleTransition = require('./MultipleTransition');
var TweenTransition = require('./TweenTransition');
function Transitionable(start) {
    this.currentAction = null;
    this.actionQueue = [];
    this.callbackQueue = [];
    this.state = 0;
    this.velocity = undefined;
    this._callback = undefined;
    this._engineInstance = null;
    this._currentMethod = null;
    this.set(start);
}
var transitionMethods = {};
Transitionable.register = function register(methods) {
    var success = true;
    for (var method in methods) {
        if (!Transitionable.registerMethod(method, methods[method]))
            success = false;
    }
    return success;
};
Transitionable.registerMethod = function registerMethod(name, engineClass) {
    if (!(name in transitionMethods)) {
        transitionMethods[name] = engineClass;
        return true;
    } else
        return false;
};
Transitionable.unregisterMethod = function unregisterMethod(name) {
    if (name in transitionMethods) {
        delete transitionMethods[name];
        return true;
    } else
        return false;
};
function _loadNext() {
    if (this._callback) {
        var callback = this._callback;
        this._callback = undefined;
        callback();
    }
    if (this.actionQueue.length <= 0) {
        this.set(this.get());
        return;
    }
    this.currentAction = this.actionQueue.shift();
    this._callback = this.callbackQueue.shift();
    var method = null;
    var endValue = this.currentAction[0];
    var transition = this.currentAction[1];
    if (transition instanceof Object && transition.method) {
        method = transition.method;
        if (typeof method === 'string')
            method = transitionMethods[method];
    } else {
        method = TweenTransition;
    }
    if (this._currentMethod !== method) {
        if (!(endValue instanceof Object) || method.SUPPORTS_MULTIPLE === true || endValue.length <= method.SUPPORTS_MULTIPLE) {
            this._engineInstance = new method();
        } else {
            this._engineInstance = new MultipleTransition(method);
        }
        this._currentMethod = method;
    }
    this._engineInstance.reset(this.state, this.velocity);
    if (this.velocity !== undefined)
        transition.velocity = this.velocity;
    this._engineInstance.set(endValue, transition, _loadNext.bind(this));
}
Transitionable.prototype.set = function set(endState, transition, callback) {
    if (!transition) {
        this.reset(endState);
        if (callback)
            callback();
        return this;
    }
    var action = [
            endState,
            transition
        ];
    this.actionQueue.push(action);
    this.callbackQueue.push(callback);
    if (!this.currentAction)
        _loadNext.call(this);
    return this;
};
Transitionable.prototype.reset = function reset(startState, startVelocity) {
    this._currentMethod = null;
    this._engineInstance = null;
    this._callback = undefined;
    this.state = startState;
    this.velocity = startVelocity;
    this.currentAction = null;
    this.actionQueue = [];
    this.callbackQueue = [];
};
Transitionable.prototype.delay = function delay(duration, callback) {
    this.set(this.get(), {
        duration: duration,
        curve: function () {
            return 0;
        }
    }, callback);
};
Transitionable.prototype.get = function get(timestamp) {
    if (this._engineInstance) {
        if (this._engineInstance.getVelocity)
            this.velocity = this._engineInstance.getVelocity();
        this.state = this._engineInstance.get(timestamp);
    }
    return this.state;
};
Transitionable.prototype.isActive = function isActive() {
    return !!this.currentAction;
};
Transitionable.prototype.halt = function halt() {
    return this.set(this.get());
};
module.exports = Transitionable;
},{"./MultipleTransition":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/MultipleTransition.js","./TweenTransition":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/TweenTransition.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/TransitionableTransform.js":[function(require,module,exports){
var Transitionable = require('./Transitionable');
var Transform = require('../core/Transform');
var Utility = require('../utilities/Utility');
function TransitionableTransform(transform) {
    this._final = Transform.identity.slice();
    this._finalTranslate = [
        0,
        0,
        0
    ];
    this._finalRotate = [
        0,
        0,
        0
    ];
    this._finalSkew = [
        0,
        0,
        0
    ];
    this._finalScale = [
        1,
        1,
        1
    ];
    this.translate = new Transitionable(this._finalTranslate);
    this.rotate = new Transitionable(this._finalRotate);
    this.skew = new Transitionable(this._finalSkew);
    this.scale = new Transitionable(this._finalScale);
    if (transform)
        this.set(transform);
}
function _build() {
    return Transform.build({
        translate: this.translate.get(),
        rotate: this.rotate.get(),
        skew: this.skew.get(),
        scale: this.scale.get()
    });
}
function _buildFinal() {
    return Transform.build({
        translate: this._finalTranslate,
        rotate: this._finalRotate,
        skew: this._finalSkew,
        scale: this._finalScale
    });
}
TransitionableTransform.prototype.setTranslate = function setTranslate(translate, transition, callback) {
    this._finalTranslate = translate;
    this._final = _buildFinal.call(this);
    this.translate.set(translate, transition, callback);
    return this;
};
TransitionableTransform.prototype.setScale = function setScale(scale, transition, callback) {
    this._finalScale = scale;
    this._final = _buildFinal.call(this);
    this.scale.set(scale, transition, callback);
    return this;
};
TransitionableTransform.prototype.setRotate = function setRotate(eulerAngles, transition, callback) {
    this._finalRotate = eulerAngles;
    this._final = _buildFinal.call(this);
    this.rotate.set(eulerAngles, transition, callback);
    return this;
};
TransitionableTransform.prototype.setSkew = function setSkew(skewAngles, transition, callback) {
    this._finalSkew = skewAngles;
    this._final = _buildFinal.call(this);
    this.skew.set(skewAngles, transition, callback);
    return this;
};
TransitionableTransform.prototype.set = function set(transform, transition, callback) {
    var components = Transform.interpret(transform);
    this._finalTranslate = components.translate;
    this._finalRotate = components.rotate;
    this._finalSkew = components.skew;
    this._finalScale = components.scale;
    this._final = transform;
    var _callback = callback ? Utility.after(4, callback) : null;
    this.translate.set(components.translate, transition, _callback);
    this.rotate.set(components.rotate, transition, _callback);
    this.skew.set(components.skew, transition, _callback);
    this.scale.set(components.scale, transition, _callback);
    return this;
};
TransitionableTransform.prototype.setDefaultTransition = function setDefaultTransition(transition) {
    this.translate.setDefault(transition);
    this.rotate.setDefault(transition);
    this.skew.setDefault(transition);
    this.scale.setDefault(transition);
};
TransitionableTransform.prototype.get = function get() {
    if (this.isActive()) {
        return _build.call(this);
    } else
        return this._final;
};
TransitionableTransform.prototype.getFinal = function getFinal() {
    return this._final;
};
TransitionableTransform.prototype.isActive = function isActive() {
    return this.translate.isActive() || this.rotate.isActive() || this.scale.isActive() || this.skew.isActive();
};
TransitionableTransform.prototype.halt = function halt() {
    this.translate.halt();
    this.rotate.halt();
    this.skew.halt();
    this.scale.halt();
    this._final = this.get();
    this._finalTranslate = this.translate.get();
    this._finalRotate = this.rotate.get();
    this._finalSkew = this.skew.get();
    this._finalScale = this.scale.get();
    return this;
};
module.exports = TransitionableTransform;
},{"../core/Transform":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Transform.js","../utilities/Utility":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/utilities/Utility.js","./Transitionable":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/Transitionable.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/transitions/TweenTransition.js":[function(require,module,exports){
function TweenTransition(options) {
    this.options = Object.create(TweenTransition.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this._startTime = 0;
    this._startValue = 0;
    this._updateTime = 0;
    this._endValue = 0;
    this._curve = undefined;
    this._duration = 0;
    this._active = false;
    this._callback = undefined;
    this.state = 0;
    this.velocity = undefined;
}
TweenTransition.Curves = {
    linear: function (t) {
        return t;
    },
    easeIn: function (t) {
        return t * t;
    },
    easeOut: function (t) {
        return t * (2 - t);
    },
    easeInOut: function (t) {
        if (t <= 0.5)
            return 2 * t * t;
        else
            return -2 * t * t + 4 * t - 1;
    },
    easeOutBounce: function (t) {
        return t * (3 - 2 * t);
    },
    spring: function (t) {
        return (1 - t) * Math.sin(6 * Math.PI * t) + t;
    }
};
TweenTransition.SUPPORTS_MULTIPLE = true;
TweenTransition.DEFAULT_OPTIONS = {
    curve: TweenTransition.Curves.linear,
    duration: 500,
    speed: 0
};
var registeredCurves = {};
TweenTransition.registerCurve = function registerCurve(curveName, curve) {
    if (!registeredCurves[curveName]) {
        registeredCurves[curveName] = curve;
        return true;
    } else {
        return false;
    }
};
TweenTransition.unregisterCurve = function unregisterCurve(curveName) {
    if (registeredCurves[curveName]) {
        delete registeredCurves[curveName];
        return true;
    } else {
        return false;
    }
};
TweenTransition.getCurve = function getCurve(curveName) {
    var curve = registeredCurves[curveName];
    if (curve !== undefined)
        return curve;
    else
        throw new Error('curve not registered');
};
TweenTransition.getCurves = function getCurves() {
    return registeredCurves;
};
function _interpolate(a, b, t) {
    return (1 - t) * a + t * b;
}
function _clone(obj) {
    if (obj instanceof Object) {
        if (obj instanceof Array)
            return obj.slice(0);
        else
            return Object.create(obj);
    } else
        return obj;
}
function _normalize(transition, defaultTransition) {
    var result = { curve: defaultTransition.curve };
    if (defaultTransition.duration)
        result.duration = defaultTransition.duration;
    if (defaultTransition.speed)
        result.speed = defaultTransition.speed;
    if (transition instanceof Object) {
        if (transition.duration !== undefined)
            result.duration = transition.duration;
        if (transition.curve)
            result.curve = transition.curve;
        if (transition.speed)
            result.speed = transition.speed;
    }
    if (typeof result.curve === 'string')
        result.curve = TweenTransition.getCurve(result.curve);
    return result;
}
TweenTransition.prototype.setOptions = function setOptions(options) {
    if (options.curve !== undefined)
        this.options.curve = options.curve;
    if (options.duration !== undefined)
        this.options.duration = options.duration;
    if (options.speed !== undefined)
        this.options.speed = options.speed;
};
TweenTransition.prototype.set = function set(endValue, transition, callback) {
    if (!transition) {
        this.reset(endValue);
        if (callback)
            callback();
        return;
    }
    this._startValue = _clone(this.get());
    transition = _normalize(transition, this.options);
    if (transition.speed) {
        var startValue = this._startValue;
        if (startValue instanceof Object) {
            var variance = 0;
            for (var i in startValue)
                variance += (endValue[i] - startValue[i]) * (endValue[i] - startValue[i]);
            transition.duration = Math.sqrt(variance) / transition.speed;
        } else {
            transition.duration = Math.abs(endValue - startValue) / transition.speed;
        }
    }
    this._startTime = Date.now();
    this._endValue = _clone(endValue);
    this._startVelocity = _clone(transition.velocity);
    this._duration = transition.duration;
    this._curve = transition.curve;
    this._active = true;
    this._callback = callback;
};
TweenTransition.prototype.reset = function reset(startValue, startVelocity) {
    if (this._callback) {
        var callback = this._callback;
        this._callback = undefined;
        callback();
    }
    this.state = _clone(startValue);
    this.velocity = _clone(startVelocity);
    this._startTime = 0;
    this._duration = 0;
    this._updateTime = 0;
    this._startValue = this.state;
    this._startVelocity = this.velocity;
    this._endValue = this.state;
    this._active = false;
};
TweenTransition.prototype.getVelocity = function getVelocity() {
    return this.velocity;
};
TweenTransition.prototype.get = function get(timestamp) {
    this.update(timestamp);
    return this.state;
};
function _calculateVelocity(current, start, curve, duration, t) {
    var velocity;
    var eps = 1e-7;
    var speed = (curve(t) - curve(t - eps)) / eps;
    if (current instanceof Array) {
        velocity = [];
        for (var i = 0; i < current.length; i++) {
            if (typeof current[i] === 'number')
                velocity[i] = speed * (current[i] - start[i]) / duration;
            else
                velocity[i] = 0;
        }
    } else
        velocity = speed * (current - start) / duration;
    return velocity;
}
function _calculateState(start, end, t) {
    var state;
    if (start instanceof Array) {
        state = [];
        for (var i = 0; i < start.length; i++) {
            if (typeof start[i] === 'number')
                state[i] = _interpolate(start[i], end[i], t);
            else
                state[i] = start[i];
        }
    } else
        state = _interpolate(start, end, t);
    return state;
}
TweenTransition.prototype.update = function update(timestamp) {
    if (!this._active) {
        if (this._callback) {
            var callback = this._callback;
            this._callback = undefined;
            callback();
        }
        return;
    }
    if (!timestamp)
        timestamp = Date.now();
    if (this._updateTime >= timestamp)
        return;
    this._updateTime = timestamp;
    var timeSinceStart = timestamp - this._startTime;
    if (timeSinceStart >= this._duration) {
        this.state = this._endValue;
        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, 1);
        this._active = false;
    } else if (timeSinceStart < 0) {
        this.state = this._startValue;
        this.velocity = this._startVelocity;
    } else {
        var t = timeSinceStart / this._duration;
        this.state = _calculateState(this._startValue, this._endValue, this._curve(t));
        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, t);
    }
};
TweenTransition.prototype.isActive = function isActive() {
    return this._active;
};
TweenTransition.prototype.halt = function halt() {
    this.reset(this.get());
};
TweenTransition.registerCurve('linear', TweenTransition.Curves.linear);
TweenTransition.registerCurve('easeIn', TweenTransition.Curves.easeIn);
TweenTransition.registerCurve('easeOut', TweenTransition.Curves.easeOut);
TweenTransition.registerCurve('easeInOut', TweenTransition.Curves.easeInOut);
TweenTransition.registerCurve('easeOutBounce', TweenTransition.Curves.easeOutBounce);
TweenTransition.registerCurve('spring', TweenTransition.Curves.spring);
TweenTransition.customCurve = function customCurve(v1, v2) {
    v1 = v1 || 0;
    v2 = v2 || 0;
    return function (t) {
        return v1 * t + (-2 * v1 - v2 + 3) * t * t + (v1 + v2 - 2) * t * t * t;
    };
};
module.exports = TweenTransition;
},{}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/utilities/Utility.js":[function(require,module,exports){
var Utility = {};
Utility.Direction = {
    X: 0,
    Y: 1,
    Z: 2
};
Utility.after = function after(count, callback) {
    var counter = count;
    return function () {
        counter--;
        if (counter === 0)
            callback.apply(this, arguments);
    };
};
Utility.loadURL = function loadURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function onreadystatechange() {
        if (this.readyState === 4) {
            if (callback)
                callback(this.responseText);
        }
    };
    xhr.open('GET', url);
    xhr.send();
};
Utility.createDocumentFragmentFromHTML = function createDocumentFragmentFromHTML(html) {
    var element = document.createElement('div');
    element.innerHTML = html;
    var result = document.createDocumentFragment();
    while (element.hasChildNodes())
        result.appendChild(element.firstChild);
    return result;
};
Utility.clone = function clone(b) {
    var a;
    if (typeof b === 'object') {
        a = b instanceof Array ? [] : {};
        for (var key in b) {
            if (typeof b[key] === 'object' && b[key] !== null) {
                if (b[key] instanceof Array) {
                    a[key] = new Array(b[key].length);
                    for (var i = 0; i < b[key].length; i++) {
                        a[key][i] = Utility.clone(b[key][i]);
                    }
                } else {
                    a[key] = Utility.clone(b[key]);
                }
            } else {
                a[key] = b[key];
            }
        }
    } else {
        a = b;
    }
    return a;
};
module.exports = Utility;
},{}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/src/index.js":[function(require,module,exports){
// load css
require('./styles');

// Load polyfills
require('famous-polyfills');

// import dependencies
var Engine = require('famous/src/core/Engine');
var Modifier = require('famous/src/core/Modifier');
var Transform = require('famous/src/core/Transform');
var ImageSurface = require('famous/src/surfaces/ImageSurface');

// create the main context
var mainContext = Engine.createContext();

// your app here
var logo = new ImageSurface({
  size: [200, 200],
  content: 'images/famous_logo.png',
  classes: ['backfaceVisibility']
});

var initialTime = Date.now();
var centerSpinModifier = new Modifier({
  align: [0.5, 0.5],
  origin: [0.5, 0.5],
  transform: function() {
    return Transform.rotateY(.002 * (Date.now() - initialTime));
  }
});

mainContext.add(centerSpinModifier).add(logo);

},{"./styles":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/src/styles/index.js","famous-polyfills":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous-polyfills/index.js","famous/src/core/Engine":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Engine.js","famous/src/core/Modifier":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Modifier.js","famous/src/core/Transform":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/Transform.js","famous/src/surfaces/ImageSurface":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/surfaces/ImageSurface.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/src/styles/app.css":[function(require,module,exports){
var css = "html {\n  background: #fff;\n}\n\n.backfaceVisibility {\n  -webkit-backface-visibility: visible;\n  backface-visibility: visible;\n}\n"; (require("/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/cssify"))(css); module.exports = css;
},{"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/cssify":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/cssify/browser.js"}],"/Users/pshatara/Documents/Programming/HackReactor/AdFame/src/styles/index.js":[function(require,module,exports){
// load css
require('famous/src/core/famous.css');
require('./app.css');

},{"./app.css":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/src/styles/app.css","famous/src/core/famous.css":"/Users/pshatara/Documents/Programming/HackReactor/AdFame/node_modules/famous/src/core/famous.css"}]},{},["/Users/pshatara/Documents/Programming/HackReactor/AdFame/src/index.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY3NzaWZ5L2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzLXBvbHlmaWxscy9jbGFzc0xpc3QuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzLXBvbHlmaWxscy9mdW5jdGlvblByb3RvdHlwZUJpbmQuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzLXBvbHlmaWxscy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMtcG9seWZpbGxzL3JlcXVlc3RBbmltYXRpb25GcmFtZS5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvQ29udGV4dC5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvRWxlbWVudEFsbG9jYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvRWxlbWVudE91dHB1dC5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvRW5naW5lLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvY29yZS9FbnRpdHkuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9jb3JlL0V2ZW50RW1pdHRlci5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvRXZlbnRIYW5kbGVyLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvY29yZS9Nb2RpZmllci5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvT3B0aW9uc01hbmFnZXIuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9jb3JlL1JlbmRlck5vZGUuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9jb3JlL1NwZWNQYXJzZXIuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9jb3JlL1N1cmZhY2UuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9jb3JlL1RyYW5zZm9ybS5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvZmFtb3VzLmNzcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL3N1cmZhY2VzL0ltYWdlU3VyZmFjZS5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL3RyYW5zaXRpb25zL011bHRpcGxlVHJhbnNpdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0uanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy90cmFuc2l0aW9ucy9Ud2VlblRyYW5zaXRpb24uanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy91dGlsaXRpZXMvVXRpbGl0eS5qcyIsInNyYy9pbmRleC5qcyIsInNyYy9zdHlsZXMvYXBwLmNzcyIsInNyYy9zdHlsZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeHJCQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcywgY3VzdG9tRG9jdW1lbnQpIHtcbiAgdmFyIGRvYyA9IGN1c3RvbURvY3VtZW50IHx8IGRvY3VtZW50O1xuICBpZiAoZG9jLmNyZWF0ZVN0eWxlU2hlZXQpIHtcbiAgICB2YXIgc2hlZXQgPSBkb2MuY3JlYXRlU3R5bGVTaGVldCgpXG4gICAgc2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgICByZXR1cm4gc2hlZXQub3duZXJOb2RlO1xuICB9IGVsc2Uge1xuICAgIHZhciBoZWFkID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0sXG4gICAgICAgIHN0eWxlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcblxuICAgIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvYy5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgICB9XG5cbiAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICByZXR1cm4gc3R5bGU7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmJ5VXJsID0gZnVuY3Rpb24odXJsKSB7XG4gIGlmIChkb2N1bWVudC5jcmVhdGVTdHlsZVNoZWV0KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVN0eWxlU2hlZXQodXJsKS5vd25lck5vZGU7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLFxuICAgICAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuXG4gICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgbGluay5ocmVmID0gdXJsO1xuXG4gICAgaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICByZXR1cm4gbGluaztcbiAgfVxufTtcbiIsIlxuLypcbiAqIGNsYXNzTGlzdC5qczogQ3Jvc3MtYnJvd3NlciBmdWxsIGVsZW1lbnQuY2xhc3NMaXN0IGltcGxlbWVudGF0aW9uLlxuICogMjAxMS0wNi0xNVxuICpcbiAqIEJ5IEVsaSBHcmV5LCBodHRwOi8vZWxpZ3JleS5jb21cbiAqIFB1YmxpYyBEb21haW4uXG4gKiBOTyBXQVJSQU5UWSBFWFBSRVNTRUQgT1IgSU1QTElFRC4gVVNFIEFUIFlPVVIgT1dOIFJJU0suXG4gKi9cblxuLypnbG9iYWwgc2VsZiwgZG9jdW1lbnQsIERPTUV4Y2VwdGlvbiAqL1xuXG4vKiEgQHNvdXJjZSBodHRwOi8vcHVybC5lbGlncmV5LmNvbS9naXRodWIvY2xhc3NMaXN0LmpzL2Jsb2IvbWFzdGVyL2NsYXNzTGlzdC5qcyovXG5cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgIShcImNsYXNzTGlzdFwiIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpKSkge1xuXG4oZnVuY3Rpb24gKHZpZXcpIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhclxuICAgICAgY2xhc3NMaXN0UHJvcCA9IFwiY2xhc3NMaXN0XCJcbiAgICAsIHByb3RvUHJvcCA9IFwicHJvdG90eXBlXCJcbiAgICAsIGVsZW1DdHJQcm90byA9ICh2aWV3LkhUTUxFbGVtZW50IHx8IHZpZXcuRWxlbWVudClbcHJvdG9Qcm9wXVxuICAgICwgb2JqQ3RyID0gT2JqZWN0XG4gICAgLCBzdHJUcmltID0gU3RyaW5nW3Byb3RvUHJvcF0udHJpbSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpO1xuICAgIH1cbiAgICAsIGFyckluZGV4T2YgPSBBcnJheVtwcm90b1Byb3BdLmluZGV4T2YgfHwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAgICAgIGkgPSAwXG4gICAgICAgICAgICAsIGxlbiA9IHRoaXMubGVuZ3RoXG4gICAgICAgIDtcbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgaW4gdGhpcyAmJiB0aGlzW2ldID09PSBpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICAvLyBWZW5kb3JzOiBwbGVhc2UgYWxsb3cgY29udGVudCBjb2RlIHRvIGluc3RhbnRpYXRlIERPTUV4Y2VwdGlvbnNcbiAgICAsIERPTUV4ID0gZnVuY3Rpb24gKHR5cGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gdHlwZTtcbiAgICAgICAgdGhpcy5jb2RlID0gRE9NRXhjZXB0aW9uW3R5cGVdO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIH1cbiAgICAsIGNoZWNrVG9rZW5BbmRHZXRJbmRleCA9IGZ1bmN0aW9uIChjbGFzc0xpc3QsIHRva2VuKSB7XG4gICAgICAgIGlmICh0b2tlbiA9PT0gXCJcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IERPTUV4KFxuICAgICAgICAgICAgICAgICAgXCJTWU5UQVhfRVJSXCJcbiAgICAgICAgICAgICAgICAsIFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKC9cXHMvLnRlc3QodG9rZW4pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRE9NRXgoXG4gICAgICAgICAgICAgICAgICBcIklOVkFMSURfQ0hBUkFDVEVSX0VSUlwiXG4gICAgICAgICAgICAgICAgLCBcIlN0cmluZyBjb250YWlucyBhbiBpbnZhbGlkIGNoYXJhY3RlclwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJJbmRleE9mLmNhbGwoY2xhc3NMaXN0LCB0b2tlbik7XG4gICAgfVxuICAgICwgQ2xhc3NMaXN0ID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAgICAgIHRyaW1tZWRDbGFzc2VzID0gc3RyVHJpbS5jYWxsKGVsZW0uY2xhc3NOYW1lKVxuICAgICAgICAgICAgLCBjbGFzc2VzID0gdHJpbW1lZENsYXNzZXMgPyB0cmltbWVkQ2xhc3Nlcy5zcGxpdCgvXFxzKy8pIDogW11cbiAgICAgICAgICAgICwgaSA9IDBcbiAgICAgICAgICAgICwgbGVuID0gY2xhc3Nlcy5sZW5ndGhcbiAgICAgICAgO1xuICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnB1c2goY2xhc3Nlc1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlQ2xhc3NOYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZWxlbS5jbGFzc05hbWUgPSB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgICwgY2xhc3NMaXN0UHJvdG8gPSBDbGFzc0xpc3RbcHJvdG9Qcm9wXSA9IFtdXG4gICAgLCBjbGFzc0xpc3RHZXR0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ2xhc3NMaXN0KHRoaXMpO1xuICAgIH1cbjtcbi8vIE1vc3QgRE9NRXhjZXB0aW9uIGltcGxlbWVudGF0aW9ucyBkb24ndCBhbGxvdyBjYWxsaW5nIERPTUV4Y2VwdGlvbidzIHRvU3RyaW5nKClcbi8vIG9uIG5vbi1ET01FeGNlcHRpb25zLiBFcnJvcidzIHRvU3RyaW5nKCkgaXMgc3VmZmljaWVudCBoZXJlLlxuRE9NRXhbcHJvdG9Qcm9wXSA9IEVycm9yW3Byb3RvUHJvcF07XG5jbGFzc0xpc3RQcm90by5pdGVtID0gZnVuY3Rpb24gKGkpIHtcbiAgICByZXR1cm4gdGhpc1tpXSB8fCBudWxsO1xufTtcbmNsYXNzTGlzdFByb3RvLmNvbnRhaW5zID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdG9rZW4gKz0gXCJcIjtcbiAgICByZXR1cm4gY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKSAhPT0gLTE7XG59O1xuY2xhc3NMaXN0UHJvdG8uYWRkID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdG9rZW4gKz0gXCJcIjtcbiAgICBpZiAoY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5wdXNoKHRva2VuKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2xhc3NOYW1lKCk7XG4gICAgfVxufTtcbmNsYXNzTGlzdFByb3RvLnJlbW92ZSA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHRva2VuICs9IFwiXCI7XG4gICAgdmFyIGluZGV4ID0gY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2xhc3NOYW1lKCk7XG4gICAgfVxufTtcbmNsYXNzTGlzdFByb3RvLnRvZ2dsZSA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHRva2VuICs9IFwiXCI7XG4gICAgaWYgKGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbikgPT09IC0xKSB7XG4gICAgICAgIHRoaXMuYWRkKHRva2VuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZSh0b2tlbik7XG4gICAgfVxufTtcbmNsYXNzTGlzdFByb3RvLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmpvaW4oXCIgXCIpO1xufTtcblxuaWYgKG9iakN0ci5kZWZpbmVQcm9wZXJ0eSkge1xuICAgIHZhciBjbGFzc0xpc3RQcm9wRGVzYyA9IHtcbiAgICAgICAgICBnZXQ6IGNsYXNzTGlzdEdldHRlclxuICAgICAgICAsIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgLCBjb25maWd1cmFibGU6IHRydWVcbiAgICB9O1xuICAgIHRyeSB7XG4gICAgICAgIG9iakN0ci5kZWZpbmVQcm9wZXJ0eShlbGVtQ3RyUHJvdG8sIGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdFByb3BEZXNjKTtcbiAgICB9IGNhdGNoIChleCkgeyAvLyBJRSA4IGRvZXNuJ3Qgc3VwcG9ydCBlbnVtZXJhYmxlOnRydWVcbiAgICAgICAgaWYgKGV4Lm51bWJlciA9PT0gLTB4N0ZGNUVDNTQpIHtcbiAgICAgICAgICAgIGNsYXNzTGlzdFByb3BEZXNjLmVudW1lcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIG9iakN0ci5kZWZpbmVQcm9wZXJ0eShlbGVtQ3RyUHJvdG8sIGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdFByb3BEZXNjKTtcbiAgICAgICAgfVxuICAgIH1cbn0gZWxzZSBpZiAob2JqQ3RyW3Byb3RvUHJvcF0uX19kZWZpbmVHZXR0ZXJfXykge1xuICAgIGVsZW1DdHJQcm90by5fX2RlZmluZUdldHRlcl9fKGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdEdldHRlcik7XG59XG5cbn0oc2VsZikpO1xuXG59XG4iLCJpZiAoIUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKSB7XG4gICAgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAob1RoaXMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIC8vIGNsb3Nlc3QgdGhpbmcgcG9zc2libGUgdG8gdGhlIEVDTUFTY3JpcHQgNSBpbnRlcm5hbCBJc0NhbGxhYmxlIGZ1bmN0aW9uXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgLSB3aGF0IGlzIHRyeWluZyB0byBiZSBib3VuZCBpcyBub3QgY2FsbGFibGVcIik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYUFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgICBmVG9CaW5kID0gdGhpcyxcbiAgICAgICAgZk5PUCA9IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgICBmQm91bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZlRvQmluZC5hcHBseSh0aGlzIGluc3RhbmNlb2YgZk5PUCAmJiBvVGhpc1xuICAgICAgICAgICAgICAgID8gdGhpc1xuICAgICAgICAgICAgICAgIDogb1RoaXMsXG4gICAgICAgICAgICAgICAgYUFyZ3MuY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgICAgfTtcblxuICAgICAgICBmTk9QLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuICAgICAgICBmQm91bmQucHJvdG90eXBlID0gbmV3IGZOT1AoKTtcblxuICAgICAgICByZXR1cm4gZkJvdW5kO1xuICAgIH07XG59XG4iLCJyZXF1aXJlKCcuL2NsYXNzTGlzdC5qcycpO1xucmVxdWlyZSgnLi9mdW5jdGlvblByb3RvdHlwZUJpbmQuanMnKTtcbnJlcXVpcmUoJy4vcmVxdWVzdEFuaW1hdGlvbkZyYW1lLmpzJyk7IiwiLy8gYWRkcyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgZnVuY3Rpb25hbGl0eVxuLy8gU291cmNlOiBodHRwOi8vc3RyZDYuY29tLzIwMTEvMDUvYmV0dGVyLXdpbmRvdy1yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtc2hpbS9cblxud2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCAod2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9XG4gIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxuICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgIHx8XG4gIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgfHxcbiAgZnVuY3Rpb24oY2FsbGJhY2ssIGVsZW1lbnQpIHtcbiAgICByZXR1cm4gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBjYWxsYmFjaygrbmV3IERhdGUoKSk7XG4gIH0sIDEwMDAgLyA2MCk7XG59KTtcbiIsInZhciBSZW5kZXJOb2RlID0gcmVxdWlyZSgnLi9SZW5kZXJOb2RlJyk7XG52YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnLi9FdmVudEhhbmRsZXInKTtcbnZhciBFbGVtZW50QWxsb2NhdG9yID0gcmVxdWlyZSgnLi9FbGVtZW50QWxsb2NhdG9yJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi9UcmFuc2Zvcm0nKTtcbnZhciBUcmFuc2l0aW9uYWJsZSA9IHJlcXVpcmUoJy4uL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlJyk7XG52YXIgX3plcm9aZXJvID0gW1xuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXTtcbnZhciB1c2VQcmVmaXggPSAhKCdwZXJzcGVjdGl2ZScgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlKTtcbmZ1bmN0aW9uIF9nZXRFbGVtZW50U2l6ZShlbGVtZW50KSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgZWxlbWVudC5jbGllbnRXaWR0aCxcbiAgICAgICAgZWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICBdO1xufVxudmFyIF9zZXRQZXJzcGVjdGl2ZSA9IHVzZVByZWZpeCA/IGZ1bmN0aW9uIChlbGVtZW50LCBwZXJzcGVjdGl2ZSkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLndlYmtpdFBlcnNwZWN0aXZlID0gcGVyc3BlY3RpdmUgPyBwZXJzcGVjdGl2ZS50b0ZpeGVkKCkgKyAncHgnIDogJyc7XG4gICAgfSA6IGZ1bmN0aW9uIChlbGVtZW50LCBwZXJzcGVjdGl2ZSkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnBlcnNwZWN0aXZlID0gcGVyc3BlY3RpdmUgPyBwZXJzcGVjdGl2ZS50b0ZpeGVkKCkgKyAncHgnIDogJyc7XG4gICAgfTtcbmZ1bmN0aW9uIENvbnRleHQoY29udGFpbmVyKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgdGhpcy5fYWxsb2NhdG9yID0gbmV3IEVsZW1lbnRBbGxvY2F0b3IoY29udGFpbmVyKTtcbiAgICB0aGlzLl9ub2RlID0gbmV3IFJlbmRlck5vZGUoKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLl9zaXplID0gX2dldEVsZW1lbnRTaXplKHRoaXMuY29udGFpbmVyKTtcbiAgICB0aGlzLl9wZXJzcGVjdGl2ZVN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKDApO1xuICAgIHRoaXMuX3BlcnNwZWN0aXZlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX25vZGVDb250ZXh0ID0ge1xuICAgICAgICBhbGxvY2F0b3I6IHRoaXMuX2FsbG9jYXRvcixcbiAgICAgICAgdHJhbnNmb3JtOiBUcmFuc2Zvcm0uaWRlbnRpdHksXG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIG9yaWdpbjogX3plcm9aZXJvLFxuICAgICAgICBhbGlnbjogX3plcm9aZXJvLFxuICAgICAgICBzaXplOiB0aGlzLl9zaXplXG4gICAgfTtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNldFNpemUoX2dldEVsZW1lbnRTaXplKHRoaXMuY29udGFpbmVyKSk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbn1cbkNvbnRleHQucHJvdG90eXBlLmdldEFsbG9jYXRvciA9IGZ1bmN0aW9uIGdldEFsbG9jYXRvcigpIHtcbiAgICByZXR1cm4gdGhpcy5fYWxsb2NhdG9yO1xufTtcbkNvbnRleHQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZChvYmopIHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZS5hZGQob2JqKTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS5taWdyYXRlID0gZnVuY3Rpb24gbWlncmF0ZShjb250YWluZXIpIHtcbiAgICBpZiAoY29udGFpbmVyID09PSB0aGlzLmNvbnRhaW5lcilcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHRoaXMuX2FsbG9jYXRvci5taWdyYXRlKGNvbnRhaW5lcik7XG59O1xuQ29udGV4dC5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XG59O1xuQ29udGV4dC5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uIHNldFNpemUoc2l6ZSkge1xuICAgIGlmICghc2l6ZSlcbiAgICAgICAgc2l6ZSA9IF9nZXRFbGVtZW50U2l6ZSh0aGlzLmNvbnRhaW5lcik7XG4gICAgdGhpcy5fc2l6ZVswXSA9IHNpemVbMF07XG4gICAgdGhpcy5fc2l6ZVsxXSA9IHNpemVbMV07XG59O1xuQ29udGV4dC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlKGNvbnRleHRQYXJhbWV0ZXJzKSB7XG4gICAgaWYgKGNvbnRleHRQYXJhbWV0ZXJzKSB7XG4gICAgICAgIGlmIChjb250ZXh0UGFyYW1ldGVycy50cmFuc2Zvcm0pXG4gICAgICAgICAgICB0aGlzLl9ub2RlQ29udGV4dC50cmFuc2Zvcm0gPSBjb250ZXh0UGFyYW1ldGVycy50cmFuc2Zvcm07XG4gICAgICAgIGlmIChjb250ZXh0UGFyYW1ldGVycy5vcGFjaXR5KVxuICAgICAgICAgICAgdGhpcy5fbm9kZUNvbnRleHQub3BhY2l0eSA9IGNvbnRleHRQYXJhbWV0ZXJzLm9wYWNpdHk7XG4gICAgICAgIGlmIChjb250ZXh0UGFyYW1ldGVycy5vcmlnaW4pXG4gICAgICAgICAgICB0aGlzLl9ub2RlQ29udGV4dC5vcmlnaW4gPSBjb250ZXh0UGFyYW1ldGVycy5vcmlnaW47XG4gICAgICAgIGlmIChjb250ZXh0UGFyYW1ldGVycy5hbGlnbilcbiAgICAgICAgICAgIHRoaXMuX25vZGVDb250ZXh0LmFsaWduID0gY29udGV4dFBhcmFtZXRlcnMuYWxpZ247XG4gICAgICAgIGlmIChjb250ZXh0UGFyYW1ldGVycy5zaXplKVxuICAgICAgICAgICAgdGhpcy5fbm9kZUNvbnRleHQuc2l6ZSA9IGNvbnRleHRQYXJhbWV0ZXJzLnNpemU7XG4gICAgfVxuICAgIHZhciBwZXJzcGVjdGl2ZSA9IHRoaXMuX3BlcnNwZWN0aXZlU3RhdGUuZ2V0KCk7XG4gICAgaWYgKHBlcnNwZWN0aXZlICE9PSB0aGlzLl9wZXJzcGVjdGl2ZSkge1xuICAgICAgICBfc2V0UGVyc3BlY3RpdmUodGhpcy5jb250YWluZXIsIHBlcnNwZWN0aXZlKTtcbiAgICAgICAgdGhpcy5fcGVyc3BlY3RpdmUgPSBwZXJzcGVjdGl2ZTtcbiAgICB9XG4gICAgdGhpcy5fbm9kZS5jb21taXQodGhpcy5fbm9kZUNvbnRleHQpO1xufTtcbkNvbnRleHQucHJvdG90eXBlLmdldFBlcnNwZWN0aXZlID0gZnVuY3Rpb24gZ2V0UGVyc3BlY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BlcnNwZWN0aXZlU3RhdGUuZ2V0KCk7XG59O1xuQ29udGV4dC5wcm90b3R5cGUuc2V0UGVyc3BlY3RpdmUgPSBmdW5jdGlvbiBzZXRQZXJzcGVjdGl2ZShwZXJzcGVjdGl2ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5fcGVyc3BlY3RpdmVTdGF0ZS5zZXQocGVyc3BlY3RpdmUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBldmVudCkge1xuICAgIHJldHVybiB0aGlzLl9ldmVudE91dHB1dC5lbWl0KHR5cGUsIGV2ZW50KTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRPdXRwdXQub24odHlwZSwgaGFuZGxlcik7XG59O1xuQ29udGV4dC5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50T3V0cHV0LnJlbW92ZUxpc3RlbmVyKHR5cGUsIGhhbmRsZXIpO1xufTtcbkNvbnRleHQucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiBwaXBlKHRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLl9ldmVudE91dHB1dC5waXBlKHRhcmdldCk7XG59O1xuQ29udGV4dC5wcm90b3R5cGUudW5waXBlID0gZnVuY3Rpb24gdW5waXBlKHRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLl9ldmVudE91dHB1dC51bnBpcGUodGFyZ2V0KTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IENvbnRleHQ7IiwiZnVuY3Rpb24gRWxlbWVudEFsbG9jYXRvcihjb250YWluZXIpIHtcbiAgICBpZiAoIWNvbnRhaW5lcilcbiAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHRoaXMuZGV0YWNoZWROb2RlcyA9IHt9O1xuICAgIHRoaXMubm9kZUNvdW50ID0gMDtcbn1cbkVsZW1lbnRBbGxvY2F0b3IucHJvdG90eXBlLm1pZ3JhdGUgPSBmdW5jdGlvbiBtaWdyYXRlKGNvbnRhaW5lcikge1xuICAgIHZhciBvbGRDb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICBpZiAoY29udGFpbmVyID09PSBvbGRDb250YWluZXIpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAob2xkQ29udGFpbmVyIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQob2xkQ29udGFpbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB3aGlsZSAob2xkQ29udGFpbmVyLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG9sZENvbnRhaW5lci5yZW1vdmVDaGlsZChvbGRDb250YWluZXIuZmlyc3RDaGlsZCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xufTtcbkVsZW1lbnRBbGxvY2F0b3IucHJvdG90eXBlLmFsbG9jYXRlID0gZnVuY3Rpb24gYWxsb2NhdGUodHlwZSkge1xuICAgIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKCEodHlwZSBpbiB0aGlzLmRldGFjaGVkTm9kZXMpKVxuICAgICAgICB0aGlzLmRldGFjaGVkTm9kZXNbdHlwZV0gPSBbXTtcbiAgICB2YXIgbm9kZVN0b3JlID0gdGhpcy5kZXRhY2hlZE5vZGVzW3R5cGVdO1xuICAgIHZhciByZXN1bHQ7XG4gICAgaWYgKG5vZGVTdG9yZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJlc3VsdCA9IG5vZGVTdG9yZS5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChyZXN1bHQpO1xuICAgIH1cbiAgICB0aGlzLm5vZGVDb3VudCsrO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuRWxlbWVudEFsbG9jYXRvci5wcm90b3R5cGUuZGVhbGxvY2F0ZSA9IGZ1bmN0aW9uIGRlYWxsb2NhdGUoZWxlbWVudCkge1xuICAgIHZhciBub2RlVHlwZSA9IGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgbm9kZVN0b3JlID0gdGhpcy5kZXRhY2hlZE5vZGVzW25vZGVUeXBlXTtcbiAgICBub2RlU3RvcmUucHVzaChlbGVtZW50KTtcbiAgICB0aGlzLm5vZGVDb3VudC0tO1xufTtcbkVsZW1lbnRBbGxvY2F0b3IucHJvdG90eXBlLmdldE5vZGVDb3VudCA9IGZ1bmN0aW9uIGdldE5vZGVDb3VudCgpIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlQ291bnQ7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBFbGVtZW50QWxsb2NhdG9yOyIsInZhciBFbnRpdHkgPSByZXF1aXJlKCcuL0VudGl0eScpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4vRXZlbnRIYW5kbGVyJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi9UcmFuc2Zvcm0nKTtcbnZhciB1c2VQcmVmaXggPSAhKCd0cmFuc2Zvcm0nIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSk7XG52YXIgZGV2aWNlUGl4ZWxSYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG5mdW5jdGlvbiBFbGVtZW50T3V0cHV0KGVsZW1lbnQpIHtcbiAgICB0aGlzLl9tYXRyaXggPSBudWxsO1xuICAgIHRoaXMuX29wYWNpdHkgPSAxO1xuICAgIHRoaXMuX29yaWdpbiA9IG51bGw7XG4gICAgdGhpcy5fc2l6ZSA9IG51bGw7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuYmluZFRoaXModGhpcyk7XG4gICAgdGhpcy5ldmVudEZvcndhcmRlciA9IGZ1bmN0aW9uIGV2ZW50Rm9yd2FyZGVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoZXZlbnQudHlwZSwgZXZlbnQpO1xuICAgIH0uYmluZCh0aGlzKTtcbiAgICB0aGlzLmlkID0gRW50aXR5LnJlZ2lzdGVyKHRoaXMpO1xuICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuX3NpemVEaXJ0eSA9IGZhbHNlO1xuICAgIHRoaXMuX29yaWdpbkRpcnR5ID0gZmFsc2U7XG4gICAgdGhpcy5fdHJhbnNmb3JtRGlydHkgPSBmYWxzZTtcbiAgICB0aGlzLl9pbnZpc2libGUgPSBmYWxzZTtcbiAgICBpZiAoZWxlbWVudClcbiAgICAgICAgdGhpcy5hdHRhY2goZWxlbWVudCk7XG59XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKHR5cGUsIGZuKSB7XG4gICAgaWYgKHRoaXMuX2VsZW1lbnQpXG4gICAgICAgIHRoaXMuX2VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCB0aGlzLmV2ZW50Rm9yd2FyZGVyKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5vbih0eXBlLCBmbik7XG59O1xuRWxlbWVudE91dHB1dC5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBmbikge1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LnJlbW92ZUxpc3RlbmVyKHR5cGUsIGZuKTtcbn07XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBldmVudCkge1xuICAgIGlmIChldmVudCAmJiAhZXZlbnQub3JpZ2luKVxuICAgICAgICBldmVudC5vcmlnaW4gPSB0aGlzO1xuICAgIHZhciBoYW5kbGVkID0gdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCh0eXBlLCBldmVudCk7XG4gICAgaWYgKGhhbmRsZWQgJiYgZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKVxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICByZXR1cm4gaGFuZGxlZDtcbn07XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gcGlwZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRPdXRwdXQucGlwZSh0YXJnZXQpO1xufTtcbkVsZW1lbnRPdXRwdXQucHJvdG90eXBlLnVucGlwZSA9IGZ1bmN0aW9uIHVucGlwZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRPdXRwdXQudW5waXBlKHRhcmdldCk7XG59O1xuRWxlbWVudE91dHB1dC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmlkO1xufTtcbmZ1bmN0aW9uIF9hZGRFdmVudExpc3RlbmVycyh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpIGluIHRoaXMuX2V2ZW50T3V0cHV0Lmxpc3RlbmVycykge1xuICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihpLCB0aGlzLmV2ZW50Rm9yd2FyZGVyKTtcbiAgICB9XG59XG5mdW5jdGlvbiBfcmVtb3ZlRXZlbnRMaXN0ZW5lcnModGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLl9ldmVudE91dHB1dC5saXN0ZW5lcnMpIHtcbiAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoaSwgdGhpcy5ldmVudEZvcndhcmRlcik7XG4gICAgfVxufVxuZnVuY3Rpb24gX2Zvcm1hdENTU1RyYW5zZm9ybShtKSB7XG4gICAgbVsxMl0gPSBNYXRoLnJvdW5kKG1bMTJdICogZGV2aWNlUGl4ZWxSYXRpbykgLyBkZXZpY2VQaXhlbFJhdGlvO1xuICAgIG1bMTNdID0gTWF0aC5yb3VuZChtWzEzXSAqIGRldmljZVBpeGVsUmF0aW8pIC8gZGV2aWNlUGl4ZWxSYXRpbztcbiAgICB2YXIgcmVzdWx0ID0gJ21hdHJpeDNkKCc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCArPSBtW2ldIDwgMC4wMDAwMDEgJiYgbVtpXSA+IC0wLjAwMDAwMSA/ICcwLCcgOiBtW2ldICsgJywnO1xuICAgIH1cbiAgICByZXN1bHQgKz0gbVsxNV0gKyAnKSc7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbnZhciBfc2V0TWF0cml4O1xuaWYgKG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdmaXJlZm94JykgPiAtMSkge1xuICAgIF9zZXRNYXRyaXggPSBmdW5jdGlvbiAoZWxlbWVudCwgbWF0cml4KSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuekluZGV4ID0gbWF0cml4WzE0XSAqIDEwMDAwMDAgfCAwO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IF9mb3JtYXRDU1NUcmFuc2Zvcm0obWF0cml4KTtcbiAgICB9O1xufSBlbHNlIGlmICh1c2VQcmVmaXgpIHtcbiAgICBfc2V0TWF0cml4ID0gZnVuY3Rpb24gKGVsZW1lbnQsIG1hdHJpeCkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IF9mb3JtYXRDU1NUcmFuc2Zvcm0obWF0cml4KTtcbiAgICB9O1xufSBlbHNlIHtcbiAgICBfc2V0TWF0cml4ID0gZnVuY3Rpb24gKGVsZW1lbnQsIG1hdHJpeCkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IF9mb3JtYXRDU1NUcmFuc2Zvcm0obWF0cml4KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gX2Zvcm1hdENTU09yaWdpbihvcmlnaW4pIHtcbiAgICByZXR1cm4gMTAwICogb3JpZ2luWzBdICsgJyUgJyArIDEwMCAqIG9yaWdpblsxXSArICclJztcbn1cbnZhciBfc2V0T3JpZ2luID0gdXNlUHJlZml4ID8gZnVuY3Rpb24gKGVsZW1lbnQsIG9yaWdpbikge1xuICAgICAgICBlbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybU9yaWdpbiA9IF9mb3JtYXRDU1NPcmlnaW4ob3JpZ2luKTtcbiAgICB9IDogZnVuY3Rpb24gKGVsZW1lbnQsIG9yaWdpbikge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9IF9mb3JtYXRDU1NPcmlnaW4ob3JpZ2luKTtcbiAgICB9O1xudmFyIF9zZXRJbnZpc2libGUgPSB1c2VQcmVmaXggPyBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZTNkKDAuMDAwMSwwLjAwMDEsMC4wMDAxKSc7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgfSA6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlM2QoMC4wMDAxLDAuMDAwMSwwLjAwMDEpJztcbiAgICAgICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICB9O1xuZnVuY3Rpb24gX3h5Tm90RXF1YWxzKGEsIGIpIHtcbiAgICByZXR1cm4gYSAmJiBiID8gYVswXSAhPT0gYlswXSB8fCBhWzFdICE9PSBiWzFdIDogYSAhPT0gYjtcbn1cbkVsZW1lbnRPdXRwdXQucHJvdG90eXBlLmNvbW1pdCA9IGZ1bmN0aW9uIGNvbW1pdChjb250ZXh0KSB7XG4gICAgdmFyIHRhcmdldCA9IHRoaXMuX2VsZW1lbnQ7XG4gICAgaWYgKCF0YXJnZXQpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgbWF0cml4ID0gY29udGV4dC50cmFuc2Zvcm07XG4gICAgdmFyIG9wYWNpdHkgPSBjb250ZXh0Lm9wYWNpdHk7XG4gICAgdmFyIG9yaWdpbiA9IGNvbnRleHQub3JpZ2luO1xuICAgIHZhciBzaXplID0gY29udGV4dC5zaXplO1xuICAgIGlmICghbWF0cml4ICYmIHRoaXMuX21hdHJpeCkge1xuICAgICAgICB0aGlzLl9tYXRyaXggPSBudWxsO1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gMDtcbiAgICAgICAgX3NldEludmlzaWJsZSh0YXJnZXQpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChfeHlOb3RFcXVhbHModGhpcy5fb3JpZ2luLCBvcmlnaW4pKVxuICAgICAgICB0aGlzLl9vcmlnaW5EaXJ0eSA9IHRydWU7XG4gICAgaWYgKFRyYW5zZm9ybS5ub3RFcXVhbHModGhpcy5fbWF0cml4LCBtYXRyaXgpKVxuICAgICAgICB0aGlzLl90cmFuc2Zvcm1EaXJ0eSA9IHRydWU7XG4gICAgaWYgKHRoaXMuX2ludmlzaWJsZSkge1xuICAgICAgICB0aGlzLl9pbnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgfVxuICAgIGlmICh0aGlzLl9vcGFjaXR5ICE9PSBvcGFjaXR5KSB7XG4gICAgICAgIHRoaXMuX29wYWNpdHkgPSBvcGFjaXR5O1xuICAgICAgICB0YXJnZXQuc3R5bGUub3BhY2l0eSA9IG9wYWNpdHkgPj0gMSA/ICcwLjk5OTk5OScgOiBvcGFjaXR5O1xuICAgIH1cbiAgICBpZiAodGhpcy5fdHJhbnNmb3JtRGlydHkgfHwgdGhpcy5fb3JpZ2luRGlydHkgfHwgdGhpcy5fc2l6ZURpcnR5KSB7XG4gICAgICAgIGlmICh0aGlzLl9zaXplRGlydHkpXG4gICAgICAgICAgICB0aGlzLl9zaXplRGlydHkgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuX29yaWdpbkRpcnR5KSB7XG4gICAgICAgICAgICBpZiAob3JpZ2luKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9vcmlnaW4pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29yaWdpbiA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgdGhpcy5fb3JpZ2luWzBdID0gb3JpZ2luWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMuX29yaWdpblsxXSA9IG9yaWdpblsxXTtcbiAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuX29yaWdpbiA9IG51bGw7XG4gICAgICAgICAgICBfc2V0T3JpZ2luKHRhcmdldCwgdGhpcy5fb3JpZ2luKTtcbiAgICAgICAgICAgIHRoaXMuX29yaWdpbkRpcnR5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtYXRyaXgpXG4gICAgICAgICAgICBtYXRyaXggPSBUcmFuc2Zvcm0uaWRlbnRpdHk7XG4gICAgICAgIHRoaXMuX21hdHJpeCA9IG1hdHJpeDtcbiAgICAgICAgdmFyIGFhTWF0cml4ID0gdGhpcy5fc2l6ZSA/IFRyYW5zZm9ybS50aGVuTW92ZShtYXRyaXgsIFtcbiAgICAgICAgICAgICAgICAtdGhpcy5fc2l6ZVswXSAqIG9yaWdpblswXSxcbiAgICAgICAgICAgICAgICAtdGhpcy5fc2l6ZVsxXSAqIG9yaWdpblsxXSxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdKSA6IG1hdHJpeDtcbiAgICAgICAgX3NldE1hdHJpeCh0YXJnZXQsIGFhTWF0cml4KTtcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtRGlydHkgPSBmYWxzZTtcbiAgICB9XG59O1xuRWxlbWVudE91dHB1dC5wcm90b3R5cGUuY2xlYW51cCA9IGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgaWYgKHRoaXMuX2VsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5faW52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbn07XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS5hdHRhY2ggPSBmdW5jdGlvbiBhdHRhY2godGFyZ2V0KSB7XG4gICAgdGhpcy5fZWxlbWVudCA9IHRhcmdldDtcbiAgICBfYWRkRXZlbnRMaXN0ZW5lcnMuY2FsbCh0aGlzLCB0YXJnZXQpO1xufTtcbkVsZW1lbnRPdXRwdXQucHJvdG90eXBlLmRldGFjaCA9IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5fZWxlbWVudDtcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIF9yZW1vdmVFdmVudExpc3RlbmVycy5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgICAgIGlmICh0aGlzLl9pbnZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2ludmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgcmV0dXJuIHRhcmdldDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEVsZW1lbnRPdXRwdXQ7IiwidmFyIENvbnRleHQgPSByZXF1aXJlKCcuL0NvbnRleHQnKTtcbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuL0V2ZW50SGFuZGxlcicpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnLi9PcHRpb25zTWFuYWdlcicpO1xudmFyIEVuZ2luZSA9IHt9O1xudmFyIGNvbnRleHRzID0gW107XG52YXIgbmV4dFRpY2tRdWV1ZSA9IFtdO1xudmFyIGRlZmVyUXVldWUgPSBbXTtcbnZhciBsYXN0VGltZSA9IERhdGUubm93KCk7XG52YXIgZnJhbWVUaW1lO1xudmFyIGZyYW1lVGltZUxpbWl0O1xudmFyIGxvb3BFbmFibGVkID0gdHJ1ZTtcbnZhciBldmVudEZvcndhcmRlcnMgPSB7fTtcbnZhciBldmVudEhhbmRsZXIgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG52YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgY29udGFpbmVyVHlwZTogJ2RpdicsXG4gICAgICAgIGNvbnRhaW5lckNsYXNzOiAnZmFtb3VzLWNvbnRhaW5lcicsXG4gICAgICAgIGZwc0NhcDogdW5kZWZpbmVkLFxuICAgICAgICBydW5Mb29wOiB0cnVlLFxuICAgICAgICBhcHBNb2RlOiB0cnVlXG4gICAgfTtcbnZhciBvcHRpb25zTWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcihvcHRpb25zKTtcbnZhciBNQVhfREVGRVJfRlJBTUVfVElNRSA9IDEwO1xuRW5naW5lLnN0ZXAgPSBmdW5jdGlvbiBzdGVwKCkge1xuICAgIHZhciBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XG4gICAgaWYgKGZyYW1lVGltZUxpbWl0ICYmIGN1cnJlbnRUaW1lIC0gbGFzdFRpbWUgPCBmcmFtZVRpbWVMaW1pdClcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciBpID0gMDtcbiAgICBmcmFtZVRpbWUgPSBjdXJyZW50VGltZSAtIGxhc3RUaW1lO1xuICAgIGxhc3RUaW1lID0gY3VycmVudFRpbWU7XG4gICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3ByZXJlbmRlcicpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBuZXh0VGlja1F1ZXVlLmxlbmd0aDsgaSsrKVxuICAgICAgICBuZXh0VGlja1F1ZXVlW2ldLmNhbGwodGhpcyk7XG4gICAgbmV4dFRpY2tRdWV1ZS5zcGxpY2UoMCk7XG4gICAgd2hpbGUgKGRlZmVyUXVldWUubGVuZ3RoICYmIERhdGUubm93KCkgLSBjdXJyZW50VGltZSA8IE1BWF9ERUZFUl9GUkFNRV9USU1FKSB7XG4gICAgICAgIGRlZmVyUXVldWUuc2hpZnQoKS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgY29udGV4dHMubGVuZ3RoOyBpKyspXG4gICAgICAgIGNvbnRleHRzW2ldLnVwZGF0ZSgpO1xuICAgIGV2ZW50SGFuZGxlci5lbWl0KCdwb3N0cmVuZGVyJyk7XG59O1xuZnVuY3Rpb24gbG9vcCgpIHtcbiAgICBpZiAob3B0aW9ucy5ydW5Mb29wKSB7XG4gICAgICAgIEVuZ2luZS5zdGVwKCk7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgfSBlbHNlXG4gICAgICAgIGxvb3BFbmFibGVkID0gZmFsc2U7XG59XG53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuZnVuY3Rpb24gaGFuZGxlUmVzaXplKGV2ZW50KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250ZXh0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb250ZXh0c1tpXS5lbWl0KCdyZXNpemUnKTtcbiAgICB9XG4gICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3Jlc2l6ZScpO1xufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVJlc2l6ZSwgZmFsc2UpO1xuaGFuZGxlUmVzaXplKCk7XG5mdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9LCB0cnVlKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2ZhbW91cy1yb290Jyk7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZhbW91cy1yb290Jyk7XG59XG52YXIgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbkVuZ2luZS5waXBlID0gZnVuY3Rpb24gcGlwZSh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LnN1YnNjcmliZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LnN1YnNjcmliZShFbmdpbmUpO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIGV2ZW50SGFuZGxlci5waXBlKHRhcmdldCk7XG59O1xuRW5naW5lLnVucGlwZSA9IGZ1bmN0aW9uIHVucGlwZSh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LnVuc3Vic2NyaWJlIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHJldHVybiB0YXJnZXQudW5zdWJzY3JpYmUoRW5naW5lKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBldmVudEhhbmRsZXIudW5waXBlKHRhcmdldCk7XG59O1xuRW5naW5lLm9uID0gZnVuY3Rpb24gb24odHlwZSwgaGFuZGxlcikge1xuICAgIGlmICghKHR5cGUgaW4gZXZlbnRGb3J3YXJkZXJzKSkge1xuICAgICAgICBldmVudEZvcndhcmRlcnNbdHlwZV0gPSBldmVudEhhbmRsZXIuZW1pdC5iaW5kKGV2ZW50SGFuZGxlciwgdHlwZSk7XG4gICAgICAgIGlmIChkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZXZlbnRGb3J3YXJkZXJzW3R5cGVdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEVuZ2luZS5uZXh0VGljayhmdW5jdGlvbiAodHlwZSwgZm9yd2FyZGVyKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZvcndhcmRlcik7XG4gICAgICAgICAgICB9LmJpbmQodGhpcywgdHlwZSwgZXZlbnRGb3J3YXJkZXJzW3R5cGVdKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGV2ZW50SGFuZGxlci5vbih0eXBlLCBoYW5kbGVyKTtcbn07XG5FbmdpbmUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSwgZXZlbnQpIHtcbiAgICByZXR1cm4gZXZlbnRIYW5kbGVyLmVtaXQodHlwZSwgZXZlbnQpO1xufTtcbkVuZ2luZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGhhbmRsZXIpIHtcbiAgICByZXR1cm4gZXZlbnRIYW5kbGVyLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGhhbmRsZXIpO1xufTtcbkVuZ2luZS5nZXRGUFMgPSBmdW5jdGlvbiBnZXRGUFMoKSB7XG4gICAgcmV0dXJuIDEwMDAgLyBmcmFtZVRpbWU7XG59O1xuRW5naW5lLnNldEZQU0NhcCA9IGZ1bmN0aW9uIHNldEZQU0NhcChmcHMpIHtcbiAgICBmcmFtZVRpbWVMaW1pdCA9IE1hdGguZmxvb3IoMTAwMCAvIGZwcyk7XG59O1xuRW5naW5lLmdldE9wdGlvbnMgPSBmdW5jdGlvbiBnZXRPcHRpb25zKGtleSkge1xuICAgIHJldHVybiBvcHRpb25zTWFuYWdlci5nZXRPcHRpb25zKGtleSk7XG59O1xuRW5naW5lLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9uc01hbmFnZXIuc2V0T3B0aW9ucy5hcHBseShvcHRpb25zTWFuYWdlciwgYXJndW1lbnRzKTtcbn07XG5FbmdpbmUuY3JlYXRlQ29udGV4dCA9IGZ1bmN0aW9uIGNyZWF0ZUNvbnRleHQoZWwpIHtcbiAgICBpZiAoIWluaXRpYWxpemVkICYmIG9wdGlvbnMuYXBwTW9kZSlcbiAgICAgICAgRW5naW5lLm5leHRUaWNrKGluaXRpYWxpemUpO1xuICAgIHZhciBuZWVkTW91bnRDb250YWluZXIgPSBmYWxzZTtcbiAgICBpZiAoIWVsKSB7XG4gICAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChvcHRpb25zLmNvbnRhaW5lclR5cGUpO1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKG9wdGlvbnMuY29udGFpbmVyQ2xhc3MpO1xuICAgICAgICBuZWVkTW91bnRDb250YWluZXIgPSB0cnVlO1xuICAgIH1cbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KGVsKTtcbiAgICBFbmdpbmUucmVnaXN0ZXJDb250ZXh0KGNvbnRleHQpO1xuICAgIGlmIChuZWVkTW91bnRDb250YWluZXIpIHtcbiAgICAgICAgRW5naW5lLm5leHRUaWNrKGZ1bmN0aW9uIChjb250ZXh0LCBlbCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbCk7XG4gICAgICAgICAgICBjb250ZXh0LmVtaXQoJ3Jlc2l6ZScpO1xuICAgICAgICB9LmJpbmQodGhpcywgY29udGV4dCwgZWwpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRleHQ7XG59O1xuRW5naW5lLnJlZ2lzdGVyQ29udGV4dCA9IGZ1bmN0aW9uIHJlZ2lzdGVyQ29udGV4dChjb250ZXh0KSB7XG4gICAgY29udGV4dHMucHVzaChjb250ZXh0KTtcbiAgICByZXR1cm4gY29udGV4dDtcbn07XG5FbmdpbmUuZ2V0Q29udGV4dHMgPSBmdW5jdGlvbiBnZXRDb250ZXh0cygpIHtcbiAgICByZXR1cm4gY29udGV4dHM7XG59O1xuRW5naW5lLmRlcmVnaXN0ZXJDb250ZXh0ID0gZnVuY3Rpb24gZGVyZWdpc3RlckNvbnRleHQoY29udGV4dCkge1xuICAgIHZhciBpID0gY29udGV4dHMuaW5kZXhPZihjb250ZXh0KTtcbiAgICBpZiAoaSA+PSAwKVxuICAgICAgICBjb250ZXh0cy5zcGxpY2UoaSwgMSk7XG59O1xuRW5naW5lLm5leHRUaWNrID0gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICBuZXh0VGlja1F1ZXVlLnB1c2goZm4pO1xufTtcbkVuZ2luZS5kZWZlciA9IGZ1bmN0aW9uIGRlZmVyKGZuKSB7XG4gICAgZGVmZXJRdWV1ZS5wdXNoKGZuKTtcbn07XG5vcHRpb25zTWFuYWdlci5vbignY2hhbmdlJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBpZiAoZGF0YS5pZCA9PT0gJ2Zwc0NhcCcpXG4gICAgICAgIEVuZ2luZS5zZXRGUFNDYXAoZGF0YS52YWx1ZSk7XG4gICAgZWxzZSBpZiAoZGF0YS5pZCA9PT0gJ3J1bkxvb3AnKSB7XG4gICAgICAgIGlmICghbG9vcEVuYWJsZWQgJiYgZGF0YS52YWx1ZSkge1xuICAgICAgICAgICAgbG9vcEVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBFbmdpbmU7IiwidmFyIGVudGl0aWVzID0gW107XG5mdW5jdGlvbiBnZXQoaWQpIHtcbiAgICByZXR1cm4gZW50aXRpZXNbaWRdO1xufVxuZnVuY3Rpb24gc2V0KGlkLCBlbnRpdHkpIHtcbiAgICBlbnRpdGllc1tpZF0gPSBlbnRpdHk7XG59XG5mdW5jdGlvbiByZWdpc3RlcihlbnRpdHkpIHtcbiAgICB2YXIgaWQgPSBlbnRpdGllcy5sZW5ndGg7XG4gICAgc2V0KGlkLCBlbnRpdHkpO1xuICAgIHJldHVybiBpZDtcbn1cbmZ1bmN0aW9uIHVucmVnaXN0ZXIoaWQpIHtcbiAgICBzZXQoaWQsIG51bGwpO1xufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcmVnaXN0ZXI6IHJlZ2lzdGVyLFxuICAgIHVucmVnaXN0ZXI6IHVucmVnaXN0ZXIsXG4gICAgZ2V0OiBnZXQsXG4gICAgc2V0OiBzZXRcbn07IiwiZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICAgIHRoaXMubGlzdGVuZXJzID0ge307XG4gICAgdGhpcy5fb3duZXIgPSB0aGlzO1xufVxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBldmVudCkge1xuICAgIHZhciBoYW5kbGVycyA9IHRoaXMubGlzdGVuZXJzW3R5cGVdO1xuICAgIGlmIChoYW5kbGVycykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhbmRsZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBoYW5kbGVyc1tpXS5jYWxsKHRoaXMuX293bmVyLCBldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgICBpZiAoISh0eXBlIGluIHRoaXMubGlzdGVuZXJzKSlcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSBbXTtcbiAgICB2YXIgaW5kZXggPSB0aGlzLmxpc3RlbmVyc1t0eXBlXS5pbmRleE9mKGhhbmRsZXIpO1xuICAgIGlmIChpbmRleCA8IDApXG4gICAgICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdLnB1c2goaGFuZGxlcik7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUub247XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgaGFuZGxlcikge1xuICAgIHZhciBsaXN0ZW5lciA9IHRoaXMubGlzdGVuZXJzW3R5cGVdO1xuICAgIGlmIChsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGxpc3RlbmVyLmluZGV4T2YoaGFuZGxlcik7XG4gICAgICAgIGlmIChpbmRleCA+PSAwKVxuICAgICAgICAgICAgbGlzdGVuZXIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5iaW5kVGhpcyA9IGZ1bmN0aW9uIGJpbmRUaGlzKG93bmVyKSB7XG4gICAgdGhpcy5fb3duZXIgPSBvd25lcjtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjsiLCJ2YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnLi9FdmVudEVtaXR0ZXInKTtcbmZ1bmN0aW9uIEV2ZW50SGFuZGxlcigpIHtcbiAgICBFdmVudEVtaXR0ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLmRvd25zdHJlYW0gPSBbXTtcbiAgICB0aGlzLmRvd25zdHJlYW1GbiA9IFtdO1xuICAgIHRoaXMudXBzdHJlYW0gPSBbXTtcbiAgICB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzID0ge307XG59XG5FdmVudEhhbmRsZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFdmVudEVtaXR0ZXIucHJvdG90eXBlKTtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFdmVudEhhbmRsZXI7XG5FdmVudEhhbmRsZXIuc2V0SW5wdXRIYW5kbGVyID0gZnVuY3Rpb24gc2V0SW5wdXRIYW5kbGVyKG9iamVjdCwgaGFuZGxlcikge1xuICAgIG9iamVjdC50cmlnZ2VyID0gaGFuZGxlci50cmlnZ2VyLmJpbmQoaGFuZGxlcik7XG4gICAgaWYgKGhhbmRsZXIuc3Vic2NyaWJlICYmIGhhbmRsZXIudW5zdWJzY3JpYmUpIHtcbiAgICAgICAgb2JqZWN0LnN1YnNjcmliZSA9IGhhbmRsZXIuc3Vic2NyaWJlLmJpbmQoaGFuZGxlcik7XG4gICAgICAgIG9iamVjdC51bnN1YnNjcmliZSA9IGhhbmRsZXIudW5zdWJzY3JpYmUuYmluZChoYW5kbGVyKTtcbiAgICB9XG59O1xuRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIgPSBmdW5jdGlvbiBzZXRPdXRwdXRIYW5kbGVyKG9iamVjdCwgaGFuZGxlcikge1xuICAgIGlmIChoYW5kbGVyIGluc3RhbmNlb2YgRXZlbnRIYW5kbGVyKVxuICAgICAgICBoYW5kbGVyLmJpbmRUaGlzKG9iamVjdCk7XG4gICAgb2JqZWN0LnBpcGUgPSBoYW5kbGVyLnBpcGUuYmluZChoYW5kbGVyKTtcbiAgICBvYmplY3QudW5waXBlID0gaGFuZGxlci51bnBpcGUuYmluZChoYW5kbGVyKTtcbiAgICBvYmplY3Qub24gPSBoYW5kbGVyLm9uLmJpbmQoaGFuZGxlcik7XG4gICAgb2JqZWN0LmFkZExpc3RlbmVyID0gb2JqZWN0Lm9uO1xuICAgIG9iamVjdC5yZW1vdmVMaXN0ZW5lciA9IGhhbmRsZXIucmVtb3ZlTGlzdGVuZXIuYmluZChoYW5kbGVyKTtcbn07XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUsIGV2ZW50KSB7XG4gICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdmFyIGkgPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmRvd25zdHJlYW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuZG93bnN0cmVhbVtpXS50cmlnZ2VyKVxuICAgICAgICAgICAgdGhpcy5kb3duc3RyZWFtW2ldLnRyaWdnZXIodHlwZSwgZXZlbnQpO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5kb3duc3RyZWFtRm4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5kb3duc3RyZWFtRm5baV0odHlwZSwgZXZlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLnRyaWdnZXIgPSBFdmVudEhhbmRsZXIucHJvdG90eXBlLmVtaXQ7XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiBwaXBlKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuc3Vic2NyaWJlIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHJldHVybiB0YXJnZXQuc3Vic2NyaWJlKHRoaXMpO1xuICAgIHZhciBkb3duc3RyZWFtQ3R4ID0gdGFyZ2V0IGluc3RhbmNlb2YgRnVuY3Rpb24gPyB0aGlzLmRvd25zdHJlYW1GbiA6IHRoaXMuZG93bnN0cmVhbTtcbiAgICB2YXIgaW5kZXggPSBkb3duc3RyZWFtQ3R4LmluZGV4T2YodGFyZ2V0KTtcbiAgICBpZiAoaW5kZXggPCAwKVxuICAgICAgICBkb3duc3RyZWFtQ3R4LnB1c2godGFyZ2V0KTtcbiAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRhcmdldCgncGlwZScsIG51bGwpO1xuICAgIGVsc2UgaWYgKHRhcmdldC50cmlnZ2VyKVxuICAgICAgICB0YXJnZXQudHJpZ2dlcigncGlwZScsIG51bGwpO1xuICAgIHJldHVybiB0YXJnZXQ7XG59O1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS51bnBpcGUgPSBmdW5jdGlvbiB1bnBpcGUodGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC51bnN1YnNjcmliZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LnVuc3Vic2NyaWJlKHRoaXMpO1xuICAgIHZhciBkb3duc3RyZWFtQ3R4ID0gdGFyZ2V0IGluc3RhbmNlb2YgRnVuY3Rpb24gPyB0aGlzLmRvd25zdHJlYW1GbiA6IHRoaXMuZG93bnN0cmVhbTtcbiAgICB2YXIgaW5kZXggPSBkb3duc3RyZWFtQ3R4LmluZGV4T2YodGFyZ2V0KTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICBkb3duc3RyZWFtQ3R4LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgICAgIHRhcmdldCgndW5waXBlJywgbnVsbCk7XG4gICAgICAgIGVsc2UgaWYgKHRhcmdldC50cmlnZ2VyKVxuICAgICAgICAgICAgdGFyZ2V0LnRyaWdnZXIoJ3VucGlwZScsIG51bGwpO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gZmFsc2U7XG59O1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKCEodHlwZSBpbiB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzKSkge1xuICAgICAgICB2YXIgdXBzdHJlYW1MaXN0ZW5lciA9IHRoaXMudHJpZ2dlci5iaW5kKHRoaXMsIHR5cGUpO1xuICAgICAgICB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzW3R5cGVdID0gdXBzdHJlYW1MaXN0ZW5lcjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnVwc3RyZWFtLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnVwc3RyZWFtW2ldLm9uKHR5cGUsIHVwc3RyZWFtTGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEhhbmRsZXIucHJvdG90eXBlLm9uO1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiBzdWJzY3JpYmUoc291cmNlKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy51cHN0cmVhbS5pbmRleE9mKHNvdXJjZSk7XG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICB0aGlzLnVwc3RyZWFtLnB1c2goc291cmNlKTtcbiAgICAgICAgZm9yICh2YXIgdHlwZSBpbiB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBzb3VyY2Uub24odHlwZSwgdGhpcy51cHN0cmVhbUxpc3RlbmVyc1t0eXBlXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uIHVuc3Vic2NyaWJlKHNvdXJjZSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMudXBzdHJlYW0uaW5kZXhPZihzb3VyY2UpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgIHRoaXMudXBzdHJlYW0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgZm9yICh2YXIgdHlwZSBpbiB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBzb3VyY2UucmVtb3ZlTGlzdGVuZXIodHlwZSwgdGhpcy51cHN0cmVhbUxpc3RlbmVyc1t0eXBlXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBFdmVudEhhbmRsZXI7IiwidmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJy4vVHJhbnNmb3JtJyk7XG52YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCcuLi90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZScpO1xudmFyIFRyYW5zaXRpb25hYmxlVHJhbnNmb3JtID0gcmVxdWlyZSgnLi4vdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0nKTtcbmZ1bmN0aW9uIE1vZGlmaWVyKG9wdGlvbnMpIHtcbiAgICB0aGlzLl90cmFuc2Zvcm1HZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX29wYWNpdHlHZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX29yaWdpbkdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fYWxpZ25HZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX3NpemVHZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX3Byb3BvcnRpb25HZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX2xlZ2FjeVN0YXRlcyA9IHt9O1xuICAgIHRoaXMuX291dHB1dCA9IHtcbiAgICAgICAgdHJhbnNmb3JtOiBUcmFuc2Zvcm0uaWRlbnRpdHksXG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIG9yaWdpbjogbnVsbCxcbiAgICAgICAgYWxpZ246IG51bGwsXG4gICAgICAgIHNpemU6IG51bGwsXG4gICAgICAgIHByb3BvcnRpb25zOiBudWxsLFxuICAgICAgICB0YXJnZXQ6IG51bGxcbiAgICB9O1xuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zLnRyYW5zZm9ybSlcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtRnJvbShvcHRpb25zLnRyYW5zZm9ybSk7XG4gICAgICAgIGlmIChvcHRpb25zLm9wYWNpdHkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRoaXMub3BhY2l0eUZyb20ob3B0aW9ucy5vcGFjaXR5KTtcbiAgICAgICAgaWYgKG9wdGlvbnMub3JpZ2luKVxuICAgICAgICAgICAgdGhpcy5vcmlnaW5Gcm9tKG9wdGlvbnMub3JpZ2luKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuYWxpZ24pXG4gICAgICAgICAgICB0aGlzLmFsaWduRnJvbShvcHRpb25zLmFsaWduKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuc2l6ZSlcbiAgICAgICAgICAgIHRoaXMuc2l6ZUZyb20ob3B0aW9ucy5zaXplKTtcbiAgICAgICAgaWYgKG9wdGlvbnMucHJvcG9ydGlvbnMpXG4gICAgICAgICAgICB0aGlzLnByb3BvcnRpb25zRnJvbShvcHRpb25zLnByb3BvcnRpb25zKTtcbiAgICB9XG59XG5Nb2RpZmllci5wcm90b3R5cGUudHJhbnNmb3JtRnJvbSA9IGZ1bmN0aW9uIHRyYW5zZm9ybUZyb20odHJhbnNmb3JtKSB7XG4gICAgaWYgKHRyYW5zZm9ybSBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICB0aGlzLl90cmFuc2Zvcm1HZXR0ZXIgPSB0cmFuc2Zvcm07XG4gICAgZWxzZSBpZiAodHJhbnNmb3JtIGluc3RhbmNlb2YgT2JqZWN0ICYmIHRyYW5zZm9ybS5nZXQpXG4gICAgICAgIHRoaXMuX3RyYW5zZm9ybUdldHRlciA9IHRyYW5zZm9ybS5nZXQuYmluZCh0cmFuc2Zvcm0pO1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl90cmFuc2Zvcm1HZXR0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9vdXRwdXQudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5Nb2RpZmllci5wcm90b3R5cGUub3BhY2l0eUZyb20gPSBmdW5jdGlvbiBvcGFjaXR5RnJvbShvcGFjaXR5KSB7XG4gICAgaWYgKG9wYWNpdHkgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGhpcy5fb3BhY2l0eUdldHRlciA9IG9wYWNpdHk7XG4gICAgZWxzZSBpZiAob3BhY2l0eSBpbnN0YW5jZW9mIE9iamVjdCAmJiBvcGFjaXR5LmdldClcbiAgICAgICAgdGhpcy5fb3BhY2l0eUdldHRlciA9IG9wYWNpdHkuZ2V0LmJpbmQob3BhY2l0eSk7XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX29wYWNpdHlHZXR0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9vdXRwdXQub3BhY2l0eSA9IG9wYWNpdHk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5vcmlnaW5Gcm9tID0gZnVuY3Rpb24gb3JpZ2luRnJvbShvcmlnaW4pIHtcbiAgICBpZiAob3JpZ2luIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRoaXMuX29yaWdpbkdldHRlciA9IG9yaWdpbjtcbiAgICBlbHNlIGlmIChvcmlnaW4gaW5zdGFuY2VvZiBPYmplY3QgJiYgb3JpZ2luLmdldClcbiAgICAgICAgdGhpcy5fb3JpZ2luR2V0dGVyID0gb3JpZ2luLmdldC5iaW5kKG9yaWdpbik7XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX29yaWdpbkdldHRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX291dHB1dC5vcmlnaW4gPSBvcmlnaW47XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5hbGlnbkZyb20gPSBmdW5jdGlvbiBhbGlnbkZyb20oYWxpZ24pIHtcbiAgICBpZiAoYWxpZ24gaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGhpcy5fYWxpZ25HZXR0ZXIgPSBhbGlnbjtcbiAgICBlbHNlIGlmIChhbGlnbiBpbnN0YW5jZW9mIE9iamVjdCAmJiBhbGlnbi5nZXQpXG4gICAgICAgIHRoaXMuX2FsaWduR2V0dGVyID0gYWxpZ24uZ2V0LmJpbmQoYWxpZ24pO1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9hbGlnbkdldHRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX291dHB1dC5hbGlnbiA9IGFsaWduO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuc2l6ZUZyb20gPSBmdW5jdGlvbiBzaXplRnJvbShzaXplKSB7XG4gICAgaWYgKHNpemUgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGhpcy5fc2l6ZUdldHRlciA9IHNpemU7XG4gICAgZWxzZSBpZiAoc2l6ZSBpbnN0YW5jZW9mIE9iamVjdCAmJiBzaXplLmdldClcbiAgICAgICAgdGhpcy5fc2l6ZUdldHRlciA9IHNpemUuZ2V0LmJpbmQoc2l6ZSk7XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX3NpemVHZXR0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9vdXRwdXQuc2l6ZSA9IHNpemU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5wcm9wb3J0aW9uc0Zyb20gPSBmdW5jdGlvbiBwcm9wb3J0aW9uc0Zyb20ocHJvcG9ydGlvbnMpIHtcbiAgICBpZiAocHJvcG9ydGlvbnMgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGhpcy5fcHJvcG9ydGlvbkdldHRlciA9IHByb3BvcnRpb25zO1xuICAgIGVsc2UgaWYgKHByb3BvcnRpb25zIGluc3RhbmNlb2YgT2JqZWN0ICYmIHByb3BvcnRpb25zLmdldClcbiAgICAgICAgdGhpcy5fcHJvcG9ydGlvbkdldHRlciA9IHByb3BvcnRpb25zLmdldC5iaW5kKHByb3BvcnRpb25zKTtcbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fcHJvcG9ydGlvbkdldHRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX291dHB1dC5wcm9wb3J0aW9ucyA9IHByb3BvcnRpb25zO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuc2V0VHJhbnNmb3JtID0gZnVuY3Rpb24gc2V0VHJhbnNmb3JtKHRyYW5zZm9ybSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAodHJhbnNpdGlvbiB8fCB0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtKSB7XG4gICAgICAgIGlmICghdGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybSkge1xuICAgICAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybSA9IG5ldyBUcmFuc2l0aW9uYWJsZVRyYW5zZm9ybSh0aGlzLl9vdXRwdXQudHJhbnNmb3JtKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX3RyYW5zZm9ybUdldHRlcilcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtRnJvbSh0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtKTtcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybS5zZXQodHJhbnNmb3JtLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm1Gcm9tKHRyYW5zZm9ybSk7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLnNldE9wYWNpdHkgPSBmdW5jdGlvbiBzZXRPcGFjaXR5KG9wYWNpdHksIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHRyYW5zaXRpb24gfHwgdGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sZWdhY3lTdGF0ZXMub3BhY2l0eSkge1xuICAgICAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkgPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fb3V0cHV0Lm9wYWNpdHkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fb3BhY2l0eUdldHRlcilcbiAgICAgICAgICAgIHRoaXMub3BhY2l0eUZyb20odGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkpO1xuICAgICAgICByZXR1cm4gdGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkuc2V0KG9wYWNpdHksIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIHRoaXMub3BhY2l0eUZyb20ob3BhY2l0eSk7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLnNldE9yaWdpbiA9IGZ1bmN0aW9uIHNldE9yaWdpbihvcmlnaW4sIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHRyYW5zaXRpb24gfHwgdGhpcy5fbGVnYWN5U3RhdGVzLm9yaWdpbikge1xuICAgICAgICBpZiAoIXRoaXMuX2xlZ2FjeVN0YXRlcy5vcmlnaW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5vcmlnaW4gPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fb3V0cHV0Lm9yaWdpbiB8fCBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX29yaWdpbkdldHRlcilcbiAgICAgICAgICAgIHRoaXMub3JpZ2luRnJvbSh0aGlzLl9sZWdhY3lTdGF0ZXMub3JpZ2luKTtcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLm9yaWdpbi5zZXQob3JpZ2luLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5Gcm9tKG9yaWdpbik7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLnNldEFsaWduID0gZnVuY3Rpb24gc2V0QWxpZ24oYWxpZ24sIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHRyYW5zaXRpb24gfHwgdGhpcy5fbGVnYWN5U3RhdGVzLmFsaWduKSB7XG4gICAgICAgIGlmICghdGhpcy5fbGVnYWN5U3RhdGVzLmFsaWduKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMuYWxpZ24gPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fb3V0cHV0LmFsaWduIHx8IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fYWxpZ25HZXR0ZXIpXG4gICAgICAgICAgICB0aGlzLmFsaWduRnJvbSh0aGlzLl9sZWdhY3lTdGF0ZXMuYWxpZ24pO1xuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMuYWxpZ24uc2V0KGFsaWduLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy5hbGlnbkZyb20oYWxpZ24pO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24gc2V0U2l6ZShzaXplLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmIChzaXplICYmICh0cmFuc2l0aW9uIHx8IHRoaXMuX2xlZ2FjeVN0YXRlcy5zaXplKSkge1xuICAgICAgICBpZiAoIXRoaXMuX2xlZ2FjeVN0YXRlcy5zaXplKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMuc2l6ZSA9IG5ldyBUcmFuc2l0aW9uYWJsZSh0aGlzLl9vdXRwdXQuc2l6ZSB8fCBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX3NpemVHZXR0ZXIpXG4gICAgICAgICAgICB0aGlzLnNpemVGcm9tKHRoaXMuX2xlZ2FjeVN0YXRlcy5zaXplKTtcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnNpemUuc2V0KHNpemUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiB0aGlzLnNpemVGcm9tKHNpemUpO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5zZXRQcm9wb3J0aW9ucyA9IGZ1bmN0aW9uIHNldFByb3BvcnRpb25zKHByb3BvcnRpb25zLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmIChwcm9wb3J0aW9ucyAmJiAodHJhbnNpdGlvbiB8fCB0aGlzLl9sZWdhY3lTdGF0ZXMucHJvcG9ydGlvbnMpKSB7XG4gICAgICAgIGlmICghdGhpcy5fbGVnYWN5U3RhdGVzLnByb3BvcnRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMucHJvcG9ydGlvbnMgPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fb3V0cHV0LnByb3BvcnRpb25zIHx8IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fcHJvcG9ydGlvbkdldHRlcilcbiAgICAgICAgICAgIHRoaXMucHJvcG9ydGlvbnNGcm9tKHRoaXMuX2xlZ2FjeVN0YXRlcy5wcm9wb3J0aW9ucyk7XG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5wcm9wb3J0aW9ucy5zZXQocHJvcG9ydGlvbnMsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BvcnRpb25zRnJvbShwcm9wb3J0aW9ucyk7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLmhhbHQgPSBmdW5jdGlvbiBoYWx0KCkge1xuICAgIGlmICh0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtKVxuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtLmhhbHQoKTtcbiAgICBpZiAodGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkpXG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5vcGFjaXR5LmhhbHQoKTtcbiAgICBpZiAodGhpcy5fbGVnYWN5U3RhdGVzLm9yaWdpbilcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLm9yaWdpbi5oYWx0KCk7XG4gICAgaWYgKHRoaXMuX2xlZ2FjeVN0YXRlcy5hbGlnbilcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLmFsaWduLmhhbHQoKTtcbiAgICBpZiAodGhpcy5fbGVnYWN5U3RhdGVzLnNpemUpXG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5zaXplLmhhbHQoKTtcbiAgICBpZiAodGhpcy5fbGVnYWN5U3RhdGVzLnByb3BvcnRpb25zKVxuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMucHJvcG9ydGlvbnMuaGFsdCgpO1xuICAgIHRoaXMuX3RyYW5zZm9ybUdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fb3BhY2l0eUdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fb3JpZ2luR2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9hbGlnbkdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fc2l6ZUdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fcHJvcG9ydGlvbkdldHRlciA9IG51bGw7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLmdldFRyYW5zZm9ybSA9IGZ1bmN0aW9uIGdldFRyYW5zZm9ybSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdHJhbnNmb3JtR2V0dGVyKCk7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLmdldEZpbmFsVHJhbnNmb3JtID0gZnVuY3Rpb24gZ2V0RmluYWxUcmFuc2Zvcm0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xlZ2FjeVN0YXRlcy50cmFuc2Zvcm0gPyB0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtLmdldEZpbmFsKCkgOiB0aGlzLl9vdXRwdXQudHJhbnNmb3JtO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5nZXRPcGFjaXR5ID0gZnVuY3Rpb24gZ2V0T3BhY2l0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5fb3BhY2l0eUdldHRlcigpO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5nZXRPcmlnaW4gPSBmdW5jdGlvbiBnZXRPcmlnaW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWdpbkdldHRlcigpO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5nZXRBbGlnbiA9IGZ1bmN0aW9uIGdldEFsaWduKCkge1xuICAgIHJldHVybiB0aGlzLl9hbGlnbkdldHRlcigpO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gZ2V0U2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZUdldHRlciA/IHRoaXMuX3NpemVHZXR0ZXIoKSA6IHRoaXMuX291dHB1dC5zaXplO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5nZXRQcm9wb3J0aW9ucyA9IGZ1bmN0aW9uIGdldFByb3BvcnRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLl9wcm9wb3J0aW9uR2V0dGVyID8gdGhpcy5fcHJvcG9ydGlvbkdldHRlcigpIDogdGhpcy5fb3V0cHV0LnByb3BvcnRpb25zO1xufTtcbmZ1bmN0aW9uIF91cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuX3RyYW5zZm9ybUdldHRlcilcbiAgICAgICAgdGhpcy5fb3V0cHV0LnRyYW5zZm9ybSA9IHRoaXMuX3RyYW5zZm9ybUdldHRlcigpO1xuICAgIGlmICh0aGlzLl9vcGFjaXR5R2V0dGVyKVxuICAgICAgICB0aGlzLl9vdXRwdXQub3BhY2l0eSA9IHRoaXMuX29wYWNpdHlHZXR0ZXIoKTtcbiAgICBpZiAodGhpcy5fb3JpZ2luR2V0dGVyKVxuICAgICAgICB0aGlzLl9vdXRwdXQub3JpZ2luID0gdGhpcy5fb3JpZ2luR2V0dGVyKCk7XG4gICAgaWYgKHRoaXMuX2FsaWduR2V0dGVyKVxuICAgICAgICB0aGlzLl9vdXRwdXQuYWxpZ24gPSB0aGlzLl9hbGlnbkdldHRlcigpO1xuICAgIGlmICh0aGlzLl9zaXplR2V0dGVyKVxuICAgICAgICB0aGlzLl9vdXRwdXQuc2l6ZSA9IHRoaXMuX3NpemVHZXR0ZXIoKTtcbiAgICBpZiAodGhpcy5fcHJvcG9ydGlvbkdldHRlcilcbiAgICAgICAgdGhpcy5fb3V0cHV0LnByb3BvcnRpb25zID0gdGhpcy5fcHJvcG9ydGlvbkdldHRlcigpO1xufVxuTW9kaWZpZXIucHJvdG90eXBlLm1vZGlmeSA9IGZ1bmN0aW9uIG1vZGlmeSh0YXJnZXQpIHtcbiAgICBfdXBkYXRlLmNhbGwodGhpcyk7XG4gICAgdGhpcy5fb3V0cHV0LnRhcmdldCA9IHRhcmdldDtcbiAgICByZXR1cm4gdGhpcy5fb3V0cHV0O1xufTtcbm1vZHVsZS5leHBvcnRzID0gTW9kaWZpZXI7IiwidmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4vRXZlbnRIYW5kbGVyJyk7XG5mdW5jdGlvbiBPcHRpb25zTWFuYWdlcih2YWx1ZSkge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5ldmVudE91dHB1dCA9IG51bGw7XG59XG5PcHRpb25zTWFuYWdlci5wYXRjaCA9IGZ1bmN0aW9uIHBhdGNoT2JqZWN0KHNvdXJjZSwgZGF0YSkge1xuICAgIHZhciBtYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHNvdXJjZSk7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXG4gICAgICAgIG1hbmFnZXIucGF0Y2goYXJndW1lbnRzW2ldKTtcbiAgICByZXR1cm4gc291cmNlO1xufTtcbmZ1bmN0aW9uIF9jcmVhdGVFdmVudE91dHB1dCgpIHtcbiAgICB0aGlzLmV2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuZXZlbnRPdXRwdXQuYmluZFRoaXModGhpcyk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5ldmVudE91dHB1dCk7XG59XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUucGF0Y2ggPSBmdW5jdGlvbiBwYXRjaCgpIHtcbiAgICB2YXIgbXlTdGF0ZSA9IHRoaXMuX3ZhbHVlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBkYXRhID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKHZhciBrIGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChrIGluIG15U3RhdGUgJiYgKGRhdGFba10gJiYgZGF0YVtrXS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSAmJiAobXlTdGF0ZVtrXSAmJiBteVN0YXRlW2tdLmNvbnN0cnVjdG9yID09PSBPYmplY3QpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFteVN0YXRlLmhhc093blByb3BlcnR5KGspKVxuICAgICAgICAgICAgICAgICAgICBteVN0YXRlW2tdID0gT2JqZWN0LmNyZWF0ZShteVN0YXRlW2tdKTtcbiAgICAgICAgICAgICAgICB0aGlzLmtleShrKS5wYXRjaChkYXRhW2tdKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ldmVudE91dHB1dClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudE91dHB1dC5lbWl0KCdjaGFuZ2UnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogayxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmtleShrKS52YWx1ZSgpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoaywgZGF0YVtrXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLnNldE9wdGlvbnMgPSBPcHRpb25zTWFuYWdlci5wcm90b3R5cGUucGF0Y2g7XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUua2V5ID0gZnVuY3Rpb24ga2V5KGlkZW50aWZpZXIpIHtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHRoaXMuX3ZhbHVlW2lkZW50aWZpZXJdKTtcbiAgICBpZiAoIShyZXN1bHQuX3ZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB8fCByZXN1bHQuX3ZhbHVlIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIHJlc3VsdC5fdmFsdWUgPSB7fTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgcmV0dXJuIGtleSA/IHRoaXMuX3ZhbHVlW2tleV0gOiB0aGlzLl92YWx1ZTtcbn07XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUuZ2V0T3B0aW9ucyA9IE9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5nZXQ7XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpIHtcbiAgICB2YXIgb3JpZ2luYWxWYWx1ZSA9IHRoaXMuZ2V0KGtleSk7XG4gICAgdGhpcy5fdmFsdWVba2V5XSA9IHZhbHVlO1xuICAgIGlmICh0aGlzLmV2ZW50T3V0cHV0ICYmIHZhbHVlICE9PSBvcmlnaW5hbFZhbHVlKVxuICAgICAgICB0aGlzLmV2ZW50T3V0cHV0LmVtaXQoJ2NoYW5nZScsIHtcbiAgICAgICAgICAgIGlkOiBrZXksXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMub24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcigpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gcGlwZSgpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5waXBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLnVucGlwZSA9IGZ1bmN0aW9uIHVucGlwZSgpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy51bnBpcGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IE9wdGlvbnNNYW5hZ2VyOyIsInZhciBFbnRpdHkgPSByZXF1aXJlKCcuL0VudGl0eScpO1xudmFyIFNwZWNQYXJzZXIgPSByZXF1aXJlKCcuL1NwZWNQYXJzZXInKTtcbmZ1bmN0aW9uIFJlbmRlck5vZGUob2JqZWN0KSB7XG4gICAgdGhpcy5fb2JqZWN0ID0gbnVsbDtcbiAgICB0aGlzLl9jaGlsZCA9IG51bGw7XG4gICAgdGhpcy5faGFzTXVsdGlwbGVDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMuX2lzUmVuZGVyYWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuX2lzTW9kaWZpZXIgPSBmYWxzZTtcbiAgICB0aGlzLl9yZXN1bHRDYWNoZSA9IHt9O1xuICAgIHRoaXMuX3ByZXZSZXN1bHRzID0ge307XG4gICAgdGhpcy5fY2hpbGRSZXN1bHQgPSBudWxsO1xuICAgIGlmIChvYmplY3QpXG4gICAgICAgIHRoaXMuc2V0KG9iamVjdCk7XG59XG5SZW5kZXJOb2RlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQoY2hpbGQpIHtcbiAgICB2YXIgY2hpbGROb2RlID0gY2hpbGQgaW5zdGFuY2VvZiBSZW5kZXJOb2RlID8gY2hpbGQgOiBuZXcgUmVuZGVyTm9kZShjaGlsZCk7XG4gICAgaWYgKHRoaXMuX2NoaWxkIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIHRoaXMuX2NoaWxkLnB1c2goY2hpbGROb2RlKTtcbiAgICBlbHNlIGlmICh0aGlzLl9jaGlsZCkge1xuICAgICAgICB0aGlzLl9jaGlsZCA9IFtcbiAgICAgICAgICAgIHRoaXMuX2NoaWxkLFxuICAgICAgICAgICAgY2hpbGROb2RlXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuX2hhc011bHRpcGxlQ2hpbGRyZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLl9jaGlsZFJlc3VsdCA9IFtdO1xuICAgIH0gZWxzZVxuICAgICAgICB0aGlzLl9jaGlsZCA9IGNoaWxkTm9kZTtcbiAgICByZXR1cm4gY2hpbGROb2RlO1xufTtcblJlbmRlck5vZGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gdGhpcy5fb2JqZWN0IHx8ICh0aGlzLl9oYXNNdWx0aXBsZUNoaWxkcmVuID8gbnVsbCA6IHRoaXMuX2NoaWxkID8gdGhpcy5fY2hpbGQuZ2V0KCkgOiBudWxsKTtcbn07XG5SZW5kZXJOb2RlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoY2hpbGQpIHtcbiAgICB0aGlzLl9jaGlsZFJlc3VsdCA9IG51bGw7XG4gICAgdGhpcy5faGFzTXVsdGlwbGVDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMuX2lzUmVuZGVyYWJsZSA9IGNoaWxkLnJlbmRlciA/IHRydWUgOiBmYWxzZTtcbiAgICB0aGlzLl9pc01vZGlmaWVyID0gY2hpbGQubW9kaWZ5ID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHRoaXMuX29iamVjdCA9IGNoaWxkO1xuICAgIHRoaXMuX2NoaWxkID0gbnVsbDtcbiAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBSZW5kZXJOb2RlKVxuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gdGhpcztcbn07XG5SZW5kZXJOb2RlLnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gZ2V0U2l6ZSgpIHtcbiAgICB2YXIgcmVzdWx0ID0gbnVsbDtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5nZXQoKTtcbiAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5nZXRTaXplKVxuICAgICAgICByZXN1bHQgPSB0YXJnZXQuZ2V0U2l6ZSgpO1xuICAgIGlmICghcmVzdWx0ICYmIHRoaXMuX2NoaWxkICYmIHRoaXMuX2NoaWxkLmdldFNpemUpXG4gICAgICAgIHJlc3VsdCA9IHRoaXMuX2NoaWxkLmdldFNpemUoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbmZ1bmN0aW9uIF9hcHBseUNvbW1pdChzcGVjLCBjb250ZXh0LCBjYWNoZVN0b3JhZ2UpIHtcbiAgICB2YXIgcmVzdWx0ID0gU3BlY1BhcnNlci5wYXJzZShzcGVjLCBjb250ZXh0KTtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHJlc3VsdCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBpZCA9IGtleXNbaV07XG4gICAgICAgIHZhciBjaGlsZE5vZGUgPSBFbnRpdHkuZ2V0KGlkKTtcbiAgICAgICAgdmFyIGNvbW1pdFBhcmFtcyA9IHJlc3VsdFtpZF07XG4gICAgICAgIGNvbW1pdFBhcmFtcy5hbGxvY2F0b3IgPSBjb250ZXh0LmFsbG9jYXRvcjtcbiAgICAgICAgdmFyIGNvbW1pdFJlc3VsdCA9IGNoaWxkTm9kZS5jb21taXQoY29tbWl0UGFyYW1zKTtcbiAgICAgICAgaWYgKGNvbW1pdFJlc3VsdClcbiAgICAgICAgICAgIF9hcHBseUNvbW1pdChjb21taXRSZXN1bHQsIGNvbnRleHQsIGNhY2hlU3RvcmFnZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNhY2hlU3RvcmFnZVtpZF0gPSBjb21taXRQYXJhbXM7XG4gICAgfVxufVxuUmVuZGVyTm9kZS5wcm90b3R5cGUuY29tbWl0ID0gZnVuY3Rpb24gY29tbWl0KGNvbnRleHQpIHtcbiAgICB2YXIgcHJldktleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9wcmV2UmVzdWx0cyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmV2S2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaWQgPSBwcmV2S2V5c1tpXTtcbiAgICAgICAgaWYgKHRoaXMuX3Jlc3VsdENhY2hlW2lkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0gRW50aXR5LmdldChpZCk7XG4gICAgICAgICAgICBpZiAob2JqZWN0LmNsZWFudXApXG4gICAgICAgICAgICAgICAgb2JqZWN0LmNsZWFudXAoY29udGV4dC5hbGxvY2F0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3ByZXZSZXN1bHRzID0gdGhpcy5fcmVzdWx0Q2FjaGU7XG4gICAgdGhpcy5fcmVzdWx0Q2FjaGUgPSB7fTtcbiAgICBfYXBwbHlDb21taXQodGhpcy5yZW5kZXIoKSwgY29udGV4dCwgdGhpcy5fcmVzdWx0Q2FjaGUpO1xufTtcblJlbmRlck5vZGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5faXNSZW5kZXJhYmxlKVxuICAgICAgICByZXR1cm4gdGhpcy5fb2JqZWN0LnJlbmRlcigpO1xuICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgIGlmICh0aGlzLl9oYXNNdWx0aXBsZUNoaWxkcmVuKSB7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuX2NoaWxkUmVzdWx0O1xuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLl9jaGlsZDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0W2ldID0gY2hpbGRyZW5baV0ucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuX2NoaWxkKVxuICAgICAgICByZXN1bHQgPSB0aGlzLl9jaGlsZC5yZW5kZXIoKTtcbiAgICByZXR1cm4gdGhpcy5faXNNb2RpZmllciA/IHRoaXMuX29iamVjdC5tb2RpZnkocmVzdWx0KSA6IHJlc3VsdDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFJlbmRlck5vZGU7IiwidmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJy4vVHJhbnNmb3JtJyk7XG5mdW5jdGlvbiBTcGVjUGFyc2VyKCkge1xuICAgIHRoaXMucmVzdWx0ID0ge307XG59XG5TcGVjUGFyc2VyLl9pbnN0YW5jZSA9IG5ldyBTcGVjUGFyc2VyKCk7XG5TcGVjUGFyc2VyLnBhcnNlID0gZnVuY3Rpb24gcGFyc2Uoc3BlYywgY29udGV4dCkge1xuICAgIHJldHVybiBTcGVjUGFyc2VyLl9pbnN0YW5jZS5wYXJzZShzcGVjLCBjb250ZXh0KTtcbn07XG5TcGVjUGFyc2VyLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKHNwZWMsIGNvbnRleHQpIHtcbiAgICB0aGlzLnJlc2V0KCk7XG4gICAgdGhpcy5fcGFyc2VTcGVjKHNwZWMsIGNvbnRleHQsIFRyYW5zZm9ybS5pZGVudGl0eSk7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0O1xufTtcblNwZWNQYXJzZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgdGhpcy5yZXN1bHQgPSB7fTtcbn07XG5mdW5jdGlvbiBfdmVjSW5Db250ZXh0KHYsIG0pIHtcbiAgICByZXR1cm4gW1xuICAgICAgICB2WzBdICogbVswXSArIHZbMV0gKiBtWzRdICsgdlsyXSAqIG1bOF0sXG4gICAgICAgIHZbMF0gKiBtWzFdICsgdlsxXSAqIG1bNV0gKyB2WzJdICogbVs5XSxcbiAgICAgICAgdlswXSAqIG1bMl0gKyB2WzFdICogbVs2XSArIHZbMl0gKiBtWzEwXVxuICAgIF07XG59XG52YXIgX3plcm9aZXJvID0gW1xuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXTtcblNwZWNQYXJzZXIucHJvdG90eXBlLl9wYXJzZVNwZWMgPSBmdW5jdGlvbiBfcGFyc2VTcGVjKHNwZWMsIHBhcmVudENvbnRleHQsIHNpemVDb250ZXh0KSB7XG4gICAgdmFyIGlkO1xuICAgIHZhciB0YXJnZXQ7XG4gICAgdmFyIHRyYW5zZm9ybTtcbiAgICB2YXIgb3BhY2l0eTtcbiAgICB2YXIgb3JpZ2luO1xuICAgIHZhciBhbGlnbjtcbiAgICB2YXIgc2l6ZTtcbiAgICBpZiAodHlwZW9mIHNwZWMgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGlkID0gc3BlYztcbiAgICAgICAgdHJhbnNmb3JtID0gcGFyZW50Q29udGV4dC50cmFuc2Zvcm07XG4gICAgICAgIGFsaWduID0gcGFyZW50Q29udGV4dC5hbGlnbiB8fCBfemVyb1plcm87XG4gICAgICAgIGlmIChwYXJlbnRDb250ZXh0LnNpemUgJiYgYWxpZ24gJiYgKGFsaWduWzBdIHx8IGFsaWduWzFdKSkge1xuICAgICAgICAgICAgdmFyIGFsaWduQWRqdXN0ID0gW1xuICAgICAgICAgICAgICAgICAgICBhbGlnblswXSAqIHBhcmVudENvbnRleHQuc2l6ZVswXSxcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25bMV0gKiBwYXJlbnRDb250ZXh0LnNpemVbMV0sXG4gICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgdHJhbnNmb3JtID0gVHJhbnNmb3JtLnRoZW5Nb3ZlKHRyYW5zZm9ybSwgX3ZlY0luQ29udGV4dChhbGlnbkFkanVzdCwgc2l6ZUNvbnRleHQpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc3VsdFtpZF0gPSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICAgICAgICAgIG9wYWNpdHk6IHBhcmVudENvbnRleHQub3BhY2l0eSxcbiAgICAgICAgICAgIG9yaWdpbjogcGFyZW50Q29udGV4dC5vcmlnaW4gfHwgX3plcm9aZXJvLFxuICAgICAgICAgICAgYWxpZ246IHBhcmVudENvbnRleHQuYWxpZ24gfHwgX3plcm9aZXJvLFxuICAgICAgICAgICAgc2l6ZTogcGFyZW50Q29udGV4dC5zaXplXG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmICghc3BlYykge1xuICAgICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmIChzcGVjIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzcGVjLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJzZVNwZWMoc3BlY1tpXSwgcGFyZW50Q29udGV4dCwgc2l6ZUNvbnRleHQpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0ID0gc3BlYy50YXJnZXQ7XG4gICAgICAgIHRyYW5zZm9ybSA9IHBhcmVudENvbnRleHQudHJhbnNmb3JtO1xuICAgICAgICBvcGFjaXR5ID0gcGFyZW50Q29udGV4dC5vcGFjaXR5O1xuICAgICAgICBvcmlnaW4gPSBwYXJlbnRDb250ZXh0Lm9yaWdpbjtcbiAgICAgICAgYWxpZ24gPSBwYXJlbnRDb250ZXh0LmFsaWduO1xuICAgICAgICBzaXplID0gcGFyZW50Q29udGV4dC5zaXplO1xuICAgICAgICB2YXIgbmV4dFNpemVDb250ZXh0ID0gc2l6ZUNvbnRleHQ7XG4gICAgICAgIGlmIChzcGVjLm9wYWNpdHkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIG9wYWNpdHkgPSBwYXJlbnRDb250ZXh0Lm9wYWNpdHkgKiBzcGVjLm9wYWNpdHk7XG4gICAgICAgIGlmIChzcGVjLnRyYW5zZm9ybSlcbiAgICAgICAgICAgIHRyYW5zZm9ybSA9IFRyYW5zZm9ybS5tdWx0aXBseShwYXJlbnRDb250ZXh0LnRyYW5zZm9ybSwgc3BlYy50cmFuc2Zvcm0pO1xuICAgICAgICBpZiAoc3BlYy5vcmlnaW4pIHtcbiAgICAgICAgICAgIG9yaWdpbiA9IHNwZWMub3JpZ2luO1xuICAgICAgICAgICAgbmV4dFNpemVDb250ZXh0ID0gcGFyZW50Q29udGV4dC50cmFuc2Zvcm07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNwZWMuYWxpZ24pXG4gICAgICAgICAgICBhbGlnbiA9IHNwZWMuYWxpZ247XG4gICAgICAgIGlmIChzcGVjLnNpemUgfHwgc3BlYy5wcm9wb3J0aW9ucykge1xuICAgICAgICAgICAgdmFyIHBhcmVudFNpemUgPSBzaXplO1xuICAgICAgICAgICAgc2l6ZSA9IFtcbiAgICAgICAgICAgICAgICBzaXplWzBdLFxuICAgICAgICAgICAgICAgIHNpemVbMV1cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAoc3BlYy5zaXplKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNwZWMuc2l6ZVswXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICBzaXplWzBdID0gc3BlYy5zaXplWzBdO1xuICAgICAgICAgICAgICAgIGlmIChzcGVjLnNpemVbMV0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgc2l6ZVsxXSA9IHNwZWMuc2l6ZVsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzcGVjLnByb3BvcnRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNwZWMucHJvcG9ydGlvbnNbMF0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgc2l6ZVswXSA9IHNpemVbMF0gKiBzcGVjLnByb3BvcnRpb25zWzBdO1xuICAgICAgICAgICAgICAgIGlmIChzcGVjLnByb3BvcnRpb25zWzFdICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgIHNpemVbMV0gPSBzaXplWzFdICogc3BlYy5wcm9wb3J0aW9uc1sxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJlbnRTaXplKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFsaWduICYmIChhbGlnblswXSB8fCBhbGlnblsxXSkpXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybSA9IFRyYW5zZm9ybS50aGVuTW92ZSh0cmFuc2Zvcm0sIF92ZWNJbkNvbnRleHQoW1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25bMF0gKiBwYXJlbnRTaXplWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25bMV0gKiBwYXJlbnRTaXplWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgICAgICBdLCBzaXplQ29udGV4dCkpO1xuICAgICAgICAgICAgICAgIGlmIChvcmlnaW4gJiYgKG9yaWdpblswXSB8fCBvcmlnaW5bMV0pKVxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gPSBUcmFuc2Zvcm0ubW92ZVRoZW4oW1xuICAgICAgICAgICAgICAgICAgICAgICAgLW9yaWdpblswXSAqIHNpemVbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAtb3JpZ2luWzFdICogc2l6ZVsxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICAgICAgXSwgdHJhbnNmb3JtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5leHRTaXplQ29udGV4dCA9IHBhcmVudENvbnRleHQudHJhbnNmb3JtO1xuICAgICAgICAgICAgb3JpZ2luID0gbnVsbDtcbiAgICAgICAgICAgIGFsaWduID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wYXJzZVNwZWModGFyZ2V0LCB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICAgICAgICAgIG9wYWNpdHk6IG9wYWNpdHksXG4gICAgICAgICAgICBvcmlnaW46IG9yaWdpbixcbiAgICAgICAgICAgIGFsaWduOiBhbGlnbixcbiAgICAgICAgICAgIHNpemU6IHNpemVcbiAgICAgICAgfSwgbmV4dFNpemVDb250ZXh0KTtcbiAgICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTcGVjUGFyc2VyOyIsInZhciBFbGVtZW50T3V0cHV0ID0gcmVxdWlyZSgnLi9FbGVtZW50T3V0cHV0Jyk7XG5mdW5jdGlvbiBTdXJmYWNlKG9wdGlvbnMpIHtcbiAgICBFbGVtZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgdGhpcy5vcHRpb25zID0ge307XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0ge307XG4gICAgdGhpcy5hdHRyaWJ1dGVzID0ge307XG4gICAgdGhpcy5jb250ZW50ID0gJyc7XG4gICAgdGhpcy5jbGFzc0xpc3QgPSBbXTtcbiAgICB0aGlzLnNpemUgPSBudWxsO1xuICAgIHRoaXMuX2NsYXNzZXNEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fc3R5bGVzRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX2F0dHJpYnV0ZXNEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fc2l6ZURpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl9jb250ZW50RGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX3RydWVTaXplQ2hlY2sgPSB0cnVlO1xuICAgIHRoaXMuX2RpcnR5Q2xhc3NlcyA9IFtdO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fY3VycmVudFRhcmdldCA9IG51bGw7XG59XG5TdXJmYWNlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRWxlbWVudE91dHB1dC5wcm90b3R5cGUpO1xuU3VyZmFjZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTdXJmYWNlO1xuU3VyZmFjZS5wcm90b3R5cGUuZWxlbWVudFR5cGUgPSAnZGl2JztcblN1cmZhY2UucHJvdG90eXBlLmVsZW1lbnRDbGFzcyA9ICdmYW1vdXMtc3VyZmFjZSc7XG5TdXJmYWNlLnByb3RvdHlwZS5zZXRBdHRyaWJ1dGVzID0gZnVuY3Rpb24gc2V0QXR0cmlidXRlcyhhdHRyaWJ1dGVzKSB7XG4gICAgZm9yICh2YXIgbiBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGlmIChuID09PSAnc3R5bGUnKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgc2V0IHN0eWxlcyB2aWEgXCJzZXRBdHRyaWJ1dGVzXCIgYXMgaXQgd2lsbCBicmVhayBGYW1vLnVzLiAgVXNlIFwic2V0UHJvcGVydGllc1wiIGluc3RlYWQuJyk7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlc1tuXSA9IGF0dHJpYnV0ZXNbbl07XG4gICAgfVxuICAgIHRoaXMuX2F0dHJpYnV0ZXNEaXJ0eSA9IHRydWU7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuZ2V0QXR0cmlidXRlcyA9IGZ1bmN0aW9uIGdldEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlcztcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5zZXRQcm9wZXJ0aWVzID0gZnVuY3Rpb24gc2V0UHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgZm9yICh2YXIgbiBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHRoaXMucHJvcGVydGllc1tuXSA9IHByb3BlcnRpZXNbbl07XG4gICAgfVxuICAgIHRoaXMuX3N0eWxlc0RpcnR5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5nZXRQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZ2V0UHJvcGVydGllcygpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzO1xufTtcblN1cmZhY2UucHJvdG90eXBlLmFkZENsYXNzID0gZnVuY3Rpb24gYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgaWYgKHRoaXMuY2xhc3NMaXN0LmluZGV4T2YoY2xhc3NOYW1lKSA8IDApIHtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucHVzaChjbGFzc05hbWUpO1xuICAgICAgICB0aGlzLl9jbGFzc2VzRGlydHkgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xuICAgIHZhciBpID0gdGhpcy5jbGFzc0xpc3QuaW5kZXhPZihjbGFzc05hbWUpO1xuICAgIGlmIChpID49IDApIHtcbiAgICAgICAgdGhpcy5fZGlydHlDbGFzc2VzLnB1c2godGhpcy5jbGFzc0xpc3Quc3BsaWNlKGksIDEpWzBdKTtcbiAgICAgICAgdGhpcy5fY2xhc3Nlc0RpcnR5ID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUudG9nZ2xlQ2xhc3MgPSBmdW5jdGlvbiB0b2dnbGVDbGFzcyhjbGFzc05hbWUpIHtcbiAgICB2YXIgaSA9IHRoaXMuY2xhc3NMaXN0LmluZGV4T2YoY2xhc3NOYW1lKTtcbiAgICBpZiAoaSA+PSAwKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFkZENsYXNzKGNsYXNzTmFtZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblN1cmZhY2UucHJvdG90eXBlLnNldENsYXNzZXMgPSBmdW5jdGlvbiBzZXRDbGFzc2VzKGNsYXNzTGlzdCkge1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcmVtb3ZhbCA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmNsYXNzTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY2xhc3NMaXN0LmluZGV4T2YodGhpcy5jbGFzc0xpc3RbaV0pIDwgMClcbiAgICAgICAgICAgIHJlbW92YWwucHVzaCh0aGlzLmNsYXNzTGlzdFtpXSk7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCByZW1vdmFsLmxlbmd0aDsgaSsrKVxuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKHJlbW92YWxbaV0pO1xuICAgIGZvciAoaSA9IDA7IGkgPCBjbGFzc0xpc3QubGVuZ3RoOyBpKyspXG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoY2xhc3NMaXN0W2ldKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5nZXRDbGFzc0xpc3QgPSBmdW5jdGlvbiBnZXRDbGFzc0xpc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xhc3NMaXN0O1xufTtcblN1cmZhY2UucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiBzZXRDb250ZW50KGNvbnRlbnQpIHtcbiAgICBpZiAodGhpcy5jb250ZW50ICE9PSBjb250ZW50KSB7XG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIHRoaXMuX2NvbnRlbnREaXJ0eSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblN1cmZhY2UucHJvdG90eXBlLmdldENvbnRlbnQgPSBmdW5jdGlvbiBnZXRDb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQ7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLnNpemUpXG4gICAgICAgIHRoaXMuc2V0U2l6ZShvcHRpb25zLnNpemUpO1xuICAgIGlmIChvcHRpb25zLmNsYXNzZXMpXG4gICAgICAgIHRoaXMuc2V0Q2xhc3NlcyhvcHRpb25zLmNsYXNzZXMpO1xuICAgIGlmIChvcHRpb25zLnByb3BlcnRpZXMpXG4gICAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhvcHRpb25zLnByb3BlcnRpZXMpO1xuICAgIGlmIChvcHRpb25zLmF0dHJpYnV0ZXMpXG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlcyhvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICAgIGlmIChvcHRpb25zLmNvbnRlbnQpXG4gICAgICAgIHRoaXMuc2V0Q29udGVudChvcHRpb25zLmNvbnRlbnQpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbmZ1bmN0aW9uIF9jbGVhbnVwQ2xhc3Nlcyh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2RpcnR5Q2xhc3Nlcy5sZW5ndGg7IGkrKylcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fZGlydHlDbGFzc2VzW2ldKTtcbiAgICB0aGlzLl9kaXJ0eUNsYXNzZXMgPSBbXTtcbn1cbmZ1bmN0aW9uIF9hcHBseVN0eWxlcyh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBuIGluIHRoaXMucHJvcGVydGllcykge1xuICAgICAgICB0YXJnZXQuc3R5bGVbbl0gPSB0aGlzLnByb3BlcnRpZXNbbl07XG4gICAgfVxufVxuZnVuY3Rpb24gX2NsZWFudXBTdHlsZXModGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgbiBpbiB0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgICAgdGFyZ2V0LnN0eWxlW25dID0gJyc7XG4gICAgfVxufVxuZnVuY3Rpb24gX2FwcGx5QXR0cmlidXRlcyh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBuIGluIHRoaXMuYXR0cmlidXRlcykge1xuICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKG4sIHRoaXMuYXR0cmlidXRlc1tuXSk7XG4gICAgfVxufVxuZnVuY3Rpb24gX2NsZWFudXBBdHRyaWJ1dGVzKHRhcmdldCkge1xuICAgIGZvciAodmFyIG4gaW4gdGhpcy5hdHRyaWJ1dGVzKSB7XG4gICAgICAgIHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUobik7XG4gICAgfVxufVxuZnVuY3Rpb24gX3h5Tm90RXF1YWxzKGEsIGIpIHtcbiAgICByZXR1cm4gYSAmJiBiID8gYVswXSAhPT0gYlswXSB8fCBhWzFdICE9PSBiWzFdIDogYSAhPT0gYjtcbn1cblN1cmZhY2UucHJvdG90eXBlLnNldHVwID0gZnVuY3Rpb24gc2V0dXAoYWxsb2NhdG9yKSB7XG4gICAgdmFyIHRhcmdldCA9IGFsbG9jYXRvci5hbGxvY2F0ZSh0aGlzLmVsZW1lbnRUeXBlKTtcbiAgICBpZiAodGhpcy5lbGVtZW50Q2xhc3MpIHtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudENsYXNzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lbGVtZW50Q2xhc3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCh0aGlzLmVsZW1lbnRDbGFzc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCh0aGlzLmVsZW1lbnRDbGFzcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICB0aGlzLmF0dGFjaCh0YXJnZXQpO1xuICAgIHRoaXMuX29wYWNpdHkgPSBudWxsO1xuICAgIHRoaXMuX2N1cnJlbnRUYXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5fc3R5bGVzRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX2NsYXNzZXNEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fYXR0cmlidXRlc0RpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl9zaXplRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX2NvbnRlbnREaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fb3JpZ2luRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX3RyYW5zZm9ybURpcnR5ID0gdHJ1ZTtcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5jb21taXQgPSBmdW5jdGlvbiBjb21taXQoY29udGV4dCkge1xuICAgIGlmICghdGhpcy5fY3VycmVudFRhcmdldClcbiAgICAgICAgdGhpcy5zZXR1cChjb250ZXh0LmFsbG9jYXRvcik7XG4gICAgdmFyIHRhcmdldCA9IHRoaXMuX2N1cnJlbnRUYXJnZXQ7XG4gICAgdmFyIHNpemUgPSBjb250ZXh0LnNpemU7XG4gICAgaWYgKHRoaXMuX2NsYXNzZXNEaXJ0eSkge1xuICAgICAgICBfY2xlYW51cENsYXNzZXMuY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgICAgICB2YXIgY2xhc3NMaXN0ID0gdGhpcy5nZXRDbGFzc0xpc3QoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc0xpc3QubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChjbGFzc0xpc3RbaV0pO1xuICAgICAgICB0aGlzLl9jbGFzc2VzRGlydHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fdHJ1ZVNpemVDaGVjayA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zdHlsZXNEaXJ0eSkge1xuICAgICAgICBfYXBwbHlTdHlsZXMuY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgICAgICB0aGlzLl9zdHlsZXNEaXJ0eSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl90cnVlU2l6ZUNoZWNrID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2F0dHJpYnV0ZXNEaXJ0eSkge1xuICAgICAgICBfYXBwbHlBdHRyaWJ1dGVzLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgdGhpcy5fYXR0cmlidXRlc0RpcnR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3RydWVTaXplQ2hlY2sgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaXplKSB7XG4gICAgICAgIHZhciBvcmlnU2l6ZSA9IGNvbnRleHQuc2l6ZTtcbiAgICAgICAgc2l6ZSA9IFtcbiAgICAgICAgICAgIHRoaXMuc2l6ZVswXSxcbiAgICAgICAgICAgIHRoaXMuc2l6ZVsxXVxuICAgICAgICBdO1xuICAgICAgICBpZiAoc2l6ZVswXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgc2l6ZVswXSA9IG9yaWdTaXplWzBdO1xuICAgICAgICBpZiAoc2l6ZVsxXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgc2l6ZVsxXSA9IG9yaWdTaXplWzFdO1xuICAgICAgICBpZiAoc2l6ZVswXSA9PT0gdHJ1ZSB8fCBzaXplWzFdID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAoc2l6ZVswXSA9PT0gdHJ1ZSAmJiAodGhpcy5fdHJ1ZVNpemVDaGVjayB8fCB0aGlzLl9zaXplWzBdID09PSAwKSkge1xuICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IHRhcmdldC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2l6ZSAmJiB0aGlzLl9zaXplWzBdICE9PSB3aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaXplWzBdID0gd2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NpemVEaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNpemVbMF0gPSB3aWR0aDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NpemUpXG4gICAgICAgICAgICAgICAgICAgIHNpemVbMF0gPSB0aGlzLl9zaXplWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNpemVbMV0gPT09IHRydWUgJiYgKHRoaXMuX3RydWVTaXplQ2hlY2sgfHwgdGhpcy5fc2l6ZVsxXSA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ID0gdGFyZ2V0Lm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2l6ZSAmJiB0aGlzLl9zaXplWzFdICE9PSBoZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2l6ZVsxXSA9IGhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2l6ZURpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2l6ZVsxXSA9IGhlaWdodDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NpemUpXG4gICAgICAgICAgICAgICAgICAgIHNpemVbMV0gPSB0aGlzLl9zaXplWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdHJ1ZVNpemVDaGVjayA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChfeHlOb3RFcXVhbHModGhpcy5fc2l6ZSwgc2l6ZSkpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9zaXplKVxuICAgICAgICAgICAgdGhpcy5fc2l6ZSA9IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF07XG4gICAgICAgIHRoaXMuX3NpemVbMF0gPSBzaXplWzBdO1xuICAgICAgICB0aGlzLl9zaXplWzFdID0gc2l6ZVsxXTtcbiAgICAgICAgdGhpcy5fc2l6ZURpcnR5ID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3NpemVEaXJ0eSkge1xuICAgICAgICBpZiAodGhpcy5fc2l6ZSkge1xuICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLndpZHRoID0gdGhpcy5zaXplICYmIHRoaXMuc2l6ZVswXSA9PT0gdHJ1ZSA/ICcnIDogdGhpcy5fc2l6ZVswXSArICdweCc7XG4gICAgICAgICAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gdGhpcy5zaXplICYmIHRoaXMuc2l6ZVsxXSA9PT0gdHJ1ZSA/ICcnIDogdGhpcy5fc2l6ZVsxXSArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgncmVzaXplJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9jb250ZW50RGlydHkpIHtcbiAgICAgICAgdGhpcy5kZXBsb3kodGFyZ2V0KTtcbiAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnZGVwbG95Jyk7XG4gICAgICAgIHRoaXMuX2NvbnRlbnREaXJ0eSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl90cnVlU2l6ZUNoZWNrID0gdHJ1ZTtcbiAgICB9XG4gICAgRWxlbWVudE91dHB1dC5wcm90b3R5cGUuY29tbWl0LmNhbGwodGhpcywgY29udGV4dCk7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuY2xlYW51cCA9IGZ1bmN0aW9uIGNsZWFudXAoYWxsb2NhdG9yKSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciB0YXJnZXQgPSB0aGlzLl9jdXJyZW50VGFyZ2V0O1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3JlY2FsbCcpO1xuICAgIHRoaXMucmVjYWxsKHRhcmdldCk7XG4gICAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgdGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAnJztcbiAgICB0YXJnZXQuc3R5bGUud2lkdGggPSAnJztcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gJyc7XG4gICAgX2NsZWFudXBTdHlsZXMuY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgIF9jbGVhbnVwQXR0cmlidXRlcy5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgdmFyIGNsYXNzTGlzdCA9IHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XG4gICAgX2NsZWFudXBDbGFzc2VzLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgY2xhc3NMaXN0Lmxlbmd0aDsgaSsrKVxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc0xpc3RbaV0pO1xuICAgIGlmICh0aGlzLmVsZW1lbnRDbGFzcykge1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50Q2xhc3MgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuZWxlbWVudENsYXNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5lbGVtZW50Q2xhc3NbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5lbGVtZW50Q2xhc3MpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuZGV0YWNoKHRhcmdldCk7XG4gICAgdGhpcy5fY3VycmVudFRhcmdldCA9IG51bGw7XG4gICAgYWxsb2NhdG9yLmRlYWxsb2NhdGUodGFyZ2V0KTtcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5kZXBsb3kgPSBmdW5jdGlvbiBkZXBsb3kodGFyZ2V0KSB7XG4gICAgdmFyIGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKTtcbiAgICBpZiAoY29udGVudCBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICAgICAgd2hpbGUgKHRhcmdldC5oYXNDaGlsZE5vZGVzKCkpXG4gICAgICAgICAgICB0YXJnZXQucmVtb3ZlQ2hpbGQodGFyZ2V0LmZpcnN0Q2hpbGQpO1xuICAgICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgfSBlbHNlXG4gICAgICAgIHRhcmdldC5pbm5lckhUTUwgPSBjb250ZW50O1xufTtcblN1cmZhY2UucHJvdG90eXBlLnJlY2FsbCA9IGZ1bmN0aW9uIHJlY2FsbCh0YXJnZXQpIHtcbiAgICB2YXIgZGYgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgd2hpbGUgKHRhcmdldC5oYXNDaGlsZE5vZGVzKCkpXG4gICAgICAgIGRmLmFwcGVuZENoaWxkKHRhcmdldC5maXJzdENoaWxkKTtcbiAgICB0aGlzLnNldENvbnRlbnQoZGYpO1xufTtcblN1cmZhY2UucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9zaXplID8gdGhpcy5fc2l6ZSA6IHRoaXMuc2l6ZTtcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24gc2V0U2l6ZShzaXplKSB7XG4gICAgdGhpcy5zaXplID0gc2l6ZSA/IFtcbiAgICAgICAgc2l6ZVswXSxcbiAgICAgICAgc2l6ZVsxXVxuICAgIF0gOiBudWxsO1xuICAgIHRoaXMuX3NpemVEaXJ0eSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTdXJmYWNlOyIsInZhciBUcmFuc2Zvcm0gPSB7fTtcblRyYW5zZm9ybS5wcmVjaXNpb24gPSAwLjAwMDAwMTtcblRyYW5zZm9ybS5pZGVudGl0eSA9IFtcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxXG5dO1xuVHJhbnNmb3JtLm11bHRpcGx5NHg0ID0gZnVuY3Rpb24gbXVsdGlwbHk0eDQoYSwgYikge1xuICAgIHJldHVybiBbXG4gICAgICAgIGFbMF0gKiBiWzBdICsgYVs0XSAqIGJbMV0gKyBhWzhdICogYlsyXSArIGFbMTJdICogYlszXSxcbiAgICAgICAgYVsxXSAqIGJbMF0gKyBhWzVdICogYlsxXSArIGFbOV0gKiBiWzJdICsgYVsxM10gKiBiWzNdLFxuICAgICAgICBhWzJdICogYlswXSArIGFbNl0gKiBiWzFdICsgYVsxMF0gKiBiWzJdICsgYVsxNF0gKiBiWzNdLFxuICAgICAgICBhWzNdICogYlswXSArIGFbN10gKiBiWzFdICsgYVsxMV0gKiBiWzJdICsgYVsxNV0gKiBiWzNdLFxuICAgICAgICBhWzBdICogYls0XSArIGFbNF0gKiBiWzVdICsgYVs4XSAqIGJbNl0gKyBhWzEyXSAqIGJbN10sXG4gICAgICAgIGFbMV0gKiBiWzRdICsgYVs1XSAqIGJbNV0gKyBhWzldICogYls2XSArIGFbMTNdICogYls3XSxcbiAgICAgICAgYVsyXSAqIGJbNF0gKyBhWzZdICogYls1XSArIGFbMTBdICogYls2XSArIGFbMTRdICogYls3XSxcbiAgICAgICAgYVszXSAqIGJbNF0gKyBhWzddICogYls1XSArIGFbMTFdICogYls2XSArIGFbMTVdICogYls3XSxcbiAgICAgICAgYVswXSAqIGJbOF0gKyBhWzRdICogYls5XSArIGFbOF0gKiBiWzEwXSArIGFbMTJdICogYlsxMV0sXG4gICAgICAgIGFbMV0gKiBiWzhdICsgYVs1XSAqIGJbOV0gKyBhWzldICogYlsxMF0gKyBhWzEzXSAqIGJbMTFdLFxuICAgICAgICBhWzJdICogYls4XSArIGFbNl0gKiBiWzldICsgYVsxMF0gKiBiWzEwXSArIGFbMTRdICogYlsxMV0sXG4gICAgICAgIGFbM10gKiBiWzhdICsgYVs3XSAqIGJbOV0gKyBhWzExXSAqIGJbMTBdICsgYVsxNV0gKiBiWzExXSxcbiAgICAgICAgYVswXSAqIGJbMTJdICsgYVs0XSAqIGJbMTNdICsgYVs4XSAqIGJbMTRdICsgYVsxMl0gKiBiWzE1XSxcbiAgICAgICAgYVsxXSAqIGJbMTJdICsgYVs1XSAqIGJbMTNdICsgYVs5XSAqIGJbMTRdICsgYVsxM10gKiBiWzE1XSxcbiAgICAgICAgYVsyXSAqIGJbMTJdICsgYVs2XSAqIGJbMTNdICsgYVsxMF0gKiBiWzE0XSArIGFbMTRdICogYlsxNV0sXG4gICAgICAgIGFbM10gKiBiWzEyXSArIGFbN10gKiBiWzEzXSArIGFbMTFdICogYlsxNF0gKyBhWzE1XSAqIGJbMTVdXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0ubXVsdGlwbHkgPSBmdW5jdGlvbiBtdWx0aXBseShhLCBiKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgYVswXSAqIGJbMF0gKyBhWzRdICogYlsxXSArIGFbOF0gKiBiWzJdLFxuICAgICAgICBhWzFdICogYlswXSArIGFbNV0gKiBiWzFdICsgYVs5XSAqIGJbMl0sXG4gICAgICAgIGFbMl0gKiBiWzBdICsgYVs2XSAqIGJbMV0gKyBhWzEwXSAqIGJbMl0sXG4gICAgICAgIDAsXG4gICAgICAgIGFbMF0gKiBiWzRdICsgYVs0XSAqIGJbNV0gKyBhWzhdICogYls2XSxcbiAgICAgICAgYVsxXSAqIGJbNF0gKyBhWzVdICogYls1XSArIGFbOV0gKiBiWzZdLFxuICAgICAgICBhWzJdICogYls0XSArIGFbNl0gKiBiWzVdICsgYVsxMF0gKiBiWzZdLFxuICAgICAgICAwLFxuICAgICAgICBhWzBdICogYls4XSArIGFbNF0gKiBiWzldICsgYVs4XSAqIGJbMTBdLFxuICAgICAgICBhWzFdICogYls4XSArIGFbNV0gKiBiWzldICsgYVs5XSAqIGJbMTBdLFxuICAgICAgICBhWzJdICogYls4XSArIGFbNl0gKiBiWzldICsgYVsxMF0gKiBiWzEwXSxcbiAgICAgICAgMCxcbiAgICAgICAgYVswXSAqIGJbMTJdICsgYVs0XSAqIGJbMTNdICsgYVs4XSAqIGJbMTRdICsgYVsxMl0sXG4gICAgICAgIGFbMV0gKiBiWzEyXSArIGFbNV0gKiBiWzEzXSArIGFbOV0gKiBiWzE0XSArIGFbMTNdLFxuICAgICAgICBhWzJdICogYlsxMl0gKyBhWzZdICogYlsxM10gKyBhWzEwXSAqIGJbMTRdICsgYVsxNF0sXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS50aGVuTW92ZSA9IGZ1bmN0aW9uIHRoZW5Nb3ZlKG0sIHQpIHtcbiAgICBpZiAoIXRbMl0pXG4gICAgICAgIHRbMl0gPSAwO1xuICAgIHJldHVybiBbXG4gICAgICAgIG1bMF0sXG4gICAgICAgIG1bMV0sXG4gICAgICAgIG1bMl0sXG4gICAgICAgIDAsXG4gICAgICAgIG1bNF0sXG4gICAgICAgIG1bNV0sXG4gICAgICAgIG1bNl0sXG4gICAgICAgIDAsXG4gICAgICAgIG1bOF0sXG4gICAgICAgIG1bOV0sXG4gICAgICAgIG1bMTBdLFxuICAgICAgICAwLFxuICAgICAgICBtWzEyXSArIHRbMF0sXG4gICAgICAgIG1bMTNdICsgdFsxXSxcbiAgICAgICAgbVsxNF0gKyB0WzJdLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0ubW92ZVRoZW4gPSBmdW5jdGlvbiBtb3ZlVGhlbih2LCBtKSB7XG4gICAgaWYgKCF2WzJdKVxuICAgICAgICB2WzJdID0gMDtcbiAgICB2YXIgdDAgPSB2WzBdICogbVswXSArIHZbMV0gKiBtWzRdICsgdlsyXSAqIG1bOF07XG4gICAgdmFyIHQxID0gdlswXSAqIG1bMV0gKyB2WzFdICogbVs1XSArIHZbMl0gKiBtWzldO1xuICAgIHZhciB0MiA9IHZbMF0gKiBtWzJdICsgdlsxXSAqIG1bNl0gKyB2WzJdICogbVsxMF07XG4gICAgcmV0dXJuIFRyYW5zZm9ybS50aGVuTW92ZShtLCBbXG4gICAgICAgIHQwLFxuICAgICAgICB0MSxcbiAgICAgICAgdDJcbiAgICBdKTtcbn07XG5UcmFuc2Zvcm0udHJhbnNsYXRlID0gZnVuY3Rpb24gdHJhbnNsYXRlKHgsIHksIHopIHtcbiAgICBpZiAoeiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB6ID0gMDtcbiAgICByZXR1cm4gW1xuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICB6LFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0udGhlblNjYWxlID0gZnVuY3Rpb24gdGhlblNjYWxlKG0sIHMpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBzWzBdICogbVswXSxcbiAgICAgICAgc1sxXSAqIG1bMV0sXG4gICAgICAgIHNbMl0gKiBtWzJdLFxuICAgICAgICAwLFxuICAgICAgICBzWzBdICogbVs0XSxcbiAgICAgICAgc1sxXSAqIG1bNV0sXG4gICAgICAgIHNbMl0gKiBtWzZdLFxuICAgICAgICAwLFxuICAgICAgICBzWzBdICogbVs4XSxcbiAgICAgICAgc1sxXSAqIG1bOV0sXG4gICAgICAgIHNbMl0gKiBtWzEwXSxcbiAgICAgICAgMCxcbiAgICAgICAgc1swXSAqIG1bMTJdLFxuICAgICAgICBzWzFdICogbVsxM10sXG4gICAgICAgIHNbMl0gKiBtWzE0XSxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnNjYWxlID0gZnVuY3Rpb24gc2NhbGUoeCwgeSwgeikge1xuICAgIGlmICh6ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHogPSAxO1xuICAgIGlmICh5ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHkgPSB4O1xuICAgIHJldHVybiBbXG4gICAgICAgIHgsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIHksXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIHosXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5yb3RhdGVYID0gZnVuY3Rpb24gcm90YXRlWCh0aGV0YSkge1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgY29zVGhldGEsXG4gICAgICAgIHNpblRoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAtc2luVGhldGEsXG4gICAgICAgIGNvc1RoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0ucm90YXRlWSA9IGZ1bmN0aW9uIHJvdGF0ZVkodGhldGEpIHtcbiAgICB2YXIgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHJldHVybiBbXG4gICAgICAgIGNvc1RoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAtc2luVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIHNpblRoZXRhLFxuICAgICAgICAwLFxuICAgICAgICBjb3NUaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnJvdGF0ZVogPSBmdW5jdGlvbiByb3RhdGVaKHRoZXRhKSB7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICByZXR1cm4gW1xuICAgICAgICBjb3NUaGV0YSxcbiAgICAgICAgc2luVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIC1zaW5UaGV0YSxcbiAgICAgICAgY29zVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5yb3RhdGUgPSBmdW5jdGlvbiByb3RhdGUocGhpLCB0aGV0YSwgcHNpKSB7XG4gICAgdmFyIGNvc1BoaSA9IE1hdGguY29zKHBoaSk7XG4gICAgdmFyIHNpblBoaSA9IE1hdGguc2luKHBoaSk7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICB2YXIgY29zUHNpID0gTWF0aC5jb3MocHNpKTtcbiAgICB2YXIgc2luUHNpID0gTWF0aC5zaW4ocHNpKTtcbiAgICB2YXIgcmVzdWx0ID0gW1xuICAgICAgICAgICAgY29zVGhldGEgKiBjb3NQc2ksXG4gICAgICAgICAgICBjb3NQaGkgKiBzaW5Qc2kgKyBzaW5QaGkgKiBzaW5UaGV0YSAqIGNvc1BzaSxcbiAgICAgICAgICAgIHNpblBoaSAqIHNpblBzaSAtIGNvc1BoaSAqIHNpblRoZXRhICogY29zUHNpLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIC1jb3NUaGV0YSAqIHNpblBzaSxcbiAgICAgICAgICAgIGNvc1BoaSAqIGNvc1BzaSAtIHNpblBoaSAqIHNpblRoZXRhICogc2luUHNpLFxuICAgICAgICAgICAgc2luUGhpICogY29zUHNpICsgY29zUGhpICogc2luVGhldGEgKiBzaW5Qc2ksXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgc2luVGhldGEsXG4gICAgICAgICAgICAtc2luUGhpICogY29zVGhldGEsXG4gICAgICAgICAgICBjb3NQaGkgKiBjb3NUaGV0YSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAxXG4gICAgICAgIF07XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5UcmFuc2Zvcm0ucm90YXRlQXhpcyA9IGZ1bmN0aW9uIHJvdGF0ZUF4aXModiwgdGhldGEpIHtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciB2ZXJUaGV0YSA9IDEgLSBjb3NUaGV0YTtcbiAgICB2YXIgeHhWID0gdlswXSAqIHZbMF0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgeHlWID0gdlswXSAqIHZbMV0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgeHpWID0gdlswXSAqIHZbMl0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgeXlWID0gdlsxXSAqIHZbMV0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgeXpWID0gdlsxXSAqIHZbMl0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgenpWID0gdlsyXSAqIHZbMl0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgeHMgPSB2WzBdICogc2luVGhldGE7XG4gICAgdmFyIHlzID0gdlsxXSAqIHNpblRoZXRhO1xuICAgIHZhciB6cyA9IHZbMl0gKiBzaW5UaGV0YTtcbiAgICB2YXIgcmVzdWx0ID0gW1xuICAgICAgICAgICAgeHhWICsgY29zVGhldGEsXG4gICAgICAgICAgICB4eVYgKyB6cyxcbiAgICAgICAgICAgIHh6ViAtIHlzLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHh5ViAtIHpzLFxuICAgICAgICAgICAgeXlWICsgY29zVGhldGEsXG4gICAgICAgICAgICB5elYgKyB4cyxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB4elYgKyB5cyxcbiAgICAgICAgICAgIHl6ViAtIHhzLFxuICAgICAgICAgICAgenpWICsgY29zVGhldGEsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMVxuICAgICAgICBdO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuVHJhbnNmb3JtLmFib3V0T3JpZ2luID0gZnVuY3Rpb24gYWJvdXRPcmlnaW4odiwgbSkge1xuICAgIHZhciB0MCA9IHZbMF0gLSAodlswXSAqIG1bMF0gKyB2WzFdICogbVs0XSArIHZbMl0gKiBtWzhdKTtcbiAgICB2YXIgdDEgPSB2WzFdIC0gKHZbMF0gKiBtWzFdICsgdlsxXSAqIG1bNV0gKyB2WzJdICogbVs5XSk7XG4gICAgdmFyIHQyID0gdlsyXSAtICh2WzBdICogbVsyXSArIHZbMV0gKiBtWzZdICsgdlsyXSAqIG1bMTBdKTtcbiAgICByZXR1cm4gVHJhbnNmb3JtLnRoZW5Nb3ZlKG0sIFtcbiAgICAgICAgdDAsXG4gICAgICAgIHQxLFxuICAgICAgICB0MlxuICAgIF0pO1xufTtcblRyYW5zZm9ybS5za2V3ID0gZnVuY3Rpb24gc2tldyhwaGksIHRoZXRhLCBwc2kpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICAxLFxuICAgICAgICBNYXRoLnRhbih0aGV0YSksXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIE1hdGgudGFuKHBzaSksXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIE1hdGgudGFuKHBoaSksXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5za2V3WCA9IGZ1bmN0aW9uIHNrZXdYKGFuZ2xlKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgTWF0aC50YW4oYW5nbGUpLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0uc2tld1kgPSBmdW5jdGlvbiBza2V3WShhbmdsZSkge1xuICAgIHJldHVybiBbXG4gICAgICAgIDEsXG4gICAgICAgIE1hdGgudGFuKGFuZ2xlKSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnBlcnNwZWN0aXZlID0gZnVuY3Rpb24gcGVyc3BlY3RpdmUoZm9jdXNaKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgLTEgLyBmb2N1c1osXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5nZXRUcmFuc2xhdGUgPSBmdW5jdGlvbiBnZXRUcmFuc2xhdGUobSkge1xuICAgIHJldHVybiBbXG4gICAgICAgIG1bMTJdLFxuICAgICAgICBtWzEzXSxcbiAgICAgICAgbVsxNF1cbiAgICBdO1xufTtcblRyYW5zZm9ybS5pbnZlcnNlID0gZnVuY3Rpb24gaW52ZXJzZShtKSB7XG4gICAgdmFyIGMwID0gbVs1XSAqIG1bMTBdIC0gbVs2XSAqIG1bOV07XG4gICAgdmFyIGMxID0gbVs0XSAqIG1bMTBdIC0gbVs2XSAqIG1bOF07XG4gICAgdmFyIGMyID0gbVs0XSAqIG1bOV0gLSBtWzVdICogbVs4XTtcbiAgICB2YXIgYzQgPSBtWzFdICogbVsxMF0gLSBtWzJdICogbVs5XTtcbiAgICB2YXIgYzUgPSBtWzBdICogbVsxMF0gLSBtWzJdICogbVs4XTtcbiAgICB2YXIgYzYgPSBtWzBdICogbVs5XSAtIG1bMV0gKiBtWzhdO1xuICAgIHZhciBjOCA9IG1bMV0gKiBtWzZdIC0gbVsyXSAqIG1bNV07XG4gICAgdmFyIGM5ID0gbVswXSAqIG1bNl0gLSBtWzJdICogbVs0XTtcbiAgICB2YXIgYzEwID0gbVswXSAqIG1bNV0gLSBtWzFdICogbVs0XTtcbiAgICB2YXIgZGV0TSA9IG1bMF0gKiBjMCAtIG1bMV0gKiBjMSArIG1bMl0gKiBjMjtcbiAgICB2YXIgaW52RCA9IDEgLyBkZXRNO1xuICAgIHZhciByZXN1bHQgPSBbXG4gICAgICAgICAgICBpbnZEICogYzAsXG4gICAgICAgICAgICAtaW52RCAqIGM0LFxuICAgICAgICAgICAgaW52RCAqIGM4LFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIC1pbnZEICogYzEsXG4gICAgICAgICAgICBpbnZEICogYzUsXG4gICAgICAgICAgICAtaW52RCAqIGM5LFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIGludkQgKiBjMixcbiAgICAgICAgICAgIC1pbnZEICogYzYsXG4gICAgICAgICAgICBpbnZEICogYzEwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDFcbiAgICAgICAgXTtcbiAgICByZXN1bHRbMTJdID0gLW1bMTJdICogcmVzdWx0WzBdIC0gbVsxM10gKiByZXN1bHRbNF0gLSBtWzE0XSAqIHJlc3VsdFs4XTtcbiAgICByZXN1bHRbMTNdID0gLW1bMTJdICogcmVzdWx0WzFdIC0gbVsxM10gKiByZXN1bHRbNV0gLSBtWzE0XSAqIHJlc3VsdFs5XTtcbiAgICByZXN1bHRbMTRdID0gLW1bMTJdICogcmVzdWx0WzJdIC0gbVsxM10gKiByZXN1bHRbNl0gLSBtWzE0XSAqIHJlc3VsdFsxMF07XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5UcmFuc2Zvcm0udHJhbnNwb3NlID0gZnVuY3Rpb24gdHJhbnNwb3NlKG0pIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBtWzBdLFxuICAgICAgICBtWzRdLFxuICAgICAgICBtWzhdLFxuICAgICAgICBtWzEyXSxcbiAgICAgICAgbVsxXSxcbiAgICAgICAgbVs1XSxcbiAgICAgICAgbVs5XSxcbiAgICAgICAgbVsxM10sXG4gICAgICAgIG1bMl0sXG4gICAgICAgIG1bNl0sXG4gICAgICAgIG1bMTBdLFxuICAgICAgICBtWzE0XSxcbiAgICAgICAgbVszXSxcbiAgICAgICAgbVs3XSxcbiAgICAgICAgbVsxMV0sXG4gICAgICAgIG1bMTVdXG4gICAgXTtcbn07XG5mdW5jdGlvbiBfbm9ybVNxdWFyZWQodikge1xuICAgIHJldHVybiB2Lmxlbmd0aCA9PT0gMiA/IHZbMF0gKiB2WzBdICsgdlsxXSAqIHZbMV0gOiB2WzBdICogdlswXSArIHZbMV0gKiB2WzFdICsgdlsyXSAqIHZbMl07XG59XG5mdW5jdGlvbiBfbm9ybSh2KSB7XG4gICAgcmV0dXJuIE1hdGguc3FydChfbm9ybVNxdWFyZWQodikpO1xufVxuZnVuY3Rpb24gX3NpZ24obikge1xuICAgIHJldHVybiBuIDwgMCA/IC0xIDogMTtcbn1cblRyYW5zZm9ybS5pbnRlcnByZXQgPSBmdW5jdGlvbiBpbnRlcnByZXQoTSkge1xuICAgIHZhciB4ID0gW1xuICAgICAgICAgICAgTVswXSxcbiAgICAgICAgICAgIE1bMV0sXG4gICAgICAgICAgICBNWzJdXG4gICAgICAgIF07XG4gICAgdmFyIHNnbiA9IF9zaWduKHhbMF0pO1xuICAgIHZhciB4Tm9ybSA9IF9ub3JtKHgpO1xuICAgIHZhciB2ID0gW1xuICAgICAgICAgICAgeFswXSArIHNnbiAqIHhOb3JtLFxuICAgICAgICAgICAgeFsxXSxcbiAgICAgICAgICAgIHhbMl1cbiAgICAgICAgXTtcbiAgICB2YXIgbXVsdCA9IDIgLyBfbm9ybVNxdWFyZWQodik7XG4gICAgaWYgKG11bHQgPj0gSW5maW5pdHkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogVHJhbnNmb3JtLmdldFRyYW5zbGF0ZShNKSxcbiAgICAgICAgICAgIHJvdGF0ZTogW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2NhbGU6IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNrZXc6IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cbiAgICB2YXIgUTEgPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAxXG4gICAgICAgIF07XG4gICAgUTFbMF0gPSAxIC0gbXVsdCAqIHZbMF0gKiB2WzBdO1xuICAgIFExWzVdID0gMSAtIG11bHQgKiB2WzFdICogdlsxXTtcbiAgICBRMVsxMF0gPSAxIC0gbXVsdCAqIHZbMl0gKiB2WzJdO1xuICAgIFExWzFdID0gLW11bHQgKiB2WzBdICogdlsxXTtcbiAgICBRMVsyXSA9IC1tdWx0ICogdlswXSAqIHZbMl07XG4gICAgUTFbNl0gPSAtbXVsdCAqIHZbMV0gKiB2WzJdO1xuICAgIFExWzRdID0gUTFbMV07XG4gICAgUTFbOF0gPSBRMVsyXTtcbiAgICBRMVs5XSA9IFExWzZdO1xuICAgIHZhciBNUTEgPSBUcmFuc2Zvcm0ubXVsdGlwbHkoUTEsIE0pO1xuICAgIHZhciB4MiA9IFtcbiAgICAgICAgICAgIE1RMVs1XSxcbiAgICAgICAgICAgIE1RMVs2XVxuICAgICAgICBdO1xuICAgIHZhciBzZ24yID0gX3NpZ24oeDJbMF0pO1xuICAgIHZhciB4Mk5vcm0gPSBfbm9ybSh4Mik7XG4gICAgdmFyIHYyID0gW1xuICAgICAgICAgICAgeDJbMF0gKyBzZ24yICogeDJOb3JtLFxuICAgICAgICAgICAgeDJbMV1cbiAgICAgICAgXTtcbiAgICB2YXIgbXVsdDIgPSAyIC8gX25vcm1TcXVhcmVkKHYyKTtcbiAgICB2YXIgUTIgPSBbXG4gICAgICAgICAgICAxLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAxXG4gICAgICAgIF07XG4gICAgUTJbNV0gPSAxIC0gbXVsdDIgKiB2MlswXSAqIHYyWzBdO1xuICAgIFEyWzEwXSA9IDEgLSBtdWx0MiAqIHYyWzFdICogdjJbMV07XG4gICAgUTJbNl0gPSAtbXVsdDIgKiB2MlswXSAqIHYyWzFdO1xuICAgIFEyWzldID0gUTJbNl07XG4gICAgdmFyIFEgPSBUcmFuc2Zvcm0ubXVsdGlwbHkoUTIsIFExKTtcbiAgICB2YXIgUiA9IFRyYW5zZm9ybS5tdWx0aXBseShRLCBNKTtcbiAgICB2YXIgcmVtb3ZlciA9IFRyYW5zZm9ybS5zY2FsZShSWzBdIDwgMCA/IC0xIDogMSwgUls1XSA8IDAgPyAtMSA6IDEsIFJbMTBdIDwgMCA/IC0xIDogMSk7XG4gICAgUiA9IFRyYW5zZm9ybS5tdWx0aXBseShSLCByZW1vdmVyKTtcbiAgICBRID0gVHJhbnNmb3JtLm11bHRpcGx5KHJlbW92ZXIsIFEpO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICByZXN1bHQudHJhbnNsYXRlID0gVHJhbnNmb3JtLmdldFRyYW5zbGF0ZShNKTtcbiAgICByZXN1bHQucm90YXRlID0gW1xuICAgICAgICBNYXRoLmF0YW4yKC1RWzZdLCBRWzEwXSksXG4gICAgICAgIE1hdGguYXNpbihRWzJdKSxcbiAgICAgICAgTWF0aC5hdGFuMigtUVsxXSwgUVswXSlcbiAgICBdO1xuICAgIGlmICghcmVzdWx0LnJvdGF0ZVswXSkge1xuICAgICAgICByZXN1bHQucm90YXRlWzBdID0gMDtcbiAgICAgICAgcmVzdWx0LnJvdGF0ZVsyXSA9IE1hdGguYXRhbjIoUVs0XSwgUVs1XSk7XG4gICAgfVxuICAgIHJlc3VsdC5zY2FsZSA9IFtcbiAgICAgICAgUlswXSxcbiAgICAgICAgUls1XSxcbiAgICAgICAgUlsxMF1cbiAgICBdO1xuICAgIHJlc3VsdC5za2V3ID0gW1xuICAgICAgICBNYXRoLmF0YW4yKFJbOV0sIHJlc3VsdC5zY2FsZVsyXSksXG4gICAgICAgIE1hdGguYXRhbjIoUls4XSwgcmVzdWx0LnNjYWxlWzJdKSxcbiAgICAgICAgTWF0aC5hdGFuMihSWzRdLCByZXN1bHQuc2NhbGVbMF0pXG4gICAgXTtcbiAgICBpZiAoTWF0aC5hYnMocmVzdWx0LnJvdGF0ZVswXSkgKyBNYXRoLmFicyhyZXN1bHQucm90YXRlWzJdKSA+IDEuNSAqIE1hdGguUEkpIHtcbiAgICAgICAgcmVzdWx0LnJvdGF0ZVsxXSA9IE1hdGguUEkgLSByZXN1bHQucm90YXRlWzFdO1xuICAgICAgICBpZiAocmVzdWx0LnJvdGF0ZVsxXSA+IE1hdGguUEkpXG4gICAgICAgICAgICByZXN1bHQucm90YXRlWzFdIC09IDIgKiBNYXRoLlBJO1xuICAgICAgICBpZiAocmVzdWx0LnJvdGF0ZVsxXSA8IC1NYXRoLlBJKVxuICAgICAgICAgICAgcmVzdWx0LnJvdGF0ZVsxXSArPSAyICogTWF0aC5QSTtcbiAgICAgICAgaWYgKHJlc3VsdC5yb3RhdGVbMF0gPCAwKVxuICAgICAgICAgICAgcmVzdWx0LnJvdGF0ZVswXSArPSBNYXRoLlBJO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXN1bHQucm90YXRlWzBdIC09IE1hdGguUEk7XG4gICAgICAgIGlmIChyZXN1bHQucm90YXRlWzJdIDwgMClcbiAgICAgICAgICAgIHJlc3VsdC5yb3RhdGVbMl0gKz0gTWF0aC5QSTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmVzdWx0LnJvdGF0ZVsyXSAtPSBNYXRoLlBJO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblRyYW5zZm9ybS5hdmVyYWdlID0gZnVuY3Rpb24gYXZlcmFnZShNMSwgTTIsIHQpIHtcbiAgICB0ID0gdCA9PT0gdW5kZWZpbmVkID8gMC41IDogdDtcbiAgICB2YXIgc3BlY00xID0gVHJhbnNmb3JtLmludGVycHJldChNMSk7XG4gICAgdmFyIHNwZWNNMiA9IFRyYW5zZm9ybS5pbnRlcnByZXQoTTIpO1xuICAgIHZhciBzcGVjQXZnID0ge1xuICAgICAgICAgICAgdHJhbnNsYXRlOiBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByb3RhdGU6IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNjYWxlOiBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBza2V3OiBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBzcGVjQXZnLnRyYW5zbGF0ZVtpXSA9ICgxIC0gdCkgKiBzcGVjTTEudHJhbnNsYXRlW2ldICsgdCAqIHNwZWNNMi50cmFuc2xhdGVbaV07XG4gICAgICAgIHNwZWNBdmcucm90YXRlW2ldID0gKDEgLSB0KSAqIHNwZWNNMS5yb3RhdGVbaV0gKyB0ICogc3BlY00yLnJvdGF0ZVtpXTtcbiAgICAgICAgc3BlY0F2Zy5zY2FsZVtpXSA9ICgxIC0gdCkgKiBzcGVjTTEuc2NhbGVbaV0gKyB0ICogc3BlY00yLnNjYWxlW2ldO1xuICAgICAgICBzcGVjQXZnLnNrZXdbaV0gPSAoMSAtIHQpICogc3BlY00xLnNrZXdbaV0gKyB0ICogc3BlY00yLnNrZXdbaV07XG4gICAgfVxuICAgIHJldHVybiBUcmFuc2Zvcm0uYnVpbGQoc3BlY0F2Zyk7XG59O1xuVHJhbnNmb3JtLmJ1aWxkID0gZnVuY3Rpb24gYnVpbGQoc3BlYykge1xuICAgIHZhciBzY2FsZU1hdHJpeCA9IFRyYW5zZm9ybS5zY2FsZShzcGVjLnNjYWxlWzBdLCBzcGVjLnNjYWxlWzFdLCBzcGVjLnNjYWxlWzJdKTtcbiAgICB2YXIgc2tld01hdHJpeCA9IFRyYW5zZm9ybS5za2V3KHNwZWMuc2tld1swXSwgc3BlYy5za2V3WzFdLCBzcGVjLnNrZXdbMl0pO1xuICAgIHZhciByb3RhdGVNYXRyaXggPSBUcmFuc2Zvcm0ucm90YXRlKHNwZWMucm90YXRlWzBdLCBzcGVjLnJvdGF0ZVsxXSwgc3BlYy5yb3RhdGVbMl0pO1xuICAgIHJldHVybiBUcmFuc2Zvcm0udGhlbk1vdmUoVHJhbnNmb3JtLm11bHRpcGx5KFRyYW5zZm9ybS5tdWx0aXBseShyb3RhdGVNYXRyaXgsIHNrZXdNYXRyaXgpLCBzY2FsZU1hdHJpeCksIHNwZWMudHJhbnNsYXRlKTtcbn07XG5UcmFuc2Zvcm0uZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzKGEsIGIpIHtcbiAgICByZXR1cm4gIVRyYW5zZm9ybS5ub3RFcXVhbHMoYSwgYik7XG59O1xuVHJhbnNmb3JtLm5vdEVxdWFscyA9IGZ1bmN0aW9uIG5vdEVxdWFscyhhLCBiKSB7XG4gICAgaWYgKGEgPT09IGIpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gIShhICYmIGIpIHx8IGFbMTJdICE9PSBiWzEyXSB8fCBhWzEzXSAhPT0gYlsxM10gfHwgYVsxNF0gIT09IGJbMTRdIHx8IGFbMF0gIT09IGJbMF0gfHwgYVsxXSAhPT0gYlsxXSB8fCBhWzJdICE9PSBiWzJdIHx8IGFbNF0gIT09IGJbNF0gfHwgYVs1XSAhPT0gYls1XSB8fCBhWzZdICE9PSBiWzZdIHx8IGFbOF0gIT09IGJbOF0gfHwgYVs5XSAhPT0gYls5XSB8fCBhWzEwXSAhPT0gYlsxMF07XG59O1xuVHJhbnNmb3JtLm5vcm1hbGl6ZVJvdGF0aW9uID0gZnVuY3Rpb24gbm9ybWFsaXplUm90YXRpb24ocm90YXRpb24pIHtcbiAgICB2YXIgcmVzdWx0ID0gcm90YXRpb24uc2xpY2UoMCk7XG4gICAgaWYgKHJlc3VsdFswXSA9PT0gTWF0aC5QSSAqIDAuNSB8fCByZXN1bHRbMF0gPT09IC1NYXRoLlBJICogMC41KSB7XG4gICAgICAgIHJlc3VsdFswXSA9IC1yZXN1bHRbMF07XG4gICAgICAgIHJlc3VsdFsxXSA9IE1hdGguUEkgLSByZXN1bHRbMV07XG4gICAgICAgIHJlc3VsdFsyXSAtPSBNYXRoLlBJO1xuICAgIH1cbiAgICBpZiAocmVzdWx0WzBdID4gTWF0aC5QSSAqIDAuNSkge1xuICAgICAgICByZXN1bHRbMF0gPSByZXN1bHRbMF0gLSBNYXRoLlBJO1xuICAgICAgICByZXN1bHRbMV0gPSBNYXRoLlBJIC0gcmVzdWx0WzFdO1xuICAgICAgICByZXN1bHRbMl0gLT0gTWF0aC5QSTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdFswXSA8IC1NYXRoLlBJICogMC41KSB7XG4gICAgICAgIHJlc3VsdFswXSA9IHJlc3VsdFswXSArIE1hdGguUEk7XG4gICAgICAgIHJlc3VsdFsxXSA9IC1NYXRoLlBJIC0gcmVzdWx0WzFdO1xuICAgICAgICByZXN1bHRbMl0gLT0gTWF0aC5QSTtcbiAgICB9XG4gICAgd2hpbGUgKHJlc3VsdFsxXSA8IC1NYXRoLlBJKVxuICAgICAgICByZXN1bHRbMV0gKz0gMiAqIE1hdGguUEk7XG4gICAgd2hpbGUgKHJlc3VsdFsxXSA+PSBNYXRoLlBJKVxuICAgICAgICByZXN1bHRbMV0gLT0gMiAqIE1hdGguUEk7XG4gICAgd2hpbGUgKHJlc3VsdFsyXSA8IC1NYXRoLlBJKVxuICAgICAgICByZXN1bHRbMl0gKz0gMiAqIE1hdGguUEk7XG4gICAgd2hpbGUgKHJlc3VsdFsyXSA+PSBNYXRoLlBJKVxuICAgICAgICByZXN1bHRbMl0gLT0gMiAqIE1hdGguUEk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5UcmFuc2Zvcm0uaW5Gcm9udCA9IFtcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMC4wMDEsXG4gICAgMVxuXTtcblRyYW5zZm9ybS5iZWhpbmQgPSBbXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIC0wLjAwMSxcbiAgICAxXG5dO1xubW9kdWxlLmV4cG9ydHMgPSBUcmFuc2Zvcm07IiwidmFyIGNzcyA9IFwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxcbiAqXFxuICogT3duZXI6IG1hcmtAZmFtby51c1xcbiAqIEBsaWNlbnNlIE1QTCAyLjBcXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTRcXG4gKi9cXG5cXG4uZmFtb3VzLXJvb3Qge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBtYXJnaW46IDBweDtcXG4gICAgcGFkZGluZzogMHB4O1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAgIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxufVxcblxcbi5mYW1vdXMtY29udGFpbmVyLCAuZmFtb3VzLWdyb3VwIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDBweDtcXG4gICAgbGVmdDogMHB4O1xcbiAgICBib3R0b206IDBweDtcXG4gICAgcmlnaHQ6IDBweDtcXG4gICAgb3ZlcmZsb3c6IHZpc2libGU7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gICAgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuLmZhbW91cy1ncm91cCB7XFxuICAgIHdpZHRoOiAwcHg7XFxuICAgIGhlaWdodDogMHB4O1xcbiAgICBtYXJnaW46IDBweDtcXG4gICAgcGFkZGluZzogMHB4O1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAgIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxufVxcblxcbi5mYW1vdXMtc3VyZmFjZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgY2VudGVyO1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgY2VudGVyO1xcbiAgICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcXG4gICAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAgIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAgIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgLW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBwb2ludGVyLWV2ZW50czogYXV0bztcXG59XFxuXFxuLmZhbW91cy1jb250YWluZXItZ3JvdXAge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblwiOyAocmVxdWlyZShcIi9Vc2Vycy9wc2hhdGFyYS9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvSGFja1JlYWN0b3IvQWRGYW1lL25vZGVfbW9kdWxlcy9jc3NpZnlcIikpKGNzcyk7IG1vZHVsZS5leHBvcnRzID0gY3NzOyIsInZhciBTdXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9TdXJmYWNlJyk7XG5mdW5jdGlvbiBJbWFnZVN1cmZhY2Uob3B0aW9ucykge1xuICAgIHRoaXMuX2ltYWdlVXJsID0gdW5kZWZpbmVkO1xuICAgIFN1cmZhY2UuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cbnZhciB1cmxDYWNoZSA9IFtdO1xudmFyIGNvdW50Q2FjaGUgPSBbXTtcbnZhciBub2RlQ2FjaGUgPSBbXTtcbnZhciBjYWNoZUVuYWJsZWQgPSB0cnVlO1xuSW1hZ2VTdXJmYWNlLmVuYWJsZUNhY2hlID0gZnVuY3Rpb24gZW5hYmxlQ2FjaGUoKSB7XG4gICAgY2FjaGVFbmFibGVkID0gdHJ1ZTtcbn07XG5JbWFnZVN1cmZhY2UuZGlzYWJsZUNhY2hlID0gZnVuY3Rpb24gZGlzYWJsZUNhY2hlKCkge1xuICAgIGNhY2hlRW5hYmxlZCA9IGZhbHNlO1xufTtcbkltYWdlU3VyZmFjZS5jbGVhckNhY2hlID0gZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgICB1cmxDYWNoZSA9IFtdO1xuICAgIGNvdW50Q2FjaGUgPSBbXTtcbiAgICBub2RlQ2FjaGUgPSBbXTtcbn07XG5JbWFnZVN1cmZhY2UuZ2V0Q2FjaGUgPSBmdW5jdGlvbiBnZXRDYWNoZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB1cmxDYWNoZTogdXJsQ2FjaGUsXG4gICAgICAgIGNvdW50Q2FjaGU6IGNvdW50Q2FjaGUsXG4gICAgICAgIG5vZGVDYWNoZTogY291bnRDYWNoZVxuICAgIH07XG59O1xuSW1hZ2VTdXJmYWNlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU3VyZmFjZS5wcm90b3R5cGUpO1xuSW1hZ2VTdXJmYWNlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEltYWdlU3VyZmFjZTtcbkltYWdlU3VyZmFjZS5wcm90b3R5cGUuZWxlbWVudFR5cGUgPSAnaW1nJztcbkltYWdlU3VyZmFjZS5wcm90b3R5cGUuZWxlbWVudENsYXNzID0gJ2ZhbW91cy1zdXJmYWNlJztcbkltYWdlU3VyZmFjZS5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uIHNldENvbnRlbnQoaW1hZ2VVcmwpIHtcbiAgICB2YXIgdXJsSW5kZXggPSB1cmxDYWNoZS5pbmRleE9mKHRoaXMuX2ltYWdlVXJsKTtcbiAgICBpZiAodXJsSW5kZXggIT09IC0xKSB7XG4gICAgICAgIGlmIChjb3VudENhY2hlW3VybEluZGV4XSA9PT0gMSkge1xuICAgICAgICAgICAgdXJsQ2FjaGUuc3BsaWNlKHVybEluZGV4LCAxKTtcbiAgICAgICAgICAgIGNvdW50Q2FjaGUuc3BsaWNlKHVybEluZGV4LCAxKTtcbiAgICAgICAgICAgIG5vZGVDYWNoZS5zcGxpY2UodXJsSW5kZXgsIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY291bnRDYWNoZVt1cmxJbmRleF0tLTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cmxJbmRleCA9IHVybENhY2hlLmluZGV4T2YoaW1hZ2VVcmwpO1xuICAgIGlmICh1cmxJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgdXJsQ2FjaGUucHVzaChpbWFnZVVybCk7XG4gICAgICAgIGNvdW50Q2FjaGUucHVzaCgxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb3VudENhY2hlW3VybEluZGV4XSsrO1xuICAgIH1cbiAgICB0aGlzLl9pbWFnZVVybCA9IGltYWdlVXJsO1xuICAgIHRoaXMuX2NvbnRlbnREaXJ0eSA9IHRydWU7XG59O1xuSW1hZ2VTdXJmYWNlLnByb3RvdHlwZS5kZXBsb3kgPSBmdW5jdGlvbiBkZXBsb3kodGFyZ2V0KSB7XG4gICAgdmFyIHVybEluZGV4ID0gdXJsQ2FjaGUuaW5kZXhPZih0aGlzLl9pbWFnZVVybCk7XG4gICAgaWYgKG5vZGVDYWNoZVt1cmxJbmRleF0gPT09IHVuZGVmaW5lZCAmJiBjYWNoZUVuYWJsZWQpIHtcbiAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWcuc3JjID0gdGhpcy5faW1hZ2VVcmwgfHwgJyc7XG4gICAgICAgIG5vZGVDYWNoZVt1cmxJbmRleF0gPSBpbWc7XG4gICAgfVxuICAgIHRhcmdldC5zcmMgPSB0aGlzLl9pbWFnZVVybCB8fCAnJztcbn07XG5JbWFnZVN1cmZhY2UucHJvdG90eXBlLnJlY2FsbCA9IGZ1bmN0aW9uIHJlY2FsbCh0YXJnZXQpIHtcbiAgICB0YXJnZXQuc3JjID0gJyc7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBJbWFnZVN1cmZhY2U7IiwidmFyIFV0aWxpdHkgPSByZXF1aXJlKCcuLi91dGlsaXRpZXMvVXRpbGl0eScpO1xuZnVuY3Rpb24gTXVsdGlwbGVUcmFuc2l0aW9uKG1ldGhvZCkge1xuICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xuICAgIHRoaXMuX2luc3RhbmNlcyA9IFtdO1xuICAgIHRoaXMuc3RhdGUgPSBbXTtcbn1cbk11bHRpcGxlVHJhbnNpdGlvbi5TVVBQT1JUU19NVUxUSVBMRSA9IHRydWU7XG5NdWx0aXBsZVRyYW5zaXRpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2luc3RhbmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnN0YXRlW2ldID0gdGhpcy5faW5zdGFuY2VzW2ldLmdldCgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbn07XG5NdWx0aXBsZVRyYW5zaXRpb24ucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChlbmRTdGF0ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB2YXIgX2FsbENhbGxiYWNrID0gVXRpbGl0eS5hZnRlcihlbmRTdGF0ZS5sZW5ndGgsIGNhbGxiYWNrKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVuZFN0YXRlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghdGhpcy5faW5zdGFuY2VzW2ldKVxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2VzW2ldID0gbmV3IHRoaXMubWV0aG9kKCk7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlc1tpXS5zZXQoZW5kU3RhdGVbaV0sIHRyYW5zaXRpb24sIF9hbGxDYWxsYmFjayk7XG4gICAgfVxufTtcbk11bHRpcGxlVHJhbnNpdGlvbi5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiByZXNldChzdGFydFN0YXRlKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFydFN0YXRlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghdGhpcy5faW5zdGFuY2VzW2ldKVxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2VzW2ldID0gbmV3IHRoaXMubWV0aG9kKCk7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlc1tpXS5yZXNldChzdGFydFN0YXRlW2ldKTtcbiAgICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBNdWx0aXBsZVRyYW5zaXRpb247IiwidmFyIE11bHRpcGxlVHJhbnNpdGlvbiA9IHJlcXVpcmUoJy4vTXVsdGlwbGVUcmFuc2l0aW9uJyk7XG52YXIgVHdlZW5UcmFuc2l0aW9uID0gcmVxdWlyZSgnLi9Ud2VlblRyYW5zaXRpb24nKTtcbmZ1bmN0aW9uIFRyYW5zaXRpb25hYmxlKHN0YXJ0KSB7XG4gICAgdGhpcy5jdXJyZW50QWN0aW9uID0gbnVsbDtcbiAgICB0aGlzLmFjdGlvblF1ZXVlID0gW107XG4gICAgdGhpcy5jYWxsYmFja1F1ZXVlID0gW107XG4gICAgdGhpcy5zdGF0ZSA9IDA7XG4gICAgdGhpcy52ZWxvY2l0eSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9lbmdpbmVJbnN0YW5jZSA9IG51bGw7XG4gICAgdGhpcy5fY3VycmVudE1ldGhvZCA9IG51bGw7XG4gICAgdGhpcy5zZXQoc3RhcnQpO1xufVxudmFyIHRyYW5zaXRpb25NZXRob2RzID0ge307XG5UcmFuc2l0aW9uYWJsZS5yZWdpc3RlciA9IGZ1bmN0aW9uIHJlZ2lzdGVyKG1ldGhvZHMpIHtcbiAgICB2YXIgc3VjY2VzcyA9IHRydWU7XG4gICAgZm9yICh2YXIgbWV0aG9kIGluIG1ldGhvZHMpIHtcbiAgICAgICAgaWYgKCFUcmFuc2l0aW9uYWJsZS5yZWdpc3Rlck1ldGhvZChtZXRob2QsIG1ldGhvZHNbbWV0aG9kXSkpXG4gICAgICAgICAgICBzdWNjZXNzID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBzdWNjZXNzO1xufTtcblRyYW5zaXRpb25hYmxlLnJlZ2lzdGVyTWV0aG9kID0gZnVuY3Rpb24gcmVnaXN0ZXJNZXRob2QobmFtZSwgZW5naW5lQ2xhc3MpIHtcbiAgICBpZiAoIShuYW1lIGluIHRyYW5zaXRpb25NZXRob2RzKSkge1xuICAgICAgICB0cmFuc2l0aW9uTWV0aG9kc1tuYW1lXSA9IGVuZ2luZUNsYXNzO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xufTtcblRyYW5zaXRpb25hYmxlLnVucmVnaXN0ZXJNZXRob2QgPSBmdW5jdGlvbiB1bnJlZ2lzdGVyTWV0aG9kKG5hbWUpIHtcbiAgICBpZiAobmFtZSBpbiB0cmFuc2l0aW9uTWV0aG9kcykge1xuICAgICAgICBkZWxldGUgdHJhbnNpdGlvbk1ldGhvZHNbbmFtZV07XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gZmFsc2U7XG59O1xuZnVuY3Rpb24gX2xvYWROZXh0KCkge1xuICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLl9jYWxsYmFjaztcbiAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmFjdGlvblF1ZXVlLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgIHRoaXMuc2V0KHRoaXMuZ2V0KCkpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IHRoaXMuYWN0aW9uUXVldWUuc2hpZnQoKTtcbiAgICB0aGlzLl9jYWxsYmFjayA9IHRoaXMuY2FsbGJhY2tRdWV1ZS5zaGlmdCgpO1xuICAgIHZhciBtZXRob2QgPSBudWxsO1xuICAgIHZhciBlbmRWYWx1ZSA9IHRoaXMuY3VycmVudEFjdGlvblswXTtcbiAgICB2YXIgdHJhbnNpdGlvbiA9IHRoaXMuY3VycmVudEFjdGlvblsxXTtcbiAgICBpZiAodHJhbnNpdGlvbiBpbnN0YW5jZW9mIE9iamVjdCAmJiB0cmFuc2l0aW9uLm1ldGhvZCkge1xuICAgICAgICBtZXRob2QgPSB0cmFuc2l0aW9uLm1ldGhvZDtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgbWV0aG9kID0gdHJhbnNpdGlvbk1ldGhvZHNbbWV0aG9kXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBtZXRob2QgPSBUd2VlblRyYW5zaXRpb247XG4gICAgfVxuICAgIGlmICh0aGlzLl9jdXJyZW50TWV0aG9kICE9PSBtZXRob2QpIHtcbiAgICAgICAgaWYgKCEoZW5kVmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHx8IG1ldGhvZC5TVVBQT1JUU19NVUxUSVBMRSA9PT0gdHJ1ZSB8fCBlbmRWYWx1ZS5sZW5ndGggPD0gbWV0aG9kLlNVUFBPUlRTX01VTFRJUExFKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmdpbmVJbnN0YW5jZSA9IG5ldyBtZXRob2QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2VuZ2luZUluc3RhbmNlID0gbmV3IE11bHRpcGxlVHJhbnNpdGlvbihtZXRob2QpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2N1cnJlbnRNZXRob2QgPSBtZXRob2Q7XG4gICAgfVxuICAgIHRoaXMuX2VuZ2luZUluc3RhbmNlLnJlc2V0KHRoaXMuc3RhdGUsIHRoaXMudmVsb2NpdHkpO1xuICAgIGlmICh0aGlzLnZlbG9jaXR5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRyYW5zaXRpb24udmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5O1xuICAgIHRoaXMuX2VuZ2luZUluc3RhbmNlLnNldChlbmRWYWx1ZSwgdHJhbnNpdGlvbiwgX2xvYWROZXh0LmJpbmQodGhpcykpO1xufVxuVHJhbnNpdGlvbmFibGUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChlbmRTdGF0ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoIXRyYW5zaXRpb24pIHtcbiAgICAgICAgdGhpcy5yZXNldChlbmRTdGF0ZSk7XG4gICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB2YXIgYWN0aW9uID0gW1xuICAgICAgICAgICAgZW5kU3RhdGUsXG4gICAgICAgICAgICB0cmFuc2l0aW9uXG4gICAgICAgIF07XG4gICAgdGhpcy5hY3Rpb25RdWV1ZS5wdXNoKGFjdGlvbik7XG4gICAgdGhpcy5jYWxsYmFja1F1ZXVlLnB1c2goY2FsbGJhY2spO1xuICAgIGlmICghdGhpcy5jdXJyZW50QWN0aW9uKVxuICAgICAgICBfbG9hZE5leHQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UcmFuc2l0aW9uYWJsZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiByZXNldChzdGFydFN0YXRlLCBzdGFydFZlbG9jaXR5KSB7XG4gICAgdGhpcy5fY3VycmVudE1ldGhvZCA9IG51bGw7XG4gICAgdGhpcy5fZW5naW5lSW5zdGFuY2UgPSBudWxsO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc3RhdGUgPSBzdGFydFN0YXRlO1xuICAgIHRoaXMudmVsb2NpdHkgPSBzdGFydFZlbG9jaXR5O1xuICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IG51bGw7XG4gICAgdGhpcy5hY3Rpb25RdWV1ZSA9IFtdO1xuICAgIHRoaXMuY2FsbGJhY2tRdWV1ZSA9IFtdO1xufTtcblRyYW5zaXRpb25hYmxlLnByb3RvdHlwZS5kZWxheSA9IGZ1bmN0aW9uIGRlbGF5KGR1cmF0aW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMuc2V0KHRoaXMuZ2V0KCksIHtcbiAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICBjdXJ2ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9LCBjYWxsYmFjayk7XG59O1xuVHJhbnNpdGlvbmFibGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCh0aW1lc3RhbXApIHtcbiAgICBpZiAodGhpcy5fZW5naW5lSW5zdGFuY2UpIHtcbiAgICAgICAgaWYgKHRoaXMuX2VuZ2luZUluc3RhbmNlLmdldFZlbG9jaXR5KVxuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHRoaXMuX2VuZ2luZUluc3RhbmNlLmdldFZlbG9jaXR5KCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLl9lbmdpbmVJbnN0YW5jZS5nZXQodGltZXN0YW1wKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XG59O1xuVHJhbnNpdGlvbmFibGUucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5jdXJyZW50QWN0aW9uO1xufTtcblRyYW5zaXRpb25hYmxlLnByb3RvdHlwZS5oYWx0ID0gZnVuY3Rpb24gaGFsdCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXQodGhpcy5nZXQoKSk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBUcmFuc2l0aW9uYWJsZTsiLCJ2YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCcuL1RyYW5zaXRpb25hYmxlJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi4vY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBVdGlsaXR5ID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL1V0aWxpdHknKTtcbmZ1bmN0aW9uIFRyYW5zaXRpb25hYmxlVHJhbnNmb3JtKHRyYW5zZm9ybSkge1xuICAgIHRoaXMuX2ZpbmFsID0gVHJhbnNmb3JtLmlkZW50aXR5LnNsaWNlKCk7XG4gICAgdGhpcy5fZmluYWxUcmFuc2xhdGUgPSBbXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdO1xuICAgIHRoaXMuX2ZpbmFsUm90YXRlID0gW1xuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXTtcbiAgICB0aGlzLl9maW5hbFNrZXcgPSBbXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdO1xuICAgIHRoaXMuX2ZpbmFsU2NhbGUgPSBbXG4gICAgICAgIDEsXG4gICAgICAgIDEsXG4gICAgICAgIDFcbiAgICBdO1xuICAgIHRoaXMudHJhbnNsYXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMuX2ZpbmFsVHJhbnNsYXRlKTtcbiAgICB0aGlzLnJvdGF0ZSA9IG5ldyBUcmFuc2l0aW9uYWJsZSh0aGlzLl9maW5hbFJvdGF0ZSk7XG4gICAgdGhpcy5za2V3ID0gbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMuX2ZpbmFsU2tldyk7XG4gICAgdGhpcy5zY2FsZSA9IG5ldyBUcmFuc2l0aW9uYWJsZSh0aGlzLl9maW5hbFNjYWxlKTtcbiAgICBpZiAodHJhbnNmb3JtKVxuICAgICAgICB0aGlzLnNldCh0cmFuc2Zvcm0pO1xufVxuZnVuY3Rpb24gX2J1aWxkKCkge1xuICAgIHJldHVybiBUcmFuc2Zvcm0uYnVpbGQoe1xuICAgICAgICB0cmFuc2xhdGU6IHRoaXMudHJhbnNsYXRlLmdldCgpLFxuICAgICAgICByb3RhdGU6IHRoaXMucm90YXRlLmdldCgpLFxuICAgICAgICBza2V3OiB0aGlzLnNrZXcuZ2V0KCksXG4gICAgICAgIHNjYWxlOiB0aGlzLnNjYWxlLmdldCgpXG4gICAgfSk7XG59XG5mdW5jdGlvbiBfYnVpbGRGaW5hbCgpIHtcbiAgICByZXR1cm4gVHJhbnNmb3JtLmJ1aWxkKHtcbiAgICAgICAgdHJhbnNsYXRlOiB0aGlzLl9maW5hbFRyYW5zbGF0ZSxcbiAgICAgICAgcm90YXRlOiB0aGlzLl9maW5hbFJvdGF0ZSxcbiAgICAgICAgc2tldzogdGhpcy5fZmluYWxTa2V3LFxuICAgICAgICBzY2FsZTogdGhpcy5fZmluYWxTY2FsZVxuICAgIH0pO1xufVxuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLnNldFRyYW5zbGF0ZSA9IGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSh0cmFuc2xhdGUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fZmluYWxUcmFuc2xhdGUgPSB0cmFuc2xhdGU7XG4gICAgdGhpcy5fZmluYWwgPSBfYnVpbGRGaW5hbC5jYWxsKHRoaXMpO1xuICAgIHRoaXMudHJhbnNsYXRlLnNldCh0cmFuc2xhdGUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuc2V0U2NhbGUgPSBmdW5jdGlvbiBzZXRTY2FsZShzY2FsZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLl9maW5hbFNjYWxlID0gc2NhbGU7XG4gICAgdGhpcy5fZmluYWwgPSBfYnVpbGRGaW5hbC5jYWxsKHRoaXMpO1xuICAgIHRoaXMuc2NhbGUuc2V0KHNjYWxlLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLnNldFJvdGF0ZSA9IGZ1bmN0aW9uIHNldFJvdGF0ZShldWxlckFuZ2xlcywgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLl9maW5hbFJvdGF0ZSA9IGV1bGVyQW5nbGVzO1xuICAgIHRoaXMuX2ZpbmFsID0gX2J1aWxkRmluYWwuY2FsbCh0aGlzKTtcbiAgICB0aGlzLnJvdGF0ZS5zZXQoZXVsZXJBbmdsZXMsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuc2V0U2tldyA9IGZ1bmN0aW9uIHNldFNrZXcoc2tld0FuZ2xlcywgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLl9maW5hbFNrZXcgPSBza2V3QW5nbGVzO1xuICAgIHRoaXMuX2ZpbmFsID0gX2J1aWxkRmluYWwuY2FsbCh0aGlzKTtcbiAgICB0aGlzLnNrZXcuc2V0KHNrZXdBbmdsZXMsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KHRyYW5zZm9ybSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB2YXIgY29tcG9uZW50cyA9IFRyYW5zZm9ybS5pbnRlcnByZXQodHJhbnNmb3JtKTtcbiAgICB0aGlzLl9maW5hbFRyYW5zbGF0ZSA9IGNvbXBvbmVudHMudHJhbnNsYXRlO1xuICAgIHRoaXMuX2ZpbmFsUm90YXRlID0gY29tcG9uZW50cy5yb3RhdGU7XG4gICAgdGhpcy5fZmluYWxTa2V3ID0gY29tcG9uZW50cy5za2V3O1xuICAgIHRoaXMuX2ZpbmFsU2NhbGUgPSBjb21wb25lbnRzLnNjYWxlO1xuICAgIHRoaXMuX2ZpbmFsID0gdHJhbnNmb3JtO1xuICAgIHZhciBfY2FsbGJhY2sgPSBjYWxsYmFjayA/IFV0aWxpdHkuYWZ0ZXIoNCwgY2FsbGJhY2spIDogbnVsbDtcbiAgICB0aGlzLnRyYW5zbGF0ZS5zZXQoY29tcG9uZW50cy50cmFuc2xhdGUsIHRyYW5zaXRpb24sIF9jYWxsYmFjayk7XG4gICAgdGhpcy5yb3RhdGUuc2V0KGNvbXBvbmVudHMucm90YXRlLCB0cmFuc2l0aW9uLCBfY2FsbGJhY2spO1xuICAgIHRoaXMuc2tldy5zZXQoY29tcG9uZW50cy5za2V3LCB0cmFuc2l0aW9uLCBfY2FsbGJhY2spO1xuICAgIHRoaXMuc2NhbGUuc2V0KGNvbXBvbmVudHMuc2NhbGUsIHRyYW5zaXRpb24sIF9jYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLnNldERlZmF1bHRUcmFuc2l0aW9uID0gZnVuY3Rpb24gc2V0RGVmYXVsdFRyYW5zaXRpb24odHJhbnNpdGlvbikge1xuICAgIHRoaXMudHJhbnNsYXRlLnNldERlZmF1bHQodHJhbnNpdGlvbik7XG4gICAgdGhpcy5yb3RhdGUuc2V0RGVmYXVsdCh0cmFuc2l0aW9uKTtcbiAgICB0aGlzLnNrZXcuc2V0RGVmYXVsdCh0cmFuc2l0aW9uKTtcbiAgICB0aGlzLnNjYWxlLnNldERlZmF1bHQodHJhbnNpdGlvbik7XG59O1xuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCgpIHtcbiAgICBpZiAodGhpcy5pc0FjdGl2ZSgpKSB7XG4gICAgICAgIHJldHVybiBfYnVpbGQuY2FsbCh0aGlzKTtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbmFsO1xufTtcblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5nZXRGaW5hbCA9IGZ1bmN0aW9uIGdldEZpbmFsKCkge1xuICAgIHJldHVybiB0aGlzLl9maW5hbDtcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUuaXNBY3RpdmUoKSB8fCB0aGlzLnJvdGF0ZS5pc0FjdGl2ZSgpIHx8IHRoaXMuc2NhbGUuaXNBY3RpdmUoKSB8fCB0aGlzLnNrZXcuaXNBY3RpdmUoKTtcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuaGFsdCA9IGZ1bmN0aW9uIGhhbHQoKSB7XG4gICAgdGhpcy50cmFuc2xhdGUuaGFsdCgpO1xuICAgIHRoaXMucm90YXRlLmhhbHQoKTtcbiAgICB0aGlzLnNrZXcuaGFsdCgpO1xuICAgIHRoaXMuc2NhbGUuaGFsdCgpO1xuICAgIHRoaXMuX2ZpbmFsID0gdGhpcy5nZXQoKTtcbiAgICB0aGlzLl9maW5hbFRyYW5zbGF0ZSA9IHRoaXMudHJhbnNsYXRlLmdldCgpO1xuICAgIHRoaXMuX2ZpbmFsUm90YXRlID0gdGhpcy5yb3RhdGUuZ2V0KCk7XG4gICAgdGhpcy5fZmluYWxTa2V3ID0gdGhpcy5za2V3LmdldCgpO1xuICAgIHRoaXMuX2ZpbmFsU2NhbGUgPSB0aGlzLnNjYWxlLmdldCgpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbm1vZHVsZS5leHBvcnRzID0gVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm07IiwiZnVuY3Rpb24gVHdlZW5UcmFuc2l0aW9uKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKFR3ZWVuVHJhbnNpdGlvbi5ERUZBVUxUX09QVElPTlMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fc3RhcnRUaW1lID0gMDtcbiAgICB0aGlzLl9zdGFydFZhbHVlID0gMDtcbiAgICB0aGlzLl91cGRhdGVUaW1lID0gMDtcbiAgICB0aGlzLl9lbmRWYWx1ZSA9IDA7XG4gICAgdGhpcy5fY3VydmUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc3RhdGUgPSAwO1xuICAgIHRoaXMudmVsb2NpdHkgPSB1bmRlZmluZWQ7XG59XG5Ud2VlblRyYW5zaXRpb24uQ3VydmVzID0ge1xuICAgIGxpbmVhcjogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfSxcbiAgICBlYXNlSW46IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB0ICogdDtcbiAgICB9LFxuICAgIGVhc2VPdXQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB0ICogKDIgLSB0KTtcbiAgICB9LFxuICAgIGVhc2VJbk91dDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgaWYgKHQgPD0gMC41KVxuICAgICAgICAgICAgcmV0dXJuIDIgKiB0ICogdDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIC0yICogdCAqIHQgKyA0ICogdCAtIDE7XG4gICAgfSxcbiAgICBlYXNlT3V0Qm91bmNlOiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdCAqICgzIC0gMiAqIHQpO1xuICAgIH0sXG4gICAgc3ByaW5nOiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gKDEgLSB0KSAqIE1hdGguc2luKDYgKiBNYXRoLlBJICogdCkgKyB0O1xuICAgIH1cbn07XG5Ud2VlblRyYW5zaXRpb24uU1VQUE9SVFNfTVVMVElQTEUgPSB0cnVlO1xuVHdlZW5UcmFuc2l0aW9uLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBjdXJ2ZTogVHdlZW5UcmFuc2l0aW9uLkN1cnZlcy5saW5lYXIsXG4gICAgZHVyYXRpb246IDUwMCxcbiAgICBzcGVlZDogMFxufTtcbnZhciByZWdpc3RlcmVkQ3VydmVzID0ge307XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSA9IGZ1bmN0aW9uIHJlZ2lzdGVyQ3VydmUoY3VydmVOYW1lLCBjdXJ2ZSkge1xuICAgIGlmICghcmVnaXN0ZXJlZEN1cnZlc1tjdXJ2ZU5hbWVdKSB7XG4gICAgICAgIHJlZ2lzdGVyZWRDdXJ2ZXNbY3VydmVOYW1lXSA9IGN1cnZlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblR3ZWVuVHJhbnNpdGlvbi51bnJlZ2lzdGVyQ3VydmUgPSBmdW5jdGlvbiB1bnJlZ2lzdGVyQ3VydmUoY3VydmVOYW1lKSB7XG4gICAgaWYgKHJlZ2lzdGVyZWRDdXJ2ZXNbY3VydmVOYW1lXSkge1xuICAgICAgICBkZWxldGUgcmVnaXN0ZXJlZEN1cnZlc1tjdXJ2ZU5hbWVdO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblR3ZWVuVHJhbnNpdGlvbi5nZXRDdXJ2ZSA9IGZ1bmN0aW9uIGdldEN1cnZlKGN1cnZlTmFtZSkge1xuICAgIHZhciBjdXJ2ZSA9IHJlZ2lzdGVyZWRDdXJ2ZXNbY3VydmVOYW1lXTtcbiAgICBpZiAoY3VydmUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIGN1cnZlO1xuICAgIGVsc2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjdXJ2ZSBub3QgcmVnaXN0ZXJlZCcpO1xufTtcblR3ZWVuVHJhbnNpdGlvbi5nZXRDdXJ2ZXMgPSBmdW5jdGlvbiBnZXRDdXJ2ZXMoKSB7XG4gICAgcmV0dXJuIHJlZ2lzdGVyZWRDdXJ2ZXM7XG59O1xuZnVuY3Rpb24gX2ludGVycG9sYXRlKGEsIGIsIHQpIHtcbiAgICByZXR1cm4gKDEgLSB0KSAqIGEgKyB0ICogYjtcbn1cbmZ1bmN0aW9uIF9jbG9uZShvYmopIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgIHJldHVybiBvYmouc2xpY2UoMCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKG9iaik7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiBvYmo7XG59XG5mdW5jdGlvbiBfbm9ybWFsaXplKHRyYW5zaXRpb24sIGRlZmF1bHRUcmFuc2l0aW9uKSB7XG4gICAgdmFyIHJlc3VsdCA9IHsgY3VydmU6IGRlZmF1bHRUcmFuc2l0aW9uLmN1cnZlIH07XG4gICAgaWYgKGRlZmF1bHRUcmFuc2l0aW9uLmR1cmF0aW9uKVxuICAgICAgICByZXN1bHQuZHVyYXRpb24gPSBkZWZhdWx0VHJhbnNpdGlvbi5kdXJhdGlvbjtcbiAgICBpZiAoZGVmYXVsdFRyYW5zaXRpb24uc3BlZWQpXG4gICAgICAgIHJlc3VsdC5zcGVlZCA9IGRlZmF1bHRUcmFuc2l0aW9uLnNwZWVkO1xuICAgIGlmICh0cmFuc2l0aW9uIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uLmR1cmF0aW9uICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXN1bHQuZHVyYXRpb24gPSB0cmFuc2l0aW9uLmR1cmF0aW9uO1xuICAgICAgICBpZiAodHJhbnNpdGlvbi5jdXJ2ZSlcbiAgICAgICAgICAgIHJlc3VsdC5jdXJ2ZSA9IHRyYW5zaXRpb24uY3VydmU7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uLnNwZWVkKVxuICAgICAgICAgICAgcmVzdWx0LnNwZWVkID0gdHJhbnNpdGlvbi5zcGVlZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiByZXN1bHQuY3VydmUgPT09ICdzdHJpbmcnKVxuICAgICAgICByZXN1bHQuY3VydmUgPSBUd2VlblRyYW5zaXRpb24uZ2V0Q3VydmUocmVzdWx0LmN1cnZlKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuY3VydmUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmN1cnZlID0gb3B0aW9ucy5jdXJ2ZTtcbiAgICBpZiAob3B0aW9ucy5kdXJhdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMuZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uO1xuICAgIGlmIChvcHRpb25zLnNwZWVkICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5zcGVlZCA9IG9wdGlvbnMuc3BlZWQ7XG59O1xuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoZW5kVmFsdWUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKCF0cmFuc2l0aW9uKSB7XG4gICAgICAgIHRoaXMucmVzZXQoZW5kVmFsdWUpO1xuICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3N0YXJ0VmFsdWUgPSBfY2xvbmUodGhpcy5nZXQoKSk7XG4gICAgdHJhbnNpdGlvbiA9IF9ub3JtYWxpemUodHJhbnNpdGlvbiwgdGhpcy5vcHRpb25zKTtcbiAgICBpZiAodHJhbnNpdGlvbi5zcGVlZCkge1xuICAgICAgICB2YXIgc3RhcnRWYWx1ZSA9IHRoaXMuX3N0YXJ0VmFsdWU7XG4gICAgICAgIGlmIChzdGFydFZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICB2YXIgdmFyaWFuY2UgPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBzdGFydFZhbHVlKVxuICAgICAgICAgICAgICAgIHZhcmlhbmNlICs9IChlbmRWYWx1ZVtpXSAtIHN0YXJ0VmFsdWVbaV0pICogKGVuZFZhbHVlW2ldIC0gc3RhcnRWYWx1ZVtpXSk7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmR1cmF0aW9uID0gTWF0aC5zcXJ0KHZhcmlhbmNlKSAvIHRyYW5zaXRpb24uc3BlZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmR1cmF0aW9uID0gTWF0aC5hYnMoZW5kVmFsdWUgLSBzdGFydFZhbHVlKSAvIHRyYW5zaXRpb24uc3BlZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLl9lbmRWYWx1ZSA9IF9jbG9uZShlbmRWYWx1ZSk7XG4gICAgdGhpcy5fc3RhcnRWZWxvY2l0eSA9IF9jbG9uZSh0cmFuc2l0aW9uLnZlbG9jaXR5KTtcbiAgICB0aGlzLl9kdXJhdGlvbiA9IHRyYW5zaXRpb24uZHVyYXRpb247XG4gICAgdGhpcy5fY3VydmUgPSB0cmFuc2l0aW9uLmN1cnZlO1xuICAgIHRoaXMuX2FjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbn07XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoc3RhcnRWYWx1ZSwgc3RhcnRWZWxvY2l0eSkge1xuICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLl9jYWxsYmFjaztcbiAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICAgIHRoaXMuc3RhdGUgPSBfY2xvbmUoc3RhcnRWYWx1ZSk7XG4gICAgdGhpcy52ZWxvY2l0eSA9IF9jbG9uZShzdGFydFZlbG9jaXR5KTtcbiAgICB0aGlzLl9zdGFydFRpbWUgPSAwO1xuICAgIHRoaXMuX2R1cmF0aW9uID0gMDtcbiAgICB0aGlzLl91cGRhdGVUaW1lID0gMDtcbiAgICB0aGlzLl9zdGFydFZhbHVlID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLl9zdGFydFZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eTtcbiAgICB0aGlzLl9lbmRWYWx1ZSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XG59O1xuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5nZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIGdldFZlbG9jaXR5KCkge1xuICAgIHJldHVybiB0aGlzLnZlbG9jaXR5O1xufTtcblR3ZWVuVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KHRpbWVzdGFtcCkge1xuICAgIHRoaXMudXBkYXRlKHRpbWVzdGFtcCk7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XG59O1xuZnVuY3Rpb24gX2NhbGN1bGF0ZVZlbG9jaXR5KGN1cnJlbnQsIHN0YXJ0LCBjdXJ2ZSwgZHVyYXRpb24sIHQpIHtcbiAgICB2YXIgdmVsb2NpdHk7XG4gICAgdmFyIGVwcyA9IDFlLTc7XG4gICAgdmFyIHNwZWVkID0gKGN1cnZlKHQpIC0gY3VydmUodCAtIGVwcykpIC8gZXBzO1xuICAgIGlmIChjdXJyZW50IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgdmVsb2NpdHkgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdXJyZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGN1cnJlbnRbaV0gPT09ICdudW1iZXInKVxuICAgICAgICAgICAgICAgIHZlbG9jaXR5W2ldID0gc3BlZWQgKiAoY3VycmVudFtpXSAtIHN0YXJ0W2ldKSAvIGR1cmF0aW9uO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHZlbG9jaXR5W2ldID0gMDtcbiAgICAgICAgfVxuICAgIH0gZWxzZVxuICAgICAgICB2ZWxvY2l0eSA9IHNwZWVkICogKGN1cnJlbnQgLSBzdGFydCkgLyBkdXJhdGlvbjtcbiAgICByZXR1cm4gdmVsb2NpdHk7XG59XG5mdW5jdGlvbiBfY2FsY3VsYXRlU3RhdGUoc3RhcnQsIGVuZCwgdCkge1xuICAgIHZhciBzdGF0ZTtcbiAgICBpZiAoc3RhcnQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBzdGF0ZSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXJ0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0YXJ0W2ldID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgICAgICBzdGF0ZVtpXSA9IF9pbnRlcnBvbGF0ZShzdGFydFtpXSwgZW5kW2ldLCB0KTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBzdGF0ZVtpXSA9IHN0YXJ0W2ldO1xuICAgICAgICB9XG4gICAgfSBlbHNlXG4gICAgICAgIHN0YXRlID0gX2ludGVycG9sYXRlKHN0YXJ0LCBlbmQsIHQpO1xuICAgIHJldHVybiBzdGF0ZTtcbn1cblR3ZWVuVHJhbnNpdGlvbi5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlKHRpbWVzdGFtcCkge1xuICAgIGlmICghdGhpcy5fYWN0aXZlKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5fY2FsbGJhY2s7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRpbWVzdGFtcClcbiAgICAgICAgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICBpZiAodGhpcy5fdXBkYXRlVGltZSA+PSB0aW1lc3RhbXApXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLl91cGRhdGVUaW1lID0gdGltZXN0YW1wO1xuICAgIHZhciB0aW1lU2luY2VTdGFydCA9IHRpbWVzdGFtcCAtIHRoaXMuX3N0YXJ0VGltZTtcbiAgICBpZiAodGltZVNpbmNlU3RhcnQgPj0gdGhpcy5fZHVyYXRpb24pIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuX2VuZFZhbHVlO1xuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gX2NhbGN1bGF0ZVZlbG9jaXR5KHRoaXMuc3RhdGUsIHRoaXMuX3N0YXJ0VmFsdWUsIHRoaXMuX2N1cnZlLCB0aGlzLl9kdXJhdGlvbiwgMSk7XG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGltZVNpbmNlU3RhcnQgPCAwKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLl9zdGFydFZhbHVlO1xuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy5fc3RhcnRWZWxvY2l0eTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgdCA9IHRpbWVTaW5jZVN0YXJ0IC8gdGhpcy5fZHVyYXRpb247XG4gICAgICAgIHRoaXMuc3RhdGUgPSBfY2FsY3VsYXRlU3RhdGUodGhpcy5fc3RhcnRWYWx1ZSwgdGhpcy5fZW5kVmFsdWUsIHRoaXMuX2N1cnZlKHQpKTtcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IF9jYWxjdWxhdGVWZWxvY2l0eSh0aGlzLnN0YXRlLCB0aGlzLl9zdGFydFZhbHVlLCB0aGlzLl9jdXJ2ZSwgdGhpcy5fZHVyYXRpb24sIHQpO1xuICAgIH1cbn07XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcbn07XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLmhhbHQgPSBmdW5jdGlvbiBoYWx0KCkge1xuICAgIHRoaXMucmVzZXQodGhpcy5nZXQoKSk7XG59O1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ2xpbmVhcicsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMubGluZWFyKTtcblR3ZWVuVHJhbnNpdGlvbi5yZWdpc3RlckN1cnZlKCdlYXNlSW4nLCBUd2VlblRyYW5zaXRpb24uQ3VydmVzLmVhc2VJbik7XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSgnZWFzZU91dCcsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMuZWFzZU91dCk7XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSgnZWFzZUluT3V0JywgVHdlZW5UcmFuc2l0aW9uLkN1cnZlcy5lYXNlSW5PdXQpO1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ2Vhc2VPdXRCb3VuY2UnLCBUd2VlblRyYW5zaXRpb24uQ3VydmVzLmVhc2VPdXRCb3VuY2UpO1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ3NwcmluZycsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMuc3ByaW5nKTtcblR3ZWVuVHJhbnNpdGlvbi5jdXN0b21DdXJ2ZSA9IGZ1bmN0aW9uIGN1c3RvbUN1cnZlKHYxLCB2Mikge1xuICAgIHYxID0gdjEgfHwgMDtcbiAgICB2MiA9IHYyIHx8IDA7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB2MSAqIHQgKyAoLTIgKiB2MSAtIHYyICsgMykgKiB0ICogdCArICh2MSArIHYyIC0gMikgKiB0ICogdCAqIHQ7XG4gICAgfTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFR3ZWVuVHJhbnNpdGlvbjsiLCJ2YXIgVXRpbGl0eSA9IHt9O1xuVXRpbGl0eS5EaXJlY3Rpb24gPSB7XG4gICAgWDogMCxcbiAgICBZOiAxLFxuICAgIFo6IDJcbn07XG5VdGlsaXR5LmFmdGVyID0gZnVuY3Rpb24gYWZ0ZXIoY291bnQsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGNvdW50ZXIgPSBjb3VudDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb3VudGVyLS07XG4gICAgICAgIGlmIChjb3VudGVyID09PSAwKVxuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xufTtcblV0aWxpdHkubG9hZFVSTCA9IGZ1bmN0aW9uIGxvYWRVUkwodXJsLCBjYWxsYmFjaykge1xuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gb25yZWFkeXN0YXRlY2hhbmdlKCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICB4aHIuc2VuZCgpO1xufTtcblV0aWxpdHkuY3JlYXRlRG9jdW1lbnRGcmFnbWVudEZyb21IVE1MID0gZnVuY3Rpb24gY3JlYXRlRG9jdW1lbnRGcmFnbWVudEZyb21IVE1MKGh0bWwpIHtcbiAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gaHRtbDtcbiAgICB2YXIgcmVzdWx0ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHdoaWxlIChlbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSlcbiAgICAgICAgcmVzdWx0LmFwcGVuZENoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5VdGlsaXR5LmNsb25lID0gZnVuY3Rpb24gY2xvbmUoYikge1xuICAgIHZhciBhO1xuICAgIGlmICh0eXBlb2YgYiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgYSA9IGIgaW5zdGFuY2VvZiBBcnJheSA/IFtdIDoge307XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGJba2V5XSA9PT0gJ29iamVjdCcgJiYgYltrZXldICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJba2V5XSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIGFba2V5XSA9IG5ldyBBcnJheShiW2tleV0ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiW2tleV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFba2V5XVtpXSA9IFV0aWxpdHkuY2xvbmUoYltrZXldW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFba2V5XSA9IFV0aWxpdHkuY2xvbmUoYltrZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGEgPSBiO1xuICAgIH1cbiAgICByZXR1cm4gYTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFV0aWxpdHk7IiwiLy8gbG9hZCBjc3NcbnJlcXVpcmUoJy4vc3R5bGVzJyk7XG5cbi8vIExvYWQgcG9seWZpbGxzXG5yZXF1aXJlKCdmYW1vdXMtcG9seWZpbGxzJyk7XG5cbi8vIGltcG9ydCBkZXBlbmRlbmNpZXNcbnZhciBFbmdpbmUgPSByZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvRW5naW5lJyk7XG52YXIgTW9kaWZpZXIgPSByZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvTW9kaWZpZXInKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgSW1hZ2VTdXJmYWNlID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9zdXJmYWNlcy9JbWFnZVN1cmZhY2UnKTtcblxuLy8gY3JlYXRlIHRoZSBtYWluIGNvbnRleHRcbnZhciBtYWluQ29udGV4dCA9IEVuZ2luZS5jcmVhdGVDb250ZXh0KCk7XG5cbi8vIHlvdXIgYXBwIGhlcmVcbnZhciBsb2dvID0gbmV3IEltYWdlU3VyZmFjZSh7XG4gIHNpemU6IFsyMDAsIDIwMF0sXG4gIGNvbnRlbnQ6ICdpbWFnZXMvZmFtb3VzX2xvZ28ucG5nJyxcbiAgY2xhc3NlczogWydiYWNrZmFjZVZpc2liaWxpdHknXVxufSk7XG5cbnZhciBpbml0aWFsVGltZSA9IERhdGUubm93KCk7XG52YXIgY2VudGVyU3Bpbk1vZGlmaWVyID0gbmV3IE1vZGlmaWVyKHtcbiAgYWxpZ246IFswLjUsIDAuNV0sXG4gIG9yaWdpbjogWzAuNSwgMC41XSxcbiAgdHJhbnNmb3JtOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gVHJhbnNmb3JtLnJvdGF0ZVkoLjAwMiAqIChEYXRlLm5vdygpIC0gaW5pdGlhbFRpbWUpKTtcbiAgfVxufSk7XG5cbm1haW5Db250ZXh0LmFkZChjZW50ZXJTcGluTW9kaWZpZXIpLmFkZChsb2dvKTtcbiIsInZhciBjc3MgPSBcImh0bWwge1xcbiAgYmFja2dyb3VuZDogI2ZmZjtcXG59XFxuXFxuLmJhY2tmYWNlVmlzaWJpbGl0eSB7XFxuICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IHZpc2libGU7XFxuICBiYWNrZmFjZS12aXNpYmlsaXR5OiB2aXNpYmxlO1xcbn1cXG5cIjsgKHJlcXVpcmUoXCIvVXNlcnMvcHNoYXRhcmEvRG9jdW1lbnRzL1Byb2dyYW1taW5nL0hhY2tSZWFjdG9yL0FkRmFtZS9ub2RlX21vZHVsZXMvY3NzaWZ5XCIpKShjc3MpOyBtb2R1bGUuZXhwb3J0cyA9IGNzczsiLCIvLyBsb2FkIGNzc1xucmVxdWlyZSgnZmFtb3VzL3NyYy9jb3JlL2ZhbW91cy5jc3MnKTtcbnJlcXVpcmUoJy4vYXBwLmNzcycpO1xuIl19
