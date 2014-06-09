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
        static dispose(control: ITemplateControl): void {
            if (isNull(control)) {
                return;
            }
            var instance = control.bindableTemplates;

            if (isNull(instance) || !isFunction(instance.dispose)) {
                return;
            }

            instance.dispose();
        }

        $ResourcesFactory: IResourcesFactory = acquire(__ResourcesFactory);
        $TemplateControlFactory: ITemplateControlFactory = acquire(__TemplateControlFactory);
        $Promise: async.IPromise = acquire(__Promise);
        $ManagerCache: storage.ICache<processing.IElementManager> = acquire(__ManagerCache);
        $Document: Document = acquire(__Document);
        $ElementManagerFactory: processing.IElementManagerFactory = acquire(__ElementManagerFactory);

        control: ITemplateControl;
        templates: IObject<async.IThenable<DocumentFragment>> = {};

        /**
         * A keyed cache of IElementManagers that represent the roots of compiled templates 
         * created by this instance of BindableTemplates.
         */
        _cache: IObject<processing.IElementManager> = {};

        private __compiledControls: Array<ITemplateControl> = [];

        bind(key: string, relativeIdentifier?: string, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        bind(key: string, relativeIdentifier?: number, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        bind(key: any, relativeIdentifier?: any, resources?: IObject<IResource>): async.IThenable<DocumentFragment> {
            var templatePromise = this.templates[key],
                control: ITemplateControl = this.control,
                nodeMap: processing.INodeMap,
                $exception: IExceptionStatic;

            if (isNull(templatePromise)) {
                $exception = acquire(__ExceptionStatic);
                $exception.fatal('Cannot bind template, no template stored with key: ' + key,
                    $exception.TEMPLATE);
                return;
            }

            if (!(isNull(relativeIdentifier) || isNumber(relativeIdentifier) || isString(relativeIdentifier))) {
                $exception = acquire(__ExceptionStatic);
                $exception.warn('Cannot bind template with relativeIdentifier: ' +
                    relativeIdentifier +
                    '. Identifier must be either a string or number', $exception.BIND);
                return;
            }

            return templatePromise.then((result: DocumentFragment) => {
                return this._bindTemplate(key, <DocumentFragment>result.cloneNode(true), relativeIdentifier, resources);
            }, (error: any) => {
                postpone(() => {
                    $exception = acquire(__ExceptionStatic);
                    $exception.fatal(error, $exception.BIND);
                });

                return <DocumentFragment>null;
            });
        }

        add(key: string, template: Element): void;
        add(key: string, template: Array<Node>): void;
        add(key: string, template: NodeList): void;
        add(key: string, template: DocumentFragment): void;
        add(key: string, template: Node): void;
        add(key: string, template: any) {
            if (isNull(template)) {
                return;
            }

            if (isDocumentFragment(template)) {
                this._compile(key, template);
                return;
            }

            var fragment = this.$Document.createDocumentFragment();

            if (isNode(template)) {
                fragment.appendChild(template);
            } else if (isArrayLike(template)) {
                appendChildren(template, fragment);
            } else {
                return;
            }

            this._compile(key, fragment);
        }

        dispose(): void {
            var dispose = this.$TemplateControlFactory.dispose,
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
            resources: IObject<IResource>): async.IThenable<DocumentFragment> {
            var control = this._createBoundControl(key, template, context, resources),
                nodeMap = this._createNodeMap(control, template, context);

            return this._bindNodeMap(nodeMap, key).then(() => {
                control.startNode = template.insertBefore(this.$Document.createComment(control.type + ': start node'),
                    template.firstChild);
                control.endNode = template.insertBefore(this.$Document.createComment(control.type + ': end node'),
                    null);

                return template;
            }, (error: any) => {
                postpone(() => {
                    var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                    $exception.fatal(error, $exception.COMPILE);
                });

                return <DocumentFragment>null;
            });
        }

        /**
         * Clones the compiled IElementManager using the newly created 
         * INodeMap and binds and loads this control's IElementManager.
         */
        _bindNodeMap(nodeMap: processing.INodeMap, key: string): async.IThenable<void> {
            var manager = this._cache[key],
                child = nodeMap.uiControlNode.control,
                template = nodeMap.element,
                $managerCache = this.$ManagerCache;

            this.control.controls.push(child);

            manager.clone(template, $managerCache.read(this.control.uid), nodeMap);
            return $managerCache.read(child.uid).bindAndLoad();
        }
        
        /**
         * Creates the template's compiled, bound control and INodeMap and initiates 
         * the compilation of the template.
         */
        _compile(key: string, template: DocumentFragment): void {
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
            var manager = this.$ElementManagerFactory.getInstance(),
                promises: Array<async.IThenable<void>> = [];

            manager.isClone = true;
            manager.initialize(nodeMap, null);
            manager.setUiControlTemplate();

            this._cache[key] = manager;

            promises.push(manager.fulfillTemplate());

            this.templates[key] = this.$Promise.all(promises).then(() => {
                var element = nodeMap.element,
                    startNode: Comment,
                    endNode: Comment;

                var clone = <DocumentFragment>nodeMap.element.cloneNode(true);

                startNode = control.startNode = this.$Document.createComment(control.type + ': start node');
                endNode = control.endNode = this.$Document.createComment(control.type + ': end node');
                element.insertBefore(startNode, element.firstChild);
                element.insertBefore(endNode, null);

                return clone;
            });
        }

        /**
         * Creates an INodeMap for either a template being compiled or a template being bound.
         */
        _createNodeMap(uiControl: ITemplateControl, template: Node, childContext?: string): processing.INodeMap {
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
            relativeIdentifier?: string, resources?: IObject<IResource>): ITemplateControl {
            var $TemplateControlFactory = this.$TemplateControlFactory,
                control = $TemplateControlFactory.getInstance(),
                $ResourcesFactory = this.$ResourcesFactory,
                parent = this.control,
                hasRelativeIdentifier = !isEmpty(relativeIdentifier),
                absoluteContextPath: string = hasRelativeIdentifier ?
                parent.absoluteContextPath + '.' + relativeIdentifier :
                absoluteContextPath = parent.absoluteContextPath;

            $TemplateControlFactory.setAbsoluteContextPath(control, absoluteContextPath);

            var _resources = $ResourcesFactory.getInstance();

            _resources.initialize(control, resources);

            control.resources = _resources;
            $ResourcesFactory.addControlResources(control);

            control.parent = parent;
            control.controls = [];
            control.element = <HTMLElement>template;
            control.type = this.control.type + '-@' + key;

            return control;
        }
    }

    /**
     * The Type for referencing the '$BindableTemplatesFactory' injectable as a dependency.
     */
    export function IBindableTemplatesFactory(): IBindableTemplatesFactory {
        return BindableTemplates;
    }

    register.injectable(__BindableTemplatesFactory, IBindableTemplatesFactory, null, register.FACTORY);

    /**
     * The external interface for the '$BindableTemplatesFactory' injectable.
     */
    export interface IBindableTemplatesFactory {
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
         * @param relativeIdentifier The identifier string relative to this control's context
         * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the 
         * most efficient way of specifying context, else the framework has to search for the 
         * object.
         * @param resources An object used as the resources for any top-level 
         * controls created in the template.
         */
        bind(key: string, relativeIdentifier?: string,
            resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * Method for linking a new template to a data context and returning a clone of the template, 
         * with all new IControls created if the template contains controls. It is not necessary
         * to specify a data context.
         * 
         * @param key The key used to retrieve the template.
         * @param relativeIdentifier The identifier number relative to this control's context. Only 
         * necessary when context is an array.
         * @param resources An object used as the resources for any top-level 
         * controls created in the template.
         */
        bind(key: string, relativeIdentifier?: number,
            resources?: IObject<IResource>): async.IThenable<DocumentFragment>;

        /**
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         * 
         * @param key The key used to store the template.
         * @param template An Element represending the template DOM.
         */
        add(key: string, template: Element): void;
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
}
