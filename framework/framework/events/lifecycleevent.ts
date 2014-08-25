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
         * 
         * @returns {void}
         */
        static dispatch(name: string, sender: any): void {
            var event = new LifecycleEvent();

            event.initialize(name, sender);
            EventManager.sendEvent(event);
        }

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
    }

    /**
     * The Type for referencing the '$LifecycleEventStatic' injectable as a dependency.
     */
    export function ILifecycleEventStatic(): ILifecycleEventStatic {
        return LifecycleEvent;
    }

    register.injectable(__LifecycleEventStatic, ILifecycleEventStatic, null, __STATIC);

    /**
     * @name IErrorEventStatic
     * @memberof plat.events
     * @kind interface
     * 
     * @description
     * Dispatches {@link plat.events.LifecycleEvent|LifecycleEvent}
     */
    export interface ILifecycleEventStatic {
        /**
         * @name dispatch
         * @memberof plat.events.ILifecycleEvent
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
         * 
         * @returns {void}
         */
        dispatch(name: string, sender: any): void;
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
    }
}
