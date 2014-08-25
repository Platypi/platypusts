module plat.events {
    /**
     * @name EventManager
     * @memberof plat.events
     * @kind class
     * @access public
     * 
     * @description
     * Event object for a control dispatch event. Contains information about the type of event.
     * Propagation of the event always starts at the sender, allowing a control to both 
     * initialize and consume an event. If a consumer of an event throws an error while 
     * handling the event it will be logged to the app using exception.warn. Errors will 
     * not stop propagation of the event.
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
         * Reference to the {@link plat.Document|Document} injectable.
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
         * Reference to the {@link plat.Window|Window} injectable.
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
                var eventNames = ['resume', 'online', 'offline'],
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
                    name: 'pause',
                    value: () => {
                        dispatch('suspend', EventManager);
                    }
                });

                $dom.addEventListener($document, 'pause', lifecycleListeners[lifecycleListeners.length - 1].value, false);

                lifecycleListeners.push({
                    name: 'deviceReady',
                    value: () => {
                        dispatch('ready', EventManager);
                    }
                });

                $dom.addEventListener($document, 'deviceReady', lifecycleListeners[lifecycleListeners.length - 1].value, false);

                lifecycleListeners.push({
                    name: 'backbutton',
                    value: () => {
                        dispatch('goBack', EventManager);
                    }
                });

                $dom.addEventListener($document, 'backbutton', lifecycleListeners[lifecycleListeners.length - 1].value, false);
            } else if ($compat.amd) {
                return;
            } else {
                $dom.addEventListener(EventManager.$Window, 'load', () => {
                    dispatch('ready', EventManager);
                });
            }
        }

        /**
         * Removes all event listeners for a given uid. Useful for garbage collection when 
         * certain objects that listen to events go out of scope.
         * 
         * @static
         * @param uid The uid for which the event listeners will be removed.
         */
        static dispose(uid: string): void {
            deleteProperty(EventManager.__eventsListeners, uid);
        }

        /**
         * Registers a listener for a DispatchEvent. The listener will be called when a DispatchEvent is 
         * propagating over the given uid. Any number of listeners can exist for a single event name.
         * 
         * @static
         * @param uid A unique id to associate with the object registering the listener.
         * @param eventName The name of the event to listen to.
         * @param listener The method called when the DispatchEvent is fired.
         * @returns {IRemoveListener} A method for removing the listener.
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

            var index = eventListeners.length - 1;

            return () => {
                eventListeners.splice(index, 1);
            };
        }

        /**
         * Looks for listeners to a given event name, and fires the listeners using the specified
         * event direction.
         * 
         * @static
         * @param name The name of the event.
         * @param sender The object sending the event.
         * @param direction The direction in which to send the event.
         * @param args The arguments to send to the listeners.
         * 
         * @see EventManager.direction
         */
        static dispatch(name: string, sender: any, direction: string, args?: Array<any>): void;
        /**
         * Looks for listeners to a given event name, and fires the listeners using the specified
         * event direction.
         * 
         * @static
         * @param name The name of the event.
         * @param sender The object sending the event.
         * @param direction='up' Equivalent to EventManager.direction.UP.
         * @param args The arguments to send to the listeners.
         * 
         * @see EventManager.direction
         */
        static dispatch(name: string, sender: any, direction: 'up', args?: Array<any>): void;
        /**
         * Looks for listeners to a given event name, and fires the listeners using the specified
         * event direction.
         * 
         * @static
         * @param name The name of the event.
         * @param sender The object sending the event.
         * @param direction='down' Equivalent to EventManager.direction.DOWN.
         * @param args The arguments to send to the listeners.
         * 
         * @see EventManager.direction
         */
        static dispatch(name: string, sender: any, direction: 'down', args?: Array<any>): void;
        /**
         * Looks for listeners to a given event name, and fires the listeners using the specified
         * event direction.
         * 
         * @static
         * @param name The name of the event.
         * @param sender The object sending the event.
         * @param direction='direct' Equivalent to EventManager.direction.DIRECT.
         * @param args The arguments to send to the listeners.
         * 
         * @see EventManager.direction
         */
        static dispatch(name: string, sender: any, direction: 'direct', args?: Array<any>): void;
        static dispatch(name: string, sender: any, direction: string, args?: Array<any>) {
            var $dispatchEvent: IDispatchEventInstance = acquire(__DispatchEventInstance);
            $dispatchEvent.initialize(name, sender, direction);
            EventManager.sendEvent($dispatchEvent, args);
        }

        /**
         * Returns whether or not the given string is a registered direction.
         * 
         * @param direction The direction of the event
         */
        static hasDirection(direction: string): boolean {
            return (direction === EventManager.UP ||
                direction === EventManager.DOWN ||
                direction === EventManager.DIRECT);
        }

        /**
         * Determines the appropriate direction and dispatches the event accordingly.
         * 
         * @param event The IDispatchEvent to send
         * @param args The arguments associated with the event
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
         * Dispatches the event up the control chain.
         * 
         * @param event The event being dispatched.
         * @param args The arguments associated with the event.
         */
        static _dispatchUp(event: IDispatchEventInstance, args: Array<any>): void {
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
         * Dispatches the event down the control chain.
         * 
         * @param event The event being dispatched.
         * @param args The arguments associated with the event.
         */
        static _dispatchDown(event: IDispatchEventInstance, args: Array<any>): void {
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
         * Dispatches the event directly to all control's listening.
         * 
         * @param event The event being dispatched.
         * @param args The arguments associated with the event.
         */
        static _dispatchDirect(event: IDispatchEventInstance, args: Array<any>): void {
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
     * Event object for a control dispatch event. Contains information about the type of event.
     * Propagation of the event always starts at the sender, allowing a control to both 
     * initialize and consume an event. If a consumer of an event throws an error while 
     * handling the event it will be logged to the app using exception.warn. Errors will 
     * not stop propagation of the event.
     */
    export interface IEventManagerStatic {
        /**
         * An upward-moving event will start at the sender and move 
         * up the parent chain.
         */
        UP: string;

        /**
         * A downward-moving event will start at the sender and move
         * to its children and beyond.
         */
        DOWN: string;

        /**
         * Goes through all listeners for an event name, ignoring order.
         */
        DIRECT: string;

        /**
         * Keeps track of which events are currently propagating.
         */
        propagatingEvents: {};

        /**
         * Initializes the EventManager, creating the initial ALM event listeners.
         */
        initialize(): void;

        /**
         * Removes all event listeners for a given uid. Useful for garbage collection when
         * certain objects that listen to events go out of scope.
         * 
         * @param uid The uid for which the event listeners will be removed.
         */
        dispose(uid: string): void;

        /**
         * Registers a listener for the beforeNavigate Event. The listener will be called when the beforeNavigate 
         * event is propagating over the given uid. Any number of listeners can exist for a single event name. The 
         * listener can chose to cancel the event using ev.cancel(), preventing any navigation as well as further 
         * calls to event listeners.
         * 
         * @param uid A unique id to associate with the object registering the listener.
         * @param eventName='beforeNavigate' Specifies that this is a listener for the beforeNavigate event.
         * @param listener The method called when the beforeNavigate event is fired.
         * @param context Optional context with which the listener will be bound.
         * @returns {IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: 'beforeNavigate',
            listener: (ev: INavigationEvent<any>) => void, context?: any): IRemoveListener;
        /**
         * Registers a listener for the navigating Event. The listener will be called when the navigating 
         * event is propagating over the given uid. Any number of listeners can exist for a single event name.
         * The listener can chose to cancel the event using ev.cancel(), preventing any navigation as well as further 
         * calls to event listeners.
         * 
         * @param uid A unique id to associate with the object registering the listener.
         * @param eventName='navigating' Specifies that this is a listener for the navigating event.
         * @param listener The method called when the navigating event is fired.
         * @param context Optional context with which the listener will be bound.
         * @returns {IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: 'navigating',
            listener: (ev: INavigationEvent<any>) => void, context?: any): IRemoveListener;
        /**
         * Registers a listener for the navigated Event. The listener will be called when the navigated 
         * event is propagating over the given uid. Any number of listeners can exist for a single event name.
         * The listener cannot cancel the event.
         * 
         * @param uid A unique id to associate with the object registering the listener.
         * @param eventName='navigated' Specifies that this is a listener for the navigated event.
         * @param listener The method called when the navigated event is fired.
         * @param context Optional context with which the listener will be bound.
         * @returns {IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: 'navigated',
            listener: (ev: INavigationEvent<any>) => void, context?: any): IRemoveListener;
        /**
         * Registers a listener for a NavigationEvent. The listener will be called when a NavigationEvent is
         * propagating over the given uid. Any number of listeners can exist for a single event name.
         * 
         * @param uid A unique id to associate with the object registering the listener.
         * @param eventName The name of the event to listen to.
         * @param listener The method called when the NavigationEvent is fired.
         * @param context Optional context with which the listener will be bound.
         * @returns {IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: string, listener: (ev: INavigationEvent<any>) => void,
            context?: any): IRemoveListener;
        /**
         * Registers a listener for the ready AlmEvent. The ready event will be called when the app 
         * is ready to start.
         * 
         * @param uid A unique id to associate with the object registering the listener.
         * @param eventName='ready' Specifies that the listener is for the ready event.
         * @param listener The method called when the app is ready to start.
         * @param context Optional context with which the listener will be bound.
         * @returns {IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: 'ready', listener: (ev: ILifecycleEvent) => void,
            context?: any): IRemoveListener;
        /**
         * Registers a listener for the suspend AlmEvent. The listener will be called when an app 
         * is being suspended.
         * 
         * @param uid A unique id to associate with the object registering the listener.
         * @param eventName='suspend' Specifies the listener is for the suspend event.
         * @param listener The method called when the suspend event is fired.
         * @param context Optional context with which the listener will be bound.
         * @returns {IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: 'suspend', listener: (ev: ILifecycleEvent) => void,
            context?: any): IRemoveListener;
        /**
         * Registers a listener for the resume AlmEvent. The listener will be called when an app 
         * is being resumeed.
         * 
         * @param uid A unique id to associate with the object registering the listener.
         * @param eventName='suspend' Specifies the listener is for the resume event.
         * @param listener The method called when the resume event is fired.
         * @param context Optional context with which the listener will be bound.
         * @returns {IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: 'resume', listener: (ev: ILifecycleEvent) => void,
            context?: any): IRemoveListener;
        /**
         * Registers a listener for the online AlmEvent. This event fires when the app's network 
         * connection changes to be online.
         * 
         * @param uid A unique id to associate with the object registering the listener.
         * @param eventName='online' Specifies the listener is for the online event.
         * @param listener The method called when the online event is fired.
         * @param context Optional context with which the listener will be bound.
         * @returns {IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: 'online', listener: (ev: ILifecycleEvent) => void,
            context?: any): IRemoveListener;
        /**
         * Registers a listener for the offline AlmEvent. This event fires when the app's network 
         * connection changes to be offline.
         * 
         * @param uid A unique id to associate with the object registering the listener.
         * @param eventName='offline' Specifies the listener is for the offline event.
         * @param listener The method called when the offline is fired.
         * @param context Optional context with which the listener will be bound.
         * @returns {IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: 'offline', listener: (ev: ILifecycleEvent) => void,
            context?: any): IRemoveListener;
        /**
         * Registers a listener for an AlmEvent. The listener will be called when an AlmEvent is
         * propagating over the given uid. Any number of listeners can exist for a single event name.
         * 
         * @param uid A unique id to associate with the object registering the listener.
         * @param eventName The name of the event to listen to.
         * @param listener The method called when the AlmEvent is fired.
         * @param context Optional context with which the listener will be bound.
         * @returns {IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: string, listener: (ev: ILifecycleEvent) => void,
            context?: any): IRemoveListener;
        /**
         * Registers a listener for a ErrorEvent. The listener will be called when a ErrorEvent is
         * propagating over the given uid. Any number of listeners can exist for a single event name.
         * 
         * @param uid A unique id to associate with the object registering the listener.
         * @param eventName The name of the event to listen to.
         * @param listener The method called when the ErrorEvent is fired.
         * @param context Optional context with which the listener will be bound.
         * @returns {IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: 'error', listener: (ev: IErrorEvent<Error>) => void,
            context?: any): IRemoveListener;
        /**
         * Registers a listener for a ErrorEvent. The listener will be called when a ErrorEvent is
         * propagating over the given uid. Any number of listeners can exist for a single event name.
         * 
         * @param uid A unique id to associate with the object registering the listener.
         * @param eventName The name of the event to listen to.
         * @param listener The method called when the ErrorEvent is fired.
         * @param context Optional context with which the listener will be bound.
         * @returns {IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: string, listener: (ev: IErrorEvent<any>) => void,
            context?: any): IRemoveListener;
        /**
         * Registers a listener for a DispatchEvent. The listener will be called when a DispatchEvent is
         * propagating over the given uid. Any number of listeners can exist for a single event name.
         * 
         * @param uid A unique id to associate with the object registering the listener.
         * @param eventName The name of the event to listen to.
         * @param listener The method called when the DispatchEvent is fired.
         * @param context Optional context with which the listener will be bound.
         * @returns {IRemoveListener} A method for removing the listener.
         */
        on(uid: string, eventName: string, listener: (ev: IDispatchEventInstance, ...args: any[]) => void,
            context?: any): IRemoveListener;

        /**
         * Looks for listeners to a given event name, and fires the listeners using the specified
         * event direction.
         * 
         * @static
         * @param name The name of the event.
         * @param sender The object sending the event.
         * @param direction='up' Equivalent to EventManager.direction.UP.
         * @param args The arguments to send to the listeners.
         * 
         * @see EventManager.direction
         */
        dispatch(name: string, sender: any, direction: 'up', args?: Array<any>): void;
        /**
         * Looks for listeners to a given event name, and fires the listeners using the specified
         * event direction.
         * 
         * @static
         * @param name The name of the event.
         * @param sender The object sending the event.
         * @param direction='down' Equivalent to EventManager.direction.DOWN.
         * @param args The arguments to send to the listeners.
         * 
         * @see EventManager.direction
         */
        dispatch(name: string, sender: any, direction: 'down', args?: Array<any>): void;
        /**
         * Looks for listeners to a given event name, and fires the listeners using the specified
         * event direction.
         * 
         * @static
         * @param name The name of the event.
         * @param sender The object sending the event.
         * @param direction='direct' Equivalent to EventManager.direction.DIRECT.
         * @param args The arguments to send to the listeners.
         * 
         * @see EventManager.direction
         */
        dispatch(name: string, sender: any, direction: 'direct', args?: Array<any>): void;
        /**
         * Looks for listeners to a given event name, and fires the listeners using the specified
         * event direction.
         * 
         * @static
         * @param name The name of the event.
         * @param sender The object sending the event.
         * @param direction The direction in which to send the event.
         * @param args The arguments to send to the listeners.
         * 
         * @see EventManager.direction
         */
        dispatch(name: string, sender: any, direction: string, args?: Array<any>): void;

        /**
         * Returns whether or not the given string is a registered direction.
         */
        hasDirection(direction: string): boolean;

        /**
         * Determines the appropriate direction and dispatches the event accordingly.
         */
        sendEvent(event: IDispatchEventInstance, args?: Array<any>): void;
    }

    /**
     * Describes an object that contains event listeners.
     */
    interface IEventsListener {
        /**
         * An IObject of listener arrays, keyed by event name.
         */
        listeners: IObject<Array<(ev: IDispatchEventInstance, ...args: any[]) => void>>;
        /**
         * The context with which to call each event listener.
         */
        context: any;
    }
}
