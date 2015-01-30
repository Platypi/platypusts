module plat.ui {
    /**
     * @name Resources
     * @memberof plat.ui
     * @kind class
     * 
     * @description
     * Resources are used for providing aliases to use in markup expressions. They 
     * are particularly useful when trying to access properties outside of the 
     * current context, as well as reassigning context at any point in an app.
     * 
     * @remarks
     * By default, every control has a resource for '@control' and '@context'.
     * {@link plat.ui.IViewControl|IViewControl} objects also have a resource for '@root' and '@rootContext', 
     * which is a reference to the control and its context.
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
     *         <injectable alias="Cache">_CacheFactory</injectable>
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
    export class Resources {
        /**
         * @name INJECTABLE
         * @memberof plat.ui.Resources
         * @kind property
         * @access public
         * @static
         * 
         * @type {string}
         * 
         * @description
         * The injectable resource type token.
         */
        static INJECTABLE: string = __INJECTABLE_RESOURCE;

        /**
         * @name OBJECT
         * @memberof plat.ui.Resources
         * @kind property
         * @access public
         * @static
         * 
         * @type {string}
         * 
         * @description
         * The object resource type token.
         */
        static OBJECT: string = __OBJECT_RESOURCE;

        /**
         * @name OBSERVABLE
         * @memberof plat.ui.Resources
         * @kind property
         * @access public
         * @static
         * 
         * @type {string}
         * 
         * @description
         * The observable resource type token.
         */
        static OBSERVABLE: string = __OBSERVABLE_RESOURCE;

        /**
         * @name LITERAL
         * @memberof plat.ui.Resources
         * @kind property
         * @access public
         * @static
         * 
         * @type {string}
         * 
         * @description
         * The literal resource type token.
         */
        static LITERAL: string = __LITERAL_RESOURCE;

        /**
         * @name FUNCTION
         * @memberof plat.ui.Resources
         * @kind property
         * @access public
         * @static
         * 
         * @type {string}
         * 
         * @description
         * The function resource type token.
         */
        static FUNCTION: string = __FUNCTION_RESOURCE;

        /**
         * @name _ContextManager
         * @memberof plat.ui.Resources
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
         * @name _regex
         * @memberof plat.ui.Resources
         * @kind property
         * @access protected
         * @static
         * 
         * @type {plat.expressions.Regex}
         * 
         * @description
         * Reference to the {@link plat.expressions.Regex|Regex} injectable.
         */
        protected static _regex: expressions.Regex;

        /**
         * @name _Exception
         * @memberof plat.ui.Resources
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
         * @name create
         * @memberof plat.ui.Resources
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Populates an {@link plat.ui.IResource|IResource} value if necessary, and adds it to the given 
         * control's resources.
         * 
         * @param {plat.ui.TemplateControl} control The control for which to create a resource.
         * @param {plat.ui.IResource} resource The object used to set the resource values.
         * 
         * @returns {plat.ui.IResource} The newly created {@link plat.ui.IResource|IResource}.
         */
        static create(control: TemplateControl, resource: IResource): IResource {
            if (isNull(resource)) {
                return resource;
            }

            var value: any;

            switch (resource.type.toLowerCase()) {
                case __INJECTABLE_RESOURCE:
                    var injector = injectableInjectors[resource.value];
                    if (!isNull(injector)) {
                        resource.value = injector.inject();
                    }
                    break;
                case __OBSERVABLE_RESOURCE:
                    Resources._observeResource(control, resource);
                    break;
                case __OBJECT_RESOURCE:
                    value = resource.value;
                    if (isString(value)) {
                        resource.value = control.evaluateExpression(value);
                    }
                    break;
                case __LITERAL_RESOURCE:
                    break;
                case __FUNCTION_RESOURCE:
                    value = resource.value;
                    if (isString(value)) {
                        value = (<any>control)[value];
                        if (isFunction(value)) {
                            resource.value = value.bind(control);
                        } else {
                            var _Exception: IExceptionStatic = Resources._Exception;
                            _Exception.warn('Attempted to create a "function" ' +
                                'type Resource with a function not found on your control.',
                                _Exception.BIND);
                            resource.value = noop;
                        }
                    }
                    break;
            }

            return resource;
        }

        /**
         * @name addControlResources
         * @memberof plat.ui.Resources
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Adds resource aliases for '@control' and '@context'. The resources are 
         * aliases for the control instance and the control.context.
         * 
         * @param {plat.ui.TemplateControl} control The control on which to add the resources.
         * 
         * @returns {void}
         */
        static addControlResources(control: TemplateControl): void {
            control.resources.add({
                context: {
                    value: control.context,
                    type: __OBSERVABLE_RESOURCE
                },
                control: {
                    value: control,
                    type: __FUNCTION_RESOURCE
                }
            });

            if (control.hasOwnContext) {
                Resources.__addRoot(control);
            }
        }

        /**
         * @name bindResources
         * @memberof plat.ui.Resources
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Binds the resources in a resource instance. This involves injecting 
         * the injectable resources, creating object/observable resources, and
         * binding functions to the associated control's instance.
         * 
         * @param {plat.ui.Resources} resourcesInstance The instance of the 
         * {@link plat.ui.Resources|Resources} object to bind.
         * 
         * @returns {void}
         */
        static bindResources(resourcesInstance: Resources): void;
        static bindResources(resourcesInstance: Resources): void {
            var resources = resourcesInstance.__resources;
            if (isNull(resources)) {
                return;
            }

            var control = resourcesInstance.__controlInstance,
                aliases = Object.keys(resources),
                controlResources = Resources.__controlResources,
                length = aliases.length,
                alias: string;

            for (var i = 0; i < length; ++i) {
                alias = aliases[i];

                if (controlResources[alias] === true) {
                    continue;
                }

                (<any>resourcesInstance)[alias] = resources[alias] = Resources.create(control,
                    (<any>resourcesInstance)[alias]);
            }

            resourcesInstance.__bound = true;
        }

        /**
         * @name dispose
         * @memberof plat.ui.Resources
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Disposes a resource instance, removing its reference 
         * from a control and breaking references to all resource 
         * objects.
         * 
         * @param {plat.ui.TemplateControl} control The control whose resources will be disposed.
         * @param {boolean} persist? Whether or not to persist a resource object post 
         * disposal or set it to null.
         * 
         * @returns {void}
         */
        static dispose(control: TemplateControl, persist?: boolean): void {
            var resources = <Resources>control.resources;

            if (isNull(resources)) {
                return;
            }

            var keys = Object.keys(resources.__resources),
                key: string,
                length = keys.length,
                define = Resources._ContextManager.defineProperty,
                resource: IResource;

            for (var i = 0; i < length; ++i) {
                key = keys[i];
                resource = (<any>resources)[key];

                if (!isNull(resource) && resource.type === __OBSERVABLE_RESOURCE) {
                    define(resources, key, persist ? _clone(resource, true) : null, true, true, true);
                }
            }

            Resources._removeListeners(resources.__controlInstance);
        }

        /**
         * @name parseElement
         * @memberof plat.ui.Resources
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Parses a resources Element (<plat-resources>) and creates 
         * an {@link plat.IObject<plat.ui.IResource>|IObject<IResource>} with its element children.
         * 
         * @param {Element} element The resources element to parse.
         * 
         * @returns {plat.IObject<plat.ui.IResource>} The resources created using the input element.
         */
        static parseElement(element: Element): IObject<IResource> {
            var children: Array<Element> = Array.prototype.slice.call((<HTMLElement>element).children),
                child: Element,
                _regex = Resources._regex,
                whiteSpaceRegex = _regex.whiteSpaceRegex,
                quotationRegex = _regex.quotationRegex,
                resources: IObject<IResource> = {},
                resource: IResource,
                types = Resources.__resourceTypes,
                attrs: NamedNodeMap,
                attr: Attr,
                nodeName: string,
                text: string;

            while (children.length > 0) {
                child = children.pop();
                nodeName = child.nodeName.toLowerCase();

                if (!types[nodeName]) {
                    continue;
                }

                attrs = child.attributes;
                resource = <IResource>{};

                attr = attrs.getNamedItem(__ALIAS);
                if (isNull(attr)) {
                    continue;
                }
                resource.alias = attr.value;

                text = child.textContent.replace(whiteSpaceRegex, '$1');
                if (isEmpty(text)) {
                    continue;
                }
                resource.value = (nodeName === __INJECTABLE_RESOURCE || nodeName === __LITERAL_RESOURCE) ?
                    text.replace(quotationRegex, '') : text;

                resource.type = nodeName;
                resources[resource.alias] = resource;
            }

            return resources;
        }

        /**
         * @name getInstance
         * @memberof plat.ui.Resources
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Returns a new instance with type {@link plat.ui.Resources|Resources}.
         * 
         * @returns {plat.ui.Resources} A new {@link plat.ui.Resources|Resources} instance.
         */
        static getInstance(): Resources {
            return acquire(__ResourcesInstance);
        }

        /**
         * @name _observeResource
         * @memberof plat.ui.Resources
         * @kind function
         * @access protected
         * @static
         * 
         * @description
         * Observes the resource if the type is 'observable'.
         * 
         * @param {plat.ui.TemplateControl} control The control in charge of the observable resource.
         * @param {plat.ui.IResource} resource The resource to observe.
         * 
         * @returns {void}
         */
        protected static _observeResource(control: TemplateControl, resource: IResource): void {
            var value = resource.value,
                uid = control.uid,
                removeListeners = Resources.__observableResourceRemoveListeners[uid];

            if (isNull(removeListeners)) {
                removeListeners = Resources.__observableResourceRemoveListeners[uid] = [];
            }

            if (isString(value)) {
                if (!isNull(resource.initialValue)) {
                    value = resource.initialValue;
                } else {
                    resource.initialValue = value;
                }
                var listener = control.observeExpression(value, (newValue) => {
                    resource.value = newValue;
                });
                resource.value = control.evaluateExpression(value);
                removeListeners.push(listener);
            }
        }

        /**
         * @name _removeListeners
         * @memberof plat.ui.Resources
         * @kind function
         * @access protected
         * @static
         * 
         * @description
         * Removes observable resource listeners for a specified control.
         * 
         * @param {plat.ui.TemplateControl} control The control whose listeners are being removed.
         * 
         * @returns {void}
         */
        protected static _removeListeners(control: TemplateControl): void {
            if (isNull(control)) {
                return;
            }

            var uid = control.uid,
                removeListeners = Resources.__observableResourceRemoveListeners[uid];

            if (isArray(removeListeners)) {
                var length = removeListeners.length;

                for (var i = 0; i < length; ++i) {
                    removeListeners[i]();
                }
            }

            deleteProperty(Resources.__observableResourceRemoveListeners, uid);
        }

        /**
         * @name __controlResources
         * @memberof plat.ui.Resources
         * @kind property
         * @access private
         * @static
         * 
         * @type {Array<string>}
         * 
         * @description
         * A list of resources to place on a control.
         */
        private static __controlResources: IObject<boolean>;

        /**
         * @name __resourceTypes
         * @memberof plat.ui.Resources
         * @kind property
         * @access private
         * @static
         * 
         * @type {Array<string>}
         * 
         * @description
         * A list of all resource types.
         */
        private static __resourceTypes: IObject<boolean>;

        /**
         * @name __observableResourceRemoveListeners
         * @memberof plat.ui.Resources
         * @kind property
         * @access private
         * @static
         * 
         * @type {plat.IObject<Array<plat.IRemoveListener>>}
         * 
         * @description
         * An object consisting of keyed arrays containing functions for removing observation listeners.
         */
        private static __observableResourceRemoveListeners: IObject<Array<IRemoveListener>> = {};

        /**
         * @name __addRoot
         * @memberof plat.ui.Resources
         * @kind function
         * @access private
         * @static
         * 
         * @description
         * Adds a '@root' alias and '@rootContext' to a control, specifying that it contains the root 
         * and root context. Root controls are generally the root {@link plat.ui.IViewControl|IViewControl}.
         * 
         * @param {plat.ui.TemplateControl} control The root control.
         * 
         * @returns {void}
         */
        private static __addRoot(control: TemplateControl): void {
            control.resources.add({
                root: {
                    value: control,
                    type: __OBJECT_RESOURCE,
                    alias: __ROOT_RESOURCE
                },
                rootContext: {
                    value: control.context,
                    type: __OBSERVABLE_RESOURCE,
                    alias: __ROOT_CONTEXT_RESOURCE
                }
            });
        }

        /**
         * @name __resources
         * @memberof plat.ui.Resources
         * @kind property
         * @access private
         * 
         * @type {plat.IObject<plat.ui.IResource>}
         * 
         * @description
         * An object representing all of the currently available resources.
         */
        private __resources: IObject<IResource> = {};
        /**
         * @name __bound
         * @memberof plat.ui.Resources
         * @kind property
         * @access private
         * 
         * @type {boolean}
         * 
         * @description
         * Whether this {@link plat.ui.Resources|Resources} instance has been bound yet.
         */
        private __bound: boolean = false;
        /**
         * @name __controlInstance
         * @memberof plat.ui.Resources
         * @kind property
         * @access private
         * 
         * @type {plat.ui.TemplateControl}
         * 
         * @description
         * The control that these resources are for.
         */
        private __controlInstance: TemplateControl;

        /**
         * @name initialize
         * @memberof plat.ui.Resources
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Initializes this {@link plat.ui.Resources|Resources} instance.
         * 
         * @param {plat.ui.TemplateControl} control The control containing this {@link plat.ui.Resources|Resources} instance.
         * @param {Element} element? An optional element used to create initial {@link plat.ui.IResource|IResource} objects.
         * 
         * @returns {void}
         */
        initialize(control: TemplateControl, element?: Element): void;
        /**
         * @name initialize
         * @memberof plat.ui.Resources
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Initializes this {@link plat.ui.Resources|Resources} instance.
         * 
         * @param {plat.ui.TemplateControl} control The control containing this {@link plat.ui.Resources|Resources} instance.
         * @param {IObject<IResource>} resources? An optional object used to populate initial
         * {@link plat.ui.IResource|IResource} objects.
         * 
         * @returns {void}
         */
        initialize(control: TemplateControl, resources?: IObject<IResource>): void;
        /**
         * @name initialize
         * @memberof plat.ui.Resources
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Initializes this {@link plat.ui.Resources|Resources} instance.
         * 
         * @param {plat.ui.TemplateControl} control The control containing this {@link plat.ui.Resources|Resources} instance.
         * @param {plat.ui.Resources} resources? An optional {@link plat.ui.Resources|Resources} object used to populate initial 
         * {@link plat.ui.IResource|IResource} objects.
         * 
         * @returns {void}
         */
        initialize(control: TemplateControl, resources?: Resources): void;
        initialize(controlInstance: TemplateControl, resources?: any): void {
            this.__controlInstance = controlInstance;

            if (isNull(resources)) {
                return;
            } else if (isNode(resources)) {
                resources = Resources.parseElement(resources);
            } else if (isObject(resources.resources)) {
                resources = resources.resources;
            }

            this.__resources = resources;

            var keys = Object.keys(resources),
                key: string,
                length = keys.length;

            for (var i = 0; i < length; ++i) {
                key = keys[i];
                (<any>this)[key] = resources[key];
            }
        }

        /**
         * @name add
         * @memberof plat.ui.Resources
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Used for programatically adding {@link plat.ui.IResource|IResource} objects.
         * 
         * @param resources An {@link plat.IObject<plat.ui.IResource>|IObject<IResource>} used to add 
         * resources, keyed by their alias.
         * 
         * @returns {void}
         * 
         * @example 
         * control.resources.add({
         *     myAlias: {
         *         type: 'observable',
         *         value: { 
         *             hello: 'Hello World!'
         *         } 
         *     }
         * });
         */
        add(resources: IObject<IResource>): void;
        /**
         * @name add
         * @memberof plat.ui.Resources
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Used for programatically adding {@link plat.ui.IResource|IResource} objects.
         * 
         * @param {Element} element An Element containing resource element children.
         * 
         * @returns {void}
         * 
         * @remarks
         * The resource type is specified by the element name.
         * 
         * @example
         *     <plat-resources>
         *         <injectable alias="Cache">_CacheFactory</injectable>
         *         <observable alias="testObj">{ foo: 'foo', bar: 'bar', baz: 2 }</observable>
         *     </plat-resources>
         */
        add(element: Element): void;
        add(resources: any): void {
            if (isNull(resources)) {
                return;
            } else if (isNode(resources)) {
                resources = Resources.parseElement(resources);
            }

            var keys = Object.keys(resources),
                length = keys.length,
                resource: IResource,
                control = this.__controlInstance,
                bound = this.__bound,
                key: string,
                create = Resources.create;

            for (var i = 0; i < length; ++i) {
                key = keys[i];
                resource = resources[key];
                resource.alias = key;

                (<any>this)[key] = this.__resources[key] = bound ? create(control, resource) : resource;
            }
        }
    }

    /**
     * The Type for referencing the '_ResourcesFactory' injectable as a dependency.
     */
    export function IResourcesFactory(
        _ContextManager?: observable.IContextManagerStatic,
        _regex?: expressions.Regex,
        _Exception?: IExceptionStatic): IResourcesFactory {
        (<any>Resources)._ContextManager = _ContextManager;
        (<any>Resources)._regex = _regex;
        (<any>Resources)._Exception = _Exception;
        var controlResources: IObject<boolean> = {},
            resourceTypes: IObject<boolean> = {};

        controlResources[__CONTROL_RESOURCE] = controlResources[__CONTEXT_RESOURCE] = controlResources[__ROOT_RESOURCE] = controlResources[__ROOT_CONTEXT_RESOURCE] = true;
        resourceTypes[__INJECTABLE_RESOURCE] = resourceTypes[__OBJECT_RESOURCE] = resourceTypes[__OBSERVABLE_RESOURCE] = resourceTypes[__FUNCTION_RESOURCE] = resourceTypes[__LITERAL_RESOURCE] = true;
        (<any>Resources).__controlResources = controlResources;
        (<any>Resources).__resourceTypes = resourceTypes;
        return Resources;
    }

    register.injectable(__ResourcesFactory, IResourcesFactory, [
        __ContextManagerStatic,
        __Regex,
        __ExceptionStatic
    ], __FACTORY);

    register.injectable(__ResourcesInstance, Resources, null, __INSTANCE);

    /**
     * @name ResourcesFactory
     * @memberof plat.ui
     * @kind interface
     * 
     * @description
     * Creates and manages {@link plat.ui.Resources|Resources} for {@link plat.ui.TemplateControl|TemplateControls}.
     */
    export interface IResourcesFactory {
        /**
         * @name INJECTABLE
         * @memberof plat.ui.ResourcesFactory
         * @kind property
         * @access public
         * @static
         * 
         * @type {string}
         * 
         * @description
         * The injectable resource type token.
         */
        INJECTABLE: string;

        /**
         * @name OBJECT
         * @memberof plat.ui.ResourcesFactory
         * @kind property
         * @access public
         * @static
         * 
         * @type {string}
         * 
         * @description
         * The object resource type token.
         */
        OBJECT: string;

        /**
         * @name OBSERVABLE
         * @memberof plat.ui.ResourcesFactory
         * @kind property
         * @access public
         * @static
         * 
         * @type {string}
         * 
         * @description
         * The observable resource type token.
         */
        OBSERVABLE: string;

        /**
         * @name LITERAL
         * @memberof plat.ui.ResourcesFactory
         * @kind property
         * @access public
         * @static
         * 
         * @type {string}
         * 
         * @description
         * The literal resource type token.
         */
        LITERAL: string;

        /**
         * @name FUNCTION
         * @memberof plat.ui.ResourcesFactory
         * @kind property
         * @access public
         * @static
         * 
         * @type {string}
         * 
         * @description
         * The function resource type token.
         */
        FUNCTION: string;

        /**
         * @name create
         * @memberof plat.ui.ResourcesFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Populates an {@link plat.ui.IResource|IResource} value if necessary, and adds it to the given 
         * control's resources.
         * 
         * @param {plat.ui.TemplateControl} control The control for which to create a resource.
         * @param {plat.ui.IResource} resource The object used to set the resource values.
         * 
         * @returns {plat.ui.IResource} The newly created {@link plat.ui.IResource|IResource}.
         */
        create(control: TemplateControl, resource: IResource): IResource;

        /**
         * @name addControlResources
         * @memberof plat.ui.ResourcesFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Adds resource aliases for '@control' and '@context'. The resources are 
         * aliases for the control instance and the control.context.
         * 
         * @param {plat.ui.TemplateControl} control The control on which to add the resources.
         * 
         * @returns {void}
         */
        addControlResources(control: TemplateControl): void;

        /**
         * @name bindResources
         * @memberof plat.ui.ResourcesFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Binds the resources in a resource instance. This involves injecting 
         * the injectable resources, creating object/observable resources, and
         * binding functions to the associated control's instance.
         * 
         * @param {plat.ui.Resources} resourcesInstance The instance of the Resources object.
         * 
         * @returns {void}
         */
        bindResources(resourcesInstance: Resources): void;

        /**
         * @name dispose
         * @memberof plat.ui.ResourcesFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Disposes a resource instance, removing its reference 
         * from a control and breaking references to all resource 
         * objects.
         * 
         * @param {plat.ui.TemplateControl} control The control whose resources will be disposed.
         * @param {boolean} persist? Whether or not to persist a resource object post 
         * disposal or set it to null.
         * 
         * @returns {void}
         */
        dispose(control: TemplateControl, persist?: boolean): void;

        /**
         * @name parseElement
         * @memberof plat.ui.ResourcesFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Parses a resources Element (<plat-resources>) and creates 
         * an {@link plat.IObject<plat.ui.IResource>|IObject<IResource>} with its element children.
         * 
         * @param {Element} element The resources element to parse.
         * 
         * @returns {plat.IObject<plat.ui.IResource>} The resources created using the input element.
         */
        parseElement(element: Element): IObject<IResource>;

        /**
         * @name getInstance
         * @memberof plat.ui.ResourcesFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Returns a new instance with type {@link plat.ui.Resources|Resources}.
         * 
         * @returns {plat.ui.Resources} A new {@link plat.ui.Resources|Resources} instance.
         */
        getInstance(): Resources;
    }

    /**
     * @name IResource
     * @memberof plat.ui
     * @kind interface
     * 
     * @description
     * Defines a single resource on the {@link plat.ui.Resources|Resources} object.
     */
    export interface IResource {
        /**
         * @name type
         * @memberof plat.ui.IResource
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The type of resource.
         * - injectable
         * - observable
         * - object
         * - function
         */
        type: string;

        /**
         * @name alias
         * @memberof plat.ui.IResource
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The alias used to reference the resource.
         */
        alias?: string;

        /**
         * @name value
         * @memberof plat.ui.IResource
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * The value of the resource.
         */
        value?: any;

        /**
         * @name initialValue
         * @memberof plat.ui.IResource
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * The initial value of the resource prior to it being observed.
         */
        initialValue?: any;
    }
}
