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
        resolve: typeof async.Promise.resolve = this.$Promise.resolve.bind(this.$Promise);
        reject: typeof async.Promise.reject = this.$Promise.reject.bind(this.$Promise);

        $Injector: typeof dependency.Injector = acquire(__InjectorStatic);
        $EventManagerStatic: events.IEventManagerStatic = acquire(__EventManagerStatic);
        $browser: web.IBrowser = acquire(__Browser);
        $browserConfig: web.IBrowserConfig = acquire(__BrowserConfig);

        recognizer: RouteRecognizer = acquire(__RouteRecognizerInstance);
        childRecognizer: RouteRecognizer = acquire(__RouteRecognizerInstance);

        paramTransforms: IObject<IRouteTransforms> = {};
        queryTransforms: IObject<IRouteTransforms> = {};
        interceptors: IObject<Array<(routeInfo: IRouteInfo) => any>> = {};

        navigating: boolean = false;
        previousUrl: string;
        previousQuery: string;
        previousPattern: string;

        currentRouteInfo: IDelegateInfo;

        ports: Array<ISupportRouteNavigation> = [];
        parent: Router;
        children: Array<Router> = [];
        uid: string;
        isRoot: boolean = false;
        ignoreOnce = false;

        constructor() {
            this.uid = uniqueId(__Plat);
            this.isRoot = isNull(Router.currentRouter());
            Router.currentRouter(this);
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

        register(port: ISupportRouteNavigation) {
            var ports = this.ports;

            if (isNull(port) || ports.indexOf(port) > -1) {
                return this.$Promise.resolve();
            }

            ports.push(port);

            if (isObject(this.currentRouteInfo)) {
                var routeInfo = _clone(this.currentRouteInfo, true);

                return this.canNavigateTo(routeInfo)
                    .then((canNavigateTo) => {
                        if (!canNavigateTo) {
                            return;
                        }

                        return this.performNavigation(routeInfo);
                    });
            }

            return this.$Promise.resolve();
        }

        unregister(port: ISupportRouteNavigation) {
            var ports = this.ports,
                index = ports.indexOf(port);

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

            var resolve = this.resolve,
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

        param(handler: (value: any, parameters: any, query: any) => any, parameter: string, view: string): Router;
        param(handler: (value: any, parameters: any, query: any) => any, parameter: string, view: new (...args: any[]) => any): Router;
        param(handler: (value: any, parameters: any, query: any) => any, parameter: string, view: any) {
            return this._addHandler(handler, parameter, view, this.paramTransforms);
        }

        queryParam(handler: (value: any, query: any) => any, parameter: string, view: string): Router;
        queryParam(handler: (value: any, query: any) => any, parameter: string, view: new (...args: any[]) => any): Router;
        queryParam(handler: (value: string, query: any) => any, parameter: string, view: any){
            return this._addHandler(handler, parameter, view, this.queryTransforms);
        }

        protected _addHandler(handler: (value: string, values: any, query?: any) => any, parameter: string, view: any, handlers: IObject<IRouteTransforms>) {
            view = this.$Injector.convertDependency(view);

            if (isEmpty(view) || isEmpty(parameter)) {
                return this;
            }

            var viewHandlers = handlers[view];

            if (!isObject(viewHandlers)) {
                viewHandlers = handlers[view] = {};
            }

            var transforms = viewHandlers[parameter];

            if (!isArray(transforms)) {
                transforms = viewHandlers[parameter] = [];
            }

            transforms.push(handler);

            return this;
        }

        intercept(handler: (routeInfo: IRouteInfo) => any, view: string): Router;
        intercept(handler: (routeInfo: IRouteInfo) => any, view: new (...args: any[]) => any): Router;
        intercept(handler: (routeInfo: IRouteInfo) => any, view: any) {
            view = this.$Injector.convertDependency(view);

            if (isEmpty(view)) {
                return this;
            }

            var interceptors = this.interceptors[view];

            if (!isArray(interceptors)) {
                interceptors = this.interceptors[view] = [];
            }

            interceptors.push(handler);

            return this;
        }

        navigate(url: string, query?: IObject<any>, force?: boolean): async.IThenable<void> {
            var resolve = this.resolve,
                reject = this.reject,
                queryString = serializeQuery(query);

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

                routeInfo = result[0];
                routeInfo.query = query;
                pattern = routeInfo.delegate.pattern;
                pattern = pattern.substr(0, pattern.length - __CHILD_ROUTE_LENGTH);

                if (this.previousPattern === pattern) {
                    // the pattern for this router is the same as the last pattern so 
                    // only navigate child routers.
                    return this.navigateChildren(routeInfo).then(() => {
                        this.previousUrl = url;
                        this.previousQuery = queryString;
                    });
                }
            } else {
                routeInfo = result[0];
                routeInfo.query = query;
                pattern = routeInfo.delegate.pattern;
            }

            if (this.currentRouteInfo === routeInfo) {
                return resolve();
            }

            this.navigating = true;

            var routeInfoCopy = _clone(routeInfo, true);

            return this.canNavigate(routeInfo)
                .then((canNavigate: boolean) => {
                    if (!canNavigate) {
                        this.navigating = false;
                        throw new Error('Not cleared to navigate');
                    }

                    this.previousUrl = url;
                    this.previousQuery = queryString;
                    return this.performNavigation(routeInfo);
                })
                .then(() => {
                    this.previousPattern = pattern;
                    this.currentRouteInfo = routeInfoCopy;
                    this.navigating = false;
                });
        }

        forceNavigate() {
            var resolve = this.resolve,
                query: IObject<any>;

            if (this.navigating) {
                return resolve();
            }

            if (this.isRoot && isEmpty(this.previousUrl)) {
                var utils = this.$browser.urlUtils();
                this.previousUrl = utils.pathname;
                query = utils.query;
            }

            if (!isEmpty(this.previousQuery)) {
                query = deserializeQuery(this.previousQuery);
            }

            if (!isEmpty(this.previousUrl)) {
                return this.navigate(this.previousUrl, query, true);
            }

            return resolve();
        }

        generate(name: string, parameters?: IObject<any>, query?: IObject<string>) {
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

            return prefix + path + serializeQuery(query);
        }

        navigateChildren(info: IRouteInfo) {
            var resolve = this.resolve,
                childRoute = this.getChildRoute(info);

            if (isNull(childRoute)) {
                return resolve();
            }

            return mapAsync((child: Router) => {
                return child.navigate(childRoute, info.query);
            }, this.children).then((): void => undefined);
        }

        getChildRoute(info: IRouteInfo) {
            if (isNull(info)) {
                return;
            }

            var childRoute = info.parameters.childRoute;

            if (isEmpty(childRoute)) {
                return;
            }

            return '/' + childRoute;
        }

        performNavigation(info: IRouteInfo) {
            return this.performNavigateFrom().then(() => {
                return mapAsync((port: ISupportRouteNavigation) => {
                    return port.navigateTo(info);
                }, this.ports);
            })
                .then(() => {
                    return this.navigateChildren(info);
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

        canNavigate(info: IRouteInfo) {
            return this.canNavigateFrom()
                .then((canNavigateFrom: boolean) => {
                    // TODO: If canNavigateFrom we need to execute any parameter bindings.
                    return canNavigateFrom && this.canNavigateTo(info);
                })
                .then((canNavigate) => {
                    return canNavigate;
                });
        }

        callAllHandlers(view: string, parameters: any, query?: any): async.IThenable<void> {
            var Promise = this.$Promise,
                resolve = Promise.resolve.bind(Promise);

            return this.callHandlers(this.queryTransforms[view], query)
                .then(() => this.callHandlers(this.paramTransforms[view], parameters, query))
                .then((): void => undefined);
        }

        callHandlers(allHandlers: IRouteTransforms, obj: any, query?: any) {
            var resolve = this.resolve;

            return mapAsync((handlers: Array<(value: string, values: any, query?: any) => any>, key: string) => {
                return mapAsyncInOrder((handler) => {
                    return resolve(handler(obj[key], obj, query));
                }, handlers);
            }, allHandlers);
        }

        callInterceptors(info: IRouteInfo): async.IThenable<boolean> {
            var resolve = this.resolve;

            return mapAsync((handler: (routeInfo: IRouteInfo) => any) => {
                return resolve(handler(info));
            }, this.interceptors[info.delegate.view])
                .then(booleanReduce);
        }

        canNavigateFrom(): async.IThenable<boolean> {
            return this.$Promise.all(this.children.reduce((promises: Array<async.IThenable<boolean>>, child: Router) => {
                return promises.concat(child.canNavigateFrom());
            }, <Array<async.IThenable<boolean>>>[]))
                .then(booleanReduce)
                .then((canNavigateFrom: boolean) => {
                    if (!canNavigateFrom) {
                        return <any>[canNavigateFrom];
                    }

                    return mapAsync((port: ISupportRouteNavigation) => {
                        return port.canNavigateFrom();
                    }, this.ports);
                }).then(booleanReduce);
        }

        canNavigateTo(info: IRouteInfo): async.IThenable<boolean> {
            var promises: Array<any> = [];
            return this.callAllHandlers(info.delegate.view, info.parameters, info.query)
                .then(() => {
                    return this.callInterceptors(info);
                })
                .then((canNavigateTo) => {
                    if (!canNavigateTo) {
                        return <any>[canNavigateTo];
                    }

                    return mapAsync((port: ISupportRouteNavigation) => {
                        return port.canNavigateTo(info);
                    }, this.ports);
                })
                .then(booleanReduce)
                .then((canNavigateTo: boolean) => {
                    if (!canNavigateTo) {
                        promises = [canNavigateTo];
                    } else {
                        var childRoute = this.getChildRoute(info);

                        if (isEmpty(childRoute)) {
                            promises = [true];
                        } else {
                            var childResult: IRouteResult,
                                childInfo: IRouteInfo;

                            promises = [];

                            this.children.reduce((promises: Array<async.IThenable<boolean>>, child: Router) => {
                                childResult = child.childRecognizer.recognize(childRoute);

                                if (isEmpty(childResult)) {
                                    return;
                                }

                                childInfo = childResult[0];
                                childInfo.query = info.query;
                                return promises.concat(child.canNavigateTo(childInfo));
                            }, promises);
                        }
                    }

                    return this.$Promise.all(promises);
                })
                .then(booleanReduce);
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
        query?: IObject<any>;
    }

    export interface IRouteTransforms extends IObject<Array<(value: string, values: any, query?: any) => any>> { }

    export interface ISupportRouteNavigation {
        canNavigateFrom(): async.IThenable<boolean>;
        canNavigateTo(routeInfo: IRouteInfo): async.IThenable<boolean>;

        navigateFrom(): async.IThenable<any>;
        navigateTo(routeInfo: IRouteInfo): async.IThenable<any>;
    }
}
