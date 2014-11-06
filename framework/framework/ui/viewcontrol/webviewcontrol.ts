module plat.ui {
    /**
     * @name WebViewControl
     * @memberof plat.ui
     * @kind class
     * 
     * @extends {plat.ui.BaseViewControl}
     * @implements {plat.ui.IWebViewControl}
     * 
     * @description
     * A control used in a {@link plat.ui.controls.Routeport|Routeport} for simulated page navigation. The 
     * control has navigation events that are called when navigating to and from the control.
     * It also provides functionality for setting the title of a page.
     */
    export class WebViewControl extends BaseViewControl implements IWebViewControl {
        /**
         * @name titleElement
         * @memberof plat.ui.WebViewControl
         * @kind property
         * @access public
         * @static
         * 
         * @type {HTMLTitleElement}
         * 
         * @description
         * The title of the HTML web page.
         */
        static titleElement: HTMLTitleElement;
        /**
         * @name descriptionElement
         * @memberof plat.ui.WebViewControl
         * @kind property
         * @access public
         * @static
         * 
         * @type {HTMLMetaElement}
         * 
         * @description
         * The description meta tag.
         */
        static descriptionElement: HTMLMetaElement;

        /**
         * @name setTitle
         * @memberof plat.ui.WebViewControl
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Sets the title programmatically and has it reflect in the browser title.
         * 
         * @param {string} title The title to set.
         * 
         * @returns {void}
         */
        static setTitle(title: string): void {
            var element = WebViewControl.titleElement;

            if (!isNode(element)) {
                var $document = plat.acquire(plat.Document);
                element = WebViewControl.titleElement = <HTMLTitleElement>$document.head.querySelector('title');

                if (!isNode(element)) {
                    element = WebViewControl.titleElement = <HTMLTitleElement>$document.head.appendChild($document.createElement('title'));
                }
            }

            element.textContent = title.replace(/\//g, ' ');
        }

        /**
         * @name setDescription
         * @memberof plat.ui.WebViewControl
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Sets the meta description programmatically.
         * 
         * @param {string} description The description to set.
         * 
         * @returns {void}
         */
        static setDescription(description: string): void {
            var element = WebViewControl.descriptionElement;

            if (!isNode(element)) {
                var $document = plat.acquire(plat.Document);
                element = WebViewControl.descriptionElement = <HTMLMetaElement>$document.head.querySelector('meta[name="description"]');

                if (!isNode(element)) {
                    element = WebViewControl.descriptionElement =
                        <HTMLMetaElement>$document.head.appendChild($document.createElement('meta'));
                    element.setAttribute('name', 'description');
                }
            }

            element.setAttribute('content', description.replace(/\//g, ' '));
        }

        /**
         * @name title
         * @memberof plat.ui.WebViewControl
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The title of the page, corresponds to the textContent of the title element in the HTML head.
         */
        title = '';

        /**
         * @name description
         * @memberof plat.ui.WebViewControl
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The title of the page, corresponds to the content of the description meta element in the HTML head.
         */
        description = '';

        /**
         * @name navigator
         * @memberof plat.ui.WebViewControl
         * @kind property
         * @access public
         * 
         * @type {plat.navigation.IRoutingNavigator}
         * 
         * @description
         * Specifies the navigator for this control. Used for navigating to other {@link plat.ui.IWebViewControl|IWebViewControls} 
         * in a {@link plat.ui.controls.Routeport|Routeport}.
         */
        navigator: navigation.IRoutingNavigator;

        /**
         * @name constructor
         * @memberof plat.ui.WebViewControl
         * @kind function
         * @access public
         * 
         * @description
         * The constructor for a {@link plat.ui.WebViewControl|WebViewControl}. Sets the page title and description 
         * upon the navigation event occurring.
         * 
         * @returns {plat.ui.WebViewControl} A {@link plat.ui.WebViewControl|WebViewControl} instance.
         */
        constructor() {
            super();
            this.on(__navigated, () => {
                if (isEmpty(this.title)) {
                    this.title = '';
                }

                if (isEmpty(this.description)) {
                    this.description = '';
                }

                WebViewControl.setTitle(this.title);
                WebViewControl.setDescription(this.description);
            });
        }

        /**
         * @name setTitle
         * @memberof plat.ui.WebViewControl
         * @kind function
         * @access public
         * 
         * @description
         * Allows the {@link plat.ui.WebViewControl|WebViewControl} set its title programmatically and 
         * have it reflect in the browser title.
         * 
         * @param {string} title The title to set.
         * 
         * @returns {void}
         */
        setTitle(title: string): void {
            this.title = title;
            WebViewControl.setTitle(title);
        }

        /**
         * @name setDescription
         * @memberof plat.ui.WebViewControl
         * @kind function
         * @access public
         * 
         * @description
         * Allows the {@link plat.ui.WebViewControl|WebViewControl} set its description programmatically and 
         * have it reflect in the browser meta description tag.
         * 
         * @param {string} description The description to set.
         * 
         * @returns {void}
         */
        setDescription(description: string): void {
            this.description = description;
            WebViewControl.setDescription(description);
        }
    }

    /**
     * @name IWebViewControl
     * @memberof plat.ui
     * @kind interface
     * 
     * @extends {plat.ui.IBaseViewControl}
     * 
     * @description
     * Defines an object intended to be used inside of a {@link plat.ui.controls.Routeport|Routeport} 
     * to simulate page navigation.
     */
    export interface IWebViewControl extends IBaseViewControl {
        /**
         * @name title
         * @memberof plat.ui.IWebViewControl
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The title of the page, corresponds to the textContent of the title element in the HTML head.
         */
        title?: string;

        /**
         * @name description
         * @memberof plat.ui.IWebViewControl
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The title of the page, corresponds to the content of the description meta element in the HTML head.
         */
        description?: string;

        /**
         * @name navigator
         * @memberof plat.ui.IWebViewControl
         * @kind property
         * @access public
         * 
         * @type {plat.navigation.IRoutingNavigator}
         * 
         * @description
         * Specifies the navigator for this control. Used for navigating to other {@link plat.ui.IWebViewControl|IWebViewControls} 
         * in a {@link plat.ui.controls.Routeport|Routeport}.
         */
        navigator?: navigation.IRoutingNavigator;

        /**
         * @name setTitle
         * @memberof plat.ui.IWebViewControl
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Allows the {@link plat.ui.WebViewControl|WebViewControl} set its title programmatically and 
         * have it reflect in the browser title.
         * 
         * @param {string} title The title to set.
         * 
         * @returns {void}
         */
        setTitle? (title: string): void;

        /**
         * @name setDescription
         * @memberof plat.ui.IWebViewControl
         * @kind function
         * @access public
         * 
         * @description
         * Allows the {@link plat.ui.WebViewControl|WebViewControl} set its description programmatically and 
         * have it reflect in the browser meta description tag.
         * 
         * @param {string} description The description to set.
         * 
         * @returns {void}
         */
        setDescription(description: string): void;
    }
}
