﻿module plat.ui {
    export class Animator implements IAnimator {
        $Compat: ICompat = acquire(__Compat);
        $Promise: async.IPromise = acquire(__Promise);

        animate(element: Element, key: string): async.IThenable<void>;
        animate(element: any, key: string): async.IThenable<void> {
            return new this.$Promise<void>((resolve, reject) => {
                var animation = animationInjectors[key],
                    jsAnimation = jsAnimationInjectors[key],
                    animationSupported = this.$Compat.supportsAnimations,
                    animationInstance: IAnimationInstance;

                if (!animationSupported || isUndefined(animation)) {
                    if (isUndefined(jsAnimation)) {
                        return;
                    }

                    animationInstance = jsAnimation.inject();
                } else {
                    animationInstance = animation.inject();
                }

                (<Animation>animationInstance)._initialize(element, resolve, reject);
                animationInstance.start();
            });
        }
    }

    /**
     * The Type for referencing the '$Animator' injectable as a dependency.
     */
    export var IAnimator = Animator;

    register.injectable('$Animator', IAnimator);

    export interface IAnimator {
        /**
         * Animates the element with the defined animation denoted by the key.
         * 
         * @param element The Element to be animated.
         * @param key The identifier specifying the type of animation.
         */
        animate(element: Element, key: string): async.IThenable<void>;
    }

    export class Animation implements IAnimationInstance {
        $Promise: async.IPromise = acquire(__Promise);

        element: HTMLElement;
        dom: IDom = acquire(__Dom);

        private __resolve: () => void;
        private __reject: () => void;
        private __animationEvents: IAnimationEvents = (<ICompat>acquire(__Compat)).animationEvents;
        private __subscriptions: Array<() => void> = [];

        start(): void { }

        end(): void {
            if (isFunction(this.__resolve)) {
                this.__resolve();
            }
        }

        cancel(): void {
            if (isFunction(this.__reject)) {
                this.__reject();
            }
        }

        animationStart(listener?: () => void): IAnimationInstance {
            return this.__addEventListener(this.__animationEvents.$animationStart, listener);
        }

        transitionStart(listener?: () => void): IAnimationInstance {
            return this.__addEventListener(this.__animationEvents.$transitionStart, listener);
        }

        animationEnd(listener?: () => void): IAnimationInstance {
            return this.__addEventListener(this.__animationEvents.$animationEnd, listener);
        }

        transitionEnd(listener?: () => void): IAnimationInstance {
            return this.__addEventListener(this.__animationEvents.$transitionEnd, listener);
        }
        
        /**
         * Initializes the element and key properties of this animation and passes in the function 
         * to resolve when finished.
         * 
         * @param element The element on which the animation will occur.
         * @param key The unique key for this animation.
         * @param resolve The resolve function to be called when the animation is finished.
         * @param reject The reject function to be called if the animation is cancelled.
         */
        _initialize(element: Element, resolve: () => void, reject: () => void): void {
            this.element = <HTMLElement>element;
            this.__resolve = resolve;
            this.__reject = reject;
        }

        private __addEventListener(event: string, listener: () => void): IAnimationInstance {
            var subscriptions = this.__subscriptions,
                subscription = () => {
                    var removeListener = this.dom.addEventListener(this.element, event, () => {
                        removeListener();
                        listener();
                        subscriptions.shift();
                        if (subscriptions.length === 0) {
                            return;
                        }
                        subscriptions[0]();
                    }, false);
                };

            subscriptions.push(subscription);

            if (subscriptions.length === 1) {
                subscriptions[0]();
            }

            return this;
        }
    }

    /**
     * The Type for referencing the '$AnimationInstance' injectable as a dependency.
     */
    export var IAnimationInstance = Animation;

    register.injectable('$AnimationInstance', IAnimationInstance, null, register.INSTANCE);

    export interface IAnimationInstance {
        /**
         * The node having the animation performed on it.
         */
        element: HTMLElement;

        /**
         * Contains DOM helper methods for manipulating this control's element.
         */
        dom: IDom;

        /**
         * A function denoting the start of the animation.
         */
        start(): void;

        /**
         * A function to be called when the animation is over.
         */
        end(): void;

        /**
         * A function to be called to let it be known the animation is being cancelled.
         */
        cancel(): void;

        /**
         * A function to listen to the start of an animation event.
         * 
         * @param listener The function to call when the animation begins.
         */
        animationStart(listener: () => void): IAnimationInstance;

        /**
         * A function to listen to the start of a transition event.
         * 
         * @param listener The function to call when the transition begins.
         */
        transitionStart(listener: () => void): IAnimationInstance;

        /**
         * A function to listen to the end of an animation event.
         * 
         * @param listener The function to call when the animation ends.
         */
        animationEnd(listener: () => void): IAnimationInstance;

        /**
         * A function to listen to the end of a transition event.
         * 
         * @param listener The function to call when the transition ends.
         */
        transitionEnd(listener: () => void): IAnimationInstance;
    }
}
