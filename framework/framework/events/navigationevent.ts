module plat.events {
    /**
     * A class used by the Navigator to dispatch Navigation events. Allows anyone to listen 
     * for navigation events and respond to them, even canceling them if necessary.
     * 
     * @generic P Corresponds to the type of event parameter.
     */
    export class NavigationEvent<P> extends DispatchEvent implements INavigationEvent<P> {
        static $EventManagerStatic: IEventManagerStatic;
        /**
         * Dispatches an event with the specified target type.
         * 
         * @param name The name of the event (e.g. 'beforeNavigate')
         * @param sender The object sending the event.
         * @param eventOptions An object implementing INavigationEvent, specifying what all event listeners
         * will be passed.
         */
        static dispatch<P>(name: string, sender: any, eventOptions: INavigationEventOptions<P>): INavigationEvent<P> {
            var event = new NavigationEvent<P>();

            event.initialize(name, sender, null, eventOptions);
            NavigationEvent.$EventManagerStatic.sendEvent(event, []);

            return event;
        }

        parameter: P;
        options: navigation.IBaseNavigationOptions;
        target: any;
        type: string;
        cancelable: boolean = true;
        cancelled: boolean = false;

        initialize(name: string, sender: any, direction?: string, eventOptions?: INavigationEventOptions<P>) {
            super.initialize(name, sender, this.$EventManagerStatic.DIRECT);
            this.parameter = eventOptions.parameter;
            this.options = eventOptions.options;
            this.target = eventOptions.target;
            this.type = eventOptions.type;
        }

        cancel() {
            if (this.cancelable) {
                this.cancelled = true;

                (<any>this.$EventManagerStatic.propagatingEvents)[this.name] = false;
            }
        }
    }

    /**
     * The Type for referencing the '$NavigationEventStatic' injectable as a dependency.
     */
    export function INavigationEventStatic($EventManagerStatic?: IEventManagerStatic): INavigationEventStatic {
        NavigationEvent.$EventManagerStatic = $EventManagerStatic;
        return NavigationEvent;
    }

    register.injectable(__NavigationEventStatic, INavigationEventStatic, [__EventManagerStatic], __STATIC);

    /**
     * The intended external interface for the '$NavigationEventStatic' injectable.
     */
    export interface INavigationEventStatic {
        /**
         * Dispatches an event with the specified target type.
         * 
         * @generic P Corresponds to the type of the event parameter.
         * 
         * @param name The name of the event (e.g. 'beforeNavigate')
         * @param sender The object sending the event.
         * @param eventOptions An object implementing INavigationEvent, specifying what all event listeners
         * will be passed.
         */
        dispatch<P>(name: string, sender: any, eventOptions: events.INavigationEventOptions<P>): INavigationEvent<P>;
    }

    /**
     * Describes an object used by the Navigator to dispatch Navigation events.
     */
    export interface INavigationEvent<P> extends IDispatchEventInstance {
        /**
         * Navigation parameter, used to send objects from one view control to another.
         */
        parameter: P;

        /**
         * The INavigationOptions in use for the navigation.
         */
        options: navigation.IBaseNavigationOptions;

        /**
         * The navigation event target. Its type depends on the type of Navigation event.
         */
        target: any;

        /**
         * Specifies the type of IViewControl for the Route Event.
         */
        type: string;

        /**
         * The sender of the event.
         */
        sender: any;

        /**
         * States whether or not this event is able to be cancelled. Some navigation events can be 
         * cancelled, preventing further navigation.
         */
        cancelable?: boolean;

        /**
         * States whether or not this event has been cancelled.
         */
        cancelled?: boolean;

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
        initialize(name: string, sender: any, direction?: 'direct', eventOptions?: INavigationEventOptions<P>);
        /**
         * Initializes the event members.
         * 
         * @param name The name of the event.
         * @param sender The object that initiated the event.
         * @param direction This will always be a direct event no matter what is sent in.
         * 
         * @see EventManager.direction
         */
        initialize(name: string, sender: any, direction?: string, eventOptions?: INavigationEventOptions<P>);
    }

    /**
     * Describes options for an INavigationEvent. The generic parameter specifies the 
     * target type for the event.
     */
    export interface INavigationEventOptions<P> {
        /**
         * Navigation parameter, used to send objects from one view control to another.
         */
        parameter: P;

        /**
         * The INavigationOptions in use for the navigation.
         */
        options: navigation.IBaseNavigationOptions;

        /**
         * The navigation event target. Its type depends on the type of Navigation event.
         */
        target: any;

        /**
         * Specifies the type of IViewControl for the Route Event.
         */
        type: string;

        /**
         * States whether or not this event is able to be cancelled. Some navigation events can be 
         * cancelled, preventing further navigation.
         */
        cancelable?: boolean;
    }
}
