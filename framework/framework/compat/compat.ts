module plat {
    /**
     * A class for checking browser compatibility issues.
     */
    export class Compat implements ICompat {
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
         * An object containing the correctly mapped touch events for the browser.
         */
        mappedEvents: IMappedEvents;

        /**
         * Determines if the browser is modern enough to correctly 
         * run PlatypusTS.
         */
        get isCompatible() {
            var $document = acquire('$document');

            return isFunction(Object.defineProperty) &&
                isFunction($document.querySelector);
        }

        constructor() {
            var contextManager: observable.IContextManagerStatic = acquire('$ContextManagerStatic'),
                $window: Window = acquire('$window'),
                define = contextManager.defineGetter,
                navigator = $window.navigator,
                hasTouch = !isUndefined((<any>$window).ontouchstart),
                hasPointer = !!navigator.pointerEnabled,
                hasMsPointer = !!navigator.msPointerEnabled,
                def = (<any>$window).define,
                msA = (<any>$window).MSApp;

            define(this, 'cordova', !isNull((<any>$window).cordova));
            define(this, 'pushState', !isNull($window.history.pushState));
            define(this, 'fileSupported', !(isUndefined((<any>$window).File) || isUndefined((<any>$window).FormData)));
            define(this, 'amd', isFunction(def) && !isNull(def.amd));
            define(this, 'msApp', isObject(msA) && isFunction(msA.execUnsafeLocalFunction));
            define(this, 'indexedDb', !isNull($window.indexedDB));
            define(this, 'proto', isObject((<any>{}).__proto__));
            define(this, 'getProto', isFunction(Object.getPrototypeOf));
            define(this, 'setProto', isFunction((<any>Object).setPrototypeOf));
            define(this, 'hasTouchEvents', hasTouch);
            define(this, 'hasPointerEvents', hasPointer);
            define(this, 'hasMsPointerEvents', hasMsPointer);

            if (hasPointer) {
                define(this, 'mappedEvents', {
                    $touchstart: 'pointerdown',
                    $touchend: 'pointerup',
                    $touchmove: 'pointermove',
                    $touchcancel: 'pointercancel',
                    $touchenter: 'pointerover',
                    $touchleave: 'pointerout'
                });
            } else if (hasMsPointer) {
                define(this, 'mappedEvents', {
                    $touchstart: 'MSPointerDown',
                    $touchend: 'MSPointerUp',
                    $touchmove: 'MSPointerMove',
                    $touchcancel: 'MSPointerCancel',
                    $touchenter: 'MSPointerOver',
                    $touchleave: 'MSPointerOut'
                });
            } else if (hasTouch) {
                define(this, 'mappedEvents', {
                    $touchstart: 'touchstart',
                    $touchend: 'touchend',
                    $touchmove: 'touchmove',
                    $touchcancel: 'touchcancel',
                    $touchenter: 'touchenter',
                    $touchleave: 'touchleave'
                });
            } else {
                define(this, 'mappedEvents', {
                    $touchstart: 'mousedown',
                    $touchend: 'mouseup',
                    $touchmove: 'mousemove',
                    $touchcancel: null,
                    $touchenter: 'mouseenter',
                    $touchleave: 'mouseleave'
                });
            }
        }
    }

    register.injectable('$compat', Compat);

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
         * An event type for touch enter (or 'over').
         */
        $touchenter: string;

        /**
         * An event type for touch leave (or 'out').
         */
        $touchleave: string;

        /**
         * An event type for touch cancel.
         */
        $touchcancel: string;
    }

    /**
     * An object containing boolean values signifying browser 
     * and/or platform compatibilities.
     */
    export interface ICompat {
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
         * An object containing the correctly mapped touch events for the browser.
         */
        mappedEvents: IMappedEvents;

        /**
         * Determines if the browser is modern enough to correctly 
         * run PlatypusTS.
         */
        isCompatible: boolean;
    }
}
