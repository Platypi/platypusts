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

        recognizer: RouteRecognizer = acquire(__RouteRecognizerInstance);
        childRecognizer: RouteRecognizer = acquire(__RouteRecognizerInstance);
        navigating: boolean = false;
        previousUrl: string;
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
                this.$EventManagerStatic.on(this.uid, __urlChanged, (ev: events.IDispatchEventInstance, utils?: web.IUrlUtilsInstance) => {
                    if (this.ignoreOnce) {
                        this.ignoreOnce = false;
                        return;
                    }

                    postpone(() => {
                        this.navigate(utils.pathname).catch(() => {
                            this.ignoreOnce = true;
                            window.history.go(-1);
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

            var resolve = this.$Promise.resolve,
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

        navigate(url: string, force?: boolean): async.IThenable<void> {
            var Promise = this.$Promise,
                resolve = Promise.resolve,
                reject = Promise.reject;

            force = force === true;

            if (!isString(url) || this.navigating || (!force && url === this.previousUrl)) {
                return resolve();
            }

            this.previousUrl = url;

            var result: IRouteResult = this.recognizer.recognize(url),
                routeInfo: IRouteInfo,
                pattern: string;

            if (isEmpty(result)) {
                result = this.childRecognizer.recognize(url);

                if (isEmpty(result)) {
                    // route has not been matched
                    return reject();
                }

                pattern = result[0].delegate.pattern;
                pattern = pattern.substr(0, pattern.length - __CHILD_ROUTE_LENGTH);

                if (this.previousPattern === pattern) {
                    // the pattern for this router is the same as the last pattern so 
                    // only navigate child routers.
                    return this.navigateChildren(result);
                }
            } else {
                pattern = result[0].delegate.pattern;
            }

            if (isEmpty(result)) {
                // route has not been matched.
                return reject();
            }

            routeInfo = result[0];

            if (this.currentRouteInfo === routeInfo) {
                return resolve();
            }

            this.navigating = true;

            return this.canNavigate(result)
                .then((canNavigate: boolean) => {
                    if (!canNavigate) {
                        this.navigating = false;
                        throw new Error('Not cleared to navigate');
                    }

                    return this.performNavigation(result);
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
            var resolve = this.$Promise.resolve;

            if (this.navigating) {
                return resolve();
            }

            if (this.isRoot && isEmpty(this.previousUrl)) {
                this.previousUrl = this.$browser.urlUtils().pathname;
            }

            if (!isEmpty(this.previousUrl)) {
                return this.navigate(this.previousUrl, true);
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

        navigateChildren(result: IRouteResult) {
            var resolve = this.$Promise.resolve,
                childRoute = this.getChildRoute(result);

            if (isNull(childRoute)) {
                return resolve();
            }

            return mapAsync((child: Router) => {
                return child.navigate(childRoute);
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

        performNavigation(result: IRouteResult) {
            return this.performNavigateFrom(result).then(() => {
                return mapAsync((port: ISupportRouteNavigation) => {
                    return port.navigateTo(result);
                }, this.ports);
            })
                .then(() => {
                    return this.navigateChildren(result);
                });
        }

        performNavigateFrom(result: IRouteResult): async.IThenable<void> {
            return mapAsync((child: Router) => {
                return child.performNavigateFrom(result);
            }, this.children)
                .then(() => {
                    return mapAsync((port: ISupportRouteNavigation) => {
                        return port.navigateFrom(result);
                    }, this.ports);
                }).then((): void => undefined);
        }

        canNavigate(result: IRouteResult) {
            return this.canNavigateFrom(result).then((canNavigateFrom: boolean) => {
                return canNavigateFrom && this.canNavigateTo(result);
            });
        }

        canNavigateFrom(result: IRouteResult): async.IThenable<boolean> {
            return this.$Promise.all(this.children.reduce((promises: Array<async.IThenable<boolean>>, child: Router) => {
                return promises.concat(child.canNavigateFrom(result));
            }, <Array<async.IThenable<boolean>>>[]))
                .then(this.reduce)
                .then((canNavigateFrom: boolean) => {
                    return canNavigateFrom && mapAsync((port: ISupportRouteNavigation) => {
                        return port.canNavigateFrom(result);
                    }, this.ports);
                }).then(this.reduce);
        }

        canNavigateTo(result: IRouteResult): async.IThenable<boolean> {
            return mapAsync((port: ISupportRouteNavigation) => {
                return port.canNavigateTo(result);
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
                            promises = this.children.reduce((promises: Array<async.IThenable<boolean>>, child: Router) => {
                                return promises.concat(child.canNavigateTo(child.childRecognizer.recognize(childRoute)));
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
    }

    export interface ISupportRouteNavigation {
        canNavigateFrom(result: IRouteResult): async.IThenable<boolean>;
        canNavigateTo(result: IRouteResult): async.IThenable<boolean>;

        navigateFrom(result: IRouteResult): async.IThenable<any>;
        navigateTo(result: IRouteResult): async.IThenable<any>;
    }
}
