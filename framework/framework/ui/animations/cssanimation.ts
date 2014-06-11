module plat.ui {
    /**
     * A class representing a single CSS animation for a single element.
     */
    export class CssAnimation extends BaseAnimation implements ICssAnimation {
        private __animationEvents: IAnimationEvents = this.$Compat.animationEvents;
        private __subscribers: Array<() => void> = [];
        private __removeListener: IRemoveListener;

        /**
         * A function for reverting any modifications or changes that may have been made as a 
         * result of this animation.
         */
        dispose(): void {
            if (isFunction(this.__removeListener)) {
                this.__removeListener();
                this.__removeListener = null;
            }
            this.__subscribers = [];
            super.dispose();
        }

        /**
         * A function to listen to the start of an animation event.
         * 
         * @param listener The function to call when the animation begins.
         */
        animationStart(listener: () => void): ICssAnimation {
            return this.__addEventListener(this.__animationEvents.$animationStart, listener);
        }

        /**
         * A function to listen to the start of a transition event.
         * 
         * @param listener The function to call when the transition begins.
         */
        transitionStart(listener: () => void): ICssAnimation {
            return this.__addEventListener(this.__animationEvents.$transitionStart, listener);
        }

        /**
         * A function to listen to the end of an animation event.
         * 
         * @param listener The function to call when the animation ends.
         */
        animationEnd(listener: () => void): ICssAnimation {
            return this.__addEventListener(this.__animationEvents.$animationEnd, listener);
        }

        /**
         * A function to listen to the end of a transition event.
         * 
         * @param listener The function to call when the transition ends.
         */
        transitionEnd(listener: () => void): ICssAnimation {
            return this.__addEventListener(this.__animationEvents.$transitionEnd, listener);
        }

        private __addEventListener(event: string, listener: () => void): ICssAnimation {
            var subscribers = this.__subscribers,
                subscriber = () => {
                    this.__removeListener = this.dom.addEventListener(this.element, event, (ev: Event) => {
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

    /**
     * Describes an object representing a single CSS animation for a single element.
     */
    export interface ICssAnimation extends IBaseAnimation {
        /**
         * A function to listen to the start of an animation event.
         * 
         * @param listener The function to call when the animation begins.
         */
        animationStart(listener: () => void): ICssAnimation;

        /**
         * A function to listen to the start of a transition event.
         * 
         * @param listener The function to call when the transition begins.
         */
        transitionStart(listener: () => void): ICssAnimation;

        /**
         * A function to listen to the end of an animation event.
         * 
         * @param listener The function to call when the animation ends.
         */
        animationEnd(listener: () => void): ICssAnimation;

        /**
         * A function to listen to the end of a transition event.
         * 
         * @param listener The function to call when the transition ends.
         */
        transitionEnd(listener: () => void): ICssAnimation;
    }
}
