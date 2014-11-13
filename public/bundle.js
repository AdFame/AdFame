(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\cssify\\browser.js":[function(require,module,exports){
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

},{}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous-polyfills\\classList.js":[function(require,module,exports){

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

},{}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous-polyfills\\functionPrototypeBind.js":[function(require,module,exports){
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

},{}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous-polyfills\\index.js":[function(require,module,exports){
require('./classList.js');
require('./functionPrototypeBind.js');
require('./requestAnimationFrame.js');
},{"./classList.js":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous-polyfills\\classList.js","./functionPrototypeBind.js":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous-polyfills\\functionPrototypeBind.js","./requestAnimationFrame.js":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous-polyfills\\requestAnimationFrame.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous-polyfills\\requestAnimationFrame.js":[function(require,module,exports){
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

},{}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Context.js":[function(require,module,exports){
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
},{"../transitions/Transitionable":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\transitions\\Transitionable.js","./ElementAllocator":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\ElementAllocator.js","./EventHandler":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\EventHandler.js","./RenderNode":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\RenderNode.js","./Transform":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Transform.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\ElementAllocator.js":[function(require,module,exports){
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
},{}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\ElementOutput.js":[function(require,module,exports){
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
},{"./Entity":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Entity.js","./EventHandler":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\EventHandler.js","./Transform":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Transform.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Engine.js":[function(require,module,exports){
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
},{"./Context":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Context.js","./EventHandler":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\EventHandler.js","./OptionsManager":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\OptionsManager.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Entity.js":[function(require,module,exports){
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
},{}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\EventEmitter.js":[function(require,module,exports){
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
},{}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\EventHandler.js":[function(require,module,exports){
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
},{"./EventEmitter":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\EventEmitter.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Modifier.js":[function(require,module,exports){
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
},{"../transitions/Transitionable":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\transitions\\Transitionable.js","../transitions/TransitionableTransform":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\transitions\\TransitionableTransform.js","./Transform":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Transform.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\OptionsManager.js":[function(require,module,exports){
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
},{"./EventHandler":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\EventHandler.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\RenderNode.js":[function(require,module,exports){
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
},{"./Entity":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Entity.js","./SpecParser":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\SpecParser.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\SpecParser.js":[function(require,module,exports){
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
},{"./Transform":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Transform.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Surface.js":[function(require,module,exports){
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
},{"./ElementOutput":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\ElementOutput.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Transform.js":[function(require,module,exports){
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
},{}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\View.js":[function(require,module,exports){
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
},{"../utilities/Utility":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\utilities\\Utility.js","./EventHandler":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\EventHandler.js","./OptionsManager":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\OptionsManager.js","./RenderNode":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\RenderNode.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\ViewSequence.js":[function(require,module,exports){
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
},{}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\famous.css":[function(require,module,exports){
var css = "/* This Source Code Form is subject to the terms of the Mozilla Public\n * License, v. 2.0. If a copy of the MPL was not distributed with this\n * file, You can obtain one at http://mozilla.org/MPL/2.0/.\n *\n * Owner: mark@famo.us\n * @license MPL 2.0\n * @copyright Famous Industries, Inc. 2014\n */\n\n.famous-root {\n    width: 100%;\n    height: 100%;\n    margin: 0px;\n    padding: 0px;\n    overflow: hidden;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n}\n\n.famous-container, .famous-group {\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    bottom: 0px;\n    right: 0px;\n    overflow: visible;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-backface-visibility: visible;\n    backface-visibility: visible;\n    pointer-events: none;\n}\n\n.famous-group {\n    width: 0px;\n    height: 0px;\n    margin: 0px;\n    padding: 0px;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n}\n\n.famous-surface {\n    position: absolute;\n    -webkit-transform-origin: center center;\n    transform-origin: center center;\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    -webkit-tap-highlight-color: transparent;\n    pointer-events: auto;\n}\n\n.famous-container-group {\n    position: relative;\n    width: 100%;\n    height: 100%;\n}\n"; (require("c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\cssify"))(css); module.exports = css;
},{"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\cssify":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\cssify\\browser.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\inputs\\GenericSync.js":[function(require,module,exports){
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
},{"../core/EventHandler":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\EventHandler.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\inputs\\MouseSync.js":[function(require,module,exports){
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
    this._documentActive = false;
}
MouseSync.DEFAULT_OPTIONS = {
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
},{"../core/EventHandler":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\EventHandler.js","../core/OptionsManager":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\OptionsManager.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\inputs\\ScrollSync.js":[function(require,module,exports){
var EventHandler = require('../core/EventHandler');
var Engine = require('../core/Engine');
var OptionsManager = require('../core/OptionsManager');
function ScrollSync(options) {
    this.options = Object.create(ScrollSync.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this._payload = {
        delta: null,
        position: null,
        velocity: null,
        slip: true
    };
    this._eventInput = new EventHandler();
    this._eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this._eventInput);
    EventHandler.setOutputHandler(this, this._eventOutput);
    this._position = this.options.direction === undefined ? [
        0,
        0
    ] : 0;
    this._prevTime = undefined;
    this._prevVel = undefined;
    this._eventInput.on('mousewheel', _handleMove.bind(this));
    this._eventInput.on('wheel', _handleMove.bind(this));
    this._inProgress = false;
    this._loopBound = false;
}
ScrollSync.DEFAULT_OPTIONS = {
    direction: undefined,
    minimumEndSpeed: Infinity,
    rails: false,
    scale: 1,
    stallTime: 50,
    lineHeight: 40,
    preventDefault: true
};
ScrollSync.DIRECTION_X = 0;
ScrollSync.DIRECTION_Y = 1;
var MINIMUM_TICK_TIME = 8;
var _now = Date.now;
function _newFrame() {
    if (this._inProgress && _now() - this._prevTime > this.options.stallTime) {
        this._inProgress = false;
        var finalVel = Math.abs(this._prevVel) >= this.options.minimumEndSpeed ? this._prevVel : 0;
        var payload = this._payload;
        payload.position = this._position;
        payload.velocity = finalVel;
        payload.slip = true;
        this._eventOutput.emit('end', payload);
    }
}
function _handleMove(event) {
    if (this.options.preventDefault)
        event.preventDefault();
    if (!this._inProgress) {
        this._inProgress = true;
        this._position = this.options.direction === undefined ? [
            0,
            0
        ] : 0;
        payload = this._payload;
        payload.slip = true;
        payload.position = this._position;
        payload.clientX = event.clientX;
        payload.clientY = event.clientY;
        payload.offsetX = event.offsetX;
        payload.offsetY = event.offsetY;
        this._eventOutput.emit('start', payload);
        if (!this._loopBound) {
            Engine.on('prerender', _newFrame.bind(this));
            this._loopBound = true;
        }
    }
    var currTime = _now();
    var prevTime = this._prevTime || currTime;
    var diffX = event.wheelDeltaX !== undefined ? event.wheelDeltaX : -event.deltaX;
    var diffY = event.wheelDeltaY !== undefined ? event.wheelDeltaY : -event.deltaY;
    if (event.deltaMode === 1) {
        diffX *= this.options.lineHeight;
        diffY *= this.options.lineHeight;
    }
    if (this.options.rails) {
        if (Math.abs(diffX) > Math.abs(diffY))
            diffY = 0;
        else
            diffX = 0;
    }
    var diffTime = Math.max(currTime - prevTime, MINIMUM_TICK_TIME);
    var velX = diffX / diffTime;
    var velY = diffY / diffTime;
    var scale = this.options.scale;
    var nextVel;
    var nextDelta;
    if (this.options.direction === ScrollSync.DIRECTION_X) {
        nextDelta = scale * diffX;
        nextVel = scale * velX;
        this._position += nextDelta;
    } else if (this.options.direction === ScrollSync.DIRECTION_Y) {
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
    payload.slip = true;
    this._eventOutput.emit('update', payload);
    this._prevTime = currTime;
    this._prevVel = nextVel;
}
ScrollSync.prototype.getOptions = function getOptions() {
    return this.options;
};
ScrollSync.prototype.setOptions = function setOptions(options) {
    return this._optionsManager.setOptions(options);
};
module.exports = ScrollSync;
},{"../core/Engine":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Engine.js","../core/EventHandler":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\EventHandler.js","../core/OptionsManager":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\OptionsManager.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\inputs\\TouchSync.js":[function(require,module,exports){
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
},{"../core/EventHandler":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\EventHandler.js","../core/OptionsManager":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\OptionsManager.js","./TouchTracker":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\inputs\\TouchTracker.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\inputs\\TouchTracker.js":[function(require,module,exports){
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
},{"../core/EventHandler":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\EventHandler.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\math\\Vector.js":[function(require,module,exports){
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
},{}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\modifiers\\StateModifier.js":[function(require,module,exports){
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
},{"../core/Modifier":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Modifier.js","../core/Transform":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Transform.js","../transitions/Transitionable":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\transitions\\Transitionable.js","../transitions/TransitionableTransform":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\transitions\\TransitionableTransform.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\physics\\PhysicsEngine.js":[function(require,module,exports){
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
        for (var agent in this._agentData)
            this.detachFrom(agent.id, body);
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
},{"../core/EventHandler":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\EventHandler.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\physics\\bodies\\Particle.js":[function(require,module,exports){
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
},{"../../core/EventHandler":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\EventHandler.js","../../core/Transform":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Transform.js","../../math/Vector":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\math\\Vector.js","../integrators/SymplecticEuler":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\physics\\integrators\\SymplecticEuler.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\physics\\forces\\Force.js":[function(require,module,exports){
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
},{"../../core/EventHandler":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\EventHandler.js","../../math/Vector":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\math\\Vector.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\physics\\forces\\Spring.js":[function(require,module,exports){
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
},{"../../math/Vector":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\math\\Vector.js","./Force":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\physics\\forces\\Force.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\physics\\integrators\\SymplecticEuler.js":[function(require,module,exports){
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
},{}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\surfaces\\ImageSurface.js":[function(require,module,exports){
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
},{"../core/Surface":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Surface.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\transitions\\Easing.js":[function(require,module,exports){
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
},{}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\transitions\\MultipleTransition.js":[function(require,module,exports){
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
},{"../utilities/Utility":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\utilities\\Utility.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\transitions\\SpringTransition.js":[function(require,module,exports){
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
},{"../math/Vector":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\math\\Vector.js","../physics/PhysicsEngine":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\physics\\PhysicsEngine.js","../physics/bodies/Particle":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\physics\\bodies\\Particle.js","../physics/forces/Spring":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\physics\\forces\\Spring.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\transitions\\Transitionable.js":[function(require,module,exports){
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
},{"./MultipleTransition":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\transitions\\MultipleTransition.js","./TweenTransition":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\transitions\\TweenTransition.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\transitions\\TransitionableTransform.js":[function(require,module,exports){
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
},{"../core/Transform":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Transform.js","../utilities/Utility":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\utilities\\Utility.js","./Transitionable":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\transitions\\Transitionable.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\transitions\\TweenTransition.js":[function(require,module,exports){
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
},{}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\utilities\\Utility.js":[function(require,module,exports){
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
},{}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\views\\GridLayout.js":[function(require,module,exports){
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
},{"../core/Entity":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Entity.js","../core/EventHandler":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\EventHandler.js","../core/Modifier":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Modifier.js","../core/OptionsManager":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\OptionsManager.js","../core/RenderNode":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\RenderNode.js","../core/Transform":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Transform.js","../core/ViewSequence":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\ViewSequence.js","../transitions/Transitionable":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\transitions\\Transitionable.js","../transitions/TransitionableTransform":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\transitions\\TransitionableTransform.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\src\\AdGenerator.js":[function(require,module,exports){
// Import additional modules to be used in this view 
var View = require('famous/src/core/View');
var Surface = require('famous/src/core/Surface');
var Transform = require('famous/src/core/Transform');
var Modifier   = require('famous/src/core/Modifier');
var ImageSurface = require('famous/src/surfaces/ImageSurface');
var Easing = require('famous/src/transitions/Easing');

var StateModifier = require('famous/src/modifiers/StateModifier');
var GridLayout = require('famous/src/views/GridLayout');
var Transitionable = require('famous/src/transitions/Transitionable')
var Transform = require('famous/src/core/Transform');
var SpringTransition = require('famous/src/transitions/SpringTransition');

// Modeling JSON object of input
var data = {
    logo: 'images/Coca-Cola.png',
    initialPosition: {x: 0, y: 0, z: 0},
    initialVelocity: {x: 0, y: 0, z: 0},
    initialRotation: {x: 0, y: 0, z: 0},
    opacity: 1,
    enter: {
        type: rotateInOut,
        position: {x: 0, y: 0, z: 0},
        velocity: {x: 0, y: 0, z: 0},
        rotatation: {x: 0, y: 0, z: 0},
        period: 1000,
        dampingRatio: 0,
        restitution: 0,
        opacity: 1,
        duration: 1000,
        curve: Easing.inOutBack
    },
    exit: {
        type: rotateInOut,
        position: {x: 0, y: 0, z: 0},
        velocity: {x: 0, y: 0, z: 0},
        rotatation: {x: 0, y: 0, z: 0},
        period: 1000,
        dampingRatio: 0,
        restitution: 0,
        opacity: 1,
        duration: 1000,
        curve: Easing.inOutBack
    }
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

// 
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

// Creates a modifier for startin the starting
// position
function getModifier() {
    var modifier = new Modifier({
        // size: [undefined,undefined],
        // origin: [0.5,0.5],
        // align:[.5,0],
        transform: Transform.rotate(1,0,0)
    });

    return modifier;
}

// Calls a function which returns a modifier
// depending on the transition type
function enterTransition() {
    // return data.type(data.enter);
}

// Calls a function which returns a modifier
// depending on the transition type
function exitTransition() {
    // return data.type(data.exit);
}

/* TRANSITIONS */
function rotateInOut(data) {
    var rotate = new Modifier;
    rotate.setTransform(
        Transform.translate(data.position.x, data.position.y, data.position.z),
        {duration: data.duration, curve: data.curve}
    )

    return rotate;
}

function springInOut(data) {

}

function slideInOut(data) {
    var slide = new Modifier;
    slide.setTransform(
        Transform.translate(data.position.x, data.position.y, data.position.z),
        {duration: data.duration, curve: data.curve}
    )

    return slide;
}

function wallInOut(data) {

}

module.exports = AdGenerator;
},{"famous/src/core/Modifier":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Modifier.js","famous/src/core/Surface":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Surface.js","famous/src/core/Transform":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Transform.js","famous/src/core/View":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\View.js","famous/src/modifiers/StateModifier":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\modifiers\\StateModifier.js","famous/src/surfaces/ImageSurface":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\surfaces\\ImageSurface.js","famous/src/transitions/Easing":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\transitions\\Easing.js","famous/src/transitions/SpringTransition":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\transitions\\SpringTransition.js","famous/src/transitions/Transitionable":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\transitions\\Transitionable.js","famous/src/views/GridLayout":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\views\\GridLayout.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\src\\drag.js":[function(require,module,exports){
// Import additional modules to be used in this view 
var Transform = require('famous/src/core/Transform');
var Modifier = require('famous/src/core/Modifier');

var MouseSync     = require('famous/src/inputs/MouseSync');
var TouchSync     = require('famous/src/inputs/TouchSync');
var ScrollSync    = require('famous/src/inputs/ScrollSync');
var GenericSync   = require('famous/src/inputs/GenericSync');

var Transitionable = require('famous/src/transitions/Transitionable');

// Register sync inputs
GenericSync.register({
    'mouse': MouseSync,
    'touch': TouchSync,
    'scroll': ScrollSync
})

// Create a transitionable for position
var position = new Transitionable([0, 0]);

// Set sync variable for generic sync methods
var sync = new GenericSync({
    'mouse': {},
    'touch': {},
    'scroll': {scale : .5}
});
function drag(surface) {
    // Links sync to our surface parameter
    surface.pipe(sync);

    // Updates position of transitionable
    sync.on('update', function(data){
        var currentPosition = position.get();
        console.log(currentPosition)
        position.set([
            currentPosition[0] + data.delta[0],
            currentPosition[1]
        ]);
    });

    // on dragging to right, like page and open link, else not like and close ad
    surface.on('mouseup', function(){
        var currentPosition = position.get();
        if (currentPosition[0] > 80) {
            console.log('liked');
            surface.setProperties({visibility: 'hidden'})
        } else if (currentPosition[0] < (-80)) {
            console.log('disliked')
        }else{
            position.set([0,0], {curve : 'easeOutBounce', duration : 300});
            console.log('here')
        }
    })
    // on touch drag right like, left dislike
    surface.on('touchend', function(){
        if (currentPosition[0] > 80) {
            console.log('liked');
            surface.setProperties({visibility: 'hidden'})
        } else if (currentPosition[0] < (-80)) {
            console.log('disliked');
        }else{
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
    return {surface: surface, positionModifier: positionModifier};
}

module.exports = drag;
},{"famous/src/core/Modifier":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Modifier.js","famous/src/core/Transform":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Transform.js","famous/src/inputs/GenericSync":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\inputs\\GenericSync.js","famous/src/inputs/MouseSync":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\inputs\\MouseSync.js","famous/src/inputs/ScrollSync":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\inputs\\ScrollSync.js","famous/src/inputs/TouchSync":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\inputs\\TouchSync.js","famous/src/transitions/Transitionable":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\transitions\\Transitionable.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\src\\index.js":[function(require,module,exports){
//load scrolls
require('./scroll.js');
// Load css
require('./styles');
// Load polyfills
require('famous-polyfills');
// Load AdGenerator
var AdGenerator = require('./AdGenerator');
// Load drag
var drag = require('./drag');
// Load scroll
var scrolled = require('./scrolling')

// Import Dependencies
var Engine = require('famous/src/core/Engine');
var Surface = require('famous/src/core/Surface');
var Transform = require('famous/src/core/Transform');

// Create container and set to main context
var el = document.getElementById('famous-container');
Engine.setOptions({ appMode: false });
var container = Engine.createContext(el);

createContainer();

// Fill container with a layout and content from the AdGenerator
function createContainer() {
	var adObject = AdGenerator();
  var scrollObject = scrolled;
	var dragObject = drag(adObject.logo);

	container
	    
		.add(adObject.modifier)
		.add(dragObject.positionModifier)
    .add(scrollObject.rotationModifier)
    .add(dragObject.surface)
}

},{"./AdGenerator":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\src\\AdGenerator.js","./drag":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\src\\drag.js","./scroll.js":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\src\\scroll.js","./scrolling":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\src\\scrolling.js","./styles":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\src\\styles\\index.js","famous-polyfills":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous-polyfills\\index.js","famous/src/core/Engine":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Engine.js","famous/src/core/Surface":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Surface.js","famous/src/core/Transform":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Transform.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\src\\scroll.js":[function(require,module,exports){
var EventHandler = require('famous/src/core/EventHandler');
var Transform = require('famous/src/core/Transform');
var windowScrollEvents = {}

//set up event handlers ** short names more readable in conditionals below **
var scrollEvents = new EventHandler();

//set handlers to main exported object
windowScrollEvents.scrollEvents = scrollEvents;

//switches so event handlers are only called once on scroll
windowScrollEvents.called = false;
windowScrollEvents.hitEnd = false;

//target elements and duration in pixels;
var elementIdStart = 'hello';
var elementIdEnd = 'end';
var padding = 100;
//var duration = 1000;

console.log('this is working')

//native scroll main function
window.onscroll = scrollHandler;
window.addEventListener("touchmove", scrollHandler, true);
window.addEventListener("gesturechange", scrollHandler, false)

function scrollHandler(){

//position variables
var targetPosition = document.getElementById(elementIdStart).offsetTop;
var targetEndPosition = document.getElementById(elementIdEnd).offsetTop; 
var windowTopPosition = window.pageYOffset;

//emits window position  
 scrollEvents.emit('positionYChange', {position: windowTopPosition});
 
 //check to see if you are at the target element
 if(!windowScrollEvents.called && (windowTopPosition + padding) > targetPosition){
  windowScrollEvents.called = true;
  
  //emit event when target position is reached
  scrollEvents.emit('targetreached', {target:targetPosition, padding:padding });

 } 

 //if you are not yet at the target element, windowScrollEvents.called is false
 if((windowTopPosition + padding) < targetPosition){
  
  windowScrollEvents.called = false;
  windowScrollEvents.hitEnd = false;
  
  //emit event when target not reached 
  scrollEvents.emit('targetnotreached');
  
 }

 //if you reach the 'targetEndPosition' element alert and only call once
 if(!windowScrollEvents.hitEnd && (windowTopPosition > targetEndPosition)) {
  windowScrollEvents.hitEnd = true;
  
 //emit event when target end is reached 
  scrollEvents.emit('targetendreached');

 }

 //if you reach X duration pixels below target element alert abd only call once
 // if(!windowScrollEvents.hitEnd && windowTopPosition > (targetPosition+duration)){
 //  windowScrollEvents.hitEnd = true;
 // }


}


module.exports = windowScrollEvents
},{"famous/src/core/EventHandler":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\EventHandler.js","famous/src/core/Transform":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Transform.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\src\\scrolling.js":[function(require,module,exports){
var Transform = require('famous/src/core/Transform');
var Modifier = require('famous/src/core/Modifier');
var Scroll = require('./scroll.js');

var EventHandler = require('famous/src/core/EventHandler');

//listen to scroll events
var scrollEventsListener = new EventHandler();

//subscribe to scroll events
scrollEventsListener.subscribe(Scroll.scrollEvents);


//initial state
var initPosX = Math.PI, 
initPosY = 0,
initPosZ = 0.1,
distance = 100;

var rotationModifier = new Modifier({
    transform: Transform.rotate(initPosX,initPosY,initPosZ)
}); 



//transform to state
var endPosX=Math.PI/2;
var location=0;

 

scrollEventsListener.on('targetreached', function(element){
   
  scrollEventsListener.on('positionYChange', function(y){ 
      var position = element.target - element.padding;      
      var track = y.position

    rotatePosX = initPosX + ((track - position)/distance);
    if(rotatePosX <= 5.54 && rotatePosX > Math.PI){
       rotationModifier.setTransform(Transform.rotate(rotatePosX,0,0))  
    }
       console.log(rotatePosX, 'distance', track, position, distance)
    
  });
});

scrollEventsListener.on('targetnotreached', function(){
 if(Scroll.called){
  Scroll.called = false;
  rotationModifier.setTransform(Transform.rotate(initPosX,initPosY,initPosZ))  
 }
});

scrollEventsListener.on('targetendreached', function(){
  console.log("target ends reached!")
  if(Scroll.called) {
    Scroll.called = false;
    rotationModifier.setTransform(Transform.rotate(initPosX,initPosY,initPosZ))  
  }
 
});

scrollEventsListener.on('positionYChange', function(y){
 
});


module.exports = {rotationModifier: rotationModifier};
},{"./scroll.js":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\src\\scroll.js","famous/src/core/EventHandler":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\EventHandler.js","famous/src/core/Modifier":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Modifier.js","famous/src/core/Transform":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\Transform.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\src\\styles\\app.css":[function(require,module,exports){
var css = "html {\n  background: #fff;\n  -webkit-overflow-scrolling: none;\n}\n\n.backfaceVisibility {\n  -webkit-backface-visibility: visible;\n  backface-visibility: visible;\n}\n"; (require("c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\cssify"))(css); module.exports = css;
},{"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\cssify":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\cssify\\browser.js"}],"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\src\\styles\\index.js":[function(require,module,exports){
// load css
require('famous/src/core/famous.css');
require('./app.css');

},{"./app.css":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\src\\styles\\app.css","famous/src/core/famous.css":"c:\\Users\\Morgan\\desktop\\newproject\\adfame\\node_modules\\famous\\src\\core\\famous.css"}]},{},["c:\\Users\\Morgan\\desktop\\newproject\\adfame\\src\\index.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwibm9kZV9tb2R1bGVzXFxjc3NpZnlcXGJyb3dzZXIuanMiLCJub2RlX21vZHVsZXNcXGZhbW91cy1wb2x5ZmlsbHNcXGNsYXNzTGlzdC5qcyIsIm5vZGVfbW9kdWxlc1xcZmFtb3VzLXBvbHlmaWxsc1xcZnVuY3Rpb25Qcm90b3R5cGVCaW5kLmpzIiwibm9kZV9tb2R1bGVzXFxmYW1vdXMtcG9seWZpbGxzXFxpbmRleC5qcyIsIm5vZGVfbW9kdWxlc1xcZmFtb3VzLXBvbHlmaWxsc1xccmVxdWVzdEFuaW1hdGlvbkZyYW1lLmpzIiwibm9kZV9tb2R1bGVzXFxmYW1vdXNcXHNyY1xcY29yZVxcQ29udGV4dC5qcyIsIm5vZGVfbW9kdWxlc1xcZmFtb3VzXFxzcmNcXGNvcmVcXEVsZW1lbnRBbGxvY2F0b3IuanMiLCJub2RlX21vZHVsZXNcXGZhbW91c1xcc3JjXFxjb3JlXFxFbGVtZW50T3V0cHV0LmpzIiwibm9kZV9tb2R1bGVzXFxmYW1vdXNcXHNyY1xcY29yZVxcRW5naW5lLmpzIiwibm9kZV9tb2R1bGVzXFxmYW1vdXNcXHNyY1xcY29yZVxcRW50aXR5LmpzIiwibm9kZV9tb2R1bGVzXFxmYW1vdXNcXHNyY1xcY29yZVxcRXZlbnRFbWl0dGVyLmpzIiwibm9kZV9tb2R1bGVzXFxmYW1vdXNcXHNyY1xcY29yZVxcRXZlbnRIYW5kbGVyLmpzIiwibm9kZV9tb2R1bGVzXFxmYW1vdXNcXHNyY1xcY29yZVxcTW9kaWZpZXIuanMiLCJub2RlX21vZHVsZXNcXGZhbW91c1xcc3JjXFxjb3JlXFxPcHRpb25zTWFuYWdlci5qcyIsIm5vZGVfbW9kdWxlc1xcZmFtb3VzXFxzcmNcXGNvcmVcXFJlbmRlck5vZGUuanMiLCJub2RlX21vZHVsZXNcXGZhbW91c1xcc3JjXFxjb3JlXFxTcGVjUGFyc2VyLmpzIiwibm9kZV9tb2R1bGVzXFxmYW1vdXNcXHNyY1xcY29yZVxcU3VyZmFjZS5qcyIsIm5vZGVfbW9kdWxlc1xcZmFtb3VzXFxzcmNcXGNvcmVcXFRyYW5zZm9ybS5qcyIsIm5vZGVfbW9kdWxlc1xcZmFtb3VzXFxzcmNcXGNvcmVcXFZpZXcuanMiLCJub2RlX21vZHVsZXNcXGZhbW91c1xcc3JjXFxjb3JlXFxWaWV3U2VxdWVuY2UuanMiLCJub2RlX21vZHVsZXNcXGZhbW91c1xcc3JjXFxjb3JlXFxmYW1vdXMuY3NzIiwibm9kZV9tb2R1bGVzXFxmYW1vdXNcXHNyY1xcaW5wdXRzXFxHZW5lcmljU3luYy5qcyIsIm5vZGVfbW9kdWxlc1xcZmFtb3VzXFxzcmNcXGlucHV0c1xcTW91c2VTeW5jLmpzIiwibm9kZV9tb2R1bGVzXFxmYW1vdXNcXHNyY1xcaW5wdXRzXFxTY3JvbGxTeW5jLmpzIiwibm9kZV9tb2R1bGVzXFxmYW1vdXNcXHNyY1xcaW5wdXRzXFxUb3VjaFN5bmMuanMiLCJub2RlX21vZHVsZXNcXGZhbW91c1xcc3JjXFxpbnB1dHNcXFRvdWNoVHJhY2tlci5qcyIsIm5vZGVfbW9kdWxlc1xcZmFtb3VzXFxzcmNcXG1hdGhcXFZlY3Rvci5qcyIsIm5vZGVfbW9kdWxlc1xcZmFtb3VzXFxzcmNcXG1vZGlmaWVyc1xcU3RhdGVNb2RpZmllci5qcyIsIm5vZGVfbW9kdWxlc1xcZmFtb3VzXFxzcmNcXHBoeXNpY3NcXFBoeXNpY3NFbmdpbmUuanMiLCJub2RlX21vZHVsZXNcXGZhbW91c1xcc3JjXFxwaHlzaWNzXFxib2RpZXNcXFBhcnRpY2xlLmpzIiwibm9kZV9tb2R1bGVzXFxmYW1vdXNcXHNyY1xccGh5c2ljc1xcZm9yY2VzXFxGb3JjZS5qcyIsIm5vZGVfbW9kdWxlc1xcZmFtb3VzXFxzcmNcXHBoeXNpY3NcXGZvcmNlc1xcU3ByaW5nLmpzIiwibm9kZV9tb2R1bGVzXFxmYW1vdXNcXHNyY1xccGh5c2ljc1xcaW50ZWdyYXRvcnNcXFN5bXBsZWN0aWNFdWxlci5qcyIsIm5vZGVfbW9kdWxlc1xcZmFtb3VzXFxzcmNcXHN1cmZhY2VzXFxJbWFnZVN1cmZhY2UuanMiLCJub2RlX21vZHVsZXNcXGZhbW91c1xcc3JjXFx0cmFuc2l0aW9uc1xcRWFzaW5nLmpzIiwibm9kZV9tb2R1bGVzXFxmYW1vdXNcXHNyY1xcdHJhbnNpdGlvbnNcXE11bHRpcGxlVHJhbnNpdGlvbi5qcyIsIm5vZGVfbW9kdWxlc1xcZmFtb3VzXFxzcmNcXHRyYW5zaXRpb25zXFxTcHJpbmdUcmFuc2l0aW9uLmpzIiwibm9kZV9tb2R1bGVzXFxmYW1vdXNcXHNyY1xcdHJhbnNpdGlvbnNcXFRyYW5zaXRpb25hYmxlLmpzIiwibm9kZV9tb2R1bGVzXFxmYW1vdXNcXHNyY1xcdHJhbnNpdGlvbnNcXFRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLmpzIiwibm9kZV9tb2R1bGVzXFxmYW1vdXNcXHNyY1xcdHJhbnNpdGlvbnNcXFR3ZWVuVHJhbnNpdGlvbi5qcyIsIm5vZGVfbW9kdWxlc1xcZmFtb3VzXFxzcmNcXHV0aWxpdGllc1xcVXRpbGl0eS5qcyIsIm5vZGVfbW9kdWxlc1xcZmFtb3VzXFxzcmNcXHZpZXdzXFxHcmlkTGF5b3V0LmpzIiwic3JjXFxBZEdlbmVyYXRvci5qcyIsInNyY1xcZHJhZy5qcyIsInNyY1xcaW5kZXguanMiLCJzcmNcXHNjcm9sbC5qcyIsInNyY1xcc2Nyb2xsaW5nLmpzIiwic3JjXFxzdHlsZXNcXGFwcC5jc3MiLCJzcmNcXHN0eWxlc1xcaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeHJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hQQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbk1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MsIGN1c3RvbURvY3VtZW50KSB7XG4gIHZhciBkb2MgPSBjdXN0b21Eb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgaWYgKGRvYy5jcmVhdGVTdHlsZVNoZWV0KSB7XG4gICAgdmFyIHNoZWV0ID0gZG9jLmNyZWF0ZVN0eWxlU2hlZXQoKVxuICAgIHNoZWV0LmNzc1RleHQgPSBjc3M7XG4gICAgcmV0dXJuIHNoZWV0Lm93bmVyTm9kZTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgaGVhZCA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLFxuICAgICAgICBzdHlsZSA9IGRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gICAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG5cbiAgICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2MuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gICAgfVxuXG4gICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgcmV0dXJuIHN0eWxlO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5ieVVybCA9IGZ1bmN0aW9uKHVybCkge1xuICBpZiAoZG9jdW1lbnQuY3JlYXRlU3R5bGVTaGVldCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVTdHlsZVNoZWV0KHVybCkub3duZXJOb2RlO1xuICB9IGVsc2Uge1xuICAgIHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSxcbiAgICAgICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgIGxpbmsuaHJlZiA9IHVybDtcblxuICAgIGhlYWQuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgcmV0dXJuIGxpbms7XG4gIH1cbn07XG4iLCJcbi8qXG4gKiBjbGFzc0xpc3QuanM6IENyb3NzLWJyb3dzZXIgZnVsbCBlbGVtZW50LmNsYXNzTGlzdCBpbXBsZW1lbnRhdGlvbi5cbiAqIDIwMTEtMDYtMTVcbiAqXG4gKiBCeSBFbGkgR3JleSwgaHR0cDovL2VsaWdyZXkuY29tXG4gKiBQdWJsaWMgRG9tYWluLlxuICogTk8gV0FSUkFOVFkgRVhQUkVTU0VEIE9SIElNUExJRUQuIFVTRSBBVCBZT1VSIE9XTiBSSVNLLlxuICovXG5cbi8qZ2xvYmFsIHNlbGYsIGRvY3VtZW50LCBET01FeGNlcHRpb24gKi9cblxuLyohIEBzb3VyY2UgaHR0cDovL3B1cmwuZWxpZ3JleS5jb20vZ2l0aHViL2NsYXNzTGlzdC5qcy9ibG9iL21hc3Rlci9jbGFzc0xpc3QuanMqL1xuXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmICEoXCJjbGFzc0xpc3RcIiBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKSkpIHtcblxuKGZ1bmN0aW9uICh2aWV3KSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXJcbiAgICAgIGNsYXNzTGlzdFByb3AgPSBcImNsYXNzTGlzdFwiXG4gICAgLCBwcm90b1Byb3AgPSBcInByb3RvdHlwZVwiXG4gICAgLCBlbGVtQ3RyUHJvdG8gPSAodmlldy5IVE1MRWxlbWVudCB8fCB2aWV3LkVsZW1lbnQpW3Byb3RvUHJvcF1cbiAgICAsIG9iakN0ciA9IE9iamVjdFxuICAgICwgc3RyVHJpbSA9IFN0cmluZ1twcm90b1Byb3BdLnRyaW0gfHwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcbiAgICB9XG4gICAgLCBhcnJJbmRleE9mID0gQXJyYXlbcHJvdG9Qcm9wXS5pbmRleE9mIHx8IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgICAgICBpID0gMFxuICAgICAgICAgICAgLCBsZW4gPSB0aGlzLmxlbmd0aFxuICAgICAgICA7XG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpIGluIHRoaXMgJiYgdGhpc1tpXSA9PT0gaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgLy8gVmVuZG9yczogcGxlYXNlIGFsbG93IGNvbnRlbnQgY29kZSB0byBpbnN0YW50aWF0ZSBET01FeGNlcHRpb25zXG4gICAgLCBET01FeCA9IGZ1bmN0aW9uICh0eXBlLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuY29kZSA9IERPTUV4Y2VwdGlvblt0eXBlXTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB9XG4gICAgLCBjaGVja1Rva2VuQW5kR2V0SW5kZXggPSBmdW5jdGlvbiAoY2xhc3NMaXN0LCB0b2tlbikge1xuICAgICAgICBpZiAodG9rZW4gPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBET01FeChcbiAgICAgICAgICAgICAgICAgIFwiU1lOVEFYX0VSUlwiXG4gICAgICAgICAgICAgICAgLCBcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZFwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmICgvXFxzLy50ZXN0KHRva2VuKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IERPTUV4KFxuICAgICAgICAgICAgICAgICAgXCJJTlZBTElEX0NIQVJBQ1RFUl9FUlJcIlxuICAgICAgICAgICAgICAgICwgXCJTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXJcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJySW5kZXhPZi5jYWxsKGNsYXNzTGlzdCwgdG9rZW4pO1xuICAgIH1cbiAgICAsIENsYXNzTGlzdCA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgICAgICB0cmltbWVkQ2xhc3NlcyA9IHN0clRyaW0uY2FsbChlbGVtLmNsYXNzTmFtZSlcbiAgICAgICAgICAgICwgY2xhc3NlcyA9IHRyaW1tZWRDbGFzc2VzID8gdHJpbW1lZENsYXNzZXMuc3BsaXQoL1xccysvKSA6IFtdXG4gICAgICAgICAgICAsIGkgPSAwXG4gICAgICAgICAgICAsIGxlbiA9IGNsYXNzZXMubGVuZ3RoXG4gICAgICAgIDtcbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdGhpcy5wdXNoKGNsYXNzZXNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGVsZW0uY2xhc3NOYW1lID0gdGhpcy50b1N0cmluZygpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAsIGNsYXNzTGlzdFByb3RvID0gQ2xhc3NMaXN0W3Byb3RvUHJvcF0gPSBbXVxuICAgICwgY2xhc3NMaXN0R2V0dGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IENsYXNzTGlzdCh0aGlzKTtcbiAgICB9XG47XG4vLyBNb3N0IERPTUV4Y2VwdGlvbiBpbXBsZW1lbnRhdGlvbnMgZG9uJ3QgYWxsb3cgY2FsbGluZyBET01FeGNlcHRpb24ncyB0b1N0cmluZygpXG4vLyBvbiBub24tRE9NRXhjZXB0aW9ucy4gRXJyb3IncyB0b1N0cmluZygpIGlzIHN1ZmZpY2llbnQgaGVyZS5cbkRPTUV4W3Byb3RvUHJvcF0gPSBFcnJvcltwcm90b1Byb3BdO1xuY2xhc3NMaXN0UHJvdG8uaXRlbSA9IGZ1bmN0aW9uIChpKSB7XG4gICAgcmV0dXJuIHRoaXNbaV0gfHwgbnVsbDtcbn07XG5jbGFzc0xpc3RQcm90by5jb250YWlucyA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHRva2VuICs9IFwiXCI7XG4gICAgcmV0dXJuIGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbikgIT09IC0xO1xufTtcbmNsYXNzTGlzdFByb3RvLmFkZCA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHRva2VuICs9IFwiXCI7XG4gICAgaWYgKGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbikgPT09IC0xKSB7XG4gICAgICAgIHRoaXMucHVzaCh0b2tlbik7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSgpO1xuICAgIH1cbn07XG5jbGFzc0xpc3RQcm90by5yZW1vdmUgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0b2tlbiArPSBcIlwiO1xuICAgIHZhciBpbmRleCA9IGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbik7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSgpO1xuICAgIH1cbn07XG5jbGFzc0xpc3RQcm90by50b2dnbGUgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0b2tlbiArPSBcIlwiO1xuICAgIGlmIChjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pID09PSAtMSkge1xuICAgICAgICB0aGlzLmFkZCh0b2tlbik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW1vdmUodG9rZW4pO1xuICAgIH1cbn07XG5jbGFzc0xpc3RQcm90by50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5qb2luKFwiIFwiKTtcbn07XG5cbmlmIChvYmpDdHIuZGVmaW5lUHJvcGVydHkpIHtcbiAgICB2YXIgY2xhc3NMaXN0UHJvcERlc2MgPSB7XG4gICAgICAgICAgZ2V0OiBjbGFzc0xpc3RHZXR0ZXJcbiAgICAgICAgLCBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgICwgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfTtcbiAgICB0cnkge1xuICAgICAgICBvYmpDdHIuZGVmaW5lUHJvcGVydHkoZWxlbUN0clByb3RvLCBjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RQcm9wRGVzYyk7XG4gICAgfSBjYXRjaCAoZXgpIHsgLy8gSUUgOCBkb2Vzbid0IHN1cHBvcnQgZW51bWVyYWJsZTp0cnVlXG4gICAgICAgIGlmIChleC5udW1iZXIgPT09IC0weDdGRjVFQzU0KSB7XG4gICAgICAgICAgICBjbGFzc0xpc3RQcm9wRGVzYy5lbnVtZXJhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBvYmpDdHIuZGVmaW5lUHJvcGVydHkoZWxlbUN0clByb3RvLCBjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RQcm9wRGVzYyk7XG4gICAgICAgIH1cbiAgICB9XG59IGVsc2UgaWYgKG9iakN0cltwcm90b1Byb3BdLl9fZGVmaW5lR2V0dGVyX18pIHtcbiAgICBlbGVtQ3RyUHJvdG8uX19kZWZpbmVHZXR0ZXJfXyhjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RHZXR0ZXIpO1xufVxuXG59KHNlbGYpKTtcblxufVxuIiwiaWYgKCFGdW5jdGlvbi5wcm90b3R5cGUuYmluZCkge1xuICAgIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKG9UaGlzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcyAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAvLyBjbG9zZXN0IHRoaW5nIHBvc3NpYmxlIHRvIHRoZSBFQ01BU2NyaXB0IDUgaW50ZXJuYWwgSXNDYWxsYWJsZSBmdW5jdGlvblxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kIC0gd2hhdCBpcyB0cnlpbmcgdG8gYmUgYm91bmQgaXMgbm90IGNhbGxhYmxlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgZlRvQmluZCA9IHRoaXMsXG4gICAgICAgIGZOT1AgPSBmdW5jdGlvbiAoKSB7fSxcbiAgICAgICAgZkJvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZUb0JpbmQuYXBwbHkodGhpcyBpbnN0YW5jZW9mIGZOT1AgJiYgb1RoaXNcbiAgICAgICAgICAgICAgICA/IHRoaXNcbiAgICAgICAgICAgICAgICA6IG9UaGlzLFxuICAgICAgICAgICAgICAgIGFBcmdzLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZk5PUC5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcbiAgICAgICAgZkJvdW5kLnByb3RvdHlwZSA9IG5ldyBmTk9QKCk7XG5cbiAgICAgICAgcmV0dXJuIGZCb3VuZDtcbiAgICB9O1xufVxuIiwicmVxdWlyZSgnLi9jbGFzc0xpc3QuanMnKTtcbnJlcXVpcmUoJy4vZnVuY3Rpb25Qcm90b3R5cGVCaW5kLmpzJyk7XG5yZXF1aXJlKCcuL3JlcXVlc3RBbmltYXRpb25GcmFtZS5qcycpOyIsIi8vIGFkZHMgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGZ1bmN0aW9uYWxpdHlcbi8vIFNvdXJjZTogaHR0cDovL3N0cmQ2LmNvbS8yMDExLzA1L2JldHRlci13aW5kb3ctcmVxdWVzdGFuaW1hdGlvbmZyYW1lLXNoaW0vXG5cbndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPVxuICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG4gIGZ1bmN0aW9uKGNhbGxiYWNrLCBlbGVtZW50KSB7XG4gICAgcmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgY2FsbGJhY2soK25ldyBEYXRlKCkpO1xuICB9LCAxMDAwIC8gNjApO1xufSk7XG4iLCJ2YXIgUmVuZGVyTm9kZSA9IHJlcXVpcmUoJy4vUmVuZGVyTm9kZScpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4vRXZlbnRIYW5kbGVyJyk7XG52YXIgRWxlbWVudEFsbG9jYXRvciA9IHJlcXVpcmUoJy4vRWxlbWVudEFsbG9jYXRvcicpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJy4vVHJhbnNmb3JtJyk7XG52YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCcuLi90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZScpO1xudmFyIF96ZXJvWmVybyA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF07XG52YXIgdXNlUHJlZml4ID0gISgncGVyc3BlY3RpdmUnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSk7XG5mdW5jdGlvbiBfZ2V0RWxlbWVudFNpemUoZWxlbWVudCkge1xuICAgIHJldHVybiBbXG4gICAgICAgIGVsZW1lbnQuY2xpZW50V2lkdGgsXG4gICAgICAgIGVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gICAgXTtcbn1cbnZhciBfc2V0UGVyc3BlY3RpdmUgPSB1c2VQcmVmaXggPyBmdW5jdGlvbiAoZWxlbWVudCwgcGVyc3BlY3RpdmUpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9IHBlcnNwZWN0aXZlID8gcGVyc3BlY3RpdmUudG9GaXhlZCgpICsgJ3B4JyA6ICcnO1xuICAgIH0gOiBmdW5jdGlvbiAoZWxlbWVudCwgcGVyc3BlY3RpdmUpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5wZXJzcGVjdGl2ZSA9IHBlcnNwZWN0aXZlID8gcGVyc3BlY3RpdmUudG9GaXhlZCgpICsgJ3B4JyA6ICcnO1xuICAgIH07XG5mdW5jdGlvbiBDb250ZXh0KGNvbnRhaW5lcikge1xuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHRoaXMuX2FsbG9jYXRvciA9IG5ldyBFbGVtZW50QWxsb2NhdG9yKGNvbnRhaW5lcik7XG4gICAgdGhpcy5fbm9kZSA9IG5ldyBSZW5kZXJOb2RlKCk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fc2l6ZSA9IF9nZXRFbGVtZW50U2l6ZSh0aGlzLmNvbnRhaW5lcik7XG4gICAgdGhpcy5fcGVyc3BlY3RpdmVTdGF0ZSA9IG5ldyBUcmFuc2l0aW9uYWJsZSgwKTtcbiAgICB0aGlzLl9wZXJzcGVjdGl2ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9ub2RlQ29udGV4dCA9IHtcbiAgICAgICAgYWxsb2NhdG9yOiB0aGlzLl9hbGxvY2F0b3IsXG4gICAgICAgIHRyYW5zZm9ybTogVHJhbnNmb3JtLmlkZW50aXR5LFxuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBvcmlnaW46IF96ZXJvWmVybyxcbiAgICAgICAgYWxpZ246IF96ZXJvWmVybyxcbiAgICAgICAgc2l6ZTogdGhpcy5fc2l6ZVxuICAgIH07XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zZXRTaXplKF9nZXRFbGVtZW50U2l6ZSh0aGlzLmNvbnRhaW5lcikpO1xuICAgIH0uYmluZCh0aGlzKSk7XG59XG5Db250ZXh0LnByb3RvdHlwZS5nZXRBbGxvY2F0b3IgPSBmdW5jdGlvbiBnZXRBbGxvY2F0b3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FsbG9jYXRvcjtcbn07XG5Db250ZXh0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQob2JqKSB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGUuYWRkKG9iaik7XG59O1xuQ29udGV4dC5wcm90b3R5cGUubWlncmF0ZSA9IGZ1bmN0aW9uIG1pZ3JhdGUoY29udGFpbmVyKSB7XG4gICAgaWYgKGNvbnRhaW5lciA9PT0gdGhpcy5jb250YWluZXIpXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICB0aGlzLl9hbGxvY2F0b3IubWlncmF0ZShjb250YWluZXIpO1xufTtcbkNvbnRleHQucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xufTtcbkNvbnRleHQucHJvdG90eXBlLnNldFNpemUgPSBmdW5jdGlvbiBzZXRTaXplKHNpemUpIHtcbiAgICBpZiAoIXNpemUpXG4gICAgICAgIHNpemUgPSBfZ2V0RWxlbWVudFNpemUodGhpcy5jb250YWluZXIpO1xuICAgIHRoaXMuX3NpemVbMF0gPSBzaXplWzBdO1xuICAgIHRoaXMuX3NpemVbMV0gPSBzaXplWzFdO1xufTtcbkNvbnRleHQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZShjb250ZXh0UGFyYW1ldGVycykge1xuICAgIGlmIChjb250ZXh0UGFyYW1ldGVycykge1xuICAgICAgICBpZiAoY29udGV4dFBhcmFtZXRlcnMudHJhbnNmb3JtKVxuICAgICAgICAgICAgdGhpcy5fbm9kZUNvbnRleHQudHJhbnNmb3JtID0gY29udGV4dFBhcmFtZXRlcnMudHJhbnNmb3JtO1xuICAgICAgICBpZiAoY29udGV4dFBhcmFtZXRlcnMub3BhY2l0eSlcbiAgICAgICAgICAgIHRoaXMuX25vZGVDb250ZXh0Lm9wYWNpdHkgPSBjb250ZXh0UGFyYW1ldGVycy5vcGFjaXR5O1xuICAgICAgICBpZiAoY29udGV4dFBhcmFtZXRlcnMub3JpZ2luKVxuICAgICAgICAgICAgdGhpcy5fbm9kZUNvbnRleHQub3JpZ2luID0gY29udGV4dFBhcmFtZXRlcnMub3JpZ2luO1xuICAgICAgICBpZiAoY29udGV4dFBhcmFtZXRlcnMuYWxpZ24pXG4gICAgICAgICAgICB0aGlzLl9ub2RlQ29udGV4dC5hbGlnbiA9IGNvbnRleHRQYXJhbWV0ZXJzLmFsaWduO1xuICAgICAgICBpZiAoY29udGV4dFBhcmFtZXRlcnMuc2l6ZSlcbiAgICAgICAgICAgIHRoaXMuX25vZGVDb250ZXh0LnNpemUgPSBjb250ZXh0UGFyYW1ldGVycy5zaXplO1xuICAgIH1cbiAgICB2YXIgcGVyc3BlY3RpdmUgPSB0aGlzLl9wZXJzcGVjdGl2ZVN0YXRlLmdldCgpO1xuICAgIGlmIChwZXJzcGVjdGl2ZSAhPT0gdGhpcy5fcGVyc3BlY3RpdmUpIHtcbiAgICAgICAgX3NldFBlcnNwZWN0aXZlKHRoaXMuY29udGFpbmVyLCBwZXJzcGVjdGl2ZSk7XG4gICAgICAgIHRoaXMuX3BlcnNwZWN0aXZlID0gcGVyc3BlY3RpdmU7XG4gICAgfVxuICAgIHRoaXMuX25vZGUuY29tbWl0KHRoaXMuX25vZGVDb250ZXh0KTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS5nZXRQZXJzcGVjdGl2ZSA9IGZ1bmN0aW9uIGdldFBlcnNwZWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLl9wZXJzcGVjdGl2ZVN0YXRlLmdldCgpO1xufTtcbkNvbnRleHQucHJvdG90eXBlLnNldFBlcnNwZWN0aXZlID0gZnVuY3Rpb24gc2V0UGVyc3BlY3RpdmUocGVyc3BlY3RpdmUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BlcnNwZWN0aXZlU3RhdGUuc2V0KHBlcnNwZWN0aXZlLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG59O1xuQ29udGV4dC5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSwgZXZlbnQpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCh0eXBlLCBldmVudCk7XG59O1xuQ29udGV4dC5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbih0eXBlLCBoYW5kbGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50T3V0cHV0Lm9uKHR5cGUsIGhhbmRsZXIpO1xufTtcbkNvbnRleHQucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgaGFuZGxlcikge1xuICAgIHJldHVybiB0aGlzLl9ldmVudE91dHB1dC5yZW1vdmVMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gcGlwZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRPdXRwdXQucGlwZSh0YXJnZXQpO1xufTtcbkNvbnRleHQucHJvdG90eXBlLnVucGlwZSA9IGZ1bmN0aW9uIHVucGlwZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRPdXRwdXQudW5waXBlKHRhcmdldCk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBDb250ZXh0OyIsImZ1bmN0aW9uIEVsZW1lbnRBbGxvY2F0b3IoY29udGFpbmVyKSB7XG4gICAgaWYgKCFjb250YWluZXIpXG4gICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICB0aGlzLmRldGFjaGVkTm9kZXMgPSB7fTtcbiAgICB0aGlzLm5vZGVDb3VudCA9IDA7XG59XG5FbGVtZW50QWxsb2NhdG9yLnByb3RvdHlwZS5taWdyYXRlID0gZnVuY3Rpb24gbWlncmF0ZShjb250YWluZXIpIHtcbiAgICB2YXIgb2xkQ29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgaWYgKGNvbnRhaW5lciA9PT0gb2xkQ29udGFpbmVyKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKG9sZENvbnRhaW5lciBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG9sZENvbnRhaW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgd2hpbGUgKG9sZENvbnRhaW5lci5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChvbGRDb250YWluZXIucmVtb3ZlQ2hpbGQob2xkQ29udGFpbmVyLmZpcnN0Q2hpbGQpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbn07XG5FbGVtZW50QWxsb2NhdG9yLnByb3RvdHlwZS5hbGxvY2F0ZSA9IGZ1bmN0aW9uIGFsbG9jYXRlKHR5cGUpIHtcbiAgICB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICghKHR5cGUgaW4gdGhpcy5kZXRhY2hlZE5vZGVzKSlcbiAgICAgICAgdGhpcy5kZXRhY2hlZE5vZGVzW3R5cGVdID0gW107XG4gICAgdmFyIG5vZGVTdG9yZSA9IHRoaXMuZGV0YWNoZWROb2Rlc1t0eXBlXTtcbiAgICB2YXIgcmVzdWx0O1xuICAgIGlmIChub2RlU3RvcmUubGVuZ3RoID4gMCkge1xuICAgICAgICByZXN1bHQgPSBub2RlU3RvcmUucG9wKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQocmVzdWx0KTtcbiAgICB9XG4gICAgdGhpcy5ub2RlQ291bnQrKztcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbkVsZW1lbnRBbGxvY2F0b3IucHJvdG90eXBlLmRlYWxsb2NhdGUgPSBmdW5jdGlvbiBkZWFsbG9jYXRlKGVsZW1lbnQpIHtcbiAgICB2YXIgbm9kZVR5cGUgPSBlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIG5vZGVTdG9yZSA9IHRoaXMuZGV0YWNoZWROb2Rlc1tub2RlVHlwZV07XG4gICAgbm9kZVN0b3JlLnB1c2goZWxlbWVudCk7XG4gICAgdGhpcy5ub2RlQ291bnQtLTtcbn07XG5FbGVtZW50QWxsb2NhdG9yLnByb3RvdHlwZS5nZXROb2RlQ291bnQgPSBmdW5jdGlvbiBnZXROb2RlQ291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZUNvdW50O1xufTtcbm1vZHVsZS5leHBvcnRzID0gRWxlbWVudEFsbG9jYXRvcjsiLCJ2YXIgRW50aXR5ID0gcmVxdWlyZSgnLi9FbnRpdHknKTtcbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuL0V2ZW50SGFuZGxlcicpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJy4vVHJhbnNmb3JtJyk7XG52YXIgdXNlUHJlZml4ID0gISgndHJhbnNmb3JtJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUpO1xudmFyIGRldmljZVBpeGVsUmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuZnVuY3Rpb24gRWxlbWVudE91dHB1dChlbGVtZW50KSB7XG4gICAgdGhpcy5fbWF0cml4ID0gbnVsbDtcbiAgICB0aGlzLl9vcGFjaXR5ID0gMTtcbiAgICB0aGlzLl9vcmlnaW4gPSBudWxsO1xuICAgIHRoaXMuX3NpemUgPSBudWxsO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmJpbmRUaGlzKHRoaXMpO1xuICAgIHRoaXMuZXZlbnRGb3J3YXJkZXIgPSBmdW5jdGlvbiBldmVudEZvcndhcmRlcihldmVudCkge1xuICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KGV2ZW50LnR5cGUsIGV2ZW50KTtcbiAgICB9LmJpbmQodGhpcyk7XG4gICAgdGhpcy5pZCA9IEVudGl0eS5yZWdpc3Rlcih0aGlzKTtcbiAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLl9zaXplRGlydHkgPSBmYWxzZTtcbiAgICB0aGlzLl9vcmlnaW5EaXJ0eSA9IGZhbHNlO1xuICAgIHRoaXMuX3RyYW5zZm9ybURpcnR5ID0gZmFsc2U7XG4gICAgdGhpcy5faW52aXNpYmxlID0gZmFsc2U7XG4gICAgaWYgKGVsZW1lbnQpXG4gICAgICAgIHRoaXMuYXR0YWNoKGVsZW1lbnQpO1xufVxuRWxlbWVudE91dHB1dC5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbih0eXBlLCBmbikge1xuICAgIGlmICh0aGlzLl9lbGVtZW50KVxuICAgICAgICB0aGlzLl9lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgdGhpcy5ldmVudEZvcndhcmRlcik7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQub24odHlwZSwgZm4pO1xufTtcbkVsZW1lbnRPdXRwdXQucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgZm4pIHtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5yZW1vdmVMaXN0ZW5lcih0eXBlLCBmbik7XG59O1xuRWxlbWVudE91dHB1dC5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSwgZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQgJiYgIWV2ZW50Lm9yaWdpbilcbiAgICAgICAgZXZlbnQub3JpZ2luID0gdGhpcztcbiAgICB2YXIgaGFuZGxlZCA9IHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQodHlwZSwgZXZlbnQpO1xuICAgIGlmIChoYW5kbGVkICYmIGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbilcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgcmV0dXJuIGhhbmRsZWQ7XG59O1xuRWxlbWVudE91dHB1dC5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uIHBpcGUodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50T3V0cHV0LnBpcGUodGFyZ2V0KTtcbn07XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS51bnBpcGUgPSBmdW5jdGlvbiB1bnBpcGUodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50T3V0cHV0LnVucGlwZSh0YXJnZXQpO1xufTtcbkVsZW1lbnRPdXRwdXQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbn07XG5mdW5jdGlvbiBfYWRkRXZlbnRMaXN0ZW5lcnModGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLl9ldmVudE91dHB1dC5saXN0ZW5lcnMpIHtcbiAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoaSwgdGhpcy5ldmVudEZvcndhcmRlcik7XG4gICAgfVxufVxuZnVuY3Rpb24gX3JlbW92ZUV2ZW50TGlzdGVuZXJzKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgaW4gdGhpcy5fZXZlbnRPdXRwdXQubGlzdGVuZXJzKSB7XG4gICAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGksIHRoaXMuZXZlbnRGb3J3YXJkZXIpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9mb3JtYXRDU1NUcmFuc2Zvcm0obSkge1xuICAgIG1bMTJdID0gTWF0aC5yb3VuZChtWzEyXSAqIGRldmljZVBpeGVsUmF0aW8pIC8gZGV2aWNlUGl4ZWxSYXRpbztcbiAgICBtWzEzXSA9IE1hdGgucm91bmQobVsxM10gKiBkZXZpY2VQaXhlbFJhdGlvKSAvIGRldmljZVBpeGVsUmF0aW87XG4gICAgdmFyIHJlc3VsdCA9ICdtYXRyaXgzZCgnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTU7IGkrKykge1xuICAgICAgICByZXN1bHQgKz0gbVtpXSA8IDAuMDAwMDAxICYmIG1baV0gPiAtMC4wMDAwMDEgPyAnMCwnIDogbVtpXSArICcsJztcbiAgICB9XG4gICAgcmVzdWx0ICs9IG1bMTVdICsgJyknO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG52YXIgX3NldE1hdHJpeDtcbmlmIChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZignZmlyZWZveCcpID4gLTEpIHtcbiAgICBfc2V0TWF0cml4ID0gZnVuY3Rpb24gKGVsZW1lbnQsIG1hdHJpeCkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnpJbmRleCA9IG1hdHJpeFsxNF0gKiAxMDAwMDAwIHwgMDtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBfZm9ybWF0Q1NTVHJhbnNmb3JtKG1hdHJpeCk7XG4gICAgfTtcbn0gZWxzZSBpZiAodXNlUHJlZml4KSB7XG4gICAgX3NldE1hdHJpeCA9IGZ1bmN0aW9uIChlbGVtZW50LCBtYXRyaXgpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBfZm9ybWF0Q1NTVHJhbnNmb3JtKG1hdHJpeCk7XG4gICAgfTtcbn0gZWxzZSB7XG4gICAgX3NldE1hdHJpeCA9IGZ1bmN0aW9uIChlbGVtZW50LCBtYXRyaXgpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBfZm9ybWF0Q1NTVHJhbnNmb3JtKG1hdHJpeCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIF9mb3JtYXRDU1NPcmlnaW4ob3JpZ2luKSB7XG4gICAgcmV0dXJuIDEwMCAqIG9yaWdpblswXSArICclICcgKyAxMDAgKiBvcmlnaW5bMV0gKyAnJSc7XG59XG52YXIgX3NldE9yaWdpbiA9IHVzZVByZWZpeCA/IGZ1bmN0aW9uIChlbGVtZW50LCBvcmlnaW4pIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm1PcmlnaW4gPSBfZm9ybWF0Q1NTT3JpZ2luKG9yaWdpbik7XG4gICAgfSA6IGZ1bmN0aW9uIChlbGVtZW50LCBvcmlnaW4pIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSBfZm9ybWF0Q1NTT3JpZ2luKG9yaWdpbik7XG4gICAgfTtcbnZhciBfc2V0SW52aXNpYmxlID0gdXNlUHJlZml4ID8gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUzZCgwLjAwMDEsMC4wMDAxLDAuMDAwMSknO1xuICAgICAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIH0gOiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZTNkKDAuMDAwMSwwLjAwMDEsMC4wMDAxKSc7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgfTtcbmZ1bmN0aW9uIF94eU5vdEVxdWFscyhhLCBiKSB7XG4gICAgcmV0dXJuIGEgJiYgYiA/IGFbMF0gIT09IGJbMF0gfHwgYVsxXSAhPT0gYlsxXSA6IGEgIT09IGI7XG59XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS5jb21taXQgPSBmdW5jdGlvbiBjb21taXQoY29udGV4dCkge1xuICAgIHZhciB0YXJnZXQgPSB0aGlzLl9lbGVtZW50O1xuICAgIGlmICghdGFyZ2V0KVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIG1hdHJpeCA9IGNvbnRleHQudHJhbnNmb3JtO1xuICAgIHZhciBvcGFjaXR5ID0gY29udGV4dC5vcGFjaXR5O1xuICAgIHZhciBvcmlnaW4gPSBjb250ZXh0Lm9yaWdpbjtcbiAgICB2YXIgc2l6ZSA9IGNvbnRleHQuc2l6ZTtcbiAgICBpZiAoIW1hdHJpeCAmJiB0aGlzLl9tYXRyaXgpIHtcbiAgICAgICAgdGhpcy5fbWF0cml4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IDA7XG4gICAgICAgIF9zZXRJbnZpc2libGUodGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoX3h5Tm90RXF1YWxzKHRoaXMuX29yaWdpbiwgb3JpZ2luKSlcbiAgICAgICAgdGhpcy5fb3JpZ2luRGlydHkgPSB0cnVlO1xuICAgIGlmIChUcmFuc2Zvcm0ubm90RXF1YWxzKHRoaXMuX21hdHJpeCwgbWF0cml4KSlcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtRGlydHkgPSB0cnVlO1xuICAgIGlmICh0aGlzLl9pbnZpc2libGUpIHtcbiAgICAgICAgdGhpcy5faW52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgIH1cbiAgICBpZiAodGhpcy5fb3BhY2l0eSAhPT0gb3BhY2l0eSkge1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gb3BhY2l0eTtcbiAgICAgICAgdGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBvcGFjaXR5ID49IDEgPyAnMC45OTk5OTknIDogb3BhY2l0eTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3RyYW5zZm9ybURpcnR5IHx8IHRoaXMuX29yaWdpbkRpcnR5IHx8IHRoaXMuX3NpemVEaXJ0eSkge1xuICAgICAgICBpZiAodGhpcy5fc2l6ZURpcnR5KVxuICAgICAgICAgICAgdGhpcy5fc2l6ZURpcnR5ID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLl9vcmlnaW5EaXJ0eSkge1xuICAgICAgICAgICAgaWYgKG9yaWdpbikge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fb3JpZ2luKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcmlnaW4gPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIHRoaXMuX29yaWdpblswXSA9IG9yaWdpblswXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vcmlnaW5bMV0gPSBvcmlnaW5bMV07XG4gICAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLl9vcmlnaW4gPSBudWxsO1xuICAgICAgICAgICAgX3NldE9yaWdpbih0YXJnZXQsIHRoaXMuX29yaWdpbik7XG4gICAgICAgICAgICB0aGlzLl9vcmlnaW5EaXJ0eSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghbWF0cml4KVxuICAgICAgICAgICAgbWF0cml4ID0gVHJhbnNmb3JtLmlkZW50aXR5O1xuICAgICAgICB0aGlzLl9tYXRyaXggPSBtYXRyaXg7XG4gICAgICAgIHZhciBhYU1hdHJpeCA9IHRoaXMuX3NpemUgPyBUcmFuc2Zvcm0udGhlbk1vdmUobWF0cml4LCBbXG4gICAgICAgICAgICAgICAgLXRoaXMuX3NpemVbMF0gKiBvcmlnaW5bMF0sXG4gICAgICAgICAgICAgICAgLXRoaXMuX3NpemVbMV0gKiBvcmlnaW5bMV0sXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSkgOiBtYXRyaXg7XG4gICAgICAgIF9zZXRNYXRyaXgodGFyZ2V0LCBhYU1hdHJpeCk7XG4gICAgICAgIHRoaXMuX3RyYW5zZm9ybURpcnR5ID0gZmFsc2U7XG4gICAgfVxufTtcbkVsZW1lbnRPdXRwdXQucHJvdG90eXBlLmNsZWFudXAgPSBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgIGlmICh0aGlzLl9lbGVtZW50KSB7XG4gICAgICAgIHRoaXMuX2ludmlzaWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG59O1xuRWxlbWVudE91dHB1dC5wcm90b3R5cGUuYXR0YWNoID0gZnVuY3Rpb24gYXR0YWNoKHRhcmdldCkge1xuICAgIHRoaXMuX2VsZW1lbnQgPSB0YXJnZXQ7XG4gICAgX2FkZEV2ZW50TGlzdGVuZXJzLmNhbGwodGhpcywgdGFyZ2V0KTtcbn07XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS5kZXRhY2ggPSBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgdmFyIHRhcmdldCA9IHRoaXMuX2VsZW1lbnQ7XG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgICBfcmVtb3ZlRXZlbnRMaXN0ZW5lcnMuY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgICAgICBpZiAodGhpcy5faW52aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgIHJldHVybiB0YXJnZXQ7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBFbGVtZW50T3V0cHV0OyIsInZhciBDb250ZXh0ID0gcmVxdWlyZSgnLi9Db250ZXh0Jyk7XG52YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnLi9FdmVudEhhbmRsZXInKTtcbnZhciBPcHRpb25zTWFuYWdlciA9IHJlcXVpcmUoJy4vT3B0aW9uc01hbmFnZXInKTtcbnZhciBFbmdpbmUgPSB7fTtcbnZhciBjb250ZXh0cyA9IFtdO1xudmFyIG5leHRUaWNrUXVldWUgPSBbXTtcbnZhciBkZWZlclF1ZXVlID0gW107XG52YXIgbGFzdFRpbWUgPSBEYXRlLm5vdygpO1xudmFyIGZyYW1lVGltZTtcbnZhciBmcmFtZVRpbWVMaW1pdDtcbnZhciBsb29wRW5hYmxlZCA9IHRydWU7XG52YXIgZXZlbnRGb3J3YXJkZXJzID0ge307XG52YXIgZXZlbnRIYW5kbGVyID0gbmV3IEV2ZW50SGFuZGxlcigpO1xudmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIGNvbnRhaW5lclR5cGU6ICdkaXYnLFxuICAgICAgICBjb250YWluZXJDbGFzczogJ2ZhbW91cy1jb250YWluZXInLFxuICAgICAgICBmcHNDYXA6IHVuZGVmaW5lZCxcbiAgICAgICAgcnVuTG9vcDogdHJ1ZSxcbiAgICAgICAgYXBwTW9kZTogdHJ1ZVxuICAgIH07XG52YXIgb3B0aW9uc01hbmFnZXIgPSBuZXcgT3B0aW9uc01hbmFnZXIob3B0aW9ucyk7XG52YXIgTUFYX0RFRkVSX0ZSQU1FX1RJTUUgPSAxMDtcbkVuZ2luZS5zdGVwID0gZnVuY3Rpb24gc3RlcCgpIHtcbiAgICB2YXIgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIGlmIChmcmFtZVRpbWVMaW1pdCAmJiBjdXJyZW50VGltZSAtIGxhc3RUaW1lIDwgZnJhbWVUaW1lTGltaXQpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgaSA9IDA7XG4gICAgZnJhbWVUaW1lID0gY3VycmVudFRpbWUgLSBsYXN0VGltZTtcbiAgICBsYXN0VGltZSA9IGN1cnJlbnRUaW1lO1xuICAgIGV2ZW50SGFuZGxlci5lbWl0KCdwcmVyZW5kZXInKTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbmV4dFRpY2tRdWV1ZS5sZW5ndGg7IGkrKylcbiAgICAgICAgbmV4dFRpY2tRdWV1ZVtpXS5jYWxsKHRoaXMpO1xuICAgIG5leHRUaWNrUXVldWUuc3BsaWNlKDApO1xuICAgIHdoaWxlIChkZWZlclF1ZXVlLmxlbmd0aCAmJiBEYXRlLm5vdygpIC0gY3VycmVudFRpbWUgPCBNQVhfREVGRVJfRlJBTUVfVElNRSkge1xuICAgICAgICBkZWZlclF1ZXVlLnNoaWZ0KCkuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IGNvbnRleHRzLmxlbmd0aDsgaSsrKVxuICAgICAgICBjb250ZXh0c1tpXS51cGRhdGUoKTtcbiAgICBldmVudEhhbmRsZXIuZW1pdCgncG9zdHJlbmRlcicpO1xufTtcbmZ1bmN0aW9uIGxvb3AoKSB7XG4gICAgaWYgKG9wdGlvbnMucnVuTG9vcCkge1xuICAgICAgICBFbmdpbmUuc3RlcCgpO1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgIH0gZWxzZVxuICAgICAgICBsb29wRW5hYmxlZCA9IGZhbHNlO1xufVxud2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbmZ1bmN0aW9uIGhhbmRsZVJlc2l6ZShldmVudCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGV4dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29udGV4dHNbaV0uZW1pdCgncmVzaXplJyk7XG4gICAgfVxuICAgIGV2ZW50SGFuZGxlci5lbWl0KCdyZXNpemUnKTtcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVSZXNpemUsIGZhbHNlKTtcbmhhbmRsZVJlc2l6ZSgpO1xuZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSwgdHJ1ZSk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdmYW1vdXMtcm9vdCcpO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmYW1vdXMtcm9vdCcpO1xufVxudmFyIGluaXRpYWxpemVkID0gZmFsc2U7XG5FbmdpbmUucGlwZSA9IGZ1bmN0aW9uIHBpcGUodGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC5zdWJzY3JpYmUgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgcmV0dXJuIHRhcmdldC5zdWJzY3JpYmUoRW5naW5lKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBldmVudEhhbmRsZXIucGlwZSh0YXJnZXQpO1xufTtcbkVuZ2luZS51bnBpcGUgPSBmdW5jdGlvbiB1bnBpcGUodGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC51bnN1YnNjcmliZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LnVuc3Vic2NyaWJlKEVuZ2luZSk7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gZXZlbnRIYW5kbGVyLnVucGlwZSh0YXJnZXQpO1xufTtcbkVuZ2luZS5vbiA9IGZ1bmN0aW9uIG9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgICBpZiAoISh0eXBlIGluIGV2ZW50Rm9yd2FyZGVycykpIHtcbiAgICAgICAgZXZlbnRGb3J3YXJkZXJzW3R5cGVdID0gZXZlbnRIYW5kbGVyLmVtaXQuYmluZChldmVudEhhbmRsZXIsIHR5cGUpO1xuICAgICAgICBpZiAoZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGV2ZW50Rm9yd2FyZGVyc1t0eXBlXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBFbmdpbmUubmV4dFRpY2soZnVuY3Rpb24gKHR5cGUsIGZvcndhcmRlcikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmb3J3YXJkZXIpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMsIHR5cGUsIGV2ZW50Rm9yd2FyZGVyc1t0eXBlXSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBldmVudEhhbmRsZXIub24odHlwZSwgaGFuZGxlcik7XG59O1xuRW5naW5lLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUsIGV2ZW50KSB7XG4gICAgcmV0dXJuIGV2ZW50SGFuZGxlci5lbWl0KHR5cGUsIGV2ZW50KTtcbn07XG5FbmdpbmUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSB7XG4gICAgcmV0dXJuIGV2ZW50SGFuZGxlci5yZW1vdmVMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKTtcbn07XG5FbmdpbmUuZ2V0RlBTID0gZnVuY3Rpb24gZ2V0RlBTKCkge1xuICAgIHJldHVybiAxMDAwIC8gZnJhbWVUaW1lO1xufTtcbkVuZ2luZS5zZXRGUFNDYXAgPSBmdW5jdGlvbiBzZXRGUFNDYXAoZnBzKSB7XG4gICAgZnJhbWVUaW1lTGltaXQgPSBNYXRoLmZsb29yKDEwMDAgLyBmcHMpO1xufTtcbkVuZ2luZS5nZXRPcHRpb25zID0gZnVuY3Rpb24gZ2V0T3B0aW9ucyhrZXkpIHtcbiAgICByZXR1cm4gb3B0aW9uc01hbmFnZXIuZ2V0T3B0aW9ucyhrZXkpO1xufTtcbkVuZ2luZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnNNYW5hZ2VyLnNldE9wdGlvbnMuYXBwbHkob3B0aW9uc01hbmFnZXIsIGFyZ3VtZW50cyk7XG59O1xuRW5naW5lLmNyZWF0ZUNvbnRleHQgPSBmdW5jdGlvbiBjcmVhdGVDb250ZXh0KGVsKSB7XG4gICAgaWYgKCFpbml0aWFsaXplZCAmJiBvcHRpb25zLmFwcE1vZGUpXG4gICAgICAgIEVuZ2luZS5uZXh0VGljayhpbml0aWFsaXplKTtcbiAgICB2YXIgbmVlZE1vdW50Q29udGFpbmVyID0gZmFsc2U7XG4gICAgaWYgKCFlbCkge1xuICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQob3B0aW9ucy5jb250YWluZXJUeXBlKTtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChvcHRpb25zLmNvbnRhaW5lckNsYXNzKTtcbiAgICAgICAgbmVlZE1vdW50Q29udGFpbmVyID0gdHJ1ZTtcbiAgICB9XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dChlbCk7XG4gICAgRW5naW5lLnJlZ2lzdGVyQ29udGV4dChjb250ZXh0KTtcbiAgICBpZiAobmVlZE1vdW50Q29udGFpbmVyKSB7XG4gICAgICAgIEVuZ2luZS5uZXh0VGljayhmdW5jdGlvbiAoY29udGV4dCwgZWwpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgICAgICAgY29udGV4dC5lbWl0KCdyZXNpemUnKTtcbiAgICAgICAgfS5iaW5kKHRoaXMsIGNvbnRleHQsIGVsKSk7XG4gICAgfVxuICAgIHJldHVybiBjb250ZXh0O1xufTtcbkVuZ2luZS5yZWdpc3RlckNvbnRleHQgPSBmdW5jdGlvbiByZWdpc3RlckNvbnRleHQoY29udGV4dCkge1xuICAgIGNvbnRleHRzLnB1c2goY29udGV4dCk7XG4gICAgcmV0dXJuIGNvbnRleHQ7XG59O1xuRW5naW5lLmdldENvbnRleHRzID0gZnVuY3Rpb24gZ2V0Q29udGV4dHMoKSB7XG4gICAgcmV0dXJuIGNvbnRleHRzO1xufTtcbkVuZ2luZS5kZXJlZ2lzdGVyQ29udGV4dCA9IGZ1bmN0aW9uIGRlcmVnaXN0ZXJDb250ZXh0KGNvbnRleHQpIHtcbiAgICB2YXIgaSA9IGNvbnRleHRzLmluZGV4T2YoY29udGV4dCk7XG4gICAgaWYgKGkgPj0gMClcbiAgICAgICAgY29udGV4dHMuc3BsaWNlKGksIDEpO1xufTtcbkVuZ2luZS5uZXh0VGljayA9IGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgbmV4dFRpY2tRdWV1ZS5wdXNoKGZuKTtcbn07XG5FbmdpbmUuZGVmZXIgPSBmdW5jdGlvbiBkZWZlcihmbikge1xuICAgIGRlZmVyUXVldWUucHVzaChmbik7XG59O1xub3B0aW9uc01hbmFnZXIub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgaWYgKGRhdGEuaWQgPT09ICdmcHNDYXAnKVxuICAgICAgICBFbmdpbmUuc2V0RlBTQ2FwKGRhdGEudmFsdWUpO1xuICAgIGVsc2UgaWYgKGRhdGEuaWQgPT09ICdydW5Mb29wJykge1xuICAgICAgICBpZiAoIWxvb3BFbmFibGVkICYmIGRhdGEudmFsdWUpIHtcbiAgICAgICAgICAgIGxvb3BFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbm1vZHVsZS5leHBvcnRzID0gRW5naW5lOyIsInZhciBlbnRpdGllcyA9IFtdO1xuZnVuY3Rpb24gZ2V0KGlkKSB7XG4gICAgcmV0dXJuIGVudGl0aWVzW2lkXTtcbn1cbmZ1bmN0aW9uIHNldChpZCwgZW50aXR5KSB7XG4gICAgZW50aXRpZXNbaWRdID0gZW50aXR5O1xufVxuZnVuY3Rpb24gcmVnaXN0ZXIoZW50aXR5KSB7XG4gICAgdmFyIGlkID0gZW50aXRpZXMubGVuZ3RoO1xuICAgIHNldChpZCwgZW50aXR5KTtcbiAgICByZXR1cm4gaWQ7XG59XG5mdW5jdGlvbiB1bnJlZ2lzdGVyKGlkKSB7XG4gICAgc2V0KGlkLCBudWxsKTtcbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHJlZ2lzdGVyOiByZWdpc3RlcixcbiAgICB1bnJlZ2lzdGVyOiB1bnJlZ2lzdGVyLFxuICAgIGdldDogZ2V0LFxuICAgIHNldDogc2V0XG59OyIsImZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xuICAgIHRoaXMuX293bmVyID0gdGhpcztcbn1cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSwgZXZlbnQpIHtcbiAgICB2YXIgaGFuZGxlcnMgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXTtcbiAgICBpZiAoaGFuZGxlcnMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoYW5kbGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaGFuZGxlcnNbaV0uY2FsbCh0aGlzLl9vd25lciwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbih0eXBlLCBoYW5kbGVyKSB7XG4gICAgaWYgKCEodHlwZSBpbiB0aGlzLmxpc3RlbmVycykpXG4gICAgICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdID0gW107XG4gICAgdmFyIGluZGV4ID0gdGhpcy5saXN0ZW5lcnNbdHlwZV0uaW5kZXhPZihoYW5kbGVyKTtcbiAgICBpZiAoaW5kZXggPCAwKVxuICAgICAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKGhhbmRsZXIpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGhhbmRsZXIpIHtcbiAgICB2YXIgbGlzdGVuZXIgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXTtcbiAgICBpZiAobGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgaW5kZXggPSBsaXN0ZW5lci5pbmRleE9mKGhhbmRsZXIpO1xuICAgICAgICBpZiAoaW5kZXggPj0gMClcbiAgICAgICAgICAgIGxpc3RlbmVyLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYmluZFRoaXMgPSBmdW5jdGlvbiBiaW5kVGhpcyhvd25lcikge1xuICAgIHRoaXMuX293bmVyID0gb3duZXI7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7IiwidmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJy4vRXZlbnRFbWl0dGVyJyk7XG5mdW5jdGlvbiBFdmVudEhhbmRsZXIoKSB7XG4gICAgRXZlbnRFbWl0dGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5kb3duc3RyZWFtID0gW107XG4gICAgdGhpcy5kb3duc3RyZWFtRm4gPSBbXTtcbiAgICB0aGlzLnVwc3RyZWFtID0gW107XG4gICAgdGhpcy51cHN0cmVhbUxpc3RlbmVycyA9IHt9O1xufVxuRXZlbnRIYW5kbGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXZlbnRFbWl0dGVyLnByb3RvdHlwZSk7XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRXZlbnRIYW5kbGVyO1xuRXZlbnRIYW5kbGVyLnNldElucHV0SGFuZGxlciA9IGZ1bmN0aW9uIHNldElucHV0SGFuZGxlcihvYmplY3QsIGhhbmRsZXIpIHtcbiAgICBvYmplY3QudHJpZ2dlciA9IGhhbmRsZXIudHJpZ2dlci5iaW5kKGhhbmRsZXIpO1xuICAgIGlmIChoYW5kbGVyLnN1YnNjcmliZSAmJiBoYW5kbGVyLnVuc3Vic2NyaWJlKSB7XG4gICAgICAgIG9iamVjdC5zdWJzY3JpYmUgPSBoYW5kbGVyLnN1YnNjcmliZS5iaW5kKGhhbmRsZXIpO1xuICAgICAgICBvYmplY3QudW5zdWJzY3JpYmUgPSBoYW5kbGVyLnVuc3Vic2NyaWJlLmJpbmQoaGFuZGxlcik7XG4gICAgfVxufTtcbkV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyID0gZnVuY3Rpb24gc2V0T3V0cHV0SGFuZGxlcihvYmplY3QsIGhhbmRsZXIpIHtcbiAgICBpZiAoaGFuZGxlciBpbnN0YW5jZW9mIEV2ZW50SGFuZGxlcilcbiAgICAgICAgaGFuZGxlci5iaW5kVGhpcyhvYmplY3QpO1xuICAgIG9iamVjdC5waXBlID0gaGFuZGxlci5waXBlLmJpbmQoaGFuZGxlcik7XG4gICAgb2JqZWN0LnVucGlwZSA9IGhhbmRsZXIudW5waXBlLmJpbmQoaGFuZGxlcik7XG4gICAgb2JqZWN0Lm9uID0gaGFuZGxlci5vbi5iaW5kKGhhbmRsZXIpO1xuICAgIG9iamVjdC5hZGRMaXN0ZW5lciA9IG9iamVjdC5vbjtcbiAgICBvYmplY3QucmVtb3ZlTGlzdGVuZXIgPSBoYW5kbGVyLnJlbW92ZUxpc3RlbmVyLmJpbmQoaGFuZGxlcik7XG59O1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBldmVudCkge1xuICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHZhciBpID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5kb3duc3RyZWFtLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmRvd25zdHJlYW1baV0udHJpZ2dlcilcbiAgICAgICAgICAgIHRoaXMuZG93bnN0cmVhbVtpXS50cmlnZ2VyKHR5cGUsIGV2ZW50KTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMuZG93bnN0cmVhbUZuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuZG93bnN0cmVhbUZuW2ldKHR5cGUsIGV2ZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS50cmlnZ2VyID0gRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5lbWl0O1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gcGlwZSh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LnN1YnNjcmliZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LnN1YnNjcmliZSh0aGlzKTtcbiAgICB2YXIgZG93bnN0cmVhbUN0eCA9IHRhcmdldCBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gdGhpcy5kb3duc3RyZWFtRm4gOiB0aGlzLmRvd25zdHJlYW07XG4gICAgdmFyIGluZGV4ID0gZG93bnN0cmVhbUN0eC5pbmRleE9mKHRhcmdldCk7XG4gICAgaWYgKGluZGV4IDwgMClcbiAgICAgICAgZG93bnN0cmVhbUN0eC5wdXNoKHRhcmdldCk7XG4gICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICB0YXJnZXQoJ3BpcGUnLCBudWxsKTtcbiAgICBlbHNlIGlmICh0YXJnZXQudHJpZ2dlcilcbiAgICAgICAgdGFyZ2V0LnRyaWdnZXIoJ3BpcGUnLCBudWxsKTtcbiAgICByZXR1cm4gdGFyZ2V0O1xufTtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUudW5waXBlID0gZnVuY3Rpb24gdW5waXBlKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQudW5zdWJzY3JpYmUgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgcmV0dXJuIHRhcmdldC51bnN1YnNjcmliZSh0aGlzKTtcbiAgICB2YXIgZG93bnN0cmVhbUN0eCA9IHRhcmdldCBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gdGhpcy5kb3duc3RyZWFtRm4gOiB0aGlzLmRvd25zdHJlYW07XG4gICAgdmFyIGluZGV4ID0gZG93bnN0cmVhbUN0eC5pbmRleE9mKHRhcmdldCk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgZG93bnN0cmVhbUN0eC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgICAgICB0YXJnZXQoJ3VucGlwZScsIG51bGwpO1xuICAgICAgICBlbHNlIGlmICh0YXJnZXQudHJpZ2dlcilcbiAgICAgICAgICAgIHRhcmdldC50cmlnZ2VyKCd1bnBpcGUnLCBudWxsKTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xufTtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbih0eXBlLCBoYW5kbGVyKSB7XG4gICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICghKHR5cGUgaW4gdGhpcy51cHN0cmVhbUxpc3RlbmVycykpIHtcbiAgICAgICAgdmFyIHVwc3RyZWFtTGlzdGVuZXIgPSB0aGlzLnRyaWdnZXIuYmluZCh0aGlzLCB0eXBlKTtcbiAgICAgICAgdGhpcy51cHN0cmVhbUxpc3RlbmVyc1t0eXBlXSA9IHVwc3RyZWFtTGlzdGVuZXI7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy51cHN0cmVhbS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy51cHN0cmVhbVtpXS5vbih0eXBlLCB1cHN0cmVhbUxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5vbjtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gc3Vic2NyaWJlKHNvdXJjZSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMudXBzdHJlYW0uaW5kZXhPZihzb3VyY2UpO1xuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgdGhpcy51cHN0cmVhbS5wdXNoKHNvdXJjZSk7XG4gICAgICAgIGZvciAodmFyIHR5cGUgaW4gdGhpcy51cHN0cmVhbUxpc3RlbmVycykge1xuICAgICAgICAgICAgc291cmNlLm9uKHR5cGUsIHRoaXMudXBzdHJlYW1MaXN0ZW5lcnNbdHlwZV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiB1bnN1YnNjcmliZShzb3VyY2UpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLnVwc3RyZWFtLmluZGV4T2Yoc291cmNlKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICB0aGlzLnVwc3RyZWFtLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGZvciAodmFyIHR5cGUgaW4gdGhpcy51cHN0cmVhbUxpc3RlbmVycykge1xuICAgICAgICAgICAgc291cmNlLnJlbW92ZUxpc3RlbmVyKHR5cGUsIHRoaXMudXBzdHJlYW1MaXN0ZW5lcnNbdHlwZV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbm1vZHVsZS5leHBvcnRzID0gRXZlbnRIYW5kbGVyOyIsInZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCcuL1RyYW5zZm9ybScpO1xudmFyIFRyYW5zaXRpb25hYmxlID0gcmVxdWlyZSgnLi4vdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGUnKTtcbnZhciBUcmFuc2l0aW9uYWJsZVRyYW5zZm9ybSA9IHJlcXVpcmUoJy4uL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlVHJhbnNmb3JtJyk7XG5mdW5jdGlvbiBNb2RpZmllcihvcHRpb25zKSB7XG4gICAgdGhpcy5fdHJhbnNmb3JtR2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9vcGFjaXR5R2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9vcmlnaW5HZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX2FsaWduR2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9zaXplR2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9wcm9wb3J0aW9uR2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9sZWdhY3lTdGF0ZXMgPSB7fTtcbiAgICB0aGlzLl9vdXRwdXQgPSB7XG4gICAgICAgIHRyYW5zZm9ybTogVHJhbnNmb3JtLmlkZW50aXR5LFxuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBvcmlnaW46IG51bGwsXG4gICAgICAgIGFsaWduOiBudWxsLFxuICAgICAgICBzaXplOiBudWxsLFxuICAgICAgICBwcm9wb3J0aW9uczogbnVsbCxcbiAgICAgICAgdGFyZ2V0OiBudWxsXG4gICAgfTtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucy50cmFuc2Zvcm0pXG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybUZyb20ob3B0aW9ucy50cmFuc2Zvcm0pO1xuICAgICAgICBpZiAob3B0aW9ucy5vcGFjaXR5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aGlzLm9wYWNpdHlGcm9tKG9wdGlvbnMub3BhY2l0eSk7XG4gICAgICAgIGlmIChvcHRpb25zLm9yaWdpbilcbiAgICAgICAgICAgIHRoaXMub3JpZ2luRnJvbShvcHRpb25zLm9yaWdpbik7XG4gICAgICAgIGlmIChvcHRpb25zLmFsaWduKVxuICAgICAgICAgICAgdGhpcy5hbGlnbkZyb20ob3B0aW9ucy5hbGlnbik7XG4gICAgICAgIGlmIChvcHRpb25zLnNpemUpXG4gICAgICAgICAgICB0aGlzLnNpemVGcm9tKG9wdGlvbnMuc2l6ZSk7XG4gICAgICAgIGlmIChvcHRpb25zLnByb3BvcnRpb25zKVxuICAgICAgICAgICAgdGhpcy5wcm9wb3J0aW9uc0Zyb20ob3B0aW9ucy5wcm9wb3J0aW9ucyk7XG4gICAgfVxufVxuTW9kaWZpZXIucHJvdG90eXBlLnRyYW5zZm9ybUZyb20gPSBmdW5jdGlvbiB0cmFuc2Zvcm1Gcm9tKHRyYW5zZm9ybSkge1xuICAgIGlmICh0cmFuc2Zvcm0gaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtR2V0dGVyID0gdHJhbnNmb3JtO1xuICAgIGVsc2UgaWYgKHRyYW5zZm9ybSBpbnN0YW5jZW9mIE9iamVjdCAmJiB0cmFuc2Zvcm0uZ2V0KVxuICAgICAgICB0aGlzLl90cmFuc2Zvcm1HZXR0ZXIgPSB0cmFuc2Zvcm0uZ2V0LmJpbmQodHJhbnNmb3JtKTtcbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtR2V0dGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3V0cHV0LnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLm9wYWNpdHlGcm9tID0gZnVuY3Rpb24gb3BhY2l0eUZyb20ob3BhY2l0eSkge1xuICAgIGlmIChvcGFjaXR5IGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRoaXMuX29wYWNpdHlHZXR0ZXIgPSBvcGFjaXR5O1xuICAgIGVsc2UgaWYgKG9wYWNpdHkgaW5zdGFuY2VvZiBPYmplY3QgJiYgb3BhY2l0eS5nZXQpXG4gICAgICAgIHRoaXMuX29wYWNpdHlHZXR0ZXIgPSBvcGFjaXR5LmdldC5iaW5kKG9wYWNpdHkpO1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9vcGFjaXR5R2V0dGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3V0cHV0Lm9wYWNpdHkgPSBvcGFjaXR5O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5Nb2RpZmllci5wcm90b3R5cGUub3JpZ2luRnJvbSA9IGZ1bmN0aW9uIG9yaWdpbkZyb20ob3JpZ2luKSB7XG4gICAgaWYgKG9yaWdpbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICB0aGlzLl9vcmlnaW5HZXR0ZXIgPSBvcmlnaW47XG4gICAgZWxzZSBpZiAob3JpZ2luIGluc3RhbmNlb2YgT2JqZWN0ICYmIG9yaWdpbi5nZXQpXG4gICAgICAgIHRoaXMuX29yaWdpbkdldHRlciA9IG9yaWdpbi5nZXQuYmluZChvcmlnaW4pO1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9vcmlnaW5HZXR0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9vdXRwdXQub3JpZ2luID0gb3JpZ2luO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuYWxpZ25Gcm9tID0gZnVuY3Rpb24gYWxpZ25Gcm9tKGFsaWduKSB7XG4gICAgaWYgKGFsaWduIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRoaXMuX2FsaWduR2V0dGVyID0gYWxpZ247XG4gICAgZWxzZSBpZiAoYWxpZ24gaW5zdGFuY2VvZiBPYmplY3QgJiYgYWxpZ24uZ2V0KVxuICAgICAgICB0aGlzLl9hbGlnbkdldHRlciA9IGFsaWduLmdldC5iaW5kKGFsaWduKTtcbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fYWxpZ25HZXR0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9vdXRwdXQuYWxpZ24gPSBhbGlnbjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLnNpemVGcm9tID0gZnVuY3Rpb24gc2l6ZUZyb20oc2l6ZSkge1xuICAgIGlmIChzaXplIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRoaXMuX3NpemVHZXR0ZXIgPSBzaXplO1xuICAgIGVsc2UgaWYgKHNpemUgaW5zdGFuY2VvZiBPYmplY3QgJiYgc2l6ZS5nZXQpXG4gICAgICAgIHRoaXMuX3NpemVHZXR0ZXIgPSBzaXplLmdldC5iaW5kKHNpemUpO1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9zaXplR2V0dGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3V0cHV0LnNpemUgPSBzaXplO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5Nb2RpZmllci5wcm90b3R5cGUucHJvcG9ydGlvbnNGcm9tID0gZnVuY3Rpb24gcHJvcG9ydGlvbnNGcm9tKHByb3BvcnRpb25zKSB7XG4gICAgaWYgKHByb3BvcnRpb25zIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRoaXMuX3Byb3BvcnRpb25HZXR0ZXIgPSBwcm9wb3J0aW9ucztcbiAgICBlbHNlIGlmIChwcm9wb3J0aW9ucyBpbnN0YW5jZW9mIE9iamVjdCAmJiBwcm9wb3J0aW9ucy5nZXQpXG4gICAgICAgIHRoaXMuX3Byb3BvcnRpb25HZXR0ZXIgPSBwcm9wb3J0aW9ucy5nZXQuYmluZChwcm9wb3J0aW9ucyk7XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX3Byb3BvcnRpb25HZXR0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9vdXRwdXQucHJvcG9ydGlvbnMgPSBwcm9wb3J0aW9ucztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLnNldFRyYW5zZm9ybSA9IGZ1bmN0aW9uIHNldFRyYW5zZm9ybSh0cmFuc2Zvcm0sIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHRyYW5zaXRpb24gfHwgdGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybSkge1xuICAgICAgICBpZiAoIXRoaXMuX2xlZ2FjeVN0YXRlcy50cmFuc2Zvcm0pIHtcbiAgICAgICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy50cmFuc2Zvcm0gPSBuZXcgVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0odGhpcy5fb3V0cHV0LnRyYW5zZm9ybSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl90cmFuc2Zvcm1HZXR0ZXIpXG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybUZyb20odGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybSk7XG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy50cmFuc2Zvcm0uc2V0KHRyYW5zZm9ybSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtRnJvbSh0cmFuc2Zvcm0pO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5zZXRPcGFjaXR5ID0gZnVuY3Rpb24gc2V0T3BhY2l0eShvcGFjaXR5LCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICh0cmFuc2l0aW9uIHx8IHRoaXMuX2xlZ2FjeVN0YXRlcy5vcGFjaXR5KSB7XG4gICAgICAgIGlmICghdGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkpIHtcbiAgICAgICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5vcGFjaXR5ID0gbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMuX291dHB1dC5vcGFjaXR5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX29wYWNpdHlHZXR0ZXIpXG4gICAgICAgICAgICB0aGlzLm9wYWNpdHlGcm9tKHRoaXMuX2xlZ2FjeVN0YXRlcy5vcGFjaXR5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlZ2FjeVN0YXRlcy5vcGFjaXR5LnNldChvcGFjaXR5LCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiB0aGlzLm9wYWNpdHlGcm9tKG9wYWNpdHkpO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5zZXRPcmlnaW4gPSBmdW5jdGlvbiBzZXRPcmlnaW4ob3JpZ2luLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICh0cmFuc2l0aW9uIHx8IHRoaXMuX2xlZ2FjeVN0YXRlcy5vcmlnaW4pIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sZWdhY3lTdGF0ZXMub3JpZ2luKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMub3JpZ2luID0gbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMuX291dHB1dC5vcmlnaW4gfHwgW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9vcmlnaW5HZXR0ZXIpXG4gICAgICAgICAgICB0aGlzLm9yaWdpbkZyb20odGhpcy5fbGVnYWN5U3RhdGVzLm9yaWdpbik7XG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5vcmlnaW4uc2V0KG9yaWdpbiwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luRnJvbShvcmlnaW4pO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5zZXRBbGlnbiA9IGZ1bmN0aW9uIHNldEFsaWduKGFsaWduLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICh0cmFuc2l0aW9uIHx8IHRoaXMuX2xlZ2FjeVN0YXRlcy5hbGlnbikge1xuICAgICAgICBpZiAoIXRoaXMuX2xlZ2FjeVN0YXRlcy5hbGlnbikge1xuICAgICAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLmFsaWduID0gbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMuX291dHB1dC5hbGlnbiB8fCBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX2FsaWduR2V0dGVyKVxuICAgICAgICAgICAgdGhpcy5hbGlnbkZyb20odGhpcy5fbGVnYWN5U3RhdGVzLmFsaWduKTtcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLmFsaWduLnNldChhbGlnbiwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxpZ25Gcm9tKGFsaWduKTtcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uIHNldFNpemUoc2l6ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoc2l6ZSAmJiAodHJhbnNpdGlvbiB8fCB0aGlzLl9sZWdhY3lTdGF0ZXMuc2l6ZSkpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sZWdhY3lTdGF0ZXMuc2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnNpemUgPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fb3V0cHV0LnNpemUgfHwgW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9zaXplR2V0dGVyKVxuICAgICAgICAgICAgdGhpcy5zaXplRnJvbSh0aGlzLl9sZWdhY3lTdGF0ZXMuc2l6ZSk7XG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5zaXplLnNldChzaXplLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy5zaXplRnJvbShzaXplKTtcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuc2V0UHJvcG9ydGlvbnMgPSBmdW5jdGlvbiBzZXRQcm9wb3J0aW9ucyhwcm9wb3J0aW9ucywgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAocHJvcG9ydGlvbnMgJiYgKHRyYW5zaXRpb24gfHwgdGhpcy5fbGVnYWN5U3RhdGVzLnByb3BvcnRpb25zKSkge1xuICAgICAgICBpZiAoIXRoaXMuX2xlZ2FjeVN0YXRlcy5wcm9wb3J0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnByb3BvcnRpb25zID0gbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMuX291dHB1dC5wcm9wb3J0aW9ucyB8fCBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX3Byb3BvcnRpb25HZXR0ZXIpXG4gICAgICAgICAgICB0aGlzLnByb3BvcnRpb25zRnJvbSh0aGlzLl9sZWdhY3lTdGF0ZXMucHJvcG9ydGlvbnMpO1xuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMucHJvcG9ydGlvbnMuc2V0KHByb3BvcnRpb25zLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wb3J0aW9uc0Zyb20ocHJvcG9ydGlvbnMpO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5oYWx0ID0gZnVuY3Rpb24gaGFsdCgpIHtcbiAgICBpZiAodGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybSlcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybS5oYWx0KCk7XG4gICAgaWYgKHRoaXMuX2xlZ2FjeVN0YXRlcy5vcGFjaXR5KVxuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMub3BhY2l0eS5oYWx0KCk7XG4gICAgaWYgKHRoaXMuX2xlZ2FjeVN0YXRlcy5vcmlnaW4pXG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5vcmlnaW4uaGFsdCgpO1xuICAgIGlmICh0aGlzLl9sZWdhY3lTdGF0ZXMuYWxpZ24pXG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5hbGlnbi5oYWx0KCk7XG4gICAgaWYgKHRoaXMuX2xlZ2FjeVN0YXRlcy5zaXplKVxuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMuc2l6ZS5oYWx0KCk7XG4gICAgaWYgKHRoaXMuX2xlZ2FjeVN0YXRlcy5wcm9wb3J0aW9ucylcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnByb3BvcnRpb25zLmhhbHQoKTtcbiAgICB0aGlzLl90cmFuc2Zvcm1HZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX29wYWNpdHlHZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX29yaWdpbkdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fYWxpZ25HZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX3NpemVHZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX3Byb3BvcnRpb25HZXR0ZXIgPSBudWxsO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5nZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbiBnZXRUcmFuc2Zvcm0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zZm9ybUdldHRlcigpO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5nZXRGaW5hbFRyYW5zZm9ybSA9IGZ1bmN0aW9uIGdldEZpbmFsVHJhbnNmb3JtKCkge1xuICAgIHJldHVybiB0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtID8gdGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybS5nZXRGaW5hbCgpIDogdGhpcy5fb3V0cHV0LnRyYW5zZm9ybTtcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuZ2V0T3BhY2l0eSA9IGZ1bmN0aW9uIGdldE9wYWNpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wYWNpdHlHZXR0ZXIoKTtcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuZ2V0T3JpZ2luID0gZnVuY3Rpb24gZ2V0T3JpZ2luKCkge1xuICAgIHJldHVybiB0aGlzLl9vcmlnaW5HZXR0ZXIoKTtcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuZ2V0QWxpZ24gPSBmdW5jdGlvbiBnZXRBbGlnbigpIHtcbiAgICByZXR1cm4gdGhpcy5fYWxpZ25HZXR0ZXIoKTtcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemVHZXR0ZXIgPyB0aGlzLl9zaXplR2V0dGVyKCkgOiB0aGlzLl9vdXRwdXQuc2l6ZTtcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuZ2V0UHJvcG9ydGlvbnMgPSBmdW5jdGlvbiBnZXRQcm9wb3J0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvcG9ydGlvbkdldHRlciA/IHRoaXMuX3Byb3BvcnRpb25HZXR0ZXIoKSA6IHRoaXMuX291dHB1dC5wcm9wb3J0aW9ucztcbn07XG5mdW5jdGlvbiBfdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLl90cmFuc2Zvcm1HZXR0ZXIpXG4gICAgICAgIHRoaXMuX291dHB1dC50cmFuc2Zvcm0gPSB0aGlzLl90cmFuc2Zvcm1HZXR0ZXIoKTtcbiAgICBpZiAodGhpcy5fb3BhY2l0eUdldHRlcilcbiAgICAgICAgdGhpcy5fb3V0cHV0Lm9wYWNpdHkgPSB0aGlzLl9vcGFjaXR5R2V0dGVyKCk7XG4gICAgaWYgKHRoaXMuX29yaWdpbkdldHRlcilcbiAgICAgICAgdGhpcy5fb3V0cHV0Lm9yaWdpbiA9IHRoaXMuX29yaWdpbkdldHRlcigpO1xuICAgIGlmICh0aGlzLl9hbGlnbkdldHRlcilcbiAgICAgICAgdGhpcy5fb3V0cHV0LmFsaWduID0gdGhpcy5fYWxpZ25HZXR0ZXIoKTtcbiAgICBpZiAodGhpcy5fc2l6ZUdldHRlcilcbiAgICAgICAgdGhpcy5fb3V0cHV0LnNpemUgPSB0aGlzLl9zaXplR2V0dGVyKCk7XG4gICAgaWYgKHRoaXMuX3Byb3BvcnRpb25HZXR0ZXIpXG4gICAgICAgIHRoaXMuX291dHB1dC5wcm9wb3J0aW9ucyA9IHRoaXMuX3Byb3BvcnRpb25HZXR0ZXIoKTtcbn1cbk1vZGlmaWVyLnByb3RvdHlwZS5tb2RpZnkgPSBmdW5jdGlvbiBtb2RpZnkodGFyZ2V0KSB7XG4gICAgX3VwZGF0ZS5jYWxsKHRoaXMpO1xuICAgIHRoaXMuX291dHB1dC50YXJnZXQgPSB0YXJnZXQ7XG4gICAgcmV0dXJuIHRoaXMuX291dHB1dDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IE1vZGlmaWVyOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuL0V2ZW50SGFuZGxlcicpO1xuZnVuY3Rpb24gT3B0aW9uc01hbmFnZXIodmFsdWUpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuZXZlbnRPdXRwdXQgPSBudWxsO1xufVxuT3B0aW9uc01hbmFnZXIucGF0Y2ggPSBmdW5jdGlvbiBwYXRjaE9iamVjdChzb3VyY2UsIGRhdGEpIHtcbiAgICB2YXIgbWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcihzb3VyY2UpO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxuICAgICAgICBtYW5hZ2VyLnBhdGNoKGFyZ3VtZW50c1tpXSk7XG4gICAgcmV0dXJuIHNvdXJjZTtcbn07XG5mdW5jdGlvbiBfY3JlYXRlRXZlbnRPdXRwdXQoKSB7XG4gICAgdGhpcy5ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLmV2ZW50T3V0cHV0LmJpbmRUaGlzKHRoaXMpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuZXZlbnRPdXRwdXQpO1xufVxuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLnBhdGNoID0gZnVuY3Rpb24gcGF0Y2goKSB7XG4gICAgdmFyIG15U3RhdGUgPSB0aGlzLl92YWx1ZTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZGF0YSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgayBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoayBpbiBteVN0YXRlICYmIChkYXRhW2tdICYmIGRhdGFba10uY29uc3RydWN0b3IgPT09IE9iamVjdCkgJiYgKG15U3RhdGVba10gJiYgbXlTdGF0ZVtrXS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSkge1xuICAgICAgICAgICAgICAgIGlmICghbXlTdGF0ZS5oYXNPd25Qcm9wZXJ0eShrKSlcbiAgICAgICAgICAgICAgICAgICAgbXlTdGF0ZVtrXSA9IE9iamVjdC5jcmVhdGUobXlTdGF0ZVtrXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXkoaykucGF0Y2goZGF0YVtrXSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXZlbnRPdXRwdXQpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRPdXRwdXQuZW1pdCgnY2hhbmdlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGssXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5rZXkoaykudmFsdWUoKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KGssIGRhdGFba10pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5zZXRPcHRpb25zID0gT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLnBhdGNoO1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLmtleSA9IGZ1bmN0aW9uIGtleShpZGVudGlmaWVyKSB7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBPcHRpb25zTWFuYWdlcih0aGlzLl92YWx1ZVtpZGVudGlmaWVyXSk7XG4gICAgaWYgKCEocmVzdWx0Ll92YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkgfHwgcmVzdWx0Ll92YWx1ZSBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICByZXN1bHQuX3ZhbHVlID0ge307XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgIHJldHVybiBrZXkgPyB0aGlzLl92YWx1ZVtrZXldIDogdGhpcy5fdmFsdWU7XG59O1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLmdldE9wdGlvbnMgPSBPcHRpb25zTWFuYWdlci5wcm90b3R5cGUuZ2V0O1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKSB7XG4gICAgdmFyIG9yaWdpbmFsVmFsdWUgPSB0aGlzLmdldChrZXkpO1xuICAgIHRoaXMuX3ZhbHVlW2tleV0gPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5ldmVudE91dHB1dCAmJiB2YWx1ZSAhPT0gb3JpZ2luYWxWYWx1ZSlcbiAgICAgICAgdGhpcy5ldmVudE91dHB1dC5lbWl0KCdjaGFuZ2UnLCB7XG4gICAgICAgICAgICBpZDoga2V5LFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xufTtcbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKCkge1xuICAgIF9jcmVhdGVFdmVudE91dHB1dC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzLm9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMucmVtb3ZlTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uIHBpcGUoKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMucGlwZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS51bnBpcGUgPSBmdW5jdGlvbiB1bnBpcGUoKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMudW5waXBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBPcHRpb25zTWFuYWdlcjsiLCJ2YXIgRW50aXR5ID0gcmVxdWlyZSgnLi9FbnRpdHknKTtcbnZhciBTcGVjUGFyc2VyID0gcmVxdWlyZSgnLi9TcGVjUGFyc2VyJyk7XG5mdW5jdGlvbiBSZW5kZXJOb2RlKG9iamVjdCkge1xuICAgIHRoaXMuX29iamVjdCA9IG51bGw7XG4gICAgdGhpcy5fY2hpbGQgPSBudWxsO1xuICAgIHRoaXMuX2hhc011bHRpcGxlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLl9pc1JlbmRlcmFibGUgPSBmYWxzZTtcbiAgICB0aGlzLl9pc01vZGlmaWVyID0gZmFsc2U7XG4gICAgdGhpcy5fcmVzdWx0Q2FjaGUgPSB7fTtcbiAgICB0aGlzLl9wcmV2UmVzdWx0cyA9IHt9O1xuICAgIHRoaXMuX2NoaWxkUmVzdWx0ID0gbnVsbDtcbiAgICBpZiAob2JqZWN0KVxuICAgICAgICB0aGlzLnNldChvYmplY3QpO1xufVxuUmVuZGVyTm9kZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkKGNoaWxkKSB7XG4gICAgdmFyIGNoaWxkTm9kZSA9IGNoaWxkIGluc3RhbmNlb2YgUmVuZGVyTm9kZSA/IGNoaWxkIDogbmV3IFJlbmRlck5vZGUoY2hpbGQpO1xuICAgIGlmICh0aGlzLl9jaGlsZCBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICB0aGlzLl9jaGlsZC5wdXNoKGNoaWxkTm9kZSk7XG4gICAgZWxzZSBpZiAodGhpcy5fY2hpbGQpIHtcbiAgICAgICAgdGhpcy5fY2hpbGQgPSBbXG4gICAgICAgICAgICB0aGlzLl9jaGlsZCxcbiAgICAgICAgICAgIGNoaWxkTm9kZVxuICAgICAgICBdO1xuICAgICAgICB0aGlzLl9oYXNNdWx0aXBsZUNoaWxkcmVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fY2hpbGRSZXN1bHQgPSBbXTtcbiAgICB9IGVsc2VcbiAgICAgICAgdGhpcy5fY2hpbGQgPSBjaGlsZE5vZGU7XG4gICAgcmV0dXJuIGNoaWxkTm9kZTtcbn07XG5SZW5kZXJOb2RlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29iamVjdCB8fCAodGhpcy5faGFzTXVsdGlwbGVDaGlsZHJlbiA/IG51bGwgOiB0aGlzLl9jaGlsZCA/IHRoaXMuX2NoaWxkLmdldCgpIDogbnVsbCk7XG59O1xuUmVuZGVyTm9kZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KGNoaWxkKSB7XG4gICAgdGhpcy5fY2hpbGRSZXN1bHQgPSBudWxsO1xuICAgIHRoaXMuX2hhc011bHRpcGxlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLl9pc1JlbmRlcmFibGUgPSBjaGlsZC5yZW5kZXIgPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy5faXNNb2RpZmllciA9IGNoaWxkLm1vZGlmeSA/IHRydWUgOiBmYWxzZTtcbiAgICB0aGlzLl9vYmplY3QgPSBjaGlsZDtcbiAgICB0aGlzLl9jaGlsZCA9IG51bGw7XG4gICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgUmVuZGVyTm9kZSlcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIHRoaXM7XG59O1xuUmVuZGVyTm9kZS5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgdmFyIHJlc3VsdCA9IG51bGw7XG4gICAgdmFyIHRhcmdldCA9IHRoaXMuZ2V0KCk7XG4gICAgaWYgKHRhcmdldCAmJiB0YXJnZXQuZ2V0U2l6ZSlcbiAgICAgICAgcmVzdWx0ID0gdGFyZ2V0LmdldFNpemUoKTtcbiAgICBpZiAoIXJlc3VsdCAmJiB0aGlzLl9jaGlsZCAmJiB0aGlzLl9jaGlsZC5nZXRTaXplKVxuICAgICAgICByZXN1bHQgPSB0aGlzLl9jaGlsZC5nZXRTaXplKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5mdW5jdGlvbiBfYXBwbHlDb21taXQoc3BlYywgY29udGV4dCwgY2FjaGVTdG9yYWdlKSB7XG4gICAgdmFyIHJlc3VsdCA9IFNwZWNQYXJzZXIucGFyc2Uoc3BlYywgY29udGV4dCk7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhyZXN1bHQpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaWQgPSBrZXlzW2ldO1xuICAgICAgICB2YXIgY2hpbGROb2RlID0gRW50aXR5LmdldChpZCk7XG4gICAgICAgIHZhciBjb21taXRQYXJhbXMgPSByZXN1bHRbaWRdO1xuICAgICAgICBjb21taXRQYXJhbXMuYWxsb2NhdG9yID0gY29udGV4dC5hbGxvY2F0b3I7XG4gICAgICAgIHZhciBjb21taXRSZXN1bHQgPSBjaGlsZE5vZGUuY29tbWl0KGNvbW1pdFBhcmFtcyk7XG4gICAgICAgIGlmIChjb21taXRSZXN1bHQpXG4gICAgICAgICAgICBfYXBwbHlDb21taXQoY29tbWl0UmVzdWx0LCBjb250ZXh0LCBjYWNoZVN0b3JhZ2UpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBjYWNoZVN0b3JhZ2VbaWRdID0gY29tbWl0UGFyYW1zO1xuICAgIH1cbn1cblJlbmRlck5vZGUucHJvdG90eXBlLmNvbW1pdCA9IGZ1bmN0aW9uIGNvbW1pdChjb250ZXh0KSB7XG4gICAgdmFyIHByZXZLZXlzID0gT2JqZWN0LmtleXModGhpcy5fcHJldlJlc3VsdHMpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJldktleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGlkID0gcHJldktleXNbaV07XG4gICAgICAgIGlmICh0aGlzLl9yZXN1bHRDYWNoZVtpZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIG9iamVjdCA9IEVudGl0eS5nZXQoaWQpO1xuICAgICAgICAgICAgaWYgKG9iamVjdC5jbGVhbnVwKVxuICAgICAgICAgICAgICAgIG9iamVjdC5jbGVhbnVwKGNvbnRleHQuYWxsb2NhdG9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9wcmV2UmVzdWx0cyA9IHRoaXMuX3Jlc3VsdENhY2hlO1xuICAgIHRoaXMuX3Jlc3VsdENhY2hlID0ge307XG4gICAgX2FwcGx5Q29tbWl0KHRoaXMucmVuZGVyKCksIGNvbnRleHQsIHRoaXMuX3Jlc3VsdENhY2hlKTtcbn07XG5SZW5kZXJOb2RlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMuX2lzUmVuZGVyYWJsZSlcbiAgICAgICAgcmV0dXJuIHRoaXMuX29iamVjdC5yZW5kZXIoKTtcbiAgICB2YXIgcmVzdWx0ID0gbnVsbDtcbiAgICBpZiAodGhpcy5faGFzTXVsdGlwbGVDaGlsZHJlbikge1xuICAgICAgICByZXN1bHQgPSB0aGlzLl9jaGlsZFJlc3VsdDtcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5fY2hpbGQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdFtpXSA9IGNoaWxkcmVuW2ldLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLl9jaGlsZClcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5fY2hpbGQucmVuZGVyKCk7XG4gICAgcmV0dXJuIHRoaXMuX2lzTW9kaWZpZXIgPyB0aGlzLl9vYmplY3QubW9kaWZ5KHJlc3VsdCkgOiByZXN1bHQ7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBSZW5kZXJOb2RlOyIsInZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCcuL1RyYW5zZm9ybScpO1xuZnVuY3Rpb24gU3BlY1BhcnNlcigpIHtcbiAgICB0aGlzLnJlc3VsdCA9IHt9O1xufVxuU3BlY1BhcnNlci5faW5zdGFuY2UgPSBuZXcgU3BlY1BhcnNlcigpO1xuU3BlY1BhcnNlci5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKHNwZWMsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gU3BlY1BhcnNlci5faW5zdGFuY2UucGFyc2Uoc3BlYywgY29udGV4dCk7XG59O1xuU3BlY1BhcnNlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZShzcGVjLCBjb250ZXh0KSB7XG4gICAgdGhpcy5yZXNldCgpO1xuICAgIHRoaXMuX3BhcnNlU3BlYyhzcGVjLCBjb250ZXh0LCBUcmFuc2Zvcm0uaWRlbnRpdHkpO1xuICAgIHJldHVybiB0aGlzLnJlc3VsdDtcbn07XG5TcGVjUGFyc2VyLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIHRoaXMucmVzdWx0ID0ge307XG59O1xuZnVuY3Rpb24gX3ZlY0luQ29udGV4dCh2LCBtKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgdlswXSAqIG1bMF0gKyB2WzFdICogbVs0XSArIHZbMl0gKiBtWzhdLFxuICAgICAgICB2WzBdICogbVsxXSArIHZbMV0gKiBtWzVdICsgdlsyXSAqIG1bOV0sXG4gICAgICAgIHZbMF0gKiBtWzJdICsgdlsxXSAqIG1bNl0gKyB2WzJdICogbVsxMF1cbiAgICBdO1xufVxudmFyIF96ZXJvWmVybyA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF07XG5TcGVjUGFyc2VyLnByb3RvdHlwZS5fcGFyc2VTcGVjID0gZnVuY3Rpb24gX3BhcnNlU3BlYyhzcGVjLCBwYXJlbnRDb250ZXh0LCBzaXplQ29udGV4dCkge1xuICAgIHZhciBpZDtcbiAgICB2YXIgdGFyZ2V0O1xuICAgIHZhciB0cmFuc2Zvcm07XG4gICAgdmFyIG9wYWNpdHk7XG4gICAgdmFyIG9yaWdpbjtcbiAgICB2YXIgYWxpZ247XG4gICAgdmFyIHNpemU7XG4gICAgaWYgKHR5cGVvZiBzcGVjID09PSAnbnVtYmVyJykge1xuICAgICAgICBpZCA9IHNwZWM7XG4gICAgICAgIHRyYW5zZm9ybSA9IHBhcmVudENvbnRleHQudHJhbnNmb3JtO1xuICAgICAgICBhbGlnbiA9IHBhcmVudENvbnRleHQuYWxpZ24gfHwgX3plcm9aZXJvO1xuICAgICAgICBpZiAocGFyZW50Q29udGV4dC5zaXplICYmIGFsaWduICYmIChhbGlnblswXSB8fCBhbGlnblsxXSkpIHtcbiAgICAgICAgICAgIHZhciBhbGlnbkFkanVzdCA9IFtcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25bMF0gKiBwYXJlbnRDb250ZXh0LnNpemVbMF0sXG4gICAgICAgICAgICAgICAgICAgIGFsaWduWzFdICogcGFyZW50Q29udGV4dC5zaXplWzFdLFxuICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHRyYW5zZm9ybSA9IFRyYW5zZm9ybS50aGVuTW92ZSh0cmFuc2Zvcm0sIF92ZWNJbkNvbnRleHQoYWxpZ25BZGp1c3QsIHNpemVDb250ZXh0KSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXN1bHRbaWRdID0ge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2Zvcm0sXG4gICAgICAgICAgICBvcGFjaXR5OiBwYXJlbnRDb250ZXh0Lm9wYWNpdHksXG4gICAgICAgICAgICBvcmlnaW46IHBhcmVudENvbnRleHQub3JpZ2luIHx8IF96ZXJvWmVybyxcbiAgICAgICAgICAgIGFsaWduOiBwYXJlbnRDb250ZXh0LmFsaWduIHx8IF96ZXJvWmVybyxcbiAgICAgICAgICAgIHNpemU6IHBhcmVudENvbnRleHQuc2l6ZVxuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAoIXNwZWMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoc3BlYyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3BlYy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fcGFyc2VTcGVjKHNwZWNbaV0sIHBhcmVudENvbnRleHQsIHNpemVDb250ZXh0KTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldCA9IHNwZWMudGFyZ2V0O1xuICAgICAgICB0cmFuc2Zvcm0gPSBwYXJlbnRDb250ZXh0LnRyYW5zZm9ybTtcbiAgICAgICAgb3BhY2l0eSA9IHBhcmVudENvbnRleHQub3BhY2l0eTtcbiAgICAgICAgb3JpZ2luID0gcGFyZW50Q29udGV4dC5vcmlnaW47XG4gICAgICAgIGFsaWduID0gcGFyZW50Q29udGV4dC5hbGlnbjtcbiAgICAgICAgc2l6ZSA9IHBhcmVudENvbnRleHQuc2l6ZTtcbiAgICAgICAgdmFyIG5leHRTaXplQ29udGV4dCA9IHNpemVDb250ZXh0O1xuICAgICAgICBpZiAoc3BlYy5vcGFjaXR5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBvcGFjaXR5ID0gcGFyZW50Q29udGV4dC5vcGFjaXR5ICogc3BlYy5vcGFjaXR5O1xuICAgICAgICBpZiAoc3BlYy50cmFuc2Zvcm0pXG4gICAgICAgICAgICB0cmFuc2Zvcm0gPSBUcmFuc2Zvcm0ubXVsdGlwbHkocGFyZW50Q29udGV4dC50cmFuc2Zvcm0sIHNwZWMudHJhbnNmb3JtKTtcbiAgICAgICAgaWYgKHNwZWMub3JpZ2luKSB7XG4gICAgICAgICAgICBvcmlnaW4gPSBzcGVjLm9yaWdpbjtcbiAgICAgICAgICAgIG5leHRTaXplQ29udGV4dCA9IHBhcmVudENvbnRleHQudHJhbnNmb3JtO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcGVjLmFsaWduKVxuICAgICAgICAgICAgYWxpZ24gPSBzcGVjLmFsaWduO1xuICAgICAgICBpZiAoc3BlYy5zaXplIHx8IHNwZWMucHJvcG9ydGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBwYXJlbnRTaXplID0gc2l6ZTtcbiAgICAgICAgICAgIHNpemUgPSBbXG4gICAgICAgICAgICAgICAgc2l6ZVswXSxcbiAgICAgICAgICAgICAgICBzaXplWzFdXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaWYgKHNwZWMuc2l6ZSkge1xuICAgICAgICAgICAgICAgIGlmIChzcGVjLnNpemVbMF0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgc2l6ZVswXSA9IHNwZWMuc2l6ZVswXTtcbiAgICAgICAgICAgICAgICBpZiAoc3BlYy5zaXplWzFdICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgIHNpemVbMV0gPSBzcGVjLnNpemVbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3BlYy5wcm9wb3J0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChzcGVjLnByb3BvcnRpb25zWzBdICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgIHNpemVbMF0gPSBzaXplWzBdICogc3BlYy5wcm9wb3J0aW9uc1swXTtcbiAgICAgICAgICAgICAgICBpZiAoc3BlYy5wcm9wb3J0aW9uc1sxXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICBzaXplWzFdID0gc2l6ZVsxXSAqIHNwZWMucHJvcG9ydGlvbnNbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGFyZW50U2l6ZSkge1xuICAgICAgICAgICAgICAgIGlmIChhbGlnbiAmJiAoYWxpZ25bMF0gfHwgYWxpZ25bMV0pKVxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gPSBUcmFuc2Zvcm0udGhlbk1vdmUodHJhbnNmb3JtLCBfdmVjSW5Db250ZXh0KFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduWzBdICogcGFyZW50U2l6ZVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduWzFdICogcGFyZW50U2l6ZVsxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICAgICAgXSwgc2l6ZUNvbnRleHQpKTtcbiAgICAgICAgICAgICAgICBpZiAob3JpZ2luICYmIChvcmlnaW5bMF0gfHwgb3JpZ2luWzFdKSlcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtID0gVHJhbnNmb3JtLm1vdmVUaGVuKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIC1vcmlnaW5bMF0gKiBzaXplWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgLW9yaWdpblsxXSAqIHNpemVbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgICAgIF0sIHRyYW5zZm9ybSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXh0U2l6ZUNvbnRleHQgPSBwYXJlbnRDb250ZXh0LnRyYW5zZm9ybTtcbiAgICAgICAgICAgIG9yaWdpbiA9IG51bGw7XG4gICAgICAgICAgICBhbGlnbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcGFyc2VTcGVjKHRhcmdldCwge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2Zvcm0sXG4gICAgICAgICAgICBvcGFjaXR5OiBvcGFjaXR5LFxuICAgICAgICAgICAgb3JpZ2luOiBvcmlnaW4sXG4gICAgICAgICAgICBhbGlnbjogYWxpZ24sXG4gICAgICAgICAgICBzaXplOiBzaXplXG4gICAgICAgIH0sIG5leHRTaXplQ29udGV4dCk7XG4gICAgfVxufTtcbm1vZHVsZS5leHBvcnRzID0gU3BlY1BhcnNlcjsiLCJ2YXIgRWxlbWVudE91dHB1dCA9IHJlcXVpcmUoJy4vRWxlbWVudE91dHB1dCcpO1xuZnVuY3Rpb24gU3VyZmFjZShvcHRpb25zKSB7XG4gICAgRWxlbWVudE91dHB1dC5jYWxsKHRoaXMpO1xuICAgIHRoaXMub3B0aW9ucyA9IHt9O1xuICAgIHRoaXMucHJvcGVydGllcyA9IHt9O1xuICAgIHRoaXMuYXR0cmlidXRlcyA9IHt9O1xuICAgIHRoaXMuY29udGVudCA9ICcnO1xuICAgIHRoaXMuY2xhc3NMaXN0ID0gW107XG4gICAgdGhpcy5zaXplID0gbnVsbDtcbiAgICB0aGlzLl9jbGFzc2VzRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX3N0eWxlc0RpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl9hdHRyaWJ1dGVzRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX3NpemVEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl90cnVlU2l6ZUNoZWNrID0gdHJ1ZTtcbiAgICB0aGlzLl9kaXJ0eUNsYXNzZXMgPSBbXTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuX2N1cnJlbnRUYXJnZXQgPSBudWxsO1xufVxuU3VyZmFjZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVsZW1lbnRPdXRwdXQucHJvdG90eXBlKTtcblN1cmZhY2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3VyZmFjZTtcblN1cmZhY2UucHJvdG90eXBlLmVsZW1lbnRUeXBlID0gJ2Rpdic7XG5TdXJmYWNlLnByb3RvdHlwZS5lbGVtZW50Q2xhc3MgPSAnZmFtb3VzLXN1cmZhY2UnO1xuU3VyZmFjZS5wcm90b3R5cGUuc2V0QXR0cmlidXRlcyA9IGZ1bmN0aW9uIHNldEF0dHJpYnV0ZXMoYXR0cmlidXRlcykge1xuICAgIGZvciAodmFyIG4gaW4gYXR0cmlidXRlcykge1xuICAgICAgICBpZiAobiA9PT0gJ3N0eWxlJylcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHNldCBzdHlsZXMgdmlhIFwic2V0QXR0cmlidXRlc1wiIGFzIGl0IHdpbGwgYnJlYWsgRmFtby51cy4gIFVzZSBcInNldFByb3BlcnRpZXNcIiBpbnN0ZWFkLicpO1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXNbbl0gPSBhdHRyaWJ1dGVzW25dO1xuICAgIH1cbiAgICB0aGlzLl9hdHRyaWJ1dGVzRGlydHkgPSB0cnVlO1xufTtcblN1cmZhY2UucHJvdG90eXBlLmdldEF0dHJpYnV0ZXMgPSBmdW5jdGlvbiBnZXRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZXM7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuc2V0UHJvcGVydGllcyA9IGZ1bmN0aW9uIHNldFByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGZvciAodmFyIG4gaW4gcHJvcGVydGllcykge1xuICAgICAgICB0aGlzLnByb3BlcnRpZXNbbl0gPSBwcm9wZXJ0aWVzW25dO1xuICAgIH1cbiAgICB0aGlzLl9zdHlsZXNEaXJ0eSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuZ2V0UHJvcGVydGllcyA9IGZ1bmN0aW9uIGdldFByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcGVydGllcztcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5hZGRDbGFzcyA9IGZ1bmN0aW9uIGFkZENsYXNzKGNsYXNzTmFtZSkge1xuICAgIGlmICh0aGlzLmNsYXNzTGlzdC5pbmRleE9mKGNsYXNzTmFtZSkgPCAwKSB7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnB1c2goY2xhc3NOYW1lKTtcbiAgICAgICAgdGhpcy5fY2xhc3Nlc0RpcnR5ID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbiByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHtcbiAgICB2YXIgaSA9IHRoaXMuY2xhc3NMaXN0LmluZGV4T2YoY2xhc3NOYW1lKTtcbiAgICBpZiAoaSA+PSAwKSB7XG4gICAgICAgIHRoaXMuX2RpcnR5Q2xhc3Nlcy5wdXNoKHRoaXMuY2xhc3NMaXN0LnNwbGljZShpLCAxKVswXSk7XG4gICAgICAgIHRoaXMuX2NsYXNzZXNEaXJ0eSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblN1cmZhY2UucHJvdG90eXBlLnRvZ2dsZUNsYXNzID0gZnVuY3Rpb24gdG9nZ2xlQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgdmFyIGkgPSB0aGlzLmNsYXNzTGlzdC5pbmRleE9mKGNsYXNzTmFtZSk7XG4gICAgaWYgKGkgPj0gMCkge1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKGNsYXNzTmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhjbGFzc05hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5zZXRDbGFzc2VzID0gZnVuY3Rpb24gc2V0Q2xhc3NlcyhjbGFzc0xpc3QpIHtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIHJlbW92YWwgPSBbXTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5jbGFzc0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNsYXNzTGlzdC5pbmRleE9mKHRoaXMuY2xhc3NMaXN0W2ldKSA8IDApXG4gICAgICAgICAgICByZW1vdmFsLnB1c2godGhpcy5jbGFzc0xpc3RbaV0pO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgcmVtb3ZhbC5sZW5ndGg7IGkrKylcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhyZW1vdmFsW2ldKTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgY2xhc3NMaXN0Lmxlbmd0aDsgaSsrKVxuICAgICAgICB0aGlzLmFkZENsYXNzKGNsYXNzTGlzdFtpXSk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuZ2V0Q2xhc3NMaXN0ID0gZnVuY3Rpb24gZ2V0Q2xhc3NMaXN0KCkge1xuICAgIHJldHVybiB0aGlzLmNsYXNzTGlzdDtcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5zZXRDb250ZW50ID0gZnVuY3Rpb24gc2V0Q29udGVudChjb250ZW50KSB7XG4gICAgaWYgKHRoaXMuY29udGVudCAhPT0gY29udGVudCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB0aGlzLl9jb250ZW50RGlydHkgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5nZXRDb250ZW50ID0gZnVuY3Rpb24gZ2V0Q29udGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50O1xufTtcblN1cmZhY2UucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5zaXplKVxuICAgICAgICB0aGlzLnNldFNpemUob3B0aW9ucy5zaXplKTtcbiAgICBpZiAob3B0aW9ucy5jbGFzc2VzKVxuICAgICAgICB0aGlzLnNldENsYXNzZXMob3B0aW9ucy5jbGFzc2VzKTtcbiAgICBpZiAob3B0aW9ucy5wcm9wZXJ0aWVzKVxuICAgICAgICB0aGlzLnNldFByb3BlcnRpZXMob3B0aW9ucy5wcm9wZXJ0aWVzKTtcbiAgICBpZiAob3B0aW9ucy5hdHRyaWJ1dGVzKVxuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZXMob3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgICBpZiAob3B0aW9ucy5jb250ZW50KVxuICAgICAgICB0aGlzLnNldENvbnRlbnQob3B0aW9ucy5jb250ZW50KTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5mdW5jdGlvbiBfY2xlYW51cENsYXNzZXModGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9kaXJ0eUNsYXNzZXMubGVuZ3RoOyBpKyspXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2RpcnR5Q2xhc3Nlc1tpXSk7XG4gICAgdGhpcy5fZGlydHlDbGFzc2VzID0gW107XG59XG5mdW5jdGlvbiBfYXBwbHlTdHlsZXModGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgbiBpbiB0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgICAgdGFyZ2V0LnN0eWxlW25dID0gdGhpcy5wcm9wZXJ0aWVzW25dO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9jbGVhbnVwU3R5bGVzKHRhcmdldCkge1xuICAgIGZvciAodmFyIG4gaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XG4gICAgICAgIHRhcmdldC5zdHlsZVtuXSA9ICcnO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9hcHBseUF0dHJpYnV0ZXModGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgbiBpbiB0aGlzLmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShuLCB0aGlzLmF0dHJpYnV0ZXNbbl0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9jbGVhbnVwQXR0cmlidXRlcyh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBuIGluIHRoaXMuYXR0cmlidXRlcykge1xuICAgICAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKG4pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF94eU5vdEVxdWFscyhhLCBiKSB7XG4gICAgcmV0dXJuIGEgJiYgYiA/IGFbMF0gIT09IGJbMF0gfHwgYVsxXSAhPT0gYlsxXSA6IGEgIT09IGI7XG59XG5TdXJmYWNlLnByb3RvdHlwZS5zZXR1cCA9IGZ1bmN0aW9uIHNldHVwKGFsbG9jYXRvcikge1xuICAgIHZhciB0YXJnZXQgPSBhbGxvY2F0b3IuYWxsb2NhdGUodGhpcy5lbGVtZW50VHlwZSk7XG4gICAgaWYgKHRoaXMuZWxlbWVudENsYXNzKSB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRDbGFzcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZWxlbWVudENsYXNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQodGhpcy5lbGVtZW50Q2xhc3NbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQodGhpcy5lbGVtZW50Q2xhc3MpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgdGhpcy5hdHRhY2godGFyZ2V0KTtcbiAgICB0aGlzLl9vcGFjaXR5ID0gbnVsbDtcbiAgICB0aGlzLl9jdXJyZW50VGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMuX3N0eWxlc0RpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl9jbGFzc2VzRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX2F0dHJpYnV0ZXNEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fc2l6ZURpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl9jb250ZW50RGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX29yaWdpbkRpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl90cmFuc2Zvcm1EaXJ0eSA9IHRydWU7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuY29tbWl0ID0gZnVuY3Rpb24gY29tbWl0KGNvbnRleHQpIHtcbiAgICBpZiAoIXRoaXMuX2N1cnJlbnRUYXJnZXQpXG4gICAgICAgIHRoaXMuc2V0dXAoY29udGV4dC5hbGxvY2F0b3IpO1xuICAgIHZhciB0YXJnZXQgPSB0aGlzLl9jdXJyZW50VGFyZ2V0O1xuICAgIHZhciBzaXplID0gY29udGV4dC5zaXplO1xuICAgIGlmICh0aGlzLl9jbGFzc2VzRGlydHkpIHtcbiAgICAgICAgX2NsZWFudXBDbGFzc2VzLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgdmFyIGNsYXNzTGlzdCA9IHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3NMaXN0Lmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoY2xhc3NMaXN0W2ldKTtcbiAgICAgICAgdGhpcy5fY2xhc3Nlc0RpcnR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3RydWVTaXplQ2hlY2sgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc3R5bGVzRGlydHkpIHtcbiAgICAgICAgX2FwcGx5U3R5bGVzLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgdGhpcy5fc3R5bGVzRGlydHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fdHJ1ZVNpemVDaGVjayA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLl9hdHRyaWJ1dGVzRGlydHkpIHtcbiAgICAgICAgX2FwcGx5QXR0cmlidXRlcy5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgICAgIHRoaXMuX2F0dHJpYnV0ZXNEaXJ0eSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl90cnVlU2l6ZUNoZWNrID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2l6ZSkge1xuICAgICAgICB2YXIgb3JpZ1NpemUgPSBjb250ZXh0LnNpemU7XG4gICAgICAgIHNpemUgPSBbXG4gICAgICAgICAgICB0aGlzLnNpemVbMF0sXG4gICAgICAgICAgICB0aGlzLnNpemVbMV1cbiAgICAgICAgXTtcbiAgICAgICAgaWYgKHNpemVbMF0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHNpemVbMF0gPSBvcmlnU2l6ZVswXTtcbiAgICAgICAgaWYgKHNpemVbMV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHNpemVbMV0gPSBvcmlnU2l6ZVsxXTtcbiAgICAgICAgaWYgKHNpemVbMF0gPT09IHRydWUgfHwgc2l6ZVsxXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKHNpemVbMF0gPT09IHRydWUgJiYgKHRoaXMuX3RydWVTaXplQ2hlY2sgfHwgdGhpcy5fc2l6ZVswXSA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgd2lkdGggPSB0YXJnZXQub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NpemUgJiYgdGhpcy5fc2l6ZVswXSAhPT0gd2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2l6ZVswXSA9IHdpZHRoO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaXplRGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzaXplWzBdID0gd2lkdGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zaXplKVxuICAgICAgICAgICAgICAgICAgICBzaXplWzBdID0gdGhpcy5fc2l6ZVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzaXplWzFdID09PSB0cnVlICYmICh0aGlzLl90cnVlU2l6ZUNoZWNrIHx8IHRoaXMuX3NpemVbMV0gPT09IDApKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhlaWdodCA9IHRhcmdldC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NpemUgJiYgdGhpcy5fc2l6ZVsxXSAhPT0gaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NpemVbMV0gPSBoZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NpemVEaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNpemVbMV0gPSBoZWlnaHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zaXplKVxuICAgICAgICAgICAgICAgICAgICBzaXplWzFdID0gdGhpcy5fc2l6ZVsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RydWVTaXplQ2hlY2sgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoX3h5Tm90RXF1YWxzKHRoaXMuX3NpemUsIHNpemUpKSB7XG4gICAgICAgIGlmICghdGhpcy5fc2l6ZSlcbiAgICAgICAgICAgIHRoaXMuX3NpemUgPSBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdO1xuICAgICAgICB0aGlzLl9zaXplWzBdID0gc2l6ZVswXTtcbiAgICAgICAgdGhpcy5fc2l6ZVsxXSA9IHNpemVbMV07XG4gICAgICAgIHRoaXMuX3NpemVEaXJ0eSA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zaXplRGlydHkpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NpemUpIHtcbiAgICAgICAgICAgIHRhcmdldC5zdHlsZS53aWR0aCA9IHRoaXMuc2l6ZSAmJiB0aGlzLnNpemVbMF0gPT09IHRydWUgPyAnJyA6IHRoaXMuX3NpemVbMF0gKyAncHgnO1xuICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IHRoaXMuc2l6ZSAmJiB0aGlzLnNpemVbMV0gPT09IHRydWUgPyAnJyA6IHRoaXMuX3NpemVbMV0gKyAncHgnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3Jlc2l6ZScpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fY29udGVudERpcnR5KSB7XG4gICAgICAgIHRoaXMuZGVwbG95KHRhcmdldCk7XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2RlcGxveScpO1xuICAgICAgICB0aGlzLl9jb250ZW50RGlydHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fdHJ1ZVNpemVDaGVjayA9IHRydWU7XG4gICAgfVxuICAgIEVsZW1lbnRPdXRwdXQucHJvdG90eXBlLmNvbW1pdC5jYWxsKHRoaXMsIGNvbnRleHQpO1xufTtcblN1cmZhY2UucHJvdG90eXBlLmNsZWFudXAgPSBmdW5jdGlvbiBjbGVhbnVwKGFsbG9jYXRvcikge1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5fY3VycmVudFRhcmdldDtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdyZWNhbGwnKTtcbiAgICB0aGlzLnJlY2FsbCh0YXJnZXQpO1xuICAgIHRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHRhcmdldC5zdHlsZS5vcGFjaXR5ID0gJyc7XG4gICAgdGFyZ2V0LnN0eWxlLndpZHRoID0gJyc7XG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9ICcnO1xuICAgIF9jbGVhbnVwU3R5bGVzLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICBfY2xlYW51cEF0dHJpYnV0ZXMuY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgIHZhciBjbGFzc0xpc3QgPSB0aGlzLmdldENsYXNzTGlzdCgpO1xuICAgIF9jbGVhbnVwQ2xhc3Nlcy5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgZm9yIChpID0gMDsgaSA8IGNsYXNzTGlzdC5sZW5ndGg7IGkrKylcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NMaXN0W2ldKTtcbiAgICBpZiAodGhpcy5lbGVtZW50Q2xhc3MpIHtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudENsYXNzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmVsZW1lbnRDbGFzcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZWxlbWVudENsYXNzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZWxlbWVudENsYXNzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmRldGFjaCh0YXJnZXQpO1xuICAgIHRoaXMuX2N1cnJlbnRUYXJnZXQgPSBudWxsO1xuICAgIGFsbG9jYXRvci5kZWFsbG9jYXRlKHRhcmdldCk7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuZGVwbG95ID0gZnVuY3Rpb24gZGVwbG95KHRhcmdldCkge1xuICAgIHZhciBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCk7XG4gICAgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICAgIHdoaWxlICh0YXJnZXQuaGFzQ2hpbGROb2RlcygpKVxuICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUNoaWxkKHRhcmdldC5maXJzdENoaWxkKTtcbiAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgIH0gZWxzZVxuICAgICAgICB0YXJnZXQuaW5uZXJIVE1MID0gY29udGVudDtcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5yZWNhbGwgPSBmdW5jdGlvbiByZWNhbGwodGFyZ2V0KSB7XG4gICAgdmFyIGRmID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHdoaWxlICh0YXJnZXQuaGFzQ2hpbGROb2RlcygpKVxuICAgICAgICBkZi5hcHBlbmRDaGlsZCh0YXJnZXQuZmlyc3RDaGlsZCk7XG4gICAgdGhpcy5zZXRDb250ZW50KGRmKTtcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gZ2V0U2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZSA/IHRoaXMuX3NpemUgOiB0aGlzLnNpemU7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uIHNldFNpemUoc2l6ZSkge1xuICAgIHRoaXMuc2l6ZSA9IHNpemUgPyBbXG4gICAgICAgIHNpemVbMF0sXG4gICAgICAgIHNpemVbMV1cbiAgICBdIDogbnVsbDtcbiAgICB0aGlzLl9zaXplRGlydHkgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xufTtcbm1vZHVsZS5leHBvcnRzID0gU3VyZmFjZTsiLCJ2YXIgVHJhbnNmb3JtID0ge307XG5UcmFuc2Zvcm0ucHJlY2lzaW9uID0gMC4wMDAwMDE7XG5UcmFuc2Zvcm0uaWRlbnRpdHkgPSBbXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMVxuXTtcblRyYW5zZm9ybS5tdWx0aXBseTR4NCA9IGZ1bmN0aW9uIG11bHRpcGx5NHg0KGEsIGIpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBhWzBdICogYlswXSArIGFbNF0gKiBiWzFdICsgYVs4XSAqIGJbMl0gKyBhWzEyXSAqIGJbM10sXG4gICAgICAgIGFbMV0gKiBiWzBdICsgYVs1XSAqIGJbMV0gKyBhWzldICogYlsyXSArIGFbMTNdICogYlszXSxcbiAgICAgICAgYVsyXSAqIGJbMF0gKyBhWzZdICogYlsxXSArIGFbMTBdICogYlsyXSArIGFbMTRdICogYlszXSxcbiAgICAgICAgYVszXSAqIGJbMF0gKyBhWzddICogYlsxXSArIGFbMTFdICogYlsyXSArIGFbMTVdICogYlszXSxcbiAgICAgICAgYVswXSAqIGJbNF0gKyBhWzRdICogYls1XSArIGFbOF0gKiBiWzZdICsgYVsxMl0gKiBiWzddLFxuICAgICAgICBhWzFdICogYls0XSArIGFbNV0gKiBiWzVdICsgYVs5XSAqIGJbNl0gKyBhWzEzXSAqIGJbN10sXG4gICAgICAgIGFbMl0gKiBiWzRdICsgYVs2XSAqIGJbNV0gKyBhWzEwXSAqIGJbNl0gKyBhWzE0XSAqIGJbN10sXG4gICAgICAgIGFbM10gKiBiWzRdICsgYVs3XSAqIGJbNV0gKyBhWzExXSAqIGJbNl0gKyBhWzE1XSAqIGJbN10sXG4gICAgICAgIGFbMF0gKiBiWzhdICsgYVs0XSAqIGJbOV0gKyBhWzhdICogYlsxMF0gKyBhWzEyXSAqIGJbMTFdLFxuICAgICAgICBhWzFdICogYls4XSArIGFbNV0gKiBiWzldICsgYVs5XSAqIGJbMTBdICsgYVsxM10gKiBiWzExXSxcbiAgICAgICAgYVsyXSAqIGJbOF0gKyBhWzZdICogYls5XSArIGFbMTBdICogYlsxMF0gKyBhWzE0XSAqIGJbMTFdLFxuICAgICAgICBhWzNdICogYls4XSArIGFbN10gKiBiWzldICsgYVsxMV0gKiBiWzEwXSArIGFbMTVdICogYlsxMV0sXG4gICAgICAgIGFbMF0gKiBiWzEyXSArIGFbNF0gKiBiWzEzXSArIGFbOF0gKiBiWzE0XSArIGFbMTJdICogYlsxNV0sXG4gICAgICAgIGFbMV0gKiBiWzEyXSArIGFbNV0gKiBiWzEzXSArIGFbOV0gKiBiWzE0XSArIGFbMTNdICogYlsxNV0sXG4gICAgICAgIGFbMl0gKiBiWzEyXSArIGFbNl0gKiBiWzEzXSArIGFbMTBdICogYlsxNF0gKyBhWzE0XSAqIGJbMTVdLFxuICAgICAgICBhWzNdICogYlsxMl0gKyBhWzddICogYlsxM10gKyBhWzExXSAqIGJbMTRdICsgYVsxNV0gKiBiWzE1XVxuICAgIF07XG59O1xuVHJhbnNmb3JtLm11bHRpcGx5ID0gZnVuY3Rpb24gbXVsdGlwbHkoYSwgYikge1xuICAgIHJldHVybiBbXG4gICAgICAgIGFbMF0gKiBiWzBdICsgYVs0XSAqIGJbMV0gKyBhWzhdICogYlsyXSxcbiAgICAgICAgYVsxXSAqIGJbMF0gKyBhWzVdICogYlsxXSArIGFbOV0gKiBiWzJdLFxuICAgICAgICBhWzJdICogYlswXSArIGFbNl0gKiBiWzFdICsgYVsxMF0gKiBiWzJdLFxuICAgICAgICAwLFxuICAgICAgICBhWzBdICogYls0XSArIGFbNF0gKiBiWzVdICsgYVs4XSAqIGJbNl0sXG4gICAgICAgIGFbMV0gKiBiWzRdICsgYVs1XSAqIGJbNV0gKyBhWzldICogYls2XSxcbiAgICAgICAgYVsyXSAqIGJbNF0gKyBhWzZdICogYls1XSArIGFbMTBdICogYls2XSxcbiAgICAgICAgMCxcbiAgICAgICAgYVswXSAqIGJbOF0gKyBhWzRdICogYls5XSArIGFbOF0gKiBiWzEwXSxcbiAgICAgICAgYVsxXSAqIGJbOF0gKyBhWzVdICogYls5XSArIGFbOV0gKiBiWzEwXSxcbiAgICAgICAgYVsyXSAqIGJbOF0gKyBhWzZdICogYls5XSArIGFbMTBdICogYlsxMF0sXG4gICAgICAgIDAsXG4gICAgICAgIGFbMF0gKiBiWzEyXSArIGFbNF0gKiBiWzEzXSArIGFbOF0gKiBiWzE0XSArIGFbMTJdLFxuICAgICAgICBhWzFdICogYlsxMl0gKyBhWzVdICogYlsxM10gKyBhWzldICogYlsxNF0gKyBhWzEzXSxcbiAgICAgICAgYVsyXSAqIGJbMTJdICsgYVs2XSAqIGJbMTNdICsgYVsxMF0gKiBiWzE0XSArIGFbMTRdLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0udGhlbk1vdmUgPSBmdW5jdGlvbiB0aGVuTW92ZShtLCB0KSB7XG4gICAgaWYgKCF0WzJdKVxuICAgICAgICB0WzJdID0gMDtcbiAgICByZXR1cm4gW1xuICAgICAgICBtWzBdLFxuICAgICAgICBtWzFdLFxuICAgICAgICBtWzJdLFxuICAgICAgICAwLFxuICAgICAgICBtWzRdLFxuICAgICAgICBtWzVdLFxuICAgICAgICBtWzZdLFxuICAgICAgICAwLFxuICAgICAgICBtWzhdLFxuICAgICAgICBtWzldLFxuICAgICAgICBtWzEwXSxcbiAgICAgICAgMCxcbiAgICAgICAgbVsxMl0gKyB0WzBdLFxuICAgICAgICBtWzEzXSArIHRbMV0sXG4gICAgICAgIG1bMTRdICsgdFsyXSxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLm1vdmVUaGVuID0gZnVuY3Rpb24gbW92ZVRoZW4odiwgbSkge1xuICAgIGlmICghdlsyXSlcbiAgICAgICAgdlsyXSA9IDA7XG4gICAgdmFyIHQwID0gdlswXSAqIG1bMF0gKyB2WzFdICogbVs0XSArIHZbMl0gKiBtWzhdO1xuICAgIHZhciB0MSA9IHZbMF0gKiBtWzFdICsgdlsxXSAqIG1bNV0gKyB2WzJdICogbVs5XTtcbiAgICB2YXIgdDIgPSB2WzBdICogbVsyXSArIHZbMV0gKiBtWzZdICsgdlsyXSAqIG1bMTBdO1xuICAgIHJldHVybiBUcmFuc2Zvcm0udGhlbk1vdmUobSwgW1xuICAgICAgICB0MCxcbiAgICAgICAgdDEsXG4gICAgICAgIHQyXG4gICAgXSk7XG59O1xuVHJhbnNmb3JtLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uIHRyYW5zbGF0ZSh4LCB5LCB6KSB7XG4gICAgaWYgKHogPT09IHVuZGVmaW5lZClcbiAgICAgICAgeiA9IDA7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgeixcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnRoZW5TY2FsZSA9IGZ1bmN0aW9uIHRoZW5TY2FsZShtLCBzKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgc1swXSAqIG1bMF0sXG4gICAgICAgIHNbMV0gKiBtWzFdLFxuICAgICAgICBzWzJdICogbVsyXSxcbiAgICAgICAgMCxcbiAgICAgICAgc1swXSAqIG1bNF0sXG4gICAgICAgIHNbMV0gKiBtWzVdLFxuICAgICAgICBzWzJdICogbVs2XSxcbiAgICAgICAgMCxcbiAgICAgICAgc1swXSAqIG1bOF0sXG4gICAgICAgIHNbMV0gKiBtWzldLFxuICAgICAgICBzWzJdICogbVsxMF0sXG4gICAgICAgIDAsXG4gICAgICAgIHNbMF0gKiBtWzEyXSxcbiAgICAgICAgc1sxXSAqIG1bMTNdLFxuICAgICAgICBzWzJdICogbVsxNF0sXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5zY2FsZSA9IGZ1bmN0aW9uIHNjYWxlKHgsIHksIHopIHtcbiAgICBpZiAoeiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB6ID0gMTtcbiAgICBpZiAoeSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB5ID0geDtcbiAgICByZXR1cm4gW1xuICAgICAgICB4LFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICB5LFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICB6LFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0ucm90YXRlWCA9IGZ1bmN0aW9uIHJvdGF0ZVgodGhldGEpIHtcbiAgICB2YXIgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHJldHVybiBbXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIGNvc1RoZXRhLFxuICAgICAgICBzaW5UaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgLXNpblRoZXRhLFxuICAgICAgICBjb3NUaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnJvdGF0ZVkgPSBmdW5jdGlvbiByb3RhdGVZKHRoZXRhKSB7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICByZXR1cm4gW1xuICAgICAgICBjb3NUaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgLXNpblRoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBzaW5UaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgY29zVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5yb3RhdGVaID0gZnVuY3Rpb24gcm90YXRlWih0aGV0YSkge1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgY29zVGhldGEsXG4gICAgICAgIHNpblRoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAtc2luVGhldGEsXG4gICAgICAgIGNvc1RoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0ucm90YXRlID0gZnVuY3Rpb24gcm90YXRlKHBoaSwgdGhldGEsIHBzaSkge1xuICAgIHZhciBjb3NQaGkgPSBNYXRoLmNvcyhwaGkpO1xuICAgIHZhciBzaW5QaGkgPSBNYXRoLnNpbihwaGkpO1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgdmFyIGNvc1BzaSA9IE1hdGguY29zKHBzaSk7XG4gICAgdmFyIHNpblBzaSA9IE1hdGguc2luKHBzaSk7XG4gICAgdmFyIHJlc3VsdCA9IFtcbiAgICAgICAgICAgIGNvc1RoZXRhICogY29zUHNpLFxuICAgICAgICAgICAgY29zUGhpICogc2luUHNpICsgc2luUGhpICogc2luVGhldGEgKiBjb3NQc2ksXG4gICAgICAgICAgICBzaW5QaGkgKiBzaW5Qc2kgLSBjb3NQaGkgKiBzaW5UaGV0YSAqIGNvc1BzaSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAtY29zVGhldGEgKiBzaW5Qc2ksXG4gICAgICAgICAgICBjb3NQaGkgKiBjb3NQc2kgLSBzaW5QaGkgKiBzaW5UaGV0YSAqIHNpblBzaSxcbiAgICAgICAgICAgIHNpblBoaSAqIGNvc1BzaSArIGNvc1BoaSAqIHNpblRoZXRhICogc2luUHNpLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHNpblRoZXRhLFxuICAgICAgICAgICAgLXNpblBoaSAqIGNvc1RoZXRhLFxuICAgICAgICAgICAgY29zUGhpICogY29zVGhldGEsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMVxuICAgICAgICBdO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuVHJhbnNmb3JtLnJvdGF0ZUF4aXMgPSBmdW5jdGlvbiByb3RhdGVBeGlzKHYsIHRoZXRhKSB7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgdmVyVGhldGEgPSAxIC0gY29zVGhldGE7XG4gICAgdmFyIHh4ViA9IHZbMF0gKiB2WzBdICogdmVyVGhldGE7XG4gICAgdmFyIHh5ViA9IHZbMF0gKiB2WzFdICogdmVyVGhldGE7XG4gICAgdmFyIHh6ViA9IHZbMF0gKiB2WzJdICogdmVyVGhldGE7XG4gICAgdmFyIHl5ViA9IHZbMV0gKiB2WzFdICogdmVyVGhldGE7XG4gICAgdmFyIHl6ViA9IHZbMV0gKiB2WzJdICogdmVyVGhldGE7XG4gICAgdmFyIHp6ViA9IHZbMl0gKiB2WzJdICogdmVyVGhldGE7XG4gICAgdmFyIHhzID0gdlswXSAqIHNpblRoZXRhO1xuICAgIHZhciB5cyA9IHZbMV0gKiBzaW5UaGV0YTtcbiAgICB2YXIgenMgPSB2WzJdICogc2luVGhldGE7XG4gICAgdmFyIHJlc3VsdCA9IFtcbiAgICAgICAgICAgIHh4ViArIGNvc1RoZXRhLFxuICAgICAgICAgICAgeHlWICsgenMsXG4gICAgICAgICAgICB4elYgLSB5cyxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB4eVYgLSB6cyxcbiAgICAgICAgICAgIHl5ViArIGNvc1RoZXRhLFxuICAgICAgICAgICAgeXpWICsgeHMsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgeHpWICsgeXMsXG4gICAgICAgICAgICB5elYgLSB4cyxcbiAgICAgICAgICAgIHp6ViArIGNvc1RoZXRhLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDFcbiAgICAgICAgXTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblRyYW5zZm9ybS5hYm91dE9yaWdpbiA9IGZ1bmN0aW9uIGFib3V0T3JpZ2luKHYsIG0pIHtcbiAgICB2YXIgdDAgPSB2WzBdIC0gKHZbMF0gKiBtWzBdICsgdlsxXSAqIG1bNF0gKyB2WzJdICogbVs4XSk7XG4gICAgdmFyIHQxID0gdlsxXSAtICh2WzBdICogbVsxXSArIHZbMV0gKiBtWzVdICsgdlsyXSAqIG1bOV0pO1xuICAgIHZhciB0MiA9IHZbMl0gLSAodlswXSAqIG1bMl0gKyB2WzFdICogbVs2XSArIHZbMl0gKiBtWzEwXSk7XG4gICAgcmV0dXJuIFRyYW5zZm9ybS50aGVuTW92ZShtLCBbXG4gICAgICAgIHQwLFxuICAgICAgICB0MSxcbiAgICAgICAgdDJcbiAgICBdKTtcbn07XG5UcmFuc2Zvcm0uc2tldyA9IGZ1bmN0aW9uIHNrZXcocGhpLCB0aGV0YSwgcHNpKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgMSxcbiAgICAgICAgTWF0aC50YW4odGhldGEpLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBNYXRoLnRhbihwc2kpLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBNYXRoLnRhbihwaGkpLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0uc2tld1ggPSBmdW5jdGlvbiBza2V3WChhbmdsZSkge1xuICAgIHJldHVybiBbXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIE1hdGgudGFuKGFuZ2xlKSxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnNrZXdZID0gZnVuY3Rpb24gc2tld1koYW5nbGUpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICAxLFxuICAgICAgICBNYXRoLnRhbihhbmdsZSksXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5wZXJzcGVjdGl2ZSA9IGZ1bmN0aW9uIHBlcnNwZWN0aXZlKGZvY3VzWikge1xuICAgIHJldHVybiBbXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIC0xIC8gZm9jdXNaLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0uZ2V0VHJhbnNsYXRlID0gZnVuY3Rpb24gZ2V0VHJhbnNsYXRlKG0pIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBtWzEyXSxcbiAgICAgICAgbVsxM10sXG4gICAgICAgIG1bMTRdXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0uaW52ZXJzZSA9IGZ1bmN0aW9uIGludmVyc2UobSkge1xuICAgIHZhciBjMCA9IG1bNV0gKiBtWzEwXSAtIG1bNl0gKiBtWzldO1xuICAgIHZhciBjMSA9IG1bNF0gKiBtWzEwXSAtIG1bNl0gKiBtWzhdO1xuICAgIHZhciBjMiA9IG1bNF0gKiBtWzldIC0gbVs1XSAqIG1bOF07XG4gICAgdmFyIGM0ID0gbVsxXSAqIG1bMTBdIC0gbVsyXSAqIG1bOV07XG4gICAgdmFyIGM1ID0gbVswXSAqIG1bMTBdIC0gbVsyXSAqIG1bOF07XG4gICAgdmFyIGM2ID0gbVswXSAqIG1bOV0gLSBtWzFdICogbVs4XTtcbiAgICB2YXIgYzggPSBtWzFdICogbVs2XSAtIG1bMl0gKiBtWzVdO1xuICAgIHZhciBjOSA9IG1bMF0gKiBtWzZdIC0gbVsyXSAqIG1bNF07XG4gICAgdmFyIGMxMCA9IG1bMF0gKiBtWzVdIC0gbVsxXSAqIG1bNF07XG4gICAgdmFyIGRldE0gPSBtWzBdICogYzAgLSBtWzFdICogYzEgKyBtWzJdICogYzI7XG4gICAgdmFyIGludkQgPSAxIC8gZGV0TTtcbiAgICB2YXIgcmVzdWx0ID0gW1xuICAgICAgICAgICAgaW52RCAqIGMwLFxuICAgICAgICAgICAgLWludkQgKiBjNCxcbiAgICAgICAgICAgIGludkQgKiBjOCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAtaW52RCAqIGMxLFxuICAgICAgICAgICAgaW52RCAqIGM1LFxuICAgICAgICAgICAgLWludkQgKiBjOSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBpbnZEICogYzIsXG4gICAgICAgICAgICAtaW52RCAqIGM2LFxuICAgICAgICAgICAgaW52RCAqIGMxMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAxXG4gICAgICAgIF07XG4gICAgcmVzdWx0WzEyXSA9IC1tWzEyXSAqIHJlc3VsdFswXSAtIG1bMTNdICogcmVzdWx0WzRdIC0gbVsxNF0gKiByZXN1bHRbOF07XG4gICAgcmVzdWx0WzEzXSA9IC1tWzEyXSAqIHJlc3VsdFsxXSAtIG1bMTNdICogcmVzdWx0WzVdIC0gbVsxNF0gKiByZXN1bHRbOV07XG4gICAgcmVzdWx0WzE0XSA9IC1tWzEyXSAqIHJlc3VsdFsyXSAtIG1bMTNdICogcmVzdWx0WzZdIC0gbVsxNF0gKiByZXN1bHRbMTBdO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuVHJhbnNmb3JtLnRyYW5zcG9zZSA9IGZ1bmN0aW9uIHRyYW5zcG9zZShtKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgbVswXSxcbiAgICAgICAgbVs0XSxcbiAgICAgICAgbVs4XSxcbiAgICAgICAgbVsxMl0sXG4gICAgICAgIG1bMV0sXG4gICAgICAgIG1bNV0sXG4gICAgICAgIG1bOV0sXG4gICAgICAgIG1bMTNdLFxuICAgICAgICBtWzJdLFxuICAgICAgICBtWzZdLFxuICAgICAgICBtWzEwXSxcbiAgICAgICAgbVsxNF0sXG4gICAgICAgIG1bM10sXG4gICAgICAgIG1bN10sXG4gICAgICAgIG1bMTFdLFxuICAgICAgICBtWzE1XVxuICAgIF07XG59O1xuZnVuY3Rpb24gX25vcm1TcXVhcmVkKHYpIHtcbiAgICByZXR1cm4gdi5sZW5ndGggPT09IDIgPyB2WzBdICogdlswXSArIHZbMV0gKiB2WzFdIDogdlswXSAqIHZbMF0gKyB2WzFdICogdlsxXSArIHZbMl0gKiB2WzJdO1xufVxuZnVuY3Rpb24gX25vcm0odikge1xuICAgIHJldHVybiBNYXRoLnNxcnQoX25vcm1TcXVhcmVkKHYpKTtcbn1cbmZ1bmN0aW9uIF9zaWduKG4pIHtcbiAgICByZXR1cm4gbiA8IDAgPyAtMSA6IDE7XG59XG5UcmFuc2Zvcm0uaW50ZXJwcmV0ID0gZnVuY3Rpb24gaW50ZXJwcmV0KE0pIHtcbiAgICB2YXIgeCA9IFtcbiAgICAgICAgICAgIE1bMF0sXG4gICAgICAgICAgICBNWzFdLFxuICAgICAgICAgICAgTVsyXVxuICAgICAgICBdO1xuICAgIHZhciBzZ24gPSBfc2lnbih4WzBdKTtcbiAgICB2YXIgeE5vcm0gPSBfbm9ybSh4KTtcbiAgICB2YXIgdiA9IFtcbiAgICAgICAgICAgIHhbMF0gKyBzZ24gKiB4Tm9ybSxcbiAgICAgICAgICAgIHhbMV0sXG4gICAgICAgICAgICB4WzJdXG4gICAgICAgIF07XG4gICAgdmFyIG11bHQgPSAyIC8gX25vcm1TcXVhcmVkKHYpO1xuICAgIGlmIChtdWx0ID49IEluZmluaXR5KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0cmFuc2xhdGU6IFRyYW5zZm9ybS5nZXRUcmFuc2xhdGUoTSksXG4gICAgICAgICAgICByb3RhdGU6IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNjYWxlOiBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBza2V3OiBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgdmFyIFExID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMVxuICAgICAgICBdO1xuICAgIFExWzBdID0gMSAtIG11bHQgKiB2WzBdICogdlswXTtcbiAgICBRMVs1XSA9IDEgLSBtdWx0ICogdlsxXSAqIHZbMV07XG4gICAgUTFbMTBdID0gMSAtIG11bHQgKiB2WzJdICogdlsyXTtcbiAgICBRMVsxXSA9IC1tdWx0ICogdlswXSAqIHZbMV07XG4gICAgUTFbMl0gPSAtbXVsdCAqIHZbMF0gKiB2WzJdO1xuICAgIFExWzZdID0gLW11bHQgKiB2WzFdICogdlsyXTtcbiAgICBRMVs0XSA9IFExWzFdO1xuICAgIFExWzhdID0gUTFbMl07XG4gICAgUTFbOV0gPSBRMVs2XTtcbiAgICB2YXIgTVExID0gVHJhbnNmb3JtLm11bHRpcGx5KFExLCBNKTtcbiAgICB2YXIgeDIgPSBbXG4gICAgICAgICAgICBNUTFbNV0sXG4gICAgICAgICAgICBNUTFbNl1cbiAgICAgICAgXTtcbiAgICB2YXIgc2duMiA9IF9zaWduKHgyWzBdKTtcbiAgICB2YXIgeDJOb3JtID0gX25vcm0oeDIpO1xuICAgIHZhciB2MiA9IFtcbiAgICAgICAgICAgIHgyWzBdICsgc2duMiAqIHgyTm9ybSxcbiAgICAgICAgICAgIHgyWzFdXG4gICAgICAgIF07XG4gICAgdmFyIG11bHQyID0gMiAvIF9ub3JtU3F1YXJlZCh2Mik7XG4gICAgdmFyIFEyID0gW1xuICAgICAgICAgICAgMSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMVxuICAgICAgICBdO1xuICAgIFEyWzVdID0gMSAtIG11bHQyICogdjJbMF0gKiB2MlswXTtcbiAgICBRMlsxMF0gPSAxIC0gbXVsdDIgKiB2MlsxXSAqIHYyWzFdO1xuICAgIFEyWzZdID0gLW11bHQyICogdjJbMF0gKiB2MlsxXTtcbiAgICBRMls5XSA9IFEyWzZdO1xuICAgIHZhciBRID0gVHJhbnNmb3JtLm11bHRpcGx5KFEyLCBRMSk7XG4gICAgdmFyIFIgPSBUcmFuc2Zvcm0ubXVsdGlwbHkoUSwgTSk7XG4gICAgdmFyIHJlbW92ZXIgPSBUcmFuc2Zvcm0uc2NhbGUoUlswXSA8IDAgPyAtMSA6IDEsIFJbNV0gPCAwID8gLTEgOiAxLCBSWzEwXSA8IDAgPyAtMSA6IDEpO1xuICAgIFIgPSBUcmFuc2Zvcm0ubXVsdGlwbHkoUiwgcmVtb3Zlcik7XG4gICAgUSA9IFRyYW5zZm9ybS5tdWx0aXBseShyZW1vdmVyLCBRKTtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgcmVzdWx0LnRyYW5zbGF0ZSA9IFRyYW5zZm9ybS5nZXRUcmFuc2xhdGUoTSk7XG4gICAgcmVzdWx0LnJvdGF0ZSA9IFtcbiAgICAgICAgTWF0aC5hdGFuMigtUVs2XSwgUVsxMF0pLFxuICAgICAgICBNYXRoLmFzaW4oUVsyXSksXG4gICAgICAgIE1hdGguYXRhbjIoLVFbMV0sIFFbMF0pXG4gICAgXTtcbiAgICBpZiAoIXJlc3VsdC5yb3RhdGVbMF0pIHtcbiAgICAgICAgcmVzdWx0LnJvdGF0ZVswXSA9IDA7XG4gICAgICAgIHJlc3VsdC5yb3RhdGVbMl0gPSBNYXRoLmF0YW4yKFFbNF0sIFFbNV0pO1xuICAgIH1cbiAgICByZXN1bHQuc2NhbGUgPSBbXG4gICAgICAgIFJbMF0sXG4gICAgICAgIFJbNV0sXG4gICAgICAgIFJbMTBdXG4gICAgXTtcbiAgICByZXN1bHQuc2tldyA9IFtcbiAgICAgICAgTWF0aC5hdGFuMihSWzldLCByZXN1bHQuc2NhbGVbMl0pLFxuICAgICAgICBNYXRoLmF0YW4yKFJbOF0sIHJlc3VsdC5zY2FsZVsyXSksXG4gICAgICAgIE1hdGguYXRhbjIoUls0XSwgcmVzdWx0LnNjYWxlWzBdKVxuICAgIF07XG4gICAgaWYgKE1hdGguYWJzKHJlc3VsdC5yb3RhdGVbMF0pICsgTWF0aC5hYnMocmVzdWx0LnJvdGF0ZVsyXSkgPiAxLjUgKiBNYXRoLlBJKSB7XG4gICAgICAgIHJlc3VsdC5yb3RhdGVbMV0gPSBNYXRoLlBJIC0gcmVzdWx0LnJvdGF0ZVsxXTtcbiAgICAgICAgaWYgKHJlc3VsdC5yb3RhdGVbMV0gPiBNYXRoLlBJKVxuICAgICAgICAgICAgcmVzdWx0LnJvdGF0ZVsxXSAtPSAyICogTWF0aC5QSTtcbiAgICAgICAgaWYgKHJlc3VsdC5yb3RhdGVbMV0gPCAtTWF0aC5QSSlcbiAgICAgICAgICAgIHJlc3VsdC5yb3RhdGVbMV0gKz0gMiAqIE1hdGguUEk7XG4gICAgICAgIGlmIChyZXN1bHQucm90YXRlWzBdIDwgMClcbiAgICAgICAgICAgIHJlc3VsdC5yb3RhdGVbMF0gKz0gTWF0aC5QSTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmVzdWx0LnJvdGF0ZVswXSAtPSBNYXRoLlBJO1xuICAgICAgICBpZiAocmVzdWx0LnJvdGF0ZVsyXSA8IDApXG4gICAgICAgICAgICByZXN1bHQucm90YXRlWzJdICs9IE1hdGguUEk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJlc3VsdC5yb3RhdGVbMl0gLT0gTWF0aC5QSTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5UcmFuc2Zvcm0uYXZlcmFnZSA9IGZ1bmN0aW9uIGF2ZXJhZ2UoTTEsIE0yLCB0KSB7XG4gICAgdCA9IHQgPT09IHVuZGVmaW5lZCA/IDAuNSA6IHQ7XG4gICAgdmFyIHNwZWNNMSA9IFRyYW5zZm9ybS5pbnRlcnByZXQoTTEpO1xuICAgIHZhciBzcGVjTTIgPSBUcmFuc2Zvcm0uaW50ZXJwcmV0KE0yKTtcbiAgICB2YXIgc3BlY0F2ZyA9IHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcm90YXRlOiBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzY2FsZTogW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2tldzogW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgc3BlY0F2Zy50cmFuc2xhdGVbaV0gPSAoMSAtIHQpICogc3BlY00xLnRyYW5zbGF0ZVtpXSArIHQgKiBzcGVjTTIudHJhbnNsYXRlW2ldO1xuICAgICAgICBzcGVjQXZnLnJvdGF0ZVtpXSA9ICgxIC0gdCkgKiBzcGVjTTEucm90YXRlW2ldICsgdCAqIHNwZWNNMi5yb3RhdGVbaV07XG4gICAgICAgIHNwZWNBdmcuc2NhbGVbaV0gPSAoMSAtIHQpICogc3BlY00xLnNjYWxlW2ldICsgdCAqIHNwZWNNMi5zY2FsZVtpXTtcbiAgICAgICAgc3BlY0F2Zy5za2V3W2ldID0gKDEgLSB0KSAqIHNwZWNNMS5za2V3W2ldICsgdCAqIHNwZWNNMi5za2V3W2ldO1xuICAgIH1cbiAgICByZXR1cm4gVHJhbnNmb3JtLmJ1aWxkKHNwZWNBdmcpO1xufTtcblRyYW5zZm9ybS5idWlsZCA9IGZ1bmN0aW9uIGJ1aWxkKHNwZWMpIHtcbiAgICB2YXIgc2NhbGVNYXRyaXggPSBUcmFuc2Zvcm0uc2NhbGUoc3BlYy5zY2FsZVswXSwgc3BlYy5zY2FsZVsxXSwgc3BlYy5zY2FsZVsyXSk7XG4gICAgdmFyIHNrZXdNYXRyaXggPSBUcmFuc2Zvcm0uc2tldyhzcGVjLnNrZXdbMF0sIHNwZWMuc2tld1sxXSwgc3BlYy5za2V3WzJdKTtcbiAgICB2YXIgcm90YXRlTWF0cml4ID0gVHJhbnNmb3JtLnJvdGF0ZShzcGVjLnJvdGF0ZVswXSwgc3BlYy5yb3RhdGVbMV0sIHNwZWMucm90YXRlWzJdKTtcbiAgICByZXR1cm4gVHJhbnNmb3JtLnRoZW5Nb3ZlKFRyYW5zZm9ybS5tdWx0aXBseShUcmFuc2Zvcm0ubXVsdGlwbHkocm90YXRlTWF0cml4LCBza2V3TWF0cml4KSwgc2NhbGVNYXRyaXgpLCBzcGVjLnRyYW5zbGF0ZSk7XG59O1xuVHJhbnNmb3JtLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyhhLCBiKSB7XG4gICAgcmV0dXJuICFUcmFuc2Zvcm0ubm90RXF1YWxzKGEsIGIpO1xufTtcblRyYW5zZm9ybS5ub3RFcXVhbHMgPSBmdW5jdGlvbiBub3RFcXVhbHMoYSwgYikge1xuICAgIGlmIChhID09PSBiKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuICEoYSAmJiBiKSB8fCBhWzEyXSAhPT0gYlsxMl0gfHwgYVsxM10gIT09IGJbMTNdIHx8IGFbMTRdICE9PSBiWzE0XSB8fCBhWzBdICE9PSBiWzBdIHx8IGFbMV0gIT09IGJbMV0gfHwgYVsyXSAhPT0gYlsyXSB8fCBhWzRdICE9PSBiWzRdIHx8IGFbNV0gIT09IGJbNV0gfHwgYVs2XSAhPT0gYls2XSB8fCBhWzhdICE9PSBiWzhdIHx8IGFbOV0gIT09IGJbOV0gfHwgYVsxMF0gIT09IGJbMTBdO1xufTtcblRyYW5zZm9ybS5ub3JtYWxpemVSb3RhdGlvbiA9IGZ1bmN0aW9uIG5vcm1hbGl6ZVJvdGF0aW9uKHJvdGF0aW9uKSB7XG4gICAgdmFyIHJlc3VsdCA9IHJvdGF0aW9uLnNsaWNlKDApO1xuICAgIGlmIChyZXN1bHRbMF0gPT09IE1hdGguUEkgKiAwLjUgfHwgcmVzdWx0WzBdID09PSAtTWF0aC5QSSAqIDAuNSkge1xuICAgICAgICByZXN1bHRbMF0gPSAtcmVzdWx0WzBdO1xuICAgICAgICByZXN1bHRbMV0gPSBNYXRoLlBJIC0gcmVzdWx0WzFdO1xuICAgICAgICByZXN1bHRbMl0gLT0gTWF0aC5QSTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdFswXSA+IE1hdGguUEkgKiAwLjUpIHtcbiAgICAgICAgcmVzdWx0WzBdID0gcmVzdWx0WzBdIC0gTWF0aC5QSTtcbiAgICAgICAgcmVzdWx0WzFdID0gTWF0aC5QSSAtIHJlc3VsdFsxXTtcbiAgICAgICAgcmVzdWx0WzJdIC09IE1hdGguUEk7XG4gICAgfVxuICAgIGlmIChyZXN1bHRbMF0gPCAtTWF0aC5QSSAqIDAuNSkge1xuICAgICAgICByZXN1bHRbMF0gPSByZXN1bHRbMF0gKyBNYXRoLlBJO1xuICAgICAgICByZXN1bHRbMV0gPSAtTWF0aC5QSSAtIHJlc3VsdFsxXTtcbiAgICAgICAgcmVzdWx0WzJdIC09IE1hdGguUEk7XG4gICAgfVxuICAgIHdoaWxlIChyZXN1bHRbMV0gPCAtTWF0aC5QSSlcbiAgICAgICAgcmVzdWx0WzFdICs9IDIgKiBNYXRoLlBJO1xuICAgIHdoaWxlIChyZXN1bHRbMV0gPj0gTWF0aC5QSSlcbiAgICAgICAgcmVzdWx0WzFdIC09IDIgKiBNYXRoLlBJO1xuICAgIHdoaWxlIChyZXN1bHRbMl0gPCAtTWF0aC5QSSlcbiAgICAgICAgcmVzdWx0WzJdICs9IDIgKiBNYXRoLlBJO1xuICAgIHdoaWxlIChyZXN1bHRbMl0gPj0gTWF0aC5QSSlcbiAgICAgICAgcmVzdWx0WzJdIC09IDIgKiBNYXRoLlBJO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuVHJhbnNmb3JtLmluRnJvbnQgPSBbXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAuMDAxLFxuICAgIDFcbl07XG5UcmFuc2Zvcm0uYmVoaW5kID0gW1xuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAtMC4wMDEsXG4gICAgMVxuXTtcbm1vZHVsZS5leHBvcnRzID0gVHJhbnNmb3JtOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuL0V2ZW50SGFuZGxlcicpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnLi9PcHRpb25zTWFuYWdlcicpO1xudmFyIFJlbmRlck5vZGUgPSByZXF1aXJlKCcuL1JlbmRlck5vZGUnKTtcbnZhciBVdGlsaXR5ID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL1V0aWxpdHknKTtcbmZ1bmN0aW9uIFZpZXcob3B0aW9ucykge1xuICAgIHRoaXMuX25vZGUgPSBuZXcgUmVuZGVyTm9kZSgpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldElucHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudElucHV0KTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG4gICAgdGhpcy5vcHRpb25zID0gVXRpbGl0eS5jbG9uZSh0aGlzLmNvbnN0cnVjdG9yLkRFRkFVTFRfT1BUSU9OUyB8fCBWaWV3LkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgdGhpcy5fb3B0aW9uc01hbmFnZXIgPSBuZXcgT3B0aW9uc01hbmFnZXIodGhpcy5vcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xufVxuVmlldy5ERUZBVUxUX09QVElPTlMgPSB7fTtcblZpZXcucHJvdG90eXBlLmdldE9wdGlvbnMgPSBmdW5jdGlvbiBnZXRPcHRpb25zKGtleSkge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zTWFuYWdlci5nZXRPcHRpb25zKGtleSk7XG59O1xuVmlldy5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMuX29wdGlvbnNNYW5hZ2VyLnBhdGNoKG9wdGlvbnMpO1xufTtcblZpZXcucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZS5hZGQuYXBwbHkodGhpcy5fbm9kZSwgYXJndW1lbnRzKTtcbn07XG5WaWV3LnByb3RvdHlwZS5fYWRkID0gVmlldy5wcm90b3R5cGUuYWRkO1xuVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9ub2RlLnJlbmRlcigpO1xufTtcblZpZXcucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgIGlmICh0aGlzLl9ub2RlICYmIHRoaXMuX25vZGUuZ2V0U2l6ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbm9kZS5nZXRTaXplLmFwcGx5KHRoaXMuX25vZGUsIGFyZ3VtZW50cykgfHwgdGhpcy5vcHRpb25zLnNpemU7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc2l6ZTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFZpZXc7IiwiZnVuY3Rpb24gVmlld1NlcXVlbmNlKG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpXG4gICAgICAgIG9wdGlvbnMgPSBbXTtcbiAgICBpZiAob3B0aW9ucyBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICBvcHRpb25zID0geyBhcnJheTogb3B0aW9ucyB9O1xuICAgIHRoaXMuXyA9IG51bGw7XG4gICAgdGhpcy5pbmRleCA9IG9wdGlvbnMuaW5kZXggfHwgMDtcbiAgICBpZiAob3B0aW9ucy5hcnJheSlcbiAgICAgICAgdGhpcy5fID0gbmV3IHRoaXMuY29uc3RydWN0b3IuQmFja2luZyhvcHRpb25zLmFycmF5KTtcbiAgICBlbHNlIGlmIChvcHRpb25zLl8pXG4gICAgICAgIHRoaXMuXyA9IG9wdGlvbnMuXztcbiAgICBpZiAodGhpcy5pbmRleCA9PT0gdGhpcy5fLmZpcnN0SW5kZXgpXG4gICAgICAgIHRoaXMuXy5maXJzdE5vZGUgPSB0aGlzO1xuICAgIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLl8uZmlyc3RJbmRleCArIHRoaXMuXy5hcnJheS5sZW5ndGggLSAxKVxuICAgICAgICB0aGlzLl8ubGFzdE5vZGUgPSB0aGlzO1xuICAgIGlmIChvcHRpb25zLmxvb3AgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5fLmxvb3AgPSBvcHRpb25zLmxvb3A7XG4gICAgaWYgKG9wdGlvbnMudHJhY2tTaXplICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMuXy50cmFja1NpemUgPSBvcHRpb25zLnRyYWNrU2l6ZTtcbiAgICB0aGlzLl9wcmV2aW91c05vZGUgPSBudWxsO1xuICAgIHRoaXMuX25leHROb2RlID0gbnVsbDtcbn1cblZpZXdTZXF1ZW5jZS5CYWNraW5nID0gZnVuY3Rpb24gQmFja2luZyhhcnJheSkge1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbiAgICB0aGlzLmZpcnN0SW5kZXggPSAwO1xuICAgIHRoaXMubG9vcCA9IGZhbHNlO1xuICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcbiAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcbiAgICB0aGlzLmN1bXVsYXRpdmVTaXplcyA9IFtbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdXTtcbiAgICB0aGlzLnNpemVEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy50cmFja1NpemUgPSBmYWxzZTtcbn07XG5WaWV3U2VxdWVuY2UuQmFja2luZy5wcm90b3R5cGUuZ2V0VmFsdWUgPSBmdW5jdGlvbiBnZXRWYWx1ZShpKSB7XG4gICAgdmFyIF9pID0gaSAtIHRoaXMuZmlyc3RJbmRleDtcbiAgICBpZiAoX2kgPCAwIHx8IF9pID49IHRoaXMuYXJyYXkubGVuZ3RoKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gdGhpcy5hcnJheVtfaV07XG59O1xuVmlld1NlcXVlbmNlLkJhY2tpbmcucHJvdG90eXBlLnNldFZhbHVlID0gZnVuY3Rpb24gc2V0VmFsdWUoaSwgdmFsdWUpIHtcbiAgICB0aGlzLmFycmF5W2kgLSB0aGlzLmZpcnN0SW5kZXhdID0gdmFsdWU7XG59O1xuVmlld1NlcXVlbmNlLkJhY2tpbmcucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKGluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMuY3VtdWxhdGl2ZVNpemVzW2luZGV4XTtcbn07XG5WaWV3U2VxdWVuY2UuQmFja2luZy5wcm90b3R5cGUuY2FsY3VsYXRlU2l6ZSA9IGZ1bmN0aW9uIGNhbGN1bGF0ZVNpemUoaW5kZXgpIHtcbiAgICBpbmRleCA9IGluZGV4IHx8IHRoaXMuYXJyYXkubGVuZ3RoO1xuICAgIHZhciBzaXplID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGV4OyBpKyspIHtcbiAgICAgICAgdmFyIG5vZGVTaXplID0gdGhpcy5hcnJheVtpXS5nZXRTaXplKCk7XG4gICAgICAgIGlmICghbm9kZVNpemUpXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBpZiAoc2l6ZVswXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAobm9kZVNpemVbMF0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBzaXplWzBdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHNpemVbMF0gKz0gbm9kZVNpemVbMF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNpemVbMV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKG5vZGVTaXplWzFdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgc2l6ZVsxXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBzaXplWzFdICs9IG5vZGVTaXplWzFdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VtdWxhdGl2ZVNpemVzW2kgKyAxXSA9IHNpemUuc2xpY2UoKTtcbiAgICB9XG4gICAgdGhpcy5zaXplRGlydHkgPSBmYWxzZTtcbiAgICByZXR1cm4gc2l6ZTtcbn07XG5WaWV3U2VxdWVuY2UuQmFja2luZy5wcm90b3R5cGUucmVpbmRleCA9IGZ1bmN0aW9uIHJlaW5kZXgoc3RhcnQsIHJlbW92ZUNvdW50LCBpbnNlcnRDb3VudCkge1xuICAgIGlmICghdGhpcy5hcnJheVswXSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgaW5kZXggPSB0aGlzLmZpcnN0SW5kZXg7XG4gICAgdmFyIGluZGV4U2hpZnRBbW91bnQgPSBpbnNlcnRDb3VudCAtIHJlbW92ZUNvdW50O1xuICAgIHZhciBub2RlID0gdGhpcy5maXJzdE5vZGU7XG4gICAgd2hpbGUgKGluZGV4IDwgc3RhcnQgLSAxKSB7XG4gICAgICAgIG5vZGUgPSBub2RlLmdldE5leHQoKTtcbiAgICAgICAgaW5kZXgrKztcbiAgICB9XG4gICAgdmFyIHNwbGljZVN0YXJ0Tm9kZSA9IG5vZGU7XG4gICAgZm9yIChpID0gMDsgaSA8IHJlbW92ZUNvdW50OyBpKyspIHtcbiAgICAgICAgbm9kZSA9IG5vZGUuZ2V0TmV4dCgpO1xuICAgICAgICBpZiAobm9kZSlcbiAgICAgICAgICAgIG5vZGUuX3ByZXZpb3VzTm9kZSA9IHNwbGljZVN0YXJ0Tm9kZTtcbiAgICB9XG4gICAgdmFyIHNwbGljZVJlc3VtZU5vZGUgPSBub2RlID8gbm9kZS5nZXROZXh0KCkgOiBudWxsO1xuICAgIHNwbGljZVN0YXJ0Tm9kZS5fbmV4dE5vZGUgPSBudWxsO1xuICAgIG5vZGUgPSBzcGxpY2VTdGFydE5vZGU7XG4gICAgZm9yIChpID0gMDsgaSA8IGluc2VydENvdW50OyBpKyspXG4gICAgICAgIG5vZGUgPSBub2RlLmdldE5leHQoKTtcbiAgICBpbmRleCArPSBpbnNlcnRDb3VudDtcbiAgICBpZiAobm9kZSAhPT0gc3BsaWNlUmVzdW1lTm9kZSkge1xuICAgICAgICBub2RlLl9uZXh0Tm9kZSA9IHNwbGljZVJlc3VtZU5vZGU7XG4gICAgICAgIGlmIChzcGxpY2VSZXN1bWVOb2RlKVxuICAgICAgICAgICAgc3BsaWNlUmVzdW1lTm9kZS5fcHJldmlvdXNOb2RlID0gbm9kZTtcbiAgICB9XG4gICAgaWYgKHNwbGljZVJlc3VtZU5vZGUpIHtcbiAgICAgICAgbm9kZSA9IHNwbGljZVJlc3VtZU5vZGU7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIHdoaWxlIChub2RlICYmIGluZGV4IDwgdGhpcy5hcnJheS5sZW5ndGggKyB0aGlzLmZpcnN0SW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChub2RlLl9uZXh0Tm9kZSlcbiAgICAgICAgICAgICAgICBub2RlLmluZGV4ICs9IGluZGV4U2hpZnRBbW91bnQ7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgbm9kZS5pbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUuZ2V0TmV4dCgpO1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy50cmFja1NpemUpXG4gICAgICAgIHRoaXMuc2l6ZURpcnR5ID0gdHJ1ZTtcbn07XG5WaWV3U2VxdWVuY2UucHJvdG90eXBlLmdldFByZXZpb3VzID0gZnVuY3Rpb24gZ2V0UHJldmlvdXMoKSB7XG4gICAgdmFyIGxlbiA9IHRoaXMuXy5hcnJheS5sZW5ndGg7XG4gICAgaWYgKCFsZW4pIHtcbiAgICAgICAgdGhpcy5fcHJldmlvdXNOb2RlID0gbnVsbDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaW5kZXggPT09IHRoaXMuXy5maXJzdEluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLl8ubG9vcCkge1xuICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNOb2RlID0gdGhpcy5fLmxhc3ROb2RlIHx8IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHtcbiAgICAgICAgICAgICAgICBfOiB0aGlzLl8sXG4gICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuXy5maXJzdEluZGV4ICsgbGVuIC0gMVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9wcmV2aW91c05vZGUuX25leHROb2RlID0gdGhpcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzTm9kZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9wcmV2aW91c05vZGUpIHtcbiAgICAgICAgdGhpcy5fcHJldmlvdXNOb2RlID0gbmV3IHRoaXMuY29uc3RydWN0b3Ioe1xuICAgICAgICAgICAgXzogdGhpcy5fLFxuICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXggLSAxXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9wcmV2aW91c05vZGUuX25leHROb2RlID0gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3ByZXZpb3VzTm9kZTtcbn07XG5WaWV3U2VxdWVuY2UucHJvdG90eXBlLmdldE5leHQgPSBmdW5jdGlvbiBnZXROZXh0KCkge1xuICAgIHZhciBsZW4gPSB0aGlzLl8uYXJyYXkubGVuZ3RoO1xuICAgIGlmICghbGVuKSB7XG4gICAgICAgIHRoaXMuX25leHROb2RlID0gbnVsbDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaW5kZXggPT09IHRoaXMuXy5maXJzdEluZGV4ICsgbGVuIC0gMSkge1xuICAgICAgICBpZiAodGhpcy5fLmxvb3ApIHtcbiAgICAgICAgICAgIHRoaXMuX25leHROb2RlID0gdGhpcy5fLmZpcnN0Tm9kZSB8fCBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih7XG4gICAgICAgICAgICAgICAgXzogdGhpcy5fLFxuICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLl8uZmlyc3RJbmRleFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9uZXh0Tm9kZS5fcHJldmlvdXNOb2RlID0gdGhpcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX25leHROb2RlID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXRoaXMuX25leHROb2RlKSB7XG4gICAgICAgIHRoaXMuX25leHROb2RlID0gbmV3IHRoaXMuY29uc3RydWN0b3Ioe1xuICAgICAgICAgICAgXzogdGhpcy5fLFxuICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXggKyAxXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9uZXh0Tm9kZS5fcHJldmlvdXNOb2RlID0gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX25leHROb2RlO1xufTtcblZpZXdTZXF1ZW5jZS5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YoaXRlbSkge1xuICAgIHJldHVybiB0aGlzLl8uYXJyYXkuaW5kZXhPZihpdGVtKTtcbn07XG5WaWV3U2VxdWVuY2UucHJvdG90eXBlLmdldEluZGV4ID0gZnVuY3Rpb24gZ2V0SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXg7XG59O1xuVmlld1NlcXVlbmNlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiAnJyArIHRoaXMuaW5kZXg7XG59O1xuVmlld1NlcXVlbmNlLnByb3RvdHlwZS51bnNoaWZ0ID0gZnVuY3Rpb24gdW5zaGlmdCh2YWx1ZSkge1xuICAgIHRoaXMuXy5hcnJheS51bnNoaWZ0LmFwcGx5KHRoaXMuXy5hcnJheSwgYXJndW1lbnRzKTtcbiAgICB0aGlzLl8uZmlyc3RJbmRleCAtPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGlmICh0aGlzLl8udHJhY2tTaXplKVxuICAgICAgICB0aGlzLl8uc2l6ZURpcnR5ID0gdHJ1ZTtcbn07XG5WaWV3U2VxdWVuY2UucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiBwdXNoKHZhbHVlKSB7XG4gICAgdGhpcy5fLmFycmF5LnB1c2guYXBwbHkodGhpcy5fLmFycmF5LCBhcmd1bWVudHMpO1xuICAgIGlmICh0aGlzLl8udHJhY2tTaXplKVxuICAgICAgICB0aGlzLl8uc2l6ZURpcnR5ID0gdHJ1ZTtcbn07XG5WaWV3U2VxdWVuY2UucHJvdG90eXBlLnNwbGljZSA9IGZ1bmN0aW9uIHNwbGljZShpbmRleCwgaG93TWFueSkge1xuICAgIHZhciB2YWx1ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgIHRoaXMuXy5hcnJheS5zcGxpY2UuYXBwbHkodGhpcy5fLmFycmF5LCBbXG4gICAgICAgIGluZGV4IC0gdGhpcy5fLmZpcnN0SW5kZXgsXG4gICAgICAgIGhvd01hbnlcbiAgICBdLmNvbmNhdCh2YWx1ZXMpKTtcbiAgICB0aGlzLl8ucmVpbmRleChpbmRleCwgaG93TWFueSwgdmFsdWVzLmxlbmd0aCk7XG59O1xuVmlld1NlcXVlbmNlLnByb3RvdHlwZS5zd2FwID0gZnVuY3Rpb24gc3dhcChvdGhlcikge1xuICAgIHZhciBvdGhlclZhbHVlID0gb3RoZXIuZ2V0KCk7XG4gICAgdmFyIG15VmFsdWUgPSB0aGlzLmdldCgpO1xuICAgIHRoaXMuXy5zZXRWYWx1ZSh0aGlzLmluZGV4LCBvdGhlclZhbHVlKTtcbiAgICB0aGlzLl8uc2V0VmFsdWUob3RoZXIuaW5kZXgsIG15VmFsdWUpO1xuICAgIHZhciBteVByZXZpb3VzID0gdGhpcy5fcHJldmlvdXNOb2RlO1xuICAgIHZhciBteU5leHQgPSB0aGlzLl9uZXh0Tm9kZTtcbiAgICB2YXIgbXlJbmRleCA9IHRoaXMuaW5kZXg7XG4gICAgdmFyIG90aGVyUHJldmlvdXMgPSBvdGhlci5fcHJldmlvdXNOb2RlO1xuICAgIHZhciBvdGhlck5leHQgPSBvdGhlci5fbmV4dE5vZGU7XG4gICAgdmFyIG90aGVySW5kZXggPSBvdGhlci5pbmRleDtcbiAgICB0aGlzLmluZGV4ID0gb3RoZXJJbmRleDtcbiAgICB0aGlzLl9wcmV2aW91c05vZGUgPSBvdGhlclByZXZpb3VzID09PSB0aGlzID8gb3RoZXIgOiBvdGhlclByZXZpb3VzO1xuICAgIGlmICh0aGlzLl9wcmV2aW91c05vZGUpXG4gICAgICAgIHRoaXMuX3ByZXZpb3VzTm9kZS5fbmV4dE5vZGUgPSB0aGlzO1xuICAgIHRoaXMuX25leHROb2RlID0gb3RoZXJOZXh0ID09PSB0aGlzID8gb3RoZXIgOiBvdGhlck5leHQ7XG4gICAgaWYgKHRoaXMuX25leHROb2RlKVxuICAgICAgICB0aGlzLl9uZXh0Tm9kZS5fcHJldmlvdXNOb2RlID0gdGhpcztcbiAgICBvdGhlci5pbmRleCA9IG15SW5kZXg7XG4gICAgb3RoZXIuX3ByZXZpb3VzTm9kZSA9IG15UHJldmlvdXMgPT09IG90aGVyID8gdGhpcyA6IG15UHJldmlvdXM7XG4gICAgaWYgKG90aGVyLl9wcmV2aW91c05vZGUpXG4gICAgICAgIG90aGVyLl9wcmV2aW91c05vZGUuX25leHROb2RlID0gb3RoZXI7XG4gICAgb3RoZXIuX25leHROb2RlID0gbXlOZXh0ID09PSBvdGhlciA/IHRoaXMgOiBteU5leHQ7XG4gICAgaWYgKG90aGVyLl9uZXh0Tm9kZSlcbiAgICAgICAgb3RoZXIuX25leHROb2RlLl9wcmV2aW91c05vZGUgPSBvdGhlcjtcbiAgICBpZiAodGhpcy5pbmRleCA9PT0gdGhpcy5fLmZpcnN0SW5kZXgpXG4gICAgICAgIHRoaXMuXy5maXJzdE5vZGUgPSB0aGlzO1xuICAgIGVsc2UgaWYgKHRoaXMuaW5kZXggPT09IHRoaXMuXy5maXJzdEluZGV4ICsgdGhpcy5fLmFycmF5Lmxlbmd0aCAtIDEpXG4gICAgICAgIHRoaXMuXy5sYXN0Tm9kZSA9IHRoaXM7XG4gICAgaWYgKG90aGVyLmluZGV4ID09PSB0aGlzLl8uZmlyc3RJbmRleClcbiAgICAgICAgdGhpcy5fLmZpcnN0Tm9kZSA9IG90aGVyO1xuICAgIGVsc2UgaWYgKG90aGVyLmluZGV4ID09PSB0aGlzLl8uZmlyc3RJbmRleCArIHRoaXMuXy5hcnJheS5sZW5ndGggLSAxKVxuICAgICAgICB0aGlzLl8ubGFzdE5vZGUgPSBvdGhlcjtcbiAgICBpZiAodGhpcy5fLnRyYWNrU2l6ZSlcbiAgICAgICAgdGhpcy5fLnNpemVEaXJ0eSA9IHRydWU7XG59O1xuVmlld1NlcXVlbmNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuXy5nZXRWYWx1ZSh0aGlzLmluZGV4KTtcbn07XG5WaWV3U2VxdWVuY2UucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgIHZhciB0YXJnZXQgPSB0aGlzLmdldCgpO1xuICAgIHJldHVybiB0YXJnZXQgPyB0YXJnZXQuZ2V0U2l6ZSgpIDogbnVsbDtcbn07XG5WaWV3U2VxdWVuY2UucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5fLnRyYWNrU2l6ZSAmJiB0aGlzLl8uc2l6ZURpcnR5KVxuICAgICAgICB0aGlzLl8uY2FsY3VsYXRlU2l6ZSgpO1xuICAgIHZhciB0YXJnZXQgPSB0aGlzLmdldCgpO1xuICAgIHJldHVybiB0YXJnZXQgPyB0YXJnZXQucmVuZGVyLmFwcGx5KHRhcmdldCwgYXJndW1lbnRzKSA6IG51bGw7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBWaWV3U2VxdWVuY2U7IiwidmFyIGNzcyA9IFwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxcbiAqXFxuICogT3duZXI6IG1hcmtAZmFtby51c1xcbiAqIEBsaWNlbnNlIE1QTCAyLjBcXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTRcXG4gKi9cXG5cXG4uZmFtb3VzLXJvb3Qge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBtYXJnaW46IDBweDtcXG4gICAgcGFkZGluZzogMHB4O1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAgIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxufVxcblxcbi5mYW1vdXMtY29udGFpbmVyLCAuZmFtb3VzLWdyb3VwIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDBweDtcXG4gICAgbGVmdDogMHB4O1xcbiAgICBib3R0b206IDBweDtcXG4gICAgcmlnaHQ6IDBweDtcXG4gICAgb3ZlcmZsb3c6IHZpc2libGU7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gICAgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuLmZhbW91cy1ncm91cCB7XFxuICAgIHdpZHRoOiAwcHg7XFxuICAgIGhlaWdodDogMHB4O1xcbiAgICBtYXJnaW46IDBweDtcXG4gICAgcGFkZGluZzogMHB4O1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAgIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxufVxcblxcbi5mYW1vdXMtc3VyZmFjZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgY2VudGVyO1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgY2VudGVyO1xcbiAgICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcXG4gICAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAgIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAgIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgLW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBwb2ludGVyLWV2ZW50czogYXV0bztcXG59XFxuXFxuLmZhbW91cy1jb250YWluZXItZ3JvdXAge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblwiOyAocmVxdWlyZShcImM6XFxcXFVzZXJzXFxcXE1vcmdhblxcXFxkZXNrdG9wXFxcXG5ld3Byb2plY3RcXFxcYWRmYW1lXFxcXG5vZGVfbW9kdWxlc1xcXFxjc3NpZnlcIikpKGNzcyk7IG1vZHVsZS5leHBvcnRzID0gY3NzOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuLi9jb3JlL0V2ZW50SGFuZGxlcicpO1xuZnVuY3Rpb24gR2VuZXJpY1N5bmMoc3luY3MsIG9wdGlvbnMpIHtcbiAgICB0aGlzLl9ldmVudElucHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRJbnB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRJbnB1dCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRPdXRwdXQpO1xuICAgIHRoaXMuX3N5bmNzID0ge307XG4gICAgaWYgKHN5bmNzKVxuICAgICAgICB0aGlzLmFkZFN5bmMoc3luY3MpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG59XG5HZW5lcmljU3luYy5ESVJFQ1RJT05fWCA9IDA7XG5HZW5lcmljU3luYy5ESVJFQ1RJT05fWSA9IDE7XG5HZW5lcmljU3luYy5ESVJFQ1RJT05fWiA9IDI7XG52YXIgcmVnaXN0cnkgPSB7fTtcbkdlbmVyaWNTeW5jLnJlZ2lzdGVyID0gZnVuY3Rpb24gcmVnaXN0ZXIoc3luY09iamVjdCkge1xuICAgIGZvciAodmFyIGtleSBpbiBzeW5jT2JqZWN0KSB7XG4gICAgICAgIGlmIChyZWdpc3RyeVtrZXldKSB7XG4gICAgICAgICAgICBpZiAocmVnaXN0cnlba2V5XSA9PT0gc3luY09iamVjdFtrZXldKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoaXMga2V5IGlzIHJlZ2lzdGVyZWQgdG8gYSBkaWZmZXJlbnQgc3luYyBjbGFzcycpO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIHJlZ2lzdHJ5W2tleV0gPSBzeW5jT2JqZWN0W2tleV07XG4gICAgfVxufTtcbkdlbmVyaWNTeW5jLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fc3luY3MpIHtcbiAgICAgICAgdGhpcy5fc3luY3Nba2V5XS5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIH1cbn07XG5HZW5lcmljU3luYy5wcm90b3R5cGUucGlwZVN5bmMgPSBmdW5jdGlvbiBwaXBlVG9TeW5jKGtleSkge1xuICAgIHZhciBzeW5jID0gdGhpcy5fc3luY3Nba2V5XTtcbiAgICB0aGlzLl9ldmVudElucHV0LnBpcGUoc3luYyk7XG4gICAgc3luYy5waXBlKHRoaXMuX2V2ZW50T3V0cHV0KTtcbn07XG5HZW5lcmljU3luYy5wcm90b3R5cGUudW5waXBlU3luYyA9IGZ1bmN0aW9uIHVucGlwZUZyb21TeW5jKGtleSkge1xuICAgIHZhciBzeW5jID0gdGhpcy5fc3luY3Nba2V5XTtcbiAgICB0aGlzLl9ldmVudElucHV0LnVucGlwZShzeW5jKTtcbiAgICBzeW5jLnVucGlwZSh0aGlzLl9ldmVudE91dHB1dCk7XG59O1xuZnVuY3Rpb24gX2FkZFNpbmdsZVN5bmMoa2V5LCBvcHRpb25zKSB7XG4gICAgaWYgKCFyZWdpc3RyeVtrZXldKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5fc3luY3Nba2V5XSA9IG5ldyByZWdpc3RyeVtrZXldKG9wdGlvbnMpO1xuICAgIHRoaXMucGlwZVN5bmMoa2V5KTtcbn1cbkdlbmVyaWNTeW5jLnByb3RvdHlwZS5hZGRTeW5jID0gZnVuY3Rpb24gYWRkU3luYyhzeW5jcykge1xuICAgIGlmIChzeW5jcyBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN5bmNzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgX2FkZFNpbmdsZVN5bmMuY2FsbCh0aGlzLCBzeW5jc1tpXSk7XG4gICAgZWxzZSBpZiAoc3luY3MgaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzeW5jcylcbiAgICAgICAgICAgIF9hZGRTaW5nbGVTeW5jLmNhbGwodGhpcywga2V5LCBzeW5jc1trZXldKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEdlbmVyaWNTeW5jOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuLi9jb3JlL0V2ZW50SGFuZGxlcicpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnLi4vY29yZS9PcHRpb25zTWFuYWdlcicpO1xuZnVuY3Rpb24gTW91c2VTeW5jKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKE1vdXNlU3luYy5ERUZBVUxUX09QVElPTlMpO1xuICAgIHRoaXMuX29wdGlvbnNNYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHRoaXMub3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLl9ldmVudElucHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRJbnB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRJbnB1dCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRPdXRwdXQpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQub24oJ21vdXNlZG93bicsIF9oYW5kbGVTdGFydC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9ldmVudElucHV0Lm9uKCdtb3VzZW1vdmUnLCBfaGFuZGxlTW92ZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9ldmVudElucHV0Lm9uKCdtb3VzZXVwJywgX2hhbmRsZUVuZC5iaW5kKHRoaXMpKTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnByb3BvZ2F0ZSlcbiAgICAgICAgdGhpcy5fZXZlbnRJbnB1dC5vbignbW91c2VsZWF2ZScsIF9oYW5kbGVMZWF2ZS5iaW5kKHRoaXMpKTtcbiAgICBlbHNlXG4gICAgICAgIHRoaXMuX2V2ZW50SW5wdXQub24oJ21vdXNlbGVhdmUnLCBfaGFuZGxlRW5kLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX3BheWxvYWQgPSB7XG4gICAgICAgIGRlbHRhOiBudWxsLFxuICAgICAgICBwb3NpdGlvbjogbnVsbCxcbiAgICAgICAgdmVsb2NpdHk6IG51bGwsXG4gICAgICAgIGNsaWVudFg6IDAsXG4gICAgICAgIGNsaWVudFk6IDAsXG4gICAgICAgIG9mZnNldFg6IDAsXG4gICAgICAgIG9mZnNldFk6IDBcbiAgICB9O1xuICAgIHRoaXMuX3Bvc2l0aW9uSGlzdG9yeSA9IFtdO1xuICAgIHRoaXMuX3Bvc2l0aW9uID0gbnVsbDtcbiAgICB0aGlzLl9wcmV2Q29vcmQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcHJldlRpbWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZG93biA9IGZhbHNlO1xuICAgIHRoaXMuX21vdmVkID0gZmFsc2U7XG4gICAgdGhpcy5fZG9jdW1lbnRBY3RpdmUgPSBmYWxzZTtcbn1cbk1vdXNlU3luYy5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgZGlyZWN0aW9uOiB1bmRlZmluZWQsXG4gICAgcmFpbHM6IGZhbHNlLFxuICAgIHNjYWxlOiAxLFxuICAgIHByb3BvZ2F0ZTogdHJ1ZSxcbiAgICB2ZWxvY2l0eVNhbXBsZUxlbmd0aDogMTAsXG4gICAgcHJldmVudERlZmF1bHQ6IHRydWVcbn07XG5Nb3VzZVN5bmMuRElSRUNUSU9OX1ggPSAwO1xuTW91c2VTeW5jLkRJUkVDVElPTl9ZID0gMTtcbnZhciBNSU5JTVVNX1RJQ0tfVElNRSA9IDg7XG5mdW5jdGlvbiBfaGFuZGxlU3RhcnQoZXZlbnQpIHtcbiAgICB2YXIgZGVsdGE7XG4gICAgdmFyIHZlbG9jaXR5O1xuICAgIGlmICh0aGlzLm9wdGlvbnMucHJldmVudERlZmF1bHQpXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIHggPSBldmVudC5jbGllbnRYO1xuICAgIHZhciB5ID0gZXZlbnQuY2xpZW50WTtcbiAgICB0aGlzLl9wcmV2Q29vcmQgPSBbXG4gICAgICAgIHgsXG4gICAgICAgIHlcbiAgICBdO1xuICAgIHRoaXMuX3ByZXZUaW1lID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLl9kb3duID0gdHJ1ZTtcbiAgICB0aGlzLl9tb3ZlID0gZmFsc2U7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IDA7XG4gICAgICAgIGRlbHRhID0gMDtcbiAgICAgICAgdmVsb2NpdHkgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXTtcbiAgICAgICAgZGVsdGEgPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdO1xuICAgICAgICB2ZWxvY2l0eSA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF07XG4gICAgfVxuICAgIHZhciBwYXlsb2FkID0gdGhpcy5fcGF5bG9hZDtcbiAgICBwYXlsb2FkLmRlbHRhID0gZGVsdGE7XG4gICAgcGF5bG9hZC5wb3NpdGlvbiA9IHRoaXMuX3Bvc2l0aW9uO1xuICAgIHBheWxvYWQudmVsb2NpdHkgPSB2ZWxvY2l0eTtcbiAgICBwYXlsb2FkLmNsaWVudFggPSB4O1xuICAgIHBheWxvYWQuY2xpZW50WSA9IHk7XG4gICAgcGF5bG9hZC5vZmZzZXRYID0gZXZlbnQub2Zmc2V0WDtcbiAgICBwYXlsb2FkLm9mZnNldFkgPSBldmVudC5vZmZzZXRZO1xuICAgIHRoaXMuX3Bvc2l0aW9uSGlzdG9yeS5wdXNoKHtcbiAgICAgICAgcG9zaXRpb246IHBheWxvYWQucG9zaXRpb24uc2xpY2UgPyBwYXlsb2FkLnBvc2l0aW9uLnNsaWNlKDApIDogcGF5bG9hZC5wb3NpdGlvbixcbiAgICAgICAgdGltZTogdGhpcy5fcHJldlRpbWVcbiAgICB9KTtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdzdGFydCcsIHBheWxvYWQpO1xuICAgIHRoaXMuX2RvY3VtZW50QWN0aXZlID0gZmFsc2U7XG59XG5mdW5jdGlvbiBfaGFuZGxlTW92ZShldmVudCkge1xuICAgIGlmICghdGhpcy5fcHJldkNvb3JkKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIHByZXZDb29yZCA9IHRoaXMuX3ByZXZDb29yZDtcbiAgICB2YXIgcHJldlRpbWUgPSB0aGlzLl9wcmV2VGltZTtcbiAgICB2YXIgeCA9IGV2ZW50LmNsaWVudFg7XG4gICAgdmFyIHkgPSBldmVudC5jbGllbnRZO1xuICAgIHZhciBjdXJyVGltZSA9IERhdGUubm93KCk7XG4gICAgdmFyIGRpZmZYID0geCAtIHByZXZDb29yZFswXTtcbiAgICB2YXIgZGlmZlkgPSB5IC0gcHJldkNvb3JkWzFdO1xuICAgIGlmICh0aGlzLm9wdGlvbnMucmFpbHMpIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKGRpZmZYKSA+IE1hdGguYWJzKGRpZmZZKSlcbiAgICAgICAgICAgIGRpZmZZID0gMDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGlmZlggPSAwO1xuICAgIH1cbiAgICB2YXIgZGlmZlRpbWUgPSBNYXRoLm1heChjdXJyVGltZSAtIHRoaXMuX3Bvc2l0aW9uSGlzdG9yeVswXS50aW1lLCBNSU5JTVVNX1RJQ0tfVElNRSk7XG4gICAgdmFyIHNjYWxlID0gdGhpcy5vcHRpb25zLnNjYWxlO1xuICAgIHZhciBuZXh0VmVsO1xuICAgIHZhciBuZXh0RGVsdGE7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT09IE1vdXNlU3luYy5ESVJFQ1RJT05fWCkge1xuICAgICAgICBuZXh0RGVsdGEgPSBzY2FsZSAqIGRpZmZYO1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiArPSBuZXh0RGVsdGE7XG4gICAgICAgIG5leHRWZWwgPSBzY2FsZSAqICh0aGlzLl9wb3NpdGlvbiAtIHRoaXMuX3Bvc2l0aW9uSGlzdG9yeVswXS5wb3NpdGlvbikgLyBkaWZmVGltZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT09IE1vdXNlU3luYy5ESVJFQ1RJT05fWSkge1xuICAgICAgICBuZXh0RGVsdGEgPSBzY2FsZSAqIGRpZmZZO1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiArPSBuZXh0RGVsdGE7XG4gICAgICAgIG5leHRWZWwgPSBzY2FsZSAqICh0aGlzLl9wb3NpdGlvbiAtIHRoaXMuX3Bvc2l0aW9uSGlzdG9yeVswXS5wb3NpdGlvbikgLyBkaWZmVGltZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0RGVsdGEgPSBbXG4gICAgICAgICAgICBzY2FsZSAqIGRpZmZYLFxuICAgICAgICAgICAgc2NhbGUgKiBkaWZmWVxuICAgICAgICBdO1xuICAgICAgICBuZXh0VmVsID0gW1xuICAgICAgICAgICAgc2NhbGUgKiAodGhpcy5fcG9zaXRpb25bMF0gLSB0aGlzLl9wb3NpdGlvbkhpc3RvcnlbMF0ucG9zaXRpb25bMF0pIC8gZGlmZlRpbWUsXG4gICAgICAgICAgICBzY2FsZSAqICh0aGlzLl9wb3NpdGlvblsxXSAtIHRoaXMuX3Bvc2l0aW9uSGlzdG9yeVswXS5wb3NpdGlvblsxXSkgLyBkaWZmVGltZVxuICAgICAgICBdO1xuICAgICAgICB0aGlzLl9wb3NpdGlvblswXSArPSBuZXh0RGVsdGFbMF07XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uWzFdICs9IG5leHREZWx0YVsxXTtcbiAgICB9XG4gICAgdmFyIHBheWxvYWQgPSB0aGlzLl9wYXlsb2FkO1xuICAgIHBheWxvYWQuZGVsdGEgPSBuZXh0RGVsdGE7XG4gICAgcGF5bG9hZC5wb3NpdGlvbiA9IHRoaXMuX3Bvc2l0aW9uO1xuICAgIHBheWxvYWQudmVsb2NpdHkgPSBuZXh0VmVsO1xuICAgIHBheWxvYWQuY2xpZW50WCA9IHg7XG4gICAgcGF5bG9hZC5jbGllbnRZID0geTtcbiAgICBwYXlsb2FkLm9mZnNldFggPSBldmVudC5vZmZzZXRYO1xuICAgIHBheWxvYWQub2Zmc2V0WSA9IGV2ZW50Lm9mZnNldFk7XG4gICAgaWYgKHRoaXMuX3Bvc2l0aW9uSGlzdG9yeS5sZW5ndGggPT09IHRoaXMub3B0aW9ucy52ZWxvY2l0eVNhbXBsZUxlbmd0aCkge1xuICAgICAgICB0aGlzLl9wb3NpdGlvbkhpc3Rvcnkuc2hpZnQoKTtcbiAgICB9XG4gICAgdGhpcy5fcG9zaXRpb25IaXN0b3J5LnB1c2goe1xuICAgICAgICBwb3NpdGlvbjogcGF5bG9hZC5wb3NpdGlvbi5zbGljZSA/IHBheWxvYWQucG9zaXRpb24uc2xpY2UoMCkgOiBwYXlsb2FkLnBvc2l0aW9uLFxuICAgICAgICB0aW1lOiBjdXJyVGltZVxuICAgIH0pO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3VwZGF0ZScsIHBheWxvYWQpO1xuICAgIHRoaXMuX3ByZXZDb29yZCA9IFtcbiAgICAgICAgeCxcbiAgICAgICAgeVxuICAgIF07XG4gICAgdGhpcy5fcHJldlRpbWUgPSBjdXJyVGltZTtcbiAgICB0aGlzLl9tb3ZlID0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIF9oYW5kbGVFbmQoZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuX2Rvd24pXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdlbmQnLCB0aGlzLl9wYXlsb2FkKTtcbiAgICB0aGlzLl9wcmV2Q29vcmQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcHJldlRpbWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZG93biA9IGZhbHNlO1xuICAgIHRoaXMuX21vdmUgPSBmYWxzZTtcbiAgICB0aGlzLl9wb3NpdGlvbkhpc3RvcnkgPSBbXTtcbn1cbmZ1bmN0aW9uIF9oYW5kbGVMZWF2ZShldmVudCkge1xuICAgIGlmICghdGhpcy5fZG93biB8fCAhdGhpcy5fbW92ZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmICghdGhpcy5fZG9jdW1lbnRBY3RpdmUpIHtcbiAgICAgICAgdmFyIGJvdW5kTW92ZSA9IF9oYW5kbGVNb3ZlLmJpbmQodGhpcyk7XG4gICAgICAgIHZhciBib3VuZEVuZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIF9oYW5kbGVFbmQuY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgYm91bmRNb3ZlKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgYm91bmRFbmQpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgYm91bmRNb3ZlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGJvdW5kRW5kKTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRBY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cbk1vdXNlU3luYy5wcm90b3R5cGUuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uIGdldE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucztcbn07XG5Nb3VzZVN5bmMucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9uc01hbmFnZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IE1vdXNlU3luYzsiLCJ2YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnLi4vY29yZS9FdmVudEhhbmRsZXInKTtcbnZhciBFbmdpbmUgPSByZXF1aXJlKCcuLi9jb3JlL0VuZ2luZScpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnLi4vY29yZS9PcHRpb25zTWFuYWdlcicpO1xuZnVuY3Rpb24gU2Nyb2xsU3luYyhvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShTY3JvbGxTeW5jLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgdGhpcy5fb3B0aW9uc01hbmFnZXIgPSBuZXcgT3B0aW9uc01hbmFnZXIodGhpcy5vcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuX3BheWxvYWQgPSB7XG4gICAgICAgIGRlbHRhOiBudWxsLFxuICAgICAgICBwb3NpdGlvbjogbnVsbCxcbiAgICAgICAgdmVsb2NpdHk6IG51bGwsXG4gICAgICAgIHNsaXA6IHRydWVcbiAgICB9O1xuICAgIHRoaXMuX2V2ZW50SW5wdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldElucHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudElucHV0KTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG4gICAgdGhpcy5fcG9zaXRpb24gPSB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uID09PSB1bmRlZmluZWQgPyBbXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdIDogMDtcbiAgICB0aGlzLl9wcmV2VGltZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9wcmV2VmVsID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQub24oJ21vdXNld2hlZWwnLCBfaGFuZGxlTW92ZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9ldmVudElucHV0Lm9uKCd3aGVlbCcsIF9oYW5kbGVNb3ZlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2luUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICB0aGlzLl9sb29wQm91bmQgPSBmYWxzZTtcbn1cblNjcm9sbFN5bmMuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIGRpcmVjdGlvbjogdW5kZWZpbmVkLFxuICAgIG1pbmltdW1FbmRTcGVlZDogSW5maW5pdHksXG4gICAgcmFpbHM6IGZhbHNlLFxuICAgIHNjYWxlOiAxLFxuICAgIHN0YWxsVGltZTogNTAsXG4gICAgbGluZUhlaWdodDogNDAsXG4gICAgcHJldmVudERlZmF1bHQ6IHRydWVcbn07XG5TY3JvbGxTeW5jLkRJUkVDVElPTl9YID0gMDtcblNjcm9sbFN5bmMuRElSRUNUSU9OX1kgPSAxO1xudmFyIE1JTklNVU1fVElDS19USU1FID0gODtcbnZhciBfbm93ID0gRGF0ZS5ub3c7XG5mdW5jdGlvbiBfbmV3RnJhbWUoKSB7XG4gICAgaWYgKHRoaXMuX2luUHJvZ3Jlc3MgJiYgX25vdygpIC0gdGhpcy5fcHJldlRpbWUgPiB0aGlzLm9wdGlvbnMuc3RhbGxUaW1lKSB7XG4gICAgICAgIHRoaXMuX2luUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgICAgdmFyIGZpbmFsVmVsID0gTWF0aC5hYnModGhpcy5fcHJldlZlbCkgPj0gdGhpcy5vcHRpb25zLm1pbmltdW1FbmRTcGVlZCA/IHRoaXMuX3ByZXZWZWwgOiAwO1xuICAgICAgICB2YXIgcGF5bG9hZCA9IHRoaXMuX3BheWxvYWQ7XG4gICAgICAgIHBheWxvYWQucG9zaXRpb24gPSB0aGlzLl9wb3NpdGlvbjtcbiAgICAgICAgcGF5bG9hZC52ZWxvY2l0eSA9IGZpbmFsVmVsO1xuICAgICAgICBwYXlsb2FkLnNsaXAgPSB0cnVlO1xuICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdlbmQnLCBwYXlsb2FkKTtcbiAgICB9XG59XG5mdW5jdGlvbiBfaGFuZGxlTW92ZShldmVudCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMucHJldmVudERlZmF1bHQpXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKCF0aGlzLl9pblByb2dyZXNzKSB7XG4gICAgICAgIHRoaXMuX2luUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT09IHVuZGVmaW5lZCA/IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0gOiAwO1xuICAgICAgICBwYXlsb2FkID0gdGhpcy5fcGF5bG9hZDtcbiAgICAgICAgcGF5bG9hZC5zbGlwID0gdHJ1ZTtcbiAgICAgICAgcGF5bG9hZC5wb3NpdGlvbiA9IHRoaXMuX3Bvc2l0aW9uO1xuICAgICAgICBwYXlsb2FkLmNsaWVudFggPSBldmVudC5jbGllbnRYO1xuICAgICAgICBwYXlsb2FkLmNsaWVudFkgPSBldmVudC5jbGllbnRZO1xuICAgICAgICBwYXlsb2FkLm9mZnNldFggPSBldmVudC5vZmZzZXRYO1xuICAgICAgICBwYXlsb2FkLm9mZnNldFkgPSBldmVudC5vZmZzZXRZO1xuICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdzdGFydCcsIHBheWxvYWQpO1xuICAgICAgICBpZiAoIXRoaXMuX2xvb3BCb3VuZCkge1xuICAgICAgICAgICAgRW5naW5lLm9uKCdwcmVyZW5kZXInLCBfbmV3RnJhbWUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLl9sb29wQm91bmQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBjdXJyVGltZSA9IF9ub3coKTtcbiAgICB2YXIgcHJldlRpbWUgPSB0aGlzLl9wcmV2VGltZSB8fCBjdXJyVGltZTtcbiAgICB2YXIgZGlmZlggPSBldmVudC53aGVlbERlbHRhWCAhPT0gdW5kZWZpbmVkID8gZXZlbnQud2hlZWxEZWx0YVggOiAtZXZlbnQuZGVsdGFYO1xuICAgIHZhciBkaWZmWSA9IGV2ZW50LndoZWVsRGVsdGFZICE9PSB1bmRlZmluZWQgPyBldmVudC53aGVlbERlbHRhWSA6IC1ldmVudC5kZWx0YVk7XG4gICAgaWYgKGV2ZW50LmRlbHRhTW9kZSA9PT0gMSkge1xuICAgICAgICBkaWZmWCAqPSB0aGlzLm9wdGlvbnMubGluZUhlaWdodDtcbiAgICAgICAgZGlmZlkgKj0gdGhpcy5vcHRpb25zLmxpbmVIZWlnaHQ7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMucmFpbHMpIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKGRpZmZYKSA+IE1hdGguYWJzKGRpZmZZKSlcbiAgICAgICAgICAgIGRpZmZZID0gMDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGlmZlggPSAwO1xuICAgIH1cbiAgICB2YXIgZGlmZlRpbWUgPSBNYXRoLm1heChjdXJyVGltZSAtIHByZXZUaW1lLCBNSU5JTVVNX1RJQ0tfVElNRSk7XG4gICAgdmFyIHZlbFggPSBkaWZmWCAvIGRpZmZUaW1lO1xuICAgIHZhciB2ZWxZID0gZGlmZlkgLyBkaWZmVGltZTtcbiAgICB2YXIgc2NhbGUgPSB0aGlzLm9wdGlvbnMuc2NhbGU7XG4gICAgdmFyIG5leHRWZWw7XG4gICAgdmFyIG5leHREZWx0YTtcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PT0gU2Nyb2xsU3luYy5ESVJFQ1RJT05fWCkge1xuICAgICAgICBuZXh0RGVsdGEgPSBzY2FsZSAqIGRpZmZYO1xuICAgICAgICBuZXh0VmVsID0gc2NhbGUgKiB2ZWxYO1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiArPSBuZXh0RGVsdGE7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuZGlyZWN0aW9uID09PSBTY3JvbGxTeW5jLkRJUkVDVElPTl9ZKSB7XG4gICAgICAgIG5leHREZWx0YSA9IHNjYWxlICogZGlmZlk7XG4gICAgICAgIG5leHRWZWwgPSBzY2FsZSAqIHZlbFk7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uICs9IG5leHREZWx0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0RGVsdGEgPSBbXG4gICAgICAgICAgICBzY2FsZSAqIGRpZmZYLFxuICAgICAgICAgICAgc2NhbGUgKiBkaWZmWVxuICAgICAgICBdO1xuICAgICAgICBuZXh0VmVsID0gW1xuICAgICAgICAgICAgc2NhbGUgKiB2ZWxYLFxuICAgICAgICAgICAgc2NhbGUgKiB2ZWxZXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uWzBdICs9IG5leHREZWx0YVswXTtcbiAgICAgICAgdGhpcy5fcG9zaXRpb25bMV0gKz0gbmV4dERlbHRhWzFdO1xuICAgIH1cbiAgICB2YXIgcGF5bG9hZCA9IHRoaXMuX3BheWxvYWQ7XG4gICAgcGF5bG9hZC5kZWx0YSA9IG5leHREZWx0YTtcbiAgICBwYXlsb2FkLnZlbG9jaXR5ID0gbmV4dFZlbDtcbiAgICBwYXlsb2FkLnBvc2l0aW9uID0gdGhpcy5fcG9zaXRpb247XG4gICAgcGF5bG9hZC5zbGlwID0gdHJ1ZTtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCd1cGRhdGUnLCBwYXlsb2FkKTtcbiAgICB0aGlzLl9wcmV2VGltZSA9IGN1cnJUaW1lO1xuICAgIHRoaXMuX3ByZXZWZWwgPSBuZXh0VmVsO1xufVxuU2Nyb2xsU3luYy5wcm90b3R5cGUuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uIGdldE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucztcbn07XG5TY3JvbGxTeW5jLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnNNYW5hZ2VyLnNldE9wdGlvbnMob3B0aW9ucyk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTY3JvbGxTeW5jOyIsInZhciBUb3VjaFRyYWNrZXIgPSByZXF1aXJlKCcuL1RvdWNoVHJhY2tlcicpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4uL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCcuLi9jb3JlL09wdGlvbnNNYW5hZ2VyJyk7XG5mdW5jdGlvbiBUb3VjaFN5bmMob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoVG91Y2hTeW5jLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgdGhpcy5fb3B0aW9uc01hbmFnZXIgPSBuZXcgT3B0aW9uc01hbmFnZXIodGhpcy5vcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX3RvdWNoVHJhY2tlciA9IG5ldyBUb3VjaFRyYWNrZXIoeyB0b3VjaExpbWl0OiB0aGlzLm9wdGlvbnMudG91Y2hMaW1pdCB9KTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldElucHV0SGFuZGxlcih0aGlzLCB0aGlzLl90b3VjaFRyYWNrZXIpO1xuICAgIHRoaXMuX3RvdWNoVHJhY2tlci5vbigndHJhY2tzdGFydCcsIF9oYW5kbGVTdGFydC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl90b3VjaFRyYWNrZXIub24oJ3RyYWNrbW92ZScsIF9oYW5kbGVNb3ZlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX3RvdWNoVHJhY2tlci5vbigndHJhY2tlbmQnLCBfaGFuZGxlRW5kLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX3BheWxvYWQgPSB7XG4gICAgICAgIGRlbHRhOiBudWxsLFxuICAgICAgICBwb3NpdGlvbjogbnVsbCxcbiAgICAgICAgdmVsb2NpdHk6IG51bGwsXG4gICAgICAgIGNsaWVudFg6IHVuZGVmaW5lZCxcbiAgICAgICAgY2xpZW50WTogdW5kZWZpbmVkLFxuICAgICAgICBjb3VudDogMCxcbiAgICAgICAgdG91Y2g6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgdGhpcy5fcG9zaXRpb24gPSBudWxsO1xufVxuVG91Y2hTeW5jLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBkaXJlY3Rpb246IHVuZGVmaW5lZCxcbiAgICByYWlsczogZmFsc2UsXG4gICAgdG91Y2hMaW1pdDogMSxcbiAgICB2ZWxvY2l0eVNhbXBsZUxlbmd0aDogMTAsXG4gICAgc2NhbGU6IDFcbn07XG5Ub3VjaFN5bmMuRElSRUNUSU9OX1ggPSAwO1xuVG91Y2hTeW5jLkRJUkVDVElPTl9ZID0gMTtcbnZhciBNSU5JTVVNX1RJQ0tfVElNRSA9IDg7XG5mdW5jdGlvbiBfaGFuZGxlU3RhcnQoZGF0YSkge1xuICAgIHZhciB2ZWxvY2l0eTtcbiAgICB2YXIgZGVsdGE7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IDA7XG4gICAgICAgIHZlbG9jaXR5ID0gMDtcbiAgICAgICAgZGVsdGEgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXTtcbiAgICAgICAgdmVsb2NpdHkgPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdO1xuICAgICAgICBkZWx0YSA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF07XG4gICAgfVxuICAgIHZhciBwYXlsb2FkID0gdGhpcy5fcGF5bG9hZDtcbiAgICBwYXlsb2FkLmRlbHRhID0gZGVsdGE7XG4gICAgcGF5bG9hZC5wb3NpdGlvbiA9IHRoaXMuX3Bvc2l0aW9uO1xuICAgIHBheWxvYWQudmVsb2NpdHkgPSB2ZWxvY2l0eTtcbiAgICBwYXlsb2FkLmNsaWVudFggPSBkYXRhLng7XG4gICAgcGF5bG9hZC5jbGllbnRZID0gZGF0YS55O1xuICAgIHBheWxvYWQuY291bnQgPSBkYXRhLmNvdW50O1xuICAgIHBheWxvYWQudG91Y2ggPSBkYXRhLmlkZW50aWZpZXI7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnc3RhcnQnLCBwYXlsb2FkKTtcbn1cbmZ1bmN0aW9uIF9oYW5kbGVNb3ZlKGRhdGEpIHtcbiAgICB2YXIgaGlzdG9yeSA9IGRhdGEuaGlzdG9yeTtcbiAgICB2YXIgY3Vyckhpc3RvcnkgPSBoaXN0b3J5W2hpc3RvcnkubGVuZ3RoIC0gMV07XG4gICAgdmFyIHByZXZIaXN0b3J5ID0gaGlzdG9yeVtoaXN0b3J5Lmxlbmd0aCAtIDJdO1xuICAgIHZhciBkaXN0YW50SGlzdG9yeSA9IGhpc3RvcnlbaGlzdG9yeS5sZW5ndGggLSB0aGlzLm9wdGlvbnMudmVsb2NpdHlTYW1wbGVMZW5ndGhdID8gaGlzdG9yeVtoaXN0b3J5Lmxlbmd0aCAtIHRoaXMub3B0aW9ucy52ZWxvY2l0eVNhbXBsZUxlbmd0aF0gOiBoaXN0b3J5W2hpc3RvcnkubGVuZ3RoIC0gMl07XG4gICAgdmFyIGRpc3RhbnRUaW1lID0gZGlzdGFudEhpc3RvcnkudGltZXN0YW1wO1xuICAgIHZhciBjdXJyVGltZSA9IGN1cnJIaXN0b3J5LnRpbWVzdGFtcDtcbiAgICB2YXIgZGlmZlggPSBjdXJySGlzdG9yeS54IC0gcHJldkhpc3RvcnkueDtcbiAgICB2YXIgZGlmZlkgPSBjdXJySGlzdG9yeS55IC0gcHJldkhpc3RvcnkueTtcbiAgICB2YXIgdmVsRGlmZlggPSBjdXJySGlzdG9yeS54IC0gZGlzdGFudEhpc3RvcnkueDtcbiAgICB2YXIgdmVsRGlmZlkgPSBjdXJySGlzdG9yeS55IC0gZGlzdGFudEhpc3RvcnkueTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnJhaWxzKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyhkaWZmWCkgPiBNYXRoLmFicyhkaWZmWSkpXG4gICAgICAgICAgICBkaWZmWSA9IDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRpZmZYID0gMDtcbiAgICAgICAgaWYgKE1hdGguYWJzKHZlbERpZmZYKSA+IE1hdGguYWJzKHZlbERpZmZZKSlcbiAgICAgICAgICAgIHZlbERpZmZZID0gMDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdmVsRGlmZlggPSAwO1xuICAgIH1cbiAgICB2YXIgZGlmZlRpbWUgPSBNYXRoLm1heChjdXJyVGltZSAtIGRpc3RhbnRUaW1lLCBNSU5JTVVNX1RJQ0tfVElNRSk7XG4gICAgdmFyIHZlbFggPSB2ZWxEaWZmWCAvIGRpZmZUaW1lO1xuICAgIHZhciB2ZWxZID0gdmVsRGlmZlkgLyBkaWZmVGltZTtcbiAgICB2YXIgc2NhbGUgPSB0aGlzLm9wdGlvbnMuc2NhbGU7XG4gICAgdmFyIG5leHRWZWw7XG4gICAgdmFyIG5leHREZWx0YTtcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PT0gVG91Y2hTeW5jLkRJUkVDVElPTl9YKSB7XG4gICAgICAgIG5leHREZWx0YSA9IHNjYWxlICogZGlmZlg7XG4gICAgICAgIG5leHRWZWwgPSBzY2FsZSAqIHZlbFg7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uICs9IG5leHREZWx0YTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT09IFRvdWNoU3luYy5ESVJFQ1RJT05fWSkge1xuICAgICAgICBuZXh0RGVsdGEgPSBzY2FsZSAqIGRpZmZZO1xuICAgICAgICBuZXh0VmVsID0gc2NhbGUgKiB2ZWxZO1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiArPSBuZXh0RGVsdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dERlbHRhID0gW1xuICAgICAgICAgICAgc2NhbGUgKiBkaWZmWCxcbiAgICAgICAgICAgIHNjYWxlICogZGlmZllcbiAgICAgICAgXTtcbiAgICAgICAgbmV4dFZlbCA9IFtcbiAgICAgICAgICAgIHNjYWxlICogdmVsWCxcbiAgICAgICAgICAgIHNjYWxlICogdmVsWVxuICAgICAgICBdO1xuICAgICAgICB0aGlzLl9wb3NpdGlvblswXSArPSBuZXh0RGVsdGFbMF07XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uWzFdICs9IG5leHREZWx0YVsxXTtcbiAgICB9XG4gICAgdmFyIHBheWxvYWQgPSB0aGlzLl9wYXlsb2FkO1xuICAgIHBheWxvYWQuZGVsdGEgPSBuZXh0RGVsdGE7XG4gICAgcGF5bG9hZC52ZWxvY2l0eSA9IG5leHRWZWw7XG4gICAgcGF5bG9hZC5wb3NpdGlvbiA9IHRoaXMuX3Bvc2l0aW9uO1xuICAgIHBheWxvYWQuY2xpZW50WCA9IGRhdGEueDtcbiAgICBwYXlsb2FkLmNsaWVudFkgPSBkYXRhLnk7XG4gICAgcGF5bG9hZC5jb3VudCA9IGRhdGEuY291bnQ7XG4gICAgcGF5bG9hZC50b3VjaCA9IGRhdGEuaWRlbnRpZmllcjtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCd1cGRhdGUnLCBwYXlsb2FkKTtcbn1cbmZ1bmN0aW9uIF9oYW5kbGVFbmQoZGF0YSkge1xuICAgIHRoaXMuX3BheWxvYWQuY291bnQgPSBkYXRhLmNvdW50O1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2VuZCcsIHRoaXMuX3BheWxvYWQpO1xufVxuVG91Y2hTeW5jLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnNNYW5hZ2VyLnNldE9wdGlvbnMob3B0aW9ucyk7XG59O1xuVG91Y2hTeW5jLnByb3RvdHlwZS5nZXRPcHRpb25zID0gZnVuY3Rpb24gZ2V0T3B0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zO1xufTtcbm1vZHVsZS5leHBvcnRzID0gVG91Y2hTeW5jOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuLi9jb3JlL0V2ZW50SGFuZGxlcicpO1xudmFyIF9ub3cgPSBEYXRlLm5vdztcbmZ1bmN0aW9uIF90aW1lc3RhbXBUb3VjaCh0b3VjaCwgZXZlbnQsIGhpc3RvcnkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiB0b3VjaC5jbGllbnRYLFxuICAgICAgICB5OiB0b3VjaC5jbGllbnRZLFxuICAgICAgICBpZGVudGlmaWVyOiB0b3VjaC5pZGVudGlmaWVyLFxuICAgICAgICBvcmlnaW46IGV2ZW50Lm9yaWdpbixcbiAgICAgICAgdGltZXN0YW1wOiBfbm93KCksXG4gICAgICAgIGNvdW50OiBldmVudC50b3VjaGVzLmxlbmd0aCxcbiAgICAgICAgaGlzdG9yeTogaGlzdG9yeVxuICAgIH07XG59XG5mdW5jdGlvbiBfaGFuZGxlU3RhcnQoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPiB0aGlzLnRvdWNoTGltaXQpXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLmlzVG91Y2hlZCA9IHRydWU7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXTtcbiAgICAgICAgdmFyIGRhdGEgPSBfdGltZXN0YW1wVG91Y2godG91Y2gsIGV2ZW50LCBudWxsKTtcbiAgICAgICAgdGhpcy5ldmVudE91dHB1dC5lbWl0KCd0cmFja3N0YXJ0JywgZGF0YSk7XG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RpdmUgJiYgIXRoaXMudG91Y2hIaXN0b3J5W3RvdWNoLmlkZW50aWZpZXJdKVxuICAgICAgICAgICAgdGhpcy50cmFjayhkYXRhKTtcbiAgICB9XG59XG5mdW5jdGlvbiBfaGFuZGxlTW92ZShldmVudCkge1xuICAgIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA+IHRoaXMudG91Y2hMaW1pdClcbiAgICAgICAgcmV0dXJuO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbaV07XG4gICAgICAgIHZhciBoaXN0b3J5ID0gdGhpcy50b3VjaEhpc3RvcnlbdG91Y2guaWRlbnRpZmllcl07XG4gICAgICAgIGlmIChoaXN0b3J5KSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IF90aW1lc3RhbXBUb3VjaCh0b3VjaCwgZXZlbnQsIGhpc3RvcnkpO1xuICAgICAgICAgICAgdGhpcy50b3VjaEhpc3RvcnlbdG91Y2guaWRlbnRpZmllcl0ucHVzaChkYXRhKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRPdXRwdXQuZW1pdCgndHJhY2ttb3ZlJywgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBfaGFuZGxlRW5kKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmlzVG91Y2hlZClcbiAgICAgICAgcmV0dXJuO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbaV07XG4gICAgICAgIHZhciBoaXN0b3J5ID0gdGhpcy50b3VjaEhpc3RvcnlbdG91Y2guaWRlbnRpZmllcl07XG4gICAgICAgIGlmIChoaXN0b3J5KSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IF90aW1lc3RhbXBUb3VjaCh0b3VjaCwgZXZlbnQsIGhpc3RvcnkpO1xuICAgICAgICAgICAgdGhpcy5ldmVudE91dHB1dC5lbWl0KCd0cmFja2VuZCcsIGRhdGEpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMudG91Y2hIaXN0b3J5W3RvdWNoLmlkZW50aWZpZXJdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuaXNUb3VjaGVkID0gZmFsc2U7XG59XG5mdW5jdGlvbiBfaGFuZGxlVW5waXBlKCkge1xuICAgIGZvciAodmFyIGkgaW4gdGhpcy50b3VjaEhpc3RvcnkpIHtcbiAgICAgICAgdmFyIGhpc3RvcnkgPSB0aGlzLnRvdWNoSGlzdG9yeVtpXTtcbiAgICAgICAgdGhpcy5ldmVudE91dHB1dC5lbWl0KCd0cmFja2VuZCcsIHtcbiAgICAgICAgICAgIHRvdWNoOiBoaXN0b3J5W2hpc3RvcnkubGVuZ3RoIC0gMV0udG91Y2gsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgICAgIGhpc3Rvcnk6IGhpc3RvcnlcbiAgICAgICAgfSk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnRvdWNoSGlzdG9yeVtpXTtcbiAgICB9XG59XG5mdW5jdGlvbiBUb3VjaFRyYWNrZXIob3B0aW9ucykge1xuICAgIHRoaXMuc2VsZWN0aXZlID0gb3B0aW9ucy5zZWxlY3RpdmU7XG4gICAgdGhpcy50b3VjaExpbWl0ID0gb3B0aW9ucy50b3VjaExpbWl0IHx8IDE7XG4gICAgdGhpcy50b3VjaEhpc3RvcnkgPSB7fTtcbiAgICB0aGlzLmV2ZW50SW5wdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0SW5wdXRIYW5kbGVyKHRoaXMsIHRoaXMuZXZlbnRJbnB1dCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5ldmVudE91dHB1dCk7XG4gICAgdGhpcy5ldmVudElucHV0Lm9uKCd0b3VjaHN0YXJ0JywgX2hhbmRsZVN0YXJ0LmJpbmQodGhpcykpO1xuICAgIHRoaXMuZXZlbnRJbnB1dC5vbigndG91Y2htb3ZlJywgX2hhbmRsZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5ldmVudElucHV0Lm9uKCd0b3VjaGVuZCcsIF9oYW5kbGVFbmQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5ldmVudElucHV0Lm9uKCd0b3VjaGNhbmNlbCcsIF9oYW5kbGVFbmQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5ldmVudElucHV0Lm9uKCd1bnBpcGUnLCBfaGFuZGxlVW5waXBlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuaXNUb3VjaGVkID0gZmFsc2U7XG59XG5Ub3VjaFRyYWNrZXIucHJvdG90eXBlLnRyYWNrID0gZnVuY3Rpb24gdHJhY2soZGF0YSkge1xuICAgIHRoaXMudG91Y2hIaXN0b3J5W2RhdGEuaWRlbnRpZmllcl0gPSBbZGF0YV07XG59O1xubW9kdWxlLmV4cG9ydHMgPSBUb3VjaFRyYWNrZXI7IiwiZnVuY3Rpb24gVmVjdG9yKHgsIHksIHopIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB4ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMuc2V0KHgpO1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnggPSB4IHx8IDA7XG4gICAgICAgIHRoaXMueSA9IHkgfHwgMDtcbiAgICAgICAgdGhpcy56ID0geiB8fCAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn1cbnZhciBfcmVnaXN0ZXIgPSBuZXcgVmVjdG9yKDAsIDAsIDApO1xuVmVjdG9yLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQodikge1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwoX3JlZ2lzdGVyLCB0aGlzLnggKyB2LngsIHRoaXMueSArIHYueSwgdGhpcy56ICsgdi56KTtcbn07XG5WZWN0b3IucHJvdG90eXBlLnN1YiA9IGZ1bmN0aW9uIHN1Yih2KSB7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbChfcmVnaXN0ZXIsIHRoaXMueCAtIHYueCwgdGhpcy55IC0gdi55LCB0aGlzLnogLSB2LnopO1xufTtcblZlY3Rvci5wcm90b3R5cGUubXVsdCA9IGZ1bmN0aW9uIG11bHQocikge1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwoX3JlZ2lzdGVyLCByICogdGhpcy54LCByICogdGhpcy55LCByICogdGhpcy56KTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmRpdiA9IGZ1bmN0aW9uIGRpdihyKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdCgxIC8gcik7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5jcm9zcyA9IGZ1bmN0aW9uIGNyb3NzKHYpIHtcbiAgICB2YXIgeCA9IHRoaXMueDtcbiAgICB2YXIgeSA9IHRoaXMueTtcbiAgICB2YXIgeiA9IHRoaXMuejtcbiAgICB2YXIgdnggPSB2Lng7XG4gICAgdmFyIHZ5ID0gdi55O1xuICAgIHZhciB2eiA9IHYuejtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKF9yZWdpc3RlciwgeiAqIHZ5IC0geSAqIHZ6LCB4ICogdnogLSB6ICogdngsIHkgKiB2eCAtIHggKiB2eSk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHModikge1xuICAgIHJldHVybiB2LnggPT09IHRoaXMueCAmJiB2LnkgPT09IHRoaXMueSAmJiB2LnogPT09IHRoaXMuejtcbn07XG5WZWN0b3IucHJvdG90eXBlLnJvdGF0ZVggPSBmdW5jdGlvbiByb3RhdGVYKHRoZXRhKSB7XG4gICAgdmFyIHggPSB0aGlzLng7XG4gICAgdmFyIHkgPSB0aGlzLnk7XG4gICAgdmFyIHogPSB0aGlzLno7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKF9yZWdpc3RlciwgeCwgeSAqIGNvc1RoZXRhIC0geiAqIHNpblRoZXRhLCB5ICogc2luVGhldGEgKyB6ICogY29zVGhldGEpO1xufTtcblZlY3Rvci5wcm90b3R5cGUucm90YXRlWSA9IGZ1bmN0aW9uIHJvdGF0ZVkodGhldGEpIHtcbiAgICB2YXIgeCA9IHRoaXMueDtcbiAgICB2YXIgeSA9IHRoaXMueTtcbiAgICB2YXIgeiA9IHRoaXMuejtcbiAgICB2YXIgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwoX3JlZ2lzdGVyLCB6ICogc2luVGhldGEgKyB4ICogY29zVGhldGEsIHksIHogKiBjb3NUaGV0YSAtIHggKiBzaW5UaGV0YSk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5yb3RhdGVaID0gZnVuY3Rpb24gcm90YXRlWih0aGV0YSkge1xuICAgIHZhciB4ID0gdGhpcy54O1xuICAgIHZhciB5ID0gdGhpcy55O1xuICAgIHZhciB6ID0gdGhpcy56O1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbChfcmVnaXN0ZXIsIHggKiBjb3NUaGV0YSAtIHkgKiBzaW5UaGV0YSwgeCAqIHNpblRoZXRhICsgeSAqIGNvc1RoZXRhLCB6KTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uIGRvdCh2KSB7XG4gICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueSArIHRoaXMueiAqIHYuejtcbn07XG5WZWN0b3IucHJvdG90eXBlLm5vcm1TcXVhcmVkID0gZnVuY3Rpb24gbm9ybVNxdWFyZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZG90KHRoaXMpO1xufTtcblZlY3Rvci5wcm90b3R5cGUubm9ybSA9IGZ1bmN0aW9uIG5vcm0oKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLm5vcm1TcXVhcmVkKCkpO1xufTtcblZlY3Rvci5wcm90b3R5cGUubm9ybWFsaXplID0gZnVuY3Rpb24gbm9ybWFsaXplKGxlbmd0aCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgICBsZW5ndGggPSAxO1xuICAgIHZhciBub3JtID0gdGhpcy5ub3JtKCk7XG4gICAgaWYgKG5vcm0gPiAxZS03KVxuICAgICAgICByZXR1cm4gX3NldEZyb21WZWN0b3IuY2FsbChfcmVnaXN0ZXIsIHRoaXMubXVsdChsZW5ndGggLyBub3JtKSk7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gX3NldFhZWi5jYWxsKF9yZWdpc3RlciwgbGVuZ3RoLCAwLCAwKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcyk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5pc1plcm8gPSBmdW5jdGlvbiBpc1plcm8oKSB7XG4gICAgcmV0dXJuICEodGhpcy54IHx8IHRoaXMueSB8fCB0aGlzLnopO1xufTtcbmZ1bmN0aW9uIF9zZXRYWVooeCwgeSwgeikge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnogPSB6O1xuICAgIHJldHVybiB0aGlzO1xufVxuZnVuY3Rpb24gX3NldEZyb21BcnJheSh2KSB7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbCh0aGlzLCB2WzBdLCB2WzFdLCB2WzJdIHx8IDApO1xufVxuZnVuY3Rpb24gX3NldEZyb21WZWN0b3Iodikge1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwodGhpcywgdi54LCB2LnksIHYueik7XG59XG5mdW5jdGlvbiBfc2V0RnJvbU51bWJlcih4KSB7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbCh0aGlzLCB4LCAwLCAwKTtcbn1cblZlY3Rvci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KHYpIHtcbiAgICBpZiAodiBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICByZXR1cm4gX3NldEZyb21BcnJheS5jYWxsKHRoaXMsIHYpO1xuICAgIGlmICh0eXBlb2YgdiA9PT0gJ251bWJlcicpXG4gICAgICAgIHJldHVybiBfc2V0RnJvbU51bWJlci5jYWxsKHRoaXMsIHYpO1xuICAgIHJldHVybiBfc2V0RnJvbVZlY3Rvci5jYWxsKHRoaXMsIHYpO1xufTtcblZlY3Rvci5wcm90b3R5cGUuc2V0WFlaID0gZnVuY3Rpb24gKHgsIHksIHopIHtcbiAgICByZXR1cm4gX3NldFhZWi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcblZlY3Rvci5wcm90b3R5cGUuc2V0MUQgPSBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiBfc2V0RnJvbU51bWJlci5jYWxsKHRoaXMsIHgpO1xufTtcblZlY3Rvci5wcm90b3R5cGUucHV0ID0gZnVuY3Rpb24gcHV0KHYpIHtcbiAgICBpZiAodGhpcyA9PT0gX3JlZ2lzdGVyKVxuICAgICAgICBfc2V0RnJvbVZlY3Rvci5jYWxsKHYsIF9yZWdpc3Rlcik7XG4gICAgZWxzZVxuICAgICAgICBfc2V0RnJvbVZlY3Rvci5jYWxsKHYsIHRoaXMpO1xufTtcblZlY3Rvci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKHRoaXMsIDAsIDAsIDApO1xufTtcblZlY3Rvci5wcm90b3R5cGUuY2FwID0gZnVuY3Rpb24gY2FwKGNhcCkge1xuICAgIGlmIChjYXAgPT09IEluZmluaXR5KVxuICAgICAgICByZXR1cm4gX3NldEZyb21WZWN0b3IuY2FsbChfcmVnaXN0ZXIsIHRoaXMpO1xuICAgIHZhciBub3JtID0gdGhpcy5ub3JtKCk7XG4gICAgaWYgKG5vcm0gPiBjYXApXG4gICAgICAgIHJldHVybiBfc2V0RnJvbVZlY3Rvci5jYWxsKF9yZWdpc3RlciwgdGhpcy5tdWx0KGNhcCAvIG5vcm0pKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBfc2V0RnJvbVZlY3Rvci5jYWxsKF9yZWdpc3RlciwgdGhpcyk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5wcm9qZWN0ID0gZnVuY3Rpb24gcHJvamVjdChuKSB7XG4gICAgcmV0dXJuIG4ubXVsdCh0aGlzLmRvdChuKSk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5yZWZsZWN0QWNyb3NzID0gZnVuY3Rpb24gcmVmbGVjdEFjcm9zcyhuKSB7XG4gICAgbi5ub3JtYWxpemUoKS5wdXQobik7XG4gICAgcmV0dXJuIF9zZXRGcm9tVmVjdG9yKF9yZWdpc3RlciwgdGhpcy5zdWIodGhpcy5wcm9qZWN0KG4pLm11bHQoMikpKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICB0aGlzLngsXG4gICAgICAgIHRoaXMueSxcbiAgICAgICAgdGhpcy56XG4gICAgXTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmdldDFEID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLng7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBWZWN0b3I7IiwidmFyIE1vZGlmaWVyID0gcmVxdWlyZSgnLi4vY29yZS9Nb2RpZmllcicpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJy4uL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCcuLi90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZScpO1xudmFyIFRyYW5zaXRpb25hYmxlVHJhbnNmb3JtID0gcmVxdWlyZSgnLi4vdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0nKTtcbmZ1bmN0aW9uIFN0YXRlTW9kaWZpZXIob3B0aW9ucykge1xuICAgIHRoaXMuX3RyYW5zZm9ybVN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlVHJhbnNmb3JtKFRyYW5zZm9ybS5pZGVudGl0eSk7XG4gICAgdGhpcy5fb3BhY2l0eVN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKDEpO1xuICAgIHRoaXMuX29yaWdpblN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0pO1xuICAgIHRoaXMuX2FsaWduU3RhdGUgPSBuZXcgVHJhbnNpdGlvbmFibGUoW1xuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSk7XG4gICAgdGhpcy5fc2l6ZVN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0pO1xuICAgIHRoaXMuX3Byb3BvcnRpb25zU3RhdGUgPSBuZXcgVHJhbnNpdGlvbmFibGUoW1xuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSk7XG4gICAgdGhpcy5fbW9kaWZpZXIgPSBuZXcgTW9kaWZpZXIoe1xuICAgICAgICB0cmFuc2Zvcm06IHRoaXMuX3RyYW5zZm9ybVN0YXRlLFxuICAgICAgICBvcGFjaXR5OiB0aGlzLl9vcGFjaXR5U3RhdGUsXG4gICAgICAgIG9yaWdpbjogbnVsbCxcbiAgICAgICAgYWxpZ246IG51bGwsXG4gICAgICAgIHNpemU6IG51bGwsXG4gICAgICAgIHByb3BvcnRpb25zOiBudWxsXG4gICAgfSk7XG4gICAgdGhpcy5faGFzT3JpZ2luID0gZmFsc2U7XG4gICAgdGhpcy5faGFzQWxpZ24gPSBmYWxzZTtcbiAgICB0aGlzLl9oYXNTaXplID0gZmFsc2U7XG4gICAgdGhpcy5faGFzUHJvcG9ydGlvbnMgPSBmYWxzZTtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucy50cmFuc2Zvcm0pXG4gICAgICAgICAgICB0aGlzLnNldFRyYW5zZm9ybShvcHRpb25zLnRyYW5zZm9ybSk7XG4gICAgICAgIGlmIChvcHRpb25zLm9wYWNpdHkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRoaXMuc2V0T3BhY2l0eShvcHRpb25zLm9wYWNpdHkpO1xuICAgICAgICBpZiAob3B0aW9ucy5vcmlnaW4pXG4gICAgICAgICAgICB0aGlzLnNldE9yaWdpbihvcHRpb25zLm9yaWdpbik7XG4gICAgICAgIGlmIChvcHRpb25zLmFsaWduKVxuICAgICAgICAgICAgdGhpcy5zZXRBbGlnbihvcHRpb25zLmFsaWduKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuc2l6ZSlcbiAgICAgICAgICAgIHRoaXMuc2V0U2l6ZShvcHRpb25zLnNpemUpO1xuICAgICAgICBpZiAob3B0aW9ucy5wcm9wb3J0aW9ucylcbiAgICAgICAgICAgIHRoaXMuc2V0UHJvcG9ydGlvbnMob3B0aW9ucy5wcm9wb3J0aW9ucyk7XG4gICAgfVxufVxuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuc2V0VHJhbnNmb3JtID0gZnVuY3Rpb24gc2V0VHJhbnNmb3JtKHRyYW5zZm9ybSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLl90cmFuc2Zvcm1TdGF0ZS5zZXQodHJhbnNmb3JtLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuc2V0T3BhY2l0eSA9IGZ1bmN0aW9uIHNldE9wYWNpdHkob3BhY2l0eSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLl9vcGFjaXR5U3RhdGUuc2V0KG9wYWNpdHksIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5zZXRPcmlnaW4gPSBmdW5jdGlvbiBzZXRPcmlnaW4ob3JpZ2luLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmIChvcmlnaW4gPT09IG51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMuX2hhc09yaWdpbikge1xuICAgICAgICAgICAgdGhpcy5fbW9kaWZpZXIub3JpZ2luRnJvbShudWxsKTtcbiAgICAgICAgICAgIHRoaXMuX2hhc09yaWdpbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuX2hhc09yaWdpbikge1xuICAgICAgICB0aGlzLl9oYXNPcmlnaW4gPSB0cnVlO1xuICAgICAgICB0aGlzLl9tb2RpZmllci5vcmlnaW5Gcm9tKHRoaXMuX29yaWdpblN0YXRlKTtcbiAgICB9XG4gICAgdGhpcy5fb3JpZ2luU3RhdGUuc2V0KG9yaWdpbiwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xufTtcblN0YXRlTW9kaWZpZXIucHJvdG90eXBlLnNldEFsaWduID0gZnVuY3Rpb24gc2V0T3JpZ2luKGFsaWduLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmIChhbGlnbiA9PT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5faGFzQWxpZ24pIHtcbiAgICAgICAgICAgIHRoaXMuX21vZGlmaWVyLmFsaWduRnJvbShudWxsKTtcbiAgICAgICAgICAgIHRoaXMuX2hhc0FsaWduID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIGlmICghdGhpcy5faGFzQWxpZ24pIHtcbiAgICAgICAgdGhpcy5faGFzQWxpZ24gPSB0cnVlO1xuICAgICAgICB0aGlzLl9tb2RpZmllci5hbGlnbkZyb20odGhpcy5fYWxpZ25TdGF0ZSk7XG4gICAgfVxuICAgIHRoaXMuX2FsaWduU3RhdGUuc2V0KGFsaWduLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uIHNldFNpemUoc2l6ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoc2l6ZSA9PT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5faGFzU2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5fbW9kaWZpZXIuc2l6ZUZyb20obnVsbCk7XG4gICAgICAgICAgICB0aGlzLl9oYXNTaXplID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIGlmICghdGhpcy5faGFzU2l6ZSkge1xuICAgICAgICB0aGlzLl9oYXNTaXplID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fbW9kaWZpZXIuc2l6ZUZyb20odGhpcy5fc2l6ZVN0YXRlKTtcbiAgICB9XG4gICAgdGhpcy5fc2l6ZVN0YXRlLnNldChzaXplLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuc2V0UHJvcG9ydGlvbnMgPSBmdW5jdGlvbiBzZXRTaXplKHByb3BvcnRpb25zLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmIChwcm9wb3J0aW9ucyA9PT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5faGFzUHJvcG9ydGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuX21vZGlmaWVyLnByb3BvcnRpb25zRnJvbShudWxsKTtcbiAgICAgICAgICAgIHRoaXMuX2hhc1Byb3BvcnRpb25zID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIGlmICghdGhpcy5faGFzUHJvcG9ydGlvbnMpIHtcbiAgICAgICAgdGhpcy5faGFzUHJvcG9ydGlvbnMgPSB0cnVlO1xuICAgICAgICB0aGlzLl9tb2RpZmllci5wcm9wb3J0aW9uc0Zyb20odGhpcy5fcHJvcG9ydGlvbnNTdGF0ZSk7XG4gICAgfVxuICAgIHRoaXMuX3Byb3BvcnRpb25zU3RhdGUuc2V0KHByb3BvcnRpb25zLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuaGFsdCA9IGZ1bmN0aW9uIGhhbHQoKSB7XG4gICAgdGhpcy5fdHJhbnNmb3JtU3RhdGUuaGFsdCgpO1xuICAgIHRoaXMuX29wYWNpdHlTdGF0ZS5oYWx0KCk7XG4gICAgdGhpcy5fb3JpZ2luU3RhdGUuaGFsdCgpO1xuICAgIHRoaXMuX2FsaWduU3RhdGUuaGFsdCgpO1xuICAgIHRoaXMuX3NpemVTdGF0ZS5oYWx0KCk7XG4gICAgdGhpcy5fcHJvcG9ydGlvbnNTdGF0ZS5oYWx0KCk7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuZ2V0VHJhbnNmb3JtID0gZnVuY3Rpb24gZ2V0VHJhbnNmb3JtKCkge1xuICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm1TdGF0ZS5nZXQoKTtcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5nZXRGaW5hbFRyYW5zZm9ybSA9IGZ1bmN0aW9uIGdldEZpbmFsVHJhbnNmb3JtKCkge1xuICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm1TdGF0ZS5nZXRGaW5hbCgpO1xufTtcblN0YXRlTW9kaWZpZXIucHJvdG90eXBlLmdldE9wYWNpdHkgPSBmdW5jdGlvbiBnZXRPcGFjaXR5KCkge1xuICAgIHJldHVybiB0aGlzLl9vcGFjaXR5U3RhdGUuZ2V0KCk7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuZ2V0T3JpZ2luID0gZnVuY3Rpb24gZ2V0T3JpZ2luKCkge1xuICAgIHJldHVybiB0aGlzLl9oYXNPcmlnaW4gPyB0aGlzLl9vcmlnaW5TdGF0ZS5nZXQoKSA6IG51bGw7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuZ2V0QWxpZ24gPSBmdW5jdGlvbiBnZXRBbGlnbigpIHtcbiAgICByZXR1cm4gdGhpcy5faGFzQWxpZ24gPyB0aGlzLl9hbGlnblN0YXRlLmdldCgpIDogbnVsbDtcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gZ2V0U2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faGFzU2l6ZSA/IHRoaXMuX3NpemVTdGF0ZS5nZXQoKSA6IG51bGw7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuZ2V0UHJvcG9ydGlvbnMgPSBmdW5jdGlvbiBnZXRQcm9wb3J0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5faGFzUHJvcG9ydGlvbnMgPyB0aGlzLl9wcm9wb3J0aW9uc1N0YXRlLmdldCgpIDogbnVsbDtcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5tb2RpZnkgPSBmdW5jdGlvbiBtb2RpZnkodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGlmaWVyLm1vZGlmeSh0YXJnZXQpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gU3RhdGVNb2RpZmllcjsiLCJ2YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnLi4vY29yZS9FdmVudEhhbmRsZXInKTtcbmZ1bmN0aW9uIFBoeXNpY3NFbmdpbmUob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoUGh5c2ljc0VuZ2luZS5ERUZBVUxUX09QVElPTlMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fcGFydGljbGVzID0gW107XG4gICAgdGhpcy5fYm9kaWVzID0gW107XG4gICAgdGhpcy5fYWdlbnREYXRhID0ge307XG4gICAgdGhpcy5fZm9yY2VzID0gW107XG4gICAgdGhpcy5fY29uc3RyYWludHMgPSBbXTtcbiAgICB0aGlzLl9idWZmZXIgPSAwO1xuICAgIHRoaXMuX3ByZXZUaW1lID0gbm93KCk7XG4gICAgdGhpcy5faXNTbGVlcGluZyA9IGZhbHNlO1xuICAgIHRoaXMuX2V2ZW50SGFuZGxlciA9IG51bGw7XG4gICAgdGhpcy5fY3VyckFnZW50SWQgPSAwO1xuICAgIHRoaXMuX2hhc0JvZGllcyA9IGZhbHNlO1xuICAgIHRoaXMuX2V2ZW50SGFuZGxlciA9IG51bGw7XG59XG52YXIgVElNRVNURVAgPSAxNztcbnZhciBNSU5fVElNRV9TVEVQID0gMTAwMCAvIDEyMDtcbnZhciBNQVhfVElNRV9TVEVQID0gMTc7XG52YXIgbm93ID0gRGF0ZS5ub3c7XG52YXIgX2V2ZW50cyA9IHtcbiAgICAgICAgc3RhcnQ6ICdzdGFydCcsXG4gICAgICAgIHVwZGF0ZTogJ3VwZGF0ZScsXG4gICAgICAgIGVuZDogJ2VuZCdcbiAgICB9O1xuUGh5c2ljc0VuZ2luZS5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgY29uc3RyYWludFN0ZXBzOiAxLFxuICAgIHNsZWVwVG9sZXJhbmNlOiAxZS03LFxuICAgIHZlbG9jaXR5Q2FwOiB1bmRlZmluZWQsXG4gICAgYW5ndWxhclZlbG9jaXR5Q2FwOiB1bmRlZmluZWRcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRzKSB7XG4gICAgZm9yICh2YXIga2V5IGluIG9wdHMpXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNba2V5XSlcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1trZXldID0gb3B0c1trZXldO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmFkZEJvZHkgPSBmdW5jdGlvbiBhZGRCb2R5KGJvZHkpIHtcbiAgICBib2R5Ll9lbmdpbmUgPSB0aGlzO1xuICAgIGlmIChib2R5LmlzQm9keSkge1xuICAgICAgICB0aGlzLl9ib2RpZXMucHVzaChib2R5KTtcbiAgICAgICAgdGhpcy5faGFzQm9kaWVzID0gdHJ1ZTtcbiAgICB9IGVsc2VcbiAgICAgICAgdGhpcy5fcGFydGljbGVzLnB1c2goYm9keSk7XG4gICAgYm9keS5vbignc3RhcnQnLCB0aGlzLndha2UuYmluZCh0aGlzKSk7XG4gICAgcmV0dXJuIGJvZHk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUucmVtb3ZlQm9keSA9IGZ1bmN0aW9uIHJlbW92ZUJvZHkoYm9keSkge1xuICAgIHZhciBhcnJheSA9IGJvZHkuaXNCb2R5ID8gdGhpcy5fYm9kaWVzIDogdGhpcy5fcGFydGljbGVzO1xuICAgIHZhciBpbmRleCA9IGFycmF5LmluZGV4T2YoYm9keSk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgZm9yICh2YXIgYWdlbnQgaW4gdGhpcy5fYWdlbnREYXRhKVxuICAgICAgICAgICAgdGhpcy5kZXRhY2hGcm9tKGFnZW50LmlkLCBib2R5KTtcbiAgICAgICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZ2V0Qm9kaWVzKCkubGVuZ3RoID09PSAwKVxuICAgICAgICB0aGlzLl9oYXNCb2RpZXMgPSBmYWxzZTtcbn07XG5mdW5jdGlvbiBfbWFwQWdlbnRBcnJheShhZ2VudCkge1xuICAgIGlmIChhZ2VudC5hcHBseUZvcmNlKVxuICAgICAgICByZXR1cm4gdGhpcy5fZm9yY2VzO1xuICAgIGlmIChhZ2VudC5hcHBseUNvbnN0cmFpbnQpXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25zdHJhaW50cztcbn1cbmZ1bmN0aW9uIF9hdHRhY2hPbmUoYWdlbnQsIHRhcmdldHMsIHNvdXJjZSkge1xuICAgIGlmICh0YXJnZXRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHRhcmdldHMgPSB0aGlzLmdldFBhcnRpY2xlc0FuZEJvZGllcygpO1xuICAgIGlmICghKHRhcmdldHMgaW5zdGFuY2VvZiBBcnJheSkpXG4gICAgICAgIHRhcmdldHMgPSBbdGFyZ2V0c107XG4gICAgYWdlbnQub24oJ2NoYW5nZScsIHRoaXMud2FrZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9hZ2VudERhdGFbdGhpcy5fY3VyckFnZW50SWRdID0ge1xuICAgICAgICBhZ2VudDogYWdlbnQsXG4gICAgICAgIGlkOiB0aGlzLl9jdXJyQWdlbnRJZCxcbiAgICAgICAgdGFyZ2V0czogdGFyZ2V0cyxcbiAgICAgICAgc291cmNlOiBzb3VyY2VcbiAgICB9O1xuICAgIF9tYXBBZ2VudEFycmF5LmNhbGwodGhpcywgYWdlbnQpLnB1c2godGhpcy5fY3VyckFnZW50SWQpO1xuICAgIHJldHVybiB0aGlzLl9jdXJyQWdlbnRJZCsrO1xufVxuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuYXR0YWNoID0gZnVuY3Rpb24gYXR0YWNoKGFnZW50cywgdGFyZ2V0cywgc291cmNlKSB7XG4gICAgdGhpcy53YWtlKCk7XG4gICAgaWYgKGFnZW50cyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHZhciBhZ2VudElEcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFnZW50cy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIGFnZW50SURzW2ldID0gX2F0dGFjaE9uZS5jYWxsKHRoaXMsIGFnZW50c1tpXSwgdGFyZ2V0cywgc291cmNlKTtcbiAgICAgICAgcmV0dXJuIGFnZW50SURzO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gX2F0dGFjaE9uZS5jYWxsKHRoaXMsIGFnZW50cywgdGFyZ2V0cywgc291cmNlKTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5hdHRhY2hUbyA9IGZ1bmN0aW9uIGF0dGFjaFRvKGFnZW50SUQsIHRhcmdldCkge1xuICAgIF9nZXRBZ2VudERhdGEuY2FsbCh0aGlzLCBhZ2VudElEKS50YXJnZXRzLnB1c2godGFyZ2V0KTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5kZXRhY2ggPSBmdW5jdGlvbiBkZXRhY2goaWQpIHtcbiAgICB2YXIgYWdlbnQgPSB0aGlzLmdldEFnZW50KGlkKTtcbiAgICB2YXIgYWdlbnRBcnJheSA9IF9tYXBBZ2VudEFycmF5LmNhbGwodGhpcywgYWdlbnQpO1xuICAgIHZhciBpbmRleCA9IGFnZW50QXJyYXkuaW5kZXhPZihpZCk7XG4gICAgYWdlbnRBcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGRlbGV0ZSB0aGlzLl9hZ2VudERhdGFbaWRdO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmRldGFjaEZyb20gPSBmdW5jdGlvbiBkZXRhY2hGcm9tKGlkLCB0YXJnZXQpIHtcbiAgICB2YXIgYm91bmRBZ2VudCA9IF9nZXRBZ2VudERhdGEuY2FsbCh0aGlzLCBpZCk7XG4gICAgaWYgKGJvdW5kQWdlbnQuc291cmNlID09PSB0YXJnZXQpXG4gICAgICAgIHRoaXMuZGV0YWNoKGlkKTtcbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIHRhcmdldHMgPSBib3VuZEFnZW50LnRhcmdldHM7XG4gICAgICAgIHZhciBpbmRleCA9IHRhcmdldHMuaW5kZXhPZih0YXJnZXQpO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSlcbiAgICAgICAgICAgIHRhcmdldHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZGV0YWNoQWxsID0gZnVuY3Rpb24gZGV0YWNoQWxsKCkge1xuICAgIHRoaXMuX2FnZW50RGF0YSA9IHt9O1xuICAgIHRoaXMuX2ZvcmNlcyA9IFtdO1xuICAgIHRoaXMuX2NvbnN0cmFpbnRzID0gW107XG4gICAgdGhpcy5fY3VyckFnZW50SWQgPSAwO1xufTtcbmZ1bmN0aW9uIF9nZXRBZ2VudERhdGEoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5fYWdlbnREYXRhW2lkXTtcbn1cblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmdldEFnZW50ID0gZnVuY3Rpb24gZ2V0QWdlbnQoaWQpIHtcbiAgICByZXR1cm4gX2dldEFnZW50RGF0YS5jYWxsKHRoaXMsIGlkKS5hZ2VudDtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5nZXRQYXJ0aWNsZXMgPSBmdW5jdGlvbiBnZXRQYXJ0aWNsZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhcnRpY2xlcztcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5nZXRCb2RpZXMgPSBmdW5jdGlvbiBnZXRCb2RpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JvZGllcztcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5nZXRQYXJ0aWNsZXNBbmRCb2RpZXMgPSBmdW5jdGlvbiBnZXRQYXJ0aWNsZXNBbmRCb2RpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UGFydGljbGVzKCkuY29uY2F0KHRoaXMuZ2V0Qm9kaWVzKCkpO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmZvckVhY2hQYXJ0aWNsZSA9IGZ1bmN0aW9uIGZvckVhY2hQYXJ0aWNsZShmbiwgZHQpIHtcbiAgICB2YXIgcGFydGljbGVzID0gdGhpcy5nZXRQYXJ0aWNsZXMoKTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDAsIGxlbiA9IHBhcnRpY2xlcy5sZW5ndGg7IGluZGV4IDwgbGVuOyBpbmRleCsrKVxuICAgICAgICBmbi5jYWxsKHRoaXMsIHBhcnRpY2xlc1tpbmRleF0sIGR0KTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5mb3JFYWNoQm9keSA9IGZ1bmN0aW9uIGZvckVhY2hCb2R5KGZuLCBkdCkge1xuICAgIGlmICghdGhpcy5faGFzQm9kaWVzKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIGJvZGllcyA9IHRoaXMuZ2V0Qm9kaWVzKCk7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwLCBsZW4gPSBib2RpZXMubGVuZ3RoOyBpbmRleCA8IGxlbjsgaW5kZXgrKylcbiAgICAgICAgZm4uY2FsbCh0aGlzLCBib2RpZXNbaW5kZXhdLCBkdCk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4sIGR0KSB7XG4gICAgdGhpcy5mb3JFYWNoUGFydGljbGUoZm4sIGR0KTtcbiAgICB0aGlzLmZvckVhY2hCb2R5KGZuLCBkdCk7XG59O1xuZnVuY3Rpb24gX3VwZGF0ZUZvcmNlKGluZGV4KSB7XG4gICAgdmFyIGJvdW5kQWdlbnQgPSBfZ2V0QWdlbnREYXRhLmNhbGwodGhpcywgdGhpcy5fZm9yY2VzW2luZGV4XSk7XG4gICAgYm91bmRBZ2VudC5hZ2VudC5hcHBseUZvcmNlKGJvdW5kQWdlbnQudGFyZ2V0cywgYm91bmRBZ2VudC5zb3VyY2UpO1xufVxuZnVuY3Rpb24gX3VwZGF0ZUZvcmNlcygpIHtcbiAgICBmb3IgKHZhciBpbmRleCA9IHRoaXMuX2ZvcmNlcy5sZW5ndGggLSAxOyBpbmRleCA+IC0xOyBpbmRleC0tKVxuICAgICAgICBfdXBkYXRlRm9yY2UuY2FsbCh0aGlzLCBpbmRleCk7XG59XG5mdW5jdGlvbiBfdXBkYXRlQ29uc3RyYWludChpbmRleCwgZHQpIHtcbiAgICB2YXIgYm91bmRBZ2VudCA9IHRoaXMuX2FnZW50RGF0YVt0aGlzLl9jb25zdHJhaW50c1tpbmRleF1dO1xuICAgIHJldHVybiBib3VuZEFnZW50LmFnZW50LmFwcGx5Q29uc3RyYWludChib3VuZEFnZW50LnRhcmdldHMsIGJvdW5kQWdlbnQuc291cmNlLCBkdCk7XG59XG5mdW5jdGlvbiBfdXBkYXRlQ29uc3RyYWludHMoZHQpIHtcbiAgICB2YXIgaXRlcmF0aW9uID0gMDtcbiAgICB3aGlsZSAoaXRlcmF0aW9uIDwgdGhpcy5vcHRpb25zLmNvbnN0cmFpbnRTdGVwcykge1xuICAgICAgICBmb3IgKHZhciBpbmRleCA9IHRoaXMuX2NvbnN0cmFpbnRzLmxlbmd0aCAtIDE7IGluZGV4ID4gLTE7IGluZGV4LS0pXG4gICAgICAgICAgICBfdXBkYXRlQ29uc3RyYWludC5jYWxsKHRoaXMsIGluZGV4LCBkdCk7XG4gICAgICAgIGl0ZXJhdGlvbisrO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF91cGRhdGVWZWxvY2l0aWVzKGJvZHksIGR0KSB7XG4gICAgYm9keS5pbnRlZ3JhdGVWZWxvY2l0eShkdCk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy52ZWxvY2l0eUNhcClcbiAgICAgICAgYm9keS52ZWxvY2l0eS5jYXAodGhpcy5vcHRpb25zLnZlbG9jaXR5Q2FwKS5wdXQoYm9keS52ZWxvY2l0eSk7XG59XG5mdW5jdGlvbiBfdXBkYXRlQW5ndWxhclZlbG9jaXRpZXMoYm9keSwgZHQpIHtcbiAgICBib2R5LmludGVncmF0ZUFuZ3VsYXJNb21lbnR1bShkdCk7XG4gICAgYm9keS51cGRhdGVBbmd1bGFyVmVsb2NpdHkoKTtcbiAgICBpZiAodGhpcy5vcHRpb25zLmFuZ3VsYXJWZWxvY2l0eUNhcClcbiAgICAgICAgYm9keS5hbmd1bGFyVmVsb2NpdHkuY2FwKHRoaXMub3B0aW9ucy5hbmd1bGFyVmVsb2NpdHlDYXApLnB1dChib2R5LmFuZ3VsYXJWZWxvY2l0eSk7XG59XG5mdW5jdGlvbiBfdXBkYXRlT3JpZW50YXRpb25zKGJvZHksIGR0KSB7XG4gICAgYm9keS5pbnRlZ3JhdGVPcmllbnRhdGlvbihkdCk7XG59XG5mdW5jdGlvbiBfdXBkYXRlUG9zaXRpb25zKGJvZHksIGR0KSB7XG4gICAgYm9keS5pbnRlZ3JhdGVQb3NpdGlvbihkdCk7XG4gICAgYm9keS5lbWl0KF9ldmVudHMudXBkYXRlLCBib2R5KTtcbn1cbmZ1bmN0aW9uIF9pbnRlZ3JhdGUoZHQpIHtcbiAgICBfdXBkYXRlRm9yY2VzLmNhbGwodGhpcywgZHQpO1xuICAgIHRoaXMuZm9yRWFjaChfdXBkYXRlVmVsb2NpdGllcywgZHQpO1xuICAgIHRoaXMuZm9yRWFjaEJvZHkoX3VwZGF0ZUFuZ3VsYXJWZWxvY2l0aWVzLCBkdCk7XG4gICAgX3VwZGF0ZUNvbnN0cmFpbnRzLmNhbGwodGhpcywgZHQpO1xuICAgIHRoaXMuZm9yRWFjaEJvZHkoX3VwZGF0ZU9yaWVudGF0aW9ucywgZHQpO1xuICAgIHRoaXMuZm9yRWFjaChfdXBkYXRlUG9zaXRpb25zLCBkdCk7XG59XG5mdW5jdGlvbiBfZ2V0UGFydGljbGVzRW5lcmd5KCkge1xuICAgIHZhciBlbmVyZ3kgPSAwO1xuICAgIHZhciBwYXJ0aWNsZUVuZXJneSA9IDA7XG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChwYXJ0aWNsZSkge1xuICAgICAgICBwYXJ0aWNsZUVuZXJneSA9IHBhcnRpY2xlLmdldEVuZXJneSgpO1xuICAgICAgICBlbmVyZ3kgKz0gcGFydGljbGVFbmVyZ3k7XG4gICAgfSk7XG4gICAgcmV0dXJuIGVuZXJneTtcbn1cbmZ1bmN0aW9uIF9nZXRBZ2VudHNFbmVyZ3koKSB7XG4gICAgdmFyIGVuZXJneSA9IDA7XG4gICAgZm9yICh2YXIgaWQgaW4gdGhpcy5fYWdlbnREYXRhKVxuICAgICAgICBlbmVyZ3kgKz0gdGhpcy5nZXRBZ2VudEVuZXJneShpZCk7XG4gICAgcmV0dXJuIGVuZXJneTtcbn1cblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmdldEFnZW50RW5lcmd5ID0gZnVuY3Rpb24gKGFnZW50SWQpIHtcbiAgICB2YXIgYWdlbnREYXRhID0gX2dldEFnZW50RGF0YS5jYWxsKHRoaXMsIGFnZW50SWQpO1xuICAgIHJldHVybiBhZ2VudERhdGEuYWdlbnQuZ2V0RW5lcmd5KGFnZW50RGF0YS50YXJnZXRzLCBhZ2VudERhdGEuc291cmNlKTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5nZXRFbmVyZ3kgPSBmdW5jdGlvbiBnZXRFbmVyZ3koKSB7XG4gICAgcmV0dXJuIF9nZXRQYXJ0aWNsZXNFbmVyZ3kuY2FsbCh0aGlzKSArIF9nZXRBZ2VudHNFbmVyZ3kuY2FsbCh0aGlzKTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5zdGVwID0gZnVuY3Rpb24gc3RlcCgpIHtcbiAgICBpZiAodGhpcy5pc1NsZWVwaW5nKCkpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgY3VyclRpbWUgPSBub3coKTtcbiAgICB2YXIgZHRGcmFtZSA9IGN1cnJUaW1lIC0gdGhpcy5fcHJldlRpbWU7XG4gICAgdGhpcy5fcHJldlRpbWUgPSBjdXJyVGltZTtcbiAgICBpZiAoZHRGcmFtZSA8IE1JTl9USU1FX1NURVApXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAoZHRGcmFtZSA+IE1BWF9USU1FX1NURVApXG4gICAgICAgIGR0RnJhbWUgPSBNQVhfVElNRV9TVEVQO1xuICAgIF9pbnRlZ3JhdGUuY2FsbCh0aGlzLCBUSU1FU1RFUCk7XG4gICAgdGhpcy5lbWl0KF9ldmVudHMudXBkYXRlLCB0aGlzKTtcbiAgICBpZiAodGhpcy5nZXRFbmVyZ3koKSA8IHRoaXMub3B0aW9ucy5zbGVlcFRvbGVyYW5jZSlcbiAgICAgICAgdGhpcy5zbGVlcCgpO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmlzU2xlZXBpbmcgPSBmdW5jdGlvbiBpc1NsZWVwaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9pc1NsZWVwaW5nO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNTbGVlcGluZygpIHtcbiAgICByZXR1cm4gIXRoaXMuX2lzU2xlZXBpbmc7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuc2xlZXAgPSBmdW5jdGlvbiBzbGVlcCgpIHtcbiAgICBpZiAodGhpcy5faXNTbGVlcGluZylcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAoYm9keSkge1xuICAgICAgICBib2R5LnNsZWVwKCk7XG4gICAgfSk7XG4gICAgdGhpcy5lbWl0KF9ldmVudHMuZW5kLCB0aGlzKTtcbiAgICB0aGlzLl9pc1NsZWVwaW5nID0gdHJ1ZTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS53YWtlID0gZnVuY3Rpb24gd2FrZSgpIHtcbiAgICBpZiAoIXRoaXMuX2lzU2xlZXBpbmcpXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLl9wcmV2VGltZSA9IG5vdygpO1xuICAgIHRoaXMuZW1pdChfZXZlbnRzLnN0YXJ0LCB0aGlzKTtcbiAgICB0aGlzLl9pc1NsZWVwaW5nID0gZmFsc2U7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSwgZGF0YSkge1xuICAgIGlmICh0aGlzLl9ldmVudEhhbmRsZXIgPT09IG51bGwpXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIuZW1pdCh0eXBlLCBkYXRhKTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50LCBmbikge1xuICAgIGlmICh0aGlzLl9ldmVudEhhbmRsZXIgPT09IG51bGwpXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlciA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIub24oZXZlbnQsIGZuKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFBoeXNpY3NFbmdpbmU7IiwidmFyIFZlY3RvciA9IHJlcXVpcmUoJy4uLy4uL21hdGgvVmVjdG9yJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi4vLi4vY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuLi8uLi9jb3JlL0V2ZW50SGFuZGxlcicpO1xudmFyIEludGVncmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlZ3JhdG9ycy9TeW1wbGVjdGljRXVsZXInKTtcbmZ1bmN0aW9uIFBhcnRpY2xlKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIgZGVmYXVsdHMgPSBQYXJ0aWNsZS5ERUZBVUxUX09QVElPTlM7XG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLnZlbG9jaXR5ID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMuZm9yY2UgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5fZW5naW5lID0gbnVsbDtcbiAgICB0aGlzLl9pc1NsZWVwaW5nID0gdHJ1ZTtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG51bGw7XG4gICAgdGhpcy5tYXNzID0gb3B0aW9ucy5tYXNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1hc3MgOiBkZWZhdWx0cy5tYXNzO1xuICAgIHRoaXMuaW52ZXJzZU1hc3MgPSAxIC8gdGhpcy5tYXNzO1xuICAgIHRoaXMuc2V0UG9zaXRpb24ob3B0aW9ucy5wb3NpdGlvbiB8fCBkZWZhdWx0cy5wb3NpdGlvbik7XG4gICAgdGhpcy5zZXRWZWxvY2l0eShvcHRpb25zLnZlbG9jaXR5IHx8IGRlZmF1bHRzLnZlbG9jaXR5KTtcbiAgICB0aGlzLmZvcmNlLnNldChvcHRpb25zLmZvcmNlIHx8IFtcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0pO1xuICAgIHRoaXMudHJhbnNmb3JtID0gVHJhbnNmb3JtLmlkZW50aXR5LnNsaWNlKCk7XG4gICAgdGhpcy5fc3BlYyA9IHtcbiAgICAgICAgc2l6ZTogW1xuICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgIHRydWVcbiAgICAgICAgXSxcbiAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRoaXMudHJhbnNmb3JtLFxuICAgICAgICAgICAgb3JpZ2luOiBbXG4gICAgICAgICAgICAgICAgMC41LFxuICAgICAgICAgICAgICAgIDAuNVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHRhcmdldDogbnVsbFxuICAgICAgICB9XG4gICAgfTtcbn1cblBhcnRpY2xlLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBwb3NpdGlvbjogW1xuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSxcbiAgICB2ZWxvY2l0eTogW1xuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSxcbiAgICBtYXNzOiAxXG59O1xudmFyIF9ldmVudHMgPSB7XG4gICAgICAgIHN0YXJ0OiAnc3RhcnQnLFxuICAgICAgICB1cGRhdGU6ICd1cGRhdGUnLFxuICAgICAgICBlbmQ6ICdlbmQnXG4gICAgfTtcbnZhciBub3cgPSBEYXRlLm5vdztcblBhcnRpY2xlLnByb3RvdHlwZS5pc0JvZHkgPSBmYWxzZTtcblBhcnRpY2xlLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiAhdGhpcy5faXNTbGVlcGluZztcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuc2xlZXAgPSBmdW5jdGlvbiBzbGVlcCgpIHtcbiAgICBpZiAodGhpcy5faXNTbGVlcGluZylcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuZW1pdChfZXZlbnRzLmVuZCwgdGhpcyk7XG4gICAgdGhpcy5faXNTbGVlcGluZyA9IHRydWU7XG59O1xuUGFydGljbGUucHJvdG90eXBlLndha2UgPSBmdW5jdGlvbiB3YWtlKCkge1xuICAgIGlmICghdGhpcy5faXNTbGVlcGluZylcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuZW1pdChfZXZlbnRzLnN0YXJ0LCB0aGlzKTtcbiAgICB0aGlzLl9pc1NsZWVwaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fcHJldlRpbWUgPSBub3coKTtcbiAgICBpZiAodGhpcy5fZW5naW5lKVxuICAgICAgICB0aGlzLl9lbmdpbmUud2FrZSgpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5zZXRQb3NpdGlvbiA9IGZ1bmN0aW9uIHNldFBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgdGhpcy5wb3NpdGlvbi5zZXQocG9zaXRpb24pO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5zZXRQb3NpdGlvbjFEID0gZnVuY3Rpb24gc2V0UG9zaXRpb24xRCh4KSB7XG4gICAgdGhpcy5wb3NpdGlvbi54ID0geDtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuZ2V0UG9zaXRpb24gPSBmdW5jdGlvbiBnZXRQb3NpdGlvbigpIHtcbiAgICB0aGlzLl9lbmdpbmUuc3RlcCgpO1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLmdldCgpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5nZXRQb3NpdGlvbjFEID0gZnVuY3Rpb24gZ2V0UG9zaXRpb24xRCgpIHtcbiAgICB0aGlzLl9lbmdpbmUuc3RlcCgpO1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLng7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnNldFZlbG9jaXR5ID0gZnVuY3Rpb24gc2V0VmVsb2NpdHkodmVsb2NpdHkpIHtcbiAgICB0aGlzLnZlbG9jaXR5LnNldCh2ZWxvY2l0eSk7XG4gICAgaWYgKCEodmVsb2NpdHlbMF0gPT09IDAgJiYgdmVsb2NpdHlbMV0gPT09IDAgJiYgdmVsb2NpdHlbMl0gPT09IDApKVxuICAgICAgICB0aGlzLndha2UoKTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuc2V0VmVsb2NpdHkxRCA9IGZ1bmN0aW9uIHNldFZlbG9jaXR5MUQoeCkge1xuICAgIHRoaXMudmVsb2NpdHkueCA9IHg7XG4gICAgaWYgKHggIT09IDApXG4gICAgICAgIHRoaXMud2FrZSgpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5nZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIGdldFZlbG9jaXR5KCkge1xuICAgIHJldHVybiB0aGlzLnZlbG9jaXR5LmdldCgpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5zZXRGb3JjZSA9IGZ1bmN0aW9uIHNldEZvcmNlKGZvcmNlKSB7XG4gICAgdGhpcy5mb3JjZS5zZXQoZm9yY2UpO1xuICAgIHRoaXMud2FrZSgpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5nZXRWZWxvY2l0eTFEID0gZnVuY3Rpb24gZ2V0VmVsb2NpdHkxRCgpIHtcbiAgICByZXR1cm4gdGhpcy52ZWxvY2l0eS54O1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5zZXRNYXNzID0gZnVuY3Rpb24gc2V0TWFzcyhtYXNzKSB7XG4gICAgdGhpcy5tYXNzID0gbWFzcztcbiAgICB0aGlzLmludmVyc2VNYXNzID0gMSAvIG1hc3M7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmdldE1hc3MgPSBmdW5jdGlvbiBnZXRNYXNzKCkge1xuICAgIHJldHVybiB0aGlzLm1hc3M7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQocG9zaXRpb24sIHZlbG9jaXR5KSB7XG4gICAgdGhpcy5zZXRQb3NpdGlvbihwb3NpdGlvbiB8fCBbXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdKTtcbiAgICB0aGlzLnNldFZlbG9jaXR5KHZlbG9jaXR5IHx8IFtcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0pO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5hcHBseUZvcmNlID0gZnVuY3Rpb24gYXBwbHlGb3JjZShmb3JjZSkge1xuICAgIGlmIChmb3JjZS5pc1plcm8oKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuZm9yY2UuYWRkKGZvcmNlKS5wdXQodGhpcy5mb3JjZSk7XG4gICAgdGhpcy53YWtlKCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmFwcGx5SW1wdWxzZSA9IGZ1bmN0aW9uIGFwcGx5SW1wdWxzZShpbXB1bHNlKSB7XG4gICAgaWYgKGltcHVsc2UuaXNaZXJvKCkpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgdmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5O1xuICAgIHZlbG9jaXR5LmFkZChpbXB1bHNlLm11bHQodGhpcy5pbnZlcnNlTWFzcykpLnB1dCh2ZWxvY2l0eSk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmludGVncmF0ZVZlbG9jaXR5ID0gZnVuY3Rpb24gaW50ZWdyYXRlVmVsb2NpdHkoZHQpIHtcbiAgICBJbnRlZ3JhdG9yLmludGVncmF0ZVZlbG9jaXR5KHRoaXMsIGR0KTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuaW50ZWdyYXRlUG9zaXRpb24gPSBmdW5jdGlvbiBpbnRlZ3JhdGVQb3NpdGlvbihkdCkge1xuICAgIEludGVncmF0b3IuaW50ZWdyYXRlUG9zaXRpb24odGhpcywgZHQpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5faW50ZWdyYXRlID0gZnVuY3Rpb24gX2ludGVncmF0ZShkdCkge1xuICAgIHRoaXMuaW50ZWdyYXRlVmVsb2NpdHkoZHQpO1xuICAgIHRoaXMuaW50ZWdyYXRlUG9zaXRpb24oZHQpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5nZXRFbmVyZ3kgPSBmdW5jdGlvbiBnZXRFbmVyZ3koKSB7XG4gICAgcmV0dXJuIDAuNSAqIHRoaXMubWFzcyAqIHRoaXMudmVsb2NpdHkubm9ybVNxdWFyZWQoKTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuZ2V0VHJhbnNmb3JtID0gZnVuY3Rpb24gZ2V0VHJhbnNmb3JtKCkge1xuICAgIHRoaXMuX2VuZ2luZS5zdGVwKCk7XG4gICAgdmFyIHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcbiAgICB2YXIgdHJhbnNmb3JtID0gdGhpcy50cmFuc2Zvcm07XG4gICAgdHJhbnNmb3JtWzEyXSA9IHBvc2l0aW9uLng7XG4gICAgdHJhbnNmb3JtWzEzXSA9IHBvc2l0aW9uLnk7XG4gICAgdHJhbnNmb3JtWzE0XSA9IHBvc2l0aW9uLno7XG4gICAgcmV0dXJuIHRyYW5zZm9ybTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUubW9kaWZ5ID0gZnVuY3Rpb24gbW9kaWZ5KHRhcmdldCkge1xuICAgIHZhciBfc3BlYyA9IHRoaXMuX3NwZWMudGFyZ2V0O1xuICAgIF9zcGVjLnRyYW5zZm9ybSA9IHRoaXMuZ2V0VHJhbnNmb3JtKCk7XG4gICAgX3NwZWMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHJldHVybiB0aGlzLl9zcGVjO1xufTtcbmZ1bmN0aW9uIF9jcmVhdGVFdmVudE91dHB1dCgpIHtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5iaW5kVGhpcyh0aGlzKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG59XG5QYXJ0aWNsZS5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSwgZGF0YSkge1xuICAgIGlmICghdGhpcy5fZXZlbnRPdXRwdXQpXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KHR5cGUsIGRhdGEpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKCkge1xuICAgIF9jcmVhdGVFdmVudE91dHB1dC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzLm9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMucmVtb3ZlTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uIHBpcGUoKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMucGlwZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS51bnBpcGUgPSBmdW5jdGlvbiB1bnBpcGUoKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMudW5waXBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBQYXJ0aWNsZTsiLCJ2YXIgVmVjdG9yID0gcmVxdWlyZSgnLi4vLi4vbWF0aC9WZWN0b3InKTtcbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuLi8uLi9jb3JlL0V2ZW50SGFuZGxlcicpO1xuZnVuY3Rpb24gRm9yY2UoZm9yY2UpIHtcbiAgICB0aGlzLmZvcmNlID0gbmV3IFZlY3Rvcihmb3JjZSk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRPdXRwdXQpO1xufVxuRm9yY2UucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdjaGFuZ2UnLCBvcHRpb25zKTtcbn07XG5Gb3JjZS5wcm90b3R5cGUuYXBwbHlGb3JjZSA9IGZ1bmN0aW9uIGFwcGx5Rm9yY2UodGFyZ2V0cykge1xuICAgIHZhciBsZW5ndGggPSB0YXJnZXRzLmxlbmd0aDtcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgdGFyZ2V0c1tsZW5ndGhdLmFwcGx5Rm9yY2UodGhpcy5mb3JjZSk7XG4gICAgfVxufTtcbkZvcmNlLnByb3RvdHlwZS5nZXRFbmVyZ3kgPSBmdW5jdGlvbiBnZXRFbmVyZ3koKSB7XG4gICAgcmV0dXJuIDA7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBGb3JjZTsiLCJ2YXIgRm9yY2UgPSByZXF1aXJlKCcuL0ZvcmNlJyk7XG52YXIgVmVjdG9yID0gcmVxdWlyZSgnLi4vLi4vbWF0aC9WZWN0b3InKTtcbmZ1bmN0aW9uIFNwcmluZyhvcHRpb25zKSB7XG4gICAgRm9yY2UuY2FsbCh0aGlzKTtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKHRoaXMuY29uc3RydWN0b3IuREVGQVVMVF9PUFRJT05TKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuZGlzcCA9IG5ldyBWZWN0b3IoMCwgMCwgMCk7XG4gICAgX2luaXQuY2FsbCh0aGlzKTtcbn1cblNwcmluZy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEZvcmNlLnByb3RvdHlwZSk7XG5TcHJpbmcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3ByaW5nO1xudmFyIHBpID0gTWF0aC5QSTtcbnZhciBNSU5fUEVSSU9EID0gMTUwO1xuU3ByaW5nLkZPUkNFX0ZVTkNUSU9OUyA9IHtcbiAgICBGRU5FOiBmdW5jdGlvbiAoZGlzdCwgck1heCkge1xuICAgICAgICB2YXIgck1heFNtYWxsID0gck1heCAqIDAuOTk7XG4gICAgICAgIHZhciByID0gTWF0aC5tYXgoTWF0aC5taW4oZGlzdCwgck1heFNtYWxsKSwgLXJNYXhTbWFsbCk7XG4gICAgICAgIHJldHVybiByIC8gKDEgLSByICogciAvIChyTWF4ICogck1heCkpO1xuICAgIH0sXG4gICAgSE9PSzogZnVuY3Rpb24gKGRpc3QpIHtcbiAgICAgICAgcmV0dXJuIGRpc3Q7XG4gICAgfVxufTtcblNwcmluZy5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgcGVyaW9kOiAzMDAsXG4gICAgZGFtcGluZ1JhdGlvOiAwLjEsXG4gICAgbGVuZ3RoOiAwLFxuICAgIG1heExlbmd0aDogSW5maW5pdHksXG4gICAgYW5jaG9yOiB1bmRlZmluZWQsXG4gICAgZm9yY2VGdW5jdGlvbjogU3ByaW5nLkZPUkNFX0ZVTkNUSU9OUy5IT09LXG59O1xuZnVuY3Rpb24gX2NhbGNTdGlmZm5lc3MoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgb3B0aW9ucy5zdGlmZm5lc3MgPSBNYXRoLnBvdygyICogcGkgLyBvcHRpb25zLnBlcmlvZCwgMik7XG59XG5mdW5jdGlvbiBfY2FsY0RhbXBpbmcoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgb3B0aW9ucy5kYW1waW5nID0gNCAqIHBpICogb3B0aW9ucy5kYW1waW5nUmF0aW8gLyBvcHRpb25zLnBlcmlvZDtcbn1cbmZ1bmN0aW9uIF9pbml0KCkge1xuICAgIF9jYWxjU3RpZmZuZXNzLmNhbGwodGhpcyk7XG4gICAgX2NhbGNEYW1waW5nLmNhbGwodGhpcyk7XG59XG5TcHJpbmcucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5hbmNob3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAob3B0aW9ucy5hbmNob3IucG9zaXRpb24gaW5zdGFuY2VvZiBWZWN0b3IpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYW5jaG9yID0gb3B0aW9ucy5hbmNob3IucG9zaXRpb247XG4gICAgICAgIGlmIChvcHRpb25zLmFuY2hvciBpbnN0YW5jZW9mIFZlY3RvcilcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hbmNob3IgPSBvcHRpb25zLmFuY2hvcjtcbiAgICAgICAgaWYgKG9wdGlvbnMuYW5jaG9yIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYW5jaG9yID0gbmV3IFZlY3RvcihvcHRpb25zLmFuY2hvcik7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnBlcmlvZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvcHRpb25zLnBlcmlvZCA8IE1JTl9QRVJJT0QpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucGVyaW9kID0gTUlOX1BFUklPRDtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVGhlIHBlcmlvZCBvZiBhIFNwcmluZ1RyYW5zaXRpb24gaXMgY2FwcGVkIGF0ICcgKyBNSU5fUEVSSU9EICsgJyBtcy4gVXNlIGEgU25hcFRyYW5zaXRpb24gZm9yIGZhc3RlciB0cmFuc2l0aW9ucycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9ucy5wZXJpb2QgPSBvcHRpb25zLnBlcmlvZDtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuZGFtcGluZ1JhdGlvICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5kYW1waW5nUmF0aW8gPSBvcHRpb25zLmRhbXBpbmdSYXRpbztcbiAgICBpZiAob3B0aW9ucy5sZW5ndGggIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmxlbmd0aCA9IG9wdGlvbnMubGVuZ3RoO1xuICAgIGlmIChvcHRpb25zLmZvcmNlRnVuY3Rpb24gIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmZvcmNlRnVuY3Rpb24gPSBvcHRpb25zLmZvcmNlRnVuY3Rpb247XG4gICAgaWYgKG9wdGlvbnMubWF4TGVuZ3RoICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5tYXhMZW5ndGggPSBvcHRpb25zLm1heExlbmd0aDtcbiAgICBfaW5pdC5jYWxsKHRoaXMpO1xuICAgIEZvcmNlLnByb3RvdHlwZS5zZXRPcHRpb25zLmNhbGwodGhpcywgb3B0aW9ucyk7XG59O1xuU3ByaW5nLnByb3RvdHlwZS5hcHBseUZvcmNlID0gZnVuY3Rpb24gYXBwbHlGb3JjZSh0YXJnZXRzLCBzb3VyY2UpIHtcbiAgICB2YXIgZm9yY2UgPSB0aGlzLmZvcmNlO1xuICAgIHZhciBkaXNwID0gdGhpcy5kaXNwO1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIHZhciBzdGlmZm5lc3MgPSBvcHRpb25zLnN0aWZmbmVzcztcbiAgICB2YXIgZGFtcGluZyA9IG9wdGlvbnMuZGFtcGluZztcbiAgICB2YXIgcmVzdExlbmd0aCA9IG9wdGlvbnMubGVuZ3RoO1xuICAgIHZhciBtYXhMZW5ndGggPSBvcHRpb25zLm1heExlbmd0aDtcbiAgICB2YXIgYW5jaG9yID0gb3B0aW9ucy5hbmNob3IgfHwgc291cmNlLnBvc2l0aW9uO1xuICAgIHZhciBmb3JjZUZ1bmN0aW9uID0gb3B0aW9ucy5mb3JjZUZ1bmN0aW9uO1xuICAgIHZhciBpO1xuICAgIHZhciB0YXJnZXQ7XG4gICAgdmFyIHAyO1xuICAgIHZhciB2MjtcbiAgICB2YXIgZGlzdDtcbiAgICB2YXIgbTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGFyZ2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0YXJnZXQgPSB0YXJnZXRzW2ldO1xuICAgICAgICBwMiA9IHRhcmdldC5wb3NpdGlvbjtcbiAgICAgICAgdjIgPSB0YXJnZXQudmVsb2NpdHk7XG4gICAgICAgIGFuY2hvci5zdWIocDIpLnB1dChkaXNwKTtcbiAgICAgICAgZGlzdCA9IGRpc3Aubm9ybSgpIC0gcmVzdExlbmd0aDtcbiAgICAgICAgaWYgKGRpc3QgPT09IDApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIG0gPSB0YXJnZXQubWFzcztcbiAgICAgICAgc3RpZmZuZXNzICo9IG07XG4gICAgICAgIGRhbXBpbmcgKj0gbTtcbiAgICAgICAgZGlzcC5ub3JtYWxpemUoc3RpZmZuZXNzICogZm9yY2VGdW5jdGlvbihkaXN0LCBtYXhMZW5ndGgpKS5wdXQoZm9yY2UpO1xuICAgICAgICBpZiAoZGFtcGluZylcbiAgICAgICAgICAgIGlmIChzb3VyY2UpXG4gICAgICAgICAgICAgICAgZm9yY2UuYWRkKHYyLnN1Yihzb3VyY2UudmVsb2NpdHkpLm11bHQoLWRhbXBpbmcpKS5wdXQoZm9yY2UpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGZvcmNlLmFkZCh2Mi5tdWx0KC1kYW1waW5nKSkucHV0KGZvcmNlKTtcbiAgICAgICAgdGFyZ2V0LmFwcGx5Rm9yY2UoZm9yY2UpO1xuICAgICAgICBpZiAoc291cmNlKVxuICAgICAgICAgICAgc291cmNlLmFwcGx5Rm9yY2UoZm9yY2UubXVsdCgtMSkpO1xuICAgIH1cbn07XG5TcHJpbmcucHJvdG90eXBlLmdldEVuZXJneSA9IGZ1bmN0aW9uIGdldEVuZXJneSh0YXJnZXRzLCBzb3VyY2UpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICB2YXIgcmVzdExlbmd0aCA9IG9wdGlvbnMubGVuZ3RoO1xuICAgIHZhciBhbmNob3IgPSBzb3VyY2UgPyBzb3VyY2UucG9zaXRpb24gOiBvcHRpb25zLmFuY2hvcjtcbiAgICB2YXIgc3RyZW5ndGggPSBvcHRpb25zLnN0aWZmbmVzcztcbiAgICB2YXIgZW5lcmd5ID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IHRhcmdldHNbaV07XG4gICAgICAgIHZhciBkaXN0ID0gYW5jaG9yLnN1Yih0YXJnZXQucG9zaXRpb24pLm5vcm0oKSAtIHJlc3RMZW5ndGg7XG4gICAgICAgIGVuZXJneSArPSAwLjUgKiBzdHJlbmd0aCAqIGRpc3QgKiBkaXN0O1xuICAgIH1cbiAgICByZXR1cm4gZW5lcmd5O1xufTtcbm1vZHVsZS5leHBvcnRzID0gU3ByaW5nOyIsInZhciBTeW1wbGVjdGljRXVsZXIgPSB7fTtcblN5bXBsZWN0aWNFdWxlci5pbnRlZ3JhdGVWZWxvY2l0eSA9IGZ1bmN0aW9uIGludGVncmF0ZVZlbG9jaXR5KGJvZHksIGR0KSB7XG4gICAgdmFyIHYgPSBib2R5LnZlbG9jaXR5O1xuICAgIHZhciB3ID0gYm9keS5pbnZlcnNlTWFzcztcbiAgICB2YXIgZiA9IGJvZHkuZm9yY2U7XG4gICAgaWYgKGYuaXNaZXJvKCkpXG4gICAgICAgIHJldHVybjtcbiAgICB2LmFkZChmLm11bHQoZHQgKiB3KSkucHV0KHYpO1xuICAgIGYuY2xlYXIoKTtcbn07XG5TeW1wbGVjdGljRXVsZXIuaW50ZWdyYXRlUG9zaXRpb24gPSBmdW5jdGlvbiBpbnRlZ3JhdGVQb3NpdGlvbihib2R5LCBkdCkge1xuICAgIHZhciBwID0gYm9keS5wb3NpdGlvbjtcbiAgICB2YXIgdiA9IGJvZHkudmVsb2NpdHk7XG4gICAgcC5hZGQodi5tdWx0KGR0KSkucHV0KHApO1xufTtcblN5bXBsZWN0aWNFdWxlci5pbnRlZ3JhdGVBbmd1bGFyTW9tZW50dW0gPSBmdW5jdGlvbiBpbnRlZ3JhdGVBbmd1bGFyTW9tZW50dW0oYm9keSwgZHQpIHtcbiAgICB2YXIgTCA9IGJvZHkuYW5ndWxhck1vbWVudHVtO1xuICAgIHZhciB0ID0gYm9keS50b3JxdWU7XG4gICAgaWYgKHQuaXNaZXJvKCkpXG4gICAgICAgIHJldHVybjtcbiAgICBMLmFkZCh0Lm11bHQoZHQpKS5wdXQoTCk7XG4gICAgdC5jbGVhcigpO1xufTtcblN5bXBsZWN0aWNFdWxlci5pbnRlZ3JhdGVPcmllbnRhdGlvbiA9IGZ1bmN0aW9uIGludGVncmF0ZU9yaWVudGF0aW9uKGJvZHksIGR0KSB7XG4gICAgdmFyIHEgPSBib2R5Lm9yaWVudGF0aW9uO1xuICAgIHZhciB3ID0gYm9keS5hbmd1bGFyVmVsb2NpdHk7XG4gICAgaWYgKHcuaXNaZXJvKCkpXG4gICAgICAgIHJldHVybjtcbiAgICBxLmFkZChxLm11bHRpcGx5KHcpLnNjYWxhck11bHRpcGx5KDAuNSAqIGR0KSkucHV0KHEpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gU3ltcGxlY3RpY0V1bGVyOyIsInZhciBTdXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9TdXJmYWNlJyk7XG5mdW5jdGlvbiBJbWFnZVN1cmZhY2Uob3B0aW9ucykge1xuICAgIHRoaXMuX2ltYWdlVXJsID0gdW5kZWZpbmVkO1xuICAgIFN1cmZhY2UuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cbnZhciB1cmxDYWNoZSA9IFtdO1xudmFyIGNvdW50Q2FjaGUgPSBbXTtcbnZhciBub2RlQ2FjaGUgPSBbXTtcbnZhciBjYWNoZUVuYWJsZWQgPSB0cnVlO1xuSW1hZ2VTdXJmYWNlLmVuYWJsZUNhY2hlID0gZnVuY3Rpb24gZW5hYmxlQ2FjaGUoKSB7XG4gICAgY2FjaGVFbmFibGVkID0gdHJ1ZTtcbn07XG5JbWFnZVN1cmZhY2UuZGlzYWJsZUNhY2hlID0gZnVuY3Rpb24gZGlzYWJsZUNhY2hlKCkge1xuICAgIGNhY2hlRW5hYmxlZCA9IGZhbHNlO1xufTtcbkltYWdlU3VyZmFjZS5jbGVhckNhY2hlID0gZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgICB1cmxDYWNoZSA9IFtdO1xuICAgIGNvdW50Q2FjaGUgPSBbXTtcbiAgICBub2RlQ2FjaGUgPSBbXTtcbn07XG5JbWFnZVN1cmZhY2UuZ2V0Q2FjaGUgPSBmdW5jdGlvbiBnZXRDYWNoZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB1cmxDYWNoZTogdXJsQ2FjaGUsXG4gICAgICAgIGNvdW50Q2FjaGU6IGNvdW50Q2FjaGUsXG4gICAgICAgIG5vZGVDYWNoZTogY291bnRDYWNoZVxuICAgIH07XG59O1xuSW1hZ2VTdXJmYWNlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU3VyZmFjZS5wcm90b3R5cGUpO1xuSW1hZ2VTdXJmYWNlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEltYWdlU3VyZmFjZTtcbkltYWdlU3VyZmFjZS5wcm90b3R5cGUuZWxlbWVudFR5cGUgPSAnaW1nJztcbkltYWdlU3VyZmFjZS5wcm90b3R5cGUuZWxlbWVudENsYXNzID0gJ2ZhbW91cy1zdXJmYWNlJztcbkltYWdlU3VyZmFjZS5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uIHNldENvbnRlbnQoaW1hZ2VVcmwpIHtcbiAgICB2YXIgdXJsSW5kZXggPSB1cmxDYWNoZS5pbmRleE9mKHRoaXMuX2ltYWdlVXJsKTtcbiAgICBpZiAodXJsSW5kZXggIT09IC0xKSB7XG4gICAgICAgIGlmIChjb3VudENhY2hlW3VybEluZGV4XSA9PT0gMSkge1xuICAgICAgICAgICAgdXJsQ2FjaGUuc3BsaWNlKHVybEluZGV4LCAxKTtcbiAgICAgICAgICAgIGNvdW50Q2FjaGUuc3BsaWNlKHVybEluZGV4LCAxKTtcbiAgICAgICAgICAgIG5vZGVDYWNoZS5zcGxpY2UodXJsSW5kZXgsIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY291bnRDYWNoZVt1cmxJbmRleF0tLTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cmxJbmRleCA9IHVybENhY2hlLmluZGV4T2YoaW1hZ2VVcmwpO1xuICAgIGlmICh1cmxJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgdXJsQ2FjaGUucHVzaChpbWFnZVVybCk7XG4gICAgICAgIGNvdW50Q2FjaGUucHVzaCgxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb3VudENhY2hlW3VybEluZGV4XSsrO1xuICAgIH1cbiAgICB0aGlzLl9pbWFnZVVybCA9IGltYWdlVXJsO1xuICAgIHRoaXMuX2NvbnRlbnREaXJ0eSA9IHRydWU7XG59O1xuSW1hZ2VTdXJmYWNlLnByb3RvdHlwZS5kZXBsb3kgPSBmdW5jdGlvbiBkZXBsb3kodGFyZ2V0KSB7XG4gICAgdmFyIHVybEluZGV4ID0gdXJsQ2FjaGUuaW5kZXhPZih0aGlzLl9pbWFnZVVybCk7XG4gICAgaWYgKG5vZGVDYWNoZVt1cmxJbmRleF0gPT09IHVuZGVmaW5lZCAmJiBjYWNoZUVuYWJsZWQpIHtcbiAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWcuc3JjID0gdGhpcy5faW1hZ2VVcmwgfHwgJyc7XG4gICAgICAgIG5vZGVDYWNoZVt1cmxJbmRleF0gPSBpbWc7XG4gICAgfVxuICAgIHRhcmdldC5zcmMgPSB0aGlzLl9pbWFnZVVybCB8fCAnJztcbn07XG5JbWFnZVN1cmZhY2UucHJvdG90eXBlLnJlY2FsbCA9IGZ1bmN0aW9uIHJlY2FsbCh0YXJnZXQpIHtcbiAgICB0YXJnZXQuc3JjID0gJyc7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBJbWFnZVN1cmZhY2U7IiwidmFyIEVhc2luZyA9IHtcbiAgICAgICAgaW5RdWFkOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIHQgKiB0O1xuICAgICAgICB9LFxuICAgICAgICBvdXRRdWFkOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIC0odCAtPSAxKSAqIHQgKyAxO1xuICAgICAgICB9LFxuICAgICAgICBpbk91dFF1YWQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gMC41KSA8IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIHQgKiB0O1xuICAgICAgICAgICAgcmV0dXJuIC0wLjUgKiAoLS10ICogKHQgLSAyKSAtIDEpO1xuICAgICAgICB9LFxuICAgICAgICBpbkN1YmljOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIHQgKiB0ICogdDtcbiAgICAgICAgfSxcbiAgICAgICAgb3V0Q3ViaWM6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gLS10ICogdCAqIHQgKyAxO1xuICAgICAgICB9LFxuICAgICAgICBpbk91dEN1YmljOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgaWYgKCh0IC89IDAuNSkgPCAxKVxuICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiB0ICogdCAqIHQ7XG4gICAgICAgICAgICByZXR1cm4gMC41ICogKCh0IC09IDIpICogdCAqIHQgKyAyKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5RdWFydDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0ICogdCAqIHQgKiB0O1xuICAgICAgICB9LFxuICAgICAgICBvdXRRdWFydDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiAtKC0tdCAqIHQgKiB0ICogdCAtIDEpO1xuICAgICAgICB9LFxuICAgICAgICBpbk91dFF1YXJ0OiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgaWYgKCh0IC89IDAuNSkgPCAxKVxuICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiB0ICogdCAqIHQgKiB0O1xuICAgICAgICAgICAgcmV0dXJuIC0wLjUgKiAoKHQgLT0gMikgKiB0ICogdCAqIHQgLSAyKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5RdWludDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0ICogdCAqIHQgKiB0ICogdDtcbiAgICAgICAgfSxcbiAgICAgICAgb3V0UXVpbnQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gLS10ICogdCAqIHQgKiB0ICogdCArIDE7XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0UXVpbnQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gMC41KSA8IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIHQgKiB0ICogdCAqIHQgKiB0O1xuICAgICAgICAgICAgcmV0dXJuIDAuNSAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAqIHQgKyAyKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5TaW5lOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIC0xICogTWF0aC5jb3ModCAqIChNYXRoLlBJIC8gMikpICsgMTtcbiAgICAgICAgfSxcbiAgICAgICAgb3V0U2luZTogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNpbih0ICogKE1hdGguUEkgLyAyKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0U2luZTogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiAtMC41ICogKE1hdGguY29zKE1hdGguUEkgKiB0KSAtIDEpO1xuICAgICAgICB9LFxuICAgICAgICBpbkV4cG86IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdCA9PT0gMCA/IDAgOiBNYXRoLnBvdygyLCAxMCAqICh0IC0gMSkpO1xuICAgICAgICB9LFxuICAgICAgICBvdXRFeHBvOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIHQgPT09IDEgPyAxIDogLU1hdGgucG93KDIsIC0xMCAqIHQpICsgMTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5PdXRFeHBvOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgaWYgKHQgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBpZiAodCA9PT0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIGlmICgodCAvPSAwLjUpIDwgMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogTWF0aC5wb3coMiwgMTAgKiAodCAtIDEpKTtcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiAoLU1hdGgucG93KDIsIC0xMCAqIC0tdCkgKyAyKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5DaXJjOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIC0oTWF0aC5zcXJ0KDEgLSB0ICogdCkgLSAxKTtcbiAgICAgICAgfSxcbiAgICAgICAgb3V0Q2lyYzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQoMSAtIC0tdCAqIHQpO1xuICAgICAgICB9LFxuICAgICAgICBpbk91dENpcmM6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gMC41KSA8IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0wLjUgKiAoTWF0aC5zcXJ0KDEgLSB0ICogdCkgLSAxKTtcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiAoTWF0aC5zcXJ0KDEgLSAodCAtPSAyKSAqIHQpICsgMSk7XG4gICAgICAgIH0sXG4gICAgICAgIGluRWxhc3RpYzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHZhciBzID0gMS43MDE1ODtcbiAgICAgICAgICAgIHZhciBwID0gMDtcbiAgICAgICAgICAgIHZhciBhID0gMTtcbiAgICAgICAgICAgIGlmICh0ID09PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgaWYgKHQgPT09IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICBpZiAoIXApXG4gICAgICAgICAgICAgICAgcCA9IDAuMztcbiAgICAgICAgICAgIHMgPSBwIC8gKDIgKiBNYXRoLlBJKSAqIE1hdGguYXNpbigxIC8gYSk7XG4gICAgICAgICAgICByZXR1cm4gLShhICogTWF0aC5wb3coMiwgMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApKTtcbiAgICAgICAgfSxcbiAgICAgICAgb3V0RWxhc3RpYzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHZhciBzID0gMS43MDE1ODtcbiAgICAgICAgICAgIHZhciBwID0gMDtcbiAgICAgICAgICAgIHZhciBhID0gMTtcbiAgICAgICAgICAgIGlmICh0ID09PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgaWYgKHQgPT09IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICBpZiAoIXApXG4gICAgICAgICAgICAgICAgcCA9IDAuMztcbiAgICAgICAgICAgIHMgPSBwIC8gKDIgKiBNYXRoLlBJKSAqIE1hdGguYXNpbigxIC8gYSk7XG4gICAgICAgICAgICByZXR1cm4gYSAqIE1hdGgucG93KDIsIC0xMCAqIHQpICogTWF0aC5zaW4oKHQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSArIDE7XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0RWxhc3RpYzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHZhciBzID0gMS43MDE1ODtcbiAgICAgICAgICAgIHZhciBwID0gMDtcbiAgICAgICAgICAgIHZhciBhID0gMTtcbiAgICAgICAgICAgIGlmICh0ID09PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgaWYgKCh0IC89IDAuNSkgPT09IDIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICBpZiAoIXApXG4gICAgICAgICAgICAgICAgcCA9IDAuMyAqIDEuNTtcbiAgICAgICAgICAgIHMgPSBwIC8gKDIgKiBNYXRoLlBJKSAqIE1hdGguYXNpbigxIC8gYSk7XG4gICAgICAgICAgICBpZiAodCA8IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0wLjUgKiAoYSAqIE1hdGgucG93KDIsIDEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSk7XG4gICAgICAgICAgICByZXR1cm4gYSAqIE1hdGgucG93KDIsIC0xMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0IC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkgKiAwLjUgKyAxO1xuICAgICAgICB9LFxuICAgICAgICBpbkJhY2s6IGZ1bmN0aW9uICh0LCBzKSB7XG4gICAgICAgICAgICBpZiAocyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHMgPSAxLjcwMTU4O1xuICAgICAgICAgICAgcmV0dXJuIHQgKiB0ICogKChzICsgMSkgKiB0IC0gcyk7XG4gICAgICAgIH0sXG4gICAgICAgIG91dEJhY2s6IGZ1bmN0aW9uICh0LCBzKSB7XG4gICAgICAgICAgICBpZiAocyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHMgPSAxLjcwMTU4O1xuICAgICAgICAgICAgcmV0dXJuIC0tdCAqIHQgKiAoKHMgKyAxKSAqIHQgKyBzKSArIDE7XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0QmFjazogZnVuY3Rpb24gKHQsIHMpIHtcbiAgICAgICAgICAgIGlmIChzID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcyA9IDEuNzAxNTg7XG4gICAgICAgICAgICBpZiAoKHQgLz0gMC41KSA8IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqICh0ICogdCAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB0IC0gcykpO1xuICAgICAgICAgICAgcmV0dXJuIDAuNSAqICgodCAtPSAyKSAqIHQgKiAoKChzICo9IDEuNTI1KSArIDEpICogdCArIHMpICsgMik7XG4gICAgICAgIH0sXG4gICAgICAgIGluQm91bmNlOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIDEgLSBFYXNpbmcub3V0Qm91bmNlKDEgLSB0KTtcbiAgICAgICAgfSxcbiAgICAgICAgb3V0Qm91bmNlOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgaWYgKHQgPCAxIC8gMi43NSkge1xuICAgICAgICAgICAgICAgIHJldHVybiA3LjU2MjUgKiB0ICogdDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodCA8IDIgLyAyLjc1KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqICh0IC09IDEuNSAvIDIuNzUpICogdCArIDAuNzU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHQgPCAyLjUgLyAyLjc1KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqICh0IC09IDIuMjUgLyAyLjc1KSAqIHQgKyAwLjkzNzU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiA3LjU2MjUgKiAodCAtPSAyLjYyNSAvIDIuNzUpICogdCArIDAuOTg0Mzc1O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpbk91dEJvdW5jZTogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIGlmICh0IDwgMC41KVxuICAgICAgICAgICAgICAgIHJldHVybiBFYXNpbmcuaW5Cb3VuY2UodCAqIDIpICogMC41O1xuICAgICAgICAgICAgcmV0dXJuIEVhc2luZy5vdXRCb3VuY2UodCAqIDIgLSAxKSAqIDAuNSArIDAuNTtcbiAgICAgICAgfVxuICAgIH07XG5tb2R1bGUuZXhwb3J0cyA9IEVhc2luZzsiLCJ2YXIgVXRpbGl0eSA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9VdGlsaXR5Jyk7XG5mdW5jdGlvbiBNdWx0aXBsZVRyYW5zaXRpb24obWV0aG9kKSB7XG4gICAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XG4gICAgdGhpcy5faW5zdGFuY2VzID0gW107XG4gICAgdGhpcy5zdGF0ZSA9IFtdO1xufVxuTXVsdGlwbGVUcmFuc2l0aW9uLlNVUFBPUlRTX01VTFRJUExFID0gdHJ1ZTtcbk11bHRpcGxlVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5faW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuc3RhdGVbaV0gPSB0aGlzLl9pbnN0YW5jZXNbaV0uZ2V0KCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YXRlO1xufTtcbk11bHRpcGxlVHJhbnNpdGlvbi5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KGVuZFN0YXRlLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHZhciBfYWxsQ2FsbGJhY2sgPSBVdGlsaXR5LmFmdGVyKGVuZFN0YXRlLmxlbmd0aCwgY2FsbGJhY2spO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW5kU3RhdGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZXNbaV0pXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZXNbaV0gPSBuZXcgdGhpcy5tZXRob2QoKTtcbiAgICAgICAgdGhpcy5faW5zdGFuY2VzW2ldLnNldChlbmRTdGF0ZVtpXSwgdHJhbnNpdGlvbiwgX2FsbENhbGxiYWNrKTtcbiAgICB9XG59O1xuTXVsdGlwbGVUcmFuc2l0aW9uLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KHN0YXJ0U3RhdGUpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXJ0U3RhdGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZXNbaV0pXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZXNbaV0gPSBuZXcgdGhpcy5tZXRob2QoKTtcbiAgICAgICAgdGhpcy5faW5zdGFuY2VzW2ldLnJlc2V0KHN0YXJ0U3RhdGVbaV0pO1xuICAgIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IE11bHRpcGxlVHJhbnNpdGlvbjsiLCJ2YXIgUEUgPSByZXF1aXJlKCcuLi9waHlzaWNzL1BoeXNpY3NFbmdpbmUnKTtcbnZhciBQYXJ0aWNsZSA9IHJlcXVpcmUoJy4uL3BoeXNpY3MvYm9kaWVzL1BhcnRpY2xlJyk7XG52YXIgU3ByaW5nID0gcmVxdWlyZSgnLi4vcGh5c2ljcy9mb3JjZXMvU3ByaW5nJyk7XG52YXIgVmVjdG9yID0gcmVxdWlyZSgnLi4vbWF0aC9WZWN0b3InKTtcbmZ1bmN0aW9uIFNwcmluZ1RyYW5zaXRpb24oc3RhdGUpIHtcbiAgICBzdGF0ZSA9IHN0YXRlIHx8IDA7XG4gICAgdGhpcy5lbmRTdGF0ZSA9IG5ldyBWZWN0b3Ioc3RhdGUpO1xuICAgIHRoaXMuaW5pdFN0YXRlID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMuX2RpbWVuc2lvbnMgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcmVzdFRvbGVyYW5jZSA9IDFlLTEwO1xuICAgIHRoaXMuX2Fic1Jlc3RUb2xlcmFuY2UgPSB0aGlzLl9yZXN0VG9sZXJhbmNlO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuUEUgPSBuZXcgUEUoKTtcbiAgICB0aGlzLnNwcmluZyA9IG5ldyBTcHJpbmcoeyBhbmNob3I6IHRoaXMuZW5kU3RhdGUgfSk7XG4gICAgdGhpcy5wYXJ0aWNsZSA9IG5ldyBQYXJ0aWNsZSgpO1xuICAgIHRoaXMuUEUuYWRkQm9keSh0aGlzLnBhcnRpY2xlKTtcbiAgICB0aGlzLlBFLmF0dGFjaCh0aGlzLnNwcmluZywgdGhpcy5wYXJ0aWNsZSk7XG59XG5TcHJpbmdUcmFuc2l0aW9uLlNVUFBPUlRTX01VTFRJUExFID0gMztcblNwcmluZ1RyYW5zaXRpb24uREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHBlcmlvZDogMzAwLFxuICAgIGRhbXBpbmdSYXRpbzogMC41LFxuICAgIHZlbG9jaXR5OiAwXG59O1xuZnVuY3Rpb24gX2dldEVuZXJneSgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJ0aWNsZS5nZXRFbmVyZ3koKSArIHRoaXMuc3ByaW5nLmdldEVuZXJneShbdGhpcy5wYXJ0aWNsZV0pO1xufVxuZnVuY3Rpb24gX3NldFBhcnRpY2xlUG9zaXRpb24ocCkge1xuICAgIHRoaXMucGFydGljbGUuc2V0UG9zaXRpb24ocCk7XG59XG5mdW5jdGlvbiBfc2V0UGFydGljbGVWZWxvY2l0eSh2KSB7XG4gICAgdGhpcy5wYXJ0aWNsZS5zZXRWZWxvY2l0eSh2KTtcbn1cbmZ1bmN0aW9uIF9nZXRQYXJ0aWNsZVBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9kaW1lbnNpb25zID09PSAwID8gdGhpcy5wYXJ0aWNsZS5nZXRQb3NpdGlvbjFEKCkgOiB0aGlzLnBhcnRpY2xlLmdldFBvc2l0aW9uKCk7XG59XG5mdW5jdGlvbiBfZ2V0UGFydGljbGVWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGltZW5zaW9ucyA9PT0gMCA/IHRoaXMucGFydGljbGUuZ2V0VmVsb2NpdHkxRCgpIDogdGhpcy5wYXJ0aWNsZS5nZXRWZWxvY2l0eSgpO1xufVxuZnVuY3Rpb24gX3NldENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbn1cbmZ1bmN0aW9uIF93YWtlKCkge1xuICAgIHRoaXMuUEUud2FrZSgpO1xufVxuZnVuY3Rpb24gX3NsZWVwKCkge1xuICAgIHRoaXMuUEUuc2xlZXAoKTtcbn1cbmZ1bmN0aW9uIF91cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuUEUuaXNTbGVlcGluZygpKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGNiID0gdGhpcy5fY2FsbGJhY2s7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoX2dldEVuZXJneS5jYWxsKHRoaXMpIDwgdGhpcy5fYWJzUmVzdFRvbGVyYW5jZSkge1xuICAgICAgICBfc2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMsIHRoaXMuZW5kU3RhdGUpO1xuICAgICAgICBfc2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMsIFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdKTtcbiAgICAgICAgX3NsZWVwLmNhbGwodGhpcyk7XG4gICAgfVxufVxuZnVuY3Rpb24gX3NldHVwRGVmaW5pdGlvbihkZWZpbml0aW9uKSB7XG4gICAgdmFyIGRlZmF1bHRzID0gU3ByaW5nVHJhbnNpdGlvbi5ERUZBVUxUX09QVElPTlM7XG4gICAgaWYgKGRlZmluaXRpb24ucGVyaW9kID09PSB1bmRlZmluZWQpXG4gICAgICAgIGRlZmluaXRpb24ucGVyaW9kID0gZGVmYXVsdHMucGVyaW9kO1xuICAgIGlmIChkZWZpbml0aW9uLmRhbXBpbmdSYXRpbyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBkZWZpbml0aW9uLmRhbXBpbmdSYXRpbyA9IGRlZmF1bHRzLmRhbXBpbmdSYXRpbztcbiAgICBpZiAoZGVmaW5pdGlvbi52ZWxvY2l0eSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBkZWZpbml0aW9uLnZlbG9jaXR5ID0gZGVmYXVsdHMudmVsb2NpdHk7XG4gICAgaWYgKGRlZmluaXRpb24ucGVyaW9kIDwgMTUwKSB7XG4gICAgICAgIGRlZmluaXRpb24ucGVyaW9kID0gMTUwO1xuICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSBwZXJpb2Qgb2YgYSBTcHJpbmdUcmFuc2l0aW9uIGlzIGNhcHBlZCBhdCAxNTAgbXMuIFVzZSBhIFNuYXBUcmFuc2l0aW9uIGZvciBmYXN0ZXIgdHJhbnNpdGlvbnMnKTtcbiAgICB9XG4gICAgdGhpcy5zcHJpbmcuc2V0T3B0aW9ucyh7XG4gICAgICAgIHBlcmlvZDogZGVmaW5pdGlvbi5wZXJpb2QsXG4gICAgICAgIGRhbXBpbmdSYXRpbzogZGVmaW5pdGlvbi5kYW1waW5nUmF0aW9cbiAgICB9KTtcbiAgICBfc2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMsIGRlZmluaXRpb24udmVsb2NpdHkpO1xufVxuZnVuY3Rpb24gX3NldEFic29sdXRlUmVzdFRvbGVyYW5jZSgpIHtcbiAgICB2YXIgZGlzdGFuY2UgPSB0aGlzLmVuZFN0YXRlLnN1Yih0aGlzLmluaXRTdGF0ZSkubm9ybVNxdWFyZWQoKTtcbiAgICB0aGlzLl9hYnNSZXN0VG9sZXJhbmNlID0gZGlzdGFuY2UgPT09IDAgPyB0aGlzLl9yZXN0VG9sZXJhbmNlIDogdGhpcy5fcmVzdFRvbGVyYW5jZSAqIGRpc3RhbmNlO1xufVxuZnVuY3Rpb24gX3NldFRhcmdldCh0YXJnZXQpIHtcbiAgICB0aGlzLmVuZFN0YXRlLnNldCh0YXJnZXQpO1xuICAgIF9zZXRBYnNvbHV0ZVJlc3RUb2xlcmFuY2UuY2FsbCh0aGlzKTtcbn1cblNwcmluZ1RyYW5zaXRpb24ucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQocG9zLCB2ZWwpIHtcbiAgICB0aGlzLl9kaW1lbnNpb25zID0gcG9zIGluc3RhbmNlb2YgQXJyYXkgPyBwb3MubGVuZ3RoIDogMDtcbiAgICB0aGlzLmluaXRTdGF0ZS5zZXQocG9zKTtcbiAgICBfc2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMsIHBvcyk7XG4gICAgX3NldFRhcmdldC5jYWxsKHRoaXMsIHBvcyk7XG4gICAgaWYgKHZlbClcbiAgICAgICAgX3NldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzLCB2ZWwpO1xuICAgIF9zZXRDYWxsYmFjay5jYWxsKHRoaXMsIHVuZGVmaW5lZCk7XG59O1xuU3ByaW5nVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0VmVsb2NpdHkgPSBmdW5jdGlvbiBnZXRWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gX2dldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzKTtcbn07XG5TcHJpbmdUcmFuc2l0aW9uLnByb3RvdHlwZS5zZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIHNldFZlbG9jaXR5KHYpIHtcbiAgICB0aGlzLmNhbGwodGhpcywgX3NldFBhcnRpY2xlVmVsb2NpdHkodikpO1xufTtcblNwcmluZ1RyYW5zaXRpb24ucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuICF0aGlzLlBFLmlzU2xlZXBpbmcoKTtcbn07XG5TcHJpbmdUcmFuc2l0aW9uLnByb3RvdHlwZS5oYWx0ID0gZnVuY3Rpb24gaGFsdCgpIHtcbiAgICB0aGlzLnNldCh0aGlzLmdldCgpKTtcbn07XG5TcHJpbmdUcmFuc2l0aW9uLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgX3VwZGF0ZS5jYWxsKHRoaXMpO1xuICAgIHJldHVybiBfZ2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMpO1xufTtcblNwcmluZ1RyYW5zaXRpb24ucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChlbmRTdGF0ZSwgZGVmaW5pdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoIWRlZmluaXRpb24pIHtcbiAgICAgICAgdGhpcy5yZXNldChlbmRTdGF0ZSk7XG4gICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZGltZW5zaW9ucyA9IGVuZFN0YXRlIGluc3RhbmNlb2YgQXJyYXkgPyBlbmRTdGF0ZS5sZW5ndGggOiAwO1xuICAgIF93YWtlLmNhbGwodGhpcyk7XG4gICAgX3NldHVwRGVmaW5pdGlvbi5jYWxsKHRoaXMsIGRlZmluaXRpb24pO1xuICAgIF9zZXRUYXJnZXQuY2FsbCh0aGlzLCBlbmRTdGF0ZSk7XG4gICAgX3NldENhbGxiYWNrLmNhbGwodGhpcywgY2FsbGJhY2spO1xufTtcbm1vZHVsZS5leHBvcnRzID0gU3ByaW5nVHJhbnNpdGlvbjsiLCJ2YXIgTXVsdGlwbGVUcmFuc2l0aW9uID0gcmVxdWlyZSgnLi9NdWx0aXBsZVRyYW5zaXRpb24nKTtcbnZhciBUd2VlblRyYW5zaXRpb24gPSByZXF1aXJlKCcuL1R3ZWVuVHJhbnNpdGlvbicpO1xuZnVuY3Rpb24gVHJhbnNpdGlvbmFibGUoc3RhcnQpIHtcbiAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBudWxsO1xuICAgIHRoaXMuYWN0aW9uUXVldWUgPSBbXTtcbiAgICB0aGlzLmNhbGxiYWNrUXVldWUgPSBbXTtcbiAgICB0aGlzLnN0YXRlID0gMDtcbiAgICB0aGlzLnZlbG9jaXR5ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2VuZ2luZUluc3RhbmNlID0gbnVsbDtcbiAgICB0aGlzLl9jdXJyZW50TWV0aG9kID0gbnVsbDtcbiAgICB0aGlzLnNldChzdGFydCk7XG59XG52YXIgdHJhbnNpdGlvbk1ldGhvZHMgPSB7fTtcblRyYW5zaXRpb25hYmxlLnJlZ2lzdGVyID0gZnVuY3Rpb24gcmVnaXN0ZXIobWV0aG9kcykge1xuICAgIHZhciBzdWNjZXNzID0gdHJ1ZTtcbiAgICBmb3IgKHZhciBtZXRob2QgaW4gbWV0aG9kcykge1xuICAgICAgICBpZiAoIVRyYW5zaXRpb25hYmxlLnJlZ2lzdGVyTWV0aG9kKG1ldGhvZCwgbWV0aG9kc1ttZXRob2RdKSlcbiAgICAgICAgICAgIHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG59O1xuVHJhbnNpdGlvbmFibGUucmVnaXN0ZXJNZXRob2QgPSBmdW5jdGlvbiByZWdpc3Rlck1ldGhvZChuYW1lLCBlbmdpbmVDbGFzcykge1xuICAgIGlmICghKG5hbWUgaW4gdHJhbnNpdGlvbk1ldGhvZHMpKSB7XG4gICAgICAgIHRyYW5zaXRpb25NZXRob2RzW25hbWVdID0gZW5naW5lQ2xhc3M7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gZmFsc2U7XG59O1xuVHJhbnNpdGlvbmFibGUudW5yZWdpc3Rlck1ldGhvZCA9IGZ1bmN0aW9uIHVucmVnaXN0ZXJNZXRob2QobmFtZSkge1xuICAgIGlmIChuYW1lIGluIHRyYW5zaXRpb25NZXRob2RzKSB7XG4gICAgICAgIGRlbGV0ZSB0cmFuc2l0aW9uTWV0aG9kc1tuYW1lXTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiBmYWxzZTtcbn07XG5mdW5jdGlvbiBfbG9hZE5leHQoKSB7XG4gICAgaWYgKHRoaXMuX2NhbGxiYWNrKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuX2NhbGxiYWNrO1xuICAgICAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuYWN0aW9uUXVldWUubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgdGhpcy5zZXQodGhpcy5nZXQoKSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50QWN0aW9uID0gdGhpcy5hY3Rpb25RdWV1ZS5zaGlmdCgpO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gdGhpcy5jYWxsYmFja1F1ZXVlLnNoaWZ0KCk7XG4gICAgdmFyIG1ldGhvZCA9IG51bGw7XG4gICAgdmFyIGVuZFZhbHVlID0gdGhpcy5jdXJyZW50QWN0aW9uWzBdO1xuICAgIHZhciB0cmFuc2l0aW9uID0gdGhpcy5jdXJyZW50QWN0aW9uWzFdO1xuICAgIGlmICh0cmFuc2l0aW9uIGluc3RhbmNlb2YgT2JqZWN0ICYmIHRyYW5zaXRpb24ubWV0aG9kKSB7XG4gICAgICAgIG1ldGhvZCA9IHRyYW5zaXRpb24ubWV0aG9kO1xuICAgICAgICBpZiAodHlwZW9mIG1ldGhvZCA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICBtZXRob2QgPSB0cmFuc2l0aW9uTWV0aG9kc1ttZXRob2RdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG1ldGhvZCA9IFR3ZWVuVHJhbnNpdGlvbjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRNZXRob2QgIT09IG1ldGhvZCkge1xuICAgICAgICBpZiAoIShlbmRWYWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkgfHwgbWV0aG9kLlNVUFBPUlRTX01VTFRJUExFID09PSB0cnVlIHx8IGVuZFZhbHVlLmxlbmd0aCA8PSBtZXRob2QuU1VQUE9SVFNfTVVMVElQTEUpIHtcbiAgICAgICAgICAgIHRoaXMuX2VuZ2luZUluc3RhbmNlID0gbmV3IG1ldGhvZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZW5naW5lSW5zdGFuY2UgPSBuZXcgTXVsdGlwbGVUcmFuc2l0aW9uKG1ldGhvZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY3VycmVudE1ldGhvZCA9IG1ldGhvZDtcbiAgICB9XG4gICAgdGhpcy5fZW5naW5lSW5zdGFuY2UucmVzZXQodGhpcy5zdGF0ZSwgdGhpcy52ZWxvY2l0eSk7XG4gICAgaWYgKHRoaXMudmVsb2NpdHkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdHJhbnNpdGlvbi52ZWxvY2l0eSA9IHRoaXMudmVsb2NpdHk7XG4gICAgdGhpcy5fZW5naW5lSW5zdGFuY2Uuc2V0KGVuZFZhbHVlLCB0cmFuc2l0aW9uLCBfbG9hZE5leHQuYmluZCh0aGlzKSk7XG59XG5UcmFuc2l0aW9uYWJsZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KGVuZFN0YXRlLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICghdHJhbnNpdGlvbikge1xuICAgICAgICB0aGlzLnJlc2V0KGVuZFN0YXRlKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKVxuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHZhciBhY3Rpb24gPSBbXG4gICAgICAgICAgICBlbmRTdGF0ZSxcbiAgICAgICAgICAgIHRyYW5zaXRpb25cbiAgICAgICAgXTtcbiAgICB0aGlzLmFjdGlvblF1ZXVlLnB1c2goYWN0aW9uKTtcbiAgICB0aGlzLmNhbGxiYWNrUXVldWUucHVzaChjYWxsYmFjayk7XG4gICAgaWYgKCF0aGlzLmN1cnJlbnRBY3Rpb24pXG4gICAgICAgIF9sb2FkTmV4dC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblRyYW5zaXRpb25hYmxlLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KHN0YXJ0U3RhdGUsIHN0YXJ0VmVsb2NpdHkpIHtcbiAgICB0aGlzLl9jdXJyZW50TWV0aG9kID0gbnVsbDtcbiAgICB0aGlzLl9lbmdpbmVJbnN0YW5jZSA9IG51bGw7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXJ0U3RhdGU7XG4gICAgdGhpcy52ZWxvY2l0eSA9IHN0YXJ0VmVsb2NpdHk7XG4gICAgdGhpcy5jdXJyZW50QWN0aW9uID0gbnVsbDtcbiAgICB0aGlzLmFjdGlvblF1ZXVlID0gW107XG4gICAgdGhpcy5jYWxsYmFja1F1ZXVlID0gW107XG59O1xuVHJhbnNpdGlvbmFibGUucHJvdG90eXBlLmRlbGF5ID0gZnVuY3Rpb24gZGVsYXkoZHVyYXRpb24sIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5zZXQodGhpcy5nZXQoKSwge1xuICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgIGN1cnZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH0sIGNhbGxiYWNrKTtcbn07XG5UcmFuc2l0aW9uYWJsZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KHRpbWVzdGFtcCkge1xuICAgIGlmICh0aGlzLl9lbmdpbmVJbnN0YW5jZSkge1xuICAgICAgICBpZiAodGhpcy5fZW5naW5lSW5zdGFuY2UuZ2V0VmVsb2NpdHkpXG4gICAgICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy5fZW5naW5lSW5zdGFuY2UuZ2V0VmVsb2NpdHkoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuX2VuZ2luZUluc3RhbmNlLmdldCh0aW1lc3RhbXApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbn07XG5UcmFuc2l0aW9uYWJsZS5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gISF0aGlzLmN1cnJlbnRBY3Rpb247XG59O1xuVHJhbnNpdGlvbmFibGUucHJvdG90eXBlLmhhbHQgPSBmdW5jdGlvbiBoYWx0KCkge1xuICAgIHJldHVybiB0aGlzLnNldCh0aGlzLmdldCgpKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zaXRpb25hYmxlOyIsInZhciBUcmFuc2l0aW9uYWJsZSA9IHJlcXVpcmUoJy4vVHJhbnNpdGlvbmFibGUnKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCcuLi9jb3JlL1RyYW5zZm9ybScpO1xudmFyIFV0aWxpdHkgPSByZXF1aXJlKCcuLi91dGlsaXRpZXMvVXRpbGl0eScpO1xuZnVuY3Rpb24gVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0odHJhbnNmb3JtKSB7XG4gICAgdGhpcy5fZmluYWwgPSBUcmFuc2Zvcm0uaWRlbnRpdHkuc2xpY2UoKTtcbiAgICB0aGlzLl9maW5hbFRyYW5zbGF0ZSA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF07XG4gICAgdGhpcy5fZmluYWxSb3RhdGUgPSBbXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdO1xuICAgIHRoaXMuX2ZpbmFsU2tldyA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF07XG4gICAgdGhpcy5fZmluYWxTY2FsZSA9IFtcbiAgICAgICAgMSxcbiAgICAgICAgMSxcbiAgICAgICAgMVxuICAgIF07XG4gICAgdGhpcy50cmFuc2xhdGUgPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fZmluYWxUcmFuc2xhdGUpO1xuICAgIHRoaXMucm90YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMuX2ZpbmFsUm90YXRlKTtcbiAgICB0aGlzLnNrZXcgPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fZmluYWxTa2V3KTtcbiAgICB0aGlzLnNjYWxlID0gbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMuX2ZpbmFsU2NhbGUpO1xuICAgIGlmICh0cmFuc2Zvcm0pXG4gICAgICAgIHRoaXMuc2V0KHRyYW5zZm9ybSk7XG59XG5mdW5jdGlvbiBfYnVpbGQoKSB7XG4gICAgcmV0dXJuIFRyYW5zZm9ybS5idWlsZCh7XG4gICAgICAgIHRyYW5zbGF0ZTogdGhpcy50cmFuc2xhdGUuZ2V0KCksXG4gICAgICAgIHJvdGF0ZTogdGhpcy5yb3RhdGUuZ2V0KCksXG4gICAgICAgIHNrZXc6IHRoaXMuc2tldy5nZXQoKSxcbiAgICAgICAgc2NhbGU6IHRoaXMuc2NhbGUuZ2V0KClcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIF9idWlsZEZpbmFsKCkge1xuICAgIHJldHVybiBUcmFuc2Zvcm0uYnVpbGQoe1xuICAgICAgICB0cmFuc2xhdGU6IHRoaXMuX2ZpbmFsVHJhbnNsYXRlLFxuICAgICAgICByb3RhdGU6IHRoaXMuX2ZpbmFsUm90YXRlLFxuICAgICAgICBza2V3OiB0aGlzLl9maW5hbFNrZXcsXG4gICAgICAgIHNjYWxlOiB0aGlzLl9maW5hbFNjYWxlXG4gICAgfSk7XG59XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuc2V0VHJhbnNsYXRlID0gZnVuY3Rpb24gc2V0VHJhbnNsYXRlKHRyYW5zbGF0ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLl9maW5hbFRyYW5zbGF0ZSA9IHRyYW5zbGF0ZTtcbiAgICB0aGlzLl9maW5hbCA9IF9idWlsZEZpbmFsLmNhbGwodGhpcyk7XG4gICAgdGhpcy50cmFuc2xhdGUuc2V0KHRyYW5zbGF0ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xufTtcblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5zZXRTY2FsZSA9IGZ1bmN0aW9uIHNldFNjYWxlKHNjYWxlLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX2ZpbmFsU2NhbGUgPSBzY2FsZTtcbiAgICB0aGlzLl9maW5hbCA9IF9idWlsZEZpbmFsLmNhbGwodGhpcyk7XG4gICAgdGhpcy5zY2FsZS5zZXQoc2NhbGUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuc2V0Um90YXRlID0gZnVuY3Rpb24gc2V0Um90YXRlKGV1bGVyQW5nbGVzLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX2ZpbmFsUm90YXRlID0gZXVsZXJBbmdsZXM7XG4gICAgdGhpcy5fZmluYWwgPSBfYnVpbGRGaW5hbC5jYWxsKHRoaXMpO1xuICAgIHRoaXMucm90YXRlLnNldChldWxlckFuZ2xlcywgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xufTtcblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5zZXRTa2V3ID0gZnVuY3Rpb24gc2V0U2tldyhza2V3QW5nbGVzLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX2ZpbmFsU2tldyA9IHNrZXdBbmdsZXM7XG4gICAgdGhpcy5fZmluYWwgPSBfYnVpbGRGaW5hbC5jYWxsKHRoaXMpO1xuICAgIHRoaXMuc2tldy5zZXQoc2tld0FuZ2xlcywgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xufTtcblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQodHJhbnNmb3JtLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHZhciBjb21wb25lbnRzID0gVHJhbnNmb3JtLmludGVycHJldCh0cmFuc2Zvcm0pO1xuICAgIHRoaXMuX2ZpbmFsVHJhbnNsYXRlID0gY29tcG9uZW50cy50cmFuc2xhdGU7XG4gICAgdGhpcy5fZmluYWxSb3RhdGUgPSBjb21wb25lbnRzLnJvdGF0ZTtcbiAgICB0aGlzLl9maW5hbFNrZXcgPSBjb21wb25lbnRzLnNrZXc7XG4gICAgdGhpcy5fZmluYWxTY2FsZSA9IGNvbXBvbmVudHMuc2NhbGU7XG4gICAgdGhpcy5fZmluYWwgPSB0cmFuc2Zvcm07XG4gICAgdmFyIF9jYWxsYmFjayA9IGNhbGxiYWNrID8gVXRpbGl0eS5hZnRlcig0LCBjYWxsYmFjaykgOiBudWxsO1xuICAgIHRoaXMudHJhbnNsYXRlLnNldChjb21wb25lbnRzLnRyYW5zbGF0ZSwgdHJhbnNpdGlvbiwgX2NhbGxiYWNrKTtcbiAgICB0aGlzLnJvdGF0ZS5zZXQoY29tcG9uZW50cy5yb3RhdGUsIHRyYW5zaXRpb24sIF9jYWxsYmFjayk7XG4gICAgdGhpcy5za2V3LnNldChjb21wb25lbnRzLnNrZXcsIHRyYW5zaXRpb24sIF9jYWxsYmFjayk7XG4gICAgdGhpcy5zY2FsZS5zZXQoY29tcG9uZW50cy5zY2FsZSwgdHJhbnNpdGlvbiwgX2NhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuc2V0RGVmYXVsdFRyYW5zaXRpb24gPSBmdW5jdGlvbiBzZXREZWZhdWx0VHJhbnNpdGlvbih0cmFuc2l0aW9uKSB7XG4gICAgdGhpcy50cmFuc2xhdGUuc2V0RGVmYXVsdCh0cmFuc2l0aW9uKTtcbiAgICB0aGlzLnJvdGF0ZS5zZXREZWZhdWx0KHRyYW5zaXRpb24pO1xuICAgIHRoaXMuc2tldy5zZXREZWZhdWx0KHRyYW5zaXRpb24pO1xuICAgIHRoaXMuc2NhbGUuc2V0RGVmYXVsdCh0cmFuc2l0aW9uKTtcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIGlmICh0aGlzLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgcmV0dXJuIF9idWlsZC5jYWxsKHRoaXMpO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy5fZmluYWw7XG59O1xuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLmdldEZpbmFsID0gZnVuY3Rpb24gZ2V0RmluYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbmFsO1xufTtcblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZS5pc0FjdGl2ZSgpIHx8IHRoaXMucm90YXRlLmlzQWN0aXZlKCkgfHwgdGhpcy5zY2FsZS5pc0FjdGl2ZSgpIHx8IHRoaXMuc2tldy5pc0FjdGl2ZSgpO1xufTtcblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5oYWx0ID0gZnVuY3Rpb24gaGFsdCgpIHtcbiAgICB0aGlzLnRyYW5zbGF0ZS5oYWx0KCk7XG4gICAgdGhpcy5yb3RhdGUuaGFsdCgpO1xuICAgIHRoaXMuc2tldy5oYWx0KCk7XG4gICAgdGhpcy5zY2FsZS5oYWx0KCk7XG4gICAgdGhpcy5fZmluYWwgPSB0aGlzLmdldCgpO1xuICAgIHRoaXMuX2ZpbmFsVHJhbnNsYXRlID0gdGhpcy50cmFuc2xhdGUuZ2V0KCk7XG4gICAgdGhpcy5fZmluYWxSb3RhdGUgPSB0aGlzLnJvdGF0ZS5nZXQoKTtcbiAgICB0aGlzLl9maW5hbFNrZXcgPSB0aGlzLnNrZXcuZ2V0KCk7XG4gICAgdGhpcy5fZmluYWxTY2FsZSA9IHRoaXMuc2NhbGUuZ2V0KCk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBUcmFuc2l0aW9uYWJsZVRyYW5zZm9ybTsiLCJmdW5jdGlvbiBUd2VlblRyYW5zaXRpb24ob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoVHdlZW5UcmFuc2l0aW9uLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLl9zdGFydFRpbWUgPSAwO1xuICAgIHRoaXMuX3N0YXJ0VmFsdWUgPSAwO1xuICAgIHRoaXMuX3VwZGF0ZVRpbWUgPSAwO1xuICAgIHRoaXMuX2VuZFZhbHVlID0gMDtcbiAgICB0aGlzLl9jdXJ2ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9kdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zdGF0ZSA9IDA7XG4gICAgdGhpcy52ZWxvY2l0eSA9IHVuZGVmaW5lZDtcbn1cblR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMgPSB7XG4gICAgbGluZWFyOiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdDtcbiAgICB9LFxuICAgIGVhc2VJbjogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHQgKiB0O1xuICAgIH0sXG4gICAgZWFzZU91dDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHQgKiAoMiAtIHQpO1xuICAgIH0sXG4gICAgZWFzZUluT3V0OiBmdW5jdGlvbiAodCkge1xuICAgICAgICBpZiAodCA8PSAwLjUpXG4gICAgICAgICAgICByZXR1cm4gMiAqIHQgKiB0O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gLTIgKiB0ICogdCArIDQgKiB0IC0gMTtcbiAgICB9LFxuICAgIGVhc2VPdXRCb3VuY2U6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB0ICogKDMgLSAyICogdCk7XG4gICAgfSxcbiAgICBzcHJpbmc6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiAoMSAtIHQpICogTWF0aC5zaW4oNiAqIE1hdGguUEkgKiB0KSArIHQ7XG4gICAgfVxufTtcblR3ZWVuVHJhbnNpdGlvbi5TVVBQT1JUU19NVUxUSVBMRSA9IHRydWU7XG5Ud2VlblRyYW5zaXRpb24uREVGQVVMVF9PUFRJT05TID0ge1xuICAgIGN1cnZlOiBUd2VlblRyYW5zaXRpb24uQ3VydmVzLmxpbmVhcixcbiAgICBkdXJhdGlvbjogNTAwLFxuICAgIHNwZWVkOiAwXG59O1xudmFyIHJlZ2lzdGVyZWRDdXJ2ZXMgPSB7fTtcblR3ZWVuVHJhbnNpdGlvbi5yZWdpc3RlckN1cnZlID0gZnVuY3Rpb24gcmVnaXN0ZXJDdXJ2ZShjdXJ2ZU5hbWUsIGN1cnZlKSB7XG4gICAgaWYgKCFyZWdpc3RlcmVkQ3VydmVzW2N1cnZlTmFtZV0pIHtcbiAgICAgICAgcmVnaXN0ZXJlZEN1cnZlc1tjdXJ2ZU5hbWVdID0gY3VydmU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuVHdlZW5UcmFuc2l0aW9uLnVucmVnaXN0ZXJDdXJ2ZSA9IGZ1bmN0aW9uIHVucmVnaXN0ZXJDdXJ2ZShjdXJ2ZU5hbWUpIHtcbiAgICBpZiAocmVnaXN0ZXJlZEN1cnZlc1tjdXJ2ZU5hbWVdKSB7XG4gICAgICAgIGRlbGV0ZSByZWdpc3RlcmVkQ3VydmVzW2N1cnZlTmFtZV07XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuVHdlZW5UcmFuc2l0aW9uLmdldEN1cnZlID0gZnVuY3Rpb24gZ2V0Q3VydmUoY3VydmVOYW1lKSB7XG4gICAgdmFyIGN1cnZlID0gcmVnaXN0ZXJlZEN1cnZlc1tjdXJ2ZU5hbWVdO1xuICAgIGlmIChjdXJ2ZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gY3VydmU7XG4gICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2N1cnZlIG5vdCByZWdpc3RlcmVkJyk7XG59O1xuVHdlZW5UcmFuc2l0aW9uLmdldEN1cnZlcyA9IGZ1bmN0aW9uIGdldEN1cnZlcygpIHtcbiAgICByZXR1cm4gcmVnaXN0ZXJlZEN1cnZlcztcbn07XG5mdW5jdGlvbiBfaW50ZXJwb2xhdGUoYSwgYiwgdCkge1xuICAgIHJldHVybiAoMSAtIHQpICogYSArIHQgKiBiO1xufVxuZnVuY3Rpb24gX2Nsb25lKG9iaikge1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICAgICAgcmV0dXJuIG9iai5zbGljZSgwKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5jcmVhdGUob2JqKTtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIG9iajtcbn1cbmZ1bmN0aW9uIF9ub3JtYWxpemUodHJhbnNpdGlvbiwgZGVmYXVsdFRyYW5zaXRpb24pIHtcbiAgICB2YXIgcmVzdWx0ID0geyBjdXJ2ZTogZGVmYXVsdFRyYW5zaXRpb24uY3VydmUgfTtcbiAgICBpZiAoZGVmYXVsdFRyYW5zaXRpb24uZHVyYXRpb24pXG4gICAgICAgIHJlc3VsdC5kdXJhdGlvbiA9IGRlZmF1bHRUcmFuc2l0aW9uLmR1cmF0aW9uO1xuICAgIGlmIChkZWZhdWx0VHJhbnNpdGlvbi5zcGVlZClcbiAgICAgICAgcmVzdWx0LnNwZWVkID0gZGVmYXVsdFRyYW5zaXRpb24uc3BlZWQ7XG4gICAgaWYgKHRyYW5zaXRpb24gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgaWYgKHRyYW5zaXRpb24uZHVyYXRpb24gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJlc3VsdC5kdXJhdGlvbiA9IHRyYW5zaXRpb24uZHVyYXRpb247XG4gICAgICAgIGlmICh0cmFuc2l0aW9uLmN1cnZlKVxuICAgICAgICAgICAgcmVzdWx0LmN1cnZlID0gdHJhbnNpdGlvbi5jdXJ2ZTtcbiAgICAgICAgaWYgKHRyYW5zaXRpb24uc3BlZWQpXG4gICAgICAgICAgICByZXN1bHQuc3BlZWQgPSB0cmFuc2l0aW9uLnNwZWVkO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHJlc3VsdC5jdXJ2ZSA9PT0gJ3N0cmluZycpXG4gICAgICAgIHJlc3VsdC5jdXJ2ZSA9IFR3ZWVuVHJhbnNpdGlvbi5nZXRDdXJ2ZShyZXN1bHQuY3VydmUpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5jdXJ2ZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMuY3VydmUgPSBvcHRpb25zLmN1cnZlO1xuICAgIGlmIChvcHRpb25zLmR1cmF0aW9uICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5kdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb247XG4gICAgaWYgKG9wdGlvbnMuc3BlZWQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLnNwZWVkID0gb3B0aW9ucy5zcGVlZDtcbn07XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChlbmRWYWx1ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoIXRyYW5zaXRpb24pIHtcbiAgICAgICAgdGhpcy5yZXNldChlbmRWYWx1ZSk7XG4gICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fc3RhcnRWYWx1ZSA9IF9jbG9uZSh0aGlzLmdldCgpKTtcbiAgICB0cmFuc2l0aW9uID0gX25vcm1hbGl6ZSh0cmFuc2l0aW9uLCB0aGlzLm9wdGlvbnMpO1xuICAgIGlmICh0cmFuc2l0aW9uLnNwZWVkKSB7XG4gICAgICAgIHZhciBzdGFydFZhbHVlID0gdGhpcy5fc3RhcnRWYWx1ZTtcbiAgICAgICAgaWYgKHN0YXJ0VmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgIHZhciB2YXJpYW5jZSA9IDA7XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHN0YXJ0VmFsdWUpXG4gICAgICAgICAgICAgICAgdmFyaWFuY2UgKz0gKGVuZFZhbHVlW2ldIC0gc3RhcnRWYWx1ZVtpXSkgKiAoZW5kVmFsdWVbaV0gLSBzdGFydFZhbHVlW2ldKTtcbiAgICAgICAgICAgIHRyYW5zaXRpb24uZHVyYXRpb24gPSBNYXRoLnNxcnQodmFyaWFuY2UpIC8gdHJhbnNpdGlvbi5zcGVlZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb24uZHVyYXRpb24gPSBNYXRoLmFicyhlbmRWYWx1ZSAtIHN0YXJ0VmFsdWUpIC8gdHJhbnNpdGlvbi5zcGVlZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuX2VuZFZhbHVlID0gX2Nsb25lKGVuZFZhbHVlKTtcbiAgICB0aGlzLl9zdGFydFZlbG9jaXR5ID0gX2Nsb25lKHRyYW5zaXRpb24udmVsb2NpdHkpO1xuICAgIHRoaXMuX2R1cmF0aW9uID0gdHJhbnNpdGlvbi5kdXJhdGlvbjtcbiAgICB0aGlzLl9jdXJ2ZSA9IHRyYW5zaXRpb24uY3VydmU7XG4gICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xufTtcblR3ZWVuVHJhbnNpdGlvbi5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiByZXNldChzdGFydFZhbHVlLCBzdGFydFZlbG9jaXR5KSB7XG4gICAgaWYgKHRoaXMuX2NhbGxiYWNrKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuX2NhbGxiYWNrO1xuICAgICAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZSA9IF9jbG9uZShzdGFydFZhbHVlKTtcbiAgICB0aGlzLnZlbG9jaXR5ID0gX2Nsb25lKHN0YXJ0VmVsb2NpdHkpO1xuICAgIHRoaXMuX3N0YXJ0VGltZSA9IDA7XG4gICAgdGhpcy5fZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuX3VwZGF0ZVRpbWUgPSAwO1xuICAgIHRoaXMuX3N0YXJ0VmFsdWUgPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMuX3N0YXJ0VmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5O1xuICAgIHRoaXMuX2VuZFZhbHVlID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcbn07XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLmdldFZlbG9jaXR5ID0gZnVuY3Rpb24gZ2V0VmVsb2NpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMudmVsb2NpdHk7XG59O1xuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQodGltZXN0YW1wKSB7XG4gICAgdGhpcy51cGRhdGUodGltZXN0YW1wKTtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbn07XG5mdW5jdGlvbiBfY2FsY3VsYXRlVmVsb2NpdHkoY3VycmVudCwgc3RhcnQsIGN1cnZlLCBkdXJhdGlvbiwgdCkge1xuICAgIHZhciB2ZWxvY2l0eTtcbiAgICB2YXIgZXBzID0gMWUtNztcbiAgICB2YXIgc3BlZWQgPSAoY3VydmUodCkgLSBjdXJ2ZSh0IC0gZXBzKSkgLyBlcHM7XG4gICAgaWYgKGN1cnJlbnQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICB2ZWxvY2l0eSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1cnJlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY3VycmVudFtpXSA9PT0gJ251bWJlcicpXG4gICAgICAgICAgICAgICAgdmVsb2NpdHlbaV0gPSBzcGVlZCAqIChjdXJyZW50W2ldIC0gc3RhcnRbaV0pIC8gZHVyYXRpb247XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdmVsb2NpdHlbaV0gPSAwO1xuICAgICAgICB9XG4gICAgfSBlbHNlXG4gICAgICAgIHZlbG9jaXR5ID0gc3BlZWQgKiAoY3VycmVudCAtIHN0YXJ0KSAvIGR1cmF0aW9uO1xuICAgIHJldHVybiB2ZWxvY2l0eTtcbn1cbmZ1bmN0aW9uIF9jYWxjdWxhdGVTdGF0ZShzdGFydCwgZW5kLCB0KSB7XG4gICAgdmFyIHN0YXRlO1xuICAgIGlmIChzdGFydCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHN0YXRlID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhcnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhcnRbaV0gPT09ICdudW1iZXInKVxuICAgICAgICAgICAgICAgIHN0YXRlW2ldID0gX2ludGVycG9sYXRlKHN0YXJ0W2ldLCBlbmRbaV0sIHQpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHN0YXRlW2ldID0gc3RhcnRbaV07XG4gICAgICAgIH1cbiAgICB9IGVsc2VcbiAgICAgICAgc3RhdGUgPSBfaW50ZXJwb2xhdGUoc3RhcnQsIGVuZCwgdCk7XG4gICAgcmV0dXJuIHN0YXRlO1xufVxuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUodGltZXN0YW1wKSB7XG4gICAgaWYgKCF0aGlzLl9hY3RpdmUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLl9jYWxsYmFjaztcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdGltZXN0YW1wKVxuICAgICAgICB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgIGlmICh0aGlzLl91cGRhdGVUaW1lID49IHRpbWVzdGFtcClcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuX3VwZGF0ZVRpbWUgPSB0aW1lc3RhbXA7XG4gICAgdmFyIHRpbWVTaW5jZVN0YXJ0ID0gdGltZXN0YW1wIC0gdGhpcy5fc3RhcnRUaW1lO1xuICAgIGlmICh0aW1lU2luY2VTdGFydCA+PSB0aGlzLl9kdXJhdGlvbikge1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5fZW5kVmFsdWU7XG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSBfY2FsY3VsYXRlVmVsb2NpdHkodGhpcy5zdGF0ZSwgdGhpcy5fc3RhcnRWYWx1ZSwgdGhpcy5fY3VydmUsIHRoaXMuX2R1cmF0aW9uLCAxKTtcbiAgICAgICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0aW1lU2luY2VTdGFydCA8IDApIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuX3N0YXJ0VmFsdWU7XG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB0aGlzLl9zdGFydFZlbG9jaXR5O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciB0ID0gdGltZVNpbmNlU3RhcnQgLyB0aGlzLl9kdXJhdGlvbjtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IF9jYWxjdWxhdGVTdGF0ZSh0aGlzLl9zdGFydFZhbHVlLCB0aGlzLl9lbmRWYWx1ZSwgdGhpcy5fY3VydmUodCkpO1xuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gX2NhbGN1bGF0ZVZlbG9jaXR5KHRoaXMuc3RhdGUsIHRoaXMuX3N0YXJ0VmFsdWUsIHRoaXMuX2N1cnZlLCB0aGlzLl9kdXJhdGlvbiwgdCk7XG4gICAgfVxufTtcblR3ZWVuVHJhbnNpdGlvbi5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlO1xufTtcblR3ZWVuVHJhbnNpdGlvbi5wcm90b3R5cGUuaGFsdCA9IGZ1bmN0aW9uIGhhbHQoKSB7XG4gICAgdGhpcy5yZXNldCh0aGlzLmdldCgpKTtcbn07XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSgnbGluZWFyJywgVHdlZW5UcmFuc2l0aW9uLkN1cnZlcy5saW5lYXIpO1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ2Vhc2VJbicsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMuZWFzZUluKTtcblR3ZWVuVHJhbnNpdGlvbi5yZWdpc3RlckN1cnZlKCdlYXNlT3V0JywgVHdlZW5UcmFuc2l0aW9uLkN1cnZlcy5lYXNlT3V0KTtcblR3ZWVuVHJhbnNpdGlvbi5yZWdpc3RlckN1cnZlKCdlYXNlSW5PdXQnLCBUd2VlblRyYW5zaXRpb24uQ3VydmVzLmVhc2VJbk91dCk7XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSgnZWFzZU91dEJvdW5jZScsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMuZWFzZU91dEJvdW5jZSk7XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSgnc3ByaW5nJywgVHdlZW5UcmFuc2l0aW9uLkN1cnZlcy5zcHJpbmcpO1xuVHdlZW5UcmFuc2l0aW9uLmN1c3RvbUN1cnZlID0gZnVuY3Rpb24gY3VzdG9tQ3VydmUodjEsIHYyKSB7XG4gICAgdjEgPSB2MSB8fCAwO1xuICAgIHYyID0gdjIgfHwgMDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHYxICogdCArICgtMiAqIHYxIC0gdjIgKyAzKSAqIHQgKiB0ICsgKHYxICsgdjIgLSAyKSAqIHQgKiB0ICogdDtcbiAgICB9O1xufTtcbm1vZHVsZS5leHBvcnRzID0gVHdlZW5UcmFuc2l0aW9uOyIsInZhciBVdGlsaXR5ID0ge307XG5VdGlsaXR5LkRpcmVjdGlvbiA9IHtcbiAgICBYOiAwLFxuICAgIFk6IDEsXG4gICAgWjogMlxufTtcblV0aWxpdHkuYWZ0ZXIgPSBmdW5jdGlvbiBhZnRlcihjb3VudCwgY2FsbGJhY2spIHtcbiAgICB2YXIgY291bnRlciA9IGNvdW50O1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvdW50ZXItLTtcbiAgICAgICAgaWYgKGNvdW50ZXIgPT09IDApXG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG59O1xuVXRpbGl0eS5sb2FkVVJMID0gZnVuY3Rpb24gbG9hZFVSTCh1cmwsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBvbnJlYWR5c3RhdGVjaGFuZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuICAgIHhoci5zZW5kKCk7XG59O1xuVXRpbGl0eS5jcmVhdGVEb2N1bWVudEZyYWdtZW50RnJvbUhUTUwgPSBmdW5jdGlvbiBjcmVhdGVEb2N1bWVudEZyYWdtZW50RnJvbUhUTUwoaHRtbCkge1xuICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBodG1sO1xuICAgIHZhciByZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgd2hpbGUgKGVsZW1lbnQuaGFzQ2hpbGROb2RlcygpKVxuICAgICAgICByZXN1bHQuYXBwZW5kQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblV0aWxpdHkuY2xvbmUgPSBmdW5jdGlvbiBjbG9uZShiKSB7XG4gICAgdmFyIGE7XG4gICAgaWYgKHR5cGVvZiBiID09PSAnb2JqZWN0Jykge1xuICAgICAgICBhID0gYiBpbnN0YW5jZW9mIEFycmF5ID8gW10gOiB7fTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYltrZXldID09PSAnb2JqZWN0JyAmJiBiW2tleV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoYltrZXldIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgYVtrZXldID0gbmV3IEFycmF5KGJba2V5XS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJba2V5XS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYVtrZXldW2ldID0gVXRpbGl0eS5jbG9uZShiW2tleV1baV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYVtrZXldID0gVXRpbGl0eS5jbG9uZShiW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYVtrZXldID0gYltrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYSA9IGI7XG4gICAgfVxuICAgIHJldHVybiBhO1xufTtcbm1vZHVsZS5leHBvcnRzID0gVXRpbGl0eTsiLCJ2YXIgRW50aXR5ID0gcmVxdWlyZSgnLi4vY29yZS9FbnRpdHknKTtcbnZhciBSZW5kZXJOb2RlID0gcmVxdWlyZSgnLi4vY29yZS9SZW5kZXJOb2RlJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi4vY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBWaWV3U2VxdWVuY2UgPSByZXF1aXJlKCcuLi9jb3JlL1ZpZXdTZXF1ZW5jZScpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4uL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG52YXIgTW9kaWZpZXIgPSByZXF1aXJlKCcuLi9jb3JlL01vZGlmaWVyJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCcuLi9jb3JlL09wdGlvbnNNYW5hZ2VyJyk7XG52YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCcuLi90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZScpO1xudmFyIFRyYW5zaXRpb25hYmxlVHJhbnNmb3JtID0gcmVxdWlyZSgnLi4vdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0nKTtcbmZ1bmN0aW9uIEdyaWRMYXlvdXQob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoR3JpZExheW91dC5ERUZBVUxUX09QVElPTlMpO1xuICAgIHRoaXMub3B0aW9uc01hbmFnZXIgPSBuZXcgT3B0aW9uc01hbmFnZXIodGhpcy5vcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuaWQgPSBFbnRpdHkucmVnaXN0ZXIodGhpcyk7XG4gICAgdGhpcy5fbW9kaWZpZXJzID0gW107XG4gICAgdGhpcy5fc3RhdGVzID0gW107XG4gICAgdGhpcy5fY29udGV4dFNpemVDYWNoZSA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF07XG4gICAgdGhpcy5fZGltZW5zaW9uc0NhY2hlID0gW1xuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXTtcbiAgICB0aGlzLl9hY3RpdmVDb3VudCA9IDA7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRPdXRwdXQpO1xufVxuZnVuY3Rpb24gX3JlZmxvdyhzaXplLCBjb2xzLCByb3dzKSB7XG4gICAgdmFyIHVzYWJsZVNpemUgPSBbXG4gICAgICAgICAgICBzaXplWzBdLFxuICAgICAgICAgICAgc2l6ZVsxXVxuICAgICAgICBdO1xuICAgIHVzYWJsZVNpemVbMF0gLT0gdGhpcy5vcHRpb25zLmd1dHRlclNpemVbMF0gKiAoY29scyAtIDEpO1xuICAgIHVzYWJsZVNpemVbMV0gLT0gdGhpcy5vcHRpb25zLmd1dHRlclNpemVbMV0gKiAocm93cyAtIDEpO1xuICAgIHZhciByb3dTaXplID0gTWF0aC5yb3VuZCh1c2FibGVTaXplWzFdIC8gcm93cyk7XG4gICAgdmFyIGNvbFNpemUgPSBNYXRoLnJvdW5kKHVzYWJsZVNpemVbMF0gLyBjb2xzKTtcbiAgICB2YXIgY3VyclkgPSAwO1xuICAgIHZhciBjdXJyWDtcbiAgICB2YXIgY3VyckluZGV4ID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvd3M7IGkrKykge1xuICAgICAgICBjdXJyWCA9IDA7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29sczsgaisrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbW9kaWZpZXJzW2N1cnJJbmRleF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIF9jcmVhdGVNb2RpZmllci5jYWxsKHRoaXMsIGN1cnJJbmRleCwgW1xuICAgICAgICAgICAgICAgICAgICBjb2xTaXplLFxuICAgICAgICAgICAgICAgICAgICByb3dTaXplXG4gICAgICAgICAgICAgICAgXSwgW1xuICAgICAgICAgICAgICAgICAgICBjdXJyWCxcbiAgICAgICAgICAgICAgICAgICAgY3VyclksXG4gICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICBdLCAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX2FuaW1hdGVNb2RpZmllci5jYWxsKHRoaXMsIGN1cnJJbmRleCwgW1xuICAgICAgICAgICAgICAgICAgICBjb2xTaXplLFxuICAgICAgICAgICAgICAgICAgICByb3dTaXplXG4gICAgICAgICAgICAgICAgXSwgW1xuICAgICAgICAgICAgICAgICAgICBjdXJyWCxcbiAgICAgICAgICAgICAgICAgICAgY3VyclksXG4gICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICBdLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJJbmRleCsrO1xuICAgICAgICAgICAgY3VyclggKz0gY29sU2l6ZSArIHRoaXMub3B0aW9ucy5ndXR0ZXJTaXplWzBdO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJZICs9IHJvd1NpemUgKyB0aGlzLm9wdGlvbnMuZ3V0dGVyU2l6ZVsxXTtcbiAgICB9XG4gICAgdGhpcy5fZGltZW5zaW9uc0NhY2hlID0gW1xuICAgICAgICB0aGlzLm9wdGlvbnMuZGltZW5zaW9uc1swXSxcbiAgICAgICAgdGhpcy5vcHRpb25zLmRpbWVuc2lvbnNbMV1cbiAgICBdO1xuICAgIHRoaXMuX2NvbnRleHRTaXplQ2FjaGUgPSBbXG4gICAgICAgIHNpemVbMF0sXG4gICAgICAgIHNpemVbMV1cbiAgICBdO1xuICAgIHRoaXMuX2FjdGl2ZUNvdW50ID0gcm93cyAqIGNvbHM7XG4gICAgZm9yIChpID0gdGhpcy5fYWN0aXZlQ291bnQ7IGkgPCB0aGlzLl9tb2RpZmllcnMubGVuZ3RoOyBpKyspXG4gICAgICAgIF9hbmltYXRlTW9kaWZpZXIuY2FsbCh0aGlzLCBpLCBbXG4gICAgICAgICAgICBNYXRoLnJvdW5kKGNvbFNpemUpLFxuICAgICAgICAgICAgTWF0aC5yb3VuZChyb3dTaXplKVxuICAgICAgICBdLCBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdLCAwKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdyZWZsb3cnKTtcbn1cbmZ1bmN0aW9uIF9jcmVhdGVNb2RpZmllcihpbmRleCwgc2l6ZSwgcG9zaXRpb24sIG9wYWNpdHkpIHtcbiAgICB2YXIgdHJhbnNpdGlvbkl0ZW0gPSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IG5ldyBUcmFuc2l0aW9uYWJsZVRyYW5zZm9ybShUcmFuc2Zvcm0udHJhbnNsYXRlLmFwcGx5KG51bGwsIHBvc2l0aW9uKSksXG4gICAgICAgICAgICBvcGFjaXR5OiBuZXcgVHJhbnNpdGlvbmFibGUob3BhY2l0eSksXG4gICAgICAgICAgICBzaXplOiBuZXcgVHJhbnNpdGlvbmFibGUoc2l6ZSlcbiAgICAgICAgfTtcbiAgICB2YXIgbW9kaWZpZXIgPSBuZXcgTW9kaWZpZXIoe1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2l0aW9uSXRlbS50cmFuc2Zvcm0sXG4gICAgICAgICAgICBvcGFjaXR5OiB0cmFuc2l0aW9uSXRlbS5vcGFjaXR5LFxuICAgICAgICAgICAgc2l6ZTogdHJhbnNpdGlvbkl0ZW0uc2l6ZVxuICAgICAgICB9KTtcbiAgICB0aGlzLl9zdGF0ZXNbaW5kZXhdID0gdHJhbnNpdGlvbkl0ZW07XG4gICAgdGhpcy5fbW9kaWZpZXJzW2luZGV4XSA9IG1vZGlmaWVyO1xufVxuZnVuY3Rpb24gX2FuaW1hdGVNb2RpZmllcihpbmRleCwgc2l6ZSwgcG9zaXRpb24sIG9wYWNpdHkpIHtcbiAgICB2YXIgY3VyclN0YXRlID0gdGhpcy5fc3RhdGVzW2luZGV4XTtcbiAgICB2YXIgY3VyclNpemUgPSBjdXJyU3RhdGUuc2l6ZTtcbiAgICB2YXIgY3Vyck9wYWNpdHkgPSBjdXJyU3RhdGUub3BhY2l0eTtcbiAgICB2YXIgY3VyclRyYW5zZm9ybSA9IGN1cnJTdGF0ZS50cmFuc2Zvcm07XG4gICAgdmFyIHRyYW5zaXRpb24gPSB0aGlzLm9wdGlvbnMudHJhbnNpdGlvbjtcbiAgICBjdXJyVHJhbnNmb3JtLmhhbHQoKTtcbiAgICBjdXJyT3BhY2l0eS5oYWx0KCk7XG4gICAgY3VyclNpemUuaGFsdCgpO1xuICAgIGN1cnJUcmFuc2Zvcm0uc2V0VHJhbnNsYXRlKHBvc2l0aW9uLCB0cmFuc2l0aW9uKTtcbiAgICBjdXJyU2l6ZS5zZXQoc2l6ZSwgdHJhbnNpdGlvbik7XG4gICAgY3Vyck9wYWNpdHkuc2V0KG9wYWNpdHksIHRyYW5zaXRpb24pO1xufVxuR3JpZExheW91dC5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgZGltZW5zaW9uczogW1xuICAgICAgICAxLFxuICAgICAgICAxXG4gICAgXSxcbiAgICB0cmFuc2l0aW9uOiBmYWxzZSxcbiAgICBndXR0ZXJTaXplOiBbXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdXG59O1xuR3JpZExheW91dC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmlkO1xufTtcbkdyaWRMYXlvdXQucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zTWFuYWdlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xufTtcbkdyaWRMYXlvdXQucHJvdG90eXBlLnNlcXVlbmNlRnJvbSA9IGZ1bmN0aW9uIHNlcXVlbmNlRnJvbShzZXF1ZW5jZSkge1xuICAgIGlmIChzZXF1ZW5jZSBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICBzZXF1ZW5jZSA9IG5ldyBWaWV3U2VxdWVuY2Uoc2VxdWVuY2UpO1xuICAgIHRoaXMuc2VxdWVuY2UgPSBzZXF1ZW5jZTtcbn07XG5HcmlkTGF5b3V0LnByb3RvdHlwZS5jb21taXQgPSBmdW5jdGlvbiBjb21taXQoY29udGV4dCkge1xuICAgIHZhciB0cmFuc2Zvcm0gPSBjb250ZXh0LnRyYW5zZm9ybTtcbiAgICB2YXIgb3BhY2l0eSA9IGNvbnRleHQub3BhY2l0eTtcbiAgICB2YXIgb3JpZ2luID0gY29udGV4dC5vcmlnaW47XG4gICAgdmFyIHNpemUgPSBjb250ZXh0LnNpemU7XG4gICAgdmFyIGNvbHMgPSB0aGlzLm9wdGlvbnMuZGltZW5zaW9uc1swXTtcbiAgICB2YXIgcm93cyA9IHRoaXMub3B0aW9ucy5kaW1lbnNpb25zWzFdO1xuICAgIGlmIChzaXplWzBdICE9PSB0aGlzLl9jb250ZXh0U2l6ZUNhY2hlWzBdIHx8IHNpemVbMV0gIT09IHRoaXMuX2NvbnRleHRTaXplQ2FjaGVbMV0gfHwgY29scyAhPT0gdGhpcy5fZGltZW5zaW9uc0NhY2hlWzBdIHx8IHJvd3MgIT09IHRoaXMuX2RpbWVuc2lvbnNDYWNoZVsxXSkge1xuICAgICAgICBfcmVmbG93LmNhbGwodGhpcywgc2l6ZSwgY29scywgcm93cyk7XG4gICAgfVxuICAgIHZhciBzZXF1ZW5jZSA9IHRoaXMuc2VxdWVuY2U7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBjdXJySW5kZXggPSAwO1xuICAgIHdoaWxlIChzZXF1ZW5jZSAmJiBjdXJySW5kZXggPCB0aGlzLl9tb2RpZmllcnMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBpdGVtID0gc2VxdWVuY2UuZ2V0KCk7XG4gICAgICAgIHZhciBtb2RpZmllciA9IHRoaXMuX21vZGlmaWVyc1tjdXJySW5kZXhdO1xuICAgICAgICBpZiAoY3VyckluZGV4ID49IHRoaXMuX2FjdGl2ZUNvdW50ICYmIHRoaXMuX3N0YXRlc1tjdXJySW5kZXhdLm9wYWNpdHkuaXNBY3RpdmUoKSkge1xuICAgICAgICAgICAgdGhpcy5fbW9kaWZpZXJzLnNwbGljZShjdXJySW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdGVzLnNwbGljZShjdXJySW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChtb2RpZmllci5tb2RpZnkoe1xuICAgICAgICAgICAgICAgIG9yaWdpbjogb3JpZ2luLFxuICAgICAgICAgICAgICAgIHRhcmdldDogaXRlbS5yZW5kZXIoKVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHNlcXVlbmNlID0gc2VxdWVuY2UuZ2V0TmV4dCgpO1xuICAgICAgICBjdXJySW5kZXgrKztcbiAgICB9XG4gICAgaWYgKHNpemUpXG4gICAgICAgIHRyYW5zZm9ybSA9IFRyYW5zZm9ybS5tb3ZlVGhlbihbXG4gICAgICAgICAgICAtc2l6ZVswXSAqIG9yaWdpblswXSxcbiAgICAgICAgICAgIC1zaXplWzFdICogb3JpZ2luWzFdLFxuICAgICAgICAgICAgMFxuICAgICAgICBdLCB0cmFuc2Zvcm0pO1xuICAgIHJldHVybiB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNmb3JtLFxuICAgICAgICBvcGFjaXR5OiBvcGFjaXR5LFxuICAgICAgICBzaXplOiBzaXplLFxuICAgICAgICB0YXJnZXQ6IHJlc3VsdFxuICAgIH07XG59O1xubW9kdWxlLmV4cG9ydHMgPSBHcmlkTGF5b3V0OyIsIi8vIEltcG9ydCBhZGRpdGlvbmFsIG1vZHVsZXMgdG8gYmUgdXNlZCBpbiB0aGlzIHZpZXcgXG52YXIgVmlldyA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvY29yZS9WaWV3Jyk7XG52YXIgU3VyZmFjZSA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvY29yZS9TdXJmYWNlJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9jb3JlL1RyYW5zZm9ybScpO1xudmFyIE1vZGlmaWVyICAgPSByZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvTW9kaWZpZXInKTtcbnZhciBJbWFnZVN1cmZhY2UgPSByZXF1aXJlKCdmYW1vdXMvc3JjL3N1cmZhY2VzL0ltYWdlU3VyZmFjZScpO1xudmFyIEVhc2luZyA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvdHJhbnNpdGlvbnMvRWFzaW5nJyk7XG5cbnZhciBTdGF0ZU1vZGlmaWVyID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9tb2RpZmllcnMvU3RhdGVNb2RpZmllcicpO1xudmFyIEdyaWRMYXlvdXQgPSByZXF1aXJlKCdmYW1vdXMvc3JjL3ZpZXdzL0dyaWRMYXlvdXQnKTtcbnZhciBUcmFuc2l0aW9uYWJsZSA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGUnKVxudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBTcHJpbmdUcmFuc2l0aW9uID0gcmVxdWlyZSgnZmFtb3VzL3NyYy90cmFuc2l0aW9ucy9TcHJpbmdUcmFuc2l0aW9uJyk7XG5cbi8vIE1vZGVsaW5nIEpTT04gb2JqZWN0IG9mIGlucHV0XG52YXIgZGF0YSA9IHtcbiAgICBsb2dvOiAnaW1hZ2VzL0NvY2EtQ29sYS5wbmcnLFxuICAgIGluaXRpYWxQb3NpdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgIGluaXRpYWxWZWxvY2l0eToge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgIGluaXRpYWxSb3RhdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxuICAgIG9wYWNpdHk6IDEsXG4gICAgZW50ZXI6IHtcbiAgICAgICAgdHlwZTogcm90YXRlSW5PdXQsXG4gICAgICAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAgICAgIHZlbG9jaXR5OiB7eDogMCwgeTogMCwgejogMH0sXG4gICAgICAgIHJvdGF0YXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICAgICAgcGVyaW9kOiAxMDAwLFxuICAgICAgICBkYW1waW5nUmF0aW86IDAsXG4gICAgICAgIHJlc3RpdHV0aW9uOiAwLFxuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgY3VydmU6IEVhc2luZy5pbk91dEJhY2tcbiAgICB9LFxuICAgIGV4aXQ6IHtcbiAgICAgICAgdHlwZTogcm90YXRlSW5PdXQsXG4gICAgICAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXG4gICAgICAgIHZlbG9jaXR5OiB7eDogMCwgeTogMCwgejogMH0sXG4gICAgICAgIHJvdGF0YXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcbiAgICAgICAgcGVyaW9kOiAxMDAwLFxuICAgICAgICBkYW1waW5nUmF0aW86IDAsXG4gICAgICAgIHJlc3RpdHV0aW9uOiAwLFxuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgY3VydmU6IEVhc2luZy5pbk91dEJhY2tcbiAgICB9XG59XG5cbi8qIEdFTkVSQVRPUlMgKi9cblxuLy8gQ29uc3RydWN0b3IgZnVuY3Rpb24gZm9yIG91ciBBcHBWaWV3IGNsYXNzXG5mdW5jdGlvbiBBZEdlbmVyYXRvcigpIHtcbiAgICB2YXIgbG9nbyA9IGdldExvZ28oKTtcbiAgICB2YXIgbW9kaWZpZXIgPSBnZXRNb2RpZmllcigpO1xuICAgIHZhciBlbnRlciA9IGVudGVyVHJhbnNpdGlvbigpO1xuICAgIHZhciBleGl0ID0gZXhpdFRyYW5zaXRpb24oKTtcblxuICAgIHJldHVybiB7bG9nbzogbG9nbywgbW9kaWZpZXI6IG1vZGlmaWVyLCBlbnRlcjogZW50ZXIsIGV4aXQ6IGV4aXR9O1xufVxuXG4vLyBcbmZ1bmN0aW9uIGdldExvZ28oKSB7XG4gICAgdmFyIGxvZ28gPSBuZXcgSW1hZ2VTdXJmYWNlKHtcbiAgICAgIHNpemU6IFszMDAsIDEwMF0sXG4gICAgICBjb250ZW50OiBkYXRhLmxvZ28sXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgIGxpbmVIZWlnaHQ6ICcxMDBweCdcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBsb2dvO1xufVxuXG4vLyBDcmVhdGVzIGEgbW9kaWZpZXIgZm9yIHN0YXJ0aW4gdGhlIHN0YXJ0aW5nXG4vLyBwb3NpdGlvblxuZnVuY3Rpb24gZ2V0TW9kaWZpZXIoKSB7XG4gICAgdmFyIG1vZGlmaWVyID0gbmV3IE1vZGlmaWVyKHtcbiAgICAgICAgLy8gc2l6ZTogW3VuZGVmaW5lZCx1bmRlZmluZWRdLFxuICAgICAgICAvLyBvcmlnaW46IFswLjUsMC41XSxcbiAgICAgICAgLy8gYWxpZ246Wy41LDBdLFxuICAgICAgICB0cmFuc2Zvcm06IFRyYW5zZm9ybS5yb3RhdGUoMSwwLDApXG4gICAgfSk7XG5cbiAgICByZXR1cm4gbW9kaWZpZXI7XG59XG5cbi8vIENhbGxzIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhIG1vZGlmaWVyXG4vLyBkZXBlbmRpbmcgb24gdGhlIHRyYW5zaXRpb24gdHlwZVxuZnVuY3Rpb24gZW50ZXJUcmFuc2l0aW9uKCkge1xuICAgIC8vIHJldHVybiBkYXRhLnR5cGUoZGF0YS5lbnRlcik7XG59XG5cbi8vIENhbGxzIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhIG1vZGlmaWVyXG4vLyBkZXBlbmRpbmcgb24gdGhlIHRyYW5zaXRpb24gdHlwZVxuZnVuY3Rpb24gZXhpdFRyYW5zaXRpb24oKSB7XG4gICAgLy8gcmV0dXJuIGRhdGEudHlwZShkYXRhLmV4aXQpO1xufVxuXG4vKiBUUkFOU0lUSU9OUyAqL1xuZnVuY3Rpb24gcm90YXRlSW5PdXQoZGF0YSkge1xuICAgIHZhciByb3RhdGUgPSBuZXcgTW9kaWZpZXI7XG4gICAgcm90YXRlLnNldFRyYW5zZm9ybShcbiAgICAgICAgVHJhbnNmb3JtLnRyYW5zbGF0ZShkYXRhLnBvc2l0aW9uLngsIGRhdGEucG9zaXRpb24ueSwgZGF0YS5wb3NpdGlvbi56KSxcbiAgICAgICAge2R1cmF0aW9uOiBkYXRhLmR1cmF0aW9uLCBjdXJ2ZTogZGF0YS5jdXJ2ZX1cbiAgICApXG5cbiAgICByZXR1cm4gcm90YXRlO1xufVxuXG5mdW5jdGlvbiBzcHJpbmdJbk91dChkYXRhKSB7XG5cbn1cblxuZnVuY3Rpb24gc2xpZGVJbk91dChkYXRhKSB7XG4gICAgdmFyIHNsaWRlID0gbmV3IE1vZGlmaWVyO1xuICAgIHNsaWRlLnNldFRyYW5zZm9ybShcbiAgICAgICAgVHJhbnNmb3JtLnRyYW5zbGF0ZShkYXRhLnBvc2l0aW9uLngsIGRhdGEucG9zaXRpb24ueSwgZGF0YS5wb3NpdGlvbi56KSxcbiAgICAgICAge2R1cmF0aW9uOiBkYXRhLmR1cmF0aW9uLCBjdXJ2ZTogZGF0YS5jdXJ2ZX1cbiAgICApXG5cbiAgICByZXR1cm4gc2xpZGU7XG59XG5cbmZ1bmN0aW9uIHdhbGxJbk91dChkYXRhKSB7XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBZEdlbmVyYXRvcjsiLCIvLyBJbXBvcnQgYWRkaXRpb25hbCBtb2R1bGVzIHRvIGJlIHVzZWQgaW4gdGhpcyB2aWV3IFxudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBNb2RpZmllciA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvY29yZS9Nb2RpZmllcicpO1xuXG52YXIgTW91c2VTeW5jICAgICA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvaW5wdXRzL01vdXNlU3luYycpO1xudmFyIFRvdWNoU3luYyAgICAgPSByZXF1aXJlKCdmYW1vdXMvc3JjL2lucHV0cy9Ub3VjaFN5bmMnKTtcbnZhciBTY3JvbGxTeW5jICAgID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9pbnB1dHMvU2Nyb2xsU3luYycpO1xudmFyIEdlbmVyaWNTeW5jICAgPSByZXF1aXJlKCdmYW1vdXMvc3JjL2lucHV0cy9HZW5lcmljU3luYycpO1xuXG52YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCdmYW1vdXMvc3JjL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlJyk7XG5cbi8vIFJlZ2lzdGVyIHN5bmMgaW5wdXRzXG5HZW5lcmljU3luYy5yZWdpc3Rlcih7XG4gICAgJ21vdXNlJzogTW91c2VTeW5jLFxuICAgICd0b3VjaCc6IFRvdWNoU3luYyxcbiAgICAnc2Nyb2xsJzogU2Nyb2xsU3luY1xufSlcblxuLy8gQ3JlYXRlIGEgdHJhbnNpdGlvbmFibGUgZm9yIHBvc2l0aW9uXG52YXIgcG9zaXRpb24gPSBuZXcgVHJhbnNpdGlvbmFibGUoWzAsIDBdKTtcblxuLy8gU2V0IHN5bmMgdmFyaWFibGUgZm9yIGdlbmVyaWMgc3luYyBtZXRob2RzXG52YXIgc3luYyA9IG5ldyBHZW5lcmljU3luYyh7XG4gICAgJ21vdXNlJzoge30sXG4gICAgJ3RvdWNoJzoge30sXG4gICAgJ3Njcm9sbCc6IHtzY2FsZSA6IC41fVxufSk7XG5mdW5jdGlvbiBkcmFnKHN1cmZhY2UpIHtcbiAgICAvLyBMaW5rcyBzeW5jIHRvIG91ciBzdXJmYWNlIHBhcmFtZXRlclxuICAgIHN1cmZhY2UucGlwZShzeW5jKTtcblxuICAgIC8vIFVwZGF0ZXMgcG9zaXRpb24gb2YgdHJhbnNpdGlvbmFibGVcbiAgICBzeW5jLm9uKCd1cGRhdGUnLCBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgdmFyIGN1cnJlbnRQb3NpdGlvbiA9IHBvc2l0aW9uLmdldCgpO1xuICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50UG9zaXRpb24pXG4gICAgICAgIHBvc2l0aW9uLnNldChbXG4gICAgICAgICAgICBjdXJyZW50UG9zaXRpb25bMF0gKyBkYXRhLmRlbHRhWzBdLFxuICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uWzFdXG4gICAgICAgIF0pO1xuICAgIH0pO1xuXG4gICAgLy8gb24gZHJhZ2dpbmcgdG8gcmlnaHQsIGxpa2UgcGFnZSBhbmQgb3BlbiBsaW5rLCBlbHNlIG5vdCBsaWtlIGFuZCBjbG9zZSBhZFxuICAgIHN1cmZhY2Uub24oJ21vdXNldXAnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgY3VycmVudFBvc2l0aW9uID0gcG9zaXRpb24uZ2V0KCk7XG4gICAgICAgIGlmIChjdXJyZW50UG9zaXRpb25bMF0gPiA4MCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xpa2VkJyk7XG4gICAgICAgICAgICBzdXJmYWNlLnNldFByb3BlcnRpZXMoe3Zpc2liaWxpdHk6ICdoaWRkZW4nfSlcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50UG9zaXRpb25bMF0gPCAoLTgwKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Rpc2xpa2VkJylcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBwb3NpdGlvbi5zZXQoWzAsMF0sIHtjdXJ2ZSA6ICdlYXNlT3V0Qm91bmNlJywgZHVyYXRpb24gOiAzMDB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoZXJlJylcbiAgICAgICAgfVxuICAgIH0pXG4gICAgLy8gb24gdG91Y2ggZHJhZyByaWdodCBsaWtlLCBsZWZ0IGRpc2xpa2VcbiAgICBzdXJmYWNlLm9uKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmIChjdXJyZW50UG9zaXRpb25bMF0gPiA4MCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xpa2VkJyk7XG4gICAgICAgICAgICBzdXJmYWNlLnNldFByb3BlcnRpZXMoe3Zpc2liaWxpdHk6ICdoaWRkZW4nfSlcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50UG9zaXRpb25bMF0gPCAoLTgwKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Rpc2xpa2VkJyk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcG9zaXRpb24uc2V0KFswLDBdLCB7Y3VydmUgOiAnZWFzZU91dEJvdW5jZScsIGR1cmF0aW9uIDogMzAwfSk7XG5cbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBBcHBsaWVzIHVwZGF0ZWQgcG9zaXRpb24gdG8gc3VyZmFjZVxuICAgIHZhciBwb3NpdGlvbk1vZGlmaWVyID0gbmV3IE1vZGlmaWVyKHtcbiAgICAgICAgdHJhbnNmb3JtOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRQb3NpdGlvbiA9IHBvc2l0aW9uLmdldCgpO1xuICAgICAgICAgICAgcmV0dXJuIFRyYW5zZm9ybS50cmFuc2xhdGUoY3VycmVudFBvc2l0aW9uWzBdLCBjdXJyZW50UG9zaXRpb25bMV0sIDApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBTZW5kcyBiYWNrIHRoZSBtb2RpZmllZCBzdXJmYWNlIGFuZCBwb3NpdGlvbiBtb2RpZmllclxuICAgIHJldHVybiB7c3VyZmFjZTogc3VyZmFjZSwgcG9zaXRpb25Nb2RpZmllcjogcG9zaXRpb25Nb2RpZmllcn07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZHJhZzsiLCIvL2xvYWQgc2Nyb2xsc1xucmVxdWlyZSgnLi9zY3JvbGwuanMnKTtcbi8vIExvYWQgY3NzXG5yZXF1aXJlKCcuL3N0eWxlcycpO1xuLy8gTG9hZCBwb2x5ZmlsbHNcbnJlcXVpcmUoJ2ZhbW91cy1wb2x5ZmlsbHMnKTtcbi8vIExvYWQgQWRHZW5lcmF0b3JcbnZhciBBZEdlbmVyYXRvciA9IHJlcXVpcmUoJy4vQWRHZW5lcmF0b3InKTtcbi8vIExvYWQgZHJhZ1xudmFyIGRyYWcgPSByZXF1aXJlKCcuL2RyYWcnKTtcbi8vIExvYWQgc2Nyb2xsXG52YXIgc2Nyb2xsZWQgPSByZXF1aXJlKCcuL3Njcm9sbGluZycpXG5cbi8vIEltcG9ydCBEZXBlbmRlbmNpZXNcbnZhciBFbmdpbmUgPSByZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvRW5naW5lJyk7XG52YXIgU3VyZmFjZSA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvY29yZS9TdXJmYWNlJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9jb3JlL1RyYW5zZm9ybScpO1xuXG4vLyBDcmVhdGUgY29udGFpbmVyIGFuZCBzZXQgdG8gbWFpbiBjb250ZXh0XG52YXIgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmFtb3VzLWNvbnRhaW5lcicpO1xuRW5naW5lLnNldE9wdGlvbnMoeyBhcHBNb2RlOiBmYWxzZSB9KTtcbnZhciBjb250YWluZXIgPSBFbmdpbmUuY3JlYXRlQ29udGV4dChlbCk7XG5cbmNyZWF0ZUNvbnRhaW5lcigpO1xuXG4vLyBGaWxsIGNvbnRhaW5lciB3aXRoIGEgbGF5b3V0IGFuZCBjb250ZW50IGZyb20gdGhlIEFkR2VuZXJhdG9yXG5mdW5jdGlvbiBjcmVhdGVDb250YWluZXIoKSB7XG5cdHZhciBhZE9iamVjdCA9IEFkR2VuZXJhdG9yKCk7XG4gIHZhciBzY3JvbGxPYmplY3QgPSBzY3JvbGxlZDtcblx0dmFyIGRyYWdPYmplY3QgPSBkcmFnKGFkT2JqZWN0LmxvZ28pO1xuXG5cdGNvbnRhaW5lclxuXHQgICAgXG5cdFx0LmFkZChhZE9iamVjdC5tb2RpZmllcilcblx0XHQuYWRkKGRyYWdPYmplY3QucG9zaXRpb25Nb2RpZmllcilcbiAgICAuYWRkKHNjcm9sbE9iamVjdC5yb3RhdGlvbk1vZGlmaWVyKVxuICAgIC5hZGQoZHJhZ09iamVjdC5zdXJmYWNlKVxufVxuIiwidmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvY29yZS9FdmVudEhhbmRsZXInKTtcclxudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJ2ZhbW91cy9zcmMvY29yZS9UcmFuc2Zvcm0nKTtcclxudmFyIHdpbmRvd1Njcm9sbEV2ZW50cyA9IHt9XHJcblxyXG4vL3NldCB1cCBldmVudCBoYW5kbGVycyAqKiBzaG9ydCBuYW1lcyBtb3JlIHJlYWRhYmxlIGluIGNvbmRpdGlvbmFscyBiZWxvdyAqKlxyXG52YXIgc2Nyb2xsRXZlbnRzID0gbmV3IEV2ZW50SGFuZGxlcigpO1xyXG5cclxuLy9zZXQgaGFuZGxlcnMgdG8gbWFpbiBleHBvcnRlZCBvYmplY3Rcclxud2luZG93U2Nyb2xsRXZlbnRzLnNjcm9sbEV2ZW50cyA9IHNjcm9sbEV2ZW50cztcclxuXHJcbi8vc3dpdGNoZXMgc28gZXZlbnQgaGFuZGxlcnMgYXJlIG9ubHkgY2FsbGVkIG9uY2Ugb24gc2Nyb2xsXHJcbndpbmRvd1Njcm9sbEV2ZW50cy5jYWxsZWQgPSBmYWxzZTtcclxud2luZG93U2Nyb2xsRXZlbnRzLmhpdEVuZCA9IGZhbHNlO1xyXG5cclxuLy90YXJnZXQgZWxlbWVudHMgYW5kIGR1cmF0aW9uIGluIHBpeGVscztcclxudmFyIGVsZW1lbnRJZFN0YXJ0ID0gJ2hlbGxvJztcclxudmFyIGVsZW1lbnRJZEVuZCA9ICdlbmQnO1xyXG52YXIgcGFkZGluZyA9IDEwMDtcclxuLy92YXIgZHVyYXRpb24gPSAxMDAwO1xyXG5cclxuY29uc29sZS5sb2coJ3RoaXMgaXMgd29ya2luZycpXHJcblxyXG4vL25hdGl2ZSBzY3JvbGwgbWFpbiBmdW5jdGlvblxyXG53aW5kb3cub25zY3JvbGwgPSBzY3JvbGxIYW5kbGVyO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBzY3JvbGxIYW5kbGVyLCB0cnVlKTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJnZXN0dXJlY2hhbmdlXCIsIHNjcm9sbEhhbmRsZXIsIGZhbHNlKVxyXG5cclxuZnVuY3Rpb24gc2Nyb2xsSGFuZGxlcigpe1xyXG5cclxuLy9wb3NpdGlvbiB2YXJpYWJsZXNcclxudmFyIHRhcmdldFBvc2l0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkU3RhcnQpLm9mZnNldFRvcDtcclxudmFyIHRhcmdldEVuZFBvc2l0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkRW5kKS5vZmZzZXRUb3A7IFxyXG52YXIgd2luZG93VG9wUG9zaXRpb24gPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblxyXG4vL2VtaXRzIHdpbmRvdyBwb3NpdGlvbiAgXHJcbiBzY3JvbGxFdmVudHMuZW1pdCgncG9zaXRpb25ZQ2hhbmdlJywge3Bvc2l0aW9uOiB3aW5kb3dUb3BQb3NpdGlvbn0pO1xyXG4gXHJcbiAvL2NoZWNrIHRvIHNlZSBpZiB5b3UgYXJlIGF0IHRoZSB0YXJnZXQgZWxlbWVudFxyXG4gaWYoIXdpbmRvd1Njcm9sbEV2ZW50cy5jYWxsZWQgJiYgKHdpbmRvd1RvcFBvc2l0aW9uICsgcGFkZGluZykgPiB0YXJnZXRQb3NpdGlvbil7XHJcbiAgd2luZG93U2Nyb2xsRXZlbnRzLmNhbGxlZCA9IHRydWU7XHJcbiAgXHJcbiAgLy9lbWl0IGV2ZW50IHdoZW4gdGFyZ2V0IHBvc2l0aW9uIGlzIHJlYWNoZWRcclxuICBzY3JvbGxFdmVudHMuZW1pdCgndGFyZ2V0cmVhY2hlZCcsIHt0YXJnZXQ6dGFyZ2V0UG9zaXRpb24sIHBhZGRpbmc6cGFkZGluZyB9KTtcclxuXHJcbiB9IFxyXG5cclxuIC8vaWYgeW91IGFyZSBub3QgeWV0IGF0IHRoZSB0YXJnZXQgZWxlbWVudCwgd2luZG93U2Nyb2xsRXZlbnRzLmNhbGxlZCBpcyBmYWxzZVxyXG4gaWYoKHdpbmRvd1RvcFBvc2l0aW9uICsgcGFkZGluZykgPCB0YXJnZXRQb3NpdGlvbil7XHJcbiAgXHJcbiAgd2luZG93U2Nyb2xsRXZlbnRzLmNhbGxlZCA9IGZhbHNlO1xyXG4gIHdpbmRvd1Njcm9sbEV2ZW50cy5oaXRFbmQgPSBmYWxzZTtcclxuICBcclxuICAvL2VtaXQgZXZlbnQgd2hlbiB0YXJnZXQgbm90IHJlYWNoZWQgXHJcbiAgc2Nyb2xsRXZlbnRzLmVtaXQoJ3RhcmdldG5vdHJlYWNoZWQnKTtcclxuICBcclxuIH1cclxuXHJcbiAvL2lmIHlvdSByZWFjaCB0aGUgJ3RhcmdldEVuZFBvc2l0aW9uJyBlbGVtZW50IGFsZXJ0IGFuZCBvbmx5IGNhbGwgb25jZVxyXG4gaWYoIXdpbmRvd1Njcm9sbEV2ZW50cy5oaXRFbmQgJiYgKHdpbmRvd1RvcFBvc2l0aW9uID4gdGFyZ2V0RW5kUG9zaXRpb24pKSB7XHJcbiAgd2luZG93U2Nyb2xsRXZlbnRzLmhpdEVuZCA9IHRydWU7XHJcbiAgXHJcbiAvL2VtaXQgZXZlbnQgd2hlbiB0YXJnZXQgZW5kIGlzIHJlYWNoZWQgXHJcbiAgc2Nyb2xsRXZlbnRzLmVtaXQoJ3RhcmdldGVuZHJlYWNoZWQnKTtcclxuXHJcbiB9XHJcblxyXG4gLy9pZiB5b3UgcmVhY2ggWCBkdXJhdGlvbiBwaXhlbHMgYmVsb3cgdGFyZ2V0IGVsZW1lbnQgYWxlcnQgYWJkIG9ubHkgY2FsbCBvbmNlXHJcbiAvLyBpZighd2luZG93U2Nyb2xsRXZlbnRzLmhpdEVuZCAmJiB3aW5kb3dUb3BQb3NpdGlvbiA+ICh0YXJnZXRQb3NpdGlvbitkdXJhdGlvbikpe1xyXG4gLy8gIHdpbmRvd1Njcm9sbEV2ZW50cy5oaXRFbmQgPSB0cnVlO1xyXG4gLy8gfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1Njcm9sbEV2ZW50cyIsInZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgTW9kaWZpZXIgPSByZXF1aXJlKCdmYW1vdXMvc3JjL2NvcmUvTW9kaWZpZXInKTtcbnZhciBTY3JvbGwgPSByZXF1aXJlKCcuL3Njcm9sbC5qcycpO1xuXG52YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnZmFtb3VzL3NyYy9jb3JlL0V2ZW50SGFuZGxlcicpO1xuXG4vL2xpc3RlbiB0byBzY3JvbGwgZXZlbnRzXG52YXIgc2Nyb2xsRXZlbnRzTGlzdGVuZXIgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG5cbi8vc3Vic2NyaWJlIHRvIHNjcm9sbCBldmVudHNcbnNjcm9sbEV2ZW50c0xpc3RlbmVyLnN1YnNjcmliZShTY3JvbGwuc2Nyb2xsRXZlbnRzKTtcblxuXG4vL2luaXRpYWwgc3RhdGVcbnZhciBpbml0UG9zWCA9IE1hdGguUEksIFxuaW5pdFBvc1kgPSAwLFxuaW5pdFBvc1ogPSAwLjEsXG5kaXN0YW5jZSA9IDEwMDtcblxudmFyIHJvdGF0aW9uTW9kaWZpZXIgPSBuZXcgTW9kaWZpZXIoe1xuICAgIHRyYW5zZm9ybTogVHJhbnNmb3JtLnJvdGF0ZShpbml0UG9zWCxpbml0UG9zWSxpbml0UG9zWilcbn0pOyBcblxuXG5cbi8vdHJhbnNmb3JtIHRvIHN0YXRlXG52YXIgZW5kUG9zWD1NYXRoLlBJLzI7XG52YXIgbG9jYXRpb249MDtcblxuIFxuXG5zY3JvbGxFdmVudHNMaXN0ZW5lci5vbigndGFyZ2V0cmVhY2hlZCcsIGZ1bmN0aW9uKGVsZW1lbnQpe1xuICAgXG4gIHNjcm9sbEV2ZW50c0xpc3RlbmVyLm9uKCdwb3NpdGlvbllDaGFuZ2UnLCBmdW5jdGlvbih5KXsgXG4gICAgICB2YXIgcG9zaXRpb24gPSBlbGVtZW50LnRhcmdldCAtIGVsZW1lbnQucGFkZGluZzsgICAgICBcbiAgICAgIHZhciB0cmFjayA9IHkucG9zaXRpb25cblxuICAgIHJvdGF0ZVBvc1ggPSBpbml0UG9zWCArICgodHJhY2sgLSBwb3NpdGlvbikvZGlzdGFuY2UpO1xuICAgIGlmKHJvdGF0ZVBvc1ggPD0gNS41NCAmJiByb3RhdGVQb3NYID4gTWF0aC5QSSl7XG4gICAgICAgcm90YXRpb25Nb2RpZmllci5zZXRUcmFuc2Zvcm0oVHJhbnNmb3JtLnJvdGF0ZShyb3RhdGVQb3NYLDAsMCkpICBcbiAgICB9XG4gICAgICAgY29uc29sZS5sb2cocm90YXRlUG9zWCwgJ2Rpc3RhbmNlJywgdHJhY2ssIHBvc2l0aW9uLCBkaXN0YW5jZSlcbiAgICBcbiAgfSk7XG59KTtcblxuc2Nyb2xsRXZlbnRzTGlzdGVuZXIub24oJ3RhcmdldG5vdHJlYWNoZWQnLCBmdW5jdGlvbigpe1xuIGlmKFNjcm9sbC5jYWxsZWQpe1xuICBTY3JvbGwuY2FsbGVkID0gZmFsc2U7XG4gIHJvdGF0aW9uTW9kaWZpZXIuc2V0VHJhbnNmb3JtKFRyYW5zZm9ybS5yb3RhdGUoaW5pdFBvc1gsaW5pdFBvc1ksaW5pdFBvc1opKSAgXG4gfVxufSk7XG5cbnNjcm9sbEV2ZW50c0xpc3RlbmVyLm9uKCd0YXJnZXRlbmRyZWFjaGVkJywgZnVuY3Rpb24oKXtcbiAgY29uc29sZS5sb2coXCJ0YXJnZXQgZW5kcyByZWFjaGVkIVwiKVxuICBpZihTY3JvbGwuY2FsbGVkKSB7XG4gICAgU2Nyb2xsLmNhbGxlZCA9IGZhbHNlO1xuICAgIHJvdGF0aW9uTW9kaWZpZXIuc2V0VHJhbnNmb3JtKFRyYW5zZm9ybS5yb3RhdGUoaW5pdFBvc1gsaW5pdFBvc1ksaW5pdFBvc1opKSAgXG4gIH1cbiBcbn0pO1xuXG5zY3JvbGxFdmVudHNMaXN0ZW5lci5vbigncG9zaXRpb25ZQ2hhbmdlJywgZnVuY3Rpb24oeSl7XG4gXG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtyb3RhdGlvbk1vZGlmaWVyOiByb3RhdGlvbk1vZGlmaWVyfTsiLCJ2YXIgY3NzID0gXCJodG1sIHtcXG4gIGJhY2tncm91bmQ6ICNmZmY7XFxuICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogbm9uZTtcXG59XFxuXFxuLmJhY2tmYWNlVmlzaWJpbGl0eSB7XFxuICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IHZpc2libGU7XFxuICBiYWNrZmFjZS12aXNpYmlsaXR5OiB2aXNpYmxlO1xcbn1cXG5cIjsgKHJlcXVpcmUoXCJjOlxcXFxVc2Vyc1xcXFxNb3JnYW5cXFxcZGVza3RvcFxcXFxuZXdwcm9qZWN0XFxcXGFkZmFtZVxcXFxub2RlX21vZHVsZXNcXFxcY3NzaWZ5XCIpKShjc3MpOyBtb2R1bGUuZXhwb3J0cyA9IGNzczsiLCIvLyBsb2FkIGNzc1xucmVxdWlyZSgnZmFtb3VzL3NyYy9jb3JlL2ZhbW91cy5jc3MnKTtcbnJlcXVpcmUoJy4vYXBwLmNzcycpO1xuIl19
