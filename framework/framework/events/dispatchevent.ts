module plat.events {
    export class DispatchEvent implements IDispatchEvent {
        $EventManagerStatic: IEventManagerStatic = acquire('$EventManagerStatic');
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
         * @param name The name of the event.
         * @param sender The object that initiated the event.
         * @param direction The event direction this object is using for propagation.
         * 
         * @see EventManager
         */
        initialize(name: string, sender: any, direction?: string);
        /**
         * @param name The name of the event.
         * @param sender The object that initiated the event.
         * @param direction='up' Equivalent to EventManager.UP.
         * 
         * @see EventManager
         */
        initialize(name: string, sender: any, direction?: 'up');
        /**
         * @param name The name of the event.
         * @param sender The object that initiated the event.
         * @param direction='down' Equivalent to EventManager.DOWN.
         * 
         * @see EventManager
         */
        initialize(name: string, sender: any, direction?: 'down');
        /**
         * @param name The name of the event.
         * @param sender The object that initiated the event.
         * @param direction='direct' Equivalent to EventManager.DIRECT.
         * 
         * @see EventManager
         */
        initialize(name: string, sender: any, direction?: 'direct');
        initialize(name: string, sender: any, direction?: string) {
            this.name = name;
            this.direction = direction || this.$EventManagerStatic.direction.DIRECT;
            this.sender = sender;
        }

        /**
         * Call this method to halt the propagation of an upward-moving event.
         * Other events cannot be stopped with this method.
         */
        stopPropagation() {
            if (this.direction === this.$EventManagerStatic.direction.UP) {
                this.$EventManagerStatic.propagatingEvents[this.name] = false;
            }
        }
    }

    register.injectable('$dispatchEvent', DispatchEvent, null, register.injectableType.MULTI);

    /**
     * Describes an event that propagates through a control tree. 
     * Propagation of the event always starts at the sender, allowing a control to both 
     * initialize and consume an event. If a consumer of an event throws an error while 
     * handling the event it will be logged to the app using exception.warn. Errors will 
     * not stop propagation of the event.
     */
    export interface IDispatchEvent {
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
        initialize(name: string, sender: any, direction?: 'up');
        /**
         * @param name The name of the event.
         * @param sender The object that initiated the event.
         * @param direction='down' Equivalent to EventManager.DOWN.
         * 
         * @see EventManager
         */
        initialize(name: string, sender: any, direction?: 'down');
        /**
         * @param name The name of the event.
         * @param sender The object that initiated the event.
         * @param direction='direct' Equivalent to EventManager.DIRECT.
         * 
         * @see EventManager
         */
        initialize(name: string, sender: any, direction?: 'direct');
        /**
         * @param name The name of the event.
         * @param sender The object that initiated the event.
         * @param direction The event direction this object is using for propagation.
         *
         * 
         * @see EventManager
         */
        initialize(name: string, sender: any, direction?: string);
    }
}
