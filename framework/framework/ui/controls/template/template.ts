module plat.ui.controls {
    /**
     * @name Template
     * @memberof plat.ui.controls
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * 
     * @description
     * A {@link plat.ui.TemplateControl|TemplateControl} for easily reusing a 
     * defined HTML template.
     */
    export class Template extends TemplateControl {
        /**
         * @name _Promise
         * @memberof plat.ui.controls.Template
         * @kind property
         * @access public
         * 
         * @type {plat.async.IPromise}
         * 
         * @description
         * Reference to the {@link plat.async.IPromise|IPromise} injectable.
         */
        _Promise: async.IPromise = acquire(__Promise);
        /**
         * @name _templateCache
         * @memberof plat.ui.controls.Template
         * @kind property
         * @access public
         * 
         * @type {plat.storage.ITemplateCache}
         * 
         * @description
         * Reference to an injectable for storing HTML templates.
         */
        _templateCache: storage.ITemplateCache = acquire(__TemplateCache);
        /**
         * @name _document
         * @memberof plat.ui.controls.Template
         * @kind property
         * @access public
         * 
         * @type {Document}
         * 
         * @description
         * Reference to the Document injectable.
         */
        _document: Document = acquire(__Document);

        /**
         * @name replaceWith
         * @memberof plat.ui.controls.Template
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Removes the <plat-template> node from the DOM
         */
        replaceWith: string = null;

        /**
         * @name options
         * @memberof plat.ui.controls.Template
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IObservableProperty<plat.ui.controls.ITemplateOptions>}
         * 
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: observable.IObservableProperty<ITemplateOptions>;

        /**
         * @name _id
         * @memberof plat.ui.controls.Template
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The unique ID used to reference a particular 
         * template.
         */
        protected _id: string;

        /**
         * @name _url
         * @memberof plat.ui.controls.Template
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The optional URL associated with this 
         * particular template.
         */
        protected _url: string;

        /**
         * @name __isFirst
         * @memberof plat.ui.controls.Template
         * @kind property
         * @access private
         * 
         * @type {string}
         * 
         * @description
         * Whether or not this is the first instance of the control, 
         * specifying that it defines the template to copy.
         */
        private __isFirst = false;
        /**
         * @name __templatePromise
         * @memberof plat.ui.controls.Template
         * @kind property
         * @access private
         * 
         * @type {plat.async.IThenable<plat.ui.controls.Template>}
         * 
         * @description
         * A promise that resolves when the template is retrieved and ready.
         */
        private __templatePromise: async.IThenable<Template>;
        /**
         * @name __templateControlCache
         * @memberof plat.ui.controls.Template
         * @kind property
         * @access private
         * 
         * @type {plat.storage.ICache<any>}
         * 
         * @description
         * HTML template storage for all instances of this control.
         */
        private __templateControlCache: storage.ICache<any>;

        /**
         * @name constructor
         * @memberof plat.ui.controls.Template
         * @kind function
         * @access public
         * 
         * @description
         * The constructor for a {@link plat.ui.controls.Template|Template}. Creates the control cache.
         * 
         * @returns {plat.ui.controls.Template} A {@link plat.ui.controls.Template|Template} instance.
         */
        constructor() {
            super();
            var _CacheFactory: storage.ICacheFactory = acquire(__CacheFactory);
            this.__templateControlCache = _CacheFactory.create<any>(__TemplateControlCache);
        }

        /**
         * @name initialize
         * @memberof plat.ui.controls.Template
         * @kind function
         * @access public
         * 
         * @description
         * Initializes the creation of the template.
         * 
         * @returns {void}
         */
        initialize(): void {
            var optionsObj = this.options || <observable.IObservableProperty<ITemplateOptions>>{},
                options = optionsObj.value || <ITemplateOptions>{},
                id = this._id = options.id;

            if (isNull(id)) {
                var _Exception: IExceptionStatic = acquire(__ExceptionStatic);
                _Exception.warn(this.type + ' instantiated without an id option', _Exception.COMPILE);
                return;
            }

            this._url = options.templateUrl;

            var templatePromise: async.IThenable<Template> = this.__templateControlCache.read(id);
            if (!isNull(templatePromise)) {
                this.__templatePromise = templatePromise;
                return;
            }

            this.__isFirst = true;
            this._initializeTemplate();
        }

        /**
         * @name loaded
         * @memberof plat.ui.controls.Template
         * @kind function
         * @access public
         * 
         * @description
         * Decides if this is a template definition or 
         * a template instance.
         * 
         * @returns {void}
         */
        loaded(): void {
            if (!this.__isFirst) {
                this._waitForTemplateControl(this.__templatePromise);
            }
        }

        /**
         * @name dispose
         * @memberof plat.ui.controls.Template
         * @kind function
         * @access public
         * 
         * @description
         * Removes the template from the template cache.
         * 
         * @returns {void}
         */
        dispose(): void {
            if (this.__isFirst) {
                var cache = this.__templateControlCache;
                cache.remove(this._id);
                if (cache.info().size === 0) {
                    cache.dispose();
                }
            }
        }

        /**
         * @name _initializeTemplate
         * @memberof plat.ui.controls.Template
         * @kind function
         * @access protected
         * 
         * @description
         * Determines whether a URL or innerHTML is being used, 
         * creates the bindable template, and stores the template 
         * in a template cache for later use.
         * 
         * @returns {void}
         */
        protected _initializeTemplate(): void {
            var id = this._id;

            if (isNull(id)) {
                return;
            }

            var parentNode = this.endNode.parentNode,
                url = this._url,
                template: any;

            if (!isNull(url)) {
                template = this._templateCache.read(url);
                clearNodeBlock(this.elementNodes, parentNode);
            } else {
                template = this._document.createDocumentFragment();
                appendChildren(this.elementNodes, template);
            }

            var controlPromise: async.IThenable<ITemplateControl>;
            if (isPromise(template)) {
                controlPromise = template.catch((error: Error) => {
                    if (isNull(error)) {
                        return TemplateControl.determineTemplate(this, url);
                    }
                }).then((template: DocumentFragment) => {
                        this.bindableTemplates.add(id, template.cloneNode(true));
                        return this;
                    });
            } else {
                this.bindableTemplates.add(id, template.cloneNode(true));

                controlPromise = this._Promise.resolve(this);
            }

            this.__templateControlCache.put(id, controlPromise);
        }

        /**
         * @name _waitForTemplateControl
         * @memberof plat.ui.controls.Template
         * @kind function
         * @access protected
         * 
         * @description
         * Waits for the template promise to resolve, then initializes 
         * the binding of the bindable template and places it into the 
         * DOM.
         * 
         * @param {plat.async.IThenable<plat.ui.controls.Template>} templatePromise The promise 
         * associated with the first instance of the control with this ID.
         * 
         * @returns {void}
         */
        protected _waitForTemplateControl(templatePromise: async.IThenable<Template>): void {
            var _Exception: IExceptionStatic;
            templatePromise.then((templateControl: Template) => {
                if (!(isNull(this._url) || (this._url === templateControl._url))) {
                    _Exception = acquire(__ExceptionStatic);
                    _Exception.warn('The specified url: ' + this._url +
                        ' does not match the original ' + this.type + ' with id: ' +
                        '"' + this._id + '". The original url will be loaded.',
                        _Exception.TEMPLATE);
                }

                this.__mapBindableTemplates(templateControl);
                return this.bindableTemplates.bind(this._id);
            }).then((clone) => {
                    var endNode = this.endNode;
                    insertBefore(endNode.parentNode, clone, endNode);
                }).catch((error) => {
                    postpone(() => {
                        _Exception = acquire(__ExceptionStatic);
                        _Exception.warn('Problem resolving ' + this.type + ' url: ' +
                            error.response, _Exception.TEMPLATE);
                    });
                });
        }

        /**
         * @name __mapBindableTemplates
         * @memberof plat.ui.controls.Template
         * @kind function
         * @access private
         * 
         * @description
         * Maps the bindable templates cache and html templates of the first 
         * control with the proper ID to this control's bindable templates.
         * 
         * @param {plat.ui.controls.Template} control The first of the controls 
         * with this corresponding ID that defined the HTML template to reuse.
         * 
         * @returns {void}
         */
        private __mapBindableTemplates(control: Template): void {
            var bindableTemplates = this.bindableTemplates;
            bindableTemplates.cache = control.bindableTemplates.cache;
            bindableTemplates.templates = control.bindableTemplates.templates;
        }
    }

    /**
     * @name ITemplateOptions
     * @memberof plat.ui.controls
     * @kind interface
     * 
     * @description
     * The available {@link plat.controls.Options|options} for the {@link plat.ui.controls.Template|Template} control.
     */
    export interface ITemplateOptions {
        /**
         * @name id
         * @memberof plat.ui.controls.ITemplateOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The unique ID used to label a template 
         * and use it as DOM.
         */
        id: string;

        /**
         * @name templateUrl
         * @memberof plat.ui.controls.ITemplateOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * An optional URL to specify a template 
         * instead of using the element's innerHTML.
         */
        templateUrl: string;
    }

    register.control(__Template, Template);
}
