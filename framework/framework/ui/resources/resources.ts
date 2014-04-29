module plat.ui {
    /**
     * Resources are used for providing aliases to use in markup expressions. They 
     * are particularly useful when trying to access properties outside of the 
     * current context, as well as reassigning context at any point in an app.
     * 
     * By default, every control has a resource for '@control' and '@context'.
     * IViewControl objects also have a resource for '@root' and '@rootContext', 
     * which is a reference to the control and its context.
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
    export class Resources implements IResources {
        static $ContextManagerStatic: observable.IContextManagerStatic;
        static $regex: expressions.IRegex;
        static $ExceptionStatic: IExceptionStatic;
        /**
         * Populates an IResource value if necessary, and adds it to the given 
         * control's resources.
         * 
         * @static
         * @param control The control for which to create a resource.
         * @param resource The IResource used to set the value.
         */
        static createResource(control: ITemplateControl, resource: IResource) {
            if (isNull(resource)) {
                return resource;
            }

            var value;

            switch (resource.type.toLowerCase()) {
                case 'injectable':
                    var injector = injectableInjectors[resource.value];
                    if (!isNull(injector)) {
                        resource.value = injector.inject();
                    }
                    break;
                case 'observable':
                    Resources._observeResource(control, resource);
                    break;
                case 'object':
                    value = resource.value;
                    if (isString(value)) {
                        resource.value = control.evaluateExpression(value);
                    }
                    break;
                case 'function':
                    value = resource.value;
                    if (isString(value)) {
                        value = control[value];
                        if (isFunction(value)) {
                            resource.value = value.bind(control);
                        } else {;
                            Resources.$ExceptionStatic.warn('Attempted to create a "function" ' +
                                'type Resource with a function not found on your control.',
                                Resources.$ExceptionStatic.BIND);
                            resource.value = noop;
                        }
                    }
                    break;
            }

            return resource;
        }

        /**
         * Adds resource aliases for '@control' and '@context'. The resources are 
         * aliases for the control instance and the control.context.
         * 
         * @static
         * @param control The control on which to add the resources.
         */
        static addControlResources(control: ITemplateControl) {
            control.resources.add({
                context: {
                    value: control.context,
                    type: 'observable'
                },
                control: {
                    value: control,
                    type: 'object'
                }
            });

            if (control.hasOwnContext) {
                Resources.__addRoot(<IViewControl>control);
            }
        }

        /**
         * Binds the resources in a resource instance. This involves injecting 
         * the injectable resources, creating object/observable resources, and
         * binding functions to the associated control's instance.
         * 
         * @static
         * @param resourcesInstance The instance of the IResources object.
         */
        static bindResources(resourcesInstance: IResources): void;
        static bindResources(resourcesInstance: Resources) {
            var resources = resourcesInstance.__resources,
                control = resourcesInstance.__controlInstance,
                aliases = Object.keys(resources),
                controlResources = Resources.__controlResources,
                length = aliases.length,
                alias;
                
            
            for (var i = 0; i < length; ++i) {
                alias = aliases[i];

                if (controlResources.indexOf(alias) !== -1) {
                    continue;
                }

                resourcesInstance[alias] = resources[alias] = Resources.createResource(control,
                    resourcesInstance[alias]);
            }
            
            resourcesInstance.__bound = true;
        }

        /**
         * Disposes a resource instance, removing its reference 
         * from a control and breaking references to all resource 
         * objects.
         * 
         * @static
         * @param control The control whose resources will be disposed.
         * @param persist Whether or not to persist a resource object post 
         * disposal or set it to null.
         */
        static dispose(control: ITemplateControl, persist?: boolean) {
            var resources = <Resources>control.resources;

            if (isNull(resources)) {
                return;
            }

            var keys = Object.keys(resources.__resources),
                key: string,
                length = keys.length,
                define = Resources.$ContextManagerStatic.defineProperty,
                resource: IResource;

            for (var i = 0; i < length; ++i) {
                key = keys[i];
                resource = resources[key];

                if (!isNull(resource) && resource.type === 'observable') {
                    define(resources, key, persist ? deepExtend({}, resource) : null, true, true);
                }
            }

            Resources._removeListeners(resources.__controlInstance);
        }
        
        /**
         * Parses a resources HTMLElement and creates 
         * an IObject<IResource> with its element children.
         * 
         * @static
         * @param element The resources element to parse.
         * 
         * @return {IObject<IResource>} The resources created 
         * using element.
         */
        static parseElement(element: HTMLElement) {
            var slice = Array.prototype.slice,
                whiteSpaceRegex = Resources.$regex.whiteSpaceRegex,
                quotationRegex = Resources.$regex.quotationRegex,
                resources: IObject<IResource> = {},
                resource: IResource,
                types = Resources.__resourceTypes,
                attrs: NamedNodeMap,
                attr: Attr,
                children = slice.call(element.children),
                child: HTMLElement,
                nodeName: string,
                text: string;

            while (children.length > 0) {
                child = children.pop();
                nodeName = child.nodeName.toLowerCase();

                if (types.indexOf(nodeName) === -1) {
                    continue;
                }

                attrs = child.attributes;
                resource = <IResource>{};

                attr = attrs.getNamedItem('alias');
                if (isNull(attr)) {
                    continue;
                }
                resource.alias = attr.value;

                text = child.textContent.replace(whiteSpaceRegex, '$1');
                if (isEmpty(text)) {
                    continue;
                }
                resource.value = (nodeName === 'injectable') ?
                    text.replace(quotationRegex, '') : text;

                resource.type = nodeName;
                resources[resource.alias] = resource;
            }

            return resources;
        }

        /**
         * Returns a new instance of IResources.
         * 
         * @static
         */
        static getInstance() {
            return new Resources();
        }

        /**
         * Observes the resource if the type is 'observable'.
         * 
         * @static
         * @param control The control in charge of the observable resource.
         * @param resource The resource to observe.
         */
        static _observeResource(control: ITemplateControl, resource: IResource) {
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
                var listener = control.observeExpression(value, function resourceChanged(newValue) {
                    resource.value = newValue;
                });
                resource.value = control.evaluateExpression(value);
                removeListeners.push(listener);
            }
        }

        /**
         * Removes observable resource listeners for a specified control.
         * 
         * @static
         * @param control The control whose listeners are being removed.
         */
        static _removeListeners(control: ITemplateControl) {
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

            Resources.__observableResourceRemoveListeners[uid] = null;
            delete Resources.__observableResourceRemoveListeners[uid];
        }

        private static __controlResources = ['control', 'context', 'root', 'rootContext'];
        private static __resourceTypes = ['injectable', 'object', 'observable', 'function'];
        private static __observableResourceRemoveListeners: IObject<Array<IRemoveListener>> = {};

        /**
         * Adds a '@root' alias and '@rootContext' to a control, specifying that it contains the root 
         * and root context. Root controls are the root IViewControl.
         * 
         * @param control The root IViewControl.
         */
        private static __addRoot(control: IViewControl) {
            control.resources.add({
                root: {
                    value: control,
                    type: 'object',
                    alias: 'root'
                },
                rootContext: {
                    value: control.context,
                    type: 'observable',
                    alias: 'rootContext'
                }
            });
        }

        private __resources: IObject<IResource> = {};
        private __bound: boolean = false;
        private __controlInstance: ITemplateControl;

        /**
         * Initializes the control's Resources instance.
         * 
         * @param control The control containing this Resources instance.
         * @param element An optional element used to create initial IResource objects.
         */
        initialize(control: ITemplateControl, element?: HTMLElement): void;
        /**
         * Initializes the control's Resources instance.
         * 
         * @param control The control containing this Resources instance.
         * @param resources An optional IObject<IResource> used to populate initial
         * IResource objects.
         */
        initialize(control: ITemplateControl, resources?: IObject<IResource>): void;
        /**
         * Initializes the control's Resources instance.
         * 
         * @param control The control containing this Resources instance.
         * @param element An optional IResources object used to populate initial 
         * IResource objects.
         */
        initialize(control: ITemplateControl, resources?: IResources): void;
        initialize(controlInstance: ITemplateControl, resources?: any) {
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
                injector: dependency.IInjector<any>,
                length = keys.length;

            for (var i = 0; i < length; ++i) {
                key = keys[i];
                this[key] = resources[key];
            }
        }

        /**
         * Used for programatically adding IResource objects.
         * 
         * @param resources An IObject<IResource> used to add 
         * resources, keyed by their alias.
         * 
         * @example control.resources.add({
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
         * Used for programatically adding IResource objects.
         * 
         * @param element An HTMLElement containing resource element children.
         * 
         * @example
         *     <plat-resources>
         *         <injectable alias="Cache">$CacheStatic</injectable>
         *         <observable alias="testObj">{ foo: 'foo', bar: 'bar', baz: 2 }</observable>
         *     </plat-resources>
         * 
         * The resource type is specified by the element name.
         */
        add(element: HTMLElement): void;
        add(resources: any) {
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
                create = Resources.createResource;

            for (var i = 0; i < length; ++i) {
                key = keys[i];
                resource = resources[key];
                resource.alias = key;

                this[key] = this.__resources[key] = bound ? create(control, resource) : resource;
            }
        }
    }

    /**
     * The Type for referencing the '$ResourcesStatic' injectable as a dependency.
     */
    export function ResourcesStatic(
    $ContextManagerStatic,
    $regex,
    $ExceptionStatic) {
        Resources.$ContextManagerStatic = $ContextManagerStatic;
        Resources.$regex = $regex;
        Resources.$ExceptionStatic = $ExceptionStatic;
        return Resources;
    }

    register.injectable('$ResourcesStatic', ResourcesStatic, [
        '$ContextManagerStatic',
        '$regex',
        '$ExceptionStatic'
    ], register.injectableType.STATIC);

    /**
     * Resources are used for providing aliases to use in markup expressions. They 
     * are particularly useful when trying to access properties outside of the 
     * current context, as well as reassigning context at any point in an app.
     * 
     * By default, every control has a resource for '@control' and '@context'.
     * IViewControl objects also have a resource for '@root' and '@rootContext', 
     * which is a reference to the control and its context.
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
    export interface IResources {
        /**
         * Used for programatically adding IResource objects.
         * 
         * @param resources An IObject<IResource> used to add 
         * resources, keyed by their alias.
         * 
         * @example control.resources.add({
         *     myAlias: {
         *         type: 'observable',
         *         value: { 
         *             hello: 'Hello World!'
         *         } 
         *     }
         * });
         */
        add(resources: IObject<IResource>);
        /**
         * Used for programatically adding IResource objects.
         * 
         * @param element An HTMLElement containing resource element children.
         * 
         * @example
         *     <plat-resources>
         *         <injectable alias="Cache">$CacheStatic</injectable>
         *         <observable alias="testObj">{ foo: 'foo', bar: 'bar', baz: 2 }</observable>
         *     </plat-resources>
         * 
         * The resource type is specified by the element name.
         */
        add(element: HTMLElement): void;

        /**
         * @param control The control containing this Resources instance.
         * @param element An optional element used to create initial IResource objects.
         */
        initialize(control: ITemplateControl, element?: HTMLElement);
        /**
         * @param control The control containing this Resources instance.
         * @param resources An optional IObject<IResource> used to populate initial
         * IResource objects.
         */
        initialize(control: ITemplateControl, resources?: IObject<IResource>);
        /**
         * @param control The control containing this Resources instance.
         * @param element An optional IResources object used to populate initial 
         * IResource objects.
         */
        initialize(control: ITemplateControl, resources?: IResources);
    }

    /**
     * Defines a single resource on the IResources object.
     */
    export interface IResource {
        /**
         * The type of resource.
         * - injectable
         * - observable
         * - object
         * - function
         */
        type: string;

        /**
         * The alias used to reference the Resource.
         */
        alias?: string;

        /**
         * The value of the Resource
         */
        value?: any;

        /**
         * The initial value prior to it being observed.
         */
        initialValue?: any;
    }

    /**
     * The external interface for the '$ResourcesStatic' injectable.
     */
    export interface IResourcesStatic {
        /**
         * Populates an IResource value if necessary, and adds it to the given
         * control's resources.
         *
         * @static
         * @param control The control for which to create a resource.
         * @param resource The IResource used to set the value.
         */
        createResource(control: ITemplateControl, resource: IResource): IResource;

        /**
         * Adds resource aliases for '@control' and '@context'. The resources are
         * aliases for the control instance and the control.context.
         *
         * @static
         * @param control The control on which to add the resources.
         */
        addControlResources(control: ITemplateControl): void;

        /**
         * Binds the resources in a resource instance. This involves injecting
         * the injectable resources, creating object/observable resources, and
         * binding functions to the associated control's instance.
         *
         * @static
         * @param resourcesInstance The instance of the IResources object.
         */
        bindResources(resourcesInstance: IResources): void;

        /**
         * Disposes a resource instance, removing its reference
         * from a control and breaking references to all resource
         * objects.
         * 
         * @static
         * @param control The control whose resources will be disposed.
         * @param persist Whether or not to persist a resource object post 
         * disposal or set it to null.
         */
        dispose(control: ITemplateControl, persist?: boolean): void;

        /**
         * Parses a resources HTMLElement and creates
         * an IObject<IResource> with its element children.
         *
         * @static
         * @param element The resources element to parse.
         * 
         * @return {IObject<IResource>} The resources created
         * using element.
         */
        parseElement(element: HTMLElement): IObject<IResource>;

        /**
         * Returns a new instance of IResources
         * 
         * @static
         */
        getInstance(): IResources;
    }
}
