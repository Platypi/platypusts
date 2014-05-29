module plat.ui.controls {
    export class Select extends TemplateControl {
        $Promise: async.IPromise = acquire('$Promise');
        $Exception: IExceptionStatic = acquire('$ExceptionStatic');
        $Document: Document = acquire('$Document');

        /**
         * Replaces the <plat-select> node with 
         * a <select> node.
         */
        replaceWith: string = 'select';

        /**
         * Specifies the context as an Array.
         */
        context: Array<any>;

        /**
         * An object that keeps track of unique 
         * optgroups.
         */
        groups: IObject<HTMLElement> = {};

        /**
         * The evaluated plat-options object.
         */
        options: observable.IObservableProperty<ISelectOptions>;

        private __removeListener: IRemoveListener;
        private __isGrouped: boolean = false;
        private __group: string;
        private __defaultOption: HTMLOptionElement;
        /**
         * Creates the bindable option template and grouping 
         * template if necessary.
         */
        setTemplate(): void {
            var element = this.element,
                firstElementChild = element.firstElementChild,
                $document = this.$Document;

            if (!isNull(firstElementChild) && firstElementChild.nodeName.toLowerCase() === 'option') {
                this.__defaultOption = <HTMLOptionElement>firstElementChild.cloneNode(true);
            }

            var platOptions = this.options.value,
                option = $document.createElement('option');

            if (this.__isGrouped = !isNull(platOptions.group)) {
                var group = this.__group = platOptions.group,
                    optionGroup = $document.createElement('optgroup');

                optionGroup.label = '{{' + group + '}}';

                this.bindableTemplates.add('group', optionGroup);
            }

            option.value = '{{' + platOptions.value + '}}';
            option.textContent = '{{' + platOptions.textContent + '}}';

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
            var newLength = isNull(newValue) ? 0 : newValue.length,
                oldLength = isNull(oldValue) ? 0 : oldValue.length;

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
            var context = this.context;

            if (isNull(context)) {
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
        }

        /**
         * Adds the options to the select element.
         * 
         * @param numberOfItems The number of items 
         * to add.
         * @param length The current index of the next 
         * set of items to add.
         */
        _addItems(numberOfItems: number, length: number): void {
            var index = length,
                item: any;

            for (var i = 0; i < numberOfItems; ++i, ++index) {
                item = this.context[index];

                this.bindableTemplates.bind('option', this._insertOptions.bind(this, index, item), index);
            }
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
        _insertOptions(index: number, item: any, optionClone: DocumentFragment): void {
            var element = this.element;

            if (this.__isGrouped) {
                var groups = this.groups,
                    newGroup = item[this.__group],
                    optgroup: any = groups[newGroup];

                if (isNull(optgroup)) {
                    optgroup = groups[newGroup] = <any>new this.$Promise<HTMLElement>((resolve) => {
                        this.bindableTemplates.bind('group', (groupClone: DocumentFragment) => {
                            optgroup = groups[newGroup] = <HTMLElement>groupClone.childNodes[1];

                            optgroup.appendChild(optionClone);
                            element.appendChild(groupClone);
                            resolve(optgroup);
                        }, '' + index);
                    }).catch((error: any) => {
                        postpone(() => {
                            this.$Exception.warn(error.message);
                        });
                    });
                    return;
                } else if (isFunction(optgroup.then)) {
                    optgroup.then((group: HTMLElement) => {
                        group.appendChild(optionClone);
                        return group;
                    });
                    return;
                }

                optgroup.appendChild(optionClone);
                return;
            }

            element.appendChild(optionClone);
        }

        /**
         * Removes an item from the DOM.
         * 
         * @param parent The element whose child 
         * will be removed.
         */
        _removeItem(parent: HTMLElement): void {
            parent.removeChild(parent.lastElementChild);
        }

        /**
         * Removes a specified number of elements.
         * 
         * @param numberOfItems The number of items 
         * to remove.
         */
        _removeItems(numberOfItems: number): void {
            var element = this.element,
                removeItem = this._removeItem;
            while (numberOfItems-- > 0) {
                removeItem(element);
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
            }

            if (this.__isGrouped) {
                var removed = ev.returnValue,
                    group = removed[this.__group],
                    optgroup = this.groups[group];

                this._removeItem(optgroup);

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
                nodeLength = this.element.childNodes.length;

            this._removeItems(nodeLength);
            this.groups = {};
            if (!isNull(this.__defaultOption)) {
                this.element.appendChild(this.__defaultOption);
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
            if (this.__isGrouped) {
                this._resetSelect();
                return;
            }

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

    register.control('plat-select', Select);
}
