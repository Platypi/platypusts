module plat {
    /**
     * Used for facilitating data and DOM manipulation. Contains lifecycle events 
     * as well as properties for communicating with other controls. This is the base
     * class for all types of controls.
     */
    export class Control implements IControl {
        static $Parser: expressions.IParser;
        static $ContextManagerStatic: observable.IContextManagerStatic;
        static $EventManagerStatic: events.IEventManagerStatic;

        /**
         * An object containing all controls' registered event listeners.
         */
        private static __eventListeners: IObject<Array<IRemoveListener>> = {};

        /**
         * Finds the ancestor control for the given control that contains the root 
         * context.
         * 
         * @static
         * @param control The control with which to find the root.
         */
        static getRootControl(control: IControl): ui.ITemplateControl;
        static getRootControl(control: ui.ITemplateControl) {
            if (isNull(control)) {
                return control;
            }

            var root = control;

            while (!(isNull(root.parent) || root.hasOwnContext)) {
                if (!isNull(root.root)) {
                    root = root.root;
                    break;
                }
                root = root.parent;
            }

            return root;
        }

        /**
         * Given a control, calls the loaded method for the control if it exists.
         * 
         * @static
         * @param control The control to load.
         */
        static load(control: IControl): void {
            if (isNull(control)) {
                return;
            }

            if (isFunction(control.loaded)) {
                control.loaded();
            }
        }

        /**
         * Disposes all the necessary memory for a control. Uses specific dispose 
         * methods related to a control's constructor if necessary.
         * 
         * @static
         * @param control The Control to dispose.
         */
        static dispose(control: IControl): void {
            var ctrl = <any>control;

            if (isNull(ctrl)) {
                return;
            } else if (!isUndefined(ctrl.templateControl)) {
                controls.AttributeControl.dispose(ctrl);
                return;
            } else if (ctrl.hasOwnContext) {
                ui.ViewControl.dispose(ctrl);
                return;
            } else if (ctrl.controls) {
                ui.TemplateControl.dispose(ctrl);
                return;
            }

            Control.removeEventListeners(control);
            Control.$ContextManagerStatic.dispose(control);
            control.dispose();

            Control.removeParent(control);
        }

        /**
         * Splices a control from its parent's controls list. Sets the control's parent 
         * to null.
         * 
         * @static
         * @param control The control whose parent will be removed.
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
         * Removes all event listeners for a control with the given uid.
         * 
         * @static
         * @param control The control having its event listeners removed.
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

                removeListeners[uid] = null;
                delete removeListeners[uid];
            }
        }

        /**
         * Returns a new instance of Control.
         * 
         * @static
         */
        static getInstance(): IControl {
            return new Control();
        }

        /**
         * Adds a function to remove an event listener for the control specified 
         * by its uid.
         * 
         * @static
         * @param uid The uid of the control associated with the remove function.
         * @param listener The remove function to add.
         */
        private static __addRemoveListener(uid: string, listener: IRemoveListener): void {
            var removeListeners = Control.__eventListeners;

            if (isArray(removeListeners[uid])) {
                removeListeners[uid].push(listener);
                return;
            }

            removeListeners[uid] = [listener];
        }

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

        private static __getControls(control: IControl, method: string, key: string): Array<IControl> {
            var controls: Array<IControl> = [],
                root = Control.getRootControl(control),
                child: IControl;

            if (!isNull(root) && (<any>root)[method] === key) {
                controls.push(root);
            }

            var children = root.controls;

            if (isNull(children)) {
                return controls;
            }

            var queue: Array<IControl> = [];
            queue = queue.concat(children);

            while (queue.length > 0) {
                child = queue.shift();

                if ((<any>child)[method] === key) {
                    controls.push(child);
                }

                if (isNull((<ui.ITemplateControl>child).controls)) {
                    continue;
                }

                queue = queue.concat((<ui.ITemplateControl>child).controls);
            }

            return controls;
        }

        uid: string;
        name: string;
        type: string;
        parent: ui.ITemplateControl;
        element: HTMLElement;
        attributes: ui.IAttributesInstance;
        dom: ui.IDom = acquire(__Dom);

        /**
         * The constructor for a control. Any injectables specified during control registration will be
         * passed into the constructor as arguments as long as the control is instantiated with its associated
         * injector.
         */
        constructor() {
            var ContextManager: observable.IContextManagerStatic = Control.$ContextManagerStatic ||
                acquire(__ContextManagerStatic);
            ContextManager.defineGetter(this, 'uid', uniqueId('plat_'));
        }

        initialize() { }

        loaded() { }

        getControlsByName(name: string): Array<IControl> {
            return Control.__getControls(this, 'name', name);
        }

        getControlsByType<T extends Control>(type: string): Array<T>;
        getControlsByType<T extends Control>(Constructor: new () => T): Array<T>;
        getControlsByType(type: any) {
            if (isString(type)) {
                return Control.__getControls(this, 'type', type);
            }
            return Control.__getControls(this, 'constructor', type);
        }

        addEventListener(element: Node, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        addEventListener(element: Window, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        addEventListener(element: any, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener {
            var removeListener = this.dom.addEventListener(element, type, listener, useCapture),
                uid = this.uid;

            Control.__addRemoveListener(uid, removeListener);

            return () => {
                removeListener();
                Control.__spliceRemoveListener(uid, removeListener);
            };
        }

        observe<T>(context: any, property: string, listener: (value: T, oldValue: any) => void): IRemoveListener;
        observe<T>(context: any, property: number, listener: (value: T, oldValue: T) => void): IRemoveListener;
        observe(context: any, property: any, listener: (value: any, oldValue: any) => void): IRemoveListener {
            if (isNull(context) || !context.hasOwnProperty(property)) {
                return;
            }

            var control = isFunction((<any>this).getAbsoluteIdentifier) ? this : <IControl>this.parent,
                absoluteIdentifier = (<ui.ITemplateControl>control).getAbsoluteIdentifier(context);

            if (isNull(absoluteIdentifier)) {
                return;
            }

            var contextManager = Control.$ContextManagerStatic.getManager(Control.getRootControl(this));

            return contextManager.observe(absoluteIdentifier + '.' + property, {
                listener: listener.bind(this),
                uid: this.uid
            });
        }

        observeArray<T>(context: any, property: string, listener: (ev: observable.IArrayMethodInfo<T>) => void): IRemoveListener;
        observeArray<T>(context: Array<T>, property: number, listener: (ev: observable.IArrayMethodInfo<T>) => void): IRemoveListener;
        observeArray(context: any, property: any, listener: (ev: observable.IArrayMethodInfo<any>) => void): IRemoveListener {
            if (isNull(context) || !context.hasOwnProperty(property)) {
                return;
            }

            var array = context[property],
                callback = listener.bind(this);

            if (!isArray(array)) {
                return;
            }

            var control = isFunction((<any>this).getAbsoluteIdentifier) ? this : <IControl>this.parent,
                absoluteIdentifier = (<ui.ITemplateControl>control).getAbsoluteIdentifier(context),
                ContextManager = Control.$ContextManagerStatic;

            if (isNull(absoluteIdentifier)) {
                if (property === 'context') {
                    absoluteIdentifier = (<ui.ITemplateControl>control).absoluteContextPath;
                } else {
                    return;
                }
            } else {
                absoluteIdentifier += '.' + property;
            }

            var contextManager = ContextManager.getManager(Control.getRootControl(this)),
                uid = this.uid,
                removeCallback = contextManager.observe(absoluteIdentifier, {
                    listener: (newValue: Array<any>, oldValue: Array<any>) => {
                        removeListener();
                        removeListener = contextManager.observeArray(this.uid, callback, absoluteIdentifier, newValue, oldValue);
                    },
                    uid: uid
                }),
                removeListener = contextManager.observeArray(this.uid, callback, absoluteIdentifier, array, null);

            // need to call callback if 
            return () => {
                ContextManager.removeArrayListeners(absoluteIdentifier, uid);
                removeListener();
                removeCallback();
            };
        }

        observeExpression(expression: string, listener: (value: any, oldValue: any) => void): IRemoveListener;
        observeExpression(expression: expressions.IParsedExpression, listener: (value: any, oldValue: any) => void): IRemoveListener;
        observeExpression(expression: any, listener: (value: any, oldValue: any) => void): IRemoveListener {
            if (isNull(expression)) {
                return noop;
            } else if (!(isString(expression) || isFunction(expression.evaluate))) {
                return noop;
            }

            var parsedExpression: expressions.IParsedExpression = isString(expression) ? Control.$Parser.parse(expression) : expression,
                aliases = parsedExpression.aliases,
                control: ui.TemplateControl = !isNull((<ui.TemplateControl>this).resources) ?
                    <ui.TemplateControl>this :
                    <ui.TemplateControl>this.parent,
                alias: string,
                length = aliases.length,
                resources: IObject<observable.IContextManager> = {},
                ContextManager = Control.$ContextManagerStatic,
                getManager = ContextManager.getManager,
                TemplateControl = ui.TemplateControl,
                findResource = TemplateControl.findResource,
                evaluateExpression = TemplateControl.evaluateExpression,
                i: number;

            if (isNull(control)) {
                return noop;
            }

            for (i = 0; i < length; ++i) {
                alias = aliases[i];

                var resourceObj = findResource(control, alias);
                if (!isNull(resourceObj) && resourceObj.resource.type === 'observable') {
                    resources[alias] = getManager(resourceObj.control);
                }
            }

            var identifiers = parsedExpression.identifiers,
                contextManager = getManager(Control.getRootControl(control)),
                identifier: string,
                split: Array<string> = [],
                absolutePath = control.absoluteContextPath + '.',
                managers: IObject<observable.IContextManager> = {};

            length = identifiers.length;

            for (i = 0; i < length; ++i) {
                identifier = identifiers[i];
                split = identifier.split('.');

                if (identifier.indexOf('this') === 0) {
                    identifier = identifier.slice(5);
                } else if (identifier[0] === '@') {
                    alias = split[0].substr(1);
                    identifier = identifier.replace('@' + alias, 'resources.' + alias + '.value');

                    if (!isNull(resources[alias])) {
                        managers[identifier] = resources[alias];
                    }

                    continue;
                }

                managers[absolutePath + identifier] = contextManager;
            }

            identifiers = Object.keys(managers);
            length = identifiers.length;

            var oldValue = evaluateExpression(parsedExpression, control),
                listeners: Array<IRemoveListener> = [],
                uid = this.uid;

            for (i = 0; i < length; ++i) {
                identifier = identifiers[i];

                listeners.push(managers[identifier].observe(identifier, {
                    uid: uid,
                    listener: () => {
                        var value = evaluateExpression(parsedExpression, control);
                        listener.call(this, value, oldValue);
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

        evaluateExpression(expression: string, context?: any): any;
        evaluateExpression(expression: expressions.IParsedExpression, context?: any): any;
        evaluateExpression(expression: any, context?: any): any {
            var TemplateControl = ui.TemplateControl;
            return TemplateControl.evaluateExpression(expression, this.parent, context);
        }

        dispatchEvent(name: string, direction?: string, ...args: any[]): void;
        dispatchEvent(name: string, direction?: 'up', ...args: any[]): void;
        dispatchEvent(name: string, direction?: 'down', ...args: any[]): void;
        dispatchEvent(name: string, direction?: 'direct', ...args: any[]): void;
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

        on(name: string, listener: (ev: events.IDispatchEventInstance, ...args: any[]) => void): IRemoveListener;
        on(name: 'routeChange', listener: (ev: events.IDispatchEventInstance, route: web.IRoute<any>) => void): IRemoveListener;
        on(name: string, listener: (ev: events.IDispatchEventInstance, ...args: any[]) => void): IRemoveListener {
            var manager = Control.$EventManagerStatic;
            return manager.on(this.uid, name, listener, this);
        }

        dispose(): void { }
    }

    /**
     * The Type for referencing the '$ControlFactory' injectable as a dependency.
     */
    export function IControlFactory(
            $Parser?: expressions.IParser,
            $ContextManagerStatic?: observable.IContextManagerStatic,
            $EventManagerStatic?: events.IEventManagerStatic): IControlFactory {
        Control.$Parser = $Parser;
        Control.$ContextManagerStatic = $ContextManagerStatic;
        Control.$EventManagerStatic = $EventManagerStatic;
        return Control;
    }

    register.injectable(__ControlFactory, IControlFactory, [
        __Parser,
        __ContextManagerStatic,
        __EventManagerStatic
    ], register.FACTORY);

    /**
     * Creates and manages instances of IControl.
     */
    export interface IControlFactory {
        /**
         * Finds the ancestor control for the given control that contains the root
         * context.
         *
         * @static
         * @param control The control with which to find the root.
         * @return {ui.ITemplateControl}
         */
        getRootControl(control: IControl): ui.ITemplateControl;
        getRootControl(control: ui.ITemplateControl): ui.ITemplateControl;

        /**
         * Given a control, calls the loaded method for the control if it exists.
         *
         * @static
         * @param control The control to load.
         */
        load(control: IControl): void;

        /**
         * Disposes all the necessary memory for a control. Uses specific dispose
         * methods related to a control's constructor if necessary.
         *
         * @static
         * @param control The Control to dispose.
         */
        dispose(control: IControl): void;

        /**
         * Splices a control from its parent's controls list. Sets the control's parent
         * to null.
         *
         * @static
         * @param control The control whose parent will be removed.
         */
        removeParent(control: IControl): void;

        /**
         * Removes all event listeners for a control with the given uid.
         *
         * @static
         * @param control The control having its event listeners removed.
         */
        removeEventListeners(control: IControl): void;

        /**
         * Returns a new instance of an IControl.
         *
         * @static
         */
        getInstance(): IControl;
    }

    /**
     * Describes an object used for facilitating data and DOM manipulation. Contains lifecycle events 
     * as well as properties for communicating with other IControls.
     */
    export interface IControl {
        /**
         * A unique id, created during instantiation and found on every IControl.
         */
        uid: string;

        /**
         * The name of an IControl.
         */
        name?: string;

        /**
         * The type of an IControl.
         */
        type?: string;

        /**
         * The parent control that created this control. If this control does not implement ui.IViewControl
         * then it will inherit its context from the parent.
         */
        parent?: ui.ITemplateControl;

        /**
         * The HTMLElement that represents this IControl. Should only be modified by controls that implement 
         * ui.ITemplateControl. During initialize the control should populate this element with what it wishes
         * to render to the user. 
         * 
         * When there is innerHTML in the element prior to instantiating the control:
         *     The element will include the innerHTML
         * When the control implements templateString or templateUrl:
         *     The serialized DOM will be auto-generated and included in the element. Any
         *     innerHTML will be stored in the innerTemplate property on the control.
         *    
         * After an IControl is initialized its element will be compiled.
         */
        element?: HTMLElement;

        /**
         * The attributes object representing all the attributes for an IControl's element. All attributes are 
         * converted from dash notation to camelCase.
         * 
         * @see {@link ui.Attributes}
         */
        attributes?: ui.IAttributesInstance;

        /**
         * Contains DOM helper methods for manipulating this control's element.
         */
        dom: ui.IDom;

        /**
         * The initialize event method for a control. In this method a control should initialize all the necessary 
         * variables. This method is typically only necessary for view controls. If a control does not implement 
         * ui.IViewControl then it is not safe to access, observe, or modify the context property in this method.
         * A view control should call services/set context in this method in order to fire the loaded event. No control 
         * will be loaded until the view control has specified a context.
         */
        initialize? (): void;

        /**
         * The loaded event method for a control. This event is fired after a control has been loaded,
         * meaning all of its children have also been loaded and initial DOM has been created and populated. It is now 
         * safe for all controls to access, observe, and modify the context property.
         */
        loaded? (): void;

        /**
         * Retrieves all the controls with the specified name.
         * 
         * @param name The string name with which to populate the returned controls array.
         */
        getControlsByName? (name: string): Array<IControl>;

        /**
         * Retrieves all the controls of the specified type.
         * 
         * @param type The type used to find controls (e.g. 'plat-foreach')
         */
        getControlsByType? <T extends IControl>(type: string): Array<T>;
        /**
         * Retrieves all the controls of the specified type.
         * 
         * @param Constructor The constructor used to find controls.
         * 
         * @example this.getControlsByType<ui.controls.ForEach>(ui.controls.ForEach)
         */
        getControlsByType? <T extends IControl>(Constructor: new () => T): Array<T>;

        /**
         * Adds an event listener of the specified type to the specified element. Removal of the 
         * event is handled automatically upon disposal.
         * 
         * @param element The element to add the event listener to.
         * @param type The type of event to listen to.
         * @param listener The listener to fire when the event occurs.
         * @param useCapture Whether to fire the event on the capture or the bubble phase 
         * of event propagation.
         */
        addEventListener(element: Node, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        /**
         * Adds an event listener of the specified type to the specified element. Removal of the 
         * event is handled automatically upon disposal.
         * 
         * @param element The window object.
         * @param type The type of event to listen to.
         * @param listener The listener to fire when the event occurs.
         * @param useCapture Whether to fire the event on the capture or the bubble phase 
         * of event propagation.
         */
        addEventListener(element: Window, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;

        /**
         * Allows an IControl to observe any property on its context and receive updates when
         * the property is changed.
         * 
         * @param context The immediate parent object containing the property.
         * @param property The property identifier to watch for changes.
         * @param listener The method called when the property is changed. This method will have its 'this'
         * context set to the control instance.
         */
        observe? <T>(context: any, property: string, listener: (value: T, oldValue: T) => void): IRemoveListener;
        /**
         * Allows an IControl to observe any property on its context and receive updates when
         * the property is changed.
         * 
         * @param context The immediate parent array containing the property.
         * @param property The index to watch for changes.
         * @param listener The method called when the property is changed. This method will have its 'this'
         * context set to the control instance.
         */
        observe? <T>(context: any, property: number, listener: (value: T, oldValue: T) => void): IRemoveListener;

        /**
         * Allows an IControl to observe an array and receive updates when certain array-changing methods are called.
         * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method does not watch
         * every item in the array.
         * 
         * @param context The immediate parent object containing the array as a property.
         * @param property The array property identifier to watch for changes.
         * @param listener The method called when an array-changing method is called. This method will have its 'this'
         * context set to the control instance.
         */
        observeArray? <T>(context: any, property: string, listener: (ev: observable.IArrayMethodInfo<T>) => void): IRemoveListener;
        /**
         * Allows an IControl to observe an array and receive updates when certain array-changing methods are called.
         * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method does not watch
         * every item in the array.
         * 
         * @param context The immediate parent array containing the array as a property.
         * @param property The index on the parent array, specifying the array to watch for changes.
         * @param listener The method called when an array-changing method is called. This method will have its 'this'
         * context set to the control instance.
         */
        observeArray? <T>(context: Array<T>, property: number, listener: (ev: observable.IArrayMethodInfo<T>) => void): IRemoveListener;

        /**
         * Parses an expression string and observes any associated identifiers. When an identifier
         * value changes, the listener will be called.
         * 
         * @param expression The expression string to watch for changes.
         * @param listener The listener to call when the expression identifer values change.
         */
        observeExpression(expression: string, listener: (value: any, oldValue: any) => void): IRemoveListener;
        /**
         * Uses a parsed expression to observe any associated identifiers. When an identifier
         * value changes, the listener will be called.
         * 
         * @param expression The IParsedExpression to watch for changes.
         * @param listener The listener to call when the expression identifer values change.
         */
        observeExpression(expression: expressions.IParsedExpression, listener: (value: any, oldValue: any) => void): IRemoveListener;

        /**
         * Evaluates an expression string, using the control.context.
         * 
         * @param expression The expression string to evaluate.
         * @param context An optional context with which to parse. If 
         * no context is specified, the control.context will be used.
         */
        evaluateExpression(expression: string, context?: any): any;
        /**
         * Evaluates a parsed expression, using the control.context.
         * 
         * @param expression The IParsedExpression to evaluate.
         * @param context An optional context with which to parse. If 
         * no context is specified, the control.context will be used.
         */
        evaluateExpression(expression: expressions.IParsedExpression, context?: any): any;

        /**
         * Creates a new DispatchEvent and propagates it to controls based on the 
         * provided direction mechanism. Controls in the propagation chain that registered
         * the event using the control.on() method will receive the event. Propagation will
         * always start with the sender, so the sender can both produce and consume the same
         * event.
         * 
         * @param name The name of the event to send, cooincides with the name used in the
         * control.on() method.
         * @param direction='up' Equivalent to events.EventManager.UP
         * @param ...args Any number of arguments to send to all the listeners.
         * 
         * @see events.eventDirection
         */
        dispatchEvent(name: string, direction?: 'up', ...args: any[]): void;
        /**
         * Creates a new DispatchEvent and propagates it to controls based on the 
         * provided direction mechanism. Controls in the propagation chain that registered
         * the event using the control.on() method will receive the event. Propagation will
         * always start with the sender, so the sender can both produce and consume the same
         * event.
         * 
         * @param name The name of the event to send, cooincides with the name used in the
         * control.on() method.
         * @param direction='down' Equivalent to events.EventManager.DOWN
         * @param ...args Any number of arguments to send to all the listeners.
         * 
         * @see events.eventDirection
         */
        dispatchEvent(name: string, direction?: 'down', ...args: any[]): void;
        /**
         * Creates a new DispatchEvent and propagates it to controls based on the 
         * provided direction mechanism. Controls in the propagation chain that registered
         * the event using the control.on() method will receive the event. Propagation will
         * always start with the sender, so the sender can both produce and consume the same
         * event.
         * 
         * @param name The name of the event to send, cooincides with the name used in the
         * control.on() method.
         * @param direction='direct' Equivalent to events.EventManager.DIRECT
         * @param ...args Any number of arguments to send to all the listeners.
         * 
         * @see events.eventDirection
         */
        dispatchEvent(name: string, direction?: 'direct', ...args: any[]): void;
        /**
         * Creates a new DispatchEvent and propagates it to controls based on the 
         * provided direction mechanism. Controls in the propagation chain that registered
         * the event using the control.on() method will receive the event. Propagation will
         * always start with the sender, so the sender can both produce and consume the same
         * event.
         * 
         * @param name The name of the event to send, cooincides with the name used in the
         * control.on() method.
         * @param direction An optional events.eventDirection to propagate the event, defaults to
         * events.EventManager.UP.
         * @param ...args Any number of arguments to send to all the listeners.
         * 
         * @see events.eventDirection
         */
        dispatchEvent(name: string, direction?: string, ...args: any[]): void;

        /**
         * Registers a listener for a routeChange event. The listener will be called when a routeChange event 
         * is propagating over the control. Any number of listeners can exist for a single event name.
         *
         * @param eventName='routeChange' This specifies that the listener is for a routeChange event.
         * @param listener The method called when the routeChange is fired. The route argument will contain 
         * a parsed route.
         */
        on(name: 'routeChange', listener: (ev: events.IDispatchEventInstance, route: web.IRoute<any>) => void): IRemoveListener;
        /**
         * Registers a listener for a DispatchEvent. The listener will be called when a DispatchEvent is 
         * propagating over the control. Any number of listeners can exist for a single event name.
         * 
         * @param name The name of the event, cooinciding with the DispatchEvent name.
         * @param listener The method called when the DispatchEvent is fired.
         */
        on(name: string, listener: (ev: events.IDispatchEventInstance, ...args: any[]) => void): IRemoveListener;

        /**
         * The dispose event is called when a control is being removed from memory. A control should release 
         * all of the memory it is using, including DOM event and property listeners.
         */
        dispose? (): void;
    }

    export module observable {
        /**
         * Defines the object added to a template control when its element 
         * has an attribute control that extends controls.ObservableAttributeControl.
         * 
         * This will contain the value of the expression as well as a way to observe the 
         * attribute value for changes.
         * 
         * plat-options is a control that implements this interface, and puts an 'options' 
         * property on its associated template control.
         * 
         * The generic type corresponds to the type of object created when the attribute 
         * expression is evaluated.
         */
        export interface IObservableProperty<T> {
            /**
             * The value obtained from evaluating the attribute's expression.
             */
            value: T;

            /**
             * A method for observing the attribute for changes.
             * 
             * @param listener The listener callback which will be pre-bound to the 
             * template control.
             * 
             * @return {IRemoveListener} A method for removing the listener.
             */
            observe(listener: (newValue: T, oldValue: T) => void): IRemoveListener;
        }
    }
}
