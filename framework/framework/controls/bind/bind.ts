module plat.controls {
    export class Bind extends AttributeControl {
        $Parser: expressions.IParser = acquire(__Parser);
        $ContextManagerStatic: observable.IContextManagerStatic = acquire(__ContextManagerStatic);

        /**
         * The priority of Bind is set high to take precede 
         * other controls that may be listening to the same 
         * event.
         */
        priority: number = 100;

        /**
         * The function used to add the proper event based on the input type.
         */
        _addEventType: () => void;

        /**
         * The function used to get the bound value.
         */
        _getter: () => any;

        /**
         * The function used to set the bound value.
         */
        _setter: (newValue: any, oldValue?: any, firstTime?: boolean) => void;

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

        private __fileSupported = (<ICompat>acquire(__Compat)).fileSupported;
        private __fileNameRegex = (<expressions.IRegex>acquire(__Regex)).fileNameRegex;
        private __isSelf = false;

        /**
         * Determines the type of Element being bound to 
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
                expression = this._expression = this.$Parser.parse((<any>this.attributes)[attr]);

            var identifiers = expression.identifiers;

            if (identifiers.length !== 1) {
                var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                $exception.warn('Only 1 identifier allowed in a plat-bind expression', $exception.BIND);
                this._contextExpression = null;
                return;
            }

            var split = identifiers[0].split('.');

            this._property = split.pop();

            if (split.length > 0) {
                this._contextExpression = this.$Parser.parse(split.join('.'));
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
            listener = listener ||
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
         * Getter for input[type="file"]. Creates a partial IFile 
         * element if file is not supported.
         */
        _getFile(): IFile {
            var element = <HTMLInputElement>this.element,
                value = element.value;

            if (this.__fileSupported && element.files.length > 0) {
                return <IFile>element.files[0];
            }

            return {
                name: value.replace(this.__fileNameRegex, ''),
                path: value,
                lastModifiedDate: undefined,
                type: undefined,
                size: undefined,
                msDetachStream: noop,
                msClose: noop,
                slice: () => <Blob>{ }
            };
        }

        /**
         * Getter for input[type="file"]-multiple
         */
        _getFiles(): Array<IFile> {
            var element = <HTMLInputElement>this.element;

            if (this.__fileSupported) {
                return Array.prototype.slice.call(element.files);
            }

            // this case should never be hit since ie9 does not support multi-file uploads, 
            // but kept in here for now for consistency's sake
            var filelist = element.value.split(/,|;/g),
                length = filelist.length,
                files: Array<IFile> = [],
                fileValue: string;

            for (var i = 0; i < length; ++i) {
                fileValue = filelist[i];
                files.push({
                    name: fileValue.replace(this.__fileNameRegex, ''),
                    path: fileValue,
                    lastModifiedDate: undefined,
                    type: undefined,
                    size: undefined,
                    msDetachStream: noop,
                    msClose: noop,
                    slice: () => <Blob>{}
                });
            }

            return files;
        }

        /**
         * Getter for select-multiple
         */
        _getSelectedValues(): Array<string> {
            var options = (<HTMLSelectElement>this.element).options,
                length = options.length,
                option: HTMLOptionElement,
                selectedValues: Array<string> = [];

            for (var i = 0; i < length; ++i) {
                option = options[i];
                if (option.selected) {
                    selectedValues.push(option.value);
                }
            }

            return selectedValues;
        }

        /**
         * Setter for textarea, input[type=text], 
         * and input[type=button], and select
         * 
         * @param newValue The new value to set
         * @param oldValue The previously bound value
         * @param firstTime The context is being evaluated for the first time and 
         * should thus change the property if null
         */
        _setText(newValue: any, oldValue?: any, firstTime?: boolean): void {
            if (this.__isSelf) {
                return;
            }

            if (isNull(newValue)) {
                newValue = '';

                if (firstTime === true) {
                    if (isNull((<HTMLInputElement>this.element).value)) {
                        this.__setValue(newValue);
                    }
                    this._propertyChanged();
                    return;
                }
            }

            this.__setValue(newValue);
        }

        /**
         * Setter for input[type=range]
         * 
         * @param newValue The new value to set
         * @param oldValue The previously bound value
         * @param firstTime The context is being evaluated for the first time and 
         * should thus change the property if null
         */
        _setRange(newValue: any, oldValue?: any, firstTime?: boolean): void {
            if (this.__isSelf) {
                return;
            }

            if (isEmpty(newValue)) {
                newValue = 0;

                if (firstTime === true) {
                    if (isEmpty((<HTMLInputElement>this.element).value)) {
                        this.__setValue(newValue);
                    }
                    this._propertyChanged();
                    return;
                }
            }

            this.__setValue(newValue);
        }

        /**
         * Setter for input[type=checkbox]
         * 
         * @param newValue The new value to set
         * @param oldValue The previously bound value
         * @param firstTime The context is being evaluated for the first time and 
         * should thus change the property if null
         */
        _setChecked(newValue: any, oldValue?: any, firstTime?: boolean): void {
            if (this.__isSelf) {
                return;
            } else if (!isBoolean(newValue)) {
                if (firstTime === true) {
                    this._propertyChanged();
                    return;
                }
                newValue = !!newValue;
            }

            (<HTMLInputElement>this.element).checked = newValue;
        }

        /**
         * Setter for input[type=radio]
         * 
         * @param newValue The new value to set
         */
        _setRadio(newValue: any): void {
            var element = (<HTMLInputElement>this.element);
            if (this.__isSelf) {
                return;
            } else if (isNull(newValue) && element.checked) {
                this._propertyChanged();
                return;
            }

            element.checked = (element.value === newValue);
        }

        /**
         * Setter for select
         * 
         * @param newValue The new value to set
         * @param oldValue The previously bound value
         * @param firstTime The context is being evaluated for the first time and 
         * should thus change the property if null
         */
        _setSelectedIndex(newValue: any, oldValue?: any, firstTime?: boolean): void {
            if (this.__isSelf) {
                return;
            }

            var element = <HTMLSelectElement>this.element;
            if (isNull(newValue)) {
                element.selectedIndex = -1;
                if (firstTime === true) {
                    this.__checkAsynchronousSelect(newValue);
                    this._propertyChanged();
                }
                return;
            } else if (element.value === newValue) {
                if (isUndefined(oldValue)) {
                    this.__checkAsynchronousSelect(newValue);
                }
                return;
            }

            element.value = newValue;
            // check to make sure the user changed to a valid value
            if (element.value !== newValue) {
                if (isUndefined(oldValue)) {
                    this.__checkAsynchronousSelect(newValue);
                }
                element.selectedIndex = -1;
            } else if (element.selectedIndex === -1) {
                // an ie fix for inconsistency
                element.selectedIndex = -1;
            }
        }

        /**
         * Setter for select-multiple
         * 
         * @param newValue The new value to set
         * @param oldValue The previously bound value
         * @param firstTime The context is being evaluated for the first time and 
         * should thus change the property if null
         */
        _setSelectedIndices(newValue: any, oldValue?: any, firstTime?: boolean): void {
            if (this.__isSelf) {
                return;
            }

            var options = (<HTMLSelectElement>this.element).options,
                length = isNull(options) ? 0 : options.length,
                option: HTMLOptionElement,
                nullValue = isNull(newValue);

            if (length === 0) {
                this.__checkAsynchronousSelect(newValue);
                if (firstTime === true) {
                    this._propertyChanged();
                }
                return;
            }

            if (nullValue || !isArray(newValue)) {
                if (firstTime === true) {
                    this._propertyChanged();
                }
                // unselects the options unless a match is found
                while (length-- > 0) {
                    option = options[length];
                    if (!nullValue && option.value === '' + newValue) {
                        option.selected = true;
                        return;
                    }

                    option.selected = false;
                }
                return;
            }

            var value: any,
                numberValue: number;

            while (length-- > 0) {
                option = options[length];
                value = option.value;
                numberValue = Number(value);

                if (newValue.indexOf(value) !== -1 || (isNumber(numberValue) && newValue.indexOf(numberValue) !== -1)) {
                    option.selected = true;
                    continue;
                }

                option.selected = false;
            }
        }

        /**
         * Determines the type of Element being bound to 
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
                            this._addEventType = this._addChangeEventListener;
                            this._getter = this._getChecked;
                            this._setter = this._setChecked;
                            break;
                        case 'radio':
                            this.__initializeRadio();
                            break;
                        case 'range':
                            this._addEventType = this._addChangeEventListener;
                            this._getter = this._getValue;
                            this._setter = this._setRange;
                            break;
                        case 'file':
                            var multi = (<HTMLInputElement>element).multiple;
                            this._addEventType = this._addChangeEventListener;
                            this._getter = multi ? this._getFiles : this._getFile;
                            break;
                        default:
                            this._addEventType = this._addTextEventListener;
                            this._getter = this._getValue;
                            this._setter = this._setText;
                            break;
                    }
                    break;
                case 'select':
                    this.__initializeSelect();
                    break;
            }
        }

        /**
         * Observes the expression to bind to.
         */
        _watchExpression(): void {
            var contextExpression = this._contextExpression,
                context = this.evaluateExpression(contextExpression);

            if (isNull(context) && contextExpression.identifiers.length > 0) {
                context = this.$ContextManagerStatic.createContext(this.parent,
                    contextExpression.identifiers[0]);
            }

            var property: string;
            if (!isFunction(this._setter)) {
                return;
            } else if (this._setter === this._setSelectedIndices) {
                property = this._property;
                if (isNull(context[property])) {
                    context[property] = [];
                }
                this.observeArray(context, property, (arrayInfo: observable.IArrayMethodInfo<string>) => {
                    this._setter(arrayInfo.newArray, arrayInfo.oldArray, true);
                });
            }

            var expression = this._expression;

            this.observeExpression(expression, this._setter);
            this._setter(this.evaluateExpression(expression), undefined, true);
        }

        /**
         * Sets the context property being bound to when the 
         * element's property is changed.
         */
        _propertyChanged(): void {
            if (isNull(this._contextExpression)) {
                return;
            }

            var context = this.evaluateExpression(this._contextExpression),
                property = this._property;

            var newValue = this._getter();

            if (isNull(context) || context[property] === newValue) {
                return;
            }

            // set flag to let setter functions know we changed the property
            this.__isSelf = true;
            context[property] = newValue;
            this.__isSelf = false;
        }

        private __setValue(newValue: any): void {
            var element = <HTMLInputElement>this.element;
            if (element.value === newValue) {
                return;
            }

            element.value = newValue;
        }

        private __initializeRadio() {
            var element = this.element;

            this._addEventType = this._addChangeEventListener;
            this._getter = this._getValue;
            this._setter = this._setRadio;

            if (!element.hasAttribute('name')) {
                var attr = camelCase(this.type),
                    expression = (<any>this.attributes)[attr];

                element.setAttribute('name', expression);
            }

            if (element.hasAttribute('value')) {
                return;
            }

            element.setAttribute('value', '');
        }

        private __initializeSelect() {
            var element = this.element,
                multiple = (<HTMLSelectElement>element).multiple,
                options = (<HTMLSelectElement>element).options,
                length = options.length,
                option: HTMLSelectElement;

            this._addEventType = this._addChangeEventListener;
            if (multiple) {
                this._getter = this._getSelectedValues;
                this._setter = this._setSelectedIndices;
            } else {
                this._getter = this._getValue;
                this._setter = this._setSelectedIndex;
            }

            for (var i = 0; i < length; ++i) {
                option = options[i];
                if (!option.hasAttribute('value')) {
                    option.setAttribute('value', option.textContent);
                }
            }
        }

        private __checkAsynchronousSelect(newValue: any): void {
            var select = <ui.controls.Select>this.templateControl;
            if (!isNull(select) && select.type === __Select && isPromise(select.itemsLoaded)) {
                var element = <HTMLSelectElement>this.element,
                    split = select.absoluteContextPath.split('.'),
                    key = split.pop();

                this.observeArray(this.$ContextManagerStatic.getContext(this.parent, split), key,
                    (ev: observable.IArrayMethodInfo<any>) => {
                    select.itemsLoaded.then(() => {
                        this._setSelectedIndex(this.evaluateExpression(this._expression), null);
                    });
                });

                select.itemsLoaded.then(() => {
                    this._setSelectedIndex(newValue, null);
                });
            }
        }
    }

    register.control(__Bind, Bind);

    /**
     * A file interface for browsers that do not support the 
     * File API.
     */
    export interface IFile extends File {
        /**
         * An absolute path to the file. The property is not added supported to 
         * File types.
         */
        path?: string;
    }
}
