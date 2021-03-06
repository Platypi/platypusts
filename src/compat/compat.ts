namespace plat {
    'use strict';

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
            _document: __Document,
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
        public isCompatible: boolean;

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
        public cordova: boolean;

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
        public pushState: boolean;

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
        public fileSupported: boolean;

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
        public amd: boolean;

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
        public msApp: boolean;

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
        public winJs: boolean;

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
        public indexedDb: boolean;

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
        public proto: boolean;

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
        public getProto: boolean;

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
        public setProto: boolean;

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
        public hasTouchEvents: boolean;

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
        public hasPointerEvents: boolean;

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
        public hasMsPointerEvents: boolean;

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
        public animationSupported: boolean;

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
        public platCss: boolean;

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
        public mappedEvents: IMappedTouchEvents;

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
         * Undefined if animation isn't supported.
         */
        public animationEvents: IAnimationEvents;

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
        public vendorPrefix: IVendorPrefix;

        /**
         * @name requestAnimationFrame
         * @memberof plat.Compat
         * @kind property
         * @access public
         *
         * @type {(callback: FrameRequestCallback) => number}
         *
         * @description
         * The browser's requestAnimationFrame function if one exists. Otherwise undefined.
         */
        public requestAnimationFrame: (
            callback: FrameRequestCallback
        ) => number;

        /**
         * @name cancelAnimationFrame
         * @memberof plat.Compat
         * @kind property
         * @access public
         *
         * @type {(handle: number) => void}
         *
         * @description
         * The browser's cancelAnimationFrame function if one exists. Otherwise undefined.
         */
        public cancelAnimationFrame: (handle: number) => void;

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
        public IE: number;

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
        public ANDROID: number;

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
            this.__defineVendorDependencies();
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
        public hasEvent(event: string): boolean {
            const events = this.__events;
            let eventExists = events[event];

            if (isUndefined(eventExists)) {
                const element = this._document.createElement('div');
                if (event === 'input' && this.IE === 9) {
                    eventExists = events[event] = false;
                } else {
                    eventExists = events[event] = !isUndefined(
                        (<any>element)[`on${event}`]
                    );
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
            const _window = this._window;
            const history = this._history;
            const def = (<any>_window).define;
            const msA = (<any>_window).MSApp;
            const winJs = (<any>_window).WinJS;

            let navigator = _window.navigator;

            if (!isObject(navigator)) {
                navigator = <any>{};
            }

            let userAgent = navigator.userAgent;

            if (!isString(userAgent)) {
                userAgent = '';
            }

            userAgent = userAgent.toLowerCase();

            let androidExec = <any>/android ((?:\d|\.)+)/.exec(userAgent);

            if (!isArrayLike(androidExec)) {
                androidExec = [];
            }

            let android = androidExec[1];

            if (isString(android) && !/iemobile/i.test(userAgent)) {
                android = parseInt(android.replace(/\./g, ''), 10);
            }

            this.isCompatible =
                isFunction(Object.defineProperty) &&
                isFunction(this._document.querySelector);
            this.cordova = !isNull((<any>_window).cordova);
            this.pushState = !(isNull(history) || isNull(history.pushState));
            this.fileSupported = !(
                isUndefined((<any>_window).File) ||
                isUndefined((<any>_window).FormData)
            );
            this.amd = isFunction(def) && !isNull(def.amd);
            this.msApp =
                isObject(msA) && isFunction(msA.execUnsafeLocalFunction);
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

            let msieExec = <any>/msie (\d+)/.exec(userAgent);
            let tridentExec = <any>/trident\/.*; rv:(\d+)/.exec(userAgent);

            if (!isArrayLike(msieExec)) {
                msieExec = [];
            }

            if (!isArrayLike(tridentExec)) {
                tridentExec = [];
            }

            let ie = parseInt(msieExec[1], 10);

            if (!isNumber(ie)) {
                ie = parseInt(tridentExec[1], 10);
            }

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
                    $touchcancel: 'pointercancel',
                };
            } else if (this.hasMsPointerEvents) {
                this.mappedEvents = {
                    $touchstart: 'MSPointerDown',
                    $touchend: 'MSPointerUp',
                    $touchmove: 'MSPointerMove',
                    $touchcancel: 'MSPointerCancel',
                };
            } else if (this.hasTouchEvents) {
                this.mappedEvents = {
                    $touchstart: 'touchstart',
                    $touchend: 'touchend',
                    $touchmove: 'touchmove',
                    $touchcancel: 'touchcancel',
                };
            } else {
                this.mappedEvents = {
                    $touchstart: 'mousedown',
                    $touchend: 'mouseup',
                    $touchmove: 'mousemove',
                    $touchcancel: null,
                };
            }
        }

        /**
         * @name __defineVendorDependencies
         * @memberof plat.Compat
         * @kind function
         * @access private
         *
         * @description
         * Define {@link plat.IAnimationEvents|animation events} and other vendor prefix
         * dependencies.
         *
         * @returns {void}
         */
        private __defineVendorDependencies(): void {
            const _window = this._window;
            const documentElement = this._document.documentElement;
            const styles = _window.getComputedStyle(documentElement, '');
            const matches = Array.prototype.slice
                .call(styles)
                .join('')
                .match(/-(moz|webkit|ms)-/);
            let prefix: string;
            let dom: string;
            let css: string;
            let jsSyntax: string;

            if (isArray(matches) && matches.length > 1) {
                prefix =
                    isArray(matches) && matches.length > 1 ? matches[1] : '';
                jsSyntax = prefix[0].toUpperCase() + prefix.slice(1);
                dom = 'WebKit|Moz|MS'.match(new RegExp(`(${prefix})`, 'i'))[1];
                css = `-${prefix}-`;
            } else if (!isUndefined((<any>styles).OLink)) {
                prefix = 'o';
                jsSyntax = dom = 'O';
                css = '-o-';
            } else {
                prefix = jsSyntax = dom = css = '';
            }

            this.vendorPrefix = {
                dom: dom,
                lowerCase: prefix,
                css: css,
                upperCase: jsSyntax,
            };

            this.requestAnimationFrame = _window.requestAnimationFrame;

            if (!isFunction(this.requestAnimationFrame)) {
                this.requestAnimationFrame = (<any>_window)[
                    `${prefix}RequestAnimationFrame`
                ];
            }

            this.cancelAnimationFrame = _window.cancelAnimationFrame;

            if (!isFunction(this.cancelAnimationFrame)) {
                this.cancelAnimationFrame = (<any>_window)[
                    `${prefix}CancelRequestAnimationFrame`
                ];
            }

            if (!isFunction(this.cancelAnimationFrame)) {
                this.cancelAnimationFrame = (<any>_window)[
                    `${prefix}CancelAnimationFrame`
                ];
            }

            const style = documentElement.style;
            // handle Android issue where style.transition exists but transition events still need vendor prefix
            // should only affect version 4.1 but we will handle for < 4.4.
            if (
                (isUndefined(this.ANDROID) ||
                    Math.floor(this.ANDROID / 10) >= 44) &&
                !(isUndefined(style.animation) || isUndefined(style.transition))
            ) {
                this.animationSupported = true;
                this.animationEvents = {
                    $animation: 'animation',
                    $animationStart: 'animationstart',
                    $animationEnd: 'animationend',
                    $animationIteration: 'animationiteration',
                    $transition: 'transition',
                    $transitionStart: 'transitionstart',
                    $transitionEnd: 'transitionend',
                };
            } else if (
                !(
                    isUndefined((<any>style)[`${jsSyntax}Animation`]) ||
                    isUndefined((<any>style)[`${jsSyntax}Transition`])
                ) ||
                !(
                    isUndefined((<any>style)[`${prefix}Animation`]) ||
                    isUndefined((<any>style)[`${prefix}Transition`])
                ) ||
                !(
                    isUndefined((<any>style)[`${dom}Animation`]) ||
                    isUndefined((<any>style)[`${dom}Transition`])
                )
            ) {
                this.animationSupported = true;
                this.animationEvents = {
                    $animation: `${prefix}Animation`,
                    $animationStart: `${prefix}AnimationStart`,
                    $animationEnd: `${prefix}AnimationEnd`,
                    $animationIteration: `${prefix}AnimationIteration`,
                    $transition: `${prefix}Transition`,
                    $transitionStart: `${prefix}TransitionStart`,
                    $transitionEnd: `${prefix}TransitionEnd`,
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
            const _document = this._document;
            const head = _document.head;
            const element = _document.createElement('div');

            element.setAttribute(__Hide, '');
            head.insertBefore(element, null);

            const computedStyle = this._window.getComputedStyle(element);
            const display = computedStyle.display;
            const visibility = computedStyle.visibility;

            this.platCss = display === 'none' || visibility === 'hidden';

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
         * @name $animationIteration
         * @memberof plat.IAnimationEvents
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The animation iteration event.
         */
        $animationIteration: string;

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
         * @name dom
         * @memberof plat.IVendorPrefix
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The DOM based representation of the browser's vendor prefix generally denoted
         * by it beginning with a capital letter and camel-cased throughout.
         */
        dom: string;

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
         * @name upperCase
         * @memberof plat.IVendorPrefix
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The common uppercase representation of the browser's vendor prefix
         * generally denoted by it beginning with a capital letter.
         */
        upperCase: string;
    }
}
