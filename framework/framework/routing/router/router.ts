module plat.routing {
    'use strict';

    var __CHILD_ROUTE = '/*childRoute',
        __CHILD_ROUTE_LENGTH = __CHILD_ROUTE.length;

    export class Router {
        static currentRouter(router?: Router) {
            if (!isNull(router)) {
                Router.__currentRouter = router;
            }

            return Router.__currentRouter;
        }

        private static __currentRouter: Router;

        $Promise: async.IPromise = acquire(__Promise);
        $Injector: typeof dependency.Injector = acquire(__InjectorStatic);
        $EventManagerStatic: events.IEventManagerStatic = acquire(__EventManagerStatic);
        $browser: web.IBrowser = acquire(__Browser);
        $browserConfig: web.IBrowserConfig = acquire(__BrowserConfig);

        recognizer: RouteRecognizer = acquire(__RouteRecognizerInstance);
        childRecognizer: RouteRecognizer = acquire(__RouteRecognizerInstance);
        bindings: IObject<Array<(parameters: Object, query: Object) => any>> = {};
        navigating: boolean = false;
        previousUrl: string;
        previousQuery: string;
        previousPattern: string;

        currentRouteInfo: IDelegateInfo;

        result: IRouteResult;
        previousResult: IRouteResult;

        ports: Array<ISupportRouteNavigation> = [];
        parent: Router;
        children: Array<Router> = [];
        uid: string;
        isRoot: boolean = false;
        ignoreOnce = false;

        constructor() {
            this.uid = uniqueId(__Plat);
            var isRoot = this.isRoot = isNull(Router.currentRouter());
            Router.currentRouter(this);

            if (isRoot) {
                var config = this.$browserConfig,
                    prefix: string,
                    previousUrl: string,
                    previousQuery: string;

                this.$EventManagerStatic.on(this.uid, __urlChanged, (ev: events.IDispatchEventInstance, utils?: web.IUrlUtilsInstance) => {
                    if (this.ignoreOnce) {
                        this.ignoreOnce = false;
                        return;
                    }

                    postpone(() => {
                        previousUrl = this.previousUrl;
                        previousQuery = this.previousQuery;
                        this.navigate(utils.pathname, utils.query).catch(() => {
                            this.ignoreOnce = true;
                            this.previousUrl = previousUrl;
                            this.$browser.url(previousUrl + previousQuery, true);
                        });
                    });
                });
            }
        }

        initialize(parent?: Router) {
            this.parent = parent;
        }

        addChild(child: Router) {
            if (isNull(child) || this.children.indexOf(child) > -1) {
                return child;
            }

            child.initialize(this);
            this.children.push(child);

            return child;
        }

        removeChild(child: Router) {
            var children = this.children,
                index = this.children.indexOf(child);

            if (index < 0) {
                return;
            }

            children.splice(index, 1);
        }

        registerViewport(viewport: ISupportRouteNavigation) {
            var ports = this.ports;

            if (isNull(viewport) || ports.indexOf(viewport) > -1) {
                return this.$Promise.resolve();
            }

            ports.push(viewport);

            if (isArray(this.result)) {
                return this.performNavigation(this.result);
            }

            return this.$Promise.resolve();
        }

        unregisterViewport(viewport: ISupportRouteNavigation) {
            var ports = this.ports,
                index = ports.indexOf(viewport);

            if (index < 0) {
                return;
            }

            ports.splice(index, 1);

            if (ports.length === 0 && !isNull(this.parent)) {
                this.parent.removeChild(this);
            }
        }

        configure(routes: IRouteMapping): async.IThenable<void>;
        configure(routes: Array<IRouteMapping>): async.IThenable<void>;
        configure(routes: any) {
            if (isArray(routes)) {
                return mapAsync((route: IRouteMapping) => {
                    return this.configure(route);
                }, routes).then((): void => undefined);
            }

            var resolve = this.$Promise.resolve.bind(this.$Promise),
                route: IRouteMapping = routes,
                view: string = this.$Injector.convertDependency(route.view);

            if (view === __NOOP_INJECTOR) {
                return resolve();
            }

            route.view = view;

            var routeDelegate: IRouteDelegate = {
                pattern: route.pattern,
                delegate: route
            },
                childPattern = route.pattern + __CHILD_ROUTE,
                childDelegate: IRouteDelegate = {
                    pattern: childPattern,
                    delegate: {
                        pattern: childPattern,
                        view: view
                    }
                };

            this.recognizer.register([routeDelegate], { name: view });
            this.childRecognizer.register([childDelegate]);

            return this.forceNavigate();
        }

        binding(view: string, callback: (parameters: Object) => void): Router;
        binding(view: new (...args: any[]) => any, callback: (parameters: Object) => void): Router;
        binding(view: any, callback: (parameters: Object) => void) {
            view = this.$Injector.convertDependency(view);

            var bindings = this.bindings[view];

            if (!isArray(bindings)) {
                bindings = this.bindings[view] = [];
            }

            bindings.push(callback);

            return this;
        }

        navigate(url: string, query?: Object, force?: boolean): async.IThenable<void> {
            var Promise = this.$Promise,
                resolve = Promise.resolve.bind(Promise),
                reject = Promise.reject.bind(Promise),
                queryString = this.getQueryString(query);


            force = force === true;

            if (!isString(url) || this.navigating || (!force && url === this.previousUrl)) {
                return resolve();
            }

            var result: IRouteResult = this.recognizer.recognize(url),
                routeInfo: IRouteInfo,
                pattern: string;

            if (isEmpty(result)) {
                result = this.childRecognizer.recognize(url);

                if (isEmpty(result)) {
                    // route has not been matched
                    this.previousUrl = url;
                    this.previousQuery = queryString;
                    return reject();
                }

                pattern = result[0].delegate.pattern;
                pattern = pattern.substr(0, pattern.length - __CHILD_ROUTE_LENGTH);

                if (this.previousPattern === pattern) {
                    // the pattern for this router is the same as the last pattern so 
                    // only navigate child routers.
                    return this.navigateChildren(result, query).then(() => {
                        this.previousUrl = url;
                        this.previousQuery = queryString;
                    });
                }
            } else {
                pattern = result[0].delegate.pattern;
            }

            routeInfo = result[0];

            if (this.currentRouteInfo === routeInfo) {
                return resolve();
            }

            this.navigating = true;

            return this.canNavigate(result, query)
                .then((canNavigate: boolean) => {
                    if (!canNavigate) {
                        this.navigating = false;
                        throw new Error('Not cleared to navigate');
                    }

                    this.previousUrl = url;
                    this.previousQuery = queryString;
                    return this.performNavigation(result, query);
                })
                .then(() => {
                    this.previousPattern = pattern;
                    this.currentRouteInfo = routeInfo;
                    this.result = result;
                    this.previousResult = result;

                    this.navigating = false;
                });
        }

        forceNavigate() {
            var resolve = this.$Promise.resolve.bind(this.$Promise),
                query: {};

            if (this.navigating) {
                return resolve();
            }

            if (this.isRoot && isEmpty(this.previousUrl)) {
                var utils = this.$browser.urlUtils();
                this.previousUrl = utils.pathname;
                query = utils.query;
            }

            if (!isEmpty(this.previousQuery)) {
                query = getQuery(this.previousQuery);
            }

            if (!isEmpty(this.previousUrl)) {
                return this.navigate(this.previousUrl, query, true);
            }

            return resolve();
        }

        generate(name: string, parameters?: IObject<any>) {
            var router = this,
                prefix = '';

            while (!isNull(router) && !router.recognizer.exists(name)) {
                router = router.parent;
            }

            if (isNull(router)) {
                var Exception: IExceptionStatic = acquire(__ExceptionStatic);
                Exception.fatal('Route does not exist', Exception.NAVIGATION);
                return;
            }

            var path = router.recognizer.generate(name, parameters),
                previous: string;

            while (!isNull(router = router.parent)) {
                previous = router.previousPattern;
                previous = (!isNull(previous) && previous !== '/') ? previous : '';
                prefix = previous + prefix;
            }

            return prefix + path;
        }

        navigateChildren(result: IRouteResult, query?: Object) {
            var resolve = this.$Promise.resolve.bind(this.$Promise),
                childRoute = this.getChildRoute(result);

            if (isNull(childRoute)) {
                return resolve();
            }

            return mapAsync((child: Router) => {
                return child.navigate(childRoute, query);
            }, this.children).then((): void => undefined);
        }

        getChildRoute(result: IRouteResult) {
            if (isEmpty(result)) {
                return;
            }

            var childRoute = result[0].parameters.childRoute;

            if (isEmpty(childRoute)) {
                return;
            }

            return '/' + childRoute;
        }

        performNavigation(result: IRouteResult, query?: Object) {
            return this.performNavigateFrom().then(() => {
                return mapAsync((port: ISupportRouteNavigation) => {
                    return port.navigateTo(result, query);
                }, this.ports);
            })
                .then(() => {
                    return this.navigateChildren(result, query);
                });
        }

        performNavigateFrom(): async.IThenable<void> {
            return mapAsync((child: Router) => {
                return child.performNavigateFrom();
            }, this.children)
                .then(() => {
                    return mapAsync((port: ISupportRouteNavigation) => {
                        return port.navigateFrom();
                    }, this.ports);
                }).then((): void => undefined);
        }

        canNavigate(result: IRouteResult, query?: Object) {
            return this.canNavigateFrom()
                .then((canNavigateFrom: boolean) => {
                    // TODO: If canNavigateFrom we need to execute any parameter bindings.
                    return canNavigateFrom && this.canNavigateTo(result, query);
                })
                .then((canNavigate) => {
                    return canNavigate;
                });
        }

        executeBindings(view: string, parameters: {}, query?: Object): async.IThenable<void> {
            return mapAsync((binding: (parameters: {}, query: {}) => any) => {
                return binding(parameters, query);
            }, this.bindings[view]).then((): void => undefined);
        }

        canNavigateFrom(): async.IThenable<boolean> {
            return this.$Promise.all(this.children.reduce((promises: Array<async.IThenable<boolean>>, child: Router) => {
                return promises.concat(child.canNavigateFrom());
            }, <Array<async.IThenable<boolean>>>[]))
                .then(this.reduce)
                .then((canNavigateFrom: boolean) => {
                    if (!canNavigateFrom) {
                        return <any>[canNavigateFrom];
                    }

                    return mapAsync((port: ISupportRouteNavigation) => {
                        return port.canNavigateFrom();
                    }, this.ports);
                }).then(this.reduce);
        }

        canNavigateTo(result: IRouteResult, query?: Object): async.IThenable<boolean> {
            this.executeBindings(result[0].delegate.view, result[0].parameters, query);

            return mapAsync((port: ISupportRouteNavigation) => {
                return port.canNavigateTo(result, query);
            }, this.ports)
                .then(this.reduce)
                .then((canNavigateTo: boolean) => {
                    var promises: Array<any> = [];
                    if (!canNavigateTo) {
                        promises = [canNavigateTo];
                    } else {
                        var childRoute = this.getChildRoute(result);

                        if (isEmpty(childRoute)) {
                            promises = [true];
                        } else {
                            this.children.reduce((promises: Array<async.IThenable<boolean>>, child: Router) => {
                                return promises.concat(child.canNavigateTo(child.childRecognizer.recognize(childRoute), query));
                            }, promises);
                        }
                    }

                    return this.$Promise.all(promises);
                })
                .then(this.reduce);
        }

        reduce(values: Array<boolean>) {
            return values.reduce((prev: boolean, current: boolean) => {
                return prev && current !== false;
            }, true);
        }

        getQueryString(query: {}) {
            return !isNull(query) ? '?' + map((value, key) => {
                return key + '=' + value;
            }, query).join('&') : '';
        }
    }

    export function IRouter() {
        var router = new Router();
        router.initialize();
        return router;
    }

    plat.register.injectable(__Router, IRouter, null, __INSTANCE);

    export function IRouterStatic() {
        return Router;
    }

    plat.register.injectable(__RouterStatic, IRouterStatic);

    export interface IRouteMapping {
        pattern: string;
        view: any;
    }

    export interface IRouteResult extends Array<IRouteInfo> { }

    export interface IRouteInfo extends IDelegateInfo {
        delegate: IRouteMapping;
        query?: Object;
    }

    export interface ISupportRouteNavigation {
        canNavigateFrom(): async.IThenable<boolean>;
        canNavigateTo(result: IRouteResult, query?: Object): async.IThenable<boolean>;

        navigateFrom(): async.IThenable<any>;
        navigateTo(result: IRouteResult, query?: Object): async.IThenable<any>;
    }
}
