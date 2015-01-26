module plat.ui.animations {
    /**
     * @name CssAnimation
     * @memberof plat.ui.animations
     * @kind class
     * 
     * @extends {plat.ui.animations.BaseAnimation}
     * 
     * @description
     * A class representing a single CSS animation for a single element.
     */
    export class CssAnimation extends BaseAnimation {
        /**
         * @name __animationEvents
         * @memberof plat.ui.animations.CssAnimation
         * @kind property
         * @access public
         * 
         * @type {plat.IAnimationEvents}
         * 
         * @description
         * A set of browser compatible CSS animation events capable of being listened to.
         */
        private __animationEvents: IAnimationEvents = this._compat.animationEvents;
        /**
         * @name __subscribers
         * @memberof plat.ui.animations.CssAnimation
         * @kind property
         * @access public
         * 
         * @type {Array<() => void>}
         * 
         * @description
         * A collection of animation event subscriptions used for chaining.
         */
        private __subscribers: Array<() => void> = [];
        /**
         * @name __removeListener
         * @memberof plat.ui.animations.CssAnimation
         * @kind property
         * @access public
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * The function to stop listening to the current event/animation in occurrence.
         */
        private __removeListener: IRemoveListener;

        /**
         * @name dispose
         * @memberof plat.ui.animations.CssAnimation
         * @kind function
         * @access public
         * 
         * @description
         * A function for reverting any modifications or changes that may have been made as a 
         * result of this animation.
         * 
         * @returns {void}
         */
        dispose(): void {
            if (isFunction(this.__removeListener)) {
                this.__removeListener();
                this.__removeListener = null;
            }
            this.__subscribers = [];
        }
        
        /**
         * @name animationStart
         * @memberof plat.ui.animations.CssAnimation
         * @kind function
         * @access public
         * 
         * @description
         * A function to listen to the start of an animation event.
         * 
         * @param {() => void} listener The function to call when the animation begins.
         * 
         * @returns {plat.ui.animations.CssAnimation} This instance (for chaining).
         */
        animationStart(listener: () => void): CssAnimation {
            return this.__addEventListener(this.__animationEvents.$animationStart, listener);
        }
        
        /**
         * @name transitionStart
         * @memberof plat.ui.animations.CssAnimation
         * @kind function
         * @access public
         * 
         * @description
         * A function to listen to the start of a transition event.
         * 
         * @param {() => void} listener The function to call when the transition begins.
         * 
         * @returns {plat.ui.animations.CssAnimation} This instance (for chaining).
         */
        transitionStart(listener: () => void): CssAnimation {
            return this.__addEventListener(this.__animationEvents.$transitionStart, listener);
        }
        
        /**
         * @name animationEnd
         * @memberof plat.ui.animations.CssAnimation
         * @kind function
         * @access public
         * 
         * @description
         * A function to listen to the end of an animation event.
         * 
         * @param {() => void} listener The function to call when the animation ends.
         * 
         * @returns {plat.ui.animations.CssAnimation} This instance (for chaining).
         */
        animationEnd(listener: () => void): CssAnimation {
            return this.__addEventListener(this.__animationEvents.$animationEnd, listener);
        }
        
        /**
         * @name animationEnd
         * @memberof plat.ui.animations.CssAnimation
         * @kind function
         * @access public
         * 
         * @description
         * A function to listen to the end of a transition event.
         * 
         * @param {() => void} listener The function to call when the transition ends.
         * 
         * @returns {plat.ui.animations.CssAnimation} This instance (for chaining).
         */
        transitionEnd(listener: () => void): CssAnimation {
            return this.__addEventListener(this.__animationEvents.$transitionEnd, listener);
        }
        
        /**
         * @name __addEventListener
         * @memberof plat.ui.animations.CssAnimation
         * @kind function
         * @access public
         * 
         * @description
         * Adds the listener for the desired event and handles subscription management and 
         * chaining.
         * 
         * @param {string} event The event to subscribe to.
         * @param {() => void} listener The function to call when the event fires.
         * 
         * @returns {plat.ui.animations.CssAnimation} This instance (for chaining).
         */
        private __addEventListener(event: string, listener: () => void): CssAnimation {
            var subscribers = this.__subscribers,
                subscriber = () => {
                    this.__removeListener = this.dom.addEventListener(this.element, event,(ev: Event) => {
                        this.__removeListener();
                        this.__removeListener = null;

                        if (subscribers.length === 0) {
                            return;
                        }

                        listener.call(this);
                        subscribers.shift();

                        if (subscribers.length === 0) {
                            return;
                        }

                        subscribers[0]();
                    }, false);
                };

            subscribers.push(subscriber);

            if (subscribers.length === 1) {
                subscriber();
            }

            return this;
        }
    }
}
