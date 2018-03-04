namespace plat.ui.animations {
    'use strict';

    /**
     * @name BaseAnimation
     * @memberof plat.ui.animations
     * @kind class
     *
     * @implements {plat.ui.animations.IAnimationEssentials}
     *
     * @description
     * A class representing a single animation for a single element.
     */
    export class BaseAnimation implements IAnimationEssentials {
        protected static _inject: any = {
            _window: __Window,
            _compat: __Compat,
            _log: __Log,
            _Promise: __Promise,
            dom: __Dom,
            utils: __Utils,
        };

        /**
         * @name element
         * @memberof plat.ui.animations.BaseAnimation
         * @kind property
         * @access public
         *
         * @type {HTMLElement}
         *
         * @description
         * The node having the animation performed on it.
         */
        public element: HTMLElement;

        /**
         * @name dom
         * @memberof plat.ui.animations.BaseAnimation
         * @kind property
         * @access public
         *
         * @type {plat.ui.Dom}
         *
         * @description
         * Contains DOM helper methods for manipulating this control's element.
         */
        public dom: Dom;

        /**
         * @name utils
         * @memberof plat.ui.animations.BaseAnimation
         * @kind property
         * @access public
         *
         * @type {plat.Utils}
         *
         * @description
         * Contains helper methods for data manipulation.
         */
        public utils: Utils;

        /**
         * @name options
         * @memberof plat.ui.animations.BaseAnimation
         * @kind property
         * @access public
         *
         * @type {any}
         *
         * @description
         * Specified options for the animation.
         */
        public options: any;

        /**
         * @name _log
         * @memberof plat.ui.animations.BaseAnimation
         * @kind property
         * @access protected
         *
         * @type {plat.debug.Log}
         * @description
         * Reference to the {@link plat.debug.Log|Log} injectable.
         */
        protected _log: debug.Log;

        /**
         * @name _window
         * @memberof plat.ui.animations.BaseAnimation
         * @kind property
         * @access protected
         *
         * @type {Window}
         *
         * @description
         * Reference to the Window injectable.
         */
        protected _window: Window;

        /**
         * @name _compat
         * @memberof plat.ui.animations.BaseAnimation
         * @kind property
         * @access protected
         *
         * @type {plat.Compat}
         *
         * @description
         * Reference to the {@link plat.Compat|Compat} injectable.
         */
        protected _compat: Compat;

        /**
         * @name _Promise
         * @memberof plat.ui.animations.BaseAnimation
         * @kind property
         * @access protected
         *
         * @type {plat.async.IPromise}
         *
         * @description
         * Reference to the {@link plat.async.IPromise|IPromise} injectable.
         */
        protected _Promise: async.IPromise;

        /**
         * @name _resolve
         * @memberof plat.ui.animations.BaseAnimation
         * @kind property
         * @access protected
         *
         * @type {() => void}
         *
         * @description
         * The resolve function for the end of the animation.
         */
        protected _resolve: () => void;

        /**
         * @name __eventListeners
         * @memberof plat.ui.animations.BaseAnimation
         * @kind property
         * @access private
         *
         * @type {Array<plat.IRemoveListener>}
         *
         * @description
         * An Array of remove functions to dispose of event listeners.
         */
        private __eventListeners: IRemoveListener[] = [];

        /**
         * @name initialize
         * @memberof plat.ui.animations.BaseAnimation
         * @kind function
         * @access public
         * @virtual
         *
         * @description
         * A function for initializing the animation or any of its properties before start.
         *
         * @returns {void}
         */
        public initialize(): void {}

        /**
         * @name start
         * @memberof plat.ui.animations.BaseAnimation
         * @kind function
         * @access public
         * @virtual
         *
         * @description
         * A function denoting the start of the animation.
         *
         * @returns {void}
         */
        public start(): void {}

        /**
         * @name end
         * @memberof plat.ui.animations.BaseAnimation
         * @kind function
         * @access public
         *
         * @description
         * A function to be called when the animation is over.
         *
         * @returns {void}
         */
        public end(): void {
            const eventListeners = this.__eventListeners;
            while (eventListeners.length > 0) {
                eventListeners.pop()();
            }

            if (isFunction(this._resolve)) {
                this._resolve();
                this._resolve = null;
            }
        }

        /**
         * @name pause
         * @memberof plat.ui.animations.BaseAnimation
         * @kind function
         * @access public
         * @virtual
         *
         * @description
         * A function to be called to pause the animation.
         *
         * @returns {plat.async.Promise<void>} A new promise that resolves when the animation has been paused.
         */
        public pause(): async.Promise<void> {
            return this._Promise.resolve();
        }

        /**
         * @name resume
         * @memberof plat.ui.animations.BaseAnimation
         * @kind function
         * @access public
         * @virtual
         *
         * @description
         * A function to be called to resume a paused animation.
         *
         * @returns {plat.async.Promise<void>} A new promise that resolves when the animation has resumed.
         */
        public resume(): async.Promise<void> {
            return this._Promise.resolve();
        }

        /**
         * @name cancel
         * @memberof plat.ui.animations.BaseAnimation
         * @kind function
         * @access public
         * @virtual
         *
         * @description
         * A function to be called to let it be known the animation is being cancelled. Although not
         * necessary, we call end() in this function as well for safe measure.
         *
         * @returns {void}
         */
        public cancel(): void {
            this.end();
        }

        /**
         * @name addEventListener
         * @memberof plat.ui.animations.BaseAnimation
         * @kind function
         * @access public
         *
         * @description
         * Adds an event listener of the specified type to this animation's element. Removal of the
         * event is handled automatically upon animation end.
         *
         * @param {string} type The type of event to listen to.
         * @param {EventListener} listener The listener to fire when the event occurs.
         * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
         * of event propagation.
         *
         * @returns {plat.IRemoveListener} A function to call in order to stop listening to the event.
         */
        public addEventListener(
            type: string,
            listener: EventListener,
            useCapture?: boolean
        ): IRemoveListener {
            if (!isFunction(listener)) {
                this._log.warn(
                    'An animation\'s "addEventListener" must take a function as the second argument.'
                );

                return noop;
            }

            listener = listener.bind(this);

            const removeListener = this.dom.addEventListener(
                this.element,
                type,
                (ev: Event) => {
                    ev.stopPropagation();
                    listener(ev);
                },
                useCapture
            );
            const eventListeners = this.__eventListeners;

            eventListeners.push(removeListener);

            return (): void => {
                removeListener();
                const index = eventListeners.indexOf(removeListener);
                if (index !== -1) {
                    eventListeners.splice(index, 1);
                }
            };
        }

        /**
         * @name instantiate
         * @memberof plat.ui.animations.BaseAnimation
         * @kind function
         * @access public
         *
         * @description
         * Initializes the element and key properties of this animation and grabs a
         * reference to its resolve function.
         *
         * @param {Element} element The element on which the animation will occur.
         * @param {any} options Specified options for the animation.
         *
         * @returns {plat.ui.animations.IAnimationPromise} The promise that will resolve when the
         * animation is complete and end() is called.
         */
        public instantiate(
            element: Element,
            options?: any
        ): IAnimatingThenable {
            this.element = <HTMLElement>element;
            this.options = options;

            const promise = new AnimationPromise((resolve): void => {
                this._resolve = resolve;
                this.initialize();
            });

            promise.initialize(this);

            return promise;
        }
    }
}
