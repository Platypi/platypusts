module plat.web {
    /**
     * @name UrlUtils
     * @memberof plat.web
     * @kind class
     * 
     * @implements {plat.web.IUrlUtilsInstance}
     * 
     * @description
     * Deals with obtaining detailed information about an 
     * associated URL.
     */
    export class UrlUtils implements IUrlUtilsInstance {
        /**
         * @name __urlUtilsElement
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access private
         * @static
         * 
         * @type {HTMLAnchorElement}
         * 
         * @description
         * Helps with URL initialization through it's href attribute.
         */
        private static __urlUtilsElement: HTMLAnchorElement;
        /**
         * @name __getQuery
         * @memberof plat.web.UrlUtils
         * @kind function
         * @access private
         * @static
         *
         * @description
         * Creates a query object out of the URL's query search string.
         * 
         * @param {string} The URL's query search string.
         * 
         * @returns {plat.IObject<string>} An object consisting of key-value pairs 
         * representing the query string.
         */
        private static __getQuery(search: string): IObject<string> {
            if (isEmpty(search)) {
                return;
            }

            var split = search.split('&'),
                query: IObject<string> = {},
                length = split.length,
                item: Array<string>;

            for (var i = 0; i < length; ++i) {
                item = split[i].split('=');

                query[item[0]] = item[1];
            }

            return query;
        }

        /**
         * @name __getBaseUrl
         * @memberof plat.web.UrlUtils
         * @kind function
         * @access private
         * @static
         *
         * @description
         * Obtains the base URL for the app/site for doing STATE type routing.
         * 
         * @param {string} The initial URL passed into the Browser.
         * 
         * @returns {string} The base URL.
         */
        private static __getBaseUrl(url: string): string {
            var colon = url.substring(url.indexOf(':')),
                next = colon.substring(colon.search(/\w+/));

            return url.substring(0, url.indexOf('/', url.indexOf(next))) + '/';
        }

        $ContextManagerStatic: observable.IContextManagerStatic = acquire(__ContextManagerStatic);
        $Document: Document = acquire(__Document);
        $Window: Window = acquire(__Window);
        $Compat: ICompat = acquire(__Compat);
        $Regex: expressions.IRegex = acquire(__Regex);
        $BrowserConfig: IBrowserConfig = acquire(__BrowserConfig);

        /**
         * @name href
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The whole associated URL.
         */
        href: string;
        /**
         * @name protocol
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The protocol scheme of the URL, including the final ':' of the associated URL.
         */
        protocol: string;
        /**
         * @name host
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The hostname and port of the associated URL.
         */
        host: string;
        /**
         * @name hostname
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The domain of the associated URL.
         */
        hostname: string;
        /**
         * @name port
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The port number of the associated URL.
         */
        port: string;
        /**
         * @name pathname
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The additional path value in the associated URL preceded by a '/'.
         */
        pathname: string;
        /**
         * @name search
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * A '?' followed by the included parameters in the associated URL.
         */
        search: string;
        /**
         * @name hash
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * A '#' followed by the included hash fragments in the associated URL.
         */
        hash: string;
        username: string;
        password: string;
        origin: string;
        query: IObject<string>;

        /**
         * Handle the initial URL and get the base URL if necessary.
         */
        constructor() {
            var $config = this.$BrowserConfig;
            if (isEmpty($config.baseUrl)) {
                var url = this.$Window.location.href,
                    trimmedUrl = url.replace(this.$Regex.initialUrlRegex, '/');

                if ($config.routingType === $config.HASH) {
                    $config.baseUrl = trimmedUrl.replace(/#.*/, '');
                } else {
                    $config.baseUrl = UrlUtils.__getBaseUrl(trimmedUrl);
                }
            }
        }

        initialize(url: string): void {
            url = url || '';

            var element = UrlUtils.__urlUtilsElement ||
                (UrlUtils.__urlUtilsElement = this.$Document.createElement('a')),
                define = this.$ContextManagerStatic.defineGetter;

            // always make local urls relative to start page.
            if (url[0] === '/') {
                url = url.substr(1);
            }

            element.setAttribute('href', url);
            url = element.href;

            // we need to do this twice for cerain browsers (e.g. win8)
            element.setAttribute('href', url);
            url = element.href;

            var protocol = element.protocol ? element.protocol.replace(/:$/, '') : '';

            // cordova adds //www for some urls, so we want to take those out.
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

            var path: string;

            if (!isEmpty(this.$BrowserConfig.baseUrl)) {
                path = url.replace(this.$BrowserConfig.baseUrl, '/');
            } else {
                path = (element.pathname.charAt(0) === '/')
                ? element.pathname
                : '/' + element.pathname;
            }

            define(this, 'pathname', path, true, true);
            define(this, 'query', UrlUtils.__getQuery(this.search), true, true);
        }

        toString(): string {
            return this.href;
        }
    }

    /**
     * The Type for referencing the '$UrlUtilsInstance' injectable as a dependency.
     */
    export function IUrlUtilsInstance(): IUrlUtilsInstance {
        return new UrlUtils();
    }

    register.injectable(__UrlUtilsInstance, IUrlUtilsInstance, null, __INSTANCE);

    /**
     * Defines an object that deals with obtaining detailed information about an 
     * associated URL.
     */
    export interface IUrlUtilsInstance {
        /**
         * @name href
         * @memberof plat.web.IUrlUtilsInstance
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The whole associated URL.
         */
        href: string;

        /**
         * @name protocol
         * @memberof plat.web.IUrlUtilsInstance
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The protocol scheme of the URL, including the final ':' of the associated URL.
         */
        protocol: string;

        /**
         * @name host
         * @memberof plat.web.IUrlUtilsInstance
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The hostname and port of the associated URL.
         */
        host: string;

        /**
         * @name hostname
         * @memberof plat.web.IUrlUtilsInstance
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The domain of the associated URL.
         */
        hostname: string;

        /**
         * @name port
         * @memberof plat.web.IUrlUtilsInstance
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The port number of the associated URL.
         */
        port: string;

        /**
         * @name pathname
         * @memberof plat.web.IUrlUtilsInstance
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The additional path value in the associated URL preceded by a '/'.
         */
        pathname: string;

        /**
         * @name search
         * @memberof plat.web.IUrlUtilsInstance
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * A '?' followed by the included parameters in the associated URL.
         */
        search: string;

        /**
         * @name hash
         * @memberof plat.web.IUrlUtilsInstance
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * A '#' followed by the included hash fragments in the associated URL.
         */
        hash: string;

        /**
         * @name username
         * @memberof plat.web.IUrlUtilsInstance
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
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
        initialize(url: string): void;

        /**
         * toString function implementation.
         */
        toString(): string;
    }
}
