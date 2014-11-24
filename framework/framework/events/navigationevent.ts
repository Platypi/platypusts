module plat.events {
    /**
     * @name NavigationEvent
     * @memberof plat.events
     * @kind class
     * 
     * @extends {plat.events.DispatchEvent}
     * @implements {plat.events.INavigationEvent}
     * 
     * @description
     * A class used by the Navigator to dispatch Navigation events. Allows anyone to listen 
     * for navigation events and respond to them, even canceling them if necessary.
     * 
     * @typeparam {any} P Corresponds to the type of event parameter.
     */
    export class NavigationEvent<P> extends DispatchEvent implements INavigationEvent<P> {
        /**
         * @name $EventManagerStatic
         * @memberof plat.events.NavigationEvent
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.events.IEventManagerStatic}
         * 
         * @description
         * Reference to the {@link plat.events.IEventManagerStatic|IEventManagerStatic} injectable.
         */
        static $EventManagerStatic: IEventManagerStatic;

        /**
         * @name dispatch
         * @memberof plat.events.NavigationEvent
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Creates a new NavigationEvent and fires it.
         * 
         * @typeparam {any} P The type of event parameter sent in this event.
         * 
         * @param {string} name The name of the event (e.g. 'beforeNavigate')
         * @param {any} sender The object sending the event.
         * @param {plat.events.INavigationEventOptions<P>} eventOptions An object implementing INavigationEvent, specifying what all event listeners
         * will be passed.
         * 
         * @returns {plat.events.INavigationEvent} The event after it has been propagated.
         */
        static dispatch<P>(name: string, sender: any, eventOptions: INavigationEventOptions<P>): INavigationEvent<P> {
            var event = new NavigationEvent<P>();

            event.initialize(name, sender, null, eventOptions);
            NavigationEvent.$EventManagerStatic.sendEvent(event, []);

            return event;
        }

        /**
         * @name parameter
         * @memberof plat.events.NavigationEvent
         * @kind property
         * @access public
         * 
         * @type {P}
         * 
         * @description
         * The navigation parameter being dispatched.
         */
        parameter: P;

        /**
         * @name parameter
         * @memberof plat.events.NavigationEvent
         * @kind property
         * @access public
         * 
         * @type {plat.navigation.IBaseNavigationOptions}
         * 
         * @description
         * The navigation options for the event.
         */
        options: navigation.IBaseNavigationOptions;

        /**
         * @name target
         * @memberof plat.events.NavigationEvent
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * The navigation event target. Its type depends on the type of Navigation event.
         */
        target: any;

        /**
         * @name type
         * @memberof plat.events.NavigationEvent
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Specifies the type of {@link plat.ui.IBaseViewControl|IBaseViewControl} for the event.
         */
        type: string;

        /**
         * @name initialize
         * @memberof plat.events.NavigationEvent
         * @kind function
         * @access public
         * 
         * @description
         * Initializes the event members.
         * 
         * @param {string} name The name of the event.
         * @param {any} sender The object that initiated the event.
         * @param {string} direction='direct' This will always be a direct event no matter what is sent in.
         * 
         * @returns {void}
         */
        initialize(name: string, sender: any, direction?: 'direct', eventOptions?: INavigationEventOptions<P>): void;
        initialize(name: string, sender: any, direction?: string, eventOptions?: INavigationEventOptions<P>): void;
        initialize(name: string, sender: any, direction?: string, eventOptions?: INavigationEventOptions<P>): void {
            super.initialize(name, sender, this.$EventManagerStatic.DIRECT);
            this.parameter = eventOptions.parameter;
            this.options = eventOptions.options;
            this.target = eventOptions.target;
            this.type = eventOptions.type;
        }
    }

    /**
     * The Type for referencing the '$NavigationEventStatic' injectable as a dependency.
     */
    export function INavigationEventStatic($EventManagerStatic?: IEventManagerStatic): INavigationEventStatic {
        NavigationEvent.$EventManagerStatic = $EventManagerStatic;
        return NavigationEvent;
    }

    register.injectable(__NavigationEventStatic, INavigationEventStatic, [__EventManagerStatic], __STATIC);

    /**
     * @name INavigationEventStatic
     * @memberof plat.events
     * @kind interface
     * 
     * @description
     * The intended external interface for the '$NavigationEventStatic' injectable.
     */
    export interface INavigationEventStatic {
        /**
         * @name dispatch
         * @memberof plat.events.INavigationEventStatic
         * @kind function
         * @access public
         * 
         * @description
         * Creates a new {@link plat.events.INavigationEvent|INavigationEvent} and fires it.
         * 
         * @typeparam {any} P The type of event parameter sent in this event.
         * 
         * @param {string} name The name of the event (e.g. 'beforeNavigate')
         * @param {any} sender The object sending the event.
         * @param {plat.events.INavigationEventOptions<P>} eventOptions An object implementing INavigationEvent, specifying what all event listeners
         * will be passed.
         * 
         * @returns {plat.events.INavigationEvent} The event after it has been propagated.
         */
        dispatch<P>(name: string, sender: any, eventOptions: events.INavigationEventOptions<P>): INavigationEvent<P>;
    }

    /**
     * @name INavigationEvent
     * @memberof plat.events
     * @kind interface
     * 
     * @extends {plat.events.IDispatchEventInstance}
     * 
     * @description
     * A class used by the Navigator to dispatch Navigation events. Allows anyone to listen 
     * for navigation events and respond to them, even canceling them if necessary.
     * 
     * @typeparam {any} P Corresponds to the type of event parameter.
     */
    export interface INavigationEvent<P> extends IDispatchEventInstance {
        /**
         * @name parameter
         * @memberof plat.events.INavigationEvent
         * @kind property
         * @access public
         * 
         * @type {P}
         * 
         * @description
         * The navigation parameter being dispatched.
         */
        parameter: P;

        /**
         * @name parameter
         * @memberof plat.events.INavigationEvent
         * @kind property
         * @access public
         * 
         * @type {plat.navigation.IBaseNavigationOptions}
         * 
         * @description
         * The navigation options for the event.
         */
        options: navigation.IBaseNavigationOptions;

        /**
         * @name target
         * @memberof plat.events.INavigationEvent
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * The navigation event target. Its type depends on the type of Navigation event.
         */
        target: any;

        /**
         * @name type
         * @memberof plat.events.INavigationEvent
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Specifies the type of {@link plat.ui.IBaseViewControl|IBaseViewControl} for the event.
         */
        type: string;

        /**
         * @name initialize
         * @memberof plat.events.INavigationEvent
         * @kind function
         * @access public
         * 
         * @description
         * Initializes the event members.
         * 
         * @param {string} name The name of the event.
         * @param {any} sender The object that initiated the event.
         * @param {string} direction='direct' This will always be a direct event no matter what is sent in.
         * 
         * @returns {void}
         */
        initialize(name: string, sender: any, direction?: 'direct', eventOptions?: INavigationEventOptions<P>): void;
        initialize(name: string, sender: any, direction?: string, eventOptions?: INavigationEventOptions<P>): void;
    }

    /**
     * @name INavigationEventOptions
     * @memberof plat.events
     * @kind interface
     * 
     * @description
     * Describes options for an INavigationEvent. The generic parameter specifies the 
     * target type for the event.
     * 
     * @typeparam {any} P Corresponds to the type of event parameter.
     */
    export interface INavigationEventOptions<P> {
        /**
         * @name parameter
         * @memberof plat.events.INavigationEventOptions
         * @kind property
         * @access public
         * 
         * @type {P}
         * 
         * @description
         * The navigation parameter being dispatched.
         */
        parameter: P;

        /**
         * @name parameter
         * @memberof plat.events.INavigationEventOptions
         * @kind property
         * @access public
         * 
         * @type {plat.navigation.IBaseNavigationOptions}
         * 
         * @description
         * The navigation options for the event.
         */
        options: navigation.IBaseNavigationOptions;

        /**
         * @name target
         * @memberof plat.events.INavigationEventOptions
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * The navigation event target. Its type depends on the type of Navigation event.
         */
        target: any;

        /**
         * @name type
         * @memberof plat.events.INavigationEventOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Specifies the type of {@link plat.ui.IBaseViewControl|IBaseViewControl} for the event.
         */
        type: string;
    }
}
