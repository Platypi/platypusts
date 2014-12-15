module plat {
    /**
     * @name Control
     * @memberof plat
     * @kind class
     * 
     * @implements {plat.IControl}
     * 
     * @description
     * Used for facilitating data and DOM manipulation. Contains lifecycle events 
     * as well as properties for communicating with other controls. This is the base
     * class for all types of controls.
     */
    export class Control implements IControl {
        /**
         * @name $Parser
         * @memberof plat.Control
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.expressions.IParser}
         * 
         * @description
         * Reference to the {@link plat.expressions.IParser|IParser} injectable.
         */
        static $Parser: expressions.IParser;

        /**
         * @name $ContextManagerStatic
         * @memberof plat.Control
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.observable.IContextManagerStatic}
         * 
         * @description
         * Reference to the {@link plat.observable.IContextManagerStatic|IContextManagerStatic} injectable.
         */
        static $ContextManagerStatic: observable.IContextManagerStatic;

        /**
         * @name $EventManagerStatic
         * @memberof plat.Control
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.events.IEventManagerStatic}
         * 
         * @description
         * Reference to the {@link plat.events.IEventManagerStatic|IEventManagerStatic} injectable.
         */
        static $EventManagerStatic: events.IEventManagerStatic;

        /**
         * @name $Promise
         * @memberof plat.Control
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.async.IPromise}
         * 
         * @description
         * Reference to the {@link plat.async.IPromise|IPromise} injectable.
         */
        static $Promise: async.IPromise;

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
         * @param {plat.IControl} control The control with which to find the root.
         * 
         * @returns {plat.ui.ITemplateControl} The root control.
         */
        static getRootControl(control: IControl): ui.ITemplateControl;
        static getRootControl(control: ui.ITemplateControl): ui.ITemplateControl {
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
         * @param {plat.IControl} control The control to load.
         * 
         * @returns {plat.async.IThenable<void>} A Promise that resolves when the control has loaded.
         */
        static load(control: IControl): async.IThenable<void> {
            if (isNull(control)) {
                return;
            }

            var ctrl = <ui.ITemplateControl>control;
            if (isString(ctrl.absoluteContextPath) && isFunction(ctrl.contextChanged)) {
                var contextManager = Control.$ContextManagerStatic.getManager(ctrl.root);

                contextManager.observe(ctrl.absoluteContextPath, {
                    uid: control.uid,
                    listener: (newValue, oldValue) => {
                        ui.TemplateControl.contextChanged(control, newValue, oldValue);
                    }
                });

                if (isFunction((<any>ctrl).zCC__plat)) {
                    (<any>ctrl).zCC__plat();
                    deleteProperty(ctrl, 'zCC__plat');
                }
            }

            if (isFunction(control.loaded)) {
                return Control.$Promise.resolve(control.loaded());
            }

            return Control.$Promise.resolve(null);
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
         * @param {plat.IControl} control The {@link plat.Control|Control} to dispose.
         * 
         * @returns {void}
         */
        static dispose(control: IControl): void {
            var ctrl = <any>control;

            if (isNull(ctrl)) {
                return;
            } else if (!isUndefined(ctrl.templateControl)) {
                AttributeControl.dispose(ctrl);
                return;
            } else if (ctrl.hasOwnContext) {
                ui.BaseViewControl.dispose(ctrl);
                return;
            } else if (ctrl.controls) {
                ui.TemplateControl.dispose(ctrl);
                return;
            }

            if (isFunction(control.dispose)) {
                control.dispose();
            }

            Control.removeEventListeners(control);
            Control.$ContextManagerStatic.dispose(control);
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
         * @param {plat.IControl} control The control whose parent will be removed.
         * 
         * @returns {void}
         */
        static removeParent(control: IControl): void {
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
         * @param {plat.IControl} control The control having its event listeners removed.
         * 
         * @returns {void}
         */
        static removeEventListeners(control: IControl): void {
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
         * @returns {plat.IControl} The newly instantiated control.
         */
        static getInstance(): IControl {
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
         * @param {plat.IControl} control The at which to start searching for key/value pairs.
         * @param {string} key The key to search for on all the controls in the tree.
         * @param {string} value The expected value used to find similar controls.
         * 
         * @returns {Array<plat.IControl>} The controls matching the input key/value pair.
         */
        private static __getControls(control: IControl, key: string, value: string): Array<IControl> {
            var controls: Array<IControl> = [],
                root = Control.getRootControl(control),
                child: IControl;

            if (!isNull(root) && (<any>root)[key] === value) {
                controls.push(root);
            }

            var children = root.controls;

            if (isNull(children)) {
                return controls;
            }

            var queue = (<Array<IControl>>[]).concat(children);
            while (queue.length > 0) {
                child = queue.shift();

                if ((<any>child)[key] === value) {
                    controls.push(child);
                }

                if (isNull((<ui.ITemplateControl>child).controls)) {
                    continue;
                }

                queue = queue.concat((<ui.ITemplateControl>child).controls);
            }

            return controls;
        }

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
        uid: string;

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
         * @type {plat.ui.ITemplateControl}
         * 
         * @description
         * The parent control that created this control.
         */
        parent: ui.ITemplateControl;

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
         * {@link plat.ui.ITemplateControl|ITemplateControl}. During initialize the control should populate this element with what it wishes
         * to render to the user. 
         * 
         * @remarks
         * When there is innerHTML in the element prior to instantiating the control:
         *     The element will include the innerHTML
         * When the control implements templateString or templateUrl:
         *     The serialized DOM will be auto-generated and included in the element. Any
         *     innerHTML will be stored in the innerTemplate property on the control.
         * After an {@link plat.IControl|IControl} is initialized its element will be compiled.
         */
        element: HTMLElement;

        /**
         * @name attributes
         * @memberof plat.Control
         * @kind property
         * @access public
         * 
         * @type {plat.ui.IAttributesInstance}
         * 
         * @description
         * The attributes object representing all the attributes for a {@link plat.Control|Control's} element. All attributes are 
         * converted from dash notation to camelCase.
         */
        attributes: ui.IAttributesInstance;

        /**
         * @name dom
         * @memberof plat.Control
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {plat.ui.IDom}
         * 
         * @description
         * Contains DOM helper methods for manipulating this control's element.
         */
        dom: ui.IDom = acquire(__Dom);

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
        constructor() {
            var ContextManager: observable.IContextManagerStatic = Control.$ContextManagerStatic ||
                acquire(__ContextManagerStatic);
            ContextManager.defineGetter(this, 'uid', uniqueId(__Plat));
        }

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
        initialize() { }

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
        loaded() { }

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
         * @returns {Array<plat.IControl>} The controls that match the input name.
         */
        getControlsByName(name: string): Array<IControl> {
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
        getControlsByType(type: any) {
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
                var Exception: IExceptionStatic = acquire(__ExceptionStatic);
                Exception.warn('"Control.addEventListener" must take a function as the third argument.', Exception.EVENT);
                return noop;
            }

            listener = listener.bind(this);
            var removeListener = this.dom.addEventListener(element, type, listener, useCapture),
                uid = this.uid;

            Control.__addRemoveListener(uid, removeListener);

            return () => {
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
         * @param {any} context The immediate parent object containing the property.
         * @param {string} property The property identifier to watch for changes.
         * @param {(value: T, oldValue: T) => void} listener The method called when the property is changed. This method 
         * will have its 'this' context set to the control instance.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop observing the property.
         */
        observe<T>(context: any, property: string, listener: (value: T, oldValue: T) => void): IRemoveListener;
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
         * @param {any} context The immediate parent object containing the property.
         * @param {number} property The property identifier to watch for changes.
         * @param {(value: T, oldValue: T) => void} listener The method called when the property is changed. This method 
         * will have its 'this' context set to the control instance.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop observing the property.
         */
        observe<T>(context: any, property: number, listener: (value: T, oldValue: T) => void): IRemoveListener;
        observe(context: any, property: any, listener: (value: any, oldValue: any) => void): IRemoveListener {
            if (isNull(context) || !context.hasOwnProperty(property)) {
                return noop;
            }

            var control = isFunction((<ui.ITemplateControl>(<any>this)).getAbsoluteIdentifier) ? this : <IControl>this.parent;
            if (isNull(control) || !isFunction((<ui.ITemplateControl>(<any>control)).getAbsoluteIdentifier)) {
                return noop;
            }

            var absoluteIdentifier = (<ui.ITemplateControl>(<any>control)).getAbsoluteIdentifier(context);
            if (isNull(absoluteIdentifier)) {
                return noop;
            }

            var contextManager = Control.$ContextManagerStatic.getManager(Control.getRootControl(this));

            return contextManager.observe(absoluteIdentifier + '.' + property, {
                listener: listener.bind(this),
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
         * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method does not watch
         * every item in the array.
         * 
         * @typeparam {any} T The type of the Array to observe.
         * 
         * @param {any} context The immediate parent object containing the array as a property.
         * @param {string} property The array property identifier to watch for changes.
         * @param {(ev: plat.observable.IArrayMethodInfo<T>) => void} listener The method called when an array-changing method is called. 
         * This method will have its 'this' context set to the control instance.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop observing the array.
         */
        observeArray<T>(context: any, property: string, listener: (ev: observable.IArrayMethodInfo<T>) => void): IRemoveListener;
        /**
         * @name observeArray
         * @memberof plat.Control
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Allows a {@link plat.Control|Control} to observe an array and receive updates when certain array-changing methods are called.
         * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method does not watch
         * every item in the array.
         * 
         * @typeparam {any} T The type of the Array to observe.
         * 
         * @param {any} context The immediate parent object containing the array as a property.
         * @param {number} property The array property identifier to watch for changes.
         * @param {(ev: plat.observable.IArrayMethodInfo<T>) => void} listener The method called when an array-changing method is called. 
         * This method will have its 'this' context set to the control instance.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop observing the array.
         */
        observeArray<T>(context: any, property: number, listener: (ev: observable.IArrayMethodInfo<T>) => void): IRemoveListener;
        observeArray(context: any, property: any, listener: (ev: observable.IArrayMethodInfo<any>) => void): IRemoveListener {
            if (isNull(context) || !context.hasOwnProperty(property)) {
                return noop;
            }

            var array = context[property];
            if (!isArray(array)) {
                return noop;
            }

            var control = isFunction((<ui.ITemplateControl>this).getAbsoluteIdentifier) ? this : <IControl>this.parent;
            if (isNull(control) || !isFunction((<ui.ITemplateControl>control).getAbsoluteIdentifier)) {
                return noop;
            }

            var absoluteIdentifier = (<ui.ITemplateControl>control).getAbsoluteIdentifier(context),
                ContextManager = Control.$ContextManagerStatic;

            if (isNull(absoluteIdentifier)) {
                if (property === __CONTEXT) {
                    absoluteIdentifier = (<ui.ITemplateControl>control).absoluteContextPath;
                } else {
                    return noop;
                }
            } else {
                absoluteIdentifier += '.' + property;
            }

            var contextManager = ContextManager.getManager(Control.getRootControl(this)),
                callback = listener.bind(this),
                uid = this.uid,
                removeListener = contextManager.observeArray(uid, callback, absoluteIdentifier, array, null),
                removeCallback = contextManager.observe(absoluteIdentifier, {
                    listener: (newValue: Array<any>, oldValue: Array<any>) => {
                        removeListener();
                        removeListener = contextManager.observeArray(uid, callback, absoluteIdentifier, newValue, oldValue);
                    },
                    uid: uid
                });

            return () => {
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
         * @param {string} expression The expression string to watch for changes.
         * @param {(value: any, oldValue: any) => void} listener The listener to call when the expression identifer values change.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop observing the expression.
         */
        observeExpression(expression: string, listener: (value: any, oldValue: any) => void): IRemoveListener;
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
         * @param {plat.expressions.IParsedExpression} expression The expression string to watch for changes.
         * @param {(value: any, oldValue: any) => void} listener The listener to call when the expression identifer values change.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop observing the expression.
         */
        observeExpression(expression: expressions.IParsedExpression, listener: (value: any, oldValue: any) => void): IRemoveListener;
        observeExpression(expression: any, listener: (value: any, oldValue: any) => void): IRemoveListener {
            if (isEmpty(expression)) {
                return noop;
            }

            if (isString(expression)) {
                expression = Control.$Parser.parse(expression);
            } else if (!isFunction(expression.evaluate)) {
                return noop;
            }

            var control: ui.TemplateControl = !isNull((<ui.TemplateControl>(<any>this)).resources) ?
                <ui.TemplateControl>(<any>this) :
                <ui.TemplateControl>this.parent;

            if (isNull(control) || !isString(control.absoluteContextPath)) {
                return noop;
            }

            listener = listener.bind(this);

            var aliases = expression.aliases,
                alias: string,
                length = aliases.length,
                resources: IObject<observable.IContextManager> = {},
                resourceObj: { resource: ui.IResource; control: ui.ITemplateControl; },
                ContextManager = Control.$ContextManagerStatic,
                getManager = ContextManager.getManager,
                TemplateControl = ui.TemplateControl,
                findResource = TemplateControl.findResource,
                evaluateExpression = TemplateControl.evaluateExpression,
                i: number;

            for (i = 0; i < length; ++i) {
                alias = aliases[i];
                resourceObj = findResource(control, alias);

                if (!isNull(resourceObj) && resourceObj.resource.type === __OBSERVABLE_RESOURCE) {
                    resources[alias] = getManager(resourceObj.control);
                }
            }

            var identifiers = expression.identifiers,
                contextManager = getManager(Control.getRootControl(control)),
                identifier: string,
                split: Array<string> = [],
                topIdentifier: string,
                absolutePath = control.absoluteContextPath + '.',
                managers: IObject<observable.IContextManager> = {};

            length = identifiers.length;

            for (i = 0; i < length; ++i) {
                identifier = identifiers[i];
                split = identifier.split('.');
                topIdentifier = split[0];

                if (topIdentifier === 'this') {
                    identifier = identifier.slice(5);
                } else if (identifier[0] === '@') {
                    alias = topIdentifier.slice(1);
                    identifier = identifier.replace(topIdentifier, 'resources.' + alias + '.value');

                    if (!isNull(resources[alias])) {
                        managers[identifier] = resources[alias];
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
                    listener: () => {
                        var value = evaluateExpression(expression, control);
                        listener(value, oldValue);
                        oldValue = value;
                    }
                }));
            }

            return () => {
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
         * @returns {IControlProperty} An object containing both the 
         * property value and the control that it's on.
         */
        findProperty(property: string): IControlProperty {
            var control = <IControl>this,
                expression = Control.$Parser.parse(property),
                value: any;

            while (!isNull(control)) {
                value = expression.evaluate(control);

                if (!isNull(value)) {
                    return {
                        control: control,
                        value: value
                    };
                }

                control = <IControl>control.parent;
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
        dispatchEvent(name: string, direction?: string, ...args: any[]) {
            var manager = Control.$EventManagerStatic;

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
         * @param {(ev: plat.events.IDispatchEventInstance, ...args: Array<any>) => void} listener The method called when the 
         * {@link plat.events.DispatchEvent|DispatchEvent} is fired.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop listening for this event.
         */
        on(name: string, listener: (ev: events.IDispatchEventInstance, ...args: any[]) => void): IRemoveListener {
            return Control.$EventManagerStatic.on(this.uid, name, listener, this);
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
     * The Type for referencing the '$ControlFactory' injectable as a dependency.
     */
    export function IControlFactory(
        $Parser?: expressions.IParser,
        $ContextManagerStatic?: observable.IContextManagerStatic,
        $EventManagerStatic?: events.IEventManagerStatic,
        $Promise?: async.IPromise): IControlFactory {
        Control.$Parser = $Parser;
        Control.$ContextManagerStatic = $ContextManagerStatic;
        Control.$EventManagerStatic = $EventManagerStatic;
        Control.$Promise = $Promise;
        return Control;
    }

    register.injectable(__ControlFactory, IControlFactory, [
        __Parser,
        __ContextManagerStatic,
        __EventManagerStatic,
        __Promise
    ], __FACTORY);

    /**
     * @name IControlFactory
     * @memberof plat
     * @kind interface
     * 
     * @description
     * Creates and manages instances of {@link plat.IControl|IControl}.
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
         * @param {plat.IControl} control The control with which to find the root.
         * 
         * @returns {plat.ui.ITemplateControl} The root control.
         */
        getRootControl(control: IControl): ui.ITemplateControl;

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
         * @param {plat.IControl} control The control to load.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves when the control has loaded.
         */
        load(control: IControl): async.IThenable<void>;

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
         * @param {plat.IControl} control The {@link plat.Control|Control} to dispose.
         * 
         * @returns {void}
         */
        dispose(control: IControl): void;

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
         * @param {plat.IControl} control The control whose parent will be removed.
         * 
         * @returns {void}
         */
        removeParent(control: IControl): void;

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
         * @param {plat.IControl} control The control having its event listeners removed.
         * 
         * @returns {void}
         */
        removeEventListeners(control: IControl): void;

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
         * @returns {plat.IControl} The newly instantiated control.
         */
        getInstance(): IControl;
    }

    /**
     * @name IControl
     * @memberof plat
     * @kind interface
     * 
     * @description
     * Used for facilitating data and DOM manipulation. Contains lifecycle events 
     * as well as properties for communicating with other controls. This is the base
     * class for all types of controls.
     */
    export interface IControl {
        /**
         * @name uid
         * @memberof plat.IControl
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {string}
         * 
         * @description
         * A unique id, created during instantiation and found on every {@link plat.Control|Control}.
         */
        uid: string;

        /**
         * @name type
         * @memberof plat.IControl
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {string}
         * 
         * @description
         * The type of a {@link plat.Control|Control}.
         */
        type?: string;

        /**
         * @name priority
         * @memberof plat.IControl
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
        priority?: number;

        /**
         * @name parent
         * @memberof plat.IControl
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {plat.ui.ITemplateControl}
         * 
         * @description
         * The parent control that created this control.
         */
        parent?: ui.ITemplateControl;

        /**
         * @name element
         * @memberof plat.IControl
         * @kind property
         * @access public
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The HTMLElement that represents this {@link plat.Control|Control}. Should only be modified by controls that implement 
         * {@link plat.ui.ITemplateControl|ITemplateControl}. During initialize the control should populate this element with what it wishes
         * to render to the user. 
         * 
         * @remarks
         * When there is innerHTML in the element prior to instantiating the control:
         *     The element will include the innerHTML
         * When the control implements templateString or templateUrl:
         *     The serialized DOM will be auto-generated and included in the element. Any
         *     innerHTML will be stored in the innerTemplate property on the control.
         * After an {@link plat.IControl|IControl} is initialized its element will be compiled.
         */
        element?: HTMLElement;

        /**
         * @name attributes
         * @memberof plat.IControl
         * @kind property
         * @access public
         * 
         * @type {plat.ui.IAttributesInstance}
         * 
         * @description
         * The attributes object representing all the attributes for a {@link plat.Control|Control's} element. All attributes are 
         * converted from dash notation to camelCase.
         */
        attributes?: ui.IAttributesInstance;

        /**
         * @name dom
         * @memberof plat.IControl
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {plat.ui.IDom}
         * 
         * @description
         * Contains DOM helper methods for manipulating this control's element.
         */
        dom: ui.IDom;

        /**
         * @name initialize
         * @memberof plat.IControl
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
        initialize? (): void;

        /**
         * @name loaded
         * @memberof plat.IControl
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * The loaded event method for a control. This event is fired after a control has been loaded,
         * meaning all of its children have also been loaded and initial DOM has been created and populated. It is now 
         * safe for all controls to access, observe, and modify the context property.
         * 
         * @returns {any} Can return a Promise, which will delay loading further controls until resolved.
         */
        loaded? (): any;

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
         * @returns {Array<plat.IControl>} The controls that match the input name.
         */
        getControlsByName? (name: string): Array<IControl>;

        /**
         * @name getControlsByType
         * @memberof plat.IControl
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
        getControlsByType? <T extends IControl>(type: string): Array<T>;
        /**
         * @name getControlsByType
         * @memberof plat.IControl
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
        getControlsByType? <T extends IControl>(Constructor: new () => T): Array<T>;

        /**
         * @name addEventListener
         * @memberof plat.IControl
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
        addEventListener? (element: EventTarget, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        /**
         * @name addEventListener
         * @memberof plat.IControl
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
        addEventListener? (element: EventTarget, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;

        /**
         * @name observe
         * @memberof plat.IControl
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
         * @param {any} context The immediate parent object containing the property.
         * @param {string} property The property identifier to watch for changes.
         * @param {(value: T, oldValue: T) => void} listener The method called when the property is changed. 
         * This method will have its 'this' context set to the control instance.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop observing the property.
         */
        observe? <T>(context: any, property: string, listener: (value: T, oldValue: T) => void): IRemoveListener;
        /**
         * @name observe
         * @memberof plat.IControl
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
         * @param {any} context The immediate parent object containing the property.
         * @param {number} property The property identifier to watch for changes.
         * @param {(value: T, oldValue: T) => void} listener The method called when the property is changed. 
         * This method will have its 'this' context set to the control instance.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop observing the property.
         */
        observe? <T>(context: any, property: number, listener: (value: T, oldValue: T) => void): IRemoveListener;

        /**
         * @name observeArray
         * @memberof plat.IControl
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Allows a {@link plat.Control|Control} to observe an array and receive updates when certain array-changing methods are called.
         * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method does not watch
         * every item in the array.
         * 
         * @typeparam {any} T The type of the Array to observe.
         * 
         * @param {any} context The immediate parent object containing the array as a property.
         * @param {string} property The array property identifier to watch for changes.
         * @param {(ev: plat.observable.IArrayMethodInfo<T>) => void} listener The method called when an array-changing method is called. 
         * This method will have its 'this' context set to the control instance.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop observing the array.
         */
        observeArray? <T>(context: any, property: string, listener: (ev: observable.IArrayMethodInfo<T>) => void): IRemoveListener;
        /**
         * @name observeArray
         * @memberof plat.IControl
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Allows a {@link plat.Control|Control} to observe an array and receive updates when certain array-changing methods are called.
         * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method does not watch
         * every item in the array.
         * 
         * @typeparam {any} T The type of the Array to observe.
         * 
         * @param {any} context The immediate parent object containing the array as a property.
         * @param {number} property The array property identifier to watch for changes.
         * @param {(ev: plat.observable.IArrayMethodInfo<T>) => void} listener The method called when an array-changing method is called. 
         * This method will have its 'this' context set to the control instance.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop observing the array.
         */
        observeArray? <T>(context: any, property: number, listener: (ev: observable.IArrayMethodInfo<T>) => void): IRemoveListener;

        /**
         * @name observeExpression
         * @memberof plat.IControl
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Parses an expression string and observes any associated identifiers. When an identifier
         * value changes, the listener will be called.
         * 
         * @param {string} expression The expression string to watch for changes.
         * @param {(value: any, oldValue: any) => void} listener The listener to call when the expression identifer values change.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop observing the expression.
         */
        observeExpression? (expression: string, listener: (value: any, oldValue: any) => void): IRemoveListener;
        /**
         * @name observeExpression
         * @memberof plat.IControl
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Using a {@link plat.expressions.IParsedExpression|IParsedExpression} observes any associated identifiers. When an identifier
         * value changes, the listener will be called.
         * 
         * @param {plat.expressions.IParsedExpression} expression The expression string to watch for changes.
         * @param {(value: any, oldValue: any) => void} listener The listener to call when the expression identifer values change.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop observing the expression.
         */
        observeExpression? (expression: expressions.IParsedExpression, listener: (value: any, oldValue: any) => void): IRemoveListener;

        /**
         * @name evaluateExpression
         * @memberof plat.IControl
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
        evaluateExpression? (expression: string, aliases?: IObject<any>): any;
        /**
         * @name evaluateExpression
         * @memberof plat.IControl
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
        evaluateExpression? (expression: expressions.IParsedExpression, aliases?: IObject<any>): any;

        /**
         * @name findProperty
         * @memberof plat.IControl
         * @kind function
         * @access public
         * 
         * @description
         * Finds the first instance of the specified property 
         * in the parent control chain. Returns undefined if not found.
         * 
         * @param {string} property The property identifer
         * 
         * @returns {IControlProperty} An object containing both the 
         * property value and the control that it's on.
         */
        findProperty(property: string): IControlProperty;

        /**
         * @name dispatchEvent
         * @memberof plat.IControl
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
        dispatchEvent? (name: string, direction?: 'up', ...args: any[]): void;
        /**
         * @name dispatchEvent
         * @memberof plat.IControl
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
        dispatchEvent? (name: string, direction?: 'down', ...args: any[]): void;
        /**
         * @name dispatchEvent
         * @memberof plat.IControl
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
        dispatchEvent? (name: string, direction?: 'direct', ...args: any[]): void;
        /**
         * @name dispatchEvent
         * @memberof plat.IControl
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
        dispatchEvent? (name: string, direction?: string, ...args: any[]): void;

        /**
         * @name on
         * @memberof plat.IControl
         * @kind function
         * @access public
         * 
         * @description
         * Registers a listener for a {@link plat.events.DispatchEvent|DispatchEvent}. The listener will be called when a 
         * {@link plat.events.DispatchEvent|DispatchEvent} is propagating over the control. Any number of listeners can 
         * exist for a single event name.
         * 
         * @param {string} name The name of the event, cooinciding with the {@link plat.events.DispatchEvent|DispatchEvent} name.
         * @param {(ev: plat.events.IDispatchEventInstance, ...args: Array<any>) => void} listener The method called when the 
         * {@link plat.events.DispatchEvent|DispatchEvent} is fired.
         * 
         * @returns {plat.IRemoveListener} A function to call in order to stop listening for this event.
         */
        on? (name: string, listener: (ev: events.IDispatchEventInstance, ...args: any[]) => void): IRemoveListener;

        /**
         * @name dispose
         * @memberof plat.IControl
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
        dispose? (): void;
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
         * @name value
         * @memberof plat.IControl
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
         * @memberof plat.IControl
         * @kind property
         * @access public
         * 
         * @type {plat.IControl}
         * 
         * @description
         * The control on which the property is found.
         */
        control: IControl;
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
    }
}
