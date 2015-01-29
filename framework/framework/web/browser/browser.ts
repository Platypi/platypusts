/**
 * @name web
 * @memberof plat
 * @kind namespace
 * @access public
 * 
 * @description
 * Holds classes and interfaces related to web components in platypus.
 */
module plat.web {
    /**
     * @name Browser
     * @memberof plat.web
     * @kind class
     * 
     * @description
     * The class that handles all interaction with the browser.
     */
    export class Browser {
        protected static _inject: any = {
            _EventManager: __EventManagerStatic,
            _compat: __Compat,
            _regex: __Regex,
            _window: __Window,
            _location: __Location,
            _history: __History,
            _dom: __Dom
        };

        /**
         * @name config
         * @memberof plat.web.Browser
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.web.IBrowserConfig}
         * 
         * @description
         * The {@link plat.web.IBrowserConfig|IBrowserConfig} injectable object.
         */
        static config: IBrowserConfig = {
            NONE: 'none',
            HASH: 'hash',
            STATE: 'state',
            routingType: 'hash',
            hashPrefix: '!',
            baseUrl: ''
        };

        /**
         * @name _EventManager
         * @memberof plat.web.Browser
         * @kind property
         * @access protected
         * 
         * @type {plat.events.IEventManagerStatic}
         * 
         * @description
         * Reference to the {@link plat.events.IEventManagerStatic|IEventManagerStatic} injectable.
         */
        protected _EventManager: events.IEventManagerStatic;

        /**
         * @name _compat
         * @memberof plat.web.Browser
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
         * @memberof plat.web.Browser
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
         * @name _window
         * @memberof plat.web.Browser
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
         * @name _location
         * @memberof plat.web.Browser
         * @kind property
         * @access protected
         * 
         * @type {Location}
         * 
         * @description
         * Reference to the Location injectable.
         */
        protected _location: Location;

        /**
         * @name _history
         * @memberof plat.web.Browser
         * @kind property
         * @access protected
         * 
         * @type {History}
         * 
         * @description
         * Reference to the History injectable.
         */
        protected _history: History;

        /**
         * @name _dom
         * @memberof plat.web.Browser
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.Dom}
         * 
         * @description
         * Reference to the {@link plat.ui.Dom|Dom} injectable.
         */
        protected _dom: ui.Dom;

        /**
         * @name _stack
         * @memberof plat.web.Browser
         * @kind property
         * @access protected
         * 
         * @type {Array<string>}
         * 
         * @description
         * Keeps a history stack if using a windows store app.
         */
        protected _stack: Array<string>;

        /**
         * @name uid
         * @memberof plat.web.Browser
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {string}
         * 
         * @description
         * A unique string identifier.
         */
        uid: string = uniqueId(__Plat);

        /**
         * @name __currentUrl
         * @memberof plat.web.Browser
         * @kind property
         * @access private
         * 
         * @type {string}
         * 
         * @description
         * The browser's current URL.
         */
        private __currentUrl: string;

        /**
         * @name __lastUrl
         * @memberof plat.web.Browser
         * @kind property
         * @access private
         * 
         * @type {string}
         * 
         * @description
         * The browser's last URL.
         */
        private __lastUrl = this._location.href;

        /**
         * @name __initializing
         * @memberof plat.web.Browser
         * @kind property
         * @access private
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the browser is in an initialization state.
         */
        private __initializing = false;

        /**
         * @name constructor
         * @memberof plat.web.Browser
         * @kind function
         * @access public
         * 
         * @description
         * The constructor for a {@link plat.web.Browser|Browser}. Assigns a uid and subscribes to the 'beforeLoad' event.
         * 
         * @returns {plat.web.Browser}
         */
        constructor() {
            this._EventManager.on(this.uid, __beforeLoad, this.initialize, this);

            if (this._compat.msApp) {
                this._stack = [];
            }
        }

        /**
         * @name initialize
         * @memberof plat.web.Browser
         * @kind function
         * @access public
         * 
         * @description
         * Initializes the {@link plat.web.Browser|Browser} instance, trims the url, and 
         * adds events for popstate and hashchange.
         * 
         * @returns {void}
         */
        initialize(): void {
            var $config = Browser.config,
                _compat = this._compat;

            this._EventManager.dispose(this.uid);

            if ($config.routingType === $config.NONE) {
                return;
            }

            this.__initializing = true;

            acquire(__UrlUtilsInstance);

            var url = this.url(),
                trimmedUrl = url,
                changed = this._urlChanged.bind(this),
                _dom = this._dom,
                _window = this._window;

            if (trimmedUrl !== url) {
                this.url(trimmedUrl, true);
            }

            if (_compat.pushState) {
                _dom.addEventListener(_window, __POPSTATE, changed, false);
            }

            _dom.addEventListener(_window, __HASHCHANGE, changed, false);

            this.__initializing = false;
        }

        /**
         * @name url
         * @memberof plat.web.Browser
         * @kind function
         * @access public
         * 
         * @description
         * Sets or gets the current _window.location
         * 
         * @param {string} url? The URL to set the location to.
         * @param {boolean} replace? Whether or not to replace the current URL in 
         * the history.
         * 
         * @returns {string} The current URL or current location.
         */
        url(url?: string, replace?: boolean): string {
            var location = this._location;

            if (isString(url) && this.__lastUrl !== url) {
                if (isArray(this._stack)) {
                    this._stack.push(location.href);
                }

                this._setUrl(url, replace);
            }

            return this.__currentUrl || location.href;
        }

        /**
         * @name back
         * @memberof plat.web.Browser
         * @kind function
         * @access public
         * 
         * @description
         * Navigates back in the browser history
         * 
         * @param {number} length=1 The length to go back
         * 
         * @returns {void}
         */
        back(length?: number): void {
            if (!isNumber(length)) {
                length = 1;
            }

            var _stack = this._stack;

            if (isArray(_stack) && _stack.length > 1) {
                this._stack = _stack = _stack.slice(0, _stack.length - (length - 1));
                this.url(_stack.pop());
                _stack.pop();
                return;
            }

            this._history.go(-length);
        }

        /**
         * @name forward
         * @memberof plat.web.Browser
         * @kind function
         * @access public
         * 
         * @description
         * Navigates forward in the browser history
         * 
         * @param {number} length=1 The length to go forward
         * 
         * @returns {void}
         */
        forward(length?: number): void {
            if (!isNumber(length)) {
                length = 1;
            }

            this._history.go(length);
        }

        /**
         * @name urlUtils
         * @memberof plat.web.Browser
         * @kind function
         * @access public
         * 
         * @description
         * Creates a new {@link plat.web.UrlUtils|UrlUtils} object.
         * 
         * @param url? The URL to associate with the new {@link plat.web.UrlUtils|UrlUtils} 
         * instance.
         * 
         * @returns {@link plat.web.UrlUtils|UrlUtils} The new {@link plat.web.UrlUtils|UrlUtils} object.
         */
        urlUtils(url?: string): UrlUtils {
            url = url || this.url();

            var _urlUtils: UrlUtils = acquire(__UrlUtilsInstance),
                _config = Browser.config;

            if (_config.routingType === _config.HASH) {
                url = url.replace(new RegExp('#' + (_config.hashPrefix || '') + '/?'), '');
            }

            _urlUtils.initialize(url);

            return _urlUtils;
        }

        /**
         * @name isCrossDomain
         * @memberof plat.web.Browser
         * @kind function
         * @access public
         * 
         * @description
         * Checks to see if the requested URL is cross domain.
         * 
         * @param url The URL to verify whether or not it's cross domain.
         * 
         * @returns {boolean} Whether or not the URL argument is cross domain.
         */
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
         * @name _urlChanged
         * @memberof plat.web.Browser
         * @kind function
         * @access public
         * 
         * @description
         * The event to fire in the case of a URL change. It kicks 
         * off a 'urlChanged' direct event notification.
         * 
         * @param url The URL to verify whether or not it's cross domain.
         * 
         * @returns {void}
         */
        protected _urlChanged(): void {
            if (this.__initializing) {
                return;
            }

            this.__currentUrl = null;
            var url = this.url(),
                $config = Browser.config;

            if (this.__lastUrl === url ||
                ($config.routingType === $config.STATE &&
                url.indexOf(this.__lastUrl + '#') > -1)) {
                return;
            }

            this.__lastUrl = url;

            var $manager = this._EventManager;
            $manager.dispatch(__urlChanged,
                this,
                $manager.DIRECT,
                [this.urlUtils()]);
        }

        /**
         * @name _setUrl
         * @memberof plat.web.Browser
         * @kind function
         * @access public
         * 
         * @description
         * Checks for the existence of pushState and 
         * sets the browser URL accordingly.
         * 
         * @param {string} url The URL to set.
         * @param {boolean} replace? Whether or not to replace the 
         * current URL in the history.
         * 
         * @returns {void}
         */
        protected _setUrl(url: string, replace?: boolean): void {
            url = this.formatUrl(url);

            var utils = this.urlUtils(url),
                baseUrl = Browser.config.baseUrl,
                _history = this._history,
                _location = this._location;

            if (utils.href.indexOf(baseUrl) === -1) {
                _location.href = url;
                return;
            }

            // make sure URL is absolute
            if (!this._regex.fullUrlRegex.test(url) && url[0] !== '/') {
                url = baseUrl + url;
            }

            if (this._compat.pushState) {
                if (replace) {
                    _history.replaceState(null, '', url);
                } else {
                    _history.pushState(null, '', url);
                }

                if (!this.__initializing) {
                    this._urlChanged();
                }
            } else {
                this.__currentUrl = url;
                if (replace) {
                    _location.replace(url);
                } else {
                    _location.href = url;
                }
            }
        }

        /**
         * @name formatUrl
         * @memberof plat.web.Browser
         * @kind function
         * @access public
         * 
         * @description
         * Formats the URL in the case of HASH routing.
         * 
         * @param url The URL to format.
         * 
         * @returns {string} The formatted URL.
         */
        formatUrl(url: string): string {
            var $config = Browser.config,
                baseUrl = $config.baseUrl,
                isLocal = !this._regex.fullUrlRegex.test(url) || url.indexOf($config.baseUrl) > -1;

            if (url === $config.baseUrl) {
                return url;
            }

            if (url[0] === '/') {
                url = url.slice(1);
            }

            if (isLocal && $config.routingType === $config.HASH) {
                var hasProtocol = url.indexOf(this.urlUtils().protocol) !== -1,
                    prefix = $config.hashPrefix || '',
                    append = '#' + prefix,
                    hashRegex = new RegExp('#' + prefix + '|#/');

                if (url[url.length - 1] !== '/' && url.indexOf('?') === -1) {
                    url += '/';
                }

                if (hasProtocol && !hashRegex.test(url)) {
                    url = url + '#' + prefix + '/';
                } else if (!hashRegex.test(url)) {
                    url = '#' + prefix + ((url[0] !== '/') ? '/' : '') + url;
                }
            }

            if (isLocal && url.indexOf($config.baseUrl) === -1) {
                url = $config.baseUrl + url;
            }

            return url;
        }
    }

    register.injectable(__Browser, Browser);

    /**
     * The Type for referencing the '_browserConfig' injectable as a dependency.
     */
    export function IBrowserConfig(): IBrowserConfig {
        return Browser.config;
    }

    register.injectable(__BrowserConfig, IBrowserConfig);

    /**
     * @name IBrowserConfig
     * @memberof plat.web
     * @kind interface
     * 
     * @description
     * Specifies configuration properties for the {@link plat.web.Browser|Browser}  
     * injectable.
     */
    export interface IBrowserConfig {
        /**
         * @name NONE
         * @memberof plat.web.IBrowserConfig
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Specifies that the application will not be doing 
         * url-based routing.
         */
        NONE: string;

        /**
         * @name HASH
         * @memberof plat.web.IBrowserConfig
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Specifies that the application wants to use hash-based 
         * routing.
         */
        HASH: string;

        /**
         * @name STATE
         * @memberof plat.web.IBrowserConfig
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
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
         * @name routingType
         * @memberof plat.web.IBrowserConfig
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Allows you to define how your app will route. There are
         * three modes, NONE ('none'), HASH ('hash'), and STATE ('state'). 
         * 
         * In NONE, the application will not be responding to 
         * url changes.
         * 
         * In HASH, the application will use a hash prefix and 
         * all navigation will be managed with hash changes.
         * 
         * In STATE mode, the application will use the 'popstate' 
         * event and will be able to manage routes. The web server 
         * must be configured to route every URL to the root URL if 
         * using STATE mode.
         * 
         * The default mode is NONE.
         */
        routingType: string;

        /**
         * @name hashPrefix
         * @memberof plat.web.IBrowserConfig
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * If routingType is set to HASH ('hash'), this value will be 
         * appended to the '#' at the beginning of every route. The 
         * default prefix is '!', meaning each path will be '#!/<path>'.
         */
        hashPrefix: string;

        /**
         * @name baseUrl
         * @memberof plat.web.IBrowserConfig
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Specifies the base URL used to normalize URL routing.
         */
        baseUrl: string;
    }
}
