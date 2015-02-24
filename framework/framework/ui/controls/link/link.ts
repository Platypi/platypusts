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
         * @name _router
         * @memberof plat.ui.controls.Link
         * @kind property
         * @access protected
         * 
         * @type {plat.routing.Router}
         * 
         * @description
         * The {@link plat.routing.Router|router} associated with this link.
         */
        protected _router: routing.Router = this._Router.currentRouter();

        /**
         * @name _removeClickListener
         * @memberof plat.ui.controls.Link
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * The a method for removing the click event listener for this control's element.
         */
        protected _removeClickListener: IRemoveListener;

        /**
         * @name initialize
         * @memberof plat.ui.controls.Link
         * @kind function
         * @access public
         * 
         * @description
         * Initializes both tap and click events.
         * 
         * @returns {void}
         */
        initialize(): void {
            var element = this.element;
            this._removeClickListener = this.dom.addEventListener(element, 'click', this._handleClick, false);
            this.addEventListener(element, __tap, this._handleTap, false);
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

            var options = this.options;
            if (!isObject(options)) {
                options = this.options = <observable.IObservableProperty<ILinkOptions>>{};
                options.value = <ILinkOptions>{ view: '' };
                return;
            } else if (!isObject(options.value)) {
                options.value = <ILinkOptions>{ view: '' };
            }

            options.observe(this.setHref.bind(this));
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
                var element = this.element;
                element.href = href;
                element.setAttribute('data-href', href);
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
            if (isNull(this._router)) {
                return;
            }

            var value = this.options.value,
                href = value.view;

            if (value.isUrl !== true) {
                var parameters = value.parameters,
                    query = value.query;

                if (isEmpty(href)) {
                    return href;
                }

                href = this._router.generate(href, parameters, query);
            }

            return this._browser.formatUrl(href);
        }

        /**
         * @name _handleClick
         * @memberof plat.ui.controls.Link
         * @kind function
         * @access protected
         * 
         * @description
         * Determines Whether or not the default click behavior should be prevented.
         * 
         * @returns {void}
         */
        protected _handleClick(ev: Event): void {
            var buttons: number;
            if (isNumber((<any>ev).buttons)) {
                if ((<any>ev).buttons === 0) {
                    buttons = 1;
                } else {
                    buttons = (<any>ev).buttons;
                }
            } else if (isNumber((<any>ev).which) && (<any>ev).which > 0) {
                buttons = (<any>ev).which;
            } else {
                switch ((<any>ev).button) {
                    case -1:
                        buttons = 0;
                        break;
                    case 0:
                        buttons = 1;
                        break;
                    case 1:
                        buttons = 4;
                        break;
                    case 2:
                        buttons = 2;
                        break;
                    case 3:
                        buttons = 8;
                        break;
                    case 4:
                        buttons = 16;
                        break;
                    default:
                        buttons = 1;
                        break;
                }
            }

            if (buttons === 1) {
                ev.preventDefault();
            }
        }

        /**
         * @name _handleTap
         * @memberof plat.ui.controls.Link
         * @kind function
         * @access protected
         * 
         * @description
         * Determines the proper link upon $tap.
         * 
         * @returns {void}
         */
        protected _handleTap(ev: IGestureEvent): void {
            if (ev.buttons !== 1) {
                return;
            }

            var href = this.getHref();
            if (isUndefined(href)) {
                return;
            }

            this.element.removeAttribute('data-href');
            ev.preventDefault();

            requestAnimationFrameGlobal((): void => {
                this._browser.url(href);
            });

            defer(this._removeClickListener, 3000);
        }
    }

    /**
     * @name ILinkOptions
     * @memberof plat.ui.controls
     * @kind interface
     * 
     * @extends {plat.routing.INavigateOptions}
     * 
     * @description
     * The available {@link plat.controls.Options|options} for the {@link plat.ui.controls.Link|Link} control.
     */
    export interface ILinkOptions extends routing.INavigateOptions {
        /**
         * @name view
         * @memberof plat.ui.controls.ILinkOptions
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * The view to which the Navigator should navigate. Can be specified by either a string path, the 
         * registered name of the view, or the registered Constructor.
         */
        view: any;
    }

    register.control(__Link, Link);
}
