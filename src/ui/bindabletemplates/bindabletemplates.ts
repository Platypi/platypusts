module plat.ui {
    'use strict';

    /**
     * @name BindableTemplates
     * @memberof plat.ui
     * @kind class
     *
     * @description
     * The class which provides a way for {@link plat.ui.TemplateControl|TemplateControls} to bind a template
     * to a context. Useful for narrowing context without needing another
     * {@link plat.ui.TemplateControl|TemplateControl}. In addition, this object provides a performance increase because
     * it will only compile the template once. This object is also useful when a
     * {@link plat.ui.TemplateControl|TemplateControls} expects multiple configuration templates in its innerHTML. It can
     * separate those templates and reuse them accordingly.
     */
    export class BindableTemplates {
        /**
         * @name _ResourcesFactory
         * @memberof plat.ui.BindableTemplates
         * @kind property
         * @access protected
         *
         * @type {plat.ui.IResourcesFactory}
         *
         * @description
         * Reference to the {@link plat.ui.IResourcesFactory|IResourcesFactory} injectable.
         */
        protected _ResourcesFactory: IResourcesFactory = acquire(__ResourcesFactory);

        /**
         * @name _ControlFactory
         * @memberof plat.ui.BindableTemplates
         * @kind property
         * @access protected
         *
         * @type {plat.ui.IControlFactory}
         *
         * @description
         * Reference to the {@link plat.ui.IControlFactory|IControlFactory} injectable.
         */
        protected _ControlFactory: IControlFactory = acquire(__ControlFactory);

        /**
         * @name _TemplateControlFactory
         * @memberof plat.ui.BindableTemplates
         * @kind property
         * @access protected
         *
         * @type {plat.ui.ITemplateControlFactory}
         *
         * @description
         * Reference to the {@link plat.ui.ITemplateControlFactory|ITemplateControlFactory} injectable.
         */
        protected _TemplateControlFactory: ITemplateControlFactory = acquire(__TemplateControlFactory);

        /**
         * @name _ContextManager
         * @memberof plat.ui.BindableTemplates
         * @kind property
         * @access protected
         *
         * @type {plat.observable.IContextManagerStatic}
         *
         * @description
         * Reference to the {@link plat.observable.IContextManagerStatic|IContextManagerStatic} injectable.
         */
        protected _ContextManager: observable.IContextManagerStatic = acquire(__ContextManagerStatic);

        /**
         * @name _Promise
         * @memberof plat.ui.BindableTemplates
         * @kind property
         * @access protected
         *
         * @type {plat.async.IPromise}
         *
         * @description
         * Reference to the {@link plat.async.IPromise|IPromise} injectable.
         */
        protected _Promise: async.IPromise = acquire(__Promise);

        /**
         * @name _managerCache
         * @memberof plat.ui.BindableTemplates
         * @kind property
         * @access protected
         *
         * @type {plat.storage.Cache<processing.ElementManager>}
         *
         * @description
         * Reference to a cache injectable that stores {@link plat.processing.ElementManager|ElementManagers}.
         */
        protected _managerCache: storage.Cache<processing.ElementManager> = acquire(__ManagerCache);

        /**
         * @name _document
         * @memberof plat.ui.BindableTemplates
         * @kind property
         * @access protected
         *
         * @type {Document}
         *
         * @description
         * Reference to the Document injectable.
         */
        protected _document: Document = acquire(__Document);

        /**
         * @name _ElementManagerFactory
         * @memberof plat.ui.BindableTemplates
         * @kind property
         * @access protected
         *
         * @type {plat.processing.IElementManagerFactory}
         *
         * @description
         * Reference to the {@link plat.processing.IElementManagerFactory|IElementManagerFactory} injectable.
         */
        protected _ElementManagerFactory: processing.IElementManagerFactory = acquire(__ElementManagerFactory);

        /**
         * @name _BindableTemplatesFactory
         * @memberof plat.processing.ElementManager
         * @kind property
         * @access protected
         *
         * @type {plat.ui.IBindableTemplatesFactory}
         *
         * @description
         * Reference to the {@link plat.ui.IBindableTemplatesFactory|BindableTemplatesFactory} injectable.
         */
        protected _BindableTemplatesFactory: IBindableTemplatesFactory = acquire(__BindableTemplatesFactory);

        /**
         * @name _log
         * @memberof plat.ui.BindableTemplates
         * @kind property
         * @access protected
         *
         * @type {plat.debug.Log}
         * @description
         * Reference to the {@link plat.debug.Log|Log} injectable.
         */
        protected _log: debug.Log = acquire(__Log);

        /**
         * @name control
         * @memberof plat.ui.BindableTemplates
         * @kind property
         * @access public
         *
         * @type {plat.ui.TemplateControl}
         *
         * @description
         * The control containing this {@link plat.ui.BindableTemplates|BindableTemplates} object.
         */
        control: TemplateControl;
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
         * All created templates are DocumentFragments, allowing an {@link plat.ui.TemplateControl|TemplateControl} to
         * easily insert the template into the DOM (without iterating over childNodes).
         */
        templates: IObject<async.IThenable<DocumentFragment>> = {};

        /**
         * @name cache
         * @memberof plat.ui.BindableTemplates
         * @kind property
         * @access public
         *
         * @type {plat.IObject<plat.processing.ElementManager>}
         *
         * @description
         * A keyed cache of {@link plat.processing.ElementManager|ElementManagers} that represent the roots of compiled templates
         * created by this instance.
         */
        cache: IObject<processing.ElementManager> = {};

        /**
         * @name __compiledControls
         * @memberof plat.ui.BindableTemplates
         * @kind property
         * @access private
         *
         * @type {Array<plat.ui.TemplateControl>}
         *
         * @description
         * A collection of all the controls created while compiling an added template. Useful during disposal.
         */
        private __compiledControls: Array<TemplateControl> = [];

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
         * @param {plat.ui.TemplateControl} control The {@link plat.ui.TemplateControl|TemplateControl}
         * containing the new {@link plat.ui.BindableTemplates|BindableTemplates} object, used for data
         * context inheritance for templates.
         * @param {plat.ui.BindableTemplates} original? An optional {@link plat.ui.BindableTemplates|BindableTemplates}
         * object to copy.
         *
         * @returns {plat.ui.BindableTemplates} The newly instantiated {@link plat.ui.BindableTemplates|BindableTemplates} object.
         */
        static create(control: TemplateControl, original?: BindableTemplates): BindableTemplates;
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
         * @param {plat.ui.TemplateControl} control The {@link plat.ui.TemplateControl|TemplateControl}
         * containing the new {@link plat.ui.BindableTemplates|BindableTemplates} object, used for data
         * context inheritance for templates.
         * @param {plat.ui.BindableTemplates} original? An optional {@link plat.ui.BindableTemplates|BindableTemplates}
         * object to copy.
         *
         * @returns {plat.ui.BindableTemplates} The newly instantiated {@link plat.ui.BindableTemplates|BindableTemplates} object.
         */
        static create(control: TemplateControl, original?: BindableTemplates): BindableTemplates {
            let bindableTemplates = new BindableTemplates();
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
         * @param {plat.ui.TemplateControl} control The control whose bindableTemplates will be disposed.
         *
         * @returns {void}
         */
        static dispose(control: TemplateControl): void {
            if (isNull(control)) {
                return;
            }
            let instance = control.bindableTemplates;

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
         * @param {plat.ui.TemplateControl} control The potential bound control.
         *
         * @returns {boolean} Whether or not the control is a bound control.
         */
        static isBoundControl(control: TemplateControl): boolean {
            if (isNull(control)) {
                return false;
            }

            let parent = control.parent;
            if (isNull(parent)) {
                return false;
            }

            return control.type.indexOf(parent.type + __BOUND_PREFIX) === 0;
        }

        /**
         * @name once
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @variation 0
         *
         * @description
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         *
         * @param {Element} template An Element representing the DOM template.
         * @param {string} relativeIdentifier? The identifier string relative to this control's context
         * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the
         * most efficient way of specifying context, else the framework has to search for the
         * object.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         *
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves when the template is compiled,
         * bound, and ready to return.
         */
        once(template: Element, relativeIdentifier?: string, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @name once
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @variation 1
         *
         * @description
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         *
         * @param {Element} template An Element representing the DOM template.
         * @param {number} relativeIdentifier? The identifier number relative to this control's context
         * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         *
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves when the template is compiled,
         * bound, and ready to return.
         */
        once(template: Element, relativeIdentifier?: number, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @name once
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @variation 2
         *
         * @description
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         *
         * @param {Array<Node>} template A node Array representing the DOM template.
         * @param {string} relativeIdentifier? The identifier string relative to this control's context
         * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the
         * most efficient way of specifying context, else the framework has to search for the
         * object.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         *
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves when the template is compiled,
         * bound, and ready to return.
         */
        once(template: Array<Node>, relativeIdentifier?: string, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @name once
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @variation 3
         *
         * @description
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         *
         * @param {Array<Node>} template A node Array representing the DOM template.
         * @param {number} relativeIdentifier? The identifier number relative to this control's context
         * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         *
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves when the template is compiled,
         * bound, and ready to return.
         */
        once(template: Array<Node>, relativeIdentifier?: number, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @name once
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @variation 4
         *
         * @description
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         *
         * @param {NodeList} template A NodeList representing the DOM template.
         * @param {string} relativeIdentifier? The identifier string relative to this control's context
         * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the
         * most efficient way of specifying context, else the framework has to search for the
         * object.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         *
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves when the template is compiled,
         * bound, and ready to return.
         */
        once(template: NodeList, relativeIdentifier?: string, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @name once
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @variation 5
         *
         * @description
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         *
         * @param {NodeList} template A NodeList representing the DOM template.
         * @param {number} relativeIdentifier? The identifier number relative to this control's context
         * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         *
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves when the template is compiled,
         * bound, and ready to return.
         */
        once(template: NodeList, relativeIdentifier?: number, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @name once
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @variation 6
         *
         * @description
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         *
         * @param {DocumentFragment} template A DocumentFragment representing the DOM template.
         * @param {string} relativeIdentifier? The identifier string relative to this control's context
         * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the
         * most efficient way of specifying context, else the framework has to search for the
         * object.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         *
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves when the template is compiled,
         * bound, and ready to return.
         */
        once(template: DocumentFragment, relativeIdentifier?: string, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @name once
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @variation 7
         *
         * @description
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         *
         * @param {DocumentFragment} template A DocumentFragment representing the DOM template.
         * @param {number} relativeIdentifier? The identifier number relative to this control's context
         * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         *
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves when the template is compiled,
         * bound, and ready to return.
         */
        once(template: DocumentFragment, relativeIdentifier?: number, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @name once
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @variation 8
         *
         * @description
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         *
         * @param {Node} template A Node representing the DOM template.
         * @param {string} relativeIdentifier? The identifier string relative to this control's context
         * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the
         * most efficient way of specifying context, else the framework has to search for the
         * object.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         *
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves when the template is compiled,
         * bound, and ready to return.
         */
        once(template: Node, relativeIdentifier?: string, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @name once
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @variation 9
         *
         * @description
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         *
         * @param {Node} template A Node representing the DOM template.
         * @param {number} relativeIdentifier? The identifier number relative to this control's context
         * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         *
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves when the template is compiled,
         * bound, and ready to return.
         */
        once(template: Node, relativeIdentifier?: number, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @name once
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @variation 10
         *
         * @description
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         *
         * @param {string} template A template string representing the DOM template.
         * @param {string} relativeIdentifier? The identifier string relative to this control's context
         * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the
         * most efficient way of specifying context, else the framework has to search for the
         * object.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         *
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves when the template is compiled,
         * bound, and ready to return.
         */
        once(template: string, relativeIdentifier?: string, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @name once
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @variation 11
         *
         * @description
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         *
         * @param {string} template A template string representing the DOM template.
         * @param {number} relativeIdentifier? The identifier number relative to this control's context
         * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         *
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves when the template is compiled,
         * bound, and ready to return.
         */
        once(template: string, relativeIdentifier?: number, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        once(template: any, relativeIdentifier?: any, resources?: IObject<IResource>): async.IThenable<DocumentFragment> {
            let fragment: DocumentFragment;
            if (isNull(template)) {
                return this._Promise.resolve(this._document.createDocumentFragment());
            } else if (isString(template)) {
                fragment = serializeHtml(template);
            } else if (isDocumentFragment(template)) {
                fragment = template;
            } else {
                fragment = this._document.createDocumentFragment();

                if (isNode(template)) {
                    fragment.appendChild(template);
                } else if (isArrayLike(template)) {
                    appendChildren(template, fragment);
                } else {
                    return this._Promise.resolve(fragment);
                }
            }

            if (!(isNull(relativeIdentifier) || isNumber(relativeIdentifier) || isString(relativeIdentifier))) {
                this._log.warn(this.control.type + ' cannot bind template with relativeIdentifier: ' + relativeIdentifier +
                    '. Identifier must be either a string or number');
                return;
            }

            let parent = this.control,
                controlManager = this._managerCache.read(parent.uid),
                manager = this._ElementManagerFactory.getInstance(),
                control = this._createBoundControl('', fragment, relativeIdentifier, resources),
                nodeMap = this._createNodeMap(control, fragment, relativeIdentifier);

            parent.controls.push(control);
            controlManager.children = [];
            manager.initialize(nodeMap, controlManager);
            manager.setUiControlTemplate();

            return manager.fulfillAndLoad().then((): DocumentFragment => {
                let _document = this._document;

                control.startNode = <Comment>fragment.insertBefore(_document.createComment(control.type + __START_NODE),
                    fragment.firstChild);
                control.endNode = <Comment>fragment.insertBefore(_document.createComment(control.type + __END_NODE),
                    null);

               return fragment;
            });
        }

        /**
         * @name bind
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @variation 0
         *
         * @description
         * Method for linking a compiled template to a data context and returning a clone of the template,
         * with all new {@link plat.Control|Controls} created if the template contains controls. If no data context
         * is specified, it will be inherited.
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
         * Method for linking a compiled template to a data context and returning a clone of the template,
         * with all new {@link plat.Control|Controls} created if the template contains controls. If no data context
         * is specified, it will be inherited.
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
            return this._bind(key, relativeIdentifier, resources);
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
        /**
         * @name add
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @variation 5
         *
         * @description
         * Adds a template to this object. The template will be stored with the key,
         * and it will be transformed into a DocumentFragment.
         *
         * @param {string} key The key used to store the template.
         * @param {string} template A template string representing the DOM template.
         *
         * @returns {void}
         */
        add(key: string, template: string): void;
        add(key: string, template: any): void {
            if (isEmpty(key)) {
                this._log.debug(this.control.type + ' must use a valid key to add a template to BindableTemplates.');
                return;
            }

            if (isNull(template)) {
                return;
            } else if (isString(template)) {
                this._compile(key, serializeHtml(template));
                return;
            } else if (isDocumentFragment(template)) {
                this._compile(key, template);
                return;
            }

            let fragment = this._document.createDocumentFragment();

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
         * @name replace
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @variation 0
         *
         * @description
         * Replaces the bound {@link plat.ui.TemplateControl|TemplateControl} in the child control Array
         * specified by the index with another bound control generated by the template key, relative context
         * identifier, and resources.
         *
         * @param {number} index The index of the bound {@link plat.ui.TemplateControl|TemplateControl}
         * in the child control Array to replace.
         * @param {string} key The key used to retrieve the template.
         * @param {string} relativeIdentifier? The identifier string relative to this control's context
         * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the
         * most efficient way of specifying context, else the framework has to search for the
         * object.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         *
         * @returns {plat.async.IThenable<Array<Node>>} A promise that resolves after the child control and its element have
         * been replaced. It resolves with an Array containing the newly added nodes.
         */
        replace(index: number, key: string, relativeIdentifier?: string, resources?: IObject<IResource>): async.IThenable<Array<Node>>;
        /**
         * @name replace
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access public
         * @variation 1
         *
         * @description
         * Replaces the bound {@link plat.ui.TemplateControl|TemplateControl} in the child control Array
         * specified by the index with another bound control generated by the template key, relative context
         * identifier, and resources.
         *
         * @param {number} index The index of the bound {@link plat.ui.TemplateControl|TemplateControl}
         * in the child control Array to replace.
         * @param {string} key The key used to retrieve the template.
         * @param {number} relativeIdentifier? The identifier number relative to this control's context
         * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         *
         * @returns {plat.async.IThenable<Array<Node>>} A promise that resolves after the child control and its element have
         * been replaced. It resolves with an Array containing the newly added nodes.
         *
         * @returns {void}
         */
        replace(index: number, key: string, relativeIdentifier?: number, resources?: IObject<IResource>): async.IThenable<Array<Node>>;
        replace(index: number, key: string, relativeIdentifier?: any, resources?: IObject<IResource>): async.IThenable<Array<Node>> {
            let control = <TemplateControl>this.control.controls[index];

            if (!BindableTemplates.isBoundControl(control)) {
                this._log.warn('The child control of ' + this.control.type + ' at the specified index: ' + index +
                    ' is not a bound control and thus cannot be replaced by BindableTemplates.');
                return this._Promise.resolve([]);
            }

            let endNode = control.endNode;
            if (!(isNode(endNode) && isNode(endNode.parentNode))) {
                this._log.warn('The child control of ' + this.control.type + ' at the specified index: ' + index +
                    ' had either no placeholding comment nodes or its comment nodes had no parent and thus ' +
                    'cannot be replaced by BindableTemplates.');
                return this._Promise.resolve([]);
            }

            return this._bind(key, relativeIdentifier, resources, index);
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
            let dispose = this._TemplateControlFactory.dispose,
                compiledControls = this.__compiledControls,
                length = compiledControls.length;

            for (let i = 0; i < length; ++i) {
                dispose(compiledControls[i]);
            }

            this.__compiledControls = [];
            this.control = null;
            this.cache = {};
            this.templates = {};
        }

        /**
         * @name _bind
         * @memberof plat.ui.BindableTemplates
         * @kind function
         * @access protected
         *
         * @description
         * Method for linking a template to a data context and returning a clone of the template,
         * with all new {@link plat.Control|Controls} created if the template contains controls. If no data context
         * is specified, it will be inherited.
         *
         * @param {string} key The key used to retrieve the template.
         * @param {string} relativeIdentifier? The identifier string relative to this control's context
         * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the
         * most efficient way of specifying context, else the framework has to search for the
         * object.
         * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         * @param {number} index? An optional index only to be used if the newly bound template is intended to
         * replace an existing {@link plat.Control|Control} in the child controls Array and its element in the DOM.
         *
         * @returns {plat.async.IThenable<any>} A promise that resolves when the template is bound and
         * ready to return or after the template and its control have replaced the bound control specified by the index.
         */
        protected _bind(key: any, relativeIdentifier?: any, resources?: IObject<IResource>, index?: number): async.IThenable<any> {
            let templatePromise = this.templates[key],
                noIndex = isNull(index);

            if (isNull(templatePromise)) {
                this._log.error(new Error(this.control.type + ' cannot bind template, no template stored with key: ' + key));
                return;
            }

            if (!(isNull(relativeIdentifier) || isNumber(relativeIdentifier) || isString(relativeIdentifier))) {
                this._log.warn(this.control.type + ' cannot bind template with relativeIdentifier: ' + relativeIdentifier +
                    '. Identifier must be either a string or number');
                return;
            }

            templatePromise = templatePromise.then((result: DocumentFragment): async.IThenable<any> => {
                let template = <DocumentFragment>result.cloneNode(true),
                    control = this._createBoundControl(key, template, relativeIdentifier, resources),
                    nodeMap = this._createNodeMap(control, template, relativeIdentifier);

                if (noIndex) {
                    this.control.controls.push(control);
                }

                return this._bindTemplate(key, nodeMap);
            });

            if (!noIndex) {
                return templatePromise.then((fragment): async.IThenable<any> => {
                    let childNodes = Array.prototype.slice.call(fragment.childNodes),
                        oldControl = <TemplateControl>this.control.controls[index],
                        endNode = oldControl.endNode,
                        parentNode = endNode.parentNode,
                        nextSibling = endNode.nextSibling;

                    this._TemplateControlFactory.dispose(oldControl);
                    parentNode.insertBefore(fragment, nextSibling);

                    return childNodes;
                }).then(null, (error: any): DocumentFragment => {
                    postpone((): void => {
                        if (isString(error)) {
                            error = new Error(error);
                        }
                        this._log.error(error);
                    });

                    return this._document.createDocumentFragment();
                });
            }

            return templatePromise.then(null, (error: any): DocumentFragment => {
                postpone((): void => {
                    if (isString(error)) {
                        error = new Error(error);
                    }
                    this._log.error(error);
                });

                return this._document.createDocumentFragment();
            });

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
         * @param {plat.processing.INodeMap} nodeMap The node map to bind.
         *
         * @returns {plat.async.IThenable<DocumentFragment>} A promise that resolves when the template is bound.
         */
        protected _bindTemplate(key: string, nodeMap: processing.INodeMap): async.IThenable<DocumentFragment> {
            let control = nodeMap.uiControlNode.control,
                disposed = false,
                dispose = isFunction(control.dispose) ? control.dispose.bind(control) : noop;

            control.dispose = (): void => {
                disposed = true;
                dispose();
                control.dispose = dispose;
            };

            return this._bindNodeMap(key, nodeMap).then((): DocumentFragment => {
                let _document = this._document,
                    template = nodeMap.element;

                if (disposed) {
                    return _document.createDocumentFragment();
                }

                control.startNode = <Comment>template.insertBefore(_document.createComment(control.type + __START_NODE),
                    template.firstChild);
                control.endNode = <Comment>template.insertBefore(_document.createComment(control.type + __END_NODE),
                    null);

                return template;
            }, (error: any): DocumentFragment => {
                postpone((): void => {
                    if(isString(error)) {
                        error = new Error(error);
                    }
                    this._log.error(error);
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
         * Clones the compiled {@link plat.processing.ElementManager|ElementManager} using the newly created
         * {@link plat.processing.INodeMap|INodeMap} and binds and loads this control's
         * {@link plat.processing.ElementManager|ElementManager}.
         *
         * @param {string} key The template key used to grab the {@link plat.processing.ElementManager|ElementManager}.
         * @param {plat.processing.INodeMap} nodeMap The node map to bind.
         *
         * @returns {plat.async.IThenable<void>} A promise that resolves when the control's
         * {@link plat.processing.ElementManager|ElementManager} is bound and loaded.
         */
        protected _bindNodeMap(key: string, nodeMap: processing.INodeMap): async.IThenable<void> {
            let manager = this.cache[key],
                child = nodeMap.uiControlNode.control,
                template = nodeMap.element,
                _managerCache = this._managerCache;

            manager.clone(template, _managerCache.read(this.control.uid), nodeMap);
            return _managerCache.read(child.uid).bindAndLoad();
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
            let control = this._createBoundControl(key + __COMPILED, template),
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
         * Instantiates a new {@link plat.processing.ElementManager|ElementManager} for the root of this
         * template and resolves any asynchronous url templates within the template being compiled.
         *
         * @param {plat.ui.TemplateControl} control The newly created control used to bind the template.
         * @param {plat.processing.INodeMap} nodeMap The newly created node map to bind.
         * @param {string} key The template key.
         *
         * @returns {void}
         */
        protected _compileNodeMap(control: TemplateControl, nodeMap: processing.INodeMap, key: string): void {
            let manager = this._ElementManagerFactory.getInstance(),
                promises: Array<async.IThenable<void>> = [];

            manager.isClone = true;
            manager.initialize(nodeMap, null);
            manager.setUiControlTemplate();

            this.cache[key] = manager;

            promises.push(manager.fulfillTemplate());

            this.templates[key] = this._Promise.all(promises).then((): DocumentFragment => {
                let element = nodeMap.element,
                    clone = <DocumentFragment>element.cloneNode(true),
                    _document = this._document,
                    startNode = control.startNode = _document.createComment(control.type + __START_NODE),
                    endNode = control.endNode = _document.createComment(control.type + __END_NODE);

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
         * @param {plat.ui.TemplateControl} uiControl The newly created control used to bind the template.
         * @param {Node} template The template being compiled.
         * @param {string} childContext? A potential child context string identifier.
         *
         * @returns {plat.processing.INodeMap} The newly created {@link plat.processing.INodeMap|INodeMap}.
         */
        protected _createNodeMap(uiControl: TemplateControl, template: Node, childContext?: string): processing.INodeMap {
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
         * Creates a {@link plat.ui.TemplateControl|TemplateControl} used for binding either a template being compiled
         * or a template being bound.
         *
         * @param {string} key The template key.
         * @param {DocumentFragment} template The template being compiled or being bound.
         * @param {plat.IObject<plat.ui.IResource>} resources? A set of resources to add to the control used to
         * compile/bind this template.
         *
         * @returns {plat.ui.TemplateControl} The newly created {@link plat.ui.TemplateControl|TemplateControl}.
         */
        protected _createBoundControl(key: string, template: DocumentFragment, childContext?: string, resources?: IObject<IResource>): TemplateControl {
            let _TemplateControlFactory = this._TemplateControlFactory,
                control = _TemplateControlFactory.getInstance(),
                _ResourcesFactory = this._ResourcesFactory,
                parent = this.control,
                compiledManager = this.cache[key],
                isCompiled = isObject(compiledManager),
                _resources = _ResourcesFactory.getInstance();

            if (isCompiled) {
                let compiledControl = compiledManager.getUiControl();

                _resources.initialize(control, compiledControl.resources);
                _resources.add(resources);
            } else {
                _resources.initialize(control, resources);
            }

            control.resources = _resources;
            _ResourcesFactory.addControlResources(control);

            control.bindableTemplates = this._BindableTemplatesFactory.create(control, parent.bindableTemplates);

            control.parent = parent;
            control.controls = [];
            control.element = <HTMLElement>template;
            control.type = parent.type + __BOUND_PREFIX + key;
            control.root = this._ControlFactory.getRootControl(control);

            if (isCompiled) {
                let contextManager = this._ContextManager.getManager(control.root);
                control.absoluteContextPath = parent.absoluteContextPath || __CONTEXT;

                if (!isNull(childContext)) {
                    control.absoluteContextPath += '.' + childContext;
                }

                control.context = contextManager.getContext(control.absoluteContextPath.split('.'), false);
            }

            return control;
        }
    }

    /**
     * The Type for referencing the '_BindableTemplatesFactory' injectable as a dependency.
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
     * Creates and manages {@link plat.ui.BindableTemplates|BindableTemplates}.
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
         * @param {plat.ui.TemplateControl} control The {@link plat.ui.TemplateControl|TemplateControl}
         * containing the new {@link plat.ui.BindableTemplates|BindableTemplates} object, used for data
         * context inheritance for templates.
         * @param {plat.ui.BindableTemplates} original? An optional {@link plat.ui.BindableTemplates|BindableTemplates}
         * object to copy.
         *
         * @returns {plat.ui.BindableTemplates} The newly instantiated {@link plat.ui.BindableTemplates|BindableTemplates} object.
         */
        create(control: TemplateControl, original?: BindableTemplates): BindableTemplates;
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
         * @param {plat.ui.TemplateControl} control The {@link plat.ui.TemplateControl|TemplateControl}
         * containing the new {@link plat.ui.BindableTemplates|BindableTemplates} object, used for data
         * context inheritance for templates.
         * @param {plat.ui.BindableTemplates} original? An optional {@link plat.ui.BindableTemplates|BindableTemplates}
         * object to copy.
         *
         * @returns {plat.ui.BindableTemplates} The newly instantiated {@link plat.ui.BindableTemplates|BindableTemplates} object.
         */
        create(control: TemplateControl, original?: BindableTemplates): BindableTemplates;

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
         * @param {plat.ui.TemplateControl} control The control whose bindableTemplates will be disposed.
         *
         * @returns {void}
         */
        dispose(control: TemplateControl): void;

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
         * @param {plat.ui.TemplateControl} control The potential bound control.
         *
         * @returns {boolean} Whether or not the control is a bound control.
         */
        isBoundControl(control: TemplateControl): boolean;
    }
}
