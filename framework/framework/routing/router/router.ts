module plat.routing {
    'use strict';

    var __CHILD_ROUTE = '/*childRoute',
        __CHILD_ROUTE_LENGTH = __CHILD_ROUTE.length;

    export class Router {
        protected static _inject: any = {
            _Promise: __Promise,
            _Injector: __InjectorStatic,
            _EventManager: __EventManagerStatic,
            _browser: __Browser,
            _browserConfig: __BrowserConfig,
            recognizer: __RouteRecognizerInstance,
            childRecognizer: __RouteRecognizerInstance
        };

        static currentRouter(router?: Router) {
            if (!isNull(router)) {
                Router.__currentRouter = router;
            }

            return Router.__currentRouter;
        }

        private static __currentRouter: Router;

        protected _Promise: async.IPromise;
        protected _Injector: typeof dependency.Injector;
        protected _EventManager: events.IEventManagerStatic;
        protected _browser: web.Browser;
        protected _browserConfig: web.IBrowserConfig;
        protected _resolve: typeof async.Promise.resolve = this._Promise.resolve.bind(this._Promise);
        protected _reject: typeof async.Promise.reject = this._Promise.reject.bind(this._Promise);

        recognizer: RouteRecognizer;
        childRecognizer: RouteRecognizer;

        paramTransforms: IObject<IRouteTransforms> = {};
        queryTransforms: IObject<IRouteTransforms> = {};
        interceptors: IObject<Array<(routeInfo: IRouteInfo) => any>> = {};

        navigating: boolean = false;
        finishNavigating: async.IThenable<void>;

        previousUrl: string;
        previousQuery: string;
        previousSegment: string;

        currentRouteInfo: IRouteInfo;

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
            this.initialize();
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
                return this._Promise.resolve();
            }

            ports.push(port);

            if (isObject(this.currentRouteInfo)) {

                var routeInfo = _clone(this.currentRouteInfo, true);

                return this.canNavigateTo(routeInfo)
                    .then((canNavigateTo) => {
                    if (!canNavigateTo) {
                        return;
                    }
                    this.currentRouteInfo = undefined;
                    return this.performNavigation(routeInfo);
                }).then(() => {
                    this.currentRouteInfo = routeInfo;
                });
            }

            return this._Promise.resolve();
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
                forEach((route: IRouteMapping) => {
                    this._configureRoute(route);
                }, routes);
            } else {
                this._configureRoute(routes);
            }

            return this.forceNavigate();
        }

        protected _configureRoute(route: IRouteMapping) {
            var resolve = this._resolve,
                view: string = this._Injector.convertDependency(route.view);

            if (view === __NOOP_INJECTOR) {
                return;
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
        }

        param(handler: (value: any, parameters: any, query: any) => any, parameter: string, view: string): Router;
        param(handler: (value: any, parameters: any, query: any) => any, parameter: string, view: new (...args: any[]) => any): Router;
        param(handler: (value: any, parameters: any, query: any) => any, parameter: string, view: any) {
            return this._addHandler(handler, parameter, view, this.paramTransforms);
        }

        queryParam(handler: (value: any, query: any) => any, parameter: string, view: string): Router;
        queryParam(handler: (value: any, query: any) => any, parameter: string, view: new (...args: any[]) => any): Router;
        queryParam(handler: (value: string, query: any) => any, parameter: string, view: any) {
            return this._addHandler(handler, parameter, view, this.queryTransforms);
        }

        protected _addHandler(handler: (value: string, values: any, query?: any) => any, parameter: string, view: any, handlers: IObject<IRouteTransforms>) {
            if (view !== '*') {
                view = this._Injector.convertDependency(view);
            }

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
            if (view !== '*') {
                view = this._Injector.convertDependency(view);
            }

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
            if (!isObject(query)) {
                query = {};
            }

            var resolve = this._resolve,
                reject = this._reject,
                queryString = serializeQuery(query);

            if (url === '/') {
                url = '';
            }

            force = force === true;

            if (!isString(url) || this.navigating || (!force && url === this.previousUrl && queryString === this.previousQuery)) {
                if (this.navigating) {
                    return this.finishNavigating;
                }

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
                    return resolve();
                }

                routeInfo = result[0];
                routeInfo.query = query;
                pattern = routeInfo.delegate.pattern;
                pattern = pattern.substr(0, pattern.length - __CHILD_ROUTE_LENGTH);

                if (this.previousSegment === pattern) {
                    // the pattern for this router is the same as the last pattern so 
                    // only navigate child routers.
                    this.navigating = true;
                    return this.finishNavigating = this.navigateChildren(routeInfo)
                        .then(() => {
                        this.previousUrl = url;
                        this.previousQuery = queryString;
                        this.navigating = false;
                    },(e) => {
                            this.navigating = false;
                            throw e;
                        });
                }
            } else {
                routeInfo = result[0];
                routeInfo.query = query;
                pattern = routeInfo.delegate.pattern;
            }

            this.navigating = true;

            var routeInfoCopy = _clone(routeInfo, true);

            return this.finishNavigating = this.canNavigate(routeInfo)
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
                this.previousSegment = pattern;
                this.currentRouteInfo = routeInfoCopy;
                this.navigating = false;
            },(e) => {
                    this.navigating = false;
                    throw e;
                });
        }

        forceNavigate() {
            var resolve = this._resolve,
                query: IObject<any>;

            if (this.navigating) {
                return resolve();
            }

            if (this.isRoot && isEmpty(this.previousUrl)) {
                var utils = this._browser.urlUtils();
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
                throw new Error('Route: ' + name + ' does not exist');
            }

            var path = router.recognizer.generate(name, parameters),
                previous: string;

            while (!isNull(router = router.parent)) {
                previous = router.previousSegment;
                previous = (!isNull(previous) && previous !== '/') ? previous : '';
                prefix = previous + prefix;
            }

            return prefix + path + serializeQuery(query);
        }

        navigateChildren(info: IRouteInfo) {
            var childRoute = this.getChildRoute(info);

            if (isNull(childRoute)) {
                return this._resolve();
            }

            return mapAsync((child: Router) => {
                return child.navigate(childRoute, info.query);
            }, this.children).then(noop);
        }

        getChildRoute(info: IRouteInfo) {
            if (isNull(info)) {
                return;
            }

            var childRoute = info.parameters.childRoute;

            if (!isString(childRoute)) {
                childRoute = '';
            }

            return '/' + childRoute;
        }

        performNavigation(info: IRouteInfo): async.IThenable<void> {
            var sameRoute = this._isSameRoute(info);

            return this.performNavigateFrom(sameRoute).then(() => {
                if (sameRoute) {
                    return;
                }

                return mapAsync((port: ISupportRouteNavigation) => {
                    return port.navigateTo(info);
                }, this.ports);
            })
                .then(() => {
                return this.navigateChildren(info);
            });
        }

        performNavigateFrom(ignorePorts?: boolean): async.IThenable<void> {
            return mapAsync((child: Router) => {
                return child.performNavigateFrom();
            }, this.children)
                .then(() => {
                if (ignorePorts) {
                    return;
                }

                return mapAsync((port: ISupportRouteNavigation) => {
                    return port.navigateFrom();
                }, this.ports);
            }).then(noop);
        }

        canNavigate(info: IRouteInfo) {
            var currentRouteInfo = this.currentRouteInfo,
                sameRoute = this._isSameRoute(info);

            return this.canNavigateFrom(sameRoute)
                .then((canNavigateFrom: boolean) => {
                return canNavigateFrom && this.canNavigateTo(info, sameRoute);
            });
        }

        callAllHandlers(view: string, parameters: any, query?: any): async.IThenable<void> {
            var Promise = this._Promise,
                resolve = Promise.resolve.bind(Promise);

            return this.callHandlers(this.queryTransforms['*'], query)
                .then(() => this.callHandlers(this.queryTransforms[view], query))
                .then(() => this.callHandlers(this.paramTransforms['*'], parameters, query))
                .then(() => this.callHandlers(this.paramTransforms[view], parameters, query))
                .then(noop);
        }

        callHandlers(allHandlers: IRouteTransforms, obj: any, query?: any) {
            var resolve = this._resolve;
            if (!isObject(obj)) {
                obj = {};
            }

            return mapAsync((handlers: Array<(value: string, values: any, query?: any) => any>, key: string) => {
                return mapAsyncInOrder((handler) => {
                    return resolve(handler(obj[key], obj, query));
                }, handlers);
            }, allHandlers);
        }

        callInterceptors(info: IRouteInfo): async.IThenable<boolean> {
            var resolve = this._resolve;

            return mapAsyncInOrder((handler: (routeInfo: IRouteInfo) => any) => {
                return resolve(handler(info));
            }, this.interceptors['*'])
                .then(booleanReduce)
                .then((canNavigate: boolean) => {
                if (!canNavigate) {
                    return <any>[canNavigate];
                }

                return mapAsync((handler: (routeInfo: IRouteInfo) => any) => {
                    return resolve(handler(info));
                }, this.interceptors[info.delegate.view]);
            })
                .then(booleanReduce);
        }

        canNavigateFrom(ignorePorts?: boolean): async.IThenable<boolean> {
            return this._Promise.all(this.children.reduce((promises: Array<async.IThenable<boolean>>, child: Router) => {
                return promises.concat(child.canNavigateFrom());
            }, <Array<async.IThenable<boolean>>>[]))
                .then(booleanReduce)
                .then((canNavigateFrom: boolean) => {
                if (!canNavigateFrom || ignorePorts) {
                    return <any>[canNavigateFrom];
                }

                return mapAsync((port: ISupportRouteNavigation) => {
                    return port.canNavigateFrom();
                }, this.ports);
            }).then(booleanReduce);
        }

        canNavigateTo(info: IRouteInfo, ignorePorts?: boolean): async.IThenable<boolean> {
            var promises: Array<any> = [];

            return this.callAllHandlers(info.delegate.view, info.parameters, info.query)
                .then(() => {
                return this.callInterceptors(info);
            })
                .then((canNavigateTo) => {
                if (canNavigateTo === false || ignorePorts) {
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
                    var childRoute = this.getChildRoute(info),
                        childResult: IRouteResult,
                        childInfo: IRouteInfo;

                    promises = [];

                    this.children.reduce((promises: Array<async.IThenable<boolean>>, child: Router) => {
                        childResult = child.recognizer.recognize(childRoute);

                        if (isEmpty(childResult)) {
                            child._clearInfo();
                            return;
                        }

                        childInfo = childResult[0];
                        childInfo.query = info.query;
                        return promises.concat(child.canNavigateTo(childInfo));
                    }, promises);
                }

                return this._Promise.all(promises);
            })
                .then(booleanReduce);
        }

        protected _isSameRoute(info: IRouteInfo) {
            var currentRouteInfo = this.currentRouteInfo;

            if (!isObject(currentRouteInfo)) {
                return false;
            }

            var currentDelegate = currentRouteInfo.delegate,
                delegate = info.delegate,
                currentParameters = serializeQuery(currentRouteInfo.parameters),
                parameters = serializeQuery(info.parameters),
                currentQuery = serializeQuery(currentRouteInfo.query),
                query = serializeQuery(info.query);

            return currentDelegate.view === delegate.view &&
                currentDelegate.pattern === delegate.pattern &&
                currentParameters === parameters &&
                currentQuery === query;
        }

        protected _clearInfo() {
            this.previousSegment = undefined;
            this.previousUrl = undefined;
            this.previousQuery = undefined;
            this.currentRouteInfo = undefined;
            this.navigating = false;
            forEach((child) => {
                child._clearInfo();
            }, this.children);
        }
    }

    plat.register.injectable(__Router, Router, null, __INSTANCE);

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
