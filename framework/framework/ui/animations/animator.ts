module plat.ui.animations {
    /**
     * @name Animator
     * @memberof plat.ui.animations
     * @kind class
     * 
     * @description
     * A class used for animating elements.
     */
    export class Animator {
        protected static _inject: any = {
            _compat: __Compat
        };

        /**
         * @name _compat
         * @memberof plat.ui.animations.Animator
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
         * @name _elements
         * @memberof plat.ui.animations.Animator
         * @kind property
         * @access protected
         * 
         * @type {plat.IObject<plat.ui.animations.IAnimatedElement>}
         * 
         * @description
         * All elements currently being animated.
         */
        protected _elements: IObject<IAnimatedElement> = {};

        /**
         * @name animate
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * 
         * @description
         * Animates the element with the defined animation denoted by the key.
         * 
         * @param {Element} element The Element to be animated.
         * @param {string} key The identifier specifying the type of animation.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the animation is finished.
         */
        animate(element: Element, key: string, options?: any): IAnimatingThenable {
            if (!isNode(element) || element.nodeType !== Node.ELEMENT_NODE) {
                return this.resolve();
            }

            var animation = animationInjectors[key],
                jsAnimation = jsAnimationInjectors[key],
                animationInstance: BaseAnimation;

            if (!this._compat.animationSupported || isUndefined(animation)) {
                if (isUndefined(jsAnimation)) {
                    return this.resolve();
                }

                animationInstance = jsAnimation.inject();
            } else {
                animationInstance = animation.inject();
            }

            var animatingParentId = this.__parentIsAnimating(element),
                id = this.__setAnimationId(element, animationInstance),
                // instantiate needs to be called after __setAnimationId in the case that 
                // the same element is animating while in an animation
                animationPromise: IAnimationThenable<any> = animationInstance.instantiate(element, options),
                animatedElement = this._elements[id];

            if (!isNull(animatingParentId)) {
                animatedElement.animationEnd(true);

                var parent = this._elements[animatingParentId];
                if (isPromise(parent.promise)) {
                    return animationPromise.then(() => {
                        return () => {
                            return parent.promise;
                        };
                    });
                }

                return this.resolve();
            }

            this.__stopChildAnimations(element);
            animationPromise = animationPromise.then(() => {
                animatedElement.promise = null;
                animatedElement.animationEnd();
                return () => {
                    return animationPromise;
                };
            });

            if (isPromise(animatedElement.promise)) {
                return animatedElement.promise.then(() => {
                    animationInstance.start();
                    return (animatedElement.promise = animationPromise);
                });
            }

            animationInstance.start();
            return (animatedElement.promise = animationPromise);
        }

        /**
         * @name resolve
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * 
         * @description
         * Immediately resolves an empty {@link plat.ui.animations.AnimationPromise|AnimationPromise}.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} The immediately resolved 
         * {@link plat.ui.animations.AnimationPromise|AnimationPromise}.
         */
        resolve(): IAnimatingThenable {
            var animationPromise = new AnimationPromise((resolve) => {
                resolve(<IGetAnimatingThenable>() => {
                    return <IAnimationThenable<void>><any>animationPromise;
                });
            });

            return animationPromise;
        }

        /**
         * @name __parentIsAnimating
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access private
         * 
         * @description
         * Checks whether or not any parent elements are animating.
         * 
         * @param {Node} element The element whose parents we need to check.
         * 
         * @returns {string} The animating parent's ID if one exists.
         */
        private __parentIsAnimating(element: Node): string {
            var animationId: string;
            while (!isDocument(element = element.parentNode) && element.nodeType === Node.ELEMENT_NODE) {
                if (hasClass(<HTMLElement>element, __Animating)) {
                    animationId = ((<ICustomElement>element).__plat || <ICustomElementProperty>{}).animation;
                    if (isString(animationId)) {
                        if (!isNull(this._elements[animationId])) {
                            return animationId;
                        }

                        deleteProperty((<ICustomElement>element).__plat, 'animation');
                        if (isEmpty(plat)) {
                            deleteProperty(element, '__plat');
                        }
                        removeClass(<HTMLElement>element, __Animating);
                    }
                }
            }
        }

        /**
         * @name __setAnimationId
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access private
         * 
         * @description
         * Sets an new, unique animation ID and denotes the element as currently being animated.
         * 
         * @param {Node} element The element being animated.
         * @param {plat.ui.animations.BaseAnimation} animationInstance The animation instance doing the animating.
         * 
         * @returns {string} The new animation ID.
         */
        private __setAnimationId(element: Node, animationInstance: BaseAnimation): string {
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

            var animatedElement = elements[id],
                removeListener = (cancel?: boolean, reanimating?: boolean) => {
                    if (cancel === true) {
                        animationInstance.cancel();
                        animationInstance.end();
                        if (reanimating === true) {
                            return;
                        }
                    }

                    removeClass(<HTMLElement>element, __Animating);
                    deleteProperty(elements, id);
                    deleteProperty(plat, 'animation');
                    if (isEmpty(plat)) {
                        deleteProperty(element, '__plat');
                    }
                };

            if (isUndefined(animatedElement)) {
                addClass(<HTMLElement>element, __Animating);
                elements[id] = {
                    animationEnd: removeListener
                };
            } else {
                animatedElement.animationEnd(true, true);
                animatedElement.animationEnd = removeListener;
            }

            return id;
        }

        /**
         * @name __stopChildAnimations
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access private
         * 
         * @description
         * Forces child nodes of an animating element to stop animating.
         * 
         * @param {Element} element The element being animated.
         * 
         * @returns {void}
         */
        private __stopChildAnimations(element: Element): void {
            var elements = this._elements,
                customAnimationElements = Array.prototype.slice.call(element.querySelectorAll('.' + __Animating)),
                customAnimationElement: ICustomElement,
                animatedElement: IAnimatedElement,
                plat: ICustomElementProperty,
                id: string;

            while (customAnimationElements.length > 0) {
                customAnimationElement = customAnimationElements.pop();
                plat = customAnimationElement.__plat || <ICustomElementProperty>{};
                id = plat.animation;
                if (isNull(id)) {
                    continue;
                }

                animatedElement = elements[id] || <IAnimatedElement>{};
                if (isFunction(animatedElement.animationEnd)) {
                    animatedElement.animationEnd(true);
                }
            }
        }
    }

    register.injectable(__Animator, Animator);

    /**
     * @name IAnimatedElement
     * @memberof plat.ui.animations
     * @kind interface
     * 
     * @description
     * Describes an object representing a currenlty animated element.
     */
    export interface IAnimatedElement {
        /**
         * @name animationEnd
         * @memberof plat.ui.animations.IAnimatedElement
         * @kind function
         * @access public
         * 
         * @description
         * The function called at the conclusion of the animation.
         * 
         * @param {boolean} cancel? Specifies whether the animation is being cancelled.
         * @param {boolean} reanimating? Specifies whether the element is being reanimated while 
         * in a current animation. Cancel must be set to true for reanimation to take effect.
         * 
         * @returns {void}
         */
        animationEnd: (cancel?: boolean, reanimating?: boolean) => void;

        /**
         * @name promise
         * @memberof plat.ui.animations.IAnimatedElement
         * @kind property
         * @access public
         * 
         * @type {plat.ui.animations.IAnimationThenable<any>}
         * 
         * @description
         * A promise representing an element's current state of animation.
         */
        promise?: IAnimationThenable<any>;
    }

    /**
     * @name IGetAnimatingThenable
     * @memberof plat.ui.animations
     * @kind interface
     * 
     * @description
     * Describes a function used to obtain an animating parent element's animation thenable.
     */
    export interface IGetAnimatingThenable {
        /**
         * @memberof plat.ui.animations.IGetAnimatingThenable
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * The method signature for {@link plat.ui.animations.IGetAnimatingThenable|IGetAnimatingThenable}.
         * 
         * @returns {plat.ui.animations.IAnimationThenable<void>}
         */
        (): IAnimationThenable<void>;
    }

    /**
     * @name AnimationPromise
     * @memberof plat.ui.animations
     * @kind class
     * 
     * @extends {plat.async.Promise<plat.ui.animations.IParentAnimationFn>}
     * @implements {plat.ui.animations.IAnimatingThenable}
     * 
     * @description
     * Describes a type of {@link plat.async.Promise|Promise} that can be optionally cancelled and/or disposed of. 
     * Further, in the case where it may have a parent that is animating (which will cause it to immediately cancel and fulfill 
     * itself, it resolves with a {@link plat.ui.animations.IGetAnimatingThenable|IGetAnimatingThenable} for acccessing 
     * the {@link plat.ui.animations.IAnimationThenable|IAnimationThenable} of the animating parent element.
     */
    export class AnimationPromise extends async.Promise<IGetAnimatingThenable> implements IAnimatingThenable {
        /**
         * @name _Promise
         * @memberof plat.ui.animations.AnimationPromise
         * @kind property
         * @access protected
         * 
         * @type {plat.async.IPromise}
         * 
         * @description
         * Reference to the {@link plat.async.IPromise|IPromise} injectable.
         */
        protected _Promise: async.IPromise = acquire(__Promise);

        /**
         * @name __animationInstance
         * @memberof plat.ui.animations.AnimationPromise
         * @kind property
         * @access private
         * 
         * @type {plat.ui.animations.BaseAnimation}
         * 
         * @description
         * The animation instance to cancel if needed.
         */
        private __animationInstance: BaseAnimation;

        /**
         * @name constructor
         * @memberof plat.ui.animations.AnimationPromise
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * The constructor method for the {@link plat.async.AjaxPromise}.
         * 
         * @param {(resolve: (value?: plat.ui.animations.IParentAnimationFn) => any) => void} resolveFunction A resolve function 
         * that only allows for a resolve of void and no reject.
         * 
         * @returns {plat.ui.animations.AnimationPromise}
         */
        constructor(resolveFunction: (resolve: (value?: IGetAnimatingThenable) => any) => void);
        /**
         * @name constructor
         * @memberof plat.ui.animations.AnimationPromise
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * The constructor method for the {@link plat.async.AjaxPromise}.
         * 
         * @param {(resolve: (value?: plat.ui.animations.IParentAnimationFn) => any) => void} resolveFunction A resolve function 
         * that only allows for a resolve of void and no reject.
         * @param {any} promise The promise object to allow for cancelling the {@link plat.ui.animations.AnimationPromise}.
         * 
         * @returns {plat.ui.animations.AnimationPromise}
         */
        constructor(resolveFunction: (resolve: (value?: IGetAnimatingThenable) => any) => void, promise: any);
        constructor(resolveFunction: (resolve: (value?: IGetAnimatingThenable) => any) => void, promise?: any) {
            super(resolveFunction);
            if (!isNull(promise)) {
                this.__animationInstance = promise.__animationInstance;
            }
        }

        /**
         * @name initialize
         * @memberof plat.ui.animations.AnimationPromise
         * @kind function
         * @access public
         * 
         * @description
         * Initializes the promise, providing it with the {@link plat.ui.animations.BaseAnimation} instance.
         * 
         * @param {plat.ui.animations.BaseAnimation} instance The animation instance for this promise.
         * 
         * @returns {void}
         */
        initialize(instance: BaseAnimation): void {
            if (isObject(instance) && isNull(this.__animationInstance)) {
                this.__animationInstance = instance;
            }
        }

        /**
         * @name pause
         * @memberof plat.ui.animations.AnimationPromise
         * @kind function
         * @access public
         * 
         * @description
         * Fires the pause method on the animation instance.
         * 
         * @returns {plat.async.IThenable<void>} A new promise that resolves when the animation instance 
         * indicates that the animation has been paused.
         */
        pause(): async.IThenable<void> {
            var animationInstance = this.__animationInstance;
            if (!isNull(animationInstance) && isFunction(animationInstance.pause)) {
                return this._Promise.resolve(<any>animationInstance.pause());
            }

            return this._Promise.resolve();
        }

        /**
         * @name resume
         * @memberof plat.ui.animations.AnimationPromise
         * @kind function
         * @access public
         * 
         * @description
         * Fires the resume method on the animation instance.
         * 
         * @returns {plat.async.IThenable<void>} A new promise that resolves when the animation instance 
         * indicates that the animation has resumed.
         */
        resume(): async.IThenable<void> {
            var animationInstance = this.__animationInstance;
            if (!isNull(animationInstance) && isFunction(animationInstance.resume)) {
                return this._Promise.resolve(<any>animationInstance.resume());
            }

            return this._Promise.resolve();
        }

        /**
         * @name cancel
         * @memberof plat.ui.animations.AnimationPromise
         * @kind function
         * @access public
         * 
         * @description
         * A method to cancel the associated animation.
         * 
         * @returns {plat.ui.animations.AnimationPromise} This promise instance.
         */
        cancel(): IAnimatingThenable {
            var animationInstance = this.__animationInstance;
            if (!isNull(animationInstance)) {
                if (isFunction(animationInstance.cancel)) {
                    animationInstance.cancel();
                }
                if (isFunction(animationInstance.end)) {
                    animationInstance.end();
                }
            }

            return this;
        }

        /**
         * @name dispose
         * @memberof plat.ui.animations.AnimationPromise
         * @kind function
         * @access public
         * 
         * @description
         * A method to dispose the associated animation in order to remove any end states 
         * as determined by the animation class itself.
         * 
         * @returns {plat.ui.animations.AnimationPromise} This promise instance.
         */
        dispose(): IAnimatingThenable {
            var animationInstance = this.__animationInstance;
            if (!isNull(animationInstance) && isFunction(animationInstance.dispose)) {
                animationInstance.dispose();
            }

            return this;
        }

        /**
         * @name then
         * @memberof plat.ui.animations.AnimationPromise
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Takes in two methods, called when/if the promise fulfills.
         * 
         * @typeparam {any} U The type of the object returned from the fulfill callbacks, which will be carried to the 
         * next then method in the promise chain.
         * 
         * @param {(success: plat.ui.animations.IParentAnimationFn) => U} onFulfilled A method called when/if the promise fulfills. 
         * If undefined the next onFulfilled method in the promise chain will be called.
         * 
         * @returns {plat.ui.animations.IAnimationThenable<U>}
         */
        then<U>(onFulfilled: (success: IGetAnimatingThenable) => U): IAnimationThenable<U>;
        /**
         * @name then
         * @memberof plat.ui.animations.AnimationPromise
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Takes in two methods, called when/if the promise fulfills.
         * 
         * @typeparam {any} U The type of the object returned from the fulfill callbacks, which will be carried to the 
         * next then method in the promise chain.
         * 
         * @param {(success: plat.ui.animations.IParentAnimationFn) => plat.ui.animations.IAnimationThenable<U>} onFulfilled 
         * A method called when/if the promise fulfills. 
         * If undefined the next onFulfilled method in the promise chain will be called.
         * 
         * @returns {plat.ui.animations.IAnimationThenable<U>}
         */
        then<U>(onFulfilled: (success: IGetAnimatingThenable) => IAnimationThenable<U>): IAnimationThenable<U>;
        /**
         * @name then
         * @memberof plat.ui.animations.AnimationPromise
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Takes in two methods, called when/if the promise fulfills.
         * 
         * @typeparam {any} U The type of the object returned from the fulfill callbacks, which will be carried to the 
         * next then method in the promise chain.
         * 
         * @param {(success: plat.ui.animations.IParentAnimationFn) => plat.async.IThenable<U>} onFulfilled 
         * A method called when/if the promise fulfills. 
         * If undefined the next onFulfilled method in the promise chain will be called.
         * 
         * @returns {plat.ui.animations.IAnimationThenable<U>}
         */
        then<U>(onFulfilled: (success: IGetAnimatingThenable) => async.IThenable<U>): IAnimationThenable<U>;
        then<U>(onFulfilled: (success: IGetAnimatingThenable) => any): IAnimationThenable<U> {
            return <IAnimationThenable<U>><any>super.then<U>(onFulfilled);
        }

        /**
         * @name catch
         * @memberof plat.ui.animations.AnimationPromise
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * A wrapper method for {@link plat.async.Promise|Promise.then(undefined, onRejected);}
         * 
         * @typeparam {any} U The return type of the returned promise.
         * 
         * @param {(error: any) => plat.ui.animations.IAnimationThenable<U>} onRejected A method called when/if the promise rejects. 
         * If undefined the next onRejected method in the promise chain will be called.
         * 
         * @returns {plat.ui.animations.IAnimationThenable<U>} A promise that resolves with the input type parameter U.
         */
        catch<U>(onRejected: (error: any) => IAnimationThenable<U>): IAnimationThenable<U>;
        /**
         * @name catch
         * @memberof plat.ui.animations.AnimationPromise
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * A wrapper method for {@link plat.async.Promise|Promise.then(undefined, onRejected);}
         * 
         * @typeparam {any} U The return type of the returned promise.
         * 
         * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         * 
         * @returns {plat.ui.animations.IAnimationThenable<U>} A promise that resolves with the input type parameter U.
         */
        catch<U>(onRejected: (error: any) => U): IAnimationThenable<U>;
        catch<U>(onRejected: (error: any) => any): IAnimationThenable<U> {
            return <IAnimationThenable<U>><any>super.catch<U>(onRejected);
        }
    }

    /**
     * @name IAnimationThenable
     * @memberof plat.ui.animations
     * @kind interface
     * 
     * @extends {plat.async.IThenable<R>}
     * 
     * @description
     * Describes a chaining function that fulfills when the previous link is complete and is 
     * able to be caught in the case of an error.
     * 
     * @typeparam {any} R The return type of the thenable.
     */
    export interface IAnimationThenable<R> extends async.IThenable<R> {
        /**
         * @name initialize
         * @memberof plat.ui.animations.IAnimationThenable
         * @kind function
         * @access public
         * 
         * @description
         * Initializes the promise, providing it with the {@link plat.ui.animations.BaseAnimation} instance.
         * 
         * @param {plat.ui.animations.BaseAnimation} instance The animation instance for this promise.
         * 
         * @returns {void}
         */
        initialize? (instance: BaseAnimation): void;

        /**
         * @name pause
         * @memberof plat.ui.animations.IAnimationThenable
         * @kind function
         * @access public
         * 
         * @description
         * Fires the pause method on the animation instance.
         * 
         * @returns {plat.async.IThenable<void>} A new promise that resolves when the animation instance 
         * indicates that the animation has been paused.
         */
        pause(): async.IThenable<void>;

        /**
         * @name resume
         * @memberof plat.ui.animations.IAnimationThenable
         * @kind function
         * @access public
         * 
         * @description
         * Fires the resume method on the animation instance.
         * 
         * @returns {plat.async.IThenable<void>} A new promise that resolves when the animation instance 
         * indicates that the animation has resumed.
         */
        resume(): async.IThenable<void>;

        /**
         * @name cancel
         * @memberof plat.ui.animations.IAnimationThenable
         * @kind function
         * @access public
         * 
         * @description
         * A method to cancel the associated animation.
         * 
         * @returns {plat.ui.animations.AnimationPromise} This promise instance.
         */
        cancel(): IAnimationThenable<R>;

        /**
         * @name dispose
         * @memberof plat.ui.animations.IAnimationThenable
         * @kind function
         * @access public
         * 
         * @description
         * A method to dispose the associated animation in order to remove any end states 
         * as determined by the animation class itself.
         * 
         * @returns {plat.ui.animations.AnimationPromise} This promise instance.
         */
        dispose(): IAnimationThenable<R>;

        /**
         * @name then
         * @memberof plat.ui.animations.IAnimationThenable
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @typeparam {any} U The return type of the returned promise.
         * 
         * @param {(success: R) => plat.ui.animations.IAnimationThenable<U>} onFulfilled A method called when/if the promise fulills. 
         * If undefined the next onFulfilled method in the promise chain will be called.
         * @param {(error: any) => plat.ui.animations.IAnimationThenable<U>} onRejected? A method called when/if the promise rejects. 
         * If undefined the next onRejected method in the promise chain will be called.
         * 
         * @returns {plat.ui.animations.IAnimationThenable<U>} A promise that resolves with the input type parameter U.
         */
        then<U>(onFulfilled: (success: R) => IAnimationThenable<U>,
            onRejected?: (error: any) => IAnimationThenable<U>): IAnimationThenable<U>;
        /**
         * @name then
         * @memberof plat.ui.animations.IAnimationThenable
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @typeparam {any} U The return type of the returned promise.
         * 
         * @param {(success: R) => plat.ui.animations.IAnimationThenable<U>} onFulfilled A method called when/if the promise fulills. 
         * If undefined the next onFulfilled method in the promise chain will be called.
         * @param {(error: any) => U} onRejected? A method called when/if the promise rejects. 
         * If undefined the next onRejected method in the promise chain will be called.
         * 
         * @returns {plat.ui.animations.IAnimationThenable<U>} A promise that resolves with the input type parameter U.
         */
        then<U>(onFulfilled: (success: R) => IAnimationThenable<U>, onRejected?: (error: any) => U): IAnimationThenable<U>;
        /**
         * @name then
         * @memberof plat.ui.animations.IAnimationThenable
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @typeparam {any} U The return type of the returned promise.
         * 
         * @param {(success: R) => U} onFulfilled A method called when/if the promise fulills. 
         * If undefined the next onFulfilled method in the promise chain will be called.
         * @param {(error: any) => plat.ui.animations.IAnimationThenable<U>} onRejected? A method called when/if the promise rejects. 
         * If undefined the next onRejected method in the promise chain will be called.
         * 
         * @returns {plat.ui.animations.IAnimationThenable<U>} A promise that resolves with the input type parameter U.
         */
        then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => IAnimationThenable<U>): IAnimationThenable<U>;
        /**
         * @name then
         * @memberof plat.ui.animations.IAnimationThenable
         * @kind function
         * @access public
         * @variation 3
         * 
         * @description
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @typeparam {any} U The return type of the returned promise.
         * 
         * @param {(success: R) => U} onFulfilled A method called when/if the promise fulills. 
         * If undefined the next onFulfilled method in the promise chain will be called.
         * @param {(error: any) => U} onRejected? A method called when/if the promise rejects. 
         * If undefined the next onRejected method in the promise chain will be called.
         * 
         * @returns {plat.ui.animations.IAnimationThenable<U>} A promise that resolves with the input type parameter U.
         */
        then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => U): IAnimationThenable<U>;

        /**
         * @name catch
         * @memberof plat.ui.animations.IAnimationThenable
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * A wrapper method for {@link plat.async.Promise|Promise.then(undefined, onRejected);}
         * 
         * @typeparam {any} U The return type of the returned promise.
         * 
         * @param {(error: any) => plat.ui.animations.IAnimationThenable<U>} onRejected A method called when/if the promise rejects. 
         * If undefined the next onRejected method in the promise chain will be called.
         * 
         * @returns {plat.ui.animations.IAnimationThenable<U>} A promise that resolves with the input type parameter U.
         */
        catch<U>(onRejected: (error: any) => IAnimationThenable<U>): IAnimationThenable<U>;
        /**
         * @name catch
         * @memberof plat.ui.animations.AnimationPromise
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * A wrapper method for {@link plat.async.Promise|Promise.then(undefined, onRejected);}
         * 
         * @typeparam {any} U The return type of the returned promise.
         * 
         * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         * 
         * @returns {plat.ui.animations.IAnimationThenable<U>} A promise that resolves with the input type parameter U.
         */
        catch<U>(onRejected: (error: any) => U): IAnimationThenable<U>;
    }

    /**
     * @name IAnimatingThenable
     * @memberof plat.ui.animations
     * @kind interface
     * 
     * @extends {plat.ui.animations.IAnimationThenable<plat.ui.animations.IGetAnimatingThenable>}
     * 
     * @description
     * Describes a type of {@link plat.async.IPromise|IPromise} that resolves when an animation is 
     * finished. It can be optionally cancelled and/or disposed of. Further, in the case where it may have 
     * a parent that is animating (which will cause it to immediately cancel and fulfill itself, it resolves  
     * with a {@link plat.ui.animations.IGetAnimatingThenable|IGetAnimatingThenable} for acccessing 
     * the {@link plat.ui.animations.IAnimationThenable|IAnimationThenable} of the animating parent element.
     */
    export interface IAnimatingThenable extends IAnimationThenable<IGetAnimatingThenable> { }
}
