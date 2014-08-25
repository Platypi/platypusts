module plat.web {
    /**
     * @name Router
     * @memberof plat.web
     * @kind class
     * 
     * @implements {plat.web.IRouter}
     * 
     * @description
     * The class that handles route registration and navigation 
     * to and from {@link plat.ui.IViewControl|IViewControls} within the 
     * {@link plat.ui.controls.Routeport|Routeport}.
     */
    export class Router implements IRouter {
        /**
         * @name $Browser
         * @memberof plat.web.Router
         * @kind property
         * @access public
         * 
         * @type {plat.web.IBrowser}
         * 
         * @description
         * Reference to the {@link plat.web.IBrowser|IBrowser} injectable.
         */
        $Browser: IBrowser = acquire(__Browser);
        /**
         * @name $BrowserConfig
         * @memberof plat.web.Router
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
         * @name $EventManagerStatic
         * @memberof plat.web.Router
         * @kind property
         * @access public
         * 
         * @type {plat.events.IEventManagerStatic}
         * 
         * @description
         * Reference to the {@link plat.events.IEventManagerStatic|IEventManagerStatic} injectable.
         */
        $EventManagerStatic: events.IEventManagerStatic = acquire(__EventManagerStatic);
        /**
         * @name $NavigationEventStatic
         * @memberof plat.web.Router
         * @kind property
         * @access public
         * 
         * @type {plat.events.INavigationEventStatic}
         * 
         * @description
         * Reference to the {@link plat.events.INavigationEventStatic|INavigationEventStatic} injectable.
         */
        $NavigationEventStatic: events.INavigationEventStatic = acquire(__NavigationEventStatic);
        /**
         * @name $Compat
         * @memberof plat.web.Router
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
         * @memberof plat.web.Router
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
         * @name $Window
         * @memberof plat.web.Router
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
         * @name uid
         * @memberof plat.web.Router
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {string}
         * 
         * @description
         * A unique string identifier.
         */
        uid: string;

        /**
         * @name _routes
         * @memberof plat.web.Router
         * @kind property
         * @access protected
         * 
         * @type {Array<plat.web.IRouteMatcher>}
         * 
         * @description
         * The registered routes (as {@link plat.web.IRouteMatcher|IRouteMatchers}) for matching 
         * on route change.
         */
        _routes: Array<IRouteMatcher> = [];

        /**
         * @name _removeListener
         * @memberof plat.web.Router
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * The function to stop listening to the 'urlChanged' event.
         */
        _removeListener: IRemoveListener;

        /**
         * @name _defaultRoute
         * @memberof plat.web.Router
         * @kind property
         * @access protected
         * 
         * @type {plat.web.IMatchedRoute}
         * 
         * @description
         * The registered default route ('') converted into an {@link plat.web.IMatchedRoute|IMatchedRoute}. 
         * The default route is used whenever a specified route/url is not matched.
         */
        _defaultRoute: IMatchedRoute;

        /**
         * @name _baseRoute
         * @memberof plat.web.Router
         * @kind property
         * @access protected
         * 
         * @type {plat.web.IMatchedRoute}
         * 
         * @description
         * The registered base route ('/') converted into an {@link plat.web.IMatchedRoute|IMatchedRoute}. 
         * The base route is the first route navigated to in the {@link plat.ui.controls.Routeport|Routeport} if a 
         * default route is not specified in its plat-options.
         */
        _baseRoute: IMatchedRoute;

        /**
         * @name __escapeRegex
         * @memberof plat.web.Router
         * @kind property
         * @access private
         * 
         * @type {RegExp}
         * 
         * @description
         * A regular expression for finding invalid characters in a route string.
         */
        private __escapeRegex = this.$Regex.escapeRouteRegex;
        /**
         * @name __optionalRegex
         * @memberof plat.web.Router
         * @kind property
         * @access private
         * 
         * @type {RegExp}
         * 
         * @description
         * A regular expression for finding optional parameters in a route string.
         */
        private __optionalRegex = this.$Regex.optionalRouteRegex;
        /**
         * @name __pathSlashRegex
         * @memberof plat.web.Router
         * @kind property
         * @access private
         * 
         * @type {RegExp}
         * 
         * @description
         * A regular expression for finding forward slashes at the beginning or end of 
         * an expression.
         */
        private __pathSlashRegex = /^\/|\/$/g;
        /**
         * @name __firstRoute
         * @memberof plat.web.Router
         * @kind property
         * @access private
         * 
         * @type {boolean}
         * 
         * @description
         * States whether the specified route is the first attempt at routing.
         */
        private __firstRoute = true;
        /**
         * @name __history
         * @memberof plat.web.Router
         * @kind property
         * @access private
         * 
         * @type {Array<string>}
         * 
         * @description
         * A virtual history stack used in IE based MS apps.
         */
        private __history: Array<string>;

        /**
         * @name constructor
         * @memberof plat.web.Router
         * @kind function
         * @access public
         * 
         * @description
         * The constructor for a {@link plat.web.Router|Router}. Assigns a uid and subscribes to the 'urlChanged' event.
         * 
         * @returns {plat.web.Router} A {@link plat.web.Router|Router} instance.
         */
        constructor() {
            var ContextManager: observable.IContextManagerStatic = acquire(__ContextManagerStatic);
            ContextManager.defineGetter(this, 'uid', uniqueId('plat_'));

            this._removeListener = this.$EventManagerStatic.on(this.uid, 'urlChanged',
                (ev: events.IDispatchEventInstance, utils: web.IUrlUtilsInstance) => {
                postpone(() => {
                    this._routeChanged(ev, utils);
                });
            }, this);

            var $browserConfig = this.$BrowserConfig;
            if ($browserConfig.routingType === $browserConfig.NONE) {
                $browserConfig.routingType = $browserConfig.HASH;
                $browserConfig.hashPrefix = $browserConfig.hashPrefix || '';
            }

            if (this.$Compat.msApp) {
                this.__history = [];
            }
        }

        /**
         * @name registerRoutes
         * @memberof plat.web.Router
         * @kind function
         * @access public
         * 
         * @description
         * Registers route strings/RegExps and associates them with a control type.
         * 
         * @param {string} type The control type with which to associate the routes.
         * @param {Array<any>} routes An array of strings or RegExp expressions to associate with 
         * the control type.
         * 
         * @returns {void}
         */
        registerRoutes(type: string, routes: Array<any>): void {
            if (!isArray(routes)) {
                return;
            }

            var injector = viewControlInjectors[type],
                length = routes.length;

            for (var i = 0; i < length; ++i) {
                this._registerRoute(routes[i], injector, type);
            }
        }

        /**
         * @name route
         * @memberof plat.web.Router
         * @kind function
         * @access public
         * 
         * @description
         * Formats a url path given the parameters and query string, then changes the 
         * url to that path.
         * 
         * @param {string} path The route path to navigate to.
         * @param {plat.web.IRouteNavigationOptions} options? The {@link plat.web.IRouteNavigationOptions|IRouteNavigationOptions}  
         * included with this route.
         * 
         * @returns {boolean} Whether or not the route operation was a success.
         */
        route(path: string, options?: IRouteNavigationOptions): boolean {
            options = options || <IRouteNavigationOptions>{};

            var replace = options.replace,
                route: string,
                match: IMatchedRoute,
                $browser = this.$Browser,
                currentUtils: IUrlUtilsInstance = $browser.urlUtils();

            if (this.__firstRoute) {
                this.__firstRoute = false;
                if (isEmpty(path)) {
                    this._routeChanged(null, currentUtils);
                    return true;
                }
            }

            var build = this._buildRoute(path, options.query);

            if (isNull(build)) {
                var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                $exception.warn('Route: ' + path + ' is not a matched route.', $exception.NAVIGATION);
                return false;
            }

            route = build.route;
            match = build.match;

            var event = this.$NavigationEventStatic.dispatch('beforeRouteChange', this, {
                parameter: match.route,
                target: match.injector,
                type: match.type,
                options: null,
                cancelable: true
            });

            if (event.cancelled) {
                return false;
            }

            var nextUtils = $browser.urlUtils(route);

            if (currentUtils.href === nextUtils.href) {
                replace = true;
            }

            $browser.url(route, replace);
            return true;
        }

        /**
         * @name goBack
         * @memberof plat.web.Router
         * @kind function
         * @access public
         * 
         * @description
         * Navigates back in the history.
         * 
         * @param {number} length? The number of entries to go back in the history.
         * 
         * @returns {void}
         */
        goBack(length?: number): void {
            this.$Window.history.go(-length);

            var history = this.__history;
            if (isArray(history) && history.length > 1) {
                this.__history = history.slice(0, history.length - length);
                this.$Browser.url(this.__history.pop() || '');
            }
        }

        /**
         * @name _buildRoute
         * @memberof plat.web.Router
         * @kind function
         * @access protected
         * 
         * @description
         * Builds a valid route with a valid query string to use for navigation.
         * 
         * @param {string} routeParameter The route portion of the navigation path. Used to 
         * match with a registered {@link plat.ui.WebViewControl|WebViewControl}.
         * @param {plat.IObject<string>} query The route query object if passed into the 
         * {@link plat.web.IRouteNavigationOptions|IRouteNavigationOptions}.
         * 
         * @returns {{ route: string; match: plat.web.IMatchedRoute; }} An object containing 
         * both the fully evaluated route and the corresponding {@link plat.web.IMatchedRoute|IMatchedRoute}.
         */
        _buildRoute(routeParameter: string, query: IObject<string>): { route: string; match: IMatchedRoute; } {
            var queryStr = this._buildQueryString(query);

            if (!isString(routeParameter)) {
                return;
            }

            var route = routeParameter + queryStr,
                utils = this.$Browser.urlUtils(route),
                match = this._match(utils);

            if (isNull(match)) {
                return;
            }

            return {
                route: route,
                match: match
            };
        }

        /**
         * @name _buildQueryString
         * @memberof plat.web.Router
         * @kind function
         * @access protected
         * 
         * @description
         * Builds the query string if a query object was passed into 
         * the {@link plat.web.IRouteNavigationOptions|IRouteNavigationOptions}.
         * 
         * @param {plat.IObject<string>} query The query object passed in.
         * 
         * @returns {string} The built query string.
         */
        _buildQueryString(query: IObject<string>): string {
            var queryStr: Array<string> = [];

            if (!isObject(query)) {
                return queryStr.join();
            }

            var keys = Object.keys(query),
                length = keys.length,
                key: string;

            for (var i = 0; i < length; ++i) {
                key = keys[i];

                queryStr.push(key + '=' + query[key]);
            }

            return '?' + queryStr.join('&');
        }

        /**
         * @name _routeChanged
         * @memberof plat.web.Router
         * @kind function
         * @access protected
         * 
         * @description
         * The method called when the route function is invoked 
         * or on a 'urlChanged' event.
         * 
         * @param {plat.events.IDispatchEventInstance} ev The 'urlChanged' event object.
         * @param {plat.web.IUrlUtilsInstance} utils The {@link plat.web.IUrlUtils|IUrlUtils} 
         * created for the invoked route function.
         * 
         * @returns {void}
         */
        _routeChanged(ev: events.IDispatchEventInstance, utils: web.IUrlUtilsInstance): void {
            var matchedRoute = this._match(utils);

            if (isNull(matchedRoute)) {
                var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                $exception.warn('Could not match route: ' + utils.pathname,
                    $exception.NAVIGATION);
                return;
            }

            if (this.__history) {
                this.__history.push(matchedRoute.route.path);
            }

            this.$NavigationEventStatic.dispatch('routeChanged', this, {
                parameter: matchedRoute.route,
                target: matchedRoute.injector,
                type: matchedRoute.type,
                options: null,
                cancelable: false
            });
        }

        /**
         * @name _registerRoute
         * @memberof plat.web.Router
         * @kind function
         * @access protected
         * 
         * @description
         * Registers a {@link plat.ui.WebViewControl|WebViewControl's} route.
         * 
         * @param {any} route Can be either a string or RegExp.
         * @param {plat.dependency.IInjector<plat.ui.IBaseViewControl>} injector The injector for the 
         * {@link plat.ui.WebViewControl|WebViewControl} defined by the type.
         * @param {string} type The control type.
         * 
         * @returns {void}
         */
        _registerRoute(route: any, injector: dependency.IInjector<ui.IBaseViewControl>, type: string): void {
            var regexp = isRegExp(route),
                routeParameters: IRouteMatcher;

            if (!(regexp || isString(route))) {
                return;
            } else if (regexp) {
                routeParameters = {
                    regex: route,
                    type: type,
                    injector: injector,
                    args: []
                };
            } else if (isEmpty(route)) {
                this._defaultRoute = {
                    injector: injector,
                    type: type
                };
                return;
            } else if (route.trim() === '/') {
                this._baseRoute = {
                    injector: injector,
                    type: type
                };
                return;
            } else {
                if (route[0] === '/') {
                    route = (<string>route).substr(1);
                }
                routeParameters = this._getRouteParameters(route);
                routeParameters.injector = injector;
                routeParameters.type = type;
            }

            this._routes.push(routeParameters);
        }

        /**
         * @name _getRouteParameters
         * @memberof plat.web.Router
         * @kind function
         * @access protected
         * 
         * @description
         * Parses the route and pulls out route parameters. Then 
         * converts them to regular expressions to match for 
         * routing.
         * 
         * @param {string} route The route to parse.
         * 
         * @returns {plat.web.IRouteMatcher} The object used to match a 
         * route with a {@link plat.ui.BaseViewControl|BaseViewControl's} injector.
         */
        _getRouteParameters(route: string): IRouteMatcher {
            var $regex = this.$Regex,
                namedRegex = $regex.namedParameterRouteRegex,
                escapeRegex = this.__escapeRegex,
                optionalRegex = this.__optionalRegex,
                wildcardRegex = $regex.wildcardRouteRegex,
                regexArgs = route.match(namedRegex),
                wildcard = wildcardRegex.exec(route),
                args: Array<string> = [];

            route = route.replace(escapeRegex, '\\$')
                .replace(optionalRegex, '(?:$1)?')
                .replace(namedRegex, (match, optional)
                    => optional ? match : '([^/?]+)')
                .replace(wildcardRegex, '([^?]*?)');

            if (!isNull(regexArgs)) {
                var length = regexArgs.length;

                for (var i = 0; i < length; ++i) {
                    args.push(regexArgs[i].substr(1));
                }
            }

            if (!isNull(wildcard)) {
                var wildCardName = wildcard[0].substr(1);

                if (isEmpty(wildCardName)) {
                    wildCardName = 'wildcard';
                }

                args.push(wildCardName);
            }

            return {
                regex: new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$'),
                args: args
            };
        }

        /**
         * @name _match
         * @memberof plat.web.Router
         * @kind function
         * @access protected
         * 
         * @description
         * Matches a route to a registered route using the 
         * registered route's regular expression.
         * 
         * @param {plat.web.IUrlUtilsInstance} utils The utility used to obtain 
         * the url fragment and the url query.
         * 
         * @returns {plat.web.IMatchedRoute} The matched route with the matched control 
         * injector.
         */
        _match(utils: web.IUrlUtilsInstance): IMatchedRoute {
            var routes = this._routes,
                url = this._getUrlFragment(utils),
                route: IRouteMatcher,
                exec: RegExpExecArray,
                args: Array<string>,
                routeParams: IObject<string> = {},
                path: string,
                argsLength: number,
                length = routes.length;

            if (isEmpty(url)) {
                var base = this._baseRoute || this._defaultRoute;

                if (isNull(base)) {
                    return;
                }

                return {
                    injector: base.injector,
                    type: base.type,
                    route: {
                        path: url,
                        parameters: {},
                        query: utils.query
                    }
                };
            }

            for (var i = 0; i < length; ++i) {
                route = routes[i];
                exec = route.regex.exec(url);

                if (isNull(exec)) {
                    continue;
                }

                args = route.args;
                argsLength = args.length;
                path = exec.input;

                if (argsLength === 0) {
                    args = Object.keys(exec.slice());
                    exec.unshift('');
                    argsLength = args.length;
                }

                for (var j = 0; j < argsLength; ++j) {
                    routeParams[args[j]] = exec[j + 1];
                }

                return {
                    injector: route.injector,
                    type: route.type,
                    route: {
                        path: path,
                        parameters: routeParams,
                        query: utils.query
                    }
                };
            }

            var defaultRoute = this._defaultRoute;
            if (isNull(defaultRoute)) {
                return;
            }

            return {
                injector: defaultRoute.injector,
                type: defaultRoute.type,
                route: {
                    path: url,
                    parameters: {},
                    query: utils.query
                }
            };
        }

        /**
         * @name _getUrlFragment
         * @memberof plat.web.Router
         * @kind function
         * @access protected
         * 
         * @description
         * Trims the first and last slash on the URL pathname and returns it.
         * 
         * @param {plat.web.IUrlUtilsInstance} utils The utility used to obtain 
         * the url fragment.
         * 
         * @returns {string} The trimmed URL pathname.
         */
        _getUrlFragment(utils: web.IUrlUtilsInstance): string {
            return utils.pathname.replace(this.__pathSlashRegex, '');
        }
    }

    /**
     * The Type for referencing the '$Router' injectable as a dependency.
     */
    export function IRouter(): IRouter {
        return new Router();
    }

    register.injectable(__Router, IRouter);

    /**
     * @name IRouter
     * @memberof plat.web
     * @kind interface
     * 
     * @description
     * Describes the object that handles route registration and navigation 
     * to and from {@link plat.ui.IWebViewControl|IWebViewControls} within a 
     * {@link plat.ui.controls.Routeport|Routeport}.
     */
    export interface IRouter {
        /**
         * @name uid
         * @memberof plat.web.IRouter
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * A unique string identifier.
         */
        uid: string;

        /**
         * @name registerRoutes
         * @memberof plat.web.IRouter
         * @kind function
         * @access public
         * 
         * @description
         * Registers route strings/RegExps and associates them with a control type.
         * 
         * @param {string} type The control type with which to associate the routes.
         * @param {Array<any>} routes An array of strings or RegExp expressions to associate with 
         * the control type.
         * 
         * @returns {void}
         */
        registerRoutes(type: string, routes: Array<any>): void;

        /**
         * @name route
         * @memberof plat.web.IRouter
         * @kind function
         * @access public
         * 
         * @description
         * Formats a url path given the parameters and query string, then changes the 
         * url to that path.
         * 
         * @param {string} path The route path to navigate to.
         * @param {plat.web.IRouteNavigationOptions} options? The {@link plat.web.IRouteNavigationOptions|IRouteNavigationOptions}  
         * included with this route.
         * 
         * @returns {boolean} Whether or not the route operation was a success.
         */
        route(path: string, options?: web.IRouteNavigationOptions): boolean;

        /**
         * @name goBack
         * @memberof plat.web.IRouter
         * @kind function
         * @access public
         * 
         * @description
         * Navigates back in the history.
         * 
         * @param {number} length? The number of entries to go back in the history.
         * 
         * @returns {void}
         */
        goBack(length?: number): void;
    }

    /**
     * @name IRouteNavigationOptions
     * @memberof plat.web
     * @kind interface
     * 
     * @extends {plat.navigation.IBaseNavigationOptions}
     * 
     * @description
     * Options that you can submit to the router in order
     * to customize navigation.
     */
    export interface IRouteNavigationOptions extends navigation.IBaseNavigationOptions {
        /**
         * @name query
         * @memberof plat.web.IRouteNavigationOptions
         * @kind property
         * @access public
         * 
         * @type {plat.IObject<string>}
         * 
         * @description
         * An object that includes the query parameters to be inserted into the route 
         * as the query string.
         */
        query?: IObject<string>;
    }

    /**
     * @name IRouteMatcher
     * @memberof plat.web
     * @kind interface
     * 
     * @description
     * Used by the navigator for matching a route with 
     * a {@link plat.ui.IBaseViewControl|IBaseViewControl's} injector.
     */
    export interface IRouteMatcher {
        /**
         * @name injector
         * @memberof plat.web.IRouteMatcher
         * @kind property
         * @access public
         * 
         * @type {plat.dependency.IInjector<plat.ui.IBaseViewControl>}
         * 
         * @description
         * The {@link plat.ui.IBaseViewControl|IBaseViewControl} injector.
         */
        injector?: dependency.IInjector<ui.IBaseViewControl>;

        /**
         * @name type
         * @memberof plat.web.IRouteMatcher
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The type of {@link plat.ui.IBaseViewControl|IBaseViewControl}.
         */
        type?: string;

        /**
         * @name regex
         * @memberof plat.web.IRouteMatcher
         * @kind property
         * @access public
         * 
         * @type {RegExp}
         * 
         * @description
         * A regular expression to match with the url.
         */
        regex: RegExp;

        /**
         * @name args
         * @memberof plat.web.IRouteMatcher
         * @kind property
         * @access public
         * 
         * @type {Array<string>}
         * 
         * @description
         * Route arguments used to create route parameters  
         * in the event of a url match.
         */
        args: Array<string>;
    }

    /**
     * @name IMatchedRoute
     * @memberof plat.web
     * @kind interface
     * 
     * @description
     * Provides a {@link plat.dependency.IInjector<plat.ui.IBaseViewControl>|IInjector<IBaseViewControl>} that matches 
     * the given {@link plat.web.IRoute|IRoute}.
     */
    export interface IMatchedRoute {
        /**
         * @name injector
         * @memberof plat.web.IMatchedRoute
         * @kind property
         * @access public
         * 
         * @type {plat.dependency.IInjector<plat.ui.IBaseViewControl>}
         * 
         * @description
         * The associated {@link plat.dependency.IInjector<plat.ui.IBaseViewControl>|IInjector<IBaseViewControl>} for the route.
         */
        injector: dependency.IInjector<ui.IBaseViewControl>;

        /**
         * @name type
         * @memberof plat.web.IMatchedRoute
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The type of {@link plat.ui.IBaseViewControl|IBaseViewControl}.
         */
        type: string;

        /**
         * @name route
         * @memberof plat.web.IMatchedRoute
         * @kind property
         * @access public
         * 
         * @type {plat.web.IRoute<any>}
         * 
         * @description
         * The route associated with this object's injector.
         */
        route?: IRoute<any>;
    }

    /**
     * @name IRoute
     * @memberof plat.web
     * @kind interface
     * 
     * @typeparam {{}} T The type of the defined parameters matched with this route.
     * 
     * @description
     * Contains the parsed properties of a url.
     */
    export interface IRoute<T extends {}> {
        /**
         * @name parameters
         * @memberof plat.web.IRoute
         * @kind property
         * @access public
         * 
         * @type {T}
         * 
         * @description
         * The defined parameters that were matched with the route. 
         * When a route is registered, the registrant can specify named 
         * route parameters. Those parameters will appear in this object 
         * as key/value pairs.
         */
        parameters: T;

        /**
         * @name path
         * @memberof plat.web.IRoute
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * This property will always exist and will be equal to the full
         * route for navigation (only the path from root, not including 
         * the query string).
         */
        path: string;

        /**
         * @name query
         * @memberof plat.web.IRoute
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * An object containing query string key/value pairs.
         */
        query?: any;
    }
}

