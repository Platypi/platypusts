module plat.ui.controls {
    export class If extends TemplateControl {
        $Animator: IAnimator = acquire(__Animator);

        /**
         * The evaluated plat-options object.
         */
        options: observable.IObservableProperty<IIfOptions>;

        /**
         * The Comment used to hold the place of the plat-if element.
         */
        commentNode: Comment;

        /**
         * The DocumentFragment that stores the plat-if element when hidden.
         */
        fragmentStore: DocumentFragment;

        private __removeListener: IRemoveListener;
        private __condition: boolean;
        private __leaveAnimation: IAnimationThenable<void>;
        private __enterAnimation: IAnimationThenable<void>;

        constructor() {
            super();
            var $document: Document = acquire(__Document);
            this.commentNode = $document.createComment('plat-if-@placeholder');
            this.fragmentStore = $document.createDocumentFragment();
        }

        /**
         * Checks the options and initializes the 
         * evaluation.
         */
        contextChanged(): void {
            var options = this.options.value;

            if (isEmpty(options)) {
                return;
            }

            this._setter(options);
        }

        /**
         * Sets the visibility to true if no options are 
         * defined, kicks off the evaluation, and observes 
         * the options for changes.
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
            this.__removeListener = this.options.observe(this._setter);
        }

        /**
         * Stops listening to the options for changes.
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
         * Checks the condition and decides 
         * whether or not to add or remove 
         * the node from the DOM.
         */
        _setter(options: IIfOptions): void {
            var value = options.condition;

            if (value === this.__condition) {
                return;
            }

            if (!value) {
                if (!isNull(this.__enterAnimation)) {
                    this.__enterAnimation.cancel().then(() => {
                        this.__enterAnimation = null;
                        this._removeItem();
                    });
                } else {
                    this._removeItem();
                }
            } else {
                if (!isNull(this.__leaveAnimation)) {
                    this.__leaveAnimation.cancel().then(() => {
                        this.__leaveAnimation = null;
                        this._addItem();
                    });
                } else {
                    this._addItem();
                }
            }

            this.__condition = value;
        }

        /**
         * The callback used to add the fragment to the DOM 
         * after the bindableTemplate has been created.
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
         * Removes the node from the DOM.
         */
        _removeItem(): void {
            var element = this.element;
            this.__leaveAnimation = this.$Animator.animate(element, __Leave).then(() => {
                this.__leaveAnimation = null;
                element.parentNode.insertBefore(this.commentNode, element);
                insertBefore(this.fragmentStore, element);
            });
        }
    }

    /**
     * The available options for plat.ui.controls.If.
     */
    export interface IIfOptions {
        /**
         * A boolean expression to bind to 
         * the element's visibility.
         */
        condition: boolean;
    }

    register.control(__If, If);
}
