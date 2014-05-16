module plat.ui {
    /**
     * A control class which provides properties and methods for managing its body HTML.
     */
    export class TemplateControl extends Control implements ITemplateControl {
        static $ResourcesStatic: IResourcesStatic;
        static $BindableTemplatesStatic: IBindableTemplatesStatic;
        static $ManagerCacheStatic: storage.ICache<processing.IElementManager>;
        static $ExceptionStatic: IExceptionStatic;
        static $templateCache: storage.ITemplateCache;
        static $parser: expressions.IParser;
        static $http: async.IHttp;
        static $Promise: async.IPromiseStatic;

        /**
         * Evaluates an expression string with a given control and optional context.
         * 
         * @param expression The expression string (e.g. 'foo + foo').
         * @param control The control used for evaluation context.
         * @param aliases An optional alias object containing resource alias values
         */
        static evaluateExpression(expression: string, control?: ITemplateControl, aliases?: any): any;
        /**
         * Evaluates a parsed expression with a given control and optional context.
         * 
         * @param expression An IParsedExpression created using the '$parser' injectable.
         * @param control The control used for evaluation context.
         * @param aliases An optional alias object containing resource alias values
         */
        static evaluateExpression(expression: expressions.IParsedExpression, control?: ITemplateControl, aliases?: any): any;
        static evaluateExpression(expression: any, control?: ITemplateControl, aliases?: any) {
            if (isNull(expression)) {
                return;
            } else if (!(isString(expression) || isFunction(expression.evaluate))) {
                return;
            }

            expression = isString(expression) ? TemplateControl.$parser.parse(expression) : expression;

            if (isNull(control)) {
                return expression.evaluate(null, aliases);
            }

            if (expression.aliases.length > 0) {
                aliases = TemplateControl.getResources(control, expression.aliases, aliases);
            }

            return expression.evaluate(control.context, aliases);
        }

        /**
         * Given a control and Array of aliases, finds the associated resources and builds a context object containing
         * the values. Returns the object.
         * 
         * @param control The control used as the starting point for finding resources.
         * @param aliases An array of aliases to search for.
         * @param resources An optional resources object to extend, if no resources object is passed in a new one will be created.
         */
        static getResources(control: ITemplateControl, aliases: Array<string>, resources?: any): IObject<any> {
            if (isNull(control)) {
                return {};
            }

            var length = aliases.length,
                alias: string,
                resourceObj: {
                    control: ITemplateControl;
                    resource: IResource;
                },
                cache = TemplateControl.__resourceCache[control.uid];

            if (isNull(cache)) {
                cache = TemplateControl.__resourceCache[control.uid] = {};
            }

            resources = resources || {};

            for (var i = 0; i < length; ++i) {
                alias = aliases[i];

                if (alias[0] === '@') {
                    alias = alias.substr(1);
                }

                if (!isNull(resources[alias])) {
                    continue;
                } else if (!isNull(cache[alias])) {
                    var resourceControl = cache[alias].control,
                        controlResources = resourceControl.resources;

                    if (isNull(controlResources)) {
                        resourceObj = TemplateControl.findResource(control, alias);
                    } else {
                        resourceObj = {
                            control: resourceControl,
                            resource: controlResources[alias]
                        };
                    }
                } else {
                    resourceObj = TemplateControl.findResource(control, alias);
                }

                if (isNull(resourceObj)) {
                    var Exception = TemplateControl.$ExceptionStatic;
                    Exception.warn('Attempting to use a resource that is not defined.', Exception.CONTEXT);
                    continue;
                }

                cache[alias] = resourceObj;
                resources['@' + alias] = isNull(resourceObj.resource) ? resourceObj.resource : resourceObj.resource.value;
            }

            return resources;
        }

        /**
         * Starts at a control and searches up its parent chain for a particular resource alias. 
         * If the resource is found, it will be returned along with the control instance on which
         * the resource was found.
         * 
         * @param control The control on which to start searching for the resource alias.
         * @param alias The alias to search for.
         */
        static findResource(control: ITemplateControl, alias: string): { resource: IResource; control: ITemplateControl; } {
            var resource: IResource;

            if (isNull(control) || !isString(alias) || isEmpty(alias)) {
                return null;
            }

            if (alias[0] === '@') {
                alias = alias.substr(1);
            }

            if (alias === 'rootContext') {
                control = Control.getRootControl(control);
                return {
                    resource: (<any>control.resources)[alias],
                    control: control
                };
            } else if (alias === 'context' || alias === 'control') {
                return {
                    resource: (<any>control.resources)[alias],
                    control: control
                };
            }

            while (!isNull(control)) {
                resource = (<any>control.resources)[alias];
                if (!isNull(resource)) {
                    return {
                        resource: resource,
                        control: control
                    };
                }
                control = control.parent;
            }
        }

        /**
         * Recursively disposes a control and its children.
         * @static
         * @param control A control to dispose.
         */
        static dispose(control: ITemplateControl): void {
            if (isNull(control)) {
                return;
            }

            var parent = control.parent,
                uid = control.uid,
                controls = (control.controls && control.controls.slice(0)),
                ContextManager = Control.$ContextManagerStatic,
                define = ContextManager.defineProperty;

            if (!isNull(controls)) {
                var length = controls.length - 1;

                for (var i = length; i >= 0; --i) {
                    Control.dispose(controls[i]);
                }
            }

            if (isFunction(control.dispose)) {
                control.dispose();
            }

            Control.removeEventListeners(control);
            TemplateControl.removeElement(control);

            TemplateControl.$ResourcesStatic.dispose(control);
            TemplateControl.$BindableTemplatesStatic.dispose(control);

            TemplateControl.__resourceCache[control.uid] = null;
            delete TemplateControl.__resourceCache[control.uid];

            ContextManager.dispose(control);
            events.EventManager.dispose(control.uid);

            TemplateControl.$ManagerCacheStatic.remove(uid);
            Control.removeParent(control);

            define(control, 'context', null, true, true);
            define(control, 'resources', null, true, true);
            control.attributes = null;
            control.bindableTemplates = null;
            control.controls = [];
            control.root = null;
            control.innerTemplate = null;
        }
        
        /**
         * Loads the control tree depth first (visit children, then visit self).
         * 
         * @static
         * @param control The control serving as the root control to load.
         */
        static loadControl(control: ITemplateControl) {
            var children = control.controls,
                length = children.length,
                child: ITemplateControl;

            for (var i = 0; i < length; ++i) {
                child = <ITemplateControl>children[i];
                if (!isNull(child.controls)) {
                    TemplateControl.loadControl(child);
                } else {
                    child.loaded();
                }
            }
            
            control.loaded();
        }

        /**
         * Notifies a control that its context has been changed by 
         * calling the control.contextChanged method if it exists.
         * 
         * @param control The control whose context changed.
         * @param newValue The new value of the control's context.
         * @param oldValue The old value of the control's context.
         */
        static contextChanged(control: IControl, newValue: any, oldValue: any): void;
        static contextChanged(control: ITemplateControl, newValue: any, oldValue: any) {
            control.context = newValue;

            TemplateControl.setContextResources(control);

            if (isFunction(control.contextChanged)) {
                control.contextChanged(newValue, oldValue);
            }
        }

        /**
         * Sets the 'context' resource value on a template control. If the control specifies
         * hasOwnContext, the 'rootContext' resource value will be set.
         * 
         * @param control The control whose context resources will be set.
         */
        static setContextResources(control: ITemplateControl): void {
            var value = control.context;

            if (isNull(control.resources)) {
                control.resources = TemplateControl.$ResourcesStatic.getInstance();
                control.resources.initialize(control);
            }

            if (control.hasOwnContext) {
                if (isNull((<any>control.resources).rootContext)) {
                    control.resources.add({
                        root: {
                            type: 'observable',
                            value: value
                        }
                    });
                } else {
                    (<any>control.resources).rootContext.value = value;
                }
            }

            if (isNull((<any>control.resources).context)) {
                control.resources.add({
                    context: {
                        type: 'observable',
                        value: value
                    }
                });

                return;
            }

            (<any>control.resources).context.value = value;
        }

        /**
         * Completely removes a control's element from its parentNode. If the 
         * control implements replaceWith=null, All of its nodes between its 
         * startNode and endNode (inclusive) will be removed.
         * 
         * @param control The control whose element should be removed.
         */
        static removeElement(control: ITemplateControl): void {
            if (isNull(control)) {
                return;
            }

            var dom = control.dom,
                element = control.element,
                parentNode: Node;

            if (control.replaceWith === null ||
            control.replaceWith === '' ||
            isDocumentFragment(element)) {
                dom.removeAll(control.startNode, control.endNode);
                control.elementNodes = control.startNode = control.endNode = null;
                return;
            } else if (isNull(element)) {
                return;
            }

            parentNode = element.parentNode;

            if (!isNull(parentNode)) {
                parentNode.removeChild(element);
            }

            control.element = null;
        }

        /**
         * Sets the absoluteContextPath read-only property on a control.
         * 
         * @param control The control on which to set the absoluteContextPath.
         * @param path The path to set on the control.
         */
        static setAbsoluteContextPath(control: ITemplateControl, path: string): void {
            Control.$ContextManagerStatic.defineGetter(control, 'absoluteContextPath', path, false, true);
        }

        /**
         * Determines the template for a control by searching for a templateUrl, 
         * using the provided templateUrl, or serializing the control's templateString.
         */
        static determineTemplate(control: ITemplateControl, templateUrl?: string): async.IThenable<DocumentFragment> {
            var template: any,
                templateCache = TemplateControl.$templateCache,
                dom = control.dom,
                Promise = TemplateControl.$Promise;

            if (!isNull(templateUrl)) {
                // do nothing
            } else if (!isNull(control.templateUrl)) {
                templateUrl = control.templateUrl;
            } else if (!isNull(control.templateString)) {
                var type = control.type;

                return templateCache.read(type).catch((template: any) => {
                    if (isNull(template)) {
                        template = dom.serializeHtml(control.templateString);
                }

                return templateCache.put(type, template);
                });
            } else {
                return <any>Promise.reject(null);
            }

            template = templateCache.read(templateUrl);

            var ajax = TemplateControl.$http.ajax,
                Exception = TemplateControl.$ExceptionStatic;

            return Promise.cast<DocumentFragment>(template).catch((error) => {
                if (isNull(error)) {
                    return templateCache.put(templateUrl, ajax<string>({ url: templateUrl })
                            .then<DocumentFragment>((success) => {
                        if (!isObject(success) || !isString(success.response)) {
                            Exception.warn('No template found at ' + templateUrl, Exception.AJAX);
                            return Promise.resolve(dom.serializeHtml());
                        }

                        var templateString = success.response;

                        if (isEmpty(templateString.trim())) {
                            return Promise.resolve(dom.serializeHtml());
                        }

                        template = dom.serializeHtml(templateString);

                        return templateCache.put(templateUrl, template);
                    }, (error) => {
                        postpone(() => {
                            Exception.fatal('Failure to get template from ' + templateUrl + '.', Exception.TEMPLATE);
                        });
                        return error;
                    }));
                }
            }).catch((error) => {
                postpone(() => {
                    Exception.fatal('Failure to get template from ' + templateUrl + '.', Exception.TEMPLATE);
                });
                return error;
            });
        }

        /**
         * Detaches a TemplateControl. Disposes its children, but does not dispose the TemplateControl.
         *  
         * @static
         * @param control The control to be detached.
         */
        static detach(control: ITemplateControl): void {
            if (isNull(control) || isNull(control.controls)) {
                return;
            }

            var controls = control.controls.slice(0),
                length = controls.length;

            for (var i = 0; i < length; ++i) {
                Control.dispose(controls[i]);
            }

            TemplateControl.removeElement(control);

            TemplateControl.$ResourcesStatic.dispose(control, true);

            TemplateControl.__resourceCache[control.uid] = null;
            delete TemplateControl.__resourceCache[control.uid];

            Control.$ContextManagerStatic.dispose(control, true);
            events.EventManager.dispose(control.uid);

            TemplateControl.$ManagerCacheStatic.remove(control.uid);
            Control.removeParent(control);

            control.controls = [];
            control.attributes = null;
        }

        /**
         * Returns a new instance of TemplateControl.
         * 
         * @static
         */
        static getInstance(): ITemplateControl {
            return new TemplateControl();
        }

        private static __resourceCache: any = {};

        /**
         * Specifies the absolute path from where the context was created to this control's context.
         * Used by the ContextManager for maintaining context parity.
         * 
         * @example 'context.childContextProperty.grandChildContextProperty'
         */
        absoluteContextPath: string = null;

        /**
         * The inherited singleton object used for data-binding. A control that implements IViewControl will 
         * create the context object for all of its children. Any properties bound in the DOM markup will be
         * initialized to NULL automatically. If a control does not implement IViewControl it cannot
         * directly modify the context property, and it should only modify child properties off of context.
         */
        context: any = null;

        /**
         * Resources are used for providing aliases to use in markup expressions. They 
         * are particularly useful when trying to access properties outside of the 
         * current context, as well as reassigning context at any point in an app.
         * 
         * By default, every control has a resource for '@control' and '@context'.
         * IViewControl objects also have a resource for '@root' and '@rootContext', which is a reference
         * to their root control and root context.
         * 
         * Resources can be created in HTML, or through the exposed control.resources 
         * object. If specified in HTML, they must be the first element child of the 
         * control upon which the resources will be placed. IViewControls that use a 
         * templateUrl can have resources as their first element in the templateUrl.
         * 
         * @example
         * <custom-control>
         *     <plat-resources>
         *         <injectable alias="Cache">$CacheStatic</injectable>
         *         <observable alias="testObj">
         *              { 
         *                  foo: 'foo', 
         *                  bar: 'bar', 
         *                  baz: 2 
         *              }
         *         </observable>
         *     </plat-resources>
         * </custom-control>
         * 
         * In the above example, the resources can be accessed by using '@Cache' and '@testObj'.
         * The type of resource is denoted by the element name.
         * 
         * Only resources of type 'observable' will have data binding. The types of resources are:
         * function, injectable, observable, and object. Resources of type 'function' will have their
         * associated function context bound to the control that contains the resource.
         * 
         * When an alias is found in a markup expression, the framework will search up the control chain 
         * to find the alias on a control's resources. This first matching alias will be used.
         */
        resources: IResources;
        
        /**
         * Indicates whether or not this control defines its own context. Controls that implement 
         * IViewControl will automatically implement this flag as true.
         */
        hasOwnContext: boolean = false;

        /**
         * A string representing the DOM template for this control. If this property is
         * defined on a ITemplateControl then DOM will be created and put in the 
         * control's element prior to calling the 'setTemplate' method.
         */
        templateString: string;

        /**
         * A url containing a string representing the DOM template for this control. If this property is
         * defined on a ITemplateControl then DOM will be created and put in the 
         * control's element prior to calling the 'setTemplate' method. This property takes 
         * precedence over templateString. In the event that both are defined, templateString
         * will be ignored.
         */
        templateUrl: string;

        /**
         * A DocumentFragment representing the innerHTML that existed when this control was instantiated.
         * This property will only contain the innerHTML when either a templateString or templateUrl is
         * defined.
         */
        innerTemplate: DocumentFragment;

        /**
         * A IBindableTemplates object used for binding a data context to a template. This is an
         * advanced function of a ITemplateControl.
         * 
         * @see IBindableTemplates
         */
        bindableTemplates: IBindableTemplates;

        /**
         * An array of child controls. Any controls created by this control can be found in this array. The controls in
         * this array will have reference to this control in their parent property.
         */
        controls: Array<IControl>;

        /**
         * A Node array for managing the ITemplateControl's childNodes in the event that this control
         * replaces its element. This property will only be useful for a ITemplateControl that implements
         * replaceWith = null.
         */
        elementNodes: Array<Node>;

        /**
         * The first node in the ITemplateControl's body. This property will be a Comment node when the
         * control implements replaceWith = null, otherwise it will be null. This property allows a ITemplateControl
         * to add nodes to its body in the event that it replaces its element.
         * 
         * @example this.startNode.parentNode.insertBefore(node, this.startNode.nextSibling);
         */
        startNode: Node;

        /**
         * The last node in the ITemplateControl's body. This property will be a Comment node when the
         * control implements replaceWith = null, otherwise it will be null. This property allows a ITemplateControl
         * to add nodes to its body in the event that it replaces its element.
         * 
         * @example this.endNode.parentNode.insertBefore(node, this.endNode);
         */
        endNode: Node;

        /**
         * Allows a ITemplateControl to either swap its element with another element (e.g. plat-select), or
         * replace its element altogether. If null or empty string, the element will be removed from the DOM, and the 
         * childNodes of the element will be in its place. In addition, when the element is placed an endNode Comment
         * is created, and the childNodes are added to the elementNodes property on the control. The replaceWith 
         * property can be any property that works with document.createElement(). If the control's element had 
         * attributes (as well as attribute IControls), those attributes will be carried to the swapped element.
         */
        replaceWith = 'div';

        /**
         * Set to the root ancestor control from which this control inherits its context. This value
         * can be equal to this control.
         */
        root: ITemplateControl;

        /**
         * TemplateControls are the base control for any UIControl. They provide properties for the control to use
         * to manage its body HTML.
         */
        constructor() {
            super();
        }

        /**
         * This event is fired when a TemplateControl's context property is changed by an ancestor control.
         */
        contextChanged(): void { }

        /**
         * A method called for ITemplateControls to set their template. During this method a control should
         * ready its template for compilation. Whatever is in the control's element (or elementNodes if replaceWith
         * is implemented) after this method's execution will be compiled and appear on the DOM.
         */
        setTemplate(): void { }

        /**
         * Finds the identifier string associated with the given context object. The string returned
         * is the path from a control's context.
         * 
         * @param context The object to locate on the control's context.
         * 
         * @example 
         *     // returns 'title'
         *     this.getIdentifier(this.context.title);
         */
        getIdentifier(context: any): string {
            var queue: Array<{ context: any; identifier: string; }> = [],
                dataContext = this.context,
                found = false,
                obj = {
                    context: dataContext,
                    identifier: ''
                },
                length: number,
                keys: Array<string>,
                key: string,
                newObj: any;

            if (dataContext === context) {
                found = true;
            } else {
                queue.push(obj);
            }

            while (queue.length > 0) {
                obj = queue.pop();

                if (!isObject(obj.context)) {
                    continue;
                }

                keys = Object.keys(obj.context);
                length = keys.length;

                for (var i = 0; i < length; ++i) {
                    key = keys[i];
                    newObj = obj.context[key];

                    if (newObj === context) {
                        return (obj.identifier !== '') ? (obj.identifier + '.' + key) : key;
                    }

                    queue.push({
                        context: newObj,
                        identifier: (obj.identifier !== '') ? (obj.identifier + '.' + key) : key
                    });
                }
            }
            if (!found) {
                return;
            }

            return obj.identifier;
        }

        /**
         * Finds the absolute identifier string associated with the given context object. The string returned
         * is the path from a control's root ancestor's context.
         * 
         * @param context The object to locate on the root control's context.
         */
        getAbsoluteIdentifier(context: any): string {
            if (context === this.context) {
                return this.absoluteContextPath;
            }

            var localIdentifier = this.getIdentifier(context);
            if (isNull(localIdentifier)) {
                return localIdentifier;
            }

            return this.absoluteContextPath + '.' + localIdentifier;
        }

        /**
         * Finds the associated resources and builds a context object containing
         * the values. Returns the object.
         * 
         * @param aliases An array of aliases to search for.
         * @param resources An optional resources object to extend, if no resources object is passed in a new one will be created.
         */
        getResources(aliases: Array<string>, resources?: any): IObject<any> {
            return TemplateControl.getResources(this, aliases, resources);
        }

        /**
         * Starts at a control and searches up its parent chain for a particular resource alias. 
         * If the resource is found, it will be returned along with the control instance on which
         * the resource was found.
         * 
         * @param alias The alias to search for.
         */
        findResource(alias: string): { resource: IResource; control: ITemplateControl; } {
            return TemplateControl.findResource(this, alias);
        }

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
        evaluateExpression(expression: any, context?: any) {
            return TemplateControl.evaluateExpression(expression, this, context);
        }

        /**
         * Allows a control to observe any property on its context and receive updates when
         * the property is changed.
         * 
         * @param context The immediate parent object containing the property.
         * @param property The property identifier to watch for changes.
         * @param listener The method called when the property is changed. This method will have its 'this'
         * context set to the control instance.
         */
        observe<T>(context: any, property: string, listener: (value: T, oldValue: any) => void): IRemoveListener;
        /**
         * Allows a control to observe any property on its context and receive updates when
         * the property is changed.
         * 
         * @param context The immediate parent array containing the property.
         * @param property The index to watch for changes.
         * @param listener The method called when the property is changed. This method will have its 'this'
         * context set to the control instance.
         */
        observe<T>(context: any, property: number, listener: (value: T, oldValue: T) => void): IRemoveListener;
        observe(context: any, property: any, listener: (value: any, oldValue: any) => void): IRemoveListener {
            if (isNull(context) || !context.hasOwnProperty(property)) {
                return;
            }

            var control = !isFunction((<any>this).getAbsoluteIdentifier) ? this.parent : <ITemplateControl>this,
                absoluteIdentifier = control.getAbsoluteIdentifier(context);

            if (isNull(absoluteIdentifier)) {
                return;
            }

            var contextManager = Control.$ContextManagerStatic.getManager(Control.getRootControl(this));
            return contextManager.observe(absoluteIdentifier + '.' + property, {
                listener: listener.bind(this),
                uid: this.uid
            });
        }

        /**
         * Allows a control to observe an array and receive updates when certain array-changing methods are called.
         * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method does not watch
         * every item in the array.
         * 
         * @param context The immediate parent object containing the array as a property.
         * @param property The array property identifier to watch for changes.
         * @param listener The method called when an array-changing method is called. This method will have its 'this'
         * context set to the control instance.
         */
        observeArray<T>(context: any, property: string, listener: (ev: observable.IArrayMethodInfo<T>) => void): IRemoveListener;
        /**
         * Allows a control to observe an array and receive updates when certain array-changing methods are called.
         * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method does not watch
         * every item in the array.
         * 
         * @param context The immediate parent array containing the array as a property.
         * @param property The index on the parent array, specifying the array to watch for changes.
         * @param listener The method called when an array-changing method is called. This method will have its 'this'
         * context set to the control instance.
         */
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

            var control = !isFunction((<any>this).getAbsoluteIdentifier) ? this.parent : <ITemplateControl>this,
                absoluteIdentifier = control.getAbsoluteIdentifier(context),
                ContextManager = Control.$ContextManagerStatic;

            if (isNull(absoluteIdentifier)) {
                if (property === 'context') {
                    absoluteIdentifier = control.absoluteContextPath;
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
                        contextManager.observeArray(this.uid, callback, absoluteIdentifier, newValue, oldValue);
                    },
                    uid: uid
                });
            contextManager.observeArray(this.uid, callback, absoluteIdentifier, array, null);

            // need to call callback if 
            return () => {
                ContextManager.removeArrayListeners(absoluteIdentifier, uid);
                removeCallback();
            };
        }
    }

    /**
     * The Type for referencing the '$TemplateControlStatic' injectable as a dependency.
     */
    export function TemplateControlStatic(
            $ResourcesStatic: IResourcesStatic,
            $BindableTemplatesStatic: IBindableTemplatesStatic,
            $ManagerCacheStatic: storage.ICache<processing.IElementManager>,
            $ExceptionStatic: IExceptionStatic,
            $templateCache: storage.ITemplateCache,
            $parser: expressions.IParser,
            $http: async.IHttp,
            $PromiseStatic: async.IPromiseStatic) {
        TemplateControl.$ResourcesStatic = $ResourcesStatic;
        TemplateControl.$BindableTemplatesStatic = $BindableTemplatesStatic;
        TemplateControl.$ManagerCacheStatic = $ManagerCacheStatic;
        TemplateControl.$ExceptionStatic = $ExceptionStatic;
        TemplateControl.$templateCache = $templateCache;
        TemplateControl.$parser = $parser;
        TemplateControl.$http = $http;
        TemplateControl.$Promise = $PromiseStatic;
        return TemplateControl;
    }

    register.injectable('$TemplateControlStatic', TemplateControlStatic, [
        '$ResourcesStatic',
        '$BindableTemplatesStatic',
        '$ManagerCacheStatic',
        '$ExceptionStatic',
        '$templateCache',
        '$parser',
        '$http',
        '$PromiseStatic'
    ], register.injectableType.STATIC);

    /**
     * The external interface for the '$TemplateControlStatic' injectable.
     */
    export interface ITemplateControlStatic {
        /**
         * Evaluates an expression string with a given control and optional context.
         *
         * @param expression The expression string (e.g. 'foo + foo').
         * @param control The control used for evaluation context.
         * @param aliases An optional alias object containing resource alias values
         */
        evaluateExpression(expression: string, control?: ITemplateControl, aliases?: any): any;
        /**
         * Evaluates a parsed expression with a given control and optional context.
         *
         * @param expression An IParsedExpression created using the '$parser' injectable.
         * @param control The control used for evaluation context.
         * @param aliases An optional alias object containing resource alias values
         */
        evaluateExpression(expression: expressions.IParsedExpression, control?: ITemplateControl, aliases?: any): any;

        /**
         * Given a control and Array of aliases, finds the associated resources and builds a context object containing
         * the values. Returns the object.
         *
         * @param control The control used as the starting point for finding resources.
         * @param aliases An array of aliases to search for.
         * @param resources An optional resources object to extend, if no resources object is passed in a new one will be created.
         */
        getResources(control: ITemplateControl, aliases: Array<string>, resources?: any): IObject<any>;

        /**
         * Starts at a control and searches up its parent chain for a particular resource alias.
         * If the resource is found, it will be returned along with the control instance on which
         * the resource was found.
         *
         * @param control The control on which to start searching for the resource alias.
         * @param alias The alias to search for.
         */
        findResource(control: ITemplateControl, alias: string): { resource: IResource; control: ITemplateControl; };

        /**
         * Recursively disposes a control and its children.
         * @param control A control to dispose.
         */
        dispose(control: ITemplateControl): void;

        /**
         * Loads the control tree depth first (visit children, then visit self).
         *
         * @param control The control serving as the root control to load.
         */
        loadControl(control: ITemplateControl): void;

        /**
         * Notifies a control that its context has been changed by
         * calling the control.contextChanged method if it exists.
         *
         * @param control The control whose context changed.
         * @param newValue The new value of the control's context.
         * @param oldValue The old value of the control's context.
         */
        contextChanged(control: IControl, newValue: any, oldValue: any): void;

        /**
         * Sets the 'context' resource value on a template control. If the control specifies
         * hasOwnContext, the 'rootContext' resource value will be set.
         *
         * @param control The control whose context resources will be set.
         */
        setContextResources(control: ITemplateControl): void;

        /**
         * Completely removes a control's element from its parentNode. If the
         * control implements replaceWith=null, All of its nodes between its
         * startNode and endNode (inclusive) will be removed.
         *
         * @param control The control whose element should be removed.
         */
        removeElement(control: ITemplateControl): void;

        /**
         * Sets the absoluteContextPath read-only property on a control.
         * 
         * @param control The control on which to set the absoluteContextPath.
         * @param path The path to set on the control.
         */
        setAbsoluteContextPath(control: ITemplateControl, path: string): void;

        /**
         * Determines the template for a control by searching for a templateUrl, 
         * using the provided templateUrl, or serializing the control's templateString.
         */
        determineTemplate(control: ITemplateControl, templateUrl?: string): async.IThenable<DocumentFragment>;

        /**
         * Detaches a TemplateControl. Disposes its children, but does not dispose the TemplateControl.
         *
         * @param control The control to be detached.
         */
        detach(control: ITemplateControl): void;

        /**
         * Returns a new instance of TemplateControl.
         *
         * @static
         */
        getInstance(): ITemplateControl;
    }

    /**
     * Describes a control which provides properties and methods for managing its body HTML.
     */
    export interface ITemplateControl extends IControl {
        /**
         * The context of an ITemplateControl, used for inheritance and data-binding.
         */
        context?: any;

        /**
         * Resources are used for providing aliases to use in markup expressions. They 
         * are particularly useful when trying to access properties outside of the 
         * current context, as well as reassigning context at any point in an app.
         * 
         * By default, every control has a resource for '@control' and '@context'.
         * IViewControl objects also have a resource for '@root' and '@rootContext', which is a reference
         * to their root control and root context.
         * 
         * Resources can be created in HTML, or through the exposed control.resources 
         * object. If specified in HTML, they must be the first element child of the 
         * control upon which the resources will be placed. IViewControls that use a 
         * templateUrl can have resources as their first element in the templateUrl.
         * 
         * @example
         * <custom-control>
         *     <plat-resources>
         *         <injectable alias="Cache">$CacheStatic</injectable>
         *         <observable alias="testObj">
         *              { 
         *                  foo: 'foo', 
         *                  bar: 'bar', 
         *                  baz: 2 
         *              }
         *         </observable>
         *     </plat-resources>
         * </custom-control>
         * 
         * In the above example, the resources can be accessed by using '@Cache' and '@testObj'.
         * The type of resource is denoted by the element name.
         * 
         * Only resources of type 'observable' will have data binding. The types of resources are:
         * function, injectable, observable, and object. Resources of type 'function' will have their
         * associated function context bound to the control that contains the resource.
         * 
         * When an alias is found in a markup expression, the framework will search up the control chain 
         * to find the alias on a control's resources. This first matching alias will be used.
         */
        resources?: IResources;

        /**
         * Flag indicating whether or not the ITemplateControl defines the context property.
         */
        hasOwnContext?: boolean;

        /**
         * Specifies the absolute path from where the context was created to this IControl's context.
         * Used by the ContextManager for maintaining context parity.
         * 
         * @example 'context.childContextProperty.grandChildContextProperty'
         */
        absoluteContextPath?: string;

        /**
         * A string representing the DOM template for this control. If this property is
         * defined on a ITemplateControl then DOM will be created and put in the 
         * control's element prior to calling the 'setTemplate' method.
         */
        templateString?: string;

        /**
         * A url containing a string representing the DOM template for this control. If this property is
         * defined on a ITemplateControl then DOM will be created and put in the 
         * control's element prior to calling the 'setTemplate' method. This property takes 
         * precedence over templateString. In the event that both are defined, templateString
         * will be ignored.
         */
        templateUrl?: string;

        /**
         * A DocumentFragment representing the innerHTML that existed when this control was instantiated.
         * This property will only contain the innerHTML when either a templateString or templateUrl is
         * defined. Its important to clone this property when injecting it somewhere, else its childNodes
         * will disappear.
         * 
         * @example this.innerTemplate.cloneNode(true); //Useful if this is not a one-time injection.
         */
        innerTemplate?: DocumentFragment;

        /**
         * A IBindableTemplates object used for binding a data context to a template. This is an
         * advanced function of a ITemplateControl.
         * 
         * @see IBindableTemplates
         */
        bindableTemplates?: IBindableTemplates;

        /**
         * An array of child controls. Any controls created by this control can be found in this array. The controls in
         * this array will have reference to this control in their parent property.
         */
        controls?: Array<IControl>;

        /**
         * A Node array for managing the ITemplateControl's childNodes in the event that this control
         * replaces its element. This property will only be useful for a ITemplateControl that implements
         * replaceWith.
         */
        elementNodes?: Array<Node>;

        /**
         * The first node in the ITemplateControl's body. This property will be a Comment node when the
         * control implements replaceWith = null, otherwise it will be null. This property allows a ITemplateControl
         * to add nodes to its body in the event that it replaces its element.
         * 
         * @example this.startNode.parentNode.insertBefore(node, this.startNode.nextSibling);
         */
        startNode?: Node;

        /**
         * The last node in the ITemplateControl's body. This property will be a Comment node when the
         * control implements replaceWith, otherwise it will be null. This property allows a ITemplateControl
         * to add nodes to its body in the event that it replaces its element.
         * 
         * @example this.endNode.parentNode.insertBefore(node, this.endNode);
         */
        endNode?: Node;

        /**
         * Allows a ITemplateControl to either swap its element with another element (e.g. plat-select), or
         * replace its element altogether. If null or empty string, the element will be removed from the DOM, and the 
         * childNodes of the element will be in its place. In addition, when the element is placed an endNode Comment
         * is created, and the childNodes are added to the elementNodes property on the control. The replaceWith 
         * property can be any property that works with document.createElement(). If the control's element had 
         * attributes (as well as attribute IControls), those attributes will be carried to the swapped element.
         */
        replaceWith?: string;

        /**
         * Set to the root ancestor control from which this control inherits its context. This value
         * can be equal to this control.
         */
        root: ITemplateControl;

        /**
         * A method called for ITemplateControls to set their template. During this method a control should
         * ready its template for compilation. Whatever is in the control's element (or elementNodes if replaceWith
         * is implemented) after this method's execution will be compiled and appear on the DOM.
         */
        setTemplate? (): void;

        /**
         * This event is fired when an ITemplateControl's context property is changed by an ancestor control.
         */
        contextChanged? (newValue: any, oldValue: any): void;

        /**
         * Finds the identifier string associated with the given context object. The string returned
         * is the path from a control's context.
         * 
         * @param context The object to locate on the control's context.
         * 
         * @example 
         *     // returns 'title'
         *     this.getIdentifier(this.context.title);
         */
        getIdentifier? (context: any): string;

        /**
         * Finds the absolute identifier string associated with the given context object. The string returned
         * is the path from a control's root ancestor's context.
         * 
         * @param context The object to locate on the root control's context.
         */
        getAbsoluteIdentifier? (context: any): string;
        
        /**
         * Finds the associated resources and builds a context object containing
         * the values. Returns the object.
         * 
         * @param aliases An array of aliases to search for.
         * @param resources An optional resources object to extend, if no resources object is passed in a new one will be created.
         */
        getResources(aliases: Array<string>, resources?: any): IObject<any>;

        /**
         * Starts at a control and searches up its parent chain for a particular resource alias. 
         * If the resource is found, it will be returned along with the control instance on which
         * the resource was found.
         * 
         * @param alias The alias to search for.
         */
        findResource(alias: string): { resource: IResource; control: ITemplateControl; };

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
    }
}
