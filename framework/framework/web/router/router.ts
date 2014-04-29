module plat.web {
    /**
     * The class that handles route registration and navigation 
     * to and from IViewControls within the Routeport.
     */
    export class Router implements IRouter {
        /**
         * A unique string identifier.
         */
        uid: string;

        /**
         * The registered routes (as IRouteMatchers) for matching 
         * on route change.
         */
        _routes: Array<IRouteMatcher> = [];

        /**
         * The function to stop listening to the 'urlChanged' event.
         */
        _removeListener: IRemoveListener;

        /**
         * The registered default route ('') converted into an IMatchedRoute. 
         * The default route is used whenever a specified route/url is not matched.
         */
        _defaultRoute: IMatchedRoute;

        /**
         * The registered base route ('/') converted into an IMatchedRoute. 
         * The base route is the first route navigated to in the Routeport if a 
         * defaultRoute is not specified in its plat-options.
         */
        _baseRoute: IMatchedRoute;
        $browser: IBrowser = acquire('$browser');
        $browserConfig: IBrowserConfig = acquire('$browser.config');
        $EventManagerStatic: events.IEventManagerStatic = acquire('$EventManagerStatic');
        $NavigationEventStatic: events.INavigationEventStatic = acquire('$NavigationEventStatic');
        $compat: ICompat = acquire('$compat');
        $ExceptionStatic: IExceptionStatic = acquire('$ExceptionStatic');
        $regex: expressions.IRegex = acquire('$regex');
        $window: Window = acquire('$window');
        private __escapeRegex = this.$regex.escapeRouteRegex;
        private __optionalRegex = this.$regex.optionalRouteRegex;
        private __pathSlashRegex = /^\/|\/$/g;
        private __firstRoute = true;
        private __history: Array<string>;
        constructor() {
            var ContextManager: observable.IContextManagerStatic = acquire('$ContextManagerStatic');
            ContextManager.defineGetter(this, 'uid', uniqueId('plat_'));

            this._removeListener = this.$EventManagerStatic.on(this.uid, 'urlChanged', this._routeChanged, this);
            var config = this.$browserConfig;
            if (config.routingType === config.routeType.NONE) {
                config.routingType = config.routeType.HASH;
                config.hashPrefix = config.hashPrefix || '';
            }

            if (this.$compat.msApp) {
                this.__history = [];
            }
        }

        /**
         * Registers route strings/RegExp and associates them with a control type.
         * 
         * @param type The control type with which to associate the routes.
         * @param routes An array of strings or RegExp expressions to associate with 
         * the control type.
         */
        registerRoutes(type: string, routes: Array<any>) {
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
         * Formats a url path given the parameters and query string, then changes the 
         * url to that path.
         * 
         * @param path The route to match with a registered ViewControl.
         * @param options The IRouteNavigationOptions associated with this routing 
         * operation.
         */
        route(path: string, options?: IRouteNavigationOptions) {
            options = options || <IRouteNavigationOptions>{};

            var replace = options.replace,
                route: string,
                match: IMatchedRoute,
                currentUtils = this.$browser.urlUtils();

            if (this.__firstRoute) {
                this.__firstRoute = false;
                if (!isEmpty(currentUtils.pathname) && currentUtils.pathname !== '/') {
                    this._routeChanged(null, currentUtils);
                    return;
                }
            }

            var build = this._buildRoute(path, options.query);

            if (isNull(build)) {
                this.$ExceptionStatic.warn('Route: ' + path + ' is not a matched route.', this.$ExceptionStatic.NAVIGATION);
                return;
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

            if (event.canceled) {
                return;
            }

            var nextUtils = this.$browser.urlUtils(route);

            if (currentUtils.href === nextUtils.href) {
                replace = true;
            }

            this.$browser.url(route, replace);
        }

        /**
         * Navigates back in the history.
         * 
         * @param length The number of entries to go back in the history.
         */
        goBack(length?: number) {
            this.$window.history.go(-length);

            if (this.__history && this.__history.length > 1) {
                var historyLength = this.__history.length;
                this.__history = this.__history.slice(0, historyLength - length);
                this.$browser.url(this.__history.pop() || '');
            }
        }

        /**
         * Builds a valid route with a valid query string to use for navigation.
         * 
         * @param routeParameter The route portion of the navigation path. Used to 
         * match with a registered ViewControl.
         * @param query The route query object if passed into the 
         * IRouteNavigationOptions.
         */
        _buildRoute(routeParameter: string, query: IObject<string>) {
            var queryStr = this._buildQueryString(query);

            if (!isString(routeParameter)) {
                return;
            }

            var route = routeParameter + queryStr,
                utils = this.$browser.urlUtils(route),
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
         * Builds the query string if a query object was passed into 
         * the IRouteNavigationOptions.
         * 
         * @param query The query object passed in.
         */
        _buildQueryString(query: IObject<string>) {
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
         * The method called when the route function is invoked 
         * or on a 'urlChanged' event.
         * 
         * @param ev The 'urlChanged' event object.
         * @param utils The IUrlUtils created for the invoked 
         * route function.
         */
        _routeChanged(ev: events.IDispatchEvent, utils: web.IUrlUtils) {
            var matchedRoute = this._match(utils);

            if (isNull(matchedRoute)) {
                this.$ExceptionStatic.warn('Could not match route: ' + utils.pathname,
                    this.$ExceptionStatic.NAVIGATION);
                return;
            }

            if (this.__history) {
                this.__history.push(matchedRoute.route.path);
            }

            var event = this.$NavigationEventStatic.dispatch('routeChanged', this, {
                parameter: matchedRoute.route,
                target: matchedRoute.injector,
                type: matchedRoute.type,
                options: null,
                cancelable: false
            });
        }

        /**
         * Registers a ViewControl's route.
         * 
         * @param route Can be either a string or RegExp.
         * @param injector The injector for the ViewControl defined by 
         * the type.
         * @param type The control type.
         */
        _registerRoute(route: any, injector: dependency.IInjector<ui.IViewControl>, type: string) {
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
                routeParameters = this._getRouteParameters(route);
                routeParameters.injector = injector;
                routeParameters.type = type;
            }

            this._routes.push(routeParameters);
        }

        /**
         * Parses the route and pulls out route parameters. Then 
         * converts them to regular expressions to match for 
         * routing.
         * 
         * @param route The route to parse.
         */
        _getRouteParameters(route: string): IRouteMatcher {
            var regex = this.$regex,
                namedRegex = regex.namedParameterRouteRegex,
                escapeRegex = this.__escapeRegex,
                optionalRegex = this.__optionalRegex,
                wildcardRegex = regex.wildcardRouteRegex,
                regexArgs = route.match(namedRegex),
                wildcard = wildcardRegex.exec(route),
                args = [];

            route = route.replace(escapeRegex, '\\$')
                .replace(optionalRegex, '(?:$1)?')
                .replace(namedRegex, function (match, optional) {
                    return optional ? match : '([^/?]+)';
                })
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
         * Matches a route to a registered route using the 
         * registered route's regular expression.
         */
        _match(utils: web.IUrlUtils): IMatchedRoute {
            var routes = this._routes,
                url = this._getUrlFragment(utils),
                route: IRouteMatcher,
                exec: RegExpExecArray,
                args: Array<string>,
                routeParams = {},
                path: string,
                argsLength,
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
         * Trims the first and last slash on the pathname and returns it.
         * 
         * @param utils The IUrlUtils associated with this route function.
         */
        _getUrlFragment(utils: web.IUrlUtils) {
            return utils.pathname.replace(this.__pathSlashRegex, '');
        }
    }

    register.injectable('$router', Router);

    /**
     * Options that you can submit to the router in order
     * to customize navigation.
     */
    export interface IRouteNavigationOptions extends navigation.IBaseNavigationOptions {
        /**
         * An object that includes the query parameters to be inserted into the route 
         * as the query string.
         */
        query?: IObject<string>;
    }

    /**
     * Used by the navigator for matching a route with 
     * a view control injector.
     */
    export interface IRouteMatcher {
        /**
         * The IViewControl injector.
         */
        injector?: dependency.IInjector<ui.IViewControl>;

        /**
         * The type of IViewControl
         */
        type?: string;

        /**
         * A regular expression to match with the url.
         */
        regex: RegExp;

        /**
         * Route arguments used to create IRouteParameters 
         * in the event of a url match.
         */
        args: Array<string>;
    }

    /**
     * Extends IRoute to provide a control injector that matches 
     * the given IRoute.
     */
    export interface IMatchedRoute {
        /**
         * The associated view control injector for the route.
         */
        injector: dependency.IInjector<ui.IViewControl>;

        /**
         * The type of IViewControl
         */
        type: string;

        /**
         * The route associated with the injector
         */
        route?: IRoute<any>;
    }

    /**
     * Contains the parsed properties of a url.
     */
    export interface IRoute<T extends {}> {
        /**
         * The defined parameters that were matched with the route. 
         * When a route is registered, the registrant can specify named 
         * route parameters. Those parameters will appear in this object 
         * as key/value pairs.
         */
        parameters: T;

        /**
         * This property will always exist and will be equal to the full
         * route for navigation (only the path from root, not including 
         * the query string).
         */
        path: string;

        /**
         * An object containing query string key/value pairs.
         */
        query?: IObject<string>;
    }

    /**
     * Describes the object that handles route registration and navigation 
     * to and from IViewControls within the Routeport.
     */
    export interface IRouter {
        /**
         * Registers route strings/RegExp and associates them with a control type.
         * 
         * @param type The control type with which to associate the routes.
         * @param routes An array of strings or RegExp expressions to associate with 
         * the control type.
         */
        registerRoutes(type: string, routes: Array<any>);

        /**
         * Formats a url path given the parameters and query string, then changes the 
         * url to that path.
         * 
         * @param path The route path to navigate to.
         * @param options The IRouteNavigationOptions included with this route.
         */
        route(path: string, options?: web.IRouteNavigationOptions): void;

        /**
         * Navigates back in the history.
         * 
         * @param length The number of entries to go back in the history.
         */
        goBack(length?: number): void;
    }
}

