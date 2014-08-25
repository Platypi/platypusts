module plat.events {
    /**
     * @name DispatchEvent
     * @memberof plat.events
     * @kind class
     * @access public
     * 
     * @implements {plat.events.IDispatchEventInstance}
     * 
     * @description
     * An event class that propagates through a control tree. 
     * Propagation of the event always starts at the sender, allowing a control to both 
     * initialize and consume an event. If a consumer of an event throws an error while 
     * handling the event it will be logged to the app using exception.warn. Errors will 
     * not stop propagation of the event.
     */
    export class DispatchEvent implements IDispatchEventInstance {
        /**
         * @name $EventManagerStatic
         * @memberof plat.events.DispatchEvent
         * @kind property
         * @access public
         * 
         * @type {plat.events.IEventManagerStatic}
         * 
         * @description
         * Reference to the {@link plat.events.IEventManagerStatic|IEventManagerStatic} injectable.
         */
        $EventManagerStatic: IEventManagerStatic = acquire(__EventManagerStatic);

        /**
         * @name sender
         * @memberof plat.events.DispatchEvent
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * The object that initiated the event.
         */
        sender: any;

        /**
         * @name name
         * @memberof plat.events.DispatchEvent
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The name of the event.
         */
        name: string;

        /**
         * @name direction
         * @memberof plat.events.DispatchEvent
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The event direction this object is using for propagation.
         */
        direction: string;

        /**
         * @name initialize
         * @memberof plat.events.DispatchEvent
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Initializes the event, populating its public properties.
         * 
         * @param {string} name The name of the event.
         * @param {any} sender The object that initiated the event.
         * @param {string} direction='up' Equivalent to {@link plat.events.EventManager.UP|EventManager.UP}.
         * 
         * @returns {void}
         */
        initialize(name: string, sender: any, direction?: 'up'): void;
        /**
         * @name initialize
         * @memberof plat.events.DispatchEvent
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Initializes the event, populating its public properties.
         * 
         * @param {string} name The name of the event.
         * @param {any} sender The object that initiated the event.
         * @param {string} direction='down' Equivalent to {@link plat.events.EventManager.DOWN|EventManager.DOWN}.
         * 
         * @returns {void}
         */
        initialize(name: string, sender: any, direction?: 'down'): void;
        /**
         * @name initialize
         * @memberof plat.events.DispatchEvent
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Initializes the event, populating its public properties.
         * 
         * @param {string} name The name of the event.
         * @param {any} sender The object that initiated the event.
         * @param {string} direction='direct' Equivalent to {@link plat.events.EventManager.DIRECT|EventManager.DIRECT}.
         * 
         * @returns {void}
         */
        initialize(name: string, sender: any, direction?: 'direct'): void;
        /**
         * @name initialize
         * @memberof plat.events.DispatchEvent
         * @kind function
         * @access public
         * @variation 3
         * 
         * @description
         * Initializes the event, populating its public properties.
         * 
         * @param {string} name The name of the event.
         * @param {any} sender The object that initiated the event.
         * @param {string} direction The direction of propagation
         * 
         * @returns {void}
         */
        initialize(name: string, sender: any, direction?: string): void;
        initialize(name: string, sender: any, direction?: string) {
            this.name = name;
            this.direction = direction || this.$EventManagerStatic.DIRECT;
            this.sender = sender;
        }

        /**
         * @name stopPropagation
         * @memberof plat.events.DispatchEvent
         * @kind function
         * @access public
         * 
         * @description
         * Call this method to halt the propagation of an upward-moving event.
         * Downward events cannot be stopped with this method.
         * 
         * @returns {void}
         */
        stopPropagation(): void {
            if (this.direction === this.$EventManagerStatic.UP) {
                (<any>this.$EventManagerStatic.propagatingEvents)[this.name] = false;
            }
        }
    }

    /**
     * The Type for referencing the '$DispatchEventInstance' injectable as a dependency.
     */
    export function IDispatchEventInstance(): IDispatchEventInstance {
        return new DispatchEvent();
    }

    register.injectable(__DispatchEventInstance, IDispatchEventInstance, null, __INSTANCE);

    /**
     * @name IDispatchEventInstance
     * @memberof plat.events
     * @kind interface
     * @access public
     * 
     * @description
     * Describes an event that propagates through a control tree. 
     * Propagation of the event always starts at the sender, allowing a control to both 
     * initialize and consume an event. If a consumer of an event throws an error while 
     * handling the event it will be logged to the app using exception.warn. Errors will 
     * not stop propagation of the event.
     */
    export interface IDispatchEventInstance {
        /**
         * @name sender
         * @memberof plat.events.IDispatchEventInstance
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * The object that initiated the event.
         */
        sender: any;

        /**
         * @name name
         * @memberof plat.events.IDispatchEventInstance
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The name of the event.
         */
        name: string;

        /**
         * @name direction
         * @memberof plat.events.IDispatchEventInstance
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The event direction this object is using for propagation.
         */
        direction: string;

        /**
         * @name initialize
         * @memberof plat.events.IDispatchEventInstance
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Initializes the event, populating its public properties.
         * 
         * @param {string} name The name of the event.
         * @param {any} sender The object that initiated the event.
         * @param {string} direction='up' Equivalent to {@link plat.events.EventManager.UP|EventManager.UP}.
         * 
         * @returns {void}
         */
        initialize(name: string, sender: any, direction?: 'up'): void;
        /**
         * @name initialize
         * @memberof plat.events.IDispatchEventInstance
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Initializes the event, populating its public properties.
         * 
         * @param {string} name The name of the event.
         * @param {any} sender The object that initiated the event.
         * @param {string} direction='down' Equivalent to {@link plat.events.EventManager.DOWN|EventManager.DOWN}.
         * 
         * @returns {void}
         */
        initialize(name: string, sender: any, direction?: 'down'): void;
        /**
         * @name initialize
         * @memberof plat.events.IDispatchEventInstance
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Initializes the event, populating its public properties.
         * 
         * @param {string} name The name of the event.
         * @param {any} sender The object that initiated the event.
         * @param {string} direction='direct' Equivalent to {@link plat.events.EventManager.DIRECT|EventManager.DIRECT}.
         * 
         * @returns {void}
         */
        initialize(name: string, sender: any, direction?: 'direct'): void;
        /**
         * @name initialize
         * @memberof plat.events.IDispatchEventInstance
         * @kind function
         * @access public
         * @variation 3
         * 
         * @description
         * Initializes the event, populating its public properties.
         * 
         * @param {string} name The name of the event.
         * @param {any} sender The object that initiated the event.
         * @param {string} direction The direction of propagation
         * 
         * @returns {void}
         */
        initialize(name: string, sender: any, direction?: string): void;

        /**
         * @name stopPropagation
         * @memberof plat.events.IDispatchEventInstance
         * @kind function
         * @access public
         * 
         * @description
         * Call this method to halt the propagation of an upward-moving event.
         * Downward events cannot be stopped with this method.
         * 
         * @returns {void}
         */
        stopPropagation(): void;
    }
}
