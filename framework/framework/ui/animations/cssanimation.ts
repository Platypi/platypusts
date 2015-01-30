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
         * @returns {plat.IRemoveListener} A function to call in order to stop listening to the event.
         */
        animationStart(listener: (ev?: AnimationEvent) => void): IRemoveListener {
            var animationEvents = this.__animationEvents;
            if (isUndefined(animationEvents)) {
                return noop;
            }

            return this.addEventListener(animationEvents.$animationStart, listener, false);
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
         * @param {(ev?: AnimationEvent) => void} listener The function to call when the animation ends.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop listening to the event.
         */
        animationEnd(listener: (ev?: AnimationEvent) => void): IRemoveListener {
            var animationEvents = this.__animationEvents;
            if (isUndefined(animationEvents)) {
                return noop;
            }

            return this.addEventListener(animationEvents.$animationEnd, listener, false);
        }
        
        /**
         * @name animationIteration
         * @memberof plat.ui.animations.CssAnimation
         * @kind function
         * @access public
         * 
         * @description
         * A function to listen to the completion of an animation iteration.
         * 
         * @param {(ev?: AnimationEvent) => void} listener The function to call when the animation iteration completes.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop listening to the event.
         */
        animationIteration(listener: (ev?: AnimationEvent) => void): IRemoveListener {
            var animationEvents = this.__animationEvents;
            if (isUndefined(animationEvents)) {
                return noop;
            }

            return this.addEventListener(animationEvents.$animationIteration, listener, false);
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
         * @param {(ev?: TransitionEvent) => void} listener The function to call when the transition begins.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop listening to the event.
         */
        transitionStart(listener: (ev?: TransitionEvent) => void): IRemoveListener {
            var animationEvents = this.__animationEvents;
            if (isUndefined(animationEvents)) {
                return noop;
            }

            return this.addEventListener(animationEvents.$transitionStart, listener, false);
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
         * @param {(ev?: TransitionEvent) => void} listener The function to call when the transition ends.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop listening to the event.
         */
        transitionEnd(listener: (ev?: TransitionEvent) => void): IRemoveListener {
            var animationEvents = this.__animationEvents;
            if (isUndefined(animationEvents)) {
                return noop;
            }

            return this.addEventListener(animationEvents.$transitionEnd, listener, false);
        }
    }
}
