module plat.ui {
    /**
     * A control used in a routeport for simulated page navigation. The 
     * control has navigation events that are called when navigating to and from the control.
     * It also provides functionality for setting the title of a page.
     */
    export class WebViewControl extends BaseViewControl {
        static titleElement: HTMLTitleElement;
        static descriptionElement: HTMLMetaElement;

        static setTitle(title: string) {
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

        static setDescription(description: string) {
            var element = WebViewControl.descriptionElement;

            if (!isNode(element)) {
                var $document = plat.acquire(plat.Document);
                element = WebViewControl.descriptionElement = <HTMLMetaElement>$document.head.querySelector('meta[name="description"]');

                if (!isNode(element)) {
                    element = WebViewControl.descriptionElement = <HTMLMetaElement>$document.head.appendChild($document.createElement('meta'));
                    element.setAttribute('name', 'description');
                }
            }

            element.setAttribute('content', description.replace(/\//g, ' '));
        }

        /**
         * The title of the page, corresponds to the textContent of the title element in the HTML head.
         */
        title = '';

        
        /**
         * The title of the page, corresponds to the content of the description meta element in the HTML head.
         */
        description = '';

        /**
         * Specifies the navigator for this control. Used for navigating to other IWebViewControls
         * in a routeport.
         */
        navigator: plat.navigation.IRoutingNavigator;

        constructor() {
            super();
            this.on('navigated', () => {
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
         * Allows the IWebViewControl set its title programmatically and have it reflect in the browser title.
         */
        setTitle(title: string) {
            this.title = title;
            WebViewControl.setTitle(title);
        }

        /**
         * Allows the IWebViewControl set its description programmatically and 
         * have it reflect in the browser meta description tag.
         */
        setDescription(description: string) {
            this.description = description;
            WebViewControl.setDescription(description);
        }
    }

    export interface IWebViewControl extends IBaseViewControl {
        /**
         * The title of the page, corresponds to the textContent of the title element in the HTML head.
         */
        title?: string;

        /**
         * Specifies the navigator for this control. Used for navigating to other IWebViewControls
         * in a routeport.
         */
        navigator?: plat.navigation.IRoutingNavigator;

        /**
         * Allows the IWebViewControl set its title programmatically and have it reflect in the browser title.
         */
        setTitle? (title: string): void;
    }
}
