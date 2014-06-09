/**
 * PlatypusTS v0.0.1.9 (http://getplatypi.com) 
 * Copyright 2014 Platypi, LLC. All rights reserved. 
 * 
 * PlatypusTS is licensed under the GPL-3.0 found at  
 * http://opensource.org/licenses/GPL-3.0 
 */
module plat {
    /**
     * Injectables
     */
    var __AppStatic = '$AppStatic',
        __App = '$App',
        __Http = '$Http',
        __HttpConfig = '$HttpConfig',
        __Promise = '$Promise',
        __Compat = '$Compat',
        __ControlFactory = '$ControlFactory',
        __AttributeControlFactory = '$AttributeControlFactory',
        __Document = '$Document',
        __DispatchEventInstance = '$DispatchEventInstance',
        __ErrorEventStatic = '$ErrorEventStatic',
        __EventManagerStatic = '$EventManagerStatic',
        __LifecycleEventStatic = '$LifecycleEventStatic',
        __NavigationEventStatic = '$NavigationEventStatic',
        __ExceptionStatic = '$ExceptionStatic',
        __Parser = '$Parser',
        __Regex = '$Regex',
        __Tokenizer = '$Tokenizer',
        __NavigatorInstance = '$NavigatorInstance',
        __RoutingNavigator = '$RoutingNavigator',
        __ContextManagerStatic = '$ContextManagerStatic',
        __Compiler = '$Compiler',
        __CommentManagerFactory = '$CommentManagerFactory',
        __ElementManagerFactory = '$ElementManagerFactory',
        __NodeManagerStatic = '$NodeManagerStatic',
        __TextManagerFactory = '$TextManagerFactory',
        __CacheFactory = '$CacheFactory',
        __ManagerCache = '$ManagerCache',
        __TemplateCache = '$TemplateCache',
        __Animator = '$Animator',
        __AnimationInstance = '$AnimationInstance',
        __AttributesInstance = '$AttributesInstance',
        __BindableTemplatesFactory = '$BindableTemplatesFactory',
        __Dom = '$Dom',
        __DomEvents = '$DomEvents',
        __DomEventsConfig = '$DomEventsConfig',
        __DomEventInstance = '$DomEventInstance',
        __ResourcesFactory = '$ResourcesFactory',
        __TemplateControlFactory = '$TemplateControlFactory',
        __BaseViewControlFactory = '$BaseViewControlFactory',
        __Utils = '$Utils',
        __Browser = '$Browser',
        __BrowserConfig = '$BrowserConfig',
        __Router = '$Router',
        __UrlUtilsInstance = '$UrlUtilsInstance',
        __Window = '$Window',
        __LocalStorage = '$LocalStorage',
        __SessionStorage = '$SessionStorage',
        __Geolocation = '$Geolocation';
    
    /**
     * Controls
     */
    var __Plat = 'plat-',
        __Bind = __Plat + 'bind',
        __Href = __Plat + 'href',
        __Src = __Plat + 'src',
        __KeyDown = __Plat + 'keydown',
        __KeyPress = __Plat + 'keypress',
        __KeyUp = __Plat + 'keyup',
        __Name = __Plat + 'name',
        __Options = __Plat + 'options',
        __Checked = __Plat + 'checked',
        __Disabled = __Plat + 'disabled',
        __Selected = __Plat + 'selected',
        __ReadOnly = __Plat + 'readonly',
        __Visible = __Plat + 'visible',
        __Style = __Plat + 'style',
        __Tap = __Plat + 'tap',
        __Blur = __Plat + 'blur',
        __Change = __Plat + 'change',
        __Copy = __Plat + 'copy',
        __Cut = __Plat + 'cut',
        __Paste = __Plat + 'paste',
        __DblTap = __Plat + 'dbltap',
        __Focus = __Plat + 'focus',
        __Submit = __Plat + 'submit',
        __TouchStart = __Plat + 'touchstart',
        __TouchEnd = __Plat + 'touchend',
        __TouchMove = __Plat + 'touchmove',
        __TouchEnter = __Plat + 'touchenter',
        __TouchCancel = __Plat + 'touchcancel',
        __Hold = __Plat + 'hold',
        __Release = __Plat + 'release',
        __Swipe = __Plat + 'swipe',
        __SwipeLeft = __Plat + 'swipeleft',
        __SwipeRight = __Plat + 'swiperight',
        __SwipeUp = __Plat + 'swipeup',
        __SwipeDown = __Plat + 'swipedown',
        __Track = __Plat + 'track',
        __TrackLeft = __Plat + 'trackleft',
        __TrackRight = __Plat + 'trackright',
        __TrackUp = __Plat + 'trackup',
        __TrackDown = __Plat + 'trackdown',
        __Anchor = 'a',
        __ForEach = __Plat + 'foreach',
        __Html = __Plat + 'html',
        __If = __Plat + 'if',
        __Ignore = __Plat + 'ignore',
        __Select = __Plat + 'select',
        __Template = __Plat + 'template',
        __Routeport = __Plat + 'routeport',
        __Viewport = __Plat + 'viewport';
    
    /**
     * Animations
     */
    var __Hide = __Plat + 'hide',
        __Enter = __Plat + 'enter',
        __Leave = __Plat + 'leave',
        __Move = __Plat + 'move',
        __FadeIn = __Plat + 'fadein',
        __FadeOut = __Plat + 'fadeout';
    
    var __nativeIsArray = !!Array.isArray,
        __uids__: plat.IObject<Array<string>> = {};
    
    function noop(): void { }
    
    function extend(destination: any, ...sources: any[]): any {
        if (isNull(destination)) {
            return destination;
        }
    
        var deep = isBoolean(destination);
    
        if (deep) {
            destination = sources.shift();
        }
    
        var keys: Array<string>,
            property: any;
    
        forEach(sources, (source, k) => {
            if (!isObject(source)) {
                return;
            }
    
            keys = Object.keys(source);
    
            forEach(keys, (key) => {
                property = source[key];
                if (deep) {
                    if (isArray(property)) {
                        extend(deep, destination[key] || (destination[key] = []), property);
                        return;
                    } else if (isObject(property)) {
                        extend(deep, destination[key] || (destination[key] = {}), property);
                        return;
                    }
                }
                destination[key] = source[key];
            });
        });
    
        return destination;
    }
    
    function deepExtend(destination: any, ...sources: any[]): any {
        return extend.apply(null, [true, destination].concat(sources));
    }
    
    function isObject(obj: any): boolean {
        return obj != null && typeof obj === 'object';
    }
    
    function isWindow(obj: any): boolean {
        return !!(obj && obj.document && obj.setInterval);
    }
    
    function isDocument(obj: any): boolean {
        return !!(obj && obj.nodeType === Node.DOCUMENT_NODE);
    }
    
    function isNode(obj: any): boolean {
        return !!(obj && typeof obj.nodeType === 'number');
    }
    
    function isDocumentFragment(obj: any): boolean {
        return !!(obj && (<Node>obj).nodeType === Node.DOCUMENT_FRAGMENT_NODE);
    }
    
    function isFile(obj: any): boolean {
        return isObject(obj) && obj.toString() === '[object File]';
    }
    
    function isString(obj: any): boolean {
        return typeof obj === 'string';
    }
    
    function isRegExp(obj: any): boolean {
        return Object.prototype.toString.call(obj) === '[object RegExp]';
    }
    
    function isEmpty(obj: any): boolean {
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
    
    function isBoolean(obj: any): boolean {
        return typeof obj === 'boolean';
    }
    
    function isNumber(obj: any): boolean {
        return typeof obj === 'number' && !isNaN(obj);
    }
    
    function isFunction(obj: any): boolean {
        return typeof obj === 'function';
    }
    
    function isNull(obj: any): boolean {
        return obj === null || obj === undefined;
    }
    
    function isUndefined(obj: any): boolean {
        return obj === undefined;
    }
    
    function isArray(obj: any): boolean {
        if (__nativeIsArray) {
            return Array.isArray(obj);
        }
    
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
    
    function isArrayLike(obj: any): boolean {
        if (isNull(obj) || isWindow(obj) || isFunction(obj)) {
            return false;
        }
    
        return isString(obj) || obj.length >= 0;
    }
    
    function filter<T>(obj: any, iterator: (value: T, key: any, obj: any) => boolean, context?: any): Array<T> {
        var arr: Array<T> = [];
        if (isNull(obj)) {
            return arr;
        }
    
        if (isFunction(obj.filter)) {
            return obj.filter(iterator, context);
        }
    
        forEach<T>(obj, (value: T, key: any, obj: any) => {
            if (iterator(value, key, obj)) {
                arr.push(value);
            }
        });
    
        return arr;
    }
    
    function where(obj: any, properties: any): Array<any> {
        return filter(obj, (value)
            => !some(properties, (property, key)
                => (<any>value)[key] !== property));
    }
    
    function forEach<T>(array: Array <T>, iterator: (value: T, index: number, obj: any) => void, context?: any): Array < T>;
    function forEach<T>(obj: any, iterator: (value: T, key: string, obj: any) => void, context?: any): any;
    function forEach<T>(obj: any, iterator: (value: T, key: any, obj: any) => void, context?: any): any {
        if (isNull(obj) || !(isObject(obj) || isArrayLike(obj))) {
            return obj;
        }
    
        var i: number,
            key: string,
            length: number;
    
        if (isFunction(obj.forEach)) {
            return obj.forEach(iterator, context);
        } else if (isArrayLike(obj)) {
            for (i = 0, length = obj.length; i < length; ++i) {
                iterator.call(context, obj[i], i, obj);
            }
        } else {
            var keys = Object.keys(obj);
            length = keys.length;
            while (keys.length > 0) {
                key = keys.shift();
                iterator.call(context, obj[key], key, obj);
            }
        }
    
        return obj;
    }
    
    function map<T, U>(obj: any, iterator: (value: T, key: any, obj: any) => U, context?: any): Array<U> {
        var arr: Array<U> = [];
    
        if (isNull(obj)) {
            return arr;
        }
    
        if (isFunction(obj.map)) {
            return obj.map(iterator, context);
        }
    
        forEach(obj, (value, key) => {
            arr.push(iterator.call(context, value, key, obj));
        });
    
        return arr;
    }
    
    function pluck<T, U>(obj: any, key: string): Array<U> {
        return map<T, U>(obj, (value) => (<any>value)[key]);
    }
    
    function some<T>(obj: any, iterator: (value: T, key: any, obj: any) => boolean, context?: any): boolean {
        if (isNull(obj) || isFunction(obj)) {
            return false;
        }
    
        var i: number,
            key: string,
            length: number,
            ret: boolean;
    
        if (isFunction(obj.some)) {
            return obj.some(iterator, context);
        } else if (isArrayLike(obj)) {
            for (i = 0, length = obj.length; i < length; ++i) {
                ret = iterator.call(context, obj[i], i, obj);
                if (ret === true) {
                    return true;
                }
            }
        } else {
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
    
    function postpone(method: (...args: any[]) => void, args?: Array<any>, context?: any): plat.IRemoveListener {
        return defer(method, 0, args, context);
    }
    
    function defer(method: (...args: any[]) => void, timeout: number, args?: Array<any>, context?: any): plat.IRemoveListener {
        function defer() {
            method.apply(context, args);
        }
    
        var timeoutId = setTimeout(defer, timeout);
    
        return () => {
            clearTimeout(timeoutId);
        };
    }
    
    function uniqueId(prefix?: string): string {
        if (isNull(prefix)) {
            prefix = '';
        }
    
        var puid = __uids__[prefix];
    
        if (isNull(puid)) {
            puid = __uids__[prefix] = ['0', '/'];
        }
    
        var index = puid.length,
            charCode: number;
    
        while (index--) {
            charCode = puid[index].charCodeAt(0);
            //'9'
            if (charCode === 57) {
                puid[index] = 'A';
                return join();
            }
    
            //'Z'
            if (charCode === 90) {
                puid[index] = 'a';
                return join();
            }
    
            //'z'
            if (charCode === 122) {
                puid[index] = '0';
            } else {
                puid[index] = String.fromCharCode(charCode + 1);
                return join();
            }
        }
    
        puid.unshift('0');
    
        function join(): string {
            return prefix + puid.join('');
        }
    
        return join();
    }
    
    var camelCaseRegex: RegExp;
    
    function camelCase(str: string): string {
        if (!isString(str) || isEmpty(str)) {
            return str;
        }
    
        str = str.charAt(0).toLowerCase() + str.substr(1);
        camelCaseRegex = camelCaseRegex || (<plat.expressions.IRegex>plat.acquire(__Regex)).camelCaseRegex;
    
        return str.replace(camelCaseRegex,
            (match: string, delimiter?: string, char?: string, index?: number)
                => index ? char.toUpperCase() : char);
    }
    
    var __nodeNameRegex = /<([\w:]+)/,
        __option = [1, '<select multiple="multiple">', '</select>'],
        __table = [1, '<table>', '</table>'],
        __tableData = [3, '<table><tbody><tr>', '</tr></tbody></table>'],
        __svg = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">', '</svg>'],
        __innerTableWrappers: plat.IObject<Array<any>> = {
            thead: __table,
            tbody: __table,
            tfoot: __table,
            colgroup: __table,
            caption: __table,
            tr: [2, '<table><tbody>', '</tbody></table>'],
            col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
            td: __tableData,
            th: __tableData
        },
        __innerHtmlWrappers: plat.IObject<Array<any>> = extend({}, __innerTableWrappers, {
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
    
    function appendChildren(nodeList: any, root?: Node): Node {
        var isFragment = isDocumentFragment(root),
            nullRoot = isNull(root),
            fragment: DocumentFragment = isFragment ?
            <DocumentFragment>root :
            (plat.acquire(__Document)).createDocumentFragment();
    
        if (nullRoot) {
            root = fragment;
        }
    
        var list: Array<Node>;
    
        if (isFunction(nodeList.push)) {
            list = nodeList;
        } else {
            list = Array.prototype.slice.call(nodeList);
        }
    
        while (list.length > 0) {
            fragment.insertBefore(list.shift(), null);
        }
    
        if (!(isFragment || nullRoot)) {
            root.appendChild(fragment);
        }
    
        return root;
    }
    
    function clearNode(node: Node): void {
        var childNodes = Array.prototype.slice.call(node.childNodes);
    
        while (childNodes.length > 0) {
            node.removeChild(childNodes.pop());
        }
    }
    
    function clearNodeBlock(nodeList: any, parent: Node): void {
        if (!isFunction(nodeList.push)) {
            nodeList = Array.prototype.slice.call(nodeList);
        }
    
        if (!isNull(parent)) {
            clearNodeBlockWithParent(nodeList, parent);
            return;
        }
    
        var node: Node;
    
        while (nodeList.length > 0) {
            node = nodeList.pop();
            parent = node.parentNode;
    
            if (isNull(parent)) {
                continue;
            }
    
            parent.removeChild(node);
        }
    }
    
    function clearNodeBlockWithParent(nodeList: Array<Node>, parent: Node): void {
        while (nodeList.length > 0) {
            parent.removeChild(nodeList.pop());
        }
    }
    
    function stringToNode(html: string): Node {
        var $compat: plat.ICompat = plat.acquire(__Compat),
            $document: Document = plat.acquire(__Document),
            nodeName = __nodeNameRegex.exec(html),
            element = <HTMLElement>$document.createElement('div');
    
        if (isNull(nodeName)) {
            element = innerHtml(element, html);
            return element.removeChild(element.lastChild);
        }
    
        // trim html string
        html = html.trim();
    
        var mapTag = nodeName[1];
    
        if ($compat.pushState && isUndefined(__innerTableWrappers[mapTag])) {
            return innerHtml(element, html);
        } else if (mapTag === 'body') {
            element = innerHtml($document.createElement('html'), html);
            return element.removeChild(element.lastChild);
        }
    
        var wrapper = __innerHtmlWrappers[mapTag] || (<any>__innerHtmlWrappers)._default,
            depth = wrapper[0],
            parentStart = wrapper[1],
            parentEnd = wrapper[2];
    
        element = innerHtml(element, parentStart + html + parentEnd);
    
        while (depth-- > 0) {
            element = <HTMLElement>element.lastChild;
        }
    
        return element;
    }
    
    function setInnerHtml(node: Node, html: string): Node {
        clearNode(node);
    
        if (isEmpty(html)) {
            return;
        }
    
        var element = stringToNode(html);
    
        if (element.childNodes.length > 0) {
            appendChildren(element.childNodes, node);
        } else {
            node.insertBefore(element, null);
        }
    
        return node;
    }
    
    function insertBefore(parent: Node, nodes: any, endNode: Node = null): Array<Node> {
        if (isNull(parent)) {
            return;
        }
    
        var fragment: DocumentFragment;
    
        if (isNode(nodes)) {
            fragment = nodes;
    
            nodes = Array.prototype.slice.call(fragment.childNodes);
            parent.insertBefore(fragment, endNode);
    
            return nodes;
        }
    
        if (!isFunction(nodes.push)) {
            nodes = Array.prototype.slice.call(nodes);
        }
    
        var $document = plat.acquire(__Document),
            length = nodes.length;
    
        fragment = $document.createDocumentFragment();
    
        for (var i = 0; i < length; ++i) {
            fragment.insertBefore(nodes[i], null);
        }
    
        parent.insertBefore(fragment, endNode);
    
        return nodes;
    }
    
    function replace(node: Node): Array<Node> {
        var parent = node.parentNode,
            nodes = insertBefore(parent, node.childNodes, node);
    
        parent.removeChild(node);
    
        return nodes;
    }
    
    function replaceWith(node: Node, newNode: HTMLElement): HTMLElement;
    function replaceWith(node: Node, newNode: Element): Element;
    function replaceWith(node: Node, newNode: Node): Node;
    function replaceWith(node: any, newNode: any): any {
        if (isNull(newNode)) {
            return newNode;
        }
    
        if (node.nodeType === Node.ELEMENT_NODE) {
            var attributes = node.attributes,
                length = attributes.length,
                attribute: Attr;
    
            for (var i = 0; i < length; ++i) {
                attribute = attributes[i];
                newNode.setAttribute(attribute.name, attribute.value);
            }
        }
    
        var parent = node.parentNode;
    
        insertBefore(newNode, node.childNodes);
        parent.replaceChild(newNode, node);
    
        return newNode;
    }
    
    function serializeHtml(html?: string): DocumentFragment {
        var $document = plat.acquire(__Document),
            templateElement = $document.createDocumentFragment();
    
        if (!isEmpty(html)) {
            setInnerHtml(templateElement, html);
        }
    
        return templateElement;
    }
    
    function removeBetween(startNode: Node, endNode?: Node): void {
        if (isNull(startNode)) {
            return;
        }
    
        var currentNode = startNode.nextSibling,
            parentNode = startNode.parentNode,
            tempNode: Node;
    
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
    
    function removeAll(startNode: Node, endNode?: Node): void {
        if (isNull(startNode)) {
            return;
        }
    
        removeBetween(startNode, endNode);
    
        removeNode(startNode);
        removeNode(endNode);
    }
    
    /**
     * Safely sets innerHTML of an element. Uses MSApp.execUnsafeLocalFunction if 
     * available.
     */
    function innerHtml(element: HTMLElement, html: string): HTMLElement {
        var $compat: plat.ICompat = plat.acquire(__Compat);
    
        if ($compat.msApp) {
            MSApp.execUnsafeLocalFunction(() => {
                element.innerHTML = html;
            });
        } else {
            element.innerHTML = html;
        }
    
        return element;
    }
    
    function removeNode(node: Node): void {
        if (isNull(node)) {
            return;
        }
    
        var parentNode = node.parentNode;
    
        if (!isNull(parentNode)) {
            node.parentNode.removeChild(node);
        }
    }
    
    function addClass(element: HTMLElement, className: string): void {
        if (isUndefined(element.classList)) {
            if (isEmpty(element.className)) {
                element.className = className;
                return;
            }
    
            element.className += ' ' + className;
            return;
        }
    
        element.classList.add(className);
    }
    
    function removeClass(element: HTMLElement, className: string): void {
        if (isUndefined(element.classList)) {
            if (element.className === className) {
                element.className = '';
                return;
            }
    
            element.className
                .replace(new RegExp('^' + className + '\\s|\\s' + className + '$|\\s' + className + '|' + className + '\\s', 'g'), '');
            return;
        }
    
        element.classList.remove(className);
    }
    
    /**
     * An IInjectorObject of plat.IControls. Contains all the registered
     * controls for an application.
     */
    var controlInjectors: plat.dependency.IInjectorObject<plat.IControl> = {};
    
    /**
     * An IInjectorObject of plat.ui.IBaseViewControls. Contains all the registered
     * view controls for an application.
     */
    var viewControlInjectors: plat.dependency.IInjectorObject<plat.ui.IBaseViewControl> = {};
    
    /**
     * An IInjectorObject of objects. Contains all the registered
     * injectables for an application.
     */
    var injectableInjectors: plat.dependency.IInjectorObject<plat.dependency.IInjector<any>> = {};
    
    /**
     * An IInjectorObject of static objects. Contains all the registered
     * static injectables for an application.
     */
    var staticInjectors: plat.dependency.IInjectorObject<plat.dependency.IInjector<any>> = {};
    
    export module register {
        /**
         * Static injectables will be injected before the application loads. This provides a way to create 
         * a static constructor and load dependencies into static class properties.
         */
        export var STATIC = 'static';

        /**
         * Singleton injectables will contain a constructor. A Singleton injectable will be instantiated once and 
         * used throughout the application lifetime. It will be instantiated when another component is injected 
         * and lists it as a dependency.
         */
        export var SINGLETON = 'singleton';

        /**
         * Instance injectables will contain a constructor. An Instance injectable will be instantiated multiple times 
         * throughout the application lifetime. It will be instantiated whenever another component is injected 
         * and lists it as a dependency.
         */
        export var INSTANCE = 'instance';

        /**
         * Factory injectables will not contain a constructor but will instead contain a method for obtaining an 
         * instance, such as getInstance() or create(). It will be injected before the application loads, similar to a Static 
         * injectable.
         */
        export var FACTORY = 'factory';

        /**
         * Class injectables are essentially a direct reference to a class's constructor. It may contain both 
         * static and instance methods as well as a constructor for creating a new instance.
         */
        export var CLASS = 'class';

        /**
         * Generic function for creating an Injector and adding it to an IInjectorObject.
         * 
         * @param obj The IInjectorObject to which to add an Injector.
         * @param name The name used to set/get the Injector from the IInjectorObject.
         * @param Type The constructor or function definition for the Injector.
         * @param dependencies An array of strings representing the dependencies needed for the
         * injector.
         * @param injectableType The injectable type
         * 
         * @return {register} The object that contains the register methods (for method chaining).
         */
        function add(obj: dependency.IInjectorObject<any>, name: string,
                Type: any, dependencies?: Array<any>, injectableType?: string): typeof register {
            var injector = obj[name] = new dependency.Injector<any>(name, Type, dependencies, injectableType);

            if (injectableType === FACTORY || injectableType === STATIC || injectableType === CLASS) {
                staticInjectors[name] = injector;
            }

            return register;
        }

        /**
         * Registers the IApp with the framework. The framework will instantiate the IApp when needed, and wire up
         * the Application Lifecycle events. The dependencies array corresponds to injectables that will be 
         * passed into the Constructor of the app.
         * 
         * @param name The name of your app.
         * @param Type The constructor for the IApp.
         * @param dependencies An array of strings representing the dependencies needed for the app injector.
         */
        export function app(name: string, Type: new (...args: any[]) => IApp, dependencies?: Array<any>): typeof register {
            var app = new dependency.Injector<IApp>(name, Type, dependencies),
                $appStatic: IAppStatic = acquire(__AppStatic);

            $appStatic.registerApp(app);
            return register;
        }

        /**
         * Registers an IControl with the framework. The framework will instantiate the IControl when needed. The 
         * dependencies array corresponds to injectables that will be passed into the Constructor of the control.
         * 
         * @param name The control type, corresponding to the HTML notation for creating a new IControl (e.g. 'plat-foreach').
         * @param Type The constructor for the IControl.
         * @param dependencies An array of strings representing the dependencies needed for the IControl injector.
         * 
         * @example register.control('my-tap', MyTap, [plat.expressions.IParser]);
         */
        export function control(name: string, Type: new (...args: any[]) => IControl, dependencies?: Array<any>): typeof register {
            if (isString(name)) {
                name = name.toLowerCase();
            }

            return add(controlInjectors, name, Type, dependencies);
        }

        /**
         * Registers a ViewControl with the framework. The framework will instantiate the control when needed. The 
         * dependencies array corresponds to injectables that will be passed into the Constructor of the control.
         * 
         * @param name The control type, corresponding to the HTML notation for creating a new IViewControl. Used for navigation 
         * to the specified ViewControl.
         * @param Type The constructor for the IViewControl.
         * @param dependencies An optional array of strings representing the dependencies needed for the IViewControl injector.
         * 
         * @example register.viewControl('my-view-control', MyViewControl);
         */
        export function viewControl<T>(name: string, Type: new (...args: any[]) => ui.IBaseViewControl,
            dependencies?: Array<any>): typeof register;
        /**
         * Registers a WebViewControl with the framework. The framework will instantiate the control when needed. The 
         * dependencies array corresponds to injectables that will be passed into the Constructor of the control.
         * 
         * @param name The control type, corresponding to the HTML notation for creating a new IWebViewControl. Used for navigation 
         * to the specified WebViewControl.
         * @param Type The constructor for the IWebViewControl.
         * @param dependencies An optional array of strings representing the dependencies needed for the IWebViewControl injector.
         * @param routes Optional route strings (or regular expressions) used for matching a URL to the registered IWebViewControl.
         * 
         * @example register.viewControl('my-view-control', MyViewControl, null, ['customers/:customer(/:ordernumber)']);
         */
        export function viewControl<T>(name: string, Type: new (...args: any[]) => ui.IWebViewControl,
            dependencies?: Array<any>, routes?: Array<any>): typeof register;
        export function viewControl<T>(name: string, Type: new (...args: any[]) => ui.IBaseViewControl,
            dependencies?: Array<any>, routes?: Array<any>): typeof register {
            if (isString(name)) {
                name = name.toLowerCase();
            }

            var ret = add(viewControlInjectors, name, Type, dependencies);

            if (isArray(routes)) {
                var $Router: web.IRouter = acquire(__Router);
                $Router.registerRoutes(name, routes);
            }

            return ret;
        }

        /**
         * Registers an injectable with the framework. Injectables are objects that can be used for dependency injection into other objects.
         * The dependencies array corresponds to injectables that will be passed into the Constructor of the injectable.
         * 
         * @param name The name of the injector, used when another component is specifying dependencies.
         * @param dependencies An array of strings representing the dependencies needed for the injectable's injector.
         * @param Type The constructor for the injectable. The injectable will only be instantiated once during the application
         * lifetime.
         * @param injectableType Specifies the type of injectable, either register.SINGLETON, 
         * register.STATIC, register.INSTANCE, register.FACTORY, register.CLASS (defaults to register.SINGLETON).
         * 
         * @example register.injectable('$CacheFactory', [plat.expressions.IParser], Cache);
         * @example register.injectable('database', MyDatabase, null, register.INSTANCE);
         */
        export function injectable(name: string, Type: new (...args: any[]) => void,
            dependencies?: Array<any>, injectableType?: string): typeof register;
        /**
         * Registers an injectable with the framework. Injectables are objects that can be used for dependency injection into other objects.
         * The dependencies array corresponds to injectables that will be passed into the injectable method.
         * 
         * @param name The name of the injector, used when another component is specifying dependencies.
         * @param dependencies An array of strings representing the dependencies needed for the injectable's injector.
         * @param Type The constructor for the injectable. The injectable will only be instantiated once during the application
         * lifetime.
         * @param injectableType Specifies the type of injectable, either register.SINGLETON, 
         * register.STATIC, register.INSTANCE, register.FACTORY, register.CLASS (defaults to register.SINGLETON).
         * 
         * @return {register} The object that contains the register methods (for method chaining).
         * 
         * @example register.injectable('$CacheFactory', [plat.expressions.IParser], 
         *  function(parser: plat.expressions.IParser) { return { ... }; });
         * @example register.injectable('database', function() { return new Database(); }, null, register.INSTANCE);
         */
        export function injectable(name: string, method: (...args: any[]) => any,
            dependencies?: Array<any>, injectableType?: string): typeof register;
        export function injectable(name: string, Type: any, dependencies?: Array<any>, injectableType?: string): typeof register {
            return add(injectableInjectors, name, Type, dependencies, injectableType || SINGLETON);
        }
    }
    export module dependency {
        /**
         * The Injector class is used for dependency injection. You can create an injector object,
         * specify dependencies and a constructor for your component. When the injector object is
         * 'injected' it will create a new instance of your component and pass in the dependencies
         * to the constructor.
         */
        export class Injector<T> implements IInjector<T> {
            /**
             * Initializes all static injectors.
             */
            static initialize(): void {
                var injectors = staticInjectors,
                    keys = Object.keys(injectors),
                    length = keys.length;

                for (var i = 0; i < length; ++i) {
                    injectors[keys[i]].inject();
                }

                staticInjectors = {};
            }

            /**
             * Gathers and returns the array of listed dependencies.
             * 
             * @param dependencies The array of dependencies specified 
             * by either their Constructor or their registered name.
             */
            static getDependencies(dependencies: Array<any>): Array<IInjector<any>> {
                if (isNull(dependencies) || isEmpty(dependencies)) {
                    return [];
                }

                var deps: Array<IInjector<any>> = [],
                    length = dependencies.length,
                    dependency: any;

                for (var i = 0; i < length; ++i) {
                    dependency = dependencies[i];
                    if (isNull(dependency) || dependency === 'noop') {
                        deps.push(Injector.__noop());
                        continue;
                    } else if (Injector.__isInjector(dependency)) {
                        return dependencies;
                    }

                    deps.push(Injector.__locateInjector(dependency));
                }

                return deps;
            }

            /**
             * Converts dependencies specified by their Constructors into 
             * equivalent dependencies specified by their registered string 
             * name.
             * 
             * @param dependencies The array of dependencies specified 
             * by either their Constructor or their registered name.
             */
            static convertDependencies(dependencies: Array<any>): Array<string> {
                if (!isArray(dependencies)) {
                    return [];
                }
                var deps: Array<string> = [],
                    length = dependencies.length,
                    dependency: any,
                    injector: Injector<any>,
                    value: string;

                for (var i = 0; i < length; ++i) {
                    dependency = dependencies[i];

                    if (isNull(dependency)) {
                        deps.push('noop');
                        continue;
                    }

                    value = Injector.__getInjectorName(dependency);

                    deps.push(value);
                }

                return deps;
            }

            private static __getInjectorName(dependency: any): string {
                if (isNull(dependency)) {
                    return 'noop';
                } else if (isString(dependency)) {
                    return dependency;
                } else if (dependency === window) {
                    return __Window;
                } else if (dependency === window.document) {
                    return __Document;
                }

                var injectors = injectableInjectors,
                    injector: IInjector<any>,
                    keys = Object.keys(injectors),
                    length = keys.length,
                    key: string,
                    value: any;

                for (var i = 0; i < length; ++i) {
                    key = keys[i];
                    injector = injectors[key];

                    value = injector.Constructor;

                    if (value === dependency) {
                        return key;
                    }
                }

                return 'noop';
            }

            private static __construct(Constructor: any, args: Array<any>, pattern: string): any {
                if (isNull(Constructor) || isNull(Constructor.prototype)) {
                    return Constructor;
                }
                var obj = Object.create(Constructor.prototype),
                    ret = obj.constructor.apply(obj, args);

                if (!isUndefined(ret)) {
                    return ret;
                }

                return obj;
            }

            private static __locateInjector(Constructor: any): any {
                if (isNull(Constructor)) {
                    return;
                } else if (isString(Constructor)) {
                    return injectableInjectors[Constructor];
                } else if (Constructor === window) {
                    return (<any>injectableInjectors).$Window;
                } else if (Constructor === window.document) {
                    return (<any>injectableInjectors).$Document;
                }

                var injectors = injectableInjectors,
                    injector: IInjector<any>,
                    keys = Object.keys(injectors),
                    length = keys.length,
                    value: any;

                for (var i = 0; i < length; ++i) {
                    injector = injectors[keys[i]];

                    if (injector.Constructor === Constructor) {
                        return injector;
                    }
                }

                return Injector.__wrap(Constructor);
            }

            private static __wrap(value: any): IInjector<any> {
                return {
                    inject: () => value,
                    name: 'wrapped',
                    __dependencies: [],
                    Constructor: value
                };
            }

            private static __noop(): IInjector<any> {
                return {
                    inject: noop,
                    type: 'noop',
                    name: 'noop',
                    __dependencies: [],
                    Constructor: <any>noop
                };
            }

            private static __isInjector(dependency: Injector<any>): boolean {
                return isFunction(dependency.inject) &&
                    !isUndefined(dependency.type) &&
                    !isUndefined(dependency.name) &&
                    !isUndefined(dependency.Constructor);
            }

            private __dependencies: Array<any>;

            /**
             * @param name The name of the injected type.
             * @param dependencies An array of strings specifying the injectable dependencies for the 
             * associated constructor.
             * @param Constructor The constructor method for the component requiring the dependency 
             * injection.
             * @param type The type of injector, used for injectables specifying a injectableType of 
             * STATIC, SINGLETON, FACTORY, INSTANCE, or CLASS. The default is SINGLETON.
             */
            constructor(public name: string, public Constructor: new () => T, dependencies?: Array<any>, public type?: string) {
                var deps = this.__dependencies = Injector.convertDependencies(dependencies),
                    index = deps.indexOf('noop');

                if (index > -1) {
                    var dependency = String(dependencies[index] || '');
                
                    throw new TypeError('Could not resolve dependency ' +
                        dependency.substring(9, dependency.indexOf('(')) +
                        ' for ' +
                        name +
                        '. Are you using a static injectable Type?');
                }

                if (name === __AppStatic) {
                    var App: IAppStatic = <IAppStatic>(<any>this).inject();
                    App.start();
                }
            }

            /**
             * Gathers the dependencies for the Injector object and creates a new instance of the 
             * Constructor, passing in the dependencies in the order they were specified. If the 
             * Injector contains a Constructor for an injectable and the Constructor is registered 
             * as a SINGLE type it will only inject that injectable once.
             */
            inject(): T {
                var toInject: any = [],
                    type = this.type;

                this.__dependencies = Injector.getDependencies(this.__dependencies);

                var dependencies: Array<IInjector<any>> = this.__dependencies || [],
                    length = dependencies.length,
                    dependency: string,
                    injectable: any;

                for (var i = 0; i < length; ++i) {
                    toInject.push(dependencies[i].inject());
                }

                injectable = <T>Injector.__construct(this.Constructor, toInject, type);

                if (type === register.SINGLETON || type === register.FACTORY ||
                    type === register.STATIC || type === register.CLASS) {
                    this._wrapInjector(injectable);
                }

                return injectable;
            }

            /**
             * Wraps the injector with the instantiated value in the case of a 
             * SINGLE or STATIC type so that it does not re-instantiate.
             */
            _wrapInjector(value: any): IInjector<any> {
                var name = this.name;
                return injectableInjectors[name] = <IInjector<any>>{
                    type: this.type,
                    name: name,
                    __dependencies: this.__dependencies,
                    Constructor: this.Constructor,
                    inject: () => <T>value
                };
            }
        }

        /**
         * An object whose values are all IInjectors.
         */
        export interface IInjectorObject<T> extends IObject<IInjector<T>> { }

        /**
         * Describes an object that handles dependency-injection for a Constructor.
         */
        export interface IInjector<T> {
            /**
             * Gathers the dependencies for the IInjector object and creates a new instance of the 
             * Constructor, passing in the dependencies in the order they were specified. If the 
             * Injector contains a Constructor for an injectable it will only inject that injectable
             * once.
             */
            inject(): T;

            /**
             * The constructor method for the component requiring the dependency injection.
             */
            Constructor: new () => T;

            /**
             * The type of injector, used for injectables specifying a register.injectableType of 
             * STATIC, SINGLE, or MULTI. The default is SINGLE.
             */
            type?: string;

            /**
             * The name registered for the injector.
             */
            name: string;
        }
    }
    /**
     * Returns the requested injectable dependency.
     * 
     * @param dependency The dependency Type to return.
     * @param {T} The requested dependency.
     */
    export function acquire<T>(dependency: () => T): T;
    /**
     * Returns the requested injectable dependency.
     * 
     * @param dependency The dependency Type to return.
     * @param {any} The requested dependency.
     */
    export function acquire(dependency: Function): any;
    /**
     * Returns the requested injectable dependency.
     * 
     * @param dependency An array of Types specifying the injectable dependencies.
     * @return {Array<any>} The dependencies, in the order they were requested.
     */
    export function acquire(dependencies: Array<Function>): Array<any>;
    /**
     * Returns the requested injectable dependency.
     * 
     * @param dependency The injectable dependency type to return.
     * @param {any} The requested dependency.
     */
    export function acquire(dependency: string): any;
    /**
     * Gathers dependencies and returns them as an array in the order they were requested.
     * 
     * @param dependencies An array of strings specifying the injectable dependencies.
     * @return {Array<any>} The dependencies, in the order they were requested.
     */
    export function acquire(dependencies: Array<string>): Array<any>;
    /**
     * Gathers dependencies and returns them as an array in the order they were requested.
     * 
     * @param dependencies An array of strings or Functions specifying the injectable dependencies.
     * @return {Array<any>} The dependencies, in the order they were requested.
     */
    export function acquire(dependencies: Array<any>): Array<any>;
    export function acquire(dependencies: any) {
        var deps: Array<dependency.IInjector<any>>,
            array = isArray(dependencies);

        if (array) {
            deps = dependency.Injector.getDependencies(dependencies);
        } else {
            deps = dependency.Injector.getDependencies([dependencies]);
        }

        var length = deps.length,
            output: Array<any> = [];

        for (var i = 0; i < length; ++i) {
            output.push(deps[i].inject());
        }

        if (!array) {
            return output[0];
        }

        return output;
    }

    /**
     * Returns the requested dependency or gathers dependencies and passes them back 
     * as an array in the order they were specified.
     */
    export interface IAcquire {
        /**
         * Returns the requested injectable dependency.
         * 
         * @param dependency The dependency Type to return.
         * @param {T} The requested dependency.
         */
        <T>(dependency: () => T): T;
        /**
         * Returns the requested injectable dependency.
         * 
         * @param dependency The dependency Type to return.
         * @param {any} The requested dependency.
         */
        (dependency: Function): any;
        /**
         * Returns the requested injectable dependency.
         * 
         * @param dependency An array of Types specifying the injectable dependencies.
         * @return {Array<any>} The dependencies, in the order they were requested.
         */
        (dependencies: Array<Function>): Array<any>;
        /**
         * Returns the requested injectable dependency.
         * 
         * @param dependency The injectable dependency type to return.
         * @param {any} The requested dependency.
         */
        (dependency: string): any;
        /**
         * Gathers dependencies and returns them as an array in the order they were requested.
         * 
         * @param dependencies An array of strings specifying the injectable dependencies.
         * @return {Array<any>} The dependencies, in the order they were requested.
         */
        (dependencies: Array<string>): Array<any>;
        /**
         * Gathers dependencies and returns them as an array in the order they were requested.
         * 
         * @param dependencies An array of strings or Functions specifying the injectable dependencies.
         * @return {Array<any>} The dependencies, in the order they were requested.
         */
        (dependencies: Array<any>): Array<any>;
    }

    /**
     * Manages the throwing and consuming of errors and warnings.
     */
    export class Exception {
        /**
         * Method for sending a warning to all listeners. Will 
         * not throw an error.
         * 
         * @param message The message to be sent to the listeners.
         * @param type Denotes the type of fatal exception.
         */
        static warn(message: string, type?: number): void {
            raise(message, type, false);
        }

        /**
         * Method for sending a fatal error to all listeners. Will
         * throw an error.
         * 
         * @param error The Error to be sent to all the listeners.
         * @param type Denotes the type of fatal exception. 
         */
        static fatal(error: Error, type?: number): void;
        /**
         * Method for sending a fatal message to all listeners. Will
         * throw an error.
         * 
         * @param message The message to be sent to all the listeners.
         * @param type Denotes the type of fatal exception.
         */
        static fatal(message: string, type?: number): void;
        static fatal(message: any, type?: number) {
            raise(message, type, true);
        }

        /**
         * Exception Type
         */
        static PARSE = 0;
        /**
         * Exception Type
         */
        static COMPILE = 1;
        /**
         * Exception Type
         */
        static BIND = 2;
        /**
         * Exception Type
         */
        static NAME = 3;
        /**
         * Exception Type
         */
        static NAVIGATION = 4;
        /**
         * Exception Type
         */
        static TEMPLATE = 5;
        /**
         * Exception Type
         */
        static AJAX = 6;
        /**
         * Exception Type
         */
        static CONTEXT = 7;
        /**
         * Exception Type
         */
        static EVENT = 8;
        /**
         * Exception Type
         */
        static INJECTABLE = 9;
        /**
         * Exception Type
         */
        static COMPAT = 10;
        /**
         * Exception Type
         */
        static PROMISE = 11;

    }

    /**
     * The Type for referencing the '$ExceptionStatic' injectable as a dependency.
     */
    export function IExceptionStatic(): IExceptionStatic {
        return Exception;
    }

    register.injectable(__ExceptionStatic, IExceptionStatic, null, register.STATIC);

    /**
     * The intended external interface for the '$ExceptionStatic' injectable.
     */
    export interface IExceptionStatic {
        /**
         * Method for sending a warning to all listeners. Will
         * not throw an error.
         *
         * @param message The message to be sent to the listeners.
         * @param type Denotes the type of fatal exception.
         */
        warn(message: string, type?: number): void;

        /**
         * Method for sending a fatal error to all listeners. Will
         * throw an error.
         *
         * @param error The Error to be sent to all the listeners.
         * @param type Denotes the type of fatal exception.
         */
        fatal(error: Error, type?: number): void;
        /**
         * Method for sending a fatal message to all listeners. Will
         * throw an error.
         *
         * @param message The message to be sent to all the listeners.
         * @param type Denotes the type of fatal exception.
         */
        fatal(message: string, type?: number): void;

        /**
         * Exception Type
         */
        PARSE: number;
        /**
         * Exception Type
         */
        COMPILE: number;
        /**
         * Exception Type
         */
        BIND: number;
        /**
         * Exception Type
         */
        NAME: number;
        /**
         * Exception Type
         */
        NAVIGATION: number;
        /**
         * Exception Type
         */
        TEMPLATE: number;
        /**
         * Exception Type
         */
        AJAX: number;
        /**
         * Exception Type
         */
        CONTEXT: number;
        /**
         * Exception Type
         */
        EVENT: number;
        /**
         * Exception Type
         */
        INJECTABLE: number;
        /**
         * Exception Type
         */
        COMPAT: number;
        /**
         * Exception Type
         */
        PROMISE: number;
    }

    class PlatException {
        constructor(public message: string, public name: string) { }
    }

    class PlatError {
        message: string;
        name = 'PlatError';
        constructor(message?: string) {
            this.message = message || '';
        }
    }

    function setPrototypes(platError?: any): void {
        PlatError.prototype = platError || Error.prototype;
        PlatException.prototype = new PlatError();
    }

    function raise(message: any, type: number, isFatal?: boolean): void {
        var error: Error;

        if (message instanceof Error) {
            setPrototypes(Object.getPrototypeOf(message));
        } else if (PlatError.prototype !== Error.prototype) {
            setPrototypes();
        }
        error = new PlatException(message, '');
        switch (type) {
            case Exception.PARSE:
                error.name = 'ParsingError';
                break;
            case Exception.BIND:
                error.name = 'BindingError';
                break;
            case Exception.COMPILE:
                error.name = 'CompilingError';
                break;
            case Exception.NAME:
                error.name = 'PlatNameError';
                break;
            case Exception.NAVIGATION:
                error.name = 'NavigatingError';
                break;
            case Exception.TEMPLATE:
                error.name = 'TemplatingError';
                break;
            case Exception.CONTEXT:
                error.name = 'ContextError';
                break;
            case Exception.EVENT:
                error.name = 'DispatchEventError';
                break;
            case Exception.INJECTABLE:
                error.name = 'InjectableError';
                break;
            case Exception.COMPAT:
                error.name = 'CompatibilityError';
                break;
            default:
                error = new PlatError(message);
                break;
        }

        if (message instanceof Error) {
            var temp = message,
                properties = Object.getOwnPropertyNames(message),
                length = properties.length;

            error.message = '';
            error = Object.create(error);

            for (var i = 0; i < length; ++i) {
                (<any>error)[properties[i]] = message[properties[i]];
            }
        }

        var ErrorEvent: events.IErrorEventStatic = acquire(__ErrorEventStatic);

        ErrorEvent.dispatch('error', Exception, error);

        if (isFatal) {
            throw error;
        }
    }

    /**
     * A class for checking browser compatibility issues.
     */
    export class Compat implements ICompat {
        $Window: Window = acquire(__Window);
        $Document: Document = acquire(__Document);

        isCompatible: boolean;
        cordova: boolean;
        pushState: boolean;
        fileSupported: boolean;
        amd: boolean;
        msApp: boolean;
        indexedDb: boolean;
        proto: boolean;
        getProto: boolean;
        setProto: boolean;
        hasTouchEvents: boolean;
        hasPointerEvents: boolean;
        hasMsPointerEvents: boolean;
        animationSupported: boolean;
        platCss: boolean;
        mappedEvents: IMappedEvents;
        animationEvents: IAnimationEvents;

        /**
         * Define everything
         */
        constructor() {
            this.__defineBooleans();
            this.__defineMappedEvents();
            this.__defineAnimationEvents();
            this.__findCss();
        }

        private __defineBooleans() {
            var $window = this.$Window,
                navigator = $window.navigator,
                history = $window.history,
                def = (<any>$window).define,
                msA = (<any>$window).MSApp;

            this.isCompatible = isFunction(Object.defineProperty) && isFunction(this.$Document.querySelector);
            this.cordova = !isNull((<any>$window).cordova);
            this.pushState = !(isNull(history) || isNull(history.pushState));
            this.fileSupported = !(isUndefined((<any>$window).File) || isUndefined((<any>$window).FormData));
            this.amd = isFunction(def) && !isNull(def.amd);
            this.msApp = isObject(msA) && isFunction(msA.execUnsafeLocalFunction);
            this.indexedDb = !isNull($window.indexedDB);
            this.proto = isObject((<any>{}).__proto__);
            this.getProto = isFunction(Object.getPrototypeOf);
            this.setProto = isFunction((<any>Object).setPrototypeOf);
            this.hasTouchEvents = !isUndefined((<any>$window).ontouchstart);
            this.hasPointerEvents = !!navigator.pointerEnabled;
            this.hasMsPointerEvents = !!navigator.msPointerEnabled;
        }

        private __defineMappedEvents() {
            if (this.hasPointerEvents) {
                this.mappedEvents = {
                    $touchStart: 'pointerdown',
                    $touchEnd: 'pointerup',
                    $touchMove: 'pointermove',
                    $touchCancel: 'pointercancel'
                };
            } else if (this.hasMsPointerEvents) {
                this.mappedEvents = {
                    $touchStart: 'MSPointerDown',
                    $touchEnd: 'MSPointerUp',
                    $touchMove: 'MSPointerMove',
                    $touchCancel: 'MSPointerCancel'
                };
            } else if (this.hasTouchEvents) {
                this.mappedEvents = {
                    $touchStart: 'touchstart',
                    $touchEnd: 'touchend',
                    $touchMove: 'touchmove',
                    $touchCancel: 'touchcancel'
                };
            } else {
                this.mappedEvents = {
                    $touchStart: 'mousedown',
                    $touchEnd: 'mouseup',
                    $touchMove: 'mousemove',
                    $touchCancel: null
                };
            }
        }

        private __defineAnimationEvents() {
            var div = this.$Document.createElement('div'),
                animations: IObject<string> = {
                    OAnimation: 'o',
                    MozAnimation: '',
                    WebkitAnimation: 'webkit',
                    animation: ''
                },
                keys = Object.keys(animations),
                index = keys.length,
                prefix = '',
                key: any;

            while (index-- > 0) {
                key = keys[index];
                if (!isUndefined(div.style[key])) {
                    prefix = animations[key];
                    break;
                }
            }

            this.animationSupported = index > -1;
            this.animationEvents = prefix === 'webkit' ? {
                $animationStart: prefix + 'AnimationStart',
                $animationEnd: prefix + 'AnimationEnd',
                $transitionStart: prefix + 'TransitionStart',
                $transitionEnd: prefix + 'TransitionEnd'
            } : {
                $animationStart: prefix + 'animationstart',
                $animationEnd: prefix + 'animationend',
                $transitionStart: prefix + 'transitionstart',
                $transitionEnd: prefix + 'transitionend'
            };
        }

        private __findCss() {
            var $document = this.$Document,
                styleSheets = $document.styleSheets;

            if (isNull(styleSheets)) {
                this.platCss = false;
                return;
            }

            var length = styleSheets.length,
                styleSheet: CSSStyleSheet,
                rules: CSSRuleList,
                j: number, jLength: number;

            for (var i = 0; i < length; ++i) {
                styleSheet = <CSSStyleSheet>styleSheets[i];
                rules = styleSheet.cssRules;
                jLength = (<CSSRuleList>(rules || [])).length;
                for (j = 0; j < jLength; ++j) {
                    if (rules[j].cssText.indexOf('[' + __Hide + ']') !== -1) {
                        this.platCss = true;
                        return;
                    }
                }
            }

            var $exception: IExceptionStatic = acquire(__ExceptionStatic);
            $exception.warn('platypus.css was not found prior to platypus.js. If you intend to use ' +
                'platypus.css, please move it before platypus.js inside your head or body declaration');
        }
    }

    /**
     * The Type for referencing the '$Compat' injectable as a dependency.
     */
    export function ICompat(): ICompat {
        return new Compat();
    }

    register.injectable(__Compat, ICompat);

    /**
     * An object containing boolean values signifying browser 
     * and/or platform compatibilities.
     */
    export interface ICompat {
        /**
         * Determines if the browser is modern enough to correctly 
         * run PlatypusTS.
         */
        isCompatible: boolean;

        /**
         * Signifies whether or not Cordova is defined. If it is, 
         * we hook up ALM events to Cordova's functions.
         */
        cordova: boolean;

        /**
         * Signifies whether window.history.pushState is defined.
         */
        pushState: boolean;

        /**
         * Signifies whether the File API is supported.
         */
        fileSupported: boolean;

        /**
         * Signifies whether Require is present. If it is, we assume 
         * it is going to be used and leave the loading of the app up 
         * to the developer.
         */
        amd: boolean;

        /**
         * Signifies whether we are in the contet of a Windows 8 app.
         */
        msApp: boolean;

        /**
         * Signifies whether indexedDB exists on the window.
         */
        indexedDb: boolean;

        /**
         * Signifies whether Object.prototype.__proto__ exists.
         */
        proto: boolean;

        /**
         * Signifies whether Object.prototype.getPrototypeOf exists.
         */
        getProto: boolean;

        /**
         * Signifies whether Object.prototype.setPrototypeOf exists.
         */
        setProto: boolean;

        /**
         * Whether or not the current browser has touch events 
         * like touchstart, touchmove, touchend, etc.
         */
        hasTouchEvents: boolean;

        /**
         * Whether or not the current browser has pointer events 
         * like pointerdown, MSPointerMove, pointerup, etc.
         */
        hasPointerEvents: boolean;

        /**
         * Whether or not the current browser has touch events 
         * like MSPointerDown, touchmove, MSPointerUp, etc.
         */
        hasMsPointerEvents: boolean;

        /**
         * Whether or not the browser supports animations.
         */
        animationSupported: boolean;

        /**
         * Whether the platypus.css file was included or not.
         */
        platCss: boolean;

        /**
         * An object containing the correctly mapped touch events for the browser.
         */
        mappedEvents: IMappedEvents;

        /**
         * An object containing the properly prefixed animation events.
         */
        animationEvents: IAnimationEvents;
    }

    /**
     * Describes an object containing the correctly mapped touch events for the browser.
     */
    export interface IMappedEvents extends IObject<string> {
        /**
         * An event type for touch start.
         */
        $touchStart: string;

        /**
         * An event type for touch end.
         */
        $touchEnd: string;

        /**
         * An event type for touch move.
         */
        $touchMove: string;

        /**
         * An event type for touch cancel.
         */
        $touchCancel: string;
    }

    /**
     * Describes an object containing the properly prefixed animation events.
     */
    export interface IAnimationEvents extends IObject<string> {
        /**
         * The animation start event.
         */
        $animationStart: string;

        /**
         * The animation end event.
         */
        $animationEnd: string;

        /**
         * The transition start event.
         */
        $transitionStart: string;

        /**
         * The transition end event.
         */
        $transitionEnd: string;
    }

    /**
     * An extensible class defining common utilities and helper functions.
     */
    export class Utils implements IUtils {
        noop(): void { }

        extend(destination: any, ...sources: any[]): any {
            return extend.apply(null, [destination].concat(sources));
        }

        deepExtend(destination: any, ...sources: any[]): any {
            return extend.apply(null, [true, destination].concat(sources));
        }

        isObject(obj: any): boolean {
            return isObject(obj);
        }

        isWindow(obj: any): boolean {
            return isWindow(obj);
        }

        isDocument(obj: any): boolean {
            return isDocument(obj);
        }

        isNode(obj: any): boolean {
            return isNode(obj);
        }

        isDocumentFragment(obj: any): boolean {
            return isDocumentFragment(obj);
        }

        isString(obj: any): boolean {
            return isString(obj);
        }

        isRegExp(obj: any): boolean {
            return isRegExp(obj);
        }

        isEmpty(obj: any): boolean {
            return isEmpty(obj);
        }

        isBoolean(obj: any): boolean {
            return isBoolean(obj);
        }

        isNumber(obj: any): boolean {
            return isNumber(obj);
        }

        isFunction(obj: any): boolean {
            return isFunction(obj);
        }

        isNull(obj: any): boolean {
            return isNull(obj);
        }

        isUndefined(obj: any): boolean {
            return isUndefined(obj);
        }

        isArray(obj: any): boolean {
            return isArray(obj);
        }

        isArrayLike(obj: any): boolean {
            return isArrayLike(obj);
        }

        filter<T>(array: Array<T>, iterator: (value: T, key: any, obj: any) => boolean, context?: any): Array<T>;
        filter<T>(obj: any, iterator: (value: T, key: any, obj: any) => boolean, context?: any): Array<T>;
        filter<T>(obj: any, iterator: (value: T, key: any, obj: any) => boolean, context?: any): Array<T> {
            return filter(obj, iterator, context);
        }

        where<T>(array: Array<T>, properties: any): Array<T>;
        where<T>(obj: any, properties: any): Array<T>;
        where(obj: any, properties: any): Array<any> {
            return where(obj, properties);
        }

        forEach<T>(array: Array<T>, iterator: (value: T, index: number, obj: any) => void, context?: any): Array<T>;
        forEach<T>(obj: any, iterator: (value: T, key: string, obj: any) => void, context?: any): any;
        forEach<T>(obj: any, iterator: (value: T, key: any, obj: any) => void, context?: any): any {
            return forEach(obj, iterator, context);
        }

        map<T, U>(array: Array<T>, iterator: (value: T, index: number, obj: any) => U, context?: any): Array<U>;
        map<T, U>(obj: any, iterator: (value: T, key: string, obj: any) => U, context?: any): Array<U>;
        map<T, U>(obj: any, iterator: (value: T, key: any, obj: any) => U, context?: any): Array<U> {
            return map<T, U>(obj, iterator, context);
        }

        pluck<T, U>(obj: any, key: string): Array<U> {
            return map<T, U>(obj, (value) => (<any>value)[key]);
        }

        some<T>(array: Array<T>, iterator: (value: T, index: number, obj: any) => boolean, context?: any): boolean;
        some<T>(obj: any, iterator: (value: T, key: string, obj: any) => boolean, context?: any): boolean;
        some<T>(obj: any, iterator: (value: T, key: any, obj: any) => boolean, context?: any): boolean {
            return some<T>(obj, iterator, context);
        }

        postpone(method: (...args: any[]) => void, args?: Array<any>, context?: any) {
            return defer(method, 0, args, context);
        }

        defer(method: (...args: any[]) => void, timeout: number, args?: Array<any>, context?: any) {
            return defer(method, timeout, args, context);
        }

        uniqueId(prefix?: string) {
            return uniqueId(prefix);
        }

        camelCase(str: string) {
            return camelCase(str);
        }
    }

    /**
     * The Type for referencing the '$Utils' injectable as a dependency.
     */
    export function IUtils(): IUtils {
        return new Utils();
    }

    register.injectable(__Utils, IUtils);

    /**
     * An object defining common utilities and helper functions.
     */
    export interface IUtils {
        /**
         * An empty method for quickly creating dummy objects.
         */
        noop(): void;

        /**
         * Allows you to extend the properties of an object with any number 
         * of other objects. If objects share properties, the last object in the
         * arguments will take precedence. This method is only a shallow copy of
         * all the source objects to the destination object.
         * 
         * @param destination The destination object to extend.
         * @param ...sources[] Any number of objects with which to extend the 
         * destination object.
         * 
         * @return {any} The extended destination object.
         */
        extend(destination: any, ...sources: any[]): any;

        /**
         * Allows you to extend the properties of an object with any number 
         * of other objects. If objects share properties, the last object in the
         * arguments will take precedence. This method is a deep copy of
         * all the source objects to the destination object.
         * 
         * @param destination The destination object to extend.
         * @param ...sources[] Any number of objects with which to extend the 
         * destination object.
         * 
         * @return {any} The extended destination object.
         */
        deepExtend(destination: any, ...sources: any[]): any;

        /**
         * Takes in anything and determines if it is a type of Object.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is an object, false otherwise.
         */
        isObject(obj: any): boolean;

        /**
         * Takes in anything and determines if it is a window object.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is the window, false otherwise.
         */
        isWindow(obj: any): boolean;

        /**
         * Takes in anything and determines if it is a document object.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is the document, false otherwise.
         */
        isDocument(obj: any): boolean;

        /**
         * Takes in anything and determines if it is a Node.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is a Node, false otherwise.
         */
        isNode(obj: any): boolean;

        /**
         * Takes in anything and determines if it is a DocumentFragment.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is a DocumentFragment, false otherwise.
         */
        isDocumentFragment(obj: any): boolean;

        /**
         * Takes in anything and determines if it is a string.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is a string, false otherwise.
         */
        isString(obj: any): boolean;

        /**
         * Takes in anything and determines if it is a RegExp object.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is a RegExp object, false otherwise.
         */
        isRegExp(obj: any): boolean;

        /**
         * Takes in anything and determines if it is empty. Useful for
         * checking for empty strings, arrays, or objects without keys.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if the object isEmpty (or null/undefined), 
         * false otherwise.
         */
        isEmpty(obj: any): boolean;

        /**
         * Takes in anything and determines if it is a boolean.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is a boolean, false otherwise.
         */
        isBoolean(obj: any): boolean;

        /**
         * Takes in anything and determines if it is a number.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is a number, false otherwise.
         */
        isNumber(obj: any): boolean;

        /**
         * Takes in anything and determines if it is a function.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is a function, false otherwise.
         */
        isFunction(obj: any): boolean;

        /**
         * Takes in anything and determines if it is null or undefined.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is null or undefined, false otherwise.
         */
        isNull(obj: any): boolean;

        /**
         * Takes in anything and determines if it is undefined.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is undefined, false otherwise.
         */
        isUndefined(obj: any): boolean;

        /**
         * Takes in anything and determines if it is an Array.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is an Array, false otherwise.
         */
        isArray(obj: any): boolean;

        /**
         * Takes in anything and determines if it has array-like qualities.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj has array-like qualities (i.e. it is an
         * Array, string, arguments, or NodeList), false otherwise.
         */
        isArrayLike(obj: any): boolean;

        /**
         * Takes in an array and a function to evaluate the properties in the array.
         * Returns a filtered array of objects resulting from evaluating the function.
         * 
         * @param array The Array to filter.
         * @param iterator The iterator function to call with array's properties. Returns true if the property
         * should be kept, false otherwise.
         * @param context Optional context with which to call the iterator.
         * 
         * @return {Array<T>} An array of objects which evaluated to true with the iterator.
         */
        filter<T>(array: Array<T>, iterator: (value: T, key: any, obj: any) => boolean, context?: any): Array<T>;
        /**
         * Takes in an object/array and a function to evaluate the properties in the object/array.
         * Returns a filtered array of objects resulting from evaluating the function.
         * 
         * @param obj The object to filter.
         * @param iterator The iterator function to call with obj's properties. Returns true if the property
         * should be kept, false otherwise.
         * @param context Optional context with which to call the iterator.
         * 
         * @return {Array<T>} An array of objects which evaluated to true with the iterator.
         */
        filter<T>(obj: any, iterator: (value: T, key: any, obj: any) => boolean, context?: any): Array<T>;

        /**
         * Takes in a list and object containing key/value pairs to search for in the list.
         * 
         * @param array The list used for searching for properties.
         * @param properties An object containing key/value pairs to match with obj's values.
         * 
         * @return {Array<T>} The matched values in obj.
         * 
         * @example where([{foo: 'foo', bar: 'bar'}, {foo: 'bar', bar: 'foo'}], {foo: 'foo'});
         * //returns [{foo: 'bar', bar: 'bar'}]
         */
        where<T>(array: Array<T>, properties: any): Array<T>;
        /**
         * Takes in a list and object containing key/value pairs to search for on the obj.
         * 
         * @param obj The list used for searching for properties.
         * @param properties An object containing key/value pairs to match with obj's values.
         * 
         * @return {Array<T>} The matched values in obj.
         * 
         * @example where([{foo: 'foo', bar: 'bar'}, {foo: 'bar', bar: 'foo'}], {foo: 'foo'});
         * //returns [{foo: 'bar', bar: 'bar'}]
         */
        where<T>(obj: any, properties: any): Array<T>;

        /**
         * Takes in an Array and a function to iterate over. Calls the iterator function with every property
         * in the Array, then returns the object.
         * 
         * @param obj An Array.
         * @param iterator A method that takes in a value, index, and the object.
         * @param context An optional context to bind to the iterator.
         * 
         * @return {Array<T>} The array.
         */
        forEach<T>(array: Array<T>, iterator: (value: T, index: number, obj: any) => void, context?: any): Array<T>;
        /**
         * Takes in an object and a function to iterate over. Calls the iterator function with every property
         * in the object, then returns the object. If the object is Array-like (e.g. a String), it will be treated as though 
         * it is an Array.
         * 
         * @param obj An object.
         * @param iterator A method that takes in a value, key, and the object.
         * @param context An optional context to bind to the iterator.
         * 
         * @return {IObject<T>} The object.
         */
        forEach<T>(obj: any, iterator: (value: T, key: string, obj: any) => void, context?: any): any;

        /**
         * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The 
         * iterator can transform the object and return it. The returned values will be pushed to an Array and 
         * returned.
         * 
         * @param array An Array.
         * @param iterator The transformation function.
         * @param context An optional context to bind to the iterator.
         * 
         * @return {Array<U>} The accumulated transformed values from the iterator.
         */
        map<T, U>(array: Array<T>, iterator: (value: T, index: number, obj: any) => U, context?: any): Array<U>;
        /**
         * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The 
         * iterator can transform the object and return it. The returned values will be pushed to an Array and 
         * returned.
         * 
         * @param obj An object/array.
         * @param iterator The transformation function.
         * @param context An optional context to bind to the iterator.
         * 
         * @return {Array<U>} The accumulated transformed values from the iterator.
         */
        map<T, U>(obj: any, iterator: (value: T, key: string, obj: any) => U, context?: any): Array<U>;

        /**
         * Takes in an object and a property to extract from all of the object's values. Returns an array of
         * the 'plucked' values.
         * 
         * @param obj An object.
         * @param key The property to 'pluck' from each value in obj.
         * 
         * @return {Array<U>} An array of 'plucked' values from obj.
         */
        pluck<T, U>(obj: any, key: string): Array<U>;

        /**
         * Takes in an array and an iterator. Evaluates all the values in the array with the iterator.
         * Returns true if any of the iterators return true, otherwise returns false.
         * 
         * @param array An array.
         * @param iterator A method with which to evaluate all the values in obj.
         * @param context An optional context to bind to the iterator.
         * 
         * @return {boolean} True if any calls to iterator return true, false otherwise.
         */
        some<T>(array: Array<T>, iterator: (value: T, index: number, obj: any) => boolean, context?: any): boolean;
        /**
         * Takes in an object and an iterator. Evaluates all the values in the object with the iterator.
         * Returns true if any of the iterators return true, otherwise returns false. If the object is Array-like 
         * (e.g. a String), it will be treated as though it is an Array.
         * 
         * @param obj An object.
         * @param iterator A method with which to evaluate all the values in obj.
         * @param context An optional context to bind to the iterator.
         * 
         * @return {boolean} True if any calls to iterator return true, false otherwise.
         */
        some<T>(obj: any, iterator: (value: T, key: string, obj: any) => boolean, context?: any): boolean;

        /**
         * Takes in a method and array of arguments to pass to that method. Delays calling the method until 
         * after the current call stack is clear. Equivalent to a setTimeout with a timeout of 0.
         * 
         * @param method The method to call.
         * @param args The arguments to apply to the method.
         * @param context An optional context to bind to the method.
         * 
         * @return {() => void} A function that will clear the timeout when called.
         */
        postpone(method: (...args: any[]) => void, args?: Array<any>, context?: any): () => void;

        /**
         * Takes in a method and array of arguments to pass to that method. Delays calling the method until 
         * after the current call stack is clear. Equivalent to a setTimeout with a timeout of 0.
         * 
         * @param method The method to call.
         * @param timeout The time (in milliseconds) to delay before calling the provided method
         * @param args The arguments to apply to the method.
         * @param context An optional context to bind to the method.
         * 
         * @return {() => void} A function that will clear the timeout when called.
         */
        defer(method: (...args: any[]) => void, timeout: number, args?: Array<any>, context?: any): () => void;

        /**
         * Takes in a prefix and returns a unique identifier string with the prefix preprended. If no prefix
         * is specified, none will be prepended.
         * 
         * @param prefix A string prefix to prepend tothe unique ID.
         * 
         * @return {string} The prefix-prepended unique id.
         */
        uniqueId(prefix?: string): string;

        /**
         * Takes in a spinal-case, dot.case, or snake_case string and returns 
         * a camelCase string. Also can turn a string into camelCase with space 
         * as a delimeter.
         * 
         * @param str The spinal-case, dot.case, or snake_case string
         * 
         * @return {string} The camelCase string
         * 
         * @example camelCase('plat-options'); // returns 'platOptions'
         */
        camelCase(str: string): string;
    }

    /**
     * The Type for referencing the '$Window' injectable as a dependency. 
     * Used so that the Window can be mocked.
     */
    export function Window(): Window {
        return window;
    }

    register.injectable(__Window, Window);

    /**
     * The Type for referencing the '$Document' injectable as a dependency. 
     * Used so that the Window can be mocked.
     */
    export function Document($Window: Window): Document {
        return $Window.document;
    }

    register.injectable(__Document, Document, [__Window]);

    export module expressions {
        /**
         * A class for keeping track of commonly used regular expressions.
         */
        export class Regex implements IRegex {
            markupRegex: RegExp = /{{[\S\s]*}}/;
            argumentRegex: RegExp = /\((.*)\)/;
            aliasRegex: RegExp = /[^@\.\[\(]+(?=[\.\[\(])/;
            initialUrlRegex: RegExp = /\/[^\/]*\.(?:html|htm)/;
            protocolRegex: RegExp = /:\/\//;
            invalidVariableRegex: RegExp = /[^a-zA-Z0-9@_$]/;
            fileNameRegex: RegExp = /.*(?:\/|\\)/;

            get newLineRegex(): RegExp {
                return /\n|\r/g;
            }

            get optionalRouteRegex(): RegExp {
                return /\((.*?)\)/g;
            }

            get namedParameterRouteRegex(): RegExp {
                return /(\(\?)?:\w+/g;
            }

            get wildcardRouteRegex(): RegExp {
                return /\*\w*/g;
            }

            get escapeRouteRegex(): RegExp {
                return /[\-{}\[\]+?.,\\\^$|#\s]/g;
            }

            get camelCaseRegex(): RegExp {
                return /([\-_\.\s])(\w+?)/g;
            }

            get whiteSpaceRegex(): RegExp {
                return /("[^"]*?"|'[^']*?')|[\s\r\n\t\v]/g;
            }

            get quotationRegex(): RegExp {
                return /'|"/g;
            }
        }

        /**
         * The Type for referencing the '$Regex' injectable as a dependency.
         */
        export function IRegex(): IRegex {
            return new Regex();
        }

        register.injectable(__Regex, IRegex);

        /**
         * An object containing commonly used regular expressions.
         */
        export interface IRegex {
            /**
             * The regular expression for matching or removing all newline characters.
             */
            newLineRegex: RegExp;

            /**
             * The regular expression for finding markup in a string.
             */
            markupRegex: RegExp;

            /**
             * Finds the arguments in a method expression
             *
             * @example
             *   // outputs ["('foo', 'bar', 'baz')", "'foo', 'bar', 'baz'"]
             *   exec("myFunction('foo', 'bar', 'baz')");
             */
            argumentRegex: RegExp;

            /**
             * Given a string, finds the root alias name if that string is an
             * alias path.
             *
             * @example
             *   // outputs ['context']
             *   exec('@context.foo');
             *
             * @example
             *   // outputs null
             *   exec('@context');
             */
            aliasRegex: RegExp;

            /**
             * Finds optional parameters in a route string.
             *
             * @example
             *   // outputs ['(/foo)', '/foo']
             *   exec('(/foo)/bar');
             *
             * @example
             *  // outputs ['(/foo)', '/foo']
             *  exec('(/foo))');
             */
            optionalRouteRegex: RegExp;

            /**
             * Finds named parameters in a route string.
             *
             * @example
             *   // outputs [':foo']
             *   exec('/:foo/bar')
             *
             *   // outputs [':foo']
             *   exec('(/:foo)/bar');
             */
            namedParameterRouteRegex: RegExp;

            /**
             * Finds an alphanumeric wildcard match in a route string.
             *
             * @example
             *   // outputs ['*bar']
             *   exec('/foo/*bar/baz')
             */
            wildcardRouteRegex: RegExp;

            /**
             * Finds invalid characters in a route string.
             *
             * @example
             *  // outputs ['?']
             *  exec('/foo/bar?query=baz');
             */
            escapeRouteRegex: RegExp;

            /**
             * Finds '/*.html' or '/*.htm' in a url. Useful for removing 
             * the html file out of the url.
             * 
             * @example
             *   // outputs ['/index.html']
             *   exec('http://localhost:8080/index.html');
             */
            initialUrlRegex: RegExp;

            /**
             * Finds a protocol delimeter in a string (i.e. ://)
             */
            protocolRegex: RegExp;

            /**
             * Finds delimeters for spinal-case, snake_case, and dot.case.
             * useful for converting to camelCase. Also can turn a string
             * into camelCase with space as a delimeter.
             *
             * @example
             *   // outputs ['-o', '-', 'o']
             *   exec('plat-options')
             *
             * @example
             *   // outputs ['.c', '.', 'c']
             *   exec('plat.config')
             *
             * @example
             *   // outputs ['_v', '_', 'v']
             *   exec('plat_var')
             *
             * @example
             *   // outputs [' W', ' ', 'W']
             *   exec('Hello World')
             */
            camelCaseRegex: RegExp;

            /**
             * Finds all whitespace and newline characters 
             * not in string literals. Needs to be combined 
             * with string replace function using $1 argument.
             */
            whiteSpaceRegex: RegExp;

            /**
             * Finds all single and double quotes.
             */
            quotationRegex: RegExp;

            /**
             * Looks for any invalid variable syntax.
             */
            invalidVariableRegex: RegExp;

            /**
             * Grabs the file name from a file path.
             */
            fileNameRegex: RegExp;
        }

        /**
         * Responsible for taking a javascript expression string and
         * finding all its tokens (i.e. delimiters, operators, etc).
         */
        export class Tokenizer implements ITokenizer {
            /**
             * The input string to tokenize.
             */
            _input: string;

            private __previousChar: string = '';
            private __variableRegex = (<expressions.IRegex>acquire(__Regex)).invalidVariableRegex;
            private __outputQueue: Array<IToken> = [];
            private __operatorStack: Array<IToken> = [];
            private __argCount: Array<any> = [];
            private __objArgCount: Array<number> = [];
            private __lastColonChar: Array<string> = [];
            private __lastCommaChar: Array<string> = [];

            createTokens(input: string): Array<IToken> {
                if (isNull(input)) {
                    return [];
                }

                this._input = input;

                var char: string,
                    length = input.length,
                    ternary = 0,
                    ternaryFound = false,
                    isSpace = this._isSpace,
                    isAlphaNumeric = this._isAlphaNumeric;

                for (var index = 0; index < length; index++) {
                    char = input[index];

                    //space
                    if (isSpace(char)) {
                        continue;
                    } else if (isAlphaNumeric(char)) {
                        index = this.__handleAplhaNumeric(index, char);
                    } else if (isDelimiter(char)) {
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
                    } else if (isOperator(char)) {
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
                        //semicolon throw error
                    } else if (char === ';') {
                        this._throwError('Unexpected semicolon');
                    }

                    this.__previousChar = char;
                }

                if (ternaryFound && (ternary > 0)) {
                    this._throwError('Improper ternary expression');
                } else if (this.__objArgCount.length > 0) {
                    this._throwError('Improper object literal');
                }

                this.__popRemainingOperators();
                var output = this.__outputQueue;
                this._resetTokenizer();

                return output;
            }

            // ALPHANUMERIC CASE
            private __handleAplhaNumeric(index: number, char: string): number {
                var functionArr: Array<string> = [],
                    isNumberLike = this._isNumeric(char);

                functionArr.push(char);

                index = this._lookAhead(index, isNumberLike, functionArr);

                var mergedValue = functionArr.join(''),
                    outputToPush = isNumberLike ? ({ val: Number(mergedValue), args: 0 }) :
                    <IToken>({ val: mergedValue, args: -1 });

                this.__outputQueue.push(outputToPush);

                return index;
            }

            // DELIMITER FUNCTIONS
            private __handlePeriod(index: number, char: string): number {
                var functionArr: Array<string> = [],
                    outputQueue = this.__outputQueue,
                    operatorStack = this.__operatorStack,
                    topOutputLength = outputQueue.length - 1,
                    previousChar = this._input[index - 1];

                //if output queue is null OR space or operator or ( or , before .
                if (topOutputLength < 0 ||
                    this._isSpace(previousChar) ||
                    !isNull(OPERATORS[previousChar]) ||
                    previousChar === '(' ||
                    previousChar === ',') {
                    functionArr.push(char);
                    index = this._lookAhead(index, true, functionArr);
                    outputQueue.push({ val: parseFloat(functionArr.join('')), args: 0 });
                } else if (!(isNull(outputQueue[topOutputLength]) ||
                    !isNumber(Number(outputQueue[topOutputLength].val)) ||
                    this._isValEqual(outputQueue[topOutputLength - 1], char))) {
                    functionArr.push(char);
                    index = this._lookAhead(index, true, functionArr);
                    outputQueue[topOutputLength].val += parseFloat(functionArr.join(''));
                } else if (this._isValEqual(operatorStack[0], char)) {
                    outputQueue.push({ val: char, args: 0 });
                } else {
                    operatorStack.unshift({ val: char, args: 0 });
                }

                return index;
            }
            private __handleLeftBrace(char: string): void {
                this.__operatorStack.unshift({ val: char, args: 0 });
                this.__objArgCount.push(0);
                this.__lastColonChar.push(char);
                this.__lastCommaChar.push(char);
            }
            private __handleRightBrace(char: string): void {
                var operatorStack = this.__operatorStack,
                    topOperator = operatorStack[0],
                    lastArgCount = this.__objArgCount.pop();

                if (isNull(topOperator)) {
                    this._throwError('Improper object literal');
                } else {
                    this._popStackForVal(topOperator, '{', 'Improper object literal');

                    //pop left brace off stack
                    operatorStack.shift();

                    this.__lastColonChar.pop();
                    this.__lastCommaChar.pop();

                    this.__outputQueue.push({ val: '{}', args: lastArgCount });
                }
            }
            private __handleLeftBracket(char: string): void {
                var previousChar = this.__previousChar,
                    operatorStack = this.__operatorStack;

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
            }
            private __handleRightBracket(char: string): void {
                var operatorStack = this.__operatorStack,
                    topOperator = operatorStack[0],
                    lastArgCountObj = this.__argCount.pop(),
                    outputQueue = this.__outputQueue,
                    isEmptyArray = (this.__previousChar === '[');

                if (isNull(topOperator) || isNull(lastArgCountObj)) {
                    this._throwError('Brackets mismatch');
                } else {
                    if (!lastArgCountObj.isArray) {
                        lastArgCountObj.num--;
                    }

                    this._popStackForVal(topOperator, '[', 'Brackets mismatch');

                    //pop left bracket off stack
                    operatorStack.shift();

                    this.__lastCommaChar.pop();
                    //check if function on top of stack
                    outputQueue.push({ val: '[]', args: isEmptyArray ? -1 : lastArgCountObj.num + 1 });
                }
            }
            private __handleLeftParenthesis(char: string): void {
                var previousChar = this.__previousChar,
                    operatorStack = this.__operatorStack;

                if (this._isAlphaNumeric(previousChar) || previousChar === ']' || previousChar === ')') {
                    var outputQueue = this.__outputQueue,
                        topOutput = outputQueue[outputQueue.length - 1];

                    if (this._isValEqual(topOutput, '[]')) {
                        operatorStack.unshift(outputQueue.pop());
                        operatorStack.unshift(outputQueue.pop());
                    } else if (!(this._isValEqual(topOutput, '()') || this._isNumeric(topOutput.val))) {
                        operatorStack.unshift(outputQueue.pop());
                    }

                    this.__argCount.push({ num: 0, isFn: true });
                }
                operatorStack.unshift({ val: char, args: 0 });
                this.__lastCommaChar.push(char);
            }
            private __handleRightParenthesis(char: string): void {
                var operatorStack = this.__operatorStack,
                    topOperator = operatorStack[0],
                    localArgCountObj = this.__argCount.pop();

                if (isNull(topOperator)) {
                    this._throwError('Parentheses mismatch');
                } else {
                    this._popStackForVal(topOperator, '(', 'Parentheses mismatch');

                    //pop left parenthesis off stack
                    operatorStack.shift();

                    this.__lastCommaChar.pop();

                    //check if function on top of stack
                    var previousParen = this.__previousChar === '(';
                    if (!isNull(localArgCountObj) &&
                        this.__removeFnFromStack(previousParen ? localArgCountObj.num : localArgCountObj.num + 1)) {
                        this.__outputQueue.push({ val: '()', args: previousParen ? 0 : (localArgCountObj.num + 1) });
                    }
                }
            }
            private __handleComma(char: string): void {
                var lastCommaArray = this.__lastCommaChar,
                    lastCommaArg = lastCommaArray[lastCommaArray.length - 1];

                if (lastCommaArg === '(' || lastCommaArg === '[') {
                    var argCountArray = this.__argCount,
                        length = argCountArray.length;

                    if (length > 0) {
                        //increment deepest fn count (don't need to increment obj count because we increment with colon)
                        argCountArray[length - 1].num++;
                    } else {
                        this._throwError('Mismatch with ' + lastCommaArg);
                    }
                }

                var topOperator = this.__operatorStack[0];

                if (isNull(topOperator)) {
                    this._throwError('Unexpected comma');
                } else {
                    this._popStackForVal(topOperator, lastCommaArg, 'Unexpected comma');
                }
            }
            private __handleStringLiteral(index: number, char: string): number {
                var str = this._lookAheadForDelimiter(char, char, index, true),
                    operatorStack = this.__operatorStack,
                    topOperator = operatorStack[0];

                if (this._isValEqual(topOperator, '([')) {
                    operatorStack.unshift({ val: str.char, args: 0 });
                } else {
                    this.__outputQueue.push({ val: str.char, args: 0 });
                }
                return str.index;
            }

            // OPERATOR FUNCTIONS
            private __handleQuestion(char: string): void {
                this.__lastColonChar.push(char);
                this.__determinePrecedence(char);
            }
            private __handleColon(char: string, ternary: number): number {
                var lastColonCharArray = this.__lastColonChar,
                    lastColonCharacter = lastColonCharArray[lastColonCharArray.length - 1],
                    outputQueue = this.__outputQueue;

                if (lastColonCharacter === '?') {
                    var operatorStack = this.__operatorStack,
                        topOperator = operatorStack[0];

                    if (isNull(topOperator)) {
                        this._throwError('Ternary mismatch');
                    } else {
                        ternary--;
                        lastColonCharArray.pop(); //pop latest colon char off queue

                        this._popStackForVal(topOperator, '?', 'Ternary mismatch');

                        outputQueue.push(operatorStack.shift());
                        operatorStack.unshift({ val: char, args: 0 });
                    }
                } else if (lastColonCharacter === '{') {
                    var objCountLast = this.__objArgCount.length - 1,
                        outputLength = outputQueue.length;

                    this.__objArgCount[objCountLast]++;
                    if (outputLength > 0) {
                        outputQueue[outputLength - 1].args = 1;
                    } else {
                        this._throwError('Unexpected colon');
                    }
                } else {
                    this._throwError('Unexpected colon');
                }

                return ternary;
            }
            private __handleOtherOperator(index: number, char: string): number {
                var look = this._lookAheadForOperatorFn(char, index);
                this.__determinePrecedence(look.char);

                return look.index;
            }
            private __popRemainingOperators(): void {
                var outputQueue = this.__outputQueue,
                    operatorStack = this.__operatorStack;

                while (operatorStack.length > 0) {
                    var topOperator = operatorStack.shift();
                    if (topOperator.val === '(' || topOperator.val === ')') {
                        this._throwError('Parentheses mismatch');
                    }
                    outputQueue.push(topOperator);
                }
            }

            // PRIVATE HELPER FUNCTIONS
            private __determineOperator(operator: any): ITokenDetails {
                switch (operator) {
                    case '+':
                    case '-':
                        var outputQueue = this.__outputQueue,
                            operatorStack = this.__operatorStack,
                            outputQueueLength = outputQueue.length,
                            operatorStackLength = operatorStack.length,
                            topOutput = outputQueue[outputQueueLength - 1],
                            topOperator = operatorStack[operatorStackLength - 1],
                            topOutputIsOperator = isNull(topOutput) ? false : isOperator(topOutput.val),
                            topOperatorIsOperator = isNull(topOperator) ? false : isOperator(topOperator.val),
                            topOperatorIsNonUnary = topOperatorIsOperator && topOperator.args > 1;

                        if ((outputQueueLength === 0 && operatorStackLength >= 0) ||
                            !(outputQueueLength > 1 || operatorStackLength < 1 || !topOperatorIsNonUnary) ||
                            (topOutputIsOperator && topOperatorIsOperator)) {
                            return OPERATORS['u' + operator];
                        }
                    default:
                        return OPERATORS[operator];
                }
            }
            private __determinePrecedence(operator: any) {
                var determined = false,
                    operatorFn = this.__determineOperator(operator),
                    operatorPrecedence = operatorFn.precedence,
                    operatorAssoc = operatorFn.associativity,
                    operatorStack = this.__operatorStack,
                    outputQueue = this.__outputQueue,
                    firstArrayOperator: ITokenDetails,
                    firstArrayVal: any,
                    firstArrayObj: IToken;

                while (!determined) {
                    firstArrayObj = operatorStack[0];

                    if (!firstArrayObj) {
                        operatorStack.unshift({ val: operator, args: operatorFn.fn.length - 2 });
                        return;
                    }

                    firstArrayVal = operatorStack[0].val;
                    firstArrayOperator = OPERATORS[firstArrayVal];
                    if (!(isNull(firstArrayOperator) ||
                        !(firstArrayOperator.precedence < operatorPrecedence ||
                        (firstArrayOperator.precedence === operatorPrecedence && operatorAssoc === 'ltr')))) {
                        outputQueue.push(operatorStack.shift());
                    } else {
                        operatorStack.unshift({ val: operator, args: operatorFn.fn.length - 2 });
                        determined = true;
                    }
                }
            }
            private __removeFnFromStack(argCount: number): boolean {
                var outputQueue = this.__outputQueue,
                    operatorStack = this.__operatorStack,
                    topOperator = operatorStack[0],
                    isValEqual = this._isValEqual,
                    isValUnequal = this._isValUnequal,
                    fnToken: IToken,
                    atLeastOne = false;

                while (!isNull(topOperator) &&
                    isValUnequal(topOperator, '([') &&
                    (this._isStringValidVariable(topOperator.val) ||
                    isValEqual(topOperator.val, '[].') ||
                    isAccessor(topOperator.val))) {
                    fnToken = operatorStack.shift();
                    if (!(fnToken.args !== -1 || isValEqual(fnToken, '[].'))) {
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
            }

            // PROTECTED HELPER FUNCTIONS
            /**
             * Determines character type
             * 
             * @param char The character to check
             * @param isNumberLike Whether or not the character resembles a number
             */
            _checkType(char: string, isNumberLike: boolean): boolean {
                if (isNumberLike) {
                    return this._isNumeric(char);
                }
                return this._isAlphaNumeric(char);
            }

            /**
             * Looks ahead in the expression to group similar character types.
             * 
             * @param index The current index in the expression string
             * @param isNumberLike Whether or not the character resembles a number
             * @param array A temporary array used to aggregate similar character types.
             * @return {number} The new index in the expression string
             */
            _lookAhead(index: number, isNumberLike: boolean, array: Array<string>): number {
                var ch: string,
                    input = this._input;

                while (++index) {
                    if (this._checkType((ch = input[index]), isNumberLike)) {
                        array.push(ch);
                    } else {
                        break;
                    }
                }
                return index - 1;
            }

            /**
             * Looks ahead in the expression to try and complete the 
             * current operator.
             * 
             * @param char The operator to find
             * @param index The current index in the expression string
             */
            _lookAheadForOperatorFn(char: string, index: number): ILookAheadResult {
                var ch: string,
                    fn: string,
                    input = this._input;

                while ((++index < input.length) && ch !== '') {
                    ch = input[index],
                    fn = char + ch;

                    if (isOperator(fn)) {
                        char = fn;
                    } else {
                        break;
                    }
                }
                return { char: char, index: index - 1 };
            }

            /**
             * Looks ahead in the expression until it comes to the ending 
             * character to try and complete a particular sequence 
             * (i.e. - a string literal).
             * 
             * @param char The starting character
             * @param endChar The ending character
             * @param index The current index in the expression string
             * @param includeDelimiter Whether or not to include the delimiter 
             * in the result
             */
            _lookAheadForDelimiter(char: string, endChar: string,
                index: number, includeDelimiter?: boolean): ILookAheadResult {
                var ch: string,
                    input = this._input;

                while ((ch = input[++index]) !== endChar) {
                    char += ch;
                }
                if (includeDelimiter) {
                    char = char.substr(1);
                    index++;
                }
                return { char: char, index: index - 1 };
            }

            /**
             * Pops the operator stack onto the output queue until a particular 
             * operator value is reached.
             * 
             * @param topOperator The top of the operator stack
             * @param char The operator value being searched for
             * @param error The error to throw in the case that the expression 
             * is invalid.
             */
            _popStackForVal(topOperator: any, char: string, error: string): void {
                var outputQueue = this.__outputQueue,
                    operatorStack = this.__operatorStack;

                while (topOperator.val !== char) {
                    outputQueue.push(operatorStack.shift());
                    topOperator = operatorStack[0];
                    if (operatorStack.length === 0) {
                        this._throwError(error);
                    }
                }
            }

            /**
             * Check if the 'val' property is equal to a particular character.
             * 
             * @param obj The obj whose 'val' property to compare
             * @param char The char to compare with
             */
            _isValEqual(obj: any, char: string): boolean {
                if (isNull(obj)) {
                    return isNull(char);
                }
                return char.indexOf(obj.val) !== -1;
            }

            /**
             * Check if the 'val' property is not equal to a particular character.
             * 
             * @param obj The obj whose 'val' property to compare
             * @param char The char to compare with
             */
            _isValUnequal(obj: any, char: string): boolean {
                if (isNull(obj)) {
                    return !isNull(char);
                }
                return char.indexOf(obj.val) === -1;
            }

            /**
             * Reset the tokenizer's properties.
             */
            _resetTokenizer(): void {
                this._input = null;
                this.__previousChar = '';
                this.__outputQueue = [];
                this.__operatorStack = [];
                this.__argCount = [];
                this.__objArgCount = [];
                this.__lastColonChar = [];
                this.__lastCommaChar = [];
            }

            /**
             * Throw an exception in the case of an error.
             * 
             * @param error The error message to throw
             */
            _throwError(error: string): void {
                var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                $exception.fatal(error + ' in {{' + this._input + '}}', $exception.PARSE);
            }

            /**
             * Checks if a single character is numeric.
             * 
             * @param char The character to check.
             */
            _isNumeric(char: string): boolean {
                return ('0' <= char && char <= '9');
            }

            /**
             * Checks if a single character is a space.
             * 
             * @param char The character to check.
             */
            _isSpace(char: string): boolean {
                return (char === ' ' ||
                    char === '\r' ||
                    char === '\n' ||
                    char === '\t' ||
                    char === '\v' ||
                    char === '\u00A0');
            }

            /**
             * Checks if a single character is an alphabetical 
             * type character.
             * 
             * @param char The character to check.
             */
            _isAlpha(char: string): boolean {
                return ('a' <= char && char <= 'z' ||
                    'A' <= char && char <= 'Z' ||
                    '@' === char ||
                    '_' === char ||
                    '$' === char);
            }

            /**
             * Checks if a single character is alphanumeric.
             * 
             * @param char The character to check.
             */
            _isAlphaNumeric(char: string): boolean {
                return ('a' <= char && char <= 'z' ||
                    'A' <= char && char <= 'Z' ||
                    '0' <= char && char <= '9' ||
                    '@' === char ||
                    '_' === char ||
                    '$' === char);
            }

            /**
             * Checks if a string has proper javascript variable syntax.
             * 
             * @param input The string to check.
             */
            _isStringValidVariable(input: string): boolean {
                return !this.__variableRegex.test(input);
            }
        }

        /**
         * The Type for referencing the '$Tokenizer' injectable as a dependency.
         */
        export function ITokenizer(): ITokenizer {
            return new Tokenizer();
        }

        register.injectable(__Tokenizer, ITokenizer);

        /**
         * Describes an object used to find tokens for an expression and create ITokens.
         */
        export interface ITokenizer {
            /**
             * Takes in an expression string and outputs ITokens.
             * 
             * @param input The expression string to tokenize.
             */
            createTokens(input: string): Array<IToken>;
        }

        /**
         * Describes a token in an expression.
         */
        export interface IToken {
            /**
             * The string or number value of the token.
             */
            val: any;

            /**
             * Denotes the type of token, as well as the number
             * of arguments for a function if it is the token.
             * 
             * If -2: Denotes a function name unless indexed into with [].
             * If -1: Denotes a variable or empty array literal.
             * If 0: Denotes a number, keyword, object indexer (.[]), string literal,
             *  function with 0 arguments, ternary expression, or empty object literal
             * If 1: Denotes a function type with 1 argument, a property on an object literal,
             *  an object literal with 1 property, or an array literal with 1 entry.
             * If > 1: Denotes a function type with args arguments, an object literal with
             *  args properties, or an array literal with args entries.
             */
            args: number;
        }

        /**
         * Provides all the necessary details on how to evaluate a token.
         */
        export interface ITokenDetails {
            /**
             * The precedence that this token takes with respect to the 
             * evaluation order.
             */
            precedence: number;

            /**
             * Whether or not the token associates with the expression on
             * their left or right.
             */
            associativity: string;

            /**
             * A function used to evaluate an operator expression.
             */
            fn: Function;
        }

        /**
         * An object describing the result of looking ahead in the expression.
         */
        export interface ILookAheadResult {
            /**
             * The resultant string after after looking ahead
             */
            char: string;

            /**
             * The new current index in the expression string
             */
            index: number;
        }

        /**
         * Parses javascript expression strings and creates IParsedExpressions.
         */
        export class Parser implements IParser {
            $Tokenizer: ITokenizer = acquire(__Tokenizer);

            /**
             * A single expression's token representation created by the Tokenizer.
             */
            _tokens: Array<IToken> = [];
            private __cache: IObject<IParsedExpression> = {};
            private __codeArray: Array<string> = [];
            private __identifiers: Array<string> = [];
            private __tempIdentifiers: Array<string> = [];
            private __aliases: Array<string> = [];
            private __uniqueAliases: IObject<boolean> = {};

            parse(input: string): IParsedExpression {
                var parsedObject = this.__cache[input];
                if (!isNull(parsedObject)) {
                    return parsedObject;
                }

                this._tokens = this.$Tokenizer.createTokens(input);

                parsedObject = this._evaluate(input);

                var identifiers = parsedObject.identifiers;
                if (identifiers.length === 0) {
                    var noModel = parsedObject.evaluate(null);
                    parsedObject.evaluate = function evaluateNoContext() { return noModel; };
                }

                this.__cache[input] = parsedObject;

                return parsedObject;
            }

            /**
             * Evaluate the current token array.
             * 
             * @param input The input string to evaluate.
             */
            _evaluate(input: string): IParsedExpression {
                var tokens = this._tokens,
                    length = tokens.length,
                    tempIdentifiers = this.__tempIdentifiers,
                    codeArray = this.__codeArray,
                    codeStr = '',
                    useLocalContext = false;

                for (var i = 0; i < length; i++) {
                    var tokenObj = tokens[i],
                        token = tokenObj.val,
                        args = tokenObj.args;

                    //check if its an accessor
                    if (isAccessor(token)) {
                        switch (token) {
                            case '()':
                                useLocalContext = this.__handleFunction(i, args, useLocalContext);
                                break;
                            case '{}':
                                codeArray.push(this.__convertObject(args));
                                tempIdentifiers.push('.');
                                break;
                            default:
                                //handle empty array
                                if (args < 0) {
                                    codeArray.push('[]');
                                    tempIdentifiers.push('.');
                                    //handle array literal
                                } else if (args > 0) {
                                    codeArray.push(this.__convertArrayLiteral(args));
                                    tempIdentifiers.push('.');
                                } else {
                                    useLocalContext = this.__indexIntoObject(i, useLocalContext);
                                }
                                break;
                        }
                        //check if its an operator
                    } else if (isOperator(token)) {
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
                        // its either function, object, or primitive
                    } else {
                        //potential function or object to index into
                        if (args < 0) {
                            codeStr = this.__convertFunction(i, token, useLocalContext);
                            // primitive
                        } else {
                            codeStr = this.__convertPrimitive(i, token, args);
                        }
                        codeArray.push(codeStr);
                    }
                }

                // move the rest of the tempIdentifiers to the identifiers
                this._popRemainingIdentifiers();
                // make the identifiers array unqiue entries only
                this._makeIdentifiersUnique();

                var parsedExpression: IParsedExpression = {
                    evaluate: <(context: any, aliases?: any) => any>new Function('context', 'aliases',
                        'var initialContext;' +
                        'return ' + (codeArray.length === 0 ? ('"' + input + '"') : codeArray.join('')) + ';'),
                    expression: input,
                    identifiers: this.__identifiers.slice(0),
                    aliases: this.__aliases.slice(0)
                };

                // reset parser's properties
                this._resetParser();

                return parsedExpression;
            }

            // PARSE CASES
            private __convertPrimitive(index: number, token: string, args: number): string {
                var tokens = this._tokens,
                    tempIdentifiers = this.__tempIdentifiers;

                if (args > 0) {
                    tempIdentifiers.push('.');
                    return token;
                } else {
                    var castToken = Number(token),
                        castTokenIsNumberLike = isNumber(castToken),
                        peek1 = this._peek(index),
                        isPeekIndexer = peek1 && peek1.args < 1;

                    if (isKeyword(token) ||
                        (isString(token) &&
                        (castTokenIsNumberLike ||
                        this._isValUnequal(peek1, '[]()') ||
                        (this._isValEqual(peek1, '[]') &&
                        !isPeekIndexer)))) {
                        tempIdentifiers.push('.');
                        return '"' + token + '"';
                    } else {
                        if (!castTokenIsNumberLike ||
                            (this._isValEqual(peek1, '[].') &&
                            isPeekIndexer)) {
                            tempIdentifiers.push(token);
                        } else {
                            tempIdentifiers.push('.');
                        }
                        return token;
                    }
                }
            }
            private __convertFunction(index: number, token: string, useLocalContext: boolean): string {
                var tokens = this._tokens,
                    tempIdentifiers = this.__tempIdentifiers,
                    nextToken = this._peek(index);

                if (token[0] === '@' && isNull(this.__uniqueAliases[token])) {
                    this.__uniqueAliases[token] = true;
                    this.__aliases.push(token.slice(1));
                } else if (isKeyword(token)) {
                    tempIdentifiers.push('.');
                    return token;
                }

                if (this._isValEqual(tokens[index - 1], '()') && this._isValEqual(nextToken, '[].')) {
                    tempIdentifiers.push('.');
                } else {
                    tempIdentifiers.push(token);
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
                } else {
                    return '(initialContext = (' + this.__findInitialContext.toString() + ')(context,aliases,"' + token + '"))';
                }
            }
            private __convertObject(args: number): string {
                var identifiers = this.__identifiers,
                    tempIdentifiers = this.__tempIdentifiers,
                    codeArray = this.__codeArray,
                    j = 0,
                    key: string,
                    codeStr = '{',
                    tempIdentifier: string,
                    temp: string;

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
            }
            private __convertArrayLiteral(args: number): string {
                var identifiers = this.__identifiers,
                    tempIdentifiers = this.__tempIdentifiers,
                    codeArray = this.__codeArray,
                    j = 0,
                    tempStr = '',
                    codeStr = '[',
                    tempIdentifier: string;

                while (j++ < args) {
                    tempStr = codeArray.pop() + ',' + tempStr;

                    if (tempIdentifiers.length > 0) {
                        tempIdentifier = tempIdentifiers.pop();
                        if (tempIdentifier !== '.') {
                            identifiers.push(tempIdentifier);
                        }
                    }
                }

                codeStr += tempStr.slice(0, tempStr.length - 1) + ']';

                return codeStr;
            }

            // ACCESSORS
            private __handleFunction(index: number, args: number, useLocalContext: boolean): boolean {
                var tokens = this._tokens,
                    identifiers = this.__identifiers,
                    tempIdentifiers = this.__tempIdentifiers,
                    codeArray = this.__codeArray,
                    j = 0,
                    previousToken = tokens[index - 1],
                    previousTokenIsFnName = (previousToken.args === -2),
                    grabFnName = previousTokenIsFnName || this._isValEqual(previousToken, '[].'),
                    tempStr = '',
                    tempIdentifier: string,
                    fnName = '',
                    identifierFnName = '',
                    codeStr: string,
                    pushedIdentifier = false;

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
                } else {
                    codeStr = '.call(initialContext || context)';
                }

                if (useLocalContext) {
                    useLocalContext = false;
                    if (codeArray.length > 0) {
                        var context = codeArray.pop();

                        var lastIndex = tempIdentifiers.length - 1;
                        if (!(lastIndex < 0 || tempIdentifiers[lastIndex] === '.' || identifierFnName === '')) {
                            tempIdentifiers[lastIndex] += '.' + identifierFnName;
                            identifiers.push(tempIdentifiers.pop());
                            //check fn name is not null, pushed an identifier, and the context is not an array literal
                        } else if (!(identifierFnName === '' ||
                            !pushedIdentifier ||
                            context[0] === '[' ||
                            context[context.length - 1] === ']')) {
                            identifiers[identifiers.length - 1] += '.' + identifierFnName;
                        }

                        if (isEmpty(fnName)) {
                            codeStr = context + codeStr;
                        } else {
                            codeStr = '((' + this.__indexIntoContext.toString() + ')(' + context + ',"' +
                            fnName + '") || (function () {}))' + codeStr;
                        }
                    } else {
                        this._throwError('Improper expression or context');
                    }
                } else {
                    if (grabFnName) {
                        codeStr = '(initialContext = ((' + this.__findInitialContext.toString() + ')(context,aliases,"' +
                        fnName + '") || (function () {}))' + codeStr + ')';

                        identifiers.push(fnName);
                    } else {
                        codeStr = codeArray.pop() + codeStr;
                    }
                }
                codeArray.push(codeStr);

                var peek = this._peek(index),
                    length = tempIdentifiers.length;
                if (this._isValEqual(peek, '[]') && length > 0) {
                    var lastIdentifier = tempIdentifiers[length - 1];
                    if (lastIdentifier !== '.') {
                        identifiers.push(tempIdentifiers.pop());
                    }
                }

                return useLocalContext;
            }
            private __indexIntoObject(index: number, useLocalContext: boolean): boolean {
                var tokens = this._tokens,
                    identifiers = this.__identifiers,
                    tempIdentifiers = this.__tempIdentifiers,
                    codeArray = this.__codeArray,
                    nextChar = this._peek(index);

                if (this._isValEqual(nextChar, '()')) {
                    return true;
                }

                var codeStr = codeArray.pop(),
                    previousToken = tokens[index - 1],
                    indexer: number,
                    identifierIndexer = tempIdentifiers.pop(),
                    context = codeArray.pop();

                if (this._isValUnequal(previousToken, '++--()[]*/%?:>=<=&&||!===')) {
                    codeStr = '(' + this.__indexIntoContext.toString() + ')(' + context + ',"' + codeStr + '")';

                    var lastIndex = tempIdentifiers.length - 1;
                    if (lastIndex >= 0) {
                        if (tempIdentifiers[lastIndex] !== '.') {
                            tempIdentifiers[lastIndex] += '.' + identifierIndexer;
                        }
                    } else if (!isNull(identifierIndexer) && identifierIndexer !== '.') {
                        identifiers.push(identifierIndexer);
                    }
                } else {
                    codeStr = '(' + this.__indexIntoContext.toString() + ')(' + context + ',' + codeStr + ')';
                    tempIdentifiers.push('.');
                }

                codeArray.push(codeStr);

                return useLocalContext;
            }

            // OPERATORS
            private __handleQuestion(): void {
                var identifiers = this.__identifiers,
                    tempIdentifiers = this.__tempIdentifiers,
                    codeArray = this.__codeArray,
                    temp = codeArray.pop(),
                    codeStr = codeArray.pop() + '?' + temp,
                    tempIdentifier: string;

                for (var i = 0; i < 2; i++) {
                    if (tempIdentifiers.length > 0) {
                        tempIdentifier = tempIdentifiers.pop();
                        if (tempIdentifier !== '.') {
                            identifiers.push(tempIdentifier);
                        }
                    } else {
                        break;
                    }
                }

                codeArray.push(codeStr);
            }
            private __handleColon(): void {
                var identifiers = this.__identifiers,
                    tempIdentifiers = this.__tempIdentifiers,
                    codeArray = this.__codeArray,
                    temp = codeArray.pop(),
                    codeStr = codeArray.pop() + ':' + temp,
                    tempIdentifier: string;

                for (var i = 0; i < 2; i++) {
                    if (tempIdentifiers.length > 0) {
                        tempIdentifier = tempIdentifiers.pop();
                        if (tempIdentifier !== '.') {
                            identifiers.push(tempIdentifier);
                        }
                    } else {
                        break;
                    }
                }

                codeArray.push(codeStr);
            }
            private __handleOperator(token: string, args: number): void {
                var identifiers = this.__identifiers,
                    tempIdentifiers = this.__tempIdentifiers,
                    codeArray = this.__codeArray,
                    j = 0,
                    tempStr = '',
                    codeStr = '(' + OPERATORS[token].fn.toString() + ')(context, aliases,',
                    tempIdentifier: string;

                while (j++ < args) {
                    tempStr = 'function (context, aliases) { return ' + codeArray.pop() + '; }' + ',' + tempStr;

                    if (tempIdentifiers.length > 0) {
                        tempIdentifier = tempIdentifiers.pop();
                        if (tempIdentifier !== '.') {
                            identifiers.push(tempIdentifier);
                        }
                    }
                }

                codeStr += tempStr.slice(0, tempStr.length - 1) + ')';

                codeArray.push(codeStr);
            }

            // PRIVATE HELPER FUNCTIONS
            private __findInitialContext(context: any, aliases: any, token: string, undefined?: any): any {
                if (token[0] === '@' && aliases !== null && typeof aliases === 'object') {
                    return aliases[token];
                } else if (context !== null && typeof context === 'object') {
                    return context[token];
                }
                return context === null ? null : undefined;
            }
            private __indexIntoContext(context: any, token: string, undefined?: any): any {
                if (context !== null && typeof context === 'object') {
                    return context[token];
                }
                return context === null ? null : undefined;
            }

            // PROTECTED HELPER FUNCTIONS
            /**
             * Peek at the next token.
             * 
             * @param index The current index.
             */
            _peek(index: number): IToken {
                return this._tokens[index + 1];
            }

            /**
             * Evaluate and remove the leftover identifiers.
             */
            _popRemainingIdentifiers(): void {
                var identifiers = this.__identifiers,
                    tempIdentifiers = this.__tempIdentifiers,
                    last: string;

                while (tempIdentifiers.length > 0) {
                    last = tempIdentifiers.pop();
                    if (last !== '.') {
                        identifiers.push(last);
                    }
                }
            }
        
            /**
             * Remove duplicate identifiers.
             */
            _makeIdentifiersUnique(): void {
                var identifiers = this.__identifiers,
                    uniqueIdentifiers: Array<string> = [],
                    uniqueIdentifierObject: IObject<boolean> = {},
                    identifier: string;

                while (identifiers.length > 0) {
                    identifier = identifiers.pop();
                    if (isNull(uniqueIdentifierObject[identifier])) {
                        uniqueIdentifierObject[identifier] = true;
                        uniqueIdentifiers.push(identifier);
                    }
                }

                this.__identifiers = uniqueIdentifiers;
            }
        
            /**
             * Check if the 'val' property is equal to a particular character.
             * 
             * @param obj The obj whose 'val' property to compare
             * @param char The char to compare with
             */
            _isValEqual(obj: any, char: string): boolean {
                if (isNull(obj)) {
                    return isNull(char);
                }
                return char.indexOf(obj.val) !== -1;
            }
        
            /**
             * Check if the 'val' property is not equal to a particular character.
             * 
             * @param obj The obj whose 'val' property to compare
             * @param char The char to compare with
             */
            _isValUnequal(obj: any, char: string): boolean {
                if (isNull(obj)) {
                    return !isNull(char);
                }
                return char.indexOf(obj.val) === -1;
            }

            /**
             * Reset the parser's properties.
             */
            _resetParser(): void {
                this._tokens = [];
                this.__codeArray = [];
                this.__identifiers = [];
                this.__tempIdentifiers = [];
                this.__aliases = [];
                this.__uniqueAliases = {};
            }

            /**
             * Throw an exception in the case of an error.
             * 
             * @param error The error message to throw
             */
            _throwError(error: string): void {
                var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                $exception.fatal(error, $exception.PARSE);
            }
        }

        /**
         * The Type for referencing the '$Parser' injectable as a dependency.
         */
        export function IParser(): IParser {
            return new Parser();
        }

        register.injectable(__Parser, IParser);

        /**
         * Describes an object that can parse an expression string and turn it into an
         * IParsedExpression. The intended external interface for the '$Parser' 
         * injectable.
         */
        export interface IParser {
            /**
             * Takes in an expression string and outputs an IParsedExpression.
             * 
             * @param input An expression string to parse.
             */
            parse(expression: string): IParsedExpression;
        }

        /**
         * Describes an object that is the result of parsing an expression string. Provides a
         * way to evaluate the expression with a context.
         */
        export interface IParsedExpression {
            /**
             * A method for evaluating an expression with a context.
             * 
             * @param context The primary context for evaluation.
             * @param aliases An object containing resource alias values. All keys must begin with '@'.
             */
            evaluate(context: any, aliases?: any): any;

            /**
             * The original expression string.
             */
            expression: string;

            /**
             * Contains all the identifiers found in an expression.  Useful for determining
             * properties to watch on a context.
             */
            identifiers: Array<string>;

            /**
             * Contains all the aliases (denoted by an identifier with '@' as the first character) for this IParsedExpression.
             */
            aliases: Array<string>;

            /**
             * Specifies whether or not you want to do a one-time binding on identifiers 
             * for this expression. Typically this is added to a clone of the IParsedExpression.
             */
            oneTime?: boolean;
        }
    }
    export module web {
        /**
         * The class that handles all interaction with the browser.
         */
        export class Browser implements IBrowser {
            static config: IBrowserConfig = {
                NONE: 'none',
                HASH: 'hash',
                STATE: 'state',
                routingType: 'none',
                hashPrefix: '',
                baseUrl: ''
            };

            $EventManagerStatic: events.IEventManagerStatic = acquire(__EventManagerStatic);
            $Compat: ICompat = acquire(__Compat);
            $Regex: expressions.IRegex = acquire(__Regex);
            $Window: Window = acquire(__Window);
            $Dom: ui.IDom = acquire(__Dom);

            uid: string;

            private __currentUrl: string;
            private __lastUrl = this.$Window.location.href;
            private __initializing = false;

            constructor() {
                var ContextManager: observable.IContextManagerStatic = acquire(__ContextManagerStatic);
                ContextManager.defineGetter(this, 'uid', uniqueId('plat_'));
                this.$EventManagerStatic.on(this.uid, 'beforeLoad', this.initialize, this);
            }

            initialize(): void {
                var $config = Browser.config,
                    $compat = this.$Compat;

                this.$EventManagerStatic.dispose(this.uid);

                if ($config.routingType === $config.NONE) {
                    return;
                }

                this.__initializing = true;

                var url = this.url(),
                    trimmedUrl = url.replace(this.$Regex.initialUrlRegex, '/'),
                    changed = this._urlChanged.bind(this),
                    $dom = this.$Dom,
                    $window = this.$Window;

                if (isEmpty($config.baseUrl)) {
                    acquire(__UrlUtilsInstance);
                }

                if (trimmedUrl !== url) {
                    this.url(trimmedUrl, true);
                }

                if ($compat.pushState) {
                    if ($config.routingType === $config.STATE) {
                        this.url($config.baseUrl, true);
                    }

                    $dom.addEventListener($window, 'popstate', changed, false);
                }

                $dom.addEventListener($window, 'hashchange', changed, false);

                this.__initializing = false;
            }

            url(url?: string, replace?: boolean): string {
                var location = this.$Window.location;

                if (isString(url) && this.__lastUrl !== url) {
                    this.__lastUrl = url;
                    this._setUrl(url, replace);
                }
                return this.__currentUrl || location.href;
            }

            urlUtils(url?: string): IUrlUtilsInstance {
                url = url || this.url();

                var $urlUtils: IUrlUtilsInstance = acquire(__UrlUtilsInstance),
                    $config = Browser.config;

                if ($config.routingType === $config.HASH) {
                    url = url.replace(new RegExp('#' + ($config.hashPrefix || '') + '/?'), '');
                }

                $urlUtils.initialize(url);

                return $urlUtils;
            }

            isCrossDomain(url: string): boolean {
                if (!isString(url)) {
                    return false;
                }

                var urlUtils = this.urlUtils(url),
                    locationUtils = this.urlUtils();

                // check for protocol:host:port mismatch
                return urlUtils.protocol !== locationUtils.protocol ||
                    urlUtils.hostname !== locationUtils.hostname ||
                    urlUtils.port !== locationUtils.port;
            }

            /**
             * The event to fire in the case of a URL change. It kicks 
             * off a 'urlChanged' direct event notification.
             */
            _urlChanged(): void {
                if (this.__initializing) {
                    return;
                }

                this.__currentUrl = null;
                var url = this.url();

                if (this.__lastUrl === url) {
                    return;
                }

                this.__lastUrl = url;

                var $manager = this.$EventManagerStatic;
                $manager.dispatch('urlChanged',
                    this,
                    $manager.DIRECT,
                    [this.urlUtils()]);
            }

            /**
             * Checks for the existence of pushState and 
             * sets the browser URL accordingly.
             * 
             * @param url The URL to set.
             * @param replace Whether or not to replace the 
             * current URL in the history.
             */
            _setUrl(url: string, replace?: boolean): void {
                url = this._formatUrl(url);
                if (this.$Compat.pushState) {
                    if (replace) {
                        history.replaceState(null, '', url);
                    } else {
                        history.pushState(null, '', url);
                    }

                    if (!this.__initializing) {
                        this._urlChanged();
                    }
                } else {
                    this.__currentUrl = url;
                    if (replace) {
                        location.replace(url);
                    } else {
                        location.href = url;
                    }
                }
            }

            /**
             * Formats the URL in the case of HASH routing.
             * 
             * @param url The URL to format.
             */
            _formatUrl(url: string): string {
                var $config = Browser.config;
                if ($config.routingType === $config.HASH) {
                    var hasProtocol = url.indexOf(this.urlUtils().protocol) !== -1,
                        prefix = $config.hashPrefix || '',
                        hashRegex = new RegExp('#' + prefix + '|#/');

                    if (hasProtocol && !hashRegex.test(url)) {
                        url = url + '#' + prefix + '/';
                    } else if (!hashRegex.test(url)) {
                        url = '#' + prefix + '/' + url;
                    }
                }

                return url;
            }
        }

        /**
         * The Type for referencing the '$Browser' injectable as a dependency.
         */
        export function IBrowser(): IBrowser {
            return new Browser();
        }

        register.injectable(__Browser, IBrowser);

        /**
         * Defines an object that handles interaction with the browser.
         */
        export interface IBrowser {
            /**
             * A unique string identifier.
             */
            uid: string;

            /**
             * Initializes the Browser instance, trims the url, and 
             * adds events for popstate and hashchange.
             */
            initialize(): void;

            /**
             * Sets or gets the current $Window.location
             * 
             * @param url The URL to set the location to.
             * @param replace Whether or not to replace the current URL in 
             * the history.
             */
            url(url?: string, replace?: boolean): string;

            /**
             * Creates a new IUrlUtils object
             * 
             * @param url The URL to associate with the new UrlUtils 
             * instance.
             */
            urlUtils(url?: string): IUrlUtilsInstance;

            /**
             * Checks to see if the requested URL is cross domain.
             */
            isCrossDomain(url: string): boolean;
        }

        /**
         * The Type for referencing the '$BrowserConfig' injectable as a dependency.
         */
        export function IBrowserConfig(): IBrowserConfig {
            return Browser.config;
        }

        register.injectable(__BrowserConfig, IBrowserConfig);

        /**
         * Specifies configuration properties for the IBrowser 
         * injectable.
         */
        export interface IBrowserConfig {
            /**
             * Specifies that the application will not be doing 
             * url-based routing.
             */
            NONE: string;

            /**
             * Specifies that the application wants to use hash-based 
             * routing.
             */
            HASH: string;

            /**
             * Specifies that the application wants to use the HTML5 
             * popstate method for managing routing. If the browser 
             * does not support HTML5 popstate events, hash routing 
             * will be used instead.
             * 
             * Note: In 'state' mode, the web server must be configured to 
             * route every url to the root url.
             */
            STATE: string;

            /**
             * Allows you to define how your app will route. There are
             * three modes, 'none', 'hash', and 'state'. 
             * 
             * In 'none' mode, the application will not be responding to 
             * url changes.
             * 
             * In 'hash' mode, the application will use a hash prefix and 
             * all navigation will be managed with hash changes.
             * 
             * In 'state' mode, the application will use the 'popstate' 
             * event and will be able to manage routes. The web server 
             * must be configured to route every url to the root url if 
             * using 'state' mode.
             * 
             * The default mode is NONE
             */
            routingType: string;

            /**
             * If routingType is set to 'hash', this value will be 
             * appended to the '#' at the beginning of every route. The 
             * default prefix is '!', meaning each path will be '#!/<path>'.
             */
            hashPrefix: string;

            /**
             * Specifies the base url used to normalize url routing.
             */
            baseUrl: string;
        }

        /**
         * A class that deals with obtaining detailed information about an 
         * associated URL.
         */
        export class UrlUtils implements IUrlUtilsInstance {
            private static __urlUtilsElement: HTMLAnchorElement;
            private static __getQuery(search: string): IObject<string> {
                if (isEmpty(search)) {
                    return <IObject<string>>{};
                }

                var split = search.split('&'),
                    query: IObject<string> = {},
                    length = split.length,
                    item: Array<string>,
                    define = (<observable.IContextManagerStatic>acquire(__ContextManagerStatic)).defineGetter;

                for (var i = 0; i < length; ++i) {
                    item = split[i].split('=');

                    define(query, item[0], item[1]);
                }

                return query;
            }

            /**
             * Obtains the base URL for doing STATE type routing
             * 
             * @param url The initial URL passed into the Browser.
             */
            private static __getBaseUrl(url: string): string {
                var colon = url.substring(url.indexOf(':')),
                    next = colon.substring(colon.search(/\w+/));

                return url.substring(0, url.indexOf('/', url.indexOf(next))) + '/';
            }

            $ContextManagerStatic: observable.IContextManagerStatic = acquire(__ContextManagerStatic);
            $Document: Document = acquire(__Document);
            $Window: Window = acquire(__Window);
            $Compat: ICompat = acquire(__Compat);
            $Regex: expressions.IRegex = acquire(__Regex);
            $BrowserConfig: IBrowserConfig = acquire(__BrowserConfig);

            href: string;
            protocol: string;
            host: string;
            hostname: string;
            port: string;
            pathname: string;
            search: string;
            hash: string;
            username: string;
            password: string;
            origin: string;
            query: IObject<string>;

            /**
             * Handle the initial URL and get the base URL if necessary.
             */
            constructor() {
                var $config = this.$BrowserConfig;
                if (isEmpty($config.baseUrl)) {
                    var url = this.$Window.location.href,
                        trimmedUrl = url.replace(this.$Regex.initialUrlRegex, '/');

                    if ($config.routingType === $config.HASH) {
                        $config.baseUrl = trimmedUrl.replace(/#.*/, '');
                    } else {
                        $config.baseUrl = UrlUtils.__getBaseUrl(trimmedUrl);
                    }
                }
            }

            initialize(url: string): void {
                url = url || '';

                var element = UrlUtils.__urlUtilsElement ||
                    (UrlUtils.__urlUtilsElement = this.$Document.createElement('a')),
                    define = this.$ContextManagerStatic.defineGetter;

                // always make local urls relative to start page.
                if (url[0] === '/') {
                    url = url.substr(1);
                }

                element.setAttribute('href', url);
                url = element.href;

                // We need to do this twice for cerain browsers (e.g. win8)
                element.setAttribute('href', url);
                url = element.href;

                var protocol = element.protocol ? element.protocol.replace(/:$/, '') : '';

                // Cordova adds //www for some urls, so we want to take those out.
                if (protocol.indexOf('http') === -1 && protocol.indexOf('ms-appx') === -1) {
                    url = url.replace('//', '');
                }

                define(this, 'href', url, true, true);
                define(this, 'protocol', element.protocol ? element.protocol.replace(/:$/, '') : '', true, true);
                define(this, 'host', element.host, true, true);
                define(this, 'search', element.search ? element.search.replace(/^\?/, '') : '', true, true);
                define(this, 'hash', element.hash ? element.hash.replace(/^#/, '') : '', true, true);
                define(this, 'hostname', element.hostname, true, true);
                define(this, 'port', element.port, true, true);

                var path: string;

                if (!isEmpty(this.$BrowserConfig.baseUrl)) {
                    path = url.replace(this.$BrowserConfig.baseUrl, '/');
                } else {
                    path = (element.pathname.charAt(0) === '/')
                    ? element.pathname
                    : '/' + element.pathname;
                }

                define(this, 'pathname', path, true, true);
                define(this, 'query', UrlUtils.__getQuery(this.search), true, true);
            }

            toString(): string {
                return this.href;
            }
        }

        /**
         * The Type for referencing the '$UrlUtilsInstance' injectable as a dependency.
         */
        export function IUrlUtilsInstance(): IUrlUtilsInstance {
            return new UrlUtils();
        }

        register.injectable(__UrlUtilsInstance, IUrlUtilsInstance, null, register.INSTANCE);

        /**
         * Defines an object that deals with obtaining detailed information about an 
         * associated URL.
         */
        export interface IUrlUtilsInstance {
            /**
             * The whole associated URL.
             */
            href: string;

            /**
             * The protocol scheme of the URL, including the final ':' of the associated URL.
             */
            protocol: string;

            /**
             * The hostname and port of the associated URL.
             */
            host: string;

            /**
             * The domain of the associated uRL.
             */
            hostname: string;

            /**
             * The port number of the associated URL.
             */
            port: string;

            /**
             * The additional path value in the associated URL preceded by a '/'.
             */
            pathname: string;

            /**
             * A '?' followed by the included parameters in the associated URL.
             */
            search: string;

            /**
             * A '#' followed by the included hash fragments in the associated URL.
             */
            hash: string;

            /**
             * The username specified before the domain name in the associated URL.
             */
            username?: string;

            /**
             * The password specified before the domain name in the associated URL.
             */
            password?: string;

            /**
             * The origin of the associated URL (its protocol, domain, and port).
             */
            origin?: string;

            /**
             * An object containing keyed query arguments from the associated URL.
             */
            query?: IObject<string>;

            /**
             * Initiializes this IUrlUtils and defines its properties using 
             * the input url.
             * 
             * @param url The input to associate with this IUrlUtils.
             */
            initialize(url: string): void;

            /**
             * toString function implementation.
             */
            toString(): string;
        }

        /**
         * The class that handles route registration and navigation 
         * to and from IViewControls within the Routeport.
         */
        export class Router implements IRouter {
            $Browser: IBrowser = acquire(__Browser);
            $BrowserConfig: IBrowserConfig = acquire(__BrowserConfig);
            $EventManagerStatic: events.IEventManagerStatic = acquire(__EventManagerStatic);
            $NavigationEventStatic: events.INavigationEventStatic = acquire(__NavigationEventStatic);
            $Compat: ICompat = acquire(__Compat);
            $Regex: expressions.IRegex = acquire(__Regex);
            $Window: Window = acquire(__Window);

            uid: string;

            /**
             * The registered routes (as IRouteMatchers) for matching 
             * on route change.
             */
            _routes: Array<IRouteMatcher> = [];

            /**
             * The function to stop listening to the 'urlChanged' event.
             */
            _removeListener: IRemoveListener;

            /**
             * The registered default route ('') converted into an IMatchedRoute. 
             * The default route is used whenever a specified route/url is not matched.
             */
            _defaultRoute: IMatchedRoute;

            /**
             * The registered base route ('/') converted into an IMatchedRoute. 
             * The base route is the first route navigated to in the Routeport if a 
             * defaultRoute is not specified in its plat-options.
             */
            _baseRoute: IMatchedRoute;

            private __escapeRegex = this.$Regex.escapeRouteRegex;
            private __optionalRegex = this.$Regex.optionalRouteRegex;
            private __pathSlashRegex = /^\/|\/$/g;
            private __firstRoute = true;
            private __history: Array<string>;

            /**
             * Assigns a uid and subscribes to the 'urlChanged' event.
             */
            constructor() {
                var ContextManager: observable.IContextManagerStatic = acquire(__ContextManagerStatic);
                ContextManager.defineGetter(this, 'uid', uniqueId('plat_'));

                this._removeListener = this.$EventManagerStatic.on(this.uid, 'urlChanged', this._routeChanged, this);
                var $browserConfig = this.$BrowserConfig;
                if ($browserConfig.routingType === $browserConfig.NONE) {
                    $browserConfig.routingType = $browserConfig.HASH;
                    $browserConfig.hashPrefix = $browserConfig.hashPrefix || '';
                }

                if (this.$Compat.msApp) {
                    this.__history = [];
                }
            }

            registerRoutes(type: string, routes: Array<any>): void {
                if (!isArray(routes)) {
                    return;
                }

                var injector = viewControlInjectors[type],
                    length = routes.length;

                for (var i = 0; i < length; ++i) {
                    this._registerRoute(routes[i], injector, type);
                }
            }

            route(path: string, options?: IRouteNavigationOptions): void {
                options = options || <IRouteNavigationOptions>{};

                var replace = options.replace,
                    route: string,
                    match: IMatchedRoute,
                    $browser = this.$Browser,
                    currentUtils: IUrlUtilsInstance = $browser.urlUtils();

                if (this.__firstRoute) {
                    this.__firstRoute = false;
                    if (isEmpty(path)) {
                        this._routeChanged(null, currentUtils);
                        return;
                    }
                }

                var build = this._buildRoute(path, options.query);

                if (isNull(build)) {
                    var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                    $exception.warn('Route: ' + path + ' is not a matched route.', $exception.NAVIGATION);
                    return;
                }

                route = build.route;
                match = build.match;

                var event = this.$NavigationEventStatic.dispatch('beforeRouteChange', this, {
                    parameter: match.route,
                    target: match.injector,
                    type: match.type,
                    options: null,
                    cancelable: true
                });

                if (event.canceled) {
                    return;
                }

                var nextUtils = $browser.urlUtils(route);

                if (currentUtils.href === nextUtils.href) {
                    replace = true;
                }

                $browser.url(route, replace);
            }

            goBack(length?: number): void {
                this.$Window.history.go(-length);

                if (this.__history && this.__history.length > 1) {
                    var historyLength = this.__history.length;
                    this.__history = this.__history.slice(0, historyLength - length);
                    this.$Browser.url(this.__history.pop() || '');
                }
            }

            /**
             * Builds a valid route with a valid query string to use for navigation.
             * 
             * @param routeParameter The route portion of the navigation path. Used to 
             * match with a registered WebViewControl.
             * @param query The route query object if passed into the 
             * IRouteNavigationOptions.
             */
            _buildRoute(routeParameter: string, query: IObject<string>): { route: string; match: IMatchedRoute; } {
                var queryStr = this._buildQueryString(query);

                if (!isString(routeParameter)) {
                    return;
                }

                var route = routeParameter + queryStr,
                    utils = this.$Browser.urlUtils(route),
                    match = this._match(utils);

                if (isNull(match)) {
                    return;
                }

                return {
                    route: route,
                    match: match
                };
            }

            /**
             * Builds the query string if a query object was passed into 
             * the IRouteNavigationOptions.
             * 
             * @param query The query object passed in.
             */
            _buildQueryString(query: IObject<string>): string {
                var queryStr: Array<string> = [];

                if (!isObject(query)) {
                    return queryStr.join();
                }

                var keys = Object.keys(query),
                    length = keys.length,
                    key: string;

                for (var i = 0; i < length; ++i) {
                    key = keys[i];

                    queryStr.push(key + '=' + query[key]);
                }

                return '?' + queryStr.join('&');
            }

            /**
             * The method called when the route function is invoked 
             * or on a 'urlChanged' event.
             * 
             * @param ev The 'urlChanged' event object.
             * @param utils The IUrlUtils created for the invoked 
             * route function.
             */
            _routeChanged(ev: events.IDispatchEventInstance, utils: web.IUrlUtilsInstance): void {
                var matchedRoute = this._match(utils);

                if (isNull(matchedRoute)) {
                    var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                    $exception.warn('Could not match route: ' + utils.pathname,
                        $exception.NAVIGATION);
                    return;
                }

                if (this.__history) {
                    this.__history.push(matchedRoute.route.path);
                }

                var event = this.$NavigationEventStatic.dispatch('routeChanged', this, {
                    parameter: matchedRoute.route,
                    target: matchedRoute.injector,
                    type: matchedRoute.type,
                    options: null,
                    cancelable: false
                });
            }

            /**
             * Registers a WebViewControl's route.
             * 
             * @param route Can be either a string or RegExp.
             * @param injector The injector for the WebViewControl defined by 
             * the type.
             * @param type The control type.
             */
            _registerRoute(route: any, injector: dependency.IInjector<ui.IBaseViewControl>, type: string): void {
                var regexp = isRegExp(route),
                    routeParameters: IRouteMatcher;

                if (!(regexp || isString(route))) {
                    return;
                } else if (regexp) {
                    routeParameters = {
                        regex: route,
                        type: type,
                        injector: injector,
                        args: []
                    };
                } else if (isEmpty(route)) {
                    this._defaultRoute = {
                        injector: injector,
                        type: type
                    };
                    return;
                } else if (route.trim() === '/') {
                    this._baseRoute = {
                        injector: injector,
                        type: type
                    };
                    return;
                } else {
                    routeParameters = this._getRouteParameters(route);
                    routeParameters.injector = injector;
                    routeParameters.type = type;
                }

                this._routes.push(routeParameters);
            }

            /**
             * Parses the route and pulls out route parameters. Then 
             * converts them to regular expressions to match for 
             * routing.
             * 
             * @param route The route to parse.
             */
            _getRouteParameters(route: string): IRouteMatcher {
                var $regex = this.$Regex,
                    namedRegex = $regex.namedParameterRouteRegex,
                    escapeRegex = this.__escapeRegex,
                    optionalRegex = this.__optionalRegex,
                    wildcardRegex = $regex.wildcardRouteRegex,
                    regexArgs = route.match(namedRegex),
                    wildcard = wildcardRegex.exec(route),
                    args: Array<string> = [];

                route = route.replace(escapeRegex, '\\$')
                    .replace(optionalRegex, '(?:$1)?')
                    .replace(namedRegex, (match, optional)
                        => optional ? match : '([^/?]+)')
                    .replace(wildcardRegex, '([^?]*?)');

                if (!isNull(regexArgs)) {
                    var length = regexArgs.length;

                    for (var i = 0; i < length; ++i) {
                        args.push(regexArgs[i].substr(1));
                    }
                }

                if (!isNull(wildcard)) {
                    var wildCardName = wildcard[0].substr(1);

                    if (isEmpty(wildCardName)) {
                        wildCardName = 'wildcard';
                    }

                    args.push(wildCardName);
                }

                return {
                    regex: new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$'),
                    args: args
                };
            }

            /**
             * Matches a route to a registered route using the 
             * registered route's regular expression.
             */
            _match(utils: web.IUrlUtilsInstance): IMatchedRoute {
                var routes = this._routes,
                    url = this._getUrlFragment(utils),
                    route: IRouteMatcher,
                    exec: RegExpExecArray,
                    args: Array<string>,
                    routeParams: IObject<string> = {},
                    path: string,
                    argsLength: number,
                    length = routes.length;

                if (isEmpty(url)) {
                    var base = this._baseRoute || this._defaultRoute;

                    if (isNull(base)) {
                        return;
                    }

                    return {
                        injector: base.injector,
                        type: base.type,
                        route: {
                            path: url,
                            parameters: {},
                            query: utils.query
                        }
                    };
                }

                for (var i = 0; i < length; ++i) {
                    route = routes[i];
                    exec = route.regex.exec(url);

                    if (isNull(exec)) {
                        continue;
                    }

                    args = route.args;
                    argsLength = args.length;
                    path = exec.input;

                    if (argsLength === 0) {
                        args = Object.keys(exec.slice());
                        exec.unshift('');
                        argsLength = args.length;
                    }

                    for (var j = 0; j < argsLength; ++j) {
                        routeParams[args[j]] = exec[j + 1];
                    }

                    return {
                        injector: route.injector,
                        type: route.type,
                        route: {
                            path: path,
                            parameters: routeParams,
                            query: utils.query
                        }
                    };
                }

                var defaultRoute = this._defaultRoute;
                if (isNull(defaultRoute)) {
                    return;
                }

                return {
                    injector: defaultRoute.injector,
                    type: defaultRoute.type,
                    route: {
                        path: url,
                        parameters: {},
                        query: utils.query
                    }
                };
            }

            /**
             * Trims the first and last slash on the pathname and returns it.
             * 
             * @param utils The IUrlUtils associated with this route function.
             */
            _getUrlFragment(utils: web.IUrlUtilsInstance): string {
                return utils.pathname.replace(this.__pathSlashRegex, '');
            }
        }

        /**
         * The Type for referencing the '$Router' injectable as a dependency.
         */
        export function IRouter(): IRouter {
            return new Router();
        }

        register.injectable(__Router, IRouter);

        /**
         * Describes the object that handles route registration and navigation 
         * to and from IWebViewControls within the Routeport.
         */
        export interface IRouter {
            /**
             * A unique string identifier.
             */
            uid: string;

            /**
             * Registers route strings/RegExp and associates them with a control type.
             * 
             * @param type The control type with which to associate the routes.
             * @param routes An array of strings or RegExp expressions to associate with 
             * the control type.
             */
            registerRoutes(type: string, routes: Array<any>): void;

            /**
             * Formats a url path given the parameters and query string, then changes the 
             * url to that path.
             * 
             * @param path The route path to navigate to.
             * @param options The IRouteNavigationOptions included with this route.
             */
            route(path: string, options?: web.IRouteNavigationOptions): void;

            /**
             * Navigates back in the history.
             * 
             * @param length The number of entries to go back in the history.
             */
            goBack(length?: number): void;
        }

        /**
         * Options that you can submit to the router in order
         * to customize navigation.
         */
        export interface IRouteNavigationOptions extends navigation.IBaseNavigationOptions {
            /**
             * An object that includes the query parameters to be inserted into the route 
             * as the query string.
             */
            query?: IObject<string>;
        }

        /**
         * Used by the navigator for matching a route with 
         * a view control injector.
         */
        export interface IRouteMatcher {
            /**
             * The IBaseViewControl injector.
             */
            injector?: dependency.IInjector<ui.IBaseViewControl>;

            /**
             * The type of IBaseViewControl
             */
            type?: string;

            /**
             * A regular expression to match with the url.
             */
            regex: RegExp;

            /**
             * Route arguments used to create IRouteParameters 
             * in the event of a url match.
             */
            args: Array<string>;
        }

        /**
         * Extends IRoute to provide a control injector that matches 
         * the given IRoute.
         */
        export interface IMatchedRoute {
            /**
             * The associated view control injector for the route.
             */
            injector: dependency.IInjector<ui.IBaseViewControl>;

            /**
             * The type of IBaseViewControl
             */
            type: string;

            /**
             * The route associated with the injector
             */
            route?: IRoute<any>;
        }

        /**
         * Contains the parsed properties of a url.
         */
        export interface IRoute<T extends {}> {
            /**
             * The defined parameters that were matched with the route. 
             * When a route is registered, the registrant can specify named 
             * route parameters. Those parameters will appear in this object 
             * as key/value pairs.
             */
            parameters: T;

            /**
             * This property will always exist and will be equal to the full
             * route for navigation (only the path from root, not including 
             * the query string).
             */
            path: string;

            /**
             * An object containing query string key/value pairs.
             */
            query?: IObject<string>;
        }
    }
    export module async {
        /**
         * Adopted from the ES6 promise polyfill: https://github.com/jakearchibald/es6-promise
         * 
         * Takes in a generic typs corresponding to the fullfilled success type. 
         */
        export class Promise<R> implements IThenable<R> {
            private __subscribers: Array<any>;
            private __state: State;
            private __detail: any;

            static config = {
                /**
                 * Handles asynchronous flushing of callbacks. If the callback queue is of 
                 * length 1, then we need to schedule a flush. Afterward, any additional 
                 * callbacks added to the queue will be flushed accordingly.
                 * 
                 * @param callback The callback to push to the queue.
                 * @param arg The argument to pass to the callback.
                 */
                async: (callback: (arg?: IThenable<any>) => void, arg?: IThenable<any>) => {
                    var length = queue.push([callback, arg]);
                    if (length === 1) {
                        scheduleFlush();
                    }
                }
            };

            /**
             * Returns a promise that fulfills when every item in the array is fulfilled.
             * Casts arguments to promises if necessary. The result argument of the 
             * returned promise is an array containing the fulfillment result arguments 
             * in-order. The rejection argument is the rejection argument of the 
             * first-rejected promise.
             * 
             * @param promises An array of promises, although every argument is potentially
             * cast to a promise meaning not every item in the array needs to be a promise.
             */
            static all<R>(promises: Array<IThenable<R>>): IThenable<Array<R>>;
            /**
             * Returns a promise that fulfills when every item in the array is fulfilled.
             * Casts arguments to promises if necessary. The result argument of the 
             * returned promise is an array containing the fulfillment result arguments 
             * in-order. The rejection argument is the rejection argument of the 
             * first-rejected promise.
             * 
             * @param promises An array of objects, if an object is not a promise, it will be cast.
             */
            static all<R>(promises: Array<R>): IThenable<Array<R>>;
            static all(promises: Array<any>): IThenable<Array<any>> {
                if (!isArray(promises)) {
                    var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                    $exception.fatal(new TypeError('You must pass an array to all.'), $exception.PROMISE);
                }

                return new Promise<Array<any>>((resolve: (value?: Array<any>) => void, reject: (reason?: any) => void) => {
                    var results: Array<any> = [],
                        remaining = promises.length,
                        promise: Promise<any>;

                    if (remaining === 0) {
                        resolve(<any>[]);
                    }

                    function resolver(index: number) {
                        return (value: any) => resolveAll(index, value);
                    }

                    function resolveAll(index: number, value: any) {
                        results[index] = value;
                        if (--remaining === 0) {
                            resolve(<any>results);
                        }
                    }

                    for (var i = 0; i < promises.length; i++) {
                        promise = promises[i];

                        if (promise && isFunction(promise.then)) {
                            promise.then(resolver(i), reject);
                        } else {
                            resolveAll(i, promise);
                        }
                    }
                });
            }

            /**
             * Creates a promise that fulfills to the passed in object. If the 
             * passed-in object is a promise it returns the promise.
             * 
             * @param object The object to cast to a Promise.
             */
            static cast<R>(object?: R): Promise<R> {
                if (isObject(object) && (<any>object).constructor === Promise) {
                    return <Promise<R>>(<any>object);
                }

                return new Promise<R>((resolve: (value: R) => any) => resolve(object));
            }

            /**
             * Returns a promise that fulfills as soon as any of the promises fulfill,
             * or rejects as soon as any of the promises reject (whichever happens first).
             * 
             * @param promises An Array of promises to 'race'.
             */
            static race<R>(promises: Array<IThenable<R>>): IThenable<R>;
            /**
             * Returns a promise that fulfills as soon as any of the promises fulfill,
             * or rejects as soon as any of the promises reject (whichever happens first).
             * 
             * @param promises An Array of anything to 'race'. Objects that aren't promises will
             * be cast.
             */
            static race<R>(promises: Array<R>): IThenable<R>;
            static race(promises: Array<any>): IThenable<any> {
                if (!isArray(promises)) {
                    var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                    $exception.fatal(new TypeError('You must pass an array to race.'), $exception.PROMISE);
                }

                return new Promise<any>((resolve: (value: any) => any, reject: (error: any) => any) => {
                    var results: Array<any> = [],
                        promise: Promise<any>;

                    for (var i = 0; i < promises.length; i++) {
                        promise = promises[i];

                        if (promise && typeof promise.then === 'function') {
                            promise.then(resolve, reject);
                        } else {
                            resolve(<any>promise);
                        }
                    }
                });
            }

            /**
             * Returns a promise that resolves with the input value.
             * 
             * @param value The value to resolve.
             */
            static resolve<R>(value?: R): IThenable<R> {
                return new Promise<R>((resolve: (value: R) => any, reject: (reason: any) => any) => {
                    resolve(value);
                });
            }

            /**
             * Returns a promise that rejects with the input value.
             * 
             * @param value The value to reject.
             */
            static reject(error?: any): IThenable<void> {
                return new Promise<void>((resolve: (value: any) => any, reject: (error: any) => any) => {
                    reject(error);
                });
            }

            private static __invokeResolveFunction<R>(resolveFunction: IResolveFunction<R>,
                promise: Promise<R>): void {
                function resolvePromise(value?: any) {
                    Promise.__resolve<R>(promise, value);
                }

                function rejectPromise(reason?: any) {
                    Promise.__reject(promise, reason);
                }

                try {
                    resolveFunction(resolvePromise, rejectPromise);
                } catch (e) {
                    rejectPromise(e);
                }
            }

            private static __invokeCallback(settled: State, promise: any, callback: (response: any) => void, detail: any): void {
                var hasCallback = isFunction(callback),
                    value: any,
                    error: Error,
                    succeeded: boolean,
                    failed: boolean;

                if (hasCallback) {
                    try {
                        value = callback(detail);
                        succeeded = true;
                    } catch (e) {
                        failed = true;
                        error = e;
                    }
                } else {
                    value = detail;
                    succeeded = true;
                }

                if (Promise.__handleThenable<any>(promise, value)) {
                    return;
                } else if (hasCallback && succeeded) {
                    Promise.__resolve<any>(promise, value);
                } else if (failed) {
                    Promise.__reject(promise, error);
                } else if (settled === State.FULFILLED) {
                    Promise.__resolve<any>(promise, value);
                } else if (settled === State.REJECTED) {
                    Promise.__reject(promise, value);
                }
            }

            private static __publish(promise: Promise<any>, settled: State): void {
                var subscribers = promise.__subscribers,
                    detail = promise.__detail,
                    child: any,
                    callback: () => void;

                for (var i = 0; i < subscribers.length; i += 3) {
                    child = subscribers[i];
                    callback = subscribers[i + settled];

                    Promise.__invokeCallback(settled, child, callback, detail);
                }

                promise.__subscribers = null;
            }

            private static __publishFulfillment(promise: any): void {
                Promise.__publish(promise, promise.__state = State.FULFILLED);
            }

            private static __publishRejection(promise: any): void {
                Promise.__publish(promise, promise.__state = State.REJECTED);
            }

            private static __reject(promise: any, reason: any): void {
                if (promise.__state !== State.PENDING) {
                    return;
                }
                promise.__state = State.SEALED;
                promise.__detail = reason;

                Promise.config.async(Promise.__publishRejection, promise);
            }

            private static __fulfill<T>(promise: any, value: any): void {
                if (promise.__state !== State.PENDING) {
                    return;
                }
                promise.__state = State.SEALED;
                promise.__detail = value;

                Promise.config.async(Promise.__publishFulfillment, promise);
            }

            private static __resolve<R>(promise: Promise<R>, value: any): void {
                if (promise === value) {
                    Promise.__fulfill(promise, value);
                } else if (!Promise.__handleThenable<R>(promise, value)) {
                    Promise.__fulfill(promise, value);
                }
            }

            private static __handleThenable<R>(promise: Promise<any>, value: Promise<any>): boolean {
                var then: typeof Promise.prototype.then = null,
                    resolved: boolean;

                try {
                    if (promise === value) {
                        var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                        $exception.fatal(new TypeError('A promises callback cannot return that same promise.'),
                            $exception.PROMISE);
                    }

                    if (isObject(value) || isFunction(value)) {
                        then = value.then;

                        if (isFunction(then)) {
                            then.call(value, (val: any) => {
                                if (resolved) {
                                    return true;
                                }
                                resolved = true;

                                if (value !== val) {
                                    Promise.__resolve<R>(promise, val);
                                } else {
                                    Promise.__fulfill<R>(promise, val);
                                }
                            }, (val: any) => {
                                if (resolved) {
                                    return true;
                                }
                                resolved = true;

                                Promise.__reject(promise, val);
                            });

                            return true;
                        }
                    }
                } catch (error) {
                    if (resolved) {
                        return true;
                    }
                    Promise.__reject(promise, error);
                    return true;
                }

                return false;
            }

            private static __subscribe(parent: Promise<any>, child: IThenable<any>,
                onFulfilled: (success: any) => any, onRejected?: (error: any) => any): void {
                var subscribers = parent.__subscribers;
                var length = subscribers.length;

                subscribers[length] = child;
                subscribers[length + State.FULFILLED] = onFulfilled;
                subscribers[length + State.REJECTED] = onRejected;
            }

            /**
             * An ES6 implementation of Promise. Useful for asynchronous programming.
             * 
             * @param resolveFunction A IResolveFunction for fulfilling/rejecting the Promise.
             */
            constructor(resolveFunction: IResolveFunction<R>) {
                var $exception: IExceptionStatic;
                if (!isFunction(resolveFunction)) {
                    $exception = acquire(__ExceptionStatic);
                    $exception.fatal(new TypeError('You must pass a resolver function as the first argument to the promise constructor'),
                        $exception.PROMISE);
                }

                if (!(this instanceof Promise)) {
                    $exception = acquire(__ExceptionStatic);
                    $exception.fatal(new TypeError('Failed to construct "Promise": ' +
                        'Please use the "new" operator, this object constructor cannot be called as a function.'),
                        $exception.PROMISE);
                }

                this.__subscribers = [];

                Promise.__invokeResolveFunction<R>(resolveFunction, this);
            }

            then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => IThenable<U>): IThenable<U>;
            then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => U): IThenable<U>;
            then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => IThenable<U>): IThenable<U>;
            then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => U): IThenable<U>;
            then<U>(onFulfilled: (success: R) => any, onRejected?: (error: any) => any): IThenable<U> {
                var promise = this;
            
                var thenPromise = <IThenable<U>>new (<any>this).constructor(() => { }, this);

                if (this.__state) {
                    var callbacks = arguments;
                    Promise.config.async(() => {
                        Promise.__invokeCallback(promise.__state, thenPromise, callbacks[promise.__state - 1], promise.__detail);
                    });
                } else {
                    Promise.__subscribe(this, thenPromise, onFulfilled, onRejected);
                }

                return thenPromise;
            }

            catch<U>(onRejected: (error: any) => IThenable<U>): IThenable<U>;
            catch<U>(onRejected: (error: any) => U): IThenable<U>;
            catch<U>(onRejected: (error: any) => any): IThenable<U> {
                return this.then(null, onRejected);
            }
        }

        export interface IThenable<R> {
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * 
             * @param onFulfilled A method called when/if the promise fulills. If undefined the next
             * onFulfilled method in the promise chain will be called.
             * @param onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => IThenable<U>): IThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * 
             * @param onFulfilled A method called when/if the promise fulills. If undefined the next
             * onFulfilled method in the promise chain will be called.
             * @param onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => U): IThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * 
             * @param onFulfilled A method called when/if the promise fulills. If undefined the next
             * onFulfilled method in the promise chain will be called.
             * @param onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => IThenable<U>): IThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * 
             * @param onFulfilled A method called when/if the promise fulills. If undefined the next
             * onFulfilled method in the promise chain will be called.
             * @param onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => U): IThenable<U>;

            /**
             * A wrapper method for Promise.then(undefined, onRejected);
             * 
             * @param onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            catch<U>(onRejected: (error: any) => IThenable<U>): IThenable<U>;
            /**
             * A wrapper method for Promise.then(undefined, onRejected);
             * 
             * @param onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            catch<U>(onRejected: (error: any) => U): IThenable<U>;
        }

        enum State {
            PENDING = <any>(void 0),
            SEALED = 0,
            FULFILLED = 1,
            REJECTED = 2
        };

        var browserGlobal: any = (typeof window !== 'undefined') ? window : {},
            BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;

        // node
        function useNextTick(): () => void {
            return () => {
                process.nextTick(flush);
            };
        }
    
        function useMutationObserver(): () => void {
            var observer = new BrowserMutationObserver(flush),
                $document = acquire(__Document),
                $window = acquire(__Window),
                element = $document.createElement('div');

            observer.observe(element, { attributes: true });

            $window.addEventListener('unload', () => {
                observer.disconnect();
                observer = null;
            }, false);

            return () => {
                element.setAttribute('drainQueue', 'drainQueue');
            };
        }

        function useSetTimeout(): () => void {
            var global: any = global,
                local = (typeof global !== 'undefined') ? global : this;

            return () => {
                local.setTimeout(flush, 1);
            };
        }

        var queue: Array<any> = [];
        function flush(): void {
            var tuple: Array<(response: any) => void>,
                callback: (response: any) => void,
                arg: any;

            for (var i = 0; i < queue.length; i++) {
                tuple = queue[i];
                callback = tuple[0];
                arg = tuple[1];
                callback(arg);
            }
            queue = [];
        }

        var process: any = process,
            scheduleFlush: () => void;

        // Decide what async method to use to triggering processing of queued callbacks:
        if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
            scheduleFlush = useNextTick();
        } else if (BrowserMutationObserver) {
            scheduleFlush = useMutationObserver();
        } else {
            scheduleFlush = useSetTimeout();
        }

        /**
         * Describes a function passed into the constructor for a Promise. The function allows you to
         * resolve/reject the Promise.
         */
        export interface IResolveFunction<R> {
            /**
             * A function which allows you to resolve/reject a Promise.
             * 
             * @param resolve A method for resolving a Promise. If you pass in a 'thenable' argument 
             * (meaning if you pass in a Promise-like object), then the promise will resolve with the 
             * outcome of the object. Else the promise will resolve with the argument.
             * @param reject A method for rejecting a promise. The argument should be an instancof Error
             * to assist with debugging. If a method in the constructor for a Promise throws an error, 
             * the promise will reject with the error.
             */
            (resolve: (value?: R) => void, reject: (reason?: any) => void): void;
        }

        /**
         * The Type for referencing the '$Promise' injectable as a dependency.
         */
        export function IPromise($Window?: any): IPromise {
            if (!isNull($Window.Promise) &&
                isFunction($Window.Promise.all) &&
                isFunction($Window.Promise.cast) &&
                isFunction($Window.Promise.race) &&
                isFunction($Window.Promise.resolve) &&
                isFunction($Window.Promise.reject)) {
                return $Window.Promise;
            }
            return Promise;
        }

        register.injectable(__Promise, IPromise, [__Window], register.CLASS);

        /**
         * The injectable reference for the ES6 Promise implementation.
         */
        export interface IPromise {
            /**
             * An ES6 implementation of the Promise API. Useful for asynchronous programming.
             * Takes in 2 generic types corresponding to the fullfilled success and error types. 
             * The error type (U) should extend Error in order to get proper stack tracing.
             * 
             * @param resolveFunction A IResolveFunction for fulfilling/rejecting the Promise.
             */
            new <R>(resolveFunction: IResolveFunction<R>): IThenable<R>;

            /**
             * Returns a promise that fulfills when every item in the array is fulfilled.
             * Casts arguments to promises if necessary. The result argument of the
             * returned promise is an array containing the fulfillment result arguments
             * in-order. The rejection argument is the rejection argument of the
             * first-rejected promise.
             *
             * @param promises An array of promises, although every argument is potentially
             * cast to a promise meaning not every item in the array needs to be a promise.
             */
            all<R>(promises: Array<IThenable<R>>): IThenable<Array<R>>;
            /**
             * Returns a promise that fulfills when every item in the array is fulfilled.
             * Casts arguments to promises if necessary. The result argument of the
             * returned promise is an array containing the fulfillment result arguments
             * in-order. The rejection argument is the rejection argument of the
             * first-rejected promise.
             *
             * @param promises An array of objects, if an object is not a promise, it will be cast.
             */
            all<R>(promises: Array<R>): IThenable<Array<R>>;

            /**
             * Creates a promise that fulfills to the passed in object. If the
             * passed-in object is a promise it returns the promise.
             *
             * @param object The object to cast to a Promise.
             */
            cast<R>(object?: R): IThenable<R>;

            /**
             * Returns a promise that fulfills as soon as any of the promises fulfill,
             * or rejects as soon as any of the promises reject (whichever happens first).
             *
             * @param promises An Array of promises to 'race'.
             */
            race<R>(promises: Array<IThenable<R>>): IThenable<R>;
            /**
             * Returns a promise that fulfills as soon as any of the promises fulfill,
             * or rejects as soon as any of the promises reject (whichever happens first).
             *
             * @param promises An Array of anything to 'race'. Objects that aren't promises will
             * be cast.
             */
            race<R>(promises: Array<R>): IThenable<R>;

            /**
             * Returns a promise that resolves with the input value.
             * 
             * @param value The value to resolve.
             */
            resolve<R>(value: R): IThenable<R>;

            /**
             * Returns a promise that rejects with the input value.
             * 
             * @param value The value to reject.
             */
            reject(error: any): IThenable<void>;
        }

        /**
         * HttpRequest provides a wrapper for the XmlHttpRequest object. Allows for
         * sending AJAX requests to a server. This class does not support 
         * synchronous requests.
         */
        class HttpRequest implements IHttpRequest {
            /**
             * The timeout ID associated with the specified timeout
             */
            clearTimeout: () => void;
            /**
             * The created XMLHttpRequest
             */
            xhr: XMLHttpRequest;
            /**
             * The JSONP callback name
             */
            jsonpCallback: string;

            /**
             * The plat.IBrowser injectable instance
             */
            $Browser: web.IBrowser = acquire(__Browser);
            /**
             * The injectable instance of type Window
             */
            $Window: Window = acquire(__Window);
            /**
             * The injectable instance of type Document
             */
            $Document: Document = acquire(__Document);
            /**
             * The configuration for an HTTP Request
             */
            $config: IHttpConfig = acquire(__HttpConfig);

            private __fileSupported = (<ICompat>acquire(__Compat)).fileSupported;
            private __options: IHttpConfig;

            /**
             * @param options The IHttpConfigStatic used to customize this HttpRequest.
             */
            constructor(options: IHttpConfig) {
                this.__options = extend({}, this.$config, options);
            }

            execute<R>(): IAjaxPromise<R> {
                var options = this.__options,
                    url = options.url;

                if (!isString(url) || isEmpty(url.trim())) {
                    return this._invalidOptions();
                }

                options.url = this.$Browser.urlUtils(url).toString();

                var isCrossDomain = options.isCrossDomain || false,
                    xDomain = false;

                // check if forced cross domain call or cors is not supported (IE9)
                if (isCrossDomain) {
                    xDomain = true;
                } else {
                    this.xhr = new XMLHttpRequest();
                    if (isUndefined(this.xhr.withCredentials)) {
                        xDomain = this.$Browser.isCrossDomain(url);
                    }
                }

                if (xDomain) {
                    this.xhr = null;
                    this.jsonpCallback = options.jsonpCallback || uniqueId('plat_callback');
                    return this.executeJsonp();
                }

                return this._sendXhrRequest();
            }

            executeJsonp<R>(): IAjaxPromise<R> {
                var options = this.__options,
                    url = options.url;

                if (!isString(url) || isEmpty(url.trim())) {
                    return this._invalidOptions();
                }

                options.url = this.$Browser.urlUtils(url).toString();
                if (isNull(this.jsonpCallback)) {
                    this.jsonpCallback = options.jsonpCallback || uniqueId('plat_callback');
                }

                return new AjaxPromise((resolve, reject) => {
                    var $window = <any>this.$Window,
                        $document = this.$Document,
                        scriptTag = $document.createElement('script'),
                        jsonpCallback = this.jsonpCallback,
                        jsonpIdentifier = options.jsonpIdentifier || 'callback';

                    scriptTag.src = url + '?' + jsonpIdentifier + '=' + jsonpCallback;

                    var oldValue = $window[jsonpCallback];
                    $window[jsonpCallback] = (response: any) => {
                        //clean up
                        if (isFunction(this.clearTimeout)) {
                            this.clearTimeout();
                        }

                        $document.head.removeChild(scriptTag);
                        if (!isUndefined(oldValue)) {
                            $window[jsonpCallback] = oldValue;
                        } else {
                            delete $window[jsonpCallback];
                        }

                        //call callback
                        resolve({
                            response: response,
                            status: 200 // OK
                        });
                    };

                    $document.head.appendChild(scriptTag);

                    var timeout = options.timeout;
                    if (isNumber(timeout) && timeout > 0) {
                        // We first postpone to avoid always timing out when debugging, though this is not
                        // a foolproof method.
                        this.clearTimeout = postpone(() => {
                            this.clearTimeout = defer(() => {
                                reject(new AjaxError({
                                    response: 'Request timed out in ' + timeout + 'ms for ' + url,
                                    status: 408 // Request Timeout
                                }));
                                $window[jsonpCallback] = noop;
                            }, timeout - 1);
                        });
                    }
                }, { __http: this });
            }

            /**
             * A wrapper for the XMLHttpRequest's onReadyStateChanged callback.
             *
             * @return {bool} Waits for the readyState to be complete and then 
             * return true in the case of a success and false in the case of 
             * an error.
             */
            _xhrOnReadyStateChange(): boolean {
                var xhr = this.xhr;
                if (xhr.readyState === 4) {
                    var status = xhr.status,
                        responseType = xhr.responseType;

                    if (status === 0) {
                        var response = xhr.response;
                        if (isNull(response) && responseType === '' || responseType === 'text') {
                            response = xhr.responseText;
                        }

                        // file protocol issue **Needs to be tested more thoroughly**
                        // OK if response is not empty, Not Found otherwise
                        if (!isEmpty(response)) {
                            return true;
                        }

                        return false;
                    }

                    // 304 is not modified
                    if ((status >= 200 && status < 300) || status === 304) {
                        return true;
                    } else {
                        return false;
                    }
                }
                // else {} TODO: add progress for xhr if we choose to add progress to AjaxPromise
            }

            /**
             * The function that initializes and sends the XMLHttpRequest.
             *
             * @return {Promise<IAjaxResponse>} A promise that fulfills with the 
             * formatted IAjaxResponse and rejects if there is a problem with an 
             * IAjaxError.
             */
            _sendXhrRequest(): IAjaxPromise<any> {
                var xhr = this.xhr,
                    options = this.__options,
                    method = options.method,
                    url = options.url;

                return new AjaxPromise((resolve, reject) => {
                    xhr.onreadystatechange = () => {
                        var success = this._xhrOnReadyStateChange();

                        if (isNull(success)) {
                            return;
                        }

                        var response = this._formatResponse(options.responseType, success);

                        if (success) {
                            resolve(response);
                        } else {
                            reject(new AjaxError(response));
                        }

                        this.xhr = options = null;
                    };

                    if (!isString(method)) {
                        var Exception: IExceptionStatic = acquire(__ExceptionStatic);
                        Exception.warn('AjaxOptions method was not of type string. Defaulting to "GET".', Exception.AJAX);
                        method = 'GET';
                    }

                    xhr.open(
                        method.toUpperCase(),
                        url,
                        true, // synchronous XHR not supported
                        options.user,
                        options.password
                        );

                    var responseType = options.responseType;
                    if (!(this.__fileSupported || responseType === '' || responseType === 'text')) {
                        responseType = '';
                    }

                    xhr.responseType = responseType;
                    xhr.withCredentials = options.withCredentials;

                    var mimeType = options.overrideMimeType,
                        data = options.data;

                    if (isString(mimeType) && !isEmpty(mimeType)) {
                        xhr.overrideMimeType(mimeType);
                    }

                    if (isNull(data) || data === '') {
                        // no data exists so set headers and send request
                        this.__setHeaders();
                        xhr.send();
                    } else {
                        var transforms = options.transforms || [],
                            length = transforms.length,
                            contentType = options.contentType,
                            contentTypeExists = isString(contentType) && !isEmpty(contentType);

                        if (length > 0) {
                            // if data transforms defined, assume they're going to take care of 
                            // any and all transformations.
                            for (var i = 0; i < length; ++i) {
                                data = transforms[i](data, xhr);
                            }

                            // if contentType exists, assume they did not set it in 
                            // their headers as well
                            if (contentTypeExists) {
                                xhr.setRequestHeader('Content-Type', contentType);
                            }

                            this.__setHeaders();
                            xhr.send(data);
                        } else if (isObject(data)) {
                            // if isObject and contentType exists we want to transform the data
                            if (contentTypeExists) {
                                var contentTypeLower = contentType.toLowerCase();
                                if (contentTypeLower.indexOf('x-www-form-urlencoded') !== -1) {
                                    // perform an encoded form transformation
                                    data = this.__serializeFormData();
                                    // set Content-Type header because we're assuming they didn't set it 
                                    // in their headers object
                                    xhr.setRequestHeader('Content-Type', contentType);
                                    this.__setHeaders();
                                    xhr.send(data);
                                } else if (contentTypeLower.indexOf('multipart/form-data') !== -1) {
                                    // need to check if File is a supported object
                                    if (this.__fileSupported) {
                                        // use FormData
                                        data = this.__appendFormData();
                                        // Do not set the Content-Type header due to modern browsers 
                                        // setting special headers for multipart/form-data
                                        this.__setHeaders();
                                        xhr.send(data);
                                    } else {
                                        // use iframe trick for older browsers (do not send a request)
                                        // this case is the reason for this giant, terrible, nested if-else statement
                                        this.__submitFramedFormData().then((response) => {
                                            resolve(response);
                                        }, () => {
                                            this.xhr = null;
                                        });
                                    }
                                } else {
                                    // assume stringification is possible
                                    data = JSON.stringify(data);
                                    // set Content-Type header because we're assuming they didn't set it 
                                    // in their headers object
                                    xhr.setRequestHeader('Content-Type', contentType);
                                    this.__setHeaders();
                                    xhr.send(data);
                                }
                            } else {
                                // contentType does not exist so simply set defined headers and send raw data
                                this.__setHeaders();
                                xhr.send(data);
                            }
                        } else {
                            // if contentType exists set Content-Type header because we're assuming they didn't set it 
                            // in their headers object
                            if (contentTypeExists) {
                                xhr.setRequestHeader('Content-Type', contentType);
                            }

                            this.__setHeaders();
                            xhr.send(data);
                        }
                    }

                    var timeout = options.timeout;
                    if (isNumber(timeout) && timeout > 0) {
                        // We first postpone to avoid always timing out when debugging, though this is not
                        // a foolproof method.
                        this.clearTimeout = postpone(() => {
                            this.clearTimeout = defer(() => {
                                reject(new AjaxError({
                                    response: 'Request timed out in ' + timeout + 'ms for ' + options.url,
                                    status: xhr.status,
                                    getAllResponseHeaders: xhr.getAllResponseHeaders,
                                    xhr: xhr
                                }));

                                xhr.onreadystatechange = null;
                                xhr.abort();
                                this.xhr = null;
                            }, timeout - 1);
                        });
                    }
                }, { __http: this });
            }
        
            /**
             * Returns a promise that is immediately rejected due to an error.
             *
             * @return {Promise<IAjaxResponse>} A promise that immediately rejects 
             * with an IAjaxError
             */
            _invalidOptions(): IAjaxPromise<any> {
                return new AjaxPromise((resolve, reject) => {
                    var exceptionFactory: IExceptionStatic = acquire(__ExceptionStatic);
                    exceptionFactory.warn('Attempting a request without specifying a url', exceptionFactory.AJAX);
                    reject(new AjaxError({
                        response: 'Attempting a request without specifying a url',
                        status: null,
                        getAllResponseHeaders: null,
                        xhr: null
                    }));
                });
            }
        
            /**
             * The function that formats the response from the XMLHttpRequest
             *
             * @param responseType The user designated responseType
             * @param success Signifies if the response was a success
             * @return {IAjaxResponse} The IAjaxResponse to be returned to 
             * the requester.
             */
            _formatResponse(responseType: string, success: boolean): IAjaxResponse<any> {
                var xhr = this.xhr,
                    status = xhr.status,
                    response = xhr.response,
                    xhrResponseType = xhr.responseType;

                // need to do this instead of boolean short circuit because chrome doesn't like checking 
                // responseText when the responseType is anything other than empty or 'text'
                if (isNull(response) && (xhrResponseType === '' || xhrResponseType === 'text')) {
                    response = xhr.responseText;
                }

                if (status === 0) {
                    // file protocol issue **Needs to be tested more thoroughly**
                    // OK if response empty, Not Found otherwise
                    status = success ? 200 : 404;
                }

                xhr.onreadystatechange = null;

                if (isFunction(this.clearTimeout)) {
                    this.clearTimeout();
                }

                if (responseType === 'json' && isString(response)) {
                    try {
                        response = JSON.parse(response);
                    } catch (e) { }
                }

                return {
                    response: response,
                    status: status,
                    getAllResponseHeaders: xhr.getAllResponseHeaders,
                    xhr: xhr
                };
            }

            private __setHeaders(): void {
                var headers = this.__options.headers,
                    keys = Object.keys(headers || {}),
                    xhr = this.xhr,
                    length = keys.length,
                    key: string,
                    i: number;

                for (i = 0; i < length; ++i) {
                    key = keys[i];
                    xhr.setRequestHeader(key, headers[key]);
                }
            }
            private __serializeFormData(): string {
                var data = this.__options.data,
                    keys = Object.keys(data),
                    key: string,
                    val: any,
                    formBuffer: Array<string> = [],
                    formStr = '';

                while (keys.length > 0) {
                    key = keys.pop();
                    val = data[key];
                    if (isNull(val)) {
                        val = '';
                    } else if (isObject(val)) {
                        // may throw a fatal error but this is an invalid case
                        var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                        $exception.warn('Invalid form entry with key "' + key + '" and value "' + val, $exception.AJAX);
                        val = JSON.stringify(val);
                    }

                    formBuffer.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
                }

                return formBuffer.join('&').replace(/%20/g, '+');
            }
            private __appendFormData(): FormData {
                var data = this.__options.data,
                    formData = new FormData(),
                    keys = Object.keys(data),
                    key: string,
                    val: any;

                while (keys.length > 0) {
                    key = keys.pop();
                    val = data[key];
                    if (isNull(val)) {
                        formData.append(key, '');
                    } else if (isObject(val)) {
                        if (isFile(val)) {
                            formData.append(key, val, val.name || val.fileName || 'blob');
                        } else {
                            // may throw a fatal error but this is an invalid case
                            var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                            $exception.warn('Invalid form entry with key "' + key + '" and value "' + val, $exception.AJAX);
                            formData.append(key, JSON.stringify(val));
                        }
                    } else {
                        formData.append(key, val);
                    }
                }

                return formData;
            }
            private __submitFramedFormData(): IThenable<IAjaxResponse<any>> {
                var options = this.__options,
                    data = options.data,
                    url = options.url,
                    $document = this.$Document,
                    $body = $document.body,
                    Promise: IPromise = acquire(__Promise),
                    form = $document.createElement('form'),
                    iframe = $document.createElement('iframe'),
                    iframeName = uniqueId('iframe_target'),
                    keys = Object.keys(data),
                    key: string;

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

                return new Promise<IAjaxResponse<any>>((resolve, reject) => {
                    this.xhr.abort = () => {
                        iframe.onload = null;
                        $body.removeChild(form);
                        $body.removeChild(iframe);
                        reject();
                    };

                    iframe.onload = () => {
                        var content = iframe.contentDocument.body.innerHTML;

                        $body.removeChild(form);
                        $body.removeChild(iframe);

                        resolve({
                            response: content,
                            status: 200,
                            getAllResponseHeaders: () => ''
                        });

                        this.xhr = iframe.onload = null;
                    };

                    $body.insertBefore(form, null);
                    $body.insertBefore(iframe, null);
                    form.submit();
                });
            }
            private __createInput(key: string, val: any): HTMLInputElement {
                var $document = this.$Document,
                    $exception: IExceptionStatic,
                    input = <HTMLInputElement>$document.createElement('input');

                input.type = 'hidden';
                input.name = key;

                if (isNull(val)) {
                    input.value = '';
                } else if (isObject(val)) {
                    // check if val is an pseudo File
                    if (isFunction(val.slice) && !(isUndefined(val.name) || isUndefined(val.path))) {
                        var fileList = $document.querySelectorAll('input[type="file"][name="' + key + '"]'),
                            length = fileList.length;
                        // if no inputs found, stringify the data
                        if (length === 0) {
                            $exception = acquire(__ExceptionStatic);
                            $exception.warn('Could not find input[type="file"] with [name="' + key +
                                '"]. Stringifying data instead.', $exception.AJAX);
                            input.value = JSON.stringify(val);
                        } else if (length === 1) {
                            input = <HTMLInputElement>fileList[0];
                            // swap nodes
                            var clone = input.cloneNode(true);
                            input.parentNode.insertBefore(clone, input);
                        } else {
                            // rare case but may have multiple forms with file inputs 
                            // that have the same name
                            var fileInput: HTMLInputElement,
                                path = val.path;
                            while (length-- > 0) {
                                fileInput = <HTMLInputElement>fileList[length];
                                if (fileInput.value === path) {
                                    input = fileInput;
                                    // swap nodes
                                    var inputClone = input.cloneNode(true);
                                    input.parentNode.insertBefore(inputClone, input);
                                    break;
                                }
                            }

                            // could not find the right file
                            if (length === -1) {
                                $exception = acquire(__ExceptionStatic);
                                $exception.warn('Could not find input[type="file"] with [name="' + key + '"] and [value="' +
                                    val.path + '"]. Stringifying data instead.', $exception.AJAX);
                                input.value = JSON.stringify(val);
                            }
                        }
                    } else {
                        // may throw a fatal error but this is an invalid case
                        $exception = acquire(__ExceptionStatic);
                        $exception.warn('Invalid form entry with key "' + key + '" and value "' + val, $exception.AJAX);
                        input.value = JSON.stringify(val);
                    }
                } else {
                    input.value = val;
                }

                return input;
            }
        }

        /**
         * Describes an object that provides a wrapper for either the XmlHttpRequest object 
         * or a JSONP callback. Allows for sending AJAX requests to a server.
         */
        interface IHttpRequest {
            /**
             * Performs either the XmlHttpRequest or the JSONP callback and returns an AjaxPromise. 
             * The Promise is fulfilled or rejected when either the XmlHttpRequest returns or the 
             * JSONP callback is fired.
             *
             * @return {IAjaxPromise} A promise that fulfills/rejects
             * when either the XmlHttpRequest returns (Response statuses >= 200 and < 300 are a success.
             * Other response statuses are failures) or the JSONP callback is fired.
             */
            execute<R>(): IAjaxPromise<R>;

            /**
             * Adds the script tag and processes the callback for the JSONP. The AjaxPromise from 
             * the ajax or jsonp call is fulfilled or rejected when the JSONP callback is called.
             *
             * @return {IAjaxPromise} A promise that fulfills with the 
             * JSONP callback and rejects if there is a problem.
             */
            executeJsonp<R>(): IAjaxPromise<R>;
        }

        /**
         * Describes an object which contains Ajax configuration properties.
         */
        export interface IHttpConfig extends IJsonpConfig {
            /**
             * The HTTP method type of XmlHttpRequest such as 'GET', 'POST', 'PUT', 
             * 'DELETE', etc. Ignored for non-HTTP urls. Defaults to 'GET'.
             */
            method?: string;

            /**
             * The number of milliseconds a request can take before 
             * automatically being terminated. A value of 0 
             * means there is no timeout. 
             */
            timeout?: number;

            /**
             * An optional user string for the XmlHttpRequest
             */
            user?: string;

            /**
             * An optional password string for the XmlHttpRequest
             */
            password?: string;

            /**
             * The XMLHttpRequestResponseType. The response should 
             * still be checked when received due to browser 
             * incompatibilities. If a browser does not support a 
             * response type it will return the value as a string. 
             * The response type does not affect JSONP callback 
             * arguments.
             * 
             * @see config.XMLHttpRequestResponseType
             */
            responseType?: string;

            /**
             * The Content-Type header for XMLHttpRequest when 
             * data is being sent. The default is 
             * 'application/json;charset=utf-8;'.
             */
            contentType?: string;

            /**
             * A string to override the MIME type returned by the server.
             */
            overrideMimeType?: string;

            /**
             * A key/value pair object where the key is a DOMString header key
             * and the value is the DOMString header value.
             */
            headers?: any;

            /**
             * Indicates whether or not cross-site Access-Control requests 
             * should be made using credentials such as cookies or 
             * authorization headers. The default is false.
             */
            withCredentials?: boolean;

            /**
             * The request payload
             */
            data?: any;

            /**
             * Forces a JSONP, cross-domain request when set to true.
             * The default is false.
             */
            isCrossDomain?: boolean;
        }

        /**
         * Describes an object which contains JSONP configuration properties.
         */
        export interface IJsonpConfig {
            /**
             * The url for the JSONP callback 
             * (without the ?{callback}={callback_name} parameter in the url)
             */
            url: string;

            /**
             * The identifier the server uses to get the name of the JSONP
             * callback. The default is 'callback' as seen in 
             * http://www.platyfi.com/data?callback=plat_fnName.
             */
            jsonpIdentifier?: string;

            /**
             * A specified name for the JSONP callback (in case the server has 
             * it hardcoded and/or does not get it from the given url). The 
             * default is a unique plat id generated separately for 
             * each JSONP callback seen as 'plat_callback00' in
             * http://www.platyfi.com/data?callback=plat_callback00.
             */
            jsonpCallback?: string;

            /**
             * An array of data transform functions that fire in order and consecutively 
             * pass the returned result from one function to the next.
             */
            transforms?: Array<(data: any, xhr: XMLHttpRequest) => any>;
        }

        /**
         * Describes an object that is the response to an AJAX request.
         */
        export interface IAjaxResponse<R> {
            /**
             * The AJAX response or responseText. The response should 
             * be checked when received due to browser 
             * incompatibilities with responseType. If a browser does 
             * not support a response type it will return the value as 
             * a string.
             */
            response: R;

            /**
             * The XHR status. Resolves as 200 for JSONP.
             */
            status: number;

            /**
             * A method for getting the XHR response headers.
             */
            getAllResponseHeaders?: () => string;

            /**
             * The XMLHttpRequest object associated with the AJAX call
             */
            xhr?: XMLHttpRequest;
        }

        /**
         * Describes the AjaxPromise's resolve function
         */
        export interface IAjaxResolveFunction<R> {
            (resolve: (value?: IAjaxResponse<R>) => any, reject: (reason?: IAjaxError) => any): void;
        }

        /**
         * A class that forms an Error object with an IAjaxResponse.
         */
        class AjaxError implements IAjaxError {
            name: string = 'AjaxError';
            message: string;
            response: any;
            status: number;
            getAllResponseHeaders: () => string;
            xhr: XMLHttpRequest;

            constructor(response: IAjaxResponse<any>) {
                Error.apply(this);
                this.response = this.message = response.response;
                this.status = response.status;
                this.getAllResponseHeaders = response.getAllResponseHeaders;
                this.xhr = response.xhr;
            }

            toString(): string {
                var response = this.response,
                    responseText = response;

                if (isObject(response) && !response.hasOwnProperty('toString')) {
                    responseText = JSON.stringify(response);
                }

                return 'Request failed with status: ' + this.status + ' and response: ' + responseText;
            }
        }

        // Have to bypass TS flags in order to properly extend Error
        (<any>AjaxError).prototype = Error.prototype;

        /**
         * Describes an object that forms an Error object with an IAjaxResponse.
         */
        export interface IAjaxError extends Error, IAjaxResponse<any> { }

        /**
         * Describes a type of Promise that fulfills with an IAjaxResponse and can be optionally canceled.
         */
        export class AjaxPromise<R> extends Promise<IAjaxResponse<R>> implements IAjaxPromise<R> {
            $Window: Window = acquire(__Window);
            private __http: HttpRequest;
            constructor(resolveFunction: IAjaxResolveFunction<R>, promise?: any) {
                super(resolveFunction);
                if (!isNull(promise)) {
                    this.__http = promise.__http;
                }
            }

            /**
             * A method to cancel the AJAX call associated with this AjaxPromise.
             */
            cancel(): void {
                var http = this.__http,
                    xhr = http.xhr,
                    jsonpCallback = http.jsonpCallback;

                if (isFunction(http.clearTimeout)) {
                    http.clearTimeout();
                }

                if (!isNull(xhr)) {
                    xhr.onreadystatechange = null;
                    xhr.abort();
                    http.xhr = null;
                } else if (!isNull(jsonpCallback)) {
                    (<any>this.$Window)[jsonpCallback] = noop;
                }

                (<any>this).__subscribers = [];
            }

            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * 
             * @param onFulfilled A method called when/if the promise fulills. If undefined the next
             * onFulfilled method in the promise chain will be called.
             * @param onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: IAjaxResponse<R>) => U,
                onRejected?: (error: IAjaxError) => any): IThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * 
             * @param onFulfilled A method called when/if the promise fulills. If undefined the next
             * onFulfilled method in the promise chain will be called.
             * @param onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: IAjaxResponse<R>) => IThenable<U>,
                onRejected?: (error: IAjaxError) => IThenable<U>): IThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * 
             * @param onFulfilled A method called when/if the promise fulills. If undefined the next
             * onFulfilled method in the promise chain will be called.
             * @param onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: IAjaxResponse<R>) => IThenable<U>,
                onRejected?: (error: IAjaxError) => any): IThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * 
             * @param onFulfilled A method called when/if the promise fulills. If undefined the next
             * onFulfilled method in the promise chain will be called.
             * @param onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: IAjaxResponse<R>) => U,
                onRejected?: (error: IAjaxError) => IThenable<U>): IThenable<U>;
            then<U>(onFulfilled: (success: IAjaxResponse<R>) => U,
                onRejected?: (error: IAjaxError) => any): IThenable<U> {
                return super.then<U>(onFulfilled, onRejected);
            }
        }

        /**
         * Describes a type of IPromise that fulfills with an IAjaxResponse and can be optionally canceled.
         */
        export interface IAjaxPromise<R> extends IThenable<IAjaxResponse<R>> {
            /**
             * A method to cancel the AJAX call associated with this AjaxPromise.
             */
            cancel(): void;
        
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * 
             * @param onFulfilled A method called when/if the promise fulills. If undefined the next
             * onFulfilled method in the promise chain will be called.
             * @param onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: IAjaxResponse<R>) => U,
                onRejected?: (error: IAjaxError) => any): IThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * 
             * @param onFulfilled A method called when/if the promise fulills. If undefined the next
             * onFulfilled method in the promise chain will be called.
             * @param onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: IAjaxResponse<R>) => IThenable<U>,
                onRejected?: (error: IAjaxError) => IThenable<U>): IThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * 
             * @param onFulfilled A method called when/if the promise fulills. If undefined the next
             * onFulfilled method in the promise chain will be called.
             * @param onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: IAjaxResponse<R>) => IThenable<U>,
                onRejected?: (error: IAjaxError) => any): IThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * 
             * @param onFulfilled A method called when/if the promise fulills. If undefined the next
             * onFulfilled method in the promise chain will be called.
             * @param onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: IAjaxResponse<R>) => U,
                onRejected?: (error: IAjaxError) => IThenable<U>): IThenable<U>;
        }

        /**
         * Describes an object that provides value mappings for
         * XMLHttpRequestResponseTypes
         */
        export interface IHttpResponseType {
            /**
             * The default response type (empty string)
             */
            DEFAULT: string;

            /**
             * The arrayBuffer type ('arrayBuffer')
             */
            ARRAYBUFFER: string;

            /**
             * The blob type ('blob')
             */
            BLOB: string;

            /**
             * The document type ('document')
             */
            DOCUMENT: string;

            /**
             * The json type ('json')
             */
            JSON: string;

            /**
             * The text type ('text')
             */
            TEXT: string;
        }

        /**
         * Describes an object that provides Content-Type mappings for Http POST requests.
         */
        export interface IHttpContentType {
            /**
             * Standard denotation for form encoded data. All objects are converted 
             * to string key-value pairs.
             */
            ENCODED_FORM: string;

            /**
             * Standard denotation for JavaScript Object Notation (JSON).
             */
            JSON: string;

            /**
             * Standard denotation for a multi-part Webform. Associated with 
             * an entype of 'multipart/form-data'.
             */
            MULTIPART_FORM: string;

            /**
             * Standard denotation for arbitrary binary data.
             */
            OCTET_STREAM: string;

            /**
             * Standard denotation for XML files.
             */
            XML: string;

            /**
             * Standard denotation for textual data.
             */
            PLAIN_TEXT: string;

            /**
             * Standard denotation for HTML.
             */
            HTML: string;
        }

        /**
         * The instantiated class of the injectable for making 
         * AJAX requests.
         */
        export class Http implements IHttp {
            /**
             * Default Http config
             */
            static config: IHttpConfig = {
                url: null,
                method: 'GET',
                responseType: '',
                transforms: [],
                headers: {},
                withCredentials: false,
                timeout: null,
                jsonpIdentifier: 'callback',
                contentType: 'application/json;charset=utf-8;'
            };

            /**
             * HttpResponseType mapping
             */
            responseType: IHttpResponseType = {
                DEFAULT: '',
                ARRAYBUFFER: 'arraybuffer',
                BLOB: 'blob',
                DOCUMENT: 'document',
                JSON: 'json',
                TEXT: 'text'
            };

            /**
             * Common HttpContentType mappings
             */
            contentType: IHttpContentType = {
                ENCODED_FORM: 'application/x-www-form-urlencoded;charset=utf-8;',
                JSON: 'application/json;charset=utf-8;',
                MULTIPART_FORM: 'multipart/form-data;',
                OCTET_STREAM: 'application/octet-stream;charset=utf-8;',
                XML: 'application/xml;charset=utf-8;',
                PLAIN_TEXT: 'text/plain;',
                HTML: 'text/html;'
            };

            /**
             * A wrapper method for the Http class that creates and executes a new Http with
             * the specified IAjaxOptions. This function will check if 
             * XMLHttpRequest level 2 is present, and will default to JSONP if it isn't and 
             * the request is cross-domain.
             * 
             * @param options The IAjaxOptions for either the XMLHttpRequest 
             * or the JSONP callback.
             */
            ajax<R>(options: IHttpConfig): IAjaxPromise<R> {
                return new HttpRequest(options).execute<R>();
            }

            /**
             * A direct method to force a cross-domain JSONP request.
             * 
             * @param options The IJsonpOptions 
             */
            jsonp<R>(options: IJsonpConfig): IAjaxPromise<R> {
                return new HttpRequest(options).executeJsonp<R>();
            }

            /**
             * Makes an ajax request, specifying responseType: 
             * responseType.JSON.
             * 
             * @param options The IAjaxOptions for either the XMLHttpRequest 
             * or the JSONP callback.
             * @return {AjaxPromise} A promise, when fulfilled or rejected, 
             * will return an IAjaxResponse object, with the response being a parsed 
             * JSON object (assuming valid JSON).
             */
            json<R>(options: IHttpConfig): IAjaxPromise<R> {
                return new HttpRequest(extend({}, options, { responseType: 'json' })).execute<R>();
            }
        }

        /**
         * The Type for referencing the '$Http' injectable as a dependency.
         */
        export function IHttp(): IHttp {
            return new Http();
        }

        register.injectable(__Http, IHttp);

        /**
         * Describes the interface for the Ajax injectable for making both 
         * XMLHttpRequests and JSONP requests.
         */
        export interface IHttp {
            /**
             * Describes an object that provides value mappings for
             * XMLHttpRequestResponseTypes
             */
            responseType: IHttpResponseType;

            /**
             * Describes an object that provides Content-Type mappings for Http POST requests.
             */
            contentType: IHttpContentType;

            /**
             * A wrapper method for the Http class that creates and executes a new Http with
             * the specified IAjaxOptions. This function will check if 
             * XMLHttpRequest level 2 is present, and will default to JSONP if it isn't and 
             * the request is cross-domain.
             * 
             * @param options The IAjaxOptions for either the XMLHttpRequest 
             * or the JSONP callback.
             * @return {AjaxPromise} A promise, when fulfilled
             * or rejected, will return an IAjaxResponse object.
             */
            ajax<R>(options: IHttpConfig): IAjaxPromise<R>;

            /**
             * A direct method to force a cross-domain JSONP request.
             * 
             * @param options The IJsonpOptions 
             * @return {AjaxPromise} A promise, when fulfilled
             * or rejected, will return an IAjaxResponse object.
             */
            jsonp? <R>(options: IJsonpConfig): IAjaxPromise<R>;

            /**
             * Makes an ajax request, specifying responseType: 
             * 'json'.
             * 
             * @param options The IAjaxOptions for either the XMLHttpRequest 
             * or the JSONP callback.
             * @return {AjaxPromise} A promise, when fulfilled or rejected, 
             * will return an IAjaxResponse object, with the response being a parsed 
             * JSON object (assuming valid JSON).
             */
            json? <R>(options: IHttpConfig): IAjaxPromise<R>;
        }

        /**
         * The Type for referencing the '$HttpConfig' injectable as a dependency.
         */
        export function IHttpConfig(): IHttpConfig {
            return Http.config;
        }

        register.injectable(__HttpConfig, IHttpConfig);
    }
    export module storage {
        var caches: IObject<Cache<any>> = {};
        var internalCaches: any = {};

        /**
         * A Cache class, for use with the $CacheFactory injectable. Used for storing objects.
         * Takes in a generic type corresponding to the type of objects it contains.
         * 
         */
        export class Cache<T> implements ICache<T> {
            /**
             * Method for creating a new Cache. Takes a generic type to denote the
             * type of objects stored in the new Cache.  If the Cache already exists
             * in the $CacheFactory, a new Cache will not be created.
             * 
             * @static
             * @param id The id of the new Cache.
             * @param options ICacheOptions for customizing the Cache.
             */
            static create<T>(id: string, options?: ICacheOptions): ICache<T> {
                var cache: ICache<T> = caches[id];

                if (isNull(cache)) {
                    cache = caches[id] = new Cache<T>(id, options);
                }

                return cache;
            }

            /**
             * Gets a cache out of the $CacheFactory if it exists.
             * 
             * @static
             * @param id The identifier used to search for the cache.
             * 
             * @returns {Cache<T>|undefined}
             */
            static fetch<T>(id: string): ICache<T> {
                return caches[id];
            }

            /**
             * Clears the CacheFactory and all of its caches.
             * 
             * @static
             */
            static clear(): void {
                var keys = Object.keys(caches),
                    length = keys.length;

                for (var i = 0; i < length; ++i) {
                    caches[keys[i]].clear();
                }

                caches = <IObject<Cache<any>>>{};
            }

            private __size: number;
            private __id: string;
            private __options: ICacheOptions;

            /**
             * @param id The id to use to retrieve the cache from the CacheFactory.
             * @param options The ICacheOptions for customizing the cache.
             */
            constructor(id: string, options?: ICacheOptions) {
                this.__id = id;
                this.__options = options;

                if (isNull(options)) {
                    this.__options = {
                        timeout: 0
                    };
                }

                internalCaches[id] = {};
            }

            info(): ICacheInfo {
                return {
                    id: this.__id,
                    size: this.__size,
                    options: this.__options
                };
            }

            put(key: string, value: T): T {
                var val = internalCaches[this.__id][key];
                internalCaches[this.__id][key] = value;

                if (isUndefined(val)) {
                    this.__size++;
                }

                var timeout = this.__options.timeout;

                if (isNumber(timeout) && timeout > 0) {
                    defer(<(key?: string) => void>this.remove, timeout, [key], this);
                }

                return value;
            }

            read(key: string): T {
                return internalCaches[this.__id][key];
            }

            remove(key: string): void {
                internalCaches[this.__id][key] = null;
                delete internalCaches[this.__id][key];
                this.__size--;
            }

            clear(): void {
                internalCaches[this.__id] = {};
                this.__size = 0;
            }

            dispose(): void {
                this.clear();
                caches[this.__id] = null;
                delete caches[this.__id];
            }
        }

        /**
         * The Type for referencing the '$CacheFactory' injectable as a dependency.
         */
        export function ICacheFactory(): ICacheFactory {
            return Cache;
        }

        register.injectable(__CacheFactory, ICacheFactory, null, register.FACTORY);

        /**
         * Used to manage all the defined caches for the current application session.
         */
        export interface ICacheFactory {
            /**
             * Method for creating a new ICache. Takes a generic type to denote the
             * type of objects stored in the new ICache.  If the ICache already exists
             * in the ICacheStatic, a new ICache will not be created.
             * 
             * @param id The id of the new ICache.
             * @param options ICacheOptions for customizing the ICache.
             * 
             * @return {ICache} The newly created ICache object.
             */
            create<T>(id: string, options?: ICacheOptions): ICache<T>;

            /**
             * Gets a cache out of the ICacheStatic if it exists.
             * 
             * @param id The identifier used to search for the cache.
             * 
             * @returns {ICache|undefined}
             */
            fetch<T>(id: string): ICache<T>;

            /**
             * Clears the ICacheStatic and all of its caches.
             */
            clear(): void;
        }

        /**
         * The ICache interface describing a cache. Takes in a generic type
         * corresponding to the type of objects stored in the cache.
         */
        export interface ICache<T> {
            /**
             * Method for accessing information about an ICache.
             */
            info(): ICacheInfo;

            /**
             * Method for inserting an object into an ICache.
             * 
             * @param key The key to use for storage/retrieval of the object.
             * @param value The value to store with the associated key.
             * 
             * @return {T} The value inserted into an ICache.
             */
            put(key: string, value: T): T;

            /**
             * Method for retrieving an object from an ICache.
             * 
             * @param key The key to search for in an ICache.
             * 
             * @return {T|undefined} The value found at the associated key. 
             * Returns undefined for an ICache miss.
             */
            read(key: string): T;

            /**
             * Method for removing an object from an ICache.
             * 
             * @param key The key to remove from an ICache.
             */
            remove(key: string): void;

            /**
             * Method for clearing an ICache, removing all of its keys.
             */
            clear(): void;

            /**
             * Method for removing an ICache from the $CacheFactory.
             */
            dispose(): void;
        }

        /**
         * A cache for persisting NodeManager trees.
         */
        var managerCache = Cache.create<processing.INodeManager>('__managerCache');

        /**
         * The Type for referencing the '$ManagerCache' injectable as a dependency.
         */
        export function IManagerCache(): typeof managerCache {
            return managerCache;
        }

        register.injectable(__ManagerCache, IManagerCache);

        /**
         * Options for a cache.
         */
        export interface ICacheOptions {
            /**
             * Specifies a timeout for a cache value. When a value 
             * is put in the cache, it will be valid for the given
             * period of time (in milliseconds). After the timeout 
             * is reached, the value will automatically be removed
             * from the cache.
             */
            timeout?: number;
        }

        /**
         * Contains information about an ICache.
         */
        export interface ICacheInfo {
            /**
             * A unique id for the ICache object, used to 
             * retrieve the ICache out of the $CacheFactory.
             */
            id: string;

            /**
             * Represents the number of items in the ICache.
             */
            size: number;

            /**
             * Represents the ICacheOptions that the ICache is
             * using.
             */
            options: ICacheOptions;
        }

        /**
         * Used for caching compiled nodes. This class will
         * clone a template when you put it in the cache. It will
         * also clone the template when you retrieve it.
         */
        export class TemplateCache extends Cache<any> implements ITemplateCache {
            $Promise: async.IPromise = acquire(__Promise);

            constructor() {
                super('__templateCache');
            }

            put(key: string, value: Node): async.IThenable<DocumentFragment>;
            put(key: string, value: async.IThenable<Node>): async.IThenable<DocumentFragment>;
            put(key: string, value: any): async.IThenable<DocumentFragment> {
                super.put(key, this.$Promise.resolve<DocumentFragment>(value));

                if (isDocumentFragment(value)) {
                    value = value.cloneNode(true);
                } else if (isNode(value)) {
                    var fragment = document.createDocumentFragment();
                    fragment.appendChild(value.cloneNode(true));
                    value = fragment;
                }
            
                return this.$Promise.resolve<DocumentFragment>(value);
            }

            read(key: string): async.IThenable<DocumentFragment> {
                var promise: async.IThenable<DocumentFragment> = super.read(key);

                if (isNull(promise)) {
                    return <any>this.$Promise.reject(null);
                }

                promise.then<DocumentFragment>((node) => {
                    return this.put(key, node);
                }).catch((error) => {
                    var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                    $exception.warn('Error retrieving template from promise.', $exception.TEMPLATE);
                });

                return promise;
            }
        }

        /**
         * The Type for referencing the '$TemplateCache' injectable as a dependency.
         */
        export function ITemplateCache(): ITemplateCache {
            return new TemplateCache();
        }

        register.injectable(__TemplateCache, ITemplateCache);

        /**
         * Interface for TemplateCache, used to manage all templates. Returns a unique template 
         * for every read, to avoid having to call cloneNode.
         */
        export interface ITemplateCache extends ICache<async.IThenable<DocumentFragment>> {
            /**
             * Stores a Node in the cache as a DocumentFragment.
             * 
             * @param key The key used to store the value.
             * @param value The Node.
             */
            put(key: string, value: Node): async.IThenable<DocumentFragment>;
            /**
             * Stores a Promise in the cache.
             * 
             * @param key The key used to store the value.
             * @param value The Promise.
             */
            put(key: string, value: async.IThenable<Node>): async.IThenable<DocumentFragment>;

            /**
             * Method for retrieving a Node from an ITemplateCache. The returned DocumentFragment will be 
             * cloned to avoid manipulating the cached template. 
             * 
             * @param key The key to search for in an ITemplateCache.
             */
            read(key: string): async.IThenable<DocumentFragment>;
        }

        /**
         * A base class for storing data with a designated storage type.
         */
        export class BaseStorage implements IBaseStorage {
            constructor() {
                forEach((<Storage>(<any>this).__storage), (value, key) => {
                    (<any>this)[key] = value;
                });
            }

            get length(): number {
                return (<Storage>(<any>this).__storage).length;
            }

            clear() {
                (<Storage>(<any>this).__storage).clear();
            }

            getItem<T>(key: string): T {
                return (<Storage>(<any>this).__storage).getItem(key);
            }

            key(index: number): string {
                return (<Storage>(<any>this).__storage).key(index);
            }

            removeItem(key: string): void {
                (<Storage>(<any>this).__storage).removeItem(key);
            }

            setItem(key: string, data: any): void {
                (<Storage>(<any>this).__storage).setItem(key, data);
                (<any>this)[key] = this.getItem(key);
            }
        }

        /**
         * An object designed for storing data with a designated storage type.
         */
        export interface IBaseStorage {
            /**
             * Returns the number of items in storage.
             */
            length: number;

            /**
             * Clears storage, deleting all of its keys.
             */
            clear(): void;

            /**
             * Gets an item out of storage with the assigned key.
             * 
             * @param key The key of the item to retrieve from storage.
             * @return {T} The item retrieved from storage.
             */
            getItem<T>(key: string): T;

            /**
             * Allows for iterating over storage keys with an index. When
             * called with an index, it will return the key at that index in 
             * storage.
             * 
             * @param index The index used to retrieve the associated key.
             * @return {string} The key at the given index.
             */
            key(index: number): string;

            /**
             * Searches in storage for an item and removes it if it 
             * exists.
             * 
             * @param key the Key of the item to remove from storage.
             */
            removeItem(key: string): void;

            /**
             * Adds data to storage with the designated key.
             * 
             * @param key The key of the item to store in storage.
             * @param data The data to store in storage with the key.
             */
            setItem(key: string, data: any): void;
        }

        /**
         * A class used to wrap local storage into an injectable.
         */
        export class LocalStorage extends BaseStorage implements ILocalStorage {
            private __storage: Storage = (<Window>acquire(__Window)).localStorage;
        }

        /**
         * The Type for referencing the '$LocalStorage' injectable as a dependency.
         */
        export function ILocalStorage(): ILocalStorage {
            return new LocalStorage();
        }

        register.injectable(__LocalStorage, ILocalStorage);

        /**
         * Describes an object used to wrap local storage into an injectable.
         */
        export interface ILocalStorage {
            /**
             * Returns the number of items in localStorage.
             */
            length: number;

            /**
             * Clears localStorage, deleting all of its keys.
             */
            clear(): void;

            /**
             * Gets an item out of local storage with the assigned key.
             * 
             * @param key The key of the item to retrieve from localStorage.
             * @return {T} The item retrieved from localStorage.
             */
            getItem<T>(key: string): T;

            /**
             * Allows for iterating over localStorage keys with an index. When
             * called with an index, it will return the key at that index in 
             * localStorage.
             * 
             * @param index The index used to retrieve the associated key.
             * @return {string} The key at the given index.
             */
            key(index: number): string;

            /**
             * Searches in localStorage for an item and removes it if it 
             * exists.
             * 
             * @param key the Key of the item to remove from localStorage.
             */
            removeItem(key: string): void;

            /**
             * Adds data to localStorage with the designated key.
             * 
             * @param key The key of the item to store in localStorage.
             * @param data The data to store in localStorage with the key.
             */
            setItem(key: string, data: any): void;
        }

        /**
         * A class for wrapping SessionStorage as an injectable.
         */
        export class SessionStorage extends BaseStorage implements ISessionStorage {
            private __storage: Storage = (<Window>acquire(__Window)).sessionStorage;
        }

        /**
         * The Type for referencing the '$SessionStorage' injectable as a dependency.
         */
        export function ISessionStorage(): ISessionStorage {
            return new SessionStorage();
        }

        register.injectable(__SessionStorage, ISessionStorage);

        /**
         * Describes an object used to wrap session storage into an injectable.
         */
        export interface ISessionStorage {
            /**
             * Returns the number of items in sessionStorage.
             */
            length: number;

            /**
             * Clears sessionStorage, deleting all of its keys.
             */
            clear(): void;

            /**
             * Gets an item out of session storage with the assigned key.
             * 
             * @param key The key of the item to retrieve from sessionStorage.
             * @return {T} The item retrieved from sessionStorage.
             */
            getItem<T>(key: string): T;

            /**
             * Allows for iterating over sessionStorage keys with an index. When
             * called with an index, it will return the key at that index in 
             * sessionStorage.
             * 
             * @param index The index used to retrieve the associated key.
             * @return {string} The key at the given index.
             */
            key(index: number): string;

            /**
             * Searches in sessionStorage for an item and removes it if it 
             * exists.
             * 
             * @param key the Key of the item to remove from sessionStorage.
             */
            removeItem(key: string): void;

            /**
             * Adds data to sessionStorage with the designated key.
             * 
             * @param key The key of the item to store in sessionStorage.
             * @param data The data to store in sessionStorage with the key.
             */
            setItem(key: string, data: any): void;
        }
    }
    /**
     * An object used to create ITokenDetails for every operator.
     */
    var OPERATORS: plat.IObject<plat.expressions.ITokenDetails> = {
        'u+': {
            precedence: 4, associativity: 'rtl',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any): any => +a(context, aliases)
        },
        '+': {
            precedence: 6, associativity: 'ltr',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): any => a(context, aliases) + b(context, aliases)
        },
        'u-': {
            precedence: 4, associativity: 'rtl',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any): any => -a(context, aliases)
        },
        '-': {
            precedence: 6, associativity: 'ltr',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): any => a(context, aliases) - b(context, aliases)
        },
        '*': {
            precedence: 5, associativity: 'ltr',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): any => a(context, aliases) * b(context, aliases)
        },
        '/': {
            precedence: 5, associativity: 'ltr',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): any => a(context, aliases) / b(context, aliases)
        },
        '%': {
            precedence: 5, associativity: 'ltr',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): any => a(context, aliases) % b(context, aliases)
        },
        '?': {
            precedence: 15, associativity: 'rtl',
            fn: (context: any, aliases: any): void => undefined
        },
        ':': {
            precedence: 15, associativity: 'rtl',
            fn: (context: any, aliases: any): void => undefined
        },
        '>': {
            precedence: 8, associativity: 'ltr',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): any => a(context, aliases) > b(context, aliases)
        },
        '<': {
            precedence: 8, associativity: 'ltr',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): any => a(context, aliases) < b(context, aliases)
        },
        '!': {
            precedence: 4, associativity: 'rtl',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any): any => !a(context, aliases)
        },
        '~': {
            precedence: 4, associativity: 'rtl',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any): any => ~a(context, aliases)
        },
        '&': {
            precedence: 10, associativity: 'ltr',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): any => a(context, aliases) & b(context, aliases)
        },
        '|': {
            precedence: 12, associativity: 'ltr',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): any => a(context, aliases) | b(context, aliases)
        },
        '>>': {
            precedence: 7, associativity: 'ltr',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): any => a(context, aliases) >> b(context, aliases)
        },
        '<<': {
            precedence: 7, associativity: 'ltr',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): any => a(context, aliases) << b(context, aliases)
        },
        '>>>': {
            precedence: 7, associativity: 'ltr',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): any => a(context, aliases) >>> b(context, aliases)
        },
        '&&': {
            precedence: 13, associativity: 'ltr',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): any => a(context, aliases) && b(context, aliases)
        },
        '||': {
            precedence: 14, associativity: 'ltr',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): any => a(context, aliases) || b(context, aliases)
        },
        '==': {
            precedence: 9, associativity: 'ltr',
            /* tslint:disable:triple-equals */
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): any => a(context, aliases) == b(context, aliases)
            /* tslint:enable:triple-equals */
        },
        '===': {
            precedence: 9, associativity: 'ltr',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): any => a(context, aliases) === b(context, aliases)
        },
        '!=': {
            precedence: 9, associativity: 'ltr',
            /* tslint:disable:triple-equals */
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): any => a(context, aliases) != b(context, aliases)
            /* tslint:enable:triple-equals */
        },
        '!==': {
            precedence: 9, associativity: 'ltr',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): any => a(context, aliases) !== b(context, aliases)
        },
        '>=': {
            precedence: 8, associativity: 'ltr',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): any => a(context, aliases) >= b(context, aliases)
        },
        '<=': {
            precedence: 8, associativity: 'ltr',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): any => a(context, aliases) <= b(context, aliases)
        },
        '=': {
            precedence: 17, associativity: 'rtl',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): void => {
                var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                $exception.fatal('Assignment operators are not supported', $exception.PARSE);
            }
        },
        '++': {
            precedence: 3, associativity: '',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any): void => {
                var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                $exception.fatal('Assignment operators are not supported', $exception.PARSE);
            }
        },
        '--': {
            precedence: 3, associativity: '',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any): void => {
                var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                $exception.fatal('Assignment operators are not supported', $exception.PARSE);
            }
        },
        '+=': {
            precedence: 17, associativity: 'rtl',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): void => {
                var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                $exception.fatal('Assignment operators are not supported', $exception.PARSE);
            }
        },
        '-=': {
            precedence: 17, associativity: 'rtl',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): void => {
                var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                $exception.fatal('Assignment operators are not supported', $exception.PARSE);
            }
        },
        '*=': {
            precedence: 17, associativity: 'rtl',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): void => {
                var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                $exception.fatal('Assignment operators are not supported', $exception.PARSE);
            }
        },
        '/=': {
            precedence: 17, associativity: 'rtl',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): void => {
                var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                $exception.fatal('Assignment operators are not supported', $exception.PARSE);
            }
        },
        '%=': {
            precedence: 17, associativity: 'rtl',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): void => {
                var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                $exception.fatal('Assignment operators are not supported', $exception.PARSE);
            }
        },
        '.': {
            precedence: 2, associativity: 'ltr',
            fn: (context: any, aliases: any,
                a: (context: any, aliases: any) => any,
                b: (context: any, aliases: any) => any): any => (<any>a)[b]
        }
    };
    
    /**
     * An object used to create ITokenDetails for every accessor.
     */
    var ACCESSORS: plat.IObject<plat.expressions.ITokenDetails> = {
        '()': { precedence: 2, associativity: null, fn: null },
        '[]': { precedence: 2, associativity: null, fn: null },
        '.': { precedence: 2, associativity: null, fn: null },
        '{}': { precedence: 1, associativity: null, fn: null }
    };
    
    /**
     * An object used to create ITokenDetails for every delimiter.
     */
    var DELIMITERS: plat.IObject<plat.expressions.ITokenDetails> = {
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
     * An object used to get literal values from string values of false, true, and undefined
     */
    var KEYWORDS: plat.IObject<any> = {
        false: false,
        true: true,
        null: null,
        undefined: 'undefined'
    };
    
    /**
     * Checks if a string is in the DELIMITERS array.
     * 
     * @param key The string to index into the DELIMITERS array.
     * @return {Boolean}
     */
    function isDelimiter(key: string): boolean {
        return !isNull(DELIMITERS[key]);
    }
    
    /**
     * Checks if a string is in the ACCESSORS array.
     * 
     * @param key The string to index into the ACCESSORS array.
     * @return {Boolean}
     */
    function isAccessor(key: string): boolean {
        return !isNull(ACCESSORS[key]);
    }
    
    /**
     * Checks if a string is in the OPERATORS array.
     * 
     * @param key The string to index into the OPERATORS array.
     * @return {Boolean}
     */
    function isOperator(key: string): boolean {
        return !isNull(OPERATORS[key]);
    }
    
    /**
     * Checks if a string is in the KEYWORDS array.
     * 
     * @param key The string to index into the KEYWORDS array.
     * @return {Boolean}
     */
    function isKeyword(key: string): boolean {
        return !isUndefined(KEYWORDS[key]);
    }
    
    export module observable {
        var arrayMethods = ['push', 'pop', 'reverse', 'shift', 'sort', 'splice', 'unshift'];

        /**
         * Manages observable properties on control.
         * Facilitates in data-binding and managing context inheritance.
         */
        export class ContextManager implements IContextManager {
            /**
             * A set of functions to be fired when a particular observed array is mutated.
             */
            static observedArrayListeners: IObject<IObject<Array<(ev: IArrayMethodInfo<any>) => void>>> = {};
        
            /**
             * Gets the ContextManager associated to the given control. If no 
             * ContextManager exists, one is created for that control.
             * 
             * @static
             * @param control The control on which to locate the ContextManager
             */
            static getManager(control: IControl): IContextManager;
            static getManager(control: any): IContextManager {
                var contextManager: IContextManager,
                    managers = ContextManager.__managers,
                    uid = control.uid,
                    manager = managers[uid];

                if (!isNull(manager)) {
                    contextManager = manager;
                    return contextManager;
                }

                contextManager = managers[uid] = new ContextManager();
                contextManager.context = control;

                return contextManager;
            }

            /**
             * Removes all the listeners for a given control's uid.
             * 
             * @static
             * @param control The control whose manager is being disposed.
             * @param persist Whether or not the control's context needs to 
             * be persisted post-disposal or can be set to null.
             */
            static dispose(control: IControl, persist?: boolean): void;
            static dispose(control: ui.ITemplateControl, persist?: boolean) {
                if (isNull(control)) {
                    return;
                }

                var uid = control.uid,
                    controls = ContextManager.__controls,
                    identifiers = controls[uid] || {},
                    managers = ContextManager.__managers,
                    manager = managers[uid];

                if (!isNull(manager)) {
                    manager.dispose();
                    managers[uid] = null;
                    delete managers[uid];
                }

                var keys = Object.keys(identifiers),
                    identifier: string,
                    listeners: Array<IRemoveListener>,
                    i: number,
                    j: number,
                    jLength: number;

                while (keys.length > 0) {
                    identifier = keys.shift();
                    listeners = identifiers[identifier];
                    jLength = listeners.length;
                    for (j = 0; j < jLength; ++j) {
                        listeners[j]();
                    }
                }

                var arrayListeners = ContextManager.observedArrayListeners,
                    remove = ContextManager.removeArrayListeners;

                keys = Object.keys(arrayListeners);
                length = keys.length;

                for (i = 0; i < length; ++i) {
                    remove(keys[i], uid);
                }

                controls[uid] = null;
                delete controls[uid];

                if (!isNull(control.context)) {
                    ContextManager.defineProperty(control, 'context', persist ? deepExtend({}, control.context) : null, true, true);
                }
            }

            /**
             * Removes all listeners for an Array associated with a given uid.
             * 
             * @static
             * @param absoluteIdentifier The identifier used to locate the array.
             * @param uid The uid used to search for listeners.
             */
            static removeArrayListeners(absoluteIdentifier: string, uid: string): void {
                var listeners = ContextManager.observedArrayListeners[absoluteIdentifier];

                if (!isNull(listeners)) {
                    listeners[uid] = null;
                    delete listeners[uid];
                }
            }

            /**
             * Safely retrieves the local context given a root context and an Array of
             * property strings.
             * 
             * @static
             * @param rootContext The root object in which to find a local context.
             * @param split The string array containing properties used to index into
             * the rootContext.
             */
            static getContext(rootContext: any, split: Array<string>): any {
                split = split.slice(0);
                if (isNull(rootContext)) {
                    return null;
                }
                while (split.length > 0) {
                    rootContext = rootContext[split.shift()];
                    if (isNull(rootContext)) {
                        return null;
                    }
                }

                return rootContext;
            }

            /**
             * Defines an object property with the associated value. Useful for unobserving objects.
             * 
             * @param obj The object on which to define the property.
             * @param key The property key.
             * @param value The value used to define the property.
             * @param enumerable Whether or not the property should be enumerable (able to be iterated 
             * over in a loop)
             * @param configurable Whether or not the property is able to be reconfigured.
             */
            static defineProperty(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean): void {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: !!enumerable,
                    configurable: !!configurable
                });
            }

            /**
             * Defines an object property with only a getter function. Useful for creating constant values 
             * or overwriting constant values.
             * 
             * @param obj The object on which to define the property.
             * @param key The property key.
             * @param value The value used to define the property.
             * @param enumerable Whether or not the property should be enumerable (able to be iterated 
             * over in a loop)
             * @param configurable Whether or not the property is able to be reconfigured.
             */
            static defineGetter(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean): void {
                Object.defineProperty(obj, key, {
                    get: () => value,
                    enumerable: !!enumerable,
                    configurable: !!configurable
                });
            }

            /**
             * Pushes the function for removing an observed property upon adding the property.
             * 
             * @static
             * @param identifer The identifier for which the remove listener is being pushed.
             * @param uid The uid of the control observing the identifier.
             * @param listener The function for removing the observed property.
             */
            static pushRemoveListener(identifier: string, uid: string, listener: IRemoveListener) {
                var controls = ContextManager.__controls,
                    control = controls[uid],
                    listeners: Array<IRemoveListener>;

                if (isNull(control)) {
                    control = controls[uid] = {};
                }

                listeners = control[identifier];

                if (isNull(listeners)) {
                    listeners = control[identifier] = [];
                }

                listeners.push(listener);
            }

            /**
             * Removes a specified identifier from being observed for a given set of control uids.
             * 
             * @static
             * @param uids The set of uids for which to remove the specified identifier.
             * @param identifier The identifier to stop observing.
             */
            static removeIdentifier(uids: Array<string>, identifier: string): void {
                var length = uids.length,
                    controls = ContextManager.__controls,
                    uid: string,
                    identifiers: IObject<Array<IRemoveListener>>;

                for (var i = 0; i < length; ++i) {
                    uid = uids[i];

                    identifiers = controls[uid];

                    if (isNull(identifiers)) {
                        continue;
                    }

                    identifiers[identifier] = null;
                    delete identifiers[identifier];
                }
            }

            /**
             * Ensures that an identifier path will exist on a given control. Will create 
             * objects/arrays if necessary.
             * 
             * @param control The control on which to create the context.
             * @param identifier The period-delimited identifier string used to create 
             * the context path.
             */
            static createContext(control: ui.ITemplateControl, identifier: string) {
                var split = identifier.split('.'),
                    property: string,
                    temp: any,
                    context = control.context;

                if (isNull(context)) {
                    context = control.context = {};
                }

                while (split.length > 0) {
                    property = split.shift();

                    temp = context[property];

                    if (isNull(temp)) {
                        if (isNumber(Number(split[0]))) {
                            temp = context[property] = [];
                        } else {
                            temp = context[property] = {};
                        }
                    }

                    context = temp;
                }

                return context;
            }

            private static __managers: IObject<IContextManager> = {};
            private static __controls: IObject<IObject<Array<IRemoveListener>>> = {};

            $Compat: ICompat = acquire(__Compat);

            context: any;

            private __identifiers: IObject<Array<IListener>> = {};
            private __identifierHash: IObject<Array<string>> = {};
            private __contextObjects: IObject<any> = {};
            private __isArrayFunction: boolean = false;
            private __observedIdentifier: string;

            getContext(split: Array<string>): void {
                var join = split.join('.'),
                    context = this.__contextObjects[join];

                if (isNull(this.__contextObjects[join])) {
                    context = this.__contextObjects[join] = ContextManager.getContext(this.context, split);
                }

                return context;
            }

            observe(absoluteIdentifier: string, observableListener: IListener): IRemoveListener {
                if (isEmpty(absoluteIdentifier)) {
                    return;
                }

                var split = absoluteIdentifier.split('.'),
                    key = split.pop(),
                    path: string,
                    context = this.context,
                    hasIdentifier = this._hasIdentifier(absoluteIdentifier),
                    hasObservableListener = !isNull(observableListener),
                    join: string;

                if (split.length > 0) {
                    join = split.join('.');
                    context = this.__contextObjects[join];
                    if (isNull(this.__contextObjects[join])) {
                        context = this.__contextObjects[join] = this._getImmediateContext(join);
                    }
                }

                if (!isObject(context)) {
                    if (hasObservableListener) {
                        return this._addObservableListener(absoluteIdentifier, observableListener);
                    }

                    return;
                }

                // set observedIdentifier to null
                this.__observedIdentifier = null;

                var value = this.__contextObjects[absoluteIdentifier] = context[key];

                // if observedIdentifier is not null, the primitive is already being watched
                var observedIdentifier = this.__observedIdentifier,
                    isObserved = !isNull(observedIdentifier);
                if (isObserved) {
                    hasIdentifier = true;
                }

                var removeCallback = noop;

                if (hasObservableListener) {
                    var removeObservedCallback = noop,
                        removeAbsoluteCallback = this._addObservableListener(absoluteIdentifier, observableListener);

                    if (isObserved && absoluteIdentifier !== observedIdentifier) {
                        removeObservedCallback = this._addObservableListener(observedIdentifier, observableListener);
                    }

                    removeCallback = () => {
                        removeAbsoluteCallback();
                        removeObservedCallback();
                    };
                }

                //check if value is defined and context manager hasn't seen this identifier
                if (!hasIdentifier) {
                    if (isArray(context) && key === 'length') {
                        var removeArrayObserve = this.observe(join, {
                            uid: observableListener.uid,
                            listener: (newValue: Array<any>, oldValue: Array<any>) => {
                                removeListener();
                                removeListener = this.observeArray(observableListener.uid, noop, join, newValue, oldValue);
                            }
                        });

                        var removeListener = this.observeArray(observableListener.uid, noop, join, context, null);

                        removeCallback = () => {
                            removeArrayObserve();
                            removeListener();
                        };
                    } else {
                        this._define(absoluteIdentifier, context, key);
                    }
                }

                return removeCallback;
            }

            observeArray(uid: string, listener: (ev: IArrayMethodInfo<any>) => void,
                absoluteIdentifier: string, array: Array<any>, oldArray: Array<any>): IRemoveListener {
                var length = arrayMethods.length,
                    method: string,
                    i: number,
                    $compat = this.$Compat,
                    proto = $compat.proto,
                    setProto = $compat.setProto;
            
                if (isArray(oldArray)) {
                    if (setProto) {
                        (<any>Object).setPrototypeOf(oldArray, Object.create(Array.prototype));
                    } else if (proto) {
                        (<any>oldArray).__proto__ = Object.create(Array.prototype);
                    } else {
                        length = arrayMethods.length;

                        for (i = 0; i < length; ++i) {
                            method = arrayMethods[i];
                            (<any>oldArray)[method] = (<any>Array.prototype)[method];
                        }
                    }
                }

                if (isNull(array)) {
                    return;
                }

                var observedArrayCallbacks = ContextManager.observedArrayListeners[absoluteIdentifier];

                if (isNull(observedArrayCallbacks)) {
                    observedArrayCallbacks = ContextManager.observedArrayListeners[absoluteIdentifier] = {};
                }

                var arrayCallbacks = observedArrayCallbacks[uid];

                if (isNull(arrayCallbacks)) {
                    arrayCallbacks = observedArrayCallbacks[uid] = [];
                }

                var index = arrayCallbacks.length,
                    removeListener = () => {
                        arrayCallbacks.splice(index, 1);
                    };

                arrayCallbacks.push(listener);

                if (proto) {
                    var obj = Object.create(Array.prototype);

                    for (i = 0; i < length; ++i) {
                        method = arrayMethods[i];
                        obj[method] = this._overwriteArrayFunction(absoluteIdentifier, method);
                    }

                    if (setProto) {
                        (<any>Object).setPrototypeOf(array, obj);
                    } else {
                        (<any>array).__proto__ = obj;
                    }

                    return removeListener;
                }

                for (i = 0; i < length; ++i) {
                    method = arrayMethods[i];
                    ContextManager.defineProperty(array, method,
                        this._overwriteArrayFunction(absoluteIdentifier, method), false, true);
                }

                return removeListener;
            }

            dispose(): void {
                this.context = null;
                this.__identifiers = {};
                this.__identifierHash = {};
                this.__contextObjects = {};
            }

            /**
             * Gets the immediate context of identifier by splitting on '.' 
             * and observes the objects along the way.
             * 
             * @param identifier The identifier being observed.
             */
            _getImmediateContext(identifier: string): any {
                if (isNull(this.__identifiers[identifier])) {
                    this.observe(identifier, null);
                }

                var split = identifier.split('.'),
                    context = this.context,
                    key = split.shift(),
                    partialIdentifier = key;

                do {
                    context = context[key];
                    if (isNull(context) || split.length === 0) {
                        break;
                    }

                    key = split.shift();
                    partialIdentifier += '.' + key;
                } while (split.length >= 0);

                return context;
            }

            /**
             * Obtains the old value and new value of a given context 
             * property on a property changed event.
             * 
             * @param split The split identifier of the property that changed.
             * @param newRootContext The new context.
             * @param oldRootContext The old context.
             */
            _getValues(split: Array<string>, newRootContext: any, oldRootContext: any): { newValue: any; oldValue: any; } {
                var length = split.length,
                    property: string,
                    doNew = true,
                    doOld = true;

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
                        return null;
                    }
                }

                property = split[0];

                var newValue: any,
                    oldValue: any;

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
            }

            /**
             * Notifies all child properties being observed that a parent property 
             * has changed.
             * 
             * @param identifier The identifier for the property that changed.
             * @param newValue The new value of the property.
             * @param oldValue The old value of the property.
             */
            _notifyChildProperties(identifier: string, newValue: any, oldValue: any): void {
                var mappings = this.__identifierHash[identifier];

                if (isNull(mappings)) {
                    return;
                }

                var length = mappings.length,
                    binding: string,
                    property: string,
                    parentProperty: string,
                    split: Array<string>,
                    values: IObject<any> = {},
                    value: any,
                    key: string,
                    start = identifier.length + 1,
                    newParent: any,
                    oldParent: any,
                    newChild: any,
                    oldChild: any;

                if (length === 0) {
                    this.__identifierHash[identifier] = null;
                    delete this.__identifierHash[identifier];
                    return;
                }

                for (var i = 0; i < length; ++i) {
                    binding = mappings[i];
                    property = binding.slice(start);
                    split = property.split('.');
                    key = split.pop();
                    parentProperty = split.join('.');

                    if (isEmpty(parentProperty)) {
                        newParent = newValue;
                        oldParent = oldValue;
                        newChild = isNull(newParent) ? newParent : newParent[key];
                        oldChild = isNull(oldParent) ? oldParent : oldParent[key];
                    } else {
                        value = values[parentProperty];

                        if (isNull(value)) {
                            value = values[parentProperty] = this._getValues(split, newValue, oldValue);

                            if (isNull(value)) {
                                this._execute(binding, null, null);
                                continue;
                            }
                        }

                        newParent = value.newValue;
                        oldParent = value.oldValue;
                        newChild = isNull(newParent) ? null : newParent[key];
                        oldChild = isNull(oldParent) ? null : oldParent[key];
                    }

                    values[property] = {
                        newValue: newChild,
                        oldValue: oldChild
                    };

                    if (!(isNull(newParent) || isUndefined(newChild))) {
                        this._define(binding, newParent, key);
                    }

                    this._execute(binding, newChild, oldChild);
                }

                values = null;
            }

            /**
             * Adds a listener to be fired for a particular identifier.
             * 
             * @param absoluteIdentifier The identifier being observed.
             * @param observableListener The function and associated uid to be fired 
             * for this identifier.
             */
            _addObservableListener(absoluteIdentifier: string,
                observableListener: IListener): IRemoveListener {
                var uid = observableListener.uid;

                this.__add(absoluteIdentifier, observableListener);

                var remove = () => {
                    ContextManager.removeIdentifier([uid], absoluteIdentifier);
                    this._removeCallback(absoluteIdentifier, uid);
                };

                ContextManager.pushRemoveListener(absoluteIdentifier, uid, remove);

                return remove;
            }

            /**
             * Observes a property on a given context specified by an identifier.
             * 
             * @param identifier The full identifier path for the property being observed.
             * @param immediateContext The object whose property will be observed.
             * @param key The property key for the value on the immediateContext that's 
             * being observed.
             */
            _define(identifier: string, immediateContext: any, key: string): void {
                var value = immediateContext[key];

                if (isObject(value)) {
                    this.__defineObject(identifier, immediateContext, key);
                } else {
                    this.__definePrimitive(identifier, immediateContext, key);
                }
            }

            /**
             * Intercepts an array function for observation.
             * 
             * @param absoluteIdentifier The full identifier path for the observed array.
             * @param method The array method being called.
             */
            _overwriteArrayFunction(absoluteIdentifier: string, method: string): (...args: any[]) => any {
                var callbackObjects = ContextManager.observedArrayListeners[absoluteIdentifier],
                    _this = this;

                // We can't use a fat-arrow function here because we need the array context.
                return function observedArrayFn(...args: any[]) {
                    var oldArray = this.slice(0),
                        returnValue: any;

                    if (method.indexOf('shift') !== -1) {
                        _this.__isArrayFunction = true;
                        returnValue = (<any>Array.prototype)[method].apply(this, args);
                        _this.__isArrayFunction = false;
                        _this._notifyChildProperties(absoluteIdentifier, this, oldArray);
                    } else {
                        returnValue = (<any>Array.prototype)[method].apply(this, args);
                    }

                    var keys = Object.keys(callbackObjects),
                        length = keys.length,
                        callbacks: Array<(ev: IArrayMethodInfo<any>) => void>,
                        jLength: number;

                    if (oldArray.length !== this.length && method.indexOf('shift') === -1) {
                        _this._execute(absoluteIdentifier + '.length', this.length, oldArray.length);
                    }

                    for (var i = 0; i < length; ++i) {
                        callbacks = callbackObjects[keys[i]];
                        jLength = callbacks.length;

                        for (var j = 0; j < jLength; ++j) {
                            callbacks[j]({
                                method: method,
                                returnValue: returnValue,
                                oldArray: oldArray,
                                newArray: this,
                                arguments: args
                            });
                        }
                    }

                    return returnValue;
                };
            }

            /**
             * Removes listener callbacks based on control uid.
             * 
             * @param identifier The identifier attached to the callbacks.
             * @param uid The uid to remove the callback from.
             */
            _removeCallback(identifier: string, uid: string): void {
                var callbacks = this.__identifiers[identifier];
                if (isNull(callbacks)) {
                    return;
                }

                // filter out callback objects that have matching uids
                var length = callbacks.length - 1,
                    callback: IListener;

                for (var i = length; i >= 0; --i) {
                    callback = callbacks[i];
                    if (callback.uid === uid) {
                        callbacks.splice(i, 1);
                    }
                }

                if (isEmpty(this.__identifiers[identifier])) {
                    this.__identifierHash[identifier] = null;
                    delete this.__identifierHash[identifier];
                    this.__contextObjects[identifier] = null;
                    delete this.__contextObjects[identifier];
                }
            }

            /**
             * Checks if the specified identifier is already being 
             * observed in this context.
             * 
             * @param identifier The identifier being observed.
             */
            _hasIdentifier(identifier: string): boolean {
                return !isEmpty(this.__identifiers[identifier]);
            }

            /**
             * Executes the listeners for the specified identifier on 
             * this context.
             * 
             * @param identifier The identifier attached to the callbacks.
             * @param value The new value on this context specified by 
             * the identifier.
             * @param oldValue The old value on this context specified by 
             * the identifier.
             */
            _execute(identifier: string, value: any, oldValue: any): void {
                var observableListeners = this.__identifiers[identifier];

                this.__contextObjects[identifier] = value;

                if (isUndefined(value)) {
                    delete this.__contextObjects[identifier];
                }

                if (isNull(observableListeners)) {
                    return;
                }

                for (var i = 0; i < observableListeners.length; ++i) {
                    observableListeners[i].listener(value, oldValue);
                }
            }

            private __defineObject(identifier: string, immediateContext: any, key: string): void {
                var value = immediateContext[key];

                Object.defineProperty(immediateContext, key, {
                    configurable: true,
                    enumerable: true,
                    get: () => {
                        this.__observedIdentifier = identifier;
                        return value;
                    },
                    set: (newValue) => {
                        if (value === newValue) {
                            return;
                        }

                        var oldValue = value;
                        value = newValue;

                        if (this.__isArrayFunction) {
                            return;
                        }

                        var hash = this.__identifierHash[identifier],
                            childPropertiesLength = isArray(hash) ? hash.length : 0;

                        this._execute(identifier, value, oldValue);
                        if (childPropertiesLength > 0) {
                            this._notifyChildProperties(identifier, value, oldValue);
                        }

                        if (!isObject(value)) {
                            this.__definePrimitive(identifier, immediateContext, key);
                        }
                    }
                });
            }
            private __definePrimitive(identifier: string, immediateContext: any, key: string): void {
                var value = immediateContext[key],
                    isDefined = !isNull(value);

                if (isArray(immediateContext) && key === 'length') {
                    return;
                }

                Object.defineProperty(immediateContext, key, {
                    configurable: true,
                    enumerable: true,
                    get: () => {
                        this.__observedIdentifier = identifier;
                        return value;
                    },
                    set: (newValue) => {
                        if (value === newValue) {
                            return;
                        }
                        var oldValue = value;
                        value = newValue;

                        if (this.__isArrayFunction && isArray(immediateContext)) {
                            return;
                        }

                        if (isObject(value)) {
                            var childPropertiesLength = this.__identifierHash[identifier].length;
                            this._execute(identifier, newValue, oldValue);
                            this.__defineObject(identifier, immediateContext, key);
                            if (childPropertiesLength > 0) {
                                this._notifyChildProperties(identifier, newValue, oldValue);
                            }
                        } else if (isDefined) {
                            this._execute(identifier, newValue, oldValue);
                        } else {
                            this._execute(identifier, newValue, oldValue);
                            this.__definePrimitive(identifier, immediateContext, key);
                            isDefined = true;
                        }
                    }
                });
            }
            private __add(identifier: string, observableListener: IListener): void {
                var callbacks = this.__identifiers[identifier];

                if (isNull(callbacks)) {
                    callbacks = this.__identifiers[identifier] = [];
                }

                callbacks.push(observableListener);

                if (isNull(this.__identifierHash[identifier])) {
                    this.__addHashValues(identifier);
                }
            }
            private __addHashValues(identifier: string) {
                var split = identifier.split('.'),
                    ident = '',
                    hashValue: Array<string>;

                ident = split.shift();
                hashValue = this.__identifierHash[ident];

                if (isNull(hashValue)) {
                    hashValue = this.__identifierHash[ident] = [];
                    if (split.length === 0) {
                        return;
                    }
                }

                hashValue.push(identifier);

                while (split.length > 0) {
                    ident += '.' + split.shift();
                    hashValue = this.__identifierHash[ident];

                    if (isNull(hashValue)) {
                        hashValue = this.__identifierHash[ident] = [];
                    }
                    if (ident !== identifier) {
                        hashValue.push(identifier);
                    }
                }
            }
        }

        /**
         * The Type for referencing the '$ContextManagerStatic' injectable as a dependency.
         */
        export function IContextManagerStatic(): IContextManagerStatic {
            return ContextManager;
        }

        register.injectable(__ContextManagerStatic, IContextManagerStatic, null, register.STATIC);

            /**
         * The external interface for the '$ContextManagerStatic' injectable.
         */
        export interface IContextManagerStatic {
            /**
             * A set of functions to be fired when a particular observed array is mutated.
             * 
             * @static
             */
            observedArrayListeners: IObject<IObject<Array<(ev: IArrayMethodInfo<any>) => void>>>;

            /**
             * Gets the ContextManager associated to the given control. If no 
             * ContextManager exists, one is created for that control.
             * 
             * @static
             * @param control The control on which to locate the ContextManager
             */
            getManager(control: IControl): IContextManager;
            getManager(control: any): IContextManager;

            /**
             * Removes all the listeners for a given control's uid.
             * 
             * @static
             * @param control The control whose manager is being disposed.
             * @param persist Whether or not the control's context needs to 
             * be persisted post-disposal or can be set to null.
             */
            dispose(control: IControl, persist?: boolean): void;

            /**
             * Removes all listeners for an Array associated with a given uid.
             * 
             * @static
             * @param absoluteIdentifier The identifier used to locate the array.
             * @param uid The uid used to search for listeners.
             */
            removeArrayListeners(absoluteIdentifier: string, uid: string): void;

            /**
             * Safely retrieves the local context given a root context and an Array of
             * property strings.
             * 
             * @static
             * @param rootContext The root object in which to find a local context.
             * @param split The string array containing properties used to index into
             * the rootContext.
             */
            getContext(rootContext: any, split: Array<string>): void;

            /**
             * Defines an object property with the associated value. Useful for unobserving objects.
             * 
             * @static
             * @param obj The object on which to define the property.
             * @param key The property key.
             * @param value The value used to define the property.
             * @param enumerable Whether or not the property should be enumerable (able to be iterated 
             * over in a loop)
             * @param configurable Whether or not the property is able to be reconfigured.
             */
            defineProperty(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean): void;

            /**
             * Defines an object property as a getter with the associated value. Useful for unobserving objects.
             * 
             * @static
             * @param obj The object on which to define the property.
             * @param key The property key.
             * @param value The value used to define the property.
             * @param enumerable Whether or not the property should be enumerable (able to be iterated 
             * over in a loop)
             * @param configurable Whether or not the property is able to be reconfigured.
             */
            defineGetter(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean): void;

            /**
             * Pushes the function for removing an observed property upon adding the property.
             * 
             * @static
             * @param identifer The identifier for which the remove listener is being pushed.
             * @param uid The uid of the control observing the identifier.
             * @param listener The function for removing the observed property.
             */
            pushRemoveListener(identifier: string, uid: string, listener: IRemoveListener): void;

            /**
             * Removes a specified identifier from being observed for a given set of control uids.
             * 
             * @static
             * @param uids The set of uids for which to remove the specified identifier.
             * @param identifier The identifier to stop observing.
             */
            removeIdentifier(uids: Array<string>, identifier: string): void;

            /**
             * Ensures that an identifier path will exist on a given control. Will create
             * objects/arrays if necessary.
             *
             * @static
             * @param control The control on which to create the context.
             * @param identifier The period-delimited identifier string used to create
             * the context path.
             */
            createContext(control: ui.ITemplateControl, identifier: string): any;
        }

        /**
         * Describes an object that manages observing properties on any object.
         */
        export interface IContextManager {
            /**
             * The context to be managed.
             */
            context: any;

            /**
             * Safely retrieves the local context for this ContextManager given an Array of
             * property strings.
             * 
             * @param split The string array containing properties used to index into
             * the context.
             */
            getContext(split: Array<string>): any;

            /**
             * Given a period-delimited identifier, observes an object and calls the given listener when the 
             * object changes.
             * 
             * @param absoluteIdentifier The period-delimited identifier noting the property to be observed.
             * @param observableListener An object implmenting IObservableListener. The listener will be 
             * notified of object changes.
             */
            observe(identifier: string, observableListener: IListener): IRemoveListener;

            /**
             * Observes an array and calls the listener when certain functions are called on 
             * that array. The watched functions are push, pop, shift, splice, unshift, sort, 
             * and reverse.
             * 
             * @param uid The uid of the object observing the array.
             * @param listener The callback for when an observed Array function has been called.
             * @param absoluteIdentifier The identifier from the root context used to find the array.
             * @param array The array to be observed.
             * @param oldArray The old array to stop observing.
             */
            observeArray(uid: string, listener: (ev: IArrayMethodInfo<any>) => void,
                absoluteIdentifier: string, array: Array<any>, oldArray: Array<any>): IRemoveListener;

            /**
             * Disposes the memory for an IContextManager.
             */
            dispose(): void;
        }

        /**
         * An object specifying a listener callback function and a unique id to use to manage the
         * listener.
         */
        export interface IListener {
            /**
             * A listener method called when the object it is observing is changed.
             * 
             * @param value The new value of the object.
             * @param oldValue The previous value of the object.
             */
            listener(value: any, oldValue: any): void;

            /**
             * A unique id used to manage the listener.
             */
            uid: string;
        }

        /**
         * An object for Array method info. Takes a 
         * generic type to denote the type of array it uses.
         */
        export interface IArrayMethodInfo<T> {
            /**
             * The method name that was called. Possible values are:
             * 'push', 'pop', 'reverse', 'shift', 'sort', 'splice', 
             * and 'unshift'
             */
            method: string;

            /**
             * The value returned from the called function.
             */
            returnValue: any;

            /**
             * The previous value of the array.
             */
            oldArray: Array<T>;

            /**
             * The new value of the array.
             */
            newArray: Array<T>;

            /**
             * The arguments passed into the array function.
             */
            arguments: Array<any>;
        }

            /**
             * Defines the object added to a template control when its element 
             * has an attribute control that extends controls.ObservableAttributeControl.
             * 
             * This will contain the value of the expression as well as a way to observe the 
             * attribute value for changes.
             * 
             * plat-options is a control that implements this interface, and puts an 'options' 
             * property on its associated template control.
             * 
             * The generic type corresponds to the type of object created when the attribute 
             * expression is evaluated.
             */
            export interface IObservableProperty<T> {
                /**
                 * The value obtained from evaluating the attribute's expression.
                 */
                value: T;

                /**
                 * A method for observing the attribute for changes.
                 * 
                 * @param listener The listener callback which will be pre-bound to the 
                 * template control.
                 * 
                 * @return {IRemoveListener} A method for removing the listener.
                 */
                observe(listener: (newValue: T, oldValue: T) => void): IRemoveListener;
            }
    }
    export module events {
        export class DispatchEvent implements IDispatchEventInstance {
            $EventManagerStatic: IEventManagerStatic = acquire(__EventManagerStatic);

            sender: any;
            name: string;
            direction: string;
        
            initialize(name: string, sender: any, direction?: string): void;
            initialize(name: string, sender: any, direction?: 'up'): void;
            initialize(name: string, sender: any, direction?: 'down'): void;
            initialize(name: string, sender: any, direction?: 'direct'): void;
            initialize(name: string, sender: any, direction?: string) {
                this.name = name;
                this.direction = direction || this.$EventManagerStatic.DIRECT;
                this.sender = sender;
            }

            stopPropagation(): void {
                if (this.direction === this.$EventManagerStatic.UP) {
                    (<any>this.$EventManagerStatic.propagatingEvents)[this.name] = false;
                }
            }
        }

        /**
         * The Type for referencing the '$DispatchEventInstance' injectable as a dependency.
         */
        export function IDispatchEventInstance(): IDispatchEventInstance {
            return new DispatchEvent();
        }

        register.injectable(__DispatchEventInstance, IDispatchEventInstance, null, register.INSTANCE);

        /**
         * Describes an event that propagates through a control tree. 
         * Propagation of the event always starts at the sender, allowing a control to both 
         * initialize and consume an event. If a consumer of an event throws an error while 
         * handling the event it will be logged to the app using exception.warn. Errors will 
         * not stop propagation of the event.
         */
        export interface IDispatchEventInstance {
            /**
             * The object that initiated the event.
             */
            sender: any;
        
            /**
             * The name of the event.
             */
            name: string;

            /**
             * The event direction this object is using for propagation.
             */
            direction: string;

            /**
             * Call this method to halt the propagation of an upward-moving event.
             * Downward events cannot be stopped with this method.
             */
            stopPropagation(): void;

            /**
             * @param name The name of the event.
             * @param sender The object that initiated the event.
             * @param direction='up' Equivalent to EventManager.UP.
             * 
             * @see EventManager
             */
            initialize(name: string, sender: any, direction?: 'up'): void;
            /**
             * @param name The name of the event.
             * @param sender The object that initiated the event.
             * @param direction='down' Equivalent to EventManager.DOWN.
             * 
             * @see EventManager
             */
            initialize(name: string, sender: any, direction?: 'down'): void;
            /**
             * @param name The name of the event.
             * @param sender The object that initiated the event.
             * @param direction='direct' Equivalent to EventManager.DIRECT.
             * 
             * @see EventManager
             */
            initialize(name: string, sender: any, direction?: 'direct'): void;
            /**
             * @param name The name of the event.
             * @param sender The object that initiated the event.
             * @param direction The event direction this object is using for propagation.
             *
             * 
             * @see EventManager
             */
            initialize(name: string, sender: any, direction?: string): void;
        }

        /**
         * Represents a Lifecycle Event. Lifecycle Events are always direct events.
         */
        export class LifecycleEvent extends DispatchEvent implements ILifecycleEvent {
            /**
             * Creates a new LifecycleEvent and fires it.
             * 
             * @param name The name of the event.
             * @param sender The sender of the event.
             */
            static dispatch(name: string, sender: any): void {
                var event = new LifecycleEvent();

                event.initialize(name, sender);
                EventManager.sendEvent(event);
            }

            /**
             * Initializes the lifecycle event.
             * 
             * @param name The name of the event.
             * @param sender The sender of the event.
             */
            initialize(name: string, sender: any): void {
                super.initialize(name, sender, this.$EventManagerStatic.DIRECT);
            }
        }

        /**
         * The Type for referencing the '$LifecycleEventStatic' injectable as a dependency.
         */
        export function ILifecycleEventStatic(): ILifecycleEventStatic {
            return LifecycleEvent;
        }

        register.injectable(__LifecycleEventStatic, ILifecycleEventStatic, null, register.STATIC);

        /**
         * The intended external interface for the '$LifecycleEventStatic' injectable.
         */
        export interface ILifecycleEventStatic {
            /**
             * Creates a new LifecycleEvent and fires it.
             *
             * @param name The name of the event.
             * @param sender The sender of the event.
             */
            dispatch(name: string, sender: any): void;
        }

        /**
         * Defines an object that represents a Lifecycle Event
         */
        export interface ILifecycleEvent extends IDispatchEventInstance {
            /**
             * Initializes the lifecycle event.
             * 
             * @param name The name of the event.
             * @param sender The sender of the event.
             */
            initialize(name: string, sender: any): void;
        }

        /**
         * Event object for a control dispatch event. Contains information about the type of event.
         * Propagation of the event always starts at the sender, allowing a control to both 
         * initialize and consume an event. If a consumer of an event throws an error while 
         * handling the event it will be logged to the app using exception.warn. Errors will 
         * not stop propagation of the event.
         */
        export class EventManager {
            static $Compat: ICompat;
            static $Document: Document;
            static $Window: Window;
            static $Dom: ui.IDom;

            /**
             * An upward-moving event will start at the sender and move 
             * up the parent chain.
             */
            static UP = 'up';

            /**
             * A downward-moving event will start at the sender and move 
             * to its children and beyond.
             */
            static DOWN = 'down';

            /**
             * Goes through all listeners for an event name, ignoring order.
             */
            static DIRECT = 'direct';

            /**
             * Keeps track of which events are currently propagating.
             */
            static propagatingEvents: IObject<boolean> = {};

            private static __eventsListeners: IObject<IEventsListener> = {};
            private static __lifecycleEventListeners: Array<{ name: string; value: () => void; }> = [];
            private static __initialized = false;

            /**
             * Initializes the EventManager, creating the initial ALM event listeners.
             * 
             * @static
             */
            static initialize(): void {
                if (EventManager.__initialized) {
                    return;
                }

                EventManager.__initialized = true;

                var lifecycleListeners = EventManager.__lifecycleEventListeners,
                    length = lifecycleListeners.length,
                    $compat = EventManager.$Compat,
                    $document = EventManager.$Document,
                    $dom = EventManager.$Dom,
                    dispatch = LifecycleEvent.dispatch,
                    listener: { name: string; value: () => void; };

                while (lifecycleListeners.length > 0) {
                    listener = lifecycleListeners.pop();
                    $document.removeEventListener(listener.name, listener.value, false);
                }

                if ($compat.cordova) {
                    var eventNames = ['resume', 'online', 'offline'],
                        event: string;

                    length = eventNames.length;

                    for (var i = 0; i < eventNames.length; ++i) {
                        event = eventNames[i];
                        lifecycleListeners.push({
                            name: event,
                            value: ((ev: string) => () => {
                                dispatch(ev, EventManager);
                            })(event)
                        });

                        $dom.addEventListener($document, event, lifecycleListeners[i].value, false);
                    }

                    lifecycleListeners.push({
                        name: 'pause',
                        value: () => {
                            dispatch('suspend', EventManager);
                        }
                    });

                    $dom.addEventListener($document, 'pause', lifecycleListeners[lifecycleListeners.length - 1].value, false);

                    lifecycleListeners.push({
                        name: 'deviceReady',
                        value: () => {
                            dispatch('ready', EventManager);
                        }
                    });

                    $dom.addEventListener($document, 'deviceReady', lifecycleListeners[lifecycleListeners.length - 1].value, false);

                    lifecycleListeners.push({
                        name: 'backbutton',
                        value: () => {
                            dispatch('goBack', EventManager);
                        }
                    });

                    $dom.addEventListener($document, 'backbutton', lifecycleListeners[lifecycleListeners.length - 1].value, false);
                } else if ($compat.amd) {
                    return;
                } else {
                    $dom.addEventListener(EventManager.$Window, 'load', () => {
                        dispatch('ready', EventManager);
                    });
                }
            }

            /**
             * Removes all event listeners for a given uid. Useful for garbage collection when 
             * certain objects that listen to events go out of scope.
             * 
             * @static
             * @param uid The uid for which the event listeners will be removed.
             */
            static dispose(uid: string): void {
                EventManager.__eventsListeners[uid] = null;
                delete EventManager.__eventsListeners[uid];
            }

            /**
             * Registers a listener for a DispatchEvent. The listener will be called when a DispatchEvent is 
             * propagating over the given uid. Any number of listeners can exist for a single event name.
             * 
             * @static
             * @param uid A unique id to associate with the object registering the listener.
             * @param eventName The name of the event to listen to.
             * @param listener The method called when the DispatchEvent is fired.
             * @return {IRemoveListener} A method for removing the listener.
             */
            static on(uid: string, eventName: string, listener: (ev: IDispatchEventInstance, ...args: any[]) => void,
                context?: any): IRemoveListener {
                var eventsListener = EventManager.__eventsListeners[uid];

                if (isNull(eventsListener)) {
                    eventsListener = EventManager.__eventsListeners[uid] = {
                        listeners: {},
                        context: context
                    };
                }

                var eventListeners = eventsListener.listeners[eventName];

                if (isNull(eventListeners)) {
                    eventListeners = eventsListener.listeners[eventName] = [];
                }

                eventListeners.push(listener);

                var index = eventListeners.length - 1;

                return () => {
                    eventListeners.splice(index, 1);
                };
            }

            /**
             * Looks for listeners to a given event name, and fires the listeners using the specified
             * event direction.
             * 
             * @static
             * @param name The name of the event.
             * @param sender The object sending the event.
             * @param direction The direction in which to send the event.
             * @param args The arguments to send to the listeners.
             * 
             * @see EventManager.direction
             */
            static dispatch(name: string, sender: any, direction: string, args?: Array<any>): void;
            /**
             * Looks for listeners to a given event name, and fires the listeners using the specified
             * event direction.
             * 
             * @static
             * @param name The name of the event.
             * @param sender The object sending the event.
             * @param direction='up' Equivalent to EventManager.direction.UP.
             * @param args The arguments to send to the listeners.
             * 
             * @see EventManager.direction
             */
            static dispatch(name: string, sender: any, direction: 'up', args?: Array<any>): void;
            /**
             * Looks for listeners to a given event name, and fires the listeners using the specified
             * event direction.
             * 
             * @static
             * @param name The name of the event.
             * @param sender The object sending the event.
             * @param direction='down' Equivalent to EventManager.direction.DOWN.
             * @param args The arguments to send to the listeners.
             * 
             * @see EventManager.direction
             */
            static dispatch(name: string, sender: any, direction: 'down', args?: Array<any>): void;
            /**
             * Looks for listeners to a given event name, and fires the listeners using the specified
             * event direction.
             * 
             * @static
             * @param name The name of the event.
             * @param sender The object sending the event.
             * @param direction='direct' Equivalent to EventManager.direction.DIRECT.
             * @param args The arguments to send to the listeners.
             * 
             * @see EventManager.direction
             */
            static dispatch(name: string, sender: any, direction: 'direct', args?: Array<any>): void;
            static dispatch(name: string, sender: any, direction: string, args?: Array<any>) {
                var $dispatchEvent: IDispatchEventInstance = acquire(__DispatchEventInstance);
                $dispatchEvent.initialize(name, sender, direction);
                EventManager.sendEvent($dispatchEvent, args);
            }

            /**
             * Returns whether or not the given string is a registered direction.
             * 
             * @param direction The direction of the event
             */
            static hasDirection(direction: string): boolean {
                return (direction === EventManager.UP ||
                    direction === EventManager.DOWN ||
                    direction === EventManager.DIRECT);
            }

            /**
             * Determines the appropriate direction and dispatches the event accordingly.
             * 
             * @param event The IDispatchEvent to send
             * @param args The arguments associated with the event
             */
            static sendEvent(event: IDispatchEventInstance, args?: Array<any>): void {
                var name = event.name,
                    direction = event.direction;

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

                EventManager.propagatingEvents[name] = false;
                delete EventManager.propagatingEvents[name];
            }

            /**
             * Dispatches the event up the control chain.
             * 
             * @param event The event being dispatched.
             * @param args The arguments associated with the event.
             */
            static _dispatchUp(event: IDispatchEventInstance, args: Array<any>): void {
                var name = event.name,
                    parent = event.sender;

                while (!isNull(parent) && EventManager.propagatingEvents[name]) {
                    if (isNull(parent.uid)) {
                        continue;
                    }
                    EventManager.__executeEvent(parent.uid, event, args);
                    parent = parent.parent;
                }
            }

            /**
             * Dispatches the event down the control chain.
             * 
             * @param event The event being dispatched.
             * @param args The arguments associated with the event.
             */
            static _dispatchDown(event: IDispatchEventInstance, args: Array<any>): void {
                var controls: Array<IControl> = [],
                    control: IControl,
                    name = event.name;

                controls.push(event.sender);

                while (controls.length && EventManager.propagatingEvents[name]) {
                    control = controls.pop();

                    if (isNull(control.uid)) {
                        continue;
                    }

                    EventManager.__executeEvent(control.uid, event, args);

                    if (isNull((<ui.ITemplateControl>control).controls)) {
                        continue;
                    }

                    controls = controls.concat((<ui.ITemplateControl>control).controls);
                }
            }

            /**
             * Dispatches the event directly to all control's listening.
             * 
             * @param event The event being dispatched.
             * @param args The arguments associated with the event.
             */
            static _dispatchDirect(event: IDispatchEventInstance, args: Array<any>): void {
                var uids = Object.keys(EventManager.__eventsListeners),
                    length = uids.length,
                    name = event.name,
                    eventsListener: IEventsListener;

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
            }

            private static __executeEvent(uid: string, ev: IDispatchEventInstance, args: Array<any>): void {
                var eventsListener = EventManager.__eventsListeners[uid];

                if (isNull(eventsListener)) {
                    return;
                }
                var context = eventsListener.context,
                    listeners = eventsListener.listeners[ev.name];

                if (isNull(listeners)) {
                    return;
                }

                EventManager.__callListeners(context, ev, listeners, args);
            }

            private static __callListeners(context: any, ev: IDispatchEventInstance,
                listeners: Array<(ev: IDispatchEventInstance, ...args: any[]) => void>, args: Array<any>): void {
                var name = ev.name,
                    length = listeners.length,
                    index = -1;

                args = [ev].concat(args);

                while (++index < length && EventManager.propagatingEvents[name]) {
                    try {
                        listeners[index].apply(context, args);
                    } catch (e) {
                        var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                        $exception.warn(e, $exception.EVENT);
                    }
                }
            }
        }

        /**
         * The Type for referencing the '$EventManagerStatic' injectable as a dependency.
         */
        export function IEventManagerStatic(
            $Compat?: ICompat,
            $Document?: Document,
            $Window?: Window,
            $Dom?: ui.IDom): IEventManagerStatic {
                EventManager.$Compat = $Compat;
                EventManager.$Document = $Document;
                EventManager.$Window = $Window;
                EventManager.$Dom = $Dom;
                return EventManager;
        }

        register.injectable(__EventManagerStatic, IEventManagerStatic, [
            __Compat,
            __Document,
            __Window,
            __Dom
        ], register.STATIC);

        /**
         * Event object for a control dispatch event. Contains information about the type of event.
         * Propagation of the event always starts at the sender, allowing a control to both 
         * initialize and consume an event. If a consumer of an event throws an error while 
         * handling the event it will be logged to the app using exception.warn. Errors will 
         * not stop propagation of the event.
         */
        export interface IEventManagerStatic {
            /**
             * An upward-moving event will start at the sender and move 
             * up the parent chain.
             */
            UP: string;

            /**
             * A downward-moving event will start at the sender and move
             * to its children and beyond.
             */
            DOWN: string;

            /**
             * Goes through all listeners for an event name, ignoring order.
             */
            DIRECT: string;

            /**
             * Keeps track of which events are currently propagating.
             */
            propagatingEvents: {};

            /**
             * Initializes the EventManager, creating the initial ALM event listeners.
             */
            initialize(): void;

            /**
             * Removes all event listeners for a given uid. Useful for garbage collection when
             * certain objects that listen to events go out of scope.
             *
             * @param uid The uid for which the event listeners will be removed.
             */
            dispose(uid: string): void;

            /**
             * Registers a listener for the beforeNavigate Event. The listener will be called when the beforeNavigate 
             * event is propagating over the given uid. Any number of listeners can exist for a single event name. The 
             * listener can chose to cancel the event using ev.cancel(), preventing any navigation as well as further 
             * calls to event listeners.
             *
             * @param uid A unique id to associate with the object registering the listener.
             * @param eventName='beforeNavigate' Specifies that this is a listener for the beforeNavigate event.
             * @param listener The method called when the beforeNavigate event is fired.
             * @param context Optional context with which the listener will be bound.
             * @return {IRemoveListener} A method for removing the listener.
             */
            on(uid: string, eventName: 'beforeNavigate',
                listener: (ev: INavigationEvent<any>) => void, context?: any): IRemoveListener;
            /**
             * Registers a listener for the navigating Event. The listener will be called when the navigating 
             * event is propagating over the given uid. Any number of listeners can exist for a single event name.
             * The listener can chose to cancel the event using ev.cancel(), preventing any navigation as well as further 
             * calls to event listeners.
             *
             * @param uid A unique id to associate with the object registering the listener.
             * @param eventName='navigating' Specifies that this is a listener for the navigating event.
             * @param listener The method called when the navigating event is fired.
             * @param context Optional context with which the listener will be bound.
             * @return {IRemoveListener} A method for removing the listener.
             */
            on(uid: string, eventName: 'navigating',
                listener: (ev: INavigationEvent<any>) => void, context?: any): IRemoveListener;
            /**
             * Registers a listener for the navigated Event. The listener will be called when the navigated 
             * event is propagating over the given uid. Any number of listeners can exist for a single event name.
             * The listener cannot cancel the event.
             *
             * @param uid A unique id to associate with the object registering the listener.
             * @param eventName='navigated' Specifies that this is a listener for the navigated event.
             * @param listener The method called when the navigated event is fired.
             * @param context Optional context with which the listener will be bound.
             * @return {IRemoveListener} A method for removing the listener.
             */
            on(uid: string, eventName: 'navigated',
                listener: (ev: INavigationEvent<any>) => void, context?: any): IRemoveListener;
            /**
             * Registers a listener for a NavigationEvent. The listener will be called when a NavigationEvent is
             * propagating over the given uid. Any number of listeners can exist for a single event name.
             *
             * @param uid A unique id to associate with the object registering the listener.
             * @param eventName The name of the event to listen to.
             * @param listener The method called when the NavigationEvent is fired.
             * @param context Optional context with which the listener will be bound.
             * @return {IRemoveListener} A method for removing the listener.
             */
            on(uid: string, eventName: string, listener: (ev: INavigationEvent<any>) => void,
                context?: any): IRemoveListener;
            /**
             * Registers a listener for the ready AlmEvent. The ready event will be called when the app 
             * is ready to start.
             *
             * @param uid A unique id to associate with the object registering the listener.
             * @param eventName='ready' Specifies that the listener is for the ready event.
             * @param listener The method called when the app is ready to start.
             * @param context Optional context with which the listener will be bound.
             * @return {IRemoveListener} A method for removing the listener.
             */
            on(uid: string, eventName: 'ready', listener: (ev: ILifecycleEvent) => void,
                context?: any): IRemoveListener;
            /**
             * Registers a listener for the suspend AlmEvent. The listener will be called when an app 
             * is being suspended.
             *
             * @param uid A unique id to associate with the object registering the listener.
             * @param eventName='suspend' Specifies the listener is for the suspend event.
             * @param listener The method called when the suspend event is fired.
             * @param context Optional context with which the listener will be bound.
             * @return {IRemoveListener} A method for removing the listener.
             */
            on(uid: string, eventName: 'suspend', listener: (ev: ILifecycleEvent) => void,
                context?: any): IRemoveListener;
            /**
             * Registers a listener for the resume AlmEvent. The listener will be called when an app 
             * is being resumeed.
             *
             * @param uid A unique id to associate with the object registering the listener.
             * @param eventName='suspend' Specifies the listener is for the resume event.
             * @param listener The method called when the resume event is fired.
             * @param context Optional context with which the listener will be bound.
             * @return {IRemoveListener} A method for removing the listener.
             */
            on(uid: string, eventName: 'resume', listener: (ev: ILifecycleEvent) => void,
                context?: any): IRemoveListener;
            /**
             * Registers a listener for the online AlmEvent. This event fires when the app's network 
             * connection changes to be online.
             *
             * @param uid A unique id to associate with the object registering the listener.
             * @param eventName='online' Specifies the listener is for the online event.
             * @param listener The method called when the online event is fired.
             * @param context Optional context with which the listener will be bound.
             * @return {IRemoveListener} A method for removing the listener.
             */
            on(uid: string, eventName: 'online', listener: (ev: ILifecycleEvent) => void,
                context?: any): IRemoveListener;
            /**
             * Registers a listener for the offline AlmEvent. This event fires when the app's network 
             * connection changes to be offline.
             *
             * @param uid A unique id to associate with the object registering the listener.
             * @param eventName='offline' Specifies the listener is for the offline event.
             * @param listener The method called when the offline is fired.
             * @param context Optional context with which the listener will be bound.
             * @return {IRemoveListener} A method for removing the listener.
             */
            on(uid: string, eventName: 'offline', listener: (ev: ILifecycleEvent) => void,
                context?: any): IRemoveListener;
            /**
             * Registers a listener for an AlmEvent. The listener will be called when an AlmEvent is
             * propagating over the given uid. Any number of listeners can exist for a single event name.
             *
             * @param uid A unique id to associate with the object registering the listener.
             * @param eventName The name of the event to listen to.
             * @param listener The method called when the AlmEvent is fired.
             * @param context Optional context with which the listener will be bound.
             * @return {IRemoveListener} A method for removing the listener.
             */
            on(uid: string, eventName: string, listener: (ev: ILifecycleEvent) => void,
                context?: any): IRemoveListener;
            /**
             * Registers a listener for a ErrorEvent. The listener will be called when a ErrorEvent is
             * propagating over the given uid. Any number of listeners can exist for a single event name.
             *
             * @param uid A unique id to associate with the object registering the listener.
             * @param eventName The name of the event to listen to.
             * @param listener The method called when the ErrorEvent is fired.
             * @param context Optional context with which the listener will be bound.
             * @return {IRemoveListener} A method for removing the listener.
             */
            on(uid: string, eventName: 'error', listener: (ev: IErrorEvent<Error>) => void,
                context?: any): IRemoveListener;
            /**
             * Registers a listener for a ErrorEvent. The listener will be called when a ErrorEvent is
             * propagating over the given uid. Any number of listeners can exist for a single event name.
             *
             * @param uid A unique id to associate with the object registering the listener.
             * @param eventName The name of the event to listen to.
             * @param listener The method called when the ErrorEvent is fired.
             * @param context Optional context with which the listener will be bound.
             * @return {IRemoveListener} A method for removing the listener.
             */
            on(uid: string, eventName: string, listener: (ev: IErrorEvent<any>) => void,
                context?: any): IRemoveListener;
            /**
             * Registers a listener for a DispatchEvent. The listener will be called when a DispatchEvent is
             * propagating over the given uid. Any number of listeners can exist for a single event name.
             *
             * @param uid A unique id to associate with the object registering the listener.
             * @param eventName The name of the event to listen to.
             * @param listener The method called when the DispatchEvent is fired.
             * @param context Optional context with which the listener will be bound.
             * @return {IRemoveListener} A method for removing the listener.
             */
            on(uid: string, eventName: string, listener: (ev: IDispatchEventInstance, ...args: any[]) => void,
                context?: any): IRemoveListener;

            /**
             * Looks for listeners to a given event name, and fires the listeners using the specified
             * event direction.
             *
             * @static
             * @param name The name of the event.
             * @param sender The object sending the event.
             * @param direction='up' Equivalent to EventManager.direction.UP.
             * @param args The arguments to send to the listeners.
             *
             * @see EventManager.direction
             */
            dispatch(name: string, sender: any, direction: 'up', args?: Array<any>): void;
            /**
             * Looks for listeners to a given event name, and fires the listeners using the specified
             * event direction.
             *
             * @static
             * @param name The name of the event.
             * @param sender The object sending the event.
             * @param direction='down' Equivalent to EventManager.direction.DOWN.
             * @param args The arguments to send to the listeners.
             *
             * @see EventManager.direction
             */
            dispatch(name: string, sender: any, direction: 'down', args?: Array<any>): void;
            /**
             * Looks for listeners to a given event name, and fires the listeners using the specified
             * event direction.
             *
             * @static
             * @param name The name of the event.
             * @param sender The object sending the event.
             * @param direction='direct' Equivalent to EventManager.direction.DIRECT.
             * @param args The arguments to send to the listeners.
             *
             * @see EventManager.direction
             */
            dispatch(name: string, sender: any, direction: 'direct', args?: Array<any>): void;
            /**
             * Looks for listeners to a given event name, and fires the listeners using the specified
             * event direction.
             *
             * @static
             * @param name The name of the event.
             * @param sender The object sending the event.
             * @param direction The direction in which to send the event.
             * @param args The arguments to send to the listeners.
             *
             * @see EventManager.direction
             */
            dispatch(name: string, sender: any, direction: string, args?: Array<any>): void;

            /**
             * Returns whether or not the given string is a registered direction.
             */
            hasDirection(direction: string): boolean;

            /**
             * Determines the appropriate direction and dispatches the event accordingly.
             */
            sendEvent(event: IDispatchEventInstance, args?: Array<any>): void;
        }

        /**
         * Describes an object that contains event listeners.
         */
        interface IEventsListener {
            /**
             * An IObject of listener arrays, keyed by event name.
             */
            listeners: IObject<Array<(ev: IDispatchEventInstance, ...args: any[]) => void>>;
            /**
             * The context with which to call each event listener.
             */
            context: any;
        }

        /**
         * A class used by the Navigator to dispatch Navigation events. Allows anyone to listen 
         * for navigation events and respond to them, even canceling them if necessary.
         * 
         * @generic P Corresponds to the type of event parameter.
         */
        export class NavigationEvent<P> extends DispatchEvent implements INavigationEvent<P> {
            static $EventManagerStatic: IEventManagerStatic;
            /**
             * Dispatches an event with the specified target type.
             * 
             * @param name The name of the event (e.g. 'beforeNavigate')
             * @param sender The object sending the event.
             * @param eventOptions An object implementing INavigationEvent, specifying what all event listeners
             * will be passed.
             */
            static dispatch<P>(name: string, sender: any, eventOptions: INavigationEventOptions<P>): INavigationEvent<P> {
                var event = new NavigationEvent<P>();

                event.initialize(name, sender, null, eventOptions);
                NavigationEvent.$EventManagerStatic.sendEvent(event, []);

                return event;
            }

            parameter: P;
            options: navigation.IBaseNavigationOptions;
            target: any;
            type: string;
            cancelable: boolean = true;
            canceled: boolean = false;

            initialize(name: string, sender: any, direction?: string, eventOptions?: INavigationEventOptions<P>) {
                super.initialize(name, sender, this.$EventManagerStatic.DIRECT);
                this.parameter = eventOptions.parameter;
                this.options = eventOptions.options;
                this.target = eventOptions.target;
                this.type = eventOptions.type;
            }

            cancel() {
                if (this.cancelable) {
                    this.canceled = true;

                    (<any>this.$EventManagerStatic.propagatingEvents)[this.name] = false;
                }
            }
        }

        /**
         * The Type for referencing the '$NavigationEventStatic' injectable as a dependency.
         */
        export function INavigationEventStatic($EventManagerStatic?: IEventManagerStatic): INavigationEventStatic {
            NavigationEvent.$EventManagerStatic = $EventManagerStatic;
            return NavigationEvent;
        }

        register.injectable(__NavigationEventStatic, INavigationEventStatic, [__EventManagerStatic], register.STATIC);

        /**
         * The intended external interface for the '$NavigationEventStatic' injectable.
         */
        export interface INavigationEventStatic {
            /**
             * Dispatches an event with the specified target type.
             * 
             * @generic P Corresponds to the type of the event parameter.
             *
             * @param name The name of the event (e.g. 'beforeNavigate')
             * @param sender The object sending the event.
             * @param eventOptions An object implementing INavigationEvent, specifying what all event listeners
             * will be passed.
             */
            dispatch<P>(name: string, sender: any, eventOptions: events.INavigationEventOptions<P>): INavigationEvent<P>;
        }

        /**
         * Describes options for an INavigationEvent. The generic parameter specifies the 
         * target type for the event.
         */
        export interface INavigationEventOptions<P> {
            /**
             * Navigation parameter, used to send objects from one view control to another.
             */
            parameter: P;

            /**
             * The INavigationOptions in use for the navigation.
             */
            options: navigation.IBaseNavigationOptions;

            /**
             * The navigation event target. Its type depends on the type of Navigation event.
             */
            target: any;

            /**
             * Specifies the type of IViewControl for the Route Event.
             */
            type: string;

            /**
             * States whether or not this event is able to be canceled. Some navigation events can be 
             * canceled, preventing further navigation.
             */
            cancelable?: boolean;
        }

        /**
         * Describes an object used by the Navigator to dispatch Navigation events.
         */
        export interface INavigationEvent<P> extends IDispatchEventInstance {
            /**
             * Navigation parameter, used to send objects from one view control to another.
             */
            parameter: P;

            /**
             * The INavigationOptions in use for the navigation.
             */
            options: navigation.IBaseNavigationOptions;

            /**
             * The navigation event target. Its type depends on the type of Navigation event.
             */
            target: any;

            /**
             * Specifies the type of IViewControl for the Route Event.
             */
            type: string;

            /**
             * The sender of the event.
             */
            sender: any;

            /**
             * States whether or not this event is able to be canceled. Some navigation events can be 
             * canceled, preventing further navigation.
             */
            cancelable?: boolean;

            /**
             * States whether or not this event has been canceled.
             */
            canceled?: boolean;

            /**
             * If the event is cancelable (ev.cancelable), calling this method will cancel the event.
             */
            cancel(): void;

            /**
             * Initializes the event members.
             * 
             * @param name The name of the event.
             * @param sender The object that initiated the event.
             * @param direction='direct' Equivalent to EventManager.direction.DIRECT.
             * 
             * @see EventManager.direction
             */
            initialize(name: string, sender: any, direction?: 'direct', eventOptions?: INavigationEventOptions<P>);
            /**
             * Initializes the event members.
             * 
             * @param name The name of the event.
             * @param sender The object that initiated the event.
             * @param direction This will always be a direct event no matter what is sent in.
             * 
             * @see EventManager.direction
             */
            initialize(name: string, sender: any, direction?: string, eventOptions?: INavigationEventOptions<P>);
        }

        /**
         * Represents an internal Error Event. This is used for any 
         * internal errors (both fatal and warnings). All error events are 
         * direct events.
         */
        export class ErrorEvent<E extends Error> extends DispatchEvent implements IErrorEvent<E> {
            static $EventManagerStatic: IEventManagerStatic;

            /**
             * Creates a new ErrorEvent and fires it.
             * 
             * @param name The name of the event.
             * @param sender The sender of the event.
             * @param error The error that occurred, resulting in the event.
             */
            static dispatch<E extends Error>(name: string, sender: any, error: E): void {
                var event = new ErrorEvent<E>();

                event.initialize(name, sender, null, error);
                ErrorEvent.$EventManagerStatic.sendEvent(event);
            }

            error: E;

            initialize(name: string, sender: any, direction?: 'direct', error?: E): void;
            initialize(name: string, sender: any, direction?: string, error?: E): void;
            initialize(name: string, sender: any, direction?: string, error?: E) {
                super.initialize(name, sender, this.$EventManagerStatic.DIRECT);

                this.error = error;
            }
        }
    
        /**
         * The Type for referencing the '$ErrorEventStatic' injectable as a dependency.
         */
        export function IErrorEventStatic($EventManagerStatic?: IEventManagerStatic): IErrorEventStatic {
            ErrorEvent.$EventManagerStatic = $EventManagerStatic;
            return ErrorEvent;
        }

        register.injectable(__ErrorEventStatic, IErrorEventStatic, [__EventManagerStatic], register.STATIC);
    
        /**
         * The intended external interface for the $ErrorEventStatic injectable.
         */
        export interface IErrorEventStatic {
            /**
             * Creates a new ErrorEvent and fires it.
             *
             * @param name The name of the event.
             * @param sender The sender of the event.
             * @param error The error that occurred, resulting in the event.
             */
            dispatch<E extends Error>(name: string, sender: any, error: E): void;
        }

        /**
         * Defines an object that represents an Error Event. This is used for any 
         * internal errors (both fatal and warnings).
         */
        export interface IErrorEvent<E extends Error> extends IDispatchEventInstance {
            /**
             * The error being dispatched.
             */
            error: E;
        
            /**
             * @param name The name of the event.
             * @param sender The sender of the event.
             * @param direction='direct' This is always a direct event
             * @param error The error that occurred, resulting in the event.
             */
            initialize(name: string, sender: any, direction?: 'direct', error?: E): void;
            /**
             * @param name The name of the event.
             * @param sender The sender of the event.
             * @param direction This is always a direct event.
             * @param error The error that occurred, resulting in the event.
             */
            initialize(name: string, sender: any, direction?: string, error?: E): void;
        }
    }
    /**
     * @module plat
     */

    /**
     * Used for facilitating data and DOM manipulation. Contains lifecycle events 
     * as well as properties for communicating with other controls. This is the base
     * class for all types of controls.
     */
    export class Control implements IControl {
        static $Parser: expressions.IParser;
        static $ContextManagerStatic: observable.IContextManagerStatic;
        static $EventManagerStatic: events.IEventManagerStatic;

        /**
         * An object containing all controls' registered event listeners.
         */
        private static __eventListeners: IObject<Array<IRemoveListener>> = {};

        /**
         * Finds the ancestor control for the given control that contains the root 
         * context.
         * 
         * @static
         * @param control The control with which to find the root.
         */
        static getRootControl(control: IControl): ui.ITemplateControl;
        static getRootControl(control: ui.ITemplateControl) {
            if (isNull(control)) {
                return control;
            }

            var root = control;

            while (!(isNull(root.parent) || root.hasOwnContext)) {
                if (!isNull(root.root)) {
                    root = root.root;
                    break;
                }
                root = root.parent;
            }

            return root;
        }

        /**
         * Given a control, calls the loaded method for the control if it exists.
         * 
         * @static
         * @param control The control to load.
         */
        static load(control: IControl): void {
            if (isNull(control)) {
                return;
            }

            if (isFunction(control.loaded)) {
                control.loaded();
            }
        }

        /**
         * Disposes all the necessary memory for a control. Uses specific dispose 
         * methods related to a control's constructor if necessary.
         * 
         * @static
         * @param control The Control to dispose.
         */
        static dispose(control: IControl): void {
            var ctrl = <any>control;

            if (isNull(ctrl)) {
                return;
            } else if (!isUndefined(ctrl.templateControl)) {
                controls.AttributeControl.dispose(ctrl);
                return;
            } else if (ctrl.hasOwnContext) {
                ui.ViewControl.dispose(ctrl);
                return;
            } else if (ctrl.controls) {
                ui.TemplateControl.dispose(ctrl);
                return;
            }

            Control.removeEventListeners(control);
            Control.$ContextManagerStatic.dispose(control);
            control.dispose();

            Control.removeParent(control);
        }

        /**
         * Splices a control from its parent's controls list. Sets the control's parent 
         * to null.
         * 
         * @static
         * @param control The control whose parent will be removed.
         */
        static removeParent(control: IControl): void {
            if (isNull(control)) {
                return;
            }

            var parent = control.parent;

            if (isNull(parent)) {
                return;
            }

            var controls = parent.controls || [],
                index = controls.indexOf(control);

            if (index !== -1) {
                controls.splice(index, 1);
            }

            control.parent = null;
        }

        /**
         * Removes all event listeners for a control with the given uid.
         * 
         * @static
         * @param control The control having its event listeners removed.
         */
        static removeEventListeners(control: IControl): void {
            if (isNull(control)) {
                return;
            }

            var removeListeners = Control.__eventListeners,
                uid = control.uid;

            var listeners = removeListeners[uid];
            if (isArray(listeners)) {
                var index = listeners.length;
                while (index-- > 0) {
                    listeners[index]();
                }

                removeListeners[uid] = null;
                delete removeListeners[uid];
            }
        }

        /**
         * Returns a new instance of Control.
         * 
         * @static
         */
        static getInstance(): IControl {
            return new Control();
        }

        /**
         * Adds a function to remove an event listener for the control specified 
         * by its uid.
         * 
         * @static
         * @param uid The uid of the control associated with the remove function.
         * @param listener The remove function to add.
         */
        private static __addRemoveListener(uid: string, listener: IRemoveListener): void {
            var removeListeners = Control.__eventListeners;

            if (isArray(removeListeners[uid])) {
                removeListeners[uid].push(listener);
                return;
            }

            removeListeners[uid] = [listener];
        }

        private static __spliceRemoveListener(uid: string, listener: IRemoveListener): void {
            var removeListeners = Control.__eventListeners,
                controlListeners = removeListeners[uid];

            if (isArray(controlListeners)) {
                var index = controlListeners.indexOf(listener);
                if (index === -1) {
                    return;
                }

                controlListeners.splice(index, 1);
            }
        }

        private static __getControls(control: IControl, method: string, key: string): Array<IControl> {
            var controls: Array<IControl> = [],
                root = Control.getRootControl(control),
                child: IControl;

            if (!isNull(root) && (<any>root)[method] === key) {
                controls.push(root);
            }

            var children = root.controls;

            if (isNull(children)) {
                return controls;
            }

            var queue: Array<IControl> = [];
            queue = queue.concat(children);

            while (queue.length > 0) {
                child = queue.shift();

                if ((<any>child)[method] === key) {
                    controls.push(child);
                }

                if (isNull((<ui.ITemplateControl>child).controls)) {
                    continue;
                }

                queue = queue.concat((<ui.ITemplateControl>child).controls);
            }

            return controls;
        }

        uid: string;
        name: string;
        type: string;
        parent: ui.ITemplateControl;
        element: HTMLElement;
        attributes: ui.IAttributesInstance;
        dom: ui.IDom = acquire(__Dom);

        /**
         * The constructor for a control. Any injectables specified during control registration will be
         * passed into the constructor as arguments as long as the control is instantiated with its associated
         * injector.
         */
        constructor() {
            var ContextManager: observable.IContextManagerStatic = Control.$ContextManagerStatic ||
                acquire(__ContextManagerStatic);
            ContextManager.defineGetter(this, 'uid', uniqueId('plat_'));
        }

        initialize() { }

        loaded() { }

        getControlsByName(name: string): Array<IControl> {
            return Control.__getControls(this, 'name', name);
        }

        getControlsByType<T extends Control>(type: string): Array<T>;
        getControlsByType<T extends Control>(Constructor: new () => T): Array<T>;
        getControlsByType(type: any) {
            if (isString(type)) {
                return Control.__getControls(this, 'type', type);
            }
            return Control.__getControls(this, 'constructor', type);
        }

        addEventListener(element: Node, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        addEventListener(element: Window, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        addEventListener(element: any, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener {
            var removeListener = this.dom.addEventListener(element, type, listener, useCapture),
                uid = this.uid;

            Control.__addRemoveListener(uid, removeListener);

            return () => {
                removeListener();
                Control.__spliceRemoveListener(uid, removeListener);
            };
        }

        observe<T>(context: any, property: string, listener: (value: T, oldValue: any) => void): IRemoveListener;
        observe<T>(context: any, property: number, listener: (value: T, oldValue: T) => void): IRemoveListener;
        observe(context: any, property: any, listener: (value: any, oldValue: any) => void): IRemoveListener {
            if (isNull(context) || !context.hasOwnProperty(property)) {
                return noop;
            }

            var control = isFunction((<ui.ITemplateControl>(<any>this)).getAbsoluteIdentifier) ? this : <IControl>this.parent;

            if (isNull(control) || !isFunction((<ui.ITemplateControl>(<any>control)).getAbsoluteIdentifier)) {
                return noop;
            }

            var absoluteIdentifier = (<ui.ITemplateControl>(<any>control)).getAbsoluteIdentifier(context);

            if (isNull(absoluteIdentifier)) {
                return noop;
            }

            var contextManager = Control.$ContextManagerStatic.getManager(Control.getRootControl(this));

            return contextManager.observe(absoluteIdentifier + '.' + property, {
                listener: listener.bind(this),
                uid: this.uid
            });
        }

        observeArray<T>(context: any, property: string, listener: (ev: observable.IArrayMethodInfo<T>) => void): IRemoveListener;
        observeArray<T>(context: Array<T>, property: number, listener: (ev: observable.IArrayMethodInfo<T>) => void): IRemoveListener;
        observeArray(context: any, property: any, listener: (ev: observable.IArrayMethodInfo<any>) => void): IRemoveListener {
            if (isNull(context) || !context.hasOwnProperty(property)) {
                return noop;
            }

            var array = context[property],
                callback = listener.bind(this);

            if (!isArray(array)) {
                return noop;
            }

            var control = isFunction((<ui.ITemplateControl>(<any>this)).getAbsoluteIdentifier) ? this : <IControl>this.parent;

            if (isNull(control) || !isFunction((<ui.ITemplateControl>(<any>control)).getAbsoluteIdentifier)) {
                return noop;
            }

            var absoluteIdentifier = (<ui.ITemplateControl>(<any>control)).getAbsoluteIdentifier(context),
                ContextManager = Control.$ContextManagerStatic;

            if (isNull(absoluteIdentifier)) {
                if (property === 'context') {
                    absoluteIdentifier = (<ui.ITemplateControl>(<any>control)).absoluteContextPath;
                } else {
                    return noop;
                }
            } else {
                absoluteIdentifier += '.' + property;
            }

            var contextManager = ContextManager.getManager(Control.getRootControl(this)),
                uid = this.uid,
                removeCallback = contextManager.observe(absoluteIdentifier, {
                    listener: (newValue: Array<any>, oldValue: Array<any>) => {
                        removeListener();
                        removeListener = contextManager.observeArray(this.uid, callback, absoluteIdentifier, newValue, oldValue);
                    },
                    uid: uid
                }),
                removeListener = contextManager.observeArray(this.uid, callback, absoluteIdentifier, array, null);

            // need to call callback if 
            return () => {
                ContextManager.removeArrayListeners(absoluteIdentifier, uid);
                removeListener();
                removeCallback();
            };
        }

        observeExpression(expression: string, listener: (value: any, oldValue: any) => void): IRemoveListener;
        observeExpression(expression: expressions.IParsedExpression, listener: (value: any, oldValue: any) => void): IRemoveListener;
        observeExpression(expression: any, listener: (value: any, oldValue: any) => void): IRemoveListener {
            if (isNull(expression)) {
                return noop;
            } else if (!(isString(expression) || isFunction(expression.evaluate))) {
                return noop;
            }

            var parsedExpression: expressions.IParsedExpression = isString(expression) ? Control.$Parser.parse(expression) : expression,
                aliases = parsedExpression.aliases,
                control: ui.TemplateControl = !isNull((<ui.TemplateControl>(<any>this)).resources) ?
                    <ui.TemplateControl>(<any>this) :
                    <ui.TemplateControl>this.parent,
                alias: string,
                length = aliases.length,
                resources: IObject<observable.IContextManager> = {},
                ContextManager = Control.$ContextManagerStatic,
                getManager = ContextManager.getManager,
                TemplateControl = ui.TemplateControl,
                findResource = TemplateControl.findResource,
                evaluateExpression = TemplateControl.evaluateExpression,
                i: number;

            if (isNull(control) || !isString(control.absoluteContextPath)) {
                return noop;
            }

            for (i = 0; i < length; ++i) {
                alias = aliases[i];

                var resourceObj = findResource(control, alias);
                if (!isNull(resourceObj) && resourceObj.resource.type === 'observable') {
                    resources[alias] = getManager(resourceObj.control);
                }
            }

            var identifiers = parsedExpression.identifiers,
                contextManager = getManager(Control.getRootControl(control)),
                identifier: string,
                split: Array<string> = [],
                absolutePath = control.absoluteContextPath + '.',
                managers: IObject<observable.IContextManager> = {};

            length = identifiers.length;

            for (i = 0; i < length; ++i) {
                identifier = identifiers[i];
                split = identifier.split('.');

                if (identifier.indexOf('this') === 0) {
                    identifier = identifier.slice(5);
                } else if (identifier[0] === '@') {
                    alias = split[0].substr(1);
                    identifier = identifier.replace('@' + alias, 'resources.' + alias + '.value');

                    if (!isNull(resources[alias])) {
                        managers[identifier] = resources[alias];
                    }

                    continue;
                }

                managers[absolutePath + identifier] = contextManager;
            }

            identifiers = Object.keys(managers);
            length = identifiers.length;

            var oldValue = evaluateExpression(parsedExpression, control),
                listeners: Array<IRemoveListener> = [],
                uid = this.uid;

            for (i = 0; i < length; ++i) {
                identifier = identifiers[i];

                listeners.push(managers[identifier].observe(identifier, {
                    uid: uid,
                    listener: () => {
                        var value = evaluateExpression(parsedExpression, control);
                        listener.call(this, value, oldValue);
                        oldValue = value;
                    }
                }));
            }
            
            return () => {
                var length = listeners.length;

                for (var i = 0; i < length; ++i) {
                    listeners[i]();
                }
            };
        }

        evaluateExpression(expression: string, aliases?: any): any;
        evaluateExpression(expression: expressions.IParsedExpression, aliases?: any): any;
        evaluateExpression(expression: any, aliases?: any): any {
            var TemplateControl = ui.TemplateControl;
            return TemplateControl.evaluateExpression(expression, this.parent, aliases);
        }

        dispatchEvent(name: string, direction?: string, ...args: any[]): void;
        dispatchEvent(name: string, direction?: 'up', ...args: any[]): void;
        dispatchEvent(name: string, direction?: 'down', ...args: any[]): void;
        dispatchEvent(name: string, direction?: 'direct', ...args: any[]): void;
        dispatchEvent(name: string, direction?: string, ...args: any[]) {
            var manager = Control.$EventManagerStatic;

            if (!manager.hasDirection(direction)) {
                if (!isUndefined(direction)) {
                    args.unshift(direction);
                }
                direction = manager.UP;
            }
            var sender: any = this;

            if (!isNull(sender.templateControl)) {
                sender = sender.templateControl;
            }

            manager.dispatch(name, sender, direction, args);
        }

        on(name: string, listener: (ev: events.IDispatchEventInstance, ...args: any[]) => void): IRemoveListener {
            var manager = Control.$EventManagerStatic;
            return manager.on(this.uid, name, listener, this);
        }

        dispose(): void { }
    }

    /**
     * The Type for referencing the '$ControlFactory' injectable as a dependency.
     */
    export function IControlFactory(
            $Parser?: expressions.IParser,
            $ContextManagerStatic?: observable.IContextManagerStatic,
            $EventManagerStatic?: events.IEventManagerStatic): IControlFactory {
        Control.$Parser = $Parser;
        Control.$ContextManagerStatic = $ContextManagerStatic;
        Control.$EventManagerStatic = $EventManagerStatic;
        return Control;
    }

    register.injectable(__ControlFactory, IControlFactory, [
        __Parser,
        __ContextManagerStatic,
        __EventManagerStatic
    ], register.FACTORY);

    /**
     * Creates and manages instances of IControl.
     */
    export interface IControlFactory {
        /**
         * Finds the ancestor control for the given control that contains the root
         * context.
         *
         * @static
         * @param control The control with which to find the root.
         * @return {ui.ITemplateControl}
         */
        getRootControl(control: IControl): ui.ITemplateControl;
        getRootControl(control: ui.ITemplateControl): ui.ITemplateControl;

        /**
         * Given a control, calls the loaded method for the control if it exists.
         *
         * @static
         * @param control The control to load.
         */
        load(control: IControl): void;

        /**
         * Disposes all the necessary memory for a control. Uses specific dispose
         * methods related to a control's constructor if necessary.
         *
         * @static
         * @param control The Control to dispose.
         */
        dispose(control: IControl): void;

        /**
         * Splices a control from its parent's controls list. Sets the control's parent
         * to null.
         *
         * @static
         * @param control The control whose parent will be removed.
         */
        removeParent(control: IControl): void;

        /**
         * Removes all event listeners for a control with the given uid.
         *
         * @static
         * @param control The control having its event listeners removed.
         */
        removeEventListeners(control: IControl): void;

        /**
         * Returns a new instance of an IControl.
         *
         * @static
         */
        getInstance(): IControl;
    }

    /**
     * Describes an object used for facilitating data and DOM manipulation. Contains lifecycle events 
     * as well as properties for communicating with other IControls.
     */
    export interface IControl {
        /**
         * A unique id, created during instantiation and found on every IControl.
         */
        uid: string;

        /**
         * The name of an IControl.
         */
        name?: string;

        /**
         * The type of an IControl.
         */
        type?: string;

        /**
         * The parent control that created this control. If this control does not implement ui.IBaseViewControl
         * then it will inherit its context from the parent.
         */
        parent?: ui.ITemplateControl;

        /**
         * The HTMLElement that represents this IControl. Should only be modified by controls that implement 
         * ui.ITemplateControl. During initialize the control should populate this element with what it wishes
         * to render to the user. 
         * 
         * When there is innerHTML in the element prior to instantiating the control:
         *     The element will include the innerHTML
         * When the control implements templateString or templateUrl:
         *     The serialized DOM will be auto-generated and included in the element. Any
         *     innerHTML will be stored in the innerTemplate property on the control.
         *    
         * After an IControl is initialized its element will be compiled.
         */
        element?: HTMLElement;

        /**
         * The attributes object representing all the attributes for an IControl's element. All attributes are 
         * converted from dash notation to camelCase.
         * 
         * @see {@link ui.Attributes}
         */
        attributes?: ui.IAttributesInstance;

        /**
         * Contains DOM helper methods for manipulating this control's element.
         */
        dom: ui.IDom;

        /**
         * The initialize event method for a control. In this method a control should initialize all the necessary 
         * variables. This method is typically only necessary for view controls. If a control does not implement 
         * ui.IBaseViewControl then it is not safe to access, observe, or modify the context property in this method.
         * A view control should call services/set context in this method in order to fire the loaded event. No control 
         * will be loaded until the view control has specified a context.
         */
        initialize? (): void;

        /**
         * The loaded event method for a control. This event is fired after a control has been loaded,
         * meaning all of its children have also been loaded and initial DOM has been created and populated. It is now 
         * safe for all controls to access, observe, and modify the context property.
         */
        loaded? (): void;

        /**
         * Retrieves all the controls with the specified name.
         * 
         * @param name The string name with which to populate the returned controls array.
         */
        getControlsByName? (name: string): Array<IControl>;

        /**
         * Retrieves all the controls of the specified type.
         * 
         * @param type The type used to find controls (e.g. 'plat-foreach')
         */
        getControlsByType? <T extends IControl>(type: string): Array<T>;
        /**
         * Retrieves all the controls of the specified type.
         * 
         * @param Constructor The constructor used to find controls.
         * 
         * @example this.getControlsByType<ui.controls.ForEach>(ui.controls.ForEach)
         */
        getControlsByType? <T extends IControl>(Constructor: new () => T): Array<T>;

        /**
         * Adds an event listener of the specified type to the specified element. Removal of the 
         * event is handled automatically upon disposal.
         * 
         * @param element The element to add the event listener to.
         * @param type The type of event to listen to.
         * @param listener The listener to fire when the event occurs.
         * @param useCapture Whether to fire the event on the capture or the bubble phase 
         * of event propagation.
         */
        addEventListener? (element: Node, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        /**
         * Adds an event listener of the specified type to the specified element. Removal of the 
         * event is handled automatically upon disposal.
         * 
         * @param element The window object.
         * @param type The type of event to listen to.
         * @param listener The listener to fire when the event occurs.
         * @param useCapture Whether to fire the event on the capture or the bubble phase 
         * of event propagation.
         */
        addEventListener? (element: Window, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;

        /**
         * Allows an IControl to observe any property on its context and receive updates when
         * the property is changed.
         * 
         * @param context The immediate parent object containing the property.
         * @param property The property identifier to watch for changes.
         * @param listener The method called when the property is changed. This method will have its 'this'
         * context set to the control instance.
         */
        observe? <T>(context: any, property: string, listener: (value: T, oldValue: T) => void): IRemoveListener;
        /**
         * Allows an IControl to observe any property on its context and receive updates when
         * the property is changed.
         * 
         * @param context The immediate parent array containing the property.
         * @param property The index to watch for changes.
         * @param listener The method called when the property is changed. This method will have its 'this'
         * context set to the control instance.
         */
        observe? <T>(context: any, property: number, listener: (value: T, oldValue: T) => void): IRemoveListener;

        /**
         * Allows an IControl to observe an array and receive updates when certain array-changing methods are called.
         * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method does not watch
         * every item in the array.
         * 
         * @param context The immediate parent object containing the array as a property.
         * @param property The array property identifier to watch for changes.
         * @param listener The method called when an array-changing method is called. This method will have its 'this'
         * context set to the control instance.
         */
        observeArray? <T>(context: any, property: string, listener: (ev: observable.IArrayMethodInfo<T>) => void): IRemoveListener;
        /**
         * Allows an IControl to observe an array and receive updates when certain array-changing methods are called.
         * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method does not watch
         * every item in the array.
         * 
         * @param context The immediate parent array containing the array as a property.
         * @param property The index on the parent array, specifying the array to watch for changes.
         * @param listener The method called when an array-changing method is called. This method will have its 'this'
         * context set to the control instance.
         */
        observeArray? <T>(context: Array<T>, property: number, listener: (ev: observable.IArrayMethodInfo<T>) => void): IRemoveListener;

        /**
         * Parses an expression string and observes any associated identifiers. When an identifier
         * value changes, the listener will be called.
         * 
         * @param expression The expression string to watch for changes.
         * @param listener The listener to call when the expression identifer values change.
         */
        observeExpression? (expression: string, listener: (value: any, oldValue: any) => void): IRemoveListener;
        /**
         * Uses a parsed expression to observe any associated identifiers. When an identifier
         * value changes, the listener will be called.
         * 
         * @param expression The IParsedExpression to watch for changes.
         * @param listener The listener to call when the expression identifer values change.
         */
        observeExpression? (expression: expressions.IParsedExpression, listener: (value: any, oldValue: any) => void): IRemoveListener;

        /**
         * Evaluates an expression string, using the control.context.
         * 
         * @param expression The expression string to evaluate.
         * @param context An optional context with which to parse. If 
         * no context is specified, the control.context will be used.
         */
        evaluateExpression? (expression: string, context?: any): any;
        /**
         * Evaluates a parsed expression, using the control.context.
         * 
         * @param expression The IParsedExpression to evaluate.
         * @param context An optional context with which to parse. If 
         * no context is specified, the control.context will be used.
         */
        evaluateExpression? (expression: expressions.IParsedExpression, context?: any): any;

        /**
         * Creates a new DispatchEvent and propagates it to controls based on the 
         * provided direction mechanism. Controls in the propagation chain that registered
         * the event using the control.on() method will receive the event. Propagation will
         * always start with the sender, so the sender can both produce and consume the same
         * event.
         * 
         * @param name The name of the event to send, cooincides with the name used in the
         * control.on() method.
         * @param direction='up' Equivalent to events.EventManager.UP
         * @param ...args Any number of arguments to send to all the listeners.
         * 
         * @see events.eventDirection
         */
        dispatchEvent? (name: string, direction?: 'up', ...args: any[]): void;
        /**
         * Creates a new DispatchEvent and propagates it to controls based on the 
         * provided direction mechanism. Controls in the propagation chain that registered
         * the event using the control.on() method will receive the event. Propagation will
         * always start with the sender, so the sender can both produce and consume the same
         * event.
         * 
         * @param name The name of the event to send, cooincides with the name used in the
         * control.on() method.
         * @param direction='down' Equivalent to events.EventManager.DOWN
         * @param ...args Any number of arguments to send to all the listeners.
         * 
         * @see events.eventDirection
         */
        dispatchEvent? (name: string, direction?: 'down', ...args: any[]): void;
        /**
         * Creates a new DispatchEvent and propagates it to controls based on the 
         * provided direction mechanism. Controls in the propagation chain that registered
         * the event using the control.on() method will receive the event. Propagation will
         * always start with the sender, so the sender can both produce and consume the same
         * event.
         * 
         * @param name The name of the event to send, cooincides with the name used in the
         * control.on() method.
         * @param direction='direct' Equivalent to events.EventManager.DIRECT
         * @param ...args Any number of arguments to send to all the listeners.
         * 
         * @see events.eventDirection
         */
        dispatchEvent? (name: string, direction?: 'direct', ...args: any[]): void;
        /**
         * Creates a new DispatchEvent and propagates it to controls based on the 
         * provided direction mechanism. Controls in the propagation chain that registered
         * the event using the control.on() method will receive the event. Propagation will
         * always start with the sender, so the sender can both produce and consume the same
         * event.
         * 
         * @param name The name of the event to send, cooincides with the name used in the
         * control.on() method.
         * @param direction An optional events.eventDirection to propagate the event, defaults to
         * events.EventManager.UP.
         * @param ...args Any number of arguments to send to all the listeners.
         * 
         * @see events.eventDirection
         */
        dispatchEvent? (name: string, direction?: string, ...args: any[]): void;

        /**
         * Registers a listener for a DispatchEvent. The listener will be called when a DispatchEvent is 
         * propagating over the control. Any number of listeners can exist for a single event name.
         * 
         * @param name The name of the event, cooinciding with the DispatchEvent name.
         * @param listener The method called when the DispatchEvent is fired.
         */
        on? (name: string, listener: (ev: events.IDispatchEventInstance, ...args: any[]) => void): IRemoveListener;

        /**
         * The dispose event is called when a control is being removed from memory. A control should release 
         * all of the memory it is using, including DOM event and property listeners.
         */
        dispose? (): void;
    }

    export module controls {
        /**
         * A type of control that can be used as an attribute but will 
         * not be used to add, remove, or modify DOM.
         */
        export class AttributeControl extends Control implements IAttributeControl {
            /**
             * Method for disposing an attribute control. Removes any 
             * necessary objects from the control.
             * 
             * @static
             * @param control The AttributeControl to dispose.
             */
            static dispose(control: IAttributeControl): void {
                control.templateControl = null;
                delete control.templateControl;

                Control.dispose(control);
            }

            /**
             * Returns a new instance of AttributeControl.
             * 
             * @static
             */
            static getInstance(): IAttributeControl {
                return new AttributeControl();
            }

            templateControl: ui.ITemplateControl = null;
            priority = 0;
        }

        /**
         * The Type for referencing the '$AttributeControlFactory' injectable as a dependency.
         */
        export function IAttributeControlFactory(): IAttributeControlFactory {
            return AttributeControl;
        }

        register.injectable(__AttributeControlFactory, IAttributeControlFactory, null, register.FACTORY);

        /**
         * Creates and manages instances of IAttributeControl.
         */
        export interface IAttributeControlFactory {
            /**
             * Method for disposing an attribute control. Removes any
             * necessary objects from the control.
             *
             * @static
             * @param control The AttributeControl to dispose.
             */
            dispose(control: IAttributeControl): void;

            /**
             * Returns a new instance of an IAttributeControl.
             *
             * @static
             */
            getInstance(): IAttributeControl;
        }

        /**
         * An object describing a type of control that can be used as an attribute but will 
         * not be used to add, remove, or modify DOM.
         */
        export interface IAttributeControl extends IControl {
            /**
             * Specifies the ITemplateControl associated with this
             * control's element. Can be null if no ITemplateControl
             * exists.
             */
            templateControl?: ui.ITemplateControl;

            /**
             * Specifies the priority of the attribute. The purpose of 
             * this is so that controls like plat-bind can have a higher 
             * priority than plat-tap. The plat-bind will be initialized 
             * and loaded before plat-tap, meaning it has the first chance 
             * to respond to events.
             */
            priority?: number;
        }

        export class Name extends AttributeControl {
            $ContextManagerStatic: observable.IContextManagerStatic = acquire(__ContextManagerStatic);

            /**
             * The root control that will have the INamedElement set as a property.
             */
            _rootControl: ui.ITemplateControl;

            /**
             * The property name on the root control to set as the INamedElement.
             */
            _label: string;

            /**
             * Finds the root control and defines the property specified by the 
             * attribute value as the INamedElement.
             */
            initialize(): void {
                var attr = camelCase(this.type),
                    name = (<any>this.attributes)[attr];

                if (isEmpty(name)) {
                    return;
                }

                this._label = name;

                var templateControl = this.templateControl,
                    rootControl = this._rootControl = Control.getRootControl(this.parent),
                    define = this.$ContextManagerStatic.defineGetter;

                if (!isNull(templateControl)) {
                    define(templateControl, 'name', name, true, true);
                }

                if (!isNull(rootControl)) {
                    define(rootControl, name, {
                        element: this.element,
                        control: templateControl
                    }, true, true);
                }
            }

            /**
             * Removes the INamedElement from the root control.
             */
            dispose(): void {
                var rootControl = this._rootControl,
                    name = this._label;

                if (!isNull(rootControl)) {
                    this.$ContextManagerStatic.defineProperty(rootControl, name, null, true, true);
                    delete (<any>rootControl)[name];
                }
            }
        }

        register.control(__Name, Name);

        /**
         * Defines the object added to a root control when an HTML element has 
         * a plat-name attribute. If the element corresponds to a registered 
         * control, the control will be included in the object.
         */
        export interface INamedElement<E extends Element, C> {
            /**
             * The element on which the plat-name is specified.
             */
            element: E;

            /**
             * The template control on the associated element, if one 
             * exists.
             */
            control?: C;
        }

        /**
         * An AttributeControl that binds to a specified DOM event handler.
         */
        export class SimpleEventControl extends AttributeControl implements ISimpleEventControl {
            $Parser: expressions.IParser = acquire(__Parser);
            $Regex: expressions.IRegex = acquire(__Regex);

            /**
             * The event name.
             */
            event: string;

            /**
             * The camel-cased name of the control as it appears as an attribute.
             */
            attribute: string;

            /**
             * Our event handler bound to our own context.
             */
            _listener: EventListener = this._onEvent.bind(this);

            /**
             * A parsed form of the expression found in the attribute's value.
             */
            _expression: Array<string> = [];

            /**
             * An array of the aliases used in the expression.
             */
            _aliases: Array<string> = [];

            /**
             * Kicks off finding and setting the listener.
             */
            loaded(): void {
                if (isNull(this.element)) {
                    return;
                }

                this.attribute = camelCase(this.type);
                this._setListener();
            }

            /**
             * Disposes of the event listener.
             */
            dispose(): void {
                this._listener = null;
            }

            /**
             * Sets the event listener.
             */
            _setListener(): void {
                var attr = this.attribute;
                if (isEmpty(this.event) || isEmpty(attr)) {
                    return;
                }

                this._parseArgs((<any>this.attributes)[attr]);

                if (isNull(this._expression)) {
                    return;
                }

                this.addEventListener(this.element, this.event, this._listener, false);
            }

            /**
             * Finds the first instance of the specified function 
             * in the parent control chain.
             * 
             * @param identifier the function identifer
             */
            _findListener(identifier: string): { control: ui.ITemplateControl; value: any; } {
                var control: ui.ITemplateControl = <any>this,
                    expression = this.$Parser.parse(identifier),
                    value: any;

                while (!isNull(control)) {
                    value = expression.evaluate(control);
                    if (!isNull(value)) {
                        return {
                            control: control,
                            value: value
                        };
                    }
                    control = control.parent;
                }

                return {
                    control: null,
                    value: null
                };
            }

            /**
             * Constructs the function to evaluate with 
             * the evaluated arguments taking resources 
             * into account.
             */
            _buildExpression(): { fn: () => void; control: ui.ITemplateControl; args: Array<expressions.IParsedExpression>; } {
                var expression = this._expression.slice(0),
                    hasParent = !isNull(this.parent),
                    aliases = hasParent ? this.parent.getResources(this._aliases) : null,
                    listenerStr = expression.shift(),
                    listener: { control: ui.ITemplateControl; value: any; },
                    control: ui.ITemplateControl,
                    fn: () => void;

                if (listenerStr[0] !== '@') {
                    listener = this._findListener(listenerStr);

                    if (isNull(listener)) {
                        return {
                            fn: noop,
                            control: <ui.ITemplateControl>{},
                            args: []
                        };
                    }

                    fn = listener.value;
                    control = listener.control;
                } else {
                    fn = aliases[listenerStr];
                    control = null;
                }

                var length = expression.length,
                    args: Array<expressions.IParsedExpression> = [],
                    $parser = this.$Parser;

                for (var i = 0; i < length; ++i) {
                    args.push($parser.parse(expression[i]).evaluate(hasParent ? this.parent.context : null, aliases));
                }

                return {
                    fn: fn,
                    control: control,
                    args: args
                };
            }

            /**
             * Calls the specified function when the DOM event is fired.
             * 
             * @param ev The event object.
             */
            _onEvent(ev: any): void {
                var expression = this._buildExpression(),
                    fn = expression.fn,
                    control = expression.control,
                    args = expression.args;

                if (!isFunction(fn)) {
                    var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                    $exception.warn('Cannot find registered event method ' +
                        this._expression[0] + ' for control: ' + this.type, $exception.BIND);
                    return;
                }

                fn.apply(control, args.concat(ev));
            }

            /**
             * Finds all alias contained within the expression.
             * 
             * @param arguments The array of arguments as strings.
             */
            _findAliases(arguments: Array<string>): Array<string> {
                var length = arguments.length,
                    arg: string,
                    alias: string,
                    exec: RegExpExecArray,
                    aliases: IObject<boolean> = {},
                    $regex = this.$Regex;

                for (var i = 0; i < length; ++i) {
                    arg = arguments[i].trim();

                    if (arg[0] === '@') {
                        exec = $regex.aliasRegex.exec(arg);
                        aliases[!isNull(exec) ? exec[0] : arg.substr(1)] = true;
                    }
                }

                return Object.keys(aliases);
            }

            /**
             * Parses the expression and separates the function 
             * from its arguments.
             * 
             * @param expression The expression to parse.
             */
            _parseArgs(expression: string): void {
                var exec = this.$Regex.argumentRegex.exec(expression),
                    haveArgs = !isNull(exec);

                if (isEmpty(expression)) {
                    return;
                }

                if (haveArgs) {
                    this._expression = [expression.slice(0, exec.index)]
                        .concat((exec[1] !== '') ? exec[1].split(',') : []);
                } else {
                    this._expression.push(expression);
                }

                this._aliases = this._findAliases(this._expression);
            }
        }

        /**
         * Describes an attribute object that deals with DOM events.
         */
        export interface ISimpleEventControl extends IAttributeControl {
            /**
             * The event name.
             */
            event: string;

            /**
             * The camel-cased name of the control as it appears as an attribute.
             */
            attribute: string;
        }

        export class Tap extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = '$tap';
        }

        export class Blur extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = 'blur';
        }

        export class Change extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = 'change';
        }

        export class Copy extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = 'copy';
        }

        export class Cut extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = 'cut';
        }

        export class Paste extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = 'paste';
        }

        export class DblTap extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = '$dbltap';
        }

        export class Focus extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = 'focus';
        }

        export class TouchStart extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = '$touchstart';
        }

        export class TouchEnd extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = '$touchend';
        }

        export class TouchMove extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = '$touchmove';
        }

        export class TouchCancel extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = '$touchcancel';
        }

        export class Hold extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = '$hold';
        }

        export class Release extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = '$release';
        }

        export class Swipe extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = '$swipe';
        }

        export class SwipeLeft extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = '$swipeleft';
        }

        export class SwipeRight extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = '$swiperight';
        }

        export class SwipeUp extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = '$swipeup';
        }

        export class SwipeDown extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = '$swipedown';
        }

        export class Track extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = '$track';
        }

        export class TrackLeft extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = '$trackleft';
        }

        export class TrackRight extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = '$trackright';
        }

        export class TrackUp extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = '$trackup';
        }

        export class TrackDown extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = '$trackdown';
        }

        export class Submit extends SimpleEventControl {
            /**
             * The event name.
             */
            event: string = 'submit';

            /**
             * Prevents the default submit action unless 
             * the "action" attribute is present.
             * 
             * @param ev The event object.
             */
            _onEvent(ev: Event): void {
                if (!this.element.hasAttribute('action')) {
                    ev.preventDefault();
                }

                super._onEvent(ev);
            }
        }

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

        // Keyboard events
        export var KeyCodes = {
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

        export class KeyCodeEventControl extends SimpleEventControl implements IKeyCodeEventControl {
            /**
             * An object keyed by keyCode with options as key values.
             */
            keyCodes: IObject<{ shifted?: boolean; }>;

            /**
             * Checks if the IKeyboardEventInput is an expression object 
             * and sets the necessary listener.
             */
            _setListener(): void {
                var attr = this.attribute;
                if (isEmpty(this.event) || isEmpty(attr)) {
                    return;
                }

                var expression = (<any>this.attributes)[attr].trim();
            
                if (expression[0] === '{') {
                    var eventObject: IKeyboardEventInput = this.evaluateExpression(expression) ||
                        { method: '', key: null },
                        key = eventObject.key,
                        keys = eventObject.keys;

                    this._parseArgs(eventObject.method);

                    if (isNull(key) && isNull(keys)) {
                        (<any>this.attributes)[attr] = eventObject.method;

                        this._setKeyCodes();
                        super._setListener();
                        return;
                    }

                    keys = isArray(keys) ? keys : [key];
                    this._setKeyCodes(keys);
                    this.addEventListener(this.element, this.event, this._listener, false);

                    return;
                }

                this._setKeyCodes();
                super._setListener();
            }

            /**
             * Matches the event's keyCode if necessary and then handles the event if 
             * a match is found or if there are no filter keyCodes.
             * 
             * @param ev The keyboard event object.
             */
            _onEvent(ev: KeyboardEvent): void {
                var keyCodes = this.keyCodes;

                if (isEmpty(keyCodes) || !isUndefined(keyCodes[ev.keyCode])) {
                    super._onEvent(ev);
                }
            }

            /**
             * Sets the defined key codes as they correspond to 
             * the KeyCodes map.
             * 
             * @param keys The array of defined keys to satisfy the 
             * key press condition.
             */
            _setKeyCodes(keys: Array<string> = []): void {
                var length = keys.length,
                    key: string,
                    keyCodes = this.keyCodes;

                if (!isArray(keyCodes)) {
                    keyCodes = this.keyCodes = {};
                }

                for (var i = 0; i < length; ++i) {
                    key = keys[i];

                    keyCodes[isNumber(key) ? key : (<any>KeyCodes)[key]] = {};
                }
            }
        }

        /**
         * Describes an attribute object that binds to specified key code scenarios.
         */
        export interface IKeyCodeEventControl extends ISimpleEventControl {
            /**
             * An object keyed by keyCode with options as key values.
             */
            keyCodes: IObject<{ shifted?: boolean; }>;
        }

        /**
         * The available options for plat.controls.KeyCodeEventControl.
         */
        export interface IKeyboardEventInput {
            /**
             * The method to call when the 
             * condition is satisfied.
             */
            method: string;

            /**
             * The key to satisfy the press 
             * condition. Can be specified 
             * either as a numeric key code 
             * or a string representation 
             * as seen by the KeyCodes mapping.
             */
            key?: string;

            /**
             * An optional array of keys 
             * if more than one key can 
             * satisfy the condition.
             */
            keys?: Array<string>;
        }

        export class KeyDown extends KeyCodeEventControl {
            /**
             * The event name.
             */
            event: string = 'keydown';
        }

        export class KeyPress extends KeyCodeEventControl {
            /**
             * The event name.
             */
            event: string = 'keydown';

            /**
             * Filters only 'printing keys' (a-z, 0-9, and special characters)
             * 
             * @param ev The keyboard event object.
             */
            _onEvent(ev: KeyboardEvent): void {
                var keyCode = ev.keyCode;

                if ((keyCode >= 48 && keyCode <= 90) ||
                    (keyCode >= 186) ||
                    (keyCode >= 96 && keyCode <= 111)) {
                    super._onEvent(ev);
                }
            }
        }

        export class KeyUp extends KeyCodeEventControl {
            /**
             * The event name.
             */
            event: string = 'keyup';
        }

        register.control(__KeyDown, KeyDown);
        register.control(__KeyPress, KeyPress);
        register.control(__KeyUp, KeyUp);

        /**
         * An AttributeControl that deals with binding to a specified property on its element.
         */
        export class SetAttributeControl extends AttributeControl implements ISetAttributeControl {
            /**
             * The corresponding attribute to set on the element.
             */
            property: string;

            /**
             * The camel-cased name of the control as it appears as an attribute.
             */
            attribute: string;

            /**
             * The function for removing the attribute changed listener.
             */
            private __removeListener: IRemoveListener;

            /**
             * Sets the corresponding attribute {property} value and 
             * observes the attribute for changes.
             */
            loaded(): void {
                if (isNull(this.element)) {
                    return;
                }

                this.attribute = camelCase(this.type);
                this.setter();
                this.__removeListener = this.attributes.observe(this.attribute, this.setter);
            }

            /**
             * Resets the corresponding attribute {property} value upon 
             * a change of context.
             */
            contextChanged(): void {
                if (isNull(this.element)) {
                    return;
                }

                this.setter();
            }

            /**
             * Stops listening to attribute changes.
             */
            dispose(): void {
                if (isFunction(this.__removeListener)) {
                    this.__removeListener();
                    this.__removeListener = null;
                }
            }

            /**
             * The function for setting the corresponding 
             * attribute {property} value.
             */
            setter(): void {
                var expression = (<any>this.attributes)[this.attribute];

                if (isEmpty(expression)) {
                    return;
                }

                postpone(() => {
                    if (!isNode(this.element)) {
                        return;
                    }

                    switch (expression) {
                        case 'false':
                        case '0':
                        case 'null':
                        case '':
                            this.element.setAttribute(this.property, '');
                            (<any>this.element)[this.property] = false;
                            this.element.removeAttribute(this.property);
                            break;
                        default:
                            this.element.setAttribute(this.property, this.property);
                            (<any>this.element)[this.property] = true;
                    }
                });
            }
        }

        /**
         * Describes an attribute object that deals with binding to a specified property.
         */
        export interface ISetAttributeControl extends IAttributeControl {
            /**
             * The corresponding attribute to set on the element.
             */
            property: string;

            /**
             * The camel-cased name of the control as it appears as an attribute.
             */
            attribute: string;

            /**
             * The function for setting the corresponding 
             * attribute {property} value.
             */
            setter(): void;
        }

        export class Checked extends SetAttributeControl {
            property: string = 'checked';
        }

        export class Disabled extends SetAttributeControl {
            property: string = 'disabled';
        }

        export class Selected extends SetAttributeControl {
            property: string = 'selected';
        }

        export class ReadOnly extends SetAttributeControl {
            property: string = 'readonly';
        }

        export class Visible extends SetAttributeControl {
            private __initialDisplay: string;
            /**
             * Obtains the initial visibility of the item 
             * based on it's initial display.
             */
            initialize(): void {
                var element = this.element;

                if (!isEmpty(element.style.display)) {
                    this.__initialDisplay = element.style.display;
                } else {
                    var $window = acquire(__Window);
                    this.__initialDisplay = $window.getComputedStyle(element).display;
                }

                if (this.__initialDisplay === 'none') {
                    this.__initialDisplay = '';
                }
            }

            /**
             * Evaluates boolean expression and sets the display.
             */
            setter(): void {
                var expression: string = (<any>this.attributes)[this.attribute],
                    style = this.element.style;

                switch (expression) {
                    case 'false':
                    case '0':
                    case 'null':
                    case '':
                        style.display = 'none';
                        break;
                    default:
                        style.display = this.__initialDisplay;
                }
            }
        }

        export class Style extends SetAttributeControl {
            /**
             * Sets the evaluated styles on the element.
             */
            setter(): void {
                var expression: string = (<any>this.attributes)[this.attribute];

                if (isEmpty(expression)) {
                    return;
                }

                var attributes = expression.split(';'),
                    elementStyle = this.element.style,
                    length = attributes.length,
                    splitStyles: Array<string>,
                    styleType: string,
                    styleValue: string;

                for (var i = 0; i < length; ++i) {
                    splitStyles = attributes[i].split(':');
                    if (splitStyles.length === 2) {
                        styleType = camelCase(splitStyles[0].trim());
                        styleValue = splitStyles[1].trim();

                        if (!isUndefined((<any>elementStyle)[styleType])) {
                            (<any>elementStyle)[styleType] = styleValue;
                        }
                    }
                }
            }
        }

        register.control(__Checked, Checked);
        register.control(__Disabled, Disabled);
        register.control(__Selected, Selected);
        register.control(__ReadOnly, ReadOnly);
        register.control(__Visible, Visible);
        register.control(__Style, Style);

        export class ElementPropertyControl extends SetAttributeControl {
            /**
             * The function for setting the corresponding 
             * attribute {property} value to the evaluated expression.
             */
            setter(): void {
                var element = this.element,
                    elementProperty = this.property,
                    expression = (<any>this.attributes)[this.attribute];

                if (isEmpty(expression) || isNull(element)) {
                    return;
                }

                if (!isUndefined((<any>element)[elementProperty])) {
                    (<any>element)[elementProperty] = expression;
                }
            }
        }

        export class Href extends ElementPropertyControl {
            /**
             * The corresponding attribute to set on the element.
             */
            property: string = 'href';
        }

        export class Src extends ElementPropertyControl {
            /**
             * The corresponding attribute to set on the element.
             */
            property: string = 'src';
        }

        register.control(__Href, Href);
        register.control(__Src, Src);

        export class Bind extends AttributeControl {
            $Parser: expressions.IParser = acquire(__Parser);
            $ContextManagerStatic: observable.IContextManagerStatic = acquire(__ContextManagerStatic);

            /**
             * The priority of Bind is set high to take precede 
             * other controls that may be listening to the same 
             * event.
             */
            priority: number = 100;

            /**
             * The function used to add the proper event based on the input type.
             */
            _addEventType: () => void;

            /**
             * The function used to get the bound value.
             */
            _getter: any;

            /**
             * The function used to set the bound value.
             */
            _setter: any;

            /**
             * The event listener attached to this element.
             */
            _eventListener: () => void;

            /**
             * The event listener as a postponed function.
             */
            _postponedEventListener: () => void;

            /**
             * The expression to evaluate as the bound value.
             */
            _expression: expressions.IParsedExpression;

            /**
             * The IParsedExpression used to evaluate the context 
             * of the bound property.
             */
            _contextExpression: expressions.IParsedExpression;

            /**
             * The bound property name.
             */
            _property: string;

            private __fileSupported = (<ICompat>acquire(__Compat)).fileSupported;
            private __fileNameRegex = (<expressions.IRegex>acquire(__Regex)).fileNameRegex;
            private __isSelf = false;

            /**
             * Determines the type of Element being bound to 
             * and sets the necessary handlers.
             */
            initialize(): void {
                this._determineType();
            }

            /**
             * Parses and watches the expression being bound to.
             */
            loaded(): void {
                if (isNull(this.parent) || isNull(this.element)) {
                    return;
                }

                var attr = camelCase(this.type),
                    expression = this._expression = this.$Parser.parse((<any>this.attributes)[attr]);

                var identifiers = expression.identifiers;

                if (identifiers.length !== 1) {
                    var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                    $exception.warn('Only 1 identifier allowed in a plat-bind expression', $exception.BIND);
                    this._contextExpression = null;
                    return;
                }

                var split = identifiers[0].split('.');

                this._property = split.pop();

                if (split.length > 0) {
                    this._contextExpression = this.$Parser.parse(split.join('.'));
                } else if (expression.aliases.length > 0) {
                    var alias = expression.aliases[0],
                        resourceObj = this.parent.findResource(alias);

                    if (isNull(resourceObj) || resourceObj.resource.type !== 'observable') {
                        return;
                    }

                    this._property = 'value';

                    this._contextExpression = {
                        evaluate: () => {
                            return resourceObj.resource;
                        },
                        aliases: [],
                        identifiers: [],
                        expression: ''
                    };
                } else {
                    this._contextExpression = {
                        evaluate: () => {
                            return this.parent.context;
                        },
                        aliases: [],
                        identifiers: [],
                        expression: ''
                    };
                }

                this._watchExpression();

                if (isNull(this._addEventType)) {
                    return;
                }

                this._addEventType();
            }

            /**
             * Re-observes the expression with the new context.
             */
            contextChanged(): void {
                this._watchExpression();
            }

            /**
             * Removes all of the element's event listeners.
             */
            dispose(): void {
                this._eventListener = null;
                this._postponedEventListener = null;
                this._addEventType = null;
            }

            /**
             * Adds a text event as the event listener. 
             * Used for textarea and input[type=text].
             */
            _addTextEventListener(): void {
                var composing = false,
                    timeout: IRemoveListener;

                this._eventListener = () => {
                    if (composing) {
                        return;
                    }

                    this._propertyChanged();
                };

                this._postponedEventListener = () => {
                    if (!!timeout) {
                        return;
                    }

                    timeout = postpone(() => {
                        this._eventListener();
                        timeout = null;
                    });
                };

                this._addEventListener('compositionstart', () => composing = true);

                this._addEventListener('compositionend', () => composing = false);

                this._addEventListener('keydown', (ev?: KeyboardEvent) => {
                    var key = ev.keyCode,
                        codes = KeyCodes;

                    if (key === codes.lwk ||
                        key === codes.rwk ||
                        (key > 15 && key < 28) ||
                        (key > 32 && key < 41)) {
                        return;
                    }

                    this._postponedEventListener();
                });
                this._addEventListener('cut', null, true);
                this._addEventListener('paste', null, true);
                this._addEventListener('change');
            }

            /**
             * Adds a change event as the event listener. 
             * Used for select, input[type=radio], and input[type=range].
             */
            _addChangeEventListener(): void {
                this._eventListener = this._propertyChanged.bind(this);
                this._addEventListener('change');
            }

            /**
             * Adds the event listener to the element.
             * 
             * @param event The event type
             * @param listener The event listener
             * @param postpone Whether or not to postpone the event listener
             */
            _addEventListener(event: string, listener?: () => void, postpone?: boolean): void {
                var listener = listener ||
                    (!!postpone ? this._postponedEventListener : this._eventListener);

                this.addEventListener(this.element, event, listener, false);
            }

            /**
             * Getter for input[type=checkbox] and input[type=radio]
             */
            _getChecked(): boolean {
                return (<HTMLInputElement>this.element).checked;
            }

            /**
             * Getter for input[type=text], input[type=range], 
             * textarea, and select.
             */
            _getValue(): string {
                return (<HTMLInputElement>this.element).value;
            }

            /**
             * Getter for input[type="file"]. Creates a partial IFile 
             * element if file is not supported.
             */
            _getFile(): IFile {
                var element = <HTMLInputElement>this.element,
                    value = element.value;

                if (this.__fileSupported && element.files.length > 0) {
                    return <IFile>element.files[0];
                }

                return {
                    name: value.replace(this.__fileNameRegex, ''),
                    path: value,
                    lastModifiedDate: undefined,
                    type: undefined,
                    size: undefined,
                    msDetachStream: noop,
                    msClose: noop,
                    slice: () => <Blob>{ }
                };
            }

            /**
             * Getter for input[type="file"]-multiple
             */
            _getFiles(): Array<IFile> {
                var element = <HTMLInputElement>this.element;

                if (this.__fileSupported) {
                    return Array.prototype.slice.call(element.files);
                }

                // this case should never be hit since ie9 does not support multi-file uploads, 
                // but kept in here for now for consistency's sake
                var filelist = element.value.split(/,|;/g),
                    length = filelist.length,
                    files: Array<IFile> = [],
                    fileValue: string;

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
                        slice: () => <Blob>{}
                    });
                }

                return files;
            }

            /**
             * Getter for select-multiple
             */
            _getSelectedValues(): Array<string> {
                var options = (<HTMLSelectElement>this.element).options,
                    length = options.length,
                    option: HTMLOptionElement,
                    selectedValues: Array<string> = [];

                for (var i = 0; i < length; ++i) {
                    option = options[i];
                    if (option.selected) {
                        selectedValues.push(option.value);
                    }
                }

                return selectedValues;
            }

            /**
             * Setter for textarea, input[type=text], 
             * and input[type=button], and select
             * 
             * @param newValue The new value to set
             */
            _setText(newValue: any): void {
                if (this.__isSelf) {
                    return;
                }

                if (isNull(newValue)) {
                    var element = <HTMLInputElement>this.element;
                    if (isNull(element.value)) {
                        newValue = '';
                    } else {
                        this._propertyChanged();
                        return;
                    }
                }

                this.__setValue(newValue);
            }

            /**
             * Setter for input[type=range]
             * 
             * @param newValue The new value to set
             */
            _setRange(newValue: any): void {
                if (this.__isSelf) {
                    return;
                }

                if (isEmpty(newValue)) {
                    var element = <HTMLInputElement>this.element;
                    if (isEmpty(element.value)) {
                        newValue = 0;
                    } else {
                        this._propertyChanged();
                        return;
                    }
                }

                this.__setValue(newValue);
            }

            /**
             * Setter for input[type=checkbox] and input[type=radio]
             * 
             * @param newValue The new value to set
             */
            _setChecked(newValue: any): void {
                if (this.__isSelf) {
                    return;
                } else if (!isBoolean(newValue)) {
                    this._propertyChanged();
                    return;
                }

                (<HTMLInputElement>this.element).checked = newValue;
            }

            /**
             * Setter for select
             * 
             * @param newValue The new value to set
             */
            _setSelectedIndex(newValue: any): void {
                if (this.__isSelf) {
                    return;
                }

                var element = <HTMLSelectElement>this.element;
                if (isNull(newValue)) {
                    if (isEmpty(element.value)) {
                        element.selectedIndex = -1;
                    }

                    this._propertyChanged();
                    return;
                } else if (element.value === newValue) {
                    return;
                } else if (newValue === '') {
                    element.selectedIndex = -1;
                    return;
                }

                element.value = newValue;
                // check to make sure the user changed to a valid value
                if (element.value !== newValue) {
                    element.selectedIndex = -1;
                }
            }

            /**
             * Setter for select-multiple
             * 
             * @param newValue The new value to set
             */
            _setSelectedIndices(newValue: any): void {
                if (this.__isSelf) {
                    return;
                }

                var options = (<HTMLSelectElement>this.element).options,
                    length = options.length,
                    option: HTMLOptionElement;

                if (isNull(newValue) || !isArray(newValue)) {
                    // unselects the options unless a match is found
                    while (length-- > 0) {
                        option = options[length];
                        // purposely doing a soft equality match
                        if (option.value === '' + newValue) {
                            option.selected = true;
                            return;
                        }

                        option.selected = false;
                    }
                    return;
                }

                var value: any,
                    numberValue: number;
                while (length-- > 0) {
                    option = options[length];
                    value = option.value,
                    numberValue = Number(value);

                    if (newValue.indexOf(value) !== -1 || (isNumber(numberValue) && newValue.indexOf(numberValue) !== -1)) {
                        option.selected = true;
                        continue;
                    }

                    option.selected = false;
                }
            }

            /**
             * Determines the type of Element being bound to 
             * and sets the necessary handlers.
             */
            _determineType(): void {
                var element = this.element;

                if (isNull(element)) {
                    return;
                }

                switch (element.nodeName.toLowerCase()) {
                    case 'textarea':
                        this._addEventType = this._addTextEventListener;
                        this._getter = this._getValue;
                        this._setter = this._setText;
                        break;
                    case 'input':
                        switch ((<HTMLInputElement>element).type) {
                            case 'button':
                                this._setter = this._setText;
                                break;
                            case 'checkbox':
                            case 'radio':
                                this._addEventType = this._addChangeEventListener;
                                this._getter = this._getChecked;
                                this._setter = this._setChecked;
                                break;
                            case 'range':
                                this._addEventType = this._addChangeEventListener;
                                this._getter = this._getValue;
                                this._setter = this._setRange;
                                break;
                            case 'file':
                                var multi = (<HTMLInputElement>element).multiple;
                                this._addEventType = this._addChangeEventListener;
                                this._getter = multi ? this._getFiles : this._getFile;
                                break;
                            default:
                                this._addEventType = this._addTextEventListener;
                                this._getter = this._getValue;
                                this._setter = this._setText;
                                break;
                        }
                        break;
                    case 'select':
                        var multiple = (<HTMLSelectElement>element).multiple,
                            options = (<HTMLSelectElement>element).options,
                            length = options.length,
                            option: HTMLSelectElement;

                        this._addEventType = this._addChangeEventListener;
                        if (multiple) {
                            this._getter = this._getSelectedValues;
                            this._setter = this._setSelectedIndices;
                        } else {
                            this._getter = this._getValue;
                            this._setter = this._setSelectedIndex;
                        }

                        for (var i = 0; i < length; ++i) {
                            option = options[i];
                            if (!option.hasAttribute('value')) {
                                option.setAttribute('value', option.textContent);
                            }
                        }
                        break;
                }
            }

            /**
             * Observes the expression to bind to.
             */
            _watchExpression(): void {
                var contextExpression = this._contextExpression,
                    context = this.evaluateExpression(contextExpression);

                if (isNull(context) && contextExpression.identifiers.length > 0) {
                    context = this.$ContextManagerStatic.createContext(this.parent,
                        contextExpression.identifiers[0]);
                }

                if (!isFunction(this._setter)) {
                    return;
                } else if (this._setter === this._setSelectedIndices) {
                    var property = this._property;
                    if (isNull(context[property])) {
                        context[property] = [];
                    }
                    this.observeArray(context, property, (arrayInfo: observable.IArrayMethodInfo<string>) => {
                        this._setter(arrayInfo.newArray);
                    });
                }

                var expression = this._expression;

                this.observeExpression(expression, this._setter);
                this._setter(this.evaluateExpression(expression));
            }

            /**
             * Sets the context property being bound to when the 
             * element's property is changed.
             */
            _propertyChanged(): void {
                if (isNull(this._contextExpression)) {
                    return;
                }

                var context = this.evaluateExpression(this._contextExpression),
                    property = this._property;

                var newValue = this._getter();

                if (isNull(context) || context[property] === newValue) {
                    return;
                }

                // set flag to let setter functions know we changed the property
                this.__isSelf = true;
                context[property] = newValue;
                this.__isSelf = false;
            }

            private __setValue(newValue: any): void {
                var element = <HTMLInputElement>this.element;
                if (element.value === newValue) {
                    return;
                }

                element.value = newValue;
            }
        }

        register.control(__Bind, Bind);

        /**
         * A file interface for browsers that do not support the 
         * File API.
         */
        export interface IFile extends File {
            /**
             * An absolute path to the file. The property is not added supported to 
             * File types.
             */
            path?: string;
        }

        /**
         * An AttributeControl that deals with observing changes for a specified property.
         */
        export class ObservableAttributeControl extends AttributeControl implements IObservableAttributeControl {
            $ContextManagerStatic: observable.IContextManagerStatic = acquire(__ContextManagerStatic);

            /**
             * The property to set on the associated template control.
             */
            property: string = '';

            /**
             * The camel-cased name of the control as it appears as an attribute.
             */
            attribute: string;

            /**
             * The set of functions added by the Template Control that listens 
             * for property changes.
             */
            _listeners: Array<(newValue: any, oldValue: any) => void> = [];

            /**
             * A function for adding listeners.
             */
            _boundAddListener: (listener: (newValue: any, oldValue: any) => void) => IRemoveListener;

            /**
             * The function to stop listening for property changes.
             */
            _removeListener: IRemoveListener;

            /**
             * Sets the initial value of the property on 
             * the Template Control.
             */
            initialize(): void {
                this.attribute = camelCase(this.type);
                this._boundAddListener = this._addListener.bind(this);
                this._setProperty(this._getValue());
            }

            /**
             * Observes the property and resets the value.
             */
            loaded(): void {
                this._observeProperty();
                this._setProperty(this._getValue());
            }

            /**
             * Stops listening for changes to the evaluated 
             * expression and removes references to the listeners 
             * defined by the Template Control.
             */
            dispose(): void {
                if (isFunction(this._removeListener)) {
                    this._removeListener();
                }

                this._listeners = [];
            }

            /**
             * Sets the property on the Template Control.
             * 
             * @param value The new value of the evaluated expression.
             * @param oldValue The old value of the evaluated expression.
             */
            _setProperty(value: any, oldValue?: any): void {
                var templateControl = this.templateControl;

                if (isNull(templateControl)) {
                    return;
                }

                this.$ContextManagerStatic.defineGetter(templateControl, this.property, <observable.IObservableProperty<any>>{
                    value: value,
                    observe: this._boundAddListener
                }, true, true);
                this._callListeners(value, oldValue);
            }

            /**
             * Calls the listeners defined by the Template Control.
             * 
             * @param value The new value of the evaluated expression.
             * @param oldValue The old value of the evaluated expression.
             */
            _callListeners(newValue: any, oldValue: any): void {
                var listeners = this._listeners,
                    length = listeners.length,
                    templateControl = this.templateControl;

                for (var i = 0; i < length; ++i) {
                    listeners[i].call(templateControl, newValue, oldValue);
                }
            }

            /**
             * Adds a listener as defined by the Template Control.
             * 
             * @param listener The listener added by the Template Control.
             */
            _addListener(listener: (newValue: any, oldValue: any) => void): IRemoveListener {
                var listeners = this._listeners,
                    index = listeners.length;

                listeners.push(listener);

                return function removeListener() {
                    listeners.splice(index, 1);
                };
            }

            /**
             * Evaluates the attribute's value.
             */
            _getValue(): any {
                var expression = (<any>this.attributes)[this.attribute],
                    templateControl = this.templateControl;

                if (isNull(templateControl)) {
                    return;
                }

                return this.evaluateExpression(expression);
            }

            /**
             * Observes the attribute's value.
             */
            _observeProperty(): void {
                var expression = (<any>this.attributes)[this.attribute],
                    templateControl = this.templateControl,
                    parent = this.parent;

                if (isNull(templateControl)) {
                    return;
                }

                this._removeListener = this.observeExpression(expression, this._setProperty);
            }
        }

        /**
         * Describes an attribute object that deals with observing changes for a specified property.
         */
        export interface IObservableAttributeControl extends IAttributeControl {
            /**
             * The property to set on the associated template control.
             */
            property: string;
        }

        export class Options extends ObservableAttributeControl {
            /**
             * The property to set on the associated template control.
             */
            property: string = 'options';
        }

        register.control(__Options, Options);
    }
    export module ui {
        /**
         * TemplateControls are the base control for any UIControl. They provide properties for the control to use
         * to manage its body HTML.
         */
        export class TemplateControl extends Control implements ITemplateControl {
            static $ResourcesFactory: IResourcesFactory;
            static $BindableTemplatesFactory: IBindableTemplatesFactory;
            static $ManagerCache: storage.ICache<processing.IElementManager>;
            static $TemplateCache: storage.ITemplateCache;
            static $Parser: expressions.IParser;
            static $Http: async.IHttp;
            static $Promise: async.IPromise;

            /**
             * Evaluates an expression string with a given control and optional context.
             * 
             * @param expression The expression string (e.g. 'foo + foo').
             * @param control The control used for evaluation context.
             * @param aliases An optional alias object containing resource alias values
             */
            static evaluateExpression(expression: string, control?: ITemplateControl, aliases?: any): any;
            /**
             * Evaluates a parsed expression with a given control and optional context.
             * 
             * @param expression An IParsedExpression created using the plat.expressions.IParser injectable.
             * @param control The control used for evaluation context.
             * @param aliases An optional alias object containing resource alias values
             */
            static evaluateExpression(expression: expressions.IParsedExpression, control?: ITemplateControl, aliases?: any): any;
            static evaluateExpression(expression: any, control?: ITemplateControl, aliases?: any) {
                if (isNull(expression)) {
                    return;
                } else if (!(isString(expression) || isFunction(expression.evaluate))) {
                    return;
                }

                expression = isString(expression) ? TemplateControl.$Parser.parse(expression) : expression;

                if (isNull(control)) {
                    return expression.evaluate(null, aliases);
                }

                if (expression.aliases.length > 0) {
                    aliases = TemplateControl.getResources(control, expression.aliases, aliases);
                }

                return expression.evaluate(control.context, aliases);
            }

            /**
             * Given a control and Array of aliases, finds the associated resources and builds a context object containing
             * the values. Returns the object.
             * 
             * @param control The control used as the starting point for finding resources.
             * @param aliases An array of aliases to search for.
             * @param resources An optional resources object to extend, if no resources object is passed in a new one will be created.
             */
            static getResources(control: ITemplateControl, aliases: Array<string>, resources?: any): IObject<any> {
                if (isNull(control)) {
                    return {};
                }

                var length = aliases.length,
                    alias: string,
                    resourceObj: {
                        control: ITemplateControl;
                        resource: IResource;
                    },
                    cache = TemplateControl.__resourceCache[control.uid];

                if (isNull(cache)) {
                    cache = TemplateControl.__resourceCache[control.uid] = {};
                }

                resources = resources || {};

                for (var i = 0; i < length; ++i) {
                    alias = aliases[i];

                    if (alias[0] === '@') {
                        alias = alias.substr(1);
                    }

                    if (!isNull(resources[alias])) {
                        continue;
                    } else if (!isNull(cache[alias])) {
                        var resourceControl = cache[alias].control,
                            controlResources = resourceControl.resources;

                        if (isNull(controlResources)) {
                            resourceObj = TemplateControl.findResource(control, alias);
                        } else {
                            resourceObj = {
                                control: resourceControl,
                                resource: controlResources[alias]
                            };
                        }
                    } else {
                        resourceObj = TemplateControl.findResource(control, alias);
                    }

                    if (isNull(resourceObj)) {
                        var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                        $exception.warn('Attempting to use a resource that is not defined.', $exception.CONTEXT);
                        continue;
                    }

                    cache[alias] = resourceObj;
                    resources['@' + alias] = isNull(resourceObj.resource) ? resourceObj.resource : resourceObj.resource.value;
                }

                return resources;
            }

            /**
             * Starts at a control and searches up its parent chain for a particular resource alias. 
             * If the resource is found, it will be returned along with the control instance on which
             * the resource was found.
             * 
             * @param control The control on which to start searching for the resource alias.
             * @param alias The alias to search for.
             */
            static findResource(control: ITemplateControl, alias: string): { resource: IResource; control: ITemplateControl; } {
                var resource: IResource;

                if (isNull(control) || isNull(control.resources) || !isString(alias) || isEmpty(alias)) {
                    return null;
                }

                if (alias[0] === '@') {
                    alias = alias.substr(1);
                }

                if (alias === 'rootContext') {
                    control = Control.getRootControl(control);
                    return {
                        resource: (<any>control.resources)[alias],
                        control: control
                    };
                } else if (alias === 'context' || alias === 'control') {
                    return {
                        resource: (<any>control.resources)[alias],
                        control: control
                    };
                }

                while (!isNull(control)) {
                    resource = (<any>control.resources)[alias];
                    if (!isNull(resource)) {
                        return {
                            resource: resource,
                            control: control
                        };
                    }
                    control = control.parent;
                }
            }

            /**
             * Recursively disposes a control and its children.
             * @static
             * @param control A control to dispose.
             */
            static dispose(control: ITemplateControl): void {
                if (isNull(control)) {
                    return;
                }

                var parent = control.parent,
                    uid = control.uid,
                    controls = (control.controls && control.controls.slice(0)),
                    ContextManager = Control.$ContextManagerStatic,
                    define = ContextManager.defineProperty;

                if (!isNull(controls)) {
                    var length = controls.length - 1;

                    for (var i = length; i >= 0; --i) {
                        Control.dispose(controls[i]);
                    }
                }

                if (isFunction(control.dispose)) {
                    control.dispose();
                }

                Control.removeEventListeners(control);
                TemplateControl.removeElement(control);

                TemplateControl.$ResourcesFactory.dispose(control);
                TemplateControl.$BindableTemplatesFactory.dispose(control);

                TemplateControl.__resourceCache[control.uid] = null;
                delete TemplateControl.__resourceCache[control.uid];

                ContextManager.dispose(control);
                events.EventManager.dispose(control.uid);

                TemplateControl.$ManagerCache.remove(uid);
                Control.removeParent(control);

                define(control, 'context', null, true, true);
                define(control, 'resources', null, true, true);
                control.attributes = null;
                control.bindableTemplates = null;
                control.controls = [];
                control.root = null;
                control.innerTemplate = null;
            }
        
            /**
             * Loads the control tree depth first (visit children, then visit self).
             * 
             * @static
             * @param control The control serving as the root control to load.
             */
            static loadControl(control: ITemplateControl) {
                var children = control.controls,
                    length = children.length,
                    child: ITemplateControl;

                for (var i = 0; i < length; ++i) {
                    child = <ITemplateControl>children[i];
                    if (!isNull(child.controls)) {
                        TemplateControl.loadControl(child);
                    } else {
                        child.loaded();
                    }
                }
            
                control.loaded();
            }

            /**
             * Notifies a control that its context has been changed by 
             * calling the control.contextChanged method if it exists.
             * 
             * @param control The control whose context changed.
             * @param newValue The new value of the control's context.
             * @param oldValue The old value of the control's context.
             */
            static contextChanged(control: IControl, newValue: any, oldValue: any): void;
            static contextChanged(control: ITemplateControl, newValue: any, oldValue: any) {
                control.context = newValue;

                TemplateControl.setContextResources(control);

                if (isFunction(control.contextChanged)) {
                    control.contextChanged(newValue, oldValue);
                }
            }

            /**
             * Sets the 'context' resource value on a template control. If the control specifies
             * hasOwnContext, the 'rootContext' resource value will be set.
             * 
             * @param control The control whose context resources will be set.
             */
            static setContextResources(control: ITemplateControl): void {
                var value = control.context;

                if (isNull(control.resources)) {
                    control.resources = TemplateControl.$ResourcesFactory.getInstance();
                    control.resources.initialize(control);
                }

                if (control.hasOwnContext) {
                    if (isNull((<any>control.resources).rootContext)) {
                        control.resources.add({
                            root: {
                                type: 'observable',
                                value: value
                            }
                        });
                    } else {
                        (<any>control.resources).rootContext.value = value;
                    }
                }

                if (isNull((<any>control.resources).context)) {
                    control.resources.add({
                        context: {
                            type: 'observable',
                            value: value
                        }
                    });

                    return;
                }

                (<any>control.resources).context.value = value;
            }

            /**
             * Completely removes a control's element from its parentNode. If the 
             * control implements replaceWith=null, All of its nodes between its 
             * startNode and endNode (inclusive) will be removed.
             * 
             * @param control The control whose element should be removed.
             */
            static removeElement(control: ITemplateControl): void {
                if (isNull(control)) {
                    return;
                }

                var dom = control.dom,
                    element = control.element,
                    parentNode: Node;

                if (control.replaceWith === null ||
                control.replaceWith === '' ||
                isDocumentFragment(element)) {
                    dom.removeAll(control.startNode, control.endNode);
                    control.elementNodes = control.startNode = control.endNode = null;
                    return;
                } else if (isNull(element)) {
                    return;
                }

                parentNode = element.parentNode;

                if (!isNull(parentNode)) {
                    parentNode.removeChild(element);
                }

                control.element = null;
            }

            /**
             * Sets the absoluteContextPath read-only property on a control.
             * 
             * @param control The control on which to set the absoluteContextPath.
             * @param path The path to set on the control.
             */
            static setAbsoluteContextPath(control: ITemplateControl, path: string): void {
                Control.$ContextManagerStatic.defineGetter(control, 'absoluteContextPath', path, false, true);
            }

            /**
             * Determines the template for a control by searching for a templateUrl, 
             * using the provided templateUrl, or serializing the control's templateString.
             */
            static determineTemplate(control: ITemplateControl, templateUrl?: string): async.IThenable<DocumentFragment> {
                var template: any,
                    templateCache = TemplateControl.$TemplateCache,
                    dom = control.dom,
                    Promise = TemplateControl.$Promise;

                if (!isNull(templateUrl)) {
                    // do nothing
                } else if (!isNull(control.templateUrl)) {
                    templateUrl = control.templateUrl;
                } else if (!isNull(control.templateString)) {
                    var type = control.type;

                    return templateCache.read(type).catch((template: any) => {
                        if (isNull(template)) {
                            template = dom.serializeHtml(control.templateString);
                    }

                    return templateCache.put(type, template);
                    });
                } else {
                    return <any>Promise.reject(null);
                }

                template = templateCache.read(templateUrl);

                var $exception: IExceptionStatic;
                return Promise.cast<DocumentFragment>(template).catch((error) => {
                    if (isNull(error)) {
                        return TemplateControl.$Http.ajax<string>({ url: templateUrl });
                    }
                }).then<DocumentFragment>((success) => {
                    if (isDocumentFragment(success)) {
                        return Promise.resolve(<DocumentFragment>(<any>success));
                    } else if (!isObject(success) || !isString(success.response)) {
                        $exception = acquire(__ExceptionStatic);
                        $exception.warn('No template found at ' + templateUrl, $exception.AJAX);
                        return Promise.resolve(dom.serializeHtml());
                    }

                    var templateString = success.response;

                    if (isEmpty(templateString.trim())) {
                        return Promise.resolve(dom.serializeHtml());
                    }

                    template = dom.serializeHtml(templateString);

                    return templateCache.put(templateUrl, template);
                }).catch((error) => {
                    postpone(() => {
                        $exception = acquire(__ExceptionStatic);
                        $exception.fatal('Failure to get template from ' + templateUrl + '.',
                            $exception.TEMPLATE);
                    });
                    return error;
                });
            }

            /**
             * Detaches a TemplateControl. Disposes its children, but does not dispose the TemplateControl.
             *  
             * @static
             * @param control The control to be detached.
             */
            static detach(control: ITemplateControl): void {
                if (isNull(control) || isNull(control.controls)) {
                    return;
                }

                var controls = control.controls.slice(0),
                    length = controls.length;

                for (var i = 0; i < length; ++i) {
                    Control.dispose(controls[i]);
                }

                TemplateControl.removeElement(control);

                TemplateControl.$ResourcesFactory.dispose(control, true);

                TemplateControl.__resourceCache[control.uid] = null;
                delete TemplateControl.__resourceCache[control.uid];

                Control.$ContextManagerStatic.dispose(control, true);
                events.EventManager.dispose(control.uid);

                TemplateControl.$ManagerCache.remove(control.uid);
                Control.removeParent(control);

                control.controls = [];
                control.attributes = null;
            }

            /**
             * Returns a new instance of TemplateControl.
             * 
             * @static
             */
            static getInstance(): ITemplateControl {
                return new TemplateControl();
            }

            private static __resourceCache: any = {};

            absoluteContextPath: string = null;
            context: any = null;
            resources: IResources;
            hasOwnContext: boolean = false;
            templateString: string;
            templateUrl: string;
            innerTemplate: DocumentFragment;
            bindableTemplates: IBindableTemplates;
            controls: Array<IControl>;
            elementNodes: Array<Node>;
            startNode: Node;
            endNode: Node;
            replaceWith = 'div';
            root: ITemplateControl;

            contextChanged(): void { }

            setTemplate(): void { }

            getIdentifier(context: any): string {
                var queue: Array<{ context: any; identifier: string; }> = [],
                    dataContext = this.context,
                    found = false,
                    obj = {
                        context: dataContext,
                        identifier: ''
                    },
                    length: number,
                    keys: Array<string>,
                    key: string,
                    newObj: any;

                if (dataContext === context) {
                    found = true;
                } else {
                    queue.push(obj);
                }

                while (queue.length > 0) {
                    obj = queue.pop();

                    if (!isObject(obj.context)) {
                        continue;
                    }

                    keys = Object.keys(obj.context);
                    length = keys.length;

                    for (var i = 0; i < length; ++i) {
                        key = keys[i];
                        newObj = obj.context[key];

                        if (newObj === context) {
                            return (obj.identifier !== '') ? (obj.identifier + '.' + key) : key;
                        }

                        queue.push({
                            context: newObj,
                            identifier: (obj.identifier !== '') ? (obj.identifier + '.' + key) : key
                        });
                    }
                }
                if (!found) {
                    return;
                }

                return obj.identifier;
            }

            getAbsoluteIdentifier(context: any): string {
                if (context === this.context) {
                    return this.absoluteContextPath;
                }

                var localIdentifier = this.getIdentifier(context);
                if (isNull(localIdentifier)) {
                    return localIdentifier;
                }

                return this.absoluteContextPath + '.' + localIdentifier;
            }

            getResources(aliases: Array<string>, resources?: any): IObject<any> {
                return TemplateControl.getResources(this, aliases, resources);
            }

            findResource(alias: string): { resource: IResource; control: ITemplateControl; } {
                return TemplateControl.findResource(this, alias);
            }

            evaluateExpression(expression: string, context?: any): any;
            evaluateExpression(expression: expressions.IParsedExpression, context?: any): any;
            evaluateExpression(expression: any, context?: any) {
                return TemplateControl.evaluateExpression(expression, this, context);
            }
        }

        /**
         * The Type for referencing the '$TemplateControlFactory' injectable as a dependency.
         */
        export function ITemplateControlFactory(
            $ResourcesFactory?: IResourcesFactory,
            $BindableTemplatesFactory?: IBindableTemplatesFactory,
            $ManagerCache?: storage.ICache<processing.IElementManager>,
            $TemplateCache?: storage.ITemplateCache,
            $Parser?: expressions.IParser,
            $Http?: async.IHttp,
            $Promise?: async.IPromise): ITemplateControlFactory {
                TemplateControl.$ResourcesFactory = $ResourcesFactory;
                TemplateControl.$BindableTemplatesFactory = $BindableTemplatesFactory;
                TemplateControl.$ManagerCache = $ManagerCache;
                TemplateControl.$TemplateCache = $TemplateCache;
                TemplateControl.$Parser = $Parser;
                TemplateControl.$Http = $Http;
                TemplateControl.$Promise = $Promise;
                return TemplateControl;
        }

        register.injectable(__TemplateControlFactory, ITemplateControlFactory, [
            __ResourcesFactory,
            __BindableTemplatesFactory,
            __ManagerCache,
            __TemplateCache,
            __Parser,
            __Http,
            __Promise
        ], register.FACTORY);

        /**
         * Creates and manages ITemplateControls.
         */
        export interface ITemplateControlFactory {
            /**
             * Evaluates an expression string with a given control and optional context.
             *
             * @param expression The expression string (e.g. 'foo + foo').
             * @param control The control used for evaluation context.
             * @param aliases An optional alias object containing resource alias values
             */
            evaluateExpression(expression: string, control?: ITemplateControl, aliases?: any): any;
            /**
             * Evaluates a parsed expression with a given control and optional context.
             *
             * @param expression An IParsedExpression created using the plat.expressions.IParser injectable.
             * @param control The control used for evaluation context.
             * @param aliases An optional alias object containing resource alias values
             */
            evaluateExpression(expression: expressions.IParsedExpression, control?: ITemplateControl, aliases?: any): any;

            /**
             * Given a control and Array of aliases, finds the associated resources and builds a context object containing
             * the values. Returns the object.
             *
             * @param control The control used as the starting point for finding resources.
             * @param aliases An array of aliases to search for.
             * @param resources An optional resources object to extend, if no resources object is passed in a new one will be created.
             */
            getResources(control: ITemplateControl, aliases: Array<string>, resources?: any): IObject<any>;

            /**
             * Starts at a control and searches up its parent chain for a particular resource alias.
             * If the resource is found, it will be returned along with the control instance on which
             * the resource was found.
             *
             * @param control The control on which to start searching for the resource alias.
             * @param alias The alias to search for.
             */
            findResource(control: ITemplateControl, alias: string): { resource: IResource; control: ITemplateControl; };

            /**
             * Recursively disposes a control and its children.
             * @param control A control to dispose.
             */
            dispose(control: ITemplateControl): void;

            /**
             * Loads the control tree depth first (visit children, then visit self).
             *
             * @param control The control serving as the root control to load.
             */
            loadControl(control: ITemplateControl): void;

            /**
             * Notifies a control that its context has been changed by
             * calling the control.contextChanged method if it exists.
             *
             * @param control The control whose context changed.
             * @param newValue The new value of the control's context.
             * @param oldValue The old value of the control's context.
             */
            contextChanged(control: IControl, newValue: any, oldValue: any): void;

            /**
             * Sets the 'context' resource value on a template control. If the control specifies
             * hasOwnContext, the 'rootContext' resource value will be set.
             *
             * @param control The control whose context resources will be set.
             */
            setContextResources(control: ITemplateControl): void;

            /**
             * Completely removes a control's element from its parentNode. If the
             * control implements replaceWith=null, All of its nodes between its
             * startNode and endNode (inclusive) will be removed.
             *
             * @param control The control whose element should be removed.
             */
            removeElement(control: ITemplateControl): void;

            /**
             * Sets the absoluteContextPath read-only property on a control.
             * 
             * @param control The control on which to set the absoluteContextPath.
             * @param path The path to set on the control.
             */
            setAbsoluteContextPath(control: ITemplateControl, path: string): void;

            /**
             * Determines the template for a control by searching for a templateUrl, 
             * using the provided templateUrl, or serializing the control's templateString.
             */
            determineTemplate(control: ITemplateControl, templateUrl?: string): async.IThenable<DocumentFragment>;

            /**
             * Detaches a TemplateControl. Disposes its children, but does not dispose the TemplateControl.
             *
             * @param control The control to be detached.
             */
            detach(control: ITemplateControl): void;

            /**
             * Returns a new instance of TemplateControl.
             *
             * @static
             */
            getInstance(): ITemplateControl;
        }

        /**
         * Describes a control which provides properties and methods for managing its body HTML.
         */
        export interface ITemplateControl extends IControl {
            /**
             * The context of an ITemplateControl, used for inheritance and data-binding.
             */
            context?: any;

            /**
             * Resources are used for providing aliases to use in markup expressions. They 
             * are particularly useful when trying to access properties outside of the 
             * current context, as well as reassigning context at any point in an app.
             * 
             * By default, every control has a resource for '@control' and '@context'.
             * IViewControl objects also have a resource for '@root' and '@rootContext', which is a reference
             * to their root control and root context.
             * 
             * Resources can be created in HTML, or through the exposed control.resources 
             * object. If specified in HTML, they must be the first element child of the 
             * control upon which the resources will be placed. IViewControls that use a 
             * templateUrl can have resources as their first element in the templateUrl.
             * 
             * @example
             * <custom-control>
             *     <plat-resources>
             *         <injectable alias="Cache">$CacheFactory</injectable>
             *         <observable alias="testObj">
             *              { 
             *                  foo: 'foo', 
             *                  bar: 'bar', 
             *                  baz: 2 
             *              }
             *         </observable>
             *     </plat-resources>
             * </custom-control>
             * 
             * In the above example, the resources can be accessed by using '@Cache' and '@testObj'.
             * The type of resource is denoted by the element name.
             * 
             * Only resources of type 'observable' will have data binding. The types of resources are:
             * function, injectable, observable, and object. Resources of type 'function' will have their
             * associated function context bound to the control that contains the resource.
             * 
             * When an alias is found in a markup expression, the framework will search up the control chain 
             * to find the alias on a control's resources. This first matching alias will be used.
             */
            resources?: IResources;

            /**
             * Flag indicating whether or not the ITemplateControl defines the context property.
             */
            hasOwnContext?: boolean;

            /**
             * Specifies the absolute path from where the context was created to this IControl's context.
             * Used by the ContextManager for maintaining context parity.
             * 
             * @example 'context.childContextProperty.grandChildContextProperty'
             */
            absoluteContextPath?: string;

            /**
             * A string representing the DOM template for this control. If this property is
             * defined on a ITemplateControl then DOM will be created and put in the 
             * control's element prior to calling the 'setTemplate' method.
             */
            templateString?: string;

            /**
             * A url containing a string representing the DOM template for this control. If this property is
             * defined on a ITemplateControl then DOM will be created and put in the 
             * control's element prior to calling the 'setTemplate' method. This property takes 
             * precedence over templateString. In the event that both are defined, templateString
             * will be ignored.
             */
            templateUrl?: string;

            /**
             * A DocumentFragment representing the innerHTML that existed when this control was instantiated.
             * This property will only contain the innerHTML when either a templateString or templateUrl is
             * defined. Its important to clone this property when injecting it somewhere, else its childNodes
             * will disappear.
             * 
             * @example this.innerTemplate.cloneNode(true); //Useful if this is not a one-time injection.
             */
            innerTemplate?: DocumentFragment;

            /**
             * A IBindableTemplates object used for binding a data context to a template. This is an
             * advanced function of a ITemplateControl.
             * 
             * @see IBindableTemplates
             */
            bindableTemplates?: IBindableTemplates;

            /**
             * An array of child controls. Any controls created by this control can be found in this array. The controls in
             * this array will have reference to this control in their parent property.
             */
            controls?: Array<IControl>;

            /**
             * A Node array for managing the ITemplateControl's childNodes in the event that this control
             * replaces its element. This property will only be useful for a ITemplateControl that implements
             * replaceWith.
             */
            elementNodes?: Array<Node>;

            /**
             * The first node in the ITemplateControl's body. This property will be a Comment node when the
             * control implements replaceWith = null, otherwise it will be null. This property allows a ITemplateControl
             * to add nodes to its body in the event that it replaces its element.
             * 
             * @example this.startNode.parentNode.insertBefore(node, this.startNode.nextSibling);
             */
            startNode?: Node;

            /**
             * The last node in the ITemplateControl's body. This property will be a Comment node when the
             * control implements replaceWith, otherwise it will be null. This property allows a ITemplateControl
             * to add nodes to its body in the event that it replaces its element.
             * 
             * @example this.endNode.parentNode.insertBefore(node, this.endNode);
             */
            endNode?: Node;

            /**
             * Allows a ITemplateControl to either swap its element with another element (e.g. plat-select), or
             * replace its element altogether. If null or empty string, the element will be removed from the DOM, and the 
             * childNodes of the element will be in its place. In addition, when the element is placed an endNode Comment
             * is created, and the childNodes are added to the elementNodes property on the control. The replaceWith 
             * property can be any property that works with document.createElement(). If the control's element had 
             * attributes (as well as attribute IControls), those attributes will be carried to the swapped element.
             */
            replaceWith?: string;

            /**
             * Set to the root ancestor control from which this control inherits its context. This value
             * can be equal to this control.
             */
            root?: ITemplateControl;

            /**
             * A method called for ITemplateControls to set their template. During this method a control should
             * ready its template for compilation. Whatever is in the control's element (or elementNodes if replaceWith
             * is implemented) after this method's execution will be compiled and appear on the DOM.
             */
            setTemplate? (): void;

            /**
             * This event is fired when an ITemplateControl's context property is changed by an ancestor control.
             */
            contextChanged? (newValue: any, oldValue: any): void;

            /**
             * Finds the identifier string associated with the given context object. The string returned
             * is the path from a control's context.
             * 
             * @param context The object to locate on the control's context.
             * 
             * @example 
             *     // returns 'title'
             *     this.getIdentifier(this.context.title);
             */
            getIdentifier? (context: any): string;

            /**
             * Finds the absolute identifier string associated with the given context object. The string returned
             * is the path from a control's root ancestor's context.
             * 
             * @param context The object to locate on the root control's context.
             */
            getAbsoluteIdentifier? (context: any): string;
        
            /**
             * Finds the associated resources and builds a context object containing
             * the values. Returns the object.
             * 
             * @param aliases An array of aliases to search for.
             * @param resources An optional resources object to extend, if no resources object is passed in a new one will be created.
             */
            getResources? (aliases: Array<string>, resources?: any): IObject<any>;

            /**
             * Starts at a control and searches up its parent chain for a particular resource alias. 
             * If the resource is found, it will be returned along with the control instance on which
             * the resource was found.
             * 
             * @param alias The alias to search for.
             */
            findResource? (alias: string): { resource: IResource; control: ITemplateControl; };

            /**
             * Evaluates an expression string, using the control.context.
             * 
             * @param expression The expression string to evaluate.
             * @param context An optional context with which to parse. If 
             * no context is specified, the control.context will be used.
             */
            evaluateExpression? (expression: string, context?: any): any;
            /**
             * Evaluates a parsed expression, using the control.context.
             * 
             * @param expression The IParsedExpression to evaluate.
             * @param context An optional context with which to parse. If 
             * no context is specified, the control.context will be used.
             */
            evaluateExpression? (expression: expressions.IParsedExpression, context?: any): any;
        }

        /**
         * A control used in a controls.Viewport for simulated page navigation. The 
         * control has navigation events that are called when navigating to and from the control.
         */
        export class BaseViewControl extends TemplateControl implements IBaseViewControl {
            /**
             * Detaches a ViewControl. Disposes its children, but does not dispose the ViewControl.
             * Useful for the Navigator when storing the ViewControl in history.
             *  
             * @static
             * @param control The control to be detached.
             */
            static detach(control: IBaseViewControl): void {
                TemplateControl.detach(control);
            }

            /**
             * Recursively disposes a control and its children.
             * 
             * @static
             * @param control A control to dispose.
             */
            static dispose(control: IBaseViewControl): void {
                TemplateControl.dispose(control);
            }

            /**
             * Returns a new instance of ViewControl.
             * 
             * @static
             */
            static getInstance(): IBaseViewControl {
                return new ViewControl();
            }

            hasOwnContext: boolean = true;
            navigator: navigation.IBaseNavigator;

            navigatedTo(parameter?: any): void { }

            navigatingFrom(): void { }
        }

        /**
         * The Type for referencing the '$ViewControlFactory' injectable as a dependency.
         */
        export function IBaseViewControlFactory(): IBaseViewControlFactory {
            return BaseViewControl;
        }

        register.injectable(__BaseViewControlFactory, IBaseViewControlFactory, null, register.FACTORY);

        /**
         * Creates and manages IViewControls.
         */
        export interface IBaseViewControlFactory {
            /**
             * Detaches a ViewControl. Disposes its children, but does not dispose the ViewControl.
             * Useful for the Navigator when storing the ViewControl in history.
             *
             * @static
             * @param control The control to be detached.
             */
            detach(control: IBaseViewControl): void;

            /**
             * Recursively disposes a control and its children.
             * 
             * @static
             * @param control A control to dispose.
             */
            dispose(control: IBaseViewControl): void;

            /**
             * Returns a new instance of an IViewControl.
             *
             * @static
             */
            getInstance(): IBaseViewControl;
        }

        /**
         * Describes a control used in a viewport for simulated page navigation. The 
         * control has navigation events that are called when navigating to and from the control.
         */
        export interface IBaseViewControl extends ITemplateControl {
            /**
             * Specifies that this control will have its own context, and it should not inherit a context.
             */
            hasOwnContext?: boolean;

            /**
             * Specifies the navigator for this control. Used for navigating to other IViewControls
             * in a controls.Viewport.
             */
            navigator?: navigation.IBaseNavigator;

            /**
             * This event is fired when this control has been navigated to.
             * 
             * @param parameter A navigation parameter sent from the previous IViewControl.
             */
            navigatedTo? (parameter?: any): void;

            /**
             * This event is fired when this control is being navigated away from.
             */
            navigatingFrom? (): void;
        }

        /**
         * A control used in a viewport for simulated page navigation. The 
         * control has navigation events that are called when navigating to and from the control.
         */
        export class ViewControl extends TemplateControl implements IViewControl {
            navigator: navigation.INavigatorInstance;
        }

        /**
         * Describes a control used in a controls.Viewport for simulated page navigation. The 
         * control has navigation events that are called when navigating to and from the control.
         */
        export interface IViewControl extends IBaseViewControl {
            /**
             * Specifies the navigator for this control. Used for navigating to other IViewControls
             * in a viewport.
             */
            navigator?: navigation.INavigatorInstance;
        }

        /**
         * A control used in a routeport for simulated page navigation. The 
         * control has navigation events that are called when navigating to and from the control.
         * It also provides functionality for setting the title of a page.
         */
        export class WebViewControl extends BaseViewControl {
            static titleElement = plat.acquire(plat.Document).head.querySelector('title');

            static setTitle(title: string) {
                WebViewControl.titleElement.textContent = title.replace(/\//g, ' ');
            }

            title = '';

            navigator: plat.navigation.IRoutingNavigator;

            constructor() {
                super();
                this.on('navigated', () => {
                    if (this.title.length === 0) {
                        return;
                    }

                    WebViewControl.setTitle(this.title);
                });
            }

            setTitle(title: string) {
                this.title = title;
                WebViewControl.setTitle(this.title);
            }
        }

        export interface IWebViewControl extends IBaseViewControl {
            /**
             * The title of the page, corresponds to the textContent of the title element in the HTML head.
             */
            title?: string;

            /**
             * Specifies the navigator for this control. Used for navigating to other IWebViewControls
             * in a routeport.
             */
            navigator?: plat.navigation.IRoutingNavigator;

            /**
             * Allows the IWebViewControl set its title programmatically and have it reflect in the browser title.
             */
            setTitle? (title: string): void;
        }

        /**
         * An extensible class dealing with the creation, deletion, and modification 
         * of DOM.
         */
        export class Dom implements IDom {
            $DomEvents: ui.IDomEvents = acquire(__DomEvents);

            addEventListener(element: Node, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
            addEventListener(element: Window, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
            addEventListener(element: any, type: string, listener: ui.IGestureListener, useCapture?: boolean) {
                return this.$DomEvents.addEventListener(element, type, listener, useCapture);
            }

            appendChildren(nodeList: Array<Node>, root?: Node): Node;
            appendChildren(nodeList: NodeList, root?: Node): Node;
            appendChildren(nodeList: any, root?: Node) {
                return appendChildren(nodeList, root);
            }

            clearNode(node: Node) {
                return clearNode(node);
            }

            clearNodeBlock(nodeList: Array<Node>, parent?: Node): void;
            clearNodeBlock(nodeList: NodeList, parent?: Node): void;
            clearNodeBlock(nodeList: any, parent?: Node) {
                return clearNodeBlock(nodeList, parent);
            }

            setInnerHtml(node: Node, html: string): Node {
                return setInnerHtml(node, html);
            }

            insertBefore(parent: Node, nodes: Array<Node>, endNode?: Node): Array<Node>;
            insertBefore(parent: Node, nodes: NodeList, endNode?: Node): Array<Node>;
            insertBefore(parent: Node, fragment: DocumentFragment, endNode?: Node): Array<Node>;
            insertBefore(parent: Node, nodes: any, endNode?: Node) {
                return insertBefore(parent, nodes, endNode);
            }

            replace(node: Node): Array<Node> {
                return replace(node);
            }

            replaceWith(node: Node, newElement: HTMLElement): HTMLElement;
            replaceWith(node: Node, newElement: Element): Element;
            replaceWith(node: Node, newNode: Node): Node;
            replaceWith(node: any, newNode: any): any {
                return replaceWith(node, newNode);
            }

            serializeHtml(html: string): DocumentFragment {
                return serializeHtml(html);
            }

            removeBetween(startNode: Node, endNode?: Node): void {
                return removeBetween(startNode, endNode);
            }

            removeAll(startNode: Node, endNode?: Node): void {
                return removeAll(startNode, endNode);
            }

            addClass(element: Element, className: string): void {
                return addClass(<HTMLElement>element, className);
            }

            removeClass(element: Element, className: string): void {
                return removeClass(<HTMLElement>element, className);
            }
        }

        /**
         * The Type for referencing the '$Dom' injectable as a dependency.
         */
        export function IDom(): IDom {
            return new Dom();
        }

        register.injectable(__Dom, IDom);

        /**
         * An object that deals with the creation, deletion, and modification 
         * of DOM.
         */
        export interface IDom {
            /**
             * Adds an event listener of the specified type to the specified element.
             * 
             * @param element The element to add the event listener to.
             * @param type The type of event to listen to.
             * @param listener The listener to fire when the event occurs.
             * @param useCapture Whether to fire the event on the capture or the bubble phase 
             * of event propagation.
             */
            addEventListener(element: Node, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
            addEventListener(element: Window, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;

            /**
             * Takes a Node Array and either adds it to the passed in Node,
             * or creates a DocumentFragment and adds the NodeList to the
             * Fragment.
             *
             * @param nodeList A Node Array to be appended to the root/DocumentFragment
             * @param root An optional Node to append the nodeList.
             * 
             * @return {Node} The root Node or a DocumentFragment.
             */
            appendChildren(nodeList: Array<Node>, root?: Node): Node;
            /**
             * Takes a NodeList and either adds it to the passed in Node,
             * or creates a DocumentFragment and adds the NodeList to the
             * Fragment.
             *
             * @param nodeList A NodeList to be appended to the root/DocumentFragment
             * @param root An optional Node to append the nodeList.
             * 
             * @return {Node} The root Node or a DocumentFragment.
             */
            appendChildren(nodeList: NodeList, root?: Node): Node;

            /**
             * Clears a DOM Node by removing all of its childNodes.
             *
             * @param node The DOM Node to clear.
             */
            clearNode(node: Node): void;

            /**
             * Removes all the Nodes in the Array from the parent Node.
             *
             * @param nodeList The Node Array to remove from the parent Node.
             * @param parent The parent Node used to remove the nodeList.
             */
            clearNodeBlock(nodeList: Array<Node>, parent?: Node): void;
            /**
             * Removes all the Nodes in the NodeList from the parent Node.
             *
             * @param nodeList The NodeList to remove from the parent Node.
             * @param parent The parent Node used to remove the nodeList.
             */
            clearNodeBlock(nodeList: NodeList, parent?: Node): void;

            /**
             * Sets the innerHTML of a Node. Can take in a Node rather than an Element
             * because it does not use innerHTML on the passed-in Node (it appends its
             * childNodes).
             *
             * @param node The Node to set innerHTML.
             * @param html HTML string to be put inside the node.
             *
             * @return {Node} The same node passed in, with innerHTML set.
             */
            setInnerHtml(node: Node, html: string): Node;

            /**
             * Inserts a list of Nodes before the designated end Node.
             *
             * @param parent The parent node into which to insert nodes.
             * @param nodes The Node Array to insert into the parent.
             * @param endNode An optional endNode to use to insert nodes.
             *
             * @return {Array<Node>} An Array copy of nodes.
             */
            insertBefore(parent: Node, nodes: Array<Node>, endNode?: Node): Array<Node>;
            /**
             * Inserts a list of Nodes before the designated end Node.
             *
             * @param parent The parent node into which to insert nodes.
             * @param nodes The NodeList to insert into the parent.
             * @param endNode An optional endNode to use to insert nodes.
             *
             * @return {Array<Node>} An Array copy of nodes.
             */
            insertBefore(parent: Node, nodes: NodeList, endNode?: Node): Array<Node>;
            /**
             * Inserts a list of Nodes before the designated end Node.
             *
             * @param parent The parent node into which to insert nodes.
             * @param fragment The DocumentFragment to insert into the parent.
             * @param endNode An optional endNode to use to insert the fragment.
             *
             * @return {Array<Node>} An Array copy of the fragment's childNodes.
             */
            insertBefore(parent: Node, fragment: DocumentFragment, endNode?: Node): Array<Node>;

            /**
             * Takes the child nodes of the given node and places them above the node
             * in the DOM. Then removes the given node.
             *
             * @param node The Node to replace.
             * 
             * @return {Array<Node>} A Node Array that represents the childNodes of the
             * given node.
             */
            replace(node: Node): Array<Node>;

            /**
             * Takes the childNodes of the given element and appends them to the newElement.
             * Then replaces the element in its parent's tree with the newElement.
             *
             * @param node The Node to remove from its parent.
             * @param newElement The HTMLElement populate with childNodes and add to the
             * element's parent.
             * 
             * @return {HTMLElement} The replaced element (newElement).
             */
            replaceWith(node: Node, newElement: HTMLElement): HTMLElement;
            /**
             * Takes the childNodes of the given element and appends them to the newElement.
             * Then replaces the element in its parent's tree with the newElement.
             *
             * @param node The Node to remove from its parent.
             * @param newElement The Element populate with childNodes and add to the
             * element's parent.
             * 
             * @return {Element} The replaced element (newElement).
             */
            replaceWith(node: Node, newElement: Element): Element;
            /**
             * Takes the childNodes of the given Node and appends them to the newNode.
             * Then replaces the Node in its parent's tree with the newNode.
             *
             * @param node The Node to remove from its parent.
             * @param newElement The Node populate with childNodes and add to the
             * node's parent.
             * 
             * @return {Node} The replaced Node (newNode).
             */
            replaceWith(node: Node, newNode: Node): Node;

            /**
             * Takes in a string representing innerHTML and returns a DocumentFragment
             * containing the serialized DOM.
             *
             * @param html The DOM string.
             * 
             * @return {DocumentFragment} The serialized DOM.
             */
            serializeHtml(html?: string): DocumentFragment;

            /**
             * Takes in a startNode and endNode, each having the same parentNode.
             * Removes every node in between the startNode.  If endNode is not specified,
             * DOM will be removed until the end of the parentNode's children.
             *
             * @param startNode The starting node, which will not be removed.
             * @param endNode The ending node, which will not be removed.
             */
            removeBetween(startNode: Node, endNode?: Node): void;

            /**
             * Takes in a startNode and endNode, each having the same parentNode.
             * Removes every node in between the startNode and endNode as well as
             * the startNode and the endNode.  If endNode is not specified, DOM
             * will be removed until the end of the parentNode's children.
             *
             * @param startNode The first node to remove.
             * @param endNode The last node to remove.
             */
            removeAll(startNode: Node, endNode?: Node): void;

            /**
             * Adds a class to the specified element
             * 
             * @param element The element to which the class name is being added.
             * @param className The class name to add to the element.
             */
            addClass(element: Element, className: string): void;

            /**
             * Removes a class from the specified element
             * 
             * @param element The element from which the class name is being removed.
             * @param className The class name to remove from the element.
             */
            removeClass(element: Element, className: string): void;
        }

        /**
         * The class which provides a way for ITemplateControls to bind a template 
         * to a context. Useful for narrowing context without needing another 
         * ITemplateControl. In addition, this object provides a performance increase because 
         * it will only compile the template once. This object is also useful when a 
         * ITemplateControl expects multiple configuration templates in its innerHTML. It can 
         * separate those templates and reuse them accordingly.
         */
        export class BindableTemplates implements IBindableTemplates {
            /**
             * Creates a new instance of BindableTemplates and returns it. If a BindableTemplates is 
             * passed in, it will use the properties on the original BindableTemplates.
             * 
             * @static
             * @param control The ITemplateControl containing the new BindableTemplate object, used for data context 
             * inheritance for templates.
             * @param originalBindableTemplates An optional IBindableTemplates object to copy.
             * @return {BindableTemplates} The newly instantiated BindableTemplates object.
             */
            static create(control: ITemplateControl, original?: IBindableTemplates): IBindableTemplates;
            static create(control: ITemplateControl, original?: BindableTemplates): IBindableTemplates {
                var bindableTemplates = new BindableTemplates();
                bindableTemplates.control = control;

                if (!isNull(original)) {
                    bindableTemplates.templates = original.templates;
                    bindableTemplates._cache = original._cache;
                }

                return bindableTemplates;
            }

            /**
             * Clears the memory being held by control's bindableTemplates.
             * 
             * @static
             * @param control The control whose bindableTemplates will be disposed.
             */
            static dispose(control: ITemplateControl): void {
                if (isNull(control)) {
                    return;
                }
                var instance = control.bindableTemplates;

                if (isNull(instance) || !isFunction(instance.dispose)) {
                    return;
                }

                instance.dispose();
            }

            $ResourcesFactory: IResourcesFactory = acquire(__ResourcesFactory);
            $TemplateControlFactory: ITemplateControlFactory = acquire(__TemplateControlFactory);
            $Promise: async.IPromise = acquire(__Promise);
            $ManagerCache: storage.ICache<processing.IElementManager> = acquire(__ManagerCache);
            $Document: Document = acquire(__Document);
            $ElementManagerFactory: processing.IElementManagerFactory = acquire(__ElementManagerFactory);

            control: ITemplateControl;
            templates: IObject<async.IThenable<DocumentFragment>> = {};

            /**
             * A keyed cache of IElementManagers that represent the roots of compiled templates 
             * created by this instance of BindableTemplates.
             */
            _cache: IObject<processing.IElementManager> = {};

            private __compiledControls: Array<ITemplateControl> = [];

            bind(key: string, relativeIdentifier?: string, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
            bind(key: string, relativeIdentifier?: number, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
            bind(key: any, relativeIdentifier?: any, resources?: IObject<IResource>): async.IThenable<DocumentFragment> {
                var templatePromise = this.templates[key],
                    control: ITemplateControl = this.control,
                    nodeMap: processing.INodeMap,
                    $exception: IExceptionStatic;

                if (isNull(templatePromise)) {
                    $exception = acquire(__ExceptionStatic);
                    $exception.fatal('Cannot bind template, no template stored with key: ' + key,
                        $exception.TEMPLATE);
                    return;
                }

                if (!(isNull(relativeIdentifier) || isNumber(relativeIdentifier) || isString(relativeIdentifier))) {
                    $exception = acquire(__ExceptionStatic);
                    $exception.warn('Cannot bind template with relativeIdentifier: ' +
                        relativeIdentifier +
                        '. Identifier must be either a string or number', $exception.BIND);
                    return;
                }

                return templatePromise.then((result: DocumentFragment) => {
                    return this._bindTemplate(key, <DocumentFragment>result.cloneNode(true), relativeIdentifier, resources);
                }, (error: any) => {
                    postpone(() => {
                        $exception = acquire(__ExceptionStatic);
                        $exception.fatal(error, $exception.BIND);
                    });

                    return <DocumentFragment>null;
                });
            }

            add(key: string, template: Element): void;
            add(key: string, template: Array<Node>): void;
            add(key: string, template: NodeList): void;
            add(key: string, template: DocumentFragment): void;
            add(key: string, template: Node): void;
            add(key: string, template: any) {
                if (isNull(template)) {
                    return;
                }

                if (isDocumentFragment(template)) {
                    this._compile(key, template);
                    return;
                }

                var fragment = this.$Document.createDocumentFragment();

                if (isNode(template)) {
                    fragment.appendChild(template);
                } else if (isArrayLike(template)) {
                    appendChildren(template, fragment);
                } else {
                    return;
                }

                this._compile(key, fragment);
            }

            dispose(): void {
                var dispose = this.$TemplateControlFactory.dispose,
                    compiledControls = this.__compiledControls,
                    length = compiledControls.length;

                for (var i = 0; i < length; ++i) {
                    dispose(compiledControls[i]);
                }

                this.__compiledControls = [];
                this.control = null;
                this._cache = {};
                this.templates = {};
            }

            /**
             * Creates the template's bound control and INodeMap and initiates 
             * the binding of the INodeMap for a cloned template.
             */
            _bindTemplate(key: string, template: DocumentFragment, context: string,
                resources: IObject<IResource>): async.IThenable<DocumentFragment> {
                var control = this._createBoundControl(key, template, context, resources),
                    nodeMap = this._createNodeMap(control, template, context);

                return this._bindNodeMap(nodeMap, key).then(() => {
                    control.startNode = template.insertBefore(this.$Document.createComment(control.type + ': start node'),
                        template.firstChild);
                    control.endNode = template.insertBefore(this.$Document.createComment(control.type + ': end node'),
                        null);

                    return template;
                }, (error: any) => {
                    postpone(() => {
                        var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                        $exception.fatal(error, $exception.COMPILE);
                    });

                    return <DocumentFragment>null;
                });
            }

            /**
             * Clones the compiled IElementManager using the newly created 
             * INodeMap and binds and loads this control's IElementManager.
             */
            _bindNodeMap(nodeMap: processing.INodeMap, key: string): async.IThenable<void> {
                var manager = this._cache[key],
                    child = nodeMap.uiControlNode.control,
                    template = nodeMap.element,
                    $managerCache = this.$ManagerCache;

                this.control.controls.push(child);

                manager.clone(template, $managerCache.read(this.control.uid), nodeMap);
                return $managerCache.read(child.uid).bindAndLoad();
            }
        
            /**
             * Creates the template's compiled, bound control and INodeMap and initiates 
             * the compilation of the template.
             */
            _compile(key: string, template: DocumentFragment): void {
                var control = this._createBoundControl(key, template),
                    nodeMap = this._createNodeMap(control, template);

                this.__compiledControls.push(control);

                this._compileNodeMap(control, nodeMap, key);
            }

            /**
             * Instantiates a new IElementManager for the root of this template and resolves 
             * any asynchronous url templates within the template being compiled.
             */
            _compileNodeMap(control: ITemplateControl, nodeMap: processing.INodeMap, key: string) {
                var manager = this.$ElementManagerFactory.getInstance(),
                    promises: Array<async.IThenable<void>> = [];

                manager.isClone = true;
                manager.initialize(nodeMap, null);
                manager.setUiControlTemplate();

                this._cache[key] = manager;

                promises.push(manager.fulfillTemplate());

                this.templates[key] = this.$Promise.all(promises).then((results) => {
                    var element = nodeMap.element,
                        startNode: Comment,
                        endNode: Comment;

                    startNode = control.startNode = this.$Document.createComment(control.type + ': start node');
                    endNode = control.endNode = this.$Document.createComment(control.type + ': end node');
                    element.insertBefore(startNode, element.firstChild);
                    element.insertBefore(endNode, null);

                    return <DocumentFragment>nodeMap.element.cloneNode(true);
                });
            }

            /**
             * Creates an INodeMap for either a template being compiled or a template being bound.
             */
            _createNodeMap(uiControl: ITemplateControl, template: Node, childContext?: string): processing.INodeMap {
                return {
                    element: <HTMLElement>template,
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
            }

            /**
             * Creates a bound control for either a template being compiled or a template being bound.
             */
            _createBoundControl(key: string, template: DocumentFragment,
                relativeIdentifier?: string, resources?: IObject<IResource>): ITemplateControl {
                var $TemplateControlFactory = this.$TemplateControlFactory,
                    control = $TemplateControlFactory.getInstance(),
                    $ResourcesFactory = this.$ResourcesFactory,
                    parent = this.control,
                    hasRelativeIdentifier = !isEmpty(relativeIdentifier),
                    absoluteContextPath: string = hasRelativeIdentifier ?
                    parent.absoluteContextPath + '.' + relativeIdentifier :
                    absoluteContextPath = parent.absoluteContextPath;

                $TemplateControlFactory.setAbsoluteContextPath(control, absoluteContextPath);

                var _resources = $ResourcesFactory.getInstance();

                _resources.initialize(control, resources);

                control.resources = _resources;
                $ResourcesFactory.addControlResources(control);

                control.parent = parent;
                control.controls = [];
                control.element = <HTMLElement>template;
                control.type = this.control.type + '-@' + key;

                return control;
            }
        }

        /**
         * The Type for referencing the '$BindableTemplatesFactory' injectable as a dependency.
         */
        export function IBindableTemplatesFactory(): IBindableTemplatesFactory {
            return BindableTemplates;
        }

        register.injectable(__BindableTemplatesFactory, IBindableTemplatesFactory, null, register.FACTORY);

        /**
         * The external interface for the '$BindableTemplatesFactory' injectable.
         */
        export interface IBindableTemplatesFactory {
            /**
             * Creates a new instance of BindableTemplates and returns it. If a BindableTemplates is
             * passed in, it will use the properties on the original BindableTemplates.
             *
             * @static
             * @param control The ITemplateControl containing the new BindableTemplate object, used for data context
             * inheritance for templates.
             * @param originalBindableTemplates An optional IBindableTemplates object to copy.
             * @return {BindableTemplates} The newly instantiated BindableTemplates object.
             */
            create(control: ITemplateControl, original?: IBindableTemplates): IBindableTemplates;

            /**
             * Clears the memory being held by control's bindableTemplates.
             * 
             * @static
             * @param control The control whose bindableTemplates will be disposed.
             */
            dispose(control: ITemplateControl): void;
        }

        /**
         * Describes an object which provides a way for ITemplateControls to bind a template 
         * to a data context. Useful for narrowing data context without needing another 
         * ITemplateControl. In addition, this object provides a performance increase because 
         * it will only compile the template once. This object is also useful when a 
         * ITemplateControl expects multiple configuration templates in its innerHTML. It can 
         * separate those templates and reuse them accordingly.
         */
        export interface IBindableTemplates {
            /**
             * The control containing the IBindableTemplate object.
             */
            control: ITemplateControl;

            /**
             * Stores the compiled templates for this object, ready to be bound to a data context. 
             * All created templates are DocumentFragments, allowing a ITemplateControl to
             * easily insert the template into the DOM (without iterating over childNodes). This object
             * may contain a template promise.
             */
            templates: {};

            /**
             * Method for linking a new template to a data context and returning a clone of the template, 
             * with all new IControls created if the template contains controls. It is not necessary
             * to specify a data context.
             * 
             * @param key The key used to retrieve the template.
             * @param relativeIdentifier The identifier string relative to this control's context
             * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the 
             * most efficient way of specifying context, else the framework has to search for the 
             * object.
             * @param resources An object used as the resources for any top-level 
             * controls created in the template.
             */
            bind(key: string, relativeIdentifier?: string,
                resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
            /**
             * Method for linking a new template to a data context and returning a clone of the template, 
             * with all new IControls created if the template contains controls. It is not necessary
             * to specify a data context.
             * 
             * @param key The key used to retrieve the template.
             * @param relativeIdentifier The identifier number relative to this control's context. Only 
             * necessary when context is an array.
             * @param resources An object used as the resources for any top-level 
             * controls created in the template.
             */
            bind(key: string, relativeIdentifier?: number,
                resources?: IObject<IResource>): async.IThenable<DocumentFragment>;

            /**
             * Adds a template to this object. The template will be stored with the key,
             * and it will be transformed into a DocumentFragment.
             * 
             * @param key The key used to store the template.
             * @param template An Element represending the template DOM.
             */
            add(key: string, template: Element): void;
            /**
             * Adds a template to this object. The template will be stored with the key,
             * and it will be transformed into a DocumentFragment.
             * 
             * @param key The key used to store the template.
             * @param template A Node array represending the template DOM.
             */
            add(key: string, template: Array<Node>): void;
            /**
             * Adds a template to this object. The template will be stored with the key,
             * and it will be transformed into a DocumentFragment.
             * 
             * @param key The key used to store the template.
             * @param template A NodeList represending the template DOM.
             */
            add(key: string, template: NodeList): void;
            /**
             * Adds a template to this object. The template will be stored with the key.
             * 
             * @param key The key used to store the template.
             * @param template A DocumentFragment represending the template DOM.
             */
            add(key: string, template: DocumentFragment): void;
            /**
             * Adds a template to this object. The template will be stored with the key,
             * and it will be transformed into a DocumentFragment.
             * 
             * @param key The key used to store the template.
             * @param template A Node represending the template DOM.
             */
            add(key: string, template: Node): void;

            /**
             * Clears the memory being held by this BindableTemplates instance.
             */
            dispose(): void;
        }

        /**
         * The class that stores the information about an Element's attribute NamedNodeMap.
         * Methods are implemented to allow you to observe for changes on an attribute.
         * 
         * Attributes for this object are converted from dash-notation to camelCase notation.
         */
        export class Attributes implements IAttributesInstance {
            private __listeners: IObject<Array<(newValue: any, oldValue: any) => void>> = {};
            private __control: IControl;

            initialize(control: IControl, attributes: IObject<string>): void {
                this.__control = control;

                var keys = Object.keys(attributes),
                    attributeListeners = this.__listeners,
                    key: string,
                    length = keys.length,
                    parent = control.parent,
                    hasParent = !isNull(parent);

                for (var i = 0; i < length; ++i) {
                    key = keys[i];
                    (<any>this)[key] = attributes[key];
                    attributeListeners[key] = [];
                }
            }

            observe(key: string, listener: (newValue: any, oldValue: any) => void): IRemoveListener {
                var listeners = this.__listeners[camelCase(key)];

                if (isNull(listeners)) {
                    return noop;
                }

                var length = listeners.length;

                listeners.push(listener);

                return () => {
                    listeners.splice(length, 1);
                };
            }
        
            /**
             * Used to show an attribute has been changed and forces listeners to be fired.
             * 
             * @param key The attribute being observed for changes (e.g. 'platOptions').
             * @param newValue The new value of the attribute.
             * @param oldValue The previous value of the attribute.
             */
            attributeChanged(key: string, newValue: any, oldValue: any): void {
                var control = this.__control,
                    listeners = this.__listeners[camelCase(key)],
                    length = listeners.length;

                for (var i = 0; i < length; ++i) {
                    listeners[i].call(control, newValue, oldValue);
                }
            }
        }

        /**
         * The Type for referencing the '$Attributes' injectable as a dependency.
         */
        export function IAttributesInstance(): IAttributesInstance {
            return new Attributes();
        }

        register.injectable(__AttributesInstance, IAttributesInstance, null, register.INSTANCE);

        /**
         * Describes an object that stores the information about an Element's attribute NamedNodeMap.
         * Methods are implemented to allow you to observe for changes on an attribute.
         * 
         * Attributes for this object are converted from dash-notation to camelCase notation.
         */
        export interface IAttributesInstance {
            /**
             * Stores the information about an Element's attribute NamedNodeMap, and allows a control to observe 
             * for changes on an attribute. The interface takes in a generic type, allowing ITemplateControls 
             * to specify an interface for their plat-options.
             * 
             * Attributes for this object are converted from dash-notation to camelCase notation. 'plat-options' are 
             * parsed and stored as an object on this object, all other attributes are stored with their string values.
             */
            initialize(control: IControl, attributes: IObject<string>): void;

            /**
             * Provides a way to observe an attribute for changes.
             * 
             * @param key The attribute to observe for changes.
             * @param listener The listener function to be called when the attribute changes.
             */
            observe(key: string, listener: (newValue: any, oldValue: any) => void): IRemoveListener;

            /**
             * Used to show an attribute has been changed and forces listeners to be fired.
             * 
             * @param key The attribute being observed for changes (e.g. 'platOptions').
             * @param newValue The new value of the attribute.
             * @param oldValue The previous value of the attribute.
             */
            attributeChanged(key: string, newValue: any, oldValue: any): void;
        }

        /**
         * Resources are used for providing aliases to use in markup expressions. They 
         * are particularly useful when trying to access properties outside of the 
         * current context, as well as reassigning context at any point in an app.
         * 
         * By default, every control has a resource for '@control' and '@context'.
         * IViewControl objects also have a resource for '@root' and '@rootContext', 
         * which is a reference to the control and its context.
         * 
         * Resources can be created in HTML, or through the exposed control.resources 
         * object. If specified in HTML, they must be the first element child of the 
         * control upon which the resources will be placed. IViewControls that use a 
         * templateUrl can have resources as their first element in the templateUrl.
         * 
         * @example 
         * <custom-control>
         *     <plat-resources>
         *         <injectable alias="Cache">$CacheFactory</injectable>
         *         <observable alias="testObj">
         *              { 
         *                  foo: 'foo', 
         *                  bar: 'bar', 
         *                  baz: 2 
         *              }
         *         </observable>
         *     </plat-resources>
         * </custom-control>
         * 
         * In the above example, the resources can be accessed by using '@Cache' and '@testObj'.
         * The type of resource is denoted by the element name.
         * 
         * Only resources of type 'observable' will have data binding. The types of resources are:
         * function, injectable, observable, and object. Resources of type 'function' will have their
         * associated function context bound to the control that contains the resource.
         * 
         * When an alias is found in a markup expression, the framework will search up the control chain 
         * to find the alias on a control's resources. This first matching alias will be used.
         */
        export class Resources implements IResources {
            static $ContextManagerStatic: observable.IContextManagerStatic;
            static $Regex: expressions.IRegex;

            /**
             * Populates an IResource value if necessary, and adds it to the given 
             * control's resources.
             * 
             * @static
             * @param control The control for which to create a resource.
             * @param resource The IResource used to set the value.
             */
            static create(control: ITemplateControl, resource: IResource): IResource {
                if (isNull(resource)) {
                    return resource;
                }

                var value: any;

                switch (resource.type.toLowerCase()) {
                    case 'injectable':
                        var injector = injectableInjectors[resource.value];
                        if (!isNull(injector)) {
                            resource.value = injector.inject();
                        }
                        break;
                    case 'observable':
                        Resources._observeResource(control, resource);
                        break;
                    case 'object':
                        value = resource.value;
                        if (isString(value)) {
                            resource.value = control.evaluateExpression(value);
                        }
                        break;
                    case 'function':
                        value = resource.value;
                        if (isString(value)) {
                            value = (<any>control)[value];
                            if (isFunction(value)) {
                                resource.value = value.bind(control);
                            } else {
                                var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                                $exception.warn('Attempted to create a "function" ' +
                                    'type Resource with a function not found on your control.',
                                    $exception.BIND);
                                resource.value = noop;
                            }
                        }
                        break;
                }

                return resource;
            }

            /**
             * Adds resource aliases for '@control' and '@context'. The resources are 
             * aliases for the control instance and the control.context.
             * 
             * @static
             * @param control The control on which to add the resources.
             */
            static addControlResources(control: ITemplateControl): void {
                control.resources.add({
                    context: {
                        value: control.context,
                        type: 'observable'
                    },
                    control: {
                        value: control,
                        type: 'object'
                    }
                });

                if (control.hasOwnContext) {
                    Resources.__addRoot(<IViewControl>control);
                }
            }

            /**
             * Binds the resources in a resource instance. This involves injecting 
             * the injectable resources, creating object/observable resources, and
             * binding functions to the associated control's instance.
             * 
             * @static
             * @param resourcesInstance The instance of the IResources object.
             */
            static bindResources(resourcesInstance: IResources): void;
            static bindResources(resourcesInstance: Resources) {
                var resources = resourcesInstance.__resources,
                    control = resourcesInstance.__controlInstance,
                    aliases = Object.keys(resources),
                    controlResources = Resources.__controlResources,
                    length = aliases.length,
                    alias: string;
                
                for (var i = 0; i < length; ++i) {
                    alias = aliases[i];

                    if (controlResources.indexOf(alias) !== -1) {
                        continue;
                    }

                    (<any>resourcesInstance)[alias] = resources[alias] = Resources.create(control,
                        (<any>resourcesInstance)[alias]);
                }
            
                resourcesInstance.__bound = true;
            }

            /**
             * Disposes a resource instance, removing its reference 
             * from a control and breaking references to all resource 
             * objects.
             * 
             * @static
             * @param control The control whose resources will be disposed.
             * @param persist Whether or not to persist a resource object post 
             * disposal or set it to null.
             */
            static dispose(control: ITemplateControl, persist?: boolean): void {
                var resources = <Resources>control.resources;

                if (isNull(resources)) {
                    return;
                }

                var keys = Object.keys(resources.__resources),
                    key: string,
                    length = keys.length,
                    define = Resources.$ContextManagerStatic.defineProperty,
                    resource: IResource;

                for (var i = 0; i < length; ++i) {
                    key = keys[i];
                    resource = (<any>resources)[key];

                    if (!isNull(resource) && resource.type === 'observable') {
                        define(resources, key, persist ? deepExtend({}, resource) : null, true, true);
                    }
                }

                Resources._removeListeners(resources.__controlInstance);
            }
        
            /**
             * Parses a resources Element and creates 
             * an IObject<IResource> with its element children.
             * 
             * @static
             * @param element The resources element to parse.
             * 
             * @return {IObject<IResource>} The resources created 
             * using element.
             */
            static parseElement(element: Element): IObject<IResource> {
                var children: Array<Element> = Array.prototype.slice.call((<HTMLElement>element).children),
                    child: Element,
                    $regex = Resources.$Regex,
                    whiteSpaceRegex = $regex.whiteSpaceRegex,
                    quotationRegex = $regex.quotationRegex,
                    resources: IObject<IResource> = {},
                    resource: IResource,
                    types = Resources.__resourceTypes,
                    attrs: NamedNodeMap,
                    attr: Attr,
                    nodeName: string,
                    text: string;

                while (children.length > 0) {
                    child = children.pop();
                    nodeName = child.nodeName.toLowerCase();

                    if (types.indexOf(nodeName) === -1) {
                        continue;
                    }

                    attrs = child.attributes;
                    resource = <IResource>{};

                    attr = attrs.getNamedItem('alias');
                    if (isNull(attr)) {
                        continue;
                    }
                    resource.alias = attr.value;

                    text = child.textContent.replace(whiteSpaceRegex, '$1');
                    if (isEmpty(text)) {
                        continue;
                    }
                    resource.value = (nodeName === 'injectable') ?
                        text.replace(quotationRegex, '') : text;

                    resource.type = nodeName;
                    resources[resource.alias] = resource;
                }

                return resources;
            }

            /**
             * Returns a new instance of IResources.
             * 
             * @static
             */
            static getInstance(): IResources {
                return new Resources();
            }

            /**
             * Observes the resource if the type is 'observable'.
             * 
             * @static
             * @param control The control in charge of the observable resource.
             * @param resource The resource to observe.
             */
            static _observeResource(control: ITemplateControl, resource: IResource): void {
                var value = resource.value,
                    uid = control.uid,
                    removeListeners = Resources.__observableResourceRemoveListeners[uid];

                if (isNull(removeListeners)) {
                    removeListeners = Resources.__observableResourceRemoveListeners[uid] = [];
                }

                if (isString(value)) {
                    if (!isNull(resource.initialValue)) {
                        value = resource.initialValue;
                    } else {
                        resource.initialValue = value;
                    }
                    var listener = control.observeExpression(value, (newValue) => {
                        resource.value = newValue;
                    });
                    resource.value = control.evaluateExpression(value);
                    removeListeners.push(listener);
                }
            }

            /**
             * Removes observable resource listeners for a specified control.
             * 
             * @static
             * @param control The control whose listeners are being removed.
             */
            static _removeListeners(control: ITemplateControl): void {
                if (isNull(control)) {
                    return;
                }

                var uid = control.uid,
                    removeListeners = Resources.__observableResourceRemoveListeners[uid];

                if (isArray(removeListeners)) {
                    var length = removeListeners.length;

                    for (var i = 0; i < length; ++i) {
                        removeListeners[i]();
                    }
                }

                Resources.__observableResourceRemoveListeners[uid] = null;
                delete Resources.__observableResourceRemoveListeners[uid];
            }

            private static __controlResources = ['control', 'context', 'root', 'rootContext'];
            private static __resourceTypes = ['injectable', 'object', 'observable', 'function'];
            private static __observableResourceRemoveListeners: IObject<Array<IRemoveListener>> = {};

            /**
             * Adds a '@root' alias and '@rootContext' to a control, specifying that it contains the root 
             * and root context. Root controls are the root IViewControl.
             * 
             * @param control The root IViewControl.
             */
            private static __addRoot(control: IViewControl): void {
                control.resources.add({
                    root: {
                        value: control,
                        type: 'object',
                        alias: 'root'
                    },
                    rootContext: {
                        value: control.context,
                        type: 'observable',
                        alias: 'rootContext'
                    }
                });
            }

            private __resources: IObject<IResource> = {};
            private __bound: boolean = false;
            private __controlInstance: ITemplateControl;

            initialize(control: ITemplateControl, element?: Element): void;
            initialize(control: ITemplateControl, resources?: IObject<IResource>): void;
            initialize(control: ITemplateControl, resources?: IResources): void;
            initialize(controlInstance: ITemplateControl, resources?: any) {
                this.__controlInstance = controlInstance;

                if (isNull(resources)) {
                    return;
                } else if (isNode(resources)) {
                    resources = Resources.parseElement(resources);
                } else if (isObject(resources.resources)) {
                    resources = resources.resources;
                }

                this.__resources = resources;

                var keys = Object.keys(resources),
                    key: string,
                    injector: dependency.IInjector<any>,
                    length = keys.length;

                for (var i = 0; i < length; ++i) {
                    key = keys[i];
                    (<any>this)[key] = resources[key];
                }
            }

            add(resources: IObject<IResource>): void;
            add(element: Element): void;
            add(resources: any) {
                if (isNull(resources)) {
                    return;
                } else if (isNode(resources)) {
                    resources = Resources.parseElement(resources);
                }

                var keys = Object.keys(resources),
                    length = keys.length,
                    resource: IResource,
                    control = this.__controlInstance,
                    bound = this.__bound,
                    key: string,
                    create = Resources.create;

                for (var i = 0; i < length; ++i) {
                    key = keys[i];
                    resource = resources[key];
                    resource.alias = key;

                    (<any>this)[key] = this.__resources[key] = bound ? create(control, resource) : resource;
                }
            }
        }

        /**
         * The Type for referencing the '$ResourcesFactory' injectable as a dependency.
         */
        export function IResourcesFactory(
            $ContextManagerStatic?: observable.IContextManagerStatic,
            $Regex?: expressions.IRegex): IResourcesFactory {
                Resources.$ContextManagerStatic = $ContextManagerStatic;
                Resources.$Regex = $Regex;
                return Resources;
        }

        register.injectable(__ResourcesFactory, IResourcesFactory, [
            __ContextManagerStatic,
            __Regex
        ], register.FACTORY);

        /**
         * Creates and manages IResources for TemplateControls.
         */
        export interface IResourcesFactory {
            /**
             * Populates an IResource value if necessary, and adds it to the given
             * control's resources.
             *
             * @static
             * @param control The control for which to create a resource.
             * @param resource The IResource used to set the value.
             */
            create(control: ITemplateControl, resource: IResource): IResource;

            /**
             * Adds resource aliases for '@control' and '@context'. The resources are
             * aliases for the control instance and the control.context.
             *
             * @static
             * @param control The control on which to add the resources.
             */
            addControlResources(control: ITemplateControl): void;

            /**
             * Binds the resources in a resource instance. This involves injecting
             * the injectable resources, creating object/observable resources, and
             * binding functions to the associated control's instance.
             *
             * @static
             * @param resourcesInstance The instance of the IResources object.
             */
            bindResources(resourcesInstance: IResources): void;

            /**
             * Disposes a resource instance, removing its reference
             * from a control and breaking references to all resource
             * objects.
             * 
             * @static
             * @param control The control whose resources will be disposed.
             * @param persist Whether or not to persist a resource object post 
             * disposal or set it to null.
             */
            dispose(control: ITemplateControl, persist?: boolean): void;

            /**
             * Parses a resources Element and creates
             * an IObject<IResource> with its element children.
             *
             * @static
             * @param element The resources element to parse.
             * 
             * @return {IObject<IResource>} The resources created
             * using element.
             */
            parseElement(element: Element): IObject<IResource>;

            /**
             * Returns a new instance of IResources
             * 
             * @static
             */
            getInstance(): IResources;
        }

        /**
         * Resources are used for providing aliases to use in markup expressions. They 
         * are particularly useful when trying to access properties outside of the 
         * current context, as well as reassigning context at any point in an app.
         * 
         * By default, every control has a resource for '@control' and '@context'.
         * IViewControl objects also have a resource for '@root' and '@rootContext', 
         * which is a reference to the control and its context.
         * 
         * Resources can be created in HTML, or through the exposed control.resources 
         * object. If specified in HTML, they must be the first element child of the 
         * control upon which the resources will be placed. IViewControls that use a 
         * templateUrl can have resources as their first element in the templateUrl.
         * 
         * @example 
         * <custom-control>
         *     <plat-resources>
         *         <injectable alias="Cache">$CacheFactory</injectable>
         *         <observable alias="testObj">
         *              { 
         *                  foo: 'foo', 
         *                  bar: 'bar', 
         *                  baz: 2 
         *              }
         *         </observable>
         *     </plat-resources>
         * </custom-control>
         * 
         * In the above example, the resources can be accessed by using '@Cache' and '@testObj'.
         * The type of resource is denoted by the element name.
         * 
         * Only resources of type 'observable' will have data binding. The types of resources are:
         * function, injectable, observable, and object. Resources of type 'function' will have their
         * associated function context bound to the control that contains the resource.
         * 
         * When an alias is found in a markup expression, the framework will search up the control chain 
         * to find the alias on a control's resources. This first matching alias will be used.
         */
        export interface IResources {
            /**
             * Used for programatically adding IResource objects.
             * 
             * @param resources An IObject<IResource> used to add 
             * resources, keyed by their alias.
             * 
             * @example control.resources.add({
             *     myAlias: {
             *         type: 'observable',
             *         value: { 
             *             hello: 'Hello World!'
             *         } 
             *     }
             * });
             */
            add(resources: IObject<IResource>): void;
            /**
             * Used for programatically adding IResource objects.
             * 
             * @param element An Element containing resource element children.
             * 
             * @example
             *     <plat-resources>
             *         <injectable alias="Cache">$CacheFactory</injectable>
             *         <observable alias="testObj">{ foo: 'foo', bar: 'bar', baz: 2 }</observable>
             *     </plat-resources>
             * 
             * The resource type is specified by the element name.
             */
            add(element: Element): void;

            /**
             * @param control The control containing this Resources instance.
             * @param element An optional element used to create initial IResource objects.
             */
            initialize(control: ITemplateControl, element?: Element): void;
            /**
             * @param control The control containing this Resources instance.
             * @param resources An optional IObject<IResource> used to populate initial
             * IResource objects.
             */
            initialize(control: ITemplateControl, resources?: IObject<IResource>): void;
            /**
             * @param control The control containing this Resources instance.
             * @param element An optional IResources object used to populate initial 
             * IResource objects.
             */
            initialize(control: ITemplateControl, resources?: IResources): void;
        }

        /**
         * Defines a single resource on the IResources object.
         */
        export interface IResource {
            /**
             * The type of resource.
             * - injectable
             * - observable
             * - object
             * - function
             */
            type: string;

            /**
             * The alias used to reference the Resource.
             */
            alias?: string;

            /**
             * The value of the Resource
             */
            value?: any;

            /**
             * The initial value prior to it being observed.
             */
            initialValue?: any;
        }

        /**
         * A class for managing DOM event registration and handling.
         */
        export class DomEvents implements IDomEvents {
            /**
             * A configuration object for all DOM events.
             */
            static config: IDomEventsConfig = {
                /**
                 * An object containing the different time intervals that govern the behavior of certain 
                 * custom DOM events.
                 */
                intervals: {
                    /**
                     * The max time in milliseconds a user can hold down on the screen 
                     * for a tap event to be fired.
                     */
                    tapInterval: 200,
                    /**
                     * The max time in milliseconds a user can wait between consecutive 
                     * taps for a dbltap event to be fired.
                     */
                    dblTapInterval: 300,
                    /**
                     * The time in milliseconds a user must hold down on the screen 
                     * before a hold event is fired or a release event can be fired.
                     */
                    holdInterval: 400,
                    /**
                     * The delay in milliseconds between the time a user taps to the time 
                     * the tap event fires. Used in the case where a double-tap-to-zoom 
                     * feature is required.
                     */
                    dblTapZoomDelay: 0
                },
                /**
                 * An object containing the different minimum/maximum distances that govern the behavior of certain 
                 * custom DOM events.
                 */
                distances: {
                    /**
                     * The minimum distance a user must move after touch down to register 
                     * it as a scroll instead of a tap.
                     */
                    minScrollDistance: 5,
                    /**
                     * The maximum distance between consecutive taps a user is allowed to 
                     * register a dbltap event.
                     */
                    maxDblTapDistance: 20
                },
                /**
                 * An object containing the different minimum/maximum velocities that govern the behavior of certain 
                 * custom DOM events.
                 */
                velocities: {
                    /**
                     * The minimum velocity a user must move after touch down to register 
                     * a swipe event.
                     */
                    minSwipeVelocity: 0.5
                },
                /**
                 * The default CSS styles applied to elements listening for custom DOM events.
                 */
                styleConfig: [{
                    /**
                     * The className that will be used to define the custom style for 
                     * allowing the best touch experience. This class is added to every 
                     * element that registers for a custom DOM event (denoted by a prefixed '$').
                     */
                    className: 'plat-gesture',
                    /**
                     * An array of string styles to be placed on an element to allow for the 
                     * best touch experience. In the format 'CSS identifier: value'
                     * (i.e. 'width : 100px')
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
                     * The className that will be used to define the custom style for 
                     * blocking touch action scrolling, zooming, etc on the element.
                     */
                    className: 'plat-no-touch-action',
                    /**
                     * An array of string styles that block touch action scrolling, zooming, etc. 
                     * Primarily useful on elements such as a canvas.
                     * In the format 'CSS identifier: value'
                     * (i.e. 'width : 100px')
                     */
                    styles: [
                        '-ms-touch-action: none',
                        'touch-action: none'
                    ]
                }]
            };

            $Document: Document = acquire(__Document);
            $Compat: ICompat = acquire(__Compat);

            /**
             * Whether or not the DomEvents are currently active. 
             * They become active at least one element on the current 
             * page is listening for a custom event.
             */
            _isActive: boolean;

            /**
             * Whether or not the user is currently touching the screen.
             */
            _inTouch: boolean;

            /**
             * The array of all elements currently registered for 
             * DOM events.
             */
            _elements: Array<Node> = [];

            /**
             * An array of subscriptions that keep track of all of the 
             * events registered on a particular element.
             */
            _subscriptions: Array<IEventSubscription> = [];

            /**
             * The touch start events defined by this browser.
             */
            _startEvents: Array<string>;

            /**
             * The touch move events defined by this browser.
             */
            _moveEvents: Array<string>;

            /**
             * The touch end events defined by this browser.
             */
            _endEvents: Array<string>;

            /**
             * An object containing the event types for all of the 
             * supported gestures.
             */
            _gestures: IGestures<string> = {
                $tap: '$tap',
                $dbltap: '$dbltap',
                $hold: '$hold',
                $release: '$release',
                $swipe: '$swipe',
                $swipeleft: '$swipeleft',
                $swiperight: '$swiperight',
                $swipeup: '$swipeup',
                $swipedown: '$swipedown',
                $track: '$track',
                $trackleft: '$trackleft',
                $trackright: '$trackright',
                $trackup: '$trackup',
                $trackdown: '$trackdown'
            };

            /**
             * An object containing the number of currently active 
             * events of each type.
             */
            _gestureCount: IGestures<number> = {
                $tap: 0,
                $dbltap: 0,
                $hold: 0,
                $release: 0,
                $swipe: 0,
                $track: 0
            };

            private __START = 'start';
            private __MOVE = 'move';
            private __END = 'end';
            private __detectMove = false;
            private __hasMoved = false;
            private __hasSwiped = false;
            private __hasRelease = false;
            private __tapCount = 0;
            private __touchCount = 0;
            private __tapTimeout: number;
            private __holdTimeout: number;
            private __cancelRegex = /cancel/i;
            private __pointerEndRegex = /up|cancel/i;
            private __lastTouchDown: ITouchPoint;
            private __lastTouchUp: ITouchPoint;
            private __swipeOrigin: ITouchPoint;
            private __lastMoveEvent: IPointerEvent;
            private __capturedTarget: Node;
            private __mappedEventListener = this.__handleMappedEvent.bind(this);
            private __reverseMap = {};
            private __swipeSubscribers: { master: IDomEventInstance; directional: IDomEventInstance };
            private __pointerHash: IObject<IPointerEvent> = {};
            private __pointerEvents: Array<IPointerEvent> = [];
            private __listeners: ICustomEventListener = {
                start: this._onTouchStart.bind(this),
                move: this._onMove.bind(this),
                end: this._onTouchEnd.bind(this)
            };

            /**
             * Retrieve the type of touch events for this browser and create the default gesture style.
             */
            constructor() {
                this.__getTypes();
            }

            addEventListener(element: Node, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
            addEventListener(element: Window, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
            addEventListener(element: any, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener {
                var $compat = this.$Compat,
                    mappedGestures = $compat.mappedEvents,
                    mappedType = mappedGestures[type],
                    mappingExists = !isNull(mappedType),
                    mappedRemoveListener = noop,
                    mappedTouchRemoveListener = noop,
                    gestures = this._gestures;

                if (mappingExists) {
                    (<any>this.__reverseMap)[mappedType] = type;
                    this.__registerElement(element, type);
                    mappedRemoveListener = this.__addMappedEvent(mappedType, useCapture);
                    if ($compat.hasTouchEvents) {
                        mappedType = mappedType
                            .replace('touch', 'mouse')
                            .replace('start', 'down')
                            .replace('end', 'up');
                        (<any>this.__reverseMap)[mappedType] = type;
                        mappedTouchRemoveListener = this.__addMappedEvent(mappedType, useCapture);
                    }
                }

                element.addEventListener(type, listener, useCapture);

                if (!isUndefined(element['on' + type]) || isUndefined((<any>gestures)[type]) || mappingExists) {
                    return () => {
                        mappedRemoveListener();
                        mappedTouchRemoveListener();
                        element.removeEventListener(type, listener, useCapture);
                    };
                }

                var swipeGesture = gestures.$swipe,
                    trackGesture = gestures.$track,
                    countType = type;

                if (type.indexOf(trackGesture) !== -1) {
                    countType = trackGesture;
                } else if (type.indexOf(swipeGesture) !== -1) {
                    countType = swipeGesture;
                }

                this.__registerElement(element, type);
                (<any>this._gestureCount)[countType]++;

                return () => {
                    this.__removeEventListener(element, type, listener, useCapture);
                };
            }

            dispose(): void {
                this.__unregisterTypes();

                this._gestureCount = {
                    $tap: 0,
                    $dbltap: 0,
                    $hold: 0,
                    $release: 0,
                    $swipe: 0,
                    $track: 0
                };
                this._isActive = false;
                this._elements = [];
                this._subscriptions = [];
                this.__pointerEvents = [];
                this.__pointerHash = {};
                this.__reverseMap = {};
                this.__tapCount = 0;
                this.__touchCount = 0;
                this.__swipeOrigin = null;
                this.__lastMoveEvent = null;
                this.__lastTouchDown = null;
                this.__lastTouchUp = null;
                this.__capturedTarget = null;
            }

            /**
             * A listener for touch/mouse start events.
             * 
             * @param ev The touch start event object.
             */
            _onTouchStart(ev: IPointerEvent): void {
                var isTouch = ev.type !== 'mousedown';

                // return immediately if mouse event and currently in a touch
                if (!!this._inTouch && !isTouch) {
                    return;
                } else if (isTouch) {
                    this._inTouch = isTouch;
                }

                this.__standardizeEventObject(ev);

                if ((this.__touchCount = ev.touches.length) > 1) {
                    return;
                }

                this.__hasMoved = false;

                this.__lastTouchDown = this.__swipeOrigin = {
                    x: ev.clientX,
                    y: ev.clientY,
                    target: ev.target,
                    timeStamp: ev.timeStamp
                };

                var gestureCount = this._gestureCount,
                    noHolds = gestureCount.$hold <= 0,
                    noRelease = gestureCount.$release <= 0;

                // check to see if we need to detect movement
                if (gestureCount.$tap > 0 || gestureCount.$dbltap > 0 ||
                    gestureCount.$track > 0 || gestureCount.$swipe > 0) {
                    this.__lastMoveEvent = null;
                    this.__detectMove = true;
                    this.__registerType(this.__MOVE);
                }

                // return if no hold or release events are registered
                if (noHolds && noRelease) {
                    return;
                }

                var holdInterval = DomEvents.config.intervals.holdInterval,
                    domEvent: IDomEventInstance,
                    subscribeFn: () => void;

                if (noHolds) {
                    this.__holdTimeout = setTimeout(() => {
                        this.__hasRelease = true;
                    }, holdInterval);
                    return;
                } else if (noRelease) {
                    domEvent = this.__findFirstSubscriber(<Node>ev.target, this._gestures.$hold);
                    subscribeFn = () => {
                        domEvent.trigger(ev);
                        this.__holdTimeout = null;
                    };
                } else {
                    // has both hold and release events registered
                    domEvent = this.__findFirstSubscriber(<Node>ev.target, this._gestures.$hold);
                    subscribeFn = () => {
                        domEvent.trigger(ev);
                        this.__hasRelease = true;
                        this.__holdTimeout = null;
                    };
                }

                // set timeout to fire the subscribeFn
                if (!isNull(domEvent)) {
                    this.__holdTimeout = setTimeout(subscribeFn, holdInterval);
                }
            }

            /**
             * A listener for touch/mouse move events.
             * 
             * @param ev The touch start event object.
             */
            _onMove(ev: IPointerEvent): void {
                // return immediately if we should not be detecting move, 
                // if there are multiple touches present, or 
                // if it is a mouse event and currently in a touch
                if (!this.__detectMove ||
                    this.__touchCount > 1 ||
                    (!!this._inTouch && ev.type === 'mousemove')) {
                    return;
                }

                // clear hold event
                this.__clearHold();

                var gestureCount = this._gestureCount,
                    noTracking = gestureCount.$track <= 0,
                    noMoveEvents = gestureCount.$swipe <= 0 && noTracking,
                    noTapEvents = gestureCount.$dbltap <= 0 && gestureCount.$tap <= 0;

                // return if no move events and no tap events are registred
                if (noMoveEvents && noTapEvents) {
                    return;
                }

                this.__standardizeEventObject(ev);

                var config = DomEvents.config,
                    swipeOrigin = this.__swipeOrigin,
                    x = ev.clientX,
                    y = ev.clientY,
                    lastX = swipeOrigin.x,
                    lastY = swipeOrigin.y,
                    minMove = this.__getDistance(lastX, x, lastY, y) >= config.distances.minScrollDistance;

                // if minimum distance moved
                if (minMove) {
                    this.__hasMoved = true;
                } else {
                    // cannot call ev.preventDefault up top due to Chrome cancelling touch based scrolling
                    // call prevent default here to try and avoid mouse events when min move hasnt occurred
                    ev.preventDefault();
                }

                // if no move events or no tracking events and the user hasn't moved the minimum swipe distance
                if (noMoveEvents || (noTracking && !minMove)) {
                    return;
                }

                var lastMove = this.__lastMoveEvent,
                    direction = ev.direction = isNull(lastMove) ? this.__getDirection(x - lastX, y - lastY) :
                        this.__getDirection(x - lastMove.clientX, y - lastMove.clientY);

                if (this.__checkForOriginChanged(direction)) {
                    ev.preventDefault();
                }

                var velocity = ev.velocity = this.__getVelocity(x - swipeOrigin.x, y - swipeOrigin.y, ev.timeStamp - swipeOrigin.timeStamp);
                this.__hasSwiped = (this.__isHorizontal(direction) ? velocity.x : velocity.y) >= config.velocities.minSwipeVelocity;

                // if tracking events exist
                if (!noTracking) {
                    this.__handleTrack(ev);
                }

                this.__lastMoveEvent = ev;
            }

            /**
             * A listener for touch/mouse end events.
             * 
             * @param ev The touch start event object.
             */
            _onTouchEnd(ev: IPointerEvent): void {
                // call prevent default to try and avoid mouse events
                if (ev.type !== 'mouseup') {
                    this._inTouch = false;
                    ev.preventDefault();
                } else if (!isUndefined(this._inTouch)) {
                    return;
                }

                // clear hold event
                this.__clearHold();
                // set any captured target back to null
                this.__capturedTarget = null;

                this.__standardizeEventObject(ev);

                // return if the touch count was greater than 0
                if (ev.touches.length > 0) {
                    return;
                }

                // if we were detecting move events, unregister them
                if (this.__detectMove) {
                    this.__unregisterType(this.__MOVE);
                    this.__detectMove = false;
                }

                // if event cancelled
                if (this.__cancelRegex.test(ev.type)) {
                    this.__tapCount = 0;
                    this.__hasRelease = false;
                    this.__hasSwiped = false;
                    return;
                }
 
                // handle release events
                if (this.__hasRelease) {
                    this.__handleRelease(ev);
                }

                // handle swipe events
                if (this.__hasSwiped) {
                    this.__handleSwipe();
                }

                var config = DomEvents.config,
                    intervals = config.intervals,
                    touchEnd = ev.timeStamp;
            
                // if the user moved their finger (for scroll) or had their finger down too long to be 
                // considered a tap
                if (this.__hasMoved || ((touchEnd - this.__lastTouchDown.timeStamp) > intervals.tapInterval)) {
                    this.__tapCount = 0;
                    return;
                }

                var lastTouchUp = this.__lastTouchUp,
                    x = ev.clientX,
                    y = ev.clientY;

                // check if can be a double tap event by checking number of taps, distance between taps, 
                // and time between taps
                if (this.__tapCount > 0 &&
                    this.__getDistance(x, lastTouchUp.x, y, lastTouchUp.y) <= config.distances.maxDblTapDistance &&
                    ((touchEnd - lastTouchUp.timeStamp) <= intervals.dblTapInterval)) {
                    // handle dbltap events
                    this.__handleDbltap(ev);
                } else {
                    this.__tapCount = 0;
                }

                // handle tap events
                this.__handleTap(ev);

                this.__lastTouchUp = {
                    x: x,
                    y: y,
                    target: ev.target,
                    timeStamp: touchEnd
                };
            }

            // Gesture handling methods

            private __handleTap(ev: IPointerEvent): void {
                this.__tapCount++;

                if (this._gestureCount.$tap <= 0) {
                    return;
                }

                var gestures = this._gestures,
                    domEvent = this.__findFirstSubscriber(<Node>ev.target, gestures.$tap);

                if (isNull(domEvent)) {
                    return;
                }

                // fire tap event immediately if no dbltap zoom
                // or a mouse is being used
                if (DomEvents.config.intervals.dblTapZoomDelay <= 0 ||
                    ev.pointerType === 'mouse' || ev.type === 'mouseup') {
                    domEvent.trigger(ev);
                    return;
                }
            
                // setTimeout for tap delay in case of 
                // dbltap zoom
                this.__tapTimeout = setTimeout(() => {
                    domEvent.trigger(ev);
                    this.__tapCount = 0;
                    this.__tapTimeout = null;
                }, DomEvents.config.intervals.dblTapZoomDelay);
            
            }
            private __handleDbltap(ev: IPointerEvent): void {
                this.__tapCount = 0;

                if (!isNull(this.__tapTimeout)) {
                    clearTimeout(this.__tapTimeout);
                    this.__tapTimeout = null;
                }

                if (this._gestureCount.$dbltap <= 0) {
                    return;
                }

                var domEvent = this.__findFirstSubscriber(<Node>ev.target, this._gestures.$dbltap);
                if (isNull(domEvent)) {
                    return;
                }

                domEvent.trigger(ev);
                // set touch count to -1 to prevent repeated fire on sequential taps
                this.__tapCount = -1;
            }
            private __handleRelease(ev: IPointerEvent): void {
                var domEvent = this.__findFirstSubscriber(<Node>ev.target, this._gestures.$release);
                if (!isNull(domEvent)) {
                    domEvent.trigger(ev);
                }

                this.__hasRelease = false;
            }
            private __handleSwipe(): void {
                var lastMove = this.__lastMoveEvent;
                if (isNull(lastMove)) {
                    this.__hasSwiped = false;
                    return;
                }

                var swipeGesture = this._gestures.$swipe,
                    direction = lastMove.direction,
                    velocity = lastMove.velocity,
                    swipeDirectionGesture = swipeGesture + direction,
                    swipeSubscribers = this.__swipeSubscribers,
                    swipeDomEvent = swipeSubscribers.master,
                    swipeDirectionDomEvent = swipeSubscribers.directional;

                if (!isNull(swipeDomEvent)) {
                    swipeDomEvent.trigger(lastMove);
                }

                if (!isNull(swipeDirectionDomEvent)) {
                    swipeDirectionDomEvent.trigger(lastMove);
                }

                this.__hasSwiped = false;
                this.__lastMoveEvent = null;
                this.__swipeSubscribers = null;
            }
            private __handleTrack(ev: IPointerEvent): void {
                var trackGesture = this._gestures.$track,
                    velocity = ev.velocity,
                    direction = ev.direction,
                    trackDirectionGesture = trackGesture + direction,
                    eventTarget = this.__capturedTarget || <Node>ev.target,
                    trackDomEvent = this.__findFirstSubscriber(eventTarget, trackGesture),
                    trackDirectionDomEvent = this.__findFirstSubscriber(eventTarget, trackDirectionGesture);

                if (!isNull(trackDomEvent)) {
                    ev.preventDefault();
                    trackDomEvent.trigger(ev);
                }

                if (!isNull(trackDirectionDomEvent)) {
                    ev.preventDefault();
                    trackDirectionDomEvent.trigger(ev);
                }
            }
            private __handleMappedEvent(ev: IExtendedEvent): void {
                var mappedType = ev.type,
                    eventType = (<any>this.__reverseMap)[mappedType],
                    domEvent = this.__findFirstSubscriber(<Node>ev.target, eventType);

                if (isNull(domEvent)) {
                    return;
                }

                this.__standardizeEventObject(ev);
                domEvent.trigger(ev);
            }

            // Touch type and element registration

            private __getTypes(): void {
                var $compat = this.$Compat,
                    touchEvents = $compat.mappedEvents;

                if ($compat.hasTouchEvents) {
                    this._startEvents = [touchEvents.$touchStart, 'mousedown'];
                    this._moveEvents = [touchEvents.$touchMove, 'mousemove'];
                    this._endEvents = [touchEvents.$touchEnd, touchEvents.$touchCancel, 'mouseup'];
                    return;
                }

                var cancelEvent = touchEvents.$touchCancel;
                this._startEvents = [touchEvents.$touchStart];
                this._moveEvents = [touchEvents.$touchMove];
                this._endEvents = isNull(cancelEvent) ? [touchEvents.$touchEnd] : [touchEvents.$touchEnd, cancelEvent];
            }
            private __registerTypes(): void {
                this.__registerType(this.__START);
                this.__registerType(this.__END);
            }
            private __unregisterTypes(): void {
                this.__unregisterType(this.__START);
                this.__unregisterType(this.__MOVE);
                this.__unregisterType(this.__END);
            }
            private __registerType(event: string): void {
                var events: Array<string>,
                    listener = this.__listeners[event],
                    $document = this.$Document;

                switch (event) {
                    case this.__START:
                        events = this._startEvents;
                        break;
                    case this.__MOVE:
                        events = this._moveEvents;
                        break;
                    case this.__END:
                        events = this._endEvents;
                        break;
                    default:
                        return;
                }

                var index = events.length;
                while (index-- > 0) {
                    $document.addEventListener(events[index], listener, false);
                }
            }
            private __unregisterType(event: string): void {
                var events: Array<string>,
                    listener = this.__listeners[event],
                    $document = this.$Document;

                switch (event) {
                    case this.__START:
                        events = this._startEvents;
                        break;
                    case this.__MOVE:
                        events = this._moveEvents;
                        break;
                    case this.__END:
                        events = this._endEvents;
                        break;
                    default:
                        return;
                }

                var index = events.length;
                while (index-- > 0) {
                    $document.removeEventListener(events[index], listener, false);
                }
            }
            private __registerElement(element: Node, type: string): void {
                var index = this._elements.indexOf(element),
                    $domEvent: IDomEventInstance = acquire(__DomEventInstance);

                $domEvent.initialize(element, type);

                // check if DomEvents is ready
                if (!this._isActive) {
                    this.__registerTypes();

                    if (isNull(this._isActive)) {
                        this.__appendGestureStyle();
                    }

                    this._isActive = true;
                }

                if (index === -1) {
                    var gesture = { gestureCount: 1 };
                    (<any>gesture)[type] = $domEvent;

                    index = this._elements.length;
                    this._elements.push(element);
                    this._subscriptions.push(gesture);

                    if (!isUndefined((<HTMLElement>element).className)) {
                        addClass(<HTMLElement>element, DomEvents.config.styleConfig[0].className);
                    }
                    this.__removeSelections(element);
                } else {
                    var subscription = this._subscriptions[index];
                    if (isUndefined((<any>subscription)[type])) {
                        (<any>subscription)[type] = $domEvent;
                        subscription.gestureCount++;
                    }
                }
            }
            private __unregisterElement(element: Node, type: string): void {
                var elementIndex = this._elements.indexOf(element);
                if (elementIndex === -1) {
                    return;
                }

                var gestureIndicator = this._subscriptions[elementIndex];
                (<any>gestureIndicator)[type] = null;
                delete (<any>gestureIndicator)[type];
                gestureIndicator.gestureCount--;

                if (gestureIndicator.gestureCount === 0) {
                    this._subscriptions.splice(elementIndex, 1);
                    this.__removeElement(elementIndex);

                    if (!isUndefined((<HTMLElement>element).className)) {
                        removeClass(<HTMLElement>element, DomEvents.config.styleConfig[0].className);
                    }
                }
            }
            private __setTouchPoint(ev: IPointerEvent): void {
                var eventType = ev.type,
                    $compat = this.$Compat,
                    noTouchEvents = !$compat.hasTouchEvents;

                if ($compat.hasPointerEvents) {
                    if (eventType === 'pointerdown') {
                        (<any>ev.target).setPointerCapture(ev.pointerId);
                    }

                    this.__updatePointers(ev, this.__pointerEndRegex.test(eventType));
                } else if ($compat.hasMsPointerEvents) {
                    if (eventType === 'MSPointerDown') {
                        (<any>ev.target).msSetPointerCapture(ev.pointerId);
                    }

                    switch (<any>ev.pointerType) {
                        case MSPointerEvent.MSPOINTER_TYPE_MOUSE:
                            ev.pointerType = 'mouse';
                            break;
                        case MSPointerEvent.MSPOINTER_TYPE_PEN:
                            ev.pointerType = 'pen';
                            break;
                        case MSPointerEvent.MSPOINTER_TYPE_TOUCH:
                            ev.pointerType = 'touch';
                            break;
                    }

                    this.__updatePointers(ev, this.__pointerEndRegex.test(eventType));
                } else if (eventType === 'mousedown') {
                    ev.pointerType = 'mouse';
                    var target = <Node>ev.target;
                    // capture the target if it's not the Document
                    if (!isDocument(target)) {
                        this.__capturedTarget = target;
                    }
                } else {
                    ev.pointerType = eventType.indexOf('mouse') === -1 ? 'touch' : 'mouse';
                }
            }
            private __updatePointers(ev: IPointerEvent, remove: boolean): void {
                var id = ev.pointerId,
                    pointer = this.__pointerHash[id];

                if (remove) {
                    if (!isUndefined(pointer)) {
                        this.__pointerEvents.splice(this.__pointerEvents.indexOf(pointer), 1);
                        delete this.__pointerHash[id];
                    }
                } else {
                    ev.identifier = ev.pointerId;
                    if (isUndefined(pointer)) {
                        this.__pointerEvents.push(ev);
                    } else {
                        this.__pointerEvents.splice(this.__pointerEvents.indexOf(pointer), 1, ev);
                    }

                    this.__pointerHash[id] = ev;
                }
            }

            // Event and subscription handling

            private __findFirstSubscriber(eventTarget: Node, type: string): IDomEventInstance {
                var elements = this._elements,
                    gestures: IEventSubscription,
                    domEvent: IDomEventInstance,
                    index: number;

                do {
                    if ((index = elements.indexOf(eventTarget)) !== -1) {
                        gestures = this._subscriptions[index];
                        domEvent = (<any>gestures)[type];
                        if (isUndefined(domEvent)) {
                            continue;
                        }

                        return domEvent;
                    }
                } while (!isNull(eventTarget = eventTarget.parentNode));
            }
            private __addMappedEvent(mappedEvent: string, useCapture?: boolean): IRemoveListener {
                var $document = this.$Document;
                $document.addEventListener(mappedEvent, this.__mappedEventListener, useCapture);

                return () => {
                    $document.removeEventListener(mappedEvent, this.__mappedEventListener, useCapture);
                };
            }
            private __removeEventListener(element: Node, type: string, listener: IGestureListener, useCapture?: boolean): void {
                var gestures = this._gestures;

                element.removeEventListener(type, listener, useCapture);

                var swipeGesture = gestures.$swipe,
                    trackGesture = gestures.$track,
                    countType = type;

                if (type.indexOf(trackGesture) !== -1) {
                    countType = trackGesture;
                } else if (type.indexOf(swipeGesture) !== -1) {
                    countType = swipeGesture;
                }

                this.__unregisterElement(element, type);
                (<any>this._gestureCount)[countType]--;
            }
            private __removeElement(index: number): void {
                var elements = this._elements;
                this.__returnSelections(elements[index]);
                elements.splice(index, 1);

                // check if no elements are left listening
                if (elements.length === 0) {
                    this.__unregisterTypes();
                    this._isActive = false;
                }
            }
            private __standardizeEventObject(ev: IExtendedEvent): void {
                this.__setTouchPoint(ev);

                ev.touches = ev.touches || this.__pointerEvents;

                var evtObj = ev;
                if (isUndefined(ev.clientX)) {
                    if (ev.touches.length > 0) {
                        evtObj = ev.touches[0];
                    } else if (((<any>ev).changedTouches || []).length > 0) {
                        evtObj = (<any>ev).changedTouches[0];
                    }

                    ev.clientX = evtObj.clientX;
                    ev.clientY = evtObj.clientY;
                }

                if (isUndefined(ev.offsetX)) {
                    var offset = this.__getOffset(ev);
                    ev.offsetX = offset.x;
                    ev.offsetY = offset.y;
                }
            }
            private __getOffset(ev: IExtendedEvent): IPoint {
                var target = (<any>ev.target);
                if (isDocument(target)) {
                    return {
                        x: ev.clientX,
                        y: ev.clientY
                    };
                }

                var x = target.offsetLeft,
                    y = target.offsetTop;
                while (!isNull(target = target.offsetParent)) {
                    x += target.offsetLeft;
                    y += target.offsetTop;
                }

                return {
                    x: ev.clientX - x,
                    y: ev.clientY - y
                };
            }
            private __clearHold(): void {
                if (!isNull(this.__holdTimeout)) {
                    clearTimeout(this.__holdTimeout);
                    this.__holdTimeout = null;
                }
            }

            // Utility methods

            private __getDistance(x1: number, x2: number, y1: number, y2: number): number {
                var x = Math.abs(x2 - x1),
                    y = Math.abs(y2 - y1);
                return Math.sqrt((x * x) + (y * y));
            }
            private __getVelocity(dx: number, dy: number, dt: number): IVelocity {
                return {
                    x: Math.abs(dx / dt) || 0,
                    y: Math.abs(dy / dt) || 0
                };
            }
            private __getDirection(dx: number, dy: number): string {
                var distanceX = Math.abs(dx),
                    distanceY = Math.abs(dy);

                if (distanceY > distanceX) {
                    return dy < 0 ? 'up' : 'down';
                }

                return dx < 0 ? 'left' : 'right';
            }
            private __checkForOriginChanged(direction: string): boolean {
                var lastMove = this.__lastMoveEvent;
                if (isNull(lastMove)) {
                    this.__hasSwiped = false;
                    return this.__checkForRegisteredSwipe(direction);
                }

                var swipeDirection = lastMove.direction;
                if (swipeDirection === direction) {
                    return false;
                }

                this.__swipeOrigin = {
                    x: lastMove.clientX,
                    y: lastMove.clientY,
                    target: lastMove.target,
                    timeStamp: lastMove.timeStamp
                };

                this.__hasSwiped = false;
                return this.__checkForRegisteredSwipe(direction);
            }
            private __checkForRegisteredSwipe(direction: string): boolean {
                var swipeTarget = <Node>this.__swipeOrigin.target,
                    swipeGesture = this._gestures.$swipe,
                    swipeDirectionGesture = swipeGesture + direction,
                    domEventSwipe = this.__findFirstSubscriber(swipeTarget, swipeGesture),
                    domEventSwipeDirection = this.__findFirstSubscriber(swipeTarget, swipeDirectionGesture);

                this.__swipeSubscribers = {
                    master: domEventSwipe,
                    directional: domEventSwipeDirection
                };

                return !isNull(domEventSwipe) || !isNull(domEventSwipeDirection);
            }
            private __isHorizontal(direction: string): boolean {
                return direction === 'left' || direction === 'right';
            }
            private __appendGestureStyle(): void {
                var $document = this.$Document,
                    head = $document.head,
                    style = <HTMLStyleElement>$document.createElement('style');

                style.type = 'text/css';
                style.textContent = this.__createStyle();
                head.appendChild(style);
            }
            private __createStyle(): string {
                var styleClasses = DomEvents.config.styleConfig,
                    classLength = styleClasses.length,
                    styleClass: IDefaultStyle,
                    styles: Array<string>,
                    j: number,
                    styleLength: number,
                    style = '',
                    textContent: string;

                for (var i = 0; i < classLength; ++i) {
                    styleClass = styleClasses[i];
                    styles = styleClass.styles || [];
                    styleLength = styles.length;
                    style += '.' + styleClass.className + ' {\n';
                    textContent = '';

                    for (j = 0; j < styleLength; ++j) {
                        textContent += styles[j] + ';\n';
                    }

                    style += textContent + '}\n';
                }

                return style;
            }
            private __removeSelections(element: Node): void {
                if (isNull(element) || isNull(element.nodeName)) {
                    return;
                }

                if (!isUndefined((<any>element).onselectstart)) {
                    element.addEventListener('selectstart', this.__preventDefault, false);
                }
                if (!isUndefined((<any>element).ondragstart)) {
                    element.addEventListener('dragstart', this.__preventDefault, false);
                }
            }
            private __returnSelections(element: Node): void {
                if (isNull(element) || isNull(element.nodeName)) {
                    return;
                }

                if (!isUndefined((<any>element).onselectstart)) {
                    element.removeEventListener('selectstart', this.__preventDefault, false);
                }
                if (!isUndefined((<any>element).ondragstart)) {
                    element.removeEventListener('dragstart', this.__preventDefault, false);
                }
            }
            private __preventDefault(ev: Event): boolean {
                var nodeName = (<Node>ev.target).nodeName;

                if (nodeName === 'input' || nodeName === 'textarea') {
                    return true;
                }

                ev.preventDefault();
                return false;
            }
        }

        /**
         * The Type for referencing the '$DomEvents' injectable as a dependency.
         */
        export function IDomEvents(): IDomEvents {
            return new DomEvents();
        }

        register.injectable(__DomEvents, IDomEvents);

        /**
         * Describes an object for managing DOM event registration and handling.
         */
        export interface IDomEvents {
            /**
             * Add an event listener for the specified event type on the specified element. 
             * 
             * @param element The node listening for the event.
             * @param type The type of event being listened to.
             * @param listener The listener to be fired.
             * @param useCapture Whether to fire the event on the capture or bubble phase of propagation.
             * @return {IRemoveListener} A function to remove the added event listener.
             */
            addEventListener(element: Node, type: string, listener: IGestureListener,
                useCapture?: boolean): IRemoveListener;
            /**
             * Add an event listener for the specified event type on the specified element. 
             * 
             * @param element The window object.
             * @param type The type of event being listened to.
             * @param listener The listener to be fired.
             * @param useCapture Whether to fire the event on the capture or bubble phase of propagation.
             * @return {IRemoveListener} A function to remove the added event listener.
             */
            addEventListener(element: Window, type: string, listener: IGestureListener,
                useCapture?: boolean): IRemoveListener;

            /**
             * Stops listening for touch events and resets the DomEvents instance.
             */
            dispose(): void;
        }

        /**
         * The Type for referencing the '$DomEventsConfig' injectable as a dependency.
         */
        export function IDomEventsConfig(): IDomEventsConfig {
            return DomEvents.config;
        }

        register.injectable(__DomEventsConfig, IDomEventsConfig);

        /**
         * A class for managing of a single custom event.
         */
        export class DomEvent implements IDomEventInstance {
            $Document: Document = acquire(__Document);

            element: any;
            event: string;

            initialize(element: Node, event: string): void;
            initialize(element: Window, event: string): void;
            initialize(element: any, event: string) {
                this.element = element;
                this.event = event;
            }

            trigger(ev: IPointerEvent): void {
                var event = <CustomEvent>this.$Document.createEvent('CustomEvent');
                event.initCustomEvent(this.event, true, true, ev);
                this.element.dispatchEvent(event);
            }
        }

        /**
         * The Type for referencing the '$DomEventInstance' injectable as a dependency.
         */
        export function IDomEventInstance(): IDomEventInstance {
            return new DomEvent();
        }

        register.injectable(__DomEventInstance, IDomEventInstance, null, register.INSTANCE);

        /**
         * Describes an object used for managing a single custom event.
         */
        export interface IDomEventInstance {
            /**
             * The node or window object associated with this DomEvent object.
             */
            element: any;

            /**
             * The event type associated with this DomEvent.
             */
            event: string;

            /**
             * Initializes the element and event of the DomEvent object
             * 
             * @param The node associated with this DomEvent. 
             * @param event The type of event this DomEvent is managing.
             */
            initialize(element: Node, event: string): void;
            /**
             * Initializes the element and event of the DomEvent object
             * 
             * @param The window object. 
             * @param event The type of event this DomEvent is managing.
             */
            initialize(element: Window, event: string): void;

            /**
             * Triggers a custom event to bubble up to all elements in this branch of the DOM tree.
             * 
             * @param ev The event object to pass in as the custom event object's detail property.
             */
            trigger(ev: IPointerEvent): void;
        }

        /**
         * Describes the touch event listeners for the document.
         */
        interface ICustomEventListener extends IObject<EventListener> {
            /**
             * The touch start event.
             */
            start: EventListener;
            /**
             * The touch end event.
             */
            end: EventListener;
            /**
             * The touch move event.
             */
            move: EventListener;
        }

        /**
         * An extended event object potentially containing coordinate and movement information.
         */
        export interface IExtendedEvent extends Event {
            /**
             * The x-coordinate of the event on the screen relative to the upper left corner of the 
             * browser window. This value cannot be affected by scrolling.
             */
            clientX?: number;

            /**
             * The y-coordinate of the event on the screen relative to the upper left corner of the 
             * browser window. This value cannot be affected by scrolling.
             */
            clientY?: number;

            /**
             * The x-coordinate of the event on the screen relative to the upper left corner of the 
             * physical screen or monitor.
             */
            screenX?: number;

            /**
             * The y-coordinate of the event on the screen relative to the upper left corner of the 
             * physical screen or monitor.
             */
            screenY?: number;

            /**
             * The x-coordinate of the event on the screen relative to the upper left corner of the 
             * fully rendered content area in the browser window. This value can be altered and/or affected by 
             * embedded scrollable pages when the scroll bar is moved.
             */
            pageX?: number;

            /**
             * The y-coordinate of the event on the screen relative to the upper left corner of the 
             * fully rendered content area in the browser window. This value can be altered and/or affected by 
             * embedded scrollable pages when the scroll bar is moved.
             */
            pageY?: number;

            /**
             * The x-coordinate of the event relative to the top-left corner of the 
             * offsetParent element that fires the event.
             */
            offsetX?: number;

            /**
             * The y-coordinate of the event relative to the top-left corner of the 
             * offsetParent element that fires the event.
             */
            offsetY?: number;

            /**
             * The potential direction associated with the event.
             */
            direction?: string;

            /**
             * The potential velocity associated with the event.
             */
            velocity?: IVelocity;

            /**
             * An array containing all current touch points. The IExtendedEvents 
             * may slightly differ depending on the browser implementation.
             */
            touches?: Array<IExtendedEvent>;
        }

        /**
         * An extended event object potentially containing coordinate and movement information as 
         * well as pointer type for pointer events.
         */
        export interface IPointerEvent extends IExtendedEvent {
            /**
             * The type of interaction associated with the touch event ('touch', 'pen', 'mouse', '')
             */
            pointerType?: string;

            /**
             * A unique touch identifier.
             */
            pointerId?: number;

            /**
             * A unique touch identifier.
             */
            identifier?: number;
        }

        /**
         * The type of event object passed into the listeners for our custom events.
         */
        export interface IGestureEvent extends CustomEvent {
            /**
             * The detail object defined by the IExtendedEvent interface.
             */
            detail: IExtendedEvent;
        }

        /**
         * The listener interface for our custom DOM events.
         */
        export interface IGestureListener {
            /**
             * An EventListener with the argument as an IGestureEvent.
             */
            (ev: IGestureEvent): void;
        }

        /**
         * Describes an object to keep track of a single 
         * element's registered custom event types.
         */
        export interface IEventSubscription extends IGestures<IDomEventInstance> {
            /**
             * The total registered gesture count for the associated element.
             */
            gestureCount: number;
        }

        /**
         * Describes an object containing information 
         * regarding all our custom events.
         */
        export interface IGestures<T> {
            /**
             * The string type|number of events associated with the tap event.
             */
            $tap?: T;

            /**
             * The string type|number of events associated with the dbltap event.
             */
            $dbltap?: T;

            /**
             * The string type|number of events associated with the hold event.
             */
            $hold?: T;

            /**
             * The string type|number of events associated with the release event.
             */
            $release?: T;

            /**
             * The string type|number of events associated with the swipe event.
             */
            $swipe?: T;

            /**
             * The string type|number of events associated with the swipeleft event.
             */
            $swipeleft?: T;

            /**
             * The string type|number of events associated with the swiperight event.
             */
            $swiperight?: T;

            /**
             * The string type|number of events associated with the swipeup event.
             */
            $swipeup?: T;

            /**
             * The string type|number of events associated with the swipedown event.
             */
            $swipedown?: T;

            /**
             * The string type|number of events associated with the track event.
             */
            $track?: T;

            /**
             * The string type|number of events associated with the trackleft event.
             */
            $trackleft?: T;

            /**
             * The string type|number of events associated with the trackright event.
             */
            $trackright?: T;

            /**
             * The string type|number of events associated with the trackup event.
             */
            $trackup?: T;

            /**
             * The string type|number of events associated with the trackdown event.
             */
            $trackdown?: T;
        }

        /**
         * Describes an object containing information about a single point touched.
         */
        export interface ITouchPoint extends IPoint {
            /**
             * The touch target.
             */
            target: EventTarget;

            /**
             * The time of the touch.
             */
            timeStamp: number;
        }

        /**
         * Describes an object containing x and y coordinates
         */
        export interface IPoint {
            /**
             * The x-coordinate.
             */
            x: number;
        
            /**
             * The y-coordinate
             */
            y: number;
        }

        /**
         * Describes an object containing a speed in both the horiztonal and vertical directions.
         */
        export interface IVelocity extends IPoint {
            /**
             * The horizontal speed.
             */
            x: number;

            /**
             * The vertical speed.
             */
            y: number;
        }

        /**
         * Describes an object containing time interval information that 
         * governs the behavior of certain custom DOM events.
         */
        export interface IIntervals {
            /**
             * The max time in milliseconds a user can hold down on the screen 
             * for a tap event to be fired. Defaults to 200 ms.
             */
            tapInterval: number;

            /**
             * The max time in milliseconds a user can wait between consecutive 
             * taps for a dbltap event to be fired. Defaults to 300 ms.
             */
            dblTapInterval: number;

            /**
             * The time in milliseconds a user must hold down on the screen 
             * before a hold event is fired or a release event can be fired. 
             * Defaults to 400 ms.
             */
            holdInterval: number;

            /**
             * The delay in milliseconds between the time a user taps to the time 
             * the tap event fires. Used in the case where a double-tap-to-zoom 
             * feature is required. Defaults to 0 ms.
             */
            dblTapZoomDelay: number;
        }

        /**
         * Describes an object containing distance information that 
         * governs the behavior of certain custom DOM events.
         */
        export interface IDistances {
            /**
             * The minimum distance a user must move after touch down to register 
             * it as a scroll instead of a tap. Defaults to 5.
             */
            minScrollDistance: number;

            /**
             * The maximum distance between consecutive taps a user is allowed to 
             * register a dbltap event. Defaults to 20.
             */
            maxDblTapDistance: number;
        }

        /**
         * Describes an object containing velocity information that 
         * governs the behavior of certain custom DOM events.
         */
        export interface IVelocities {
            /**
             * The minimum velocity a user must move after touch down to register 
             * a swipe event. Defaults to 0.5.
             */
            minSwipeVelocity: number;
        }

        /**
         * Describes an object used for creating a custom class for styling an element.
         */
        export interface IDefaultStyle {
            /**
             * The className that will be used to define the custom style.
             */
            className: string;

            /**
             * An array of string styles in the format:
             * CSS identifier : value
             * (i.e. 'width : 100px')
             */
            styles: Array<string>;
        }

        /**
         * Describes a configuration object for all custom DOM events.
         */
        export interface IDomEventsConfig {
            /**
             * An object containing the different time intervals that govern the behavior of certain 
             * custom DOM events.
             */
            intervals: IIntervals;

            /**
             * An object containing the different minimum/maximum distances that govern the behavior of certain 
             * custom DOM events.
             */
            distances: IDistances;

            /**
             * An object containing the different minimum/maximum velocities that govern the behavior of certain 
             * custom DOM events.
             */
            velocities: IVelocities;

            /**
             * The default CSS styles applied to elements listening for custom DOM events.
             */
            styleConfig: Array<IDefaultStyle>;
        }

        export module controls {
            export class Baseport extends TemplateControl implements IBaseport {
                $ManagerCache: storage.ICache<processing.IElementManager> = acquire(__ManagerCache);
                $Document: Document = acquire(__Document);
                $ElementManagerFactory: processing.IElementManagerFactory = acquire(__ElementManagerFactory);

                constructor(public navigator: navigation.IBaseNavigator) {
                    super();
                }

                /**
                 * Clears the Baseport's innerHTML.
                 */
                setTemplate(): void {
                    this.dom.clearNode(this.element);
                }

                /**
                 * Initializes the navigator.
                 * 
                 * @param navigationParameter A parameter needed 
                 * to perform the specified type of navigation.
                 * @param options The IBaseNavigationOptions 
                 * needed on load for the inherited form of 
                 * navigation.
                 */
                loaded(navigationParameter?: any, options?: navigation.IBaseNavigationOptions): void {
                    var navigator = this.navigator;
                    navigator.initialize(this);
                    navigator.navigate(navigationParameter, options);
                }

                /**
                 * Grabs the root of this Baseport's manager 
                 * tree, clears it, and initializes the 
                 * creation of a new one by kicking off a 
                 * navigate.
                 * 
                 * @param ev The navigation options
                 */
                navigateTo(ev: IBaseportNavigateToOptions): void {
                    var control = ev.target,
                        parameter = ev.parameter,
                        options = ev.options,
                        element = this.element,
                        controlType = ev.type,
                        newControl = isFunction(control.inject);

                    var injectedControl = newControl ? control.inject() : control,
                        replaceType = injectedControl.replaceWith,
                        node = isEmpty(replaceType) ? this.$Document.createElement('div') :
                            <HTMLElement>this.$Document.createElement(replaceType),
                        attributes: IObject<string> = {},
                        nodeMap: processing.INodeMap = {
                            element: node,
                            attributes: attributes,
                            nodes: [],
                            uiControlNode: {
                                control: injectedControl,
                                nodeName: controlType,
                                expressions: [],
                                injector: control,
                                childManagerLength: 0
                            }
                        };

                    node.setAttribute('plat-control', controlType);
                    element.appendChild(node);

                    var viewportManager = this.$ManagerCache.read(this.uid);
                    viewportManager.children = [];

                    var manager = this.$ElementManagerFactory.getInstance();

                    manager.initialize(nodeMap, viewportManager, !newControl);

                    control = this.controls[0];
                    control.navigator = this.navigator;
                    this.navigator.navigated(control, parameter, options);

                    manager.setUiControlTemplate();
                }

                /**
                 * Manages the navigatingFrom lifecycle event for 
                 * ViewControls.
                 * 
                 * @param fromControl The ViewControl being navigated 
                 * away from.
                 */
                navigateFrom(fromControl: IViewControl): void {
                    if (isNull(fromControl) || !isFunction(fromControl.navigatingFrom)) {
                        return;
                    }

                    fromControl.navigatingFrom();
                }
            }

            /**
             * Navigation options for a Baseport and all 
             * controls that inherit from Baseport.
             */
            export interface IBaseportNavigateToOptions {
                /**
                 * Either a view control or an injector for a view control.
                 */
                target: any;

                /**
                 * The navigation parameter.
                 */
                parameter: any;

                /**
                 * The options used for navigation.
                 */
                options: navigation.IBaseNavigationOptions;

                /**
                 * The type of view control to navigate to.
                 */
                type: string;
            }

            export interface IBaseport extends ITemplateControl {
                /**
                 * The object in charge of performing the 
                 * navigation to and from different 
                 * ViewControls.
                 */
                navigator: navigation.IBaseNavigator;

                /**
                 * Grabs the root of this Baseport's manager 
                 * tree, clears it, and initializes the 
                 * creation of a new one by kicking off a 
                 * navigate.
                 * 
                 * @param ev The navigation options
                 */
                navigateTo(ev: IBaseportNavigateToOptions): void;

                /**
                 * Manages the navigatingFrom lifecycle event for 
                 * ViewControls.
                 * 
                 * @param fromControl The ViewControl being navigated 
                 * away from.
                 */
                navigateFrom(fromControl: IBaseViewControl): void;
            }

            export class Viewport extends Baseport {
                /**
                 * The evaluated plat-options object.
                 */
                options: observable.IObservableProperty<IViewportOptions>;

                /**
                 * A type of navigator that uses either the ViewControl's 
                 * Constructors or their registered names for navigation 
                 * from one to another.
                 */
                navigator: navigation.INavigatorInstance;

                /**
                 * Checks for a defaultView, finds the ViewControl's injector, 
                 * and initializes the loading of the view.
                 */
                loaded(): void {
                    var $exception: IExceptionStatic;
                    if (isNull(this.options)) {
                        $exception = acquire(__ExceptionStatic);
                        $exception.warn('No defaultView specified in plat-options for plat-viewport.',
                            $exception.NAVIGATION);
                        return;
                    }

                    var options = this.options.value || <IViewportOptions>{},
                        controlType = options.defaultView,
                        injector = viewControlInjectors[controlType];

                    if (isNull(injector)) {
                        $exception = acquire(__ExceptionStatic);
                        $exception.fatal('The defaultView ' + controlType + ' is not a registered view control.',
                            $exception.NAVIGATION);
                        return;
                    }

                    super.loaded(injector);
                }
            }

            /**
             * The available options for plat.ui.controls.Viewport.
             */
            export interface IViewportOptions {
                /**
                 * The registered name of the default 
                 * ViewControl to initially navigate to.
                 */
                defaultView: string;
            }

            register.control(__Viewport, Viewport, [__NavigatorInstance]);

            class Routeport extends Baseport {
                /**
                 * The evaluated plat-options object.
                 */
                options: observable.IObservableProperty<IRouteportOptions>;

                /**
                 * A type of navigator that uses the registered routes 
                 * for ViewControls to navigate to and from one another.
                 */
                navigator: navigation.IRoutingNavigator;

                /**
                 * Looks for a defaultRoute and initializes the loading 
                 * of the view.
                 */
                loaded(): void {
                    var path = '',
                        options = this.options;

                    if (!isNull(options) && !isNull(options.value)) {
                        path = options.value.defaultRoute || '';
                    }

                    super.loaded(path, {
                        replace: true
                    });
                }
            }

            /**
             * The available options for plat.ui.controls.Routeport.
             */
            export interface IRouteportOptions {
                /**
                 * The registered route of the default 
                 * ViewControl to initially navigate to.
                 */
                defaultRoute: string;
            }

            register.control(__Routeport, Routeport, [__RoutingNavigator]);

            export class Template extends TemplateControl {
                $Promise: async.IPromise = acquire(__Promise);
                $TemplateCache: storage.ITemplateCache = acquire(__TemplateCache);
                $Document: Document = acquire(__Document);

                /**
                 * Removes the <plat-template> node from the DOM
                 */
                replaceWith: string = null;

                /**
                 * The evaluated plat-options object.
                 */
                options: observable.IObservableProperty<ITemplateOptions>;

                /**
                 * The unique ID used to reference a particular 
                 * template.
                 */
                _id: string;

                /**
                 * The optional URL associated with this 
                 * particular template.
                 */
                _url: string;
                private __isFirst: boolean = false;
                private __templatePromise: async.IThenable<Template>;
                private __templateControlCache: storage.ICache<any>;
                constructor() {
                    super();
                    var $cacheFactory: storage.ICacheFactory = acquire(__CacheFactory);
                    this.__templateControlCache = $cacheFactory.create<any>('__templateControlCache');
                }

                /**
                 * Initializes the creation of the template.
                 */
                initialize(): void {
                    var templateControlCache = this.__templateControlCache,
                        id = this._id = this.options.value.id,
                        options = this.options.value;

                    if (isNull(id)) {
                        return;
                    }

                    this._url = options.url;

                    var templatePromise: async.IThenable<Template> = this.__templateControlCache.read(id);
                    if (!isNull(templatePromise)) {
                        this.__templatePromise = templatePromise;
                        return;
                    }

                    this.__isFirst = true;
                    this._initializeTemplate();
                }

                /**
                 * Decides if this is a template definition or 
                 * a template instance.
                 */
                loaded(): void {
                    if (!this.__isFirst) {
                        this._waitForTemplateControl(this.__templatePromise);
                    }
                }

                /**
                 * Removes the template from the template cache.
                 */
                dispose(): void {
                    if (this.__isFirst) {
                        this.__templateControlCache.dispose();
                    }
                }

                /**
                 * Determines whether a URL or innerHTML is being used, 
                 * creates the bindable template, and stores the template 
                 * in a template cache for later use.
                 */
                _initializeTemplate(): void {
                    var id = this._id;

                    if (isNull(id)) {
                        return;
                    }

                    var parentNode = this.endNode.parentNode,
                        url = this._url,
                        template: any;

                    if (!isNull(url)) {
                        template = this.$TemplateCache.read(url);
                        //determineTemplate sets the templateUrl so we need to reset it back to null
                        this.templateUrl = null;
                        this.dom.clearNodeBlock(this.elementNodes, parentNode);
                    } else {
                        template = this.$Document.createDocumentFragment();
                        this.dom.appendChildren(this.elementNodes, template);
                    }

                    var controlPromise: async.IThenable<ITemplateControl>;
                    if (isFunction(template.then)) {
                        controlPromise = template.catch((error: Error) => {
                            if (isNull(error)) {
                                return TemplateControl.determineTemplate(this, url);
                            }
                        }).then((template: DocumentFragment) => {
                            this.bindableTemplates.add(id, template.cloneNode(true));
                            return this;
                        });
                    } else {
                        this.bindableTemplates.add(id, template.cloneNode(true));

                        controlPromise = this.$Promise.resolve(this);
                    }

                    this.__templateControlCache.put(id, controlPromise);
                }

                /**
                 * Waits for the template promise to resolve, then initializes 
                 * the binding of the bindable template and places it into the 
                 * DOM.
                 * 
                 * @param templatePromise The promise associated with the first 
                 * instance of the template with this ID.
                 */
                _waitForTemplateControl(templatePromise: async.IThenable<Template>): void {
                    var $exception: IExceptionStatic;
                    templatePromise.then((templateControl: Template) => {
                        if (!(isNull(this._url) || (this._url === templateControl._url))) {
                            $exception = acquire(__ExceptionStatic);
                            $exception.warn('The specified url: ' + this._url +
                                ' does not match the original plat-template with id: ' +
                                '"' + this._id + '". The original url will be loaded.',
                                $exception.TEMPLATE);
                        }

                        this.__mapBindableTemplates(templateControl);
                        return this._instantiateTemplate();
                    }).then((clone) => {
                        var endNode = this.endNode;
                        this.dom.insertBefore(endNode.parentNode, clone, endNode);
                    }).catch((error) => {
                        postpone(() => {
                            $exception = acquire(__ExceptionStatic);
                            $exception.warn('Problem resolving plat-template url: ' +
                                error.response, $exception.TEMPLATE);
                        });
                    });
                }

                /**
                 * Binds the template to the proper context and 
                 * resolves the clone to be placed into the DOM.
                 */
                _instantiateTemplate(): async.IThenable<DocumentFragment> {
                    return this.bindableTemplates.bind(this._id);
                }

                private __mapBindableTemplates(control: Template): void {
                    (<BindableTemplates>this.bindableTemplates)._cache =
                        (<BindableTemplates>control.bindableTemplates)._cache;
                    this.bindableTemplates.templates = control.bindableTemplates.templates;
                }
            }

            /**
             * The available options for plat.ui.controls.Template.
             */
            export interface ITemplateOptions {
                /**
                 * The unique ID used to label a template 
                 * and use it as DOM.
                 */
                id: string;

                /**
                 * An optional URL to specify a template 
                 * instead of using the element's innerHTML.
                 */
                url: string;
            }

            register.control(__Template, Template);

            export class Ignore extends TemplateControl {
                /**
                 * Removes the innerHTML from the DOM and saves it.
                 */
                setTemplate(): void {
                    this.innerTemplate = <DocumentFragment>this.dom.appendChildren(this.element.childNodes);
                }

                /**
                 * Places the saved innerHTML back into the DOM.
                 */
                loaded(): void {
                    this.element.appendChild(this.innerTemplate.cloneNode(true));
                }
            }

            register.control(__Ignore, Ignore);

            export class ForEach extends TemplateControl {
                /**
                 * The required context is an Array.
                 */
                context: Array<any>;

                /**
                 * Specifies that the foreach's element can be replaced with 
                 * any type of element.
                 */
                replaceWith = 'any';

                controls: Array<ITemplateControl>;
                private __clearTimeouts: Array<IRemoveListener> = [];
                private __removeListener: IRemoveListener;

                /**
                 * Creates a bindable template with the elementNodes (innerHTML) 
                 * specified for the ForEach.
                 */
                setTemplate(): void {
                    this.bindableTemplates.add('item', this.element.childNodes);
                }

                /**
                 * Re-syncs the ForEach children controls and DOM with the new 
                 * array.
                 * 
                 * @param newValue The new Array
                 * @param oldValue The old Array
                 */
                contextChanged(newValue?: Array<any>, oldValue?: Array<any>): void {
                    if (isNull(this.__removeListener)) {
                        this._setListener();
                    }

                    if (!isArray(newValue)) {
                        return;
                    }

                    if (newValue.length === 0) {
                        this._removeItems(this.controls.length);
                        return;
                    }

                    this._executeEvent({
                        method: 'splice',
                        arguments: null,
                        returnValue: null,
                        oldArray: oldValue || [],
                        newArray: newValue || []
                    });
                }

                /**
                 * Observes the array for changes and adds initial items to the DOM.
                 */
                loaded(): void {
                    var context = this.context;

                    if (!isArray(context)) {
                        return;
                    }

                    this._addItems(context.length, 0);

                    this._setListener();
                }

                /**
                 * Removes the Array listener
                 */
                dispose(): void {
                    if (isFunction(this.__removeListener)) {
                        this.__removeListener();
                        this.__removeListener = null;
                    }

                    var clearTimeouts = this.__clearTimeouts;

                    while (clearTimeouts.length > 0) {
                        clearTimeouts.shift()();
                    }
                }
        
                /**
                 * Adds an item to the ForEach's element.
                 */
                _addItem(item: DocumentFragment): void {
                    if (!isNode(item)) {
                        return;
                    }
                    this.dom.insertBefore(this.element, item);
                }

                /**
                 * Removes an item from the ForEach's element.
                 */
                _removeItem(): void {
                    var controls = this.controls,
                        length = controls.length - 1;

                    TemplateControl.dispose(controls[length]);
                }

                /**
                 * Updates the ForEach's children resource objects when 
                 * the array changes.
                 */
                _updateResources(): void {
                    var controls = this.controls,
                        length = controls.length;

                    for (var i = 0; i < length; ++i) {
                        controls[i].resources.add(this._getAliases(i));
                    }
                }

                /**
                 * Sets a listener for the changes to the array.
                 */
                _setListener(): void {
                    this.__removeListener = this.observeArray(this, 'context', this._arrayChanged);
                }

                /**
                 * Receives an event when a method has been called on an array.
                 * 
                 * @param ev The IArrayMethodInfo
                 */
                _arrayChanged(ev: observable.IArrayMethodInfo<any>): void {
                    if (isFunction((<any>this)['_' + ev.method])) {
                        this._executeEvent(ev);
                    }
                }

                /**
                 * Maps an array method to its associated method handler.
                 * 
                 * @param ev The IArrayMethodInfo
                 */
                _executeEvent(ev: observable.IArrayMethodInfo<any>): void {
                    (<any>this)['_' + ev.method](ev);
                }

                /**
                 * Adds new items to the ForEach's element when items are added to 
                 * the array.
                 * 
                 * @param numberOfItems The number of items to add.
                 * @param index The point in the array to start adding items.
                 */
                _addItems(numberOfItems: number, index: number): void {
                    var bindableTemplates = this.bindableTemplates;
            
                    for (var i = 0; i < numberOfItems; ++i, ++index) {
                        bindableTemplates.bind('item', index, this._getAliases(index)).then((fragment: DocumentFragment) => {
                            this._addItem(fragment);
                        }).catch((error: any) => {
                            postpone(() => {
                                var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                                $exception.fatal(error, $exception.BIND);
                            });
                        });
                    }
                }

                /**
                 * Returns a resource alias object for an item in the array. The 
                 * resource object contains index:number, even:boolean, odd:boolean, 
                 * and first:boolean.
                 * 
                 * @param index The index used to create the resource aliases.
                 */
                _getAliases(index: number): IObject<IResource> {
                    var isEven = (index & 1) === 0;
                    return {
                        index: {
                            value: index,
                            type: 'observable'
                        },
                        even: {
                            value: isEven,
                            type: 'observable'
                        },
                        odd: {
                            value: !isEven,
                            type: 'observable'
                        },
                        first: {
                            value: index === 0,
                            type: 'observable'
                        }
                    };
                }

                /**
                 * Removes items from the ForEach's element.
                 * 
                 * @param numberOfItems The number of items to remove.
                 */
                _removeItems(numberOfItems: number): void {
                    for (var i = 0; i < numberOfItems; ++i) {
                        this._removeItem();
                    }

                    if (this.controls.length > 0) {
                        this._updateResources();
                    }
                }

                /**
                 * Handles items being pushed into the array.
                 * 
                 * @param ev The IArrayMethodInfo
                 */
                _push(ev: observable.IArrayMethodInfo<any>): void {
                    this._addItems(ev.arguments.length, ev.oldArray.length);
                }
        
                /**
                 * Handles items being popped off the array.
                 * 
                 * @param ev The IArrayMethodInfo
                 */
                _pop(ev: observable.IArrayMethodInfo<any>): void {
                    this._removeItems(1);
                }
        
                /**
                 * Handles items being shifted off the array.
                 * 
                 * @param ev The IArrayMethodInfo
                 */
                _shift(ev: observable.IArrayMethodInfo<any>): void {
                    this._removeItems(1);
                }
        
                /**
                 * Handles adding/removing items when an array is spliced.
                 * 
                 * @param ev The IArrayMethodInfo
                 */
                _splice(ev: observable.IArrayMethodInfo<any>): void {
                    var oldLength = this.controls.length,
                        newLength = ev.newArray.length;

                    if (newLength > oldLength) {
                        this._addItems(newLength - oldLength, oldLength);
                    } else if (oldLength > newLength) {
                        this._removeItems(oldLength - newLength);
                    }
                }
        
                /**
                 * Handles items being unshifted into the array.
                 * 
                 * @param ev The IArrayMethodInfo
                 */
                _unshift(ev: observable.IArrayMethodInfo<any>): void {
                    this._addItems(ev.arguments.length, ev.oldArray.length);
                }
        
                /**
                 * Handles when the array is sorted.
                 * 
                 * @param ev The IArrayMethodInfo
                 */
                _sort(ev: observable.IArrayMethodInfo<any>): void {
                }
        
                /**
                 * Handles when the array is reversed.
                 * 
                 * @param ev The IArrayMethodInfo
                 */
                _reverse(ev: observable.IArrayMethodInfo<any>): void {
                }
            }

            export interface IForEach {
                /**
                 * Adds an item to the ForEach's element.
                 */
                _addItem(item: DocumentFragment): void;

                /**
                 * Removes an item from the ForEach's element.
                 */
                _removeItem(): void;

                /**
                 * Updates the ForEach's children resource objects when 
                 * the array changes.
                 */
                _updateResources(): void;

                /**
                 * Sets a listener for the changes to the array.
                 */
                _setListener(): void;

                /**
                 * Receives an event when a method has been called on an array.
                 * 
                 * @param ev The IArrayMethodInfo
                 */
                _arrayChanged(ev: observable.IArrayMethodInfo<any>): void;

                /**
                 * Maps an array method to its associated method handler.
                 * 
                 * @param ev The IArrayMethodInfo
                 */
                _executeEvent(ev: observable.IArrayMethodInfo<any>): void;

                /**
                 * Adds new items to the ForEach's element when items are added to 
                 * the array.
                 * 
                 * @param numberOfItems The number of items to add.
                 * @param index The point in the array to start adding items.
                 */
                _addItems(numberOfItems: number, index: number): void;

                /**
                 * Returns a resource alias object for an item in the array. The 
                 * resource object contains index:number, even:boolean, odd:boolean, 
                 * and first:boolean.
                 * 
                 * @param index The index used to create the resource aliases.
                 */
                _getAliases(index: number): IObject<IResource>;

                /**
                 * Removes items from the ForEach's element.
                 * 
                 * @param numberOfItems The number of items to remove.
                 */
                _removeItems(numberOfItems: number): void;

                /**
                 * Handles items being pushed into the array.
                 * 
                 * @param ev The IArrayMethodInfo
                 */
                _push(ev: observable.IArrayMethodInfo<any>): void;
        
                /**
                 * Handles items being popped off the array.
                 * 
                 * @param ev The IArrayMethodInfo
                 */
                _pop(ev: observable.IArrayMethodInfo<any>): void;
        
                /**
                 * Handles items being shifted off the array.
                 * 
                 * @param ev The IArrayMethodInfo
                 */
                _shift(ev: observable.IArrayMethodInfo<any>): void;
        
                /**
                 * Handles adding/removing items when an array is spliced.
                 * 
                 * @param ev The IArrayMethodInfo
                 */
                _splice(ev: observable.IArrayMethodInfo<any>): void;
        
                /**
                 * Handles items being unshifted into the array.
                 * 
                 * @param ev The IArrayMethodInfo
                 */
                _unshift(ev: observable.IArrayMethodInfo<any>): void;
        
                /**
                 * Handles when the array is sorted.
                 * 
                 * @param ev The IArrayMethodInfo
                 */
                _sort(ev: observable.IArrayMethodInfo<any>): void;
        
                /**
                 * Handles when the array is reversed.
                 * 
                 * @param ev The IArrayMethodInfo
                 */
                _reverse(ev: observable.IArrayMethodInfo<any>): void;
            }

            register.control(__ForEach, ForEach);

            export class Html extends TemplateControl {
                /**
                 * Loads the new HTML String.
                 */
                contextChanged(): void {
                    this.loaded();
                }

                /**
                 * Loads the context as the innerHTML of the element.
                 */
                loaded(): void {
                    var context = this.context;

                    if (!isString(context)) {
                        return;
                    }

                    this.dom.setInnerHtml(this.element, context);
                }
            }

            register.control(__Html, Html);

            export class Select extends TemplateControl {
                $Promise: async.IPromise = acquire(__Promise);
                $Document: Document = acquire(__Document);

                /**
                 * Replaces the <plat-select> node with 
                 * a <select> node.
                 */
                replaceWith: string = 'select';

                /**
                 * Specifies the context as an Array.
                 */
                context: Array<any>;

                /**
                 * An object that keeps track of unique 
                 * optgroups.
                 */
                groups: IObject<Element> = {};

                /**
                 * The evaluated plat-options object.
                 */
                options: observable.IObservableProperty<ISelectOptions>;

                private __removeListener: IRemoveListener;
                private __isGrouped: boolean = false;
                private __group: string;
                private __defaultOption: HTMLOptionElement;
                /**
                 * Creates the bindable option template and grouping 
                 * template if necessary.
                 */
                setTemplate(): void {
                    var element = this.element,
                        firstElementChild = element.firstElementChild,
                        $document = this.$Document;

                    if (!isNull(firstElementChild) && firstElementChild.nodeName.toLowerCase() === 'option') {
                        this.__defaultOption = <HTMLOptionElement>firstElementChild.cloneNode(true);
                    }

                    var platOptions = this.options.value,
                        option = $document.createElement('option');

                    if (this.__isGrouped = !isNull(platOptions.group)) {
                        var group = this.__group = platOptions.group,
                            optionGroup = $document.createElement('optgroup');

                        optionGroup.label = '{{' + group + '}}';

                        this.bindableTemplates.add('group', optionGroup);
                    }

                    option.value = '{{' + platOptions.value + '}}';
                    option.textContent = '{{' + platOptions.textContent + '}}';

                    this.bindableTemplates.add('option', option);
                }

                /**
                 * Re-observes the new array context and modifies 
                 * the options accordingly.
                 * 
                 * @param newValue The new array context.
                 * @param oldValue The old array context.
                 */
                contextChanged(newValue?: Array<any>, oldValue?: Array<any>): void {
                    var newLength = isNull(newValue) ? 0 : newValue.length,
                        oldLength = isNull(oldValue) ? 0 : oldValue.length;

                    if (isNull(this.__removeListener)) {
                        this.__removeListener = this.observeArray(this, 'context',
                        (ev?: observable.IArrayMethodInfo<any>) => {
                            if (isFunction((<any>this)['_' + ev.method])) {
                                (<any>this)['_' + ev.method](ev);
                            }
                        });
                    }

                    if (newLength > oldLength) {
                        this._addItems(newLength - oldLength, oldLength);
                    } else if (newLength < oldLength) {
                        this._removeItems(oldLength - newLength);
                    }
                }

                /**
                 * Observes the new array context and adds 
                 * the options accordingly.
                 */
                loaded(): void {
                    var context = this.context;

                    if (isNull(context)) {
                        return;
                    }

                    this._addItems(context.length, 0);

                    this.__removeListener = this.observeArray(this, 'context', (ev?: observable.IArrayMethodInfo<any>) => {
                        if (isFunction((<any>this)['_' + ev.method])) {
                            (<any>this)['_' + ev.method](ev);
                        }
                    });
                }

                /**
                 * Stops observing the array context.
                 */
                dispose(): void {
                    if (isFunction(this.__removeListener)) {
                        this.__removeListener();
                        this.__removeListener = null;
                    }
                }

                /**
                 * Adds the options to the select element.
                 * 
                 * @param numberOfItems The number of items 
                 * to add.
                 * @param length The current index of the next 
                 * set of items to add.
                 */
                _addItems(numberOfItems: number, length: number): void {
                    var index = length,
                        item: any;

                    for (var i = 0; i < numberOfItems; ++i, ++index) {
                        item = this.context[index];

                        this.bindableTemplates.bind('option', index).then(this._insertOptions.bind(this, index, item));
                    }
                }

                /**
                 * The callback used to add an option after 
                 * its template has been bound.
                 * 
                 * @param index The current index of the item being added.
                 * @param item The item being added.
                 * @param optionClone The bound DocumentFragment to be 
                 * inserted into the DOM.
                 */
                _insertOptions(index: number, item: any, optionClone: DocumentFragment): void {
                    var element = this.element;

                    if (this.__isGrouped) {
                        var groups = this.groups,
                            newGroup = item[this.__group],
                            optgroup: any = groups[newGroup];

                        if (isNull(optgroup)) {
                            groups[newGroup] = <any>this.bindableTemplates.bind('group', '' + index).then((groupClone: DocumentFragment) => {
                                optgroup = groups[newGroup] = <Element>groupClone.childNodes[1];

                                optgroup.appendChild(optionClone);
                                element.appendChild(groupClone);
                                return optgroup;
                            });
                            return;
                        } else if (isFunction(optgroup.then)) {
                            optgroup.then((group: Element) => {
                                group.appendChild(optionClone);
                                return group;
                            });
                            return;
                        }

                        optgroup.appendChild(optionClone);
                        return;
                    }

                    element.appendChild(optionClone);
                }

                /**
                 * Removes an item from the DOM.
                 * 
                 * @param parent The element whose child 
                 * will be removed.
                 */
                _removeItem(parent: Element): void {
                    parent.removeChild(parent.lastElementChild);
                }

                /**
                 * Removes a specified number of elements.
                 * 
                 * @param numberOfItems The number of items 
                 * to remove.
                 */
                _removeItems(numberOfItems: number): void {
                    var element = this.element,
                        removeItem = this._removeItem;
                    while (numberOfItems-- > 0) {
                        removeItem(element);
                    }
                }

                /**
                 * The function called when an item has been removed 
                 * from the array context.
                 * 
                 * @param ev The array mutation object
                 */
                _itemRemoved(ev: observable.IArrayMethodInfo<any>): void {
                    if (ev.oldArray.length === 0) {
                        return;
                    }

                    if (this.__isGrouped) {
                        var removed = ev.returnValue,
                            group = removed[this.__group],
                            optgroup = this.groups[group];

                        this._removeItem(optgroup);

                        return;
                    }

                    this._removeItems(1);
                }

                /**
                 * Resets the select element by removing all its 
                 * items and adding them back.
                 */
                _resetSelect(): void {
                    var itemLength = this.context.length,
                        nodeLength = this.element.childNodes.length;

                    this._removeItems(nodeLength);
                    this.groups = {};
                    if (!isNull(this.__defaultOption)) {
                        this.element.appendChild(this.__defaultOption);
                    }

                    this._addItems(itemLength, 0);
                }

                /**
                 * The function called when an element is pushed to 
                 * the array context.
                 * 
                 * @param ev The array mutation object
                 */
                _push(ev: observable.IArrayMethodInfo<any>): void {
                    this._addItems(ev.arguments.length, ev.oldArray.length);
                }

                /**
                 * The function called when an item is popped 
                 * from the array context.
                 * 
                 * @param ev The array mutation object
                 */
                _pop(ev: observable.IArrayMethodInfo<any>): void {
                    this._itemRemoved(ev);
                }

                /**
                 * The function called when an item is shifted 
                 * from the array context.
                 * 
                 * @param ev The array mutation object
                 */
                _shift(ev: observable.IArrayMethodInfo<any>): void {
                    if (this.__isGrouped) {
                        this._resetSelect();
                        return;
                    }

                    this._itemRemoved(ev);
                }

                /**
                 * The function called when items are spliced 
                 * from the array context.
                 * 
                 * @param ev The array mutation object
                 */
                _splice(ev: observable.IArrayMethodInfo<any>): void {
                    if (this.__isGrouped) {
                        this._resetSelect();
                        return;
                    }

                    var oldLength = ev.oldArray.length,
                        newLength = ev.newArray.length;

                    if (newLength > oldLength) {
                        this._addItems(newLength - oldLength, oldLength);
                    } else if (oldLength > newLength) {
                        this._removeItems(oldLength - newLength);
                    }
                }

                /**
                 * The function called when an item is unshifted 
                 * onto the array context.
                 * 
                 * @param ev The array mutation object
                 */
                _unshift(ev: observable.IArrayMethodInfo<any>): void {
                    if (this.__isGrouped) {
                        this._resetSelect();
                        return;
                    }

                    this._addItems(ev.arguments.length, ev.oldArray.length);
                }

                /**
                 * The function called when the array context 
                 * is sorted.
                 * 
                 * @param ev The array mutation object
                 */
                _sort(ev: observable.IArrayMethodInfo<any>): void {
                    if (this.__isGrouped) {
                        this._resetSelect();
                    }
                }

                /**
                 * The function called when the array context 
                 * is reversed.
                 * 
                 * @param ev The array mutation object
                 */
                _reverse(ev: observable.IArrayMethodInfo<any>): void {
                    if (this.__isGrouped) {
                        this._resetSelect();
                    }
                }
            }

            /**
             * The available options for plat.ui.controls.Select.
             */
            export interface ISelectOptions {
                /**
                 * The property in your context array 
                 * of objects to use to group the objects 
                 * into optgroups.
                 */
                group: string;

                /**
                 * The property in your context array of 
                 * objects with which to use to bind to the 
                 * option's value.
                 */
                value: string;

                /**
                 * The property in your context array of 
                 * objects with which to use to bind to the 
                 * option's textContent.
                 */
                textContent: string;
            }

            register.control(__Select, Select);

            export class If extends TemplateControl implements IIf {
                /**
                 * Removes the <plat-if> node from the DOM
                 */
                replaceWith: string = null;

                /**
                 * The evaluated plat-options object.
                 */
                options: observable.IObservableProperty<IIfOptions>;

                private __removeListener: IRemoveListener;
                private __condition: boolean;
                /**
                 * Creates a bindable template with its element nodes.
                 */
                setTemplate(): void {
                    this.bindableTemplates.add('item', this.elementNodes);
                }

                /**
                 * Checks the options and initializes the 
                 * evaluation.
                 */
                contextChanged(): void {
                    var options = this.options.value;

                    if (isEmpty(options)) {
                        return;
                    }

                    this.setter(options);
                }

                /**
                 * Sets the visibility to true if no options are 
                 * defined, kicks off the evaluation, and observes 
                 * the options for changes.
                 */
                loaded(): void {
                    if (isNull(this.options)) {
                        var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                        $exception.warn('No condition specified in plat-options for plat-if.', $exception.BIND);

                        this.options = {
                            value: {
                                condition: true
                            },
                            observe: <any>noop
                        };
                    }
                    this.contextChanged();
                    this.__removeListener = this.options.observe(this.setter);
                }

                /**
                 * Stops listening to the options for changes.
                 */
                dispose(): void {
                    if (isFunction(this.__removeListener)) {
                        this.__removeListener();
                        this.__removeListener = null;
                    }
                }

                /**
                 * Checks the condition and decides 
                 * whether or not to add or remove 
                 * the node from the DOM.
                 */
                setter(options: IIfOptions): void {
                    var value = options.condition;

                    if (value === this.__condition) {
                        return;
                    }

                    if (!value) {
                        this._removeItem();
                    } else {
                        this.bindableTemplates.bind('item').then((fragment) => {
                            this._addItem(fragment);
                        });
                    }

                    this.__condition = value;
                }

                /**
                 * The callback used to add the fragment to the DOM 
                 * after the bindableTemplate has been created.
                 * 
                 * @param item The DocumentFragment consisting of 
                 * the inner template of the node.
                 */
                _addItem(item: DocumentFragment): void {
                    if (!isNode(item)) {
                        return;
                    }
                    var endNode = this.endNode;
                    this.dom.insertBefore(endNode.parentNode, item, endNode);
                }

                /**
                 * Removes the node from the DOM.
                 */
                _removeItem(): void {
                    postpone(() => {
                        Control.dispose(this.controls[0]);
                    });
                }
            }

            export interface IIf {
                /**
                 * Checks the condition and decides 
                 * whether or not to add or remove 
                 * the node from the DOM.
                 */
                setter(options: IIfOptions): void;
            }

            /**
             * The available options for plat.ui.controls.If.
             */
            export interface IIfOptions {
                /**
                 * A boolean expression to bind to 
                 * the element's visibility.
                 */
                condition: boolean;
            }

            register.control(__If, If);

            class Anchor extends TemplateControl {
                replaceWith = 'a';
                element: HTMLAnchorElement;
                initialize(): void {
                    if (isEmpty(this.element.href)) {
                        this.addEventListener(this.element, 'click', (ev: Event) => {
                            if (isEmpty(this.element.href)) {
                                ev.preventDefault();
                            }
                        });
                    }
                }
            }

            register.control(__Anchor, Anchor);
        }
    }
    export module processing {
        /**
         * Responsible for iterating through the DOM and collecting controls.
         */
        export class Compiler implements ICompiler {
            $ElementManagerFactory: IElementManagerFactory = acquire(__ElementManagerFactory);
            $TextManagerFactory: ITextManagerFactory = acquire(__TextManagerFactory);
            $CommentManagerFactory: ICommentManagerFactory = acquire(__CommentManagerFactory);
            $ManagerCache: storage.ICache<INodeManager> = acquire(__ManagerCache);

            compile(node: Node, control?: ui.ITemplateControl): void;
            compile(nodes: Array<Node>, control?: ui.ITemplateControl): void;
            compile(nodes: NodeList, control?: ui.ITemplateControl): void;
            compile(node: any, control?: ui.ITemplateControl) {
                var childNodes = node.childNodes,
                    length: number,
                    newLength: number,
                    childNode: Node,
                    hasControl = !isNull(control),
                    manager = <IElementManager>(hasControl ? this.$ManagerCache.read(control.uid) : null),
                    create = this.$ElementManagerFactory.create;

                if (!isUndefined(childNodes)) {
                    childNodes = Array.prototype.slice.call(childNodes);
                } else if (isFunction(node.push)) {
                    childNodes = node;
                } else {
                    childNodes = Array.prototype.slice.call(node);
                }

                if (isNull(manager)) {
                    length = childNodes.length;

                    for (var i = 0; i < length; ++i) {
                        childNode = childNodes[i];
                        if (childNode.nodeType === Node.ELEMENT_NODE) {
                            if (!isNull(create(<Element>childNode))) {
                                this.compile(childNode);
                            }
                        }

                        newLength = childNodes.length;
                        i += newLength - length;
                        length = newLength;
                    }
                } else {
                    this._compileNodes(childNodes, manager);
                }
            }

            /**
             * Iterates through the array of nodes creating Element Managers on Element 
             * nodes, Text Managers on text nodes, and Comment Managers on comment nodes.
             * 
             * @param nodes The NodeList to be compiled. 
             * @param manager The parent Element Manager for the given array of nodes.
             */
            _compileNodes(nodes: Array<Node>, manager: IElementManager): void {
                var length = nodes.length,
                    node: Node,
                    newManager: IElementManager,
                    newLength: number,
                    create = this.$ElementManagerFactory.create,
                    commentCreate = this.$CommentManagerFactory.create,
                    textCreate = this.$TextManagerFactory.create;

                for (var i = 0; i < length; ++i) {
                    node = nodes[i];
                    switch (node.nodeType) {
                        case Node.ELEMENT_NODE:
                            newManager = create(<Element>node, manager);
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
            }
        }

        /**
         * The Type for referencing the '$Compiler' injectable as a dependency.
         */
        export function ICompiler(): ICompiler {
            return new Compiler();
        }

        register.injectable(__Compiler, ICompiler);

        /**
         * Describes an object that iterates through the DOM and collects controls.
         */
        export interface ICompiler {
            /**
             * Goes through the childNodes of the given Node, finding elements that contain controls as well as
             * text that contains markup.
             * 
             * @param node The node whose childNodes are going to be compiled.
             * @param control The parent control for the given Node. The parent must implement ui.ITemplateControl
             * since only controls that implement ui.ITemplateControl can contain templates.
             */
            compile(node: Node, control?: ui.ITemplateControl): void;
            /**
             * Goes through the Node array, finding elements that contain controls as well as
             * text that contains markup.
             * 
             * @param nodes The Node array to be compiled.
             * @param control The parent control for the given Node array. The parent must implement ui.ITemplateControl
             * since only controls that implement ui.ITemplateControl are responsible for creating DOM.
             */
            compile(nodes: Array<Node>, control?: ui.ITemplateControl): void;
            /**
             * Goes through the NodeList, finding elements that contain controls as well as
             * text that contains markup.
             * 
             * @param nodes The NodeList to be compiled. 
             * @param control The parent control for the given NodeList. The parent must implement ui.ITemplateControl
             * since only controls that implement ui.ITemplateControl are responsible for creating DOM.
             */
            compile(nodes: NodeList, control?: ui.ITemplateControl): void;
        }

        /**
         * A NodeManager is responsible for data binding a data context to a Node.
         */
        export class NodeManager implements INodeManager {
            static $Regex: expressions.IRegex;
            static $ContextManagerStatic: observable.IContextManagerStatic;
            static $Parser: expressions.IParser;
            static $TemplateControlFactory: ui.ITemplateControlFactory;
            /**
             * The start markup notation.
             */
            static startSymbol: string = '{{';

            /**
             * The end markup notation.
             */
            static endSymbol: string = '}}';

            /**
             * Given an IParsedExpression array, creates an array of unique identifers
             * to use with binding. This allows us to avoid creating multiple listeners
             * for the identifier and node.
             * 
             * @static
             * @param expressions An IParsedExpression array to search for identifiers.
             * @return {Array<string>} An array of identifiers.
             */
            static findUniqueIdentifiers(expressions: Array<expressions.IParsedExpression>): Array<string> {
                var length = expressions.length,
                    uniqueIdentifierObject: IObject<boolean> = {},
                    uniqueIdentifiers: Array<string> = [],
                    identifiers: Array<string>,
                    identifier: string,
                    j: number,
                    jLength: number;

                if (length === 1) {
                    return expressions[0].identifiers.slice(0);
                }

                for (var i = 0; i < length; ++i) {
                    identifiers = expressions[i].identifiers;
                    jLength = identifiers.length;

                    for (j = 0; j < jLength; ++j) {
                        identifier = identifiers[j];
                        if (isNull(uniqueIdentifierObject[identifier])) {
                            uniqueIdentifierObject[identifier] = true;
                            uniqueIdentifiers.push(identifier);
                        }
                    }
                }

                return uniqueIdentifiers;
            }

            /**
             * Determines if a string has the markup notation.
             * 
             * @param text The text string in which to search for markup.
             * @return {Boolean} Indicates whether or not there is markup.
             */
            static hasMarkup(text: string): boolean {
                return NodeManager.$Regex.markupRegex.test(text);
            }

            /**
             * Given a string, finds markup in the string and creates an IParsedExpression array.
             * 
             * @static
             * @param text The text string to parse.
             */
            static findMarkup(text: string): Array<expressions.IParsedExpression> {
                var start: number,
                    end: number,
                    text = text.replace(NodeManager.$Regex.newLineRegex, ''),
                    parsedExpressions: Array<expressions.IParsedExpression> = [],
                    startSymbol = NodeManager.startSymbol,
                    endSymbol = NodeManager.endSymbol,
                    wrapExpression = NodeManager._wrapExpression,
                    substring: string,
                    expression: expressions.IParsedExpression,
                    $parser = NodeManager.$Parser;

                while ((start = text.indexOf(startSymbol)) !== -1 && (end = text.indexOf(endSymbol)) !== -1) {
                    if (start !== 0) {
                        parsedExpressions.push(wrapExpression(text.substring(0, start)));
                    }

                    // incremement with while loop instead of just += 2 for nested object literal case.
                    while (text[++end] === '}') { }

                    substring = text.substring(start + 2, end - 2);

                    //check for one-time databinding
                    if (substring[0] === '=') {
                        substring = substring.substr(1).trim();
                        expression = $parser.parse(substring);
                        expression = {
                            expression: expression.expression,
                            evaluate: expression.evaluate,
                            identifiers: [],
                            aliases: expression.aliases,
                            oneTime: true
                        };
                        parsedExpressions.push(expression);
                    } else {
                        parsedExpressions.push($parser.parse(substring.trim()));
                    }

                    text = text.substr(end);
                }

                if (start > -1 && end >= 0) {
                    parsedExpressions.push(wrapExpression(text.substring(end)));
                } else if (text !== '') {
                    parsedExpressions.push(wrapExpression(text));
                }

                return parsedExpressions;
            }

            /**
             * Takes in data context and an IParsedExpression array and outputs a string of the evaluated
             * expressions.
             * 
             * @static
             * @param expressions The IParsedExpression array to evaluate.
             * @param control The IControl used to parse the expressions.
             * @return {string} The evaluated expressions.
             */
            static build(expressions: Array<expressions.IParsedExpression>, control?: ui.ITemplateControl) {
                var text = '',
                    length = expressions.length,
                    resources = {},
                    expression: expressions.IParsedExpression,
                    value: any,
                    evaluateExpression = NodeManager.$TemplateControlFactory.evaluateExpression;

                for (var i = 0; i < length; ++i) {
                    expression = expressions[i];

                    value = evaluateExpression(expression, control, resources);

                    if (isObject(value)) {
                        try {
                            text += JSON.stringify(value, null, 4);
                        } catch (e) {
                            if (!isNull(e.description)) {
                                e.description = 'Cannot stringify object: ' + e.description;
                            }
                            e.message = 'Cannot stringify object: ' + e.message;

                            var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                            $exception.warn(e, $exception.PARSE);
                        }
                    } else if (!isNull(value)) {
                        text += value;
                    }

                    if (expression.oneTime) {
                        expressions[i] = NodeManager._wrapExpression(value);
                    }
                }

                return text;
            }

            /**
             * Registers a listener to be notified of a change in any associated identifier.
             * 
             * @static
             * @param identifiers An Array of identifiers to observe.
             * @param control The control associated to the identifiers.
             * @param listener The listener to call when any identifier property changes.
             */
            static observeIdentifiers(identifiers: Array<string>, control: ui.ITemplateControl,
                listener: (...args: Array<any>) => void) {
                var length = identifiers.length,
                    $contextManager = NodeManager.$ContextManagerStatic,
                    rootManager = $contextManager.getManager(Control.getRootControl(control)),
                    absoluteContextPath = control.absoluteContextPath,
                    context = control.context,
                    observableCallback = {
                        listener: listener,
                        uid: control.uid
                    },
                    resources: IObject<{
                        resource: ui.IResource;
                        control: ui.ITemplateControl;
                    }>  = {},
                    resourceObj: {
                        resource: ui.IResource;
                        control: ui.ITemplateControl;
                    },
                    manager: observable.IContextManager,
                    split: Array<string>,
                    alias: string,
                    absoluteIdentifier: string,
                    identifier: string;

                for (var i = 0; i < length; ++i) {
                    identifier = identifiers[i];
                    absoluteIdentifier = '';

                    if (identifier[0] === '@') {
                        // We found an alias
                        split = identifier.split('.');
                        alias = split.shift().substr(1);

                        if (split.length > 0) {
                            absoluteIdentifier = '.' + split.join('.');
                        }

                        resourceObj = resources[alias];

                        if (isNull(resourceObj)) {
                            resourceObj = resources[alias] = control.findResource(alias);
                        }

                        if (!isNull(resourceObj) && !isNull(resourceObj.resource) && resourceObj.resource.type === 'observable') {
                            manager = $contextManager.getManager(resources[alias].control);
                            absoluteIdentifier = 'resources.' + alias + '.value' + absoluteIdentifier;
                        } else {
                            continue;
                        }
                    } else {
                        // Look on the control.context
                        split = identifier.split('.');

                        if (!isNull($contextManager.getContext(context, split))) {
                            manager = rootManager;
                            absoluteIdentifier = absoluteContextPath + '.' + identifier;
                        } else if (!isNull($contextManager.getContext(control, split))) {
                            manager = null;
                        } else {
                            manager = rootManager;
                            absoluteIdentifier = absoluteContextPath + '.' + identifier;
                        }
                    }

                    if (!isNull(manager)) {
                        manager.observe(absoluteIdentifier, observableCallback);
                    }
                }
            }

            /**
             * Wraps constant text as an IParsedExpression.
             * 
             * @param text The text to wrap.
             */
            static _wrapExpression(text: string): expressions.IParsedExpression {
                return {
                    evaluate: () => text,
                    identifiers: [],
                    aliases: [],
                    expression: text
                };
            }

            type: string;
            isClone: boolean = false;
            nodeMap: INodeMap;
            parent: IElementManager;

            initialize(nodeMap: INodeMap, parent: IElementManager): void {
                this.nodeMap = nodeMap;
                this.parent = parent;

                if (!isNull(parent)) {
                    this.isClone = parent.isClone;
                    parent.children.push(this);
                }
            }

            getParentControl(): ui.ITemplateControl {
                var parent = this.parent,
                    control: ui.ITemplateControl;

                while (isNull(control)) {
                    if (isNull(parent)) {
                        break;
                    }

                    control = parent.getUiControl();
                    parent = parent.parent;
                }

                return control;
            }

            clone(newNode: Node, parentManager: IElementManager): number {
                return 1;
            }

            bind(): void { }
        }

        /**
         * The Type for referencing the '$NodeManagerStatic' injectable as a dependency.
         */
        export function INodeManagerStatic(
            $Regex?: expressions.IRegex,
            $ContextManagerStatic?: observable.IContextManagerStatic,
            $Parser?: expressions.IParser,
            $TemplateControlFactory?: ui.ITemplateControlFactory): INodeManagerStatic {
                NodeManager.$Regex = $Regex;
                NodeManager.$ContextManagerStatic = $ContextManagerStatic;
                NodeManager.$Parser = $Parser;
                NodeManager.$TemplateControlFactory = $TemplateControlFactory;
                return NodeManager;
        }

        register.injectable(__NodeManagerStatic, INodeManagerStatic, [
            __Regex,
            __ContextManagerStatic,
            __Parser,
            __TemplateControlFactory
        ], register.STATIC);

        /**
         * The external interface for the '$NodeManagerStatic' injectable.
         */
        export interface INodeManagerStatic {
            /**
             * The start markup notation.
             */
            startSymbol: string;

            /**
             * The end markup notation.
             */
            endSymbol: string;

            /**
             * Given an IParsedExpression array, creates an array of unique identifers
             * to use with binding. This allows us to avoid creating multiple listeners
             * for the identifier and node.
             *
             * @static
             * @param expressions An IParsedExpression array to search for identifiers.
             * @return {Array<string>} An array of identifiers.
             */
            findUniqueIdentifiers(expressions: Array<expressions.IParsedExpression>): Array<string>;

            /**
             * Determines if a string has the markup notation.
             *
             * @param text The text string in which to search for markup.
             * @return {Boolean} Indicates whether or not there is markup.
             */
            hasMarkup(text: string): boolean;

            /**
             * Given a string, finds markup in the string and creates an IParsedExpression array.
             *
             * @static
             * @param text The text string to parse.
             * @return {Array<IParsedExpression>}
             */
            findMarkup(text: string): Array<expressions.IParsedExpression>;

            /**
             * Takes in data context and an IParsedExpression array and outputs a string of the evaluated
             * expressions.
             *
             * @static
             * @param expressions The IParsedExpression array to evaluate.
             * @param control The IControl used to parse the expressions.
             * @return {string} The evaluated expressions.
             */
            build(expressions: Array<expressions.IParsedExpression>, control?: ui.ITemplateControl): string;

            /**
             * Registers a listener to be notified of a change in any associated identifier.
             *
             * @static
             * @param identifiers An Array of identifiers to observe.
             * @param control The control associated to the identifiers.
             * @param listener The listener to call when any identifier property changes.
             */
            observeIdentifiers(identifiers: Array<string>,
                control: ui.ITemplateControl, listener: (...args: Array<any>) => void): void;
        }

        /**
         * Describes an object that takes a Node and provides a way to data-bind to that node.
         */
        export interface INodeManager {
            /**
             * The type of INodeManager
             */
            type: string;

            /**
             * The INodeMap for this INodeManager. Contains the compiled Node.
             */
            nodeMap?: INodeMap;

            /**
             * The parent manager for this INodeManager.
             */
            parent?: IElementManager;

            /**
             * Retrieves the parent control associated with the parent manager.
             */
            getParentControl? (): ui.ITemplateControl;

            /**
             * Clones this NodeManager with the new node.
             * 
             * @param newNode The node used to clone this NodeManager.
             * @param parentManager The parent IElementManager for the clone.
             */
            clone? (newNode: Node, parentManager: IElementManager): number;

            /**
             * Initializes the object's properties.
             * 
             * @param nodeMap The INodeMap associated with this TextManager. We have to use an 
             * INodeMap instead of an INode so we can treat all INodeManagers the same.
             * @param parent The parent IElementManager.
             */
            initialize?(nodeMap: INodeMap, parent: IElementManager): void;

            /**
             * The function used for data-binding a data context to the DOM.
             */
            bind(): void;
        }

        /**
         * Describes a compiled Node.
         */
        export interface INode {
            /**
             * The control associated with the Node, if one exists.
             */
            control?: IControl;

            /**
             * The Node that is compiled.
             */
            node?: Node;

            /**
             * The name of the Node.
             */
            nodeName?: string;

            /**
             * Any IParsedExpressions contained in the Node.
             */
            expressions?: Array<expressions.IParsedExpression>;

            /**
             * Unique identifiers contained in the Node.
             */
            identifiers?: Array<string>;

            /**
             * The injector for a control associated with the Node, if one exists.
             */
            injector?: dependency.IInjector<IControl>;
        }

        /**
         * Defines the interface for a compiled Element.
         */
        export interface IUiControlNode extends INode {
            /**
             * The control associated with the Element, if one exists.
             */
            control: ui.ITemplateControl;

            /**
             * The resources element defined as the control element's first
             * element child.
             */
            resourceElement?: HTMLElement;
        }

        /**
         * Describes a compiled Element with all 
         * associated nodes contained within its tag.
         */
        export interface INodeMap {
            /**
             * The Element that is compiled.
             */
            element?: HTMLElement;

            /**
             * The compiled attribute Nodes for the Element.
             */
            nodes: Array<INode>;

            /**
             * An object of key/value attribute pairs.
             */
            attributes?: IObject<string>;

            /**
             * The plat-context path for the next UIControl, if specified.
             */
            childContext?: string;

            /**
             * Indicates whether or not a IControl was found on the Element.
             */
            hasControl?: boolean;

            /**
             * The INode for the UIControl, if one was found for the Element.
             */
            uiControlNode?: IUiControlNode;
        }

        /**
         * A class used to manage element nodes. Provides a way for compiling and binding the 
         * element/template. Also provides methods for cloning an ElementManager.
         */
        export class ElementManager extends NodeManager implements IElementManager {
            static $Document: Document;
            static $ManagerCache: storage.ICache<IElementManager>;
            static $ResourcesFactory: ui.IResourcesFactory;
            static $BindableTemplatesFactory: ui.IBindableTemplatesFactory;

            /**
             * Determines if the associated Element has controls that need to be instantiated or Attr nodes
             * containing text markup. If controls exist or markup is found a new ElementManager will be created,
             * else an empty INodeManager will be added to the Array of INodeManagers.
             *  
             * @static
             * @param element The Element to use to identifier markup and controls.
             * @param parent The parent ui.ITemplateControl used for context inheritance.
             */
            static create(element: Element, parent?: IElementManager): IElementManager {
                var name = element.nodeName.toLowerCase(),
                    nodeName = name,
                    injector = controlInjectors[name] || viewControlInjectors[name],
                    hasUiControl = false,
                    uiControlNode: IUiControlNode;

                if (isNull(injector)) {
                    if (element.hasAttribute('plat-control')) {
                        name = element.getAttribute('plat-control').toLowerCase();
                        injector = controlInjectors[name] || viewControlInjectors[name];
                    } else if (element.hasAttribute('data-plat-control')) {
                        name = element.getAttribute('data-plat-control').toLowerCase();
                        injector = controlInjectors[name] || viewControlInjectors[name];
                    }
                }

                if (!isNull(injector)) {
                    var uiControl = <ui.ITemplateControl>injector.inject(),
                        resourceElement = ElementManager.locateResources(element);

                    uiControlNode = {
                        control: uiControl,
                        resourceElement: resourceElement,
                        nodeName: name,
                        expressions: [],
                        injector: injector
                    };

                    hasUiControl = true;

                    element.setAttribute('plat-control', name);

                    var replacementType = uiControl.replaceWith;
                    if (!isEmpty(replacementType) && (replacementType !== 'any' || nodeName === name) &&
                            replacementType.toLowerCase() !== nodeName) {
                        if (replacementType === 'any') {
                            replacementType = 'div';
                        }

                        var replacement = ElementManager.$Document.createElement(replacementType);
                        if (replacement.nodeType === Node.ELEMENT_NODE) {
                            element = replaceWith(element, <HTMLElement>replacement.cloneNode(true));
                        }
                    }
                }

                var attributes = element.attributes,
                    elementMap = ElementManager._collectAttributes(attributes),
                    manager = new ElementManager();

                elementMap.element = <HTMLElement>element;
                elementMap.uiControlNode = uiControlNode;

                manager.initialize(elementMap, parent);

                if (!(elementMap.hasControl || hasUiControl)) {
                    manager.bind = noop;
                } else {
                    manager.setUiControlTemplate();
                    return hasUiControl ? null : manager;
                }

                return manager;
            }

            /**
             * Looks through the Node's child nodes to try and find any 
             * defined Resources in a <plat-resources> tags.
             * 
             * @param node The node who may have Resources as a child node.
             */
            static locateResources(node: Node): HTMLElement {
                var childNodes: Array<Node> = Array.prototype.slice.call(node.childNodes),
                    length = childNodes.length,
                    childNode: Node;

                while (childNodes.length > 0) {
                    childNode = childNodes.shift();

                    if (childNode.nodeName.toLowerCase() === 'plat-resources') {
                        return <HTMLElement>node.removeChild(childNode);
                    }
                }

                return null;
            }

            /**
             * Clones an ElementManager with a new element.
             *
             * @static
             * @param sourceManager The original IElementManager.
             * @param parent The parent IElementManager for the new clone.
             * @param element The new element to associate with the clone.
             * @param newControl An optional control to associate with the clone.
             * @param nodeMap The nodeMap used to clone this ElementManager.
             */
            static clone(sourceManager: IElementManager, parent: IElementManager,
                element: Element, newControl?: ui.ITemplateControl, nodeMap?: INodeMap): IElementManager {

                if (isNull(nodeMap)) {
                    nodeMap = ElementManager._cloneNodeMap(sourceManager.nodeMap, element, parent.getUiControl() ||
                        parent.getParentControl(), newControl);
                }

                var manager = new ElementManager();

                manager.nodeMap = nodeMap;
                manager.parent = parent;
            
                if (!isNull(parent)) {
                    parent.children.push(manager);
                }

                manager.replace = sourceManager.replace;
                manager.replaceNodeLength = sourceManager.replaceNodeLength;
                manager.hasOwnContext = sourceManager.hasOwnContext;
                manager.isClone = true;

                if (!nodeMap.hasControl && isNull(newControl)) {
                    manager.bind = noop;
                }

                if (!isNull(newControl)) {
                    ElementManager.$ManagerCache.put(newControl.uid, manager);
                }

                return manager;
            }

            /**
             * Clones a UI Control with a new nodeMap.
             * 
             * @static
             * @param sourceMap The source INodeMap used to clone the UI Control
             * @param parent The parent control of the clone.
             */
            static cloneUiControl(sourceMap: INodeMap, parent: ui.ITemplateControl): ui.ITemplateControl {
                var uiControlNode = sourceMap.uiControlNode;

                if (isNull(uiControlNode)) {
                    return;
                }

                var uiControl = uiControlNode.control,
                    newUiControl = <ui.ITemplateControl>uiControlNode.injector.inject(),
                    resources = ElementManager.$ResourcesFactory.getInstance(),
                    attributes: ui.IAttributesInstance = acquire(__AttributesInstance);

                newUiControl.parent = parent;
                parent.controls.push(newUiControl);
                newUiControl.controls = [];

                attributes.initialize(newUiControl, sourceMap.attributes);
                newUiControl.attributes = attributes;

                resources.initialize(newUiControl, uiControl.resources);
                newUiControl.resources = resources;

                ElementManager.$ResourcesFactory.addControlResources(newUiControl);

                if (!isNull(uiControl.innerTemplate)) {
                    newUiControl.innerTemplate = <DocumentFragment>uiControl.innerTemplate.cloneNode(true);
                }

                newUiControl.type = uiControl.type;
                newUiControl.bindableTemplates = ElementManager.$BindableTemplatesFactory.create(newUiControl, uiControl.bindableTemplates);
                newUiControl.replaceWith = uiControl.replaceWith;

                return newUiControl;
            }

            /**
             * Creates new nodes for an INodeMap corresponding to the element associated with the nodeMap or
             * the passed-in element.
             *
             * @static
             * @param nodeMap The nodeMap to populate with attribute nodes.
             * @param parent The parent control for the new attribute controls.
             * @param templateControl The TemplateControl linked to these AttributeControls if 
             * one exists.
             * @param newElement An optional element to use for attributes (used in cloning).
             * @param isClone Whether or not these controls are clones.
             */
            static createAttributeControls(nodeMap: INodeMap, parent: ui.ITemplateControl,
                templateControl?: ui.ITemplateControl, newElement?: Element, isClone?: boolean): Array<INode> {
                var nodes = nodeMap.nodes,
                    element = isClone ? newElement : nodeMap.element,
                    elementExists = !isNull(element);

                if (elementExists && element.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                    return isClone ? ElementManager._copyAttributeNodes(nodes) : [];
                }

                var attributes = elementExists ? element.attributes : null,
                    attrs = nodeMap.attributes,
                    newAttributes: ui.IAttributesInstance,
                    node: INode,
                    injector: dependency.IInjector<IControl>,
                    control: controls.IAttributeControl,
                    newNodes: Array<INode> = [],
                    length = nodes.length,
                    nodeName: string,
                    i: number;

                for (i = 0; i < length; ++i) {
                    node = nodes[i];
                    nodeName = node.nodeName;
                    injector = node.injector;
                    control = null;

                    if (!isNull(injector)) {
                        control = <controls.IAttributeControl>injector.inject();
                        node.control = control;
                        control.parent = parent;
                        control.element = <HTMLElement>element;

                        newAttributes = acquire(__AttributesInstance);
                        newAttributes.initialize(control, attrs);
                        control.attributes = newAttributes;

                        control.type = nodeName;

                        if (!isString(control.uid)) {
                            control.uid = uniqueId('plat_');
                        }

                        control.templateControl = templateControl;
                    }

                    if (isClone) {
                        newNodes.push({
                            control: control,
                            expressions: node.expressions,
                            identifiers: node.identifiers,
                            node: !!attributes ?
                                (attributes.getNamedItem(nodeName) || attributes.getNamedItem('data-' + nodeName)) :
                                null,
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
                    nodes.sort((a, b) => {
                        var aControl = <controls.IAttributeControl>a.control,
                            bControl = <controls.IAttributeControl>b.control;

                        if (isNull(aControl)) {
                            return 1;
                        } else if (isNull(bControl)) {
                            return -1;
                        }

                        var aPriority = isNumber(aControl.priority) ? aControl.priority : 0,
                            bPriority = isNumber(bControl.priority) ? bControl.priority : 0;

                        return bPriority - aPriority;
                    });

                    for (i = 0; i < length; ++i) {
                        node = nodes[i];
                        control = <controls.IAttributeControl>node.control;

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
            }

            /**
             * Returns an instance of an ElementManager.
             */
            static getInstance(): IElementManager {
                return new ElementManager();
            }

            /**
             * Iterates over the attributes NamedNodeMap, creating an INodeMap. The INodeMap 
             * will contain injectors for all the IControls as well as parsed expressions
             * and identifiers found for each Attribute (useful for data binding).
             * 
             * @static
             * @param attributes A NamedNodeMap to compile into an INodeMap
             * @return {INodeMap} The compiled NamedNodeMap
             */
            static _collectAttributes(attributes: NamedNodeMap): INodeMap {
                var nodes: Array<INode> = [],
                    attribute: Attr,
                    name: string,
                    value: string,
                    childContext: expressions.IParsedExpression,
                    childIdentifier: string,
                    hasMarkup: boolean,
                    hasMarkupFn = NodeManager.hasMarkup,
                    findMarkup = NodeManager.findMarkup,
                    findUniqueIdentifiers = NodeManager.findUniqueIdentifiers,
                    $parser = NodeManager.$Parser,
                    build = NodeManager.build,
                    expressions: Array<expressions.IParsedExpression>,
                    hasControl = false,
                    injector: dependency.IInjector<IControl>,
                    length = attributes.length,
                    controlAttributes: IObject<string> = {},
                    uniqueIdentifiers: Array<string>;

                for (var i = 0; i < length; ++i) {
                    attribute = attributes[i];
                    value = attribute.value;
                    name = attribute.name.replace(/^data-/i, '').toLowerCase();
                    injector = controlInjectors[name] || viewControlInjectors[name];
                    expressions = [];
                    uniqueIdentifiers = [];

                    if (name === 'plat-context') {
                        childContext = $parser.parse(value);
                        if (childContext.identifiers.length !== 1) {
                            var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                            $exception.warn('Incorrect plat-context: ' +
                                value + ', must contain a single identifier.', $exception.COMPILE);
                        }
                        childIdentifier = childContext.identifiers[0];
                    } else if (name !== 'plat-control') {
                        hasMarkup = hasMarkupFn(value);

                        if (hasMarkup) {
                            expressions = findMarkup(value);
                            uniqueIdentifiers = findUniqueIdentifiers(expressions);
                            if (uniqueIdentifiers.length === 0) {
                                attribute.value = value = build(expressions);
                            }
                        }

                        if (!hasControl && (hasMarkup || !isNull(injector))) {
                            hasControl = true;
                        }

                        nodes.push({
                            control: null,
                            node: attribute,
                            nodeName: name,
                            expressions: expressions,
                            identifiers: uniqueIdentifiers,
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
            }

            /**
             * Used to copy the attribute nodes during the cloning process.
             * 
             * @static
             * @param nodes The compiled INodes to be cloned.
             * @return {INodeMap} The cloned array of INodes.
             */
            static _copyAttributeNodes(nodes: Array<INode>): Array<INode> {
                var newNodes: Array<INode> = [],
                    length = nodes.length,
                    node: INode;

                for (var i = 0; i < length; ++i) {
                    node = nodes[i];
                    newNodes.push({
                        identifiers: node.identifiers,
                        expressions: node.expressions,
                        nodeName: node.nodeName
                    });
                }

                return newNodes;
            }

            /**
             * Clones an INode with a new node.
             * 
             * @static
             * @param sourceNode The original INode.
             * @param node The new node used for cloning.
             * @param newControl An optional new control to associate with the cloned node.
             * @return {INode} The clones INode.
             */
            static _cloneNode(sourceNode: INode, node: Node, newControl?: ui.ITemplateControl): INode {
                return {
                    control: newControl,
                    injector: sourceNode.injector,
                    identifiers: sourceNode.identifiers,
                    expressions: sourceNode.expressions,
                    node: node,
                    nodeName: sourceNode.nodeName
                };
            }

            /**
             * Clones an INodeMap with a new element.
             * 
             * @static
             * @param sourceMap The original INodeMap.
             * @param element The new Element used for cloning.
             * @param newControl An optional new control to associate with the element.
             * @return {INodeMap} The cloned INodeMap.
             */
            static _cloneNodeMap(sourceMap: INodeMap, element: Element,
                parent: ui.ITemplateControl, newControl?: ui.ITemplateControl): INodeMap {
                var hasControl = sourceMap.hasControl,
                    nodeMap: INodeMap = {
                        attributes: sourceMap.attributes,
                        childContext: sourceMap.childContext,
                        nodes: [],
                        element: <HTMLElement>element,
                        uiControlNode: !isNull(sourceMap.uiControlNode) ?
                        <IUiControlNode>ElementManager._cloneNode(sourceMap.uiControlNode, element, newControl) : null,
                        hasControl: hasControl
                    };

                if (hasControl) {
                    nodeMap.nodes = ElementManager.createAttributeControls(sourceMap, parent, newControl, element, true);
                }
                return nodeMap;
            }

            $Promise: async.IPromise = acquire(__Promise);
            $Compiler: ICompiler = acquire(__Compiler);
            $ContextManagerStatic: observable.IContextManagerStatic = acquire(__ContextManagerStatic);
            $CommentManagerFactory: ICommentManagerFactory = acquire(__CommentManagerFactory);
            $ControlFactory: IControlFactory = acquire(__ControlFactory);
            $TemplateControlFactory: ui.ITemplateControlFactory = acquire(__TemplateControlFactory);

            children: Array<INodeManager> = [];
            type: string = 'element';
            replace: boolean = false;
            replaceNodeLength: number;
            hasOwnContext: boolean = false;
            loadedPromise: async.IThenable<void>;
            templatePromise: async.IThenable<void>;

            clone(newNode: Node, parentManager: IElementManager, nodeMap?: INodeMap): number {
                var childNodes: Array<Node>,
                    clonedManager: IElementManager,
                    replace = this.replace,
                    nodeMapExists = !isNull(nodeMap),
                    newControl = nodeMapExists ? nodeMap.uiControlNode.control : null,
                    newControlExists = !isNull(newControl),
                    startNodeManager: INodeManager,
                    endNodeManager: INodeManager,
                    parentControl = parentManager.getUiControl() || parentManager.getParentControl();

                if (!newControlExists) {
                    // create new control
                    newControl = ElementManager.cloneUiControl(this.nodeMap, parentControl);

                    newControlExists = !isNull(newControl);
                }

                if (replace) {
                    // definitely have newControl
                    var nodes = newNode.parentNode.childNodes,
                        startIndex = Array.prototype.indexOf.call(nodes, newNode);

                    childNodes = Array.prototype.slice.call(nodes, startIndex + 1, startIndex + this.replaceNodeLength);
                    clonedManager = ElementManager.clone(this, parentManager, null, newControl, nodeMap);
                    newControl.elementNodes = childNodes;
                    newControl.startNode = newNode;
                    newControl.endNode = childNodes.pop();

                    startNodeManager = this.children.shift();
                    endNodeManager = this.children.shift();

                    startNodeManager.clone(newControl.startNode, clonedManager);
                    endNodeManager.clone(newControl.endNode, clonedManager);

                    if (isFunction(newControl.initialize)) {
                        newControl.initialize();
                    }
                } else {
                    childNodes = Array.prototype.slice.call(newNode.childNodes);
                    clonedManager = ElementManager.clone(this, parentManager, <Element>newNode, newControl, nodeMap);
                    nodeMap = clonedManager.nodeMap;

                    if (newControlExists) {
                        newControl.element = <HTMLElement>newNode;
                        if (isFunction(newControl.initialize)) {
                            newControl.initialize();
                        }
                    }
                }

                if (clonedManager.hasOwnContext) {
                    postpone(() => {
                        clonedManager.observeRootContext(newControl, clonedManager.bindAndLoad);
                    });
                }

                var children = this.children,
                    length = children.length,
                    childNodeOffset = 0;

                for (var i = 0; i < length; ++i) {
                    //clone children
                    childNodeOffset += children[i].clone(childNodes[childNodeOffset], clonedManager);
                }

                if (replace) {
                    this.children.unshift(endNodeManager);
                    this.children.unshift(startNodeManager);

                    return childNodeOffset + 2;
                }

                return 1;
            }

            initialize(nodeMap: INodeMap, parent: IElementManager, dontInitialize?: boolean): void {
                super.initialize(nodeMap, parent);

                var parentControl = this.getParentControl(),
                    controlNode = nodeMap.uiControlNode,
                    control: ui.ITemplateControl,
                    hasAttributeControl = nodeMap.hasControl,
                    hasUiControl = !isNull(controlNode),
                    replaceElement = false;

                if (hasUiControl) {
                    this._populateUiControl();
                    control = controlNode.control;
                    this.hasOwnContext = control.hasOwnContext;
                }

                if (hasAttributeControl) {
                    ElementManager.createAttributeControls(nodeMap, parentControl, control);
                }

                if (!dontInitialize && hasUiControl && isFunction(control.initialize)) {
                    control.initialize();
                }
            }

            bind(): void {
                var nodeMap = this.nodeMap,
                    parent = this.getParentControl(),
                    controlNode = nodeMap.uiControlNode,
                    uiControl: ui.ITemplateControl,
                    nodes = nodeMap.nodes,
                    node: INode,
                    controls: Array<IControl> = [],
                    control: IControl,
                    attributes = nodeMap.attributes,
                    hasParent = !isNull(parent),
                    getManager = this.$ContextManagerStatic.getManager,
                    contextManager: observable.IContextManager,
                    absoluteContextPath = hasParent ? parent.absoluteContextPath : 'context',
                    hasUiControl = !isNull(controlNode),
                    replace = this.replace;

                if (hasUiControl) {
                    uiControl = controlNode.control;
                    controls.push(uiControl);

                    var childContext = nodeMap.childContext,
                        $TemplateControlFactory = this.$TemplateControlFactory;

                    if (!isNull(childContext)) {
                        if (childContext[0] === '@') {
                            var split = childContext.split('.'),
                                alias = split.shift().substr(1),
                                resourceObj = $TemplateControlFactory.findResource(uiControl, alias);

                            if (!isNull(resourceObj)) {
                                if (resourceObj.resource.type === 'observable') {
                                    var identifier = (split.length > 0) ? '.' + split.join('.') : '';
                                    absoluteContextPath = 'resources.' + alias + '.value' + identifier;
                                    contextManager = getManager(resourceObj.control);
                                    uiControl.root = resourceObj.control;
                                } else {
                                    var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                                    $exception.warn('Only resources of type observable can be set as context.',
                                        $exception.CONTEXT);
                                }
                            }
                        } else {
                            absoluteContextPath = absoluteContextPath + '.' + childContext;
                        }
                    }

                    uiControl.root = this.$ControlFactory.getRootControl(uiControl) || uiControl;

                    contextManager = getManager(uiControl.root);

                    if (!uiControl.hasOwnContext) {
                        uiControl.context = contextManager.getContext(absoluteContextPath.split('.'));
                    } else {
                        absoluteContextPath = 'context';
                    }

                    $TemplateControlFactory.setAbsoluteContextPath(uiControl, absoluteContextPath);
                    $TemplateControlFactory.setContextResources(uiControl);
                    ElementManager.$ResourcesFactory.bindResources(uiControl.resources);

                    contextManager.observe(uiControl.absoluteContextPath, {
                        uid: uiControl.uid,
                        listener: (newValue, oldValue) => {
                            $TemplateControlFactory.contextChanged(uiControl, newValue, oldValue);
                        }
                    });

                    if (!replace) {
                        var element = uiControl.element;
                        if (!isNull(element) && isFunction(element.removeAttribute)) {
                            element.removeAttribute('plat-hide');
                        }
                    }
                }

                this._observeControlIdentifiers(nodes, parent, controls);
                this._loadAttributeControls(<Array<controls.IAttributeControl>>controls, uiControl);
            }

            setUiControlTemplate(templateUrl?: string): void {
                var nodeMap = this.nodeMap,
                    controlNode = nodeMap.uiControlNode,
                    control: ui.ITemplateControl;

                if (!isNull(controlNode)) {
                    control = controlNode.control;

                    this.templatePromise = this.$TemplateControlFactory.determineTemplate(control, templateUrl).then((template) => {
                        this.templatePromise = null;
                        this._initializeControl(control, <DocumentFragment>template.cloneNode(true));
                    }, (error) => {
                        this.templatePromise = null;
                        if (isNull(error)) {
                            this._initializeControl(control, error);
                        } else {
                            postpone(() => {
                                var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                                $exception.fatal(error, $exception.COMPILE);
                            });
                        }
                    });

                    return;
                }

                if (!isNull(this.parent)) {
                    return;
                }

                this.bindAndLoad();
            }

            getUiControl(): ui.ITemplateControl {
                var uiControlNode = this.nodeMap.uiControlNode;
                if (isNull(uiControlNode)) {
                    return;
                }

                return uiControlNode.control;
            }

            fulfillTemplate(): async.IThenable<any> {
                    if (!isNull(this.templatePromise)) {
                        return this.templatePromise.then(() => {
                            return this._fulfillChildTemplates();
                        });
                    }

                return this._fulfillChildTemplates();
            }

            bindAndLoad(): async.IThenable<void> {
                var children = this.children,
                    length = children.length,
                    child: INodeManager,
                    promises: Array<async.IThenable<void>> = [];

                this.bind();

                for (var i = 0; i < length; ++i) {
                    child = children[i];
                    if ((<IElementManager>child).hasOwnContext) {
                        promises.push((<IElementManager>child).loadedPromise);
                        continue;
                    }

                    if (!isUndefined((<IElementManager>child).children)) {
                        promises.push((<IElementManager>child).bindAndLoad());
                    } else {
                        child.bind();
                    }
                }

                return this.$Promise.all(promises).then(() => {
                    this.$ControlFactory.load(this.getUiControl());
                }).catch((error: any) => {
                    postpone(() => {
                        var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                        $exception.fatal(error, $exception.BIND);
                    });
                });
            }

            observeRootContext(root: ui.ITemplateControl, loadMethod: () => async.IThenable<void>): void {
                if (!isNull(root.context)) {
                    this.loadedPromise = loadMethod.call(this);
                    return;
                }

                this.loadedPromise = new this.$Promise<void>((resolve, reject) => {
                    var contextManager: observable.IContextManager = this.$ContextManagerStatic.getManager(root);

                    var removeListener = contextManager.observe('context', {
                        listener: () => {
                            removeListener();
                            loadMethod.call(this).then(resolve);
                        },
                        uid: root.uid
                    });
                }).catch((error) => {
                    postpone(() => {
                        var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                        $exception.fatal(error, $exception.BIND);
                    });
                });
            }

            /**
             * Observes the identifiers associated with this ElementManager's INodes.
             * 
             * @param nodes The array of INodes to iterate through.
             * @param parent The parent ITemplateControl for context.
             * @param controls The array of controls whose attributes will need to be updated 
             * upon the context changing.
             */
            _observeControlIdentifiers(nodes: Array<INode>, parent: ui.ITemplateControl,
                controls: Array<IControl>): void {
                var length = nodes.length,
                    bindings: Array<INode> = [],
                    attributeChanged = this._attributeChanged,
                    hasParent = !isNull(parent),
                    node: INode,
                    control: IControl;

                for (var i = 0; i < length; ++i) {
                    node = nodes[i];
                    control = node.control;

                    if (hasParent && node.identifiers.length > 0) {
                        NodeManager.observeIdentifiers(node.identifiers, parent,
                            attributeChanged.bind(this, node, parent, controls));
                        bindings.push(node);
                    }

                    if (!isNull(control)) {
                        controls.push(control);
                    }
                }

                length = bindings.length;
                for (i = 0; i < length; ++i) {
                    this._attributeChanged(bindings[i], parent, controls);
                }
            }

            /**
             * Loads the AttributeControls associated with this ElementManager and 
             * attaches the corresponding ITemplateControl if available.
             * 
             * @param controls The array of controls to load.
             * @param templateControl The ITemplateControl associated with this 
             * ElementManager.
             */
            _loadAttributeControls(controls: Array<controls.IAttributeControl>,
                templateControl: ui.ITemplateControl): void {
                var length = controls.length,
                    control: controls.IAttributeControl,
                    load = this.$ControlFactory.load,
                    i = isNull(templateControl) ? 0 : 1;

                for (; i < length; ++i) {
                    control = controls[i];
                    control.templateControl = templateControl;

                    load(control);
                }
            }

            /**
             * Fulfills the template promise prior to binding and loading the control.
             */
            _fulfillAndLoad(): async.IThenable<void> {
                return this.fulfillTemplate().then(() => {
                    return this.bindAndLoad();
                }).catch((error) => {
                    postpone(() => {
                        var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                        $exception.fatal(error, $exception.BIND);
                    });
                });
            }

            /**
             * Populates the ITemplateControl properties associated with this ElementManager 
             * if one exists.
             */
            _populateUiControl(): void {
                var nodeMap = this.nodeMap,
                    parent = this.getParentControl(),
                    controlNode = nodeMap.uiControlNode,
                    uiControl = controlNode.control,
                    hasParent = !isNull(parent),
                    element = nodeMap.element,
                    attributes = nodeMap.attributes,
                    newAttributes: ui.IAttributesInstance = acquire(__AttributesInstance);

                ElementManager.$ManagerCache.put(uiControl.uid, this);

                if (hasParent && uiControl.parent !== parent) {
                    parent.controls.push(uiControl);
                    uiControl.parent = parent;
                }
                if (isFunction(element.setAttribute)) {
                    element.setAttribute('plat-hide', '');
                }
                uiControl.element = element;
                uiControl.controls = [];

                newAttributes.initialize(uiControl, attributes);
                uiControl.attributes = newAttributes;

                if (!isNull(uiControl.resources)) {
                    uiControl.resources.add(controlNode.resourceElement);
                } else {
                    var resources = ElementManager.$ResourcesFactory.getInstance();
                    resources.initialize(uiControl, controlNode.resourceElement);
                    uiControl.resources = resources;
                }

                ElementManager.$ResourcesFactory.addControlResources(uiControl);
                uiControl.type = controlNode.nodeName;

                if (!isString(uiControl.uid)) {
                    uiControl.uid = uniqueId('plat_');
                }

                uiControl.bindableTemplates = uiControl.bindableTemplates ||
                    ElementManager.$BindableTemplatesFactory.create(uiControl);

                if ((element.childNodes.length > 0) &&
                    (!isEmpty(uiControl.templateString) || !isEmpty(uiControl.templateUrl))) {
                    uiControl.innerTemplate = <DocumentFragment>appendChildren(element.childNodes);
                }

                var replace = this.replace = (uiControl.replaceWith === null || uiControl.replaceWith === '');

                if (replace) {
                    this._replaceElement(uiControl, nodeMap);
                }
            }

            /**
             * Removes the ITemplateControl's element. Called if its replaceWith property is 
             * null or empty string.
             * 
             * @param control The ITemplateControl whose element will be removed.
             * @param nodeMap The INodeMap associated with this ElementManager.
             */
            _replaceElement(control: ui.ITemplateControl, nodeMap: INodeMap): void {
                var element = nodeMap.element,
                    parentNode = element.parentNode,
                    $document = ElementManager.$Document,
                    controlType = control.type,
                    controlUid = control.uid,
                    startNode = control.startNode = $document.createComment(controlType + ' ' + controlUid + ': start node'),
                    endNode = control.endNode = $document.createComment(controlType + ' ' + controlUid + ': end node'),
                    create = this.$CommentManagerFactory.create;

                create(startNode, this);
                create(endNode, this);

                parentNode.insertBefore(startNode, element);
                parentNode.insertBefore(endNode, element.nextSibling);
                control.elementNodes = replace(element);

                control.element = nodeMap.element = null;
            }

            /**
             * Initializes a control's template and compiles the control.
             * 
             * @param uiControl The ITemplateControl associated with this ElementManager.
             * @param template The uiControl's template.
             */
            _initializeControl(uiControl: ui.ITemplateControl, template: DocumentFragment): void {
                var element = this.nodeMap.element,
                    //have to check if null since isNull checks for undefined case
                    replaceElement = this.replace,
                    hasOwnContext = uiControl.hasOwnContext,
                    hasParent = !isNull(uiControl.parent),
                    endNode: Node;

                if (!isNull(template)) {
                    var resourceElement = ElementManager.locateResources(template);

                    if (!isNull(resourceElement)) {
                        uiControl.resources.add(ElementManager.$ResourcesFactory.parseElement(resourceElement));
                    }

                    if (replaceElement) {
                        endNode = uiControl.endNode;
                        uiControl.elementNodes = Array.prototype.slice.call(template.childNodes);
                        insertBefore(endNode.parentNode, template, endNode);
                    } else {
                        insertBefore(element, template, element.lastChild);
                    }
                }

                if (isFunction(uiControl.setTemplate)) {
                    uiControl.setTemplate();
                }

                if (replaceElement) {
                    this.$Compiler.compile(uiControl.elementNodes, uiControl);
                    var startNode = uiControl.startNode,
                        parentNode = startNode.parentNode,
                        childNodes: Array<Node> = Array.prototype.slice.call(parentNode.childNodes);

                    endNode = uiControl.endNode;

                    uiControl.elementNodes = childNodes.slice(childNodes.indexOf(startNode) + 1, childNodes.indexOf(endNode));
                    this.replaceNodeLength = uiControl.elementNodes.length + 2;
                } else {
                    this.$Compiler.compile(element, uiControl);
                }

                if (hasOwnContext && !this.isClone) {
                    this.observeRootContext(uiControl, this._fulfillAndLoad);
                } else if (!hasParent) {
                    this._fulfillAndLoad();
                }
            }

            /**
             * A function to handle updating an attribute on all controls that have it 
             * as a property upon a change in its value.
             * 
             * @param node The INode where the change occurred.
             * @param parent The parent ITemplateControl used for context.
             * @param controls The controls that have the changed attribute as a property.
             */
            _attributeChanged(node: INode, parent: ui.ITemplateControl, controls: Array<IControl>): void {
                var length = controls.length,
                    key = camelCase(node.nodeName),
                    attribute = <Attr>node.node,
                    value = NodeManager.build(node.expressions, parent),
                    attributes: ui.IAttributesInstance,
                    oldValue: any;

                for (var i = 0; i < length; ++i) {
                    attributes = controls[i].attributes;
                    oldValue = (<any>attributes)[key];
                    (<any>attributes)[key] = value;
                    attributes.attributeChanged(key, value, oldValue);
                }

                if (!this.replace) {
                    attribute.value = value;
                }
            }

            /**
             * Runs through all the children of this manager and calls fulfillTemplate.
             */
            _fulfillChildTemplates() {
                var children = this.children,
                    child: INodeManager,
                    length = children.length,
                    promises: Array<async.IThenable<any>> = [];

                for (var i = 0; i < length; ++i) {
                    child = children[i];
                    if (!isUndefined((<IElementManager>child).children)) {
                        promises.push((<IElementManager>child).fulfillTemplate());
                    }
                }

                return this.$Promise.all(promises).catch((error) => {
                    postpone(() => {
                        var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                        $exception.fatal(error, $exception.COMPILE);
                    });
                });
            }
        }

        /**
         * The Type for referencing the '$ElementManagerFactory' injectable as a dependency.
         */
        export function IElementManagerFactory(
            $Document?: Document,
            $ManagerCache?: storage.ICache<IElementManager>,
            $ResourcesFactory?: ui.IResourcesFactory,
            $BindableTemplatesFactory?: ui.IBindableTemplatesFactory): IElementManagerFactory {
                ElementManager.$Document = $Document;
                ElementManager.$ManagerCache = $ManagerCache;
                ElementManager.$ResourcesFactory = $ResourcesFactory;
                ElementManager.$BindableTemplatesFactory = $BindableTemplatesFactory;
                return ElementManager;
        }

        register.injectable(__ElementManagerFactory, IElementManagerFactory, [
            __Document,
            __ManagerCache,
            __ResourcesFactory,
            __BindableTemplatesFactory
        ], register.FACTORY);

        /**
         * Creates and manages a class for dealing with Element nodes.
         */
        export interface IElementManagerFactory {
            /**
             * Determines if the associated Element has controls that need to be instantiated or Attr nodes
             * containing text markup. If controls exist or markup is found a new ElementManager will be created,
             * else an empty INodeManager will be added to the Array of INodeManagers.
             *
             * @static
             * @param element The Element to use to identifier markup and controls.
             * @param parent The parent ui.ITemplateControl used for context inheritance.
             */
            create(element: Element, parent?: IElementManager): IElementManager;

            /**
             * Creates new nodes for an INodeMap corresponding to the element associated with the nodeMap or
             * the passed-in element.
             *
             * @static
             * @param nodeMap The nodeMap to populate with attribute nodes.
             * @param parent The parent control for the new attribute controls.
             * @param templateControl The TemplateControl linked to these AttributeControls if 
             * one exists.
             * @param newElement An optional element to use for attributes (used in cloning).
             * @param isClone Whether or not these controls are clones.
             */
            createAttributeControls(nodeMap: INodeMap, parent: ui.ITemplateControl,
                templateControl?: ui.ITemplateControl, newElement?: Element, isClone?: boolean): Array<INode>;

            /**
             * Clones a UI Control with a new nodeMap.
             *
             * @static
             * @param sourceMap The source INodeMap used to clone the UI Control
             * @param parent The parent control of the clone.
             */
            cloneUiControl(sourceMap: INodeMap, parent: ui.ITemplateControl): ui.ITemplateControl;

            /**
             * Clones an ElementManager with a new element.
             *
             * @static
             * @param sourceManager The original IElementManager.
             * @param parent The parent IElementManager for the new clone.
             * @param element The new element to associate with the clone.
             * @param newControl An optional control to associate with the clone.
             * @param nodeMap The nodeMap used to clone this ElementManager.
             */
            clone(sourceManager: IElementManager, parent: IElementManager,
                element: Element, newControl?: ui.ITemplateControl, nodeMap?: INodeMap): IElementManager;

            /**
             * Looks through the Node's child nodes to try and find any
             * defined Resources in a <plat-resources> tags.
             *
             * @static
             * @param node The node who may have Resources as a child node.
             */
            locateResources(node: Node): HTMLElement;

            /**
             * Returns a new instance of an IElementManager
             * 
             * @static
             */
            getInstance(): IElementManager;
        }

        /**
         * An ElementManager is responsible for initializing and data-binding controls associated to an Element.
         * 
         */
        export interface IElementManager extends INodeManager {
            /**
             * The child managers for this manager.
             */
            children: Array<INodeManager>;

            /**
             * Specifies whether or not this manager has a uiControl which has 
             * replaceWith set to null or empty string.
             */
            replace: boolean;

            /**
             * The length of a replaced control, indiates the number of nodes to slice 
             * out of the parent's childNodes.
             */
            replaceNodeLength: number;

            /**
             * Indicates whether the control for this manager hasOwnContext.
             */
            hasOwnContext: boolean;

            /**
             * Lets us know when an ElementManager is a cloned manager, or the compiled 
             * manager from BindableTemplates. We do not want to bindAndLoad compiled 
             * managers that are clones.
             */
            isClone: boolean;

            /**
             * In the event that a control hasOwnContext, we need a promise to fullfill 
             * when the control is loaded to avoid loading its parent control first.
             */
            loadedPromise: async.IThenable<void>;

            /**
             * A templatePromise set when a uiControl specifies a templateUrl.
             */
            templatePromise: async.IThenable<void>;

            /**
             * Clones the IElementManager with a new node.
             * 
             * @param newNode The new element used to clone the ElementManager.
             * @param parentManager The parent for the clone.
             * @param nodeMap An optional INodeMap to clone a ui control if needed.
             */
            clone(newNode: Node, parentManager: IElementManager, nodeMap?: INodeMap): number;

            /**
             * Initializes all the controls associated to the ElementManager's nodeMap. 
             * The INodeManager array must be passed in because if this ElementManager is 
             * used for transclusion, it can't rely on one INodeManager array.
             * 
             * @param parent The parent IElementManager.
    	     * @param dontInitialize Specifies whether or not the initialize method should 
    	     * be called for a control.
             * @param dontInitialize Specifies whether or not the initialize method should 
             * be called for a control.
             */
            initialize(nodeMap: INodeMap, parent: IElementManager, dontInitialize?: boolean): void;

            /**
             * Observes the root context for controls that specify their own context, and initiates 
             * a load upon a successful set of the context.
             * 
             * @param root The ITemplateControl specifying its own context.
             * @param loadMethod The function to initiate the loading of the root control and its 
             * children.
             */
            observeRootContext(root: ui.ITemplateControl, loadMethod: () => async.IThenable<void>): void;

            /**
             * Links the data context to the DOM (data-binding).
             */
            bind(): void;

            /**
             * Sets the template for an ElementManager by calling its associated UI Control's
             * setTemplate method.
             * 
             * @param templateUrl An optional templateUrl used to override the control's template.
             */
            setUiControlTemplate(templateUrl?: string): void;

            /**
             * Retrieves the UI control instance for this ElementManager.
             */
            getUiControl(): ui.ITemplateControl;

            /**
             * Fullfills any template template promises and finishes the compile phase
             * for the template associated to this ElementManager.
             * 
             * @return {async.IPromise} A promise, fulfilled when the template 
             * is complete.
             */
            fulfillTemplate(): async.IThenable<any>;

            /**
             * Binds context to the DOM and loads controls.
             */
            bindAndLoad(): async.IThenable<void>;
        }

        /**
         * The class responsible for initializing and data-binding values to text nodes.
         */
        export class TextManager extends NodeManager implements ITextManager {
            /**
             * Determines if a text node has markup, and creates a TextManager if it does.
             * A TextManager or empty TextManager will be added to the managers array.
             * 
             * @static
             * @param node The Node used to find markup.
             * @param parent The parent ITemplateControl for the node.
             */
            static create(node: Node, parent: IElementManager): ITextManager {
                var value = node.nodeValue,
                    manager = new TextManager();

                if (NodeManager.hasMarkup(value)) {
                    var expressions = NodeManager.findMarkup(value),
                        map = {
                            nodes: [{
                                node: node,
                                expressions: expressions,
                                identifiers: NodeManager.findUniqueIdentifiers(expressions),
                            }]
                        };

                    manager.initialize(map, parent);

                    return manager;
                }

                manager.initialize(null, parent);
                manager.bind = noop;

                return manager;
            }

            /**
             * Clones an INodeMap with a new text node.
             * 
             * @static
             * @param sourceMap The original INodeMap.
             * @param newNode The new text node used for cloning.
             */
            static _cloneNodeMap(sourceMap: INodeMap, newNode: Node): INodeMap {
                var node = sourceMap.nodes[0],
                    nodeMap: INodeMap = {
                        nodes: [{
                            identifiers: node.identifiers,
                            expressions: node.expressions,
                            nodeName: node.nodeName,
                            node: newNode
                        }]
                    };
                return nodeMap;
            }

            /**
             * Clones a TextManager with a new text node.
             * 
             * @static
             * @param sourceManager The original INodeManager.
             * @param node The new text node to associate with the clone.
             * @param parent The parent IElementManager for the new clone.
             */
            static _clone(sourceManager: INodeManager, node: Node, parent: IElementManager): ITextManager {
                var map = sourceManager.nodeMap,
                    manager = new TextManager();

                if (!isNull(map)) {
                    manager.initialize(TextManager._cloneNodeMap(map, node), parent);
                } else {
                    manager.initialize(null, parent);
                    manager.bind = noop;
                }

                return manager;
            }

            /**
             * Specifies the type for this INodeManager.
             */
            type: string = 'text';

            clone(newNode: Node, parentManager: IElementManager): number {
                TextManager._clone(this, newNode, parentManager);
                return 1;
            }

            bind(): void {
                var parent = this.getParentControl(),
                    node = this.nodeMap.nodes[0],
                    textNode = node.node,
                    expressions = node.expressions;

                NodeManager.observeIdentifiers(node.identifiers, parent,
                    this._setText.bind(this, textNode, parent, expressions));

                this._setText(textNode, parent, expressions);
            }

            /**
             * Builds the node expression and sets the value.
             * 
             * @param Node The associated node whose value will be set.
             * @param control The control whose context will be used to bind 
             * the data.
             * @param expressions An array of parsed expressions used to build 
             * the node value.
             */
            _setText(node: Node, control: ui.ITemplateControl, expressions: Array<expressions.IParsedExpression>): void {
                var control = control || <ui.ITemplateControl>{},
                    value: any;

                value = NodeManager.build(expressions, control);

                node.nodeValue = value;
            }
        }

        /**
         * The Type for referencing the '$TextManagerFactory' injectable as a dependency.
         */
        export function ITextManagerFactory(): ITextManagerFactory {
            return TextManager;
        }

        register.injectable(__TextManagerFactory, ITextManagerFactory, null, register.FACTORY);

        /**
         * Creates and manages a class for dealing with Text nodes.
         */
        export interface ITextManagerFactory {
            /**
             * Determines if a text node has markup, and creates a TextManager if it does.
             * A TextManager or empty TextManager will be added to the managers array.
             * 
             * @static
             * @param node The Node used to find markup.
             * @param parent The parent ui.ITemplateControl for the node.
             */
            create(node: Node, parent?: IElementManager): ITextManager;
        }

        /**
         * An object responsible for initializing and data-binding values to text nodes.
         */
        export interface ITextManager extends INodeManager {
            /**
             * Clones this ITextManager with a new node.
             * 
             * @param newNode The new node attached to the cloned ITextManager.
             * @param parentManager The parent IElementManager for the clone.
             */
            clone(newNode: Node, parentManager: IElementManager): number;

            /**
             * The function used for data-binding a data context to the DOM.
             */
            bind(): void;
        }

        /**
         * A class used to manage Comment nodes. Provides a way to 
         * clone a Comment node.
         */
        export class CommentManager extends NodeManager implements ICommentManager {
            /**
             * Creates a new CommentManager for the given Comment node.
             * 
             * @static
             * @param node The Comment to associate with the new manager.
             * @param parent The parent IElementManager.
             */
            static create(node: Node, parent: IElementManager): ICommentManager {
                var manager = new CommentManager();

                manager.initialize({
                    nodes: [{
                        node: node
                    }]
                }, parent);

                return manager;
            }

            /**
             * Specifies the type of INodeManager.
             */
            type: string = 'comment';

            clone(newNode: Node, parentManager: IElementManager): number {
                CommentManager.create(newNode, parentManager);
                return 1;
            }
        }

        /**
         * The Type for referencing the '$CommentManagerFactory' injectable as a dependency.
         */
        export function ICommentManagerFactory(): ICommentManagerFactory {
            return CommentManager;
        }

        register.injectable(__CommentManagerFactory, ICommentManagerFactory, null, register.FACTORY);

        /**
         * Creates and manages a class for dealing with Comment nodes.
         */
        export interface ICommentManagerFactory {
            /**
             * Creates a new CommentManager for the given Comment node.
             *
             * @static
             * @param node The Comment to associate with the new manager.
             * @param parent The parent IElementManager.
             */
            create(node: Node, parent: IElementManager): ICommentManager;
        }

        /**
         * An object used to manage Comment nodes.
         */
        export interface ICommentManager extends INodeManager {
            /**
             * A method for cloning this CommentManager.
             * 
             * @param newNode The new Comment node to associate with the cloned
             * manager.
             * @param parentManager The parent IElementManager for the new clone.
             */
            clone(newNode: Node, parentManager: IElementManager): number;
        }
    }
    export module navigation {
        /**
         * A class that defines the base Navigation properties and methods.
         */
        export class BaseNavigator implements IBaseNavigator {
            $EventManagerStatic: events.IEventManagerStatic = acquire(__EventManagerStatic);
            $NavigationEventStatic: events.INavigationEventStatic = acquire(__NavigationEventStatic);
            $BaseViewControlFactory: ui.IBaseViewControlFactory = acquire(__BaseViewControlFactory);
            $ContextManagerStatic: observable.IContextManagerStatic = acquire(__ContextManagerStatic);

            uid: string;
            baseport: ui.controls.IBaseport;
            currentState: IBaseNavigationState;

            /**
             * Define unique id and subscribe to the 'goBack' event
             */
            constructor() {
                this.$ContextManagerStatic.defineGetter(this, 'uid', uniqueId('plat_'));
                this.$EventManagerStatic.on(this.uid, 'goBack', this.goBack, this);
            }

            initialize(baseport: ui.controls.IBaseport): void {
                this.baseport = baseport;
            }

            navigate(navigationParameter: any, options: IBaseNavigationOptions): void { }

            navigated(control: ui.IBaseViewControl, parameter: any, options: IBaseNavigationOptions): void {
                this.currentState = {
                    control: control
                };

                control.navigator = this;
                control.navigatedTo(parameter);

                this._sendEvent('navigated', control, control.type, parameter, options, false);
            }

            goBack(options?: IBaseBackNavigationOptions): void { }

            /**
             * Sends a NavigationEvent with the given parameters.  The 'sender' property of the event will be the 
             * navigator.
             * 
             * @param name The name of the event to send.
             * @param target The target of the event, could be a view control or a route depending upon the navigator and 
             * event name.
             * @param options The IBaseNavigationOptions used during navigation
             * @param cancelable Whether or not the event can be canceled, preventing further navigation.
             */
            _sendEvent(name: string, target: any, type: string, parameter: any,
                options: IBaseNavigationOptions, cancelable: boolean): events.INavigationEvent<any> {
                return this.$NavigationEventStatic.dispatch(name, this, {
                    target: target,
                    type: type,
                    parameter: parameter,
                    options: options,
                    cancelable: cancelable
                });
            }
        }

        /**
         * Defines the methods that a Navigator must implement.
         */
        export interface IBaseNavigator {
            /**
             * A unique identifier used to identify this navigator.
             */
            uid: string;

            /**
             * Every navigator will have a viewport with which to communicate and 
             * facilitate navigation.
             */
            baseport: ui.controls.IBaseport;

            /**
             * Specifies the current state of navigation. This state should contain 
             * enough information for it to be pushed onto the history stack when 
             * necessary.
             */
            currentState: IBaseNavigationState;

            /**
             * Initializes a Navigator. The viewport will call this method and pass itself in so 
             * the navigator can store it and use it to facilitate navigation.
             * 
             * @param baseport The baseport instance this navigator will be attached to.
             */
            initialize(baseport: ui.controls.IBaseport): void;

            /**
             * Allows a ui.IBaseViewControl to navigate to another ui.IBaseViewControl. Also allows for
             * navigation parameters to be sent to the new ui.IBaseViewControl.
             * 
             * @param navigationParameter An optional navigation parameter to send to the next ui.IBaseViewControl.
             * @param options Optional IBaseNavigationOptions used for navigation.
             */
            navigate(navigationParameter: any, options?: IBaseNavigationOptions): void;

            /**
             * Called by the Viewport to make the Navigator aware of a successful navigation. The Navigator will
             * in-turn call the app.navigated event.
             * 
             * @param control The ui.IBaseViewControl to which the navigation occurred.
             * @param parameter The navigation parameter sent to the control.
             * @param options The INavigationOptions used during navigation.
             */
            navigated(control: ui.IBaseViewControl, parameter: any, options: IBaseNavigationOptions): void;

            /**
             * Every navigator must implement this method, defining what happens when a view 
             * control wants to go back.
             * 
             * @param options Optional backwards navigation options of type IBaseBackNavigationOptions.
             */
            goBack(options?: IBaseBackNavigationOptions): void;
        }

        /**
         * Options that you can submit to the navigator in order
         * to customize navigation.
         */
        export interface IBaseNavigationOptions {
            /**
             * Allows a ui.IBaseViewControl to leave itself out of the 
             * navigation history.
             */
            replace?: boolean;
        }

        /**
         * Options that you can submit to the navigator during a backward
         * navigation in order to customize the navigation.
         */
        export interface IBaseBackNavigationOptions {
            /**
             * Lets the Navigator know to navigate back a specific length 
             * in history.
             */
            length?: number;
        }

        /**
         * Defines the base interface needing to be implemented in the history.
         */
        export interface IBaseNavigationState {
            /**
             * The view control associated with a history entry.
             */
            control: ui.IBaseViewControl;
        }

        /**
         * The Navigator class allows ui.IViewControls to navigate within a Viewport.
         * Every Viewport has its own Navigator instance, allowing multiple navigators to 
         * coexist in one app.
         */
        export class Navigator extends BaseNavigator implements INavigatorInstance {
            history: Array<IBaseNavigationState> = [];

            navigate(Constructor?: new (...args: any[]) => ui.IViewControl, options?: INavigationOptions): void;
            navigate(injector?: dependency.IInjector<ui.IViewControl>, options?: INavigationOptions): void;
            navigate(Constructor?: any, options?: INavigationOptions) {
                var state = this.currentState || <IBaseNavigationState>{},
                    viewControl = state.control,
                    injector: dependency.IInjector<ui.IViewControl>,
                    key: string,
                    options = options || <IBaseNavigationOptions>{},
                    parameter = options.parameter,
                    event: events.INavigationEvent<any>;

                event = this._sendEvent('beforeNavigate', Constructor, null, parameter, options, true);

                if (event.canceled) {
                    return;
                }

                this.$BaseViewControlFactory.detach(viewControl);

                if (isObject(parameter)) {
                    parameter = deepExtend({}, parameter);
                }

                this.baseport.controls = [];

                if (isFunction(Constructor.inject)) {
                    injector = Constructor;
                    key = (<dependency.IInjector<any>>Constructor).name;
                } else {
                    var keys = Object.keys(viewControlInjectors),
                        control: dependency.IInjector<ui.IViewControl>;

                    while (keys.length > 0) {
                        key = keys.pop();
                        control = <any>viewControlInjectors[key];
                        if (control.Constructor === Constructor) {
                            injector = control;
                            break;
                        }
                    }
                }

                if (isNull(injector)) {
                    var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                    $exception.fatal('Attempting to navigate to unregistered view control.', $exception.NAVIGATION);
                }

                if (!isNull(viewControl)) {
                    this.baseport.navigateFrom(viewControl);
                    if (!options.replace) {
                        this.history.push({ control: viewControl });
                    }
                }

                event.target = injector;
                event.type = key;
                this.baseport.navigateTo(event);
            }

            goBack(options?: IBackNavigationOptions): void {
                options = options || {};

                if (this.history.length === 0) {
                    this.$EventManagerStatic.dispatch('shutdown', this, this.$EventManagerStatic.DIRECT);
                }

                var viewControl = this.currentState.control,
                    length = isNumber(options.length) ? options.length : 1,
                    Constructor = options.ViewControl,
                    parameter = options.parameter;

                options = options || {};

                var event = this._sendEvent('beforeNavigate', viewControl, viewControl.type, parameter, options, true);

                if (event.canceled) {
                    return;
                }

                var $exception: IExceptionStatic;
                if (!isNull(Constructor)) {
                    var index = this._findInHistory(Constructor);

                    if (index > -1) {
                        length = this.history.length - index;
                    } else {
                        $exception = acquire(__ExceptionStatic);
                        $exception.warn('Cannot find ViewControl in navigation history.', $exception.NAVIGATION);
                        return;
                    }
                }

                if (!isNumber(length) || length > this.history.length) {
                    $exception = acquire(__ExceptionStatic);
                    $exception.warn('Not enough views in the navigation history in order to navigate back.',
                        $exception.NAVIGATION);
                    return;
                }

                this.baseport.navigateFrom(viewControl);
                this.$BaseViewControlFactory.dispose(viewControl);

                var last: IBaseNavigationState = this._goBackLength(length);

                if (isNull(last)) {
                    return;
                }

                viewControl = last.control;

                this.currentState = last;

                event.target = viewControl;
                event.type = viewControl.type;

                this.baseport.navigateTo(event);
            }

            canGoBack(): boolean {
                return this.history.length > 0;
            }

            clearHistory(): void {
                var history = this.history,
                    dispose = this.$BaseViewControlFactory.dispose;

                while (history.length > 0) {
                    dispose(history.pop().control);
                }
            }

            /**
             * Finds the given constructor in the history stack. Returns the index in the history where
             * the constructor is found, or -1 if no constructor is found.
             * 
             * @param Constructor The view control constructor to search for in the history stack.
             */
            _findInHistory(Constructor: new (...args: any[]) => ui.IViewControl): number {
                var history = this.history,
                    length = history.length - 1,
                    index = -1,
                    control: any;

                for (var i = length; i >= 0; --i) {
                    control = history[i].control;

                    if (control.constructor === Constructor) {
                        index = i;
                        break;
                    }
                }

                return index;
            }

            /**
             * This method takes in a length and navigates back in the history, returning the view control 
             * associated with length + 1 entries back in the history.  It disposes all the view controls 
             * encapsulated in the length.
             */
            _goBackLength(length?: number): IBaseNavigationState {
                length = isNumber(length) ? length : 1;

                var last: IBaseNavigationState,
                    dispose = this.$BaseViewControlFactory.dispose;

                while (length-- > 0) {
                    if (!isNull(last) && !isNull(last.control)) {
                        dispose(last.control);
                    }

                    last = this.history.pop();
                }

                return last;
            }
        }

        /**
         * The Type for referencing the '$Navigator' injectable as a dependency.
         */
        export function INavigatorInstance(): INavigatorInstance {
            return new Navigator();
        }

        register.injectable(__NavigatorInstance, INavigatorInstance, null, register.INSTANCE);

        /**
         * An object implementing INavigator allows ui.IViewControls to implement methods 
         * used to navigate within a Viewport.
         */
        export interface INavigatorInstance extends IBaseNavigator {
            /**
             * Contains the navigation history stack for the associated Viewport.
             */
            history: Array<IBaseNavigationState>;

            /**
             * Allows a ui.IViewControl to navigate to another ui.IViewControl. Also allows for
             * navigation parameters to be sent to the new ui.IViewControl.
             * 
             * @param Constructor The Constructor for the new ui.IViewControl. The Navigator will find the injector 
             * for the Constructor and create a new instance of the control.
             * @param options Optional IBaseNavigationOptions used for Navigation.
             */
            navigate(Constructor?: new (...args: any[]) => ui.IViewControl, options?: INavigationOptions): void;
            navigate(injector?: dependency.IInjector<ui.IViewControl>, options?: INavigationOptions): void;

            /**
             * Returns to the last visited ui.IViewControl.
             * 
             * @param options Optional IBackNavigationOptions allowing the ui.IViewControl
             * to customize navigation. Enables navigating back to a specified point in history as well
             * as specifying a new templateUrl to use at the next ui.IViewControl.
             */
            goBack(options?: IBackNavigationOptions): void;

            /**
             * Lets the caller know if there are ui.IViewControls in the history, meaning the caller
             * is safe to perform a backward navigation.
             */
            canGoBack(): boolean;

            /**
             * Clears the navigation history, disposing all the controls.
             */
            clearHistory(): void;
        }

        /**
         * Options that you can submit to the Navigator in order
         * to customize navigation.
         */
        export interface INavigationOptions extends IBaseNavigationOptions {
            /**
             * An optional parameter to send to the next ui.IViewControl.
             */
            parameter?: any;
        }

        /**
         * Options that you can submit to the Navigator during a backward
         * navigation in order to customize the navigation.
         */
        export interface IBackNavigationOptions extends IBaseBackNavigationOptions {
            /**
             * An optional parameter to send to the next ui.IViewControl.
             */
            parameter?: any;
            /**
             * A ui.IViewControl Constructor that the Navigator will
             * use to navigate. The Navigator will search for an instance 
             * of the ui.IViewControl in its history and navigate to it.
             */
            ViewControl?: new (...args: any[]) => ui.IViewControl;
        }

        /**
         * A Navigator class that utilizes routing capabilities. It is associated with a 
         * Routeport, thus only allowing one RoutingNavigator per app.
         */
        export class RoutingNavigator extends BaseNavigator implements IRoutingNavigator {
            $Router: web.IRouter = acquire(__Router);
            $Window: Window = acquire(__Window);

            /**
             * The routing information for the Routeport's current state.
             */
            currentState: IRouteNavigationState;

            private __removeListeners: Array<IRemoveListener> = [];
            private __historyLength = 0;

            /**
             * Subscribe to 'routeChanged' and 'beforeRouteChange' events
             */
            constructor() {
                super();

                this.__removeListeners.push(this.$EventManagerStatic.on(this.uid, 'routeChanged', this._onRouteChanged, this));
                this.__removeListeners.push(this.$EventManagerStatic.on(this.uid, 'beforeRouteChange', this._beforeRouteChange, this));
            }

            navigate(path: string, options?: web.IRouteNavigationOptions): void {
                this.$Router.route(path, options);
            }

            navigated(control: ui.IBaseViewControl, parameter: web.IRoute<any>, options: web.IRouteNavigationOptions): void {
                super.navigated(control, parameter, options);
                this.currentState.route = parameter;
            }

            goBack(options?: IBaseBackNavigationOptions): void {
                options = options || {};

                this.__historyLength -= 2;

                if (this.__historyLength < 0) {
                    this.$EventManagerStatic.dispatch('shutdown', this, this.$EventManagerStatic.DIRECT);
                }

                this.$Router.goBack((isNumber(options.length) ? options.length : 1));
            }

            /**
             * The method called prior to a route change event.
             * 
             * @param ev The INavigationEvent containing information regarding the ViewControl, the routing information, 
             * and the Router.
             */
            _beforeRouteChange(ev: events.INavigationEvent<web.IRoute<any>>): void {
                var event = this._sendEvent('beforeNavigate', ev.target, ev.type, ev.parameter, ev.options, true);

                if (event.canceled) {
                    ev.cancel();
                }
            }

            /**
             * The method called when a route change is successfully performed and ViewControl navigation can occur.
             * 
             * @param ev The INavigationEvent containing information regarding the ViewControl, the routing infomration, 
             * and the Router.
             */
            _onRouteChanged(ev: events.INavigationEvent<web.IRoute<any>>): void {
                var state = this.currentState || <IRouteNavigationState>{},
                    viewControl = state.control,
                    injector = ev.target;

                if (isNull(injector)) {
                    return;
                }

                this.__historyLength++;
                this.baseport.navigateFrom(viewControl);
                this.$BaseViewControlFactory.dispose(viewControl);
                this.baseport.navigateTo(ev);
            }
        }

        /**
         * The Type for referencing the '$RoutingNavigator' injectable as a dependency.
         */
        export function IRoutingNavigator(): IRoutingNavigator {
            return new RoutingNavigator();
        }

        register.injectable(__RoutingNavigator, IRoutingNavigator);

        /**
         * Defines the methods that a Navigator must implement if it chooses to utilize 
         * routing capabilities.
         */
        export interface IRoutingNavigator extends IBaseNavigator {
            /**
             * Allows a ui.IBaseViewControl to navigate to another ui.IBaseViewControl. Also allows for
             * navigation parameters to be sent to the new ui.IBaseViewControl.
             * 
             * @param path The url path to navigate to.
             * @param options Optional INavigationOptions for ignoring the current ui.IBaseViewControl in the history as
             * well as specifying a new templateUrl for the next ui.IBaseViewControl to use.
             */
            navigate(path: string, options?: web.IRouteNavigationOptions): void;

            /**
             * Called by the Viewport to make the Navigator aware of a successful navigation. The Navigator will
             * in-turn call the app.navigated event.
             * 
             * @param control The ui.IBaseViewControl to which the navigation occurred.
             * @param parameter The navigation parameter sent to the control.
             * @param options The INavigationOptions used during navigation.
             */
            navigated(control: ui.IBaseViewControl, parameter: web.IRoute<any>, options: web.IRouteNavigationOptions): void;

            /**
             * Returns to the last visited ui.IBaseViewControl.
             * 
             * @param options Optional IBackNavigationOptions allowing the ui.IBaseViewControl
             * to customize navigation. Enables navigating back to a specified point in history as well
             * as specifying a new templateUrl to use at the next ui.IBaseViewControl.
             */
            goBack(options?: IBaseBackNavigationOptions): void;
        }

        /**
         * Defines the route type interface implemented for current state and last state.
         */
        export interface IRouteNavigationState extends IBaseNavigationState {
            /**
             * The associated route information.
             */
            route: web.IRoute<any>;
        }
    }
    /**
     * We need to add [plat-hide] as a css property so we can use it to temporarily 
     * hide elements.
     */
    if (isDocument(document)) {
        var style = <HTMLStyleElement>document.createElement('style');

        style.textContent = '[plat-hide] { display: none; }';
        document.head.appendChild(style);
    }

    /**
     * Class for every app. This class contains hooks for Application Lifecycle Events 
     * as well as error handling.
     */
    export class App implements IApp {
        static $Compat: ICompat;
        static $EventManagerStatic: events.IEventManagerStatic;
        static $Document: Document;
        static $Compiler: processing.ICompiler;
        static $LifecycleEventStatic: events.ILifecycleEventStatic;

        /**
         * A static method for initiating the app startup.
         */
        static start(): void {
            if (!App.$Compat.isCompatible) {
                var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                $exception.fatal('PlatypusTS only supports modern browsers where ' +
                    'Object.defineProperty is defined', $exception.COMPAT);
                return;
            }

            var $EventManagerStatic = App.$EventManagerStatic;

            $EventManagerStatic.dispose('__app__');
            $EventManagerStatic.on('__app__', 'ready', App.__ready);
            $EventManagerStatic.on('__app__', 'shutdown', App.__shutdown);
            $EventManagerStatic.initialize();
        }

        /**
         * A static methods called upon app registration. Primarily used 
         * to initiate a ready state in the case that amd is being used.
         */
        static registerApp(app: any): void {
            if (!isNull(App.app) && isString(App.app.uid)) {
                App.$EventManagerStatic.dispose(App.app.uid);
            }

            App.app = app;

            if (App.$Compat.amd) {
                var $LifecycleEventStatic = App.$LifecycleEventStatic,
                    dispatch = $LifecycleEventStatic.dispatch;

                postpone(() => {
                    dispatch('ready', $LifecycleEventStatic);
                });
            }
        }

        /**
         * Kicks off compilation of the DOM from the specified node. If no node is specified, 
         * the default start node is document.body.
         * 
         * @param node The node at which DOM compilation begins.
         */
        static load(node?: Node): void {
            var $LifecycleEventStatic = App.$LifecycleEventStatic,
                $compiler = App.$Compiler,
                body = App.$Document.body,
                head = App.$Document.head;

            $LifecycleEventStatic.dispatch('beforeLoad', App);

            if (isNull(node)) {
                $compiler.compile(head);
                body.setAttribute('plat-hide', '');
                $compiler.compile(body);
                body.removeAttribute('plat-hide');
                return;
            }

            if (isFunction((<Element>node).setAttribute)) {
                (<Element>node).setAttribute('plat-hide', '');
                $compiler.compile(node);
                (<Element>node).removeAttribute('plat-hide');
            } else {
                $compiler.compile(node);
            }
        }

        /**
         * The instance of the registered IApp.
         */
        static app: IApp;

        /**
         * A static method called when the application is ready. It calls the app instance's 
         * ready function as well as checks for the presence of a module loader. If one exists, 
         * loading the DOM falls back to the app developer. If it doesn't, the DOM is loaded from 
         * document.body.
         */
        private static __ready(ev: events.ILifecycleEvent): void {
            dependency.Injector.initialize();

            if (!isNull(App.app)) {
                App.__registerAppEvents(ev);
            }

            if (!App.$Compat.amd) {
                App.load();
            }
        }

        private static __shutdown(): void {
            var app = (<any>navigator).app;

            if (!isNull(app) && isFunction(app.exitApp)) {
                app.exitApp();
            }
        }

        private static __registerAppEvents(ev: events.ILifecycleEvent): void {
            var app = App.app;

            if (isFunction((<dependency.IInjector<any>>(<any>app)).inject)) {
                App.app = app = (<dependency.IInjector<any>>(<any>app)).inject();
            }

            app.on('suspend', app.suspend);
            app.on('resume', app.resume);
            app.on('online', app.online);
            app.on('offline', app.offline);
            app.on('error', app.error);

            if (isFunction(app.ready)) {
                app.ready(ev);
            }
        }

        uid: string;

        /**
         * Class for every app. This class contains hooks for Application Lifecycle Management (ALM)
         * as well as error handling and navigation events.
         */
        constructor() {
            var ContextManager: observable.IContextManagerStatic = acquire(__ContextManagerStatic);
            ContextManager.defineGetter(this, 'uid', uniqueId('plat_'));
        }

        suspend(ev: events.ILifecycleEvent): void { }

        resume(ev: events.ILifecycleEvent): void { }

        error(ev: events.IErrorEvent<Error>): void { }

        ready(ev: events.ILifecycleEvent): void { }

        online(ev: events.ILifecycleEvent): void { }

        offline(ev: events.ILifecycleEvent): void { }

        dispatchEvent(name: string, ...args: any[]): void {
            App.$EventManagerStatic.dispatch(name, this, App.$EventManagerStatic.DIRECT, args);
        }

        on(name: 'beforeNavigate', listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        on(name: 'navigating', listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        on(name: 'navigated',
            listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        on(name: 'routeChanged', listener: (ev: events.INavigationEvent<web.IRoute<any>>) => void): IRemoveListener;
        on(name: string, listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        on(name: string, listener: (ev: events.IDispatchEventInstance, ...args: any[]) => void): IRemoveListener {
            return App.$EventManagerStatic.on(this.uid, name, listener, this);
        }

        load(node?: Node): void {
            App.load(node);
        }
    }

    /**
     * The Type for referencing the '$AppStatic' injectable as a dependency.
     */
    export function IAppStatic(
        $Compat?: ICompat,
        $EventManagerStatic?: events.IEventManagerStatic,
        $Document?: Document,
        $Compiler?: processing.ICompiler,
        $LifecycleEventStatic?: events.ILifecycleEventStatic): IAppStatic {
            App.$Compat = $Compat;
            App.$EventManagerStatic = $EventManagerStatic;
            App.$Document = $Document;
            App.$Compiler = $Compiler;
            App.$LifecycleEventStatic = $LifecycleEventStatic;
            return App;
    }

    register.injectable(__AppStatic, IAppStatic, [
        __Compat,
        __EventManagerStatic,
        __Document,
        __Compiler,
        __LifecycleEventStatic
    ], register.STATIC);

    /**
     * The Type for referencing the '$App' injectable as a dependency.
     */
    export function IApp($AppStatic?: IAppStatic): IApp {
        return $AppStatic.app;
    }

    register.injectable(__App, IApp, [__AppStatic], register.INSTANCE);

    /**
     * The external interface for the '$AppStatic' interface.
     */
    export interface IAppStatic {
        /**
         * A static method for initiating the app startup.
         */
        start(): void;

        /**
         * A static methods called upon app registration. Primarily used 
         * to initiate a ready state in the case that amd is being used.
         */
        registerApp(app: dependency.IInjector<IApp>): void;

        /**
         * Kicks off compilation of the DOM from the specified node. If no node is specified,
         * the default start node is document.body.
         *
         * @param node The node at which DOM compilation begins.
         */
        load(node?: Node): void;

        /**
         * The instance of the registered IApp.
         */
        app: IApp;
    }

    /**
     * An object implementing IApp implements the methods called by the framework to support 
     * Application Lifecycle Management (ALM) as well as error handling and navigation events.
     */
    export interface IApp {
        /**
         * A unique id, created during instantiation.
         */
        uid: string;

        /**
         * Event fired when the app is suspended.
         * 
         * @param ev The ILifecycleEvent object.
         */
        suspend? (ev: events.ILifecycleEvent): void;

        /**
         * Event fired when the app resumes from the suspended state.
         * 
         * @param ev The ILifecycleEvent object.
         */
        resume? (ev: events.ILifecycleEvent): void;

        /**
         * Event fired when an internal error occures.
         * 
         * @param ev The IErrorEvent object.
         */
        error? (ev: events.IErrorEvent<Error>): void;

        /**
         * Event fired when the app is ready.
         * 
         * @param ev The ILifecycleEvent object.
         */
        ready? (ev: events.ILifecycleEvent): void;

        /**
         * Event fired when the app regains connectivity and is now in an online state.
         * 
         * @param ev The ILifecycleEvent object.
         */
        online? (ev: events.ILifecycleEvent): void;

        /**
         * Event fired when the app loses connectivity and is now in an offline state.
         * 
         * @param ev The ILifecycleEvent object.
         */
        offline? (ev: events.ILifecycleEvent): void;

        /**
         * Creates a new DispatchEvent and propagates it to all listeners based on the 
         * events.EventManager.DIRECT method. Propagation will always start with the sender, 
         * so the sender can both produce and consume the same event.
         * 
         * @param name The name of the event to send, cooincides with the name used in the
         * app.on() method.
         * @param ...args Any number of arguments to send to all the listeners.
         */
        dispatchEvent(name: string, ...args: any[]): void;

        /**
         * Registers a listener for a beforeNavigate event. The listener will be called when a beforeNavigate 
         * event is propagating over the app. Any number of listeners can exist for a single event name. 
         * This event is cancelable using the ev.cancel() method, and thereby preventing the navigation.
         * 
         * @param name='beforeNavigate' The name of the event, cooinciding with the beforeNavigate event.
         * @param listener The method called when the beforeNavigate event is fired.
         * @return {IRemoveListener} A method for removing the listener. 
         */
        on(name: 'beforeNavigate', listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
         * Registers a listener for a navigating event. The listener will be called when a navigating 
         * event is propagating over the app. Any number of listeners can exist for a single event name. 
         * This event is cancelable using the ev.cancel() method, and thereby preventing the navigation.
         * 
         * @param name='navigating' The name of the event, cooinciding with the navigating event.
         * @param listener The method called when the navigating event is fired.
         * @return {IRemoveListener} A method for removing the listener. 
         */
        on(name: 'navigating', listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
         * Registers a listener for a navigated event. The listener will be called when a navigated 
         * event is propagating over the app. Any number of listeners can exist for a single event name. 
         * This event is not cancelable.
         * 
         * @param name='navigated' The name of the event, cooinciding with the navigated event.
         * @param listener The method called when the navigated event is fired.
         * @return {IRemoveListener} A method for removing the listener. 
         */
        on(name: 'navigated',
            listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
         * Registers a listener for a routeChanged event. The listener will be called when a routeChange event 
         * is propagating over the app. Any number of listeners can exist for a single event name.
         *
         * @param eventName='routeChange' This specifies that the listener is for a routeChange event.
         * @param listener The method called when the routeChange is fired. The route argument will contain 
         * a parsed route.
         * @return {IRemoveListener} A method for removing the listener.
         */
        on(name: 'routeChanged', listener: (ev: events.INavigationEvent<web.IRoute<any>>) => void): IRemoveListener;
        /**
         * Registers a listener for a NavigationEvent. The listener will be called when a NavigationEvent is 
         * propagating over the app. Any number of listeners can exist for a single event name.
         * 
         * @param name The name of the event, cooinciding with the NavigationEvent name.
         * @param listener The method called when the NavigationEvent is fired.
         * @return {IRemoveListener} A method for removing the listener.
         */
        on(name: string, listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
         * Registers a listener for a DispatchEvent. The listener will be called when a DispatchEvent is 
         * propagating over the app. Any number of listeners can exist for a single event name.
         * 
         * @param name The name of the event, cooinciding with the DispatchEvent name.
         * @param listener The method called when the DispatchEvent is fired.
         * @return {IRemoveListener} A method for removing the listener.
         */
        on(name: string, listener: (ev: events.IDispatchEventInstance, ...args: any[]) => void): IRemoveListener;

        /**
         * Kicks off compilation of the DOM from the specified node. If no node is specified, 
         * the default start node is document.body. This method should be called from the app when 
         * using module loaders. If a module loader is in use, the app will delay loading until 
         * this method is called.
         * 
         * @param node The node where at which DOM compilation begins.
         */
        load(node?: Node): void;
    }

    /**
     * Interface for an object where every key has the same typed value.
     */
    export interface IObject<T> {
        [key: string]: T
    }
    
    /**
     * Defines a function that will halt further callbacks to a listener.
     * Equivalent to () => void.
     */
    export interface IRemoveListener {
        (): void;
    }
}
