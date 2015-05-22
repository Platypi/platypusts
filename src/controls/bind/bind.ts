/// <reference path="../../references.d.ts" />

/**
 * @name controls
 * @memberof plat
 * @kind namespace
 * @access public
 * 
 * @description
 * Holds all classes and interfaces related to attribute control components in platypus.
 */
module plat.controls {
    'use strict';

    /**
     * @name Bind
     * @memberof plat.controls
     * @kind class
     * 
     * @extends {plat.AttributeControl}
     * @implements {plat.observable.IImplementTwoWayBinding}
     * 
     * @description
     * Facilitates two-way databinding for HTMLInputElements, HTMLSelectElements, and HTMLTextAreaElements.
     */
    export class Bind extends AttributeControl implements observable.IImplementTwoWayBinding {
        protected static _inject: any = {
            _parser: __Parser,
            _ContextManager: __ContextManagerStatic,
            _compat: __Compat,
            _document: __Document
        };

        /**
         * @name priority
         * @memberof plat.controls.Bind
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The priority of {@link plat.controls.Bind|Bind} is set high to precede 
         * other controls that may be listening to the same 
         * event.
         */
        priority: number = 100;

        /**
         * @name _parser
         * @memberof plat.controls.Bind
         * @kind property
         * @access protected
         * @static
         * 
         * @type {plat.expressions.Parser}
         * 
         * @description
         * Reference to the {@link plat.expressions.Parser|Parser} injectable.
         */
        protected _parser: expressions.Parser;

        /**
         * @name _ContextManager
         * @memberof plat.controls.Bind
         * @kind property
         * @access protected
         * @static
         * 
         * @type {plat.observable.IContextManagerStatic}
         * 
         * @description
         * Reference to the {@link plat.observable.IContextManagerStatic|IContextManagerStatic} injectable.
         */
        protected _ContextManager: observable.IContextManagerStatic;

        /**
         * @name _compat
         * @memberof plat.controls.Bind
         * @kind property
         * @access protected
         * @static
         * 
         * @type {plat.Compat}
         * 
         * @description
         * Reference to the {@link plat.Compat|Compat} injectable.
         */
        protected _compat: Compat;

        /**
         * @name _document
         * @memberof plat.controls.Bind
         * @kind property
         * @access protected
         * @static
         * 
         * @type {Document}
         * 
         * @description
         * Reference to the Document injectable.
         */
        protected _document: Document;

        /**
         * @name _addEventType
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * The function used to add the proper event based on the input type.
         * 
         * @returns {void}
         */
        protected _addEventType: () => void;

        /**
         * @name _getter
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * The function used to get the bound value.
         * 
         * @returns {any} The bound value.
         */
        protected _getter: () => any;

        /**
         * @name _setter
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * The function used to set the bound value.
         * 
         * @returns {void}
         */
        protected _setter: (newValue: any, oldValue?: any, firstTime?: boolean) => void;

        /**
         * @name _expression
         * @memberof plat.controls.Bind
         * @kind property
         * @access protected
         * 
         * @type {plat.expressions.IParsedExpression}
         * 
         * @description
         * The expression to evaluate as the bound value.
         */
        protected _expression: expressions.IParsedExpression;

        /**
         * @name _contextExpression
         * @memberof plat.controls.Bind
         * @kind property
         * @access protected
         * 
         * @type {plat.expressions.IParsedExpression}
         * 
         * @description
         * The IParsedExpression used to evaluate the context 
         * of the bound property.
         */
        protected _contextExpression: expressions.IParsedExpression;

        /**
         * @name _property
         * @memberof plat.controls.Bind
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The bound property name.
         */
        protected _property: string;

        /**
         * @name _supportsTwoWayBinding
         * @memberof plat.controls.Bind
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not {@link plat.controls.Bind|Bind} is being used in conjunction 
         * with a {@link plat.ui.TemplateControl|TemplateControl} that implements the 
         * interface {@link plat.observable.ISupportTwoWayBinding|ISupportTwoWayBinding}.
         */
        protected _supportsTwoWayBinding: boolean = false;

        /**
         * @name __fileSupported
         * @memberof plat.controls.Bind
         * @kind property
         * @access private
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the File API is supported.
         */
        private __fileSupported: boolean = (<Compat>acquire(__Compat)).fileSupported;

        /**
         * @name __fileNameRegex
         * @memberof plat.controls.Bind
         * @kind property
         * @access private
         * 
         * @type {RegExp}
         * 
         * @description
         * Used to grab a filename from input[type="file"].
         */
        private __fileNameRegex: RegExp = (<expressions.Regex>acquire(__Regex)).fileNameRegex;

        /**
         * @name __isSelf
         * @memberof plat.controls.Bind
         * @kind property
         * @access private
         * 
         * @type {boolean}
         * 
         * @description
         * Used to denote that a property change happened from within this control.
         */
        private __isSelf: boolean = false;

        /**
         * @name initialize
         * @memberof plat.controls.Bind
         * @kind function
         * @access public
         * 
         * @description
         * Determines the type of Element being bound to 
         * and sets the necessary handlers.
         * 
         * @returns {void}
         */
        initialize(): void {
            this._determineType();
        }

        /**
         * @name loaded
         * @memberof plat.controls.Bind
         * @kind function
         * @access public
         * 
         * @description
         * Parses and watches the expression being bound to.
         * 
         * @returns {void}
         */
        loaded(): void {
            var parent = this.parent;
            if (isNull(parent) || isNull(this.element)) {
                return;
            }

            var attr = camelCase(this.type),
                _parser = this._parser,
                expression = this._expression = _parser.parse(this.attributes[attr]);

            var identifiers = expression.identifiers;

            if (identifiers.length !== 1) {
                this._log.warn('Only 1 identifier allowed in a ' + this.type + ' expression');
                this._contextExpression = null;
                return;
            }

            var split = identifiers[0].split('.');
            this._property = split.pop();

            if (expression.aliases.length > 0) {
                var alias = expression.aliases[0],
                    resourceObj = parent.findResource(alias),
                    type: string;

                if (isObject(resourceObj)) {
                    type = resourceObj.resource.type;

                    if (type !== __OBSERVABLE_RESOURCE && type !== __LITERAL_RESOURCE) {
                        return;
                    }
                } else {
                    resourceObj = <any>{ resource: {} };
                }

                if (alias === __CONTEXT_RESOURCE || alias === __ROOT_CONTEXT_RESOURCE) {
                    this._contextExpression = _parser.parse(split.join('.'));
                } else {
                    this._property = 'value';

                    this._contextExpression = {
                        evaluate: (): ui.IResource => {
                            return resourceObj.resource;
                        },
                        aliases: [],
                        identifiers: [],
                        expression: ''
                    };
                }
            } else if (split.length > 0) {
                this._contextExpression = _parser.parse(split.join('.'));
            } else {
                this._contextExpression = {
                    evaluate: (): any => {
                        return parent.context;
                    },
                    aliases: [],
                    identifiers: [],
                    expression: ''
                };
            }

            if (this._supportsTwoWayBinding) {
                (<ui.BindControl>this.templateControl).observeProperties(this);
            }

            this._watchExpression();

            if (isNull(this._addEventType)) {
                return;
            }

            this._addEventType();
        }

        /**
         * @name contextChanged
         * @memberof plat.controls.Bind
         * @kind function
         * @access public
         * 
         * @description
         * Re-observes the expression with the new context.
         * 
         * @returns {void}
         */
        contextChanged(): void {
            this._watchExpression();
        }

        /**
         * @name dispose
         * @memberof plat.controls.Bind
         * @kind function
         * @access public
         * 
         * @description
         * Removes all of the element's event listeners.
         * 
         * @returns {void}
         */
        dispose(): void {
            this._addEventType = null;
        }

        /**
         * @name evaluate
         * @memberof plat.controls.Bind
         * @kind function
         * @access public
         * 
         * @description
         * Gets the current value of the bound property.
         * 
         * @returns {any} The current value of the bound property.
         */
        evaluate(): any {
            var expression = this._expression;
            if (isUndefined(expression)) {
                return;
            }

            return this.evaluateExpression(expression);
        }

        /**
         * @name observeProperty
         * @memberof plat.controls.Bind
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * The function that allows a control implementing {@link plat.observable.ISupportTwoWayBinding|ISupportTwoWayBinding} to observe 
         * changes to the bound property and/or its child properties.
         * 
         * @typeparam {any} T The type of item being observed.
         * 
         * @param {plat.observable.IBoundPropertyChangedListener<T>} listener The listener to fire when the bound property or its 
         * specified child changes.
         * @param {string} identifier? The identifier of the child property of the bound item.
         * 
         * @returns {void}
         */
        observeProperty<T>(listener: observable.IBoundPropertyChangedListener<T>, identifier?: string): IRemoveListener;
        /**
         * @name observeProperty
         * @memberof plat.controls.Bind
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * The function that allows a control implementing {@link plat.observable.ISupportTwoWayBinding|ISupportTwoWayBinding} to observe 
         * changes to the bound property and/or its child properties.
         * 
         * @typeparam {any} T The type of item being observed.
         * 
         * @param {plat.observable.IBoundPropertyChangedListener<T>} listener The listener to fire when the bound property or its 
         * specified child changes.
         * @param {number} index? The index of the child property of the bound item if the bound item is an Array.
         * 
         * @returns {plat.IRemoveListener} A listener for removing the function.
         */
        observeProperty<T>(listener: observable.IBoundPropertyChangedListener<T>, index?: number): IRemoveListener;
        /**
         * @name observeProperty
         * @memberof plat.observable.IImplementTwoWayBinding
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * A function that allows a {@link plat.observable.ISupportTwoWayBinding|ISupportTwoWayBinding} to observe both the 
         * bound property itself as well as potential child properties if being bound to an object.
         * 
         * @typeparam {any} T The type of items in the Array if listening for Array mutations. 
         * 
         * @param {(changes: Array<plat.observable.IArrayChanges<T>>, identifier: string) => void} listener The listener function.
         * @param {string} identifier? The identifier off of the bound object to listen to for changes. If undefined or empty  
         * the listener will listen for changes to the bound item itself.
         * @param {boolean} arrayMutationsOnly? Whether or not to listen only for Array mutation changes.
         * 
         * @returns {plat.IRemoveListener} A function to stop listening for changes.
         */
        observeProperty<T>(listener: (changes: Array<observable.IArrayChanges<T>>, identifier: string) => void,
            identifier?: string, arrayMutationsOnly?: boolean): IRemoveListener;
        /**
         * @name observeProperty
         * @memberof plat.observable.IImplementTwoWayBinding
         * @kind function
         * @access public
         * @variation 3
         * 
         * @description
         * A function that allows a {@link plat.observable.ISupportTwoWayBinding|ISupportTwoWayBinding} to observe both the 
         * bound property itself as well as potential child properties if being bound to an object.
         * 
         * @typeparam {any} T The type of items in the Array if listening for Array mutations. 
         * 
         * @param {(changes: Array<plat.observable.IArrayChanges<T>>, identifier: number) => void} listener The listener function.
         * @param {number} index? The index off of the bound object to listen to for changes if the bound object is an Array. 
         * If undefined or empty the listener will listen for changes to the bound Array itself.
         * @param {boolean} arrayMutationsOnly? Whether or not to listen only for Array mutation changes.
         * 
         * @returns {plat.IRemoveListener} A function to stop listening for changes.
         */
        observeProperty<T>(listener: (changes: Array<observable.IArrayChanges<T>>, identifier: number) => void,
            index?: number, arrayMutationsOnly?: boolean): IRemoveListener;
        observeProperty(listener: any, identifier?: any, arrayMutationsOnly?: boolean): IRemoveListener {
            var parsedIdentifier: string;
            if (isEmpty(identifier)) {
                parsedIdentifier = this._expression.expression;
            } else if (isNumber(identifier)) {
                parsedIdentifier = this._expression.expression + '.' + identifier;
            } else {
                var _parser = this._parser,
                    identifierExpression = _parser.parse(identifier),
                    identifiers = identifierExpression.identifiers;

                if (identifiers.length !== 1) {
                    this._log.warn('Only 1 identifier path allowed when observing changes to a bound property\'s child with a control ' +
                        'implementing ISupportTwoWayBinding and working with ' + this.type);
                    return;
                }

                var expression = _parser.parse(this._expression.expression + '.' + identifiers[0]);

                parsedIdentifier = expression.identifiers[0];

                var split = parsedIdentifier.split('.'),
                    key = split.pop(),
                    contextExpression = split.join('.'),
                    context = this.evaluateExpression(contextExpression);

                if (!isObject(context)) {
                    if (isNull(context)) {
                        context = this._ContextManager.createContext(this.parent, contextExpression);
                    } else {
                        this._log.warn('A control implementing ISupportTwoWayBinding is trying to index into a primitive type ' +
                            'when trying to evaluate ' + this.type + '="' + this._expression.expression + '"');
                        return;
                    }
                }
            }

            listener = listener.bind(this.templateControl);

            var removeListener: IRemoveListener;
            if (arrayMutationsOnly === true) {
                removeListener = this.observeArray((changes: Array<observable.IArrayChanges<any>>): void => {
                    listener(changes, identifier);
                }, parsedIdentifier);
            } else {
                removeListener = this.observe((newValue: any, oldValue: any): void => {
                    if (this.__isSelf || newValue === oldValue) {
                        return;
                    }

                    listener(newValue, oldValue, identifier);
                }, parsedIdentifier);
            }

            listener(this.evaluateExpression(parsedIdentifier), undefined, identifier, true);
            return removeListener;
        }

        /**
         * @name _addTextEventListener
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Adds a text event as the event listener. 
         * Used for textarea and input[type="text"].
         * 
         * @returns {void}
         */
        protected _addTextEventListener(): void {
            var element = this.element,
                _compat = this._compat,
                composing = false,
                input = 'input',
                timeout: IRemoveListener,
                eventListener = (): void => {
                    if (composing) {
                        return;
                    }

                    this._propertyChanged();
                },
                postponedEventListener = (): void => {
                    if (isFunction(timeout)) {
                        return;
                    }

                    timeout = postpone((): void => {
                        eventListener();
                        timeout = null;
                    });
                };

            if (isUndefined(_compat.ANDROID)) {
                this.addEventListener(element, 'compositionstart', (): void => { composing = true; }, false);
                this.addEventListener(element, 'compositionend', (): void => {
                    composing = false;
                    eventListener();
                }, false);
            }

            if (_compat.hasEvent(input)) {
                this.addEventListener(element, input, eventListener, false);
            } else {
                this.addEventListener(element, 'keydown', (ev: KeyboardEvent): void => {
                    var key = ev.keyCode || ev.which,
                        codes = KeyCodes;

                    if (key === codes.lwk ||
                        key === codes.rwk ||
                        (key >= codes.shift && key <= codes.escape) ||
                        (key > codes.space && key <= codes.down)) {
                        return;
                    }

                    postponedEventListener();
                }, false);
                this.addEventListener(element, 'cut', postponedEventListener, false);
                this.addEventListener(element, 'paste', postponedEventListener, false);
            }

            this.addEventListener(element, 'change', eventListener, false);
        }

        /**
         * @name _addChangeEventListener
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Adds a change event as the event listener. 
         * Used for select, input[type="radio"], and input[type="range"].
         * 
         * @returns {void}
         */
        protected _addChangeEventListener(): void {
            this.addEventListener(this.element, 'change', this._propertyChanged, false);
        }

        /**
         * @name _addButtonEventListener
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Adds a $tap event as the event listener. 
         * Used for input[type="button"] and button.
         * 
         * @returns {void}
         */
        protected _addButtonEventListener(): void {
            this.addEventListener(this.element, __tap, this._propertyChanged, false);
        }

        /**
         * @name _getChecked
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Getter for input[type="checkbox"] and input[type="radio"].
         * 
         * @returns {boolean} Whether or not the input element is checked.
         */
        protected _getChecked(): boolean {
            return (<HTMLInputElement>this.element).checked;
        }

        /**
         * @name _getValue
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Getter for input[type="text"], input[type="range"], 
         * textarea, and select.
         * 
         * @returns {string} The input value.
         */
        protected _getValue(): string {
            return (<HTMLInputElement>this.element).value;
        }

        /**
         * @name _getTextContent
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Getter for button.
         * 
         * @returns {string} The button textContent.
         */
        protected _getTextContent(): string {
            return (<HTMLInputElement>this.element).textContent;
        }

        /**
         * @name _getFile
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Getter for input[type="file"]. Creates a partial IFile 
         * element if file is not supported.
         * 
         * @returns {plat.controls.IFile} The input file.
         */
        protected _getFile(): IFile {
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
                slice: (): Blob => <Blob>{ }
            };
        }

        /**
         * @name _getFiles
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Getter for input[type="file"]-multiple.
         * 
         * @returns {Array<plat.controls.IFile>} The input files.
         */
        protected _getFiles(): Array<IFile> {
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
                    slice: (): Blob => <Blob>{}
                });
            }

            return files;
        }

        /**
         * @name _getSelectedValues
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Getter for select-multiple.
         * 
         * @returns {Array<string>} The selected values.
         */
        protected _getSelectedValues(): Array<string> {
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
         * @name _setText
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Setter for textarea, input[type="text"], 
         * and input[type="button"], and select.
         * 
         * @param {any} newValue The new value to set
         * @param {any} oldValue The previously bound value
         * @param {boolean} firstTime? The context is being evaluated for the first time and 
         * should thus change the property if null
         * 
         * @returns {void}
         */
        protected _setText(newValue: any, oldValue: any, firstTime?: boolean): void {
            if (this.__isSelf) {
                return;
            }

            if (isNull(newValue)) {
                newValue = '';

                if (firstTime === true) {
                    if (isNull((<HTMLInputElement>this.element).value)) {
                        this._setValue(newValue);
                    }
                    this._propertyChanged();
                    return;
                }
            }

            this._setValue(newValue);
        }

        /**
         * @name _setRange
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Setter for input[type="range"].
         * 
         * @param {any} newValue The new value to set
         * @param {any} oldValue The previously bound value
         * @param {boolean} firstTime? The context is being evaluated for the first time and 
         * should thus change the property if null
         * 
         * @returns {void}
         */
        protected _setRange(newValue: any, oldValue: any, firstTime?: boolean): void {
            if (this.__isSelf) {
                return;
            }

            if (isEmpty(newValue)) {
                newValue = 0;

                if (firstTime === true) {
                    if (isEmpty((<HTMLInputElement>this.element).value)) {
                        this._setValue(newValue);
                    }
                    this._propertyChanged();
                    return;
                }
            }

            this._setValue(newValue);
        }

        /**
         * @name _setHidden
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Setter for input[type="hidden"].
         * 
         * @param {any} newValue The new value to set
         * @param {any} oldValue The previously bound value
         * @param {boolean} firstTime? The context is being evaluated for the first time and 
         * should thus change the property if null
         * 
         * @returns {void}
         */
        protected _setHidden(newValue: any, oldValue: any, firstTime?: boolean): void {
            if (this.__isSelf) {
                return;
            }

            if (isEmpty(newValue)) {
                newValue = '';

                if (firstTime === true) {
                    if (isEmpty((<HTMLInputElement>this.element).value)) {
                        this._setValue(newValue);
                    }
                    this._propertyChanged();
                    return;
                }
            }

            this._setValue(newValue);
        }

        /**
         * @name _setValue
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the value on an element.
         * 
         * @param {any} newValue The new value to set
         * 
         * @returns {void}
         */
        protected _setValue(newValue: any): void {
            var element = <HTMLInputElement>this.element;
            if (element.value === newValue) {
                return;
            }

            element.value = newValue;
        }

        /**
         * @name _setChecked
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Setter for input[type="checkbox"]
         * 
         * @param {any} newValue The new value to set
         * @param {any} oldValue The previously bound value
         * @param {boolean} firstTime? The context is being evaluated for the first time and 
         * should thus change the property if null
         * 
         * @returns {void}
         */
        protected _setChecked(newValue: any, oldValue: any, firstTime?: boolean): void {
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
         * @name _setRadio
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Setter for input[type="radio"]
         * 
         * @param {any} newValue The new value to set
         * 
         * @returns {void}
         */
        protected _setRadio(newValue: any): void {
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
         * @name _setSelectedIndex
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Setter for select
         * 
         * @param {any} newValue The new value to set
         * @param {any} oldValue The previously bound value
         * @param {boolean} firstTime? The context is being evaluated for the first time and 
         * should thus change the property if null
         * 
         * @returns {void}
         */
        protected _setSelectedIndex(newValue: any, oldValue: any, firstTime?: boolean): void {
            if (this.__isSelf) {
                return;
            }

            var element = <HTMLSelectElement>this.element,
                value = element.value;
            if (isNull(newValue)) {
                if (firstTime === true || !this._document.body.contains(element)) {
                    this._propertyChanged();
                    return;
                }
                element.selectedIndex = -1;
                return;
            } else if (!isString(newValue)) {
                var message: string;
                if (isNumber(newValue)) {
                    newValue = newValue.toString();
                    message = 'Trying to bind a value of type number to a <select> element. ' +
                        'The value will implicitly be converted to type string.';
                } else {
                    message = 'Trying to bind a value that is not a string to a <select> element. ' +
                        'The element\'s selected index will be set to -1.';
                }

                this._log.info(message);
            } else if (value === newValue) {
                return;
            } else if (!this._document.body.contains(element)) {
                element.value = newValue;
                if (element.value !== newValue) {
                    element.value = value;
                    this._propertyChanged();
                }
                return;
            }

            element.value = newValue;
            // check to make sure the user changed to a valid value
            // second boolean argument is an ie fix for inconsistency
            if (element.value !== newValue || element.selectedIndex === -1) {
                element.selectedIndex = -1;
            }
        }

        /**
         * @name _setSelectedIndices
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Setter for select-multiple
         * 
         * @param {any} newValue The new value to set
         * @param {any} oldValue The previously bound value
         * @param {boolean} firstTime? The context is being evaluated for the first time and 
         * should thus change the property if null
         * 
         * @returns {void}
         */
        protected _setSelectedIndices(newValue: any, oldValue: any, firstTime?: boolean): void {
            if (this.__isSelf) {
                return;
            }

            var options = (<HTMLSelectElement>this.element).options,
                length = isNull(options) ? 0 : options.length,
                option: HTMLOptionElement,
                nullValue = isNull(newValue);

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
         * @name _determineType
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Determines the type of Element being bound to 
         * and sets the necessary handlers.
         * 
         * @returns {void}
         */
        protected _determineType(): void {
            if (this._observingBindableProperty()) {
                return;
            }

            var element = this.element;
            if (isNull(element)) {
                return;
            }

            switch (element.nodeName.toLowerCase()) {
                case 'input':
                    switch ((<HTMLInputElement>element).type) {
                        case 'button':
                        case 'submit':
                        case 'reset':
                        case 'image':
                            this._addEventType = this._addButtonEventListener;
                            this._getter = this._getValue;
                            break;
                        case 'checkbox':
                            this._addEventType = this._addChangeEventListener;
                            this._getter = this._getChecked;
                            this._setter = this._setChecked;
                            break;
                        case 'radio':
                            this._initializeRadio();
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
                        case 'hidden':
                            this._getter = this._getValue;
                            this._setter = this._setHidden;
                            break;
                        default:
                            this._addEventType = this._addTextEventListener;
                            this._getter = this._getValue;
                            this._setter = this._setText;
                            break;
                    }
                    break;
                case 'textarea':
                    this._addEventType = this._addTextEventListener;
                    this._getter = this._getValue;
                    this._setter = this._setText;
                    break;
                case 'select':
                    this._initializeSelect();
                    break;
                case 'button':
                    this._addEventType = this._addButtonEventListener;
                    this._getter = this._getTextContent;
                    break;
            }
        }

        /**
         * @name _watchExpression
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Observes the expression to bind to.
         * 
         * @returns {void}
         */
        protected _watchExpression(): void {
            var contextExpression = this._contextExpression,
                context = this.evaluateExpression(contextExpression);

            if (!isObject(context)) {
                if (isNull(context) && contextExpression.identifiers.length > 0) {
                    context = this._createContext(contextExpression.identifiers[0]);
                } else {
                    this._log.warn(this.type + ' is trying to index into a primitive type. ' +
                        this._contextExpression.expression + ' is already defined and not ' +
                        'an object when trying to evaluate ' + this.type + '="' +
                        this._expression.expression + '"');
                    return;
                }
            }

            var property: string;
            if (!isFunction(this._setter)) {
                return;
            } else if (this._setter === this._setSelectedIndices) {
                property = this._property;
                if (isNull(context[property])) {
                    context[property] = [];
                }
                this.observeArray((arrayInfo: Array<observable.IArrayChanges<string>>): void => {
                    this._setter(arrayInfo[0].object, null, true);
                }, contextExpression + '.' + property);
            }

            var expression = this._expression;
            this.observeExpression((newValue: any, oldValue: any): void => {
                this._setter(newValue, oldValue);
            }, expression);
            this._setter(this.evaluateExpression(expression), undefined, true);
        }

        /**
         * @name _createContext
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Handles creating context with an identifier.
         * 
         * @returns {any}
         */
        protected _createContext(identifier: string): any {
            var split = identifier.split('.'),
                start = split.shift().slice(1),
                parent = this.parent;

            if (start === __ROOT_CONTEXT_RESOURCE) {
                identifier = split.join('.');
                parent = this.parent.root;
            } else if (start === __CONTEXT) {
                identifier = split.join('.');
            }

            return this._ContextManager.createContext(parent, identifier);
        }

        /**
         * @name _propertyChanged
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the context property being bound to when the 
         * element's property is changed.
         * 
         * @returns {void}
         */
        protected _propertyChanged(): void {
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

        /**
         * @name _initializeRadio
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Normalizes input[type="radio"] for cross-browser compatibility.
         * 
         * @returns {void}
         */
        protected _initializeRadio(): void {
            var element = this.element;

            this._addEventType = this._addChangeEventListener;
            this._getter = this._getValue;
            this._setter = this._setRadio;

            if (!element.hasAttribute('name')) {
                var attr = camelCase(this.type),
                    expression = this.attributes[attr];

                element.setAttribute('name', expression);
            }

            if (element.hasAttribute('value')) {
                return;
            }

            element.setAttribute('value', '');
        }

        /**
         * @name _initializeSelect
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Normalizes HTMLSelectElements for cross-browser compatibility.
         * 
         * @returns {void}
         */
        protected _initializeSelect(): void {
            var element = <HTMLSelectElement>this.element,
                multiple = element.multiple,
                options = element.options,
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

        /**
         * @name _observingBindableProperty
         * @memberof plat.controls.Bind
         * @kind function
         * @access protected
         * 
         * @description
         * Checks if the associated {@link plat.ui.TemplateControl|TemplateControl} is implementing 
         * {@link plat.observable.ISupportTwoWayBinding|ISupportTwoWayBinding} and initializes all listeners accordingly.
         * 
         * @returns {boolean} Whether or not the associated {@link plat.ui.TemplateControl|TemplateControl} 
         * is implementing {@link plat.observable.ISupportTwoWayBinding|ISupportTwoWayBinding}.
         */
        protected _observingBindableProperty(): boolean {
            var templateControl = <ui.BindControl>this.templateControl;

            if (!isNull(templateControl) && isFunction(templateControl.onInput) && isFunction(templateControl.observeProperties)) {
                templateControl.onInput((newValue: any): void => {
                    this._getter = (): any => newValue;
                    this._propertyChanged();
                });

                return (this._supportsTwoWayBinding = true);
            }

            return false;
        }
    }

    register.control(__Bind, Bind);

    /**
     * @name IFile
     * @memberof plat.controls
     * @kind interface
     * 
     * @extends {File}
     * 
     * @description
     * A file interface for browsers that do not support the 
     * File API.
     */
    export interface IFile extends File {
        /**
         * @name string
         * @memberof plat.controls.IFile
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {string}
         * 
         * @description
         * An absolute path to the file. The property is not added to 
         * File types.
         */
        path?: string;
    }
}
