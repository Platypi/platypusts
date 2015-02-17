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
         * @name _animate
         * @memberof plat.ui.controls.ForEach
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not to animate Array mutations.
         */
        protected _animate: boolean;

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
         * @name _addQueue
         * @memberof plat.ui.controls.ForEach
         * @kind property
         * @access protected
         * 
         * @type {Array<plat.async.IThenable<void>>}
         * 
         * @description
         * A queue representing all current add operations.
         */
        protected _addQueue: Array<async.IThenable<void>> = [];

        /**
         * @name _emptyInit
         * @memberof plat.ui.controls.ForEach
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the initial context value was null or empty.
         */
        protected _emptyInit = false;

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
         * @param {Array<any>} newValue The new Array
         * @param {Array<any>} oldValue The old Array
         * 
         * @returns {void}
         */
        contextChanged(newValue: Array<any>, oldValue: Array<any>): void {
            var emptyInit = this._emptyInit = isEmpty(oldValue);

            if (isEmpty(newValue)) {
                if (!emptyInit) {
                    this._Promise.all(this._addQueue).then((): void => {
                        this._removeItems(this.controls.length);
                    });
                }
                return;
            } else if (!isArray(newValue)) {
                var _Exception = this._Exception;
                _Exception.warn(this.type + ' context set to something other than an Array.', _Exception.CONTEXT);
                return;
            }

            this._setListener();
            this._executeEvent([{
                object: newValue || [],
                type: 'splice'
            }]);
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
            var optionsObj = this.options || (this.options = <observable.IObservableProperty<IForEachOptions>>{}),
                options = optionsObj.value || (optionsObj.value = <IForEachOptions>{}),
                context = this.context;

            this._container = this.element;
            this._animate = options.animate === true;

            if (!isArray(context)) {
                if (!isNull(context)) {
                    var _Exception = this._Exception;
                    _Exception.warn(this.type + ' context set to something other than an Array.', _Exception.CONTEXT);
                }
                return;
            }

            this._setAliases();
            var addQueue = this._addQueue;
            addQueue.push(this._addItems(context.length, 0).then((): void => {
                addQueue.shift();
            }));
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
         * Sets the alias tokens to use for all the items in the {@link plat.ui.controls.ForEach|ForEach} context Array.
         * 
         * @returns {void}
         */
        protected _setAliases(): void {
            var aliases = this.options.value.aliases;
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

            this._currentAnimation = this._animator.enter(item, __Enter, this._container);
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
                this.observeArray(this._executeEvent);
                this.__listenerSet = true;
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
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _executeEvent(changes: Array<observable.IArrayChanges<any>>): void {
            var method = '_' + changes[0].type;
            if (isFunction((<any>this)[method])) {
                (<any>this)[method](changes);
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
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _push(changes: Array<observable.IArrayChanges<any>>): void {
            this._cancelCurrentAnimation();

            var change = changes[0],
                addQueue = this._addQueue;
            addQueue.push(this._addItems(change.addedCount, change.index, this._animate).then((): void => {
                addQueue.shift();
            }));
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
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _pop(changes: Array<observable.IArrayChanges<any>>): void {
            var addQueue = this._addQueue,
                change = changes[0],
                start = change.object.length;
            if (change.removed.length === 0) {
                return;
            } else if (this._animate) {
                if (addQueue.length === 0) {
                    addQueue = addQueue.concat([this._animateItems(start, 1, __Leave, false)]);
                } else {
                    this._cancelCurrentAnimation();
                }
            }

            this._Promise.all(addQueue).then((): void => {
                this._removeItems(1);
            });
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
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _unshift(changes: Array<observable.IArrayChanges<any>>): void {
            this._cancelCurrentAnimation();

            var change = changes[0],
                addedCount = change.addedCount,
                _Promise = this._Promise,
                addQueue = this._addQueue;

            if (this._animate) {
                this._animateItems(0, addedCount, __Enter);
            }

            addQueue.push(this._addItems(addedCount, change.object.length - addedCount).then((): void => {
                addQueue.shift();
            }));
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
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _shift(changes: Array<observable.IArrayChanges<any>>): void {
            var addQueue = this._addQueue,
                change = changes[0];
            if (change.removed.length === 0) {
                return;
            } else if (this._animate) {
                if (addQueue.length === 0) {
                    addQueue = addQueue.concat([this._animateItems(0, 1, __Leave, true)]);
                } else {
                    this._cancelCurrentAnimation();
                }
            }

            this._Promise.all(addQueue).then((): void => {
                this._removeItems(1);
            });
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
         * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
         * 
         * @returns {void}
         */
        protected _splice(changes: Array<observable.IArrayChanges<any>>): void {
            this._cancelCurrentAnimation();

            var change = changes[0],
                addCount = change.addedCount;
            if (isNull(addCount)) {
                var newLength = change.object.length;
                this._Promise.all(this._addQueue).then((): void => {
                    var currentLength = this.controls.length;
                    if (newLength > currentLength) {
                        this._addItems(newLength - currentLength, currentLength);
                    } else if (currentLength > newLength) {
                        this._removeItems(currentLength - newLength);
                    }
                });
                return;
            }

            var removeCount = change.removed.length,
                addQueue = this._addQueue;
            if (addCount > removeCount) {
                var _Promise = this._Promise;
                if (this._animate) {
                    this._animateItems(change.index, addCount, __Enter);
                }
                addQueue.push(this._addItems(addCount - removeCount, change.object.length - addCount).then((): void => {
                    addQueue.shift();
                }));
            } else if (removeCount > addCount) {
                var adding = addCount > 0,
                    animating = this._animate;
                if (!adding && animating && addQueue.length === 0) {
                    addQueue = addQueue.concat([this._animateItems(change.index, removeCount, __Leave, true)]);
                }

                this._Promise.all(addQueue).then((): void => {
                    if (adding && animating) {
                        this._animateItems(change.index, addCount, __Enter);
                    }
                    this._removeItems(removeCount - addCount);
                });
            }
        }
        
        /**
         * @name _calculateBlockLength
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Grabs the total blocklength of the specified items.
         * 
         * @param {number} startIndex The starting index of items.
         * @param {number} numberOfItems The number of consecutive items.
         * 
         * @returns {number} The calculated block length.
         */
        protected _calculateBlockLength(startIndex?: number, numberOfItems?: number): number {
            return this._blockLength;
        }

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
         * @param {boolean} cloneContainer? Whether to clone the items and animate the clones or simply animate the items itself. If 
         * set to true, it will clone the whole container. If set to false, it will clone just the item being animated. If not set, 
         * it will not clone.
         * 
         * @returns {plat.ui.async.IThenable<void>} A promise that resolves when all animations are complete.
         */
        protected _animateItems(startIndex: number, numberOfItems: number, key: string, cloneContainer?: boolean): async.IThenable<void> {
            var blockLength = this._calculateBlockLength();
            if (blockLength === 0) {
                return this._Promise.resolve();
            }

            var start = startIndex * blockLength;
            if (cloneContainer === true) {
                return this._handleClonedContainerAnimation(start, numberOfItems * blockLength + start, key);
            } else if (cloneContainer === false) {
                return this._handleClonedItemAnimation(start, numberOfItems * blockLength + start, key);
            } else {
                return this._handleSimpleAnimation(start, numberOfItems * blockLength + start, key);
            }
        }

        /**
         * @name _handleSimpleAnimation
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Handles a simple animation of a block of elements.
         * 
         * @param {number} startNode The starting childNode of the ForEach to animate.
         * @param {number} endNode The ending childNode of the ForEach to animate.
         * @param {string} key The animation key/type.
         * 
         * @returns {plat.async.IThenable<void>} A promise that fulfills when the animation is complete.
         */
        protected _handleSimpleAnimation(startNode: number, endNode: number, key: string): async.IThenable<void> {
            var container = this._container,
                slice = Array.prototype.slice,
                nodes: Array<Node> = slice.call(container.childNodes, startNode, endNode);

            if (nodes.length === 0) {
                return this._Promise.resolve();
            }

            var currentAnimation = this._currentAnimation,
                callback = (): animations.IAnimationThenable<any> => {
                    return this._currentAnimation = this._animator.animate(nodes, key);
                };

            if (isNull(currentAnimation)) {
                return callback();
            }

            return currentAnimation.cancel().then(callback);
        }

        /**
         * @name _handleClonedItemAnimation
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Handles a simple animation of a block of elements.
         * 
         * @param {number} startNode The starting childNode of the ForEach to animate.
         * @param {number} endNode The ending childNode of the ForEach to animate.
         * @param {string} key The animation key/type.
         * 
         * @returns {plat.async.IThenable<void>} A promise that fulfills when the animation is complete and both  
         * the cloned item has been removed and the original item has been put back.
         */
        protected _handleClonedItemAnimation(startNode: number, endNode: number, key: string): async.IThenable<void> {
            var container = this._container,
                slice = Array.prototype.slice,
                nodes: Array<Node> = slice.call(container.childNodes, startNode, endNode);

            if (nodes.length === 0) {
                return this._Promise.resolve();
            }

            var referenceNode = nodes[nodes.length - 1].nextSibling,
                animatedNodes = <DocumentFragment>appendChildren(nodes),
                clonedNodes = animatedNodes.cloneNode(true),
                removeNodes: Array<Node> = slice.call(clonedNodes.childNodes),
                currentAnimation = this._currentAnimation,
                callback = (): animations.IAnimationThenable<void> => {
                    return this._currentAnimation = this._animator.animate(removeNodes, key).then((): void => {
                        referenceNode = removeNodes[removeNodes.length - 1].nextSibling;
                        while (removeNodes.length > 0) {
                            container.removeChild(removeNodes.pop());
                        }
                        container.insertBefore(animatedNodes, referenceNode);
                    });
                };

            container.insertBefore(clonedNodes, referenceNode);
            if (isNull(currentAnimation)) {
                return callback();
            }

            return currentAnimation.cancel().then(callback);
        }

        /**
         * @name _handleClonedItemAnimation
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Handles a simple animation of a block of elements.
         * 
         * @param {number} startNode The starting childNode of the ForEach to animate.
         * @param {number} endNode The ending childNode of the ForEach to animate.
         * @param {string} key The animation key/type.
         * 
         * @returns {plat.async.IThenable<void>} A promise that fulfills when the animation is complete and both  
         * the cloned container has been removed and the original container has been put back.
         */
        protected _handleClonedContainerAnimation(startNode: number, endNode: number, key: string): async.IThenable<void> {
            var container = this._container,
                clonedContainer = container.cloneNode(true),
                slice = Array.prototype.slice,
                nodes: Array<Node> = slice.call(clonedContainer.childNodes, startNode, endNode);

            if (nodes.length === 0) {
                return this._Promise.resolve();
            }

            var parentNode = container.parentNode;
            if (isNull(parentNode)) {
                return this._Promise.resolve();
            }

            var currentAnimation = this._currentAnimation,
                callback = (): animations.IAnimationThenable<void> => {
                    if (currentAnimation !== this._currentAnimation) {
                        parentNode.replaceChild(container, clonedContainer);
                        return;
                    }
                    return this._currentAnimation = this._animator.animate(nodes, key).then((): void => {
                        parentNode.replaceChild(container, clonedContainer);
                    });
                };

            parentNode.replaceChild(clonedContainer, container);
            if (isNull(currentAnimation)) {
                return callback();
            }

            return currentAnimation.cancel().then(callback);
        }

        /**
         * @name _cancelCurrentAnimation
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Cancels the current animation and sets the reference to null.
         * 
         * @returns {void}
         */
        protected _cancelCurrentAnimation(): void {
            if (this._animate && !isNull(this._currentAnimation)) {
                this._currentAnimation.cancel();
                this._currentAnimation = null;
            }
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
         * @name animate
         * @memberof plat.ui.controls.IForEachOptions
         * @kind property
         * 
         * @type {boolean}
         * 
         * @description
         * Will animate the Array mutations if set to true.
         */
        animate?: boolean;

        /**
         * @name aliases
         * @memberof plat.ui.controls.IForEachOptions
         * @kind property
         * 
         * @type {plat.ui.controls.IForEachAliasOptions}
         * 
         * @description
         * Used to specify alternative alias tokens for the built-in control aliases.
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
