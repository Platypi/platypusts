module plat.ui.controls {
    export class If extends TemplateControl implements IIf {
        /**
         * Removes the <plat-if> node from the DOM
         */
        replaceWith = 'any';

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
        private __condition: boolean = false;

        constructor() {
            super();
            var $Document: Document = acquire(__Document);

            this.commentNode = $Document.createComment('plat-if-@placeholder');
            this.fragmentStore = $Document.createDocumentFragment();
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

            this.setter(options);
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
            this._removeItem();
            this.contextChanged();
            this.__removeListener = this.options.observe(this.setter);
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
        setter(options: IIfOptions): void {
            var value = options.condition;

            if (value === this.__condition) {
                return;
            }

            if (!value) {
                this._removeItem();
            } else {
                this._addItem();
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
        }

        /**
         * Removes the node from the DOM.
         */
        _removeItem(): void {
            var element = this.element;
            element.parentNode.insertBefore(this.commentNode, element);
            insertBefore(this.fragmentStore, element);

        }
    }

    export interface IIf {
        /**
         * Checks the condition and decides 
         * whether or not to add or remove 
         * the node from the DOM.
         */
        setter(options: IIfOptions): void;
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
