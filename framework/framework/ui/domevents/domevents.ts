module plat.ui {
    /**
     * A class for managing DOM event registration and handling.
     */
    export class DomEvents implements IDomEvents {
        $window: Window = acquire('$window');
        $document: Document = acquire('$document');

        /**
         * A configuration object for all DOM events.
         */
        static config: IDomEventsConfig = {
            /**
             * Whether or not to allow text selection when move events such as swipe or track 
             * are currently active. If set to true, it may cause event misses due to the browser 
             * not firing events like 'pointerup' due to the text selection. Defaults to false.
             */
            allowTextSelection: false,
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
            }
        };

        /**
         * Whether or not the current browser has touch events 
         * like touchstart, touchmove, touchend, etc.
         */
        hasTouch = !isUndefined(this.$window['ontouchstart']);

        /**
         * Whether or not the DomEvents are currently active. 
         * They become active at least one element on the current 
         * page is listening for a custom event.
         */
        _isActive = false;

        /**
         * Whether or not the user is currently touching the screen.
         */
        _inTouch = false;

        /**
         * The array of all elements currently registered for 
         * DOM events.
         */
        _elements: Array<Node> = [];

        /**
         * An array of subscriptions that keep track of all of the 
         * events registered on a particular element.
         */
        _subscriptions: Array<IGestureIndicator> = [];

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
            tap: 'tap',
            dbltap: 'dbltap',
            hold: 'hold',
            release: 'release',
            swipe: 'swipe',
            swipeleft: 'swipeleft',
            swiperight: 'swiperight',
            swipeup: 'swipeup',
            swipedown: 'swipedown',
            track: 'track',
            trackleft: 'trackleft',
            trackright: 'trackright',
            trackup: 'trackup',
            trackdown: 'trackdown'
        };

        /**
         * An object containing the number of currently active 
         * events of each type.
         */
        _gestureCount: IGestures<number> = {
            tap: 0,
            dbltap: 0,
            hold: 0,
            release: 0,
            swipe: 0,
            track: 0
        };

        /**
         * A list of the mapped gestures for touch events.
         */
        _mappedGestures: IMappedGestures = {
            touchstart: 'touchstart',
            touchend: 'touchend',
            touchmove: 'touchmove',
            touchenter: 'touchenter',
            touchcancel: 'touchcancel'
        };

        private __START = 'start';
        private __MOVE = 'move';
        private __END = 'end';
        private __detectMove = false;
        private __hasMoved = false;
        private __hasSwiped = false;
        private __hasRelease = false;
        private __noSelect = false;
        private __touchCount = 0;
        private __moveEventCount = 0;
        private __tapTimeout: number;
        private __holdTimeout: number;
        private __lastTouchDown: ITouchPoint;
        private __lastTouchUp: ITouchPoint;
        private __swipeOrigin: ITouchPoint;
        private __lastMoveEvent: ITouchEvent;
        private __listeners: IDocumentListeners = {
            start: this._onTouchStart.bind(this),
            move: this._onMove.bind(this),
            end: this._onTouchEnd.bind(this)
        };

        /**
         * Determine the type of touch events for this browser.
         */
        constructor() {
            this.__determineTypes();
        }

        /**
         * Add an event listener for the specified event type on the specified element. 
         * 
         * @param element The node listening for the event.
         * @param type The type of event being listened to.
         * @param listener The listener to be fired.
         * @param useCapture Whether to fire the event on the capture or bubble phase of propagation.
         * @return {IRemoveListener} A function to remove the added event listener.
         */
        addEventListener(element: Node, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
        /**
         * Add an event listener for the specified event type on the specified element. 
         * 
         * @param element The window object.
         * @param type The type of event being listened to.
         * @param listener The listener to be fired.
         * @param useCapture Whether to fire the event on the capture or bubble phase of propagation.
         * @return {IRemoveListener} A function to remove the added event listener.
         */
        addEventListener(element: Window, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
        addEventListener(element: any, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener {
            var mappedGestures = this._mappedGestures,
                mappedType = mappedGestures[type];

            if (!isNull(mappedType)) {
                type = mappedType;
            }

            element.addEventListener(type, listener, useCapture);

            var gestures = this._gestures;
            if (!isUndefined(element['on' + type]) || isUndefined(gestures[type])) {
                return () => {
                    element.removeEventListener(type, listener, useCapture);
                };
            }

            var swipeGesture = gestures.swipe,
                trackGesture = gestures.track,
                removeSelect = false,
                countType = type;

            if (type.indexOf(trackGesture) !== -1) {
                countType = trackGesture;
                removeSelect = !(this.__noSelect || DomEvents.config.allowTextSelection);
                this.__moveEventCount++;
            } else if (type.indexOf(swipeGesture) !== -1) {
                countType = swipeGesture;
                removeSelect = !(this.__noSelect || DomEvents.config.allowTextSelection);
                this.__moveEventCount++;
            }

            this.__registerElement(element, type, listener, removeSelect);
            this._gestureCount[countType]++;

            return () => {
                this.__removeEventListener(element, type, listener, useCapture);
            };
        }

        /**
         * Stops listening for touch events and resets the DomEvents instance.
         */
        dispose() {
            this.__unregisterTypes();

            this._gestureCount = {
                tap: 0,
                dbltap: 0,
                hold: 0,
                release: 0,
                swipe: 0,
                track: 0
            };
            this.__touchCount = 0;
            this.__moveEventCount = 0;
            this._elements = [];
            this._subscriptions = [];
            this._isActive = false;
            this.__noSelect = false;
            this.__swipeOrigin = null;
            this.__lastMoveEvent = null;
            this.__lastTouchDown = null;
            this.__lastTouchUp = null;
        }

        /**
         * A listener for touch/mouse start events.
         * 
         * @param ev The touch start event object.
         */
        _onTouchStart(ev: ITouchEvent) {
            var eventType = ev.type.toLowerCase(),
                isTouch = eventType.indexOf('mouse') === -1;

            // return immediately if mouse event and currently in a touch
            if (this._inTouch && !isTouch) {
                return;
            }

            if (isTouch) {
                this._inTouch = true;
            }

            this.__hasMoved = false;

            this.__lastTouchDown = this.__swipeOrigin = {
                x: ev.clientX,
                y: ev.clientY,
                target: ev.target,
                timeStamp: ev.timeStamp
            };

            var gestureCount = this._gestureCount,
                noHolds = gestureCount.hold <= 0,
                noRelease = gestureCount.release <= 0;

            if (gestureCount.tap > 0 || gestureCount.dbltap > 0 ||
                gestureCount.track > 0 || gestureCount.swipe > 0) {
                this.__lastMoveEvent = null;
                this.__detectMove = true;
                this.__registerType(this.__MOVE);
            }

            if (noHolds && noRelease) {
                return;
            }

            var holdInterval = DomEvents.config.intervals.holdInterval,
                subscriber: IGestureIndicator,
                subscribeFn;
            if (noHolds) {
                this.__holdTimeout = setTimeout(() => {
                    this.__hasRelease = true;
                }, holdInterval);
                return;
            } else if (noRelease) {
                subscriber = this.__findFirstSubscriber(<Node>ev.target, this._gestures.hold);
                subscribeFn = () => {
                    subscriber.hold.trigger(ev);
                    this.__holdTimeout = null;
                };
            } else {
                // has both hold and release events registered
                subscriber = this.__findFirstSubscriber(<Node>ev.target, this._gestures.hold);
                subscribeFn = () => {
                    subscriber.hold.trigger(ev);
                    this.__hasRelease = true;
                    this.__holdTimeout = null;
                };
            }

            if (!isNull(subscriber)) {
                this.__holdTimeout = setTimeout(subscribeFn, holdInterval);
            }
        }

        /**
         * A listener for touch/mouse move events.
         * 
         * @param ev The touch start event object.
         */
        _onMove(ev: ITouchEvent) {
            // return immediately if mouse event and currently in a touch
            if (!this.__detectMove || (this._inTouch && ev.type.indexOf('mouse') !== -1)) {
                return;
            }

            // call prevent default to try and avoid mouse events
            ev.preventDefault();

            // clear hold
            this.__clearHold();

            var gestureCount = this._gestureCount,
                noTracking = gestureCount.track <= 0,
                noMoveEvents = gestureCount.swipe <= 0 && noTracking,
                noTapEvents = gestureCount.dbltap <= 0 && gestureCount.tap <= 0;

            if (noMoveEvents && noTapEvents) {
                return;
            }

            var config = DomEvents.config,
                swipeOrigin = this.__swipeOrigin,
                x = ev.clientX,
                y = ev.clientY,
                lastX = swipeOrigin.x,
                lastY = swipeOrigin.y,
                minMove = this.__getDistance(lastX, x, lastY, y) >= config.distances.minScrollDistance;

            if (minMove) {
                this.__hasMoved = true;
            }

            if (noMoveEvents || (noTracking && !minMove)) {
                return;
            }

            var lastMove = this.__lastMoveEvent,
                direction = ev.direction = isNull(lastMove) ? this.__getDirection(x - lastX, y - lastY) :
                    this.__getDirection(x - lastMove.clientX, y - lastMove.clientY);

            this.__checkForOriginChanged(direction);

            var velocity = ev.velocity = this.__getVelocity(x - swipeOrigin.x, y - swipeOrigin.y, ev.timeStamp - swipeOrigin.timeStamp);

            this.__hasSwiped = (this.__isHorizontal(direction) ? velocity.x : velocity.y) >= config.velocities.minSwipeVelocity;

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
        _onTouchEnd(ev: ITouchEvent) {
            // return immediately if mouse event and currently in a touch
            if (this._inTouch && ev.type.indexOf('mouse') !== -1) {
                return;
            }

            this.__clearHold();
            this._inTouch = false;

            if (this.__detectMove) {
                this.__unregisterType(this.__MOVE);
                this.__detectMove = false;
            }
 
            if (this.__hasRelease) {
                this.__handleRelease(ev);
            }

            if (this.__hasSwiped) {
                this.__handleSwipe();
            }

            var config = DomEvents.config,
                intervals = config.intervals,
                touchEnd = ev.timeStamp;
            
            if (this.__hasMoved || ((touchEnd - this.__lastTouchDown.timeStamp) > intervals.tapInterval)) {
                this.__touchCount = 0;
                return;
            }

            var lastTouchUp = this.__lastTouchUp,
                x = ev.clientX,
                y = ev.clientY;

            if (this.__touchCount > 0 &&
                this.__getDistance(x, lastTouchUp.x, y, lastTouchUp.y) <= config.distances.maxDblTapDistance &&
                ((touchEnd - lastTouchUp.timeStamp) <= intervals.dblTapInterval)) {
                this.__handleDbltap(ev);
            } else {
                this.__touchCount = 0;
            }

            this.__handleTap(ev);

            this.__lastTouchUp = {
                x: x,
                y: y,
                target: ev.target,
                timeStamp: touchEnd
            };
        }

        // Gesture handling methods

        private __handleTap(ev: ITouchEvent) {
            this.__touchCount++;

            if (this._gestureCount.tap <= 0) {
                return;
            }

            var events = this._gestures,
                tapSubscriber = this.__findFirstSubscriber(<Node>ev.target, events.tap);

            if (isNull(tapSubscriber)) {
                return;
            }

            var domEvent = tapSubscriber.tap;

            // fire tap event immediately if no dbltap zoom
            // or a mouse is being used
            if (DomEvents.config.intervals.dblTapZoomDelay <= 0 ||
                ev.pointerType === 'mouse' ||
                ev.type.indexOf('mouse') !== -1) {
                domEvent.trigger(ev);
                return;
            }
            
            // setTimeout for tap delay in case of 
            // dbltap zoom
            this.__tapTimeout = setTimeout(() => {
                domEvent.trigger(ev);
                this.__touchCount = 0;
                this.__tapTimeout = null;
            }, DomEvents.config.intervals.dblTapZoomDelay);
            
        }
        private __handleDbltap(ev: ITouchEvent) {
            this.__touchCount = 0;

            if (!isNull(this.__tapTimeout)) {
                clearTimeout(this.__tapTimeout);
                this.__tapTimeout = null;
            }

            if (this._gestureCount.dbltap <= 0) {
                return;
            }

            var subscriber = this.__findFirstSubscriber(<Node>ev.target, this._gestures.dbltap);
            if (!isNull(subscriber)) {
                subscriber.dbltap.trigger(ev);
                // set touch count to -1 to prevent repeated fire on sequential taps
                this.__touchCount = -1;
            }
        }
        private __handleRelease(ev: ITouchEvent) {
            var subscriber = this.__findFirstSubscriber(<Node>ev.target, this._gestures.release);
            if (!isNull(subscriber)) {
                subscriber.release.trigger(ev);
            }

            this.__hasRelease = false;
        }
        private __handleSwipe() {
            var lastMove = this.__lastMoveEvent;
            if (isNull(lastMove)) {
                this.__hasSwiped = false;
                return;
            }

            var gestures = this._gestures,
                swipeGesture = gestures.swipe,
                direction = lastMove.direction,
                velocity = lastMove.velocity,
                swipeDirectionGesture = swipeGesture + direction,
                eventTarget = <Node>this.__swipeOrigin.target,
                swipeSubscriber = this.__findFirstSubscriber(eventTarget, swipeGesture),
                swipeDirectionSubscriber = this.__findFirstSubscriber(eventTarget, gestures[swipeDirectionGesture]);

            if (!isNull(swipeSubscriber)) {
                swipeSubscriber.swipe.trigger(lastMove);
            }

            if (!isNull(swipeDirectionSubscriber)) {
                swipeDirectionSubscriber[swipeDirectionGesture].trigger(lastMove);
            }

            this.__hasSwiped = false;
            this.__lastMoveEvent = null;
        }
        private __handleTrack(ev: ITouchEvent) {
            var gestures = this._gestures,
                trackGesture = gestures.track,
                velocity = ev.velocity,
                direction = ev.direction,
                trackDirectionGesture = trackGesture + direction,
                eventTarget = <Node>ev.target,
                trackSubscriber = this.__findFirstSubscriber(eventTarget, trackGesture),
                trackDirectionSubscriber = this.__findFirstSubscriber(eventTarget, gestures[trackDirectionGesture]);

            if (!isNull(trackSubscriber)) {
                trackSubscriber.track.trigger(ev);
            }

            if (!isNull(trackDirectionSubscriber)) {
                trackDirectionSubscriber[trackDirectionGesture].trigger(ev);
            }
        }

        private __clearHold() {
            if (!isNull(this.__holdTimeout)) {
                clearTimeout(this.__holdTimeout);
                this.__holdTimeout = null;
            }
        }

        // Touch type and element registration

        private __determineTypes() {
            var navigator = this.$window.navigator,
                mappedGestures = this._mappedGestures;
            if (!!navigator.pointerEnabled) {
                this._startEvents = [(mappedGestures.touchstart = 'pointerdown')];
                this._moveEvents = [(mappedGestures.touchmove = 'pointermove')];
                this._endEvents = [(mappedGestures.touchend = 'pointerup'), (mappedGestures.touchcancel = 'pointercancel')];
                mappedGestures.touchenter = 'pointerover';
                return;
            } else if (!!navigator.msPointerEnabled) {
                this._startEvents = [(mappedGestures.touchstart = 'MSPointerDown')];
                this._moveEvents = [(mappedGestures.touchmove = 'MSPointerMove')];
                this._endEvents = [(mappedGestures.touchend = 'MSPointerUp'), (mappedGestures.touchcancel = 'MSPointerCancel')];
                mappedGestures.touchenter = 'MSPointerOver';
                return;
            } else if (this.hasTouch) {
                this._startEvents = ['touchstart', 'mousedown'];
                this._moveEvents = ['touchmove', 'mousemove'];
                this._endEvents = ['touchend', 'touchcancel', 'mouseup'];
                return;
            }

            this._startEvents = [(mappedGestures.touchstart = 'mousedown')];
            this._moveEvents = [(mappedGestures.touchmove = 'mousemove')];
            this._endEvents = [(mappedGestures.touchend = 'mouseup')];
            mappedGestures.touchenter = 'mouseenter';
            mappedGestures.touchcancel = null;
        }
        private __registerTypes() {
            this.__registerType(this.__START);
            this.__registerType(this.__END);
        }
        private __unregisterTypes() {
            this.__unregisterType(this.__START);
            this.__unregisterType(this.__MOVE);
            this.__unregisterType(this.__END);
        }
        private __registerType(event: string) {
            var events: Array<string>,
                listener = this.__listeners[event],
                $document = this.$document;

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
        private __unregisterType(event: string) {
            var events: Array<string>,
                listener = this.__listeners[event],
                $document = this.$document;

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
        private __registerElement(element: Node, type: string, listener: IGestureListener, removeSelect: boolean) {
            var index = this._elements.indexOf(element),
                domEvent = new DomEvent(element, type);

            // check if DomEvents is ready
            if (!this._isActive) {
                this.__registerTypes();
                this._isActive = true;
            }

            if (index === -1) {
                var gesture = { gestureCount: 1 };
                gesture[type] = domEvent;

                index = this._elements.length;
                this._elements.push(element);
                this._subscriptions.push(gesture);
            } else {
                var gestureIndicator = this._subscriptions[index];
                if (isUndefined(gestureIndicator[type])) {
                    gestureIndicator[type] = domEvent;
                    gestureIndicator.gestureCount++;
                }
            }

            if (removeSelect) {
                this.__removeTextSelect();
            }
        }
        private __unregisterElement(element: Node, type: string, listener: IGestureListener, returnSelect: boolean) {
            var elementIndex = this._elements.indexOf(element);
            if (elementIndex === -1) {
                return;
            }

            var gestureIndicator = this._subscriptions[elementIndex];
            gestureIndicator[type] = null;
            delete gestureIndicator[type];
            gestureIndicator.gestureCount--;

            if (gestureIndicator.gestureCount === 0) {
                this._subscriptions.splice(elementIndex, 1);
                this.__removeElement(elementIndex);
            }

            if (returnSelect) {
                this.__returnTextSelect();
            }
        }

        // Event and subscription handling

        private __findFirstSubscriber(eventTarget: Node, type: string): IGestureIndicator {
            var elements = this._elements,
                gestures: IGestureIndicator,
                index: number;

            do {
                if ((index = elements.indexOf(eventTarget)) !== -1) {
                    gestures = this._subscriptions[index];
                    if (isUndefined(gestures[type])) {
                        continue;
                    }

                    return gestures;
                }
            } while (!isNull(eventTarget = eventTarget.parentNode));
        }
        private __removeEventListener(element: Node, type: string, listener: IGestureListener, useCapture?: boolean) {
            var gestures = this._gestures;

            element.removeEventListener(type, listener, useCapture);

            var swipeGesture = gestures.swipe,
                trackGesture = gestures.track,
                countType = type;

            if (type.indexOf(trackGesture) !== -1) {
                countType = trackGesture;
                this.__moveEventCount--;
            } else if (type.indexOf(swipeGesture) !== -1) {
                countType = swipeGesture;
                this.__moveEventCount--;
            }

            this.__unregisterElement(element, type, listener, (this.__moveEventCount <= 0 && !DomEvents.config.allowTextSelection));
            this._gestureCount[countType]--;
        }
        private __removeTextSelect() {
            this.$document.addEventListener('selectstart', this.preventDefault, false);
            this.__noSelect = true;
        }
        private __returnTextSelect() {
            this.$document.removeEventListener('selectstart', this.preventDefault, false);
            this.__noSelect = false;
        }
        private preventDefault(ev: Event) {
            ev.preventDefault();
        }
        private __removeElement(index: number) {
            var elements = this._elements;
            elements.splice(index, 1);

            // check if no elements are left listening
            if (elements.length === 0) {
                this.__unregisterTypes();
                this._isActive = false;
            }
        }

        // Utility methods

        private __getDistance(x1: number, x2: number, y1: number, y2: number) {
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
        private __getDirection(dx: number, dy: number) {
            var distanceX = Math.abs(dx),
                distanceY = Math.abs(dy);

            if (distanceY > distanceX) {
                return dy < 0 ? 'up' : 'down';
            }

            return dx < 0 ? 'left' : 'right';
        }
        private __checkForOriginChanged(direction: string) {
            var lastMove = this.__lastMoveEvent;
            if (isNull(lastMove)) {
                this.__hasSwiped = false;
                return;
            }

            var swipeDirection = lastMove.direction;
            if (swipeDirection === direction) {
                return;
            }

            this.__swipeOrigin = {
                x: lastMove.clientX,
                y: lastMove.clientY,
                target: lastMove.target,
                timeStamp: lastMove.timeStamp
            };

            this.__hasSwiped = false;
        }
        private __isHorizontal(direction: string) {
            return direction === 'left' || direction === 'right';
        }
    }

    plat.register.injectable('$domEvents', DomEvents);

    /**
     * The Type for referencing the '$domEvents.config' injectable as a dependency.
     */
    export function DomEventsConfigStatic() {
        return DomEvents.config;
    }

    register.injectable('$domEvents.config', DomEventsConfigStatic, null, register.injectableType.STATIC);

    /**
     * A class for managing of a single custom event.
     */
    export class DomEvent implements IDomEvent {
        $document: Document = acquire('$document');

        /**
         * @param element The node associated with this DomEvent.
         * @param event The type of event this DomEvent is managing.
         */
        constructor(element: Node, event: string);
        /**
         * @param element The window object.
         * @param event The type of event this DomEvent is managing.
         */
        constructor(element: Window, event: string);
        constructor(public element: any, public event: string) { }

        /**
         * Triggers a custom event to bubble up to all elements in this branch of the DOM tree.
         * 
         * @param ev The event object to pass in as the custom event object's detail property.
         */
        trigger(ev: ITouchEvent) {
            var event = <CustomEvent>this.$document.createEvent('CustomEvent');
            event.initCustomEvent(this.event, true, true, ev);
            this.element.dispatchEvent(event);
        }
    }

    /**
     * Describes the touch event listeners for the document.
     */
    interface IDocumentListeners extends IObject<EventListener> {
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
         * The x-coordinate of the event on the screen.
         */
        clientX?: number;

        /**
         * The y-coordinate of the event on the screen.
         */
        clientY?: number;

        /**
         * The potential direction associated with the event.
         */
        direction?: string;

        /**
         * The potential velocity associated with the event.
         */
        velocity?: IVelocity;
    }

    /**
     * An extended event object potentially containing coordinate and movement information as 
     * well as pointer type for pointer events.
     */
    export interface ITouchEvent extends IExtendedEvent {
        /**
         * The type of interaction associated with the touch event ('touch', 'pen', 'mouse', '')
         */
        pointerType?: string;
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
    export interface IGestureIndicator {
        /**
         * The total registered gesture count for the associated element.
         */
        gestureCount: number;

        /**
         * The DomEvent handling a tap event.
         */
        tap?: IDomEvent;

        /**
         * The DomEvent handling a dbltap event.
         */
        dbltap?: IDomEvent;

        /**
         * The DomEvent handling a hold event.
         */
        hold?: IDomEvent;

        /**
         * The DomEvent handling a release event.
         */
        release?: IDomEvent;

        /**
         * The DomEvent handling a swipe event.
         */
        swipe?: IDomEvent;

        /**
         * The DomEvent handling a swipeleft event.
         */
        swipeleft?: IDomEvent;

        /**
         * The DomEvent handling a swiperight event.
         */
        swiperight?: IDomEvent;

        /**
         * The DomEvent handling a swipeup event.
         */
        swipeup?: IDomEvent;

        /**
         * The DomEvent handling a swipedown event.
         */
        swipedown?: IDomEvent;

        /**
         * The DomEvent handling a track event.
         */
        track?: IDomEvent;

        /**
         * The DomEvent handling a trackleft event.
         */
        trackleft?: IDomEvent;

        /**
         * The DomEvent handling a trackright event.
         */
        trackright?: IDomEvent;

        /**
         * The DomEvent handling a trackup event.
         */
        trackup?: IDomEvent;

        /**
         * The DomEvent handling a trackdown event.
         */
        trackdown?: IDomEvent;
    }

    /**
     * Describes an object containing information 
     * regarding all our custom events.
     */
    export interface IGestures<T> {
        /**
         * The string type|number of events associated with the tap event.
         */
        tap: T;

        /**
         * The string type|number of events associated with the dbltap event.
         */
        dbltap: T;

        /**
         * The string type|number of events associated with the hold event.
         */
        hold: T;

        /**
         * The string type|number of events associated with the release event.
         */
        release: T;

        /**
         * The string type|number of events associated with the swipe event.
         */
        swipe: T;

        /**
         * The string type|number of events associated with the swipeleft event.
         */
        swipeleft?: T;

        /**
         * The string type|number of events associated with the swiperight event.
         */
        swiperight?: T;

        /**
         * The string type|number of events associated with the swipeup event.
         */
        swipeup?: T;

        /**
         * The string type|number of events associated with the swipedown event.
         */
        swipedown?: T;

        /**
         * The string type|number of events associated with the track event.
         */
        track: T;

        /**
         * The string type|number of events associated with the trackleft event.
         */
        trackleft?: T;

        /**
         * The string type|number of events associated with the trackright event.
         */
        trackright?: T;

        /**
         * The string type|number of events associated with the trackup event.
         */
        trackup?: T;

        /**
         * The string type|number of events associated with the trackdown event.
         */
        trackdown?: T;
    }

    /**
     * Describes an object used for mapping one event type to another.
     */
    export interface IMappedGestures extends IObject<string> {
        /**
         * An event type for touch start.
         */
        touchstart: string;

        /**
         * An event type for touch end.
         */
        touchend: string;

        /**
         * An event type for touch move.
         */
        touchmove: string;

        /**
         * An event type for touch enter (or 'over').
         */
        touchenter: string;

        /**
         * An event type for touch cancel.
         */
        touchcancel: string;
    }

    /**
     * Describes a configuration object for all custom DOM events.
     */
    export interface IDomEventsConfig {
        /**
         * Whether or not to allow text selection when move events such as swipe or track 
         * are currently active. If set to true, it may cause event misses due to the browser 
         * not firing events like 'pointerup' due to the text selection. Defaults to false.
         */
        allowTextSelection: boolean;

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
    }

    /**
     * Describes an object containing a speed in both the horiztonal and vertical directions.
     */
    export interface IVelocity {
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
     * Describes an object containing information about a single point touched.
     */
    export interface ITouchPoint {
        /**
         * The x-coordinate of the touch.
         */
        x: number;

        /**
         * The y-coordinate of the touch
         */
        y: number;

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
     * Describes an object used for managing a single custom event.
     */
    export interface IDomEvent {
        /**
         * The node or window object associated with this DomEvent object.
         */
        element: any;

        /**
         * The event type associated with this DomEvent.
         */
        event: string;

        /**
         * Triggers a custom event to bubble up to all elements in this branch of the DOM tree.
         * 
         * @param ev The event object to pass in as the custom event object's detail property.
         */
        trigger(ev: ITouchEvent): void;
    }

    /**
     * Describes an object for managing DOM event registration and handling.
     */
    export interface IDomEvents {
        /**
         * Whether or not the current browser has touch events 
         * like touchstart, touchmove, touchend, etc.
         */
        hasTouch: boolean;

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
}
