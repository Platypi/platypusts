namespace plat.ui {
    'use strict';

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
     * By default, every control has a resource for `@control` and `@context`.
     * {@link plat.ui.ViewControl|ViewControl} objects also have a resource for `@root` and `@rootContext`,
     * which is a reference to the control and its context.
     *
     * Resources can be created in HTML, or through the exposed control.resources
     * object. If specified in HTML, they must be the first element child of the
     * control upon which the resources will be placed. ViewControls that use a
     * templateUrl can have resources as their first element in the templateUrl.
     *
     * In the provided example, the resources can be accessed by using `@Cache` and `@testObj`.
     * The type of resource is denoted by the element name.
     *
     * Only resources of type `observable` will have data binding. The types of resources are:
     * function, injectable, observable, and object. Resources of type `function` will have their
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
        [property: string]: any;

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
        public static INJECTABLE: string = __INJECTABLE_RESOURCE;

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
         * The object resource type token. Objects should be literal objects and won't be observed.
         */
        public static OBJECT: string = __OBJECT_RESOURCE;

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
         * The observable resource type token. Observable resources are expected to be
         * string identifiers and will be observed.
         */
        public static OBSERVABLE: string = __OBSERVABLE_RESOURCE;

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
         * The literal resource type token. Literals will be observed on the resource object,
         * so if you change `resources.<alias>.value` it will be reflected everywhere it is
         * observed.
         */
        public static LITERAL: string = __LITERAL_RESOURCE;

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
        public static FUNCTION: string = __FUNCTION_RESOURCE;

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
         * @name _log
         * @memberof plat.ui.Resources
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
        private static __observableResourceRemoveListeners: IObject<
            IRemoveListener[]
        > = {};

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
        public static create(
            control: TemplateControl,
            resource: IResource
        ): IResource {
            if (isNull(resource)) {
                return resource;
            }

            let value: any;

            switch (resource.type.toLowerCase()) {
                case __INJECTABLE_RESOURCE:
                    const injector = injectableInjectors[resource.value];
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
                            Resources._log.warn(
                                `Attempted to create a "function" type Resource, but the function ${value} cannot be found on your control.`
                            );
                            resource.value = noop;
                        }
                    }
                default:
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
         * Adds resource aliases for `@control` and `@context`. The resources are
         * aliases for the control instance and the control.context.
         *
         * @param {plat.ui.TemplateControl} control The control on which to add the resources.
         *
         * @returns {void}
         */
        public static addControlResources(control: TemplateControl): void {
            control.resources.add({
                context: {
                    value: control.context,
                    type: __OBSERVABLE_RESOURCE,
                },
                control: {
                    value: control,
                    type: __OBJECT_RESOURCE,
                },
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
        public static bindResources(resourcesInstance: Resources): void;
        public static bindResources(resourcesInstance: Resources): void {
            const resources = resourcesInstance.__resources;
            if (isNull(resources)) {
                return;
            }

            const control = resourcesInstance.__controlInstance;
            const aliases = Object.keys(resources);
            const controlResources = Resources.__controlResources;
            const length = aliases.length;
            let alias: string;

            for (let i = 0; i < length; i += 1) {
                alias = aliases[i];

                if (controlResources[alias] === true) {
                    continue;
                }

                (<any>resourcesInstance)[alias] = resources[
                    alias
                ] = Resources.create(control, (<any>resourcesInstance)[alias]);
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
        public static dispose(
            control: TemplateControl,
            persist?: boolean
        ): void {
            const resources = control.resources;

            if (isNull(resources)) {
                return;
            }

            const keys = Object.keys(resources.__resources);
            const length = keys.length;
            const define = Resources._ContextManager.defineProperty;
            let key: string;
            let resource: IResource;

            for (let i = 0; i < length; i += 1) {
                key = keys[i];
                resource = (<any>resources)[key];

                if (
                    !isNull(resource) &&
                    (resource.type === __OBSERVABLE_RESOURCE ||
                        resource.type === __LITERAL_RESOURCE)
                ) {
                    define(resources, key, persist
                        ? _clone(resource, true)
                        : null, true, true, true);
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
         * Parses a resources Element (`<plat-resources>`) and creates
         * an {@link plat.IObject<plat.ui.IResource>|IObject<IResource>} with its element children.
         *
         * @param {Element} element The resources element to parse.
         *
         * @returns {plat.IObject<plat.ui.IResource>} The resources created using the input element.
         */
        public static parseElement(element: Element): IObject<IResource> {
            const children: Element[] = Array.prototype.slice.call(
                (<HTMLElement>element).children
            );
            const _regex = Resources._regex;
            const whiteSpaceRegex = _regex.whiteSpaceRegex;
            const quotationRegex = _regex.quotationRegex;
            const resources: IObject<IResource> = {};
            const types = Resources.__resourceTypes;
            let child: Element;
            let resource: IResource;
            let attrs: NamedNodeMap;
            let attr: Attr;
            let nodeName: string;
            let text: string;

            while (children.length > 0) {
                child = children.pop();
                nodeName = child.nodeName.toLowerCase();

                if (!types[nodeName]) {
                    continue;
                }

                attrs = child.attributes;
                resource = <any>{};

                attr = attrs.getNamedItem(__ALIAS);
                if (isNull(attr)) {
                    continue;
                }
                resource.alias = attr.value;

                text = child.textContent.replace(whiteSpaceRegex, '$1');
                if (isEmpty(text)) {
                    continue;
                }
                resource.value =
                    nodeName === __INJECTABLE_RESOURCE ||
                    nodeName === __LITERAL_RESOURCE
                        ? text.replace(quotationRegex, '')
                        : text;

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
        public static getInstance(): Resources {
            return new Resources();
        }

        /**
         * @name _observeResource
         * @memberof plat.ui.Resources
         * @kind function
         * @access protected
         * @static
         *
         * @description
         * Observes the resource if the type is `observable`.
         *
         * @param {plat.ui.TemplateControl} control The control in charge of the observable resource.
         * @param {plat.ui.IResource} resource The resource to observe.
         *
         * @returns {void}
         */
        protected static _observeResource(
            control: TemplateControl,
            resource: IResource
        ): void {
            const uid = control.uid;
            let value = resource.value;
            let removeListeners =
                Resources.__observableResourceRemoveListeners[uid];

            if (isNull(removeListeners)) {
                removeListeners = Resources.__observableResourceRemoveListeners[
                    uid
                ] = [];
            }

            if (isString(value)) {
                if (!isNull(resource.initialValue)) {
                    value = resource.initialValue;
                } else {
                    resource.initialValue = value;
                }
                const listener = control.observeExpression((newValue): void => {
                    resource.value = newValue;
                }, value);
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

            const uid = control.uid;
            const removeListeners =
                Resources.__observableResourceRemoveListeners[uid];

            if (isArray(removeListeners)) {
                const length = removeListeners.length;

                for (let i = 0; i < length; i += 1) {
                    removeListeners[i]();
                }
            }

            deleteProperty(Resources.__observableResourceRemoveListeners, uid);
        }

        /**
         * @name __addRoot
         * @memberof plat.ui.Resources
         * @kind function
         * @access private
         * @static
         *
         * @description
         * Adds a `@root` alias and `@rootContext` to a control, specifying that it contains the root
         * and root context. Root controls are generally the root {@link plat.ui.ViewControl|ViewControl}.
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
                    alias: __ROOT_RESOURCE,
                },
                rootContext: {
                    value: control.context,
                    type: __OBSERVABLE_RESOURCE,
                    alias: __ROOT_CONTEXT_RESOURCE,
                },
            });
        }

        /**
         * @name initialize
         * @memberof plat.ui.Resources
         * @kind function
         * @access public
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
        public initialize(
            controlInstance: TemplateControl,
            resources?: Element | IObject<IResource> | Resources
        ): void {
            this.__controlInstance = controlInstance;

            if (isNull(resources)) {
                return;
            } else if (isNode(resources)) {
                resources = Resources.parseElement(<Element>resources);
            } else if (isObject((<Resources>resources).resources)) {
                resources = (<Resources>resources).resources;
            }

            this.__resources = <IObject<IResource>>resources;

            const keys = Object.keys(resources);
            let key: string;
            const length = keys.length;

            for (let i = 0; i < length; i += 1) {
                key = keys[i];
                (<any>this)[key] = (<IObject<IResource>>resources)[key];
            }
        }

        /**
         * @name add
         * @memberof plat.ui.Resources
         * @kind function
         * @access public
         *
         * @description
         * Used for programmatically adding {@link plat.ui.IResource|IResource} objects.
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
        public add(resources: IObject<IResource> | Element): void {
            if (isNull(resources)) {
                return;
            } else if (isNode(resources)) {
                resources = Resources.parseElement(<Element>resources);
            }

            const keys = Object.keys(resources);
            const length = keys.length;
            const control = this.__controlInstance;
            const bound = this.__bound;
            const create = Resources.create;
            let resource: IResource;
            let key: string;

            for (let i = 0; i < length; i += 1) {
                key = keys[i];
                resource = (<IObject<IResource>>resources)[key];
                resource.alias = key;

                (<any>this)[key] = this.__resources[key] = bound
                    ? create(control, resource)
                    : resource;
            }
        }
    }

    /**
     * The Type for referencing the '_ResourcesFactory' injectable as a dependency.
     */
    export function IResourcesFactory(
        _ContextManager?: observable.IContextManagerStatic,
        _regex?: expressions.Regex,
        _log?: debug.Log
    ): IResourcesFactory {
        (<any>Resources)._ContextManager = _ContextManager;
        (<any>Resources)._regex = _regex;
        (<any>Resources)._log = _log;
        const controlResources: IObject<boolean> = {};
        const resourceTypes: IObject<boolean> = {};

        controlResources[__CONTROL_RESOURCE] = controlResources[
            __CONTEXT_RESOURCE
        ] = controlResources[__ROOT_RESOURCE] = controlResources[
            __ROOT_CONTEXT_RESOURCE
        ] = true;
        resourceTypes[__INJECTABLE_RESOURCE] = resourceTypes[
            __OBJECT_RESOURCE
        ] = resourceTypes[__OBSERVABLE_RESOURCE] = resourceTypes[
            __FUNCTION_RESOURCE
        ] = resourceTypes[__LITERAL_RESOURCE] = true;
        (<any>Resources).__controlResources = controlResources;
        (<any>Resources).__resourceTypes = resourceTypes;

        return Resources;
    }

    register.injectable(
        __ResourcesFactory,
        IResourcesFactory,
        [__ContextManagerStatic, __Regex, __Log],
        __FACTORY
    );

    register.injectable(__ResourcesInstance, Resources, null, __INSTANCE);

    /**
     * @name IResourcesFactory
     * @memberof plat.ui
     * @kind interface
     *
     * @description
     * Creates and manages {@link plat.ui.Resources|Resources} for {@link plat.ui.TemplateControl|TemplateControls}.
     */
    export interface IResourcesFactory {
        /**
         * @name INJECTABLE
         * @memberof plat.ui.IResourcesFactory
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
         * @memberof plat.ui.IResourcesFactory
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
         * @memberof plat.ui.IResourcesFactory
         * @kind property
         * @access public
         * @static
         *
         * @type {string}
         *
         * @description
         * The observable resource type token. Observable resources are expected to be
         * string identifiers and will be observed.
         */
        OBSERVABLE: string;

        /**
         * @name LITERAL
         * @memberof plat.ui.IResourcesFactory
         * @kind property
         * @access public
         * @static
         *
         * @type {string}
         *
         * @description
         * The literal resource type token. Literals will be observed on the resource object,
         * so if you change `resources.<alias>.value` it will be reflected everywhere it is
         * observed.
         */
        LITERAL: string;

        /**
         * @name FUNCTION
         * @memberof plat.ui.IResourcesFactory
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
         * @memberof plat.ui.IResourcesFactory
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
         * @memberof plat.ui.IResourcesFactory
         * @kind function
         * @access public
         * @static
         *
         * @description
         * Adds resource aliases for `@control` and `@context`. The resources are
         * aliases for the control instance and the control.context.
         *
         * @param {plat.ui.TemplateControl} control The control on which to add the resources.
         *
         * @returns {void}
         */
        addControlResources(control: TemplateControl): void;

        /**
         * @name bindResources
         * @memberof plat.ui.IResourcesFactory
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
         * @memberof plat.ui.IResourcesFactory
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
         * @memberof plat.ui.IResourcesFactory
         * @kind function
         * @access public
         * @static
         *
         * @description
         * Parses a resources Element (`<plat-resources>`) and creates
         * an {@link plat.IObject<plat.ui.IResource>|IObject<IResource>} with its element children.
         *
         * @param {Element} element The resources element to parse.
         *
         * @returns {plat.IObject<plat.ui.IResource>} The resources created using the input element.
         */
        parseElement(element: Element): IObject<IResource>;

        /**
         * @name getInstance
         * @memberof plat.ui.IResourcesFactory
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
