/**
 * @name controls
 * @memberof plat.ui
 * @kind namespace
 * @access public
 *
 * @description
 * Holds classes and interfaces related to UI control components in platypus.
 */
namespace plat.ui.controls {
    'use strict';

    /**
     * @name Link
     * @memberof plat.ui.controls
     * @kind class
     *
     * @extends {plat.ui.TemplateControl}
     *
     * @description
     * A {@link plat.ui.TemplateControl|TemplateControl} for adding additional
     * functionality to a native HTML anchor tag.
     */
    export class Link extends TemplateControl {
        protected static _inject: any = {
            _Router: __RouterStatic,
            _Injector: __InjectorStatic,
            _browser: __Browser,
            _window: __Window,
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
        public replaceWith: string = 'a';

        /**
         * @name options
         * @memberof plat.ui.controls.Link
         * @kind property
         * @access public
         *
         * @type {plat.observable.IObservableProperty<plat.ui.controls.ILinkOptions>}
         *
         * @description
         * The options for Link, if ignore is true, anchor will ignore changing the url.
         */
        public options: observable.IObservableProperty<ILinkOptions>;

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
        public element: HTMLAnchorElement;

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
         * @name _window
         * @memberof plat.ui.controls.Link
         * @kind property
         * @access protected
         *
         * @type {Window}
         *
         * @description
         * Reference to the Window injectable.
         */
        protected _window: Window;

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
         * @name _allowClick
         * @memberof plat.ui.controls.Link
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * A property that when set allows for the next click event to process.
         */
        protected _allowClick = false;

        /**
         * @name initialize
         * @memberof plat.ui.controls.Link
         * @kind function
         * @access public
         *
         * @description
         * Initializes click event.
         *
         * @returns {void}
         */
        public initialize(): void {
            this._removeClickListener = this.dom.addEventListener(
                this.element,
                'click',
                this._handleClick.bind(this),
                false
            );
        }

        /**
         * @name loaded
         * @memberof plat.ui.controls.Link
         * @kind function
         * @access public
         *
         * @description
         * Calls to normalize the href for internal links and initializes the tap event.
         *
         * @returns {void}
         */
        public loaded(): void {
            let options = this.options;
            const setHref = this.setHref.bind(this);

            if (!isObject(options)) {
                this._log.warn(
                    `No options specified for ${
                        this.type
                    }. Please send in options of type plat.ui.controls.ILinkOptions.`
                );
                options = this.options = <observable.IObservableProperty<
                    ILinkOptions
                >>{};
                options.value = <ILinkOptions>{ view: '' };
                this.setHref();

                return;
            } else if (!isObject(options.value)) {
                options.value = <ILinkOptions>{ view: '' };
            }

            this.addEventListener(this.element, __tap, this._handleTap, false);

            setHref();
            options.observe(setHref);
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
        public setHref(): void {
            const href = this.getHref();

            if (!isEmpty(href)) {
                const element = this.element;
                element.href = href;
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
        public getHref(): string {
            if (isNull(this._router)) {
                return;
            }

            const value = this.options.value;
            let href = value.view;

            if (value.isUrl !== true) {
                const parameters = value.parameters;
                const query = value.query;

                if (isEmpty(href)) {
                    return href;
                }

                href = this._router.generate(href, parameters, query);
            }

            return this._browser.formatUrl(href);
        }

        /**
         * @name dispose
         * @memberof plat.ui.controls.Link
         * @kind function
         * @access public
         *
         * @description
         * Calls to remove the click eater after a delay.
         *
         * @returns {void}
         */
        public dispose(): void {
            defer(this._removeClickListener, 3000);
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
            if (this._allowClick) {
                this._allowClick = false;

                return;
            }

            let buttons: number;

            if (isNumber((<any>ev).buttons) && (<any>ev).buttons !== 0) {
                buttons = (<any>ev).buttons;
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

            const href = this.getHref();
            if (isUndefined(href)) {
                return;
            }

            const target = this.element.target;
            if (isEmpty(target) || target === __SELF) {
                ev.preventDefault();

                requestAnimationFrameGlobal((): void => {
                    this._browser.url(href);
                });

                return;
            }

            this._allowClick = true;
            // force call click to handle delay
            this.element.click();
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
