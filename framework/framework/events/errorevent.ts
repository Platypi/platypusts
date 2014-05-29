module plat.events {
    /**
     * Represents an internal Error Event. This is used for any 
     * internal errors (both fatal and warnings). All error events are 
     * direct events.
     */
    export class ErrorEvent<E extends Error> extends DispatchEvent implements IErrorEvent<E> {
        static $EventManagerStatic: IEventManagerStatic;

        /**
         * Creates a new ErrorEvent and fires it.
         * 
         * @param name The name of the event.
         * @param sender The sender of the event.
         * @param error The error that occurred, resulting in the event.
         */
        static dispatch<E extends Error>(name: string, sender: any, error: E): void {
            var event = new ErrorEvent<E>();

            event.initialize(name, sender, null, error);
            ErrorEvent.$EventManagerStatic.sendEvent(event);
        }

        error: E;

        initialize(name: string, sender: any, direction?: 'direct', error?: E): void;
        initialize(name: string, sender: any, direction?: string, error?: E): void;
        initialize(name: string, sender: any, direction?: string, error?: E) {
            super.initialize(name, sender, this.$EventManagerStatic.DIRECT);

            this.error = error;
        }
    }
    
    /**
     * The Type for referencing the '$ErrorEventStatic' injectable as a dependency.
     */
    export function IErrorEventStatic($EventManagerStatic: IEventManagerStatic): IErrorEventStatic {
        ErrorEvent.$EventManagerStatic = $EventManagerStatic;
        return ErrorEvent;
    }

    register.injectable(__ErrorEventStatic, IErrorEventStatic, [__EventManagerStatic], register.STATIC);
    
    /**
     * The intended external interface for the $ErrorEventStatic injectable.
     */
    export interface IErrorEventStatic {
        /**
         * Creates a new ErrorEvent and fires it.
         *
         * @param name The name of the event.
         * @param sender The sender of the event.
         * @param error The error that occurred, resulting in the event.
         */
        dispatch<E extends Error>(name: string, sender: any, error: E): void;
    }

    /**
     * Defines an object that represents an Error Event. This is used for any 
     * internal errors (both fatal and warnings).
     */
    export interface IErrorEvent<E extends Error> extends IDispatchEventInstance {
        /**
         * The error being dispatched.
         */
        error: E;
        
        /**
         * @param name The name of the event.
         * @param sender The sender of the event.
         * @param direction='direct' This is always a direct event
         * @param error The error that occurred, resulting in the event.
         */
        initialize(name: string, sender: any, direction?: 'direct', error?: E): void;
        /**
         * @param name The name of the event.
         * @param sender The sender of the event.
         * @param direction This is always a direct event.
         * @param error The error that occurred, resulting in the event.
         */
        initialize(name: string, sender: any, direction?: string, error?: E): void;
    }
}
