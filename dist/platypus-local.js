var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* tslint:disable */
/**
 * PlatypusTS v0.19.5 (https://platypi.io)
 * Copyright 2015 Platypi, LLC. All rights reserved.
 *
 * PlatypusTS is licensed under the MIT license found at
 * https://github.com/Platypi/platypusts/blob/master/LICENSE
 *
 */
/**
 * The entry point into the platypus library.
 */
/* tslint:disable:no-unused-variable */
/*
 */
var __prefix = '$', __CONTEXT = 'context', __AppStatic = __prefix + 'AppStatic', __App = __prefix + 'App', __Http = __prefix + 'Http', __HttpRequestInstance = __prefix + 'HttpRequestInstance', __HttpConfig = __prefix + 'HttpConfig', __Promise = __prefix + 'Promise', __Compat = __prefix + 'Compat', __ControlFactory = __prefix + 'ControlFactory', __AttributeControlFactory = __prefix + 'AttributeControlFactory', __Document = __prefix + 'Document', __DispatchEventInstance = __prefix + 'DispatchEventInstance', __ErrorEventStatic = __prefix + 'ErrorEventStatic', __EventManagerStatic = __prefix + 'EventManagerStatic', __LifecycleEventStatic = __prefix + 'LifecycleEventStatic', __LifecycleEventInstance = __prefix + 'LifecycleEventInstance', __Log = __prefix + 'Log', __Parser = __prefix + 'Parser', __Regex = __prefix + 'Regex', __Tokenizer = __prefix + 'Tokenizer', __NavigatorInstance = __prefix + 'NavigatorInstance', __ContextManagerStatic = __prefix + 'ContextManagerStatic', __ContextManagerInstance = __prefix + 'ContextManagerInstance', __Compiler = __prefix + 'Compiler', __CommentManagerFactory = __prefix + 'CommentManagerFactory', __CommentManagerInstance = __prefix + 'CommentManagerInstance', __ElementManagerFactory = __prefix + 'ElementManagerFactory', __ElementManagerInstance = __prefix + 'ElementManagerInstance', __NodeManagerStatic = __prefix + 'NodeManagerStatic', __TextManagerFactory = __prefix + 'TextManagerFactory', __TextManagerInstance = __prefix + 'TextManagerInstance', __CacheFactory = __prefix + 'CacheFactory', __ManagerCache = __prefix + 'ManagerCache', __TemplateCache = __prefix + 'TemplateCache', __Animator = __prefix + 'Animator', __AttributesFactory = __prefix + 'AttributesFactory', __AttributesInstance = __prefix + 'AttributesInstance', __BindableTemplatesFactory = __prefix + 'BindableTemplatesFactory', __Dom = __prefix + 'Dom', __DomEvents = __prefix + 'DomEvents', __IDomEventsConfig = __prefix + 'IDomEventsConfig', __DomEventInstance = __prefix + 'DomEventInstance', __ResourcesFactory = __prefix + 'ResourcesFactory', __ResourcesInstance = __prefix + 'ResourcesInstance', __TemplateControlFactory = __prefix + 'TemplateControlFactory', __TemplateControlInstance = __prefix + 'TemplateControlInstance', __Utils = __prefix + 'Utils', __Browser = __prefix + 'Browser', __BrowserConfig = __prefix + 'BrowserConfig', __Router = __prefix + 'Router', __RouterStatic = __prefix + 'RouterStatic', __UrlUtilsInstance = __prefix + 'UrlUtilsInstance', __Window = __prefix + 'Window', __LocalStorage = __prefix + 'LocalStorage', __SessionStorage = __prefix + 'SessionStorage', __Geolocation = __prefix + 'Geolocation', __BaseSegmentFactory = __prefix + 'BaseSegmentFactory', __BaseSegmentInstance = __prefix + 'BaseSegmentInstance', __StaticSegmentInstance = __prefix + 'StaticSegmentInstance', __VariableSegmentInstance = __prefix + 'VariableSegmentInstance', __DynamicSegmentInstance = __prefix + 'DynamicSegmentInstance', __SplatSegmentInstance = __prefix + 'SplatSegmentInstance', __StateStatic = __prefix + 'StateStatic', __StateInstance = __prefix + 'StateInstance', __RouteRecognizerInstance = __prefix + 'RouteRecognizerInstance', __InjectorStatic = __prefix + 'InjectorStatic', __History = __prefix + 'History', __Location = __prefix + 'Location', 
/**
 */
__Plat = 'plat-', __Bind = __Plat + 'bind', __Href = __Plat + 'href', __Src = __Plat + 'src', __KeyDown = __Plat + 'keydown', __KeyPress = __Plat + 'keypress', __KeyUp = __Plat + 'keyup', __CharPress = __Plat + 'charpress', __Name = __Plat + 'name', __Options = __Plat + 'options', __Checked = __Plat + 'checked', __Disabled = __Plat + 'disabled', __Selected = __Plat + 'selected', __ReadOnly = __Plat + 'readonly', __Visible = __Plat + 'visible', __Style = __Plat + 'style', __Tap = __Plat + 'tap', __Blur = __Plat + 'blur', __Change = __Plat + 'change', __Copy = __Plat + 'copy', __Cut = __Plat + 'cut', __Paste = __Plat + 'paste', __DblTap = __Plat + 'dbltap', __Focus = __Plat + 'focus', __Submit = __Plat + 'submit', __TouchStart = __Plat + 'touchstart', __TouchEnd = __Plat + 'touchend', __TouchMove = __Plat + 'touchmove', __TouchCancel = __Plat + 'touchcancel', __Hold = __Plat + 'hold', __Release = __Plat + 'release', __Swipe = __Plat + 'swipe', __SwipeLeft = __Plat + 'swipeleft', __SwipeRight = __Plat + 'swiperight', __SwipeUp = __Plat + 'swipeup', __SwipeDown = __Plat + 'swipedown', __Track = __Plat + 'track', __TrackLeft = __Plat + 'trackleft', __TrackRight = __Plat + 'trackright', __TrackUp = __Plat + 'trackup', __TrackDown = __Plat + 'trackdown', __TrackEnd = __Plat + 'trackend', __React = __Plat + 'react', __Link = __Plat + 'link', __ForEach = __Plat + 'foreach', __Html = __Plat + 'html', __If = __Plat + 'if', __Ignore = __Plat + 'ignore', __Select = __Plat + 'select', __Template = __Plat + 'template', __Routeport = __Plat + 'routeport', __Viewport = __Plat + 'viewport', __Control = __Plat + 'control', __ViewControl = __Plat + 'viewcontrol', __Resources = __Plat + 'resources', __Context = __Plat + __CONTEXT, __TemplateContext = __Template + '-' + __CONTEXT, __Callback = __Plat + 'callback', __AttributePrefix = 'data-', 
/**
 */
__TemplateControlCache = '__templateControlCache', __Head = 'head', __Meta = 'meta', __Title = 'title', __Description = 'description', __Author = 'author', __Creator = 'creator', __MetaLink = 'link', __MetaHref = 'href', __MetaName = 'name', __MetaProperty = 'property', __MetaImage = 'image', __MetaVideo = 'video', __MetaType = 'type', __Rel = 'rel', __Url = 'url', __Article = 'article:', __OpenGraph = 'og:', __Twitter = 'twitter:', __Content = 'content', 
/**
 */
__ready = 'ready', __suspend = 'suspend', __resume = 'resume', __online = 'online', __offline = 'offline', __error = 'error', __shutdown = 'shutdown', __exiting = 'exiting', __beforeLoad = 'beforeLoad', 
/**
 */
__beforeNavigate = 'beforeNavigate', __navigated = 'navigated', __navigating = 'navigating', __beforeRouteChange = 'beforeRouteChange', __routeChanged = 'routeChanged', __urlChanged = 'urlChanged', 
/**
 */
__pause = 'pause', __deviceReady = 'deviceReady', __backButton = 'backbutton', __backClick = 'backclick', __backButtonPressed = 'backButtonPressed', 
/**
 */
__Hide = __Plat + 'hide', __Animating = __Plat + 'animating', __SimpleAnimation = __Plat + 'animation', __SimpleTransition = __Plat + 'transition', __Enter = __Plat + 'enter', __Leave = __Plat + 'leave', __Move = __Plat + 'move', __FadeIn = __Plat + 'fadein', __FadeOut = __Plat + 'fadeout', __NavigatingBack = __Plat + 'back-nav', 
/**
 */
__event_prefix = '$', __tap = __event_prefix + 'tap', __dbltap = __event_prefix + 'dbltap', __touchstart = __event_prefix + 'touchstart', __touchend = __event_prefix + 'touchend', __touchmove = __event_prefix + 'touchmove', __touchcancel = __event_prefix + 'touchcancel', __hold = __event_prefix + 'hold', __release = __event_prefix + 'release', __swipe = __event_prefix + 'swipe', __swipeleft = __event_prefix + 'swipeleft', __swiperight = __event_prefix + 'swiperight', __swipeup = __event_prefix + 'swipeup', __swipedown = __event_prefix + 'swipedown', __track = __event_prefix + 'track', __trackleft = __event_prefix + 'trackleft', __trackright = __event_prefix + 'trackright', __trackup = __event_prefix + 'trackup', __trackdown = __event_prefix + 'trackdown', __trackend = __event_prefix + 'trackend', 
/**
 */
__errorSuffix = 'Error', __platError = 'Plat' + __errorSuffix, __parseError = 'Parsing' + __errorSuffix, __bindError = 'Binding' + __errorSuffix, __compileError = 'Compiling' + __errorSuffix, __nameError = 'PlatName' + __errorSuffix, __navigationError = 'Navigating' + __errorSuffix, __templateError = 'Templating' + __errorSuffix, __contextError = 'Context' + __errorSuffix, __eventError = 'DispatchEvent' + __errorSuffix, __injectableError = 'Injectable' + __errorSuffix, __CompatError = 'Compatibility' + __errorSuffix, 
/**
 */
__forEachAliasOptions = {
    index: 'index',
    even: 'even',
    odd: 'odd',
    first: 'first',
    last: 'last'
}, 
/**
 */
__BASE_SEGMENT_TYPE = 'base', __VARIABLE_SEGMENT_TYPE = 'variable', __STATIC_SEGMENT_TYPE = 'static', __SPLAT_SEGMENT_TYPE = 'splat', __DYNAMIC_SEGMENT_TYPE = 'dynamic', 
/**
 */
__CONTEXT_CHANGED_PRIORITY = 1000, __startSymbol = '{{', __endSymbol = '}}', __STATIC = 'static', __SINGLETON = 'singleton', __INSTANCE = 'instance', __FACTORY = 'factory', __CLASS = 'class', __CSS = 'css', __COMPILED = '-compiled', __BOUND_PREFIX = '-@', __INIT_SUFFIX = '-init', __START_NODE = ': start node', __END_NODE = ': end node', __POPSTATE = 'popstate', __HASHCHANGE = 'hashchange', __WRAPPED_INJECTOR = 'wrapped', __JSONP_CALLBACK = 'plat_callback', __JS = 'js', __NOOP_INJECTOR = 'noop', __APP = '__app__', __RESOURCE = 'resource', __RESOURCES = __RESOURCE + 's', __ALIAS = 'alias', __ALIASES = __ALIAS + 'es', __OBSERVABLE_RESOURCE = 'observable', __INJECTABLE_RESOURCE = 'injectable', __OBJECT_RESOURCE = 'object', __FUNCTION_RESOURCE = 'function', __LITERAL_RESOURCE = 'literal', __ROOT_RESOURCE = 'root', __ROOT_CONTEXT_RESOURCE = 'rootContext', __CONTROL_RESOURCE = 'control', __CONTEXT_RESOURCE = __CONTEXT;
/* tslint:disable:no-unused-variable */
var ___Promise, ___compat, __camelCaseRegex, __capitalCaseRegex, __nativeIsArray = !!Array.isArray;
var __uids = {}, __objToString = Object.prototype.toString, __toStringClass = '[object ', __errorClass = __toStringClass + 'Error]', __fileClass = __toStringClass + 'File]', __arrayClass = __toStringClass + 'Array]', __boolClass = __toStringClass + 'Boolean]', __dateClass = __toStringClass + 'Date]', __funcClass = __toStringClass + 'Function]', __numberClass = __toStringClass + 'Number]', __objectClass = __toStringClass + 'Object]', __regexpClass = __toStringClass + 'RegExp]', __stringClass = __toStringClass + 'String]', __promiseClass = __toStringClass + 'Promise]', __objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
};
function noop() { }
function _defineProperty(obj, key, value, enumerable, configurable, writable) {
    Object.defineProperty(obj, key, {
        value: value,
        enumerable: enumerable === true,
        configurable: configurable === true,
        writable: writable === true
    });
}
function _defineGetter(obj, key, value, enumerable, configurable) {
    Object.defineProperty(obj, key, {
        get: function () { return value; },
        enumerable: enumerable === true,
        configurable: configurable === true
    });
}
function _extend(deep, redefine, destination) {
    var sources = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        sources[_i - 3] = arguments[_i];
    }
    if (isNull(destination)) {
        return destination;
    }
    var keys, property, define;
    if (isFunction(redefine)) {
        define = redefine;
    }
    else if (redefine) {
        define = function (obj, key, value) {
            _defineProperty(obj, key, value, true, true, true);
        };
    }
    else {
        define = function (obj, key, value) {
            obj[key] = value;
        };
    }
    if (isEmpty(sources)) {
        sources.push(destination);
    }
    forEach(function (source, k) {
        if (!isObject(source)) {
            return;
        }
        keys = Object.keys(source);
        forEach(function (key) {
            property = source[key];
            if (deep) {
                if (isArray(property)) {
                    _extend(deep, define, destination[key] || (destination[key] = []), property);
                    return;
                }
                else if (isDate(property)) {
                    define(destination, key, new Date(property.getTime()));
                    return;
                }
                else if (isRegExp(property)) {
                    define(destination, key, new RegExp(property));
                    return;
                }
                else if (isNode(property)) {
                    define(destination, key, property.cloneNode(true));
                    return;
                }
                else if (isObject(property)) {
                    _extend(deep, define, destination[key] || (destination[key] = {}), property);
                    return;
                }
            }
            define(destination, key, property);
        }, keys);
    }, sources);
    return destination;
}
function _clone(obj, deep) {
    if (!isObject(obj)) {
        return obj;
    }
    else if (isDate(obj)) {
        return new Date(obj.getTime());
    }
    else if (isRegExp(obj)) {
        return new RegExp(obj);
    }
    else if (isNode(obj)) {
        return obj.cloneNode(deep);
    }
    else if (isError(obj)) {
        return new obj.constructor(obj.message);
    }
    var type = {};
    if (isArray(obj)) {
        type = [];
    }
    if (isBoolean(deep) && deep) {
        return _extend(true, false, type, obj);
    }
    return _extend(false, false, type, obj);
}
function isError(obj) {
    return __objToString.call(obj) === __errorClass;
}
function isObject(obj) {
    return obj != null && typeof obj === 'object';
}
function isWindow(obj) {
    return !!(obj && obj.document && obj.setInterval);
}
function isDocument(obj) {
    return !!(obj && obj.nodeType === Node.DOCUMENT_NODE);
}
function isNode(obj) {
    return !!(obj && typeof obj.nodeType === 'number');
}
function isDocumentFragment(obj) {
    return !!(obj && obj.nodeType === Node.DOCUMENT_FRAGMENT_NODE);
}
function isFile(obj) {
    return isObject(obj) && __objToString.call(obj) === __fileClass;
}
function isString(obj) {
    return typeof obj === 'string' || isObject(obj) && __objToString.call(obj) === __stringClass;
}
function isRegExp(obj) {
    return isObject(obj) && __objToString.call(obj) === __regexpClass;
}
function isPromise(obj) {
    return isObject(obj) && (__objToString.call(obj) === __promiseClass || isFunction(obj.then));
}
function isEmpty(obj) {
    if (isNull(obj)) {
        return true;
    }
    if (isString(obj) || isArray(obj)) {
        return obj.length === 0;
    }
    if (!isObject(obj)) {
        return false;
    }
    return Object.keys(obj).length === 0;
}
function isBoolean(obj) {
    return obj === true || obj === false || isObject(obj) && __objToString.call(obj) === __boolClass;
}
function isNumber(obj) {
    return (typeof obj === 'number' || isObject(obj) && __objToString.call(obj) === __numberClass) && !isNaN(obj);
}
function isFunction(obj) {
    return typeof obj === 'function';
}
function isNull(obj) {
    return obj === null || obj === undefined;
}
function isUndefined(obj) {
    return obj === undefined;
}
function isArray(obj) {
    if (__nativeIsArray) {
        return Array.isArray(obj);
    }
    return __objToString.call(obj) === __arrayClass;
}
function isArrayLike(obj) {
    if (isNull(obj) || isWindow(obj) || isFunction(obj)) {
        return false;
    }
    return isString(obj) || obj.length >= 0;
}
function isDate(obj) {
    return typeof obj === 'object' && __objToString.call(obj) === __dateClass;
}
function filter(iterator, obj, context) {
    var arr = [];
    if (isNull(obj)) {
        return arr;
    }
    if (isFunction(obj.filter)) {
        return obj.filter(iterator, context);
    }
    forEach(function (value, key, obj) {
        if (iterator(value, key, obj)) {
            arr.push(value);
        }
    }, obj);
    return arr;
}
function where(properties, obj) {
    return filter(function (value) {
        return !some(function (property, key) {
            return value[key] !== property;
        }, properties);
    }, obj);
}
function forEach(iterator, obj, context) {
    if (isNull(obj) || !(isObject(obj) || isArrayLike(obj))) {
        return obj;
    }
    var i, key, length;
    if (isFunction(obj.forEach)) {
        return obj.forEach(iterator, context);
    }
    else if (isArrayLike(obj)) {
        for (i = 0, length = obj.length; i < length; ++i) {
            iterator.call(context, obj[i], i, obj);
        }
    }
    else {
        var keys = Object.keys(obj);
        length = keys.length;
        while (keys.length > 0) {
            key = keys.shift();
            iterator.call(context, obj[key], key, obj);
        }
    }
    return obj;
}
function map(iterator, obj, context) {
    var arr = [];
    if (isNull(obj)) {
        return arr;
    }
    if (isFunction(obj.map)) {
        return obj.map(iterator, context);
    }
    forEach(function (value, key) {
        arr.push(iterator.call(context, value, key, obj));
    }, obj);
    return arr;
}
function mapAsync(iterator, obj, context) {
    ___Promise = ___Promise || acquire(__Promise);
    return ___Promise.all(map(iterator, obj, context));
}
function mapAsyncWithOrder(iterator, array, context, descending) {
    ___Promise = ___Promise || acquire(__Promise);
    var initialValue = ___Promise.resolve([]);
    if (!isArray(array)) {
        return initialValue;
    }
    iterator = iterator.bind(context);
    var inOrder = function (previousValue, nextValue, nextIndex, array) {
        return previousValue.then(function (items) {
            return iterator(nextValue, nextIndex, array).then(function (moreItems) {
                return items.concat(moreItems);
            });
        });
    };
    if (descending === true) {
        return array.reduceRight(inOrder, initialValue);
    }
    return array.reduce(inOrder, initialValue);
}
function mapAsyncInOrder(iterator, array, context) {
    return mapAsyncWithOrder(iterator, array, context);
}
function mapAsyncInDescendingOrder(iterator, array, context) {
    return mapAsyncWithOrder(iterator, array, context, true);
}
function pluck(key, obj) {
    return map(function (value) { return value[key]; }, obj);
}
function some(iterator, obj, context) {
    if (isNull(obj) || isFunction(obj)) {
        return false;
    }
    var i, key, length, ret;
    if (isFunction(obj.some)) {
        return obj.some(iterator, context);
    }
    else if (isArrayLike(obj)) {
        for (i = 0, length = obj.length; i < length; ++i) {
            ret = iterator.call(context, obj[i], i, obj);
            if (ret === true) {
                return true;
            }
        }
    }
    else {
        var keys = Object.keys(obj);
        length = keys.length;
        while (keys.length > 0) {
            key = keys.shift();
            ret = iterator.call(context, obj[key], key, obj);
            if (ret === true) {
                return true;
            }
        }
    }
    return false;
}
function postpone(method, args, context) {
    return defer(method, 0, args, context);
}
function defer(method, timeout, args, context) {
    function execDefer() {
        method.apply(context, args);
    }
    var timeoutId = setTimeout(execDefer, timeout);
    return function () {
        clearTimeout(timeoutId);
    };
}
function setIntervalGlobal(method, interval, args, context) {
    function execInterval() {
        method.apply(context, args);
    }
    var intervalId = setInterval(execInterval, interval);
    return function () {
        clearInterval(intervalId);
    };
}
function requestAnimationFrameGlobal(method, context) {
    ___compat = ___compat || (acquire(__Compat));
    var requestAnimFrame = ___compat.requestAnimationFrame;
    if (isUndefined(requestAnimFrame)) {
        return postpone(function () {
            method.call(context, Date.now());
        });
    }
    var animationId = requestAnimFrame(method.bind(context)), cancelAnimFrame = ___compat.cancelAnimationFrame || noop;
    return function () {
        cancelAnimFrame(animationId);
    };
}
function uniqueId(prefix) {
    if (isNull(prefix)) {
        prefix = '';
    }
    var puid = __uids[prefix];
    if (isNull(puid)) {
        puid = __uids[prefix] = ['0', '/'];
    }
    var index = puid.length, charCode;
    while (index--) {
        charCode = puid[index].charCodeAt(0);
        // '9' 
        if (charCode === 57) {
            puid[index] = 'A';
            return join();
        }
        // 'Z' 
        if (charCode === 90) {
            puid[index] = 'a';
            return join();
        }
        // 'z' 
        if (charCode === 122) {
            puid[index] = '0';
        }
        else {
            puid[index] = String.fromCharCode(charCode + 1);
            return join();
        }
    }
    puid.unshift('0');
    function join() {
        return prefix + puid.join('');
    }
    return join();
}
function camelCase(str) {
    if (!isString(str) || isEmpty(str)) {
        return str;
    }
    str = str.charAt(0).toLowerCase() + str.slice(1);
    __camelCaseRegex = __camelCaseRegex || acquire(__Regex).camelCaseRegex;
    return str.replace(__camelCaseRegex, function (match, delimiter, char, index) {
        return index ? char.toUpperCase() : char;
    });
}
function delimit(str, delimiter) {
    if (!isString(str) || isEmpty(str)) {
        return str;
    }
    else if (isNull(delimiter)) {
        delimiter = '';
    }
    __capitalCaseRegex = __capitalCaseRegex || acquire(__Regex).capitalCaseRegex;
    return str.replace(__capitalCaseRegex, function (match, index) {
        return index ? delimiter + match.toLowerCase() : match.toLowerCase();
    });
}
function deleteProperty(obj, property) {
    if (!isNull(obj)) {
        /* tslint:disable:no-unused-expression */
        delete obj[property];
    }
    return obj;
}
function access(obj, property) {
    if (isNull(obj)) {
        return obj;
    }
    return obj[property];
}
function deserializeQuery(search) {
    if (isEmpty(search)) {
        return;
    }
    var split = search.split('&'), query = {}, length = split.length, item;
    for (var i = 0; i < length; ++i) {
        item = split[i].split('=');
        query[item[0]] = item[1];
    }
    return query;
}
function serializeQuery(query) {
    var q = '';
    q += map(function (value, key) {
        return key + '=' + value;
    }, query).join('&');
    if (!isEmpty(q)) {
        q = '?' + q;
    }
    return q;
}
function booleanReduce(values) {
    if (!isArray(values)) {
        return isBoolean(values) ? values : true;
    }
    return values.reduce(function (prev, current) {
        return prev && current !== false;
    }, true);
}
/* tslint:enable:no-unused-variable */
/* tslint:disable:no-unused-variable */
var ___document, ___templateCache, ___http, ___log;
var __nodeNameRegex = /<([\w:]+)/, __whiteSpaceRegex = /\s+/g, __option = [1, '<select multiple="multiple">', '</select>'], __table = [1, '<table>', '</table>'], __tableData = [3, '<table><tbody><tr>', '</tr></tbody></table>'], __svg = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">', '</svg>'], __innerTableWrappers = {
    thead: __table,
    tbody: __table,
    tfoot: __table,
    colgroup: __table,
    caption: __table,
    tr: [2, '<table><tbody>', '</tbody></table>'],
    col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
    td: __tableData,
    th: __tableData
}, __innerHtmlWrappers = _extend(false, false, {}, __innerTableWrappers, {
    option: __option,
    optgroup: __option,
    legend: [1, '<fieldset>', '</fieldset>'],
    area: [1, '<map>', '</map>'],
    param: [1, '<object>', '</object>'],
    text: __svg,
    circle: __svg,
    ellipse: __svg,
    line: __svg,
    path: __svg,
    polygon: __svg,
    polyline: __svg,
    rect: __svg,
    _default: [0, '', '']
});
function appendChildren(nodeList, root, clone) {
    var isFragment = isDocumentFragment(root), nullRoot = !isNode(root), fragment = isFragment ?
        root :
        (___document || (___document = acquire(__Document))).createDocumentFragment();
    if (nullRoot) {
        root = fragment;
    }
    var list = isArray(nodeList) ? nodeList : Array.prototype.slice.call(nodeList), length = list.length, i;
    if (clone === true) {
        var item;
        for (i = 0; i < length; ++i) {
            item = list[i].cloneNode(true);
            fragment.insertBefore(item, null);
        }
    }
    else {
        for (i = 0; i < length; ++i) {
            fragment.insertBefore(list[i], null);
        }
    }
    if (!(isFragment || nullRoot)) {
        root.appendChild(fragment);
    }
    return root;
}
function clearNode(node) {
    var childNodes = Array.prototype.slice.call(node.childNodes);
    while (childNodes.length > 0) {
        node.removeChild(childNodes.pop());
    }
}
function clearNodeBlock(nodeList, parent) {
    if (!isFunction(nodeList.push)) {
        nodeList = Array.prototype.slice.call(nodeList);
    }
    if (!isNull(parent)) {
        clearNodeBlockWithParent(nodeList, parent);
        return;
    }
    var node;
    while (nodeList.length > 0) {
        node = nodeList.pop();
        parent = node.parentNode;
        if (isNull(parent)) {
            continue;
        }
        parent.removeChild(node);
    }
}
function clearNodeBlockWithParent(nodeList, parent) {
    while (nodeList.length > 0) {
        parent.removeChild(nodeList.pop());
    }
}
function stringToNode(html) {
    // ___compat is a global variable in utilsglobal 
    ___compat = ___compat || (___compat = acquire(__Compat));
    ___document = ___document || (___document = acquire(__Document));
    var nodeName = __nodeNameRegex.exec(html), element = ___document.createElement('div');
    if (isNull(nodeName)) {
        element = innerHtml(element, html);
        return element.removeChild(element.lastChild);
    }
    // trim html string 
    html = html.trim();
    var mapTag = nodeName[1];
    if (___compat.pushState && isUndefined(__innerTableWrappers[mapTag])) {
        return innerHtml(element, html);
    }
    else if (mapTag === 'body') {
        element = innerHtml(___document.createElement('html'), html);
        return element.removeChild(element.lastChild);
    }
    var wrapper = __innerHtmlWrappers[mapTag] || __innerHtmlWrappers._default, depth = wrapper[0], parentStart = wrapper[1], parentEnd = wrapper[2];
    element = innerHtml(element, parentStart + html + parentEnd);
    while (depth-- > 0) {
        element = element.lastChild;
    }
    return element;
}
function setInnerHtml(node, html) {
    clearNode(node);
    if (isEmpty(html)) {
        return;
    }
    var element = stringToNode(html);
    if (element.childNodes.length > 0) {
        appendChildren(element.childNodes, node);
    }
    else {
        node.insertBefore(element, null);
    }
    return node;
}
function insertBefore(parent, nodes, endNode) {
    if (isNull(parent) || !isObject(nodes)) {
        return;
    }
    else if (isUndefined(endNode)) {
        endNode = null;
    }
    var fragment;
    if (isNode(nodes)) {
        fragment = nodes;
        nodes = Array.prototype.slice.call(fragment.childNodes);
        parent.insertBefore(fragment, endNode);
        return nodes;
    }
    if (!isFunction(nodes.push)) {
        nodes = Array.prototype.slice.call(nodes);
    }
    ___document = ___document || (___document = acquire(__Document));
    var length = nodes.length;
    fragment = ___document.createDocumentFragment();
    for (var i = 0; i < length; ++i) {
        fragment.insertBefore(nodes[i], null);
    }
    parent.insertBefore(fragment, endNode);
    return nodes;
}
function replace(node) {
    var parent = node.parentNode, nodes = insertBefore(parent, node.childNodes, node);
    parent.removeChild(node);
    return nodes;
}
function replaceWith(node, newNode) {
    if (isNull(newNode)) {
        return newNode;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
        var attributes = node.attributes, length_1 = attributes.length, attribute;
        for (var i = 0; i < length_1; ++i) {
            attribute = attributes[i];
            newNode.setAttribute(attribute.name, attribute.value);
        }
    }
    var parent = node.parentNode;
    insertBefore(newNode, node.childNodes);
    parent.replaceChild(newNode, node);
    return newNode;
}
function serializeHtml(html) {
    ___document = ___document || (___document = acquire(__Document));
    var templateElement = ___document.createDocumentFragment();
    if (!isEmpty(html)) {
        setInnerHtml(templateElement, html);
    }
    return templateElement;
}
function removeBetween(startNode, endNode) {
    if (isNull(startNode)) {
        return;
    }
    var currentNode = startNode.nextSibling, parentNode = startNode.parentNode, tempNode;
    if (isNull(endNode)) {
        endNode = null;
    }
    if (isNull(parentNode) || (!isNull(endNode) && endNode.parentNode !== parentNode)) {
        return;
    }
    while (currentNode !== endNode) {
        tempNode = currentNode.nextSibling;
        parentNode.removeChild(currentNode);
        currentNode = tempNode;
    }
}
function removeAll(startNode, endNode) {
    if (isNull(startNode)) {
        return;
    }
    removeBetween(startNode, endNode);
    removeNode(startNode);
    removeNode(endNode);
}
/**
 */
function innerHtml(element, html) {
    ___compat = ___compat || (___compat = acquire(__Compat));
    if (___compat.msApp) {
        MSApp.execUnsafeLocalFunction(function () {
            element.innerHTML = html;
        });
    }
    else {
        element.innerHTML = html;
    }
    return element;
}
function removeNode(node) {
    if (!isNode(node)) {
        return;
    }
    var parentNode = node.parentNode;
    if (!isNull(parentNode)) {
        parentNode.removeChild(node);
    }
}
function addClass(element, className) {
    var cName = (element || {}).className;
    if (!isString(cName) || !isString(className) || className === '') {
        return;
    }
    var split = className.split(__whiteSpaceRegex), name, classNameRegex;
    if (isUndefined(element.classList)) {
        if (isEmpty(cName)) {
            element.className = className;
            return;
        }
        while (split.length > 0) {
            name = split.shift();
            if (name !== '') {
                classNameRegex = new RegExp('^' + name + '\\s+|\\s+' + name + '$|\\s+' + name + '\\s+', 'g');
                if (!classNameRegex.test(cName)) {
                    element.className += ' ' + name;
                }
            }
        }
        return;
    }
    while (split.length > 0) {
        name = split.shift();
        if (name !== '') {
            element.classList.add(name);
        }
    }
}
function removeClass(element, className) {
    var cName = (element || {}).className;
    if (!isString(cName) || !isString(className) || className === '') {
        return;
    }
    var split = className.split(__whiteSpaceRegex), name;
    if (isUndefined(element.classList)) {
        if (cName === className) {
            element.className = '';
            return;
        }
        while (split.length > 0) {
            name = split.shift();
            if (name !== '') {
                element.className = cName = cName
                    .replace(new RegExp('^' + name + '\\s+|\\s+' + name + '$|\\s+' + name + '\\s+', 'g'), '');
            }
        }
        return;
    }
    while (split.length > 0) {
        name = split.shift();
        if (name !== '') {
            element.classList.remove(name);
        }
    }
}
function toggleClass(element, className) {
    var cName = (element || {}).className;
    if (!isString(cName) || !isString(className) || className === '') {
        return;
    }
    var split = className.split(__whiteSpaceRegex), name;
    if (isUndefined(element.classList)) {
        var classNameRegex;
        if (cName === '') {
            element.className = className;
        }
        else if (cName === className) {
            element.className = '';
            return;
        }
        while (split.length > 0) {
            name = split.shift();
            if (name !== '') {
                classNameRegex = new RegExp('^' + name + '\\s+|\\s+' + name + '$|\\s+' + name + '\\s+', 'g');
                if (classNameRegex.test(cName)) {
                    element.className = cName = cName.replace(classNameRegex, '');
                    continue;
                }
                element.className += ' ' + name;
            }
        }
        return;
    }
    while (split.length > 0) {
        name = split.shift();
        if (name !== '') {
            element.classList.toggle(name);
        }
    }
}
function replaceClass(element, oldClass, newClass) {
    var cName = (element || {}).className;
    if (!isString(cName) || !isString(newClass) || newClass === '') {
        return;
    }
    if (isUndefined(element.classList)) {
        var startRegex = new RegExp('^' + oldClass + '\\s+', 'g'), midRegex = new RegExp('\\s+' + oldClass + '\\s+', 'g'), endRegex = new RegExp('\\s+' + oldClass + '$', 'g');
        element.className = cName.replace(startRegex, newClass + ' ')
            .replace(midRegex, ' ' + newClass + ' ')
            .replace(endRegex, ' ' + newClass);
        return;
    }
    element.classList.add(newClass);
    element.classList.remove(oldClass);
}
function hasClass(element, className) {
    var cName = (element || {}).className;
    if (!isString(cName) || !isString(className) || className === '') {
        return false;
    }
    var split = className.split(__whiteSpaceRegex);
    if (isUndefined(element.classList)) {
        if (cName === '') {
            return false;
        }
        else if (cName === className) {
            return true;
        }
        var name_1;
        while (split.length > 0) {
            name_1 = split.shift();
            if (!(name_1 === '' || new RegExp('^' + name_1 + '\\s|\\s' + name_1 + '$|\\s' + name_1 + '\\s', 'g').test(cName))) {
                return false;
            }
        }
        return true;
    }
    while (split.length > 0) {
        name = split.shift();
        if (!(name === '' || element.classList.contains(name))) {
            return false;
        }
    }
    return true;
}
function getTemplate(templateUrl) {
    ___templateCache = ___templateCache || (___templateCache = acquire(__TemplateCache));
    ___http = ___http || (___http = acquire(__Http));
    return ___templateCache.put(templateUrl, ___templateCache.read(templateUrl)
        .catch(function (error) {
        if (isNull(error)) {
            return ___http.ajax({ url: templateUrl });
        }
    }).then(function (success) {
        if (isDocumentFragment(success)) {
            return ___templateCache.put(templateUrl, success);
        }
        else if (!isObject(success) || !isString(success.response)) {
            ___log = ___log || (___log = acquire(__Log));
            ___log.warn('No template found at ' + templateUrl);
            return ___templateCache.put(templateUrl);
        }
        var templateString = success.response;
        if (isEmpty(templateString.trim())) {
            return ___templateCache.put(templateUrl);
        }
        return ___templateCache.put(templateUrl, templateString);
    }).catch(function (error) {
        postpone(function () {
            ___log = ___log || (___log = acquire(__Log));
            ___log.error(new Error('Failure to get template from ' + templateUrl + '.'));
        });
        return error;
    }));
}
function whenVisible(cb, element) {
    if (!isNode(element)) {
        ___log = ___log || (___log = acquire(__Log));
        ___log.error(new Error('Attempting to check visibility of something that isn\'t a Node.'));
        return noop;
    }
    var clientWidth = element.clientWidth, clientHeight = element.clientHeight;
    if (!(isNumber(clientWidth) && isNumber(clientHeight))) {
        ___log = ___log || (___log = acquire(__Log));
        ___log.error(new Error('Attempting to check visibility of something that isn\'t an Element.'));
        return noop;
    }
    if (clientWidth > 0 && clientHeight > 0) {
        cb();
        return noop;
    }
    var remove = setIntervalGlobal(function () {
        if (element.clientWidth > 0 && element.clientHeight > 0) {
            remove();
            cb();
        }
    }, 100);
    return remove;
}
/* tslint:enable:no-unused-variable */
var controlInjectors = {}, viewControlInjectors = {}, instanceInjectorDependencies = {}, injectableInjectors = {}, unregisteredInjectors = {}, staticInjectors = {}, animationInjectors = {}, jsAnimationInjectors = {};
/**
 * Holds all the classes and interfaces related to registering components for platypus.
 */
var register;
(function (register) {
    /**
     * Generic function for creating an Injector and
     * adding it to an InjectorObject.
     * @param {dependency.InjectorObject<any>} obj The InjectorObject
     * to which to add an Injector.
     * @param {string} name The name used to set/get the Injector from the
     * InjectorObject.
     * @param {any} Type The constructor or function definition for the Injector.
     * @param {Array<any>} dependencies? An array of strings representing the dependencies needed for the
     * Injector.
     * @param {string} injectableType? The injectable type.
     * @param {boolean} isStatic The injectable type is a static type.
     */
    function add(obj, name, Type, dependencies, injectableType, isStatic) {
        var injector = obj[name] = new dependency.Injector(name, Type, dependencies, injectableType);
        if (isStatic === true) {
            staticInjectors[name] = injector;
        }
        return register;
    }
    /**
     * @param {string} name The name of your app.
     * @param {new (...args: any[]) => App} Type The constructor for the IApp.
     * @param {Array<any>} dependencies? An array of strings representing the dependencies needed for the app injector.
     */
    function app(name, Type, dependencies) {
        var _Injector = acquire(__InjectorStatic), _AppStatic = acquire(__AppStatic);
        _AppStatic.registerApp(new _Injector(name, Type, dependencies));
        return register;
    }
    register.app = app;
    /**
     * @param {string} name The control type, corresponding to the HTML notation for creating a new Control (e.g. 'plat-foreach').
     * @param {new (...args: any[]) => Control} Type The constructor for the Control.
     * @param {Array<any>} dependencies? An array of strings representing the dependencies needed for the Control
     * injector.
     */
    function control(name, Type, dependencies, isStatic) {
        if (isString(name)) {
            name = name.toLowerCase();
        }
        else {
            throw new Error('A Control must be registered with a string name');
        }
        if (name === 'head') {
            isStatic = true;
        }
        return add(controlInjectors, name, Type, dependencies, isStatic ? __STATIC : undefined);
    }
    register.control = control;
    /**
     * @param {string} name The control type, corresponding to the HTML notation for creating a new
     * ViewControl. Used for navigation to the specified ViewControl.
     * @param {new (...args: any[]) => ui.ViewControl} Type The constructor for the ViewControl.
     * @param {Array<any>} dependencies? An optional array of strings representing the dependencies needed for the
     * ViewControl injector.
     */
    function viewControl(name, Type, dependencies) {
        if (isString(name)) {
            name = name.toLowerCase();
        }
        else {
            throw new Error('A ViewControl must be registered with a string name');
        }
        return add(viewControlInjectors, name, Type, dependencies);
    }
    register.viewControl = viewControl;
    function injectable(name, Type, dependencies, injectableType) {
        if (!isString(injectableType)) {
            injectableType = __SINGLETON;
        }
        else {
            injectableType = injectableType.toLowerCase();
            if (injectableType === __FACTORY || injectableType === __STATIC || injectableType === __CLASS) {
                return add(injectableInjectors, name, Type, dependencies, injectableType, true);
            }
            else if (!(injectableType === __SINGLETON || injectableType === __INSTANCE)) {
                throw new Error('Invalid injectable type ' + injectableType + ' during injectable registration.');
            }
        }
        return add(injectableInjectors, name, Type, dependencies, injectableType, false);
    }
    register.injectable = injectable;
    /**
     */
    var injectable;
    (function (injectable) {
        /**
         */
        injectable.STATIC = __STATIC;
        /**
         */
        injectable.SINGLETON = __SINGLETON;
        /**
         */
        injectable.INSTANCE = __INSTANCE;
        /**
         */
        injectable.FACTORY = __FACTORY;
        /**
         */
        injectable.CLASS = __CLASS;
    })(injectable = register.injectable || (register.injectable = {}));
    function animation(name, Type, dependencies, animationType) {
        if (isString(animationType)) {
            animationType = animationType.toLowerCase();
            if (!(animationType === __CSS || animationType === __JS)) {
                throw new Error('Invalid animationType "' + animationType + '" during animation registration.');
            }
        }
        return add((animationType === __JS ? jsAnimationInjectors : animationInjectors), name, Type, dependencies, register.injectable.INSTANCE);
    }
    register.animation = animation;
    /**
     */
    var animation;
    (function (animation) {
        /**
         */
        animation.CSS = __CSS;
        /**
         */
        animation.JS = __JS;
    })(animation = register.animation || (register.animation = {}));
})(register = exports.register || (exports.register = {}));
/**
 */
var dependency;
(function (dependency_1) {
    /**
     */
    var Injector = (function () {
        /**
         * @param {string} name The name of the injected type.
         * @param {new () => T} Constructor The constructor method for the component requiring the dependency
         * injection.
         * @param {Array<any>} dependencies An array of strings specifying the injectable dependencies for the
         * associated constructor.
         * @param {string} type The type of injector, used for injectables specifying a injectableType of
         * STATIC, SINGLETON, FACTORY, INSTANCE, or CLASS. The default is SINGLETON.
         */
        function Injector(name, Constructor, dependencies, type) {
            if (type === void 0) { type = null; }
            this.name = name;
            this.Constructor = Constructor;
            this.type = type;
            var deps = this.dependencies = Injector.convertDependencies(dependencies), index = deps.indexOf(__NOOP_INJECTOR), circularReference;
            Object.defineProperty(Constructor, '__injectorName', {
                value: name,
                enumerable: false,
                configurable: true,
                writable: true
            });
            Object.defineProperty(Constructor, '__injectorDependencies', {
                value: deps.slice(0),
                enumerable: false,
                configurable: true,
                writable: true
            });
            if (index > -1) {
                var dependency_2 = dependencies[index];
                if (isNull(dependency_2)) {
                    throw new TypeError('The dependency for ' +
                        name + ' at index ' +
                        index + ' is undefined, did you forget to include a file?');
                }
                throw new TypeError('Could not resolve dependency ' +
                    dependency_2.slice(9, dependency_2.indexOf('(')) +
                    ' for ' +
                    name +
                    '. Are you using a static injectable Type?');
            }
            circularReference = Injector.__findCircularReferences(this);
            if (isString(circularReference)) {
                throw new Error('Circular dependency detected from ' + this.name + ' to ' + circularReference + '.');
            }
            if (name === __AppStatic) {
                var App_1 = this.inject();
                this.dependencies = deps;
                App_1.start();
            }
        }
        /**
         */
        Injector.initialize = function () {
            var injectors = staticInjectors, keys = Object.keys(injectors), length = keys.length;
            for (var i = 0; i < length; ++i) {
                injectors[keys[i]].inject();
            }
            staticInjectors = {};
        };
        /**
         * @param {Array<any>} dependencies The array of dependencies specified
         * by either their Constructor or their registered name.
         */
        Injector.getDependencies = function (dependencies) {
            if (isNull(dependencies) || isEmpty(dependencies)) {
                return [];
            }
            var deps = [], length = dependencies.length;
            for (var i = 0; i < length; ++i) {
                deps.push(Injector.getDependency(dependencies[i]));
            }
            return deps;
        };
        /**
         * @param {any} dependency an object/string used to find the dependency.
         */
        Injector.getDependency = function (dependency) {
            if (isNull(dependency) || dependency === __NOOP_INJECTOR) {
                return Injector.__noop();
            }
            else if (Injector.isInjector(dependency)) {
                return dependency;
            }
            return Injector.__locateInjector(dependency);
        };
        /**
         * @param {Array<any>} dependencies The array of dependencies specified
         * by either their Constructor or their registered name.
         */
        Injector.convertDependencies = function (dependencies) {
            if (!isArray(dependencies)) {
                return [];
            }
            var convert = Injector.convertDependency, deps = [], length = dependencies.length;
            for (var i = 0; i < length; ++i) {
                deps.push(convert(dependencies[i]));
            }
            return deps;
        };
        /**
         * @param {any} dependency The dependency specified
         * by either a Constructor or a registered name.
         */
        Injector.convertDependency = function (dependency) {
            if (isNull(dependency)) {
                return __NOOP_INJECTOR;
            }
            return Injector.__getInjectorName(dependency);
        };
        /**
         * @param {dependency.Injector<any>} dependency The object to check.
         */
        Injector.isInjector = function (dependency) {
            return isFunction(dependency.inject) &&
                !isUndefined(dependency.type) &&
                !isUndefined(dependency.name) &&
                !isUndefined(dependency.Constructor);
        };
        /**
         * @param {any} dependency The object to search for.
         */
        Injector.__getInjectorName = function (dependency) {
            if (isNull(dependency)) {
                return __NOOP_INJECTOR;
            }
            else if (isString(dependency)) {
                return dependency;
            }
            var Constructor = dependency, _inject = isObject(Constructor._inject) ? Constructor._inject : {};
            if (isString(Constructor.__injectorName)) {
                dependency = Constructor.__injectorName;
            }
            if (!isString(dependency)) {
                return new Injector(dependency, Constructor, _inject.dependencies);
            }
            var find = Injector.__findInjector.bind(Injector, dependency), injector = find(injectableInjectors) ||
                find(unregisteredInjectors) ||
                find(staticInjectors) ||
                find(viewControlInjectors) ||
                find(controlInjectors) ||
                find(animationInjectors) ||
                find(jsAnimationInjectors);
            if (!isObject(injector) && isString(dependency)) {
                injector = unregisteredInjectors[dependency] = new Injector(dependency, Constructor, Constructor._inject.dependencies);
            }
            if (isObject(injector)) {
                return injector.name;
            }
            return __NOOP_INJECTOR;
        };
        /**
         * @param {any} Constructor The Constructor to call.
         * @param {Array<any>} args The arguments to pass to the constructor.
         */
        Injector.__construct = function (Constructor, args, type) {
            if (isNull(Constructor) || isNull(Constructor.prototype)) {
                return Constructor;
            }
            var obj = Object.create(Constructor.prototype), isInstance = type === __INSTANCE, toInject;
            if (isInstance) {
                toInject = instanceInjectorDependencies[Constructor.__injectorName];
            }
            if (!isObject(toInject)) {
                toInject = Injector.__walk(obj, Object.getPrototypeOf(obj), {});
                if (isInstance) {
                    instanceInjectorDependencies[Constructor.__injectorName] = toInject;
                }
            }
            var dependencies = acquire(map(function (value) { return value; }, toInject)), keys = Object.keys(toInject), length = keys.length;
            for (var i = 0; i < length; ++i) {
                obj[keys[i]] = dependencies[i];
            }
            var ret = obj.constructor.apply(obj, args);
            if (!isUndefined(ret)) {
                return ret;
            }
            return obj;
        };
        /**
         * @param {any} obj The object to walk.
         * @param {any} proto the prototype of the object.
         */
        Injector.__walk = function (obj, proto, extendWith) {
            var Constructor = proto.constructor, parentInject = {};
            if (isObject(Constructor._inject) && Constructor !== Object) {
                parentInject = Injector.__walk(obj, Object.getPrototypeOf(proto), extendWith);
            }
            var toInject = _clone(Constructor._inject, true);
            return _extend(false, false, {}, extendWith, parentInject, toInject);
        };
        /**
         * @param {any} Constructor The Constructor to locate.
         */
        Injector.__locateInjector = function (Constructor) {
            if (isNull(Constructor)) {
                return;
            }
            var dependency = Constructor;
            if (isString(Constructor.__injectorName)) {
                dependency = Constructor.__injectorName;
            }
            var find = Injector.__findInjector.bind(Injector, dependency), injector = find(injectableInjectors) ||
                find(unregisteredInjectors) ||
                find(staticInjectors) ||
                find(controlInjectors) ||
                find(viewControlInjectors) ||
                find(animationInjectors) ||
                find(jsAnimationInjectors);
            if (!isObject(injector)) {
                if (isFunction(Constructor)) {
                    if (!isString(dependency)) {
                        dependency = uniqueId(__Plat);
                    }
                    injector = new Injector(dependency, Constructor, isObject(Constructor._inject) ? Constructor._injectorDependencies : []);
                    unregisteredInjectors[dependency] = injector;
                }
                else {
                    injector = Injector.__wrap(Constructor);
                }
            }
            return injector;
        };
        /**
         * @param {Function} Constructor The Function
         */
        Injector.__findInjector = function (Constructor, injectors) {
            if (isNull(Constructor)) {
                return;
            }
            else if (Constructor === Injector || Constructor === __InjectorStatic) {
                var ret = Injector.__wrap(Injector);
                ret.name = __InjectorStatic;
                return ret;
            }
            else if (isString(Constructor)) {
                return injectors[Constructor] || injectors[Constructor.toLowerCase()];
            }
        };
        /**
         * @param {any} value The injected value.
         */
        Injector.__wrap = function (value) {
            return {
                inject: function () { return value; },
                name: __WRAPPED_INJECTOR,
                dependencies: [],
                Constructor: value
            };
        };
        /**
         */
        Injector.__noop = function () {
            return {
                inject: noop,
                type: __NOOP_INJECTOR,
                name: __NOOP_INJECTOR,
                dependencies: [],
                Constructor: noop
            };
        };
        /**
         * @param {dependency.Injector<any>} injector The starting point for the dependency tree search.
         */
        Injector.__findCircularReferences = function (injector) {
            if (!(isObject(injector) && isArray(injector.dependencies))) {
                return;
            }
            var source = injector.name, dependencies = injector.dependencies, node, stack = [{
                    name: source,
                    dependencies: dependencies.slice(0)
                }], dependency, locate = Injector.__locateInjector, length;
            while (stack.length > 0) {
                node = stack.pop();
                dependencies = node.dependencies;
                length = dependencies.length;
                for (var i = 0; i < length; ++i) {
                    dependency = dependencies[i];
                    if (dependency === source) {
                        return node.name;
                    }
                    injector = locate(dependency);
                    if (!(isObject(injector) && isArray(injector.dependencies))) {
                        continue;
                    }
                    stack.push({
                        name: injector.name,
                        dependencies: injector.dependencies.slice(0)
                    });
                }
            }
        };
        /**
         */
        Injector.prototype.inject = function () {
            var toInject = [], type = this.type;
            var dependencies = this.dependencies, length = dependencies.length, dependency, injectable;
            for (var i = 0; i < length; ++i) {
                dependency = Injector.getDependency(dependencies[i]);
                toInject.push(dependency.inject());
            }
            injectable = Injector.__construct(this.Constructor, toInject, type);
            if (isString(type) && type !== __INSTANCE) {
                this._wrapInjector(injectable);
            }
            injectable.__injectable__type = type;
            return injectable;
        };
        /**
         * @param {any} value The value to wrap
         */
        Injector.prototype._wrapInjector = function (value) {
            this.inject = function () {
                return value;
            };
            return this;
        };
        return Injector;
    })();
    dependency_1.Injector = Injector;
    /**
     */
    var injectors;
    (function (injectors) {
        /**
         */
        injectors.control = controlInjectors;
        /**
         */
        injectors.viewControl = viewControlInjectors;
        /**
         */
        injectors.injectable = injectableInjectors;
        /**
         */
        injectors.staticInjectable = staticInjectors;
        /**
         */
        injectors.animation = animationInjectors;
        /**
         */
        injectors.jsAnimation = jsAnimationInjectors;
    })(injectors = dependency_1.injectors || (dependency_1.injectors = {}));
})(dependency = exports.dependency || (exports.dependency = {}));
function acquire(dependencies) {
    var deps, array = isArray(dependencies);
    if (array) {
        deps = dependency.Injector.getDependencies(dependencies);
    }
    else {
        deps = dependency.Injector.getDependencies([dependencies]);
    }
    var length = deps.length, output = [];
    for (var i = 0; i < length; ++i) {
        output.push(deps[i].inject());
    }
    if (!array) {
        return output[0];
    }
    return output;
}
exports.acquire = acquire;
/**
 */
var debug;
(function (debug) {
    /**
     */
    var Log = (function () {
        function Log() {
            /**
             */
            this.ERROR = 5;
            /**
             */
            this.WARN = 4;
            /**
             */
            this.INFO = 3;
            /**
             */
            this.DEBUG = 2;
            /**
             */
            this.TRACE = 1;
            /**
             */
            this._level = this.INFO;
        }
        /**
         * @param {Error} error The error to log.
         */
        Log.prototype.error = function (error) {
            this._log(error, this.ERROR);
            throw error;
        };
        Log.prototype.warn = function (message) {
            this._log(message, this.WARN);
        };
        Log.prototype.info = function (message) {
            this._log(message, this.INFO);
        };
        Log.prototype.debug = function (message) {
            this._log(message, this.DEBUG);
        };
        Log.prototype.trace = function (message) {
            this._log(message, this.TRACE);
        };
        Log.prototype.setLogLevel = function (level) {
            if (isString(level)) {
                level = this[level.toUpperCase()];
            }
            switch (level) {
                case this.ERROR:
                case this.WARN:
                case this.INFO:
                case this.DEBUG:
                case this.TRACE:
                    this._level = level;
                    break;
                default:
                    this._level = this.INFO;
            }
        };
        Log.prototype._log = function (message, level) {
            if (!this._shouldLog(level)) {
                return;
            }
            if (isString(message)) {
                message = new Error(message);
            }
            var _ErrorEvent = this._ErrorEvent;
            if (isNull(_ErrorEvent)) {
                _ErrorEvent = this._ErrorEvent = acquire(__ErrorEventStatic);
            }
            _ErrorEvent.dispatch(__error, Log, message, level);
        };
        /**
         * @param {number} level The log level to check against the current minimum log level.
         */
        Log.prototype._shouldLog = function (level) {
            if (!isNumber(level)) {
                level = this.INFO;
            }
            return this._level < level;
        };
        return Log;
    })();
    debug.Log = Log;
    register.injectable(__Log, Log);
})(debug = exports.debug || (exports.debug = {}));
/**
 */
var Compat = (function () {
    /**
     */
    function Compat() {
        /**
         */
        this.__events = {};
        this.__defineBooleans();
        this.__defineMappedEvents();
        this.__defineVendorDependencies();
        this.__determineCss();
    }
    /**
     * @param {string} event The event to check the existence of.
     */
    Compat.prototype.hasEvent = function (event) {
        var events = this.__events, eventExists = events[event];
        if (isUndefined(eventExists)) {
            var element = this._document.createElement('div');
            if (event === 'input' && this.IE === 9) {
                eventExists = events[event] = false;
            }
            else {
                eventExists = events[event] = !isUndefined(element[('on' + event)]);
            }
        }
        return eventExists;
    };
    /**
     */
    Compat.prototype.__defineBooleans = function () {
        var _window = this._window, navigator = _window.navigator || {}, userAgent = (navigator.userAgent || '').toLowerCase(), history = this._history, def = _window.define, msA = _window.MSApp, winJs = _window.WinJS, android = (/android ((?:\d|\.)+)/.exec(userAgent) || [])[1];
        if (isString(android) && !/iemobile/i.test(userAgent)) {
            android = parseInt(android.replace(/\./g, ''), 10);
        }
        this.isCompatible = isFunction(Object.defineProperty) && isFunction(this._document.querySelector);
        this.cordova = !isNull(_window.cordova);
        this.pushState = !(isNull(history) || isNull(history.pushState));
        this.fileSupported = !(isUndefined(_window.File) || isUndefined(_window.FormData));
        this.amd = isFunction(def) && !isNull(def.amd);
        this.msApp = isObject(msA) && isFunction(msA.execUnsafeLocalFunction);
        this.winJs = isObject(winJs) && isObject(winJs.Application);
        this.indexedDb = !isNull(_window.indexedDB);
        this.proto = isObject({}.__proto__);
        this.getProto = isFunction(Object.getPrototypeOf);
        this.setProto = isFunction(Object.setPrototypeOf);
        this.hasTouchEvents = !isUndefined(_window.ontouchstart);
        this.hasPointerEvents = !!navigator.pointerEnabled;
        this.hasMsPointerEvents = !!navigator.msPointerEnabled;
        if (isNumber(android)) {
            this.ANDROID = android;
            return;
        }
        var ie = parseInt((/msie (\d+)/.exec(userAgent) || [])[1], 10) ||
            parseInt((/trident\/.*; rv:(\d+)/.exec(userAgent) || [])[1], 10);
        if (isNumber(ie)) {
            this.IE = ie;
        }
    };
    /**
     */
    Compat.prototype.__defineMappedEvents = function () {
        if (this.hasPointerEvents) {
            this.mappedEvents = {
                $touchstart: 'pointerdown',
                $touchend: 'pointerup',
                $touchmove: 'pointermove',
                $touchcancel: 'pointercancel'
            };
        }
        else if (this.hasMsPointerEvents) {
            this.mappedEvents = {
                $touchstart: 'MSPointerDown',
                $touchend: 'MSPointerUp',
                $touchmove: 'MSPointerMove',
                $touchcancel: 'MSPointerCancel'
            };
        }
        else if (this.hasTouchEvents) {
            this.mappedEvents = {
                $touchstart: 'touchstart',
                $touchend: 'touchend',
                $touchmove: 'touchmove',
                $touchcancel: 'touchcancel'
            };
        }
        else {
            this.mappedEvents = {
                $touchstart: 'mousedown',
                $touchend: 'mouseup',
                $touchmove: 'mousemove',
                $touchcancel: null
            };
        }
    };
    /**
     */
    Compat.prototype.__defineVendorDependencies = function () {
        var _window = this._window, documentElement = this._document.documentElement, styles = _window.getComputedStyle(documentElement, ''), matches = Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/), prefix, dom, css, jsSyntax;
        if ((isArray(matches) && matches.length > 1)) {
            prefix = (isArray(matches) && matches.length > 1) ? matches[1] : '';
            jsSyntax = prefix[0].toUpperCase() + prefix.slice(1);
            dom = ('WebKit|Moz|MS').match(new RegExp('(' + prefix + ')', 'i'))[1];
            css = '-' + prefix + '-';
        }
        else if (!isUndefined(styles.OLink)) {
            prefix = 'o';
            jsSyntax = dom = 'O';
            css = '-o-';
        }
        else {
            prefix = jsSyntax = dom = css = '';
        }
        this.vendorPrefix = {
            dom: dom,
            lowerCase: prefix,
            css: css,
            upperCase: jsSyntax
        };
        this.requestAnimationFrame = _window.requestAnimationFrame || _window[prefix + 'RequestAnimationFrame'];
        this.cancelAnimationFrame = _window.cancelAnimationFrame ||
            _window[prefix + 'CancelRequestAnimationFrame'] ||
            _window[prefix + 'CancelAnimationFrame'];
        var style = documentElement.style;
        // handle Android issue where style.transition exists but transition events still need vendor prefix 
        // should only affect version 4.1 but we will handle for < 4.4. 
        if ((isUndefined(this.ANDROID) || Math.floor(this.ANDROID / 10) >= 44) &&
            !(isUndefined(style.animation) || isUndefined(style.transition))) {
            this.animationSupported = true;
            this.animationEvents = {
                $animation: 'animation',
                $animationStart: 'animationstart',
                $animationEnd: 'animationend',
                $animationIteration: 'animationiteration',
                $transition: 'transition',
                $transitionStart: 'transitionstart',
                $transitionEnd: 'transitionend'
            };
        }
        else if (!(isUndefined(style[jsSyntax + 'Animation']) || isUndefined(style[jsSyntax + 'Transition'])) ||
            !(isUndefined(style[prefix + 'Animation']) || isUndefined(style[prefix + 'Transition'])) ||
            !(isUndefined(style[dom + 'Animation']) || isUndefined(style[dom + 'Transition']))) {
            this.animationSupported = true;
            this.animationEvents = {
                $animation: prefix + 'Animation',
                $animationStart: prefix + 'AnimationStart',
                $animationEnd: prefix + 'AnimationEnd',
                $animationIteration: prefix + 'AnimationIteration',
                $transition: prefix + 'Transition',
                $transitionStart: prefix + 'TransitionStart',
                $transitionEnd: prefix + 'TransitionEnd'
            };
        }
    };
    /**
     */
    Compat.prototype.__determineCss = function () {
        var _document = this._document, head = _document.head, element = _document.createElement('div');
        element.setAttribute(__Hide, '');
        head.insertBefore(element, null);
        var computedStyle = this._window.getComputedStyle(element), display = computedStyle.display, visibility = computedStyle.visibility;
        this.platCss = display === 'none' || visibility === 'hidden';
        head.removeChild(element);
    };
    Compat._inject = {
        _window: __Window,
        _history: __History,
        _document: __Document
    };
    return Compat;
})();
exports.Compat = Compat;
register.injectable(__Compat, Compat);
/**
 */
var Utils = (function () {
    function Utils() {
    }
    /**
     */
    Utils.prototype.noop = function () { };
    /**
     * @param {any} destination The destination object to extend.
     * @param {Array<any>} ...sources Any number of objects with which to extend the
     * destination object.
     */
    Utils.prototype.extend = function (destination) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        return _extend.apply(null, [false, false, destination].concat(sources));
    };
    /**
     * @param {any} destination The destination object to extend.
     * @param {Array<any>} ...sources Any number of objects with which to extend the
     * destination object.
     */
    Utils.prototype.deepExtend = function (destination) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        return _extend.apply(null, [true, false, destination].concat(sources));
    };
    /**
     * @param {T} obj The object to clone.
     * @param {boolean} deep? Whether or not it is a deep clone.
     */
    Utils.prototype.clone = function (obj, deep) {
        return _clone(obj, deep);
    };
    /**
     * @param {any} obj Anything.
     */
    Utils.prototype.isObject = function (obj) {
        return isObject(obj);
    };
    /**
     * @param {any} obj Anything.
     */
    Utils.prototype.isWindow = function (obj) {
        return isWindow(obj);
    };
    /**
     * @param {any} obj Anything.
     */
    Utils.prototype.isDocument = function (obj) {
        return isDocument(obj);
    };
    /**
     * @param {any} obj Anything.
     */
    Utils.prototype.isNode = function (obj) {
        return isNode(obj);
    };
    /**
     * @param {any} obj Anything.
     */
    Utils.prototype.isDocumentFragment = function (obj) {
        return isDocumentFragment(obj);
    };
    /**
     * @param {any} obj Anything.
     */
    Utils.prototype.isString = function (obj) {
        return isString(obj);
    };
    /**
     * @param {any} obj Anything.
     */
    Utils.prototype.isRegExp = function (obj) {
        return isRegExp(obj);
    };
    /**
     * @param {any} obj Anything.
     */
    Utils.prototype.isPromise = function (obj) {
        return isPromise(obj);
    };
    /**
     * @param {any} obj Anything.
     */
    Utils.prototype.isEmpty = function (obj) {
        return isEmpty(obj);
    };
    /**
     * @param {any} obj Anything.
     */
    Utils.prototype.isBoolean = function (obj) {
        return isBoolean(obj);
    };
    /**
     * @param {any} obj Anything.
     */
    Utils.prototype.isNumber = function (obj) {
        return isNumber(obj);
    };
    /**
     * @param {any} obj Anything.
     */
    Utils.prototype.isFile = function (obj) {
        return isFile(obj);
    };
    /**
     * @param {any} obj Anything.
     */
    Utils.prototype.isFunction = function (obj) {
        return isFunction(obj);
    };
    /**
     * @param {any} obj Anything.
     */
    Utils.prototype.isNull = function (obj) {
        return isNull(obj);
    };
    /**
     * @param {any} obj Anything.
     */
    Utils.prototype.isUndefined = function (obj) {
        return isUndefined(obj);
    };
    /**
     * @param {any} obj Anything.
     */
    Utils.prototype.isArray = function (obj) {
        return isArray(obj);
    };
    /**
     * @param {any} obj Anything.
     */
    Utils.prototype.isArrayLike = function (obj) {
        return isArrayLike(obj);
    };
    /**
     * @param {any} obj Anything.
     */
    Utils.prototype.isDate = function (obj) {
        return isDate(obj);
    };
    Utils.prototype.filter = function (iterator, obj, context) {
        return filter(iterator, obj, context);
    };
    /**
     * @param {Object} properties An object containing key/value pairs to match with obj's values.
     * @param {Array<T>} array The list used for searching for properties.
     */
    Utils.prototype.where = function (properties, array) {
        return where(properties, array);
    };
    Utils.prototype.forEach = function (iterator, obj, context) {
        return forEach(iterator, obj, context);
    };
    Utils.prototype.map = function (iterator, obj, context) {
        return map(iterator, obj, context);
    };
    Utils.prototype.mapAsync = function (iterator, obj, context) {
        return mapAsync(iterator, obj, context);
    };
    /**
     * @param {IListIterator<T, async.IThenable<R>>} iterator The transformation function.
     * @param {Array<T>} array An Array.
     * @param {any} context? An optional context to bind to the iterator.
     */
    Utils.prototype.mapAsyncInOrder = function (iterator, array, context) {
        return mapAsyncInOrder(iterator, array, context);
    };
    /**
     * @param {IListIterator<T, async.IThenable<R>>} iterator The transformation function.
     * @param {Array<T>} array An Array.
     * @param {any} context? An optional context to bind to the iterator.
     */
    Utils.prototype.mapAsyncInDescendingOrder = function (iterator, array, context) {
        return mapAsyncInDescendingOrder(iterator, array, context);
    };
    /**
     * @param {string} key The property to 'pluck' from each value in the array.
     * @param {Array<T>} array The array to pluck the key from
     */
    Utils.prototype.pluck = function (key, array) {
        return pluck(key, array);
    };
    Utils.prototype.some = function (iterator, obj, context) {
        return some(iterator, obj, context);
    };
    /**
     * @param {(...args: Array<any>) => void} method The method to call.
     * @param {Array<any>} args? The arguments to apply to the method.
     * @param {any} context? An optional context to bind to the method.
     */
    Utils.prototype.postpone = function (method, args, context) {
        return defer(method, 0, args, context);
    };
    /**
     * @param {(...args: Array<any>) => void} method The method to call.
     * @param {number} timeout The time (in milliseconds) to delay before calling the provided method.
     * @param {Array<any>} args? The arguments to apply to the method.
     * @param {any} context? An optional context to bind to the method.
     */
    Utils.prototype.defer = function (method, timeout, args, context) {
        return defer(method, timeout, args, context);
    };
    /**
     * @param {(...args: Array<any>) => void} method The method to call.
     * @param {number} interval The time (in milliseconds) between each consecutive call of the provided method.
     * @param {Array<any>} args? The arguments to apply to the method.
     * @param {any} context? An optional context to bind to the method.
     */
    Utils.prototype.setInterval = function (method, interval, args, context) {
        return setIntervalGlobal(method, interval, args, context);
    };
    /**
     * @param {FrameRequestCallback} method The method to call when the request is fulfilled.
     * @param {any} context? An optional context to bind to the method.
     */
    Utils.prototype.requestAnimationFrame = function (method, context) {
        return requestAnimationFrameGlobal(method, context);
    };
    /**
     * @param {string} prefix? A string prefix to prepend tothe unique ID.
     */
    Utils.prototype.uniqueId = function (prefix) {
        return uniqueId(prefix);
    };
    /**
     * @param {string} str The spinal-case, dot.case, or snake_case string.
     */
    Utils.prototype.camelCase = function (str) {
        return camelCase(str);
    };
    /**
     * @param {string} str The camelCased string.
     * @param {string} delimiter The delimiter to add.
     */
    Utils.prototype.delimit = function (str, delimiter) {
        return delimit(str, delimiter);
    };
    return Utils;
})();
exports.Utils = Utils;
register.injectable(__Utils, Utils);
/**
 */
function Window() {
    return window;
}
exports.Window = Window;
register.injectable(__Window, Window);
/**
 */
function Document(_window) {
    return _window.document;
}
exports.Document = Document;
register.injectable(__Document, Document, [__Window]);
/**
 */
var expressions;
(function (expressions) {
    /**
     */
    var Regex = (function () {
        function Regex() {
            /**
             */
            this.markupRegex = new RegExp(__startSymbol + '[\\S\\s]*' + __endSymbol);
            /**
             */
            this.argumentRegex = /\((.*)\)/;
            /**
             * Finds '/*.html' or '/*.htm' in a url. Useful for removing
             */
            this.initialUrlRegex = /\/[^\/]*\.(?:html|htm)/;
            /**
             */
            this.protocolRegex = /:\/\//;
            /**
             */
            this.invalidVariableRegex = /[^a-zA-Z0-9@_$]/;
            /**
             */
            this.fileNameRegex = /.*(?:\/|\\)/;
            /**
             */
            this.shiftedKeyRegex = /[A-Z!@#$%^&*()_+}{":?><|~]/;
            /**
             */
            this.fullUrlRegex = /^(?:[a-z0-9\-]+:)(?:\/\/)?|(?:\/\/)/i;
            /**
             */
            this.validateEmail = new RegExp('^(([^<>()[\\]\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\.,;:\\s@\\"]+)*)|' +
                '(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|' +
                '(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
            /**
             */
            this.validateTelephone = /^\+?[0-9\.\(\)\s-]*$/;
            /**
             */
            this.dynamicSegmentsRegex = /^:([^\/]+)$/;
            /**
             */
            this.splatSegmentRegex = /^\*([^\/]+)$/;
        }
        Object.defineProperty(Regex.prototype, "newLineRegex", {
            /**
             */
            get: function () {
                return /\r|\n/g;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Regex.prototype, "optionalRouteRegex", {
            /**
             */
            get: function () {
                return /\((.*?)\)/g;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Regex.prototype, "namedParameterRouteRegex", {
            /**
             */
            get: function () {
                return /(\(\?)?:\w+/g;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Regex.prototype, "wildcardRouteRegex", {
            /**
             * exec('/foo/*bar/baz');
             */
            get: function () {
                return /\*\w*/g;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Regex.prototype, "escapeRouteRegex", {
            /**
             */
            get: function () {
                return /[\-{}\[\]+?.,\\\^$|#\s]/g;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Regex.prototype, "camelCaseRegex", {
            /**
             */
            get: function () {
                return /([\-_\.\s])(\w+?)/g;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Regex.prototype, "capitalCaseRegex", {
            /**
             */
            get: function () {
                return /[A-Z]/g;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Regex.prototype, "whiteSpaceRegex", {
            /**
             */
            get: function () {
                return /("[^"]*?"|'[^']*?')|[\s\r\n\t\v]/g;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Regex.prototype, "quotationRegex", {
            /**
             */
            get: function () {
                return /'|"/g;
            },
            enumerable: true,
            configurable: true
        });
        return Regex;
    })();
    expressions.Regex = Regex;
    register.injectable(__Regex, Regex);
    /**
     */
    var Tokenizer = (function () {
        function Tokenizer() {
            /**
             */
            this.__previousChar = '';
            /**
             */
            this.__variableRegex = acquire(__Regex).invalidVariableRegex;
            /**
             */
            this.__outputQueue = [];
            /**
             */
            this.__operatorStack = [];
            /**
             */
            this.__argCount = [];
            /**
             */
            this.__objArgCount = [];
            /**
             */
            this.__lastColonChar = [];
            /**
             */
            this.__lastCommaChar = [];
        }
        /**
         * @param {string} input The JavaScript expression string to tokenize.
         */
        Tokenizer.prototype.createTokens = function (input) {
            if (isNull(input)) {
                return [];
            }
            this._input = input;
            var char, length = input.length, ternary = 0, ternaryFound = false, isSpace = this._isSpace, isAlphaNumeric = this._isAlphaNumeric;
            for (var index = 0; index < length; index++) {
                char = input[index];
                // space 
                if (isSpace(char)) {
                    continue;
                }
                else if (isAlphaNumeric(char)) {
                    index = this.__handleAplhaNumeric(index, char);
                }
                else if (isDelimiter(char)) {
                    switch (char) {
                        case '.':
                            index = this.__handlePeriod(index, char);
                            break;
                        case '{':
                            this.__handleLeftBrace(char);
                            break;
                        case '}':
                            this.__handleRightBrace(char);
                            break;
                        case '[':
                            this.__handleLeftBracket(char);
                            break;
                        case ']':
                            this.__handleRightBracket(char);
                            break;
                        case '(':
                            this.__handleLeftParenthesis(char);
                            break;
                        case ')':
                            this.__handleRightParenthesis(char);
                            break;
                        case ',':
                            this.__handleComma(char);
                            break;
                        case '\'':
                        case '"':
                            index = this.__handleStringLiteral(index, char);
                            break;
                    }
                }
                else if (isOperator(char)) {
                    switch (char) {
                        case '?':
                            ternaryFound = true;
                            ternary++;
                            this.__handleQuestion(char);
                            break;
                        case ':':
                            ternary = this.__handleColon(char, ternary);
                            break;
                        default:
                            index = this.__handleOtherOperator(index, char);
                    }
                }
                else if (char === ';') {
                    this._throwError('Unexpected semicolon');
                    return [];
                }
                this.__previousChar = char;
            }
            if (ternaryFound && (ternary > 0)) {
                this._throwError('Improper ternary expression');
                return [];
            }
            else if (this.__objArgCount.length > 0) {
                this._throwError('Improper object literal');
                return [];
            }
            this.__popRemainingOperators();
            var output = this.__outputQueue;
            this._resetTokenizer();
            return output;
        };
        /**
         * @param {string} char The character to check.
         * @param {boolean} isNumberLike Whether or not the character resembles a number.
         */
        Tokenizer.prototype._checkType = function (char, isNumberLike) {
            if (isNumberLike) {
                return this._isNumeric(char);
            }
            return this._isAlphaNumeric(char);
        };
        /**
         * @param {string} char The current character in the expression string.
         * @param {number} index The current index in the expression string.
         * @param {boolean} isNumberLike Whether or not the character resembles a number.
         */
        Tokenizer.prototype._lookAhead = function (char, index, isNumberLike) {
            var ch, input = this._input, maxLength = input.length;
            while (++index < maxLength) {
                ch = input[index];
                if (this._checkType(ch, isNumberLike)) {
                    char += ch;
                }
                else {
                    break;
                }
            }
            return char;
        };
        /**
         * @param {string} char The operator to find.
         * @param {number} index The current index in the expression string.
         */
        Tokenizer.prototype._lookAheadForOperatorFn = function (char, index) {
            var ch, fn = char, input = this._input, maxLength = input.length;
            while (++index < maxLength) {
                ch = input[index];
                fn += ch;
                if (isOperator(fn)) {
                    char = fn;
                }
                else {
                    break;
                }
            }
            return char;
        };
        /**
         * @param {string} endChar The ending character.
         * @param {number} index The current index in the expression string.
         */
        Tokenizer.prototype._lookAheadForDelimiter = function (endChar, index) {
            var char = '', ch, input = this._input, maxLength = input.length;
            while ((++index < maxLength) && (ch = input[index]) !== endChar) {
                char += ch;
            }
            return char;
        };
        /**
         * @param {expressions.IToken} topOperator The top of the operator stack.
         * @param {string} char The operator value being searched for.
         * @param {string} error The error to throw in the case that the expression
         * is invalid.
         */
        Tokenizer.prototype._popStackForVal = function (topOperator, char, error) {
            var outputQueue = this.__outputQueue, operatorStack = this.__operatorStack;
            while (topOperator.val !== char) {
                outputQueue.push(operatorStack.shift());
                topOperator = operatorStack[0];
                if (operatorStack.length === 0) {
                    return this._throwError(error);
                }
            }
        };
        /**
         * @param {expressions.IToken} obj The IToken
         * with the "val" property to compare.
         * @param {string} char The char to compare with.
         */
        Tokenizer.prototype._isValEqual = function (obj, char) {
            if (isNull(obj) || isNull(obj.val)) {
                return isNull(char);
            }
            else if (obj.val === '') {
                return char === '';
            }
            return char.indexOf(obj.val) !== -1;
        };
        /**
         * @param {expressions.IToken} obj The IToken
         * with the "val" property to compare.
         * @param {string} char The char to compare with.
         */
        Tokenizer.prototype._isValUnequal = function (obj, char) {
            if (isNull(obj) || isNull(obj.val)) {
                return !isNull(char);
            }
            else if (obj.val === '') {
                return char !== '';
            }
            return char.indexOf(obj.val) === -1;
        };
        /**
         */
        Tokenizer.prototype._resetTokenizer = function () {
            this._input = null;
            this.__previousChar = '';
            this.__outputQueue = [];
            this.__operatorStack = [];
            this.__argCount = [];
            this.__objArgCount = [];
            this.__lastColonChar = [];
            this.__lastCommaChar = [];
        };
        /**
         * @param {string} error The error message to throw.
         */
        Tokenizer.prototype._throwError = function (error) {
            this._log.error(new Error(error + ' in ' + this._input));
        };
        /**
         * @param {string} char The character to check.
         */
        Tokenizer.prototype._isNumeric = function (char) {
            return ('0' <= char && char <= '9');
        };
        /**
         * @param {string} char The character to check.
         */
        Tokenizer.prototype._isSpace = function (char) {
            return (char === ' ' ||
                char === '\r' ||
                char === '\n' ||
                char === '\t' ||
                char === '\v' ||
                char === '\u00A0');
        };
        /**
         * @param {string} char The character to check.
         */
        Tokenizer.prototype._isAlphaNumeric = function (char) {
            return ('a' <= char && char <= 'z' ||
                'A' <= char && char <= 'Z' ||
                '0' <= char && char <= '9' ||
                '@' === char ||
                '_' === char ||
                '$' === char);
        };
        /**
         * @param {string} input The string to check.
         */
        Tokenizer.prototype._isStringValidVariable = function (input) {
            return !this.__variableRegex.test(input);
        };
        /**
         * @param {number} index The current index in the string being tokenized.
         * @param {string} char The current char.
         */
        Tokenizer.prototype.__handleAplhaNumeric = function (index, char) {
            var isNumberLike = this._isNumeric(char), lookAhead = this._lookAhead(char, index, isNumberLike);
            this.__outputQueue.push(isNumberLike ? ({ val: Number(lookAhead), args: 0 }) :
                ({ val: lookAhead, args: -1 }));
            return index + lookAhead.length - 1;
        };
        /**
         * @param {number} index The current index in the string being tokenized.
         * @param {string} char The current char.
         */
        Tokenizer.prototype.__handlePeriod = function (index, char) {
            var outputQueue = this.__outputQueue, operatorStack = this.__operatorStack, topOutputLength = outputQueue.length - 1, previousChar = this.__previousChar, lookAhead;
            // if output queue is null OR space or operator or ( or , before . 
            if (topOutputLength < 0 ||
                this._isSpace(previousChar) ||
                !isNull(OPERATORS[previousChar]) ||
                previousChar === '(' ||
                previousChar === ',') {
                lookAhead = this._lookAhead(char, index, true);
                index += lookAhead.length - 1;
                outputQueue.push({ val: parseFloat(lookAhead), args: 0 });
            }
            else if (this._isValEqual(operatorStack[0], char)) {
                outputQueue.push({ val: char, args: 0 });
            }
            else if (!(isNull(outputQueue[topOutputLength]) ||
                !isNumber(Number(outputQueue[topOutputLength].val)) ||
                this._isValEqual(outputQueue[topOutputLength - 1], char))) {
                lookAhead = this._lookAhead(char, index, true);
                index += lookAhead.length - 1;
                outputQueue[topOutputLength].val += parseFloat(lookAhead);
            }
            else {
                operatorStack.unshift({ val: char, args: 0 });
            }
            return index;
        };
        /**
         * @param {string} char The current char.
         */
        Tokenizer.prototype.__handleLeftBrace = function (char) {
            this.__operatorStack.unshift({ val: char, args: 0 });
            this.__objArgCount.push(0);
            this.__lastColonChar.push(char);
            this.__lastCommaChar.push(char);
        };
        /**
         * @param {string} char The current char.
         */
        Tokenizer.prototype.__handleRightBrace = function (char) {
            var operatorStack = this.__operatorStack, topOperator = operatorStack[0], lastArgCount = this.__objArgCount.pop();
            if (isNull(topOperator)) {
                return this._throwError('Improper object literal');
            }
            this._popStackForVal(topOperator, '{', 'Improper object literal');
            // pop left brace off stack 
            operatorStack.shift();
            this.__lastColonChar.pop();
            this.__lastCommaChar.pop();
            this.__outputQueue.push({ val: '{}', args: lastArgCount });
        };
        /**
         * @param {string} char The current char.
         */
        Tokenizer.prototype.__handleLeftBracket = function (char) {
            var previousChar = this.__previousChar, operatorStack = this.__operatorStack;
            if (this._isValEqual(operatorStack[0], '.')) {
                this.__outputQueue.push(operatorStack.shift());
            }
            operatorStack.unshift({ val: char, args: 0 });
            this.__argCount.push({
                num: 0,
                isArray: !(previousChar === ']' ||
                    previousChar === ')' ||
                    this._isAlphaNumeric(previousChar))
            });
            this.__lastCommaChar.push(char);
        };
        /**
         * @param {string} char The current char.
         */
        Tokenizer.prototype.__handleRightBracket = function (char) {
            var operatorStack = this.__operatorStack, topOperator = operatorStack[0], lastArgCountObj = this.__argCount.pop();
            if (isNull(topOperator) || isNull(lastArgCountObj)) {
                return this._throwError('Brackets mismatch');
            }
            if (!lastArgCountObj.isArray) {
                lastArgCountObj.num--;
            }
            this._popStackForVal(topOperator, '[', 'Brackets mismatch');
            // pop left bracket off stack 
            operatorStack.shift();
            this.__lastCommaChar.pop();
            // check if function on top of stack 
            this.__outputQueue.push({
                val: '[]',
                args: (this.__previousChar === '[') ? -1 : lastArgCountObj.num + 1
            });
        };
        /**
         * @param {string} char The current char.
         */
        Tokenizer.prototype.__handleLeftParenthesis = function (char) {
            var previousChar = this.__previousChar, operatorStack = this.__operatorStack, args;
            if (this._isAlphaNumeric(previousChar) || previousChar === ']' || previousChar === ')') {
                var outputQueue = this.__outputQueue, topOutput = outputQueue[outputQueue.length - 1], val = isNull(topOutput) ? undefined : topOutput.val;
                if (val === '[]') {
                    operatorStack.unshift(outputQueue.pop());
                    operatorStack.unshift(outputQueue.pop());
                }
                else if (!(val === '()' || this._isNumeric(val))) {
                    operatorStack.unshift(outputQueue.pop());
                }
                args = 0;
            }
            else {
                args = -1;
            }
            this.__argCount.push({ num: args });
            operatorStack.unshift({ val: char, args: args });
            this.__lastCommaChar.push(char);
        };
        /**
         * @param {string} char The current char.
         */
        Tokenizer.prototype.__handleRightParenthesis = function (char) {
            var operatorStack = this.__operatorStack, topOperator = operatorStack[0], localArgCountObj = this.__argCount.pop();
            if (isNull(topOperator)) {
                return this._throwError('Parentheses mismatch');
            }
            this._popStackForVal(topOperator, '(', 'Parentheses mismatch');
            // pop left parenthesis off stack 
            operatorStack.shift();
            this.__lastCommaChar.pop();
            // check if function on top of stack 
            if (!isNull(localArgCountObj) && localArgCountObj.num >= 0) {
                var localArgNum = localArgCountObj.num;
                if (this.__previousChar === '(') {
                    if (this.__removeFnFromStack(localArgNum)) {
                        this.__outputQueue.push({
                            val: '()',
                            args: 0
                        });
                    }
                }
                else if (this.__removeFnFromStack(localArgNum + 1)) {
                    this.__outputQueue.push({
                        val: '()',
                        args: (localArgNum + 1)
                    });
                }
            }
        };
        /**
         * @param {string} char The current char.
         */
        Tokenizer.prototype.__handleComma = function (char) {
            var lastCommaArray = this.__lastCommaChar, lastCommaArg = lastCommaArray[lastCommaArray.length - 1];
            if (lastCommaArg === '(' || lastCommaArg === '[') {
                var argCountArray = this.__argCount, length_2 = argCountArray.length;
                if (length_2 > 0) {
                    // increment deepest fn count (don't need to increment obj count because we increment with colon) 
                    argCountArray[length_2 - 1].num++;
                }
                else {
                    return this._throwError('Mismatch with ' + lastCommaArg);
                }
            }
            var topOperator = this.__operatorStack[0];
            if (isNull(topOperator)) {
                return this._throwError('Unexpected comma');
            }
            this._popStackForVal(topOperator, lastCommaArg, 'Unexpected comma');
        };
        /**
         * @param {number} index The current index in the string being tokenized.
         * @param {string} char The current char.
         */
        Tokenizer.prototype.__handleStringLiteral = function (index, char) {
            var lookAhead = this._lookAheadForDelimiter(char, index), operatorStack = this.__operatorStack, topOperator = operatorStack[0];
            if (!isNull(topOperator) && (topOperator.val === '[' || (topOperator.val === '(' && topOperator.args >= 0))) {
                operatorStack.unshift({ val: lookAhead, args: 0 });
            }
            else {
                this.__outputQueue.push({ val: lookAhead, args: 0 });
            }
            return index + lookAhead.length + 1;
        };
        /**
         * @param {string} char The current char.
         */
        Tokenizer.prototype.__handleQuestion = function (char) {
            this.__lastColonChar.push(char);
            this.__determinePrecedence(char);
        };
        /**
         * @param {string} char The current char.
         * @param {number} ternary The current ternary counter. Increments when a ternary is found,
         * decrements when a ternary is completed. It can be very useful when there is nested ternaries.
         */
        Tokenizer.prototype.__handleColon = function (char, ternary) {
            var lastColonCharArray = this.__lastColonChar, lastColonCharacter = lastColonCharArray[lastColonCharArray.length - 1], outputQueue = this.__outputQueue;
            if (lastColonCharacter === '?') {
                var operatorStack = this.__operatorStack, topOperator = operatorStack[0];
                if (isNull(topOperator)) {
                    this._throwError('Ternary mismatch');
                    return;
                }
                ternary--;
                // pop latest colon char off queue 
                lastColonCharArray.pop();
                this._popStackForVal(topOperator, '?', 'Ternary mismatch');
                outputQueue.push(operatorStack.shift());
                operatorStack.unshift({ val: char, args: -2 });
            }
            else if (lastColonCharacter === '{') {
                var objArgCount = this.__objArgCount, outputLast = outputQueue.length - 1;
                objArgCount[objArgCount.length - 1]++;
                if (outputLast < 0) {
                    this._throwError('Unexpected colon');
                    return;
                }
                outputQueue[outputLast].args = 1;
            }
            else {
                this._throwError('Unexpected colon');
                return;
            }
            return ternary;
        };
        /**
         * @param {number} index The current index in the string being tokenized.
         * @param {string} char The current char.
         */
        Tokenizer.prototype.__handleOtherOperator = function (index, char) {
            var lookAhead = this._lookAheadForOperatorFn(char, index);
            this.__determinePrecedence(lookAhead);
            return index + lookAhead.length - 1;
        };
        /**
         */
        Tokenizer.prototype.__popRemainingOperators = function () {
            var outputQueue = this.__outputQueue, operatorStack = this.__operatorStack, topOperator, topOperatorVal;
            while (operatorStack.length > 0) {
                topOperator = operatorStack.shift();
                topOperatorVal = topOperator.val;
                if (topOperatorVal === '(' || topOperatorVal === ')') {
                    return this._throwError('Parentheses mismatch');
                }
                outputQueue.push(topOperator);
            }
        };
        /**
         * @param {string} operator The operator whose details are being requested.
         */
        Tokenizer.prototype.__determineOperator = function (operator) {
            switch (operator) {
                case '+':
                case '-':
                    if (this.__outputQueue.length === 0 || isOperator(this.__previousChar)) {
                        return OPERATORS['u' + operator];
                    }
                default:
                    return OPERATORS[operator];
            }
        };
        /**
         * @param {string} operator The operator whose precedence is being determined.
         */
        Tokenizer.prototype.__determinePrecedence = function (operator) {
            var operatorFn = this.__determineOperator(operator), operatorPrecedence = operatorFn.precedence, isLtR = operatorFn.associativity === 'ltr', operatorStack = this.__operatorStack, outputQueue = this.__outputQueue, firstArrayOperator, firstArrayVal;
            if (operatorStack.length === 0) {
                operatorStack.unshift({ val: operator, args: operatorFn.fn.length - 2 });
                return;
            }
            do {
                firstArrayVal = operatorStack[0].val;
                if (firstArrayVal === '.') {
                    outputQueue.push(operatorStack.shift());
                    continue;
                }
                firstArrayOperator = OPERATORS[firstArrayVal];
                if (!(isNull(firstArrayOperator) ||
                    !(firstArrayOperator.precedence < operatorPrecedence ||
                        (isLtR && firstArrayOperator.precedence === operatorPrecedence)))) {
                    outputQueue.push(operatorStack.shift());
                }
                else {
                    operatorStack.unshift({ val: operator, args: operatorFn.fn.length - 2 });
                    return;
                }
            } while (operatorStack.length > 0);
            operatorStack.unshift({ val: operator, args: operatorFn.fn.length - 2 });
        };
        /**
         * @param {number} argCount The current local argument count used with functions,
         * arrays, and object literals.
         */
        Tokenizer.prototype.__removeFnFromStack = function (argCount) {
            var outputQueue = this.__outputQueue, operatorStack = this.__operatorStack, topOperator = operatorStack[0], isValEqual = this._isValEqual, isValUnequal = this._isValUnequal, fnToken, atLeastOne = false;
            while (!isNull(topOperator) &&
                isValUnequal(topOperator, '([') &&
                (this._isStringValidVariable(topOperator.val) ||
                    isValEqual(topOperator.val, '.[]') ||
                    isAccessor(topOperator.val))) {
                fnToken = operatorStack.shift();
                if (!(fnToken.args !== -1 || isValEqual(fnToken, '.[]'))) {
                    fnToken.args = -2;
                }
                outputQueue.push(fnToken);
                topOperator = operatorStack[0];
                atLeastOne = true;
            }
            if (!(atLeastOne || isValUnequal(outputQueue[outputQueue.length - argCount - 1], '()'))) {
                atLeastOne = true;
            }
            return atLeastOne;
        };
        Tokenizer._inject = {
            _log: __Log
        };
        return Tokenizer;
    })();
    expressions.Tokenizer = Tokenizer;
    register.injectable(__Tokenizer, Tokenizer);
    /**
     */
    var Parser = (function () {
        function Parser() {
            /**
             */
            this._tokens = [];
            /**
             */
            this.__cache = {};
            /**
             */
            this.__codeArray = [];
            /**
             */
            this.__identifiers = [];
            /**
             */
            this.__tempIdentifiers = [];
            /**
             */
            this.__aliases = {};
            /**
             */
            this.__fnEvalConstant = 'var initialContext;return ';
        }
        /**
         * @param {string} expression The JavaScript expression string to parse.
         */
        Parser.prototype.parse = function (expression) {
            var parsedObject = this.__cache[expression];
            if (!isNull(parsedObject)) {
                return {
                    expression: parsedObject.expression,
                    identifiers: parsedObject.identifiers.slice(0),
                    aliases: parsedObject.aliases.slice(0),
                    evaluate: parsedObject.evaluate
                };
            }
            this._tokens = this._tokenizer.createTokens(expression);
            parsedObject = this._evaluate(expression);
            var identifiers = parsedObject.identifiers;
            if (identifiers.length === 0) {
                var noModel = parsedObject.evaluate(null);
                parsedObject.evaluate = function () { return noModel; };
            }
            this.__cache[expression] = parsedObject;
            return parsedObject;
        };
        /**
         * @param {string} key? An optional key that will clear its stored value in the expression
         * cache if passed in.
         */
        Parser.prototype.clearCache = function (key) {
            if (isString(key)) {
                deleteProperty(this.__cache, key);
                return;
            }
            this.__cache = {};
        };
        /**
         * @param {string} expression The JavaScript expression to evaluate.
         */
        Parser.prototype._evaluate = function (expression) {
            var tokens = this._tokens, length = tokens.length, tempIdentifiers = this.__tempIdentifiers, codeArray = this.__codeArray, useLocalContext = false, tokenObj, token, args;
            for (var index = 0; index < length; index++) {
                tokenObj = tokens[index];
                token = tokenObj.val;
                args = tokenObj.args;
                // check if its an accessor 
                if (isAccessor(token)) {
                    switch (token) {
                        case '()':
                            useLocalContext = this.__handleFunction(index, args, useLocalContext);
                            break;
                        case '{}':
                            codeArray.push(this.__convertObject(args));
                            tempIdentifiers.push('.');
                            break;
                        default:
                            // handle empty array 
                            if (args < 0) {
                                codeArray.push('[]');
                                tempIdentifiers.push('.');
                            }
                            else if (args > 0) {
                                codeArray.push(this.__convertArrayLiteral(args));
                                tempIdentifiers.push('.');
                            }
                            else {
                                useLocalContext = this.__indexIntoObject(index, token, useLocalContext);
                            }
                            break;
                    }
                }
                else if (isOperator(token)) {
                    // check if string literal 
                    if (args === 0) {
                        codeArray.push(this.__convertPrimitive(index, token, args));
                    }
                    else {
                        switch (token) {
                            case '?':
                                this.__handleQuestion();
                                break;
                            case ':':
                                this.__handleColon();
                                break;
                            case '+':
                            case '-':
                                if (args === 1) {
                                    token = 'u' + token;
                                }
                            default:
                                this.__handleOperator(token, args);
                                break;
                        }
                    }
                }
                else {
                    // potential function or object to index into 
                    if (args < 0) {
                        codeArray.push(this.__convertFunction(index, token, useLocalContext));
                    }
                    else {
                        codeArray.push(this.__convertPrimitive(index, token, args));
                    }
                }
            }
            // move the rest of the tempIdentifiers to the identifiers 
            this._popRemainingIdentifiers();
            // make the identifiers array unqiue entries only 
            this._makeIdentifiersUnique();
            var parsedExpression = {
                evaluate: new Function(__CONTEXT, __ALIASES, this.__fnEvalConstant + (codeArray.length === 0 ? ('"' + expression + '"') : codeArray.join('')) + ';'),
                expression: expression,
                identifiers: this.__identifiers.slice(0),
                aliases: Object.keys(this.__aliases)
            };
            // reset parser's properties 
            this._resetParser();
            return parsedExpression;
        };
        /**
         * @param {number} index The index before the desired IToken
         * in the array.
         */
        Parser.prototype._peek = function (index) {
            return this._tokens[index + 1];
        };
        /**
         * @param {number} index The index after the desired IToken
         * in the array.
         */
        Parser.prototype._lookBack = function (index) {
            return this._tokens[index - 1];
        };
        /**
         */
        Parser.prototype._popRemainingIdentifiers = function () {
            var identifiers = this.__identifiers, tempIdentifiers = this.__tempIdentifiers, last;
            while (tempIdentifiers.length > 0) {
                last = tempIdentifiers.pop();
                if (last !== '.') {
                    identifiers.push(last);
                }
            }
        };
        /**
         */
        Parser.prototype._makeIdentifiersUnique = function () {
            var identifiers = this.__identifiers, uniqueIdentifiers = [], uniqueIdentifierObject = {}, identifier;
            while (identifiers.length > 0) {
                identifier = identifiers.pop();
                if (!uniqueIdentifierObject[identifier]) {
                    uniqueIdentifierObject[identifier] = true;
                    uniqueIdentifiers.push(identifier);
                }
            }
            this.__identifiers = uniqueIdentifiers;
        };
        /**
         * @param {expressions.IToken} obj The IToken
         * with the "val" property to compare.
         * @param {string} char The char to compare with.
         */
        Parser.prototype._isValEqual = function (obj, char) {
            if (isNull(obj) || isNull(obj.val)) {
                return isNull(char);
            }
            else if (obj.val === '') {
                return char === '';
            }
            return char.indexOf(obj.val) !== -1;
        };
        /**
         * @param {expressions.IToken} obj The IToken
         * with the "val" property to compare.
         * @param {string} char The char to compare with.
         */
        Parser.prototype._isValUnequal = function (obj, char) {
            if (isNull(obj) || isNull(obj.val)) {
                return !isNull(char);
            }
            else if (obj.val === '') {
                return char !== '';
            }
            return char.indexOf(obj.val) === -1;
        };
        /**
         */
        Parser.prototype._resetParser = function () {
            this._tokens = [];
            this.__codeArray = [];
            this.__identifiers = [];
            this.__tempIdentifiers = [];
            this.__aliases = {};
        };
        /**
         * @param {string} error The error message to throw.
         */
        Parser.prototype._throwError = function (error) {
            this._log.error(new Error(error));
        };
        /**
         * @param {number} index The current index in the IToken array.
         * @param {string} token The current IToken value.
         * @param {number} args The current IToken args.
         */
        Parser.prototype.__convertPrimitive = function (index, token, args) {
            if (args > 0) {
                this.__tempIdentifiers.push('.');
                return token;
            }
            var castTokenIsNumberLike = isNumber(Number(token)), peek = this._peek(index), isPeekIndexer = !(isNull(peek) || peek.args >= 1), isValEqual = this._isValEqual;
            if (isKeyword(token) ||
                (isString(token) &&
                    (castTokenIsNumberLike ||
                        this._isValUnequal(peek, '[]()') ||
                        (isValEqual(peek, '[]') &&
                            !isPeekIndexer)))) {
                this.__tempIdentifiers.push('.');
                return '"' + token + '"';
            }
            else {
                if (!castTokenIsNumberLike ||
                    (isValEqual(peek, '.[]') &&
                        isPeekIndexer)) {
                    this.__tempIdentifiers.push(token);
                }
                else {
                    this.__tempIdentifiers.push('.');
                }
                return token;
            }
        };
        /**
         * @param {number} index The current index in the IToken array.
         * @param {string} token The current IToken value.
         * @param {boolean} useLocalContext Whether or not we need to use an already parsed object as the current context.
         */
        Parser.prototype.__convertFunction = function (index, token, useLocalContext) {
            if (token[0] === '@') {
                this.__aliases[token.slice(1)] = true;
            }
            else if (isKeyword(token)) {
                this.__tempIdentifiers.push('.');
                return token;
            }
            var nextToken = this._peek(index), isValEqual = this._isValEqual;
            if (isValEqual(this._tokens[index - 1], '()') && isValEqual(nextToken, '.[]')) {
                this.__tempIdentifiers.push('.');
            }
            else {
                this.__tempIdentifiers.push(token);
            }
            if (!isNull(nextToken)) {
                switch (nextToken.val) {
                    case '.':
                    case '()':
                        return token;
                    default:
                        if (!useLocalContext) {
                            return '(initialContext = (' + this.__findInitialContext.toString() + ')(context,aliases,"' + token + '"))';
                        }
                        break;
                }
            }
            else {
                return '(initialContext = (' + this.__findInitialContext.toString() + ')(context,aliases,"' + token + '"))';
            }
        };
        /**
         * @param {number} args The current IToken args.
         */
        Parser.prototype.__convertObject = function (args) {
            var identifiers = this.__identifiers, tempIdentifiers = this.__tempIdentifiers, codeArray = this.__codeArray, j = 0, key, codeStr = '{', tempIdentifier, temp;
            while (j++ < args) {
                temp = codeArray.pop();
                key = codeArray.pop();
                codeStr += ',"' + key + '":' + temp;
                if (tempIdentifiers.length > 1) {
                    tempIdentifier = tempIdentifiers.pop();
                    // pop the key's tempIdentifier 
                    tempIdentifiers.pop();
                    if (tempIdentifier !== '.') {
                        identifiers.push(tempIdentifier);
                    }
                }
            }
            return codeStr.replace(',', '') + '}';
        };
        /**
         * @param {number} args The current IToken args.
         */
        Parser.prototype.__convertArrayLiteral = function (args) {
            var identifiers = this.__identifiers, tempIdentifiers = this.__tempIdentifiers, codeArray = this.__codeArray, j = 0, tempStr = '', tempIdentifier;
            while (j++ < args) {
                tempStr = codeArray.pop() + ',' + tempStr;
                if (tempIdentifiers.length > 0) {
                    tempIdentifier = tempIdentifiers.pop();
                    if (tempIdentifier !== '.') {
                        identifiers.push(tempIdentifier);
                    }
                }
            }
            return '[' + tempStr.slice(0, -1) + ']';
        };
        /**
         * @param {number} index The current index in the IToken array.
         * @param {number} args The current IToken args.
         * @param {boolean} useLocalContext Whether or not we need to use an already parsed object as the current context.
         */
        Parser.prototype.__handleFunction = function (index, args, useLocalContext) {
            var identifiers = this.__identifiers, tempIdentifiers = this.__tempIdentifiers, codeArray = this.__codeArray, j = 0, previousToken = this._lookBack(index), grabFnName = !isNull(previousToken) && (previousToken.args === -2 || this._isValEqual(previousToken, '.[]')), tempStr = '', tempIdentifier, fnName = '', identifierFnName = '', codeStr, pushedIdentifier = false;
            if (grabFnName) {
                fnName = codeArray.pop();
                identifierFnName = tempIdentifiers.pop();
            }
            while (j++ < args) {
                tempStr = codeArray.pop() + ',' + tempStr;
                if (tempIdentifiers.length > 0) {
                    tempIdentifier = tempIdentifiers.pop();
                    if (tempIdentifier !== '.') {
                        identifiers.push(tempIdentifier);
                        pushedIdentifier = true;
                    }
                }
            }
            if (args > 0) {
                codeStr = '.call(initialContext || context,' + tempStr.slice(0, tempStr.length - 1) + ')';
            }
            else {
                codeStr = '.call(initialContext || context)';
            }
            if (useLocalContext) {
                useLocalContext = false;
                if (codeArray.length > 0) {
                    var context = codeArray.pop(), lastIndex = tempIdentifiers.length - 1;
                    if (!(lastIndex < 0 || tempIdentifiers[lastIndex] === '.' || identifierFnName === '')) {
                        tempIdentifiers[lastIndex] += '.' + identifierFnName;
                        identifiers.push(tempIdentifiers.pop());
                    }
                    else if (!(identifierFnName === '' ||
                        !pushedIdentifier ||
                        context[0] === '[' ||
                        context[context.length - 1] === ']')) {
                        identifiers[identifiers.length - 1] += '.' + identifierFnName;
                    }
                    if (isEmpty(fnName)) {
                        codeStr = context + codeStr;
                    }
                    else {
                        codeStr = '((' + this.__indexIntoContext.toString() + ')(' + context + ',"' +
                            fnName + '") || (function () {}))' + codeStr;
                    }
                }
                else {
                    this._throwError('Improper expression or context');
                }
            }
            else {
                if (grabFnName) {
                    codeStr = '(initialContext = ((' + this.__findInitialContext.toString() + ')(context,aliases,"' +
                        fnName + '") || (function () {}))' + codeStr + ')';
                    identifiers.push(fnName);
                }
                else {
                    codeStr = codeArray.pop() + codeStr;
                }
            }
            codeArray.push(codeStr);
            var length = tempIdentifiers.length;
            if (this._isValEqual(this._peek(index), '[]') && length > 0 && tempIdentifiers[length - 1] !== '.') {
                identifiers.push(tempIdentifiers.pop());
            }
            return useLocalContext;
        };
        /**
         * @param {number} index The current index in the IToken array.
         * @param {string} token The current IToken value.
         * @param {boolean} useLocalContext Whether or not we need to use an already parsed object as the current context.
         */
        Parser.prototype.__indexIntoObject = function (index, token, useLocalContext) {
            var isValEqual = this._isValEqual;
            if (isValEqual(this._peek(index), '()')) {
                return true;
            }
            var codeArray = this.__codeArray, codeStr = codeArray.pop(), identifiers = this.__identifiers, tempIdentifiers = this.__tempIdentifiers, previousToken = this._lookBack(index), identifierIndexer = tempIdentifiers.pop(), hasIdentifierIndexer = !isNull(identifierIndexer), lastIndex;
            if (hasIdentifierIndexer && identifierIndexer[0] === '@') {
                codeStr = '(' + this.__indexIntoContext.toString() + ')(' + codeArray.pop() + ',' + codeStr + ')';
                identifiers.push(identifierIndexer);
                if (tempIdentifiers.length > 0) {
                    identifiers.push(tempIdentifiers.pop());
                }
            }
            else if (isValEqual(previousToken, '++--()[]*/%?:>=<=&&||!===')) {
                codeStr = '(' + this.__indexIntoContext.toString() + ')(' + codeArray.pop() + ',' + codeStr + ')';
                tempIdentifiers.push('.');
            }
            else if (token === '[]' && !(isNull(previousToken) || previousToken.args >= 0)) {
                codeStr = '(' + this.__indexIntoContext.toString() + ')(' + codeArray.pop() + ',' + codeStr + ')';
                lastIndex = tempIdentifiers.length - 1;
                if (lastIndex >= 0) {
                    if (tempIdentifiers[lastIndex] !== '.') {
                        identifiers.push(tempIdentifiers.pop());
                    }
                }
                identifiers.push(identifierIndexer);
            }
            else {
                codeStr = '(' + this.__indexIntoContext.toString() + ')(' + codeArray.pop() + ',"' + codeStr + '")';
                lastIndex = tempIdentifiers.length - 1;
                if (lastIndex >= 0) {
                    if (tempIdentifiers[lastIndex] !== '.') {
                        tempIdentifiers[lastIndex] += '.' + identifierIndexer;
                    }
                }
                else if (hasIdentifierIndexer && identifierIndexer !== '.' && token !== '.') {
                    identifiers.push(identifierIndexer);
                }
            }
            codeArray.push(codeStr);
            return useLocalContext;
        };
        /**
         */
        Parser.prototype.__handleQuestion = function () {
            var identifiers = this.__identifiers, tempIdentifiers = this.__tempIdentifiers, codeArray = this.__codeArray, temp = codeArray.pop(), tempIdentifier;
            for (var i = 0; i < 2; i++) {
                if (tempIdentifiers.length > 0) {
                    tempIdentifier = tempIdentifiers.pop();
                    if (tempIdentifier !== '.') {
                        identifiers.push(tempIdentifier);
                    }
                }
                else {
                    break;
                }
            }
            codeArray.push(codeArray.pop() + '?' + temp);
        };
        /**
         */
        Parser.prototype.__handleColon = function () {
            var identifiers = this.__identifiers, tempIdentifiers = this.__tempIdentifiers, codeArray = this.__codeArray, temp = codeArray.pop(), tempIdentifier;
            for (var i = 0; i < 2; i++) {
                if (tempIdentifiers.length > 0) {
                    tempIdentifier = tempIdentifiers.pop();
                    if (tempIdentifier !== '.') {
                        identifiers.push(tempIdentifier);
                    }
                }
                else {
                    break;
                }
            }
            codeArray.push(codeArray.pop() + ':' + temp);
        };
        /**
         * @param {string} token The current IToken value.
         * @param {number} args The current IToken args.
         */
        Parser.prototype.__handleOperator = function (token, args) {
            var identifiers = this.__identifiers, tempIdentifiers = this.__tempIdentifiers, codeArray = this.__codeArray, j = 0, tempStr = '', tempIdentifier;
            while (j++ < args) {
                tempStr = 'function (context, aliases) { return ' + codeArray.pop() + '; }' + ',' + tempStr;
                if (tempIdentifiers.length > 0) {
                    tempIdentifier = tempIdentifiers.pop();
                    if (tempIdentifier !== '.') {
                        identifiers.push(tempIdentifier);
                    }
                }
            }
            // push identifier for new result of operator 
            tempIdentifiers.push('.');
            codeArray.push('(' + OPERATORS[token].fn.toString() + ')(context, aliases,' + tempStr.slice(0, tempStr.length - 1) + ')');
        };
        /**
         * @param {any} context The context object.
         * @param {any} aliases Any aliases that may exist.
         * @param {string} token The property used to find the initial context.
         */
        Parser.prototype.__findInitialContext = function (context, aliases, token) {
            if (token[0] === '@' && aliases !== null && typeof aliases === 'object') {
                return aliases[token.slice(1)];
            }
            else if (context !== null && typeof context === 'object') {
                return context[token];
            }
        };
        /**
         * @param {any} context The context object.
         * @param {string} token The property used to drill into the context.
         */
        Parser.prototype.__indexIntoContext = function (context, token) {
            if (context !== null && typeof context === 'object') {
                return context[token];
            }
        };
        Parser._inject = {
            _tokenizer: __Tokenizer,
            _log: __Log
        };
        return Parser;
    })();
    expressions.Parser = Parser;
    register.injectable(__Parser, Parser);
})(expressions = exports.expressions || (exports.expressions = {}));
/**
 */
var web;
(function (web) {
    /**
     */
    function Location(_window) {
        return _window.location;
    }
    web.Location = Location;
    register.injectable(__Location, Location, [__Window]);
    /**
     */
    var Browser = (function () {
        /**
         */
        function Browser() {
            /**
             */
            this.uid = uniqueId(__Plat);
            /**
             */
            this.__lastUrl = this._location.href;
            /**
             */
            this.__initializing = false;
            this._EventManager.on(this.uid, __beforeLoad, this.initialize, this);
            if (this._compat.msApp) {
                this._stack = [];
            }
        }
        /**
         */
        Browser.prototype.initialize = function () {
            var _compat = this._compat;
            this._EventManager.dispose(this.uid);
            this.__initializing = true;
            acquire(__UrlUtilsInstance);
            var url = this.url(), trimmedUrl = url, changed = this._urlChanged.bind(this), _dom = this._dom, _window = this._window;
            if (trimmedUrl !== url) {
                this.url(trimmedUrl, true);
            }
            if (_compat.pushState) {
                _dom.addEventListener(_window, __POPSTATE, changed, false);
            }
            _dom.addEventListener(_window, __HASHCHANGE, changed, false);
            this.__initializing = false;
        };
        /**
         * @param {string} url? The URL to set the location to.
         * @param {boolean} replace? Whether or not to replace the current URL in
         * the history.
         */
        Browser.prototype.url = function (url, replace) {
            var location = this._location;
            if (isString(url) && !this._isLastUrl(url)) {
                if (!replace && isArray(this._stack)) {
                    this._stack.push(location.href);
                }
                this._setUrl(url, replace);
            }
            return this.__currentUrl || location.href;
        };
        /**
         * @param {number} length=1 The length to go back
         */
        Browser.prototype.back = function (length) {
            if (!isNumber(length)) {
                length = 1;
            }
            var _stack = this._stack;
            if (isArray(_stack) && _stack.length > 1) {
                this._stack = _stack = _stack.slice(0, _stack.length - (length - 1));
                this.url(_stack.pop());
                _stack.pop();
                return;
            }
            this._history.go(-length);
        };
        /**
         * @param {number} length=1 The length to go forward
         */
        Browser.prototype.forward = function (length) {
            if (!isNumber(length)) {
                length = 1;
            }
            this._history.go(length);
        };
        /**
         * @param url? The URL to associate with the new UrlUtils
         * instance.
         */
        Browser.prototype.urlUtils = function (url) {
            url = url || this.url();
            var _urlUtils = acquire(__UrlUtilsInstance), _config = Browser.config;
            if (_config.routingType === _config.HASH) {
                url = url.replace(new RegExp('#' + (_config.hashPrefix || '') + '/?'), '');
            }
            _urlUtils.initialize(url);
            return _urlUtils;
        };
        /**
         * @param url The URL to verify whether or not it's cross domain.
         */
        Browser.prototype.isCrossDomain = function (url) {
            if (!isString(url)) {
                return false;
            }
            var urlUtils = this.urlUtils(url), locationUtils = this.urlUtils();
            // check for protocol:host:port mismatch 
            return urlUtils.protocol !== locationUtils.protocol ||
                urlUtils.hostname !== locationUtils.hostname ||
                urlUtils.port !== locationUtils.port;
        };
        /**
         * @param url The URL to format.
         */
        Browser.prototype.formatUrl = function (url) {
            var config = Browser.config, baseUrl = config.baseUrl, isLocal = !this._regex.fullUrlRegex.test(url) || url.indexOf(baseUrl) > -1;
            if (!isString(url)) {
                return '';
            }
            if (url === baseUrl) {
                return url;
            }
            if (url[0] === '/') {
                url = url.slice(1);
            }
            if (isLocal && config.routingType === config.HASH) {
                var hasProtocol = url.indexOf(this.urlUtils().protocol) !== -1, prefix = config.hashPrefix || '', append = '#' + prefix, hashRegex = new RegExp(append + '|#/');
                if (url[url.length - 1] !== '/' && url.indexOf('?') === -1) {
                    url += '/';
                }
                if (hasProtocol && !hashRegex.test(url)) {
                    url = url + append + '/';
                }
                else if (!hashRegex.test(url)) {
                    url = append + ((url[0] !== '/') ? '/' : '') + url;
                }
            }
            if (isLocal && url.indexOf(baseUrl) === -1) {
                url = baseUrl + url;
            }
            return url;
        };
        /**
         * @param url The URL to verify whether or not it's cross domain.
         */
        Browser.prototype._urlChanged = function () {
            var _this = this;
            if (this.__initializing) {
                return;
            }
            this.__currentUrl = null;
            var utils = this.urlUtils(), $config = Browser.config, url = this._trimSlashes(utils.href);
            if (this.__lastUrl === url) {
                return;
            }
            this.__lastUrl = url;
            var $manager = this._EventManager;
            postpone(function () {
                $manager.dispatch(__urlChanged, _this, $manager.DIRECT, [utils]);
            });
        };
        /**
         * @param {string} url The URL to set.
         * @param {boolean} replace? Whether or not to replace the
         * current URL in the history.
         */
        Browser.prototype._setUrl = function (url, replace) {
            url = this.formatUrl(url);
            var utils = this.urlUtils(url), baseUrl = Browser.config.baseUrl, _history = this._history, _location = this._location;
            if (utils.href.indexOf(baseUrl) === -1) {
                _location.href = url;
                return;
            }
            // make sure URL is absolute 
            if (!this._regex.fullUrlRegex.test(url) && url[0] !== '/') {
                url = baseUrl + url;
            }
            if (this._compat.pushState) {
                if (replace) {
                    var state = _history.state;
                    if (!isObject(state)) {
                        state = {};
                    }
                    _history.replaceState({
                        previousLocation: state.previousLocation
                    }, '', url);
                }
                else {
                    _history.pushState({
                        previousLocation: this.urlUtils().pathname
                    }, '', url);
                }
                if (!this.__initializing) {
                    this._urlChanged();
                }
            }
            else {
                this.__currentUrl = url;
                if (replace) {
                    _location.replace(url);
                }
                else {
                    _location.href = url;
                }
            }
        };
        /**
         * @param {string} url The URL to match
         */
        Browser.prototype._isLastUrl = function (url) {
            var last = this.__lastUrl;
            if (isString(url)) {
                if (isEmpty(url)) {
                    url = '/';
                }
                url = this._trimSlashes(this.urlUtils(url).href);
            }
            return url === last;
        };
        /**
         * @param {string} url The URL to trim
         */
        Browser.prototype._trimSlashes = function (url) {
            if (!isString(url) || url[url.length - 1] !== '/') {
                return url;
            }
            return url.slice(0, -1);
        };
        Browser._inject = {
            _EventManager: __EventManagerStatic,
            _compat: __Compat,
            _regex: __Regex,
            _window: __Window,
            _location: __Location,
            _history: __History,
            _dom: __Dom
        };
        /**
         */
        Browser.config = {
            HASH: 'hash',
            STATE: 'state',
            routingType: 'hash',
            hashPrefix: '!',
            baseUrl: ''
        };
        return Browser;
    })();
    web.Browser = Browser;
    register.injectable(__Browser, Browser);
    /**
     */
    function IBrowserConfig() {
        return Browser.config;
    }
    web.IBrowserConfig = IBrowserConfig;
    register.injectable(__BrowserConfig, IBrowserConfig);
    /**
     */
    var UrlUtils = (function () {
        /**
         */
        function UrlUtils() {
            var config = this._browserConfig, baseUrl = config.baseUrl;
            if (isEmpty(baseUrl) || !this._regex.fullUrlRegex.test(baseUrl)) {
                var url = this._window.location.href, trimmedUrl = url.replace(this._regex.initialUrlRegex, '/');
                if (isString(baseUrl)) {
                    if (baseUrl.indexOf('/') === 0) {
                        baseUrl = baseUrl.slice(1);
                    }
                }
                else {
                    baseUrl = '';
                }
                baseUrl = UrlUtils.__getBaseUrl(trimmedUrl) + baseUrl;
                while (baseUrl[baseUrl.length - 1] === '/') {
                    baseUrl = baseUrl.slice(0, -1);
                }
                config.baseUrl = baseUrl + '/';
            }
        }
        /**
         * @param {string} search The URL's query search string.
         */
        UrlUtils.__getQuery = function (search) {
            return deserializeQuery(search);
        };
        /**
         * @param {string} url The initial URL passed into the Browser.
         */
        UrlUtils.__getBaseUrl = function (url) {
            var _regex = acquire(__Regex), _location = acquire(__Location), origin = _location.origin, protocol = _location.protocol, host = _location.host;
            if (protocol === 'file:' || protocol.indexOf('wmapp') > -1 || protocol.indexOf('ms-appx') > -1) {
                origin = _location.href;
            }
            else if (isUndefined(origin)) {
                origin = _location.protocol + '//' + _location.host;
            }
            origin = origin.replace(_regex.initialUrlRegex, '');
            return origin.split('?')[0].split('#')[0] + '/';
        };
        /**
         * @param {string} url The input to associate with this UrlUtils instance.
         */
        UrlUtils.prototype.initialize = function (url) {
            url = url || '';
            var element = UrlUtils.__urlUtilsElement ||
                (UrlUtils.__urlUtilsElement = this._document.createElement('a')), _browserConfig = this._browserConfig;
            // always make local urls relative to start page. 
            if (url[0] === '/' && url.indexOf('//') !== 0) {
                url = url.slice(1);
            }
            // Always append the baseUrl if this is not a full-url 
            if (!this._regex.fullUrlRegex.test(url)) {
                url = _browserConfig.baseUrl + url;
            }
            element.setAttribute('href', url);
            url = element.href;
            // we need to do this twice for cerain browsers (e.g. win8) 
            element.setAttribute('href', url);
            url = element.href;
            this.href = url;
            this.protocol = element.protocol ? element.protocol.replace(/:$/, '') : '';
            this.host = element.host;
            this.search = element.search ? element.search.replace(/^\?/, '') : '';
            this.hash = element.hash ? element.hash.replace(/^#/, '') : '';
            this.hostname = element.hostname;
            this.port = element.port;
            var path;
            if (!isEmpty(_browserConfig.baseUrl)) {
                path = url.replace(_browserConfig.baseUrl, '/');
            }
            else {
                path = (element.pathname.charAt(0) === '/')
                    ? element.pathname
                    : '/' + element.pathname;
            }
            path = path.replace(this._regex.initialUrlRegex, '/');
            this.pathname = path.split('?')[0].split('#')[0];
            this.query = UrlUtils.__getQuery(this.search);
        };
        /**
         */
        UrlUtils.prototype.toString = function () {
            return this.href;
        };
        UrlUtils._inject = {
            _EventManager: __EventManagerStatic,
            _document: __Document,
            _window: __Window,
            _compat: __Compat,
            _regex: __Regex,
            _browserConfig: __BrowserConfig
        };
        return UrlUtils;
    })();
    web.UrlUtils = UrlUtils;
    register.injectable(__UrlUtilsInstance, UrlUtils, null, __INSTANCE);
})(web = exports.web || (exports.web = {}));
/**
 */
var async;
(function (async) {
    var __promiseQueue = [], browserGlobal = (typeof window !== 'undefined') ? window : {}, BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver, scheduleFlush;
    var process = process;
    // decide what async method to use to triggering processing of queued callbacks: 
    if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
        scheduleFlush = useNextTick();
    }
    else if (BrowserMutationObserver) {
        scheduleFlush = useMutationObserver();
    }
    else {
        scheduleFlush = useSetTimeout();
    }
    /**
     */
    var Promise = (function () {
        /**
         * @param {async.IResolveFunction<R>} resolveFunction A IResolveFunction for fulfilling/rejecting the Promise.
         */
        function Promise(resolveFunction) {
            if (!isFunction(resolveFunction)) {
                throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
            }
            if (!(this instanceof Promise)) {
                throw new TypeError('Failed to construct "Promise": ' +
                    'Please use the "new" operator, this object constructor cannot be called as a function.');
            }
            this.__subscribers = [];
            Promise.__invokeResolveFunction(resolveFunction, this);
        }
        Promise.all = function (promises) {
            if (!isArray(promises)) {
                return Promise.all([promises]);
            }
            return new Promise(function (resolve, reject) {
                var results = [], remaining = promises.length, promise;
                if (remaining === 0) {
                    resolve([]);
                }
                function resolver(index) {
                    return function (value) { return resolveAll(index, value); };
                }
                function resolveAll(index, value) {
                    results[index] = value;
                    if (--remaining === 0) {
                        resolve(results);
                    }
                }
                for (var i = 0; i < promises.length; i++) {
                    promise = promises[i];
                    if (isPromise(promise)) {
                        promise.then(resolver(i), reject);
                    }
                    else {
                        resolveAll(i, promise);
                    }
                }
            });
        };
        Promise.race = function (promises) {
            if (!isArray(promises)) {
                return Promise.race([promises]);
            }
            return new Promise(function (resolve, reject) {
                var promise;
                for (var i = 0; i < promises.length; i++) {
                    promise = promises[i];
                    if (promise && typeof promise.then === 'function') {
                        promise.then(resolve, reject);
                    }
                    else {
                        resolve(promise);
                    }
                }
            });
        };
        Promise.resolve = function (value) {
            return new Promise(function (resolve, reject) {
                resolve(value);
            });
        };
        /**
         * @param {any} error The value to reject.
         */
        Promise.reject = function (error) {
            return new Promise(function (resolve, reject) {
                reject(error);
            });
        };
        /**
         * @param {async.IResolveFunction<R>} resolveFunction The resolve function to invoke.
         * @param {async.Promise<R>} promise The promise on which to invoke the resolve function.
         */
        Promise.__invokeResolveFunction = function (resolveFunction, promise) {
            function resolvePromise(value) {
                Promise.__resolve(promise, value);
            }
            function rejectPromise(reason) {
                Promise.__reject(promise, reason);
            }
            try {
                resolveFunction(resolvePromise, rejectPromise);
            }
            catch (e) {
                rejectPromise(e);
            }
        };
        /**
         * @param {async.State} settled The state of the promise.
         * @param {any} promise The promise object.
         * @param {(response: any) => void} callback The callback to invoke.
         * @param {any} detail The details to pass to the callback.
         */
        Promise.__invokeCallback = function (settled, promise, callback, detail) {
            var hasCallback = isFunction(callback), value, error, succeeded, failed;
            if (hasCallback) {
                try {
                    value = callback(detail);
                    succeeded = true;
                }
                catch (e) {
                    failed = true;
                    error = e;
                }
            }
            else {
                value = detail;
                succeeded = true;
            }
            if (Promise.__handleThenable(promise, value)) {
                return;
            }
            else if (hasCallback && succeeded) {
                Promise.__resolve(promise, value);
            }
            else if (failed) {
                Promise.__reject(promise, error);
            }
            else if (settled === State.FULFILLED) {
                Promise.__resolve(promise, value);
            }
            else if (settled === State.REJECTED) {
                Promise.__reject(promise, value);
            }
        };
        /**
         * @param {any} promise The promise object.
         * @param {async.State} settled The state of the promise.
         */
        Promise.__publish = function (promise, settled) {
            var subscribers = promise.__subscribers, detail = promise.__detail, child, callback;
            for (var i = 0; i < subscribers.length; i += 3) {
                child = subscribers[i];
                callback = subscribers[i + settled];
                Promise.__invokeCallback(settled, child, callback, detail);
            }
            promise.__subscribers = null;
        };
        /**
         * @param {any} promise The promise object.
         */
        Promise.__publishFulfillment = function (promise) {
            Promise.__publish(promise, promise.__state = State.FULFILLED);
        };
        /**
         * @param {any} promise The promise object.
         */
        Promise.__publishRejection = function (promise) {
            Promise.__publish(promise, promise.__state = State.REJECTED);
        };
        /**
         * @param {any} promise The promise object.
         * @param {any} reason The detail of the rejected promise.
         */
        Promise.__reject = function (promise, reason) {
            if (promise.__state !== State.PENDING) {
                return;
            }
            promise.__state = State.SEALED;
            promise.__detail = reason;
            Promise.config.async(Promise.__publishRejection, promise);
        };
        /**
         * @param {async.Promise<R>} promise The promise object.
         * @param {any} value The detail of the fulfilled promise.
         */
        Promise.__fulfill = function (promise, value) {
            if (promise.__state !== State.PENDING) {
                return;
            }
            promise.__state = State.SEALED;
            promise.__detail = value;
            Promise.config.async(Promise.__publishFulfillment, promise);
        };
        /**
         * @param {async.Promise<R>} promise The promise object.
         * @param {any} value The detail of the fulfilled promise.
         */
        Promise.__resolve = function (promise, value) {
            if (promise === value) {
                Promise.__fulfill(promise, value);
            }
            else if (!Promise.__handleThenable(promise, value)) {
                Promise.__fulfill(promise, value);
            }
        };
        /**
         * @param {async.Promise<R>} promise The promise object.
         * @param {async.Promise<R>} value The next promise to await.
         */
        Promise.__handleThenable = function (promise, value) {
            var resolved;
            if (promise === value) {
                Promise.__reject(promise, new TypeError('A promises callback cannot return the same promise.'));
                return true;
            }
            if (isPromise(value)) {
                try {
                    value.then.call(value, function (val) {
                        if (resolved) {
                            return true;
                        }
                        resolved = true;
                        if (value !== val) {
                            Promise.__resolve(promise, val);
                        }
                        else {
                            Promise.__fulfill(promise, val);
                        }
                    }, function (val) {
                        if (resolved) {
                            return true;
                        }
                        resolved = true;
                        Promise.__reject(promise, val);
                    });
                    return true;
                }
                catch (error) {
                    if (resolved) {
                        return true;
                    }
                    Promise.__reject(promise, error);
                    return true;
                }
            }
            return false;
        };
        /**
         * @param {async.Promise<any>} parent The parent promise.
         * @param {async.Promise<any>} value The child promise.
         * @param {(success: any) => any} onFullfilled The fulfilled method for the child.
         * @param {(error: any) => any} onRejected The rejected method for the child.
         */
        Promise.__subscribe = function (parent, child, onFulfilled, onRejected) {
            var subscribers = parent.__subscribers;
            var length = subscribers.length;
            subscribers[length] = child;
            subscribers[length + State.FULFILLED] = onFulfilled;
            subscribers[length + State.REJECTED] = onRejected;
        };
        Promise.prototype.then = function (onFulfilled, onRejected) {
            var promise = this;
            var thenPromise = new this.constructor(noop, this);
            if (this.__state) {
                var callbacks = arguments;
                Promise.config.async(function () {
                    Promise.__invokeCallback(promise.__state, thenPromise, callbacks[promise.__state - 1], promise.__detail);
                });
            }
            else {
                Promise.__subscribe(this, thenPromise, onFulfilled, onRejected);
            }
            return thenPromise;
        };
        Promise.prototype.catch = function (onRejected) {
            return this.then(null, onRejected);
        };
        /**
         */
        Promise.prototype.toString = function () {
            return '[object Promise]';
        };
        /**
         */
        Promise.config = {
            /**
             */
            async: function (callback, arg) {
                var length = __promiseQueue.push([callback, arg]);
                if (length === 1) {
                    scheduleFlush();
                }
            }
        };
        return Promise;
    })();
    async.Promise = Promise;
    var State;
    (function (State) {
        State[State["PENDING"] = (void 0)] = "PENDING";
        State[State["SEALED"] = 0] = "SEALED";
        State[State["FULFILLED"] = 1] = "FULFILLED";
        State[State["REJECTED"] = 2] = "REJECTED";
    })(State || (State = {}));
    ;
    // node 
    function useNextTick() {
        return function () {
            process.nextTick(flush);
        };
    }
    function useMutationObserver() {
        var observer = new BrowserMutationObserver(flush), _document = acquire(__Document), _window = acquire(__Window), element = _document.createElement('div');
        observer.observe(element, { attributes: true });
        _window.addEventListener('unload', function () {
            observer.disconnect();
            observer = null;
        }, false);
        return function () {
            element.setAttribute('drainQueue', 'drainQueue');
        };
    }
    function useSetTimeout() {
        return function () {
            postpone(flush);
        };
    }
    function flush() {
        var tuple, callback, arg;
        for (var i = 0; i < __promiseQueue.length; i++) {
            tuple = __promiseQueue[i];
            callback = tuple[0];
            arg = tuple[1];
            callback(arg);
        }
        __promiseQueue = [];
    }
    /**
     */
    function IPromise(_window) {
        if (!isNull(_window.Promise) &&
            isFunction(_window.Promise.all) &&
            isFunction(_window.Promise.race) &&
            isFunction(_window.Promise.resolve) &&
            isFunction(_window.Promise.reject)) {
            return _window.Promise;
        }
        return Promise;
    }
    async.IPromise = IPromise;
    register.injectable(__Promise, IPromise, [__Window], __CLASS);
    /**
     */
    var HttpRequest = (function () {
        /**
         */
        function HttpRequest() {
            var compat = acquire(__Compat);
            this.__fileSupported = compat.fileSupported;
        }
        /**
         * @param {async.IHttpConfig} options The IHttpConfigStatic used to customize this HttpRequest.
         */
        HttpRequest.prototype.initialize = function (options) {
            this.__options = _extend(false, false, {}, this._config, options);
        };
        /**
         */
        HttpRequest.prototype.execute = function () {
            var options = this.__options, url = options.url;
            if (!isString(url) || isEmpty(url.trim())) {
                return this._invalidOptions();
            }
            options.url = this._browser.urlUtils(url).toString();
            var isCrossDomain = options.isCrossDomain || false, xDomain = false;
            // check if forced cross domain call or cors is not supported (IE9) 
            if (isCrossDomain) {
                xDomain = true;
            }
            else {
                this.xhr = new XMLHttpRequest();
                if (isUndefined(this.xhr.withCredentials)) {
                    xDomain = this._browser.isCrossDomain(url);
                }
            }
            if (xDomain) {
                this.xhr = null;
                this.jsonpCallback = options.jsonpCallback || uniqueId(__JSONP_CALLBACK);
                return this.executeJsonp();
            }
            return this._sendXhrRequest();
        };
        /**
         */
        HttpRequest.prototype.executeJsonp = function () {
            var _this = this;
            var options = this.__options, url = options.url;
            if (!isString(url) || isEmpty(url.trim())) {
                return this._invalidOptions();
            }
            options.url = this._browser.urlUtils(url).toString();
            if (isNull(this.jsonpCallback)) {
                this.jsonpCallback = options.jsonpCallback || uniqueId(__Callback);
            }
            var promise = new AjaxPromise(function (resolve, reject) {
                var _window = _this._window, _document = _this._document, scriptTag = _document.createElement('script'), jsonpCallback = _this.jsonpCallback, jsonpIdentifier = options.jsonpIdentifier || 'callback';
                scriptTag.src = url + ((url.indexOf('?') > -1) ? '&' : '?') + jsonpIdentifier + '=' + jsonpCallback;
                var oldValue = _window[jsonpCallback];
                _window[jsonpCallback] = function (response) {
                    // clean up 
                    if (isFunction(_this.clearTimeout)) {
                        _this.clearTimeout();
                    }
                    _document.head.removeChild(scriptTag);
                    if (isUndefined(oldValue)) {
                        deleteProperty(_window, jsonpCallback);
                    }
                    else {
                        _window[jsonpCallback] = oldValue;
                    }
                    // call callback 
                    resolve({
                        response: response,
                        // ok 
                        status: 200
                    });
                };
                _document.head.appendChild(scriptTag);
                var timeout = options.timeout;
                if (isNumber(timeout) && timeout > 0) {
                    // we first postpone to avoid always timing out when debugging, though this is not 
                    // a foolproof method. 
                    _this.clearTimeout = postpone(function () {
                        _this.clearTimeout = defer(function () {
                            reject(new AjaxError({
                                response: 'Request timed out in ' + timeout + 'ms for ' + url,
                                // request timeout 
                                status: 408
                            }));
                            _window[jsonpCallback] = noop;
                        }, timeout - 1);
                    });
                }
            });
            promise.initialize(this);
            return promise;
        };
        /**
         */
        HttpRequest.prototype._xhrOnReadyStateChange = function () {
            var xhr = this.xhr;
            if (xhr.readyState === 4) {
                var status_1 = xhr.status;
                if (status_1 === 0) {
                    var response = xhr.response;
                    if (isNull(response)) {
                        try {
                            response = xhr.responseText;
                        }
                        catch (e) { }
                    }
                    // file protocol issue **Needs to be tested more thoroughly** 
                    // ok if response is not empty, Not Found otherwise 
                    if (!isEmpty(response)) {
                        return true;
                    }
                    return false;
                }
                // 304 is not modified 
                if ((status_1 >= 200 && status_1 < 300) || status_1 === 304) {
                    return true;
                }
                else {
                    return false;
                }
            }
            // else {} TODO: add progress for xhr if we choose to add progress to AjaxPromise 
        };
        /**
         */
        HttpRequest.prototype._sendXhrRequest = function () {
            var _this = this;
            var xhr = this.xhr, options = this.__options, method = options.method, url = options.url, promise = new AjaxPromise(function (resolve, reject) {
                xhr.onreadystatechange = function () {
                    var success = _this._xhrOnReadyStateChange();
                    if (isNull(success)) {
                        return;
                    }
                    var response = _this._formatResponse(options.responseType, success);
                    if (success) {
                        resolve(response);
                    }
                    else {
                        reject(new AjaxError(response));
                    }
                    _this.xhr = options = null;
                };
                if (!isString(method)) {
                    _this._log.info('AjaxOptions method was not of type string. Defaulting to "GET".');
                    method = 'GET';
                }
                xhr.open(method.toUpperCase(), url, 
                // synchronous XHR not supported 
                true, options.user, options.password);
                var responseType = options.responseType;
                if (!(_this.__fileSupported || responseType === '' || responseType === 'text')) {
                    responseType = '';
                }
                // Android < 4.4 will throw a DOM Exception 12 if responseType is set to json. 
                // The only way to do feature detection is with try/catch. 
                if (responseType === 'json') {
                    try {
                        xhr.responseType = responseType;
                    }
                    catch (e) {
                        xhr.responseType = '';
                    }
                }
                xhr.withCredentials = options.withCredentials;
                var mimeType = options.overrideMimeType, data = options.data;
                if (isString(mimeType) && !isEmpty(mimeType)) {
                    xhr.overrideMimeType(mimeType);
                }
                if (isNull(data) || data === '') {
                    // no data exists so set headers and send request 
                    _this.__setHeaders();
                    xhr.send();
                }
                else {
                    var transforms = options.transforms || [], length_3 = transforms.length, contentType = options.contentType, contentTypeExists = isString(contentType) && !isEmpty(contentType);
                    if (length_3 > 0) {
                        // if data transforms defined, assume they're going to take care of 
                        // any and all transformations. 
                        for (var i = 0; i < length_3; ++i) {
                            data = transforms[i](data, xhr);
                        }
                        // if contentType exists, assume they did not set it in 
                        // their headers as well 
                        if (contentTypeExists) {
                            xhr.setRequestHeader('Content-Type', contentType);
                        }
                        _this.__setHeaders();
                        xhr.send(data);
                    }
                    else if (isObject(data)) {
                        // if isObject and contentType exists we want to transform the data 
                        if (contentTypeExists) {
                            var contentTypeLower = contentType.toLowerCase();
                            if (contentTypeLower.indexOf('x-www-form-urlencoded') !== -1) {
                                // perform an encoded form transformation 
                                data = _this.__serializeFormData();
                                // set Content-Type header because we're assuming they didn't set it 
                                // in their headers object 
                                xhr.setRequestHeader('Content-Type', contentType);
                                _this.__setHeaders();
                                xhr.send(data);
                            }
                            else if (contentTypeLower.indexOf('multipart/form-data') !== -1) {
                                // need to check if File is a supported object 
                                if (_this.__fileSupported) {
                                    // use FormData 
                                    data = _this.__appendFormData();
                                    // do not set the Content-Type header due to modern browsers 
                                    // setting special headers for multipart/form-data 
                                    _this.__setHeaders();
                                    xhr.send(data);
                                }
                                else {
                                    // use iframe trick for older browsers (do not send a request) 
                                    // this case is the reason for this giant, terrible, nested if-else statement 
                                    _this.__submitFramedFormData().then(function (response) {
                                        resolve(response);
                                    }, function () {
                                        _this.xhr = null;
                                    });
                                }
                            }
                            else {
                                // assume stringification is possible 
                                data = JSON.stringify(data);
                                // set Content-Type header because we're assuming they didn't set it 
                                // in their headers object 
                                xhr.setRequestHeader('Content-Type', contentType);
                                _this.__setHeaders();
                                xhr.send(data);
                            }
                        }
                        else {
                            // contentType does not exist so simply set defined headers and send raw data 
                            _this.__setHeaders();
                            xhr.send(data);
                        }
                    }
                    else {
                        // if contentType exists set Content-Type header because we're assuming they didn't set it 
                        // in their headers object 
                        if (contentTypeExists) {
                            xhr.setRequestHeader('Content-Type', contentType);
                        }
                        _this.__setHeaders();
                        xhr.send(data);
                    }
                }
                var timeout = options.timeout;
                if (isNumber(timeout) && timeout > 0) {
                    // we first postpone to avoid always timing out when debugging, though this is not 
                    // a foolproof method. 
                    _this.clearTimeout = postpone(function () {
                        _this.clearTimeout = defer(function () {
                            reject(new AjaxError({
                                response: 'Request timed out in ' + timeout + 'ms for ' + options.url,
                                status: xhr.status,
                                getAllResponseHeaders: function () { return xhr.getAllResponseHeaders(); },
                                xhr: xhr
                            }));
                            xhr.onreadystatechange = null;
                            xhr.abort();
                            _this.xhr = null;
                        }, timeout - 1);
                    });
                }
            });
            promise.initialize(this);
            return promise;
        };
        /**
         */
        HttpRequest.prototype._invalidOptions = function () {
            var _this = this;
            return new AjaxPromise(function (resolve, reject) {
                _this._log.warn('Attempting a request without specifying a url');
                reject(new AjaxError({
                    response: 'Attempting a request without specifying a url',
                    status: null,
                    getAllResponseHeaders: null,
                    xhr: null
                }));
            });
        };
        /**
         * @param {string} responseType The user designated responseType
         * @param {boolean} success Signifies if the response was a success
         */
        HttpRequest.prototype._formatResponse = function (responseType, success) {
            var xhr = this.xhr, status = xhr.status, response = xhr.response;
            // need to try, catch instead of boolean short circuit because chrome doesn't like checking 
            // responseText when the responseType is anything other than empty or 'text' 
            if (isNull(response)) {
                try {
                    response = xhr.responseText;
                }
                catch (e) { }
            }
            if (status === 0) {
                // file protocol issue **Needs to be tested more thoroughly** 
                // ok if response empty, Not Found otherwise 
                status = success ? 200 : 404;
            }
            xhr.onreadystatechange = null;
            if (isFunction(this.clearTimeout)) {
                this.clearTimeout();
            }
            if (responseType === 'json' && isString(response)) {
                try {
                    response = JSON.parse(response);
                }
                catch (e) { }
            }
            return {
                response: response,
                status: status,
                getAllResponseHeaders: function () { return xhr.getAllResponseHeaders(); },
                xhr: xhr
            };
        };
        /**
         */
        HttpRequest.prototype.__setHeaders = function () {
            var headers = this.__options.headers, keys = Object.keys(headers || {}), xhr = this.xhr, length = keys.length, key, i;
            for (i = 0; i < length; ++i) {
                key = keys[i];
                xhr.setRequestHeader(key, headers[key]);
            }
        };
        /**
         */
        HttpRequest.prototype.__serializeFormData = function () {
            var data = this.__options.data, keys = Object.keys(data), key, val, formBuffer = [];
            while (keys.length > 0) {
                key = keys.pop();
                val = data[key];
                if (isNull(val)) {
                    val = '';
                }
                else if (isObject(val)) {
                    // may throw a fatal error but this is an invalid case 
                    this._log.warn('Invalid form entry with key "' + key + '" and value "' + val);
                    val = JSON.stringify(val);
                }
                formBuffer.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
            }
            return formBuffer.join('&').replace(/%20/g, '+');
        };
        /**
         */
        HttpRequest.prototype.__appendFormData = function () {
            var data = this.__options.data, formData = new FormData(), keys = Object.keys(data), key, val;
            while (keys.length > 0) {
                key = keys.pop();
                val = data[key];
                if (isNull(val)) {
                    formData.append(key, '');
                }
                else if (isObject(val)) {
                    if (isFile(val)) {
                        formData.append(key, val, val.name || val.fileName || 'blob');
                    }
                    else {
                        // may throw a fatal error but this is an invalid case 
                        this._log.warn('Invalid form entry with key "' + key + '" and value "' + val);
                        formData.append(key, JSON.stringify(val));
                    }
                }
                else {
                    formData.append(key, val);
                }
            }
            return formData;
        };
        /**
         */
        HttpRequest.prototype.__submitFramedFormData = function () {
            var _this = this;
            var options = this.__options, data = options.data, url = options.url, _document = this._document, $body = _document.body, Promise = acquire(__Promise), form = _document.createElement('form'), iframe = _document.createElement('iframe'), iframeName = uniqueId('iframe_target'), keys = Object.keys(data), key;
            iframe.name = form.target = iframeName;
            iframe.src = 'javascript:false;';
            form.enctype = form.encoding = 'multipart/form-data';
            form.action = url;
            form.method = 'POST';
            form.style.display = 'none';
            while (keys.length > 0) {
                key = keys.pop();
                form.insertBefore(this.__createInput(key, data[key]), null);
            }
            return new Promise(function (resolve, reject) {
                _this.xhr.abort = function () {
                    iframe.onload = null;
                    $body.removeChild(form);
                    $body.removeChild(iframe);
                    reject();
                };
                iframe.onload = function () {
                    var content = iframe.contentDocument.body.innerHTML;
                    $body.removeChild(form);
                    $body.removeChild(iframe);
                    resolve({
                        response: content,
                        status: 200,
                        getAllResponseHeaders: function () { return ''; }
                    });
                    _this.xhr = iframe.onload = null;
                };
                $body.insertBefore(form, null);
                $body.insertBefore(iframe, null);
                form.submit();
            });
        };
        /**
         */
        HttpRequest.prototype.__createInput = function (key, val) {
            var _document = this._document, input = _document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            if (isNull(val)) {
                input.value = '';
            }
            else if (isObject(val)) {
                // check if val is an pseudo File 
                if (isFunction(val.slice) && !(isUndefined(val.name) || isUndefined(val.path))) {
                    var fileList = _document.querySelectorAll('input[type="file"][name="' + key + '"]'), length_4 = fileList.length;
                    // if no inputs found, stringify the data 
                    if (length_4 === 0) {
                        this._log.info('Could not find input[type="file"] with [name="' + key +
                            '"]. Stringifying data instead.');
                        input.value = JSON.stringify(val);
                    }
                    else if (length_4 === 1) {
                        input = fileList[0];
                        // swap nodes 
                        var clone = input.cloneNode(true);
                        input.parentNode.insertBefore(clone, input);
                    }
                    else {
                        // rare case but may have multiple forms with file inputs 
                        // that have the same name 
                        var fileInput, path = val.path;
                        while (length_4-- > 0) {
                            fileInput = fileList[length_4];
                            if (fileInput.value === path) {
                                input = fileInput;
                                // swap nodes 
                                var inputClone = input.cloneNode(true);
                                input.parentNode.insertBefore(inputClone, input);
                                break;
                            }
                        }
                        // could not find the right file 
                        if (length_4 === -1) {
                            this._log.info('Could not find input[type="file"] with [name="' + key + '"] and [value="' +
                                val.path + '"]. Stringifying data instead.');
                            input.value = JSON.stringify(val);
                        }
                    }
                }
                else {
                    // may throw a fatal error but this is an invalid case 
                    this._log.info('Invalid form entry with key "' + key + '" and value "' + val);
                    input.value = JSON.stringify(val);
                }
            }
            else {
                input.value = val;
            }
            return input;
        };
        HttpRequest._inject = {
            _browser: __Browser,
            _window: __Window,
            _document: __Document,
            _config: __HttpConfig,
            _log: __Log
        };
        return HttpRequest;
    })();
    async.HttpRequest = HttpRequest;
    /**
     */
    var AjaxError = (function () {
        /**
         * @param {async.IAjaxResponse} response The IAjaxResponse object.
         */
        function AjaxError(response) {
            /**
             */
            this.name = 'AjaxError';
            Error.apply(this);
            this.response = this.message = response.response;
            this.status = response.status;
            this.getAllResponseHeaders = response.getAllResponseHeaders;
            this.xhr = response.xhr;
        }
        /**
         */
        AjaxError.prototype.toString = function () {
            var response = this.response, responseText = response;
            if (isObject(response) && !response.hasOwnProperty('toString')) {
                responseText = JSON.stringify(response);
            }
            return 'Request failed with status: ' + this.status + ' and response: ' + responseText;
        };
        return AjaxError;
    })();
    async.AjaxError = AjaxError;
    // have to bypass TS flags in order to properly extend Error 
    AjaxError.prototype = Error.prototype;
    /**
     */
    var AjaxPromise = (function (_super) {
        __extends(AjaxPromise, _super);
        function AjaxPromise(resolveFunction, promise) {
            _super.call(this, resolveFunction);
            /**
             */
            this._window = acquire(__Window);
            if (!isNull(promise)) {
                this.__http = promise.__http;
            }
        }
        /**
         * @param {async.HttpRequest} http The http request for this promise.
         */
        AjaxPromise.prototype.initialize = function (http) {
            if (isObject(http) && isNull(this.__http)) {
                this.__http = http;
            }
        };
        /**
         */
        AjaxPromise.prototype.cancel = function () {
            var http = this.__http, xhr = http.xhr, jsonpCallback = http.jsonpCallback;
            if (isFunction(http.clearTimeout)) {
                http.clearTimeout();
            }
            if (!isNull(xhr)) {
                xhr.onreadystatechange = null;
                xhr.abort();
                http.xhr = null;
            }
            else if (!isNull(jsonpCallback)) {
                this._window[jsonpCallback] = noop;
            }
            this.__subscribers = [];
        };
        AjaxPromise.prototype.then = function (onFulfilled, onRejected) {
            return _super.prototype.then.call(this, onFulfilled, onRejected);
        };
        AjaxPromise.prototype.catch = function (onRejected) {
            return _super.prototype.catch.call(this, onRejected);
        };
        return AjaxPromise;
    })(Promise);
    async.AjaxPromise = AjaxPromise;
    /**
     */
    var Http = (function () {
        function Http() {
            /**
             */
            this.responseType = {
                DEFAULT: '',
                ARRAYBUFFER: 'arraybuffer',
                BLOB: 'blob',
                DOCUMENT: 'document',
                JSON: 'json',
                TEXT: 'text'
            };
            /**
             */
            this.contentType = {
                ENCODED_FORM: 'application/x-www-form-urlencoded;charset=utf-8',
                JSON: 'application/json;charset=utf-8',
                MULTIPART_FORM: 'multipart/form-data',
                OCTET_STREAM: 'application/octet-stream;charset=utf-8',
                XML: 'application/xml;charset=utf-8',
                PLAIN_TEXT: 'text/plain',
                HTML: 'text/html'
            };
        }
        /**
         * @param {async.IHttpConfig} options The IHttpConfig for either the XMLHttpRequest
         * or the JSONP callback.
         */
        Http.prototype.ajax = function (options) {
            var request = acquire(__HttpRequestInstance);
            request.initialize(options);
            return request.execute();
        };
        /**
         * @param {async.IJsonpConfig} options The IJsonpConfig
         */
        Http.prototype.jsonp = function (options) {
            var request = acquire(__HttpRequestInstance);
            request.initialize(options);
            return request.executeJsonp();
        };
        /**
         * @param {async.IHttpConfig} options The IHttpConfig
         * for either the XMLHttpRequest or the JSONP callback.
         */
        Http.prototype.json = function (options) {
            var request = acquire(__HttpRequestInstance);
            request.initialize(_extend(false, false, {}, options, { responseType: 'json' }));
            return request.execute();
        };
        /**
         */
        Http.config = {
            url: null,
            method: 'GET',
            responseType: '',
            transforms: [],
            headers: {},
            withCredentials: false,
            timeout: null,
            jsonpIdentifier: 'callback',
            contentType: 'application/json;charset=utf-8'
        };
        return Http;
    })();
    async.Http = Http;
    register.injectable(__Http, Http);
    register.injectable(__HttpRequestInstance, HttpRequest, null, __INSTANCE);
    /**
     */
    function IHttpConfig() {
        return Http.config;
    }
    async.IHttpConfig = IHttpConfig;
    register.injectable(__HttpConfig, IHttpConfig);
})(async = exports.async || (exports.async = {}));
/**
 */
var storage;
(function (storage_1) {
    /**
     */
    var caches = {}, 
    /**
     */
    internalCaches = {};
    /**
     */
    var Cache = (function () {
        /**
         * @param {string} id The id to use to retrieve the cache from the ICacheFactory.
         * @param {storage.ICacheOptions} options The ICacheOptions for customizing the cache.
         */
        function Cache(uid, options) {
            this.__uid = uid;
            this.__options = options;
            this.__size = 0;
            if (isNull(options)) {
                this.__options = {
                    timeout: 0
                };
            }
            internalCaches[uid] = {};
        }
        /**
         * @param {string} uid The ID of the new Cache.
         * @param {storage.ICacheOptions} options ICacheOptions
         * for customizing the Cache.
         */
        Cache.create = function (uid, options) {
            var cache = caches[uid];
            if (isNull(cache)) {
                cache = caches[uid] = new Cache(uid, options);
            }
            return cache;
        };
        /**
         * @param {string} uid The identifier used to search for the cache.
         */
        Cache.fetch = function (uid) {
            return caches[uid];
        };
        /**
         */
        Cache.clear = function () {
            var keys = Object.keys(caches), length = keys.length;
            for (var i = 0; i < length; ++i) {
                caches[keys[i]].clear();
            }
            caches = {};
        };
        /**
         */
        Cache.prototype.info = function () {
            return {
                uid: this.__uid,
                size: this.__size,
                options: this.__options
            };
        };
        /**
         * @param {string} key The key to use for storage/retrieval of the object.
         * @param {T} value The value to store with the associated key.
         */
        Cache.prototype.put = function (key, value) {
            var val = internalCaches[this.__uid][key];
            internalCaches[this.__uid][key] = value;
            if (isUndefined(val)) {
                this.__size++;
            }
            var timeout = this.__options.timeout;
            if (isNumber(timeout) && timeout > 0) {
                defer(this.remove, timeout, [key], this);
            }
            return value;
        };
        /**
         * @param key The key to search for in an Cache.
         */
        Cache.prototype.read = function (key) {
            return internalCaches[this.__uid][key];
        };
        /**
         * @param {string} key The key to remove from the Cache.
         */
        Cache.prototype.remove = function (key) {
            deleteProperty(internalCaches[this.__uid], key);
            this.__size--;
        };
        /**
         */
        Cache.prototype.clear = function () {
            internalCaches[this.__uid] = {};
            this.__size = 0;
        };
        /**
         */
        Cache.prototype.dispose = function () {
            this.clear();
            deleteProperty(caches, this.__uid);
        };
        return Cache;
    })();
    storage_1.Cache = Cache;
    /**
     */
    function ICacheFactory() {
        return Cache;
    }
    storage_1.ICacheFactory = ICacheFactory;
    register.injectable(__CacheFactory, ICacheFactory, null, __FACTORY);
    /**
     */
    storage_1.managerCache = Cache.create('__managerCache');
    /**
     */
    function IManagerCache() {
        return storage_1.managerCache;
    }
    storage_1.IManagerCache = IManagerCache;
    register.injectable(__ManagerCache, IManagerCache);
    /**
     */
    var TemplateCache = (function (_super) {
        __extends(TemplateCache, _super);
        /**
         */
        function TemplateCache() {
            _super.call(this, '__templateCache');
        }
        TemplateCache.prototype.put = function (key, value) {
            var Promise = this._Promise;
            _super.prototype.put.call(this, key, Promise.resolve(value));
            if (isDocumentFragment(value)) {
                value = value.cloneNode(true);
            }
            else if (isNode(value)) {
                var fragment = document.createDocumentFragment();
                fragment.appendChild(value.cloneNode(true));
                value = fragment;
            }
            else if (isString(value) || isNull(value)) {
                value = serializeHtml(value);
            }
            return Promise.resolve(value);
        };
        /**
         * @param {string} key The key to search for in this cache.
         */
        TemplateCache.prototype.read = function (key) {
            var _this = this;
            var promise = _super.prototype.read.call(this, key);
            if (isNull(promise)) {
                return this._Promise.reject(null);
            }
            return promise.then(function (node) {
                return _this.put(key, node);
            }, function (error) {
                _this._log.warn('Error retrieving template, ' + key + ', from promise.');
                return null;
            });
        };
        TemplateCache._inject = {
            _Promise: __Promise,
            _log: __Log
        };
        return TemplateCache;
    })(Cache);
    storage_1.TemplateCache = TemplateCache;
    register.injectable(__TemplateCache, TemplateCache);
    /**
     */
    var BaseStorage = (function () {
        /**
         */
        function BaseStorage(storage) {
            var _this = this;
            this._storage = storage;
            forEach(function (value, key) {
                _this[key] = value;
            }, storage);
        }
        Object.defineProperty(BaseStorage.prototype, "length", {
            /**
             */
            get: function () {
                return this._storage.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         */
        BaseStorage.prototype.clear = function () {
            this._storage.clear();
        };
        /**
         * @param {string} key The key of the item to retrieve from storage.
         */
        BaseStorage.prototype.getItem = function (key) {
            return this._storage.getItem(key);
        };
        /**
         * @param {number} index The index used to retrieve the associated key.
         */
        BaseStorage.prototype.key = function (index) {
            return this._storage.key(index);
        };
        /**
         * @param {string} key The key of the item to remove from storage.
         */
        BaseStorage.prototype.removeItem = function (key) {
            this._storage.removeItem(key);
        };
        /**
         * @param {string} key The key of the item to store in storage.
         * @param {any} data The data to store in storage with the key.
         */
        BaseStorage.prototype.setItem = function (key, data) {
            this._storage.setItem(key, data);
            this[key] = this.getItem(key);
        };
        return BaseStorage;
    })();
    storage_1.BaseStorage = BaseStorage;
    /**
     */
    var LocalStorage = (function (_super) {
        __extends(LocalStorage, _super);
        function LocalStorage() {
            _super.call(this, acquire(__Window).localStorage);
        }
        return LocalStorage;
    })(BaseStorage);
    storage_1.LocalStorage = LocalStorage;
    register.injectable(__LocalStorage, LocalStorage);
    /**
     */
    var SessionStorage = (function (_super) {
        __extends(SessionStorage, _super);
        function SessionStorage() {
            _super.call(this, acquire(__Window).sessionStorage);
        }
        return SessionStorage;
    })(BaseStorage);
    storage_1.SessionStorage = SessionStorage;
    register.injectable(__SessionStorage, SessionStorage);
})(storage = exports.storage || (exports.storage = {}));
/* tslint:disable:no-unused-variable */
/**
 */
var OPERATORS = {
    'u+': {
        precedence: 4, associativity: 'rtl',
        fn: function (context, aliases, a) {
            return +a(context, aliases);
        }
    },
    '+': {
        precedence: 6, associativity: 'ltr',
        fn: function (context, aliases, a, b) {
            return a(context, aliases) + b(context, aliases);
        }
    },
    'u-': {
        precedence: 4, associativity: 'rtl',
        fn: function (context, aliases, a) {
            return -a(context, aliases);
        }
    },
    '-': {
        precedence: 6, associativity: 'ltr',
        fn: function (context, aliases, a, b) {
            return a(context, aliases) - b(context, aliases);
        }
    },
    '*': {
        precedence: 5, associativity: 'ltr',
        fn: function (context, aliases, a, b) {
            return a(context, aliases) * b(context, aliases);
        }
    },
    '/': {
        precedence: 5, associativity: 'ltr',
        fn: function (context, aliases, a, b) {
            return a(context, aliases) / b(context, aliases);
        }
    },
    '%': {
        precedence: 5, associativity: 'ltr',
        fn: function (context, aliases, a, b) {
            return a(context, aliases) % b(context, aliases);
        }
    },
    '?': {
        precedence: 15, associativity: 'rtl',
        fn: function () { return undefined; }
    },
    ':': {
        precedence: 15, associativity: 'rtl',
        fn: function () { return undefined; }
    },
    '>': {
        precedence: 8, associativity: 'ltr',
        fn: function (context, aliases, a, b) {
            return a(context, aliases) > b(context, aliases);
        }
    },
    '<': {
        precedence: 8, associativity: 'ltr',
        fn: function (context, aliases, a, b) {
            return a(context, aliases) < b(context, aliases);
        }
    },
    '!': {
        precedence: 4, associativity: 'rtl',
        fn: function (context, aliases, a) {
            return !a(context, aliases);
        }
    },
    '~': {
        precedence: 4, associativity: 'rtl',
        fn: function (context, aliases, a) {
            return ~a(context, aliases);
        }
    },
    '&': {
        precedence: 10, associativity: 'ltr',
        fn: function (context, aliases, a, b) {
            return a(context, aliases) & b(context, aliases);
        }
    },
    '|': {
        precedence: 12, associativity: 'ltr',
        fn: function (context, aliases, a, b) {
            return a(context, aliases) | b(context, aliases);
        }
    },
    '>>': {
        precedence: 7, associativity: 'ltr',
        fn: function (context, aliases, a, b) {
            return a(context, aliases) >> b(context, aliases);
        }
    },
    '<<': {
        precedence: 7, associativity: 'ltr',
        fn: function (context, aliases, a, b) {
            return a(context, aliases) << b(context, aliases);
        }
    },
    '>>>': {
        precedence: 7, associativity: 'ltr',
        fn: function (context, aliases, a, b) {
            return a(context, aliases) >>> b(context, aliases);
        }
    },
    '&&': {
        precedence: 13, associativity: 'ltr',
        fn: function (context, aliases, a, b) {
            return a(context, aliases) && b(context, aliases);
        }
    },
    '||': {
        precedence: 14, associativity: 'ltr',
        fn: function (context, aliases, a, b) {
            return a(context, aliases) || b(context, aliases);
        }
    },
    '==': {
        precedence: 9, associativity: 'ltr',
        /* tslint:disable:triple-equals */
        fn: function (context, aliases, a, b) {
            return a(context, aliases) == b(context, aliases);
        }
    },
    '===': {
        precedence: 9, associativity: 'ltr',
        fn: function (context, aliases, a, b) {
            return a(context, aliases) === b(context, aliases);
        }
    },
    '!=': {
        precedence: 9, associativity: 'ltr',
        /* tslint:disable:triple-equals */
        fn: function (context, aliases, a, b) {
            return a(context, aliases) != b(context, aliases);
        }
    },
    '!==': {
        precedence: 9, associativity: 'ltr',
        fn: function (context, aliases, a, b) {
            return a(context, aliases) !== b(context, aliases);
        }
    },
    '>=': {
        precedence: 8, associativity: 'ltr',
        fn: function (context, aliases, a, b) {
            return a(context, aliases) >= b(context, aliases);
        }
    },
    '<=': {
        precedence: 8, associativity: 'ltr',
        fn: function (context, aliases, a, b) {
            return a(context, aliases) <= b(context, aliases);
        }
    },
    '=': {
        precedence: 17, associativity: 'rtl',
        fn: function (context, aliases, a, b) {
            var _log = acquire(__Log);
            _log.error(new Error('Assignment operators are not supported'));
        }
    },
    '++': {
        precedence: 3, associativity: '',
        fn: function (context, aliases, a) {
            var _log = acquire(__Log);
            _log.error(new Error('Assignment operators are not supported'));
        }
    },
    '--': {
        precedence: 3, associativity: '',
        fn: function (context, aliases, a) {
            var _log = acquire(__Log);
            _log.error(new Error('Assignment operators are not supported'));
        }
    },
    '+=': {
        precedence: 17, associativity: 'rtl',
        fn: function (context, aliases, a, b) {
            var _log = acquire(__Log);
            _log.error(new Error('Assignment operators are not supported'));
        }
    },
    '-=': {
        precedence: 17, associativity: 'rtl',
        fn: function (context, aliases, a, b) {
            var _log = acquire(__Log);
            _log.error(new Error('Assignment operators are not supported'));
        }
    },
    '*=': {
        precedence: 17, associativity: 'rtl',
        fn: function (context, aliases, a, b) {
            var _log = acquire(__Log);
            _log.error(new Error('Assignment operators are not supported'));
        }
    },
    '/=': {
        precedence: 17, associativity: 'rtl',
        fn: function (context, aliases, a, b) {
            var _log = acquire(__Log);
            _log.error(new Error('Assignment operators are not supported'));
        }
    },
    '%=': {
        precedence: 17, associativity: 'rtl',
        fn: function (context, aliases, a, b) {
            var _log = acquire(__Log);
            _log.error(new Error('Assignment operators are not supported'));
        }
    }
};
/**
 */
var ACCESSORS = {
    '()': { precedence: 2, associativity: null, fn: null },
    '[]': { precedence: 2, associativity: null, fn: null },
    '.': { precedence: 2, associativity: null, fn: null },
    '{}': { precedence: 1, associativity: null, fn: null }
};
/**
 */
var DELIMITERS = {
    '{': { precedence: 1, associativity: null, fn: null },
    '}': { precedence: 1, associativity: null, fn: null },
    '[': { precedence: 2, associativity: null, fn: null },
    ']': { precedence: 2, associativity: null, fn: null },
    '(': { precedence: 2, associativity: null, fn: null },
    ')': { precedence: 2, associativity: null, fn: null },
    '.': { precedence: 2, associativity: null, fn: null },
    ',': { precedence: 18, associativity: null, fn: null },
    '\'': { precedence: 0, associativity: null, fn: null },
    '"': { precedence: 0, associativity: null, fn: null }
};
/**
 */
var KEYWORDS = {
    false: false,
    true: true,
    null: null,
    undefined: 'undefined'
};
/**
 * @param {string} key The string to index into the DELIMITERS array.
 */
function isDelimiter(key) {
    return !isNull(DELIMITERS[key]);
}
/**
 * @param {string} key The string to index into the ACCESSORS array.
 */
function isAccessor(key) {
    return !isNull(ACCESSORS[key]);
}
/**
 * @param {string} key The string to index into the OPERATORS array.
 */
function isOperator(key) {
    return !isNull(OPERATORS[key]);
}
/**
 * @param {string} key The string to index into the KEYWORDS array.
 */
function isKeyword(key) {
    return !isUndefined(KEYWORDS[key]);
}
/* tslint:enable:no-unused-variable */
/**
 */
var observable;
(function (observable) {
    /**
     */
    var arrayMethods = ['push', 'pop', 'reverse', 'shift', 'sort', 'splice', 'unshift'];
    /**
     */
    var ContextManager = (function () {
        function ContextManager() {
            /**
             */
            this._compat = acquire(__Compat);
            /**
             */
            this.__identifiers = {};
            /**
             */
            this.__identifierHash = {};
            /**
             */
            this.__lengthListeners = {};
            /**
             */
            this.__contextObjects = {};
            /**
             */
            this.__isArrayFunction = false;
        }
        /**
         * @param {Control} control The control on which to locate the ContextManager.
         */
        ContextManager.getManager = function (control) {
            var contextManager, managers = ContextManager.__managers, uid = control.uid, manager = managers[uid];
            if (!isNull(manager)) {
                contextManager = manager;
                return contextManager;
            }
            contextManager = managers[uid] = new ContextManager();
            contextManager.context = control;
            return contextManager;
        };
        ContextManager.dispose = function (control) {
            if (isNull(control)) {
                return;
            }
            var uid = control.uid, controls = ContextManager.__controls, identifiers = controls[uid] || {}, managers = ContextManager.__managers, manager = managers[uid];
            if (!isNull(manager)) {
                manager.dispose();
                deleteProperty(managers, uid);
            }
            var keys = Object.keys(identifiers), listeners;
            while (keys.length > 0) {
                listeners = identifiers[keys.shift()];
                while (listeners.length > 0) {
                    listeners.shift()();
                }
            }
            deleteProperty(controls, uid);
            if (!isNull(control.context)) {
                ContextManager.unObserve(control.context);
                ContextManager.defineProperty(control, __CONTEXT, control.context, true, true, true);
            }
        };
        /**
         * @param {string} absoluteIdentifier The identifier used to locate the array.
         * @param {string} uid The uid used to search for listeners.
         */
        ContextManager.removeArrayListeners = function (absoluteIdentifier, uid) {
            var listeners = ContextManager.arrayChangeListeners[absoluteIdentifier];
            if (!isNull(listeners)) {
                deleteProperty(listeners, uid);
            }
        };
        /**
         * @param {any} rootContext The root object in which to find a local context.
         * @param {Array<string>} split The string array containing properties used to index into
         * the rootContext.
         */
        ContextManager.getContext = function (rootContext, split) {
            if (isNull(rootContext)) {
                return rootContext;
            }
            split = split.slice(0);
            while (split.length > 0) {
                rootContext = rootContext[split.shift()];
                if (isNull(rootContext)) {
                    return rootContext;
                }
            }
            return rootContext;
        };
        /**
         * @param {any} obj The object on which to define the property.
         * @param {string} key The property key.
         * @param {any} value The value used to define the property.
         * @param {boolean} enumerable? Whether or not the property should be enumerable (able to be iterated
         * over in a loop)
         * @param {boolean} configurable? Whether or not the property is able to be reconfigured.
         * @param {boolean} writable? Whether or not assignment operators work on the property.
         */
        ContextManager.defineProperty = function (obj, key, value, enumerable, configurable, writable) {
            _defineProperty(obj, key, value, enumerable, configurable, writable);
        };
        /**
         * @param {any} obj The object on which to define the property.
         * @param {string} key The property key.
         * @param {any} value The value used to define the property.
         * @param {boolean} enumerable? Whether or not the property should be enumerable (able to be iterated
         * over in a loop)
         * @param {boolean} configurable? Whether or not the property is able to be reconfigured.
         */
        ContextManager.defineGetter = function (obj, key, value, enumerable, configurable) {
            _defineGetter(obj, key, value, enumerable, configurable);
        };
        /**
         * @param {string} identifer The identifier for which the remove listener is being pushed.
         * @param {string} uid The unique ID of the control observing the identifier.
         * @param {IRemoveListener} listener The function for removing the observed property.
         */
        ContextManager.pushRemoveListener = function (identifier, uid, listener) {
            var controls = ContextManager.__controls, control = controls[uid], listeners;
            if (isNull(control)) {
                control = controls[uid] = {};
            }
            listeners = control[identifier];
            if (isNull(listeners)) {
                listeners = control[identifier] = [];
            }
            listeners.push(listener);
        };
        /**
         * @param {string} identifer The identifier for which the remove listener is being spliced.
         * @param {string} uid The unique ID of the control observing the identifier.
         * @param {IRemoveListener} listener The function for removing the observed property.
         */
        ContextManager.spliceRemoveListener = function (identifier, uid, listener) {
            var controls = ContextManager.__controls, control = controls[uid], listeners;
            if (isNull(control)) {
                return;
            }
            listeners = control[identifier];
            if (isNull(listeners)) {
                return;
            }
            var index = listeners.indexOf(listener);
            if (index === -1) {
                return;
            }
            listeners.splice(index, 1);
            if (listeners.length === 0) {
                deleteProperty(control, identifier);
            }
        };
        /**
         * @param {Array<string>} uids The set of unique Ids for which to remove the specified identifier.
         * @param {string} identifier The identifier to stop observing.
         */
        ContextManager.removeIdentifier = function (uids, identifier) {
            var length = uids.length, controls = ContextManager.__controls, identifiers;
            for (var i = 0; i < length; ++i) {
                identifiers = controls[uids[i]];
                if (isNull(identifiers)) {
                    continue;
                }
                deleteProperty(identifiers, identifier);
            }
        };
        /**
         * @param {ui.TemplateControl} control The TemplateControl
         * on which to create the context.
         * @param {string} identifier The period-delimited identifier string used to create
         * the context path.
         */
        ContextManager.createContext = function (control, identifier) {
            var context = control.context;
            if (!isObject(context)) {
                if (isNull(context)) {
                    context = control.context = {};
                }
                else {
                    ContextManager._log.warn('A child control is trying to create a child context that has ' +
                        'a parent control with a primitive type context');
                    return;
                }
            }
            var split = identifier.split('.'), property, temp;
            while (split.length > 0) {
                property = split.shift();
                temp = context[property];
                if (isNull(temp)) {
                    if (isNumber(Number(split[0]))) {
                        temp = context[property] = [];
                    }
                    else {
                        temp = context[property] = {};
                    }
                }
                context = temp;
            }
            return context;
        };
        /**
         * @param {any} obj The object to stop observing.
         */
        ContextManager.unObserve = function (obj) {
            _extend(true, true, obj);
        };
        /**
         * @param {Array<string>} split The string array containing properties used to index into
         * the context.
         * @param {boolean} observe? Whether or not to observe the identifier indicated by the
         * split Array.
         */
        ContextManager.prototype.getContext = function (split, observe) {
            return this._getContext(split.join('.'), split, observe);
        };
        /**
         * @param {string} absoluteIdentifier The period-delimited identifier noting the property to be observed.
         * @param {observable.IListener} observableListener An object implmenting IObservableListener. The listener will be
         * notified of object changes.
         */
        ContextManager.prototype.observe = function (absoluteIdentifier, observableListener) {
            var _this = this;
            if (isEmpty(absoluteIdentifier)) {
                return noop;
            }
            var split = absoluteIdentifier.split('.'), key = split.pop(), isLength = key === 'length', hasIdentifier = this._hasIdentifier(absoluteIdentifier), hasObservableListener = !isNull(observableListener), join, context;
            if (split.length > 0) {
                join = split.join('.');
                context = this._getContext(join, split, true);
            }
            else {
                join = key;
                context = this.context;
            }
            if (!isObject(context)) {
                if (hasObservableListener) {
                    if (isLength) {
                        this.__lengthListeners[absoluteIdentifier] = observableListener;
                        ContextManager.pushRemoveListener(absoluteIdentifier, observableListener.uid, function () {
                            deleteProperty(_this.__lengthListeners, absoluteIdentifier);
                        });
                    }
                    return this._addObservableListener(absoluteIdentifier, observableListener, isLength);
                }
                return noop;
            }
            // set observedIdentifier to null 
            this.__observedIdentifier = null;
            this.__contextObjects[absoluteIdentifier] = context[key];
            // if observedIdentifier is not null, the primitive is already being watched 
            var observedIdentifier = this.__observedIdentifier, isObserved = !isNull(observedIdentifier), removeCallback = noop;
            if (isObserved) {
                hasIdentifier = true;
            }
            if (hasObservableListener) {
                var removeObservedCallback = noop, removeAbsoluteCallback = this._addObservableListener(absoluteIdentifier, observableListener, isLength);
                if (isObserved && absoluteIdentifier !== observedIdentifier) {
                    removeObservedCallback = this._addObservableListener(observedIdentifier, observableListener, isLength);
                }
                removeCallback = function () {
                    removeAbsoluteCallback();
                    removeObservedCallback();
                };
            }
            var parentIsArray = isArray(context), removeObservableListener = removeCallback, removeListener = noop, removeArrayObserve = noop, numKey = Number(key);
            if (parentIsArray && numKey >= context.length) {
                removeListener = this.observe(join + '.length', {
                    uid: observableListener.uid,
                    listener: function (newValue, oldValue) {
                        if (numKey >= newValue) {
                            return;
                        }
                        removeListener();
                        _this._define(absoluteIdentifier, context, key);
                    }
                });
                removeCallback = function () {
                    removeObservableListener();
                    removeListener();
                };
            }
            else if (!hasIdentifier) {
                // check if value is defined and context manager hasn't seen this identifier 
                if (parentIsArray && isLength) {
                    var property = split.pop(), parentContext = this.getContext(split, false);
                    this.__observedIdentifier = null;
                    access(parentContext, property);
                    if (isString(this.__observedIdentifier)) {
                        join = this.__observedIdentifier;
                    }
                    if (hasObservableListener) {
                        var uid = observableListener.uid;
                        removeListener = this.observeArrayMutation(uid, noop, join, context, null);
                        removeArrayObserve = this.observe(join, {
                            uid: uid,
                            listener: function (newValue, oldValue) {
                                removeListener();
                                removeListener = _this.observeArrayMutation(uid, noop, join, newValue, oldValue);
                            }
                        });
                    }
                    removeCallback = function () {
                        removeObservableListener();
                        removeArrayObserve();
                        removeListener();
                    };
                }
                else {
                    this._define(absoluteIdentifier, context, key);
                }
            }
            return removeCallback;
        };
        /**
         * @param {string} uid The unique ID of the object observing the array.
         * @param {(changes: Array<observable.IArrayChanges<any>>) => void} listener The callback for after
         * when an observed Array function has been called.
         * @param {string} absoluteIdentifier The identifier from the root context used to find the array.
         * @param {Array<any>} array The array to be observed.
         * @param {Array<any>} oldArray The old array to stop observing.
         */
        ContextManager.prototype.observeArrayMutation = function (uid, listener, absoluteIdentifier, array, oldArray) {
            if (isArray(oldArray)) {
                this._restoreArray(oldArray);
            }
            if (isNull(array)) {
                return noop;
            }
            var split = absoluteIdentifier.split('.'), property = split.pop(), context = this.getContext(split, false);
            this.__observedIdentifier = null;
            access(context, property);
            if (isString(this.__observedIdentifier)) {
                absoluteIdentifier = this.__observedIdentifier;
            }
            var removeListeners = [];
            if (isFunction(listener)) {
                removeListeners.push(this._pushArrayListener(uid, absoluteIdentifier, listener));
            }
            this._overwriteArray(absoluteIdentifier, array);
            return function () {
                while (removeListeners.length > 0) {
                    removeListeners.pop()();
                }
            };
        };
        /**
         */
        ContextManager.prototype.dispose = function () {
            this.context = null;
            this.__identifiers = {};
            this.__identifierHash = {};
            this.__contextObjects = {};
        };
        /**
         * @param {string} uid The unique identifier to store the callback.
         * @param {string} absoluteIdentifier The identifier of the Array being observed.
         * @param {(changes: Array<observable.IArrayChanges<any>>) => void} listener The Array mutation listener.
         */
        ContextManager.prototype._pushArrayListener = function (uid, absoluteIdentifier, listener) {
            var arrayListeners = ContextManager.arrayChangeListeners, arrayCallbacks = arrayListeners[absoluteIdentifier];
            if (isNull(arrayCallbacks)) {
                arrayCallbacks = arrayListeners[absoluteIdentifier] = {};
            }
            var callbacks = arrayCallbacks[uid];
            if (isNull(callbacks)) {
                callbacks = arrayCallbacks[uid] = [];
            }
            var listenerRemoved = false, removeListener = function () {
                if (listenerRemoved) {
                    return;
                }
                listenerRemoved = true;
                ContextManager.spliceRemoveListener(absoluteIdentifier, uid, removeListener);
                var index = callbacks.indexOf(listener);
                if (index === -1) {
                    return;
                }
                callbacks.splice(index, 1);
                if (callbacks.length === 0) {
                    deleteProperty(arrayCallbacks, uid);
                    if (isEmpty(arrayCallbacks)) {
                        deleteProperty(arrayListeners, absoluteIdentifier);
                    }
                }
            };
            callbacks.push(listener);
            ContextManager.pushRemoveListener(absoluteIdentifier, uid, removeListener);
            return removeListener;
        };
        /**
         * @param {Array<any>} array The array to restore.
         */
        ContextManager.prototype._restoreArray = function (array) {
            var _compat = this._compat;
            if (_compat.setProto) {
                Object.setPrototypeOf(array, Object.create(Array.prototype));
            }
            else if (_compat.proto) {
                array.__proto__ = Object.create(Array.prototype);
            }
            else {
                var length_5 = arrayMethods.length, method;
                for (var i = 0; i < length_5; ++i) {
                    method = arrayMethods[i];
                    array[method] = Array.prototype[method];
                }
            }
        };
        /**
         * @param {string} absoluteIdentifier The identifier for the Array off context.
         * @param {Array<any>} array The array to overwrite.
         */
        ContextManager.prototype._overwriteArray = function (absoluteIdentifier, array) {
            var _compat = this._compat, length = arrayMethods.length, method, i;
            if (_compat.proto) {
                var obj = Object.create(Array.prototype);
                for (i = 0; i < length; ++i) {
                    method = arrayMethods[i];
                    obj[method] = this._overwriteArrayFunction(absoluteIdentifier, method);
                }
                if (_compat.setProto) {
                    Object.setPrototypeOf(array, obj);
                }
                else {
                    array.__proto__ = obj;
                }
                return;
            }
            for (i = 0; i < length; ++i) {
                method = arrayMethods[i];
                ContextManager.defineProperty(array, method, this._overwriteArrayFunction(absoluteIdentifier, method), false, true, true);
            }
        };
        /**
         * @param {string} identifier The identifier for which we're getting the context.
         * @param {Array<string>} split The string array containing properties used to index into
         * the context.
         * @param {boolean} observe? Whether or not to observe the identifier indicated by the
         * split Array.
         */
        ContextManager.prototype._getContext = function (identifier, split, observe) {
            var context = this.__contextObjects[identifier];
            if (isNull(context)) {
                if (observe === true) {
                    context = this.__contextObjects[identifier] = this._observeImmediateContext(split, identifier);
                }
                else {
                    context = this._getImmediateContext(split);
                }
            }
            return context;
        };
        /**
         * @param {Array<string>} split The string array containing properties used to index into
         * the context.
         */
        ContextManager.prototype._getImmediateContext = function (split) {
            var context = this.context;
            while (split.length > 0) {
                context = context[split.shift()];
                if (isNull(context)) {
                    break;
                }
            }
            return context;
        };
        /**
         * @param {Array<string>} split The identifier's split string array containing properties
         * used to index into the context.
         * @param {string} identifier The identifier being observed.
         */
        ContextManager.prototype._observeImmediateContext = function (split, identifier) {
            if (isNull(this.__identifiers[identifier])) {
                this.observe(identifier, null);
            }
            return this._getImmediateContext(split);
        };
        /**
         * @param {Array<string>} split The split identifier of the property that changed.
         * @param {any} newRootContext The new context.
         * @param {any} oldRootContext The old context.
         */
        ContextManager.prototype._getValues = function (split, newRootContext, oldRootContext) {
            var property, doNew = isObject(newRootContext), doOld = isObject(oldRootContext);
            while (split.length > 1) {
                property = split.shift();
                if (doNew) {
                    newRootContext = newRootContext[property];
                    if (isNull(newRootContext)) {
                        doNew = false;
                    }
                }
                if (doOld) {
                    oldRootContext = oldRootContext[property];
                    if (isNull(oldRootContext)) {
                        doOld = false;
                    }
                }
                if (!(doNew || doOld)) {
                    break;
                }
            }
            property = split[0];
            var newValue, oldValue;
            if (!isNull(newRootContext)) {
                newValue = newRootContext[property];
            }
            if (!isNull(oldRootContext)) {
                oldValue = oldRootContext[property];
            }
            return {
                newValue: newValue,
                oldValue: oldValue
            };
        };
        /**
         * @param {string} identifier The identifier for the property that changed.
         * @param {any} newValue The new value of the property.
         * @param {any} oldValue The old value of the property.
         * @param {Array<string>} mappings? An array of mapped child identifier keys to notify.
         */
        ContextManager.prototype._notifyChildProperties = function (identifier, newValue, oldValue, mappings) {
            var _this = this;
            mappings = mappings || Object.keys(this.__identifierHash[identifier] || {});
            var length = mappings.length, binding, property, parentProperty, split, values = {}, value, period = '.', lengthStr = 'length', key, keyIsLength, start = identifier.length + 1, newParent, oldParent, newChild, oldChild;
            for (var i = 0; i < length; ++i) {
                binding = mappings[i];
                property = binding.slice(start);
                split = property.split(period);
                key = split.pop();
                keyIsLength = (key === lengthStr);
                parentProperty = split.join(period);
                if (isEmpty(parentProperty)) {
                    newParent = newValue;
                    oldParent = oldValue;
                    newChild = isNull(newParent) ? undefined : newParent[key];
                    oldChild = isNull(oldParent) ? undefined : oldParent[key];
                    if (keyIsLength && !isArray(oldParent) && isArray(newParent)) {
                        var lengthListener = this.__lengthListeners[binding];
                        if (!isNull(lengthListener)) {
                            var uid = lengthListener.uid;
                            var arraySplit = identifier.split(period), arrayKey = arraySplit.pop();
                            var join = arraySplit.join(period);
                            var arrayParent = this._getContext(join, arraySplit, false);
                            this.__observedIdentifier = null;
                            access(arrayParent, arrayKey);
                            if (isString(this.__observedIdentifier)) {
                                join = this.__observedIdentifier;
                            }
                            var removeListener = this.observeArrayMutation(uid, noop, join, newParent, null);
                            this.observe(join, {
                                uid: uid,
                                listener: function (nValue, oValue) {
                                    removeListener();
                                    removeListener = _this.observeArrayMutation(uid, noop, join, nValue, oValue);
                                }
                            });
                            deleteProperty(this.__lengthListeners, binding);
                        }
                    }
                }
                else {
                    value = values[parentProperty];
                    if (isNull(value)) {
                        value = values[parentProperty] = this._getValues(split, newValue, oldValue);
                    }
                    newParent = value.newValue;
                    oldParent = value.oldValue;
                    newChild = isNull(newParent) ? newParent : newParent[key];
                    oldChild = isNull(oldParent) ? oldParent : oldParent[key];
                }
                values[property] = {
                    newValue: newChild,
                    oldValue: oldChild
                };
                if (isObject(newParent) && (!isArray(newParent) || newParent.length > key)) {
                    this._define(binding, newParent, key);
                }
                this._execute(binding, newChild, oldChild);
            }
            values = null;
        };
        /**
         * @param {string} absoluteIdentifier The identifier being observed.
         * @param {observable.IListener} observableListener The function and associated unique ID to be fired
         * for this identifier.
         * @param {boolean} isLength? Indicates the property being observed is an Array's length.
         */
        ContextManager.prototype._addObservableListener = function (absoluteIdentifier, observableListener, isLength) {
            var _this = this;
            if (isLength === true) {
                var split = absoluteIdentifier.split('.');
                // pop length key 
                split.pop();
                var property = split.pop(), context = this.getContext(split, false);
                if (isObject(context)) {
                    this.__observedIdentifier = null;
                    access(context, property);
                    if (isString(this.__observedIdentifier)) {
                        absoluteIdentifier = this.__observedIdentifier + (isLength === true ? '.length' : '');
                    }
                }
            }
            this.__add(absoluteIdentifier, observableListener);
            var uid = observableListener.uid, remove = function () {
                ContextManager.spliceRemoveListener(absoluteIdentifier, uid, remove);
                _this._removeCallback(absoluteIdentifier, observableListener);
            };
            ContextManager.pushRemoveListener(absoluteIdentifier, uid, remove);
            return remove;
        };
        /**
         * @param {string} identifier The full identifier path for the property being observed.
         * @param {any} immediateContext The object whose property will be observed.
         * @param {string} key The property key for the value on the immediateContext that's
         * being observed.
         */
        ContextManager.prototype._define = function (identifier, immediateContext, key) {
            if (isObject(immediateContext[key])) {
                this.__defineObject(identifier, immediateContext, key);
            }
            else {
                this.__definePrimitive(identifier, immediateContext, key);
            }
        };
        /**
         * @param {string} absoluteIdentifier The full identifier path for the observed array.
         * @param {string} method The array method being called.
         */
        ContextManager.prototype._overwriteArrayFunction = function (absoluteIdentifier, method) {
            var callbackObjects = ContextManager.arrayChangeListeners[absoluteIdentifier] || {}, _this = this;
            // we can't use a fat-arrow function here because we need the array context. 
            return function observedArrayFn() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var oldLength = this.length, originalArray = this.slice(0), returnValue, isUnshift = method === 'unshift', isShift = method === 'shift', isSplice = method === 'splice', selfNotify = isShift || isUnshift || isSplice, isUpdate = method === 'sort' || method === 'reverse', oldArray, addedCount, index, newLength, removed;
                if (selfNotify) {
                    _this.__isArrayFunction = true;
                    returnValue = Array.prototype[method].apply(this, args);
                    _this.__isArrayFunction = false;
                    newLength = this.length;
                    index = 0;
                    if (isShift) {
                        addedCount = 0;
                        removed = oldLength > 0 ? [returnValue] : [];
                    }
                    else if (isUnshift) {
                        addedCount = args.length;
                        removed = [];
                    }
                    else {
                        addedCount = args.length - 2;
                        index = args[0];
                        removed = returnValue;
                    }
                }
                else {
                    returnValue = Array.prototype[method].apply(this, args);
                    newLength = this.length;
                    if (isUpdate) {
                        oldArray = originalArray;
                    }
                    else if (method === 'push') {
                        addedCount = args.length;
                        index = oldLength;
                        removed = [];
                    }
                    else if (method === 'pop') {
                        addedCount = 0;
                        index = newLength;
                        removed = oldLength > 0 ? [returnValue] : [];
                    }
                }
                if (isShift || isSplice || method === 'pop') {
                    ContextManager.unObserve(returnValue);
                }
                var keys = Object.keys(callbackObjects), length = keys.length, callbacks, jLength, i, j;
                for (i = 0; i < length; ++i) {
                    callbacks = callbackObjects[keys[i]];
                    jLength = callbacks.length;
                    for (j = 0; j < jLength; ++j) {
                        callbacks[j]([{
                                object: this,
                                type: method,
                                index: index,
                                removed: removed,
                                addedCount: addedCount,
                                oldArray: oldArray
                            }]);
                    }
                }
                if (selfNotify) {
                    _this._notifyChildProperties(absoluteIdentifier, this, originalArray);
                }
                else {
                    _this._execute(absoluteIdentifier + '.length', newLength, oldLength);
                }
                return returnValue;
            };
        };
        /**
         * @param {string} identifier The identifier attached to the callbacks.
         * @param {observable.IListener} listener The observable listener to remove.
         */
        ContextManager.prototype._removeCallback = function (identifier, listener) {
            var callbacks = this.__identifiers[identifier];
            if (isNull(callbacks)) {
                return;
            }
            // splice the observed listener 
            var index = callbacks.indexOf(listener);
            if (index === -1) {
                return;
            }
            callbacks.splice(index, 1);
            if (callbacks.length === 0) {
                deleteProperty(this.__contextObjects, identifier);
            }
        };
        /**
         * @param {string} identifier The identifier being observed.
         */
        ContextManager.prototype._hasIdentifier = function (identifier) {
            return !isEmpty(this.__identifiers[identifier]);
        };
        /**
         * @param {string} identifier The identifier attached to the callbacks.
         * @param {any} value The new value on this context specified by
         * the identifier.
         * @param {any} oldValue The old value on this context specified by
         * the identifier.
         */
        ContextManager.prototype._execute = function (identifier, value, oldValue) {
            var observableListeners = this.__identifiers[identifier];
            if (isUndefined(value)) {
                deleteProperty(this.__contextObjects, identifier);
            }
            else {
                this.__contextObjects[identifier] = value;
            }
            if (value === oldValue || isNull(observableListeners)) {
                return;
            }
            var listeners = observableListeners.slice(0), length = listeners.length;
            for (var i = 0; i < length; ++i) {
                listeners[i].listener(value, oldValue);
            }
        };
        /**
         * @param {string} identifier The identifier of the object being defined.
         * @param {any} immediateContext The parent object of the object being defined.
         * @param {string} key The property key of the object being defined.
         */
        ContextManager.prototype.__defineObject = function (identifier, immediateContext, key) {
            var _this = this;
            var value = immediateContext[key];
            Object.defineProperty(immediateContext, key, {
                configurable: true,
                enumerable: true,
                get: function () {
                    _this.__observedIdentifier = identifier;
                    return value;
                },
                set: function (newValue) {
                    if (value === newValue) {
                        return;
                    }
                    var oldValue = value;
                    value = newValue;
                    if (_this.__isArrayFunction) {
                        return;
                    }
                    ContextManager.unObserve(oldValue);
                    var props = _this.__identifierHash[identifier], childPropertiesExist = false, mappings;
                    if (isObject(props)) {
                        mappings = Object.keys(props);
                        childPropertiesExist = mappings.length > 0;
                    }
                    _this._execute(identifier, value, oldValue);
                    if (childPropertiesExist) {
                        _this._notifyChildProperties(identifier, value, oldValue, mappings);
                        if (!isObject(value)) {
                            _this.__definePrimitive(identifier, immediateContext, key);
                        }
                    }
                    else if (isEmpty(_this.__identifiers[identifier])) {
                        ContextManager.defineProperty(immediateContext, key, value, true, true, true);
                    }
                    else if (!isObject(value)) {
                        _this.__definePrimitive(identifier, immediateContext, key);
                    }
                }
            });
        };
        /**
         * @param {string} identifier The identifier of the primitive being defined.
         * @param {any} immediateContext The parent object of the primitive being defined.
         * @param {string} key The property key of the primitive being defined.
         */
        ContextManager.prototype.__definePrimitive = function (identifier, immediateContext, key) {
            var _this = this;
            var value = immediateContext[key], isDefined = !isNull(value);
            if (isArray(immediateContext) && key === 'length') {
                return;
            }
            Object.defineProperty(immediateContext, key, {
                configurable: true,
                enumerable: true,
                get: function () {
                    _this.__observedIdentifier = identifier;
                    return value;
                },
                set: function (newValue) {
                    if (value === newValue) {
                        return;
                    }
                    var oldValue = value;
                    value = newValue;
                    if (_this.__isArrayFunction && isArray(immediateContext)) {
                        return;
                    }
                    var props = _this.__identifierHash[identifier], childPropertiesExist = false, mappings;
                    if (isObject(props)) {
                        mappings = Object.keys(props);
                        childPropertiesExist = mappings.length > 0;
                    }
                    _this._execute(identifier, newValue, oldValue);
                    if (!childPropertiesExist && isEmpty(_this.__identifiers[identifier])) {
                        ContextManager.defineProperty(immediateContext, key, value, true, true, true);
                    }
                    else if (isObject(value)) {
                        _this.__defineObject(identifier, immediateContext, key);
                        if (childPropertiesExist) {
                            _this._notifyChildProperties(identifier, newValue, oldValue, mappings);
                        }
                    }
                    else if (!isDefined) {
                        _this.__definePrimitive(identifier, immediateContext, key);
                        isDefined = true;
                    }
                }
            });
        };
        /**
         * @param {string} identifier The identifier to attach the listener.
         * @param {observable.IListener} observableListener The listener being added.
         */
        ContextManager.prototype.__add = function (identifier, observableListener) {
            var callbacks = this.__identifiers[identifier], priority = observableListener.priority, found = false;
            if (isNull(callbacks)) {
                callbacks = this.__identifiers[identifier] = [];
            }
            if (isNumber(priority)) {
                var length_6 = callbacks.length;
                for (var i = 0; i < length_6; ++i) {
                    if (priority > callbacks[i].priority) {
                        callbacks.splice(i, 0, observableListener);
                        found = true;
                        break;
                    }
                }
            }
            else {
                observableListener.priority = -1;
            }
            if (!found) {
                callbacks.push(observableListener);
            }
            this.__addHashValues(identifier);
        };
        /**
         * @param {string} identifier The identifier to map.
         */
        ContextManager.prototype.__addHashValues = function (identifier) {
            var identifierHash = this.__identifierHash;
            if (isObject(identifierHash[identifier])) {
                return;
            }
            identifierHash[identifier] = {};
            var index, period = '.', ident = identifier, hashValue;
            while ((index = ident.lastIndexOf(period)) !== -1) {
                ident = ident.slice(0, index);
                hashValue = identifierHash[ident];
                if (isNull(hashValue)) {
                    hashValue = identifierHash[ident] = {};
                    if (ident !== identifier) {
                        hashValue[identifier] = true;
                    }
                }
                else if (ident !== identifier && !hashValue[identifier]) {
                    hashValue[identifier] = true;
                }
            }
        };
        /**
         */
        ContextManager.arrayChangeListeners = {};
        /**
         */
        ContextManager.__managers = {};
        /**
         */
        ContextManager.__controls = {};
        return ContextManager;
    })();
    observable.ContextManager = ContextManager;
    /**
     */
    function IContextManagerStatic(_log) {
        ContextManager._log = _log;
        return ContextManager;
    }
    observable.IContextManagerStatic = IContextManagerStatic;
    register.injectable(__ContextManagerStatic, IContextManagerStatic, [
        __Log
    ], __STATIC);
    register.injectable(__ContextManagerInstance, ContextManager, null, __INSTANCE);
})(observable = exports.observable || (exports.observable = {}));
/**
 */
var events;
(function (events) {
    /**
     */
    var DispatchEvent = (function () {
        function DispatchEvent() {
            /**
             */
            this.defaultPrevented = false;
            /**
             */
            this.stopped = false;
        }
        DispatchEvent.prototype.initialize = function (name, sender, direction) {
            this.name = name;
            this.direction = direction || this._EventManager.UP;
            this.sender = sender;
        };
        /**
         */
        DispatchEvent.prototype.preventDefault = function () {
            if (!this.defaultPrevented) {
                this._ContextManager.defineGetter(this, 'defaultPrevented', true);
            }
        };
        /**
         */
        DispatchEvent.prototype.stopPropagation = function () {
            if (this.direction === this._EventManager.UP) {
                this.stopped = true;
                this._EventManager.propagatingEvents[this.name] = false;
            }
        };
        DispatchEvent._inject = {
            _EventManager: __EventManagerStatic,
            _ContextManager: __ContextManagerStatic
        };
        return DispatchEvent;
    })();
    events.DispatchEvent = DispatchEvent;
    register.injectable(__DispatchEventInstance, DispatchEvent, null, __INSTANCE);
    /**
     */
    var LifecycleEvent = (function (_super) {
        __extends(LifecycleEvent, _super);
        function LifecycleEvent() {
            _super.apply(this, arguments);
        }
        /**
         * @param {string} name The name of the event.
         * @param {any} sender The sender of the event.
         */
        LifecycleEvent.dispatch = function (name, sender) {
            var event = acquire(__LifecycleEventInstance);
            event.initialize(name, sender);
            EventManager.sendEvent(event);
            return event;
        };
        /**
         * @param {string} name The name of the event.
         * @param {any} sender The sender of the event.
         */
        LifecycleEvent.prototype.initialize = function (name, sender) {
            _super.prototype.initialize.call(this, name, sender, this._EventManager.DIRECT);
        };
        return LifecycleEvent;
    })(DispatchEvent);
    events.LifecycleEvent = LifecycleEvent;
    /**
     */
    function ILifecycleEventStatic() {
        return LifecycleEvent;
    }
    events.ILifecycleEventStatic = ILifecycleEventStatic;
    register.injectable(__LifecycleEventStatic, ILifecycleEventStatic, null, __STATIC);
    register.injectable(__LifecycleEventInstance, LifecycleEvent, null, __INSTANCE);
    /**
     */
    var EventManager = (function () {
        function EventManager() {
        }
        /**
         */
        EventManager.initialize = function () {
            if (EventManager.__initialized) {
                return;
            }
            EventManager.__initialized = true;
            var lifecycleListeners = EventManager.__lifecycleEventListeners, _compat = EventManager._compat, _document = EventManager._document, _window = EventManager._window, _dom = EventManager._dom, dispatch = LifecycleEvent.dispatch, listener;
            while (lifecycleListeners.length > 0) {
                listener = lifecycleListeners.pop();
                _document.removeEventListener(listener.name, listener.value, false);
            }
            if (_compat.cordova) {
                var eventNames = [__resume, __online, __offline], winJs = _compat.winJs, length_7 = eventNames.length, event_1, dispatcher = function (ev) { return function () {
                    dispatch(ev, EventManager);
                }; }, fn;
                for (var i = 0; i < length_7; ++i) {
                    event_1 = eventNames[i];
                    fn = dispatcher(event_1);
                    lifecycleListeners.push({
                        name: event_1,
                        value: fn
                    });
                    _dom.addEventListener(_document, event_1, fn, false);
                }
                fn = dispatcher(__suspend);
                lifecycleListeners.push({
                    name: __pause,
                    value: fn
                });
                _dom.addEventListener(_document, __pause, fn, false);
                fn = dispatcher(__ready);
                lifecycleListeners.push({
                    name: __deviceReady,
                    value: fn
                });
                _dom.addEventListener(_document, __deviceReady, fn, false);
                fn = function () {
                    if (!winJs) {
                        dispatch(__backButton, EventManager);
                    }
                    return true;
                };
                lifecycleListeners.push({
                    name: __backButton,
                    value: fn
                });
                _dom.addEventListener(_document, __backButton, fn, false);
                if (winJs) {
                    fn = function () {
                        dispatch(__backButton, EventManager);
                        return true;
                    };
                    lifecycleListeners.push({
                        name: __backClick,
                        value: fn
                    });
                    _window.WinJS.Application.addEventListener(__backClick, fn, false);
                }
            }
            else if (_compat.amd) {
                return;
            }
            else {
                _dom.addEventListener(_window, 'load', function () {
                    dispatch(__ready, EventManager);
                });
            }
        };
        /**
         * @param {string} uid The uid for which the event listeners will be removed.'
         */
        EventManager.dispose = function (uid) {
            deleteProperty(EventManager.__eventsListeners, uid);
        };
        /**
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName The name of the event to listen to.
         * @param {(ev: DispatchEvent, ...args: any[]) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         */
        EventManager.on = function (uid, eventName, listener, context) {
            var eventsListener = EventManager.__eventsListeners[uid];
            if (isNull(eventsListener)) {
                eventsListener = EventManager.__eventsListeners[uid] = {
                    listeners: {},
                    context: context
                };
            }
            var eventListeners = eventsListener.listeners[eventName];
            if (!isArray(eventListeners)) {
                eventListeners = eventsListener.listeners[eventName] = [];
            }
            eventListeners.push(listener);
            return function () {
                var index = eventListeners.indexOf(listener);
                if (index === -1) {
                    return;
                }
                eventListeners.splice(index, 1);
            };
        };
        EventManager.dispatch = function (name, sender, direction, args) {
            var _dispatchEvent = acquire(__DispatchEventInstance);
            _dispatchEvent.initialize(name, sender, direction);
            EventManager.sendEvent(_dispatchEvent, args);
            return _dispatchEvent;
        };
        /**
         * @param {string} direction The direction of the event
         */
        EventManager.hasDirection = function (direction) {
            return (direction === EventManager.UP ||
                direction === EventManager.DOWN ||
                direction === EventManager.DIRECT);
        };
        /**
         * @param {events.DispatchEvent} event The DispatchEvent to send
         * @param {Array<any>} args The arguments associated with the event
         */
        EventManager.sendEvent = function (event, args) {
            var name = event.name, direction = event.direction;
            args = args || [];
            EventManager.propagatingEvents[name] = true;
            args = args || [];
            switch (direction) {
                case EventManager.UP:
                    EventManager._dispatchUp(event, args);
                    break;
                case EventManager.DOWN:
                    EventManager._dispatchDown(event, args);
                    break;
                case EventManager.DIRECT:
                    EventManager._dispatchDirect(event, args);
                    break;
            }
            deleteProperty(EventManager.propagatingEvents, name);
        };
        /**
         * @param {events.DispatchEvent} event The event being dispatched.
         * @param {Array<any>} args The arguments associated with the event.
         */
        EventManager._dispatchUp = function (event, args) {
            var name = event.name, parent = event.sender;
            while (!isNull(parent) && EventManager.propagatingEvents[name]) {
                if (isNull(parent.uid)) {
                    parent = parent.parent;
                    continue;
                }
                EventManager.__executeEvent(parent.uid, event, args);
                parent = parent.parent;
            }
        };
        /**
         * @param {events.DispatchEvent} event The event being dispatched.
         * @param {Array<any>} args The arguments associated with the event.
         */
        EventManager._dispatchDown = function (event, args) {
            var controls = [], control, name = event.name;
            controls.push(event.sender);
            while (controls.length && EventManager.propagatingEvents[name]) {
                control = controls.pop();
                if (isNull(control.uid)) {
                    continue;
                }
                EventManager.__executeEvent(control.uid, event, args);
                if (isNull(control.controls)) {
                    continue;
                }
                controls = controls.concat(control.controls);
            }
        };
        /**
         * @param {events.DispatchEvent} event The event being dispatched.
         * @param {Array<any>} args The arguments associated with the event.
         */
        EventManager._dispatchDirect = function (event, args) {
            var uids = Object.keys(EventManager.__eventsListeners), length = uids.length, name = event.name, eventsListener;
            for (var i = 0; i < length; ++i) {
                if (!EventManager.propagatingEvents[name]) {
                    break;
                }
                eventsListener = EventManager.__eventsListeners[uids[i]];
                if (isNull(eventsListener) || isNull(eventsListener.listeners[name])) {
                    continue;
                }
                EventManager.__callListeners(eventsListener.context, event, eventsListener.listeners[name], args);
            }
        };
        /**
         * @param {string} uid The uid used to find the event listeners.
         * @param {events.DispatchEvent} The event.
         * @param {Array<any>} args The arguments to send to the listeners.
         */
        EventManager.__executeEvent = function (uid, ev, args) {
            var eventsListener = EventManager.__eventsListeners[uid];
            if (isNull(eventsListener)) {
                return;
            }
            var context = eventsListener.context, listeners = eventsListener.listeners[ev.name];
            if (isNull(listeners)) {
                return;
            }
            EventManager.__callListeners(context, ev, listeners, args);
        };
        /**
         * @param {any} context The context with which to call the listeners.
         * @param {events.DispatchEvent} The event.
         * @param {Array<(ev: DispatchEvent, ...args: any[]) => void>} The event listeners.
         * @param {Array<any>} args The arguments to send to the listeners.
         */
        EventManager.__callListeners = function (context, ev, listeners, args) {
            var name = ev.name, length = listeners.length, index = -1;
            args = [ev].concat(args);
            while (++index < length && EventManager.propagatingEvents[name]) {
                try {
                    listeners[index].apply(context, args);
                }
                catch (e) {
                    EventManager._log.debug(e);
                }
            }
        };
        /**
         */
        EventManager.UP = 'up';
        /**
         */
        EventManager.DOWN = 'down';
        /**
         */
        EventManager.DIRECT = 'direct';
        /**
         */
        EventManager.propagatingEvents = {};
        /**
         */
        EventManager.__eventsListeners = {};
        /**
         */
        EventManager.__lifecycleEventListeners = [];
        /**
         */
        EventManager.__initialized = false;
        return EventManager;
    })();
    events.EventManager = EventManager;
    /**
     */
    function IEventManagerStatic(_log, _compat, _document, _window, _dom) {
        EventManager._log = _log;
        EventManager._compat = _compat;
        EventManager._document = _document;
        EventManager._window = _window;
        EventManager._dom = _dom;
        return EventManager;
    }
    events.IEventManagerStatic = IEventManagerStatic;
    register.injectable(__EventManagerStatic, IEventManagerStatic, [
        __Log,
        __Compat,
        __Document,
        __Window,
        __Dom
    ], __STATIC);
    /**
     */
    var ErrorEvent = (function (_super) {
        __extends(ErrorEvent, _super);
        function ErrorEvent() {
            _super.apply(this, arguments);
        }
        /**
         * @param {string} name The name of the event.
         * @param {any} sender The sender of the event.
         * @param {E} error The error that occurred, resulting in the event.
         * @param {number} logLevel The severity level of the error
         */
        ErrorEvent.dispatch = function (name, sender, error, logLevel) {
            var event = acquire(ErrorEvent);
            event.initialize(name, sender, null, error);
            event.logLevel = logLevel;
            ErrorEvent._EventManager.sendEvent(event);
            return event;
        };
        ErrorEvent.prototype.initialize = function (name, sender, direction, error) {
            _super.prototype.initialize.call(this, name, sender, this._EventManager.DIRECT);
            this.error = error;
        };
        return ErrorEvent;
    })(DispatchEvent);
    events.ErrorEvent = ErrorEvent;
    /**
     */
    function IErrorEventStatic(_EventManager) {
        ErrorEvent._EventManager = _EventManager;
        return ErrorEvent;
    }
    events.IErrorEventStatic = IErrorEventStatic;
    register.injectable(__ErrorEventStatic, IErrorEventStatic, [__EventManagerStatic], __STATIC);
})(events = exports.events || (exports.events = {}));
/**
 */
var Control = (function () {
    /**
     */
    function Control() {
        /**
         */
        this.uid = uniqueId(__Plat);
        /**
         */
        this.priority = 0;
        /**
         */
        this.dom = Control._dom;
        /**
         */
        this.utils = acquire(__Utils);
        /**
         */
        this._log = Control._log;
    }
    Control.getRootControl = function (control) {
        if (isNull(control)) {
            return control;
        }
        else if (!isNull(control.root)) {
            return control.root;
        }
        while (!(isNull(control.parent) || control.hasOwnContext)) {
            if (!isNull(control.root)) {
                return control.root;
            }
            control = control.parent;
        }
        if (!control.hasOwnContext && isObject(control.context)) {
            Control._log.debug('Root control: ' + control.type + ' found that sets its context to an Object but does not set the hasOwnContext ' +
                'flag to true. Please set the flag if the control intends to use its own context.');
        }
        return control;
    };
    /**
     * @param {Control} control The control to load.
     */
    Control.load = function (control) {
        var _Promise = Control._Promise;
        if (isNull(control)) {
            return _Promise.resolve();
        }
        var ctrl = control;
        if (isString(ctrl.absoluteContextPath)) {
            if (isFunction(ctrl.contextChanged)) {
                var contextManager = Control._ContextManager.getManager(ctrl.root);
                contextManager.observe(ctrl.absoluteContextPath, {
                    uid: control.uid,
                    priority: __CONTEXT_CHANGED_PRIORITY,
                    listener: function (newValue, oldValue) {
                        ui.TemplateControl.contextChanged(control, newValue, oldValue);
                    }
                });
                if (isFunction(ctrl.zCC__plat)) {
                    ctrl.zCC__plat();
                    deleteProperty(ctrl, 'zCC__plat');
                }
            }
            var element = ctrl.element;
            if (isNode(element) && isFunction(element.removeAttribute)) {
                element.removeAttribute(__Hide);
            }
        }
        if (isFunction(control.loaded)) {
            return _Promise.resolve(control.loaded());
        }
        return _Promise.resolve();
    };
    /**
     * @param {Control} control The Control to dispose.
     */
    Control.dispose = function (control) {
        var ctrl = control;
        if (isNull(ctrl)) {
            return;
        }
        else if (!isUndefined(ctrl.templateControl)) {
            AttributeControl.dispose(ctrl);
            return;
        }
        else if (ctrl.hasOwnContext) {
            ui.ViewControl.dispose(ctrl);
            return;
        }
        else if (ctrl.controls) {
            ui.TemplateControl.dispose(ctrl);
            return;
        }
        if (isFunction(control.dispose)) {
            control.dispose();
        }
        Control.removeEventListeners(control);
        Control._ContextManager.dispose(control);
        control.element = null;
        Control.removeParent(control);
        if (control.__injectable__type === __STATIC) {
            var injector = controlInjectors[control.type];
            register.control(control.type, control.constructor, injector.dependencies, true);
        }
    };
    /**
     * @param {Control} control The control whose parent will be removed.
     */
    Control.removeParent = function (control) {
        if (isNull(control)) {
            return;
        }
        var parent = control.parent;
        if (isNull(parent)) {
            return;
        }
        var controls = parent.controls || [], index = controls.indexOf(control);
        if (index !== -1) {
            controls.splice(index, 1);
        }
        control.parent = null;
    };
    /**
     * @param {Control} control The control having its event listeners removed.
     */
    Control.removeEventListeners = function (control) {
        if (isNull(control)) {
            return;
        }
        var removeListeners = Control.__eventListeners, uid = control.uid;
        var listeners = removeListeners[uid];
        if (isArray(listeners)) {
            var index = listeners.length;
            while (index-- > 0) {
                listeners[index]();
            }
            deleteProperty(removeListeners, uid);
        }
    };
    /**
     */
    Control.getInstance = function () {
        return new Control();
    };
    /**
     * @param {string} uid The uid of the control associated with the remove function.
     * @param {IRemoveListener} listener The remove function to add.
     */
    Control.__addRemoveListener = function (uid, listener) {
        var removeListeners = Control.__eventListeners;
        if (isArray(removeListeners[uid])) {
            removeListeners[uid].push(listener);
            return;
        }
        removeListeners[uid] = [listener];
    };
    /**
     * @param {string} uid The uid of the control associated with the remove function.
     * @param {IRemoveListener} listener The remove function to add.
     */
    Control.__spliceRemoveListener = function (uid, listener) {
        var removeListeners = Control.__eventListeners, controlListeners = removeListeners[uid];
        if (isArray(controlListeners)) {
            var index = controlListeners.indexOf(listener);
            if (index === -1) {
                return;
            }
            controlListeners.splice(index, 1);
        }
    };
    /**
     * @param {Control} control The at which to start searching for key/value pairs.
     * @param {string} key The key to search for on all the controls in the tree.
     * @param {string} value The expected value used to find similar controls.
     */
    Control.__getControls = function (control, key, value) {
        var controls = [], root = Control.getRootControl(control), child;
        if (!isNull(root) && root[key] === value) {
            controls.push(root);
        }
        var children = root.controls;
        if (isNull(children)) {
            return controls;
        }
        var queue = [].concat(children);
        while (queue.length > 0) {
            child = queue.shift();
            if (child[key] === value) {
                controls.push(child);
            }
            if (isNull(child.controls)) {
                continue;
            }
            queue = queue.concat(child.controls);
        }
        return controls;
    };
    /**
     */
    Control.prototype.initialize = function () { };
    /**
     */
    Control.prototype.loaded = function () { };
    /**
     * @param {string} name The string name with which to populate the returned controls array.
     */
    Control.prototype.getControlsByName = function (name) {
        return Control.__getControls(this, 'name', name);
    };
    Control.prototype.getControlsByType = function (type) {
        if (isString(type)) {
            return Control.__getControls(this, 'type', type);
        }
        return Control.__getControls(this, 'constructor', type);
    };
    Control.prototype.addEventListener = function (element, type, listener, useCapture) {
        if (!isFunction(listener)) {
            this._log.warn('"Control.addEventListener" must take a function as the third argument.');
            return noop;
        }
        listener = listener.bind(this);
        var removeListener = this.dom.addEventListener(element, type, listener, useCapture), uid = this.uid;
        Control.__addRemoveListener(uid, removeListener);
        return function () {
            removeListener();
            Control.__spliceRemoveListener(uid, removeListener);
        };
    };
    Control.prototype.observe = function (listener, identifier) {
        var _this = this;
        var control = isObject(this.context) ? this : this.parent, root = Control.getRootControl(control);
        if (isNull(control)) {
            return noop;
        }
        else if (isNull(control.absoluteContextPath)) {
            this._log.warn('Should not call Control.observe prior to the control being loaded');
            return noop;
        }
        var absoluteIdentifier;
        if (isEmpty(identifier)) {
            absoluteIdentifier = control.absoluteContextPath;
        }
        else if (isString(identifier)) {
            var identifierExpression = (Control._parser || acquire(__Parser)).parse(identifier), identifiers = identifierExpression.identifiers;
            if (identifiers.length > 1) {
                this._log.warn('Only a single identifier can be observed when calling the function Control.observe');
            }
            var expression = identifierExpression.identifiers[0];
            if (expression[0] === '@') {
                var split = expression.split('.'), start = split.shift().slice(1), join = split.length > 0 ? ('.' + split.join('.')) : '';
                if (start === __ROOT_CONTEXT_RESOURCE) {
                    absoluteIdentifier = __CONTEXT + join;
                }
                else if (start === __CONTEXT_RESOURCE) {
                    absoluteIdentifier = control.absoluteContextPath + join;
                }
                else {
                    absoluteIdentifier = control.absoluteContextPath + '.' + expression;
                }
            }
            else {
                absoluteIdentifier = control.absoluteContextPath + '.' + expression;
            }
        }
        else {
            absoluteIdentifier = control.absoluteContextPath + '.' + identifier;
        }
        var _ContextManager = Control._ContextManager || acquire(__ContextManagerStatic), contextManager = _ContextManager.getManager(root);
        return contextManager.observe(absoluteIdentifier, {
            listener: function (newValue, oldValue) {
                listener.call(_this, newValue, oldValue, identifier);
            },
            uid: this.uid
        });
    };
    Control.prototype.observeArray = function (listener, identifier) {
        var control = isObject(this.context) ? this : this.parent, context = control.context;
        if (isNull(control) || !isObject(context)) {
            return noop;
        }
        var array, absoluteIdentifier;
        if (isEmpty(identifier)) {
            array = context;
            absoluteIdentifier = control.absoluteContextPath;
        }
        else if (isString(identifier)) {
            var identifierExpression = (Control._parser || acquire(__Parser)).parse(identifier);
            array = identifierExpression.evaluate(context);
            absoluteIdentifier = control.absoluteContextPath + '.' + identifierExpression.identifiers[0];
        }
        else {
            array = context[identifier];
            absoluteIdentifier = control.absoluteContextPath + '.' + identifier;
        }
        if (!isArray(array)) {
            return noop;
        }
        var listenerIsFunction = isFunction(listener);
        if (!listenerIsFunction) {
            return noop;
        }
        listener = listener.bind(this);
        var ContextManager = Control._ContextManager || acquire(__ContextManagerStatic), contextManager = ContextManager.getManager(Control.getRootControl(control)), uid = this.uid, callback = function (changes) {
            listener(changes, identifier);
        }, removeListener = contextManager.observeArrayMutation(uid, callback, absoluteIdentifier, array, null), removeCallback = contextManager.observe(absoluteIdentifier, {
            listener: function (newValue, oldValue) {
                removeListener();
                removeListener = contextManager
                    .observeArrayMutation(uid, callback, absoluteIdentifier, newValue, oldValue);
            },
            uid: uid
        });
        return function () {
            removeListener();
            removeCallback();
        };
    };
    Control.prototype.observeExpression = function (listener, expression) {
        var _this = this;
        if (isEmpty(expression)) {
            return noop;
        }
        if (isString(expression)) {
            expression = (Control._parser || acquire(__Parser)).parse(expression);
        }
        else if (!isFunction(expression.evaluate)) {
            return noop;
        }
        var control = !isNull(this.resources) ?
            this :
            this.parent;
        if (isNull(control) || !isString(control.absoluteContextPath)) {
            return noop;
        }
        var aliases = expression.aliases, alias, length = aliases.length, resources = {}, resourceObj, ContextManager = Control._ContextManager || acquire(__ContextManagerStatic), getManager = ContextManager.getManager, TemplateControl = ui.TemplateControl, findResource = TemplateControl.findResource, evaluateExpression = TemplateControl.evaluateExpression, type, i;
        for (i = 0; i < length; ++i) {
            alias = aliases[i];
            resourceObj = findResource(control, alias);
            if (!isNull(resourceObj)) {
                type = resourceObj.resource.type;
                if (type === __OBSERVABLE_RESOURCE || type === __LITERAL_RESOURCE) {
                    resources[alias] = getManager(resourceObj.control);
                }
            }
        }
        var identifiers = expression.identifiers, contextManager = getManager(Control.getRootControl(control)), identifier, split = [], topIdentifier, absoluteContextPath = control.absoluteContextPath, absolutePath = absoluteContextPath + '.', managers = {};
        length = identifiers.length;
        for (i = 0; i < length; ++i) {
            identifier = identifiers[i];
            split = identifier.split('.');
            topIdentifier = split[0];
            if (identifier[0] === '@') {
                alias = topIdentifier.slice(1);
                if (alias === __CONTEXT_RESOURCE) {
                    managers[absoluteContextPath + identifier.replace(topIdentifier, '')] = contextManager;
                }
                else if (alias === __ROOT_CONTEXT_RESOURCE) {
                    managers[identifier.replace(topIdentifier, 'context')] = contextManager;
                }
                else {
                    identifier = identifier.replace(topIdentifier, 'resources.' + alias + '.value');
                    if (!isNull(resources[alias])) {
                        managers[identifier] = resources[alias];
                    }
                }
                continue;
            }
            managers[absolutePath + identifier] = contextManager;
        }
        identifiers = Object.keys(managers);
        length = identifiers.length;
        var oldValue = evaluateExpression(expression, control), listeners = [], uid = this.uid, observableListener = function () {
            var value = evaluateExpression(expression, control);
            listener.call(_this, value, oldValue, expression.expression);
            oldValue = value;
        };
        for (i = 0; i < length; ++i) {
            identifier = identifiers[i];
            listeners.push(managers[identifier].observe(identifier, {
                uid: uid,
                listener: observableListener
            }));
        }
        return function () {
            var length = listeners.length;
            for (var i_1 = 0; i_1 < length; ++i_1) {
                listeners[i_1]();
            }
        };
    };
    Control.prototype.evaluateExpression = function (expression, aliases) {
        return ui.TemplateControl.evaluateExpression(expression, this.parent, aliases);
    };
    /**
     * @param {string} property The property identifer
     */
    Control.prototype.findProperty = function (property) {
        var control = this, expression = (Control._parser || acquire(__Parser)).parse(property), value;
        while (!isNull(control)) {
            value = expression.evaluate(control);
            if (!isNull(value)) {
                return {
                    expresssion: expression,
                    control: control,
                    value: value
                };
            }
            control = control.parent;
        }
    };
    Control.prototype.dispatchEvent = function (name, direction) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var manager = Control._EventManager || acquire(__EventManagerStatic);
        if (!manager.hasDirection(direction)) {
            if (!isUndefined(direction)) {
                args.unshift(direction);
            }
            direction = manager.UP;
        }
        var sender = this;
        if (!isNull(sender.templateControl)) {
            sender = sender.templateControl;
        }
        manager.dispatch(name, sender, direction, args);
    };
    /**
     * @param {string} name The name of the event, cooinciding with the DispatchEvent name.
     * @param {(ev: events.DispatchEvent, ...args: Array<any>) => void} listener The method called when the
     * DispatchEvent is fired.
     */
    Control.prototype.on = function (name, listener) {
        var _EventManager = Control._EventManager || acquire(__EventManagerStatic);
        return _EventManager.on(this.uid, name, listener, this);
    };
    /**
     */
    Control.prototype.dispose = function () { };
    /**
     */
    Control.__eventListeners = {};
    return Control;
})();
exports.Control = Control;
/**
 */
function IControlFactory(_parser, _ContextManager, _EventManager, _Promise, _dom, _log) {
    Control._parser = _parser;
    Control._ContextManager = _ContextManager;
    Control._EventManager = _EventManager;
    Control._Promise = _Promise;
    Control._dom = _dom;
    Control._log = _log;
    return Control;
}
exports.IControlFactory = IControlFactory;
register.injectable(__ControlFactory, IControlFactory, [
    __Parser,
    __ContextManagerStatic,
    __EventManagerStatic,
    __Promise,
    __Dom,
    __Log
], __FACTORY);
/**
 */
var AttributeControl = (function (_super) {
    __extends(AttributeControl, _super);
    function AttributeControl() {
        _super.apply(this, arguments);
        /**
         */
        this.templateControl = null;
    }
    /**
     * @param {AttributeControl} control The AttributeControl to dispose.
     */
    AttributeControl.dispose = function (control) {
        deleteProperty(control, 'templateControl');
        Control.dispose(control);
    };
    /**
     */
    AttributeControl.getInstance = function () {
        return new AttributeControl();
    };
    return AttributeControl;
})(Control);
exports.AttributeControl = AttributeControl;
/**
 */
function IAttributeControlFactory() {
    return AttributeControl;
}
exports.IAttributeControlFactory = IAttributeControlFactory;
register.injectable(__AttributeControlFactory, IAttributeControlFactory, null, __FACTORY);
/**
 */
var ui;
(function (ui) {
    /**
     */
    var TemplateControl = (function (_super) {
        __extends(TemplateControl, _super);
        function TemplateControl() {
            _super.apply(this, arguments);
            /**
             */
            this.priority = 100;
            /**
             */
            this.context = null;
            /**
             */
            this.absoluteContextPath = null;
            /**
             */
            this.hasOwnContext = false;
            /**
             */
            this.replaceWith = 'any';
        }
        TemplateControl.evaluateExpression = function (expression, control, aliases) {
            if (isEmpty(expression)) {
                return expression;
            }
            if (isString(expression)) {
                expression = TemplateControl._parser.parse(expression);
            }
            else if (!isFunction(expression.evaluate)) {
                return expression;
            }
            if (isNull(control)) {
                return expression.evaluate(null, aliases);
            }
            if (expression.aliases.length > 0) {
                aliases = TemplateControl.getResources(control, expression.aliases, aliases);
                if (isEmpty(aliases)) {
                    return;
                }
            }
            return expression.evaluate(control.context, aliases);
        };
        /**
         * @param {ui.TemplateControl} control The control used as the starting point for finding resources.
         * @param {Array<string>} aliases An array of aliases to search for.
         * @param {IObject<any>} resources? An optional resources object to extend, if no resources object is passed in a
         * new one will be created.
         */
        TemplateControl.getResources = function (control, aliases, resources) {
            if (isNull(control)) {
                return {};
            }
            var length = aliases.length, alias, resource, resourceObj, cache = TemplateControl.__resourceCache[control.uid];
            if (isNull(cache)) {
                cache = TemplateControl.__resourceCache[control.uid] = {};
            }
            resources = resources || {};
            for (var i = 0; i < length; ++i) {
                alias = aliases[i];
                if (alias[0] === '@') {
                    alias = alias.slice(1);
                }
                if (alias === __CONTEXT_RESOURCE) {
                    resources[alias] = control.context;
                    continue;
                }
                else if (alias === __ROOT_CONTEXT_RESOURCE) {
                    resources[alias] = Control.getRootControl(control).context;
                    continue;
                }
                if (!isNull(resources[alias])) {
                    continue;
                }
                else if (!isNull(cache[alias])) {
                    var resourceControl = cache[alias].control, controlResources = resourceControl.resources;
                    if (isNull(controlResources)) {
                        resourceObj = TemplateControl.findResource(control, alias);
                    }
                    else {
                        resourceObj = {
                            control: resourceControl,
                            resource: controlResources[alias]
                        };
                    }
                }
                else {
                    resourceObj = TemplateControl.findResource(control, alias);
                }
                if (isNull(resourceObj)) {
                    if (control.type.indexOf(__COMPILED) !== -1) {
                        continue;
                    }
                    TemplateControl._log.warn('Resource alias: ' + alias + ' is not defined.');
                    continue;
                }
                cache[alias] = resourceObj;
                resource = resourceObj.resource;
                resources[alias] = isNull(resource) ? resource : resource.value;
            }
            return resources;
        };
        /**
         * @param {ui.TemplateControl} control The control on which to start searching for the resource alias.
         * @param {string} alias The alias to search for.
         */
        TemplateControl.findResource = function (control, alias) {
            var resource;
            if (isNull(control) || isNull(control.resources) || !isString(alias) || isEmpty(alias)) {
                return;
            }
            if (alias[0] === '@') {
                alias = alias.slice(1);
            }
            var isRootContext = alias === __ROOT_CONTEXT_RESOURCE;
            if (isRootContext || alias === __CONTEXT_RESOURCE || alias === __CONTROL_RESOURCE) {
                if (isRootContext) {
                    control = Control.getRootControl(control);
                }
                resource = (control.resources || {})[alias];
                if (isNull(resource)) {
                    return;
                }
                return {
                    resource: resource,
                    control: control
                };
            }
            while (!isNull(control)) {
                resource = (control.resources || {})[alias];
                if (!isNull(resource)) {
                    return {
                        resource: resource,
                        control: control
                    };
                }
                control = control.parent;
            }
        };
        /**
         * @param {ui.TemplateControl} control A control to dispose.
         */
        TemplateControl.dispose = function (control) {
            if (isNull(control)) {
                return;
            }
            var uid = control.uid, childControls = control.controls, controls = (childControls && childControls.slice(0)), ContextManager = Control._ContextManager, define = ContextManager.defineProperty;
            if (!isNull(controls)) {
                var length_8 = controls.length - 1;
                for (var i = length_8; i >= 0; --i) {
                    Control.dispose(controls[i]);
                }
            }
            if (isFunction(control.dispose)) {
                control.dispose();
            }
            Control.removeEventListeners(control);
            TemplateControl.removeElement(control);
            TemplateControl._ResourcesFactory.dispose(control);
            TemplateControl._BindableTemplatesFactory.dispose(control);
            deleteProperty(TemplateControl.__resourceCache, control.uid);
            ContextManager.dispose(control);
            events.EventManager.dispose(control.uid);
            TemplateControl._managerCache.remove(uid);
            Control.removeParent(control);
            define(control, __RESOURCES, null, true, true, true);
            control.attributes = null;
            control.bindableTemplates = null;
            control.controls = [];
            control.root = null;
            control.innerTemplate = null;
            if (control.__injectable__type === __STATIC) {
                var injector = controlInjectors[control.type];
                register.control(control.type, control.constructor, injector.dependencies, true);
            }
        };
        /**
         * @param {ui.TemplateControl} control The control serving as the root control to load.
         */
        TemplateControl.loadControl = function (control) {
            var children = control.controls, length = children.length, child;
            for (var i = 0; i < length; ++i) {
                child = children[i];
                if (!isNull(child.controls)) {
                    TemplateControl.loadControl(child);
                }
                else {
                    child.loaded();
                }
            }
            control.loaded();
        };
        /**
         * @param {ui.TemplateControl} control The control whose context changed.
         * @param {any} newValue The new value of the control's context.
         * @param {any} oldValue The old value of the control's context.
         */
        TemplateControl.contextChanged = function (control, newValue, oldValue) {
            control.context = newValue;
            TemplateControl.setContextResources(control);
            if (isFunction(control.contextChanged)) {
                control.contextChanged(newValue, oldValue);
            }
        };
        /**
         * @param {ui.TemplateControl} control The control whose context resources will be set.
         */
        TemplateControl.setContextResources = function (control) {
            var value = control.context;
            if (isNull(control.resources)) {
                control.resources = TemplateControl._ResourcesFactory.getInstance();
                control.resources.initialize(control);
            }
            if (control.hasOwnContext) {
                if (isNull(control.resources.rootContext)) {
                    control.resources.add({
                        root: {
                            type: __OBSERVABLE_RESOURCE,
                            value: value
                        }
                    });
                }
                else {
                    control.resources.rootContext.value = value;
                }
            }
            if (isNull(control.resources.context)) {
                control.resources.add({
                    context: {
                        type: __OBSERVABLE_RESOURCE,
                        value: value
                    }
                });
                return;
            }
            control.resources.context.value = value;
        };
        /**
         * @param {ui.TemplateControl} control The control whose element should be removed.
         */
        TemplateControl.removeElement = function (control) {
            if (isNull(control)) {
                return;
            }
            var element = control.element, parentNode;
            if (control.replaceWith === null ||
                control.replaceWith === '' ||
                isDocumentFragment(element)) {
                removeAll(control.startNode, control.endNode);
                control.elementNodes = control.startNode = control.endNode = null;
                return;
            }
            else if (isNull(element)) {
                return;
            }
            parentNode = element.parentNode;
            if (!isNull(parentNode)) {
                parentNode.removeChild(element);
            }
            control.element = null;
        };
        /**
         * @param {ui.TemplateControl} control The control on which to set the absoluteContextPath.
         * @param {string} path The path to set on the control.
         */
        TemplateControl.setAbsoluteContextPath = function (control, path) {
            Control._ContextManager.defineGetter(control, 'absoluteContextPath', path, false, true);
        };
        /**
         * @param {ui.TemplateControl} control The control whose template is being determined.
         * @param {string} templateUrl? The potential template URL to use to grab the template.
         */
        TemplateControl.determineTemplate = function (control, templateUrl) {
            var templateCache = TemplateControl._templateCache, dom = control.dom, Promise = TemplateControl._Promise;
            if (!isNull(templateUrl)) {
            }
            else if (!isNull(control.templateUrl)) {
                templateUrl = control.templateUrl;
            }
            else if (!isNull(control.templateString)) {
                var type = control.type;
                return templateCache.read(type).catch(function (template) {
                    if (isNull(template)) {
                        template = control.templateString;
                    }
                    return templateCache.put(type, template);
                });
            }
            else {
                return Promise.reject(null);
            }
            return dom.getTemplate(templateUrl);
        };
        /**
         * @param {ui.TemplateControl} control The control to be detached.
         */
        TemplateControl.detach = function (control) {
            if (isNull(control) || isNull(control.controls)) {
                return;
            }
            var controls = control.controls.slice(0), length = controls.length;
            for (var i = 0; i < length; ++i) {
                Control.dispose(controls[i]);
            }
            Control.removeEventListeners(control);
            TemplateControl.removeElement(control);
            TemplateControl._ResourcesFactory.dispose(control, true);
            deleteProperty(TemplateControl.__resourceCache, control.uid);
            Control._ContextManager.dispose(control);
            events.EventManager.dispose(control.uid);
            TemplateControl._managerCache.remove(control.uid);
            Control.removeParent(control);
            control.controls = [];
            control.attributes = null;
        };
        /**
         */
        TemplateControl.getInstance = function () {
            return new TemplateControl();
        };
        /**
         * @param {any} newValue? The new value of the context.
         * @param {any} oldValue The old value of the context.
         */
        TemplateControl.prototype.contextChanged = function (newValue, oldValue) { };
        /**
         */
        TemplateControl.prototype.setTemplate = function () { };
        /**
         * @param {Array<string>} aliases An array of aliases to search for.
         * @param {IObject<any>} resources? An optional resources object to extend,
         * if no resources object is passed in a new one will be created.
         */
        TemplateControl.prototype.getResources = function (aliases, resources) {
            return TemplateControl.getResources(this, aliases, resources);
        };
        /**
         * @param {string} alias The alias to search for.
         */
        TemplateControl.prototype.findResource = function (alias) {
            return TemplateControl.findResource(this, alias);
        };
        TemplateControl.prototype.evaluateExpression = function (expression, context) {
            return TemplateControl.evaluateExpression(expression, this, context);
        };
        /**
         */
        TemplateControl.__resourceCache = {};
        return TemplateControl;
    })(Control);
    ui.TemplateControl = TemplateControl;
    /**
     */
    function ITemplateControlFactory(_ResourcesFactory, _BindableTemplatesFactory, _managerCache, _templateCache, _parser, _http, _Promise, _log) {
        TemplateControl._ResourcesFactory = _ResourcesFactory;
        TemplateControl._BindableTemplatesFactory = _BindableTemplatesFactory;
        TemplateControl._managerCache = _managerCache;
        TemplateControl._templateCache = _templateCache;
        TemplateControl._parser = _parser;
        TemplateControl._http = _http;
        TemplateControl._Promise = _Promise;
        TemplateControl._log = _log;
        return TemplateControl;
    }
    ui.ITemplateControlFactory = ITemplateControlFactory;
    register.injectable(__TemplateControlFactory, ITemplateControlFactory, [
        __ResourcesFactory,
        __BindableTemplatesFactory,
        __ManagerCache,
        __TemplateCache,
        __Parser,
        __Http,
        __Promise,
        __Log
    ], __FACTORY);
    register.injectable(__TemplateControlInstance, TemplateControl, null, __INSTANCE);
    /**
     */
    var BindControl = (function (_super) {
        __extends(BindControl, _super);
        function BindControl() {
            _super.apply(this, arguments);
            /**
             */
            this.priority = 120;
            /**
             */
            this._listeners = [];
        }
        /**
         * @param {IPropertyChangedListener<any>} listener The function that acts as a listener.
         */
        BindControl.prototype.onInput = function (listener) {
            var listeners = this._listeners;
            listeners.push(listener);
            return function () {
                var index = listeners.indexOf(listener);
                if (index === -1) {
                    return;
                }
                listeners.splice(index, 1);
            };
        };
        /**
         * @param {observable.IImplementTwoWayBinding} binder The control that facilitates the
         * databinding.
         */
        BindControl.prototype.observeProperties = function (binder) { };
        /**
         * @param {any} newValue The new value of the property after the change.
         * @param {any} oldValue? The old value of the property prior to the change.
         */
        BindControl.prototype.inputChanged = function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }
            var listeners = this._listeners, length = listeners.length;
            for (var i = 0; i < length; ++i) {
                listeners[i](newValue, oldValue);
            }
        };
        /**
         */
        BindControl.prototype.dispose = function () {
            this._listeners = [];
        };
        return BindControl;
    })(TemplateControl);
    ui.BindControl = BindControl;
    /**
     */
    var ViewControl = (function (_super) {
        __extends(ViewControl, _super);
        function ViewControl() {
            _super.apply(this, arguments);
            /**
             */
            this.hasOwnContext = true;
        }
        /**
         * @param {ui.ViewControl} control A control to dispose.
         */
        ViewControl.dispose = function (control) {
            TemplateControl.dispose(control);
        };
        /**
         */
        ViewControl.getInstance = function () {
            return new ViewControl();
        };
        /**
         */
        ViewControl.prototype.canNavigateFrom = function () { };
        /**
         */
        ViewControl.prototype.canNavigateTo = function (parameters, query) { };
        /**
         */
        ViewControl.prototype.navigatingFrom = function () { };
        /**
         */
        ViewControl.prototype.navigatedTo = function (parameters, query) { };
        return ViewControl;
    })(TemplateControl);
    ui.ViewControl = ViewControl;
    /**
     */
    var Dom = (function () {
        function Dom() {
            /**
             */
            this._domEvents = acquire(__DomEvents);
        }
        Dom.prototype.addEventListener = function (element, type, listener, useCapture) {
            return this._domEvents.addEventListener(element, type, listener, useCapture);
        };
        Dom.prototype.appendChildren = function (nodeList, root) {
            return appendChildren(nodeList, root);
        };
        Dom.prototype.cloneChildren = function (nodeList, root) {
            return appendChildren(nodeList, root, true);
        };
        /**
         * @param {Node} node The DOM Node to clear.
         */
        Dom.prototype.clearNode = function (node) {
            return clearNode(node);
        };
        Dom.prototype.clearNodeBlock = function (nodeList, parent) {
            return clearNodeBlock(nodeList, parent);
        };
        /**
         * @param {Node} node The Node to set innerHTML.
         * @param {string} html HTML string to be put inside the node.
         */
        Dom.prototype.setInnerHtml = function (node, html) {
            return setInnerHtml(node, html);
        };
        Dom.prototype.insertBefore = function (parent, nodes, endNode) {
            return insertBefore(parent, nodes, endNode);
        };
        /**
         * @param {Node} node The Node to replace.
         */
        Dom.prototype.replace = function (node) {
            return replace(node);
        };
        Dom.prototype.replaceWith = function (node, newNode) {
            return replaceWith(node, newNode);
        };
        /**
         * @param {string} html The DOM string.
         */
        Dom.prototype.serializeHtml = function (html) {
            return serializeHtml(html);
        };
        /**
         * @param {Node} startNode The starting node, which will not be removed.
         * @param {Node} endNode The ending node, which will not be removed.
         */
        Dom.prototype.removeBetween = function (startNode, endNode) {
            return removeBetween(startNode, endNode);
        };
        /**
         * @param {Node} startNode The first node to remove.
         * @param {Node} endNode The last node to remove.
         */
        Dom.prototype.removeAll = function (startNode, endNode) {
            return removeAll(startNode, endNode);
        };
        /**
         * @param {Element} element The element to which the class name is being added.
         * @param {string} className The class name or space delimited class names to add to the element.
         */
        Dom.prototype.addClass = function (element, className) {
            return addClass(element, className);
        };
        /**
         * @param {Element} element The element from which the class name is being removed.
         * @param {string} className The class name or space delimited class names to remove from the element.
         */
        Dom.prototype.removeClass = function (element, className) {
            return removeClass(element, className);
        };
        /**
         * @param {Element} element The element on which the class name is being toggled.
         * @param {string} className The class name or space delimited class names to toggle on the element.
         */
        Dom.prototype.toggleClass = function (element, className) {
            return toggleClass(element, className);
        };
        /**
         * @param {Element} element The element on which the class name is being toggled.
         * @param {string} oldClass The class name being replaced.
         * @param {string} newClass The class name doing the replacing.
         */
        Dom.prototype.replaceClass = function (element, oldClass, newClass) {
            return replaceClass(element, oldClass, newClass);
        };
        /**
         * @param {Element} element The element on which the class name is being checked.
         * @param {string} className The class name or space delimited class names to check on the element.
         */
        Dom.prototype.hasClass = function (element, className) {
            return hasClass(element, className);
        };
        /**
         * @param {string} templateUrl The url where the HTML template is stored.
         */
        Dom.prototype.getTemplate = function (templateUrl) {
            return getTemplate(templateUrl);
        };
        /**
         * @param {() => void} cb A callback that will fire when the element is visible in the DOM.
         * @param {Element} element The element whose visibility is being inspected.
         */
        Dom.prototype.whenVisible = function (cb, element) {
            return whenVisible(cb, element);
        };
        Dom._inject = {
            _domEvents: __DomEvents
        };
        return Dom;
    })();
    ui.Dom = Dom;
    register.injectable(__Dom, Dom);
    /**
     */
    var BindableTemplates = (function () {
        function BindableTemplates() {
            /**
             */
            this._ResourcesFactory = acquire(__ResourcesFactory);
            /**
             */
            this._ControlFactory = acquire(__ControlFactory);
            /**
             */
            this._TemplateControlFactory = acquire(__TemplateControlFactory);
            /**
             */
            this._ContextManager = acquire(__ContextManagerStatic);
            /**
             */
            this._Promise = acquire(__Promise);
            /**
             */
            this._managerCache = acquire(__ManagerCache);
            /**
             */
            this._document = acquire(__Document);
            /**
             */
            this._ElementManagerFactory = acquire(__ElementManagerFactory);
            /**
             */
            this._BindableTemplatesFactory = acquire(__BindableTemplatesFactory);
            /**
             */
            this._log = acquire(__Log);
            /**
             */
            this.templates = {};
            /**
             */
            this.cache = {};
            /**
             */
            this.__compiledControls = [];
        }
        /**
         * @param {ui.TemplateControl} control The TemplateControl
         * containing the new BindableTemplates object, used for data
         * context inheritance for templates.
         * @param {ui.BindableTemplates} original? An optional BindableTemplates
         * object to copy.
         */
        BindableTemplates.create = function (control, original) {
            var bindableTemplates = new BindableTemplates();
            bindableTemplates.control = control;
            if (!isNull(original)) {
                bindableTemplates.templates = original.templates;
                bindableTemplates.cache = original.cache;
            }
            return bindableTemplates;
        };
        /**
         * @param {ui.TemplateControl} control The control whose bindableTemplates will be disposed.
         */
        BindableTemplates.dispose = function (control) {
            if (isNull(control)) {
                return;
            }
            var instance = control.bindableTemplates;
            if (isNull(instance) || !isFunction(instance.dispose)) {
                return;
            }
            instance.dispose();
        };
        /**
         * @param {ui.TemplateControl} control The potential bound control.
         */
        BindableTemplates.isBoundControl = function (control) {
            if (isNull(control)) {
                return false;
            }
            var parent = control.parent;
            if (isNull(parent)) {
                return false;
            }
            return control.type.indexOf(parent.type + __BOUND_PREFIX) === 0;
        };
        BindableTemplates.prototype.once = function (template, relativeIdentifier, resources) {
            var _this = this;
            var fragment;
            if (isNull(template)) {
                return this._Promise.resolve(this._document.createDocumentFragment());
            }
            else if (isString(template)) {
                fragment = serializeHtml(template);
            }
            else if (isDocumentFragment(template)) {
                fragment = template;
            }
            else {
                fragment = this._document.createDocumentFragment();
                if (isNode(template)) {
                    fragment.appendChild(template);
                }
                else if (isArrayLike(template)) {
                    appendChildren(template, fragment);
                }
                else {
                    return this._Promise.resolve(fragment);
                }
            }
            if (!(isNull(relativeIdentifier) || isNumber(relativeIdentifier) || isString(relativeIdentifier))) {
                this._log.warn(this.control.type + ' cannot bind template with relativeIdentifier: ' + relativeIdentifier +
                    '. Identifier must be either a string or number');
                return;
            }
            var parent = this.control, controlManager = this._managerCache.read(parent.uid), manager = this._ElementManagerFactory.getInstance(), control = this._createBoundControl('', fragment, relativeIdentifier, resources), nodeMap = this._createNodeMap(control, fragment, relativeIdentifier);
            parent.controls.push(control);
            controlManager.children = [];
            manager.initialize(nodeMap, controlManager);
            manager.setUiControlTemplate();
            return manager.fulfillAndLoad().then(function () {
                var _document = _this._document;
                control.startNode = fragment.insertBefore(_document.createComment(control.type + __START_NODE), fragment.firstChild);
                control.endNode = fragment.insertBefore(_document.createComment(control.type + __END_NODE), null);
                return fragment;
            });
        };
        BindableTemplates.prototype.bind = function (key, relativeIdentifier, resources) {
            return this._bind(key, relativeIdentifier, resources);
        };
        BindableTemplates.prototype.add = function (key, template) {
            if (isEmpty(key)) {
                this._log.debug(this.control.type + ' must use a valid key to add a template to BindableTemplates.');
                return;
            }
            if (isNull(template)) {
                return;
            }
            else if (isString(template)) {
                this._compile(key, serializeHtml(template));
                return;
            }
            else if (isDocumentFragment(template)) {
                this._compile(key, template);
                return;
            }
            var fragment = this._document.createDocumentFragment();
            if (isNode(template)) {
                fragment.appendChild(template);
            }
            else if (isArrayLike(template)) {
                appendChildren(template, fragment);
            }
            else {
                return;
            }
            this._compile(key, fragment);
        };
        BindableTemplates.prototype.replace = function (index, key, relativeIdentifier, resources) {
            var control = this.control.controls[index];
            if (!BindableTemplates.isBoundControl(control)) {
                this._log.warn('The child control of ' + this.control.type + ' at the specified index: ' + index +
                    ' is not a bound control and thus cannot be replaced by BindableTemplates.');
                return this._Promise.resolve([]);
            }
            var endNode = control.endNode;
            if (!(isNode(endNode) && isNode(endNode.parentNode))) {
                this._log.warn('The child control of ' + this.control.type + ' at the specified index: ' + index +
                    ' had either no placeholding comment nodes or its comment nodes had no parent and thus ' +
                    'cannot be replaced by BindableTemplates.');
                return this._Promise.resolve([]);
            }
            return this._bind(key, relativeIdentifier, resources, index);
        };
        /**
         */
        BindableTemplates.prototype.dispose = function () {
            var dispose = this._TemplateControlFactory.dispose, compiledControls = this.__compiledControls, length = compiledControls.length;
            for (var i = 0; i < length; ++i) {
                dispose(compiledControls[i]);
            }
            this.__compiledControls = [];
            this.control = null;
            this.cache = {};
            this.templates = {};
        };
        /**
         * @param {string} key The key used to retrieve the template.
         * @param {string} relativeIdentifier? The identifier string relative to this control's context
         * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the
         * most efficient way of specifying context, else the framework has to search for the
         * object.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         * @param {number} index? An optional index only to be used if the newly bound template is intended to
         * replace an existing Control in the child controls Array and its element in the DOM.
         */
        BindableTemplates.prototype._bind = function (key, relativeIdentifier, resources, index) {
            var _this = this;
            var templatePromise = this.templates[key], noIndex = isNull(index);
            if (isNull(templatePromise)) {
                this._log.error(new Error(this.control.type + ' cannot bind template, no template stored with key: ' + key));
                return;
            }
            if (!(isNull(relativeIdentifier) || isNumber(relativeIdentifier) || isString(relativeIdentifier))) {
                this._log.warn(this.control.type + ' cannot bind template with relativeIdentifier: ' + relativeIdentifier +
                    '. Identifier must be either a string or number');
                return;
            }
            templatePromise = templatePromise.then(function (result) {
                var template = result.cloneNode(true), control = _this._createBoundControl(key, template, relativeIdentifier, resources), nodeMap = _this._createNodeMap(control, template, relativeIdentifier);
                if (noIndex) {
                    _this.control.controls.push(control);
                }
                return _this._bindTemplate(key, nodeMap);
            });
            if (!noIndex) {
                return templatePromise.then(function (fragment) {
                    var childNodes = Array.prototype.slice.call(fragment.childNodes), oldControl = _this.control.controls[index], endNode = oldControl.endNode, parentNode = endNode.parentNode, nextSibling = endNode.nextSibling;
                    _this._TemplateControlFactory.dispose(oldControl);
                    parentNode.insertBefore(fragment, nextSibling);
                    return childNodes;
                }).then(null, function (error) {
                    postpone(function () {
                        if (isString(error)) {
                            error = new Error(error);
                        }
                        _this._log.error(error);
                    });
                    return _this._document.createDocumentFragment();
                });
            }
            return templatePromise.then(null, function (error) {
                postpone(function () {
                    if (isString(error)) {
                        error = new Error(error);
                    }
                    _this._log.error(error);
                });
                return _this._document.createDocumentFragment();
            });
        };
        /**
         * @param {string} key The template key.
         * @param {processing.INodeMap} nodeMap The node map to bind.
         */
        BindableTemplates.prototype._bindTemplate = function (key, nodeMap) {
            var _this = this;
            var control = nodeMap.uiControlNode.control, disposed = false, dispose = isFunction(control.dispose) ? control.dispose.bind(control) : noop;
            control.dispose = function () {
                disposed = true;
                dispose();
                control.dispose = dispose;
            };
            return this._bindNodeMap(key, nodeMap).then(function () {
                var _document = _this._document, template = nodeMap.element;
                if (disposed) {
                    return _document.createDocumentFragment();
                }
                control.startNode = template.insertBefore(_document.createComment(control.type + __START_NODE), template.firstChild);
                control.endNode = template.insertBefore(_document.createComment(control.type + __END_NODE), null);
                return template;
            }, function (error) {
                postpone(function () {
                    if (isString(error)) {
                        error = new Error(error);
                    }
                    _this._log.error(error);
                });
                return null;
            });
        };
        /**
         * @param {string} key The template key used to grab the ElementManager.
         * @param {processing.INodeMap} nodeMap The node map to bind.
         */
        BindableTemplates.prototype._bindNodeMap = function (key, nodeMap) {
            var manager = this.cache[key], child = nodeMap.uiControlNode.control, template = nodeMap.element, _managerCache = this._managerCache;
            manager.clone(template, _managerCache.read(this.control.uid), nodeMap);
            return _managerCache.read(child.uid).bindAndLoad();
        };
        /**
         * @param {string} key The template key.
         * @param {DocumentFragment} template The HTML template being bound.
         */
        BindableTemplates.prototype._compile = function (key, template) {
            var control = this._createBoundControl(key + __COMPILED, template), nodeMap = this._createNodeMap(control, template);
            this.__compiledControls.push(control);
            this._compileNodeMap(control, nodeMap, key);
        };
        /**
         * @param {ui.TemplateControl} control The newly created control used to bind the template.
         * @param {processing.INodeMap} nodeMap The newly created node map to bind.
         * @param {string} key The template key.
         */
        BindableTemplates.prototype._compileNodeMap = function (control, nodeMap, key) {
            var _this = this;
            var manager = this._ElementManagerFactory.getInstance(), promises = [];
            manager.isClone = true;
            manager.initialize(nodeMap, null);
            manager.setUiControlTemplate();
            this.cache[key] = manager;
            promises.push(manager.fulfillTemplate());
            this.templates[key] = this._Promise.all(promises).then(function () {
                var element = nodeMap.element, clone = element.cloneNode(true), _document = _this._document, startNode = control.startNode = _document.createComment(control.type + __START_NODE), endNode = control.endNode = _document.createComment(control.type + __END_NODE);
                element.insertBefore(startNode, element.firstChild);
                element.insertBefore(endNode, null);
                return clone;
            });
        };
        /**
         * @param {ui.TemplateControl} uiControl The newly created control used to bind the template.
         * @param {Node} template The template being compiled.
         * @param {string} childContext? A potential child context string identifier.
         */
        BindableTemplates.prototype._createNodeMap = function (uiControl, template, childContext) {
            return {
                element: template,
                attributes: {},
                nodes: [],
                childContext: childContext,
                uiControlNode: {
                    control: uiControl,
                    nodeName: uiControl.type,
                    expressions: [],
                    injector: null
                }
            };
        };
        /**
         * @param {string} key The template key.
         * @param {DocumentFragment} template The template being compiled or being bound.
         * @param {IObject<ui.IResource>} resources? A set of resources to add to the control used to
         * compile/bind this template.
         */
        BindableTemplates.prototype._createBoundControl = function (key, template, childContext, resources) {
            var _TemplateControlFactory = this._TemplateControlFactory, control = _TemplateControlFactory.getInstance(), _ResourcesFactory = this._ResourcesFactory, parent = this.control, compiledManager = this.cache[key], isCompiled = isObject(compiledManager), _resources = _ResourcesFactory.getInstance();
            if (isCompiled) {
                var compiledControl = compiledManager.getUiControl();
                _resources.initialize(control, compiledControl.resources);
                _resources.add(resources);
            }
            else {
                _resources.initialize(control, resources);
            }
            control.resources = _resources;
            _ResourcesFactory.addControlResources(control);
            control.bindableTemplates = this._BindableTemplatesFactory.create(control, parent.bindableTemplates);
            control.parent = parent;
            control.controls = [];
            control.element = template;
            control.type = parent.type + __BOUND_PREFIX + key;
            control.root = this._ControlFactory.getRootControl(control);
            if (isCompiled) {
                var contextManager = this._ContextManager.getManager(control.root);
                control.absoluteContextPath = parent.absoluteContextPath || __CONTEXT;
                if (!isNull(childContext)) {
                    control.absoluteContextPath += '.' + childContext;
                }
                control.context = contextManager.getContext(control.absoluteContextPath.split('.'), false);
            }
            return control;
        };
        return BindableTemplates;
    })();
    ui.BindableTemplates = BindableTemplates;
    /**
     */
    function IBindableTemplatesFactory() {
        return BindableTemplates;
    }
    ui.IBindableTemplatesFactory = IBindableTemplatesFactory;
    register.injectable(__BindableTemplatesFactory, IBindableTemplatesFactory, null, __FACTORY);
    /**
     */
    var Attributes = (function () {
        function Attributes() {
            /**
             */
            this.__listeners = {};
        }
        Attributes.getInstance = function () {
            return new Attributes();
        };
        /**
         * @param {Control} control The function that acts as a listener.
         * @param {IObject<string>} attributes The camelCased attribute properties and their values.
         */
        Attributes.prototype.initialize = function (control, attributes) {
            this.__control = control;
            var keys = Object.keys(attributes), attributeListeners = this.__listeners, key, length = keys.length;
            for (var i = 0; i < length; ++i) {
                key = keys[i];
                this[key] = attributes[key];
                attributeListeners[key] = [];
            }
        };
        /**
         * @param {IPropertyChangedListener} listener The listener function to be called when the attribute changes.
         * @param {string} key The attribute to observe for changes (e.g. 'src').
         */
        Attributes.prototype.observe = function (listener, key) {
            var listeners = this.__listeners[camelCase(key)];
            if (isNull(listeners)) {
                return noop;
            }
            listener = listener.bind(this.__control);
            listeners.push(listener);
            return function () {
                var index = listeners.indexOf(listener);
                if (index === -1) {
                    return;
                }
                listeners.splice(index, 1);
            };
        };
        /**
         * @param {string} key The attribute being observed for changes (e.g. 'src').
         * @param {any} newValue The new value of the attribute.
         * @param {any} oldValue The previous value of the attribute.
         */
        Attributes.prototype._attributeChanged = function (key, newValue, oldValue) {
            var listeners = this.__listeners[camelCase(key)], length = listeners.length;
            for (var i = 0; i < length; ++i) {
                listeners[i](newValue, oldValue);
            }
        };
        return Attributes;
    })();
    ui.Attributes = Attributes;
    function IAttributesFactory() {
        return Attributes;
    }
    ui.IAttributesFactory = IAttributesFactory;
    register.injectable(__AttributesInstance, Attributes, null, __INSTANCE);
    register.injectable(__AttributesFactory, IAttributesFactory, null, __FACTORY);
    /**
     */
    var Resources = (function () {
        function Resources() {
            /**
             */
            this.__resources = {};
            /**
             */
            this.__bound = false;
        }
        /**
         * @param {ui.TemplateControl} control The control for which to create a resource.
         * @param {ui.IResource} resource The object used to set the resource values.
         */
        Resources.create = function (control, resource) {
            if (isNull(resource)) {
                return resource;
            }
            var value;
            switch (resource.type.toLowerCase()) {
                case __INJECTABLE_RESOURCE:
                    var injector = injectableInjectors[resource.value];
                    if (!isNull(injector)) {
                        resource.value = injector.inject();
                    }
                    break;
                case __OBSERVABLE_RESOURCE:
                    Resources._observeResource(control, resource);
                    break;
                case __OBJECT_RESOURCE:
                    value = resource.value;
                    if (isString(value)) {
                        resource.value = control.evaluateExpression(value);
                    }
                    break;
                case __LITERAL_RESOURCE:
                    break;
                case __FUNCTION_RESOURCE:
                    value = resource.value;
                    if (isString(value)) {
                        value = control[value];
                        if (isFunction(value)) {
                            resource.value = value.bind(control);
                        }
                        else {
                            Resources._log.warn('Attempted to create a "function" ' +
                                'type Resource, but the function ' + value + 'cannot be found on your control.');
                            resource.value = noop;
                        }
                    }
                    break;
            }
            return resource;
        };
        /**
         * @param {ui.TemplateControl} control The control on which to add the resources.
         */
        Resources.addControlResources = function (control) {
            control.resources.add({
                context: {
                    value: control.context,
                    type: __OBSERVABLE_RESOURCE
                },
                control: {
                    value: control,
                    type: __OBJECT_RESOURCE
                }
            });
            if (control.hasOwnContext) {
                Resources.__addRoot(control);
            }
        };
        Resources.bindResources = function (resourcesInstance) {
            var resources = resourcesInstance.__resources;
            if (isNull(resources)) {
                return;
            }
            var control = resourcesInstance.__controlInstance, aliases = Object.keys(resources), controlResources = Resources.__controlResources, length = aliases.length, alias;
            for (var i = 0; i < length; ++i) {
                alias = aliases[i];
                if (controlResources[alias] === true) {
                    continue;
                }
                resourcesInstance[alias] = resources[alias] = Resources.create(control, resourcesInstance[alias]);
            }
            resourcesInstance.__bound = true;
        };
        /**
         * @param {ui.TemplateControl} control The control whose resources will be disposed.
         * @param {boolean} persist? Whether or not to persist a resource object post
         * disposal or set it to null.
         */
        Resources.dispose = function (control, persist) {
            var resources = control.resources;
            if (isNull(resources)) {
                return;
            }
            var keys = Object.keys(resources.__resources), key, length = keys.length, define = Resources._ContextManager.defineProperty, resource;
            for (var i = 0; i < length; ++i) {
                key = keys[i];
                resource = resources[key];
                if (!isNull(resource) && (resource.type === __OBSERVABLE_RESOURCE || resource.type === __LITERAL_RESOURCE)) {
                    define(resources, key, persist ? _clone(resource, true) : null, true, true, true);
                }
            }
            Resources._removeListeners(resources.__controlInstance);
        };
        /**
         * @param {Element} element The resources element to parse.
         */
        Resources.parseElement = function (element) {
            var children = Array.prototype.slice.call(element.children), child, _regex = Resources._regex, whiteSpaceRegex = _regex.whiteSpaceRegex, quotationRegex = _regex.quotationRegex, resources = {}, resource, types = Resources.__resourceTypes, attrs, attr, nodeName, text;
            while (children.length > 0) {
                child = children.pop();
                nodeName = child.nodeName.toLowerCase();
                if (!types[nodeName]) {
                    continue;
                }
                attrs = child.attributes;
                resource = {};
                attr = attrs.getNamedItem(__ALIAS);
                if (isNull(attr)) {
                    continue;
                }
                resource.alias = attr.value;
                text = child.textContent.replace(whiteSpaceRegex, '$1');
                if (isEmpty(text)) {
                    continue;
                }
                resource.value = (nodeName === __INJECTABLE_RESOURCE || nodeName === __LITERAL_RESOURCE) ?
                    text.replace(quotationRegex, '') : text;
                resource.type = nodeName;
                resources[resource.alias] = resource;
            }
            return resources;
        };
        /**
         */
        Resources.getInstance = function () {
            return new Resources();
        };
        /**
         * @param {ui.TemplateControl} control The control in charge of the observable resource.
         * @param {ui.IResource} resource The resource to observe.
         */
        Resources._observeResource = function (control, resource) {
            var value = resource.value, uid = control.uid, removeListeners = Resources.__observableResourceRemoveListeners[uid];
            if (isNull(removeListeners)) {
                removeListeners = Resources.__observableResourceRemoveListeners[uid] = [];
            }
            if (isString(value)) {
                if (!isNull(resource.initialValue)) {
                    value = resource.initialValue;
                }
                else {
                    resource.initialValue = value;
                }
                var listener = control.observeExpression(function (newValue) {
                    resource.value = newValue;
                }, value);
                resource.value = control.evaluateExpression(value);
                removeListeners.push(listener);
            }
        };
        /**
         * @param {ui.TemplateControl} control The control whose listeners are being removed.
         */
        Resources._removeListeners = function (control) {
            if (isNull(control)) {
                return;
            }
            var uid = control.uid, removeListeners = Resources.__observableResourceRemoveListeners[uid];
            if (isArray(removeListeners)) {
                var length_9 = removeListeners.length;
                for (var i = 0; i < length_9; ++i) {
                    removeListeners[i]();
                }
            }
            deleteProperty(Resources.__observableResourceRemoveListeners, uid);
        };
        /**
         * @param {ui.TemplateControl} control The root control.
         */
        Resources.__addRoot = function (control) {
            control.resources.add({
                root: {
                    value: control,
                    type: __OBJECT_RESOURCE,
                    alias: __ROOT_RESOURCE
                },
                rootContext: {
                    value: control.context,
                    type: __OBSERVABLE_RESOURCE,
                    alias: __ROOT_CONTEXT_RESOURCE
                }
            });
        };
        Resources.prototype.initialize = function (controlInstance, resources) {
            this.__controlInstance = controlInstance;
            if (isNull(resources)) {
                return;
            }
            else if (isNode(resources)) {
                resources = Resources.parseElement(resources);
            }
            else if (isObject(resources.resources)) {
                resources = resources.resources;
            }
            this.__resources = resources;
            var keys = Object.keys(resources), key, length = keys.length;
            for (var i = 0; i < length; ++i) {
                key = keys[i];
                this[key] = resources[key];
            }
        };
        Resources.prototype.add = function (resources) {
            if (isNull(resources)) {
                return;
            }
            else if (isNode(resources)) {
                resources = Resources.parseElement(resources);
            }
            var keys = Object.keys(resources), length = keys.length, resource, control = this.__controlInstance, bound = this.__bound, key, create = Resources.create;
            for (var i = 0; i < length; ++i) {
                key = keys[i];
                resource = resources[key];
                resource.alias = key;
                this[key] = this.__resources[key] = bound ? create(control, resource) : resource;
            }
        };
        /**
         */
        Resources.INJECTABLE = __INJECTABLE_RESOURCE;
        /**
         */
        Resources.OBJECT = __OBJECT_RESOURCE;
        /**
         */
        Resources.OBSERVABLE = __OBSERVABLE_RESOURCE;
        /**
         */
        Resources.LITERAL = __LITERAL_RESOURCE;
        /**
         */
        Resources.FUNCTION = __FUNCTION_RESOURCE;
        /**
         */
        Resources.__observableResourceRemoveListeners = {};
        return Resources;
    })();
    ui.Resources = Resources;
    /**
     */
    function IResourcesFactory(_ContextManager, _regex, _log) {
        Resources._ContextManager = _ContextManager;
        Resources._regex = _regex;
        Resources._log = _log;
        var controlResources = {}, resourceTypes = {};
        controlResources[__CONTROL_RESOURCE] = controlResources[__CONTEXT_RESOURCE] = controlResources[__ROOT_RESOURCE] = controlResources[__ROOT_CONTEXT_RESOURCE] = true;
        resourceTypes[__INJECTABLE_RESOURCE] = resourceTypes[__OBJECT_RESOURCE] = resourceTypes[__OBSERVABLE_RESOURCE] = resourceTypes[__FUNCTION_RESOURCE] = resourceTypes[__LITERAL_RESOURCE] = true;
        Resources.__controlResources = controlResources;
        Resources.__resourceTypes = resourceTypes;
        return Resources;
    }
    ui.IResourcesFactory = IResourcesFactory;
    register.injectable(__ResourcesFactory, IResourcesFactory, [
        __ContextManagerStatic,
        __Regex,
        __Log
    ], __FACTORY);
    register.injectable(__ResourcesInstance, Resources, null, __INSTANCE);
    /**
     */
    var DomEvents = (function () {
        /**
         */
        function DomEvents() {
            /**
             */
            this._gestures = DomEvents.gestures;
            /**
             */
            this._androidVersion = isUndefined(this._compat.ANDROID) ? -1 : this._compat.ANDROID;
            /**
             */
            this._android44orBelow = this._androidVersion > -1 && Math.floor(this._androidVersion / 10) <= 44;
            /**
             */
            this._inMouse = false;
            /**
             */
            this._subscribers = {};
            /**
             */
            this._gestureCount = {
                $tap: 0,
                $dbltap: 0,
                $hold: 0,
                $release: 0,
                $swipe: 0,
                $track: 0,
                $trackend: 0
            };
            /**
             */
            this.__hasMoved = false;
            /**
             */
            this.__hasRelease = false;
            /**
             */
            this.__detectingMove = false;
            /**
             */
            this.__tapCount = 0;
            /**
             */
            this.__touchCount = 0;
            /**
             */
            this.__cancelDeferredTap = noop;
            /**
             */
            this.__cancelDeferredHold = noop;
            /**
             */
            this.__cancelRegex = /cancel/i;
            /**
             */
            this.__pointerEndRegex = /up|cancel/i;
            /**
             */
            this.__haveSwipeSubscribers = false;
            /**
             */
            this.__blurRemover = noop;
            /**
             */
            this.__ignoreEvent = { mousedown: false, mouseup: false };
            /**
             */
            this.__boundPreventDefaultClick = this.__preventDefaultClick.bind(this);
            /**
             */
            this.__reverseMap = {};
            /**
             */
            this.__mappedEventListener = this.__handleMappedEvent.bind(this);
            /**
             */
            this.__mappedCount = {
                $touchstart: 0,
                $touchmove: 0,
                $touchend: 0,
                $touchcancel: 0
            };
            /**
             */
            this.__pointerHash = {};
            /**
             */
            this.__pointerEvents = [];
            /**
             */
            this.__listeners = {};
            this.__getTypes();
            this.initialize();
        }
        DomEvents.prototype.addEventListener = function (element, type, listener, useCapture) {
            var _this = this;
            var _compat = this._compat, mappedGestures = _compat.mappedEvents, mappedType = mappedGestures[type], mappingExists = !isNull(mappedType), mappedCount = this.__mappedCount, mappedRemoveListener = noop, mappedTouchRemoveListener = noop, gestures = this._gestures, listenerRemoved = false;
            if (mappingExists) {
                var count = mappedCount[type];
                this.__reverseMap[mappedType] = type;
                this.__registerElement(element, type);
                mappedCount[type]++;
                mappedRemoveListener = this.__addMappedEvent(count, mappedType, useCapture);
                if (_compat.hasTouchEvents && !this.__cancelRegex.test(mappedType)) {
                    mappedType = mappedType
                        .replace('touch', 'mouse')
                        .replace('start', 'down')
                        .replace('end', 'up');
                    this.__reverseMap[mappedType] = type;
                    mappedTouchRemoveListener = this.__addMappedEvent(count, mappedType, useCapture);
                }
            }
            element.addEventListener(type, listener, useCapture);
            if (!isUndefined(element['on' + type]) || isUndefined(gestures[type]) || mappingExists) {
                return function () {
                    if (listenerRemoved) {
                        return;
                    }
                    else if (mappingExists) {
                        var currentCount = mappedCount[type];
                        if (isNumber(currentCount)) {
                            if (currentCount > 0) {
                                currentCount = --mappedCount[type];
                            }
                            if (currentCount === 0) {
                                mappedRemoveListener();
                                mappedTouchRemoveListener();
                            }
                        }
                        _this.__unregisterElement(element, type);
                    }
                    listenerRemoved = true;
                    element.removeEventListener(type, listener, useCapture);
                };
            }
            var swipeGesture = gestures.$swipe, trackGesture = gestures.$track, countType = type;
            if (type.indexOf(trackGesture) !== -1) {
                var trackend = gestures.$trackend;
                countType = type === trackend ? trackend : trackGesture;
            }
            else if (type.indexOf(swipeGesture) !== -1) {
                countType = swipeGesture;
            }
            this._gestureCount[countType]++;
            this.__registerElement(element, type);
            return function () {
                if (listenerRemoved) {
                    return;
                }
                listenerRemoved = true;
                _this.__removeEventListener(element, type, listener, useCapture);
            };
        };
        /**
         */
        DomEvents.prototype.initialize = function () {
            var isActive = this._isActive;
            if (isActive === true) {
                // has already been initialized and was never disposed 
                return;
            }
            this.__registerTypes();
            if (isNull(isActive)) {
                this.__appendGestureStyle();
            }
            this._isActive = true;
        };
        /**
         */
        DomEvents.prototype.dispose = function () {
            this.__unregisterTypes();
            this.__blurRemover();
            this.__blurRemover = noop;
            this._gestureCount = {
                $tap: 0,
                $dbltap: 0,
                $hold: 0,
                $release: 0,
                $swipe: 0,
                $track: 0,
                $trackend: 0
            };
            this.__mappedCount = {
                $touchstart: 0,
                $touchmove: 0,
                $touchend: 0,
                $touchcancel: 0
            };
            this._isActive = false;
            this._subscribers = {};
            this.__pointerEvents = [];
            this.__pointerHash = {};
            this.__reverseMap = {};
            this.__ignoreEvent = { mousedown: false, mouseup: false };
            this.__tapCount = this.__touchCount = 0;
            this.__detectingMove = this.__hasMoved = this.__hasRelease = this.__haveSwipeSubscribers = false;
            this.__lastMoveEvent = this.__lastTouchDown = this.__lastTouchUp = null;
            this.__swipeOrigin = this.__capturedTarget = this.__focusedElement = this.__delayedClickRemover = null;
            this.__cancelDeferredHold = this.__cancelDeferredTap = noop;
        };
        /**
         * @param {ui.IPointerEvent} ev The touch start event object.
         */
        DomEvents.prototype._onTouchStart = function (ev) {
            var _this = this;
            var eventType = ev.type;
            if (this.__ignoreEvent[eventType]) {
                this.__ignoreEvent[eventType] = false;
                this.__delayedClickRemover[eventType]();
                if (ev.target !== this.__focusedElement) {
                    if (ev.cancelable === true) {
                        ev.preventDefault();
                    }
                    return false;
                }
                return true;
            }
            else if (this.__touchCount++ > 0) {
                return true;
            }
            if (eventType !== 'mousedown') {
                this._inTouch = true;
            }
            else if (this._inTouch === true) {
                // return immediately if mouse event and currently in a touch 
                ev.preventDefault();
                return false;
            }
            else if (this._compat.hasTouchEvents) {
                this._inMouse = true;
            }
            ev = this.__standardizeEventObject(ev);
            if (isNull(ev)) {
                return true;
            }
            // set any captured target and last move back to null 
            this.__capturedTarget = this.__lastMoveEvent = null;
            this.__hasMoved = false;
            var clientX = ev.clientX, clientY = ev.clientY, timeStamp = ev.timeStamp, target = ev.target, gestures = this._gestures;
            this.__lastTouchDown = {
                _buttons: ev._buttons,
                clientX: clientX,
                clientY: clientY,
                timeStamp: timeStamp,
                target: target,
                identifier: ev.identifier
            };
            this.__swipeOrigin = {
                clientX: clientX,
                clientY: clientY,
                xTimestamp: timeStamp,
                yTimestamp: timeStamp,
                xTarget: target,
                yTarget: target
            };
            if (this._android44orBelow) {
                this.__haveSwipeSubscribers = this.__findFirstSubscribers(target, [gestures.$swipe, gestures.$swipedown, gestures.$swipeleft, gestures.$swiperight, gestures.$swipeup]).length > 0;
            }
            var gestureCount = this._gestureCount, noHolds = gestureCount.$hold <= 0, noRelease = gestureCount.$release <= 0;
            // if any moving events registered, register move 
            if (eventType === 'touchstart' || gestureCount.$track > 0 ||
                gestureCount.$trackend > 0 || gestureCount.$swipe > 0) {
                this.__registerType(this._moveEvents);
                this.__detectingMove = true;
            }
            // return if no hold or release events are registered 
            if (noHolds && noRelease) {
                return true;
            }
            var holdInterval = DomEvents.config.intervals.holdInterval, domEvent, subscribeFn, domEventFound = false;
            if (noHolds) {
                this.__hasRelease = false;
                this.__cancelDeferredHold = defer(function () {
                    _this.__hasRelease = true;
                }, holdInterval);
                return true;
            }
            else if (noRelease) {
                domEvent = this.__findFirstSubscriber(ev.target, this._gestures.$hold);
                if ((domEventFound = !isNull(domEvent))) {
                    subscribeFn = function () {
                        domEvent.trigger(ev);
                        _this.__cancelDeferredHold = noop;
                    };
                }
            }
            else {
                this.__hasRelease = false;
                // has both hold and release events registered 
                domEvent = this.__findFirstSubscriber(ev.target, this._gestures.$hold);
                if ((domEventFound = !isNull(domEvent))) {
                    subscribeFn = function () {
                        domEvent.trigger(ev);
                        _this.__hasRelease = true;
                        _this.__cancelDeferredHold = noop;
                    };
                }
            }
            // set timeout to fire the subscribeFn 
            if (domEventFound) {
                this.__cancelDeferredHold = defer(subscribeFn, holdInterval);
            }
        };
        /**
         * @param {ui.IPointerEvent} ev The touch move event object.
         */
        DomEvents.prototype._onTouchMove = function (ev) {
            // clear hold event 
            this.__cancelDeferredHold();
            this.__cancelDeferredHold = noop;
            // return immediately if there are multiple touches present, or 
            // if it is a mouse event and currently in a touch 
            if (this._inTouch === true && ev.type === 'mousemove') {
                return true;
            }
            var evt = this.__standardizeEventObject(ev);
            if (isNull(evt)) {
                return true;
            }
            var gestureCount = this._gestureCount, noTracking = gestureCount.$track <= 0, noSwiping = gestureCount.$swipe <= 0, config = DomEvents.config, swipeOrigin = this.__swipeOrigin, x = evt.clientX, y = evt.clientY, minMove = this.__hasMoved ||
                (this.__getDistance(swipeOrigin.clientX, x, swipeOrigin.clientY, y) >= config.distances.minScrollDistance);
            // if minimum distance not met 
            if (!minMove) {
                return true;
            }
            this.__hasMoved = true;
            // if no moving events return 
            if (noTracking && noSwiping) {
                return true;
            }
            var lastMove = this.__lastMoveEvent || swipeOrigin, direction = evt.direction = this.__getDirection(x - lastMove.clientX, y - lastMove.clientY);
            this.__handleOriginChange(direction);
            var dx = Math.abs(x - swipeOrigin.clientX), dy = Math.abs(y - swipeOrigin.clientY);
            evt.velocity = this.__getVelocity(dx, dy, evt.timeStamp - swipeOrigin.xTimestamp, evt.timeStamp - swipeOrigin.yTimestamp);
            if (!noSwiping && this._android44orBelow && this.__haveSwipeSubscribers) {
                ev.preventDefault();
            }
            // if tracking events exist 
            if (!noTracking) {
                this.__handleTrack(evt, ev);
            }
            this.__lastMoveEvent = evt;
        };
        /**
         * @param {ui.IPointerEvent} ev The touch end event object.
         */
        DomEvents.prototype._onTouchEnd = function (ev) {
            var _this = this;
            var eventType = ev.type;
            if (this.__ignoreEvent[eventType]) {
                this.__ignoreEvent[eventType] = false;
                this.__delayedClickRemover[eventType]();
                if (ev.target !== this.__focusedElement) {
                    if (ev.cancelable === true) {
                        ev.preventDefault();
                    }
                    postpone(function () {
                        var target = (_this.__lastTouchUp || {}).target;
                        if (_this._document.body.contains(target)) {
                            _this.__handleInput(target);
                        }
                    });
                    return false;
                }
                return true;
            }
            var hasMoved = this.__hasMoved, notMouseUp = eventType !== 'mouseup';
            if (this.__touchCount <= 0) {
                this.__touchCount = 0;
            }
            else {
                this.__touchCount--;
            }
            if (notMouseUp) {
                // all non mouse cases 
                if (eventType === 'touchend') {
                    // all to handle a strange issue when touch clicking certain types 
                    // of DOM elements 
                    if (hasMoved) {
                        // we check ev.cancelable in the END case in case of scrolling conditions 
                        if (ev.cancelable === true) {
                            ev.preventDefault();
                        }
                    }
                    else if (this._inTouch === true) {
                        // immediately handle the input depending on type for more native-like experience 
                        if (ev.target !== this.__focusedElement) {
                            if (this.__handleInput(ev.target) && ev.cancelable === true) {
                                ev.preventDefault();
                            }
                        }
                    }
                    else {
                        if (ev.cancelable === true) {
                            ev.preventDefault();
                        }
                        this.__preventClickFromTouch();
                        return true;
                    }
                    this.__preventClickFromTouch();
                }
            }
            else if (!isUndefined(this._inTouch)) {
                if (!this._inMouse) {
                    // this is case where touchend fired and now 
                    // mouse end is also being fired 
                    if (ev.cancelable === true) {
                        ev.preventDefault();
                    }
                    return false;
                }
                this._inMouse = false;
            }
            // check for cancel event 
            if (this.__cancelRegex.test(eventType)) {
                this.__handleCanceled(ev);
                return true;
            }
            // standardizeEventObject creates touches 
            ev = this.__standardizeEventObject(ev);
            if (isNull(ev)) {
                return true;
            }
            else if (notMouseUp) {
                this._inTouch = false;
            }
            // additional check for mousedown/touchstart - mouseup/touchend inconsistencies 
            if (this.__touchCount > 0) {
                this.__touchCount = ev.touches.length;
            }
            this.__clearTempStates();
            // handle release event 
            if (this.__hasRelease) {
                this.__handleRelease(ev);
            }
            // handle swipe events 
            this.__handleSwipe();
            var config = DomEvents.config, intervals = config.intervals, touchEnd = ev.timeStamp, touchDown = this.__lastTouchDown;
            // if the user moved their finger (for scroll) we handle $trackend and return, 
            // else if they had their finger down too long to be considered a tap, we want to return 
            if (hasMoved) {
                this.__handleTrackEnd(ev);
                this.__tapCount = 0;
                return true;
            }
            else if (isNull(touchDown) || ((touchEnd - touchDown.timeStamp) > intervals.tapInterval)) {
                this.__tapCount = 0;
                return true;
            }
            var lastTouchUp = this.__lastTouchUp, x = ev.clientX, y = ev.clientY;
            // check if can be a double tap event by checking number of taps, distance between taps, 
            // and time between taps 
            if (this.__tapCount > 0 &&
                this.__getDistance(x, lastTouchUp.clientX, y, lastTouchUp.clientY) <= config.distances.maxDblTapDistance &&
                ((touchEnd - lastTouchUp.timeStamp) <= intervals.dblTapInterval)) {
                // handle dbltap events 
                this.__handleDbltap(ev);
            }
            else {
                this.__tapCount = 0;
            }
            // handle tap events 
            this.__handleTap(ev);
            this.__lastTouchUp = ev;
        };
        /**
         */
        DomEvents.prototype.__clearTempStates = function () {
            // clear hold event 
            this.__cancelDeferredHold();
            this.__cancelDeferredHold = noop;
            if (this.__detectingMove) {
                this.__unregisterType(this._moveEvents);
                this.__detectingMove = false;
            }
        };
        /**
         */
        DomEvents.prototype.__resetTouchEnd = function () {
            this.__tapCount = this.__touchCount = 0;
            this._inTouch = this.__hasRelease = false;
            this.__pointerHash = {};
            this.__pointerEvents = [];
            this.__capturedTarget = null;
        };
        // gesture handling methods 
        /**
         * @param {ui.IPointerEvent} ev The touch cancel event object.
         */
        DomEvents.prototype.__handleCanceled = function (ev) {
            var touches = ev.touches || this.__pointerEvents, index = this.__getTouchIndex(touches);
            ev = index >= 0 ? touches[index] : this.__standardizeEventObject(ev);
            this._inTouch = false;
            this.__clearTempStates();
            if (this.__hasMoved) {
                // Android 4.4.x fires touchcancel when the finger moves off an element that 
                // is listening for touch events, so we should handle swipes here in that case. 
                if (this._android44orBelow) {
                    this.__handleSwipe();
                }
                this.__handleTrackEnd(ev);
            }
            this.__resetTouchEnd();
        };
        /**
         * @param {ui.IPointerEvent} ev The touch end event object.
         */
        DomEvents.prototype.__handleTap = function (ev) {
            var _this = this;
            this.__tapCount++;
            if (this._gestureCount.$tap <= 0) {
                return;
            }
            var gestures = this._gestures, domEvent = this.__findFirstSubscriber(ev.target, gestures.$tap);
            if (isNull(domEvent)) {
                return;
            }
            // fire tap event immediately if no dbltap zoom delay 
            // or a mouse is being used 
            if (DomEvents.config.intervals.dblTapZoomDelay <= 0 ||
                ev.pointerType === 'mouse' || ev.type === 'mouseup') {
                ev._buttons = this.__lastTouchDown._buttons;
                domEvent.trigger(ev);
                return;
            }
            // defer for tap delay in case of something like desired 
            // dbltap zoom 
            this.__cancelDeferredTap = defer(function () {
                ev._buttons = _this.__lastTouchDown._buttons;
                domEvent.trigger(ev);
                _this.__tapCount = 0;
                _this.__cancelDeferredTap = noop;
            }, DomEvents.config.intervals.dblTapZoomDelay);
        };
        /**
         * @param {ui.IPointerEvent} ev The touch end event object.
         */
        DomEvents.prototype.__handleDbltap = function (ev) {
            this.__tapCount = 0;
            this.__cancelDeferredTap();
            this.__cancelDeferredTap = noop;
            if (this._gestureCount.$dbltap <= 0) {
                return;
            }
            var domEvent = this.__findFirstSubscriber(ev.target, this._gestures.$dbltap);
            if (isNull(domEvent)) {
                return;
            }
            ev._buttons = this.__lastTouchDown._buttons;
            domEvent.trigger(ev);
            // set touch count to -1 to prevent repeated fire on sequential taps 
            this.__tapCount = -1;
        };
        /**
         * @param {ui.IPointerEvent} ev The touch end event object.
         */
        DomEvents.prototype.__handleRelease = function (ev) {
            var domEvent = this.__findFirstSubscriber(ev.target, this._gestures.$release);
            if (!isNull(domEvent)) {
                domEvent.trigger(ev);
            }
            this.__hasRelease = false;
        };
        /**
         */
        DomEvents.prototype.__handleSwipe = function () {
            // if swiping events exist 
            if (this._gestureCount.$swipe <= 0) {
                return;
            }
            var lastMove = this.__lastMoveEvent;
            if (isNull(lastMove)) {
                return;
            }
            var origin = this.__swipeOrigin, dx = Math.abs(lastMove.clientX - origin.clientX), dy = Math.abs(lastMove.clientY - origin.clientY), swipeSubscribers = this.__getRegisteredSwipes(lastMove.direction, lastMove.velocity, dx, dy);
            while (swipeSubscribers.length > 0) {
                swipeSubscribers.pop().trigger(lastMove);
            }
            this.__lastMoveEvent = null;
        };
        /**
         * @param {ui.IPointerEvent} ev The touch move event object.
         * @param {ui.IPointerEvent} originalEv The original touch move event object
         * used for preventing default in the case of an ANDROID device.
         */
        DomEvents.prototype.__handleTrack = function (ev, originalEv) {
            var gestures = this._gestures, trackGesture = gestures.$track, direction = ev.direction, eventTarget = this.__capturedTarget || ev.target;
            var domEvents = this.__findFirstSubscribers(eventTarget, [trackGesture, (trackGesture + direction.x), (trackGesture + direction.y)]);
            if (this._android44orBelow) {
                var anyEvents = this.__findFirstSubscribers(eventTarget, [trackGesture, gestures.$trackdown, gestures.$trackup,
                    gestures.$trackleft, gestures.$trackright, gestures.$trackend]);
                if (anyEvents.length > 0) {
                    originalEv.preventDefault();
                }
            }
            if (domEvents.length > 0) {
                if (this._androidVersion > -1) {
                    originalEv.preventDefault();
                }
                while (domEvents.length > 0) {
                    domEvents.pop().trigger(ev);
                }
            }
        };
        /**
         * @param {ui.IPointerEvent} ev The touch end event object.
         */
        DomEvents.prototype.__handleTrackEnd = function (ev) {
            if (this._gestureCount.$trackend <= 0) {
                return;
            }
            var eventTarget = this.__capturedTarget || ev.target, domEvent = this.__findFirstSubscriber(eventTarget, this._gestures.$trackend);
            if (isNull(domEvent)) {
                return;
            }
            domEvent.trigger(ev);
        };
        /**
         * @param {ui.IExtendedEvent} ev The touch event object.
         */
        DomEvents.prototype.__handleMappedEvent = function (ev) {
            var mappedType = ev.type, eventType = this.__reverseMap[mappedType], domEvent = this.__findFirstSubscriber(ev.target, eventType);
            if (isNull(domEvent)) {
                return;
            }
            ev = this.__standardizeEventObject(ev);
            if (isNull(ev)) {
                return;
            }
            domEvent.trigger(ev);
        };
        // touch type and element registration 
        /**
         */
        DomEvents.prototype.__getTypes = function () {
            var _compat = this._compat, touchEvents = _compat.mappedEvents, listeners = this.__listeners, startEvents, moveEvents, endEvents;
            if (_compat.hasPointerEvents) {
                startEvents = this._startEvents = touchEvents.$touchstart;
                moveEvents = this._moveEvents = touchEvents.$touchmove;
                endEvents = this._endEvents = touchEvents.$touchend + ' ' + touchEvents.$touchcancel;
            }
            else if (_compat.hasTouchEvents) {
                startEvents = this._startEvents = touchEvents.$touchstart + ' mousedown';
                moveEvents = this._moveEvents = touchEvents.$touchmove + ' mousemove';
                endEvents = this._endEvents = touchEvents.$touchend + ' mouseup ' + touchEvents.$touchcancel;
            }
            else {
                var cancelEvent = touchEvents.$touchcancel;
                startEvents = this._startEvents = touchEvents.$touchstart;
                moveEvents = this._moveEvents = touchEvents.$touchmove;
                endEvents = this._endEvents = touchEvents.$touchend + (!cancelEvent ? '' : (' ' + cancelEvent));
            }
            listeners[startEvents] = this._onTouchStart.bind(this);
            listeners[moveEvents] = this._onTouchMove.bind(this);
            listeners[endEvents] = this._onTouchEnd.bind(this);
        };
        /**
         */
        DomEvents.prototype.__registerTypes = function () {
            this.__registerType(this._startEvents);
            this.__registerType(this._endEvents);
            // dragstart will cause touchend to not fire 
            this._document.addEventListener('dragstart', this.__preventDefault, false);
        };
        /**
         */
        DomEvents.prototype.__unregisterTypes = function () {
            this.__unregisterType(this._startEvents);
            this.__unregisterType(this._endEvents);
            if (this.__detectingMove) {
                this.__unregisterType(this._moveEvents);
                this.__detectingMove = false;
            }
            this._document.removeEventListener('dragstart', this.__preventDefault, false);
        };
        /**
         * @param {string} events The events to begin listening for.
         */
        DomEvents.prototype.__registerType = function (events) {
            var listener = this.__listeners[events], _document = this._document, eventSplit = events.split(' '), index = eventSplit.length;
            while (index-- > 0) {
                _document.addEventListener(eventSplit[index], listener, false);
            }
        };
        /**
         * @param {string} events The events to stop listening for.
         */
        DomEvents.prototype.__unregisterType = function (events) {
            var listener = this.__listeners[events], _document = this._document, eventSplit = events.split(' '), index = eventSplit.length;
            while (index-- > 0) {
                _document.removeEventListener(eventSplit[index], listener, false);
            }
        };
        /**
         * @param {ui.ICustomElement} element The element being tied to a custom event.
         * @param {string} type The type of event.
         */
        DomEvents.prototype.__registerElement = function (element, type) {
            var id, _plat = element.__plat;
            if (isNull(_plat)) {
                id = uniqueId('domEvent_');
                element.__plat = _plat = {
                    domEvent: id
                };
            }
            else if (isNull(_plat.domEvent)) {
                id = uniqueId('domEvent_');
                _plat.domEvent = id;
            }
            var _domEvent;
            if (isNull(id)) {
                var subscriber = this._subscribers[_plat.domEvent];
                if (isUndefined(subscriber[type])) {
                    _domEvent = new CustomDomEvent(element, type);
                    subscriber[type] = _domEvent;
                }
                else {
                    subscriber[type].count++;
                }
                subscriber.gestureCount++;
                return;
            }
            var newSubscriber = { gestureCount: 1 };
            _domEvent = new CustomDomEvent(element, type);
            newSubscriber[type] = _domEvent;
            this._subscribers[id] = newSubscriber;
            if (!isUndefined(element.className)) {
                addClass(element, DomEvents.config.styleConfig[0].className);
            }
            this.__removeSelections(element);
        };
        /**
         * @param {ui.ICustomElement} element The element being disassociated with the given custom event.
         * @param {string} type The type of event.
         */
        DomEvents.prototype.__unregisterElement = function (element, type) {
            var _plat = element.__plat;
            if (isNull(_plat) || isNull(_plat.domEvent)) {
                return;
            }
            var domEventId = _plat.domEvent, eventSubscriber = this._subscribers[domEventId], domEvent = eventSubscriber[type];
            if (isNull(domEvent)) {
                return;
            }
            domEvent.count--;
            if (domEvent.count === 0) {
                deleteProperty(eventSubscriber, type);
            }
            eventSubscriber.gestureCount--;
            if (eventSubscriber.gestureCount === 0) {
                deleteProperty(this._subscribers, domEventId);
                this.__removeElement(element);
            }
        };
        /**
         * @param {ui.IPointerEvent} ev The current point being touched.
         */
        DomEvents.prototype.__setTouchPoint = function (ev) {
            var eventType = ev.type, _compat = this._compat;
            if (_compat.hasPointerEvents || _compat.hasMsPointerEvents) {
                this.__updatePointers(ev, this.__pointerEndRegex.test(eventType));
                return;
            }
            ev.pointerType = eventType.indexOf('mouse') === -1 ? 'touch' : 'mouse';
        };
        /**
         * @param {EventTarget} target The target to capture.
         */
        DomEvents.prototype.__setCapture = function (target) {
            if (isNull(this.__capturedTarget) && !isDocument(target)) {
                this.__capturedTarget = target;
            }
        };
        /**
         * @param {ui.IPointerEvent} ev The current touch point.
         * @param {boolean} remove Whether to remove the touch point or add it.
         */
        DomEvents.prototype.__updatePointers = function (ev, remove) {
            var id = ev.pointerId, pointerHash = this.__pointerHash, pointer = pointerHash[id], index;
            if (remove) {
                if (!isUndefined(pointer)) {
                    index = this.__pointerEvents.indexOf(pointer);
                    if (index > -1) {
                        this.__pointerEvents.splice(index, 1);
                    }
                    deleteProperty(this.__pointerHash, id);
                }
            }
            else {
                if (id === 1 && !isEmpty(pointerHash)) {
                    // this is a mouse movement while mid touch 
                    return;
                }
                ev.identifier = ev.pointerId;
                if (isUndefined(pointer) || (index = this.__pointerEvents.indexOf(pointer)) < 0) {
                    this.__pointerEvents.push(ev);
                }
                else {
                    this.__pointerEvents.splice(index, 1, ev);
                }
                pointerHash[id] = ev;
            }
        };
        // event and subscription handling 
        /**
         * @param {ui.ICustomElement} eventTarget The current target of the touch event.
         * @param {string} type The type of event being searched for.
         */
        DomEvents.prototype.__findFirstSubscriber = function (eventTarget, type) {
            if (isNull(eventTarget)) {
                return;
            }
            var _plat, subscriber, domEvent;
            do {
                _plat = eventTarget.__plat;
                if (isUndefined(_plat) || isUndefined(_plat.domEvent)) {
                    continue;
                }
                subscriber = this._subscribers[_plat.domEvent];
                domEvent = subscriber[type];
                if (isUndefined(domEvent)) {
                    continue;
                }
                return domEvent;
            } while (!isNull(eventTarget = eventTarget.parentNode));
        };
        /**
         * @param {ui.ICustomElement} eventTarget The current target of the touch event.
         * @param {Array<string>} types An array of the types of events being searched for.
         */
        DomEvents.prototype.__findFirstSubscribers = function (eventTarget, types) {
            if (isNull(eventTarget)) {
                return [];
            }
            var _plat, subscriber, subscriberKeys, subscriberKey, domEvents = [], index;
            do {
                _plat = eventTarget.__plat;
                if (isUndefined(_plat) || isUndefined(_plat.domEvent)) {
                    continue;
                }
                subscriber = this._subscribers[_plat.domEvent];
                subscriberKeys = Object.keys(subscriber);
                while (subscriberKeys.length > 0) {
                    subscriberKey = subscriberKeys.pop();
                    index = types.indexOf(subscriberKey);
                    if (index !== -1) {
                        domEvents.push(subscriber[subscriberKey]);
                        types.splice(index, 1);
                    }
                }
            } while (types.length > 0 && !isNull(eventTarget = eventTarget.parentNode));
            return domEvents;
        };
        /**
         * @param {number} count The number of mapped events registered.
         * @param {string} mappedEvent The mapped event type.
         * @param {boolean} useCapture? Whether the mapped event listener is fired on the capture or bubble phase.
         */
        DomEvents.prototype.__addMappedEvent = function (count, mappedEvent, useCapture) {
            var _this = this;
            var _document = this._document;
            if (count === 0) {
                _document.addEventListener(mappedEvent, this.__mappedEventListener, useCapture);
            }
            return function () {
                _document.removeEventListener(mappedEvent, _this.__mappedEventListener, useCapture);
            };
        };
        /**
         * @param {ui.ICustomElement} element The element to remove the listener from.
         * @param {string} type The type of event being removed.
         * @param {ui.IGestureListener} listener The listener being removed.
         * @param {boolean} useCapture? Whether the listener is fired on the capture or bubble phase.
         */
        DomEvents.prototype.__removeEventListener = function (element, type, listener, useCapture) {
            var gestures = this._gestures;
            element.removeEventListener(type, listener, useCapture);
            var swipeGesture = gestures.$swipe, trackGesture = gestures.$track, countType = type;
            if (type.indexOf(trackGesture) !== -1) {
                var trackend = gestures.$trackend;
                countType = type === trackend ? trackend : trackGesture;
            }
            else if (type.indexOf(swipeGesture) !== -1) {
                countType = swipeGesture;
            }
            this._gestureCount[countType]--;
            this.__unregisterElement(element, type);
        };
        /**
         * @param {ui.ICustomElement} element The element being removed.
         */
        DomEvents.prototype.__removeElement = function (element) {
            this.__returnSelections(element);
            if (!isUndefined(element.className)) {
                removeClass(element, DomEvents.config.styleConfig[0].className);
            }
            var plat = element.__plat;
            deleteProperty(plat, 'domEvent');
            if (isEmpty(plat)) {
                deleteProperty(element, '__plat');
            }
        };
        /**
         * @param {ui.IExtendedEvent} ev The event object to be standardized.
         */
        DomEvents.prototype.__standardizeEventObject = function (ev) {
            this.__setTouchPoint(ev);
            var isStart = this._startEvents.indexOf(ev.type) !== -1, touches = ev.touches || this.__pointerEvents, changedTouches = ev.changedTouches, changedTouchesExist = !isUndefined(changedTouches), preventDefault, timeStamp = ev.timeStamp;
            if (changedTouchesExist) {
                if (isStart) {
                    preventDefault = ev.preventDefault.bind(ev);
                    ev = changedTouches[0];
                    ev.preventDefault = preventDefault;
                }
                else {
                    var changedTouchIndex = this.__getTouchIndex(changedTouches);
                    if (changedTouchIndex >= 0) {
                        preventDefault = ev.preventDefault.bind(ev);
                        ev = changedTouches[changedTouchIndex];
                        ev.preventDefault = preventDefault;
                    }
                    else if (this.__getTouchIndex(touches) >= 0) {
                        // we want to return null because our point of interest is in touches 
                        // but was not in changedTouches so it is still playing a part on the page 
                        return null;
                    }
                }
            }
            if (isStart) {
                this.__setCapture(ev.target);
            }
            this.__normalizeButtons(ev);
            ev.touches = touches;
            ev.offset = this.__getOffset(ev);
            if (isUndefined(ev.timeStamp) || timeStamp > ev.timeStamp) {
                ev.timeStamp = timeStamp;
            }
            return ev;
        };
        /**
         * @param {ui.IExtendedEvent} ev The event.
         */
        DomEvents.prototype.__normalizeButtons = function (ev) {
            var buttons;
            if (isNumber(ev.buttons) && ev.buttons !== 0) {
                buttons = ev.buttons;
            }
            else if (isNumber(ev.which) && ev.which > 0) {
                buttons = ev.which;
            }
            else {
                switch (ev.button) {
                    case -1:
                        buttons = 0;
                        break;
                    case 0:
                        buttons = 1;
                        break;
                    case 1:
                        buttons = 4;
                        break;
                    case 2:
                        buttons = 2;
                        break;
                    case 3:
                        buttons = 8;
                        break;
                    case 4:
                        buttons = 16;
                        break;
                    default:
                        buttons = 1;
                        break;
                }
            }
            ev._buttons = buttons;
        };
        /**
         * @param {Array<ui.IExtendedEvent>} ev The array of touch event objects
         * to search through.
         */
        DomEvents.prototype.__getTouchIndex = function (touches) {
            var identifier = (this.__lastTouchDown || {}).identifier, length = touches.length;
            for (var i = 0; i < length; ++i) {
                if (touches[i].identifier === identifier) {
                    return i;
                }
            }
            return -1;
        };
        /**
         * @param {ui.IExtendedEvent} ev The current event object.
         */
        DomEvents.prototype.__getOffset = function (ev) {
            var target = this.__capturedTarget || ev.target;
            if (isDocument(target)) {
                return {
                    x: ev.clientX,
                    y: ev.clientY
                };
            }
            else if (!isUndefined(ev.offsetX) && target === ev.target) {
                return {
                    x: ev.offsetX,
                    y: ev.offsetY
                };
            }
            var x = target.offsetLeft, y = target.offsetTop;
            while (!isNull(target = target.offsetParent)) {
                x += target.offsetLeft;
                y += target.offsetTop;
            }
            return {
                x: (ev.clientX - x),
                y: (ev.clientY - y)
            };
        };
        // utility methods 
        /**
         * @param {number} x1 The x-coordinate of the first point.
         * @param {number} x2 The x-coordinate of the second point.
         * @param {number} y1 The y-coordinate of the first point.
         * @param {number} y2 The y-coordinate of the second point.
         */
        DomEvents.prototype.__getDistance = function (x1, x2, y1, y2) {
            var x = x2 - x1, y = y2 - y1;
            return Math.sqrt((x * x) + (y * y));
        };
        /**
         * @param {number} dx The change in x position.
         * @param {number} dy The change in y position.
         * @param {number} dtx The change in time in x direction.
         * @param {number} dty The change in time in y direction.
         */
        DomEvents.prototype.__getVelocity = function (dx, dy, dtx, dty) {
            var x = 0, y = 0;
            if (dtx > 0) {
                x = (dx / dtx) || 0;
            }
            if (dty > 0) {
                y = (dy / dty) || 0;
            }
            return {
                x: x,
                y: y
            };
        };
        /**
         * @param {number} dx The change in x position.
         * @param {number} dy The change in y position.
         */
        DomEvents.prototype.__getDirection = function (dx, dy) {
            var distanceX = Math.abs(dx), distanceY = Math.abs(dy), lastDirection = (this.__lastMoveEvent || {}).direction || {}, horizontal = dx === 0 ? (lastDirection.x || 'none') : (dx < 0 ? 'left' : 'right'), vertical = dy === 0 ? (lastDirection.y || 'none') : (dy < 0 ? 'up' : 'down');
            return {
                x: horizontal,
                y: vertical,
                primary: (distanceX === distanceY ? (lastDirection.primary || 'none') : (distanceX > distanceY ? horizontal : vertical))
            };
        };
        /**
         * @param {ui.IDirection} direction The current vertical and horiztonal directions of movement.
         */
        DomEvents.prototype.__handleOriginChange = function (direction) {
            var lastMove = this.__lastMoveEvent;
            if (isNull(lastMove)) {
                return;
            }
            var swipeDirection = lastMove.direction, xSame = swipeDirection.x === direction.x, ySame = swipeDirection.y === direction.y;
            if (xSame && ySame) {
                return;
            }
            var origin = this.__swipeOrigin, gestures = this._gestures, swipes = [gestures.$swipe, gestures.$swipedown, gestures.$swipeleft, gestures.$swiperight, gestures.$swipeup];
            if (!xSame) {
                origin.clientX = lastMove.clientX;
                origin.xTimestamp = lastMove.timeStamp;
                origin.xTarget = lastMove.target;
                if (this._android44orBelow) {
                    this.__haveSwipeSubscribers = this.__findFirstSubscribers(origin.xTarget, swipes).length > 0;
                }
            }
            if (!ySame) {
                origin.clientY = lastMove.clientY;
                origin.yTimestamp = lastMove.timeStamp;
                origin.yTarget = lastMove.target;
                if (this._android44orBelow) {
                    this.__haveSwipeSubscribers = this.__findFirstSubscribers(origin.yTarget, swipes).length > 0;
                }
            }
        };
        /**
         * @param {ui.IDirection} direction The current horizontal and vertical directions of movement.
         * @param {ui.IVelocity} velocity The current horizontal and vertical velocities.
         * @param {number} dx The distance in the x direction.
         * @param {number} dy The distance in the y direction.
         */
        DomEvents.prototype.__getRegisteredSwipes = function (direction, velocity, dx, dy) {
            var swipeTarget, swipeGesture = this._gestures.$swipe, minSwipeVelocity = DomEvents.config.velocities.minSwipeVelocity, events = [swipeGesture], origin = (this.__swipeOrigin || {});
            if (dx > dy) {
                swipeTarget = origin.xTarget;
                if (velocity.x >= minSwipeVelocity) {
                    events.push(swipeGesture + direction.x);
                }
            }
            else if (dy > dx) {
                swipeTarget = origin.yTarget;
                if (velocity.y >= minSwipeVelocity) {
                    events.push(swipeGesture + direction.y);
                }
            }
            return this.__findFirstSubscribers(swipeTarget, events);
        };
        /**
         * @param {string} direction The current direction of movement.
         */
        DomEvents.prototype.__isHorizontal = function (direction) {
            return direction === 'left' || direction === 'right';
        };
        /**
         */
        DomEvents.prototype.__appendGestureStyle = function () {
            var _document = this._document, styleClasses, classLength;
            if (this._compat.platCss) {
                return;
            }
            else if (!isNull(_document.styleSheets) && _document.styleSheets.length > 0) {
                var styleSheet = _document.styleSheets[0];
                styleClasses = DomEvents.config.styleConfig;
                classLength = styleClasses.length;
                while (classLength-- > 0) {
                    styleSheet.insertRule(this.__createStyle(styleClasses[classLength]), 0);
                }
                return;
            }
            var head = _document.head, style = _document.createElement('style'), textContent = '';
            style.type = 'text/css';
            styleClasses = DomEvents.config.styleConfig;
            classLength = styleClasses.length;
            while (classLength-- > 0) {
                textContent = this.__createStyle(styleClasses[classLength]) + textContent;
            }
            style.textContent = textContent;
            head.appendChild(style);
        };
        /**
         * @param {ui.IDefaultStyle} styleClass The object containing the custom styles for
         * gestures.
         */
        DomEvents.prototype.__createStyle = function (styleClass) {
            var styles = styleClass.styles || [], styleLength = styles.length, style = '.' + styleClass.className + ' { ', textContent = '';
            styleLength = styles.length;
            for (var j = 0; j < styleLength; ++j) {
                textContent += styles[j] + ';';
            }
            style += textContent + ' } ';
            return style;
        };
        /**
         */
        DomEvents.prototype.__blurFocusedElement = function () {
            var focusedElement = this.__focusedElement || {};
            if (isFunction(focusedElement.blur)) {
                focusedElement.blur();
            }
        };
        /**
         * @param {HTMLInputElement} target The target to listen for the blur event on.
         */
        DomEvents.prototype.__waitForBlur = function (target) {
            var _this = this;
            this.__blurRemover = this.addEventListener(target, 'blur', function () {
                _this.__blurRemover();
                _this.__blurRemover = noop;
                if (target === _this.__focusedElement) {
                    _this.__focusedElement = null;
                }
            }, false);
        };
        /**
         * @param {HTMLInputElement} target The target to handle click functionaliy for.
         */
        DomEvents.prototype.__clickTarget = function (target) {
            var _this = this;
            var clicked = false, handler = function () {
                clicked = true;
                target.removeEventListener('click', handler, false);
            };
            target.addEventListener('click', handler, false);
            postpone(function () {
                if (clicked) {
                    return;
                }
                target.removeEventListener('click', handler, false);
                if (_this._document.body.contains(target) && isFunction(target.click)) {
                    target.click();
                }
            });
        };
        /**
         * @param {HTMLInputElement} target The target to handle functionality for.
         */
        DomEvents.prototype.__handleInput = function (target) {
            this.__blurRemover();
            var nodeName = target.nodeName;
            if (!isString(nodeName)) {
                this.__focusedElement = null;
                this.__blurFocusedElement();
                return;
            }
            var preventDefault = true;
            switch (nodeName.toLowerCase()) {
                case 'input':
                    switch (target.type) {
                        case 'range':
                            this.__blurFocusedElement();
                            break;
                        case 'text':
                        case 'password':
                        case 'email':
                        case 'number':
                        case 'tel':
                        case 'search':
                        case 'url':
                            target.focus();
                            this.__waitForBlur(target);
                            break;
                        default:
                            this.__blurFocusedElement();
                            this.__clickTarget(target);
                            break;
                    }
                    break;
                case 'a':
                case 'button':
                case 'label':
                    this.__blurFocusedElement();
                    this.__clickTarget(target);
                    break;
                case 'textarea':
                    target.focus();
                    this.__waitForBlur(target);
                    break;
                case 'select':
                    preventDefault = false;
                    break;
                default:
                    this.__blurFocusedElement();
                    this.__clickTarget(target);
                    break;
            }
            this.__focusedElement = target;
            return preventDefault;
        };
        /**
         */
        DomEvents.prototype.__preventClickFromTouch = function () {
            var _document = this._document, ignoreEvents = this.__ignoreEvent, boundPreventDefault = this.__boundPreventDefaultClick, interval = DomEvents.config.intervals.delayedClickInterval;
            if (interval <= 0) {
                return;
            }
            this.__delayedClickRemover = {
                mousedown: defer(function () {
                    ignoreEvents.mousedown = false;
                }, interval),
                mouseup: defer(function () {
                    ignoreEvents.mouseup = false;
                }, interval),
                click: defer(function () {
                    _document.removeEventListener('click', boundPreventDefault, true);
                }, interval)
            };
            ignoreEvents.mousedown = ignoreEvents.mouseup = true;
            postpone(function () {
                _document.addEventListener('click', boundPreventDefault, true);
            });
        };
        /**
         * @param {Event} ev The event object.
         */
        DomEvents.prototype.__preventDefaultClick = function (ev) {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            this._document.removeEventListener('click', this.__boundPreventDefaultClick, true);
            this.__delayedClickRemover.click();
            return false;
        };
        /**
         * @param {Node} element The element to remove selections on.
         */
        DomEvents.prototype.__removeSelections = function (element) {
            if (!isNode(element)) {
                return;
            }
            if (!isUndefined(element.onselectstart)) {
                element.addEventListener('selectstart', this.__preventDefault, false);
            }
            if (!isUndefined(element.ondragstart)) {
                element.addEventListener('dragstart', this.__preventDefault, false);
            }
        };
        /**
         * @param {Node} element The element to return selections on.
         */
        DomEvents.prototype.__returnSelections = function (element) {
            if (!isNode(element)) {
                return;
            }
            if (!isUndefined(element.onselectstart)) {
                element.removeEventListener('selectstart', this.__preventDefault, false);
            }
            if (!isUndefined(element.ondragstart)) {
                element.removeEventListener('dragstart', this.__preventDefault, false);
            }
        };
        /**
         * @param {Event} ev The event object.
         */
        DomEvents.prototype.__preventDefault = function (ev) {
            var nodeName = ev.target.nodeName;
            if (isString(nodeName)) {
                nodeName = nodeName.toLowerCase();
            }
            if (nodeName === 'input' || nodeName === 'textarea') {
                return true;
            }
            ev.preventDefault();
            return false;
        };
        DomEvents._inject = {
            _document: __Document,
            _compat: __Compat
        };
        /**
         */
        DomEvents.config = {
            /**
             */
            intervals: {
                /**
                 */
                tapInterval: 300,
                /**
                 */
                dblTapInterval: 300,
                /**
                 */
                holdInterval: 400,
                /**
                 */
                dblTapZoomDelay: 0,
                /**
                 */
                delayedClickInterval: 400
            },
            /**
             */
            distances: {
                /**
                 */
                minScrollDistance: 3,
                /**
                 */
                maxDblTapDistance: 10
            },
            /**
             */
            velocities: {
                /**
                 */
                minSwipeVelocity: 0.645
            },
            /**
             */
            styleConfig: [{
                    /**
                     */
                    className: 'plat-gesture',
                    /**
                     */
                    styles: [
                        '-moz-user-select: none',
                        '-khtml-user-select: none',
                        '-webkit-touch-callout: none',
                        '-webkit-user-select: none',
                        '-webkit-user-drag: none',
                        '-webkit-tap-highlight-color: transparent',
                        '-webkit-overflow-scrolling: touch',
                        '-ms-user-select: none',
                        '-ms-touch-action: manipulation',
                        'touch-action: manipulation'
                    ]
                }, {
                    /**
                     */
                    className: 'plat-no-touch-action',
                    /**
                     */
                    styles: [
                        '-ms-touch-action: none',
                        'touch-action: none'
                    ]
                }]
        };
        /**
         */
        DomEvents.gestures = {
            $tap: __tap,
            $dbltap: __dbltap,
            $hold: __hold,
            $release: __release,
            $swipe: __swipe,
            $swipeleft: __swipeleft,
            $swiperight: __swiperight,
            $swipeup: __swipeup,
            $swipedown: __swipedown,
            $track: __track,
            $trackleft: __trackleft,
            $trackright: __trackright,
            $trackup: __trackup,
            $trackdown: __trackdown,
            $trackend: __trackend
        };
        return DomEvents;
    })();
    ui.DomEvents = DomEvents;
    register.injectable(__DomEvents, DomEvents);
    /**
     */
    function IDomEventsConfig() {
        return DomEvents.config;
    }
    ui.IDomEventsConfig = IDomEventsConfig;
    register.injectable(__IDomEventsConfig, IDomEventsConfig);
    /**
     */
    var DomEvent = (function () {
        function DomEvent() {
            /**
             */
            this._document = acquire(__Document);
        }
        DomEvent.prototype.initialize = function (element, event, eventType) {
            this.element = element;
            this.event = event;
            this.eventType = isString(eventType) ? eventType : 'CustomEvent';
        };
        /**
         * @param {Object} eventExtension? An event extension to extend the dispatched CustomEvent.
         * @param {any} detailArg? The detail arg to include in the event object
         * @param {Node} dispatchElement? The element to dispatch the Event from. If not specified,
         * this instance's element will be used.
         */
        DomEvent.prototype.trigger = function (eventExtension, detailArg, dispatchElement) {
            var customEv = this._document.createEvent(this.eventType);
            if (isObject(eventExtension)) {
                _extend(false, false, customEv, eventExtension);
            }
            customEv.initCustomEvent(this.event, true, true, isNull(detailArg) ? 0 : detailArg);
            return (dispatchElement || this.element).dispatchEvent(customEv);
        };
        return DomEvent;
    })();
    ui.DomEvent = DomEvent;
    register.injectable(__DomEventInstance, DomEvent, null, __INSTANCE);
    /**
     */
    var CustomDomEvent = (function (_super) {
        __extends(CustomDomEvent, _super);
        function CustomDomEvent(element, event) {
            _super.call(this);
            /**
             */
            this.count = 0;
            this.element = element;
            this.event = event;
            this.count++;
        }
        /**
         * @param {ui.IPointerEvent} ev The current touch event object used to extend the
         * newly created custom event.
         */
        CustomDomEvent.prototype.trigger = function (ev) {
            var customEv = this._document.createEvent('CustomEvent'), element = this.element, target = ev.target;
            this.__extendEventObject(customEv, ev);
            customEv.initCustomEvent(this.event, true, true, 0);
            var success = isDocument(element) || element.contains(target) ? target.dispatchEvent(customEv) : element.dispatchEvent(customEv);
            if (!success) {
                ev.preventDefault();
            }
            return success;
        };
        /**
         * @param {ui.IGestureEvent} customEv The newly created custom event object.
         * @param {ui.IPointerEvent} ev The current touch event object.
         */
        CustomDomEvent.prototype.__extendEventObject = function (customEv, ev) {
            // not using extend function because this gets called so often for certain events. 
            var pointerType = ev.pointerType;
            customEv.clientX = ev.clientX;
            customEv.clientY = ev.clientY;
            customEv.offsetX = ev.offset.x;
            customEv.offsetY = ev.offset.y;
            customEv.direction = ev.direction || {
                x: 'none',
                y: 'none',
                primary: 'none'
            };
            customEv.touches = ev.touches;
            customEv.velocity = ev.velocity || { x: 0, y: 0 };
            customEv.identifier = ev.identifier || 0;
            customEv.pointerType = isNumber(pointerType) ? this.__convertPointerType(pointerType, ev.type) : pointerType;
            customEv.screenX = ev.screenX;
            customEv.screenY = ev.screenY;
            customEv.pageX = ev.pageX;
            customEv.pageY = ev.pageY;
            customEv.buttons = ev._buttons;
        };
        /**
         * @param {any} pointerType The pointer type as either a number or a string.
         * @param {string} eventType The touch event type.
         */
        CustomDomEvent.prototype.__convertPointerType = function (pointerType, eventType) {
            switch (pointerType) {
                case MSPointerEvent.MSPOINTER_TYPE_MOUSE:
                    return 'mouse';
                case MSPointerEvent.MSPOINTER_TYPE_PEN:
                    return 'pen';
                case MSPointerEvent.MSPOINTER_TYPE_TOUCH:
                    return 'touch';
            }
            return (eventType.indexOf('mouse') === -1) ? 'touch' : 'mouse';
        };
        return CustomDomEvent;
    })(DomEvent);
    /**
     */
    var animations;
    (function (animations) {
        /**
         */
        var Animator = (function () {
            function Animator() {
                /**
                 */
                this._animatedElements = {};
            }
            Animator.prototype.create = function (elements, key, options) {
                return this._create(elements, key, options, {
                    key: null
                });
            };
            Animator.prototype.animate = function (elements, key, options) {
                return this._animate(elements, key, options, {
                    key: null
                });
            };
            Animator.prototype.enter = function (elements, key, parent, refChild, options) {
                return this._animate(elements, key, options, {
                    key: 'enter',
                    parent: parent,
                    refChild: refChild
                });
            };
            Animator.prototype.leave = function (elements, key, options) {
                return this._animate(elements, key, options, {
                    key: 'leave'
                });
            };
            Animator.prototype.move = function (elements, key, parent, refChild, options) {
                return this._animate(elements, key, options, {
                    key: 'move',
                    parent: parent,
                    refChild: refChild
                });
            };
            Animator.prototype.show = function (elements, key, options) {
                return this._animate(elements, key, options, {
                    key: 'show'
                });
            };
            Animator.prototype.hide = function (elements, key, options) {
                return this._animate(elements, key, options, {
                    key: 'hide'
                });
            };
            /**
             */
            Animator.prototype.all = function (promises) {
                var _this = this;
                var length = promises.length, args = [], animationPromise = new AnimationPromise(function (resolve) {
                    _this._Promise.all(promises).then(function () {
                        resolve();
                    });
                });
                for (var i = 0; i < length; ++i) {
                    args = args.concat(promises[i].getInstances());
                }
                animationPromise.initialize(args);
                return animationPromise.then(noop);
            };
            /**
             */
            Animator.prototype.resolve = function () {
                var animationPromise = new AnimationPromise(function (resolve) {
                    resolve(function () {
                        return animationPromise;
                    });
                });
                return animationPromise;
            };
            /**
             * @param {any} elements The Nodes to be animated. All nodes in the Array must have
             * the same parent, otherwise the animation will not function correctly.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             * @param {ui.animations.IAnimationFunction} functionality An object containing detailed information about
             * special animation functionality.
             */
            Animator.prototype._animate = function (elements, key, options, functionality) {
                var animation = this._create(elements, key, options, functionality), current = animation.current;
                animation.previous.then(function () {
                    requestAnimationFrameGlobal(function () {
                        current.start();
                    });
                });
                return current;
            };
            /**
             * @param {any} elements The Nodes to be animated. All nodes in the Array must have
             * the same parent, otherwise the animation will not function correctly.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             * @param {ui.animations.IAnimationFunction} functionality An object containing detailed information about
             * special animation functionality.
             */
            Animator.prototype._create = function (elements, key, options, functionality) {
                var _this = this;
                var animationInjector = animationInjectors[key], animationInstances = [], elementNodes = [], immediateResolve;
                if (!this._compat.animationSupported || isUndefined(animationInjector)) {
                    animationInjector = jsAnimationInjectors[key];
                    if (isUndefined(animationInjector)) {
                        elements = this.__constructAnimatableElements(elements, { inject: noop }, elementNodes, animationInstances);
                        this._handlePreInitFunctionality(elements, elementNodes, functionality);
                        this._handlePostInitFunctionality(elements, elementNodes, functionality);
                        this._handleEndFunctionality(elements, elementNodes, functionality);
                        immediateResolve = this.resolve();
                        return { previous: immediateResolve, current: immediateResolve };
                    }
                }
                elements = this.__constructAnimatableElements(elements, animationInjector, elementNodes, animationInstances);
                var length = elementNodes.length;
                if (length === 0) {
                    this._handlePreInitFunctionality(elements, elementNodes, functionality);
                    this._handlePostInitFunctionality(elements, elementNodes, functionality);
                    this._handleEndFunctionality(elements, elementNodes, functionality);
                    immediateResolve = this.resolve();
                    return { previous: immediateResolve, current: immediateResolve };
                }
                this._handlePreInitFunctionality(elements, elementNodes, functionality);
                var id = uniqueId('animation_'), previousAnimations = this.__setAnimationId(id, elementNodes), previousPromise, animationPromise = new AnimationPromise(function (resolve) {
                    var _Promise = _this._Promise;
                    previousPromise = _Promise.all(previousAnimations).then(function () {
                        var animationPromises = [];
                        for (var i = 0; i < length; ++i) {
                            animationPromises.push(animationInstances[i].instantiate(elementNodes[i], options));
                        }
                        _this._handlePostInitFunctionality(elements, elementNodes, functionality);
                        var animationsFinished = _Promise.all(animationPromises), animatingParentId = _this.__isParentAnimating(elementNodes), animatedElement = _this.__generateAnimatedElement(id, elementNodes, animationPromise);
                        if (!isNull(animatingParentId)) {
                            _this._handleEndFunctionality(elements, elementNodes, functionality);
                            animatedElement.animationEnd(true);
                            var parent_1 = _this._animatedElements[animatingParentId], resolvedPromise = isPromise(parent_1.promise) ?
                                function () {
                                    return parent_1.promise;
                                } : function () {
                                return animationPromise;
                            };
                            animationsFinished.then(function () {
                                resolve(resolvedPromise);
                            });
                        }
                        _this.__stopChildAnimations(elementNodes);
                        animatedElement.promise = animationPromise;
                        animationsFinished.then(function () {
                            _this._handleEndFunctionality(elements, elementNodes, functionality);
                            animatedElement.animationEnd();
                            resolve(function () {
                                return animationPromise;
                            });
                        });
                    });
                });
                animationPromise.initialize(animationInstances);
                return { previous: previousPromise, current: animationPromise };
            };
            /**
             * @param {Array<Node>} nodes All the nodes being animated.
             * @param {Array<Element>} elementNodes The animatable nodes being animated (only of type Node.ELEMENT_NODE).
             * @param {ui.animations.IAnimationFunction} functionality The specialized animation function attributes.
             */
            Animator.prototype._handlePreInitFunctionality = function (nodes, elementNodes, functionality) {
                switch (functionality.key) {
                    case 'move':
                        for (var i = 0; i < length; ++i) {
                            removeNode(nodes[i]);
                        }
                        break;
                    default:
                        break;
                }
            };
            /**
             * @param {Array<Node>} nodes All the nodes being animated.
             * @param {Array<Element>} elementNodes The animatable nodes being animated (only of type Node.ELEMENT_NODE).
             * @param {ui.animations.IAnimationFunction} functionality The specialized animation function attributes.
             */
            Animator.prototype._handlePostInitFunctionality = function (nodes, elementNodes, functionality) {
                var length, i;
                switch (functionality.key) {
                    case 'enter':
                    case 'move':
                        var refChild = functionality.refChild, parent_2;
                        if (isNode(refChild)) {
                            parent_2 = refChild.parentNode;
                        }
                        else {
                            parent_2 = functionality.parent;
                            refChild = null;
                        }
                        if (!isNode(parent_2)) {
                            break;
                        }
                        length = nodes.length;
                        for (i = 0; i < length; ++i) {
                            parent_2.insertBefore(nodes[i], refChild);
                        }
                        break;
                    case 'show':
                        length = elementNodes.length;
                        for (i = 0; i < length; ++i) {
                            elementNodes[i].removeAttribute(__Hide);
                        }
                        break;
                    default:
                        break;
                }
            };
            /**
             * @param {Array<Node>} nodes All the nodes being animated.
             * @param {Array<Element>} elementNodes The animatable nodes being animated (only of type Node.ELEMENT_NODE).
             * @param {ui.animations.IAnimationFunction} functionality The specialized animation function attributes.
             */
            Animator.prototype._handleEndFunctionality = function (nodes, elementNodes, functionality) {
                var length, i;
                switch (functionality.key) {
                    case 'leave':
                        length = nodes.length;
                        for (i = 0; i < length; ++i) {
                            removeNode(nodes[i]);
                        }
                        break;
                    case 'hide':
                        length = elementNodes.length;
                        for (i = 0; i < length; ++i) {
                            elementNodes[i].setAttribute(__Hide, '');
                        }
                        break;
                    default:
                        break;
                }
            };
            /**
             * @param {string} id The animation ID.
             * @param {Array<Element>} elements The Array of Elements being animated.
             */
            Animator.prototype.__setAnimationId = function (id, elements) {
                var animatedElements = this._animatedElements, animatedElement, _plat, promises = [], length = elements.length, element;
                for (var i = 0; i < length; ++i) {
                    element = elements[i];
                    _plat = element.__plat;
                    if (isUndefined(_plat)) {
                        element.__plat = { animation: id };
                        addClass(element, __Animating);
                    }
                    else if (isUndefined(_plat.animation)) {
                        _plat.animation = id;
                        addClass(element, __Animating);
                    }
                    else {
                        animatedElement = animatedElements[_plat.animation];
                        if (!isUndefined(animatedElement)) {
                            promises.push(animatedElement.promise);
                            animatedElement.animationEnd(true);
                        }
                        _plat.animation = id;
                    }
                }
                return promises;
            };
            /**
             * @param {string} id The animation ID.
             * @param {Array<Element>} elements The Array of Elements being animated.
             * @param {ui.animations.AnimationPromise} animationPromise The animation's associated promise.
             */
            Animator.prototype.__generateAnimatedElement = function (id, elements, animationPromise) {
                var animatedElements = this._animatedElements, removeListener = function (cancel) {
                    var _plat, element, length = elements.length, animationId;
                    if (cancel === true) {
                        animationPromise.cancel();
                        deleteProperty(animatedElements, id);
                        return;
                    }
                    for (var i = 0; i < length; ++i) {
                        element = elements[i];
                        _plat = element.__plat || {};
                        animationId = _plat.animation;
                        if (isUndefined(animationId) || animationId !== id) {
                            continue;
                        }
                        removeClass(element, __Animating);
                        deleteProperty(_plat, 'animation');
                        if (isEmpty(_plat)) {
                            deleteProperty(element, '__plat');
                        }
                    }
                    deleteProperty(animatedElements, id);
                };
                return animatedElements[id] = {
                    animationEnd: removeListener
                };
            };
            /**
             * @param {Array<Element>} elements The Elements whose parents we need to check.
             */
            Animator.prototype.__isParentAnimating = function (elements) {
                var animationId, element = elements[0];
                while (!(isDocument(element = element.parentNode) || isNull(element) || element.nodeType !== Node.ELEMENT_NODE)) {
                    if (hasClass(element, __Animating)) {
                        var _plat = element.__plat;
                        animationId = (_plat || {}).animation;
                        if (isString(animationId)) {
                            if (!isNull(this._animatedElements[animationId])) {
                                return animationId;
                            }
                            deleteProperty(_plat, 'animation');
                            if (isEmpty(_plat)) {
                                deleteProperty(element, '__plat');
                            }
                            removeClass(element, __Animating);
                        }
                    }
                }
            };
            /**
             * @param {Element} element The element being animated.
             */
            Animator.prototype.__stopChildAnimations = function (elements) {
                var animatingElements = this._animatedElements, slice = Array.prototype.slice, customAnimationElements, animatedElement, _plat, id;
                for (var i = 0; i < elements.length; ++i) {
                    customAnimationElements = slice.call(elements[i].querySelectorAll('.' + __Animating));
                    while (customAnimationElements.length > 0) {
                        _plat = customAnimationElements.pop().__plat || {};
                        id = _plat.animation;
                        if (isNull(id)) {
                            continue;
                        }
                        animatedElement = animatingElements[id] || {};
                        if (isFunction(animatedElement.animationEnd)) {
                            animatedElement.animationEnd(true);
                        }
                    }
                }
            };
            /**
             * @param {any} elements The Array of Nodes, DocumentFragment, or element to sift through.
             * @param {dependency.Injector<ui.animations.BaseAnimation>} animationInjector The injector to instantiate
             * BaseAnimations.
             * @param {Array<Element>} elementNodes The Array of only animatable elements.
             * @param {Array<ui.animations.BaseAnimation>>} animationInstances An empty Array of animation instances to add to.
             */
            Animator.prototype.__constructAnimatableElements = function (elements, animationInjector, elementNodes, animationInstances) {
                if (!isArray(elements)) {
                    if (isDocumentFragment(elements)) {
                        elements = Array.prototype.slice.call(elements.childNodes);
                    }
                    else if (isArrayLike(elements)) {
                        elements = Array.prototype.slice.call(elements);
                    }
                    else if (!(isNode(elements) && elements.nodeType === Node.ELEMENT_NODE)) {
                        return [];
                    }
                    else {
                        elements = [elements];
                    }
                }
                var length = elements.length, element;
                for (var i = 0; i < length; ++i) {
                    element = elements[i];
                    if (isNode(element) && element.nodeType === Node.ELEMENT_NODE) {
                        elementNodes.push(element);
                        animationInstances.push(animationInjector.inject());
                    }
                }
                return elements;
            };
            Animator._inject = {
                _compat: __Compat,
                _Promise: __Promise,
                _document: __Document
            };
            return Animator;
        })();
        animations.Animator = Animator;
        register.injectable(__Animator, Animator);
        /**
         */
        var AnimationPromise = (function (_super) {
            __extends(AnimationPromise, _super);
            function AnimationPromise(resolveFunction, promise) {
                _super.call(this, resolveFunction);
                /**
                 */
                this._Promise = acquire(__Promise);
                /**
                 */
                this.__animationState = 0;
                /**
                 */
                this.__animationInstances = [];
                if (!isNull(promise)) {
                    this.__animationInstances = promise.__animationInstances;
                    this.__animationState = promise.__animationState;
                }
            }
            AnimationPromise.prototype.initialize = function (instances) {
                if (isEmpty(this.__animationInstances)) {
                    if (isArray(instances)) {
                        this.__animationInstances = instances;
                    }
                    else if (isObject(instances)) {
                        this.__animationInstances = [instances];
                    }
                }
            };
            /**
             */
            AnimationPromise.prototype.getInstances = function () {
                return this.__animationInstances;
            };
            /**
             */
            AnimationPromise.prototype.start = function () {
                if (this.__animationState > 0) {
                    return;
                }
                var animationInstances = this.__animationInstances, animationInstance, length = animationInstances.length;
                for (var i = 0; i < length; ++i) {
                    animationInstance = animationInstances[i];
                    if (isFunction(animationInstance.start)) {
                        animationInstance.start();
                    }
                }
                this.__animationState = 1;
            };
            /**
             */
            AnimationPromise.prototype.pause = function () {
                if (this.__animationState !== 1) {
                    return this._Promise.resolve();
                }
                var animationInstances = this.__animationInstances, pausePromises = [], animationInstance, length = animationInstances.length;
                for (var i = 0; i < length; ++i) {
                    animationInstance = animationInstances[i];
                    if (isFunction(animationInstance.pause)) {
                        pausePromises.push(animationInstance.pause());
                    }
                }
                return this._Promise.all(pausePromises).then(noop);
            };
            /**
             */
            AnimationPromise.prototype.resume = function () {
                if (this.__animationState !== 1) {
                    return this._Promise.resolve();
                }
                var animationInstances = this.__animationInstances, resumePromises = [], animationInstance, length = animationInstances.length;
                for (var i = 0; i < length; ++i) {
                    animationInstance = animationInstances[i];
                    if (isFunction(animationInstance.resume)) {
                        resumePromises.push(animationInstance.resume());
                    }
                }
                return this._Promise.all(resumePromises).then(noop);
            };
            /**
             */
            AnimationPromise.prototype.cancel = function () {
                if (this.__animationState === 2) {
                    return this;
                }
                var animationInstances = this.__animationInstances, animationInstance, length = animationInstances.length;
                for (var i = 0; i < length; ++i) {
                    animationInstance = animationInstances[i];
                    if (isFunction(animationInstance.cancel)) {
                        animationInstance.cancel();
                    }
                    if (isFunction(animationInstance.end)) {
                        animationInstance.end();
                    }
                }
                this.__animationState = 2;
                return this;
            };
            /**
             */
            AnimationPromise.prototype.isCanceled = function () {
                return this.__animationState === 2;
            };
            AnimationPromise.prototype.then = function (onFulfilled) {
                return _super.prototype.then.call(this, onFulfilled);
            };
            AnimationPromise.prototype.catch = function (onRejected) {
                return _super.prototype.catch.call(this, onRejected);
            };
            return AnimationPromise;
        })(async.Promise);
        animations.AnimationPromise = AnimationPromise;
        /**
         */
        var BaseAnimation = (function () {
            function BaseAnimation() {
                /**
                 */
                this.__eventListeners = [];
            }
            /**
             */
            BaseAnimation.prototype.initialize = function () { };
            /**
             */
            BaseAnimation.prototype.start = function () { };
            /**
             */
            BaseAnimation.prototype.end = function () {
                var eventListeners = this.__eventListeners;
                while (eventListeners.length > 0) {
                    eventListeners.pop()();
                }
                if (isFunction(this._resolve)) {
                    this._resolve();
                    this._resolve = null;
                }
            };
            /**
             */
            BaseAnimation.prototype.pause = function () {
                return this._Promise.resolve();
            };
            /**
             */
            BaseAnimation.prototype.resume = function () {
                return this._Promise.resolve();
            };
            /**
             */
            BaseAnimation.prototype.cancel = function () {
                this.end();
            };
            /**
             * @param {string} type The type of event to listen to.
             * @param {EventListener} listener The listener to fire when the event occurs.
             * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
             * of event propagation.
             */
            BaseAnimation.prototype.addEventListener = function (type, listener, useCapture) {
                if (!isFunction(listener)) {
                    this._log.warn('An animation\'s "addEventListener" must take a function as the second argument.');
                    return noop;
                }
                listener = listener.bind(this);
                var removeListener = this.dom.addEventListener(this.element, type, function (ev) {
                    ev.stopPropagation();
                    listener(ev);
                }, useCapture), eventListeners = this.__eventListeners;
                eventListeners.push(removeListener);
                return function () {
                    removeListener();
                    var index = eventListeners.indexOf(removeListener);
                    if (index !== -1) {
                        eventListeners.splice(index, 1);
                    }
                };
            };
            /**
             * @param {Element} element The element on which the animation will occur.
             * @param {any} options Specified options for the animation.
             */
            BaseAnimation.prototype.instantiate = function (element, options) {
                var _this = this;
                this.element = element;
                this.options = options;
                var promise = new AnimationPromise(function (resolve) {
                    _this._resolve = resolve;
                    _this.initialize();
                });
                promise.initialize(this);
                return promise;
            };
            BaseAnimation._inject = {
                _window: __Window,
                _compat: __Compat,
                _log: __Log,
                _Promise: __Promise,
                dom: __Dom,
                utils: __Utils
            };
            return BaseAnimation;
        })();
        animations.BaseAnimation = BaseAnimation;
        /**
         */
        var CssAnimation = (function (_super) {
            __extends(CssAnimation, _super);
            function CssAnimation() {
                _super.apply(this, arguments);
                /**
                 */
                this._animationEvents = this._compat.animationEvents;
            }
            /**
             * @param {() => void} listener The function to call when the animation begins.
             */
            CssAnimation.prototype.animationStart = function (listener) {
                return this.addEventListener(this._animationEvents.$animationStart, listener, false);
            };
            /**
             * @param {(ev?: AnimationEvent) => void} listener The function to call when the animation ends.
             */
            CssAnimation.prototype.animationEnd = function (listener) {
                return this.addEventListener(this._animationEvents.$animationEnd, listener, false);
            };
            /**
             * @param {(ev?: AnimationEvent) => void} listener The function to call when the animation iteration completes.
             */
            CssAnimation.prototype.animationIteration = function (listener) {
                return this.addEventListener(this._animationEvents.$animationIteration, listener, false);
            };
            /**
             * @param {(ev?: TransitionEvent) => void} listener The function to call when the transition begins.
             */
            CssAnimation.prototype.transitionStart = function (listener) {
                return this.addEventListener(this._animationEvents.$transitionStart, listener, false);
            };
            /**
             * @param {(ev?: TransitionEvent) => void} listener The function to call when the transition ends.
             */
            CssAnimation.prototype.transitionEnd = function (listener) {
                return this.addEventListener(this._animationEvents.$transitionEnd, listener, false);
            };
            return CssAnimation;
        })(BaseAnimation);
        animations.CssAnimation = CssAnimation;
        /**
         */
        var SimpleCssAnimation = (function (_super) {
            __extends(SimpleCssAnimation, _super);
            function SimpleCssAnimation() {
                _super.apply(this, arguments);
                /**
                 */
                this.className = __SimpleAnimation;
                /**
                 */
                this._cancelAnimation = noop;
            }
            /**
             */
            SimpleCssAnimation.prototype.initialize = function () {
                addClass(this.element, this.className + __INIT_SUFFIX);
            };
            /**
             */
            SimpleCssAnimation.prototype.start = function () {
                var _this = this;
                this._cancelAnimation = requestAnimationFrameGlobal(function () {
                    var element = _this.element, className = _this.className;
                    if (element.offsetParent === null) {
                        _this._dispose();
                        _this.end();
                        return;
                    }
                    addClass(element, className);
                    var animationId = _this._animationEvents.$animation, options = _this.options || {}, computedStyle = _this._window.getComputedStyle(element, options.pseudo), animationName = computedStyle[(animationId + 'Name')];
                    if (animationName === '' || animationName === 'none' ||
                        computedStyle[(animationId + 'PlayState')] === 'paused') {
                        _this._dispose();
                        _this.end();
                        return;
                    }
                    if (!options.preserveInit) {
                        removeClass(element, className + __INIT_SUFFIX);
                    }
                    _this._cancelAnimation = _this.animationEnd(function () {
                        _this._cancelAnimation = requestAnimationFrameGlobal(function () {
                            _this._dispose();
                            _this.end();
                        });
                    });
                });
            };
            /**
             */
            SimpleCssAnimation.prototype.pause = function () {
                var _this = this;
                if (this._cancelAnimation === noop) {
                    return this._Promise.resolve();
                }
                var animationEvents = this._compat.animationEvents;
                return new this._Promise(function (resolve) {
                    requestAnimationFrameGlobal(function () {
                        if (_this._cancelAnimation !== noop) {
                            _this.element.style[(animationEvents.$animation + 'PlayState')] = 'paused';
                        }
                        resolve();
                    });
                });
            };
            /**
             */
            SimpleCssAnimation.prototype.resume = function () {
                var _this = this;
                if (this._cancelAnimation === noop) {
                    return this._Promise.resolve();
                }
                var animationEvents = this._compat.animationEvents;
                return new this._Promise(function (resolve) {
                    requestAnimationFrameGlobal(function () {
                        if (_this._cancelAnimation !== noop) {
                            _this.element.style[(animationEvents.$animation + 'PlayState')] = 'running';
                        }
                        resolve();
                    });
                });
            };
            /**
             */
            SimpleCssAnimation.prototype.cancel = function () {
                this._cancelAnimation();
                this._dispose();
                this.end();
            };
            /**
             */
            SimpleCssAnimation.prototype._dispose = function () {
                var className = this.className;
                removeClass(this.element, className + ' ' + className + __INIT_SUFFIX);
                this._cancelAnimation = noop;
            };
            return SimpleCssAnimation;
        })(CssAnimation);
        animations.SimpleCssAnimation = SimpleCssAnimation;
        register.animation(__SimpleAnimation, SimpleCssAnimation);
        /**
         */
        var FadeIn = (function (_super) {
            __extends(FadeIn, _super);
            function FadeIn() {
                _super.apply(this, arguments);
                /**
                 */
                this.className = __FadeIn;
            }
            return FadeIn;
        })(SimpleCssAnimation);
        animations.FadeIn = FadeIn;
        register.animation(__FadeIn, FadeIn);
        /**
         */
        var FadeOut = (function (_super) {
            __extends(FadeOut, _super);
            function FadeOut() {
                _super.apply(this, arguments);
                /**
                 */
                this.className = __FadeOut;
            }
            return FadeOut;
        })(SimpleCssAnimation);
        animations.FadeOut = FadeOut;
        register.animation(__FadeOut, FadeOut);
        /**
         */
        var Enter = (function (_super) {
            __extends(Enter, _super);
            function Enter() {
                _super.apply(this, arguments);
                /**
                 */
                this.className = __Enter;
            }
            return Enter;
        })(SimpleCssAnimation);
        animations.Enter = Enter;
        register.animation(__Enter, Enter);
        /**
         */
        var Leave = (function (_super) {
            __extends(Leave, _super);
            function Leave() {
                _super.apply(this, arguments);
                /**
                 */
                this.className = __Leave;
            }
            return Leave;
        })(SimpleCssAnimation);
        animations.Leave = Leave;
        register.animation(__Leave, Leave);
        /**
         */
        var Move = (function (_super) {
            __extends(Move, _super);
            function Move() {
                _super.apply(this, arguments);
                /**
                 */
                this.className = __Move;
            }
            return Move;
        })(SimpleCssAnimation);
        animations.Move = Move;
        register.animation(__Move, Move);
        /**
         */
        var SimpleCssTransition = (function (_super) {
            __extends(SimpleCssTransition, _super);
            function SimpleCssTransition() {
                _super.apply(this, arguments);
                /**
                 */
                this.className = __SimpleTransition;
                /**
                 */
                this._animationCanceled = noop;
                /**
                 */
                this._normalizeRegex = /-/g;
                /**
                 */
                this._nonNumRegex = /[^\-0-9\.]/g;
                /**
                 */
                this._normalizedKeys = {};
                /**
                 */
                this._transitionCount = 0;
                /**
                 */
                this._count = 0;
                /**
                 */
                this._started = false;
                /**
                 */
                this._usingCss = false;
            }
            /**
             */
            SimpleCssTransition.prototype.initialize = function () {
                addClass(this.element, this.className + __INIT_SUFFIX);
            };
            /**
             */
            SimpleCssTransition.prototype.start = function () {
                var _this = this;
                this._animationCanceled = requestAnimationFrameGlobal(function () {
                    var element = _this.element, className = _this.className;
                    if (element.offsetParent === null) {
                        _this._animate();
                        _this._dispose();
                        _this.end();
                    }
                    addClass(element, className);
                    _this._started = true;
                    var utils = _this.utils, transitionId = _this._animationEvents.$transition, options = _this.options || {}, computedStyle = _this._window.getComputedStyle(element, options.pseudo), properties = _this._properties = computedStyle[(transitionId + 'Property')].split(','), durations = computedStyle[(transitionId + 'Duration')].split(','), length = properties.length, propLength = length, noTransition = false, prop;
                    while (length-- > 0) {
                        prop = properties[length];
                        if (prop === '' || prop === 'none') {
                            properties.splice(length, 1);
                        }
                        else if (propLength > 1 && prop === 'all') {
                            // most likely developer error (extra comma at end of shorthand multi transition declaration) 
                            // so we will splice 
                            _this._log.debug("Improper transition declaration on class \"" + element.className + "\"");
                            properties.splice(length, 1);
                        }
                    }
                    if (properties.length === 0) {
                        noTransition = true;
                    }
                    else {
                        length = durations.length;
                        while (length-- > 0) {
                            prop = durations[length];
                            if (!(prop === '' || prop === '0s')) {
                                break;
                            }
                        }
                        if (length < 0) {
                            noTransition = true;
                        }
                    }
                    if (noTransition) {
                        _this._animate();
                        _this._dispose();
                        _this.end();
                        return;
                    }
                    if (utils.isNumber(options.count) && options.count > 0) {
                        _this._count = options.count;
                    }
                    if (options.preserveInit === false) {
                        removeClass(element, className + __INIT_SUFFIX);
                    }
                    _this._animationCanceled = _this.transitionEnd(_this._done);
                    if (_this._animate()) {
                        return;
                    }
                    else if (utils.isEmpty(options.properties)) {
                        _this.__cssTransition(computedStyle, durations);
                        return;
                    }
                    _this._dispose();
                    _this.end();
                });
            };
            /**
             */
            SimpleCssTransition.prototype.cancel = function () {
                this._animationCanceled();
                if (!this._started) {
                    this._animate();
                }
                this._dispose();
                this.end();
            };
            /**
             */
            SimpleCssTransition.prototype._dispose = function () {
                var className = this.className;
                removeClass(this.element, className + ' ' + className + __INIT_SUFFIX);
                this._animationCanceled = noop;
            };
            /**
             * @param {TransitionEvent} ev? The transition event object.
             * @param {boolean} immediate? Whether clean up should be immediate or conditional.
             */
            SimpleCssTransition.prototype._done = function (ev) {
                var propertyName = ev.propertyName;
                if (isString(propertyName)) {
                    var count = ++this._transitionCount;
                    propertyName = propertyName.replace(this._normalizeRegex, '').toLowerCase();
                    if ((count < this._count) ||
                        (!this._usingCss && this._normalizedKeys[propertyName] === true &&
                            count < this._properties.length)) {
                        return;
                    }
                }
                this._dispose();
                this.end();
            };
            /**
             */
            SimpleCssTransition.prototype._animate = function () {
                var style = this.element.style || {}, properties = (this.options || {}).properties || {}, keys = Object.keys(properties), length = keys.length, key, normalizedKeys = this._normalizedKeys, normalizeRegex = this._normalizeRegex, currentProperty, newProperty, unchanged = 0;
                while (keys.length > 0) {
                    key = keys.shift();
                    currentProperty = style[key];
                    newProperty = properties[key];
                    if (!isString(newProperty)) {
                        unchanged++;
                        continue;
                    }
                    style[key] = newProperty;
                    if (currentProperty === style[key]) {
                        unchanged++;
                    }
                    else {
                        normalizedKeys[key.replace(normalizeRegex, '').toLowerCase()] = true;
                    }
                }
                return unchanged < length;
            };
            /**
             * @param {CSSStyleDeclaration} computedStyle The computed style of the
             * element.
             * @param {Array<string>} durations The array of declared transition duration values.
             */
            SimpleCssTransition.prototype.__cssTransition = function (computedStyle, durations) {
                var _this = this;
                var transitionId = this._animationEvents.$transition, delays = computedStyle[(transitionId + 'Delay')].split(','), properties = this._properties, property, duration, delay, length = properties.length, computedProperty, normalizedKeys = this._normalizedKeys, normalizeRegex = this._normalizeRegex, i = 0, count = 0, changed = false, defer = this.utils.defer.bind(this, function (prop, computedProp) {
                    if (_this._animationCanceled === noop) {
                        // disposal has already occurred 
                        return;
                    }
                    else if (prop === 'all' || computedStyle[prop] !== computedProp) {
                        // we can't know if the transition started due to 'all' being set and have to rely on this.options.count 
                        // or 
                        // we know the transition started due to the properties being different 
                        changed = true;
                    }
                    if (++count < length || changed) {
                        return;
                    }
                    _this._dispose();
                    _this.end();
                });
                this._usingCss = true;
                this._count = this._count || length;
                for (; i < length; ++i) {
                    property = properties[i] = properties[i].trim();
                    duration = durations.length > i ? durations[i].trim() : durations[durations.length - 1].trim();
                    delay = delays.length > i ? delays[i].trim() : delays[delays.length - 1].trim();
                    normalizedKeys[property.replace(normalizeRegex, '').toLowerCase()] = true;
                    computedProperty = computedStyle[property];
                    defer(this._toMs(duration) + this._toMs(delay), [property, computedProperty]);
                }
            };
            /**
             * @param {string} duration The transition duration specified by the computed style.
             */
            SimpleCssTransition.prototype._toMs = function (duration) {
                var regex = this._nonNumRegex, units = duration.match(regex)[0], time = Number(duration.replace(regex, ''));
                if (!this.utils.isNumber(time)) {
                    return 0;
                }
                else if (units === 's') {
                    return time * 1000;
                }
                else if (units === 'ms') {
                    return time;
                }
                return 0;
            };
            return SimpleCssTransition;
        })(CssAnimation);
        animations.SimpleCssTransition = SimpleCssTransition;
        register.animation(__SimpleTransition, SimpleCssTransition);
    })(animations = ui.animations || (ui.animations = {}));
    /**
     */
    var controls;
    (function (controls_1) {
        /**
         */
        var Viewport = (function (_super) {
            __extends(Viewport, _super);
            function Viewport() {
                _super.apply(this, arguments);
            }
            /**
             */
            Viewport.prototype.initialize = function () {
                var router = this._router = this._Router.currentRouter(), parentViewport = this._getParentViewport(), parentRouter;
                if (!(isNull(parentViewport) || isNull(parentViewport._router))) {
                    parentRouter = this._parentRouter = parentViewport._router;
                    parentRouter.addChild(router);
                }
                this._navigator.initialize(router);
            };
            /**
             */
            Viewport.prototype.loaded = function () {
                var _this = this;
                if (isObject(this.options)) {
                    var animate = this.options.value.animate === true;
                    if (animate) {
                        this.dom.addClass(this.element, __Viewport + '-animate');
                    }
                    this._animate = animate;
                }
                this._Promise.resolve(this._router.finishNavigating).then(function () {
                    _this._router.register(_this);
                });
            };
            /**
             * @param {routing.IRouteInfo} routeInfo Contains the information necessary to instantiate
             * the view and feed it the route parameters/query.
             */
            Viewport.prototype.canNavigateTo = function (routeInfo) {
                var _this = this;
                var getRouter = this._Router.currentRouter, currentRouter = getRouter(), response = true, injector = this._Injector.getDependency(routeInfo.delegate.view), view = injector.inject(), parameters = routeInfo.parameters, nextRouter = getRouter();
                if (!isObject(view)) {
                    return this._Promise.resolve(null);
                }
                if (currentRouter !== nextRouter) {
                    nextRouter.initialize(this._router);
                    var navigator_1 = acquire(__NavigatorInstance);
                    view.navigator = navigator_1;
                    navigator_1.initialize(nextRouter);
                }
                else {
                    view.navigator = this._navigator;
                }
                if (isFunction(view.canNavigateTo)) {
                    response = view.canNavigateTo(parameters, routeInfo.query);
                }
                return this._Promise.resolve(response).then(function (canNavigateTo) {
                    _this._nextInjector = injector;
                    _this._nextView = view;
                    return canNavigateTo;
                });
            };
            /**
             */
            Viewport.prototype.canNavigateFrom = function () {
                var view = this.controls[0], response = true;
                if (isObject(view) && isFunction(view.canNavigateFrom)) {
                    response = view.canNavigateFrom();
                }
                return this._Promise.resolve(response);
            };
            /**
             * @param {routing.IRouteInfo} routeInfo Contains the information necessary to instantiate
             * the view and feed it the route parameters/query.
             */
            Viewport.prototype.navigateTo = function (routeInfo) {
                var injector = this._nextInjector || this._Injector.getDependency(routeInfo.delegate.view), nodeMap = this._createNodeMap(injector), element = this.element, node = nodeMap.element, parameters = routeInfo.parameters, query = routeInfo.query, control = nodeMap.uiControlNode.control;
                this._nextInjector = this._nextView = undefined;
                if (this._animate) {
                    var animator = this._animator, dom = this.dom;
                    if (this._navigator.isBackNavigation()) {
                        dom.addClass(node, __NavigatingBack);
                        animator.enter(node, __Enter, element).then(function () {
                            dom.removeClass(node, __NavigatingBack);
                        });
                    }
                    else {
                        animator.enter(node, __Enter, element);
                    }
                }
                else {
                    element.insertBefore(node, null);
                }
                var viewportManager = this._managerCache.read(this.uid), manager = this._ElementManagerFactory.getInstance();
                viewportManager.children = [];
                manager.initialize(nodeMap, viewportManager);
                if (isFunction(control.navigatedTo)) {
                    control.navigatedTo(routeInfo.parameters, query);
                }
                manager.setUiControlTemplate();
                if (control.hasOwnContext) {
                    return manager.observeRootContext(control, manager.fulfillAndLoad);
                }
                return manager.fulfillAndLoad();
            };
            /**
             */
            Viewport.prototype.navigateFrom = function () {
                var _this = this;
                var view = this.controls[0], promise, viewExists = isObject(view);
                if (viewExists && isFunction(view.navigatingFrom)) {
                    promise = this._Promise.resolve(view.navigatingFrom());
                }
                else {
                    promise = this._Promise.resolve();
                }
                return promise.catch(function (error) {
                    if (isObject(error)) {
                        if (isString(error.message)) {
                            _this._log.debug(_this.type + ' error: ' + error.message);
                            return;
                        }
                        _this._log.debug(_this.type + ' error: ' + JSON.stringify(error));
                        return;
                    }
                    _this._log.debug(error);
                }).then(function () {
                    if (!(_this._animate && viewExists)) {
                        Control.dispose(view);
                        return;
                    }
                    var oldElement = view.element;
                    if (_this._navigator.isBackNavigation()) {
                        _this.dom.addClass(oldElement, __NavigatingBack);
                    }
                    _this._animator.leave(oldElement, __Leave).then(function () {
                        Control.dispose(view);
                    });
                });
            };
            /**
             */
            Viewport.prototype.dispose = function () {
                this._router.unregister(this);
                this._navigator.dispose();
            };
            /**
             * @param {dependency.Injector<ui.ViewControl>} The injector used to instantiate the ViewControl.
             */
            Viewport.prototype._createNodeMap = function (injector) {
                var control = this._nextView || injector.inject(), doc = this._document, type = injector.name, replaceWith = control.replaceWith, node = (isEmpty(replaceWith) || replaceWith === 'any') ?
                    doc.createElement('div') : doc.createElement(replaceWith);
                node.setAttribute(__Control, type);
                node.className = __ViewControl;
                return {
                    element: node,
                    attributes: {},
                    nodes: [],
                    uiControlNode: {
                        control: control,
                        nodeName: type,
                        expressions: [],
                        injector: injector
                    }
                };
            };
            /**
             */
            Viewport.prototype._getParentViewport = function () {
                var viewport = this.parent, type = this.type;
                while (!isNull(viewport) && viewport.type !== type) {
                    viewport = viewport.parent;
                }
                return viewport;
            };
            Viewport._inject = {
                _Router: __RouterStatic,
                _Promise: __Promise,
                _Injector: __InjectorStatic,
                _ElementManagerFactory: __ElementManagerFactory,
                _document: __Document,
                _managerCache: __ManagerCache,
                _animator: __Animator,
                _navigator: __NavigatorInstance
            };
            return Viewport;
        })(TemplateControl);
        controls_1.Viewport = Viewport;
        register.control(__Viewport, Viewport);
        /**
         */
        var Template = (function (_super) {
            __extends(Template, _super);
            /**
             */
            function Template() {
                _super.call(this);
                /**
                 */
                this.replaceWith = null;
                /**
                 */
                this.__isFirst = false;
                var _CacheFactory = acquire(__CacheFactory);
                this.__templateControlCache = _CacheFactory.create(__TemplateControlCache);
            }
            /**
             */
            Template.prototype.initialize = function () {
                var optionsObj = this.options || {}, options = optionsObj.value || {}, id = this._id = options.id;
                if (isNull(id)) {
                    this._log.warn(this.type + ' instantiated without an id option');
                    return;
                }
                this._url = options.templateUrl;
                var templatePromise = this.__templateControlCache.read(id);
                if (!isNull(templatePromise)) {
                    this.__templatePromise = templatePromise;
                    return;
                }
                this.__isFirst = true;
                this._initializeTemplate();
            };
            /**
             */
            Template.prototype.loaded = function () {
                if (!this.__isFirst) {
                    this._waitForTemplateControl(this.__templatePromise);
                }
            };
            /**
             */
            Template.prototype.dispose = function () {
                if (this.__isFirst) {
                    var cache = this.__templateControlCache;
                    cache.remove(this._id);
                    if (cache.info().size === 0) {
                        cache.dispose();
                    }
                }
            };
            /**
             */
            Template.prototype._initializeTemplate = function () {
                var _this = this;
                var id = this._id;
                if (isNull(id)) {
                    return;
                }
                var parentNode = this.endNode.parentNode, url = this._url, template;
                if (!isNull(url)) {
                    template = this._templateCache.read(url);
                    clearNodeBlock(this.elementNodes, parentNode);
                }
                else {
                    template = this._document.createDocumentFragment();
                    appendChildren(this.elementNodes, template);
                }
                var controlPromise;
                if (isPromise(template)) {
                    controlPromise = template.catch(function (error) {
                        if (isNull(error)) {
                            return TemplateControl.determineTemplate(_this, url);
                        }
                    }).then(function (template) {
                        _this.bindableTemplates.add(id, template.cloneNode(true));
                        return _this;
                    });
                }
                else {
                    this.bindableTemplates.add(id, template.cloneNode(true));
                    controlPromise = this._Promise.resolve(this);
                }
                this.__templateControlCache.put(id, controlPromise);
            };
            /**
             * @param {async.IThenable<ui.controls.Template>} templatePromise The promise
             * associated with the first instance of the control with this ID.
             */
            Template.prototype._waitForTemplateControl = function (templatePromise) {
                var _this = this;
                if (!isPromise(templatePromise)) {
                    return;
                }
                templatePromise.then(function (templateControl) {
                    if (!(isNull(_this._url) || (_this._url === templateControl._url))) {
                        _this._log.warn('The specified url: ' + _this._url +
                            ' does not match the original ' + _this.type + ' with id: ' +
                            '"' + _this._id + '". The original url will be loaded.');
                    }
                    _this.__mapBindableTemplates(templateControl);
                    return _this.bindableTemplates.bind(_this._id);
                }).then(function (clone) {
                    var endNode = _this.endNode;
                    insertBefore(endNode.parentNode, clone, endNode);
                }).catch(function (error) {
                    postpone(function () {
                        _this._log.warn('Problem resolving ' + _this.type + ' url: ' +
                            error.response);
                    });
                });
            };
            /**
             * @param {ui.controls.Template} control The first of the controls
             * with this corresponding ID that defined the HTML template to reuse.
             */
            Template.prototype.__mapBindableTemplates = function (control) {
                var bindableTemplates = this.bindableTemplates;
                bindableTemplates.cache = control.bindableTemplates.cache;
                bindableTemplates.templates = control.bindableTemplates.templates;
            };
            Template._inject = {
                _Promise: __Promise,
                _templateCache: __TemplateCache,
                _document: __Document
            };
            return Template;
        })(TemplateControl);
        controls_1.Template = Template;
        register.control(__Template, Template);
        /**
         */
        var Ignore = (function (_super) {
            __extends(Ignore, _super);
            function Ignore() {
                _super.apply(this, arguments);
            }
            /**
             */
            Ignore.prototype.setTemplate = function () {
                this.innerTemplate = appendChildren(this.element.childNodes);
            };
            /**
             */
            Ignore.prototype.loaded = function () {
                this.element.appendChild(this.innerTemplate.cloneNode(true));
            };
            return Ignore;
        })(TemplateControl);
        controls_1.Ignore = Ignore;
        register.control(__Ignore, Ignore);
        /**
         */
        var ForEach = (function (_super) {
            __extends(ForEach, _super);
            /**
             */
            function ForEach() {
                var _this = this;
                _super.call(this);
                /**
                 */
                this.priority = 120;
                /**
                 */
                this._aliases = {
                    index: __forEachAliasOptions.index,
                    even: __forEachAliasOptions.even,
                    odd: __forEachAliasOptions.odd,
                    first: __forEachAliasOptions.first,
                    last: __forEachAliasOptions.last
                };
                /**
                 */
                this._blockLength = 0;
                /**
                 */
                this._addQueue = [];
                /**
                 */
                this._itemLength = 0;
                /**
                 */
                this.__listenerSet = false;
                this.itemsLoaded = new this._Promise(function (resolve, reject) {
                    _this.__resolveFn = resolve;
                    _this.__rejectFn = reject;
                }).catch(noop);
            }
            /**
             */
            ForEach.prototype.setTemplate = function () {
                this.bindableTemplates.add('item', this.element.childNodes);
            };
            /**
             * @param {Array<any>} newValue The new Array
             * @param {Array<any>} oldValue The old Array
             */
            ForEach.prototype.contextChanged = function (newValue, oldValue) {
                if (isArray(newValue)) {
                    this._setListener();
                }
                else {
                    newValue = [];
                }
                this._executeEvent([{
                        object: newValue,
                        type: 'splice'
                    }]);
            };
            /**
             */
            ForEach.prototype.loaded = function () {
                var options = this.options, animating = this._animate = !isUndefined(options) && options.value.animate === true, context = this.context;
                this._container = this.element;
                if (animating) {
                    this._animationQueue = [];
                }
                this._setAliases();
                if (!isArray(context)) {
                    return;
                }
                var addQueue = this._addQueue, itemCount = context.length;
                var addPromise = this._addItems(0, itemCount, 0).then(function () {
                    var index = addQueue.indexOf(addPromise);
                    if (index !== -1) {
                        addQueue.splice(index, 1);
                    }
                });
                addQueue.push(addPromise);
                this._setListener();
            };
            /**
             */
            ForEach.prototype.dispose = function () {
                if (this.utils.isFunction(this.__rejectFn)) {
                    this.__rejectFn();
                    this.__resolveFn = this.__rejectFn = null;
                }
                this._animationQueue = this._addQueue = null;
            };
            /**
             */
            ForEach.prototype._setAliases = function () {
                var options = this.options;
                if (isUndefined(options)) {
                    return;
                }
                var aliases = options.value.aliases;
                if (!isObject(aliases)) {
                    return;
                }
                var _aliases = this._aliases, keys = Object.keys(_aliases), length = keys.length, value;
                for (var i = 0; i < length; ++i) {
                    value = aliases[keys[i]];
                    if (isString(value)) {
                        _aliases[keys[i]] = value;
                    }
                }
            };
            /**
             * @param {number} index The point in the array to start adding items.
             * @param {number} numberOfItems The number of items to add.
             * @param {number} animateItems The number of items to animate.
             */
            ForEach.prototype._addItems = function (index, numberOfItems, animateItems) {
                var _this = this;
                var max = +(index + numberOfItems), promises = [], initialIndex = index;
                this._itemLength += numberOfItems;
                while (index < max) {
                    promises.push(this._bindItem(index++));
                }
                if (promises.length > 0) {
                    this.itemsLoaded = this._Promise.all(promises).then(function (templates) {
                        _this._setBlockLength(templates);
                        if (animateItems > 0) {
                            var length_10 = templates.length, container = _this._container;
                            for (var i = 0; i < length_10; ++i) {
                                if (i < animateItems) {
                                    _this._appendAnimatedItem(templates[i]);
                                }
                                else {
                                    container.insertBefore(templates[i], null);
                                }
                            }
                        }
                        else {
                            _this._appendItems(templates);
                        }
                        _this._updateResource(initialIndex - 1);
                        if (isFunction(_this.__resolveFn)) {
                            _this.__resolveFn();
                            _this.__resolveFn = _this.__rejectFn = null;
                        }
                    }).catch(function (error) {
                        postpone(function () {
                            if (isString(error)) {
                                error = new Error(error);
                            }
                            _this._log.error(error);
                        });
                    });
                }
                return this.itemsLoaded;
            };
            /**
             * @param {Array<Node>} items The Array of items to add.
             */
            ForEach.prototype._appendItems = function (items) {
                appendChildren(items, this._container);
            };
            /**
             * @param {DocumentFragment} item The HTML fragment representing a single item.
             */
            ForEach.prototype._appendAnimatedItem = function (item) {
                if (!isNode(item)) {
                    return;
                }
                var animationQueue = this._animationQueue, animation = {
                    animation: this._animator.enter(item, __Enter, this._container).then(function () {
                        var index = animationQueue.indexOf(animation);
                        if (index === -1) {
                            return;
                        }
                        animationQueue.splice(index, 1);
                    }),
                    op: null
                };
                animationQueue.push(animation);
            };
            /**
             * @param {number} index The index to start disposing from.
             * @param {number} numberOfItems The number of items to remove.
             */
            ForEach.prototype._removeItems = function (index, numberOfItems) {
                var dispose = TemplateControl.dispose, controls = this.controls, last = index + numberOfItems;
                while (last-- > index) {
                    dispose(controls[last]);
                }
                this._updateResource(controls.length - 1);
            };
            /**
             */
            ForEach.prototype._bindItem = function (index) {
                return this.bindableTemplates.bind('item', index, this._getAliases(index));
            };
            /**
             */
            ForEach.prototype._setBlockLength = function (templates) {
                if (this._blockLength > 0 || templates.length === 0) {
                    return;
                }
                this._blockLength = templates[0].childNodes.length;
            };
            /**
             * @param {number} index The control whose resources we will update.
             */
            ForEach.prototype._updateResource = function (index) {
                var controls = this.controls;
                if (index < 0 || index >= controls.length) {
                    return;
                }
                controls[index].resources.add(this._getAliases(index));
            };
            /**
             */
            ForEach.prototype._setListener = function () {
                if (!this.__listenerSet) {
                    this.observeArray(this._executeEvent);
                    this.__listenerSet = true;
                }
            };
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            ForEach.prototype._executeEvent = function (changes) {
                var method = '_' + changes[0].type;
                if (isFunction(this[method])) {
                    this[method](changes);
                }
            };
            /**
             * @param {number} index The index used to create the resource aliases.
             */
            ForEach.prototype._getAliases = function (index) {
                var isEven = (index & 1) === 0, aliases = {}, _aliases = this._aliases, type = __LITERAL_RESOURCE;
                aliases[_aliases.index] = {
                    value: index,
                    type: type
                };
                aliases[_aliases.even] = {
                    value: isEven,
                    type: type
                };
                aliases[_aliases.odd] = {
                    value: !isEven,
                    type: type
                };
                aliases[_aliases.first] = {
                    value: index === 0,
                    type: type
                };
                aliases[_aliases.last] = {
                    value: index === (this.context.length - 1),
                    type: type
                };
                return aliases;
            };
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            ForEach.prototype._push = function (changes) {
                var change = changes[0], addQueue = this._addQueue, itemCount = change.addedCount;
                var addPromise = this._addItems(change.index, itemCount, this._animate ? itemCount : 0).then(function () {
                    var index = addQueue.indexOf(addPromise);
                    if (index !== -1) {
                        addQueue.splice(index, 1);
                    }
                });
                addQueue.push(addPromise);
            };
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            ForEach.prototype._pop = function (changes) {
                var _this = this;
                var change = changes[0], start = change.object.length;
                if (change.removed.length === 0) {
                    return;
                }
                var removeIndex = change.object.length;
                if (this._itemLength > 0) {
                    this._itemLength--;
                }
                this._Promise.all(this._addQueue).then(function () {
                    if (_this._animate) {
                        _this._animateItems(start, 1, __Leave, 'leave', false).then(function () {
                            _this._removeItems(removeIndex, 1);
                        });
                        return;
                    }
                    _this._removeItems(removeIndex, 1);
                });
            };
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            ForEach.prototype._unshift = function (changes) {
                var change = changes[0], addedCount = change.addedCount, addQueue = this._addQueue;
                if (this._animate) {
                    var animationQueue = this._animationQueue, animationLength = animationQueue.length;
                    this._animateItems(0, addedCount, __Enter, null, animationLength > 0 && animationQueue[animationLength - 1].op === 'clone');
                }
                var addPromise = this._addItems(change.object.length - addedCount, addedCount, 0).then(function () {
                    var index = addQueue.indexOf(addPromise);
                    if (index !== -1) {
                        addQueue.splice(index, 1);
                    }
                });
                addQueue.push(addPromise);
            };
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            ForEach.prototype._shift = function (changes) {
                var _this = this;
                var addQueue = this._addQueue, change = changes[0];
                if (change.removed.length === 0) {
                    return;
                }
                else if (this._animate) {
                    if (addQueue.length === 0) {
                        addQueue = addQueue.concat([this._animateItems(0, 1, __Leave, 'clone', true)]);
                    }
                }
                var removeIndex = change.object.length;
                if (this._itemLength > 0) {
                    this._itemLength--;
                }
                this._Promise.all(addQueue).then(function () {
                    _this._removeItems(removeIndex, 1);
                });
            };
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            ForEach.prototype._splice = function (changes) {
                var _this = this;
                var change = changes[0], addCount = change.addedCount, addQueue = this._addQueue, currentLength = this._itemLength, addPromise, animating = this._animate;
                if (isNull(addCount)) {
                    if (animating) {
                        this._cancelCurrentAnimations();
                    }
                    var newLength = change.object.length, itemCount = currentLength - newLength;
                    if (newLength > currentLength) {
                        // itemCount will be negative 
                        addPromise = this._addItems(currentLength, -itemCount, 0).then(function () {
                            var index = addQueue.indexOf(addPromise);
                            if (index !== -1) {
                                addQueue.splice(index, 1);
                            }
                        });
                        addQueue.push(addPromise);
                    }
                    else if (currentLength > newLength) {
                        if (currentLength >= itemCount) {
                            this._itemLength -= itemCount;
                        }
                        else {
                            this._itemLength = 0;
                        }
                        this._Promise.all(addQueue).then(function () {
                            _this._removeItems(currentLength - itemCount, itemCount);
                        });
                    }
                    return;
                }
                var removeCount = change.removed.length, animationQueue = this._animationQueue;
                if (addCount > removeCount) {
                    var itemAddCount = addCount - removeCount, animationCount;
                    if (animating) {
                        animationCount = addCount;
                        var animationLength = animationQueue.length, startIndex = change.index;
                        if (currentLength < addCount - startIndex) {
                            animationCount = currentLength - startIndex;
                        }
                        this._animateItems(startIndex, animationCount, __Enter, null, animationLength > 0 && animationQueue[animationLength - 1].op === 'clone');
                        animationCount = addCount - animationCount;
                    }
                    else {
                        animationCount = 0;
                    }
                    addPromise = this._addItems(change.object.length - itemAddCount, itemAddCount, animationCount).then(function () {
                        var index = addQueue.indexOf(addPromise);
                        if (index !== -1) {
                            addQueue.splice(index, 1);
                        }
                    });
                    addQueue.push(addPromise);
                }
                else if (removeCount > addCount) {
                    var adding = addCount > 0;
                    if (animating && !adding && addQueue.length === 0) {
                        addQueue = addQueue.concat([this._animateItems(change.index, removeCount, __Leave, 'clone', true)]);
                    }
                    var deleteCount = removeCount - addCount;
                    if (currentLength >= deleteCount) {
                        this._itemLength -= deleteCount;
                    }
                    else {
                        this._itemLength = 0;
                    }
                    this._Promise.all(addQueue).then(function () {
                        if (animating && adding) {
                            var animLength = animationQueue.length;
                            _this._animateItems(change.index, addCount, __Enter, null, animLength > 0 && animationQueue[animLength - 1].op === 'clone');
                        }
                        _this._removeItems(currentLength - deleteCount, deleteCount);
                    });
                }
            };
            /**
             * @param {number} startIndex The starting index of items.
             * @param {number} numberOfItems The number of consecutive items.
             */
            ForEach.prototype._calculateBlockLength = function (startIndex, numberOfItems) {
                return this._blockLength;
            };
            /**
             * @param {number} startIndex The starting index of items to animate.
             * @param {number} numberOfItems The number of consecutive items to animate.
             * @param {string} key The animation key/type.
             * @param {string} animationOp Denotes animation operation.
             * @param {boolean} cancel Whether or not to cancel the current animation before beginning this one.
             */
            ForEach.prototype._animateItems = function (startIndex, numberOfItems, key, animationOp, cancel) {
                var blockLength = this._calculateBlockLength();
                if (blockLength === 0) {
                    return this._Promise.resolve();
                }
                var start = startIndex * blockLength;
                switch (animationOp) {
                    case 'clone':
                        return this._handleClonedContainerAnimation(start, numberOfItems * blockLength + start, key, cancel === true);
                    case 'leave':
                        return this._handleLeave(start, numberOfItems * blockLength + start, key);
                    default:
                        return this._handleSimpleAnimation(start, numberOfItems * blockLength + start, key, cancel === true);
                }
            };
            /**
             * @param {number} startNode The starting childNode of the ForEach to animate.
             * @param {number} endNode The ending childNode of the ForEach to animate.
             * @param {string} key The animation key/type.
             * @param {boolean} cancel Whether or not to cancel the current animation before beginning this one.
             */
            ForEach.prototype._handleSimpleAnimation = function (startNode, endNode, key, cancel) {
                var container = this._container, nodes = Array.prototype.slice.call(container.childNodes, startNode, endNode);
                if (nodes.length === 0) {
                    return this._Promise.resolve();
                }
                var animationQueue = this._animationQueue, animationCreation = this._animator.create(nodes, key), animationPromise = animationCreation.current.then(function () {
                    var index = animationQueue.indexOf(animation);
                    if (index === -1) {
                        return;
                    }
                    animationQueue.splice(index, 1);
                }), callback = function () {
                    animationCreation.previous.then(function () {
                        animationPromise.start();
                    });
                    return animationPromise;
                };
                var animation = {
                    animation: animationPromise,
                    op: null
                };
                if (cancel && animationQueue.length > 0) {
                    var cancelPromise = this._cancelCurrentAnimations().then(callback);
                    animationQueue.push(animation);
                    return cancelPromise;
                }
                animationQueue.push(animation);
                return callback();
            };
            /**
             * @param {number} startNode The starting childNode of the ForEach to animate.
             * @param {number} endNode The ending childNode of the ForEach to animate.
             * @param {string} key The animation key/type.
             */
            ForEach.prototype._handleLeave = function (startNode, endNode, key) {
                var container = this._container, nodes = Array.prototype.slice.call(container.childNodes, startNode, endNode);
                if (nodes.length === 0) {
                    return this._Promise.resolve();
                }
                var animationQueue = this._animationQueue, animationPromise = this._animator.leave(nodes, key).then(function () {
                    var index = animationQueue.indexOf(animation);
                    if (index === -1) {
                        return;
                    }
                    animationQueue.splice(index, 1);
                });
                var animation = {
                    animation: animationPromise,
                    op: 'leave'
                };
                animationQueue.push(animation);
                return animationPromise;
            };
            /**
             * @param {number} startNode The starting childNode of the ForEach to animate.
             * @param {number} endNode The ending childNode of the ForEach to animate.
             * @param {string} key The animation key/type.
             * @param {boolean} cancel Whether or not to cancel the current animation before beginning this one.
             */
            ForEach.prototype._handleClonedContainerAnimation = function (startNode, endNode, key, cancel) {
                var container = this._container, clonedContainer = container.cloneNode(true), nodes = Array.prototype.slice.call(clonedContainer.childNodes, startNode, endNode);
                if (nodes.length === 0) {
                    return this._Promise.resolve();
                }
                var parentNode, animationQueue = this._animationQueue, animationCreation = this._animator.create(nodes, key), animationPromise = animationCreation.current.then(function () {
                    var index = animationQueue.indexOf(animation);
                    if (index > -1) {
                        animationQueue.splice(index, 1);
                    }
                    if (isNull(parentNode)) {
                        return;
                    }
                    parentNode.replaceChild(container, clonedContainer);
                }), callback = function () {
                    parentNode = container.parentNode;
                    if (isNull(parentNode) || animationPromise.isCanceled()) {
                        return animationPromise;
                    }
                    parentNode.replaceChild(clonedContainer, container);
                    animationCreation.previous.then(function () {
                        animationPromise.start();
                    });
                    return animationPromise;
                };
                var animation = {
                    animation: animationPromise,
                    op: 'clone'
                };
                if (cancel && animationQueue.length > 0) {
                    var cancelPromise = this._cancelCurrentAnimations().then(callback);
                    animationQueue.push(animation);
                    return cancelPromise;
                }
                animationQueue.push(animation);
                return callback();
            };
            /**
             */
            ForEach.prototype._cancelCurrentAnimations = function () {
                var animationQueue = this._animationQueue, animations = [], length = animationQueue.length;
                for (var i = 0; i < length; ++i) {
                    animations.push(animationQueue[i].animation.cancel());
                }
                return this._Promise.all(animations);
            };
            ForEach._inject = {
                _animator: __Animator,
                _Promise: __Promise
            };
            return ForEach;
        })(TemplateControl);
        controls_1.ForEach = ForEach;
        register.control(__ForEach, ForEach);
        /**
         */
        var Head = (function (_super) {
            __extends(Head, _super);
            function Head() {
                _super.apply(this, arguments);
                /**
                 */
                this.replaceWith = __Head;
                /**
                 */
                this._structuredDataElements = [];
            }
            /**
             */
            Head.prototype.initialize = function () {
                var _this = this;
                this.on(__navigating, function () {
                    _this._removeAllElements();
                });
            };
            /**
             */
            Head.prototype.setTemplate = function () {
                var meta = __Meta, title = __Title, link = __MetaLink, author = __Author, type = __MetaType, creator = __Creator, image = __MetaImage, video = __MetaVideo, description = __Description, url = __Url, og = __OpenGraph, article = __Article, twitter = __Twitter;
                this._titleElement = this._createElement(title);
                this._ogTitleElement = this._createElement(meta, og + title);
                this._twitterTitleElement = this._createElement(meta, twitter + title);
                this._descriptionElement = this._createElement(meta, description);
                this._ogDescriptionElement = this._createElement(meta, og + description);
                this._twitterDescriptionElement = this._createElement(meta, twitter + description);
                this._ogUrlElement = this._createElement(meta, og + url);
                this._twitterUrlElement = this._createElement(meta, twitter + url);
                this._authorElement = this._createElement(meta, author);
                this._googleAuthorElement = this._createElement(link, author);
                this._fbAuthorElement = this._createElement(meta, article + author);
                this._twitterCreatorElement = this._createElement(meta, twitter + creator);
                this._ogTypeElement = this._createElement(meta, og + type);
            };
            /**
             * @param {string} title? If supplied, the title elements will be set to this value.
             */
            Head.prototype.title = function (title) {
                if (!isString(title)) {
                    return this._getContent(this._titleElement);
                }
                this._titleElement.innerText = title;
                this._setContent([
                    this._ogTitleElement,
                    this._twitterTitleElement
                ], title);
                return title;
            };
            /**
             * @param {string} description? If supplied, the description elements will be set to this value.
             */
            Head.prototype.description = function (description) {
                if (!isString(description)) {
                    return this._getContent(this._descriptionElement);
                }
                this._setContent([
                    this._descriptionElement,
                    this._ogDescriptionElement,
                    this._twitterDescriptionElement
                ], description);
                return description;
            };
            /**
             * @param {string} url? If supplied, the url elements will be set to this value.
             */
            Head.prototype.url = function (url) {
                if (!isString(url)) {
                    return this._getContent(this._ogUrlElement);
                }
                this._setContent([
                    this._ogUrlElement,
                    this._twitterUrlElement
                ], url);
                return url;
            };
            /**
             * @param {string} author? If supplied, the author elements will be set to this value. The value should be the
             * display name of the content author.
             */
            Head.prototype.author = function (author) {
                if (!isString(author)) {
                    return this._getContent(this._authorElement);
                }
                this._setContent([
                    this._authorElement,
                ], author);
                return author;
            };
            /**
             * @param {string} author? If supplied, the author elements will be set to this value. The value should be the
             * Google+ profile url for the author.
             */
            Head.prototype.googleAuthor = function (author) {
                if (!isString(author)) {
                    return this._getContent(this._googleAuthorElement);
                }
                this._setContent([
                    this._googleAuthorElement,
                ], author);
                return author;
            };
            /**
             * @param {string} author? If supplied, the author elements will be set to this value. The value should be
             * the `https://www.facebook.com/username` account, and make sure the user supports followers.
             */
            Head.prototype.fbAuthor = function (author) {
                if (!isString(author)) {
                    return this._getContent(this._fbAuthorElement);
                }
                this._setContent([
                    this._fbAuthorElement
                ], author);
                return author;
            };
            /**
             * @param {string} creator? If supplied, the creator elements will be set to this value. The
             * value should be the twitter `@username` of the creator
             */
            Head.prototype.twitterCreator = function (creator) {
                if (!isString(creator)) {
                    return this._getContent(this._twitterCreatorElement);
                }
                this._setContent([
                    this._twitterCreatorElement
                ], creator);
                return creator;
            };
            /**
             * @param {string} type? If supplied, the image elements will be set to this value.
             */
            Head.prototype.fbType = function (type) {
                if (!isString(type)) {
                    return this._getContent(this._ogTypeElement);
                }
                this._setContent([
                    this._ogTypeElement
                ], type);
                return type;
            };
            /**
             * @param {Array<string>} images For each image, a tag will be created
             */
            Head.prototype.images = function (images) {
                var _this = this;
                if (!isArray(images)) {
                    return;
                }
                var meta = __Meta, og = __OpenGraph, twitter = __Twitter, ogElement, twitterElement;
                forEach(function (image) {
                    ogElement = _this._createElement(meta, og + __MetaImage, true);
                    twitterElement = _this._createElement(meta, twitter + __MetaImage, true);
                    image = _this._browser.urlUtils(image).href;
                    _this._setContent([
                        ogElement,
                        twitterElement
                    ], image);
                }, images);
            };
            /**
             * @param {Array<string>} videos For each video, a tag will be created
             */
            Head.prototype.videos = function (videos) {
                var _this = this;
                if (!isArray(videos)) {
                    return;
                }
                var meta = __Meta, og = __OpenGraph, metaVideo = __MetaVideo, _browser = this._browser, ogElement;
                forEach(function (video) {
                    ogElement = _this._createElement(meta, og + metaVideo, true);
                    video = _browser.urlUtils(video).href;
                    _this._setContent([
                        ogElement
                    ], video);
                }, videos);
            };
            /**
             * @param {any} The object, it will be stringified and put in the ld+json tag.
             */
            Head.prototype.structuredData = function (obj) {
                if (isEmpty(obj)) {
                    return;
                }
                var el = this._document.createElement('script'), sibling = this._titleElement.nextSibling;
                el.setAttribute('type', 'application/ld+json');
                el.textContent = JSON.stringify(obj);
                this._structuredDataElements.push(el);
                this.dom.insertBefore(this.element, el, sibling);
            };
            /**
             * @param {ui.controls.IBlogPosting} The posting object, it will be stringified and put in the ld+json tag.
             */
            Head.prototype.blogPostings = function () {
                var postings = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    postings[_i - 0] = arguments[_i];
                }
                for (var i = 0, length_11 = postings.length; i < length_11; ++i) {
                    this.structuredData(postings[i]);
                }
            };
            /**
             */
            Head.prototype.loaded = function () {
                this.url(this._browser.url());
            };
            /**
             */
            Head.prototype.navigated = function (url) {
                this.url(url);
            };
            /**
             * @param {HTMLElement} element The element from which to get the content.
             */
            Head.prototype._getContent = function (element) {
                var nodeName = element.nodeName.toLowerCase();
                if (nodeName === __Title) {
                    return element.innerText;
                }
                else if (nodeName === __Meta) {
                    return element.getAttribute(__Content);
                }
                else if (nodeName === __MetaLink) {
                    return element.getAttribute(__MetaHref);
                }
            };
            /**
             * @param {Array<HTMLElement>} elements The elements for which to set values.
             */
            Head.prototype._setContent = function (elements, value) {
                var el = this.element, nodes = Array.prototype.slice.call(el.children), length = elements.length, content = __Content, href = __MetaHref, sibling = this._titleElement.nextSibling, dom = this.dom, nodeName, element;
                for (var i = 0; i < length; ++i) {
                    element = elements[i];
                    nodeName = element.nodeName.toLowerCase();
                    if (nodeName === __Meta) {
                        element.setAttribute(content, value);
                    }
                    else {
                        element.setAttribute(href, value);
                    }
                    if (nodes.indexOf(element) === -1) {
                        dom.insertBefore(el, element, sibling);
                    }
                }
            };
            /**
             * @param {string} tag The tag name for the element.
             * @param {string} name? The name corresponding to the type of meta/link tag.
             * @param {boolean} multiple? Whether or not there can be multiple of this tag/name in the dom
             */
            Head.prototype._createElement = function (tag, name, multiple) {
                var el, hasName = isString(name), attr = (hasName && (name.indexOf(__OpenGraph) === 0 || name.indexOf(__Article) === 0)) ? __MetaProperty : __MetaName, element = this.element;
                if (tag === __MetaLink) {
                    attr = __Rel;
                }
                if (!multiple && hasName) {
                    el = element.querySelector(tag + '[' + attr + '="' + name + '"]');
                }
                else if (!multiple) {
                    el = element.querySelector(tag);
                }
                if (!isNode(el)) {
                    el = this._document.createElement(tag);
                }
                if (hasName) {
                    el.setAttribute(attr, name);
                }
                return el;
            };
            /**
             */
            Head.prototype._removeAllElements = function () {
                var slice = Array.prototype.slice, og = this._document.head.querySelectorAll('meta[' + __MetaProperty + '^="' + __OpenGraph + '"]'), twitter = this._document.head.querySelectorAll('meta[' + __MetaName + '^="' + __Twitter + '"]');
                this._removeElements.apply(this, [
                    this._descriptionElement,
                    this._authorElement,
                    this._googleAuthorElement
                ].concat(slice.call(og), slice.call(twitter), slice.call(this._structuredDataElements)));
                this._structuredDataElements = [];
            };
            /**
             */
            Head.prototype._removeElements = function () {
                var elements = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    elements[_i - 0] = arguments[_i];
                }
                var el = this.element, nodes = Array.prototype.slice.call(el.children), length = elements.length, element;
                for (var i = 0; i < length; ++i) {
                    element = elements[i];
                    if (nodes.indexOf(element) !== -1) {
                        el.removeChild(element);
                    }
                }
            };
            Head._inject = {
                _document: __Document,
                _browser: __Browser
            };
            return Head;
        })(ui.TemplateControl);
        controls_1.Head = Head;
        /**
         */
        var InnerHtml = (function (_super) {
            __extends(InnerHtml, _super);
            function InnerHtml() {
                _super.apply(this, arguments);
            }
            /**
             */
            InnerHtml.prototype.setTemplate = function () {
                this.dom.clearNode(this.element);
            };
            /**
             */
            InnerHtml.prototype.loaded = function () {
                var options = this.options;
                if (!isObject(options)) {
                    return;
                }
                this._onOptionsChanged(options.value);
                options.observe(this._onOptionsChanged);
            };
            /**
             * @param {IInnerHtmlOptions} newValue The new value of the options property.
             * @param {IInnerHtmlOptions} oldValue? The old value of the options property.
             */
            InnerHtml.prototype._onOptionsChanged = function (newValue, oldValue) {
                var _this = this;
                if (newValue === oldValue) {
                    return;
                }
                else if (!isObject(newValue)) {
                    this._log.debug('plat-options for ' + this.type + ' must be an object.');
                    return;
                }
                var html = newValue.html;
                if (html === this._html) {
                    return;
                }
                this._html = html;
                var htmlIsString = isString(html);
                if (isNull(html) || (htmlIsString && html.trim() === '')) {
                    if (this.controls.length > 0) {
                        this._TemplateControlFactory.dispose(this.controls[0]);
                    }
                    else {
                        this.dom.clearNode(this.element);
                    }
                    return;
                }
                else if (!htmlIsString) {
                    this._log.debug('Trying to bind a non-string value to ' + this.type + '.');
                    return;
                }
                else if (newValue.compile === true) {
                    var hasControl = this.controls.length > 0;
                    this.bindableTemplates.once(html).then(function (template) {
                        if (hasControl) {
                            _this._TemplateControlFactory.dispose(_this.controls[0]);
                        }
                        else {
                            _this.dom.clearNode(_this.element);
                        }
                        _this.element.insertBefore(template, null);
                    });
                    return;
                }
                setInnerHtml(this.element, html);
            };
            InnerHtml._inject = {
                _TemplateControlFactory: __TemplateControlFactory
            };
            return InnerHtml;
        })(TemplateControl);
        controls_1.InnerHtml = InnerHtml;
        register.control(__Html, InnerHtml);
        /**
         */
        var Select = (function (_super) {
            __extends(Select, _super);
            /**
             */
            function Select() {
                var _this = this;
                _super.call(this);
                /**
                 */
                this.replaceWith = 'select';
                /**
                 */
                this.priority = 120;
                /**
                 */
                this.groups = {};
                this.itemsLoaded = new this._Promise(function (resolve, reject) {
                    _this.__resolveFn = resolve;
                    _this.__rejectFn = reject;
                }).catch(noop);
            }
            /**
             */
            Select.prototype.setTemplate = function () {
                this.bindableTemplates.add('option', this.element.childNodes);
                var options = this.options || {}, platOptions = options.value || {}, defaultOptionValues = platOptions.default;
                if (isObject(defaultOptionValues)) {
                    var defaultOption = this._document.createElement('option'), defaultValue = defaultOptionValues.value, defaultTextContent = defaultOptionValues.textContent;
                    defaultOption.value = isUndefined(defaultValue) ? defaultTextContent : defaultValue;
                    defaultOption.textContent = isUndefined(defaultTextContent) ? defaultValue : defaultTextContent;
                    this.element.insertBefore(defaultOption, null);
                }
                if (!isNull(platOptions.group)) {
                    var group = this._group = platOptions.group, optionGroup = this._document.createElement('optgroup');
                    optionGroup.label = __startSymbol + group + __endSymbol;
                    this.bindableTemplates.add('group', optionGroup);
                    this._isGrouped = true;
                }
                else {
                    this._isGrouped = false;
                }
            };
            /**
             * @param {Array<any>} newValue The new array context.
             * @param {Array<any>} oldValue The old array context.
             */
            Select.prototype.contextChanged = function (newValue, oldValue) {
                var _this = this;
                if (isEmpty(newValue)) {
                    if (!isEmpty(oldValue)) {
                        this.itemsLoaded.then(function () {
                            _this._removeItems(_this.controls.length);
                        });
                    }
                    return;
                }
                else if (!isArray(newValue)) {
                    return;
                }
                var newLength = isArray(newValue) ? newValue.length : 0, oldLength = isArray(oldValue) ? oldValue.length : 0;
                this._setListener();
                if (newLength > oldLength) {
                    this._addItems(newLength - oldLength, oldLength);
                }
                else if (newLength < oldLength) {
                    this._removeItems(oldLength - newLength);
                }
            };
            /**
             */
            Select.prototype.loaded = function () {
                if (isUndefined(this._isGrouped)) {
                    var options = this.options || {}, platOptions = options.value || {};
                    this._isGrouped = !isNull((this._group = platOptions.group));
                }
                this._defaultOption = this.element.firstElementChild;
                var context = this.context;
                if (!isArray(context)) {
                    return;
                }
                this._addItems(context.length, 0);
                this._setListener();
            };
            /**
             */
            Select.prototype.dispose = function () {
                _super.prototype.dispose.call(this);
                if (this.utils.isFunction(this.__rejectFn)) {
                    this.__rejectFn();
                    this.__resolveFn = this.__rejectFn = null;
                }
                this._defaultOption = null;
            };
            /**
             * @param {observable.IImplementTwoWayBinding} binder The control that facilitates the
             * databinding.
             */
            Select.prototype.observeProperties = function (binder) {
                var _this = this;
                var element = this.element;
                this._binder = binder;
                if (element.multiple) {
                    if (isNull(binder.evaluate())) {
                        this.inputChanged([]);
                    }
                    binder.observeProperty(this._setSelectedIndices);
                    binder.observeArrayChange(function () {
                        _this._setSelectedIndices(binder.evaluate(), null, null);
                    });
                }
                else {
                    binder.observeProperty(this._setSelectedIndex);
                }
                this.addEventListener(element, 'change', this._observeChange, false);
            };
            /**
             * @param {string} newValue The new value of the bound property.
             * @param {string} oldValue The old value of the bound property.
             * @param {string} identifier The child identifier of the bound property.
             * @param {boolean} firstTime? Whether or not this is the first time being called as a setter.
             */
            Select.prototype._setSelectedIndex = function (newValue, oldValue, identifier, firstTime) {
                var _this = this;
                var element = this.element, value = element.value;
                if (isNull(newValue)) {
                    if (firstTime === true || !this._document.body.contains(element)) {
                        this.itemsLoaded.then(function () {
                            if (isNull(_this._binder.evaluate())) {
                                _this.inputChanged(element.value);
                            }
                        });
                        return;
                    }
                    element.selectedIndex = -1;
                    return;
                }
                else if (!isString(newValue)) {
                    if (isNumber(newValue)) {
                        this._propertyType = 'number';
                        newValue = newValue.toString();
                    }
                    else if (isBoolean(newValue)) {
                        this._propertyType = 'boolean';
                        newValue = newValue.toString();
                    }
                    else {
                        if (isFunction(newValue.toString)) {
                            newValue = newValue.toString();
                        }
                        else {
                            newValue = Object.prototype.toString.call(newValue);
                        }
                        this._log.info('Trying to bind the invalid value "' + newValue + '" to a ' + this.type + '.');
                    }
                }
                if (value === newValue) {
                    return;
                }
                this.itemsLoaded.then(function () {
                    if (!_this._document.body.contains(element)) {
                        element.value = newValue;
                        if (element.value !== newValue) {
                            element.value = value;
                            _this.inputChanged(_this._castValue(element.value));
                        }
                        return;
                    }
                    element.value = newValue;
                    // check to make sure the user changed to a valid value 
                    // second boolean argument is an ie fix for inconsistency 
                    if (element.value !== newValue || element.selectedIndex === -1) {
                        element.selectedIndex = -1;
                    }
                });
            };
            /**
             * @param {Array<any>} newValue The new value Array of the bound property.
             * @param {Array<any>} oldValue The old value Array of the bound property.
             * @param {string} identifier The child identifier of the bound property.
             * @param {boolean} firstTime? Whether or not this is the first time being called as a setter.
             */
            Select.prototype._setSelectedIndices = function (newValue, oldValue, identifier, firstTime) {
                var _this = this;
                this.itemsLoaded.then(function () {
                    var element = _this.element, options = element.options, length = isNull(options) ? 0 : options.length, option, nullValue = isNull(newValue);
                    if (nullValue || !isArray(newValue)) {
                        if (firstTime === true && isNull(_this._binder.evaluate())) {
                            _this.inputChanged(_this._getSelectedValues());
                        }
                        // unselects the options unless a match is found 
                        while (length-- > 0) {
                            option = options[length];
                            if (!nullValue && option.value === '' + newValue) {
                                option.selected = true;
                                return;
                            }
                            option.selected = false;
                        }
                        return;
                    }
                    var value, numberValue, index, highestIndex = Infinity;
                    while (length-- > 0) {
                        option = options[length];
                        value = option.value;
                        if (newValue.indexOf(value) !== -1) {
                            option.selected = true;
                            continue;
                        }
                        numberValue = Number(value);
                        if (isNumber(numberValue) && (index = newValue.indexOf(numberValue)) !== -1) {
                            if (index < highestIndex) {
                                _this._propertyType = 'number';
                                highestIndex = index;
                            }
                            option.selected = true;
                            continue;
                        }
                        else if ((value === 'true' && (index = newValue.indexOf(true)) !== -1) ||
                            value === 'false' && (index = newValue.indexOf(false)) !== -1) {
                            if (index < highestIndex) {
                                _this._propertyType = 'boolean';
                                highestIndex = index;
                            }
                            option.selected = true;
                            continue;
                        }
                        option.selected = false;
                    }
                });
            };
            /**
             */
            Select.prototype._observeChange = function () {
                var element = this.element;
                this.inputChanged(element.multiple ? this._getSelectedValues() : this._castValue(element.value));
            };
            /**
             */
            Select.prototype._getSelectedValues = function () {
                var options = this.element.options, length = options.length, option, selectedValues = [];
                for (var i = 0; i < length; ++i) {
                    option = options[i];
                    if (option.selected) {
                        selectedValues.push(this._castValue(option.value));
                    }
                }
                return selectedValues;
            };
            /**
             */
            Select.prototype._castValue = function (value) {
                var type = this._propertyType;
                if (isNull(type)) {
                    return value;
                }
                var castValue;
                switch (type) {
                    case 'number':
                        castValue = isEmpty(value) ? undefined : Number(value);
                        break;
                    case 'boolean':
                        switch (value) {
                            case 'true':
                                castValue = true;
                                break;
                            case 'false':
                            case '0':
                            case 'null':
                            case 'undefined':
                                castValue = false;
                                break;
                            default:
                                castValue = !!value;
                                break;
                        }
                        break;
                    default:
                        castValue = value;
                        break;
                }
                return castValue;
            };
            /**
             */
            Select.prototype._setListener = function () {
                if (!this.__listenerSet) {
                    this.observeArray(this._executeEvent);
                    this.__listenerSet = true;
                }
            };
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            Select.prototype._executeEvent = function (changes) {
                var method = '_' + changes[0].type;
                if (isFunction(this[method])) {
                    this[method](changes);
                }
            };
            /**
             * @param {number} numberOfItems The number of items to add.
             * @param {number} index The starting index of the next
             * set of items to add.
             */
            Select.prototype._addItems = function (numberOfItems, index) {
                var _this = this;
                var bindableTemplates = this.bindableTemplates, promises = [], insertOption = this._insertOption;
                while (numberOfItems-- > 0) {
                    promises.push(bindableTemplates.bind('option', index).then(insertOption.bind(this, index++)));
                }
                if (promises.length > 0) {
                    this.itemsLoaded = this._Promise.all(promises).then(function () {
                        if (isFunction(_this.__resolveFn)) {
                            _this.__resolveFn();
                            _this.__resolveFn = _this.__rejectFn = null;
                        }
                        return;
                    }).catch(function (error) {
                        postpone(function () {
                            if (isString(error)) {
                                error = new Error(error);
                            }
                            _this._log.error(error);
                        });
                    });
                }
                return this.itemsLoaded;
            };
            /**
             * @param {number} index The current index of the item being added.
             * @param {DocumentFragment} option The bound DocumentFragment to be
             * inserted into the DOM.
             */
            Select.prototype._insertOption = function (index, option) {
                var element = this.element;
                if (this._isGrouped) {
                    var groups = this.groups, newGroup = (this.context[index] || {})[this._group], optgroup = groups[newGroup];
                    if (isNull(optgroup)) {
                        return (groups[newGroup] = this.bindableTemplates.bind('group', index)
                            .then(function (groupFragment) {
                            optgroup = groups[newGroup] = groupFragment.childNodes[1];
                            optgroup.insertBefore(option, null);
                            element.insertBefore(groupFragment, null);
                            return optgroup;
                        }));
                    }
                    else if (isPromise(optgroup)) {
                        return optgroup.then(function (group) {
                            group.insertBefore(option, null);
                        });
                    }
                    optgroup.insertBefore(option, null);
                    return this._Promise.resolve();
                }
                element.insertBefore(option, null);
                return this._Promise.resolve();
            };
            /**
             * @param {number} numberOfItems The number of items
             * to remove.
             */
            Select.prototype._removeItems = function (numberOfItems) {
                var dispose = TemplateControl.dispose, controls = this.controls;
                while (numberOfItems-- > 0) {
                    dispose(controls.pop());
                }
            };
            /**
             */
            Select.prototype._removeItem = function () {
                if (this._isGrouped) {
                    this._resetSelect();
                    return;
                }
                this._removeItems(1);
            };
            /**
             */
            Select.prototype._resetSelect = function () {
                this._removeItems(this.controls.length);
                this.groups = {};
                if (!isNull(this._defaultOption)) {
                    this.element.insertBefore(this._defaultOption.cloneNode(true), null);
                }
                this._addItems(this.context.length, 0);
            };
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            Select.prototype._push = function (changes) {
                var change = changes[0];
                this._addItems(change.addedCount, change.index);
            };
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            Select.prototype._pop = function (changes) {
                var _this = this;
                if (changes[0].removed.length === 0) {
                    return;
                }
                this.itemsLoaded.then(function () {
                    _this._removeItem();
                });
            };
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            Select.prototype._unshift = function (changes) {
                if (this._isGrouped) {
                    this._resetSelect();
                    return;
                }
                var change = changes[0], addedCount = change.addedCount;
                this._addItems(addedCount, change.object.length - addedCount - 1);
            };
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            Select.prototype._shift = function (changes) {
                var _this = this;
                if (changes[0].removed.length === 0) {
                    return;
                }
                this.itemsLoaded.then(function () {
                    _this._removeItem();
                });
            };
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            Select.prototype._splice = function (changes) {
                var _this = this;
                if (this._isGrouped) {
                    this._resetSelect();
                    return;
                }
                var change = changes[0], addCount = change.addedCount, removeCount = change.removed.length;
                if (addCount > removeCount) {
                    this._addItems(addCount - removeCount, change.object.length - addCount - 1);
                }
                else if (removeCount > addCount) {
                    this.itemsLoaded.then(function () {
                        _this._removeItems(removeCount - addCount);
                    });
                }
            };
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            Select.prototype._sort = function (changes) {
                if (this._isGrouped) {
                    this._resetSelect();
                }
            };
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            Select.prototype._reverse = function (changes) {
                if (this._isGrouped) {
                    this._resetSelect();
                }
            };
            Select._inject = {
                _Promise: __Promise,
                _document: __Document
            };
            return Select;
        })(BindControl);
        controls_1.Select = Select;
        register.control(__Select, Select);
        /**
         */
        var If = (function (_super) {
            __extends(If, _super);
            /**
             */
            function If() {
                _super.call(this);
                /**
                 */
                this.__condition = true;
                /**
                 */
                this.__firstTime = true;
                var _document = this._document;
                this.commentNode = _document.createComment(__If + __BOUND_PREFIX + 'placeholder');
                this.fragmentStore = _document.createDocumentFragment();
            }
            /**
             */
            If.prototype.contextChanged = function () {
                var options = this.options.value;
                if (isEmpty(options)) {
                    return;
                }
                return this._setter(options);
            };
            /**
             */
            If.prototype.setTemplate = function () {
                this.bindableTemplates.add('template', Array.prototype.slice.call(this.element.childNodes));
            };
            /**
             */
            If.prototype.loaded = function () {
                if (isNull(this.options)) {
                    this._log.warn('No condition specified in ' + __Options + ' for ' + this.type + '.');
                    this.options = {
                        value: {
                            condition: true
                        },
                        observe: noop
                    };
                }
                var promise = this.contextChanged();
                this.__removeListener = this.options.observe(this._setter);
                return promise;
            };
            /**
             */
            If.prototype.dispose = function () {
                if (isFunction(this.__removeListener)) {
                    this.__removeListener();
                    this.__removeListener = null;
                }
                this.commentNode = null;
                this.fragmentStore = null;
            };
            /**
             */
            If.prototype._setter = function (options) {
                var _this = this;
                var value = !!options.condition, promise;
                if (value === this.__condition && !this.__firstTime) {
                    return this._Promise.resolve(null);
                }
                if (value) {
                    if (!isNull(this.__leaveAnimation)) {
                        promise = this.__leaveAnimation.cancel().then(function () {
                            _this.__leaveAnimation = null;
                            return _this._addItem();
                        });
                    }
                    else {
                        promise = this._addItem();
                    }
                }
                else {
                    if (!isNull(this.__enterAnimation)) {
                        promise = this.__enterAnimation.cancel().then(function () {
                            _this.__enterAnimation = null;
                            return _this._removeItem();
                        });
                    }
                    else {
                        this._removeItem();
                        promise = this._Promise.resolve(null);
                    }
                }
                this.__condition = value;
                return promise;
            };
            /**
             */
            If.prototype._addItem = function () {
                var _this = this;
                if (!isNode(this.commentNode.parentNode) && !this.__firstTime) {
                    return this._Promise.resolve(null);
                }
                if (this.__firstTime) {
                    this.__firstTime = false;
                    this.__initialBind = this.bindableTemplates.bind('template').then(function (template) {
                        var element = _this.element;
                        _this.__initialBind = null;
                        if (element.parentNode === _this.fragmentStore) {
                            element.insertBefore(template, null);
                            return _this._animateEntrance();
                        }
                        _this.__enterAnimation = _this._animator.animate(element, __Enter);
                        element.insertBefore(template, null);
                        return _this.__enterAnimation;
                    }).then(function () {
                        _this.__enterAnimation = null;
                    });
                    return this.__initialBind;
                }
                if (isPromise(this.__initialBind)) {
                    return this.__initialBind.then(function () {
                        return _this._animateEntrance();
                    });
                }
                return this._animateEntrance();
            };
            /**
             */
            If.prototype._animateEntrance = function () {
                var _this = this;
                var commentNode = this.commentNode, parentNode = commentNode.parentNode;
                if (!isNode(parentNode)) {
                    return this._animator.resolve().then(noop);
                }
                return this.__enterAnimation = this._animator.enter(this.element, __Enter, parentNode, commentNode).then(function () {
                    _this.__enterAnimation = null;
                });
            };
            /**
             */
            If.prototype._removeItem = function () {
                var _this = this;
                if (isPromise(this.__initialBind)) {
                    return this.__initialBind.then(function () {
                        return _this._animateLeave();
                    });
                }
                return this._animateLeave();
            };
            /**
             */
            If.prototype._animateLeave = function () {
                var _this = this;
                var element = this.element, parent = element.parentElement, nextSibling = element.nextSibling;
                if (!isNode(parent)) {
                    return this._animator.resolve().then(noop);
                }
                return this.__leaveAnimation = this._animator.leave(element, __Leave).then(function () {
                    _this.__leaveAnimation = null;
                    parent.insertBefore(_this.commentNode, nextSibling);
                    _this.fragmentStore.insertBefore(element, null);
                });
            };
            If._inject = {
                _animator: __Animator,
                _Promise: __Promise,
                _document: __Document
            };
            return If;
        })(TemplateControl);
        controls_1.If = If;
        register.control(__If, If);
        /**
         */
        var Link = (function (_super) {
            __extends(Link, _super);
            function Link() {
                _super.apply(this, arguments);
                /**
                 */
                this.replaceWith = 'a';
                /**
                 */
                this._router = this._Router.currentRouter();
            }
            /**
             */
            Link.prototype.initialize = function () {
                this._removeClickListener = this.dom.addEventListener(this.element, 'click', this._handleClick, false);
            };
            /**
             */
            Link.prototype.loaded = function () {
                var options = this.options, setHref = this.setHref.bind(this);
                if (!isObject(options)) {
                    this._log.warn('No options specified for ' + this.type +
                        '. Please send in options of type ui.controls.ILinkOptions.');
                    options = this.options = {};
                    options.value = { view: '' };
                    this.setHref();
                    return;
                }
                else if (!isObject(options.value)) {
                    options.value = { view: '' };
                }
                this.addEventListener(this.element, __tap, this._handleTap, false);
                setHref();
                options.observe(setHref);
            };
            /**
             */
            Link.prototype.setHref = function () {
                var href = this.getHref();
                if (!isEmpty(href)) {
                    var element = this.element;
                    element.href = href;
                }
            };
            /**
             */
            Link.prototype.getHref = function () {
                if (isNull(this._router)) {
                    return;
                }
                var value = this.options.value, href = value.view;
                if (value.isUrl !== true) {
                    var parameters = value.parameters, query = value.query;
                    if (isEmpty(href)) {
                        return href;
                    }
                    href = this._router.generate(href, parameters, query);
                }
                return this._browser.formatUrl(href);
            };
            /**
             */
            Link.prototype._handleClick = function (ev) {
                var buttons;
                if (isNumber(ev.buttons) && ev.buttons !== 0) {
                    buttons = ev.buttons;
                }
                else if (isNumber(ev.which) && ev.which > 0) {
                    buttons = ev.which;
                }
                else {
                    switch (ev.button) {
                        case -1:
                            buttons = 0;
                            break;
                        case 0:
                            buttons = 1;
                            break;
                        case 1:
                            buttons = 4;
                            break;
                        case 2:
                            buttons = 2;
                            break;
                        case 3:
                            buttons = 8;
                            break;
                        case 4:
                            buttons = 16;
                            break;
                        default:
                            buttons = 1;
                            break;
                    }
                }
                if (buttons === 1) {
                    ev.preventDefault();
                }
            };
            /**
             */
            Link.prototype._handleTap = function (ev) {
                var _this = this;
                if (ev.buttons !== 1) {
                    return;
                }
                var href = this.getHref();
                if (isUndefined(href)) {
                    return;
                }
                ev.preventDefault();
                requestAnimationFrameGlobal(function () {
                    _this._browser.url(href);
                });
            };
            /**
             */
            Link.prototype.dispose = function () {
                defer(this._removeClickListener, 3000);
            };
            Link._inject = {
                _Router: __RouterStatic,
                _Injector: __InjectorStatic,
                _browser: __Browser
            };
            return Link;
        })(TemplateControl);
        controls_1.Link = Link;
        register.control(__Link, Link);
    })(controls = ui.controls || (ui.controls = {}));
})(ui = exports.ui || (exports.ui = {}));
/**
 */
var processing;
(function (processing) {
    /**
     */
    var Compiler = (function () {
        function Compiler() {
        }
        Compiler.prototype.compile = function (node, control) {
            var childNodes = node.childNodes, length, newLength, childNode, hasControl = !isNull(control), manager = (hasControl ? this._managerCache.read(control.uid) : null), create = this._ElementManagerFactory.create;
            if (!isUndefined(childNodes)) {
                childNodes = Array.prototype.slice.call(childNodes);
            }
            else if (isFunction(node.push)) {
                childNodes = node;
            }
            else {
                childNodes = Array.prototype.slice.call(node);
            }
            if (isNull(manager)) {
                length = childNodes.length;
                for (var i = 0; i < length; ++i) {
                    childNode = childNodes[i];
                    if (childNode.nodeType === Node.ELEMENT_NODE) {
                        if (!isNull(create(childNode))) {
                            this.compile(childNode);
                        }
                    }
                    newLength = childNodes.length;
                    i += newLength - length;
                    length = newLength;
                }
            }
            else {
                this._compileNodes(childNodes, manager);
            }
        };
        /**
         * @param {Array<Node>} nodes The array of nodes to be compiled.
         * @param {processing.ElementManager} manager The parent ElementManagers
         * for the given array of nodes.
         */
        /**
         * @param nodes The NodeList to be compiled.
         * @param manager The parent Element Manager for the given array of nodes.
         */
        Compiler.prototype._compileNodes = function (nodes, manager) {
            var length = nodes.length, node, newManager, newLength, create = this._ElementManagerFactory.create, commentCreate = this._CommentManagerFactory.create, textCreate = this._TextManagerFactory.create;
            for (var i = 0; i < length; ++i) {
                node = nodes[i];
                switch (node.nodeType) {
                    case Node.ELEMENT_NODE:
                        newManager = create(node, manager);
                        if (!isNull(newManager)) {
                            this._compileNodes(Array.prototype.slice.call(node.childNodes), newManager);
                        }
                        break;
                    case Node.TEXT_NODE:
                        textCreate(node, manager);
                        break;
                    case Node.COMMENT_NODE:
                        commentCreate(node, manager);
                        break;
                }
                newLength = nodes.length;
                i += newLength - length;
                length = newLength;
            }
        };
        Compiler._inject = {
            _ElementManagerFactory: __ElementManagerFactory,
            _TextManagerFactory: __TextManagerFactory,
            _CommentManagerFactory: __CommentManagerFactory,
            _managerCache: __ManagerCache
        };
        return Compiler;
    })();
    processing.Compiler = Compiler;
    register.injectable(__Compiler, Compiler);
    /**
     */
    var NodeManager = (function () {
        function NodeManager() {
            /**
             */
            this.isClone = false;
        }
        /**
         * @param {string} text The text string in which to search for markup.
         */
        NodeManager.hasMarkup = function (text) {
            return NodeManager._markupRegex.test(text);
        };
        /**
         * @param {string} text The text string in which to search for markup.
         */
        NodeManager.findMarkup = function (text) {
            var start, end, parsedExpressions = [], wrapExpression = NodeManager._wrapExpression, substring, expression, _parser = NodeManager._parser;
            text = text.replace(NodeManager._newLineRegex, '');
            while ((start = text.indexOf(__startSymbol)) !== -1 && (end = text.indexOf(__endSymbol)) !== -1) {
                if (start !== 0) {
                    parsedExpressions.push(wrapExpression(text.slice(0, start)));
                }
                // incremement with while loop instead of just += 2 for nested object literal case. 
                while (text[++end] === '}') { }
                substring = text.slice(start + 2, end - 2);
                // check for one-time databinding 
                if (substring[0] === '=') {
                    expression = _parser.parse(substring.slice(1).trim());
                    expression.oneTime = true;
                    parsedExpressions.push(expression);
                }
                else {
                    parsedExpressions.push(_parser.parse(substring.trim()));
                }
                text = text.slice(end);
            }
            if (start > -1 && end >= 0) {
                parsedExpressions.push(wrapExpression(text.slice(end)));
            }
            else if (text !== '') {
                parsedExpressions.push(wrapExpression(text));
            }
            return parsedExpressions;
        };
        /**
         * @param {Array<expressions.IParsedExpression>} expressions The composition array to evaluate.
         * @param {ui.TemplateControl} control? The TemplateControl used to parse
         * the expressions.
         */
        NodeManager.build = function (expressions, control) {
            var text = '', length = expressions.length, resources = {}, expression, value, evaluateExpression = NodeManager._TemplateControlFactory.evaluateExpression;
            for (var i = 0; i < length; ++i) {
                expression = expressions[i];
                value = evaluateExpression(expression, control, resources);
                if (isObject(value)) {
                    try {
                        text += JSON.stringify(value, null, 4);
                    }
                    catch (e) {
                        if (!isNull(e.description)) {
                            e.description = 'Cannot stringify object: ' + e.description;
                        }
                        e.message = 'Cannot stringify object: ' + e.message;
                        NodeManager._log.warn(e);
                    }
                }
                else if (!isNull(value)) {
                    text += value;
                }
            }
            return text;
        };
        /**
         * @param {Array<expressions.IParsedExpression>} expressions An Array of
         * IParsedExpressions to observe.
         * @param {ui.TemplateControl} control The TemplateControl associated
         * to the identifiers.
         * @param {(...args: Array<any>) => void} listener The listener to call when any identifier property changes.
         */
        NodeManager.observeExpressions = function (expressions, control, listener) {
            var uniqueIdentifiers = NodeManager.__findUniqueIdentifiers(expressions), identifiers = uniqueIdentifiers.identifiers, oneTimeIdentifiers = uniqueIdentifiers.oneTimeIdentifiers, oneTimeIdentifier, observableCallback = {
                listener: listener,
                uid: control.uid
            }, observationDetails, manager, absoluteIdentifier;
            while (identifiers.length > 0) {
                observationDetails = NodeManager.__getObservationDetails(identifiers.pop(), control);
                manager = observationDetails.manager;
                if (!isNull(manager)) {
                    manager.observe(observationDetails.absoluteIdentifier, observableCallback);
                }
            }
            while (oneTimeIdentifiers.length > 0) {
                oneTimeIdentifier = oneTimeIdentifiers.pop();
                observationDetails = NodeManager.__getObservationDetails(oneTimeIdentifier, control);
                manager = observationDetails.manager;
                if (!(isNull(manager) || observationDetails.isDefined)) {
                    absoluteIdentifier = observationDetails.absoluteIdentifier;
                    var stopObserving = manager.observe(absoluteIdentifier, observableCallback), stopListening = manager.observe(absoluteIdentifier, {
                        uid: control.uid,
                        listener: function () {
                            stopObserving();
                            stopListening();
                        }
                    });
                }
            }
        };
        /**
         * @param text The text to wrap into a static expression.
         */
        NodeManager._wrapExpression = function (text) {
            return {
                evaluate: function () { return text; },
                identifiers: [],
                aliases: [],
                expression: text
            };
        };
        /**
         * @param {Array<expressions.IParsedExpression>} expressions An array of parsed expressions to search for identifiers.
         */
        NodeManager.__findUniqueIdentifiers = function (expressions) {
            var length = expressions.length, expression;
            if (length === 1) {
                expression = expressions[0];
                if (expression.oneTime === true) {
                    return {
                        identifiers: [],
                        oneTimeIdentifiers: expression.identifiers.slice(0)
                    };
                }
                return {
                    identifiers: expression.identifiers.slice(0),
                    oneTimeIdentifiers: []
                };
            }
            var uniqueIdentifierObject = {}, oneTimeIdentifierObject = {}, uniqueIdentifiers = [], oneTimeIdentifiers = [], identifiers, identifier, j, jLength, oneTime;
            for (var i = 0; i < length; ++i) {
                expression = expressions[i];
                oneTime = expression.oneTime;
                identifiers = expression.identifiers;
                jLength = identifiers.length;
                for (j = 0; j < jLength; ++j) {
                    identifier = identifiers[j];
                    if (oneTime) {
                        if (uniqueIdentifierObject[identifier] === true) {
                            continue;
                        }
                        if (!oneTimeIdentifierObject[identifier]) {
                            oneTimeIdentifierObject[identifier] = true;
                            oneTimeIdentifiers.push(identifier);
                        }
                    }
                    else {
                        if (!uniqueIdentifierObject[identifier]) {
                            uniqueIdentifierObject[identifier] = true;
                            uniqueIdentifiers.push(identifier);
                        }
                        if (oneTimeIdentifierObject[identifier] === true) {
                            oneTimeIdentifierObject[identifier] = false;
                            oneTimeIdentifiers.splice(oneTimeIdentifiers.indexOf(identifier), 1);
                        }
                    }
                }
            }
            return {
                identifiers: uniqueIdentifiers,
                oneTimeIdentifiers: oneTimeIdentifiers
            };
        };
        /**
         * @param {string} identifier The identifier looking to be observed.
         * @param {ui.TemplateControl} control The TemplateControl associated
         * to the identifiers.
         */
        NodeManager.__getObservationDetails = function (identifier, control) {
            var _ContextManager = NodeManager._ContextManager, manager, split = identifier.split('.'), absoluteIdentifier = '', isDefined = false;
            if (identifier[0] === '@') {
                // we found an alias 
                var resourceObj, resources = {}, topIdentifier = split.shift(), alias = topIdentifier.slice(1);
                if (split.length > 0) {
                    absoluteIdentifier = '.' + split.join('.');
                }
                resourceObj = resources[alias];
                if (isNull(resourceObj)) {
                    resourceObj = resources[alias] = control.findResource(alias);
                }
                if (!isNull(resourceObj) && !isNull(resourceObj.resource)) {
                    var type = resourceObj.resource.type;
                    if (alias === __CONTEXT_RESOURCE) {
                        manager = _ContextManager.getManager(Control.getRootControl(control));
                        absoluteIdentifier = control.absoluteContextPath + absoluteIdentifier;
                    }
                    else if (alias === __ROOT_CONTEXT_RESOURCE) {
                        manager = _ContextManager.getManager(resources[alias].control);
                        absoluteIdentifier = 'context' + absoluteIdentifier;
                    }
                    else if (type === __OBSERVABLE_RESOURCE || type === __LITERAL_RESOURCE) {
                        manager = _ContextManager.getManager(resources[alias].control);
                        absoluteIdentifier = 'resources.' + alias + '.value' + absoluteIdentifier;
                    }
                }
            }
            else {
                // look on the control.context 
                isDefined = !isUndefined(_ContextManager.getContext(control.context, split));
                if (isDefined || isUndefined(_ContextManager.getContext(control, split))) {
                    manager = _ContextManager.getManager(Control.getRootControl(control));
                    absoluteIdentifier = control.absoluteContextPath + '.' + identifier;
                }
                else {
                    manager = null;
                }
            }
            return {
                absoluteIdentifier: absoluteIdentifier,
                manager: manager,
                isDefined: isDefined
            };
        };
        /**
         * @param {processing.INodeMap} nodeMap The mapping associated with this manager. We have to use an
         * Used to treat all NodeManagers the same.
         * @param {processing.ElementManager} parent The parent ElementManager.
         */
        NodeManager.prototype.initialize = function (nodeMap, parent) {
            this.nodeMap = nodeMap;
            this.parent = parent;
            if (!isNull(parent)) {
                this.isClone = parent.isClone;
                parent.children.push(this);
            }
        };
        /**
         */
        NodeManager.prototype.getParentControl = function () {
            var parent = this.parent, control;
            while (isNull(control)) {
                if (isNull(parent)) {
                    break;
                }
                control = parent.getUiControl();
                parent = parent.parent;
            }
            return control;
        };
        /**
         * @param {Node} newNode The new node associated with the new manager.
         * @param {processing.ElementManager} parentManager The parent
         * ElementManager for the clone.
         */
        NodeManager.prototype.clone = function (newNode, parentManager) {
            return 1;
        };
        /**
         */
        NodeManager.prototype.bind = function () { };
        return NodeManager;
    })();
    processing.NodeManager = NodeManager;
    /**
     */
    function INodeManagerStatic(_regex, _ContextManager, _parser, _TemplateControlFactory, _log) {
        // NOTE: This is not advised by TypeScript, but we want to do this. 
        NodeManager._markupRegex = _regex.markupRegex;
        NodeManager._newLineRegex = _regex.newLineRegex;
        NodeManager._ContextManager = _ContextManager;
        NodeManager._parser = _parser;
        NodeManager._TemplateControlFactory = _TemplateControlFactory;
        NodeManager._log = _log;
        return NodeManager;
    }
    processing.INodeManagerStatic = INodeManagerStatic;
    register.injectable(__NodeManagerStatic, INodeManagerStatic, [
        __Regex,
        __ContextManagerStatic,
        __Parser,
        __TemplateControlFactory,
        __Log
    ], __STATIC);
    /**
     */
    var ElementManager = (function (_super) {
        __extends(ElementManager, _super);
        function ElementManager() {
            _super.apply(this, arguments);
            /**
             */
            this.children = [];
            /**
             */
            this.type = 'element';
            /**
             */
            this.replace = false;
            /**
             */
            this.hasOwnContext = false;
        }
        /**
         * @param {Element} element The Element to use to identifier markup and controls.
         * @param {processing.ElementManager} parent? The parent ElementManager
         * used for context inheritance.
         */
        ElementManager.create = function (element, parent) {
            var name = element.nodeName.toLowerCase(), nodeName = name, injector = controlInjectors[name] || viewControlInjectors[name], noControlAttribute = true, hasUiControl = false, uiControlNode;
            if (isNull(injector)) {
                if (element.hasAttribute(__Control)) {
                    name = element.getAttribute(__Control).toLowerCase();
                    injector = controlInjectors[name] || viewControlInjectors[name];
                    noControlAttribute = false;
                }
                else if (element.hasAttribute(__AttributePrefix + __Control)) {
                    name = element.getAttribute(__AttributePrefix + __Control).toLowerCase();
                    injector = controlInjectors[name] || viewControlInjectors[name];
                    noControlAttribute = false;
                }
            }
            if (!isNull(injector)) {
                var uiControl = injector.inject(), resourceElement = ElementManager.locateResources(element);
                uiControlNode = {
                    control: uiControl,
                    resourceElement: resourceElement,
                    nodeName: name,
                    expressions: [],
                    injector: injector
                };
                hasUiControl = true;
                if (noControlAttribute) {
                    element.setAttribute(__Control, name);
                }
                var replacementType = uiControl.replaceWith, replaceWithDiv = replacementType === 'any' && noControlAttribute;
                if (!isEmpty(replacementType) && (replacementType !== 'any' || replaceWithDiv) &&
                    replacementType.toLowerCase() !== nodeName) {
                    if (replaceWithDiv) {
                        replacementType = 'div';
                    }
                    var replacement = ElementManager._document.createElement(replacementType);
                    if (replacement.nodeType === Node.ELEMENT_NODE) {
                        element = replaceWith(element, replacement);
                    }
                }
            }
            var elementMap = ElementManager._collectAttributes(element.attributes), manager = ElementManager.getInstance();
            elementMap.element = element;
            if (!hasUiControl && isString(elementMap.childContext)) {
                injector = injectableInjectors[__TemplateControlInstance];
                hasUiControl = true;
                elementMap.uiControlNode = {
                    control: injector.inject(),
                    resourceElement: null,
                    nodeName: __TemplateContext,
                    expressions: [],
                    injector: injector
                };
            }
            else {
                elementMap.uiControlNode = uiControlNode;
            }
            manager.initialize(elementMap, parent);
            if (!(elementMap.hasControl || hasUiControl)) {
                manager.bind = function () { return []; };
            }
            else {
                manager.setUiControlTemplate();
                return hasUiControl ? null : manager;
            }
            return manager;
        };
        /**
         * @param {Node} node The node whose child nodes may contain Resources.
         */
        ElementManager.locateResources = function (node) {
            var childNodes = Array.prototype.slice.call(node.childNodes), childNode, nodeName;
            while (childNodes.length > 0) {
                childNode = childNodes.shift();
                nodeName = childNode.nodeName.toLowerCase();
                if (nodeName === __Resources || nodeName === 'x-' + __Resources) {
                    return node.removeChild(childNode);
                }
            }
            return null;
        };
        /**
         * @param {processing.ElementManager} sourceManager The original ElementManager.
         * @param {processing.ElementManager} parent The parent ElementManager
         * for the new clone.
         * @param {Element} element The new element to associate with the clone.
         * @param {ui.TemplateControl} newControl? An optional control to associate with the clone.
         * @param {processing.INodeMap} nodeMap? The {@link processing.INodeMap} used to clone this
         * ElementManager.
         */
        ElementManager.clone = function (sourceManager, parent, element, newControl, nodeMap) {
            if (isNull(nodeMap)) {
                nodeMap = ElementManager._cloneNodeMap(sourceManager.nodeMap, element, parent.getUiControl() ||
                    parent.getParentControl(), newControl);
            }
            var manager = ElementManager.getInstance(), hasNewControl = !isNull(newControl);
            manager.nodeMap = nodeMap;
            manager.parent = parent;
            if (!isNull(parent)) {
                parent.children.push(manager);
            }
            manager.replace = sourceManager.replace;
            manager.replaceNodeLength = sourceManager.replaceNodeLength;
            manager.hasOwnContext = sourceManager.hasOwnContext;
            manager.isClone = true;
            if (!(nodeMap.hasControl || hasNewControl)) {
                manager.bind = function () { return []; };
            }
            if (hasNewControl) {
                ElementManager._managerCache.put(newControl.uid, manager);
            }
            return manager;
        };
        /**
         * @param {processing.INodeMap} sourceMap The source INodeMap used to clone the
         * TemplateControl.
         * @param {ui.TemplateControl} parent The parent control of the clone.
         */
        ElementManager.cloneUiControl = function (sourceMap, parent) {
            var uiControlNode = sourceMap.uiControlNode;
            if (isNull(uiControlNode) || isNull(uiControlNode.injector)) {
                return;
            }
            var uiControl = uiControlNode.control, newUiControl = uiControlNode.injector.inject(), resources = ElementManager._ResourcesFactory.getInstance(), attributes = ElementManager._AttributesFactory.getInstance();
            newUiControl.parent = parent;
            parent.controls.push(newUiControl);
            newUiControl.controls = [];
            attributes.initialize(newUiControl, sourceMap.attributes);
            newUiControl.attributes = attributes;
            resources.initialize(newUiControl, uiControl.resources);
            newUiControl.resources = resources;
            ElementManager._ResourcesFactory.addControlResources(newUiControl);
            if (!isNull(uiControl.innerTemplate)) {
                newUiControl.innerTemplate = uiControl.innerTemplate.cloneNode(true);
            }
            newUiControl.type = uiControl.type;
            newUiControl.bindableTemplates = ElementManager._BindableTemplatesFactory.create(newUiControl, uiControl.bindableTemplates);
            newUiControl.replaceWith = uiControl.replaceWith;
            return newUiControl;
        };
        /**
         * @param {processing.INodeMap} nodeMap The INodeMap that contains
         * the attribute nodes.
         * @param {ui.TemplateControl} parent The parent TemplateControl for
         * the newly created controls.
         * @param {ui.TemplateControl} templateControl? The TemplateControl
         * linked to these created controls if one exists.
         * @param {Element} newElement? An optional element to use for attributes (used in cloning).
         * @param {boolean} isClone? Whether or not these controls are clones.
         */
        ElementManager.createAttributeControls = function (nodeMap, parent, templateControl, newElement, isClone) {
            var nodes = nodeMap.nodes, element = isClone === true ? newElement : nodeMap.element, attributes;
            if (isNode(element)) {
                if (element.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                    return isClone === true ? ElementManager._copyAttributeNodes(nodes) : [];
                }
                attributes = element.attributes;
            }
            var attrs = nodeMap.attributes, newAttributes, node, injector, control, newNodes = [], length = nodes.length, nodeName, i;
            for (i = 0; i < length; ++i) {
                node = nodes[i];
                nodeName = node.nodeName;
                injector = node.injector;
                control = null;
                if (!isNull(injector)) {
                    control = injector.inject();
                    node.control = control;
                    control.parent = parent;
                    control.element = element;
                    newAttributes = ElementManager._AttributesFactory.getInstance();
                    newAttributes.initialize(control, attrs);
                    control.attributes = newAttributes;
                    control.type = nodeName;
                    if (!isString(control.uid)) {
                        control.uid = uniqueId(__Plat);
                    }
                    control.templateControl = templateControl;
                }
                if (isClone === true) {
                    newNodes.push({
                        control: control,
                        expressions: node.expressions,
                        node: !attributes ? null : (attributes.getNamedItem(nodeName) ||
                            attributes.getNamedItem(__AttributePrefix + nodeName)),
                        nodeName: nodeName,
                        injector: injector
                    });
                    if (!isNull(control)) {
                        if (!isNull(parent)) {
                            parent.controls.push(control);
                        }
                        if (isFunction(control.initialize)) {
                            control.initialize();
                        }
                    }
                }
            }
            if (!isClone) {
                nodes.sort(function (a, b) {
                    var aControl = a.control, bControl = b.control;
                    if (isNull(aControl)) {
                        return 1;
                    }
                    else if (isNull(bControl)) {
                        return -1;
                    }
                    var aPriority = isNumber(aControl.priority) ? aControl.priority : 0, bPriority = isNumber(bControl.priority) ? bControl.priority : 0;
                    return bPriority - aPriority;
                });
                for (i = 0; i < length; ++i) {
                    node = nodes[i];
                    control = node.control;
                    if (!isNull(control)) {
                        if (!isNull(parent)) {
                            parent.controls.push(control);
                        }
                        if (isFunction(control.initialize)) {
                            control.initialize();
                        }
                    }
                }
            }
            return newNodes;
        };
        /**
         */
        ElementManager.getInstance = function () {
            var manager = new ElementManager();
            manager._Promise = acquire(__Promise);
            manager._ContextManager = NodeManager._ContextManager;
            manager._compiler = acquire(__Compiler);
            manager._CommentManagerFactory = acquire(__CommentManagerFactory);
            manager._ControlFactory = acquire(__ControlFactory);
            manager._TemplateControlFactory = NodeManager._TemplateControlFactory;
            manager._BindableTemplatesFactory = ElementManager._BindableTemplatesFactory;
            manager._log = ElementManager._log;
            return manager;
        };
        /**
         * @param {NamedNodeMap} attributes The attributes used to create the INodeMap.
         */
        ElementManager._collectAttributes = function (attributes) {
            var nodes = [], attribute, name, value, childContext, childIdentifier, hasMarkup, hasMarkupFn = NodeManager.hasMarkup, findMarkup = NodeManager.findMarkup, _parser = NodeManager._parser, expressions, hasControl = false, injector, length = attributes.length, controlAttributes = {};
            for (var i = 0; i < length; ++i) {
                attribute = attributes[i];
                value = attribute.value;
                name = attribute.name.replace(/^data-/i, '').toLowerCase();
                injector = controlInjectors[name] || viewControlInjectors[name];
                if (name === __Context) {
                    if (value !== '') {
                        childContext = _parser.parse(value);
                        if (childContext.identifiers.length !== 1) {
                            ElementManager._log.warn('Incorrect ' + __Context + ': ' +
                                value + ', must contain a single identifier.');
                        }
                        childIdentifier = childContext.identifiers[0];
                    }
                }
                else if (name !== __Control) {
                    hasMarkup = hasMarkupFn(value);
                    expressions = hasMarkup ? findMarkup(value) : [];
                    if (!hasControl && (hasMarkup || !isNull(injector))) {
                        hasControl = true;
                    }
                    nodes.push({
                        control: null,
                        node: attribute,
                        nodeName: name,
                        expressions: expressions,
                        injector: injector
                    });
                }
                controlAttributes[camelCase(name)] = value;
            }
            return {
                element: null,
                attributes: controlAttributes,
                nodes: nodes,
                childContext: childIdentifier,
                hasControl: hasControl
            };
        };
        /**
         * @param {Array<processing.INode>} nodes The compiled INodes
         * to be cloned.
         */
        ElementManager._copyAttributeNodes = function (nodes) {
            var newNodes = [], length = nodes.length, node;
            for (var i = 0; i < length; ++i) {
                node = nodes[i];
                newNodes.push({
                    expressions: node.expressions,
                    nodeName: node.nodeName
                });
            }
            return newNodes;
        };
        /**
         * @param {processing.INode} sourceNode The original INode.
         * @param {Node} node The new node used for cloning.
         * @param {ui.TemplateControl} newControl? An optional new control to associate with the cloned node.
         */
        ElementManager._cloneNode = function (sourceNode, node, newControl) {
            return {
                control: newControl,
                injector: sourceNode.injector,
                expressions: sourceNode.expressions,
                node: node,
                nodeName: sourceNode.nodeName
            };
        };
        /**
         * @param {processing.INodeMap} sourceMap The original INodeMap.
         * @param {Element} element The new Element used for cloning.
         * @param {ui.TemplateControl} parent The TemplateControl associated
         * with the parent ElementManager.
         * @param {ui.TemplateControl} newControl? An optional new TemplateControl
         * to associate with the element.
         */
        ElementManager._cloneNodeMap = function (sourceMap, element, parent, newControl) {
            var hasControl = sourceMap.hasControl, nodeMap = {
                attributes: sourceMap.attributes,
                childContext: sourceMap.childContext,
                nodes: [],
                element: element,
                uiControlNode: !isNull(sourceMap.uiControlNode) ?
                    ElementManager._cloneNode(sourceMap.uiControlNode, element, newControl) : null,
                hasControl: hasControl
            };
            if (hasControl) {
                nodeMap.nodes = ElementManager.createAttributeControls(sourceMap, parent, newControl, element, true);
            }
            return nodeMap;
        };
        /**
         * @param {Node} newNode The new element used to clone the ElementManager.
         * @param {processing.ElementManager} parentManager The parent manager for the clone.
         * @param {processing.INodeMap} nodeMap? An optional INodeMap to clone a ui control if needed.
         */
        ElementManager.prototype.clone = function (newNode, parentManager, nodeMap) {
            var childNodes, clonedManager, replace = this.replace, children = this.children, newControl = !isNull(nodeMap) ? nodeMap.uiControlNode.control : null, newControlExists = !isNull(newControl), startNodeManager, endNodeManager;
            if (!newControlExists) {
                // create new control 
                newControl = ElementManager.cloneUiControl(this.nodeMap, (parentManager.getUiControl() || parentManager.getParentControl()));
                newControlExists = !isNull(newControl);
            }
            if (replace) {
                // definitely have newControl 
                var nodes = newNode.parentNode.childNodes, arrayProto = Array.prototype, startIndex = arrayProto.indexOf.call(nodes, newNode);
                childNodes = arrayProto.slice.call(nodes, startIndex + 1, startIndex + this.replaceNodeLength);
                clonedManager = ElementManager.clone(this, parentManager, null, newControl, nodeMap);
                newControl.elementNodes = childNodes;
                newControl.startNode = newNode;
                newControl.endNode = childNodes.pop();
                startNodeManager = children.shift();
                endNodeManager = children.shift();
                startNodeManager.clone(newControl.startNode, clonedManager);
                endNodeManager.clone(newControl.endNode, clonedManager);
                if (isFunction(newControl.initialize)) {
                    newControl.initialize();
                }
            }
            else {
                childNodes = Array.prototype.slice.call(newNode.childNodes);
                clonedManager = ElementManager.clone(this, parentManager, newNode, newControl, nodeMap);
                nodeMap = clonedManager.nodeMap;
                if (newControlExists) {
                    newControl.element = newNode;
                    if (isFunction(newControl.initialize)) {
                        newControl.initialize();
                    }
                }
            }
            var length = children.length, childNodeOffset = 0;
            for (var i = 0; i < length; ++i) {
                // clone children 
                childNodeOffset += children[i].clone(childNodes[childNodeOffset], clonedManager);
            }
            if (replace) {
                children.unshift(endNodeManager);
                children.unshift(startNodeManager);
                return childNodeOffset + 2;
            }
            return 1;
        };
        /**
         * @param {processing.INodeMap} nodeMap A map of the nodes (element and attributes)
         * associated with this ElementManager.
         * @param {processing.ElementManager} parent The parent
         * ElementManager.
         * @param {boolean} dontInitialize? Specifies whether or not the initialize method should
         * be called for a TemplateControl if one is attached
         * to this ElementManager.
         */
        ElementManager.prototype.initialize = function (nodeMap, parent, dontInitialize) {
            _super.prototype.initialize.call(this, nodeMap, parent);
            var controlNode = nodeMap.uiControlNode, hasUiControl = !isNull(controlNode), control;
            if (hasUiControl) {
                this._populateUiControl();
                control = controlNode.control;
                this.hasOwnContext = control.hasOwnContext;
            }
            if (nodeMap.hasControl) {
                ElementManager.createAttributeControls(nodeMap, this.getParentControl(), control);
            }
            if (!dontInitialize && hasUiControl && isFunction(control.initialize)) {
                control.initialize();
            }
        };
        /**
         */
        ElementManager.prototype.bind = function () {
            var _this = this;
            var nodeMap = this.nodeMap, parent = this.getParentControl(), controlNode = nodeMap.uiControlNode, controls = [];
            if (!isNull(controlNode)) {
                var uiControl = controlNode.control, childContext = nodeMap.childContext, getManager = this._ContextManager.getManager, contextManager, absoluteContextPath = isNull(parent) ? __CONTEXT : parent.absoluteContextPath, _TemplateControlFactory = this._TemplateControlFactory, inheritsContext = !uiControl.hasOwnContext;
                controls.push(uiControl);
                if (inheritsContext && !isNull(childContext)) {
                    if (childContext[0] === '@') {
                        var split = childContext.split('.'), topIdentifier = split.shift(), alias = topIdentifier.slice(1), resourceObj = _TemplateControlFactory.findResource(uiControl, alias);
                        if (isObject(resourceObj)) {
                            var resource = resourceObj.resource;
                            childContext = (split.length > 0 ? ('.' + split.join('.')) : '');
                            if (alias === __CONTEXT_RESOURCE) {
                                absoluteContextPath += childContext;
                            }
                            else if (alias === __ROOT_CONTEXT_RESOURCE) {
                                absoluteContextPath = __CONTEXT + childContext;
                            }
                            else if (resource.type === __OBSERVABLE_RESOURCE || resource.type === __LITERAL_RESOURCE) {
                                absoluteContextPath = 'resources.' + alias + '.value' + childContext;
                                uiControl.root = resourceObj.control;
                            }
                            else {
                                this._log.warn('Only resources of type "observable" can be set as context.');
                            }
                        }
                        else {
                            this._log.warn('Could not set the context of ' + uiControl.type +
                                ' with the resource specified as "' + childContext + '".');
                        }
                    }
                    else {
                        absoluteContextPath += '.' + childContext;
                    }
                }
                if (!isObject(uiControl.root)) {
                    uiControl.root = this._ControlFactory.getRootControl(uiControl) || uiControl;
                }
                contextManager = getManager(uiControl.root);
                var awaitContext = false;
                if (inheritsContext) {
                    uiControl.context = contextManager.getContext(absoluteContextPath.split('.'), false);
                    awaitContext = isUndefined(uiControl.context) && !this._BindableTemplatesFactory.isBoundControl(uiControl);
                }
                else {
                    absoluteContextPath = __CONTEXT;
                }
                if (awaitContext) {
                    this.contextPromise = new this._Promise(function (resolve, reject) {
                        var removeListener = contextManager.observe(absoluteContextPath, {
                            uid: uiControl.uid,
                            listener: function (newValue, oldValue) {
                                if (isUndefined(newValue)) {
                                    return;
                                }
                                removeListener();
                                uiControl.context = newValue;
                                _this._beforeLoad(uiControl, absoluteContextPath);
                                resolve();
                            }
                        });
                    });
                }
                else {
                    this._beforeLoad(uiControl, absoluteContextPath);
                }
            }
            this._observeControlIdentifiers(nodeMap.nodes, parent, controls, nodeMap.element);
            return controls;
        };
        /**
         * @param {string} templateUrl? The URL for the associated TemplateControl's
         * HTML template.
         */
        ElementManager.prototype.setUiControlTemplate = function (templateUrl) {
            var _this = this;
            var controlNode = this.nodeMap.uiControlNode;
            if (!isNull(controlNode)) {
                var control = controlNode.control;
                this.templatePromise = this._TemplateControlFactory.determineTemplate(control, templateUrl).then(function (template) {
                    _this.templatePromise = null;
                    _this._initializeControl(control, template.cloneNode(true));
                }, function (error) {
                    _this.templatePromise = null;
                    if (isNull(error)) {
                        var template = error;
                        if (_this._BindableTemplatesFactory.isBoundControl(control)) {
                            template = appendChildren(control.element.childNodes);
                        }
                        _this._initializeControl(control, template);
                    }
                    else {
                        postpone(function () {
                            if (isString(error)) {
                                error = new Error(error);
                            }
                            _this._log.error(error);
                        });
                    }
                });
                return;
            }
            if (!isNull(this.parent)) {
                return;
            }
            this.bindAndLoad();
        };
        /**
         */
        ElementManager.prototype.getUiControl = function () {
            var uiControlNode = this.nodeMap.uiControlNode;
            if (isNull(uiControlNode)) {
                return;
            }
            return uiControlNode.control;
        };
        /**
         */
        ElementManager.prototype.fulfillTemplate = function () {
            var _this = this;
            if (!isNull(this.templatePromise)) {
                return this.templatePromise.then(function () {
                    return _this._fulfillChildTemplates();
                });
            }
            return this._fulfillChildTemplates();
        };
        /**
         */
        ElementManager.prototype.fulfillAndLoad = function () {
            var _this = this;
            return this.fulfillTemplate().then(function () {
                return _this.bindAndLoad();
            }).catch(function (error) {
                postpone(function () {
                    if (isString(error)) {
                        error = new Error(error);
                    }
                    _this._log.error(error);
                });
            });
        };
        /**
         */
        ElementManager.prototype.bindAndLoad = function () {
            var _this = this;
            var controls = this.bind(), promise;
            if (isPromise(this.contextPromise)) {
                promise = this.contextPromise.then(function () {
                    return _this._bindChildren();
                });
            }
            else {
                promise = this._bindChildren();
            }
            return promise.then(function () {
                return _this._loadControls(controls, _this.getUiControl());
            }).catch(function (error) {
                postpone(function () {
                    if (isString(error)) {
                        error = new Error(error);
                    }
                    _this._log.error(error);
                });
            });
        };
        /**
         * @param {ui.TemplateControl} root The TemplateControl specifying its own context.
         * @param {() => async.IThenable<void>} loadMethod The function to initiate the loading of the root control and its
         * children.
         */
        ElementManager.prototype.observeRootContext = function (root, loadMethod) {
            var _this = this;
            loadMethod = loadMethod.bind(this);
            if (!isNull(root.context)) {
                return loadMethod();
            }
            return new this._Promise(function (resolve) {
                var removeListener = _this._ContextManager.getManager(root).observe(__CONTEXT, {
                    listener: function () {
                        removeListener();
                        loadMethod().then(resolve);
                    },
                    uid: root.uid
                });
            }).catch(function (error) {
                postpone(function () {
                    if (isString(error)) {
                        error = new Error(error);
                    }
                    _this._log.error(error);
                });
            });
        };
        /**
         * @param {ui.TemplateControl} uiControl The control to finalize.
         * @param {string} absoluteContextPath The absoluteContextPath of the uiControl.
         */
        ElementManager.prototype._beforeLoad = function (uiControl, absoluteContextPath) {
            var contextManager = this._ContextManager.getManager(uiControl.root), _TemplateControlFactory = this._TemplateControlFactory;
            uiControl.zCC__plat = contextManager.observe(absoluteContextPath, {
                uid: uiControl.uid,
                priority: __CONTEXT_CHANGED_PRIORITY,
                listener: function (newValue, oldValue) {
                    uiControl.context = newValue;
                }
            });
            _TemplateControlFactory.setAbsoluteContextPath(uiControl, absoluteContextPath);
            _TemplateControlFactory.setContextResources(uiControl);
            ElementManager._ResourcesFactory.bindResources(uiControl.resources);
        };
        /**
         */
        ElementManager.prototype._bindChildren = function () {
            var children = this.children, length = children.length, child, promises = [];
            for (var i = 0; i < length; ++i) {
                child = children[i];
                if (child.hasOwnContext) {
                    if (this.isClone) {
                        promises.push(child.observeRootContext(child.getUiControl(), child.bindAndLoad));
                    }
                    else {
                        promises.push(child.observeRootContext(child.getUiControl(), child.fulfillAndLoad));
                    }
                }
                else if (!isUndefined(child.children)) {
                    promises.push(child.bindAndLoad());
                }
                else {
                    child.bind();
                }
            }
            return this._Promise.all(promises);
        };
        /**
         * @param {Array<AttributeControl>} controls The array of attribute based controls to load.
         * @param {ui.TemplateControl} templateControl The TemplateControl
         * associated with this manager.
         */
        ElementManager.prototype._loadControls = function (controls, templateControl) {
            var length = controls.length, control, load = this._ControlFactory.load, templateControlLoaded = isNull(templateControl), promise, templateControlPriority, i;
            if (templateControlLoaded) {
                // don't need to set templateControlPriority because it will never be checked. 
                i = 0;
            }
            else {
                var priority = templateControl.priority;
                templateControlPriority = isNumber(priority) ? priority : 100;
                i = 1;
            }
            for (; i < length; ++i) {
                control = controls[i];
                control.templateControl = templateControl;
                if (!templateControlLoaded && templateControlPriority > control.priority) {
                    templateControlLoaded = true;
                    promise = load(templateControl);
                }
                load(control);
            }
            if (!templateControlLoaded) {
                promise = load(templateControl);
            }
            return promise;
        };
        /**
         */
        ElementManager.prototype._populateUiControl = function () {
            var nodeMap = this.nodeMap, parent = this.getParentControl(), controlNode = nodeMap.uiControlNode, uiControl = controlNode.control, uid = uiControl.uid, resources = uiControl.resources, element = nodeMap.element, childNodes = Array.prototype.slice.call(element.childNodes), newAttributes = ElementManager._AttributesFactory.getInstance(), replace = this.replace = (uiControl.replaceWith === null || uiControl.replaceWith === '');
            if (!isString(uid)) {
                uid = uiControl.uid = uniqueId(__Plat);
            }
            ElementManager._managerCache.put(uid, this);
            if (!isNull(parent) && uiControl.parent !== parent) {
                parent.controls.push(uiControl);
                uiControl.parent = parent;
            }
            if (isFunction(element.setAttribute)) {
                element.setAttribute(__Hide, '');
            }
            uiControl.element = element;
            uiControl.controls = [];
            newAttributes.initialize(uiControl, nodeMap.attributes);
            uiControl.attributes = newAttributes;
            if (isObject(resources) && isFunction(resources.add)) {
                resources.add(controlNode.resourceElement);
            }
            else {
                resources = ElementManager._ResourcesFactory.getInstance();
                resources.initialize(uiControl, controlNode.resourceElement);
                uiControl.resources = resources;
            }
            ElementManager._ResourcesFactory.addControlResources(uiControl);
            uiControl.type = controlNode.nodeName;
            uiControl.bindableTemplates = uiControl.bindableTemplates || this._BindableTemplatesFactory.create(uiControl);
            if (childNodes.length > 0 && (!isEmpty(uiControl.templateString) || !isEmpty(uiControl.templateUrl))) {
                uiControl.innerTemplate = appendChildren(childNodes);
            }
            if (replace) {
                this._replaceElement(uiControl, nodeMap);
            }
        };
        /**
         * @param {ui.TemplateControl} control The TemplateControl whose element
         * will be removed.
         * @param {processing.INodeMap} nodeMap The INodeMap associated with this manager.
         */
        ElementManager.prototype._replaceElement = function (control, nodeMap) {
            var element = nodeMap.element, parentNode = element.parentNode, _document = ElementManager._document, controlType = control.type, controlUid = control.uid, startNode = control.startNode = _document.createComment(controlType + ' ' + controlUid + __START_NODE), endNode = control.endNode = _document.createComment(controlType + ' ' + controlUid + __END_NODE), create = this._CommentManagerFactory.create;
            create(startNode, this);
            create(endNode, this);
            parentNode.insertBefore(startNode, element);
            parentNode.insertBefore(endNode, element.nextSibling);
            control.elementNodes = replace(element);
            control.element = nodeMap.element = null;
        };
        /**
         * @param {ui.TemplateControl} uiControl The TemplateControl
         * associated with this manager.
         * @param {DocumentFragment} template The associated TemplateControl's
         * template.
         */
        ElementManager.prototype._initializeControl = function (uiControl, template) {
            var element = this.nodeMap.element, 
            // have to check if null since isNull checks for undefined case 
            replaceElement = this.replace, endNode;
            if (!isNull(template)) {
                var resourceElement = ElementManager.locateResources(template);
                if (!isNull(resourceElement)) {
                    uiControl.resources.add(ElementManager._ResourcesFactory.parseElement(resourceElement));
                }
                if (replaceElement) {
                    endNode = uiControl.endNode;
                    uiControl.elementNodes = Array.prototype.slice.call(template.childNodes);
                    insertBefore(endNode.parentNode, template, endNode);
                }
                else {
                    insertBefore(element, template, element.lastChild);
                }
            }
            if (isFunction(uiControl.setTemplate)) {
                uiControl.setTemplate();
            }
            if (replaceElement) {
                this._compiler.compile(uiControl.elementNodes, uiControl);
                var startNode = uiControl.startNode, parentNode = startNode.parentNode, childNodes = Array.prototype.slice.call(parentNode.childNodes);
                endNode = uiControl.endNode;
                uiControl.elementNodes = childNodes.slice(childNodes.indexOf(startNode) + 1, childNodes.indexOf(endNode));
                this.replaceNodeLength = uiControl.elementNodes.length + 2;
            }
            else {
                this._compiler.compile(element, uiControl);
            }
            if (isNull(uiControl.parent)) {
                this.fulfillAndLoad();
            }
        };
        /**
         * @param {Array<processing.INode>} nodes The array of INodes to iterate through.
         * @param {ui.TemplateControl} parent The parent TemplateControl for context.
         * @param {Array<Control>} controls The array of controls whose attributes will need to be updated
         * upon the context changing.
         */
        ElementManager.prototype._observeControlIdentifiers = function (nodes, parent, controls, element) {
            var length = nodes.length, hasParent = !isNull(parent), node, control, i = 0, replace = this.replace, managers = [], manager;
            for (; i < length; ++i) {
                node = nodes[i];
                control = node.control;
                if (hasParent && node.expressions.length > 0) {
                    manager = AttributeManager.getInstance();
                    managers.push(manager);
                    manager.initialize(element, node, parent, controls, replace);
                    NodeManager.observeExpressions(node.expressions, parent, manager.attributeChanged.bind(manager));
                }
                if (!isNull(control)) {
                    controls.push(control);
                }
            }
            length = managers.length;
            for (i = 0; i < length; ++i) {
                managers[i].attributeChanged();
            }
        };
        /**
         */
        ElementManager.prototype._fulfillChildTemplates = function () {
            var _this = this;
            var children = this.children, child, length = children.length, promises = [];
            for (var i = 0; i < length; ++i) {
                child = children[i];
                if (!isUndefined(child.children)) {
                    promises.push(child.fulfillTemplate());
                }
            }
            return this._Promise.all(promises).catch(function (error) {
                postpone(function () {
                    if (isString(error)) {
                        error = new Error(error);
                    }
                    _this._log.error(error);
                });
            });
        };
        ElementManager._inject = {
            _Promise: __Promise,
            _ContextManager: __ContextManagerStatic,
            _compiler: __Compiler,
            _CommentManagerFactory: __CommentManagerFactory,
            _ControlFactory: __ControlFactory,
            _TemplateControlFactory: __TemplateControlFactory,
            _BindableTemplatesFactory: __BindableTemplatesFactory,
            _log: __Log
        };
        return ElementManager;
    })(NodeManager);
    processing.ElementManager = ElementManager;
    /**
     */
    function IElementManagerFactory(_document, _managerCache, _ResourcesFactory, _AttributesFactory, _BindableTemplatesFactory, _log) {
        ElementManager._document = _document;
        ElementManager._managerCache = _managerCache;
        ElementManager._ResourcesFactory = _ResourcesFactory;
        ElementManager._AttributesFactory = _AttributesFactory;
        ElementManager._BindableTemplatesFactory = _BindableTemplatesFactory;
        ElementManager._log = _log;
        return ElementManager;
    }
    processing.IElementManagerFactory = IElementManagerFactory;
    register.injectable(__ElementManagerFactory, IElementManagerFactory, [
        __Document,
        __ManagerCache,
        __ResourcesFactory,
        __AttributesFactory,
        __BindableTemplatesFactory,
        __Log
    ], __FACTORY);
    register.injectable(__ElementManagerInstance, ElementManager, null, __INSTANCE);
    /**
     */
    var TextManager = (function (_super) {
        __extends(TextManager, _super);
        function TextManager() {
            _super.apply(this, arguments);
            /**
             */
            this.type = 'text';
        }
        /**
         * @param {Node} node The Node used to find markup.
         * @param {processing.ElementManager} parent The parent ElementManager
         * for the node.
         */
        TextManager.create = function (node, parent) {
            var value = node.nodeValue, manager = new TextManager();
            if (NodeManager.hasMarkup(value)) {
                var expressions_1 = NodeManager.findMarkup(value), map_1 = {
                    nodes: [{
                            node: node,
                            expressions: expressions_1
                        }]
                };
                manager.initialize(map_1, parent);
                return manager;
            }
            manager.initialize(null, parent);
            manager.bind = noop;
            return manager;
        };
        /**
         * @param {processing.INodeMap} sourceMap The original INodeMap.
         * @param {Node} newNode The new text node used for cloning.
         */
        TextManager._cloneNodeMap = function (sourceMap, newNode) {
            var node = sourceMap.nodes[0], nodeMap = {
                nodes: [{
                        expressions: node.expressions,
                        nodeName: node.nodeName,
                        node: newNode
                    }]
            };
            return nodeMap;
        };
        /**
         * @param {processing.NodeManager} sourceManager The original NodeManager.
         * @param {Node} node The new text node to associate with the clone.
         * @param {processing.ElementManager} parent The parent ElementManager
         * for the new clone.
         */
        TextManager._clone = function (sourceManager, node, parent) {
            var map = sourceManager.nodeMap, manager = new TextManager();
            if (!isNull(map)) {
                manager.initialize(TextManager._cloneNodeMap(map, node), parent);
            }
            else {
                manager.initialize(null, parent);
                manager.bind = noop;
            }
            return manager;
        };
        /**
         * @param {Node} newNode The new node attached to the cloned TextManager.
         * @param {processing.ElementManager} parentManager The parent ElementManager
         * for the clone.
         */
        TextManager.prototype.clone = function (newNode, parentManager) {
            TextManager._clone(this, newNode, parentManager);
            return 1;
        };
        /**
         */
        TextManager.prototype.bind = function () {
            var parent = this.getParentControl(), node = this.nodeMap.nodes[0], textNode = node.node, expressions = node.expressions;
            NodeManager.observeExpressions(node.expressions, parent, this._setText.bind(this, textNode, parent, expressions));
            this._setText(textNode, parent, expressions);
        };
        /**
         * @param {Node} Node The associated node whose value will be set.
         * @param {ui.TemplateControl} control The control whose context will be used to bind
         * the data.
         * @param {Array<expressions.IParsedExpression>} expressions An array of parsed expressions used to build
         * the node value.
         */
        TextManager.prototype._setText = function (node, control, expressions) {
            node.nodeValue = NodeManager.build(expressions, (control || {}));
        };
        return TextManager;
    })(NodeManager);
    processing.TextManager = TextManager;
    /**
     */
    function ITextManagerFactory() {
        return TextManager;
    }
    processing.ITextManagerFactory = ITextManagerFactory;
    register.injectable(__TextManagerFactory, ITextManagerFactory, null, __FACTORY);
    register.injectable(__TextManagerInstance, TextManager, null, __INSTANCE);
    /**
     */
    var CommentManager = (function (_super) {
        __extends(CommentManager, _super);
        function CommentManager() {
            _super.apply(this, arguments);
            /**
             */
            this.type = 'comment';
        }
        /**
         * @param {Node} node The Comment to associate with the new manager.
         * @param {processing.ElementManager} parent The parent
         * ElementManager.
         */
        CommentManager.create = function (node, parent) {
            var manager = new CommentManager();
            manager.initialize({
                nodes: [{
                        node: node
                    }]
            }, parent);
            return manager;
        };
        /**
         * @param {Node} newNode The new Comment node to associate with the cloned
         * manager.
         * @param {processing.ElementManager} parentManager The parent ElementManager
         * for the clone.
         */
        CommentManager.prototype.clone = function (newNode, parentManager) {
            CommentManager.create(newNode, parentManager);
            return 1;
        };
        return CommentManager;
    })(NodeManager);
    processing.CommentManager = CommentManager;
    /**
     */
    function ICommentManagerFactory() {
        return CommentManager;
    }
    processing.ICommentManagerFactory = ICommentManagerFactory;
    register.injectable(__CommentManagerFactory, ICommentManagerFactory, null, __FACTORY);
    register.injectable(__CommentManagerInstance, CommentManager, null, __INSTANCE);
    /**
     */
    var AttributeManager = (function () {
        function AttributeManager() {
            /**
             */
            this._markupRegex = new RegExp("^" + __startSymbol + "[\\S\\s]*?" + __endSymbol + "\\S*\\s*|\\s*\\S*" + __startSymbol + "[\\S\\s]*?" + __endSymbol + "\\S*", 'g');
            /**
             */
            this._lastValues = {};
        }
        /**
         */
        AttributeManager.getInstance = function () {
            var manager = new AttributeManager();
            manager._NodeManager = acquire(__NodeManagerStatic);
            return manager;
        };
        /**
         * @param {HTMLElement} element The element that contains this attribute.
         * @param {processing.INode} node The INode associated with this attribute.
         * @param {ui.TemplateControl} parent The parent control for all the controls associated with
         * the element.
         * @param {Array<Control>} controls The controls associated with the element.
         * @param {boolean} replace? Whether or not the element is replaced.
         */
        AttributeManager.prototype.initialize = function (element, node, parent, controls, replace) {
            this.element = element;
            this.node = node;
            this.parent = parent;
            this._controls = controls;
            this.replace = replace;
            if (node.nodeName !== 'class') {
                this.attributeChanged = this._staticAttributeChanged;
            }
            else {
                this.attributeChanged = this._dynamicAttributeChanged;
            }
        };
        /**
         */
        AttributeManager.prototype._dynamicAttributeChanged = function () {
            var node = this.node, attr = node.node, nodeValue = attr.value, classes = this._NodeManager.build(node.expressions, this.parent).trim().split(/\s/), last = this._lastValues, element = this.element, c, length = classes.length, i;
            if (this._NodeManager.hasMarkup(nodeValue)) {
                attr.value = nodeValue.replace(this._markupRegex, '').trim();
            }
            for (i = 0; i < length; ++i) {
                last[classes[i]] = true;
            }
            classes = Object.keys(last);
            length = classes.length;
            for (i = 0; i < length; ++i) {
                c = classes[i];
                if (last[c]) {
                    addClass(element, c);
                    last[c] = false;
                }
                else {
                    deleteProperty(last, c);
                    removeClass(element, c);
                }
            }
            this._notifyAttributes(node.nodeName, attr.value);
        };
        /**
         */
        AttributeManager.prototype._staticAttributeChanged = function () {
            var controls = this._controls, node = this.node, key = camelCase(node.nodeName), value = this._NodeManager.build(node.expressions, this.parent);
            this._notifyAttributes(key, value);
            if (!this.replace) {
                node.node.value = value;
            }
        };
        /**
         */
        AttributeManager.prototype._notifyAttributes = function (key, value) {
            var controls = this._controls, length = controls.length, attributes, oldValue;
            for (var i = 0; i < length; ++i) {
                attributes = controls[i].attributes;
                oldValue = attributes[key];
                attributes[key] = value;
                attributes._attributeChanged(key, value, oldValue);
            }
        };
        return AttributeManager;
    })();
    processing.AttributeManager = AttributeManager;
})(processing = exports.processing || (exports.processing = {}));
/**
 */
var routing;
(function (routing) {
    /**
     */
    var Navigator = (function () {
        function Navigator() {
            /**
             */
            this.uid = uniqueId(__Plat);
            /**
             */
            this.isRoot = false;
            /**
             */
            this._removeUrlListener = noop;
            /**
             */
            this._ignoreOnce = false;
            /**
             */
            this._backNavigate = false;
        }
        /**
         * @param {routing.Router} router The router that the navigator should use to match/generate routes.
         */
        Navigator.prototype.initialize = function (router) {
            this._router = router;
            if (isObject(router) && router.isRoot && !isObject(Navigator._root)) {
                this.isRoot = true;
                Navigator._root = this;
                this._observeUrl();
            }
        };
        /**
         * @param {any} view The view to which the Navigator should navigate.
         * @param {routing.INavigateOptions} options used to generate the url and perform navigation.
         */
        Navigator.prototype.navigate = function (view, options) {
            var _this = this;
            options = isObject(options) ? options : {};
            var url;
            return this.finishNavigating().then(function () {
                if (options.isUrl) {
                    url = view;
                }
                else {
                    url = _this._generate(view, options.parameters, options.query);
                }
                if (!isString(url)) {
                    var error = new Error('Cannot serialize url from input parameters, check your view reference.');
                    _this._log.error(error);
                }
                return _this._navigate(url, options.replace);
            });
        };
        /**
         */
        Navigator.prototype.finishNavigating = function () {
            var router = Navigator._root._router;
            if (router.navigating) {
                return router.finishNavigating.catch(noop);
            }
            return this._Promise.resolve();
        };
        /**
         */
        Navigator.prototype.goBack = function (options) {
            var _this = this;
            options = isObject(options) ? options : {};
            var length = Number(options.length);
            if (!isNumber(length)) {
                length = 1;
            }
            if (!this.isRoot) {
                return Navigator._root.goBack(options);
            }
            return this.finishNavigating().then(function () {
                _this._backNavigate = true;
                return _this._goBack(length);
            });
        };
        /**
         */
        Navigator.prototype.isBackNavigation = function () {
            if (!this.isRoot) {
                return Navigator._root.isBackNavigation();
            }
            return this._backNavigate;
        };
        /**
         */
        Navigator.prototype.dispose = function () {
            this._removeUrlListener();
            deleteProperty(this, 'router');
        };
        /**
         */
        Navigator.prototype._navigate = function (url, replace) {
            var _this = this;
            if (!this.isRoot) {
                return Navigator._root._navigate(url, replace);
            }
            return new this._Promise(function (resolve, reject) {
                _this._resolveNavigate = resolve;
                _this._rejectNavigate = reject;
                var current = _this._browser.url(), next = _this._browser.url(url, replace);
                if (current === next) {
                    _this._resolveNavigate();
                }
            });
        };
        /**
         */
        Navigator.prototype._goBack = function (length) {
            var _this = this;
            return new this._Promise(function (resolve, reject) {
                _this._resolveNavigate = resolve;
                _this._rejectNavigate = reject;
                _this._browser.back(length);
            });
        };
        /**
         */
        Navigator.prototype._observeUrl = function () {
            var _this = this;
            if (!isObject(this._router)) {
                return;
            }
            var EventManager = this._EventManager, previousUrl, headControl = acquire(__Head), headExists = isObject(headControl) && isFunction(headControl.navigated), onFailedNavigaton = function (e) {
                _this._previousUrl = previousUrl;
                var _history = _this._history, state = _history.state;
                _this._ignoreOnce = true;
                if (isNull(state.previousLocation) || state.previousLocation === previousUrl) {
                    _history.go(-1);
                }
                else {
                    _history.go(1);
                }
                _this._backNavigate = false;
                if (isFunction(_this._rejectNavigate)) {
                    _this._rejectNavigate(e);
                }
                if (!isEmpty(e)) {
                    _this._log.warn(e);
                }
            };
            this._previousUrl = this._browser.url();
            // Protect against accidentally calling this method twice. 
            EventManager.dispose(this.uid);
            EventManager.on(this.uid, __backButton, function () {
                var ev = EventManager.dispatch(__backButtonPressed, _this, EventManager.DIRECT);
                if (ev.defaultPrevented) {
                    return;
                }
                _this.goBack();
            });
            EventManager.on(this.uid, __urlChanged, function (ev, utils) {
                if (_this._ignoreOnce) {
                    _this._ignoreOnce = false;
                    if (isFunction(_this._resolveNavigate)) {
                        _this._backNavigate = false;
                        _this._resolveNavigate();
                    }
                    return;
                }
                previousUrl = _this._previousUrl;
                ev = EventManager.dispatch(__beforeNavigate, _this, EventManager.DIRECT, [utils]);
                if (ev.defaultPrevented) {
                    onFailedNavigaton(new Error('Navigation prevented during ' + __beforeNavigate + ' event'));
                    return;
                }
                _this.finishNavigating()
                    .then(function () {
                    EventManager.dispatch(__navigating, _this, EventManager.DIRECT, [utils]);
                    return _this._router.navigate(utils.pathname, utils.query);
                }).then(function () {
                    _this._previousUrl = utils.pathname;
                    if (isFunction(_this._resolveNavigate)) {
                        _this._backNavigate = false;
                        _this._resolveNavigate();
                    }
                    if (headExists) {
                        headControl.navigated(utils.href);
                    }
                    EventManager.dispatch(__navigated, _this, EventManager.DIRECT, [utils]);
                }, onFailedNavigaton);
            });
        };
        /**
         */
        Navigator.prototype._generate = function (view, parameters, query) {
            if (isNull(this._router)) {
                return;
            }
            if (isEmpty(view)) {
                return view;
            }
            return this._router.generate(view, parameters, query);
        };
        Navigator._inject = {
            _Promise: __Promise,
            _Injector: __InjectorStatic,
            _browserConfig: __BrowserConfig,
            _browser: __Browser,
            _EventManager: __EventManagerStatic,
            _window: __Window,
            _log: __Log,
            _history: __History
        };
        return Navigator;
    })();
    routing.Navigator = Navigator;
    register.injectable(__NavigatorInstance, Navigator, null, __INSTANCE);
    /**
     */
    function History(_window) {
        return _window.history;
    }
    routing.History = History;
    register.injectable(__History, History, [__Window]);
    var specialCharacters = [
        '/', '.', '*', '+', '?', '|',
        '(', ')', '[', ']', '{', '}', '\\'
    ], escapeRegex = new RegExp('(\\' + specialCharacters.join('|\\') + ')', 'g');
    var baseSegment, dynamicSegments = {}, splatSegments = {}, staticSegments = {};
    /**
     */
    var BaseSegment = (function () {
        function BaseSegment() {
            /**
             */
            this.type = __BASE_SEGMENT_TYPE;
            /**
             */
            this.name = '';
            /**
             */
            this.regex = '';
        }
        /**
         * @param {string} route The route to parse.
         * @param {Array<string>} names An array to populate with dynamic/splat segment names
         * @param {routing.ISegmentTypeCount} types An object to use for counting segment types in the route.
         */
        BaseSegment.parse = function (route, names, types) {
            if (!isString(route) || !isArray(names) || !isObject(types)) {
                return [];
            }
            else if (route[0] === '/') {
                route = route.slice(1);
            }
            var segments = route.split('/'), length = segments.length, findSegment = BaseSegment.__findSegment, results = [], segment, name, match, _regex = BaseSegment._regex;
            for (var i = 0; i < length; ++i) {
                segment = segments[i];
                if (segment === '') {
                    if (!isObject(baseSegment)) {
                        baseSegment = acquire(__BaseSegmentInstance);
                    }
                    results.push(baseSegment);
                }
                else if (match = segment.match(_regex.dynamicSegmentsRegex)) {
                    name = match[1];
                    results.push(findSegment(name, __DynamicSegmentInstance, dynamicSegments));
                    names.push(name);
                    types.dynamics++;
                }
                else if (match = segment.match(_regex.splatSegmentRegex)) {
                    name = match[1];
                    results.push(findSegment(name, __SplatSegmentInstance, splatSegments));
                    names.push(name);
                    types.splats++;
                }
                else {
                    results.push(findSegment(segment, __StaticSegmentInstance, staticSegments));
                    types.statics++;
                }
            }
            return results;
        };
        /**
         * @param {string} name The name of the segment to look for.
         * @param {string} token The token used to acquire a new segment if necessary.
         * @param {IObject<routing.BaseSegment>} cache The cache in which to look for/store the segment.
         */
        BaseSegment.__findSegment = function (name, token, cache) {
            var segment = cache[name];
            if (!isObject(segment)) {
                segment = cache[name] = acquire(token);
                segment.initialize(name);
            }
            return segment;
        };
        /**
         * @param {string} name? The name for the new segment.
         */
        BaseSegment.prototype.initialize = function (name) {
            this.name = name;
        };
        /**
         * @param {(previousValue: T, spec: routing.ICharacterSpecification) => T} iterator The iterator to call with each character.
         * @param {T} initialValue? An optional initial value with which to start the accumulation.
         */
        BaseSegment.prototype.reduceCharacters = function (iterator, initialValue) {
            if (isObject(this._specification)) {
                initialValue = iterator(initialValue, this._specification);
            }
            return initialValue;
        };
        /**
         * @param {IObject<string>} parameters? The input parameters for the segment.
         */
        BaseSegment.prototype.generate = function (parameters) {
            return this.name;
        };
        return BaseSegment;
    })();
    routing.BaseSegment = BaseSegment;
    /**
     */
    function IBaseSegmentFactory(_regex) {
        BaseSegment._regex = _regex;
        return BaseSegment;
    }
    routing.IBaseSegmentFactory = IBaseSegmentFactory;
    register.injectable(__BaseSegmentFactory, IBaseSegmentFactory, [__Regex], __FACTORY);
    register.injectable(__BaseSegmentInstance, BaseSegment, null, __INSTANCE);
    /**
     */
    var StaticSegment = (function (_super) {
        __extends(StaticSegment, _super);
        function StaticSegment() {
            _super.apply(this, arguments);
            /**
             */
            this.type = __STATIC_SEGMENT_TYPE;
        }
        /**
         * @param {string} name? The name for the new segment.
         */
        StaticSegment.prototype.initialize = function (name) {
            _super.prototype.initialize.call(this, name);
            this.regex = this.name.replace(escapeRegex, '\\$1');
        };
        /**
         * @param {(previousValue: T, spec: routing.ICharacterSpecification) => T} iterator The iterator to call with each character.
         * @param {T} initialValue? An optional initial value with which to start the accumulation.
         */
        StaticSegment.prototype.reduceCharacters = function (iterator, initialValue) {
            var name = this.name, length = name.length, value = initialValue;
            for (var i = 0; i < length; ++i) {
                value = iterator(value, { validCharacters: name[i] });
            }
            return value;
        };
        return StaticSegment;
    })(BaseSegment);
    routing.StaticSegment = StaticSegment;
    register.injectable(__StaticSegmentInstance, StaticSegment, null, __INSTANCE);
    /**
     */
    var VariableSegment = (function (_super) {
        __extends(VariableSegment, _super);
        function VariableSegment() {
            _super.apply(this, arguments);
            /**
             */
            this.type = __VARIABLE_SEGMENT_TYPE;
        }
        /**
         * @param {IObject<string>} parameters? The input parameters for the segment.
         */
        VariableSegment.prototype.generate = function (parameters) {
            if (isObject(parameters)) {
                return parameters[this.name];
            }
        };
        return VariableSegment;
    })(BaseSegment);
    routing.VariableSegment = VariableSegment;
    register.injectable(__VariableSegmentInstance, VariableSegment, null, __INSTANCE);
    /**
     */
    var SplatSegment = (function (_super) {
        __extends(SplatSegment, _super);
        function SplatSegment() {
            _super.apply(this, arguments);
            /**
             */
            this.type = __SPLAT_SEGMENT_TYPE;
            /**
             */
            this.regex = '(.+)';
            /**
             */
            this._specification = {
                invalidCharacters: '',
                repeat: true
            };
        }
        return SplatSegment;
    })(VariableSegment);
    routing.SplatSegment = SplatSegment;
    register.injectable(__SplatSegmentInstance, SplatSegment, null, __INSTANCE);
    /**
     */
    var DynamicSegment = (function (_super) {
        __extends(DynamicSegment, _super);
        function DynamicSegment() {
            _super.apply(this, arguments);
            /**
             */
            this.type = __DYNAMIC_SEGMENT_TYPE;
            /**
             */
            this.regex = '([^/]+)';
            /**
             */
            this._specification = {
                invalidCharacters: '/',
                repeat: true
            };
        }
        return DynamicSegment;
    })(VariableSegment);
    routing.DynamicSegment = DynamicSegment;
    register.injectable(__DynamicSegmentInstance, DynamicSegment, null, __INSTANCE);
    /**
     */
    var State = (function () {
        /**
         */
        function State() {
            this.initialize();
        }
        /**
         * @param {routing.BaseSegment} segment The segment to compile.
         * @param {routing.State} state The initial state with which to start compilation.
         */
        State.compile = function (segment, state) {
            return segment.reduceCharacters(function (s, char) {
                return s.add(char);
            }, state);
        };
        /**
         * @param {routing.State} state The state with which to link the result.
         * @param {string} path The path to link to the given state.
         */
        State.link = function (state, path) {
            var delegates = state.delegates, regex = state.regex, length = delegates.length, matches = path.match(regex), matchIndex = 1, result = [], names, parameters, j, jLength, delegate;
            for (var i = 0; i < length; ++i) {
                delegate = delegates[i];
                names = delegate.names;
                parameters = {};
                for (j = 0, jLength = names.length; j < jLength; ++j) {
                    parameters[names[j]] = matches[matchIndex++];
                }
                result.push({
                    delegate: delegate.delegate,
                    parameters: parameters,
                    isDynamic: jLength > 0
                });
            }
            return result;
        };
        /**
         * @param {string} char The character used to match next states.
         * @param {Array<routing.State>} states The states with which to match the character.
         */
        State.recognize = function (char, states) {
            var nextStates = [], length = states.length, state;
            for (var i = 0; i < length; ++i) {
                state = states[i];
                nextStates = nextStates.concat(state.match(char));
            }
            return nextStates;
        };
        /**
         * @param {Array<routing.State>} states The states to sort.
         */
        State.sort = function (states) {
            if (!isArray(states)) {
                return states;
            }
            var aTypes, aSplats, aStatics, aDynamics, bTypes, bSplats, bStatics, bDynamics;
            return states.sort(function (a, b) {
                aTypes = a.types;
                bTypes = b.types;
                aSplats = aTypes.splats;
                bSplats = bTypes.splats;
                if (aSplats !== bSplats) {
                    return aSplats - bSplats;
                }
                aStatics = aTypes.statics;
                aDynamics = aTypes.dynamics;
                bStatics = bTypes.statics;
                bDynamics = bTypes.dynamics;
                if (aSplats > 0) {
                    if (aStatics !== bStatics) {
                        return bStatics - aStatics;
                    }
                    if (aDynamics !== bDynamics) {
                        return bDynamics - aDynamics;
                    }
                }
                if (aDynamics !== bDynamics) {
                    return aDynamics - bDynamics;
                }
                if (aStatics !== bStatics) {
                    return bStatics = aStatics;
                }
                return 0;
            });
        };
        /**
         * @param {routing.ICharacterSpecification} specification? The character specification for the state.
         */
        State.prototype.initialize = function (specification) {
            this.specification = specification;
            this.nextStates = [];
        };
        /**
         * @param {routing.ICharacterSpecification} specification? The character specification used to create
         * the next state if necessary.
         */
        State.prototype.add = function (specification) {
            var state = this._find(specification);
            if (isObject(state)) {
                return state;
            }
            state = acquire(State);
            state.initialize(specification);
            this.nextStates.push(state);
            if (specification.repeat) {
                state.nextStates.push(state);
            }
            return state;
        };
        /**
         * @param {string} char The character with which to match next states.
         */
        State.prototype.match = function (char) {
            var matches = [], spec, chars;
            this._someChildren(function (child) {
                spec = child.specification;
                // Check for valid characters first 
                chars = spec.validCharacters;
                if (isString(chars) && chars.indexOf(char) > -1) {
                    matches.push(child);
                    return;
                }
                // Check for no invalid characters 
                chars = spec.invalidCharacters;
                if (isString(chars) && chars.indexOf(char) === -1) {
                    matches.push(child);
                }
            });
            return matches;
        };
        /**
         * @param {routing.ICharacterSpecification} spec The character specification used to find
         * the next state.
         */
        State.prototype._find = function (spec) {
            var validChars = spec.validCharacters, invalidChars = spec.invalidCharacters, s, found;
            this._someChildren(function (child) {
                s = child.specification;
                if (s.validCharacters === validChars &&
                    s.invalidCharacters === invalidChars) {
                    found = child;
                    return true;
                }
            });
            return found;
        };
        State.prototype._someChildren = function (iterator) {
            var nextStates = this.nextStates, length = nextStates.length;
            for (var i = 0; i < length; ++i) {
                if (iterator(nextStates[i]) === true) {
                    return true;
                }
            }
            return false;
        };
        return State;
    })();
    routing.State = State;
    /**
     */
    function IStateStatic() {
        return State;
    }
    routing.IStateStatic = IStateStatic;
    register.injectable(__StateStatic, IStateStatic, null, __STATIC);
    register.injectable(__StateInstance, State, null, __INSTANCE);
    /**
     */
    var RouteRecognizer = (function () {
        function RouteRecognizer() {
            /**
             */
            this._namedRoutes = {};
        }
        /**
         * @param {Array<routing.IRouteDelegate>} routes The routes to register.
         * @param {routing.IRegisterOptions} options? An object containing options for the
         * registered route.
         */
        RouteRecognizer.prototype.register = function (routes, options) {
            if (!isArray(routes)) {
                return;
            }
            var finalState = this._rootState, length = routes.length, regex = ['^'], types = {
                statics: 0,
                dynamics: 0,
                splats: 0
            }, delegates = [], allSegments = [], segments;
            for (var i = 0; i < length; ++i) {
                segments = this._parse(routes[i], delegates, types);
                allSegments = allSegments.concat(segments);
                finalState = this._compile(segments, finalState, regex);
            }
            finalState = this._finalize(finalState, regex);
            finalState.delegates = delegates;
            finalState.regex = new RegExp(regex.join('') + '$');
            finalState.types = types;
            if (isObject(options) && isString(options.name)) {
                this._namedRoutes[this._toLowerCase(options.name)] = {
                    segments: allSegments,
                    delegates: delegates
                };
            }
        };
        /**
         * @param {string} path The path to recognize.
         */
        RouteRecognizer.prototype.recognize = function (path) {
            var isTrailingSlashDropped = false, solutions = [];
            path = this._addLeadingSlash(path);
            isTrailingSlashDropped = this._hasTrailingSlash(path);
            if (isTrailingSlashDropped) {
                path = path.substr(0, path.length - 1);
            }
            solutions = this._filter(this._findStates(path));
            return this._link(solutions[0], path, isTrailingSlashDropped);
        };
        /**
         * @param {string} name The named route with which to generate the route string.
         * @param {IObject<string>} parameters The route parameters, in the case that the
         * named route is dynamic.
         */
        RouteRecognizer.prototype.generate = function (name, parameters) {
            name = this._toLowerCase(name);
            var route = this._namedRoutes[name], output = '', segments, length;
            if (!isObject(route)) {
                return;
            }
            segments = route.segments;
            length = segments.length;
            for (var i = 0; i < length; i++) {
                var segment = segments[i];
                if (segment.type === __BASE_SEGMENT_TYPE) {
                    continue;
                }
                output += '/';
                output += segment.generate(parameters);
            }
            output = this._addLeadingSlash(output);
            return output;
        };
        /**
         * @param {string} name The named route from which to get the delegates.
         */
        RouteRecognizer.prototype.delegatesFor = function (name) {
            name = this._toLowerCase(name);
            var namedRoute = this._namedRoutes[name], delegates;
            if (!isObject(namedRoute)) {
                return [];
            }
            delegates = namedRoute.delegates;
            if (!isArray(delegates)) {
                return [];
            }
            return delegates.slice(0);
        };
        /**
         * @param {string} name The named route to search for.
         */
        RouteRecognizer.prototype.exists = function (name) {
            return isObject(this._namedRoutes[this._toLowerCase(name)]);
        };
        /**
         * @param {string} str The string to convert to lower case.
         */
        RouteRecognizer.prototype._toLowerCase = function (str) {
            if (!isString(str)) {
                return str;
            }
            return str.toLowerCase();
        };
        /**
         * @param {routing.State} state The state to finalize.
         * @param {string} regex The regular expression string built for the compiled routes. Used to recognize
         * routes and associate them with the compiled routes.
         */
        RouteRecognizer.prototype._finalize = function (state, regex) {
            if (state === this._rootState) {
                state = state.add({
                    validCharacters: '/'
                });
                regex.push('/');
            }
            return state;
        };
        /**
         * @param {routing.IRouteDelegate} route The route options to be parsed.
         * @param {Array<routing.IDelegateParameterNames>} delegates The delegates and associated names for mapping parameters.
         * @param {routing.ISegmentTypeCount} types A count of all the segment types in the route.
         */
        RouteRecognizer.prototype._parse = function (route, delegates, types) {
            var names = [];
            delegates.push({
                delegate: route.delegate,
                names: names
            });
            return this._BaseSegmentFactory.parse(route.pattern, names, types);
        };
        /**
         * @param {Array<routing.BaseSegment>} segments The segments to compile.
         * @param {routing.State} state The initial state used to compile.
         * @param {Array<string>} regex A regular expression string to build in order to match the segments.
         */
        RouteRecognizer.prototype._compile = function (segments, state, regex) {
            var length = segments.length, compile = this._State.compile, segment;
            for (var i = 0; i < length; ++i) {
                segment = segments[i];
                if (segment.type === __BASE_SEGMENT_TYPE) {
                    continue;
                }
                state = state.add({ validCharacters: '/' });
                state = compile(segment, state);
                regex.push('/' + segment.regex);
            }
            return state;
        };
        /**
         * @param {string} path The path to which to add the slash.
         */
        RouteRecognizer.prototype._addLeadingSlash = function (path) {
            path = decodeURI(path);
            if (path[0] !== '/') {
                path = '/' + path;
            }
            return path;
        };
        /**
         * @param {string} path The path on which to look for a trailing slash.
         */
        RouteRecognizer.prototype._hasTrailingSlash = function (path) {
            var length = path.length;
            return length > 1 && path[length - 1] === '/';
        };
        /**
         * @param {string} path The path with which to look for compiled states.
         */
        RouteRecognizer.prototype._findStates = function (path) {
            var states = [
                this._rootState
            ], recognize = this._State.recognize, length = path.length;
            for (var i = 0; i < length; ++i) {
                states = recognize(path[i], states);
                if (states.length === 0) {
                    break;
                }
            }
            return states;
        };
        /**
         * @param {Array<routing.State>} states The states to filter.
         */
        RouteRecognizer.prototype._filter = function (states) {
            var length = states.length, solutions = [], state;
            for (var i = 0; i < length; ++i) {
                state = states[i];
                if (isArray(state.delegates)) {
                    solutions.push(state);
                }
            }
            return this._State.sort(solutions);
        };
        /**
         * @param {routing.State} states The state to link.
         * @param {string} path The path to link.
         * @param {boolean} isTrailingSlashDropped Whether or not the trailing slash is dropped from the path.
         */
        RouteRecognizer.prototype._link = function (state, path, isTrailingSlashDropped) {
            if (isObject(state) && isArray(state.delegates)) {
                if (isTrailingSlashDropped && this._isDynamic(state)) {
                    path = path + '/';
                }
                return this._State.link(state, path);
            }
        };
        /**
         * @param {routing.State} states The state used to determine if it is dynamic or not.
         */
        RouteRecognizer.prototype._isDynamic = function (state) {
            return state.regex.source.slice(-5) === '(.+)$';
        };
        RouteRecognizer._inject = {
            _BaseSegmentFactory: __BaseSegmentFactory,
            _State: __StateStatic,
            _rootState: __StateInstance
        };
        return RouteRecognizer;
    })();
    routing.RouteRecognizer = RouteRecognizer;
    register.injectable(__RouteRecognizerInstance, RouteRecognizer, null, __INSTANCE);
    ;
    var __CHILD_ROUTE = '/*childRoute', __CHILD_ROUTE_LENGTH = __CHILD_ROUTE.length;
    /**
     */
    var Router = (function () {
        /**
         */
        function Router() {
            /**
             */
            this.navigating = false;
            /**
             */
            this.children = [];
            /**
             */
            this.isRoot = false;
            /**
             */
            this._paramTransforms = {};
            /**
             */
            this._queryTransforms = {};
            /**
             */
            this._interceptors = {};
            /**
             */
            this._ports = [];
            /**
             */
            this._resolve = this._Promise.resolve.bind(this._Promise);
            /**
             */
            this._reject = this._Promise.reject.bind(this._Promise);
            this.uid = uniqueId(__Plat);
            this.isRoot = isNull(Router.currentRouter());
            Router.currentRouter(this);
            this.initialize();
        }
        /**
         * @param {routing.Router} router Will set the current router.
         */
        Router.currentRouter = function (router) {
            if (!isNull(router)) {
                Router.__currentRouter = router;
            }
            return Router.__currentRouter;
        };
        /**
         * @param {routing.Router} parent? The parent router to link.
         */
        Router.prototype.initialize = function (parent) {
            this.parent = parent;
        };
        /**
         * @param {routing.Router} child A child router.
         */
        Router.prototype.addChild = function (child) {
            if (isNull(child) || this.children.indexOf(child) > -1) {
                return child;
            }
            child.initialize(this);
            this.children.push(child);
            return child;
        };
        /**
         * @param {routing.Router} child The child router to remove.
         */
        Router.prototype.removeChild = function (child) {
            var children = this.children, index = children.indexOf(child);
            if (index < 0) {
                return;
            }
            children.splice(index, 1);
            var current = Router.currentRouter();
            if (current === child) {
                Router.currentRouter(this);
            }
        };
        /**
         * @param {routing.ISupportRouteNavigation} port An object that supports all the navigation events.
         */
        Router.prototype.register = function (port) {
            var _this = this;
            var ports = this._ports;
            if (isNull(port) || ports.indexOf(port) > -1) {
                return this._resolve();
            }
            ports.push(port);
            if (!isObject(this.currentRouteInfo)) {
                return this._resolve();
            }
            this.navigating = true;
            return this._resolve(this.finishNavigating)
                .catch(noop)
                .then(function () {
                var routeInfo = _clone(_this.currentRouteInfo, true);
                return _this.finishNavigating = _this._canNavigateTo(routeInfo)
                    .then(function (canNavigateTo) {
                    if (!canNavigateTo) {
                        return;
                    }
                    _this.currentRouteInfo = undefined;
                    return _this._performNavigation(routeInfo);
                }).then(function () {
                    _this.navigating = false;
                    _this.currentRouteInfo = routeInfo;
                }, function () {
                    _this.navigating = false;
                });
            });
        };
        /**
         * @param {routing.ISupportRouteNavigation} port An object that supports all the navigation events.
         */
        Router.prototype.unregister = function (port) {
            var ports = this._ports, index = ports.indexOf(port);
            if (index < 0) {
                return;
            }
            ports.splice(index, 1);
            if (ports.length === 0 && !isNull(this.parent)) {
                this.parent.removeChild(this);
            }
        };
        Router.prototype.configure = function (routes) {
            var _this = this;
            if (isArray(routes)) {
                forEach(function (route) {
                    _this._configureRoute(route);
                }, routes);
            }
            else {
                this._configureRoute(routes);
            }
            return this._forceNavigate();
        };
        /**
         * @param {(info: IUnknownRouteInfo) => any} handler A method called to determine what view is associated with a route.
         */
        Router.prototype.unknown = function (handler) {
            this._unknownHandler = handler;
            return this;
        };
        Router.prototype.param = function (handler, parameter, view) {
            return this._addHandler(handler, parameter, view, this._paramTransforms);
        };
        Router.prototype.queryParam = function (handler, parameter, view) {
            return this._addHandler(handler, parameter, view, this._queryTransforms);
        };
        Router.prototype.intercept = function (interceptor, view) {
            if (isUndefined(view)) {
                view = '*';
            }
            var alias = view;
            if (view !== '*') {
                view = this._Injector.convertDependency(view);
            }
            if (view === __NOOP_INJECTOR) {
                view = alias;
            }
            var interceptors = this._interceptors[view];
            if (!isArray(interceptors)) {
                interceptors = this._interceptors[view] = [];
            }
            interceptors.push(interceptor);
            return this;
        };
        /**
         * @param {string} url The new route to match.
         * @param {IObject<any>} query The query parameters for the route.
         * @param {boolean} force Whether or not to force navigation, even if the same url has already been matched.
         */
        Router.prototype.navigate = function (url, query, force, poll) {
            var _this = this;
            if (poll === false) {
                poll = !isObject(this.currentRouteInfo);
            }
            if (!isObject(query)) {
                query = {};
            }
            var resolve = this._resolve, queryString = serializeQuery(query);
            if (url === '/') {
                url = '';
            }
            force = force === true;
            if (!isString(url) || this.navigating || (!force && url === this._previousUrl && queryString === this._previousQuery)) {
                if (this.navigating) {
                    return this.finishNavigating.then(function () {
                        return _this.navigate(url, query, force);
                    });
                }
                return resolve();
            }
            var recognizer = this._recognizer, result = recognizer.recognize(url), routeInfo, emptyResult = isEmpty(result), pattern, segment;
            if (!emptyResult) {
                routeInfo = result[0];
                routeInfo.query = query;
            }
            var sameRoute = this._isSameRoute(routeInfo);
            if (emptyResult || sameRoute) {
                var childUrl = url;
                if (sameRoute) {
                    segment = recognizer.generate(routeInfo.delegate.alias || routeInfo.delegate.view, routeInfo.parameters);
                    childUrl = childUrl.replace(segment, '');
                }
                if (childUrl === '/' || childUrl === '') {
                    childUrl = '';
                    some(function (child) {
                        result = child._recognizer.recognize(childUrl);
                        return !isEmpty(result);
                    }, this.children);
                }
                else {
                    result = this._childRecognizer.recognize(childUrl);
                }
                if (isEmpty(result)) {
                    if (!emptyResult) {
                        result = recognizer.recognize(url);
                        routeInfo = result[0];
                        routeInfo.query = query;
                        pattern = routeInfo.delegate.pattern;
                    }
                    else {
                        // route has not been matched 
                        this._previousUrl = childUrl;
                        this._previousQuery = queryString;
                        this.currentRouteInfo = routeInfo;
                        if (isFunction(this._unknownHandler)) {
                            var unknownRouteConfig = {
                                segment: url,
                                view: undefined
                            };
                            return resolve(this._unknownHandler(unknownRouteConfig)).then(function () {
                                var view = unknownRouteConfig.view;
                                if (isUndefined(view)) {
                                    return;
                                }
                                return _this.configure({
                                    pattern: url,
                                    view: view
                                });
                            });
                        }
                        return resolve();
                    }
                }
                else {
                    routeInfo = result[0];
                    routeInfo.query = query;
                    pattern = routeInfo.delegate.pattern;
                    pattern = pattern.slice(0, pattern.length - __CHILD_ROUTE_LENGTH);
                    if (!emptyResult || this._isSameRoute(routeInfo)) {
                        // the pattern for this router is the same as the last pattern so 
                        // only navigate child routers. 
                        this.navigating = true;
                        return this.finishNavigating = this._navigateChildren(routeInfo)
                            .then(function () {
                            _this._previousUrl = url;
                            _this._previousQuery = queryString;
                            _this.navigating = false;
                        }, function (e) {
                            _this.navigating = false;
                            throw e;
                        });
                    }
                }
            }
            else {
                pattern = routeInfo.delegate.pattern;
            }
            segment = recognizer.generate(routeInfo.delegate.alias || routeInfo.delegate.view, routeInfo.parameters);
            var previousSegment = this._previousSegment;
            this._previousSegment = segment;
            this.navigating = true;
            var routeInfoCopy = this._nextRouteInfo = _clone(routeInfo, true);
            return this.finishNavigating = this._canNavigate(routeInfo, poll)
                .then(function (canNavigate) {
                if (!canNavigate) {
                    _this.navigating = false;
                    throw new Error('Not cleared to navigate');
                }
                _this._previousUrl = url;
                _this._previousQuery = queryString;
                return _this._performNavigation(routeInfo);
            }).then(function () {
                _this._previousPattern = pattern;
                _this._previousSegment = segment;
                _this.currentRouteInfo = routeInfoCopy;
                _this.navigating = false;
            }, function (e) {
                _this._previousSegment = previousSegment;
                _this.navigating = false;
                throw e;
            });
        };
        Router.prototype.generate = function (name, parameters, query) {
            var alias = name;
            name = this._Injector.convertDependency(name);
            if (name === __NOOP_INJECTOR) {
                name = alias;
            }
            var router = this, prefix = '';
            while (!(isNull(router) || router._recognizer.exists(name))) {
                router = router.parent;
            }
            if (isNull(router)) {
                throw new Error('Route for ' + name + ' does not exist.');
            }
            var path = router._recognizer.generate(name, parameters), previous;
            while (!isNull(router = router.parent)) {
                previous = router._previousSegment;
                previous = (!isNull(previous) && previous !== '/') ? previous : '';
                prefix = previous + prefix;
            }
            return prefix + path + serializeQuery(query);
        };
        /**
         * @param {routing.IRouteMapping} route The mapping used to configure the route.
         */
        Router.prototype._configureRoute = function (route) {
            var view = this._Injector.convertDependency(route.view), alias = route.alias || view;
            if (view === __NOOP_INJECTOR) {
                return;
            }
            route.view = view;
            route.alias = alias || view;
            var routeDelegate = {
                pattern: route.pattern,
                delegate: route
            }, childPattern = route.pattern + __CHILD_ROUTE, childDelegate = {
                pattern: childPattern,
                delegate: {
                    pattern: childPattern,
                    view: view,
                    alias: alias
                }
            };
            this._recognizer.register([routeDelegate], { name: alias });
            this._childRecognizer.register([childDelegate]);
        };
        /**
         * @param {(value: any, query: any) => any} handler A method that will manipulate the registered parameter.
         * @param {string} parameter The parameter that the registered handler will modify.
         * @param {any} view The view used to match the route. If undefined, all routes will be matched.
         * @param {IObject<routing.IRouteTransforms>} handlers The object to which to add the handler.
         */
        Router.prototype._addHandler = function (handler, parameter, view, handlers) {
            if (isUndefined(view)) {
                view = '*';
            }
            var alias = view;
            if (view !== '*') {
                view = this._Injector.convertDependency(view);
            }
            if (view === __NOOP_INJECTOR) {
                view = alias;
            }
            if (isEmpty(view) || isEmpty(parameter)) {
                return this;
            }
            var viewHandlers = handlers[view];
            if (!isObject(viewHandlers)) {
                viewHandlers = handlers[view] = {};
            }
            var transforms = viewHandlers[parameter];
            if (!isArray(transforms)) {
                transforms = viewHandlers[parameter] = [];
            }
            transforms.push(handler);
            return this;
        };
        /**
         */
        Router.prototype._forceNavigate = function () {
            var _this = this;
            var resolve = this._resolve, query;
            if (this.navigating) {
                return this.finishNavigating.then(function () {
                    return _this._forceNavigate();
                });
            }
            if (this.isRoot && isEmpty(this._previousUrl)) {
                var utils = this._browser.urlUtils();
                this._previousUrl = utils.pathname;
                query = utils.query;
            }
            if (!isEmpty(this._previousQuery)) {
                query = deserializeQuery(this._previousQuery);
            }
            if (!isEmpty(this._previousUrl)) {
                return this.navigate(this._previousUrl, query, true);
            }
            return resolve();
        };
        /**
         * @param {routing.IRouteInfo} info The information necessary to build the childRoute for the child routers.
         */
        Router.prototype._navigateChildren = function (info, poll) {
            if (poll === void 0) { poll = true; }
            var childRoute = this._getChildRoute(info);
            if (isNull(childRoute)) {
                return this._resolve();
            }
            return mapAsync(function (child) {
                return child.navigate(childRoute, info.query, undefined, poll);
            }, this.children).then(noop);
        };
        /**
         * @param {routing.IRouteInfo} info The information necessary to get the child route.
         */
        Router.prototype._getChildRoute = function (info) {
            if (isNull(info)) {
                return;
            }
            var childRoute = info.parameters.childRoute;
            if (!isString(childRoute)) {
                childRoute = '';
            }
            return '/' + childRoute;
        };
        /**
         * @param {routing.IRouteInfo} info The route information.
         */
        Router.prototype._performNavigation = function (info) {
            var _this = this;
            var sameRoute = this._isSameRoute(this._nextRouteInfo);
            return this._performNavigateFrom(sameRoute).then(function () {
                if (sameRoute) {
                    return;
                }
                return mapAsync(function (port) {
                    return port.navigateTo(info);
                }, _this._ports);
            }).then(function () {
                return _this._navigateChildren(info, false);
            });
        };
        /**
         * @param {boolean} ignorePorts? Ignores the ports if necessary.
         */
        Router.prototype._performNavigateFrom = function (ignorePorts) {
            var _this = this;
            return mapAsync(function (child) {
                return child._performNavigateFrom();
            }, this.children)
                .then(function () {
                if (ignorePorts) {
                    return;
                }
                return mapAsync(function (port) {
                    return port.navigateFrom();
                }, _this._ports);
            }).then(noop);
        };
        /**
         * @param {routing.IRouteInfo} info The route information.
         */
        Router.prototype._canNavigate = function (info, poll) {
            var _this = this;
            if (poll === void 0) { poll = true; }
            var sameRoute = this._isSameRoute(this._nextRouteInfo);
            if (!poll) {
                return this._callAllHandlers(info.delegate.alias, info.parameters, info.query).then(function () {
                    return _this._callInterceptors(info);
                }).then(function () {
                    return true;
                }, function () {
                    return true;
                });
            }
            return this._canNavigateFrom(sameRoute)
                .then(function (canNavigateFrom) {
                return canNavigateFrom && _this._canNavigateTo(info, sameRoute);
            });
        };
        /**
         * @param {boolean} ignorePorts Ignores the ports if necessary.
         */
        Router.prototype._canNavigateFrom = function (ignorePorts) {
            var _this = this;
            return this._Promise.all(this.children.reduce(function (promises, child) {
                return promises.concat(child._canNavigateFrom());
            }, []))
                .then(booleanReduce)
                .then(function (canNavigateFrom) {
                if (!canNavigateFrom || ignorePorts) {
                    return [canNavigateFrom];
                }
                return mapAsync(function (port) {
                    return port.canNavigateFrom();
                }, _this._ports);
            }).then(booleanReduce);
        };
        /**
         * @param {routing.IRouteInfo} info The route information.
         * @param {boolean} ignorePorts Ignores the ports if necessary.
         */
        Router.prototype._canNavigateTo = function (info, ignorePorts) {
            var _this = this;
            if (isEmpty(this._ports)) {
                return this._resolve(true);
            }
            return this._callAllHandlers(info.delegate.alias, info.parameters, info.query).then(function () {
                return _this._callInterceptors(info);
            }).then(function (canNavigateTo) {
                if (canNavigateTo === false || ignorePorts) {
                    return [canNavigateTo];
                }
                return mapAsync(function (port) {
                    return port.canNavigateTo(info);
                }, _this._ports);
            }).then(booleanReduce);
        };
        /**
         * @param {string} view The associated view for the route.
         * @param {any} parameters The route parameters.
         * @param {any} query? The query parameters.
         */
        Router.prototype._callAllHandlers = function (view, parameters, query) {
            var _this = this;
            return this._callHandlers(this._queryTransforms['*'], query)
                .then(function () { return _this._callHandlers(_this._queryTransforms[view], query); })
                .then(function () { return _this._callHandlers(_this._paramTransforms['*'], parameters, query); })
                .then(function () { return _this._callHandlers(_this._paramTransforms[view], parameters, query); })
                .then(noop);
        };
        /**
         * @param {routing.IRouteTransforms} allHandlers The transform functions
         * @param {any} obj The parameters.
         * @param {any} query? The query parameters.
         */
        Router.prototype._callHandlers = function (allHandlers, obj, query) {
            var resolve = this._resolve;
            if (!isObject(obj)) {
                obj = {};
            }
            return mapAsync(function (handlers, key) {
                return mapAsyncInOrder(function (handler) {
                    return resolve(handler(obj[key], obj, query));
                }, handlers);
            }, allHandlers)
                .then(noop);
        };
        /**
         * @param {routing.IRouteInfo} info The route information.
         */
        Router.prototype._callInterceptors = function (info) {
            var _this = this;
            var resolve = this._resolve;
            return mapAsyncInOrder(function (handler) {
                return resolve(handler(info));
            }, this._interceptors['*'])
                .then(booleanReduce)
                .then(function (canNavigate) {
                if (!canNavigate) {
                    return [canNavigate];
                }
                return mapAsync(function (handler) {
                    return resolve(handler(info));
                }, _this._interceptors[info.delegate.alias]);
            })
                .then(booleanReduce);
        };
        /**
         * @param {routing.IRouteInfo} info The route information.
         */
        Router.prototype._isSameRoute = function (info) {
            var currentRouteInfo = _clone(this.currentRouteInfo, true);
            info = _clone(info, true);
            this._sanitizeRouteInfo(currentRouteInfo);
            this._sanitizeRouteInfo(info);
            if (!(isObject(currentRouteInfo) && isObject(info))) {
                return false;
            }
            var currentDelegate = currentRouteInfo.delegate, delegate = info.delegate, currentParameters = serializeQuery(currentRouteInfo.parameters), parameters = serializeQuery(info.parameters), currentQuery = serializeQuery(currentRouteInfo.query), query = serializeQuery(info.query);
            return currentDelegate.view === delegate.view &&
                currentDelegate.alias === delegate.alias &&
                currentDelegate.pattern === delegate.pattern &&
                currentParameters === parameters &&
                currentQuery === query;
        };
        /**
         * @param {routing.IRouteInfo} info The route information.
         */
        Router.prototype._sanitizeRouteInfo = function (info) {
            if (isObject(info)) {
                if (info.parameters.hasOwnProperty('childRoute')) {
                    var delegate = info.delegate, pattern = delegate.pattern;
                    delegate.pattern = pattern.slice(0, pattern.length - __CHILD_ROUTE_LENGTH);
                    deleteProperty(info.parameters, 'childRoute');
                }
            }
        };
        /**
         */
        Router.prototype._clearInfo = function () {
            this._previousSegment = undefined;
            this._previousPattern = undefined;
            this._previousUrl = undefined;
            this._previousQuery = undefined;
            this.currentRouteInfo = undefined;
            this.navigating = false;
            forEach(function (child) {
                child._clearInfo();
            }, this.children);
        };
        Router._inject = {
            _Promise: __Promise,
            _Injector: __InjectorStatic,
            _EventManager: __EventManagerStatic,
            _browser: __Browser,
            _browserConfig: __BrowserConfig,
            _recognizer: __RouteRecognizerInstance,
            _childRecognizer: __RouteRecognizerInstance
        };
        return Router;
    })();
    routing.Router = Router;
    register.injectable(__Router, Router, null, __INSTANCE);
    /**
     */
    function IRouterStatic() {
        return Router;
    }
    routing.IRouterStatic = IRouterStatic;
    register.injectable(__RouterStatic, IRouterStatic);
})(routing = exports.routing || (exports.routing = {}));
/**
 */
var controls;
(function (controls) {
    /**
     */
    var Name = (function (_super) {
        __extends(Name, _super);
        function Name() {
            _super.apply(this, arguments);
        }
        /**
         */
        Name.prototype.initialize = function () {
            var attr = camelCase(this.type), name = this.attributes[attr];
            if (isEmpty(name) || this._isPrecompiled()) {
                return;
            }
            this._label = name;
            this._define(name);
        };
        /**
         */
        Name.prototype.dispose = function () {
            var name = this._label, control = this.parent;
            while (!isUndefined(name) && isObject(control)) {
                if (isObject(control[name]) &&
                    isNode(control[name].element) &&
                    control[name].element === this.element) {
                    deleteProperty(control, name);
                }
                control = control.parent;
            }
        };
        /**
         * @param {string} name The name to define on all the ancestor controls.
         */
        Name.prototype._define = function (name) {
            var templateControl = this.templateControl;
            if (!isNull(templateControl)) {
                templateControl.name = name;
            }
            var control = this.parent, namedElement = {
                element: this.element,
                control: templateControl
            };
            while (isObject(control)) {
                var obj = control[name];
                if (!isObject(obj)) {
                    control[name] = namedElement;
                }
                control = control.parent;
            }
        };
        /**
         * @param {string} name The name to define on all the ancestor controls.
         */
        Name.prototype._isPrecompiled = function () {
            var control = this.parent;
            while (!isNull(control)) {
                if (control.type.indexOf(__COMPILED) !== -1) {
                    return true;
                }
                control = control.parent;
            }
            return false;
        };
        return Name;
    })(AttributeControl);
    controls.Name = Name;
    register.control(__Name, Name);
    /**
     */
    var SimpleEventControl = (function (_super) {
        __extends(SimpleEventControl, _super);
        function SimpleEventControl() {
            _super.apply(this, arguments);
            /**
             */
            this._expression = [];
            /**
             */
            this._aliases = [];
        }
        /**
         */
        SimpleEventControl.prototype.loaded = function () {
            if (isNull(this.element)) {
                return;
            }
            this.attribute = camelCase(this.type);
            this._setListener();
        };
        /**
         */
        SimpleEventControl.prototype._setListener = function () {
            var fn = this.attributes[this.attribute];
            if (isEmpty(this.event) || isEmpty(fn)) {
                return;
            }
            this._parseArgs(fn);
            this._addEventListeners();
        };
        /**
         */
        SimpleEventControl.prototype._addEventListeners = function () {
            this.addEventListener(this.element, this.event, this._onEvent, false);
        };
        /**
         */
        SimpleEventControl.prototype._buildExpression = function () {
            var expression = this._expression.slice(0), _parser = this._parser, parent = this.parent, listenerStr = expression.shift(), listener, context, fn, aliases, argContext;
            if (!isNull(parent)) {
                aliases = parent.getResources(this._aliases);
                argContext = parent.context;
            }
            if (listenerStr[0] !== '@') {
                listener = this.findProperty(listenerStr);
                if (isNull(listener)) {
                    this._log.warn('Could not find property ' + listenerStr + ' on any parent control.');
                    return {
                        fn: noop,
                        context: {},
                        args: []
                    };
                }
                var parsedExpression = listener.expresssion, identifiers = parsedExpression.identifiers;
                if (identifiers.length > 1) {
                    this._log.warn('Cannot have more than one identifier in a ' + this.type +
                        '\'s expression.');
                    return {
                        fn: noop,
                        context: {},
                        args: []
                    };
                }
                var identifier = identifiers[0], split = identifier.split('.');
                // pop key 
                split.pop();
                context = split.length === 0 ? listener.control : _parser.parse(split.join('.')).evaluate(listener.control);
                fn = listener.value;
            }
            else {
                fn = isNull(aliases) ? noop : (aliases[listenerStr] || noop);
                context = undefined;
            }
            var length = expression.length, args = [];
            for (var i = 0; i < length; ++i) {
                args.push(_parser.parse(expression[i]).evaluate(argContext, aliases));
            }
            return {
                fn: fn,
                context: context,
                args: args
            };
        };
        /**
         * @param {Event} ev The event object.
         */
        SimpleEventControl.prototype._onEvent = function (ev) {
            var expression = this._buildExpression(), fn = expression.fn;
            if (!isFunction(fn)) {
                this._log.warn('Cannot find registered event method ' +
                    this._expression[0] + ' for control: ' + this.type);
                return;
            }
            fn.apply(expression.context, expression.args.concat(ev));
        };
        /**
         * @param {Array<string>} args The array of arguments as strings.
         */
        SimpleEventControl.prototype._findAliases = function (args) {
            var length = args.length, arg, hash = {}, aliases = [], parsedAliases = [], _parser = this._parser;
            while (length-- > 0) {
                arg = args[length].trim();
                parsedAliases = parsedAliases.concat(_parser.parse(arg).aliases);
            }
            while (parsedAliases.length > 0) {
                arg = parsedAliases.pop();
                if (!hash[arg]) {
                    aliases.push(arg);
                    hash[arg] = true;
                }
            }
            return aliases;
        };
        /**
         * @param {string} expression The expression to parse.
         */
        SimpleEventControl.prototype._parseArgs = function (expression) {
            if (isEmpty(expression)) {
                return;
            }
            var exec = this._regex.argumentRegex.exec(expression);
            if (!isNull(exec)) {
                this._expression = [expression.slice(0, exec.index)]
                    .concat((exec[1] !== '') ? exec[1].split(',') : []);
            }
            else {
                this._expression.push(expression);
            }
            this._aliases = this._findAliases(this._expression);
        };
        SimpleEventControl._inject = {
            _parser: __Parser,
            _regex: __Regex
        };
        return SimpleEventControl;
    })(AttributeControl);
    controls.SimpleEventControl = SimpleEventControl;
    /**
     */
    var Tap = (function (_super) {
        __extends(Tap, _super);
        function Tap() {
            _super.apply(this, arguments);
            /**
             */
            this.event = __tap;
        }
        return Tap;
    })(SimpleEventControl);
    controls.Tap = Tap;
    /**
     */
    var Blur = (function (_super) {
        __extends(Blur, _super);
        function Blur() {
            _super.apply(this, arguments);
            /**
             */
            this.event = 'blur';
        }
        return Blur;
    })(SimpleEventControl);
    controls.Blur = Blur;
    /**
     */
    var Change = (function (_super) {
        __extends(Change, _super);
        function Change() {
            _super.apply(this, arguments);
            /**
             */
            this.event = 'change';
        }
        return Change;
    })(SimpleEventControl);
    controls.Change = Change;
    /**
     */
    var Copy = (function (_super) {
        __extends(Copy, _super);
        function Copy() {
            _super.apply(this, arguments);
            /**
             */
            this.event = 'copy';
        }
        return Copy;
    })(SimpleEventControl);
    controls.Copy = Copy;
    /**
     */
    var Cut = (function (_super) {
        __extends(Cut, _super);
        function Cut() {
            _super.apply(this, arguments);
            /**
             */
            this.event = 'cut';
        }
        return Cut;
    })(SimpleEventControl);
    controls.Cut = Cut;
    /**
     */
    var Paste = (function (_super) {
        __extends(Paste, _super);
        function Paste() {
            _super.apply(this, arguments);
            /**
             */
            this.event = 'paste';
        }
        return Paste;
    })(SimpleEventControl);
    controls.Paste = Paste;
    /**
     */
    var DblTap = (function (_super) {
        __extends(DblTap, _super);
        function DblTap() {
            _super.apply(this, arguments);
            /**
             */
            this.event = __dbltap;
        }
        return DblTap;
    })(SimpleEventControl);
    controls.DblTap = DblTap;
    /**
     */
    var Focus = (function (_super) {
        __extends(Focus, _super);
        function Focus() {
            _super.apply(this, arguments);
            /**
             */
            this.event = 'focus';
        }
        return Focus;
    })(SimpleEventControl);
    controls.Focus = Focus;
    /**
     */
    var TouchStart = (function (_super) {
        __extends(TouchStart, _super);
        function TouchStart() {
            _super.apply(this, arguments);
            /**
             */
            this.event = __touchstart;
        }
        return TouchStart;
    })(SimpleEventControl);
    controls.TouchStart = TouchStart;
    /**
     */
    var TouchEnd = (function (_super) {
        __extends(TouchEnd, _super);
        function TouchEnd() {
            _super.apply(this, arguments);
            /**
             */
            this.event = __touchend;
        }
        return TouchEnd;
    })(SimpleEventControl);
    controls.TouchEnd = TouchEnd;
    /**
     */
    var TouchMove = (function (_super) {
        __extends(TouchMove, _super);
        function TouchMove() {
            _super.apply(this, arguments);
            /**
             */
            this.event = __touchmove;
        }
        return TouchMove;
    })(SimpleEventControl);
    controls.TouchMove = TouchMove;
    /**
     */
    var TouchCancel = (function (_super) {
        __extends(TouchCancel, _super);
        function TouchCancel() {
            _super.apply(this, arguments);
            /**
             */
            this.event = __touchcancel;
        }
        return TouchCancel;
    })(SimpleEventControl);
    controls.TouchCancel = TouchCancel;
    /**
     */
    var Hold = (function (_super) {
        __extends(Hold, _super);
        function Hold() {
            _super.apply(this, arguments);
            /**
             */
            this.event = __hold;
        }
        return Hold;
    })(SimpleEventControl);
    controls.Hold = Hold;
    /**
     */
    var Release = (function (_super) {
        __extends(Release, _super);
        function Release() {
            _super.apply(this, arguments);
            /**
             */
            this.event = __release;
        }
        return Release;
    })(SimpleEventControl);
    controls.Release = Release;
    /**
     */
    var Swipe = (function (_super) {
        __extends(Swipe, _super);
        function Swipe() {
            _super.apply(this, arguments);
            /**
             */
            this.event = __swipe;
        }
        return Swipe;
    })(SimpleEventControl);
    controls.Swipe = Swipe;
    /**
     */
    var SwipeLeft = (function (_super) {
        __extends(SwipeLeft, _super);
        function SwipeLeft() {
            _super.apply(this, arguments);
            /**
             */
            this.event = __swipeleft;
        }
        return SwipeLeft;
    })(SimpleEventControl);
    controls.SwipeLeft = SwipeLeft;
    /**
     */
    var SwipeRight = (function (_super) {
        __extends(SwipeRight, _super);
        function SwipeRight() {
            _super.apply(this, arguments);
            /**
             */
            this.event = __swiperight;
        }
        return SwipeRight;
    })(SimpleEventControl);
    controls.SwipeRight = SwipeRight;
    /**
     */
    var SwipeUp = (function (_super) {
        __extends(SwipeUp, _super);
        function SwipeUp() {
            _super.apply(this, arguments);
            /**
             */
            this.event = __swipeup;
        }
        return SwipeUp;
    })(SimpleEventControl);
    controls.SwipeUp = SwipeUp;
    /**
     */
    var SwipeDown = (function (_super) {
        __extends(SwipeDown, _super);
        function SwipeDown() {
            _super.apply(this, arguments);
            /**
             */
            this.event = __swipedown;
        }
        return SwipeDown;
    })(SimpleEventControl);
    controls.SwipeDown = SwipeDown;
    /**
     */
    var Track = (function (_super) {
        __extends(Track, _super);
        function Track() {
            _super.apply(this, arguments);
            /**
             */
            this.event = __track;
        }
        return Track;
    })(SimpleEventControl);
    controls.Track = Track;
    /**
     */
    var TrackLeft = (function (_super) {
        __extends(TrackLeft, _super);
        function TrackLeft() {
            _super.apply(this, arguments);
            /**
             */
            this.event = __trackleft;
        }
        return TrackLeft;
    })(SimpleEventControl);
    controls.TrackLeft = TrackLeft;
    /**
     */
    var TrackRight = (function (_super) {
        __extends(TrackRight, _super);
        function TrackRight() {
            _super.apply(this, arguments);
            /**
             */
            this.event = __trackright;
        }
        return TrackRight;
    })(SimpleEventControl);
    controls.TrackRight = TrackRight;
    /**
     */
    var TrackUp = (function (_super) {
        __extends(TrackUp, _super);
        function TrackUp() {
            _super.apply(this, arguments);
            /**
             */
            this.event = __trackup;
        }
        return TrackUp;
    })(SimpleEventControl);
    controls.TrackUp = TrackUp;
    /**
     */
    var TrackDown = (function (_super) {
        __extends(TrackDown, _super);
        function TrackDown() {
            _super.apply(this, arguments);
            /**
             */
            this.event = __trackdown;
        }
        return TrackDown;
    })(SimpleEventControl);
    controls.TrackDown = TrackDown;
    /**
     */
    var TrackEnd = (function (_super) {
        __extends(TrackEnd, _super);
        function TrackEnd() {
            _super.apply(this, arguments);
            /**
             */
            this.event = __trackend;
        }
        return TrackEnd;
    })(SimpleEventControl);
    controls.TrackEnd = TrackEnd;
    /**
     */
    var Submit = (function (_super) {
        __extends(Submit, _super);
        function Submit() {
            _super.apply(this, arguments);
            /**
             */
            this.event = 'submit';
        }
        /**
         * @param {Event} ev The event object.
         */
        Submit.prototype._onEvent = function (ev) {
            if (!this.element.hasAttribute('action')) {
                ev.preventDefault();
            }
            _super.prototype._onEvent.call(this, ev);
        };
        return Submit;
    })(SimpleEventControl);
    controls.Submit = Submit;
    /**
     */
    var React = (function (_super) {
        __extends(React, _super);
        function React() {
            _super.apply(this, arguments);
            /**
             */
            this.event = 'input';
        }
        /**
         */
        React.prototype._addEventListeners = function () {
            var _this = this;
            var element = this.element, _compat = this._compat, composing = false, inputFired = false, input = 'input', timeout, eventListener = function (ev) {
                if (composing) {
                    return;
                }
                _this._onEvent(ev);
            }, postponedEventListener = function (ev) {
                if (isFunction(timeout)) {
                    return;
                }
                timeout = postpone(function () {
                    eventListener(ev);
                    timeout = null;
                });
            };
            if (isUndefined(_compat.ANDROID)) {
                this.addEventListener(element, 'compositionstart', function () { composing = true; }, false);
                this.addEventListener(element, 'compositionend', function (ev) {
                    composing = false;
                    eventListener(ev);
                }, false);
            }
            this.addEventListener(element, input, function (ev) {
                inputFired = true;
                eventListener(ev);
            }, false);
            this.addEventListener(element, 'change', function (ev) {
                if (inputFired) {
                    inputFired = false;
                    return;
                }
                eventListener(ev);
            }, false);
            if (_compat.hasEvent(input)) {
                return;
            }
            this.addEventListener(element, 'keydown', function (ev) {
                var key = ev.keyCode, codes = controls.KeyCodes;
                if (key === codes.lwk ||
                    key === codes.rwk ||
                    (key >= codes.shift && key <= codes.escape) ||
                    (key > codes.space && key <= codes.down)) {
                    return;
                }
                postponedEventListener(ev);
            }, false);
            this.addEventListener(element, 'cut', postponedEventListener, false);
            this.addEventListener(element, 'paste', postponedEventListener, false);
        };
        React._inject = {
            _compat: __Compat
        };
        return React;
    })(SimpleEventControl);
    controls.React = React;
    register.control(__Tap, Tap);
    register.control(__Blur, Blur);
    register.control(__Change, Change);
    register.control(__Copy, Copy);
    register.control(__Cut, Cut);
    register.control(__Paste, Paste);
    register.control(__DblTap, DblTap);
    register.control(__Focus, Focus);
    register.control(__Submit, Submit);
    register.control(__TouchStart, TouchStart);
    register.control(__TouchEnd, TouchEnd);
    register.control(__TouchMove, TouchMove);
    register.control(__TouchCancel, TouchCancel);
    register.control(__Hold, Hold);
    register.control(__Release, Release);
    register.control(__Swipe, Swipe);
    register.control(__SwipeLeft, SwipeLeft);
    register.control(__SwipeRight, SwipeRight);
    register.control(__SwipeUp, SwipeUp);
    register.control(__SwipeDown, SwipeDown);
    register.control(__Track, Track);
    register.control(__TrackLeft, TrackLeft);
    register.control(__TrackRight, TrackRight);
    register.control(__TrackUp, TrackUp);
    register.control(__TrackDown, TrackDown);
    register.control(__TrackEnd, TrackEnd);
    register.control(__React, React);
    /**
     */
    controls.KeyCodes = {
        'backspace': 8,
        'tab': 9,
        'enter': 13,
        'shift': 16,
        'ctrl': 17,
        'alt': 18,
        'pause': 19, 'break': 19,
        'caps lock': 20,
        'escape': 27,
        'space': 32,
        'page up': 33,
        'page down': 34,
        'end': 35,
        'home': 36,
        'left': 37, 'left arrow': 37,
        'up': 38, 'up arrow': 38,
        'right': 39, 'right arrow': 39,
        'down': 40, 'down arrow': 40,
        'insert': 45,
        'delete': 46,
        '0': 48, 'zero': 48,
        ')': 48, 'right parenthesis': 48,
        '1': 49, 'one': 49,
        '!': 49, 'exclamation': 49, 'exclamation point': 49,
        '2': 50, 'two': 50,
        '@': 50, 'at': 50,
        '3': 51, 'three': 51,
        '#': 51, 'number sign': 51,
        'hash': 51, 'pound': 51,
        '4': 52, 'four': 52,
        '$': 52, 'dollar': 52, 'dollar sign': 52,
        '5': 53, 'five': 53,
        '%': 53, 'percent': 53, 'percent sign': 53,
        '6': 54, 'six': 54,
        '^': 54, 'caret': 54,
        '7': 55, 'seven': 55,
        '&': 55, 'ampersand': 55,
        '8': 56, 'eight': 56,
        '*': 56, 'asterisk': 56,
        '9': 57, 'nine': 57,
        '(': 57, 'left parenthesis': 57,
        'a': 65, 'b': 66, 'c': 67, 'd': 68, 'e': 69,
        'f': 70, 'g': 71, 'h': 72, 'i': 73, 'j': 74,
        'k': 75, 'l': 76, 'm': 77, 'n': 78, 'o': 79,
        'p': 80, 'q': 81, 'r': 82, 's': 83, 't': 84,
        'u': 85, 'v': 86, 'w': 87, 'x': 88, 'y': 89,
        'z': 90,
        'lwk': 91, 'left window key': 91,
        'rwk': 92, 'right window key': 92,
        'select': 93, 'select key': 93,
        'numpad 0': 96,
        'numpad 1': 97,
        'numpad 2': 98,
        'numpad 3': 99,
        'numpad 4': 100,
        'numpad 5': 101,
        'numpad 6': 102,
        'numpad 7': 103,
        'numpad 8': 104,
        'numpad 9': 105,
        'multiply': 106,
        'add': 107,
        'subtract': 109,
        'decimal point': 110,
        'divide': 111,
        'f1': 112, 'f2': 113, 'f3': 114, 'f4': 115,
        'f5': 116, 'f6': 117, 'f7': 118, 'f8': 119,
        'f9': 120, 'f10': 121, 'f11': 122, 'f12': 123,
        'num lock': 144,
        'scroll lock': 145,
        ';': 186, 'semi-colon': 186,
        ':': 186, 'colon': 186,
        '=': 187, 'equal': 187, 'equal sign': 187,
        '+': 187, 'plus': 187,
        ',': 188, 'comma': 188,
        '<': 188, 'lt': 188, 'less than': 188,
        'left angle bracket': 188,
        '-': 189, 'dash': 189,
        '_': 189, 'underscore': 189,
        '.': 190, 'period': 190,
        '>': 190, 'gt': 190, 'greater than': 190,
        'right angle bracket': 190,
        '/': 191, 'forward slash': 191,
        '?': 191, 'question mark': 191,
        '`': 192, 'grave accent': 192,
        '~': 192, 'tilde': 192,
        '[': 219, 'open bracket': 219,
        '{': 219, 'open brace': 219,
        '\\': 220, 'back slash': 220,
        '|': 220, 'pipe': 220,
        ']': 221, 'close bracket': 221,
        '}': 221, 'close brace': 221,
        '\'': 222, 'single quote': 222,
        '"': 222, 'double quote': 222
    };
    /**
     */
    var KeyCodeEventControl = (function (_super) {
        __extends(KeyCodeEventControl, _super);
        function KeyCodeEventControl() {
            _super.apply(this, arguments);
            /**
             */
            this.keyCodes = {};
        }
        /**
         */
        KeyCodeEventControl.prototype._setListener = function () {
            var attr = this.attribute;
            if (isEmpty(this.event) || isEmpty(attr)) {
                return;
            }
            var expression = this.attributes[attr].trim();
            if (expression[0] === '{') {
                var eventObject = this.evaluateExpression(expression) || { method: '' }, keys = this._filterArgs(eventObject);
                this._setKeyCodes(keys);
                this.addEventListener(this.element, this.event, this._onEvent, false);
                return;
            }
            _super.prototype._setListener.call(this);
        };
        /**
         */
        KeyCodeEventControl.prototype._filterArgs = function (input) {
            var key = input.key, keys = input.keys;
            this._parseArgs(input.method);
            if (isArray(keys)) {
                return keys;
            }
            else if (isString(keys)) {
                return [keys];
            }
            else if (isArray(key)) {
                return key;
            }
            else if (isString(key)) {
                return [key];
            }
            else {
                if (!(isNull(input.char) && isNull(input.chars))) {
                    this._log.warn(this.type +
                        ' should be using the property key or keys to denote key codes or keys and not char codes or characters.');
                }
            }
        };
        /**
         * @param {KeyboardEvent} ev The keyboard event object.
         */
        KeyCodeEventControl.prototype._onEvent = function (ev) {
            if (this._compareKeys(ev)) {
                _super.prototype._onEvent.call(this, ev);
            }
        };
        /**
         * @param {KeyboardEvent} ev The keyboard event object.
         */
        KeyCodeEventControl.prototype._compareKeys = function (ev) {
            var keyCodes = this.keyCodes, keyCode = ev.keyCode || ev.which;
            return isEmpty(keyCodes) || keyCodes[keyCode] === true;
        };
        /**
         * @param {Array<string>} keys? The array of defined keys to satisfy the
         * key press condition.
         */
        KeyCodeEventControl.prototype._setKeyCodes = function (keys) {
            if (!isArray(keys)) {
                keys = [];
            }
            var length = keys.length, key, keyCodes = this.keyCodes, index;
            for (var i = 0; i < length; ++i) {
                key = keys[i];
                index = isNumber(key) ? key : controls.KeyCodes[key.toLowerCase()];
                keyCodes[index] = true;
            }
        };
        return KeyCodeEventControl;
    })(SimpleEventControl);
    controls.KeyCodeEventControl = KeyCodeEventControl;
    /**
     */
    var KeyDown = (function (_super) {
        __extends(KeyDown, _super);
        function KeyDown() {
            _super.apply(this, arguments);
            /**
             */
            this.event = 'keydown';
        }
        return KeyDown;
    })(KeyCodeEventControl);
    controls.KeyDown = KeyDown;
    /**
     */
    var KeyPress = (function (_super) {
        __extends(KeyPress, _super);
        function KeyPress() {
            _super.apply(this, arguments);
            /**
             */
            this.event = 'keydown';
        }
        /**
         * @param {KeyboardEvent} ev The KeyboardEvent object.
         */
        KeyPress.prototype._onEvent = function (ev) {
            var _this = this;
            var keyCode = ev.keyCode || ev.which;
            if (_super.prototype._compareKeys.call(this, ev) && ((keyCode >= 48 && keyCode <= 90) ||
                (keyCode >= 186) || (keyCode >= 96 && keyCode <= 111))) {
                var remove = this.addEventListener(this.element, 'keypress', function (e) {
                    remove();
                    _super.prototype._onEvent.call(_this, e);
                }, false);
            }
        };
        /**
         * @param {KeyboardEvent} ev The keyboard event object.
         */
        KeyPress.prototype._compareKeys = function (ev) {
            return true;
        };
        return KeyPress;
    })(KeyCodeEventControl);
    controls.KeyPress = KeyPress;
    /**
     */
    var KeyUp = (function (_super) {
        __extends(KeyUp, _super);
        function KeyUp() {
            _super.apply(this, arguments);
            /**
             */
            this.event = 'keyup';
        }
        return KeyUp;
    })(KeyCodeEventControl);
    controls.KeyUp = KeyUp;
    /**
     */
    var CharPress = (function (_super) {
        __extends(CharPress, _super);
        function CharPress() {
            _super.apply(this, arguments);
            /**
             */
            this.event = 'keypress';
        }
        /**
         */
        CharPress.prototype._filterArgs = function (input) {
            var char = input.char, chars = input.chars;
            this._parseArgs(input.method);
            if (isArray(chars)) {
                return chars;
            }
            else if (isString(chars)) {
                return [chars];
            }
            else if (isArray(char)) {
                return char;
            }
            else if (isString(char)) {
                return [char];
            }
            else {
                if (!(isNull(input.key) && isNull(input.keys))) {
                    this._log.warn(this.type +
                        ' should be using the property key or keys to denote key codes or keys and not char codes or characters.');
                }
            }
        };
        /**
         * @param {KeyboardEvent} ev The keyboard event object.
         */
        CharPress.prototype._onEvent = function (ev) {
            var keyCodes = this.keyCodes, keyCode = ev.charCode || ev.which, key;
            if (!keyCode) {
                key = ev.key;
                if (!key) {
                    return;
                }
            }
            else {
                key = String.fromCharCode(keyCode);
            }
            if (isEmpty(keyCodes) || keyCodes[key] === true) {
                _super.prototype._onEvent.call(this, ev);
            }
        };
        /**
         * @param {KeyboardEvent} ev The keyboard event object.
         */
        CharPress.prototype._compareKeys = function (ev) {
            return true;
        };
        /**
         * @param {Array<string>} keys? The array of defined keys to satisfy the
         * key press condition.
         */
        CharPress.prototype._setKeyCodes = function (keys) {
            if (!isArray(keys)) {
                keys = [];
            }
            var length = keys.length, key, keyCodes = this.keyCodes, index;
            for (var i = 0; i < length; ++i) {
                key = keys[i];
                index = isNumber(key) ? String.fromCharCode(key) : key;
                keyCodes[index] = true;
            }
        };
        return CharPress;
    })(KeyCodeEventControl);
    controls.CharPress = CharPress;
    register.control(__KeyDown, KeyDown);
    register.control(__KeyPress, KeyPress);
    register.control(__KeyUp, KeyUp);
    register.control(__CharPress, CharPress);
    /**
     */
    var SetAttributeControl = (function (_super) {
        __extends(SetAttributeControl, _super);
        function SetAttributeControl() {
            _super.apply(this, arguments);
            /**
             */
            this.property = '';
            /**
             */
            this._stopSetter = noop;
        }
        /**
         */
        SetAttributeControl.prototype.loaded = function () {
            if (isNull(this.element)) {
                return;
            }
            this.attribute = camelCase(this.type);
            this.setter();
            this.__removeListener = this.attributes.observe(this.setter, this.attribute);
        };
        /**
         */
        SetAttributeControl.prototype.contextChanged = function () {
            if (isNull(this.element)) {
                return;
            }
            this.setter();
        };
        /**
         */
        SetAttributeControl.prototype.dispose = function () {
            this._stopSetter();
            if (isFunction(this.__removeListener)) {
                this.__removeListener();
                this.__removeListener = null;
            }
        };
        /**
         */
        SetAttributeControl.prototype.setter = function () {
            var _this = this;
            this._stopSetter();
            this._stopSetter = requestAnimationFrameGlobal(function () {
                var element = _this.element, property = _this.property;
                if (!isNode(element)) {
                    return;
                }
                switch (_this.attributes[_this.attribute]) {
                    case 'false':
                    case '0':
                    case 'null':
                    case '':
                        element.setAttribute(property, '');
                        element[property] = false;
                        element.removeAttribute(property);
                        break;
                    default:
                        element.setAttribute(property, property);
                        element[property] = true;
                        break;
                }
            });
        };
        return SetAttributeControl;
    })(AttributeControl);
    controls.SetAttributeControl = SetAttributeControl;
    /**
     */
    var Checked = (function (_super) {
        __extends(Checked, _super);
        function Checked() {
            _super.apply(this, arguments);
            /**
             */
            this.property = 'checked';
        }
        return Checked;
    })(SetAttributeControl);
    controls.Checked = Checked;
    /**
     */
    var Disabled = (function (_super) {
        __extends(Disabled, _super);
        function Disabled() {
            _super.apply(this, arguments);
            /**
             */
            this.property = 'disabled';
        }
        return Disabled;
    })(SetAttributeControl);
    controls.Disabled = Disabled;
    /**
     */
    var Selected = (function (_super) {
        __extends(Selected, _super);
        function Selected() {
            _super.apply(this, arguments);
            /**
             */
            this.property = 'selected';
        }
        return Selected;
    })(SetAttributeControl);
    controls.Selected = Selected;
    /**
     */
    var ReadOnly = (function (_super) {
        __extends(ReadOnly, _super);
        function ReadOnly() {
            _super.apply(this, arguments);
            /**
             */
            this.property = 'readonly';
        }
        return ReadOnly;
    })(SetAttributeControl);
    controls.ReadOnly = ReadOnly;
    /**
     */
    var Visible = (function (_super) {
        __extends(Visible, _super);
        function Visible() {
            _super.apply(this, arguments);
            /**
             */
            this.property = 'display';
            /**
             */
            this.value = 'none';
            /**
             */
            this.importance = 'important';
            /**
             */
            this._initialValue = '';
        }
        /**
         */
        Visible.prototype.initialize = function () {
            var style = this.element.style || { getPropertyValue: noop }, initialValue = style.getPropertyValue(this.property);
            this._setValue(this.value, this.importance);
            if (isEmpty(initialValue) || initialValue === 'none') {
                return;
            }
            this._initialValue = initialValue;
        };
        /**
         */
        Visible.prototype.setter = function () {
            var _this = this;
            this._stopSetter();
            this._stopSetter = requestAnimationFrameGlobal(function () {
                if (!isNode(_this.element)) {
                    return;
                }
                switch (_this.attributes[_this.attribute]) {
                    case 'false':
                    case '0':
                    case 'null':
                    case '':
                        _this._setValue(_this.value, _this.importance);
                        break;
                    default:
                        _this._setValue(_this._initialValue);
                        break;
                }
            });
        };
        /**
         * @param {string} value The value to set.
         * @param {string} importance? The priority or importance level to set.
         */
        Visible.prototype._setValue = function (value, importance) {
            var property = this.property, style = this.element.style || {
                setProperty: noop,
                removeProperty: noop,
                getPropertyValue: noop,
                getPropertyPriority: noop
            }, currentVal = style.getPropertyValue(property), currentPriority = style.getPropertyPriority(property);
            if (value === currentVal && importance === currentPriority) {
                return;
            }
            else if (isEmpty(value)) {
                style.removeProperty(property);
                return;
            }
            style.setProperty(property, value, importance);
        };
        return Visible;
    })(SetAttributeControl);
    controls.Visible = Visible;
    /**
     */
    var Style = (function (_super) {
        __extends(Style, _super);
        function Style() {
            _super.apply(this, arguments);
            /**
             */
            this.property = 'style';
            /**
             */
            this._styleRegex = /(.*?):(.*)/;
            /**
             */
            this._urlRegex = /url\([^\)]*\)/gi;
            /**
             */
            this._urlReplace = '[PLAT-STYLE-URL]';
            /**
             */
            this.__addedStyles = [];
            /**
             */
            this.__oldStyles = {};
        }
        /**
         */
        Style.prototype.setter = function () {
            var _this = this;
            this._stopSetter();
            var element = this.element, expression = this.attributes[this.attribute];
            if (isEmpty(expression) || isNull(element)) {
                return;
            }
            this._stopSetter = requestAnimationFrameGlobal(function () {
                var urls = [], urlReplace = _this._urlReplace;
                expression = expression.replace(_this._urlRegex, function (match) {
                    urls.push(match);
                    return urlReplace;
                });
                var style = element.style, addedStyles = _this.__addedStyles, oldStyles = _this.__oldStyles, newStyles = [], props = expression.split(';'), length = props.length, prop, val, styleRegex = _this._styleRegex, exec, styleChanges = {}, i;
                for (i = 0; i < length; ++i) {
                    exec = styleRegex.exec(props[i]);
                    if (isNull(exec) || exec.length < 3) {
                        continue;
                    }
                    prop = exec[1].trim();
                    if (prop.length === 0 || isUndefined(style[prop])) {
                        continue;
                    }
                    else if (addedStyles.indexOf(prop) === -1) {
                        oldStyles[prop] = style[prop];
                    }
                    newStyles.push(prop);
                    val = exec[2].trim();
                    if (urls.length > 0 && val.indexOf(urlReplace) !== -1) {
                        val = val.replace(urlReplace, urls.shift());
                    }
                    styleChanges[prop] = val;
                }
                length = addedStyles.length;
                while (length-- > 0) {
                    prop = addedStyles[length];
                    if (newStyles.indexOf(prop) === -1) {
                        styleChanges[prop] = oldStyles[prop];
                        addedStyles.splice(length, 1);
                    }
                }
                var keys = Object.keys(styleChanges);
                length = keys.length;
                while (length-- > 0) {
                    prop = keys[length];
                    style[prop] = styleChanges[prop];
                }
                _this.__addedStyles = addedStyles.concat(newStyles);
            });
        };
        return Style;
    })(SetAttributeControl);
    controls.Style = Style;
    register.control(__Checked, Checked);
    register.control(__Disabled, Disabled);
    register.control(__Selected, Selected);
    register.control(__ReadOnly, ReadOnly);
    register.control(__Visible, Visible);
    register.control(__Style, Style);
    /**
     */
    var ElementPropertyControl = (function (_super) {
        __extends(ElementPropertyControl, _super);
        function ElementPropertyControl() {
            _super.apply(this, arguments);
        }
        /**
         */
        ElementPropertyControl.prototype.setter = function () {
            var element = this.element, elementProperty = this.property, expression = this.attributes[this.attribute];
            if (isEmpty(expression) || isNull(element)) {
                return;
            }
            if (!isUndefined(element[elementProperty])) {
                element[elementProperty] = expression;
            }
        };
        return ElementPropertyControl;
    })(SetAttributeControl);
    controls.ElementPropertyControl = ElementPropertyControl;
    /**
     */
    var Href = (function (_super) {
        __extends(Href, _super);
        function Href() {
            _super.apply(this, arguments);
            /**
             */
            this.property = 'href';
        }
        return Href;
    })(ElementPropertyControl);
    controls.Href = Href;
    /**
     */
    var Src = (function (_super) {
        __extends(Src, _super);
        function Src() {
            _super.apply(this, arguments);
            /**
             */
            this.property = 'src';
        }
        /**
         */
        Src.prototype.setter = function () {
            var element = this.element, elementProperty = this.property, expression = this.attributes[this.attribute];
            if (isEmpty(expression) || isNull(element)) {
                return;
            }
            if (!isUndefined(element[elementProperty])) {
                element[elementProperty] = this._browser.urlUtils(expression);
            }
        };
        Src._inject = {
            _browser: __Browser
        };
        return Src;
    })(ElementPropertyControl);
    controls.Src = Src;
    register.control(__Href, Href);
    register.control(__Src, Src);
    /**
     */
    var Bind = (function (_super) {
        __extends(Bind, _super);
        function Bind() {
            _super.apply(this, arguments);
            /**
             */
            this.priority = 100;
            /**
             */
            this._supportsTwoWayBinding = false;
            /**
             */
            this.__fileSupported = acquire(__Compat).fileSupported;
            /**
             */
            this.__fileNameRegex = acquire(__Regex).fileNameRegex;
            /**
             */
            this.__isSelf = false;
        }
        /**
         */
        Bind.prototype.initialize = function () {
            this._determineType();
        };
        /**
         */
        Bind.prototype.loaded = function () {
            var parent = this.parent;
            if (isNull(parent) || isNull(this.element)) {
                return;
            }
            var attr = camelCase(this.type), _parser = this._parser, expression = this._expression = _parser.parse(this.attributes[attr]);
            var identifiers = expression.identifiers;
            if (identifiers.length !== 1) {
                this._log.warn('Only 1 identifier allowed in a ' + this.type + ' expression.');
                this._contextExpression = null;
                return;
            }
            var split = identifiers[0].split('.');
            this._property = split.pop();
            if (expression.aliases.length > 0) {
                var alias = expression.aliases[0], resourceObj = parent.findResource(alias), type;
                if (isObject(resourceObj)) {
                    type = resourceObj.resource.type;
                    if (type !== __OBSERVABLE_RESOURCE && type !== __LITERAL_RESOURCE) {
                        return;
                    }
                }
                else {
                    resourceObj = { resource: {} };
                }
                if (alias === __CONTEXT_RESOURCE || alias === __ROOT_CONTEXT_RESOURCE) {
                    this._contextExpression = _parser.parse(split.join('.'));
                }
                else {
                    this._property = 'value';
                    this._contextExpression = {
                        evaluate: function () {
                            return resourceObj.resource;
                        },
                        aliases: [],
                        identifiers: [],
                        expression: ''
                    };
                }
            }
            else if (split.length > 0) {
                this._contextExpression = _parser.parse(split.join('.'));
            }
            else {
                this._contextExpression = {
                    evaluate: function () {
                        return parent.context;
                    },
                    aliases: [],
                    identifiers: [],
                    expression: ''
                };
            }
            if (this._supportsTwoWayBinding) {
                this.templateControl.observeProperties(this);
            }
            this._watchExpression();
            if (isNull(this._addEventType)) {
                return;
            }
            this._addEventType();
        };
        /**
         */
        Bind.prototype.contextChanged = function () {
            this._watchExpression();
        };
        /**
         */
        Bind.prototype.dispose = function () {
            this._addEventType = null;
        };
        /**
         */
        Bind.prototype.evaluate = function () {
            var expression = this._expression;
            if (isUndefined(expression)) {
                return;
            }
            return this.evaluateExpression(expression);
        };
        Bind.prototype.observeProperty = function (listener, identifier, autocast) {
            return this._observeProperty(listener, identifier, autocast);
        };
        Bind.prototype.observeArrayChange = function (listener, identifier) {
            return this._observeProperty(listener, identifier, false, true);
        };
        /**
         */
        Bind.prototype._addTextEventListener = function () {
            var _this = this;
            var element = this.element, _compat = this._compat, composing = false, input = 'input', timeout, eventListener = function () {
                if (composing) {
                    return;
                }
                _this._propertyChanged();
            }, postponedEventListener = function () {
                if (isFunction(timeout)) {
                    return;
                }
                timeout = postpone(function () {
                    eventListener();
                    timeout = null;
                });
            };
            if (isUndefined(_compat.ANDROID)) {
                this.addEventListener(element, 'compositionstart', function () { composing = true; }, false);
                this.addEventListener(element, 'compositionend', function () {
                    composing = false;
                    eventListener();
                }, false);
            }
            if (_compat.hasEvent(input)) {
                this.addEventListener(element, input, eventListener, false);
            }
            else {
                this.addEventListener(element, 'keydown', function (ev) {
                    var key = ev.keyCode || ev.which, codes = controls.KeyCodes;
                    if (key === codes.lwk ||
                        key === codes.rwk ||
                        (key >= codes.shift && key <= codes.escape) ||
                        (key > codes.space && key <= codes.down)) {
                        return;
                    }
                    postponedEventListener();
                }, false);
                this.addEventListener(element, 'cut', postponedEventListener, false);
                this.addEventListener(element, 'paste', postponedEventListener, false);
            }
            this.addEventListener(element, 'change', eventListener, false);
        };
        /**
         */
        Bind.prototype._addChangeEventListener = function () {
            this.addEventListener(this.element, 'change', this._propertyChanged, false);
        };
        /**
         */
        Bind.prototype._addButtonEventListener = function () {
            this.addEventListener(this.element, __tap, this._propertyChanged, false);
        };
        /**
         */
        Bind.prototype._addRangeEventListener = function () {
            var element = this.element, input = 'input';
            if (this._compat.hasEvent(input)) {
                this.addEventListener(element, input, this._propertyChanged, false);
            }
            this.addEventListener(element, 'change', this._propertyChanged, false);
        };
        /**
         */
        Bind.prototype._getChecked = function () {
            return this.element.checked;
        };
        /**
         */
        Bind.prototype._getValue = function () {
            return this.element.value;
        };
        /**
         */
        Bind.prototype._getTextContent = function () {
            return this.element.textContent;
        };
        /**
         */
        Bind.prototype._getFile = function () {
            var element = this.element, value = element.value;
            if (this.__fileSupported) {
                if (element.files.length > 0) {
                    return element.files[0];
                }
                return null;
            }
            return {
                name: value.replace(this.__fileNameRegex, ''),
                path: value,
                lastModifiedDate: undefined,
                type: undefined,
                size: undefined,
                msDetachStream: noop,
                msClose: noop,
                slice: function () { return {}; }
            };
        };
        /**
         */
        Bind.prototype._getFiles = function () {
            var element = this.element;
            if (this.__fileSupported) {
                return Array.prototype.slice.call(element.files);
            }
            // this case should never be hit since ie9 does not support multi-file uploads, 
            // but kept in here for now for consistency's sake 
            var filelist = element.value.split(/,|;/g), length = filelist.length, files = [], fileValue, blobSlice = function () { return {}; };
            for (var i = 0; i < length; ++i) {
                fileValue = filelist[i];
                files.push({
                    name: fileValue.replace(this.__fileNameRegex, ''),
                    path: fileValue,
                    lastModifiedDate: undefined,
                    type: undefined,
                    size: undefined,
                    msDetachStream: noop,
                    msClose: noop,
                    slice: blobSlice
                });
            }
            return files;
        };
        /**
         */
        Bind.prototype._getSelectedValues = function () {
            var options = this.element.options, length = options.length, option, selectedValues = [];
            for (var i = 0; i < length; ++i) {
                option = options[i];
                if (option.selected) {
                    selectedValues.push(option.value);
                }
            }
            return selectedValues;
        };
        /**
         * @param {any} newValue The new value to set
         * @param {any} oldValue The previously bound value
         * @param {boolean} firstTime? The context is being evaluated for the first time and
         * should thus change the property if null
         */
        Bind.prototype._setText = function (newValue, oldValue, firstTime) {
            if (this.__isSelf) {
                return;
            }
            if (isNull(newValue)) {
                newValue = '';
                if (firstTime === true) {
                    if (isNull(this.element.value)) {
                        this._setValue(newValue);
                    }
                    this._propertyChanged();
                    return;
                }
            }
            this._setValue(newValue);
        };
        /**
         * @param {any} newValue The new value to set
         * @param {any} oldValue The previously bound value
         * @param {boolean} firstTime? The context is being evaluated for the first time and
         * should thus change the property if null
         */
        Bind.prototype._setRange = function (newValue, oldValue, firstTime) {
            if (this.__isSelf) {
                return;
            }
            if (isEmpty(newValue)) {
                newValue = newValue === '' ? '0' : 0;
                if (firstTime === true) {
                    if (isEmpty(this.element.value)) {
                        this._setValue(newValue);
                    }
                    this._propertyChanged();
                    return;
                }
            }
            this._setValue(newValue);
        };
        /**
         * @param {any} newValue The new value to set
         * @param {any} oldValue The previously bound value
         * @param {boolean} firstTime? The context is being evaluated for the first time and
         * should thus change the property if null
         */
        Bind.prototype._setHidden = function (newValue, oldValue, firstTime) {
            if (this.__isSelf) {
                return;
            }
            if (isEmpty(newValue)) {
                newValue = '';
                if (firstTime === true) {
                    if (isEmpty(this.element.value)) {
                        this._setValue(newValue);
                    }
                    this._propertyChanged();
                    return;
                }
            }
            this._setValue(newValue);
        };
        /**
         * @param {any} newValue The new value to set
         */
        Bind.prototype._setValue = function (newValue) {
            var element = this.element;
            if (!isString(newValue)) {
                if (isNumber(newValue)) {
                    this._propertyType = 'number';
                    newValue = newValue.toString();
                }
                else if (isBoolean(newValue)) {
                    this._propertyType = 'boolean';
                    newValue = newValue.toString();
                }
            }
            if (element.value === newValue) {
                return;
            }
            element.value = newValue;
        };
        /**
         * @param {any} newValue The new value to set
         * @param {any} oldValue The previously bound value
         * @param {boolean} firstTime? The context is being evaluated for the first time and
         * should thus change the property if null
         */
        Bind.prototype._setChecked = function (newValue, oldValue, firstTime) {
            if (this.__isSelf) {
                return;
            }
            else if (!isBoolean(newValue)) {
                newValue = !!newValue;
                if (firstTime === true) {
                    this.element.checked = newValue;
                    this._propertyChanged();
                    return;
                }
            }
            this.element.checked = newValue;
        };
        /**
         * @param {any} newValue The new value to set
         */
        Bind.prototype._setRadio = function (newValue) {
            var element = this.element;
            if (this.__isSelf) {
                return;
            }
            else if (isNull(newValue)) {
                if (element.checked) {
                    this._propertyChanged();
                }
                return;
            }
            else if (!isString(newValue)) {
                if (isNumber(newValue)) {
                    this._propertyType = 'number';
                    newValue = newValue.toString();
                }
                else if (isBoolean(newValue)) {
                    this._propertyType = 'boolean';
                    newValue = newValue.toString();
                }
            }
            element.checked = (element.value === newValue);
        };
        /**
         * @param {any} newValue The new value to set
         * @param {any} oldValue The previously bound value
         * @param {boolean} firstTime? The context is being evaluated for the first time and
         * should thus change the property if null
         */
        Bind.prototype._setSelectedIndex = function (newValue, oldValue, firstTime) {
            if (this.__isSelf) {
                return;
            }
            var element = this.element, value = element.value;
            if (isNull(newValue)) {
                if (firstTime === true || !this._document.body.contains(element)) {
                    this._propertyChanged();
                    return;
                }
                element.selectedIndex = -1;
                return;
            }
            else if (!isString(newValue)) {
                if (isNumber(newValue)) {
                    this._propertyType = 'number';
                    newValue = newValue.toString();
                }
                else if (isBoolean(newValue)) {
                    this._propertyType = 'boolean';
                    newValue = newValue.toString();
                }
                else {
                    this._log.info('Trying to bind an invalid value to a <select> element using a ' + this.type + '.');
                }
            }
            if (value === newValue) {
                return;
            }
            else if (!this._document.body.contains(element)) {
                element.value = newValue;
                if (element.value !== newValue) {
                    element.value = value;
                    this._propertyChanged();
                }
                return;
            }
            element.value = newValue;
            // check to make sure the user changed to a valid value 
            // second boolean argument is an ie fix for inconsistency 
            if (element.value !== newValue || element.selectedIndex === -1) {
                element.selectedIndex = -1;
            }
        };
        /**
         * @param {any} newValue The new value to set
         * @param {any} oldValue The previously bound value
         * @param {boolean} firstTime? The context is being evaluated for the first time and
         * should thus change the property if null
         */
        Bind.prototype._setSelectedIndices = function (newValue, oldValue, firstTime) {
            if (this.__isSelf) {
                return;
            }
            var options = this.element.options, length = isNull(options) ? 0 : options.length, option, nullValue = isNull(newValue);
            if (nullValue || !isArray(newValue)) {
                if (firstTime === true) {
                    this._propertyChanged();
                }
                // unselects the options unless a match is found 
                while (length-- > 0) {
                    option = options[length];
                    if (!nullValue && option.value === '' + newValue) {
                        option.selected = true;
                        return;
                    }
                    option.selected = false;
                }
                return;
            }
            var value, numberValue, index, highestIndex = Infinity;
            while (length-- > 0) {
                option = options[length];
                value = option.value;
                if (newValue.indexOf(value) !== -1) {
                    option.selected = true;
                    continue;
                }
                numberValue = Number(value);
                if (isNumber(numberValue) && (index = newValue.indexOf(numberValue)) !== -1) {
                    if (index < highestIndex) {
                        this._propertyType = 'number';
                        highestIndex = index;
                    }
                    option.selected = true;
                    continue;
                }
                else if ((value === 'true' && (index = newValue.indexOf(true)) !== -1) ||
                    value === 'false' && (index = newValue.indexOf(false)) !== -1) {
                    if (index < highestIndex) {
                        this._propertyType = 'boolean';
                        highestIndex = index;
                    }
                    option.selected = true;
                    continue;
                }
                option.selected = false;
            }
        };
        /**
         */
        Bind.prototype._determineType = function () {
            if (this._observingBindableProperty()) {
                return;
            }
            var element = this.element;
            if (isNull(element)) {
                return;
            }
            switch (element.nodeName.toLowerCase()) {
                case 'input':
                    switch (element.type) {
                        case 'button':
                        case 'submit':
                        case 'reset':
                        case 'image':
                            this._addEventType = this._addButtonEventListener;
                            this._getter = this._getValue;
                            break;
                        case 'checkbox':
                            this._addEventType = this._addChangeEventListener;
                            this._getter = this._getChecked;
                            this._setter = this._setChecked;
                            break;
                        case 'radio':
                            this._initializeRadio();
                            break;
                        case 'range':
                            this._addEventType = this._addRangeEventListener;
                            this._getter = this._getValue;
                            this._setter = this._setRange;
                            break;
                        case 'file':
                            var multi = element.multiple;
                            this._addEventType = this._addChangeEventListener;
                            this._getter = multi ? this._getFiles : this._getFile;
                            break;
                        case 'hidden':
                            this._getter = this._getValue;
                            this._setter = this._setHidden;
                            break;
                        default:
                            this._addEventType = this._addTextEventListener;
                            this._getter = this._getValue;
                            this._setter = this._setText;
                            break;
                    }
                    break;
                case 'textarea':
                    this._addEventType = this._addTextEventListener;
                    this._getter = this._getValue;
                    this._setter = this._setText;
                    break;
                case 'select':
                    this._initializeSelect();
                    break;
                case 'button':
                    this._addEventType = this._addButtonEventListener;
                    this._getter = this._getTextContent;
                    break;
            }
        };
        /**
         */
        Bind.prototype._watchExpression = function () {
            var _this = this;
            var contextExpression = this._contextExpression, context = this.evaluateExpression(contextExpression);
            if (!isObject(context)) {
                if (isNull(context) && contextExpression.identifiers.length > 0) {
                    context = this._createContext(contextExpression.identifiers[0]);
                }
                else {
                    this._log.warn(this.type + ' is trying to index into a primitive type. ' +
                        this._contextExpression.expression + ' is already defined and not ' +
                        'an object when trying to evaluate ' + this.type + '="' +
                        this._expression.expression + '"');
                    return;
                }
            }
            var property;
            if (!isFunction(this._setter)) {
                return;
            }
            else if (this._setter === this._setSelectedIndices) {
                property = this._property;
                if (isNull(context[property])) {
                    context[property] = [];
                }
                this.observeArray(function (arrayInfo) {
                    _this._setter(arrayInfo[0].object, null, true);
                }, contextExpression + '.' + property);
            }
            var expression = this._expression;
            this.observeExpression(function (newValue, oldValue) {
                _this._setter(newValue, oldValue);
            }, expression);
            this._setter(this.evaluateExpression(expression), undefined, true);
        };
        /**
         * @param {string} identifier The identifier to base the created context off of.
         */
        Bind.prototype._createContext = function (identifier) {
            var split = identifier.split('.'), start = split.shift().slice(1), parent = this.parent;
            if (start === __ROOT_CONTEXT_RESOURCE) {
                identifier = split.join('.');
                parent = this.parent.root;
            }
            else if (start === __CONTEXT) {
                identifier = split.join('.');
            }
            return this._ContextManager.createContext(parent, identifier);
        };
        /**
         * @param {any} value The value to cast.
         * @param {any} type? The optional type to cast the value to.
         */
        Bind.prototype._castProperty = function (value, type) {
            var castValue;
            type = type || this._propertyType;
            if (isNull(type)) {
                return value;
            }
            else if (isObject(value)) {
                if (isArray(value)) {
                    var length_12 = value.length;
                    castValue = [];
                    for (var i = 0; i < length_12; ++i) {
                        castValue.push(this._castProperty(value[i], type));
                    }
                }
                else if (isDate(value) || isFile(value) || isPromise(value) || isWindow(value) || isNode(value)) {
                    castValue = value;
                }
                else {
                    var keys = Object.keys(value), key;
                    castValue = {};
                    while (keys.length > 0) {
                        key = keys.pop();
                        castValue[key] = value[key];
                    }
                }
            }
            else {
                switch (type) {
                    case 'string':
                        if (isString(value)) {
                            castValue = value;
                        }
                        else if (isFunction(value.toString)) {
                            castValue = value.toString();
                        }
                        else {
                            castValue = Object.prototype.toString.call(value);
                        }
                        break;
                    case 'number':
                        castValue = isEmpty(value) ? undefined : Number(value);
                        break;
                    case 'boolean':
                        switch (value) {
                            case 'true':
                                castValue = true;
                                break;
                            case 'false':
                            case '0':
                            case 'null':
                            case 'undefined':
                                castValue = false;
                                break;
                            default:
                                castValue = !!value;
                                break;
                        }
                        break;
                    default:
                        castValue = value;
                        break;
                }
            }
            return castValue;
        };
        /**
         */
        Bind.prototype._propertyChanged = function () {
            if (isNull(this._contextExpression)) {
                return;
            }
            var context = this.evaluateExpression(this._contextExpression);
            if (!isObject(context)) {
                return;
            }
            var property = this._property, newValue = this._castProperty(this._getter());
            if (context[property] === newValue) {
                return;
            }
            // set flag to let setter functions know we changed the property 
            this.__isSelf = true;
            context[property] = newValue;
            this.__isSelf = false;
        };
        /**
         */
        Bind.prototype._initializeRadio = function () {
            var element = this.element;
            this._addEventType = this._addChangeEventListener;
            this._getter = this._getValue;
            this._setter = this._setRadio;
            if (!element.hasAttribute('name')) {
                var attr = camelCase(this.type), expression = this.attributes[attr];
                element.setAttribute('name', expression);
            }
            if (element.hasAttribute('value')) {
                return;
            }
            element.setAttribute('value', '');
        };
        /**
         */
        Bind.prototype._initializeSelect = function () {
            var element = this.element, multiple = element.multiple, options = element.options, length = options.length, option;
            this._addEventType = this._addChangeEventListener;
            if (multiple) {
                this._getter = this._getSelectedValues;
                this._setter = this._setSelectedIndices;
            }
            else {
                this._getter = this._getValue;
                this._setter = this._setSelectedIndex;
            }
            for (var i = 0; i < length; ++i) {
                option = options[i];
                if (!option.hasAttribute('value')) {
                    option.setAttribute('value', option.textContent);
                }
            }
        };
        /**
         */
        Bind.prototype._observingBindableProperty = function () {
            var _this = this;
            var templateControl = this.templateControl;
            if (isObject(templateControl) && isFunction(templateControl.onInput) && isFunction(templateControl.observeProperties)) {
                templateControl.onInput(function (newValue) {
                    _this._getter = function () { return newValue; };
                    _this._propertyChanged();
                });
                return (this._supportsTwoWayBinding = true);
            }
            return false;
        };
        /**
         * @param {Function} listener The listener function.
         * @param {any} identifier? The index off of the bound object to listen to for changes if the bound object is an Array.
         * If undefined or empty the listener will listen for changes to the bound Array itself.
         * @param {boolean} autocast? Will cast a primitive value to whatever it was set to in code.
         * @param {boolean} arrayMutations? Whether or not this is for Array mutation changes.
         */
        Bind.prototype._observeProperty = function (listener, identifier, autocast, arrayMutations) {
            var _this = this;
            var parsedIdentifier;
            if (isEmpty(identifier)) {
                parsedIdentifier = this._expression.expression;
            }
            else if (isNumber(identifier)) {
                parsedIdentifier = this._expression.expression + '.' + identifier;
            }
            else {
                var _parser = this._parser, identifierExpression = _parser.parse(identifier), identifiers = identifierExpression.identifiers;
                if (identifiers.length !== 1) {
                    this._log.warn('Only 1 identifier path allowed when observing changes to a bound property\'s child with a control ' +
                        'implementing observable.ISupportTwoWayBinding and working with ' + this.type);
                    return;
                }
                var expression = _parser.parse(this._expression.expression + '.' + identifiers[0]);
                parsedIdentifier = expression.identifiers[0];
                var split = parsedIdentifier.split('.');
                split.pop();
                var contextExpression = split.join('.'), context = this.evaluateExpression(contextExpression);
                if (!isObject(context)) {
                    if (isNull(context)) {
                        context = this._ContextManager.createContext(this.parent, contextExpression);
                    }
                    else {
                        this._log.warn('A control implementing observable.ISupportTwoWayBinding is trying to index into a primitive type ' +
                            'when trying to evaluate ' + this.type + '="' + this._expression.expression + '"');
                        return;
                    }
                }
            }
            listener = listener.bind(this.templateControl);
            autocast = autocast === true;
            var removeListener;
            if (arrayMutations === true) {
                removeListener = this.observeArray(function (changes) {
                    listener(changes, identifier);
                }, parsedIdentifier);
            }
            else {
                removeListener = this.observe(function (newValue, oldValue) {
                    if (_this.__isSelf || newValue === oldValue) {
                        return;
                    }
                    else if (autocast) {
                        _this._propertyType = _this._getPropertyType(newValue);
                    }
                    listener(newValue, oldValue, identifier);
                }, parsedIdentifier);
                var value = this.evaluateExpression(parsedIdentifier);
                if (autocast) {
                    this._propertyType = this._getPropertyType(value);
                }
                listener(value, undefined, identifier, true);
            }
            return removeListener;
        };
        /**
         * @param {any} value The value to grab the property type from.
         */
        Bind.prototype._getPropertyType = function (value) {
            if (isObject(value)) {
                return value;
            }
            else if (isString(value)) {
                return 'string';
            }
            else if (isNumber(value)) {
                return 'number';
            }
            else if (isBoolean(value)) {
                return 'boolean';
            }
        };
        Bind._inject = {
            _parser: __Parser,
            _ContextManager: __ContextManagerStatic,
            _compat: __Compat,
            _document: __Document
        };
        return Bind;
    })(AttributeControl);
    controls.Bind = Bind;
    register.control(__Bind, Bind);
    /**
     */
    var ObservableAttributeControl = (function (_super) {
        __extends(ObservableAttributeControl, _super);
        function ObservableAttributeControl() {
            _super.apply(this, arguments);
            /**
             */
            this.property = '';
            /**
             */
            this.priority = 200;
            /**
             */
            this._listeners = [];
            /**
             */
            this._boundAddListener = this._addListener.bind(this);
        }
        /**
         */
        ObservableAttributeControl.prototype.initialize = function () {
            this.attribute = camelCase(this.type);
            this._setProperty(this._getValue());
        };
        /**
         */
        ObservableAttributeControl.prototype.loaded = function () {
            this._observeProperty();
            this._setProperty(this._getValue());
        };
        /**
         */
        ObservableAttributeControl.prototype.dispose = function () {
            if (isFunction(this._removeListener)) {
                this._removeListener();
            }
            this._listeners = [];
        };
        /**
         * @param {any} value The new value of the evaluated expression.
         * @param {any} oldValue? The old value of the evaluated expression.
         */
        ObservableAttributeControl.prototype._setProperty = function (value, oldValue) {
            var templateControl = this.templateControl;
            if (isNull(templateControl)) {
                return;
            }
            this._ContextManager.defineGetter(templateControl, this.property, {
                value: value,
                observe: this._boundAddListener
            }, true, true);
            this._callListeners(value, oldValue);
        };
        /**
         * @param {any} value The new value of the evaluated expression.
         * @param {any} oldValue The old value of the evaluated expression.
         */
        ObservableAttributeControl.prototype._callListeners = function (newValue, oldValue) {
            var listeners = this._listeners, length = listeners.length;
            for (var i = 0; i < length; ++i) {
                listeners[i](newValue, oldValue);
            }
        };
        /**
         * @param {IPropertyChangedListener} listener The listener added by the Template Control.
         */
        ObservableAttributeControl.prototype._addListener = function (listener) {
            var listeners = this._listeners;
            listener = listener.bind(this.templateControl);
            listeners.push(listener);
            return function () {
                var index = listeners.indexOf(listener);
                if (index === -1) {
                    return;
                }
                listeners.splice(index, 1);
            };
        };
        /**
         */
        ObservableAttributeControl.prototype._getValue = function () {
            if (isNull(this.templateControl)) {
                return;
            }
            return this.evaluateExpression(this.attributes[this.attribute]);
        };
        /**
         */
        ObservableAttributeControl.prototype._observeProperty = function () {
            if (isNull(this.templateControl)) {
                return;
            }
            this._removeListener = this.observeExpression(this._setProperty, this.attributes[this.attribute]);
        };
        ObservableAttributeControl._inject = {
            _ContextManager: __ContextManagerStatic
        };
        return ObservableAttributeControl;
    })(AttributeControl);
    controls.ObservableAttributeControl = ObservableAttributeControl;
    /**
     */
    var Options = (function (_super) {
        __extends(Options, _super);
        function Options() {
            _super.apply(this, arguments);
            /**
             */
            this.property = 'options';
        }
        return Options;
    })(ObservableAttributeControl);
    controls.Options = Options;
    register.control(__Options, Options);
})(controls = exports.controls || (exports.controls = {}));
/**
 */
var App = (function () {
    /**
     */
    function App() {
        /**
         */
        this.uid = uniqueId(__Plat);
        /**
         */
        this._log = App._log;
        var navigator = this.navigator = acquire(__NavigatorInstance);
        navigator.initialize(acquire(__RouterStatic).currentRouter());
    }
    /**
     */
    App.start = function () {
        if (!App._compat.isCompatible) {
            return App._log.error(new Error('PlatypusTS only supports modern browsers where ' +
                'Object.defineProperty is defined'));
        }
        App.__addPlatCss();
        var _EventManager = App._EventManager;
        _EventManager.dispose(__APP);
        _EventManager.on(__APP, __ready, App.__ready);
        _EventManager.on(__APP, __shutdown, App.__shutdown);
        _EventManager.initialize();
    };
    /**
     * @param {dependency.Injector<App>} appInjector The injector for
     * injecting the app instance.
     */
    App.registerApp = function (appInjector) {
        if (!isNull(App.app) && isString(App.app.uid)) {
            App._EventManager.dispose(App.app.uid);
        }
        App.__injector = appInjector;
    };
    /**
     * @param {Node} node The node at which DOM compilation begins.
     */
    App.load = function (node) {
        var _LifecycleEvent = App._LifecycleEvent, _compiler = App._compiler, body = App._document.body, head = App._document.head;
        _LifecycleEvent.dispatch(__beforeLoad, App);
        if (isNull(node)) {
            body.setAttribute(__Hide, '');
            postpone(function () {
                _compiler.compile([head]);
                _compiler.compile([body]);
                body.removeAttribute(__Hide);
            });
            return;
        }
        if (isFunction(node.setAttribute)) {
            node.setAttribute(__Hide, '');
            postpone(function () {
                _compiler.compile([node]);
                node.removeAttribute(__Hide);
            });
            return;
        }
        postpone(function () {
            _compiler.compile([node]);
        });
    };
    /**
     * @param {events.LifecycleEvent} ev The LifecycleEvent for the app ready.
     */
    App.__ready = function (ev) {
        dependency.Injector.initialize();
        App.__registerAppEvents(ev);
        if (!ev.defaultPrevented) {
            App.load();
        }
    };
    /**
     */
    App.__shutdown = function () {
        var app = navigator.app, _LifecycleEvent = App._LifecycleEvent, ev;
        if (!isNull(app) && isFunction(app.exitApp)) {
            ev = _LifecycleEvent.dispatch(__exiting, App);
            if (ev.defaultPrevented) {
                return;
            }
            app.exitApp();
        }
    };
    /**
     */
    App.__registerAppEvents = function (ev) {
        var appInjector = App.__injector;
        if (isNull(appInjector) || !isFunction(appInjector.inject)) {
            return;
        }
        var app = App.app = appInjector.inject();
        app.on(__suspend, app.suspend);
        app.on(__resume, app.resume);
        app.on(__online, app.online);
        app.on(__offline, app.offline);
        app.on(__error, app.error);
        app.on(__exiting, app.exiting);
        if (isFunction(app.ready)) {
            app.ready(ev);
        }
    };
    /**
     */
    App.__addPlatCss = function () {
        var _document = App._document;
        if (App._compat.platCss) {
            return;
        }
        else if (!isNull(_document.styleSheets) && _document.styleSheets.length > 0) {
            _document.styleSheets[0].insertRule('[plat-hide] { display: none !important; }', 0);
            return;
        }
        var style = document.createElement('style');
        style.textContent = '[plat-hide] { display: none !important; }';
        document.head.appendChild(style);
    };
    /**
     * @param {events.LifecycleEvent} ev The LifecycleEvent object.
     */
    App.prototype.suspend = function (ev) { };
    /**
     * @param {events.LifecycleEvent} ev The LifecycleEvent object.
     */
    App.prototype.resume = function (ev) { };
    /**
     * @param {events.ErrorEvent<Error>} ev The ErrorEvent object.
     */
    App.prototype.error = function (ev) { };
    /**
     * @param {events.LifecycleEvent} ev The LifecycleEvent object.
     */
    App.prototype.ready = function (ev) { };
    /**
     * @param {events.LifecycleEvent} ev The LifecycleEvent object.
     */
    App.prototype.exiting = function (ev) { };
    /**
     * @param {events.LifecycleEvent} ev The LifecycleEvent object.
     */
    App.prototype.online = function (ev) { };
    /**
     * @param {events.LifecycleEvent} ev The LifecycleEvent object.
     */
    App.prototype.offline = function (ev) { };
    /**
     * @param {string} name The name of the event to send, cooincides with the name used in the
     * app.on() method.
     * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
     */
    App.prototype.dispatchEvent = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _EventManager = App._EventManager || acquire(__EventManagerStatic);
        _EventManager.dispatch(name, this, _EventManager.DIRECT, args);
    };
    /**
     * @param {string} name The name of the event, cooinciding with the DispatchEvent name.
     * @param {(ev: events.DispatchEvent, ...args: Array<any>) => void} listener The method called when
     * the DispatchEvent is fired.
     */
    App.prototype.on = function (name, listener) {
        var _EventManager = App._EventManager || acquire(__EventManagerStatic);
        return _EventManager.on(this.uid, name, listener, this);
    };
    /**
     * @param {Node} node The node where at which DOM compilation begins.
     */
    App.prototype.load = function (node) {
        App.load(node);
    };
    /**
     */
    App.prototype.exit = function () {
        this.dispatchEvent(__shutdown);
    };
    /**
     */
    App.app = null;
    return App;
})();
exports.App = App;
/**
 */
function IAppStatic(_compat, _EventManager, _document, _compiler, _LifecycleEvent, _log) {
    App._compat = _compat;
    App._EventManager = _EventManager;
    App._document = _document;
    App._compiler = _compiler;
    App._LifecycleEvent = _LifecycleEvent;
    App._log = _log;
    return App;
}
exports.IAppStatic = IAppStatic;
register.injectable(__AppStatic, IAppStatic, [
    __Compat,
    __EventManagerStatic,
    __Document,
    __Compiler,
    __LifecycleEventStatic,
    __Log
], __STATIC);
/**
 */
function IApp(_AppStatic) {
    return _AppStatic.app;
}
exports.IApp = IApp;
register.injectable(__App, IApp, [__AppStatic], __INSTANCE);
