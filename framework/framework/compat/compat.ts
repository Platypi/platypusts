module plat {
    /**
     * A class containing boolean values signifying browser 
     * and/or platform compatibilities.
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
        vendorPrefix: IVendorPrefix;

        /**
         * Define everything
         */
        constructor() {
            this.__defineBooleans();
            this.__defineMappedEvents();
            this.__defineAnimationEvents();
            this.__determineCss();
        }

        private __defineBooleans(): void {
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

        private __defineAnimationEvents(): void {
            var documentElement = this.$Document.documentElement,
                styles = this.$Window.getComputedStyle(documentElement, ''),
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
                js: prefix[0].toUpperCase() + prefix.substr(1)
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

        private __determineCss(): void {
            var $document = this.$Document,
                head = $document.head,
                element = $document.createElement('div');

            element.setAttribute(__Hide, '');
            head.insertBefore(element, null);

            var computedStyle = this.$Window.getComputedStyle(element),
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

        /**
         * An object containing information regarding any potential vendor prefix.
         */
        vendorPrefix: IVendorPrefix;
    }

    /**
     * Describes an object containing the correctly mapped touch events for the browser.
     */
    export interface IMappedEvents extends IObject<string> {
        /**
         * An event type for touch start.
         */
        $touchstart: string;

        /**
         * An event type for touch end.
         */
        $touchend: string;

        /**
         * An event type for touch move.
         */
        $touchmove: string;

        /**
         * An event type for touch cancel.
         */
        $touchcancel: string;
    }

    /**
     * Describes an object containing the properly prefixed animation events.
     */
    export interface IAnimationEvents extends IObject<string> {
        /**
         * The animation identifier.
         */
        $animation: string;

        /**
         * The animation start event.
         */
        $animationStart: string;

        /**
         * The animation end event.
         */
        $animationEnd: string;

        /**
         * The transition identifier.
         */
        $transition: string;

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
     * Describes an object that contains information regarding the browser's 
     * vendor prefix.
     */
    export interface IVendorPrefix extends IObject<string> {
        /**
         * The lowercase representation of the browser's vendor prefix.
         */
        lowerCase: string;

        /**
         * The css representation of the browser's vendor prefix.
         */
        css: string;

        /**
         * The JavaScript representation of the browser's vendor prefix 
         * denoted by it beginning with a capital letter.
         */
        js: string;
    }
}
