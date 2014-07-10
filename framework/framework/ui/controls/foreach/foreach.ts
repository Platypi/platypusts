module plat.ui.controls {
    export class ForEach extends TemplateControl {
        $Animator: IAnimator = acquire(__Animator);
        $Promise: async.IPromise = acquire(__Promise);

        /**
         * The required context is an Array.
         */
        context: Array<any>;

        /**
         * This control needs to load before plat-bind.
         */
        priority = 120;

        /**
         * The child controls
         */
        controls: Array<ITemplateControl>;

        /**
         * Will fulfill whenever all items are loaded.
         */
        itemsLoaded: async.IThenable<void>;

        /**
         * The node length of the element's childNodes (innerHTML)
         */
        _blockLength = 0;

        private __removeListener: IRemoveListener;
        private __currentAnimations: Array<IAnimationThenable<void>> = [];
        private __resolveFn: () => void;

        /**
         * Creates a bindable template with the element's childNodes (innerHTML) 
         * specified for the ForEach.
         */
        setTemplate(): void {
            var childNodes: Array<Node> = Array.prototype.slice.call(this.element.childNodes);
            this.bindableTemplates.add('item', childNodes);
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

            this.__resolveFn = null;
        }
        
        /**
         * Adds an item to the ForEach's element.
         * 
         * @param item The document fragment representing a single item
         * @param animate Whether to animate the entering item
         */
        _addItem(item: DocumentFragment, animate?: boolean): void {
            if (!isNode(item)) {
                return;
            }

            var $animator = this.$Animator,
                childNodes: Array<Element>,
                childNode: Element;

            if (animate === true) {
                childNodes = Array.prototype.slice.call(item.childNodes);
                if (this._blockLength === 0) {
                    this._blockLength = childNodes.length;
                }
            } else {
                if (this._blockLength === 0) {
                    this._blockLength = item.childNodes.length;
                }
                this.dom.insertBefore(this.element, item);
                return;
            }

            this.dom.insertBefore(this.element, item);

            var currentAnimations = this.__currentAnimations;
            while (childNodes.length > 0) {
                childNode = childNodes.shift();
                if (childNode.nodeType === Node.ELEMENT_NODE) {
                    currentAnimations.push($animator.animate(childNode, __Enter).then(() => {
                        currentAnimations.shift();
                    }));
                }
            }
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
         * @param animate whether to animate the new items
         */
        _addItems(numberOfItems: number, index: number, animate?: boolean): async.IThenable<void> {
            var bindableTemplates = this.bindableTemplates,
                promises: Array<async.IThenable<void>> = [];
            
            for (var i = 0; i < numberOfItems; ++i, ++index) {
                promises.push(bindableTemplates.bind('item', index, this._getAliases(index)).then((fragment: DocumentFragment) => {
                    this._addItem(fragment, animate);
                }).catch((error: any) => {
                    postpone(() => {
                        var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                        $exception.fatal(error, $exception.BIND);
                    });
                }));
            }

            if (promises.length > 0) {
                if (isFunction(this.__resolveFn)) {
                    this.__resolveFn();
                    this.__resolveFn = null;
                }

                var Promise = this.$Promise;
                this.itemsLoaded = Promise.all(promises).then<void>(() => {
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
         * Handles items being pushed into the array.
         * 
         * @param ev The IArrayMethodInfo
         */
        _push(ev: observable.IArrayMethodInfo<any>): void {
            this._addItems(ev.arguments.length, ev.oldArray.length, true);
        }
        
        /**
         * Handles items being popped off the array.
         * 
         * @param ev The IArrayMethodInfo
         */
        _pop(ev: observable.IArrayMethodInfo<any>): void {
            var blockLength = this._blockLength,
                startNode: number,
                animationPromise: plat.ui.IAnimationThenable<void>;

            if (blockLength > 0) {
                startNode = blockLength * ev.newArray.length;
                animationPromise = this._animateItems(startNode, undefined, __Leave);
            }

            if (isNull(animationPromise)) {
                this._removeItems(1);
                return;
            }

            animationPromise.then(() => {
                this._removeItems(1);
            });
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
                this._addItems(newLength - oldLength, oldLength, oldLength === 0);
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

        /**
         * Animate a block of elements
         * 
         * @param startNode The starting childNode of the ForEach to animate
         * @param endNode The ending childNode of the ForEach to animate
         * @param key The animation key/type
         * @param cancel Whether or not the animation should cancel all current animations
         */
        _animateItems(startNode: number, endNode: number, key: string, cancel: boolean = true): IAnimationThenable<void> {
            var currentAnimations = this.__currentAnimations,
                length = currentAnimations.length;

            if (length === 0 || !cancel) {
                return this.__handleAnimation(startNode, endNode, key);
            }

            var animationPromises: Array<IAnimationThenable<void>> = [];
            while (length-- > 0) {
                animationPromises.push(currentAnimations[length].cancel());
            }

            return <IAnimationThenable<void>>this.$Promise.all(animationPromises).then(() => {
                return this.__handleAnimation(startNode, endNode, key);
            });
        }

        private __handleAnimation(startNode: number, endNode: number, key: string): IAnimationThenable<void> {
            var nodes: Array<Node> = Array.prototype.slice.call(this.element.childNodes, startNode, endNode),
                node: Node,
                $animator = this.$Animator,
                currentAnimations = this.__currentAnimations,
                animationPromise: IAnimationThenable<void>;

            while (nodes.length > 0) {
                node = nodes.shift();
                if (node.nodeType === Node.ELEMENT_NODE) {
                    animationPromise = $animator.animate(<Element>node, key).then(() => {
                        currentAnimations.shift();
                    });
                    currentAnimations.push(animationPromise);
                }
            }

            return animationPromise;
        }
    }

    register.control(__ForEach, ForEach);
}
