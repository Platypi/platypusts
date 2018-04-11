namespace plat.ui {
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
            _compat: __Compat,
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
        public static config: IDomEventsConfig = {
            /**
             * An object containing the different time intervals that govern the behavior of certain
             * custom DOM events.
             */
            intervals: <IIntervals>{
                /**
                 * The max time in milliseconds a user can hold down on the screen
                 * for a tap event to be fired.
                 */
                tapInterval: 300,
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
                dblTapZoomDelay: 0,
                /**
                 * The delay in milliseconds we preventDefault on click events after a successful touchend event.
                 */
                delayedClickInterval: 400,
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
                maxDblTapDistance: 10,
            },

            /**
             * An object containing the different minimum/maximum velocities that govern the behavior of certain
             * custom DOM events.
             */
            velocities: <IVelocities>{
                /**
                 * The minimum velocity in pixels/ms a user must move after touch down to register
                 * a swipe event, adjusted to account for rounding.
                 */
                minSwipeVelocity: 0.645,
            },

            /**
             * The default CSS styles applied to elements listening for custom DOM events. If using
             * platypus.css, you must overwrite the styles in platypus.css or create your own and
             * change the classNames in the config.
             */
            styleConfig: <IDefaultStyle[]>[
                {
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
                        'touch-action: manipulation',
                    ],
                },
                {
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
                    styles: ['-ms-touch-action: none', 'touch-action: none'],
                },
            ],
        };

        /**
         * @name gestures
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access public
         * @static
         *
         * @type {plat.ui.IGestures<string>}
         *
         * @description
         * An object containing the event types for all of the
         * supported gestures.
         */
        public static gestures: IGestures<string> = {
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
            $trackend: __trackend,
        };

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
        protected _gestures: IGestures<string> = DomEvents.gestures;

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
         * @name _androidVersion
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access protected
         * @static
         *
         * @type {number}
         *
         * @description
         * The version of android, or -1 if not on android.
         */
        protected _androidVersion: number = isUndefined(this._compat.ANDROID)
            ? -1
            : this._compat.ANDROID;

        /**
         * @name _onAndroid44
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access protected
         * @static
         *
         * @type {boolean}
         *
         * @description
         * Whether or not we're on Android 4.4.x or below.
         */
        protected _android44orBelow: boolean = this._androidVersion > -1 &&
            Math.floor(this._androidVersion / 10) <= 44;

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
        protected _inMouse: boolean = false;

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
         * @type {string}
         *
         * @description
         * The space delimited touch start events defined by this browser.
         */
        protected _startEvents: string;

        /**
         * @name _moveEvents
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access protected
         *
         * @type {string}
         *
         * @description
         * The space delimited touch move events defined by this browser.
         */
        protected _moveEvents: string;

        /**
         * @name _endEvents
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access protected
         *
         * @type {string}
         *
         * @description
         * The space delimited touch end events defined by this browser.
         */
        protected _endEvents: string;

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
            $trackend: 0,
        };

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
        private __hasMoved: boolean = false;
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
        private __hasRelease: boolean = false;
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
        private __detectingMove: boolean = false;
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
        private __tapCount: number = 0;
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
        private __touchCount: number = 0;
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
        private __cancelDeferredTap: IRemoveListener = noop;
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
        private __cancelDeferredHold: IRemoveListener = noop;
        /**
         * @name __cancelRegex
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         *
         * @type {RegExp}
         *
         * @description
         * A regular expression for determining a "cancel" event.
         */
        private __cancelRegex: RegExp = /cancel/i;
        /**
         * @name __pointerEndRegex
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         *
         * @type {RegExp}
         *
         * @description
         * A regular expression for determining a pointer end event.
         */
        private __pointerEndRegex: RegExp = /up|cancel/i;
        /**
         * @name __lastTouchDown
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         *
         * @type {plat.ui.ITouchStartEventProperties}
         *
         * @description
         * The user's last touch down.
         */
        private __lastTouchDown: ITouchStartEventProperties;
        /**
         * @name __swipeOrigin
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         *
         * @type {plat.ui.ISwipeOriginProperties}
         *
         * @description
         * The starting place of an initiated swipe gesture.
         */
        private __swipeOrigin: ISwipeOriginProperties;
        /**
         * @name __haveSwipeSubscribers
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         *
         * @type {boolean}
         *
         * @description
         * Whether or not there are any swipe subscribers for the current target during touch move events.
         */
        private __haveSwipeSubscribers: boolean = false;
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
         * @type {HTMLElement}
         *
         * @description
         * The currently focused or active element.
         */
        private __focusedElement: HTMLElement;
        /**
         * @name __blurRemover
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         *
         * @type {plat.IRemoveListener}
         *
         * @description
         * A function to stop listening for blur events on the currently focused element.
         */
        private __blurRemover: IRemoveListener = noop;
        /**
         * @name __delayedClickRemover
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         *
         * @type {{ mousedown: plat.IRemoveListener; mouseup: plat.IRemoveListener; click: plat.IRemoveListener; }}
         *
         * @description
         * A function to stop listening for the phantom click event removal.
         */
        private __delayedClickRemover: {
            [key: string]: IRemoveListener;
            mousedown: IRemoveListener;
            mouseup: IRemoveListener;
            click: IRemoveListener;
        };
        /**
         * @name __ignoreEvent
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         *
         * @type {{ mousedown: boolean; mouseup: boolean; }}
         *
         * @description
         * A set of flags signifying whether we should ignore native events or not.
         */
        private __ignoreEvent: {
            [key: string]: boolean;
            mousedown: boolean;
            mouseup: boolean;
        } = { mousedown: false, mouseup: false };
        /**
         * @name __boundPreventDefaultClick
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         *
         * @type {(ev: Event) => boolean}
         *
         * @description
         * A function with a bound context that prevents default and stops propagation for delayed or phantom clicks.
         */
        private __boundPreventDefaultClick = this.__preventDefaultClick.bind(
            this
        );
        /**
         * @name __reverseMap
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         *
         * @type {plat.IObject<string>}
         *
         * @description
         * A hash map for mapping custom events to standard events.
         */
        private __reverseMap: IObject<string> = {};
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
            $touchcancel: 0,
        };
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
        private __pointerEvents: IPointerEvent[] = [];
        /**
         * @name __listeners
         * @memberof plat.ui.DomEvents
         * @kind property
         * @access private
         *
         * @type {IObject<EventListener>}
         *
         * @description
         * A set of touch start, move, and end listeners to be place on the document.
         */
        private __listeners: IObject<EventListener> = {};

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
            this.initialize();
        }

        /**
         * @name addEventListener
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access public
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
        public addEventListener(
            element: Node | Window,
            type: string,
            listener: EventListener | IGestureListener,
            useCapture?: boolean
        ): IRemoveListener {
            const _compat = this._compat;
            const mappedGestures = _compat.mappedEvents;
            let mappedType = mappedGestures[type];
            const mappingExists = !isNull(mappedType);
            const mappedCount = this.__mappedCount;
            const gestures = this._gestures;
            let listenerRemoved = false;

            if (mappingExists) {
                this.__reverseMap[mappedType] = type;
                this.__registerElement(<ICustomElement>element, type);
                mappedCount[type] += 1;

                if (
                    _compat.hasTouchEvents &&
                    !this.__cancelRegex.test(mappedType)
                ) {
                    mappedType = mappedType
                        .replace('touch', 'mouse')
                        .replace('start', 'down')
                        .replace('end', 'up');
                    this.__reverseMap[mappedType] = type;
                }
            }

            element.addEventListener(type, listener, useCapture);

            if (
                !isUndefined((<any>element)[`on${type}`]) ||
                isUndefined((<any>gestures)[type]) ||
                mappingExists
            ) {
                return (): void => {
                    if (listenerRemoved) {
                        return;
                    } else if (mappingExists) {
                        if (mappedCount[type] > 0) {
                            mappedCount[type] -= 1;
                        }
                        this.__unregisterElement(<ICustomElement>element, type);
                    }

                    listenerRemoved = true;
                    element.removeEventListener(type, listener, useCapture);
                };
            }

            const swipeGesture = gestures.$swipe;
            const trackGesture = gestures.$track;
            let countType = type;

            if (type.indexOf(trackGesture) !== -1) {
                const trackend = gestures.$trackend;
                countType = type === trackend ? trackend : trackGesture;
            } else if (type.indexOf(swipeGesture) !== -1) {
                countType = swipeGesture;
            }

            (<any>this._gestureCount)[countType] += 1;
            this.__registerElement(<ICustomElement>element, type);

            return (): void => {
                if (listenerRemoved) {
                    return;
                }

                listenerRemoved = true;
                this.__removeEventListener(
                    <ICustomElement>element,
                    type,
                    listener,
                    useCapture
                );
            };
        }

        /**
         * @name dispose
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access public
         *
         * @description
         * If {@link plat.ui.DomEvents|DomEvents} is inactive, will initialize behavior and
         * begin listening for events.
         *
         * @returns {void}
         */
        public initialize() {
            const isActive = this._isActive;
            if (isActive === true) {
                // has already been initialized and was never disposed
                return;
            }

            this.__registerTypes();

            if (isNull(isActive)) {
                this.__appendGestureStyle();
            }

            this._isActive = true;
        }

        /**
         * @name dispose
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access public
         *
         * @description
         * Stops listening for touch events and resets the {@link plat.ui.DomEvents|DomEvents}
         * instance.
         *
         * @returns {void}
         */
        public dispose(): void {
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
                $trackend: 0,
            };
            this.__mappedCount = {
                $touchstart: 0,
                $touchmove: 0,
                $touchend: 0,
                $touchcancel: 0,
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
            const eventType = ev.type;
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
            } else if (this.__touchCount > 0) {
                this.__touchCount += 1;

                return true;
            }
            this.__touchCount += 1;

            if (eventType !== 'mousedown') {
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

            // set last move back to null and hasMoved to false
            this.__lastMoveEvent = null;
            this.__hasMoved = false;

            const clientX = ev.clientX;
            const clientY = ev.clientY;
            const timeStamp = ev.timeStamp;
            const target = ev.target;
            const gestures = this._gestures;

            this.__lastTouchDown = {
                _buttons: ev._buttons,
                clientX: clientX,
                clientY: clientY,
                timeStamp: timeStamp,
                target: target,
                identifier: ev.identifier,
            };

            this.__swipeOrigin = {
                clientX: clientX,
                clientY: clientY,
                xTimestamp: timeStamp,
                yTimestamp: timeStamp,
                xTarget: target,
                yTarget: target,
            };

            if (this._android44orBelow) {
                this.__haveSwipeSubscribers =
                    this.__findFirstSubscribers(
                        <ICustomElement>target,
                        [
                            gestures.$swipe,
                            gestures.$swipedown,
                            gestures.$swipeleft,
                            gestures.$swiperight,
                            gestures.$swipeup,
                        ]
                    ).length > 0;
            }

            const gestureCount = this._gestureCount;
            const noHolds = gestureCount.$hold <= 0;
            const noRelease = gestureCount.$release <= 0;

            // return if no hold or release events are registered
            if (noHolds && noRelease) {
                this.__handleMappedEvents(eventType, ev, ev);
                this.__registerMove(eventType);

                return true;
            }

            const holdInterval = DomEvents.config.intervals.holdInterval;
            let domEvent: DomEvent;
            let subscribeFn: () => void;
            let domEventFound: boolean;

            if (noHolds) {
                this.__hasRelease = false;
                this.__cancelDeferredHold = defer((): void => {
                    this.__hasRelease = true;
                }, holdInterval);

                this.__handleMappedEvents(eventType, ev, ev);
                this.__registerMove(eventType);

                return true;
            } else if (noRelease) {
                domEvent = this.__findFirstSubscriber(
                    <ICustomElement>ev.target,
                    this._gestures.$hold
                );
                domEventFound = !isNull(domEvent);
                if (domEventFound) {
                    subscribeFn = (): void => {
                        domEvent.trigger(ev);
                        this.__cancelDeferredHold = noop;
                    };
                }
            } else {
                this.__hasRelease = false;
                // has both hold and release events registered
                domEvent = this.__findFirstSubscriber(
                    <ICustomElement>ev.target,
                    this._gestures.$hold
                );
                domEventFound = !isNull(domEvent);
                if (domEventFound) {
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

            this.__handleMappedEvents(eventType, ev, ev);
            this.__registerMove(eventType);
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

            const eventType = ev.type;
            // return immediately if there are multiple touches present, or
            // if it is a mouse event and currently in a touch
            if (this._inTouch === true && eventType === 'mousemove') {
                return true;
            }

            const evt = this.__standardizeEventObject(ev);
            if (isNull(evt)) {
                return true;
            }

            const gestureCount = this._gestureCount;
            const noTracking = gestureCount.$track <= 0;
            const noSwiping = gestureCount.$swipe <= 0;
            const config = DomEvents.config;
            const swipeOrigin = this.__swipeOrigin;
            const x = evt.clientX;
            const y = evt.clientY;
            let minMove = this.__hasMoved;

            if (!minMove) {
                minMove =
                    this.__getDistance(
                        swipeOrigin.clientX,
                        x,
                        swipeOrigin.clientY,
                        y
                    ) >= config.distances.minScrollDistance;
            }

            // if minimum distance not met
            if (!minMove) {
                this.__handleMappedEvents(eventType, ev, evt);

                return true;
            }

            this.__hasMoved = true;

            // if no moving events return
            if (noTracking && noSwiping) {
                this.__handleMappedEvents(eventType, ev, evt);

                return true;
            }

            let lastMove = <ITouchStartEventProperties>this.__lastMoveEvent;

            if (!isObject(lastMove)) {
                lastMove = swipeOrigin;
            }

            const direction = (evt.direction = this.__getDirection(
                x - lastMove.clientX,
                y - lastMove.clientY
            ));

            this.__handleOriginChange(direction);

            const dx = Math.abs(x - swipeOrigin.clientX);
            const dy = Math.abs(y - swipeOrigin.clientY);

            evt.velocity = this.__getVelocity(
                dx,
                dy,
                evt.timeStamp - swipeOrigin.xTimestamp,
                evt.timeStamp - swipeOrigin.yTimestamp
            );

            if (
                !noSwiping &&
                this._android44orBelow &&
                this.__haveSwipeSubscribers
            ) {
                ev.preventDefault();
            }

            // if tracking events exist
            if (!noTracking) {
                this.__handleTrack(evt, ev);
            }

            this.__handleMappedEvents(eventType, ev, evt);

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
            const eventType = ev.type;
            if (this.__ignoreEvent[eventType]) {
                this.__ignoreEvent[eventType] = false;
                this.__delayedClickRemover[eventType]();
                if (ev.target !== this.__focusedElement) {
                    if (ev.cancelable === true) {
                        ev.preventDefault();
                    }

                    postpone((): void => {
                        let ltu = this.__lastTouchUp;

                        if (!isObject(ltu)) {
                            ltu = <any>{};
                        }

                        const target = <HTMLInputElement>ltu.target;
                        if (this._document.body.contains(target)) {
                            this.__handleInput(target);
                        }
                    });

                    return false;
                }

                return true;
            }

            const hasMoved = this.__hasMoved;
            const notMouseUp = eventType !== 'mouseup';

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
                    } else if (this._inTouch === true) {
                        // immediately handle the input depending on type for more native-like experience
                        if (ev.target !== this.__focusedElement) {
                            if (
                                this.__handleInput(
                                    <HTMLInputElement>ev.target
                                ) &&
                                ev.cancelable === true
                            ) {
                                ev.preventDefault();
                            }
                        }
                    } else {
                        if (ev.cancelable === true) {
                            ev.preventDefault();
                        }
                        this.__preventClickFromTouch();
                        // reset touch count
                        this.__touchCount = 0;

                        return true;
                    }

                    this.__preventClickFromTouch();
                }
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

            if (this.__touchCount <= 0) {
                this.__touchCount = 0;
            } else {
                this.__touchCount -= 1;
            }

            // standardizeEventObject creates touches
            ev = this.__standardizeEventObject(ev);

            if (isNull(ev)) {
                return true;
            } else if (notMouseUp) {
                this._inTouch = false;
            }

            // additional check for mousedown/touchstart - mouseup/touchend inconsistencies
            if (this.__touchCount > 0) {
                this.__touchCount = ev._touches.length;
            }

            this.__clearTempStates();

            // handle release event
            if (this.__hasRelease) {
                this.__handleRelease(ev);
            }

            // handle swipe events
            this.__handleSwipe();

            const config = DomEvents.config;
            const intervals = config.intervals;
            const touchEnd = ev.timeStamp;
            const touchDown = this.__lastTouchDown;

            // if the user moved their finger (for scroll) we handle $trackend and return,
            // else if they had their finger down too long to be considered a tap, we want to return
            if (hasMoved) {
                this.__handleTrackEnd(ev);
                this.__handleMappedEvents(eventType, ev, ev);
                this.__tapCount = 0;
                // clear captured target
                this.__capturedTarget = null;

                return true;
            } else if (
                isNull(touchDown) ||
                touchEnd - touchDown.timeStamp > intervals.tapInterval
            ) {
                this.__handleMappedEvents(eventType, ev, ev);
                this.__tapCount = 0;
                // clear captured target
                this.__capturedTarget = null;

                return true;
            }

            const lastTouchUp = this.__lastTouchUp;
            const x = ev.clientX;
            const y = ev.clientY;

            // check if can be a double tap event by checking number of taps, distance between taps,
            // and time between taps
            if (
                this.__tapCount > 0 &&
                this.__getDistance(
                    x,
                    lastTouchUp.clientX,
                    y,
                    lastTouchUp.clientY
                ) <= config.distances.maxDblTapDistance &&
                touchEnd - lastTouchUp.timeStamp <= intervals.dblTapInterval
            ) {
                // handle dbltap events
                this.__handleDbltap(ev);
            } else {
                this.__tapCount = 0;
            }

            // handle tap events
            this.__handleTap(ev);
            this.__handleMappedEvents(eventType, ev, ev);

            this.__lastTouchUp = ev;

            // clear captured target
            this.__capturedTarget = null;
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
                this.__unregisterType(this._moveEvents);
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
            this._inTouch = this.__hasRelease = false;
            this.__pointerHash = {};
            this.__pointerEvents = [];

            // clear captured target
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
            let touches = ev.touches;

            if (!isObject(touches)) {
                touches = this.__pointerEvents;
            }

            const index = this.__getTouchIndex(touches);
            const type = ev.type;

            ev =
                index >= 0 ? touches[index] : this.__standardizeEventObject(ev);
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

            this.__handleMappedEvents(type, ev, ev);
            this.__resetTouchEnd();
        }

        /**
         * @name __handleMappedEvents
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         *
         * @description
         * A function for handling and firing mapped events.
         *
         * @param {string} type The event type.
         * @param {plat.ui.IPointerEvent} ev The touch end event object.
         * @param {plat.ui.IPointerEvent} payload The trigger payload.
         *
         * @returns {void}
         */
        private __handleMappedEvents(
            type: string,
            ev: IPointerEvent,
            payload: IPointerEvent
        ): void {
            const mappedType = this.__reverseMap[type];
            if (this.__mappedCount[mappedType] > 0) {
                const mappedDomEvent = this.__findFirstSubscriber(
                    <ICustomElement>ev.target,
                    mappedType
                );

                if (!isNull(mappedDomEvent)) {
                    mappedDomEvent.trigger(payload);
                }
            }
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
            const target = <ICustomElement>ev.target;
            let touchDown = this.__lastTouchDown;

            if (!isObject(touchDown)) {
                touchDown = {};
            }

            const touchDownTarget = <ICustomElement>touchDown.target;

            this.__tapCount += 1;

            if (
                this._gestureCount.$tap <= 0 ||
                isNull(touchDownTarget) ||
                (touchDownTarget !== target &&
                    isFunction(touchDownTarget.contains) &&
                    !touchDownTarget.contains(target) &&
                    isFunction(target.contains) &&
                    !target.contains(touchDownTarget))
            ) {
                return;
            }

            const gestures = this._gestures;
            const domEvent = this.__findFirstSubscriber(target, gestures.$tap);

            if (isNull(domEvent)) {
                return;
            }

            // fire tap event immediately if no dbltap zoom delay
            // or a mouse is being used
            if (
                DomEvents.config.intervals.dblTapZoomDelay <= 0 ||
                ev.pointerType === 'mouse' ||
                ev.type === 'mouseup'
            ) {
                ev._buttons = touchDown._buttons;
                domEvent.trigger(ev);

                return;
            }

            // defer for tap delay in case of something like desired
            // dbltap zoom
            this.__cancelDeferredTap = defer((): void => {
                ev._buttons = touchDown._buttons;
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

            const domEvent = this.__findFirstSubscriber(
                <ICustomElement>ev.target,
                this._gestures.$dbltap
            );
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
            const domEvent = this.__findFirstSubscriber(
                <ICustomElement>ev.target,
                this._gestures.$release
            );
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
            // if swiping events exist
            if (this._gestureCount.$swipe <= 0) {
                return;
            }

            const lastMove = this.__lastMoveEvent;

            if (isNull(lastMove)) {
                return;
            }

            const origin = this.__swipeOrigin;
            const dx = Math.abs(lastMove.clientX - origin.clientX);
            const dy = Math.abs(lastMove.clientY - origin.clientY);
            const swipeSubscribers = this.__getRegisteredSwipes(
                lastMove.direction,
                lastMove.velocity,
                dx,
                dy
            );

            while (swipeSubscribers.length > 0) {
                swipeSubscribers.pop().trigger(lastMove);
            }

            this.__lastMoveEvent = null;
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
        private __handleTrack(
            ev: IPointerEvent,
            originalEv: IPointerEvent
        ): void {
            const gestures = this._gestures;
            const trackGesture = gestures.$track;
            const direction = ev.direction;
            let eventTarget = this.__capturedTarget;

            if (!isObject(eventTarget)) {
                eventTarget = <any>ev.target;
            }

            const domEvents = this.__findFirstSubscribers(eventTarget, [
                trackGesture,
                trackGesture + direction.x,
                trackGesture + direction.y,
            ]);

            if (this._android44orBelow) {
                const anyEvents = this.__findFirstSubscribers(eventTarget, [
                    trackGesture,
                    gestures.$trackdown,
                    gestures.$trackup,
                    gestures.$trackleft,
                    gestures.$trackright,
                    gestures.$trackend,
                ]);

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

            let eventTarget = this.__capturedTarget;

            if (!isObject(eventTarget)) {
                eventTarget = <any>ev.target;
            }

            const domEvent = this.__findFirstSubscriber(
                eventTarget,
                this._gestures.$trackend
            );
            if (isNull(domEvent)) {
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
            const _compat = this._compat;
            const touchEvents = _compat.mappedEvents;
            const listeners = this.__listeners;
            let startEvents: string;
            let moveEvents: string;
            let endEvents: string;

            if (_compat.hasPointerEvents) {
                startEvents = this._startEvents = touchEvents.$touchstart;
                moveEvents = this._moveEvents = touchEvents.$touchmove;
                endEvents = this._endEvents = `${touchEvents.$touchend} ${
                    touchEvents.$touchcancel
                }`;
            } else if (_compat.hasTouchEvents) {
                startEvents = this._startEvents = `${
                    touchEvents.$touchstart
                } mousedown`;
                moveEvents = this._moveEvents = `${
                    touchEvents.$touchmove
                } mousemove`;
                endEvents = this._endEvents = `${
                    touchEvents.$touchend
                } mouseup ${touchEvents.$touchcancel}`;
            } else {
                const cancelEvent = touchEvents.$touchcancel;
                startEvents = this._startEvents = touchEvents.$touchstart;
                moveEvents = this._moveEvents = touchEvents.$touchmove;
                endEvents = this._endEvents =
                    touchEvents.$touchend +
                    (isEmpty(cancelEvent) ? '' : ` ${cancelEvent}`);
            }

            listeners[startEvents] = this._onTouchStart.bind(this);
            listeners[moveEvents] = this._onTouchMove.bind(this);
            listeners[endEvents] = this._onTouchEnd.bind(this);
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
            this.__registerType(this._startEvents);
            this.__registerType(this._endEvents);

            // dragstart will cause touchend to not fire
            this._document.addEventListener(
                'dragstart',
                this.__preventDefault,
                false
            );
        }

        /**
         * @name __unregisterTypes
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         *
         * @description
         * Un-registers for and stops listening to all touch events on the document.
         *
         * @returns {void}
         */
        private __unregisterTypes(): void {
            this.__unregisterType(this._startEvents);
            this.__unregisterType(this._endEvents);
            if (this.__detectingMove) {
                this.__unregisterType(this._moveEvents);
                this.__detectingMove = false;
            }

            this._document.removeEventListener(
                'dragstart',
                this.__preventDefault,
                false
            );
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
         * @param {string} events The events to begin listening for.
         *
         * @returns {void}
         */
        private __registerType(events: string): void {
            const listener = this.__listeners[events];
            const _document = this._document;
            const eventSplit = events.split(' ');
            let index = eventSplit.length;

            while (index > 0) {
                index -= 1;

                _document.addEventListener(eventSplit[index], listener, false);
            }
        }

        /**
         * @name __unregisterType
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         *
         * @description
         * Un-registers for and stops listening to a particular touch event type.
         *
         * @param {string} events The events to stop listening for.
         *
         * @returns {void}
         */
        private __unregisterType(events: string): void {
            const listener = this.__listeners[events];
            const _document = this._document;
            const eventSplit = events.split(' ');
            let index = eventSplit.length;

            while (index > 0) {
                index -= 1;

                _document.removeEventListener(
                    eventSplit[index],
                    listener,
                    false
                );
            }
        }

        /**
         * @name __registerMove
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         *
         * @description
         * Registers for and begins listening to touch move event types if any moving events are registered.
         *
         * @param {string} eventType The current event's type.
         *
         * @returns {void}
         */
        private __registerMove(eventType: string): void {
            const gestureCount = this._gestureCount;
            if (
                eventType === 'touchstart' ||
                this.__mappedCount.$touchmove > 0 ||
                gestureCount.$track > 0 ||
                gestureCount.$trackend > 0 ||
                gestureCount.$swipe > 0
            ) {
                this.__registerType(this._moveEvents);
                this.__detectingMove = true;
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
            let id: string;
            let _plat = element.__plat;

            if (isNull(_plat)) {
                id = uniqueId('domEvent_');
                element.__plat = _plat = {
                    domEvent: id,
                };
            } else if (isNull(_plat.domEvent)) {
                id = uniqueId('domEvent_');
                _plat.domEvent = id;
            }

            let _domEvent: DomEvent;
            if (isNull(id)) {
                const subscriber = this._subscribers[_plat.domEvent];
                if (isUndefined((<any>subscriber)[type])) {
                    _domEvent = new CustomDomEvent(element, type);
                    (<any>subscriber)[type] = _domEvent;
                } else {
                    (<any>subscriber)[type].count += 1;
                }
                subscriber.gestureCount += 1;

                return;
            }

            const newSubscriber = { gestureCount: 1 };
            _domEvent = new CustomDomEvent(element, type);
            (<any>newSubscriber)[type] = _domEvent;
            this._subscribers[id] = newSubscriber;

            if (!isUndefined((<HTMLElement>element).className)) {
                addClass(
                    <HTMLElement>element,
                    DomEvents.config.styleConfig[0].className
                );
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
         * Un-registers and disassociates an element with an event.
         *
         * @param {plat.ui.ICustomElement} element The element being disassociated with the given custom event.
         * @param {string} type The type of event.
         *
         * @returns {void}
         */
        private __unregisterElement(
            element: ICustomElement,
            type: string
        ): void {
            const _plat = element.__plat;
            if (isNull(_plat) || isNull(_plat.domEvent)) {
                return;
            }

            const domEventId = _plat.domEvent;
            const eventSubscriber = this._subscribers[domEventId];
            const domEvent: CustomDomEvent = (<any>eventSubscriber)[type];

            if (isNull(domEvent)) {
                return;
            }

            domEvent.count -= 1;
            if (domEvent.count === 0) {
                deleteProperty(eventSubscriber, type);
            }
            eventSubscriber.gestureCount -= 1;

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
            const eventType = ev.type;
            const _compat = this._compat;

            if (_compat.hasPointerEvents || _compat.hasMsPointerEvents) {
                this.__updatePointers(
                    ev,
                    this.__pointerEndRegex.test(eventType)
                );

                return;
            }

            ev.pointerType =
                eventType.indexOf('mouse') === -1 ? 'touch' : 'mouse';
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
            const id = ev.pointerId;
            const pointerHash = this.__pointerHash;
            const pointer = pointerHash[id];
            let index: number;

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
                index = this.__pointerEvents.indexOf(pointer);

                if (isUndefined(pointer) || index < 0) {
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
        private __findFirstSubscriber(
            eventTarget: ICustomElement,
            type: string
        ): DomEvent {
            if (isNull(eventTarget)) {
                return;
            }

            let _plat: ICustomElementProperty;
            let subscriber: IEventSubscriber;
            let domEvent: DomEvent;

            do {
                _plat = eventTarget.__plat;
                if (isUndefined(_plat) || isUndefined(_plat.domEvent)) {
                    continue;
                }

                subscriber = this._subscribers[_plat.domEvent];
                domEvent = (<any>subscriber)[type];
                if (isUndefined(domEvent)) {
                    continue;
                }

                return domEvent;
            } while (
                !isNull((eventTarget = <ICustomElement>eventTarget.parentNode))
            );
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
        private __findFirstSubscribers(
            eventTarget: ICustomElement,
            types: string[]
        ): DomEvent[] {
            if (isNull(eventTarget)) {
                return [];
            }

            const domEvents: DomEvent[] = [];
            let _plat: ICustomElementProperty;
            let subscriber: IEventSubscriber;
            let subscriberKeys: string[];
            let subscriberKey: string;
            let index: number;

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
                        domEvents.push((<any>subscriber)[subscriberKey]);
                        types.splice(index, 1);
                    }
                }
            } while (
                types.length > 0 &&
                !isNull((eventTarget = <ICustomElement>eventTarget.parentNode))
            );

            return domEvents;
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
        private __removeEventListener(
            element: ICustomElement,
            type: string,
            listener: IGestureListener,
            useCapture?: boolean
        ): void {
            const gestures = this._gestures;

            element.removeEventListener(type, listener, useCapture);

            const swipeGesture = gestures.$swipe;
            const trackGesture = gestures.$track;
            let countType = type;

            if (type.indexOf(trackGesture) !== -1) {
                const trackend = gestures.$trackend;
                countType = type === trackend ? trackend : trackGesture;
            } else if (type.indexOf(swipeGesture) !== -1) {
                countType = swipeGesture;
            }

            (<any>this._gestureCount)[countType] -= 1;
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

            const _plat = element.__plat;
            deleteProperty(_plat, 'domEvent');
            if (isEmpty(_plat)) {
                deleteProperty(element, '__plat');
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

            const isStart = this._startEvents.indexOf(ev.type) !== -1;
            const changedTouches = ev.changedTouches;
            const changedTouchesExist = !isUndefined(changedTouches);
            const timeStamp = ev.timeStamp;
            let preventDefault: () => void;
            let touches = ev.touches;

            if (!isObject(touches)) {
                touches = this.__pointerEvents;
            }

            if (changedTouchesExist) {
                if (isStart) {
                    preventDefault = ev.preventDefault.bind(ev);
                    ev = changedTouches[0];
                    ev.preventDefault = preventDefault;
                } else {
                    const changedTouchIndex = this.__getTouchIndex(
                        changedTouches
                    );
                    if (changedTouchIndex >= 0) {
                        preventDefault = ev.preventDefault.bind(ev);
                        ev = changedTouches[changedTouchIndex];
                        ev.preventDefault = preventDefault;
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

            ev._touches = touches;
            ev.offset = this.__getOffset(ev);

            if (isUndefined(ev.timeStamp) || timeStamp > ev.timeStamp) {
                (<any>ev).timeStamp = timeStamp;
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
         * Normalizes the 'buttons' property on an IExtendedEvent.
         *
         * @param {plat.ui.IExtendedEvent} ev The event.
         *
         * @returns {void}
         */
        private __normalizeButtons(ev: IExtendedEvent): void {
            let buttons: number;
            if (isNumber(ev.buttons) && ev.buttons !== 0) {
                buttons = ev.buttons;
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
        private __getTouchIndex(touches: IExtendedEvent[]): number {
            let lastTouchDown = this.__lastTouchDown;

            if (!isObject(lastTouchDown)) {
                lastTouchDown = <any>{};
            }

            const identifier = lastTouchDown.identifier;
            const length = touches.length;

            for (let i = 0; i < length; i += 1) {
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
            let target = this.__capturedTarget;

            if (!isObject(target)) {
                target = <any>ev.target;
            }

            if (isDocument(target)) {
                return {
                    x: ev.clientX,
                    y: ev.clientY,
                };
            } else if (
                !isUndefined(ev.offsetX) &&
                !isUndefined(ev.offsetY) &&
                target === ev.target
            ) {
                return {
                    x: ev.offsetX,
                    y: ev.offsetY,
                };
            }

            let x: number;
            let y: number;

            if (isFunction(target.getBoundingClientRect)) {
                const rect = target.getBoundingClientRect();
                x = rect.left;
                y = rect.top;
            } else {
                x = target.offsetLeft;
                y = target.offsetTop;
                while (!isNull((target = <any>target.offsetParent))) {
                    x += target.offsetLeft;
                    y += target.offsetTop;
                }
            }

            return {
                x: ev.clientX - x,
                y: ev.clientY - y,
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
        private __getDistance(
            x1: number,
            x2: number,
            y1: number,
            y2: number
        ): number {
            const x = x2 - x1;
            const y = y2 - y1;

            return Math.sqrt(x * x + y * y);
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
         * @param {number} dtx The change in time in x direction.
         * @param {number} dty The change in time in y direction.
         *
         * @returns {plat.ui.IVelocity} A velocity object containing horizontal and vertical velocities.
         */
        private __getVelocity(
            dx: number,
            dy: number,
            dtx: number,
            dty: number
        ): IVelocity {
            let x = 0;
            let y = 0;

            if (dtx > 0) {
                x = dx / dtx;
            }

            if (dty > 0) {
                y = dy / dty;
            }

            if (!isFinite(x)) {
                x = 0;
            }

            if (!isFinite(y)) {
                y = 0;
            }

            return {
                x: x,
                y: y,
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
         * horizontal and vertical directions of movement.
         */
        private __getDirection(dx: number, dy: number): IDirection {
            const distanceX = Math.abs(dx);
            const distanceY = Math.abs(dy);
            let lastMoveEvent = this.__lastMoveEvent;

            if (!isObject(lastMoveEvent)) {
                lastMoveEvent = <any>{};
            }

            let lastDirection = lastMoveEvent.direction;

            if (isObject(lastDirection)) {
                lastDirection = <any>{
                    x: 'none',
                    y: 'none',
                    primary: 'none',
                };
            }

            let x = lastDirection.x;
            let y = lastDirection.y;
            let primary = lastDirection.primary;

            if (isEmpty(x)) {
                x = 'none';
            }

            if (isEmpty(y)) {
                y = 'none';
            }

            if (isEmpty(primary)) {
                primary = 'none';
            }

            const horizontal = dx === 0 ? x : dx < 0 ? 'left' : 'right';
            const vertical = dy === 0 ? y : dy < 0 ? 'up' : 'down';

            return {
                x: horizontal,
                y: vertical,
                primary:
                    distanceX === distanceY
                        ? primary
                        : distanceX > distanceY ? horizontal : vertical,
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
         * @param {plat.ui.IDirection} direction The current vertical and horizontal directions of movement.
         *
         * @returns {void}
         */
        private __handleOriginChange(direction: IDirection): void {
            const lastMove = this.__lastMoveEvent;
            if (isNull(lastMove)) {
                return;
            }

            const swipeDirection = lastMove.direction;
            const xSame = swipeDirection.x === direction.x;
            const ySame = swipeDirection.y === direction.y;

            if (xSame && ySame) {
                return;
            }

            const origin = this.__swipeOrigin;
            const gestures = this._gestures;
            const swipes = [
                gestures.$swipe,
                gestures.$swipedown,
                gestures.$swipeleft,
                gestures.$swiperight,
                gestures.$swipeup,
            ];

            if (!xSame) {
                origin.clientX = lastMove.clientX;
                origin.xTimestamp = lastMove.timeStamp;
                origin.xTarget = lastMove.target;

                if (this._android44orBelow) {
                    this.__haveSwipeSubscribers =
                        this.__findFirstSubscribers(
                            <ICustomElement>origin.xTarget,
                            swipes
                        ).length > 0;
                }
            }

            if (!ySame) {
                origin.clientY = lastMove.clientY;
                origin.yTimestamp = lastMove.timeStamp;
                origin.yTarget = lastMove.target;

                if (this._android44orBelow) {
                    this.__haveSwipeSubscribers =
                        this.__findFirstSubscribers(
                            <ICustomElement>origin.yTarget,
                            swipes
                        ).length > 0;
                }
            }
        }

        /**
         * @name __getRegisteredSwipes
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         *
         * @description
         * Checks to see if a swipe event has been registered.
         *
         * @param {plat.ui.IDirection} direction The current horizontal and vertical directions of movement.
         * @param {plat.ui.IVelocity} velocity The current horizontal and vertical velocities.
         * @param {number} dx The distance in the x direction.
         * @param {number} dy The distance in the y direction.
         *
         * @returns {Array<plat.ui.DomEvent>} The swipe event subscribers.
         */
        private __getRegisteredSwipes(
            direction: IDirection,
            velocity: IVelocity,
            dx: number,
            dy: number
        ): DomEvent[] {
            const swipeGesture = this._gestures.$swipe;
            const minSwipeVelocity =
                DomEvents.config.velocities.minSwipeVelocity;
            const events = [swipeGesture];
            let swipeTarget: ICustomElement;
            let origin = this.__swipeOrigin;

            if (!isObject(origin)) {
                origin = <any>{};
            }

            if (dx > dy) {
                swipeTarget = <ICustomElement>origin.xTarget;

                if (velocity.x >= minSwipeVelocity) {
                    events.push(swipeGesture + direction.x);
                }
            } else if (dy > dx) {
                swipeTarget = <ICustomElement>origin.yTarget;

                if (velocity.y >= minSwipeVelocity) {
                    events.push(swipeGesture + direction.y);
                }
            }

            return this.__findFirstSubscribers(swipeTarget, events);
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
            const _document = this._document;
            let styleClasses: IDefaultStyle[];
            let classLength: number;

            if (this._compat.platCss) {
                return;
            } else if (
                !isNull(_document.styleSheets) &&
                _document.styleSheets.length > 0
            ) {
                const styleSheet = <CSSStyleSheet>_document.styleSheets[0];
                styleClasses = DomEvents.config.styleConfig;
                classLength = styleClasses.length;
                while (classLength > 0) {
                    classLength -= 1;
                    styleSheet.insertRule(
                        this.__createStyle(styleClasses[classLength]),
                        0
                    );
                }

                return;
            }

            const head = _document.head;
            const style = _document.createElement('style');
            let textContent = '';

            style.type = 'text/css';
            styleClasses = DomEvents.config.styleConfig;
            classLength = styleClasses.length;
            while (classLength > 0) {
                classLength -= 1;

                textContent =
                    this.__createStyle(styleClasses[classLength]) + textContent;
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
            let styles: string[] = styleClass.styles;

            if (!isArray(styles)) {
                styles = [];
            }

            let styleLength = styles.length;
            let style = `.${styleClass.className} { `;
            let textContent = '';

            styleLength = styles.length;

            for (let j = 0; j < styleLength; j += 1) {
                textContent += `${styles[j]};`;
            }

            style += `${textContent} } `;

            return style;
        }

        /**
         * @name __blurFocusedElement
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         *
         * @description
         * Blurs the currently focused element.
         *
         * @returns {void}
         */
        private __blurFocusedElement(): void {
            let focusedElement: HTMLInputElement = <HTMLInputElement>this
                .__focusedElement;

            if (!isObject(focusedElement)) {
                focusedElement = <any>{};
            }

            if (isFunction(focusedElement.blur)) {
                focusedElement.blur();
            }
        }

        /**
         * @name __waitForBlur
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         *
         * @description
         * Listens for blur and then sets the focused element back to null for the next case.
         *
         * @param {HTMLInputElement} target The target to listen for the blur event on.
         *
         * @returns {void}
         */
        private __waitForBlur(target: HTMLInputElement): void {
            this.__blurRemover = this.addEventListener(
                target,
                'blur',
                (): void => {
                    this.__blurRemover();
                    this.__blurRemover = noop;
                    if (target === this.__focusedElement) {
                        this.__focusedElement = null;
                    }
                },
                false
            );
        }

        /**
         * @name __clickTarget
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         *
         * @description
         * Handles a click target case.
         *
         * @param {HTMLInputElement} target The target to handle click functionality for.
         *
         * @returns {void}
         */
        private __clickTarget(target: HTMLInputElement): void {
            let clicked = false;
            const handler = (): void => {
                clicked = true;
                target.removeEventListener('click', handler, false);
            };

            target.addEventListener('click', handler, false);
            postpone((): void => {
                if (clicked) {
                    return;
                }

                target.removeEventListener('click', handler, false);
                if (
                    this._document.body.contains(target) &&
                    isFunction(target.click)
                ) {
                    target.click();
                }
            });
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
         * @param {HTMLInputElement} target The target to handle functionality for.
         *
         * @returns {boolean} Whether or not we should preventDefault on the Event.
         */
        private __handleInput(target: HTMLInputElement): boolean {
            this.__blurRemover();

            const nodeName = target.nodeName;
            if (!isString(nodeName)) {
                this.__focusedElement = null;
                this.__blurFocusedElement();

                return;
            }

            let preventDefault = true;
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
            }

            this.__focusedElement = target;

            return preventDefault;
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
            const _document = this._document;
            const ignoreEvents = this.__ignoreEvent;
            const boundPreventDefault = this.__boundPreventDefaultClick;
            const interval = DomEvents.config.intervals.delayedClickInterval;

            if (interval <= 0) {
                return;
            }

            this.__delayedClickRemover = {
                mousedown: defer((): void => {
                    ignoreEvents.mousedown = false;
                }, interval),
                mouseup: defer((): void => {
                    ignoreEvents.mouseup = false;
                }, interval),
                click: defer((): void => {
                    _document.removeEventListener(
                        'click',
                        boundPreventDefault,
                        true
                    );
                }, interval),
            };

            ignoreEvents.mousedown = ignoreEvents.mouseup = true;
            postpone((): void => {
                _document.addEventListener('click', boundPreventDefault, true);
            });
        }

        /**
         * @name __preventDefaultClick
         * @memberof plat.ui.DomEvents
         * @kind function
         * @access private
         *
         * @description
         * Prevents default and stops propagation for delayed or phantom clicks.
         *
         * @param {Event} ev The event object.
         *
         * @returns {boolean} Prevents default and stops propagation if false.
         */
        private __preventDefaultClick(ev: Event): boolean {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            this._document.removeEventListener(
                'click',
                this.__boundPreventDefaultClick,
                true
            );
            this.__delayedClickRemover.click();

            return false;
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
                element.addEventListener(
                    'selectstart',
                    this.__preventDefault,
                    false
                );
            }
            if (!isUndefined((<any>element).ondragstart)) {
                element.addEventListener(
                    'dragstart',
                    this.__preventDefault,
                    false
                );
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
                element.removeEventListener(
                    'selectstart',
                    this.__preventDefault,
                    false
                );
            }
            if (!isUndefined((<any>element).ondragstart)) {
                element.removeEventListener(
                    'dragstart',
                    this.__preventDefault,
                    false
                );
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
            let nodeName = (<Node>ev.target).nodeName;
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
        public element: any;

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
        public event: string;

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
        public eventType: string;

        /**
         * @name initialize
         * @memberof plat.ui.DomEvent
         * @kind function
         * @access public
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
        public initialize(
            element: Node | Window,
            event: string,
            eventType?: string
        ): void {
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
        public trigger(
            eventExtension?: Object,
            detailArg?: any,
            dispatchElement?: Node
        ): boolean {
            const customEv = <CustomEvent>this._document.createEvent(
                this.eventType
            );
            if (isObject(eventExtension)) {
                _extend(false, false, customEv, eventExtension);
            }
            customEv.initCustomEvent(
                this.event,
                true,
                true,
                isNull(detailArg) ? 0 : detailArg
            );

            if (!isNode(dispatchElement)) {
                dispatchElement = this.element;
            }

            return dispatchElement.dispatchEvent(customEv);
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
        public count: number = 0;

        /**
         * @name constructor
         * @memberof plat.ui.CustomDomEvent
         * @kind function
         * @access public
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
        constructor(element: Node | Window, event: string) {
            super();
            this.element = element;
            this.event = event;
            this.count += 1;
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
        public trigger(ev: IPointerEvent): boolean {
            const customEv = this._document.createEvent('CustomEvent');
            const element = this.element;
            const target = ev.target;

            this.__extendEventObject(customEv, ev);
            customEv.initCustomEvent(this.event, true, true, 0);

            const success =
                isDocument(element) || element.contains(target)
                    ? target.dispatchEvent(customEv)
                    : element.dispatchEvent(customEv);
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
        private __extendEventObject(
            customEv: IGestureEvent,
            ev: IPointerEvent
        ): void {
            // not using extend function because this gets called so often for certain events.
            const pointerType = ev.pointerType;

            customEv.clientX = ev.clientX;
            customEv.clientY = ev.clientY;
            customEv.offsetX = ev.offset.x;
            customEv.offsetY = ev.offset.y;
            customEv.direction = isNull(ev.direction)
                ? {
                      x: 'none',
                      y: 'none',
                      primary: 'none',
                  }
                : ev.direction;
            customEv.touches = ev._touches;
            customEv.velocity = isNull(ev.velocity)
                ? { x: 0, y: 0 }
                : ev.velocity;
            customEv.identifier = isNull(ev.identifier) ? 0 : ev.identifier;
            customEv.pointerType = isNumber(pointerType)
                ? this.__convertPointerType(pointerType, ev.type)
                : pointerType;
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
        private __convertPointerType(
            pointerType: any,
            eventType: string
        ): string {
            switch (pointerType) {
                case (<any>MSPointerEvent).MSPOINTER_TYPE_MOUSE:
                    return 'mouse';
                case (<any>MSPointerEvent).MSPOINTER_TYPE_PEN:
                    return 'pen';
                case (<any>MSPointerEvent).MSPOINTER_TYPE_TOUCH:
                    return 'touch';
                default:
            }

            return eventType.indexOf('mouse') === -1 ? 'touch' : 'mouse';
        }
    }

    /**
     * @name ITouchStartEventProperties
     * @memberof plat.ui
     * @kind interface
     *
     * @description
     * An extended event object containing coordinate, time, and target info.
     */
    export interface ITouchStartEventProperties {
        /**
         * @name buttons
         * @memberof plat.ui.ITouchStartEventProperties
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
         * @memberof plat.ui.ITouchStartEventProperties
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
         * @memberof plat.ui.ITouchStartEventProperties
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
         * @memberof plat.ui.ITouchStartEventProperties
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
         * @memberof plat.ui.ITouchStartEventProperties
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
         * @memberof plat.ui.ITouchStartEventProperties
         * @kind property
         * @access public
         *
         * @type {EventTarget}
         *
         * @description
         * The target of an Event object.
         */
        target?: EventTarget;
    }

    /**
     * @name ISwipeOriginProperties
     * @memberof plat.ui
     * @kind interface
     *
     * @description
     * An extended event object containing coordinate, time, and target info for a swipe origin.
     */
    export interface ISwipeOriginProperties {
        /**
         * @name clientX
         * @memberof plat.ui.ISwipeOriginProperties
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
         * @memberof plat.ui.ISwipeOriginProperties
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
         * @name xTimestamp
         * @memberof plat.ui.ISwipeOriginProperties
         * @kind property
         * @access public
         *
         * @type {number}
         *
         * @description
         * A timestamp.
         */
        xTimestamp?: number;

        /**
         * @name yTimestamp
         * @memberof plat.ui.ISwipeOriginProperties
         * @kind property
         * @access public
         *
         * @type {number}
         *
         * @description
         * A timestamp.
         */
        yTimestamp?: number;

        /**
         * @name xTarget
         * @memberof plat.ui.ISwipeOriginProperties
         * @kind property
         * @access public
         *
         * @type {EventTarget}
         *
         * @description
         * The target of an Event object.
         */
        xTarget?: EventTarget;

        /**
         * @name yTarget
         * @memberof plat.ui.ISwipeOriginProperties
         * @kind property
         * @access public
         *
         * @type {EventTarget}
         *
         * @description
         * The target of an Event object.
         */
        yTarget?: EventTarget;
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

        _touches?: IExtendedEvent[];
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
        touches?: IExtendedEvent[];

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
        changedTouches?: IExtendedEvent[];

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
        touches?: IExtendedEvent[];

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
    export type IGestureListener = (ev?: IGestureEvent) => void;

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
     * @extends {plat.ui.IBaseGestures<T>}
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
         * for a tap event to be fired. Defaults to 300 ms.
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

        /**
         * @name delayedClickInterval
         * @memberof plat.ui.IIntervals
         * @kind property
         * @access public
         *
         * @type {number}
         *
         * @description
         * The delay in milliseconds we preventDefault on click events after a
         * successful touchend event. Defaults to 400 ms.
         */
        delayedClickInterval: number;
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
        styles: string[];
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
        styleConfig: IDefaultStyle[];
    }
}
