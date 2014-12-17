module plat.ui {
    /**
     * @name BindableTemplates
     * @memberof plat.ui
     * @kind class
     * 
     * @implements {plat.ui.IBindableTemplates}
     * 
     * @description
     * The class which provides a way for {@link plat.ui.ITemplateControl|ITemplateControls} to bind a template 
     * to a context. Useful for narrowing context without needing another 
     * {@link plat.ui.ITemplateControl|ITemplateControl}. In addition, this object provides a performance increase because 
     * it will only compile the template once. This object is also useful when a 
     * {@link plat.ui.ITemplateControl|ITemplateControls} expects multiple configuration templates in its innerHTML. It can 
     * separate those templates and reuse them accordingly.
     */
    export class BindableTemplates implements IBindableTemplates {
        /**
         * @name create
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @static
         * @variation 0
         * 
         * @description
         * Creates a new instance of BindableTemplates and returns it. If a BindableTemplates is 
         * passed in, it will use the properties on the original BindableTemplates.
         * 
         * @param {plat.ui.ITemplateControl} control The {@link plat.ui.ITemplateControl|ITemplateControl} 
         * containing the new {@link plat.ui.BindableTemplates|BindableTemplates} object, used for data 
         * context inheritance for templates.
         * @param {plat.ui.IBindableTemplates} original? An optional {@link plat.ui.IBindableTemplates|IBindableTemplates} 
         * object to copy.
         * 
         * @returns {plat.ui.IBindableTemplates} The newly instantiated {@link plat.ui.IBindableTemplates|IBindableTemplates} object.
         */
        static create(control: ITemplateControl, original?: IBindableTemplates): IBindableTemplates;
        /**
         * @name create
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @static
         * @variation 1
         * 
         * @description
         * Creates a new instance of BindableTemplates and returns it. If a BindableTemplates is 
         * passed in, it will use the properties on the original BindableTemplates.
         * 
         * @param {plat.ui.ITemplateControl} control The {@link plat.ui.ITemplateControl|ITemplateControl} 
         * containing the new {@link plat.ui.BindableTemplates|BindableTemplates} object, used for data 
         * context inheritance for templates.
         * @param {plat.ui.BindableTemplates} original? An optional {@link plat.ui.BindableTemplates|BindableTemplates} 
         * object to copy.
         * 
         * @returns {plat.ui.IBindableTemplates} The newly instantiated {@link plat.ui.IBindableTemplates|IBindableTemplates} object.
         */
        static create(control: ITemplateControl, original?: BindableTemplates): IBindableTemplates {
            var bindableTemplates = new BindableTemplates();
            bindableTemplates.control = control;

            if (!isNull(original)) {
                bindableTemplates.templates = original.templates;
                bindableTemplates.cache = original.cache;
            }

            return bindableTemplates;
        }

        /**
         * @name dispose
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Clears the memory being held by control's bindableTemplates.
         * 
         * @static
         * @param {plat.ui.ITemplateControl} control The control whose bindableTemplates will be disposed.
         * 
         * @returns {void}
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

        /**
         * @name isBoundControl
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Determines whether or not a control was created using bindableTemplates.
         * 
         * @static
         * @param {plat.ui.ITemplateControl} control The potential bound control.
         * 
         * @returns {boolean} Whether or not the control is a bound control.
         */
        static isBoundControl(control: ITemplateControl): boolean {
            if (isNull(control)) {
                return false;
            }

            var parent = control.parent;

            if (isNull(parent)) {
                return false;
            }

            return control.type.indexOf(parent.type + __BOUND_PREFIX) === 0;
        }

        /**
         * @name $ResourcesFactory
         * @memberof plat.ui.BindableTemplates
         * @kind property
         * @access public
         * 
         * @type {plat.ui.IResourcesFactory}
         * 
         * @description
         * Reference to the {@link plat.ui.IResourcesFactory|IResourcesFactory} injectable.
         */
        $ResourcesFactory: IResourcesFactory = acquire(__ResourcesFactory);
        /**
         * @name $TemplateControlFactory
         * @memberof plat.ui.BindableTemplates
         * @kind property
         * @access public
         * 
         * @type {plat.ui.ITemplateControlFactory}
         * 
         * @description
         * Reference to the {@link plat.ui.ITemplateControlFactory|ITemplateControlFactory} injectable.
         */
        $TemplateControlFactory: ITemplateControlFactory = acquire(__TemplateControlFactory);
        /**
         * @name $Promise
         * @memberof plat.ui.BindableTemplates
         * @kind property
         * @access public
         * 
         * @type {plat.async.IPromise}
         * 
         * @description
         * Reference to the {@link plat.async.IPromise|IPromise} injectable.
         */
        $Promise: async.IPromise = acquire(__Promise);
        /**
         * @name $ManagerCache
         * @memberof plat.ui.BindableTemplates
         * @kind property
         * @access public
         * 
         * @type {plat.storage.ICache<processing.IElementManager>}
         * 
         * @description
         * Reference to a cache injectable that stores {@link plat.processing.IElementManager|IElementManagers}.
         */
        $ManagerCache: storage.ICache<processing.IElementManager> = acquire(__ManagerCache);
        /**
         * @name $Document
         * @memberof plat.ui.BindableTemplates
         * @kind property
         * @access public
         * 
         * @type {Document}
         * 
         * @description
         * Reference to the Document injectable.
         */
        $Document: Document = acquire(__Document);
        /**
         * @name $ElementManagerFactory
         * @memberof plat.ui.BindableTemplates
         * @kind property
         * @access public
         * 
         * @type {plat.processing.IElementManagerFactory}
         * 
         * @description
         * Reference to the {@link plat.processing.IElementManagerFactory|IElementManagerFactory} injectable.
         */
        $ElementManagerFactory: processing.IElementManagerFactory = acquire(__ElementManagerFactory);

        /**
         * @name control
         * @memberof plat.ui.BindableTemplates
         * @kind property
         * @access public
         * 
         * @type {plat.ui.ITemplateControl}
         * 
         * @description
         * The control containing this {@link plat.ui.BindableTemplates|BindableTemplates} object.
         */
        control: ITemplateControl;
        /**
         * @name templates
         * @memberof plat.ui.BindableTemplates
         * @kind property
         * @access public
         * 
         * @type {plat.IObject<plat.async.IThenable<DocumentFragment>>}
         * 
         * @description
         * Stores promises that resolve to all the compiled templates for this object, ready to be bound to a data context. 
         * All created templates are DocumentFragments, allowing an {@link plat.ui.ITemplateControl|ITemplateControl} to
         * easily insert the template into the DOM (without iterating over childNodes).
         */
        templates: IObject<async.IThenable<DocumentFragment>> = {};

        /**
         * @name cache
         * @memberof plat.ui.BindableTemplates
         * @kind property
         * @access public
         * 
         * @type {plat.IObject<plat.processing.IElementManager>}
         * 
         * @description
         * A keyed cache of {@link plat.processing.IElementManager|IElementManagers} that represent the roots of compiled templates 
         * created by this instance.
         */
        cache: IObject<processing.IElementManager> = {};

        /**
         * @name __compiledControls
         * @memberof plat.ui.BindableTemplates
         * @kind property
         * @access private
         * 
         * @type {Array<plat.ui.ITemplateControl>}
         * 
         * @description
         * A collection of all the controls created while compiling an added template. Useful during disposal.
         */
        private __compiledControls: Array<ITemplateControl> = [];

        /**
         * @name bind
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Method for linking a new template to a data context and returning a clone of the template, 
         * with all new {@link plat.IControl|IControls} created if the template contains controls. It is not necessary
         * to specify a data context.
         * 
         * @param {string} key The key used to retrieve the template.
         * @param {string} relativeIdentifier? The identifier string relative to this control's context
         * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the 
         * most efficient way of specifying context, else the framework has to search for the 
         * object.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level 
         * controls created in the template.
         * 
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves when the template is bound and 
         * ready to return.
         */
        bind(key: string, relativeIdentifier?: string, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @name bind
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Method for linking a new template to a data context and returning a clone of the template, 
         * with all new {@link plat.IControl|IControls} created if the template contains controls. It is not necessary
         * to specify a data context.
         * 
         * @param {string} key The key used to retrieve the template.
         * @param {number} relativeIdentifier? The identifier number relative to this control's context
         * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level 
         * controls created in the template.
         * 
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves when the template is bound and 
         * ready to return.
         */
        bind(key: string, relativeIdentifier?: number, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        bind(key: any, relativeIdentifier?: any, resources?: IObject<IResource>): async.IThenable<DocumentFragment> {
            var templatePromise = this.templates[key],
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
            }).then(null, (error: any) => {
                    postpone(() => {
                        $exception = acquire(__ExceptionStatic);
                        $exception.fatal(error, $exception.BIND);
                    });

                    return <DocumentFragment>null;
                });
        }

        /**
         * @name add
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         * 
         * @param {string} key The key used to store the template.
         * @param {Element} template An Element representing the DOM template.
         * 
         * @returns {void}
         */
        add(key: string, template: Element): void;
        /**
         * @name add
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         * 
         * @param {string} key The key used to store the template.
         * @param {Array<Node>} template A node Array representing the DOM template.
         * 
         * @returns {void}
         */
        add(key: string, template: Array<Node>): void;
        /**
         * @name add
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         * 
         * @param {string} key The key used to store the template.
         * @param {NodeList} template A NodeList representing the DOM template.
         * 
         * @returns {void}
         */
        add(key: string, template: NodeList): void;
        /**
         * @name add
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @variation 3
         * 
         * @description
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         * 
         * @param {string} key The key used to store the template.
         * @param {DocumentFragment} template A DocumentFragment representing the DOM template.
         * 
         * @returns {void}
         */
        add(key: string, template: DocumentFragment): void;
        /**
         * @name add
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @variation 4
         * 
         * @description
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         * 
         * @param {string} key The key used to store the template.
         * @param {Node} template A Node representing the DOM template.
         * 
         * @returns {void}
         */
        add(key: string, template: Node): void;
        add(key: string, template: any): void {
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

        /**
         * @name dispose
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * 
         * @description
         * Clears the memory being held by this instance.
         * 
         * @returns {void}
         */
        dispose(): void {
            var dispose = this.$TemplateControlFactory.dispose,
                compiledControls = this.__compiledControls,
                length = compiledControls.length;

            for (var i = 0; i < length; ++i) {
                dispose(compiledControls[i]);
            }

            this.__compiledControls = [];
            this.control = null;
            this.cache = {};
            this.templates = {};
        }

        /**
         * @name _bindTemplate
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access protected
         * 
         * @description
         * Creates the template's bound control and {@link plat.processing.INodeMap|INodeMap} and initiates 
         * the binding of the {@link plat.processing.INodeMap|INodeMap} for a cloned template.
         * 
         * @param {string} key The template key.
         * @param {DocumentFragment} template The cached HTML template.
         * @param {string} contextId The relative path from the context used to bind this template.
         * @param {plat.IObject<plat.ui.IResource>} A set of resources to add to the control used to bind this 
         * template.
         * 
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves when the template is bound.
         */
        protected _bindTemplate(key: string, template: DocumentFragment, contextId: string,
            resources: IObject<IResource>): async.IThenable<DocumentFragment> {
            var control = this._createBoundControl(key, template, resources),
                nodeMap = this._createNodeMap(control, template, contextId),
                disposed = false,
                dispose = isFunction(control.dispose) ? control.dispose.bind(control) : noop;

            control.dispose = () => {
                disposed = true;
                dispose();
                control.dispose = dispose;
            };

            return this._bindNodeMap(nodeMap, key).then(() => {
                var $document = this.$Document;
                if (disposed) {
                    return $document.createDocumentFragment();
                }
                control.startNode = template.insertBefore($document.createComment(control.type + __START_NODE),
                    template.firstChild);
                control.endNode = template.insertBefore($document.createComment(control.type + __END_NODE),
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
         * @name _bindNodeMap
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access protected
         * 
         * @description
         * Clones the compiled {@link plat.processing.IElementManager|IElementManager} using the newly created 
         * {@link plat.processing.INodeMap|INodeMap} and binds and loads this control's 
         * {@link plat.processing.IElementManager|IElementManager}.
         * 
         * @param {plat.processing.INodeMap} nodeMap The node map to bind.
         * @param {string} key The template key used to grab the {@link plat.processing.IElementManager|IElementManager}.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves when the control's 
         * {@link plat.processing.IElementManager|IElementManager} is bound and loaded.
         */
        protected _bindNodeMap(nodeMap: processing.INodeMap, key: string): async.IThenable<void> {
            var manager = this.cache[key],
                child = nodeMap.uiControlNode.control,
                template = nodeMap.element,
                $managerCache = this.$ManagerCache;

            this.control.controls.push(child);

            manager.clone(template, $managerCache.read(this.control.uid), nodeMap);
            return $managerCache.read(child.uid).bindAndLoad();
        }

        /**
         * @name _compile
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access protected
         * 
         * @description
         * Creates the template's compiled, bound control and {@link plat.processing.INodeMap|INodeMap} and initiates 
         * the compilation of the template.
         * 
         * @param {string} key The template key.
         * @param {DocumentFragment} template The HTML template being bound.
         * 
         * @returns {void}
         */
        protected _compile(key: string, template: DocumentFragment): void {
            var control = this._createBoundControl(key + __COMPILED, template),
                nodeMap = this._createNodeMap(control, template);

            this.__compiledControls.push(control);

            this._compileNodeMap(control, nodeMap, key);
        }

        /**
         * @name _compileNodeMap
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access protected
         * 
         * @description
         * Instantiates a new {@link plat.processing.IElementManager|IElementManager} for the root of this 
         * template and resolves any asynchronous url templates within the template being compiled.
         * 
         * @param {plat.ui.ITemplateControl} control The newly created control used to bind the template.
         * @param {plat.processing.INodeMap} nodeMap The newly created node map to bind.
         * @param {string} key The template key.
         * 
         * @returns {void}
         */
        protected _compileNodeMap(control: ITemplateControl, nodeMap: processing.INodeMap, key: string): void {
            var manager = this.$ElementManagerFactory.getInstance(),
                promises: Array<async.IThenable<void>> = [];

            manager.isClone = true;
            manager.initialize(nodeMap, null);
            manager.setUiControlTemplate();

            this.cache[key] = manager;

            promises.push(manager.fulfillTemplate());

            this.templates[key] = this.$Promise.all(promises).then(() => {
                var element = nodeMap.element,
                    startNode: Comment,
                    endNode: Comment;

                var clone = <DocumentFragment>nodeMap.element.cloneNode(true);

                startNode = control.startNode = this.$Document.createComment(control.type + __START_NODE);
                endNode = control.endNode = this.$Document.createComment(control.type + __END_NODE);
                element.insertBefore(startNode, element.firstChild);
                element.insertBefore(endNode, null);

                return clone;
            });
        }

        /**
         * @name _createNodeMap
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access protected
         * 
         * @description
         * Creates an {@link plat.processing.INodeMap|INodeMap} for either a template being compiled or a 
         * template being bound.
         * 
         * @param {plat.ui.ITemplateControl} uiControl The newly created control used to bind the template.
         * @param {Node} template The template being compiled.
         * @param {string} childContext? A potential child context string identifier.
         * 
         * @returns {plat.processing.INodeMap} The newly created {@link plat.processing.INodeMap|INodeMap}.
         */
        protected _createNodeMap(uiControl: ITemplateControl, template: Node, childContext?: string): processing.INodeMap {
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
         * @name _createBoundControl
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access protected
         * 
         * @description
         * Creates a {@link plat.ui.ITemplateControl|ITemplateControl} used for binding either a template being compiled 
         * or a template being bound.
         * 
         * @param {string} key The template key.
         * @param {DocumentFragment} template The template being compiled or being bound.
         * @param {plat.IObject<plat.ui.IResource>} resources? A set of resources to add to the control used to 
         * compile/bind this template.
         * 
         * @returns {plat.ui.ITemplateControl} The newly created {@link plat.ui.ITemplateControl|ITemplateControl}.
         */
        protected _createBoundControl(key: string, template: DocumentFragment, resources?: IObject<IResource>): ITemplateControl {
            var $TemplateControlFactory = this.$TemplateControlFactory,
                control = $TemplateControlFactory.getInstance(),
                $ResourcesFactory = this.$ResourcesFactory,
                parent = this.control,
                compiledManager = this.cache[key],
                _resources = $ResourcesFactory.getInstance();

            if (isObject(compiledManager)) {
                var compiledControl = compiledManager.getUiControl();

                _resources.initialize(control, compiledControl.resources);
                _resources.add(resources);
            } else {
                _resources.initialize(control, resources);
            }

            control.resources = _resources;
            $ResourcesFactory.addControlResources(control);

            control.parent = parent;
            control.controls = [];
            control.element = <HTMLElement>template;
            control.type = parent.type + __BOUND_PREFIX + key;

            return control;
        }
    }

    /**
     * The Type for referencing the '$BindableTemplatesFactory' injectable as a dependency.
     */
    export function IBindableTemplatesFactory(): IBindableTemplatesFactory {
        return BindableTemplates;
    }

    register.injectable(__BindableTemplatesFactory, IBindableTemplatesFactory, null, __FACTORY);

    /**
     * @name IBindableTemplatesFactory
     * @memberof plat.ui
     * @kind interface
     * 
     * @description
     * Creates and manages {@link plat.ui.IBindableTemplates|IBindableTemplates}.
     */
    export interface IBindableTemplatesFactory {
        /**
         * @name create
         * @memberof plat.ui.IBindableTemplatesFactory
         * @kind function
         * @access public
         * @static
         * @variation 0
         * 
         * @description
         * Creates a new instance of BindableTemplates and returns it. If a BindableTemplates is 
         * passed in, it will use the properties on the original BindableTemplates.
         * 
         * @param {plat.ui.ITemplateControl} control The {@link plat.ui.ITemplateControl|ITemplateControl} 
         * containing the new {@link plat.ui.BindableTemplates|BindableTemplates} object, used for data 
         * context inheritance for templates.
         * @param {plat.ui.IBindableTemplates} original? An optional {@link plat.ui.IBindableTemplates|IBindableTemplates} 
         * object to copy.
         * 
         * @returns {plat.ui.IBindableTemplates} The newly instantiated {@link plat.ui.IBindableTemplates|IBindableTemplates} object.
         */
        create(control: ITemplateControl, original?: IBindableTemplates): IBindableTemplates;
        /**
         * @name create
         * @memberof plat.ui.IBindableTemplatesFactory
         * @kind function
         * @access public
         * @static
         * @variation 1
         * 
         * @description
         * Creates a new instance of BindableTemplates and returns it. If a BindableTemplates is 
         * passed in, it will use the properties on the original BindableTemplates.
         * 
         * @param {plat.ui.ITemplateControl} control The {@link plat.ui.ITemplateControl|ITemplateControl} 
         * containing the new {@link plat.ui.BindableTemplates|BindableTemplates} object, used for data 
         * context inheritance for templates.
         * @param {plat.ui.BindableTemplates} original? An optional {@link plat.ui.BindableTemplates|BindableTemplates} 
         * object to copy.
         * 
         * @returns {plat.ui.IBindableTemplates} The newly instantiated {@link plat.ui.IBindableTemplates|IBindableTemplates} object.
         */
        create(control: ITemplateControl, original?: BindableTemplates): IBindableTemplates;

        /**
         * @name dispose
         * @memberof plat.ui.IBindableTemplatesFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Clears the memory being held by control's bindableTemplates.
         * 
         * @static
         * @param {plat.ui.ITemplateControl} control The control whose bindableTemplates will be disposed.
         * 
         * @returns {void}
         */
        dispose(control: ITemplateControl): void;

        /**
         * @name isBoundControl
         * @memberof plat.ui.IBindableTemplatesFactory
         * @kind function
         * @access public
         * @static
         *
         * @description
         * Determines whether or not a control was created using bindableTemplates.
         *
         * @static
         * @param {plat.ui.ITemplateControl} control The potential bound control.
         *
         * @returns {boolean} Whether or not the control is a bound control.
         */
        isBoundControl(control: ITemplateControl): boolean
    }

    /**
     * @name IBindableTemplates
     * @memberof plat.ui
     * @kind interface
     * 
     * @description
     * An object that provides a way for {@link plat.ui.ITemplateControl|ITemplateControls} to bind a template 
     * to a context. Useful for narrowing context without needing another 
     * {@link plat.ui.ITemplateControl|ITemplateControl}. In addition, this object provides a performance increase because 
     * it will only compile the template once. This object is also useful when a 
     * {@link plat.ui.ITemplateControl|ITemplateControls} expects multiple configuration templates in its innerHTML. It can 
     * separate those templates and reuse them accordingly.
     */
    export interface IBindableTemplates {
        /**
         * @name cache
         * @memberof plat.ui.IBindableTemplates
         * @kind property
         * @access public
         * 
         * @type {plat.IObject<plat.processing.IElementManager>}
         * 
         * @description
         * A keyed cache of {@link plat.processing.IElementManager|IElementManagers} that represent the roots of compiled templates 
         * created by this instance.
         */
        cache: IObject<processing.IElementManager>;

        /**
         * @name control
         * @memberof plat.ui.IBindableTemplates
         * @kind property
         * @access public
         * 
         * @type {plat.ui.ITemplateControl}
         * 
         * @description
         * The control containing this {@link plat.ui.BindableTemplates|BindableTemplates} object.
         */
        control: ITemplateControl;

        /**
         * @name templates
         * @memberof plat.ui.IBindableTemplates
         * @kind property
         * @access public
         * 
         * @type {plat.IObject<plat.async.IThenable<DocumentFragment>>}
         * 
         * @description
         * Stores promises that resolve to all the compiled templates for this object, ready to be bound to a data context. 
         * All created templates are DocumentFragments, allowing an {@link plat.ui.ITemplateControl|ITemplateControl} to
         * easily insert the template into the DOM (without iterating over childNodes).
         */
        templates: IObject<async.IThenable<DocumentFragment>>;

        /**
         * @name bind
         * @memberof plat.ui.IBindableTemplates
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Method for linking a new template to a data context and returning a clone of the template, 
         * with all new {@link plat.IControl|IControls} created if the template contains controls. It is not necessary
         * to specify a data context.
         * 
         * @param {string} key The key used to retrieve the template.
         * @param {string} relativeIdentifier? The identifier string relative to this control's context
         * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the 
         * most efficient way of specifying context, else the framework has to search for the 
         * object.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level 
         * controls created in the template.
         * 
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves when the template is bound and 
         * ready to return.
         */
        bind(key: string, relativeIdentifier?: string,
            resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @name bind
         * @memberof plat.ui.IBindableTemplates
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Method for linking a new template to a data context and returning a clone of the template, 
         * with all new {@link plat.IControl|IControls} created if the template contains controls. It is not necessary
         * to specify a data context.
         * 
         * @param {string} key The key used to retrieve the template.
         * @param {number} relativeIdentifier? The identifier number relative to this control's context
         * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level 
         * controls created in the template.
         * 
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves when the template is bound and 
         * ready to return.
         */
        bind(key: string, relativeIdentifier?: number,
            resources?: IObject<IResource>): async.IThenable<DocumentFragment>;

        /**
         * @name add
         * @memberof plat.ui.IBindableTemplates
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         * 
         * @param {string} key The key used to store the template.
         * @param {Element} template An Element representing the DOM template.
         * 
         * @returns {void}
         */
        add(key: string, template: Element): void;
        /**
         * @name add
         * @memberof plat.ui.IBindableTemplates
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         * 
         * @param {string} key The key used to store the template.
         * @param {Array<Node>} template A node Array representing the DOM template.
         * 
         * @returns {void}
         */
        add(key: string, template: Array<Node>): void;
        /**
         * @name add
         * @memberof plat.ui.IBindableTemplates
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         * 
         * @param {string} key The key used to store the template.
         * @param {NodeList} template A NodeList representing the DOM template.
         * 
         * @returns {void}
         */
        add(key: string, template: NodeList): void;
        /**
         * @name add
         * @memberof plat.ui.IBindableTemplates
         * @kind function
         * @access public
         * @variation 3
         * 
         * @description
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         * 
         * @param {string} key The key used to store the template.
         * @param {DocumentFragment} template A DocumentFragment representing the DOM template.
         * 
         * @returns {void}
         */
        add(key: string, template: DocumentFragment): void;
        /**
         * @name add
         * @memberof plat.ui.IBindableTemplates
         * @kind function
         * @access public
         * @variation 4
         * 
         * @description
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         * 
         * @param {string} key The key used to store the template.
         * @param {Node} template A Node representing the DOM template.
         * 
         * @returns {void}
         */
        add(key: string, template: Node): void;

        /**
         * @name dispose
         * @memberof plat.ui.IBindableTemplates
         * @kind function
         * @access public
         * 
         * @description
         * Clears the memory being held by this instance.
         * 
         * @returns {void}
         */
        dispose(): void;
    }
}
