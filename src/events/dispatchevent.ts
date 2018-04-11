/**
 * @name events
 * @memberof plat
 * @kind namespace
 * @access public
 *
 * @description
 * Holds classes and interfaces related to event management components in platypus.
 */
namespace plat.events {
    'use strict';

    /**
     * @name DispatchEvent
     * @memberof plat.events
     * @kind class
     * @access public
     *
     * @description
     * An event class that propagates through a control tree.
     * Propagation of the event always starts at the sender, allowing a control to both
     * initialize and consume an event. If a consumer of an event throws an error while
     * handling the event it will be logged to the app using {@link plat.debug.Log.debug|Log.debug}. Errors will
     * not stop propagation of the event.
     */
    export class DispatchEvent {
        protected static _inject: any = {
            _EventManager: __EventManagerStatic,
            _ContextManager: __ContextManagerStatic,
        };

        /**
         * @name _EventManager
         * @memberof plat.events.DispatchEvent
         * @kind property
         * @access protected
         *
         * @type {plat.events.IEventManagerStatic}
         *
         * @description
         * Reference to the {@link plat.events.IEventManagerStatic|IEventManagerStatic} injectable.
         */
        protected _EventManager: IEventManagerStatic;

        /**
         * @name _ContextManager
         * @memberof plat.events.DispatchEvent
         * @kind property
         * @access protected
         *
         * @type {plat.events.ContextManagerStatic}
         *
         * @description
         * Reference to the {@link plat.events.ContextManagerStatic|IContextManagerStatic} injectable.
         */
        protected _ContextManager: observable.IContextManagerStatic;

        /**
         * @name sender
         * @memberof plat.events.DispatchEvent
         * @kind property
         * @access public
         *
         * @type {any}
         *
         * @description
         * The object that initiated the event.
         */
        public sender: any;

        /**
         * @name name
         * @memberof plat.events.DispatchEvent
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The name of the event.
         */
        public name: string;

        /**
         * @name direction
         * @memberof plat.events.DispatchEvent
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The event direction this object is using for propagation.
         */
        public direction: string;

        /**
         * @name defaultPrevented
         * @memberof plat.events.DispatchEvent
         * @kind property
         * @access public
         * @readonly
         *
         * @type {string}
         *
         * @description
         * Whether or not preventDefault() was called on the event. Senders of the
         * event can check this property to know if they should carry out a default
         * action as a result of the event.
         */
        public defaultPrevented: boolean = false;

        /**
         * @name stopped
         * @memberof plat.events.DispatchEvent
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * Whether or not the event propagation was stopped.
         */
        public stopped: boolean = false;

        /**
         * @name initialize
         * @memberof plat.events.DispatchEvent
         * @kind function
         * @access public
         *
         * @description
         * Initializes the event, populating its public properties.
         *
         * @param {string} name The name of the event.
         * @param {any} sender The object that initiated the event.
         * @param {string} direction The direction of propagation
         *
         * @returns {void}
         */
        public initialize(
            name: string,
            sender: any,
            direction?: 'up' | 'down' | 'direct' | string
        ): void {
            this.name = name;

            if (!isString(direction)) {
                this.direction = this._EventManager.UP;
            } else {
                this.direction = direction;
            }

            this.sender = sender;
        }

        /**
         * @name preventDefault
         * @memberof plat.events.DispatchEvent
         * @kind function
         * @access public
         *
         * @description
         * Cancels the default action (if there is one) for an event. Does not affect propagation.
         *
         * @returns {void}
         */
        public preventDefault(): void {
            if (!this.defaultPrevented) {
                this._ContextManager.defineGetter(
                    this,
                    'defaultPrevented',
                    true
                );
            }
        }

        /**
         * @name stopPropagation
         * @memberof plat.events.DispatchEvent
         * @kind function
         * @access public
         *
         * @description
         * Call this method to halt the propagation of an upward-moving event.
         * Downward events cannot be stopped with this method.
         *
         * @returns {void}
         */
        public stopPropagation(): void {
            if (this.direction === this._EventManager.UP) {
                this.stopped = true;
                (<any>this._EventManager.propagatingEvents)[this.name] = false;
            }
        }
    }

    register.injectable(
        __DispatchEventInstance,
        DispatchEvent,
        null,
        __INSTANCE
    );
}
