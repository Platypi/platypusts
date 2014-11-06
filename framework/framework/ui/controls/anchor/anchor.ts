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
     * @name Anchor
     * @memberof plat.ui.controls
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * 
     * @description
     * A {@link plat.ui.TemplateControl|TemplateControl} for adding additonal 
     * functionality to a native HTML anchor tag.
     */
    export class Anchor extends TemplateControl {
        /**
         * @name replaceWith
         * @memberof plat.ui.controls.Anchor
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Replaces the {@link plat.ui.controls.Anchor|Anchor's} element with a native anchor tag.
         */
        replaceWith = 'a';

        /**
         * @name element
         * @memberof plat.ui.controls.Anchor
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
         * @name $browserConfig
         * @memberof plat.ui.controls.Anchor
         * @kind property
         * @access public
         * 
         * @type {plat.web.IBrowserConfig}
         * 
         * @description
         * The {@link plat.web.IBrowserConfig|IBrowserConfig} injectable instance
         */
        $browserConfig: plat.web.IBrowserConfig = acquire(__BrowserConfig);

        /**
         * @name $browser
         * @memberof plat.ui.controls.Anchor
         * @kind property
         * @access public
         * 
         * @type {plat.web.IBrowser}
         * 
         * @description
         * The {@link plat.web.IBrowser|IBrowser} injectable instance
         */
        $browser: plat.web.IBrowser = acquire(__Browser);

        /**
         * @name initialize
         * @memberof plat.ui.controls.Anchor
         * @kind function
         * @access public
         * 
         * @description
         * Prevents default on the anchor tag if the href attribute is left empty, also normalizes internal links.
         * 
         * @returns {void}
         */
        initialize(): void {
            var element = this.element,
                $browserConfig = this.$browserConfig,
                baseUrl = $browserConfig.baseUrl.slice(0, -1);

            this.addEventListener(element, 'click', (ev: Event) => {
                var href = this.getHref();

                if (isUndefined(href)) {
                    return;
                }

                ev.preventDefault();

                if (isEmpty(href)) {
                    return;
                }

                this.$browser.url(href);
            }, false);
        }

        /**
         * @name loaded
         * @memberof plat.ui.controls.Anchor
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
         * @memberof plat.ui.controls.Anchor
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
         * @memberof plat.ui.controls.Anchor
         * @kind function
         * @access public
         * 
         * @description
         * Normalizes the href for internal links, ignores external links.
         * 
         * @returns {string} The href, normalized.
         */
        getHref(): string {
            var element = this.element,
                href = element.href || '',
                $browserConfig = this.$browserConfig,
                baseUrl = $browserConfig.baseUrl.slice(0, -1),
                routingType = $browserConfig.routingType,
                usingHash = routingType !== $browserConfig.STATE,
                prefix = $browserConfig.hashPrefix;

            if (href.indexOf(baseUrl) === -1) {
                return;
            }

            if (isEmpty(href)) {
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

    register.control(__Anchor, Anchor);
}
