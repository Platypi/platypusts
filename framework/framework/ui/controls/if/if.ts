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
         * @type {plat.ui.IAnimator}
         * 
         * @description
         * Reference to the {@link plat.ui.IAnimator|IAnimator} injectable.
         */
        $Animator: IAnimator = acquire(__Animator);

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
         * @type {plat.ui.IAnimationThenable<void>}
         * 
         * @description
         * A promise that resolves when the leave animation is finished.
         */
        private __leaveAnimation: IAnimationThenable<void>;
        /**
         * @name __enterAnimation
         * @memberof plat.ui.controls.If
         * @kind property
         * @access private
         * 
         * @type {plat.ui.IAnimationThenable<void>}
         * 
         * @description
         * A promise that resolves when the entrance animation is finished.
         */
        private __enterAnimation: IAnimationThenable<void>;

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
            this.fragmentStore = $document.createDocumentFragment();
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
         * @returns {void}
         */
        contextChanged(): void {
            var options = this.options.value;

            if (isEmpty(options)) {
                return;
            }

            this._setter(options);
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
        loaded(): void {
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

            this.contextChanged();
            this.__firstTime = false;
            this.__removeListener = this.options.observe(this._setter);
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
        _setter(options: IIfOptions): void {
            var value = !!options.condition;

            if (value === this.__condition) {
                return;
            }

            if (value) {
                if (!isNull(this.__leaveAnimation)) {
                    this.__leaveAnimation.cancel().then(() => {
                        this.__leaveAnimation = null;
                        this._addItem();
                    });
                } else {
                    this._addItem();
                }
            } else {
                if (!isNull(this.__enterAnimation)) {
                    this.__enterAnimation.cancel().then(() => {
                        this.__enterAnimation = null;
                        this._removeItem();
                    });
                } else {
                    this._removeItem();
                }
            }

            this.__condition = value;
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
        _addItem(): void {
            var commentNode = this.commentNode,
                parentNode = commentNode.parentNode;

            if (!isNode(parentNode)) {
                return;
            }

            parentNode.replaceChild(this.fragmentStore, commentNode);
            this.__enterAnimation = this.$Animator.animate(this.element, __Enter).then(() => {
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
        _removeItem(): void {
            var element = this.element;

            if (this.__firstTime) {
                element.parentNode.insertBefore(this.commentNode, element);
                insertBefore(this.fragmentStore, element);
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
