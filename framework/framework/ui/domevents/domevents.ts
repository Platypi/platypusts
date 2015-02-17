module plat.ui {
    'use strict';

    /**
     * @name DomEvents
     * @memberof plat.ui
     * @kind class
     * 
     * @description
     * A class for managing DOM event registration and handling.
     */
    export class DomEvents {
        protected static _inject: any = {
            _document: __Document,
            _compat: __Compat
        };

        /**
         * @name config
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.ui.IDomEventsConfig}
         * 
         * @description
         * A configuration object for all DOM events.
         */
        static config: IDomEventsConfig = {
            /**
             * An object containing the different time intervals that govern the behavior of certain 
             * custom DOM events.
             */
            intervals: <IIntervals>{
                /**
                 * The max time in milliseconds a user can hold down on the screen 
                 * for a tap event to be fired.
                 */
                tapInterval: 250,
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
            distances: <IDistances>{
                /**
                 * The minimum distance in pixels a user must move after touch down to register 
                 * it as a scroll instead of a tap.
                 */
                minScrollDistance: 3,
                /**
                 * The maximum distance in pixels between consecutive taps a user is allowed to 
                 * register a dbltap event.
                 */
                maxDblTapDistance: 20
            },

            /**
             * An object containing the different minimum/maximum velocities that govern the behavior of certain 
             * custom DOM events.
             */
            velocities: <IVelocities>{
                /**
                 * The minimum velocity in pixels/ms a user must move after touch down to register 
                 * a swipe event.
                 */
                minSwipeVelocity: 0.8
            },

            /**
             * The default CSS styles applied to elements listening for custom DOM events. If using 
             * platypus.css, you must overwrite the styles in platypus.css or create your own and 
             * change the classNames in the config.
             */
            styleConfig: <Array<IDefaultStyle>>[{
                /**
                 * The className that will be used to define the custom style for 
                 * allowing the best touch experience. This class is added to every 
                 * element that registers for a custom DOM event (denoted by a prefixed '$').
                 */
                className: 'plat-gesture',
                /**
                 * An array of string styles to be placed on an element to allow for the 
                 * best touch experience. In the format 'CSS identifier: value'
                 * (e.g. 'width : 100px')
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
                     * (e.g. 'width : 100px')
                     */
                    styles: [
                        '-ms-touch-action: none',
                        'touch-action: none'
                    ]
                }]
        };

        /**
         * @name _document
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access protected
         * @static
         * 
         * @type {Document}
         * 
         * @description
         * Reference to the Document injectable.
         */
        protected _document: Document;

        /**
         * @name _compat
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access protected
         * @static
         * 
         * @type {plat.Compat}
         * 
         * @description
         * Reference to the {@link plat.Compat|Compat} injectable.
         */
        protected _compat: Compat;

        /**
         * @name _isActive
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the {@link plat.ui.DomEvents|DomEvents} are currently active. 
         * They become active at least one element on the current 
         * page is listening for a custom event.
         */
        protected _isActive: boolean;

        /**
         * @name _inTouch
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the user is currently touching the screen.
         */
        protected _inTouch: boolean;

        /**
         * @name _inMouse
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the user is using mouse when touch events are present.
         */
        protected _inMouse = false;

        /**
         * @name _subscribers
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access protected
         * 
         * @type {plat.IObject<plat.ui.IEventSubscriber>}
         * 
         * @description
         * An object with keyed subscribers that keep track of all of the 
         * events registered on a particular element.
         */
        protected _subscribers: IObject<IEventSubscriber> = {};

        /**
         * @name _startEvents
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access protected
         * 
         * @type {Array<string>}
         * 
         * @description
         * The touch start events defined by this browser.
         */
        protected _startEvents: Array<string>;

        /**
         * @name _moveEvents
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access protected
         * 
         * @type {Array<string>}
         * 
         * @description
         * The touch move events defined by this browser.
         */
        protected _moveEvents: Array<string>;

        /**
         * @name _endEvents
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access protected
         * 
         * @type {Array<string>}
         * 
         * @description
         * The touch end events defined by this browser.
         */
        protected _endEvents: Array<string>;

        /**
         * @name _gestures
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.IGestures<string>}
         * 
         * @description
         * An object containing the event types for all of the 
         * supported gestures.
         */
        protected _gestures: IGestures<string> = {
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

        /**
         * @name _gestureCount
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.IBaseGestures<number>}
         * 
         * @description
         * An object containing the number of currently active 
         * events of each base type.
         */
        protected _gestureCount: IBaseGestures<number> = {
            $tap: 0,
            $dbltap: 0,
            $hold: 0,
            $release: 0,
            $swipe: 0,
            $track: 0,
            $trackend: 0
        };

        /**
         * @name __START
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {string}
         * 
         * @description
         * A constant for specifying the start condition.
         */
        private __START = 'start';
        /**
         * @name __MOVE
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {string}
         * 
         * @description
         * A constant for specifying the move condition.
         */
        private __MOVE = 'move';
        /**
         * @name __END
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {string}
         * 
         * @description
         * A constant for specifying the end condition.
         */
        private __END = 'end';
        /**
         * @name __hasMoved
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the user moved while in touch.
         */
        private __hasMoved = false;
        /**
         * @name __hasSwiped
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the user swiped while in touch.
         */
        private __hasSwiped = false;
        /**
         * @name __hasRelease
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not their is a registered "release" event.
         */
        private __hasRelease = false;
        /**
         * @name __detectingMove
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not we should be detecting move events.
         */
        private __detectingMove = false;
        /**
         * @name __tapCount
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {number}
         * 
         * @description
         * The current tap count to help distinguish single from double taps.
         */
        private __tapCount = 0;
        /**
         * @name __touchCount
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {number}
         * 
         * @description
         * The total number of touches on the screen.
         */
        private __touchCount = 0;
        /**
         * @name __cancelDeferredTap
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function to remove a deferred tap given the case that a tap delay was needed for 
         * something such as a double tap to zoom feature.
         */
        private __cancelDeferredTap = noop;
        /**
         * @name __cancelDeferredHold
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing a deferred hold event.
         */
        private __cancelDeferredHold = noop;
        /**
         * @name __cancelRegex
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {RegExp}
         * 
         * @description
         * A regular expressino for determining a "cancel" event.
         */
        private __cancelRegex = /cancel/i;
        /**
         * @name __pointerEndRegex
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {RegExp}
         * 
         * @description
         * A regular expressino for determining a pointer end event.
         */
        private __pointerEndRegex = /up|cancel/i;
        /**
         * @name __lastTouchDown
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {plat.ui.IBaseEventProperties}
         * 
         * @description
         * The user's last touch down.
         */
        private __lastTouchDown: IBaseEventProperties;
        /**
         * @name __swipeOrigin
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {plat.ui.IBaseEventProperties}
         * 
         * @description
         * The starting place of an initiated swipe gesture.
         */
        private __swipeOrigin: IBaseEventProperties;
        /**
         * @name __lastMoveEvent
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {plat.ui.IPointerEvent}
         * 
         * @description
         * The user's last move while in touch.
         */
        private __lastMoveEvent: IPointerEvent;
        /**
         * @name __lastTouchUp
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {plat.ui.IPointerEvent}
         * 
         * @description
         * The user's last touch up.
         */
        private __lastTouchUp: IPointerEvent;
        /**
         * @name __capturedTarget
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {plat.ui.ICustomElement}
         * 
         * @description
         * The captured target that the user first initiated a gesture on.
         */
        private __capturedTarget: ICustomElement;
        /**
         * @name __focusedElement
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {HTMLInputElement}
         * 
         * @description
         * The currently focused element on the screen. Used in the case of WebKit touch events.
         */
        private __focusedElement: HTMLInputElement;
        /**
         * @name __reverseMap
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {{}}
         * 
         * @description
         * A hash map for mapping custom events to standard events.
         */
        private __reverseMap = {};
        /**
         * @name __mappedEventListener
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {EventListener}
         * 
         * @description
         * An EventListener with a bound context for registering mapped events.
         */
        private __mappedEventListener: EventListener = this.__handleMappedEvent.bind(this);
        /**
         * @name __mappedCount
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access protected
         * 
         * @type {plat.ITouchMapping<number>}
         * 
         * @description
         * An object containing the number of currently active mapped touch 
         * events of each type.
         */
        private __mappedCount: ITouchMapping<number> = {
            $touchstart: 0,
            $touchmove: 0,
            $touchend: 0,
            $touchcancel: 0
        };
        /**
         * @name __swipeSubscribers
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {Array<plat.ui.DomEvent>}
         * 
         * @description
         * An array of subscribers for the swipe gesture.
         */
        private __swipeSubscribers: Array<DomEvent>;
        /**
         * @name __pointerHash
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {plat.IObject<plat.ui.IPointerEvent>}
         * 
         * @description
         * A hash of the current pointer touch points on the page.
         */
        private __pointerHash: IObject<IPointerEvent> = {};
        /**
         * @name __pointerEvents
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {Array<plat.ui.IPointerEvent>}
         * 
         * @description
         * An array containing all current pointer touch points on the page.
         */
        private __pointerEvents: Array<IPointerEvent> = [];
        /**
         * @name __listeners
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         * 
         * @type {plat.ui.ICustomEventListener}
         * 
         * @description
         * A set of touch start, move, and end listeners to be place on the document.
         */
        private __listeners: ICustomEventListener = {
            start: this._onTouchStart.bind(this),
            move: this._onTouchMove.bind(this),
            end: this._onTouchEnd.bind(this)
        };

        /**
         * @name constructor
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access public
         * 
         * @description
         * Retrieve the type of touch events for this browser and create the default gesture style.
         * 
         * @returns {plat.ui.DomEvents}
         */
        constructor() {
            this.__getTypes();
        }

        /**
         * @name addEventListener
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Add an event listener for the specified event type on the specified element.
         * 
         * @param {Node} element The node listening for the event.
         * @param {string} type The type of event being listened to.
         * @param {plat.ui.IGestureListener} listener The listener to be fired.
         * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
         * 
         * @returns {plat.IRemoveListener} A function for removing the event listener and stop listening to the event.
         */
        addEventListener(element: Node, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
        /**
         * @name addEventListener
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Add an event listener for the specified event type on the specified element.
         * 
         * @param {Window} element The window object.
         * @param {string} type The type of event being listened to.
         * @param {plat.ui.IGestureListener} listener The listener to be fired.
         * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
         * 
         * @returns {plat.IRemoveListener} A function for removing the event listener and stop listening to the event.
         */
        addEventListener(element: Window, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
        /**
         * @name addEventListener
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Add an event listener for the specified event type on the specified element.
         * 
         * @param {Node} element The node listening for the event.
         * @param {string} type The type of event being listened to.
         * @param {EventListener} listener The listener to be fired.
         * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
         * 
         * @returns {plat.IRemoveListener} A function for removing the event listener and stop listening to the event.
         */
        addEventListener(element: Node, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
        /**
         * @name addEventListener
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access public
         * @variation 3
         * 
         * @description
         * Add an event listener for the specified event type on the specified element.
         * 
         * @param {Window} element The window object.
         * @param {string} type The type of event being listened to.
         * @param {EventListener} listener The listener to be fired.
         * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
         * 
         * @returns {plat.IRemoveListener} A function for removing the event listener and stop listening to the event.
         */
        addEventListener(element: Window, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
        addEventListener(element: any, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener {
            var _compat = this._compat,
                mappedGestures = _compat.mappedEvents,
                mappedType = mappedGestures[type],
                mappingExists = !isNull(mappedType),
                mappedCount = this.__mappedCount,
                mappedRemoveListener = noop,
                mappedTouchRemoveListener = noop,
                gestures = this._gestures,
                listenerRemoved = false;

            if (mappingExists) {
                var count = mappedCount[type];
                (<any>this.__reverseMap)[mappedType] = type;
                this.__registerElement(element, type);
                mappedCount[type]++;
                mappedRemoveListener = this.__addMappedEvent(count, mappedType, useCapture);

                if (_compat.hasTouchEvents && !this.__cancelRegex.test(mappedType)) {
                    mappedType = mappedType
                        .replace('touch', 'mouse')
                        .replace('start', 'down')
                        .replace('end', 'up');
                    (<any>this.__reverseMap)[mappedType] = type;
                    mappedTouchRemoveListener = this.__addMappedEvent(count, mappedType, useCapture);
                }
            }

            element.addEventListener(type, listener, useCapture);

            if (!isUndefined(element['on' + type]) || isUndefined((<any>gestures)[type]) || mappingExists) {
                return (): void => {
                    if (listenerRemoved) {
                        return;
                    } else if (mappingExists) {
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
                        this.__unregisterElement(element, type);
                    }

                    listenerRemoved = true;
                    element.removeEventListener(type, listener, useCapture);
                };
            }

            var swipeGesture = gestures.$swipe,
                trackGesture = gestures.$track,
                countType = type;

            if (type.indexOf(trackGesture) !== -1) {
                var trackend = gestures.$trackend;
                countType = type === trackend ? trackend : trackGesture;
            } else if (type.indexOf(swipeGesture) !== -1) {
                countType = swipeGesture;
            }

            (<any>this._gestureCount)[countType]++;
            this.__registerElement(element, type);

            return (): void => {
                if (listenerRemoved) {
                    return;
                }

                listenerRemoved = true;
                this.__removeEventListener(element, type, listener, useCapture);
            };
        }

        /**
         * @name dispose
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access public
         * 
         * @description
         * Stops listening for touch events and resets the DomEvents instance.
         * 
         * @returns {void}
         */
        dispose(): void {
            this.__unregisterTypes();

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
            this.__tapCount = this.__touchCount = 0;
            this.__detectingMove = this.__hasMoved = this.__hasRelease = this.__hasSwiped = false;
            this.__lastMoveEvent = this.__lastTouchDown = this.__lastTouchUp = null;
            this.__swipeOrigin = this.__capturedTarget = this.__focusedElement = null;
            this.__cancelDeferredHold = this.__cancelDeferredTap = noop;
        }

        /**
         * @name _onTouchStart
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access protected
         * 
         * @description
         * A listener for touch/mouse start events.
         * 
         * @param {plat.ui.IPointerEvent} ev The touch start event object.
         * 
         * @returns {boolean} Prevents default and stops propagation if false is returned.
         */
        protected _onTouchStart(ev: IPointerEvent): boolean {
            if (this.__touchCount++ > 0) {
                return true;
            }

            if (ev.type !== 'mousedown') {
                this._inTouch = true;
            } else if (this._inTouch === true) {
                // return immediately if mouse event and currently in a touch
                ev.preventDefault();
                return false;
            } else if (this._compat.hasTouchEvents) {
                this._inMouse = true;
            }

            ev = this.__standardizeEventObject(ev);
            if (isNull(ev)) {
                return true;
            }

            // set any captured target and last move back to null
            this.__capturedTarget = this.__lastMoveEvent = null;
            this.__hasMoved = false;
            this.__lastTouchDown = this.__swipeOrigin = {
                _buttons: ev._buttons,
                clientX: ev.clientX,
                clientY: ev.clientY,
                timeStamp: ev.timeStamp,
                target: ev.target,
                identifier: ev.identifier
            };

            var gestureCount = this._gestureCount,
                noHolds = gestureCount.$hold <= 0,
                noRelease = gestureCount.$release <= 0;

            // if any moving events registered, register move
            if (gestureCount.$track > 0 || gestureCount.$trackend > 0 || gestureCount.$swipe > 0) {
                this.__registerType(this.__MOVE);
                this.__detectingMove = true;
            }

            // return if no hold or release events are registered
            if (noHolds && noRelease) {
                return true;
            }

            var holdInterval = DomEvents.config.intervals.holdInterval,
                domEvent: DomEvent,
                subscribeFn: () => void,
                domEventFound = false;

            if (noHolds) {
                this.__hasRelease = false;
                this.__cancelDeferredHold = defer((): void => {
                    this.__hasRelease = true;
                }, holdInterval);
                return true;
            } else if (noRelease) {
                domEvent = this.__findFirstSubscriber(<ICustomElement>ev.target, this._gestures.$hold);
                if ((domEventFound = !isNull(domEvent))) {
                    subscribeFn = (): void => {
                        domEvent.trigger(ev);
                        this.__cancelDeferredHold = noop;
                    };
                }
            } else {
                this.__hasRelease = false;
                // has both hold and release events registered
                domEvent = this.__findFirstSubscriber(<ICustomElement>ev.target, this._gestures.$hold);
                if ((domEventFound = !isNull(domEvent))) {
                    subscribeFn = (): void => {
                        domEvent.trigger(ev);
                        this.__hasRelease = true;
                        this.__cancelDeferredHold = noop;
                    };
                }
            }

            // set timeout to fire the subscribeFn
            if (domEventFound) {
                this.__cancelDeferredHold = defer(subscribeFn, holdInterval);
            }
        }

        /**
         * @name _onTouchMove
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access protected
         * 
         * @description
         * A listener for touch/mouse move events.
         * 
         * @param {plat.ui.IPointerEvent} ev The touch move event object.
         * 
         * @returns {boolean} Prevents default and stops propagation if false is returned.
         */
        protected _onTouchMove(ev: IPointerEvent): boolean {
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

            var gestureCount = this._gestureCount,
                noTracking = gestureCount.$track <= 0,
                noSwiping = gestureCount.$swipe <= 0,
                config = DomEvents.config,
                swipeOrigin = this.__swipeOrigin,
                x = evt.clientX,
                y = evt.clientY,
                minMove = this.__hasMoved ||
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

            var lastMove = <IBaseEventProperties>this.__lastMoveEvent || swipeOrigin,
                direction = evt.direction = this.__getDirection(x - lastMove.clientX, y - lastMove.clientY),
                originChanged = this.__checkForOriginChanged(direction),
                velocity = evt.velocity = this.__getVelocity(x - swipeOrigin.clientX, y - swipeOrigin.clientY,
                    evt.timeStamp - swipeOrigin.timeStamp);

            // if swiping events exist
            if (!(noSwiping || (this.__hasSwiped && !originChanged))) {
                this.__setRegisteredSwipes(direction, velocity);
            }

            // if tracking events exist
            if (!noTracking) {
                this.__handleTrack(evt, ev);
            }

            this.__lastMoveEvent = evt;
        }

        /**
         * @name _onTouchEnd
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access protected
         * 
         * @description
         * A listener for touch/mouse end events.
         * 
         * @param {plat.ui.IPointerEvent} ev The touch end event object.
         * 
         * @returns {boolean} Prevents default and stops propagation if false is returned.
         */
        protected _onTouchEnd(ev: IPointerEvent): boolean {
            var eventType = ev.type,
                hasMoved = this.__hasMoved;

            if (eventType !== 'mouseup') {
                // all non mouse cases
                if (eventType === 'touchend') {
                    // all to handle a strange issue when touch clicking certain types 
                    // of DOM elements
                    if (hasMoved) {
                        // we check ev.cancelable in the END case in case of scrolling conditions
                        if (ev.cancelable === true) {
                            ev.preventDefault();
                        }
                    } else if (this._inTouch === true) {
                        // handInput must be called prior to preventClickFromTouch due to an 
                        // order of operations
                        this.__handleInput(<HTMLInputElement>ev.target);
                        if (ev.cancelable === true) {
                            ev.preventDefault();
                        }
                    } else {
                        this.__preventClickFromTouch();
                        if (ev.cancelable === true) {
                            ev.preventDefault();
                        }
                        return true;
                    }

                    this.__preventClickFromTouch();
                }

                this._inTouch = false;
            } else if (!isUndefined(this._inTouch)) {
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

            this.__clearTempStates();

            this.__touchCount = ev.touches.length;

            // handle release event
            if (this.__hasRelease) {
                this.__handleRelease(ev);
            }

            // handle swipe events
            if (this.__hasSwiped) {
                this.__handleSwipe();
            }

            var config = DomEvents.config,
                intervals = config.intervals,
                touchEnd = ev.timeStamp,
                touchDown = this.__lastTouchDown;

            // if the user moved their finger (for scroll) we handle $trackend and return,
            // else if they had their finger down too long to be considered a tap, we want to return
            if (hasMoved) {
                this.__handleTrackEnd(ev);
                this.__tapCount = 0;
                return true;
            } else if (isNull(touchDown) || ((touchEnd - touchDown.timeStamp) > intervals.tapInterval)) {
                this.__tapCount = 0;
                return true;
            }

            var lastTouchUp = this.__lastTouchUp,
                x = ev.clientX,
                y = ev.clientY;

            // check if can be a double tap event by checking number of taps, distance between taps, 
            // and time between taps
            if (this.__tapCount > 0 &&
                this.__getDistance(x, lastTouchUp.clientX, y, lastTouchUp.clientY) <= config.distances.maxDblTapDistance &&
                ((touchEnd - lastTouchUp.timeStamp) <= intervals.dblTapInterval)) {
                // handle dbltap events
                this.__handleDbltap(ev);
            } else {
                this.__tapCount = 0;
            }

            // handle tap events
            this.__handleTap(ev);

            this.__lastTouchUp = ev;
        }

        /**
         * @name __clearTempStates
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Clears all temporary states like move and hold events.
         * 
         * @returns {void}
         */
        private __clearTempStates(): void {
            // clear hold event
            this.__cancelDeferredHold();
            this.__cancelDeferredHold = noop;

            if (this.__detectingMove) {
                this.__unregisterType(this.__MOVE);
                this.__detectingMove = false;
            }
        }

        /**
         * @name __resetTouchEnd
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * A function for resetting all values potentially modified during the touch event sequence.
         * 
         * @returns {void}
         */
        private __resetTouchEnd(): void {
            this.__tapCount = this.__touchCount = 0;
            this._inTouch = this.__hasRelease = this.__hasSwiped = false;
            this.__pointerHash = {};
            this.__pointerEvents = [];
            this.__capturedTarget = null;
        }

        // gesture handling methods

        /**
         * @name __handleCanceled
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * A function for handling when gestures are canceled via the Browser.
         * 
         * @param {plat.ui.IPointerEvent} ev The touch cancel event object.
         * 
         * @returns {void}
         */
        private __handleCanceled(ev: IPointerEvent): void {
            var touches = ev.touches || this.__pointerEvents,
                index = this.__getTouchIndex(touches);

            ev = index >= 0 ? touches[index] : this.__standardizeEventObject(ev);
            this.__clearTempStates();
            if (this.__hasMoved) {
                this.__handleTrackEnd(ev);
            }
            this.__resetTouchEnd();
        }

        /**
         * @name __handleTap
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * A function for handling and firing tap events.
         * 
         * @param {plat.ui.IPointerEvent} ev The touch end event object.
         * 
         * @returns {void}
         */
        private __handleTap(ev: IPointerEvent): void {
            this.__tapCount++;

            if (this._gestureCount.$tap <= 0) {
                return;
            }

            var gestures = this._gestures,
                domEvent = this.__findFirstSubscriber(<ICustomElement>ev.target, gestures.$tap);

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
            this.__cancelDeferredTap = defer((): void => {
                ev._buttons = this.__lastTouchDown._buttons;
                domEvent.trigger(ev);
                this.__tapCount = 0;
                this.__cancelDeferredTap = noop;
            }, DomEvents.config.intervals.dblTapZoomDelay);
        }

        /**
         * @name __handleDbltap
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * A function for handling and firing double tap events.
         * 
         * @param {plat.ui.IPointerEvent} ev The touch end event object.
         * 
         * @returns {void}
         */
        private __handleDbltap(ev: IPointerEvent): void {
            this.__tapCount = 0;

            this.__cancelDeferredTap();
            this.__cancelDeferredTap = noop;

            if (this._gestureCount.$dbltap <= 0) {
                return;
            }

            var domEvent = this.__findFirstSubscriber(<ICustomElement>ev.target, this._gestures.$dbltap);
            if (isNull(domEvent)) {
                return;
            }

            ev._buttons = this.__lastTouchDown._buttons;
            domEvent.trigger(ev);
            // set touch count to -1 to prevent repeated fire on sequential taps
            this.__tapCount = -1;
        }

        /**
         * @name __handleRelease
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * A function for handling and firing release events.
         * 
         * @param {plat.ui.IPointerEvent} ev The touch end event object.
         * 
         * @returns {void}
         */
        private __handleRelease(ev: IPointerEvent): void {
            var domEvent = this.__findFirstSubscriber(<ICustomElement>ev.target, this._gestures.$release);
            if (!isNull(domEvent)) {
                domEvent.trigger(ev);
            }

            this.__hasRelease = false;
        }

        /**
         * @name __handleSwipe
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * A function for handling and firing swipe events.
         * 
         * @returns {void}
         */
        private __handleSwipe(): void {
            var lastMove = this.__lastMoveEvent;
            if (isNull(lastMove)) {
                this.__hasSwiped = false;
                this.__swipeSubscribers = null;
                return;
            }

            var swipeSubscribers = this.__swipeSubscribers || [];
            while (swipeSubscribers.length > 0) {
                swipeSubscribers.pop().trigger(lastMove);
            }

            this.__hasSwiped = false;
            this.__lastMoveEvent = null;
            this.__swipeSubscribers = null;
        }

        /**
         * @name __handleTrack
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * A function for handling and firing track events.
         * 
         * @param {plat.ui.IPointerEvent} ev The touch move event object.
         * @param {plat.ui.IPointerEvent} originalEv The original touch move event object 
         * used for preventing default in the case of an ANDROID device.
         * 
         * @returns {void}
         */
        private __handleTrack(ev: IPointerEvent, originalEv: IPointerEvent): void {
            var trackGesture = this._gestures.$track,
                direction = ev.direction,
                eventTarget = this.__capturedTarget || <ICustomElement>ev.target;

            var domEvents = this.__findFirstSubscribers(eventTarget,
                [trackGesture, (trackGesture + direction.x), (trackGesture + direction.y)]);
            if (domEvents.length > 0) {
                if (!isUndefined(this._compat.ANDROID)) {
                    originalEv.preventDefault();
                }

                while (domEvents.length > 0) {
                    domEvents.pop().trigger(ev);
                }
            }
        }

        /**
         * @name __handleTrackEnd
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * A function for handling and firing track end events.
         * 
         * @param {plat.ui.IPointerEvent} ev The touch end event object.
         * 
         * @returns {void}
         */
        private __handleTrackEnd(ev: IPointerEvent): void {
            if (this._gestureCount.$trackend <= 0) {
                return;
            }

            var eventTarget = this.__capturedTarget || <ICustomElement>ev.target,
                domEvent = this.__findFirstSubscriber(eventTarget, this._gestures.$trackend);
            if (isNull(domEvent)) {
                return;
            }

            domEvent.trigger(ev);
        }

        /**
         * @name __handleMappedEvent
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * A function for handling and firing custom events that are mapped to standard events.
         * 
         * @param {plat.ui.IExtendedEvent} ev The touch event object.
         * 
         * @returns {void}
         */
        private __handleMappedEvent(ev: IExtendedEvent): void {
            var mappedType = ev.type,
                eventType = (<any>this.__reverseMap)[mappedType],
                domEvent = this.__findFirstSubscriber(<ICustomElement>ev.target, eventType);

            if (isNull(domEvent)) {
                return;
            }

            ev = this.__standardizeEventObject(ev);
            if (isNull(ev)) {
                return;
            }

            domEvent.trigger(ev);
        }

        // touch type and element registration

        /**
         * @name __getTypes
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * A function for determining the proper touch events.
         * 
         * @returns {void}
         */
        private __getTypes(): void {
            var _compat = this._compat,
                touchEvents = _compat.mappedEvents;

            if (_compat.hasPointerEvents) {
                this._startEvents = [touchEvents.$touchstart];
                this._moveEvents = [touchEvents.$touchmove];
                this._endEvents = [touchEvents.$touchend, touchEvents.$touchcancel];
                return;
            } else if (_compat.hasTouchEvents) {
                this._startEvents = [touchEvents.$touchstart, 'mousedown'];
                this._moveEvents = [touchEvents.$touchmove, 'mousemove'];
                this._endEvents = [touchEvents.$touchend, touchEvents.$touchcancel, 'mouseup'];
                return;
            }

            var cancelEvent = touchEvents.$touchcancel;
            this._startEvents = [touchEvents.$touchstart];
            this._moveEvents = [touchEvents.$touchmove];
            this._endEvents = isNull(cancelEvent) ? [touchEvents.$touchend] : [touchEvents.$touchend, cancelEvent];
        }

        /**
         * @name __registerTypes
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Registers for and starts listening to start and end touch events on the document.
         * 
         * @returns {void}
         */
        private __registerTypes(): void {
            this.__registerType(this.__START);
            this.__registerType(this.__END);
        }

        /**
         * @name __unregisterTypes
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Unregisters for and stops listening to all touch events on the document.
         * 
         * @returns {void}
         */
        private __unregisterTypes(): void {
            this.__unregisterType(this.__START);
            this.__unregisterType(this.__MOVE);
            this.__unregisterType(this.__END);
        }

        /**
         * @name __registerType
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Registers for and begins listening to a particular touch event type.
         * 
         * @param {string} event The event type to begin listening for.
         * 
         * @returns {void}
         */
        private __registerType(event: string): void {
            var events: Array<string>,
                listener = this.__listeners[event],
                _document = this._document;

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
                _document.addEventListener(events[index], listener, false);
            }
        }

        /**
         * @name __unregisterType
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Unregisters for and stops listening to a particular touch event type.
         * 
         * @param {string} event The event type to stop listening for.
         * 
         * @returns {void}
         */
        private __unregisterType(event: string): void {
            var events: Array<string>,
                listener = this.__listeners[event],
                _document = this._document;

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
                _document.removeEventListener(events[index], listener, false);
            }
        }

        /**
         * @name __registerElement
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Registers and associates an element with an event.
         * 
         * @param {plat.ui.ICustomElement} element The element being tied to a custom event.
         * @param {string} type The type of event.
         * 
         * @returns {void}
         */
        private __registerElement(element: ICustomElement, type: string): void {
            var id: string,
                plat = element.__plat;
            if (isNull(plat)) {
                id = uniqueId('domEvent_');
                element.__plat = plat = {
                    domEvent: id
                };
            } else if (isNull(plat.domEvent)) {
                id = uniqueId('domEvent_');
                plat.domEvent = id;
            }

            // check if DomEvents is ready
            if (!this._isActive) {
                this.__registerTypes();

                if (isNull(this._isActive)) {
                    this.__appendGestureStyle();
                }

                this._isActive = true;
            }

            var _domEvent: DomEvent;
            if (isNull(id)) {
                var subscriber = this._subscribers[plat.domEvent];
                if (isUndefined((<any>subscriber)[type])) {
                    _domEvent = new CustomDomEvent(element, type);
                    (<any>subscriber)[type] = _domEvent;
                } else {
                    (<any>subscriber)[type].count++;
                }
                subscriber.gestureCount++;
                return;
            }

            var newSubscriber = { gestureCount: 1 };
            _domEvent = new CustomDomEvent(element, type);
            (<any>newSubscriber)[type] = _domEvent;
            this._subscribers[id] = newSubscriber;

            if (!isUndefined((<HTMLElement>element).className)) {
                addClass(<HTMLElement>element, DomEvents.config.styleConfig[0].className);
            }
            this.__removeSelections(element);
        }

        /**
         * @name __unregisterElement
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Unregisters and disassociates an element with an event.
         * 
         * @param {plat.ui.ICustomElement} element The element being disassociated with the given custom event.
         * @param {string} type The type of event.
         * 
         * @returns {void}
         */
        private __unregisterElement(element: ICustomElement, type: string): void {
            var plat = element.__plat;
            if (isNull(plat) || isNull(plat.domEvent)) {
                return;
            }

            var domEventId = plat.domEvent,
                eventSubscriber = this._subscribers[domEventId],
                domEvent: CustomDomEvent = (<any>eventSubscriber)[type];

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
        }

        /**
         * @name __setTouchPoint
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Sets the current touch point and helps standardize the given event object.
         * 
         * @param {plat.ui.IPointerEvent} ev The current point being touched.
         * 
         * @returns {void}
         */
        private __setTouchPoint(ev: IPointerEvent): void {
            var eventType = ev.type,
                _compat = this._compat;

            if (_compat.hasPointerEvents || _compat.hasMsPointerEvents) {
                this.__updatePointers(ev, this.__pointerEndRegex.test(eventType));
                return;
            }

            ev.pointerType = eventType.indexOf('mouse') === -1 ? 'touch' : 'mouse';
        }

        /**
         * @name __setCapture
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Sets the captured target.
         * 
         * @param {EventTarget} target The target to capture.
         * 
         * @returns {void}
         */
        private __setCapture(target: EventTarget): void {
            if (isNull(this.__capturedTarget) && !isDocument(target)) {
                this.__capturedTarget = <ICustomElement>target;
            }
        }

        /**
         * @name __updatePointers
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Sets the captured target.
         * 
         * @param {plat.ui.IPointerEvent} ev The current touch point.
         * @param {boolean} remove Whether to remove the touch point or add it.
         * 
         * @returns {void}
         */
        private __updatePointers(ev: IPointerEvent, remove: boolean): void {
            var id = ev.pointerId,
                pointerHash = this.__pointerHash,
                pointer = pointerHash[id],
                index: number;

            if (remove) {
                if (!isUndefined(pointer)) {
                    index = this.__pointerEvents.indexOf(pointer);
                    if (index > -1) {
                        this.__pointerEvents.splice(index, 1);
                    }
                    deleteProperty(this.__pointerHash, id);
                }
            } else {
                if (id === 1 && !isEmpty(pointerHash)) {
                    // this is a mouse movement while mid touch
                    return;
                }

                ev.identifier = ev.pointerId;
                if (isUndefined(pointer) || (index = this.__pointerEvents.indexOf(pointer)) < 0) {
                    this.__pointerEvents.push(ev);
                } else {
                    this.__pointerEvents.splice(index, 1, ev);
                }

                pointerHash[id] = ev;
            }
        }

        // event and subscription handling

        /**
         * @name __findFirstSubscriber
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Searches from the EventTarget up the DOM tree looking for an element with the 
         * registered event type.
         * 
         * @param {plat.ui.ICustomElement} eventTarget The current target of the touch event.
         * @param {string} type The type of event being searched for.
         * 
         * @returns {plat.ui.DomEvent} The found {@link plat.ui.DomEvent} associated 
         * with the first found element in the tree and the event type. Used to trigger the event at this 
         * point in the DOM tree.
         */
        private __findFirstSubscriber(eventTarget: ICustomElement, type: string): DomEvent {
            if (isNull(eventTarget)) {
                return;
            }

            var plat: ICustomElementProperty,
                subscriber: IEventSubscriber,
                domEvent: DomEvent;

            do {
                plat = eventTarget.__plat;
                if (isUndefined(plat) || isUndefined(plat.domEvent)) {
                    continue;
                }

                subscriber = this._subscribers[plat.domEvent];
                domEvent = (<any>subscriber)[type];
                if (isUndefined(domEvent)) {
                    continue;
                }

                return domEvent;
            } while (!isNull(eventTarget = <ICustomElement>eventTarget.parentNode));
        }

        /**
         * @name __findFirstSubscriber
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Searches from the EventTarget up the DOM tree looking for all elements with the 
         * registered event types.
         * 
         * @param {plat.ui.ICustomElement} eventTarget The current target of the touch event.
         * @param {Array<string>} types An array of the types of events being searched for.
         * 
         * @returns {Array<plat.ui.DomEvent>} The found {@link plat.ui.DomEvent|DomEvents} associated 
         * with the first found element in the tree and the corresponding event type. Used to trigger the events at their lowest 
         * points in the DOM tree.
         */
        private __findFirstSubscribers(eventTarget: ICustomElement, types: Array<string>): Array<DomEvent> {
            if (isNull(eventTarget)) {
                return [];
            }

            var plat: ICustomElementProperty,
                subscriber: IEventSubscriber,
                subscriberKeys: Array<string>,
                subscriberKey: string,
                domEvents: Array<DomEvent> = [],
                index: number;

            do {
                plat = eventTarget.__plat;
                if (isUndefined(plat) || isUndefined(plat.domEvent)) {
                    continue;
                }

                subscriber = this._subscribers[plat.domEvent];
                subscriberKeys = Object.keys(subscriber);
                while (subscriberKeys.length > 0) {
                    subscriberKey = subscriberKeys.pop();
                    index = types.indexOf(subscriberKey);
                    if (index !== -1) {
                        domEvents.push((<any>subscriber)[subscriberKey]);
                        types.splice(index, 1);
                    }
                }

            } while (types.length > 0 && !isNull(eventTarget = <ICustomElement>eventTarget.parentNode));

            return domEvents;
        }

        /**
         * @name __addMappedEvent
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Adds a listener for listening to a standard event and mapping it to a custom event.
         * 
         * @param {number} count The number of mapped events registered.
         * @param {string} mappedEvent The mapped event type.
         * @param {boolean} useCapture? Whether the mapped event listener is fired on the capture or bubble phase.
         * 
         * @returns {plat.IRemoveListener} A function for removing the added mapped listener.
         */
        private __addMappedEvent(count: number, mappedEvent: string, useCapture?: boolean): IRemoveListener {
            var _document = this._document;

            if (count === 0) {
                _document.addEventListener(mappedEvent, this.__mappedEventListener, useCapture);
            }

            return (): void => {
                _document.removeEventListener(mappedEvent, this.__mappedEventListener, useCapture);
            };
        }

        /**
         * @name __removeEventListener
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Removes an event listener for a given event type.
         * 
         * @param {plat.ui.ICustomElement} element The element to remove the listener from.
         * @param {string} type The type of event being removed.
         * @param {plat.ui.IGestureListener} listener The listener being removed.
         * @param {boolean} useCapture? Whether the listener is fired on the capture or bubble phase.
         * 
         * @returns {void}
         */
        private __removeEventListener(element: ICustomElement, type: string, listener: IGestureListener,
            useCapture?: boolean): void {
            var gestures = this._gestures;

            element.removeEventListener(type, listener, useCapture);

            var swipeGesture = gestures.$swipe,
                trackGesture = gestures.$track,
                countType = type;

            if (type.indexOf(trackGesture) !== -1) {
                var trackend = gestures.$trackend;
                countType = type === trackend ? trackend : trackGesture;
            } else if (type.indexOf(swipeGesture) !== -1) {
                countType = swipeGesture;
            }

            (<any>this._gestureCount)[countType]--;
            this.__unregisterElement(element, type);
        }

        /**
         * @name __removeElement
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Removes an element from the subscriber object.
         * 
         * @param {plat.ui.ICustomElement} element The element being removed.
         * 
         * @returns {void}
         */
        private __removeElement(element: ICustomElement): void {
            this.__returnSelections(element);

            if (!isUndefined(element.className)) {
                removeClass(element, DomEvents.config.styleConfig[0].className);
            }

            var plat = element.__plat;
            deleteProperty(plat, 'domEvent');
            if (isEmpty(plat)) {
                deleteProperty(element, '__plat');
            }

            // check if no elements are left listening
            if (isEmpty(this._subscribers)) {
                this.dispose();
            }
        }

        /**
         * @name __standardizeEventObject
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Standardizes certain properties on the event object for custom events.
         * 
         * @param {plat.ui.IExtendedEvent} ev The event object to be standardized.
         * 
         * @returns {plat.ui.IExtendedEvent} The potentially new Event object
         */
        private __standardizeEventObject(ev: IExtendedEvent): IExtendedEvent {
            this.__setTouchPoint(ev);

            var isStart = this._startEvents.indexOf(ev.type) !== -1,
                touches = ev.touches || this.__pointerEvents,
                changedTouches = ev.changedTouches,
                changedTouchesExist = !isUndefined(changedTouches),
                timeStamp = ev.timeStamp;

            if (changedTouchesExist) {
                if (isStart) {
                    ev = changedTouches[0];
                } else {
                    var changedTouchIndex = this.__getTouchIndex(changedTouches);
                    if (changedTouchIndex >= 0) {
                        ev = changedTouches[changedTouchIndex];
                    } else if (this.__getTouchIndex(touches) >= 0) {
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

            if (isUndefined(ev.timeStamp)) {
                ev.timeStamp = timeStamp;
            }

            return ev;
        }

        /**
         * @name __normalizeButtons
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Normalizes the 'buttons' property on an IExetendedEvent. 
         * 
         * @param {plat.ui.IExtendedEvent} ev The event.
         * 
         * @returns {void}
         */
        private __normalizeButtons(ev: IExtendedEvent): void {
            var buttons: number;
            if (isNumber(ev.buttons)) {
                if (ev.buttons === 0) {
                    buttons = 1;
                } else {
                    buttons = ev.buttons;
                }
            } else if (isNumber((<any>ev).which) && (<any>ev).which > 0) {
                buttons = (<any>ev).which;
            } else {
                switch ((<any>ev).button) {
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
        }

        /**
         * @name __getTouchIndex
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Searches through the input array looking for the primary 
         * touch down index.
         * 
         * @param {Array<plat.ui.IExtendedEvent>} ev The array of touch event objects 
         * to search through.
         * 
         * @returns {number} The array index where the touch down was found or -1 if 
         * not found.
         */
        private __getTouchIndex(touches: Array<IExtendedEvent>): number {
            var identifier = (this.__lastTouchDown || <IBaseEventProperties>{}).identifier,
                length = touches.length;

            for (var i = 0; i < length; ++i) {
                if (touches[i].identifier === identifier) {
                    return i;
                }
            }

            return -1;
        }

        /**
         * @name __getOffset
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Grabs the x and y offsets of an event object's target.
         * 
         * @param {plat.ui.IExtendedEvent} ev The current event object.
         * 
         * @returns {plat.ui.IPoint} An object containing the x and y offsets.
         */
        private __getOffset(ev: IExtendedEvent): IPoint {
            var target = this.__capturedTarget || <any>ev.target;
            if (isDocument(target)) {
                return {
                    x: ev.clientX,
                    y: ev.clientY
                };
            } else if (!isUndefined(ev.offsetX) && target === ev.target) {
                return {
                    x: ev.offsetX,
                    y: ev.offsetY
                };
            }

            var x = target.offsetLeft,
                y = target.offsetTop;
            while (!isNull(target = target.offsetParent)) {
                x += target.offsetLeft;
                y += target.offsetTop;
            }

            return {
                x: (ev.clientX - x),
                y: (ev.clientY - y)
            };
        }

        // utility methods

        /**
         * @name __getDistance
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Calculates the distance between two (x, y) coordinate points.
         * 
         * @param {number} x1 The x-coordinate of the first point.
         * @param {number} x2 The x-coordinate of the second point.
         * @param {number} y1 The y-coordinate of the first point.
         * @param {number} y2 The y-coordinate of the second point.
         * 
         * @returns {number} The distance between the points.
         */
        private __getDistance(x1: number, x2: number, y1: number, y2: number): number {
            var x = x2 - x1,
                y = y2 - y1;
            return Math.sqrt((x * x) + (y * y));
        }

        /**
         * @name __getVelocity
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Calculates the velocity between two (x, y) coordinate points over a given time.
         * 
         * @param {number} dx The change in x position.
         * @param {number} dy The change in y position.
         * @param {number} dt The change in time.
         * 
         * @returns {plat.ui.IVelocity} A velocity object containing horiztonal and vertical velocities.
         */
        private __getVelocity(dx: number, dy: number, dt: number): IVelocity {
            return {
                x: Math.abs(dx / dt) || 0,
                y: Math.abs(dy / dt) || 0
            };
        }

        /**
         * @name __getDirection
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Calculates the direction of movement.
         * 
         * @param {number} dx The change in x position.
         * @param {number} dy The change in y position.
         * 
         * @returns {plat.ui.IDirection} An object containing the 
         * horiztonal and vertical directions of movement.
         */
        private __getDirection(dx: number, dy: number): IDirection {
            var distanceX = Math.abs(dx),
                distanceY = Math.abs(dy),
                lastDirection = (this.__lastMoveEvent || <IPointerEvent>{}).direction || <IDirection>{},
                horizontal = dx === 0 ? (lastDirection.x || 'none') : (dx < 0 ? 'left' : 'right'),
                vertical = dy === 0 ? (lastDirection.y || 'none') : (dy < 0 ? 'up' : 'down');

            return {
                x: horizontal,
                y: vertical,
                primary: (distanceX === distanceY ? (lastDirection.primary || 'none') : (distanceX > distanceY ? horizontal : vertical))
            };
        }

        /**
         * @name __checkForOriginChanged
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Checks to see if a swipe direction has changed to recalculate 
         * an origin point.
         * 
         * @param {plat.ui.IDirection} direction The current vertical and horiztonal directions of movement.
         * 
         * @returns {boolean} Whether or not the origin has changed.
         */
        private __checkForOriginChanged(direction: IDirection): boolean {
            var lastMove = this.__lastMoveEvent;
            if (isNull(lastMove)) {
                this.__hasSwiped = false;
                return true;
            }

            var swipeDirection = lastMove.direction;
            if (swipeDirection.x === direction.x && swipeDirection.y === direction.y) {
                return false;
            }

            this.__swipeOrigin = {
                clientX: lastMove.clientX,
                clientY: lastMove.clientY,
                timeStamp: lastMove.timeStamp,
                target: lastMove.target,
                identifier: lastMove.identifier
            };

            this.__hasSwiped = false;
            return true;
        }

        /**
         * @name __checkForRegisteredSwipe
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Checks to see if a swipe event has been registered.
         * 
         * @param {plat.ui.IDirection} direction The current horizontal and vertical directions of movement.
         * @param {plat.ui.IVelocity} velocity The current horizontal and vertical velocities.
         * 
         * @returns {void}
         */
        private __setRegisteredSwipes(direction: IDirection, velocity: IVelocity): void {
            var swipeTarget = <ICustomElement>(this.__swipeOrigin || <IBaseEventProperties>{}).target,
                swipeGesture = this._gestures.$swipe,
                minSwipeVelocity = DomEvents.config.velocities.minSwipeVelocity,
                events = [swipeGesture];

            if (velocity.x >= minSwipeVelocity) {
                this.__hasSwiped = true;
                events.push(swipeGesture + direction.x);
            }

            if (velocity.y >= minSwipeVelocity) {
                this.__hasSwiped = true;
                events.push(swipeGesture + direction.y);
            }

            this.__swipeSubscribers = this.__findFirstSubscribers(swipeTarget, events);
        }

        /**
         * @name __isHorizontal
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Checks to see if a swipe event has been registered.
         * 
         * @param {string} direction The current direction of movement.
         * 
         * @returns {boolean} Whether or not the current movement is horizontal.
         */
        private __isHorizontal(direction: string): boolean {
            return direction === 'left' || direction === 'right';
        }

        /**
         * @name __appendGestureStyle
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Appends CSS to the head for gestures if needed.
         * 
         * @returns {void}
         */
        private __appendGestureStyle(): void {
            var _document = this._document,
                styleClasses: Array<IDefaultStyle>,
                classLength: number;

            if (this._compat.platCss) {
                return;
            } else if (!isNull(_document.styleSheets) && _document.styleSheets.length > 0) {
                var styleSheet = <CSSStyleSheet>_document.styleSheets[0];
                styleClasses = DomEvents.config.styleConfig;
                classLength = styleClasses.length;
                while (classLength-- > 0) {
                    styleSheet.insertRule(this.__createStyle(styleClasses[classLength]), 0);
                }
                return;
            }

            var head = _document.head,
                style = <HTMLStyleElement>_document.createElement('style'),
                textContent = '';

            style.type = 'text/css';
            styleClasses = DomEvents.config.styleConfig;
            classLength = styleClasses.length;
            while (classLength-- > 0) {
                textContent = this.__createStyle(styleClasses[classLength]) + textContent;
            }
            style.textContent = textContent;
            head.appendChild(style);
        }

        /**
         * @name __createStyle
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Creates a style text to append to the document head.
         * 
         * @param {plat.ui.IDefaultStyle} styleClass The object containing the custom styles for 
         * gestures.
         * 
         * @returns {string} The style text.
         */
        private __createStyle(styleClass: IDefaultStyle): string {
            var styles: Array<string> = styleClass.styles || [],
                styleLength = styles.length,
                style = '.' + styleClass.className + ' { ',
                textContent = '';

            styleLength = styles.length;

            for (var j = 0; j < styleLength; ++j) {
                textContent += styles[j] + ';';
            }

            style += textContent + ' } ';

            return style;
        }

        /**
         * @name __isFocused
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Determines whether the target is the currently focused element.
         * 
         * @param {EventTarget} target The event target.
         * 
         * @returns {boolean} Whether or not the target is focused.
         */
        private __isFocused(target: EventTarget): boolean {
            return target === this.__focusedElement;
        }

        /**
         * @name __handleInput
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Handles HTMLInputElements in WebKit based touch applications.
         * 
         * @param {HTMLInputElement} target The event target.
         * 
         * @returns {void}
         */
        private __handleInput(target: HTMLInputElement): void {
            var nodeName = target.nodeName,
                focusedElement = this.__focusedElement || <HTMLInputElement>{};

            if (!isString(nodeName)) {
                this.__focusedElement = null;
                if (isFunction(focusedElement.blur)) {
                    focusedElement.blur();
                }
                return;
            }

            var remover: IRemoveListener;
            switch (nodeName.toLowerCase()) {
                case 'input':
                    switch (target.type) {
                        case 'range':
                            if (isFunction(focusedElement.blur)) {
                                focusedElement.blur();
                            }
                            break;
                        case 'button':
                        case 'submit':
                        case 'checkbox':
                        case 'radio':
                        case 'file':
                            if (isFunction(focusedElement.blur)) {
                                focusedElement.blur();
                            }
                            postpone((): void => {
                                if (this._document.body.contains(target)) {
                                    target.click();
                                }
                            });
                            break;
                        default:
                            this.__focusedElement = target;
                            target.focus();
                            remover = this.addEventListener(target, 'blur', (): void => {
                                if (this.__isFocused(target)) {
                                    this.__focusedElement = null;
                                }
                                remover();
                            }, false);
                            return;
                    }
                    break;
                case 'a':
                case 'button':
                case 'label':
                    if (isFunction(focusedElement.blur)) {
                        focusedElement.blur();
                    }
                    postpone((): void => {
                        if (this._document.body.contains(target)) {
                            target.click();
                        }
                    });
                    break;
                case 'textarea':
                    this.__focusedElement = target;
                    target.focus();
                    remover = this.addEventListener(target, 'blur', (): void => {
                        if (this.__isFocused(target)) {
                            this.__focusedElement = null;
                        }
                        remover();
                    }, false);
                    return;
                case 'select':
                    if (isFunction(focusedElement.blur)) {
                        focusedElement.blur();
                    }
                    postpone((): void => {
                        var _document = this._document;
                        if (_document.body.contains(target)) {
                            var event = <MouseEvent>_document.createEvent('MouseEvents');
                            event.initMouseEvent('mousedown', false, false, null, null, null,
                                null, null, null, null, null, null, null, null, null);
                            target.dispatchEvent(event);
                        }
                    });
                    break;
                default:
                    if (isFunction(focusedElement.blur)) {
                        focusedElement.blur();
                    }
                    postpone((): void => {
                        if (this._document.body.contains(target) && isFunction(target.click)) {
                            target.click();
                        }
                    });
                    break;
            }

            this.__focusedElement = null;
        }

        /**
         * @name __preventClickFromTouch
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Handles the phantom click in WebKit based touch applications.
         * 
         * @returns {void}
         */
        private __preventClickFromTouch(): void {
            var _document = this._document,
                preventDefault: (ev: Event) => boolean,
                delayedClickRemover = defer((): void => {
                    _document.removeEventListener('click', preventDefault, true);
                    _document.removeEventListener('mousedown', preventDefault, true);
                    _document.removeEventListener('mouseup', preventDefault, true);
                }, 400);

            preventDefault = (ev: Event): boolean => {
                ev.preventDefault();
                ev.stopPropagation();
                _document.removeEventListener(ev.type, preventDefault, true);
                if (delayedClickRemover === noop) {
                    return false;
                }
                delayedClickRemover();
                delayedClickRemover = noop;

                var touchDown = this.__lastTouchDown;
                if (isNull(touchDown) || this.__isFocused(touchDown.target)) {
                    return false;
                }
                this.__handleInput(<HTMLInputElement>touchDown.target);
                return false;
            };

            postpone((): void => {
                _document.addEventListener('click', preventDefault, true);
                _document.addEventListener('mousedown', preventDefault, true);
                _document.addEventListener('mouseup', preventDefault, true);
            });
        }

        /**
         * @name __removeSelections
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Removes selection capability from the element.
         * 
         * @param {Node} element The element to remove selections on.
         * 
         * @returns {void}
         */
        private __removeSelections(element: Node): void {
            if (!isNode(element)) {
                return;
            }

            if (!isUndefined((<any>element).onselectstart)) {
                element.addEventListener('selectstart', this.__preventDefault, false);
            }
            if (!isUndefined((<any>element).ondragstart)) {
                element.addEventListener('dragstart', this.__preventDefault, false);
            }
        }

        /**
         * @name __returnSelections
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Returns selection capability from the element.
         * 
         * @param {Node} element The element to return selections on.
         * 
         * @returns {void}
         */
        private __returnSelections(element: Node): void {
            if (!isNode(element)) {
                return;
            }

            if (!isUndefined((<any>element).onselectstart)) {
                element.removeEventListener('selectstart', this.__preventDefault, false);
            }
            if (!isUndefined((<any>element).ondragstart)) {
                element.removeEventListener('dragstart', this.__preventDefault, false);
            }
        }

        /**
         * @name __preventDefault
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         * 
         * @description
         * Prevents default and stops propagation in all elements other than 
         * inputs and textareas.
         * 
         * @param {Event} ev The event object.
         * 
         * @returns {boolean} Prevents default and stops propagation if false.
         */
        private __preventDefault(ev: Event): boolean {
            var nodeName = (<Node>ev.target).nodeName;
            if (isString(nodeName)) {
                nodeName = nodeName.toLowerCase();
            }

            if (nodeName === 'input' || nodeName === 'textarea') {
                return true;
            }

            ev.preventDefault();
            return false;
        }
    }
    register.injectable(__DomEvents, DomEvents);

    /**
     * The Type for referencing the '_domEventsConfig' injectable as a dependency.
     */
    export function IDomEventsConfig(): IDomEventsConfig {
        return DomEvents.config;
    }

    register.injectable(__IDomEventsConfig, IDomEventsConfig);

    /**
     * @name DomEvent
     * @memberof plat.ui
     * @kind class
     * 
     * @description
     * A class for managing a single custom event.
     */
    export class DomEvent {
        /**
         * @name _document
         * @memberof plat.ui.DomEvent
         * @kind property
         * @access public
         * 
         * @type {Document}
         * 
         * @description
         * Reference to the Document injectable.
         */
        protected _document: Document = acquire(__Document);

        /**
         * @name element
         * @memberof plat.ui.DomEvent
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * The node or window object associated with this {@link plat.ui.DomEvent|DomEvent} object.
         */
        element: any;

        /**
         * @name event
         * @memberof plat.ui.DomEvent
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The event type associated with this {@link plat.ui.DomEvent|DomEvent} object.
         */
        event: string;

        /**
         * @name eventType
         * @memberof plat.ui.DomEvent
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The event type to dispatch. Defaults to 'CustomEvent'.
         */
        eventType: string;

        /**
         * @name initialize
         * @memberof plat.ui.DomEvent
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Initializes the element and event of this {@link plat.ui.DomEvent|DomEvent} object.
         * 
         * @param {Node} element The element associated with this {@link plat.ui.DomEvent|DomEvent} object.
         * @param {string} event The event associated with this {@link plat.ui.DomEvent|DomEvent} object.
         * @param {string} eventType? The event type associated with this {@link plat.ui.DomEvent|DomEvent} object. 
         * If not specified, it will default to 'CustomEvent'.
         * 
         * @returns {void}
         */
        initialize(element: Node, event: string, eventType?: string): void;
        /**
         * @name initialize
         * @memberof plat.ui.DomEvent
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Initializes the element and event of this {@link plat.ui.DomEvent|DomEvent} object.
         * 
         * @param {Window} element The window object.
         * @param {string} event The event associated with this {@link plat.ui.DomEvent|DomEvent} object.
         * @param {string} eventType? The event type associated with this {@link plat.ui.DomEvent|DomEvent} object. 
         * If not specified, it will default to 'CustomEvent'.
         * 
         * @returns {void}
         */
        initialize(element: Window, event: string, eventType?: string): void;
        initialize(element: any, event: string, eventType?: string): void {
            this.element = element;
            this.event = event;
            this.eventType = isString(eventType) ? eventType : 'CustomEvent';
        }

        /**
         * @name trigger
         * @memberof plat.ui.DomEvent
         * @kind function
         * @access public
         * 
         * @description
         * Triggers its event on its element.
         * 
         * @param {Object} eventExtension? An event extension to extend the dispatched CustomEvent.
         * @param {any} detailArg? The detail arg to include in the event object
         * @param {Node} dispatchElement? The element to dispatch the Event from. If not specified, 
         * this instance's element will be used.
         * 
         * @returns {boolean} Whether or not the Event was cancelled in at least one Event handler.
         */
        trigger(eventExtension?: Object, detailArg?: any, dispatchElement?: Node): boolean {
            var customEv = <CustomEvent>this._document.createEvent(this.eventType);
            if (isObject(eventExtension)) {
                extend(customEv, eventExtension);
            }
            customEv.initCustomEvent(this.event, true, true, isNull(detailArg) ? 0 : detailArg);
            return <boolean>(dispatchElement || this.element).dispatchEvent(customEv);
        }
    }

    register.injectable(__DomEventInstance, DomEvent, null, __INSTANCE);

    /**
     * @name CustomDomEvent
     * @memberof plat.ui
     * @kind class
     * @exported false
     * 
     * @extends {plat.ui.DomEvent}
     * 
     * @description
     * A specialized class for managing a single custom touch event in {@link plat.ui.DomEvents|DomEvents}.
     */
    class CustomDomEvent extends DomEvent {
        /**
         * @name count
         * @memberof plat.ui.CustomDomEvent
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The number of listeners added for this event on this element.
         */
        count = 0;

        /**
         * @name constructor
         * @memberof plat.ui.CustomDomEvent
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * The constructor for a {@link plat.ui.CustomDomEvent|CustomDomEvent}. Assigns the 
         * associated element and event.
         * 
         * @param {Node} element The associated element.
         * @param {string} event The associated event.
         * 
         * @returns {plat.ui.CustomDomEvent}
         */
        constructor(element: Node, event: string);
        /**
         * @name constructor
         * @memberof plat.ui.CustomDomEvent
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * The constructor for a {@link plat.ui.CustomDomEvent|CustomDomEvent}. Assigns the 
         * associated element and event.
         * 
         * @param {Window} element The window object.
         * @param {string} event The associated event.
         * 
         * @returns {plat.ui.CustomDomEvent} A {@link plat.ui.CustomDomEvent|CustomDomEvent} instance.
         */
        constructor(element: Window, event: string);
        constructor(element: any, event: string) {
            super();
            this.element = element;
            this.event = event;
            this.count++;
        }

        /**
         * @name trigger
         * @memberof plat.ui.CustomDomEvent
         * @kind function
         * @access public
         * 
         * @description
         * Triggers its event on its element.
         * 
         * @param {plat.ui.IPointerEvent} ev The current touch event object used to extend the 
         * newly created custom event.
         * 
         * @returns {boolean} Whether or not the Event was cancelled in at least one Event handler.
         */
        trigger(ev: IPointerEvent): boolean {
            var customEv = <CustomEvent>this._document.createEvent('CustomEvent'),
                element = this.element,
                target = ev.target;

            this.__extendEventObject(customEv, ev);
            customEv.initCustomEvent(this.event, true, true, 0);

            var success = element.contains(target) ? target.dispatchEvent(customEv) : element.dispatchEvent(customEv);
            if (!success) {
                ev.preventDefault();
            }

            return success;
        }

        /**
         * @name __extendEventObject
         * @memberof plat.ui.CustomDomEvent
         * @kind function
         * @access private
         * 
         * @description
         * Extends the custom event to mimic a standardized touch event.
         * 
         * @param {plat.ui.IGestureEvent} customEv The newly created custom event object.
         * @param {plat.ui.IPointerEvent} ev The current touch event object.
         * 
         * @returns {void}
         */
        private __extendEventObject(customEv: IGestureEvent, ev: IPointerEvent): void {
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
        }

        /**
         * @name __convertPointerType
         * @memberof plat.ui.DomEvent
         * @kind function
         * @access private
         * 
         * @description
         * Converts pointer type to a standardized string.
         * 
         * @param {any} pointerType The pointer type as either a number or a string.
         * @param {string} eventType The touch event type.
         * 
         * @returns {string} The standardized pointer type.
         */
        private __convertPointerType(pointerType: any, eventType: string): string {
            switch (<any>pointerType) {
                case MSPointerEvent.MSPOINTER_TYPE_MOUSE:
                    return 'mouse';
                case MSPointerEvent.MSPOINTER_TYPE_PEN:
                    return 'pen';
                case MSPointerEvent.MSPOINTER_TYPE_TOUCH:
                    return 'touch';
            }

            return (eventType.indexOf('mouse') === -1) ? 'touch' : 'mouse';
        }
    }

    /**
     * @name ICustomEventListener
     * @memberof plat.ui
     * @kind interface
     * @exported false
     * 
     * @extends {plat.IObject<EventListener>}
     * 
     * @description
     * Describes the touch event listeners for the document.
     */
    interface ICustomEventListener extends IObject<EventListener> {
        /**
         * @name start
         * @memberof plat.ui.ICustomEventListener
         * @kind property
         * @access public
         * 
         * @type {EventListener}
         * 
         * @description
         * The touch start event.
         */
        start: EventListener;

        /**
         * @name end
         * @memberof plat.ui.ICustomEventListener
         * @kind property
         * @access public
         * 
         * @type {EventListener}
         * 
         * @description
         * The touch end event.
         */
        end: EventListener;

        /**
         * @name move
         * @memberof plat.ui.ICustomEventListener
         * @kind property
         * @access public
         * 
         * @type {EventListener}
         * 
         * @description
         * The touch move event.
         */
        move: EventListener;
    }

    /**
     * @name IBaseEventProperties
     * @memberof plat.ui
     * @kind interface
     * 
     * @description
     * An extended event object containing coordinate, time, and target info.
     */
    export interface IBaseEventProperties {
        /**
         * @name buttons
         * @memberof plat.ui.IBaseEventProperties
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * Indicates which mouse button is being pressed in a mouse event.
         */
        _buttons?: number;

        /**
         * @name clientX
         * @memberof plat.ui.IBaseEventProperties
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The x-coordinate of the event on the screen relative to the upper left corner of the 
         * browser window. This value cannot be affected by scrolling.
         */
        clientX?: number;

        /**
         * @name clientY
         * @memberof plat.ui.IBaseEventProperties
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The y-coordinate of the event on the screen relative to the upper left corner of the 
         * browser window. This value cannot be affected by scrolling.
         */
        clientY?: number;

        /**
         * @name identifier
         * @memberof plat.ui.IBaseEventProperties
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * A unique touch identifier.
         */
        identifier?: number;

        /**
         * @name timeStamp
         * @memberof plat.ui.IBaseEventProperties
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * A timestamp.
         */
        timeStamp?: number;

        /**
         * @name target
         * @memberof plat.ui.IBaseEventProperties
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The target of an Event object.
         */
        target?: EventTarget;
    }

    /**
     * @name IExtendedEvent
     * @memberof plat.ui
     * @kind interface
     * 
     * @extends {Event}
     * 
     * @description
     * An extended event object potentially containing coordinate and movement information.
     */
    export interface IExtendedEvent extends Event {
        _buttons?: number;

        /**
         * @name buttons
         * @memberof plat.ui.IExtendedEvent
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * Indicates which mouse button is being pressed in a mouse event.
         */
        buttons?: number;

        /**
         * @name clientX
         * @memberof plat.ui.IExtendedEvent
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The x-coordinate of the event on the screen relative to the upper left corner of the 
         * browser window. This value cannot be affected by scrolling.
         */
        clientX?: number;

        /**
         * @name clientY
         * @memberof plat.ui.IExtendedEvent
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The y-coordinate of the event on the screen relative to the upper left corner of the 
         * browser window. This value cannot be affected by scrolling.
         */
        clientY?: number;

        /**
         * @name screenX
         * @memberof plat.ui.IExtendedEvent
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The x-coordinate of the event on the screen relative to the upper left corner of the 
         * physical screen or monitor.
         */
        screenX?: number;

        /**
         * @name screenY
         * @memberof plat.ui.IExtendedEvent
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The y-coordinate of the event on the screen relative to the upper left corner of the 
         * physical screen or monitor.
         */
        screenY?: number;

        /**
         * @name pageX
         * @memberof plat.ui.IExtendedEvent
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The x-coordinate of the event on the screen relative to the upper left corner of the 
         * fully rendered content area in the browser window. This value can be altered and/or affected by 
         * embedded scrollable pages when the scroll bar is moved.
         */
        pageX?: number;

        /**
         * @name pageY
         * @memberof plat.ui.IExtendedEvent
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The y-coordinate of the event on the screen relative to the upper left corner of the 
         * fully rendered content area in the browser window. This value can be altered and/or affected by 
         * embedded scrollable pages when the scroll bar is moved.
         */
        pageY?: number;

        /**
         * @name offsetX
         * @memberof plat.ui.IExtendedEvent
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The x-coordinate of the event relative to the top-left corner of the 
         * offsetParent element that fires the event.
         */
        offsetX?: number;

        /**
         * @name offsetY
         * @memberof plat.ui.IExtendedEvent
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The y-coordinate of the event relative to the top-left corner of the 
         * offsetParent element that fires the event.
         */
        offsetY?: number;

        /**
         * @name offset
         * @memberof plat.ui.IExtendedEvent
         * @kind property
         * @access public
         * 
         * @type {plat.ui.IPoint}
         * 
         * @description
         * The x and y-coordinates of the event as an object relative to the top-left corner of the 
         * offsetParent element that fires the event.
         */
        offset: IPoint;

        /**
         * @name direction
         * @memberof plat.ui.IExtendedEvent
         * @kind property
         * @access public
         * 
         * @type {plat.ui.IDirection}
         * 
         * @description
         * The horizontal and vertical directions associated with this event.
         */
        direction?: IDirection;

        /**
         * @name velocity
         * @memberof plat.ui.IExtendedEvent
         * @kind property
         * @access public
         * 
         * @type {plat.ui.IVelocity}
         * 
         * @description
         * The potential velocity associated with the event.
         */
        velocity?: IVelocity;

        /**
         * @name touches
         * @memberof plat.ui.IExtendedEvent
         * @kind property
         * @access public
         * 
         * @type {Array<plat.ui.IExtendedEvent>}
         * 
         * @description
         * An array containing all current touch points. The IExtendedEvents 
         * may slightly differ depending on the browser implementation.
         */
        touches?: Array<IExtendedEvent>;

        /**
         * @name changedTouches
         * @memberof plat.ui.IExtendedEvent
         * @kind property
         * @access public
         * 
         * @type {Array<plat.ui.IExtendedEvent>}
         * 
         * @description
         * An array containing all recently changed touch points. This should not be present on 
         * the triggered custom event.
         */
        changedTouches?: Array<IExtendedEvent>;

        /**
         * @name identifier
         * @memberof plat.ui.IExtendedEvent
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * A unique touch identifier.
         */
        identifier?: number;
    }

    /**
     * @name IPointerEvent
     * @memberof plat.ui
     * @kind interface
     * 
     * @extends {plat.ui.IExtendedEvent}
     * 
     * @description
     * An extended event object potentially containing coordinate and movement information as 
     * well as pointer type for pointer events.
     */
    export interface IPointerEvent extends IExtendedEvent {
        /**
         * @name pointerType
         * @memberof plat.ui.IPointerEvent
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The type of interaction associated with the touch event ('touch', 'pen', 'mouse', '').
         */
        pointerType?: string;

        /**
         * @name pointerId
         * @memberof plat.ui.IPointerEvent
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * A unique touch identifier.
         */
        pointerId?: number;
    }

    /**
     * @name IGestureEvent
     * @memberof plat.ui
     * @kind interface
     * 
     * @extends {CustomEvent}
     * 
     * @description
     * The type of event object passed into the listeners for our custom events.
     */
    export interface IGestureEvent extends CustomEvent {
        /**
         * @name buttons
         * @memberof plat.ui.IGestureEvent
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * Indicates which mouse button is being pressed in a mouse event.
         */
        buttons?: number;

        /**
         * @name clientX
         * @memberof plat.ui.IGestureEvent
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The x-coordinate of the event on the screen relative to the upper left corner of the 
         * browser window. This value cannot be affected by scrolling.
         */
        clientX?: number;

        /**
         * @name clientY
         * @memberof plat.ui.IGestureEvent
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The y-coordinate of the event on the screen relative to the upper left corner of the 
         * browser window. This value cannot be affected by scrolling.
         */
        clientY?: number;

        /**
         * @name screenX
         * @memberof plat.ui.IGestureEvent
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The x-coordinate of the event on the screen relative to the upper left corner of the 
         * physical screen or monitor.
         */
        screenX?: number;

        /**
         * @name screenY
         * @memberof plat.ui.IGestureEvent
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The y-coordinate of the event on the screen relative to the upper left corner of the 
         * physical screen or monitor.
         */
        screenY?: number;

        /**
         * @name pageX
         * @memberof plat.ui.IGestureEvent
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The x-coordinate of the event on the screen relative to the upper left corner of the 
         * fully rendered content area in the browser window. This value can be altered and/or affected by 
         * embedded scrollable pages when the scroll bar is moved.
         */
        pageX?: number;

        /**
         * @name pageY
         * @memberof plat.ui.IGestureEvent
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The y-coordinate of the event on the screen relative to the upper left corner of the 
         * fully rendered content area in the browser window. This value can be altered and/or affected by 
         * embedded scrollable pages when the scroll bar is moved.
         */
        pageY?: number;

        /**
         * @name offsetX
         * @memberof plat.ui.IGestureEvent
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The x-coordinate of the event relative to the top-left corner of the 
         * offsetParent element that fires the event.
         */
        offsetX?: number;

        /**
         * @name offsetY
         * @memberof plat.ui.IGestureEvent
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The y-coordinate of the event relative to the top-left corner of the 
         * offsetParent element that fires the event.
         */
        offsetY?: number;

        /**
         * @name direction
         * @memberof plat.ui.IGestureEvent
         * @kind property
         * @access public
         * 
         * @type {plat.ui.IDirection}
         * 
         * @description
         * The horizontal and vertical directions associated with this event.
         */
        direction?: IDirection;

        /**
         * @name velocity
         * @memberof plat.ui.IGestureEvent
         * @kind property
         * @access public
         * 
         * @type {plat.ui.IVelocity}
         * 
         * @description
         * The potential velocity associated with the event.
         */
        velocity?: IVelocity;

        /**
         * @name touches
         * @memberof plat.ui.IGestureEvent
         * @kind property
         * @access public
         * 
         * @type {Array<plat.ui.IExtendedEvent>}
         * 
         * @description
         * An array containing all current touch points. The IExtendedEvents 
         * may slightly differ depending on the browser implementation.
         */
        touches?: Array<IExtendedEvent>;

        /**
         * @name pointerType
         * @memberof plat.ui.IGestureEvent
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The type of interaction associated with the touch event ('touch', 'pen', 'mouse', '').
         */
        pointerType?: string;

        /**
         * @name identifier
         * @memberof plat.ui.IGestureEvent
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * A unique touch identifier.
         */
        identifier?: number;
    }

    /**
     * @name IGestureListener
     * @memberof plat.ui
     * @kind interface
     * 
     * @description
     * The listener interface for our custom DOM events.
     */
    export interface IGestureListener {
        /**
         * @name listen
         * @memberof plat.ui.IGestureListener
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * The method signature for a {@link plat.ui.IGestureListener|IGestureListener}. 
         * An EventListener with the argument as an {@link plat.ui.IGestureEvent|IGestureEvent}.
         * 
         * @param {plat.ui.IGestureEvent} ev The gesture event object.
         * 
         * @returns {void}
         */
        (ev?: IGestureEvent): void;
    }

    /**
     * @name IBaseGestures
     * @memberof plat.ui
     * @kind interface
     * 
     * @description
     * Describes an object containing information 
     * regarding our base custom events.
     * 
     * @typeparam {any} T The type of objects/primitives contained in this object.
     */
    export interface IBaseGestures<T> {
        /**
         * @name $tap
         * @memberof plat.ui.IBaseGestures
         * @kind property
         * @access public
         * 
         * @type {T}
         * 
         * @description
         * The string type|number of events associated with the tap event.
         */
        $tap?: T;

        /**
         * @name $dbltap
         * @memberof plat.ui.IBaseGestures
         * @kind property
         * @access public
         * 
         * @type {T}
         * 
         * @description
         * The string type|number of events associated with the dbltap event.
         */
        $dbltap?: T;

        /**
         * @name $hold
         * @memberof plat.ui.IBaseGestures
         * @kind property
         * @access public
         * 
         * @type {T}
         * 
         * @description
         * The string type|number of events associated with the hold event.
         */
        $hold?: T;

        /**
         * @name $release
         * @memberof plat.ui.IBaseGestures
         * @kind property
         * @access public
         * 
         * @type {T}
         * 
         * @description
         * The string type|number of events associated with the release event.
         */
        $release?: T;

        /**
         * @name $swipe
         * @memberof plat.ui.IBaseGestures
         * @kind property
         * @access public
         * 
         * @type {T}
         * 
         * @description
         * The string type|number of events associated with the swipe event.
         */
        $swipe?: T;

        /**
         * @name $track
         * @memberof plat.ui.IBaseGestures
         * @kind property
         * @access public
         * 
         * @type {T}
         * 
         * @description
         * The string type|number of events associated with the track event.
         */
        $track?: T;

        /**
         * @name $trackend
         * @memberof plat.ui.IBaseGestures
         * @kind property
         * @access public
         * 
         * @type {T}
         * 
         * @description
         * The string type|number of events associated with the trackend event.
         */
        $trackend?: T;
    }

    /**
     * @name IGestures
     * @memberof plat.ui
     * @kind interface
     * 
     * @description
     * Describes an object containing information 
     * regarding all our custom events.
     * 
     * @typeparam {any} T The type of objects/primitives contained in this object.
     */
    export interface IGestures<T> extends IBaseGestures<T> {
        /**
         * @name $swipeleft
         * @memberof plat.ui.IGestures
         * @kind property
         * @access public
         * 
         * @type {T}
         * 
         * @description
         * The string type|number of events associated with the swipeleft event.
         */
        $swipeleft?: T;

        /**
         * @name $swiperight
         * @memberof plat.ui.IGestures
         * @kind property
         * @access public
         * 
         * @type {T}
         * 
         * @description
         * The string type|number of events associated with the swiperight event.
         */
        $swiperight?: T;

        /**
         * @name $swipeup
         * @memberof plat.ui.IGestures
         * @kind property
         * @access public
         * 
         * @type {T}
         * 
         * @description
         * The string type|number of events associated with the swipeup event.
         */
        $swipeup?: T;

        /**
         * @name $swipedown
         * @memberof plat.ui.IGestures
         * @kind property
         * @access public
         * 
         * @type {T}
         * 
         * @description
         * The string type|number of events associated with the swipedown event.
         */
        $swipedown?: T;

        /**
         * @name $trackleft
         * @memberof plat.ui.IGestures
         * @kind property
         * @access public
         * 
         * @type {T}
         * 
         * @description
         * The string type|number of events associated with the trackleft event.
         */
        $trackleft?: T;

        /**
         * @name $trackright
         * @memberof plat.ui.IGestures
         * @kind property
         * @access public
         * 
         * @type {T}
         * 
         * @description
         * The string type|number of events associated with the trackright event.
         */
        $trackright?: T;

        /**
         * @name $trackup
         * @memberof plat.ui.IGestures
         * @kind property
         * @access public
         * 
         * @type {T}
         * 
         * @description
         * The string type|number of events associated with the trackup event.
         */
        $trackup?: T;

        /**
         * @name $trackdown
         * @memberof plat.ui.IGestures
         * @kind property
         * @access public
         * 
         * @type {T}
         * 
         * @description
         * The string type|number of events associated with the trackdown event.
         */
        $trackdown?: T;
    }

    /**
     * @name IEventSubscriber
     * @memberof plat.ui
     * @kind interface
     * 
     * @extends {plat.ui.IGestures<plat.ui.DomEvent>}
     * 
     * @description
     * Describes an object to keep track of a single 
     * element's registered custom event types.
     */
    export interface IEventSubscriber extends IGestures<DomEvent> {
        /**
         * @name gestureCount
         * @memberof plat.ui.IEventSubscriber
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The total registered gesture count for the associated element.
         */
        gestureCount: number;
    }

    /**
     * @name IPoint
     * @memberof plat.ui
     * @kind interface
     * 
     * @description
     * Describes an object containing x and y coordinates.
     */
    export interface IPoint {
        /**
         * @name x
         * @memberof plat.ui.IPoint
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The x-coordinate.
         */
        x: number;

        /**
         * @name y
         * @memberof plat.ui.IPoint
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The y-coordinate.
         */
        y: number;
    }

    /**
     * @name IDirection
     * @memberof plat.ui
     * @kind interface
     * 
     * @description
     * Describes an object containing a direction in both the horizontal and vertical directions.
     */
    export interface IDirection {
        /**
         * @name x
         * @memberof plat.ui.IDirection
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The horizontal, x-direction
         * 
         * @remarks
         * Can be either "left" or "right".
         */
        x: string;

        /**
         * @name y
         * @memberof plat.ui.IDirection
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The vertical, y-direction.
         * 
         * @remarks
         * Can be either "up" or "down".
         */
        y: string;

        /**
         * @name primary
         * @memberof plat.ui.IDirection
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The direction whose vector magnitude is the greatest.
         * 
         * @remarks
         * Can be "left", "right", "up", "down".
         */
        primary: string;
    }

    /**
     * @name IVelocity
     * @memberof plat.ui
     * @kind interface
     * 
     * @description
     * Describes an object containing a speed in both the horizontal and vertical directions.
     */
    export interface IVelocity {
        /**
         * @name x
         * @memberof plat.ui.IVelocity
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The horizontal, x velocity.
         */
        x: number;

        /**
         * @name y
         * @memberof plat.ui.IVelocity
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The vertical, y velocity.
         */
        y: number;
    }

    /**
     * @name IIntervals
     * @memberof plat.ui
     * @kind interface
     * 
     * @description
     * Describes an object containing time interval information that 
     * governs the behavior of certain custom DOM events.
     */
    export interface IIntervals {
        /**
         * @name tapInterval
         * @memberof plat.ui.IIntervals
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The max time in milliseconds a user can hold down on the screen 
         * for a tap event to be fired. Defaults to 250 ms.
         */
        tapInterval: number;

        /**
         * @name dblTapInterval
         * @memberof plat.ui.IIntervals
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The max time in milliseconds a user can wait between consecutive 
         * taps for a dbltap event to be fired. Defaults to 300 ms.
         */
        dblTapInterval: number;

        /**
         * @name holdInterval
         * @memberof plat.ui.IIntervals
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The time in milliseconds a user must hold down on the screen 
         * before a hold event is fired or a release event can be fired. 
         * Defaults to 400 ms.
         */
        holdInterval: number;

        /**
         * @name dblTapZoomDelay
         * @memberof plat.ui.IIntervals
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The delay in milliseconds between the time a user taps to the time 
         * the tap event fires. Used in the case where a double-tap-to-zoom 
         * feature is required. Defaults to 0 ms.
         */
        dblTapZoomDelay: number;
    }

    /**
     * @name IDistances
     * @memberof plat.ui
     * @kind interface
     * 
     * @description
     * Describes an object containing distance information that 
     * governs the behavior of certain custom DOM events.
     */
    export interface IDistances {
        /**
         * @name minScrollDistance
         * @memberof plat.ui.IDistances
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The minimum distance a user must move after touch down to register 
         * it as a scroll instead of a tap. Defaults to 3.
         */
        minScrollDistance: number;

        /**
         * @name maxDblTapDistance
         * @memberof plat.ui.IDistances
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The maximum distance between consecutive taps a user is allowed to 
         * register a dbltap event. Defaults to 20.
         */
        maxDblTapDistance: number;
    }

    /**
     * @name IVelocities
     * @memberof plat.ui
     * @kind interface
     * 
     * @description
     * Describes an object containing velocity information that 
     * governs the behavior of certain custom DOM events.
     */
    export interface IVelocities {
        /**
         * @name minSwipeVelocity
         * @memberof plat.ui.IVelocities
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The minimum velocity a user must move after touch down to register 
         * a swipe event. Defaults to 0.8.
         */
        minSwipeVelocity: number;
    }

    /**
     * @name IDefaultStyle
     * @memberof plat.ui
     * @kind interface
     * 
     * @description
     * Describes an object used for creating a custom class for styling an element 
     * listening for a custom DOM event.
     */
    export interface IDefaultStyle {
        /**
         * @name className
         * @memberof plat.ui.IDefaultStyle
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The className that will be used to define the custom style.
         */
        className: string;

        /**
         * @name styles
         * @memberof plat.ui.IDefaultStyle
         * @kind property
         * @access public
         * 
         * @type {Array<string>}
         * 
         * @description
         * An array of string styles in the format:
         * CSS identifier : value
         * (e.g. 'width : 100px')
         */
        styles: Array<string>;
    }

    /**
     * @name IDomEventsConfig
     * @memberof plat.ui
     * @kind interface
     * 
     * @description
     * Describes a configuration object for all custom DOM events.
     */
    export interface IDomEventsConfig {
        /**
         * @name intervals
         * @memberof plat.ui.IDomEventsConfig
         * @kind property
         * @access public
         * 
         * @type {plat.ui.IIntervals}
         * 
         * @description
         * An object containing the different time intervals that govern the behavior of certain 
         * custom DOM events.
         */
        intervals: IIntervals;

        /**
         * @name distances
         * @memberof plat.ui.IDomEventsConfig
         * @kind property
         * @access public
         * 
         * @type {plat.ui.IDistances}
         * 
         * @description
         * An object containing the different minimum/maximum distances that govern the behavior of certain 
         * custom DOM events.
         */
        distances: IDistances;

        /**
         * @name velocities
         * @memberof plat.ui.IDomEventsConfig
         * @kind property
         * @access public
         * 
         * @type {plat.ui.IVelocities}
         * 
         * @description
         * An object containing the different minimum/maximum velocities that govern the behavior of certain 
         * custom DOM events.
         */
        velocities: IVelocities;

        /**
         * @name styleConfig
         * @memberof plat.ui.IDomEventsConfig
         * @kind property
         * @access public
         * 
         * @type {Array<plat.ui.IDefaultStyle>}
         * 
         * @description
         * The default CSS styles applied to elements listening for custom DOM events.
         */
        styleConfig: Array<IDefaultStyle>;
    }
}
