module plat.ui.controls {
    'use strict';

    /**
     * @name Select
     * @memberof plat.ui.controls
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * 
     * @description
     * A {@link plat.ui.TemplateControl|TemplateControl} for binding an HTML select element 
     * to an Array context.
     */
    export class Select extends TemplateControl {
        protected static _inject: any = {
            _Promise: __Promise,
            _document: __Document
        };

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
         * @name replaceWith
         * @memberof plat.ui.controls.Select
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Replaces the <plat-select> node with 
         * a <select> node.
         */
        replaceWith = 'select';

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
        priority = 120;

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
         * @name __isGrouped
         * @memberof plat.ui.controls.Select
         * @kind property
         * @access private
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the select is grouped.
         */
        private __isGrouped = false;
        /**
         * @name __isNativeSelect
         * @memberof plat.ui.controls.Select
         * @kind property
         * @access private
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the select should be treated as a 
         * native (unbound) select element.
         */
        private __isNativeSelect = false;
        /**
         * @name __group
         * @memberof plat.ui.controls.Select
         * @kind property
         * @access private
         * 
         * @type {string}
         * 
         * @description
         * The property used to group the objects.
         */
        private __group: string;
        /**
         * @name __defaultOption
         * @memberof plat.ui.controls.Select
         * @kind property
         * @access private
         * 
         * @type {HTMLOptionElement}
         * 
         * @description
         * An optional default option specified in the control element's 
         * innerHTML.
         */
        private __defaultOption: HTMLOptionElement;
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
            this.itemsLoaded = new this._Promise<void>((resolve) => {
                this.__resolveFn = resolve;
            });
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
            var _document = this._document,
                options = this.options || <observable.IObservableProperty<ISelectOptions>>{},
                platOptions = options.value || <ISelectOptions>{},
                option = _document.createElement('option'),
                value = platOptions.value,
                textContent = platOptions.textContent;

            // check if the element should be treated as a normal select.
            if (isUndefined(value) && isUndefined(textContent)) {
                this.__isNativeSelect = true;
                return;
            }

            if (!isNull(platOptions.group)) {
                var group = this.__group = platOptions.group,
                    optionGroup = _document.createElement('optgroup');

                optionGroup.label = __startSymbol + group + __endSymbol;

                this.bindableTemplates.add('group', optionGroup);
            }

            if (!isString(value) || isEmpty(value)) {
                value = undefined;
            }

            if (!isString(textContent) || isEmpty(textContent)) {
                textContent = undefined;
            }

            option.value = __startSymbol + (value || textContent) + __endSymbol;
            option.textContent = __startSymbol + (textContent || value) + __endSymbol;

            this.bindableTemplates.add('option', option);
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
         * @param {Array<any>} newValue? The new array context.
         * @param {Array<any>} oldValue? The old array context.
         * 
         * @returns {void}
         */
        contextChanged(newValue?: Array<any>, oldValue?: Array<any>): void {
            if (this.__isNativeSelect || !isArray(newValue)) {
                return;
            }

            var newLength = isArray(newValue) ? newValue.length : 0,
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
            if (this.__isNativeSelect) {
                return;
            }

            var options = this.options || <observable.IObservableProperty<ISelectOptions>>{},
                platOptions = options.value || <ISelectOptions>{};
            if (isUndefined(platOptions.value) && isUndefined(platOptions.textContent)) {
                this.__isNativeSelect = true;
                return;
            }

            var context = this.context,
                element = this.element,
                firstElementChild = element.firstElementChild;
            if (isNode(firstElementChild) && firstElementChild.nodeName.toLowerCase() === 'option') {
                this.__defaultOption = <HTMLOptionElement>firstElementChild.cloneNode(true);
            }

            this.__isGrouped = !isNull((this.__group = platOptions.group));

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
            this.__resolveFn = null;
            this.__defaultOption = null;
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
                this.observeArray(this, __CONTEXT, null, this._executeEvent);
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
         * @param {plat.observable.IPostArrayChangeInfo<any>} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _executeEvent(ev: observable.IPostArrayChangeInfo<any>): void {
            var method = '_' + ev.method;
            if (isFunction((<any>this)[method])) {
                (<any>this)[method](ev);
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
         * @param {number} length The current index of the next 
         * set of items to add.
         * 
         * @returns {plat.async.IThenable<void>} The itemsLoaded promise.
         */
        protected _addItems(numberOfItems: number, length: number): async.IThenable<void> {
            var index = length,
                item: any,
                bindableTemplates = this.bindableTemplates,
                promises: Array<async.IThenable<void>> = [];

            for (var i = 0; i < numberOfItems; ++i, ++index) {
                item = this.context[index];

                promises.push(bindableTemplates.bind('option', index).then<void>(this._insertOptions.bind(this, index, item)));
            }

            if (promises.length > 0) {
                this.itemsLoaded = this._Promise.all(promises).then(() => {
                    if (isFunction(this.__resolveFn)) {
                        this.__resolveFn();
                        this.__resolveFn = null;
                    }
                    return;
                });
            } else {
                if (isFunction(this.__resolveFn)) {
                    this.__resolveFn();
                    this.__resolveFn = null;
                }
                this.itemsLoaded = new this._Promise<void>((resolve) => {
                    this.__resolveFn = resolve;
                });
            }

            return this.itemsLoaded;
        }

        /**
         * @name _insertOptions
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access protected
         * 
         * @description
         * The callback used to add an option after 
         * its template has been bound.
         * 
         * @param {number} index The current index of the item being added.
         * @param {any} item The item being added.
         * @param {DocumentFragment} optionClone The bound DocumentFragment to be 
         * inserted into the DOM.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves when the option 
         * or optgroup has successfully be inserted.
         */
        protected _insertOptions(index: number, item: any, optionClone: DocumentFragment): async.IThenable<any> {
            var element = this.element;
            if (this.__isGrouped) {
                var groups = this.groups,
                    newGroup = item[this.__group],
                    optgroup: any = groups[newGroup];

                if (isNull(optgroup)) {
                    return (groups[newGroup] = <any>this.bindableTemplates.bind('group', index)
                        .then((groupClone: DocumentFragment) => {
                            optgroup = groups[newGroup] = <Element>groupClone.childNodes[1];

                            optgroup.appendChild(optionClone);
                            element.appendChild(groupClone);
                            return optgroup;
                        }));
                } else if (isPromise(optgroup)) {
                    return optgroup.then((group: Element) => {
                        group.appendChild(optionClone);
                        return group;
                    });
                }

                optgroup.appendChild(optionClone);
                return this._Promise.resolve(null);
            }

            element.appendChild(optionClone);
            return this._Promise.resolve(null);
        }

        /**
         * @name _removeItem
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access protected
         * 
         * @description
         * Removes the specified option item from the DOM.
         * 
         * @param {number} index The control index to remove.
         * 
         * @returns {void}
         */
        protected _removeItem(index: number): void {
            if (index < 0) {
                return;
            }

            TemplateControl.dispose(<TemplateControl>this.controls[index]);
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
            var controls = this.controls,
                length = controls.length - 1;

            while (numberOfItems-- > 0) {
                this._removeItem(length--);
            }
        }

        /**
         * @name _itemRemoved
         * @memberof plat.ui.controls.Select
         * @kind function
         * @access protected
         * 
         * @description
         * The function called when an item has been removed 
         * from the array context.
         * 
         * @param {plat.observable.IPostArrayChangeInfo<any>} ev The array mutation object
         * 
         * @returns {void}
         */
        protected _itemRemoved(ev: observable.IPostArrayChangeInfo<any>): void {
            if (ev.oldArray.length === 0) {
                return;
            } else if (this.__isGrouped) {
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
            var itemLength = this.context.length,
                element = this.element,
                nodeLength = element.childNodes.length;

            this._removeItems(nodeLength);
            this.groups = {};
            if (!isNull(this.__defaultOption)) {
                element.appendChild(this.__defaultOption.cloneNode(true));
            }

            this._addItems(itemLength, 0);
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
         * @param {plat.observable.IPostArrayChangeInfo<any>} ev The array mutation object
         * 
         * @returns {void}
         */
        protected _push(ev: observable.IPostArrayChangeInfo<any>): void {
            this._addItems(ev.arguments.length, ev.oldArray.length);
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
         * @param {plat.observable.IPostArrayChangeInfo<any>} ev The array mutation object
         * 
         * @returns {void}
         */
        protected _pop(ev: observable.IPostArrayChangeInfo<any>): void {
            this._itemRemoved(ev);
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
         * @param {plat.observable.IPostArrayChangeInfo<any>} ev The array mutation object
         * 
         * @returns {void}
         */
        protected _shift(ev: observable.IPostArrayChangeInfo<any>): void {
            this._itemRemoved(ev);
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
         * @param {plat.observable.IPostArrayChangeInfo<any>} ev The array mutation object
         * 
         * @returns {void}
         */
        protected _splice(ev: observable.IPostArrayChangeInfo<any>): void {
            if (this.__isGrouped) {
                this._resetSelect();
                return;
            }

            var oldLength = ev.oldArray.length,
                newLength = ev.newArray.length;

            if (newLength > oldLength) {
                this._addItems(newLength - oldLength, oldLength);
            } else if (oldLength > newLength) {
                this._removeItems(oldLength - newLength);
            }
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
         * @param {plat.observable.IPostArrayChangeInfo<any>} ev The array mutation object
         * 
         * @returns {void}
         */
        protected _unshift(ev: observable.IPostArrayChangeInfo<any>): void {
            if (this.__isGrouped) {
                this._resetSelect();
                return;
            }

            this._addItems(ev.arguments.length, ev.oldArray.length);
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
         * @param {plat.observable.IPostArrayChangeInfo<any>} ev The array mutation object
         * 
         * @returns {void}
         */
        protected _sort(ev: observable.IPostArrayChangeInfo<any>): void {
            if (this.__isGrouped) {
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
         * @param {plat.observable.IPostArrayChangeInfo<any>} ev The array mutation object
         * 
         * @returns {void}
         */
        protected _reverse(ev: observable.IPostArrayChangeInfo<any>): void {
            if (this.__isGrouped) {
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
         * @name value
         * @memberof plat.ui.controls.ISelectOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The property in your context array of 
         * objects with which to use to bind to the 
         * option's value.
         */
        value: string;

        /**
         * @name textContent
         * @memberof plat.ui.controls.ISelectOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The property in your context array of 
         * objects with which to use to bind to the 
         * option's textContent.
         */
        textContent: string;
    }

    register.control(__Select, Select);
}
