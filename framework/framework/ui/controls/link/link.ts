/**
 * @name controls
 * @memberof plat.ui
 * @kind namespace
 * @access public
 * 
 * @description
 * Holds classes and interfaces related to UI control components in platypus.
 */
module plat.ui.controls {
    /**
     * @name Link
     * @memberof plat.ui.controls
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * 
     * @description
     * A {@link plat.ui.TemplateControl|TemplateControl} for adding additonal 
     * functionality to a native HTML anchor tag.
     */
    export class Link extends TemplateControl {
        /**
         * @name replaceWith
         * @memberof plat.ui.controls.Link
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Replaces the {@link plat.ui.controls.Link|Link's} element with a native anchor tag.
         */
        replaceWith = 'a';

        /**
         * @name element
         * @memberof plat.ui.controls.Link
         * @kind property
         * @access public
         * 
         * @type {HTMLAnchorElement}
         * 
         * @description
         * The control's anchor element.
         */
        element: HTMLAnchorElement;

        /**
         * @name removeClickListener
         * @memberof plat.ui.controls.Link
         * @kind property
         * @access public
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * The a method for removing the click event listener for this control's element.
         */
        removeClickListener: IRemoveListener = noop;

        /**
         * @name $browserConfig
         * @memberof plat.ui.controls.Link
         * @kind property
         * @access public
         * 
         * @type {plat.web.IBrowserConfig}
         * 
         * @description
         * The {@link plat.web.IBrowserConfig|IBrowserConfig} injectable instance
         */
        $browserConfig: web.IBrowserConfig = acquire(__BrowserConfig);

        /**
         * @name $browser
         * @memberof plat.ui.controls.Link
         * @kind property
         * @access public
         * 
         * @type {plat.web.IBrowser}
         * 
         * @description
         * The {@link plat.web.IBrowser|IBrowser} injectable instance
         */
        $browser: web.IBrowser = acquire(__Browser);

        /**
         * @name options
         * @memberof plat.ui.controls.Link
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IObservableProperty<{ ignore?: boolean; }>}
         * 
         * @description
         * The options for Anchor, if ignore is true, anchor will ignore changing the url.
         */
        options: observable.IObservableProperty<{ ignore?: boolean; }>;

        /**
         * @name initialize
         * @memberof plat.ui.controls.Link
         * @kind function
         * @access public
         * 
         * @description
         * Prevents default on the anchor tag if the href attribute is left empty, also normalizes internal links.
         * 
         * @returns {void}
         */
        initialize(): void {
            var element = this.element;

            this.removeClickListener = this.addEventListener(element, 'click', (ev: Event) => {
                ev.preventDefault();
                this.removeClickListener();
            });

            this.addEventListener(element, __tap, (ev: Event) => {
                var href = this.getHref();

                if (isUndefined(href)) {
                    return;
                }

                ev.preventDefault();

                if (isEmpty(href)) {
                    return;
                }

                this.$browser.url(href);
                this.removeClickListener();
                element.addEventListener('click', this.getListener(element));
            }, false);
        }

        /**
         * @name getListener
         * @memberof plat.ui.controls.Link
         * @kind function
         * @access public
         * 
         * @description
         * Returns a click event listener. Also handles disposing of the listener.
         * 
         * @returns {(ev: Event) => void} The click event listener.
         */
        getListener(element: HTMLAnchorElement) {
            var listener = (ev: Event) => {
                ev.preventDefault();
                this.removeClickListener();
                cancel();
                element.removeEventListener('click', listener);
            };

            var cancel = defer(() => {
                element.removeEventListener('click', listener);
            }, 3000);

            return listener;
        }

        /**
         * @name loaded
         * @memberof plat.ui.controls.Link
         * @kind function
         * @access public
         * 
         * @description
         * Calls to normalize the href for internal links.
         * 
         * @returns {void}
         */
        loaded(): void {
            this.setHref();
        }

        /**
         * @name setHref
         * @memberof plat.ui.controls.Link
         * @kind function
         * @access public
         * 
         * @description
         * Calls to normalizes the href for internal links and resets the href is necessary.
         * 
         * @returns {void}
         */
        setHref(): void {
            var options = this.options;

            if (isObject(options) && options.value.ignore) {
                return;
            }

            var href = this.getHref();

            if (!isEmpty(href)) {
                this.element.href = href;
            }
        }

        /**
         * @name getHref
         * @memberof plat.ui.controls.Link
         * @kind function
         * @access public
         * 
         * @description
         * Normalizes the href for internal links, ignores external links.
         * 
         * @returns {string} The href, normalized.
         */
        getHref(): string {
            var options = this.options;

            if (isObject(options) && options.value.ignore) {
                return;
            }

            var element = this.element,
                href = element.href || '',
                $browserConfig = this.$browserConfig,
                baseUrl = $browserConfig.baseUrl.slice(0, -1),
                routingType = $browserConfig.routingType,
                usingHash = routingType !== $browserConfig.STATE,
                prefix = $browserConfig.hashPrefix;

            if (isEmpty(href) || href.indexOf(baseUrl) === -1) {
                return href;
            }

            var urlWithHash = baseUrl + '/#';

            if (usingHash && href.indexOf('#') === -1) {
                href = urlWithHash + prefix + href.replace(baseUrl, '');
            } else if (!usingHash && href.indexOf(urlWithHash) > -1 && href !== urlWithHash) {
                href = baseUrl + href.replace(baseUrl, '').slice(2 + prefix.length);
            }

            return href;
        }
    }

    register.control(__Link, Link);

    export class Link2 extends TemplateControl {
        /**
         * @name replaceWith
         * @memberof plat.ui.controls.Link
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Replaces the {@link plat.ui.controls.Link|Link's} element with a native anchor tag.
         */
        replaceWith = 'a';

        $RouterStatic: typeof routing.Router = acquire(__RouterStatic);
        router: routing.Router;

        /**
         * @name $browserConfig
         * @memberof plat.ui.controls.Link
         * @kind property
         * @access public
         * 
         * @type {plat.web.IBrowserConfig}
         * 
         * @description
         * The {@link plat.web.IBrowserConfig|IBrowserConfig} injectable instance
         */
        $browserConfig: web.IBrowserConfig = acquire(__BrowserConfig);

        /**
         * @name $browser
         * @memberof plat.ui.controls.Link
         * @kind property
         * @access public
         * 
         * @type {plat.web.IBrowser}
         * 
         * @description
         * The {@link plat.web.IBrowser|IBrowser} injectable instance
         */
        $browser: web.IBrowser = acquire(__Browser);

        /**
         * @name options
         * @memberof plat.ui.controls.Link
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IObservableProperty<{ view: any; parameters?: plat.IObject<string>; }>}
         * 
         * @description
         * The options for Link, if ignore is true, anchor will ignore changing the url.
         */
        options: observable.IObservableProperty<{ view: any; parameters?: IObject<string>; }>;

        $Injector: typeof dependency.Injector = acquire(__InjectorStatic);

        /**
         * @name element
         * @memberof plat.ui.controls.Link
         * @kind property
         * @access public
         * 
         * @type {HTMLAnchorElement}
         * 
         * @description
         * The control's anchor element.
         */
        element: HTMLAnchorElement;

        /**
         * @name removeClickListener
         * @memberof plat.ui.controls.Link
         * @kind property
         * @access public
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * The a method for removing the click event listener for this control's element.
         */
        removeClickListener: IRemoveListener = noop;

        constructor() {
            super();
            this.router = this.$RouterStatic.currentRouter();
        }

        /**
         * @name initialize
         * @memberof plat.ui.controls.Link
         * @kind function
         * @access public
         * 
         * @description
         * Prevents default on the anchor tag if the href attribute is left empty, also normalizes internal links.
         * 
         * @returns {void}
         */
        initialize(): void {
            var element = this.element;

            this.removeClickListener = this.addEventListener(element, 'click', (ev: Event) => {
                ev.preventDefault();
                this.removeClickListener();
            });

            this.addEventListener(element, __tap, (ev: Event) => {
                var href = this.getHref();

                if (isUndefined(href)) {
                    return;
                }

                ev.preventDefault();

                if (isEmpty(href)) {
                    return;
                }

                this.$browser.url(href);
                this.removeClickListener();
                element.addEventListener('click', this.getListener(element));
            }, false);
        }

        /**
         * @name getListener
         * @memberof plat.ui.controls.Link
         * @kind function
         * @access public
         * 
         * @description
         * Returns a click event listener. Also handles disposing of the listener.
         * 
         * @returns {(ev: Event) => void} The click event listener.
         */
        getListener(element: HTMLAnchorElement) {
            var listener = (ev: Event) => {
                ev.preventDefault();
                this.removeClickListener();
                cancel();
                element.removeEventListener('click', listener);
            };

            var cancel = defer(() => {
                element.removeEventListener('click', listener);
            }, 3000);

            return listener;
        }

        /**
         * @name loaded
         * @memberof plat.ui.controls.Link
         * @kind function
         * @access public
         * 
         * @description
         * Calls to normalize the href for internal links.
         * 
         * @returns {void}
         */
        loaded(): void {
            this.setHref();
        }

        /**
         * @name setHref
         * @memberof plat.ui.controls.Link
         * @kind function
         * @access public
         * 
         * @description
         * Calls to normalizes the href for internal links and resets the href is necessary.
         * 
         * @returns {void}
         */
        setHref(): void {
            var href = this.getHref();

            if (!isEmpty(href)) {
                this.element.href = href;
            }
        }

        /**
         * @name getHref
         * @memberof plat.ui.controls.Link
         * @kind function
         * @access public
         * 
         * @description
         * Normalizes the href for internal links, ignores external links.
         * 
         * @returns {string} The href, normalized.
         */
        getHref(): string {
            var $browserConfig = this.$browserConfig,
                baseUrl = $browserConfig.baseUrl.slice(0, -1),
                routingType = $browserConfig.routingType,
                usingHash = routingType !== $browserConfig.STATE,
                prefix = $browserConfig.hashPrefix,
                options = this.options || {},
                value = this.options.value;

            if (!isObject(value)) {
                return '';
            }

            var href = value.view,
                parameters = value.parameters;

            if (isEmpty(href)) {
                return href;
            }

            href = this.$Injector.convertDependency(href);

            var path = this.router.generate(href, parameters);

            if (usingHash && href.indexOf('#') === -1) {
                href = baseUrl + '/#' + prefix + path;
            } else {
                href = baseUrl + path;
            }

            return href;
        }
    }


    register.control(__Link + 2, Link2);
}
