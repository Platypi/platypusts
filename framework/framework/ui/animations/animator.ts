module plat.ui.animations {
    'use strict';

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
            _compat: __Compat,
            _Promise: __Promise
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
         * @name _Promise
         * @memberof plat.ui.animations.Animator
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
         * @variation 0
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
        animate(element: Element, key: string, options?: any): IAnimatingThenable;
        /**
         * @name animate
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Animates the element with the defined animation denoted by the key.
         * 
         * @param {DocumentFragment} elements The DocumentFragment whose childNodes are to be animated.
         * @param {string} key The identifier specifying the type of animation.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the animation is finished.
         */
        animate(element: DocumentFragment, key: string, options?: any): IAnimatingThenable;
        /**
         * @name animate
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Animates the element with the defined animation denoted by the key.
         * 
         * @param {NodeList} elements The list of Nodes to be animated.
         * @param {string} key The identifier specifying the type of animation.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the animation is finished.
         */
        animate(elements: NodeList, key: string, options?: any): IAnimatingThenable;
        /**
         * @name animate
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * @variation 3
         * 
         * @description
         * Animates the element with the defined animation denoted by the key.
         * 
         * @param {Array<Node>} elements The Array of Nodes to be animated. All nodes in the Array must have 
         * the same parent, otherwise the animation will not function correctly.
         * @param {string} key The identifier specifying the type of animation.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the animation is finished.
         */
        animate(elements: Array<Node>, key: string, options?: any): IAnimatingThenable;
        animate(elements: any, key: string, options?: any): IAnimatingThenable {
            return this._animate(elements, key, options, {
                key: 'animate'
            });
        }

        /**
         * @name enter
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Adds the element to the DOM and animates it with the defined animation denoted by the key.
         * 
         * @param {Element} element The Element to be animated.
         * @param {string} key The identifier specifying the type of animation.
         * @param {Element} parent The parent element used for adding the element to the DOM.
         * @param {Node} refChild? An optional reference node used for placing the element into the DOM 
         * just before itself using the insertBefore function. If this argument is specified, the parent argument 
         * is ignored.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the element is 
         * added to the DOM and the animation is finished.
         */
        enter(element: Element, key: string, parent: Element, refChild?: Node, options?: any): IAnimatingThenable;
        /**
         * @name enter
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Adds the elements to the DOM and animates them with the defined animation denoted by the key.
         * 
         * @param {DocumentFragment} elements The DocumentFragment whose childNodes are to be animated.
         * @param {string} key The identifier specifying the type of animation.
         * @param {Element} parent The parent element used for adding the elements to the DOM.
         * @param {Node} refChild? An optional reference node used for placing the element into the DOM 
         * just before itself using the insertBefore function. If this argument is specified, the parent argument 
         * is ignored.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the elements are 
         * added to the DOM and the animation is finished.
         */
        enter(element: DocumentFragment, key: string, parent: Element, refChild?: Node, options?: any): IAnimatingThenable;
        /**
         * @name enter
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Adds the elements to the DOM and animates them with the defined animation denoted by the key.
         * 
         * @param {NodeList} elements The list of Nodes to be animated.
         * @param {string} key The identifier specifying the type of animation.
         * @param {Element} parent The parent element used for adding the elements to the DOM.
         * @param {Node} refChild? An optional reference node used for placing the element into the DOM 
         * just before itself using the insertBefore function. If this argument is specified, the parent argument 
         * is ignored.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the elements are 
         * added to the DOM and the animation is finished.
         */
        enter(elements: NodeList, key: string, parent: Element, refChild?: Node, options?: any): IAnimatingThenable;
        /**
         * @name enter
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * @variation 3
         * 
         * @description
         * Adds the elements to the DOM and animates them with the defined animation denoted by the key.
         * 
         * @param {Array<Node>} elements The Array of Nodes to be animated. All nodes in the Array must have 
         * the same parent, otherwise the animation will not function correctly.
         * @param {string} key The identifier specifying the type of animation.
         * @param {Element} parent The parent element used for adding the elements to the DOM.
         * @param {Node} refChild? An optional reference node used for placing the element into the DOM 
         * just before itself using the insertBefore function. If this argument is specified, the parent argument 
         * is ignored.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the elements are 
         * added to the DOM and the animation is finished.
         */
        enter(elements: Array<Node>, key: string, parent: Element, refChild?: Node, options?: any): IAnimatingThenable;
        enter(elements: any, key: string, parent: Element, refChild?: Node, options?: any): IAnimatingThenable {
            return this._animate(elements, key, options, {
                key: 'enter',
                parent: parent,
                refChild: refChild
            });
        }

        /**
         * @name leave
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Animates the element with the defined animation denoted by the key and removes it from the DOM when 
         * the animation is finished.
         * 
         * @param {Element} element The Element to be animated.
         * @param {string} key The identifier specifying the type of animation.
         * @param {Element} parent The parent element used for removing the element from the DOM.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the animation is finished 
         * and the element is removed from the DOM.
         */
        leave(element: Element, key: string, parent: Element, options?: any): IAnimatingThenable;
        /**
         * @name leave
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Animates the elements with the defined animation denoted by the key and removes them from the DOM when 
         * the animation is finished.
         * 
         * @param {DocumentFragment} elements The DocumentFragment whose childNodes are to be animated.
         * @param {string} key The identifier specifying the type of animation.
         * @param {Element} parent The parent element used for removing the elements from the DOM.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the animation is finished 
         * and the elements are removed from the DOM.
         */
        leave(element: DocumentFragment, key: string, parent: Element, options?: any): IAnimatingThenable;
        /**
         * @name leave
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Animates the elements with the defined animation denoted by the key and removes them from the DOM when 
         * the animation is finished.
         * 
         * @param {NodeList} elements The list of Nodes to be animated.
         * @param {string} key The identifier specifying the type of animation.
         * @param {Element} parent The parent element used for removing the elements from the DOM.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the animation is finished 
         * and the elements are removed from the DOM.
         */
        leave(elements: NodeList, key: string, parent: Element, options?: any): IAnimatingThenable;
        /**
         * @name leave
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * @variation 3
         * 
         * @description
         * Animates the elements with the defined animation denoted by the key and removes them from the DOM when 
         * the animation is finished.
         * 
         * @param {Array<Node>} elements The Array of Nodes to be animated. All nodes in the Array must have 
         * the same parent, otherwise the animation will not function correctly.
         * @param {string} key The identifier specifying the type of animation.
         * @param {Element} parent The parent element used for removing the elements from the DOM.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the animation is finished 
         * and the elements are removed from the DOM.
         */
        leave(elements: Array<Node>, key: string, parent: Element, options?: any): IAnimatingThenable;
        leave(elements: any, key: string, parent: Element, options?: any): IAnimatingThenable {
            return this._animate(elements, key, options, {
                key: 'leave',
                parent: parent
            });
        }

        /**
         * @name move
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Removes the element from the DOM based on the parent argument, initializes it, adds it back to the 
         * DOM using either the refChild or the parent, and animates it with the defined animation denoted by the key.
         * 
         * @param {Element} element The Element to be animated.
         * @param {string} key The identifier specifying the type of animation.
         * @param {Element} parent The parent element used for removing the element from the DOM prior to initialization.
         * @param {Node} refChild? An optional reference node used for placing the element into the DOM 
         * just before itself using the insertBefore function. If this argument is specified, the parent argument 
         * is ignored during DOM insertion.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the element is moved and the 
         * animation is finished.
         */
        move(element: Element, key: string, parent: Element, refChild?: Node, options?: any): IAnimatingThenable;
        /**
         * @name move
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Removes the elements from the DOM based on the parent argument, initializes them, adds them back to the 
         * DOM using either the refChild or the parent, and animates them with the defined animation denoted by the key.
         * 
         * @param {DocumentFragment} elements The DocumentFragment whose childNodes are to be animated.
         * @param {string} key The identifier specifying the type of animation.
         * @param {Element} parent The parent element used for removing the element from the DOM prior to initialization.
         * @param {Node} refChild? An optional reference node used for placing the element into the DOM 
         * just before itself using the insertBefore function. If this argument is specified, the parent argument 
         * is ignored during DOM insertion.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the elements are moved and the 
         * animation is finished.
         */
        move(element: DocumentFragment, key: string, parent: Element, refChild?: Node, options?: any): IAnimatingThenable;
        /**
         * @name move
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Removes the elements from the DOM based on the parent argument, initializes them, adds them back to the 
         * DOM using either the refChild or the parent, and animates them with the defined animation denoted by the key.
         * 
         * @param {NodeList} elements The list of Nodes to be animated.
         * @param {string} key The identifier specifying the type of animation.
         * @param {Element} parent The parent element used for removing the element from the DOM prior to initialization.
         * @param {Node} refChild? An optional reference node used for placing the element into the DOM 
         * just before itself using the insertBefore function. If this argument is specified, the parent argument 
         * is ignored during DOM insertion.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the elements are moved and the 
         * animation is finished.
         */
        move(elements: NodeList, key: string, parent: Element, refChild?: Node, options?: any): IAnimatingThenable;
        /**
         * @name move
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * @variation 3
         * 
         * @description
         * Removes the elements from the DOM based on the parent argument, initializes them, adds them back to the 
         * DOM using either the refChild or the parent, and animates them with the defined animation denoted by the key.
         * 
         * @param {Array<Node>} elements The Array of Nodes to be animated. All nodes in the Array must have 
         * the same parent, otherwise the animation will not function correctly.
         * @param {string} key The identifier specifying the type of animation.
         * @param {Element} parent The parent element used for removing the element from the DOM prior to initialization.
         * @param {Node} refChild? An optional reference node used for placing the element into the DOM 
         * just before itself using the insertBefore function. If this argument is specified, the parent argument 
         * is ignored during DOM insertion.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the elements are moved and the 
         * animation is finished.
         */
        move(elements: Array<Node>, key: string, parent: Element, refChild?: Node, options?: any): IAnimatingThenable;
        move(elements: any, key: string, parent: Element, refChild?: Node, options?: any): IAnimatingThenable {
            return this._animate(elements, key, options, {
                key: 'move',
                parent: parent,
                refChild: refChild
            });
        }

        /**
         * @name show
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Shows the element just after initialization by removing the `plat-hide` attribute and animates them 
         * with the defined animation denoted by the key.
         * 
         * @param {Element} element The Element to be animated.
         * @param {string} key The identifier specifying the type of animation.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the animation is finished.
         */
        show(element: Element, key: string, options?: any): IAnimatingThenable;
        /**
         * @name show
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Shows the elements just after initialization by removing the `plat-hide` attribute and animates them 
         * with the defined animation denoted by the key.
         * 
         * @param {DocumentFragment} elements The DocumentFragment whose childNodes are to be animated.
         * @param {string} key The identifier specifying the type of animation.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the animation is finished.
         */
        show(element: DocumentFragment, key: string, options?: any): IAnimatingThenable;
        /**
         * @name show
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Shows the elements just after initialization by removing the `plat-hide` attribute and animates them 
         * with the defined animation denoted by the key.
         * 
         * @param {NodeList} elements The list of Nodes to be animated.
         * @param {string} key The identifier specifying the type of animation.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the animation is finished.
         */
        show(elements: NodeList, key: string, options?: any): IAnimatingThenable;
        /**
         * @name show
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * @variation 3
         * 
         * @description
         * Shows the elements just after initialization by removing the `plat-hide` attribute and animates them 
         * with the defined animation denoted by the key.
         * 
         * @param {Array<Node>} elements The Array of Nodes to be animated. All nodes in the Array must have 
         * the same parent, otherwise the animation will not function correctly.
         * @param {string} key The identifier specifying the type of animation.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the animation is finished.
         */
        show(elements: Array<Node>, key: string, options?: any): IAnimatingThenable;
        show(elements: any, key: string, options?: any): IAnimatingThenable {
            return this._animate(elements, key, options, {
                key: 'show'
            });
        }

        /**
         * @name hide
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Animates the element with the defined animation denoted by the key and hides them by adding the 
         * `plat-hide` attribute after the animation is finished.
         * 
         * @param {Element} element The Element to be animated.
         * @param {string} key The identifier specifying the type of animation.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the animation is finished.
         */
        hide(element: Element, key: string, options?: any): IAnimatingThenable;
        /**
         * @name hide
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Animates the elements with the defined animation denoted by the key and hides them by adding the 
         * `plat-hide` attribute after the animation is finished.
         * 
         * @param {DocumentFragment} elements The DocumentFragment whose childNodes are to be animated.
         * @param {string} key The identifier specifying the type of animation.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the animation is finished.
         */
        hide(element: DocumentFragment, key: string, options?: any): IAnimatingThenable;
        /**
         * @name hide
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Animates the elements with the defined animation denoted by the key and hides them by adding the 
         * `plat-hide` attribute after the animation is finished.
         * 
         * @param {NodeList} elements The list of Nodes to be animated.
         * @param {string} key The identifier specifying the type of animation.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the animation is finished.
         */
        hide(elements: NodeList, key: string, options?: any): IAnimatingThenable;
        /**
         * @name hide
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * @variation 3
         * 
         * @description
         * Animates the elements with the defined animation denoted by the key and hides them by adding the 
         * `plat-hide` attribute after the animation is finished.
         * 
         * @param {Array<Node>} elements The Array of Nodes to be animated. All nodes in the Array must have 
         * the same parent, otherwise the animation will not function correctly.
         * @param {string} key The identifier specifying the type of animation.
         * @param {any} options? Specified options for the animation.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the animation is finished.
         */
        hide(elements: Array<Node>, key: string, options?: any): IAnimatingThenable;
        hide(elements: any, key: string, options?: any): IAnimatingThenable {
            return this._animate(elements, key, options, {
                key: 'hide'
            });
        }

        /**
         * @name all
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         * 
         * @description
         * Returns a promise that fulfills when every animation promise in the input array is fulfilled.
         * 
         * @returns {plat.ui.animations.IAnimationThenable<void>} A promise that resolves after all the input promises resolve.
         */
        all(promises: Array<IAnimationThenable<any>>): IAnimationThenable<void> {
            return new AnimationPromise((resolve) => {
                this._Promise.all(promises).then(() => {
                    resolve();
                });
            }).then(noop);
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
            var animationPromise = new AnimationPromise((resolve): void => {
                resolve(<IGetAnimatingThenable>(): IAnimationThenable<void> => {
                    return <IAnimationThenable<void>><any>animationPromise;
                });
            });

            return animationPromise;
        }

        /**
         * @name _animate
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access protected
         * 
         * @description
         * Animates the passed in elements with the given key and handles special animation functionality.
         * 
         * @param {any} elements The Nodes to be animated. All nodes in the Array must have 
         * the same parent, otherwise the animation will not function correctly.
         * @param {string} key The identifier specifying the type of animation.
         * @param {any} options? Specified options for the animation.
         * @param {plat.ui.animations.IAnimationFunction} functionality An object containing detailed information about 
         * special animation functionality.
         * 
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the animation is finished.
         */
        protected _animate(elements: any, key: string, options: any, functionality: IAnimationFunction): IAnimatingThenable {
            var animationInjector = animationInjectors[key],
                animationInstances: Array<BaseAnimation> = [],
                elementNodes: Array<Element> = [];

            if (!this._compat.animationSupported || isUndefined(animationInjector)) {
                animationInjector = jsAnimationInjectors[key];
                if (isUndefined(animationInjector)) {
                    elements = this.__constructAnimatableElements(elements, <any>{ inject: noop }, elementNodes, animationInstances);
                    this._handlePreInitFunctionality(elements, elementNodes, functionality);
                    this._handlePostInitFunctionality(elements, elementNodes, functionality);
                    this._handleEndFunctionality(elements, elementNodes, functionality);
                    return this.resolve();
                }
            }

            elements = this.__constructAnimatableElements(elements, animationInjector, elementNodes, animationInstances);

            var length = elementNodes.length;
            if (length === 0) {
                this._handlePreInitFunctionality(elements, elementNodes, functionality);
                this._handlePostInitFunctionality(elements, elementNodes, functionality);
                this._handleEndFunctionality(elements, elementNodes, functionality);
                return this.resolve();
            }

            this._handlePreInitFunctionality(elements, elementNodes, functionality);

            var animationPromises: Array<IAnimationThenable<any>> = [],
                id = this.__setAnimationId(elementNodes, animationInstances),
                animatedElement = this._elements[id],
                i: number;

            // instantiate needs to be called after __setAnimationId in the case that 
            // the same element is animating while in an animation
            for (i = 0; i < length; ++i) {
                animationPromises.push(animationInstances[i].instantiate(elementNodes[i], options));
            }

            this._handlePostInitFunctionality(elements, elementNodes, functionality);

            var animationPromise = new AnimationPromise((resolve: any) => {
                this._Promise.all(animationPromises).then(resolve);
            });

            animationPromise.initialize(animationInstances);

            var animatingParentId = this.__isParentAnimating(elementNodes);
            if (!isNull(animatingParentId)) {
                animatedElement.animationEnd(true);

                var parent = this._elements[animatingParentId];
                if (isPromise(parent.promise)) {
                    return animationPromise.then((): () => IAnimationThenable<any> => {
                        this._handleEndFunctionality(elements, elementNodes, functionality);
                        return (): IAnimationThenable<any> => {
                            return parent.promise;
                        };
                    });
                }

                return animationPromise.then(() => {
                    this._handleEndFunctionality(elements, elementNodes, functionality);
                    return (): IAnimationThenable<any> => {
                        return animationPromise;
                    };
                });
            }

            this.__stopChildAnimations(elementNodes);

            animatedElement.promise = animationPromise.then((): () => IAnimationThenable<any> => {
                this._handleEndFunctionality(elements, elementNodes, functionality);
                animatedElement.animationEnd();
                return (): IAnimationThenable<any> => {
                    return animationPromise;
                };
            });

            for (i = 0; i < length; ++i) {
                animationInstances[i].start();
            }

            return animatedElement.promise;
        }

        /**
         * @name _handlePreInitFunctionality
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access protected
         * 
         * @description
         * Handles different specialized functionalities immediately before the init portion of the animation cycle.
         * 
         * @param {Array<Node>} nodes All the nodes being animated.
         * @param {Array<Element>} elementNodes The animatable nodes being animated (only of type Node.ELEMENT_NODE).
         * @param {plat.ui.animations.IAnimationFunction} functionality The specialized animation function attributes.
         * 
         * @returns {void}
         */
        protected _handlePreInitFunctionality(nodes: Array<Node>, elementNodes: Array<Element>, functionality: IAnimationFunction): void {
            switch (functionality.key) {
                case 'move':
                    var parent = functionality.parent;
                    if (!isNode(parent)) {
                        break;
                    }
                    var length = nodes.length;
                    for (var i = 0; i < length; ++i) {
                        parent.removeChild(nodes[i]);
                    }
                    break;
                default:
                    break;
            }
        }

        /**
         * @name _handlePostInitFunctionality
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access protected
         * 
         * @description
         * Handles different specialized functionalities immediately after the init portion of the animation cycle.
         * 
         * @param {Array<Node>} nodes All the nodes being animated.
         * @param {Array<Element>} elementNodes The animatable nodes being animated (only of type Node.ELEMENT_NODE).
         * @param {plat.ui.animations.IAnimationFunction} functionality The specialized animation function attributes.
         * 
         * @returns {void}
         */
        protected _handlePostInitFunctionality(nodes: Array<Node>, elementNodes: Array<Element>, functionality: IAnimationFunction): void {
            var length: number,
                i: number;
            switch (functionality.key) {
                case 'enter':
                case 'move':
                    var refChild = functionality.refChild,
                        parent = isNode(refChild) ? <Element>refChild.parentNode : functionality.parent;
                    if (!isNode(parent)) {
                        break;
                    }
                    length = nodes.length;
                    for (i = 0; i < length; ++i) {
                        parent.insertBefore(nodes[i], refChild);
                    }
                    break;
                case 'show':
                    length = elementNodes.length;
                    for (i = 0; i < length; ++i) {
                        elementNodes[i].removeAttribute(__Hide);
                    }
                    break;
                default:
                    break;
            }
        }

        /**
         * @name _handleEndFunctionality
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access protected
         * 
         * @description
         * Handles different specialized functionalities at the end portion of the animation cycle.
         * 
         * @param {Array<Node>} nodes All the nodes being animated.
         * @param {Array<Element>} elementNodes The animatable nodes being animated (only of type Node.ELEMENT_NODE).
         * @param {plat.ui.animations.IAnimationFunction} functionality The specialized animation function attributes.
         * 
         * @returns {void}
         */
        protected _handleEndFunctionality(nodes: Array<Node>, elementNodes: Array<Element>, functionality: IAnimationFunction): void {
            var length: number,
                i: number;
            switch (functionality.key) {
                case 'leave':
                    var parent = functionality.parent;
                    if (!isNode(parent)) {
                        break;
                    }
                    length = nodes.length;
                    for (i = 0; i < length; ++i) {
                        parent.removeChild(nodes[i]);
                    }
                    break;
                case 'hide':
                    length = elementNodes.length;
                    for (i = 0; i < length; ++i) {
                        elementNodes[i].setAttribute(__Hide, '');
                    }
                    break;
                default:
                    break;
            }
        }

        /**
         * @name __isParentAnimating
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access private
         * 
         * @description
         * Checks whether or not any parent elements are animating.
         * 
         * @param {Array<Element>} elements The Elements whose parents we need to check.
         * 
         * @returns {string} The animating parent's ID if one exists.
         */
        private __isParentAnimating(elements: Array<Element>): string {
            var animationId: string,
                element: Node = elements[0];

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
         * Sets an new, unique animation ID and denotes the elements as currently being animated.
         * 
         * @param {Array<Element>} elements The Array of Elements being animated.
         * @param {Array<plat.ui.animations.BaseAnimation>} animationInstances The animation instances doing the animating.
         * 
         * @returns {string} The new animation ID.
         */
        private __setAnimationId(elements: Array<Element>, animationInstances: Array<BaseAnimation>): string {
            var animatedElements = this._elements,
                animatedElement: IAnimatedElement,
                plat: ICustomElementProperty,
                length = elements.length,
                id = uniqueId('animation_'),
                element: Element,
                otherId: string,
                i: number,
                removeListener = (cancel?: boolean, reanimating?: boolean): void => {
                    var animationInstance: BaseAnimation;
                    for (i = 0; i < length; ++i) {
                        if (cancel === true) {
                            animationInstance = animationInstances[i];
                            animationInstance.cancel();
                            animationInstance.end();
                            if (reanimating === true) {
                                continue;
                            }
                        }

                        element = elements[i];
                        removeClass(<HTMLElement>element, __Animating);
                        deleteProperty(animatedElements, id);
                        deleteProperty(plat, 'animation');
                        if (isEmpty(plat)) {
                            deleteProperty(element, '__plat');
                        }
                    }
                };

            for (i = 0; i < length; ++i) {
                element = elements[i];
                plat = (<ICustomElement>element).__plat;

                if (isUndefined(plat)) {
                    (<ICustomElement>element).__plat = plat = {};
                }

                if (isUndefined(plat.animation)) {
                    plat.animation = id;
                    addClass(<HTMLElement>element, __Animating);
                } else {
                    otherId = plat.animation;
                    plat.animation = id;

                    animatedElement = animatedElements[otherId];
                    if (!isUndefined(animatedElement)) {
                        animatedElement.animationEnd(true, true);
                        deleteProperty(animatedElements, otherId);
                    }
                }
            }

            animatedElements[id] = {
                animationEnd: removeListener
            };

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
        private __stopChildAnimations(elements: Array<Element>): void {
            var animatingElements = this._elements,
                slice = Array.prototype.slice,
                customAnimationElements: Array<ICustomElement>,
                animatedElement: IAnimatedElement,
                plat: ICustomElementProperty,
                id: string;

            for (var i = 0; i < elements.length; ++i) {
                customAnimationElements = slice.call(elements[i].querySelectorAll('.' + __Animating));

                while (customAnimationElements.length > 0) {
                    plat = customAnimationElements.pop().__plat || <ICustomElementProperty>{};
                    id = plat.animation;
                    if (isNull(id)) {
                        continue;
                    }

                    animatedElement = animatingElements[id] || <IAnimatedElement>{};
                    if (isFunction(animatedElement.animationEnd)) {
                        animatedElement.animationEnd(true);
                    }
                }
            }
        }

        /**
         * @name __constructAnimatableElements
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access private
         * 
         * @description
         * Sifts through an Array of Nodes and finds all animatable Elements and creates 
         * {@link plat.ui.animations.BaseAnimation|BaseAnimations} for them.
         * 
         * @param {any} elements The Array of Nodes, DocumentFragment, or element to sift through.
         * @param {plat.dependency.Injector<plat.ui.animations.BaseAnimation>} animationInjector The injector to instantiate 
         * {@link plat.ui.animations.BaseAnimation|BaseAnimations}.
         * @param {Array<Element>} elementNodes The Array of only animatable elements.
         * @param {Array<plat.ui.animations.BaseAnimation>>} animationInstances An empty Array of animation instances to add to.
         * 
         * @returns {Array<Node>} The Array of all nodes.
         */
        private __constructAnimatableElements(elements: any, animationInjector: dependency.Injector<BaseAnimation>,
            elementNodes: Array<Element>, animationInstances: Array<BaseAnimation>): Array<Node> {
            if (!isArray(elements)) {
                if (isDocumentFragment(elements)) {
                    elements = Array.prototype.slice.call(elements.childNodes);
                } else if (isArrayLike(elements)) {
                    elements = Array.prototype.slice.call(elements);
                } else if (!(isNode(elements) && elements.nodeType === Node.ELEMENT_NODE)) {
                    return [];
                } else {
                    elements = [elements];
                }
            }

            var length = elements.length,
                element: Node;

            for (var i = 0; i < length; ++i) {
                element = elements[i];
                if (isNode(element) && element.nodeType === Node.ELEMENT_NODE) {
                    elementNodes.push(<Element>element);
                    animationInstances.push(animationInjector.inject());
                }
            }

            return elements;
        }
    }

    register.injectable(__Animator, Animator);

    /**
     * @name IAnimationFunction
     * @memberof plat.ui.animations
     * @kind interface
     * 
     * @description
     * Describes an object representing a special animation functionality.
     */
    export interface IAnimationFunction {
        /**
         * @name key
         * @memberof plat.ui.animations.IAnimationFunction
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The special functionality key.
         */
        key: string;

        /**
         * @name parent
         * @memberof plat.ui.animations.IAnimationFunction
         * @kind property
         * @access public
         * 
         * @type {Element}
         * 
         * @description
         * The parent Element of the Element being animated.
         */
        parent?: Element;

        /**
         * @name refChild
         * @memberof plat.ui.animations.IAnimationFunction
         * @kind property
         * @access public
         * 
         * @type {Node}
         * 
         * @description
         * The reference child for placing the animated Element just before 
         * it in the DOM.
         */
        refChild?: Node;
    }

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
     * Describes a type of {@link plat.async.Promise|Promise} that can be optionally cancelled. 
     * Further, in the case where it may have a parent that is animating (which will cause it to immediately cancel and fulfill 
     * itself, it resolves with a {@link plat.ui.animations.IGetAnimatingThenable|IGetAnimatingThenable} for acccessing 
     * the {@link plat.ui.animations.IAnimationThenable|IAnimationThenable} of the animating parent element.
     */
    export class AnimationPromise extends async.Promise<IGetAnimatingThenable> implements IAnimationEssentials, IAnimatingThenable {
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
         * @type {Array<plat.ui.animations.IAnimationEssentials>}
         * 
         * @description
         * An Array of animation instances linked to this promise.
         */
        private __animationInstances: Array<IAnimationEssentials> = [];

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
                this.__animationInstances = promise.__animationInstances;
            }
        }

        /**
         * @name initialize
         * @memberof plat.ui.animations.AnimationPromise
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Initializes the promise, providing it with the {@link plat.ui.animations.BaseAnimation} instance.
         * 
         * @param {plat.ui.animations.BaseAnimation} instance The animation instance for this promise.
         * 
         * @returns {void}
         */
        initialize(instance: BaseAnimation): void;
        /**
         * @name initialize
         * @memberof plat.ui.animations.AnimationPromise
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Initializes the promise, providing it with the {@link plat.ui.animations.BaseAnimation} instance.
         * 
         * @param {Array<plat.ui.animations.BaseAnimation>} instances The animation instances for this promise.
         * 
         * @returns {void}
         */
        initialize(instances: Array<BaseAnimation>): void;
        initialize(instances: any): void {
            if (isEmpty(this.__animationInstances)) {
                if (isArray(instances)) {
                    this.__animationInstances = instances;
                } else if (isObject(instances)) {
                    this.__animationInstances = [instances];
                }
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
            var animationInstances = this.__animationInstances,
                pausePromises: Array<async.IThenable<void>> = [],
                animationInstance: IAnimationEssentials,
                length = animationInstances.length;

            for (var i = 0; i < length; ++i) {
                animationInstance = animationInstances[i];
                if (isFunction(animationInstance.pause)) {
                    pausePromises.push(animationInstance.pause());
                }
            }

            return this._Promise.all(pausePromises).then(noop);
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
            var animationInstances = this.__animationInstances,
                resumePromises: Array<async.IThenable<void>> = [],
                animationInstance: IAnimationEssentials,
                length = animationInstances.length;

            for (var i = 0; i < length; ++i) {
                animationInstance = animationInstances[i];
                if (isFunction(animationInstance.resume)) {
                    resumePromises.push(animationInstance.resume());
                }
            }

            return this._Promise.all(resumePromises).then(noop);
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
            var animationInstances = this.__animationInstances,
                animationInstance: IAnimationEssentials,
                length = animationInstances.length;

            for (var i = 0; i < length; ++i) {
                animationInstance = animationInstances[i];
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
         * @param {(success: plat.ui.animations.IGetAnimatingThenable) => U} onFulfilled A method called when/if the promise fulfills. 
         * If undefined the next onFulfilled method in the promise chain will be called.
         * 
         * @returns {plat.ui.animations.IAnimationThenable<U>}
         */
        then<U>(onFulfilled: (success?: IGetAnimatingThenable) => U): IAnimationThenable<U>;
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
         * @param {(success: plat.ui.animations.IGetAnimatingThenable) => plat.ui.animations.IAnimationThenable<U>} onFulfilled 
         * A method called when/if the promise fulfills. 
         * If undefined the next onFulfilled method in the promise chain will be called.
         * 
         * @returns {plat.ui.animations.IAnimationThenable<U>}
         */
        then<U>(onFulfilled: (success?: IGetAnimatingThenable) => IAnimationThenable<U>): IAnimationThenable<U>;
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
         * @param {(success: plat.ui.animations.IGetAnimatingThenable) => plat.async.IThenable<U>} onFulfilled 
         * A method called when/if the promise fulfills. 
         * If undefined the next onFulfilled method in the promise chain will be called.
         * 
         * @returns {plat.ui.animations.IAnimationThenable<U>}
         */
        then<U>(onFulfilled: (success?: IGetAnimatingThenable) => async.IThenable<U>): IAnimationThenable<U>;
        then<U>(onFulfilled: (success?: IGetAnimatingThenable) => any): IAnimationThenable<U> {
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
    export interface IAnimationThenable<R> extends async.IThenable<R>, IAnimationEssentials {
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
     * finished. It can be optionally cancelled. Further, in the case where it may have 
     * a parent that is animating (which will cause it to immediately cancel and fulfill itself, it resolves  
     * with a {@link plat.ui.animations.IGetAnimatingThenable|IGetAnimatingThenable} for acccessing 
     * the {@link plat.ui.animations.IAnimationThenable|IAnimationThenable} of the animating parent element.
     */
    export interface IAnimatingThenable extends IAnimationThenable<IGetAnimatingThenable> { }

    /**
     * @name IAnimationEssentials
     * @memberof plat.ui.animations
     * @kind interface
     * 
     * @description
     * Describes base functional requirements for externally referenced animations.
     */
    export interface IAnimationEssentials {
        /**
         * @name pause
         * @memberof plat.ui.animations.IAnimationEssentials
         * @kind function
         * @access public
         * 
         * @description
         * Fires the pause method on the animation instances.
         * 
         * @returns {plat.async.IThenable<void>} A new promise that resolves when the animation instance 
         * indicates that the animation has been paused.
         */
        pause(): async.IThenable<void>;

        /**
         * @name resume
         * @memberof plat.ui.animations.IAnimationEssentials
         * @kind function
         * @access public
         * 
         * @description
         * Fires the resume method on the animation instances.
         * 
         * @returns {plat.async.IThenable<void>} A new promise that resolves when the animation instance 
         * indicates that the animation has resumed.
         */
        resume(): async.IThenable<void>;

        /**
         * @name cancel
         * @memberof plat.ui.animations.IAnimationEssentials
         * @kind function
         * @access public
         * 
         * @description
         * A method to cancel the associated animations.
         * 
         * @returns {any}
         */
        cancel(): any;

        /**
         * @name end
         * @memberof plat.ui.animations.IAnimationEssentials
         * @kind function
         * @access public
         * 
         * @description
         * A method to denote the end of an animation.
         * 
         * @returns {void}
         */
        end?(): void;
    }
}
