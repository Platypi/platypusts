module plat.ui {
    /**
     * A control used in a routeport for simulated page navigation. The 
     * control has navigation events that are called when navigating to and from the control.
     * It also provides functionality for setting the title of a page.
     */
    export class WebViewControl extends BaseViewControl {
        static titleElement = plat.acquire(plat.Document).head.querySelector('title');

        static setTitle(title: string) {
            WebViewControl.titleElement.textContent = title.replace(/\//g, ' ');
        }

        /**
         * The title of the page, corresponds to the textContent of the title element in the HTML head.
         */
        title = '';

        /**
         * Specifies the navigator for this control. Used for navigating to other IWebViewControls
         * in a routeport.
         */
        navigator: plat.navigation.IRoutingNavigator;

        constructor() {
            super();
            this.on('navigated', () => {
                if (this.title.length === 0) {
                    return;
                }

                WebViewControl.setTitle(this.title);
            });
        }

        /**
         * Allows the IWebViewControl set its title programmatically and have it reflect in the browser title.
         */
        setTitle(title: string) {
            this.title = title;
            WebViewControl.setTitle(this.title);
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
