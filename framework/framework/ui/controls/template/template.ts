module plat.ui.controls {
    export class Template extends TemplateControl {
        /**
         * Removes the <plat-template> node from the DOM
         */
        replaceWith: string = null;

        /**
         * The evaluated plat-options object.
         */
        options: observable.IObservableProperty<ITemplateOptions>;
        $PromiseStatic: async.IPromiseStatic = acquire('$PromiseStatic');
        $templateCache: storage.ITemplateCache = acquire('$templateCache');
        $ExceptionStatic: IExceptionStatic = acquire('$ExceptionStatic');

        /**
         * The unique ID used to reference a particular 
         * template.
         */
        _id: string;

        /**
         * The optional URL associated with this 
         * particular template.
         */
        _url: string;
        private __isFirst: boolean = false;
        private __templatePromise: async.IPromise<Template, async.IAjaxError>;
        private __templateControlCache: storage.ICache<any>;
        constructor() {
            super();
            var Cache: storage.ICacheStatic = acquire('$CacheStatic');
            this.__templateControlCache = Cache.create<any>('__templateControlCache');
        }

        /**
         * Initializes the creation of the template.
         */
        initialize() {
            var templateControlCache = this.__templateControlCache,
                id = this._id = this.options.value.id,
                options = this.options.value;

            if (isNull(id)) {
                return;
            }

            this._url = options.url;

            var templatePromise: async.IPromise<Template, Error> = this.__templateControlCache.read(id);
            if (!isNull(templatePromise)) {
                this.__templatePromise = templatePromise;
                return;
            }

            this.__isFirst = true;
            this._initializeTemplate();
        }

        /**
         * Decides if this is a template definition or 
         * a template instance.
         */
        loaded() {
            if (!this.__isFirst) {
                this._waitForTemplateControl(this.__templatePromise);
            }
        }

        /**
         * Removes the template from the template cache.
         */
        dispose() {
            if (this.__isFirst) {
                this.__templateControlCache.dispose();
            }
        }

        /**
         * Determines whether a URL or innerHTML is being used, 
         * creates the bindable template, and stores the template 
         * in a template cache for later use.
         */
        _initializeTemplate() {
            var id = this._id,
                $document: Document = acquire('$document');

            if (isNull(id)) {
                return;
            }

            var parentNode = this.endNode.parentNode,
                url = this._url,
                template;

            if (!isNull(url)) {
                template = this.$templateCache.read(url);
                //determineTemplate sets the templateUrl so we need to reset it back to null
                this.templateUrl = null;
                this.dom.clearNodeBlock(this.elementNodes, parentNode);
            } else {
                template = $document.createDocumentFragment();
                this.dom.appendChildren(this.elementNodes, template);
            }

            var controlPromise;
            if (isFunction(template.then)) {
                controlPromise = template.catch((error) => {
                    if (isNull(error)) {
                        return TemplateControl.determineTemplate(this, url);
                    }
                }).then((template: DocumentFragment) => {
                    var bindableTemplates = this.bindableTemplates;
                    bindableTemplates.add(id, template.cloneNode(true));
                    return this;
                });
            } else {
                this.bindableTemplates.add(id, template.cloneNode(true));

                controlPromise = this.$PromiseStatic.resolve(this);
            }

            this.__templateControlCache.put(id, controlPromise);
        }

        /**
         * Waits for the template promise to resolve, then initializes 
         * the binding of the bindable template and places it into the 
         * DOM.
         * 
         * @param templatePromise The promise associated with the first 
         * instance of the template with this ID.
         */
        _waitForTemplateControl(templatePromise: async.IPromise<Template, async.IAjaxError>) {
            templatePromise.then((templateControl: Template) => {
                if (!(isNull(this._url) || (this._url === templateControl._url))) {
                    this.$ExceptionStatic.warn('The specified url: ' + this._url +
                        ' does not match the original plat-template with id: ' +
                        '"' + this._id + '". The original url will be loaded.',
                        this.$ExceptionStatic.TEMPLATE);
                }

                this.__mapBindableTemplates(templateControl);

                var endNode = this.endNode;
                this._instantiateTemplate().then((clone) => {
                    this.dom.insertBefore(endNode.parentNode, clone, endNode);
                });
            }).catch((error) => {
                postpone(() => {
                    this.$ExceptionStatic.warn('Problem resolving plat-template url: ' +
                        error.response, this.$ExceptionStatic.TEMPLATE);
                });
            });
        }

        /**
         * Binds the template to the proper context and 
         * resolves the clone to be placed into the DOM.
         */
        _instantiateTemplate() {
            var bindableTemplates = this.bindableTemplates,
                id = this._id;

            return new this.$PromiseStatic<DocumentFragment, Error>((resolve, reject) => {
                bindableTemplates.bind(id, (clone: DocumentFragment) => {
                    resolve(clone);
                });
            });
        }

        private __mapBindableTemplates(control: Template) {
            (<BindableTemplates>this.bindableTemplates)._cache =
                (<BindableTemplates>control.bindableTemplates)._cache;
            this.bindableTemplates.templates = control.bindableTemplates.templates;
        }
    }

    /**
     * The available options for plat.ui.controls.Template.
     */
    export interface ITemplateOptions {
        /**
         * The unique ID used to label a template 
         * and use it as DOM.
         */
        id: string;

        /**
         * An optional URL to specify a template 
         * instead of using the element's innerHTML.
         */
        url: string;
    }

    register.control('plat-template', Template);
}
