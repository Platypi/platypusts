module plat.routing {
    var __CHILD_ROUTE = '/*childRoute',
        __CHILD_ROUTE_LENGTH = __CHILD_ROUTE.length;

    export class Router {
        $Promise: async.IPromise = acquire(__Promise);

        recognizer: RouteRecognizer = acquire(__RouteRecognizerInstance);
        childRecognizer: RouteRecognizer = acquire(__RouteRecognizerInstance);
        navigating: boolean = false;
        previousUrl: string;
        previousPattern: string;

        currentRouteInfo: IDelegateInfo;

        result: IRouteResult;
        previousResult: IRouteResult;

        ports: IObject<ISupportRouteNavigation> = {};
        parent: Router;
        children: Array<Router> = [];

        initialize(parent?: Router) {
            this.parent = parent;
        }

        child() {
            var child = new Router();

            child.initialize(this);
            this.children.push(child);

            return child;
        }

        registerViewport(viewport: ISupportRouteNavigation, name?: string) {
            if (isEmpty(name)) {
                name = 'default';
            }

            this.ports[name] = viewport;

            if (isArray(this.result)) {
                return this.performNavigation(this.result);
            }

            return this.$Promise.resolve();
        }

        configure(routes: Array<IRouteMapping>): async.IThenable<void>;
        configure(routes: IRouteMapping): async.IThenable<void>;
        configure(routes: any) {
            if (isArray(routes)) {
                return mapAsync((route: IRouteMapping) => {
                    return this.configure(route);
                }, routes).then(() => { });
            }

            var resolve = this.$Promise.resolve,
                route: IRouteMapping = routes,
                view: string = dependency.Injector.convertDependency(route.view);

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
                    // The pattern for this router is the same as the last pattern so 
                    // only navigate child routers.
                    return this.navigateChildren(result);
                }

                this.previousPattern = pattern;
            }

            if (isEmpty(result)) {
                // route has not been matched.
                return reject();
            }

            routeInfo = result[0];

            if (this.currentRouteInfo === routeInfo) {
                return resolve();
            }

            this.currentRouteInfo = routeInfo;
            this.result = result;
            this.navigating = true;

            return this.canNavigate(result)
                .then((canNavigate) => {
                    return canNavigate && this.performNavigation(result);
                })
                .then(() => {
                    this.navigating = false;
                    this.previousResult = result;
                });
        }

        forceNavigate() {
            var resolve = this.$Promise.resolve;

            if (this.navigating) {
                return resolve();
            }

            if (!isEmpty(this.previousUrl)) {
                return this.navigate(this.previousUrl, true);
            }

            return resolve();
        }

        generate(name: string, parameters: IObject<any>) {
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

            var path = router.recognizer.generate(name, parameters);

            while (!isNull(router = router.parent)) {
                prefix += router.previousPattern;
            }

            return prefix + path;
        }

        navigateChildren(result: IRouteResult) {
            var resolve = this.$Promise.resolve;

            if (isEmpty(result)) {
                return resolve();
            }

            var childRoute = result[0].parameters.childRoute;

            if (!isString(childRoute)) {
                return resolve();
            }

            childRoute = '/' + childRoute;

            return mapAsync((child: Router) => {
                return child.navigate(childRoute);
            }, this.children).then(() => { });
        }

        performNavigation(result: IRouteResult) {
            return mapAsync((port: ISupportRouteNavigation) => {
                return port.navigateFrom(result)
                    .then(() => {
                        return port.navigateTo(result);
                    });
            }, this.ports).then(() => { });
        }

        canNavigate(result: IRouteResult) {
            return this.$Promise.all(this.runPreNavigationSteps(result)).then(this.reduce);
        }

        runPreNavigationSteps(result: IRouteResult): Array<async.IThenable<boolean>> {
            return this.children.reduce((promises, child) => {
                return promises.concat(child.runPreNavigationSteps(result));
            }, [this.preNavigate(result)]);
        }

        preNavigate(result: IRouteResult) {
            return this.canNavigateFrom(result).then((canNavigateFrom) => {
                return canNavigateFrom && this.canNavigateTo(result);
            });
        }

        canNavigateFrom(result: IRouteResult) {
            var resolve = this.$Promise.resolve;

            return mapAsync((port: ISupportRouteNavigation) => {
                return port.canNavigateFrom(result);
            }, this.ports).then(this.reduce);
        }

        canNavigateTo(result: IRouteResult) {
            var resolve = this.$Promise.resolve;

            return mapAsync((port: ISupportRouteNavigation) => {
                return port.canNavigateTo(result);
            }, this.ports).then(this.reduce);
        }

        reduce(values: Array<boolean>) {
            return values.reduce((prev, current) => {
                return prev && current;
            }, true);
        }
    }

    export function IRouter() {
        var router = new Router();
        router.initialize();
        return router;
    }

    plat.register.injectable(__Router, IRouter);


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

        navigateFrom(result: IRouteResult): async.IThenable<void>;
        navigateTo(result: IRouteResult): async.IThenable<void>;
    }
}
