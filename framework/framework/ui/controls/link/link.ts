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
    'use strict';

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
        protected static _inject: any = {
            _Router: __RouterStatic,
            _Injector: __InjectorStatic,
            _browser: __Browser
        };

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
         * @name _router
         * @memberof plat.ui.controls.Link
         * @kind property
         * @access protected
         * 
         * @type {plat.routing.RouterStatic}
         * 
         * @description
         * The {@link plat.routing.RouterStatic|RouterStatic} injectable instance
         */
        protected _Router: routing.IRouterStatic;

        /**
         * @name _browser
         * @memberof plat.ui.controls.Link
         * @kind property
         * @access protected
         * 
         * @type {plat.web.Browser}
         * 
         * @description
         * The {@link plat.web.Browser|Browser} injectable instance
         */
        protected _browser: web.Browser;

        /**
         * @name router
         * @memberof plat.ui.controls.Link
         * @kind property
         * @access public
         * 
         * @type {plat.routing.Router}
         * 
         * @description
         * The {@link plat.routing.Router|router} associated with this link.
         */
        router: routing.Router = this._Router.currentRouter();

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
        options: observable.IObservableProperty<ILinkOptions>;

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
         * @name initialize
         * @memberof plat.ui.controls.Link
         * @kind function
         * @access public
         * 
         * @description
         * Prevents default on the anchor tag if the href attribute is left empty, also determines internal links.
         * 
         * @returns {void}
         */
        initialize(): void {
            var element = this.element;

            this.addEventListener(element, 'click', (ev: Event): void => {
                ev.preventDefault();
            }, false);

            this.addEventListener(element, __tap, (ev: IExtendedEvent): void => {
                if (ev.buttons !== 1) {
                    return;
                }

                var href = this.getHref();
                if (isUndefined(href)) {
                    return;
                }

                ev.preventDefault();

                requestAnimationFrameGlobal((): void => {
                    this._browser.url(href);
                });

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
        getListener(element: HTMLAnchorElement): (ev: Event) => void {
            var cancel: IRemoveListener,
                listener = (ev: Event): void => {
                    ev.preventDefault();
                    this.removeClickListener();
                    cancel();
                    element.removeEventListener('click', listener);
                };

            cancel = defer((): void => {
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

            if (!isObject(this.options)) {
                return;
            }

            this.options.observe(() => {
                this.setHref();
            });
        }

        /**
         * @name setHref
         * @memberof plat.ui.controls.Link
         * @kind function
         * @access public
         * 
         * @description
         * Sets the element href to the one formed using the associated options.
         * 
         * @returns {void}
         */
        setHref(): void {
            var href = this.getHref();

            if (!isEmpty(href)) {
                this.element.href = href;
                this.element.setAttribute('data-href', href);
            }
        }

        /**
         * @name getHref
         * @memberof plat.ui.controls.Link
         * @kind function
         * @access public
         * 
         * @description
         * Determines the href based on the input options.
         * 
         * @returns {string} The href, normalized.
         */
        getHref(): string {
            if (isNull(this.router)) {
                return;
            }

            if (!isObject(this.options)) {
                return '';
            }

            var value = this.options.value;

            if (!isObject(value)) {
                return '';
            }

            var href = value.view;

            if (value.isUrl !== true) {
                var parameters = value.parameters,
                    query = value.query;

                if (isEmpty(href)) {
                    return href;
                }

                href = this.router.generate(href, parameters, query);
            }

            return this._browser.formatUrl(href);
        }
    }

    export interface ILinkOptions extends routing.INavigateOptions {
        view: any;
    }

    register.control(__Link, Link);
}
