module plat.ui.controls {
    'use strict';

    /**
     * @name ForEach
     * @memberof plat.ui.controls
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * 
     * @description
     * A {@link plat.ui.TemplateControl|TemplateControl} for repeating a block of 
     * DOM nodes bound to an array.
     */
    export class ForEach extends TemplateControl {
        protected static _inject: any = {
            _animator: __Animator,
            _Promise: __Promise
        };

        /**
         * @name _animator
         * @memberof plat.ui.controls.ForEach
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.animations.Animator}
         * 
         * @description
         * Reference to the {@link plat.ui.animations.Animator|Animator} injectable.
         */
        protected _animator: animations.Animator;

        /**
         * @name _Promise
         * @memberof plat.ui.controls.ForEach
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
         * @name context
         * @memberof plat.ui.controls.ForEach
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
         * @name priority
         * @memberof plat.ui.controls.ForEach
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
         * @name controls
         * @memberof plat.ui.controls.ForEach
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
         * @name itemsLoaded
         * @memberof plat.ui.controls.ForEach
         * @kind property
         * @access public
         * 
         * @type {plat.async.IThenable<void>}
         * 
         * @description
         * A Promise that fulfills when the items are loaded.
         */
        itemsLoaded: async.IThenable<void>;

        /**
         * @name options
         * @memberof plat.ui.controls.ForEach
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IObservableProperty<plat.ui.controls.IForEachAliasOptions>}
         * 
         * @description
         * The {@link plat.ui.controls.IForEachOptions|options} for the {@link plat.ui.controls.ForEach|ForEach} control.
         */
        options: observable.IObservableProperty<IForEachOptions>;

        /**
         * @name _aliases
         * @memberof plat.ui.controls.ForEach
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.controls.IForEachAliasOptions}
         * 
         * @description
         * Used to hold the alias tokens for the built-in foreach aliases. You 
         * can overwrite these with the {@link plat.ui.controls.IForEachOptions|options} for 
         * the {@link plat.ui.controls.ForEach|ForEach} control. 
         */
        protected _aliases: IForEachAliasOptions = {
            index: __forEachAliasOptions.index,
            even: __forEachAliasOptions.even,
            odd: __forEachAliasOptions.odd,
            first: __forEachAliasOptions.first,
            last: __forEachAliasOptions.last
        };

        /**
         * @name _container
         * @memberof plat.ui.controls.ForEach
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The container to which items will be added.
         */
        protected _container: HTMLElement;

        /**
         * @name _blockLength
         * @memberof plat.ui.controls.ForEach
         * @kind property
         * @access protected
         * 
         * @type {any}
         * 
         * @description
         * The node length of each item's childNodes (innerHTML). 
         * For the {@link plat.ui.controls.ForEach|ForEach} it should be a 
         * single constant number.
         */
        protected _blockLength: any = 0;

        /**
         * @name _animationThenable
         * @memberof plat.ui.controls.ForEach
         * @kind property
         * @access protected
         * 
         * @type {plat.async.IThenable<void>}
         * 
         * @description
         * An animation promise for delaying disposal prior to an animation finishing.
         */
        protected _animationThenable: async.IThenable<void>;

        /**
         * @name _currentAnimation
         * @memberof plat.ui.controls.ForEach
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.animations.IAnimationThenable<any>}
         * 
         * @description
         * The current animation promise.
         */
        protected _currentAnimation: animations.IAnimationThenable<any>;

        /**
         * @name __listenerSet
         * @memberof plat.ui.controls.ForEach
         * @kind property
         * @access private
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the Array listener has been set.
         */
        private __listenerSet = false;
        /**
         * @name __resolveFn
         * @memberof plat.ui.controls.ForEach
         * @kind property
         * @access private
         * 
         * @type {() => void}
         * 
         * @description
         * The resolve function for the itemsLoaded promise.
         */
        private __resolveFn: () => void;

        /**
         * @name constructor
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access public
         * 
         * @description
         * The constructor for a {@link plat.ui.controls.ForEach|ForEach}. Creates the itemsLoaded promise.
         * 
         * @returns {plat.ui.controls.ForEach} A {@link plat.ui.controls.ForEach|ForEach} instance.
         */
        constructor() {
            super();
            this.itemsLoaded = new this._Promise<void>((resolve): void => {
                this.__resolveFn = resolve;
            });
        }

        /**
         * @name setTemplate
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access public
         * 
         * @description
         * Creates a bindable template with the control element's childNodes (innerHTML).
         * 
         * @returns {void}
         */
        setTemplate(): void {
            this.bindableTemplates.add('item', this.element.childNodes);
        }

        /**
         * @name contextChanged
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access public
         * 
         * @description
         * Re-syncs the {@link plat.ui.controls.ForEach|ForEach} child controls and DOM with the new 
         * array.
         * 
         * @param {Array<any>} newValue? The new Array
         * @param {Array<any>} oldValue? The old Array
         * 
         * @returns {void}
         */
        contextChanged(newValue?: Array<any>, oldValue?: Array<any>): void {
            if (isEmpty(newValue)) {
                this._removeItems(this.controls.length);
                return;
            } else if (!isArray(newValue)) {
                var _Exception = this._Exception;
                _Exception.warn(this.type + ' context set to something other than an Array.', _Exception.CONTEXT);
                return;
            }

            this._setListener();
            this._executeEvent({
                method: 'splice',
                arguments: null,
                returnValue: null,
                oldArray: oldValue || [],
                newArray: newValue || []
            });
        }

        /**
         * @name loaded
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access public
         * 
         * @description
         * Observes the Array context for changes and adds initial items to the DOM.
         * 
         * @returns {void}
         */
        loaded(): void {
            var context = this.context;
            this._container = this.element;

            if (!isArray(context)) {
                if (!isNull(context)) {
                    var _Exception = this._Exception;
                    _Exception.warn(this.type + ' context set to something other than an Array.', _Exception.CONTEXT);
                }
                return;
            }

            this._setAliases();
            this._addItems(context.length, 0);
            this._setListener();
        }

        /**
         * @name dispose
         * @memberof plat.ui.controls.ForEach
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
        }

        /**
         * @name _setAliases
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the alias tokens to use for all the items in the {@link plat.ui.controls.ForEach|ForEach} context array.
         * 
         * @returns {void}
         */
        protected _setAliases(): void {
            var optionsObj = this.options || <observable.IObservableProperty<IForEachOptions>>{},
                options = optionsObj.value || <IForEachOptions>{},
                aliases = options.aliases;

            if (!isObject(aliases)) {
                return;
            }

            var _aliases = this._aliases,
                keys = Object.keys(_aliases),
                length = keys.length,
                value: string;

            for (var i = 0; i < length; ++i) {
                value = aliases[keys[i]];

                if (isString(value)) {
                    _aliases[keys[i]] = value;
                }
            }
        }

        /**
         * @name _addItems
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Adds new items to the control's element when items are added to 
         * the array.
         * 
         * @param {number} numberOfItems The number of items to add.
         * @param {number} index The point in the array to start adding items.
         * @param {boolean} animate? Whether or not to animate the new items
         * 
         * @returns {plat.async.IThenable<void>} The itemsLoaded promise.
         */
        protected _addItems(numberOfItems: number, index: number, animate?: boolean): async.IThenable<void> {
            var max = +(index + numberOfItems),
                promises: Array<async.IThenable<DocumentFragment>> = [],
                initialIndex = index;

            while (index < max) {
                promises.push(this._bindItem(index++));
            }

            if (promises.length > 0) {
                this.itemsLoaded = this._Promise.all(promises).then<void>((templates): void => {
                    this._setBlockLength(templates);

                    if (animate === true) {
                        var length = templates.length;
                        for (var i = 0; i < length; ++i) {
                            this._appendAnimatedItem(templates[i], __Enter);
                        }
                    } else {
                        this._appendItems(templates);
                    }

                    this._updateResource(initialIndex - 1);

                    if (isFunction(this.__resolveFn)) {
                        this.__resolveFn();
                        this.__resolveFn = null;
                    }
                }).catch((error: any): void => {
                        postpone((): void => {
                            var _Exception = this._Exception;
                            _Exception.warn(error, _Exception.BIND);
                        });
                    });
            } else {
                if (isFunction(this.__resolveFn)) {
                    this.__resolveFn();
                    this.__resolveFn = null;
                }
                this.itemsLoaded = new this._Promise<void>((resolve): void => {
                    this.__resolveFn = resolve;
                });
            }

            return this.itemsLoaded;
        }

        /**
         * @name _appendItems
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Adds an Array of items to the element without animating.
         * 
         * @param {Array<Node>} items The Array of items to add.
         * 
         * @returns {void}
         */
        protected _appendItems(items: Array<Node>): void {
            appendChildren(items, this._container);
        }

        /**
         * @name _appendAnimatedItem
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Adds an item to the control's element animating its elements.
         * 
         * @param {DocumentFragment} item The HTML fragment representing a single item.
         * @param {string} key The animation key/type.
         * 
         * @returns {void}
         */
        protected _appendAnimatedItem(item: DocumentFragment, key: string): void {
            if (!isNode(item)) {
                return;
            }

            this._animator.enter(item, __Enter, this._container);
        }

        /**
         * @name _removeItems
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Removes items from the control's element.
         * 
         * @param {number} numberOfItems The number of items to remove.
         * 
         * @returns {void}
         */
        protected _removeItems(numberOfItems: number): void {
            var dispose = TemplateControl.dispose,
                controls = this.controls;

            while (numberOfItems-- > 0) {
                dispose(controls.pop());
            }

            this._updateResource(controls.length - 1);
        }

        /**
         * @name _bindItem
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Binds the item to a template at that index.
         * 
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves with 
         * the a DocumentFragment that represents an item.
         */
        protected _bindItem(index: number): async.IThenable<DocumentFragment> {
            return this.bindableTemplates.bind('item', index, this._getAliases(index));
        }

        /**
         * @name _setBlockLength
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the corresponding block length for animation.
         * 
         * @returns {void}
         */
        protected _setBlockLength(templates: Array<Node>): void {
            if (this._blockLength > 0 || templates.length === 0) {
                return;
            }

            this._blockLength = templates[0].childNodes.length;
        }

        /**
         * @name _updateResource
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Updates a child resource object when 
         * the array changes.
         * 
         * @param {number} index The control whose resources we will update.
         * 
         * @returns {void}
         */
        protected _updateResource(index: number): void {
            var controls = this.controls;
            if (index < 0 || index >= controls.length) {
                return;
            }

            controls[index].resources.add(this._getAliases(index));
        }

        /**
         * @name _setListener
         * @memberof plat.ui.controls.ForEach
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
                this.observeArray(this._preprocessEvent, this._executeEvent);
                this.__listenerSet = true;
            }
        }

        /**
         * @name _preprocessEvent
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Receives an event prior to a method being called on an array and maps the array 
         * method to its associated pre-method handler.
         * 
         * @param {plat.observable.IPreArrayChangeInfo} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _preprocessEvent(ev: observable.IPreArrayChangeInfo): void {
            var method = '_pre' + ev.method;
            if (isFunction((<any>this)[method])) {
                (<any>this)[method](ev);
            }
        }

        /**
         * @name _executeEvent
         * @memberof plat.ui.controls.ForEach
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
         * @name _getAliases
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Returns a resource alias object for an item in the array. The 
         * resource object contains index:number, even:boolean, odd:boolean, 
         * first:boolean, and last:boolean.
         * 
         * @param {number} index The index used to create the resource aliases.
         * 
         * @returns {plat.IObject<plat.ui.IResource>} An object consisting of {@link plat.ui.IResource|Resources}.
         */
        protected _getAliases(index: number): IObject<IResource> {
            var isEven = (index & 1) === 0,
                aliases: IObject<ui.IResource> = {},
                _aliases = this._aliases,
                type = __LITERAL_RESOURCE;

            aliases[_aliases.index] = {
                value: index,
                type: type
            };

            aliases[_aliases.even] = {
                value: isEven,
                type: type
            };

            aliases[_aliases.odd] = {
                value: !isEven,
                type: type
            };

            aliases[_aliases.first] = {
                value: index === 0,
                type: type
            };

            aliases[_aliases.last] = {
                value: index === (this.context.length - 1),
                type: type
            };

            return aliases;
        }

        /**
         * @name _push
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Handles items being pushed into the array.
         * 
         * @param {plat.observable.IPostArrayChangeInfo<any>} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _push(ev: observable.IPostArrayChangeInfo<any>): void {
            this._addItems(ev.arguments.length, ev.oldArray.length, true);
        }

        /**
         * @name _pop
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Handles items being popped off the array.
         * 
         * @param {plat.observable.IPostArrayChangeInfo<any>} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _pop(ev: observable.IPostArrayChangeInfo<any>): void {
            this._animateItems(ev.newArray.length, 1, __Leave, true);
            this._removeItems(1);
        }

        /**
         * @name _preshift
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Handles items being shifted off the array.
         * 
         * @param {plat.observable.IPreArrayChangeInfo} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _preshift(ev: observable.IPreArrayChangeInfo): void {
            this._animationThenable = this._animateItems(0, 1, __Leave, true);
        }

        /**
         * @name _shift
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Handles items being shifted off the array.
         * 
         * @param {plat.observable.IPostArrayChangeInfo<any>} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _shift(ev: observable.IPostArrayChangeInfo<any>): void {
            this._Promise.resolve(this._animationThenable).then(() => {
                this._removeItems(1);
            });
        }

        /**
         * @name _presplice
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Handles adding/removing items when an array is spliced.
         * 
         * @param {plat.observable.IPreArrayChangeInfo} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _presplice(ev: observable.IPreArrayChangeInfo): void {
            var args = ev.arguments,
                addCount = args.length - 2;

            // check if adding more items than deleting
            if (addCount > 0) {
                this._animateItems(args[0], addCount, __Enter);
                return;
            }

            var deleteCount = args[1];
            if (deleteCount > 0) {
                this._animationThenable = this._animateItems(args[0] + addCount, deleteCount - addCount, __Leave, true);
            }
        }

        /**
         * @name _splice
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Handles adding/removing items when an array is spliced.
         * 
         * @param {plat.observable.IPostArrayChangeInfo<any>} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _splice(ev: observable.IPostArrayChangeInfo<any>): void {
            var oldLength = this.controls.length,
                newLength = ev.newArray.length;

            this._Promise.resolve(this._animationThenable).then(() => {
                if (newLength > oldLength) {
                    this._addItems(newLength - oldLength, oldLength);
                } else if (oldLength > newLength) {
                    this._removeItems(oldLength - newLength);
                }
            });
        }

        /**
         * @name _preunshift
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Handles animating items being unshifted into the array.
         * 
         * @param {plat.observable.IPreArrayChangeInfo} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _preunshift(ev: observable.IPreArrayChangeInfo): void {
            this._animateItems(0, 1, __Enter);
        }

        /**
         * @name _unshift
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Handles items being unshifted into the array.
         * 
         * @param {plat.observable.IPostArrayChangeInfo<any>} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _unshift(ev: observable.IPostArrayChangeInfo<any>): void {
            this._addItems(ev.arguments.length, ev.oldArray.length);
        }

        /**
         * @name _sort
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Handles when the array is sorted.
         * 
         * @param {plat.observable.IPostArrayChangeInfo<any>} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _sort(ev: observable.IPostArrayChangeInfo<any>): void { }

        /**
         * @name _reverse
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Handles when the array is reversed.
         * 
         * @param {plat.observable.IPostArrayChangeInfo<any>} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _reverse(ev: observable.IPostArrayChangeInfo<any>): void { }

        /**
         * @name _animateItems
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Animates the indicated items.
         * 
         * @param {number} startIndex The starting index of items to animate.
         * @param {number} numberOfItems The number of consecutive items to animate.
         * @param {string} key The animation key/type.
         * @param {boolean} clone? Whether to clone the items and animate the clones or simply animate the items itself.
         * @param {boolean} cancel? Whether or not the animation should cancel all current animations. 
         * Defaults to true.
         * 
         * @returns {plat.ui.async.IThenable<void>} A promise that resolves when all animations are complete.
         */
        protected _animateItems(startIndex: number, numberOfItems: number, key: string, clone?: boolean,
            cancel?: boolean): async.IThenable<void> {
            var blockLength = this._blockLength;
            if (blockLength === 0) {
                return this._Promise.resolve();
            }

            var start = startIndex * blockLength;
            return this._initiateAnimation(start, numberOfItems * blockLength + start, key, clone, cancel);
        }

        /**
         * @name _initiateAnimation
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Animates a block of elements.
         * 
         * @param {number} startNode The starting childNode of the ForEach to animate.
         * @param {number} endNode The ending childNode of the ForEach to animate.
         * @param {string} key The animation key/type.
         * @param {boolean} clone? Whether to clone the items and animate the clones or simply animate the items itself.
         * @param {boolean} cancel? Whether or not the animation should cancel all current animations. 
         * Defaults to true.
         * 
         * @returns {plat.ui.async.IThenable<void>} A promise that resolves when all animations are complete.
         */
        protected _initiateAnimation(startNode: number, endNode: number, key: string, clone?: boolean,
            cancel?: boolean): async.IThenable<void> {
            if (cancel === false || isNull(this._currentAnimation)) {
                return this.__handleAnimation(startNode, endNode, key, clone);
            }

            return this._currentAnimation.cancel().then(() => {
                return this.__handleAnimation(startNode, endNode, key, clone);
            });
        }

        /**
         * @name __handleAnimation
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access private
         * 
         * @description
         * Handles the animation of a block of elements.
         * 
         * @param {number} startNode The starting childNode of the ForEach to animate
         * @param {number} endNode The ending childNode of the ForEach to animate
         * @param {string} key The animation key/type
         * @param {boolean} clone Whether to clone the items and animate the clones or simply animate the items itself.
         * 
         * @returns {plat.animations.IAnimationThenable<any>} The last element node's animation promise.
         */
        private __handleAnimation(startNode: number, endNode: number, key: string, clone: boolean): animations.IAnimationThenable<any> {
            var container = this._container,
                slice = Array.prototype.slice,
                nodes: Array<Node> = slice.call(container.childNodes, startNode, endNode);

            if (nodes.length === 0) {
                return this._animator.resolve();
            } else if (clone === true) {
                var referenceNode = nodes[nodes.length - 1].nextSibling,
                    animatedNodes = <DocumentFragment>appendChildren(nodes),
                    clonedNodes = animatedNodes.cloneNode(true),
                    removeNodes = slice.call(clonedNodes.childNodes);

                container.insertBefore(clonedNodes, referenceNode);
                return this._currentAnimation = this._animator.animate(removeNodes, key).then(() => {
                    while (removeNodes.length > 0) {
                        container.removeChild(removeNodes.pop());
                    }
                    container.insertBefore(animatedNodes, referenceNode);
                });
            }

            return this._currentAnimation = this._animator.animate(nodes, key);
        }
    }

    register.control(__ForEach, ForEach);

    /**
     * @name IForEachOptions
     * @memberof plat.ui.controls
     * @kind interface
     * 
     * @description
     * The {@link plat.observable.IObservableProperty|options} object for the 
     * {@link plat.ui.controls.ForEach|ForEach} control.
     */
    export interface IForEachOptions {
        /**
         * @name aliases
         * @memberof plat.ui.controls.IForEachOptions
         * @kind property
         * 
         * @type {plat.ui.controls.IForEachAliasOptions}
         * 
         * @description
         * Used to specify alternative alias tokens for the built-in foreach aliases.
         */
        aliases?: IForEachAliasOptions;
    }

    /**
     * @name IForEachAliasOptions
     * @memberof plat.ui.controls
     * @kind interface
     * 
     * @extends {plat.IObject<string>}
     * 
     * @description
     * The alias tokens for the {@link plat.ui.controls.IForEachOptions|ForEach options} object for the 
     * {@link plat.ui.controls.ForEach|ForEach} control.
     */
    export interface IForEachAliasOptions extends IObject<string> {
        /**
         * @name index
         * @memberof plat.ui.controls.IForEachAliasOptions
         * @kind property
         * 
         * @type {string}
         * 
         * @description
         * Used to specify an alternative alias for the index in a {@link plat.ui.controls.ForEach|ForEach} 
         * item template.
         */
        index?: string;

        /**
         * @name even
         * @memberof plat.ui.controls.IForEachAliasOptions
         * @kind property
         * 
         * @type {string}
         * 
         * @description
         * Used to specify an alternative alias for the even in a {@link plat.ui.controls.ForEach|ForEach} 
         * item template.
         */
        even?: string;

        /**
         * @name odd
         * @memberof plat.ui.controls.IForEachAliasOptions
         * @kind property
         * 
         * @type {string}
         * 
         * @description
         * Used to specify an alternative alias for the odd in a {@link plat.ui.controls.ForEach|ForEach} 
         * item template.
         */
        odd?: string;

        /**
         * @name first
         * @memberof plat.ui.controls.IForEachAliasOptions
         * @kind property
         * 
         * @type {string}
         * 
         * @description
         * Used to specify an alternative alias for the first in a {@link plat.ui.controls.ForEach|ForEach} 
         * item template.
         */
        first?: string;

        /**
         * @name last
         * @memberof plat.ui.controls.IForEachAliasOptions
         * @kind property
         * 
         * @type {string}
         * 
         * @description
         * Used to specify an alternative alias for the last in a {@link plat.ui.controls.ForEach|ForEach} 
         * item template.
         */
        last?: string;
    }
}
