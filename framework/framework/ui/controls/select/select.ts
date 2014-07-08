module plat.ui.controls {
    export class Select extends TemplateControl {
        $Promise: async.IPromise = acquire(__Promise);
        $Document: Document = acquire(__Document);

        /**
         * Replaces the <plat-select> node with 
         * a <select> node.
         */
        replaceWith: string = 'select';

        /**
         * This control needs to load before plat-bind.
         */
        priority = 120;

        /**
         * Specifies the context as an Array.
         */
        context: Array<any>;

        /**
         * An object that keeps track of unique 
         * optgroups.
         */
        groups: IObject<Element> = {};

        /**
         * The evaluated plat-options object.
         */
        options: observable.IObservableProperty<ISelectOptions>;

        /**
         * Will fulfill whenever all items are loaded.
         */
        itemsLoaded: async.IThenable<void>;

        private __removeListener: IRemoveListener;
        private __isGrouped: boolean = false;
        private __group: string;
        private __defaultOption: HTMLOptionElement;
        private __resolveFn: () => void;

        /**
         * Creates the bindable option template and grouping 
         * template if necessary.
         */
        setTemplate(): void {
            var $document = this.$Document,
                platOptions = this.options.value,
                option = $document.createElement('option');

            if (!isNull(platOptions.group)) {
                var group = this.__group = platOptions.group,
                    optionGroup = $document.createElement('optgroup');

                optionGroup.label = __startSymbol + group + __endSymbol;

                this.bindableTemplates.add('group', optionGroup);
            }

            var value = platOptions.value,
                textContent = platOptions.textContent;

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
         * Re-observes the new array context and modifies 
         * the options accordingly.
         * 
         * @param newValue The new array context.
         * @param oldValue The old array context.
         */
        contextChanged(newValue?: Array<any>, oldValue?: Array<any>): void {
            if (!isArray(newValue)) {
                return;
            }

            var newLength = isArray(newValue) ? newValue.length : 0,
                oldLength = isArray(oldValue) ? oldValue.length : 0;

            if (isNull(this.__removeListener)) {
                this.__removeListener = this.observeArray(this, 'context',
                (ev?: observable.IArrayMethodInfo<any>) => {
                    if (isFunction((<any>this)['_' + ev.method])) {
                        (<any>this)['_' + ev.method](ev);
                    }
                });
            }

            if (newLength > oldLength) {
                this._addItems(newLength - oldLength, oldLength);
            } else if (newLength < oldLength) {
                this._removeItems(oldLength - newLength);
            }
        }

        /**
         * Observes the new array context and adds 
         * the options accordingly.
         */
        loaded(): void {
            var context = this.context,
                element = this.element,
                firstElementChild = element.firstElementChild,
                group = this.options.value.group;

            if (isNode(firstElementChild) && firstElementChild.nodeName.toLowerCase() === 'option') {
                this.__defaultOption = <HTMLOptionElement>firstElementChild.cloneNode(true);
            }

            this.__isGrouped = !isNull(group);
            this.__group = group;

            if (!isArray(context)) {
                return;
            }

            this._addItems(context.length, 0);

            this.__removeListener = this.observeArray(this, 'context', (ev?: observable.IArrayMethodInfo<any>) => {
                if (isFunction((<any>this)['_' + ev.method])) {
                    (<any>this)['_' + ev.method](ev);
                }
            });
        }

        /**
         * Stops observing the array context.
         */
        dispose(): void {
            if (isFunction(this.__removeListener)) {
                this.__removeListener();
                this.__removeListener = null;
            }

            this.__resolveFn = null;
            this.__defaultOption = null;
        }

        /**
         * Adds the options to the select element.
         * 
         * @param numberOfItems The number of items 
         * to add.
         * @param length The current index of the next 
         * set of items to add.
         */
        _addItems(numberOfItems: number, length: number): async.IThenable<void> {
            var index = length,
                item: any,
                bindableTemplates = this.bindableTemplates,
                promises: Array<async.IThenable<void>> = [];

            for (var i = 0; i < numberOfItems; ++i, ++index) {
                item = this.context[index];

                promises.push(bindableTemplates.bind('option', index).then<void>(this._insertOptions.bind(this, index, item)));
            }

            if (promises.length > 0) {
                if (isFunction(this.__resolveFn)) {
                    this.__resolveFn();
                    this.__resolveFn = null;
                }

                var Promise = this.$Promise;
                this.itemsLoaded = Promise.all(promises).then(() => {
                    return Promise.resolve(undefined);
                });
            } else {
                this.itemsLoaded = new this.$Promise<void>((resolve) => {
                    this.__resolveFn = resolve;
                });
            }

            return this.itemsLoaded;
        }

        /**
         * The callback used to add an option after 
         * its template has been bound.
         * 
         * @param index The current index of the item being added.
         * @param item The item being added.
         * @param optionClone The bound DocumentFragment to be 
         * inserted into the DOM.
         */
        _insertOptions(index: number, item: any, optionClone: DocumentFragment): async.IThenable<any> {
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
                return this.$Promise.resolve(null);
            }

            element.appendChild(optionClone);
            return this.$Promise.resolve(null);
        }

        /**
         * Removes the last option item from the DOM.
         */
        _removeItem(index: number): void {
            if (index < 0) {
                return;
            }

            TemplateControl.dispose(this.controls[index]);
        }

        /**
         * Removes a specified number of elements.
         * 
         * @param numberOfItems The number of items 
         * to remove.
         */
        _removeItems(numberOfItems: number): void {
            var element = this.element,
                controls = this.controls,
                length = controls.length - 1;

            while (numberOfItems-- > 0) {
                this._removeItem(length--);
            }
        }

        /**
         * The function called when an item has been removed 
         * from the array context.
         * 
         * @param ev The array mutation object
         */
        _itemRemoved(ev: observable.IArrayMethodInfo<any>): void {
            if (ev.oldArray.length === 0) {
                return;
            } else if (this.__isGrouped) {
                this._resetSelect();
                return;
            }

            this._removeItems(1);
        }

        /**
         * Resets the select element by removing all its 
         * items and adding them back.
         */
        _resetSelect(): void {
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
         * The function called when an element is pushed to 
         * the array context.
         * 
         * @param ev The array mutation object
         */
        _push(ev: observable.IArrayMethodInfo<any>): void {
            this._addItems(ev.arguments.length, ev.oldArray.length);
        }

        /**
         * The function called when an item is popped 
         * from the array context.
         * 
         * @param ev The array mutation object
         */
        _pop(ev: observable.IArrayMethodInfo<any>): void {
            this._itemRemoved(ev);
        }

        /**
         * The function called when an item is shifted 
         * from the array context.
         * 
         * @param ev The array mutation object
         */
        _shift(ev: observable.IArrayMethodInfo<any>): void {
            this._itemRemoved(ev);
        }

        /**
         * The function called when items are spliced 
         * from the array context.
         * 
         * @param ev The array mutation object
         */
        _splice(ev: observable.IArrayMethodInfo<any>): void {
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
         * The function called when an item is unshifted 
         * onto the array context.
         * 
         * @param ev The array mutation object
         */
        _unshift(ev: observable.IArrayMethodInfo<any>): void {
            if (this.__isGrouped) {
                this._resetSelect();
                return;
            }

            this._addItems(ev.arguments.length, ev.oldArray.length);
        }

        /**
         * The function called when the array context 
         * is sorted.
         * 
         * @param ev The array mutation object
         */
        _sort(ev: observable.IArrayMethodInfo<any>): void {
            if (this.__isGrouped) {
                this._resetSelect();
            }
        }

        /**
         * The function called when the array context 
         * is reversed.
         * 
         * @param ev The array mutation object
         */
        _reverse(ev: observable.IArrayMethodInfo<any>): void {
            if (this.__isGrouped) {
                this._resetSelect();
            }
        }
    }

    /**
     * The available options for plat.ui.controls.Select.
     */
    export interface ISelectOptions {
        /**
         * The property in your context array 
         * of objects to use to group the objects 
         * into optgroups.
         */
        group: string;

        /**
         * The property in your context array of 
         * objects with which to use to bind to the 
         * option's value.
         */
        value: string;

        /**
         * The property in your context array of 
         * objects with which to use to bind to the 
         * option's textContent.
         */
        textContent: string;
    }

    register.control(__Select, Select);
}
