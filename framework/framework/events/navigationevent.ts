module plat.events {
    /**
     * A class used by the Navigator to dispatch Navigation events. Allows anyone to listen 
     * for navigation events and respond to them, even canceling them if necessary.
     */
    export class NavigationEvent<T, U, V> extends DispatchEvent implements INavigationEvent<T, U, V> {
        static $EventManagerStatic: IEventManagerStatic;
        /**
         * Dispatches an event with the specified target type.
         * 
         * @param name The name of the event (e.g. 'beforeNavigate')
         * @param sender The object sending the event.
         * @param eventOptions An object implementing INavigationEvent, specifying what all event listeners
         * will be passed.
         */
        static dispatch<T, U, V>(name: string, sender: V, eventOptions: INavigationEventOptions<T, U>) {
            var event = new NavigationEvent<T, U, V>();

            event.initialize(name, sender, null, eventOptions);
            NavigationEvent.$EventManagerStatic.sendEvent(event, []);

            return event;
        }

        /**
         * Navigation parameter, used to send objects from one view control to another.
         */
        parameter: any;

        /**
         * The INavigationOptions in use for the navigation.
         */
        options: navigation.IBaseNavigationOptions;

        /**
         * The navigation event target. Its type depends on the type of Navigation event.
         */
        target: T;

        /**
         * Specifies the type of IViewControl for the Route Event.
         */
        type: string;

        /**
         * States whether or not this event is able to be canceled. Some navigation events can be 
         * canceled, preventing further navigation.
         */
        cancelable: boolean = true;

        /**
         * States whether or not this event has been canceled.
         */
        canceled: boolean = false;

        /**
         * Initializes the event members.
         * 
         * @param name The name of the event.
         * @param sender The object that initiated the event.
         * @param direction This will always be a direct event no matter what is sent in.
         * 
         * @see EventManager.direction
         */
        initialize(name: string, sender: V, direction?: string, eventOptions?: INavigationEventOptions<T, U>) {
            super.initialize(name, sender, this.$EventManagerStatic.direction.DIRECT);
            this.parameter = eventOptions.parameter;
            this.options = eventOptions.options;
            this.target = eventOptions.target;
            this.type = eventOptions.type;
        }

        /**
         * If the event is cancelable (ev.cancelable), calling this method will cancel the event.
         */
        cancel() {
            if (this.cancelable) {
                this.canceled = true;

                this.$EventManagerStatic.propagatingEvents[this.name] = false;
            }
        }
    }

    /**
     * The Type for referencing the '$NavigationEventStatic' injectable as a dependency.
     */
    export function NavigationEventStatic($EventManagerStatic) {
        NavigationEvent.$EventManagerStatic = $EventManagerStatic;
        return NavigationEvent;
    }

    register.injectable('$NavigationEventStatic', NavigationEventStatic, [
        '$EventManagerStatic'
    ], register.injectableType.STATIC);

    /**
     * Describes options for an INavigationEvent. The generic parameter specifies the 
     * target type for the event.
     */
    export interface INavigationEventOptions<T, U> {
        /**
         * Navigation parameter, used to send objects from one view control to another.
         */
        parameter: U;

        /**
         * The INavigationOptions in use for the navigation.
         */
        options: navigation.IBaseNavigationOptions;

        /**
         * The navigation event target. Its type depends on the type of Navigation event.
         */
        target: T;

        /**
         * Specifies the type of IViewControl for the Route Event.
         */
        type: string;

        /**
         * States whether or not this event is able to be canceled. Some navigation events can be 
         * canceled, preventing further navigation.
         */
        cancelable?: boolean;
    }

    /**
     * Describes an object used by the Navigator to dispatch Navigation events.
     */
    export interface INavigationEvent<T, U, V> extends IDispatchEvent {
        /**
         * Navigation parameter, used to send objects from one view control to another.
         */
        parameter: U;

        /**
         * The INavigationOptions in use for the navigation.
         */
        options: navigation.IBaseNavigationOptions;

        /**
         * The navigation event target. Its type depends on the type of Navigation event.
         */
        target: T;

        /**
         * Specifies the type of IViewControl for the Route Event.
         */
        type: string;

        /**
         * The sender of the event.
         */
        sender: V;

        /**
         * States whether or not this event is able to be canceled. Some navigation events can be 
         * canceled, preventing further navigation.
         */
        cancelable?: boolean;

        /**
         * States whether or not this event has been canceled.
         */
        canceled?: boolean;

        /**
         * If the event is cancelable (ev.cancelable), calling this method will cancel the event.
         */
        cancel(): void;

        /**
         * Initializes the event members.
         * 
         * @param name The name of the event.
         * @param sender The object that initiated the event.
         * @param direction='direct' Equivalent to EventManager.direction.DIRECT.
         * 
         * @see EventManager.direction
         */
        initialize(name: string, sender: V, direction?: 'direct', eventOptions?: INavigationEventOptions<T, U>);
        /**
         * Initializes the event members.
         * 
         * @param name The name of the event.
         * @param sender The object that initiated the event.
         * @param direction This will always be a direct event no matter what is sent in.
         * 
         * @see EventManager.direction
         */
        initialize(name: string, sender: V, direction?: string, eventOptions?: INavigationEventOptions<T, U>);
    }

    /**
     * The intended external interface for the '$NavigationEventStatic' injectable.
     */
    export interface INavigationEventStatic {
        /**
         * Dispatches an event with the specified target type.
         *
         * @param name The name of the event (e.g. 'beforeNavigate')
         * @param sender The object sending the event.
         * @param eventOptions An object implementing INavigationEvent, specifying what all event listeners
         * will be passed.
         */
        dispatch<T, U, V>(name: string, sender: V, eventOptions: events.INavigationEventOptions<T, U>): INavigationEvent<T, U, V>;
    }
}
