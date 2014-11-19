module plat.events {
    /**
     * @name EventManager
     * @memberof plat.events
     * @kind class
     * @access public
     * 
     * @description
     * Manages dispatching events, handling all propagating events as well as any error handling.
     */
    export class EventManager {
        /**
         * @name $Compat
         * @memberof plat.events.EventManager
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.ICompat}
         * 
         * @description
         * Reference to the {@link plat.ICompat|ICompat} injectable.
         */
        static $Compat: ICompat;

        /**
         * @name $Document
         * @memberof plat.events.EventManager
         * @kind property
         * @access public
         * @static
         * 
         * @type {Document}
         * 
         * @description
         * Reference to the Document injectable.
         */
        static $Document: Document;

        /**
         * @name $Window
         * @memberof plat.events.EventManager
         * @kind property
         * @access public
         * @static
         * 
         * @type {Window}
         * 
         * @description
         * Reference to the Window injectable.
         */
        static $Window: Window;

        /**
         * @name $Dom
         * @memberof plat.events.EventManager
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.ui.IDom}
         * 
         * @description
         * Reference to the {@link plat.ui.IDom|IDom} injectable.
         */
        static $Dom: ui.IDom;

        /**
         * @name UP
         * @memberof plat.events.EventManager
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {string}
         * 
         * @description
         * An upward-moving event will start at the sender and move 
         * up the parent chain.
         */
        static UP = 'up';

        /**
         * @name DOWN
         * @memberof plat.events.EventManager
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {string}
         * 
         * @description
         * A downward-moving event will start at the sender and move 
         * to its children and beyond.
         */
        static DOWN = 'down';

        /**
         * @name DIRECT
         * @memberof plat.events.EventManager
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {string}
         * 
         * @description
         * Goes through all listeners for an event name, ignoring order.
         */
        static DIRECT = 'direct';

        /**
         * @name propagatingEvents
         * @memberof plat.events.EventManager
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.IObject<boolean>}
         * 
         * @description
         * Keeps track of which events are currently propagating.
         */
        static propagatingEvents: IObject<boolean> = {};

        /**
         * @name __eventsListeners
         * @memberof plat.events.EventManager
         * @kind property
         * @access private
         * @static
         * 
         * @type {plat.IObject<plat.events.IEventsListener>}
         * 
         * @description
         * Holds all the {@link plat.events.IEventsListener|event listeners} keyed by uid.
         */
        private static __eventsListeners: IObject<IEventsListener> = {};

        /**
         * @name __lifecycleEventListeners
         * @memberof plat.events.EventManager
         * @kind property
         * @access private
         * @static
         * 
         * @type {Array<{ name: string; value: () => void; }>}
         * 
         * @description
         * Holds all the event listeners for the application lifefycle events.
         */
        private static __lifecycleEventListeners: Array<{ name: string; value: () => void; }> = [];

        /**
         * @name __initialized
         * @memberof plat.events.EventManager
         * @kind property
         * @access private
         * @static
         * 
         * @type {boolean}
         * 
         * @description
         * whether or not the event manager has been initialized.
         */
        private static __initialized = false;

        /**
         * @name initialize
         * @memberof plat.events.EventManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Initializes the {@link plat.events.EventManager|EventManager}, creating the initial ALM event listeners.
         * 
         * @returns {void}
         */
        static initialize(): void {
            if (EventManager.__initialized) {
                return;
            }

            EventManager.__initialized = true;

            var lifecycleListeners = EventManager.__lifecycleEventListeners,
                length = lifecycleListeners.length,
                $compat = EventManager.$Compat,
                $document = EventManager.$Document,
                $dom = EventManager.$Dom,
                dispatch = LifecycleEvent.dispatch,
                listener: { name: string; value: () => void; };

            while (lifecycleListeners.length > 0) {
                listener = lifecycleListeners.pop();
                $document.removeEventListener(listener.name, listener.value, false);
            }

            if ($compat.cordova) {
                var eventNames = [__resume, __online, __offline],
                    event: string;

                length = eventNames.length;

                for (var i = 0; i < eventNames.length; ++i) {
                    event = eventNames[i];
                    lifecycleListeners.push({
                        name: event,
                        value: ((ev: string) => () => {
                            dispatch(ev, EventManager);
                        })(event)
                    });

                    $dom.addEventListener($document, event, lifecycleListeners[i].value, false);
                }

                lifecycleListeners.push({
                    name: __pause,
                    value: () => {
                        dispatch(__suspend, EventManager);
                    }
                });

                $dom.addEventListener($document, __pause, lifecycleListeners[lifecycleListeners.length - 1].value, false);

                lifecycleListeners.push({
                    name: __deviceReady,
                    value: () => {
                        dispatch(__ready, EventManager);
                    }
                });

                $dom.addEventListener($document, __deviceReady, lifecycleListeners[lifecycleListeners.length - 1].value, false);

                lifecycleListeners.push({
                    name: __backButton,
                    value: () => {
                        dispatch(__backButton, EventManager);
                    }
                });

                $dom.addEventListener($document, __backButton, lifecycleListeners[lifecycleListeners.length - 1].value, false);
            } else if ($compat.amd) {
                return;
            } else {
                $dom.addEventListener(EventManager.$Window, 'load', () => {
                    dispatch(__ready, EventManager, true);
                });
            }
        }

        /**
         * @name dispose
         * @memberof plat.events.EventManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Removes all event listeners for a given uid. Useful for garbage collection when 
         * certain objects that listen to events go out of scope.
         * 
         * @param {string} uid The uid for which the event listeners will be removed.'
         * 
         * @returns {void}
         */
        static dispose(uid: string): void {
            deleteProperty(EventManager.__eventsListeners, uid);
        }

        /**
         * @name on
         * @memberof plat.events.EventManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Registers a listener for a {@link plat.events.DispatchEvent|DispatchEvent}. The listener will be called when a {@link plat.events.DispatchEvent|DispatchEvent} is 
         * propagating over the given uid. Any number of listeners can exist for a single event name.
         * 
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName The name of the event to listen to.
         * @param {(ev: IDispatchEventInstance, ...args: any[]) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        static on(uid: string, eventName: string, listener: (ev: IDispatchEventInstance, ...args: any[]) => void,
            context?: any): IRemoveListener {
            var eventsListener = EventManager.__eventsListeners[uid];

            if (isNull(eventsListener)) {
                eventsListener = EventManager.__eventsListeners[uid] = {
                    listeners: {},
                    context: context
                };
            }

            var eventListeners = eventsListener.listeners[eventName];

            if (isNull(eventListeners)) {
                eventListeners = eventsListener.listeners[eventName] = [];
            }

            eventListeners.push(listener);

            return () => {
                var index = eventListeners.indexOf(listener);
                if (index === -1) {
                    return;
                }

                eventListeners.splice(index, 1);
            };
        }

        
        /**
         * @name dispatch
         * @memberof plat.events.EventManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Looks for listeners to a given event name, and fires the listeners using the specified
         * event direction.
         * 
         * @param {string} name The name of the event.
         * @param {any} sender The object sending the event.
         * @param {string} direction='up' Equivalent to {@link plat.events.EventManager.UP|EventManager.UP}.
         * @param {Array<any>} args? The arguments to send to the listeners.
         * 
         * @returns {void}
         */
        static dispatch(name: string, sender: any, direction: 'up', args?: Array<any>): void;
        /**
         * @name dispatch
         * @memberof plat.events.EventManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Looks for listeners to a given event name, and fires the listeners using the specified
         * event direction.
         * 
         * @param {string} name The name of the event.
         * @param {any} sender The object sending the event.
         * @param {string} direction='down' Equivalent to {@link plat.events.EventManager.DOWN|EventManager.DOWN}.
         * @param {Array<any>} args? The arguments to send to the listeners.
         * 
         * @returns {void}
         */
        static dispatch(name: string, sender: any, direction: 'down', args?: Array<any>): void;
        /**
         * @name dispatch
         * @memberof plat.events.EventManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Looks for listeners to a given event name, and fires the listeners using the specified
         * event direction.
         * 
         * @param {string} name The name of the event.
         * @param {any} sender The object sending the event.
         * @param {string} direction='direct' Equivalent to {@link plat.events.EventManager.DIRECT|EventManager.DIRECT}.
         * @param {Array<any>} args? The arguments to send to the listeners.
         * 
         * @returns {void}
         */
        static dispatch(name: string, sender: any, direction: 'direct', args?: Array<any>): void;
        /**
         * @name dispatch
         * @memberof plat.events.EventManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Looks for listeners to a given event name, and fires the listeners using the specified
         * event direction.
         * 
         * @param {string} name The name of the event.
         * @param {any} sender The object sending the event.
         * @param {string} direction The direction in which to send the event.
         * @param {Array<any>} args? The arguments to send to the listeners.
         * 
         * @returns {void}
         */
        static dispatch(name: string, sender: any, direction: string, args?: Array<any>): void;
        static dispatch(name: string, sender: any, direction: string, args?: Array<any>) {
            var $dispatchEvent: IDispatchEventInstance = acquire(__DispatchEventInstance);
            $dispatchEvent.initialize(name, sender, direction);
            EventManager.sendEvent($dispatchEvent, args);
        }

        /**
         * @name hasDirection
         * @memberof plat.events.EventManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Returns whether or not the given string is a registered direction.
         * 
         * @param {string} direction The direction of the event
         * 
         * @returns {boolean} Whether or not the direction is valid.
         */
        static hasDirection(direction: string): boolean {
            return (direction === EventManager.UP ||
                direction === EventManager.DOWN ||
                direction === EventManager.DIRECT);
        }

        /**
         * @name sendEvent
         * @memberof plat.events.EventManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Determines the appropriate direction and dispatches the event accordingly.
         * 
         * @param {plat.events.IDispatchEventInstance} event The {@link plat.events.DispatchEvent|DispatchEvent} to send
         * @param {Array<any>} args The arguments associated with the event
         * 
         * @returns {void}
         */
        static sendEvent(event: IDispatchEventInstance, args?: Array<any>): void {
            var name = event.name,
                direction = event.direction;

            args = args || [];

            EventManager.propagatingEvents[name] = true;
            args = args || [];

            switch (direction) {
                case EventManager.UP:
                    EventManager._dispatchUp(event, args);
                    break;
                case EventManager.DOWN:
                    EventManager._dispatchDown(event, args);
                    break;
                case EventManager.DIRECT:
                    EventManager._dispatchDirect(event, args);
                    break;
            }

            deleteProperty(EventManager.propagatingEvents, name);
        }

        /**
         * @name _dispatchUp
         * @memberof plat.events.EventManager
         * @kind function
         * @access protected
         * @static
         * 
         * @description
         * Dispatches the event up the control chain.
         * 
         * @param {plat.events.IDispatchEventInstance} event The event being dispatched.
         * @param {Array<any>} args The arguments associated with the event.
         * 
         * @returns {void}
         */
        protected static _dispatchUp(event: IDispatchEventInstance, args: Array<any>): void {
            var name = event.name,
                parent = event.sender;

            while (!isNull(parent) && EventManager.propagatingEvents[name]) {
                if (isNull(parent.uid)) {
                    continue;
                }
                EventManager.__executeEvent(parent.uid, event, args);
                parent = parent.parent;
            }
        }

        /**
         * @name _dispatchDown
         * @memberof plat.events.EventManager
         * @kind function
         * @access protected
         * @static
         * 
         * @description
         * Dispatches the event down the control chain.
         * 
         * @param {plat.events.IDispatchEventInstance} event The event being dispatched.
         * @param {Array<any>} args The arguments associated with the event.
         * 
         * @returns {void}
         */
        protected static _dispatchDown(event: IDispatchEventInstance, args: Array<any>): void {
            var controls: Array<IControl> = [],
                control: IControl,
                name = event.name;

            controls.push(event.sender);

            while (controls.length && EventManager.propagatingEvents[name]) {
                control = controls.pop();

                if (isNull(control.uid)) {
                    continue;
                }

                EventManager.__executeEvent(control.uid, event, args);

                if (isNull((<ui.ITemplateControl>control).controls)) {
                    continue;
                }

                controls = controls.concat((<ui.ITemplateControl>control).controls);
            }
        }

        /**
         * @name _dispatchDirect
         * @memberof plat.events.EventManager
         * @kind function
         * @access protected
         * @static
         * 
         * @description
         * Dispatches the event directly to all listeners.
         * 
         * @param {plat.events.IDispatchEventInstance} event The event being dispatched.
         * @param {Array<any>} args The arguments associated with the event.
         * 
         * @returns {void}
         */
        protected static _dispatchDirect(event: IDispatchEventInstance, args: Array<any>): void {
            var uids = Object.keys(EventManager.__eventsListeners),
                length = uids.length,
                name = event.name,
                eventsListener: IEventsListener;

            for (var i = 0; i < length; ++i) {
                if (!EventManager.propagatingEvents[name]) {
                    break;
                }

                eventsListener = EventManager.__eventsListeners[uids[i]];

                if (isNull(eventsListener) || isNull(eventsListener.listeners[name])) {
                    continue;
                }

                EventManager.__callListeners(eventsListener.context, event, eventsListener.listeners[name], args);
            }
        }

        /**
         * @name __executeEvent
         * @memberof plat.events.EventManager
         * @kind function
         * @access private
         * @static
         * 
         * @description
         * Dispatches the event to the listeners for the given uid.
         * 
         * @param {string} uid The uid used to find the event listeners.
         * @param {plat.events.IDispatchEventInstance} The event.
         * @param {Array<any>} args The arguments to send to the listeners.
         * 
         * @returns {void}
         */
        private static __executeEvent(uid: string, ev: IDispatchEventInstance, args: Array<any>): void {
            var eventsListener = EventManager.__eventsListeners[uid];

            if (isNull(eventsListener)) {
                return;
            }
            var context = eventsListener.context,
                listeners = eventsListener.listeners[ev.name];

            if (isNull(listeners)) {
                return;
            }

            EventManager.__callListeners(context, ev, listeners, args);
        }

        /**
         * @name __callListeners
         * @memberof plat.events.EventManager
         * @kind function
         * @access private
         * @static
         * 
         * @description
         * Calls event listeners with the given context, event, and arguments.
         * 
         * @param {any} context The context with which to call the listeners.
         * @param {plat.events.IDispatchEventInstance} The event.
         * @param {Array<(ev: IDispatchEventInstance, ...args: any[]) => void>} The event listeners.
         * @param {Array<any>} args The arguments to send to the listeners.
         * 
         * @returns {void}
         */
        private static __callListeners(context: any, ev: IDispatchEventInstance,
            listeners: Array<(ev: IDispatchEventInstance, ...args: any[]) => void>, args: Array<any>): void {
            var name = ev.name,
                length = listeners.length,
                index = -1;

            args = [ev].concat(args);

            while (++index < length && EventManager.propagatingEvents[name]) {
                try {
                    listeners[index].apply(context, args);
                } catch (e) {
                    var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                    $exception.warn(e, $exception.EVENT);
                }
            }
        }
    }

    /**
     * The Type for referencing the '$EventManagerStatic' injectable as a dependency.
     */
    export function IEventManagerStatic(
        $Compat?: ICompat,
        $Document?: Document,
        $Window?: Window,
        $Dom?: ui.IDom): IEventManagerStatic {
            EventManager.$Compat = $Compat;
            EventManager.$Document = $Document;
            EventManager.$Window = $Window;
            EventManager.$Dom = $Dom;
            return EventManager;
    }

    register.injectable(__EventManagerStatic, IEventManagerStatic, [
        __Compat,
        __Document,
        __Window,
        __Dom
    ], __STATIC);

    /**
     * @name IEventManagerStatic
     * @memberof plat.events
     * @kind interface
     * @access public
     * 
     * @description
     * Manages dispatching events, handling all propagating events as well as any error handling.
     */
    export interface IEventManagerStatic {
        /**
         * @name $Compat
         * @memberof plat.events.IEventManagerStatic
         * @kind property
         * @access public
         * @static
         *
         * @type {plat.ICompat}
         *
         * @description
         * Reference to the {@link plat.ICompat|ICompat} injectable.
         */
        $Compat: ICompat;

        /**
         * @name $Document
         * @memberof plat.events.IEventManagerStatic
         * @kind property
         * @access public
         * @static
         *
         * @type {Document}
         *
         * @description
         * Reference to the Document injectable.
         */
        $Document: Document;

        /**
         * @name $Window
         * @memberof plat.events.IEventManagerStatic
         * @kind property
         * @access public
         * @static
         *
         * @type {Window}
         *
         * @description
         * Reference to the Window injectable.
         */
        $Window: Window;

        /**
         * @name $Dom
         * @memberof plat.events.IEventManagerStatic
         * @kind property
         * @access public
         * @static
         *
         * @type {plat.ui.IDom}
         *
         * @description
         * Reference to the {@link plat.ui.IDom|IDom} injectable.
         */
        $Dom: ui.IDom;

        /**
         * @name UP
         * @memberof plat.events.IEventManagerStatic
         * @kind property
         * @access public
         * @static
         * @readonly
         *
         * @type {string}
         *
         * @description
         * An upward-moving event will start at the sender and move
         * up the parent chain.
         */
        UP: string;

        /**
         * @name DOWN
         * @memberof plat.events.IEventManagerStatic
         * @kind property
         * @access public
         * @static
         * @readonly
         *
         * @type {string}
         *
         * @description
         * A downward-moving event will start at the sender and move
         * to its children and beyond.
         */
        DOWN: string;

        /**
         * @name DIRECT
         * @memberof plat.events.IEventManagerStatic
         * @kind property
         * @access public
         * @static
         * @readonly
         *
         * @type {string}
         *
         * @description
         * Goes through all listeners for an event name, ignoring order.
         */
        DIRECT: string;

        /**
         * @name propagatingEvents
         * @memberof plat.events.IEventManagerStatic
         * @kind property
         * @access public
         * @static
         *
         * @type {plat.IObject<boolean>}
         *
         * @description
         * Keeps track of which events are currently propagating.
         */
        propagatingEvents: IObject<boolean>;

        /**
         * @name initialize
         * @memberof plat.events.IEventManagerStatic
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Initializes the {@link plat.events.EventManager|EventManager}, creating the initial ALM event listeners.
         * 
         * @returns {void}
         */
        initialize(): void;

        /**
         * @name dispose
         * @memberof plat.events.IEventManagerStatic
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Removes all event listeners for a given uid. Useful for garbage collection when 
         * certain objects that listen to events go out of scope.
         * 
         * @param {string} uid The uid for which the event listeners will be removed.'
         * 
         * @returns {void}
         */
        dispose(uid: string): void;

        /**
         * @name on
         * @memberof plat.events.IEventManagerStatic
         * @kind function
         * @access public
         * @static
         * @variation 0
         * 
         * @description
         * Registers a listener for the beforeNavigate Event. The listener will be called when the beforeNavigate 
         * event is propagating over the given uid. Any number of listeners can exist for a single event name. The 
         * listener can chose to cancel the event using ev.cancel(), preventing any navigation as well as further 
         * calls to event listeners.
         * 
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName='beforeNavigate' The name of the event to listen to.
         * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: 'beforeNavigate',
            listener: (ev: INavigationEvent<any>) => void, context?: any): IRemoveListener;
        /**
         * @name on
         * @memberof plat.events.IEventManagerStatic
         * @kind function
         * @access public
         * @static
         * @variation 1
         * 
         * @description
         * Registers a listener for the navigating Event. The listener will be called when the navigating 
         * event is propagating over the given uid. Any number of listeners can exist for a single event name.
         * The listener can chose to cancel the event using ev.cancel(), preventing any navigation as well as further 
         * calls to event listeners.
         * 
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName='navigating' Specifies that this is a listener for the navigating event.
         * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: 'navigating',
            listener: (ev: INavigationEvent<any>) => void, context?: any): IRemoveListener;
        /**
         * @name on
         * @memberof plat.events.IEventManagerStatic
         * @kind function
         * @access public
         * @static
         * @variation 2
         * 
         * @description
         * Registers a listener for the navigated Event. The listener will be called when the navigated 
         * event is propagating over the given uid. Any number of listeners can exist for a single event name.
         * The listener cannot cancel the event.
         * 
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName='navigated' Specifies that this is a listener for the navigated event.
         * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: 'navigated',
            listener: (ev: INavigationEvent<any>) => void, context?: any): IRemoveListener;
        /**
         * @name on
         * @memberof plat.events.IEventManagerStatic
         * @kind function
         * @access public
         * @static
         * @variation 3
         * 
         * @description
         * Registers a listener for a NavigationEvent. The listener will be called when a NavigationEvent is
         * propagating over the given uid. Any number of listeners can exist for a single event name.
         * 
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName The name of the event to listen to.
         * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: string, listener: (ev: INavigationEvent<any>) => void,
            context?: any): IRemoveListener;
        /**
         * @name on
         * @memberof plat.events.IEventManagerStatic
         * @kind function
         * @access public
         * @static
         * @variation 4
         * 
         * @description
         * Registers a listener for the ready AlmEvent. The ready event will be called when the app 
         * is ready to start.
         * 
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName='ready' Specifies that the listener is for the ready event.
         * @param {(ev: plat.events.ILifecycleEvent) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: 'ready', listener: (ev: ILifecycleEvent) => void,
            context?: any): IRemoveListener;
        /**
         * @name on
         * @memberof plat.events.IEventManagerStatic
         * @kind function
         * @access public
         * @static
         * @variation 5
         * 
         * @description
         * Registers a listener for the suspend AlmEvent. The listener will be called when an app 
         * is being suspended.
         * 
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName='suspend' Specifies the listener is for the suspend event.
         * @param {(ev: plat.events.ILifecycleEvent) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: 'suspend', listener: (ev: ILifecycleEvent) => void,
            context?: any): IRemoveListener;
        /**
         * @name on
         * @memberof plat.events.IEventManagerStatic
         * @kind function
         * @access public
         * @static
         * @variation 6
         * 
         * @description
         * Registers a listener for the resume AlmEvent. The listener will be called when an app 
         * is being resumeed.
         * 
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName='suspend' Specifies the listener is for the resume event.
         * @param {(ev: plat.events.ILifecycleEvent) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: 'resume', listener: (ev: ILifecycleEvent) => void,
            context?: any): IRemoveListener;
        /**
         * @name on
         * @memberof plat.events.IEventManagerStatic
         * @kind function
         * @access public
         * @static
         * @variation 7
         * 
         * @description
         * Registers a listener for the online AlmEvent. This event fires when the app's network 
         * connection changes to be online.
         * 
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName='online' Specifies the listener is for the online event.
         * @param {(ev: plat.events.ILifecycleEvent) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: 'online', listener: (ev: ILifecycleEvent) => void,
            context?: any): IRemoveListener;
        /**
         * @name on
         * @memberof plat.events.IEventManagerStatic
         * @kind function
         * @access public
         * @static
         * @variation 8
         * 
         * @description
         * Registers a listener for the offline AlmEvent. This event fires when the app's network 
         * connection changes to be offline.
         * 
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName='offline' Specifies the listener is for the offline event.
         * @param {(ev: plat.events.ILifecycleEvent) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: 'offline', listener: (ev: ILifecycleEvent) => void,
            context?: any): IRemoveListener;
        /**
         * @name on
         * @memberof plat.events.IEventManagerStatic
         * @kind function
         * @access public
         * @static
         * @variation 9
         * 
         * @description
         * Registers a listener for an AlmEvent. The listener will be called when an AlmEvent is
         * propagating over the given uid. Any number of listeners can exist for a single event name.
         * 
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName The name of the event to listen to.
         * @param {(ev: plat.events.ILifecycleEvent) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: string, listener: (ev: ILifecycleEvent) => void,
            context?: any): IRemoveListener;
        /**
         * @name on
         * @memberof plat.events.IEventManagerStatic
         * @kind function
         * @access public
         * @static
         * @variation 10
         * 
         * @description
         * Registers a listener for a ErrorEvent. The listener will be called when a ErrorEvent is
         * propagating over the given uid. Any number of listeners can exist for a single event name.
         * 
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName The name of the event to listen to.
         * @param {(ev: plat.events.IErrorEvent<Error>) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: 'error', listener: (ev: IErrorEvent<Error>) => void,
            context?: any): IRemoveListener;
        /**
         * @name on
         * @memberof plat.events.IEventManagerStatic
         * @kind function
         * @access public
         * @static
         * @variation 11
         * 
         * @description
         * Registers a listener for a ErrorEvent. The listener will be called when a ErrorEvent is
         * propagating over the given uid. Any number of listeners can exist for a single event name.
         * 
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName The name of the event to listen to.
         * @param {(ev: plat.events.IErrorEvent<any>) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: string, listener: (ev: IErrorEvent<any>) => void,
            context?: any): IRemoveListener;
        /**
         * @name on
         * @memberof plat.events.IEventManagerStatic
         * @kind function
         * @access public
         * @static
         * @variation 12
         * 
         * @description
         * Registers a listener for a DispatchEvent. The listener will be called when a DispatchEvent is
         * propagating over the given uid. Any number of listeners can exist for a single event name.
         * 
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName The name of the event to listen to.
         * @param {(ev: plat.events.IDispatchEventInstance, ...args: any[]) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: string, listener: (ev: IDispatchEventInstance, ...args: any[]) => void,
            context?: any): IRemoveListener;

        /**
         * @name dispatch
         * @memberof plat.events.IEventManagerStatic
         * @kind function
         * @access public
         * @static
         *
         * @description
         * Looks for listeners to a given event name, and fires the listeners using the specified
         * event direction.
         *
         * @param {string} name The name of the event.
         * @param {any} sender The object sending the event.
         * @param {string} direction='up' Equivalent to {@link plat.events.EventManager.UP|EventManager.UP}.
         * @param {Array<any>} args? The arguments to send to the listeners.
         *
         * @returns {void}
         */
        dispatch(name: string, sender: any, direction: 'up', args?: Array<any>): void;
        /**
         * @name dispatch
         * @memberof plat.events.IEventManagerStatic
         * @kind function
         * @access public
         * @static
         *
         * @description
         * Looks for listeners to a given event name, and fires the listeners using the specified
         * event direction.
         *
         * @param {string} name The name of the event.
         * @param {any} sender The object sending the event.
         * @param {string} direction='down' Equivalent to {@link plat.events.EventManager.DOWN|EventManager.DOWN}.
         * @param {Array<any>} args? The arguments to send to the listeners.
         *
         * @returns {void}
         */
        dispatch(name: string, sender: any, direction: 'down', args?: Array<any>): void;
        /**
         * @name dispatch
         * @memberof plat.events.IEventManagerStatic
         * @kind function
         * @access public
         * @static
         *
         * @description
         * Looks for listeners to a given event name, and fires the listeners using the specified
         * event direction.
         *
         * @param {string} name The name of the event.
         * @param {any} sender The object sending the event.
         * @param {string} direction='direct' Equivalent to {@link plat.events.EventManager.DIRECT|EventManager.DIRECT}.
         * @param {Array<any>} args? The arguments to send to the listeners.
         *
         * @returns {void}
         */
        dispatch(name: string, sender: any, direction: 'direct', args?: Array<any>): void;
        /**
         * @name dispatch
         * @memberof plat.events.IEventManagerStatic
         * @kind function
         * @access public
         * @static
         *
         * @description
         * Looks for listeners to a given event name, and fires the listeners using the specified
         * event direction.
         *
         * @param {string} name The name of the event.
         * @param {any} sender The object sending the event.
         * @param {string} direction The direction in which to send the event.
         * @param {Array<any>} args? The arguments to send to the listeners.
         *
         * @returns {void}
         */
        dispatch(name: string, sender: any, direction: string, args?: Array<any>): void;

        /**
         * @name hasDirection
         * @memberof plat.events.IEventManagerStatic
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Returns whether or not the given string is a registered direction.
         * 
         * @param {string} direction The direction of the event
         * 
         * @returns {boolean} Whether or not the direction is valid.
         */
        hasDirection(direction: string): boolean;

        /**
         * @name sendEvent
         * @memberof plat.events.IEventManagerStatic
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Determines the appropriate direction and dispatches the event accordingly.
         * 
         * @param {plat.events.IDispatchEventInstance} event The {@link plat.events.DispatchEvent|DispatchEvent} to send
         * @param {Array<any>} args The arguments associated with the event
         * 
         * @returns {void}
         */
        sendEvent(event: IDispatchEventInstance, args?: Array<any>): void;
    }

    /**
     * @name IEventsListener
     * @memberof plat.events
     * @kind interface
     * @access public
     * 
     * @description
     * An object that contains event listeners.
     */
    interface IEventsListener {
        /**
         * @name listeners
         * @memberof plat.events.IEventsListener
         * @kind property
         * @access public
         * @static
         *
         * @type {plat.IObject<Array<(ev: plat.events.IDispatchEventInstance, ...args: any[]) => void>>}
         *
         * @description
         * An IObject of listener arrays, keyed by event name.
         */
        listeners: IObject<Array<(ev: IDispatchEventInstance, ...args: any[]) => void>>;
        
        /**
         * @name context
         * @memberof plat.events.IEventsListener
         * @kind property
         * @access public
         * @static
         *
         * @type {any}
         *
         * @description
         * The context with which to call each event listener.
         */
        context: any;
    }
}
