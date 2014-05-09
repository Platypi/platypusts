module plat.ui {
    /**
     * The class which provides a way for ITemplateControls to bind a template 
     * to a context. Useful for narrowing context without needing another 
     * ITemplateControl. In addition, this object provides a performance increase because 
     * it will only compile the template once. This object is also useful when a 
     * ITemplateControl expects multiple configuration templates in its innerHTML. It can 
     * separate those templates and reuse them accordingly.
     */
    export class BindableTemplates implements IBindableTemplates {
        /**
         * Creates a new instance of BindableTemplates and returns it. If a BindableTemplates is 
         * passed in, it will use the properties on the original BindableTemplates.
         * 
         * @static
         * @param control The ITemplateControl containing the new BindableTemplate object, used for data context 
         * inheritance for templates.
         * @param originalBindableTemplates An optional IBindableTemplates object to copy.
         * @return {BindableTemplates} The newly instantiated BindableTemplates object.
         */
        static create(control: ITemplateControl, original?: IBindableTemplates): IBindableTemplates;
        static create(control: ITemplateControl, original?: BindableTemplates): IBindableTemplates {
            var bindableTemplates = new BindableTemplates();
            bindableTemplates.control = control;

            if (!isNull(original)) {
                bindableTemplates.templates = original.templates;
                bindableTemplates._cache = original._cache;
            }

            return bindableTemplates;
        }

        /**
         * Clears the memory being held by control's bindableTemplates.
         * 
         * @static
         * @param control The control whose bindableTemplates will be disposed.
         */
        static dispose(control: ITemplateControl) {
            control.bindableTemplates.dispose();
        }

        /**
         * The control using this BindableTemplates instance.
         */
        control: ITemplateControl;

        /**
         * Stores the compiled templates for this object, ready to be bound to a data context. 
         * All created templates are DocumentFragments, allowing a ITemplateControl to
         * easily insert the template into the DOM (without iterating over childNodes).
         */
        templates = {};

        /**
         * A keyed cache of IElementManagers that represent the roots of compiled templates 
         * created by this instance of BindableTemplates.
         */
        _cache: IObject<processing.IElementManager> = {};

        $ResourcesStatic: IResourcesStatic = acquire('$ResourcesStatic');
        $TemplateControlStatic: ITemplateControlStatic = acquire('$TemplateControlStatic');
        $PromiseStatic: async.IPromiseStatic = acquire('$PromiseStatic');
        $ManagerCacheStatic: storage.ICache<processing.IElementManager> = acquire('$ManagerCacheStatic');
        $dom: IDom = acquire('$dom');
        $ExceptionStatic: IExceptionStatic = acquire('$ExceptionStatic');
        $document: Document = acquire('$document');
        $ElementManagerStatic: processing.IElementManagerStatic = acquire('$ElementManagerStatic');

        private __compiledControls: Array<ITemplateControl> = [];

        /**
         * Provides a way for ITemplateControls to bind a template to a data context. Useful 
         * for narrowing data context without needing another ITemplateControl. In addition, 
         * this object provides a performance increase because it will only compile the template once.
         * This object is also useful when a ITemplateControl expects multiple configuration
         * templates in its innerHTML. It can separate those templates and reuse them accordingly.
         */
        constructor() { }

        /**
         * Method for linking a new template to a data context and returning a clone of the template, 
         * with all new IControls created if the template contains controls. It is not necessary
         * to specify a data context.
         * 
         * @param key The key used to retrieve the template.
         * @param callback The callback associated with binding the template to the specified data
         * context. 
         * @param relativeIdentifier The identifier string relative to this control's context
         * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the 
         * most efficient way of specifying context, else the framework has to search for the 
         * object.
         * @param resources An object used as the resources for any top-level 
         * controls created in the template.
         * @return {DocumentFragment} A clone of the template, fully reconstructed and ready to put
         * in the DOM.
         */
        bind(key: string, callback: IBindableTemplateCallback, relativeIdentifier?: string,
            resources?: IObject<IResource>): DocumentFragment;
        /**
         * Method for linking a new template to a data context and returning a clone of the template, 
         * with all new IControls created if the template contains controls. It is not necessary
         * to specify a data context.
         * 
         * @param key The key used to retrieve the template.
         * @param callback The callback associated with binding the template to the specified data
         * context. 
         * @param relativeIdentifier The identifier number relative to this control's context. Only 
         * necessary when context is an array.
         * @param resources An object used as the resources for any top-level 
         * controls created in the template.
         * @return {DocumentFragment} A clone of the template, fully reconstructed and ready to put
         * in the DOM.
         */
        bind(key: string, callback: IBindableTemplateCallback, relativeIdentifier?: number,
            resources?: IObject<IResource>): DocumentFragment;
        bind(key: any, callback: IBindableTemplateCallback, relativeIdentifier?: any, resources?: IObject<IResource>): DocumentFragment {
            var template: any = this.templates[key],
                control: ITemplateControl = this.control,
                nodeMap: processing.INodeMap,
                templatePromise;

            if (isNull(template)) {
                this.$ExceptionStatic.fatal('Cannot bind template, no template stored with key: ' + key,
                    this.$ExceptionStatic.TEMPLATE);
                return;
            }

            if (!(isNull(relativeIdentifier) || isNumber(relativeIdentifier) || isString(relativeIdentifier))) {
                this.$ExceptionStatic.warn('Cannot bind template with relativeIdentifier: ' +
                    relativeIdentifier +
                    '. Identifier must be either a string or number', this.$ExceptionStatic.BIND);
                return;
            }

            if (isFunction(template.then)) {
                template.then((result: DocumentFragment) => {
                    this._bindTemplate(key, <DocumentFragment>result.cloneNode(true), relativeIdentifier, resources, callback);
                }).catch((error) => {
                    postpone(() => {
                        this.$ExceptionStatic.fatal(error, this.$ExceptionStatic.COMPILE);
                    });
                });
                return;
            }
            this._bindTemplate(key, <DocumentFragment>template.cloneNode(true), relativeIdentifier, resources, callback);
        }

        /**
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         * 
         * @param key The key used to store the template.
         * @param template An HTMLElement represending the template DOM.
         */
        add(key: string, template: HTMLElement): void;
        /**
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         * 
         * @param key The key used to store the template.
         * @param template A Node array represending the template DOM.
         */
        add(key: string, template: Array<Node>): void;
        /**
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         * 
         * @param key The key used to store the template.
         * @param template A NodeList represending the template DOM.
         */
        add(key: string, template: NodeList): void;
        /**
         * Adds a template to this object. The template will be stored with the key.
         * 
         * @param key The key used to store the template.
         * @param template A DocumentFragment represending the template DOM.
         */
        add(key: string, template: DocumentFragment): void;
        /**
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         * 
         * @param key The key used to store the template.
         * @param template A Node represending the template DOM.
         */
        add(key: string, template: Node): void;
        add(key: string, template: any) {
            if (isNull(template)) {
                return;
            }

            if (template.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                this.templates[key] = template;
                this._compile(key, template);
                return;
            }

            var fragment = this.$document.createDocumentFragment(),
                nodes;

            if (isNode(template)) {
                fragment.appendChild(template);
            } else if (isArrayLike(template)) {
                this.$dom.appendChildren(template, fragment);
            } else {
                return;
            }

            this.templates[key] = fragment;

            this._compile(key, fragment);
        }

        /**
         * Clears the memory being held by this BindableTemplates instance.
         */
        dispose() {
            var dispose = this.$TemplateControlStatic.dispose,
                compiledControls = this.__compiledControls,
                length = compiledControls.length;

            for (var i = 0; i < length; ++i) {
                dispose(compiledControls[i]);
            }

            this.__compiledControls = [];
            this.control = null;
            this._cache = {};
            this.templates = {};
        }

        /**
         * Creates the template's bound control and INodeMap and initiates 
         * the binding of the INodeMap for a cloned template.
         */
        _bindTemplate(key: string, template: DocumentFragment, context: string,
            resources: IObject<IResource>, callback: IBindableTemplateCallback) {
            var control = this._createBoundControl(key, template, context, resources),
                nodeMap = this._createNodeMap(control, template, context);

            this._bindNodeMap(nodeMap, key).then(() => {
                control.startNode = template.insertBefore(this.$document.createComment(control.type + ': start node'),
                    template.firstChild);
                control.endNode = template.insertBefore(this.$document.createComment(control.type + ': end node'),
                    null);

                callback.call(this.control, template);
            }).catch((error) => {
                postpone(() => {
                    this.$ExceptionStatic.fatal(error, this.$ExceptionStatic.BIND);
                });
            });
        }

        /**
         * Clones the compiled IElementManager using the newly created 
         * INodeMap and binds and loads this control's IElementManager.
         */
        _bindNodeMap(nodeMap: processing.INodeMap, key: string) {
            var manager = this._cache[key],
                child = nodeMap.uiControlNode.control,
                template = nodeMap.element;

            this.control.controls.push(child);

            manager.clone(template, this.$ManagerCacheStatic.read(this.control.uid), nodeMap);
            return (this.$ManagerCacheStatic.read(child.uid)).bindAndLoad();
        }
        
        /**
         * Creates the template's compiled, bound control and INodeMap and initiates 
         * the compilation of the template.
         */
        _compile(key: string, template: DocumentFragment) {
            var control = this._createBoundControl(key, template),
                nodeMap = this._createNodeMap(control, template);

            this.__compiledControls.push(control);

            this._compileNodeMap(control, nodeMap, key);
        }

        /**
         * Instantiates a new IElementManager for the root of this template and resolves 
         * any asynchronous url templates within the template being compiled.
         */
        _compileNodeMap(control: ITemplateControl, nodeMap: processing.INodeMap, key: string) {
            var manager = this.$ElementManagerStatic.getInstance(),
                promises = [];

            manager.isClone = true;
            manager.initialize(nodeMap, null);
            promises.push(manager.setUiControlTemplate());

            this._cache[key] = manager;

            promises.push(manager.fulfillTemplate());

            this.templates[key] = <any>this.$PromiseStatic.all<any, Error>(promises).then((results) => {
                var element = nodeMap.element,
                    startNode,
                    endNode;

                this.templates[key] = <DocumentFragment>nodeMap.element.cloneNode(true);

                startNode = control.startNode = this.$document.createComment(control.type + ': start node');
                endNode = control.endNode = this.$document.createComment(control.type + ': end node');
                element.insertBefore(startNode, element.firstChild);
                element.insertBefore(endNode, null);

                return this.templates[key];
            }).catch((error) => {
                postpone(() => {
                    this.$ExceptionStatic.fatal(error, this.$ExceptionStatic.COMPILE);
                });
            });

            return this.templates[key];
        }

        /**
         * Creates an INodeMap for either a template being compiled or a template being bound.
         */
        _createNodeMap(uiControl: ITemplateControl, template: Node,
            childContext?: string): processing.INodeMap {
            return {
                element: <HTMLElement>template,
                attributes: {},
                nodes: [],
                childContext: childContext,
                uiControlNode: {
                    control: uiControl,
                    nodeName: uiControl.type,
                    expressions: [],
                    injector: null
                }
            };
        }

        /**
         * Creates a bound control for either a template being compiled or a template being bound.
         */
        _createBoundControl(key: string, template: DocumentFragment,
            relativeIdentifier?: string, resources?: IObject<IResource>) {
            var $TemplateControlStatic = this.$TemplateControlStatic,
                control = new $TemplateControlStatic(),
                parent = this.control,
                hasRelativeIdentifier = !isEmpty(relativeIdentifier),
                absoluteContextPath: string;

            if (hasRelativeIdentifier) {
                absoluteContextPath = parent.absoluteContextPath + '.' + relativeIdentifier;
            } else {
                absoluteContextPath = parent.absoluteContextPath;
            }

            $TemplateControlStatic.setAbsoluteContextPath(control, absoluteContextPath);

            var _resources = this.$ResourcesStatic.getInstance();

            _resources.initialize(control, resources);

            control.resources = _resources;
            this.$ResourcesStatic.addControlResources(control);

            control.parent = parent;
            control.controls = [];
            control.element = <HTMLElement>template;
            control.type = this.control.type + '-@' + key;

            return control;
        }
    }

    /**
     * The Type for referencing the '$BindableTemplatesStatic' injectable as a dependency.
     */
    export function BindableTemplatesStatic($TemplateControlStatic) {
        return BindableTemplates;
    }

    register.injectable('$BindableTemplatesStatic', BindableTemplatesStatic, null, register.injectableType.STATIC);

    /**
     * Describes an object which provides a way for ITemplateControls to bind a template 
     * to a data context. Useful for narrowing data context without needing another 
     * ITemplateControl. In addition, this object provides a performance increase because 
     * it will only compile the template once. This object is also useful when a 
     * ITemplateControl expects multiple configuration templates in its innerHTML. It can 
     * separate those templates and reuse them accordingly.
     */
    export interface IBindableTemplates {
        /**
         * The control containing the IBindableTemplate object.
         */
        control: ITemplateControl;

        /**
         * Stores the compiled templates for this object, ready to be bound to a data context. 
         * All created templates are DocumentFragments, allowing a ITemplateControl to
         * easily insert the template into the DOM (without iterating over childNodes). This object
         * may contain a template promise.
         */
        templates: {};

        /**
         * Method for linking a new template to a data context and returning a clone of the template, 
         * with all new IControls created if the template contains controls. It is not necessary
         * to specify a data context.
         * 
         * @param key The key used to retrieve the template.
         * @param callback The callback associated with binding the template to the specified data
         * context. 
         * @param relativeIdentifier The identifier string relative to this control's context
         * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the 
         * most efficient way of specifying context, else the framework has to search for the 
         * object.
         * @param resources An object used as the resources for any top-level 
         * controls created in the template.
         * @return {DocumentFragment} A clone of the template, fully reconstructed and ready to put
         * in the DOM.
         */
        bind(key: string, callback: IBindableTemplateCallback, relativeIdentifier?: string,
            resources?: IObject<IResource>): DocumentFragment;
        /**
         * Method for linking a new template to a data context and returning a clone of the template, 
         * with all new IControls created if the template contains controls. It is not necessary
         * to specify a data context.
         * 
         * @param key The key used to retrieve the template.
         * @param callback The callback associated with binding the template to the specified data
         * context. 
         * @param relativeIdentifier The identifier number relative to this control's context. Only 
         * necessary when context is an array.
         * @param resources An object used as the resources for any top-level 
         * controls created in the template.
         * @return {DocumentFragment} A clone of the template, fully reconstructed and ready to put
         * in the DOM.
         */
        bind(key: string, callback: IBindableTemplateCallback, relativeIdentifier?: number,
            resources?: IObject<IResource>): DocumentFragment;

        /**
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         * 
         * @param key The key used to store the template.
         * @param template An HTMLElement represending the template DOM.
         */
        add(key: string, template: HTMLElement): void;
        /**
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         * 
         * @param key The key used to store the template.
         * @param template A Node array represending the template DOM.
         */
        add(key: string, template: Array<Node>): void;
        /**
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         * 
         * @param key The key used to store the template.
         * @param template A NodeList represending the template DOM.
         */
        add(key: string, template: NodeList): void;
        /**
         * Adds a template to this object. The template will be stored with the key.
         * 
         * @param key The key used to store the template.
         * @param template A DocumentFragment represending the template DOM.
         */
        add(key: string, template: DocumentFragment): void;
        /**
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         * 
         * @param key The key used to store the template.
         * @param template A Node represending the template DOM.
         */
        add(key: string, template: Node): void;

        /**
         * Clears the memory being held by this BindableTemplates instance.
         */
        dispose(): void;
    }

    /**
     * Describes a function used as the callback associated with binding a specified 
     * template to a specified data context.
     * 
     * @param clone The bound clone of the specified template.
     */
    export interface IBindableTemplateCallback {
        /**
         * Receives a DocumentFragment clone ready to inject into DOM.
         * 
         * @param clone The bound clone of the specified template.
         */
        (clone: DocumentFragment): void;
    }

    /**
     * The external interface for the '$BindableTemplatesStatic' injectable.
     */
    export interface IBindableTemplatesStatic {
        /**
         * Creates a new instance of BindableTemplates and returns it. If a BindableTemplates is
         * passed in, it will use the properties on the original BindableTemplates.
         *
         * @static
         * @param control The ITemplateControl containing the new BindableTemplate object, used for data context
         * inheritance for templates.
         * @param originalBindableTemplates An optional IBindableTemplates object to copy.
         * @return {BindableTemplates} The newly instantiated BindableTemplates object.
         */
        create(control: ITemplateControl, original?: IBindableTemplates): IBindableTemplates;

        /**
         * Clears the memory being held by control's bindableTemplates.
         * 
         * @static
         * @param control The control whose bindableTemplates will be disposed.
         */
        dispose(control: ITemplateControl): void;
    }
}
