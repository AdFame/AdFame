(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/cssify/browser.js":[function(require,module,exports){
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

},{}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous-polyfills/classList.js":[function(require,module,exports){

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

},{}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous-polyfills/functionPrototypeBind.js":[function(require,module,exports){
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

},{}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous-polyfills/index.js":[function(require,module,exports){
require('./classList.js');
require('./functionPrototypeBind.js');
require('./requestAnimationFrame.js');
},{"./classList.js":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous-polyfills/classList.js","./functionPrototypeBind.js":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous-polyfills/functionPrototypeBind.js","./requestAnimationFrame.js":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous-polyfills/requestAnimationFrame.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous-polyfills/requestAnimationFrame.js":[function(require,module,exports){
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

},{}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Context.js":[function(require,module,exports){
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
},{"../transitions/Transitionable":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/Transitionable.js","./ElementAllocator":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/ElementAllocator.js","./EventHandler":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/EventHandler.js","./RenderNode":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/RenderNode.js","./Transform":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Transform.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/ElementAllocator.js":[function(require,module,exports){
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
            container.appendChild(oldContainer.firstChild);
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
},{}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/ElementOutput.js":[function(require,module,exports){
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
},{"./Entity":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Entity.js","./EventHandler":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/EventHandler.js","./Transform":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Transform.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Engine.js":[function(require,module,exports){
var Context = require('./Context');
var EventHandler = require('./EventHandler');
var OptionsManager = require('./OptionsManager');
var Engine = {};
var contexts = [];
var nextTickQueue = [];
var currentFrame = 0;
var nextTickFrame = 0;
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
    currentFrame++;
    nextTickFrame = currentFrame;
    var currentTime = Date.now();
    if (frameTimeLimit && currentTime - lastTime < frameTimeLimit)
        return;
    var i = 0;
    frameTime = currentTime - lastTime;
    lastTime = currentTime;
    eventHandler.emit('prerender');
    if (nextTickQueue.length) {
        for (i = 0; i < nextTickQueue[0].length; i++)
            nextTickQueue[0][i].call(this, currentFrame);
        nextTickQueue.splice(0, 1);
    }
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
    var frameIndex = nextTickFrame - currentFrame;
    if (!nextTickQueue[frameIndex])
        nextTickQueue[frameIndex] = [];
    function frameChecker(frame) {
        var nextFrame = frame + 1;
        if (nextTickFrame !== nextFrame)
            nextTickFrame = nextFrame;
        fn();
    }
    nextTickQueue[frameIndex].push(frameChecker);
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
},{"./Context":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Context.js","./EventHandler":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/EventHandler.js","./OptionsManager":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/OptionsManager.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Entity.js":[function(require,module,exports){
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
},{}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/EventEmitter.js":[function(require,module,exports){
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
},{}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/EventHandler.js":[function(require,module,exports){
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
},{"./EventEmitter":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/EventEmitter.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Modifier.js":[function(require,module,exports){
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
},{"../transitions/Transitionable":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/Transitionable.js","../transitions/TransitionableTransform":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/TransitionableTransform.js","./Transform":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Transform.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/OptionsManager.js":[function(require,module,exports){
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
},{"./EventHandler":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/EventHandler.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/RenderNode.js":[function(require,module,exports){
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
},{"./Entity":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Entity.js","./SpecParser":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/SpecParser.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/SpecParser.js":[function(require,module,exports){
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
},{"./Transform":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Transform.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Surface.js":[function(require,module,exports){
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
            if (size[0] === true) {
                if (this._trueSizeCheck || this._size[0] === 0) {
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
            }
            if (size[1] === true) {
                if (this._trueSizeCheck || this._size[1] === 0) {
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
},{"./ElementOutput":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/ElementOutput.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Transform.js":[function(require,module,exports){
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
},{}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/View.js":[function(require,module,exports){
var EventHandler = require('./EventHandler');
var OptionsManager = require('./OptionsManager');
var RenderNode = require('./RenderNode');
var Utility = require('../utilities/Utility');
function View(options) {
    this._node = new RenderNode();
    this._eventInput = new EventHandler();
    this._eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this._eventInput);
    EventHandler.setOutputHandler(this, this._eventOutput);
    this.options = Utility.clone(this.constructor.DEFAULT_OPTIONS || View.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
}
View.DEFAULT_OPTIONS = {};
View.prototype.getOptions = function getOptions(key) {
    return this._optionsManager.getOptions(key);
};
View.prototype.setOptions = function setOptions(options) {
    this._optionsManager.patch(options);
};
View.prototype.add = function add() {
    return this._node.add.apply(this._node, arguments);
};
View.prototype._add = View.prototype.add;
View.prototype.render = function render() {
    return this._node.render();
};
View.prototype.getSize = function getSize() {
    if (this._node && this._node.getSize) {
        return this._node.getSize.apply(this._node, arguments) || this.options.size;
    } else
        return this.options.size;
};
module.exports = View;
},{"../utilities/Utility":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/utilities/Utility.js","./EventHandler":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/EventHandler.js","./OptionsManager":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/OptionsManager.js","./RenderNode":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/RenderNode.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/ViewSequence.js":[function(require,module,exports){
function ViewSequence(options) {
    if (!options)
        options = [];
    if (options instanceof Array)
        options = { array: options };
    this._ = null;
    this.index = options.index || 0;
    if (options.array)
        this._ = new this.constructor.Backing(options.array);
    else if (options._)
        this._ = options._;
    if (this.index === this._.firstIndex)
        this._.firstNode = this;
    if (this.index === this._.firstIndex + this._.array.length - 1)
        this._.lastNode = this;
    if (options.loop !== undefined)
        this._.loop = options.loop;
    if (options.trackSize !== undefined)
        this._.trackSize = options.trackSize;
    this._previousNode = null;
    this._nextNode = null;
}
ViewSequence.Backing = function Backing(array) {
    this.array = array;
    this.firstIndex = 0;
    this.loop = false;
    this.firstNode = null;
    this.lastNode = null;
    this.cumulativeSizes = [[
            0,
            0
        ]];
    this.sizeDirty = true;
    this.trackSize = false;
};
ViewSequence.Backing.prototype.getValue = function getValue(i) {
    var _i = i - this.firstIndex;
    if (_i < 0 || _i >= this.array.length)
        return null;
    return this.array[_i];
};
ViewSequence.Backing.prototype.setValue = function setValue(i, value) {
    this.array[i - this.firstIndex] = value;
};
ViewSequence.Backing.prototype.getSize = function getSize(index) {
    return this.cumulativeSizes[index];
};
ViewSequence.Backing.prototype.calculateSize = function calculateSize(index) {
    index = index || this.array.length;
    var size = [
            0,
            0
        ];
    for (var i = 0; i < index; i++) {
        var nodeSize = this.array[i].getSize();
        if (!nodeSize)
            return undefined;
        if (size[0] !== undefined) {
            if (nodeSize[0] === undefined)
                size[0] = undefined;
            else
                size[0] += nodeSize[0];
        }
        if (size[1] !== undefined) {
            if (nodeSize[1] === undefined)
                size[1] = undefined;
            else
                size[1] += nodeSize[1];
        }
        this.cumulativeSizes[i + 1] = size.slice();
    }
    this.sizeDirty = false;
    return size;
};
ViewSequence.Backing.prototype.reindex = function reindex(start, removeCount, insertCount) {
    if (!this.array[0])
        return;
    var i = 0;
    var index = this.firstIndex;
    var indexShiftAmount = insertCount - removeCount;
    var node = this.firstNode;
    while (index < start - 1) {
        node = node.getNext();
        index++;
    }
    var spliceStartNode = node;
    for (i = 0; i < removeCount; i++) {
        node = node.getNext();
        if (node)
            node._previousNode = spliceStartNode;
    }
    var spliceResumeNode = node ? node.getNext() : null;
    spliceStartNode._nextNode = null;
    node = spliceStartNode;
    for (i = 0; i < insertCount; i++)
        node = node.getNext();
    index += insertCount;
    if (node !== spliceResumeNode) {
        node._nextNode = spliceResumeNode;
        if (spliceResumeNode)
            spliceResumeNode._previousNode = node;
    }
    if (spliceResumeNode) {
        node = spliceResumeNode;
        index++;
        while (node && index < this.array.length + this.firstIndex) {
            if (node._nextNode)
                node.index += indexShiftAmount;
            else
                node.index = index;
            node = node.getNext();
            index++;
        }
    }
    if (this.trackSize)
        this.sizeDirty = true;
};
ViewSequence.prototype.getPrevious = function getPrevious() {
    var len = this._.array.length;
    if (!len) {
        this._previousNode = null;
    } else if (this.index === this._.firstIndex) {
        if (this._.loop) {
            this._previousNode = this._.lastNode || new this.constructor({
                _: this._,
                index: this._.firstIndex + len - 1
            });
            this._previousNode._nextNode = this;
        } else {
            this._previousNode = null;
        }
    } else if (!this._previousNode) {
        this._previousNode = new this.constructor({
            _: this._,
            index: this.index - 1
        });
        this._previousNode._nextNode = this;
    }
    return this._previousNode;
};
ViewSequence.prototype.getNext = function getNext() {
    var len = this._.array.length;
    if (!len) {
        this._nextNode = null;
    } else if (this.index === this._.firstIndex + len - 1) {
        if (this._.loop) {
            this._nextNode = this._.firstNode || new this.constructor({
                _: this._,
                index: this._.firstIndex
            });
            this._nextNode._previousNode = this;
        } else {
            this._nextNode = null;
        }
    } else if (!this._nextNode) {
        this._nextNode = new this.constructor({
            _: this._,
            index: this.index + 1
        });
        this._nextNode._previousNode = this;
    }
    return this._nextNode;
};
ViewSequence.prototype.indexOf = function indexOf(item) {
    return this._.array.indexOf(item);
};
ViewSequence.prototype.getIndex = function getIndex() {
    return this.index;
};
ViewSequence.prototype.toString = function toString() {
    return '' + this.index;
};
ViewSequence.prototype.unshift = function unshift(value) {
    this._.array.unshift.apply(this._.array, arguments);
    this._.firstIndex -= arguments.length;
    if (this._.trackSize)
        this._.sizeDirty = true;
};
ViewSequence.prototype.push = function push(value) {
    this._.array.push.apply(this._.array, arguments);
    if (this._.trackSize)
        this._.sizeDirty = true;
};
ViewSequence.prototype.splice = function splice(index, howMany) {
    var values = Array.prototype.slice.call(arguments, 2);
    this._.array.splice.apply(this._.array, [
        index - this._.firstIndex,
        howMany
    ].concat(values));
    this._.reindex(index, howMany, values.length);
};
ViewSequence.prototype.swap = function swap(other) {
    var otherValue = other.get();
    var myValue = this.get();
    this._.setValue(this.index, otherValue);
    this._.setValue(other.index, myValue);
    var myPrevious = this._previousNode;
    var myNext = this._nextNode;
    var myIndex = this.index;
    var otherPrevious = other._previousNode;
    var otherNext = other._nextNode;
    var otherIndex = other.index;
    this.index = otherIndex;
    this._previousNode = otherPrevious === this ? other : otherPrevious;
    if (this._previousNode)
        this._previousNode._nextNode = this;
    this._nextNode = otherNext === this ? other : otherNext;
    if (this._nextNode)
        this._nextNode._previousNode = this;
    other.index = myIndex;
    other._previousNode = myPrevious === other ? this : myPrevious;
    if (other._previousNode)
        other._previousNode._nextNode = other;
    other._nextNode = myNext === other ? this : myNext;
    if (other._nextNode)
        other._nextNode._previousNode = other;
    if (this.index === this._.firstIndex)
        this._.firstNode = this;
    else if (this.index === this._.firstIndex + this._.array.length - 1)
        this._.lastNode = this;
    if (other.index === this._.firstIndex)
        this._.firstNode = other;
    else if (other.index === this._.firstIndex + this._.array.length - 1)
        this._.lastNode = other;
    if (this._.trackSize)
        this._.sizeDirty = true;
};
ViewSequence.prototype.get = function get() {
    return this._.getValue(this.index);
};
ViewSequence.prototype.getSize = function getSize() {
    var target = this.get();
    return target ? target.getSize() : null;
};
ViewSequence.prototype.render = function render() {
    if (this._.trackSize && this._.sizeDirty)
        this._.calculateSize();
    var target = this.get();
    return target ? target.render.apply(target, arguments) : null;
};
module.exports = ViewSequence;
},{}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/famous.css":[function(require,module,exports){
var css = "/* This Source Code Form is subject to the terms of the Mozilla Public\n * License, v. 2.0. If a copy of the MPL was not distributed with this\n * file, You can obtain one at http://mozilla.org/MPL/2.0/.\n *\n * Owner: mark@famo.us\n * @license MPL 2.0\n * @copyright Famous Industries, Inc. 2014\n */\n\n.famous-root {\n    width: 100%;\n    height: 100%;\n    margin: 0px;\n    padding: 0px;\n    opacity: .999999; /* ios8 hotfix */\n    overflow: hidden;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n}\n\n.famous-container, .famous-group {\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    bottom: 0px;\n    right: 0px;\n    overflow: visible;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-backface-visibility: visible;\n    backface-visibility: visible;\n    pointer-events: none;\n}\n\n.famous-group {\n    width: 0px;\n    height: 0px;\n    margin: 0px;\n    padding: 0px;\n}\n\n.famous-surface {\n    position: absolute;\n    -webkit-transform-origin: center center;\n    transform-origin: center center;\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    -webkit-tap-highlight-color: transparent;\n    pointer-events: auto;\n}\n\n.famous-container-group {\n    position: relative;\n    width: 100%;\n    height: 100%;\n}\n"; (require("/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/cssify"))(css); module.exports = css;
},{"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/cssify":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/cssify/browser.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/inputs/GenericSync.js":[function(require,module,exports){
var EventHandler = require('../core/EventHandler');
function GenericSync(syncs, options) {
    this._eventInput = new EventHandler();
    this._eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this._eventInput);
    EventHandler.setOutputHandler(this, this._eventOutput);
    this._syncs = {};
    if (syncs)
        this.addSync(syncs);
    if (options)
        this.setOptions(options);
}
GenericSync.DIRECTION_X = 0;
GenericSync.DIRECTION_Y = 1;
GenericSync.DIRECTION_Z = 2;
var registry = {};
GenericSync.register = function register(syncObject) {
    for (var key in syncObject) {
        if (registry[key]) {
            if (registry[key] === syncObject[key])
                return;
            else
                throw new Error('this key is registered to a different sync class');
        } else
            registry[key] = syncObject[key];
    }
};
GenericSync.prototype.setOptions = function (options) {
    for (var key in this._syncs) {
        this._syncs[key].setOptions(options);
    }
};
GenericSync.prototype.pipeSync = function pipeToSync(key) {
    var sync = this._syncs[key];
    this._eventInput.pipe(sync);
    sync.pipe(this._eventOutput);
};
GenericSync.prototype.unpipeSync = function unpipeFromSync(key) {
    var sync = this._syncs[key];
    this._eventInput.unpipe(sync);
    sync.unpipe(this._eventOutput);
};
function _addSingleSync(key, options) {
    if (!registry[key])
        return;
    this._syncs[key] = new registry[key](options);
    this.pipeSync(key);
}
GenericSync.prototype.addSync = function addSync(syncs) {
    if (syncs instanceof Array)
        for (var i = 0; i < syncs.length; i++)
            _addSingleSync.call(this, syncs[i]);
    else if (syncs instanceof Object)
        for (var key in syncs)
            _addSingleSync.call(this, key, syncs[key]);
};
module.exports = GenericSync;
},{"../core/EventHandler":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/EventHandler.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/inputs/MouseSync.js":[function(require,module,exports){
var EventHandler = require('../core/EventHandler');
var OptionsManager = require('../core/OptionsManager');
function MouseSync(options) {
    this.options = Object.create(MouseSync.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this._eventInput = new EventHandler();
    this._eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this._eventInput);
    EventHandler.setOutputHandler(this, this._eventOutput);
    this._eventInput.on('mousedown', _handleStart.bind(this));
    this._eventInput.on('mousemove', _handleMove.bind(this));
    this._eventInput.on('mouseup', _handleEnd.bind(this));
    if (this.options.propogate)
        this._eventInput.on('mouseleave', _handleLeave.bind(this));
    else
        this._eventInput.on('mouseleave', _handleEnd.bind(this));
    if (this.options.clickThreshold) {
        window.addEventListener('click', function (event) {
            if (Math.sqrt(Math.pow(this._displacement[0], 2) + Math.pow(this._displacement[1], 2)) > this.options.clickThreshold) {
                event.stopPropagation();
            }
        }.bind(this), true);
    }
    this._payload = {
        delta: null,
        position: null,
        velocity: null,
        clientX: 0,
        clientY: 0,
        offsetX: 0,
        offsetY: 0
    };
    this._positionHistory = [];
    this._position = null;
    this._prevCoord = undefined;
    this._prevTime = undefined;
    this._down = false;
    this._moved = false;
    this._displacement = [
        0,
        0
    ];
    this._documentActive = false;
}
MouseSync.DEFAULT_OPTIONS = {
    clickThreshold: undefined,
    direction: undefined,
    rails: false,
    scale: 1,
    propogate: true,
    velocitySampleLength: 10,
    preventDefault: true
};
MouseSync.DIRECTION_X = 0;
MouseSync.DIRECTION_Y = 1;
var MINIMUM_TICK_TIME = 8;
function _handleStart(event) {
    var delta;
    var velocity;
    if (this.options.preventDefault)
        event.preventDefault();
    var x = event.clientX;
    var y = event.clientY;
    this._prevCoord = [
        x,
        y
    ];
    this._prevTime = Date.now();
    this._down = true;
    this._move = false;
    if (this.options.direction !== undefined) {
        this._position = 0;
        delta = 0;
        velocity = 0;
    } else {
        this._position = [
            0,
            0
        ];
        delta = [
            0,
            0
        ];
        velocity = [
            0,
            0
        ];
    }
    if (this.options.clickThreshold) {
        this._displacement = [
            0,
            0
        ];
    }
    var payload = this._payload;
    payload.delta = delta;
    payload.position = this._position;
    payload.velocity = velocity;
    payload.clientX = x;
    payload.clientY = y;
    payload.offsetX = event.offsetX;
    payload.offsetY = event.offsetY;
    this._positionHistory.push({
        position: payload.position.slice ? payload.position.slice(0) : payload.position,
        time: this._prevTime
    });
    this._eventOutput.emit('start', payload);
    this._documentActive = false;
}
function _handleMove(event) {
    if (!this._prevCoord)
        return;
    var prevCoord = this._prevCoord;
    var prevTime = this._prevTime;
    var x = event.clientX;
    var y = event.clientY;
    var currTime = Date.now();
    var diffX = x - prevCoord[0];
    var diffY = y - prevCoord[1];
    if (this.options.rails) {
        if (Math.abs(diffX) > Math.abs(diffY))
            diffY = 0;
        else
            diffX = 0;
    }
    var diffTime = Math.max(currTime - this._positionHistory[0].time, MINIMUM_TICK_TIME);
    var scale = this.options.scale;
    var nextVel;
    var nextDelta;
    if (this.options.direction === MouseSync.DIRECTION_X) {
        nextDelta = scale * diffX;
        this._position += nextDelta;
        nextVel = scale * (this._position - this._positionHistory[0].position) / diffTime;
    } else if (this.options.direction === MouseSync.DIRECTION_Y) {
        nextDelta = scale * diffY;
        this._position += nextDelta;
        nextVel = scale * (this._position - this._positionHistory[0].position) / diffTime;
    } else {
        nextDelta = [
            scale * diffX,
            scale * diffY
        ];
        nextVel = [
            scale * (this._position[0] - this._positionHistory[0].position[0]) / diffTime,
            scale * (this._position[1] - this._positionHistory[0].position[1]) / diffTime
        ];
        this._position[0] += nextDelta[0];
        this._position[1] += nextDelta[1];
    }
    if (this.options.clickThreshold !== false) {
        this._displacement[0] += diffX;
        this._displacement[1] += diffY;
    }
    var payload = this._payload;
    payload.delta = nextDelta;
    payload.position = this._position;
    payload.velocity = nextVel;
    payload.clientX = x;
    payload.clientY = y;
    payload.offsetX = event.offsetX;
    payload.offsetY = event.offsetY;
    if (this._positionHistory.length === this.options.velocitySampleLength) {
        this._positionHistory.shift();
    }
    this._positionHistory.push({
        position: payload.position.slice ? payload.position.slice(0) : payload.position,
        time: currTime
    });
    this._eventOutput.emit('update', payload);
    this._prevCoord = [
        x,
        y
    ];
    this._prevTime = currTime;
    this._move = true;
}
function _handleEnd(event) {
    if (!this._down)
        return;
    this._eventOutput.emit('end', this._payload);
    this._prevCoord = undefined;
    this._prevTime = undefined;
    this._down = false;
    this._move = false;
    this._positionHistory = [];
}
function _handleLeave(event) {
    if (!this._down || !this._move)
        return;
    if (!this._documentActive) {
        var boundMove = _handleMove.bind(this);
        var boundEnd = function (event) {
                _handleEnd.call(this, event);
                document.removeEventListener('mousemove', boundMove);
                document.removeEventListener('mouseup', boundEnd);
            }.bind(this, event);
        document.addEventListener('mousemove', boundMove);
        document.addEventListener('mouseup', boundEnd);
        this._documentActive = true;
    }
}
MouseSync.prototype.getOptions = function getOptions() {
    return this.options;
};
MouseSync.prototype.setOptions = function setOptions(options) {
    return this._optionsManager.setOptions(options);
};
module.exports = MouseSync;
},{"../core/EventHandler":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/EventHandler.js","../core/OptionsManager":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/OptionsManager.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/inputs/TouchSync.js":[function(require,module,exports){
var TouchTracker = require('./TouchTracker');
var EventHandler = require('../core/EventHandler');
var OptionsManager = require('../core/OptionsManager');
function TouchSync(options) {
    this.options = Object.create(TouchSync.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this._eventOutput = new EventHandler();
    this._touchTracker = new TouchTracker({ touchLimit: this.options.touchLimit });
    EventHandler.setOutputHandler(this, this._eventOutput);
    EventHandler.setInputHandler(this, this._touchTracker);
    this._touchTracker.on('trackstart', _handleStart.bind(this));
    this._touchTracker.on('trackmove', _handleMove.bind(this));
    this._touchTracker.on('trackend', _handleEnd.bind(this));
    this._payload = {
        delta: null,
        position: null,
        velocity: null,
        clientX: undefined,
        clientY: undefined,
        count: 0,
        touch: undefined
    };
    this._position = null;
}
TouchSync.DEFAULT_OPTIONS = {
    direction: undefined,
    rails: false,
    touchLimit: 1,
    velocitySampleLength: 10,
    scale: 1
};
TouchSync.DIRECTION_X = 0;
TouchSync.DIRECTION_Y = 1;
var MINIMUM_TICK_TIME = 8;
function _handleStart(data) {
    var velocity;
    var delta;
    if (this.options.direction !== undefined) {
        this._position = 0;
        velocity = 0;
        delta = 0;
    } else {
        this._position = [
            0,
            0
        ];
        velocity = [
            0,
            0
        ];
        delta = [
            0,
            0
        ];
    }
    var payload = this._payload;
    payload.delta = delta;
    payload.position = this._position;
    payload.velocity = velocity;
    payload.clientX = data.x;
    payload.clientY = data.y;
    payload.count = data.count;
    payload.touch = data.identifier;
    this._eventOutput.emit('start', payload);
}
function _handleMove(data) {
    var history = data.history;
    var currHistory = history[history.length - 1];
    var prevHistory = history[history.length - 2];
    var distantHistory = history[history.length - this.options.velocitySampleLength] ? history[history.length - this.options.velocitySampleLength] : history[history.length - 2];
    var distantTime = distantHistory.timestamp;
    var currTime = currHistory.timestamp;
    var diffX = currHistory.x - prevHistory.x;
    var diffY = currHistory.y - prevHistory.y;
    var velDiffX = currHistory.x - distantHistory.x;
    var velDiffY = currHistory.y - distantHistory.y;
    if (this.options.rails) {
        if (Math.abs(diffX) > Math.abs(diffY))
            diffY = 0;
        else
            diffX = 0;
        if (Math.abs(velDiffX) > Math.abs(velDiffY))
            velDiffY = 0;
        else
            velDiffX = 0;
    }
    var diffTime = Math.max(currTime - distantTime, MINIMUM_TICK_TIME);
    var velX = velDiffX / diffTime;
    var velY = velDiffY / diffTime;
    var scale = this.options.scale;
    var nextVel;
    var nextDelta;
    if (this.options.direction === TouchSync.DIRECTION_X) {
        nextDelta = scale * diffX;
        nextVel = scale * velX;
        this._position += nextDelta;
    } else if (this.options.direction === TouchSync.DIRECTION_Y) {
        nextDelta = scale * diffY;
        nextVel = scale * velY;
        this._position += nextDelta;
    } else {
        nextDelta = [
            scale * diffX,
            scale * diffY
        ];
        nextVel = [
            scale * velX,
            scale * velY
        ];
        this._position[0] += nextDelta[0];
        this._position[1] += nextDelta[1];
    }
    var payload = this._payload;
    payload.delta = nextDelta;
    payload.velocity = nextVel;
    payload.position = this._position;
    payload.clientX = data.x;
    payload.clientY = data.y;
    payload.count = data.count;
    payload.touch = data.identifier;
    this._eventOutput.emit('update', payload);
}
function _handleEnd(data) {
    this._payload.count = data.count;
    this._eventOutput.emit('end', this._payload);
}
TouchSync.prototype.setOptions = function setOptions(options) {
    return this._optionsManager.setOptions(options);
};
TouchSync.prototype.getOptions = function getOptions() {
    return this.options;
};
module.exports = TouchSync;
},{"../core/EventHandler":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/EventHandler.js","../core/OptionsManager":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/OptionsManager.js","./TouchTracker":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/inputs/TouchTracker.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/inputs/TouchTracker.js":[function(require,module,exports){
var EventHandler = require('../core/EventHandler');
var _now = Date.now;
function _timestampTouch(touch, event, history) {
    return {
        x: touch.clientX,
        y: touch.clientY,
        identifier: touch.identifier,
        origin: event.origin,
        timestamp: _now(),
        count: event.touches.length,
        history: history
    };
}
function _handleStart(event) {
    if (event.touches.length > this.touchLimit)
        return;
    this.isTouched = true;
    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i];
        var data = _timestampTouch(touch, event, null);
        this.eventOutput.emit('trackstart', data);
        if (!this.selective && !this.touchHistory[touch.identifier])
            this.track(data);
    }
}
function _handleMove(event) {
    if (event.touches.length > this.touchLimit)
        return;
    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i];
        var history = this.touchHistory[touch.identifier];
        if (history) {
            var data = _timestampTouch(touch, event, history);
            this.touchHistory[touch.identifier].push(data);
            this.eventOutput.emit('trackmove', data);
        }
    }
}
function _handleEnd(event) {
    if (!this.isTouched)
        return;
    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i];
        var history = this.touchHistory[touch.identifier];
        if (history) {
            var data = _timestampTouch(touch, event, history);
            this.eventOutput.emit('trackend', data);
            delete this.touchHistory[touch.identifier];
        }
    }
    this.isTouched = false;
}
function _handleUnpipe() {
    for (var i in this.touchHistory) {
        var history = this.touchHistory[i];
        this.eventOutput.emit('trackend', {
            touch: history[history.length - 1].touch,
            timestamp: Date.now(),
            count: 0,
            history: history
        });
        delete this.touchHistory[i];
    }
}
function TouchTracker(options) {
    this.selective = options.selective;
    this.touchLimit = options.touchLimit || 1;
    this.touchHistory = {};
    this.eventInput = new EventHandler();
    this.eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this.eventInput);
    EventHandler.setOutputHandler(this, this.eventOutput);
    this.eventInput.on('touchstart', _handleStart.bind(this));
    this.eventInput.on('touchmove', _handleMove.bind(this));
    this.eventInput.on('touchend', _handleEnd.bind(this));
    this.eventInput.on('touchcancel', _handleEnd.bind(this));
    this.eventInput.on('unpipe', _handleUnpipe.bind(this));
    this.isTouched = false;
}
TouchTracker.prototype.track = function track(data) {
    this.touchHistory[data.identifier] = [data];
};
module.exports = TouchTracker;
},{"../core/EventHandler":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/EventHandler.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/math/Vector.js":[function(require,module,exports){
function Vector(x, y, z) {
    if (arguments.length === 1 && x !== undefined)
        this.set(x);
    else {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }
    return this;
}
var _register = new Vector(0, 0, 0);
Vector.prototype.add = function add(v) {
    return _setXYZ.call(_register, this.x + v.x, this.y + v.y, this.z + v.z);
};
Vector.prototype.sub = function sub(v) {
    return _setXYZ.call(_register, this.x - v.x, this.y - v.y, this.z - v.z);
};
Vector.prototype.mult = function mult(r) {
    return _setXYZ.call(_register, r * this.x, r * this.y, r * this.z);
};
Vector.prototype.div = function div(r) {
    return this.mult(1 / r);
};
Vector.prototype.cross = function cross(v) {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    var vx = v.x;
    var vy = v.y;
    var vz = v.z;
    return _setXYZ.call(_register, z * vy - y * vz, x * vz - z * vx, y * vx - x * vy);
};
Vector.prototype.equals = function equals(v) {
    return v.x === this.x && v.y === this.y && v.z === this.z;
};
Vector.prototype.rotateX = function rotateX(theta) {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return _setXYZ.call(_register, x, y * cosTheta - z * sinTheta, y * sinTheta + z * cosTheta);
};
Vector.prototype.rotateY = function rotateY(theta) {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return _setXYZ.call(_register, z * sinTheta + x * cosTheta, y, z * cosTheta - x * sinTheta);
};
Vector.prototype.rotateZ = function rotateZ(theta) {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return _setXYZ.call(_register, x * cosTheta - y * sinTheta, x * sinTheta + y * cosTheta, z);
};
Vector.prototype.dot = function dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
};
Vector.prototype.normSquared = function normSquared() {
    return this.dot(this);
};
Vector.prototype.norm = function norm() {
    return Math.sqrt(this.normSquared());
};
Vector.prototype.normalize = function normalize(length) {
    if (arguments.length === 0)
        length = 1;
    var norm = this.norm();
    if (norm > 1e-7)
        return _setFromVector.call(_register, this.mult(length / norm));
    else
        return _setXYZ.call(_register, length, 0, 0);
};
Vector.prototype.clone = function clone() {
    return new Vector(this);
};
Vector.prototype.isZero = function isZero() {
    return !(this.x || this.y || this.z);
};
function _setXYZ(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
}
function _setFromArray(v) {
    return _setXYZ.call(this, v[0], v[1], v[2] || 0);
}
function _setFromVector(v) {
    return _setXYZ.call(this, v.x, v.y, v.z);
}
function _setFromNumber(x) {
    return _setXYZ.call(this, x, 0, 0);
}
Vector.prototype.set = function set(v) {
    if (v instanceof Array)
        return _setFromArray.call(this, v);
    if (typeof v === 'number')
        return _setFromNumber.call(this, v);
    return _setFromVector.call(this, v);
};
Vector.prototype.setXYZ = function (x, y, z) {
    return _setXYZ.apply(this, arguments);
};
Vector.prototype.set1D = function (x) {
    return _setFromNumber.call(this, x);
};
Vector.prototype.put = function put(v) {
    if (this === _register)
        _setFromVector.call(v, _register);
    else
        _setFromVector.call(v, this);
};
Vector.prototype.clear = function clear() {
    return _setXYZ.call(this, 0, 0, 0);
};
Vector.prototype.cap = function cap(cap) {
    if (cap === Infinity)
        return _setFromVector.call(_register, this);
    var norm = this.norm();
    if (norm > cap)
        return _setFromVector.call(_register, this.mult(cap / norm));
    else
        return _setFromVector.call(_register, this);
};
Vector.prototype.project = function project(n) {
    return n.mult(this.dot(n));
};
Vector.prototype.reflectAcross = function reflectAcross(n) {
    n.normalize().put(n);
    return _setFromVector(_register, this.sub(this.project(n).mult(2)));
};
Vector.prototype.get = function get() {
    return [
        this.x,
        this.y,
        this.z
    ];
};
Vector.prototype.get1D = function () {
    return this.x;
};
module.exports = Vector;
},{}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/modifiers/StateModifier.js":[function(require,module,exports){
var Modifier = require('../core/Modifier');
var Transform = require('../core/Transform');
var Transitionable = require('../transitions/Transitionable');
var TransitionableTransform = require('../transitions/TransitionableTransform');
function StateModifier(options) {
    this._transformState = new TransitionableTransform(Transform.identity);
    this._opacityState = new Transitionable(1);
    this._originState = new Transitionable([
        0,
        0
    ]);
    this._alignState = new Transitionable([
        0,
        0
    ]);
    this._sizeState = new Transitionable([
        0,
        0
    ]);
    this._proportionsState = new Transitionable([
        0,
        0
    ]);
    this._modifier = new Modifier({
        transform: this._transformState,
        opacity: this._opacityState,
        origin: null,
        align: null,
        size: null,
        proportions: null
    });
    this._hasOrigin = false;
    this._hasAlign = false;
    this._hasSize = false;
    this._hasProportions = false;
    if (options) {
        if (options.transform)
            this.setTransform(options.transform);
        if (options.opacity !== undefined)
            this.setOpacity(options.opacity);
        if (options.origin)
            this.setOrigin(options.origin);
        if (options.align)
            this.setAlign(options.align);
        if (options.size)
            this.setSize(options.size);
        if (options.proportions)
            this.setProportions(options.proportions);
    }
}
StateModifier.prototype.setTransform = function setTransform(transform, transition, callback) {
    this._transformState.set(transform, transition, callback);
    return this;
};
StateModifier.prototype.setOpacity = function setOpacity(opacity, transition, callback) {
    this._opacityState.set(opacity, transition, callback);
    return this;
};
StateModifier.prototype.setOrigin = function setOrigin(origin, transition, callback) {
    if (origin === null) {
        if (this._hasOrigin) {
            this._modifier.originFrom(null);
            this._hasOrigin = false;
        }
        return this;
    } else if (!this._hasOrigin) {
        this._hasOrigin = true;
        this._modifier.originFrom(this._originState);
    }
    this._originState.set(origin, transition, callback);
    return this;
};
StateModifier.prototype.setAlign = function setOrigin(align, transition, callback) {
    if (align === null) {
        if (this._hasAlign) {
            this._modifier.alignFrom(null);
            this._hasAlign = false;
        }
        return this;
    } else if (!this._hasAlign) {
        this._hasAlign = true;
        this._modifier.alignFrom(this._alignState);
    }
    this._alignState.set(align, transition, callback);
    return this;
};
StateModifier.prototype.setSize = function setSize(size, transition, callback) {
    if (size === null) {
        if (this._hasSize) {
            this._modifier.sizeFrom(null);
            this._hasSize = false;
        }
        return this;
    } else if (!this._hasSize) {
        this._hasSize = true;
        this._modifier.sizeFrom(this._sizeState);
    }
    this._sizeState.set(size, transition, callback);
    return this;
};
StateModifier.prototype.setProportions = function setSize(proportions, transition, callback) {
    if (proportions === null) {
        if (this._hasProportions) {
            this._modifier.proportionsFrom(null);
            this._hasProportions = false;
        }
        return this;
    } else if (!this._hasProportions) {
        this._hasProportions = true;
        this._modifier.proportionsFrom(this._proportionsState);
    }
    this._proportionsState.set(proportions, transition, callback);
    return this;
};
StateModifier.prototype.halt = function halt() {
    this._transformState.halt();
    this._opacityState.halt();
    this._originState.halt();
    this._alignState.halt();
    this._sizeState.halt();
    this._proportionsState.halt();
};
StateModifier.prototype.getTransform = function getTransform() {
    return this._transformState.get();
};
StateModifier.prototype.getFinalTransform = function getFinalTransform() {
    return this._transformState.getFinal();
};
StateModifier.prototype.getOpacity = function getOpacity() {
    return this._opacityState.get();
};
StateModifier.prototype.getOrigin = function getOrigin() {
    return this._hasOrigin ? this._originState.get() : null;
};
StateModifier.prototype.getAlign = function getAlign() {
    return this._hasAlign ? this._alignState.get() : null;
};
StateModifier.prototype.getSize = function getSize() {
    return this._hasSize ? this._sizeState.get() : null;
};
StateModifier.prototype.getProportions = function getProportions() {
    return this._hasProportions ? this._proportionsState.get() : null;
};
StateModifier.prototype.modify = function modify(target) {
    return this._modifier.modify(target);
};
module.exports = StateModifier;
},{"../core/Modifier":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Modifier.js","../core/Transform":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Transform.js","../transitions/Transitionable":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/Transitionable.js","../transitions/TransitionableTransform":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/TransitionableTransform.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/physics/PhysicsEngine.js":[function(require,module,exports){
var EventHandler = require('../core/EventHandler');
function PhysicsEngine(options) {
    this.options = Object.create(PhysicsEngine.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this._particles = [];
    this._bodies = [];
    this._agentData = {};
    this._forces = [];
    this._constraints = [];
    this._buffer = 0;
    this._prevTime = now();
    this._isSleeping = false;
    this._eventHandler = null;
    this._currAgentId = 0;
    this._hasBodies = false;
    this._eventHandler = null;
}
var TIMESTEP = 17;
var MIN_TIME_STEP = 1000 / 120;
var MAX_TIME_STEP = 17;
var now = Date.now;
var _events = {
        start: 'start',
        update: 'update',
        end: 'end'
    };
PhysicsEngine.DEFAULT_OPTIONS = {
    constraintSteps: 1,
    sleepTolerance: 1e-7,
    velocityCap: undefined,
    angularVelocityCap: undefined
};
PhysicsEngine.prototype.setOptions = function setOptions(opts) {
    for (var key in opts)
        if (this.options[key])
            this.options[key] = opts[key];
};
PhysicsEngine.prototype.addBody = function addBody(body) {
    body._engine = this;
    if (body.isBody) {
        this._bodies.push(body);
        this._hasBodies = true;
    } else
        this._particles.push(body);
    body.on('start', this.wake.bind(this));
    return body;
};
PhysicsEngine.prototype.removeBody = function removeBody(body) {
    var array = body.isBody ? this._bodies : this._particles;
    var index = array.indexOf(body);
    if (index > -1) {
        for (var agentKey in this._agentData) {
            if (this._agentData.hasOwnProperty(agentKey)) {
                this.detachFrom(this._agentData[agentKey].id, body);
            }
        }
        array.splice(index, 1);
    }
    if (this.getBodies().length === 0)
        this._hasBodies = false;
};
function _mapAgentArray(agent) {
    if (agent.applyForce)
        return this._forces;
    if (agent.applyConstraint)
        return this._constraints;
}
function _attachOne(agent, targets, source) {
    if (targets === undefined)
        targets = this.getParticlesAndBodies();
    if (!(targets instanceof Array))
        targets = [targets];
    agent.on('change', this.wake.bind(this));
    this._agentData[this._currAgentId] = {
        agent: agent,
        id: this._currAgentId,
        targets: targets,
        source: source
    };
    _mapAgentArray.call(this, agent).push(this._currAgentId);
    return this._currAgentId++;
}
PhysicsEngine.prototype.attach = function attach(agents, targets, source) {
    this.wake();
    if (agents instanceof Array) {
        var agentIDs = [];
        for (var i = 0; i < agents.length; i++)
            agentIDs[i] = _attachOne.call(this, agents[i], targets, source);
        return agentIDs;
    } else
        return _attachOne.call(this, agents, targets, source);
};
PhysicsEngine.prototype.attachTo = function attachTo(agentID, target) {
    _getAgentData.call(this, agentID).targets.push(target);
};
PhysicsEngine.prototype.detach = function detach(id) {
    var agent = this.getAgent(id);
    var agentArray = _mapAgentArray.call(this, agent);
    var index = agentArray.indexOf(id);
    agentArray.splice(index, 1);
    delete this._agentData[id];
};
PhysicsEngine.prototype.detachFrom = function detachFrom(id, target) {
    var boundAgent = _getAgentData.call(this, id);
    if (boundAgent.source === target)
        this.detach(id);
    else {
        var targets = boundAgent.targets;
        var index = targets.indexOf(target);
        if (index > -1)
            targets.splice(index, 1);
    }
};
PhysicsEngine.prototype.detachAll = function detachAll() {
    this._agentData = {};
    this._forces = [];
    this._constraints = [];
    this._currAgentId = 0;
};
function _getAgentData(id) {
    return this._agentData[id];
}
PhysicsEngine.prototype.getAgent = function getAgent(id) {
    return _getAgentData.call(this, id).agent;
};
PhysicsEngine.prototype.getParticles = function getParticles() {
    return this._particles;
};
PhysicsEngine.prototype.getBodies = function getBodies() {
    return this._bodies;
};
PhysicsEngine.prototype.getParticlesAndBodies = function getParticlesAndBodies() {
    return this.getParticles().concat(this.getBodies());
};
PhysicsEngine.prototype.forEachParticle = function forEachParticle(fn, dt) {
    var particles = this.getParticles();
    for (var index = 0, len = particles.length; index < len; index++)
        fn.call(this, particles[index], dt);
};
PhysicsEngine.prototype.forEachBody = function forEachBody(fn, dt) {
    if (!this._hasBodies)
        return;
    var bodies = this.getBodies();
    for (var index = 0, len = bodies.length; index < len; index++)
        fn.call(this, bodies[index], dt);
};
PhysicsEngine.prototype.forEach = function forEach(fn, dt) {
    this.forEachParticle(fn, dt);
    this.forEachBody(fn, dt);
};
function _updateForce(index) {
    var boundAgent = _getAgentData.call(this, this._forces[index]);
    boundAgent.agent.applyForce(boundAgent.targets, boundAgent.source);
}
function _updateForces() {
    for (var index = this._forces.length - 1; index > -1; index--)
        _updateForce.call(this, index);
}
function _updateConstraint(index, dt) {
    var boundAgent = this._agentData[this._constraints[index]];
    return boundAgent.agent.applyConstraint(boundAgent.targets, boundAgent.source, dt);
}
function _updateConstraints(dt) {
    var iteration = 0;
    while (iteration < this.options.constraintSteps) {
        for (var index = this._constraints.length - 1; index > -1; index--)
            _updateConstraint.call(this, index, dt);
        iteration++;
    }
}
function _updateVelocities(body, dt) {
    body.integrateVelocity(dt);
    if (this.options.velocityCap)
        body.velocity.cap(this.options.velocityCap).put(body.velocity);
}
function _updateAngularVelocities(body, dt) {
    body.integrateAngularMomentum(dt);
    body.updateAngularVelocity();
    if (this.options.angularVelocityCap)
        body.angularVelocity.cap(this.options.angularVelocityCap).put(body.angularVelocity);
}
function _updateOrientations(body, dt) {
    body.integrateOrientation(dt);
}
function _updatePositions(body, dt) {
    body.integratePosition(dt);
    body.emit(_events.update, body);
}
function _integrate(dt) {
    _updateForces.call(this, dt);
    this.forEach(_updateVelocities, dt);
    this.forEachBody(_updateAngularVelocities, dt);
    _updateConstraints.call(this, dt);
    this.forEachBody(_updateOrientations, dt);
    this.forEach(_updatePositions, dt);
}
function _getParticlesEnergy() {
    var energy = 0;
    var particleEnergy = 0;
    this.forEach(function (particle) {
        particleEnergy = particle.getEnergy();
        energy += particleEnergy;
    });
    return energy;
}
function _getAgentsEnergy() {
    var energy = 0;
    for (var id in this._agentData)
        energy += this.getAgentEnergy(id);
    return energy;
}
PhysicsEngine.prototype.getAgentEnergy = function (agentId) {
    var agentData = _getAgentData.call(this, agentId);
    return agentData.agent.getEnergy(agentData.targets, agentData.source);
};
PhysicsEngine.prototype.getEnergy = function getEnergy() {
    return _getParticlesEnergy.call(this) + _getAgentsEnergy.call(this);
};
PhysicsEngine.prototype.step = function step() {
    if (this.isSleeping())
        return;
    var currTime = now();
    var dtFrame = currTime - this._prevTime;
    this._prevTime = currTime;
    if (dtFrame < MIN_TIME_STEP)
        return;
    if (dtFrame > MAX_TIME_STEP)
        dtFrame = MAX_TIME_STEP;
    _integrate.call(this, TIMESTEP);
    this.emit(_events.update, this);
    if (this.getEnergy() < this.options.sleepTolerance)
        this.sleep();
};
PhysicsEngine.prototype.isSleeping = function isSleeping() {
    return this._isSleeping;
};
PhysicsEngine.prototype.isActive = function isSleeping() {
    return !this._isSleeping;
};
PhysicsEngine.prototype.sleep = function sleep() {
    if (this._isSleeping)
        return;
    this.forEach(function (body) {
        body.sleep();
    });
    this.emit(_events.end, this);
    this._isSleeping = true;
};
PhysicsEngine.prototype.wake = function wake() {
    if (!this._isSleeping)
        return;
    this._prevTime = now();
    this.emit(_events.start, this);
    this._isSleeping = false;
};
PhysicsEngine.prototype.emit = function emit(type, data) {
    if (this._eventHandler === null)
        return;
    this._eventHandler.emit(type, data);
};
PhysicsEngine.prototype.on = function on(event, fn) {
    if (this._eventHandler === null)
        this._eventHandler = new EventHandler();
    this._eventHandler.on(event, fn);
};
module.exports = PhysicsEngine;
},{"../core/EventHandler":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/EventHandler.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/physics/bodies/Particle.js":[function(require,module,exports){
var Vector = require('../../math/Vector');
var Transform = require('../../core/Transform');
var EventHandler = require('../../core/EventHandler');
var Integrator = require('../integrators/SymplecticEuler');
function Particle(options) {
    options = options || {};
    var defaults = Particle.DEFAULT_OPTIONS;
    this.position = new Vector();
    this.velocity = new Vector();
    this.force = new Vector();
    this._engine = null;
    this._isSleeping = true;
    this._eventOutput = null;
    this.mass = options.mass !== undefined ? options.mass : defaults.mass;
    this.inverseMass = 1 / this.mass;
    this.setPosition(options.position || defaults.position);
    this.setVelocity(options.velocity || defaults.velocity);
    this.force.set(options.force || [
        0,
        0,
        0
    ]);
    this.transform = Transform.identity.slice();
    this._spec = {
        size: [
            true,
            true
        ],
        target: {
            transform: this.transform,
            origin: [
                0.5,
                0.5
            ],
            target: null
        }
    };
}
Particle.DEFAULT_OPTIONS = {
    position: [
        0,
        0,
        0
    ],
    velocity: [
        0,
        0,
        0
    ],
    mass: 1
};
var _events = {
        start: 'start',
        update: 'update',
        end: 'end'
    };
var now = Date.now;
Particle.prototype.isBody = false;
Particle.prototype.isActive = function isActive() {
    return !this._isSleeping;
};
Particle.prototype.sleep = function sleep() {
    if (this._isSleeping)
        return;
    this.emit(_events.end, this);
    this._isSleeping = true;
};
Particle.prototype.wake = function wake() {
    if (!this._isSleeping)
        return;
    this.emit(_events.start, this);
    this._isSleeping = false;
    this._prevTime = now();
    if (this._engine)
        this._engine.wake();
};
Particle.prototype.setPosition = function setPosition(position) {
    this.position.set(position);
};
Particle.prototype.setPosition1D = function setPosition1D(x) {
    this.position.x = x;
};
Particle.prototype.getPosition = function getPosition() {
    this._engine.step();
    return this.position.get();
};
Particle.prototype.getPosition1D = function getPosition1D() {
    this._engine.step();
    return this.position.x;
};
Particle.prototype.setVelocity = function setVelocity(velocity) {
    this.velocity.set(velocity);
    if (!(velocity[0] === 0 && velocity[1] === 0 && velocity[2] === 0))
        this.wake();
};
Particle.prototype.setVelocity1D = function setVelocity1D(x) {
    this.velocity.x = x;
    if (x !== 0)
        this.wake();
};
Particle.prototype.getVelocity = function getVelocity() {
    return this.velocity.get();
};
Particle.prototype.setForce = function setForce(force) {
    this.force.set(force);
    this.wake();
};
Particle.prototype.getVelocity1D = function getVelocity1D() {
    return this.velocity.x;
};
Particle.prototype.setMass = function setMass(mass) {
    this.mass = mass;
    this.inverseMass = 1 / mass;
};
Particle.prototype.getMass = function getMass() {
    return this.mass;
};
Particle.prototype.reset = function reset(position, velocity) {
    this.setPosition(position || [
        0,
        0,
        0
    ]);
    this.setVelocity(velocity || [
        0,
        0,
        0
    ]);
};
Particle.prototype.applyForce = function applyForce(force) {
    if (force.isZero())
        return;
    this.force.add(force).put(this.force);
    this.wake();
};
Particle.prototype.applyImpulse = function applyImpulse(impulse) {
    if (impulse.isZero())
        return;
    var velocity = this.velocity;
    velocity.add(impulse.mult(this.inverseMass)).put(velocity);
};
Particle.prototype.integrateVelocity = function integrateVelocity(dt) {
    Integrator.integrateVelocity(this, dt);
};
Particle.prototype.integratePosition = function integratePosition(dt) {
    Integrator.integratePosition(this, dt);
};
Particle.prototype._integrate = function _integrate(dt) {
    this.integrateVelocity(dt);
    this.integratePosition(dt);
};
Particle.prototype.getEnergy = function getEnergy() {
    return 0.5 * this.mass * this.velocity.normSquared();
};
Particle.prototype.getTransform = function getTransform() {
    this._engine.step();
    var position = this.position;
    var transform = this.transform;
    transform[12] = position.x;
    transform[13] = position.y;
    transform[14] = position.z;
    return transform;
};
Particle.prototype.modify = function modify(target) {
    var _spec = this._spec.target;
    _spec.transform = this.getTransform();
    _spec.target = target;
    return this._spec;
};
function _createEventOutput() {
    this._eventOutput = new EventHandler();
    this._eventOutput.bindThis(this);
    EventHandler.setOutputHandler(this, this._eventOutput);
}
Particle.prototype.emit = function emit(type, data) {
    if (!this._eventOutput)
        return;
    this._eventOutput.emit(type, data);
};
Particle.prototype.on = function on() {
    _createEventOutput.call(this);
    return this.on.apply(this, arguments);
};
Particle.prototype.removeListener = function removeListener() {
    _createEventOutput.call(this);
    return this.removeListener.apply(this, arguments);
};
Particle.prototype.pipe = function pipe() {
    _createEventOutput.call(this);
    return this.pipe.apply(this, arguments);
};
Particle.prototype.unpipe = function unpipe() {
    _createEventOutput.call(this);
    return this.unpipe.apply(this, arguments);
};
module.exports = Particle;
},{"../../core/EventHandler":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/EventHandler.js","../../core/Transform":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Transform.js","../../math/Vector":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/math/Vector.js","../integrators/SymplecticEuler":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/physics/integrators/SymplecticEuler.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/physics/constraints/Constraint.js":[function(require,module,exports){
var EventHandler = require('../../core/EventHandler');
function Constraint() {
    this.options = this.options || {};
    this._eventOutput = new EventHandler();
    EventHandler.setOutputHandler(this, this._eventOutput);
}
Constraint.prototype.setOptions = function setOptions(options) {
    this._eventOutput.emit('change', options);
};
Constraint.prototype.applyConstraint = function applyConstraint() {
};
Constraint.prototype.getEnergy = function getEnergy() {
    return 0;
};
module.exports = Constraint;
},{"../../core/EventHandler":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/EventHandler.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/physics/constraints/Snap.js":[function(require,module,exports){
var Constraint = require('./Constraint');
var Vector = require('../../math/Vector');
function Snap(options) {
    Constraint.call(this);
    this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this.pDiff = new Vector();
    this.vDiff = new Vector();
    this.impulse1 = new Vector();
    this.impulse2 = new Vector();
}
Snap.prototype = Object.create(Constraint.prototype);
Snap.prototype.constructor = Snap;
Snap.DEFAULT_OPTIONS = {
    period: 300,
    dampingRatio: 0.1,
    length: 0,
    anchor: undefined
};
var pi = Math.PI;
Snap.prototype.setOptions = function setOptions(options) {
    if (options.anchor !== undefined) {
        if (options.anchor instanceof Vector)
            this.options.anchor = options.anchor;
        if (options.anchor.position instanceof Vector)
            this.options.anchor = options.anchor.position;
        if (options.anchor instanceof Array)
            this.options.anchor = new Vector(options.anchor);
    }
    if (options.length !== undefined)
        this.options.length = options.length;
    if (options.dampingRatio !== undefined)
        this.options.dampingRatio = options.dampingRatio;
    if (options.period !== undefined)
        this.options.period = options.period;
    Constraint.prototype.setOptions.call(this, options);
};
Snap.prototype.getEnergy = function getEnergy(targets, source) {
    var options = this.options;
    var restLength = options.length;
    var anchor = options.anchor || source.position;
    var strength = Math.pow(2 * pi / options.period, 2);
    var energy = 0;
    for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        var dist = anchor.sub(target.position).norm() - restLength;
        energy += 0.5 * strength * dist * dist;
    }
    return energy;
};
Snap.prototype.applyConstraint = function applyConstraint(targets, source, dt) {
    var options = this.options;
    var pDiff = this.pDiff;
    var vDiff = this.vDiff;
    var impulse1 = this.impulse1;
    var impulse2 = this.impulse2;
    var length = options.length;
    var anchor = options.anchor || source.position;
    var period = options.period;
    var dampingRatio = options.dampingRatio;
    for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        var p1 = target.position;
        var v1 = target.velocity;
        var m1 = target.mass;
        var w1 = target.inverseMass;
        pDiff.set(p1.sub(anchor));
        var dist = pDiff.norm() - length;
        var effMass;
        if (source) {
            var w2 = source.inverseMass;
            var v2 = source.velocity;
            vDiff.set(v1.sub(v2));
            effMass = 1 / (w1 + w2);
        } else {
            vDiff.set(v1);
            effMass = m1;
        }
        var gamma;
        var beta;
        if (this.options.period === 0) {
            gamma = 0;
            beta = 1;
        } else {
            var k = 4 * effMass * pi * pi / (period * period);
            var c = 4 * effMass * pi * dampingRatio / period;
            beta = dt * k / (c + dt * k);
            gamma = 1 / (c + dt * k);
        }
        var antiDrift = beta / dt * dist;
        pDiff.normalize(-antiDrift).sub(vDiff).mult(dt / (gamma + dt / effMass)).put(impulse1);
        target.applyImpulse(impulse1);
        if (source) {
            impulse1.mult(-1).put(impulse2);
            source.applyImpulse(impulse2);
        }
    }
};
module.exports = Snap;
},{"../../math/Vector":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/math/Vector.js","./Constraint":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/physics/constraints/Constraint.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/physics/constraints/Wall.js":[function(require,module,exports){
var Constraint = require('./Constraint');
var Vector = require('../../math/Vector');
function Wall(options) {
    this.options = Object.create(Wall.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this.diff = new Vector();
    this.impulse = new Vector();
    Constraint.call(this);
}
Wall.prototype = Object.create(Constraint.prototype);
Wall.prototype.constructor = Wall;
Wall.ON_CONTACT = {
    REFLECT: 0,
    SILENT: 1
};
Wall.DEFAULT_OPTIONS = {
    restitution: 0.5,
    drift: 0.5,
    slop: 0,
    normal: [
        1,
        0,
        0
    ],
    distance: 0,
    onContact: Wall.ON_CONTACT.REFLECT
};
Wall.prototype.setOptions = function setOptions(options) {
    if (options.normal !== undefined) {
        if (options.normal instanceof Vector)
            this.options.normal = options.normal.clone();
        if (options.normal instanceof Array)
            this.options.normal = new Vector(options.normal);
    }
    if (options.restitution !== undefined)
        this.options.restitution = options.restitution;
    if (options.drift !== undefined)
        this.options.drift = options.drift;
    if (options.slop !== undefined)
        this.options.slop = options.slop;
    if (options.distance !== undefined)
        this.options.distance = options.distance;
    if (options.onContact !== undefined)
        this.options.onContact = options.onContact;
};
function _getNormalVelocity(n, v) {
    return v.dot(n);
}
function _getDistanceFromOrigin(p) {
    var n = this.options.normal;
    var d = this.options.distance;
    return p.dot(n) + d;
}
function _onEnter(particle, overlap, dt) {
    var p = particle.position;
    var v = particle.velocity;
    var m = particle.mass;
    var n = this.options.normal;
    var action = this.options.onContact;
    var restitution = this.options.restitution;
    var impulse = this.impulse;
    var drift = this.options.drift;
    var slop = -this.options.slop;
    var gamma = 0;
    if (this._eventOutput) {
        var data = {
                particle: particle,
                wall: this,
                overlap: overlap,
                normal: n
            };
        this._eventOutput.emit('preCollision', data);
        this._eventOutput.emit('collision', data);
    }
    switch (action) {
    case Wall.ON_CONTACT.REFLECT:
        var lambda = overlap < slop ? -((1 + restitution) * n.dot(v) + drift / dt * (overlap - slop)) / (m * dt + gamma) : -((1 + restitution) * n.dot(v)) / (m * dt + gamma);
        impulse.set(n.mult(dt * lambda));
        particle.applyImpulse(impulse);
        particle.setPosition(p.add(n.mult(-overlap)));
        break;
    }
    if (this._eventOutput)
        this._eventOutput.emit('postCollision', data);
}
function _onExit(particle, overlap, dt) {
    var action = this.options.onContact;
    var p = particle.position;
    var n = this.options.normal;
    if (action === Wall.ON_CONTACT.REFLECT) {
        particle.setPosition(p.add(n.mult(-overlap)));
    }
}
Wall.prototype.applyConstraint = function applyConstraint(targets, source, dt) {
    var n = this.options.normal;
    for (var i = 0; i < targets.length; i++) {
        var particle = targets[i];
        var p = particle.position;
        var v = particle.velocity;
        var r = particle.radius || 0;
        var overlap = _getDistanceFromOrigin.call(this, p.add(n.mult(-r)));
        var nv = _getNormalVelocity.call(this, n, v);
        if (overlap <= 0) {
            if (nv < 0)
                _onEnter.call(this, particle, overlap, dt);
            else
                _onExit.call(this, particle, overlap, dt);
        }
    }
};
module.exports = Wall;
},{"../../math/Vector":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/math/Vector.js","./Constraint":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/physics/constraints/Constraint.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/physics/forces/Force.js":[function(require,module,exports){
var Vector = require('../../math/Vector');
var EventHandler = require('../../core/EventHandler');
function Force(force) {
    this.force = new Vector(force);
    this._eventOutput = new EventHandler();
    EventHandler.setOutputHandler(this, this._eventOutput);
}
Force.prototype.setOptions = function setOptions(options) {
    this._eventOutput.emit('change', options);
};
Force.prototype.applyForce = function applyForce(targets) {
    var length = targets.length;
    while (length--) {
        targets[length].applyForce(this.force);
    }
};
Force.prototype.getEnergy = function getEnergy() {
    return 0;
};
module.exports = Force;
},{"../../core/EventHandler":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/EventHandler.js","../../math/Vector":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/math/Vector.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/physics/forces/Spring.js":[function(require,module,exports){
var Force = require('./Force');
var Vector = require('../../math/Vector');
function Spring(options) {
    Force.call(this);
    this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this.disp = new Vector(0, 0, 0);
    _init.call(this);
}
Spring.prototype = Object.create(Force.prototype);
Spring.prototype.constructor = Spring;
var pi = Math.PI;
var MIN_PERIOD = 150;
Spring.FORCE_FUNCTIONS = {
    FENE: function (dist, rMax) {
        var rMaxSmall = rMax * 0.99;
        var r = Math.max(Math.min(dist, rMaxSmall), -rMaxSmall);
        return r / (1 - r * r / (rMax * rMax));
    },
    HOOK: function (dist) {
        return dist;
    }
};
Spring.DEFAULT_OPTIONS = {
    period: 300,
    dampingRatio: 0.1,
    length: 0,
    maxLength: Infinity,
    anchor: undefined,
    forceFunction: Spring.FORCE_FUNCTIONS.HOOK
};
function _calcStiffness() {
    var options = this.options;
    options.stiffness = Math.pow(2 * pi / options.period, 2);
}
function _calcDamping() {
    var options = this.options;
    options.damping = 4 * pi * options.dampingRatio / options.period;
}
function _init() {
    _calcStiffness.call(this);
    _calcDamping.call(this);
}
Spring.prototype.setOptions = function setOptions(options) {
    if (options.anchor !== undefined) {
        if (options.anchor.position instanceof Vector)
            this.options.anchor = options.anchor.position;
        if (options.anchor instanceof Vector)
            this.options.anchor = options.anchor;
        if (options.anchor instanceof Array)
            this.options.anchor = new Vector(options.anchor);
    }
    if (options.period !== undefined) {
        if (options.period < MIN_PERIOD) {
            options.period = MIN_PERIOD;
            console.warn('The period of a SpringTransition is capped at ' + MIN_PERIOD + ' ms. Use a SnapTransition for faster transitions');
        }
        this.options.period = options.period;
    }
    if (options.dampingRatio !== undefined)
        this.options.dampingRatio = options.dampingRatio;
    if (options.length !== undefined)
        this.options.length = options.length;
    if (options.forceFunction !== undefined)
        this.options.forceFunction = options.forceFunction;
    if (options.maxLength !== undefined)
        this.options.maxLength = options.maxLength;
    _init.call(this);
    Force.prototype.setOptions.call(this, options);
};
Spring.prototype.applyForce = function applyForce(targets, source) {
    var force = this.force;
    var disp = this.disp;
    var options = this.options;
    var stiffness = options.stiffness;
    var damping = options.damping;
    var restLength = options.length;
    var maxLength = options.maxLength;
    var anchor = options.anchor || source.position;
    var forceFunction = options.forceFunction;
    var i;
    var target;
    var p2;
    var v2;
    var dist;
    var m;
    for (i = 0; i < targets.length; i++) {
        target = targets[i];
        p2 = target.position;
        v2 = target.velocity;
        anchor.sub(p2).put(disp);
        dist = disp.norm() - restLength;
        if (dist === 0)
            return;
        m = target.mass;
        stiffness *= m;
        damping *= m;
        disp.normalize(stiffness * forceFunction(dist, maxLength)).put(force);
        if (damping)
            if (source)
                force.add(v2.sub(source.velocity).mult(-damping)).put(force);
            else
                force.add(v2.mult(-damping)).put(force);
        target.applyForce(force);
        if (source)
            source.applyForce(force.mult(-1));
    }
};
Spring.prototype.getEnergy = function getEnergy(targets, source) {
    var options = this.options;
    var restLength = options.length;
    var anchor = source ? source.position : options.anchor;
    var strength = options.stiffness;
    var energy = 0;
    for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        var dist = anchor.sub(target.position).norm() - restLength;
        energy += 0.5 * strength * dist * dist;
    }
    return energy;
};
module.exports = Spring;
},{"../../math/Vector":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/math/Vector.js","./Force":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/physics/forces/Force.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/physics/integrators/SymplecticEuler.js":[function(require,module,exports){
var SymplecticEuler = {};
SymplecticEuler.integrateVelocity = function integrateVelocity(body, dt) {
    var v = body.velocity;
    var w = body.inverseMass;
    var f = body.force;
    if (f.isZero())
        return;
    v.add(f.mult(dt * w)).put(v);
    f.clear();
};
SymplecticEuler.integratePosition = function integratePosition(body, dt) {
    var p = body.position;
    var v = body.velocity;
    p.add(v.mult(dt)).put(p);
};
SymplecticEuler.integrateAngularMomentum = function integrateAngularMomentum(body, dt) {
    var L = body.angularMomentum;
    var t = body.torque;
    if (t.isZero())
        return;
    L.add(t.mult(dt)).put(L);
    t.clear();
};
SymplecticEuler.integrateOrientation = function integrateOrientation(body, dt) {
    var q = body.orientation;
    var w = body.angularVelocity;
    if (w.isZero())
        return;
    q.add(q.multiply(w).scalarMultiply(0.5 * dt)).put(q);
};
module.exports = SymplecticEuler;
},{}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/surfaces/ImageSurface.js":[function(require,module,exports){
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
},{"../core/Surface":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Surface.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/Easing.js":[function(require,module,exports){
var Easing = {
        inQuad: function (t) {
            return t * t;
        },
        outQuad: function (t) {
            return -(t -= 1) * t + 1;
        },
        inOutQuad: function (t) {
            if ((t /= 0.5) < 1)
                return 0.5 * t * t;
            return -0.5 * (--t * (t - 2) - 1);
        },
        inCubic: function (t) {
            return t * t * t;
        },
        outCubic: function (t) {
            return --t * t * t + 1;
        },
        inOutCubic: function (t) {
            if ((t /= 0.5) < 1)
                return 0.5 * t * t * t;
            return 0.5 * ((t -= 2) * t * t + 2);
        },
        inQuart: function (t) {
            return t * t * t * t;
        },
        outQuart: function (t) {
            return -(--t * t * t * t - 1);
        },
        inOutQuart: function (t) {
            if ((t /= 0.5) < 1)
                return 0.5 * t * t * t * t;
            return -0.5 * ((t -= 2) * t * t * t - 2);
        },
        inQuint: function (t) {
            return t * t * t * t * t;
        },
        outQuint: function (t) {
            return --t * t * t * t * t + 1;
        },
        inOutQuint: function (t) {
            if ((t /= 0.5) < 1)
                return 0.5 * t * t * t * t * t;
            return 0.5 * ((t -= 2) * t * t * t * t + 2);
        },
        inSine: function (t) {
            return -1 * Math.cos(t * (Math.PI / 2)) + 1;
        },
        outSine: function (t) {
            return Math.sin(t * (Math.PI / 2));
        },
        inOutSine: function (t) {
            return -0.5 * (Math.cos(Math.PI * t) - 1);
        },
        inExpo: function (t) {
            return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
        },
        outExpo: function (t) {
            return t === 1 ? 1 : -Math.pow(2, -10 * t) + 1;
        },
        inOutExpo: function (t) {
            if (t === 0)
                return 0;
            if (t === 1)
                return 1;
            if ((t /= 0.5) < 1)
                return 0.5 * Math.pow(2, 10 * (t - 1));
            return 0.5 * (-Math.pow(2, -10 * --t) + 2);
        },
        inCirc: function (t) {
            return -(Math.sqrt(1 - t * t) - 1);
        },
        outCirc: function (t) {
            return Math.sqrt(1 - --t * t);
        },
        inOutCirc: function (t) {
            if ((t /= 0.5) < 1)
                return -0.5 * (Math.sqrt(1 - t * t) - 1);
            return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        },
        inElastic: function (t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (t === 0)
                return 0;
            if (t === 1)
                return 1;
            if (!p)
                p = 0.3;
            s = p / (2 * Math.PI) * Math.asin(1 / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
        },
        outElastic: function (t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (t === 0)
                return 0;
            if (t === 1)
                return 1;
            if (!p)
                p = 0.3;
            s = p / (2 * Math.PI) * Math.asin(1 / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
        },
        inOutElastic: function (t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (t === 0)
                return 0;
            if ((t /= 0.5) === 2)
                return 1;
            if (!p)
                p = 0.3 * 1.5;
            s = p / (2 * Math.PI) * Math.asin(1 / a);
            if (t < 1)
                return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
        },
        inBack: function (t, s) {
            if (s === undefined)
                s = 1.70158;
            return t * t * ((s + 1) * t - s);
        },
        outBack: function (t, s) {
            if (s === undefined)
                s = 1.70158;
            return --t * t * ((s + 1) * t + s) + 1;
        },
        inOutBack: function (t, s) {
            if (s === undefined)
                s = 1.70158;
            if ((t /= 0.5) < 1)
                return 0.5 * (t * t * (((s *= 1.525) + 1) * t - s));
            return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
        },
        inBounce: function (t) {
            return 1 - Easing.outBounce(1 - t);
        },
        outBounce: function (t) {
            if (t < 1 / 2.75) {
                return 7.5625 * t * t;
            } else if (t < 2 / 2.75) {
                return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
            } else if (t < 2.5 / 2.75) {
                return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
            } else {
                return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
            }
        },
        inOutBounce: function (t) {
            if (t < 0.5)
                return Easing.inBounce(t * 2) * 0.5;
            return Easing.outBounce(t * 2 - 1) * 0.5 + 0.5;
        }
    };
module.exports = Easing;
},{}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/MultipleTransition.js":[function(require,module,exports){
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
},{"../utilities/Utility":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/utilities/Utility.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/SnapTransition.js":[function(require,module,exports){
var PE = require('../physics/PhysicsEngine');
var Particle = require('../physics/bodies/Particle');
var Spring = require('../physics/constraints/Snap');
var Vector = require('../math/Vector');
function SnapTransition(state) {
    state = state || 0;
    this.endState = new Vector(state);
    this.initState = new Vector();
    this._dimensions = 1;
    this._restTolerance = 1e-10;
    this._absRestTolerance = this._restTolerance;
    this._callback = undefined;
    this.PE = new PE();
    this.particle = new Particle();
    this.spring = new Spring({ anchor: this.endState });
    this.PE.addBody(this.particle);
    this.PE.attach(this.spring, this.particle);
}
SnapTransition.SUPPORTS_MULTIPLE = 3;
SnapTransition.DEFAULT_OPTIONS = {
    period: 100,
    dampingRatio: 0.2,
    velocity: 0
};
function _getEnergy() {
    return this.particle.getEnergy() + this.spring.getEnergy([this.particle]);
}
function _setAbsoluteRestTolerance() {
    var distance = this.endState.sub(this.initState).normSquared();
    this._absRestTolerance = distance === 0 ? this._restTolerance : this._restTolerance * distance;
}
function _setTarget(target) {
    this.endState.set(target);
    _setAbsoluteRestTolerance.call(this);
}
function _wake() {
    this.PE.wake();
}
function _sleep() {
    this.PE.sleep();
}
function _setParticlePosition(p) {
    this.particle.position.set(p);
}
function _setParticleVelocity(v) {
    this.particle.velocity.set(v);
}
function _getParticlePosition() {
    return this._dimensions === 0 ? this.particle.getPosition1D() : this.particle.getPosition();
}
function _getParticleVelocity() {
    return this._dimensions === 0 ? this.particle.getVelocity1D() : this.particle.getVelocity();
}
function _setCallback(callback) {
    this._callback = callback;
}
function _setupDefinition(definition) {
    var defaults = SnapTransition.DEFAULT_OPTIONS;
    if (definition.period === undefined)
        definition.period = defaults.period;
    if (definition.dampingRatio === undefined)
        definition.dampingRatio = defaults.dampingRatio;
    if (definition.velocity === undefined)
        definition.velocity = defaults.velocity;
    this.spring.setOptions({
        period: definition.period,
        dampingRatio: definition.dampingRatio
    });
    _setParticleVelocity.call(this, definition.velocity);
}
function _update() {
    if (this.PE.isSleeping()) {
        if (this._callback) {
            var cb = this._callback;
            this._callback = undefined;
            cb();
        }
        return;
    }
    if (_getEnergy.call(this) < this._absRestTolerance) {
        _setParticlePosition.call(this, this.endState);
        _setParticleVelocity.call(this, [
            0,
            0,
            0
        ]);
        _sleep.call(this);
    }
}
SnapTransition.prototype.reset = function reset(state, velocity) {
    this._dimensions = state instanceof Array ? state.length : 0;
    this.initState.set(state);
    _setParticlePosition.call(this, state);
    _setTarget.call(this, state);
    if (velocity)
        _setParticleVelocity.call(this, velocity);
    _setCallback.call(this, undefined);
};
SnapTransition.prototype.getVelocity = function getVelocity() {
    return _getParticleVelocity.call(this);
};
SnapTransition.prototype.setVelocity = function setVelocity(velocity) {
    this.call(this, _setParticleVelocity(velocity));
};
SnapTransition.prototype.isActive = function isActive() {
    return !this.PE.isSleeping();
};
SnapTransition.prototype.halt = function halt() {
    this.set(this.get());
};
SnapTransition.prototype.get = function get() {
    _update.call(this);
    return _getParticlePosition.call(this);
};
SnapTransition.prototype.set = function set(state, definition, callback) {
    if (!definition) {
        this.reset(state);
        if (callback)
            callback();
        return;
    }
    this._dimensions = state instanceof Array ? state.length : 0;
    _wake.call(this);
    _setupDefinition.call(this, definition);
    _setTarget.call(this, state);
    _setCallback.call(this, callback);
};
module.exports = SnapTransition;
},{"../math/Vector":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/math/Vector.js","../physics/PhysicsEngine":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/physics/PhysicsEngine.js","../physics/bodies/Particle":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/physics/bodies/Particle.js","../physics/constraints/Snap":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/physics/constraints/Snap.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/SpringTransition.js":[function(require,module,exports){
var PE = require('../physics/PhysicsEngine');
var Particle = require('../physics/bodies/Particle');
var Spring = require('../physics/forces/Spring');
var Vector = require('../math/Vector');
function SpringTransition(state) {
    state = state || 0;
    this.endState = new Vector(state);
    this.initState = new Vector();
    this._dimensions = undefined;
    this._restTolerance = 1e-10;
    this._absRestTolerance = this._restTolerance;
    this._callback = undefined;
    this.PE = new PE();
    this.spring = new Spring({ anchor: this.endState });
    this.particle = new Particle();
    this.PE.addBody(this.particle);
    this.PE.attach(this.spring, this.particle);
}
SpringTransition.SUPPORTS_MULTIPLE = 3;
SpringTransition.DEFAULT_OPTIONS = {
    period: 300,
    dampingRatio: 0.5,
    velocity: 0
};
function _getEnergy() {
    return this.particle.getEnergy() + this.spring.getEnergy([this.particle]);
}
function _setParticlePosition(p) {
    this.particle.setPosition(p);
}
function _setParticleVelocity(v) {
    this.particle.setVelocity(v);
}
function _getParticlePosition() {
    return this._dimensions === 0 ? this.particle.getPosition1D() : this.particle.getPosition();
}
function _getParticleVelocity() {
    return this._dimensions === 0 ? this.particle.getVelocity1D() : this.particle.getVelocity();
}
function _setCallback(callback) {
    this._callback = callback;
}
function _wake() {
    this.PE.wake();
}
function _sleep() {
    this.PE.sleep();
}
function _update() {
    if (this.PE.isSleeping()) {
        if (this._callback) {
            var cb = this._callback;
            this._callback = undefined;
            cb();
        }
        return;
    }
    if (_getEnergy.call(this) < this._absRestTolerance) {
        _setParticlePosition.call(this, this.endState);
        _setParticleVelocity.call(this, [
            0,
            0,
            0
        ]);
        _sleep.call(this);
    }
}
function _setupDefinition(definition) {
    var defaults = SpringTransition.DEFAULT_OPTIONS;
    if (definition.period === undefined)
        definition.period = defaults.period;
    if (definition.dampingRatio === undefined)
        definition.dampingRatio = defaults.dampingRatio;
    if (definition.velocity === undefined)
        definition.velocity = defaults.velocity;
    if (definition.period < 150) {
        definition.period = 150;
        console.warn('The period of a SpringTransition is capped at 150 ms. Use a SnapTransition for faster transitions');
    }
    this.spring.setOptions({
        period: definition.period,
        dampingRatio: definition.dampingRatio
    });
    _setParticleVelocity.call(this, definition.velocity);
}
function _setAbsoluteRestTolerance() {
    var distance = this.endState.sub(this.initState).normSquared();
    this._absRestTolerance = distance === 0 ? this._restTolerance : this._restTolerance * distance;
}
function _setTarget(target) {
    this.endState.set(target);
    _setAbsoluteRestTolerance.call(this);
}
SpringTransition.prototype.reset = function reset(pos, vel) {
    this._dimensions = pos instanceof Array ? pos.length : 0;
    this.initState.set(pos);
    _setParticlePosition.call(this, pos);
    _setTarget.call(this, pos);
    if (vel)
        _setParticleVelocity.call(this, vel);
    _setCallback.call(this, undefined);
};
SpringTransition.prototype.getVelocity = function getVelocity() {
    return _getParticleVelocity.call(this);
};
SpringTransition.prototype.setVelocity = function setVelocity(v) {
    this.call(this, _setParticleVelocity(v));
};
SpringTransition.prototype.isActive = function isActive() {
    return !this.PE.isSleeping();
};
SpringTransition.prototype.halt = function halt() {
    this.set(this.get());
};
SpringTransition.prototype.get = function get() {
    _update.call(this);
    return _getParticlePosition.call(this);
};
SpringTransition.prototype.set = function set(endState, definition, callback) {
    if (!definition) {
        this.reset(endState);
        if (callback)
            callback();
        return;
    }
    this._dimensions = endState instanceof Array ? endState.length : 0;
    _wake.call(this);
    _setupDefinition.call(this, definition);
    _setTarget.call(this, endState);
    _setCallback.call(this, callback);
};
module.exports = SpringTransition;
},{"../math/Vector":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/math/Vector.js","../physics/PhysicsEngine":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/physics/PhysicsEngine.js","../physics/bodies/Particle":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/physics/bodies/Particle.js","../physics/forces/Spring":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/physics/forces/Spring.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/Transitionable.js":[function(require,module,exports){
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
},{"./MultipleTransition":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/MultipleTransition.js","./TweenTransition":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/TweenTransition.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/TransitionableTransform.js":[function(require,module,exports){
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
},{"../core/Transform":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Transform.js","../utilities/Utility":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/utilities/Utility.js","./Transitionable":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/Transitionable.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/TweenTransition.js":[function(require,module,exports){
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
},{}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/WallTransition.js":[function(require,module,exports){
var PE = require('../physics/PhysicsEngine');
var Particle = require('../physics/bodies/Particle');
var Spring = require('../physics/forces/Spring');
var Wall = require('../physics/constraints/Wall');
var Vector = require('../math/Vector');
function WallTransition(state) {
    state = state || 0;
    this.endState = new Vector(state);
    this.initState = new Vector();
    this.spring = new Spring({ anchor: this.endState });
    this.wall = new Wall();
    this._restTolerance = 1e-10;
    this._dimensions = 1;
    this._absRestTolerance = this._restTolerance;
    this._callback = undefined;
    this.PE = new PE();
    this.particle = new Particle();
    this.PE.addBody(this.particle);
    this.PE.attach([
        this.wall,
        this.spring
    ], this.particle);
}
WallTransition.SUPPORTS_MULTIPLE = 3;
WallTransition.DEFAULT_OPTIONS = {
    period: 300,
    dampingRatio: 0.5,
    velocity: 0,
    restitution: 0.5
};
function _getEnergy() {
    return this.particle.getEnergy() + this.spring.getEnergy([this.particle]);
}
function _setAbsoluteRestTolerance() {
    var distance = this.endState.sub(this.initState).normSquared();
    this._absRestTolerance = distance === 0 ? this._restTolerance : this._restTolerance * distance;
}
function _wake() {
    this.PE.wake();
}
function _sleep() {
    this.PE.sleep();
}
function _setTarget(target) {
    this.endState.set(target);
    var dist = this.endState.sub(this.initState).norm();
    this.wall.setOptions({
        distance: this.endState.norm(),
        normal: dist === 0 ? this.particle.velocity.normalize(-1) : this.endState.sub(this.initState).normalize(-1)
    });
    _setAbsoluteRestTolerance.call(this);
}
function _setParticlePosition(p) {
    this.particle.position.set(p);
}
function _setParticleVelocity(v) {
    this.particle.velocity.set(v);
}
function _getParticlePosition() {
    return this._dimensions === 0 ? this.particle.getPosition1D() : this.particle.getPosition();
}
function _getParticleVelocity() {
    return this._dimensions === 0 ? this.particle.getVelocity1D() : this.particle.getVelocity();
}
function _setCallback(callback) {
    this._callback = callback;
}
function _update() {
    if (this.PE.isSleeping()) {
        if (this._callback) {
            var cb = this._callback;
            this._callback = undefined;
            cb();
        }
        return;
    }
    var energy = _getEnergy.call(this);
    if (energy < this._absRestTolerance) {
        _sleep.call(this);
        _setParticlePosition.call(this, this.endState);
        _setParticleVelocity.call(this, [
            0,
            0,
            0
        ]);
    }
}
function _setupDefinition(def) {
    var defaults = WallTransition.DEFAULT_OPTIONS;
    if (def.period === undefined)
        def.period = defaults.period;
    if (def.dampingRatio === undefined)
        def.dampingRatio = defaults.dampingRatio;
    if (def.velocity === undefined)
        def.velocity = defaults.velocity;
    if (def.restitution === undefined)
        def.restitution = defaults.restitution;
    if (def.drift === undefined)
        def.drift = Wall.DEFAULT_OPTIONS.drift;
    if (def.slop === undefined)
        def.slop = Wall.DEFAULT_OPTIONS.slop;
    this.spring.setOptions({
        period: def.period,
        dampingRatio: def.dampingRatio
    });
    this.wall.setOptions({
        restitution: def.restitution,
        drift: def.drift,
        slop: def.slop
    });
    _setParticleVelocity.call(this, def.velocity);
}
WallTransition.prototype.reset = function reset(state, velocity) {
    this._dimensions = state instanceof Array ? state.length : 0;
    this.initState.set(state);
    _setParticlePosition.call(this, state);
    if (velocity)
        _setParticleVelocity.call(this, velocity);
    _setTarget.call(this, state);
    _setCallback.call(this, undefined);
};
WallTransition.prototype.getVelocity = function getVelocity() {
    return _getParticleVelocity.call(this);
};
WallTransition.prototype.setVelocity = function setVelocity(velocity) {
    this.call(this, _setParticleVelocity(velocity));
};
WallTransition.prototype.isActive = function isActive() {
    return !this.PE.isSleeping();
};
WallTransition.prototype.halt = function halt() {
    this.set(this.get());
};
WallTransition.prototype.get = function get() {
    _update.call(this);
    return _getParticlePosition.call(this);
};
WallTransition.prototype.set = function set(state, definition, callback) {
    if (!definition) {
        this.reset(state);
        if (callback)
            callback();
        return;
    }
    this._dimensions = state instanceof Array ? state.length : 0;
    _wake.call(this);
    _setupDefinition.call(this, definition);
    _setTarget.call(this, state);
    _setCallback.call(this, callback);
};
module.exports = WallTransition;
},{"../math/Vector":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/math/Vector.js","../physics/PhysicsEngine":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/physics/PhysicsEngine.js","../physics/bodies/Particle":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/physics/bodies/Particle.js","../physics/constraints/Wall":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/physics/constraints/Wall.js","../physics/forces/Spring":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/physics/forces/Spring.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/utilities/Utility.js":[function(require,module,exports){
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
},{}],"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/views/GridLayout.js":[function(require,module,exports){
var Entity = require('../core/Entity');
var RenderNode = require('../core/RenderNode');
var Transform = require('../core/Transform');
var ViewSequence = require('../core/ViewSequence');
var EventHandler = require('../core/EventHandler');
var Modifier = require('../core/Modifier');
var OptionsManager = require('../core/OptionsManager');
var Transitionable = require('../transitions/Transitionable');
var TransitionableTransform = require('../transitions/TransitionableTransform');
function GridLayout(options) {
    this.options = Object.create(GridLayout.DEFAULT_OPTIONS);
    this.optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this.id = Entity.register(this);
    this._modifiers = [];
    this._states = [];
    this._contextSizeCache = [
        0,
        0
    ];
    this._dimensionsCache = [
        0,
        0
    ];
    this._activeCount = 0;
    this._eventOutput = new EventHandler();
    EventHandler.setOutputHandler(this, this._eventOutput);
}
function _reflow(size, cols, rows) {
    var usableSize = [
            size[0],
            size[1]
        ];
    usableSize[0] -= this.options.gutterSize[0] * (cols - 1);
    usableSize[1] -= this.options.gutterSize[1] * (rows - 1);
    var rowSize = Math.round(usableSize[1] / rows);
    var colSize = Math.round(usableSize[0] / cols);
    var currY = 0;
    var currX;
    var currIndex = 0;
    for (var i = 0; i < rows; i++) {
        currX = 0;
        for (var j = 0; j < cols; j++) {
            if (this._modifiers[currIndex] === undefined) {
                _createModifier.call(this, currIndex, [
                    colSize,
                    rowSize
                ], [
                    currX,
                    currY,
                    0
                ], 1);
            } else {
                _animateModifier.call(this, currIndex, [
                    colSize,
                    rowSize
                ], [
                    currX,
                    currY,
                    0
                ], 1);
            }
            currIndex++;
            currX += colSize + this.options.gutterSize[0];
        }
        currY += rowSize + this.options.gutterSize[1];
    }
    this._dimensionsCache = [
        this.options.dimensions[0],
        this.options.dimensions[1]
    ];
    this._contextSizeCache = [
        size[0],
        size[1]
    ];
    this._activeCount = rows * cols;
    for (i = this._activeCount; i < this._modifiers.length; i++)
        _animateModifier.call(this, i, [
            Math.round(colSize),
            Math.round(rowSize)
        ], [
            0,
            0
        ], 0);
    this._eventOutput.emit('reflow');
}
function _createModifier(index, size, position, opacity) {
    var transitionItem = {
            transform: new TransitionableTransform(Transform.translate.apply(null, position)),
            opacity: new Transitionable(opacity),
            size: new Transitionable(size)
        };
    var modifier = new Modifier({
            transform: transitionItem.transform,
            opacity: transitionItem.opacity,
            size: transitionItem.size
        });
    this._states[index] = transitionItem;
    this._modifiers[index] = modifier;
}
function _animateModifier(index, size, position, opacity) {
    var currState = this._states[index];
    var currSize = currState.size;
    var currOpacity = currState.opacity;
    var currTransform = currState.transform;
    var transition = this.options.transition;
    currTransform.halt();
    currOpacity.halt();
    currSize.halt();
    currTransform.setTranslate(position, transition);
    currSize.set(size, transition);
    currOpacity.set(opacity, transition);
}
GridLayout.DEFAULT_OPTIONS = {
    dimensions: [
        1,
        1
    ],
    transition: false,
    gutterSize: [
        0,
        0
    ]
};
GridLayout.prototype.render = function render() {
    return this.id;
};
GridLayout.prototype.setOptions = function setOptions(options) {
    return this.optionsManager.setOptions(options);
};
GridLayout.prototype.sequenceFrom = function sequenceFrom(sequence) {
    if (sequence instanceof Array)
        sequence = new ViewSequence(sequence);
    this.sequence = sequence;
};
GridLayout.prototype.getSize = function getSize() {
    return this._contextSizeCache;
};
GridLayout.prototype.commit = function commit(context) {
    var transform = context.transform;
    var opacity = context.opacity;
    var origin = context.origin;
    var size = context.size;
    var cols = this.options.dimensions[0];
    var rows = this.options.dimensions[1];
    if (size[0] !== this._contextSizeCache[0] || size[1] !== this._contextSizeCache[1] || cols !== this._dimensionsCache[0] || rows !== this._dimensionsCache[1]) {
        _reflow.call(this, size, cols, rows);
    }
    var sequence = this.sequence;
    var result = [];
    var currIndex = 0;
    while (sequence && currIndex < this._modifiers.length) {
        var item = sequence.get();
        var modifier = this._modifiers[currIndex];
        if (currIndex >= this._activeCount && this._states[currIndex].opacity.isActive()) {
            this._modifiers.splice(currIndex, 1);
            this._states.splice(currIndex, 1);
        }
        if (item) {
            result.push(modifier.modify({
                origin: origin,
                target: item.render()
            }));
        }
        sequence = sequence.getNext();
        currIndex++;
    }
    if (size)
        transform = Transform.moveThen([
            -size[0] * origin[0],
            -size[1] * origin[1],
            0
        ], transform);
    return {
        transform: transform,
        opacity: opacity,
        size: size,
        target: result
    };
};
module.exports = GridLayout;
},{"../core/Entity":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Entity.js","../core/EventHandler":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/EventHandler.js","../core/Modifier":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Modifier.js","../core/OptionsManager":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/OptionsManager.js","../core/RenderNode":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/RenderNode.js","../core/Transform":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Transform.js","../core/ViewSequence":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/ViewSequence.js","../transitions/Transitionable":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/Transitionable.js","../transitions/TransitionableTransform":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/TransitionableTransform.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/src/AdGenerator.js":[function(require,module,exports){
// Import additional modules to be used in this view 
var View = require('famous/src/core/View');
var Surface = require('famous/src/core/Surface');
var Transform = require('famous/src/core/Transform');
var Transitionable = require('famous/src/transitions/Transitionable');
var Modifier   = require('famous/src/core/Modifier');
var ImageSurface = require('famous/src/surfaces/ImageSurface');
var Easing = require('famous/src/transitions/Easing');

var StateModifier = require('famous/src/modifiers/StateModifier');
var GridLayout = require('famous/src/views/GridLayout');
var Transform = require('famous/src/core/Transform');

var Transitionable = require('famous/src/transitions/Transitionable');
var WallTransition = require('famous/src/transitions/WallTransition');
var SpringTransition = require('famous/src/transitions/SpringTransition');
var SnapTransition = require('famous/src/transitions/SnapTransition');

// Importanting data form data.js dummy file
var data = require('./data.js')

var transitionRegistry = {
    'rotateInOut': rotateInOut,
    'slideInOut': slideInOut,
    'springInOut': springInOut,
    'wallInOut': wallInOut
}

var easingRegistry = {
    'inQuad': Easing.inQuad,
    'outQuad': Easing.outQuad,
    'inOutQuad': Easing.inOutQuad,
    'inCubic': Easing.inCubic,
    'outCubic': Easing.outCubic,
    'inOutCubic': Easing.inOutCubic,
    'inQuart': Easing.inQuart,
    'outQuart': Easing.outQuart,
    'inOutQuart': Easing.inOutQuart, 
    'inQuint': Easing.inQuint,
    'outQuint': Easing.outQuint,
    'inOutQuint': Easing.inOutQuint,
    'inSine': Easing.inSine,
    'outSine': Easing.outSine,
    'inOutSine': Easing.inOutSine,
    'inExpo': Easing.inExpo,
    'outExpo': Easing.outExpo,
    'inOutExpo': Easing.inOutExpo,
    'inCirc': Easing.inCirc,
    'outCirc': Easing.outCirc,
    'inOutCirc': Easing.inOutCirc,
    'inElastic': Easing.inElastic,
    'outElastic': Easing.outElastic,
    'inOutElastic': Easing.inOutElastic,
    'inBack': Easing.inBack,
    'outBack': Easing.outBack,
    'inOutBack': Easing.inOutBack,
    'inBounce': Easing.inBounce,
    'outBounce': Easing.outBounce,
    'inOutBounce': Easing.inOutBounce
}

/* GENERATORS */

// Constructor function for our AppView class
function AdGenerator() {
    var logo = getLogo();
    var modifier = getModifier();
    var enter = enterTransition();
    var exit = exitTransition();

    return {logo: logo, modifier: modifier, enter: enter, exit: exit};
}

// Creates a surface using the image
// provided by the client
function getLogo() {
    var logo = new ImageSurface({
      size: [300, 100],
      content: data.logo,
      properties: {
        textAlign: 'center',
        lineHeight: '100px'
      }
    });

    return logo;
}

// Creates a modifier for the starting
// state
function getModifier() {
    var modifier = new Modifier({
        size: [undefined, undefined],
        origin: [data.origin.x, data.origin.y, data.origin.z],
        align:[data.initialPosition.x , data.initialPosition.y, data.initialPosition.z],
        transform: Transform.rotate(data.initialRotation.x, data.initialRotation.y, data.initialRotation.z)
    });

    return modifier;
}

// Calls a function which returns a modifier
// depending on the transition type
function enterTransition() {
    return transitionRegistry[data.enter.type](data.enter);
}

// Calls a function which returns a modifier
// depending on the transition type
function exitTransition() {
    return transitionRegistry[data.exit.type](data.exit);
}

/* TRANSITIONS */
function rotateInOut(dataInput) {
    return function(modifier) {
        modifier.setTransform(
            Transform.rotate(dataInput.rotation.x, dataInput.rotation.y, dataInput.rotation.z),
            {duration: dataInput.duration, curve: easingRegistry[dataInput.curve]}
        );
    }
}

function slideInOut(dataInput) {
    return function(modifier) {
        modifier.setTransform(
            Transform.translate(dataInput.position.x, dataInput.position.y, dataInput.position.z),
            {duration: dataInput.duration, curve: easingRegistry[dataInput.curve]}
        );
    }
}

function springInOut(dataInput) {
    return function(modifier) {
        Transitionable.registerMethod('spring', SnapTransition);
        modifier = new Transitionable([data.initialPosition.x, data.initialPosition.y, data.initialPosition.z]);

        var springProperties = {
            type: 'spring',
            period: dataInput.period,
            dampingRatio: dataInput.dampingRatio,
        }
        modifier.set(
            [dataInput.position.x, dataInput.position.y, dataInput.position.z],
            {
                method: 'spring',
                dampingRatio: dataInput.dampingRatio,
                period: dataInput.period
            }
        );
    }
}

function wallInOut(dataInput) {
    return function(modifier) {
        Transitionable.registerMethod('wall', WallTransition);
        
        var wallProperties = {
            type: 'wall',
            period: dataInput.period,
            dampingRatio : dataInput.dampingRatio,
            velocity: dataInput.velocity,
            restitution : dataInput.restitution
        };

        modifier.setTransform(
            Transform.translate(dataInput.position.x, dataInput.position.y, dataInput.position.z),
            wallProperties
        );
    }
}
module.exports = AdGenerator;
},{"./data.js":"/Users/alejandrozuccolillo/Desktop/AdFame/src/data.js","famous/src/core/Modifier":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Modifier.js","famous/src/core/Surface":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Surface.js","famous/src/core/Transform":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Transform.js","famous/src/core/View":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/View.js","famous/src/modifiers/StateModifier":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/modifiers/StateModifier.js","famous/src/surfaces/ImageSurface":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/surfaces/ImageSurface.js","famous/src/transitions/Easing":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/Easing.js","famous/src/transitions/SnapTransition":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/SnapTransition.js","famous/src/transitions/SpringTransition":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/SpringTransition.js","famous/src/transitions/Transitionable":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/Transitionable.js","famous/src/transitions/WallTransition":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/WallTransition.js","famous/src/views/GridLayout":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/views/GridLayout.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/src/Drag.js":[function(require,module,exports){
// Import additional modules to be used in this view 
var Transform = require('famous/src/core/Transform');
var Modifier = require('famous/src/core/Modifier');
var ImageSurface = require('famous/src/surfaces/ImageSurface');
var MouseSync     = require('famous/src/inputs/MouseSync');
var TouchSync     = require('famous/src/inputs/TouchSync');
var GenericSync   = require('famous/src/inputs/GenericSync');

var Transitionable = require('famous/src/transitions/Transitionable');

// Register sync inputs
GenericSync.register({
    'mouse': MouseSync,
    'touch': TouchSync
})

// Create a transitionable for position
var position = new Transitionable([0, 0]);

// Set sync variable for generic sync methods
var sync = new GenericSync({
    'mouse': {},
    'touch': {}
});

//create the like/dislike surface
var like = new ImageSurface({
    size: [70, 70],
    align: [0,0],
    content: "images/yess.png",
    classes: ['backfaceVisibility', "bitch"],
});

var notLike = new ImageSurface({
    size: [70, 70],
    align: [0,0],
    content: "images/noo.png",
    classes: ['backfaceVisibility', "bitch"],
});
//Sets the initial opacity of the like and dislike button to be hidden
var opacityYes = new Modifier({
    opacity: 0,
    align: [-.17, 0]
})
var opacityNo = new Modifier({
    opacity: 0,
    align:[.745, 0]
})

function drag(surface, link) {
    // Links sync to our surface parameter
    surface.pipe(sync);

    // Updates position of transitionable
    sync.on('update', function(data){
        var currentPosition = position.get();

        //Sets the position of the surface to the X position of the mouse

        position.set([
            currentPosition[0] + data.delta[0],
            currentPosition[1]
        ]);

        // Optionally modifies the opacity of the logo 
            // opacityLogo.setOpacity(1-Math.abs(currentPosition[0])/(window.innerWidth*.4));
        //Modifies the opacity of the like button    
            if(currentPosition[0]>0){
                opacityYes.setOpacity(currentPosition[0]/(window.innerWidth*.3));
            }
        // Modifies the opacity of the dislike button
            if(currentPosition[0]<0){
                opacityNo.setOpacity(Math.abs(currentPosition[0])/window.innerWidth*3);
            }
    });

    // on dragging to right, like page and open link, else not like and close ad
    surface.on('mouseup', function(){
        var currentPosition = position.get();
        //resets the opacity of the like and dislike to be hidden
        opacityYes.setOpacity(0);
        opacityNo.setOpacity(0);

        if (currentPosition[0] > 200) {
           //Redirect to link if dragged right
            position.set([0,0], {curve : 'easeOutBounce', duration : 300});
            window.open(link, '_blank');
        } else if (currentPosition[0] < (-200)) {
           // Transition out of dragged left
            position.set([-window.innerWidth,0], {curve : 'easeOutBounce', duration : 800});
        }else{
             //Bounces the surface back to center if the drag was insufficient
            position.set([0,0], {curve : 'easeOutBounce', duration : 300});
        }
    })
    // on touch drag right like, left dislike
    surface.on('touchend', function(){
        var currentPosition = position.get();
        console.log(currentPosition)
     //resets the opacity of the like and dislike to be hidden
        opacityYes.setOpacity(0);
        opacityNo.setOpacity(0);
        //Redirect to link if dragged right
        if (currentPosition[0] > 150) {
            position.set([250,window.innerHeight], {curve : 'easeOutBounce', duration : 300});
            window.open(link, '_blank');
        }else if (currentPosition[0] < (-150)) {
        // Transition out of dragged left
            position.set([window.innerWidth,0], {curve : 'easeOutBounce', duration : 800});
        }else{
            //Bounces the surface back to center if the drag was insufficient
            position.set([0,0], {curve : 'easeOutBounce', duration : 300});

        }
    })

    // Applies updated position to surface
    var positionModifier = new Modifier({
        transform: function(){
            var currentPosition = position.get();
            return Transform.translate(currentPosition[0], currentPosition[1], 0);
        }
    });

    // Sends back the modified surface and position modifier
    return {surface: surface, positionModifier: positionModifier, like: like, notLike:notLike, opacityNo:opacityNo, opacityYes:opacityYes};
}

module.exports = drag;
},{"famous/src/core/Modifier":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Modifier.js","famous/src/core/Transform":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Transform.js","famous/src/inputs/GenericSync":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/inputs/GenericSync.js","famous/src/inputs/MouseSync":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/inputs/MouseSync.js","famous/src/inputs/TouchSync":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/inputs/TouchSync.js","famous/src/surfaces/ImageSurface":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/surfaces/ImageSurface.js","famous/src/transitions/Transitionable":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/transitions/Transitionable.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/src/data.js":[function(require,module,exports){
  var data = {
    logo: 'images/Coca-Cola.png',
    url: 'http://us.coca-cola.com/home/',
    origin: {x: .5, y: 0, z: 0},
    initialPosition: {x: 0, y: 0, z: 0},
    initialVelocity: {x: 0, y: 0, z: 0},
    initialRotation: {x: 0, y: 0, z: 0},
    opacity: 1,
    enter: {
        type: 'slideInOut',
        position: {x: 0, y: 400, z: 0},
        velocity: {x: 0, y: 0, z: 0},
        rotation: {x: Math.PI/2, y: 0, z: 0},
        period: 1000,
        dampingRatio: 0,
        restitution: 0,
        opacity: 1,
        duration: 1000,
        curve: null
    },
    exit: {
        type: 'rotateInOut',
        position: {x: 0, y: 0, z: 0},
        velocity: {x: 0, y: Math.PI, z: 0},
        rotation: {x: 0, y: 0, z: 0},
        period: 1000,
        dampingRatio: 0,
        restitution: 0,
        opacity: 1,
        duration: 1000,
        curve: null
    }
}




  // $(function(){
      
  //     //hide all transition sections except selected item 
  //   $('#selectTrans').on('click', function(){
  //     var selected = $('input[type="radio"]:checked').val()
  //     Array.prototype.forEach.call($('#transitions').children(), function(child){
  //       $(child).hide();
  //     });
  //     $('#'+selected).show();
  //   }).trigger('click');
     
  //   //save data (db or localfile) 
  //   var saveData =function(data){ 
  //     $.ajax({
  //       type: "POST",
  //       url: "/post",
  //       data: data
  //     })
  //     .done(function( msg ) {
  //       console.log( "Data Saved: " + msg );
  //     });
  //   }

  //   var getData = function(){
  //     $.ajax({
  //       type: "GET",
  //       url: "/get",
  //       data: data
  //     })
  //     .done(function( data ) {
  //       console.log(  data );  
  //     });
  //   }
    
  //   $('#export').on('click', function(){
  //     var selected = $('input[type="radio"]:checked').val()
  //     var $info = $("#" + selected)
      
  //     data.logo = $('#logoUrl')
  //     data.url = $('#adLink').val();
  //     data.origin.x = $('#originX').val();
  //     data.origin.y = $('#originY').val();
  //     data.origin.z = $('#originZ').val();

  //     data.initialPosition.x = $('#initPosX').val();
  //     data.initialPosition.y = $('#initPosY').val();
  //     data.initialPosition.z = $('#initPosZ').val();

  //     data.initialVelocity.x = $("#initVelX").val();
  //     data.initialVelocity.y = $("#initVelY").val();
  //     data.initialVelocity.z = $("#initVelZ").val();

  //     data.initialRotation.x = $("#initRotX").val();
  //     data.initialRotation.y = $("#initRotY").val();
  //     data.initialRotation.z = $("#initRotZ").val();

  //     data.opacity = $('#opacity').val();

  //     data.enter.type = selected;
      
  //     data.enter.position.x = $("#"+selected+"PosX").val();
  //     data.enter.position.y = $("#"+selected+"PosY").val();
  //     data.enter.position.z = $("#"+selected+"PosZ").val();

  //     data.enter.velocity.x = $("#"+selected+"VelX").val();
  //     data.enter.velocity.y = $("#"+selected+"VelY").val();
  //     data.enter.velocity.z = $("#"+selected+"VelZ").val();

  //     data.enter.rotation.x = $("#"+selected+"RotX").val();
  //     data.enter.rotation.y = $("#"+selected+"RotY").val();
  //     data.enter.rotation.z = $("#"+selected+"RotZ").val();
      
  //     data.enter.period = $("#"+selected+"Period").val();

  //     data.enter.dampingRatio = $("#"+selected+"DampeningRatio").val();
  //     data.enter.restitution = $("#"+selected+"Restitution").val();
  //     data.enter.opacity = $("#"+selected+"Opacity").val()
  //     data.enter.duration = $("#"+selected+"Duration").val()
  //     data.enter.curve = $("#"+selected+"Curve").val()
      
  //     saveData(data)
      
  //   });

  // var el, newPoint, newPlace, offset;

  // $("input[type='range']").change(function() {
   
  //    el = $(this);
     
  //    width = el.width();
     
  //    newPoint = (el.val() - el.attr("min")) / (el.attr("max") - el.attr("min"));
     
  //    offset = -1.3;
     
  //    if (newPoint < 0) { newPlace = 0; }
  //    else if (newPoint > 1) { newPlace = width; }
  //    else { newPlace = width * newPoint + offset; offset -= newPoint; }
     
  //    el.next("output").text(el.val());
  //  }).trigger('change');

  // })

module.exports = data;
},{}],"/Users/alejandrozuccolillo/Desktop/AdFame/src/index.js":[function(require,module,exports){
//load scrolls
require('./scroll.js');
// Load css
require('./styles');
// Load polyfills
require('famous-polyfills');

// Import Dependencies
var Engine = require('famous/src/core/Engine');
var Surface = require('famous/src/core/Surface');
var Transform = require('famous/src/core/Transform');
var AppView = require('./views/AppView');

// Create container and set to main context
var el = document.getElementById('famous-container');
Engine.setOptions({ appMode: false });
var container = Engine.createContext(el);
// container.setPerspective(300);
// Add utility function that grabs ad data
function initAdFame(data) {
    var appView = new AppView({ data: data });
    container.add(appView);
};

// Instantiate AppView using data
var data = require('./data')
initAdFame(data);
},{"./data":"/Users/alejandrozuccolillo/Desktop/AdFame/src/data.js","./scroll.js":"/Users/alejandrozuccolillo/Desktop/AdFame/src/scroll.js","./styles":"/Users/alejandrozuccolillo/Desktop/AdFame/src/styles/index.js","./views/AppView":"/Users/alejandrozuccolillo/Desktop/AdFame/src/views/AppView.js","famous-polyfills":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous-polyfills/index.js","famous/src/core/Engine":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Engine.js","famous/src/core/Surface":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Surface.js","famous/src/core/Transform":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Transform.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/src/scroll.js":[function(require,module,exports){
var EventHandler = require('famous/src/core/EventHandler');
var Transform = require('famous/src/core/Transform');
var windowScrollEvents = {}

// Set up event handlers ** short names more readable in conditionals below **
var scrollEvents = new EventHandler();

// Set handlers to main exported object
windowScrollEvents.scrollEvents = scrollEvents;

// Switches so event handlers are only called once on scroll
windowScrollEvents.called = false;
windowScrollEvents.hitEnd = false;

// Target elements and duration in pixels;
var elementIdStart = 'startAdFame';
var elementIdEnd = 'endAdFame';
// var padding = 100;
//var duration = 1000;

console.log('this is working')

// Native scroll main function
window.onscroll = function (){
    // Position variables
    var targetPosition = document.getElementById(elementIdStart).offsetTop;
    var targetEndPosition = document.getElementById(elementIdEnd).offsetTop; 
    var windowTopPosition = window.pageYOffset;

    // Check to see if you reach enter element scrolling down
    if(!windowScrollEvents.called && (windowTopPosition) > targetPosition) {
        scrollEvents.emit('targetStartReached');
        windowScrollEvents.called = true;
    }

    // Check to see if you reach enter element scrolling up
    if (windowScrollEvents.called && (windowTopPosition) < targetPosition) {
        scrollEvents.emit('targetStartReached');
        windowScrollEvents.called = false;
    }

    // Check to see if you reach end element scrolling down
    if(!windowScrollEvents.hitEnd && (windowTopPosition > targetEndPosition)) {
        scrollEvents.emit('targetEndReached');
        windowScrollEvents.hitEnd = true;
     }

     // Check to see if you reach end element scrolling up
     if(windowScrollEvents.hitEnd && (windowTopPosition < targetEndPosition)) {
         scrollEvents.emit('targetEndReached');
         windowScrollEvents.hitEnd = false;
      }

     
    // Emits window position
    // scrollEvents.emit('positionYChange', {position: windowTopPosition, called: windowScrollEvents.called});

    // If you are not yet at the target element, windowScrollEvents.called is false
    // if((windowTopPosition + padding) < targetPosition){
    //     windowScrollEvents.called = false;
    //     windowScrollEvents.hitEnd = false;
      
    //     //emit event when target not reached 
    //     scrollEvents.emit('targetNotReached');
    // }

    // If you reach X duration pixels below target element alert abd only call once
    // if(!windowScrollEvents.hitEnd && windowTopPosition > (targetPosition+duration)){
    //     windowScrollEvents.hitEnd = true;
    // }
}

module.exports = windowScrollEvents
},{"famous/src/core/EventHandler":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/EventHandler.js","famous/src/core/Transform":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Transform.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/src/scrolling.js":[function(require,module,exports){
var Transform = require('famous/src/core/Transform');
var Modifier = require('famous/src/core/Modifier');
var EventHandler = require('famous/src/core/EventHandler');
var Scroll = require('./scroll.js');
var AdGenerator = require('./AdGenerator');

var data = require('./data.js');

//listen to scroll events
var scrollEventsListener = new EventHandler();

//subscribe to scroll events
scrollEventsListener.subscribe(Scroll.scrollEvents);

//add adGenerator that contains entry transitions
var adGenerator = AdGenerator();


// // Reset banner to initial state helper function 
// var resetBanner = function(){
//     console.log('reset', targetHit)
//     if(targetHit){
//         //reset banner to not called   
//         targetHit = false;
//         //reset banner to initial values
//         console.log('actual reset')
//         mainModifier.setTransform(Transform.rotate(initPosX,initPosY,initPosZ))  
//     }
// }

/******************************************************************
             MAIN  IN/OUT  SCROLLER  DEFAULTS                                     
******************************************************************/

// //default initial state before banner scrolls in 
// var initPosX = 0,
// initPosY = 0,
// initPosZ = 0,
// distance = 100,
transitionCalled = false
// targetHit = false;

// //default state for banner scroll in end 
// var endPosX = Math.PI/2;
// var endPosY = 0;
// var endPosZ = 0;
// var location = 0;

/******************************************************************/


// Create mainModifier
var mainModifier = new Modifier(); 


/******************************************************************
             TARGET  REACHED  EVENT  HANDLER                                      
******************************************************************/
scrollEventsListener.on('targetStartReached', function(){
    // Call adGenerator enter/exit methods when target is reached
    mainModifier.halt();
    if(!transitionCalled) {
        adGenerator.enter(mainModifier);
        transitionCalled = !transitionCalled;
    } else if (transitionCalled) {
        adGenerator.exit(mainModifier);
        transitionCalled = !transitionCalled;
    }
});

/******************************************************************
             TARGET  END  REACHED  EVENT  HANDLER                                      
******************************************************************/
scrollEventsListener.on('targetEndReached', function(){  
    // Call adGenerator enter/exit methods when target is reached
    mainModifier.halt();
    if(transitionCalled) {
        adGenerator.exit(mainModifier);
        transitionCalled = !transitionCalled;
    } else if (!transitionCalled) {
        adGenerator.enter(mainModifier);
        transitionCalled = !transitionCalled;
    }
});

// /******************************************************************
//     WINDOW POSITION EVENT HANDLER (inside target reached handler)                                   
// ******************************************************************/
//     // Position is the target position and any padding for the main target div
//     var position = element.targetEndPosition;    

//     scrollEventsListener.on('positionYChange', function(y){ 
//         //track current Y positon of window
//         var tracker = y.position;

//         //link the rotation position to the window scroll
//         rotatePosX = (tracker - position) / distance;


//         //only link rotation to scroll if between init and end positions
//         if(rotatePosX <= endPosX && rotatePosX >= initPosX) {
//             console.log('rotate', rotatePosX)
//             mainModifier.setTransform(Transform.rotate(rotatePosX, 0, 0));
//         }
//     });

module.exports = {mainModifier: mainModifier};
},{"./AdGenerator":"/Users/alejandrozuccolillo/Desktop/AdFame/src/AdGenerator.js","./data.js":"/Users/alejandrozuccolillo/Desktop/AdFame/src/data.js","./scroll.js":"/Users/alejandrozuccolillo/Desktop/AdFame/src/scroll.js","famous/src/core/EventHandler":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/EventHandler.js","famous/src/core/Modifier":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Modifier.js","famous/src/core/Transform":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/Transform.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/src/styles/app.css":[function(require,module,exports){
var css = "html {\n  background: #fff;\n  -webkit-overflow-scrolling: none;\n}\n\n.backfaceVisibility {\n  -webkit-backface-visibility: visible;\n  backface-visibility: visible;\n}\n\n.garden {\n  position: relative;\n  width : 200px;\n  height: 200px;\n  border: 5px solid #CCC;\n  border-radius: 10px;\n}\n\n.ball {\n  position: absolute;\n  top   : 90px;\n  left  : 90px;\n  width : 20px;\n  height: 20px;\n  background: green;\n  border-radius: 100%;\n}"; (require("/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/cssify"))(css); module.exports = css;
},{"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/cssify":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/cssify/browser.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/src/styles/index.js":[function(require,module,exports){
// load css
require('famous/src/core/famous.css');
require('./app.css');

},{"./app.css":"/Users/alejandrozuccolillo/Desktop/AdFame/src/styles/app.css","famous/src/core/famous.css":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/famous.css"}],"/Users/alejandrozuccolillo/Desktop/AdFame/src/views/AdView.js":[function(require,module,exports){
// Load Dependencies
var View = require('famous/src/core/View');

// Load files
var BannerView = require('./BannerView');
var AdGenerator = require('../AdGenerator');
var drag = require('../Drag');

var scrolled = require('../scrolling')
var data = require('../data') 

// Add modifier objects
var adObject = AdGenerator();
var dragObject = drag(adObject.logo, data.url);
var scrollObject = scrolled;


// Create Adview
function AdView() {
    View.apply(this, arguments);
    _createAd.call(this);
    // _createBanner.call(this);
}

AdView.prototype = Object.create(View.prototype);
AdView.prototype.constructor = AdView;

// AdView.DEFAULT_OPTIONS = {
//     data: undefined
// }

// Applies surface and modifier so AdView
function _createAd() {
    var mainNode= this.add(adObject.modifier)
        .add(dragObject.positionModifier)
        .add(scrollObject.mainModifier);

        var likeNode = mainNode;
        
        mainNode.add(dragObject.surface);
        
        likeNode.add(dragObject.opacityYes)
        .add(dragObject.like);

        likeNode.add(dragObject.opacityNo)
        .add(dragObject.notLike);
}

function _createBanner() {
        // this.add(adObject.modifier)
        // .add(scrollObject.mainModifier)
        // var notLike= like;
        // .add(dragObject.opacityNopacityYes)
        // .add(dragObject.like);
        // notLike.add(dragObject.opacityNo)
        // .add(dragObject.notLike);
}

// Exports AdView
module.exports = AdView;
},{"../AdGenerator":"/Users/alejandrozuccolillo/Desktop/AdFame/src/AdGenerator.js","../Drag":"/Users/alejandrozuccolillo/Desktop/AdFame/src/Drag.js","../data":"/Users/alejandrozuccolillo/Desktop/AdFame/src/data.js","../scrolling":"/Users/alejandrozuccolillo/Desktop/AdFame/src/scrolling.js","./BannerView":"/Users/alejandrozuccolillo/Desktop/AdFame/src/views/BannerView.js","famous/src/core/View":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/View.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/src/views/AppView.js":[function(require,module,exports){
// Load dependencies
var View = require('famous/src/core/View');
var AdView = require('./AdView');

// Create AppView class
function AppView() {
    View.apply(this, arguments);
    createAdView.call(this);
}

AppView.prototype = Object.create(View.prototype);
AppView.prototype.constructor = AppView;

// AppView.DEFAULT_OPTIONS = {
//     data: undefined
// }

// Add adView as child of AppView
function createAdView() {
    var adView = new AdView();
    this.add(adView);
}

// Export AppView
module.exports = AppView;
},{"./AdView":"/Users/alejandrozuccolillo/Desktop/AdFame/src/views/AdView.js","famous/src/core/View":"/Users/alejandrozuccolillo/Desktop/AdFame/node_modules/famous/src/core/View.js"}],"/Users/alejandrozuccolillo/Desktop/AdFame/src/views/BannerView.js":[function(require,module,exports){

},{}]},{},["/Users/alejandrozuccolillo/Desktop/AdFame/src/index.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY3NzaWZ5L2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzLXBvbHlmaWxscy9jbGFzc0xpc3QuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzLXBvbHlmaWxscy9mdW5jdGlvblByb3RvdHlwZUJpbmQuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzLXBvbHlmaWxscy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMtcG9seWZpbGxzL3JlcXVlc3RBbmltYXRpb25GcmFtZS5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvQ29udGV4dC5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvRWxlbWVudEFsbG9jYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvRWxlbWVudE91dHB1dC5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvRW5naW5lLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvY29yZS9FbnRpdHkuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9jb3JlL0V2ZW50RW1pdHRlci5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvRXZlbnRIYW5kbGVyLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvY29yZS9Nb2RpZmllci5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvT3B0aW9uc01hbmFnZXIuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9jb3JlL1JlbmRlck5vZGUuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9jb3JlL1NwZWNQYXJzZXIuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9jb3JlL1N1cmZhY2UuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9jb3JlL1RyYW5zZm9ybS5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvVmlldy5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2NvcmUvVmlld1NlcXVlbmNlLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvY29yZS9mYW1vdXMuY3NzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvaW5wdXRzL0dlbmVyaWNTeW5jLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvaW5wdXRzL01vdXNlU3luYy5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL2lucHV0cy9Ub3VjaFN5bmMuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9pbnB1dHMvVG91Y2hUcmFja2VyLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvbWF0aC9WZWN0b3IuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9tb2RpZmllcnMvU3RhdGVNb2RpZmllci5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL3BoeXNpY3MvUGh5c2ljc0VuZ2luZS5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL3BoeXNpY3MvYm9kaWVzL1BhcnRpY2xlLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvcGh5c2ljcy9jb25zdHJhaW50cy9Db25zdHJhaW50LmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvcGh5c2ljcy9jb25zdHJhaW50cy9TbmFwLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvcGh5c2ljcy9jb25zdHJhaW50cy9XYWxsLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvcGh5c2ljcy9mb3JjZXMvRm9yY2UuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9waHlzaWNzL2ZvcmNlcy9TcHJpbmcuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy9waHlzaWNzL2ludGVncmF0b3JzL1N5bXBsZWN0aWNFdWxlci5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL3N1cmZhY2VzL0ltYWdlU3VyZmFjZS5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL3RyYW5zaXRpb25zL0Vhc2luZy5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL3RyYW5zaXRpb25zL011bHRpcGxlVHJhbnNpdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL3RyYW5zaXRpb25zL1NuYXBUcmFuc2l0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvdHJhbnNpdGlvbnMvU3ByaW5nVHJhbnNpdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0uanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy90cmFuc2l0aW9ucy9Ud2VlblRyYW5zaXRpb24uanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3NyYy90cmFuc2l0aW9ucy9XYWxsVHJhbnNpdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvc3JjL3V0aWxpdGllcy9VdGlsaXR5LmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9zcmMvdmlld3MvR3JpZExheW91dC5qcyIsInNyYy9BZEdlbmVyYXRvci5qcyIsInNyYy9EcmFnLmpzIiwic3JjL2RhdGEuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvc2Nyb2xsLmpzIiwic3JjL3Njcm9sbGluZy5qcyIsInNyYy9zdHlsZXMvYXBwLmNzcyIsInNyYy9zdHlsZXMvaW5kZXguanMiLCJzcmMvdmlld3MvQWRWaWV3LmpzIiwic3JjL3ZpZXdzL0FwcFZpZXcuanMiLCJzcmMvdmlld3MvQmFubmVyVmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25MQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoUEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDak5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbk1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxR0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzLCBjdXN0b21Eb2N1bWVudCkge1xuICB2YXIgZG9jID0gY3VzdG9tRG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gIGlmIChkb2MuY3JlYXRlU3R5bGVTaGVldCkge1xuICAgIHZhciBzaGVldCA9IGRvYy5jcmVhdGVTdHlsZVNoZWV0KClcbiAgICBzaGVldC5jc3NUZXh0ID0gY3NzO1xuICAgIHJldHVybiBzaGVldC5vd25lck5vZGU7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGhlYWQgPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSxcbiAgICAgICAgc3R5bGUgPSBkb2MuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuXG4gICAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jLmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICAgIH1cblxuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgIHJldHVybiBzdHlsZTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuYnlVcmwgPSBmdW5jdGlvbih1cmwpIHtcbiAgaWYgKGRvY3VtZW50LmNyZWF0ZVN0eWxlU2hlZXQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlU3R5bGVTaGVldCh1cmwpLm93bmVyTm9kZTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0sXG4gICAgICAgIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5cbiAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICBsaW5rLmhyZWYgPSB1cmw7XG5cbiAgICBoZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuICAgIHJldHVybiBsaW5rO1xuICB9XG59O1xuIiwiXG4vKlxuICogY2xhc3NMaXN0LmpzOiBDcm9zcy1icm93c2VyIGZ1bGwgZWxlbWVudC5jbGFzc0xpc3QgaW1wbGVtZW50YXRpb24uXG4gKiAyMDExLTA2LTE1XG4gKlxuICogQnkgRWxpIEdyZXksIGh0dHA6Ly9lbGlncmV5LmNvbVxuICogUHVibGljIERvbWFpbi5cbiAqIE5PIFdBUlJBTlRZIEVYUFJFU1NFRCBPUiBJTVBMSUVELiBVU0UgQVQgWU9VUiBPV04gUklTSy5cbiAqL1xuXG4vKmdsb2JhbCBzZWxmLCBkb2N1bWVudCwgRE9NRXhjZXB0aW9uICovXG5cbi8qISBAc291cmNlIGh0dHA6Ly9wdXJsLmVsaWdyZXkuY29tL2dpdGh1Yi9jbGFzc0xpc3QuanMvYmxvYi9tYXN0ZXIvY2xhc3NMaXN0LmpzKi9cblxuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiAhKFwiY2xhc3NMaXN0XCIgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIikpKSB7XG5cbihmdW5jdGlvbiAodmlldykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyXG4gICAgICBjbGFzc0xpc3RQcm9wID0gXCJjbGFzc0xpc3RcIlxuICAgICwgcHJvdG9Qcm9wID0gXCJwcm90b3R5cGVcIlxuICAgICwgZWxlbUN0clByb3RvID0gKHZpZXcuSFRNTEVsZW1lbnQgfHwgdmlldy5FbGVtZW50KVtwcm90b1Byb3BdXG4gICAgLCBvYmpDdHIgPSBPYmplY3RcbiAgICAsIHN0clRyaW0gPSBTdHJpbmdbcHJvdG9Qcm9wXS50cmltIHx8IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIik7XG4gICAgfVxuICAgICwgYXJySW5kZXhPZiA9IEFycmF5W3Byb3RvUHJvcF0uaW5kZXhPZiB8fCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICB2YXJcbiAgICAgICAgICAgICAgaSA9IDBcbiAgICAgICAgICAgICwgbGVuID0gdGhpcy5sZW5ndGhcbiAgICAgICAgO1xuICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSBpbiB0aGlzICYmIHRoaXNbaV0gPT09IGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIC8vIFZlbmRvcnM6IHBsZWFzZSBhbGxvdyBjb250ZW50IGNvZGUgdG8gaW5zdGFudGlhdGUgRE9NRXhjZXB0aW9uc1xuICAgICwgRE9NRXggPSBmdW5jdGlvbiAodHlwZSwgbWVzc2FnZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSB0eXBlO1xuICAgICAgICB0aGlzLmNvZGUgPSBET01FeGNlcHRpb25bdHlwZV07XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgfVxuICAgICwgY2hlY2tUb2tlbkFuZEdldEluZGV4ID0gZnVuY3Rpb24gKGNsYXNzTGlzdCwgdG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuID09PSBcIlwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRE9NRXgoXG4gICAgICAgICAgICAgICAgICBcIlNZTlRBWF9FUlJcIlxuICAgICAgICAgICAgICAgICwgXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWRcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoL1xccy8udGVzdCh0b2tlbikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBET01FeChcbiAgICAgICAgICAgICAgICAgIFwiSU5WQUxJRF9DSEFSQUNURVJfRVJSXCJcbiAgICAgICAgICAgICAgICAsIFwiU3RyaW5nIGNvbnRhaW5zIGFuIGludmFsaWQgY2hhcmFjdGVyXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFyckluZGV4T2YuY2FsbChjbGFzc0xpc3QsIHRva2VuKTtcbiAgICB9XG4gICAgLCBDbGFzc0xpc3QgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICB2YXJcbiAgICAgICAgICAgICAgdHJpbW1lZENsYXNzZXMgPSBzdHJUcmltLmNhbGwoZWxlbS5jbGFzc05hbWUpXG4gICAgICAgICAgICAsIGNsYXNzZXMgPSB0cmltbWVkQ2xhc3NlcyA/IHRyaW1tZWRDbGFzc2VzLnNwbGl0KC9cXHMrLykgOiBbXVxuICAgICAgICAgICAgLCBpID0gMFxuICAgICAgICAgICAgLCBsZW4gPSBjbGFzc2VzLmxlbmd0aFxuICAgICAgICA7XG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucHVzaChjbGFzc2VzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVDbGFzc05hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IHRoaXMudG9TdHJpbmcoKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLCBjbGFzc0xpc3RQcm90byA9IENsYXNzTGlzdFtwcm90b1Byb3BdID0gW11cbiAgICAsIGNsYXNzTGlzdEdldHRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDbGFzc0xpc3QodGhpcyk7XG4gICAgfVxuO1xuLy8gTW9zdCBET01FeGNlcHRpb24gaW1wbGVtZW50YXRpb25zIGRvbid0IGFsbG93IGNhbGxpbmcgRE9NRXhjZXB0aW9uJ3MgdG9TdHJpbmcoKVxuLy8gb24gbm9uLURPTUV4Y2VwdGlvbnMuIEVycm9yJ3MgdG9TdHJpbmcoKSBpcyBzdWZmaWNpZW50IGhlcmUuXG5ET01FeFtwcm90b1Byb3BdID0gRXJyb3JbcHJvdG9Qcm9wXTtcbmNsYXNzTGlzdFByb3RvLml0ZW0gPSBmdW5jdGlvbiAoaSkge1xuICAgIHJldHVybiB0aGlzW2ldIHx8IG51bGw7XG59O1xuY2xhc3NMaXN0UHJvdG8uY29udGFpbnMgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0b2tlbiArPSBcIlwiO1xuICAgIHJldHVybiBjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pICE9PSAtMTtcbn07XG5jbGFzc0xpc3RQcm90by5hZGQgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0b2tlbiArPSBcIlwiO1xuICAgIGlmIChjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pID09PSAtMSkge1xuICAgICAgICB0aGlzLnB1c2godG9rZW4pO1xuICAgICAgICB0aGlzLl91cGRhdGVDbGFzc05hbWUoKTtcbiAgICB9XG59O1xuY2xhc3NMaXN0UHJvdG8ucmVtb3ZlID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdG9rZW4gKz0gXCJcIjtcbiAgICB2YXIgaW5kZXggPSBjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB0aGlzLl91cGRhdGVDbGFzc05hbWUoKTtcbiAgICB9XG59O1xuY2xhc3NMaXN0UHJvdG8udG9nZ2xlID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdG9rZW4gKz0gXCJcIjtcbiAgICBpZiAoY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5hZGQodG9rZW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVtb3ZlKHRva2VuKTtcbiAgICB9XG59O1xuY2xhc3NMaXN0UHJvdG8udG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuam9pbihcIiBcIik7XG59O1xuXG5pZiAob2JqQ3RyLmRlZmluZVByb3BlcnR5KSB7XG4gICAgdmFyIGNsYXNzTGlzdFByb3BEZXNjID0ge1xuICAgICAgICAgIGdldDogY2xhc3NMaXN0R2V0dGVyXG4gICAgICAgICwgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICAsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH07XG4gICAgdHJ5IHtcbiAgICAgICAgb2JqQ3RyLmRlZmluZVByb3BlcnR5KGVsZW1DdHJQcm90bywgY2xhc3NMaXN0UHJvcCwgY2xhc3NMaXN0UHJvcERlc2MpO1xuICAgIH0gY2F0Y2ggKGV4KSB7IC8vIElFIDggZG9lc24ndCBzdXBwb3J0IGVudW1lcmFibGU6dHJ1ZVxuICAgICAgICBpZiAoZXgubnVtYmVyID09PSAtMHg3RkY1RUM1NCkge1xuICAgICAgICAgICAgY2xhc3NMaXN0UHJvcERlc2MuZW51bWVyYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgb2JqQ3RyLmRlZmluZVByb3BlcnR5KGVsZW1DdHJQcm90bywgY2xhc3NMaXN0UHJvcCwgY2xhc3NMaXN0UHJvcERlc2MpO1xuICAgICAgICB9XG4gICAgfVxufSBlbHNlIGlmIChvYmpDdHJbcHJvdG9Qcm9wXS5fX2RlZmluZUdldHRlcl9fKSB7XG4gICAgZWxlbUN0clByb3RvLl9fZGVmaW5lR2V0dGVyX18oY2xhc3NMaXN0UHJvcCwgY2xhc3NMaXN0R2V0dGVyKTtcbn1cblxufShzZWxmKSk7XG5cbn1cbiIsImlmICghRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQpIHtcbiAgICBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uIChvVGhpcykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgLy8gY2xvc2VzdCB0aGluZyBwb3NzaWJsZSB0byB0aGUgRUNNQVNjcmlwdCA1IGludGVybmFsIElzQ2FsbGFibGUgZnVuY3Rpb25cbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbi5wcm90b3R5cGUuYmluZCAtIHdoYXQgaXMgdHJ5aW5nIHRvIGJlIGJvdW5kIGlzIG5vdCBjYWxsYWJsZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhQXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICAgIGZUb0JpbmQgPSB0aGlzLFxuICAgICAgICBmTk9QID0gZnVuY3Rpb24gKCkge30sXG4gICAgICAgIGZCb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBmVG9CaW5kLmFwcGx5KHRoaXMgaW5zdGFuY2VvZiBmTk9QICYmIG9UaGlzXG4gICAgICAgICAgICAgICAgPyB0aGlzXG4gICAgICAgICAgICAgICAgOiBvVGhpcyxcbiAgICAgICAgICAgICAgICBhQXJncy5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZOT1AucHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGU7XG4gICAgICAgIGZCb3VuZC5wcm90b3R5cGUgPSBuZXcgZk5PUCgpO1xuXG4gICAgICAgIHJldHVybiBmQm91bmQ7XG4gICAgfTtcbn1cbiIsInJlcXVpcmUoJy4vY2xhc3NMaXN0LmpzJyk7XG5yZXF1aXJlKCcuL2Z1bmN0aW9uUHJvdG90eXBlQmluZC5qcycpO1xucmVxdWlyZSgnLi9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUuanMnKTsiLCIvLyBhZGRzIHJlcXVlc3RBbmltYXRpb25GcmFtZSBmdW5jdGlvbmFsaXR5XG4vLyBTb3VyY2U6IGh0dHA6Ly9zdHJkNi5jb20vMjAxMS8wNS9iZXR0ZXItd2luZG93LXJlcXVlc3RhbmltYXRpb25mcmFtZS1zaGltL1xuXG53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8ICh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID1cbiAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XG4gIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgfHxcbiAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICB8fFxuICBmdW5jdGlvbihjYWxsYmFjaywgZWxlbWVudCkge1xuICAgIHJldHVybiB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGNhbGxiYWNrKCtuZXcgRGF0ZSgpKTtcbiAgfSwgMTAwMCAvIDYwKTtcbn0pO1xuIiwidmFyIFJlbmRlck5vZGUgPSByZXF1aXJlKCcuL1JlbmRlck5vZGUnKTtcbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuL0V2ZW50SGFuZGxlcicpO1xudmFyIEVsZW1lbnRBbGxvY2F0b3IgPSByZXF1aXJlKCcuL0VsZW1lbnRBbGxvY2F0b3InKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCcuL1RyYW5zZm9ybScpO1xudmFyIFRyYW5zaXRpb25hYmxlID0gcmVxdWlyZSgnLi4vdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGUnKTtcbnZhciBfemVyb1plcm8gPSBbXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdO1xudmFyIHVzZVByZWZpeCA9ICEoJ3BlcnNwZWN0aXZlJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUpO1xuZnVuY3Rpb24gX2dldEVsZW1lbnRTaXplKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBlbGVtZW50LmNsaWVudFdpZHRoLFxuICAgICAgICBlbGVtZW50LmNsaWVudEhlaWdodFxuICAgIF07XG59XG52YXIgX3NldFBlcnNwZWN0aXZlID0gdXNlUHJlZml4ID8gZnVuY3Rpb24gKGVsZW1lbnQsIHBlcnNwZWN0aXZlKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUud2Via2l0UGVyc3BlY3RpdmUgPSBwZXJzcGVjdGl2ZSA/IHBlcnNwZWN0aXZlLnRvRml4ZWQoKSArICdweCcgOiAnJztcbiAgICB9IDogZnVuY3Rpb24gKGVsZW1lbnQsIHBlcnNwZWN0aXZlKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucGVyc3BlY3RpdmUgPSBwZXJzcGVjdGl2ZSA/IHBlcnNwZWN0aXZlLnRvRml4ZWQoKSArICdweCcgOiAnJztcbiAgICB9O1xuZnVuY3Rpb24gQ29udGV4dChjb250YWluZXIpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICB0aGlzLl9hbGxvY2F0b3IgPSBuZXcgRWxlbWVudEFsbG9jYXRvcihjb250YWluZXIpO1xuICAgIHRoaXMuX25vZGUgPSBuZXcgUmVuZGVyTm9kZSgpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX3NpemUgPSBfZ2V0RWxlbWVudFNpemUodGhpcy5jb250YWluZXIpO1xuICAgIHRoaXMuX3BlcnNwZWN0aXZlU3RhdGUgPSBuZXcgVHJhbnNpdGlvbmFibGUoMCk7XG4gICAgdGhpcy5fcGVyc3BlY3RpdmUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fbm9kZUNvbnRleHQgPSB7XG4gICAgICAgIGFsbG9jYXRvcjogdGhpcy5fYWxsb2NhdG9yLFxuICAgICAgICB0cmFuc2Zvcm06IFRyYW5zZm9ybS5pZGVudGl0eSxcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgb3JpZ2luOiBfemVyb1plcm8sXG4gICAgICAgIGFsaWduOiBfemVyb1plcm8sXG4gICAgICAgIHNpemU6IHRoaXMuX3NpemVcbiAgICB9O1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0Lm9uKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2V0U2l6ZShfZ2V0RWxlbWVudFNpemUodGhpcy5jb250YWluZXIpKTtcbiAgICB9LmJpbmQodGhpcykpO1xufVxuQ29udGV4dC5wcm90b3R5cGUuZ2V0QWxsb2NhdG9yID0gZnVuY3Rpb24gZ2V0QWxsb2NhdG9yKCkge1xuICAgIHJldHVybiB0aGlzLl9hbGxvY2F0b3I7XG59O1xuQ29udGV4dC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkKG9iaikge1xuICAgIHJldHVybiB0aGlzLl9ub2RlLmFkZChvYmopO1xufTtcbkNvbnRleHQucHJvdG90eXBlLm1pZ3JhdGUgPSBmdW5jdGlvbiBtaWdyYXRlKGNvbnRhaW5lcikge1xuICAgIGlmIChjb250YWluZXIgPT09IHRoaXMuY29udGFpbmVyKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgdGhpcy5fYWxsb2NhdG9yLm1pZ3JhdGUoY29udGFpbmVyKTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gZ2V0U2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24gc2V0U2l6ZShzaXplKSB7XG4gICAgaWYgKCFzaXplKVxuICAgICAgICBzaXplID0gX2dldEVsZW1lbnRTaXplKHRoaXMuY29udGFpbmVyKTtcbiAgICB0aGlzLl9zaXplWzBdID0gc2l6ZVswXTtcbiAgICB0aGlzLl9zaXplWzFdID0gc2l6ZVsxXTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUoY29udGV4dFBhcmFtZXRlcnMpIHtcbiAgICBpZiAoY29udGV4dFBhcmFtZXRlcnMpIHtcbiAgICAgICAgaWYgKGNvbnRleHRQYXJhbWV0ZXJzLnRyYW5zZm9ybSlcbiAgICAgICAgICAgIHRoaXMuX25vZGVDb250ZXh0LnRyYW5zZm9ybSA9IGNvbnRleHRQYXJhbWV0ZXJzLnRyYW5zZm9ybTtcbiAgICAgICAgaWYgKGNvbnRleHRQYXJhbWV0ZXJzLm9wYWNpdHkpXG4gICAgICAgICAgICB0aGlzLl9ub2RlQ29udGV4dC5vcGFjaXR5ID0gY29udGV4dFBhcmFtZXRlcnMub3BhY2l0eTtcbiAgICAgICAgaWYgKGNvbnRleHRQYXJhbWV0ZXJzLm9yaWdpbilcbiAgICAgICAgICAgIHRoaXMuX25vZGVDb250ZXh0Lm9yaWdpbiA9IGNvbnRleHRQYXJhbWV0ZXJzLm9yaWdpbjtcbiAgICAgICAgaWYgKGNvbnRleHRQYXJhbWV0ZXJzLmFsaWduKVxuICAgICAgICAgICAgdGhpcy5fbm9kZUNvbnRleHQuYWxpZ24gPSBjb250ZXh0UGFyYW1ldGVycy5hbGlnbjtcbiAgICAgICAgaWYgKGNvbnRleHRQYXJhbWV0ZXJzLnNpemUpXG4gICAgICAgICAgICB0aGlzLl9ub2RlQ29udGV4dC5zaXplID0gY29udGV4dFBhcmFtZXRlcnMuc2l6ZTtcbiAgICB9XG4gICAgdmFyIHBlcnNwZWN0aXZlID0gdGhpcy5fcGVyc3BlY3RpdmVTdGF0ZS5nZXQoKTtcbiAgICBpZiAocGVyc3BlY3RpdmUgIT09IHRoaXMuX3BlcnNwZWN0aXZlKSB7XG4gICAgICAgIF9zZXRQZXJzcGVjdGl2ZSh0aGlzLmNvbnRhaW5lciwgcGVyc3BlY3RpdmUpO1xuICAgICAgICB0aGlzLl9wZXJzcGVjdGl2ZSA9IHBlcnNwZWN0aXZlO1xuICAgIH1cbiAgICB0aGlzLl9ub2RlLmNvbW1pdCh0aGlzLl9ub2RlQ29udGV4dCk7XG59O1xuQ29udGV4dC5wcm90b3R5cGUuZ2V0UGVyc3BlY3RpdmUgPSBmdW5jdGlvbiBnZXRQZXJzcGVjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcGVyc3BlY3RpdmVTdGF0ZS5nZXQoKTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS5zZXRQZXJzcGVjdGl2ZSA9IGZ1bmN0aW9uIHNldFBlcnNwZWN0aXZlKHBlcnNwZWN0aXZlLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLl9wZXJzcGVjdGl2ZVN0YXRlLnNldChwZXJzcGVjdGl2ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xufTtcbkNvbnRleHQucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUsIGV2ZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQodHlwZSwgZXZlbnQpO1xufTtcbkNvbnRleHQucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24odHlwZSwgaGFuZGxlcikge1xuICAgIHJldHVybiB0aGlzLl9ldmVudE91dHB1dC5vbih0eXBlLCBoYW5kbGVyKTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGhhbmRsZXIpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRPdXRwdXQucmVtb3ZlTGlzdGVuZXIodHlwZSwgaGFuZGxlcik7XG59O1xuQ29udGV4dC5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uIHBpcGUodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50T3V0cHV0LnBpcGUodGFyZ2V0KTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS51bnBpcGUgPSBmdW5jdGlvbiB1bnBpcGUodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50T3V0cHV0LnVucGlwZSh0YXJnZXQpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gQ29udGV4dDsiLCJmdW5jdGlvbiBFbGVtZW50QWxsb2NhdG9yKGNvbnRhaW5lcikge1xuICAgIGlmICghY29udGFpbmVyKVxuICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgdGhpcy5kZXRhY2hlZE5vZGVzID0ge307XG4gICAgdGhpcy5ub2RlQ291bnQgPSAwO1xufVxuRWxlbWVudEFsbG9jYXRvci5wcm90b3R5cGUubWlncmF0ZSA9IGZ1bmN0aW9uIG1pZ3JhdGUoY29udGFpbmVyKSB7XG4gICAgdmFyIG9sZENvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgIGlmIChjb250YWluZXIgPT09IG9sZENvbnRhaW5lcilcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChvbGRDb250YWluZXIgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChvbGRDb250YWluZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHdoaWxlIChvbGRDb250YWluZXIuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQob2xkQ29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xufTtcbkVsZW1lbnRBbGxvY2F0b3IucHJvdG90eXBlLmFsbG9jYXRlID0gZnVuY3Rpb24gYWxsb2NhdGUodHlwZSkge1xuICAgIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKCEodHlwZSBpbiB0aGlzLmRldGFjaGVkTm9kZXMpKVxuICAgICAgICB0aGlzLmRldGFjaGVkTm9kZXNbdHlwZV0gPSBbXTtcbiAgICB2YXIgbm9kZVN0b3JlID0gdGhpcy5kZXRhY2hlZE5vZGVzW3R5cGVdO1xuICAgIHZhciByZXN1bHQ7XG4gICAgaWYgKG5vZGVTdG9yZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJlc3VsdCA9IG5vZGVTdG9yZS5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChyZXN1bHQpO1xuICAgIH1cbiAgICB0aGlzLm5vZGVDb3VudCsrO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuRWxlbWVudEFsbG9jYXRvci5wcm90b3R5cGUuZGVhbGxvY2F0ZSA9IGZ1bmN0aW9uIGRlYWxsb2NhdGUoZWxlbWVudCkge1xuICAgIHZhciBub2RlVHlwZSA9IGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgbm9kZVN0b3JlID0gdGhpcy5kZXRhY2hlZE5vZGVzW25vZGVUeXBlXTtcbiAgICBub2RlU3RvcmUucHVzaChlbGVtZW50KTtcbiAgICB0aGlzLm5vZGVDb3VudC0tO1xufTtcbkVsZW1lbnRBbGxvY2F0b3IucHJvdG90eXBlLmdldE5vZGVDb3VudCA9IGZ1bmN0aW9uIGdldE5vZGVDb3VudCgpIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlQ291bnQ7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBFbGVtZW50QWxsb2NhdG9yOyIsInZhciBFbnRpdHkgPSByZXF1aXJlKCcuL0VudGl0eScpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4vRXZlbnRIYW5kbGVyJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi9UcmFuc2Zvcm0nKTtcbnZhciB1c2VQcmVmaXggPSAhKCd0cmFuc2Zvcm0nIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSk7XG52YXIgZGV2aWNlUGl4ZWxSYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG5mdW5jdGlvbiBFbGVtZW50T3V0cHV0KGVsZW1lbnQpIHtcbiAgICB0aGlzLl9tYXRyaXggPSBudWxsO1xuICAgIHRoaXMuX29wYWNpdHkgPSAxO1xuICAgIHRoaXMuX29yaWdpbiA9IG51bGw7XG4gICAgdGhpcy5fc2l6ZSA9IG51bGw7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuYmluZFRoaXModGhpcyk7XG4gICAgdGhpcy5ldmVudEZvcndhcmRlciA9IGZ1bmN0aW9uIGV2ZW50Rm9yd2FyZGVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoZXZlbnQudHlwZSwgZXZlbnQpO1xuICAgIH0uYmluZCh0aGlzKTtcbiAgICB0aGlzLmlkID0gRW50aXR5LnJlZ2lzdGVyKHRoaXMpO1xuICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuX3NpemVEaXJ0eSA9IGZhbHNlO1xuICAgIHRoaXMuX29yaWdpbkRpcnR5ID0gZmFsc2U7XG4gICAgdGhpcy5fdHJhbnNmb3JtRGlydHkgPSBmYWxzZTtcbiAgICB0aGlzLl9pbnZpc2libGUgPSBmYWxzZTtcbiAgICBpZiAoZWxlbWVudClcbiAgICAgICAgdGhpcy5hdHRhY2goZWxlbWVudCk7XG59XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKHR5cGUsIGZuKSB7XG4gICAgaWYgKHRoaXMuX2VsZW1lbnQpXG4gICAgICAgIHRoaXMuX2VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCB0aGlzLmV2ZW50Rm9yd2FyZGVyKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5vbih0eXBlLCBmbik7XG59O1xuRWxlbWVudE91dHB1dC5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBmbikge1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LnJlbW92ZUxpc3RlbmVyKHR5cGUsIGZuKTtcbn07XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBldmVudCkge1xuICAgIGlmIChldmVudCAmJiAhZXZlbnQub3JpZ2luKVxuICAgICAgICBldmVudC5vcmlnaW4gPSB0aGlzO1xuICAgIHZhciBoYW5kbGVkID0gdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCh0eXBlLCBldmVudCk7XG4gICAgaWYgKGhhbmRsZWQgJiYgZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKVxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICByZXR1cm4gaGFuZGxlZDtcbn07XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gcGlwZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRPdXRwdXQucGlwZSh0YXJnZXQpO1xufTtcbkVsZW1lbnRPdXRwdXQucHJvdG90eXBlLnVucGlwZSA9IGZ1bmN0aW9uIHVucGlwZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRPdXRwdXQudW5waXBlKHRhcmdldCk7XG59O1xuRWxlbWVudE91dHB1dC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmlkO1xufTtcbmZ1bmN0aW9uIF9hZGRFdmVudExpc3RlbmVycyh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpIGluIHRoaXMuX2V2ZW50T3V0cHV0Lmxpc3RlbmVycykge1xuICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihpLCB0aGlzLmV2ZW50Rm9yd2FyZGVyKTtcbiAgICB9XG59XG5mdW5jdGlvbiBfcmVtb3ZlRXZlbnRMaXN0ZW5lcnModGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLl9ldmVudE91dHB1dC5saXN0ZW5lcnMpIHtcbiAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoaSwgdGhpcy5ldmVudEZvcndhcmRlcik7XG4gICAgfVxufVxuZnVuY3Rpb24gX2Zvcm1hdENTU1RyYW5zZm9ybShtKSB7XG4gICAgbVsxMl0gPSBNYXRoLnJvdW5kKG1bMTJdICogZGV2aWNlUGl4ZWxSYXRpbykgLyBkZXZpY2VQaXhlbFJhdGlvO1xuICAgIG1bMTNdID0gTWF0aC5yb3VuZChtWzEzXSAqIGRldmljZVBpeGVsUmF0aW8pIC8gZGV2aWNlUGl4ZWxSYXRpbztcbiAgICB2YXIgcmVzdWx0ID0gJ21hdHJpeDNkKCc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCArPSBtW2ldIDwgMC4wMDAwMDEgJiYgbVtpXSA+IC0wLjAwMDAwMSA/ICcwLCcgOiBtW2ldICsgJywnO1xuICAgIH1cbiAgICByZXN1bHQgKz0gbVsxNV0gKyAnKSc7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbnZhciBfc2V0TWF0cml4O1xuaWYgKG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdmaXJlZm94JykgPiAtMSkge1xuICAgIF9zZXRNYXRyaXggPSBmdW5jdGlvbiAoZWxlbWVudCwgbWF0cml4KSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuekluZGV4ID0gbWF0cml4WzE0XSAqIDEwMDAwMDAgfCAwO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IF9mb3JtYXRDU1NUcmFuc2Zvcm0obWF0cml4KTtcbiAgICB9O1xufSBlbHNlIGlmICh1c2VQcmVmaXgpIHtcbiAgICBfc2V0TWF0cml4ID0gZnVuY3Rpb24gKGVsZW1lbnQsIG1hdHJpeCkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IF9mb3JtYXRDU1NUcmFuc2Zvcm0obWF0cml4KTtcbiAgICB9O1xufSBlbHNlIHtcbiAgICBfc2V0TWF0cml4ID0gZnVuY3Rpb24gKGVsZW1lbnQsIG1hdHJpeCkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IF9mb3JtYXRDU1NUcmFuc2Zvcm0obWF0cml4KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gX2Zvcm1hdENTU09yaWdpbihvcmlnaW4pIHtcbiAgICByZXR1cm4gMTAwICogb3JpZ2luWzBdICsgJyUgJyArIDEwMCAqIG9yaWdpblsxXSArICclJztcbn1cbnZhciBfc2V0T3JpZ2luID0gdXNlUHJlZml4ID8gZnVuY3Rpb24gKGVsZW1lbnQsIG9yaWdpbikge1xuICAgICAgICBlbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybU9yaWdpbiA9IF9mb3JtYXRDU1NPcmlnaW4ob3JpZ2luKTtcbiAgICB9IDogZnVuY3Rpb24gKGVsZW1lbnQsIG9yaWdpbikge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9IF9mb3JtYXRDU1NPcmlnaW4ob3JpZ2luKTtcbiAgICB9O1xudmFyIF9zZXRJbnZpc2libGUgPSB1c2VQcmVmaXggPyBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZTNkKDAuMDAwMSwwLjAwMDEsMC4wMDAxKSc7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgfSA6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlM2QoMC4wMDAxLDAuMDAwMSwwLjAwMDEpJztcbiAgICAgICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICB9O1xuZnVuY3Rpb24gX3h5Tm90RXF1YWxzKGEsIGIpIHtcbiAgICByZXR1cm4gYSAmJiBiID8gYVswXSAhPT0gYlswXSB8fCBhWzFdICE9PSBiWzFdIDogYSAhPT0gYjtcbn1cbkVsZW1lbnRPdXRwdXQucHJvdG90eXBlLmNvbW1pdCA9IGZ1bmN0aW9uIGNvbW1pdChjb250ZXh0KSB7XG4gICAgdmFyIHRhcmdldCA9IHRoaXMuX2VsZW1lbnQ7XG4gICAgaWYgKCF0YXJnZXQpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgbWF0cml4ID0gY29udGV4dC50cmFuc2Zvcm07XG4gICAgdmFyIG9wYWNpdHkgPSBjb250ZXh0Lm9wYWNpdHk7XG4gICAgdmFyIG9yaWdpbiA9IGNvbnRleHQub3JpZ2luO1xuICAgIHZhciBzaXplID0gY29udGV4dC5zaXplO1xuICAgIGlmICghbWF0cml4ICYmIHRoaXMuX21hdHJpeCkge1xuICAgICAgICB0aGlzLl9tYXRyaXggPSBudWxsO1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gMDtcbiAgICAgICAgX3NldEludmlzaWJsZSh0YXJnZXQpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChfeHlOb3RFcXVhbHModGhpcy5fb3JpZ2luLCBvcmlnaW4pKVxuICAgICAgICB0aGlzLl9vcmlnaW5EaXJ0eSA9IHRydWU7XG4gICAgaWYgKFRyYW5zZm9ybS5ub3RFcXVhbHModGhpcy5fbWF0cml4LCBtYXRyaXgpKVxuICAgICAgICB0aGlzLl90cmFuc2Zvcm1EaXJ0eSA9IHRydWU7XG4gICAgaWYgKHRoaXMuX2ludmlzaWJsZSkge1xuICAgICAgICB0aGlzLl9pbnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgfVxuICAgIGlmICh0aGlzLl9vcGFjaXR5ICE9PSBvcGFjaXR5KSB7XG4gICAgICAgIHRoaXMuX29wYWNpdHkgPSBvcGFjaXR5O1xuICAgICAgICB0YXJnZXQuc3R5bGUub3BhY2l0eSA9IG9wYWNpdHkgPj0gMSA/ICcwLjk5OTk5OScgOiBvcGFjaXR5O1xuICAgIH1cbiAgICBpZiAodGhpcy5fdHJhbnNmb3JtRGlydHkgfHwgdGhpcy5fb3JpZ2luRGlydHkgfHwgdGhpcy5fc2l6ZURpcnR5KSB7XG4gICAgICAgIGlmICh0aGlzLl9zaXplRGlydHkpXG4gICAgICAgICAgICB0aGlzLl9zaXplRGlydHkgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuX29yaWdpbkRpcnR5KSB7XG4gICAgICAgICAgICBpZiAob3JpZ2luKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9vcmlnaW4pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29yaWdpbiA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgdGhpcy5fb3JpZ2luWzBdID0gb3JpZ2luWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMuX29yaWdpblsxXSA9IG9yaWdpblsxXTtcbiAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuX29yaWdpbiA9IG51bGw7XG4gICAgICAgICAgICBfc2V0T3JpZ2luKHRhcmdldCwgdGhpcy5fb3JpZ2luKTtcbiAgICAgICAgICAgIHRoaXMuX29yaWdpbkRpcnR5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtYXRyaXgpXG4gICAgICAgICAgICBtYXRyaXggPSBUcmFuc2Zvcm0uaWRlbnRpdHk7XG4gICAgICAgIHRoaXMuX21hdHJpeCA9IG1hdHJpeDtcbiAgICAgICAgdmFyIGFhTWF0cml4ID0gdGhpcy5fc2l6ZSA/IFRyYW5zZm9ybS50aGVuTW92ZShtYXRyaXgsIFtcbiAgICAgICAgICAgICAgICAtdGhpcy5fc2l6ZVswXSAqIG9yaWdpblswXSxcbiAgICAgICAgICAgICAgICAtdGhpcy5fc2l6ZVsxXSAqIG9yaWdpblsxXSxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdKSA6IG1hdHJpeDtcbiAgICAgICAgX3NldE1hdHJpeCh0YXJnZXQsIGFhTWF0cml4KTtcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtRGlydHkgPSBmYWxzZTtcbiAgICB9XG59O1xuRWxlbWVudE91dHB1dC5wcm90b3R5cGUuY2xlYW51cCA9IGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgaWYgKHRoaXMuX2VsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5faW52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbn07XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS5hdHRhY2ggPSBmdW5jdGlvbiBhdHRhY2godGFyZ2V0KSB7XG4gICAgdGhpcy5fZWxlbWVudCA9IHRhcmdldDtcbiAgICBfYWRkRXZlbnRMaXN0ZW5lcnMuY2FsbCh0aGlzLCB0YXJnZXQpO1xufTtcbkVsZW1lbnRPdXRwdXQucHJvdG90eXBlLmRldGFjaCA9IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5fZWxlbWVudDtcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIF9yZW1vdmVFdmVudExpc3RlbmVycy5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgICAgIGlmICh0aGlzLl9pbnZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2ludmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgcmV0dXJuIHRhcmdldDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEVsZW1lbnRPdXRwdXQ7IiwidmFyIENvbnRleHQgPSByZXF1aXJlKCcuL0NvbnRleHQnKTtcbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuL0V2ZW50SGFuZGxlcicpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnLi9PcHRpb25zTWFuYWdlcicpO1xudmFyIEVuZ2luZSA9IHt9O1xudmFyIGNvbnRleHRzID0gW107XG52YXIgbmV4dFRpY2tRdWV1ZSA9IFtdO1xudmFyIGN1cnJlbnRGcmFtZSA9IDA7XG52YXIgbmV4dFRpY2tGcmFtZSA9IDA7XG52YXIgZGVmZXJRdWV1ZSA9IFtdO1xudmFyIGxhc3RUaW1lID0gRGF0ZS5ub3coKTtcbnZhciBmcmFtZVRpbWU7XG52YXIgZnJhbWVUaW1lTGltaXQ7XG52YXIgbG9vcEVuYWJsZWQgPSB0cnVlO1xudmFyIGV2ZW50Rm9yd2FyZGVycyA9IHt9O1xudmFyIGV2ZW50SGFuZGxlciA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbnZhciBvcHRpb25zID0ge1xuICAgICAgICBjb250YWluZXJUeXBlOiAnZGl2JyxcbiAgICAgICAgY29udGFpbmVyQ2xhc3M6ICdmYW1vdXMtY29udGFpbmVyJyxcbiAgICAgICAgZnBzQ2FwOiB1bmRlZmluZWQsXG4gICAgICAgIHJ1bkxvb3A6IHRydWUsXG4gICAgICAgIGFwcE1vZGU6IHRydWVcbiAgICB9O1xudmFyIG9wdGlvbnNNYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKG9wdGlvbnMpO1xudmFyIE1BWF9ERUZFUl9GUkFNRV9USU1FID0gMTA7XG5FbmdpbmUuc3RlcCA9IGZ1bmN0aW9uIHN0ZXAoKSB7XG4gICAgY3VycmVudEZyYW1lKys7XG4gICAgbmV4dFRpY2tGcmFtZSA9IGN1cnJlbnRGcmFtZTtcbiAgICB2YXIgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIGlmIChmcmFtZVRpbWVMaW1pdCAmJiBjdXJyZW50VGltZSAtIGxhc3RUaW1lIDwgZnJhbWVUaW1lTGltaXQpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgaSA9IDA7XG4gICAgZnJhbWVUaW1lID0gY3VycmVudFRpbWUgLSBsYXN0VGltZTtcbiAgICBsYXN0VGltZSA9IGN1cnJlbnRUaW1lO1xuICAgIGV2ZW50SGFuZGxlci5lbWl0KCdwcmVyZW5kZXInKTtcbiAgICBpZiAobmV4dFRpY2tRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG5leHRUaWNrUXVldWVbMF0ubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBuZXh0VGlja1F1ZXVlWzBdW2ldLmNhbGwodGhpcywgY3VycmVudEZyYW1lKTtcbiAgICAgICAgbmV4dFRpY2tRdWV1ZS5zcGxpY2UoMCwgMSk7XG4gICAgfVxuICAgIHdoaWxlIChkZWZlclF1ZXVlLmxlbmd0aCAmJiBEYXRlLm5vdygpIC0gY3VycmVudFRpbWUgPCBNQVhfREVGRVJfRlJBTUVfVElNRSkge1xuICAgICAgICBkZWZlclF1ZXVlLnNoaWZ0KCkuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IGNvbnRleHRzLmxlbmd0aDsgaSsrKVxuICAgICAgICBjb250ZXh0c1tpXS51cGRhdGUoKTtcbiAgICBldmVudEhhbmRsZXIuZW1pdCgncG9zdHJlbmRlcicpO1xufTtcbmZ1bmN0aW9uIGxvb3AoKSB7XG4gICAgaWYgKG9wdGlvbnMucnVuTG9vcCkge1xuICAgICAgICBFbmdpbmUuc3RlcCgpO1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgIH0gZWxzZVxuICAgICAgICBsb29wRW5hYmxlZCA9IGZhbHNlO1xufVxud2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbmZ1bmN0aW9uIGhhbmRsZVJlc2l6ZShldmVudCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGV4dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29udGV4dHNbaV0uZW1pdCgncmVzaXplJyk7XG4gICAgfVxuICAgIGV2ZW50SGFuZGxlci5lbWl0KCdyZXNpemUnKTtcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVSZXNpemUsIGZhbHNlKTtcbmhhbmRsZVJlc2l6ZSgpO1xuZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSwgdHJ1ZSk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdmYW1vdXMtcm9vdCcpO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmYW1vdXMtcm9vdCcpO1xufVxudmFyIGluaXRpYWxpemVkID0gZmFsc2U7XG5FbmdpbmUucGlwZSA9IGZ1bmN0aW9uIHBpcGUodGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC5zdWJzY3JpYmUgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgcmV0dXJuIHRhcmdldC5zdWJzY3JpYmUoRW5naW5lKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBldmVudEhhbmRsZXIucGlwZSh0YXJnZXQpO1xufTtcbkVuZ2luZS51bnBpcGUgPSBmdW5jdGlvbiB1bnBpcGUodGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC51bnN1YnNjcmliZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LnVuc3Vic2NyaWJlKEVuZ2luZSk7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gZXZlbnRIYW5kbGVyLnVucGlwZSh0YXJnZXQpO1xufTtcbkVuZ2luZS5vbiA9IGZ1bmN0aW9uIG9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgICBpZiAoISh0eXBlIGluIGV2ZW50Rm9yd2FyZGVycykpIHtcbiAgICAgICAgZXZlbnRGb3J3YXJkZXJzW3R5cGVdID0gZXZlbnRIYW5kbGVyLmVtaXQuYmluZChldmVudEhhbmRsZXIsIHR5cGUpO1xuICAgICAgICBpZiAoZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGV2ZW50Rm9yd2FyZGVyc1t0eXBlXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBFbmdpbmUubmV4dFRpY2soZnVuY3Rpb24gKHR5cGUsIGZvcndhcmRlcikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmb3J3YXJkZXIpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMsIHR5cGUsIGV2ZW50Rm9yd2FyZGVyc1t0eXBlXSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBldmVudEhhbmRsZXIub24odHlwZSwgaGFuZGxlcik7XG59O1xuRW5naW5lLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUsIGV2ZW50KSB7XG4gICAgcmV0dXJuIGV2ZW50SGFuZGxlci5lbWl0KHR5cGUsIGV2ZW50KTtcbn07XG5FbmdpbmUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSB7XG4gICAgcmV0dXJuIGV2ZW50SGFuZGxlci5yZW1vdmVMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKTtcbn07XG5FbmdpbmUuZ2V0RlBTID0gZnVuY3Rpb24gZ2V0RlBTKCkge1xuICAgIHJldHVybiAxMDAwIC8gZnJhbWVUaW1lO1xufTtcbkVuZ2luZS5zZXRGUFNDYXAgPSBmdW5jdGlvbiBzZXRGUFNDYXAoZnBzKSB7XG4gICAgZnJhbWVUaW1lTGltaXQgPSBNYXRoLmZsb29yKDEwMDAgLyBmcHMpO1xufTtcbkVuZ2luZS5nZXRPcHRpb25zID0gZnVuY3Rpb24gZ2V0T3B0aW9ucyhrZXkpIHtcbiAgICByZXR1cm4gb3B0aW9uc01hbmFnZXIuZ2V0T3B0aW9ucyhrZXkpO1xufTtcbkVuZ2luZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnNNYW5hZ2VyLnNldE9wdGlvbnMuYXBwbHkob3B0aW9uc01hbmFnZXIsIGFyZ3VtZW50cyk7XG59O1xuRW5naW5lLmNyZWF0ZUNvbnRleHQgPSBmdW5jdGlvbiBjcmVhdGVDb250ZXh0KGVsKSB7XG4gICAgaWYgKCFpbml0aWFsaXplZCAmJiBvcHRpb25zLmFwcE1vZGUpXG4gICAgICAgIEVuZ2luZS5uZXh0VGljayhpbml0aWFsaXplKTtcbiAgICB2YXIgbmVlZE1vdW50Q29udGFpbmVyID0gZmFsc2U7XG4gICAgaWYgKCFlbCkge1xuICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQob3B0aW9ucy5jb250YWluZXJUeXBlKTtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChvcHRpb25zLmNvbnRhaW5lckNsYXNzKTtcbiAgICAgICAgbmVlZE1vdW50Q29udGFpbmVyID0gdHJ1ZTtcbiAgICB9XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dChlbCk7XG4gICAgRW5naW5lLnJlZ2lzdGVyQ29udGV4dChjb250ZXh0KTtcbiAgICBpZiAobmVlZE1vdW50Q29udGFpbmVyKSB7XG4gICAgICAgIEVuZ2luZS5uZXh0VGljayhmdW5jdGlvbiAoY29udGV4dCwgZWwpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgICAgICAgY29udGV4dC5lbWl0KCdyZXNpemUnKTtcbiAgICAgICAgfS5iaW5kKHRoaXMsIGNvbnRleHQsIGVsKSk7XG4gICAgfVxuICAgIHJldHVybiBjb250ZXh0O1xufTtcbkVuZ2luZS5yZWdpc3RlckNvbnRleHQgPSBmdW5jdGlvbiByZWdpc3RlckNvbnRleHQoY29udGV4dCkge1xuICAgIGNvbnRleHRzLnB1c2goY29udGV4dCk7XG4gICAgcmV0dXJuIGNvbnRleHQ7XG59O1xuRW5naW5lLmdldENvbnRleHRzID0gZnVuY3Rpb24gZ2V0Q29udGV4dHMoKSB7XG4gICAgcmV0dXJuIGNvbnRleHRzO1xufTtcbkVuZ2luZS5kZXJlZ2lzdGVyQ29udGV4dCA9IGZ1bmN0aW9uIGRlcmVnaXN0ZXJDb250ZXh0KGNvbnRleHQpIHtcbiAgICB2YXIgaSA9IGNvbnRleHRzLmluZGV4T2YoY29udGV4dCk7XG4gICAgaWYgKGkgPj0gMClcbiAgICAgICAgY29udGV4dHMuc3BsaWNlKGksIDEpO1xufTtcbkVuZ2luZS5uZXh0VGljayA9IGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgdmFyIGZyYW1lSW5kZXggPSBuZXh0VGlja0ZyYW1lIC0gY3VycmVudEZyYW1lO1xuICAgIGlmICghbmV4dFRpY2tRdWV1ZVtmcmFtZUluZGV4XSlcbiAgICAgICAgbmV4dFRpY2tRdWV1ZVtmcmFtZUluZGV4XSA9IFtdO1xuICAgIGZ1bmN0aW9uIGZyYW1lQ2hlY2tlcihmcmFtZSkge1xuICAgICAgICB2YXIgbmV4dEZyYW1lID0gZnJhbWUgKyAxO1xuICAgICAgICBpZiAobmV4dFRpY2tGcmFtZSAhPT0gbmV4dEZyYW1lKVxuICAgICAgICAgICAgbmV4dFRpY2tGcmFtZSA9IG5leHRGcmFtZTtcbiAgICAgICAgZm4oKTtcbiAgICB9XG4gICAgbmV4dFRpY2tRdWV1ZVtmcmFtZUluZGV4XS5wdXNoKGZyYW1lQ2hlY2tlcik7XG59O1xuRW5naW5lLmRlZmVyID0gZnVuY3Rpb24gZGVmZXIoZm4pIHtcbiAgICBkZWZlclF1ZXVlLnB1c2goZm4pO1xufTtcbm9wdGlvbnNNYW5hZ2VyLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgIGlmIChkYXRhLmlkID09PSAnZnBzQ2FwJylcbiAgICAgICAgRW5naW5lLnNldEZQU0NhcChkYXRhLnZhbHVlKTtcbiAgICBlbHNlIGlmIChkYXRhLmlkID09PSAncnVuTG9vcCcpIHtcbiAgICAgICAgaWYgKCFsb29wRW5hYmxlZCAmJiBkYXRhLnZhbHVlKSB7XG4gICAgICAgICAgICBsb29wRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IEVuZ2luZTsiLCJ2YXIgZW50aXRpZXMgPSBbXTtcbmZ1bmN0aW9uIGdldChpZCkge1xuICAgIHJldHVybiBlbnRpdGllc1tpZF07XG59XG5mdW5jdGlvbiBzZXQoaWQsIGVudGl0eSkge1xuICAgIGVudGl0aWVzW2lkXSA9IGVudGl0eTtcbn1cbmZ1bmN0aW9uIHJlZ2lzdGVyKGVudGl0eSkge1xuICAgIHZhciBpZCA9IGVudGl0aWVzLmxlbmd0aDtcbiAgICBzZXQoaWQsIGVudGl0eSk7XG4gICAgcmV0dXJuIGlkO1xufVxuZnVuY3Rpb24gdW5yZWdpc3RlcihpZCkge1xuICAgIHNldChpZCwgbnVsbCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICByZWdpc3RlcjogcmVnaXN0ZXIsXG4gICAgdW5yZWdpc3RlcjogdW5yZWdpc3RlcixcbiAgICBnZXQ6IGdldCxcbiAgICBzZXQ6IHNldFxufTsiLCJmdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gICAgdGhpcy5saXN0ZW5lcnMgPSB7fTtcbiAgICB0aGlzLl9vd25lciA9IHRoaXM7XG59XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUsIGV2ZW50KSB7XG4gICAgdmFyIGhhbmRsZXJzID0gdGhpcy5saXN0ZW5lcnNbdHlwZV07XG4gICAgaWYgKGhhbmRsZXJzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGFuZGxlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGhhbmRsZXJzW2ldLmNhbGwodGhpcy5fb3duZXIsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24odHlwZSwgaGFuZGxlcikge1xuICAgIGlmICghKHR5cGUgaW4gdGhpcy5saXN0ZW5lcnMpKVxuICAgICAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXSA9IFtdO1xuICAgIHZhciBpbmRleCA9IHRoaXMubGlzdGVuZXJzW3R5cGVdLmluZGV4T2YoaGFuZGxlcik7XG4gICAgaWYgKGluZGV4IDwgMClcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0ucHVzaChoYW5kbGVyKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbjtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSB7XG4gICAgdmFyIGxpc3RlbmVyID0gdGhpcy5saXN0ZW5lcnNbdHlwZV07XG4gICAgaWYgKGxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gbGlzdGVuZXIuaW5kZXhPZihoYW5kbGVyKTtcbiAgICAgICAgaWYgKGluZGV4ID49IDApXG4gICAgICAgICAgICBsaXN0ZW5lci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmJpbmRUaGlzID0gZnVuY3Rpb24gYmluZFRoaXMob3duZXIpIHtcbiAgICB0aGlzLl9vd25lciA9IG93bmVyO1xufTtcbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyOyIsInZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCcuL0V2ZW50RW1pdHRlcicpO1xuZnVuY3Rpb24gRXZlbnRIYW5kbGVyKCkge1xuICAgIEV2ZW50RW1pdHRlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMuZG93bnN0cmVhbSA9IFtdO1xuICAgIHRoaXMuZG93bnN0cmVhbUZuID0gW107XG4gICAgdGhpcy51cHN0cmVhbSA9IFtdO1xuICAgIHRoaXMudXBzdHJlYW1MaXN0ZW5lcnMgPSB7fTtcbn1cbkV2ZW50SGFuZGxlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEV2ZW50RW1pdHRlci5wcm90b3R5cGUpO1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEV2ZW50SGFuZGxlcjtcbkV2ZW50SGFuZGxlci5zZXRJbnB1dEhhbmRsZXIgPSBmdW5jdGlvbiBzZXRJbnB1dEhhbmRsZXIob2JqZWN0LCBoYW5kbGVyKSB7XG4gICAgb2JqZWN0LnRyaWdnZXIgPSBoYW5kbGVyLnRyaWdnZXIuYmluZChoYW5kbGVyKTtcbiAgICBpZiAoaGFuZGxlci5zdWJzY3JpYmUgJiYgaGFuZGxlci51bnN1YnNjcmliZSkge1xuICAgICAgICBvYmplY3Quc3Vic2NyaWJlID0gaGFuZGxlci5zdWJzY3JpYmUuYmluZChoYW5kbGVyKTtcbiAgICAgICAgb2JqZWN0LnVuc3Vic2NyaWJlID0gaGFuZGxlci51bnN1YnNjcmliZS5iaW5kKGhhbmRsZXIpO1xuICAgIH1cbn07XG5FdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlciA9IGZ1bmN0aW9uIHNldE91dHB1dEhhbmRsZXIob2JqZWN0LCBoYW5kbGVyKSB7XG4gICAgaWYgKGhhbmRsZXIgaW5zdGFuY2VvZiBFdmVudEhhbmRsZXIpXG4gICAgICAgIGhhbmRsZXIuYmluZFRoaXMob2JqZWN0KTtcbiAgICBvYmplY3QucGlwZSA9IGhhbmRsZXIucGlwZS5iaW5kKGhhbmRsZXIpO1xuICAgIG9iamVjdC51bnBpcGUgPSBoYW5kbGVyLnVucGlwZS5iaW5kKGhhbmRsZXIpO1xuICAgIG9iamVjdC5vbiA9IGhhbmRsZXIub24uYmluZChoYW5kbGVyKTtcbiAgICBvYmplY3QuYWRkTGlzdGVuZXIgPSBvYmplY3Qub247XG4gICAgb2JqZWN0LnJlbW92ZUxpc3RlbmVyID0gaGFuZGxlci5yZW1vdmVMaXN0ZW5lci5iaW5kKGhhbmRsZXIpO1xufTtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSwgZXZlbnQpIHtcbiAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB2YXIgaSA9IDA7XG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMuZG93bnN0cmVhbS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5kb3duc3RyZWFtW2ldLnRyaWdnZXIpXG4gICAgICAgICAgICB0aGlzLmRvd25zdHJlYW1baV0udHJpZ2dlcih0eXBlLCBldmVudCk7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmRvd25zdHJlYW1Gbi5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmRvd25zdHJlYW1GbltpXSh0eXBlLCBldmVudCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUudHJpZ2dlciA9IEV2ZW50SGFuZGxlci5wcm90b3R5cGUuZW1pdDtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uIHBpcGUodGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC5zdWJzY3JpYmUgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgcmV0dXJuIHRhcmdldC5zdWJzY3JpYmUodGhpcyk7XG4gICAgdmFyIGRvd25zdHJlYW1DdHggPSB0YXJnZXQgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IHRoaXMuZG93bnN0cmVhbUZuIDogdGhpcy5kb3duc3RyZWFtO1xuICAgIHZhciBpbmRleCA9IGRvd25zdHJlYW1DdHguaW5kZXhPZih0YXJnZXQpO1xuICAgIGlmIChpbmRleCA8IDApXG4gICAgICAgIGRvd25zdHJlYW1DdHgucHVzaCh0YXJnZXQpO1xuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGFyZ2V0KCdwaXBlJywgbnVsbCk7XG4gICAgZWxzZSBpZiAodGFyZ2V0LnRyaWdnZXIpXG4gICAgICAgIHRhcmdldC50cmlnZ2VyKCdwaXBlJywgbnVsbCk7XG4gICAgcmV0dXJuIHRhcmdldDtcbn07XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLnVucGlwZSA9IGZ1bmN0aW9uIHVucGlwZSh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LnVuc3Vic2NyaWJlIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHJldHVybiB0YXJnZXQudW5zdWJzY3JpYmUodGhpcyk7XG4gICAgdmFyIGRvd25zdHJlYW1DdHggPSB0YXJnZXQgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IHRoaXMuZG93bnN0cmVhbUZuIDogdGhpcy5kb3duc3RyZWFtO1xuICAgIHZhciBpbmRleCA9IGRvd25zdHJlYW1DdHguaW5kZXhPZih0YXJnZXQpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgIGRvd25zdHJlYW1DdHguc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICAgICAgdGFyZ2V0KCd1bnBpcGUnLCBudWxsKTtcbiAgICAgICAgZWxzZSBpZiAodGFyZ2V0LnRyaWdnZXIpXG4gICAgICAgICAgICB0YXJnZXQudHJpZ2dlcigndW5waXBlJywgbnVsbCk7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiBmYWxzZTtcbn07XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24odHlwZSwgaGFuZGxlcikge1xuICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoISh0eXBlIGluIHRoaXMudXBzdHJlYW1MaXN0ZW5lcnMpKSB7XG4gICAgICAgIHZhciB1cHN0cmVhbUxpc3RlbmVyID0gdGhpcy50cmlnZ2VyLmJpbmQodGhpcywgdHlwZSk7XG4gICAgICAgIHRoaXMudXBzdHJlYW1MaXN0ZW5lcnNbdHlwZV0gPSB1cHN0cmVhbUxpc3RlbmVyO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudXBzdHJlYW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMudXBzdHJlYW1baV0ub24odHlwZSwgdXBzdHJlYW1MaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50SGFuZGxlci5wcm90b3R5cGUub247XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIHN1YnNjcmliZShzb3VyY2UpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLnVwc3RyZWFtLmluZGV4T2Yoc291cmNlKTtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIHRoaXMudXBzdHJlYW0ucHVzaChzb3VyY2UpO1xuICAgICAgICBmb3IgKHZhciB0eXBlIGluIHRoaXMudXBzdHJlYW1MaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHNvdXJjZS5vbih0eXBlLCB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzW3R5cGVdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gdW5zdWJzY3JpYmUoc291cmNlKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy51cHN0cmVhbS5pbmRleE9mKHNvdXJjZSk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgdGhpcy51cHN0cmVhbS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBmb3IgKHZhciB0eXBlIGluIHRoaXMudXBzdHJlYW1MaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHNvdXJjZS5yZW1vdmVMaXN0ZW5lcih0eXBlLCB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzW3R5cGVdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50SGFuZGxlcjsiLCJ2YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi9UcmFuc2Zvcm0nKTtcbnZhciBUcmFuc2l0aW9uYWJsZSA9IHJlcXVpcmUoJy4uL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlJyk7XG52YXIgVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0gPSByZXF1aXJlKCcuLi90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybScpO1xuZnVuY3Rpb24gTW9kaWZpZXIob3B0aW9ucykge1xuICAgIHRoaXMuX3RyYW5zZm9ybUdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fb3BhY2l0eUdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fb3JpZ2luR2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9hbGlnbkdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fc2l6ZUdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fcHJvcG9ydGlvbkdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fbGVnYWN5U3RhdGVzID0ge307XG4gICAgdGhpcy5fb3V0cHV0ID0ge1xuICAgICAgICB0cmFuc2Zvcm06IFRyYW5zZm9ybS5pZGVudGl0eSxcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgb3JpZ2luOiBudWxsLFxuICAgICAgICBhbGlnbjogbnVsbCxcbiAgICAgICAgc2l6ZTogbnVsbCxcbiAgICAgICAgcHJvcG9ydGlvbnM6IG51bGwsXG4gICAgICAgIHRhcmdldDogbnVsbFxuICAgIH07XG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMudHJhbnNmb3JtKVxuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1Gcm9tKG9wdGlvbnMudHJhbnNmb3JtKTtcbiAgICAgICAgaWYgKG9wdGlvbnMub3BhY2l0eSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhpcy5vcGFjaXR5RnJvbShvcHRpb25zLm9wYWNpdHkpO1xuICAgICAgICBpZiAob3B0aW9ucy5vcmlnaW4pXG4gICAgICAgICAgICB0aGlzLm9yaWdpbkZyb20ob3B0aW9ucy5vcmlnaW4pO1xuICAgICAgICBpZiAob3B0aW9ucy5hbGlnbilcbiAgICAgICAgICAgIHRoaXMuYWxpZ25Gcm9tKG9wdGlvbnMuYWxpZ24pO1xuICAgICAgICBpZiAob3B0aW9ucy5zaXplKVxuICAgICAgICAgICAgdGhpcy5zaXplRnJvbShvcHRpb25zLnNpemUpO1xuICAgICAgICBpZiAob3B0aW9ucy5wcm9wb3J0aW9ucylcbiAgICAgICAgICAgIHRoaXMucHJvcG9ydGlvbnNGcm9tKG9wdGlvbnMucHJvcG9ydGlvbnMpO1xuICAgIH1cbn1cbk1vZGlmaWVyLnByb3RvdHlwZS50cmFuc2Zvcm1Gcm9tID0gZnVuY3Rpb24gdHJhbnNmb3JtRnJvbSh0cmFuc2Zvcm0pIHtcbiAgICBpZiAodHJhbnNmb3JtIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRoaXMuX3RyYW5zZm9ybUdldHRlciA9IHRyYW5zZm9ybTtcbiAgICBlbHNlIGlmICh0cmFuc2Zvcm0gaW5zdGFuY2VvZiBPYmplY3QgJiYgdHJhbnNmb3JtLmdldClcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtR2V0dGVyID0gdHJhbnNmb3JtLmdldC5iaW5kKHRyYW5zZm9ybSk7XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX3RyYW5zZm9ybUdldHRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX291dHB1dC50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5vcGFjaXR5RnJvbSA9IGZ1bmN0aW9uIG9wYWNpdHlGcm9tKG9wYWNpdHkpIHtcbiAgICBpZiAob3BhY2l0eSBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICB0aGlzLl9vcGFjaXR5R2V0dGVyID0gb3BhY2l0eTtcbiAgICBlbHNlIGlmIChvcGFjaXR5IGluc3RhbmNlb2YgT2JqZWN0ICYmIG9wYWNpdHkuZ2V0KVxuICAgICAgICB0aGlzLl9vcGFjaXR5R2V0dGVyID0gb3BhY2l0eS5nZXQuYmluZChvcGFjaXR5KTtcbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fb3BhY2l0eUdldHRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX291dHB1dC5vcGFjaXR5ID0gb3BhY2l0eTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLm9yaWdpbkZyb20gPSBmdW5jdGlvbiBvcmlnaW5Gcm9tKG9yaWdpbikge1xuICAgIGlmIChvcmlnaW4gaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGhpcy5fb3JpZ2luR2V0dGVyID0gb3JpZ2luO1xuICAgIGVsc2UgaWYgKG9yaWdpbiBpbnN0YW5jZW9mIE9iamVjdCAmJiBvcmlnaW4uZ2V0KVxuICAgICAgICB0aGlzLl9vcmlnaW5HZXR0ZXIgPSBvcmlnaW4uZ2V0LmJpbmQob3JpZ2luKTtcbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fb3JpZ2luR2V0dGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3V0cHV0Lm9yaWdpbiA9IG9yaWdpbjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLmFsaWduRnJvbSA9IGZ1bmN0aW9uIGFsaWduRnJvbShhbGlnbikge1xuICAgIGlmIChhbGlnbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICB0aGlzLl9hbGlnbkdldHRlciA9IGFsaWduO1xuICAgIGVsc2UgaWYgKGFsaWduIGluc3RhbmNlb2YgT2JqZWN0ICYmIGFsaWduLmdldClcbiAgICAgICAgdGhpcy5fYWxpZ25HZXR0ZXIgPSBhbGlnbi5nZXQuYmluZChhbGlnbik7XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX2FsaWduR2V0dGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3V0cHV0LmFsaWduID0gYWxpZ247XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5zaXplRnJvbSA9IGZ1bmN0aW9uIHNpemVGcm9tKHNpemUpIHtcbiAgICBpZiAoc2l6ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICB0aGlzLl9zaXplR2V0dGVyID0gc2l6ZTtcbiAgICBlbHNlIGlmIChzaXplIGluc3RhbmNlb2YgT2JqZWN0ICYmIHNpemUuZ2V0KVxuICAgICAgICB0aGlzLl9zaXplR2V0dGVyID0gc2l6ZS5nZXQuYmluZChzaXplKTtcbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fc2l6ZUdldHRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX291dHB1dC5zaXplID0gc2l6ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLnByb3BvcnRpb25zRnJvbSA9IGZ1bmN0aW9uIHByb3BvcnRpb25zRnJvbShwcm9wb3J0aW9ucykge1xuICAgIGlmIChwcm9wb3J0aW9ucyBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICB0aGlzLl9wcm9wb3J0aW9uR2V0dGVyID0gcHJvcG9ydGlvbnM7XG4gICAgZWxzZSBpZiAocHJvcG9ydGlvbnMgaW5zdGFuY2VvZiBPYmplY3QgJiYgcHJvcG9ydGlvbnMuZ2V0KVxuICAgICAgICB0aGlzLl9wcm9wb3J0aW9uR2V0dGVyID0gcHJvcG9ydGlvbnMuZ2V0LmJpbmQocHJvcG9ydGlvbnMpO1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9wcm9wb3J0aW9uR2V0dGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3V0cHV0LnByb3BvcnRpb25zID0gcHJvcG9ydGlvbnM7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5zZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbiBzZXRUcmFuc2Zvcm0odHJhbnNmb3JtLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICh0cmFuc2l0aW9uIHx8IHRoaXMuX2xlZ2FjeVN0YXRlcy50cmFuc2Zvcm0pIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtID0gbmV3IFRyYW5zaXRpb25hYmxlVHJhbnNmb3JtKHRoaXMuX291dHB1dC50cmFuc2Zvcm0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fdHJhbnNmb3JtR2V0dGVyKVxuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1Gcm9tKHRoaXMuX2xlZ2FjeVN0YXRlcy50cmFuc2Zvcm0pO1xuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtLnNldCh0cmFuc2Zvcm0sIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybUZyb20odHJhbnNmb3JtKTtcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuc2V0T3BhY2l0eSA9IGZ1bmN0aW9uIHNldE9wYWNpdHkob3BhY2l0eSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAodHJhbnNpdGlvbiB8fCB0aGlzLl9sZWdhY3lTdGF0ZXMub3BhY2l0eSkge1xuICAgICAgICBpZiAoIXRoaXMuX2xlZ2FjeVN0YXRlcy5vcGFjaXR5KSB7XG4gICAgICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMub3BhY2l0eSA9IG5ldyBUcmFuc2l0aW9uYWJsZSh0aGlzLl9vdXRwdXQub3BhY2l0eSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9vcGFjaXR5R2V0dGVyKVxuICAgICAgICAgICAgdGhpcy5vcGFjaXR5RnJvbSh0aGlzLl9sZWdhY3lTdGF0ZXMub3BhY2l0eSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9sZWdhY3lTdGF0ZXMub3BhY2l0eS5zZXQob3BhY2l0eSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy5vcGFjaXR5RnJvbShvcGFjaXR5KTtcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuc2V0T3JpZ2luID0gZnVuY3Rpb24gc2V0T3JpZ2luKG9yaWdpbiwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAodHJhbnNpdGlvbiB8fCB0aGlzLl9sZWdhY3lTdGF0ZXMub3JpZ2luKSB7XG4gICAgICAgIGlmICghdGhpcy5fbGVnYWN5U3RhdGVzLm9yaWdpbikge1xuICAgICAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLm9yaWdpbiA9IG5ldyBUcmFuc2l0aW9uYWJsZSh0aGlzLl9vdXRwdXQub3JpZ2luIHx8IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fb3JpZ2luR2V0dGVyKVxuICAgICAgICAgICAgdGhpcy5vcmlnaW5Gcm9tKHRoaXMuX2xlZ2FjeVN0YXRlcy5vcmlnaW4pO1xuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMub3JpZ2luLnNldChvcmlnaW4sIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiB0aGlzLm9yaWdpbkZyb20ob3JpZ2luKTtcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuc2V0QWxpZ24gPSBmdW5jdGlvbiBzZXRBbGlnbihhbGlnbiwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAodHJhbnNpdGlvbiB8fCB0aGlzLl9sZWdhY3lTdGF0ZXMuYWxpZ24pIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sZWdhY3lTdGF0ZXMuYWxpZ24pIHtcbiAgICAgICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5hbGlnbiA9IG5ldyBUcmFuc2l0aW9uYWJsZSh0aGlzLl9vdXRwdXQuYWxpZ24gfHwgW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9hbGlnbkdldHRlcilcbiAgICAgICAgICAgIHRoaXMuYWxpZ25Gcm9tKHRoaXMuX2xlZ2FjeVN0YXRlcy5hbGlnbik7XG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5hbGlnbi5zZXQoYWxpZ24sIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiB0aGlzLmFsaWduRnJvbShhbGlnbik7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLnNldFNpemUgPSBmdW5jdGlvbiBzZXRTaXplKHNpemUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHNpemUgJiYgKHRyYW5zaXRpb24gfHwgdGhpcy5fbGVnYWN5U3RhdGVzLnNpemUpKSB7XG4gICAgICAgIGlmICghdGhpcy5fbGVnYWN5U3RhdGVzLnNpemUpIHtcbiAgICAgICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5zaXplID0gbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMuX291dHB1dC5zaXplIHx8IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fc2l6ZUdldHRlcilcbiAgICAgICAgICAgIHRoaXMuc2l6ZUZyb20odGhpcy5fbGVnYWN5U3RhdGVzLnNpemUpO1xuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMuc2l6ZS5zZXQoc2l6ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l6ZUZyb20oc2l6ZSk7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLnNldFByb3BvcnRpb25zID0gZnVuY3Rpb24gc2V0UHJvcG9ydGlvbnMocHJvcG9ydGlvbnMsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHByb3BvcnRpb25zICYmICh0cmFuc2l0aW9uIHx8IHRoaXMuX2xlZ2FjeVN0YXRlcy5wcm9wb3J0aW9ucykpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sZWdhY3lTdGF0ZXMucHJvcG9ydGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5wcm9wb3J0aW9ucyA9IG5ldyBUcmFuc2l0aW9uYWJsZSh0aGlzLl9vdXRwdXQucHJvcG9ydGlvbnMgfHwgW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9wcm9wb3J0aW9uR2V0dGVyKVxuICAgICAgICAgICAgdGhpcy5wcm9wb3J0aW9uc0Zyb20odGhpcy5fbGVnYWN5U3RhdGVzLnByb3BvcnRpb25zKTtcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnByb3BvcnRpb25zLnNldChwcm9wb3J0aW9ucywgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcG9ydGlvbnNGcm9tKHByb3BvcnRpb25zKTtcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuaGFsdCA9IGZ1bmN0aW9uIGhhbHQoKSB7XG4gICAgaWYgKHRoaXMuX2xlZ2FjeVN0YXRlcy50cmFuc2Zvcm0pXG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy50cmFuc2Zvcm0uaGFsdCgpO1xuICAgIGlmICh0aGlzLl9sZWdhY3lTdGF0ZXMub3BhY2l0eSlcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkuaGFsdCgpO1xuICAgIGlmICh0aGlzLl9sZWdhY3lTdGF0ZXMub3JpZ2luKVxuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMub3JpZ2luLmhhbHQoKTtcbiAgICBpZiAodGhpcy5fbGVnYWN5U3RhdGVzLmFsaWduKVxuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMuYWxpZ24uaGFsdCgpO1xuICAgIGlmICh0aGlzLl9sZWdhY3lTdGF0ZXMuc2l6ZSlcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnNpemUuaGFsdCgpO1xuICAgIGlmICh0aGlzLl9sZWdhY3lTdGF0ZXMucHJvcG9ydGlvbnMpXG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5wcm9wb3J0aW9ucy5oYWx0KCk7XG4gICAgdGhpcy5fdHJhbnNmb3JtR2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9vcGFjaXR5R2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9vcmlnaW5HZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX2FsaWduR2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9zaXplR2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9wcm9wb3J0aW9uR2V0dGVyID0gbnVsbDtcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuZ2V0VHJhbnNmb3JtID0gZnVuY3Rpb24gZ2V0VHJhbnNmb3JtKCkge1xuICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm1HZXR0ZXIoKTtcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuZ2V0RmluYWxUcmFuc2Zvcm0gPSBmdW5jdGlvbiBnZXRGaW5hbFRyYW5zZm9ybSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybSA/IHRoaXMuX2xlZ2FjeVN0YXRlcy50cmFuc2Zvcm0uZ2V0RmluYWwoKSA6IHRoaXMuX291dHB1dC50cmFuc2Zvcm07XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLmdldE9wYWNpdHkgPSBmdW5jdGlvbiBnZXRPcGFjaXR5KCkge1xuICAgIHJldHVybiB0aGlzLl9vcGFjaXR5R2V0dGVyKCk7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLmdldE9yaWdpbiA9IGZ1bmN0aW9uIGdldE9yaWdpbigpIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZ2luR2V0dGVyKCk7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLmdldEFsaWduID0gZnVuY3Rpb24gZ2V0QWxpZ24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FsaWduR2V0dGVyKCk7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9zaXplR2V0dGVyID8gdGhpcy5fc2l6ZUdldHRlcigpIDogdGhpcy5fb3V0cHV0LnNpemU7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLmdldFByb3BvcnRpb25zID0gZnVuY3Rpb24gZ2V0UHJvcG9ydGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb3BvcnRpb25HZXR0ZXIgPyB0aGlzLl9wcm9wb3J0aW9uR2V0dGVyKCkgOiB0aGlzLl9vdXRwdXQucHJvcG9ydGlvbnM7XG59O1xuZnVuY3Rpb24gX3VwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5fdHJhbnNmb3JtR2V0dGVyKVxuICAgICAgICB0aGlzLl9vdXRwdXQudHJhbnNmb3JtID0gdGhpcy5fdHJhbnNmb3JtR2V0dGVyKCk7XG4gICAgaWYgKHRoaXMuX29wYWNpdHlHZXR0ZXIpXG4gICAgICAgIHRoaXMuX291dHB1dC5vcGFjaXR5ID0gdGhpcy5fb3BhY2l0eUdldHRlcigpO1xuICAgIGlmICh0aGlzLl9vcmlnaW5HZXR0ZXIpXG4gICAgICAgIHRoaXMuX291dHB1dC5vcmlnaW4gPSB0aGlzLl9vcmlnaW5HZXR0ZXIoKTtcbiAgICBpZiAodGhpcy5fYWxpZ25HZXR0ZXIpXG4gICAgICAgIHRoaXMuX291dHB1dC5hbGlnbiA9IHRoaXMuX2FsaWduR2V0dGVyKCk7XG4gICAgaWYgKHRoaXMuX3NpemVHZXR0ZXIpXG4gICAgICAgIHRoaXMuX291dHB1dC5zaXplID0gdGhpcy5fc2l6ZUdldHRlcigpO1xuICAgIGlmICh0aGlzLl9wcm9wb3J0aW9uR2V0dGVyKVxuICAgICAgICB0aGlzLl9vdXRwdXQucHJvcG9ydGlvbnMgPSB0aGlzLl9wcm9wb3J0aW9uR2V0dGVyKCk7XG59XG5Nb2RpZmllci5wcm90b3R5cGUubW9kaWZ5ID0gZnVuY3Rpb24gbW9kaWZ5KHRhcmdldCkge1xuICAgIF91cGRhdGUuY2FsbCh0aGlzKTtcbiAgICB0aGlzLl9vdXRwdXQudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHJldHVybiB0aGlzLl9vdXRwdXQ7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBNb2RpZmllcjsiLCJ2YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnLi9FdmVudEhhbmRsZXInKTtcbmZ1bmN0aW9uIE9wdGlvbnNNYW5hZ2VyKHZhbHVlKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLmV2ZW50T3V0cHV0ID0gbnVsbDtcbn1cbk9wdGlvbnNNYW5hZ2VyLnBhdGNoID0gZnVuY3Rpb24gcGF0Y2hPYmplY3Qoc291cmNlLCBkYXRhKSB7XG4gICAgdmFyIG1hbmFnZXIgPSBuZXcgT3B0aW9uc01hbmFnZXIoc291cmNlKTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcbiAgICAgICAgbWFuYWdlci5wYXRjaChhcmd1bWVudHNbaV0pO1xuICAgIHJldHVybiBzb3VyY2U7XG59O1xuZnVuY3Rpb24gX2NyZWF0ZUV2ZW50T3V0cHV0KCkge1xuICAgIHRoaXMuZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5ldmVudE91dHB1dC5iaW5kVGhpcyh0aGlzKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLmV2ZW50T3V0cHV0KTtcbn1cbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5wYXRjaCA9IGZ1bmN0aW9uIHBhdGNoKCkge1xuICAgIHZhciBteVN0YXRlID0gdGhpcy5fdmFsdWU7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGRhdGEgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIGsgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKGsgaW4gbXlTdGF0ZSAmJiAoZGF0YVtrXSAmJiBkYXRhW2tdLmNvbnN0cnVjdG9yID09PSBPYmplY3QpICYmIChteVN0YXRlW2tdICYmIG15U3RhdGVba10uY29uc3RydWN0b3IgPT09IE9iamVjdCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW15U3RhdGUuaGFzT3duUHJvcGVydHkoaykpXG4gICAgICAgICAgICAgICAgICAgIG15U3RhdGVba10gPSBPYmplY3QuY3JlYXRlKG15U3RhdGVba10pO1xuICAgICAgICAgICAgICAgIHRoaXMua2V5KGspLnBhdGNoKGRhdGFba10pO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV2ZW50T3V0cHV0KVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50T3V0cHV0LmVtaXQoJ2NoYW5nZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBrLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMua2V5KGspLnZhbHVlKClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnNldChrLCBkYXRhW2tdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IE9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5wYXRjaDtcbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5rZXkgPSBmdW5jdGlvbiBrZXkoaWRlbnRpZmllcikge1xuICAgIHZhciByZXN1bHQgPSBuZXcgT3B0aW9uc01hbmFnZXIodGhpcy5fdmFsdWVbaWRlbnRpZmllcl0pO1xuICAgIGlmICghKHJlc3VsdC5fdmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHx8IHJlc3VsdC5fdmFsdWUgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgcmVzdWx0Ll92YWx1ZSA9IHt9O1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICByZXR1cm4ga2V5ID8gdGhpcy5fdmFsdWVba2V5XSA6IHRoaXMuX3ZhbHVlO1xufTtcbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5nZXRPcHRpb25zID0gT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLmdldDtcbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSkge1xuICAgIHZhciBvcmlnaW5hbFZhbHVlID0gdGhpcy5nZXQoa2V5KTtcbiAgICB0aGlzLl92YWx1ZVtrZXldID0gdmFsdWU7XG4gICAgaWYgKHRoaXMuZXZlbnRPdXRwdXQgJiYgdmFsdWUgIT09IG9yaWdpbmFsVmFsdWUpXG4gICAgICAgIHRoaXMuZXZlbnRPdXRwdXQuZW1pdCgnY2hhbmdlJywge1xuICAgICAgICAgICAgaWQ6IGtleSxcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbigpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5vbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKCkge1xuICAgIF9jcmVhdGVFdmVudE91dHB1dC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzLnJlbW92ZUxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiBwaXBlKCkge1xuICAgIF9jcmVhdGVFdmVudE91dHB1dC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzLnBpcGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUudW5waXBlID0gZnVuY3Rpb24gdW5waXBlKCkge1xuICAgIF9jcmVhdGVFdmVudE91dHB1dC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzLnVucGlwZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gT3B0aW9uc01hbmFnZXI7IiwidmFyIEVudGl0eSA9IHJlcXVpcmUoJy4vRW50aXR5Jyk7XG52YXIgU3BlY1BhcnNlciA9IHJlcXVpcmUoJy4vU3BlY1BhcnNlcicpO1xuZnVuY3Rpb24gUmVuZGVyTm9kZShvYmplY3QpIHtcbiAgICB0aGlzLl9vYmplY3QgPSBudWxsO1xuICAgIHRoaXMuX2NoaWxkID0gbnVsbDtcbiAgICB0aGlzLl9oYXNNdWx0aXBsZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5faXNSZW5kZXJhYmxlID0gZmFsc2U7XG4gICAgdGhpcy5faXNNb2RpZmllciA9IGZhbHNlO1xuICAgIHRoaXMuX3Jlc3VsdENhY2hlID0ge307XG4gICAgdGhpcy5fcHJldlJlc3VsdHMgPSB7fTtcbiAgICB0aGlzLl9jaGlsZFJlc3VsdCA9IG51bGw7XG4gICAgaWYgKG9iamVjdClcbiAgICAgICAgdGhpcy5zZXQob2JqZWN0KTtcbn1cblJlbmRlck5vZGUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZChjaGlsZCkge1xuICAgIHZhciBjaGlsZE5vZGUgPSBjaGlsZCBpbnN0YW5jZW9mIFJlbmRlck5vZGUgPyBjaGlsZCA6IG5ldyBSZW5kZXJOb2RlKGNoaWxkKTtcbiAgICBpZiAodGhpcy5fY2hpbGQgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgdGhpcy5fY2hpbGQucHVzaChjaGlsZE5vZGUpO1xuICAgIGVsc2UgaWYgKHRoaXMuX2NoaWxkKSB7XG4gICAgICAgIHRoaXMuX2NoaWxkID0gW1xuICAgICAgICAgICAgdGhpcy5fY2hpbGQsXG4gICAgICAgICAgICBjaGlsZE5vZGVcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5faGFzTXVsdGlwbGVDaGlsZHJlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuX2NoaWxkUmVzdWx0ID0gW107XG4gICAgfSBlbHNlXG4gICAgICAgIHRoaXMuX2NoaWxkID0gY2hpbGROb2RlO1xuICAgIHJldHVybiBjaGlsZE5vZGU7XG59O1xuUmVuZGVyTm9kZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiB0aGlzLl9vYmplY3QgfHwgKHRoaXMuX2hhc011bHRpcGxlQ2hpbGRyZW4gPyBudWxsIDogdGhpcy5fY2hpbGQgPyB0aGlzLl9jaGlsZC5nZXQoKSA6IG51bGwpO1xufTtcblJlbmRlck5vZGUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChjaGlsZCkge1xuICAgIHRoaXMuX2NoaWxkUmVzdWx0ID0gbnVsbDtcbiAgICB0aGlzLl9oYXNNdWx0aXBsZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5faXNSZW5kZXJhYmxlID0gY2hpbGQucmVuZGVyID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHRoaXMuX2lzTW9kaWZpZXIgPSBjaGlsZC5tb2RpZnkgPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy5fb2JqZWN0ID0gY2hpbGQ7XG4gICAgdGhpcy5fY2hpbGQgPSBudWxsO1xuICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIFJlbmRlck5vZGUpXG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiB0aGlzO1xufTtcblJlbmRlck5vZGUucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgIHZhciB0YXJnZXQgPSB0aGlzLmdldCgpO1xuICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0LmdldFNpemUpXG4gICAgICAgIHJlc3VsdCA9IHRhcmdldC5nZXRTaXplKCk7XG4gICAgaWYgKCFyZXN1bHQgJiYgdGhpcy5fY2hpbGQgJiYgdGhpcy5fY2hpbGQuZ2V0U2l6ZSlcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5fY2hpbGQuZ2V0U2l6ZSgpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuZnVuY3Rpb24gX2FwcGx5Q29tbWl0KHNwZWMsIGNvbnRleHQsIGNhY2hlU3RvcmFnZSkge1xuICAgIHZhciByZXN1bHQgPSBTcGVjUGFyc2VyLnBhcnNlKHNwZWMsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMocmVzdWx0KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGlkID0ga2V5c1tpXTtcbiAgICAgICAgdmFyIGNoaWxkTm9kZSA9IEVudGl0eS5nZXQoaWQpO1xuICAgICAgICB2YXIgY29tbWl0UGFyYW1zID0gcmVzdWx0W2lkXTtcbiAgICAgICAgY29tbWl0UGFyYW1zLmFsbG9jYXRvciA9IGNvbnRleHQuYWxsb2NhdG9yO1xuICAgICAgICB2YXIgY29tbWl0UmVzdWx0ID0gY2hpbGROb2RlLmNvbW1pdChjb21taXRQYXJhbXMpO1xuICAgICAgICBpZiAoY29tbWl0UmVzdWx0KVxuICAgICAgICAgICAgX2FwcGx5Q29tbWl0KGNvbW1pdFJlc3VsdCwgY29udGV4dCwgY2FjaGVTdG9yYWdlKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgY2FjaGVTdG9yYWdlW2lkXSA9IGNvbW1pdFBhcmFtcztcbiAgICB9XG59XG5SZW5kZXJOb2RlLnByb3RvdHlwZS5jb21taXQgPSBmdW5jdGlvbiBjb21taXQoY29udGV4dCkge1xuICAgIHZhciBwcmV2S2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX3ByZXZSZXN1bHRzKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByZXZLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBpZCA9IHByZXZLZXlzW2ldO1xuICAgICAgICBpZiAodGhpcy5fcmVzdWx0Q2FjaGVbaWRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSBFbnRpdHkuZ2V0KGlkKTtcbiAgICAgICAgICAgIGlmIChvYmplY3QuY2xlYW51cClcbiAgICAgICAgICAgICAgICBvYmplY3QuY2xlYW51cChjb250ZXh0LmFsbG9jYXRvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fcHJldlJlc3VsdHMgPSB0aGlzLl9yZXN1bHRDYWNoZTtcbiAgICB0aGlzLl9yZXN1bHRDYWNoZSA9IHt9O1xuICAgIF9hcHBseUNvbW1pdCh0aGlzLnJlbmRlcigpLCBjb250ZXh0LCB0aGlzLl9yZXN1bHRDYWNoZSk7XG59O1xuUmVuZGVyTm9kZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLl9pc1JlbmRlcmFibGUpXG4gICAgICAgIHJldHVybiB0aGlzLl9vYmplY3QucmVuZGVyKCk7XG4gICAgdmFyIHJlc3VsdCA9IG51bGw7XG4gICAgaWYgKHRoaXMuX2hhc011bHRpcGxlQ2hpbGRyZW4pIHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5fY2hpbGRSZXN1bHQ7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuX2NoaWxkO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHRbaV0gPSBjaGlsZHJlbltpXS5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5fY2hpbGQpXG4gICAgICAgIHJlc3VsdCA9IHRoaXMuX2NoaWxkLnJlbmRlcigpO1xuICAgIHJldHVybiB0aGlzLl9pc01vZGlmaWVyID8gdGhpcy5fb2JqZWN0Lm1vZGlmeShyZXN1bHQpIDogcmVzdWx0O1xufTtcbm1vZHVsZS5leHBvcnRzID0gUmVuZGVyTm9kZTsiLCJ2YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi9UcmFuc2Zvcm0nKTtcbmZ1bmN0aW9uIFNwZWNQYXJzZXIoKSB7XG4gICAgdGhpcy5yZXN1bHQgPSB7fTtcbn1cblNwZWNQYXJzZXIuX2luc3RhbmNlID0gbmV3IFNwZWNQYXJzZXIoKTtcblNwZWNQYXJzZXIucGFyc2UgPSBmdW5jdGlvbiBwYXJzZShzcGVjLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIFNwZWNQYXJzZXIuX2luc3RhbmNlLnBhcnNlKHNwZWMsIGNvbnRleHQpO1xufTtcblNwZWNQYXJzZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2Uoc3BlYywgY29udGV4dCkge1xuICAgIHRoaXMucmVzZXQoKTtcbiAgICB0aGlzLl9wYXJzZVNwZWMoc3BlYywgY29udGV4dCwgVHJhbnNmb3JtLmlkZW50aXR5KTtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XG59O1xuU3BlY1BhcnNlci5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiByZXNldCgpIHtcbiAgICB0aGlzLnJlc3VsdCA9IHt9O1xufTtcbmZ1bmN0aW9uIF92ZWNJbkNvbnRleHQodiwgbSkge1xuICAgIHJldHVybiBbXG4gICAgICAgIHZbMF0gKiBtWzBdICsgdlsxXSAqIG1bNF0gKyB2WzJdICogbVs4XSxcbiAgICAgICAgdlswXSAqIG1bMV0gKyB2WzFdICogbVs1XSArIHZbMl0gKiBtWzldLFxuICAgICAgICB2WzBdICogbVsyXSArIHZbMV0gKiBtWzZdICsgdlsyXSAqIG1bMTBdXG4gICAgXTtcbn1cbnZhciBfemVyb1plcm8gPSBbXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdO1xuU3BlY1BhcnNlci5wcm90b3R5cGUuX3BhcnNlU3BlYyA9IGZ1bmN0aW9uIF9wYXJzZVNwZWMoc3BlYywgcGFyZW50Q29udGV4dCwgc2l6ZUNvbnRleHQpIHtcbiAgICB2YXIgaWQ7XG4gICAgdmFyIHRhcmdldDtcbiAgICB2YXIgdHJhbnNmb3JtO1xuICAgIHZhciBvcGFjaXR5O1xuICAgIHZhciBvcmlnaW47XG4gICAgdmFyIGFsaWduO1xuICAgIHZhciBzaXplO1xuICAgIGlmICh0eXBlb2Ygc3BlYyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgaWQgPSBzcGVjO1xuICAgICAgICB0cmFuc2Zvcm0gPSBwYXJlbnRDb250ZXh0LnRyYW5zZm9ybTtcbiAgICAgICAgYWxpZ24gPSBwYXJlbnRDb250ZXh0LmFsaWduIHx8IF96ZXJvWmVybztcbiAgICAgICAgaWYgKHBhcmVudENvbnRleHQuc2l6ZSAmJiBhbGlnbiAmJiAoYWxpZ25bMF0gfHwgYWxpZ25bMV0pKSB7XG4gICAgICAgICAgICB2YXIgYWxpZ25BZGp1c3QgPSBbXG4gICAgICAgICAgICAgICAgICAgIGFsaWduWzBdICogcGFyZW50Q29udGV4dC5zaXplWzBdLFxuICAgICAgICAgICAgICAgICAgICBhbGlnblsxXSAqIHBhcmVudENvbnRleHQuc2l6ZVsxXSxcbiAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB0cmFuc2Zvcm0gPSBUcmFuc2Zvcm0udGhlbk1vdmUodHJhbnNmb3JtLCBfdmVjSW5Db250ZXh0KGFsaWduQWRqdXN0LCBzaXplQ29udGV4dCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzdWx0W2lkXSA9IHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNmb3JtLFxuICAgICAgICAgICAgb3BhY2l0eTogcGFyZW50Q29udGV4dC5vcGFjaXR5LFxuICAgICAgICAgICAgb3JpZ2luOiBwYXJlbnRDb250ZXh0Lm9yaWdpbiB8fCBfemVyb1plcm8sXG4gICAgICAgICAgICBhbGlnbjogcGFyZW50Q29udGV4dC5hbGlnbiB8fCBfemVyb1plcm8sXG4gICAgICAgICAgICBzaXplOiBwYXJlbnRDb250ZXh0LnNpemVcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKCFzcGVjKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHNwZWMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNwZWMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcnNlU3BlYyhzcGVjW2ldLCBwYXJlbnRDb250ZXh0LCBzaXplQ29udGV4dCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXQgPSBzcGVjLnRhcmdldDtcbiAgICAgICAgdHJhbnNmb3JtID0gcGFyZW50Q29udGV4dC50cmFuc2Zvcm07XG4gICAgICAgIG9wYWNpdHkgPSBwYXJlbnRDb250ZXh0Lm9wYWNpdHk7XG4gICAgICAgIG9yaWdpbiA9IHBhcmVudENvbnRleHQub3JpZ2luO1xuICAgICAgICBhbGlnbiA9IHBhcmVudENvbnRleHQuYWxpZ247XG4gICAgICAgIHNpemUgPSBwYXJlbnRDb250ZXh0LnNpemU7XG4gICAgICAgIHZhciBuZXh0U2l6ZUNvbnRleHQgPSBzaXplQ29udGV4dDtcbiAgICAgICAgaWYgKHNwZWMub3BhY2l0eSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgb3BhY2l0eSA9IHBhcmVudENvbnRleHQub3BhY2l0eSAqIHNwZWMub3BhY2l0eTtcbiAgICAgICAgaWYgKHNwZWMudHJhbnNmb3JtKVxuICAgICAgICAgICAgdHJhbnNmb3JtID0gVHJhbnNmb3JtLm11bHRpcGx5KHBhcmVudENvbnRleHQudHJhbnNmb3JtLCBzcGVjLnRyYW5zZm9ybSk7XG4gICAgICAgIGlmIChzcGVjLm9yaWdpbikge1xuICAgICAgICAgICAgb3JpZ2luID0gc3BlYy5vcmlnaW47XG4gICAgICAgICAgICBuZXh0U2l6ZUNvbnRleHQgPSBwYXJlbnRDb250ZXh0LnRyYW5zZm9ybTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3BlYy5hbGlnbilcbiAgICAgICAgICAgIGFsaWduID0gc3BlYy5hbGlnbjtcbiAgICAgICAgaWYgKHNwZWMuc2l6ZSB8fCBzcGVjLnByb3BvcnRpb25zKSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50U2l6ZSA9IHNpemU7XG4gICAgICAgICAgICBzaXplID0gW1xuICAgICAgICAgICAgICAgIHNpemVbMF0sXG4gICAgICAgICAgICAgICAgc2l6ZVsxXVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGlmIChzcGVjLnNpemUpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3BlYy5zaXplWzBdICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgIHNpemVbMF0gPSBzcGVjLnNpemVbMF07XG4gICAgICAgICAgICAgICAgaWYgKHNwZWMuc2l6ZVsxXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICBzaXplWzFdID0gc3BlYy5zaXplWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNwZWMucHJvcG9ydGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3BlYy5wcm9wb3J0aW9uc1swXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICBzaXplWzBdID0gc2l6ZVswXSAqIHNwZWMucHJvcG9ydGlvbnNbMF07XG4gICAgICAgICAgICAgICAgaWYgKHNwZWMucHJvcG9ydGlvbnNbMV0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgc2l6ZVsxXSA9IHNpemVbMV0gKiBzcGVjLnByb3BvcnRpb25zWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcmVudFNpemUpIHtcbiAgICAgICAgICAgICAgICBpZiAoYWxpZ24gJiYgKGFsaWduWzBdIHx8IGFsaWduWzFdKSlcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtID0gVHJhbnNmb3JtLnRoZW5Nb3ZlKHRyYW5zZm9ybSwgX3ZlY0luQ29udGV4dChbXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnblswXSAqIHBhcmVudFNpemVbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnblsxXSAqIHBhcmVudFNpemVbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgICAgIF0sIHNpemVDb250ZXh0KSk7XG4gICAgICAgICAgICAgICAgaWYgKG9yaWdpbiAmJiAob3JpZ2luWzBdIHx8IG9yaWdpblsxXSkpXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybSA9IFRyYW5zZm9ybS5tb3ZlVGhlbihbXG4gICAgICAgICAgICAgICAgICAgICAgICAtb3JpZ2luWzBdICogc2l6ZVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC1vcmlnaW5bMV0gKiBzaXplWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgICAgICBdLCB0cmFuc2Zvcm0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV4dFNpemVDb250ZXh0ID0gcGFyZW50Q29udGV4dC50cmFuc2Zvcm07XG4gICAgICAgICAgICBvcmlnaW4gPSBudWxsO1xuICAgICAgICAgICAgYWxpZ24gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3BhcnNlU3BlYyh0YXJnZXQsIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNmb3JtLFxuICAgICAgICAgICAgb3BhY2l0eTogb3BhY2l0eSxcbiAgICAgICAgICAgIG9yaWdpbjogb3JpZ2luLFxuICAgICAgICAgICAgYWxpZ246IGFsaWduLFxuICAgICAgICAgICAgc2l6ZTogc2l6ZVxuICAgICAgICB9LCBuZXh0U2l6ZUNvbnRleHQpO1xuICAgIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IFNwZWNQYXJzZXI7IiwidmFyIEVsZW1lbnRPdXRwdXQgPSByZXF1aXJlKCcuL0VsZW1lbnRPdXRwdXQnKTtcbmZ1bmN0aW9uIFN1cmZhY2Uob3B0aW9ucykge1xuICAgIEVsZW1lbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICB0aGlzLm9wdGlvbnMgPSB7fTtcbiAgICB0aGlzLnByb3BlcnRpZXMgPSB7fTtcbiAgICB0aGlzLmF0dHJpYnV0ZXMgPSB7fTtcbiAgICB0aGlzLmNvbnRlbnQgPSAnJztcbiAgICB0aGlzLmNsYXNzTGlzdCA9IFtdO1xuICAgIHRoaXMuc2l6ZSA9IG51bGw7XG4gICAgdGhpcy5fY2xhc3Nlc0RpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl9zdHlsZXNEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fYXR0cmlidXRlc0RpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl9zaXplRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX2NvbnRlbnREaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fdHJ1ZVNpemVDaGVjayA9IHRydWU7XG4gICAgdGhpcy5fZGlydHlDbGFzc2VzID0gW107XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLl9jdXJyZW50VGFyZ2V0ID0gbnVsbDtcbn1cblN1cmZhY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFbGVtZW50T3V0cHV0LnByb3RvdHlwZSk7XG5TdXJmYWNlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFN1cmZhY2U7XG5TdXJmYWNlLnByb3RvdHlwZS5lbGVtZW50VHlwZSA9ICdkaXYnO1xuU3VyZmFjZS5wcm90b3R5cGUuZWxlbWVudENsYXNzID0gJ2ZhbW91cy1zdXJmYWNlJztcblN1cmZhY2UucHJvdG90eXBlLnNldEF0dHJpYnV0ZXMgPSBmdW5jdGlvbiBzZXRBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpIHtcbiAgICBmb3IgKHZhciBuIGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgaWYgKG4gPT09ICdzdHlsZScpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBzZXQgc3R5bGVzIHZpYSBcInNldEF0dHJpYnV0ZXNcIiBhcyBpdCB3aWxsIGJyZWFrIEZhbW8udXMuICBVc2UgXCJzZXRQcm9wZXJ0aWVzXCIgaW5zdGVhZC4nKTtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzW25dID0gYXR0cmlidXRlc1tuXTtcbiAgICB9XG4gICAgdGhpcy5fYXR0cmlidXRlc0RpcnR5ID0gdHJ1ZTtcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5nZXRBdHRyaWJ1dGVzID0gZnVuY3Rpb24gZ2V0QXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGVzO1xufTtcblN1cmZhY2UucHJvdG90eXBlLnNldFByb3BlcnRpZXMgPSBmdW5jdGlvbiBzZXRQcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBmb3IgKHZhciBuIGluIHByb3BlcnRpZXMpIHtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzW25dID0gcHJvcGVydGllc1tuXTtcbiAgICB9XG4gICAgdGhpcy5fc3R5bGVzRGlydHkgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xufTtcblN1cmZhY2UucHJvdG90eXBlLmdldFByb3BlcnRpZXMgPSBmdW5jdGlvbiBnZXRQcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BlcnRpZXM7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuYWRkQ2xhc3MgPSBmdW5jdGlvbiBhZGRDbGFzcyhjbGFzc05hbWUpIHtcbiAgICBpZiAodGhpcy5jbGFzc0xpc3QuaW5kZXhPZihjbGFzc05hbWUpIDwgMCkge1xuICAgICAgICB0aGlzLmNsYXNzTGlzdC5wdXNoKGNsYXNzTmFtZSk7XG4gICAgICAgIHRoaXMuX2NsYXNzZXNEaXJ0eSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblN1cmZhY2UucHJvdG90eXBlLnJlbW92ZUNsYXNzID0gZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgdmFyIGkgPSB0aGlzLmNsYXNzTGlzdC5pbmRleE9mKGNsYXNzTmFtZSk7XG4gICAgaWYgKGkgPj0gMCkge1xuICAgICAgICB0aGlzLl9kaXJ0eUNsYXNzZXMucHVzaCh0aGlzLmNsYXNzTGlzdC5zcGxpY2UoaSwgMSlbMF0pO1xuICAgICAgICB0aGlzLl9jbGFzc2VzRGlydHkgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5TdXJmYWNlLnByb3RvdHlwZS50b2dnbGVDbGFzcyA9IGZ1bmN0aW9uIHRvZ2dsZUNsYXNzKGNsYXNzTmFtZSkge1xuICAgIHZhciBpID0gdGhpcy5jbGFzc0xpc3QuaW5kZXhPZihjbGFzc05hbWUpO1xuICAgIGlmIChpID49IDApIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhjbGFzc05hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoY2xhc3NOYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuc2V0Q2xhc3NlcyA9IGZ1bmN0aW9uIHNldENsYXNzZXMoY2xhc3NMaXN0KSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciByZW1vdmFsID0gW107XG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMuY2xhc3NMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChjbGFzc0xpc3QuaW5kZXhPZih0aGlzLmNsYXNzTGlzdFtpXSkgPCAwKVxuICAgICAgICAgICAgcmVtb3ZhbC5wdXNoKHRoaXMuY2xhc3NMaXN0W2ldKTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IHJlbW92YWwubGVuZ3RoOyBpKyspXG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MocmVtb3ZhbFtpXSk7XG4gICAgZm9yIChpID0gMDsgaSA8IGNsYXNzTGlzdC5sZW5ndGg7IGkrKylcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhjbGFzc0xpc3RbaV0pO1xuICAgIHJldHVybiB0aGlzO1xufTtcblN1cmZhY2UucHJvdG90eXBlLmdldENsYXNzTGlzdCA9IGZ1bmN0aW9uIGdldENsYXNzTGlzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5jbGFzc0xpc3Q7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uIHNldENvbnRlbnQoY29udGVudCkge1xuICAgIGlmICh0aGlzLmNvbnRlbnQgIT09IGNvbnRlbnQpIHtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgICAgICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuZ2V0Q29udGVudCA9IGZ1bmN0aW9uIGdldENvbnRlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudDtcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuc2l6ZSlcbiAgICAgICAgdGhpcy5zZXRTaXplKG9wdGlvbnMuc2l6ZSk7XG4gICAgaWYgKG9wdGlvbnMuY2xhc3NlcylcbiAgICAgICAgdGhpcy5zZXRDbGFzc2VzKG9wdGlvbnMuY2xhc3Nlcyk7XG4gICAgaWYgKG9wdGlvbnMucHJvcGVydGllcylcbiAgICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKG9wdGlvbnMucHJvcGVydGllcyk7XG4gICAgaWYgKG9wdGlvbnMuYXR0cmlidXRlcylcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGVzKG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gICAgaWYgKG9wdGlvbnMuY29udGVudClcbiAgICAgICAgdGhpcy5zZXRDb250ZW50KG9wdGlvbnMuY29udGVudCk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuZnVuY3Rpb24gX2NsZWFudXBDbGFzc2VzKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZGlydHlDbGFzc2VzLmxlbmd0aDsgaSsrKVxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9kaXJ0eUNsYXNzZXNbaV0pO1xuICAgIHRoaXMuX2RpcnR5Q2xhc3NlcyA9IFtdO1xufVxuZnVuY3Rpb24gX2FwcGx5U3R5bGVzKHRhcmdldCkge1xuICAgIGZvciAodmFyIG4gaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XG4gICAgICAgIHRhcmdldC5zdHlsZVtuXSA9IHRoaXMucHJvcGVydGllc1tuXTtcbiAgICB9XG59XG5mdW5jdGlvbiBfY2xlYW51cFN0eWxlcyh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBuIGluIHRoaXMucHJvcGVydGllcykge1xuICAgICAgICB0YXJnZXQuc3R5bGVbbl0gPSAnJztcbiAgICB9XG59XG5mdW5jdGlvbiBfYXBwbHlBdHRyaWJ1dGVzKHRhcmdldCkge1xuICAgIGZvciAodmFyIG4gaW4gdGhpcy5hdHRyaWJ1dGVzKSB7XG4gICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUobiwgdGhpcy5hdHRyaWJ1dGVzW25dKTtcbiAgICB9XG59XG5mdW5jdGlvbiBfY2xlYW51cEF0dHJpYnV0ZXModGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgbiBpbiB0aGlzLmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShuKTtcbiAgICB9XG59XG5mdW5jdGlvbiBfeHlOb3RFcXVhbHMoYSwgYikge1xuICAgIHJldHVybiBhICYmIGIgPyBhWzBdICE9PSBiWzBdIHx8IGFbMV0gIT09IGJbMV0gOiBhICE9PSBiO1xufVxuU3VyZmFjZS5wcm90b3R5cGUuc2V0dXAgPSBmdW5jdGlvbiBzZXR1cChhbGxvY2F0b3IpIHtcbiAgICB2YXIgdGFyZ2V0ID0gYWxsb2NhdG9yLmFsbG9jYXRlKHRoaXMuZWxlbWVudFR5cGUpO1xuICAgIGlmICh0aGlzLmVsZW1lbnRDbGFzcykge1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50Q2xhc3MgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVsZW1lbnRDbGFzcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKHRoaXMuZWxlbWVudENsYXNzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKHRoaXMuZWxlbWVudENsYXNzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0YXJnZXQuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgIHRoaXMuYXR0YWNoKHRhcmdldCk7XG4gICAgdGhpcy5fb3BhY2l0eSA9IG51bGw7XG4gICAgdGhpcy5fY3VycmVudFRhcmdldCA9IHRhcmdldDtcbiAgICB0aGlzLl9zdHlsZXNEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fY2xhc3Nlc0RpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl9hdHRyaWJ1dGVzRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX3NpemVEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl9vcmlnaW5EaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fdHJhbnNmb3JtRGlydHkgPSB0cnVlO1xufTtcblN1cmZhY2UucHJvdG90eXBlLmNvbW1pdCA9IGZ1bmN0aW9uIGNvbW1pdChjb250ZXh0KSB7XG4gICAgaWYgKCF0aGlzLl9jdXJyZW50VGFyZ2V0KVxuICAgICAgICB0aGlzLnNldHVwKGNvbnRleHQuYWxsb2NhdG9yKTtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5fY3VycmVudFRhcmdldDtcbiAgICB2YXIgc2l6ZSA9IGNvbnRleHQuc2l6ZTtcbiAgICBpZiAodGhpcy5fY2xhc3Nlc0RpcnR5KSB7XG4gICAgICAgIF9jbGVhbnVwQ2xhc3Nlcy5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgICAgIHZhciBjbGFzc0xpc3QgPSB0aGlzLmdldENsYXNzTGlzdCgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzTGlzdC5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKGNsYXNzTGlzdFtpXSk7XG4gICAgICAgIHRoaXMuX2NsYXNzZXNEaXJ0eSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl90cnVlU2l6ZUNoZWNrID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3N0eWxlc0RpcnR5KSB7XG4gICAgICAgIF9hcHBseVN0eWxlcy5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgICAgIHRoaXMuX3N0eWxlc0RpcnR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3RydWVTaXplQ2hlY2sgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5fYXR0cmlidXRlc0RpcnR5KSB7XG4gICAgICAgIF9hcHBseUF0dHJpYnV0ZXMuY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVzRGlydHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fdHJ1ZVNpemVDaGVjayA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLnNpemUpIHtcbiAgICAgICAgdmFyIG9yaWdTaXplID0gY29udGV4dC5zaXplO1xuICAgICAgICBzaXplID0gW1xuICAgICAgICAgICAgdGhpcy5zaXplWzBdLFxuICAgICAgICAgICAgdGhpcy5zaXplWzFdXG4gICAgICAgIF07XG4gICAgICAgIGlmIChzaXplWzBdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzaXplWzBdID0gb3JpZ1NpemVbMF07XG4gICAgICAgIGlmIChzaXplWzFdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzaXplWzFdID0gb3JpZ1NpemVbMV07XG4gICAgICAgIGlmIChzaXplWzBdID09PSB0cnVlIHx8IHNpemVbMV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmIChzaXplWzBdID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RydWVTaXplQ2hlY2sgfHwgdGhpcy5fc2l6ZVswXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgd2lkdGggPSB0YXJnZXQub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zaXplICYmIHRoaXMuX3NpemVbMF0gIT09IHdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaXplWzBdID0gd2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaXplRGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNpemVbMF0gPSB3aWR0aDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2l6ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemVbMF0gPSB0aGlzLl9zaXplWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzaXplWzFdID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RydWVTaXplQ2hlY2sgfHwgdGhpcy5fc2l6ZVsxXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ID0gdGFyZ2V0Lm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NpemUgJiYgdGhpcy5fc2l6ZVsxXSAhPT0gaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaXplWzFdID0gaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2l6ZURpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzaXplWzFdID0gaGVpZ2h0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zaXplKVxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZVsxXSA9IHRoaXMuX3NpemVbMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdHJ1ZVNpemVDaGVjayA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChfeHlOb3RFcXVhbHModGhpcy5fc2l6ZSwgc2l6ZSkpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9zaXplKVxuICAgICAgICAgICAgdGhpcy5fc2l6ZSA9IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF07XG4gICAgICAgIHRoaXMuX3NpemVbMF0gPSBzaXplWzBdO1xuICAgICAgICB0aGlzLl9zaXplWzFdID0gc2l6ZVsxXTtcbiAgICAgICAgdGhpcy5fc2l6ZURpcnR5ID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3NpemVEaXJ0eSkge1xuICAgICAgICBpZiAodGhpcy5fc2l6ZSkge1xuICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLndpZHRoID0gdGhpcy5zaXplICYmIHRoaXMuc2l6ZVswXSA9PT0gdHJ1ZSA/ICcnIDogdGhpcy5fc2l6ZVswXSArICdweCc7XG4gICAgICAgICAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gdGhpcy5zaXplICYmIHRoaXMuc2l6ZVsxXSA9PT0gdHJ1ZSA/ICcnIDogdGhpcy5fc2l6ZVsxXSArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgncmVzaXplJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9jb250ZW50RGlydHkpIHtcbiAgICAgICAgdGhpcy5kZXBsb3kodGFyZ2V0KTtcbiAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnZGVwbG95Jyk7XG4gICAgICAgIHRoaXMuX2NvbnRlbnREaXJ0eSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl90cnVlU2l6ZUNoZWNrID0gdHJ1ZTtcbiAgICB9XG4gICAgRWxlbWVudE91dHB1dC5wcm90b3R5cGUuY29tbWl0LmNhbGwodGhpcywgY29udGV4dCk7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuY2xlYW51cCA9IGZ1bmN0aW9uIGNsZWFudXAoYWxsb2NhdG9yKSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciB0YXJnZXQgPSB0aGlzLl9jdXJyZW50VGFyZ2V0O1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3JlY2FsbCcpO1xuICAgIHRoaXMucmVjYWxsKHRhcmdldCk7XG4gICAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgdGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAnJztcbiAgICB0YXJnZXQuc3R5bGUud2lkdGggPSAnJztcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gJyc7XG4gICAgX2NsZWFudXBTdHlsZXMuY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgIF9jbGVhbnVwQXR0cmlidXRlcy5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgdmFyIGNsYXNzTGlzdCA9IHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XG4gICAgX2NsZWFudXBDbGFzc2VzLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgY2xhc3NMaXN0Lmxlbmd0aDsgaSsrKVxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc0xpc3RbaV0pO1xuICAgIGlmICh0aGlzLmVsZW1lbnRDbGFzcykge1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50Q2xhc3MgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuZWxlbWVudENsYXNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5lbGVtZW50Q2xhc3NbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5lbGVtZW50Q2xhc3MpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuZGV0YWNoKHRhcmdldCk7XG4gICAgdGhpcy5fY3VycmVudFRhcmdldCA9IG51bGw7XG4gICAgYWxsb2NhdG9yLmRlYWxsb2NhdGUodGFyZ2V0KTtcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5kZXBsb3kgPSBmdW5jdGlvbiBkZXBsb3kodGFyZ2V0KSB7XG4gICAgdmFyIGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKTtcbiAgICBpZiAoY29udGVudCBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICAgICAgd2hpbGUgKHRhcmdldC5oYXNDaGlsZE5vZGVzKCkpXG4gICAgICAgICAgICB0YXJnZXQucmVtb3ZlQ2hpbGQodGFyZ2V0LmZpcnN0Q2hpbGQpO1xuICAgICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgfSBlbHNlXG4gICAgICAgIHRhcmdldC5pbm5lckhUTUwgPSBjb250ZW50O1xufTtcblN1cmZhY2UucHJvdG90eXBlLnJlY2FsbCA9IGZ1bmN0aW9uIHJlY2FsbCh0YXJnZXQpIHtcbiAgICB2YXIgZGYgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgd2hpbGUgKHRhcmdldC5oYXNDaGlsZE5vZGVzKCkpXG4gICAgICAgIGRmLmFwcGVuZENoaWxkKHRhcmdldC5maXJzdENoaWxkKTtcbiAgICB0aGlzLnNldENvbnRlbnQoZGYpO1xufTtcblN1cmZhY2UucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9zaXplID8gdGhpcy5fc2l6ZSA6IHRoaXMuc2l6ZTtcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24gc2V0U2l6ZShzaXplKSB7XG4gICAgdGhpcy5zaXplID0gc2l6ZSA/IFtcbiAgICAgICAgc2l6ZVswXSxcbiAgICAgICAgc2l6ZVsxXVxuICAgIF0gOiBudWxsO1xuICAgIHRoaXMuX3NpemVEaXJ0eSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTdXJmYWNlOyIsInZhciBUcmFuc2Zvcm0gPSB7fTtcblRyYW5zZm9ybS5wcmVjaXNpb24gPSAwLjAwMDAwMTtcblRyYW5zZm9ybS5pZGVudGl0eSA9IFtcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxXG5dO1xuVHJhbnNmb3JtLm11bHRpcGx5NHg0ID0gZnVuY3Rpb24gbXVsdGlwbHk0eDQoYSwgYikge1xuICAgIHJldHVybiBbXG4gICAgICAgIGFbMF0gKiBiWzBdICsgYVs0XSAqIGJbMV0gKyBhWzhdICogYlsyXSArIGFbMTJdICogYlszXSxcbiAgICAgICAgYVsxXSAqIGJbMF0gKyBhWzVdICogYlsxXSArIGFbOV0gKiBiWzJdICsgYVsxM10gKiBiWzNdLFxuICAgICAgICBhWzJdICogYlswXSArIGFbNl0gKiBiWzFdICsgYVsxMF0gKiBiWzJdICsgYVsxNF0gKiBiWzNdLFxuICAgICAgICBhWzNdICogYlswXSArIGFbN10gKiBiWzFdICsgYVsxMV0gKiBiWzJdICsgYVsxNV0gKiBiWzNdLFxuICAgICAgICBhWzBdICogYls0XSArIGFbNF0gKiBiWzVdICsgYVs4XSAqIGJbNl0gKyBhWzEyXSAqIGJbN10sXG4gICAgICAgIGFbMV0gKiBiWzRdICsgYVs1XSAqIGJbNV0gKyBhWzldICogYls2XSArIGFbMTNdICogYls3XSxcbiAgICAgICAgYVsyXSAqIGJbNF0gKyBhWzZdICogYls1XSArIGFbMTBdICogYls2XSArIGFbMTRdICogYls3XSxcbiAgICAgICAgYVszXSAqIGJbNF0gKyBhWzddICogYls1XSArIGFbMTFdICogYls2XSArIGFbMTVdICogYls3XSxcbiAgICAgICAgYVswXSAqIGJbOF0gKyBhWzRdICogYls5XSArIGFbOF0gKiBiWzEwXSArIGFbMTJdICogYlsxMV0sXG4gICAgICAgIGFbMV0gKiBiWzhdICsgYVs1XSAqIGJbOV0gKyBhWzldICogYlsxMF0gKyBhWzEzXSAqIGJbMTFdLFxuICAgICAgICBhWzJdICogYls4XSArIGFbNl0gKiBiWzldICsgYVsxMF0gKiBiWzEwXSArIGFbMTRdICogYlsxMV0sXG4gICAgICAgIGFbM10gKiBiWzhdICsgYVs3XSAqIGJbOV0gKyBhWzExXSAqIGJbMTBdICsgYVsxNV0gKiBiWzExXSxcbiAgICAgICAgYVswXSAqIGJbMTJdICsgYVs0XSAqIGJbMTNdICsgYVs4XSAqIGJbMTRdICsgYVsxMl0gKiBiWzE1XSxcbiAgICAgICAgYVsxXSAqIGJbMTJdICsgYVs1XSAqIGJbMTNdICsgYVs5XSAqIGJbMTRdICsgYVsxM10gKiBiWzE1XSxcbiAgICAgICAgYVsyXSAqIGJbMTJdICsgYVs2XSAqIGJbMTNdICsgYVsxMF0gKiBiWzE0XSArIGFbMTRdICogYlsxNV0sXG4gICAgICAgIGFbM10gKiBiWzEyXSArIGFbN10gKiBiWzEzXSArIGFbMTFdICogYlsxNF0gKyBhWzE1XSAqIGJbMTVdXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0ubXVsdGlwbHkgPSBmdW5jdGlvbiBtdWx0aXBseShhLCBiKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgYVswXSAqIGJbMF0gKyBhWzRdICogYlsxXSArIGFbOF0gKiBiWzJdLFxuICAgICAgICBhWzFdICogYlswXSArIGFbNV0gKiBiWzFdICsgYVs5XSAqIGJbMl0sXG4gICAgICAgIGFbMl0gKiBiWzBdICsgYVs2XSAqIGJbMV0gKyBhWzEwXSAqIGJbMl0sXG4gICAgICAgIDAsXG4gICAgICAgIGFbMF0gKiBiWzRdICsgYVs0XSAqIGJbNV0gKyBhWzhdICogYls2XSxcbiAgICAgICAgYVsxXSAqIGJbNF0gKyBhWzVdICogYls1XSArIGFbOV0gKiBiWzZdLFxuICAgICAgICBhWzJdICogYls0XSArIGFbNl0gKiBiWzVdICsgYVsxMF0gKiBiWzZdLFxuICAgICAgICAwLFxuICAgICAgICBhWzBdICogYls4XSArIGFbNF0gKiBiWzldICsgYVs4XSAqIGJbMTBdLFxuICAgICAgICBhWzFdICogYls4XSArIGFbNV0gKiBiWzldICsgYVs5XSAqIGJbMTBdLFxuICAgICAgICBhWzJdICogYls4XSArIGFbNl0gKiBiWzldICsgYVsxMF0gKiBiWzEwXSxcbiAgICAgICAgMCxcbiAgICAgICAgYVswXSAqIGJbMTJdICsgYVs0XSAqIGJbMTNdICsgYVs4XSAqIGJbMTRdICsgYVsxMl0sXG4gICAgICAgIGFbMV0gKiBiWzEyXSArIGFbNV0gKiBiWzEzXSArIGFbOV0gKiBiWzE0XSArIGFbMTNdLFxuICAgICAgICBhWzJdICogYlsxMl0gKyBhWzZdICogYlsxM10gKyBhWzEwXSAqIGJbMTRdICsgYVsxNF0sXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS50aGVuTW92ZSA9IGZ1bmN0aW9uIHRoZW5Nb3ZlKG0sIHQpIHtcbiAgICBpZiAoIXRbMl0pXG4gICAgICAgIHRbMl0gPSAwO1xuICAgIHJldHVybiBbXG4gICAgICAgIG1bMF0sXG4gICAgICAgIG1bMV0sXG4gICAgICAgIG1bMl0sXG4gICAgICAgIDAsXG4gICAgICAgIG1bNF0sXG4gICAgICAgIG1bNV0sXG4gICAgICAgIG1bNl0sXG4gICAgICAgIDAsXG4gICAgICAgIG1bOF0sXG4gICAgICAgIG1bOV0sXG4gICAgICAgIG1bMTBdLFxuICAgICAgICAwLFxuICAgICAgICBtWzEyXSArIHRbMF0sXG4gICAgICAgIG1bMTNdICsgdFsxXSxcbiAgICAgICAgbVsxNF0gKyB0WzJdLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0ubW92ZVRoZW4gPSBmdW5jdGlvbiBtb3ZlVGhlbih2LCBtKSB7XG4gICAgaWYgKCF2WzJdKVxuICAgICAgICB2WzJdID0gMDtcbiAgICB2YXIgdDAgPSB2WzBdICogbVswXSArIHZbMV0gKiBtWzRdICsgdlsyXSAqIG1bOF07XG4gICAgdmFyIHQxID0gdlswXSAqIG1bMV0gKyB2WzFdICogbVs1XSArIHZbMl0gKiBtWzldO1xuICAgIHZhciB0MiA9IHZbMF0gKiBtWzJdICsgdlsxXSAqIG1bNl0gKyB2WzJdICogbVsxMF07XG4gICAgcmV0dXJuIFRyYW5zZm9ybS50aGVuTW92ZShtLCBbXG4gICAgICAgIHQwLFxuICAgICAgICB0MSxcbiAgICAgICAgdDJcbiAgICBdKTtcbn07XG5UcmFuc2Zvcm0udHJhbnNsYXRlID0gZnVuY3Rpb24gdHJhbnNsYXRlKHgsIHksIHopIHtcbiAgICBpZiAoeiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB6ID0gMDtcbiAgICByZXR1cm4gW1xuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICB6LFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0udGhlblNjYWxlID0gZnVuY3Rpb24gdGhlblNjYWxlKG0sIHMpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBzWzBdICogbVswXSxcbiAgICAgICAgc1sxXSAqIG1bMV0sXG4gICAgICAgIHNbMl0gKiBtWzJdLFxuICAgICAgICAwLFxuICAgICAgICBzWzBdICogbVs0XSxcbiAgICAgICAgc1sxXSAqIG1bNV0sXG4gICAgICAgIHNbMl0gKiBtWzZdLFxuICAgICAgICAwLFxuICAgICAgICBzWzBdICogbVs4XSxcbiAgICAgICAgc1sxXSAqIG1bOV0sXG4gICAgICAgIHNbMl0gKiBtWzEwXSxcbiAgICAgICAgMCxcbiAgICAgICAgc1swXSAqIG1bMTJdLFxuICAgICAgICBzWzFdICogbVsxM10sXG4gICAgICAgIHNbMl0gKiBtWzE0XSxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnNjYWxlID0gZnVuY3Rpb24gc2NhbGUoeCwgeSwgeikge1xuICAgIGlmICh6ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHogPSAxO1xuICAgIGlmICh5ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHkgPSB4O1xuICAgIHJldHVybiBbXG4gICAgICAgIHgsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIHksXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIHosXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5yb3RhdGVYID0gZnVuY3Rpb24gcm90YXRlWCh0aGV0YSkge1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgY29zVGhldGEsXG4gICAgICAgIHNpblRoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAtc2luVGhldGEsXG4gICAgICAgIGNvc1RoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0ucm90YXRlWSA9IGZ1bmN0aW9uIHJvdGF0ZVkodGhldGEpIHtcbiAgICB2YXIgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHJldHVybiBbXG4gICAgICAgIGNvc1RoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAtc2luVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIHNpblRoZXRhLFxuICAgICAgICAwLFxuICAgICAgICBjb3NUaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnJvdGF0ZVogPSBmdW5jdGlvbiByb3RhdGVaKHRoZXRhKSB7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICByZXR1cm4gW1xuICAgICAgICBjb3NUaGV0YSxcbiAgICAgICAgc2luVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIC1zaW5UaGV0YSxcbiAgICAgICAgY29zVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5yb3RhdGUgPSBmdW5jdGlvbiByb3RhdGUocGhpLCB0aGV0YSwgcHNpKSB7XG4gICAgdmFyIGNvc1BoaSA9IE1hdGguY29zKHBoaSk7XG4gICAgdmFyIHNpblBoaSA9IE1hdGguc2luKHBoaSk7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICB2YXIgY29zUHNpID0gTWF0aC5jb3MocHNpKTtcbiAgICB2YXIgc2luUHNpID0gTWF0aC5zaW4ocHNpKTtcbiAgICB2YXIgcmVzdWx0ID0gW1xuICAgICAgICAgICAgY29zVGhldGEgKiBjb3NQc2ksXG4gICAgICAgICAgICBjb3NQaGkgKiBzaW5Qc2kgKyBzaW5QaGkgKiBzaW5UaGV0YSAqIGNvc1BzaSxcbiAgICAgICAgICAgIHNpblBoaSAqIHNpblBzaSAtIGNvc1BoaSAqIHNpblRoZXRhICogY29zUHNpLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIC1jb3NUaGV0YSAqIHNpblBzaSxcbiAgICAgICAgICAgIGNvc1BoaSAqIGNvc1BzaSAtIHNpblBoaSAqIHNpblRoZXRhICogc2luUHNpLFxuICAgICAgICAgICAgc2luUGhpICogY29zUHNpICsgY29zUGhpICogc2luVGhldGEgKiBzaW5Qc2ksXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgc2luVGhldGEsXG4gICAgICAgICAgICAtc2luUGhpICogY29zVGhldGEsXG4gICAgICAgICAgICBjb3NQaGkgKiBjb3NUaGV0YSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAxXG4gICAgICAgIF07XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5UcmFuc2Zvcm0ucm90YXRlQXhpcyA9IGZ1bmN0aW9uIHJvdGF0ZUF4aXModiwgdGhldGEpIHtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciB2ZXJUaGV0YSA9IDEgLSBjb3NUaGV0YTtcbiAgICB2YXIgeHhWID0gdlswXSAqIHZbMF0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgeHlWID0gdlswXSAqIHZbMV0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgeHpWID0gdlswXSAqIHZbMl0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgeXlWID0gdlsxXSAqIHZbMV0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgeXpWID0gdlsxXSAqIHZbMl0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgenpWID0gdlsyXSAqIHZbMl0gKiB2ZXJUaGV0YTtcbiAgICB2YXIgeHMgPSB2WzBdICogc2luVGhldGE7XG4gICAgdmFyIHlzID0gdlsxXSAqIHNpblRoZXRhO1xuICAgIHZhciB6cyA9IHZbMl0gKiBzaW5UaGV0YTtcbiAgICB2YXIgcmVzdWx0ID0gW1xuICAgICAgICAgICAgeHhWICsgY29zVGhldGEsXG4gICAgICAgICAgICB4eVYgKyB6cyxcbiAgICAgICAgICAgIHh6ViAtIHlzLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHh5ViAtIHpzLFxuICAgICAgICAgICAgeXlWICsgY29zVGhldGEsXG4gICAgICAgICAgICB5elYgKyB4cyxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB4elYgKyB5cyxcbiAgICAgICAgICAgIHl6ViAtIHhzLFxuICAgICAgICAgICAgenpWICsgY29zVGhldGEsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMVxuICAgICAgICBdO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuVHJhbnNmb3JtLmFib3V0T3JpZ2luID0gZnVuY3Rpb24gYWJvdXRPcmlnaW4odiwgbSkge1xuICAgIHZhciB0MCA9IHZbMF0gLSAodlswXSAqIG1bMF0gKyB2WzFdICogbVs0XSArIHZbMl0gKiBtWzhdKTtcbiAgICB2YXIgdDEgPSB2WzFdIC0gKHZbMF0gKiBtWzFdICsgdlsxXSAqIG1bNV0gKyB2WzJdICogbVs5XSk7XG4gICAgdmFyIHQyID0gdlsyXSAtICh2WzBdICogbVsyXSArIHZbMV0gKiBtWzZdICsgdlsyXSAqIG1bMTBdKTtcbiAgICByZXR1cm4gVHJhbnNmb3JtLnRoZW5Nb3ZlKG0sIFtcbiAgICAgICAgdDAsXG4gICAgICAgIHQxLFxuICAgICAgICB0MlxuICAgIF0pO1xufTtcblRyYW5zZm9ybS5za2V3ID0gZnVuY3Rpb24gc2tldyhwaGksIHRoZXRhLCBwc2kpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICAxLFxuICAgICAgICBNYXRoLnRhbih0aGV0YSksXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIE1hdGgudGFuKHBzaSksXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIE1hdGgudGFuKHBoaSksXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5za2V3WCA9IGZ1bmN0aW9uIHNrZXdYKGFuZ2xlKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgTWF0aC50YW4oYW5nbGUpLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0uc2tld1kgPSBmdW5jdGlvbiBza2V3WShhbmdsZSkge1xuICAgIHJldHVybiBbXG4gICAgICAgIDEsXG4gICAgICAgIE1hdGgudGFuKGFuZ2xlKSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnBlcnNwZWN0aXZlID0gZnVuY3Rpb24gcGVyc3BlY3RpdmUoZm9jdXNaKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgLTEgLyBmb2N1c1osXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5nZXRUcmFuc2xhdGUgPSBmdW5jdGlvbiBnZXRUcmFuc2xhdGUobSkge1xuICAgIHJldHVybiBbXG4gICAgICAgIG1bMTJdLFxuICAgICAgICBtWzEzXSxcbiAgICAgICAgbVsxNF1cbiAgICBdO1xufTtcblRyYW5zZm9ybS5pbnZlcnNlID0gZnVuY3Rpb24gaW52ZXJzZShtKSB7XG4gICAgdmFyIGMwID0gbVs1XSAqIG1bMTBdIC0gbVs2XSAqIG1bOV07XG4gICAgdmFyIGMxID0gbVs0XSAqIG1bMTBdIC0gbVs2XSAqIG1bOF07XG4gICAgdmFyIGMyID0gbVs0XSAqIG1bOV0gLSBtWzVdICogbVs4XTtcbiAgICB2YXIgYzQgPSBtWzFdICogbVsxMF0gLSBtWzJdICogbVs5XTtcbiAgICB2YXIgYzUgPSBtWzBdICogbVsxMF0gLSBtWzJdICogbVs4XTtcbiAgICB2YXIgYzYgPSBtWzBdICogbVs5XSAtIG1bMV0gKiBtWzhdO1xuICAgIHZhciBjOCA9IG1bMV0gKiBtWzZdIC0gbVsyXSAqIG1bNV07XG4gICAgdmFyIGM5ID0gbVswXSAqIG1bNl0gLSBtWzJdICogbVs0XTtcbiAgICB2YXIgYzEwID0gbVswXSAqIG1bNV0gLSBtWzFdICogbVs0XTtcbiAgICB2YXIgZGV0TSA9IG1bMF0gKiBjMCAtIG1bMV0gKiBjMSArIG1bMl0gKiBjMjtcbiAgICB2YXIgaW52RCA9IDEgLyBkZXRNO1xuICAgIHZhciByZXN1bHQgPSBbXG4gICAgICAgICAgICBpbnZEICogYzAsXG4gICAgICAgICAgICAtaW52RCAqIGM0LFxuICAgICAgICAgICAgaW52RCAqIGM4LFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIC1pbnZEICogYzEsXG4gICAgICAgICAgICBpbnZEICogYzUsXG4gICAgICAgICAgICAtaW52RCAqIGM5LFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIGludkQgKiBjMixcbiAgICAgICAgICAgIC1pbnZEICogYzYsXG4gICAgICAgICAgICBpbnZEICogYzEwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDFcbiAgICAgICAgXTtcbiAgICByZXN1bHRbMTJdID0gLW1bMTJdICogcmVzdWx0WzBdIC0gbVsxM10gKiByZXN1bHRbNF0gLSBtWzE0XSAqIHJlc3VsdFs4XTtcbiAgICByZXN1bHRbMTNdID0gLW1bMTJdICogcmVzdWx0WzFdIC0gbVsxM10gKiByZXN1bHRbNV0gLSBtWzE0XSAqIHJlc3VsdFs5XTtcbiAgICByZXN1bHRbMTRdID0gLW1bMTJdICogcmVzdWx0WzJdIC0gbVsxM10gKiByZXN1bHRbNl0gLSBtWzE0XSAqIHJlc3VsdFsxMF07XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5UcmFuc2Zvcm0udHJhbnNwb3NlID0gZnVuY3Rpb24gdHJhbnNwb3NlKG0pIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBtWzBdLFxuICAgICAgICBtWzRdLFxuICAgICAgICBtWzhdLFxuICAgICAgICBtWzEyXSxcbiAgICAgICAgbVsxXSxcbiAgICAgICAgbVs1XSxcbiAgICAgICAgbVs5XSxcbiAgICAgICAgbVsxM10sXG4gICAgICAgIG1bMl0sXG4gICAgICAgIG1bNl0sXG4gICAgICAgIG1bMTBdLFxuICAgICAgICBtWzE0XSxcbiAgICAgICAgbVszXSxcbiAgICAgICAgbVs3XSxcbiAgICAgICAgbVsxMV0sXG4gICAgICAgIG1bMTVdXG4gICAgXTtcbn07XG5mdW5jdGlvbiBfbm9ybVNxdWFyZWQodikge1xuICAgIHJldHVybiB2Lmxlbmd0aCA9PT0gMiA/IHZbMF0gKiB2WzBdICsgdlsxXSAqIHZbMV0gOiB2WzBdICogdlswXSArIHZbMV0gKiB2WzFdICsgdlsyXSAqIHZbMl07XG59XG5mdW5jdGlvbiBfbm9ybSh2KSB7XG4gICAgcmV0dXJuIE1hdGguc3FydChfbm9ybVNxdWFyZWQodikpO1xufVxuZnVuY3Rpb24gX3NpZ24obikge1xuICAgIHJldHVybiBuIDwgMCA/IC0xIDogMTtcbn1cblRyYW5zZm9ybS5pbnRlcnByZXQgPSBmdW5jdGlvbiBpbnRlcnByZXQoTSkge1xuICAgIHZhciB4ID0gW1xuICAgICAgICAgICAgTVswXSxcbiAgICAgICAgICAgIE1bMV0sXG4gICAgICAgICAgICBNWzJdXG4gICAgICAgIF07XG4gICAgdmFyIHNnbiA9IF9zaWduKHhbMF0pO1xuICAgIHZhciB4Tm9ybSA9IF9ub3JtKHgpO1xuICAgIHZhciB2ID0gW1xuICAgICAgICAgICAgeFswXSArIHNnbiAqIHhOb3JtLFxuICAgICAgICAgICAgeFsxXSxcbiAgICAgICAgICAgIHhbMl1cbiAgICAgICAgXTtcbiAgICB2YXIgbXVsdCA9IDIgLyBfbm9ybVNxdWFyZWQodik7XG4gICAgaWYgKG11bHQgPj0gSW5maW5pdHkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogVHJhbnNmb3JtLmdldFRyYW5zbGF0ZShNKSxcbiAgICAgICAgICAgIHJvdGF0ZTogW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2NhbGU6IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNrZXc6IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cbiAgICB2YXIgUTEgPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAxXG4gICAgICAgIF07XG4gICAgUTFbMF0gPSAxIC0gbXVsdCAqIHZbMF0gKiB2WzBdO1xuICAgIFExWzVdID0gMSAtIG11bHQgKiB2WzFdICogdlsxXTtcbiAgICBRMVsxMF0gPSAxIC0gbXVsdCAqIHZbMl0gKiB2WzJdO1xuICAgIFExWzFdID0gLW11bHQgKiB2WzBdICogdlsxXTtcbiAgICBRMVsyXSA9IC1tdWx0ICogdlswXSAqIHZbMl07XG4gICAgUTFbNl0gPSAtbXVsdCAqIHZbMV0gKiB2WzJdO1xuICAgIFExWzRdID0gUTFbMV07XG4gICAgUTFbOF0gPSBRMVsyXTtcbiAgICBRMVs5XSA9IFExWzZdO1xuICAgIHZhciBNUTEgPSBUcmFuc2Zvcm0ubXVsdGlwbHkoUTEsIE0pO1xuICAgIHZhciB4MiA9IFtcbiAgICAgICAgICAgIE1RMVs1XSxcbiAgICAgICAgICAgIE1RMVs2XVxuICAgICAgICBdO1xuICAgIHZhciBzZ24yID0gX3NpZ24oeDJbMF0pO1xuICAgIHZhciB4Mk5vcm0gPSBfbm9ybSh4Mik7XG4gICAgdmFyIHYyID0gW1xuICAgICAgICAgICAgeDJbMF0gKyBzZ24yICogeDJOb3JtLFxuICAgICAgICAgICAgeDJbMV1cbiAgICAgICAgXTtcbiAgICB2YXIgbXVsdDIgPSAyIC8gX25vcm1TcXVhcmVkKHYyKTtcbiAgICB2YXIgUTIgPSBbXG4gICAgICAgICAgICAxLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAxXG4gICAgICAgIF07XG4gICAgUTJbNV0gPSAxIC0gbXVsdDIgKiB2MlswXSAqIHYyWzBdO1xuICAgIFEyWzEwXSA9IDEgLSBtdWx0MiAqIHYyWzFdICogdjJbMV07XG4gICAgUTJbNl0gPSAtbXVsdDIgKiB2MlswXSAqIHYyWzFdO1xuICAgIFEyWzldID0gUTJbNl07XG4gICAgdmFyIFEgPSBUcmFuc2Zvcm0ubXVsdGlwbHkoUTIsIFExKTtcbiAgICB2YXIgUiA9IFRyYW5zZm9ybS5tdWx0aXBseShRLCBNKTtcbiAgICB2YXIgcmVtb3ZlciA9IFRyYW5zZm9ybS5zY2FsZShSWzBdIDwgMCA/IC0xIDogMSwgUls1XSA8IDAgPyAtMSA6IDEsIFJbMTBdIDwgMCA/IC0xIDogMSk7XG4gICAgUiA9IFRyYW5zZm9ybS5tdWx0aXBseShSLCByZW1vdmVyKTtcbiAgICBRID0gVHJhbnNmb3JtLm11bHRpcGx5KHJlbW92ZXIsIFEpO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICByZXN1bHQudHJhbnNsYXRlID0gVHJhbnNmb3JtLmdldFRyYW5zbGF0ZShNKTtcbiAgICByZXN1bHQucm90YXRlID0gW1xuICAgICAgICBNYXRoLmF0YW4yKC1RWzZdLCBRWzEwXSksXG4gICAgICAgIE1hdGguYXNpbihRWzJdKSxcbiAgICAgICAgTWF0aC5hdGFuMigtUVsxXSwgUVswXSlcbiAgICBdO1xuICAgIGlmICghcmVzdWx0LnJvdGF0ZVswXSkge1xuICAgICAgICByZXN1bHQucm90YXRlWzBdID0gMDtcbiAgICAgICAgcmVzdWx0LnJvdGF0ZVsyXSA9IE1hdGguYXRhbjIoUVs0XSwgUVs1XSk7XG4gICAgfVxuICAgIHJlc3VsdC5zY2FsZSA9IFtcbiAgICAgICAgUlswXSxcbiAgICAgICAgUls1XSxcbiAgICAgICAgUlsxMF1cbiAgICBdO1xuICAgIHJlc3VsdC5za2V3ID0gW1xuICAgICAgICBNYXRoLmF0YW4yKFJbOV0sIHJlc3VsdC5zY2FsZVsyXSksXG4gICAgICAgIE1hdGguYXRhbjIoUls4XSwgcmVzdWx0LnNjYWxlWzJdKSxcbiAgICAgICAgTWF0aC5hdGFuMihSWzRdLCByZXN1bHQuc2NhbGVbMF0pXG4gICAgXTtcbiAgICBpZiAoTWF0aC5hYnMocmVzdWx0LnJvdGF0ZVswXSkgKyBNYXRoLmFicyhyZXN1bHQucm90YXRlWzJdKSA+IDEuNSAqIE1hdGguUEkpIHtcbiAgICAgICAgcmVzdWx0LnJvdGF0ZVsxXSA9IE1hdGguUEkgLSByZXN1bHQucm90YXRlWzFdO1xuICAgICAgICBpZiAocmVzdWx0LnJvdGF0ZVsxXSA+IE1hdGguUEkpXG4gICAgICAgICAgICByZXN1bHQucm90YXRlWzFdIC09IDIgKiBNYXRoLlBJO1xuICAgICAgICBpZiAocmVzdWx0LnJvdGF0ZVsxXSA8IC1NYXRoLlBJKVxuICAgICAgICAgICAgcmVzdWx0LnJvdGF0ZVsxXSArPSAyICogTWF0aC5QSTtcbiAgICAgICAgaWYgKHJlc3VsdC5yb3RhdGVbMF0gPCAwKVxuICAgICAgICAgICAgcmVzdWx0LnJvdGF0ZVswXSArPSBNYXRoLlBJO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXN1bHQucm90YXRlWzBdIC09IE1hdGguUEk7XG4gICAgICAgIGlmIChyZXN1bHQucm90YXRlWzJdIDwgMClcbiAgICAgICAgICAgIHJlc3VsdC5yb3RhdGVbMl0gKz0gTWF0aC5QSTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmVzdWx0LnJvdGF0ZVsyXSAtPSBNYXRoLlBJO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblRyYW5zZm9ybS5hdmVyYWdlID0gZnVuY3Rpb24gYXZlcmFnZShNMSwgTTIsIHQpIHtcbiAgICB0ID0gdCA9PT0gdW5kZWZpbmVkID8gMC41IDogdDtcbiAgICB2YXIgc3BlY00xID0gVHJhbnNmb3JtLmludGVycHJldChNMSk7XG4gICAgdmFyIHNwZWNNMiA9IFRyYW5zZm9ybS5pbnRlcnByZXQoTTIpO1xuICAgIHZhciBzcGVjQXZnID0ge1xuICAgICAgICAgICAgdHJhbnNsYXRlOiBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByb3RhdGU6IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNjYWxlOiBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBza2V3OiBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBzcGVjQXZnLnRyYW5zbGF0ZVtpXSA9ICgxIC0gdCkgKiBzcGVjTTEudHJhbnNsYXRlW2ldICsgdCAqIHNwZWNNMi50cmFuc2xhdGVbaV07XG4gICAgICAgIHNwZWNBdmcucm90YXRlW2ldID0gKDEgLSB0KSAqIHNwZWNNMS5yb3RhdGVbaV0gKyB0ICogc3BlY00yLnJvdGF0ZVtpXTtcbiAgICAgICAgc3BlY0F2Zy5zY2FsZVtpXSA9ICgxIC0gdCkgKiBzcGVjTTEuc2NhbGVbaV0gKyB0ICogc3BlY00yLnNjYWxlW2ldO1xuICAgICAgICBzcGVjQXZnLnNrZXdbaV0gPSAoMSAtIHQpICogc3BlY00xLnNrZXdbaV0gKyB0ICogc3BlY00yLnNrZXdbaV07XG4gICAgfVxuICAgIHJldHVybiBUcmFuc2Zvcm0uYnVpbGQoc3BlY0F2Zyk7XG59O1xuVHJhbnNmb3JtLmJ1aWxkID0gZnVuY3Rpb24gYnVpbGQoc3BlYykge1xuICAgIHZhciBzY2FsZU1hdHJpeCA9IFRyYW5zZm9ybS5zY2FsZShzcGVjLnNjYWxlWzBdLCBzcGVjLnNjYWxlWzFdLCBzcGVjLnNjYWxlWzJdKTtcbiAgICB2YXIgc2tld01hdHJpeCA9IFRyYW5zZm9ybS5za2V3KHNwZWMuc2tld1swXSwgc3BlYy5za2V3WzFdLCBzcGVjLnNrZXdbMl0pO1xuICAgIHZhciByb3RhdGVNYXRyaXggPSBUcmFuc2Zvcm0ucm90YXRlKHNwZWMucm90YXRlWzBdLCBzcGVjLnJvdGF0ZVsxXSwgc3BlYy5yb3RhdGVbMl0pO1xuICAgIHJldHVybiBUcmFuc2Zvcm0udGhlbk1vdmUoVHJhbnNmb3JtLm11bHRpcGx5KFRyYW5zZm9ybS5tdWx0aXBseShyb3RhdGVNYXRyaXgsIHNrZXdNYXRyaXgpLCBzY2FsZU1hdHJpeCksIHNwZWMudHJhbnNsYXRlKTtcbn07XG5UcmFuc2Zvcm0uZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzKGEsIGIpIHtcbiAgICByZXR1cm4gIVRyYW5zZm9ybS5ub3RFcXVhbHMoYSwgYik7XG59O1xuVHJhbnNmb3JtLm5vdEVxdWFscyA9IGZ1bmN0aW9uIG5vdEVxdWFscyhhLCBiKSB7XG4gICAgaWYgKGEgPT09IGIpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gIShhICYmIGIpIHx8IGFbMTJdICE9PSBiWzEyXSB8fCBhWzEzXSAhPT0gYlsxM10gfHwgYVsxNF0gIT09IGJbMTRdIHx8IGFbMF0gIT09IGJbMF0gfHwgYVsxXSAhPT0gYlsxXSB8fCBhWzJdICE9PSBiWzJdIHx8IGFbNF0gIT09IGJbNF0gfHwgYVs1XSAhPT0gYls1XSB8fCBhWzZdICE9PSBiWzZdIHx8IGFbOF0gIT09IGJbOF0gfHwgYVs5XSAhPT0gYls5XSB8fCBhWzEwXSAhPT0gYlsxMF07XG59O1xuVHJhbnNmb3JtLm5vcm1hbGl6ZVJvdGF0aW9uID0gZnVuY3Rpb24gbm9ybWFsaXplUm90YXRpb24ocm90YXRpb24pIHtcbiAgICB2YXIgcmVzdWx0ID0gcm90YXRpb24uc2xpY2UoMCk7XG4gICAgaWYgKHJlc3VsdFswXSA9PT0gTWF0aC5QSSAqIDAuNSB8fCByZXN1bHRbMF0gPT09IC1NYXRoLlBJICogMC41KSB7XG4gICAgICAgIHJlc3VsdFswXSA9IC1yZXN1bHRbMF07XG4gICAgICAgIHJlc3VsdFsxXSA9IE1hdGguUEkgLSByZXN1bHRbMV07XG4gICAgICAgIHJlc3VsdFsyXSAtPSBNYXRoLlBJO1xuICAgIH1cbiAgICBpZiAocmVzdWx0WzBdID4gTWF0aC5QSSAqIDAuNSkge1xuICAgICAgICByZXN1bHRbMF0gPSByZXN1bHRbMF0gLSBNYXRoLlBJO1xuICAgICAgICByZXN1bHRbMV0gPSBNYXRoLlBJIC0gcmVzdWx0WzFdO1xuICAgICAgICByZXN1bHRbMl0gLT0gTWF0aC5QSTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdFswXSA8IC1NYXRoLlBJICogMC41KSB7XG4gICAgICAgIHJlc3VsdFswXSA9IHJlc3VsdFswXSArIE1hdGguUEk7XG4gICAgICAgIHJlc3VsdFsxXSA9IC1NYXRoLlBJIC0gcmVzdWx0WzFdO1xuICAgICAgICByZXN1bHRbMl0gLT0gTWF0aC5QSTtcbiAgICB9XG4gICAgd2hpbGUgKHJlc3VsdFsxXSA8IC1NYXRoLlBJKVxuICAgICAgICByZXN1bHRbMV0gKz0gMiAqIE1hdGguUEk7XG4gICAgd2hpbGUgKHJlc3VsdFsxXSA+PSBNYXRoLlBJKVxuICAgICAgICByZXN1bHRbMV0gLT0gMiAqIE1hdGguUEk7XG4gICAgd2hpbGUgKHJlc3VsdFsyXSA8IC1NYXRoLlBJKVxuICAgICAgICByZXN1bHRbMl0gKz0gMiAqIE1hdGguUEk7XG4gICAgd2hpbGUgKHJlc3VsdFsyXSA+PSBNYXRoLlBJKVxuICAgICAgICByZXN1bHRbMl0gLT0gMiAqIE1hdGguUEk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5UcmFuc2Zvcm0uaW5Gcm9udCA9IFtcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMC4wMDEsXG4gICAgMVxuXTtcblRyYW5zZm9ybS5iZWhpbmQgPSBbXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIC0wLjAwMSxcbiAgICAxXG5dO1xubW9kdWxlLmV4cG9ydHMgPSBUcmFuc2Zvcm07IiwidmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4vRXZlbnRIYW5kbGVyJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCcuL09wdGlvbnNNYW5hZ2VyJyk7XG52YXIgUmVuZGVyTm9kZSA9IHJlcXVpcmUoJy4vUmVuZGVyTm9kZScpO1xudmFyIFV0aWxpdHkgPSByZXF1aXJlKCcuLi91dGlsaXRpZXMvVXRpbGl0eScpO1xuZnVuY3Rpb24gVmlldyhvcHRpb25zKSB7XG4gICAgdGhpcy5fbm9kZSA9IG5ldyBSZW5kZXJOb2RlKCk7XG4gICAgdGhpcy5fZXZlbnRJbnB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0SW5wdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50SW5wdXQpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50T3V0cHV0KTtcbiAgICB0aGlzLm9wdGlvbnMgPSBVdGlsaXR5LmNsb25lKHRoaXMuY29uc3RydWN0b3IuREVGQVVMVF9PUFRJT05TIHx8IFZpZXcuREVGQVVMVF9PUFRJT05TKTtcbiAgICB0aGlzLl9vcHRpb25zTWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcih0aGlzLm9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG59XG5WaWV3LkRFRkFVTFRfT1BUSU9OUyA9IHt9O1xuVmlldy5wcm90b3R5cGUuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uIGdldE9wdGlvbnMoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnNNYW5hZ2VyLmdldE9wdGlvbnMoa2V5KTtcbn07XG5WaWV3LnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgdGhpcy5fb3B0aW9uc01hbmFnZXIucGF0Y2gob3B0aW9ucyk7XG59O1xuVmlldy5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkKCkge1xuICAgIHJldHVybiB0aGlzLl9ub2RlLmFkZC5hcHBseSh0aGlzLl9ub2RlLCBhcmd1bWVudHMpO1xufTtcblZpZXcucHJvdG90eXBlLl9hZGQgPSBWaWV3LnByb3RvdHlwZS5hZGQ7XG5WaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGUucmVuZGVyKCk7XG59O1xuVmlldy5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgaWYgKHRoaXMuX25vZGUgJiYgdGhpcy5fbm9kZS5nZXRTaXplKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub2RlLmdldFNpemUuYXBwbHkodGhpcy5fbm9kZSwgYXJndW1lbnRzKSB8fCB0aGlzLm9wdGlvbnMuc2l6ZTtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zaXplO1xufTtcbm1vZHVsZS5leHBvcnRzID0gVmlldzsiLCJmdW5jdGlvbiBWaWV3U2VxdWVuY2Uob3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucylcbiAgICAgICAgb3B0aW9ucyA9IFtdO1xuICAgIGlmIChvcHRpb25zIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIG9wdGlvbnMgPSB7IGFycmF5OiBvcHRpb25zIH07XG4gICAgdGhpcy5fID0gbnVsbDtcbiAgICB0aGlzLmluZGV4ID0gb3B0aW9ucy5pbmRleCB8fCAwO1xuICAgIGlmIChvcHRpb25zLmFycmF5KVxuICAgICAgICB0aGlzLl8gPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvci5CYWNraW5nKG9wdGlvbnMuYXJyYXkpO1xuICAgIGVsc2UgaWYgKG9wdGlvbnMuXylcbiAgICAgICAgdGhpcy5fID0gb3B0aW9ucy5fO1xuICAgIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLl8uZmlyc3RJbmRleClcbiAgICAgICAgdGhpcy5fLmZpcnN0Tm9kZSA9IHRoaXM7XG4gICAgaWYgKHRoaXMuaW5kZXggPT09IHRoaXMuXy5maXJzdEluZGV4ICsgdGhpcy5fLmFycmF5Lmxlbmd0aCAtIDEpXG4gICAgICAgIHRoaXMuXy5sYXN0Tm9kZSA9IHRoaXM7XG4gICAgaWYgKG9wdGlvbnMubG9vcCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLl8ubG9vcCA9IG9wdGlvbnMubG9vcDtcbiAgICBpZiAob3B0aW9ucy50cmFja1NpemUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5fLnRyYWNrU2l6ZSA9IG9wdGlvbnMudHJhY2tTaXplO1xuICAgIHRoaXMuX3ByZXZpb3VzTm9kZSA9IG51bGw7XG4gICAgdGhpcy5fbmV4dE5vZGUgPSBudWxsO1xufVxuVmlld1NlcXVlbmNlLkJhY2tpbmcgPSBmdW5jdGlvbiBCYWNraW5nKGFycmF5KSB7XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xuICAgIHRoaXMuZmlyc3RJbmRleCA9IDA7XG4gICAgdGhpcy5sb29wID0gZmFsc2U7XG4gICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xuICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xuICAgIHRoaXMuY3VtdWxhdGl2ZVNpemVzID0gW1tcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF1dO1xuICAgIHRoaXMuc2l6ZURpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLnRyYWNrU2l6ZSA9IGZhbHNlO1xufTtcblZpZXdTZXF1ZW5jZS5CYWNraW5nLnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uIGdldFZhbHVlKGkpIHtcbiAgICB2YXIgX2kgPSBpIC0gdGhpcy5maXJzdEluZGV4O1xuICAgIGlmIChfaSA8IDAgfHwgX2kgPj0gdGhpcy5hcnJheS5sZW5ndGgpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIHJldHVybiB0aGlzLmFycmF5W19pXTtcbn07XG5WaWV3U2VxdWVuY2UuQmFja2luZy5wcm90b3R5cGUuc2V0VmFsdWUgPSBmdW5jdGlvbiBzZXRWYWx1ZShpLCB2YWx1ZSkge1xuICAgIHRoaXMuYXJyYXlbaSAtIHRoaXMuZmlyc3RJbmRleF0gPSB2YWx1ZTtcbn07XG5WaWV3U2VxdWVuY2UuQmFja2luZy5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoaW5kZXgpIHtcbiAgICByZXR1cm4gdGhpcy5jdW11bGF0aXZlU2l6ZXNbaW5kZXhdO1xufTtcblZpZXdTZXF1ZW5jZS5CYWNraW5nLnByb3RvdHlwZS5jYWxjdWxhdGVTaXplID0gZnVuY3Rpb24gY2FsY3VsYXRlU2l6ZShpbmRleCkge1xuICAgIGluZGV4ID0gaW5kZXggfHwgdGhpcy5hcnJheS5sZW5ndGg7XG4gICAgdmFyIHNpemUgPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kZXg7IGkrKykge1xuICAgICAgICB2YXIgbm9kZVNpemUgPSB0aGlzLmFycmF5W2ldLmdldFNpemUoKTtcbiAgICAgICAgaWYgKCFub2RlU2l6ZSlcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChzaXplWzBdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChub2RlU2l6ZVswXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHNpemVbMF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgc2l6ZVswXSArPSBub2RlU2l6ZVswXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2l6ZVsxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAobm9kZVNpemVbMV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBzaXplWzFdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHNpemVbMV0gKz0gbm9kZVNpemVbMV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdW11bGF0aXZlU2l6ZXNbaSArIDFdID0gc2l6ZS5zbGljZSgpO1xuICAgIH1cbiAgICB0aGlzLnNpemVEaXJ0eSA9IGZhbHNlO1xuICAgIHJldHVybiBzaXplO1xufTtcblZpZXdTZXF1ZW5jZS5CYWNraW5nLnByb3RvdHlwZS5yZWluZGV4ID0gZnVuY3Rpb24gcmVpbmRleChzdGFydCwgcmVtb3ZlQ291bnQsIGluc2VydENvdW50KSB7XG4gICAgaWYgKCF0aGlzLmFycmF5WzBdKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBpbmRleCA9IHRoaXMuZmlyc3RJbmRleDtcbiAgICB2YXIgaW5kZXhTaGlmdEFtb3VudCA9IGluc2VydENvdW50IC0gcmVtb3ZlQ291bnQ7XG4gICAgdmFyIG5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICB3aGlsZSAoaW5kZXggPCBzdGFydCAtIDEpIHtcbiAgICAgICAgbm9kZSA9IG5vZGUuZ2V0TmV4dCgpO1xuICAgICAgICBpbmRleCsrO1xuICAgIH1cbiAgICB2YXIgc3BsaWNlU3RhcnROb2RlID0gbm9kZTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgcmVtb3ZlQ291bnQ7IGkrKykge1xuICAgICAgICBub2RlID0gbm9kZS5nZXROZXh0KCk7XG4gICAgICAgIGlmIChub2RlKVxuICAgICAgICAgICAgbm9kZS5fcHJldmlvdXNOb2RlID0gc3BsaWNlU3RhcnROb2RlO1xuICAgIH1cbiAgICB2YXIgc3BsaWNlUmVzdW1lTm9kZSA9IG5vZGUgPyBub2RlLmdldE5leHQoKSA6IG51bGw7XG4gICAgc3BsaWNlU3RhcnROb2RlLl9uZXh0Tm9kZSA9IG51bGw7XG4gICAgbm9kZSA9IHNwbGljZVN0YXJ0Tm9kZTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgaW5zZXJ0Q291bnQ7IGkrKylcbiAgICAgICAgbm9kZSA9IG5vZGUuZ2V0TmV4dCgpO1xuICAgIGluZGV4ICs9IGluc2VydENvdW50O1xuICAgIGlmIChub2RlICE9PSBzcGxpY2VSZXN1bWVOb2RlKSB7XG4gICAgICAgIG5vZGUuX25leHROb2RlID0gc3BsaWNlUmVzdW1lTm9kZTtcbiAgICAgICAgaWYgKHNwbGljZVJlc3VtZU5vZGUpXG4gICAgICAgICAgICBzcGxpY2VSZXN1bWVOb2RlLl9wcmV2aW91c05vZGUgPSBub2RlO1xuICAgIH1cbiAgICBpZiAoc3BsaWNlUmVzdW1lTm9kZSkge1xuICAgICAgICBub2RlID0gc3BsaWNlUmVzdW1lTm9kZTtcbiAgICAgICAgaW5kZXgrKztcbiAgICAgICAgd2hpbGUgKG5vZGUgJiYgaW5kZXggPCB0aGlzLmFycmF5Lmxlbmd0aCArIHRoaXMuZmlyc3RJbmRleCkge1xuICAgICAgICAgICAgaWYgKG5vZGUuX25leHROb2RlKVxuICAgICAgICAgICAgICAgIG5vZGUuaW5kZXggKz0gaW5kZXhTaGlmdEFtb3VudDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBub2RlLmluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICBub2RlID0gbm9kZS5nZXROZXh0KCk7XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnRyYWNrU2l6ZSlcbiAgICAgICAgdGhpcy5zaXplRGlydHkgPSB0cnVlO1xufTtcblZpZXdTZXF1ZW5jZS5wcm90b3R5cGUuZ2V0UHJldmlvdXMgPSBmdW5jdGlvbiBnZXRQcmV2aW91cygpIHtcbiAgICB2YXIgbGVuID0gdGhpcy5fLmFycmF5Lmxlbmd0aDtcbiAgICBpZiAoIWxlbikge1xuICAgICAgICB0aGlzLl9wcmV2aW91c05vZGUgPSBudWxsO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pbmRleCA9PT0gdGhpcy5fLmZpcnN0SW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuXy5sb29wKSB7XG4gICAgICAgICAgICB0aGlzLl9wcmV2aW91c05vZGUgPSB0aGlzLl8ubGFzdE5vZGUgfHwgbmV3IHRoaXMuY29uc3RydWN0b3Ioe1xuICAgICAgICAgICAgICAgIF86IHRoaXMuXyxcbiAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5fLmZpcnN0SW5kZXggKyBsZW4gLSAxXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzTm9kZS5fbmV4dE5vZGUgPSB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNOb2RlID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXRoaXMuX3ByZXZpb3VzTm9kZSkge1xuICAgICAgICB0aGlzLl9wcmV2aW91c05vZGUgPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih7XG4gICAgICAgICAgICBfOiB0aGlzLl8sXG4gICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleCAtIDFcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3ByZXZpb3VzTm9kZS5fbmV4dE5vZGUgPSB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcHJldmlvdXNOb2RlO1xufTtcblZpZXdTZXF1ZW5jZS5wcm90b3R5cGUuZ2V0TmV4dCA9IGZ1bmN0aW9uIGdldE5leHQoKSB7XG4gICAgdmFyIGxlbiA9IHRoaXMuXy5hcnJheS5sZW5ndGg7XG4gICAgaWYgKCFsZW4pIHtcbiAgICAgICAgdGhpcy5fbmV4dE5vZGUgPSBudWxsO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pbmRleCA9PT0gdGhpcy5fLmZpcnN0SW5kZXggKyBsZW4gLSAxKSB7XG4gICAgICAgIGlmICh0aGlzLl8ubG9vcCkge1xuICAgICAgICAgICAgdGhpcy5fbmV4dE5vZGUgPSB0aGlzLl8uZmlyc3ROb2RlIHx8IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHtcbiAgICAgICAgICAgICAgICBfOiB0aGlzLl8sXG4gICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuXy5maXJzdEluZGV4XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX25leHROb2RlLl9wcmV2aW91c05vZGUgPSB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbmV4dE5vZGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmICghdGhpcy5fbmV4dE5vZGUpIHtcbiAgICAgICAgdGhpcy5fbmV4dE5vZGUgPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih7XG4gICAgICAgICAgICBfOiB0aGlzLl8sXG4gICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleCArIDFcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX25leHROb2RlLl9wcmV2aW91c05vZGUgPSB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fbmV4dE5vZGU7XG59O1xuVmlld1NlcXVlbmNlLnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZihpdGVtKSB7XG4gICAgcmV0dXJuIHRoaXMuXy5hcnJheS5pbmRleE9mKGl0ZW0pO1xufTtcblZpZXdTZXF1ZW5jZS5wcm90b3R5cGUuZ2V0SW5kZXggPSBmdW5jdGlvbiBnZXRJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmRleDtcbn07XG5WaWV3U2VxdWVuY2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuICcnICsgdGhpcy5pbmRleDtcbn07XG5WaWV3U2VxdWVuY2UucHJvdG90eXBlLnVuc2hpZnQgPSBmdW5jdGlvbiB1bnNoaWZ0KHZhbHVlKSB7XG4gICAgdGhpcy5fLmFycmF5LnVuc2hpZnQuYXBwbHkodGhpcy5fLmFycmF5LCBhcmd1bWVudHMpO1xuICAgIHRoaXMuXy5maXJzdEluZGV4IC09IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKHRoaXMuXy50cmFja1NpemUpXG4gICAgICAgIHRoaXMuXy5zaXplRGlydHkgPSB0cnVlO1xufTtcblZpZXdTZXF1ZW5jZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIHB1c2godmFsdWUpIHtcbiAgICB0aGlzLl8uYXJyYXkucHVzaC5hcHBseSh0aGlzLl8uYXJyYXksIGFyZ3VtZW50cyk7XG4gICAgaWYgKHRoaXMuXy50cmFja1NpemUpXG4gICAgICAgIHRoaXMuXy5zaXplRGlydHkgPSB0cnVlO1xufTtcblZpZXdTZXF1ZW5jZS5wcm90b3R5cGUuc3BsaWNlID0gZnVuY3Rpb24gc3BsaWNlKGluZGV4LCBob3dNYW55KSB7XG4gICAgdmFyIHZhbHVlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgdGhpcy5fLmFycmF5LnNwbGljZS5hcHBseSh0aGlzLl8uYXJyYXksIFtcbiAgICAgICAgaW5kZXggLSB0aGlzLl8uZmlyc3RJbmRleCxcbiAgICAgICAgaG93TWFueVxuICAgIF0uY29uY2F0KHZhbHVlcykpO1xuICAgIHRoaXMuXy5yZWluZGV4KGluZGV4LCBob3dNYW55LCB2YWx1ZXMubGVuZ3RoKTtcbn07XG5WaWV3U2VxdWVuY2UucHJvdG90eXBlLnN3YXAgPSBmdW5jdGlvbiBzd2FwKG90aGVyKSB7XG4gICAgdmFyIG90aGVyVmFsdWUgPSBvdGhlci5nZXQoKTtcbiAgICB2YXIgbXlWYWx1ZSA9IHRoaXMuZ2V0KCk7XG4gICAgdGhpcy5fLnNldFZhbHVlKHRoaXMuaW5kZXgsIG90aGVyVmFsdWUpO1xuICAgIHRoaXMuXy5zZXRWYWx1ZShvdGhlci5pbmRleCwgbXlWYWx1ZSk7XG4gICAgdmFyIG15UHJldmlvdXMgPSB0aGlzLl9wcmV2aW91c05vZGU7XG4gICAgdmFyIG15TmV4dCA9IHRoaXMuX25leHROb2RlO1xuICAgIHZhciBteUluZGV4ID0gdGhpcy5pbmRleDtcbiAgICB2YXIgb3RoZXJQcmV2aW91cyA9IG90aGVyLl9wcmV2aW91c05vZGU7XG4gICAgdmFyIG90aGVyTmV4dCA9IG90aGVyLl9uZXh0Tm9kZTtcbiAgICB2YXIgb3RoZXJJbmRleCA9IG90aGVyLmluZGV4O1xuICAgIHRoaXMuaW5kZXggPSBvdGhlckluZGV4O1xuICAgIHRoaXMuX3ByZXZpb3VzTm9kZSA9IG90aGVyUHJldmlvdXMgPT09IHRoaXMgPyBvdGhlciA6IG90aGVyUHJldmlvdXM7XG4gICAgaWYgKHRoaXMuX3ByZXZpb3VzTm9kZSlcbiAgICAgICAgdGhpcy5fcHJldmlvdXNOb2RlLl9uZXh0Tm9kZSA9IHRoaXM7XG4gICAgdGhpcy5fbmV4dE5vZGUgPSBvdGhlck5leHQgPT09IHRoaXMgPyBvdGhlciA6IG90aGVyTmV4dDtcbiAgICBpZiAodGhpcy5fbmV4dE5vZGUpXG4gICAgICAgIHRoaXMuX25leHROb2RlLl9wcmV2aW91c05vZGUgPSB0aGlzO1xuICAgIG90aGVyLmluZGV4ID0gbXlJbmRleDtcbiAgICBvdGhlci5fcHJldmlvdXNOb2RlID0gbXlQcmV2aW91cyA9PT0gb3RoZXIgPyB0aGlzIDogbXlQcmV2aW91cztcbiAgICBpZiAob3RoZXIuX3ByZXZpb3VzTm9kZSlcbiAgICAgICAgb3RoZXIuX3ByZXZpb3VzTm9kZS5fbmV4dE5vZGUgPSBvdGhlcjtcbiAgICBvdGhlci5fbmV4dE5vZGUgPSBteU5leHQgPT09IG90aGVyID8gdGhpcyA6IG15TmV4dDtcbiAgICBpZiAob3RoZXIuX25leHROb2RlKVxuICAgICAgICBvdGhlci5fbmV4dE5vZGUuX3ByZXZpb3VzTm9kZSA9IG90aGVyO1xuICAgIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLl8uZmlyc3RJbmRleClcbiAgICAgICAgdGhpcy5fLmZpcnN0Tm9kZSA9IHRoaXM7XG4gICAgZWxzZSBpZiAodGhpcy5pbmRleCA9PT0gdGhpcy5fLmZpcnN0SW5kZXggKyB0aGlzLl8uYXJyYXkubGVuZ3RoIC0gMSlcbiAgICAgICAgdGhpcy5fLmxhc3ROb2RlID0gdGhpcztcbiAgICBpZiAob3RoZXIuaW5kZXggPT09IHRoaXMuXy5maXJzdEluZGV4KVxuICAgICAgICB0aGlzLl8uZmlyc3ROb2RlID0gb3RoZXI7XG4gICAgZWxzZSBpZiAob3RoZXIuaW5kZXggPT09IHRoaXMuXy5maXJzdEluZGV4ICsgdGhpcy5fLmFycmF5Lmxlbmd0aCAtIDEpXG4gICAgICAgIHRoaXMuXy5sYXN0Tm9kZSA9IG90aGVyO1xuICAgIGlmICh0aGlzLl8udHJhY2tTaXplKVxuICAgICAgICB0aGlzLl8uc2l6ZURpcnR5ID0gdHJ1ZTtcbn07XG5WaWV3U2VxdWVuY2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gdGhpcy5fLmdldFZhbHVlKHRoaXMuaW5kZXgpO1xufTtcblZpZXdTZXF1ZW5jZS5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgdmFyIHRhcmdldCA9IHRoaXMuZ2V0KCk7XG4gICAgcmV0dXJuIHRhcmdldCA/IHRhcmdldC5nZXRTaXplKCkgOiBudWxsO1xufTtcblZpZXdTZXF1ZW5jZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLl8udHJhY2tTaXplICYmIHRoaXMuXy5zaXplRGlydHkpXG4gICAgICAgIHRoaXMuXy5jYWxjdWxhdGVTaXplKCk7XG4gICAgdmFyIHRhcmdldCA9IHRoaXMuZ2V0KCk7XG4gICAgcmV0dXJuIHRhcmdldCA/IHRhcmdldC5yZW5kZXIuYXBwbHkodGFyZ2V0LCBhcmd1bWVudHMpIDogbnVsbDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFZpZXdTZXF1ZW5jZTsiLCJ2YXIgY3NzID0gXCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXFxuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXFxuICpcXG4gKiBPd25lcjogbWFya0BmYW1vLnVzXFxuICogQGxpY2Vuc2UgTVBMIDIuMFxcbiAqIEBjb3B5cmlnaHQgRmFtb3VzIEluZHVzdHJpZXMsIEluYy4gMjAxNFxcbiAqL1xcblxcbi5mYW1vdXMtcm9vdCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBwYWRkaW5nOiAwcHg7XFxuICAgIG9wYWNpdHk6IC45OTk5OTk7IC8qIGlvczggaG90Zml4ICovXFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG59XFxuXFxuLmZhbW91cy1jb250YWluZXIsIC5mYW1vdXMtZ3JvdXAge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMHB4O1xcbiAgICBsZWZ0OiAwcHg7XFxuICAgIGJvdHRvbTogMHB4O1xcbiAgICByaWdodDogMHB4O1xcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IHZpc2libGU7XFxuICAgIGJhY2tmYWNlLXZpc2liaWxpdHk6IHZpc2libGU7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG4uZmFtb3VzLWdyb3VwIHtcXG4gICAgd2lkdGg6IDBweDtcXG4gICAgaGVpZ2h0OiAwcHg7XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBwYWRkaW5nOiAwcHg7XFxufVxcblxcbi5mYW1vdXMtc3VyZmFjZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgY2VudGVyO1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgY2VudGVyO1xcbiAgICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcXG4gICAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAgIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAgIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgLW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBwb2ludGVyLWV2ZW50czogYXV0bztcXG59XFxuXFxuLmZhbW91cy1jb250YWluZXItZ3JvdXAge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblwiOyAocmVxdWlyZShcIi9Vc2Vycy9hbGVqYW5kcm96dWNjb2xpbGxvL0Rlc2t0b3AvQWRGYW1lL25vZGVfbW9kdWxlcy9jc3NpZnlcIikpKGNzcyk7IG1vZHVsZS5leHBvcnRzID0gY3NzOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuLi9jb3JlL0V2ZW50SGFuZGxlcicpO1xuZnVuY3Rpb24gR2VuZXJpY1N5bmMoc3luY3MsIG9wdGlvbnMpIHtcbiAgICB0aGlzLl9ldmVudElucHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRJbnB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRJbnB1dCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRPdXRwdXQpO1xuICAgIHRoaXMuX3N5bmNzID0ge307XG4gICAgaWYgKHN5bmNzKVxuICAgICAgICB0aGlzLmFkZFN5bmMoc3luY3MpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG59XG5HZW5lcmljU3luYy5ESVJFQ1RJT05fWCA9IDA7XG5HZW5lcmljU3luYy5ESVJFQ1RJT05fWSA9IDE7XG5HZW5lcmljU3luYy5ESVJFQ1RJT05fWiA9IDI7XG52YXIgcmVnaXN0cnkgPSB7fTtcbkdlbmVyaWNTeW5jLnJlZ2lzdGVyID0gZnVuY3Rpb24gcmVnaXN0ZXIoc3luY09iamVjdCkge1xuICAgIGZvciAodmFyIGtleSBpbiBzeW5jT2JqZWN0KSB7XG4gICAgICAgIGlmIChyZWdpc3RyeVtrZXldKSB7XG4gICAgICAgICAgICBpZiAocmVnaXN0cnlba2V5XSA9PT0gc3luY09iamVjdFtrZXldKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoaXMga2V5IGlzIHJlZ2lzdGVyZWQgdG8gYSBkaWZmZXJlbnQgc3luYyBjbGFzcycpO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIHJlZ2lzdHJ5W2tleV0gPSBzeW5jT2JqZWN0W2tleV07XG4gICAgfVxufTtcbkdlbmVyaWNTeW5jLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fc3luY3MpIHtcbiAgICAgICAgdGhpcy5fc3luY3Nba2V5XS5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIH1cbn07XG5HZW5lcmljU3luYy5wcm90b3R5cGUucGlwZVN5bmMgPSBmdW5jdGlvbiBwaXBlVG9TeW5jKGtleSkge1xuICAgIHZhciBzeW5jID0gdGhpcy5fc3luY3Nba2V5XTtcbiAgICB0aGlzLl9ldmVudElucHV0LnBpcGUoc3luYyk7XG4gICAgc3luYy5waXBlKHRoaXMuX2V2ZW50T3V0cHV0KTtcbn07XG5HZW5lcmljU3luYy5wcm90b3R5cGUudW5waXBlU3luYyA9IGZ1bmN0aW9uIHVucGlwZUZyb21TeW5jKGtleSkge1xuICAgIHZhciBzeW5jID0gdGhpcy5fc3luY3Nba2V5XTtcbiAgICB0aGlzLl9ldmVudElucHV0LnVucGlwZShzeW5jKTtcbiAgICBzeW5jLnVucGlwZSh0aGlzLl9ldmVudE91dHB1dCk7XG59O1xuZnVuY3Rpb24gX2FkZFNpbmdsZVN5bmMoa2V5LCBvcHRpb25zKSB7XG4gICAgaWYgKCFyZWdpc3RyeVtrZXldKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5fc3luY3Nba2V5XSA9IG5ldyByZWdpc3RyeVtrZXldKG9wdGlvbnMpO1xuICAgIHRoaXMucGlwZVN5bmMoa2V5KTtcbn1cbkdlbmVyaWNTeW5jLnByb3RvdHlwZS5hZGRTeW5jID0gZnVuY3Rpb24gYWRkU3luYyhzeW5jcykge1xuICAgIGlmIChzeW5jcyBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN5bmNzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgX2FkZFNpbmdsZVN5bmMuY2FsbCh0aGlzLCBzeW5jc1tpXSk7XG4gICAgZWxzZSBpZiAoc3luY3MgaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzeW5jcylcbiAgICAgICAgICAgIF9hZGRTaW5nbGVTeW5jLmNhbGwodGhpcywga2V5LCBzeW5jc1trZXldKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEdlbmVyaWNTeW5jOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuLi9jb3JlL0V2ZW50SGFuZGxlcicpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnLi4vY29yZS9PcHRpb25zTWFuYWdlcicpO1xuZnVuY3Rpb24gTW91c2VTeW5jKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKE1vdXNlU3luYy5ERUZBVUxUX09QVElPTlMpO1xuICAgIHRoaXMuX29wdGlvbnNNYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHRoaXMub3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLl9ldmVudElucHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRJbnB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRJbnB1dCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRPdXRwdXQpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQub24oJ21vdXNlZG93bicsIF9oYW5kbGVTdGFydC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9ldmVudElucHV0Lm9uKCdtb3VzZW1vdmUnLCBfaGFuZGxlTW92ZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9ldmVudElucHV0Lm9uKCdtb3VzZXVwJywgX2hhbmRsZUVuZC5iaW5kKHRoaXMpKTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnByb3BvZ2F0ZSlcbiAgICAgICAgdGhpcy5fZXZlbnRJbnB1dC5vbignbW91c2VsZWF2ZScsIF9oYW5kbGVMZWF2ZS5iaW5kKHRoaXMpKTtcbiAgICBlbHNlXG4gICAgICAgIHRoaXMuX2V2ZW50SW5wdXQub24oJ21vdXNlbGVhdmUnLCBfaGFuZGxlRW5kLmJpbmQodGhpcykpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xpY2tUaHJlc2hvbGQpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMuX2Rpc3BsYWNlbWVudFswXSwgMikgKyBNYXRoLnBvdyh0aGlzLl9kaXNwbGFjZW1lbnRbMV0sIDIpKSA+IHRoaXMub3B0aW9ucy5jbGlja1RocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcyksIHRydWUpO1xuICAgIH1cbiAgICB0aGlzLl9wYXlsb2FkID0ge1xuICAgICAgICBkZWx0YTogbnVsbCxcbiAgICAgICAgcG9zaXRpb246IG51bGwsXG4gICAgICAgIHZlbG9jaXR5OiBudWxsLFxuICAgICAgICBjbGllbnRYOiAwLFxuICAgICAgICBjbGllbnRZOiAwLFxuICAgICAgICBvZmZzZXRYOiAwLFxuICAgICAgICBvZmZzZXRZOiAwXG4gICAgfTtcbiAgICB0aGlzLl9wb3NpdGlvbkhpc3RvcnkgPSBbXTtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IG51bGw7XG4gICAgdGhpcy5fcHJldkNvb3JkID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3ByZXZUaW1lID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2Rvd24gPSBmYWxzZTtcbiAgICB0aGlzLl9tb3ZlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2Rpc3BsYWNlbWVudCA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF07XG4gICAgdGhpcy5fZG9jdW1lbnRBY3RpdmUgPSBmYWxzZTtcbn1cbk1vdXNlU3luYy5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgY2xpY2tUaHJlc2hvbGQ6IHVuZGVmaW5lZCxcbiAgICBkaXJlY3Rpb246IHVuZGVmaW5lZCxcbiAgICByYWlsczogZmFsc2UsXG4gICAgc2NhbGU6IDEsXG4gICAgcHJvcG9nYXRlOiB0cnVlLFxuICAgIHZlbG9jaXR5U2FtcGxlTGVuZ3RoOiAxMCxcbiAgICBwcmV2ZW50RGVmYXVsdDogdHJ1ZVxufTtcbk1vdXNlU3luYy5ESVJFQ1RJT05fWCA9IDA7XG5Nb3VzZVN5bmMuRElSRUNUSU9OX1kgPSAxO1xudmFyIE1JTklNVU1fVElDS19USU1FID0gODtcbmZ1bmN0aW9uIF9oYW5kbGVTdGFydChldmVudCkge1xuICAgIHZhciBkZWx0YTtcbiAgICB2YXIgdmVsb2NpdHk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5wcmV2ZW50RGVmYXVsdClcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgeCA9IGV2ZW50LmNsaWVudFg7XG4gICAgdmFyIHkgPSBldmVudC5jbGllbnRZO1xuICAgIHRoaXMuX3ByZXZDb29yZCA9IFtcbiAgICAgICAgeCxcbiAgICAgICAgeVxuICAgIF07XG4gICAgdGhpcy5fcHJldlRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuX2Rvd24gPSB0cnVlO1xuICAgIHRoaXMuX21vdmUgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpcmVjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgZGVsdGEgPSAwO1xuICAgICAgICB2ZWxvY2l0eSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdO1xuICAgICAgICBkZWx0YSA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF07XG4gICAgICAgIHZlbG9jaXR5ID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5jbGlja1RocmVzaG9sZCkge1xuICAgICAgICB0aGlzLl9kaXNwbGFjZW1lbnQgPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdO1xuICAgIH1cbiAgICB2YXIgcGF5bG9hZCA9IHRoaXMuX3BheWxvYWQ7XG4gICAgcGF5bG9hZC5kZWx0YSA9IGRlbHRhO1xuICAgIHBheWxvYWQucG9zaXRpb24gPSB0aGlzLl9wb3NpdGlvbjtcbiAgICBwYXlsb2FkLnZlbG9jaXR5ID0gdmVsb2NpdHk7XG4gICAgcGF5bG9hZC5jbGllbnRYID0geDtcbiAgICBwYXlsb2FkLmNsaWVudFkgPSB5O1xuICAgIHBheWxvYWQub2Zmc2V0WCA9IGV2ZW50Lm9mZnNldFg7XG4gICAgcGF5bG9hZC5vZmZzZXRZID0gZXZlbnQub2Zmc2V0WTtcbiAgICB0aGlzLl9wb3NpdGlvbkhpc3RvcnkucHVzaCh7XG4gICAgICAgIHBvc2l0aW9uOiBwYXlsb2FkLnBvc2l0aW9uLnNsaWNlID8gcGF5bG9hZC5wb3NpdGlvbi5zbGljZSgwKSA6IHBheWxvYWQucG9zaXRpb24sXG4gICAgICAgIHRpbWU6IHRoaXMuX3ByZXZUaW1lXG4gICAgfSk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnc3RhcnQnLCBwYXlsb2FkKTtcbiAgICB0aGlzLl9kb2N1bWVudEFjdGl2ZSA9IGZhbHNlO1xufVxuZnVuY3Rpb24gX2hhbmRsZU1vdmUoZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuX3ByZXZDb29yZClcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciBwcmV2Q29vcmQgPSB0aGlzLl9wcmV2Q29vcmQ7XG4gICAgdmFyIHByZXZUaW1lID0gdGhpcy5fcHJldlRpbWU7XG4gICAgdmFyIHggPSBldmVudC5jbGllbnRYO1xuICAgIHZhciB5ID0gZXZlbnQuY2xpZW50WTtcbiAgICB2YXIgY3VyclRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHZhciBkaWZmWCA9IHggLSBwcmV2Q29vcmRbMF07XG4gICAgdmFyIGRpZmZZID0geSAtIHByZXZDb29yZFsxXTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnJhaWxzKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyhkaWZmWCkgPiBNYXRoLmFicyhkaWZmWSkpXG4gICAgICAgICAgICBkaWZmWSA9IDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRpZmZYID0gMDtcbiAgICB9XG4gICAgdmFyIGRpZmZUaW1lID0gTWF0aC5tYXgoY3VyclRpbWUgLSB0aGlzLl9wb3NpdGlvbkhpc3RvcnlbMF0udGltZSwgTUlOSU1VTV9USUNLX1RJTUUpO1xuICAgIHZhciBzY2FsZSA9IHRoaXMub3B0aW9ucy5zY2FsZTtcbiAgICB2YXIgbmV4dFZlbDtcbiAgICB2YXIgbmV4dERlbHRhO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZGlyZWN0aW9uID09PSBNb3VzZVN5bmMuRElSRUNUSU9OX1gpIHtcbiAgICAgICAgbmV4dERlbHRhID0gc2NhbGUgKiBkaWZmWDtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gKz0gbmV4dERlbHRhO1xuICAgICAgICBuZXh0VmVsID0gc2NhbGUgKiAodGhpcy5fcG9zaXRpb24gLSB0aGlzLl9wb3NpdGlvbkhpc3RvcnlbMF0ucG9zaXRpb24pIC8gZGlmZlRpbWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuZGlyZWN0aW9uID09PSBNb3VzZVN5bmMuRElSRUNUSU9OX1kpIHtcbiAgICAgICAgbmV4dERlbHRhID0gc2NhbGUgKiBkaWZmWTtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gKz0gbmV4dERlbHRhO1xuICAgICAgICBuZXh0VmVsID0gc2NhbGUgKiAodGhpcy5fcG9zaXRpb24gLSB0aGlzLl9wb3NpdGlvbkhpc3RvcnlbMF0ucG9zaXRpb24pIC8gZGlmZlRpbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dERlbHRhID0gW1xuICAgICAgICAgICAgc2NhbGUgKiBkaWZmWCxcbiAgICAgICAgICAgIHNjYWxlICogZGlmZllcbiAgICAgICAgXTtcbiAgICAgICAgbmV4dFZlbCA9IFtcbiAgICAgICAgICAgIHNjYWxlICogKHRoaXMuX3Bvc2l0aW9uWzBdIC0gdGhpcy5fcG9zaXRpb25IaXN0b3J5WzBdLnBvc2l0aW9uWzBdKSAvIGRpZmZUaW1lLFxuICAgICAgICAgICAgc2NhbGUgKiAodGhpcy5fcG9zaXRpb25bMV0gLSB0aGlzLl9wb3NpdGlvbkhpc3RvcnlbMF0ucG9zaXRpb25bMV0pIC8gZGlmZlRpbWVcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5fcG9zaXRpb25bMF0gKz0gbmV4dERlbHRhWzBdO1xuICAgICAgICB0aGlzLl9wb3NpdGlvblsxXSArPSBuZXh0RGVsdGFbMV07XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xpY2tUaHJlc2hvbGQgIT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX2Rpc3BsYWNlbWVudFswXSArPSBkaWZmWDtcbiAgICAgICAgdGhpcy5fZGlzcGxhY2VtZW50WzFdICs9IGRpZmZZO1xuICAgIH1cbiAgICB2YXIgcGF5bG9hZCA9IHRoaXMuX3BheWxvYWQ7XG4gICAgcGF5bG9hZC5kZWx0YSA9IG5leHREZWx0YTtcbiAgICBwYXlsb2FkLnBvc2l0aW9uID0gdGhpcy5fcG9zaXRpb247XG4gICAgcGF5bG9hZC52ZWxvY2l0eSA9IG5leHRWZWw7XG4gICAgcGF5bG9hZC5jbGllbnRYID0geDtcbiAgICBwYXlsb2FkLmNsaWVudFkgPSB5O1xuICAgIHBheWxvYWQub2Zmc2V0WCA9IGV2ZW50Lm9mZnNldFg7XG4gICAgcGF5bG9hZC5vZmZzZXRZID0gZXZlbnQub2Zmc2V0WTtcbiAgICBpZiAodGhpcy5fcG9zaXRpb25IaXN0b3J5Lmxlbmd0aCA9PT0gdGhpcy5vcHRpb25zLnZlbG9jaXR5U2FtcGxlTGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uSGlzdG9yeS5zaGlmdCgpO1xuICAgIH1cbiAgICB0aGlzLl9wb3NpdGlvbkhpc3RvcnkucHVzaCh7XG4gICAgICAgIHBvc2l0aW9uOiBwYXlsb2FkLnBvc2l0aW9uLnNsaWNlID8gcGF5bG9hZC5wb3NpdGlvbi5zbGljZSgwKSA6IHBheWxvYWQucG9zaXRpb24sXG4gICAgICAgIHRpbWU6IGN1cnJUaW1lXG4gICAgfSk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgndXBkYXRlJywgcGF5bG9hZCk7XG4gICAgdGhpcy5fcHJldkNvb3JkID0gW1xuICAgICAgICB4LFxuICAgICAgICB5XG4gICAgXTtcbiAgICB0aGlzLl9wcmV2VGltZSA9IGN1cnJUaW1lO1xuICAgIHRoaXMuX21vdmUgPSB0cnVlO1xufVxuZnVuY3Rpb24gX2hhbmRsZUVuZChldmVudCkge1xuICAgIGlmICghdGhpcy5fZG93bilcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2VuZCcsIHRoaXMuX3BheWxvYWQpO1xuICAgIHRoaXMuX3ByZXZDb29yZCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9wcmV2VGltZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9kb3duID0gZmFsc2U7XG4gICAgdGhpcy5fbW92ZSA9IGZhbHNlO1xuICAgIHRoaXMuX3Bvc2l0aW9uSGlzdG9yeSA9IFtdO1xufVxuZnVuY3Rpb24gX2hhbmRsZUxlYXZlKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLl9kb3duIHx8ICF0aGlzLl9tb3ZlKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKCF0aGlzLl9kb2N1bWVudEFjdGl2ZSkge1xuICAgICAgICB2YXIgYm91bmRNb3ZlID0gX2hhbmRsZU1vdmUuYmluZCh0aGlzKTtcbiAgICAgICAgdmFyIGJvdW5kRW5kID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgX2hhbmRsZUVuZC5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBib3VuZE1vdmUpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBib3VuZEVuZCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcywgZXZlbnQpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBib3VuZE1vdmUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgYm91bmRFbmQpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudEFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuTW91c2VTeW5jLnByb3RvdHlwZS5nZXRPcHRpb25zID0gZnVuY3Rpb24gZ2V0T3B0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zO1xufTtcbk1vdXNlU3luYy5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zTWFuYWdlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gTW91c2VTeW5jOyIsInZhciBUb3VjaFRyYWNrZXIgPSByZXF1aXJlKCcuL1RvdWNoVHJhY2tlcicpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4uL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCcuLi9jb3JlL09wdGlvbnNNYW5hZ2VyJyk7XG5mdW5jdGlvbiBUb3VjaFN5bmMob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoVG91Y2hTeW5jLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgdGhpcy5fb3B0aW9uc01hbmFnZXIgPSBuZXcgT3B0aW9uc01hbmFnZXIodGhpcy5vcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX3RvdWNoVHJhY2tlciA9IG5ldyBUb3VjaFRyYWNrZXIoeyB0b3VjaExpbWl0OiB0aGlzLm9wdGlvbnMudG91Y2hMaW1pdCB9KTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldElucHV0SGFuZGxlcih0aGlzLCB0aGlzLl90b3VjaFRyYWNrZXIpO1xuICAgIHRoaXMuX3RvdWNoVHJhY2tlci5vbigndHJhY2tzdGFydCcsIF9oYW5kbGVTdGFydC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl90b3VjaFRyYWNrZXIub24oJ3RyYWNrbW92ZScsIF9oYW5kbGVNb3ZlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX3RvdWNoVHJhY2tlci5vbigndHJhY2tlbmQnLCBfaGFuZGxlRW5kLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX3BheWxvYWQgPSB7XG4gICAgICAgIGRlbHRhOiBudWxsLFxuICAgICAgICBwb3NpdGlvbjogbnVsbCxcbiAgICAgICAgdmVsb2NpdHk6IG51bGwsXG4gICAgICAgIGNsaWVudFg6IHVuZGVmaW5lZCxcbiAgICAgICAgY2xpZW50WTogdW5kZWZpbmVkLFxuICAgICAgICBjb3VudDogMCxcbiAgICAgICAgdG91Y2g6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgdGhpcy5fcG9zaXRpb24gPSBudWxsO1xufVxuVG91Y2hTeW5jLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBkaXJlY3Rpb246IHVuZGVmaW5lZCxcbiAgICByYWlsczogZmFsc2UsXG4gICAgdG91Y2hMaW1pdDogMSxcbiAgICB2ZWxvY2l0eVNhbXBsZUxlbmd0aDogMTAsXG4gICAgc2NhbGU6IDFcbn07XG5Ub3VjaFN5bmMuRElSRUNUSU9OX1ggPSAwO1xuVG91Y2hTeW5jLkRJUkVDVElPTl9ZID0gMTtcbnZhciBNSU5JTVVNX1RJQ0tfVElNRSA9IDg7XG5mdW5jdGlvbiBfaGFuZGxlU3RhcnQoZGF0YSkge1xuICAgIHZhciB2ZWxvY2l0eTtcbiAgICB2YXIgZGVsdGE7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IDA7XG4gICAgICAgIHZlbG9jaXR5ID0gMDtcbiAgICAgICAgZGVsdGEgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXTtcbiAgICAgICAgdmVsb2NpdHkgPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdO1xuICAgICAgICBkZWx0YSA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF07XG4gICAgfVxuICAgIHZhciBwYXlsb2FkID0gdGhpcy5fcGF5bG9hZDtcbiAgICBwYXlsb2FkLmRlbHRhID0gZGVsdGE7XG4gICAgcGF5bG9hZC5wb3NpdGlvbiA9IHRoaXMuX3Bvc2l0aW9uO1xuICAgIHBheWxvYWQudmVsb2NpdHkgPSB2ZWxvY2l0eTtcbiAgICBwYXlsb2FkLmNsaWVudFggPSBkYXRhLng7XG4gICAgcGF5bG9hZC5jbGllbnRZID0gZGF0YS55O1xuICAgIHBheWxvYWQuY291bnQgPSBkYXRhLmNvdW50O1xuICAgIHBheWxvYWQudG91Y2ggPSBkYXRhLmlkZW50aWZpZXI7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnc3RhcnQnLCBwYXlsb2FkKTtcbn1cbmZ1bmN0aW9uIF9oYW5kbGVNb3ZlKGRhdGEpIHtcbiAgICB2YXIgaGlzdG9yeSA9IGRhdGEuaGlzdG9yeTtcbiAgICB2YXIgY3Vyckhpc3RvcnkgPSBoaXN0b3J5W2hpc3RvcnkubGVuZ3RoIC0gMV07XG4gICAgdmFyIHByZXZIaXN0b3J5ID0gaGlzdG9yeVtoaXN0b3J5Lmxlbmd0aCAtIDJdO1xuICAgIHZhciBkaXN0YW50SGlzdG9yeSA9IGhpc3RvcnlbaGlzdG9yeS5sZW5ndGggLSB0aGlzLm9wdGlvbnMudmVsb2NpdHlTYW1wbGVMZW5ndGhdID8gaGlzdG9yeVtoaXN0b3J5Lmxlbmd0aCAtIHRoaXMub3B0aW9ucy52ZWxvY2l0eVNhbXBsZUxlbmd0aF0gOiBoaXN0b3J5W2hpc3RvcnkubGVuZ3RoIC0gMl07XG4gICAgdmFyIGRpc3RhbnRUaW1lID0gZGlzdGFudEhpc3RvcnkudGltZXN0YW1wO1xuICAgIHZhciBjdXJyVGltZSA9IGN1cnJIaXN0b3J5LnRpbWVzdGFtcDtcbiAgICB2YXIgZGlmZlggPSBjdXJySGlzdG9yeS54IC0gcHJldkhpc3RvcnkueDtcbiAgICB2YXIgZGlmZlkgPSBjdXJySGlzdG9yeS55IC0gcHJldkhpc3RvcnkueTtcbiAgICB2YXIgdmVsRGlmZlggPSBjdXJySGlzdG9yeS54IC0gZGlzdGFudEhpc3RvcnkueDtcbiAgICB2YXIgdmVsRGlmZlkgPSBjdXJySGlzdG9yeS55IC0gZGlzdGFudEhpc3RvcnkueTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnJhaWxzKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyhkaWZmWCkgPiBNYXRoLmFicyhkaWZmWSkpXG4gICAgICAgICAgICBkaWZmWSA9IDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRpZmZYID0gMDtcbiAgICAgICAgaWYgKE1hdGguYWJzKHZlbERpZmZYKSA+IE1hdGguYWJzKHZlbERpZmZZKSlcbiAgICAgICAgICAgIHZlbERpZmZZID0gMDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdmVsRGlmZlggPSAwO1xuICAgIH1cbiAgICB2YXIgZGlmZlRpbWUgPSBNYXRoLm1heChjdXJyVGltZSAtIGRpc3RhbnRUaW1lLCBNSU5JTVVNX1RJQ0tfVElNRSk7XG4gICAgdmFyIHZlbFggPSB2ZWxEaWZmWCAvIGRpZmZUaW1lO1xuICAgIHZhciB2ZWxZID0gdmVsRGlmZlkgLyBkaWZmVGltZTtcbiAgICB2YXIgc2NhbGUgPSB0aGlzLm9wdGlvbnMuc2NhbGU7XG4gICAgdmFyIG5leHRWZWw7XG4gICAgdmFyIG5leHREZWx0YTtcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PT0gVG91Y2hTeW5jLkRJUkVDVElPTl9YKSB7XG4gICAgICAgIG5leHREZWx0YSA9IHNjYWxlICogZGlmZlg7XG4gICAgICAgIG5leHRWZWwgPSBzY2FsZSAqIHZlbFg7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uICs9IG5leHREZWx0YTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT09IFRvdWNoU3luYy5ESVJFQ1RJT05fWSkge1xuICAgICAgICBuZXh0RGVsdGEgPSBzY2FsZSAqIGRpZmZZO1xuICAgICAgICBuZXh0VmVsID0gc2NhbGUgKiB2ZWxZO1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiArPSBuZXh0RGVsdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dERlbHRhID0gW1xuICAgICAgICAgICAgc2NhbGUgKiBkaWZmWCxcbiAgICAgICAgICAgIHNjYWxlICogZGlmZllcbiAgICAgICAgXTtcbiAgICAgICAgbmV4dFZlbCA9IFtcbiAgICAgICAgICAgIHNjYWxlICogdmVsWCxcbiAgICAgICAgICAgIHNjYWxlICogdmVsWVxuICAgICAgICBdO1xuICAgICAgICB0aGlzLl9wb3NpdGlvblswXSArPSBuZXh0RGVsdGFbMF07XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uWzFdICs9IG5leHREZWx0YVsxXTtcbiAgICB9XG4gICAgdmFyIHBheWxvYWQgPSB0aGlzLl9wYXlsb2FkO1xuICAgIHBheWxvYWQuZGVsdGEgPSBuZXh0RGVsdGE7XG4gICAgcGF5bG9hZC52ZWxvY2l0eSA9IG5leHRWZWw7XG4gICAgcGF5bG9hZC5wb3NpdGlvbiA9IHRoaXMuX3Bvc2l0aW9uO1xuICAgIHBheWxvYWQuY2xpZW50WCA9IGRhdGEueDtcbiAgICBwYXlsb2FkLmNsaWVudFkgPSBkYXRhLnk7XG4gICAgcGF5bG9hZC5jb3VudCA9IGRhdGEuY291bnQ7XG4gICAgcGF5bG9hZC50b3VjaCA9IGRhdGEuaWRlbnRpZmllcjtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCd1cGRhdGUnLCBwYXlsb2FkKTtcbn1cbmZ1bmN0aW9uIF9oYW5kbGVFbmQoZGF0YSkge1xuICAgIHRoaXMuX3BheWxvYWQuY291bnQgPSBkYXRhLmNvdW50O1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2VuZCcsIHRoaXMuX3BheWxvYWQpO1xufVxuVG91Y2hTeW5jLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnNNYW5hZ2VyLnNldE9wdGlvbnMob3B0aW9ucyk7XG59O1xuVG91Y2hTeW5jLnByb3RvdHlwZS5nZXRPcHRpb25zID0gZnVuY3Rpb24gZ2V0T3B0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zO1xufTtcbm1vZHVsZS5leHBvcnRzID0gVG91Y2hTeW5jOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuLi9jb3JlL0V2ZW50SGFuZGxlcicpO1xudmFyIF9ub3cgPSBEYXRlLm5vdztcbmZ1bmN0aW9uIF90aW1lc3RhbXBUb3VjaCh0b3VjaCwgZXZlbnQsIGhpc3RvcnkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiB0b3VjaC5jbGllbnRYLFxuICAgICAgICB5OiB0b3VjaC5jbGllbnRZLFxuICAgICAgICBpZGVudGlmaWVyOiB0b3VjaC5pZGVudGlmaWVyLFxuICAgICAgICBvcmlnaW46IGV2ZW50Lm9yaWdpbixcbiAgICAgICAgdGltZXN0YW1wOiBfbm93KCksXG4gICAgICAgIGNvdW50OiBldmVudC50b3VjaGVzLmxlbmd0aCxcbiAgICAgICAgaGlzdG9yeTogaGlzdG9yeVxuICAgIH07XG59XG5mdW5jdGlvbiBfaGFuZGxlU3RhcnQoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPiB0aGlzLnRvdWNoTGltaXQpXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLmlzVG91Y2hlZCA9IHRydWU7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXTtcbiAgICAgICAgdmFyIGRhdGEgPSBfdGltZXN0YW1wVG91Y2godG91Y2gsIGV2ZW50LCBudWxsKTtcbiAgICAgICAgdGhpcy5ldmVudE91dHB1dC5lbWl0KCd0cmFja3N0YXJ0JywgZGF0YSk7XG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RpdmUgJiYgIXRoaXMudG91Y2hIaXN0b3J5W3RvdWNoLmlkZW50aWZpZXJdKVxuICAgICAgICAgICAgdGhpcy50cmFjayhkYXRhKTtcbiAgICB9XG59XG5mdW5jdGlvbiBfaGFuZGxlTW92ZShldmVudCkge1xuICAgIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA+IHRoaXMudG91Y2hMaW1pdClcbiAgICAgICAgcmV0dXJuO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbaV07XG4gICAgICAgIHZhciBoaXN0b3J5ID0gdGhpcy50b3VjaEhpc3RvcnlbdG91Y2guaWRlbnRpZmllcl07XG4gICAgICAgIGlmIChoaXN0b3J5KSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IF90aW1lc3RhbXBUb3VjaCh0b3VjaCwgZXZlbnQsIGhpc3RvcnkpO1xuICAgICAgICAgICAgdGhpcy50b3VjaEhpc3RvcnlbdG91Y2guaWRlbnRpZmllcl0ucHVzaChkYXRhKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRPdXRwdXQuZW1pdCgndHJhY2ttb3ZlJywgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBfaGFuZGxlRW5kKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmlzVG91Y2hlZClcbiAgICAgICAgcmV0dXJuO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbaV07XG4gICAgICAgIHZhciBoaXN0b3J5ID0gdGhpcy50b3VjaEhpc3RvcnlbdG91Y2guaWRlbnRpZmllcl07XG4gICAgICAgIGlmIChoaXN0b3J5KSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IF90aW1lc3RhbXBUb3VjaCh0b3VjaCwgZXZlbnQsIGhpc3RvcnkpO1xuICAgICAgICAgICAgdGhpcy5ldmVudE91dHB1dC5lbWl0KCd0cmFja2VuZCcsIGRhdGEpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMudG91Y2hIaXN0b3J5W3RvdWNoLmlkZW50aWZpZXJdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuaXNUb3VjaGVkID0gZmFsc2U7XG59XG5mdW5jdGlvbiBfaGFuZGxlVW5waXBlKCkge1xuICAgIGZvciAodmFyIGkgaW4gdGhpcy50b3VjaEhpc3RvcnkpIHtcbiAgICAgICAgdmFyIGhpc3RvcnkgPSB0aGlzLnRvdWNoSGlzdG9yeVtpXTtcbiAgICAgICAgdGhpcy5ldmVudE91dHB1dC5lbWl0KCd0cmFja2VuZCcsIHtcbiAgICAgICAgICAgIHRvdWNoOiBoaXN0b3J5W2hpc3RvcnkubGVuZ3RoIC0gMV0udG91Y2gsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgICAgIGhpc3Rvcnk6IGhpc3RvcnlcbiAgICAgICAgfSk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnRvdWNoSGlzdG9yeVtpXTtcbiAgICB9XG59XG5mdW5jdGlvbiBUb3VjaFRyYWNrZXIob3B0aW9ucykge1xuICAgIHRoaXMuc2VsZWN0aXZlID0gb3B0aW9ucy5zZWxlY3RpdmU7XG4gICAgdGhpcy50b3VjaExpbWl0ID0gb3B0aW9ucy50b3VjaExpbWl0IHx8IDE7XG4gICAgdGhpcy50b3VjaEhpc3RvcnkgPSB7fTtcbiAgICB0aGlzLmV2ZW50SW5wdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0SW5wdXRIYW5kbGVyKHRoaXMsIHRoaXMuZXZlbnRJbnB1dCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5ldmVudE91dHB1dCk7XG4gICAgdGhpcy5ldmVudElucHV0Lm9uKCd0b3VjaHN0YXJ0JywgX2hhbmRsZVN0YXJ0LmJpbmQodGhpcykpO1xuICAgIHRoaXMuZXZlbnRJbnB1dC5vbigndG91Y2htb3ZlJywgX2hhbmRsZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5ldmVudElucHV0Lm9uKCd0b3VjaGVuZCcsIF9oYW5kbGVFbmQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5ldmVudElucHV0Lm9uKCd0b3VjaGNhbmNlbCcsIF9oYW5kbGVFbmQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5ldmVudElucHV0Lm9uKCd1bnBpcGUnLCBfaGFuZGxlVW5waXBlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuaXNUb3VjaGVkID0gZmFsc2U7XG59XG5Ub3VjaFRyYWNrZXIucHJvdG90eXBlLnRyYWNrID0gZnVuY3Rpb24gdHJhY2soZGF0YSkge1xuICAgIHRoaXMudG91Y2hIaXN0b3J5W2RhdGEuaWRlbnRpZmllcl0gPSBbZGF0YV07XG59O1xubW9kdWxlLmV4cG9ydHMgPSBUb3VjaFRyYWNrZXI7IiwiZnVuY3Rpb24gVmVjdG9yKHgsIHksIHopIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB4ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMuc2V0KHgpO1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnggPSB4IHx8IDA7XG4gICAgICAgIHRoaXMueSA9IHkgfHwgMDtcbiAgICAgICAgdGhpcy56ID0geiB8fCAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn1cbnZhciBfcmVnaXN0ZXIgPSBuZXcgVmVjdG9yKDAsIDAsIDApO1xuVmVjdG9yLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQodikge1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwoX3JlZ2lzdGVyLCB0aGlzLnggKyB2LngsIHRoaXMueSArIHYueSwgdGhpcy56ICsgdi56KTtcbn07XG5WZWN0b3IucHJvdG90eXBlLnN1YiA9IGZ1bmN0aW9uIHN1Yih2KSB7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbChfcmVnaXN0ZXIsIHRoaXMueCAtIHYueCwgdGhpcy55IC0gdi55LCB0aGlzLnogLSB2LnopO1xufTtcblZlY3Rvci5wcm90b3R5cGUubXVsdCA9IGZ1bmN0aW9uIG11bHQocikge1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwoX3JlZ2lzdGVyLCByICogdGhpcy54LCByICogdGhpcy55LCByICogdGhpcy56KTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmRpdiA9IGZ1bmN0aW9uIGRpdihyKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdCgxIC8gcik7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5jcm9zcyA9IGZ1bmN0aW9uIGNyb3NzKHYpIHtcbiAgICB2YXIgeCA9IHRoaXMueDtcbiAgICB2YXIgeSA9IHRoaXMueTtcbiAgICB2YXIgeiA9IHRoaXMuejtcbiAgICB2YXIgdnggPSB2Lng7XG4gICAgdmFyIHZ5ID0gdi55O1xuICAgIHZhciB2eiA9IHYuejtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKF9yZWdpc3RlciwgeiAqIHZ5IC0geSAqIHZ6LCB4ICogdnogLSB6ICogdngsIHkgKiB2eCAtIHggKiB2eSk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHModikge1xuICAgIHJldHVybiB2LnggPT09IHRoaXMueCAmJiB2LnkgPT09IHRoaXMueSAmJiB2LnogPT09IHRoaXMuejtcbn07XG5WZWN0b3IucHJvdG90eXBlLnJvdGF0ZVggPSBmdW5jdGlvbiByb3RhdGVYKHRoZXRhKSB7XG4gICAgdmFyIHggPSB0aGlzLng7XG4gICAgdmFyIHkgPSB0aGlzLnk7XG4gICAgdmFyIHogPSB0aGlzLno7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKF9yZWdpc3RlciwgeCwgeSAqIGNvc1RoZXRhIC0geiAqIHNpblRoZXRhLCB5ICogc2luVGhldGEgKyB6ICogY29zVGhldGEpO1xufTtcblZlY3Rvci5wcm90b3R5cGUucm90YXRlWSA9IGZ1bmN0aW9uIHJvdGF0ZVkodGhldGEpIHtcbiAgICB2YXIgeCA9IHRoaXMueDtcbiAgICB2YXIgeSA9IHRoaXMueTtcbiAgICB2YXIgeiA9IHRoaXMuejtcbiAgICB2YXIgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwoX3JlZ2lzdGVyLCB6ICogc2luVGhldGEgKyB4ICogY29zVGhldGEsIHksIHogKiBjb3NUaGV0YSAtIHggKiBzaW5UaGV0YSk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5yb3RhdGVaID0gZnVuY3Rpb24gcm90YXRlWih0aGV0YSkge1xuICAgIHZhciB4ID0gdGhpcy54O1xuICAgIHZhciB5ID0gdGhpcy55O1xuICAgIHZhciB6ID0gdGhpcy56O1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbChfcmVnaXN0ZXIsIHggKiBjb3NUaGV0YSAtIHkgKiBzaW5UaGV0YSwgeCAqIHNpblRoZXRhICsgeSAqIGNvc1RoZXRhLCB6KTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uIGRvdCh2KSB7XG4gICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueSArIHRoaXMueiAqIHYuejtcbn07XG5WZWN0b3IucHJvdG90eXBlLm5vcm1TcXVhcmVkID0gZnVuY3Rpb24gbm9ybVNxdWFyZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZG90KHRoaXMpO1xufTtcblZlY3Rvci5wcm90b3R5cGUubm9ybSA9IGZ1bmN0aW9uIG5vcm0oKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLm5vcm1TcXVhcmVkKCkpO1xufTtcblZlY3Rvci5wcm90b3R5cGUubm9ybWFsaXplID0gZnVuY3Rpb24gbm9ybWFsaXplKGxlbmd0aCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgICBsZW5ndGggPSAxO1xuICAgIHZhciBub3JtID0gdGhpcy5ub3JtKCk7XG4gICAgaWYgKG5vcm0gPiAxZS03KVxuICAgICAgICByZXR1cm4gX3NldEZyb21WZWN0b3IuY2FsbChfcmVnaXN0ZXIsIHRoaXMubXVsdChsZW5ndGggLyBub3JtKSk7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gX3NldFhZWi5jYWxsKF9yZWdpc3RlciwgbGVuZ3RoLCAwLCAwKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcyk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5pc1plcm8gPSBmdW5jdGlvbiBpc1plcm8oKSB7XG4gICAgcmV0dXJuICEodGhpcy54IHx8IHRoaXMueSB8fCB0aGlzLnopO1xufTtcbmZ1bmN0aW9uIF9zZXRYWVooeCwgeSwgeikge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnogPSB6O1xuICAgIHJldHVybiB0aGlzO1xufVxuZnVuY3Rpb24gX3NldEZyb21BcnJheSh2KSB7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbCh0aGlzLCB2WzBdLCB2WzFdLCB2WzJdIHx8IDApO1xufVxuZnVuY3Rpb24gX3NldEZyb21WZWN0b3Iodikge1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwodGhpcywgdi54LCB2LnksIHYueik7XG59XG5mdW5jdGlvbiBfc2V0RnJvbU51bWJlcih4KSB7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbCh0aGlzLCB4LCAwLCAwKTtcbn1cblZlY3Rvci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KHYpIHtcbiAgICBpZiAodiBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICByZXR1cm4gX3NldEZyb21BcnJheS5jYWxsKHRoaXMsIHYpO1xuICAgIGlmICh0eXBlb2YgdiA9PT0gJ251bWJlcicpXG4gICAgICAgIHJldHVybiBfc2V0RnJvbU51bWJlci5jYWxsKHRoaXMsIHYpO1xuICAgIHJldHVybiBfc2V0RnJvbVZlY3Rvci5jYWxsKHRoaXMsIHYpO1xufTtcblZlY3Rvci5wcm90b3R5cGUuc2V0WFlaID0gZnVuY3Rpb24gKHgsIHksIHopIHtcbiAgICByZXR1cm4gX3NldFhZWi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcblZlY3Rvci5wcm90b3R5cGUuc2V0MUQgPSBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiBfc2V0RnJvbU51bWJlci5jYWxsKHRoaXMsIHgpO1xufTtcblZlY3Rvci5wcm90b3R5cGUucHV0ID0gZnVuY3Rpb24gcHV0KHYpIHtcbiAgICBpZiAodGhpcyA9PT0gX3JlZ2lzdGVyKVxuICAgICAgICBfc2V0RnJvbVZlY3Rvci5jYWxsKHYsIF9yZWdpc3Rlcik7XG4gICAgZWxzZVxuICAgICAgICBfc2V0RnJvbVZlY3Rvci5jYWxsKHYsIHRoaXMpO1xufTtcblZlY3Rvci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKHRoaXMsIDAsIDAsIDApO1xufTtcblZlY3Rvci5wcm90b3R5cGUuY2FwID0gZnVuY3Rpb24gY2FwKGNhcCkge1xuICAgIGlmIChjYXAgPT09IEluZmluaXR5KVxuICAgICAgICByZXR1cm4gX3NldEZyb21WZWN0b3IuY2FsbChfcmVnaXN0ZXIsIHRoaXMpO1xuICAgIHZhciBub3JtID0gdGhpcy5ub3JtKCk7XG4gICAgaWYgKG5vcm0gPiBjYXApXG4gICAgICAgIHJldHVybiBfc2V0RnJvbVZlY3Rvci5jYWxsKF9yZWdpc3RlciwgdGhpcy5tdWx0KGNhcCAvIG5vcm0pKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBfc2V0RnJvbVZlY3Rvci5jYWxsKF9yZWdpc3RlciwgdGhpcyk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5wcm9qZWN0ID0gZnVuY3Rpb24gcHJvamVjdChuKSB7XG4gICAgcmV0dXJuIG4ubXVsdCh0aGlzLmRvdChuKSk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5yZWZsZWN0QWNyb3NzID0gZnVuY3Rpb24gcmVmbGVjdEFjcm9zcyhuKSB7XG4gICAgbi5ub3JtYWxpemUoKS5wdXQobik7XG4gICAgcmV0dXJuIF9zZXRGcm9tVmVjdG9yKF9yZWdpc3RlciwgdGhpcy5zdWIodGhpcy5wcm9qZWN0KG4pLm11bHQoMikpKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICB0aGlzLngsXG4gICAgICAgIHRoaXMueSxcbiAgICAgICAgdGhpcy56XG4gICAgXTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmdldDFEID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLng7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBWZWN0b3I7IiwidmFyIE1vZGlmaWVyID0gcmVxdWlyZSgnLi4vY29yZS9Nb2RpZmllcicpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJy4uL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCcuLi90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZScpO1xudmFyIFRyYW5zaXRpb25hYmxlVHJhbnNmb3JtID0gcmVxdWlyZSgnLi4vdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0nKTtcbmZ1bmN0aW9uIFN0YXRlTW9kaWZpZXIob3B0aW9ucykge1xuICAgIHRoaXMuX3RyYW5zZm9ybVN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlVHJhbnNmb3JtKFRyYW5zZm9ybS5pZGVudGl0eSk7XG4gICAgdGhpcy5fb3BhY2l0eVN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKDEpO1xuICAgIHRoaXMuX29yaWdpblN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0pO1xuICAgIHRoaXMuX2FsaWduU3RhdGUgPSBuZXcgVHJhbnNpdGlvbmFibGUoW1xuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSk7XG4gICAgdGhpcy5fc2l6ZVN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0pO1xuICAgIHRoaXMuX3Byb3BvcnRpb25zU3RhdGUgPSBuZXcgVHJhbnNpdGlvbmFibGUoW1xuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSk7XG4gICAgdGhpcy5fbW9kaWZpZXIgPSBuZXcgTW9kaWZpZXIoe1xuICAgICAgICB0cmFuc2Zvcm06IHRoaXMuX3RyYW5zZm9ybVN0YXRlLFxuICAgICAgICBvcGFjaXR5OiB0aGlzLl9vcGFjaXR5U3RhdGUsXG4gICAgICAgIG9yaWdpbjogbnVsbCxcbiAgICAgICAgYWxpZ246IG51bGwsXG4gICAgICAgIHNpemU6IG51bGwsXG4gICAgICAgIHByb3BvcnRpb25zOiBudWxsXG4gICAgfSk7XG4gICAgdGhpcy5faGFzT3JpZ2luID0gZmFsc2U7XG4gICAgdGhpcy5faGFzQWxpZ24gPSBmYWxzZTtcbiAgICB0aGlzLl9oYXNTaXplID0gZmFsc2U7XG4gICAgdGhpcy5faGFzUHJvcG9ydGlvbnMgPSBmYWxzZTtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucy50cmFuc2Zvcm0pXG4gICAgICAgICAgICB0aGlzLnNldFRyYW5zZm9ybShvcHRpb25zLnRyYW5zZm9ybSk7XG4gICAgICAgIGlmIChvcHRpb25zLm9wYWNpdHkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRoaXMuc2V0T3BhY2l0eShvcHRpb25zLm9wYWNpdHkpO1xuICAgICAgICBpZiAob3B0aW9ucy5vcmlnaW4pXG4gICAgICAgICAgICB0aGlzLnNldE9yaWdpbihvcHRpb25zLm9yaWdpbik7XG4gICAgICAgIGlmIChvcHRpb25zLmFsaWduKVxuICAgICAgICAgICAgdGhpcy5zZXRBbGlnbihvcHRpb25zLmFsaWduKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuc2l6ZSlcbiAgICAgICAgICAgIHRoaXMuc2V0U2l6ZShvcHRpb25zLnNpemUpO1xuICAgICAgICBpZiAob3B0aW9ucy5wcm9wb3J0aW9ucylcbiAgICAgICAgICAgIHRoaXMuc2V0UHJvcG9ydGlvbnMob3B0aW9ucy5wcm9wb3J0aW9ucyk7XG4gICAgfVxufVxuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuc2V0VHJhbnNmb3JtID0gZnVuY3Rpb24gc2V0VHJhbnNmb3JtKHRyYW5zZm9ybSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLl90cmFuc2Zvcm1TdGF0ZS5zZXQodHJhbnNmb3JtLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuc2V0T3BhY2l0eSA9IGZ1bmN0aW9uIHNldE9wYWNpdHkob3BhY2l0eSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLl9vcGFjaXR5U3RhdGUuc2V0KG9wYWNpdHksIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5zZXRPcmlnaW4gPSBmdW5jdGlvbiBzZXRPcmlnaW4ob3JpZ2luLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmIChvcmlnaW4gPT09IG51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMuX2hhc09yaWdpbikge1xuICAgICAgICAgICAgdGhpcy5fbW9kaWZpZXIub3JpZ2luRnJvbShudWxsKTtcbiAgICAgICAgICAgIHRoaXMuX2hhc09yaWdpbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuX2hhc09yaWdpbikge1xuICAgICAgICB0aGlzLl9oYXNPcmlnaW4gPSB0cnVlO1xuICAgICAgICB0aGlzLl9tb2RpZmllci5vcmlnaW5Gcm9tKHRoaXMuX29yaWdpblN0YXRlKTtcbiAgICB9XG4gICAgdGhpcy5fb3JpZ2luU3RhdGUuc2V0KG9yaWdpbiwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xufTtcblN0YXRlTW9kaWZpZXIucHJvdG90eXBlLnNldEFsaWduID0gZnVuY3Rpb24gc2V0T3JpZ2luKGFsaWduLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmIChhbGlnbiA9PT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5faGFzQWxpZ24pIHtcbiAgICAgICAgICAgIHRoaXMuX21vZGlmaWVyLmFsaWduRnJvbShudWxsKTtcbiAgICAgICAgICAgIHRoaXMuX2hhc0FsaWduID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIGlmICghdGhpcy5faGFzQWxpZ24pIHtcbiAgICAgICAgdGhpcy5faGFzQWxpZ24gPSB0cnVlO1xuICAgICAgICB0aGlzLl9tb2RpZmllci5hbGlnbkZyb20odGhpcy5fYWxpZ25TdGF0ZSk7XG4gICAgfVxuICAgIHRoaXMuX2FsaWduU3RhdGUuc2V0KGFsaWduLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uIHNldFNpemUoc2l6ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoc2l6ZSA9PT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5faGFzU2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5fbW9kaWZpZXIuc2l6ZUZyb20obnVsbCk7XG4gICAgICAgICAgICB0aGlzLl9oYXNTaXplID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIGlmICghdGhpcy5faGFzU2l6ZSkge1xuICAgICAgICB0aGlzLl9oYXNTaXplID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fbW9kaWZpZXIuc2l6ZUZyb20odGhpcy5fc2l6ZVN0YXRlKTtcbiAgICB9XG4gICAgdGhpcy5fc2l6ZVN0YXRlLnNldChzaXplLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuc2V0UHJvcG9ydGlvbnMgPSBmdW5jdGlvbiBzZXRTaXplKHByb3BvcnRpb25zLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmIChwcm9wb3J0aW9ucyA9PT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5faGFzUHJvcG9ydGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuX21vZGlmaWVyLnByb3BvcnRpb25zRnJvbShudWxsKTtcbiAgICAgICAgICAgIHRoaXMuX2hhc1Byb3BvcnRpb25zID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIGlmICghdGhpcy5faGFzUHJvcG9ydGlvbnMpIHtcbiAgICAgICAgdGhpcy5faGFzUHJvcG9ydGlvbnMgPSB0cnVlO1xuICAgICAgICB0aGlzLl9tb2RpZmllci5wcm9wb3J0aW9uc0Zyb20odGhpcy5fcHJvcG9ydGlvbnNTdGF0ZSk7XG4gICAgfVxuICAgIHRoaXMuX3Byb3BvcnRpb25zU3RhdGUuc2V0KHByb3BvcnRpb25zLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuaGFsdCA9IGZ1bmN0aW9uIGhhbHQoKSB7XG4gICAgdGhpcy5fdHJhbnNmb3JtU3RhdGUuaGFsdCgpO1xuICAgIHRoaXMuX29wYWNpdHlTdGF0ZS5oYWx0KCk7XG4gICAgdGhpcy5fb3JpZ2luU3RhdGUuaGFsdCgpO1xuICAgIHRoaXMuX2FsaWduU3RhdGUuaGFsdCgpO1xuICAgIHRoaXMuX3NpemVTdGF0ZS5oYWx0KCk7XG4gICAgdGhpcy5fcHJvcG9ydGlvbnNTdGF0ZS5oYWx0KCk7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuZ2V0VHJhbnNmb3JtID0gZnVuY3Rpb24gZ2V0VHJhbnNmb3JtKCkge1xuICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm1TdGF0ZS5nZXQoKTtcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5nZXRGaW5hbFRyYW5zZm9ybSA9IGZ1bmN0aW9uIGdldEZpbmFsVHJhbnNmb3JtKCkge1xuICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm1TdGF0ZS5nZXRGaW5hbCgpO1xufTtcblN0YXRlTW9kaWZpZXIucHJvdG90eXBlLmdldE9wYWNpdHkgPSBmdW5jdGlvbiBnZXRPcGFjaXR5KCkge1xuICAgIHJldHVybiB0aGlzLl9vcGFjaXR5U3RhdGUuZ2V0KCk7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuZ2V0T3JpZ2luID0gZnVuY3Rpb24gZ2V0T3JpZ2luKCkge1xuICAgIHJldHVybiB0aGlzLl9oYXNPcmlnaW4gPyB0aGlzLl9vcmlnaW5TdGF0ZS5nZXQoKSA6IG51bGw7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuZ2V0QWxpZ24gPSBmdW5jdGlvbiBnZXRBbGlnbigpIHtcbiAgICByZXR1cm4gdGhpcy5faGFzQWxpZ24gPyB0aGlzLl9hbGlnblN0YXRlLmdldCgpIDogbnVsbDtcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gZ2V0U2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faGFzU2l6ZSA/IHRoaXMuX3NpemVTdGF0ZS5nZXQoKSA6IG51bGw7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuZ2V0UHJvcG9ydGlvbnMgPSBmdW5jdGlvbiBnZXRQcm9wb3J0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5faGFzUHJvcG9ydGlvbnMgPyB0aGlzLl9wcm9wb3J0aW9uc1N0YXRlLmdldCgpIDogbnVsbDtcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5tb2RpZnkgPSBmdW5jdGlvbiBtb2RpZnkodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGlmaWVyLm1vZGlmeSh0YXJnZXQpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gU3RhdGVNb2RpZmllcjsiLCJ2YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnLi4vY29yZS9FdmVudEhhbmRsZXInKTtcbmZ1bmN0aW9uIFBoeXNpY3NFbmdpbmUob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoUGh5c2ljc0VuZ2luZS5ERUZBVUxUX09QVElPTlMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fcGFydGljbGVzID0gW107XG4gICAgdGhpcy5fYm9kaWVzID0gW107XG4gICAgdGhpcy5fYWdlbnREYXRhID0ge307XG4gICAgdGhpcy5fZm9yY2VzID0gW107XG4gICAgdGhpcy5fY29uc3RyYWludHMgPSBbXTtcbiAgICB0aGlzLl9idWZmZXIgPSAwO1xuICAgIHRoaXMuX3ByZXZUaW1lID0gbm93KCk7XG4gICAgdGhpcy5faXNTbGVlcGluZyA9IGZhbHNlO1xuICAgIHRoaXMuX2V2ZW50SGFuZGxlciA9IG51bGw7XG4gICAgdGhpcy5fY3VyckFnZW50SWQgPSAwO1xuICAgIHRoaXMuX2hhc0JvZGllcyA9IGZhbHNlO1xuICAgIHRoaXMuX2V2ZW50SGFuZGxlciA9IG51bGw7XG59XG52YXIgVElNRVNURVAgPSAxNztcbnZhciBNSU5fVElNRV9TVEVQID0gMTAwMCAvIDEyMDtcbnZhciBNQVhfVElNRV9TVEVQID0gMTc7XG52YXIgbm93ID0gRGF0ZS5ub3c7XG52YXIgX2V2ZW50cyA9IHtcbiAgICAgICAgc3RhcnQ6ICdzdGFydCcsXG4gICAgICAgIHVwZGF0ZTogJ3VwZGF0ZScsXG4gICAgICAgIGVuZDogJ2VuZCdcbiAgICB9O1xuUGh5c2ljc0VuZ2luZS5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgY29uc3RyYWludFN0ZXBzOiAxLFxuICAgIHNsZWVwVG9sZXJhbmNlOiAxZS03LFxuICAgIHZlbG9jaXR5Q2FwOiB1bmRlZmluZWQsXG4gICAgYW5ndWxhclZlbG9jaXR5Q2FwOiB1bmRlZmluZWRcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRzKSB7XG4gICAgZm9yICh2YXIga2V5IGluIG9wdHMpXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNba2V5XSlcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1trZXldID0gb3B0c1trZXldO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmFkZEJvZHkgPSBmdW5jdGlvbiBhZGRCb2R5KGJvZHkpIHtcbiAgICBib2R5Ll9lbmdpbmUgPSB0aGlzO1xuICAgIGlmIChib2R5LmlzQm9keSkge1xuICAgICAgICB0aGlzLl9ib2RpZXMucHVzaChib2R5KTtcbiAgICAgICAgdGhpcy5faGFzQm9kaWVzID0gdHJ1ZTtcbiAgICB9IGVsc2VcbiAgICAgICAgdGhpcy5fcGFydGljbGVzLnB1c2goYm9keSk7XG4gICAgYm9keS5vbignc3RhcnQnLCB0aGlzLndha2UuYmluZCh0aGlzKSk7XG4gICAgcmV0dXJuIGJvZHk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUucmVtb3ZlQm9keSA9IGZ1bmN0aW9uIHJlbW92ZUJvZHkoYm9keSkge1xuICAgIHZhciBhcnJheSA9IGJvZHkuaXNCb2R5ID8gdGhpcy5fYm9kaWVzIDogdGhpcy5fcGFydGljbGVzO1xuICAgIHZhciBpbmRleCA9IGFycmF5LmluZGV4T2YoYm9keSk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgZm9yICh2YXIgYWdlbnRLZXkgaW4gdGhpcy5fYWdlbnREYXRhKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fYWdlbnREYXRhLmhhc093blByb3BlcnR5KGFnZW50S2V5KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGV0YWNoRnJvbSh0aGlzLl9hZ2VudERhdGFbYWdlbnRLZXldLmlkLCBib2R5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICBpZiAodGhpcy5nZXRCb2RpZXMoKS5sZW5ndGggPT09IDApXG4gICAgICAgIHRoaXMuX2hhc0JvZGllcyA9IGZhbHNlO1xufTtcbmZ1bmN0aW9uIF9tYXBBZ2VudEFycmF5KGFnZW50KSB7XG4gICAgaWYgKGFnZW50LmFwcGx5Rm9yY2UpXG4gICAgICAgIHJldHVybiB0aGlzLl9mb3JjZXM7XG4gICAgaWYgKGFnZW50LmFwcGx5Q29uc3RyYWludClcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnN0cmFpbnRzO1xufVxuZnVuY3Rpb24gX2F0dGFjaE9uZShhZ2VudCwgdGFyZ2V0cywgc291cmNlKSB7XG4gICAgaWYgKHRhcmdldHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgdGFyZ2V0cyA9IHRoaXMuZ2V0UGFydGljbGVzQW5kQm9kaWVzKCk7XG4gICAgaWYgKCEodGFyZ2V0cyBpbnN0YW5jZW9mIEFycmF5KSlcbiAgICAgICAgdGFyZ2V0cyA9IFt0YXJnZXRzXTtcbiAgICBhZ2VudC5vbignY2hhbmdlJywgdGhpcy53YWtlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2FnZW50RGF0YVt0aGlzLl9jdXJyQWdlbnRJZF0gPSB7XG4gICAgICAgIGFnZW50OiBhZ2VudCxcbiAgICAgICAgaWQ6IHRoaXMuX2N1cnJBZ2VudElkLFxuICAgICAgICB0YXJnZXRzOiB0YXJnZXRzLFxuICAgICAgICBzb3VyY2U6IHNvdXJjZVxuICAgIH07XG4gICAgX21hcEFnZW50QXJyYXkuY2FsbCh0aGlzLCBhZ2VudCkucHVzaCh0aGlzLl9jdXJyQWdlbnRJZCk7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJBZ2VudElkKys7XG59XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5hdHRhY2ggPSBmdW5jdGlvbiBhdHRhY2goYWdlbnRzLCB0YXJnZXRzLCBzb3VyY2UpIHtcbiAgICB0aGlzLndha2UoKTtcbiAgICBpZiAoYWdlbnRzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgdmFyIGFnZW50SURzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWdlbnRzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgYWdlbnRJRHNbaV0gPSBfYXR0YWNoT25lLmNhbGwodGhpcywgYWdlbnRzW2ldLCB0YXJnZXRzLCBzb3VyY2UpO1xuICAgICAgICByZXR1cm4gYWdlbnRJRHM7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiBfYXR0YWNoT25lLmNhbGwodGhpcywgYWdlbnRzLCB0YXJnZXRzLCBzb3VyY2UpO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmF0dGFjaFRvID0gZnVuY3Rpb24gYXR0YWNoVG8oYWdlbnRJRCwgdGFyZ2V0KSB7XG4gICAgX2dldEFnZW50RGF0YS5jYWxsKHRoaXMsIGFnZW50SUQpLnRhcmdldHMucHVzaCh0YXJnZXQpO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmRldGFjaCA9IGZ1bmN0aW9uIGRldGFjaChpZCkge1xuICAgIHZhciBhZ2VudCA9IHRoaXMuZ2V0QWdlbnQoaWQpO1xuICAgIHZhciBhZ2VudEFycmF5ID0gX21hcEFnZW50QXJyYXkuY2FsbCh0aGlzLCBhZ2VudCk7XG4gICAgdmFyIGluZGV4ID0gYWdlbnRBcnJheS5pbmRleE9mKGlkKTtcbiAgICBhZ2VudEFycmF5LnNwbGljZShpbmRleCwgMSk7XG4gICAgZGVsZXRlIHRoaXMuX2FnZW50RGF0YVtpZF07XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZGV0YWNoRnJvbSA9IGZ1bmN0aW9uIGRldGFjaEZyb20oaWQsIHRhcmdldCkge1xuICAgIHZhciBib3VuZEFnZW50ID0gX2dldEFnZW50RGF0YS5jYWxsKHRoaXMsIGlkKTtcbiAgICBpZiAoYm91bmRBZ2VudC5zb3VyY2UgPT09IHRhcmdldClcbiAgICAgICAgdGhpcy5kZXRhY2goaWQpO1xuICAgIGVsc2Uge1xuICAgICAgICB2YXIgdGFyZ2V0cyA9IGJvdW5kQWdlbnQudGFyZ2V0cztcbiAgICAgICAgdmFyIGluZGV4ID0gdGFyZ2V0cy5pbmRleE9mKHRhcmdldCk7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKVxuICAgICAgICAgICAgdGFyZ2V0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5kZXRhY2hBbGwgPSBmdW5jdGlvbiBkZXRhY2hBbGwoKSB7XG4gICAgdGhpcy5fYWdlbnREYXRhID0ge307XG4gICAgdGhpcy5fZm9yY2VzID0gW107XG4gICAgdGhpcy5fY29uc3RyYWludHMgPSBbXTtcbiAgICB0aGlzLl9jdXJyQWdlbnRJZCA9IDA7XG59O1xuZnVuY3Rpb24gX2dldEFnZW50RGF0YShpZCkge1xuICAgIHJldHVybiB0aGlzLl9hZ2VudERhdGFbaWRdO1xufVxuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZ2V0QWdlbnQgPSBmdW5jdGlvbiBnZXRBZ2VudChpZCkge1xuICAgIHJldHVybiBfZ2V0QWdlbnREYXRhLmNhbGwodGhpcywgaWQpLmFnZW50O1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmdldFBhcnRpY2xlcyA9IGZ1bmN0aW9uIGdldFBhcnRpY2xlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fcGFydGljbGVzO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmdldEJvZGllcyA9IGZ1bmN0aW9uIGdldEJvZGllcygpIHtcbiAgICByZXR1cm4gdGhpcy5fYm9kaWVzO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmdldFBhcnRpY2xlc0FuZEJvZGllcyA9IGZ1bmN0aW9uIGdldFBhcnRpY2xlc0FuZEJvZGllcygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRQYXJ0aWNsZXMoKS5jb25jYXQodGhpcy5nZXRCb2RpZXMoKSk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZm9yRWFjaFBhcnRpY2xlID0gZnVuY3Rpb24gZm9yRWFjaFBhcnRpY2xlKGZuLCBkdCkge1xuICAgIHZhciBwYXJ0aWNsZXMgPSB0aGlzLmdldFBhcnRpY2xlcygpO1xuICAgIGZvciAodmFyIGluZGV4ID0gMCwgbGVuID0gcGFydGljbGVzLmxlbmd0aDsgaW5kZXggPCBsZW47IGluZGV4KyspXG4gICAgICAgIGZuLmNhbGwodGhpcywgcGFydGljbGVzW2luZGV4XSwgZHQpO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmZvckVhY2hCb2R5ID0gZnVuY3Rpb24gZm9yRWFjaEJvZHkoZm4sIGR0KSB7XG4gICAgaWYgKCF0aGlzLl9oYXNCb2RpZXMpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgYm9kaWVzID0gdGhpcy5nZXRCb2RpZXMoKTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDAsIGxlbiA9IGJvZGllcy5sZW5ndGg7IGluZGV4IDwgbGVuOyBpbmRleCsrKVxuICAgICAgICBmbi5jYWxsKHRoaXMsIGJvZGllc1tpbmRleF0sIGR0KTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbiwgZHQpIHtcbiAgICB0aGlzLmZvckVhY2hQYXJ0aWNsZShmbiwgZHQpO1xuICAgIHRoaXMuZm9yRWFjaEJvZHkoZm4sIGR0KTtcbn07XG5mdW5jdGlvbiBfdXBkYXRlRm9yY2UoaW5kZXgpIHtcbiAgICB2YXIgYm91bmRBZ2VudCA9IF9nZXRBZ2VudERhdGEuY2FsbCh0aGlzLCB0aGlzLl9mb3JjZXNbaW5kZXhdKTtcbiAgICBib3VuZEFnZW50LmFnZW50LmFwcGx5Rm9yY2UoYm91bmRBZ2VudC50YXJnZXRzLCBib3VuZEFnZW50LnNvdXJjZSk7XG59XG5mdW5jdGlvbiBfdXBkYXRlRm9yY2VzKCkge1xuICAgIGZvciAodmFyIGluZGV4ID0gdGhpcy5fZm9yY2VzLmxlbmd0aCAtIDE7IGluZGV4ID4gLTE7IGluZGV4LS0pXG4gICAgICAgIF91cGRhdGVGb3JjZS5jYWxsKHRoaXMsIGluZGV4KTtcbn1cbmZ1bmN0aW9uIF91cGRhdGVDb25zdHJhaW50KGluZGV4LCBkdCkge1xuICAgIHZhciBib3VuZEFnZW50ID0gdGhpcy5fYWdlbnREYXRhW3RoaXMuX2NvbnN0cmFpbnRzW2luZGV4XV07XG4gICAgcmV0dXJuIGJvdW5kQWdlbnQuYWdlbnQuYXBwbHlDb25zdHJhaW50KGJvdW5kQWdlbnQudGFyZ2V0cywgYm91bmRBZ2VudC5zb3VyY2UsIGR0KTtcbn1cbmZ1bmN0aW9uIF91cGRhdGVDb25zdHJhaW50cyhkdCkge1xuICAgIHZhciBpdGVyYXRpb24gPSAwO1xuICAgIHdoaWxlIChpdGVyYXRpb24gPCB0aGlzLm9wdGlvbnMuY29uc3RyYWludFN0ZXBzKSB7XG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gdGhpcy5fY29uc3RyYWludHMubGVuZ3RoIC0gMTsgaW5kZXggPiAtMTsgaW5kZXgtLSlcbiAgICAgICAgICAgIF91cGRhdGVDb25zdHJhaW50LmNhbGwodGhpcywgaW5kZXgsIGR0KTtcbiAgICAgICAgaXRlcmF0aW9uKys7XG4gICAgfVxufVxuZnVuY3Rpb24gX3VwZGF0ZVZlbG9jaXRpZXMoYm9keSwgZHQpIHtcbiAgICBib2R5LmludGVncmF0ZVZlbG9jaXR5KGR0KTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnZlbG9jaXR5Q2FwKVxuICAgICAgICBib2R5LnZlbG9jaXR5LmNhcCh0aGlzLm9wdGlvbnMudmVsb2NpdHlDYXApLnB1dChib2R5LnZlbG9jaXR5KTtcbn1cbmZ1bmN0aW9uIF91cGRhdGVBbmd1bGFyVmVsb2NpdGllcyhib2R5LCBkdCkge1xuICAgIGJvZHkuaW50ZWdyYXRlQW5ndWxhck1vbWVudHVtKGR0KTtcbiAgICBib2R5LnVwZGF0ZUFuZ3VsYXJWZWxvY2l0eSgpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuYW5ndWxhclZlbG9jaXR5Q2FwKVxuICAgICAgICBib2R5LmFuZ3VsYXJWZWxvY2l0eS5jYXAodGhpcy5vcHRpb25zLmFuZ3VsYXJWZWxvY2l0eUNhcCkucHV0KGJvZHkuYW5ndWxhclZlbG9jaXR5KTtcbn1cbmZ1bmN0aW9uIF91cGRhdGVPcmllbnRhdGlvbnMoYm9keSwgZHQpIHtcbiAgICBib2R5LmludGVncmF0ZU9yaWVudGF0aW9uKGR0KTtcbn1cbmZ1bmN0aW9uIF91cGRhdGVQb3NpdGlvbnMoYm9keSwgZHQpIHtcbiAgICBib2R5LmludGVncmF0ZVBvc2l0aW9uKGR0KTtcbiAgICBib2R5LmVtaXQoX2V2ZW50cy51cGRhdGUsIGJvZHkpO1xufVxuZnVuY3Rpb24gX2ludGVncmF0ZShkdCkge1xuICAgIF91cGRhdGVGb3JjZXMuY2FsbCh0aGlzLCBkdCk7XG4gICAgdGhpcy5mb3JFYWNoKF91cGRhdGVWZWxvY2l0aWVzLCBkdCk7XG4gICAgdGhpcy5mb3JFYWNoQm9keShfdXBkYXRlQW5ndWxhclZlbG9jaXRpZXMsIGR0KTtcbiAgICBfdXBkYXRlQ29uc3RyYWludHMuY2FsbCh0aGlzLCBkdCk7XG4gICAgdGhpcy5mb3JFYWNoQm9keShfdXBkYXRlT3JpZW50YXRpb25zLCBkdCk7XG4gICAgdGhpcy5mb3JFYWNoKF91cGRhdGVQb3NpdGlvbnMsIGR0KTtcbn1cbmZ1bmN0aW9uIF9nZXRQYXJ0aWNsZXNFbmVyZ3koKSB7XG4gICAgdmFyIGVuZXJneSA9IDA7XG4gICAgdmFyIHBhcnRpY2xlRW5lcmd5ID0gMDtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKHBhcnRpY2xlKSB7XG4gICAgICAgIHBhcnRpY2xlRW5lcmd5ID0gcGFydGljbGUuZ2V0RW5lcmd5KCk7XG4gICAgICAgIGVuZXJneSArPSBwYXJ0aWNsZUVuZXJneTtcbiAgICB9KTtcbiAgICByZXR1cm4gZW5lcmd5O1xufVxuZnVuY3Rpb24gX2dldEFnZW50c0VuZXJneSgpIHtcbiAgICB2YXIgZW5lcmd5ID0gMDtcbiAgICBmb3IgKHZhciBpZCBpbiB0aGlzLl9hZ2VudERhdGEpXG4gICAgICAgIGVuZXJneSArPSB0aGlzLmdldEFnZW50RW5lcmd5KGlkKTtcbiAgICByZXR1cm4gZW5lcmd5O1xufVxuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZ2V0QWdlbnRFbmVyZ3kgPSBmdW5jdGlvbiAoYWdlbnRJZCkge1xuICAgIHZhciBhZ2VudERhdGEgPSBfZ2V0QWdlbnREYXRhLmNhbGwodGhpcywgYWdlbnRJZCk7XG4gICAgcmV0dXJuIGFnZW50RGF0YS5hZ2VudC5nZXRFbmVyZ3koYWdlbnREYXRhLnRhcmdldHMsIGFnZW50RGF0YS5zb3VyY2UpO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmdldEVuZXJneSA9IGZ1bmN0aW9uIGdldEVuZXJneSgpIHtcbiAgICByZXR1cm4gX2dldFBhcnRpY2xlc0VuZXJneS5jYWxsKHRoaXMpICsgX2dldEFnZW50c0VuZXJneS5jYWxsKHRoaXMpO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLnN0ZXAgPSBmdW5jdGlvbiBzdGVwKCkge1xuICAgIGlmICh0aGlzLmlzU2xlZXBpbmcoKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciBjdXJyVGltZSA9IG5vdygpO1xuICAgIHZhciBkdEZyYW1lID0gY3VyclRpbWUgLSB0aGlzLl9wcmV2VGltZTtcbiAgICB0aGlzLl9wcmV2VGltZSA9IGN1cnJUaW1lO1xuICAgIGlmIChkdEZyYW1lIDwgTUlOX1RJTUVfU1RFUClcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChkdEZyYW1lID4gTUFYX1RJTUVfU1RFUClcbiAgICAgICAgZHRGcmFtZSA9IE1BWF9USU1FX1NURVA7XG4gICAgX2ludGVncmF0ZS5jYWxsKHRoaXMsIFRJTUVTVEVQKTtcbiAgICB0aGlzLmVtaXQoX2V2ZW50cy51cGRhdGUsIHRoaXMpO1xuICAgIGlmICh0aGlzLmdldEVuZXJneSgpIDwgdGhpcy5vcHRpb25zLnNsZWVwVG9sZXJhbmNlKVxuICAgICAgICB0aGlzLnNsZWVwKCk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuaXNTbGVlcGluZyA9IGZ1bmN0aW9uIGlzU2xlZXBpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzU2xlZXBpbmc7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiBpc1NsZWVwaW5nKCkge1xuICAgIHJldHVybiAhdGhpcy5faXNTbGVlcGluZztcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5zbGVlcCA9IGZ1bmN0aW9uIHNsZWVwKCkge1xuICAgIGlmICh0aGlzLl9pc1NsZWVwaW5nKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChib2R5KSB7XG4gICAgICAgIGJvZHkuc2xlZXAoKTtcbiAgICB9KTtcbiAgICB0aGlzLmVtaXQoX2V2ZW50cy5lbmQsIHRoaXMpO1xuICAgIHRoaXMuX2lzU2xlZXBpbmcgPSB0cnVlO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLndha2UgPSBmdW5jdGlvbiB3YWtlKCkge1xuICAgIGlmICghdGhpcy5faXNTbGVlcGluZylcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuX3ByZXZUaW1lID0gbm93KCk7XG4gICAgdGhpcy5lbWl0KF9ldmVudHMuc3RhcnQsIHRoaXMpO1xuICAgIHRoaXMuX2lzU2xlZXBpbmcgPSBmYWxzZTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBkYXRhKSB7XG4gICAgaWYgKHRoaXMuX2V2ZW50SGFuZGxlciA9PT0gbnVsbClcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuX2V2ZW50SGFuZGxlci5lbWl0KHR5cGUsIGRhdGEpO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oZXZlbnQsIGZuKSB7XG4gICAgaWYgKHRoaXMuX2V2ZW50SGFuZGxlciA9PT0gbnVsbClcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX2V2ZW50SGFuZGxlci5vbihldmVudCwgZm4pO1xufTtcbm1vZHVsZS5leHBvcnRzID0gUGh5c2ljc0VuZ2luZTsiLCJ2YXIgVmVjdG9yID0gcmVxdWlyZSgnLi4vLi4vbWF0aC9WZWN0b3InKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCcuLi8uLi9jb3JlL1RyYW5zZm9ybScpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4uLy4uL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG52YXIgSW50ZWdyYXRvciA9IHJlcXVpcmUoJy4uL2ludGVncmF0b3JzL1N5bXBsZWN0aWNFdWxlcicpO1xuZnVuY3Rpb24gUGFydGljbGUob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHZhciBkZWZhdWx0cyA9IFBhcnRpY2xlLkRFRkFVTFRfT1BUSU9OUztcbiAgICB0aGlzLnBvc2l0aW9uID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMudmVsb2NpdHkgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5mb3JjZSA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLl9lbmdpbmUgPSBudWxsO1xuICAgIHRoaXMuX2lzU2xlZXBpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbnVsbDtcbiAgICB0aGlzLm1hc3MgPSBvcHRpb25zLm1hc3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubWFzcyA6IGRlZmF1bHRzLm1hc3M7XG4gICAgdGhpcy5pbnZlcnNlTWFzcyA9IDEgLyB0aGlzLm1hc3M7XG4gICAgdGhpcy5zZXRQb3NpdGlvbihvcHRpb25zLnBvc2l0aW9uIHx8IGRlZmF1bHRzLnBvc2l0aW9uKTtcbiAgICB0aGlzLnNldFZlbG9jaXR5KG9wdGlvbnMudmVsb2NpdHkgfHwgZGVmYXVsdHMudmVsb2NpdHkpO1xuICAgIHRoaXMuZm9yY2Uuc2V0KG9wdGlvbnMuZm9yY2UgfHwgW1xuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSk7XG4gICAgdGhpcy50cmFuc2Zvcm0gPSBUcmFuc2Zvcm0uaWRlbnRpdHkuc2xpY2UoKTtcbiAgICB0aGlzLl9zcGVjID0ge1xuICAgICAgICBzaXplOiBbXG4gICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgdHJ1ZVxuICAgICAgICBdLFxuICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdGhpcy50cmFuc2Zvcm0sXG4gICAgICAgICAgICBvcmlnaW46IFtcbiAgICAgICAgICAgICAgICAwLjUsXG4gICAgICAgICAgICAgICAgMC41XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgdGFyZ2V0OiBudWxsXG4gICAgICAgIH1cbiAgICB9O1xufVxuUGFydGljbGUuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHBvc2l0aW9uOiBbXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdLFxuICAgIHZlbG9jaXR5OiBbXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdLFxuICAgIG1hc3M6IDFcbn07XG52YXIgX2V2ZW50cyA9IHtcbiAgICAgICAgc3RhcnQ6ICdzdGFydCcsXG4gICAgICAgIHVwZGF0ZTogJ3VwZGF0ZScsXG4gICAgICAgIGVuZDogJ2VuZCdcbiAgICB9O1xudmFyIG5vdyA9IERhdGUubm93O1xuUGFydGljbGUucHJvdG90eXBlLmlzQm9keSA9IGZhbHNlO1xuUGFydGljbGUucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuICF0aGlzLl9pc1NsZWVwaW5nO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5zbGVlcCA9IGZ1bmN0aW9uIHNsZWVwKCkge1xuICAgIGlmICh0aGlzLl9pc1NsZWVwaW5nKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5lbWl0KF9ldmVudHMuZW5kLCB0aGlzKTtcbiAgICB0aGlzLl9pc1NsZWVwaW5nID0gdHJ1ZTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUud2FrZSA9IGZ1bmN0aW9uIHdha2UoKSB7XG4gICAgaWYgKCF0aGlzLl9pc1NsZWVwaW5nKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5lbWl0KF9ldmVudHMuc3RhcnQsIHRoaXMpO1xuICAgIHRoaXMuX2lzU2xlZXBpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9wcmV2VGltZSA9IG5vdygpO1xuICAgIGlmICh0aGlzLl9lbmdpbmUpXG4gICAgICAgIHRoaXMuX2VuZ2luZS53YWtlKCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnNldFBvc2l0aW9uID0gZnVuY3Rpb24gc2V0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICB0aGlzLnBvc2l0aW9uLnNldChwb3NpdGlvbik7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnNldFBvc2l0aW9uMUQgPSBmdW5jdGlvbiBzZXRQb3NpdGlvbjFEKHgpIHtcbiAgICB0aGlzLnBvc2l0aW9uLnggPSB4O1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uIGdldFBvc2l0aW9uKCkge1xuICAgIHRoaXMuX2VuZ2luZS5zdGVwKCk7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24uZ2V0KCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmdldFBvc2l0aW9uMUQgPSBmdW5jdGlvbiBnZXRQb3NpdGlvbjFEKCkge1xuICAgIHRoaXMuX2VuZ2luZS5zdGVwKCk7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24ueDtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuc2V0VmVsb2NpdHkgPSBmdW5jdGlvbiBzZXRWZWxvY2l0eSh2ZWxvY2l0eSkge1xuICAgIHRoaXMudmVsb2NpdHkuc2V0KHZlbG9jaXR5KTtcbiAgICBpZiAoISh2ZWxvY2l0eVswXSA9PT0gMCAmJiB2ZWxvY2l0eVsxXSA9PT0gMCAmJiB2ZWxvY2l0eVsyXSA9PT0gMCkpXG4gICAgICAgIHRoaXMud2FrZSgpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5zZXRWZWxvY2l0eTFEID0gZnVuY3Rpb24gc2V0VmVsb2NpdHkxRCh4KSB7XG4gICAgdGhpcy52ZWxvY2l0eS54ID0geDtcbiAgICBpZiAoeCAhPT0gMClcbiAgICAgICAgdGhpcy53YWtlKCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmdldFZlbG9jaXR5ID0gZnVuY3Rpb24gZ2V0VmVsb2NpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMudmVsb2NpdHkuZ2V0KCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnNldEZvcmNlID0gZnVuY3Rpb24gc2V0Rm9yY2UoZm9yY2UpIHtcbiAgICB0aGlzLmZvcmNlLnNldChmb3JjZSk7XG4gICAgdGhpcy53YWtlKCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmdldFZlbG9jaXR5MUQgPSBmdW5jdGlvbiBnZXRWZWxvY2l0eTFEKCkge1xuICAgIHJldHVybiB0aGlzLnZlbG9jaXR5Lng7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnNldE1hc3MgPSBmdW5jdGlvbiBzZXRNYXNzKG1hc3MpIHtcbiAgICB0aGlzLm1hc3MgPSBtYXNzO1xuICAgIHRoaXMuaW52ZXJzZU1hc3MgPSAxIC8gbWFzcztcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuZ2V0TWFzcyA9IGZ1bmN0aW9uIGdldE1hc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFzcztcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiByZXNldChwb3NpdGlvbiwgdmVsb2NpdHkpIHtcbiAgICB0aGlzLnNldFBvc2l0aW9uKHBvc2l0aW9uIHx8IFtcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0pO1xuICAgIHRoaXMuc2V0VmVsb2NpdHkodmVsb2NpdHkgfHwgW1xuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmFwcGx5Rm9yY2UgPSBmdW5jdGlvbiBhcHBseUZvcmNlKGZvcmNlKSB7XG4gICAgaWYgKGZvcmNlLmlzWmVybygpKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5mb3JjZS5hZGQoZm9yY2UpLnB1dCh0aGlzLmZvcmNlKTtcbiAgICB0aGlzLndha2UoKTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuYXBwbHlJbXB1bHNlID0gZnVuY3Rpb24gYXBwbHlJbXB1bHNlKGltcHVsc2UpIHtcbiAgICBpZiAoaW1wdWxzZS5pc1plcm8oKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciB2ZWxvY2l0eSA9IHRoaXMudmVsb2NpdHk7XG4gICAgdmVsb2NpdHkuYWRkKGltcHVsc2UubXVsdCh0aGlzLmludmVyc2VNYXNzKSkucHV0KHZlbG9jaXR5KTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuaW50ZWdyYXRlVmVsb2NpdHkgPSBmdW5jdGlvbiBpbnRlZ3JhdGVWZWxvY2l0eShkdCkge1xuICAgIEludGVncmF0b3IuaW50ZWdyYXRlVmVsb2NpdHkodGhpcywgZHQpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5pbnRlZ3JhdGVQb3NpdGlvbiA9IGZ1bmN0aW9uIGludGVncmF0ZVBvc2l0aW9uKGR0KSB7XG4gICAgSW50ZWdyYXRvci5pbnRlZ3JhdGVQb3NpdGlvbih0aGlzLCBkdCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLl9pbnRlZ3JhdGUgPSBmdW5jdGlvbiBfaW50ZWdyYXRlKGR0KSB7XG4gICAgdGhpcy5pbnRlZ3JhdGVWZWxvY2l0eShkdCk7XG4gICAgdGhpcy5pbnRlZ3JhdGVQb3NpdGlvbihkdCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmdldEVuZXJneSA9IGZ1bmN0aW9uIGdldEVuZXJneSgpIHtcbiAgICByZXR1cm4gMC41ICogdGhpcy5tYXNzICogdGhpcy52ZWxvY2l0eS5ub3JtU3F1YXJlZCgpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5nZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbiBnZXRUcmFuc2Zvcm0oKSB7XG4gICAgdGhpcy5fZW5naW5lLnN0ZXAoKTtcbiAgICB2YXIgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uO1xuICAgIHZhciB0cmFuc2Zvcm0gPSB0aGlzLnRyYW5zZm9ybTtcbiAgICB0cmFuc2Zvcm1bMTJdID0gcG9zaXRpb24ueDtcbiAgICB0cmFuc2Zvcm1bMTNdID0gcG9zaXRpb24ueTtcbiAgICB0cmFuc2Zvcm1bMTRdID0gcG9zaXRpb24uejtcbiAgICByZXR1cm4gdHJhbnNmb3JtO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5tb2RpZnkgPSBmdW5jdGlvbiBtb2RpZnkodGFyZ2V0KSB7XG4gICAgdmFyIF9zcGVjID0gdGhpcy5fc3BlYy50YXJnZXQ7XG4gICAgX3NwZWMudHJhbnNmb3JtID0gdGhpcy5nZXRUcmFuc2Zvcm0oKTtcbiAgICBfc3BlYy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgcmV0dXJuIHRoaXMuX3NwZWM7XG59O1xuZnVuY3Rpb24gX2NyZWF0ZUV2ZW50T3V0cHV0KCkge1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmJpbmRUaGlzKHRoaXMpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50T3V0cHV0KTtcbn1cblBhcnRpY2xlLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBkYXRhKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudE91dHB1dClcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQodHlwZSwgZGF0YSk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMub24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcigpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gcGlwZSgpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5waXBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnVucGlwZSA9IGZ1bmN0aW9uIHVucGlwZSgpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy51bnBpcGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFBhcnRpY2xlOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuLi8uLi9jb3JlL0V2ZW50SGFuZGxlcicpO1xuZnVuY3Rpb24gQ29uc3RyYWludCgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnMgfHwge307XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRPdXRwdXQpO1xufVxuQ29uc3RyYWludC5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2NoYW5nZScsIG9wdGlvbnMpO1xufTtcbkNvbnN0cmFpbnQucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludCA9IGZ1bmN0aW9uIGFwcGx5Q29uc3RyYWludCgpIHtcbn07XG5Db25zdHJhaW50LnByb3RvdHlwZS5nZXRFbmVyZ3kgPSBmdW5jdGlvbiBnZXRFbmVyZ3koKSB7XG4gICAgcmV0dXJuIDA7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBDb25zdHJhaW50OyIsInZhciBDb25zdHJhaW50ID0gcmVxdWlyZSgnLi9Db25zdHJhaW50Jyk7XG52YXIgVmVjdG9yID0gcmVxdWlyZSgnLi4vLi4vbWF0aC9WZWN0b3InKTtcbmZ1bmN0aW9uIFNuYXAob3B0aW9ucykge1xuICAgIENvbnN0cmFpbnQuY2FsbCh0aGlzKTtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKHRoaXMuY29uc3RydWN0b3IuREVGQVVMVF9PUFRJT05TKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMucERpZmYgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy52RGlmZiA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLmltcHVsc2UxID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMuaW1wdWxzZTIgPSBuZXcgVmVjdG9yKCk7XG59XG5TbmFwLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ29uc3RyYWludC5wcm90b3R5cGUpO1xuU25hcC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTbmFwO1xuU25hcC5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgcGVyaW9kOiAzMDAsXG4gICAgZGFtcGluZ1JhdGlvOiAwLjEsXG4gICAgbGVuZ3RoOiAwLFxuICAgIGFuY2hvcjogdW5kZWZpbmVkXG59O1xudmFyIHBpID0gTWF0aC5QSTtcblNuYXAucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5hbmNob3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAob3B0aW9ucy5hbmNob3IgaW5zdGFuY2VvZiBWZWN0b3IpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYW5jaG9yID0gb3B0aW9ucy5hbmNob3I7XG4gICAgICAgIGlmIChvcHRpb25zLmFuY2hvci5wb3NpdGlvbiBpbnN0YW5jZW9mIFZlY3RvcilcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hbmNob3IgPSBvcHRpb25zLmFuY2hvci5wb3NpdGlvbjtcbiAgICAgICAgaWYgKG9wdGlvbnMuYW5jaG9yIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYW5jaG9yID0gbmV3IFZlY3RvcihvcHRpb25zLmFuY2hvcik7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmxlbmd0aCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMubGVuZ3RoID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgaWYgKG9wdGlvbnMuZGFtcGluZ1JhdGlvICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5kYW1waW5nUmF0aW8gPSBvcHRpb25zLmRhbXBpbmdSYXRpbztcbiAgICBpZiAob3B0aW9ucy5wZXJpb2QgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLnBlcmlvZCA9IG9wdGlvbnMucGVyaW9kO1xuICAgIENvbnN0cmFpbnQucHJvdG90eXBlLnNldE9wdGlvbnMuY2FsbCh0aGlzLCBvcHRpb25zKTtcbn07XG5TbmFwLnByb3RvdHlwZS5nZXRFbmVyZ3kgPSBmdW5jdGlvbiBnZXRFbmVyZ3kodGFyZ2V0cywgc291cmNlKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgdmFyIHJlc3RMZW5ndGggPSBvcHRpb25zLmxlbmd0aDtcbiAgICB2YXIgYW5jaG9yID0gb3B0aW9ucy5hbmNob3IgfHwgc291cmNlLnBvc2l0aW9uO1xuICAgIHZhciBzdHJlbmd0aCA9IE1hdGgucG93KDIgKiBwaSAvIG9wdGlvbnMucGVyaW9kLCAyKTtcbiAgICB2YXIgZW5lcmd5ID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IHRhcmdldHNbaV07XG4gICAgICAgIHZhciBkaXN0ID0gYW5jaG9yLnN1Yih0YXJnZXQucG9zaXRpb24pLm5vcm0oKSAtIHJlc3RMZW5ndGg7XG4gICAgICAgIGVuZXJneSArPSAwLjUgKiBzdHJlbmd0aCAqIGRpc3QgKiBkaXN0O1xuICAgIH1cbiAgICByZXR1cm4gZW5lcmd5O1xufTtcblNuYXAucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludCA9IGZ1bmN0aW9uIGFwcGx5Q29uc3RyYWludCh0YXJnZXRzLCBzb3VyY2UsIGR0KSB7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgdmFyIHBEaWZmID0gdGhpcy5wRGlmZjtcbiAgICB2YXIgdkRpZmYgPSB0aGlzLnZEaWZmO1xuICAgIHZhciBpbXB1bHNlMSA9IHRoaXMuaW1wdWxzZTE7XG4gICAgdmFyIGltcHVsc2UyID0gdGhpcy5pbXB1bHNlMjtcbiAgICB2YXIgbGVuZ3RoID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgdmFyIGFuY2hvciA9IG9wdGlvbnMuYW5jaG9yIHx8IHNvdXJjZS5wb3NpdGlvbjtcbiAgICB2YXIgcGVyaW9kID0gb3B0aW9ucy5wZXJpb2Q7XG4gICAgdmFyIGRhbXBpbmdSYXRpbyA9IG9wdGlvbnMuZGFtcGluZ1JhdGlvO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFyZ2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdGFyZ2V0c1tpXTtcbiAgICAgICAgdmFyIHAxID0gdGFyZ2V0LnBvc2l0aW9uO1xuICAgICAgICB2YXIgdjEgPSB0YXJnZXQudmVsb2NpdHk7XG4gICAgICAgIHZhciBtMSA9IHRhcmdldC5tYXNzO1xuICAgICAgICB2YXIgdzEgPSB0YXJnZXQuaW52ZXJzZU1hc3M7XG4gICAgICAgIHBEaWZmLnNldChwMS5zdWIoYW5jaG9yKSk7XG4gICAgICAgIHZhciBkaXN0ID0gcERpZmYubm9ybSgpIC0gbGVuZ3RoO1xuICAgICAgICB2YXIgZWZmTWFzcztcbiAgICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgdmFyIHcyID0gc291cmNlLmludmVyc2VNYXNzO1xuICAgICAgICAgICAgdmFyIHYyID0gc291cmNlLnZlbG9jaXR5O1xuICAgICAgICAgICAgdkRpZmYuc2V0KHYxLnN1Yih2MikpO1xuICAgICAgICAgICAgZWZmTWFzcyA9IDEgLyAodzEgKyB3Mik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2RGlmZi5zZXQodjEpO1xuICAgICAgICAgICAgZWZmTWFzcyA9IG0xO1xuICAgICAgICB9XG4gICAgICAgIHZhciBnYW1tYTtcbiAgICAgICAgdmFyIGJldGE7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGVyaW9kID09PSAwKSB7XG4gICAgICAgICAgICBnYW1tYSA9IDA7XG4gICAgICAgICAgICBiZXRhID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBrID0gNCAqIGVmZk1hc3MgKiBwaSAqIHBpIC8gKHBlcmlvZCAqIHBlcmlvZCk7XG4gICAgICAgICAgICB2YXIgYyA9IDQgKiBlZmZNYXNzICogcGkgKiBkYW1waW5nUmF0aW8gLyBwZXJpb2Q7XG4gICAgICAgICAgICBiZXRhID0gZHQgKiBrIC8gKGMgKyBkdCAqIGspO1xuICAgICAgICAgICAgZ2FtbWEgPSAxIC8gKGMgKyBkdCAqIGspO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhbnRpRHJpZnQgPSBiZXRhIC8gZHQgKiBkaXN0O1xuICAgICAgICBwRGlmZi5ub3JtYWxpemUoLWFudGlEcmlmdCkuc3ViKHZEaWZmKS5tdWx0KGR0IC8gKGdhbW1hICsgZHQgLyBlZmZNYXNzKSkucHV0KGltcHVsc2UxKTtcbiAgICAgICAgdGFyZ2V0LmFwcGx5SW1wdWxzZShpbXB1bHNlMSk7XG4gICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgIGltcHVsc2UxLm11bHQoLTEpLnB1dChpbXB1bHNlMik7XG4gICAgICAgICAgICBzb3VyY2UuYXBwbHlJbXB1bHNlKGltcHVsc2UyKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IFNuYXA7IiwidmFyIENvbnN0cmFpbnQgPSByZXF1aXJlKCcuL0NvbnN0cmFpbnQnKTtcbnZhciBWZWN0b3IgPSByZXF1aXJlKCcuLi8uLi9tYXRoL1ZlY3RvcicpO1xuZnVuY3Rpb24gV2FsbChvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShXYWxsLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLmRpZmYgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5pbXB1bHNlID0gbmV3IFZlY3RvcigpO1xuICAgIENvbnN0cmFpbnQuY2FsbCh0aGlzKTtcbn1cbldhbGwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDb25zdHJhaW50LnByb3RvdHlwZSk7XG5XYWxsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFdhbGw7XG5XYWxsLk9OX0NPTlRBQ1QgPSB7XG4gICAgUkVGTEVDVDogMCxcbiAgICBTSUxFTlQ6IDFcbn07XG5XYWxsLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICByZXN0aXR1dGlvbjogMC41LFxuICAgIGRyaWZ0OiAwLjUsXG4gICAgc2xvcDogMCxcbiAgICBub3JtYWw6IFtcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0sXG4gICAgZGlzdGFuY2U6IDAsXG4gICAgb25Db250YWN0OiBXYWxsLk9OX0NPTlRBQ1QuUkVGTEVDVFxufTtcbldhbGwucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5ub3JtYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAob3B0aW9ucy5ub3JtYWwgaW5zdGFuY2VvZiBWZWN0b3IpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMubm9ybWFsID0gb3B0aW9ucy5ub3JtYWwuY2xvbmUoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMubm9ybWFsIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMubm9ybWFsID0gbmV3IFZlY3RvcihvcHRpb25zLm5vcm1hbCk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnJlc3RpdHV0aW9uICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5yZXN0aXR1dGlvbiA9IG9wdGlvbnMucmVzdGl0dXRpb247XG4gICAgaWYgKG9wdGlvbnMuZHJpZnQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmRyaWZ0ID0gb3B0aW9ucy5kcmlmdDtcbiAgICBpZiAob3B0aW9ucy5zbG9wICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5zbG9wID0gb3B0aW9ucy5zbG9wO1xuICAgIGlmIChvcHRpb25zLmRpc3RhbmNlICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5kaXN0YW5jZSA9IG9wdGlvbnMuZGlzdGFuY2U7XG4gICAgaWYgKG9wdGlvbnMub25Db250YWN0ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5vbkNvbnRhY3QgPSBvcHRpb25zLm9uQ29udGFjdDtcbn07XG5mdW5jdGlvbiBfZ2V0Tm9ybWFsVmVsb2NpdHkobiwgdikge1xuICAgIHJldHVybiB2LmRvdChuKTtcbn1cbmZ1bmN0aW9uIF9nZXREaXN0YW5jZUZyb21PcmlnaW4ocCkge1xuICAgIHZhciBuID0gdGhpcy5vcHRpb25zLm5vcm1hbDtcbiAgICB2YXIgZCA9IHRoaXMub3B0aW9ucy5kaXN0YW5jZTtcbiAgICByZXR1cm4gcC5kb3QobikgKyBkO1xufVxuZnVuY3Rpb24gX29uRW50ZXIocGFydGljbGUsIG92ZXJsYXAsIGR0KSB7XG4gICAgdmFyIHAgPSBwYXJ0aWNsZS5wb3NpdGlvbjtcbiAgICB2YXIgdiA9IHBhcnRpY2xlLnZlbG9jaXR5O1xuICAgIHZhciBtID0gcGFydGljbGUubWFzcztcbiAgICB2YXIgbiA9IHRoaXMub3B0aW9ucy5ub3JtYWw7XG4gICAgdmFyIGFjdGlvbiA9IHRoaXMub3B0aW9ucy5vbkNvbnRhY3Q7XG4gICAgdmFyIHJlc3RpdHV0aW9uID0gdGhpcy5vcHRpb25zLnJlc3RpdHV0aW9uO1xuICAgIHZhciBpbXB1bHNlID0gdGhpcy5pbXB1bHNlO1xuICAgIHZhciBkcmlmdCA9IHRoaXMub3B0aW9ucy5kcmlmdDtcbiAgICB2YXIgc2xvcCA9IC10aGlzLm9wdGlvbnMuc2xvcDtcbiAgICB2YXIgZ2FtbWEgPSAwO1xuICAgIGlmICh0aGlzLl9ldmVudE91dHB1dCkge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZTogcGFydGljbGUsXG4gICAgICAgICAgICAgICAgd2FsbDogdGhpcyxcbiAgICAgICAgICAgICAgICBvdmVybGFwOiBvdmVybGFwLFxuICAgICAgICAgICAgICAgIG5vcm1hbDogblxuICAgICAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgncHJlQ29sbGlzaW9uJywgZGF0YSk7XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2NvbGxpc2lvbicsIGRhdGEpO1xuICAgIH1cbiAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgIGNhc2UgV2FsbC5PTl9DT05UQUNULlJFRkxFQ1Q6XG4gICAgICAgIHZhciBsYW1iZGEgPSBvdmVybGFwIDwgc2xvcCA/IC0oKDEgKyByZXN0aXR1dGlvbikgKiBuLmRvdCh2KSArIGRyaWZ0IC8gZHQgKiAob3ZlcmxhcCAtIHNsb3ApKSAvIChtICogZHQgKyBnYW1tYSkgOiAtKCgxICsgcmVzdGl0dXRpb24pICogbi5kb3QodikpIC8gKG0gKiBkdCArIGdhbW1hKTtcbiAgICAgICAgaW1wdWxzZS5zZXQobi5tdWx0KGR0ICogbGFtYmRhKSk7XG4gICAgICAgIHBhcnRpY2xlLmFwcGx5SW1wdWxzZShpbXB1bHNlKTtcbiAgICAgICAgcGFydGljbGUuc2V0UG9zaXRpb24ocC5hZGQobi5tdWx0KC1vdmVybGFwKSkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKHRoaXMuX2V2ZW50T3V0cHV0KVxuICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdwb3N0Q29sbGlzaW9uJywgZGF0YSk7XG59XG5mdW5jdGlvbiBfb25FeGl0KHBhcnRpY2xlLCBvdmVybGFwLCBkdCkge1xuICAgIHZhciBhY3Rpb24gPSB0aGlzLm9wdGlvbnMub25Db250YWN0O1xuICAgIHZhciBwID0gcGFydGljbGUucG9zaXRpb247XG4gICAgdmFyIG4gPSB0aGlzLm9wdGlvbnMubm9ybWFsO1xuICAgIGlmIChhY3Rpb24gPT09IFdhbGwuT05fQ09OVEFDVC5SRUZMRUNUKSB7XG4gICAgICAgIHBhcnRpY2xlLnNldFBvc2l0aW9uKHAuYWRkKG4ubXVsdCgtb3ZlcmxhcCkpKTtcbiAgICB9XG59XG5XYWxsLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnQgPSBmdW5jdGlvbiBhcHBseUNvbnN0cmFpbnQodGFyZ2V0cywgc291cmNlLCBkdCkge1xuICAgIHZhciBuID0gdGhpcy5vcHRpb25zLm5vcm1hbDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHBhcnRpY2xlID0gdGFyZ2V0c1tpXTtcbiAgICAgICAgdmFyIHAgPSBwYXJ0aWNsZS5wb3NpdGlvbjtcbiAgICAgICAgdmFyIHYgPSBwYXJ0aWNsZS52ZWxvY2l0eTtcbiAgICAgICAgdmFyIHIgPSBwYXJ0aWNsZS5yYWRpdXMgfHwgMDtcbiAgICAgICAgdmFyIG92ZXJsYXAgPSBfZ2V0RGlzdGFuY2VGcm9tT3JpZ2luLmNhbGwodGhpcywgcC5hZGQobi5tdWx0KC1yKSkpO1xuICAgICAgICB2YXIgbnYgPSBfZ2V0Tm9ybWFsVmVsb2NpdHkuY2FsbCh0aGlzLCBuLCB2KTtcbiAgICAgICAgaWYgKG92ZXJsYXAgPD0gMCkge1xuICAgICAgICAgICAgaWYgKG52IDwgMClcbiAgICAgICAgICAgICAgICBfb25FbnRlci5jYWxsKHRoaXMsIHBhcnRpY2xlLCBvdmVybGFwLCBkdCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgX29uRXhpdC5jYWxsKHRoaXMsIHBhcnRpY2xlLCBvdmVybGFwLCBkdCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBXYWxsOyIsInZhciBWZWN0b3IgPSByZXF1aXJlKCcuLi8uLi9tYXRoL1ZlY3RvcicpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4uLy4uL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG5mdW5jdGlvbiBGb3JjZShmb3JjZSkge1xuICAgIHRoaXMuZm9yY2UgPSBuZXcgVmVjdG9yKGZvcmNlKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG59XG5Gb3JjZS5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2NoYW5nZScsIG9wdGlvbnMpO1xufTtcbkZvcmNlLnByb3RvdHlwZS5hcHBseUZvcmNlID0gZnVuY3Rpb24gYXBwbHlGb3JjZSh0YXJnZXRzKSB7XG4gICAgdmFyIGxlbmd0aCA9IHRhcmdldHMubGVuZ3RoO1xuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICB0YXJnZXRzW2xlbmd0aF0uYXBwbHlGb3JjZSh0aGlzLmZvcmNlKTtcbiAgICB9XG59O1xuRm9yY2UucHJvdG90eXBlLmdldEVuZXJneSA9IGZ1bmN0aW9uIGdldEVuZXJneSgpIHtcbiAgICByZXR1cm4gMDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEZvcmNlOyIsInZhciBGb3JjZSA9IHJlcXVpcmUoJy4vRm9yY2UnKTtcbnZhciBWZWN0b3IgPSByZXF1aXJlKCcuLi8uLi9tYXRoL1ZlY3RvcicpO1xuZnVuY3Rpb24gU3ByaW5nKG9wdGlvbnMpIHtcbiAgICBGb3JjZS5jYWxsKHRoaXMpO1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUodGhpcy5jb25zdHJ1Y3Rvci5ERUZBVUxUX09QVElPTlMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5kaXNwID0gbmV3IFZlY3RvcigwLCAwLCAwKTtcbiAgICBfaW5pdC5jYWxsKHRoaXMpO1xufVxuU3ByaW5nLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRm9yY2UucHJvdG90eXBlKTtcblNwcmluZy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTcHJpbmc7XG52YXIgcGkgPSBNYXRoLlBJO1xudmFyIE1JTl9QRVJJT0QgPSAxNTA7XG5TcHJpbmcuRk9SQ0VfRlVOQ1RJT05TID0ge1xuICAgIEZFTkU6IGZ1bmN0aW9uIChkaXN0LCByTWF4KSB7XG4gICAgICAgIHZhciByTWF4U21hbGwgPSByTWF4ICogMC45OTtcbiAgICAgICAgdmFyIHIgPSBNYXRoLm1heChNYXRoLm1pbihkaXN0LCByTWF4U21hbGwpLCAtck1heFNtYWxsKTtcbiAgICAgICAgcmV0dXJuIHIgLyAoMSAtIHIgKiByIC8gKHJNYXggKiByTWF4KSk7XG4gICAgfSxcbiAgICBIT09LOiBmdW5jdGlvbiAoZGlzdCkge1xuICAgICAgICByZXR1cm4gZGlzdDtcbiAgICB9XG59O1xuU3ByaW5nLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBwZXJpb2Q6IDMwMCxcbiAgICBkYW1waW5nUmF0aW86IDAuMSxcbiAgICBsZW5ndGg6IDAsXG4gICAgbWF4TGVuZ3RoOiBJbmZpbml0eSxcbiAgICBhbmNob3I6IHVuZGVmaW5lZCxcbiAgICBmb3JjZUZ1bmN0aW9uOiBTcHJpbmcuRk9SQ0VfRlVOQ1RJT05TLkhPT0tcbn07XG5mdW5jdGlvbiBfY2FsY1N0aWZmbmVzcygpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICBvcHRpb25zLnN0aWZmbmVzcyA9IE1hdGgucG93KDIgKiBwaSAvIG9wdGlvbnMucGVyaW9kLCAyKTtcbn1cbmZ1bmN0aW9uIF9jYWxjRGFtcGluZygpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICBvcHRpb25zLmRhbXBpbmcgPSA0ICogcGkgKiBvcHRpb25zLmRhbXBpbmdSYXRpbyAvIG9wdGlvbnMucGVyaW9kO1xufVxuZnVuY3Rpb24gX2luaXQoKSB7XG4gICAgX2NhbGNTdGlmZm5lc3MuY2FsbCh0aGlzKTtcbiAgICBfY2FsY0RhbXBpbmcuY2FsbCh0aGlzKTtcbn1cblNwcmluZy5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmFuY2hvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmFuY2hvci5wb3NpdGlvbiBpbnN0YW5jZW9mIFZlY3RvcilcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hbmNob3IgPSBvcHRpb25zLmFuY2hvci5wb3NpdGlvbjtcbiAgICAgICAgaWYgKG9wdGlvbnMuYW5jaG9yIGluc3RhbmNlb2YgVmVjdG9yKVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFuY2hvciA9IG9wdGlvbnMuYW5jaG9yO1xuICAgICAgICBpZiAob3B0aW9ucy5hbmNob3IgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hbmNob3IgPSBuZXcgVmVjdG9yKG9wdGlvbnMuYW5jaG9yKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMucGVyaW9kICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMucGVyaW9kIDwgTUlOX1BFUklPRCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wZXJpb2QgPSBNSU5fUEVSSU9EO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdUaGUgcGVyaW9kIG9mIGEgU3ByaW5nVHJhbnNpdGlvbiBpcyBjYXBwZWQgYXQgJyArIE1JTl9QRVJJT0QgKyAnIG1zLiBVc2UgYSBTbmFwVHJhbnNpdGlvbiBmb3IgZmFzdGVyIHRyYW5zaXRpb25zJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcHRpb25zLnBlcmlvZCA9IG9wdGlvbnMucGVyaW9kO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5kYW1waW5nUmF0aW8gIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmRhbXBpbmdSYXRpbyA9IG9wdGlvbnMuZGFtcGluZ1JhdGlvO1xuICAgIGlmIChvcHRpb25zLmxlbmd0aCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMubGVuZ3RoID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgaWYgKG9wdGlvbnMuZm9yY2VGdW5jdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMuZm9yY2VGdW5jdGlvbiA9IG9wdGlvbnMuZm9yY2VGdW5jdGlvbjtcbiAgICBpZiAob3B0aW9ucy5tYXhMZW5ndGggIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLm1heExlbmd0aCA9IG9wdGlvbnMubWF4TGVuZ3RoO1xuICAgIF9pbml0LmNhbGwodGhpcyk7XG4gICAgRm9yY2UucHJvdG90eXBlLnNldE9wdGlvbnMuY2FsbCh0aGlzLCBvcHRpb25zKTtcbn07XG5TcHJpbmcucHJvdG90eXBlLmFwcGx5Rm9yY2UgPSBmdW5jdGlvbiBhcHBseUZvcmNlKHRhcmdldHMsIHNvdXJjZSkge1xuICAgIHZhciBmb3JjZSA9IHRoaXMuZm9yY2U7XG4gICAgdmFyIGRpc3AgPSB0aGlzLmRpc3A7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgdmFyIHN0aWZmbmVzcyA9IG9wdGlvbnMuc3RpZmZuZXNzO1xuICAgIHZhciBkYW1waW5nID0gb3B0aW9ucy5kYW1waW5nO1xuICAgIHZhciByZXN0TGVuZ3RoID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgdmFyIG1heExlbmd0aCA9IG9wdGlvbnMubWF4TGVuZ3RoO1xuICAgIHZhciBhbmNob3IgPSBvcHRpb25zLmFuY2hvciB8fCBzb3VyY2UucG9zaXRpb247XG4gICAgdmFyIGZvcmNlRnVuY3Rpb24gPSBvcHRpb25zLmZvcmNlRnVuY3Rpb247XG4gICAgdmFyIGk7XG4gICAgdmFyIHRhcmdldDtcbiAgICB2YXIgcDI7XG4gICAgdmFyIHYyO1xuICAgIHZhciBkaXN0O1xuICAgIHZhciBtO1xuICAgIGZvciAoaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRhcmdldCA9IHRhcmdldHNbaV07XG4gICAgICAgIHAyID0gdGFyZ2V0LnBvc2l0aW9uO1xuICAgICAgICB2MiA9IHRhcmdldC52ZWxvY2l0eTtcbiAgICAgICAgYW5jaG9yLnN1YihwMikucHV0KGRpc3ApO1xuICAgICAgICBkaXN0ID0gZGlzcC5ub3JtKCkgLSByZXN0TGVuZ3RoO1xuICAgICAgICBpZiAoZGlzdCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbSA9IHRhcmdldC5tYXNzO1xuICAgICAgICBzdGlmZm5lc3MgKj0gbTtcbiAgICAgICAgZGFtcGluZyAqPSBtO1xuICAgICAgICBkaXNwLm5vcm1hbGl6ZShzdGlmZm5lc3MgKiBmb3JjZUZ1bmN0aW9uKGRpc3QsIG1heExlbmd0aCkpLnB1dChmb3JjZSk7XG4gICAgICAgIGlmIChkYW1waW5nKVxuICAgICAgICAgICAgaWYgKHNvdXJjZSlcbiAgICAgICAgICAgICAgICBmb3JjZS5hZGQodjIuc3ViKHNvdXJjZS52ZWxvY2l0eSkubXVsdCgtZGFtcGluZykpLnB1dChmb3JjZSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZm9yY2UuYWRkKHYyLm11bHQoLWRhbXBpbmcpKS5wdXQoZm9yY2UpO1xuICAgICAgICB0YXJnZXQuYXBwbHlGb3JjZShmb3JjZSk7XG4gICAgICAgIGlmIChzb3VyY2UpXG4gICAgICAgICAgICBzb3VyY2UuYXBwbHlGb3JjZShmb3JjZS5tdWx0KC0xKSk7XG4gICAgfVxufTtcblNwcmluZy5wcm90b3R5cGUuZ2V0RW5lcmd5ID0gZnVuY3Rpb24gZ2V0RW5lcmd5KHRhcmdldHMsIHNvdXJjZSkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIHZhciByZXN0TGVuZ3RoID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgdmFyIGFuY2hvciA9IHNvdXJjZSA/IHNvdXJjZS5wb3NpdGlvbiA6IG9wdGlvbnMuYW5jaG9yO1xuICAgIHZhciBzdHJlbmd0aCA9IG9wdGlvbnMuc3RpZmZuZXNzO1xuICAgIHZhciBlbmVyZ3kgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFyZ2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdGFyZ2V0c1tpXTtcbiAgICAgICAgdmFyIGRpc3QgPSBhbmNob3Iuc3ViKHRhcmdldC5wb3NpdGlvbikubm9ybSgpIC0gcmVzdExlbmd0aDtcbiAgICAgICAgZW5lcmd5ICs9IDAuNSAqIHN0cmVuZ3RoICogZGlzdCAqIGRpc3Q7XG4gICAgfVxuICAgIHJldHVybiBlbmVyZ3k7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTcHJpbmc7IiwidmFyIFN5bXBsZWN0aWNFdWxlciA9IHt9O1xuU3ltcGxlY3RpY0V1bGVyLmludGVncmF0ZVZlbG9jaXR5ID0gZnVuY3Rpb24gaW50ZWdyYXRlVmVsb2NpdHkoYm9keSwgZHQpIHtcbiAgICB2YXIgdiA9IGJvZHkudmVsb2NpdHk7XG4gICAgdmFyIHcgPSBib2R5LmludmVyc2VNYXNzO1xuICAgIHZhciBmID0gYm9keS5mb3JjZTtcbiAgICBpZiAoZi5pc1plcm8oKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHYuYWRkKGYubXVsdChkdCAqIHcpKS5wdXQodik7XG4gICAgZi5jbGVhcigpO1xufTtcblN5bXBsZWN0aWNFdWxlci5pbnRlZ3JhdGVQb3NpdGlvbiA9IGZ1bmN0aW9uIGludGVncmF0ZVBvc2l0aW9uKGJvZHksIGR0KSB7XG4gICAgdmFyIHAgPSBib2R5LnBvc2l0aW9uO1xuICAgIHZhciB2ID0gYm9keS52ZWxvY2l0eTtcbiAgICBwLmFkZCh2Lm11bHQoZHQpKS5wdXQocCk7XG59O1xuU3ltcGxlY3RpY0V1bGVyLmludGVncmF0ZUFuZ3VsYXJNb21lbnR1bSA9IGZ1bmN0aW9uIGludGVncmF0ZUFuZ3VsYXJNb21lbnR1bShib2R5LCBkdCkge1xuICAgIHZhciBMID0gYm9keS5hbmd1bGFyTW9tZW50dW07XG4gICAgdmFyIHQgPSBib2R5LnRvcnF1ZTtcbiAgICBpZiAodC5pc1plcm8oKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIEwuYWRkKHQubXVsdChkdCkpLnB1dChMKTtcbiAgICB0LmNsZWFyKCk7XG59O1xuU3ltcGxlY3RpY0V1bGVyLmludGVncmF0ZU9yaWVudGF0aW9uID0gZnVuY3Rpb24gaW50ZWdyYXRlT3JpZW50YXRpb24oYm9keSwgZHQpIHtcbiAgICB2YXIgcSA9IGJvZHkub3JpZW50YXRpb247XG4gICAgdmFyIHcgPSBib2R5LmFuZ3VsYXJWZWxvY2l0eTtcbiAgICBpZiAody5pc1plcm8oKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHEuYWRkKHEubXVsdGlwbHkodykuc2NhbGFyTXVsdGlwbHkoMC41ICogZHQpKS5wdXQocSk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTeW1wbGVjdGljRXVsZXI7IiwidmFyIFN1cmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL1N1cmZhY2UnKTtcbmZ1bmN0aW9uIEltYWdlU3VyZmFjZShvcHRpb25zKSB7XG4gICAgdGhpcy5faW1hZ2VVcmwgPSB1bmRlZmluZWQ7XG4gICAgU3VyZmFjZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxudmFyIHVybENhY2hlID0gW107XG52YXIgY291bnRDYWNoZSA9IFtdO1xudmFyIG5vZGVDYWNoZSA9IFtdO1xudmFyIGNhY2hlRW5hYmxlZCA9IHRydWU7XG5JbWFnZVN1cmZhY2UuZW5hYmxlQ2FjaGUgPSBmdW5jdGlvbiBlbmFibGVDYWNoZSgpIHtcbiAgICBjYWNoZUVuYWJsZWQgPSB0cnVlO1xufTtcbkltYWdlU3VyZmFjZS5kaXNhYmxlQ2FjaGUgPSBmdW5jdGlvbiBkaXNhYmxlQ2FjaGUoKSB7XG4gICAgY2FjaGVFbmFibGVkID0gZmFsc2U7XG59O1xuSW1hZ2VTdXJmYWNlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiBjbGVhckNhY2hlKCkge1xuICAgIHVybENhY2hlID0gW107XG4gICAgY291bnRDYWNoZSA9IFtdO1xuICAgIG5vZGVDYWNoZSA9IFtdO1xufTtcbkltYWdlU3VyZmFjZS5nZXRDYWNoZSA9IGZ1bmN0aW9uIGdldENhY2hlKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHVybENhY2hlOiB1cmxDYWNoZSxcbiAgICAgICAgY291bnRDYWNoZTogY291bnRDYWNoZSxcbiAgICAgICAgbm9kZUNhY2hlOiBjb3VudENhY2hlXG4gICAgfTtcbn07XG5JbWFnZVN1cmZhY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXJmYWNlLnByb3RvdHlwZSk7XG5JbWFnZVN1cmZhY2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gSW1hZ2VTdXJmYWNlO1xuSW1hZ2VTdXJmYWNlLnByb3RvdHlwZS5lbGVtZW50VHlwZSA9ICdpbWcnO1xuSW1hZ2VTdXJmYWNlLnByb3RvdHlwZS5lbGVtZW50Q2xhc3MgPSAnZmFtb3VzLXN1cmZhY2UnO1xuSW1hZ2VTdXJmYWNlLnByb3RvdHlwZS5zZXRDb250ZW50ID0gZnVuY3Rpb24gc2V0Q29udGVudChpbWFnZVVybCkge1xuICAgIHZhciB1cmxJbmRleCA9IHVybENhY2hlLmluZGV4T2YodGhpcy5faW1hZ2VVcmwpO1xuICAgIGlmICh1cmxJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgaWYgKGNvdW50Q2FjaGVbdXJsSW5kZXhdID09PSAxKSB7XG4gICAgICAgICAgICB1cmxDYWNoZS5zcGxpY2UodXJsSW5kZXgsIDEpO1xuICAgICAgICAgICAgY291bnRDYWNoZS5zcGxpY2UodXJsSW5kZXgsIDEpO1xuICAgICAgICAgICAgbm9kZUNhY2hlLnNwbGljZSh1cmxJbmRleCwgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb3VudENhY2hlW3VybEluZGV4XS0tO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVybEluZGV4ID0gdXJsQ2FjaGUuaW5kZXhPZihpbWFnZVVybCk7XG4gICAgaWYgKHVybEluZGV4ID09PSAtMSkge1xuICAgICAgICB1cmxDYWNoZS5wdXNoKGltYWdlVXJsKTtcbiAgICAgICAgY291bnRDYWNoZS5wdXNoKDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvdW50Q2FjaGVbdXJsSW5kZXhdKys7XG4gICAgfVxuICAgIHRoaXMuX2ltYWdlVXJsID0gaW1hZ2VVcmw7XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbn07XG5JbWFnZVN1cmZhY2UucHJvdG90eXBlLmRlcGxveSA9IGZ1bmN0aW9uIGRlcGxveSh0YXJnZXQpIHtcbiAgICB2YXIgdXJsSW5kZXggPSB1cmxDYWNoZS5pbmRleE9mKHRoaXMuX2ltYWdlVXJsKTtcbiAgICBpZiAobm9kZUNhY2hlW3VybEluZGV4XSA9PT0gdW5kZWZpbmVkICYmIGNhY2hlRW5hYmxlZCkge1xuICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltZy5zcmMgPSB0aGlzLl9pbWFnZVVybCB8fCAnJztcbiAgICAgICAgbm9kZUNhY2hlW3VybEluZGV4XSA9IGltZztcbiAgICB9XG4gICAgdGFyZ2V0LnNyYyA9IHRoaXMuX2ltYWdlVXJsIHx8ICcnO1xufTtcbkltYWdlU3VyZmFjZS5wcm90b3R5cGUucmVjYWxsID0gZnVuY3Rpb24gcmVjYWxsKHRhcmdldCkge1xuICAgIHRhcmdldC5zcmMgPSAnJztcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEltYWdlU3VyZmFjZTsiLCJ2YXIgRWFzaW5nID0ge1xuICAgICAgICBpblF1YWQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdCAqIHQ7XG4gICAgICAgIH0sXG4gICAgICAgIG91dFF1YWQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gLSh0IC09IDEpICogdCArIDE7XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0UXVhZDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIGlmICgodCAvPSAwLjUpIDwgMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogdCAqIHQ7XG4gICAgICAgICAgICByZXR1cm4gLTAuNSAqICgtLXQgKiAodCAtIDIpIC0gMSk7XG4gICAgICAgIH0sXG4gICAgICAgIGluQ3ViaWM6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdCAqIHQgKiB0O1xuICAgICAgICB9LFxuICAgICAgICBvdXRDdWJpYzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiAtLXQgKiB0ICogdCArIDE7XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0Q3ViaWM6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gMC41KSA8IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIHQgKiB0ICogdDtcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiAoKHQgLT0gMikgKiB0ICogdCArIDIpO1xuICAgICAgICB9LFxuICAgICAgICBpblF1YXJ0OiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIHQgKiB0ICogdCAqIHQ7XG4gICAgICAgIH0sXG4gICAgICAgIG91dFF1YXJ0OiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIC0oLS10ICogdCAqIHQgKiB0IC0gMSk7XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0UXVhcnQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gMC41KSA8IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIHQgKiB0ICogdCAqIHQ7XG4gICAgICAgICAgICByZXR1cm4gLTAuNSAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAtIDIpO1xuICAgICAgICB9LFxuICAgICAgICBpblF1aW50OiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIHQgKiB0ICogdCAqIHQgKiB0O1xuICAgICAgICB9LFxuICAgICAgICBvdXRRdWludDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiAtLXQgKiB0ICogdCAqIHQgKiB0ICsgMTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5PdXRRdWludDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIGlmICgodCAvPSAwLjUpIDwgMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogdCAqIHQgKiB0ICogdCAqIHQ7XG4gICAgICAgICAgICByZXR1cm4gMC41ICogKCh0IC09IDIpICogdCAqIHQgKiB0ICogdCArIDIpO1xuICAgICAgICB9LFxuICAgICAgICBpblNpbmU6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gLTEgKiBNYXRoLmNvcyh0ICogKE1hdGguUEkgLyAyKSkgKyAxO1xuICAgICAgICB9LFxuICAgICAgICBvdXRTaW5lOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguc2luKHQgKiAoTWF0aC5QSSAvIDIpKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5PdXRTaW5lOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIC0wLjUgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHQpIC0gMSk7XG4gICAgICAgIH0sXG4gICAgICAgIGluRXhwbzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0ID09PSAwID8gMCA6IE1hdGgucG93KDIsIDEwICogKHQgLSAxKSk7XG4gICAgICAgIH0sXG4gICAgICAgIG91dEV4cG86IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdCA9PT0gMSA/IDEgOiAtTWF0aC5wb3coMiwgLTEwICogdCkgKyAxO1xuICAgICAgICB9LFxuICAgICAgICBpbk91dEV4cG86IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBpZiAodCA9PT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIGlmICh0ID09PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgaWYgKCh0IC89IDAuNSkgPCAxKVxuICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiBNYXRoLnBvdygyLCAxMCAqICh0IC0gMSkpO1xuICAgICAgICAgICAgcmV0dXJuIDAuNSAqICgtTWF0aC5wb3coMiwgLTEwICogLS10KSArIDIpO1xuICAgICAgICB9LFxuICAgICAgICBpbkNpcmM6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gLShNYXRoLnNxcnQoMSAtIHQgKiB0KSAtIDEpO1xuICAgICAgICB9LFxuICAgICAgICBvdXRDaXJjOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguc3FydCgxIC0gLS10ICogdCk7XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0Q2lyYzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIGlmICgodCAvPSAwLjUpIDwgMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gLTAuNSAqIChNYXRoLnNxcnQoMSAtIHQgKiB0KSAtIDEpO1xuICAgICAgICAgICAgcmV0dXJuIDAuNSAqIChNYXRoLnNxcnQoMSAtICh0IC09IDIpICogdCkgKyAxKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5FbGFzdGljOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICAgICAgdmFyIHAgPSAwO1xuICAgICAgICAgICAgdmFyIGEgPSAxO1xuICAgICAgICAgICAgaWYgKHQgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBpZiAodCA9PT0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIGlmICghcClcbiAgICAgICAgICAgICAgICBwID0gMC4zO1xuICAgICAgICAgICAgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKDEgLyBhKTtcbiAgICAgICAgICAgIHJldHVybiAtKGEgKiBNYXRoLnBvdygyLCAxMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0IC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpO1xuICAgICAgICB9LFxuICAgICAgICBvdXRFbGFzdGljOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICAgICAgdmFyIHAgPSAwO1xuICAgICAgICAgICAgdmFyIGEgPSAxO1xuICAgICAgICAgICAgaWYgKHQgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBpZiAodCA9PT0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIGlmICghcClcbiAgICAgICAgICAgICAgICBwID0gMC4zO1xuICAgICAgICAgICAgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKDEgLyBhKTtcbiAgICAgICAgICAgIHJldHVybiBhICogTWF0aC5wb3coMiwgLTEwICogdCkgKiBNYXRoLnNpbigodCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApICsgMTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5PdXRFbGFzdGljOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICAgICAgdmFyIHAgPSAwO1xuICAgICAgICAgICAgdmFyIGEgPSAxO1xuICAgICAgICAgICAgaWYgKHQgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBpZiAoKHQgLz0gMC41KSA9PT0gMilcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIGlmICghcClcbiAgICAgICAgICAgICAgICBwID0gMC4zICogMS41O1xuICAgICAgICAgICAgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKDEgLyBhKTtcbiAgICAgICAgICAgIGlmICh0IDwgMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gLTAuNSAqIChhICogTWF0aC5wb3coMiwgMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApKTtcbiAgICAgICAgICAgIHJldHVybiBhICogTWF0aC5wb3coMiwgLTEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSAqIDAuNSArIDE7XG4gICAgICAgIH0sXG4gICAgICAgIGluQmFjazogZnVuY3Rpb24gKHQsIHMpIHtcbiAgICAgICAgICAgIGlmIChzID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcyA9IDEuNzAxNTg7XG4gICAgICAgICAgICByZXR1cm4gdCAqIHQgKiAoKHMgKyAxKSAqIHQgLSBzKTtcbiAgICAgICAgfSxcbiAgICAgICAgb3V0QmFjazogZnVuY3Rpb24gKHQsIHMpIHtcbiAgICAgICAgICAgIGlmIChzID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcyA9IDEuNzAxNTg7XG4gICAgICAgICAgICByZXR1cm4gLS10ICogdCAqICgocyArIDEpICogdCArIHMpICsgMTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5PdXRCYWNrOiBmdW5jdGlvbiAodCwgcykge1xuICAgICAgICAgICAgaWYgKHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBzID0gMS43MDE1ODtcbiAgICAgICAgICAgIGlmICgodCAvPSAwLjUpIDwgMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogKHQgKiB0ICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHQgLSBzKSk7XG4gICAgICAgICAgICByZXR1cm4gMC41ICogKCh0IC09IDIpICogdCAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB0ICsgcykgKyAyKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5Cb3VuY2U6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gMSAtIEVhc2luZy5vdXRCb3VuY2UoMSAtIHQpO1xuICAgICAgICB9LFxuICAgICAgICBvdXRCb3VuY2U6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBpZiAodCA8IDEgLyAyLjc1KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqIHQgKiB0O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0IDwgMiAvIDIuNzUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gNy41NjI1ICogKHQgLT0gMS41IC8gMi43NSkgKiB0ICsgMC43NTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodCA8IDIuNSAvIDIuNzUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gNy41NjI1ICogKHQgLT0gMi4yNSAvIDIuNzUpICogdCArIDAuOTM3NTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqICh0IC09IDIuNjI1IC8gMi43NSkgKiB0ICsgMC45ODQzNzU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0Qm91bmNlOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgaWYgKHQgPCAwLjUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVhc2luZy5pbkJvdW5jZSh0ICogMikgKiAwLjU7XG4gICAgICAgICAgICByZXR1cm4gRWFzaW5nLm91dEJvdW5jZSh0ICogMiAtIDEpICogMC41ICsgMC41O1xuICAgICAgICB9XG4gICAgfTtcbm1vZHVsZS5leHBvcnRzID0gRWFzaW5nOyIsInZhciBVdGlsaXR5ID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL1V0aWxpdHknKTtcbmZ1bmN0aW9uIE11bHRpcGxlVHJhbnNpdGlvbihtZXRob2QpIHtcbiAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgICB0aGlzLl9pbnN0YW5jZXMgPSBbXTtcbiAgICB0aGlzLnN0YXRlID0gW107XG59XG5NdWx0aXBsZVRyYW5zaXRpb24uU1VQUE9SVFNfTVVMVElQTEUgPSB0cnVlO1xuTXVsdGlwbGVUcmFuc2l0aW9uLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9pbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5zdGF0ZVtpXSA9IHRoaXMuX2luc3RhbmNlc1tpXS5nZXQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XG59O1xuTXVsdGlwbGVUcmFuc2l0aW9uLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoZW5kU3RhdGUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgdmFyIF9hbGxDYWxsYmFjayA9IFV0aWxpdHkuYWZ0ZXIoZW5kU3RhdGUubGVuZ3RoLCBjYWxsYmFjayk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbmRTdGF0ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIXRoaXMuX2luc3RhbmNlc1tpXSlcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlc1tpXSA9IG5ldyB0aGlzLm1ldGhvZCgpO1xuICAgICAgICB0aGlzLl9pbnN0YW5jZXNbaV0uc2V0KGVuZFN0YXRlW2ldLCB0cmFuc2l0aW9uLCBfYWxsQ2FsbGJhY2spO1xuICAgIH1cbn07XG5NdWx0aXBsZVRyYW5zaXRpb24ucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoc3RhcnRTdGF0ZSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhcnRTdGF0ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIXRoaXMuX2luc3RhbmNlc1tpXSlcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlc1tpXSA9IG5ldyB0aGlzLm1ldGhvZCgpO1xuICAgICAgICB0aGlzLl9pbnN0YW5jZXNbaV0ucmVzZXQoc3RhcnRTdGF0ZVtpXSk7XG4gICAgfVxufTtcbm1vZHVsZS5leHBvcnRzID0gTXVsdGlwbGVUcmFuc2l0aW9uOyIsInZhciBQRSA9IHJlcXVpcmUoJy4uL3BoeXNpY3MvUGh5c2ljc0VuZ2luZScpO1xudmFyIFBhcnRpY2xlID0gcmVxdWlyZSgnLi4vcGh5c2ljcy9ib2RpZXMvUGFydGljbGUnKTtcbnZhciBTcHJpbmcgPSByZXF1aXJlKCcuLi9waHlzaWNzL2NvbnN0cmFpbnRzL1NuYXAnKTtcbnZhciBWZWN0b3IgPSByZXF1aXJlKCcuLi9tYXRoL1ZlY3RvcicpO1xuZnVuY3Rpb24gU25hcFRyYW5zaXRpb24oc3RhdGUpIHtcbiAgICBzdGF0ZSA9IHN0YXRlIHx8IDA7XG4gICAgdGhpcy5lbmRTdGF0ZSA9IG5ldyBWZWN0b3Ioc3RhdGUpO1xuICAgIHRoaXMuaW5pdFN0YXRlID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMuX2RpbWVuc2lvbnMgPSAxO1xuICAgIHRoaXMuX3Jlc3RUb2xlcmFuY2UgPSAxZS0xMDtcbiAgICB0aGlzLl9hYnNSZXN0VG9sZXJhbmNlID0gdGhpcy5fcmVzdFRvbGVyYW5jZTtcbiAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLlBFID0gbmV3IFBFKCk7XG4gICAgdGhpcy5wYXJ0aWNsZSA9IG5ldyBQYXJ0aWNsZSgpO1xuICAgIHRoaXMuc3ByaW5nID0gbmV3IFNwcmluZyh7IGFuY2hvcjogdGhpcy5lbmRTdGF0ZSB9KTtcbiAgICB0aGlzLlBFLmFkZEJvZHkodGhpcy5wYXJ0aWNsZSk7XG4gICAgdGhpcy5QRS5hdHRhY2godGhpcy5zcHJpbmcsIHRoaXMucGFydGljbGUpO1xufVxuU25hcFRyYW5zaXRpb24uU1VQUE9SVFNfTVVMVElQTEUgPSAzO1xuU25hcFRyYW5zaXRpb24uREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHBlcmlvZDogMTAwLFxuICAgIGRhbXBpbmdSYXRpbzogMC4yLFxuICAgIHZlbG9jaXR5OiAwXG59O1xuZnVuY3Rpb24gX2dldEVuZXJneSgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJ0aWNsZS5nZXRFbmVyZ3koKSArIHRoaXMuc3ByaW5nLmdldEVuZXJneShbdGhpcy5wYXJ0aWNsZV0pO1xufVxuZnVuY3Rpb24gX3NldEFic29sdXRlUmVzdFRvbGVyYW5jZSgpIHtcbiAgICB2YXIgZGlzdGFuY2UgPSB0aGlzLmVuZFN0YXRlLnN1Yih0aGlzLmluaXRTdGF0ZSkubm9ybVNxdWFyZWQoKTtcbiAgICB0aGlzLl9hYnNSZXN0VG9sZXJhbmNlID0gZGlzdGFuY2UgPT09IDAgPyB0aGlzLl9yZXN0VG9sZXJhbmNlIDogdGhpcy5fcmVzdFRvbGVyYW5jZSAqIGRpc3RhbmNlO1xufVxuZnVuY3Rpb24gX3NldFRhcmdldCh0YXJnZXQpIHtcbiAgICB0aGlzLmVuZFN0YXRlLnNldCh0YXJnZXQpO1xuICAgIF9zZXRBYnNvbHV0ZVJlc3RUb2xlcmFuY2UuY2FsbCh0aGlzKTtcbn1cbmZ1bmN0aW9uIF93YWtlKCkge1xuICAgIHRoaXMuUEUud2FrZSgpO1xufVxuZnVuY3Rpb24gX3NsZWVwKCkge1xuICAgIHRoaXMuUEUuc2xlZXAoKTtcbn1cbmZ1bmN0aW9uIF9zZXRQYXJ0aWNsZVBvc2l0aW9uKHApIHtcbiAgICB0aGlzLnBhcnRpY2xlLnBvc2l0aW9uLnNldChwKTtcbn1cbmZ1bmN0aW9uIF9zZXRQYXJ0aWNsZVZlbG9jaXR5KHYpIHtcbiAgICB0aGlzLnBhcnRpY2xlLnZlbG9jaXR5LnNldCh2KTtcbn1cbmZ1bmN0aW9uIF9nZXRQYXJ0aWNsZVBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9kaW1lbnNpb25zID09PSAwID8gdGhpcy5wYXJ0aWNsZS5nZXRQb3NpdGlvbjFEKCkgOiB0aGlzLnBhcnRpY2xlLmdldFBvc2l0aW9uKCk7XG59XG5mdW5jdGlvbiBfZ2V0UGFydGljbGVWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGltZW5zaW9ucyA9PT0gMCA/IHRoaXMucGFydGljbGUuZ2V0VmVsb2NpdHkxRCgpIDogdGhpcy5wYXJ0aWNsZS5nZXRWZWxvY2l0eSgpO1xufVxuZnVuY3Rpb24gX3NldENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbn1cbmZ1bmN0aW9uIF9zZXR1cERlZmluaXRpb24oZGVmaW5pdGlvbikge1xuICAgIHZhciBkZWZhdWx0cyA9IFNuYXBUcmFuc2l0aW9uLkRFRkFVTFRfT1BUSU9OUztcbiAgICBpZiAoZGVmaW5pdGlvbi5wZXJpb2QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgZGVmaW5pdGlvbi5wZXJpb2QgPSBkZWZhdWx0cy5wZXJpb2Q7XG4gICAgaWYgKGRlZmluaXRpb24uZGFtcGluZ1JhdGlvID09PSB1bmRlZmluZWQpXG4gICAgICAgIGRlZmluaXRpb24uZGFtcGluZ1JhdGlvID0gZGVmYXVsdHMuZGFtcGluZ1JhdGlvO1xuICAgIGlmIChkZWZpbml0aW9uLnZlbG9jaXR5ID09PSB1bmRlZmluZWQpXG4gICAgICAgIGRlZmluaXRpb24udmVsb2NpdHkgPSBkZWZhdWx0cy52ZWxvY2l0eTtcbiAgICB0aGlzLnNwcmluZy5zZXRPcHRpb25zKHtcbiAgICAgICAgcGVyaW9kOiBkZWZpbml0aW9uLnBlcmlvZCxcbiAgICAgICAgZGFtcGluZ1JhdGlvOiBkZWZpbml0aW9uLmRhbXBpbmdSYXRpb1xuICAgIH0pO1xuICAgIF9zZXRQYXJ0aWNsZVZlbG9jaXR5LmNhbGwodGhpcywgZGVmaW5pdGlvbi52ZWxvY2l0eSk7XG59XG5mdW5jdGlvbiBfdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLlBFLmlzU2xlZXBpbmcoKSkge1xuICAgICAgICBpZiAodGhpcy5fY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBjYiA9IHRoaXMuX2NhbGxiYWNrO1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKF9nZXRFbmVyZ3kuY2FsbCh0aGlzKSA8IHRoaXMuX2Fic1Jlc3RUb2xlcmFuY2UpIHtcbiAgICAgICAgX3NldFBhcnRpY2xlUG9zaXRpb24uY2FsbCh0aGlzLCB0aGlzLmVuZFN0YXRlKTtcbiAgICAgICAgX3NldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzLCBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSk7XG4gICAgICAgIF9zbGVlcC5jYWxsKHRoaXMpO1xuICAgIH1cbn1cblNuYXBUcmFuc2l0aW9uLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KHN0YXRlLCB2ZWxvY2l0eSkge1xuICAgIHRoaXMuX2RpbWVuc2lvbnMgPSBzdGF0ZSBpbnN0YW5jZW9mIEFycmF5ID8gc3RhdGUubGVuZ3RoIDogMDtcbiAgICB0aGlzLmluaXRTdGF0ZS5zZXQoc3RhdGUpO1xuICAgIF9zZXRQYXJ0aWNsZVBvc2l0aW9uLmNhbGwodGhpcywgc3RhdGUpO1xuICAgIF9zZXRUYXJnZXQuY2FsbCh0aGlzLCBzdGF0ZSk7XG4gICAgaWYgKHZlbG9jaXR5KVxuICAgICAgICBfc2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMsIHZlbG9jaXR5KTtcbiAgICBfc2V0Q2FsbGJhY2suY2FsbCh0aGlzLCB1bmRlZmluZWQpO1xufTtcblNuYXBUcmFuc2l0aW9uLnByb3RvdHlwZS5nZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIGdldFZlbG9jaXR5KCkge1xuICAgIHJldHVybiBfZ2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMpO1xufTtcblNuYXBUcmFuc2l0aW9uLnByb3RvdHlwZS5zZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIHNldFZlbG9jaXR5KHZlbG9jaXR5KSB7XG4gICAgdGhpcy5jYWxsKHRoaXMsIF9zZXRQYXJ0aWNsZVZlbG9jaXR5KHZlbG9jaXR5KSk7XG59O1xuU25hcFRyYW5zaXRpb24ucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuICF0aGlzLlBFLmlzU2xlZXBpbmcoKTtcbn07XG5TbmFwVHJhbnNpdGlvbi5wcm90b3R5cGUuaGFsdCA9IGZ1bmN0aW9uIGhhbHQoKSB7XG4gICAgdGhpcy5zZXQodGhpcy5nZXQoKSk7XG59O1xuU25hcFRyYW5zaXRpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCgpIHtcbiAgICBfdXBkYXRlLmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIF9nZXRQYXJ0aWNsZVBvc2l0aW9uLmNhbGwodGhpcyk7XG59O1xuU25hcFRyYW5zaXRpb24ucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChzdGF0ZSwgZGVmaW5pdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoIWRlZmluaXRpb24pIHtcbiAgICAgICAgdGhpcy5yZXNldChzdGF0ZSk7XG4gICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZGltZW5zaW9ucyA9IHN0YXRlIGluc3RhbmNlb2YgQXJyYXkgPyBzdGF0ZS5sZW5ndGggOiAwO1xuICAgIF93YWtlLmNhbGwodGhpcyk7XG4gICAgX3NldHVwRGVmaW5pdGlvbi5jYWxsKHRoaXMsIGRlZmluaXRpb24pO1xuICAgIF9zZXRUYXJnZXQuY2FsbCh0aGlzLCBzdGF0ZSk7XG4gICAgX3NldENhbGxiYWNrLmNhbGwodGhpcywgY2FsbGJhY2spO1xufTtcbm1vZHVsZS5leHBvcnRzID0gU25hcFRyYW5zaXRpb247IiwidmFyIFBFID0gcmVxdWlyZSgnLi4vcGh5c2ljcy9QaHlzaWNzRW5naW5lJyk7XG52YXIgUGFydGljbGUgPSByZXF1aXJlKCcuLi9waHlzaWNzL2JvZGllcy9QYXJ0aWNsZScpO1xudmFyIFNwcmluZyA9IHJlcXVpcmUoJy4uL3BoeXNpY3MvZm9yY2VzL1NwcmluZycpO1xudmFyIFZlY3RvciA9IHJlcXVpcmUoJy4uL21hdGgvVmVjdG9yJyk7XG5mdW5jdGlvbiBTcHJpbmdUcmFuc2l0aW9uKHN0YXRlKSB7XG4gICAgc3RhdGUgPSBzdGF0ZSB8fCAwO1xuICAgIHRoaXMuZW5kU3RhdGUgPSBuZXcgVmVjdG9yKHN0YXRlKTtcbiAgICB0aGlzLmluaXRTdGF0ZSA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLl9kaW1lbnNpb25zID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3Jlc3RUb2xlcmFuY2UgPSAxZS0xMDtcbiAgICB0aGlzLl9hYnNSZXN0VG9sZXJhbmNlID0gdGhpcy5fcmVzdFRvbGVyYW5jZTtcbiAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLlBFID0gbmV3IFBFKCk7XG4gICAgdGhpcy5zcHJpbmcgPSBuZXcgU3ByaW5nKHsgYW5jaG9yOiB0aGlzLmVuZFN0YXRlIH0pO1xuICAgIHRoaXMucGFydGljbGUgPSBuZXcgUGFydGljbGUoKTtcbiAgICB0aGlzLlBFLmFkZEJvZHkodGhpcy5wYXJ0aWNsZSk7XG4gICAgdGhpcy5QRS5hdHRhY2godGhpcy5zcHJpbmcsIHRoaXMucGFydGljbGUpO1xufVxuU3ByaW5nVHJhbnNpdGlvbi5TVVBQT1JUU19NVUxUSVBMRSA9IDM7XG5TcHJpbmdUcmFuc2l0aW9uLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBwZXJpb2Q6IDMwMCxcbiAgICBkYW1waW5nUmF0aW86IDAuNSxcbiAgICB2ZWxvY2l0eTogMFxufTtcbmZ1bmN0aW9uIF9nZXRFbmVyZ3koKSB7XG4gICAgcmV0dXJuIHRoaXMucGFydGljbGUuZ2V0RW5lcmd5KCkgKyB0aGlzLnNwcmluZy5nZXRFbmVyZ3koW3RoaXMucGFydGljbGVdKTtcbn1cbmZ1bmN0aW9uIF9zZXRQYXJ0aWNsZVBvc2l0aW9uKHApIHtcbiAgICB0aGlzLnBhcnRpY2xlLnNldFBvc2l0aW9uKHApO1xufVxuZnVuY3Rpb24gX3NldFBhcnRpY2xlVmVsb2NpdHkodikge1xuICAgIHRoaXMucGFydGljbGUuc2V0VmVsb2NpdHkodik7XG59XG5mdW5jdGlvbiBfZ2V0UGFydGljbGVQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fZGltZW5zaW9ucyA9PT0gMCA/IHRoaXMucGFydGljbGUuZ2V0UG9zaXRpb24xRCgpIDogdGhpcy5wYXJ0aWNsZS5nZXRQb3NpdGlvbigpO1xufVxuZnVuY3Rpb24gX2dldFBhcnRpY2xlVmVsb2NpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RpbWVuc2lvbnMgPT09IDAgPyB0aGlzLnBhcnRpY2xlLmdldFZlbG9jaXR5MUQoKSA6IHRoaXMucGFydGljbGUuZ2V0VmVsb2NpdHkoKTtcbn1cbmZ1bmN0aW9uIF9zZXRDYWxsYmFjayhjYWxsYmFjaykge1xuICAgIHRoaXMuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG59XG5mdW5jdGlvbiBfd2FrZSgpIHtcbiAgICB0aGlzLlBFLndha2UoKTtcbn1cbmZ1bmN0aW9uIF9zbGVlcCgpIHtcbiAgICB0aGlzLlBFLnNsZWVwKCk7XG59XG5mdW5jdGlvbiBfdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLlBFLmlzU2xlZXBpbmcoKSkge1xuICAgICAgICBpZiAodGhpcy5fY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBjYiA9IHRoaXMuX2NhbGxiYWNrO1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKF9nZXRFbmVyZ3kuY2FsbCh0aGlzKSA8IHRoaXMuX2Fic1Jlc3RUb2xlcmFuY2UpIHtcbiAgICAgICAgX3NldFBhcnRpY2xlUG9zaXRpb24uY2FsbCh0aGlzLCB0aGlzLmVuZFN0YXRlKTtcbiAgICAgICAgX3NldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzLCBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSk7XG4gICAgICAgIF9zbGVlcC5jYWxsKHRoaXMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9zZXR1cERlZmluaXRpb24oZGVmaW5pdGlvbikge1xuICAgIHZhciBkZWZhdWx0cyA9IFNwcmluZ1RyYW5zaXRpb24uREVGQVVMVF9PUFRJT05TO1xuICAgIGlmIChkZWZpbml0aW9uLnBlcmlvZCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBkZWZpbml0aW9uLnBlcmlvZCA9IGRlZmF1bHRzLnBlcmlvZDtcbiAgICBpZiAoZGVmaW5pdGlvbi5kYW1waW5nUmF0aW8gPT09IHVuZGVmaW5lZClcbiAgICAgICAgZGVmaW5pdGlvbi5kYW1waW5nUmF0aW8gPSBkZWZhdWx0cy5kYW1waW5nUmF0aW87XG4gICAgaWYgKGRlZmluaXRpb24udmVsb2NpdHkgPT09IHVuZGVmaW5lZClcbiAgICAgICAgZGVmaW5pdGlvbi52ZWxvY2l0eSA9IGRlZmF1bHRzLnZlbG9jaXR5O1xuICAgIGlmIChkZWZpbml0aW9uLnBlcmlvZCA8IDE1MCkge1xuICAgICAgICBkZWZpbml0aW9uLnBlcmlvZCA9IDE1MDtcbiAgICAgICAgY29uc29sZS53YXJuKCdUaGUgcGVyaW9kIG9mIGEgU3ByaW5nVHJhbnNpdGlvbiBpcyBjYXBwZWQgYXQgMTUwIG1zLiBVc2UgYSBTbmFwVHJhbnNpdGlvbiBmb3IgZmFzdGVyIHRyYW5zaXRpb25zJyk7XG4gICAgfVxuICAgIHRoaXMuc3ByaW5nLnNldE9wdGlvbnMoe1xuICAgICAgICBwZXJpb2Q6IGRlZmluaXRpb24ucGVyaW9kLFxuICAgICAgICBkYW1waW5nUmF0aW86IGRlZmluaXRpb24uZGFtcGluZ1JhdGlvXG4gICAgfSk7XG4gICAgX3NldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzLCBkZWZpbml0aW9uLnZlbG9jaXR5KTtcbn1cbmZ1bmN0aW9uIF9zZXRBYnNvbHV0ZVJlc3RUb2xlcmFuY2UoKSB7XG4gICAgdmFyIGRpc3RhbmNlID0gdGhpcy5lbmRTdGF0ZS5zdWIodGhpcy5pbml0U3RhdGUpLm5vcm1TcXVhcmVkKCk7XG4gICAgdGhpcy5fYWJzUmVzdFRvbGVyYW5jZSA9IGRpc3RhbmNlID09PSAwID8gdGhpcy5fcmVzdFRvbGVyYW5jZSA6IHRoaXMuX3Jlc3RUb2xlcmFuY2UgKiBkaXN0YW5jZTtcbn1cbmZ1bmN0aW9uIF9zZXRUYXJnZXQodGFyZ2V0KSB7XG4gICAgdGhpcy5lbmRTdGF0ZS5zZXQodGFyZ2V0KTtcbiAgICBfc2V0QWJzb2x1dGVSZXN0VG9sZXJhbmNlLmNhbGwodGhpcyk7XG59XG5TcHJpbmdUcmFuc2l0aW9uLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KHBvcywgdmVsKSB7XG4gICAgdGhpcy5fZGltZW5zaW9ucyA9IHBvcyBpbnN0YW5jZW9mIEFycmF5ID8gcG9zLmxlbmd0aCA6IDA7XG4gICAgdGhpcy5pbml0U3RhdGUuc2V0KHBvcyk7XG4gICAgX3NldFBhcnRpY2xlUG9zaXRpb24uY2FsbCh0aGlzLCBwb3MpO1xuICAgIF9zZXRUYXJnZXQuY2FsbCh0aGlzLCBwb3MpO1xuICAgIGlmICh2ZWwpXG4gICAgICAgIF9zZXRQYXJ0aWNsZVZlbG9jaXR5LmNhbGwodGhpcywgdmVsKTtcbiAgICBfc2V0Q2FsbGJhY2suY2FsbCh0aGlzLCB1bmRlZmluZWQpO1xufTtcblNwcmluZ1RyYW5zaXRpb24ucHJvdG90eXBlLmdldFZlbG9jaXR5ID0gZnVuY3Rpb24gZ2V0VmVsb2NpdHkoKSB7XG4gICAgcmV0dXJuIF9nZXRQYXJ0aWNsZVZlbG9jaXR5LmNhbGwodGhpcyk7XG59O1xuU3ByaW5nVHJhbnNpdGlvbi5wcm90b3R5cGUuc2V0VmVsb2NpdHkgPSBmdW5jdGlvbiBzZXRWZWxvY2l0eSh2KSB7XG4gICAgdGhpcy5jYWxsKHRoaXMsIF9zZXRQYXJ0aWNsZVZlbG9jaXR5KHYpKTtcbn07XG5TcHJpbmdUcmFuc2l0aW9uLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiAhdGhpcy5QRS5pc1NsZWVwaW5nKCk7XG59O1xuU3ByaW5nVHJhbnNpdGlvbi5wcm90b3R5cGUuaGFsdCA9IGZ1bmN0aW9uIGhhbHQoKSB7XG4gICAgdGhpcy5zZXQodGhpcy5nZXQoKSk7XG59O1xuU3ByaW5nVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIF91cGRhdGUuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gX2dldFBhcnRpY2xlUG9zaXRpb24uY2FsbCh0aGlzKTtcbn07XG5TcHJpbmdUcmFuc2l0aW9uLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoZW5kU3RhdGUsIGRlZmluaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFkZWZpbml0aW9uKSB7XG4gICAgICAgIHRoaXMucmVzZXQoZW5kU3RhdGUpO1xuICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2RpbWVuc2lvbnMgPSBlbmRTdGF0ZSBpbnN0YW5jZW9mIEFycmF5ID8gZW5kU3RhdGUubGVuZ3RoIDogMDtcbiAgICBfd2FrZS5jYWxsKHRoaXMpO1xuICAgIF9zZXR1cERlZmluaXRpb24uY2FsbCh0aGlzLCBkZWZpbml0aW9uKTtcbiAgICBfc2V0VGFyZ2V0LmNhbGwodGhpcywgZW5kU3RhdGUpO1xuICAgIF9zZXRDYWxsYmFjay5jYWxsKHRoaXMsIGNhbGxiYWNrKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFNwcmluZ1RyYW5zaXRpb247IiwidmFyIE11bHRpcGxlVHJhbnNpdGlvbiA9IHJlcXVpcmUoJy4vTXVsdGlwbGVUcmFuc2l0aW9uJyk7XG52YXIgVHdlZW5UcmFuc2l0aW9uID0gcmVxdWlyZSgnLi9Ud2VlblRyYW5zaXRpb24nKTtcbmZ1bmN0aW9uIFRyYW5zaXRpb25hYmxlKHN0YXJ0KSB7XG4gICAgdGhpcy5jdXJyZW50QWN0aW9uID0gbnVsbDtcbiAgICB0aGlzLmFjdGlvblF1ZXVlID0gW107XG4gICAgdGhpcy5jYWxsYmFja1F1ZXVlID0gW107XG4gICAgdGhpcy5zdGF0ZSA9IDA7XG4gICAgdGhpcy52ZWxvY2l0eSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9lbmdpbmVJbnN0YW5jZSA9IG51bGw7XG4gICAgdGhpcy5fY3VycmVudE1ldGhvZCA9IG51bGw7XG4gICAgdGhpcy5zZXQoc3RhcnQpO1xufVxudmFyIHRyYW5zaXRpb25NZXRob2RzID0ge307XG5UcmFuc2l0aW9uYWJsZS5yZWdpc3RlciA9IGZ1bmN0aW9uIHJlZ2lzdGVyKG1ldGhvZHMpIHtcbiAgICB2YXIgc3VjY2VzcyA9IHRydWU7XG4gICAgZm9yICh2YXIgbWV0aG9kIGluIG1ldGhvZHMpIHtcbiAgICAgICAgaWYgKCFUcmFuc2l0aW9uYWJsZS5yZWdpc3Rlck1ldGhvZChtZXRob2QsIG1ldGhvZHNbbWV0aG9kXSkpXG4gICAgICAgICAgICBzdWNjZXNzID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBzdWNjZXNzO1xufTtcblRyYW5zaXRpb25hYmxlLnJlZ2lzdGVyTWV0aG9kID0gZnVuY3Rpb24gcmVnaXN0ZXJNZXRob2QobmFtZSwgZW5naW5lQ2xhc3MpIHtcbiAgICBpZiAoIShuYW1lIGluIHRyYW5zaXRpb25NZXRob2RzKSkge1xuICAgICAgICB0cmFuc2l0aW9uTWV0aG9kc1tuYW1lXSA9IGVuZ2luZUNsYXNzO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xufTtcblRyYW5zaXRpb25hYmxlLnVucmVnaXN0ZXJNZXRob2QgPSBmdW5jdGlvbiB1bnJlZ2lzdGVyTWV0aG9kKG5hbWUpIHtcbiAgICBpZiAobmFtZSBpbiB0cmFuc2l0aW9uTWV0aG9kcykge1xuICAgICAgICBkZWxldGUgdHJhbnNpdGlvbk1ldGhvZHNbbmFtZV07XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gZmFsc2U7XG59O1xuZnVuY3Rpb24gX2xvYWROZXh0KCkge1xuICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLl9jYWxsYmFjaztcbiAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmFjdGlvblF1ZXVlLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgIHRoaXMuc2V0KHRoaXMuZ2V0KCkpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IHRoaXMuYWN0aW9uUXVldWUuc2hpZnQoKTtcbiAgICB0aGlzLl9jYWxsYmFjayA9IHRoaXMuY2FsbGJhY2tRdWV1ZS5zaGlmdCgpO1xuICAgIHZhciBtZXRob2QgPSBudWxsO1xuICAgIHZhciBlbmRWYWx1ZSA9IHRoaXMuY3VycmVudEFjdGlvblswXTtcbiAgICB2YXIgdHJhbnNpdGlvbiA9IHRoaXMuY3VycmVudEFjdGlvblsxXTtcbiAgICBpZiAodHJhbnNpdGlvbiBpbnN0YW5jZW9mIE9iamVjdCAmJiB0cmFuc2l0aW9uLm1ldGhvZCkge1xuICAgICAgICBtZXRob2QgPSB0cmFuc2l0aW9uLm1ldGhvZDtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgbWV0aG9kID0gdHJhbnNpdGlvbk1ldGhvZHNbbWV0aG9kXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBtZXRob2QgPSBUd2VlblRyYW5zaXRpb247XG4gICAgfVxuICAgIGlmICh0aGlzLl9jdXJyZW50TWV0aG9kICE9PSBtZXRob2QpIHtcbiAgICAgICAgaWYgKCEoZW5kVmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHx8IG1ldGhvZC5TVVBQT1JUU19NVUxUSVBMRSA9PT0gdHJ1ZSB8fCBlbmRWYWx1ZS5sZW5ndGggPD0gbWV0aG9kLlNVUFBPUlRTX01VTFRJUExFKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmdpbmVJbnN0YW5jZSA9IG5ldyBtZXRob2QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2VuZ2luZUluc3RhbmNlID0gbmV3IE11bHRpcGxlVHJhbnNpdGlvbihtZXRob2QpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2N1cnJlbnRNZXRob2QgPSBtZXRob2Q7XG4gICAgfVxuICAgIHRoaXMuX2VuZ2luZUluc3RhbmNlLnJlc2V0KHRoaXMuc3RhdGUsIHRoaXMudmVsb2NpdHkpO1xuICAgIGlmICh0aGlzLnZlbG9jaXR5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRyYW5zaXRpb24udmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5O1xuICAgIHRoaXMuX2VuZ2luZUluc3RhbmNlLnNldChlbmRWYWx1ZSwgdHJhbnNpdGlvbiwgX2xvYWROZXh0LmJpbmQodGhpcykpO1xufVxuVHJhbnNpdGlvbmFibGUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChlbmRTdGF0ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoIXRyYW5zaXRpb24pIHtcbiAgICAgICAgdGhpcy5yZXNldChlbmRTdGF0ZSk7XG4gICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB2YXIgYWN0aW9uID0gW1xuICAgICAgICAgICAgZW5kU3RhdGUsXG4gICAgICAgICAgICB0cmFuc2l0aW9uXG4gICAgICAgIF07XG4gICAgdGhpcy5hY3Rpb25RdWV1ZS5wdXNoKGFjdGlvbik7XG4gICAgdGhpcy5jYWxsYmFja1F1ZXVlLnB1c2goY2FsbGJhY2spO1xuICAgIGlmICghdGhpcy5jdXJyZW50QWN0aW9uKVxuICAgICAgICBfbG9hZE5leHQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UcmFuc2l0aW9uYWJsZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiByZXNldChzdGFydFN0YXRlLCBzdGFydFZlbG9jaXR5KSB7XG4gICAgdGhpcy5fY3VycmVudE1ldGhvZCA9IG51bGw7XG4gICAgdGhpcy5fZW5naW5lSW5zdGFuY2UgPSBudWxsO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc3RhdGUgPSBzdGFydFN0YXRlO1xuICAgIHRoaXMudmVsb2NpdHkgPSBzdGFydFZlbG9jaXR5O1xuICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IG51bGw7XG4gICAgdGhpcy5hY3Rpb25RdWV1ZSA9IFtdO1xuICAgIHRoaXMuY2FsbGJhY2tRdWV1ZSA9IFtdO1xufTtcblRyYW5zaXRpb25hYmxlLnByb3RvdHlwZS5kZWxheSA9IGZ1bmN0aW9uIGRlbGF5KGR1cmF0aW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMuc2V0KHRoaXMuZ2V0KCksIHtcbiAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICBjdXJ2ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9LCBjYWxsYmFjayk7XG59O1xuVHJhbnNpdGlvbmFibGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCh0aW1lc3RhbXApIHtcbiAgICBpZiAodGhpcy5fZW5naW5lSW5zdGFuY2UpIHtcbiAgICAgICAgaWYgKHRoaXMuX2VuZ2luZUluc3RhbmNlLmdldFZlbG9jaXR5KVxuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHRoaXMuX2VuZ2luZUluc3RhbmNlLmdldFZlbG9jaXR5KCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLl9lbmdpbmVJbnN0YW5jZS5nZXQodGltZXN0YW1wKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XG59O1xuVHJhbnNpdGlvbmFibGUucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5jdXJyZW50QWN0aW9uO1xufTtcblRyYW5zaXRpb25hYmxlLnByb3RvdHlwZS5oYWx0ID0gZnVuY3Rpb24gaGFsdCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXQodGhpcy5nZXQoKSk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBUcmFuc2l0aW9uYWJsZTsiLCJ2YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCcuL1RyYW5zaXRpb25hYmxlJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi4vY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBVdGlsaXR5ID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL1V0aWxpdHknKTtcbmZ1bmN0aW9uIFRyYW5zaXRpb25hYmxlVHJhbnNmb3JtKHRyYW5zZm9ybSkge1xuICAgIHRoaXMuX2ZpbmFsID0gVHJhbnNmb3JtLmlkZW50aXR5LnNsaWNlKCk7XG4gICAgdGhpcy5fZmluYWxUcmFuc2xhdGUgPSBbXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdO1xuICAgIHRoaXMuX2ZpbmFsUm90YXRlID0gW1xuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXTtcbiAgICB0aGlzLl9maW5hbFNrZXcgPSBbXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdO1xuICAgIHRoaXMuX2ZpbmFsU2NhbGUgPSBbXG4gICAgICAgIDEsXG4gICAgICAgIDEsXG4gICAgICAgIDFcbiAgICBdO1xuICAgIHRoaXMudHJhbnNsYXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMuX2ZpbmFsVHJhbnNsYXRlKTtcbiAgICB0aGlzLnJvdGF0ZSA9IG5ldyBUcmFuc2l0aW9uYWJsZSh0aGlzLl9maW5hbFJvdGF0ZSk7XG4gICAgdGhpcy5za2V3ID0gbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMuX2ZpbmFsU2tldyk7XG4gICAgdGhpcy5zY2FsZSA9IG5ldyBUcmFuc2l0aW9uYWJsZSh0aGlzLl9maW5hbFNjYWxlKTtcbiAgICBpZiAodHJhbnNmb3JtKVxuICAgICAgICB0aGlzLnNldCh0cmFuc2Zvcm0pO1xufVxuZnVuY3Rpb24gX2J1aWxkKCkge1xuICAgIHJldHVybiBUcmFuc2Zvcm0uYnVpbGQoe1xuICAgICAgICB0cmFuc2xhdGU6IHRoaXMudHJhbnNsYXRlLmdldCgpLFxuICAgICAgICByb3RhdGU6IHRoaXMucm90YXRlLmdldCgpLFxuICAgICAgICBza2V3OiB0aGlzLnNrZXcuZ2V0KCksXG4gICAgICAgIHNjYWxlOiB0aGlzLnNjYWxlLmdldCgpXG4gICAgfSk7XG59XG5mdW5jdGlvbiBfYnVpbGRGaW5hbCgpIHtcbiAgICByZXR1cm4gVHJhbnNmb3JtLmJ1aWxkKHtcbiAgICAgICAgdHJhbnNsYXRlOiB0aGlzLl9maW5hbFRyYW5zbGF0ZSxcbiAgICAgICAgcm90YXRlOiB0aGlzLl9maW5hbFJvdGF0ZSxcbiAgICAgICAgc2tldzogdGhpcy5fZmluYWxTa2V3LFxuICAgICAgICBzY2FsZTogdGhpcy5fZmluYWxTY2FsZVxuICAgIH0pO1xufVxuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLnNldFRyYW5zbGF0ZSA9IGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSh0cmFuc2xhdGUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fZmluYWxUcmFuc2xhdGUgPSB0cmFuc2xhdGU7XG4gICAgdGhpcy5fZmluYWwgPSBfYnVpbGRGaW5hbC5jYWxsKHRoaXMpO1xuICAgIHRoaXMudHJhbnNsYXRlLnNldCh0cmFuc2xhdGUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuc2V0U2NhbGUgPSBmdW5jdGlvbiBzZXRTY2FsZShzY2FsZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLl9maW5hbFNjYWxlID0gc2NhbGU7XG4gICAgdGhpcy5fZmluYWwgPSBfYnVpbGRGaW5hbC5jYWxsKHRoaXMpO1xuICAgIHRoaXMuc2NhbGUuc2V0KHNjYWxlLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLnNldFJvdGF0ZSA9IGZ1bmN0aW9uIHNldFJvdGF0ZShldWxlckFuZ2xlcywgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLl9maW5hbFJvdGF0ZSA9IGV1bGVyQW5nbGVzO1xuICAgIHRoaXMuX2ZpbmFsID0gX2J1aWxkRmluYWwuY2FsbCh0aGlzKTtcbiAgICB0aGlzLnJvdGF0ZS5zZXQoZXVsZXJBbmdsZXMsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuc2V0U2tldyA9IGZ1bmN0aW9uIHNldFNrZXcoc2tld0FuZ2xlcywgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLl9maW5hbFNrZXcgPSBza2V3QW5nbGVzO1xuICAgIHRoaXMuX2ZpbmFsID0gX2J1aWxkRmluYWwuY2FsbCh0aGlzKTtcbiAgICB0aGlzLnNrZXcuc2V0KHNrZXdBbmdsZXMsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KHRyYW5zZm9ybSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB2YXIgY29tcG9uZW50cyA9IFRyYW5zZm9ybS5pbnRlcnByZXQodHJhbnNmb3JtKTtcbiAgICB0aGlzLl9maW5hbFRyYW5zbGF0ZSA9IGNvbXBvbmVudHMudHJhbnNsYXRlO1xuICAgIHRoaXMuX2ZpbmFsUm90YXRlID0gY29tcG9uZW50cy5yb3RhdGU7XG4gICAgdGhpcy5fZmluYWxTa2V3ID0gY29tcG9uZW50cy5za2V3O1xuICAgIHRoaXMuX2ZpbmFsU2NhbGUgPSBjb21wb25lbnRzLnNjYWxlO1xuICAgIHRoaXMuX2ZpbmFsID0gdHJhbnNmb3JtO1xuICAgIHZhciBfY2FsbGJhY2sgPSBjYWxsYmFjayA/IFV0aWxpdHkuYWZ0ZXIoNCwgY2FsbGJhY2spIDogbnVsbDtcbiAgICB0aGlzLnRyYW5zbGF0ZS5zZXQoY29tcG9uZW50cy50cmFuc2xhdGUsIHRyYW5zaXRpb24sIF9jYWxsYmFjayk7XG4gICAgdGhpcy5yb3RhdGUuc2V0KGNvbXBvbmVudHMucm90YXRlLCB0cmFuc2l0aW9uLCBfY2FsbGJhY2spO1xuICAgIHRoaXMuc2tldy5zZXQoY29tcG9uZW50cy5za2V3LCB0cmFuc2l0aW9uLCBfY2FsbGJhY2spO1xuICAgIHRoaXMuc2NhbGUuc2V0KGNvbXBvbmVudHMuc2NhbGUsIHRyYW5zaXRpb24sIF9jYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLnNldERlZmF1bHRUcmFuc2l0aW9uID0gZnVuY3Rpb24gc2V0RGVmYXVsdFRyYW5zaXRpb24odHJhbnNpdGlvbikge1xuICAgIHRoaXMudHJhbnNsYXRlLnNldERlZmF1bHQodHJhbnNpdGlvbik7XG4gICAgdGhpcy5yb3RhdGUuc2V0RGVmYXVsdCh0cmFuc2l0aW9uKTtcbiAgICB0aGlzLnNrZXcuc2V0RGVmYXVsdCh0cmFuc2l0aW9uKTtcbiAgICB0aGlzLnNjYWxlLnNldERlZmF1bHQodHJhbnNpdGlvbik7XG59O1xuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCgpIHtcbiAgICBpZiAodGhpcy5pc0FjdGl2ZSgpKSB7XG4gICAgICAgIHJldHVybiBfYnVpbGQuY2FsbCh0aGlzKTtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbmFsO1xufTtcblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5nZXRGaW5hbCA9IGZ1bmN0aW9uIGdldEZpbmFsKCkge1xuICAgIHJldHVybiB0aGlzLl9maW5hbDtcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUuaXNBY3RpdmUoKSB8fCB0aGlzLnJvdGF0ZS5pc0FjdGl2ZSgpIHx8IHRoaXMuc2NhbGUuaXNBY3RpdmUoKSB8fCB0aGlzLnNrZXcuaXNBY3RpdmUoKTtcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuaGFsdCA9IGZ1bmN0aW9uIGhhbHQoKSB7XG4gICAgdGhpcy50cmFuc2xhdGUuaGFsdCgpO1xuICAgIHRoaXMucm90YXRlLmhhbHQoKTtcbiAgICB0aGlzLnNrZXcuaGFsdCgpO1xuICAgIHRoaXMuc2NhbGUuaGFsdCgpO1xuICAgIHRoaXMuX2ZpbmFsID0gdGhpcy5nZXQoKTtcbiAgICB0aGlzLl9maW5hbFRyYW5zbGF0ZSA9IHRoaXMudHJhbnNsYXRlLmdldCgpO1xuICAgIHRoaXMuX2ZpbmFsUm90YXRlID0gdGhpcy5yb3RhdGUuZ2V0KCk7XG4gICAgdGhpcy5fZmluYWxTa2V3ID0gdGhpcy5za2V3LmdldCgpO1xuICAgIHRoaXMuX2ZpbmFsU2NhbGUgPSB0aGlzLnNjYWxlLmdldCgpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbm1vZHVsZS5leHBvcnRzID0gVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm07IiwiZnVuY3Rpb24gVHdlZW5UcmFuc2l0aW9uKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKFR3ZWVuVHJhbnNpdGlvbi5ERUZBVUxUX09QVElPTlMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fc3RhcnRUaW1lID0gMDtcbiAgICB0aGlzLl9zdGFydFZhbHVlID0gMDtcbiAgICB0aGlzLl91cGRhdGVUaW1lID0gMDtcbiAgICB0aGlzLl9lbmRWYWx1ZSA9IDA7XG4gICAgdGhpcy5fY3VydmUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc3RhdGUgPSAwO1xuICAgIHRoaXMudmVsb2NpdHkgPSB1bmRlZmluZWQ7XG59XG5Ud2VlblRyYW5zaXRpb24uQ3VydmVzID0ge1xuICAgIGxpbmVhcjogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfSxcbiAgICBlYXNlSW46IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB0ICogdDtcbiAgICB9LFxuICAgIGVhc2VPdXQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB0ICogKDIgLSB0KTtcbiAgICB9LFxuICAgIGVhc2VJbk91dDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgaWYgKHQgPD0gMC41KVxuICAgICAgICAgICAgcmV0dXJuIDIgKiB0ICogdDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIC0yICogdCAqIHQgKyA0ICogdCAtIDE7XG4gICAgfSxcbiAgICBlYXNlT3V0Qm91bmNlOiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdCAqICgzIC0gMiAqIHQpO1xuICAgIH0sXG4gICAgc3ByaW5nOiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gKDEgLSB0KSAqIE1hdGguc2luKDYgKiBNYXRoLlBJICogdCkgKyB0O1xuICAgIH1cbn07XG5Ud2VlblRyYW5zaXRpb24uU1VQUE9SVFNfTVVMVElQTEUgPSB0cnVlO1xuVHdlZW5UcmFuc2l0aW9uLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBjdXJ2ZTogVHdlZW5UcmFuc2l0aW9uLkN1cnZlcy5saW5lYXIsXG4gICAgZHVyYXRpb246IDUwMCxcbiAgICBzcGVlZDogMFxufTtcbnZhciByZWdpc3RlcmVkQ3VydmVzID0ge307XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSA9IGZ1bmN0aW9uIHJlZ2lzdGVyQ3VydmUoY3VydmVOYW1lLCBjdXJ2ZSkge1xuICAgIGlmICghcmVnaXN0ZXJlZEN1cnZlc1tjdXJ2ZU5hbWVdKSB7XG4gICAgICAgIHJlZ2lzdGVyZWRDdXJ2ZXNbY3VydmVOYW1lXSA9IGN1cnZlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblR3ZWVuVHJhbnNpdGlvbi51bnJlZ2lzdGVyQ3VydmUgPSBmdW5jdGlvbiB1bnJlZ2lzdGVyQ3VydmUoY3VydmVOYW1lKSB7XG4gICAgaWYgKHJlZ2lzdGVyZWRDdXJ2ZXNbY3VydmVOYW1lXSkge1xuICAgICAgICBkZWxldGUgcmVnaXN0ZXJlZEN1cnZlc1tjdXJ2ZU5hbWVdO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblR3ZWVuVHJhbnNpdGlvbi5nZXRDdXJ2ZSA9IGZ1bmN0aW9uIGdldEN1cnZlKGN1cnZlTmFtZSkge1xuICAgIHZhciBjdXJ2ZSA9IHJlZ2lzdGVyZWRDdXJ2ZXNbY3VydmVOYW1lXTtcbiAgICBpZiAoY3VydmUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIGN1cnZlO1xuICAgIGVsc2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjdXJ2ZSBub3QgcmVnaXN0ZXJlZCcpO1xufTtcblR3ZWVuVHJhbnNpdGlvbi5nZXRDdXJ2ZXMgPSBmdW5jdGlvbiBnZXRDdXJ2ZXMoKSB7XG4gICAgcmV0dXJuIHJlZ2lzdGVyZWRDdXJ2ZXM7XG59O1xuZnVuY3Rpb24gX2ludGVycG9sYXRlKGEsIGIsIHQpIHtcbiAgICByZXR1cm4gKDEgLSB0KSAqIGEgKyB0ICogYjtcbn1cbmZ1bmN0aW9uIF9jbG9uZShvYmopIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgIHJldHVybiBvYmouc2xpY2UoMCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKG9iaik7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiBvYmo7XG59XG5mdW5jdGlvbiBfbm9ybWFsaXplKHRyYW5zaXRpb24sIGRlZmF1bHRUcmFuc2l0aW9uKSB7XG4gICAgdmFyIHJlc3VsdCA9IHsgY3VydmU6IGRlZmF1bHRUcmFuc2l0aW9uLmN1cnZlIH07XG4gICAgaWYgKGRlZmF1bHRUcmFuc2l0aW9uLmR1cmF0aW9uKVxuICAgICAgICByZXN1bHQuZHVyYXRpb24gPSBkZWZhdWx0VHJhbnNpdGlvbi5kdXJhdGlvbjtcbiAgICBpZiAoZGVmYXVsdFRyYW5zaXRpb24uc3BlZWQpXG4gICAgICAgIHJlc3VsdC5zcGVlZCA9IGRlZmF1bHRUcmFuc2l0aW9uLnNwZWVkO1xuICAgIGlmICh0cmFuc2l0aW9uIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uLmR1cmF0aW9uICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXN1bHQuZHVyYXRpb24gPSB0cmFuc2l0aW9uLmR1cmF0aW9uO1xuICAgICAgICBpZiAodHJhbnNpdGlvbi5jdXJ2ZSlcbiAgICAgICAgICAgIHJlc3VsdC5jdXJ2ZSA9IHRyYW5zaXRpb24uY3VydmU7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uLnNwZWVkKVxuICAgICAgICAgICAgcmVzdWx0LnNwZWVkID0gdHJhbnNpdGlvbi5zcGVlZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiByZXN1bHQuY3VydmUgPT09ICdzdHJpbmcnKVxuICAgICAgICByZXN1bHQuY3VydmUgPSBUd2VlblRyYW5zaXRpb24uZ2V0Q3VydmUocmVzdWx0LmN1cnZlKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuY3VydmUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmN1cnZlID0gb3B0aW9ucy5jdXJ2ZTtcbiAgICBpZiAob3B0aW9ucy5kdXJhdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMuZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uO1xuICAgIGlmIChvcHRpb25zLnNwZWVkICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5zcGVlZCA9IG9wdGlvbnMuc3BlZWQ7XG59O1xuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoZW5kVmFsdWUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKCF0cmFuc2l0aW9uKSB7XG4gICAgICAgIHRoaXMucmVzZXQoZW5kVmFsdWUpO1xuICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3N0YXJ0VmFsdWUgPSBfY2xvbmUodGhpcy5nZXQoKSk7XG4gICAgdHJhbnNpdGlvbiA9IF9ub3JtYWxpemUodHJhbnNpdGlvbiwgdGhpcy5vcHRpb25zKTtcbiAgICBpZiAodHJhbnNpdGlvbi5zcGVlZCkge1xuICAgICAgICB2YXIgc3RhcnRWYWx1ZSA9IHRoaXMuX3N0YXJ0VmFsdWU7XG4gICAgICAgIGlmIChzdGFydFZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICB2YXIgdmFyaWFuY2UgPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBzdGFydFZhbHVlKVxuICAgICAgICAgICAgICAgIHZhcmlhbmNlICs9IChlbmRWYWx1ZVtpXSAtIHN0YXJ0VmFsdWVbaV0pICogKGVuZFZhbHVlW2ldIC0gc3RhcnRWYWx1ZVtpXSk7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmR1cmF0aW9uID0gTWF0aC5zcXJ0KHZhcmlhbmNlKSAvIHRyYW5zaXRpb24uc3BlZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmR1cmF0aW9uID0gTWF0aC5hYnMoZW5kVmFsdWUgLSBzdGFydFZhbHVlKSAvIHRyYW5zaXRpb24uc3BlZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLl9lbmRWYWx1ZSA9IF9jbG9uZShlbmRWYWx1ZSk7XG4gICAgdGhpcy5fc3RhcnRWZWxvY2l0eSA9IF9jbG9uZSh0cmFuc2l0aW9uLnZlbG9jaXR5KTtcbiAgICB0aGlzLl9kdXJhdGlvbiA9IHRyYW5zaXRpb24uZHVyYXRpb247XG4gICAgdGhpcy5fY3VydmUgPSB0cmFuc2l0aW9uLmN1cnZlO1xuICAgIHRoaXMuX2FjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbn07XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoc3RhcnRWYWx1ZSwgc3RhcnRWZWxvY2l0eSkge1xuICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLl9jYWxsYmFjaztcbiAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICAgIHRoaXMuc3RhdGUgPSBfY2xvbmUoc3RhcnRWYWx1ZSk7XG4gICAgdGhpcy52ZWxvY2l0eSA9IF9jbG9uZShzdGFydFZlbG9jaXR5KTtcbiAgICB0aGlzLl9zdGFydFRpbWUgPSAwO1xuICAgIHRoaXMuX2R1cmF0aW9uID0gMDtcbiAgICB0aGlzLl91cGRhdGVUaW1lID0gMDtcbiAgICB0aGlzLl9zdGFydFZhbHVlID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLl9zdGFydFZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eTtcbiAgICB0aGlzLl9lbmRWYWx1ZSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XG59O1xuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5nZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIGdldFZlbG9jaXR5KCkge1xuICAgIHJldHVybiB0aGlzLnZlbG9jaXR5O1xufTtcblR3ZWVuVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KHRpbWVzdGFtcCkge1xuICAgIHRoaXMudXBkYXRlKHRpbWVzdGFtcCk7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XG59O1xuZnVuY3Rpb24gX2NhbGN1bGF0ZVZlbG9jaXR5KGN1cnJlbnQsIHN0YXJ0LCBjdXJ2ZSwgZHVyYXRpb24sIHQpIHtcbiAgICB2YXIgdmVsb2NpdHk7XG4gICAgdmFyIGVwcyA9IDFlLTc7XG4gICAgdmFyIHNwZWVkID0gKGN1cnZlKHQpIC0gY3VydmUodCAtIGVwcykpIC8gZXBzO1xuICAgIGlmIChjdXJyZW50IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgdmVsb2NpdHkgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdXJyZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGN1cnJlbnRbaV0gPT09ICdudW1iZXInKVxuICAgICAgICAgICAgICAgIHZlbG9jaXR5W2ldID0gc3BlZWQgKiAoY3VycmVudFtpXSAtIHN0YXJ0W2ldKSAvIGR1cmF0aW9uO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHZlbG9jaXR5W2ldID0gMDtcbiAgICAgICAgfVxuICAgIH0gZWxzZVxuICAgICAgICB2ZWxvY2l0eSA9IHNwZWVkICogKGN1cnJlbnQgLSBzdGFydCkgLyBkdXJhdGlvbjtcbiAgICByZXR1cm4gdmVsb2NpdHk7XG59XG5mdW5jdGlvbiBfY2FsY3VsYXRlU3RhdGUoc3RhcnQsIGVuZCwgdCkge1xuICAgIHZhciBzdGF0ZTtcbiAgICBpZiAoc3RhcnQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBzdGF0ZSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXJ0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0YXJ0W2ldID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgICAgICBzdGF0ZVtpXSA9IF9pbnRlcnBvbGF0ZShzdGFydFtpXSwgZW5kW2ldLCB0KTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBzdGF0ZVtpXSA9IHN0YXJ0W2ldO1xuICAgICAgICB9XG4gICAgfSBlbHNlXG4gICAgICAgIHN0YXRlID0gX2ludGVycG9sYXRlKHN0YXJ0LCBlbmQsIHQpO1xuICAgIHJldHVybiBzdGF0ZTtcbn1cblR3ZWVuVHJhbnNpdGlvbi5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlKHRpbWVzdGFtcCkge1xuICAgIGlmICghdGhpcy5fYWN0aXZlKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5fY2FsbGJhY2s7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRpbWVzdGFtcClcbiAgICAgICAgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICBpZiAodGhpcy5fdXBkYXRlVGltZSA+PSB0aW1lc3RhbXApXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLl91cGRhdGVUaW1lID0gdGltZXN0YW1wO1xuICAgIHZhciB0aW1lU2luY2VTdGFydCA9IHRpbWVzdGFtcCAtIHRoaXMuX3N0YXJ0VGltZTtcbiAgICBpZiAodGltZVNpbmNlU3RhcnQgPj0gdGhpcy5fZHVyYXRpb24pIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuX2VuZFZhbHVlO1xuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gX2NhbGN1bGF0ZVZlbG9jaXR5KHRoaXMuc3RhdGUsIHRoaXMuX3N0YXJ0VmFsdWUsIHRoaXMuX2N1cnZlLCB0aGlzLl9kdXJhdGlvbiwgMSk7XG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGltZVNpbmNlU3RhcnQgPCAwKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLl9zdGFydFZhbHVlO1xuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy5fc3RhcnRWZWxvY2l0eTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgdCA9IHRpbWVTaW5jZVN0YXJ0IC8gdGhpcy5fZHVyYXRpb247XG4gICAgICAgIHRoaXMuc3RhdGUgPSBfY2FsY3VsYXRlU3RhdGUodGhpcy5fc3RhcnRWYWx1ZSwgdGhpcy5fZW5kVmFsdWUsIHRoaXMuX2N1cnZlKHQpKTtcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IF9jYWxjdWxhdGVWZWxvY2l0eSh0aGlzLnN0YXRlLCB0aGlzLl9zdGFydFZhbHVlLCB0aGlzLl9jdXJ2ZSwgdGhpcy5fZHVyYXRpb24sIHQpO1xuICAgIH1cbn07XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcbn07XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLmhhbHQgPSBmdW5jdGlvbiBoYWx0KCkge1xuICAgIHRoaXMucmVzZXQodGhpcy5nZXQoKSk7XG59O1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ2xpbmVhcicsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMubGluZWFyKTtcblR3ZWVuVHJhbnNpdGlvbi5yZWdpc3RlckN1cnZlKCdlYXNlSW4nLCBUd2VlblRyYW5zaXRpb24uQ3VydmVzLmVhc2VJbik7XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSgnZWFzZU91dCcsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMuZWFzZU91dCk7XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSgnZWFzZUluT3V0JywgVHdlZW5UcmFuc2l0aW9uLkN1cnZlcy5lYXNlSW5PdXQpO1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ2Vhc2VPdXRCb3VuY2UnLCBUd2VlblRyYW5zaXRpb24uQ3VydmVzLmVhc2VPdXRCb3VuY2UpO1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ3NwcmluZycsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMuc3ByaW5nKTtcblR3ZWVuVHJhbnNpdGlvbi5jdXN0b21DdXJ2ZSA9IGZ1bmN0aW9uIGN1c3RvbUN1cnZlKHYxLCB2Mikge1xuICAgIHYxID0gdjEgfHwgMDtcbiAgICB2MiA9IHYyIHx8IDA7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB2MSAqIHQgKyAoLTIgKiB2MSAtIHYyICsgMykgKiB0ICogdCArICh2MSArIHYyIC0gMikgKiB0ICogdCAqIHQ7XG4gICAgfTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFR3ZWVuVHJhbnNpdGlvbjsiLCJ2YXIgUEUgPSByZXF1aXJlKCcuLi9waHlzaWNzL1BoeXNpY3NFbmdpbmUnKTtcbnZhciBQYXJ0aWNsZSA9IHJlcXVpcmUoJy4uL3BoeXNpY3MvYm9kaWVzL1BhcnRpY2xlJyk7XG52YXIgU3ByaW5nID0gcmVxdWlyZSgnLi4vcGh5c2ljcy9mb3JjZXMvU3ByaW5nJyk7XG52YXIgV2FsbCA9IHJlcXVpcmUoJy4uL3BoeXNpY3MvY29uc3RyYWludHMvV2FsbCcpO1xudmFyIFZlY3RvciA9IHJlcXVpcmUoJy4uL21hdGgvVmVjdG9yJyk7XG5mdW5jdGlvbiBXYWxsVHJhbnNpdGlvbihzdGF0ZSkge1xuICAgIHN0YXRlID0gc3RhdGUgfHwgMDtcbiAgICB0aGlzLmVuZFN0YXRlID0gbmV3IFZlY3RvcihzdGF0ZSk7XG4gICAgdGhpcy5pbml0U3RhdGUgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5zcHJpbmcgPSBuZXcgU3ByaW5nKHsgYW5jaG9yOiB0aGlzLmVuZFN0YXRlIH0pO1xuICAgIHRoaXMud2FsbCA9IG5ldyBXYWxsKCk7XG4gICAgdGhpcy5fcmVzdFRvbGVyYW5jZSA9IDFlLTEwO1xuICAgIHRoaXMuX2RpbWVuc2lvbnMgPSAxO1xuICAgIHRoaXMuX2Fic1Jlc3RUb2xlcmFuY2UgPSB0aGlzLl9yZXN0VG9sZXJhbmNlO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuUEUgPSBuZXcgUEUoKTtcbiAgICB0aGlzLnBhcnRpY2xlID0gbmV3IFBhcnRpY2xlKCk7XG4gICAgdGhpcy5QRS5hZGRCb2R5KHRoaXMucGFydGljbGUpO1xuICAgIHRoaXMuUEUuYXR0YWNoKFtcbiAgICAgICAgdGhpcy53YWxsLFxuICAgICAgICB0aGlzLnNwcmluZ1xuICAgIF0sIHRoaXMucGFydGljbGUpO1xufVxuV2FsbFRyYW5zaXRpb24uU1VQUE9SVFNfTVVMVElQTEUgPSAzO1xuV2FsbFRyYW5zaXRpb24uREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHBlcmlvZDogMzAwLFxuICAgIGRhbXBpbmdSYXRpbzogMC41LFxuICAgIHZlbG9jaXR5OiAwLFxuICAgIHJlc3RpdHV0aW9uOiAwLjVcbn07XG5mdW5jdGlvbiBfZ2V0RW5lcmd5KCkge1xuICAgIHJldHVybiB0aGlzLnBhcnRpY2xlLmdldEVuZXJneSgpICsgdGhpcy5zcHJpbmcuZ2V0RW5lcmd5KFt0aGlzLnBhcnRpY2xlXSk7XG59XG5mdW5jdGlvbiBfc2V0QWJzb2x1dGVSZXN0VG9sZXJhbmNlKCkge1xuICAgIHZhciBkaXN0YW5jZSA9IHRoaXMuZW5kU3RhdGUuc3ViKHRoaXMuaW5pdFN0YXRlKS5ub3JtU3F1YXJlZCgpO1xuICAgIHRoaXMuX2Fic1Jlc3RUb2xlcmFuY2UgPSBkaXN0YW5jZSA9PT0gMCA/IHRoaXMuX3Jlc3RUb2xlcmFuY2UgOiB0aGlzLl9yZXN0VG9sZXJhbmNlICogZGlzdGFuY2U7XG59XG5mdW5jdGlvbiBfd2FrZSgpIHtcbiAgICB0aGlzLlBFLndha2UoKTtcbn1cbmZ1bmN0aW9uIF9zbGVlcCgpIHtcbiAgICB0aGlzLlBFLnNsZWVwKCk7XG59XG5mdW5jdGlvbiBfc2V0VGFyZ2V0KHRhcmdldCkge1xuICAgIHRoaXMuZW5kU3RhdGUuc2V0KHRhcmdldCk7XG4gICAgdmFyIGRpc3QgPSB0aGlzLmVuZFN0YXRlLnN1Yih0aGlzLmluaXRTdGF0ZSkubm9ybSgpO1xuICAgIHRoaXMud2FsbC5zZXRPcHRpb25zKHtcbiAgICAgICAgZGlzdGFuY2U6IHRoaXMuZW5kU3RhdGUubm9ybSgpLFxuICAgICAgICBub3JtYWw6IGRpc3QgPT09IDAgPyB0aGlzLnBhcnRpY2xlLnZlbG9jaXR5Lm5vcm1hbGl6ZSgtMSkgOiB0aGlzLmVuZFN0YXRlLnN1Yih0aGlzLmluaXRTdGF0ZSkubm9ybWFsaXplKC0xKVxuICAgIH0pO1xuICAgIF9zZXRBYnNvbHV0ZVJlc3RUb2xlcmFuY2UuY2FsbCh0aGlzKTtcbn1cbmZ1bmN0aW9uIF9zZXRQYXJ0aWNsZVBvc2l0aW9uKHApIHtcbiAgICB0aGlzLnBhcnRpY2xlLnBvc2l0aW9uLnNldChwKTtcbn1cbmZ1bmN0aW9uIF9zZXRQYXJ0aWNsZVZlbG9jaXR5KHYpIHtcbiAgICB0aGlzLnBhcnRpY2xlLnZlbG9jaXR5LnNldCh2KTtcbn1cbmZ1bmN0aW9uIF9nZXRQYXJ0aWNsZVBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9kaW1lbnNpb25zID09PSAwID8gdGhpcy5wYXJ0aWNsZS5nZXRQb3NpdGlvbjFEKCkgOiB0aGlzLnBhcnRpY2xlLmdldFBvc2l0aW9uKCk7XG59XG5mdW5jdGlvbiBfZ2V0UGFydGljbGVWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGltZW5zaW9ucyA9PT0gMCA/IHRoaXMucGFydGljbGUuZ2V0VmVsb2NpdHkxRCgpIDogdGhpcy5wYXJ0aWNsZS5nZXRWZWxvY2l0eSgpO1xufVxuZnVuY3Rpb24gX3NldENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbn1cbmZ1bmN0aW9uIF91cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuUEUuaXNTbGVlcGluZygpKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGNiID0gdGhpcy5fY2FsbGJhY2s7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgZW5lcmd5ID0gX2dldEVuZXJneS5jYWxsKHRoaXMpO1xuICAgIGlmIChlbmVyZ3kgPCB0aGlzLl9hYnNSZXN0VG9sZXJhbmNlKSB7XG4gICAgICAgIF9zbGVlcC5jYWxsKHRoaXMpO1xuICAgICAgICBfc2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMsIHRoaXMuZW5kU3RhdGUpO1xuICAgICAgICBfc2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMsIFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdKTtcbiAgICB9XG59XG5mdW5jdGlvbiBfc2V0dXBEZWZpbml0aW9uKGRlZikge1xuICAgIHZhciBkZWZhdWx0cyA9IFdhbGxUcmFuc2l0aW9uLkRFRkFVTFRfT1BUSU9OUztcbiAgICBpZiAoZGVmLnBlcmlvZCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBkZWYucGVyaW9kID0gZGVmYXVsdHMucGVyaW9kO1xuICAgIGlmIChkZWYuZGFtcGluZ1JhdGlvID09PSB1bmRlZmluZWQpXG4gICAgICAgIGRlZi5kYW1waW5nUmF0aW8gPSBkZWZhdWx0cy5kYW1waW5nUmF0aW87XG4gICAgaWYgKGRlZi52ZWxvY2l0eSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBkZWYudmVsb2NpdHkgPSBkZWZhdWx0cy52ZWxvY2l0eTtcbiAgICBpZiAoZGVmLnJlc3RpdHV0aW9uID09PSB1bmRlZmluZWQpXG4gICAgICAgIGRlZi5yZXN0aXR1dGlvbiA9IGRlZmF1bHRzLnJlc3RpdHV0aW9uO1xuICAgIGlmIChkZWYuZHJpZnQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgZGVmLmRyaWZ0ID0gV2FsbC5ERUZBVUxUX09QVElPTlMuZHJpZnQ7XG4gICAgaWYgKGRlZi5zbG9wID09PSB1bmRlZmluZWQpXG4gICAgICAgIGRlZi5zbG9wID0gV2FsbC5ERUZBVUxUX09QVElPTlMuc2xvcDtcbiAgICB0aGlzLnNwcmluZy5zZXRPcHRpb25zKHtcbiAgICAgICAgcGVyaW9kOiBkZWYucGVyaW9kLFxuICAgICAgICBkYW1waW5nUmF0aW86IGRlZi5kYW1waW5nUmF0aW9cbiAgICB9KTtcbiAgICB0aGlzLndhbGwuc2V0T3B0aW9ucyh7XG4gICAgICAgIHJlc3RpdHV0aW9uOiBkZWYucmVzdGl0dXRpb24sXG4gICAgICAgIGRyaWZ0OiBkZWYuZHJpZnQsXG4gICAgICAgIHNsb3A6IGRlZi5zbG9wXG4gICAgfSk7XG4gICAgX3NldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzLCBkZWYudmVsb2NpdHkpO1xufVxuV2FsbFRyYW5zaXRpb24ucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoc3RhdGUsIHZlbG9jaXR5KSB7XG4gICAgdGhpcy5fZGltZW5zaW9ucyA9IHN0YXRlIGluc3RhbmNlb2YgQXJyYXkgPyBzdGF0ZS5sZW5ndGggOiAwO1xuICAgIHRoaXMuaW5pdFN0YXRlLnNldChzdGF0ZSk7XG4gICAgX3NldFBhcnRpY2xlUG9zaXRpb24uY2FsbCh0aGlzLCBzdGF0ZSk7XG4gICAgaWYgKHZlbG9jaXR5KVxuICAgICAgICBfc2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMsIHZlbG9jaXR5KTtcbiAgICBfc2V0VGFyZ2V0LmNhbGwodGhpcywgc3RhdGUpO1xuICAgIF9zZXRDYWxsYmFjay5jYWxsKHRoaXMsIHVuZGVmaW5lZCk7XG59O1xuV2FsbFRyYW5zaXRpb24ucHJvdG90eXBlLmdldFZlbG9jaXR5ID0gZnVuY3Rpb24gZ2V0VmVsb2NpdHkoKSB7XG4gICAgcmV0dXJuIF9nZXRQYXJ0aWNsZVZlbG9jaXR5LmNhbGwodGhpcyk7XG59O1xuV2FsbFRyYW5zaXRpb24ucHJvdG90eXBlLnNldFZlbG9jaXR5ID0gZnVuY3Rpb24gc2V0VmVsb2NpdHkodmVsb2NpdHkpIHtcbiAgICB0aGlzLmNhbGwodGhpcywgX3NldFBhcnRpY2xlVmVsb2NpdHkodmVsb2NpdHkpKTtcbn07XG5XYWxsVHJhbnNpdGlvbi5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gIXRoaXMuUEUuaXNTbGVlcGluZygpO1xufTtcbldhbGxUcmFuc2l0aW9uLnByb3RvdHlwZS5oYWx0ID0gZnVuY3Rpb24gaGFsdCgpIHtcbiAgICB0aGlzLnNldCh0aGlzLmdldCgpKTtcbn07XG5XYWxsVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIF91cGRhdGUuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gX2dldFBhcnRpY2xlUG9zaXRpb24uY2FsbCh0aGlzKTtcbn07XG5XYWxsVHJhbnNpdGlvbi5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KHN0YXRlLCBkZWZpbml0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICghZGVmaW5pdGlvbikge1xuICAgICAgICB0aGlzLnJlc2V0KHN0YXRlKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKVxuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9kaW1lbnNpb25zID0gc3RhdGUgaW5zdGFuY2VvZiBBcnJheSA/IHN0YXRlLmxlbmd0aCA6IDA7XG4gICAgX3dha2UuY2FsbCh0aGlzKTtcbiAgICBfc2V0dXBEZWZpbml0aW9uLmNhbGwodGhpcywgZGVmaW5pdGlvbik7XG4gICAgX3NldFRhcmdldC5jYWxsKHRoaXMsIHN0YXRlKTtcbiAgICBfc2V0Q2FsbGJhY2suY2FsbCh0aGlzLCBjYWxsYmFjayk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBXYWxsVHJhbnNpdGlvbjsiLCJ2YXIgVXRpbGl0eSA9IHt9O1xuVXRpbGl0eS5EaXJlY3Rpb24gPSB7XG4gICAgWDogMCxcbiAgICBZOiAxLFxuICAgIFo6IDJcbn07XG5VdGlsaXR5LmFmdGVyID0gZnVuY3Rpb24gYWZ0ZXIoY291bnQsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGNvdW50ZXIgPSBjb3VudDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb3VudGVyLS07XG4gICAgICAgIGlmIChjb3VudGVyID09PSAwKVxuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xufTtcblV0aWxpdHkubG9hZFVSTCA9IGZ1bmN0aW9uIGxvYWRVUkwodXJsLCBjYWxsYmFjaykge1xuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gb25yZWFkeXN0YXRlY2hhbmdlKCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICB4aHIuc2VuZCgpO1xufTtcblV0aWxpdHkuY3JlYXRlRG9jdW1lbnRGcmFnbWVudEZyb21IVE1MID0gZnVuY3Rpb24gY3JlYXRlRG9jdW1lbnRGcmFnbWVudEZyb21IVE1MKGh0bWwpIHtcbiAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gaHRtbDtcbiAgICB2YXIgcmVzdWx0ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHdoaWxlIChlbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSlcbiAgICAgICAgcmVzdWx0LmFwcGVuZENoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5VdGlsaXR5LmNsb25lID0gZnVuY3Rpb24gY2xvbmUoYikge1xuICAgIHZhciBhO1xuICAgIGlmICh0eXBlb2YgYiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgYSA9IGIgaW5zdGFuY2VvZiBBcnJheSA/IFtdIDoge307XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGJba2V5XSA9PT0gJ29iamVjdCcgJiYgYltrZXldICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJba2V5XSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIGFba2V5XSA9IG5ldyBBcnJheShiW2tleV0ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiW2tleV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFba2V5XVtpXSA9IFV0aWxpdHkuY2xvbmUoYltrZXldW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFba2V5XSA9IFV0aWxpdHkuY2xvbmUoYltrZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGEgPSBiO1xuICAgIH1cbiAgICByZXR1cm4gYTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFV0aWxpdHk7IiwidmFyIEVudGl0eSA9IHJlcXVpcmUoJy4uL2NvcmUvRW50aXR5Jyk7XG52YXIgUmVuZGVyTm9kZSA9IHJlcXVpcmUoJy4uL2NvcmUvUmVuZGVyTm9kZScpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJy4uL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgVmlld1NlcXVlbmNlID0gcmVxdWlyZSgnLi4vY29yZS9WaWV3U2VxdWVuY2UnKTtcbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuLi9jb3JlL0V2ZW50SGFuZGxlcicpO1xudmFyIE1vZGlmaWVyID0gcmVxdWlyZSgnLi4vY29yZS9Nb2RpZmllcicpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnLi4vY29yZS9PcHRpb25zTWFuYWdlcicpO1xudmFyIFRyYW5zaXRpb25hYmxlID0gcmVxdWlyZSgnLi4vdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGUnKTtcbnZhciBUcmFuc2l0aW9uYWJsZVRyYW5zZm9ybSA9IHJlcXVpcmUoJy4uL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlVHJhbnNmb3JtJyk7XG5mdW5jdGlvbiBHcmlkTGF5b3V0KG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKEdyaWRMYXlvdXQuREVGQVVMVF9PUFRJT05TKTtcbiAgICB0aGlzLm9wdGlvbnNNYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHRoaXMub3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLmlkID0gRW50aXR5LnJlZ2lzdGVyKHRoaXMpO1xuICAgIHRoaXMuX21vZGlmaWVycyA9IFtdO1xuICAgIHRoaXMuX3N0YXRlcyA9IFtdO1xuICAgIHRoaXMuX2NvbnRleHRTaXplQ2FjaGUgPSBbXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdO1xuICAgIHRoaXMuX2RpbWVuc2lvbnNDYWNoZSA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF07XG4gICAgdGhpcy5fYWN0aXZlQ291bnQgPSAwO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50T3V0cHV0KTtcbn1cbmZ1bmN0aW9uIF9yZWZsb3coc2l6ZSwgY29scywgcm93cykge1xuICAgIHZhciB1c2FibGVTaXplID0gW1xuICAgICAgICAgICAgc2l6ZVswXSxcbiAgICAgICAgICAgIHNpemVbMV1cbiAgICAgICAgXTtcbiAgICB1c2FibGVTaXplWzBdIC09IHRoaXMub3B0aW9ucy5ndXR0ZXJTaXplWzBdICogKGNvbHMgLSAxKTtcbiAgICB1c2FibGVTaXplWzFdIC09IHRoaXMub3B0aW9ucy5ndXR0ZXJTaXplWzFdICogKHJvd3MgLSAxKTtcbiAgICB2YXIgcm93U2l6ZSA9IE1hdGgucm91bmQodXNhYmxlU2l6ZVsxXSAvIHJvd3MpO1xuICAgIHZhciBjb2xTaXplID0gTWF0aC5yb3VuZCh1c2FibGVTaXplWzBdIC8gY29scyk7XG4gICAgdmFyIGN1cnJZID0gMDtcbiAgICB2YXIgY3Vyclg7XG4gICAgdmFyIGN1cnJJbmRleCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3dzOyBpKyspIHtcbiAgICAgICAgY3VyclggPSAwO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbHM7IGorKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX21vZGlmaWVyc1tjdXJySW5kZXhdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBfY3JlYXRlTW9kaWZpZXIuY2FsbCh0aGlzLCBjdXJySW5kZXgsIFtcbiAgICAgICAgICAgICAgICAgICAgY29sU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgcm93U2l6ZVxuICAgICAgICAgICAgICAgIF0sIFtcbiAgICAgICAgICAgICAgICAgICAgY3VyclgsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJZLFxuICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgXSwgMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF9hbmltYXRlTW9kaWZpZXIuY2FsbCh0aGlzLCBjdXJySW5kZXgsIFtcbiAgICAgICAgICAgICAgICAgICAgY29sU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgcm93U2l6ZVxuICAgICAgICAgICAgICAgIF0sIFtcbiAgICAgICAgICAgICAgICAgICAgY3VyclgsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJZLFxuICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgXSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJySW5kZXgrKztcbiAgICAgICAgICAgIGN1cnJYICs9IGNvbFNpemUgKyB0aGlzLm9wdGlvbnMuZ3V0dGVyU2l6ZVswXTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyWSArPSByb3dTaXplICsgdGhpcy5vcHRpb25zLmd1dHRlclNpemVbMV07XG4gICAgfVxuICAgIHRoaXMuX2RpbWVuc2lvbnNDYWNoZSA9IFtcbiAgICAgICAgdGhpcy5vcHRpb25zLmRpbWVuc2lvbnNbMF0sXG4gICAgICAgIHRoaXMub3B0aW9ucy5kaW1lbnNpb25zWzFdXG4gICAgXTtcbiAgICB0aGlzLl9jb250ZXh0U2l6ZUNhY2hlID0gW1xuICAgICAgICBzaXplWzBdLFxuICAgICAgICBzaXplWzFdXG4gICAgXTtcbiAgICB0aGlzLl9hY3RpdmVDb3VudCA9IHJvd3MgKiBjb2xzO1xuICAgIGZvciAoaSA9IHRoaXMuX2FjdGl2ZUNvdW50OyBpIDwgdGhpcy5fbW9kaWZpZXJzLmxlbmd0aDsgaSsrKVxuICAgICAgICBfYW5pbWF0ZU1vZGlmaWVyLmNhbGwodGhpcywgaSwgW1xuICAgICAgICAgICAgTWF0aC5yb3VuZChjb2xTaXplKSxcbiAgICAgICAgICAgIE1hdGgucm91bmQocm93U2l6ZSlcbiAgICAgICAgXSwgW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSwgMCk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgncmVmbG93Jyk7XG59XG5mdW5jdGlvbiBfY3JlYXRlTW9kaWZpZXIoaW5kZXgsIHNpemUsIHBvc2l0aW9uLCBvcGFjaXR5KSB7XG4gICAgdmFyIHRyYW5zaXRpb25JdGVtID0ge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiBuZXcgVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0oVHJhbnNmb3JtLnRyYW5zbGF0ZS5hcHBseShudWxsLCBwb3NpdGlvbikpLFxuICAgICAgICAgICAgb3BhY2l0eTogbmV3IFRyYW5zaXRpb25hYmxlKG9wYWNpdHkpLFxuICAgICAgICAgICAgc2l6ZTogbmV3IFRyYW5zaXRpb25hYmxlKHNpemUpXG4gICAgICAgIH07XG4gICAgdmFyIG1vZGlmaWVyID0gbmV3IE1vZGlmaWVyKHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNpdGlvbkl0ZW0udHJhbnNmb3JtLFxuICAgICAgICAgICAgb3BhY2l0eTogdHJhbnNpdGlvbkl0ZW0ub3BhY2l0eSxcbiAgICAgICAgICAgIHNpemU6IHRyYW5zaXRpb25JdGVtLnNpemVcbiAgICAgICAgfSk7XG4gICAgdGhpcy5fc3RhdGVzW2luZGV4XSA9IHRyYW5zaXRpb25JdGVtO1xuICAgIHRoaXMuX21vZGlmaWVyc1tpbmRleF0gPSBtb2RpZmllcjtcbn1cbmZ1bmN0aW9uIF9hbmltYXRlTW9kaWZpZXIoaW5kZXgsIHNpemUsIHBvc2l0aW9uLCBvcGFjaXR5KSB7XG4gICAgdmFyIGN1cnJTdGF0ZSA9IHRoaXMuX3N0YXRlc1tpbmRleF07XG4gICAgdmFyIGN1cnJTaXplID0gY3VyclN0YXRlLnNpemU7XG4gICAgdmFyIGN1cnJPcGFjaXR5ID0gY3VyclN0YXRlLm9wYWNpdHk7XG4gICAgdmFyIGN1cnJUcmFuc2Zvcm0gPSBjdXJyU3RhdGUudHJhbnNmb3JtO1xuICAgIHZhciB0cmFuc2l0aW9uID0gdGhpcy5vcHRpb25zLnRyYW5zaXRpb247XG4gICAgY3VyclRyYW5zZm9ybS5oYWx0KCk7XG4gICAgY3Vyck9wYWNpdHkuaGFsdCgpO1xuICAgIGN1cnJTaXplLmhhbHQoKTtcbiAgICBjdXJyVHJhbnNmb3JtLnNldFRyYW5zbGF0ZShwb3NpdGlvbiwgdHJhbnNpdGlvbik7XG4gICAgY3VyclNpemUuc2V0KHNpemUsIHRyYW5zaXRpb24pO1xuICAgIGN1cnJPcGFjaXR5LnNldChvcGFjaXR5LCB0cmFuc2l0aW9uKTtcbn1cbkdyaWRMYXlvdXQuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIGRpbWVuc2lvbnM6IFtcbiAgICAgICAgMSxcbiAgICAgICAgMVxuICAgIF0sXG4gICAgdHJhbnNpdGlvbjogZmFsc2UsXG4gICAgZ3V0dGVyU2l6ZTogW1xuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXVxufTtcbkdyaWRMYXlvdXQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbn07XG5HcmlkTGF5b3V0LnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9uc01hbmFnZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn07XG5HcmlkTGF5b3V0LnByb3RvdHlwZS5zZXF1ZW5jZUZyb20gPSBmdW5jdGlvbiBzZXF1ZW5jZUZyb20oc2VxdWVuY2UpIHtcbiAgICBpZiAoc2VxdWVuY2UgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgc2VxdWVuY2UgPSBuZXcgVmlld1NlcXVlbmNlKHNlcXVlbmNlKTtcbiAgICB0aGlzLnNlcXVlbmNlID0gc2VxdWVuY2U7XG59O1xuR3JpZExheW91dC5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHRTaXplQ2FjaGU7XG59O1xuR3JpZExheW91dC5wcm90b3R5cGUuY29tbWl0ID0gZnVuY3Rpb24gY29tbWl0KGNvbnRleHQpIHtcbiAgICB2YXIgdHJhbnNmb3JtID0gY29udGV4dC50cmFuc2Zvcm07XG4gICAgdmFyIG9wYWNpdHkgPSBjb250ZXh0Lm9wYWNpdHk7XG4gICAgdmFyIG9yaWdpbiA9IGNvbnRleHQub3JpZ2luO1xuICAgIHZhciBzaXplID0gY29udGV4dC5zaXplO1xuICAgIHZhciBjb2xzID0gdGhpcy5vcHRpb25zLmRpbWVuc2lvbnNbMF07XG4gICAgdmFyIHJvd3MgPSB0aGlzLm9wdGlvbnMuZGltZW5zaW9uc1sxXTtcbiAgICBpZiAoc2l6ZVswXSAhPT0gdGhpcy5fY29udGV4dFNpemVDYWNoZVswXSB8fCBzaXplWzFdICE9PSB0aGlzLl9jb250ZXh0U2l6ZUNhY2hlWzFdIHx8IGNvbHMgIT09IHRoaXMuX2RpbWVuc2lvbnNDYWNoZVswXSB8fCByb3dzICE9PSB0aGlzLl9kaW1lbnNpb25zQ2FjaGVbMV0pIHtcbiAgICAgICAgX3JlZmxvdy5jYWxsKHRoaXMsIHNpemUsIGNvbHMsIHJvd3MpO1xuICAgIH1cbiAgICB2YXIgc2VxdWVuY2UgPSB0aGlzLnNlcXVlbmNlO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgY3VyckluZGV4ID0gMDtcbiAgICB3aGlsZSAoc2VxdWVuY2UgJiYgY3VyckluZGV4IDwgdGhpcy5fbW9kaWZpZXJzLmxlbmd0aCkge1xuICAgICAgICB2YXIgaXRlbSA9IHNlcXVlbmNlLmdldCgpO1xuICAgICAgICB2YXIgbW9kaWZpZXIgPSB0aGlzLl9tb2RpZmllcnNbY3VyckluZGV4XTtcbiAgICAgICAgaWYgKGN1cnJJbmRleCA+PSB0aGlzLl9hY3RpdmVDb3VudCAmJiB0aGlzLl9zdGF0ZXNbY3VyckluZGV4XS5vcGFjaXR5LmlzQWN0aXZlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX21vZGlmaWVycy5zcGxpY2UoY3VyckluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlcy5zcGxpY2UoY3VyckluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gobW9kaWZpZXIubW9kaWZ5KHtcbiAgICAgICAgICAgICAgICBvcmlnaW46IG9yaWdpbixcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IGl0ZW0ucmVuZGVyKClcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBzZXF1ZW5jZSA9IHNlcXVlbmNlLmdldE5leHQoKTtcbiAgICAgICAgY3VyckluZGV4Kys7XG4gICAgfVxuICAgIGlmIChzaXplKVxuICAgICAgICB0cmFuc2Zvcm0gPSBUcmFuc2Zvcm0ubW92ZVRoZW4oW1xuICAgICAgICAgICAgLXNpemVbMF0gKiBvcmlnaW5bMF0sXG4gICAgICAgICAgICAtc2l6ZVsxXSAqIG9yaWdpblsxXSxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSwgdHJhbnNmb3JtKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICAgICAgb3BhY2l0eTogb3BhY2l0eSxcbiAgICAgICAgc2l6ZTogc2l6ZSxcbiAgICAgICAgdGFyZ2V0OiByZXN1bHRcbiAgICB9O1xufTtcbm1vZHVsZS5leHBvcnRzID0gR3JpZExheW91dDsiLCIvLyBJbXBvcnQgYWRkaXRpb25hbCBtb2R1bGVzIHRvIGJlIHVzZWQgaW4gdGhpcyB2aWV3IFxudmFyIFZpZXcgPSByZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvVmlldycpO1xudmFyIFN1cmZhY2UgPSByZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvU3VyZmFjZScpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBUcmFuc2l0aW9uYWJsZSA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGUnKTtcbnZhciBNb2RpZmllciAgID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9jb3JlL01vZGlmaWVyJyk7XG52YXIgSW1hZ2VTdXJmYWNlID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9zdXJmYWNlcy9JbWFnZVN1cmZhY2UnKTtcbnZhciBFYXNpbmcgPSByZXF1aXJlKCdmYW1vdXMvc3JjL3RyYW5zaXRpb25zL0Vhc2luZycpO1xuXG52YXIgU3RhdGVNb2RpZmllciA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvbW9kaWZpZXJzL1N0YXRlTW9kaWZpZXInKTtcbnZhciBHcmlkTGF5b3V0ID0gcmVxdWlyZSgnZmFtb3VzL3NyYy92aWV3cy9HcmlkTGF5b3V0Jyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9jb3JlL1RyYW5zZm9ybScpO1xuXG52YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCdmYW1vdXMvc3JjL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlJyk7XG52YXIgV2FsbFRyYW5zaXRpb24gPSByZXF1aXJlKCdmYW1vdXMvc3JjL3RyYW5zaXRpb25zL1dhbGxUcmFuc2l0aW9uJyk7XG52YXIgU3ByaW5nVHJhbnNpdGlvbiA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvdHJhbnNpdGlvbnMvU3ByaW5nVHJhbnNpdGlvbicpO1xudmFyIFNuYXBUcmFuc2l0aW9uID0gcmVxdWlyZSgnZmFtb3VzL3NyYy90cmFuc2l0aW9ucy9TbmFwVHJhbnNpdGlvbicpO1xuXG4vLyBJbXBvcnRhbnRpbmcgZGF0YSBmb3JtIGRhdGEuanMgZHVtbXkgZmlsZVxudmFyIGRhdGEgPSByZXF1aXJlKCcuL2RhdGEuanMnKVxuXG52YXIgdHJhbnNpdGlvblJlZ2lzdHJ5ID0ge1xuICAgICdyb3RhdGVJbk91dCc6IHJvdGF0ZUluT3V0LFxuICAgICdzbGlkZUluT3V0Jzogc2xpZGVJbk91dCxcbiAgICAnc3ByaW5nSW5PdXQnOiBzcHJpbmdJbk91dCxcbiAgICAnd2FsbEluT3V0Jzogd2FsbEluT3V0XG59XG5cbnZhciBlYXNpbmdSZWdpc3RyeSA9IHtcbiAgICAnaW5RdWFkJzogRWFzaW5nLmluUXVhZCxcbiAgICAnb3V0UXVhZCc6IEVhc2luZy5vdXRRdWFkLFxuICAgICdpbk91dFF1YWQnOiBFYXNpbmcuaW5PdXRRdWFkLFxuICAgICdpbkN1YmljJzogRWFzaW5nLmluQ3ViaWMsXG4gICAgJ291dEN1YmljJzogRWFzaW5nLm91dEN1YmljLFxuICAgICdpbk91dEN1YmljJzogRWFzaW5nLmluT3V0Q3ViaWMsXG4gICAgJ2luUXVhcnQnOiBFYXNpbmcuaW5RdWFydCxcbiAgICAnb3V0UXVhcnQnOiBFYXNpbmcub3V0UXVhcnQsXG4gICAgJ2luT3V0UXVhcnQnOiBFYXNpbmcuaW5PdXRRdWFydCwgXG4gICAgJ2luUXVpbnQnOiBFYXNpbmcuaW5RdWludCxcbiAgICAnb3V0UXVpbnQnOiBFYXNpbmcub3V0UXVpbnQsXG4gICAgJ2luT3V0UXVpbnQnOiBFYXNpbmcuaW5PdXRRdWludCxcbiAgICAnaW5TaW5lJzogRWFzaW5nLmluU2luZSxcbiAgICAnb3V0U2luZSc6IEVhc2luZy5vdXRTaW5lLFxuICAgICdpbk91dFNpbmUnOiBFYXNpbmcuaW5PdXRTaW5lLFxuICAgICdpbkV4cG8nOiBFYXNpbmcuaW5FeHBvLFxuICAgICdvdXRFeHBvJzogRWFzaW5nLm91dEV4cG8sXG4gICAgJ2luT3V0RXhwbyc6IEVhc2luZy5pbk91dEV4cG8sXG4gICAgJ2luQ2lyYyc6IEVhc2luZy5pbkNpcmMsXG4gICAgJ291dENpcmMnOiBFYXNpbmcub3V0Q2lyYyxcbiAgICAnaW5PdXRDaXJjJzogRWFzaW5nLmluT3V0Q2lyYyxcbiAgICAnaW5FbGFzdGljJzogRWFzaW5nLmluRWxhc3RpYyxcbiAgICAnb3V0RWxhc3RpYyc6IEVhc2luZy5vdXRFbGFzdGljLFxuICAgICdpbk91dEVsYXN0aWMnOiBFYXNpbmcuaW5PdXRFbGFzdGljLFxuICAgICdpbkJhY2snOiBFYXNpbmcuaW5CYWNrLFxuICAgICdvdXRCYWNrJzogRWFzaW5nLm91dEJhY2ssXG4gICAgJ2luT3V0QmFjayc6IEVhc2luZy5pbk91dEJhY2ssXG4gICAgJ2luQm91bmNlJzogRWFzaW5nLmluQm91bmNlLFxuICAgICdvdXRCb3VuY2UnOiBFYXNpbmcub3V0Qm91bmNlLFxuICAgICdpbk91dEJvdW5jZSc6IEVhc2luZy5pbk91dEJvdW5jZVxufVxuXG4vKiBHRU5FUkFUT1JTICovXG5cbi8vIENvbnN0cnVjdG9yIGZ1bmN0aW9uIGZvciBvdXIgQXBwVmlldyBjbGFzc1xuZnVuY3Rpb24gQWRHZW5lcmF0b3IoKSB7XG4gICAgdmFyIGxvZ28gPSBnZXRMb2dvKCk7XG4gICAgdmFyIG1vZGlmaWVyID0gZ2V0TW9kaWZpZXIoKTtcbiAgICB2YXIgZW50ZXIgPSBlbnRlclRyYW5zaXRpb24oKTtcbiAgICB2YXIgZXhpdCA9IGV4aXRUcmFuc2l0aW9uKCk7XG5cbiAgICByZXR1cm4ge2xvZ286IGxvZ28sIG1vZGlmaWVyOiBtb2RpZmllciwgZW50ZXI6IGVudGVyLCBleGl0OiBleGl0fTtcbn1cblxuLy8gQ3JlYXRlcyBhIHN1cmZhY2UgdXNpbmcgdGhlIGltYWdlXG4vLyBwcm92aWRlZCBieSB0aGUgY2xpZW50XG5mdW5jdGlvbiBnZXRMb2dvKCkge1xuICAgIHZhciBsb2dvID0gbmV3IEltYWdlU3VyZmFjZSh7XG4gICAgICBzaXplOiBbMzAwLCAxMDBdLFxuICAgICAgY29udGVudDogZGF0YS5sb2dvLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICBsaW5lSGVpZ2h0OiAnMTAwcHgnXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbG9nbztcbn1cblxuLy8gQ3JlYXRlcyBhIG1vZGlmaWVyIGZvciB0aGUgc3RhcnRpbmdcbi8vIHN0YXRlXG5mdW5jdGlvbiBnZXRNb2RpZmllcigpIHtcbiAgICB2YXIgbW9kaWZpZXIgPSBuZXcgTW9kaWZpZXIoe1xuICAgICAgICBzaXplOiBbdW5kZWZpbmVkLCB1bmRlZmluZWRdLFxuICAgICAgICBvcmlnaW46IFtkYXRhLm9yaWdpbi54LCBkYXRhLm9yaWdpbi55LCBkYXRhLm9yaWdpbi56XSxcbiAgICAgICAgYWxpZ246W2RhdGEuaW5pdGlhbFBvc2l0aW9uLnggLCBkYXRhLmluaXRpYWxQb3NpdGlvbi55LCBkYXRhLmluaXRpYWxQb3NpdGlvbi56XSxcbiAgICAgICAgdHJhbnNmb3JtOiBUcmFuc2Zvcm0ucm90YXRlKGRhdGEuaW5pdGlhbFJvdGF0aW9uLngsIGRhdGEuaW5pdGlhbFJvdGF0aW9uLnksIGRhdGEuaW5pdGlhbFJvdGF0aW9uLnopXG4gICAgfSk7XG5cbiAgICByZXR1cm4gbW9kaWZpZXI7XG59XG5cbi8vIENhbGxzIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhIG1vZGlmaWVyXG4vLyBkZXBlbmRpbmcgb24gdGhlIHRyYW5zaXRpb24gdHlwZVxuZnVuY3Rpb24gZW50ZXJUcmFuc2l0aW9uKCkge1xuICAgIHJldHVybiB0cmFuc2l0aW9uUmVnaXN0cnlbZGF0YS5lbnRlci50eXBlXShkYXRhLmVudGVyKTtcbn1cblxuLy8gQ2FsbHMgYSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGEgbW9kaWZpZXJcbi8vIGRlcGVuZGluZyBvbiB0aGUgdHJhbnNpdGlvbiB0eXBlXG5mdW5jdGlvbiBleGl0VHJhbnNpdGlvbigpIHtcbiAgICByZXR1cm4gdHJhbnNpdGlvblJlZ2lzdHJ5W2RhdGEuZXhpdC50eXBlXShkYXRhLmV4aXQpO1xufVxuXG4vKiBUUkFOU0lUSU9OUyAqL1xuZnVuY3Rpb24gcm90YXRlSW5PdXQoZGF0YUlucHV0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgIG1vZGlmaWVyLnNldFRyYW5zZm9ybShcbiAgICAgICAgICAgIFRyYW5zZm9ybS5yb3RhdGUoZGF0YUlucHV0LnJvdGF0aW9uLngsIGRhdGFJbnB1dC5yb3RhdGlvbi55LCBkYXRhSW5wdXQucm90YXRpb24ueiksXG4gICAgICAgICAgICB7ZHVyYXRpb246IGRhdGFJbnB1dC5kdXJhdGlvbiwgY3VydmU6IGVhc2luZ1JlZ2lzdHJ5W2RhdGFJbnB1dC5jdXJ2ZV19XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzbGlkZUluT3V0KGRhdGFJbnB1dCkge1xuICAgIHJldHVybiBmdW5jdGlvbihtb2RpZmllcikge1xuICAgICAgICBtb2RpZmllci5zZXRUcmFuc2Zvcm0oXG4gICAgICAgICAgICBUcmFuc2Zvcm0udHJhbnNsYXRlKGRhdGFJbnB1dC5wb3NpdGlvbi54LCBkYXRhSW5wdXQucG9zaXRpb24ueSwgZGF0YUlucHV0LnBvc2l0aW9uLnopLFxuICAgICAgICAgICAge2R1cmF0aW9uOiBkYXRhSW5wdXQuZHVyYXRpb24sIGN1cnZlOiBlYXNpbmdSZWdpc3RyeVtkYXRhSW5wdXQuY3VydmVdfVxuICAgICAgICApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc3ByaW5nSW5PdXQoZGF0YUlucHV0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgIFRyYW5zaXRpb25hYmxlLnJlZ2lzdGVyTWV0aG9kKCdzcHJpbmcnLCBTbmFwVHJhbnNpdGlvbik7XG4gICAgICAgIG1vZGlmaWVyID0gbmV3IFRyYW5zaXRpb25hYmxlKFtkYXRhLmluaXRpYWxQb3NpdGlvbi54LCBkYXRhLmluaXRpYWxQb3NpdGlvbi55LCBkYXRhLmluaXRpYWxQb3NpdGlvbi56XSk7XG5cbiAgICAgICAgdmFyIHNwcmluZ1Byb3BlcnRpZXMgPSB7XG4gICAgICAgICAgICB0eXBlOiAnc3ByaW5nJyxcbiAgICAgICAgICAgIHBlcmlvZDogZGF0YUlucHV0LnBlcmlvZCxcbiAgICAgICAgICAgIGRhbXBpbmdSYXRpbzogZGF0YUlucHV0LmRhbXBpbmdSYXRpbyxcbiAgICAgICAgfVxuICAgICAgICBtb2RpZmllci5zZXQoXG4gICAgICAgICAgICBbZGF0YUlucHV0LnBvc2l0aW9uLngsIGRhdGFJbnB1dC5wb3NpdGlvbi55LCBkYXRhSW5wdXQucG9zaXRpb24uel0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnc3ByaW5nJyxcbiAgICAgICAgICAgICAgICBkYW1waW5nUmF0aW86IGRhdGFJbnB1dC5kYW1waW5nUmF0aW8sXG4gICAgICAgICAgICAgICAgcGVyaW9kOiBkYXRhSW5wdXQucGVyaW9kXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB3YWxsSW5PdXQoZGF0YUlucHV0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgIFRyYW5zaXRpb25hYmxlLnJlZ2lzdGVyTWV0aG9kKCd3YWxsJywgV2FsbFRyYW5zaXRpb24pO1xuICAgICAgICBcbiAgICAgICAgdmFyIHdhbGxQcm9wZXJ0aWVzID0ge1xuICAgICAgICAgICAgdHlwZTogJ3dhbGwnLFxuICAgICAgICAgICAgcGVyaW9kOiBkYXRhSW5wdXQucGVyaW9kLFxuICAgICAgICAgICAgZGFtcGluZ1JhdGlvIDogZGF0YUlucHV0LmRhbXBpbmdSYXRpbyxcbiAgICAgICAgICAgIHZlbG9jaXR5OiBkYXRhSW5wdXQudmVsb2NpdHksXG4gICAgICAgICAgICByZXN0aXR1dGlvbiA6IGRhdGFJbnB1dC5yZXN0aXR1dGlvblxuICAgICAgICB9O1xuXG4gICAgICAgIG1vZGlmaWVyLnNldFRyYW5zZm9ybShcbiAgICAgICAgICAgIFRyYW5zZm9ybS50cmFuc2xhdGUoZGF0YUlucHV0LnBvc2l0aW9uLngsIGRhdGFJbnB1dC5wb3NpdGlvbi55LCBkYXRhSW5wdXQucG9zaXRpb24ueiksXG4gICAgICAgICAgICB3YWxsUHJvcGVydGllc1xuICAgICAgICApO1xuICAgIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gQWRHZW5lcmF0b3I7IiwiLy8gSW1wb3J0IGFkZGl0aW9uYWwgbW9kdWxlcyB0byBiZSB1c2VkIGluIHRoaXMgdmlldyBcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgTW9kaWZpZXIgPSByZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvTW9kaWZpZXInKTtcbnZhciBJbWFnZVN1cmZhY2UgPSByZXF1aXJlKCdmYW1vdXMvc3JjL3N1cmZhY2VzL0ltYWdlU3VyZmFjZScpO1xudmFyIE1vdXNlU3luYyAgICAgPSByZXF1aXJlKCdmYW1vdXMvc3JjL2lucHV0cy9Nb3VzZVN5bmMnKTtcbnZhciBUb3VjaFN5bmMgICAgID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9pbnB1dHMvVG91Y2hTeW5jJyk7XG52YXIgR2VuZXJpY1N5bmMgICA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvaW5wdXRzL0dlbmVyaWNTeW5jJyk7XG5cbnZhciBUcmFuc2l0aW9uYWJsZSA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGUnKTtcblxuLy8gUmVnaXN0ZXIgc3luYyBpbnB1dHNcbkdlbmVyaWNTeW5jLnJlZ2lzdGVyKHtcbiAgICAnbW91c2UnOiBNb3VzZVN5bmMsXG4gICAgJ3RvdWNoJzogVG91Y2hTeW5jXG59KVxuXG4vLyBDcmVhdGUgYSB0cmFuc2l0aW9uYWJsZSBmb3IgcG9zaXRpb25cbnZhciBwb3NpdGlvbiA9IG5ldyBUcmFuc2l0aW9uYWJsZShbMCwgMF0pO1xuXG4vLyBTZXQgc3luYyB2YXJpYWJsZSBmb3IgZ2VuZXJpYyBzeW5jIG1ldGhvZHNcbnZhciBzeW5jID0gbmV3IEdlbmVyaWNTeW5jKHtcbiAgICAnbW91c2UnOiB7fSxcbiAgICAndG91Y2gnOiB7fVxufSk7XG5cbi8vY3JlYXRlIHRoZSBsaWtlL2Rpc2xpa2Ugc3VyZmFjZVxudmFyIGxpa2UgPSBuZXcgSW1hZ2VTdXJmYWNlKHtcbiAgICBzaXplOiBbNzAsIDcwXSxcbiAgICBhbGlnbjogWzAsMF0sXG4gICAgY29udGVudDogXCJpbWFnZXMveWVzcy5wbmdcIixcbiAgICBjbGFzc2VzOiBbJ2JhY2tmYWNlVmlzaWJpbGl0eScsIFwiYml0Y2hcIl0sXG59KTtcblxudmFyIG5vdExpa2UgPSBuZXcgSW1hZ2VTdXJmYWNlKHtcbiAgICBzaXplOiBbNzAsIDcwXSxcbiAgICBhbGlnbjogWzAsMF0sXG4gICAgY29udGVudDogXCJpbWFnZXMvbm9vLnBuZ1wiLFxuICAgIGNsYXNzZXM6IFsnYmFja2ZhY2VWaXNpYmlsaXR5JywgXCJiaXRjaFwiXSxcbn0pO1xuLy9TZXRzIHRoZSBpbml0aWFsIG9wYWNpdHkgb2YgdGhlIGxpa2UgYW5kIGRpc2xpa2UgYnV0dG9uIHRvIGJlIGhpZGRlblxudmFyIG9wYWNpdHlZZXMgPSBuZXcgTW9kaWZpZXIoe1xuICAgIG9wYWNpdHk6IDAsXG4gICAgYWxpZ246IFstLjE3LCAwXVxufSlcbnZhciBvcGFjaXR5Tm8gPSBuZXcgTW9kaWZpZXIoe1xuICAgIG9wYWNpdHk6IDAsXG4gICAgYWxpZ246Wy43NDUsIDBdXG59KVxuXG5mdW5jdGlvbiBkcmFnKHN1cmZhY2UsIGxpbmspIHtcbiAgICAvLyBMaW5rcyBzeW5jIHRvIG91ciBzdXJmYWNlIHBhcmFtZXRlclxuICAgIHN1cmZhY2UucGlwZShzeW5jKTtcblxuICAgIC8vIFVwZGF0ZXMgcG9zaXRpb24gb2YgdHJhbnNpdGlvbmFibGVcbiAgICBzeW5jLm9uKCd1cGRhdGUnLCBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgdmFyIGN1cnJlbnRQb3NpdGlvbiA9IHBvc2l0aW9uLmdldCgpO1xuXG4gICAgICAgIC8vU2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIHN1cmZhY2UgdG8gdGhlIFggcG9zaXRpb24gb2YgdGhlIG1vdXNlXG5cbiAgICAgICAgcG9zaXRpb24uc2V0KFtcbiAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvblswXSArIGRhdGEuZGVsdGFbMF0sXG4gICAgICAgICAgICBjdXJyZW50UG9zaXRpb25bMV1cbiAgICAgICAgXSk7XG5cbiAgICAgICAgLy8gT3B0aW9uYWxseSBtb2RpZmllcyB0aGUgb3BhY2l0eSBvZiB0aGUgbG9nbyBcbiAgICAgICAgICAgIC8vIG9wYWNpdHlMb2dvLnNldE9wYWNpdHkoMS1NYXRoLmFicyhjdXJyZW50UG9zaXRpb25bMF0pLyh3aW5kb3cuaW5uZXJXaWR0aCouNCkpO1xuICAgICAgICAvL01vZGlmaWVzIHRoZSBvcGFjaXR5IG9mIHRoZSBsaWtlIGJ1dHRvbiAgICBcbiAgICAgICAgICAgIGlmKGN1cnJlbnRQb3NpdGlvblswXT4wKXtcbiAgICAgICAgICAgICAgICBvcGFjaXR5WWVzLnNldE9wYWNpdHkoY3VycmVudFBvc2l0aW9uWzBdLyh3aW5kb3cuaW5uZXJXaWR0aCouMykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAvLyBNb2RpZmllcyB0aGUgb3BhY2l0eSBvZiB0aGUgZGlzbGlrZSBidXR0b25cbiAgICAgICAgICAgIGlmKGN1cnJlbnRQb3NpdGlvblswXTwwKXtcbiAgICAgICAgICAgICAgICBvcGFjaXR5Tm8uc2V0T3BhY2l0eShNYXRoLmFicyhjdXJyZW50UG9zaXRpb25bMF0pL3dpbmRvdy5pbm5lcldpZHRoKjMpO1xuICAgICAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gb24gZHJhZ2dpbmcgdG8gcmlnaHQsIGxpa2UgcGFnZSBhbmQgb3BlbiBsaW5rLCBlbHNlIG5vdCBsaWtlIGFuZCBjbG9zZSBhZFxuICAgIHN1cmZhY2Uub24oJ21vdXNldXAnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgY3VycmVudFBvc2l0aW9uID0gcG9zaXRpb24uZ2V0KCk7XG4gICAgICAgIC8vcmVzZXRzIHRoZSBvcGFjaXR5IG9mIHRoZSBsaWtlIGFuZCBkaXNsaWtlIHRvIGJlIGhpZGRlblxuICAgICAgICBvcGFjaXR5WWVzLnNldE9wYWNpdHkoMCk7XG4gICAgICAgIG9wYWNpdHlOby5zZXRPcGFjaXR5KDApO1xuXG4gICAgICAgIGlmIChjdXJyZW50UG9zaXRpb25bMF0gPiAyMDApIHtcbiAgICAgICAgICAgLy9SZWRpcmVjdCB0byBsaW5rIGlmIGRyYWdnZWQgcmlnaHRcbiAgICAgICAgICAgIHBvc2l0aW9uLnNldChbMCwwXSwge2N1cnZlIDogJ2Vhc2VPdXRCb3VuY2UnLCBkdXJhdGlvbiA6IDMwMH0pO1xuICAgICAgICAgICAgd2luZG93Lm9wZW4obGluaywgJ19ibGFuaycpO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRQb3NpdGlvblswXSA8ICgtMjAwKSkge1xuICAgICAgICAgICAvLyBUcmFuc2l0aW9uIG91dCBvZiBkcmFnZ2VkIGxlZnRcbiAgICAgICAgICAgIHBvc2l0aW9uLnNldChbLXdpbmRvdy5pbm5lcldpZHRoLDBdLCB7Y3VydmUgOiAnZWFzZU91dEJvdW5jZScsIGR1cmF0aW9uIDogODAwfSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgIC8vQm91bmNlcyB0aGUgc3VyZmFjZSBiYWNrIHRvIGNlbnRlciBpZiB0aGUgZHJhZyB3YXMgaW5zdWZmaWNpZW50XG4gICAgICAgICAgICBwb3NpdGlvbi5zZXQoWzAsMF0sIHtjdXJ2ZSA6ICdlYXNlT3V0Qm91bmNlJywgZHVyYXRpb24gOiAzMDB9KTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgLy8gb24gdG91Y2ggZHJhZyByaWdodCBsaWtlLCBsZWZ0IGRpc2xpa2VcbiAgICBzdXJmYWNlLm9uKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBjdXJyZW50UG9zaXRpb24gPSBwb3NpdGlvbi5nZXQoKTtcbiAgICAgICAgY29uc29sZS5sb2coY3VycmVudFBvc2l0aW9uKVxuICAgICAvL3Jlc2V0cyB0aGUgb3BhY2l0eSBvZiB0aGUgbGlrZSBhbmQgZGlzbGlrZSB0byBiZSBoaWRkZW5cbiAgICAgICAgb3BhY2l0eVllcy5zZXRPcGFjaXR5KDApO1xuICAgICAgICBvcGFjaXR5Tm8uc2V0T3BhY2l0eSgwKTtcbiAgICAgICAgLy9SZWRpcmVjdCB0byBsaW5rIGlmIGRyYWdnZWQgcmlnaHRcbiAgICAgICAgaWYgKGN1cnJlbnRQb3NpdGlvblswXSA+IDE1MCkge1xuICAgICAgICAgICAgcG9zaXRpb24uc2V0KFsyNTAsd2luZG93LmlubmVySGVpZ2h0XSwge2N1cnZlIDogJ2Vhc2VPdXRCb3VuY2UnLCBkdXJhdGlvbiA6IDMwMH0pO1xuICAgICAgICAgICAgd2luZG93Lm9wZW4obGluaywgJ19ibGFuaycpO1xuICAgICAgICB9ZWxzZSBpZiAoY3VycmVudFBvc2l0aW9uWzBdIDwgKC0xNTApKSB7XG4gICAgICAgIC8vIFRyYW5zaXRpb24gb3V0IG9mIGRyYWdnZWQgbGVmdFxuICAgICAgICAgICAgcG9zaXRpb24uc2V0KFt3aW5kb3cuaW5uZXJXaWR0aCwwXSwge2N1cnZlIDogJ2Vhc2VPdXRCb3VuY2UnLCBkdXJhdGlvbiA6IDgwMH0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vQm91bmNlcyB0aGUgc3VyZmFjZSBiYWNrIHRvIGNlbnRlciBpZiB0aGUgZHJhZyB3YXMgaW5zdWZmaWNpZW50XG4gICAgICAgICAgICBwb3NpdGlvbi5zZXQoWzAsMF0sIHtjdXJ2ZSA6ICdlYXNlT3V0Qm91bmNlJywgZHVyYXRpb24gOiAzMDB9KTtcblxuICAgICAgICB9XG4gICAgfSlcblxuICAgIC8vIEFwcGxpZXMgdXBkYXRlZCBwb3NpdGlvbiB0byBzdXJmYWNlXG4gICAgdmFyIHBvc2l0aW9uTW9kaWZpZXIgPSBuZXcgTW9kaWZpZXIoe1xuICAgICAgICB0cmFuc2Zvcm06IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgY3VycmVudFBvc2l0aW9uID0gcG9zaXRpb24uZ2V0KCk7XG4gICAgICAgICAgICByZXR1cm4gVHJhbnNmb3JtLnRyYW5zbGF0ZShjdXJyZW50UG9zaXRpb25bMF0sIGN1cnJlbnRQb3NpdGlvblsxXSwgMCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFNlbmRzIGJhY2sgdGhlIG1vZGlmaWVkIHN1cmZhY2UgYW5kIHBvc2l0aW9uIG1vZGlmaWVyXG4gICAgcmV0dXJuIHtzdXJmYWNlOiBzdXJmYWNlLCBwb3NpdGlvbk1vZGlmaWVyOiBwb3NpdGlvbk1vZGlmaWVyLCBsaWtlOiBsaWtlLCBub3RMaWtlOm5vdExpa2UsIG9wYWNpdHlObzpvcGFjaXR5Tm8sIG9wYWNpdHlZZXM6b3BhY2l0eVllc307XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZHJhZzsiLCIgIHZhciBkYXRhID0ge1xuICAgIGxvZ286ICdpbWFnZXMvQ29jYS1Db2xhLnBuZycsXG4gICAgdXJsOiAnaHR0cDovL3VzLmNvY2EtY29sYS5jb20vaG9tZS8nLFxuICAgIG9yaWdpbjoge3g6IC41LCB5OiAwLCB6OiAwfSxcbiAgICBpbml0aWFsUG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICBpbml0aWFsVmVsb2NpdHk6IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICBpbml0aWFsUm90YXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICBvcGFjaXR5OiAxLFxuICAgIGVudGVyOiB7XG4gICAgICAgIHR5cGU6ICdzbGlkZUluT3V0JyxcbiAgICAgICAgcG9zaXRpb246IHt4OiAwLCB5OiA0MDAsIHo6IDB9LFxuICAgICAgICB2ZWxvY2l0eToge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgICAgICByb3RhdGlvbjoge3g6IE1hdGguUEkvMiwgeTogMCwgejogMH0sXG4gICAgICAgIHBlcmlvZDogMTAwMCxcbiAgICAgICAgZGFtcGluZ1JhdGlvOiAwLFxuICAgICAgICByZXN0aXR1dGlvbjogMCxcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgIGN1cnZlOiBudWxsXG4gICAgfSxcbiAgICBleGl0OiB7XG4gICAgICAgIHR5cGU6ICdyb3RhdGVJbk91dCcsXG4gICAgICAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAgICAgIHZlbG9jaXR5OiB7eDogMCwgeTogTWF0aC5QSSwgejogMH0sXG4gICAgICAgIHJvdGF0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAgICAgIHBlcmlvZDogMTAwMCxcbiAgICAgICAgZGFtcGluZ1JhdGlvOiAwLFxuICAgICAgICByZXN0aXR1dGlvbjogMCxcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgIGN1cnZlOiBudWxsXG4gICAgfVxufVxuXG5cblxuXG4gIC8vICQoZnVuY3Rpb24oKXtcbiAgICAgIFxuICAvLyAgICAgLy9oaWRlIGFsbCB0cmFuc2l0aW9uIHNlY3Rpb25zIGV4Y2VwdCBzZWxlY3RlZCBpdGVtIFxuICAvLyAgICQoJyNzZWxlY3RUcmFucycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gIC8vICAgICB2YXIgc2VsZWN0ZWQgPSAkKCdpbnB1dFt0eXBlPVwicmFkaW9cIl06Y2hlY2tlZCcpLnZhbCgpXG4gIC8vICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKCQoJyN0cmFuc2l0aW9ucycpLmNoaWxkcmVuKCksIGZ1bmN0aW9uKGNoaWxkKXtcbiAgLy8gICAgICAgJChjaGlsZCkuaGlkZSgpO1xuICAvLyAgICAgfSk7XG4gIC8vICAgICAkKCcjJytzZWxlY3RlZCkuc2hvdygpO1xuICAvLyAgIH0pLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgIFxuICAvLyAgIC8vc2F2ZSBkYXRhIChkYiBvciBsb2NhbGZpbGUpIFxuICAvLyAgIHZhciBzYXZlRGF0YSA9ZnVuY3Rpb24oZGF0YSl7IFxuICAvLyAgICAgJC5hamF4KHtcbiAgLy8gICAgICAgdHlwZTogXCJQT1NUXCIsXG4gIC8vICAgICAgIHVybDogXCIvcG9zdFwiLFxuICAvLyAgICAgICBkYXRhOiBkYXRhXG4gIC8vICAgICB9KVxuICAvLyAgICAgLmRvbmUoZnVuY3Rpb24oIG1zZyApIHtcbiAgLy8gICAgICAgY29uc29sZS5sb2coIFwiRGF0YSBTYXZlZDogXCIgKyBtc2cgKTtcbiAgLy8gICAgIH0pO1xuICAvLyAgIH1cblxuICAvLyAgIHZhciBnZXREYXRhID0gZnVuY3Rpb24oKXtcbiAgLy8gICAgICQuYWpheCh7XG4gIC8vICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gIC8vICAgICAgIHVybDogXCIvZ2V0XCIsXG4gIC8vICAgICAgIGRhdGE6IGRhdGFcbiAgLy8gICAgIH0pXG4gIC8vICAgICAuZG9uZShmdW5jdGlvbiggZGF0YSApIHtcbiAgLy8gICAgICAgY29uc29sZS5sb2coICBkYXRhICk7ICBcbiAgLy8gICAgIH0pO1xuICAvLyAgIH1cbiAgICBcbiAgLy8gICAkKCcjZXhwb3J0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgLy8gICAgIHZhciBzZWxlY3RlZCA9ICQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXTpjaGVja2VkJykudmFsKClcbiAgLy8gICAgIHZhciAkaW5mbyA9ICQoXCIjXCIgKyBzZWxlY3RlZClcbiAgICAgIFxuICAvLyAgICAgZGF0YS5sb2dvID0gJCgnI2xvZ29VcmwnKVxuICAvLyAgICAgZGF0YS51cmwgPSAkKCcjYWRMaW5rJykudmFsKCk7XG4gIC8vICAgICBkYXRhLm9yaWdpbi54ID0gJCgnI29yaWdpblgnKS52YWwoKTtcbiAgLy8gICAgIGRhdGEub3JpZ2luLnkgPSAkKCcjb3JpZ2luWScpLnZhbCgpO1xuICAvLyAgICAgZGF0YS5vcmlnaW4ueiA9ICQoJyNvcmlnaW5aJykudmFsKCk7XG5cbiAgLy8gICAgIGRhdGEuaW5pdGlhbFBvc2l0aW9uLnggPSAkKCcjaW5pdFBvc1gnKS52YWwoKTtcbiAgLy8gICAgIGRhdGEuaW5pdGlhbFBvc2l0aW9uLnkgPSAkKCcjaW5pdFBvc1knKS52YWwoKTtcbiAgLy8gICAgIGRhdGEuaW5pdGlhbFBvc2l0aW9uLnogPSAkKCcjaW5pdFBvc1onKS52YWwoKTtcblxuICAvLyAgICAgZGF0YS5pbml0aWFsVmVsb2NpdHkueCA9ICQoXCIjaW5pdFZlbFhcIikudmFsKCk7XG4gIC8vICAgICBkYXRhLmluaXRpYWxWZWxvY2l0eS55ID0gJChcIiNpbml0VmVsWVwiKS52YWwoKTtcbiAgLy8gICAgIGRhdGEuaW5pdGlhbFZlbG9jaXR5LnogPSAkKFwiI2luaXRWZWxaXCIpLnZhbCgpO1xuXG4gIC8vICAgICBkYXRhLmluaXRpYWxSb3RhdGlvbi54ID0gJChcIiNpbml0Um90WFwiKS52YWwoKTtcbiAgLy8gICAgIGRhdGEuaW5pdGlhbFJvdGF0aW9uLnkgPSAkKFwiI2luaXRSb3RZXCIpLnZhbCgpO1xuICAvLyAgICAgZGF0YS5pbml0aWFsUm90YXRpb24ueiA9ICQoXCIjaW5pdFJvdFpcIikudmFsKCk7XG5cbiAgLy8gICAgIGRhdGEub3BhY2l0eSA9ICQoJyNvcGFjaXR5JykudmFsKCk7XG5cbiAgLy8gICAgIGRhdGEuZW50ZXIudHlwZSA9IHNlbGVjdGVkO1xuICAgICAgXG4gIC8vICAgICBkYXRhLmVudGVyLnBvc2l0aW9uLnggPSAkKFwiI1wiK3NlbGVjdGVkK1wiUG9zWFwiKS52YWwoKTtcbiAgLy8gICAgIGRhdGEuZW50ZXIucG9zaXRpb24ueSA9ICQoXCIjXCIrc2VsZWN0ZWQrXCJQb3NZXCIpLnZhbCgpO1xuICAvLyAgICAgZGF0YS5lbnRlci5wb3NpdGlvbi56ID0gJChcIiNcIitzZWxlY3RlZCtcIlBvc1pcIikudmFsKCk7XG5cbiAgLy8gICAgIGRhdGEuZW50ZXIudmVsb2NpdHkueCA9ICQoXCIjXCIrc2VsZWN0ZWQrXCJWZWxYXCIpLnZhbCgpO1xuICAvLyAgICAgZGF0YS5lbnRlci52ZWxvY2l0eS55ID0gJChcIiNcIitzZWxlY3RlZCtcIlZlbFlcIikudmFsKCk7XG4gIC8vICAgICBkYXRhLmVudGVyLnZlbG9jaXR5LnogPSAkKFwiI1wiK3NlbGVjdGVkK1wiVmVsWlwiKS52YWwoKTtcblxuICAvLyAgICAgZGF0YS5lbnRlci5yb3RhdGlvbi54ID0gJChcIiNcIitzZWxlY3RlZCtcIlJvdFhcIikudmFsKCk7XG4gIC8vICAgICBkYXRhLmVudGVyLnJvdGF0aW9uLnkgPSAkKFwiI1wiK3NlbGVjdGVkK1wiUm90WVwiKS52YWwoKTtcbiAgLy8gICAgIGRhdGEuZW50ZXIucm90YXRpb24ueiA9ICQoXCIjXCIrc2VsZWN0ZWQrXCJSb3RaXCIpLnZhbCgpO1xuICAgICAgXG4gIC8vICAgICBkYXRhLmVudGVyLnBlcmlvZCA9ICQoXCIjXCIrc2VsZWN0ZWQrXCJQZXJpb2RcIikudmFsKCk7XG5cbiAgLy8gICAgIGRhdGEuZW50ZXIuZGFtcGluZ1JhdGlvID0gJChcIiNcIitzZWxlY3RlZCtcIkRhbXBlbmluZ1JhdGlvXCIpLnZhbCgpO1xuICAvLyAgICAgZGF0YS5lbnRlci5yZXN0aXR1dGlvbiA9ICQoXCIjXCIrc2VsZWN0ZWQrXCJSZXN0aXR1dGlvblwiKS52YWwoKTtcbiAgLy8gICAgIGRhdGEuZW50ZXIub3BhY2l0eSA9ICQoXCIjXCIrc2VsZWN0ZWQrXCJPcGFjaXR5XCIpLnZhbCgpXG4gIC8vICAgICBkYXRhLmVudGVyLmR1cmF0aW9uID0gJChcIiNcIitzZWxlY3RlZCtcIkR1cmF0aW9uXCIpLnZhbCgpXG4gIC8vICAgICBkYXRhLmVudGVyLmN1cnZlID0gJChcIiNcIitzZWxlY3RlZCtcIkN1cnZlXCIpLnZhbCgpXG4gICAgICBcbiAgLy8gICAgIHNhdmVEYXRhKGRhdGEpXG4gICAgICBcbiAgLy8gICB9KTtcblxuICAvLyB2YXIgZWwsIG5ld1BvaW50LCBuZXdQbGFjZSwgb2Zmc2V0O1xuXG4gIC8vICQoXCJpbnB1dFt0eXBlPSdyYW5nZSddXCIpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgIFxuICAvLyAgICBlbCA9ICQodGhpcyk7XG4gICAgIFxuICAvLyAgICB3aWR0aCA9IGVsLndpZHRoKCk7XG4gICAgIFxuICAvLyAgICBuZXdQb2ludCA9IChlbC52YWwoKSAtIGVsLmF0dHIoXCJtaW5cIikpIC8gKGVsLmF0dHIoXCJtYXhcIikgLSBlbC5hdHRyKFwibWluXCIpKTtcbiAgICAgXG4gIC8vICAgIG9mZnNldCA9IC0xLjM7XG4gICAgIFxuICAvLyAgICBpZiAobmV3UG9pbnQgPCAwKSB7IG5ld1BsYWNlID0gMDsgfVxuICAvLyAgICBlbHNlIGlmIChuZXdQb2ludCA+IDEpIHsgbmV3UGxhY2UgPSB3aWR0aDsgfVxuICAvLyAgICBlbHNlIHsgbmV3UGxhY2UgPSB3aWR0aCAqIG5ld1BvaW50ICsgb2Zmc2V0OyBvZmZzZXQgLT0gbmV3UG9pbnQ7IH1cbiAgICAgXG4gIC8vICAgIGVsLm5leHQoXCJvdXRwdXRcIikudGV4dChlbC52YWwoKSk7XG4gIC8vICB9KS50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAvLyB9KVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGE7IiwiLy9sb2FkIHNjcm9sbHNcbnJlcXVpcmUoJy4vc2Nyb2xsLmpzJyk7XG4vLyBMb2FkIGNzc1xucmVxdWlyZSgnLi9zdHlsZXMnKTtcbi8vIExvYWQgcG9seWZpbGxzXG5yZXF1aXJlKCdmYW1vdXMtcG9seWZpbGxzJyk7XG5cbi8vIEltcG9ydCBEZXBlbmRlbmNpZXNcbnZhciBFbmdpbmUgPSByZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvRW5naW5lJyk7XG52YXIgU3VyZmFjZSA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvY29yZS9TdXJmYWNlJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9jb3JlL1RyYW5zZm9ybScpO1xudmFyIEFwcFZpZXcgPSByZXF1aXJlKCcuL3ZpZXdzL0FwcFZpZXcnKTtcblxuLy8gQ3JlYXRlIGNvbnRhaW5lciBhbmQgc2V0IHRvIG1haW4gY29udGV4dFxudmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZhbW91cy1jb250YWluZXInKTtcbkVuZ2luZS5zZXRPcHRpb25zKHsgYXBwTW9kZTogZmFsc2UgfSk7XG52YXIgY29udGFpbmVyID0gRW5naW5lLmNyZWF0ZUNvbnRleHQoZWwpO1xuLy8gY29udGFpbmVyLnNldFBlcnNwZWN0aXZlKDMwMCk7XG4vLyBBZGQgdXRpbGl0eSBmdW5jdGlvbiB0aGF0IGdyYWJzIGFkIGRhdGFcbmZ1bmN0aW9uIGluaXRBZEZhbWUoZGF0YSkge1xuICAgIHZhciBhcHBWaWV3ID0gbmV3IEFwcFZpZXcoeyBkYXRhOiBkYXRhIH0pO1xuICAgIGNvbnRhaW5lci5hZGQoYXBwVmlldyk7XG59O1xuXG4vLyBJbnN0YW50aWF0ZSBBcHBWaWV3IHVzaW5nIGRhdGFcbnZhciBkYXRhID0gcmVxdWlyZSgnLi9kYXRhJylcbmluaXRBZEZhbWUoZGF0YSk7IiwidmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvY29yZS9FdmVudEhhbmRsZXInKTtcclxudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvY29yZS9UcmFuc2Zvcm0nKTtcclxudmFyIHdpbmRvd1Njcm9sbEV2ZW50cyA9IHt9XHJcblxyXG4vLyBTZXQgdXAgZXZlbnQgaGFuZGxlcnMgKiogc2hvcnQgbmFtZXMgbW9yZSByZWFkYWJsZSBpbiBjb25kaXRpb25hbHMgYmVsb3cgKipcclxudmFyIHNjcm9sbEV2ZW50cyA9IG5ldyBFdmVudEhhbmRsZXIoKTtcclxuXHJcbi8vIFNldCBoYW5kbGVycyB0byBtYWluIGV4cG9ydGVkIG9iamVjdFxyXG53aW5kb3dTY3JvbGxFdmVudHMuc2Nyb2xsRXZlbnRzID0gc2Nyb2xsRXZlbnRzO1xyXG5cclxuLy8gU3dpdGNoZXMgc28gZXZlbnQgaGFuZGxlcnMgYXJlIG9ubHkgY2FsbGVkIG9uY2Ugb24gc2Nyb2xsXHJcbndpbmRvd1Njcm9sbEV2ZW50cy5jYWxsZWQgPSBmYWxzZTtcclxud2luZG93U2Nyb2xsRXZlbnRzLmhpdEVuZCA9IGZhbHNlO1xyXG5cclxuLy8gVGFyZ2V0IGVsZW1lbnRzIGFuZCBkdXJhdGlvbiBpbiBwaXhlbHM7XHJcbnZhciBlbGVtZW50SWRTdGFydCA9ICdzdGFydEFkRmFtZSc7XHJcbnZhciBlbGVtZW50SWRFbmQgPSAnZW5kQWRGYW1lJztcclxuLy8gdmFyIHBhZGRpbmcgPSAxMDA7XHJcbi8vdmFyIGR1cmF0aW9uID0gMTAwMDtcclxuXHJcbmNvbnNvbGUubG9nKCd0aGlzIGlzIHdvcmtpbmcnKVxyXG5cclxuLy8gTmF0aXZlIHNjcm9sbCBtYWluIGZ1bmN0aW9uXHJcbndpbmRvdy5vbnNjcm9sbCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgLy8gUG9zaXRpb24gdmFyaWFibGVzXHJcbiAgICB2YXIgdGFyZ2V0UG9zaXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWRTdGFydCkub2Zmc2V0VG9wO1xyXG4gICAgdmFyIHRhcmdldEVuZFBvc2l0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkRW5kKS5vZmZzZXRUb3A7IFxyXG4gICAgdmFyIHdpbmRvd1RvcFBvc2l0aW9uID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cclxuICAgIC8vIENoZWNrIHRvIHNlZSBpZiB5b3UgcmVhY2ggZW50ZXIgZWxlbWVudCBzY3JvbGxpbmcgZG93blxyXG4gICAgaWYoIXdpbmRvd1Njcm9sbEV2ZW50cy5jYWxsZWQgJiYgKHdpbmRvd1RvcFBvc2l0aW9uKSA+IHRhcmdldFBvc2l0aW9uKSB7XHJcbiAgICAgICAgc2Nyb2xsRXZlbnRzLmVtaXQoJ3RhcmdldFN0YXJ0UmVhY2hlZCcpO1xyXG4gICAgICAgIHdpbmRvd1Njcm9sbEV2ZW50cy5jYWxsZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENoZWNrIHRvIHNlZSBpZiB5b3UgcmVhY2ggZW50ZXIgZWxlbWVudCBzY3JvbGxpbmcgdXBcclxuICAgIGlmICh3aW5kb3dTY3JvbGxFdmVudHMuY2FsbGVkICYmICh3aW5kb3dUb3BQb3NpdGlvbikgPCB0YXJnZXRQb3NpdGlvbikge1xyXG4gICAgICAgIHNjcm9sbEV2ZW50cy5lbWl0KCd0YXJnZXRTdGFydFJlYWNoZWQnKTtcclxuICAgICAgICB3aW5kb3dTY3JvbGxFdmVudHMuY2FsbGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHlvdSByZWFjaCBlbmQgZWxlbWVudCBzY3JvbGxpbmcgZG93blxyXG4gICAgaWYoIXdpbmRvd1Njcm9sbEV2ZW50cy5oaXRFbmQgJiYgKHdpbmRvd1RvcFBvc2l0aW9uID4gdGFyZ2V0RW5kUG9zaXRpb24pKSB7XHJcbiAgICAgICAgc2Nyb2xsRXZlbnRzLmVtaXQoJ3RhcmdldEVuZFJlYWNoZWQnKTtcclxuICAgICAgICB3aW5kb3dTY3JvbGxFdmVudHMuaGl0RW5kID0gdHJ1ZTtcclxuICAgICB9XHJcblxyXG4gICAgIC8vIENoZWNrIHRvIHNlZSBpZiB5b3UgcmVhY2ggZW5kIGVsZW1lbnQgc2Nyb2xsaW5nIHVwXHJcbiAgICAgaWYod2luZG93U2Nyb2xsRXZlbnRzLmhpdEVuZCAmJiAod2luZG93VG9wUG9zaXRpb24gPCB0YXJnZXRFbmRQb3NpdGlvbikpIHtcclxuICAgICAgICAgc2Nyb2xsRXZlbnRzLmVtaXQoJ3RhcmdldEVuZFJlYWNoZWQnKTtcclxuICAgICAgICAgd2luZG93U2Nyb2xsRXZlbnRzLmhpdEVuZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgIFxyXG4gICAgLy8gRW1pdHMgd2luZG93IHBvc2l0aW9uXHJcbiAgICAvLyBzY3JvbGxFdmVudHMuZW1pdCgncG9zaXRpb25ZQ2hhbmdlJywge3Bvc2l0aW9uOiB3aW5kb3dUb3BQb3NpdGlvbiwgY2FsbGVkOiB3aW5kb3dTY3JvbGxFdmVudHMuY2FsbGVkfSk7XHJcblxyXG4gICAgLy8gSWYgeW91IGFyZSBub3QgeWV0IGF0IHRoZSB0YXJnZXQgZWxlbWVudCwgd2luZG93U2Nyb2xsRXZlbnRzLmNhbGxlZCBpcyBmYWxzZVxyXG4gICAgLy8gaWYoKHdpbmRvd1RvcFBvc2l0aW9uICsgcGFkZGluZykgPCB0YXJnZXRQb3NpdGlvbil7XHJcbiAgICAvLyAgICAgd2luZG93U2Nyb2xsRXZlbnRzLmNhbGxlZCA9IGZhbHNlO1xyXG4gICAgLy8gICAgIHdpbmRvd1Njcm9sbEV2ZW50cy5oaXRFbmQgPSBmYWxzZTtcclxuICAgICAgXHJcbiAgICAvLyAgICAgLy9lbWl0IGV2ZW50IHdoZW4gdGFyZ2V0IG5vdCByZWFjaGVkIFxyXG4gICAgLy8gICAgIHNjcm9sbEV2ZW50cy5lbWl0KCd0YXJnZXROb3RSZWFjaGVkJyk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gSWYgeW91IHJlYWNoIFggZHVyYXRpb24gcGl4ZWxzIGJlbG93IHRhcmdldCBlbGVtZW50IGFsZXJ0IGFiZCBvbmx5IGNhbGwgb25jZVxyXG4gICAgLy8gaWYoIXdpbmRvd1Njcm9sbEV2ZW50cy5oaXRFbmQgJiYgd2luZG93VG9wUG9zaXRpb24gPiAodGFyZ2V0UG9zaXRpb24rZHVyYXRpb24pKXtcclxuICAgIC8vICAgICB3aW5kb3dTY3JvbGxFdmVudHMuaGl0RW5kID0gdHJ1ZTtcclxuICAgIC8vIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dTY3JvbGxFdmVudHMiLCJ2YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9jb3JlL1RyYW5zZm9ybScpO1xudmFyIE1vZGlmaWVyID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9jb3JlL01vZGlmaWVyJyk7XG52YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9jb3JlL0V2ZW50SGFuZGxlcicpO1xudmFyIFNjcm9sbCA9IHJlcXVpcmUoJy4vc2Nyb2xsLmpzJyk7XG52YXIgQWRHZW5lcmF0b3IgPSByZXF1aXJlKCcuL0FkR2VuZXJhdG9yJyk7XG5cbnZhciBkYXRhID0gcmVxdWlyZSgnLi9kYXRhLmpzJyk7XG5cbi8vbGlzdGVuIHRvIHNjcm9sbCBldmVudHNcbnZhciBzY3JvbGxFdmVudHNMaXN0ZW5lciA9IG5ldyBFdmVudEhhbmRsZXIoKTtcblxuLy9zdWJzY3JpYmUgdG8gc2Nyb2xsIGV2ZW50c1xuc2Nyb2xsRXZlbnRzTGlzdGVuZXIuc3Vic2NyaWJlKFNjcm9sbC5zY3JvbGxFdmVudHMpO1xuXG4vL2FkZCBhZEdlbmVyYXRvciB0aGF0IGNvbnRhaW5zIGVudHJ5IHRyYW5zaXRpb25zXG52YXIgYWRHZW5lcmF0b3IgPSBBZEdlbmVyYXRvcigpO1xuXG5cbi8vIC8vIFJlc2V0IGJhbm5lciB0byBpbml0aWFsIHN0YXRlIGhlbHBlciBmdW5jdGlvbiBcbi8vIHZhciByZXNldEJhbm5lciA9IGZ1bmN0aW9uKCl7XG4vLyAgICAgY29uc29sZS5sb2coJ3Jlc2V0JywgdGFyZ2V0SGl0KVxuLy8gICAgIGlmKHRhcmdldEhpdCl7XG4vLyAgICAgICAgIC8vcmVzZXQgYmFubmVyIHRvIG5vdCBjYWxsZWQgICBcbi8vICAgICAgICAgdGFyZ2V0SGl0ID0gZmFsc2U7XG4vLyAgICAgICAgIC8vcmVzZXQgYmFubmVyIHRvIGluaXRpYWwgdmFsdWVzXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKCdhY3R1YWwgcmVzZXQnKVxuLy8gICAgICAgICBtYWluTW9kaWZpZXIuc2V0VHJhbnNmb3JtKFRyYW5zZm9ybS5yb3RhdGUoaW5pdFBvc1gsaW5pdFBvc1ksaW5pdFBvc1opKSAgXG4vLyAgICAgfVxuLy8gfVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgTUFJTiAgSU4vT1VUICBTQ1JPTExFUiAgREVGQVVMVFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8vIC8vZGVmYXVsdCBpbml0aWFsIHN0YXRlIGJlZm9yZSBiYW5uZXIgc2Nyb2xscyBpbiBcbi8vIHZhciBpbml0UG9zWCA9IDAsXG4vLyBpbml0UG9zWSA9IDAsXG4vLyBpbml0UG9zWiA9IDAsXG4vLyBkaXN0YW5jZSA9IDEwMCxcbnRyYW5zaXRpb25DYWxsZWQgPSBmYWxzZVxuLy8gdGFyZ2V0SGl0ID0gZmFsc2U7XG5cbi8vIC8vZGVmYXVsdCBzdGF0ZSBmb3IgYmFubmVyIHNjcm9sbCBpbiBlbmQgXG4vLyB2YXIgZW5kUG9zWCA9IE1hdGguUEkvMjtcbi8vIHZhciBlbmRQb3NZID0gMDtcbi8vIHZhciBlbmRQb3NaID0gMDtcbi8vIHZhciBsb2NhdGlvbiA9IDA7XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuLy8gQ3JlYXRlIG1haW5Nb2RpZmllclxudmFyIG1haW5Nb2RpZmllciA9IG5ldyBNb2RpZmllcigpOyBcblxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgVEFSR0VUICBSRUFDSEVEICBFVkVOVCAgSEFORExFUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5zY3JvbGxFdmVudHNMaXN0ZW5lci5vbigndGFyZ2V0U3RhcnRSZWFjaGVkJywgZnVuY3Rpb24oKXtcbiAgICAvLyBDYWxsIGFkR2VuZXJhdG9yIGVudGVyL2V4aXQgbWV0aG9kcyB3aGVuIHRhcmdldCBpcyByZWFjaGVkXG4gICAgbWFpbk1vZGlmaWVyLmhhbHQoKTtcbiAgICBpZighdHJhbnNpdGlvbkNhbGxlZCkge1xuICAgICAgICBhZEdlbmVyYXRvci5lbnRlcihtYWluTW9kaWZpZXIpO1xuICAgICAgICB0cmFuc2l0aW9uQ2FsbGVkID0gIXRyYW5zaXRpb25DYWxsZWQ7XG4gICAgfSBlbHNlIGlmICh0cmFuc2l0aW9uQ2FsbGVkKSB7XG4gICAgICAgIGFkR2VuZXJhdG9yLmV4aXQobWFpbk1vZGlmaWVyKTtcbiAgICAgICAgdHJhbnNpdGlvbkNhbGxlZCA9ICF0cmFuc2l0aW9uQ2FsbGVkO1xuICAgIH1cbn0pO1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgVEFSR0VUICBFTkQgIFJFQUNIRUQgIEVWRU5UICBIQU5ETEVSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnNjcm9sbEV2ZW50c0xpc3RlbmVyLm9uKCd0YXJnZXRFbmRSZWFjaGVkJywgZnVuY3Rpb24oKXsgIFxuICAgIC8vIENhbGwgYWRHZW5lcmF0b3IgZW50ZXIvZXhpdCBtZXRob2RzIHdoZW4gdGFyZ2V0IGlzIHJlYWNoZWRcbiAgICBtYWluTW9kaWZpZXIuaGFsdCgpO1xuICAgIGlmKHRyYW5zaXRpb25DYWxsZWQpIHtcbiAgICAgICAgYWRHZW5lcmF0b3IuZXhpdChtYWluTW9kaWZpZXIpO1xuICAgICAgICB0cmFuc2l0aW9uQ2FsbGVkID0gIXRyYW5zaXRpb25DYWxsZWQ7XG4gICAgfSBlbHNlIGlmICghdHJhbnNpdGlvbkNhbGxlZCkge1xuICAgICAgICBhZEdlbmVyYXRvci5lbnRlcihtYWluTW9kaWZpZXIpO1xuICAgICAgICB0cmFuc2l0aW9uQ2FsbGVkID0gIXRyYW5zaXRpb25DYWxsZWQ7XG4gICAgfVxufSk7XG5cbi8vIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICAgICBXSU5ET1cgUE9TSVRJT04gRVZFTlQgSEFORExFUiAoaW5zaWRlIHRhcmdldCByZWFjaGVkIGhhbmRsZXIpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8vICAgICAvLyBQb3NpdGlvbiBpcyB0aGUgdGFyZ2V0IHBvc2l0aW9uIGFuZCBhbnkgcGFkZGluZyBmb3IgdGhlIG1haW4gdGFyZ2V0IGRpdlxuLy8gICAgIHZhciBwb3NpdGlvbiA9IGVsZW1lbnQudGFyZ2V0RW5kUG9zaXRpb247ICAgIFxuXG4vLyAgICAgc2Nyb2xsRXZlbnRzTGlzdGVuZXIub24oJ3Bvc2l0aW9uWUNoYW5nZScsIGZ1bmN0aW9uKHkpeyBcbi8vICAgICAgICAgLy90cmFjayBjdXJyZW50IFkgcG9zaXRvbiBvZiB3aW5kb3dcbi8vICAgICAgICAgdmFyIHRyYWNrZXIgPSB5LnBvc2l0aW9uO1xuXG4vLyAgICAgICAgIC8vbGluayB0aGUgcm90YXRpb24gcG9zaXRpb24gdG8gdGhlIHdpbmRvdyBzY3JvbGxcbi8vICAgICAgICAgcm90YXRlUG9zWCA9ICh0cmFja2VyIC0gcG9zaXRpb24pIC8gZGlzdGFuY2U7XG5cblxuLy8gICAgICAgICAvL29ubHkgbGluayByb3RhdGlvbiB0byBzY3JvbGwgaWYgYmV0d2VlbiBpbml0IGFuZCBlbmQgcG9zaXRpb25zXG4vLyAgICAgICAgIGlmKHJvdGF0ZVBvc1ggPD0gZW5kUG9zWCAmJiByb3RhdGVQb3NYID49IGluaXRQb3NYKSB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygncm90YXRlJywgcm90YXRlUG9zWClcbi8vICAgICAgICAgICAgIG1haW5Nb2RpZmllci5zZXRUcmFuc2Zvcm0oVHJhbnNmb3JtLnJvdGF0ZShyb3RhdGVQb3NYLCAwLCAwKSk7XG4vLyAgICAgICAgIH1cbi8vICAgICB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSB7bWFpbk1vZGlmaWVyOiBtYWluTW9kaWZpZXJ9OyIsInZhciBjc3MgPSBcImh0bWwge1xcbiAgYmFja2dyb3VuZDogI2ZmZjtcXG4gIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiBub25lO1xcbn1cXG5cXG4uYmFja2ZhY2VWaXNpYmlsaXR5IHtcXG4gIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gIGJhY2tmYWNlLXZpc2liaWxpdHk6IHZpc2libGU7XFxufVxcblxcbi5nYXJkZW4ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGggOiAyMDBweDtcXG4gIGhlaWdodDogMjAwcHg7XFxuICBib3JkZXI6IDVweCBzb2xpZCAjQ0NDO1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG59XFxuXFxuLmJhbGwge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wICAgOiA5MHB4O1xcbiAgbGVmdCAgOiA5MHB4O1xcbiAgd2lkdGggOiAyMHB4O1xcbiAgaGVpZ2h0OiAyMHB4O1xcbiAgYmFja2dyb3VuZDogZ3JlZW47XFxuICBib3JkZXItcmFkaXVzOiAxMDAlO1xcbn1cIjsgKHJlcXVpcmUoXCIvVXNlcnMvYWxlamFuZHJvenVjY29saWxsby9EZXNrdG9wL0FkRmFtZS9ub2RlX21vZHVsZXMvY3NzaWZ5XCIpKShjc3MpOyBtb2R1bGUuZXhwb3J0cyA9IGNzczsiLCIvLyBsb2FkIGNzc1xucmVxdWlyZSgnZmFtb3VzL3NyYy9jb3JlL2ZhbW91cy5jc3MnKTtcbnJlcXVpcmUoJy4vYXBwLmNzcycpO1xuIiwiLy8gTG9hZCBEZXBlbmRlbmNpZXNcbnZhciBWaWV3ID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9jb3JlL1ZpZXcnKTtcblxuLy8gTG9hZCBmaWxlc1xudmFyIEJhbm5lclZpZXcgPSByZXF1aXJlKCcuL0Jhbm5lclZpZXcnKTtcbnZhciBBZEdlbmVyYXRvciA9IHJlcXVpcmUoJy4uL0FkR2VuZXJhdG9yJyk7XG52YXIgZHJhZyA9IHJlcXVpcmUoJy4uL0RyYWcnKTtcblxudmFyIHNjcm9sbGVkID0gcmVxdWlyZSgnLi4vc2Nyb2xsaW5nJylcbnZhciBkYXRhID0gcmVxdWlyZSgnLi4vZGF0YScpIFxuXG4vLyBBZGQgbW9kaWZpZXIgb2JqZWN0c1xudmFyIGFkT2JqZWN0ID0gQWRHZW5lcmF0b3IoKTtcbnZhciBkcmFnT2JqZWN0ID0gZHJhZyhhZE9iamVjdC5sb2dvLCBkYXRhLnVybCk7XG52YXIgc2Nyb2xsT2JqZWN0ID0gc2Nyb2xsZWQ7XG5cblxuLy8gQ3JlYXRlIEFkdmlld1xuZnVuY3Rpb24gQWRWaWV3KCkge1xuICAgIFZpZXcuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBfY3JlYXRlQWQuY2FsbCh0aGlzKTtcbiAgICAvLyBfY3JlYXRlQmFubmVyLmNhbGwodGhpcyk7XG59XG5cbkFkVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFZpZXcucHJvdG90eXBlKTtcbkFkVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBZFZpZXc7XG5cbi8vIEFkVmlldy5ERUZBVUxUX09QVElPTlMgPSB7XG4vLyAgICAgZGF0YTogdW5kZWZpbmVkXG4vLyB9XG5cbi8vIEFwcGxpZXMgc3VyZmFjZSBhbmQgbW9kaWZpZXIgc28gQWRWaWV3XG5mdW5jdGlvbiBfY3JlYXRlQWQoKSB7XG4gICAgdmFyIG1haW5Ob2RlPSB0aGlzLmFkZChhZE9iamVjdC5tb2RpZmllcilcbiAgICAgICAgLmFkZChkcmFnT2JqZWN0LnBvc2l0aW9uTW9kaWZpZXIpXG4gICAgICAgIC5hZGQoc2Nyb2xsT2JqZWN0Lm1haW5Nb2RpZmllcik7XG5cbiAgICAgICAgdmFyIGxpa2VOb2RlID0gbWFpbk5vZGU7XG4gICAgICAgIFxuICAgICAgICBtYWluTm9kZS5hZGQoZHJhZ09iamVjdC5zdXJmYWNlKTtcbiAgICAgICAgXG4gICAgICAgIGxpa2VOb2RlLmFkZChkcmFnT2JqZWN0Lm9wYWNpdHlZZXMpXG4gICAgICAgIC5hZGQoZHJhZ09iamVjdC5saWtlKTtcblxuICAgICAgICBsaWtlTm9kZS5hZGQoZHJhZ09iamVjdC5vcGFjaXR5Tm8pXG4gICAgICAgIC5hZGQoZHJhZ09iamVjdC5ub3RMaWtlKTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUJhbm5lcigpIHtcbiAgICAgICAgLy8gdGhpcy5hZGQoYWRPYmplY3QubW9kaWZpZXIpXG4gICAgICAgIC8vIC5hZGQoc2Nyb2xsT2JqZWN0Lm1haW5Nb2RpZmllcilcbiAgICAgICAgLy8gdmFyIG5vdExpa2U9IGxpa2U7XG4gICAgICAgIC8vIC5hZGQoZHJhZ09iamVjdC5vcGFjaXR5Tm9wYWNpdHlZZXMpXG4gICAgICAgIC8vIC5hZGQoZHJhZ09iamVjdC5saWtlKTtcbiAgICAgICAgLy8gbm90TGlrZS5hZGQoZHJhZ09iamVjdC5vcGFjaXR5Tm8pXG4gICAgICAgIC8vIC5hZGQoZHJhZ09iamVjdC5ub3RMaWtlKTtcbn1cblxuLy8gRXhwb3J0cyBBZFZpZXdcbm1vZHVsZS5leHBvcnRzID0gQWRWaWV3OyIsIi8vIExvYWQgZGVwZW5kZW5jaWVzXG52YXIgVmlldyA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvY29yZS9WaWV3Jyk7XG52YXIgQWRWaWV3ID0gcmVxdWlyZSgnLi9BZFZpZXcnKTtcblxuLy8gQ3JlYXRlIEFwcFZpZXcgY2xhc3NcbmZ1bmN0aW9uIEFwcFZpZXcoKSB7XG4gICAgVmlldy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGNyZWF0ZUFkVmlldy5jYWxsKHRoaXMpO1xufVxuXG5BcHBWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVmlldy5wcm90b3R5cGUpO1xuQXBwVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBcHBWaWV3O1xuXG4vLyBBcHBWaWV3LkRFRkFVTFRfT1BUSU9OUyA9IHtcbi8vICAgICBkYXRhOiB1bmRlZmluZWRcbi8vIH1cblxuLy8gQWRkIGFkVmlldyBhcyBjaGlsZCBvZiBBcHBWaWV3XG5mdW5jdGlvbiBjcmVhdGVBZFZpZXcoKSB7XG4gICAgdmFyIGFkVmlldyA9IG5ldyBBZFZpZXcoKTtcbiAgICB0aGlzLmFkZChhZFZpZXcpO1xufVxuXG4vLyBFeHBvcnQgQXBwVmlld1xubW9kdWxlLmV4cG9ydHMgPSBBcHBWaWV3OyIsbnVsbF19
