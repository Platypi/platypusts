module plat.routing {
    'use strict';

    const __CHILD_ROUTE = '/*childRoute',
        __CHILD_ROUTE_LENGTH = __CHILD_ROUTE.length;

    /**
     * @name Router
     * @memberof plat.routing
     * @kind class
     *
     * @description
     * Matches URLs to registered views. Allows for rejecting navigation, as well as
     * processing route and query parameters. When a route is matches, the current view
     * has the opportunity to reject/delay navigation. The next view can also reject navigation,
     * or redirect.
     * This is done asynchronously, giving the application the ability to make web service calls
     * to determing
     */
    export class Router {
        protected static _inject: any = {
            _Promise: __Promise,
            _Injector: __InjectorStatic,
            _EventManager: __EventManagerStatic,
            _browser: __Browser,
            _browserConfig: __BrowserConfig,
            _recognizer: __RouteRecognizerInstance,
            _childRecognizer: __RouteRecognizerInstance
        };

        /**
         * @name __currentRouter
         * @memberof plat.routing.Router
         * @kind property
         * @access private
         * @static
         *
         * @type {plat.routing.Router}
         *
         * @description
         * The last instantiated router, useful for components wanting to find the most recently
         * created router in order to generate routes.
         */
        private static __currentRouter: Router;

        /**
         * @name navigating
         * @memberof plat.routing.Router
         * @kind property
         * @access public
         *
         * @type {boolean}
         *
         * @description
         * Whether or not the router is currently navigating.
         */
        navigating: boolean = false;

        /**
         * @name finishNavigating
         * @memberof plat.routing.Router
         * @kind property
         * @access public
         *
         * @type {plat.async.IThenable<void>}
         *
         * @description
         * A {@link plat.async.IPromise|Promise} That resolves when the router is done navigating.
         */
        finishNavigating: async.IThenable<void>;

        /**
         * @name currentRouteInfo
         * @memberof plat.routing.Router
         * @kind property
         * @access public
         *
         * @type {plat.routing.IRouteInfo}
         *
         * @description
         * The route information for the active route state.
         */
        currentRouteInfo: IRouteInfo;

        /**
         * @name parent
         * @memberof plat.routing.Router
         * @kind property
         * @access public
         *
         * @type {plat.routing.Router}
         *
         * @description
         * The parent router to this router. Useful for generating and matching routes.
         */
        parent: Router;

        /**
         * @name children
         * @memberof plat.routing.Router
         * @kind property
         * @access public
         *
         * @type {Array<plat.routing.Router>}
         *
         * @description
         * All the registered children for this router. Useful for generating and matching routes.
         */
        children: Array<Router> = [];

        /**
         * @name uid
         * @memberof plat.routing.Router
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * A unique id for the router.
         */
        uid: string;

        /**
         * @name isRoot
         * @memberof plat.routing.Router
         * @kind property
         * @access public
         *
         * @type {boolean}
         *
         * @description
         * Whether or not this router is the root router (has no parent).
         */
        isRoot: boolean = false;

        /**
         * @name _nextRouteInfo
         * @memberof plat.routing.Router
         * @kind property
         * @access protected
         *
         * @type {plat.routing.IRouteInfo}
         *
         * @description
         * The route information for the next route state.
         */
        protected _nextRouteInfo: IRouteInfo;

        /**
         * @name previousUrl
         * @memberof plat.routing.Router
         * @kind property
         * @access protected
         *
         * @type {string}
         *
         * @description
         * The previous url matched for this router.
         */
        protected _previousUrl: string;

        /**
         * @name previousQuery
         * @memberof plat.routing.Router
         * @kind property
         * @access protected
         *
         * @type {string}
         *
         * @description
         * The previous query matched for this router.
         */
        protected _previousQuery: string;

        /**
         * @name previousSegment
         * @memberof plat.routing.Router
         * @kind property
         * @access protected
         *
         * @type {string}
         *
         * @description
         * The previous route segment matched for this router.
         */
        protected _previousSegment: string;

        /**
         * @name previousPattern
         * @memberof plat.routing.Router
         * @kind property
         * @access protected
         *
         * @type {string}
         *
         * @description
         * The previous registered route pattern matched for this router.
         */
        protected _previousPattern: string;

        /**
         * @name _recognizer
         * @memberof plat.routing.Router
         * @kind property
         * @access protected
         *
         * @type {plat.routing.RouteRecognizer}
         *
         * @description
         * Used for registering, generating, and recognizing routes.
         */
        protected _recognizer: RouteRecognizer;

        /**
         * @name _childRecognizer
         * @memberof plat.routing.Router
         * @kind property
         * @access protected
         *
         * @type {plat.routing.RouteRecognizer}
         *
         * @description
         * Used for registering, generating, and recognizing child routes.
         */
        protected _childRecognizer: RouteRecognizer;

        /**
         * @name _paramTransforms
         * @memberof plat.routing.Router
         * @kind property
         * @access protected
         *
         * @type {plat.IObject<plat.routing.IRouteTransforms>}
         *
         * @description
         * An object containing transform methods for route parameters.
         */
        protected _paramTransforms: IObject<IRouteTransforms> = {};

        /**
         * @name _queryTransforms
         * @memberof plat.routing.Router
         * @kind property
         * @access protected
         *
         * @type {plat.IObject<plat.routing.IRouteTransforms>}
         *
         * @description
         * An object containing transform methods for query parameters.
         */
        protected _queryTransforms: IObject<IRouteTransforms> = {};

        /**
         * @name _interceptors
         * @memberof plat.routing.Router
         * @kind property
         * @access protected
         *
         * @type {plat.IObject<Array<(routeInfo: plat.routing.IRouteInfo) => any>>}
         *
         * @description
         * An object containing interceptor methods for particular routes.
         */
        protected _interceptors: IObject<Array<(routeInfo: IRouteInfo) => any>> = {};

        /**
         * @name _unknownHandler
         * @memberof plat.routing.Router
         * @kind property
         * @access protected
         *
         * @type {(info: plat.routing.IUnknownRouteInfo) => any}
         *
         * @description
         * A handler for unknown routes.
         */
        protected _unknownHandler: (info: IUnknownRouteInfo) => any;

        /**
         * @name _ports
         * @memberof plat.routing.Router
         * @kind property
         * @access protected
         *
         * @type {Array<plat.routing.ISupportRouteNavigation>}
         *
         * @description
         * All the registered {@link plat.ui.controls.Viewport|Viewports} for the router.
         */
        protected _ports: Array<ISupportRouteNavigation> = [];

        /**
         * @name _Promise
         * @memberof plat.routing.Router
         * @kind property
         * @access protected
         *
         * @type {plat.async.IPromise}
         *
         * @description
         * The Promise injectable
         */
        protected _Promise: async.IPromise;

        /**
         * @name _Injector
         * @memberof plat.routing.Router
         * @kind property
         * @access protected
         *
         * @type {plat.dependency.Injector}
         *
         * @description
         * The Injector class, used to match ViewControls to their registered tokens.
         */
        protected _Injector: typeof dependency.Injector;

        /**
         * @name _browser
         * @memberof plat.routing.Router
         * @kind property
         * @access protected
         *
         * @type {plat.web.Browser}
         *
         * @description
         * Used to grab the initial url for the router if necessary.
         */
        protected _browser: web.Browser;

        /**
         * @name _resolve
         * @memberof plat.routing.Router
         * @kind property
         * @access protected
         *
         * @type {plat.async.Promise.resolve}
         *
         * @description
         * A shortcut to the Promise.resolve function.
         */
        protected _resolve: typeof async.Promise.resolve = this._Promise.resolve.bind(this._Promise);

        /**
         * @name _resolve
         * @memberof plat.routing.Router
         * @kind property
         * @access protected
         *
         * @type {plat.async.Promise.reject}
         *
         * @description
         * A shortcut to the Promise.reject function.
         */
        protected _reject: typeof async.Promise.reject = this._Promise.reject.bind(this._Promise);

        /**
         * @name currentRouter
         * @memberof plat.routing.Router
         * @kind function
         * @access public
         * @static
         *
         * @description
         * Exposes the {@link plat.routing.Router.__currentRouter|current router} property. Also provides the
         * ability to set the current router.
         *
         * @param {plat.routing.Router} router Will set the current router.
         *
         * @returns {plat.routing.Router} The current router.
         */
        static currentRouter(router?: Router): Router {
            if (!isNull(router)) {
                Router.__currentRouter = router;
            }

            return Router.__currentRouter;
        }

        /**
         * @name constructor
         * @memberof plat.routing.Router
         * @kind function
         * @access public
         * @constructor
         *
         * @description
         * Instantiates a new router and sets it as the current router.
         *
         * @returns {plat.routing.Router} The router.
         */
        constructor() {
            this.uid = uniqueId(__Plat);
            this.isRoot = isNull(Router.currentRouter());
            Router.currentRouter(this);
            this.initialize();
        }

        /**
         * @name initialize
         * @memberof plat.routing.Router
         * @kind function
         * @access public
         *
         * @description
         * Initializes a router, giving it a parent router to link to if necessary.
         *
         * @param {plat.routing.Router} parent? The parent router to link.
         *
         * @returns {void}.
         */
        initialize(parent?: Router): void {
            this.parent = parent;
        }

        /**
         * @name addChild
         * @memberof plat.routing.Router
         * @kind function
         * @access public
         *
         * @description
         * Registers a child router with the current router.
         *
         * @param {plat.routing.Router} child A child router.
         *
         * @returns {plat.routing.Router} The initialized child router.
         */
        addChild(child: Router): Router {
            if (isNull(child) || this.children.indexOf(child) > -1) {
                return child;
            }

            child.initialize(this);
            this.children.push(child);

            return child;
        }

        /**
         * @name removeChild
         * @memberof plat.routing.Router
         * @kind function
         * @access public
         *
         * @description
         * Removes a child from the router's children, if it exists.
         *
         * @param {plat.routing.Router} child The child router to remove.
         *
         * @returns {void}
         */
        removeChild(child: Router): void {
            let children = this.children,
                index = this.children.indexOf(child);

            if (index < 0) {
                return;
            }

            children.splice(index, 1);
        }

        /**
         * @name register
         * @memberof plat.routing.Router
         * @kind function
         * @access public
         *
         * @description
         * Registers a {@link plat.ui.controls.Viewport|Viewport} (or similar object) with the
         * router, and triggers a navigation if possible.
         *
         * @param {plat.routing.ISupportRouteNavigation} port An object that supports all the navigation events.
         *
         * @returns {plat.async.IThenable<void>} A {@link plat.async.IPromise|Promise} resolving when the
         * triggered navigation has finished.
         */
        register(port: ISupportRouteNavigation): async.IThenable<void> {
            let ports = this._ports;

            if (isNull(port) || ports.indexOf(port) > -1) {
                return this._resolve();
            }

            ports.push(port);

            if (!isObject(this.currentRouteInfo)) {
                return this._resolve();
            }

            this.navigating = true;
            return this._resolve(this.finishNavigating)
                .catch(noop)
                .then((): async.IThenable<void> => {
                    let routeInfo = _clone(this.currentRouteInfo, true);
                    return this.finishNavigating = this._canNavigateTo(routeInfo)
                        .then((canNavigateTo): async.IThenable<void> => {
                            if (!canNavigateTo) {
                                return;
                            }
                            this.currentRouteInfo = undefined;
                            return this._performNavigation(routeInfo);
                        }).then((): void => {
                            this.navigating = false;
                            this.currentRouteInfo = routeInfo;
                        }, (): void => {
                            this.navigating = false;
                        });
                });
        }

        /**
         * @name unregister
         * @memberof plat.routing.Router
         * @kind function
         * @access public
         *
         * @description
         * Unregisters a {@link plat.ui.controls.Viewport|Viewport} (or similar object) with the
         * router in order to stop receiving navigation events.
         *
         * @param {plat.routing.ISupportRouteNavigation} port An object that supports all the navigation events.
         *
         * @returns {void}
         */
        unregister(port: ISupportRouteNavigation): void {
            let ports = this._ports,
                index = ports.indexOf(port);

            if (index < 0) {
                return;
            }

            ports.splice(index, 1);

            if (ports.length === 0 && !isNull(this.parent)) {
                this.parent.removeChild(this);
            }
        }

        /**
         * @name configure
         * @memberof plat.routing.Router
         * @kind function
         * @access public
         * @variation 0
         *
         * @description
         * Configures routes for the router to match. Routes contain the information necessary to map a
         * route to a particular {@link plat.ui.ViewControl|ViewControl}. Also forces a navigation.
         *
         * @param {plat.routing.IRouteMapping} route A route mapping to register.
         *
         * @returns {plat.async.IThenable<void>} A {@link plat.async.IPromise|Promise} that resolves when the
         * forced navigation is complete.
         */
        configure(route: IRouteMapping): async.IThenable<void>;
        /**
         * @name configure
         * @memberof plat.routing.Router
         * @kind function
         * @access public
         * @variation 1
         *
         * @description
         * Configures routes for the router to match. Routes contain the information necessary to map a
         * route to a particular {@link plat.ui.ViewControl|ViewControl}. Also forces a navigation.
         *
         * @param {Array<plat.routing.IRouteMapping>} routes Route mappings to register.
         *
         * @returns {plat.async.IThenable<void>} A {@link plat.async.IPromise|Promise} that resolves when the
         * forced navigation is complete.
         */
        configure(routes: Array<IRouteMapping>): async.IThenable<void>;
        configure(routes: any): async.IThenable<void> {
            if (isArray(routes)) {
                forEach((route: IRouteMapping): void => {
                    this._configureRoute(route);
                }, routes);
            } else {
                this._configureRoute(routes);
            }

            return this._forceNavigate();
        }

        /**
         * @name unknown
         * @memberof plat.routing.Router
         * @kind function
         * @access public
         *
         * @description
         * Allows for dynamic routing. Call this method in order to register a handler for dynamically determining what view to
         * use when a registered route is not found.
         *
         * @param {(info: IUnknownRouteInfo) => any} handler A method called to determine what view is associated with a route.
         *
         * @returns {plat.routing.Router} The router, for method chaining.
         */
        unknown(handler: (info: IUnknownRouteInfo) => any): Router {
            this._unknownHandler = handler;
            return this;
        }

        /**
         * @name param
         * @memberof plat.routing.Router
         * @kind function
         * @access public
         * @variation 0
         *
         * @description
         * Registers a handler for a route parameter. When a route is a variable route (e.g. /posts/:id), all the param handlers
         * registered for the particular view and parameter "id" will be called. The call to the handler is blocking, so the handler
         * can return a promise while it processes the parameter. All the handlers for a parameter will be called in the order in which
         * they were registered, with the catch-all (i.e. '*') handlers being called first. Param handlers will be called after all the
         * query param handlers have been processed. Param handlers are called prior to calling the "canNavigateTo" pipeline.
         *
         * @param {(value: any, parameters: any, query: any) => any} handler A method that will manipulate the registered parameter.
         * @param {string} parameter The parameter that the registered handler will modify.
         * @param {new (...args: any[]) => any} view The view used to match the route. If left out, all routes will be matched.
         *
         * @returns {plat.routing.Router} The router, for method chaining.
         */
        param(handler: (value: any, parameters: any, query: any) => any, parameter: string, view?: new (...args: any[]) => any): Router;
        /**
         * @name param
         * @memberof plat.routing.Router
         * @kind function
         * @access public
         * @variation 1
         *
         * @description
         * Registers a handler for a route parameter. When a route is a variable route (e.g. /posts/:id), all the param handlers
         * registered for the particular view and parameter "id" will be called. The call to the handler is blocking, so the handler
         * can return a promise while it processes the parameter. All the handlers for a parameter will be called in the order in which
         * they were registered, with the catch-all (i.e. '*') handlers being called first. Param handlers will be called after all the
         * query param handlers have been processed. Param handlers are called prior to calling the "canNavigateTo" pipeline.
         *
         * @param {(value: any, parameters: any, query: any) => any} handler A method that will manipulate the registered parameter.
         * @param {string} parameter The parameter that the registered handler will modify.
         * @param {string} view The view's registered token used to match the route. If left out, all routes will be matched.
         *
         * @returns {plat.routing.Router} The router, for method chaining.
         */
        param(handler: (value: any, parameters: any, query: any) => any, parameter: string, view?: string): Router;
        param(handler: (value: any, parameters: any, query: any) => any, parameter: string, view?: any): Router {
            return this._addHandler(handler, parameter, view, this._paramTransforms);
        }

        /**
         * @name queryParam
         * @memberof plat.routing.Router
         * @kind function
         * @access public
         * @variation 0
         *
         * @description
         * Registers a handler for a query parameter. When a route contains a query string (e.g. '?start=0'), it will be serialized into an object.
         * Then, all the queryParam handlers registered for the particular view and query parameter "start" will be called. The call to the handler
         * is blocking, so the handler can return a promise while it processes the parameter. All the handlers for a parameter will be called in the
         * order in which they were registered, with the catch-all (i.e. '*') handlers being called first. Query param handlers are called prior to
         * calling the "canNavigateTo" pipeline.
         *
         * @param {(value: any, query: any) => any} handler A method that will manipulate the registered parameter.
         * @param {string} parameter The parameter that the registered handler will modify.
         * @param {new (...args: any[]) => any} view The view used to match the route. If left out, all routes will be matched.
         *
         * @returns {plat.routing.Router} The router, for method chaining.
         */
        queryParam(handler: (value: any, query: any) => any, parameter: string, view?: new (...args: any[]) => any): Router;
        /**
         * @name queryParam
         * @memberof plat.routing.Router
         * @kind function
         * @access public
         * @variation 1
         *
         * @description
         * Registers a handler for a query parameter. When a route contains a query string (e.g. '?start=0'), it will be serialized into an object.
         * Then, all the queryParam handlers registered for the particular view and query parameter "start" will be called. The call to the handler
         * is blocking, so the handler can return a promise while it processes the parameter. All the handlers for a parameter will be called in the
         * order in which they were registered, with the catch-all (i.e. '*') handlers being called first. Query param handlers are called prior to
         * calling the "canNavigateTo" pipeline.
         *
         * @param {(value: any, query: any) => any} handler A method that will manipulate the registered parameter.
         * @param {string} parameter The parameter that the registered handler will modify.
         * @param {string} view The view's registered token used to match the route. If left out, all routes will be matched.
         *
         * @returns {plat.routing.Router} The router, for method chaining.
         */
        queryParam(handler: (value: any, query: any) => any, parameter: string, view?: string): Router;
        queryParam(handler: (value: string, query: any) => any, parameter: string, view?: any): Router {
            return this._addHandler(handler, parameter, view, this._queryTransforms);
        }

        /**
         * @name intercept
         * @memberof plat.routing.Router
         * @kind function
         * @access public
         * @variation 0
         *
         * @description
         * Registers a handler for a particular route, or all routes. When the route changes, the interceptors registered for the route will be
         * called in-order (starting with the catch-all interceptors), and they have the opportunity to modify the route information, as well as
         * prevent navigation from occuring. Interceptors are called prior to calling the "canNavigateTo" pipeline.
         *
         * @param {(routeInfo: plat.routing.IRouteInfo) => any} interceptor A method that will process the current route.
         * @param {new (...args: any[]) => any} view The view used to match the route. If left out, all routes will be matched.
         *
         * @returns {plat.routing.Router} The router, for method chaining.
         */
        intercept(handler: (routeInfo: IRouteInfo) => any, view?: new (...args: any[]) => any): Router;
        /**
         * @name intercept
         * @memberof plat.routing.Router
         * @kind function
         * @access public
         * @variation 1
         *
         * @description
         * Registers a handler for a particular route, or all routes. When the route changes, the interceptors registered for the route will be
         * called in-order (starting with the catch-all interceptors), and they have the opportunity to modify the route information, as well as
         * prevent navigation from occuring. Interceptors are called prior to calling the "canNavigateTo" pipeline.
         *
         * @param {(routeInfo: plat.routing.IRouteInfo) => any} interceptor A method that will process the current route.
         * @param {string} view The view's registered token used to match the route. If left out, all routes will be matched.
         *
         * @returns {plat.routing.Router} The router, for method chaining.
         */
        intercept(interceptor: (routeInfo: IRouteInfo) => any, view?: string): Router;
        intercept(interceptor: (routeInfo: IRouteInfo) => any, view?: any): Router {
            if (isUndefined(view)) {
                view = '*';
            }

            let alias = view;

            if (view !== '*') {
                view = this._Injector.convertDependency(view);
            }

            if (view === __NOOP_INJECTOR) {
                view = alias;
            }

            let interceptors = this._interceptors[view];

            if (!isArray(interceptors)) {
                interceptors = this._interceptors[view] = [];
            }

            interceptors.push(interceptor);

            return this;
        }

        /**
         * @name navigate
         * @memberof plat.routing.Router
         * @kind function
         * @access public
         *
         * @description
         * Tells the router to match a new route. The router will attempt to find the route and if it succeeds it will
         * attempt to navigate to it. If it fails, it will return a {@link plat.async.IPromise|Promise} that rejects.
         *
         * @param {string} url The new route to match.
         * @param {plat.IObject<any>} query The query parameters for the route.
         * @param {boolean} force Whether or not to force navigation, even if the same url has already been matched.
         *
         * @returns {plat.async.IThenable<void>} A {@link plat.async.IPromise|Promise} that resolves/rejects based on the success of
         * the navigation.
         */
        navigate(url: string, query?: IObject<any>, force?: boolean, poll?: boolean): async.IThenable<void> {
            if (!isObject(query)) {
                query = {};
            }

            let resolve = this._resolve,
                queryString = serializeQuery(query);

            if (url === '/') {
                url = '';
            }

            force = force === true;

            if (!isString(url) || this.navigating || (!force && url === this._previousUrl && queryString === this._previousQuery)) {
                if (this.navigating) {
                    return this.finishNavigating.then((): async.IThenable<void> => {
                        return this.navigate(url, query, force);
                    });
                }

                return resolve();
            }

            let result: IRouteResult = this._recognizer.recognize(url),
                routeInfo: IRouteInfo,
                emptyResult = isEmpty(result),
                pattern: string,
                segment: string;

            if(!emptyResult) {
                routeInfo = result[0];
                routeInfo.query = query;
            }

            let sameRoute: boolean = this._isSameRoute(routeInfo);

            if (emptyResult || sameRoute) {
                let childUrl = url;

                if(sameRoute) {
                    segment = this._recognizer.generate(routeInfo.delegate.view, routeInfo.parameters);
                    childUrl = childUrl.replace(segment, '');
                }

                result = this._childRecognizer.recognize(childUrl);

                if (isEmpty(result)) {
                    if(!emptyResult) {
                        result = this._recognizer.recognize(url);
                        routeInfo = result[0];
                        routeInfo.query = query;
                        pattern = routeInfo.delegate.pattern;
                    } else {
                        // route has not been matched
                        this._previousUrl = childUrl;
                        this._previousQuery = queryString;

                        if (isFunction(this._unknownHandler)) {
                            let unknownRouteConfig: IUnknownRouteInfo = {
                                segment: url,
                                view: <any>undefined
                            };

                            return resolve(this._unknownHandler(unknownRouteConfig)).then(() => {
                                let view = unknownRouteConfig.view;
                                if (isUndefined(view)) {
                                    return;
                                }

                                return this.configure({
                                    pattern: url,
                                    view: view
                                });
                            });
                        }

                        return resolve();
                    }
                } else {
                    routeInfo = result[0];
                    routeInfo.query = query;
                    pattern = routeInfo.delegate.pattern;
                    pattern = pattern.substr(0, pattern.length - __CHILD_ROUTE_LENGTH);

                    if (!emptyResult || this._previousPattern === pattern) {
                        // the pattern for this router is the same as the last pattern so
                        // only navigate child routers.
                        this.navigating = true;
                        return this.finishNavigating = this._navigateChildren(routeInfo)
                            .then((): void => {
                                this._previousUrl = url;
                                this._previousQuery = queryString;
                                this.navigating = false;
                            }, (e: any): void => {
                                this.navigating = false;
                                throw e;
                            });
                    }
                }
            } else {
                pattern = routeInfo.delegate.pattern;
            }

            segment = this._recognizer.generate(routeInfo.delegate.view, routeInfo.parameters);

            let previousSegment = this._previousSegment;

            this._previousSegment = segment;

            this.navigating = true;

            let routeInfoCopy = this._nextRouteInfo = _clone(routeInfo, true);
            return this.finishNavigating = this._canNavigate(routeInfo, poll)
                .then((canNavigate: boolean): async.IThenable<void> => {
                    if (!canNavigate) {
                        this.navigating = false;
                        throw new Error('Not cleared to navigate');
                    }

                    this._previousUrl = url;
                    this._previousQuery = queryString;

                    return this._performNavigation(routeInfo);
                }).then((): void => {
                    this._previousPattern = pattern;
                    this._previousSegment = segment;
                    this.currentRouteInfo = routeInfoCopy;
                    this.navigating = false;
                }, (e: any): void => {
                    this._previousSegment = previousSegment;
                    this.navigating = false;
                    throw e;
                });
        }

        /**
         * @name generate
         * @memberof plat.routing.Router
         * @kind function
         * @access public
         * @variation 0
         *
         * @description
         * Attempts to generate a route with the specified route name. Will generate the full-path from the root
         * router.
         *
         * @param {new (...args: any[]) => any} name The Constructor of the named-route to generate.
         * @param {plat.IObject<string>} parameters? Any parameters used to generate the route.
         * @param {plat.IObject<string>} query? Any query parameters to append to the generated route.
         *
         * @returns {string} The generated route.
         */
        generate(name: new (...args: any[]) => any, parameters?: IObject<string>, query?: IObject<string>): string;
        /**
         * @name generate
         * @memberof plat.routing.Router
         * @kind function
         * @access public
         * @variation 1
         *
         * @description
         * Attempts to generate a route with the specified route name. Will generate the full-path from the root
         * router.
         *
         * @param {string} name The name of the route to generate.
         * @param {plat.IObject<string>} parameters? Any parameters used to generate the route.
         * @param {plat.IObject<string>} query? Any query parameters to append to the generated route.
         *
         * @returns {string} The generated route.
         */
        generate(name: string, parameters?: IObject<string>, query?: IObject<string>): string;
        generate(name: any, parameters?: IObject<string>, query?: IObject<string>): string {
            let alias = name;

            name = this._Injector.convertDependency(name);

            if (name === __NOOP_INJECTOR) {
                name = alias;
            }

            let router = this,
                prefix = '';

            while (!isNull(router) && !router._recognizer.exists(name)) {
                router = router.parent;
            }

            if (isNull(router)) {
                throw new Error('Route for ' + name + ' does not exist.');
            }

            let path = router._recognizer.generate(name, parameters),
                previous: string;

            while (!isNull(router = router.parent)) {
                previous = router._previousSegment;
                previous = (!isNull(previous) && previous !== '/') ? previous : '';
                prefix = previous + prefix;
            }

            return prefix + path + serializeQuery(query);
        }

        /**
         * @name _configureRoute
         * @memberof plat.routing.Router
         * @kind function
         * @access protected
         *
         * @description
         * Configures a route mapping and registers it with the {@link plat.routing.RouteRecognizer|RouteRecognizer} and the child
         * RouteRecognizer.
         *
         * @param {plat.routing.IRouteMapping} route The mapping used to configure the route.
         *
         * @returns {void}
         */
        protected _configureRoute(route: IRouteMapping): void {
            let view: string = this._Injector.convertDependency(route.view),
                alias = route.alias || view;

            if (view === __NOOP_INJECTOR) {
                return;
            }

            route.view = view;
            route.alias = alias || view;

            let routeDelegate: IRouteDelegate = {
                pattern: route.pattern,
                delegate: route
            },
                childPattern = route.pattern + __CHILD_ROUTE,
                childDelegate: IRouteDelegate = {
                    pattern: childPattern,
                    delegate: {
                        pattern: childPattern,
                        view: view,
                        alias: alias
                    }
                };

            this._recognizer.register([routeDelegate], { name: alias });
            this._childRecognizer.register([childDelegate]);
        }

        /**
         * @name _addHandler
         * @memberof plat.routing.Router
         * @kind function
         * @access protected
         *
         * @description
         * Generic method for adding a param/queryParam handler to the registered handlers object.
         *
         * @param {(value: any, query: any) => any} handler A method that will manipulate the registered parameter.
         * @param {string} parameter The parameter that the registered handler will modify.
         * @param {any} view The view used to match the route. If undefined, all routes will be matched.
         * @param {plat.IObject<plat.routing.IRouteTransforms>} handlers The object to which to add the handler.
         *
         * @returns {plat.routing.Router} The router for method chaining.
         */
        protected _addHandler(handler: (value: string, values: any, query?: any) => any, parameter: string, view: any, handlers: IObject<IRouteTransforms>): Router {
            if (isUndefined(view)) {
                view = '*';
            }

            let alias = view;
            if (view !== '*') {
                view = this._Injector.convertDependency(view);
            }

            if (view === __NOOP_INJECTOR) {
                view = alias;
            }

            if (isEmpty(view) || isEmpty(parameter)) {
                return this;
            }

            let viewHandlers = handlers[view];
            if (!isObject(viewHandlers)) {
                viewHandlers = handlers[view] = {};
            }

            let transforms = viewHandlers[parameter];
            if (!isArray(transforms)) {
                transforms = viewHandlers[parameter] = [];
            }

            transforms.push(handler);

            return this;
        }

        /**
         * @name _forceNavigate
         * @memberof plat.routing.Router
         * @kind function
         * @access protected
         *
         * @description
         * Forces a navigation if possible.
         *
         * @returns {plat.async.IThenable<void>} A {@link plat.async.IPromise|Promise} that resolves when the navigation is complete.
         */
        protected _forceNavigate(): async.IThenable<void> {
            let resolve = this._resolve,
                query: IObject<any>;

            if (this.navigating) {
                return this.finishNavigating.then((): async.IThenable<void> => {
                    return this._forceNavigate();
                });
            }

            if (this.isRoot && isEmpty(this._previousUrl)) {
                let utils = this._browser.urlUtils();
                this._previousUrl = utils.pathname;
                query = utils.query;
            }

            if (!isEmpty(this._previousQuery)) {
                query = deserializeQuery(this._previousQuery);
            }

            if (!isEmpty(this._previousUrl)) {
                return this.navigate(this._previousUrl, query, true);
            }

            return resolve();
        }

        /**
         * @name _navigateChildren
         * @memberof plat.routing.Router
         * @kind function
         * @access protected
         *
         * @description
         * Navigates the child routers.
         *
         * @param {plat.routing.IRouteInfo} info The information necessary to build the childRoute for the child routers.
         *
         * @returns {plat.async.IThenable<void>} A {@link plat.async.IPromise|Promise} that resolves when the navigation is complete.
         */
        protected _navigateChildren(info: IRouteInfo, poll: boolean = true): async.IThenable<void> {
            let childRoute = this._getChildRoute(info);

            if (isNull(childRoute)) {
                return this._resolve();
            }

            return mapAsync((child: Router): async.IThenable<void> => {
                return child.navigate(childRoute, info.query, undefined, poll);
            }, this.children).then(noop);
        }

        /**
         * @name _getChildRoute
         * @memberof plat.routing.Router
         * @kind function
         * @access protected
         *
         * @description
         * Parses out the child route from route information.
         *
         * @param {plat.routing.IRouteInfo} info The information necessary to get the child route.
         *
         * @returns {string} The child route.
         */
        protected _getChildRoute(info: IRouteInfo): string {
            if (isNull(info)) {
                return;
            }

            let childRoute = info.parameters.childRoute;

            if (!isString(childRoute)) {
                childRoute = '';
            }

            return '/' + childRoute;
        }

        /**
         * @name _performNavigation
         * @memberof plat.routing.Router
         * @kind function
         * @access protected
         *
         * @description
         * It is safe to navigate, so perform the navigation.
         *
         * @param {plat.routing.IRouteInfo} info The route information.
         *
         * @returns {plat.async.IThenable<void>} Resolves when the navigation is complete.
         */
        protected _performNavigation(info: IRouteInfo): async.IThenable<void> {
            let sameRoute = this._isSameRoute(this._nextRouteInfo);

            return this._performNavigateFrom(sameRoute).then((): async.IThenable<Array<void>> => {
                if (sameRoute) {
                    return;
                }

                return mapAsync((port: ISupportRouteNavigation): async.IThenable<void> => {
                    return port.navigateTo(info);
                }, this._ports);
            })
                .then((): async.IThenable<void> => {
                    return this._navigateChildren(info, false);
                });
        }

        /**
         * @name _performNavigateFrom
         * @memberof plat.routing.Router
         * @kind function
         * @access protected
         *
         * @description
         * It is safe to navigate, so fire the navigateFrom events.
         *
         * @param {boolean} ignorePorts? Ignores the ports if necessary.
         *
         * @returns {plat.async.IThenable<void>} Resolves when the navigation from is complete.
         */
        protected _performNavigateFrom(ignorePorts?: boolean): async.IThenable<void> {
            return mapAsync((child: Router): async.IThenable<void> => {
                return child._performNavigateFrom();
            }, this.children)
                .then((): async.IThenable<Array<void>> => {
                    if (ignorePorts) {
                        return;
                    }

                    return mapAsync((port: ISupportRouteNavigation): async.IThenable<void> => {
                        return port.navigateFrom();
                    }, this._ports);
                }).then(noop);
        }

        /**
         * @name _canNavigate
         * @memberof plat.routing.Router
         * @kind function
         * @access protected
         *
         * @description
         * Determines if we can navigate from the current state and navigate to the next state.
         *
         * @param {plat.routing.IRouteInfo} info The route information.
         *
         * @returns {plat.async.IThenable<boolean>} Whether or not we can navigate to the next state.
         */
        protected _canNavigate(info: IRouteInfo, poll: boolean = true): async.IThenable<boolean> {
            let sameRoute = this._isSameRoute(this._nextRouteInfo);

            if(!poll) {
                return this._resolve(true);
            }

            return this._canNavigateFrom(sameRoute)
                .then((canNavigateFrom: boolean): async.IThenable<boolean> => {
                    return canNavigateFrom && this._canNavigateTo(info, sameRoute);
                });
        }

        /**
         * @name _canNavigateFrom
         * @memberof plat.routing.Router
         * @kind function
         * @access protected
         *
         * @description
         * Determines if we can navigate from the current state and navigate to the next state.
         *
         * @param {boolean} ignorePorts Ignores the ports if necessary.
         *
         * @returns {plat.async.IThenable<boolean>} Whether or not we can navigate from the current
         */
        protected _canNavigateFrom(ignorePorts?: boolean): async.IThenable<boolean> {
            return this._Promise.all(this.children.reduce((promises: Array<async.IThenable<boolean>>, child: Router): Array<async.IThenable<boolean>> => {
                return promises.concat(child._canNavigateFrom());
            }, <Array<async.IThenable<boolean>>>[]))
                .then(booleanReduce)
                .then((canNavigateFrom: boolean): async.IThenable<Array<boolean>> => {
                    if (!canNavigateFrom || ignorePorts) {
                        return <any>[canNavigateFrom];
                    }

                    return mapAsync((port: ISupportRouteNavigation): async.IThenable<boolean> => {
                        return port.canNavigateFrom();
                    }, this._ports);
                }).then(booleanReduce);
        }

        /**
         * @name _canNavigateTo
         * @memberof plat.routing.Router
         * @kind function
         * @access protected
         *
         * @description
         * Determines if we can navigate to the next state.
         *
         * @param {plat.routing.IRouteInfo} info The route information.
         * @param {boolean} ignorePorts Ignores the ports if necessary.
         *
         * @returns {plat.async.IThenable<boolean>} Whether or not we can navigate to the next state.
         */
        protected _canNavigateTo(info: IRouteInfo, ignorePorts?: boolean): async.IThenable<boolean> {
            if (isEmpty(this._ports)) {
                return this._resolve(true);
            }
            return this._callAllHandlers(info.delegate.alias, info.parameters, info.query).then((): async.IThenable<boolean> => {
                return this._callInterceptors(info);
            }).then((canNavigateTo): async.IThenable<Array<boolean>> => {
                if (canNavigateTo === false || ignorePorts) {
                    return <any>[canNavigateTo];
                }

                return mapAsync((port: ISupportRouteNavigation): async.IThenable<boolean> => {
                    return port.canNavigateTo(info);
                }, this._ports);
            }).then(booleanReduce);
        }

        /**
         * @name _callAllHandlers
         * @memberof plat.routing.Router
         * @kind function
         * @access protected
         *
         * @description
         * Calls all the registered query and param transforms for a route.
         *
         * @param {string} view The associated view for the route.
         * @param {any} parameters The route parameters.
         * @param {any} query? The query parameters.
         *
         * @returns {plat.async.IThenable<void>} Resolves when the handlers have finished execution.
         */
        protected _callAllHandlers(view: string, parameters: any, query?: any): async.IThenable<void> {
            return this._callHandlers(this._queryTransforms['*'], query)
                .then((): async.IThenable<void> => this._callHandlers(this._queryTransforms[view], query))
                .then((): async.IThenable<void> => this._callHandlers(this._paramTransforms['*'], parameters, query))
                .then((): async.IThenable<void> => this._callHandlers(this._paramTransforms[view], parameters, query))
                .then(noop);
        }

        /**
         * @name _callAllHandlers
         * @memberof plat.routing.Router
         * @kind function
         * @access protected
         *
         * @description
         * Calls the associated transform functions.
         *
         * @param {plat.routing.IRouteTransforms} allHandlers The transform functions
         * @param {any} obj The parameters.
         * @param {any} query? The query parameters.
         *
         * @returns {plat.async.IThenable<void>} Resolves when the handlers have finished execution.
         */
        protected _callHandlers(allHandlers: IRouteTransforms, obj: any, query?: any): async.IThenable<void> {
            let resolve = this._resolve;
            if (!isObject(obj)) {
                obj = {};
            }

            return mapAsync((handlers: Array<(value: string, values: any, query?: any) => any>, key: string): async.IThenable<Array<any>> => {
                return mapAsyncInOrder((handler): async.IThenable<any> => {
                    return resolve(handler(obj[key], obj, query));
                }, handlers);
            }, allHandlers)
                .then(noop);
        }

        /**
         * @name _callInterceptors
         * @memberof plat.routing.Router
         * @kind function
         * @access protected
         *
         * @description
         * Calls the interceptors for a particular route.
         *
         * @param {plat.routing.IRouteInfo} info The route information.
         *
         * @returns {plat.async.IThenable<boolean>} Whether or not it is safe to navigate.
         */
        protected _callInterceptors(info: IRouteInfo): async.IThenable<boolean> {
            let resolve = this._resolve;

            return mapAsyncInOrder((handler: (routeInfo: IRouteInfo) => any): async.IThenable<boolean> => {
                return resolve(handler(info));
            }, this._interceptors['*'])
                .then(booleanReduce)
                .then((canNavigate: boolean): async.IThenable<Array<boolean>> => {
                    if (!canNavigate) {
                        return <any>[canNavigate];
                    }

                    return mapAsync((handler: (routeInfo: IRouteInfo) => any): async.IThenable<boolean> => {
                        return resolve(handler(info));
                    }, this._interceptors[info.delegate.alias]);
                })
                .then(booleanReduce);
        }

        /**
         * @name _isSameRoute
         * @memberof plat.routing.Router
         * @kind function
         * @access protected
         *
         * @description
         * Checks a passed-in route against the current route to determine if it is the same.
         *
         * @param {plat.routing.IRouteInfo} info The route information.
         *
         * @returns {boolean} Whether or not it is the same route.
         */
        protected _isSameRoute(info: IRouteInfo): boolean {
            let currentRouteInfo = _clone(this.currentRouteInfo);

            this._sanitizeRouteInfo(currentRouteInfo);

            if (!isObject(currentRouteInfo) || !isObject(info)) {
                return false;
            }

            let currentDelegate = currentRouteInfo.delegate,
                delegate = info.delegate,
                currentParameters = serializeQuery(currentRouteInfo.parameters),
                parameters = serializeQuery(info.parameters),
                currentQuery = serializeQuery(currentRouteInfo.query),
                query = serializeQuery(info.query);

            return currentDelegate.view === delegate.view &&
                currentDelegate.alias === delegate.alias &&
                currentDelegate.pattern === delegate.pattern &&
                currentParameters === parameters &&
                currentQuery === query;
        }

        /**
         * @name _sanitizeRouteInfo
         * @memberof plat.routing.Router
         * @kind function
         * @access protected
         *
         * @description
         * Removes childRoute from routeInfo
         *
         * @param {plat.routing.IRouteInfo} info The route information.
         *
         * @returns {void}
         */
        protected _sanitizeRouteInfo(info: IRouteInfo): void {
            if(isObject(info)) {
                if(info.parameters.hasOwnProperty('childRoute')) {
                    info.delegate.pattern = info.delegate.pattern.substr(0, info.delegate.pattern.length - __CHILD_ROUTE_LENGTH);
                    deleteProperty(info.parameters, 'childRoute');
                }
            }
        }

        /**
         * @name _clearInfo
         * @memberof plat.routing.Router
         * @kind function
         * @access protected
         *
         * @description
         * Clears all the router information, essentially setting the router back to its initialized state.
         *
         * @returns {void}
         */
        protected _clearInfo(): void {
            this._previousSegment = undefined;
            this._previousPattern = undefined;
            this._previousUrl = undefined;
            this._previousQuery = undefined;
            this.currentRouteInfo = undefined;
            this.navigating = false;
            forEach((child: Router): void => {
                child._clearInfo();
            }, this.children);
        }
    }

    plat.register.injectable(__Router, Router, null, __INSTANCE);

    /**
     * The injectable function for {@link plat.routing.IRouterStatic|IRouterStatic}
     */
    export function IRouterStatic(): IRouterStatic {
        return Router;
    }

    plat.register.injectable(__RouterStatic, IRouterStatic);

    /**
     * @name IRouterStatic
     * @memberof plat.routing
     * @kind interface
     *
     * @description
     * The static methods and properties on router
     */
    export interface IRouterStatic {
        /**
         * @name currentRouter
         * @memberof plat.routing.IRouterStatic
         * @kind function
         * @access public
         * @static
         *
         * @description
         * Exposes the {@link plat.routing.Router.__currentRouter|current router} property. Also provides the
         * ability to set the current router.
         *
         * @param {plat.routing.Router} router Will set the current router.
         *
         * @returns {plat.routing.Router} The current router.
         */
        currentRouter(router?: Router): Router;
    }

    /**
     * @name IRouteMapping
     * @memberof plat.routing
     * @kind interface
     *
     * @description
     * A route mapping, used for registering and matching routes.
     */
    export interface IRouteMapping {
        /**
         * @name pattern
         * @memberof plat.routing.IRouteMapping
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * A pattern for the route (e.g. "/posts/:id")
         */
        pattern: string;

        /**
         * @name view
         * @memberof plat.routing.IRouteMapping
         * @kind property
         * @access public
         *
         * @type {any}
         *
         * @description
         * Either a Constructor for a registered {@link plat.ui.ViewControl|ViewControl}, or the registered token for
         * that ViewControl.
         */
        view: any;

        /**
         * @name alias
         * @memberof plat.routing.IRouteMapping
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * An optional alias with which to associate this mapping. Alias is used over view when specified.
         */
        alias?: string;
    }

    /**
     * @name IRouteResult
     * @memberof plat.routing
     * @kind interface
     *
     * @extends {Array<plat.routing.IRouteInfo>}
     *
     * @description
     * The result of a recognized route.
     */
    export interface IRouteResult extends Array<IRouteInfo> { }

    /**
     * @name IRouteInfo
     * @memberof plat.routing
     * @kind interface
     *
     * @extends {plat.routing.IDelegateInfo}
     *
     * @description
     * The information for a recognized route. Contains the delegate, which
     * maps directly to a {@link plat.ui.ViewControl|ViewControl}.
     */
    export interface IRouteInfo extends IDelegateInfo {
        /**
         * @name delegate
         * @memberof plat.routing.IRouteInfo
         * @kind property
         * @access public
         *
         * @type {plat.routing.IRouteMapping}
         *
         * @description
         * Maps to a registered {@link plat.ui.ViewControl|ViewControl}.
         */
        delegate: IRouteMapping;

        /**
         * @name query
         * @memberof plat.routing.IRouteInfo
         * @kind property
         * @access public
         *
         * @type {plat.IObject<any>}
         *
         * @description
         * Query parameters for the route.
         */
        query?: IObject<any>;
    }

    /**
     * @name IUnknownRouteInfo
     * @memberof plat.routing
     * @kind interface
     *
     * @description
     * Information for an unkown route. If an unknown handler is registered with the router, it will be called.
     * The handler can use the `segment` property to figure out what `view` to use. Setting the `view` property will
     * tell the router what view to use. The `view` will become the configured view for that route.
     */
    export interface IUnknownRouteInfo {
        /**
         * @name segment
         * @memberof plat.routing.IUnknownRouteInfo
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The url segment that has not been matched to a registered view.
         */
        segment: string;

        /**
         * @name view
         * @memberof plat.routing.IUnknownRouteInfo
         * @kind property
         * @access public
         *
         * @type {any}
         *
         * @description
         * Set this to tell the router what view to navigate to.
         */
        view: any;
    }

    /**
     * @name IRouteTransforms
     * @memberof plat.routing
     * @kind interface
     *
     * @description
     * An object that contains an Array of route transform functions.
     */
    export interface IRouteTransforms extends IObject<Array<(value: string, values: any, query?: any) => any>> { }

    /**
     * @name ISupportRouteNavigation
     * @memberof plat.routing
     * @kind interface
     *
     * @description
     * Describes an object that supports all the routing events (e.g. a {@link plat.ui.controls.Viewport|Viewport}).
     */
    export interface ISupportRouteNavigation {
        /**
         * @name canNavigateFrom
         * @memberof plat.routing.ISupportRouteNavigation
         * @kind function
         * @access public
         *
         * @description
         * The router has matched a route and is asking if it is safe to navigate from the current state.
         * Here you cancan query the current ViewControl and ask it if it is safe to navigate from its current state.
         *
         * @returns {plat.async.IThenable<boolean>} Whether or not it is safe to navigate.
         */
        canNavigateFrom(): async.IThenable<boolean>;

        /**
         * @name canNavigateTo
         * @memberof plat.routing.ISupportRouteNavigation
         * @kind function
         * @access public
         *
         * @description
         * The router has matched a route and is asking if it is safe to navigate. Here
         * you can instantiate the new view and ask it if it is safe to navigate to the view.
         *
         * @param {plat.routing.IRouteInfo} routeInfo Contains the information necessary to instantiate
         * the view and feed it the route parameters/query.
         *
         * @returns {plat.async.IThenable<boolean>} Whether or not it is safe to navigate.
         */
        canNavigateTo(routeInfo: IRouteInfo): async.IThenable<boolean>;

        /**
         * @name navigateFrom
         * @memberof plat.routing.ISupportRouteNavigation
         * @kind function
         * @access public
         *
         * @description
         * The router has matched a route and determined that it is safe to navigate to the
         * next view. It is now safe for to dispose of the current state.
         *
         * @returns {plat.async.IThenable<void>} A {@link plat.async.IPromise|Promise} that resolves when the viewport
         * has finished navigating from the current state.
         */
        navigateFrom(): async.IThenable<any>;

        /**
         * @name navigateTo
         * @memberof plat.routing.ISupportRouteNavigation
         * @kind function
         * @access public
         *
         * @description
         * The router has matched a route and determined that it is safe to navigate to the
         * next view. You can now go through the steps to compile and link the next view then append
         * it to the DOM.
         *
         * @param {plat.routing.IRouteInfo} routeInfo Contains the information necessary to instantiate
         * the view and feed it the route parameters/query.
         *
         * @returns {plat.async.IThenable<void>} A {@link plat.async.IPromise|Promise} that resolves when the
         * new ViewControl has finished instantiating.
         */
        navigateTo(routeInfo: IRouteInfo): async.IThenable<any>;
    }
}
