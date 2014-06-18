module plat.ui {
    /**
     * A class used for animating elements.
     */
    export class Animator implements IAnimator {
        $Compat: ICompat = acquire(__Compat);

        /**
         * All elements currently being animated.
         */
        _elements: IObject<IAnimatedElement> = {};

        private __cssWarning = false;

        /**
         * Animates the element with the defined animation denoted by the key.
         * 
         * @param element The Element to be animated.
         * @param key The identifier specifying the type of animation.
         * @param options Specified options for the animation.
         */
        animate(element: Element, key: string, options?: any): IAnimationPromise {
            if (!isNode(element) || element.nodeType !== Node.ELEMENT_NODE || this.__parentIsAnimating(element)) {
                return this.__resolvePromise();
            }

            var $compat = this.$Compat,
                animation = animationInjectors[key],
                jsAnimation = jsAnimationInjectors[key],
                animationInstance: IBaseAnimation;

            if (!$compat.animationSupported || isUndefined(animation)) {
                if (isUndefined(jsAnimation)) {
                    return this.__resolvePromise();
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

            var id = this.__setAnimationId(element, animationInstance);
            this.__stopChildAnimations(element, id);
            var animationObj = this._elements[id],
                animationPromise = (<BaseAnimation>animationInstance)._init(element, options).then(() => {
                    animationObj.promise = null;
                    animationObj.animationEnd();
                });

            if (!isNull(animationObj.promise)) {
                return animationObj.promise.then(() => {
                    return animationPromise;
                });
            }

            return (animationObj.promise = animationPromise);
        }

        private __parentIsAnimating(element: Node): boolean {
            while (!isDocument(element = element.parentNode) && element.nodeType === Node.ELEMENT_NODE) {
                if (hasClass(<HTMLElement>element, __Animating)) {
                    return true;
                }
            }

            return false;
        }

        private __setAnimationId(element: Node, animationInstance: IBaseAnimation): string {
            var elements = this._elements,
                plat = (<ICustomElement>element).__plat,
                id: string;

            if (isUndefined(plat)) {
                (<ICustomElement>element).__plat = plat = {};
            }

            if (isUndefined(plat.animation)) {
                plat.animation = id = uniqueId('animation_');
            } else {
                id = plat.animation;
            }

            var animationObj = elements[id],
                removeListener = (reanimating?: boolean) => {
                if (reanimating === true) {
                    animationInstance.cancel();
                    return;
                }

                removeClass(<HTMLElement>element, __Animating);
                delete elements[id];
                delete plat.animation;
                if (isEmpty(plat)) {
                    delete (<ICustomElement>element).__plat;
                }
            };

            if (isUndefined(animationObj)) {
                addClass(<HTMLElement>element, __Animating);
                elements[id] = {
                    animationEnd: removeListener
                };
            } else {
                animationObj.animationEnd(true);
                animationObj.animationEnd = removeListener;
            }

            return id;
        }

        private __stopChildAnimations(element: Element, id: string): void {
            var elements = this._elements,
                animatedElements = Array.prototype.slice.call(element.querySelectorAll('.' + __Animating)),
                length = animatedElements.length,
                animatedElement: ICustomElement,
                plat: ICustomElementProperty;

            while (length-- > 0) {
                animatedElement = animatedElements[length];
                plat = animatedElement.__plat;
                if (isUndefined(plat) || isUndefined(plat.animation)) {
                    continue;
                }

                id = plat.animation;
                if (isFunction(elements[id])) {
                    elements[id].animationEnd();
                }
            }
        }

        private __resolvePromise() {
            return new AnimationPromise((resolve) => {
                resolve();
            });
        }
    }

    /**
     * The Type for referencing the '$Animator' injectable as a dependency.
     */
    export function IAnimator(): IAnimator {
        return new Animator();
    }

    register.injectable('$Animator', IAnimator);

    /**
     * Describes an object used for animating elements.
     */
    export interface IAnimator {
        /**
         * Animates the element with the defined animation denoted by the key.
         * 
         * @param element The Element to be animated.
         * @param key The identifier specifying the type of animation.
         * @param options Specified options for the animation.
         */
        animate(element: Element, key: string, options?: any): IAnimationPromise;
    }

    /**
     * Describes an object representing a currenlty animated element.
     */
    export interface IAnimatedElement {
        /**
         * The function called at the conclusion of the animation.
         * 
         * @param reanimated Specifies whether the element is being reanimated while 
         * in a current animation.
         */
        animationEnd: (reanimated?: boolean) => void;

        /**
         * A promise representing an element's current state of animation.
         */
        promise?: IAnimationThenable<any>;
    }

    /**
     * Describes a type of Promise that fulfills with an IAjaxResponse and can be optionally canceled.
     */
    export class AnimationPromise extends async.Promise<void> implements IAnimationPromise {
        private __animationInstance: IBaseAnimation;
        constructor(resolveFunction: (resolve: (value?: void) => any) => void, promise?: any) {
            super(resolveFunction);
            if (!isNull(promise)) {
                this.__animationInstance = promise.__animationInstance;
            }
        }

        cancel(): IAnimationPromise {
            if (!isNull(this.__animationInstance)) {
                this.__animationInstance.cancel();
                this.__animationInstance.end();
            }

            return this;
        }

        then<U>(onFulfilled: (success: void) => U): IAnimationThenable<U>;
        then<U>(onFulfilled: (success: void) => async.IThenable<U>): IAnimationThenable<U>;
        then<U>(onFulfilled: (success: void) => any): IAnimationThenable<U>  {
            return <IAnimationThenable<U>><any>super.then<U>(onFulfilled);
        }

        catch<U>(onRejected: (error: any) => IAnimationThenable<U>): IAnimationThenable<U>;
        catch<U>(onRejected: (error: any) => U): IAnimationThenable<U>;
        catch<U>(onRejected: (error: any) => any): IAnimationThenable<U> {
            return <IAnimationThenable<U>><any>super.catch<U>(onRejected);
        }
    }

    /**
     * Describes a type of IThenable that can optionally cancel it's associated animation.
     */
    export interface IAnimationThenable<R> extends async.IThenable<R> {
        /**
         * A method to cancel the current animation.
         */
        cancel(): IAnimationPromise;

        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => IAnimationThenable<U>,
            onRejected?: (error: any) => IAnimationThenable<U>): IAnimationThenable<U>;
        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => IAnimationThenable<U>, onRejected?: (error: any) => U): IAnimationThenable<U>;
        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => IAnimationThenable<U>): IAnimationThenable<U>;
        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => U): IAnimationThenable<U>;

        /**
         * A wrapper method for Promise.then(undefined, onRejected);
         * 
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        catch<U>(onRejected: (error: any) => IAnimationThenable<U>): IAnimationThenable<U>;
        /**
         * A wrapper method for Promise.then(undefined, onRejected);
         * 
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        catch<U>(onRejected: (error: any) => U): IAnimationThenable<U>;
    }

    /**
     * Describes a type of IPromise that fulfills when an animation is finished and can be optionally canceled.
     */
    export interface IAnimationPromise extends IAnimationThenable<void> {
        /**
         * A method to cancel the current animation.
         */
        cancel(): IAnimationPromise;

        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: void) => U): IAnimationThenable<U>;

        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: void) => async.IThenable<U>): IAnimationThenable<U>;

        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: void) => IAnimationThenable<U>): IAnimationThenable<U>;
    }
}
