module plat.ui.controls {
    export class ForEach extends TemplateControl {
        /**
         * The required context is an Array.
         */
        context: Array<any>;

        /**
         * Specifies that the foreach's element can be replaced with 
         * any type of element.
         */
        replaceWith = 'any';

        controls: Array<ITemplateControl>;
        private __clearTimeouts: Array<IRemoveListener> = [];
        private __removeListener: IRemoveListener;

        /**
         * Creates a bindable template with the elementNodes (innerHTML) 
         * specified for the ForEach.
         */
        setTemplate(): void {
            this.bindableTemplates.add('item', this.element.childNodes);
        }

        /**
         * Re-syncs the ForEach children controls and DOM with the new 
         * array.
         * 
         * @param newValue The new Array
         * @param oldValue The old Array
         */
        contextChanged(newValue?: Array<any>, oldValue?: Array<any>): void {
            if (isNull(this.__removeListener)) {
                this._setListener();
            }

            if (!isArray(newValue)) {
                return;
            }

            if (newValue.length === 0) {
                this._removeItems(this.controls.length);
                return;
            }

            this._executeEvent({
                method: 'splice',
                arguments: null,
                returnValue: null,
                oldArray: oldValue || [],
                newArray: newValue || []
            });
        }

        /**
         * Observes the array for changes and adds initial items to the DOM.
         */
        loaded(): void {
            var context = this.context;

            if (!isArray(context)) {
                return;
            }

            this._addItems(context.length, 0);

            this._setListener();
        }

        /**
         * Removes the Array listener
         */
        dispose(): void {
            if (isFunction(this.__removeListener)) {
                this.__removeListener();
                this.__removeListener = null;
            }

            var clearTimeouts = this.__clearTimeouts;

            while (clearTimeouts.length > 0) {
                clearTimeouts.shift()();
            }
        }
        
        /**
         * Adds an item to the ForEach's element.
         */
        _addItem(item: DocumentFragment): void {
            if (!isNode(item)) {
                return;
            }
            this.dom.insertBefore(this.element, item);
        }

        /**
         * Removes an item from the ForEach's element.
         */
        _removeItem(): void {
            var controls = this.controls,
                length = controls.length - 1;

            TemplateControl.dispose(controls[length]);
        }

        /**
         * Updates the ForEach's children resource objects when 
         * the array changes.
         */
        _updateResources(): void {
            var controls = this.controls,
                length = controls.length;

            for (var i = 0; i < length; ++i) {
                controls[i].resources.add(this._getAliases(i));
            }
        }

        /**
         * Sets a listener for the changes to the array.
         */
        _setListener(): void {
            this.__removeListener = this.observeArray(this, 'context', this._arrayChanged);
        }

        /**
         * Receives an event when a method has been called on an array.
         * 
         * @param ev The IArrayMethodInfo
         */
        _arrayChanged(ev: observable.IArrayMethodInfo<any>): void {
            if (isFunction((<any>this)['_' + ev.method])) {
                this._executeEvent(ev);
            }
        }

        /**
         * Maps an array method to its associated method handler.
         * 
         * @param ev The IArrayMethodInfo
         */
        _executeEvent(ev: observable.IArrayMethodInfo<any>): void {
            (<any>this)['_' + ev.method](ev);
        }

        /**
         * Adds new items to the ForEach's element when items are added to 
         * the array.
         * 
         * @param numberOfItems The number of items to add.
         * @param index The point in the array to start adding items.
         */
        _addItems(numberOfItems: number, index: number): void {
            var bindableTemplates = this.bindableTemplates;
            
            for (var i = 0; i < numberOfItems; ++i, ++index) {
                bindableTemplates.bind('item', index, this._getAliases(index)).then((fragment: DocumentFragment) => {
                    this._addItem(fragment);
                }).catch((error: any) => {
                    postpone(() => {
                        var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                        $exception.fatal(error, $exception.BIND);
                    });
                });
            }
        }

        /**
         * Returns a resource alias object for an item in the array. The 
         * resource object contains index:number, even:boolean, odd:boolean, 
         * and first:boolean.
         * 
         * @param index The index used to create the resource aliases.
         */
        _getAliases(index: number): IObject<IResource> {
            var isEven = (index & 1) === 0;
            return {
                index: {
                    value: index,
                    type: 'observable'
                },
                even: {
                    value: isEven,
                    type: 'observable'
                },
                odd: {
                    value: !isEven,
                    type: 'observable'
                },
                first: {
                    value: index === 0,
                    type: 'observable'
                }
            };
        }

        /**
         * Removes items from the ForEach's element.
         * 
         * @param numberOfItems The number of items to remove.
         */
        _removeItems(numberOfItems: number): void {
            for (var i = 0; i < numberOfItems; ++i) {
                this._removeItem();
            }

            if (this.controls.length > 0) {
                this._updateResources();
            }
        }

        /**
         * Handles items being pushed into the array.
         * 
         * @param ev The IArrayMethodInfo
         */
        _push(ev: observable.IArrayMethodInfo<any>): void {
            this._addItems(ev.arguments.length, ev.oldArray.length);
        }
        
        /**
         * Handles items being popped off the array.
         * 
         * @param ev The IArrayMethodInfo
         */
        _pop(ev: observable.IArrayMethodInfo<any>): void {
            this._removeItems(1);
        }
        
        /**
         * Handles items being shifted off the array.
         * 
         * @param ev The IArrayMethodInfo
         */
        _shift(ev: observable.IArrayMethodInfo<any>): void {
            this._removeItems(1);
        }
        
        /**
         * Handles adding/removing items when an array is spliced.
         * 
         * @param ev The IArrayMethodInfo
         */
        _splice(ev: observable.IArrayMethodInfo<any>): void {
            var oldLength = this.controls.length,
                newLength = ev.newArray.length;

            if (newLength > oldLength) {
                this._addItems(newLength - oldLength, oldLength);
            } else if (oldLength > newLength) {
                this._removeItems(oldLength - newLength);
            }
        }
        
        /**
         * Handles items being unshifted into the array.
         * 
         * @param ev The IArrayMethodInfo
         */
        _unshift(ev: observable.IArrayMethodInfo<any>): void {
            this._addItems(ev.arguments.length, ev.oldArray.length);
        }
        
        /**
         * Handles when the array is sorted.
         * 
         * @param ev The IArrayMethodInfo
         */
        _sort(ev: observable.IArrayMethodInfo<any>): void {
        }
        
        /**
         * Handles when the array is reversed.
         * 
         * @param ev The IArrayMethodInfo
         */
        _reverse(ev: observable.IArrayMethodInfo<any>): void {
        }
    }

    export interface IForEach {
        /**
         * Adds an item to the ForEach's element.
         */
        _addItem(item: DocumentFragment): void;

        /**
         * Removes an item from the ForEach's element.
         */
        _removeItem(): void;

        /**
         * Updates the ForEach's children resource objects when 
         * the array changes.
         */
        _updateResources(): void;

        /**
         * Sets a listener for the changes to the array.
         */
        _setListener(): void;

        /**
         * Receives an event when a method has been called on an array.
         * 
         * @param ev The IArrayMethodInfo
         */
        _arrayChanged(ev: observable.IArrayMethodInfo<any>): void;

        /**
         * Maps an array method to its associated method handler.
         * 
         * @param ev The IArrayMethodInfo
         */
        _executeEvent(ev: observable.IArrayMethodInfo<any>): void;

        /**
         * Adds new items to the ForEach's element when items are added to 
         * the array.
         * 
         * @param numberOfItems The number of items to add.
         * @param index The point in the array to start adding items.
         */
        _addItems(numberOfItems: number, index: number): void;

        /**
         * Returns a resource alias object for an item in the array. The 
         * resource object contains index:number, even:boolean, odd:boolean, 
         * and first:boolean.
         * 
         * @param index The index used to create the resource aliases.
         */
        _getAliases(index: number): IObject<IResource>;

        /**
         * Removes items from the ForEach's element.
         * 
         * @param numberOfItems The number of items to remove.
         */
        _removeItems(numberOfItems: number): void;

        /**
         * Handles items being pushed into the array.
         * 
         * @param ev The IArrayMethodInfo
         */
        _push(ev: observable.IArrayMethodInfo<any>): void;
        
        /**
         * Handles items being popped off the array.
         * 
         * @param ev The IArrayMethodInfo
         */
        _pop(ev: observable.IArrayMethodInfo<any>): void;
        
        /**
         * Handles items being shifted off the array.
         * 
         * @param ev The IArrayMethodInfo
         */
        _shift(ev: observable.IArrayMethodInfo<any>): void;
        
        /**
         * Handles adding/removing items when an array is spliced.
         * 
         * @param ev The IArrayMethodInfo
         */
        _splice(ev: observable.IArrayMethodInfo<any>): void;
        
        /**
         * Handles items being unshifted into the array.
         * 
         * @param ev The IArrayMethodInfo
         */
        _unshift(ev: observable.IArrayMethodInfo<any>): void;
        
        /**
         * Handles when the array is sorted.
         * 
         * @param ev The IArrayMethodInfo
         */
        _sort(ev: observable.IArrayMethodInfo<any>): void;
        
        /**
         * Handles when the array is reversed.
         * 
         * @param ev The IArrayMethodInfo
         */
        _reverse(ev: observable.IArrayMethodInfo<any>): void;
    }

    register.control(__ForEach, ForEach);
}
