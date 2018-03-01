module plat.ui {
    'use strict';

    /**
     * @name TemplateControl
     * @memberof plat.ui
     * @kind class
     *
     * @extends {plat.Control}
     *
     * @description
     * The base control for any control that affects the UI. They provide properties for the control to use
     * to manage its body HTML.
     */
    export class TemplateControl extends Control {
        /**
         * @name _ResourcesFactory
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access protected
         * @static
         *
         * @type {plat.ui.IResourcesFactory}
         *
         * @description
         * Reference to the {@link plat.ui.IResourcesFactory|IResourcesFactory} injectable.
         */
        protected static _ResourcesFactory: IResourcesFactory;

        /**
         * @name _BindableTemplatesFactory
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access protected
         * @static
         *
         * @type {plat.ui.IBindableTemplatesFactory}
         *
         * @description
         * Reference to the {@link plat.ui.IBindableTemplatesFactory|IBindableTemplatesFactory} injectable.
         */
        protected static _BindableTemplatesFactory: IBindableTemplatesFactory;

        /**
         * @name _managerCache
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access protected
         * @static
         *
         * @type {plat.storage.Cache<processing.ElementManager>}
         *
         * @description
         * Reference to a cache injectable that stores {@link plat.processing.ElementManager|ElementManagers}.
         */
        protected static _managerCache: storage.Cache<processing.ElementManager>;

        /**
         * @name _templateCache
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access protected
         * @static
         *
         * @type {plat.storage.TemplateCache}
         *
         * @description
         * Reference to a cache injectable that stores and retrieves HTML templates.
         */
        protected static _templateCache: storage.TemplateCache;

        /**
         * @name _parser
         * @memberof plat.ui.TemplateControl
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
         * @name _http
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access protected
         * @static
         *
         * @type {plat.async.Http}
         *
         * @description
         * Reference to the {@link plat.async.Http|Http} injectable.
         */
        protected static _http: async.Http;

        /**
         * @name _Promise
         * @memberof plat.ui.TemplateControl
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
         * @name _log
         * @memberof plat.Control
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
         * @name __resourceCache
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access private
         * @static
         *
         * @type {IObject<any>}
         *
         * @description
         * An object for quickly retrieving previously accessed resources.
         */
        private static __resourceCache: IObject<any> = {};

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
        public priority: number = 100;

        /**
         * @name context
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         *
         * @type {any}
         *
         * @description
         * The context of an {@link plat.ui.TemplateControl|TemplateControl}, used for inheritance and data-binding.
         */
        public context: any = null;

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
         * The name of a {@link plat.ui.TemplateControl|TemplateControl} if a {@link plat.controls.Name|Name}
         * control is involved.
         */
        public name: string;

        /**
         * @name absoluteContextPath
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * Specifies the absolute path from where the context was created to this Control's context.
         * Used by the {@link plat.observable.ContextManager|ContextManager} for maintaining context parity
         * (e.g. 'context.childContextProperty.grandChildContextProperty').
         */
        public absoluteContextPath: string = null;

        /**
         * @name resources
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         *
         * @type {plat.ui.Resources}
         *
         * @description
         * Resources are used for providing aliases to use in markup expressions. They
         * are particularly useful when trying to access properties outside of the
         * current context, as well as reassigning context at any point in an app.
         *
         * @remarks
         * By default, every control has a resource for `@control` and `@context`.
         * {@link plat.ui.ViewControl|ViewControl} objects also have a resource for `@root` and `@rootContext`,
         * which is a reference to their root control and root context.
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
        public resources: Resources;

        /**
         * @name hasOwnContext
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         *
         * @type {boolean}
         *
         * @description
         * Flag indicating whether or not the {@link plat.ui.TemplateControl|TemplateControl} defines the context property.
         */
        public hasOwnContext: boolean = false;

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
         * defined on a {@link plat.ui.TemplateControl|TemplateControl} then DOM will be created and put in the
         * control's element prior to calling the 'setTemplate' method.
         */
        public templateString: string;

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
         * defined on a {@link plat.ui.TemplateControl|TemplateControl} then DOM will be created and put in the
         * control's element prior to calling the `setTemplate` method. This property takes
         * precedence over templateString. In the event that both are defined, templateString
         * will be ignored.
         */
        public templateUrl: string;

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
        public innerTemplate: DocumentFragment;

        /**
         * @name bindableTemplates
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         *
         * @type {plat.ui.BindableTemplates}
         *
         * @description
         * An {@link plat.ui.BindableTemplates|BindableTemplates} object used for binding a data context to a template.
         * This is an advanced function of a {@link plat.ui.TemplateControl|TemplateControl}.
         */
        public bindableTemplates: BindableTemplates;

        /**
         * @name controls
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         *
         * @type {Array<plat.Control>}
         *
         * @description
         * An array of child controls. Any controls created by this control can be found in this array. The controls in
         * this array will have reference to this control in their parent property.
         */
        public controls: Control[];

        /**
         * @name elementNodes
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         *
         * @type {Array<Node>}
         *
         * @description
         * A Node array for managing the {@link plat.ui.TemplateControl|TemplateControl's} childNodes in the event that this control
         * replaces its element. This property will only exist/be of use for a {@link plat.ui.TemplateControl|TemplateControl} that
         * implements the replaceWith property. This is an experimental API.
         */
        public elementNodes: Node[];

        /**
         * @name startNode
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         *
         * @type {Node}
         *
         * @description
         * The first node in the {@link plat.ui.TemplateControl|TemplateControl's} body. This property allows an
         * {@link plat.ui.TemplateControl|TemplateControl} to add nodes to its body in the event that it replaces its element.
         * This is an experimental API.
         *
         * @example this.startNode.parentNode.insertBefore(node, this.startNode.nextSibling);
         */
        public startNode: Comment;

        /**
         * @name endNode
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         *
         * @type {Node}
         *
         * @description
         * The last node in the {@link plat.ui.TemplateControl|TemplateControl's} body. This property allows a
         * {@link plat.ui.TemplateControl|TemplateControl} to add nodes to its body in the event that it replaces its element.
         * This is an experimental API.
         *
         * @example this.endNode.parentNode.insertBefore(node, this.endNode);
         */
        public endNode: Comment;

        /**
         * @name replaceWith
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * Allows a {@link plat.ui.TemplateControl|TemplateControl} to either swap its element with another element (e.g. plat-select),
         * or replace its element altogether. If null or empty string, the element will be removed from the DOM, and the
         * childNodes of the element will be in its place. In addition, when the element is placed startNode and endNode Comments
         * are created, and the childNodes are added to the elementNodes property on the control. The replaceWith
         * property can be any property that works with document.createElement(). If the control's element had
         * attributes (as well as attribute Controls), those attributes will be carried to the swapped element. The default
         * replaceWith is 'any,' meaning it will default to a 'div' in the case that the control type is used as the
         * element's nodename (e.g. `<plat-foreach plat-context="..."></plat-foreach>`), but will maintain whatever element type
         * is used otherwise (e.g. `<tr plat-control="plat-foreach" plat-context="..."></tr>`).
         */
        public replaceWith: string = 'any';

        /**
         * @name root
         * @memberof plat.ui.TemplateControl
         * @kind property
         * @access public
         *
         * @type {plat.ui.TemplateControl}
         *
         * @description
         * Set to the root ancestor control from which this control inherits its context. This value
         * can be equal to this control.
         */
        public root: TemplateControl;

        /**
         * @name evaluateExpression
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         * @static
         *
         * @description
         * Evaluates an expression string with a given control and optional control's context and aliases.
         *
         * @param {plat.expressions.IParsedExpression} expression A parsed expression object created using the
         * plat.expressions.Parser injectable.
         * @param {plat.ui.TemplateControl} control? The control used for evaluation context.
         * @param {IObject<any>} aliases? An optional alias object containing resource alias values (property keys should
         * not include the `@` character).
         *
         * @returns {any} The evaluated object.
         */
        public static evaluateExpression(expression: string | expressions.IParsedExpression,
            control?: TemplateControl, aliases?: IObject<any>): any {
            if (isEmpty(expression)) {
                return expression;
            }

            if (isString(expression)) {
                expression = TemplateControl._parser.parse(<string>expression);
            } else if (!isFunction((<expressions.IParsedExpression>expression).evaluate)) {
                return expression;
            }

            if (isNull(control)) {
                return (<expressions.IParsedExpression>expression).evaluate(null, aliases);
            }

            if ((<expressions.IParsedExpression>expression).aliases.length > 0) {
                aliases = TemplateControl.getResources(control, (<expressions.IParsedExpression>expression).aliases, aliases);

                if (isEmpty(aliases)) {
                    return;
                }
            }

            return (<expressions.IParsedExpression>expression).evaluate(control.context, aliases);
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
         * @param {plat.ui.TemplateControl} control The control used as the starting point for finding resources.
         * @param {Array<string>} aliases An array of aliases to search for.
         * @param {IObject<any>} resources? An optional resources object to extend, if no resources object is passed in a
         * new one will be created.
         *
         * @returns {IObject<any>} An object representing a set of resources.
         */
        public static getResources(control: TemplateControl, aliases: string[], resources?: IObject<any>): IObject<any> {
            if (isNull(control)) {
                return {};
            }

            const length = aliases.length;
            let alias: string;
            let resource: IResource;
            let resourceObj: {
                    control: TemplateControl;
                    resource: IResource;
                };
            let cache = TemplateControl.__resourceCache[control.uid];

            if (isNull(cache)) {
                cache = TemplateControl.__resourceCache[control.uid] = {};
            }

            if (!isObject(resources)) {
                resources = {};
            }

            for (let i = 0; i < length; i += 1) {
                alias = aliases[i];

                if (alias[0] === '@') {
                    alias = alias.slice(1);
                }

                if (alias === __CONTEXT_RESOURCE) {
                    resources[alias] = control.context;
                    continue;
                } else if (alias === __ROOT_CONTEXT_RESOURCE) {
                    resources[alias] = Control.getRootControl(control).context;
                    continue;
                }

                if (!isNull(resources[alias])) {
                    continue;
                } else if (!isNull(cache[alias])) {
                    const resourceControl: TemplateControl = cache[alias].control;
                    const controlResources = resourceControl.resources;

                    if (isNull(controlResources)) {
                        resourceObj = TemplateControl.findResource(control, alias);
                    } else {
                        resourceObj = {
                            control: resourceControl,
                            resource: controlResources[alias],
                        };
                    }
                } else {
                    resourceObj = TemplateControl.findResource(control, alias);
                }

                if (isNull(resourceObj)) {
                    if (control.type.indexOf(__COMPILED) !== -1) {
                        continue;
                    }

                    TemplateControl._log.warn(`Resource alias: ${alias} is not defined.`);
                    continue;
                }

                cache[alias] = resourceObj;
                resource = resourceObj.resource;
                resources[alias] = isNull(resource) ? resource : resource.value;
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
         * @param {plat.ui.TemplateControl} control The control on which to start searching for the resource alias.
         * @param {string} alias The alias to search for.
         *
         * @returns {{ resource: plat.ui.IResource; control: plat.ui.TemplateControl; }} An object consisting of the
         * found resource along with its corresponding control.
         */
        public static findResource(control: TemplateControl, alias: string): { resource: IResource; control: TemplateControl } {
            let resource: IResource;

            if (isNull(control) || isNull(control.resources) || !isString(alias) || isEmpty(alias)) {
                return;
            }

            if (alias[0] === '@') {
                alias = alias.slice(1);
            }

            const isRootContext = alias === __ROOT_CONTEXT_RESOURCE;
            if (isRootContext || alias === __CONTEXT_RESOURCE || alias === __CONTROL_RESOURCE) {
                if (isRootContext) {
                    control = Control.getRootControl(control);
                }

                if (isObject(control.resources)) {
                    resource = control.resources[alias];
                }

                if (isNull(resource)) {
                    return;
                }

                return {
                    resource: resource,
                    control: control,
                };
            }

            while (!isNull(control)) {
                if (isObject(control.resources)) {
                    resource = control.resources[alias];
                }

                if (!isNull(resource)) {
                    return {
                        resource: resource,
                        control: control,
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
         * @param {plat.ui.TemplateControl} control A control to dispose.
         *
         * @returns {void}
         */
        public static dispose(control: TemplateControl): void {
            if (isNull(control)) {
                return;
            }

            const uid = control.uid;
            const childControls = control.controls;
            const controls = isArray(childControls) ? childControls.slice(0) : childControls;
            const ContextManager = Control._ContextManager;
            const define = ContextManager.defineProperty;

            if (!isNull(controls)) {
                const length = controls.length - 1;

                for (let i = length; i >= 0; i -= 1) {
                    Control.dispose(controls[i]);
                }
            }

            if (isFunction(control.dispose)) {
                control.dispose();
            }

            Control.removeEventListeners(control);
            TemplateControl.removeElement(control);

            TemplateControl._ResourcesFactory.dispose(control);
            TemplateControl._BindableTemplatesFactory.dispose(control);

            deleteProperty(TemplateControl.__resourceCache, control.uid);

            ContextManager.dispose(control);
            events.EventManager.dispose(control.uid);

            TemplateControl._managerCache.remove(uid);
            Control.removeParent(control);

            define(control, __RESOURCES, null, true, true, true);
            control.attributes = null;
            control.bindableTemplates = null;
            control.controls = [];
            control.root = null;
            control.innerTemplate = null;

            if ((<IInternal>control).__injectable__type === __STATIC) {
                const injector = controlInjectors[control.type];
                register.control(control.type, (<any>control).constructor, <[string]>injector.dependencies, true);
            }
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
         * @param {plat.ui.TemplateControl} control The control serving as the root control to load.
         *
         * @returns {void}
         */
        public static loadControl(control: TemplateControl): void {
            const children = control.controls;
            const length = children.length;
            let child: TemplateControl;

            for (let i = 0; i < length; i += 1) {
                child = <TemplateControl>children[i];
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
         *
         * @description
         * Notifies a control that its context has been changed by
         * calling the `control.contextChanged` method if it exists.
         *
         * @param {plat.ui.TemplateControl} control The control whose context changed.
         * @param {any} newValue The new value of the control's context.
         * @param {any} oldValue The old value of the control's context.
         *
         * @returns {void}
         */
        public static contextChanged(control: TemplateControl, newValue: any, oldValue: any): void {
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
         * Sets the `context` resource value on a {@link plat.ui.TemplateControl|TemplateControl}. If the control specifies
         * hasOwnContext as true, the `rootContext` resource value will be set.
         *
         * @param {plat.ui.TemplateControl} control The control whose context resources will be set.
         *
         * @returns {void}
         */
        public static setContextResources(control: TemplateControl): void {
            const value = control.context;

            if (isNull(control.resources)) {
                control.resources = TemplateControl._ResourcesFactory.getInstance();
                control.resources.initialize(control);
            }

            if (control.hasOwnContext) {
                if (isNull((<any>control.resources).rootContext)) {
                    control.resources.add({
                        root: {
                            type: __OBSERVABLE_RESOURCE,
                            value: value,
                        },
                    });
                } else {
                    (<any>control.resources).rootContext.value = value;
                }
            }

            if (isNull((<any>control.resources).context)) {
                control.resources.add({
                    context: {
                        type: __OBSERVABLE_RESOURCE,
                        value: value,
                    },
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
         * Completely removes a control's element from its parentNode.
         *
         * @param {plat.ui.TemplateControl} control The control whose element should be removed.
         *
         * @returns {void}
         */
        public static removeElement(control: TemplateControl): void {
            if (isNull(control)) {
                return;
            }

            const element = control.element;
            let parentNode: Node;

            if (control.replaceWith === null ||
            control.replaceWith === '' ||
            isDocumentFragment(element)) {
                removeAll(control.startNode, control.endNode);
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
         * @param {plat.ui.TemplateControl} control The control on which to set the absoluteContextPath.
         * @param {string} path The path to set on the control.
         *
         * @returns {void}
         */
        public static setAbsoluteContextPath(control: TemplateControl, path: string): void {
            Control._ContextManager.defineGetter(control, 'absoluteContextPath', path, false, true);
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
         * @param {plat.ui.TemplateControl} control The control whose template is being determined.
         * @param {string} templateUrl? The potential template URL to use to grab the template.
         *
         * @returns {plat.async.Promise<DocumentFragment>} A promise that resolves to the proper template.
         */
        public static determineTemplate(control: TemplateControl, templateUrl?: string): async.Promise<DocumentFragment> {
            const templateCache = TemplateControl._templateCache;
            const dom = control.dom;
            const Promise = TemplateControl._Promise;

            if (!isNull(templateUrl)) {
                // do nothing
            } else if (!isNull(control.templateUrl)) {
                templateUrl = control.templateUrl;
            } else if (!isNull(control.templateString)) {
                const controlType = control.type;

                return templateCache.read(controlType).catch((template: any): async.Promise<DocumentFragment> => {
                    if (isNull(template)) {
                        template = control.templateString;
                    }

                    return templateCache.put(controlType, template);
                });
            } else {
                return <any>Promise.reject(null);
            }

            return dom.getTemplate(templateUrl);
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
         * @param {plat.ui.TemplateControl} control The control to be detached.
         *
         * @returns {void}
         */
        public static detach(control: TemplateControl): void {
            if (isNull(control) || isNull(control.controls)) {
                return;
            }

            const controls = control.controls.slice(0);
            const length = controls.length;

            for (let i = 0; i < length; i += 1) {
                Control.dispose(controls[i]);
            }

            Control.removeEventListeners(control);
            TemplateControl.removeElement(control);

            TemplateControl._ResourcesFactory.dispose(control, true);

            deleteProperty(TemplateControl.__resourceCache, control.uid);

            Control._ContextManager.dispose(control);
            events.EventManager.dispose(control.uid);

            TemplateControl._managerCache.remove(control.uid);
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
         * @returns {plat.ui.TemplateControl} The new {@link plat.ui.TemplateControl|TemplateControl} instance.
         */
        public static getInstance(): TemplateControl {
            return new TemplateControl();
        }

        /**
         * @name contextChanged
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         *
         * @description
         * This event is fired when an {@link plat.ui.TemplateControl|TemplateControl's} context property
         * is changed by an ancestor control.
         *
         * @param {any} newValue? The new value of the context.
         * @param {any} oldValue The old value of the context.
         *
         * @returns {void}
         */
        public contextChanged(newValue: any, oldValue: any): void { }

        /**
         * @name setTemplate
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
         *
         * @description
         * A method called for {@link plat.ui.TemplateControl|TemplateControls} to set their template.
         * During this method a control should ready its template for compilation. Whatever is in the control's
         * element (or elementNodes if replaceWith is implemented) after this method's execution will be compiled
         * and appear on the DOM.
         *
         * @returns {void}
         */
        public setTemplate(): void { }

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
         * @param {IObject<any>} resources? An optional resources object to extend,
         * if no resources object is passed in a new one will be created.
         *
         * @returns {IObject<any>} The context object containing the values of the associated resources.
         */
        public getResources(aliases: string[], resources?: IObject<any>): IObject<any> {
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
         * @returns {{ resource: plat.ui.IResource; control: plat.ui.TemplateControl; }} An object consisting of the
         * found resource along with its corresponding control.
         */
        public findResource(alias: string): { resource: IResource; control: TemplateControl } {
            return TemplateControl.findResource(this, alias);
        }

        /**
         * @name evaluateExpression
         * @memberof plat.ui.TemplateControl
         * @kind function
         * @access public
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
        public evaluateExpression(expression: string | expressions.IParsedExpression, context?: any): any {
            return TemplateControl.evaluateExpression(expression, this, context);
        }
    }

    /**
     * The Type for referencing the '_TemplateControlFactory' injectable as a dependency.
     */
    export function ITemplateControlFactory(
        _ResourcesFactory?: IResourcesFactory,
        _BindableTemplatesFactory?: IBindableTemplatesFactory,
        _managerCache?: storage.Cache<processing.ElementManager>,
        _templateCache?: storage.TemplateCache,
        _parser?: expressions.Parser,
        _http?: async.Http,
        _Promise?: async.IPromise,
        _log?: debug.Log): ITemplateControlFactory {
        (<any>TemplateControl)._ResourcesFactory = _ResourcesFactory;
        (<any>TemplateControl)._BindableTemplatesFactory = _BindableTemplatesFactory;
        (<any>TemplateControl)._managerCache = _managerCache;
        (<any>TemplateControl)._templateCache = _templateCache;
        (<any>TemplateControl)._parser = _parser;
        (<any>TemplateControl)._http = _http;
        (<any>TemplateControl)._Promise = _Promise;
        (<any>TemplateControl)._log = _log;

        return TemplateControl;
    }

    register.injectable(__TemplateControlFactory, ITemplateControlFactory, [
        __ResourcesFactory,
        __BindableTemplatesFactory,
        __ManagerCache,
        __TemplateCache,
        __Parser,
        __Http,
        __Promise,
        __Log,
    ], __FACTORY);

    register.injectable(__TemplateControlInstance, TemplateControl, null, __INSTANCE);

    /**
     * @name ITemplateControlFactory
     * @memberof plat.ui
     * @kind interface
     *
     * @description
     * Creates and manages {@link plat.ui.TemplateControl|TemplateControls}.
     */
    export interface ITemplateControlFactory {
        /**
         * @name evaluateExpression
         * @memberof plat.ui.ITemplateControlFactory
         * @kind function
         * @access public
         * @static
         *
         * @description
         * Evaluates an expression string with a given control and optional control's context and aliases.
         *
         * @param {plat.expressions.IParsedExpression} expression A parsed expression object created using the
         * plat.expressions.Parser injectable.
         * @param {plat.ui.TemplateControl} control? The control used for evaluation context.
         * @param {IObject<any>} aliases? An optional alias object containing resource alias values
         *
         * @returns {any} The evaluated object.
         */
        evaluateExpression(expression: string | expressions.IParsedExpression, control?: TemplateControl, aliases?: IObject<any>): any;

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
         * @param {plat.ui.TemplateControl} control The control used as the starting point for finding resources.
         * @param {Array<string>} aliases An array of aliases to search for.
         * @param {IObject<any>} resources? An optional resources object to extend,
         * if no resources object is passed in a new one will be created.
         *
         * @returns {IObject<any>} An object representing a set of resources.
         */
        getResources(control: TemplateControl, aliases: string[], resources?: IObject<any>): IObject<any>;

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
         * @param {plat.ui.TemplateControl} control The control on which to start searching for the resource alias.
         * @param {string} alias The alias to search for.
         *
         * @returns {{ resource: plat.ui.IResource; control: plat.ui.TemplateControl; }} An object consisting of the
         * found resource along with its corresponding control.
         */
        findResource(control: TemplateControl, alias: string): { resource: IResource; control: TemplateControl };

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
         * @param {plat.ui.TemplateControl} control A control to dispose.
         *
         * @returns {void}
         */
        dispose(control: TemplateControl): void;

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
         * @param {plat.ui.TemplateControl} control The control serving as the root control to load.
         *
         * @returns {void}
         */
        loadControl(control: TemplateControl): void;

        /**
         * @name contextChanged
         * @memberof plat.ui.ITemplateControlFactory
         * @kind function
         * @access public
         * @static
         *
         * @description
         * Notifies a control that its context has been changed by
         * calling the `control.contextChanged` method if it exists.
         *
         * @param {plat.ui.TemplateControl} control The control whose context changed.
         * @param {any} newValue The new value of the control's context.
         * @param {any} oldValue The old value of the control's context.
         *
         * @returns {void}
         */
        contextChanged(control: TemplateControl, newValue: any, oldValue: any): void;

        /**
         * @name setContextResources
         * @memberof plat.ui.ITemplateControlFactory
         * @kind function
         * @access public
         * @static
         *
         * @description
         * Sets the `context` resource value on a {@link plat.ui.TemplateControl|TemplateControl}. If the control specifies
         * hasOwnContext as true, the `rootContext` resource value will be set.
         *
         * @param {plat.ui.TemplateControl} control The control whose context resources will be set.
         *
         * @returns {void}
         */
        setContextResources(control: TemplateControl): void;

        /**
         * @name removeElement
         * @memberof plat.ui.ITemplateControlFactory
         * @kind function
         * @access public
         * @static
         *
         * @description
         * Completely removes a control's element from its parentNode.
         *
         * @param {plat.ui.TemplateControl} control The control whose element should be removed.
         *
         * @returns {void}
         */
        removeElement(control: TemplateControl): void;

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
         * @param {plat.ui.TemplateControl} control The control on which to set the absoluteContextPath.
         * @param {string} path The path to set on the control.
         *
         * @returns {void}
         */
        setAbsoluteContextPath(control: TemplateControl, path: string): void;

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
         * @param {plat.ui.TemplateControl} control The control whose template is being determined.
         * @param {string} templateUrl? The potential template URL to use to grab the template.
         *
         * @returns {plat.async.Promise<DocumentFragment>} A promise that resolves to the proper template.
         */
        determineTemplate(control: TemplateControl, templateUrl?: string): async.Promise<DocumentFragment>;

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
         * @param {plat.ui.TemplateControl} control The control to be detached.
         *
         * @returns {void}
         */
        detach(control: TemplateControl): void;

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
         * @returns {plat.ui.TemplateControl} The new {@link plat.ui.TemplateControl|TemplateControl} instance.
         */
        getInstance(): TemplateControl;
    }
}
