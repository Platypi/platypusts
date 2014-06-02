module plat {
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
    export var ICompat = Compat;

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
}
