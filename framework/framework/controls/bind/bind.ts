module plat.controls {
    export class Bind extends AttributeControl {
        /**
         * The priority of Bind is set high to take precede 
         * other controls that may be listening to the same 
         * event.
         */
        priority: number = 100;
        $parser: expressions.IParser = acquire('$parser');
        $ExceptionStatic: IExceptionStatic = acquire('$ExceptionStatic');
        $ContextManagerStatic: observable.IContextManagerStatic = acquire('$ContextManagerStatic');
        /**
         * The function used to add the proper event based on the input type.
         */
        _addEventType: () => void;

        /**
         * The function used to get the bound value.
         */
        _getter: any;

        /**
         * The function used to set the bound value.
         */
        _setter: any;

        /**
         * The event listener attached to this element.
         */
        _eventListener: () => void;

        /**
         * The event listener as a postponed function.
         */
        _postponedEventListener: () => void;

        /**
         * The expression to evaluate as the bound value.
         */
        _expression: expressions.IParsedExpression;

        /**
         * The IParsedExpression used to evaluate the context 
         * of the bound property.
         */
        _contextExpression: expressions.IParsedExpression;

        /**
         * The bound property name.
         */
        _property: string;

        /**
         * Determines the type of HTMLElement being bound to 
         * and sets the necessary handlers.
         */
        initialize(): void {
            this._determineType();
        }

        /**
         * Parses and watches the expression being bound to.
         */
        loaded(): void {
            if (isNull(this.parent) || isNull(this.element)) {
                return;
            }

            var attr = camelCase(this.type),
                expression = this._expression = this.$parser.parse((<any>this.attributes)[attr]);

            var identifiers = this._expression.identifiers;

            if (identifiers.length !== 1) {
                this.$ExceptionStatic.warn('Only 1 identifier allowed in a plat-bind expression');
                this._contextExpression = null;
                return;
            }

            var split = identifiers[0].split('.');

            this._property = split.pop();

            if (split.length > 0) {
                this._contextExpression = this.$parser.parse(split.join('.'));
            } else if (expression.aliases.length > 0) {
                var alias = expression.aliases[0],
                    resourceObj = this.parent.findResource(alias);

                if (isNull(resourceObj) || resourceObj.resource.type !== 'observable') {
                    return;
                }

                this._property = 'value';

                this._contextExpression = {
                    evaluate: () => {
                        return resourceObj.resource;
                    },
                    aliases: [],
                    identifiers: [],
                    expression: ''
                };
            } else {
                this._contextExpression = {
                    evaluate: () => {
                        return this.parent.context;
                    },
                    aliases: [],
                    identifiers: [],
                    expression: ''
                };
            }

            this._watchExpression();

            if (isNull(this._addEventType)) {
                return;
            }

            this._addEventType();
        }

        /**
         * Re-observes the expression with the new context.
         */
        contextChanged(): void {
            this._watchExpression();
        }

        /**
         * Removes all of the element's event listeners.
         */
        dispose(): void {
            this._eventListener = null;
            this._postponedEventListener = null;
            this._addEventType = null;
        }

        /**
         * Adds a text event as the event listener. 
         * Used for textarea and input[type=text].
         */
        _addTextEventListener(): void {
            var composing = false,
                timeout: IRemoveListener;

            this._eventListener = () => {
                if (composing) {
                    return;
                }

                this._propertyChanged();
            };

            this._postponedEventListener = () => {
                if (!!timeout) {
                    return;
                }

                timeout = postpone(() => {
                    this._eventListener();
                    timeout = null;
                });
            };

            this._addEventListener('compositionstart', () => composing = true);

            this._addEventListener('compositionend', () => composing = false);

            this._addEventListener('keydown', (ev?: KeyboardEvent) => {
                var key = ev.keyCode,
                    codes = KeyCodes;

                if (key === codes.lwk ||
                    key === codes.rwk ||
                    (key > 15 && key < 28) ||
                    (key > 32 && key < 41)) {
                    return;
                }

                this._postponedEventListener();
            });
            this._addEventListener('cut', null, true);
            this._addEventListener('paste', null, true);
            this._addEventListener('change');
        }

        /**
         * Adds a change event as the event listener. 
         * Used for select, input[type=radio], and input[type=range].
         */
        _addChangeEventListener(): void {
            this._eventListener = this._propertyChanged.bind(this);
            this._addEventListener('change');
        }

        /**
         * Adds the event listener to the element.
         * 
         * @param event The event type
         * @param listener The event listener
         * @param postpone Whether or not to postpone the event listener
         */
        _addEventListener(event: string, listener?: () => void, postpone?: boolean): void {
            var listener = listener ||
                (!!postpone ? this._postponedEventListener : this._eventListener);

            this.addEventListener(this.element, event, listener, false);
        }

        /**
         * Getter for input[type=checkbox] and input[type=radio]
         */
        _getChecked(): boolean {
            return (<HTMLInputElement>this.element).checked;
        }

        /**
         * Getter for input[type=text], input[type=range], 
         * textarea, and select.
         */
        _getValue(): string {
            return (<HTMLInputElement>this.element).value;
        }

        /**
         * Setter for textarea, input[type=text], 
         * and input[type=button]
         * 
         * @param newValue The new value to set
         */
        _setText(newValue: any): void {
            if (isNull(newValue)) {
                newValue = '';
            }

            this.__setValue(newValue);
        }

        /**
         * Setter for input[type=range]
         * 
         * @param newValue The new value to set
         */
        _setRange(newValue: any): void {
            if (isEmpty(newValue)) {
                newValue = 0;
            }

            this.__setValue(newValue);
        }

        /**
         * Setter for input[type=checkbox] and input[type=radio]
         * 
         * @param newValue The new value to set
         */
        _setChecked(newValue: any): void {
            (<HTMLInputElement>this.element).checked = !(newValue === false);
        }

        /**
         * Setter for select
         * 
         * @param newValue The new value to set
         */
        _setSelectedIndex(newValue: any): void {
            if (isNull(newValue)) {
                return;
            }

            (<HTMLSelectElement>this.element).value = newValue;
        }

        /**
         * Determines the type of HTMLElement being bound to 
         * and sets the necessary handlers.
         */
        _determineType(): void {
            var element = this.element;

            if (isNull(element)) {
                return;
            }

            switch (element.nodeName.toLowerCase()) {
                case 'textarea':
                    this._addEventType = this._addTextEventListener;
                    this._getter = this._getValue;
                    this._setter = this._setText;
                    break;
                case 'input':
                    switch ((<HTMLInputElement>element).type) {
                        case 'button':
                            this._setter = this._setText;
                            break;
                        case 'checkbox':
                        case 'radio':
                            this._addEventType = this._addChangeEventListener;
                            this._getter = this._getChecked;
                            this._setter = this._setChecked;
                            break;
                        case 'range':
                            this._addEventType = this._addChangeEventListener;
                            this._getter = this._getValue;
                            this._setter = this._setRange;
                            break;
                        default:
                            this._addEventType = this._addTextEventListener;
                            this._getter = this._getValue;
                            this._setter = this._setText;
                            break;
                    }
                    break;
                case 'select':
                    this._addEventType = this._addChangeEventListener;
                    this._getter = this._getValue;
                    this._setter = this._setSelectedIndex;
                    var options = (<HTMLSelectElement>element).options,
                        length = options.length,
                        option: HTMLSelectElement;

                    for (var i = 0; i < length; ++i) {
                        option = options[i];
                        if (!option.hasAttribute('value')) {
                            option.setAttribute('value', option.textContent);
                        }
                    }
                    break;
            }
        }

        /**
         * Observes the expression to bind to.
         */
        _watchExpression(): void {
            var expression = this._expression;
            this.observeExpression(expression, this._setter);
            this._setter(this.parent.evaluateExpression(expression));
        }

        /**
         * Sets the context property being bound to when the 
         * element's property is changed.
         */
        _propertyChanged(): void {
            if (isNull(this._contextExpression)) {
                return;
            }

            var context = this.parent.evaluateExpression(this._contextExpression),
                property = this._property;

            var newValue = this._getter();

            if (isNull(context)) {
                context = this.$ContextManagerStatic.createContext(this.parent,
                        this._contextExpression.identifiers[0]);
            } else if(context[property] === newValue) {
                return;
            }

            context[property] = newValue;
        }
        private __setValue(newValue: any): void {
            if ((<HTMLInputElement>this.element).value === newValue) {
                return;
            }

            (<HTMLInputElement>this.element).value = newValue;
        }
    }

    register.control('plat-bind', Bind);
}
