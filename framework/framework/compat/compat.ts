module plat {
    /**
     * @name Compat
     * @memberof plat
     * @kind class
     * 
     * @description
     * A class containing boolean values signifying browser 
     * and/or platform compatibilities.
     */
    export class Compat {
        protected static _inject: any = {
            _window: __Window,
            _history: __History,
            _document: __Document
        };

        /**
         * @name _window
         * @memberof plat.Compat
         * @kind property
         * @access protected
         * 
         * @type {Window}
         * 
         * @description
         * The window injectable.
         */
        protected _window: Window;

        /**
         * @name _history
         * @memberof plat.Compat
         * @kind property
         * @access protected
         * 
         * @type {Window}
         * 
         * @description
         * The window.history injectable.
         */
        protected _history: History;

        /**
         * @name _document
         * @memberof plat.Compat
         * @kind property
         * @access protected
         * 
         * @type {Document}
         * 
         * @description
         * The document injectable.
         */
        protected _document: Document;

        /**
         * @name isCompatible
         * @memberof plat.Compat
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Determines if the browser is modern enough to correctly 
         * run PlatypusTS.
         */
        isCompatible: boolean;

        /**
         * @name cordova
         * @memberof plat.Compat
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Signifies whether or not Cordova is defined. If it is, 
         * we hook up ALM events to Cordova's functions.
         */
        cordova: boolean;

        /**
         * @name pushState
         * @memberof plat.Compat
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Signifies whether window.history.pushState is defined.
         */
        pushState: boolean;

        /**
         * @name fileSupported
         * @memberof plat.Compat
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Signifies whether the File API is supported.
         */
        fileSupported: boolean;

        /**
         * @name amd
         * @memberof plat.Compat
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Signifies whether Require is present. If it is, we assume 
         * it is going to be used and leave the loading of the app up 
         * to the developer.
         */
        amd: boolean;

        /**
         * @name msApp
         * @memberof plat.Compat
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Signifies whether we are in the context of a Windows 8 app.
         */
        msApp: boolean;

        /**
         * @name winJs
         * @memberof plat.Compat
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Signifies whether we are in the context of a WinJS app.
         */
        winJs: boolean;

        /**
         * @name indexedDb
         * @memberof plat.Compat
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Signifies whether indexedDB exists on the window.
         */
        indexedDb: boolean;

        /**
         * @name proto
         * @memberof plat.Compat
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Signifies whether Object.prototype.__proto__ exists.
         */
        proto: boolean;

        /**
         * @name getProto
         * @memberof plat.Compat
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Signifies whether Object.prototype.getPrototypeOf exists.
         */
        getProto: boolean;

        /**
         * @name setProto
         * @memberof plat.Compat
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Signifies whether Object.prototype.setPrototypeOf exists.
         */
        setProto: boolean;

        /**
         * @name hasTouchEvents
         * @memberof plat.Compat
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the current browser has touch events 
         * like touchstart, touchmove, touchend, etc.
         */
        hasTouchEvents: boolean;

        /**
         * @name hasPointerEvents
         * @memberof plat.Compat
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the current browser has pointer events 
         * like pointerdown, MSPointerMove, pointerup, etc.
         */
        hasPointerEvents: boolean;

        /**
         * @name hasMsPointerEvents
         * @memberof plat.Compat
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the current browser has touch events 
         * like MSPointerDown, touchmove, MSPointerUp, etc.
         */
        hasMsPointerEvents: boolean;

        /**
         * @name animationSupported
         * @memberof plat.Compat
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the browser supports animations.
         */
        animationSupported: boolean;

        /**
         * @name platCss
         * @memberof plat.Compat
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Whether the platypus.css file was included or not.
         */
        platCss: boolean;

        /**
         * @name mappedEvents
         * @memberof plat.Compat
         * @kind property
         * @access public
         * 
         * @type {plat.IMappedEvents}
         * 
         * @description
         * An object containing the correctly mapped touch events for the browser.
         */
        mappedEvents: IMappedTouchEvents;

        /**
         * @name animationEvents
         * @memberof plat.Compat
         * @kind property
         * @access public
         * 
         * @type {plat.IAnimationEvents}
         * 
         * @description
         * An object containing the properly prefixed animation events.
         */
        animationEvents: IAnimationEvents;

        /**
         * @name vendorPrefix
         * @memberof plat.Compat
         * @kind property
         * @access public
         * 
         * @type {plat.IVendorPrefix}
         * 
         * @description
         * An object containing information regarding any potential vendor prefix.
         */
        vendorPrefix: IVendorPrefix;

        /**
         * @name IE
         * @memberof plat.Compat
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The version of Internet Explorer being used. If not Internet Explorer, the value is undefined.
         */
        IE: number;

        /**
         * @name ANDROID
         * @memberof plat.Compat
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The version of Android being used. If not Android, the value is undefined.
         */
        ANDROID: number;

        /**
         * @name __events
         * @memberof plat.Compat
         * @kind property
         * @access public
         * 
         * @type {plat.IObject<boolean>}
         * 
         * @description
         * An object containing all event lookups.
         */
        private __events: IObject<boolean> = {};

        /**
         * @name constructor
         * @memberof plat.Compat
         * @kind function
         * @access public
         * 
         * @description
         * Define everything.
         * 
         * @returns {void}
         */
        constructor() {
            this.__defineBooleans();
            this.__defineMappedEvents();
            this.__defineAnimationEvents();
            this.__determineCss();
        }

        /**
         * @name hasEvent
         * @memberof plat.Compat
         * @kind function
         * @access public
         * 
         * @description
         * Check whether or not an event exists.
         * 
         * @param {string} event The event to check the existence of.
         * 
         * @returns {boolean} Whether or not the event exists.
         */
        hasEvent(event: string): boolean {
            var events = this.__events,
                eventExists = events[event];

            if (isUndefined(eventExists)) {
                var element = this._document.createElement('div');
                if (event === 'input' && this.IE === 9) {
                    eventExists = events[event] = false;
                } else {
                    eventExists = events[event] = !isUndefined((<any>element)[('on' + event)]);
                }
            }

            return eventExists;
        }

        /**
         * @name __defineBooleans
         * @memberof plat.Compat
         * @kind function
         * @access private
         * 
         * @description
         * Define booleans.
         * 
         * @returns {void}
         */
        private __defineBooleans(): void {
            var _window = this._window,
                navigator = _window.navigator || <Navigator>{},
                userAgent = (navigator.userAgent || '').toLowerCase(),
                history = this._history,
                def = (<any>_window).define,
                msA = (<any>_window).MSApp,
                winJs = (<any>_window).WinJS,
                android = parseInt((<any>/android (\d+)/.exec(userAgent) || [])[1], 10);

            this.isCompatible = isFunction(Object.defineProperty) && isFunction(this._document.querySelector);
            this.cordova = !isNull((<any>_window).cordova);
            this.pushState = !(isNull(history) || isNull(history.pushState));
            this.fileSupported = !(isUndefined((<any>_window).File) || isUndefined((<any>_window).FormData));
            this.amd = isFunction(def) && !isNull(def.amd);
            this.msApp = isObject(msA) && isFunction(msA.execUnsafeLocalFunction);
            this.winJs = isObject(winJs) && isObject(winJs.Application);
            this.indexedDb = !isNull(_window.indexedDB);
            this.proto = isObject((<any>{}).__proto__);
            this.getProto = isFunction(Object.getPrototypeOf);
            this.setProto = isFunction((<any>Object).setPrototypeOf);
            this.hasTouchEvents = !isUndefined((<any>_window).ontouchstart);
            this.hasPointerEvents = !!navigator.pointerEnabled;
            this.hasMsPointerEvents = !!navigator.msPointerEnabled;

            if (isNumber(android)) {
                this.ANDROID = android;
                return;
            }

            var ie = parseInt((<any>/msie (\d+)/.exec(userAgent) || [])[1], 10) ||
                parseInt((<any>(/trident\/.*; rv:(\d+)/.exec(userAgent) || []))[1], 10);
            if (isNumber(ie)) {
                this.IE = ie;
            }
        }

        /**
         * @name __defineMappedEvents
         * @memberof plat.Compat
         * @kind function
         * @access private
         * 
         * @description
         * Define {@link plat.IMappedEvents|mapped events}
         * 
         * @returns {void}
         */
        private __defineMappedEvents(): void {
            if (this.hasPointerEvents) {
                this.mappedEvents = {
                    $touchstart: 'pointerdown',
                    $touchend: 'pointerup',
                    $touchmove: 'pointermove',
                    $touchcancel: 'pointercancel'
                };
            } else if (this.hasMsPointerEvents) {
                this.mappedEvents = {
                    $touchstart: 'MSPointerDown',
                    $touchend: 'MSPointerUp',
                    $touchmove: 'MSPointerMove',
                    $touchcancel: 'MSPointerCancel'
                };
            } else if (this.hasTouchEvents) {
                this.mappedEvents = {
                    $touchstart: 'touchstart',
                    $touchend: 'touchend',
                    $touchmove: 'touchmove',
                    $touchcancel: 'touchcancel'
                };
            } else {
                this.mappedEvents = {
                    $touchstart: 'mousedown',
                    $touchend: 'mouseup',
                    $touchmove: 'mousemove',
                    $touchcancel: null
                };
            }
        }

        /**
         * @name __defineAnimationEvents
         * @memberof plat.Compat
         * @kind function
         * @access private
         * 
         * @description
         * Define {@link plat.IAnimationEvents|animation events}
         * 
         * @returns {void}
         */
        private __defineAnimationEvents(): void {
            var documentElement = this._document.documentElement,
                styles = this._window.getComputedStyle(documentElement, ''),
                prefix: string;

            if (!isUndefined((<any>styles).OLink)) {
                prefix = 'o';
            } else {
                var matches = Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/);
                prefix = (isArray(matches) && matches.length > 1) ? matches[1] : '';
            }

            this.vendorPrefix = {
                lowerCase: prefix,
                css: prefix === '' ? '' : '-' + prefix + '-',
                js: prefix[0].toUpperCase() + prefix.slice(1)
            };

            if (prefix === 'webkit') {
                this.animationSupported = !isUndefined((<any>documentElement.style).WebkitAnimation);
                if (!this.animationSupported) {
                    this.animationEvents = {
                        $animation: '',
                        $animationStart: '',
                        $animationEnd: '',
                        $transition: '',
                        $transitionStart: '',
                        $transitionEnd: ''
                    };
                    return;
                }

                this.animationEvents = {
                    $animation: 'webkitAnimation',
                    $animationStart: 'webkitAnimationStart',
                    $animationEnd: 'webkitAnimationEnd',
                    $transition: 'webkitTransition',
                    $transitionStart: 'webkitTransitionStart',
                    $transitionEnd: 'webkitTransitionEnd'
                };
            } else {
                this.animationSupported = !isUndefined((<any>documentElement.style).animation);
                if (!this.animationSupported) {
                    this.animationEvents = {
                        $animation: '',
                        $animationStart: '',
                        $animationEnd: '',
                        $transition: '',
                        $transitionStart: '',
                        $transitionEnd: ''
                    };
                    return;
                }

                this.animationEvents = {
                    $animation: 'animation',
                    $animationStart: 'animationstart',
                    $animationEnd: 'animationend',
                    $transition: 'transition',
                    $transitionStart: 'transitionstart',
                    $transitionEnd: 'transitionend'
                };
            }
        }

        /**
         * @name __determineCss
         * @memberof plat.Compat
         * @kind function
         * @access private
         * 
         * @description
         * Determines whether or not platypus css styles exist.
         * 
         * @returns {void}
         */
        private __determineCss(): void {
            var _document = this._document,
                head = _document.head,
                element = _document.createElement('div');

            element.setAttribute(__Hide, '');
            head.insertBefore(element, null);

            var computedStyle = this._window.getComputedStyle(element),
                display = computedStyle.display,
                visibility = computedStyle.visibility;

            if (display === 'none' || visibility === 'hidden') {
                this.platCss = true;
            } else {
                this.platCss = false;
            }

            head.removeChild(element);
        }
    }

    register.injectable(__Compat, Compat);

    /**
     * @name ITouchMapping
     * @memberof plat
     * @kind interface
     * 
     * @extends {plat.IObject<T>}
     * 
     * @typeparam T The type of value being mapped to touch events.
     * 
     * @description
     * Describes an object containing the correctly mapped touch events for the browser.
     */
    export interface ITouchMapping<T> extends IObject<T> {
        /**
         * @name $touchstart
         * @memberof plat.ITouchMapping
         * @kind property
         * @access public
         * 
         * @type {T}
         * 
         * @description
         * An event type for touch start.
         */
        $touchstart: T;

        /**
         * @name $touchend
         * @memberof plat.ITouchMapping
         * @kind property
         * @access public
         * 
         * @type {T}
         * 
         * @description
         * An event type for touch end.
         */
        $touchend: T;

        /**
         * @name $touchmove
         * @memberof plat.ITouchMapping
         * @kind property
         * @access public
         * 
         * @type {T}
         * 
         * @description
         * An event type for touch move.
         */
        $touchmove: T;

        /**
         * @name $touchcancel
         * @memberof plat.ITouchMapping
         * @kind property
         * @access public
         * 
         * @type {T}
         * 
         * @description
         * An event type for touch cancel.
         */
        $touchcancel: T;
    }

    /**
     * @name IMappedEvents
     * @memberof plat
     * @kind interface
     * 
     * @extends {plat.ITouchMapping<string>}
     * 
     * @description
     * Describes an object containing the correctly mapped touch events for the browser.
     */
    export interface IMappedTouchEvents extends ITouchMapping<string> {
        /**
         * @name $touchstart
         * @memberof plat.IMappedEvents
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * An event type for touch start.
         */
        $touchstart: string;

        /**
         * @name $touchend
         * @memberof plat.IMappedEvents
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * An event type for touch end.
         */
        $touchend: string;

        /**
         * @name $touchmove
         * @memberof plat.IMappedEvents
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * An event type for touch move.
         */
        $touchmove: string;

        /**
         * @name $touchcancel
         * @memberof plat.IMappedEvents
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * An event type for touch cancel.
         */
        $touchcancel: string;
    }

    /**
     * @name IAnimationEvents
     * @memberof plat
     * @kind interface
     * 
     * @extends {plat.IObject}
     * 
     * @description
     * Describes an object containing the properly prefixed animation events.
     */
    export interface IAnimationEvents extends IObject<string> {
        /**
         * @name $animation
         * @memberof plat.IAnimationEvents
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The animation identifier.
         */
        $animation: string;

        /**
         * @name $animationStart
         * @memberof plat.IAnimationEvents
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The animation start event.
         */
        $animationStart: string;

        /**
         * @name $animationEnd
         * @memberof plat.IAnimationEvents
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The animation end event.
         */
        $animationEnd: string;

        /**
         * @name $transition
         * @memberof plat.IAnimationEvents
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The transition identifier.
         */
        $transition: string;

        /**
         * @name $transitionStart
         * @memberof plat.IAnimationEvents
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The transition start event.
         */
        $transitionStart: string;

        /**
         * @name $transitionEnd
         * @memberof plat.IAnimationEvents
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The transition end event.
         */
        $transitionEnd: string;
    }

    /**
     * @name IVendorPrefix
     * @memberof plat
     * @kind interface
     * 
     * @extends {plat.IObject}
     * 
     * @description
     * Describes an object that contains information regarding the browser's 
     * vendor prefix.
     */
    export interface IVendorPrefix extends IObject<string> {
        /**
         * @name lowerCase
         * @memberof plat.IVendorPrefix
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The lowercase representation of the browser's vendor prefix.
         */
        lowerCase: string;

        /**
         * @name css
         * @memberof plat.IVendorPrefix
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The css representation of the browser's vendor prefix 
         * denoted by -{prefix}-.
         */
        css: string;

        /**
         * @name js
         * @memberof plat.IVendorPrefix
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The JavaScript representation of the browser's vendor prefix 
         * denoted by it beginning with a capital letter.
         */
        js: string;
    }
}
