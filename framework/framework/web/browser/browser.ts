module plat.web {
    /**
     * The class that handles all interaction with the browser.
     */
    export class Browser implements IBrowser {
        static config: IBrowserConfig = {
            NONE: 'none',
            HASH: 'hash',
            STATE: 'state',
            routingType: 'none',
            hashPrefix: '',
            baseUrl: ''
        };

        $EventManagerStatic: events.IEventManagerStatic = acquire('$EventManagerStatic');
        $Compat: ICompat = acquire('$Compat');
        $Regex: expressions.IRegex = acquire('$Regex');
        $Window: Window = acquire('$Window');
        $Dom: ui.IDom = acquire('$Dom');

        uid: string;

        private __currentUrl: string;
        private __lastUrl = this.$Window.location.href;
        private __initializing = false;

        constructor() {
            var ContextManager: observable.IContextManagerStatic = acquire('$ContextManagerStatic');
            ContextManager.defineGetter(this, 'uid', uniqueId('plat_'));
            this.$EventManagerStatic.on(this.uid, 'beforeLoad', this.initialize, this);
        }

        initialize(): void {
            var $config = Browser.config,
                $compat = this.$Compat;

            this.$EventManagerStatic.dispose(this.uid);

            if ($config.routingType === $config.NONE) {
                return;
            }

            this.__initializing = true;

            var url = this.url(),
                trimmedUrl = url.replace(this.$Regex.initialUrlRegex, '/'),
                changed = this._urlChanged.bind(this),
                $dom = this.$Dom,
                $window = this.$Window;

            if (isEmpty($config.baseUrl)) {
                acquire('$UrlUtilsInstance');
            }

            if (trimmedUrl !== url) {
                this.url(trimmedUrl, true);
            }

            if ($compat.pushState) {
                if ($config.routingType === $config.STATE) {
                    this.url($config.baseUrl, true);
                }

                $dom.addEventListener($window, 'popstate', changed, false);
            }

            $dom.addEventListener($window, 'hashchange', changed, false);

            this.__initializing = false;
        }

        url(url?: string, replace?: boolean): string {
            var location = this.$Window.location;

            if (isString(url) && this.__lastUrl !== url) {
                this.__lastUrl = url;
                this._setUrl(url, replace);
            }
            return this.__currentUrl || location.href;
        }

        urlUtils(url?: string): IUrlUtilsInstance {
            url = url || this.url();

            var $urlUtils: IUrlUtilsInstance = acquire('$UrlUtilsInstance'),
                $config = Browser.config;

            if ($config.routingType === $config.HASH) {
                url = url.replace(new RegExp('#' + ($config.hashPrefix || '') + '/?'), '');
            }

            $urlUtils.initialize(url);

            return $urlUtils;
        }

        isCrossDomain(url: string): boolean {
            if (!isString(url)) {
                return false;
            }

            var urlUtils = this.urlUtils(url),
                locationUtils = this.urlUtils();

            // check for protocol:host:port mismatch
            return urlUtils.protocol !== locationUtils.protocol ||
                urlUtils.hostname !== locationUtils.hostname ||
                urlUtils.port !== locationUtils.port;
        }

        /**
         * The event to fire in the case of a URL change. It kicks 
         * off a 'urlChanged' direct event notification.
         */
        _urlChanged(): void {
            if (this.__initializing) {
                return;
            }

            this.__currentUrl = null;
            var url = this.url();

            if (this.__lastUrl === url) {
                return;
            }

            this.__lastUrl = url;

            var $manager = this.$EventManagerStatic;
            $manager.dispatch('urlChanged',
                this,
                $manager.DIRECT,
                [this.urlUtils()]);
        }

        /**
         * Checks for the existence of pushState and 
         * sets the browser URL accordingly.
         * 
         * @param url The URL to set.
         * @param replace Whether or not to replace the 
         * current URL in the history.
         */
        _setUrl(url: string, replace?: boolean): void {
            url = this._formatUrl(url);
            if (this.$Compat.pushState) {
                if (replace) {
                    history.replaceState(null, '', url);
                } else {
                    history.pushState(null, '', url);
                }

                if (!this.__initializing) {
                    this._urlChanged();
                }
            } else {
                this.__currentUrl = url;
                if (replace) {
                    location.replace(url);
                } else {
                    location.href = url;
                }
            }
        }

        /**
         * Formats the URL in the case of HASH routing.
         * 
         * @param url The URL to format.
         */
        _formatUrl(url: string): string {
            var $config = Browser.config;
            if ($config.routingType === $config.HASH) {
                var hasProtocol = url.indexOf(this.urlUtils().protocol) !== -1,
                    prefix = $config.hashPrefix || '',
                    hashRegex = new RegExp('#' + prefix + '|#/');

                if (hasProtocol && !hashRegex.test(url)) {
                    url = url + '#' + prefix + '/';
                } else if (!hashRegex.test(url)) {
                    url = '#' + prefix + '/' + url;
                }
            }

            return url;
        }
    }

    /**
     * The Type for referencing the '$Browser' injectable as a dependency.
     */
    export function IBrowser(): IBrowser {
        return new Browser();
    }

    register.injectable('$Browser', IBrowser);

    /**
     * Defines an object that handles interaction with the browser.
     */
    export interface IBrowser {
        /**
         * A unique string identifier.
         */
        uid: string;

        /**
         * Initializes the Browser instance, trims the url, and 
         * adds events for popstate and hashchange.
         */
        initialize(): void;

        /**
         * Sets or gets the current $Window.location
         * 
         * @param url The URL to set the location to.
         * @param replace Whether or not to replace the current URL in 
         * the history.
         */
        url(url?: string, replace?: boolean): string;

        /**
         * Creates a new IUrlUtils object
         * 
         * @param url The URL to associate with the new UrlUtils 
         * instance.
         */
        urlUtils(url?: string): IUrlUtilsInstance;

        /**
         * Checks to see if the requested URL is cross domain.
         */
        isCrossDomain(url: string): boolean;
    }

    /**
     * The Type for referencing the '$BrowserConfig' injectable as a dependency.
     */
    export function IBrowserConfig(): IBrowserConfig {
        return Browser.config;
    }

    register.injectable('$BrowserConfig', IBrowserConfig);

    /**
     * Specifies configuration properties for the IBrowser 
     * injectable.
     */
    export interface IBrowserConfig {
        /**
         * Specifies that the application will not be doing 
         * url-based routing.
         */
        NONE: string;

        /**
         * Specifies that the application wants to use hash-based 
         * routing.
         */
        HASH: string;

        /**
         * Specifies that the application wants to use the HTML5 
         * popstate method for managing routing. If the browser 
         * does not support HTML5 popstate events, hash routing 
         * will be used instead.
         * 
         * Note: In 'state' mode, the web server must be configured to 
         * route every url to the root url.
         */
        STATE: string;

        /**
         * Allows you to define how your app will route. There are
         * three modes, 'none', 'hash', and 'state'. 
         * 
         * In 'none' mode, the application will not be responding to 
         * url changes.
         * 
         * In 'hash' mode, the application will use a hash prefix and 
         * all navigation will be managed with hash changes.
         * 
         * In 'state' mode, the application will use the 'popstate' 
         * event and will be able to manage routes. The web server 
         * must be configured to route every url to the root url if 
         * using 'state' mode.
         * 
         * The default mode is NONE
         */
        routingType: string;

        /**
         * If routingType is set to 'hash', this value will be 
         * appended to the '#' at the beginning of every route. The 
         * default prefix is '!', meaning each path will be '#!/<path>'.
         */
        hashPrefix: string;

        /**
         * Specifies the base url used to normalize url routing.
         */
        baseUrl: string;
    }
}
