/**
 * @name observable
 * @memberof plat
 * @kind namespace
 * @access public
 * 
 * @description
 * Holds all classes and interfaces related to observable components in platypus.
 */
module plat.observable {
    /**
     * @name arrayMethods
     * @memberof plat.observable
     * @kind property
     * @access private
     * @static
     * @exported false
     * 
     * @type {Array<string>}
     * 
     * @description
     * The array methods to be overwritten if it is to be observed.
     */
    var arrayMethods = ['push', 'pop', 'reverse', 'shift', 'sort', 'splice', 'unshift'];
    
    /**
     * @name ContextManager
     * @memberof plat.observable
     * @kind class
     * 
     * @implements {plat.observable.IContextManager}
     * 
     * @description
     * A class for managing both context inheritance and observable properties on controls and 
     * facilitating in data-binding.
     */
    export class ContextManager implements IContextManager {
        /**
         * @name observedArrayListeners
         * @memberof plat.observable.ContextManager
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.IObject<plat.IObject<Array<(ev: plat.observable.IArrayMethodInfo<any>) => void>>>}
         * 
         * @description
         * A set of functions to be fired when a particular observed array is mutated.
         */
        static observedArrayListeners: IObject<IObject<Array<(ev: IArrayMethodInfo<any>) => void>>> = {};
        
        /**
         * @name getManager
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Gets the {@link plat.observable.IContextManager|IContextManager} associated to the given control. If no 
         * {@link plat.observable.IContextManager|IContextManager} exists, one is created for that control.
         * 
         * @param {plat.IControl} control The control on which to locate the {@link plat.observable.IContextManager|IContextManager}.
         * 
         * @returns {plat.observable.IContextManager} The {@link plat.observable.IContextManager|IContextManager} 
         * associated with the input control.
         */
        static getManager(control: IControl): IContextManager {
            var contextManager: IContextManager,
                managers = ContextManager.__managers,
                uid = control.uid,
                manager = managers[uid];

            if (!isNull(manager)) {
                contextManager = manager;
                return contextManager;
            }

            contextManager = managers[uid] = new ContextManager();
            contextManager.context = control;

            return contextManager;
        }
        
        /**
         * @name dispose
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Removes all the listeners for a given control's unique ID.
         * 
         * @param {plat.IControl} control The control whose manager is being disposed.
         * @param {boolean} persist? Whether or not the control's context needs to 
         * be persisted post-disposal or can be set to null.
         * 
         * @returns {void}
         */
        static dispose(control: IControl, persist?: boolean): void;
        static dispose(control: ui.ITemplateControl, persist?: boolean): void {
            if (isNull(control)) {
                return;
            }

            var uid = control.uid,
                controls = ContextManager.__controls,
                identifiers = controls[uid] || {},
                managers = ContextManager.__managers,
                manager = managers[uid];

            if (!isNull(manager)) {
                manager.dispose();
                deleteProperty(managers, uid);
            }

            var keys = Object.keys(identifiers),
                listeners: Array<IRemoveListener>;

            while (keys.length > 0) {
                listeners = identifiers[keys.shift()];
                while (listeners.length > 0) {
                    listeners.shift()();
                }
            }

            deleteProperty(controls, uid);

            if (!isNull(control.context)) {
                ContextManager.defineProperty(control, __CONTEXT,
                    persist === true ? _clone(control.context, true) : null, true, true);
            }
        }
        
        /**
         * @name removeArrayListeners
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Removes all listeners for an Array associated with a given uid.
         * 
         * @param {string} absoluteIdentifier The identifier used to locate the array.
         * @param {string} uid The uid used to search for listeners.
         * 
         * @returns {void}
         */
        static removeArrayListeners(absoluteIdentifier: string, uid: string): void {
            var listeners = ContextManager.observedArrayListeners[absoluteIdentifier];

            if (!isNull(listeners)) {
                deleteProperty(listeners, uid);
            }
        }
        
        /**
         * @name getContext
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Safely retrieves the local context given a root context and an Array of
         * property strings.
         * 
         * @param {any} rootContext The root object in which to find a local context.
         * @param {Array<string>} split The string array containing properties used to index into 
         * the rootContext.
         * 
         * @returns {any} The narrowed down context.
         */
        static getContext(rootContext: any, split: Array<string>): any {
            if (isNull(rootContext)) {
                return rootContext;
            }

            split = split.slice(0);
            while (split.length > 0) {
                rootContext = rootContext[split.shift()];
                if (isNull(rootContext)) {
                    return rootContext;
                }
            }

            return rootContext;
        }
        
        /**
         * @name defineProperty
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Defines an object property with the associated value. Useful for unobserving objects.
         * 
         * @param {any} obj The object on which to define the property.
         * @param {string} key The property key.
         * @param {any} value The value used to define the property.
         * @param {boolean} enumerable? Whether or not the property should be enumerable (able to be iterated 
         * over in a loop)
         * @param {boolean} configurable? Whether or not the property is able to be reconfigured.
         * 
         * @returns {void}
         */
        static defineProperty(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean): void {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: enumerable === true,
                configurable: configurable === true
            });
        }
        
        /**
         * @name defineGetter
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Defines an object property with the associated value. Useful for unobserving objects.
         * 
         * @param {any} obj The object on which to define the property.
         * @param {string} key The property key.
         * @param {any} value The value used to define the property.
         * @param {boolean} enumerable? Whether or not the property should be enumerable (able to be iterated 
         * over in a loop)
         * @param {boolean} configurable? Whether or not the property is able to be reconfigured.
         * 
         * @returns {void}
         */
        static defineGetter(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean): void {
            Object.defineProperty(obj, key, {
                get: () => value,
                enumerable: enumerable === true,
                configurable: configurable === true
            });
        }
        
        /**
         * @name pushRemoveListener
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Pushes the function for removing an observed property upon adding the property.
         * 
         * @param {string} identifer The identifier for which the remove listener is being pushed.
         * @param {string} uid The unique ID of the control observing the identifier.
         * @param {plat.IRemoveListener} listener The function for removing the observed property.
         * 
         * @returns {void}
         */
        static pushRemoveListener(identifier: string, uid: string, listener: IRemoveListener): void {
            var controls = ContextManager.__controls,
                control = controls[uid],
                listeners: Array<IRemoveListener>;

            if (isNull(control)) {
                control = controls[uid] = {};
            }

            listeners = control[identifier];

            if (isNull(listeners)) {
                listeners = control[identifier] = [];
            }

            listeners.push(listener);
        }
        
        /**
         * @name spliceRemoveListener
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Splices a given function for removing an observed property.
         * 
         * @param {string} identifer The identifier for which the remove listener is being spliced.
         * @param {string} uid The unique ID of the control observing the identifier.
         * @param {plat.IRemoveListener} listener The function for removing the observed property.
         * 
         * @returns {void}
         */
        static spliceRemoveListener(identifier: string, uid: string, listener: IRemoveListener): void {
            var controls = ContextManager.__controls,
                control = controls[uid],
                listeners: Array<IRemoveListener>;

            if (isNull(control)) {
                return;
            }

            listeners = control[identifier];

            if (isNull(listeners)) {
                return;
            }

            var index = listeners.indexOf(listener);
            if (index === -1) {
                return;
            }

            listeners.splice(index, 1);
        }
        
        /**
         * @name removeIdentifier
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Removes a specified identifier from being observed for a given set of control IDs.
         * 
         * @param {Array<string>} uids The set of unique Ids for which to remove the specified identifier.
         * @param {string} identifier The identifier to stop observing.
         * 
         * @returns {void}
         */
        static removeIdentifier(uids: Array<string>, identifier: string): void {
            var length = uids.length,
                controls = ContextManager.__controls,
                identifiers: IObject<Array<IRemoveListener>>;

            for (var i = 0; i < length; ++i) {
                identifiers = controls[uids[i]];

                if (isNull(identifiers)) {
                    continue;
                }

                deleteProperty(identifiers, identifier);
            }
        }
        
        /**
         * @name createContext
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Ensures that an identifier path will exist on a given control. Will create 
         * objects/arrays if necessary.
         * 
         * @param {plat.ui.ITemplateControl} control The {@link plat.ui.ITemplateControl|ITemplateControl} 
         * on which to create the context.
         * @param {string} identifier The period-delimited identifier string used to create 
         * the context path.
         * 
         * @returns {any} The newly created context object.
         */
        static createContext(control: ui.ITemplateControl, identifier: string): any {
            var context = control.context;

            if (!isObject(context)) {
                if (isNull(context)) {
                    context = control.context = {};
                } else {
                    var Exception: IExceptionStatic = acquire(__ExceptionStatic);
                    Exception.warn('A child control is trying to create a child context that has ' +
                        'a parent control with a primitive type context', Exception.BIND);
                    return;
                }
            }

            var split = identifier.split('.'),
                property: string,
                temp: any;

            while (split.length > 0) {
                property = split.shift();

                temp = context[property];

                if (isNull(temp)) {
                    if (isNumber(Number(split[0]))) {
                        temp = context[property] = [];
                    } else {
                        temp = context[property] = {};
                    }
                }

                context = temp;
            }

            return context;
        }
        
        /**
         * @name __managers
         * @memberof plat.observable.ContextManager
         * @kind property
         * @access private
         * @static
         * 
         * @type {plat.IObject<plat.observable.IContextManager>}
         * 
         * @description
         * An object for quickly accessing a previously created {@link plat.observable.IContextManager|IContextManager}.
         */
        private static __managers: IObject<IContextManager> = {};
        /**
         * @name __controls
         * @memberof plat.observable.ContextManager
         * @kind property
         * @access private
         * @static
         * 
         * @type {plat.IObject<plat.IObject<Array<plat.IRemoveListener>>>}
         * 
         * @description
         * An object for storing functions to remove listeners for observed identifiers.
         */
        private static __controls: IObject<IObject<Array<IRemoveListener>>> = {};
        
        /**
         * @name $Compat
         * @memberof plat.observable.ContextManager
         * @kind property
         * @access public
         * 
         * @type {plat.ICompat}
         * 
         * @description
         * Reference to the {@link plat.ICompat|ICompat} injectable.
         */
        $Compat: ICompat = acquire(__Compat);
        
        /**
         * @name context
         * @memberof plat.observable.ContextManager
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * The root context associated with and to be managed by this 
         * {@link plat.observable.IContextManager|IContextManager}.
         */
        context: any;
        
        /**
         * @name __identifiers
         * @memberof plat.observable.ContextManager
         * @kind property
         * @access private
         * 
         * @type {plat.IObject<Array<plat.observable.IListener>>}
         * 
         * @description
         * An object for quickly accessing callbacks associated with a given identifier.
         */
        private __identifiers: IObject<Array<IListener>> = {};
        /**
         * @name __identifierHash
         * @memberof plat.observable.ContextManager
         * @kind property
         * @access private
         * 
         * @type {plat.IObject<Array<string>>}
         * 
         * @description
         * An object for quickly accessing child context associations (helps with 
         * notifying child properties).
         */
        private __identifierHash: IObject<Array<string>> = {};
        /**
         * @name __lengthListeners
         * @memberof plat.observable.ContextManager
         * @kind property
         * @access private
         * 
         * @type {plat.IObject<plat.observable.IListener>}
         * 
         * @description
         * An object for storing listeners for Array length changes.
         */
        private __lengthListeners: IObject<IListener> = {};
        /**
         * @name __contextObjects
         * @memberof plat.observable.ContextManager
         * @kind property
         * @access private
         * 
         * @type {plat.IObject<any>}
         * 
         * @description
         * An object for quickly accessing previously accessed or observed objects and properties.
         */
        private __contextObjects: IObject<any> = {};
        /**
         * @name __isArrayFunction
         * @memberof plat.observable.ContextManager
         * @kind property
         * @access private
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the property currently being modified is due to an observed array function.
         */
        private __isArrayFunction = false;
        /**
         * @name __observedIdentifier
         * @memberof plat.observable.ContextManager
         * @kind property
         * @access private
         * 
         * @type {string}
         * 
         * @description
         * If attempting to observe a property that is already being observed, this will be set to the 
         * already observed identifier.
         */
        private __observedIdentifier: string;
        
        /**
         * @name getContext
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access public
         * 
         * @description
         * Safely retrieves the local context for this manager given an Array of
         * property strings.
         * 
         * @param {Array<string>} split The string array containing properties used to index into
         * the context.
         * 
         * @returns {any} The obtained context.
         */
        getContext(split: Array<string>): any {
            var join = split.join('.'),
                context = this.__contextObjects[join];

            if (isNull(context)) {
                context = this.__contextObjects[join] = this._getImmediateContext(join);
            }

            return context;
        }
        
        /**
         * @name observe
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access public
         * 
         * @description
         * Given a period-delimited identifier, observes an object and calls the given listener when the 
         * object changes.
         * 
         * @param {string} absoluteIdentifier The period-delimited identifier noting the property to be observed.
         * @param {plat.observable.IListener} observableListener An object implmenting IObservableListener. The listener will be 
         * notified of object changes.
         * 
         * @returns {plat.IRemoveListener} A function to stop observing the object identified by the absoluteIdentifier.
         */
        observe(absoluteIdentifier: string, observableListener: IListener): IRemoveListener {
            if (isEmpty(absoluteIdentifier)) {
                return noop;
            }

            var split = absoluteIdentifier.split('.'),
                key = split.pop(),
                hasIdentifier = this._hasIdentifier(absoluteIdentifier),
                hasObservableListener = !isNull(observableListener),
                join: string,
                context: any;

            if (split.length > 0) {
                join = split.join('.');
                context = this.__contextObjects[join];
                if (isNull(context)) {
                    context = this.__contextObjects[join] = this._getImmediateContext(join);
                }
            } else {
                join = key;
                context = this.context;
            }

            if (!isObject(context)) {
                if (hasObservableListener) {
                    if (key === 'length') {
                        this.__lengthListeners[absoluteIdentifier] = observableListener;
                        ContextManager.pushRemoveListener(absoluteIdentifier, uid, () => {
                            deleteProperty(this.__lengthListeners, absoluteIdentifier);
                        });
                    }
                    return this._addObservableListener(absoluteIdentifier, observableListener);
                }

                return noop;
            }

            // set observedIdentifier to null
            this.__observedIdentifier = null;

            this.__contextObjects[absoluteIdentifier] = context[key];

            // if observedIdentifier is not null, the primitive is already being watched
            var observedIdentifier = this.__observedIdentifier,
                isObserved = !isNull(observedIdentifier),
                removeCallback = noop;
            if (isObserved) {
                hasIdentifier = true;
            }

            if (hasObservableListener) {
                var removeObservedCallback = noop,
                    removeAbsoluteCallback = this._addObservableListener(absoluteIdentifier, observableListener);

                if (isObserved && absoluteIdentifier !== observedIdentifier) {
                    removeObservedCallback = this._addObservableListener(observedIdentifier, observableListener);
                }

                removeCallback = () => {
                    removeAbsoluteCallback();
                    removeObservedCallback();
                };
            }

            // check if value is defined and context manager hasn't seen this identifier
            if (!hasIdentifier) {
                if (key === 'length' && isArray(context)) {
                    var property = split.pop(),
                        parentContext = this.getContext(split),
                        uid = observableListener.uid;

                    this.__observedIdentifier = null;
                    access(parentContext, property);

                    if (isString(this.__observedIdentifier)) {
                        join = this.__observedIdentifier;
                    }

                    var removeObservableListener = removeCallback,
                        removeListener = this.observeArray(uid, noop, join, context, null),
                        removeArrayObserve = this.observe(join, {
                            uid: uid,
                            listener: (newValue: Array<any>, oldValue: Array<any>) => {
                                removeListener();
                                removeListener = this.observeArray(uid, noop, join, newValue, oldValue);
                            }
                        });

                    removeCallback = () => {
                        removeObservableListener();
                        removeArrayObserve();
                        removeListener();
                    };
                } else {
                    this._define(absoluteIdentifier, context, key);
                }
            }

            return removeCallback;
        }

        /**
         * @name observeArray
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access public
         * 
         * @description
         * Observes an array and calls the listener when certain functions are called on 
         * that array. The watched functions are push, pop, shift, splice, unshift, sort, 
         * and reverse.
         * 
         * @param {string} uid The unique ID of the object observing the array.
         * @param {(ev: plat.observable.IArrayMethodInfo<any>) => void} listener The callback for when an observed Array 
         * function has been called.
         * @param {string} absoluteIdentifier The identifier from the root context used to find the array.
         * @param {Array<any>} array The array to be observed.
         * @param {Array<any>} oldArray The old array to stop observing.
         * 
         * @returns {plat.IRemoveListener} A function to stop observing the array identified by the absoluteIdentifier.
         */
        observeArray(uid: string, listener: (ev: IArrayMethodInfo<any>) => void,
            absoluteIdentifier: string, array: Array<any>, oldArray: Array<any>): IRemoveListener {
            var length = arrayMethods.length,
                method: string,
                i: number,
                $compat = this.$Compat,
                proto = $compat.proto,
                setProto = $compat.setProto;

            if (isArray(oldArray)) {
                this._restoreArray(oldArray);
            }

            if (isNull(array)) {
                return noop;
            }

            var split = absoluteIdentifier.split('.'),
                property = split.pop(),
                context = this.getContext(split);

            this.__observedIdentifier = null;
            access(context, property);

            if (isString(this.__observedIdentifier)) {
                absoluteIdentifier = this.__observedIdentifier;
            }

            var observedArrayListeners = ContextManager.observedArrayListeners,
                observedArrayCallbacks = observedArrayListeners[absoluteIdentifier];

            if (isNull(observedArrayCallbacks)) {
                observedArrayCallbacks = observedArrayListeners[absoluteIdentifier] = {};
            }

            var arrayCallbacks = observedArrayCallbacks[uid];

            if (isNull(arrayCallbacks)) {
                arrayCallbacks = observedArrayCallbacks[uid] = [];
            }

            var listenerRemoved = false,
                removeListener = () => {
                    if (listenerRemoved) {
                        return;
                    }

                    listenerRemoved = true;
                    ContextManager.spliceRemoveListener(absoluteIdentifier, uid, removeListener);

                    var index = arrayCallbacks.indexOf(listener);
                    if (index === -1) {
                        return;
                    }

                    arrayCallbacks.splice(index, 1);
                    if (arrayCallbacks.length === 0) {
                        deleteProperty(observedArrayCallbacks, uid);
                        if (isEmpty(observedArrayCallbacks)) {
                            deleteProperty(observedArrayListeners, absoluteIdentifier);
                        }
                    }
                };

            arrayCallbacks.push(listener);
            ContextManager.pushRemoveListener(absoluteIdentifier, uid, removeListener);

            this._overwriteArray(absoluteIdentifier, array);

            return removeListener;
        }
        
        /**
         * @name dispose
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access public
         * 
         * @description
         * Disposes the memory for an {@link plat.observable.IContextManager|IContextManager}.
         * 
         * @returns {void}
         */
        dispose(): void {
            this.context = null;
            this.__identifiers = {};
            this.__identifierHash = {};
            this.__contextObjects = {};
        }
        
        /**
         * @name _restoreArray
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access protected
         * 
         * @description
         * Restores an array to use Array.prototype instead of listener functions. 
         * 
         * @param {Array<any>} array The array to restore.
         * 
         * @returns {void}
         */
        protected _restoreArray(array: Array<any>) {
            var $compat = this.$Compat;

            if ($compat.setProto) {
                (<any>Object).setPrototypeOf(array, Object.create(Array.prototype));
            } else if ($compat.proto) {
                (<any>array).__proto__ = Object.create(Array.prototype);
            } else {
                var length = arrayMethods.length,
                    method: string;

                for (var i = 0; i < length; ++i) {
                    method = arrayMethods[i];
                    (<any>array)[method] = (<any>Array.prototype)[method];
                }
            }
        }

        /**
         * @name _overwriteArray
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access protected
         * 
         * @description
         * Overwrites an Array's prototype to observe mutation functions.
         * 
         * @param {string} absoluteIdentifier The identifier for the Array off context.
         * @param {Array<any>} array The array to overwrite.
         * 
         * @returns {void}
         */
        protected _overwriteArray(absoluteIdentifier: string, array: Array<any>) {
            var $compat = this.$Compat,
                length = arrayMethods.length,
                method: string,
                i: number;

            if ($compat.proto) {
                var obj = Object.create(Array.prototype);

                for (i = 0; i < length; ++i) {
                    method = arrayMethods[i];
                    obj[method] = this._overwriteArrayFunction(absoluteIdentifier, method);
                }

                if ($compat.setProto) {
                    (<any>Object).setPrototypeOf(array, obj);
                } else {
                    (<any>array).__proto__ = obj;
                }

                return;
            }

            for (i = 0; i < length; ++i) {
                method = arrayMethods[i];
                ContextManager.defineProperty(array, method,
                    this._overwriteArrayFunction(absoluteIdentifier, method), false, true);
            }
        }

        /**
         * @name _getImmediateContext
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access protected
         * 
         * @description
         * Gets the immediate context of identifier by splitting on "." 
         * and observes the objects along the way.
         * 
         * @param {string} identifier The identifier being observed.
         * 
         * @returns {any} The immediate context denoted by the identifier.
         */
        protected _getImmediateContext(identifier: string): any {
            if (isNull(this.__identifiers[identifier])) {
                this.observe(identifier, null);
            }

            var split = identifier.split('.'),
                context = this.context;

            while (split.length > 0) {
                context = context[split.shift()];
                if (isNull(context)) {
                    break;
                }
            }

            return context;
        }
        
        /**
         * @name _getValues
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access protected
         * 
         * @description
         * Obtains the old value and new value of a given context 
         * property on a property changed event.
         * 
         * @param {Array<string>} split The split identifier of the property that changed.
         * @param {any} newRootContext The new context.
         * @param {any} oldRootContext The old context.
         * 
         * @returns {{ newValue: any; oldValue: any; }} An object containing the old value and new value of a 
         * property upon a potential context change.
         */
        protected _getValues(split: Array<string>, newRootContext: any, oldRootContext: any): { newValue: any; oldValue: any; } {
            var property: string,
                doNew = true,
                doOld = true;

            while (split.length > 1) {
                property = split.shift();
                if (doNew) {
                    newRootContext = newRootContext[property];
                    if (isNull(newRootContext)) {
                        doNew = false;
                    }
                }
                if (doOld) {
                    oldRootContext = oldRootContext[property];
                    if (isNull(oldRootContext)) {
                        doOld = false;
                    }
                }

                if (!(doNew || doOld)) {
                    return null;
                }
            }

            property = split[0];

            var newValue: any,
                oldValue: any;

            if (!isNull(newRootContext)) {
                newValue = newRootContext[property];
            }

            if (!isNull(oldRootContext)) {
                oldValue = oldRootContext[property];
            }

            return {
                newValue: newValue,
                oldValue: oldValue
            };
        }
        
        /**
         * @name _notifyChildProperties
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access protected
         * 
         * @description
         * Notifies all child properties being observed that a parent property 
         * has changed.
         * 
         * @param {string} identifier The identifier for the property that changed.
         * @param {any} newValue The new value of the property.
         * @param {any} oldValue The old value of the property.
         * 
         * @returns {void}
         */
        protected _notifyChildProperties(identifier: string, newValue: any, oldValue: any): void {
            var mappings = this.__identifierHash[identifier];

            if (isNull(mappings)) {
                return;
            }

            var length = mappings.length,
                binding: string,
                property: string,
                parentProperty: string,
                split: Array<string>,
                values: IObject<any> = {},
                value: any,
                key: string,
                start = identifier.length + 1,
                newParent: any,
                oldParent: any,
                newChild: any,
                oldChild: any;

            if (length === 0) {
                deleteProperty(this.__identifierHash, identifier);
                return;
            }

            for (var i = 0; i < length; ++i) {
                binding = mappings[i];
                property = binding.slice(start);
                split = property.split('.');
                key = split.pop();
                parentProperty = split.join('.');

                if (isEmpty(parentProperty)) {
                    newParent = newValue;
                    oldParent = oldValue;
                    newChild = isNull(newParent) ? undefined : newParent[key];
                    oldChild = isNull(oldParent) ? undefined : oldParent[key];

                    if (key === 'length' && !isArray(oldParent) && isArray(newParent)) {
                        var lengthListener = this.__lengthListeners[binding];
                        if (!isNull(lengthListener)) {
                            var uid = lengthListener.uid,
                                arraySplit = identifier.split('.'),
                                arrayKey = arraySplit.pop(),
                                arrayParent = this.getContext(arraySplit),
                                join: string;

                            this.__observedIdentifier = null;
                            access(arrayParent, arrayKey);

                            join = isString(this.__observedIdentifier) ? this.__observedIdentifier : arraySplit.join('.');
                            var removeListener = this.observeArray(uid, noop, join, newParent, null);
                            this.observe(join, {
                                uid: uid,
                                listener: (nValue: Array<any>, oValue: Array<any>) => {
                                    removeListener();
                                    removeListener = this.observeArray(uid, noop, join, nValue, oValue);
                                }
                            });

                            deleteProperty(this.__lengthListeners, binding);
                        }
                    }
                } else {
                    value = values[parentProperty];

                    if (isNull(value)) {
                        value = values[parentProperty] = this._getValues(split, newValue, oldValue);

                        if (isNull(value)) {
                            this._execute(binding, null, null);
                            continue;
                        }
                    }

                    newParent = value.newValue;
                    oldParent = value.oldValue;
                    newChild = isNull(newParent) ? undefined : newParent[key];
                    oldChild = isNull(oldParent) ? undefined : oldParent[key];
                }

                values[property] = {
                    newValue: newChild,
                    oldValue: oldChild
                };

                if (isObject(newParent) && (!isArray(newParent) || newParent.length > key)) {
                    this._define(binding, newParent, key);
                }

                this._execute(binding, newChild, oldChild);
            }

            values = null;
        }
        
        /**
         * @name _addObservableListener
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access protected
         * 
         * @description
         * Adds a listener to be fired for a particular identifier.
         * 
         * @param {string} absoluteIdentifier The identifier being observed.
         * @param {plat.observable.IListener} observableListener The function and associated unique ID to be fired 
         * for this identifier.
         * 
         * @returns {plat.IRemoveListener} A function for removing the given listener for the given absoluteIdentifier.
         */
        protected _addObservableListener(absoluteIdentifier: string, observableListener: IListener): IRemoveListener {
            var remove = () => {
                    this._removeCallback(absoluteIdentifier, observableListener);
                },
                split = absoluteIdentifier.split('.'),
                property = split.pop(),
                isLength = property === 'length',
                context: any;

            if (isLength) {
                property = split.pop();
                context = this.getContext(split);
            }

            if (isObject(context)) {
                this.__observedIdentifier = null;
                access(context, property);

                if (isString(this.__observedIdentifier)) {
                    absoluteIdentifier = this.__observedIdentifier + (isLength ? '.length' : '');
                }
            }

            this.__add(absoluteIdentifier, observableListener);

            ContextManager.pushRemoveListener(absoluteIdentifier, observableListener.uid, remove);

            return remove;
        }
        
        /**
         * @name _define
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access protected
         * 
         * @description
         * Observes a property on a given context specified by an identifier.
         * 
         * @param {string} identifier The full identifier path for the property being observed.
         * @param {any} immediateContext The object whose property will be observed.
         * @param {string} key The property key for the value on the immediateContext that's 
         * being observed.
         * 
         * @returns {void}
         */
        protected _define(identifier: string, immediateContext: any, key: string): void {
            if (isObject(immediateContext[key])) {
                this.__defineObject(identifier, immediateContext, key);
            } else {
                this.__definePrimitive(identifier, immediateContext, key);
            }
        }
        
        /**
         * @name _overwriteArrayFunction
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access protected
         * 
         * @description
         * Intercepts an array function for observation.
         * 
         * @param {string} absoluteIdentifier The full identifier path for the observed array.
         * @param {string} method The array method being called.
         * 
         * @returns {(...args: any[]) => any} A function that acts as an intercept for an observed 
         * array function.
         */
        protected _overwriteArrayFunction(absoluteIdentifier: string, method: string): (...args: any[]) => any {
            var callbackObjects = ContextManager.observedArrayListeners[absoluteIdentifier],
                _this = this;

            // we can't use a fat-arrow function here because we need the array context.
            return function observedArrayFn(...args: any[]) {
                var oldArray = this.slice(0),
                    returnValue: any,
                    isShift = method.indexOf('shift') !== -1;

                if (isShift) {
                    _this.__isArrayFunction = true;
                    returnValue = (<any>Array.prototype)[method].apply(this, args);
                    _this.__isArrayFunction = false;
                } else {
                    returnValue = (<any>Array.prototype)[method].apply(this, args);
                }

                var keys = Object.keys(callbackObjects),
                    length = keys.length,
                    callbacks: Array<(ev: IArrayMethodInfo<any>) => void>,
                    jLength: number;

                for (var i = 0; i < length; ++i) {
                    callbacks = callbackObjects[keys[i]];
                    jLength = callbacks.length;

                    for (var j = 0; j < jLength; ++j) {
                        callbacks[j]({
                            method: method,
                            returnValue: returnValue,
                            oldArray: oldArray,
                            newArray: this,
                            arguments: args
                        });
                    }
                }

                if (isShift) {
                    _this._notifyChildProperties(absoluteIdentifier, this, oldArray);
                } else if (oldArray.length !== this.length) {
                    _this._execute(absoluteIdentifier + '.length', this.length, oldArray.length);
                }

                return returnValue;
            };
        }
        
        /**
         * @name _removeCallback
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access protected
         * 
         * @description
         * Removes a single listener callback
         * 
         * @param {string} identifier The identifier attached to the callbacks.
         * @param {plat.observable.IListener} listener The observable listener to remove.
         * 
         * @returns {void}
         */
        protected _removeCallback(identifier: string, listener: IListener): void {
            var callbacks = this.__identifiers[identifier];
            if (isNull(callbacks)) {
                return;
            }

            // splice the observed listener
            var index = callbacks.indexOf(listener);
            if (index === -1) {
                return;
            }

            callbacks.splice(index, 1);

            if (isEmpty(this.__identifiers[identifier])) {
                deleteProperty(this.__identifierHash, identifier);
                deleteProperty(this.__contextObjects, identifier);
            }
        }
        
        /**
         * @name _hasIdentifier
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access protected
         * 
         * @description
         * Checks if the specified identifier is already being 
         * observed in this context.
         * 
         * @param {string} identifier The identifier being observed.
         * 
         * @returns {boolean} Whether or not the identiifer is already being observed.
         */
        protected _hasIdentifier(identifier: string): boolean {
            return !isEmpty(this.__identifiers[identifier]);
        }
        
        /**
         * @name _execute
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access protected
         * 
         * @description
         * Executes the listeners for the specified identifier on 
         * this context.
         * 
         * @param {string} identifier The identifier attached to the callbacks.
         * @param {any} value The new value on this context specified by 
         * the identifier.
         * @param {any} oldValue The old value on this context specified by 
         * the identifier.
         * 
         * @returns {void}
         */
        protected _execute(identifier: string, value: any, oldValue: any): void {
            var observableListeners = this.__identifiers[identifier];

            if (isUndefined(value)) {
                deleteProperty(this.__contextObjects, identifier);
            } else {
                this.__contextObjects[identifier] = value;
            }

            if (isNull(observableListeners)) {
                return;
            }

            for (var i = 0; i < observableListeners.length; ++i) {
                observableListeners[i].listener(value, oldValue);
            }
        }
        
        /**
         * @name __defineObject
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access private
         * 
         * @description
         * Defines a getter and setter for an object using Object.defineProperty.
         * 
         * @param {string} identifier The identifier of the object being defined.
         * @param {any} immediateContext The parent object of the object being defined.
         * @param {string} key The property key of the object being defined.
         * 
         * @returns {void}
         */
        private __defineObject(identifier: string, immediateContext: any, key: string): void {
            var value = immediateContext[key];

            Object.defineProperty(immediateContext, key, {
                configurable: true,
                enumerable: true,
                get: () => {
                    this.__observedIdentifier = identifier;
                    return value;
                },
                set: (newValue) => {
                    if (value === newValue) {
                        return;
                    }

                    var oldValue = value;
                    value = newValue;

                    if (this.__isArrayFunction) {
                        return;
                    }

                    var hash = this.__identifierHash[identifier],
                        childPropertiesLength = isArray(hash) ? hash.length : 0;

                    this._execute(identifier, value, oldValue);
                    if (childPropertiesLength > 0) {
                        this._notifyChildProperties(identifier, value, oldValue);
                    }

                    if (!isObject(value)) {
                        this.__definePrimitive(identifier, immediateContext, key);
                    }
                }
            });
        }

        /**
         * @name __definePrimitive
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access private
         * 
         * @description
         * Defines a getter and setter for a primitive using Object.defineProperty.
         * 
         * @param {string} identifier The identifier of the primitive being defined.
         * @param {any} immediateContext The parent object of the primitive being defined.
         * @param {string} key The property key of the primitive being defined.
         * 
         * @returns {void}
         */
        private __definePrimitive(identifier: string, immediateContext: any, key: string): void {
            var value = immediateContext[key],
                isDefined = !isNull(value);

            if (isArray(immediateContext) && key === 'length') {
                return;
            }

            Object.defineProperty(immediateContext, key, {
                configurable: true,
                enumerable: true,
                get: () => {
                    this.__observedIdentifier = identifier;
                    return value;
                },
                set: (newValue) => {
                    if (value === newValue) {
                        return;
                    }
                    var oldValue = value;
                    value = newValue;

                    if (this.__isArrayFunction && isArray(immediateContext)) {
                        return;
                    }

                    if (isObject(value)) {
                        var childPropertiesLength = this.__identifierHash[identifier].length;
                        this._execute(identifier, newValue, oldValue);
                        this.__defineObject(identifier, immediateContext, key);
                        if (childPropertiesLength > 0) {
                            this._notifyChildProperties(identifier, newValue, oldValue);
                        }
                    } else if (isDefined) {
                        this._execute(identifier, newValue, oldValue);
                    } else {
                        this._execute(identifier, newValue, oldValue);
                        this.__definePrimitive(identifier, immediateContext, key);
                        isDefined = true;
                    }
                }
            });
        }

        /**
         * @name __add
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access private
         * 
         * @description
         * Adds and associates a listener with a given identifier.
         * 
         * @param {string} identifier The identifier to attach the listener.
         * @param {plat.observable.IListener} observableListener The listener being added.
         * 
         * @returns {void}
         */
        private __add(identifier: string, observableListener: IListener): void {
            var callbacks = this.__identifiers[identifier];

            if (isNull(callbacks)) {
                callbacks = this.__identifiers[identifier] = [];
            }

            callbacks.push(observableListener);

            this.__addHashValues(identifier);
        }
        
        /**
         * @name __addHashValues
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access private
         * 
         * @description
         * Adds a mapping for an identifier which allows quick access to it 
         * if a parent context is changed.
         * 
         * @param {string} identifier The identifier to map.
         * 
         * @returns {void}
         */
        private __addHashValues(identifier: string): void {
            var split = identifier.split('.'),
                ident = split.shift(),
                hashValue = this.__identifierHash[ident];

            if (isNull(hashValue)) {
                hashValue = this.__identifierHash[ident] = [];
                if (split.length === 0) {
                    return;
                }
            }

            if (ident !== identifier && hashValue.indexOf(identifier) === -1) {
                hashValue.push(identifier);
            }

            while (split.length > 0) {
                ident += '.' + split.shift();
                hashValue = this.__identifierHash[ident];

                if (isNull(hashValue)) {
                    hashValue = this.__identifierHash[ident] = [];
                    if (ident !== identifier) {
                        hashValue.push(identifier);
                    }
                } else if (ident !== identifier && hashValue.indexOf(identifier) === -1) {
                    hashValue.push(identifier);
                }
            }
        }
    }

    /**
     * The Type for referencing the '$ContextManagerStatic' injectable as a dependency.
     */
    export function IContextManagerStatic(): IContextManagerStatic {
        return ContextManager;
    }

    register.injectable(__ContextManagerStatic, IContextManagerStatic, null, __STATIC);

    /**
     * @name IContextManagerStatic
     * @memberof plat.observable
     * @kind interface
     * 
     * @description
     * Creates and manages {@link plat.observable.IContextManager|IContextManagers} and has 
     * additional helper functions for observing objects and primitives.
     */
    export interface IContextManagerStatic {
        /**
         * @name observedArrayListeners
         * @memberof plat.observable.IContextManagerStatic
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.IObject<plat.IObject<Array<(ev: plat.observable.IArrayMethodInfo<any>) => void>>>}
         * 
         * @description
         * A set of functions to be fired when a particular observed array is mutated.
         */
        observedArrayListeners: IObject<IObject<Array<(ev: IArrayMethodInfo<any>) => void>>>;

        /**
         * @name getManager
         * @memberof plat.observable.IContextManagerStatic
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Gets the {@link plat.observable.IContextManager|IContextManager} associated to the given control. If no 
         * {@link plat.observable.IContextManager|IContextManager} exists, one is created for that control.
         * 
         * @param {plat.IControl} control The control on which to locate the {@link plat.observable.IContextManager|IContextManager}.
         * 
         * @returns {plat.observable.IContextManager} The {@link plat.observable.IContextManager|IContextManager} 
         * associated with the input control.
         */
        getManager(control: IControl): IContextManager;

        /**
         * @name dispose
         * @memberof plat.observable.IContextManagerStatic
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Removes all the listeners for a given control's unique ID.
         * 
         * @param {plat.IControl} control The control whose manager is being disposed.
         * @param {boolean} persist? Whether or not the control's context needs to 
         * be persisted post-disposal or can be set to null.
         * 
         * @returns {void}
         */
        dispose(control: IControl, persist?: boolean): void;

        /**
         * @name removeArrayListeners
         * @memberof plat.observable.IContextManagerStatic
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Removes all listeners for an Array associated with a given uid.
         * 
         * @param {string} absoluteIdentifier The identifier used to locate the array.
         * @param {string} uid The uid used to search for listeners.
         * 
         * @returns {void}
         */
        removeArrayListeners(absoluteIdentifier: string, uid: string): void;

        /**
         * @name getContext
         * @memberof plat.observable.IContextManagerStatic
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Safely retrieves the local context given a root context and an Array of
         * property strings.
         * 
         * @param {any} rootContext The root object in which to find a local context.
         * @param {Array<string>} split The string array containing properties used to index into 
         * the rootContext.
         * 
         * @returns {any} The narrowed down context.
         */
        getContext(rootContext: any, split: Array<string>): void;

        /**
         * @name defineProperty
         * @memberof plat.observable.IContextManagerStatic
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Defines an object property with the associated value. Useful for unobserving objects.
         * 
         * @param {any} obj The object on which to define the property.
         * @param {string} key The property key.
         * @param {any} value The value used to define the property.
         * @param {boolean} enumerable? Whether or not the property should be enumerable (able to be iterated 
         * over in a loop)
         * @param {boolean} configurable? Whether or not the property is able to be reconfigured.
         * 
         * @returns {void}
         */
        defineProperty(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean): void;

        /**
         * @name defineGetter
         * @memberof plat.observable.IContextManagerStatic
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Defines an object property with the associated value. Useful for unobserving objects.
         * 
         * @param {any} obj The object on which to define the property.
         * @param {string} key The property key.
         * @param {any} value The value used to define the property.
         * @param {boolean} enumerable? Whether or not the property should be enumerable (able to be iterated 
         * over in a loop)
         * @param {boolean} configurable? Whether or not the property is able to be reconfigured.
         * 
         * @returns {void}
         */
        defineGetter(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean): void;

        /**
         * @name pushRemoveListener
         * @memberof plat.observable.IContextManagerStatic
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Pushes the function for removing an observed property upon adding the property.
         * 
         * @param {string} identifer The identifier for which the remove listener is being pushed.
         * @param {string} uid The unique ID of the control observing the identifier.
         * @param {plat.IRemoveListener} listener The function for removing the observed property.
         * 
         * @returns {void}
         */
        pushRemoveListener(identifier: string, uid: string, listener: IRemoveListener): void;

        /**
         * @name spliceRemoveListener
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access public
         * @static
         *
         * @description
         * Splices a given function for removing an observed property.
         *
         * @param {string} identifer The identifier for which the remove listener is being spliced.
         * @param {string} uid The unique ID of the control observing the identifier.
         * @param {plat.IRemoveListener} listener The function for removing the observed property.
         *
         * @returns {void}
         */
        spliceRemoveListener(identifier: string, uid: string, listener: IRemoveListener): void

        /**
         * @name removeIdentifier
         * @memberof plat.observable.IContextManagerStatic
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Removes a specified identifier from being observed for a given set of control IDs.
         * 
         * @param {Array<string>} uids The set of unique Ids for which to remove the specified identifier.
         * @param {string} identifier The identifier to stop observing.
         * 
         * @returns {void}
         */
        removeIdentifier(uids: Array<string>, identifier: string): void;

        /**
         * @name createContext
         * @memberof plat.observable.IContextManagerStatic
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Ensures that an identifier path will exist on a given control. Will create 
         * objects/arrays if necessary.
         * 
         * @param {plat.ui.ITemplateControl} control The {@link plat.ui.ITemplateControl|ITemplateControl} 
         * on which to create the context.
         * @param {string} identifier The period-delimited identifier string used to create 
         * the context path.
         * 
         * @returns {any} The newly created context object.
         */
        createContext(control: ui.ITemplateControl, identifier: string): any;
    }
    
    /**
     * @name IContextManager
     * @memberof plat.observable
     * @kind interface
     * 
     * @description
     * Describes an object that manages observing properties on any object.
     */
    export interface IContextManager {
        /**
         * @name context
         * @memberof plat.observable.IContextManager
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * The root context associated with and to be managed by this 
         * {@link plat.observable.IContextManager|IContextManager}.
         */
        context: any;

        /**
         * @name getContext
         * @memberof plat.observable.IContextManager
         * @kind function
         * @access public
         * 
         * @description
         * Safely retrieves the local context for this manager given an Array of
         * property strings.
         * 
         * @param {Array<string>} split The string array containing properties used to index into
         * the context.
         * 
         * @returns {any} The obtained context.
         */
        getContext(split: Array<string>): any;

        /**
         * @name observe
         * @memberof plat.observable.IContextManager
         * @kind function
         * @access public
         * 
         * @description
         * Given a period-delimited identifier, observes an object and calls the given listener when the 
         * object changes.
         * 
         * @param {string} absoluteIdentifier The period-delimited identifier noting the property to be observed.
         * @param {plat.observable.IListener} observableListener An object implmenting IObservableListener. The listener will be 
         * notified of object changes.
         * 
         * @returns {plat.IRemoveListener} A function to stop observing the object identified by the absoluteIdentifier.
         */
        observe(identifier: string, observableListener: IListener): IRemoveListener;

        /**
         * @name observeArray
         * @memberof plat.observable.IContextManager
         * @kind function
         * @access public
         * 
         * @description
         * Observes an array and calls the listener when certain functions are called on 
         * that array. The watched functions are push, pop, shift, splice, unshift, sort, 
         * and reverse.
         * 
         * @param {string} uid The unique ID of the object observing the array.
         * @param {(ev: plat.observable.IArrayMethodInfo<any>) => void} listener The callback for when an observed Array 
         * function has been called.
         * @param {string} absoluteIdentifier The identifier from the root context used to find the array.
         * @param {Array<any>} array The array to be observed.
         * @param {Array<any>} oldArray The old array to stop observing.
         * 
         * @returns {plat.IRemoveListener} A function to stop observing the array identified by the absoluteIdentifier.
         */
        observeArray(uid: string, listener: (ev: IArrayMethodInfo<any>) => void,
            absoluteIdentifier: string, array: Array<any>, oldArray: Array<any>): IRemoveListener;

        /**
         * @name dispose
         * @memberof plat.observable.IContextManager
         * @kind function
         * @access public
         * 
         * @description
         * Disposes the memory for an {@link plat.observable.IContextManager|IContextManager}.
         * 
         * @returns {void}
         */
        dispose(): void;
    }
    
    /**
     * @name IListener
     * @memberof plat.observable
     * @kind interface
     * 
     * @description
     * An object specifying a listener callback function and a unique id to use to manage the
     * listener.
     */
    export interface IListener {
        /**
         * @name listener
         * @memberof plat.observable.IListener
         * @kind function
         * @access public
         * 
         * @description
         * A listener method called when the object it is observing is changed.
         * 
         * @param {any} value The new value of the object.
         * @param {any} oldValue The previous value of the object.
         * 
         * @returns {void}
         */
        listener(value: any, oldValue: any): void;
        
        /**
         * @name uid
         * @memberof plat.observable.IListener
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * A unique id used to manage the listener.
         */
        uid: string;
    }
    
    /**
     * @name IArrayMethodInfo
     * @memberof plat.observable
     * @kind interface
     * 
     * @description
     * An object for Array method info. Takes a 
     * generic type to denote the type of array it uses.
     * 
     * @typeparam T Denotes the type of array it uses.
     */
    export interface IArrayMethodInfo<T> {
        /**
         * @name method
         * @memberof plat.observable.IArrayMethodInfo
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The method name that was called. Possible values are:
         * 'push', 'pop', 'reverse', 'shift', 'sort', 'splice', 
         * and 'unshift'
         */
        method: string;
        
        /**
         * @name returnValue
         * @memberof plat.observable.IArrayMethodInfo
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * The value returned from the called function.
         */
        returnValue: any;
        
        /**
         * @name oldArray
         * @memberof plat.observable.IArrayMethodInfo
         * @kind property
         * @access public
         * 
         * @type {Array<T>}
         * 
         * @description
         * The previous value of the array.
         */
        oldArray: Array<T>;
        
        /**
         * @name newArray
         * @memberof plat.observable.IArrayMethodInfo
         * @kind property
         * @access public
         * 
         * @type {Array<T>}
         * 
         * @description
         * The new value of the array.
         */
        newArray: Array<T>;
        
        /**
         * @name arguments
         * @memberof plat.observable.IArrayMethodInfo
         * @kind property
         * @access public
         * 
         * @type {Array<any>}
         * 
         * @description
         * The arguments passed into the array function.
         */
        arguments: Array<any>;
    }
}

