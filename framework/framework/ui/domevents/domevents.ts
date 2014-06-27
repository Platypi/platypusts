module plat.ui {
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
             * The default CSS styles applied to elements listening for custom DOM events. If using 
             * platypus.css, you must overwrite the styles in platypus.css or create your own and 
             * change the classNames in the config.
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
         * An array of subscriptions that keep track of all of the 
         * events registered on a particular element.
         */
        _subscribers: IObject<IEventSubscriber> = {};

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
        private __capturedTarget: ICustomElement;
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

            (<any>this._gestureCount)[countType]++;
            this.__registerElement(element, type);

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
            this._subscribers = {};
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

            if (isTouch) {
                this._inTouch = true;
            } else if (this._inTouch === true) {
                // return immediately if mouse event and currently in a touch
                return;
            }

            // set any captured target back to null
            this.__capturedTarget = null;

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
                this.__hasRelease = false;
                this.__holdTimeout = setTimeout(() => {
                    this.__hasRelease = true;
                }, holdInterval);
                return;
            } else if (noRelease) {
                domEvent = this.__findFirstSubscriber(<ICustomElement>ev.target, this._gestures.$hold);
                subscribeFn = () => {
                    domEvent.trigger(ev);
                    this.__holdTimeout = null;
                };
            } else {
                this.__hasRelease = false;
                // has both hold and release events registered
                domEvent = this.__findFirstSubscriber(<ICustomElement>ev.target, this._gestures.$hold);
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
            // clear hold event
            this.__clearHold();

            // return immediately if we should not be detecting move, 
            // if there are multiple touches present, or 
            // if it is a mouse event and currently in a touch
            if (!this.__detectMove ||
                this.__touchCount > 1 ||
                (this._inTouch === true && ev.type === 'mousemove')) {
                return;
            }

            var gestureCount = this._gestureCount,
                noTracking = gestureCount.$track <= 0,
                noMoveEvents = gestureCount.$swipe <= 0 && noTracking;

            // return if no move events and no tap events are registered
            if (noMoveEvents && gestureCount.$dbltap <= 0 && gestureCount.$tap <= 0) {
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
                // cannot call ev.preventDefault up top due to Chrome canceling touch based scrolling
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
            var eventType = ev.type;
            // call prevent default to try and avoid mouse events
            if (eventType !== 'mouseup') {
                this._inTouch = false;
                ev.preventDefault();
            } else if (!isUndefined(this._inTouch)) {
                return;
            }

            // clear hold event
            this.__clearHold();

            // if we were detecting move events, unregister them
            if (this.__detectMove) {
                this.__unregisterType(this.__MOVE);
                this.__detectMove = false;
            }

            // check for cancel event,
            if (this.__cancelRegex.test(eventType)) {
                this.__tapCount = 0;
                this.__hasRelease = false;
                this.__hasSwiped = false;
                return;
            }

            this.__standardizeEventObject(ev);

            // return if the touch count was greater than 0, 
            // or handle release
            if (ev.touches.length > 0) {
                return;
            } else if (this.__hasRelease) {
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

            if (isNull(touchDown)) {
                this.__tapCount = 0;
                return;
            }

            // if the user moved their finger (for scroll) we do not want default or custom behaviour, 
            // else if they had their finger down too long to be considered a tap, we do not want default or 
            // custom behaviour, but if the event type is 'touchend' we may need to implement the default behaviour.
            if (this.__hasMoved) {
                this.__tapCount = 0;
                return;
            } else if ((touchEnd - touchDown.timeStamp) > intervals.tapInterval) {
                if (eventType === 'touchend') {
                    this.__handleInput(<HTMLInputElement>ev.target);
                }
                this.__tapCount = 0;
                return;
            } else if (eventType === 'touchend') {
                this.__handleInput(<HTMLInputElement>ev.target);
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

        // gesture handling methods

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

            var domEvent = this.__findFirstSubscriber(<ICustomElement>ev.target, this._gestures.$dbltap);
            if (isNull(domEvent)) {
                return;
            }

            domEvent.trigger(ev);
            // set touch count to -1 to prevent repeated fire on sequential taps
            this.__tapCount = -1;
        }
        private __handleRelease(ev: IPointerEvent): void {
            var domEvent = this.__findFirstSubscriber(<ICustomElement>ev.target, this._gestures.$release);
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

            var swipeSubscribers = this.__swipeSubscribers,
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
                direction = ev.direction,
                trackDirectionGesture = trackGesture + direction,
                eventTarget = this.__capturedTarget || <ICustomElement>ev.target,
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
                domEvent = this.__findFirstSubscriber(<ICustomElement>ev.target, eventType);

            if (isNull(domEvent)) {
                return;
            }

            this.__standardizeEventObject(ev);
            domEvent.trigger(ev);
        }

        // touch type and element registration

        private __getTypes(): void {
            var $compat = this.$Compat,
                touchEvents = $compat.mappedEvents;

            if ($compat.hasTouchEvents) {
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

            var $domEvent: IDomEventInstance;
            if (isNull(id)) {
                var subscriber = this._subscribers[plat.domEvent];
                if (isUndefined((<any>subscriber)[type])) {
                    $domEvent = acquire(__DomEventInstance);
                    $domEvent.initialize(element, type);
                    (<any>subscriber)[type] = $domEvent;
                } else {
                    (<any>subscriber)[type].count++;
                }
                subscriber.gestureCount++;
            } else {
                var newSubscriber = { gestureCount: 1 };
                $domEvent = acquire(__DomEventInstance);
                $domEvent.initialize(element, type);
                (<any>newSubscriber)[type] = $domEvent;
                this._subscribers[id] = newSubscriber;

                if (!isUndefined((<HTMLElement>element).className)) {
                    addClass(<HTMLElement>element, DomEvents.config.styleConfig[0].className);
                }
                this.__removeSelections(element);
            }
        }
        private __unregisterElement(element: ICustomElement, type: string): void {
            var plat = element.__plat;
            if (isNull(plat) || isNull(plat.domEvent)) {
                return;
            }

            var domEventId = plat.domEvent,
                eventSubscriber = this._subscribers[domEventId],
                domEvent: IDomEventInstance = (<any>eventSubscriber)[type];

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
        private __setTouchPoint(ev: IPointerEvent): void {
            var eventType = ev.type,
                $compat = this.$Compat;

            if ($compat.hasPointerEvents) {
                if (eventType === 'pointerdown') {
                    this.__setCapture(ev.target);
                }

                this.__updatePointers(ev, this.__pointerEndRegex.test(eventType));
            } else if ($compat.hasMsPointerEvents) {
                if (eventType === 'MSPointerDown') {
                    this.__setCapture(ev.target);
                }

                this.__updatePointers(ev, this.__pointerEndRegex.test(eventType));
            } else if (eventType === 'mousedown') {
                ev.pointerType = 'mouse';
                this.__setCapture(ev.target);
            } else {
                // do not need to set catpure for touchstart events
                ev.pointerType = eventType.indexOf('mouse') === -1 ? 'touch' : 'mouse';
            }
        }
        private __setCapture(target: EventTarget) {
            if (isNull(this.__capturedTarget) && !isDocument(target)) {
                this.__capturedTarget = <ICustomElement>target;
            }
        }
        private __updatePointers(ev: IPointerEvent, remove: boolean): void {
            var id = ev.pointerId,
                pointer = this.__pointerHash[id];

            if (remove) {
                if (!isUndefined(pointer)) {
                    this.__pointerEvents.splice(this.__pointerEvents.indexOf(pointer), 1);
                    deleteProperty(this.__pointerHash, id);
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

        // event and subscription handling

        private __findFirstSubscriber(eventTarget: ICustomElement, type: string): IDomEventInstance {
            var plat: ICustomElementProperty,
                subscriber: IEventSubscriber,
                domEvent: IDomEventInstance;

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
        private __addMappedEvent(mappedEvent: string, useCapture?: boolean): IRemoveListener {
            var $document = this.$Document;
            $document.addEventListener(mappedEvent, this.__mappedEventListener, useCapture);

            return () => {
                $document.removeEventListener(mappedEvent, this.__mappedEventListener, useCapture);
            };
        }
        private __removeEventListener(element: ICustomElement, type: string, listener: IGestureListener,
            useCapture?: boolean): void {
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

            (<any>this._gestureCount)[countType]--;
            this.__unregisterElement(element, type);
        }
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

            if (isUndefined(ev.offsetX) || !isNull(this.__capturedTarget)) {
                ev.offset = this.__getOffset(ev);
                return;
            }

            ev.offset = {
                x: ev.offsetX,
                y: ev.offsetY
            };
        }
        private __getOffset(ev: IExtendedEvent): IPoint {
            var target = this.__capturedTarget || <any>ev.target;
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
                x: (ev.clientX - x),
                y: (ev.clientY - y)
            };
        }
        private __clearHold(): void {
            if (!isNull(this.__holdTimeout)) {
                clearTimeout(this.__holdTimeout);
                this.__holdTimeout = null;
            }
        }

        // utility methods

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
            var swipeTarget = <ICustomElement>this.__swipeOrigin.target,
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
                styleClasses: Array<IDefaultStyle>,
                classLength: number;
            
            if (this.$Compat.platCss) {
                return;
            } else if (!isNull($document.styleSheets) && $document.styleSheets.length > 0) {
                var styleSheet = <CSSStyleSheet>$document.styleSheets[0];
                styleClasses = DomEvents.config.styleConfig;
                classLength = styleClasses.length;
                while (classLength-- > 0) {
                    styleSheet.insertRule(this.__createStyle(styleClasses[classLength]), 0);
                }
                return;
            }

            var head = $document.head,
                style = <HTMLStyleElement>$document.createElement('style'),
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
        private __handleInput(target: HTMLInputElement) {
            var nodeName = target.nodeName;

            if (!isString(nodeName)) {
                return;
            }

            switch (nodeName.toLowerCase()) {
                case 'input':
                    switch (target.type) {
                        case 'range':
                            break;
                        case 'button':
                        case 'submit':
                        case 'checkbox':
                        case 'radio':
                        case 'file':
                            target.click();
                            break;
                        default:
                            target.focus();
                            break;
                    }
                    break;
                case 'button':
                case 'label':
                    target.click();
                    break;
                default:
                    target.focus();
                    break;
            }
        }
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
        count = 0;

        initialize(element: Node, event: string): void;
        initialize(element: Window, event: string): void;
        initialize(element: any, event: string) {
            this.element = element;
            this.event = event;
            this.count++;
        }

        trigger(ev: IPointerEvent): void {
            var customEv = <CustomEvent>this.$Document.createEvent('CustomEvent');
            this.__extendEventObject(customEv, ev);
            customEv.initCustomEvent(this.event, true, true, 0);
            this.element.dispatchEvent(customEv);
        }

        private __extendEventObject(customEv: IGestureEvent, ev: IPointerEvent) {
            // not using extend function because this gets called so often for certain events.
            var pointerType = ev.pointerType;

            customEv.clientX = ev.clientX;
            customEv.clientY = ev.clientY;
            customEv.offsetX = ev.offset.x;
            customEv.offsetY = ev.offset.y;
            customEv.direction = ev.direction || 'none';
            customEv.touches = ev.touches;
            customEv.velocity = ev.velocity || { x: 0, y: 0 };
            customEv.identifier = ev.identifier || 0;
            customEv.pointerType = isNumber(pointerType) ? this.__convertPointerType(pointerType, ev.type) : pointerType;
            customEv.screenX = ev.screenX;
            customEv.screenY = ev.screenY;
            customEv.pageX = ev.pageX;
            customEv.pageY = ev.pageY;
        }

        private __convertPointerType(pointerType: any, eventType: string) {
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
     * The Type for referencing the '$DomEventInstance' injectable as a dependency.
     */
    export function IDomEventInstance(): IDomEventInstance {
        return new DomEvent();
    }

    register.injectable(__DomEventInstance, IDomEventInstance, null, __INSTANCE);

    /**
     * Describes an object used for managing a single custom event.
     */
    export interface IDomEventInstance {
        /**
         * The node or window object associated with this IDomEventInstance object.
         */
        element: any;

        /**
         * The event type associated with this IDomEventInstance.
         */
        event: string;

        /**
         * The number of events registered to this IDomEventInstance.
         */
        count: number;

        /**
         * Initializes the element and event of the IDomEventInstance object
         * 
         * @param The node associated with this IDomEventInstance. 
         * @param event The type of event this IDomEventInstance is managing.
         */
        initialize(element: Node, event: string): void;
        /**
         * Initializes the element and event of the IDomEventInstance object
         * 
         * @param The window object. 
         * @param event The type of event this IDomEventInstance is managing.
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
         * The x and y-coordinates of the event as an object relative to the top-left corner of the 
         * offsetParent element that fires the event.
         */
        offset: IPoint;

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

        /**
         * The type of interaction associated with the touch event ('touch', 'pen', 'mouse', '')
         */
        pointerType?: string;

        /**
         * A unique touch identifier.
         */
        identifier?: number;
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
    export interface IEventSubscriber extends IGestures<IDomEventInstance> {
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
     * Describes an object containing a speed in both the horizontal and vertical directions.
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
     * Describes an object used for creating a custom class for styling an element 
     * listening for a custom DOM event.
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
}
