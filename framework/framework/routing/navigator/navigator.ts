module plat.routing {
    'use strict';

    export class Navigator {
        protected static _inject: any = {
            _Promise: __Promise,
            _Injector: __InjectorStatic,
            _browserConfig: __BrowserConfig,
            _browser: __Browser,
            _EventManager: __EventManagerStatic,
            _window: __Window,
            _Exception: __ExceptionStatic,
            _history: __History
        };

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
        protected _Promise: async.IPromise;

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
        protected _Injector: typeof dependency.Injector;

        /**
         * @name _browserConfig
         * @memberof plat.routing.Navigator
         * @kind property
         * @access protected
         * 
         * @type {plat.web.BrowserConfig}
         * 
         * @description
         * The {@link plat.web.BrowserConfig|BrowserConfig} injectable instance
         */
        protected _browserConfig: web.IBrowserConfig;

        /**
         * @name _browser
         * @memberof plat.routing.Navigator
         * @kind property
         * @access protected
         * 
         * @type {plat.web.Browser}
         * 
         * @description
         * The {@link plat.web.Browser|Browser} injectable instance
         */
        protected _browser: web.Browser;

        protected _EventManager: events.IEventManagerStatic;
        protected _window: Window;
        protected _Exception: IExceptionStatic;
        protected _history: History;

        /**
         * @name router
         * @memberof plat.routing.Navigator
         * @kind property
         * @access public
         * 
         * @type {plat.routing.Router}
         * 
         * @description
         * The {@link plat.routing.Router|router} associated with this link.
         */
        router: Router;

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

        goBack(options?: IBackNavigationOptions): async.IThenable<void> {
            options = isObject(options) ? options : {};

            var length = Number(options.length);

            if (!isNumber(length)) {
                length = 1;
            }

            if (!this.isRoot) {
                return Navigator._root.goBack(options);
            }

            var _browser = this._browser,
                url = _browser.url();

            this.backNavigate = true;
            return this._finishNavigating()
                .then(() => {
                    return this._goBack(length);
                });
        }

        protected _goBack(length: number) {
            return new this._Promise<void>((resolve, reject) => {
                this.resolveNavigate = resolve;
                this.rejectNavigate = reject;
                this._history.go(-length);
            });
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
                var ev: events.DispatchEvent = acquire(__DispatchEventInstance);
                ev.initialize('backButtonPressed', this);

                EventManager.sendEvent(ev);

                if (ev.defaultPrevented) {
                    return;
                }

                this.goBack();
            });

            EventManager.on(this.uid, __urlChanged, (ev: events.DispatchEvent, utils?: web.UrlUtils) => {
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

    register.injectable(__NavigatorInstance, Navigator, null, __INSTANCE);

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
