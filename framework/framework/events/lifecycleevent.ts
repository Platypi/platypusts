module plat.events {
    /**
     * @name LifecycleEvent
     * @memberof plat.events
     * @kind class
     * 
     * @extends {plat.events.DispatchEvent}
     * @implements {plat.events.ILifecycleEvent}
     * 
     * @description
     * Represents a Lifecycle Event. Lifecycle Events are always direct events.
     */
    export class LifecycleEvent extends DispatchEvent implements ILifecycleEvent {
        /**
         * @name dispatch
         * @memberof plat.events.LifecycleEvent
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Creates a new LifecycleEvent and fires it.
         * 
         * @typeparam {Error} E The type of Error this event represents.
         * 
         * @param {string} name The name of the event.
         * @param {any} sender The sender of the event.
         * @param {boolean} cancelable? Whether or not the event can be cancelled.
         * 
         * @returns {void}
         */
        static dispatch(name: string, sender: any, cancelable?: boolean): void {
            var event = new LifecycleEvent();
            event.initialize(name, sender);
            event.cancelable = cancelable === true;
            EventManager.sendEvent(event);
        }

        /**
         * @name cancelable
         * @memberof plat.events.LifecycleEvent
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * States whether or not this event is able to be cancelled. Some lifecycle events can be 
         * cancelled, preventing the default functionality for the event.
         */
        cancelable: boolean;

        /**
         * @name cancelled
         * @memberof plat.events.LifecycleEvent
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * States whether or not this event has been cancelled.
         */
        cancelled: boolean = false;

        /**
         * @name initialize
         * @memberof plat.events.LifecycleEvent
         * @kind function
         * @access public
         * 
         * @description
         * Initializes the event, populating its public properties.
         * 
         * @param {string} name The name of the event.
         * @param {any} sender The sender of the event.
         */
        initialize(name: string, sender: any): void {
            super.initialize(name, sender, this.$EventManagerStatic.DIRECT);
        }

        /**
         * @name cancel
         * @memberof plat.events.LifecycleEvent
         * @kind function
         * @access public
         * 
         * @description
         * If the event is {@link plat.events.LifecycleEvent.cancelable|cancelable}, calling this method will cancel the event.
         * 
         * @returns {void}
         */
        cancel(): void {
            if (this.cancelable) {
                this.cancelled = true;
            }
        }
    }

    /**
     * The Type for referencing the '$LifecycleEventStatic' injectable as a dependency.
     */
    export function ILifecycleEventStatic(): ILifecycleEventStatic {
        return LifecycleEvent;
    }

    register.injectable(__LifecycleEventStatic, ILifecycleEventStatic, null, __STATIC);

    /**
     * @name ILifecycleEventStatic
     * @memberof plat.events
     * @kind interface
     * 
     * @description
     * Dispatches {@link plat.events.LifecycleEvent|LifecycleEvent}
     */
    export interface ILifecycleEventStatic {
        /**
         * @name dispatch
         * @memberof plat.events.ILifecycleEventStatic
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Creates a new LifecycleEvent and fires it.
         * 
         * @typeparam {Error} E The type of Error this event represents.
         * 
         * @param {string} name The name of the event.
         * @param {any} sender The sender of the event.
         * @param {boolean} cancelable? Whether or not the event can be cancelled.
         * 
         * @returns {void}
         */
        dispatch(name: string, sender: any, cancelable?: boolean): void;
    }

    /**
     * @name ILifecycleEvent
     * @memberof plat.events
     * @kind interface
     * 
     * @extends {plat.events.IDispatchEventInstance}
     * 
     * @description
     * Represents a Lifecycle Event. Lifecycle Events are always direct events.
     */
    export interface ILifecycleEvent extends IDispatchEventInstance {
        /**
         * @name cancelable
         * @memberof plat.events.ILifecycleEvent
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * States whether or not this event is able to be cancelled. Some lifecycle events can be 
         * cancelled, preventing the default functionality for the event.
         */
        cancelable: boolean;

        /**
         * @name cancelled
         * @memberof plat.events.ILifecycleEvent
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * States whether or not this event has been cancelled.
         */
        cancelled: boolean;

        /**
         * @name initialize
         * @memberof plat.events.ILifecycleEvent
         * @kind function
         * @access public
         * 
         * @description
         * Initializes the event, populating its public properties.
         * 
         * @param {string} name The name of the event.
         * @param {any} sender The sender of the event.
         * 
         * @returns {void}
         */
        initialize(name: string, sender: any): void;

        /**
         * @name cancel
         * @memberof plat.events.ILifecycleEvent
         * @kind function
         * @access public
         * 
         * @description
         * If the event is {@link plat.events.ILifecycleEvent.cancelable|cancelable}, calling this method will cancel the event.
         * 
         * @returns {void}
         */
        cancel(): void;
    }
}
