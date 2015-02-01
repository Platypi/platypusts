module plat.ui.animations {
    'use strict';

    /**
     * @name BaseAnimation
     * @memberof plat.ui.animations
     * @kind class
     * 
     * @description
     * A class representing a single animation for a single element.
     */
    export class BaseAnimation {
        protected static _inject: any = {
            _compat: __Compat,
            _Exception: __ExceptionStatic,
            _Promise: __Promise,
            dom: __Dom
        };

        /**
         * @name _Exception
         * @memberof plat.ui.animations.BaseAnimation
         * @kind property
         * @access protected
         * 
         * @type {plat.IExceptionStatic}
         * 
         * @description
         * Reference to the {@link plat.IExceptionStatic|IExceptionStatic} injectable.
         */
        protected _Exception: IExceptionStatic;

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
        element: HTMLElement;

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
        dom: Dom;

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
        options: any;

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
        private __eventListeners: Array<IRemoveListener> = [];

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
        initialize(): void { }

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
        start(): void { }

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
        end(): void {
            if (isFunction(this._resolve)) {
                this._resolve();
                this._resolve = null;
            }

            var eventListeners = this.__eventListeners;
            while (eventListeners.length > 0) {
                eventListeners.pop()();
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
         * @returns {plat.async.IThenable<void>} A new promise that resolves when the animation has been paused.
         */
        pause(): async.IThenable<void> {
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
         * @returns {plat.async.IThenable<void>} A new promise that resolves when the animation has resumed.
         */
        resume(): async.IThenable<void> {
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
         * A function to be called to let it be known the animation is being cancelled.
         * 
         * @returns {void}
         */
        cancel(): void { }

        /**
         * @name dispose
         * @memberof plat.ui.animations.BaseAnimation
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * A function for reverting any modifications or changes that may have been made as a 
         * result of this animation.
         * 
         * @returns {void}
         */
        dispose(): void { }

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
        addEventListener(type: string, listener: EventListener, useCapture?: boolean): IRemoveListener {
            if (!isFunction(listener)) {
                var _Exception = this._Exception;
                _Exception.warn('An animation\'s "addEventListener" must take a function as the second argument.', _Exception.EVENT);
                return noop;
            }

            listener = listener.bind(this);
            var removeListener = this.dom.addEventListener(this.element, type, listener, useCapture),
                eventListeners = this.__eventListeners;

            eventListeners.push(removeListener);
            return () => {
                removeListener();
                var index = eventListeners.indexOf(removeListener);
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
        instantiate(element: Element, options?: any): IAnimatingThenable {
            this.element = <HTMLElement>element;
            this.options = options;

            var promise = new AnimationPromise((resolve) => {
                this._resolve = resolve;
                this.initialize();
            });

            promise.initialize(this);

            return promise;
        }
    }
}
