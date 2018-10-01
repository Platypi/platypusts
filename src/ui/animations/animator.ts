namespace plat.ui.animations {
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
            _Promise: __Promise,
            _document: __Document,
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
         * @name _document
         * @memberof plat.ui.animations.Animator
         * @kind property
         * @access protected
         *
         * @type {Document}
         *
         * @description
         * Reference to the Document injectable.
         */
        protected _document: Document;

        /**
         * @name _animatedElements
         * @memberof plat.ui.animations.Animator
         * @kind property
         * @access protected
         *
         * @type {plat.IObject<plat.ui.animations.IAnimatedElement>}
         *
         * @description
         * Objects representing collections of all currently animated elements.
         */
        protected _animatedElements: IObject<IAnimatedElement> = {};

        /**
         * @name create
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         *
         * @description
         * Creates the defined animation denoted by the key but does not start the animation.
         *
         * @param {Array<Node>} elements The Array of Nodes to be animated. All nodes in the Array must have
         * the same parent, otherwise the animation will not function correctly.
         * @param {string} key The identifier specifying the type of animation.
         * @param {any} options? Specified options for the animation.
         *
         * @returns {plat.ui.animations.IAnimationCreation} An object containing both a promise that resolves when the
         * previous animation is finished and a promise that resolves when the current animation is finished.
         */
        public create(
            elements: Element | DocumentFragment | NodeList | Node[],
            key: string,
            options?: any
        ): IAnimationCreation {
            return this._create(elements, key, options, {
                key: null,
            });
        }

        /**
         * @name animate
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         *
         * @description
         * Animates the element with the defined animation denoted by the key. Similar to `create` but
         * immediately begins the animation.
         *
         * @param {Array<Node>} elements The Array of Nodes to be animated. All nodes in the Array must have
         * the same parent, otherwise the animation will not function correctly.
         * @param {string} key The identifier specifying the type of animation.
         * @param {any} options? Specified options for the animation.
         *
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the animation is finished.
         */
        public animate(
            elements: Element | DocumentFragment | NodeList | Node[],
            key: string,
            options?: any
        ): IAnimatingThenable {
            return this._animate(elements, key, options, {
                key: null,
            });
        }

        /**
         * @name enter
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
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
        public enter(
            elements: Element | DocumentFragment | NodeList | Node[],
            key: string,
            parent: Element,
            refChild?: Node,
            options?: any
        ): IAnimatingThenable {
            return this._animate(elements, key, options, {
                key: 'enter',
                parent: parent,
                refChild: refChild,
            });
        }

        /**
         * @name leave
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         *
         * @description
         * Animates the elements with the defined animation denoted by the key and removes them from the DOM when
         * the animation is finished.
         *
         * @param {Array<Node>} elements The Array of Nodes to be animated. All nodes in the Array must have
         * the same parent, otherwise the animation will not function correctly.
         * @param {string} key The identifier specifying the type of animation.
         * @param {any} options? Specified options for the animation.
         *
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the animation is finished
         * and the elements are removed from the DOM.
         */
        public leave(
            elements: Element | DocumentFragment | NodeList | Node[],
            key: string,
            options?: any
        ): IAnimatingThenable {
            return this._animate(elements, key, options, {
                key: 'leave',
            });
        }

        /**
         * @name move
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
         *
         * @description
         * Removes the elements from the DOM based on the parent argument, initializes them, adds them back to the
         * DOM using either the refChild or the parent, and animates them with the defined animation denoted by the key.
         *
         * @param {Array<Node>} elements The Array of Nodes to be animated. All nodes in the Array must have
         * the same parent, otherwise the animation will not function correctly.
         * @param {string} key The identifier specifying the type of animation.
         * @param {Element} parent The parent element used for placing the element back into the DOM at its end if a
         * refChild is not specified.
         * @param {Node} refChild? An optional reference node used for placing the element into the DOM
         * just before itself using the insertBefore function. If this argument is specified, the parent argument
         * is ignored during DOM insertion.
         * @param {any} options? Specified options for the animation.
         *
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the elements are moved and the
         * animation is finished.
         */
        public move(
            elements: Element | DocumentFragment | NodeList | Node[],
            key: string,
            parent: Element,
            refChild?: Node,
            options?: any
        ): IAnimatingThenable {
            return this._animate(elements, key, options, {
                key: 'move',
                parent: parent,
                refChild: refChild,
            });
        }

        /**
         * @name show
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
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
        public show(
            elements: Element | DocumentFragment | NodeList | Node[],
            key: string,
            options?: any
        ): IAnimatingThenable {
            return this._animate(elements, key, options, {
                key: 'show',
            });
        }

        /**
         * @name hide
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access public
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
        public hide(
            elements: Element | DocumentFragment | NodeList | Node[],
            key: string,
            options?: any
        ): IAnimatingThenable {
            return this._animate(elements, key, options, {
                key: 'hide',
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
        public all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
            values: [
                T1 | IAnimationThenable<T1>,
                T2 | IAnimationThenable<T2>,
                T3 | IAnimationThenable<T3>,
                T4 | IAnimationThenable<T4>,
                T5 | IAnimationThenable<T5>,
                T6 | IAnimationThenable<T6>,
                T7 | IAnimationThenable<T7>,
                T8 | IAnimationThenable<T8>,
                T9 | IAnimationThenable<T9>,
                T10 | IAnimationThenable<T10>
            ]
        ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
        public all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
            values: [
                T1 | IAnimationThenable<T1>,
                T2 | IAnimationThenable<T2>,
                T3 | IAnimationThenable<T3>,
                T4 | IAnimationThenable<T4>,
                T5 | IAnimationThenable<T5>,
                T6 | IAnimationThenable<T6>,
                T7 | IAnimationThenable<T7>,
                T8 | IAnimationThenable<T8>,
                T9 | IAnimationThenable<T9>
            ]
        ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
        public all<T1, T2, T3, T4, T5, T6, T7, T8>(
            values: [
                T1 | IAnimationThenable<T1>,
                T2 | IAnimationThenable<T2>,
                T3 | IAnimationThenable<T3>,
                T4 | IAnimationThenable<T4>,
                T5 | IAnimationThenable<T5>,
                T6 | IAnimationThenable<T6>,
                T7 | IAnimationThenable<T7>,
                T8 | IAnimationThenable<T8>
            ]
        ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>;
        public all<T1, T2, T3, T4, T5, T6, T7>(
            values: [
                T1 | IAnimationThenable<T1>,
                T2 | IAnimationThenable<T2>,
                T3 | IAnimationThenable<T3>,
                T4 | IAnimationThenable<T4>,
                T5 | IAnimationThenable<T5>,
                T6 | IAnimationThenable<T6>,
                T7 | IAnimationThenable<T7>
            ]
        ): Promise<[T1, T2, T3, T4, T5, T6, T7]>;
        public all<T1, T2, T3, T4, T5, T6>(
            values: [
                T1 | IAnimationThenable<T1>,
                T2 | IAnimationThenable<T2>,
                T3 | IAnimationThenable<T3>,
                T4 | IAnimationThenable<T4>,
                T5 | IAnimationThenable<T5>,
                T6 | IAnimationThenable<T6>
            ]
        ): Promise<[T1, T2, T3, T4, T5, T6]>;
        public all<T1, T2, T3, T4, T5>(
            values: [
                T1 | IAnimationThenable<T1>,
                T2 | IAnimationThenable<T2>,
                T3 | IAnimationThenable<T3>,
                T4 | IAnimationThenable<T4>,
                T5 | IAnimationThenable<T5>
            ]
        ): Promise<[T1, T2, T3, T4, T5]>;
        public all<T1, T2, T3, T4>(
            values: [
                T1 | IAnimationThenable<T1>,
                T2 | IAnimationThenable<T2>,
                T3 | IAnimationThenable<T3>,
                T4 | IAnimationThenable<T4>
            ]
        ): Promise<[T1, T2, T3, T4]>;
        public all<T1, T2, T3>(
            values: [
                T1 | IAnimationThenable<T1>,
                T2 | IAnimationThenable<T2>,
                T3 | IAnimationThenable<T3>
            ]
        ): Promise<[T1, T2, T3]>;
        public all<T1, T2>(
            values: [T1 | IAnimationThenable<T1>, T2 | IAnimationThenable<T2>]
        ): Promise<[T1, T2]>;
        public all<T1>(values: [T1 | IAnimationThenable<T1>]): Promise<[T1]>;
        public all<TAll>(
            promises: (TAll | IAnimationThenable<TAll>)[]
        ): Promise<TAll[]> {
            const length = promises.length;
            let args = <IAnimationEssentials[]>[];
            const animationPromise = new AnimationPromise(
                (resolve): void => {
                    this._Promise.all(<any>promises).then(
                        (): void => {
                            resolve();
                        }
                    );
                }
            );

            for (let i = 0; i < length; i += 1) {
                args = args.concat(
                    (<IAnimationThenable<TAll>>promises[i]).getInstances()
                );
            }

            animationPromise.initialize(args);

            return <any>animationPromise.then(noop);
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
        public resolve(): IAnimatingThenable {
            // tslint:disable-next-line
            const animationPromise = new AnimationPromise(
                (resolve): void => {
                    resolve(
                        (): IAnimationThenable<void> => {
                            return <IAnimationThenable<void>>(
                                (<any>animationPromise)
                            );
                        }
                    );
                }
            );

            return <any>animationPromise;
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
         * @returns {plat.ui.animations.IAnimatingThenable} A promise that resolves when the current animation is finished.
         */
        protected _animate(
            elements: any,
            key: string,
            options: any,
            functionality: IAnimationFunction
        ): IAnimatingThenable {
            const animation = this._create(
                elements,
                key,
                options,
                functionality
            );
            const current = animation.current;

            animation.previous.then(
                (): void => {
                    requestAnimationFrameGlobal(
                        (): void => {
                            current.start();
                        }
                    );
                }
            );

            return current;
        }

        /**
         * @name _create
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access protected
         *
         * @description
         * Animates the passed in elements with the given key and handles special animation functionality. Returns both
         * the previous and current animations for the given element(s).
         *
         * @param {any} elements The Nodes to be animated. All nodes in the Array must have
         * the same parent, otherwise the animation will not function correctly.
         * @param {string} key The identifier specifying the type of animation.
         * @param {any} options? Specified options for the animation.
         * @param {plat.ui.animations.IAnimationFunction} functionality An object containing detailed information about
         * special animation functionality.
         *
         * @returns {plat.ui.animations.IAnimationCreation} An object containing both a promise that resolves when the
         * previous animation is finished and a promise that resolves when the current animation is finished.
         */
        protected _create(
            elements: any,
            key: string,
            options: any,
            functionality: IAnimationFunction
        ): IAnimationCreation {
            let animationInjector = animationInjectors[key];
            const animationInstances: BaseAnimation[] = [];
            const elementNodes: Element[] = [];
            let immediateResolve: IAnimationThenable<any>;

            if (
                !this._compat.animationSupported ||
                isUndefined(animationInjector)
            ) {
                animationInjector = jsAnimationInjectors[key];

                if (isUndefined(animationInjector)) {
                    elements = this.__constructAnimatableElements(
                        elements,
                        <any>{ inject: noop },
                        elementNodes,
                        animationInstances
                    );
                    this._handlePreInitFunctionality(
                        elements,
                        elementNodes,
                        functionality
                    );
                    this._handlePostInitFunctionality(
                        elements,
                        elementNodes,
                        functionality
                    );
                    this._handleEndFunctionality(
                        elements,
                        elementNodes,
                        functionality
                    );
                    immediateResolve = this.resolve();

                    return {
                        previous: <any>immediateResolve,
                        current: <any>immediateResolve,
                    };
                }
            }

            elements = this.__constructAnimatableElements(
                elements,
                animationInjector,
                elementNodes,
                animationInstances
            );

            const length = elementNodes.length;
            if (length === 0) {
                this._handlePreInitFunctionality(
                    elements,
                    elementNodes,
                    functionality
                );
                this._handlePostInitFunctionality(
                    elements,
                    elementNodes,
                    functionality
                );
                this._handleEndFunctionality(
                    elements,
                    elementNodes,
                    functionality
                );
                immediateResolve = this.resolve();

                return {
                    previous: <any>immediateResolve,
                    current: <any>immediateResolve,
                };
            }

            this._handlePreInitFunctionality(
                elements,
                elementNodes,
                functionality
            );

            const id = uniqueId('animation_');
            const previousAnimations = this.__setAnimationId(id, elementNodes);
            let previousPromise: async.Promise<void>;
            const animationPromise = new AnimationPromise(
                (resolve: any): void => {
                    const _Promise = this._Promise;

                    previousPromise = _Promise
                        .all(<any>previousAnimations)
                        .then(
                            (): void => {
                                const animationPromises: IAnimationThenable<
                                    any
                                >[] = [];

                                for (let i = 0; i < length; i += 1) {
                                    animationPromises.push(
                                        animationInstances[i].instantiate(
                                            elementNodes[i],
                                            options
                                        )
                                    );
                                }

                                this._handlePostInitFunctionality(
                                    elements,
                                    elementNodes,
                                    functionality
                                );

                                const animationsFinished = _Promise.all(<any>(
                                    animationPromises
                                ));
                                const animatingParentId = this.__isParentAnimating(
                                    elementNodes
                                );
                                const animatedElement = this.__generateAnimatedElement(
                                    id,
                                    elementNodes,
                                    animationPromise
                                );

                                if (!isNull(animatingParentId)) {
                                    this._handleEndFunctionality(
                                        elements,
                                        elementNodes,
                                        functionality
                                    );
                                    animatedElement.animationEnd(true);

                                    const parent = this._animatedElements[
                                        animatingParentId
                                    ];
                                    const resolvedPromise = isPromise(
                                        parent.promise
                                    )
                                        ? (): IAnimationThenable<any> => {
                                              return parent.promise;
                                          }
                                        : (): IAnimationThenable<any> => {
                                              return <any>animationPromise;
                                          };

                                    animationsFinished.then(
                                        (): void => {
                                            resolve(resolvedPromise);
                                        }
                                    );
                                }

                                this.__stopChildAnimations(elementNodes);

                                animatedElement.promise = <any>animationPromise;
                                animationsFinished.then(
                                    (): void => {
                                        this._handleEndFunctionality(
                                            elements,
                                            elementNodes,
                                            functionality
                                        );
                                        animatedElement.animationEnd();

                                        resolve(
                                            (): IAnimationThenable<any> => {
                                                return <any>animationPromise;
                                            }
                                        );
                                    }
                                );
                            }
                        );
                }
            );

            animationPromise.initialize(animationInstances);

            return {
                previous: <any>previousPromise,
                current: <any>animationPromise,
            };
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
        protected _handlePreInitFunctionality(
            nodes: Node[],
            elementNodes: Element[],
            functionality: IAnimationFunction
        ): void {
            switch (functionality.key) {
                case 'move':
                    for (let i = 0; i < length; i += 1) {
                        removeNode(nodes[i]);
                    }
                    break;
                default:
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
        protected _handlePostInitFunctionality(
            nodes: Node[],
            elementNodes: Element[],
            functionality: IAnimationFunction
        ): void {
            let length: number;
            let i: number;

            switch (functionality.key) {
                case 'enter':
                case 'move':
                    let refChild = functionality.refChild;
                    let parent: Element;

                    if (isNode(refChild)) {
                        parent = <Element>refChild.parentNode;
                    } else {
                        parent = functionality.parent;
                        refChild = null;
                    }

                    if (!isNode(parent)) {
                        break;
                    }

                    length = nodes.length;
                    for (i = 0; i < length; i += 1) {
                        parent.insertBefore(nodes[i], refChild);
                    }
                    break;
                case 'show':
                    length = elementNodes.length;
                    for (i = 0; i < length; i += 1) {
                        elementNodes[i].removeAttribute(__Hide);
                    }
                    break;
                default:
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
        protected _handleEndFunctionality(
            nodes: Node[],
            elementNodes: Element[],
            functionality: IAnimationFunction
        ): void {
            let length: number;
            let i: number;

            switch (functionality.key) {
                case 'leave':
                    length = nodes.length;
                    for (i = 0; i < length; i += 1) {
                        removeNode(nodes[i]);
                    }
                    break;
                case 'hide':
                    length = elementNodes.length;
                    for (i = 0; i < length; i += 1) {
                        elementNodes[i].setAttribute(__Hide, '');
                    }
                    break;
                default:
            }
        }

        /**
         * @name __setAnimationId
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access private
         *
         * @description
         * Sets a new, unique animation ID and denotes the elements as currently being animated.
         *
         * @param {string} id The animation ID.
         * @param {Array<Element>} elements The Array of Elements being animated.
         *
         * @returns {Array<plat.ui.animations.IAnimationThenable<any>>} An Array of promises representing all current animations on
         * the elements trying to be animated.
         */
        private __setAnimationId(
            id: string,
            elements: Element[]
        ): IAnimationThenable<any>[] {
            const animatedElements = this._animatedElements;
            let animatedElement: IAnimatedElement;
            let _plat: ICustomElementProperty;
            const promises = <IAnimationThenable<any>[]>[];
            const length = elements.length;
            let element: Element;

            for (let i = 0; i < length; i += 1) {
                element = elements[i];
                _plat = (<ICustomElement>element).__plat;

                if (isUndefined(_plat)) {
                    (<ICustomElement>element).__plat = { animation: id };
                    addClass(<HTMLElement>element, __Animating);
                } else if (isUndefined(_plat.animation)) {
                    _plat.animation = id;
                    addClass(<HTMLElement>element, __Animating);
                } else {
                    animatedElement = animatedElements[_plat.animation];
                    if (!isUndefined(animatedElement)) {
                        promises.push(animatedElement.promise);
                        animatedElement.animationEnd(true);
                    }
                    _plat.animation = id;
                }
            }

            return promises;
        }

        /**
         * @name __generateAnimatedElement
         * @memberof plat.ui.animations.Animator
         * @kind function
         * @access private
         *
         * @description
         * Generates a new animated element for the {@link plat.ui.animations.Animator|Animator} to easily reference and be able
         * to end later on.
         *
         * @param {string} id The animation ID.
         * @param {Array<Element>} elements The Array of Elements being animated.
         * @param {plat.ui.animations.AnimationPromise} animationPromise The animation's associated promise.
         *
         * @returns {plat.ui.animations.IAnimatedElement} The object representing the newly animated collection of elements.
         */
        private __generateAnimatedElement(
            id: string,
            elements: Element[],
            animationPromise: AnimationPromise
        ): IAnimatedElement {
            const animatedElements = this._animatedElements;
            const removeListener = (cancel?: boolean): void => {
                let _plat: ICustomElementProperty;
                let element: ICustomElement;
                const length = elements.length;
                let animationId: string;

                if (cancel === true) {
                    animationPromise.cancel();
                    deleteProperty(animatedElements, id);

                    return;
                }

                for (let i = 0; i < length; i += 1) {
                    element = <ICustomElement>elements[i];
                    _plat = element.__plat;

                    if (!isObject(_plat)) {
                        _plat = <any>{};
                    }

                    animationId = _plat.animation;
                    if (isUndefined(animationId) || animationId !== id) {
                        continue;
                    }
                    removeClass(<HTMLElement>element, __Animating);
                    deleteProperty(_plat, 'animation');
                    if (isEmpty(_plat)) {
                        deleteProperty(element, '__plat');
                    }
                }

                deleteProperty(animatedElements, id);
            };

            return (animatedElements[id] = {
                animationEnd: removeListener,
            });
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
        private __isParentAnimating(elements: Element[]): string {
            let animationId: string;
            let element: Node = elements[0];

            while (
                !(
                    isDocument((element = element.parentNode)) ||
                    isNull(element) ||
                    element.nodeType !== Node.ELEMENT_NODE
                )
            ) {
                if (hasClass(<HTMLElement>element, __Animating)) {
                    let _plat = (<ICustomElement>element).__plat;

                    if (!isObject(_plat)) {
                        _plat = <any>{};
                    }

                    animationId = _plat.animation;
                    if (isString(animationId)) {
                        if (!isNull(this._animatedElements[animationId])) {
                            return animationId;
                        }

                        deleteProperty(_plat, 'animation');
                        if (isEmpty(_plat)) {
                            deleteProperty(element, '__plat');
                        }
                        removeClass(<HTMLElement>element, __Animating);
                    }
                }
            }
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
        private __stopChildAnimations(elements: Element[]): void {
            const animatingElements = this._animatedElements;
            const slice = Array.prototype.slice;
            let customAnimationElements: ICustomElement[];
            let animatedElement: IAnimatedElement;
            let _plat: ICustomElementProperty;
            let id: string;
            const length = elements.length;

            for (let i = 0; i < length; i += 1) {
                customAnimationElements = slice.call(
                    elements[i].querySelectorAll(`.${__Animating}`)
                );

                while (customAnimationElements.length > 0) {
                    _plat = customAnimationElements.pop().__plat;

                    if (!isObject(_plat)) {
                        _plat = <any>{};
                    }

                    id = _plat.animation;
                    if (isNull(id)) {
                        continue;
                    }

                    animatedElement = animatingElements[id];

                    if (!isObject(animatedElement)) {
                        animatedElement = <any>{};
                    }

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
        private __constructAnimatableElements(
            elements: any,
            animationInjector: dependency.Injector<BaseAnimation>,
            elementNodes: Element[],
            animationInstances: BaseAnimation[]
        ): Node[] {
            if (!isArray(elements)) {
                if (isDocumentFragment(elements)) {
                    elements = Array.prototype.slice.call(elements.childNodes);
                } else if (isArrayLike(elements)) {
                    elements = Array.prototype.slice.call(elements);
                } else if (
                    !(
                        isNode(elements) &&
                        elements.nodeType === Node.ELEMENT_NODE
                    )
                ) {
                    return [];
                } else {
                    elements = [elements];
                }
            }

            const length = elements.length;
            let element: Node;

            for (let i = 0; i < length; i += 1) {
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
     * Describes an object representing a currently animated element.
     */
    export interface IAnimatedElement {
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
         *
         * @returns {void}
         */
        animationEnd(cancel?: boolean): void;
    }

    /**
     * @name IGetAnimatingThenable
     * @memberof plat.ui.animations
     * @kind interface
     *
     * @description
     * Describes a function used to obtain an animating parent element's animation thenable.
     */
    export type IGetAnimatingThenable = () => IAnimationThenable<void>;

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
     * itself, it resolves with a {@link plat.ui.animations.IGetAnimatingThenable|IGetAnimatingThenable} for accessing
     * the {@link plat.ui.animations.IAnimationThenable|IAnimationThenable} of the animating parent element.
     */
    export class AnimationPromise extends async.Promise<IGetAnimatingThenable>
        implements IAnimationEssentials, IAnimatingThenable {
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
         * @name __animationState
         * @memberof plat.ui.animations.AnimationPromise
         * @kind property
         * @access private
         *
         * @type {Array<plat.ui.animations.IAnimationEssentials>}
         *
         * @description
         * The state of the animation. 0 prior to start, 1 if started, and
         * 2 if canceled.
         */
        private __animationState: number = 0;

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
        private __animationInstances: IAnimationEssentials[] = [];

        /**
         * @name constructor
         * @memberof plat.ui.animations.AnimationPromise
         * @kind function
         * @access public
         *
         * @description
         * The constructor method for the {@link plat.async.AjaxPromise}.
         *
         * @param {(resolve: (value?: plat.ui.animations.IParentAnimationFn) => any) => void} resolveFunction A resolve function
         * that only allows for a resolve of void and no reject.
         * @param {any} promise? The promise object to allow for cancelling the {@link plat.ui.animations.AnimationPromise}.
         *
         * @returns {plat.ui.animations.AnimationPromise}
         */
        constructor(
            resolveFunction: (
                resolve: (value?: IGetAnimatingThenable) => any
            ) => void,
            promise?: any
        ) {
            super(resolveFunction);
            if (!isNull(promise)) {
                this.__animationInstances = promise.__animationInstances;
                this.__animationState = promise.__animationState;
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
         * @param {Array<plat.ui.animations.IAnimationEssentials>} instances The animation instances or
         * animation promises for this promise.
         *
         * @returns {void}
         */
        public initialize(
            instances: IAnimationEssentials | IAnimationEssentials[]
        ): void {
            if (isEmpty(this.__animationInstances)) {
                if (isArray(instances)) {
                    this.__animationInstances = <IAnimationEssentials[]>(
                        instances
                    );
                } else if (isObject(instances)) {
                    this.__animationInstances = [
                        <IAnimationEssentials>instances,
                    ];
                }
            }
        }

        /**
         * @name getInstances
         * @memberof plat.ui.animations.AnimationPromise
         * @kind function
         * @access public
         *
         * @description
         * Gets the associated animation instances or animated promises.
         *
         * @returns {Array<plat.ui.animations.IAnimationEssentials>} instances The animation instances or
         * animation promises for this promise.
         */
        public getInstances(): IAnimationEssentials[] {
            return this.__animationInstances;
        }

        /**
         * @name start
         * @memberof plat.ui.animations.AnimationPromise
         * @kind function
         * @access public
         *
         * @description
         * Fires the start method on the animation instances to kickoff the animations.
         *
         * @returns {void}
         */
        public start(): void {
            if (this.__animationState > 0) {
                return;
            }

            const animationInstances = this.__animationInstances;
            let animationInstance: IAnimationEssentials;
            const length = animationInstances.length;

            for (let i = 0; i < length; i += 1) {
                animationInstance = animationInstances[i];
                if (isFunction(animationInstance.start)) {
                    animationInstance.start();
                }
            }

            this.__animationState = 1;
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
         * @returns {plat.async.Promise<void>} A new promise that resolves when the animation instance
         * indicates that the animation has been paused.
         */
        public pause(): async.Promise<void> {
            if (this.__animationState !== 1) {
                return this._Promise.resolve();
            }

            const animationInstances = this.__animationInstances;
            const pausePromises: async.Promise<void>[] = [];
            let animationInstance: IAnimationEssentials;
            const length = animationInstances.length;

            for (let i = 0; i < length; i += 1) {
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
         * @returns {plat.async.Promise<void>} A new promise that resolves when the animation instance
         * indicates that the animation has resumed.
         */
        public resume(): async.Promise<void> {
            if (this.__animationState !== 1) {
                return this._Promise.resolve();
            }

            const animationInstances = this.__animationInstances;
            const resumePromises: async.Promise<void>[] = [];
            let animationInstance: IAnimationEssentials;
            const length = animationInstances.length;

            for (let i = 0; i < length; i += 1) {
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
        public cancel(): AnimationPromise {
            if (this.__animationState === 2) {
                return <any>this;
            }

            const animationInstances = this.__animationInstances;
            let animationInstance: IAnimationEssentials;
            const length = animationInstances.length;

            for (let i = 0; i < length; i += 1) {
                animationInstance = animationInstances[i];
                if (isFunction(animationInstance.cancel)) {
                    animationInstance.cancel();
                }
                if (isFunction(animationInstance.end)) {
                    animationInstance.end();
                }
            }

            this.__animationState = 2;

            return <any>this;
        }

        /**
         * @name isCanceled
         * @memberof plat.ui.animations.AnimationPromise
         * @kind function
         * @access public
         *
         * @description
         * A method to determine whether or not this promise has been canceled.
         *
         * @returns {boolean} Whether or not this promise has been canceled.
         */
        public isCanceled(): boolean {
            return this.__animationState === 2;
        }

        /**
         * @name then
         * @memberof plat.ui.animations.AnimationPromise
         * @kind function
         * @access public
         *
         * @description
         * Takes in two methods, called when/if the promise fulfills.
         *
         * @typeparam {any} U The type of the object returned from the fulfill callbacks, which will be carried to the
         * next then method in the promise chain.
         *
         * @param {(success: plat.ui.animations.IGetAnimatingThenable) => plat.async.Promise<TResult1>} onFulfilled
         * A method called when/if the promise fulfills.
         * If undefined the next onFulfilled method in the promise chain will be called.
         *
         * @returns {plat.ui.animations.IAnimationThenable<TResult1>}
         */
        public then<TResult1, TResult2 = never>(
            onFulfilled?: (
                value: any
            ) => TResult1 | IAnimatingThenable | undefined | null,
            onRejected?: (
                error: any
            ) => TResult2 | IAnimatingThenable | undefined | null
        ): AnimationPromise {
            return <AnimationPromise>(
                (<any>super.then<TResult1>(<any>onFulfilled, <any>onRejected))
            );
        }

        /**
         * @name catch
         * @memberof plat.ui.animations.AnimationPromise
         * @kind function
         * @access public
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
        public catch<TResult = never>(
            onRejected?: (
                error: any
            ) => TResult | IAnimatingThenable | undefined | null
        ): AnimationPromise {
            return <AnimationPromise>(
                (<any>super.catch<TResult>(<any>onRejected))
            );
        }
    }

    /**
     * @name IAnimationThenable
     * @memberof plat.ui.animations
     * @kind interface
     *
     * @extends {plat.async.Promise<T>}
     *
     * @description
     * Describes a chaining function that fulfills when the previous link is complete and is
     * able to be caught in the case of an error.
     *
     * @typeparam {any} R The return type of the thenable.
     */
    export interface IAnimationThenable<T>
        extends async.Promise<T>,
            IAnimationEssentials {
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
        initialize(instance: BaseAnimation): void;

        /**
         * @name getInstances
         * @memberof plat.ui.animations.IAnimationThenable
         * @kind function
         * @access public
         *
         * @description
         * Gets the associated animation instances or animated promises.
         *
         * @returns {Array<plat.ui.animations.IAnimationEssentials>} instances The animation instances or
         * animation promises for this promise.
         */
        getInstances(): IAnimationEssentials[];

        /**
         * @name start
         * @memberof plat.ui.animations.IAnimationThenable
         * @kind function
         * @access public
         *
         * @description
         * Fires the start method on the animation instances to kickoff the animations.
         *
         * @returns {void}
         */
        start(): void;

        /**
         * @name pause
         * @memberof plat.ui.animations.IAnimationThenable
         * @kind function
         * @access public
         *
         * @description
         * Fires the pause method on the animation instance.
         *
         * @returns {plat.async.Promise<void>} A new promise that resolves when the animation instance
         * indicates that the animation has been paused.
         */
        pause(): async.Promise<void>;

        /**
         * @name resume
         * @memberof plat.ui.animations.IAnimationThenable
         * @kind function
         * @access public
         *
         * @description
         * Fires the resume method on the animation instance.
         *
         * @returns {plat.async.Promise<void>} A new promise that resolves when the animation instance
         * indicates that the animation has resumed.
         */
        resume(): async.Promise<void>;

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
        cancel(): AnimationPromise;

        /**
         * @name isCanceled
         * @memberof plat.ui.animations.IAnimationThenable
         * @kind function
         * @access public
         *
         * @description
         * A method to determine whether or not this promise has been canceled.
         *
         * @returns {boolean} Whether or not this promise has been canceled.
         */
        isCanceled(): boolean; //tslint:disable-next-line

        /**
         * @name then
         * @memberof plat.ui.animations.IAnimationThenable
         * @kind function
         * @access public
         *
         * @description
         * Takes in two methods, called when/if the promise fulfills/rejects.
         *
         * @typeparam {any} U The return type of the returned promise.
         *
         * @param {(success: T) => U} onFulfilled A method called when/if the promise fulfills.
         * If undefined the next onFulfilled method in the promise chain will be called.
         * @param {(error: any) => U} onRejected? A method called when/if the promise rejects.
         * If undefined the next onRejected method in the promise chain will be called.
         *
         * @returns {plat.ui.animations.IAnimationThenable<U>} A promise that resolves with the input type parameter U.
         */ then<TResult1 = T, TResult2 = never>(
            onFulfilled?:
                | ((value: T) => TResult1 | PromiseLike<TResult1>)
                | undefined
                | null,
            onRejected?:
                | ((reason: any) => TResult2 | PromiseLike<TResult2>)
                | undefined
                | null
        ): IAnimationThenable<TResult1 | TResult2>;

        /**
         * @name catch
         * @memberof plat.ui.animations.AnimationPromise
         * @kind function
         * @access public
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
        catch<TResult = never>(
            onRejected?:
                | ((reason: any) => TResult | PromiseLike<TResult>)
                | undefined
                | null
        ): IAnimationThenable<TResult>;
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
     * with a {@link plat.ui.animations.IGetAnimatingThenable|IGetAnimatingThenable} for accessing
     * the {@link plat.ui.animations.IAnimationThenable|IAnimationThenable} of the animating parent element.
     */
    export interface IAnimatingThenable
        extends IAnimationThenable<IGetAnimatingThenable> {}

    /**
     * @name IAnimationCreation
     * @memberof plat.ui.animations
     * @kind interface
     *
     * @description
     * Describes an object containing two promises. One that resolves when the previous animation is finished, the
     * other that resolves when the current animation is finished.
     */
    export interface IAnimationCreation {
        /**
         * @name previous
         * @memberof plat.ui.animations.IAnimationCreation
         * @kind property
         * @access public
         *
         * @type {plat.async.Promise<void>}
         *
         * @description
         * A promise that resolves when a potential previous animation is done.
         */
        previous: async.Promise<void>;

        /**
         * @name current
         * @memberof plat.ui.animations.IAnimationCreation
         * @kind property
         * @access public
         *
         * @type {plat.ui.animations.IAnimatingThenable}
         *
         * @description
         * An animation promise that resolves when the current animation is complete.
         */
        current: IAnimatingThenable;
    }

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
         * @name start
         * @memberof plat.ui.animations.IAnimationEssentials
         * @kind function
         * @access public
         *
         * @description
         * Fires the start method on the animation instances to kickoff the animations.
         *
         * @returns {void}
         */
        start(): void;

        /**
         * @name pause
         * @memberof plat.ui.animations.IAnimationEssentials
         * @kind function
         * @access public
         *
         * @description
         * Fires the pause method on the animation instances.
         *
         * @returns {plat.async.Promise<void>} A new promise that resolves when the animation instance
         * indicates that the animation has been paused.
         */
        pause(): async.Promise<void>;

        /**
         * @name resume
         * @memberof plat.ui.animations.IAnimationEssentials
         * @kind function
         * @access public
         *
         * @description
         * Fires the resume method on the animation instances.
         *
         * @returns {plat.async.Promise<void>} A new promise that resolves when the animation instance
         * indicates that the animation has resumed.
         */
        resume(): async.Promise<void>;

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
