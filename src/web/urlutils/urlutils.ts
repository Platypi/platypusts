namespace plat.web {
    'use strict';

    /**
     * @name UrlUtils
     * @memberof plat.web
     * @kind class
     *
     * @description
     * Deals with obtaining detailed information about an
     * associated URL.
     */
    export class UrlUtils {
        protected static _inject: any = {
            _EventManager: __EventManagerStatic,
            _document: __Document,
            _window: __Window,
            _compat: __Compat,
            _regex: __Regex,
            _browserConfig: __BrowserConfig,
        };

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
        protected _document: Document;

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
        protected _window: Window;
        /**
         * @name _compat
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access protected
         *
         * @type {plat.Compat}
         *
         * @description
         * Reference to the {@link plat.Compat|Compat} injectable.
         */
        protected _compat: Compat;

        /**
         * @name _regex
         * @memberof plat.web.UrlUtils
         * @kind property
         * @access protected
         *
         * @type {plat.expressions.Regex}
         *
         * @description
         * Reference to the {@link plat.expressions.Regex|Regex} injectable.
         */
        protected _regex: expressions.Regex;

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
        protected _browserConfig: IBrowserConfig;

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
        public href: string;

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
        public protocol: string;

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
        public host: string;

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
        public hostname: string;

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
        public port: string;

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
        public pathname: string;

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
        public search: string;

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
        public hash: string;

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
        public username: string;

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
        public password: string;

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
        public origin: string;

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
        public query: any;

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
            const _regex: expressions.Regex = acquire(__Regex);
            const _location: Location = acquire(__Location);
            const protocol = _location.protocol;
            const host = _location.host;
            let origin = (<any>_location).origin;

            if (
                protocol === 'file:' ||
                protocol.indexOf('wmapp') > -1 ||
                protocol.indexOf('ms-appx') > -1
            ) {
                origin = _location.href;
            } else if (isUndefined(origin)) {
                origin = `${_location.protocol}//${_location.host}`;
            }

            origin = origin.replace(_regex.initialUrlRegex, '');

            return `${origin.split('?')[0].split('#')[0]}/`;
        }

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
            const config = this._browserConfig;
            let baseUrl = config.baseUrl;

            if (isEmpty(baseUrl) || !this._regex.fullUrlRegex.test(baseUrl)) {
                const url = this._window.location.href;
                const trimmedUrl = url.replace(
                    this._regex.initialUrlRegex,
                    '/'
                );

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

                config.baseUrl = `${baseUrl}/`;
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
        public initialize(url: string): void {
            if (!isString(url)) {
                url = '';
            }

            if (!isNode(UrlUtils.__urlUtilsElement)) {
                UrlUtils.__urlUtilsElement = this._document.createElement('a');
            }

            const element = UrlUtils.__urlUtilsElement;
            const _browserConfig = this._browserConfig;

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

            // we need to do this twice for certain browsers (e.g. win8)
            element.setAttribute('href', url);
            url = element.href;

            this.href = url;
            this.protocol = isString(element.protocol)
                ? element.protocol.replace(/:$/, '')
                : '';
            this.host = element.host;
            this.search = isString(element.search)
                ? element.search.replace(/^\?/, '')
                : '';
            this.hash = isString(element.hash)
                ? element.hash.replace(/^#/, '')
                : '';
            this.hostname = element.hostname;
            this.port = element.port;

            let path: string;

            if (!isEmpty(_browserConfig.baseUrl)) {
                path = url.replace(_browserConfig.baseUrl, '/');
            } else {
                path =
                    element.pathname.charAt(0) === '/'
                        ? element.pathname
                        : `/${element.pathname}`;
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
        public toString(): string {
            return this.href;
        }
    }
    register.injectable(__UrlUtilsInstance, UrlUtils, null, __INSTANCE);
}
