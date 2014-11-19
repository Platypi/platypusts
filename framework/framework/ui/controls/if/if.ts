module plat.ui.controls {
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
        /**
         * @name $Animator
         * @memberof plat.ui.controls.If
         * @kind property
         * @access public
         * 
         * @type {plat.ui.animations.IAnimator}
         * 
         * @description
         * Reference to the {@link plat.ui.animations.IAnimator|IAnimator} injectable.
         */
        $Animator: animations.IAnimator = acquire(__Animator);

        /**
         * @name $Promise
         * @memberof plat.ui.controls.If
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.async.IPromise}
         * 
         * @description
         * Reference to the {@link plat.async.IPromise|IPromise} injectable.
         */
        $Promise: async.IPromise = acquire(__Promise);

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
        private __condition = true;
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
        private __firstTime = true;
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
         * @name constructor
         * @memberof plat.ui.controls.If
         * @kind function
         * @access public
         * 
         * @description
         * The constructor for a {@link plat.ui.controls.If|If}. Creates the 
         * DocumentFragment for holding the conditional nodes.
         * 
         * @returns {plat.ui.controls.If} A {@link plat.ui.controls.If|If} instance.
         */
        constructor() {
            super();
            var $document: Document = acquire(__Document);
            this.commentNode = $document.createComment('plat-if' + __BOUND_PREFIX + 'placeholder');
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

        setTemplate() {
            var childNodes: Array<Node> = Array.prototype.slice.call(this.element.childNodes);
            this.bindableTemplates.add('template', childNodes);
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
                var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                $exception.warn('No condition specified in plat-options for plat-if.', $exception.BIND);

                this.options = {
                    value: {
                        condition: true
                    },
                    observe: <any>noop
                };
            }

            var promise = this.contextChanged();

            this.__firstTime = false;
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
                return this.$Promise.resolve(null);
            }

            if (value) {
                if (!isNull(this.__leaveAnimation)) {
                    promise = <any>this.__leaveAnimation.cancel().then(() => {
                        this.__leaveAnimation = null;
                        return this._addItem();
                    });
                } else {
                    promise = this._addItem();
                }
            } else {
                if (!isNull(this.__enterAnimation)) {
                    promise = this.__enterAnimation.cancel().then(() => {
                        this.__enterAnimation = null;
                        return this._removeItem();
                    });
                } else {
                    this._removeItem();
                    promise = this.$Promise.resolve(null);
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
            var commentNode = this.commentNode,
                parentNode = commentNode.parentNode;

            if (!isNode(parentNode) && !this.__firstTime) {
                return this.$Promise.resolve(null);
            }

            if (this.__firstTime) {
                return this.bindableTemplates.bind('template').then((template) => {
                    this.fragmentStore = template;
                    this.element.appendChild(template);

                    return this.__enterAnimation = this.$Animator.animate(this.element, __Enter);
                }).then(() => {
                    this.__enterAnimation = null;
                });
            }

            parentNode.replaceChild(this.fragmentStore, commentNode);
            return this.__enterAnimation = this.$Animator.animate(this.element, __Enter).then(() => {
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
        protected _removeItem(): void {
            var element = this.element;

            if (this.__firstTime) {
                return;
            }

            this.__leaveAnimation = this.$Animator.animate(element, __Leave).then(() => {
                this.__leaveAnimation = null;
                element.parentNode.insertBefore(this.commentNode, element);
                insertBefore(this.fragmentStore, element);
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
