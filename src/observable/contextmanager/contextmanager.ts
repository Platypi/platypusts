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
    'use strict';

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
     * @description
     * A class for managing both context inheritance and observable properties on controls and 
     * facilitating in data-binding.
     */
    export class ContextManager {
        /**
         * @name _log
         * @memberof plat.observable.ContextManager
         * @kind property
         * @access protected
         * @static
         * 
         * @type {plat.debug.Log}
         * @description
         * Reference to the {@link plat.debug.Log|Log} injectable.
         */
        protected static _log: debug.Log;

        /**
         * @name arrayChangeListeners
         * @memberof plat.observable.ContextManager
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.IObject<plat.IObject<Array<(changes: Array<plat.observable.IArrayChanges<any>>) => void>>>}
         * 
         * @description
         * A set of functions to be fired when a particular observed array is mutated.
         */
        static arrayChangeListeners: IObject<IObject<Array<(changes: Array<IArrayChanges<any>>) => void>>> = {};

        /**
         * @name __managers
         * @memberof plat.observable.ContextManager
         * @kind property
         * @access private
         * @static
         * 
         * @type {plat.IObject<plat.observable.ContextManager>}
         * 
         * @description
         * An object for quickly accessing a previously created {@link plat.observable.ContextManager|ContextManager}.
         */
        private static __managers: IObject<ContextManager> = {};

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
         * @name _compat
         * @memberof plat.observable.ContextManager
         * @kind property
         * @access public
         * 
         * @type {plat.Compat}
         * 
         * @description
         * Reference to the {@link plat.Compat|Compat} injectable.
         */
        protected _compat: Compat = acquire(__Compat);

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
         * {@link plat.observable.ContextManager|ContextManager}.
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
        private __identifierHash: IObject<IObject<boolean>> = {};

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
        private __isArrayFunction: boolean = false;

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
         * @name getManager
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Gets the {@link plat.observable.ContextManager|ContextManager} associated to the given control. If no 
         * {@link plat.observable.ContextManager|ContextManager} exists, one is created for that control.
         * 
         * @param {plat.Control} control The control on which to locate the {@link plat.observable.ContextManager|ContextManager}.
         * 
         * @returns {plat.observable.ContextManager} The {@link plat.observable.ContextManager|ContextManager} 
         * associated with the input control.
         */
        static getManager(control: Control): ContextManager {
            var contextManager: ContextManager,
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
         * @param {plat.Control} control The control whose manager is being disposed.
         * 
         * @returns {void}
         */
        static dispose(control: Control): void;
        static dispose(control: ui.TemplateControl): void {
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
                ContextManager.unObserve(control.context);
                ContextManager.defineProperty(control, __CONTEXT, control.context, true, true, true);
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
            var listeners = ContextManager.arrayChangeListeners[absoluteIdentifier];

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
         * @param {boolean} writable? Whether or not assignment operators work on the property.
         * 
         * @returns {void}
         */
        static defineProperty(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean, writable?: boolean): void {
            _defineProperty(obj, key, value, enumerable, configurable, writable);
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
            _defineGetter(obj, key, value, enumerable, configurable);
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
            if (listeners.length === 0) {
                deleteProperty(control, identifier);
            }
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
         * @param {plat.ui.TemplateControl} control The {@link plat.ui.TemplateControl|TemplateControl} 
         * on which to create the context.
         * @param {string} identifier The period-delimited identifier string used to create 
         * the context path.
         * 
         * @returns {any} The newly created context object.
         */
        static createContext(control: ui.TemplateControl, identifier: string): any {
            var context = control.context;

            if (!isObject(context)) {
                if (isNull(context)) {
                    context = control.context = {};
                } else {
                    ContextManager._log.warn('A child control is trying to create a child context that has ' +
                        'a parent control with a primitive type context');
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
         * @name unObserve
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Iterates through all the nested properties in an object and redefines the properties to not use getters/setters
         * 
         * @param {any} obj The object to stop observing.
         * 
         * @returns {void} The newly created context object.
         */
        static unObserve(obj: any): void {
            _extend(true, true, obj);
        }

        /**
         * @name getContext
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access public
         * 
         * @description
         * Safely retrieves the local context for this manager given an Array of
         * property strings and observes it if not found.
         * 
         * @param {Array<string>} split The string array containing properties used to index into
         * the context.
         * @param {boolean} observe? Whether or not to observe the identifier indicated by the 
         * split Array.
         * 
         * @returns {any} The obtained context.
         */
        getContext(split: Array<string>, observe?: boolean): any {
            return this._getContext(split.join('.'), split, observe);
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
                isLength = key === 'length',
                hasIdentifier = this._hasIdentifier(absoluteIdentifier),
                hasObservableListener = !isNull(observableListener),
                join: string,
                context: any;

            if (split.length > 0) {
                join = split.join('.');
                context = this._getContext(join, split, true);
            } else {
                join = key;
                context = this.context;
            }

            if (!isObject(context)) {
                if (hasObservableListener) {
                    if (isLength) {
                        this.__lengthListeners[absoluteIdentifier] = observableListener;
                        ContextManager.pushRemoveListener(absoluteIdentifier, observableListener.uid, (): void => {
                            deleteProperty(this.__lengthListeners, absoluteIdentifier);
                        });
                    }
                    return this._addObservableListener(absoluteIdentifier, observableListener, isLength);
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
                    removeAbsoluteCallback = this._addObservableListener(absoluteIdentifier, observableListener, isLength);

                if (isObserved && absoluteIdentifier !== observedIdentifier) {
                    removeObservedCallback = this._addObservableListener(observedIdentifier, observableListener, isLength);
                }

                removeCallback = (): void => {
                    removeAbsoluteCallback();
                    removeObservedCallback();
                };
            }

            var parentIsArray = isArray(context),
                removeObservableListener = removeCallback,
                removeListener = noop,
                removeArrayObserve = noop,
                numKey = Number(key);

            if (parentIsArray && numKey >= context.length) {
                removeListener = this.observe(join + '.length', {
                    uid: observableListener.uid,
                    listener: (newValue: number, oldValue: number): void => {
                        if (numKey >= newValue) {
                            return;
                        }

                        removeListener();
                        this._define(absoluteIdentifier, context, key);
                    }
                });

                removeCallback = (): void => {
                    removeObservableListener();
                    removeListener();
                };
            } else if (!hasIdentifier) {
                // check if value is defined and context manager hasn't seen this identifier
                if (parentIsArray && isLength) {
                    var property = split.pop(),
                        parentContext = this.getContext(split, false);

                    this.__observedIdentifier = null;
                    access(parentContext, property);

                    if (isString(this.__observedIdentifier)) {
                        join = this.__observedIdentifier;
                    }

                    if (hasObservableListener) {
                        var uid = observableListener.uid;
                        removeListener = this.observeArrayMutation(uid, noop, join, context, null);
                        removeArrayObserve = this.observe(join, {
                            uid: uid,
                            listener: (newValue: Array<any>, oldValue: Array<any>): void => {
                                removeListener();
                                removeListener = this.observeArrayMutation(uid, noop, join, newValue, oldValue);
                            }
                        });
                    }

                    removeCallback = (): void => {
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
         * @name observeArrayMutation
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
         * @param {(changes: Array<plat.observable.IArrayChanges<any>>) => void} listener The callback for after 
         * when an observed Array function has been called.
         * @param {string} absoluteIdentifier The identifier from the root context used to find the array.
         * @param {Array<any>} array The array to be observed.
         * @param {Array<any>} oldArray The old array to stop observing.
         * 
         * @returns {plat.IRemoveListener} A function to stop observing the array identified by the absoluteIdentifier.
         */
        observeArrayMutation(uid: string, listener: (changes: Array<IArrayChanges<any>>) => void, absoluteIdentifier: string,
            array: Array<any>, oldArray: Array<any>): IRemoveListener {
            if (isArray(oldArray)) {
                this._restoreArray(oldArray);
            }

            if (isNull(array)) {
                return noop;
            }

            var split = absoluteIdentifier.split('.'),
                property = split.pop(),
                context = this.getContext(split, false);

            this.__observedIdentifier = null;
            access(context, property);

            if (isString(this.__observedIdentifier)) {
                absoluteIdentifier = this.__observedIdentifier;
            }

            var removeListeners: Array<IRemoveListener> = [];
            if (isFunction(listener)) {
                removeListeners.push(this._pushArrayListener(uid, absoluteIdentifier, listener));
            }

            this._overwriteArray(absoluteIdentifier, array);

            return (): void => {
                while (removeListeners.length > 0) {
                    removeListeners.pop()();
                }
            };
        }

        /**
         * @name dispose
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access public
         * 
         * @description
         * Disposes the memory for an {@link plat.observable.ContextManager|ContextManager}.
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
         * @name _pushArrayListener
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access protected
         * 
         * @description
         * Pushes Array mutation listeners and removers.
         * 
         * @param {string} uid The unique identifier to store the callback.
         * @param {string} absoluteIdentifier The identifier of the Array being observed.
         * @param {(changes: Array<plat.observable.IArrayChanges<any>>) => void} listener The Array mutation listener.
         * 
         * @returns {plat.IRemoveListener} A function that will remove this listener from execution.
         */
        protected _pushArrayListener(uid: string, absoluteIdentifier: string,
            listener: (changes: Array<IArrayChanges<any>>) => void): IRemoveListener {
            var arrayListeners = ContextManager.arrayChangeListeners,
                arrayCallbacks = arrayListeners[absoluteIdentifier];

            if (isNull(arrayCallbacks)) {
                arrayCallbacks = arrayListeners[absoluteIdentifier] = {};
            }

            var callbacks = arrayCallbacks[uid];
            if (isNull(callbacks)) {
                callbacks = arrayCallbacks[uid] = [];
            }

            var listenerRemoved = false,
                removeListener = (): void => {
                    if (listenerRemoved) {
                        return;
                    }

                    listenerRemoved = true;
                    ContextManager.spliceRemoveListener(absoluteIdentifier, uid, removeListener);

                    var index = callbacks.indexOf(listener);
                    if (index === -1) {
                        return;
                    }

                    callbacks.splice(index, 1);
                    if (callbacks.length === 0) {
                        deleteProperty(arrayCallbacks, uid);
                        if (isEmpty(arrayCallbacks)) {
                            deleteProperty(arrayListeners, absoluteIdentifier);
                        }
                    }
                };

            callbacks.push(listener);
            ContextManager.pushRemoveListener(absoluteIdentifier, uid, removeListener);

            return removeListener;
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
        protected _restoreArray(array: Array<any>): void {
            var _compat = this._compat;

            if (_compat.setProto) {
                (<any>Object).setPrototypeOf(array, Object.create(Array.prototype));
            } else if (_compat.proto) {
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
        protected _overwriteArray(absoluteIdentifier: string, array: Array<any>): void {
            var _compat = this._compat,
                length = arrayMethods.length,
                method: string,
                i: number;

            if (_compat.proto) {
                var obj = Object.create(Array.prototype);

                for (i = 0; i < length; ++i) {
                    method = arrayMethods[i];
                    obj[method] = this._overwriteArrayFunction(absoluteIdentifier, method);
                }

                if (_compat.setProto) {
                    (<any>Object).setPrototypeOf(array, obj);
                } else {
                    (<any>array).__proto__ = obj;
                }

                return;
            }

            for (i = 0; i < length; ++i) {
                method = arrayMethods[i];
                ContextManager.defineProperty(array, method,
                    this._overwriteArrayFunction(absoluteIdentifier, method), false, true, true);
            }
        }

        /**
         * @name _getContext
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access protected
         * 
         * @description
         * Gets the context object of an identifier.
         * 
         * @param {string} identifier The identifier for which we're getting the context.
         * @param {Array<string>} split The string array containing properties used to index into
         * the context.
         * @param {boolean} observe? Whether or not to observe the identifier indicated by the 
         * split Array.
         * 
         * @returns {any} The immediate context denoted by the identifier.
         */
        protected _getContext(identifier: string, split: Array<string>, observe?: boolean): any {
            var context = this.__contextObjects[identifier];

            if (isNull(context)) {
                if (observe === true) {
                    context = this.__contextObjects[identifier] = this._observeImmediateContext(split, identifier);
                } else {
                    context = this._getImmediateContext(split);
                }
            }

            return context;
        }

        /**
         * @name _getImmediateContext
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access protected
         * 
         * @description
         * Gets the immediate context of identifier by splitting on ".".
         * 
         * @param {Array<string>} split The string array containing properties used to index into
         * the context.
         * 
         * @returns {any} The immediate context denoted by the identifier.
         */
        protected _getImmediateContext(split: Array<string>): any {
            var context = this.context;

            while (split.length > 0) {
                context = context[split.shift()];
                if (isNull(context)) {
                    break;
                }
            }

            return context;
        }

        /**
         * @name _observeImmediateContext
         * @memberof plat.observable.ContextManager
         * @kind function
         * @access protected
         * 
         * @description
         * Gets the immediate context of identifier by splitting on "." 
         * and observes the objects along the way.
         * 
         * @param {Array<string>} split The identifier's split string array containing properties 
         * used to index into the context.
         * @param {string} identifier The identifier being observed.
         * 
         * @returns {any} The immediate context denoted by the identifier.
         */
        protected _observeImmediateContext(split: Array<string>, identifier: string): any {
            if (isNull(this.__identifiers[identifier])) {
                this.observe(identifier, null);
            }

            return this._getImmediateContext(split);
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
         * @param {Array<string>} mappings? An array of mapped child identifier keys to notify.
         * 
         * @returns {void}
         */
        protected _notifyChildProperties(identifier: string, newValue: any, oldValue: any, mappings?: Array<string>): void {
            mappings = mappings || Object.keys(this.__identifierHash[identifier] || {});
            var length = mappings.length,
                binding: string,
                property: string,
                parentProperty: string,
                split: Array<string>,
                values: IObject<any> = {},
                value: any,
                period = '.',
                lengthStr = 'length',
                key: string,
                keyIsLength: boolean,
                start = identifier.length + 1,
                newParent: any,
                oldParent: any,
                newChild: any,
                oldChild: any;

            for (var i = 0; i < length; ++i) {
                binding = mappings[i];
                property = binding.slice(start);
                split = property.split(period);
                key = split.pop();
                keyIsLength = (key === lengthStr);
                parentProperty = split.join(period);

                if (isEmpty(parentProperty)) {
                    newParent = newValue;
                    oldParent = oldValue;
                    newChild = isNull(newParent) ? undefined : newParent[key];
                    oldChild = isNull(oldParent) ? undefined : oldParent[key];

                    if (keyIsLength && !isArray(oldParent) && isArray(newParent)) {
                        var lengthListener = this.__lengthListeners[binding];
                        if (!isNull(lengthListener)) {
                            var uid = lengthListener.uid,
                                arraySplit = identifier.split(period),
                                arrayKey = arraySplit.pop(),
                                join = arraySplit.join(period),
                                arrayParent = this._getContext(join, arraySplit, false);

                            this.__observedIdentifier = null;
                            access(arrayParent, arrayKey);
                            if (isString(this.__observedIdentifier)) {
                                join = this.__observedIdentifier;
                            }

                            var removeListener = this.observeArrayMutation(uid, noop, join, newParent, null);
                            this.observe(join, {
                                uid: uid,
                                listener: (nValue: Array<any>, oValue: Array<any>): void => {
                                    removeListener();
                                    removeListener = this.observeArrayMutation(uid, noop, join, nValue, oValue);
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
         * @param {boolean} isLength? Indicates the property being observed is an Array's length.
         * 
         * @returns {plat.IRemoveListener} A function for removing the given listener for the given absoluteIdentifier.
         */
        protected _addObservableListener(absoluteIdentifier: string, observableListener: IListener, isLength?: boolean): IRemoveListener {
            if (isLength === true) {
                var split = absoluteIdentifier.split('.');
                // pop length key
                split.pop();

                var property = split.pop(),
                    context = this.getContext(split, false);

                if (isObject(context)) {
                    this.__observedIdentifier = null;
                    access(context, property);

                    if (isString(this.__observedIdentifier)) {
                        absoluteIdentifier = this.__observedIdentifier + (isLength === true ? '.length' : '');
                    }
                }
            }

            this.__add(absoluteIdentifier, observableListener);

            var uid = observableListener.uid,
                remove = (): void => {
                    ContextManager.spliceRemoveListener(absoluteIdentifier, uid, remove);
                    this._removeCallback(absoluteIdentifier, observableListener);
                };

            ContextManager.pushRemoveListener(absoluteIdentifier, uid, remove);
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
            var callbackObjects = ContextManager.arrayChangeListeners[absoluteIdentifier] || {},
                _this = this;

            // we can't use a fat-arrow function here because we need the array context.
            return function observedArrayFn(...args: any[]): any {
                var oldLength = this.length,
                    originalArray = this.slice(0),
                    returnValue: any,
                    isUnshift = method === 'unshift',
                    isShift = method === 'shift',
                    isSplice = method === 'splice',
                    selfNotify = isShift || isUnshift || isSplice,
                    isUpdate = method === 'sort' || method === 'reverse',
                    oldArray: Array<any>,
                    addedCount: number,
                    index: number,
                    newLength: number,
                    removed: Array<any>;

                if (selfNotify) {
                    _this.__isArrayFunction = true;
                    returnValue = (<any>Array.prototype)[method].apply(this, args);
                    _this.__isArrayFunction = false;
                    newLength = this.length;

                    index = 0;
                    if (isShift) {
                        addedCount = 0;
                        removed = oldLength > 0 ? [returnValue] : [];
                    } else if (isUnshift) {
                        addedCount = args.length;
                        removed = [];
                    } else {
                        addedCount = args.length - 2;
                        index = args[0];
                        removed = returnValue;
                    }
                } else {
                    returnValue = (<any>Array.prototype)[method].apply(this, args);
                    newLength = this.length;

                    if (isUpdate) {
                        oldArray = originalArray;
                    } else if (method === 'push') {
                        addedCount = args.length;
                        index = oldLength;
                        removed = [];
                    } else if (method === 'pop') {
                        addedCount = 0;
                        index = newLength;
                        removed = oldLength > 0 ? [returnValue] : [];
                    }
                }

                if (isShift || isSplice || method === 'pop') {
                    ContextManager.unObserve(returnValue);
                }

                var keys = Object.keys(callbackObjects),
                    length = keys.length,
                    callbacks: Array<(changes: Array<IArrayChanges<any>>) => void>,
                    jLength: number,
                    i: number,
                    j: number;

                for (i = 0; i < length; ++i) {
                    callbacks = callbackObjects[keys[i]];
                    jLength = callbacks.length;

                    for (j = 0; j < jLength; ++j) {
                        callbacks[j]([{
                            object: this,
                            type: method,
                            index: index,
                            removed: removed,
                            addedCount: addedCount,
                            oldArray: oldArray
                        }]);
                    }
                }

                if (selfNotify) {
                    _this._notifyChildProperties(absoluteIdentifier, this, originalArray);
                }
                
                _this._execute(absoluteIdentifier + '.length', newLength, oldLength);

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

            if (callbacks.length === 0) {
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

            if (value === oldValue || isNull(observableListeners)) {
                return;
            }

            var listeners = observableListeners.slice(0),
                length = listeners.length;

            for (var i = 0; i < length; ++i) {
                listeners[i].listener(value, oldValue);
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
                get: (): any => {
                    this.__observedIdentifier = identifier;
                    return value;
                },
                set: (newValue): void => {
                    if (value === newValue) {
                        return;
                    }

                    var oldValue = value;
                    value = newValue;

                    if (this.__isArrayFunction) {
                        return;
                    }

                    ContextManager.unObserve(oldValue);

                    var props = this.__identifierHash[identifier],
                        childPropertiesExist = false,
                        mappings: Array<string>;

                    if (isObject(props)) {
                        mappings = Object.keys(props);
                        childPropertiesExist = mappings.length > 0;
                    }

                    this._execute(identifier, value, oldValue);

                    if (childPropertiesExist) {
                        this._notifyChildProperties(identifier, value, oldValue, mappings);
                        if (!isObject(value)) {
                            this.__definePrimitive(identifier, immediateContext, key);
                        }
                    } else if (isEmpty(this.__identifiers[identifier])) {
                        ContextManager.defineProperty(immediateContext, key, value, true, true, true);
                    } else if (!isObject(value)) {
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
                get: (): any => {
                    this.__observedIdentifier = identifier;
                    return value;
                },
                set: (newValue): void => {
                    if (value === newValue) {
                        return;
                    }
                    var oldValue = value;
                    value = newValue;

                    if (this.__isArrayFunction && isArray(immediateContext)) {
                        return;
                    }

                    var props = this.__identifierHash[identifier],
                        childPropertiesExist = false,
                        mappings: Array<string>;

                    if (isObject(props)) {
                        mappings = Object.keys(props);
                        childPropertiesExist = mappings.length > 0;
                    }

                    this._execute(identifier, newValue, oldValue);

                    if (!childPropertiesExist && isEmpty(this.__identifiers[identifier])) {
                        ContextManager.defineProperty(immediateContext, key, value, true, true, true);
                    } else if (isObject(value)) {
                        this.__defineObject(identifier, immediateContext, key);
                        if (childPropertiesExist) {
                            this._notifyChildProperties(identifier, newValue, oldValue, mappings);
                        }
                    } else if (!isDefined) {
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
            var callbacks = this.__identifiers[identifier],
                priority = observableListener.priority,
                found = false;

            if (isNull(callbacks)) {
                callbacks = this.__identifiers[identifier] = [];
            }

            if (isNumber(priority)) {
                var length = callbacks.length;

                for (var i = 0; i < length; ++i) {
                    if (priority > callbacks[i].priority) {
                        callbacks.splice(i, 0, observableListener);
                        found = true;
                        break;
                    }
                }
            } else {
                observableListener.priority = -1;
            }

            if (!found) {
                callbacks.push(observableListener);
            }

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
            var identifierHash = this.__identifierHash;
            if (isObject(identifierHash[identifier])) {
                return;
            }

            identifierHash[identifier] = {};

            var index: number,
                period = '.',
                ident = identifier,
                hashValue: IObject<boolean>;
            while ((index = ident.lastIndexOf(period)) !== -1) {
                ident = ident.slice(0, index);
                hashValue = identifierHash[ident];

                if (isNull(hashValue)) {
                    hashValue = identifierHash[ident] = {};
                    if (ident !== identifier) {
                        hashValue[identifier] = true;
                    }
                } else if (ident !== identifier && !hashValue[identifier]) {
                    hashValue[identifier] = true;
                }
            }
        }
    }

    /**
     * The Type for referencing the '_ContextManager' injectable as a dependency.
     */
    export function IContextManagerStatic(_log?: debug.Log): IContextManagerStatic {
        (<any>ContextManager)._log = _log;
        return ContextManager;
    }

    register.injectable(__ContextManagerStatic, IContextManagerStatic, [
        __Log
    ], __STATIC);
    register.injectable(__ContextManagerInstance, ContextManager, null, __INSTANCE);

    /**
     * @name IContextManagerStatic
     * @memberof plat.observable
     * @kind interface
     * 
     * @description
     * Creates and manages {@link plat.observable.ContextManager|ContextManagers} and has 
     * additional helper functions for observing objects and primitives.
     */
    export interface IContextManagerStatic {
        /**
         * @name arrayChangeListeners
         * @memberof plat.observable.IContextManagerStatic
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.IObject<plat.IObject<Array<(changes: Array<plat.observable.IArrayChanges<any>>) => void>>>}
         * 
         * @description
         * A set of functions to be fired when a particular observed array is mutated.
         */
        arrayChangeListeners: IObject<IObject<Array<(changes: Array<IArrayChanges<any>>) => void>>>;

        /**
         * @name getManager
         * @memberof plat.observable.IContextManagerStatic
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Gets the {@link plat.observable.ContextManager|ContextManager} associated to the given control. If no 
         * {@link plat.observable.ContextManager|ContextManager} exists, one is created for that control.
         * 
         * @param {plat.Control} control The control on which to locate the {@link plat.observable.ContextManager|ContextManager}.
         * 
         * @returns {plat.observable.ContextManager} The {@link plat.observable.ContextManager|ContextManager} 
         * associated with the input control.
         */
        getManager(control: Control): ContextManager;

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
         * @param {plat.Control} control The control whose manager is being disposed.
         * 
         * @returns {void}
         */
        dispose(control: Control): void;

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
         * @param {boolean} writable? Whether or not assignment operators work on the property.
         * 
         * @returns {void}
         */
        defineProperty(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean, writable?: boolean): void;

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
        spliceRemoveListener(identifier: string, uid: string, listener: IRemoveListener): void;

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
         * @param {plat.ui.TemplateControl} control The {@link plat.ui.TemplateControl|TemplateControl} 
         * on which to create the context.
         * @param {string} identifier The period-delimited identifier string used to create 
         * the context path.
         * 
         * @returns {any} The newly created context object.
         */
        createContext(control: ui.TemplateControl, identifier: string): any;
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

        /**
         * @name priority
         * @memberof plat.observable.IListener
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * A high priority means this listener wants to be notified earlier than other listeners. The 
         * listeners will be fired in priority order when necessary.
         */
        priority?: number;

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
    }

    /**
     * @name IArrayChanges
     * @memberof plat.observable
     * @kind interface
     * 
     * @description
     * An object denoting Array changes after the Array has been mutated. Takes a 
     * generic type to denote the type of array it uses.
     * 
     * @typeparam T Denotes the type of array it uses.
     */
    export interface IArrayChanges<T> {
        /**
         * @name object
         * @memberof plat.observable.IArrayChanges
         * @kind property
         * @access public
         * 
         * @type {Array<T>}
         * 
         * @description
         * The new value of the array.
         */
        object: Array<T>;

        /**
         * @name type
         * @memberof plat.observable.IArrayChanges
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The method name that was called. Array mutation methods are:
         * 'push', 'pop', 'reverse', 'shift', 'sort', 'splice', 
         * and 'unshift'.
         */
        type: string;

        /**
         * @name index
         * @memberof plat.observable.IArrayChanges
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The index at which the change occurred. Only available on Array mutation methods.
         */
        index?: number;

        /**
         * @name removed
         * @memberof plat.observable.IArrayChanges
         * @kind property
         * @access public
         * 
         * @type {Array<T>}
         * 
         * @description
         * An array of the removed elements. Only available on Array mutation methods.
         */
        removed?: Array<T>;

        /**
         * @name addedCount
         * @memberof plat.observable.IArrayChanges
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The number of elements added. Only available on Array mutation methods.
         */
        addedCount?: number;

        /**
         * @name oldArray
         * @memberof plat.observable.IArrayChanges
         * @kind property
         * @access public
         * 
         * @type {Array<T>}
         * 
         * @description
         * The old Array prior to a 'reverse' or 'sort' mutation type. 
         * Only available when the type is either 'reverse' or 'sort'.
         */
        oldArray?: Array<T>;
    }
}

