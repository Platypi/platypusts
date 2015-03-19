module plat {
    'use strict';

    /**
     * @name Control
     * @memberof plat
     * @kind class
     * 
     * @description
     * Used for facilitating data and DOM manipulation. Contains lifecycle events 
     * as well as properties for communicating with other controls. This is the base
     * class for all types of controls.
     */
    export class Control {
        /**
         * @name _Exception
         * @memberof plat.Control
         * @kind property
         * @access protected
         * @static
         * 
         * @type {plat.IExceptionStatic}
         * 
         * @description
         * Reference to the {@link plat.IExceptionStatic|IExceptionStatic} injectable.
         */
        protected static _Exception: IExceptionStatic;

        /**
         * @name _dom
         * @memberof plat.Control
         * @kind property
         * @access protected
         * @static
         * 
         * @type {plat.ui.Dom}
         * 
         * @description
         * Reference to the {@link plat.ui.Dom|Dom} injectable.
         */
        protected static _dom: ui.Dom;

        /**
         * @name _parser
         * @memberof plat.Control
         * @kind property
         * @access protected
         * @static
         * 
         * @type {plat.expressions.Parser}
         * 
         * @description
         * Reference to the {@link plat.expressions.Parser|Parser} injectable.
         */
        protected static _parser: expressions.Parser;

        /**
         * @name _ContextManager
         * @memberof plat.Control
         * @kind property
         * @access protected
         * @static
         * 
         * @type {plat.observable.IContextManagerStatic}
         * 
         * @description
         * Reference to the {@link plat.observable.IContextManagerStatic|ContextManagerStatic} injectable.
         */
        protected static _ContextManager: observable.IContextManagerStatic;

        /**
         * @name _EventManager
         * @memberof plat.Control
         * @kind property
         * @access protected
         * @static
         * 
         * @type {plat.events.IEventManagerStatic}
         * 
         * @description
         * Reference to the {@link plat.events.IEventManagerStatic|IEventManagerStatic} injectable.
         */
        protected static _EventManager: events.IEventManagerStatic;

        /**
         * @name _Promise
         * @memberof plat.Control
         * @kind property
         * @access protected
         * @static
         * 
         * @type {plat.async.IPromise}
         * 
         * @description
         * Reference to the {@link plat.async.IPromise|IPromise} injectable.
         */
        protected static _Promise: async.IPromise;

        /**
         * @name __eventListeners
         * @memberof plat.Control
         * @kind property
         * @access private
         * @static
         * 
         * @type {plat.IObject<Array<plat.IRemoveListener>>}
         * 
         * @description
         * An object containing all controls' registered event listeners.
         */
        private static __eventListeners: IObject<Array<IRemoveListener>> = {};

        /**
         * @name _Exception
         * @memberof plat.Control
         * @kind property
         * @access protected
         * 
         * @type {plat.IExceptionStatic}
         * 
         * @description
         * The plat.IExceptionStatic injectable instance
         */
        protected _Exception: IExceptionStatic = Control._Exception;

        /**
         * @name uid
         * @memberof plat.Control
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {string}
         * 
         * @description
         * A unique id, created during instantiation and found on every {@link plat.Control|Control}.
         */
        uid: string = uniqueId(__Plat);

        /**
         * @name type
         * @memberof plat.Control
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {string}
         * 
         * @description
         * The type of a {@link plat.Control|Control}.
         */
        type: string;

        /**
         * @name priority
         * @memberof plat.Control
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * Specifies the priority of the control. The purpose of 
         * this is so that controls like plat-bind can have a higher 
         * priority than plat-tap. The plat-bind will be initialized 
         * and loaded before plat-tap, meaning it has the first chance 
         * to respond to events.
         */
        priority = 0;

        /**
         * @name parent
         * @memberof plat.Control
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {plat.ui.TemplateControl}
         * 
         * @description
         * The parent control that created this control.
         */
        parent: ui.TemplateControl;

        /**
         * @name element
         * @memberof plat.Control
         * @kind property
         * @access public
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The HTMLElement that represents this {@link plat.Control|Control}. Should only be modified by controls that implement 
         * {@link plat.ui.TemplateControl|TemplateControl}. During initialize the control should populate this element with what it wishes
         * to render to the user. 
         * 
         * @remarks
         * When there is innerHTML in the element prior to instantiating the control:
         *     The element will include the innerHTML
         * When the control implements templateString or templateUrl:
         *     The serialized DOM will be auto-generated and included in the element. Any
         *     innerHTML will be stored in the innerTemplate property on the control.
         * After an {@link plat.Control|Control} is initialized its element will be compiled.
         */
        element: HTMLElement;

        /**
         * @name attributes
         * @memberof plat.Control
         * @kind property
         * @access public
         * 
         * @type {plat.ui.Attributes}
         * 
         * @description
         * The attributes object representing all the attributes for a {@link plat.Control|Control's} element. All attributes are 
         * converted from dash notation to camelCase.
         */
        attributes: ui.Attributes;

        /**
         * @name dom
         * @memberof plat.Control
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {plat.ui.Dom}
         * 
         * @description
         * Contains DOM helper methods for manipulating this control's element.
         */
        dom: ui.Dom = Control._dom;

        /**
         * @name utils
         * @memberof plat.Control
         * @kind property
         * @access public
         * 
         * @type {plat.Utils}
         * 
         * @description
         * Contains helper methods for data manipulation.
         */
        utils: Utils = acquire(__Utils);

        /**
         * @name getRootControl
         * @memberof plat.Control
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Finds the ancestor control for the given control that contains the root 
         * context.
         * 
         * @param {plat.Control} control The control with which to find the root.
         * 
         * @returns {plat.ui.TemplateControl} The root control.
         */
        static getRootControl(control: Control): ui.TemplateControl;
        static getRootControl(control: ui.TemplateControl): ui.TemplateControl {
            if (isNull(control)) {
                return control;
            } else if (!isNull(control.root)) {
                return control.root;
            }

            while (!(isNull(control.parent) || control.hasOwnContext)) {
                if (!isNull(control.root)) {
                    return control.root;
                }
                control = control.parent;
            }

            if (!control.hasOwnContext && isObject(control.context)) {
                var _Exception = Control._Exception;
                _Exception.warn('Root control: ' + control.type + ' found that sets its context to an Object but does not set the hasOwnContext ' +
                    'flag to true. Please set the flag if the control intends to use its own context.', _Exception.CONTEXT);
            }

            return control;
        }

        /**
         * @name load
         * @memberof plat.Control
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Given a control, calls the loaded method for the control if it exists.
         * 
         * @param {plat.Control} control The control to load.
         * 
         * @returns {plat.async.IThenable<void>} A Promise that resolves when the control has loaded.
         */
        static load(control: Control): async.IThenable<void> {
            var _Promise = Control._Promise;

            if (isNull(control)) {
                return _Promise.resolve();
            }

            var ctrl = <ui.TemplateControl>control;
            if (isString(ctrl.absoluteContextPath)) {
                if (isFunction(ctrl.contextChanged)) {
                    var contextManager = Control._ContextManager.getManager(ctrl.root);

                    contextManager.observe(ctrl.absoluteContextPath, {
                        uid: control.uid,
                        priority: __CONTEXT_CHANGED_PRIORITY,
                        listener: (newValue, oldValue): void => {
                            ui.TemplateControl.contextChanged(<ui.TemplateControl>control, newValue, oldValue);
                        }
                    });

                    if (isFunction((<any>ctrl).zCC__plat)) {
                        (<any>ctrl).zCC__plat();
                        deleteProperty(ctrl, 'zCC__plat');
                    }
                }

                var element = ctrl.element;
                if (isNode(element) && isFunction(element.removeAttribute)) {
                    element.removeAttribute(__Hide);
                }
            }

            if (isFunction(control.loaded)) {
                return _Promise.resolve(control.loaded());
            }

            return _Promise.resolve();
        }

        /**
         * @name dispose
         * @memberof plat.Control
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Disposes all the necessary memory for a control. Uses specific dispose 
         * methods related to a control's constructor if necessary.
         * 
         * @param {plat.Control} control The {@link plat.Control|Control} to dispose.
         * 
         * @returns {void}
         */
        static dispose(control: Control): void {
            var ctrl = <any>control;

            if (isNull(ctrl)) {
                return;
            } else if (!isUndefined(ctrl.templateControl)) {
                AttributeControl.dispose(ctrl);
                return;
            } else if (ctrl.hasOwnContext) {
                ui.ViewControl.dispose(ctrl);
                return;
            } else if (ctrl.controls) {
                ui.TemplateControl.dispose(ctrl);
                return;
            }

            if (isFunction(control.dispose)) {
                control.dispose();
            }

            Control.removeEventListeners(control);
            Control._ContextManager.dispose(control);
            control.element = null;
            Control.removeParent(control);
        }

        /**
         * @name removeParent
         * @memberof plat.Control
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Splices a control from its parent's controls list. Sets the control's parent 
         * to null.
         * 
         * @param {plat.Control} control The control whose parent will be removed.
         * 
         * @returns {void}
         */
        static removeParent(control: Control): void {
            if (isNull(control)) {
                return;
            }

            var parent = control.parent;

            if (isNull(parent)) {
                return;
            }

            var controls = parent.controls || [],
                index = controls.indexOf(control);

            if (index !== -1) {
                controls.splice(index, 1);
            }

            control.parent = null;
        }

        /**
         * @name removeEventListeners
         * @memberof plat.Control
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Removes all event listeners for a control with the given uid.
         * 
         * @param {plat.Control} control The control having its event listeners removed.
         * 
         * @returns {void}
         */
        static removeEventListeners(control: Control): void {
            if (isNull(control)) {
                return;
            }

            var removeListeners = Control.__eventListeners,
                uid = control.uid;

            var listeners = removeListeners[uid];
            if (isArray(listeners)) {
                var index = listeners.length;
                while (index-- > 0) {
                    listeners[index]();
                }

                deleteProperty(removeListeners, uid);
            }
        }

        /**
         * @name getInstance
         * @memberof plat.Control
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Returns a new instance of {@link plat.Control|Control}.
         * 
         * @returns {plat.Control} The newly instantiated control.
         */
        static getInstance(): Control {
            return new Control();
        }

        /**
         * @name __addRemoveListener
         * @memberof plat.Control
         * @kind function
         * @access private
         * @static
         * 
         * @description
         * Adds a function to remove an event listener for the control specified 
         * by its uid.
         * 
         * @param {string} uid The uid of the control associated with the remove function.
         * @param {plat.IRemoveListener} listener The remove function to add.
         * 
         * @returns {void}
         */
        private static __addRemoveListener(uid: string, listener: IRemoveListener): void {
            var removeListeners = Control.__eventListeners;

            if (isArray(removeListeners[uid])) {
                removeListeners[uid].push(listener);
                return;
            }

            removeListeners[uid] = [listener];
        }

        /**
         * @name __spliceRemoveListener
         * @memberof plat.Control
         * @kind function
         * @access private
         * @static
         * 
         * @description
         * Removes a {@link plat.IRemoveListener|IRemoveListener} from a control's listeners.
         * 
         * @param {string} uid The uid of the control associated with the remove function.
         * @param {plat.IRemoveListener} listener The remove function to add.
         * 
         * @returns {void}
         */
        private static __spliceRemoveListener(uid: string, listener: IRemoveListener): void {
            var removeListeners = Control.__eventListeners,
                controlListeners = removeListeners[uid];

            if (isArray(controlListeners)) {
                var index = controlListeners.indexOf(listener);
                if (index === -1) {
                    return;
                }

                controlListeners.splice(index, 1);
            }
        }

        /**
         * @name __getControls
         * @memberof plat.Control
         * @kind function
         * @access private
         * @static
         * 
         * @description
         * Gets controls that have a specific key/value string pair.
         * 
         * 
         * @param {plat.Control} control The at which to start searching for key/value pairs.
         * @param {string} key The key to search for on all the controls in the tree.
         * @param {string} value The expected value used to find similar controls.
         * 
         * @returns {Array<plat.Control>} The controls matching the input key/value pair.
         */
        private static __getControls(control: Control, key: string, value: string): Array<Control> {
            var controls: Array<Control> = [],
                root = Control.getRootControl(control),
                child: Control;

            if (!isNull(root) && (<any>root)[key] === value) {
                controls.push(root);
            }

            var children = root.controls;

            if (isNull(children)) {
                return controls;
            }

            var queue = (<Array<Control>>[]).concat(children);
            while (queue.length > 0) {
                child = queue.shift();

                if ((<any>child)[key] === value) {
                    controls.push(child);
                }

                if (isNull((<ui.TemplateControl>child).controls)) {
                    continue;
                }

                queue = queue.concat((<ui.TemplateControl>child).controls);
            }

            return controls;
        }

        /**
         * @name constructor
         * @memberof plat.Control
         * @kind function
         * @access public
         * 
         * @description
         * The constructor for a control. Any injectables specified during control registration will be
         * passed into the constructor as arguments as long as the control is instantiated with its associated
         * injector.
         * 
         * @returns {plat.Control}
         */
        constructor() { }

        /**
         * @name initialize
         * @memberof plat.Control
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * The initialize event method for a control. In this method a control should initialize all the necessary 
         * variables. This method is typically only necessary for view controls. If a control does not implement 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl} then it is not safe to access, observe, or modify 
         * the context property in this method. A view control should call services/set context in this method in 
         * order to fire the loaded event. No control will be loaded until the view control has specified a context.
         * 
         * @returns {void}
         */
        initialize(): void { }

        /**
         * @name loaded
         * @memberof plat.Control
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * The loaded event method for a control. This event is fired after a control has been loaded,
         * meaning all of its children have also been loaded and initial DOM has been created and populated. It is now 
         * safe for all controls to access, observe, and modify the context property.
         * 
         * @returns {void}
         */
        loaded(): void { }

        /**
         * @name getControlsByName
         * @memberof plat.Control
         * @kind function
         * @access public
         * 
         * @description
         * Retrieves all the controls with the specified name.
         * 
         * @param {string} name The string name with which to populate the returned controls array.
         * 
         * @returns {Array<plat.Control>} The controls that match the input name.
         */
        getControlsByName(name: string): Array<Control> {
            return Control.__getControls(this, 'name', name);
        }

        /**
         * @name getControlsByType
         * @memberof plat.Control
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Retrieves all the controls of the specified type.
         * 
         * @typeparam {plat.Control} T The type of control to be returned in an Array.
         * 
         * @param {string} type The type used to find controls (e.g. 'plat-foreach')
         * 
         * @returns {Array<T>} The controls matching the input type.
         */
        getControlsByType<T extends Control>(type: string): Array<T>;
        /**
         * @name getControlsByType
         * @memberof plat.Control
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Retrieves all the controls of the specified type.
         * 
         * @typeparam {plat.Control} T The type of control to be returned in an Array.
         * 
         * @param {new () => T} Constructor The constructor used to find controls.
         * 
         * @returns {Array<T>} The controls matching the input type.
         */
        getControlsByType<T extends Control>(Constructor: new () => T): Array<T>;
        getControlsByType(type: any): Array<any> {
            if (isString(type)) {
                return Control.__getControls(this, 'type', type);
            }
            return Control.__getControls(this, 'constructor', type);
        }

        /**
         * @name addEventListener
         * @memberof plat.Control
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Adds an event listener of the specified type to the specified element. Removal of the 
         * event is handled automatically upon disposal.
         * 
         * @param {EventTarget} element The element to add the event listener to.
         * @param {string} type The type of event to listen to.
         * @param {plat.ui.IGestureListener} listener The listener to fire when the event occurs.
         * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase 
         * of event propagation.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop listening to the event.
         */
        addEventListener(element: EventTarget, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        /**
         * @name addEventListener
         * @memberof plat.Control
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Adds an event listener of the specified type to the specified element. Removal of the 
         * event is handled automatically upon disposal.
         * 
         * @param {EventTarget} element The element to add the event listener to.
         * @param {string}  type The type of event to listen to.
         * @param {EventListener} listener The listener to fire when the event occurs.
         * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase 
         * of event propagation.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop listening to the event.
         */
        addEventListener(element: EventTarget, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
        addEventListener(element: any, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener {
            if (!isFunction(listener)) {
                var _Exception: IExceptionStatic = this._Exception;
                _Exception.warn('"Control.addEventListener" must take a function as the third argument.', _Exception.EVENT);
                return noop;
            }

            listener = listener.bind(this);
            var removeListener = this.dom.addEventListener(element, type, listener, useCapture),
                uid = this.uid;

            Control.__addRemoveListener(uid, removeListener);

            return (): void => {
                removeListener();
                Control.__spliceRemoveListener(uid, removeListener);
            };
        }

        /**
         * @name observe
         * @memberof plat.Control
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Allows a {@link plat.Control|Control} to observe any property on its context and receive updates when
         * the property is changed.
         * 
         * @typeparam {any} T The type of object to observe.
         * 
         * @param {plat.IIdentifierChangedListener<T>} listener The method called when the property is changed. 
         * This method will have its 'this' context set to the control instance.
         * @param {string} identifier? The property string that denotes the item in the context (e.g. "foo.bar.baz" is observing the 
         * property `baz` in the object `bar` in the object `foo` in the control's context.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop observing the property.
         */
        observe<T>(listener: (value: T, oldValue: T, identifier: string) => void, identifier?: string): IRemoveListener;
        /**
         * @name observe
         * @memberof plat.Control
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Allows a {@link plat.Control|Control} to observe any property on its context and receive updates when
         * the property is changed.
         * 
         * @typeparam {any} T The type of object to observe.
         * 
         * @param {plat.IIdentifierChangedListener<T>} listener The method called when the property is changed. This method 
         * will have its 'this' context set to the control instance.
         * @param {number} index? The index that denotes the item in the context if the context is an Array.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop observing the property.
         */
        observe<T>(listener: (value: T, oldValue: T, index: number) => void, index?: number): IRemoveListener;
        observe(listener: (value: any, oldValue: any, identifier: any) => void, identifier?: any): IRemoveListener {
            var control = isObject((<ui.TemplateControl>this).context) ? <ui.TemplateControl>this : this.parent;
            if (isNull(control)) {
                return noop;
            }

            var absoluteIdentifier: string;
            if (isEmpty(identifier)) {
                absoluteIdentifier = control.absoluteContextPath;
            } else if (isString(identifier)) {
                var identifierExpression = (Control._parser || <expressions.Parser>acquire(__Parser)).parse(identifier);
                absoluteIdentifier = control.absoluteContextPath + '.' + identifierExpression.identifiers[0];
            } else {
                absoluteIdentifier = control.absoluteContextPath + '.' + identifier;
            }

            var _ContextManager: observable.IContextManagerStatic = Control._ContextManager || acquire(__ContextManagerStatic),
                contextManager = _ContextManager.getManager(Control.getRootControl(control));

            return contextManager.observe(absoluteIdentifier, {
                listener: (newValue: any, oldValue: any): void => {
                    listener.call(this, newValue, oldValue, identifier);
                },
                uid: this.uid
            });
        }

        /**
         * @name observeArray
         * @memberof plat.Control
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Allows a {@link plat.Control|Control} to observe an array and receive updates when certain array-changing methods are called.
         * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method currently does not watch
         * every item in the array.
         * 
         * @typeparam {any} T The type of the Array to observe.
         * 
         * @param {(changes: Array<plat.observable.IArrayChanges<any>>, identifier: string) => void} listener The method called 
         * after an array-changing method is called. This method will have its 'this' context set to the control instance.
         * @param {string} identifier? The property string that denotes the array in the context.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop observing the array.
         */
        observeArray<T>(listener: (changes: Array<observable.IArrayChanges<T>>, identifier: string) => void,
            identifier?: string): IRemoveListener;
        /**
         * @name observeArray
         * @memberof plat.Control
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Allows a {@link plat.Control|Control} to observe an array and receive updates when certain array-changing methods are called.
         * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method currently does not watch
         * every item in the array.
         * 
         * @typeparam {any} T The type of the Array to observe.
         * 
         * @param {(changes: Array<plat.observable.IArrayChanges<T>>, identifier: number) => void} listener The method called 
         * after an array-changing method is called. This method will have its 'this' context set to the control instance.
         * @param {number} identifier? The index that denotes the array in the context if the context is an Array.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop observing the array.
         */
        observeArray<T>(listener: (changes: Array<observable.IArrayChanges<T>>, identifier: number) => void,
            identifier?: number): IRemoveListener;
        observeArray<T>(listener: (changes: Array<observable.IArrayChanges<T>>, identifier: any) => void,
            identifier?: any): IRemoveListener {
            var control = isObject((<ui.TemplateControl>this).context) ? <ui.TemplateControl>this : this.parent,
                context = control.context;
            if (isNull(control) || !isObject(context)) {
                return noop;
            }

            var array: Array<any>,
                absoluteIdentifier: string;

            if (isEmpty(identifier)) {
                array = context;
                absoluteIdentifier = control.absoluteContextPath;
            } else if (isString(identifier)) {
                var identifierExpression = (Control._parser || <expressions.Parser>acquire(__Parser)).parse(identifier);
                array = identifierExpression.evaluate(context);
                absoluteIdentifier = control.absoluteContextPath + '.' + identifierExpression.identifiers[0];
            } else {
                array = context[identifier];
                absoluteIdentifier = control.absoluteContextPath + '.' + identifier;
            }

            if (!isArray(array)) {
                return noop;
            }

            var listenerIsFunction = isFunction(listener);
            if (!listenerIsFunction) {
                return noop;
            }

            listener = listener.bind(this);

            var ContextManager: observable.IContextManagerStatic = Control._ContextManager || acquire(__ContextManagerStatic),
                contextManager = ContextManager.getManager(Control.getRootControl(control)),
                uid = this.uid,
                callback = (changes: Array<observable.IArrayChanges<any>>): void => {
                    listener(changes, identifier);
                },
                removeListener = contextManager.observeArrayMutation(uid, callback, absoluteIdentifier, array, null),
                removeCallback = contextManager.observe(absoluteIdentifier, {
                    listener: (newValue: Array<any>, oldValue: Array<any>): void => {
                        removeListener();
                        removeListener = contextManager
                            .observeArrayMutation(uid, callback, absoluteIdentifier, newValue, oldValue);
                    },
                    uid: uid
                });

            return (): void => {
                removeListener();
                removeCallback();
            };
        }

        /**
         * @name observeExpression
         * @memberof plat.Control
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Parses an expression string and observes any associated identifiers. When an identifier
         * value changes, the listener will be called.
         * 
         * @typeparam {any} T The type of value the expression will evaluate out to.
         * 
         * @param {plat.IIdentifierChangedListener<T>} listener The listener to call when the expression identifer values change.
         * @param {string} expression The expression string to watch for changes.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop observing the expression.
         */
        observeExpression<T>(listener: (value: T, oldValue: T, expression: string) => void, expression: string): IRemoveListener;
        /**
         * @name observeExpression
         * @memberof plat.Control
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Using a {@link plat.expressions.IParsedExpression|IParsedExpression} observes any associated identifiers. When an identifier
         * value changes, the listener will be called.
         * 
         * @typeparam {any} T The type of value the expression will evaluate out to.
         * 
         * @param {plat.IIdentifierChangedListener<T>} listener The listener to call when the expression identifer values change.
         * @param {plat.expressions.IParsedExpression} expression The expression string to watch for changes.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop observing the expression.
         */
        observeExpression<T>(listener: (value: T, oldValue: T, expression: string) => void, expression: expressions.IParsedExpression): IRemoveListener;
        observeExpression(listener: (value: any, oldValue: any, expression: string) => void, expression: any): IRemoveListener {
            if (isEmpty(expression)) {
                return noop;
            }

            if (isString(expression)) {
                expression = (Control._parser || <expressions.Parser>acquire(__Parser)).parse(expression);
            } else if (!isFunction(expression.evaluate)) {
                return noop;
            }

            var control: ui.TemplateControl = !isNull((<ui.TemplateControl>(<any>this)).resources) ?
                <ui.TemplateControl>(<any>this) :
                <ui.TemplateControl>this.parent;

            if (isNull(control) || !isString(control.absoluteContextPath)) {
                return noop;
            }

            var aliases = expression.aliases,
                alias: string,
                length = aliases.length,
                resources: IObject<observable.ContextManager> = {},
                resourceObj: { resource: ui.IResource; control: ui.TemplateControl; },
                ContextManager: observable.IContextManagerStatic = Control._ContextManager || acquire(__ContextManagerStatic),
                getManager = ContextManager.getManager,
                TemplateControl = ui.TemplateControl,
                findResource = TemplateControl.findResource,
                evaluateExpression = TemplateControl.evaluateExpression,
                type: string,
                i: number;

            for (i = 0; i < length; ++i) {
                alias = aliases[i];
                resourceObj = findResource(control, alias);

                if (!isNull(resourceObj)) {
                    type = resourceObj.resource.type;
                    if (type === __OBSERVABLE_RESOURCE || type === __LITERAL_RESOURCE) {
                        resources[alias] = getManager(resourceObj.control);
                    }
                }
            }

            var identifiers = expression.identifiers,
                contextManager = getManager(Control.getRootControl(control)),
                identifier: string,
                split: Array<string> = [],
                topIdentifier: string,
                absoluteContextPath = control.absoluteContextPath,
                absolutePath = absoluteContextPath + '.',
                managers: IObject<observable.ContextManager> = {};

            length = identifiers.length;

            for (i = 0; i < length; ++i) {
                identifier = identifiers[i];
                split = identifier.split('.');
                topIdentifier = split[0];

                if (identifier[0] === '@') {
                    alias = topIdentifier.slice(1);

                    if (alias === __CONTEXT_RESOURCE) {
                        managers[absoluteContextPath + identifier.replace(topIdentifier, '')] = contextManager;
                    } else if (alias === __ROOT_CONTEXT_RESOURCE) {
                        managers[identifier.replace(topIdentifier, 'context')] = contextManager;
                    } else {
                        identifier = identifier.replace(topIdentifier, 'resources.' + alias + '.value');

                        if (!isNull(resources[alias])) {
                            managers[identifier] = resources[alias];
                        }
                    }

                    continue;
                }

                managers[absolutePath + identifier] = contextManager;
            }

            identifiers = Object.keys(managers);
            length = identifiers.length;

            var oldValue = evaluateExpression(expression, control),
                listeners: Array<IRemoveListener> = [],
                uid = this.uid;

            for (i = 0; i < length; ++i) {
                identifier = identifiers[i];

                listeners.push(managers[identifier].observe(identifier, {
                    uid: uid,
                    listener: (): void => {
                        var value = evaluateExpression(expression, control);
                        listener.call(this, value, oldValue, (<expressions.IParsedExpression>expression).expression);
                        oldValue = value;
                    }
                }));
            }

            return (): void => {
                var length = listeners.length;

                for (var i = 0; i < length; ++i) {
                    listeners[i]();
                }
            };
        }

        /**
         * @name evaluateExpression
         * @memberof plat.Control
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Evaluates an expression string, using the control.parent.context.
         * 
         * @param {string} expression The expression string to evaluate.
         * @param {IObject<any>} aliases Optional alias values to parse with the expression
         * 
         * @returns {any} The evaluated expression
         */
        evaluateExpression(expression: string, aliases?: IObject<any>): any;
        /**
         * @name evaluateExpression
         * @memberof plat.Control
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Evaluates an {@link plat.expressions.IParsedExpression|IParsedExpression} using the control.parent.context.
         * 
         * @param {string} expression The expression string to evaluate.
         * @param {IObject<any>} aliases Optional alias values to parse with the expression
         * 
         * @returns {any} The evaluated expression
         */
        evaluateExpression(expression: expressions.IParsedExpression, aliases?: IObject<any>): any;
        evaluateExpression(expression: any, aliases?: IObject<any>): any {
            return ui.TemplateControl.evaluateExpression(expression, this.parent, aliases);
        }

        /**
         * @name findProperty
         * @memberof plat.Control
         * @kind function
         * @access public
         * 
         * @description
         * Finds the first instance of the specified property 
         * in the parent control chain. Returns undefined if not found.
         * 
         * @param {string} property The property identifer
         * 
         * @returns {plat.IControlProperty} An object containing the property's parsed expression, the 
         * evaluated property value, and the control that it's on.
         */
        findProperty(property: string): IControlProperty {
            var control = <Control>this,
                expression = (Control._parser || <expressions.Parser>acquire(__Parser)).parse(property),
                value: any;

            while (!isNull(control)) {
                value = expression.evaluate(control);

                if (!isNull(value)) {
                    return {
                        expresssion: expression,
                        control: control,
                        value: value
                    };
                }

                control = <Control>control.parent;
            }
        }

        /**
         * @name dispatchEvent
         * @memberof plat.Control
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Creates a new {@link plat.events.DispatchEvent|DispatchEvent} and propagates it to controls based on the 
         * provided direction mechanism. Controls in the propagation chain that registered
         * the event using the control.on() method will receive the event. Propagation will
         * always start with the sender, so the sender can both produce and consume the same
         * event.
         * 
         * @param {string} name The name of the event to send, coincides with the name used in the
         * control.on() method.
         * @param {string} direction='up' Equivalent to {@link plat.events.EventManager.UP|EventManager.UP}
         * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
         * 
         * @returns {void}
         */
        dispatchEvent(name: string, direction?: 'up', ...args: any[]): void;
        /**
         * @name dispatchEvent
         * @memberof plat.Control
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Creates a new {@link plat.events.DispatchEvent|DispatchEvent} and propagates it to controls based on the 
         * provided direction mechanism. Controls in the propagation chain that registered
         * the event using the control.on() method will receive the event. Propagation will
         * always start with the sender, so the sender can both produce and consume the same
         * event.
         * 
         * @param {string} name The name of the event to send, coincides with the name used in the
         * control.on() method.
         * @param {string} direction='down' Equivalent to {@link plat.events.EventManager.DOWN|EventManager.DOWN}
         * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
         * 
         * @returns {void}
         */
        dispatchEvent(name: string, direction?: 'down', ...args: any[]): void;
        /**
         * @name dispatchEvent
         * @memberof plat.Control
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Creates a new {@link plat.events.DispatchEvent|DispatchEvent} and propagates it to controls based on the 
         * provided direction mechanism. Controls in the propagation chain that registered
         * the event using the control.on() method will receive the event. Propagation will
         * always start with the sender, so the sender can both produce and consume the same
         * event.
         * 
         * @param {string} name The name of the event to send, coincides with the name used in the
         * control.on() method.
         * @param {string} direction='direct' Equivalent to {@link plat.events.EventManager.DIRECT|EventManager.DIRECT}
         * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
         * 
         * @returns {void}
         */
        dispatchEvent(name: string, direction?: 'direct', ...args: any[]): void;
        /**
         * @name dispatchEvent
         * @memberof plat.Control
         * @kind function
         * @access public
         * @variation 3
         * 
         * @description
         * Creates a new {@link plat.events.DispatchEvent|DispatchEvent} and propagates it to controls based on the 
         * provided direction mechanism. Controls in the propagation chain that registered
         * the event using the control.on() method will receive the event. Propagation will
         * always start with the sender, so the sender can both produce and consume the same
         * event.
         * 
         * @param {string} name The name of the event to send, coincides with the name used in the
         * control.on() method.
         * @param {string} direction The direction in which to send the event.
         * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
         * 
         * @returns {void}
         */
        dispatchEvent(name: string, direction?: string, ...args: any[]): void;
        dispatchEvent(name: string, direction?: string, ...args: any[]): void {
            var manager: events.IEventManagerStatic = Control._EventManager || acquire(__EventManagerStatic);

            if (!manager.hasDirection(direction)) {
                if (!isUndefined(direction)) {
                    args.unshift(direction);
                }
                direction = manager.UP;
            }
            var sender: any = this;

            if (!isNull(sender.templateControl)) {
                sender = sender.templateControl;
            }

            manager.dispatch(name, sender, direction, args);
        }

        /**
         * @name on
         * @memberof plat.Control
         * @kind function
         * @access public
         * 
         * @description
         * Registers a listener for a {@link plat.events.DispatchEvent|DispatchEvent}. The listener will be called when a 
         * {@link plat.events.DispatchEvent|DispatchEvent} is propagating over the control. Any number of listeners can exist 
         * for a single event name.
         * 
         * @param {string} name The name of the event, cooinciding with the {@link plat.events.DispatchEvent|DispatchEvent} name.
         * @param {(ev: plat.events.DispatchEvent, ...args: Array<any>) => void} listener The method called when the 
         * {@link plat.events.DispatchEvent|DispatchEvent} is fired.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop listening for this event.
         */
        on(name: string, listener: (ev: events.DispatchEvent, ...args: any[]) => void): IRemoveListener {
            var _EventManager: events.IEventManagerStatic = Control._EventManager || acquire(__EventManagerStatic);
            return _EventManager.on(this.uid, name, listener, this);
        }

        /**
         * @name dispose
         * @memberof plat.Control
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * The dispose event is called when a control is being removed from memory. A control should release 
         * all of the memory it is using, including DOM event and property listeners.
         * 
         * @returns {void}
         */
        dispose(): void { }
    }

    /**
     * The Type for referencing the '_ControlFactory' injectable as a dependency.
     */
    export function IControlFactory(
        _parser?: expressions.Parser,
        _ContextManager?: observable.IContextManagerStatic,
        _EventManager?: events.IEventManagerStatic,
        _Promise?: async.IPromise,
        _dom?: ui.Dom,
        _Exception?: IExceptionStatic): IControlFactory {
        (<any>Control)._parser = _parser;
        (<any>Control)._ContextManager = _ContextManager;
        (<any>Control)._EventManager = _EventManager;
        (<any>Control)._Promise = _Promise;
        (<any>Control)._dom = _dom;
        (<any>Control)._Exception = _Exception;
        return Control;
    }

    register.injectable(__ControlFactory, IControlFactory, [
        __Parser,
        __ContextManagerStatic,
        __EventManagerStatic,
        __Promise,
        __Dom,
        __ExceptionStatic
    ], __FACTORY);

    /**
     * @name IControlFactory
     * @memberof plat
     * @kind interface
     * 
     * @description
     * Creates and manages instances of {@link plat.Control|Control}.
     */
    export interface IControlFactory {
        /**
         * @name getRootControl
         * @memberof plat.IControlFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Finds the ancestor control for the given control that contains the root 
         * context.
         * 
         * @param {plat.Control} control The control with which to find the root.
         * 
         * @returns {plat.ui.TemplateControl} The root control.
         */
        getRootControl(control: Control): ui.TemplateControl;

        /**
         * @name load
         * @memberof plat.IControlFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Given a control, calls the loaded method for the control if it exists.
         * 
         * @param {plat.Control} control The control to load.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves when the control has loaded.
         */
        load(control: Control): async.IThenable<void>;

        /**
         * @name dispose
         * @memberof plat.IControlFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Disposes all the necessary memory for a control. Uses specific dispose 
         * methods related to a control's constructor if necessary.
         * 
         * @param {plat.Control} control The {@link plat.Control|Control} to dispose.
         * 
         * @returns {void}
         */
        dispose(control: Control): void;

        /**
         * @name removeParent
         * @memberof plat.IControlFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Splices a control from its parent's controls list. Sets the control's parent 
         * to null.
         * 
         * @param {plat.Control} control The control whose parent will be removed.
         * 
         * @returns {void}
         */
        removeParent(control: Control): void;

        /**
         * @name removeEventListeners
         * @memberof plat.IControlFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Removes all event listeners for a control with the given uid.
         * 
         * @param {plat.Control} control The control having its event listeners removed.
         * 
         * @returns {void}
         */
        removeEventListeners(control: Control): void;

        /**
         * @name getInstance
         * @memberof plat.IControlFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Returns a new instance of {@link plat.Control|Control}.
         * 
         * @returns {plat.Control} The newly instantiated control.
         */
        getInstance(): Control;
    }

    /**
     * @name IControlProperty
     * @memberof plat
     * @kind interface
     * 
     * @description
     * An object that links a property to a control.
     */
    export interface IControlProperty {
        /**
         * @name expresssion
         * @memberof plat.IControlProperty
         * @kind property
         * @access public
         * 
         * @type {plat.expressions.IParsedExpression}
         * 
         * @description
         * The parsed expression of the control property.
         */
        expresssion: expressions.IParsedExpression;

        /**
         * @name value
         * @memberof plat.IControlProperty
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * The value of the property.
         */
        value: any;

        /**
         * @name control
         * @memberof plat.IControlProperty
         * @kind property
         * @access public
         * 
         * @type {plat.Control}
         * 
         * @description
         * The control on which the property is found.
         */
        control: Control;
    }

    export module observable {
        /**
         * @name IObservableProperty
         * @memberof plat.observable
         * @access public
         * @kind interface
         * 
         * @description
         * Defines the object added to a template control when its element 
         * has an attribute control that extends {@link plat.controls.ObservableAttributeControl|ObservableAttributeControl}.
         * 
         * This will contain the value of the expression as well as a way to observe the 
         * attribute value for changes.
         * 
         * @remarks
         * {@link plat.controls.Option|plat-options} is a control that implements this interface, and puts an 'options' 
         * property on its associated template control.
         * 
         * The generic type corresponds to the type of object created when the attribute 
         * expression is evaluated.
         * 
         * @typeparam {any} T The type of the value obtained from the attribute's expression.
         */
        export interface IObservableProperty<T> {
            /**
             * @name value
             * @memberof plat.observable.IObservableProperty
             * @access public
             * @kind property
             * 
             * @type {T}
             * 
             * @description
             * The value obtained from evaluating the attribute's expression.
             */
            value: T;

            /**
             * @name observe
             * @memberof plat.observable.IObservableProperty
             * @access public
             * @kind function
             * 
             * @description
             * A method for observing the attribute for changes.
             * 
             * @param {(newValue: T, oldValue: T) => void} listener The listener callback which will be pre-bound to the 
             * template control.
             * 
             * @returns {plat.IRemoveListener} A method for removing the listener.
             */
            observe(listener: (newValue: T, oldValue: T) => void): IRemoveListener;
        }

        /**
         * @name ISupportTwoWayBinding
         * @memberof plat.observable
         * @kind interface
         * 
         * @description
         * Defines methods that interact with a control that implements {@link plat.observable.IImplementTwoWayBinding|IImplementTwoWayBinding} 
         * (e.g. {@link plat.controls.Bind|Bind}.
         */
        export interface ISupportTwoWayBinding {
            /**
             * @name observeProperty
             * @memberof plat.observable.ISupportTwoWayBinding
             * @kind function
             * @access public
             * 
             * @description
             * Adds a listener to be called when the bindable property changes.
             * 
             * @param {plat.IPropertyChangedListener<any>} listener The function that acts as a listener.
             * 
             * @returns {plat.IRemoveListener} A function to stop listening for property changes.
             */
            onInput(listener: (newValue: any, oldValue: any) => void): IRemoveListener;

            /**
             * @name observeProperties
             * @memberof plat.observable.ISupportTwoWayBinding
             * @kind function
             * @access public
             * 
             * @description
             * A function that allows this control to observe both the bound property itself as well as 
             * potential child properties if being bound to an object.
             * 
             * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the 
             * databinding.
             * 
             * @returns {void}
             */
            observeProperties(binder: observable.IImplementTwoWayBinding): void;
        }

        /**
         * @name IImplementTwoWayBinding
         * @memberof plat.observable
         * @kind interface
         * 
         * @description
         * Defines methods that interact with a control that implements {@link plat.observable.ISupportTwoWayBinding|ISupportTwoWayBinding} 
         * (e.g. any control that extends {@link plat.ui.BindControl|BindControl}.
         */
        export interface IImplementTwoWayBinding {
            /**
             * @name observeProperty
             * @memberof plat.observable.IImplementTwoWayBinding
             * @kind function
             * @access public
             * @variation 0
             * 
             * @description
             * A function that allows a {@link plat.observable.ISupportTwoWayBinding|ISupportTwoWayBinding} to observe both the 
             * bound property itself as well as potential child properties if being bound to an object.
             * 
             * @typeparam {any} T The type of item being observed.
             * 
             * @param {plat.observable.IBoundPropertyChangedListener<T>} listener The listener function.
             * @param {string} identifier? The identifier off of the bound object to listen to for changes. If undefined or empty  
             * the listener will listen for changes to the bound item itself.
             * 
             * @returns {plat.IRemoveListener} A function to stop listening for changes.
             */
            observeProperty<T>(listener: IBoundPropertyChangedListener<T>, identifier?: string): IRemoveListener;
            /**
             * @name observeProperty
             * @memberof plat.observable.IImplementTwoWayBinding
             * @kind function
             * @access public
             * @variation 1
             * 
             * @description
             * A function that allows a {@link plat.observable.ISupportTwoWayBinding|ISupportTwoWayBinding} to observe both the 
             * bound property itself as well as potential child properties if being bound to an object.
             * 
             * @typeparam {any} T The type of item being observed.
             * 
             * @param {plat.observable.IBoundPropertyChangedListener<T>} listener The listener function.
             * @param {number} index? The index off of the bound object to listen to for changes if the bound object is an Array. 
             * If undefined or empty the listener will listen for changes to the bound Array itself.
             * 
             * @returns {plat.IRemoveListener} A function to stop listening for changes.
             */
            observeProperty<T>(listener: IBoundPropertyChangedListener<T>, index?: number): IRemoveListener;
            /**
             * @name observeProperty
             * @memberof plat.observable.IImplementTwoWayBinding
             * @kind function
             * @access public
             * @variation 2
             * 
             * @description
             * A function that allows a {@link plat.observable.ISupportTwoWayBinding|ISupportTwoWayBinding} to observe both the 
             * bound property itself as well as potential child properties if being bound to an object.
             * 
             * @typeparam {any} T The type of items in the Array if listening for Array mutations. 
             * 
             * @param {(changes: Array<plat.observable.IArrayChanges<T>>, identifier: string) => void} listener The listener function.
             * @param {string} identifier? The identifier off of the bound object to listen to for changes. If undefined or empty  
             * the listener will listen for changes to the bound item itself.
             * @param {boolean} arrayMutationsOnly? Whether or not to listen only for Array mutation changes. Should be set to true with a 
             * listener of this type.
             * 
             * @returns {plat.IRemoveListener} A function to stop listening for changes.
             */
            observeProperty<T>(listener: (changes: Array<IArrayChanges<T>>, identifier: string) => void,
                identifier?: string, arrayMutationsOnly?: boolean): IRemoveListener;
            /**
             * @name observeProperty
             * @memberof plat.observable.IImplementTwoWayBinding
             * @kind function
             * @access public
             * @variation 3
             * 
             * @description
             * A function that allows a {@link plat.observable.ISupportTwoWayBinding|ISupportTwoWayBinding} to observe both the 
             * bound property itself as well as potential child properties if being bound to an object.
             * 
             * @typeparam {any} T The type of items in the Array if listening for Array mutations. 
             * 
             * @param {(changes: Array<plat.observable.IArrayChanges<T>>, identifier: number) => void} listener The listener function.
             * @param {number} index? The index off of the bound object to listen to for changes if the bound object is an Array. 
             * If undefined or empty the listener will listen for changes to the bound Array itself.
             * @param {boolean} arrayMutationsOnly? Whether or not to listen only for Array mutation changes. Should be set to true with a 
             * listener of this type.
             * 
             * @returns {plat.IRemoveListener} A function to stop listening for changes.
             */
            observeProperty<T>(listener: (changes: Array<IArrayChanges<T>>, identifier: number) => void,
                index?: number, arrayMutationsOnly?: boolean): IRemoveListener;

            /**
             * @name evaluate
             * @memberof plat.observable.IImplementTwoWayBinding
             * @kind function
             * @access public
             * 
             * @description
             * Gets the current value of the bound property.
             * 
             * @returns {any} The current value of the bound property.
             */
            evaluate(): any;
        }

        /**
         * @name IBoundPropertyChangedListener
         * @memberof plat.observable
         * @kind interface
         * 
         * @description
         * Defines a function that will be called whenever a bound property specified by a given identifier has changed.
         * 
         * @typeparam {any} T The type of each value changing.
         */
        export interface IBoundPropertyChangedListener<T> {
            /**
             * @name listener
             * @memberof plat.observable.IBoundPropertyChangedListener
             * @kind function
             * @access public
             * @static
             * 
             * @description
             * The method signature for {@link plat.observable.IBoundPropertyChangedListener|IBoundPropertyChangedListener}.
             * 
             * @typeparam {any} T The type of values.
             * 
             * @param {T} newValue The new value of the observed property.
             * @param {T} oldValue The previous value of the observed property.
             * @param {any} identifier The string or number identifier that specifies the changed property.
             * @param {boolean} firstTime? True if this is the first case where the bound property is being set.
             * 
             * @returns {void}
             */
            (newValue: T, oldValue: T, identifier: any, firstTime?: boolean): void;
        }
    }
}
