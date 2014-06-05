module plat.ui {
    export class Animator implements IAnimator {
        $Compat: ICompat = acquire(__Compat);
        $Promise: async.IPromise = acquire(__Promise);

        private __cssWarning = false;

        /**
         * Animates the element with the defined animation denoted by the key.
         * 
         * @param element The Element to be animated.
         * @param key The identifier specifying the type of animation.
         */
        animate(element: Element, key: string): async.IThenable<void> {
            if (!isNode(element) || element.nodeType !== Node.ELEMENT_NODE) {
                return this.$Promise.resolve<void>(null);
            }

            var $compat = this.$Compat,
                animation = animationInjectors[key],
                jsAnimation = jsAnimationInjectors[key],
                animationInstance: IAnimationInstance;

            if (!$compat.animationSupported || isUndefined(animation)) {
                if (isUndefined(jsAnimation)) {
                    return this.$Promise.resolve<void>(null);
                }

                animationInstance = jsAnimation.inject();
            } else {
                if (!(this.__cssWarning || $compat.platCss)) {
                    var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                    $exception.warn('CSS animation occurring and platypus.css was not found prior to platypus.js. If you ' +
                        'intend to use platypus.css, please move it before platypus.js inside your head or body declaration.',
                        $exception.ANIMATION);
                    this.__cssWarning = true;
                }

                animationInstance = animation.inject();
            }

            return (<Animation>animationInstance)._init(element);
        }
    }

    /**
     * The Type for referencing the '$Animator' injectable as a dependency.
     */
    export function IAnimator(): IAnimator {
        return new Animator();
    }

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
        $Compat: ICompat = acquire(__Compat);

        element: HTMLElement;
        dom: IDom = acquire(__Dom);

        private __resolve: () => void;
        private __reject: () => void;
        private __animationEvents: IAnimationEvents = this.$Compat.animationEvents;
        private __subscribers: Array<() => void> = [];

        /**
         * A function for initializing the animation or any of its properties before start.
         */
        initialize(): void { }

        /**
         * A function denoting the start of the animation.
         */
        start(): void { }

        /**
         * A function to be called when the animation is over.
         */
        end(): void {
            if (isFunction(this.__resolve)) {
                this.__resolve();
            }
            this.dispose();
        }

        /**
         * A function to be called to let it be known the animation is being cancelled.
         */
        cancel(): void {
            if (isFunction(this.__reject)) {
                this.__reject();
            }
            this.dispose();
        }

        /**
         * A function for reverting any modifications or changes that may have been made as a 
         * result of this animation.
         */
        dispose(): void {
            this.__subscribers = [];
        }

        /**
         * A function to listen to the start of an animation event.
         * 
         * @param listener The function to call when the animation begins.
         */
        animationStart(listener: EventListener): IAnimationInstance {
            return this.__addEventListener(this.__animationEvents.$animationStart, listener);
        }
        
        /**
         * A function to listen to the start of a transition event.
         * 
         * @param listener The function to call when the transition begins.
         */
        transitionStart(listener: EventListener): IAnimationInstance {
            return this.__addEventListener(this.__animationEvents.$transitionStart, listener);
        }
        
        /**
         * A function to listen to the end of an animation event.
         * 
         * @param listener The function to call when the animation ends.
         */
        animationEnd(listener: EventListener): IAnimationInstance {
            return this.__addEventListener(this.__animationEvents.$animationEnd, listener);
        }
        
        /**
         * A function to listen to the end of a transition event.
         * 
         * @param listener The function to call when the transition ends.
         */
        transitionEnd(listener: EventListener): IAnimationInstance {
            return this.__addEventListener(this.__animationEvents.$transitionEnd, listener);
        }
        
        /**
         * Initializes the element and key properties of this animation and passes in the function 
         * to resolve when finished.
         * 
         * @param element The element on which the animation will occur.
         */
        _init(element: Element): async.IThenable<void> {
            this.element = <HTMLElement>element;

            return new this.$Promise<void>((resolve, reject) => {
                this.__resolve = resolve;
                this.__reject = reject;
                this.initialize();
                this.start();
            });
        }

        private __addEventListener(event: string, listener: (ev?: Event) => void): IAnimationInstance {
            var subscribers = this.__subscribers,
                subscriber = () => {
                    var removeListener = this.dom.addEventListener(this.element, event, (ev: Event) => {
                        removeListener();

                        if (subscribers.length === 0) {
                            return;
                        }

                        listener(ev);
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
     * The Type for referencing the '$AnimationInstance' injectable as a dependency.
     */
    export function IAnimationInstance(): IAnimationInstance {
        return new Animation();
    }

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
         * A function for initializing the animation or any of its properties before start.
         */
        initialize(): void;

        /**
         * A function denoting the start of the animation.
         */
        start(): void;

        /**
         * A function to be called when the animation is over.
         */
        end(): void;

        /**
         * A function for reverting any modifications or changes that may have been made as a 
         * result of this animation.
         */
        dispose(): void;

        /**
         * A function to be called to let it be known the animation is being cancelled.
         */
        cancel(): void;

        /**
         * A function to listen to the start of an animation event.
         * 
         * @param listener The function to call when the animation begins.
         */
        animationStart(listener: EventListener): IAnimationInstance;

        /**
         * A function to listen to the start of a transition event.
         * 
         * @param listener The function to call when the transition begins.
         */
        transitionStart(listener: EventListener): IAnimationInstance;

        /**
         * A function to listen to the end of an animation event.
         * 
         * @param listener The function to call when the animation ends.
         */
        animationEnd(listener: EventListener): IAnimationInstance;

        /**
         * A function to listen to the end of a transition event.
         * 
         * @param listener The function to call when the transition ends.
         */
        transitionEnd(listener: EventListener): IAnimationInstance;
    }
}
