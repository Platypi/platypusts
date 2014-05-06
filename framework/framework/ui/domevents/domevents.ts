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
            intervals: {
                tapInterval: 300,
                holdInterval: 400,
                dblTapInterval: 300
            },
            distances: {
                minScrollDistance: 5,
                maxDblTapDistance: 20
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
        private __hasRelease = false;
        private __touchCount = 0;
        private __tapTimeout: number;
        private __holdTimeout: number;
        private __lastTouchDown: ITouch;
        private __lastTouchUp: ITouch;
        private __startEvents: Array<string>;
        private __moveEvents: Array<string>;
        private __endEvents: Array<string>;
        private __gestures: IGestures = {
            tap: 'tap',
            dbltap: 'dbltap',
            hold: 'hold',
            release: 'release',
            swipe: 'swipe'
        };
        private __gestureCount: IGestures = {
            tap: 0,
            dbltap: 0,
            hold: 0,
            release: 0,
            swipe: 0
        };
        private __listeners: IGestureListeners = {
            start: this._onTouchStart.bind(this),
            move: this._onMove.bind(this),
            end: this._onTouchEnd.bind(this)
        };
        constructor() {
            this.__determineTypes();
        }
        addEventListener(element: Node, type: string, listener: EventListener,
            useCapture?: boolean, options?: IDomEventConfig) {
            if (!isUndefined(element['on' + type])) {
                element.addEventListener(type, listener, useCapture);
                return;
            } else if (isUndefined(this.__gestureCount[type])) {
                return;
            }

            element.addEventListener(type, listener, useCapture);
            this.__registerElement(element, type, listener);
            this.__gestureCount[type]++;
        }
        removeEventListener(element: Node, type: string, listener: EventListener, useCapture?: boolean) {
            if (!isUndefined(element['on' + type])) {
                element.removeEventListener(type, listener, useCapture);
                return;
            } else if (isUndefined(this.__gestureCount[type])) {
                return;
            }

            this.__unregisterElement(element, type, listener);
            element.removeEventListener(type, listener, useCapture);
            this.__gestureCount[type]--;
        }
        dispose() {
            this.__unregisterTypes();

            this._elements = [];
            this._subscriptions = [];
        }

        _onTouchStart(ev: Event) {
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

            this.__lastTouchDown = {
                x: (<any>ev).clientX,
                y: (<any>ev).clientY,
                timeStamp: ev.timeStamp
            };

            var gestureCount = this.__gestureCount,
                noHolds = gestureCount.hold === 0,
                noRelease = gestureCount.release === 0;

            if (gestureCount.tap !== 0 || gestureCount.dbltap !== 0 || gestureCount.swipe !== 0) {
                this.__registerType(this.__MOVE);
                this.__detectMove = true;
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
                subscriber = this.__findFirstSubscriber(ev, this.__gestures.hold);
                subscribeFn = () => {
                    subscriber.hold.trigger(ev);
                    this.__holdTimeout = null;
                };
                
            } else {
                // has both
                subscriber = this.__findFirstSubscriber(ev, this.__gestures.hold);
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

        _onMove(ev: Event) {
            // return immediately if mouse event and currently in a touch
            if (this.__inTouch && ev.type.indexOf('mouse') !== -1) {
                return;
            }

            // clear hold
            this.__clearHold();

            var gestureCount = this.__gestureCount,
                noSwipe = gestureCount.swipe === 0;

            if (noSwipe && gestureCount.dbltap === 0 && gestureCount.tap === 0) {
                return;
            }

            var lastTouchDown = this.__lastTouchDown,
                x = (<any>ev).clientX,
                y = (<any>ev).clientY,
                distanceFromOrigin = this.__getDistance(x, lastTouchDown.x, y, lastTouchDown.y);

            if (distanceFromOrigin >= this.config.distances.minScrollDistance) {
                this.__hasMoved = true;
            }

            if (noSwipe) {
                return;
            }
        }

        _onTouchEnd(ev: Event) {
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

            var config = this.config,
                intervals = config.intervals,
                touchEnd = ev.timeStamp;
            
            if (this.__hasMoved || touchEnd - this.__lastTouchDown.timeStamp > intervals.tapInterval) {
                this.__touchCount = 0;
                return;
            }

            var lastTouchUp = this.__lastTouchUp,
                x = (<any>ev).clientX,
                y = (<any>ev).clientY;

            if (this.__touchCount > 0 &&
                this.__getDistance(x, lastTouchUp.x, y, lastTouchUp.y) <=
                config.distances.maxDblTapDistance &&
                touchEnd - lastTouchUp.timeStamp <= intervals.dblTapInterval) {
                this.__handleDbltap(ev);
            } else {
                this.__touchCount = 0;
            }

            this.__handleTap(ev);

            this.__lastTouchUp = {
                x: x,
                y: y,
                timeStamp: touchEnd
            };
        }

        private __handleTap(ev: Event) {
            this.__touchCount++;

            if (this.__gestureCount.tap === 0) {
                return;
            }

            var events = this.__gestures,
                tapSubscriber = this.__findFirstSubscriber(ev, events.tap);

            if (isNull(tapSubscriber)) {
                return;
            }

            var domEvent = tapSubscriber.tap;

            // fire tap event immediately if no dbltap zoom
            // or a mouse is being used
            if (!this.config.allowDblTapZoom ||
                (<any>ev).pointerType === 'mouse' ||
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
        private __handleDbltap(ev: Event) {
            this.__touchCount = 0;

            if (!isNull(this.__tapTimeout)) {
                clearTimeout(this.__tapTimeout);
                this.__tapTimeout = null;
            }

            if (this.__gestureCount.dbltap === 0) {
                return;
            }

            var subscriber = this.__findFirstSubscriber(ev, this.__gestures.dbltap);
            if (!isNull(subscriber)) {
                subscriber.dbltap.trigger(ev);
            }
        }
        private __handleRelease(ev: Event) {
            var subscriber = this.__findFirstSubscriber(ev, this.__gestures.release);
            if (!isNull(subscriber)) {
                subscriber.release.trigger(ev);
            }

            this.__hasRelease = false;
        }

        private __clearHold() {
            if (!isNull(this.__holdTimeout)) {
                clearTimeout(this.__holdTimeout);
                this.__holdTimeout = null;
            }
        }

        private __findFirstSubscriber(ev: Event, type: string): IGestureIndicator {
            var eventTarget = <Node>ev.target,
                elements = this._elements,
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
            if (!!navigator.pointerEnabled) {
                this.__startEvents = ['pointerdown'];
                this.__moveEvents = ['pointermove'];
                this.__endEvents = ['pointerup', 'pointercancel'];
                return;
            } else if (!!navigator.msPointerEnabled) {
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
        private __registerElement(element: Node, type: string, listener: EventListener) {
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
        }
        private __unregisterElement(element: Node, type: string, listener: EventListener) {
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
    }

    plat.register.injectable('$domEvents', DomEvents);

    export class DomEvent implements IDomEvent {
        $document: Document = acquire('$document');
        constructor(public element: Node, public event: string, public listener: EventListener) { }
        trigger(ev: Event) {
            var event = <CustomEvent>this.$document.createEvent('CustomEvent');
            event.initCustomEvent(this.event, true, true, ev);
            this.element.dispatchEvent(event);
        }
    }

    interface IGestureListeners extends IObject<EventListener> {
        start: EventListener;
        end: EventListener;
        move?: EventListener;
    }

    export interface IDomEvent {
        element: Node;
        event: string;
        listener: EventListener;
        trigger(ev: Event): void;
    }

    export interface IGestureIndicator {
        gestureCount: number;
        tap?: IDomEvent;
        dbltap?: IDomEvent;
        hold?: IDomEvent;
        release?: IDomEvent;
        swipe?: IDomEvent;
    }

    export interface IGestures {
        tap: any;
        dbltap: any;
        hold: any;
        release: any;
        swipe: any;
    }

    export interface IDomEventConfig {
        allowDblTapZoom: boolean;
        intervals: IIntervals;
        distances: IDistances;
    }

    export interface ITouch {
        x: number;
        y: number;
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

    export interface IDomEvents {
        hasTouch: boolean;
        config: IDomEventConfig;
        addEventListener: (element: Node, type: string, listener: EventListener,
            useCapture?: boolean, options?: IDomEventConfig) => void;
        removeEventListener: (element: Node, type: string, listener: EventListener,
            useCapture?: boolean) => void;
        dispose(): void;
    }
}
