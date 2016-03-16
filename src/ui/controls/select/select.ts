module plat.ui.controls {
    'use strict';

    /**
     * @name Select
     * @memberof plat.ui.controls
     * @kind class
     *
     * @extends {plat.ui.BindControl}
     *
     * @description
     * A {@link plat.ui.BindControl|BindControl} for binding an HTML select element
     * to an Array context.
     */
    export class Select extends BindControl {
        protected static _inject: any = {
            _Promise: __Promise,
            _document: __Document
        };

        /**
         * @name replaceWith
         * @memberof plat.ui.controls.Select
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * Replaces the `<plat-select>` node with
         * a <select> node.
         */
        replaceWith: string = 'select';

        /**
         * @name element
         * @memberof plat.ui.controls.Select
         * @kind property
         * @access public
         *
         * @type {HTMLSelectElement}
         *
         * @description
         * Specifies the element as being an HTMLSelectElement.
         */
        element: HTMLSelectElement;

        /**
         * @name priority
         * @memberof plat.ui.controls.Select
         * @kind property
         * @access public
         *
         * @type {number}
         *
         * @description
         * The load priority of the control (needs to load before a {@link plat.controls.Bind|Bind} control).
         */
        priority: number = 120;

        /**
         * @name context
         * @memberof plat.ui.controls.Select
         * @kind property
         * @access public
         *
         * @type {Array<any>}
         *
         * @description
         * The required context of the control (must be of type Array).
         */
        context: Array<any>;

        /**
         * @name controls
         * @memberof plat.ui.controls.Select
         * @kind property
         * @access public
         *
         * @type {Array<plat.ui.TemplateControl>}
         *
         * @description
         * The child controls of the control. All will be of type {@link plat.ui.TemplateControl|TemplateControl}.
         */
        controls: Array<TemplateControl>;

        /**
         * @name groups
         * @memberof plat.ui.controls.Select
         * @kind property
         * @access public
         *
         * @type {plat.IObject<Element>}
         *
         * @description
         * An object that keeps track of unique
         * optgroups.
         */
        groups: IObject<Element> = {};

        /**
         * @name options
         * @memberof plat.ui.controls.Select
         * @kind property
         * @access public
         *
         * @type {plat.observable.IObservableProperty<plat.ui.controls.ISelectOptions>}
         *
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: observable.IObservableProperty<ISelectOptions>;

        /**
         * @name itemsLoaded
         * @memberof plat.ui.controls.Select
         * @kind property
         * @access public
         *
         * @type {plat.async.IThenable<void>}
         *
         * @description
         * A Promise that will fulfill whenever all items are loaded.
         */
        itemsLoaded: async.IThenable<void>;

        /**
         * @name _Promise
         * @memberof plat.ui.controls.Select
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
         * @memberof plat.ui.controls.Select
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
         * @name _isGrouped
         * @memberof plat.ui.controls.Select
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * Whether or not the select is grouped.
         */
        protected _isGrouped: boolean;

        /**
         * @name _group
         * @memberof plat.ui.controls.Select
         * @kind property
         * @access protected
         *
         * @type {string}
         *
         * @description
         * The property used to group the objects.
         */
        protected _group: string;

        /**
         * @name _defaultOption
         * @memberof plat.ui.controls.Select
         * @kind property
         * @access protected
         *
         * @type {HTMLOptionElement}
         *
         * @description
         * An optional default option specified in the control element's
         * innerHTML.
         */
        protected _defaultOption: HTMLOptionElement;

        /**
         * @name _binder
         * @memberof plat.ui.controls.Select
         * @kind property
         * @access protected
         *
         * @type {plat.observable.IImplementTwoWayBinding}
         *
         * @description
         * The complementary control implementing two way databinding.
         */
        protected _binder: observable.IImplementTwoWayBinding;

        /**
         * @name _propertyType
         * @memberof plat.ui.controls.Select
         * @kind property
         * @access protected
         *
         * @type {string}
         *
         * @description
         * The initial type of the bound property if defined.
         */
        protected _propertyType: string;

        /**
         * @name __listenerSet
         * @memberof plat.ui.controls.Select
         * @kind property
         * @access private
         *
         * @type {boolean}
         *
         * @description
         * Whether or not the Array listener has been set.
         */
        private __listenerSet: boolean;

        /**
         * @name __resolveFn
         * @memberof plat.ui.controls.Select
         * @kind property
         * @access private
         *
         * @type {() => void}
         *
         * @description
         * The function to resolve the itemsLoaded promise.
         */
        private __resolveFn: () => void;

        /**
         * @name __rejectFn
         * @memberof plat.ui.controls.Select
         * @kind property
         * @access private
         *
         * @type {() => void}
         *
         * @description
         * The reject function for the itemsLoaded Promise.
         */
        private __rejectFn: () => void;

        /**
         * @name constructor
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access public
         *
         * @description
         * The constructor for a {@link plat.ui.controls.Select|Select}. Creates the itemsLoaded promise.
         *
         * @returns {plat.ui.controls.Select} A {@link plat.ui.controls.Select|Select} instance.
         */
        constructor() {
            super();
            this.itemsLoaded = new this._Promise<void>((resolve, reject): void => {
                this.__resolveFn = resolve;
                this.__rejectFn = reject;
            }).catch(noop);
        }

        /**
         * @name setTemplate
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access public
         *
         * @description
         * Creates the bindable option template and grouping
         * template if necessary.
         *
         * @returns {void}
         */
        setTemplate(): void {
            this.bindableTemplates.add('option', this.element.childNodes);

            let options = this.options || <observable.IObservableProperty<ISelectOptions>>{},
                platOptions = options.value || <ISelectOptions>{},
                defaultOptionValues = platOptions.default;

            if (isObject(defaultOptionValues)) {
                let defaultOption: HTMLOptionElement = this._document.createElement('option'),
                    defaultValue = defaultOptionValues.value,
                    defaultTextContent = defaultOptionValues.textContent;

                defaultOption.value = isUndefined(defaultValue) ? defaultTextContent : defaultValue;
                defaultOption.textContent = isUndefined(defaultTextContent) ? defaultValue : defaultTextContent;
                this.element.insertBefore(defaultOption, null);
            }

            if (!isNull(platOptions.group)) {
                let group = this._group = platOptions.group,
                    optionGroup = this._document.createElement('optgroup');

                optionGroup.label = __startSymbol + group + __endSymbol;

                this.bindableTemplates.add('group', optionGroup);
                this._isGrouped = true;
            } else {
                this._isGrouped = false;
            }
        }

        /**
         * @name contextChanged
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access public
         *
         * @description
         * Re-observes the new array context and modifies
         * the options accordingly.
         *
         * @param {Array<any>} newValue The new array context.
         * @param {Array<any>} oldValue The old array context.
         *
         * @returns {void}
         */
        contextChanged(newValue: Array<any>, oldValue: Array<any>): void {
            if (isEmpty(newValue)) {
                if (!isEmpty(oldValue)) {
                    this.itemsLoaded.then((): void => {
                        this._removeItems(this.controls.length);
                    });
                }
                return;
            } else if (!isArray(newValue)) {
                return;
            }

            let newLength = isArray(newValue) ? newValue.length : 0,
                oldLength = isArray(oldValue) ? oldValue.length : 0;

            this._setListener();

            if (newLength > oldLength) {
                this._addItems(newLength - oldLength, oldLength);
            } else if (newLength < oldLength) {
                this._removeItems(oldLength - newLength);
            }
        }

        /**
         * @name loaded
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access public
         *
         * @description
         * Observes the new array context and adds
         * the options accordingly.
         *
         * @returns {void}
         */
        loaded(): void {
            if (isUndefined(this._isGrouped)) {
                let options = this.options || <observable.IObservableProperty<ISelectOptions>>{},
                    platOptions = options.value || <ISelectOptions>{};

                this._isGrouped = !isNull((this._group = platOptions.group));
            }

            this._defaultOption = <HTMLOptionElement>this.element.firstElementChild;

            let context = this.context;
            if (!isArray(context)) {
                return;
            }

            this._addItems(context.length, 0);
            this._setListener();
        }

        /**
         * @name dispose
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access public
         *
         * @description
         * Removes any potentially held memory.
         *
         * @returns {void}
         */
        dispose(): void {
            super.dispose();

            if (this.utils.isFunction(this.__rejectFn)) {
                this.__rejectFn();
                this.__resolveFn = this.__rejectFn = null;
            }

            this._defaultOption = null;
        }

        /**
         * @name observeProperties
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access public
         * @virtual
         *
         * @description
         * A function that allows this control to observe both the bound property itself as well as
         * potential child properties if being bound to an object.
         *
         * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
         * databinding.
         *
         * @returns {void}
         */
        observeProperties(binder: observable.IImplementTwoWayBinding): void {
            let element = this.element;

            this._binder = binder;

            if (element.multiple) {
                if (isNull(binder.evaluate())) {
                    this.inputChanged([]);
                }

                binder.observeProperty(this._setSelectedIndices);
                binder.observeArrayChange((): void => {
                    this._setSelectedIndices(binder.evaluate(), null, null);
                });
            } else {
                binder.observeProperty(this._setSelectedIndex);
            }

            this.addEventListener(element, 'change', this._observeChange, false);
        }

        /**
         * @name _setSelectedIndex
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access protected
         *
         * @description
         * Updates the selected index if bound to a property.
         *
         * @param {string} newValue The new value of the bound property.
         * @param {string} oldValue The old value of the bound property.
         * @param {string} identifier The child identifier of the bound property.
         * @param {boolean} firstTime? Whether or not this is the first time being called as a setter.
         *
         * @returns {void}
         */
        protected _setSelectedIndex(newValue: string, oldValue: string, identifier: string, firstTime?: boolean): void {
            let element = this.element,
                value = element.value;

            if (isNull(newValue)) {
                if (firstTime === true || !this._document.body.contains(element)) {
                    this.itemsLoaded.then((): void => {
                        if (isNull(this._binder.evaluate())) {
                            this.inputChanged(element.value);
                        }
                    });
                    return;
                }
                element.selectedIndex = -1;
                return;
            } else if (!isString(newValue)) {
                if (isNumber(newValue)) {
                    this._propertyType = 'number';
                    newValue = newValue.toString();
                } else if (isBoolean(newValue)) {
                    this._propertyType = 'boolean';
                    newValue = newValue.toString();
                } else {
                    if (isFunction(newValue.toString)) {
                        newValue = newValue.toString();
                    } else {
                        newValue = Object.prototype.toString.call(newValue);
                    }

                    this._log.info('Trying to bind the invalid value "' + newValue + '" to a ' + this.type + '.');
                }
            }

            if (value === newValue) {
                return;
            }

            this.itemsLoaded.then((): void => {
                if (!this._document.body.contains(element)) {
                    element.value = newValue;
                    if (element.value !== newValue) {
                        element.value = value;
                        this.inputChanged(this._castValue(element.value));
                    }
                    return;
                }

                element.value = newValue;
                // check to make sure the user changed to a valid value
                // second boolean argument is an ie fix for inconsistency
                if (element.value !== newValue || element.selectedIndex === -1) {
                    element.selectedIndex = -1;
                }
            });
        }

        /**
         * @name _setSelectedIndices
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access protected
         *
         * @description
         * Updates the selected index if bound to a property.
         *
         * @param {Array<any>} newValue The new value Array of the bound property.
         * @param {Array<any>} oldValue The old value Array of the bound property.
         * @param {string} identifier The child identifier of the bound property.
         * @param {boolean} firstTime? Whether or not this is the first time being called as a setter.
         *
         * @returns {void}
         */
        protected _setSelectedIndices(newValue: Array<any>, oldValue: Array<any>, identifier: string, firstTime?: boolean): void {
            this.itemsLoaded.then((): void => {
                let element = this.element,
                    options = element.options,
                    length = isNull(options) ? 0 : options.length,
                    option: HTMLOptionElement,
                    nullValue = isNull(newValue);

                if (nullValue || !isArray(newValue)) {
                    if (firstTime === true && isNull(this._binder.evaluate())) {
                        this.inputChanged(this._getSelectedValues());
                    }
                    // unselects the options unless a match is found
                    while (length-- > 0) {
                        option = <HTMLOptionElement>options[length];
                        if (!nullValue && option.value === '' + newValue) {
                            option.selected = true;
                            return;
                        }

                        option.selected = false;
                    }
                    return;
                }

                let value: any,
                    numberValue: number,
                    index: number,
                    highestIndex = Infinity;

                while (length-- > 0) {
                    option = <HTMLOptionElement>options[length];
                    value = option.value;

                    if (newValue.indexOf(value) !== -1) {
                        option.selected = true;
                        continue;
                    }

                    numberValue = Number(value);
                    if (isNumber(numberValue) && (index = newValue.indexOf(numberValue)) !== -1) {
                        if (index < highestIndex) {
                            this._propertyType = 'number';
                            highestIndex = index;
                        }
                        option.selected = true;
                        continue;
                    } else if ((value === 'true' && (index = newValue.indexOf(true)) !== -1) ||
                        value === 'false' && (index = newValue.indexOf(false)) !== -1) {
                        if (index < highestIndex) {
                            this._propertyType = 'boolean';
                            highestIndex = index;
                        }
                        option.selected = true;
                        continue;
                    }

                    option.selected = false;
                }
            });
        }

        /**
         * @name _observeChange
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access protected
         *
         * @description
         * Fires the inputChanged event when the select's value changes.
         *
         * @returns {void}
         */
        protected _observeChange(): void {
            let element = this.element;
            this.inputChanged(element.multiple ? this._getSelectedValues() : this._castValue(element.value));
        }

        /**
         * @name _getSelectedValues
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access protected
         *
         * @description
         * Getter for select-multiple.
         *
         * @returns {Array<string>} The selected values.
         */
        protected _getSelectedValues(): Array<string> {
            let options = this.element.options,
                length = options.length,
                option: HTMLOptionElement,
                selectedValues: Array<string> = [];

            for (let i = 0; i < length; ++i) {
                option = <HTMLOptionElement>options[i];
                if (option.selected) {
                    selectedValues.push(this._castValue(option.value));
                }
            }

            return selectedValues;
        }

        /**
         * @name _castValue
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access protected
         *
         * @description
         * Casts a value to the determined initial property type.
         *
         * @returns {Array<string>} The selected values.
         */
        protected _castValue(value: any): any {
            let type = this._propertyType;
            if (isNull(type)) {
                return value;
            }

            let castValue: any;
            switch (type) {
                case 'number':
                    castValue = isEmpty(value) ? undefined : Number(value);
                    break;
                case 'boolean':
                    switch (value) {
                        case 'true':
                            castValue = true;
                            break;
                        case 'false':
                        case '0':
                        case 'null':
                        case 'undefined':
                            castValue = false;
                            break;
                        default:
                            castValue = !!value;
                            break;
                    }
                    break;
                default:
                    castValue = value;
                    break;
            }

            return castValue;
        }

        /**
         * @name _setListener
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access protected
         *
         * @description
         * Sets a listener for the changes to the array.
         *
         * @returns {void}
         */
        protected _setListener(): void {
            if (!this.__listenerSet) {
                this.observeArray(this._executeEvent);
                this.__listenerSet = true;
            }
        }

        /**
         * @name _executeEvent
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access protected
         *
         * @description
         * Receives an event when a method has been called on an array and maps the array
         * method to its associated method handler.
         *
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
         *
         * @returns {void}
         */
        protected _executeEvent(changes: Array<observable.IArrayChanges<any>>): void {
            let method = '_' + changes[0].type;
            if (isFunction((<any>this)[method])) {
                (<any>this)[method](changes);
            }
        }

        /**
         * @name _addItems
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access protected
         *
         * @description
         * Adds the options to the select element.
         *
         * @param {number} numberOfItems The number of items to add.
         * @param {number} index The starting index of the next
         * set of items to add.
         *
         * @returns {plat.async.IThenable<void>} The itemsLoaded promise.
         */
        protected _addItems(numberOfItems: number, index: number): async.IThenable<void> {
            let bindableTemplates = this.bindableTemplates,
                promises: Array<async.IThenable<void>> = [],
                insertOption = this._insertOption;

            while (numberOfItems-- > 0) {
                promises.push(bindableTemplates.bind('option', index).then<void>(insertOption.bind(this, index++)));
            }

            if (promises.length > 0) {
                this.itemsLoaded = this._Promise.all(promises).then((): void => {
                    if (isFunction(this.__resolveFn)) {
                        this.__resolveFn();
                        this.__resolveFn = this.__rejectFn = null;
                    }
                    return;
                }).catch((error: any): void => {
                    postpone((): void => {
                        if (isString(error)) {
                            error = new Error(error);
                        }
                        this._log.error(error);
                    });
                });
            }

            return this.itemsLoaded;
        }

        /**
         * @name _insertOption
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access protected
         *
         * @description
         * The callback used to add an option after
         * its template has been bound.
         *
         * @param {number} index The current index of the item being added.
         * @param {DocumentFragment} option The bound DocumentFragment to be
         * inserted into the DOM.
         *
         * @returns {plat.async.IThenable<any>} A promise that resolves when the option
         * or optgroup has successfully be inserted.
         */
        protected _insertOption(index: number, option: DocumentFragment): async.IThenable<any> {
            let element = this.element;
            if (this._isGrouped) {
                let groups = this.groups,
                    newGroup = (this.context[index] || {})[this._group],
                    optgroup: any = groups[newGroup];

                if (isNull(optgroup)) {
                    return (groups[newGroup] = <any>this.bindableTemplates.bind('group', index)
                        .then((groupFragment: DocumentFragment): Element => {
                            optgroup = groups[newGroup] = <Element>groupFragment.childNodes[1];

                            optgroup.insertBefore(option, null);
                            element.insertBefore(groupFragment, null);
                            return optgroup;
                        }));
                } else if (isPromise(optgroup)) {
                    return optgroup.then((group: Element): void => {
                        group.insertBefore(option, null);
                    });
                }

                optgroup.insertBefore(option, null);
                return this._Promise.resolve();
            }

            element.insertBefore(option, null);
            return this._Promise.resolve();
        }

        /**
         * @name _removeItems
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access protected
         *
         * @description
         * Removes a specified number of elements.
         *
         * @param {number} numberOfItems The number of items
         * to remove.
         *
         * @returns {void}
         */
        protected _removeItems(numberOfItems: number): void {
            let dispose = TemplateControl.dispose,
                controls = this.controls;

            while (numberOfItems-- > 0) {
                dispose(controls.pop());
            }
        }

        /**
         * @name _removeItem
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access protected
         *
         * @description
         * The function called when an item has been removed
         * from the Array context.
         *
         * @returns {void}
         */
        protected _removeItem(): void {
            if (this._isGrouped) {
                this._resetSelect();
                return;
            }

            this._removeItems(1);
        }

        /**
         * @name _resetSelect
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access protected
         *
         * @description
         * Resets the select element by removing all its
         * items and adding them back.
         *
         * @returns {void}
         */
        protected _resetSelect(): void {
            this._removeItems(this.controls.length);
            this.groups = {};
            if (!isNull(this._defaultOption)) {
                this.element.insertBefore(this._defaultOption.cloneNode(true), null);
            }

            this._addItems(this.context.length, 0);
        }

        /**
         * @name _push
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access protected
         *
         * @description
         * The function called when an element is pushed to
         * the array context.
         *
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
         *
         * @returns {void}
         */
        protected _push(changes: Array<observable.IArrayChanges<any>>): void {
            let change = changes[0];
            this._addItems(change.addedCount, change.index);
        }

        /**
         * @name _pop
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access protected
         *
         * @description
         * The function called when an item is popped
         * from the array context.
         *
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
         *
         * @returns {void}
         */
        protected _pop(changes: Array<observable.IArrayChanges<any>>): void {
            if (changes[0].removed.length === 0) {
                return;
            }
            this.itemsLoaded.then((): void => {
                this._removeItem();
            });
        }

        /**
         * @name _unshift
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access protected
         *
         * @description
         * The function called when an item is unshifted
         * onto the array context.
         *
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
         *
         * @returns {void}
         */
        protected _unshift(changes: Array<observable.IArrayChanges<any>>): void {
            if (this._isGrouped) {
                this._resetSelect();
                return;
            }

            let change = changes[0],
                addedCount = change.addedCount;
            this._addItems(addedCount, change.object.length - addedCount - 1);
        }

        /**
         * @name _shift
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access protected
         *
         * @description
         * The function called when an item is shifted
         * from the array context.
         *
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
         *
         * @returns {void}
         */
        protected _shift(changes: Array<observable.IArrayChanges<any>>): void {
            if (changes[0].removed.length === 0) {
                return;
            }
            this.itemsLoaded.then((): void => {
                this._removeItem();
            });
        }

        /**
         * @name _splice
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access protected
         *
         * @description
         * The function called when items are spliced
         * from the array context.
         *
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
         *
         * @returns {void}
         */
        protected _splice(changes: Array<observable.IArrayChanges<any>>): void {
            if (this._isGrouped) {
                this._resetSelect();
                return;
            }

            let change = changes[0],
                addCount = change.addedCount,
                removeCount = change.removed.length;

            if (addCount > removeCount) {
                this._addItems(addCount - removeCount, change.object.length - addCount - 1);
            } else if (removeCount > addCount) {
                this.itemsLoaded.then((): void => {
                    this._removeItems(removeCount - addCount);
                });
            }
        }

        /**
         * @name _sort
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access protected
         *
         * @description
         * The function called when the array context
         * is sorted.
         *
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
         *
         * @returns {void}
         */
        protected _sort(changes: Array<observable.IArrayChanges<any>>): void {
            if (this._isGrouped) {
                this._resetSelect();
            }
        }

        /**
         * @name _reverse
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access protected
         *
         * @description
         * The function called when the array context
         * is reversed.
         *
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
         *
         * @returns {void}
         */
        protected _reverse(changes: Array<observable.IArrayChanges<any>>): void {
            if (this._isGrouped) {
                this._resetSelect();
            }
        }
    }

    /**
     * @name ISelectOptions
     * @memberof plat.ui.controls
     * @kind interface
     *
     * @description
     * The available {@link plat.controls.Options|options} for the {@link plat.ui.controls.Select|Select} control.
     */
    export interface ISelectOptions {
        /**
         * @name group
         * @memberof plat.ui.controls.ISelectOptions
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The property in your context array
         * of objects to use to group the objects
         * into optgroups.
         */
        group: string;

        /**
         * @name default
         * @memberof plat.ui.controls.ISelectOptions
         * @kind property
         * @access public
         *
         * @type {plat.ui.controls.ISelectDefaultOption}
         *
         * @description
         * The property in your context array of
         * objects with which to use to bind to the
         * option's value.
         */
        default: ISelectDefaultOption;
    }

    /**
     * @name ISelectDefaultOption
     * @memberof plat.ui.controls
     * @kind interface
     *
     * @description
     * Defines the value and textContent for the default option of a {@link plat.ui.controls.Select|Select}.
     */
    export interface ISelectDefaultOption {
        /**
         * @name value
         * @memberof plat.ui.controls.ISelectDefaultOption
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The value of the default option.
         */
        value: string;

        /**
         * @name textContent
         * @memberof plat.ui.controls.ISelectDefaultOption
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The textContent of the default option.
         */
        textContent: string;
    }

    register.control(__Select, Select);
}
