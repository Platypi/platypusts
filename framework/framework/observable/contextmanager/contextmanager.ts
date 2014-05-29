module plat.observable {
    var arrayMethods = ['push', 'pop', 'reverse', 'shift', 'sort', 'splice', 'unshift'];

    /**
     * Manages observable properties on control.
     * Facilitates in data-binding and managing context inheritance.
     */
    export class ContextManager implements IContextManager {
        /**
         * A set of functions to be fired when a particular observed array is mutated.
         */
        static observedArrayListeners: IObject<IObject<Array<(ev: IArrayMethodInfo<any>) => void>>> = {};
        
        /**
         * Gets the ContextManager associated to the given control. If no 
         * ContextManager exists, one is created for that control.
         * 
         * @static
         * @param control The control on which to locate the ContextManager
         */
        static getManager(control: IControl): IContextManager;
        static getManager(control: any): IContextManager {
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
         * Removes all the listeners for a given control's uid.
         * 
         * @static
         * @param control The control whose manager is being disposed.
         * @param persist Whether or not the control's context needs to 
         * be persisted post-disposal or can be set to null.
         */
        static dispose(control: IControl, persist?: boolean): void;
        static dispose(control: ui.ITemplateControl, persist?: boolean) {
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
                managers[uid] = null;
                delete managers[uid];
            }

            var keys = Object.keys(identifiers),
                identifier: string,
                listeners: Array<IRemoveListener>,
                i: number,
                j: number,
                jLength: number;

            while (keys.length > 0) {
                identifier = keys.shift();
                listeners = identifiers[identifier];
                jLength = listeners.length;
                for (j = 0; j < jLength; ++j) {
                    listeners[j]();
                }
            }

            var arrayListeners = ContextManager.observedArrayListeners,
                remove = ContextManager.removeArrayListeners;

            keys = Object.keys(arrayListeners);
            length = keys.length;

            for (i = 0; i < length; ++i) {
                remove(keys[i], uid);
            }

            controls[uid] = null;
            delete controls[uid];

            if (!isNull(control.context)) {
                ContextManager.defineProperty(control, 'context', persist ? deepExtend({}, control.context) : null, true, true);
            }
        }

        /**
         * Removes all listeners for an Array associated with a given uid.
         * 
         * @static
         * @param absoluteIdentifier The identifier used to locate the array.
         * @param uid The uid used to search for listeners.
         */
        static removeArrayListeners(absoluteIdentifier: string, uid: string): void {
            var listeners = ContextManager.observedArrayListeners[absoluteIdentifier];

            if (!isNull(listeners)) {
                listeners[uid] = null;
                delete listeners[uid];
            }
        }

        /**
         * Safely retrieves the local context given a root context and an Array of
         * property strings.
         * 
         * @static
         * @param rootContext The root object in which to find a local context.
         * @param split The string array containing properties used to index into
         * the rootContext.
         */
        static getContext(rootContext: any, split: Array<string>): any {
            split = split.slice(0);
            if (isNull(rootContext)) {
                return null;
            }
            while (split.length > 0) {
                rootContext = rootContext[split.shift()];
                if (isNull(rootContext)) {
                    return null;
                }
            }

            return rootContext;
        }

        /**
         * Defines an object property with the associated value. Useful for unobserving objects.
         * 
         * @param obj The object on which to define the property.
         * @param key The property key.
         * @param value The value used to define the property.
         * @param enumerable Whether or not the property should be enumerable (able to be iterated 
         * over in a loop)
         * @param configurable Whether or not the property is able to be reconfigured.
         */
        static defineProperty(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean): void {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: !!enumerable,
                configurable: !!configurable
            });
        }

        /**
         * Defines an object property with only a getter function. Useful for creating constant values 
         * or overwriting constant values.
         * 
         * @param obj The object on which to define the property.
         * @param key The property key.
         * @param value The value used to define the property.
         * @param enumerable Whether or not the property should be enumerable (able to be iterated 
         * over in a loop)
         * @param configurable Whether or not the property is able to be reconfigured.
         */
        static defineGetter(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean): void {
            Object.defineProperty(obj, key, {
                get: () => value,
                enumerable: !!enumerable,
                configurable: !!configurable
            });
        }

        /**
         * Pushes the function for removing an observed property upon adding the property.
         * 
         * @static
         * @param identifer The identifier for which the remove listener is being pushed.
         * @param uid The uid of the control observing the identifier.
         * @param listener The function for removing the observed property.
         */
        static pushRemoveListener(identifier: string, uid: string, listener: IRemoveListener) {
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
         * Removes a specified identifier from being observed for a given set of control uids.
         * 
         * @static
         * @param uids The set of uids for which to remove the specified identifier.
         * @param identifier The identifier to stop observing.
         */
        static removeIdentifier(uids: Array<string>, identifier: string): void {
            var length = uids.length,
                controls = ContextManager.__controls,
                uid: string,
                identifiers: IObject<Array<IRemoveListener>>;

            for (var i = 0; i < length; ++i) {
                uid = uids[i];

                identifiers = controls[uid];

                if (isNull(identifiers)) {
                    continue;
                }

                identifiers[identifier] = null;
                delete identifiers[identifier];
            }
        }

        /**
         * Ensures that an identifier path will exist on a given control. Will create 
         * objects/arrays if necessary.
         * 
         * @param control The control on which to create the context.
         * @param identifier The period-delimited identifier string used to create 
         * the context path.
         */
        static createContext(control: ui.ITemplateControl, identifier: string) {
            var split = identifier.split('.'),
                property: string,
                temp: any,
                context = control.context;

            if (isNull(context)) {
                context = control.context = {};
            }

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

        private static __managers: IObject<IContextManager> = {};
        private static __controls: IObject<IObject<Array<IRemoveListener>>> = {};

        $Compat: ICompat = acquire(__Compat);

        context: any;

        private __identifiers: IObject<Array<IListener>> = {};
        private __identifierHash: IObject<Array<string>> = {};
        private __contextObjects: IObject<any> = {};
        private __isArrayFunction: boolean = false;
        private __observedIdentifier: string;

        getContext(split: Array<string>): void {
            var join = split.join('.'),
                context = this.__contextObjects[join];

            if (isNull(this.__contextObjects[join])) {
                context = this.__contextObjects[join] = ContextManager.getContext(this.context, split);
            }

            return context;
        }

        observe(absoluteIdentifier: string, observableListener: IListener): IRemoveListener {
            if (isEmpty(absoluteIdentifier)) {
                return;
            }

            var split = absoluteIdentifier.split('.'),
                key = split.pop(),
                path: string,
                context = this.context,
                hasIdentifier = this._hasIdentifier(absoluteIdentifier),
                hasObservableListener = !isNull(observableListener),
                join: string;

            if (split.length > 0) {
                join = split.join('.');
                context = this.__contextObjects[join];
                if (isNull(this.__contextObjects[join])) {
                    context = this.__contextObjects[join] = this._getImmediateContext(join);
                }
            }

            if (!isObject(context)) {
                if (hasObservableListener) {
                    return this._addObservableListener(absoluteIdentifier, observableListener);
                }

                return;
            }

            // set observedIdentifier to null
            this.__observedIdentifier = null;

            var value = this.__contextObjects[absoluteIdentifier] = context[key];

            // if observedIdentifier is not null, the primitive is already being watched
            var observedIdentifier = this.__observedIdentifier,
                isObserved = !isNull(observedIdentifier);
            if (isObserved) {
                hasIdentifier = true;
            }

            var removeCallback = noop;

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

            //check if value is defined and context manager hasn't seen this identifier
            if (!hasIdentifier) {
                if (isArray(context) && key === 'length') {
                    var removeArrayObserve = this.observe(join, {
                        uid: observableListener.uid,
                        listener: (newValue: Array<any>, oldValue: Array<any>) => {
                            removeListener();
                            removeListener = this.observeArray(observableListener.uid, noop, join, newValue, oldValue);
                        }
                    });

                    var removeListener = this.observeArray(observableListener.uid, noop, join, context, null);

                    removeCallback = () => {
                        removeArrayObserve();
                        removeListener();
                    };
                } else {
                    this._define(absoluteIdentifier, context, key);
                }
            }

            return removeCallback;
        }

        observeArray(uid: string, listener: (ev: IArrayMethodInfo<any>) => void,
            absoluteIdentifier: string, array: Array<any>, oldArray: Array<any>): IRemoveListener {
            var length = arrayMethods.length,
                method: string,
                i: number,
                $compat = this.$Compat,
                proto = $compat.proto,
                setProto = $compat.setProto;
            
            if (isArray(oldArray)) {
                if (setProto) {
                    (<any>Object).setPrototypeOf(oldArray, Object.create(Array.prototype));
                } else if (proto) {
                    (<any>oldArray).__proto__ = Object.create(Array.prototype);
                } else {
                    length = arrayMethods.length;

                    for (i = 0; i < length; ++i) {
                        method = arrayMethods[i];
                        (<any>oldArray)[method] = (<any>Array.prototype)[method];
                    }
                }
            }

            if (isNull(array)) {
                return;
            }

            var observedArrayCallbacks = ContextManager.observedArrayListeners[absoluteIdentifier];

            if (isNull(observedArrayCallbacks)) {
                observedArrayCallbacks = ContextManager.observedArrayListeners[absoluteIdentifier] = {};
            }

            var arrayCallbacks = observedArrayCallbacks[uid];

            if (isNull(arrayCallbacks)) {
                arrayCallbacks = observedArrayCallbacks[uid] = [];
            }

            var index = arrayCallbacks.length,
                removeListener = () => {
                    arrayCallbacks.splice(index, 1);
                };

            arrayCallbacks.push(listener);

            if (proto) {
                var obj = Object.create(Array.prototype);

                for (i = 0; i < length; ++i) {
                    method = arrayMethods[i];
                    obj[method] = this._overwriteArrayFunction(absoluteIdentifier, method);
                }

                if (setProto) {
                    (<any>Object).setPrototypeOf(array, obj);
                } else {
                    (<any>array).__proto__ = obj;
                }

                return removeListener;
            }

            for (i = 0; i < length; ++i) {
                method = arrayMethods[i];
                ContextManager.defineProperty(array, method,
                    this._overwriteArrayFunction(absoluteIdentifier, method), false, true);
            }

            return removeListener;
        }

        dispose(): void {
            this.context = null;
            this.__identifiers = {};
            this.__identifierHash = {};
            this.__contextObjects = {};
        }

        /**
         * Gets the immediate context of identifier by splitting on '.' 
         * and observes the objects along the way.
         * 
         * @param identifier The identifier being observed.
         */
        _getImmediateContext(identifier: string): any {
            if (isNull(this.__identifiers[identifier])) {
                this.observe(identifier, null);
            }

            var split = identifier.split('.'),
                context = this.context,
                key = split.shift(),
                partialIdentifier = key;

            do {
                context = context[key];
                if (isNull(context) || split.length === 0) {
                    break;
                }

                key = split.shift();
                partialIdentifier += '.' + key;
            } while (split.length >= 0);

            return context;
        }

        /**
         * Obtains the old value and new value of a given context 
         * property on a property changed event.
         * 
         * @param split The split identifier of the property that changed.
         * @param newRootContext The new context.
         * @param oldRootContext The old context.
         */
        _getValues(split: Array<string>, newRootContext: any, oldRootContext: any): { newValue: any; oldValue: any; } {
            var length = split.length,
                property: string,
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
         * Notifies all child properties being observed that a parent property 
         * has changed.
         * 
         * @param identifier The identifier for the property that changed.
         * @param newValue The new value of the property.
         * @param oldValue The old value of the property.
         */
        _notifyChildProperties(identifier: string, newValue: any, oldValue: any): void {
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
                this.__identifierHash[identifier] = null;
                delete this.__identifierHash[identifier];
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
                    newChild = isNull(newParent) ? newParent : newParent[key];
                    oldChild = isNull(oldParent) ? oldParent : oldParent[key];
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
                    newChild = isNull(newParent) ? null : newParent[key];
                    oldChild = isNull(oldParent) ? null : oldParent[key];
                }

                values[property] = {
                    newValue: newChild,
                    oldValue: oldChild
                };

                if (!(isNull(newParent) || isUndefined(newChild))) {
                    this._define(binding, newParent, key);
                }

                this._execute(binding, newChild, oldChild);
            }

            values = null;
        }

        /**
         * Adds a listener to be fired for a particular identifier.
         * 
         * @param absoluteIdentifier The identifier being observed.
         * @param observableListener The function and associated uid to be fired 
         * for this identifier.
         */
        _addObservableListener(absoluteIdentifier: string,
            observableListener: IListener): IRemoveListener {
            var uid = observableListener.uid,
                contextManagerCallback = this._removeCallback.bind(this);

            this.__add(absoluteIdentifier, observableListener);

            ContextManager.pushRemoveListener(absoluteIdentifier, uid, contextManagerCallback);

            return () => {
                ContextManager.removeIdentifier([uid], absoluteIdentifier);
                contextManagerCallback(absoluteIdentifier, uid);
            };
        }

        /**
         * Observes a property on a given context specified by an identifier.
         * 
         * @param identifier The full identifier path for the property being observed.
         * @param immediateContext The object whose property will be observed.
         * @param key The property key for the value on the immediateContext that's 
         * being observed.
         */
        _define(identifier: string, immediateContext: any, key: string): void {
            var value = immediateContext[key];

            if (isObject(value)) {
                this.__defineObject(identifier, immediateContext, key);
            } else {
                this.__definePrimitive(identifier, immediateContext, key);
            }
        }

        /**
         * Intercepts an array function for observation.
         * 
         * @param absoluteIdentifier The full identifier path for the observed array.
         * @param method The array method being called.
         */
        _overwriteArrayFunction(absoluteIdentifier: string, method: string): (...args: any[]) => any {
            var callbackObjects = ContextManager.observedArrayListeners[absoluteIdentifier],
                _this = this;

            // We can't use a fat-arrow function here because we need the array context.
            return function observedArrayFn(...args: any[]) {
                var oldArray = this.slice(0),
                    returnValue: any;

                if (method.indexOf('shift') !== -1) {
                    _this.__isArrayFunction = true;
                    returnValue = (<any>Array.prototype)[method].apply(this, args);
                    _this.__isArrayFunction = false;
                    _this._notifyChildProperties(absoluteIdentifier, this, oldArray);
                } else {
                    returnValue = (<any>Array.prototype)[method].apply(this, args);
                }

                var keys = Object.keys(callbackObjects),
                    length = keys.length,
                    callbacks: Array<(ev: IArrayMethodInfo<any>) => void>, 
                    jLength: number;

                if (oldArray.length !== this.length && method.indexOf('shift') === -1) {
                    _this._execute(absoluteIdentifier + '.length', this.length, oldArray.length);
                }

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

                return returnValue;
            };
        }

        /**
         * Removes listener callbacks based on control uid.
         * 
         * @param identifier The identifier attached to the callbacks.
         * @param uid The uid to remove the callback from.
         */
        _removeCallback(identifier: string, uid: string): void {
            var callbacks = this.__identifiers[identifier];
            if (isNull(callbacks)) {
                return;
            }

            // filter out callback objects that have matching uids
            var length = callbacks.length - 1,
                callback: IListener;

            for (var i = length; i >= 0; --i) {
                callback = callbacks[i];
                if (callback.uid === uid) {
                    callbacks.splice(i, 1);
                }
            }

            if (isEmpty(this.__identifiers[identifier])) {
                this.__identifierHash[identifier] = null;
                delete this.__identifierHash[identifier];
                this.__contextObjects[identifier] = null;
                delete this.__contextObjects[identifier];
            }
        }

        /**
         * Checks if the specified identifier is already being 
         * observed in this context.
         * 
         * @param identifier The identifier being observed.
         */
        _hasIdentifier(identifier: string): boolean {
            return !isEmpty(this.__identifiers[identifier]);
        }

        /**
         * Executes the listeners for the specified identifier on 
         * this context.
         * 
         * @param identifier The identifier attached to the callbacks.
         * @param value The new value on this context specified by 
         * the identifier.
         * @param oldValue The old value on this context specified by 
         * the identifier.
         */
        _execute(identifier: string, value: any, oldValue: any): void {
            var observableListeners = this.__identifiers[identifier];

            this.__contextObjects[identifier] = value;

            if (isUndefined(value)) {
                delete this.__contextObjects[identifier];
            }

            if (isNull(observableListeners)) {
                return;
            }

            for (var i = 0; i < observableListeners.length; ++i) {
                observableListeners[i].listener(value, oldValue);
            }
        }

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
        private __add(identifier: string, observableListener: IListener): void {
            var callbacks = this.__identifiers[identifier];

            if (isNull(callbacks)) {
                callbacks = this.__identifiers[identifier] = [];
            }

            callbacks.push(observableListener);

            if (isNull(this.__identifierHash[identifier])) {
                this.__addHashValues(identifier);
            }
        }
        private __addHashValues(identifier: string) {
            var split = identifier.split('.'),
                ident = '',
                hashValue: Array<string>;

            ident = split.shift();
            hashValue = this.__identifierHash[ident];

            if (isNull(hashValue)) {
                hashValue = this.__identifierHash[ident] = [];
                if (split.length === 0) {
                    return;
                }
            }

            hashValue.push(identifier);

            while (split.length > 0) {
                ident += '.' + split.shift();
                hashValue = this.__identifierHash[ident];

                if (isNull(hashValue)) {
                    hashValue = this.__identifierHash[ident] = [];
                }
                if (ident !== identifier) {
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

    register.injectable(__ContextManagerStatic, IContextManagerStatic, null, register.STATIC);

        /**
     * The external interface for the '$ContextManagerStatic' injectable.
     */
    export interface IContextManagerStatic {
        /**
         * A set of functions to be fired when a particular observed array is mutated.
         * 
         * @static
         */
        observedArrayListeners: IObject<IObject<Array<(ev: IArrayMethodInfo<any>) => void>>>;

        /**
         * Gets the ContextManager associated to the given control. If no 
         * ContextManager exists, one is created for that control.
         * 
         * @static
         * @param control The control on which to locate the ContextManager
         */
        getManager(control: IControl): IContextManager;
        getManager(control: any): IContextManager;

        /**
         * Removes all the listeners for a given control's uid.
         * 
         * @static
         * @param control The control whose manager is being disposed.
         * @param persist Whether or not the control's context needs to 
         * be persisted post-disposal or can be set to null.
         */
        dispose(control: IControl, persist?: boolean): void;

        /**
         * Removes all listeners for an Array associated with a given uid.
         * 
         * @static
         * @param absoluteIdentifier The identifier used to locate the array.
         * @param uid The uid used to search for listeners.
         */
        removeArrayListeners(absoluteIdentifier: string, uid: string): void;

        /**
         * Safely retrieves the local context given a root context and an Array of
         * property strings.
         * 
         * @static
         * @param rootContext The root object in which to find a local context.
         * @param split The string array containing properties used to index into
         * the rootContext.
         */
        getContext(rootContext: any, split: Array<string>): void;

        /**
         * Defines an object property with the associated value. Useful for unobserving objects.
         * 
         * @static
         * @param obj The object on which to define the property.
         * @param key The property key.
         * @param value The value used to define the property.
         * @param enumerable Whether or not the property should be enumerable (able to be iterated 
         * over in a loop)
         * @param configurable Whether or not the property is able to be reconfigured.
         */
        defineProperty(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean): void;

        /**
         * Defines an object property as a getter with the associated value. Useful for unobserving objects.
         * 
         * @static
         * @param obj The object on which to define the property.
         * @param key The property key.
         * @param value The value used to define the property.
         * @param enumerable Whether or not the property should be enumerable (able to be iterated 
         * over in a loop)
         * @param configurable Whether or not the property is able to be reconfigured.
         */
        defineGetter(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean): void;

        /**
         * Pushes the function for removing an observed property upon adding the property.
         * 
         * @static
         * @param identifer The identifier for which the remove listener is being pushed.
         * @param uid The uid of the control observing the identifier.
         * @param listener The function for removing the observed property.
         */
        pushRemoveListener(identifier: string, uid: string, listener: IRemoveListener): void;

        /**
         * Removes a specified identifier from being observed for a given set of control uids.
         * 
         * @static
         * @param uids The set of uids for which to remove the specified identifier.
         * @param identifier The identifier to stop observing.
         */
        removeIdentifier(uids: Array<string>, identifier: string): void;

        /**
         * Ensures that an identifier path will exist on a given control. Will create
         * objects/arrays if necessary.
         *
         * @static
         * @param control The control on which to create the context.
         * @param identifier The period-delimited identifier string used to create
         * the context path.
         */
        createContext(control: ui.ITemplateControl, identifier: string): any;
    }

    /**
     * Describes an object that manages observing properties on any object.
     */
    export interface IContextManager {
        /**
         * The context to be managed.
         */
        context: any;

        /**
         * Safely retrieves the local context for this ContextManager given an Array of
         * property strings.
         * 
         * @param split The string array containing properties used to index into
         * the context.
         */
        getContext(split: Array<string>): any;

        /**
         * Given a period-delimited identifier, observes an object and calls the given listener when the 
         * object changes.
         * 
         * @param absoluteIdentifier The period-delimited identifier noting the property to be observed.
         * @param observableListener An object implmenting IObservableListener. The listener will be 
         * notified of object changes.
         */
        observe(identifier: string, observableListener: IListener): IRemoveListener;

        /**
         * Observes an array and calls the listener when certain functions are called on 
         * that array. The watched functions are push, pop, shift, splice, unshift, sort, 
         * and reverse.
         * 
         * @param uid The uid of the object observing the array.
         * @param listener The callback for when an observed Array function has been called.
         * @param absoluteIdentifier The identifier from the root context used to find the array.
         * @param array The array to be observed.
         * @param oldArray The old array to stop observing.
         */
        observeArray(uid: string, listener: (ev: IArrayMethodInfo<any>) => void,
            absoluteIdentifier: string, array: Array<any>, oldArray: Array<any>): IRemoveListener;

        /**
         * Disposes the memory for an IContextManager.
         */
        dispose(): void;
    }

    /**
     * An object specifying a listener callback function and a unique id to use to manage the
     * listener.
     */
    export interface IListener {
        /**
         * A listener method called when the object it is observing is changed.
         * 
         * @param value The new value of the object.
         * @param oldValue The previous value of the object.
         */
        listener(value: any, oldValue: any): void;

        /**
         * A unique id used to manage the listener.
         */
        uid: string;
    }

    /**
     * An object for Array method info. Takes a 
     * generic type to denote the type of array it uses.
     */
    export interface IArrayMethodInfo<T> {
        /**
         * The method name that was called. Possible values are:
         * 'push', 'pop', 'reverse', 'shift', 'sort', 'splice', 
         * and 'unshift'
         */
        method: string;

        /**
         * The value returned from the called function.
         */
        returnValue: any;

        /**
         * The previous value of the array.
         */
        oldArray: Array<T>;

        /**
         * The new value of the array.
         */
        newArray: Array<T>;

        /**
         * The arguments passed into the array function.
         */
        arguments: Array<any>;
    }
}

