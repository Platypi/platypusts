module plat.ui {
    /**
     * A class for managing dom event registration and handling.
     */
    export class DomEvents implements IDomEvents {
        $window: Window = acquire('$window');
        $document: Document = acquire('$document');

        hasTouch = ('ontouchstart' in this.$window);
        config: IDomEventConfig = {
            allowDblTapZoom: false,
            allowTextSelection: false,
            intervals: {
                tapInterval: 300,
                holdInterval: 400,
                dblTapInterval: 300
            },
            distances: {
                minScrollDistance: 5,
                maxDblTapDistance: 20
            },
            velocities: {
                swipeVelocity: 0.5
            }
        };

        _elements: Array<Node> = [];
        _subscriptions: Array<IGestureIndicator> = [];

        private __START = 'start';
        private __MOVE = 'move';
        private __END = 'end';
        private __inTouch = false;
        private __isReady = false;
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
        private __startEvents: Array<string>;
        private __moveEvents: Array<string>;
        private __endEvents: Array<string>;
        private __gestures: IGestures = {
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
        private __gestureCount: IGestures = {
            tap: 0,
            dbltap: 0,
            hold: 0,
            release: 0,
            swipe: 0,
            track: 0
        };
        private __listeners: IDocumentListeners = {
            start: this._onTouchStart.bind(this),
            move: this._onMove.bind(this),
            end: this._onTouchEnd.bind(this)
        };
        constructor() {
            this.__determineTypes();
        }
        addEventListener(element: Node, type: string, listener: IGestureListener,
            useCapture?: boolean, options?: IDomEventConfig) {
            var gestures = this.__gestures;
            if (!isUndefined(element['on' + type])) {
                element.addEventListener(type, listener, useCapture);
                return;
            } else if (isUndefined(gestures[type])) {
                return;
            }

            element.addEventListener(type, listener, useCapture);

            var swipeGesture = gestures.swipe,
                trackGesture = gestures.track,
                removeSelect = false,
                countType = type;

            if (type.indexOf(trackGesture) !== -1) {
                countType = trackGesture;
                removeSelect = !(this.__noSelect || this.config.allowTextSelection);
                this.__moveEventCount++;
            } else if (type.indexOf(swipeGesture) !== -1) {
                countType = swipeGesture;
                removeSelect = !(this.__noSelect || this.config.allowTextSelection);
                this.__moveEventCount++;
            }

            this.__registerElement(element, type, listener, removeSelect);
            this.__gestureCount[countType]++;
        }
        removeEventListener(element: Node, type: string, listener: IGestureListener, useCapture?: boolean) {
            var gestures = this.__gestures;
            if (!isUndefined(element['on' + type])) {
                element.removeEventListener(type, listener, useCapture);
                return;
            } else if (isUndefined(gestures[type])) {
                return;
            }

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

            this.__unregisterElement(element, type, listener, (this.__moveEventCount <= 0 && !this.config.allowTextSelection));
            this.__gestureCount[countType]--;
        }
        dispose() {
            this.__unregisterTypes();

            this.__gestureCount = {
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
            this.__isReady = false;
            this.__noSelect = false;
            this.__swipeOrigin = null;
            this.__lastMoveEvent = null;
            this.__lastTouchDown = null;
            this.__lastTouchUp = null;
        }

        _onTouchStart(ev: ITouchEvent) {
            var eventType = ev.type.toLowerCase();

            // return immediately if mouse event and currently in a touch
            if (this.__inTouch && eventType.indexOf('mouse') !== -1) {
                return;
            }

            if (eventType.indexOf('pointer') !== -1) {
                // do pointer stuff
                this.__inTouch = true;
            } else if (eventType.indexOf('touch') !== -1) {
                // do touch stuff
                this.__inTouch = true;
            } else {
                // do mouse stuff
            }

            this.__hasMoved = false;

            this.__lastTouchDown = this.__swipeOrigin = {
                x: ev.clientX,
                y: ev.clientY,
                target: ev.target,
                timeStamp: ev.timeStamp
            };

            var gestureCount = this.__gestureCount,
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

            var subscriber: IGestureIndicator,
                subscribeFn;
            if (noHolds) {
                this.__holdTimeout = setTimeout(() => {
                    this.__hasRelease = true;
                }, this.config.intervals.holdInterval);

                return;
            } else if (noRelease) {
                subscriber = this.__findFirstSubscriber(<Node>ev.target, this.__gestures.hold);
                subscribeFn = () => {
                    subscriber.hold.trigger(ev);
                    this.__holdTimeout = null;
                };
                
            } else {
                // has both
                subscriber = this.__findFirstSubscriber(<Node>ev.target, this.__gestures.hold);
                subscribeFn = () => {
                    subscriber.hold.trigger(ev);
                    this.__hasRelease = true;
                    this.__holdTimeout = null;
                };
            }

            if (!isNull(subscriber)) {
                this.__holdTimeout = setTimeout(subscribeFn, this.config.intervals.holdInterval);
            }
        }

        _onMove(ev: ITouchEvent) {
            // return immediately if mouse event and currently in a touch
            if (!this.__detectMove || (this.__inTouch && ev.type.indexOf('mouse') !== -1)) {
                return;
            }

            // clear hold
            this.__clearHold();

            var gestureCount = this.__gestureCount,
                noTracking = gestureCount.track <= 0,
                noMoveEvents = gestureCount.swipe <= 0 && noTracking,
                noTapEvents = gestureCount.dbltap <= 0 && gestureCount.tap <= 0;

            if (noMoveEvents && noTapEvents) {
                return;
            }

            var config = this.config,
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

            this.__hasSwiped = (this.__isHorizontal(direction) ? velocity.x : velocity.y) >= config.velocities.swipeVelocity;

            if (!noTracking) {
                this.__handleTrack(ev);
            }

            this.__lastMoveEvent = ev;
        }

        _onTouchEnd(ev: ITouchEvent) {
            // return immediately if mouse event and currently in a touch
            if (this.__inTouch && ev.type.indexOf('mouse') !== -1) {
                return;
            }

            this.__clearHold();
            this.__inTouch = false;

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

            var config = this.config,
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

        private __handleTap(ev: ITouchEvent) {
            this.__touchCount++;

            if (this.__gestureCount.tap <= 0) {
                return;
            }

            var events = this.__gestures,
                tapSubscriber = this.__findFirstSubscriber(<Node>ev.target, events.tap);

            if (isNull(tapSubscriber)) {
                return;
            }

            var domEvent = tapSubscriber.tap;

            // fire tap event immediately if no dbltap zoom
            // or a mouse is being used
            if (!this.config.allowDblTapZoom ||
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
            }, this.config.intervals.dblTapInterval);
            
        }
        private __handleDbltap(ev: ITouchEvent) {
            this.__touchCount = 0;

            if (!isNull(this.__tapTimeout)) {
                clearTimeout(this.__tapTimeout);
                this.__tapTimeout = null;
            }

            if (this.__gestureCount.dbltap <= 0) {
                return;
            }

            var subscriber = this.__findFirstSubscriber(<Node>ev.target, this.__gestures.dbltap);
            if (!isNull(subscriber)) {
                subscriber.dbltap.trigger(ev);
                // set touch count to -1 to prevent repeated fire on sequential taps
                this.__touchCount = -1;
            }
        }
        private __handleRelease(ev: ITouchEvent) {
            var subscriber = this.__findFirstSubscriber(<Node>ev.target, this.__gestures.release);
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

            var gestures = this.__gestures,
                swipeGesture = gestures.swipe,
                direction = lastMove.direction,
                velocity = lastMove.velocity,
                swipeDirectionGesture = swipeGesture + direction,
                eventTarget = <Node>this.__lastTouchDown.target,
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
            var gestures = this.__gestures,
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
        private __determineTypes() {
            var navigator = this.$window.navigator;
            if (navigator.pointerEnabled) {
                this.__startEvents = ['pointerdown'];
                this.__moveEvents = ['pointermove'];
                this.__endEvents = ['pointerup', 'pointercancel'];
                return;
            } else if (navigator.msPointerEnabled) {
                this.__startEvents = ['MSPointerDown'];
                this.__moveEvents = ['MSPointerMove'];
                this.__endEvents = ['MSPointerUp', 'MSPointerCancel'];
                return;
            } else if (this.hasTouch) {
                this.__startEvents = ['touchstart', 'mousedown'];
                this.__moveEvents = ['touchmove', 'mousemove'];
                this.__endEvents = ['touchend', 'touchcancel', 'mouseup'];
                return;
            }

            this.__startEvents = ['mousedown'];
            this.__moveEvents = ['mousemove'];
            this.__endEvents = ['mouseup'];
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
                    events = this.__startEvents;
                    break;
                case this.__MOVE:
                    events = this.__moveEvents;
                    break;
                case this.__END:
                    events = this.__endEvents;
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
                    events = this.__startEvents;
                    break;
                case this.__MOVE:
                    events = this.__moveEvents;
                    break;
                case this.__END:
                    events = this.__endEvents;
                    break;
                default:
                    return;
            }

            var index = events.length;
            while (index-- > 0) {
                $document.removeEventListener(events[index], listener, false);
            }
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
        private __registerElement(element: Node, type: string, listener: IGestureListener, removeSelect: boolean) {
            var index = this._elements.indexOf(element),
                domEvent = <IDomEvent>new DomEvent(element, type, listener),
                gesture = { gestureCount: 1 };

            gesture[type] = domEvent;

            // check if DomEvents is ready
            if (!this.__isReady) {
                this.__registerTypes();
                this.__isReady = true;
            }

            if (index === -1) {
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
        private __removeElement(index: number) {
            var elements = this._elements;
            elements.splice(index, 1);

            // check if no elements are left listening
            if (elements.length === 0) {
                this.__unregisterTypes();
                this.__isReady = false;
            }
        }
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

    export class DomEvent implements IDomEvent {
        $document: Document = acquire('$document');
        constructor(public element: Node, public event: string, public listener: IGestureListener) { }
        trigger(ev: ITouchEvent) {
            var event = <CustomEvent>this.$document.createEvent('CustomEvent');
            event.initCustomEvent(this.event, true, true, ev);
            this.element.dispatchEvent(event);
        }
    }

    interface IDocumentListeners extends IObject<EventListener> {
        start: EventListener;
        end: EventListener;
        move?: EventListener;
    }

    export interface IDomEvent {
        element: Node;
        event: string;
        listener: IGestureListener;
        trigger(ev: ITouchEvent): void;
    }

    export interface IExtendedEvent extends Event {
        clientX?: number;
        clientY?: number;
        direction?: string;
        velocity?: IVelocity;
    }

    export interface ITouchEvent extends IExtendedEvent {
        pointerType?: string;
    }

    export interface IGestureEvent extends CustomEvent {
        detail: IExtendedEvent;
    }

    export interface IGestureListener {
        (ev: IGestureEvent): void;
    }

    export interface IGestureIndicator {
        gestureCount: number;
        tap?: IDomEvent;
        dbltap?: IDomEvent;
        hold?: IDomEvent;
        release?: IDomEvent;
        swipe?: IDomEvent;
        swipeleft?: IDomEvent;
        swiperight?: IDomEvent;
        swipeup?: IDomEvent;
        swipedown?: IDomEvent;
        track?: IDomEvent;
        trackleft?: IDomEvent;
        trackright?: IDomEvent;
        trackup?: IDomEvent;
        trackdown?: IDomEvent;
    }

    export interface IGestures {
        tap: any;
        dbltap: any;
        hold: any;
        release: any;
        swipe: any;
        swipeleft?: any;
        swiperight?: any;
        swipeup?: any;
        swipedown?: any;
        track: any;
        trackleft?: any;
        trackright?: any;
        trackup?: any;
        trackdown?: any;
    }

    export interface IDomEventConfig {
        allowDblTapZoom: boolean;
        allowTextSelection: boolean;
        intervals: IIntervals;
        distances: IDistances;
        velocities: IVelocities;
    }

    export interface IVelocity {
        x: number;
        y: number;
    }

    export interface ITouchPoint {
        x: number;
        y: number;
        target: EventTarget;
        timeStamp: number;
    }

    export interface IIntervals {
        tapInterval: number;
        holdInterval: number;
        dblTapInterval: number;
    }

    export interface IDistances {
        minScrollDistance: number;
        maxDblTapDistance: number;
    }

    export interface IVelocities {
        swipeVelocity: number;
    }

    export interface IDomEvents {
        hasTouch: boolean;
        config: IDomEventConfig;
        addEventListener: (element: Node, type: string, listener: IGestureListener,
            useCapture?: boolean, options?: IDomEventConfig) => void;
        removeEventListener: (element: Node, type: string, listener: IGestureListener,
            useCapture?: boolean) => void;
        dispose(): void;
    }
}
