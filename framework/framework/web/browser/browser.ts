module plat.web {
    /**
     * The class that handles all interaction with the browser.
     */
    export class Browser implements IBrowser {
        /**
         * A unique string identifier.
         */
        uid: string;
        $EventManagerStatic: events.IEventManagerStatic = acquire('$EventManagerStatic');
        $compat: ICompat = acquire('$compat');
        $config: IBrowserConfig = acquire('$browser.config');
        $regex: expressions.IRegex = acquire('$regex');
        $window: Window = acquire('$window');
        private __currentUrl: string;
        private __lastUrl = this.$window.location.href;
        private __initializing = false;
        constructor() {
            var ContextManager: observable.IContextManagerStatic = acquire('$ContextManagerStatic');
            ContextManager.defineGetter(this, 'uid', uniqueId('plat_'));
            this.$EventManagerStatic.on(this.uid, 'beforeLoad', this.initialize, this);
        }

        /**
         * Initializes the Browser instance, trims the url, and 
         * adds events for popstate and hashchange.
         */
        initialize() {
            var config = this.$config,
                compat = this.$compat;

            this.$EventManagerStatic.dispose(this.uid);

            if (config.routingType === config.routeType.NONE) {
                return;
            }

            this.__initializing = true;

            var url = this.url(),
                trimmedUrl = url.replace(this.$regex.initialUrlRegex, '/'),
                changed = this._urlChanged.bind(this);

            if (isEmpty(config.baseUrl)) {
                acquire('$urlUtils');
            }

            if (trimmedUrl !== url) {
                this.url(trimmedUrl, true);
            }

            if (compat.pushState) {
                if (config.routingType === config.routeType.STATE) {
                    this.url(config.baseUrl, true);
                }
                this.$window.addEventListener('popstate', changed, false);
            }

            this.$window.addEventListener('hashchange', changed, false);

            this.__initializing = false;
        }

        /**
         * Sets or gets the current $window.location
         * 
         * @param url The URL to set the location to.
         * @param replace Whether or not to replace the current URL in 
         * the history.
         */
        url(url?: string, replace?: boolean) {
            var location = this.$window.location;

            if (isString(url) && this.__lastUrl !== url) {
                this.__lastUrl = url;
                this._setUrl(url, replace);
            }
            return this.__currentUrl || location.href;
        }

        /**
         * Creates a new IUrlUtils object
         * 
         * @param url The URL to associate with the new UrlUtils 
         * instance.
         */
        urlUtils(url?: string) {
            url = url || this.url();

            var utils: IUrlUtils = acquire('$urlUtils'),
                config = this.$config;

            if (config.routingType === config.routeType.HASH) {
                url = url.replace(new RegExp('#' + (config.hashPrefix || '') + '/?'), '');
            }

            utils.initialize(url);

            return utils;
        }

        /**
         * Checks to see if the requested URL is cross domain.
         * 
         * @param url The URL to check.
         */
        isCrossDomain(url: string) {
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
        _urlChanged() {
            if (this.__initializing) {
                return;
            }

            this.__currentUrl = null;
            var url = this.url();

            if (this.__lastUrl === url) {
                return;
            }

            this.__lastUrl = url;

            var manager = this.$EventManagerStatic;
            manager.dispatch('urlChanged',
                this,
                manager.direction.DIRECT,
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
        _setUrl(url: string, replace?: boolean) {
            url = this._formatUrl(url);
            if (this.$compat.pushState) {
                if (replace) {
                    history.replaceState(null, '', url);
                } else {
                    history.pushState(null, '', url);
                }
                this._urlChanged();
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
        _formatUrl(url: string) {
            var config = this.$config;
            if (config.routingType === config.routeType.HASH) {
                var hasProtocol = url.indexOf(this.urlUtils().protocol) !== -1,
                    prefix = this.$config.hashPrefix || '',
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

    register.injectable('$browser', Browser);

    /**
     * A class that deals with obtaining detailed information about an 
     * associated URL.
     */
    export class UrlUtils implements IUrlUtils {
        private static __urlUtilsElement: HTMLAnchorElement;
        private static __getQuery(search: string) {
            if (isEmpty(search)) {
                return <IObject<string>>{};
            }

            var split = search.split('&'),
                query: IObject<string> = {},
                length = split.length,
                item,
                define = (<observable.IContextManagerStatic>acquire('$ContextManagerStatic')).defineGetter;

            for (var i = 0; i < length; ++i) {
                item = split[i].split('=');

                define(query, item[0], item[1]);
            }

            return query;
        }

        /**
         * Obtains the base URL for doing STATE type routing
         * 
         * @param url The initial URL passed into the Browser.
         */
        private static __getBaseUrl(url: string) {
            var colon = url.substring(url.indexOf(':')),
                next = colon.substring(colon.search(/\w+/));

            return url.substring(0, url.indexOf('/', url.indexOf(next))) + '/';
        }

        /**
         * The whole associated URL.
         */
        href: string;

        /**
         * The protocol scheme of the URL, including the final ':' of the associated URL.
         */
        protocol: string;

        /**
         * The hostname and port of the associated URL.
         */
        host: string;

        /**
         * The domain of the associated uRL.
         */
        hostname: string;

        /**
         * The port number of the associated URL.
         */
        port: string;

        /**
         * The additional path value in the associated URL preceded by a '/'.
         */
        pathname: string;

        /**
         * A '?' followed by the included parameters in the associated URL.
         */
        search: string;

        /**
         * A '#' followed by the included hash fragments in the associated URL.
         */
        hash: string;

        /**
         * The username specified before the domain name in the associated URL.
         */
        username: string;

        /**
         * The password specified before the domain name in the associated URL.
         */
        password: string;

        /**
         * The origin of the associated URL (its protocol, domain, and port).
         */
        origin: string;

        /**
         * An object containing keyed query arguments from the associated URL.
         */
        query: IObject<string>;
        $ContextManagerStatic: observable.IContextManagerStatic = acquire('$ContextManagerStatic');
        $document: Document = acquire('$document');
        $window: Window = acquire('$window');
        $compat: ICompat = acquire('$compat');
        $regex: expressions.IRegex = acquire('$regex');
        $config: IBrowserConfig = acquire('$browser.config');

        constructor() {
            var config = this.$config;
            if (isEmpty(config.baseUrl)) {
                var url = this.$window.location.href,
                    trimmedUrl = url.replace(this.$regex.initialUrlRegex, '/');

                if (config.routingType === config.routeType.HASH) {
                    config.baseUrl = trimmedUrl.replace(/#.*/, '');
                } else {
                    config.baseUrl = UrlUtils.__getBaseUrl(trimmedUrl);
                }
            }
        }

        /**
         * Initiializes this instance of the UrlUtils and defines its properties using 
         * the input url.
         * 
         * @param url The input to associate with this instance of UrlUtils.
         */
        initialize(url: string) {
            url = url || '';

            var element = UrlUtils.__urlUtilsElement ||
                (UrlUtils.__urlUtilsElement = this.$document.createElement('a')),
                define = this.$ContextManagerStatic.defineGetter;

            // always make local urls relative to start page.
            if (url[0] === '/') {
                url = url.substr(1);
            }

            element.setAttribute('href', url);
            url = element.href;

            // We need to do this twice for cerain browsers (e.g. win8)
            element.setAttribute('href', url);
            url = element.href;

            var protocol = element.protocol ? element.protocol.replace(/:$/, '') : '';

            // Cordova adds //www for some urls, so we want to take those out.
            if (protocol.indexOf('http') === -1 && protocol.indexOf('ms-appx') === -1) {
                url = url.replace('//', '');
            }

            define(this, 'href', url, true, true);
            define(this, 'protocol', element.protocol ? element.protocol.replace(/:$/, '') : '', true, true);
            define(this, 'host', element.host, true, true);
            define(this, 'search', element.search ? element.search.replace(/^\?/, '') : '', true, true);
            define(this, 'hash', element.hash ? element.hash.replace(/^#/, '') : '', true, true);
            define(this, 'hostname', element.hostname, true, true);
            define(this, 'port', element.port, true, true);

            var path;

            if (!isEmpty(this.$config.baseUrl)) {
                path = url.replace(this.$config.baseUrl, '/');
            } else {
                path = (element.pathname.charAt(0) === '/')
                    ? element.pathname
                    : '/' + element.pathname;
            }

            define(this, 'pathname', path, true, true);
            define(this, 'query', UrlUtils.__getQuery(this.search), true, true);
        }

        /**
         * Allows the UrlUtils instance to display its href property when the toString 
         * method is called.
         */
        toString() {
            return this.href;
        }
    }

    register.injectable('$urlUtils', UrlUtils, null, register.injectableType.MULTI);

    /**
     * Defines an object that deals with obtaining detailed information about an 
     * associated URL.
     */
    export interface IUrlUtils {
        /**
         * The whole associated URL.
         */
        href: string;

        /**
         * The protocol scheme of the URL, including the final ':' of the associated URL.
         */
        protocol: string;

        /**
         * The hostname and port of the associated URL.
         */
        host: string;

        /**
         * The domain of the associated uRL.
         */
        hostname: string;

        /**
         * The port number of the associated URL.
         */
        port: string;

        /**
         * The additional path value in the associated URL preceded by a '/'.
         */
        pathname: string;

        /**
         * A '?' followed by the included parameters in the associated URL.
         */
        search: string;

        /**
         * A '#' followed by the included hash fragments in the associated URL.
         */
        hash: string;

        /**
         * The username specified before the domain name in the associated URL.
         */
        username?: string;

        /**
         * The password specified before the domain name in the associated URL.
         */
        password?: string;

        /**
         * The origin of the associated URL (its protocol, domain, and port).
         */
        origin?: string;

        /**
         * An object containing keyed query arguments from the associated URL.
         */
        query?: IObject<string>;

        /**
         * Initiializes this IUrlUtils and defines its properties using 
         * the input url.
         * 
         * @param url The input to associate with this IUrlUtils.
         */
        initialize(url: string);

        /**
         * toString function implementation.
         */
        toString(): string;
    }

    /**
     * Defines an object that handles interaction with the browser.
     */
    export interface IBrowser {
        /**
         * Initializes the Browser instance, trims the url, and 
         * adds events for popstate and hashchange.
         */
        initialize(): void;

        /**
         * Checks to see if the requested URL is cross domain.
         */
        isCrossDomain(url: string): boolean;

        /**
         * Sets or gets the current $window.location
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
        urlUtils(url?: string): IUrlUtils;
    }
}
