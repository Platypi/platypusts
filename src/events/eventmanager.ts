namespace plat.events {
    'use strict';

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
         * @name _log
         * @memberof plat.events.EventManager
         * @kind property
         * @access protected
         * @static
         *
         * @type {plat.debug.Log}
         * @description
         * Reference to the {@link plat.debug.Log|Log} injectable.
         */
        protected static _log: debug.Log;

        /**
         * @name _compat
         * @memberof plat.events.EventManager
         * @kind property
         * @access protected
         * @static
         *
         * @type {plat.Compat}
         *
         * @description
         * Reference to the {@link plat.Compat|Compat} injectable.
         */
        protected static _compat: Compat;

        /**
         * @name _document
         * @memberof plat.events.EventManager
         * @kind protected
         * @access
         * @static
         *
         * @type {Document}
         *
         * @description
         * Reference to the Document injectable.
         */
        protected static _document: Document;

        /**
         * @name _window
         * @memberof plat.events.EventManager
         * @kind property
         * @access protected
         * @static
         *
         * @type {Window}
         *
         * @description
         * Reference to the Window injectable.
         */
        protected static _window: Window;

        /**
         * @name _dom
         * @memberof plat.events.EventManager
         * @kind property
         * @access protected
         * @static
         *
         * @type {plat.ui.Dom}
         *
         * @description
         * Reference to the {@link plat.ui.Dom|Dom} injectable.
         */
        protected static _dom: ui.Dom;

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
        public static UP: 'up' = 'up';

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
        public static DOWN: 'down' = 'down';

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
        public static DIRECT: 'direct' = 'direct';

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
        public static propagatingEvents: IObject<boolean> = {};

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
        private static __lifecycleEventListeners: {
            name: string;
            value(): void;
        }[] = [];

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
        private static __initialized: boolean = false;

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
        public static initialize(): void {
            if (EventManager.__initialized) {
                return;
            }

            EventManager.__initialized = true;

            const lifecycleListeners = EventManager.__lifecycleEventListeners;
            const _compat = EventManager._compat;
            const _document = EventManager._document;
            const _window = EventManager._window;
            const _dom = EventManager._dom;
            const dispatch = LifecycleEvent.dispatch;
            let listener: { name: string; value(): void };

            while (lifecycleListeners.length > 0) {
                listener = lifecycleListeners.pop();
                _document.removeEventListener(
                    listener.name,
                    listener.value,
                    false
                );
            }

            if (_compat.cordova) {
                const eventNames = [__resume, __online, __offline];
                const winJs = _compat.winJs;
                const length = eventNames.length;
                const dispatcher = (ev: string): (() => void) => (): void => {
                    dispatch(ev, EventManager);
                };
                let event: string;
                let fn: () => void;

                for (let i = 0; i < length; i += 1) {
                    event = eventNames[i];
                    fn = dispatcher(event);
                    lifecycleListeners.push({
                        name: event,
                        value: fn,
                    });

                    _dom.addEventListener(_document, event, fn, false);
                }

                fn = dispatcher(__suspend);
                lifecycleListeners.push({
                    name: __pause,
                    value: fn,
                });

                _dom.addEventListener(_document, __pause, fn, false);

                fn = dispatcher(__ready);
                lifecycleListeners.push({
                    name: __deviceReady,
                    value: fn,
                });

                _dom.addEventListener(_document, __deviceReady, fn, false);

                fn = (): boolean => {
                    if (!winJs) {
                        dispatch(__backButton, EventManager);
                    }

                    return true;
                };
                lifecycleListeners.push({
                    name: __backButton,
                    value: fn,
                });

                _dom.addEventListener(_document, __backButton, fn, false);

                if (winJs) {
                    fn = (): boolean => {
                        dispatch(__backButton, EventManager);

                        return true;
                    };
                    lifecycleListeners.push({
                        name: __backClick,
                        value: fn,
                    });

                    (<any>_window).WinJS.Application.addEventListener(
                        __backClick,
                        fn,
                        false
                    );
                }
            } else if (_compat.amd) {
                return;
            } else {
                _dom.addEventListener(_window, 'load', (): void => {
                    dispatch(__ready, EventManager);
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
        public static dispose(uid: string): void {
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
         * Registers a listener for a {@link plat.events.DispatchEvent|DispatchEvent}.
         * The listener will be called when a {@link plat.events.DispatchEvent|DispatchEvent} is
         * propagating over the given uid. Any number of listeners can exist for a single event name.
         *
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName The name of the event to listen to.
         * @param {(ev: DispatchEvent, ...args: any[]) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         *
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        public static on(
            uid: string,
            eventName: string,
            listener: (ev: DispatchEvent, ...args: any[]) => void,
            context?: any
        ): IRemoveListener {
            let eventsListener = EventManager.__eventsListeners[uid];

            if (isNull(eventsListener)) {
                eventsListener = EventManager.__eventsListeners[uid] = {
                    listeners: {},
                    context: context,
                };
            }

            let eventListeners = eventsListener.listeners[eventName];

            if (!isArray(eventListeners)) {
                eventListeners = eventsListener.listeners[eventName] = [];
            }

            eventListeners.push(listener);

            return (): void => {
                const index = eventListeners.indexOf(listener);
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
         * @param {string} direction The direction in which to send the event.
         * @param {Array<any>} args? The arguments to send to the listeners.
         *
         * @returns {plat.events.DispatchEvent} The dispatched event.
         */
        public static dispatch(
            name: string,
            sender: any,
            direction: 'down' | 'up' | 'direct',
            args?: any[]
        ): DispatchEvent {
            const _dispatchEvent: DispatchEvent = acquire(
                __DispatchEventInstance
            );
            _dispatchEvent.initialize(name, sender, direction);
            EventManager.sendEvent(_dispatchEvent, args);

            return _dispatchEvent;
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
        public static hasDirection(direction: string): boolean {
            return (
                direction === EventManager.UP ||
                direction === EventManager.DOWN ||
                direction === EventManager.DIRECT
            );
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
         * @param {plat.events.DispatchEvent} event The {@link plat.events.DispatchEvent|DispatchEvent} to send
         * @param {Array<any>} args The arguments associated with the event
         *
         * @returns {void}
         */
        public static sendEvent(event: DispatchEvent, args?: any[]): void {
            const name = event.name;
            const direction = event.direction;

            if (!isArray(args)) {
                args = [];
            }

            EventManager.propagatingEvents[name] = true;

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
                default:
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
         * @param {plat.events.DispatchEvent} event The event being dispatched.
         * @param {Array<any>} args The arguments associated with the event.
         *
         * @returns {void}
         */
        protected static _dispatchUp(event: DispatchEvent, args: any[]): void {
            const name = event.name;
            let parent = event.sender;

            while (!isNull(parent) && EventManager.propagatingEvents[name]) {
                if (isNull(parent.uid)) {
                    parent = parent.parent;
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
         * @param {plat.events.DispatchEvent} event The event being dispatched.
         * @param {Array<any>} args The arguments associated with the event.
         *
         * @returns {void}
         */
        protected static _dispatchDown(
            event: DispatchEvent,
            args: any[]
        ): void {
            const name = event.name;
            let controls: Control[] = [];
            let control: Control;

            controls.push(event.sender);

            while (
                !isEmpty(controls.length) &&
                EventManager.propagatingEvents[name]
            ) {
                control = controls.pop();

                if (isNull(control.uid)) {
                    continue;
                }

                EventManager.__executeEvent(control.uid, event, args);

                if (isNull((<ui.TemplateControl>control).controls)) {
                    continue;
                }

                controls = controls.concat(
                    (<ui.TemplateControl>control).controls
                );
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
         * @param {plat.events.DispatchEvent} event The event being dispatched.
         * @param {Array<any>} args The arguments associated with the event.
         *
         * @returns {void}
         */
        protected static _dispatchDirect(
            event: DispatchEvent,
            args: any[]
        ): void {
            const uids = Object.keys(EventManager.__eventsListeners);
            const length = uids.length;
            const name = event.name;
            let eventsListener: IEventsListener;

            for (let i = 0; i < length; i += 1) {
                if (!EventManager.propagatingEvents[name]) {
                    break;
                }

                eventsListener = EventManager.__eventsListeners[uids[i]];

                if (
                    isNull(eventsListener) ||
                    isNull(eventsListener.listeners[name])
                ) {
                    continue;
                }

                EventManager.__callListeners(
                    eventsListener.context,
                    event,
                    eventsListener.listeners[name],
                    args
                );
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
         * @param {plat.events.DispatchEvent} The event.
         * @param {Array<any>} args The arguments to send to the listeners.
         *
         * @returns {void}
         */
        private static __executeEvent(
            uid: string,
            ev: DispatchEvent,
            args: any[]
        ): void {
            const eventsListener = EventManager.__eventsListeners[uid];

            if (isNull(eventsListener)) {
                return;
            }

            const context = eventsListener.context;
            const listeners = eventsListener.listeners[ev.name];

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
         * @param {plat.events.DispatchEvent} The event.
         * @param {Array<(ev: DispatchEvent, ...args: any[]) => void>} The event listeners.
         * @param {Array<any>} args The arguments to send to the listeners.
         *
         * @returns {void}
         */
        private static __callListeners(
            context: any,
            ev: DispatchEvent,
            listeners: ((ev: DispatchEvent, ...args: any[]) => void)[],
            args: any[]
        ): void {
            const name = ev.name;
            const length = listeners.length;
            let index = -1;

            args = [ev].concat(args);

            index += 1;
            while (index < length && EventManager.propagatingEvents[name]) {
                try {
                    listeners[index].apply(context, args);
                } catch (e) {
                    EventManager._log.debug(e);
                }

                index += 1;
            }
        }
    }

    /**
     * The Type for referencing the '_EventManagerStatic' injectable as a dependency.
     */
    export function IEventManagerStatic(
        _log?: debug.Log,
        _compat?: Compat,
        _document?: Document,
        _window?: Window,
        _dom?: ui.Dom
    ): IEventManagerStatic {
        (<any>EventManager)._log = _log;
        (<any>EventManager)._compat = _compat;
        (<any>EventManager)._document = _document;
        (<any>EventManager)._window = _window;
        (<any>EventManager)._dom = _dom;

        return <any>EventManager;
    }

    register.injectable(
        __EventManagerStatic,
        IEventManagerStatic,
        [__Log, __Compat, __Document, __Window, __Dom],
        __STATIC
    );

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
        UP: string | 'up';

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
        DOWN: string | 'down';

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
        DIRECT: string | 'direct';

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
         * @variation 7
         *
         * @description
         * Registers a listener for a DispatchEvent. The listener will be called when a DispatchEvent is
         * propagating over the given uid. Any number of listeners can exist for a single event name.
         *
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName The name of the event to listen to.
         * @param {(ev: plat.events.DispatchEvent, ...args: any[]) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         *
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        on(
            uid: string,
            eventName:
                | 'ready'
                | 'suspend'
                | 'resume'
                | 'online'
                | 'offline'
                | 'error'
                | string,
            listener: (
                ev: DispatchEvent | LifecycleEvent | ErrorEvent<Error>,
                ...args: any[]
            ) => void,
            context?: any
        ): IRemoveListener;

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
         * @returns {plat.events.DispatchEvent} The dispatched event.
         */
        dispatch(
            name: string,
            sender: any,
            direction: 'up' | 'down' | 'direct' | string,
            args?: any[]
        ): DispatchEvent;

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
         * @param {plat.events.DispatchEvent} event The {@link plat.events.DispatchEvent|DispatchEvent} to send
         * @param {Array<any>} args The arguments associated with the event
         *
         * @returns {void}
         */
        sendEvent(event: DispatchEvent, args?: any[]): void;
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
         * @type {plat.IObject<Array<(ev: plat.events.DispatchEvent, ...args: any[]) => void>>}
         *
         * @description
         * An IObject of listener arrays, keyed by event name.
         */
        listeners: IObject<((ev: DispatchEvent, ...args: any[]) => void)[]>;

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
