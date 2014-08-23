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
         * @param {string} search The URL's query search string.
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
         * @param {string} url The initial URL passed into the Browser.
         * 
         * @returns {string} The base URL.
         */
        private static __getBaseUrl(url: string): string {
            var colon = url.substring(url.indexOf(':')),
                next = colon.substring(colon.search(/\w+/));

            return url.substring(0, url.indexOf('/', url.indexOf(next))) + '/';
        }

        /**
         * @name $ContextManagerStatic
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IContextManagerStatic}
         * 
         * @description
         * Reference to the {@link plat.observable.IContextManagerStatic|IContextManagerStatic} injectable.
         */
        $ContextManagerStatic: observable.IContextManagerStatic = acquire(__ContextManagerStatic);
        /**
         * @name $Document
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access public
         * 
         * @type {Document}
         * 
         * @description
         * Reference to the Document injectable.
         */
        $Document: Document = acquire(__Document);
        /**
         * @name $Window
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access public
         * 
         * @type {Window}
         * 
         * @description
         * Reference to the Window injectable.
         */
        $Window: Window = acquire(__Window);
        /**
         * @name $Compat
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access public
         * 
         * @type {plat.ICompat}
         * 
         * @description
         * Reference to the {@link plat.ICompat|ICompat} injectable.
         */
        $Compat: ICompat = acquire(__Compat);
        /**
         * @name $Regex
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access public
         * 
         * @type {plat.expressions.IRegex}
         * 
         * @description
         * Reference to the {@link plat.expressions.IRegex|IRegex} injectable.
         */
        $Regex: expressions.IRegex = acquire(__Regex);
        /**
         * @name $BrowserConfig
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access public
         * 
         * @type {plat.web.IBrowserConfig}
         * 
         * @description
         * Reference to the {@link plat.web.IBrowserConfig|IBrowserConfig} injectable.
         */
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
         * Removes the query string.
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
        /**
         * @name username
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The username specified before the domain name in the associated URL.
         */
        username: string;
        /**
         * @name password
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The password specified before the domain name in the associated URL.
         */
        password: string;
        /**
         * @name origin
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The origin of the associated URL (its protocol, domain, and port).
         */
        origin: string;
        /**
         * @name query
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * An object containing keyed query arguments from the associated URL.
         */
        query: any;

        /**
         * @name constructor
         * @memberof plat.web.UrlUtils
         * @kind function
         * @access public
         * 
         * @description
         * The constructor for a {@link plat.web.UrlUtils|UrlUtils} instance. 
         * Handles parsing the initial URL and obtain the base URL if necessary.
         * 
         * @returns {plat.web.UrlUtils} A {@link plat.web.UrlUtils|UrlUtils} instance.
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

        /**
         * @name initialize
         * @memberof plat.web.UrlUtils
         * @kind function
         * @access public
         * 
         * @description
         * Initializes and defines properties using 
         * the input url.
         * 
         * @param {string} url The input to associate with this {@link plat.web.UrlUtils|UrlUtils} instance.
         * 
         * @returns {void}
         */
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

            define(this, 'pathname', path.split('?')[0], true, true);
            define(this, 'query', UrlUtils.__getQuery(this.search), true, true);
        }

        /**
         * @name toString
         * @memberof plat.web.UrlUtils
         * @kind function
         * @access public
         * 
         * @description
         * A toString function implementation for the {@link plat.web.UrlUtils|UrlUtils} class.
         * 
         * @returns {string} The href associated with this {@link plat.web.UrlUtils|UrlUtils} instance.
         */
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
     * @name IUrlUtilsInstance
     * @memberof plat.web
     * @kind interface
     * 
     * @description
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
         * Removes the query string.
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
         * @name password
         * @memberof plat.web.IUrlUtilsInstance
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The password specified before the domain name in the associated URL.
         */
        password?: string;

        /**
         * @name origin
         * @memberof plat.web.IUrlUtilsInstance
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The origin of the associated URL (its protocol, domain, and port).
         */
        origin?: string;

        /**
         * @name query
         * @memberof plat.web.IUrlUtilsInstance
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * An object containing keyed query arguments from the associated URL.
         */
        query?: any;

        /**
         * @name initialize
         * @memberof plat.web.IUrlUtilsInstance
         * @kind function
         * @access public
         * 
         * @description
         * Initializes and defines properties using 
         * the input url.
         * 
         * @param {string} url The input to associate with this {@link plat.web.IUrlUtilsInstance|IUrlUtilsInstance}.
         * 
         * @returns {void}
         */
        initialize(url: string): void;

        /**
         * @name toString
         * @memberof plat.web.IUrlUtilsInstance
         * @kind function
         * @access public
         * 
         * @description
         * A toString function implementation for the {@link plat.web.IUrlUtilsInstance|IUrlUtilsInstance}.
         * 
         * @returns {string} The href associated with this {@link plat.web.IUrlUtilsInstance|IUrlUtilsInstance}.
         */
        toString(): string;
    }
}
