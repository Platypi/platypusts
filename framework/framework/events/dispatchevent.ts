module plat.events {
    export class DispatchEvent implements IDispatchEventInstance {
        $EventManagerStatic: IEventManagerStatic = acquire(__EventManagerStatic);

        sender: any;
        name: string;
        direction: string;
        
        initialize(name: string, sender: any, direction?: string): void;
        initialize(name: string, sender: any, direction?: 'up'): void;
        initialize(name: string, sender: any, direction?: 'down'): void;
        initialize(name: string, sender: any, direction?: 'direct'): void;
        initialize(name: string, sender: any, direction?: string) {
            this.name = name;
            this.direction = direction || this.$EventManagerStatic.DIRECT;
            this.sender = sender;
        }

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
     * Describes an event that propagates through a control tree. 
     * Propagation of the event always starts at the sender, allowing a control to both 
     * initialize and consume an event. If a consumer of an event throws an error while 
     * handling the event it will be logged to the app using exception.warn. Errors will 
     * not stop propagation of the event.
     */
    export interface IDispatchEventInstance {
        /**
         * The object that initiated the event.
         */
        sender: any;
        
        /**
         * The name of the event.
         */
        name: string;

        /**
         * The event direction this object is using for propagation.
         */
        direction: string;

        /**
         * Call this method to halt the propagation of an upward-moving event.
         * Downward events cannot be stopped with this method.
         */
        stopPropagation(): void;

        /**
         * @param name The name of the event.
         * @param sender The object that initiated the event.
         * @param direction='up' Equivalent to EventManager.UP.
         * 
         * @see EventManager
         */
        initialize(name: string, sender: any, direction?: 'up'): void;
        /**
         * @param name The name of the event.
         * @param sender The object that initiated the event.
         * @param direction='down' Equivalent to EventManager.DOWN.
         * 
         * @see EventManager
         */
        initialize(name: string, sender: any, direction?: 'down'): void;
        /**
         * @param name The name of the event.
         * @param sender The object that initiated the event.
         * @param direction='direct' Equivalent to EventManager.DIRECT.
         * 
         * @see EventManager
         */
        initialize(name: string, sender: any, direction?: 'direct'): void;
        /**
         * @param name The name of the event.
         * @param sender The object that initiated the event.
         * @param direction The event direction this object is using for propagation.
         *
         * 
         * @see EventManager
         */
        initialize(name: string, sender: any, direction?: string): void;
    }
}
