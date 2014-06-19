module plat.ui.controls {
    export class Template extends TemplateControl {
        $Promise: async.IPromise = acquire(__Promise);
        $TemplateCache: storage.ITemplateCache = acquire(__TemplateCache);
        $Document: Document = acquire(__Document);

        /**
         * Removes the <plat-template> node from the DOM
         */
        replaceWith: string = null;

        /**
         * The evaluated plat-options object.
         */
        options: observable.IObservableProperty<ITemplateOptions>;

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
        private __templatePromise: async.IThenable<Template>;
        private __templateControlCache: storage.ICache<any>;

        /**
         * Creates the Template control cache
         */
        constructor() {
            super();
            var $cacheFactory: storage.ICacheFactory = acquire(__CacheFactory);
            this.__templateControlCache = $cacheFactory.create<any>('__templateControlCache');
        }

        /**
         * Initializes the creation of the template.
         */
        initialize(): void {
            var id = this._id = this.options.value.id,
                options = this.options.value;

            if (isNull(id)) {
                return;
            }

            this._url = options.url;

            var templatePromise: async.IThenable<Template> = this.__templateControlCache.read(id);
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
        loaded(): void {
            if (!this.__isFirst) {
                this._waitForTemplateControl(this.__templatePromise);
            }
        }

        /**
         * Removes the template from the template cache.
         */
        dispose(): void {
            if (this.__isFirst) {
                this.__templateControlCache.dispose();
            }
        }

        /**
         * Determines whether a URL or innerHTML is being used, 
         * creates the bindable template, and stores the template 
         * in a template cache for later use.
         */
        _initializeTemplate(): void {
            var id = this._id;

            if (isNull(id)) {
                return;
            }

            var parentNode = this.endNode.parentNode,
                url = this._url,
                template: any;

            if (!isNull(url)) {
                template = this.$TemplateCache.read(url);
                this.dom.clearNodeBlock(this.elementNodes, parentNode);
            } else {
                template = this.$Document.createDocumentFragment();
                this.dom.appendChildren(this.elementNodes, template);
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

                controlPromise = this.$Promise.resolve(this);
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
        _waitForTemplateControl(templatePromise: async.IThenable<Template>): void {
            var $exception: IExceptionStatic;
            templatePromise.then((templateControl: Template) => {
                if (!(isNull(this._url) || (this._url === templateControl._url))) {
                    $exception = acquire(__ExceptionStatic);
                    $exception.warn('The specified url: ' + this._url +
                        ' does not match the original plat-template with id: ' +
                        '"' + this._id + '". The original url will be loaded.',
                        $exception.TEMPLATE);
                }

                this.__mapBindableTemplates(templateControl);
                return this.bindableTemplates.bind(this._id);
            }).then((clone) => {
                var endNode = this.endNode;
                this.dom.insertBefore(endNode.parentNode, clone, endNode);
            }).catch((error) => {
                postpone(() => {
                    $exception = acquire(__ExceptionStatic);
                    $exception.warn('Problem resolving plat-template url: ' +
                        error.response, $exception.TEMPLATE);
                });
            });
        }

        private __mapBindableTemplates(control: Template): void {
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

    register.control(__Template, Template);
}
