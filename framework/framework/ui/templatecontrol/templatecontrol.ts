module plat.ui {
    /**
     * @name TemplateControl
     * @memberof plat.ui
     * @kind class
     * 
     * @extends {plat.Control}
     * @implements {plat.ui.ITemplateControl}
     * 
     * @description
     * The base control for any control that affects the UI. They provide properties for the control to use
     * to manage its body HTML.
     */
    export class TemplateControl extends Control implements ITemplateControl {
        /**
         * @name $ResourcesFactory
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.ui.IResourcesFactory}
         * 
         * @description
         * Reference to the {@link plat.ui.IResourcesFactory|IResourcesFactory} injectable.
         */
        static $ResourcesFactory: IResourcesFactory;
        /**
         * @name $BindableTemplatesFactory
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.ui.IBindableTemplatesFactory}
         * 
         * @description
         * Reference to the {@link plat.ui.IBindableTemplatesFactory|IBindableTemplatesFactory} injectable.
         */
        static $BindableTemplatesFactory: IBindableTemplatesFactory;
        /**
         * @name $ManagerCache
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.storage.ICache<processing.IElementManager>}
         * 
         * @description
         * Reference to a cache injectable that stores {@link plat.processing.IElementManager|IElementManagers}.
         */
        static $ManagerCache: storage.ICache<processing.IElementManager>;
        /**
         * @name $TemplateCache
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.storage.ITemplateCache}
         * 
         * @description
         * Reference to a cache injectable that stores and retrieves HTML templates.
         */
        static $TemplateCache: storage.ITemplateCache;
        /**
         * @name $Parser
         * @memberof plat.ui.TemplateControl
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
         * @name $Http
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.async.IHttp}
         * 
         * @description
         * Reference to the {@link plat.async.IHttp|IHttp} injectable.
         */
        static $Http: async.IHttp;
        /**
         * @name $Promise
         * @memberof plat.ui.TemplateControl
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
         * @name evaluateExpression
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         * @static
         * @variation 0
         * 
         * @description
         * Evaluates an expression string with a given control and optional control's context and aliases.
         * 
         * @param {string} expression The expression string (e.g. 'foo + foo').
         * @param {plat.ui.ITemplateControl} control? The control used for evaluation context.
         * @param {any} aliases? An optional alias object containing resource alias values
         * 
         * @returns {any} The evaluated object.
         */
        static evaluateExpression(expression: string, control?: ITemplateControl, aliases?: any): any;
        /**
         * @name evaluateExpression
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         * @static
         * @variation 1
         * 
         * @description
         * Evaluates an expression string with a given control and optional control's context and aliases.
         * 
         * @param {plat.expressions.IParsedExpression} expression A parsed expression object created using the 
         * plat.expressions.IParser injectable.
         * @param {plat.ui.ITemplateControl} control? The control used for evaluation context.
         * @param {any} aliases? An optional alias object containing resource alias values
         * 
         * @returns {any} The evaluated object.
         */
        static evaluateExpression(expression: expressions.IParsedExpression, control?: ITemplateControl, aliases?: any): any;
        static evaluateExpression(expression: any, control?: ITemplateControl, aliases?: any): any {
            if (isNull(expression)) {
                return;
            } else if (!(isString(expression) || isFunction(expression.evaluate))) {
                return;
            }

            expression = isString(expression) ? TemplateControl.$Parser.parse(expression) : expression;

            if (isNull(control)) {
                return expression.evaluate(null, aliases);
            }

            if (expression.aliases.length > 0) {
                aliases = TemplateControl.getResources(control, expression.aliases, aliases);
            }

            return expression.evaluate(control.context, aliases);
        }

        /**
         * @name getResources
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Given a control and Array of aliases, finds the associated resources and builds a context object containing
         * the values. Returns the object.
         * 
         * @param {plat.ui.ITemplateControl} control The control used as the starting point for finding resources.
         * @param {Array<string>} aliases An array of aliases to search for.
         * @param {any} resources? An optional resources object to extend, if no resources object is passed in a new one will be created.
         * 
         * @returns {IObject<any>} An object representing a set of resources.
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
                    var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                    $exception.warn('Attempting to use a resource that is not defined.', $exception.CONTEXT);
                    continue;
                }

                cache[alias] = resourceObj;
                resources['@' + alias] = isNull(resourceObj.resource) ? resourceObj.resource : resourceObj.resource.value;
            }

            return resources;
        }

        /**
         * @name findResource
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Starts at a control and searches up its parent chain for a particular resource alias. 
         * If the resource is found, it will be returned along with the control instance on which
         * the resource was found.
         * 
         * @param {plat.ui.ITemplateControl} control The control on which to start searching for the resource alias.
         * @param {string} alias The alias to search for.
         * 
         * @returns {{ resource: plat.ui.IResource; control: plat.ui.ITemplateControl; }} An object consisting of the 
         * found resource along with its corresponding control.
         */
        static findResource(control: ITemplateControl, alias: string): { resource: IResource; control: ITemplateControl; } {
            var resource: IResource;

            if (isNull(control) || isNull(control.resources) || !isString(alias) || isEmpty(alias)) {
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
         * @name dispose
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Recursively disposes a control and its children.
         * 
         * @param {plat.ui.ITemplateControl} control A control to dispose.
         * 
         * @returns {void}
         */
        static dispose(control: ITemplateControl): void {
            if (isNull(control)) {
                return;
            }

            var uid = control.uid,
                childControls = control.controls,
                controls = (childControls && childControls.slice(0)),
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

            TemplateControl.$ResourcesFactory.dispose(control);
            TemplateControl.$BindableTemplatesFactory.dispose(control);

            deleteProperty(TemplateControl.__resourceCache, control.uid);

            ContextManager.dispose(control);
            events.EventManager.dispose(control.uid);

            TemplateControl.$ManagerCache.remove(uid);
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
         * @name loadControl
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Loads the control tree depth first (visit children, then visit self).
         * 
         * @param {plat.ui.ITemplateControl} control The control serving as the root control to load.
         * 
         * @returns {void}
         */
        static loadControl(control: ITemplateControl): void {
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
         * @name contextChanged
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         * @static
         * @variation 0
         * 
         * @description
         * Notifies a control that its context has been changed by 
         * calling the "control.contextChanged" method if it exists.
         * 
         * @param {plat.IControl} control The control whose context changed.
         * @param {any} newValue The new value of the control's context.
         * @param {any} oldValue The old value of the control's context.
         * 
         * @returns {void}
         */
        static contextChanged(control: IControl, newValue: any, oldValue: any): void;
        /**
         * @name contextChanged
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         * @static
         * @variation 1
         * 
         * @description
         * Notifies a control that its context has been changed by 
         * calling the "control.contextChanged" method if it exists.
         * 
         * @param {plat.ui.ITemplateControl} control The control whose context changed.
         * @param {any} newValue The new value of the control's context.
         * @param {any} oldValue The old value of the control's context.
         * 
         * @returns {void}
         */
        static contextChanged(control: ITemplateControl, newValue: any, oldValue: any): void {
            control.context = newValue;

            TemplateControl.setContextResources(control);

            if (isFunction(control.contextChanged)) {
                control.contextChanged(newValue, oldValue);
            }
        }

        /**
         * @name setContextResources
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Sets the 'context' resource value on a {@link plat.ui.ITemplateControl|ITemplateControl}. If the control specifies 
         * hasOwnContext as true, the 'rootContext' resource value will be set.
         * 
         * @param {plat.ui.ITemplateControl} control The control whose context resources will be set.
         * 
         * @returns {void}
         */
        static setContextResources(control: ITemplateControl): void {
            var value = control.context;

            if (isNull(control.resources)) {
                control.resources = TemplateControl.$ResourcesFactory.getInstance();
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
         * @name removeElement
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Completely removes a control's element from its parentNode. If the 
         * control implements replaceWith=null, All of its nodes between its 
         * startNode and endNode (inclusive) will be removed.
         * 
         * @param {plat.ui.ITemplateControl} control The control whose element should be removed.
         * 
         * @returns {void}
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
         * @name setAbsoluteContextPath
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Sets the absoluteContextPath read-only property on a control.
         * 
         * @param {plat.ui.ITemplateControl} control The control on which to set the absoluteContextPath.
         * @param {string} path The path to set on the control.
         * 
         * @returns {void}
         */
        static setAbsoluteContextPath(control: ITemplateControl, path: string): void {
            Control.$ContextManagerStatic.defineGetter(control, 'absoluteContextPath', path, false, true);
        }

        /**
         * @name determineTemplate
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Determines the template for a control by searching for a templateUrl, 
         * using the provided templateUrl, or serializing the control's templateString.
         * 
         * @param {plat.ui.ITemplateControl} control The control whose template is being determined.
         * @param {string} templateUrl? The potential template URL to use to grab the template.
         * 
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves to the proper template.
         */
        static determineTemplate(control: ITemplateControl, templateUrl?: string): async.IThenable<DocumentFragment> {
            var template: any,
                templateCache = TemplateControl.$TemplateCache,
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

            var $exception: IExceptionStatic;
            return Promise.cast<DocumentFragment>(template).catch((error) => {
                if (isNull(error)) {
                    return TemplateControl.$Http.ajax<string>({ url: templateUrl });
                }
            }).then<DocumentFragment>((success) => {
                if (isDocumentFragment(success)) {
                    return Promise.resolve(<DocumentFragment>(<any>success));
                } else if (!isObject(success) || !isString(success.response)) {
                    $exception = acquire(__ExceptionStatic);
                    $exception.warn('No template found at ' + templateUrl, $exception.AJAX);
                    return Promise.resolve(dom.serializeHtml());
                }

                var templateString = success.response;

                if (isEmpty(templateString.trim())) {
                    return Promise.resolve(dom.serializeHtml());
                }

                template = dom.serializeHtml(templateString);

                return templateCache.put(templateUrl, template);
            }).catch((error) => {
                postpone(() => {
                    $exception = acquire(__ExceptionStatic);
                    $exception.fatal('Failure to get template from ' + templateUrl + '.',
                        $exception.TEMPLATE);
                });
                return error;
            });
        }

        /**
         * @name detach
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Detaches a {@link plat.ui.TemplateControl|TemplateControl}. Disposes its children, 
         * but does not dispose the {@link plat.ui.TemplateControl|TemplateControl}.
         * 
         * @param {plat.ui.ITemplateControl} control The control to be detached.
         * 
         * @returns {void}
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

            TemplateControl.$ResourcesFactory.dispose(control, true);

            deleteProperty(TemplateControl.__resourceCache, control.uid);

            Control.$ContextManagerStatic.dispose(control, true);
            events.EventManager.dispose(control.uid);

            TemplateControl.$ManagerCache.remove(control.uid);
            Control.removeParent(control);

            control.controls = [];
            control.attributes = null;
        }

        /**
         * @name getInstance
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Returns a new instance of {@link plat.ui.TemplateControl|TemplateControl}.
         * 
         * @returns {plat.ui.ITemplateControl} The new {@link plat.ui.TemplateControl|TemplateControl} instance.
         */
        static getInstance(): ITemplateControl {
            return new TemplateControl();
        }

        /**
         * @name __resourceCache
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access private
         * @static
         * 
         * @type {any}
         * 
         * @description
         * An object for quickly retrieving previously accessed resources.
         */
        private static __resourceCache: any = {};

        /**
         * @name priority
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * By default {@link plat.ui.TemplateControl|TemplateControls} have a priority of 100.
         */
        priority = 100;

        /**
         * @name context
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * The context of an {@link plat.ui.ITemplateControl|ITemplateControl}, used for inheritance and data-binding.
         */
        context: any = null;

        /**
         * @name name
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {string}
         * 
         * @description
         * The name of a {@link plat.ui.ITemplateControl|ITemplateControl} if a {@link plat.controls.Name|Name} 
         * control is involved.
         */
        name: string;

        /**
         * @name absoluteContextPath
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Specifies the absolute path from where the context was created to this IControl's context.
         * Used by the {@link plat.observable.ContextManager|ContextManager} for maintaining context parity 
         * (e.g. 'context.childContextProperty.grandChildContextProperty').
         */
        absoluteContextPath: string = null;

        /**
         * @name resources
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         * 
         * @type {plat.ui.IResources}
         * 
         * @description
         * Resources are used for providing aliases to use in markup expressions. They 
         * are particularly useful when trying to access properties outside of the 
         * current context, as well as reassigning context at any point in an app.
         * 
         * @remarks
         * By default, every control has a resource for '@control' and '@context'.
         * {@link plat.ui.IViewControl|IViewControl} objects also have a resource for '@root' and '@rootContext', 
         * which is a reference to their root control and root context.
         * 
         * Resources can be created in HTML, or through the exposed control.resources 
         * object. If specified in HTML, they must be the first element child of the 
         * control upon which the resources will be placed. IViewControls that use a 
         * templateUrl can have resources as their first element in the templateUrl.
         * 
         * In the provided example, the resources can be accessed by using '@Cache' and '@testObj'.
         * The type of resource is denoted by the element name.
         * 
         * Only resources of type 'observable' will have data binding. The types of resources are:
         * function, injectable, observable, and object. Resources of type 'function' will have their
         * associated function context bound to the control that contains the resource.
         * 
         * When an alias is found in a markup expression, the framework will search up the control chain 
         * to find the alias on a control's resources. This first matching alias will be used.
         * 
         * @example
         * <custom-control>
         *     <plat-resources>
         *         <injectable alias="Cache">$CacheFactory</injectable>
         *         <observable alias="testObj">
         *              { 
         *                  foo: 'foo', 
         *                  bar: 'bar', 
         *                  baz: 2 
         *              }
         *         </observable>
         *     </plat-resources>
         * </custom-control>
         */
        resources: IResources;

        /**
         * @name hasOwnContext
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Flag indicating whether or not the {@link plat.ui.ITemplateControl|ITemplateControl} defines the context property.
         */
        hasOwnContext: boolean = false;

        /**
         * @name templateString
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * A string representing the DOM template for this control. If this property is
         * defined on a {@link plat.ui.ITemplateControl|ITemplateControl} then DOM will be created and put in the 
         * control's element prior to calling the 'setTemplate' method.
         */
        templateString: string;

        /**
         * @name templateUrl
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * A url containing a string representing the DOM template for this control. If this property is
         * defined on a {@link plat.ui.ITemplateControl|ITemplateControl} then DOM will be created and put in the 
         * control's element prior to calling the 'setTemplate' method. This property takes 
         * precedence over templateString. In the event that both are defined, templateString
         * will be ignored.
         */
        templateUrl: string;

        /**
         * @name innerTemplate
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         * 
         * @type {DocumentFragment}
         * 
         * @description
         * A DocumentFragment representing the innerHTML that existed when this control was instantiated.
         * This property will only contain the innerHTML when either a templateString or templateUrl is
         * defined. Its important to clone this property when injecting it somewhere, else its childNodes
         * will disappear.
         * 
         * @example this.innerTemplate.cloneNode(true); //Useful if this is not a one-time injection.
         */
        innerTemplate: DocumentFragment;

        /**
         * @name bindableTemplates
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         * 
         * @type {plat.ui.IBindableTemplates}
         * 
         * @description
         * An {@link plat.ui.IBindableTemplates|IBindableTemplates} object used for binding a data context to a template. 
         * This is an advanced function of a {@link plat.ui.ITemplateControl|ITemplateControl}.
         */
        bindableTemplates: IBindableTemplates;

        /**
         * @name controls
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         * 
         * @type {Array<plat.IControl>}
         * 
         * @description
         * An array of child controls. Any controls created by this control can be found in this array. The controls in
         * this array will have reference to this control in their parent property.
         */
        controls: Array<IControl>;

        /**
         * @name elementNodes
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         * 
         * @type {Array<Node>}
         * 
         * @description
         * A Node array for managing the {@link plat.ui.ITemplateControl|ITemplateControl's} childNodes in the event that this control 
         * replaces its element. This property will only exist/be of use for a {@link plat.ui.ITemplateControl|ITemplateControl} that 
         * implements the replaceWith property.
         */
        elementNodes: Array<Node>;

        /**
         * @name startNode
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         * 
         * @type {Node}
         * 
         * @description
         * The first node in the {@link plat.ui.ITemplateControl|ITemplateControl's} body. This property will be a Comment node when the 
         * control implements replaceWith = null, otherwise it will be null. This property allows an 
         * {@link plat.ui.ITemplateControl|ITemplateControl} to add nodes to its body in the event that it replaces its element.
         * 
         * @example this.startNode.parentNode.insertBefore(node, this.startNode.nextSibling);
         */
        startNode: Node;

        /**
         * @name endNode
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         * 
         * @type {Node}
         * 
         * @description
         * The last node in the {@link plat.ui.ITemplateControl|ITemplateControl's} body. This property will be a Comment node when the 
         * control implements the replaceWith property, otherwise it will be null. This property allows a 
         * {@link plat.ui.ITemplateControl|ITemplateControl} to add nodes to its body in the event that it replaces its element.
         * 
         * @example this.endNode.parentNode.insertBefore(node, this.endNode);
         */
        endNode: Node;

        /**
         * @name replaceWith
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Allows a {@link plat.ui.ITemplateControl|ITemplateControl} to either swap its element with another element (e.g. plat-select), 
         * or replace its element altogether. If null or empty string, the element will be removed from the DOM, and the 
         * childNodes of the element will be in its place. In addition, when the element is placed startNode and endNode Comments 
         * are created, and the childNodes are added to the elementNodes property on the control. The replaceWith 
         * property can be any property that works with document.createElement(). If the control's element had 
         * attributes (as well as attribute IControls), those attributes will be carried to the swapped element. The default 
         * replaceWith is 'any,' meaning it will default to a 'div' in the case that the control type is used as the 
         * element's nodename (e.g. <plat-foreach plat-context="..."></plat-foreach>), but will maintain whatever element type 
         * is used otherwise (e.g. <tr plat-control="plat-foreach" plat-context="..."></tr>).
         */
        replaceWith = 'any';

        /**
         * @name root
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         * 
         * @type {plat.ui.ITemplateControl}
         * 
         * @description
         * Set to the root ancestor control from which this control inherits its context. This value
         * can be equal to this control.
         */
        root: ITemplateControl;

        /**
         * @name contextChanged
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         * 
         * @description
         * This event is fired when an {@link plat.ui.ITemplateControl|ITemplateControl's} context property 
         * is changed by an ancestor control.
         * 
         * @param {any} newValue? The new value of the context.
         * @param {any} oldValue? The old value of the context.
         * 
         * @returns {void}
         */
        contextChanged(newValue?: any, oldValue?: any): void { }

        /**
         * @name setTemplate
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         * 
         * @description
         * A method called for {@link plat.ui.ITemplateControl|ITemplateControls} to set their template. 
         * During this method a control should ready its template for compilation. Whatever is in the control's 
         * element (or elementNodes if replaceWith is implemented) after this method's execution will be compiled 
         * and appear on the DOM.
         * 
         * @returns {void}
         */
        setTemplate(): void { }

        /**
         * @name getIdentifier
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         * 
         * @description
         * Finds the identifier string associated with the given context object. The string returned
         * is the path from a control's context.
         * 
         * @param {any} context The object/primitive to locate on the control's context.
         * 
         * @returns {string} The input context's identifier string.
         * 
         * @example 
         *     // returns 'title.font'
         *     this.getIdentifier(this.context.title.font);
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
         * @name getAbsoluteIdentifier
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         * 
         * @description
         * Finds the absolute identifier string associated with the given context object. The string returned
         * is the path from a control's root ancestor's context.
         * 
         * @param {any} context The object/primitive to locate on the root control's context.
         * 
         * @returns {string} The input context's identifier string as seen from the root context object.
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
         * @name getResources
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         * 
         * @description
         * Finds the associated resources and builds a context object containing
         * the values.
         * 
         * @param {Array<string>} aliases An array of aliases to search for.
         * @param {any} resources? An optional resources object to extend, if no resources object is passed in a new one will be created.
         * 
         * @returns {IObject<any>} The context object containing the values of the associated resources.
         */
        getResources(aliases: Array<string>, resources?: any): IObject<any> {
            return TemplateControl.getResources(this, aliases, resources);
        }

        /**
         * @name findResource
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         * 
         * @description
         * Starts at a control and searches up its parent chain for a particular resource alias. 
         * If the resource is found, it will be returned along with the control instance on which
         * the resource was found.
         * 
         * @param {string} alias The alias to search for.
         * 
         * @returns {{ resource: plat.ui.IResource; control: plat.ui.ITemplateControl; }} An object consisting of the 
         * found resource along with its corresponding control.
         */
        findResource(alias: string): { resource: IResource; control: ITemplateControl; } {
            return TemplateControl.findResource(this, alias);
        }

        /**
         * @name evaluateExpression
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Evaluates an expression string, using the input context or control.context.
         * 
         * @param {string} expression The expression string to evaluate.
         * @param {any} context? An optional context with which to parse. If 
         * no context is specified, the control.context will be used.
         * 
         * @returns {any} The evaluated object/primitive.
         */
        evaluateExpression(expression: string, context?: any): any;
        /**
         * @name evaluateExpression
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Evaluates an expression string, using the input context or control.context.
         * 
         * @param {plat.expressions.IParsedExpression} expression The previously parsed expression to evaluate.
         * @param {any} context? An optional context with which to parse. If 
         * no context is specified, the control.context will be used.
         * 
         * @returns {any} The evaluated object/primitive.
         */
        evaluateExpression(expression: expressions.IParsedExpression, context?: any): any;
        evaluateExpression(expression: any, context?: any): any {
            return TemplateControl.evaluateExpression(expression, this, context);
        }
    }

    /**
     * The Type for referencing the '$TemplateControlFactory' injectable as a dependency.
     */
    export function ITemplateControlFactory(
        $ResourcesFactory?: IResourcesFactory,
        $BindableTemplatesFactory?: IBindableTemplatesFactory,
        $ManagerCache?: storage.ICache<processing.IElementManager>,
        $TemplateCache?: storage.ITemplateCache,
        $Parser?: expressions.IParser,
        $Http?: async.IHttp,
        $Promise?: async.IPromise): ITemplateControlFactory {
            TemplateControl.$ResourcesFactory = $ResourcesFactory;
            TemplateControl.$BindableTemplatesFactory = $BindableTemplatesFactory;
            TemplateControl.$ManagerCache = $ManagerCache;
            TemplateControl.$TemplateCache = $TemplateCache;
            TemplateControl.$Parser = $Parser;
            TemplateControl.$Http = $Http;
            TemplateControl.$Promise = $Promise;
            return TemplateControl;
    }

    register.injectable(__TemplateControlFactory, ITemplateControlFactory, [
        __ResourcesFactory,
        __BindableTemplatesFactory,
        __ManagerCache,
        __TemplateCache,
        __Parser,
        __Http,
        __Promise
    ], __FACTORY);

    /**
     * @name ITemplateControlFactory
     * @memberof plat.ui
     * @kind interface
     * 
     * @description
     * Creates and manages {@link plat.ui.ITemplateControl|ITemplateControls}.
     */
    export interface ITemplateControlFactory {
        /**
         * @name evaluateExpression
         * @memberof plat.ui.ITemplateControlFactory
         * @kind function
         * @access public
         * @static
         * @variation 0
         * 
         * @description
         * Evaluates an expression string with a given control and optional control's context and aliases.
         * 
         * @param {string} expression The expression string (e.g. 'foo + foo').
         * @param {plat.ui.ITemplateControl} control? The control used for evaluation context.
         * @param {any} aliases? An optional alias object containing resource alias values
         * 
         * @returns {any} The evaluated object.
         */
        evaluateExpression(expression: string, control?: ITemplateControl, aliases?: any): any;
        /**
         * @name evaluateExpression
         * @memberof plat.ui.ITemplateControlFactory
         * @kind function
         * @access public
         * @static
         * @variation 1
         * 
         * @description
         * Evaluates an expression string with a given control and optional control's context and aliases.
         * 
         * @param {plat.expressions.IParsedExpression} expression A parsed expression object created using the 
         * plat.expressions.IParser injectable.
         * @param {plat.ui.ITemplateControl} control? The control used for evaluation context.
         * @param {any} aliases? An optional alias object containing resource alias values
         * 
         * @returns {any} The evaluated object.
         */
        evaluateExpression(expression: expressions.IParsedExpression, control?: ITemplateControl, aliases?: any): any;

        /**
         * @name getResources
         * @memberof plat.ui.ITemplateControlFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Given a control and Array of aliases, finds the associated resources and builds a context object containing
         * the values. Returns the object.
         * 
         * @param {plat.ui.ITemplateControl} control The control used as the starting point for finding resources.
         * @param {Array<string>} aliases An array of aliases to search for.
         * @param {any} resources? An optional resources object to extend, if no resources object is passed in a new one will be created.
         * 
         * @returns {IObject<any>} An object representing a set of resources.
         */
        getResources(control: ITemplateControl, aliases: Array<string>, resources?: any): IObject<any>;

        /**
         * @name findResource
         * @memberof plat.ui.ITemplateControlFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Starts at a control and searches up its parent chain for a particular resource alias. 
         * If the resource is found, it will be returned along with the control instance on which
         * the resource was found.
         * 
         * @param {plat.ui.ITemplateControl} control The control on which to start searching for the resource alias.
         * @param {string} alias The alias to search for.
         * 
         * @returns {{ resource: plat.ui.IResource; control: plat.ui.ITemplateControl; }} An object consisting of the 
         * found resource along with its corresponding control.
         */
        findResource(control: ITemplateControl, alias: string): { resource: IResource; control: ITemplateControl; };

        /**
         * @name dispose
         * @memberof plat.ui.ITemplateControlFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Recursively disposes a control and its children.
         * 
         * @param {plat.ui.ITemplateControl} control A control to dispose.
         * 
         * @returns {void}
         */
        dispose(control: ITemplateControl): void;

        /**
         * @name loadControl
         * @memberof plat.ui.ITemplateControlFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Loads the control tree depth first (visit children, then visit self).
         * 
         * @param {plat.ui.ITemplateControl} control The control serving as the root control to load.
         * 
         * @returns {void}
         */
        loadControl(control: ITemplateControl): void;

        /**
         * @name contextChanged
         * @memberof plat.ui.ITemplateControlFactory
         * @kind function
         * @access public
         * @static
         * @variation 0
         * 
         * @description
         * Notifies a control that its context has been changed by 
         * calling the "control.contextChanged" method if it exists.
         * 
         * @param {plat.IControl} control The control whose context changed.
         * @param {any} newValue The new value of the control's context.
         * @param {any} oldValue The old value of the control's context.
         * 
         * @returns {void}
         */
        contextChanged(control: IControl, newValue: any, oldValue: any): void;
        /**
         * @name contextChanged
         * @memberof plat.ui.ITemplateControlFactory
         * @kind function
         * @access public
         * @static
         * @variation 1
         * 
         * @description
         * Notifies a control that its context has been changed by 
         * calling the "control.contextChanged" method if it exists.
         * 
         * @param {plat.ui.ITemplateControl} control The control whose context changed.
         * @param {any} newValue The new value of the control's context.
         * @param {any} oldValue The old value of the control's context.
         * 
         * @returns {void}
         */
        contextChanged(control: ITemplateControl, newValue: any, oldValue: any): void;

        /**
         * @name setContextResources
         * @memberof plat.ui.ITemplateControlFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Sets the 'context' resource value on a {@link plat.ui.ITemplateControl|ITemplateControl}. If the control specifies 
         * hasOwnContext as true, the 'rootContext' resource value will be set.
         * 
         * @param {plat.ui.ITemplateControl} control The control whose context resources will be set.
         * 
         * @returns {void}
         */
        setContextResources(control: ITemplateControl): void;

        /**
         * @name removeElement
         * @memberof plat.ui.ITemplateControlFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Completely removes a control's element from its parentNode. If the 
         * control implements replaceWith=null, All of its nodes between its 
         * startNode and endNode (inclusive) will be removed.
         * 
         * @param {plat.ui.ITemplateControl} control The control whose element should be removed.
         * 
         * @returns {void}
         */
        removeElement(control: ITemplateControl): void;

        /**
         * @name setAbsoluteContextPath
         * @memberof plat.ui.ITemplateControlFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Sets the absoluteContextPath read-only property on a control.
         * 
         * @param {plat.ui.ITemplateControl} control The control on which to set the absoluteContextPath.
         * @param {string} path The path to set on the control.
         * 
         * @returns {void}
         */
        setAbsoluteContextPath(control: ITemplateControl, path: string): void;

        /**
         * @name determineTemplate
         * @memberof plat.ui.ITemplateControlFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Determines the template for a control by searching for a templateUrl, 
         * using the provided templateUrl, or serializing the control's templateString.
         * 
         * @param {plat.ui.ITemplateControl} control The control whose template is being determined.
         * @param {string} templateUrl? The potential template URL to use to grab the template.
         * 
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves to the proper template.
         */
        determineTemplate(control: ITemplateControl, templateUrl?: string): async.IThenable<DocumentFragment>;

        /**
         * @name detach
         * @memberof plat.ui.ITemplateControlFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Detaches a {@link plat.ui.TemplateControl|TemplateControl}. Disposes its children, 
         * but does not dispose the {@link plat.ui.TemplateControl|TemplateControl}.
         * 
         * @param {plat.ui.ITemplateControl} control The control to be detached.
         * 
         * @returns {void}
         */
        detach(control: ITemplateControl): void;

        /**
         * @name getInstance
         * @memberof plat.ui.ITemplateControlFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Returns a new instance of {@link plat.ui.TemplateControl|TemplateControl}.
         * 
         * @returns {plat.ui.ITemplateControl} The new {@link plat.ui.TemplateControl|TemplateControl} instance.
         */
        getInstance(): ITemplateControl;
    }

    /**
     * @name ITemplateControl
     * @memberof plat.ui
     * @kind interface
     * 
     * @extends {plat.IControl}
     * 
     * @description
     * Describes a control which provides properties and methods for managing its body HTML.
     */
    export interface ITemplateControl extends IControl {
        /**
         * @name context
         * @memberof plat.ui.ITemplateControl
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * The context of an {@link plat.ui.ITemplateControl|ITemplateControl}, used for inheritance and data-binding.
         */
        context?: any;

        /**
         * @name name
         * @memberof plat.ui.ITemplateControl
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {string}
         * 
         * @description
         * The name of a {@link plat.ui.ITemplateControl|ITemplateControl} if a {@link plat.controls.Name|Name} 
         * control is involved and placed on its element.
         */
        name?: string;

        /**
         * @name absoluteContextPath
         * @memberof plat.ui.ITemplateControl
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Specifies the absolute path from where the context was created to this IControl's context.
         * Used by the {@link plat.observable.ContextManager|ContextManager} for maintaining context parity 
         * (e.g. 'context.childContextProperty.grandChildContextProperty').
         */
        absoluteContextPath?: string;

        /**
         * @name resources
         * @memberof plat.ui.ITemplateControl
         * @kind property
         * @access public
         * 
         * @type {plat.ui.IResources}
         * 
         * @description
         * Resources are used for providing aliases to use in markup expressions. They 
         * are particularly useful when trying to access properties outside of the 
         * current context, as well as reassigning context at any point in an app.
         * 
         * @remarks
         * By default, every control has a resource for '@control' and '@context'.
         * {@link plat.ui.IViewControl|IViewControl} objects also have a resource for '@root' and '@rootContext', 
         * which is a reference to their root control and root context.
         * 
         * Resources can be created in HTML, or through the exposed control.resources 
         * object. If specified in HTML, they must be the first element child of the 
         * control upon which the resources will be placed. IViewControls that use a 
         * templateUrl can have resources as their first element in the templateUrl.
         * 
         * In the provided example, the resources can be accessed by using '@Cache' and '@testObj'.
         * The type of resource is denoted by the element name.
         * 
         * Only resources of type 'observable' will have data binding. The types of resources are:
         * function, injectable, observable, and object. Resources of type 'function' will have their
         * associated function context bound to the control that contains the resource.
         * 
         * When an alias is found in a markup expression, the framework will search up the control chain 
         * to find the alias on a control's resources. This first matching alias will be used.
         * 
         * @example
         * <custom-control>
         *     <plat-resources>
         *         <injectable alias="Cache">$CacheFactory</injectable>
         *         <observable alias="testObj">
         *              { 
         *                  foo: 'foo', 
         *                  bar: 'bar', 
         *                  baz: 2 
         *              }
         *         </observable>
         *     </plat-resources>
         * </custom-control>
         */
        resources?: IResources;

        /**
         * @name hasOwnContext
         * @memberof plat.ui.ITemplateControl
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Flag indicating whether or not the {@link plat.ui.ITemplateControl|ITemplateControl} defines the context property.
         */
        hasOwnContext?: boolean;

        /**
         * @name templateString
         * @memberof plat.ui.ITemplateControl
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * A string representing the DOM template for this control. If this property is
         * defined on a {@link plat.ui.ITemplateControl|ITemplateControl} then DOM will be created and put in the 
         * control's element prior to calling the 'setTemplate' method.
         */
        templateString?: string;

        /**
         * @name templateUrl
         * @memberof plat.ui.ITemplateControl
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * A url containing a string representing the DOM template for this control. If this property is
         * defined on a {@link plat.ui.ITemplateControl|ITemplateControl} then DOM will be created and put in the 
         * control's element prior to calling the 'setTemplate' method. This property takes 
         * precedence over templateString. In the event that both are defined, templateString
         * will be ignored.
         */
        templateUrl?: string;

        /**
         * @name innerTemplate
         * @memberof plat.ui.ITemplateControl
         * @kind property
         * @access public
         * 
         * @type {DocumentFragment}
         * 
         * @description
         * A DocumentFragment representing the innerHTML that existed when this control was instantiated.
         * This property will only contain the innerHTML when either a templateString or templateUrl is
         * defined. Its important to clone this property when injecting it somewhere, else its childNodes
         * will disappear.
         * 
         * @example this.innerTemplate.cloneNode(true); //Useful if this is not a one-time injection.
         */
        innerTemplate?: DocumentFragment;

        /**
         * @name bindableTemplates
         * @memberof plat.ui.ITemplateControl
         * @kind property
         * @access public
         * 
         * @type {plat.ui.IBindableTemplates}
         * 
         * @description
         * An {@link plat.ui.IBindableTemplates|IBindableTemplates} object used for binding a data context to a template. 
         * This is an advanced function of a {@link plat.ui.ITemplateControl|ITemplateControl}.
         */
        bindableTemplates?: IBindableTemplates;

        /**
         * @name controls
         * @memberof plat.ui.ITemplateControl
         * @kind property
         * @access public
         * 
         * @type {Array<plat.IControl>}
         * 
         * @description
         * An array of child controls. Any controls created by this control can be found in this array. The controls in
         * this array will have reference to this control in their parent property.
         */
        controls?: Array<IControl>;

        /**
         * @name elementNodes
         * @memberof plat.ui.ITemplateControl
         * @kind property
         * @access public
         * 
         * @type {Array<Node>}
         * 
         * @description
         * A Node array for managing the {@link plat.ui.ITemplateControl|ITemplateControl's} childNodes in the event that this control 
         * replaces its element. This property will only exist/be of use for a {@link plat.ui.ITemplateControl|ITemplateControl} that 
         * implements the replaceWith property.
         */
        elementNodes?: Array<Node>;

        /**
         * @name startNode
         * @memberof plat.ui.ITemplateControl
         * @kind property
         * @access public
         * 
         * @type {Node}
         * 
         * @description
         * The first node in the {@link plat.ui.ITemplateControl|ITemplateControl's} body. This property will be a Comment node when the 
         * control implements replaceWith = null, otherwise it will be null. This property allows an 
         * {@link plat.ui.ITemplateControl|ITemplateControl} to add nodes to its body in the event that it replaces its element.
         * 
         * @example this.startNode.parentNode.insertBefore(node, this.startNode.nextSibling);
         */
        startNode?: Node;

        /**
         * @name endNode
         * @memberof plat.ui.ITemplateControl
         * @kind property
         * @access public
         * 
         * @type {Node}
         * 
         * @description
         * The last node in the {@link plat.ui.ITemplateControl|ITemplateControl's} body. This property will be a Comment node when the 
         * control implements the replaceWith property, otherwise it will be null. This property allows a 
         * {@link plat.ui.ITemplateControl|ITemplateControl} to add nodes to its body in the event that it replaces its element.
         * 
         * @example this.endNode.parentNode.insertBefore(node, this.endNode);
         */
        endNode?: Node;

        /**
         * @name replaceWith
         * @memberof plat.ui.ITemplateControl
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Allows a {@link plat.ui.ITemplateControl|ITemplateControl} to either swap its element with another element (e.g. plat-select), 
         * or replace its element altogether. If null or empty string, the element will be removed from the DOM, and the 
         * childNodes of the element will be in its place. In addition, when the element is placed startNode and endNode Comments 
         * are created, and the childNodes are added to the elementNodes property on the control. The replaceWith 
         * property can be any property that works with document.createElement(). If the control's element had 
         * attributes (as well as attribute IControls), those attributes will be carried to the swapped element. The default 
         * replaceWith is 'any,' meaning it will default to a 'div' in the case that the control type is used as the 
         * element's nodename (e.g. <plat-foreach plat-context="..."></plat-foreach>), but will maintain whatever element type 
         * is used otherwise (e.g. <tr plat-control="plat-foreach" plat-context="..."></tr>).
         */
        replaceWith?: string;

        /**
         * @name root
         * @memberof plat.ui.ITemplateControl
         * @kind property
         * @access public
         * 
         * @type {plat.ui.ITemplateControl}
         * 
         * @description
         * Set to the root ancestor control from which this control inherits its context. This value
         * can be equal to this control.
         */
        root?: ITemplateControl;

        /**
         * @name setTemplate
         * @memberof plat.ui.ITemplateControl
         * @kind function
         * @access public
         * 
         * @description
         * A method called for {@link plat.ui.ITemplateControl|ITemplateControls} to set their template. 
         * During this method a control should ready its template for compilation. Whatever is in the control's 
         * element (or elementNodes if replaceWith is implemented) after this method's execution will be compiled 
         * and appear on the DOM.
         * 
         * @returns {void}
         */
        setTemplate? (): void;

        /**
         * @name contextChanged
         * @memberof plat.ui.ITemplateControl
         * @kind function
         * @access public
         * 
         * @description
         * This event is fired when an {@link plat.ui.ITemplateControl|ITemplateControl's} context property 
         * is changed by an ancestor control.
         * 
         * @param {any} newValue? The new value of the context.
         * @param {any} oldValue? The old value of the context.
         * 
         * @returns {void}
         */
        contextChanged? (newValue: any, oldValue: any): void;

        /**
         * @name getIdentifier
         * @memberof plat.ui.ITemplateControl
         * @kind function
         * @access public
         * 
         * @description
         * Finds the identifier string associated with the given context object. The string returned
         * is the path from a control's context.
         * 
         * @param {any} context The object/primitive to locate on the control's context.
         * 
         * @returns {string} The input context's identifier string.
         * 
         * @example 
         *     // returns 'title.font'
         *     this.getIdentifier(this.context.title.font);
         */
        getIdentifier? (context: any): string;

        /**
         * @name getAbsoluteIdentifier
         * @memberof plat.ui.ITemplateControl
         * @kind function
         * @access public
         * 
         * @description
         * Finds the absolute identifier string associated with the given context object. The string returned
         * is the path from a control's root ancestor's context.
         * 
         * @param {any} context The object/primitive to locate on the root control's context.
         * 
         * @returns {string} The input context's identifier string as seen from the root context object.
         */
        getAbsoluteIdentifier? (context: any): string;

        /**
         * @name getResources
         * @memberof plat.ui.ITemplateControl
         * @kind function
         * @access public
         * 
         * @description
         * Finds the associated resources and builds a context object containing
         * the values.
         * 
         * @param {Array<string>} aliases An array of aliases to search for.
         * @param {any} resources? An optional resources object to extend, if no resources object is passed in a new one will be created.
         * 
         * @returns {IObject<any>} The context object containing the values of the associated resources.
         */
        getResources? (aliases: Array<string>, resources?: any): IObject<any>;

        /**
         * @name findResource
         * @memberof plat.ui.ITemplateControl
         * @kind function
         * @access public
         * 
         * @description
         * Starts at a control and searches up its parent chain for a particular resource alias. 
         * If the resource is found, it will be returned along with the control instance on which
         * the resource was found.
         * 
         * @param {string} alias The alias to search for.
         * 
         * @returns {{ resource: plat.ui.IResource; control: plat.ui.ITemplateControl; }} An object consisting of the 
         * found resource along with its corresponding control.
         */
        findResource? (alias: string): { resource: IResource; control: ITemplateControl; };

        /**
         * @name evaluateExpression
         * @memberof plat.ui.ITemplateControl
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Evaluates an expression string, using the input context or control.context.
         * 
         * @param {string} expression The expression string to evaluate.
         * @param {any} context? An optional context with which to parse. If 
         * no context is specified, the control.context will be used.
         * 
         * @returns {any} The evaluated object/primitive.
         */
        evaluateExpression? (expression: string, context?: any): any;
        /**
         * @name evaluateExpression
         * @memberof plat.ui.ITemplateControl
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Evaluates an expression string, using the input context or control.context.
         * 
         * @param {plat.expressions.IParsedExpression} expression The previously parsed expression to evaluate.
         * @param {any} context? An optional context with which to parse. If 
         * no context is specified, the control.context will be used.
         * 
         * @returns {any} The evaluated object/primitive.
         */
        evaluateExpression? (expression: expressions.IParsedExpression, context?: any): any;
    }
}
