module plat.events {
    /**
     * Represents an internal Error Event. This is used for any 
     * internal errors (both fatal and warnings). All error events are 
     * direct events.
     */
    export class ErrorEvent<T extends Error> extends DispatchEvent implements IErrorEvent<T> {
        static $EventManagerStatic: IEventManagerStatic;
        /**
         * Creates a new ErrorEvent and fires it.
         * 
         * @param name The name of the event.
         * @param sender The sender of the event.
         * @param error The error that occurred, resulting in the event.
         */
        static dispatch<T extends Error>(name: string, sender: any, error: T) {
            var event = new ErrorEvent<T>();

            event.initialize(name, sender, null, error);
            ErrorEvent.$EventManagerStatic.sendEvent(event);
        }

        /**
         * The error being dispatched.
         */
        error: T;

        /**
         * @param name The name of the event.
         * @param sender The sender of the event.
         * @param direction='direct' This is always a direct event
         * @param error The error that occurred, resulting in the event.
         */
        initialize(name: string, sender: any, direction?: 'direct', error?: T);
        /**
         * @param name The name of the event.
         * @param sender The sender of the event.
         * @param direction This is always a direct event.
         * @param error The error that occurred, resulting in the event.
         */
        initialize(name: string, sender: any, direction?: string, error?: T);
        initialize(name: string, sender: any, direction?: string, error?: T) {
            super.initialize(name, sender, this.$EventManagerStatic.direction.DIRECT);

            this.error = error;
        }
    }
    
    /**
     * The Type for referencing the '$ErrorEventStatic' injectable as a dependency.
     */
    export function ErrorEventStatic($EventManagerStatic) {
        ErrorEvent.$EventManagerStatic = $EventManagerStatic;
        return ErrorEvent;
    }

    register.injectable('$ErrorEventStatic', ErrorEventStatic, [
        '$EventManagerStatic'
    ], register.injectableType.STATIC);
    
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
        dispatch<T extends Error>(name: string, sender: any, error: T): void;
    }

    /**
     * Defines an object that represents an Error Event. This is used for any 
     * internal errors (both fatal and warnings).
     */
    export interface IErrorEvent<T extends Error> extends IDispatchEvent {
        /**
         * The error being dispatched.
         */
        error: T;
        
        /**
         * @param name The name of the event.
         * @param sender The sender of the event.
         * @param direction='direct' This is always a direct event
         * @param error The error that occurred, resulting in the event.
         */
        initialize(name: string, sender: any, direction?: 'direct', error?: T);
        /**
         * @param name The name of the event.
         * @param sender The sender of the event.
         * @param direction This is always a direct event.
         * @param error The error that occurred, resulting in the event.
         */
        initialize(name: string, sender: any, direction?: string, error?: T);
    }
}
