module plat.ui.controls {
    'use strict';

    /**
     * @name If
     * @memberof plat.ui.controls
     * @kind class
     *
     * @extends {plat.ui.TemplateControl}
     *
     * @description
     * A {@link plat.ui.TemplateControl|TemplateControl} conditionally adding or removing
     * a block of nodes to or from the DOM.
     */
    export class If extends TemplateControl {
        protected static _inject: any = {
            _animator: __Animator,
            _Promise: __Promise,
            _document: __Document
        };

        /**
         * @name _document
         * @memberof plat.ui.controls.If
         * @kind property
         * @access protected
         *
         * @type {Document}
         *
         * @description
         * The document injectable.
         */
        protected _document: Document;

        /**
         * @name _animator
         * @memberof plat.ui.controls.If
         * @kind property
         * @access protected
         *
         * @type {plat.ui.animations.Animator}
         *
         * @description
         * Reference to the {@link plat.ui.animations.Animator|Animator} injectable.
         */
        protected _animator: animations.Animator;

        /**
         * @name _Promise
         * @memberof plat.ui.controls.If
         * @kind property
         * @access protected
         * @static
         *
         * @type {plat.async.IPromise}
         *
         * @description
         * Reference to the {@link plat.async.IPromise|IPromise} injectable.
         */
        protected _Promise: async.IPromise;

        /**
         * @name options
         * @memberof plat.ui.controls.If
         * @kind property
         * @access public
         *
         * @type {plat.observable.IObservableProperty<plat.ui.controls.IIfOptions>}
         *
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: observable.IObservableProperty<IIfOptions>;

        /**
         * @name commentNode
         * @memberof plat.ui.controls.If
         * @kind property
         * @access public
         *
         * @type {Comment}
         *
         * @description
         * The Comment used to hold the place of the plat-if element.
         */
        commentNode: Comment;

        /**
         * @name fragmentStore
         * @memberof plat.ui.controls.If
         * @kind property
         * @access public
         *
         * @type {DocumentFragment}
         *
         * @description
         * The DocumentFragment that stores the plat-if element when hidden.
         */
        fragmentStore: DocumentFragment;

        /**
         * @name _animate
         * @memberof plat.ui.controls.If
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * Whether or not to animate adding and removing of element.
         */
        protected _animate: boolean = false;

        /**
         * @name __condition
         * @memberof plat.ui.controls.If
         * @kind property
         * @access private
         *
         * @type {boolean}
         *
         * @description
         * The current evaluated condition (whether or not the
         * control is visible) of the control.
         */
        private __condition: boolean = true;

        /**
         * @name __firstTime
         * @memberof plat.ui.controls.If
         * @kind property
         * @access private
         *
         * @type {boolean}
         *
         * @description
         * A boolean value stating whether or not the condition has already
         * been evaluated.
         */
        private __firstTime: boolean = true;

        /**
         * @name __removeListener
         * @memberof plat.ui.controls.If
         * @kind property
         * @access private
         *
         * @type {plat.IRemoveListener}
         *
         * @description
         * A function to stop listening to changes on the options object.
         */
        private __removeListener: IRemoveListener;

        /**
         * @name __cancelFrame
         * @memberof plat.ui.controls.If
         * @kind property
         * @access private
         *
         * @type {plat.IRemoveListener}
         *
         * @description
         * A function to not fire the animation frame callback
         */
        private __cancelFrame: IRemoveListener;

        /**
         * @name __leavePromise
         * @memberof plat.ui.controls.If
         * @kind property
         * @access private
         *
         * @type {plat.ui.animations.IAnimationThenable<any>|plat.async.IThenable<any>}
         *
         * @description
         * A promise that resolves when the leave is finished.
         */
        private __leavePromise: animations.IAnimationThenable<any>|plat.async.IThenable<any>;

        /**
         * @name __enterPromise
         * @memberof plat.ui.controls.If
         * @kind property
         * @access private
         *
         * @type {plat.ui.animations.IAnimationThenable<any>|plat.async.IThenable<any>}
         *
         * @description
         * A promise that resolves when the entrance is finished.
         */
        private __enterPromise: animations.IAnimationThenable<any>|plat.async.IThenable<any>;

        /**
         * @name __initialBind
         * @memberof plat.ui.controls.If
         * @kind property
         * @access private
         *
         * @type {plat.async.IThenable<void>}
         *
         * @description
         * A promise that resolves when the template has been bound.
         */
        private __initialBind: async.IThenable<void>;

        /**
         * @name constructor
         * @memberof plat.ui.controls.If
         * @kind function
         * @access public
         *
         * @description
         * The constructor for a {@link plat.ui.controls.If|If}. Creates the comment node and document fragment storage
         * used by this control.
         *
         * @returns {plat.ui.controls.If} A {@link plat.ui.controls.If|If} instance.
         */
        constructor() {
            super();

            let _document = this._document;
            this.commentNode = _document.createComment(__If + __BOUND_PREFIX + 'placeholder');
            this.fragmentStore = _document.createDocumentFragment();
        }

        /**
         * @name contextChanged
         * @memberof plat.ui.controls.If
         * @kind function
         * @access public
         *
         * @description
         * Checks the options and initializes the
         * evaluation.
         *
         * @returns {plat.async.IThenable<void>} A promise that resolves when the template has been added/removed.
         */
        contextChanged(): async.IThenable<void> {
            let options = this.options.value;

            if (isEmpty(options)) {
                return;
            }

            return this._setter(options);
        }

        /**
         * @name setTemplate
         * @memberof plat.ui.controls.If
         * @kind function
         * @access public
         *
         * @description
         * Creates a bindable template with the control element's childNodes (innerHTML).
         *
         * @returns {void}
         */
        setTemplate(): void {
            this.bindableTemplates.add('template', Array.prototype.slice.call(this.element.childNodes));
        }

        /**
         * @name loaded
         * @memberof plat.ui.controls.If
         * @kind function
         * @access public
         *
         * @description
         * Sets the visibility to true if no options are
         * defined, kicks off the evaluation, and observes
         * the options for changes.
         *
         * @returns {plat.async.IThenable<void>} A promise that resolves when the proper action is complete
         */
        loaded(): async.IThenable<void> {
            let options = this.options;
            if (isObject(options)) {
                this._animate = options.value.animate === true;
            } else {
                this._log.warn('No condition specified in ' + __Options + ' for ' + this.type + '.');

                this.options = {
                    value: {
                        condition: true
                    },
                    observe: <any>noop
                };
            }

            let promise = this.contextChanged();

            this.__removeListener = this.options.observe(this._setter);

            return promise;
        }

        /**
         * @name dispose
         * @memberof plat.ui.controls.If
         * @kind function
         * @access public
         *
         * @description
         * Stops listening to the options for changes.
         *
         * @returns {void}
         */
        dispose(): void {
            if (isFunction(this.__removeListener)) {
                this.__removeListener();
                this.__removeListener = null;
            }

            if (isFunction(this.__cancelFrame)) {
                this.__cancelFrame();
                this.__cancelFrame = null;
            }

            this.commentNode = null;
            this.fragmentStore = null;
        }

        /**
         * @name _setter
         * @memberof plat.ui.controls.If
         * @kind function
         * @access protected
         *
         * @description
         * Checks the condition and decides
         * whether or not to add or remove
         * the node from the DOM.
         *
         * @returns {plat.async.IThenable<void>} A Promise that resolves when the boolean based action is complete
         */
        protected _setter(options: IIfOptions): async.IThenable<void> {
            let value = !!options.condition,
                actionPromise: animations.IAnimationThenable<any>|async.IThenable<any>,
                next: () => async.IThenable<any>,
                promise: animations.IAnimationThenable<any>|async.IThenable<any>;

            if (value === this.__condition && !this.__firstTime) {
                return this._Promise.resolve(null);
            } else if (value) {
                actionPromise = this.__leavePromise;
                next = (): async.IThenable<void> => {
                    this.__leavePromise = null;
                    return this._addItem();
                };
            } else {
                actionPromise = this.__enterPromise;
                next = (): async.IThenable<void> => {
                    this.__enterPromise = null;
                    return this._removeItem();
                };
            }

            if (isNull(actionPromise)) {
                promise = next();
            } else if (this._animate && isFunction((<animations.IAnimationThenable<any>>actionPromise).cancel)) {
                promise = (<animations.IAnimationThenable<any>>actionPromise).cancel().then(next);
            } else {
                promise = (<async.IThenable<any>>actionPromise).then(next);
            }

            this.__condition = value;

            return promise;
        }

        /**
         * @name _addItem
         * @memberof plat.ui.controls.If
         * @kind function
         * @access protected
         *
         * @description
         * Adds the conditional nodes to the DOM.
         *
         * @returns {void}
         */
        protected _addItem(): async.IThenable<void> {
            if (!(this.__firstTime || isNode(this.commentNode.parentNode))) {
                return this._Promise.resolve(null);
            }

            if (this.__firstTime) {
                this.__firstTime = false;

                return this.__initialBind = this.bindableTemplates.bind('template').then((template): async.IThenable<void> => {
                    this.__initialBind = null;

                    let element = this.element;
                    if (element.parentNode === this.fragmentStore || isNull(element.parentNode)) {
                        element.insertBefore(template, null);
                        if (this._animate) {
                            return this._animateEntrance();
                        }

                        return this._elementEntrance();
                    } else if (this._animate) {
                        this.__enterPromise = this._animator.animate(element, __Enter).then((): void => {
                            this.__enterPromise = null;
                        });

                        element.insertBefore(template, null);
                        return this.__enterPromise;
                    }

                    element.insertBefore(template, null);
                });
            } else if (isPromise(this.__initialBind)) {
                return this.__initialBind = this.__initialBind.then((): async.IThenable<void> => {
                    this.__initialBind = null;
                    if (this._animate) {
                        return this._animateEntrance();
                    }

                    return this._elementEntrance();
                });
            } else if (this._animate) {
                return this._animateEntrance();
            }

            return this._elementEntrance();
        }

        /**
         * @name _elementEntrance
         * @memberof plat.ui.controls.If
         * @kind function
         * @access protected
         *
         * @description
         * Adds the template to the DOM.
         *
         * @returns {plat.async.IThenable<void>} A promise that resolves when the template is done animating
         */
        protected _elementEntrance(): async.IThenable<void> {
            let commentNode = this.commentNode,
                parentNode = commentNode.parentNode;

            if (!isNode(parentNode)) {
                return this._Promise.resolve();
            }

            this.__enterPromise = new this._Promise((resolve) => {
                this.__cancelFrame = requestAnimationFrameGlobal(() => {
                    parentNode.insertBefore(this.element, commentNode);
                    resolve();
                });
            });

            return this.__enterPromise;
        }

        /**
         * @name _animateEntrance
         * @memberof plat.ui.controls.If
         * @kind function
         * @access protected
         *
         * @description
         * Animates the template as it enters the DOM.
         *
         * @returns {plat.animations.IAnimationThenable<void>} A promise that resolves when the template is done animating
         */
        protected _animateEntrance(): animations.IAnimationThenable<void> {
            let commentNode = this.commentNode,
                parentNode = commentNode.parentNode;

            if (!isNode(parentNode)) {
                return this._animator.resolve().then(noop);
            }

            this.__enterPromise = this._animator.enter(this.element, __Enter, <Element>parentNode, commentNode).then((): void => {
                this.__enterPromise = null;
            });

            return <animations.IAnimationThenable<void>>this.__enterPromise;
        }

        /**
         * @name _removeItem
         * @memberof plat.ui.controls.If
         * @kind function
         * @access protected
         *
         * @description
         * Removes the conditional nodes from the DOM.
         *
         * @returns {async.IThenable<void>} A Promise that resolves when the item has been removed
         */
        protected _removeItem(): async.IThenable<void> {
            if (isPromise(this.__initialBind)) {
                return this.__initialBind = this.__initialBind.then((): async.IThenable<void> => {
                    this.__initialBind = null;
                    if (this._animate) {
                        return this._animateLeave();
                    }

                    return this._elementLeave();
                });
            } else if (this._animate) {
                return this._animateLeave();
            }

            return this._elementLeave();
        }

        /**
         * @name _elementLeave
         * @memberof plat.ui.controls.If
         * @kind function
         * @access protected
         *
         * @description
         * Removes the template from the DOM.
         *
         * @returns {async.IThenable<void>} A Promise that resolves when the element has been removed from the DOM
         */
        protected _elementLeave(): async.IThenable<void> {
            let element = this.element,
                parent = element.parentElement,
                nextSibling = element.nextSibling;

            if (!isNode(parent)) {
                return this._Promise.resolve();
            }

            this.__leavePromise = new this._Promise((resolve) => {
                this.__cancelFrame = requestAnimationFrameGlobal(() => {
                    if (!isNode(this.commentNode.parentNode)) {
                        parent.insertBefore(this.commentNode, nextSibling);
                    }

                    this.fragmentStore.insertBefore(element, null);
                    resolve();
                });
            });

            return this.__leavePromise;
        }

        /**
         * @name _animateLeave
         * @memberof plat.ui.controls.If
         * @kind function
         * @access protected
         *
         * @description
         * Animates the template as it leaves the DOM.
         *
         * @returns {plat.animations.IAnimationThenable<void>} A promise that resolves when the template is done animating
         */
        protected _animateLeave(): animations.IAnimationThenable<void> {
            let element = this.element,
                parent = element.parentElement,
                nextSibling = element.nextSibling;

            if (!isNode(parent)) {
                return this._animator.resolve().then(noop);
            }

            this.__leavePromise = this._animator.leave(element, __Leave).then((): void => {
                this.__leavePromise = null;
                if (!isNode(this.commentNode.parentNode)) {
                    parent.insertBefore(this.commentNode, nextSibling);
                }

                this.fragmentStore.insertBefore(element, null);
            });

            return <animations.IAnimationThenable<void>>this.__leavePromise;
        }
    }

    /**
     * @name IIfOptions
     * @memberof plat.ui.controls
     * @kind interface
     *
     * @description
     * The available {@link plat.controls.Options|options} for the {@link plat.ui.controls.If|If} control.
     */
    export interface IIfOptions {
        /**
         * @name animate
         * @memberof plat.ui.controls.IIfOptions
         * @kind property
         *
         * @type {boolean}
         *
         * @description
         * Will allow for animations if set to true.
         */
        animate?: boolean;

        /**
         * @name condition
         * @memberof plat.ui.controls.IIfOptions
         * @kind property
         * @access public
         *
         * @type {boolean}
         *
         * @description
         * A boolean expression to bind to whether or not the conditional
         * nodes are present on the DOM.
         */
        condition: boolean;
    }

    register.control(__If, If);
}
