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
            return deserializeQuery(search);
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
            var _regex = acquire(__Regex),
                origin = (<any>window.location).origin,
                protocol = window.location.protocol,
                host = window.location.host;

            if (protocol === 'file:' || protocol.indexOf('wmapp') > -1 || protocol.indexOf('ms-appx') > -1) {
                origin = window.location.href;
            } else if(isUndefined(origin)) {
                origin = window.location.protocol + '//' + window.location.host;
            }

            origin = origin.replace(_regex.initialUrlRegex, '');

            return origin.split('?')[0].split('#')[0] + '/';
        }

        /**
         * @name _ContextManager
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access protected
         * 
         * @type {plat.observable.IContextManagerStatic}
         * 
         * @description
         * Reference to the {@link plat.observable.IContextManagerStatic|IContextManagerStatic} injectable.
         */
        protected _ContextManager: observable.IContextManagerStatic = acquire(__ContextManagerStatic);

        /**
         * @name _document
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access protected
         * 
         * @type {Document}
         * 
         * @description
         * Reference to the Document injectable.
         */
        protected _document: Document = acquire(__Document);

        /**
         * @name _window
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access protected
         * 
         * @type {Window}
         * 
         * @description
         * Reference to the Window injectable.
         */
        protected _window: Window = acquire(__Window);
        /**
         * @name _compat
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access protected
         * 
         * @type {plat.ICompat}
         * 
         * @description
         * Reference to the {@link plat.ICompat|ICompat} injectable.
         */
        protected _compat: ICompat = acquire(__Compat);

        /**
         * @name _regex
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access protected
         * 
         * @type {plat.expressions.IRegex}
         * 
         * @description
         * Reference to the {@link plat.expressions.IRegex|IRegex} injectable.
         */
        protected _regex: expressions.IRegex = acquire(__Regex);

        /**
         * @name _browserConfig
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access protected
         * 
         * @type {plat.web.IBrowserConfig}
         * 
         * @description
         * Reference to the {@link plat.web.IBrowserConfig|IBrowserConfig} injectable.
         */
        protected _browserConfig: IBrowserConfig = acquire(__BrowserConfig);

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
         * @returns {plat.web.UrlUtils}
         */
        constructor() {
            var $config = this._browserConfig;
            if (isEmpty($config.baseUrl) || !this._regex.fullUrlRegex.test($config.baseUrl)) {
                var url = this._window.location.href,
                    trimmedUrl = url.replace(this._regex.initialUrlRegex, '/'),
                    baseUrl = $config.baseUrl;

                if (isString(baseUrl)) {
                    if (baseUrl.indexOf('/') === 0) {
                        baseUrl = baseUrl.slice(1);
                    }
                } else {
                    baseUrl = '';
                }

                baseUrl = UrlUtils.__getBaseUrl(trimmedUrl) + baseUrl;

                while (baseUrl[baseUrl.length - 1] === '/') {
                    baseUrl = baseUrl.slice(0, -1);
                }

                $config.baseUrl = baseUrl + '/';
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
                (UrlUtils.__urlUtilsElement = this._document.createElement('a')),
                define = this._ContextManager.defineGetter,
                _browserConfig = this._browserConfig;

            // always make local urls relative to start page.
            if (url[0] === '/' && url.indexOf('//') !== 0) {
                url = url.slice(1);
            }

            // Always append the baseUrl if this is not a full-url
            if (!this._regex.fullUrlRegex.test(url)) {
                url = _browserConfig.baseUrl + url;
            }

            element.setAttribute('href', url);
            url = element.href;

            // we need to do this twice for cerain browsers (e.g. win8)
            element.setAttribute('href', url);
            url = element.href;

            var protocol = element.protocol ? element.protocol.replace(/:$/, '') : '';

            this.href = url;
            this.protocol = element.protocol ? element.protocol.replace(/:$/, '') : '';
            this.host = element.host;
            this.search = element.search ? element.search.replace(/^\?/, '') : '';
            this.hash = element.hash ? element.hash.replace(/^#/, '') : '';
            this.hostname = element.hostname;
            this.port = element.port;

            var path: string;

            if (!isEmpty(_browserConfig.baseUrl)) {
                path = url.replace(_browserConfig.baseUrl, '/');
            } else {
                path = (element.pathname.charAt(0) === '/')
                ? element.pathname
                : '/' + element.pathname;
            }


            path = path.replace(this._regex.initialUrlRegex, '/');

            this.pathname = path.split('?')[0].split('#')[0];
            this.query = UrlUtils.__getQuery(this.search);
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
     * The Type for referencing the '_urlUtilsInstance' injectable as a dependency.
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
