module plat.routing {
    'use strict';

    export class Navigator {
        protected static _root: Navigator;

        /**
         * @name _Promise
         * @memberof plat.routing.Navigator
         * @kind property
         * @access protected
         * 
         * @type {plat.async.IPromise}
         * 
         * @description
         * The {@link plat.async.IPromise|IPromise} injectable instance
         */
        protected _Promise: async.IPromise = acquire(__Promise);

        /**
         * @name _Injector
         * @memberof plat.routing.Navigator
         * @kind property
         * @access protected
         * 
         * @type {plat.dependency.Injector}
         * 
         * @description
         * The {@link plat.dependency.Injector|Injector} injectable instance
         */
        protected _Injector: typeof dependency.Injector = acquire(__InjectorStatic);

        /**
         * @name _browserConfig
         * @memberof plat.routing.Navigator
         * @kind property
         * @access protected
         * 
         * @type {plat.web.IBrowserConfig}
         * 
         * @description
         * The {@link plat.web.IBrowserConfig|IBrowserConfig} injectable instance
         */
        protected _browserConfig: web.IBrowserConfig = acquire(__BrowserConfig);

        /**
         * @name _browser
         * @memberof plat.routing.Navigator
         * @kind property
         * @access protected
         * 
         * @type {plat.web.IBrowser}
         * 
         * @description
         * The {@link plat.web.IBrowser|IBrowser} injectable instance
         */
        protected _browser: web.IBrowser = acquire(__Browser);

        protected _EventManager: events.IEventManagerStatic = acquire(__EventManagerStatic);
        protected _window: Window = acquire(__Window);
        protected _Exception: IExceptionStatic = acquire(__ExceptionStatic);

        /**
         * @name router
         * @memberof plat.routing.Navigator
         * @kind property
         * @access public
         * 
         * @type {plat.routing.IRouter}
         * 
         * @description
         * The {@link plat.routing.IRouter|router} associated with this link.
         */
        router: Router;

        protected _history: History = plat.acquire(__History);

        uid = uniqueId(__Plat);
        removeUrlListener: IRemoveListener = noop;
        ignoreOnce = false;
        ignored = false;
        isRoot: boolean = false;
        previousUrl: string;
        backNavigate: boolean = false;
        resolveNavigate: () => void;
        rejectNavigate: (err: any) => void;

        initialize(router: Router) {
            this.router = router;

            if (router.isRoot && !isObject(Navigator._root)) {
                this.isRoot = true;
                Navigator._root = this;
                this._observeUrl();
            }
        }

        navigate(view: any, options?: INavigateOptions) {
            options = isObject(options) ? options : {};
            var url: string;

            return this._finishNavigating().then(() => {
                if (options.isUrl) {
                    url = view;
                } else {
                    url = this.generate(view, options.parameters, options.query);
                }

                return this._navigate(url, options.replace);
            });
        }

        protected _finishNavigating(): async.IThenable<void> {
            var router = Navigator._root.router;

            if (router.navigating) {
                return router.finishNavigating;
            }

            return this._Promise.resolve();
        }

        protected _navigate(url: string, replace?: boolean): async.IThenable<void> {
            if (!this.isRoot) {
                return Navigator._root._navigate(url, replace);
            }

            return new this._Promise<void>((resolve, reject) => {
                this.resolveNavigate = resolve;
                this.rejectNavigate = reject;
                this._browser.url(url, replace);
            });
        }

        goBack(options?: IBackNavigationOptions) {
            options = isObject(options) ? options : {};

            var length = Number(options.length);

            if (!isNumber(length)) {
                length = 1;
            }

            if (!this.isRoot) {
                Navigator._root.goBack(options);
            }

            var _history = this._history,
                url = this._browser.url();

            this.backNavigate = true;
            _history.go(-length);
            
            defer(() => {
                if (!this.ignored && url === this._browser.url()) {
                    this._EventManager.dispatch(__shutdown, this, this._EventManager.DIRECT);
                }
            }, 50);
        }

        dispose() {
            this.removeUrlListener();
            deleteProperty(this, 'router');
        }

        protected _observeUrl() {
            if (!isObject(this.router)) {
                return;
            }

            var config = this._browserConfig,
                EventManager = this._EventManager,
                prefix: string,
                previousUrl: string,
                previousQuery: string,
                backNavigate: boolean,
                _Exception = this._Exception;

            this.previousUrl = this._browser.url();

            EventManager.dispose(this.uid);
            EventManager.on(this.uid, __backButton, () => {
                var ev: events.IDispatchEventInstance = acquire(__DispatchEventInstance);
                ev.initialize('backButtonPressed', this);

                EventManager.sendEvent(ev);

                if (ev.defaultPrevented) {
                    return;
                }

                this.goBack();
            });

            EventManager.on(this.uid, __urlChanged, (ev: events.IDispatchEventInstance, utils?: web.IUrlUtilsInstance) => {
                if (this.ignoreOnce) {
                    this.ignoreOnce = false;
                    this.ignored = true;
                    return;
                }

                this.ignored = false;
                backNavigate = this.backNavigate;
                this.backNavigate = false;

                postpone(() => {
                    previousUrl = this.previousUrl;
                    this.router.navigate(utils.pathname, utils.query)
                        .then(() => {
                            this.previousUrl = utils.pathname;
                            if (isFunction(this.resolveNavigate)) {
                                this.resolveNavigate();
                            }
                        })
                        .catch((e: any) => {
                            this.ignoreOnce = true;
                            this.previousUrl = previousUrl;

                            this._browser.url(previousUrl, !backNavigate);
                            this._history.go(-1);

                            if (isFunction(this.rejectNavigate)) {
                                this.rejectNavigate(e);
                            }

                            if (!isEmpty(e)) {
                                _Exception.warn(e, _Exception.NAVIGATION);
                            }
                        });
                });
            });
        }

        generate(view: any, parameters: any, query: any): string {
            if (isNull(this.router)) {
                return;
            }

            if (isEmpty(view)) {
                return view;
            }

            view = this._Injector.convertDependency(view);
            return this.router.generate(view, parameters, query);
        }
    }

    export function INavigatorInstance() {
        return new Navigator();
    }

    register.injectable(__NavigatorInstance, INavigatorInstance, null, __INSTANCE);

    export interface INavigateOptions {
        isUrl?: boolean;
        parameters?: IObject<any>;
        query?: IObject<any>;
        replace?: boolean;
    }

    export interface IBackNavigationOptions {
        length?: number;
    }
}
