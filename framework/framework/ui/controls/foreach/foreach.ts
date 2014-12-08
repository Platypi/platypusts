module plat.ui.controls {
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
        /**
         * @name $Animator
         * @memberof plat.ui.controls.ForEach
         * @kind property
         * @access public
         * 
         * @type {plat.ui.animations.IAnimator}
         * 
         * @description
         * Reference to the {@link plat.ui.animations.IAnimator|IAnimator} injectable.
         */
        $Animator: animations.IAnimator = acquire(__Animator);
        /**
         * @name $Promise
         * @memberof plat.ui.controls.ForEach
         * @kind property
         * @access public
         * 
         * @type {plat.async.IPromise}
         * 
         * @description
         * Reference to the {@link plat.async.IPromise|IPromise} injectable.
         */
        $Promise: async.IPromise = acquire(__Promise);

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
         * @type {Array<plat.ui.ITemplateControl>}
         * 
         * @description
         * The child controls of the control. All will be of type {@link plat.ui.ITemplateControl|ITemplateControl}.
         */
        controls: Array<ITemplateControl>;

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
         * The {@link plat.ui.controls.IForEachOptions|options} for the foreach control. 
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
         * the foreach control. 
         */
        _aliases: IForEachAliasOptions = {
            index: __forEachAliasOptions.index,
            even: __forEachAliasOptions.even,
            odd: __forEachAliasOptions.odd,
            first: __forEachAliasOptions.first,
            last: __forEachAliasOptions.last
        };

        /**
         * @name _blockLength
         * @memberof plat.ui.controls.ForEach
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The node length of the element's childNodes (innerHTML).
         */
        _blockLength = 0;

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
         * @name __currentAnimations
         * @memberof plat.ui.controls.ForEach
         * @kind property
         * @access private
         * 
         * @type {Array<plat.ui.animations.IAnimationThenable<any>>}
         * 
         * @description
         * An array to aggregate all current animation promises.
         */
        private __currentAnimations: Array<animations.IAnimationThenable<any>> = [];
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
            this.itemsLoaded = new this.$Promise<void>((resolve) => {
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
            var childNodes: Array<Node> = Array.prototype.slice.call(this.element.childNodes);
            this.bindableTemplates.add('item', childNodes);
        }

        /**
         * @name contextChanged
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access public
         * 
         * @description
         * Re-syncs the ForEach children controls and DOM with the new 
         * array.
         * 
         * @param {Array<any>} newValue? The new Array
         * @param {Array<any>} oldValue? The old Array
         * 
         * @returns {void}
         */
        contextChanged(newValue?: Array<any>, oldValue?: Array<any>): void {
            if (!isArray(newValue)) {
                return;
            }

            this._setListener();

            if (newValue.length === 0) {
                this._removeItems(this.controls.length);
                return;
            }

            this._setAliases();
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

            if (!isArray(context)) {
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
         * Sets the alias tokens to use for all the items in the foreach context array.
         * 
         * @returns {void}
         */
        _setAliases() {
            var options = this.options;

            if (!(isObject(options) && isObject(options.value) && isObject(options.value.aliases))) {
                return;
            }

            var aliases = options.value.aliases,
                _aliases = this._aliases,
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
         * @name _addItem
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Adds an item to the control's element.
         * 
         * @param {DocumentFragment} item The HTML fragment representing a single item
         * @param {boolean} animate? Whether or not to animate the entering item
         * 
         * @returns {void}
         */
        _addItem(item: DocumentFragment, animate?: boolean): void {
            var context = this.context;
            if (!isNode(item) ||
                !isArray(context) ||
                context.length === 0 ||
                this.controls.length === 0) {
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
         * @name _removeItem
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Removes an item from the control's element.
         * 
         * @returns {void}
         */
        _removeItem(): void {
            var controls = this.controls,
                length = controls.length - 1;

            TemplateControl.dispose(controls[length]);
        }

        /**
         * @name _updateResources
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Updates the control's children resource objects when 
         * the array changes.
         * 
         * @returns {void}
         */
        _updateResources(): void {
            var controls = this.controls,
                length = controls.length;

            for (var i = 0; i < length; ++i) {
                controls[i].resources.add(this._getAliases(i));
            }
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
        _setListener(): void {
            if (!this.__listenerSet) {
                this.observeArray(this, __CONTEXT, this._executeEvent);
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
         * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        _executeEvent(ev: observable.IArrayMethodInfo<any>): void {
            var method = '_' + ev.method;
            if (isFunction((<any>this)[method])) {
                (<any>this)[method](ev);
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
                this.itemsLoaded = this.$Promise.all(promises).then<void>(() => {
                    if (isFunction(this.__resolveFn)) {
                        this.__resolveFn();
                        this.__resolveFn = null;
                    }
                });
            } else {
                if (isFunction(this.__resolveFn)) {
                    this.__resolveFn();
                    this.__resolveFn = null;
                }
                this.itemsLoaded = new this.$Promise<void>((resolve) => {
                    this.__resolveFn = resolve;
                });
            }

            return this.itemsLoaded;
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
        _removeItems(numberOfItems: number): void {
            for (var i = 0; i < numberOfItems; ++i) {
                this._removeItem();
            }

            if (this.controls.length > 0) {
                this._updateResources();
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
         * @returns {plat.IObject<plat.ui.IResource>} An object consisting of {@link plat.ui.IResource|IResources}.
         */
        _getAliases(index: number): IObject<IResource> {
            var isEven = (index & 1) === 0,
                aliases: IObject<ui.IResource> = {},
                _aliases = this._aliases,
                type = __OBSERVABLE_RESOURCE;

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
         * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        _push(ev: observable.IArrayMethodInfo<any>): void {
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
         * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        _pop(ev: observable.IArrayMethodInfo<any>): void {
            var blockLength = this._blockLength,
                startNode: number,
                animationPromise: plat.ui.animations.IAnimationThenable<void>;

            if (blockLength > 0) {
                startNode = blockLength * ev.newArray.length;
                animationPromise = this._animateItems(startNode, undefined, __Leave);
            }

            if (isNull(animationPromise)) {
                this._removeItems(1);
                return;
            }

            this.itemsLoaded = animationPromise.then(() => {
                this._removeItems(1);
            });
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
         * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        _shift(ev: observable.IArrayMethodInfo<any>): void {
            this._removeItems(1);
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
         * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
         * 
         * @returns {void}
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
         * @name _unshift
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Handles items being unshifted into the array.
         * 
         * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        _unshift(ev: observable.IArrayMethodInfo<any>): void {
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
         * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        _sort(ev: observable.IArrayMethodInfo<any>): void { }

        /**
         * @name _reverse
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Handles when the array is reversed.
         * 
         * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
         * 
         * @returns {void}
         */
        _reverse(ev: observable.IArrayMethodInfo<any>): void { }

        /**
         * @name _animateItems
         * @memberof plat.ui.controls.ForEach
         * @kind function
         * @access protected
         * 
         * @description
         * Animates a block of elements.
         * 
         * @param {number} startNode The starting childNode of the ForEach to animate
         * @param {number} endNode The ending childNode of the ForEach to animate
         * @param {string} key The animation key/type
         * @param {boolean} cancel? Whether or not the animation should cancel all current animations. 
         * Defaults to true.
         * 
         * @returns {plat.ui.animations.IAnimationThenable<void>} A promise that resolves when all animations are complete.
         */
        _animateItems(startNode: number, endNode: number, key: string, cancel?: boolean): animations.IAnimationThenable<void> {
            var currentAnimations = this.__currentAnimations,
                length = currentAnimations.length;

            if (length === 0 || cancel === false) {
                return this.__handleAnimation(startNode, endNode, key);
            }

            var animationPromises: Array<animations.IAnimatingThenable> = [];
            while (length-- > 0) {
                animationPromises.push(currentAnimations[length].cancel());
            }

            return <animations.IAnimationThenable<void>>this.$Promise.all(animationPromises).then(() => {
                return this.__handleAnimation(startNode, endNode, key);
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
         * 
         * @returns {plat.ui.animations.IAnimationThenable<void>} The last element node's animation promise.
         */
        private __handleAnimation(startNode: number, endNode: number, key: string): animations.IAnimationThenable<void> {
            var nodes: Array<Node> = Array.prototype.slice.call(this.element.childNodes, startNode, endNode),
                node: Node,
                $animator = this.$Animator,
                currentAnimations = this.__currentAnimations,
                animationPromise: animations.IAnimationThenable<void>;

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
        first: string;


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
