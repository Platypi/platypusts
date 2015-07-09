module plat.events {
    'use strict';

    /**
     * @name LifecycleEvent
     * @memberof plat.events
     * @kind class
     *
     * @extends {plat.events.DispatchEvent}
     *
     * @description
     * Represents a Lifecycle Event. Lifecycle Events are always direct events.
     */
    export class LifecycleEvent extends DispatchEvent {
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
         * @returns {plat.events.LifecycleEvent} The event instance.
         */
        static dispatch(name: string, sender: any): LifecycleEvent {
            let event: LifecycleEvent = acquire(__LifecycleEventInstance);
            event.initialize(name, sender);
            EventManager.sendEvent(event);

            return event;
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
            super.initialize(name, sender, this._EventManager.DIRECT);
        }
    }

    /**
     * The Type for referencing the '_LifecycleEventStatic' injectable as a dependency.
     */
    export function ILifecycleEventStatic(): ILifecycleEventStatic {
        return LifecycleEvent;
    }

    register.injectable(__LifecycleEventStatic, ILifecycleEventStatic, null, __STATIC);

    register.injectable(__LifecycleEventInstance, LifecycleEvent, null, __INSTANCE);

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
         *
         * @returns {plat.events.LifecycleEvent} The event instance.
         */
        dispatch(name: string, sender: any): LifecycleEvent;
    }
}
