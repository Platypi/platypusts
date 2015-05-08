/// <reference path="../../../references.d.ts" />

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
         * @name __leaveAnimation
         * @memberof plat.ui.controls.If
         * @kind property
         * @access private
         * 
         * @type {plat.ui.animations.IAnimationThenable<any>}
         * 
         * @description
         * A promise that resolves when the leave animation is finished.
         */
        private __leaveAnimation: animations.IAnimationThenable<any>;

        /**
         * @name __enterAnimation
         * @memberof plat.ui.controls.If
         * @kind property
         * @access private
         * 
         * @type {plat.ui.animations.IAnimationThenable<any>}
         * 
         * @description
         * A promise that resolves when the entrance animation is finished.
         */
        private __enterAnimation: animations.IAnimationThenable<any>;

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

            var _document = this._document;
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
            var options = this.options.value;

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
         * @returns {void}
         */
        loaded(): async.IThenable<void> {
            if (isNull(this.options)) {
                var _Exception = this._Exception;
                _Exception.warn('No condition specified in ' + __Options + ' for ' + this.type + '.', _Exception.BIND);

                this.options = {
                    value: {
                        condition: true
                    },
                    observe: <any>noop
                };
            }

            var promise = this.contextChanged();

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
         * @returns {void}
         */
        protected _setter(options: IIfOptions): async.IThenable<void> {
            var value = !!options.condition,
                promise: async.IThenable<void>;

            if (value === this.__condition && !this.__firstTime) {
                return this._Promise.resolve(null);
            }

            if (value) {
                if (!isNull(this.__leaveAnimation)) {
                    promise = <any>this.__leaveAnimation.cancel().then((): async.IThenable<void> => {
                        this.__leaveAnimation = null;
                        return this._addItem();
                    });
                } else {
                    promise = this._addItem();
                }
            } else {
                if (!isNull(this.__enterAnimation)) {
                    promise = this.__enterAnimation.cancel().then((): void => {
                        this.__enterAnimation = null;
                        return <any>this._removeItem();
                    });
                } else {
                    this._removeItem();
                    promise = this._Promise.resolve(null);
                }
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
            if (!isNode(this.commentNode.parentNode) && !this.__firstTime) {
                return this._Promise.resolve(null);
            }

            if (this.__firstTime) {
                this.__firstTime = false;
                this.__initialBind = this.bindableTemplates.bind('template').then((template): animations.IAnimatingThenable => {
                    var element = this.element;
                    this.__initialBind = null;

                    if (element.parentNode === this.fragmentStore) {
                        element.insertBefore(template, null);
                        return <any>this._animateEntrance();
                    }

                    this.__enterAnimation = this._animator.animate(element, __Enter);
                    element.insertBefore(template, null);
                    return this.__enterAnimation;
                }).then((): void => {
                    this.__enterAnimation = null;
                });

                return this.__initialBind;
            }

            if (isPromise(this.__initialBind)) {
                return this.__initialBind.then((): animations.IAnimationThenable<void> => {
                    return this._animateEntrance();
                });
            }

            return this._animateEntrance();
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
            var commentNode = this.commentNode,
                parentNode = commentNode.parentNode;

            if (!isNode(parentNode)) {
                return this._animator.resolve().then(noop);
            }

            return this.__enterAnimation = this._animator.enter(this.element, __Enter, <Element>parentNode, commentNode).then((): void => {
                this.__enterAnimation = null;
            });
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
         * @returns {void}
         */
        protected _removeItem(): async.IThenable<void> {
            if (isPromise(this.__initialBind)) {
                return this.__initialBind.then((): async.IThenable<void> => {
                    return this._animateLeave();
                });
            }

            return this._animateLeave();
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
            var element = this.element,
                parent = element.parentElement,
                nextSibling = element.nextSibling;

            if (!isNode(parent)) {
                return this._animator.resolve().then(noop);
            }

            return this.__leaveAnimation = this._animator.leave(element, __Leave).then((): void => {
                this.__leaveAnimation = null;
                parent.insertBefore(this.commentNode, nextSibling);
                this.fragmentStore.insertBefore(element, null);
            });
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
