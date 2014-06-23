module plat.events {
    /**
     * Represents a Lifecycle Event. Lifecycle Events are always direct events.
     */
    export class LifecycleEvent extends DispatchEvent implements ILifecycleEvent {
        /**
         * Creates a new LifecycleEvent and fires it.
         * 
         * @param name The name of the event.
         * @param sender The sender of the event.
         */
        static dispatch(name: string, sender: any): void {
            var event = new LifecycleEvent();

            event.initialize(name, sender);
            EventManager.sendEvent(event);
        }

        /**
         * Initializes the lifecycle event.
         * 
         * @param name The name of the event.
         * @param sender The sender of the event.
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
     * The intended external interface for the '$LifecycleEventStatic' injectable.
     */
    export interface ILifecycleEventStatic {
        /**
         * Creates a new LifecycleEvent and fires it.
         * 
         * @param name The name of the event.
         * @param sender The sender of the event.
         */
        dispatch(name: string, sender: any): void;
    }

    /**
     * Defines an object that represents a Lifecycle Event
     */
    export interface ILifecycleEvent extends IDispatchEventInstance {
        /**
         * Initializes the lifecycle event.
         * 
         * @param name The name of the event.
         * @param sender The sender of the event.
         */
        initialize(name: string, sender: any): void;
    }
}
