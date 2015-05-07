/// <reference path="../../references.d.ts" />

module plat.routing {
    'use strict';

    /**
     * @name Navigator
     * @memberof plat.routing
     * @kind class
     * 
     * @description
     * Ties the browser and routers together, facilitating app navigation at every router level. 
     * Listens for url changes and responds accordingly. Also contains functionality for generating 
     * and changing the url.
     */
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

        /**
         * @name uid
         * @memberof plat.routing.Navigator
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {string}
         * 
         * @description
         * A unique id, created during instantiation and found on every {@link plat.routing.Navigator|Navigator}.
         */
        uid = uniqueId(__Plat);

        /**
         * @name isRoot
         * @memberof plat.routing.Navigator
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {boolean}
         * 
         * @description
         * States whether or not the Navigator is the root Navigator.
         */
        isRoot: boolean = false;

        /**
         * @name _root
         * @memberof plat.routing.Navigator
         * @kind property
         * @access protected
         * @static
         * 
         * @type {plat.routing.Navigator}
         * 
         * @description
         * The navigator associated with the root router.
         */
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

        /**
         * @name _EventManager
         * @memberof plat.routing.Navigator
         * @kind property
         * @access protected
         * 
         * @type {plat.events.IEventManagerStatic}
         * 
         * @description
         * The {@link plat.events.IEventManagerStatic|IEventManagerStatic} injectable instance
         */
        protected _EventManager: events.IEventManagerStatic;

        /**
         * @name _window
         * @memberof plat.routing.Navigator
         * @kind property
         * @access protected
         * 
         * @type {Window}
         * 
         * @description
         * The window injectable instance
         */
        protected _window: Window;

        /**
         * @name _Exception
         * @memberof plat.routing.Navigator
         * @kind property
         * @access protected
         * 
         * @type {plat.IExceptionStatic}
         * 
         * @description
         * The {@link plat.IExceptionStatic|IExceptionStatic} injectable instance
         */
        protected _Exception: IExceptionStatic;

        /**
         * @name _history
         * @memberof plat.routing.Navigator
         * @kind property
         * @access protected
         * 
         * @type {History}
         * 
         * @description
         * The History injectable instance
         */
        protected _history: History;

        /**
         * @name router
         * @memberof plat.routing.Navigator
         * @kind property
         * @access protected
         * 
         * @type {plat.routing.Router}
         * 
         * @description
         * The {@link plat.routing.Router|router} associated with this navigator.
         */
        protected _router: Router;

        /**
         * @name _removeUrlListener
         * @memberof plat.routing.Navigator
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A method to call to stop listening for url changes, only works on the root navigator.
         */
        protected _removeUrlListener: IRemoveListener = noop;

        /**
         * @name _ignoreOnce
         * @memberof plat.routing.Navigator
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * A method to call to stop listening for url changes, only works on the root navigator.
         */
        protected _ignoreOnce = false;

        /**
         * @name _previousUrl
         * @memberof plat.routing.Navigator
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * A method to call to stop listening for url changes, only works on the root navigator.
         */
        protected _previousUrl: string;

        /**
         * @name _backNavigate
         * @memberof plat.routing.Navigator
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * A method to call to stop listening for url changes, only works on the root navigator.
         */
        protected _backNavigate: boolean = false;

        /**
         * @name _resolveNavigate
         * @memberof plat.routing.Navigator
         * @kind property
         * @access protected
         * 
         * @type {() => void}
         * 
         * @description
         * A method to resolve the current navigation.
         */
        protected _resolveNavigate: () => void;

        /**
         * @name _rejectNavigate
         * @memberof plat.routing.Navigator
         * @kind property
         * @access protected
         * 
         * @type {(err: any) => void}
         * 
         * @description
         * A method to reject the current navigation.
         */
        protected _rejectNavigate: (err: any) => void;

        /**
         * @name initialize
         * @memberof plat.routing.Navigator
         * @kind function
         * @access public
         * 
         * @description
         * Initializes this Navigator with a router.
         * 
         * @param {plat.routing.Router} router The router that the navigator should use to match/generate routes.
         * 
         * @returns {void}
         */
        initialize(router: Router): void {
            this._router = router;

            if (isObject(router) && router.isRoot && !isObject(Navigator._root)) {
                this.isRoot = true;
                Navigator._root = this;
                this._observeUrl();
            }
        }

        /**
         * @name navigate
         * @memberof plat.routing.Navigator
         * @kind function
         * @access public
         * 
         * @description
         * Tells the navigator to navigate to the url registered for a particular view.
         * 
         * @param {any} view The view to which the Navigator should navigate.
         * @param {plat.routing.INavigateOptions} options used to generate the url and perform navigation.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves when the navigation has finished.
         */
        navigate(view: any, options?: INavigateOptions): async.IThenable<void> {
            options = isObject(options) ? options : {};
            var url: string;

            return this.finishNavigating().then((): async.IThenable<void> => {
                if (options.isUrl) {
                    url = view;
                } else {
                    url = this._generate(view, options.parameters, options.query);
                }

                if (!isString(url)) {
                    var error = new Error('Cannot serialize url from input parameters, check your view reference.');
                    this._Exception.fatal(error, this._Exception.NAVIGATION);
                }

                return this._navigate(url, options.replace);
            });
        }

        /**
         * @name finishNavigating
         * @memberof plat.routing.Navigator
         * @kind function
         * @access public
         * 
         * @description
         * Returns a promise that resolves when all navigation has finished.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves when the navigation has finished.
         */
        finishNavigating(): async.IThenable<void> {
            var router = Navigator._root._router;

            if (router.navigating) {
                return router.finishNavigating.catch(noop);
            }

            return this._Promise.resolve();
        }

        /**
         * @name goBack
         * @memberof plat.routing.Navigator
         * @kind function
         * @access public
         * 
         * @description
         * Tells the router to go back with the given options.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves when the navigation has finished.
         */
        goBack(options?: IBackNavigateOptions): async.IThenable<void> {
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

            this._backNavigate = true;
            return this.finishNavigating()
                .then((): async.IThenable<void> => {
                    return this._goBack(length);
                });
        }

        /**
         * @name dispose
         * @memberof plat.routing.Navigator
         * @kind function
         * @access public
         * 
         * @description
         * Lets the router dispose of all of the necessary properties.
         * 
         * @returns {void}
         */
        dispose(): void {
            this._removeUrlListener();
            deleteProperty(this, 'router');
        }

        /**
         * @name _navigate
         * @memberof plat.routing.Navigator
         * @kind function
         * @access protected
         * 
         * @description
         * Internal method for navigating to the specified url.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves when the navigation has finished.
         */
        protected _navigate(url: string, replace?: boolean): async.IThenable<void> {
            if (!this.isRoot) {
                return Navigator._root._navigate(url, replace);
            }

            return new this._Promise<void>((resolve, reject): void => {
                this._resolveNavigate = resolve;
                this._rejectNavigate = reject;
                this._browser.url(url, replace);
            });
        }

        /**
         * @name _goBack
         * @memberof plat.routing.Navigator
         * @kind function
         * @access protected
         * 
         * @description
         * Internal method for going back a certain length in history
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves when the navigation has finished.
         */
        protected _goBack(length: number): async.IThenable<void> {
            return new this._Promise<void>((resolve, reject): void => {
                this._resolveNavigate = resolve;
                this._rejectNavigate = reject;
                this._browser.back(length);
            });
        }

        /**
         * @name _observeUrl
         * @memberof plat.routing.Navigator
         * @kind function
         * @access protected
         * 
         * @description
         * The root navigator will always observe for url changes and handle them accordingly. This means instructing the 
         * router to navigate, and determining what to do in the event that navigation is prevented.
         * 
         * @returns {void}
         */
        protected _observeUrl(): void {
            if (!isObject(this._router)) {
                return;
            }

            var config = this._browserConfig,
                EventManager = this._EventManager,
                prefix: string,
                previousUrl: string,
                previousQuery: string,
                backNavigate: boolean,
                _Exception = this._Exception,
                ev: events.DispatchEvent,
                headControl: ui.controls.Head = acquire(__Head),
                headExists = isObject(headControl) && isFunction(headControl.navigated),
                onFailedNavigaton: (e: any) => void = (e: any): void => {
                    this._ignoreOnce = true;
                    this._previousUrl = previousUrl;
                    this._browser.url(previousUrl, !backNavigate);
                    this._history.go(-1);

                    if (isFunction(this._rejectNavigate)) {
                        this._rejectNavigate(e);
                    }

                    if (!isEmpty(e)) {
                        _Exception.warn(e, _Exception.NAVIGATION);
                    }
                };

            this._previousUrl = this._browser.url();

            // Protect against accidentally calling this method twice.
            EventManager.dispose(this.uid);
            EventManager.on(this.uid, __backButton,(): void => {
                var ev = EventManager.dispatch(__backButtonPressed, this, EventManager.DIRECT);

                if (ev.defaultPrevented) {
                    return;
                }

                this.goBack();
            });

            EventManager.on(this.uid, __urlChanged, (ev: events.DispatchEvent, utils?: web.UrlUtils): void => {
                if (this._ignoreOnce) {
                    this._ignoreOnce = false;
                    this._resolveNavigate();
                    return;
                }

                backNavigate = this._backNavigate;
                this._backNavigate = false;
                previousUrl = this._previousUrl;

                ev = EventManager.dispatch(__beforeNavigate, this, EventManager.DIRECT, [utils]);

                if (ev.defaultPrevented) {
                    onFailedNavigaton(new Error('Navigation prevented during ' + __beforeNavigate + ' event'));
                    return;
                }

                this.finishNavigating()
                    .then((): async.IThenable<void> => {

                    EventManager.dispatch(__navigating, this, EventManager.DIRECT, [utils]);
                    return this._router.navigate(utils.pathname, utils.query);
                }).then((): void => {
                    this._previousUrl = utils.pathname;
                    if (isFunction(this._resolveNavigate)) {
                        this._resolveNavigate();
                    }

                    if (headExists) {
                        headControl.navigated(utils.href);
                    }

                    EventManager.dispatch(__navigated, this, EventManager.DIRECT, [utils]);
                }, onFailedNavigaton);
            });
        }

        /**
         * @name _generate
         * @memberof plat.routing.Navigator
         * @kind function
         * @access protected
         * 
         * @description
         * Generates a url with the given view, parameters, and query.
         * 
         * @returns {string} The generated url.
         */
        protected _generate(view: any, parameters: any, query: any): string {
            if (isNull(this._router)) {
                return;
            }

            if (isEmpty(view)) {
                return view;
            }

            return this._router.generate(view, parameters, query);
        }
    }

    register.injectable(__NavigatorInstance, Navigator, null, __INSTANCE);

    /**
     * @name INavigateOptions
     * @memberof plat.routing
     * @kind interface
     * 
     * @description
     * Specifies options used during navigation. Can help build the url, as well as change 
     * the behavior of the navigation.
     */
    export interface INavigateOptions {
        /**
         * @name isUrl
         * @memberof plat.routing.INavigateOptions
         * @kind function
         * @access public
         * @optional
         * 
         * @type {boolean}
         * 
         * @description
         * Indicates that the url is specified and does not need to be generated.
         */
        isUrl?: boolean;

        /**
         * @name parameters
         * @memberof plat.routing.INavigateOptions
         * @kind function
         * @access public
         * @optional
         * 
         * @type {plat.IObject<any>}
         * 
         * @description
         * Url parameters, used to generate a url if the associated view is a variable route (i.e. '/posts/:id')
         */
        parameters?: IObject<any>;

        /**
         * @name query
         * @memberof plat.routing.INavigateOptions
         * @kind function
         * @access public
         * @optional
         * 
         * @type {plat.IObject<any>}
         * 
         * @description
         * An object used to generate a query string.
         */
        query?: IObject<any>;

        /**
         * @name replace
         * @memberof plat.routing.INavigateOptions
         * @kind function
         * @access public
         * @optional
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not this url should replace the current url in the browser history.
         */
        replace?: boolean;
    }

    /**
     * @name IBackNavigateOptions
     * @memberof plat.routing
     * @kind interface
     * 
     * @description
     * Specifies options used during backward navigation.
     */
    export interface IBackNavigateOptions {
        /**
         * @name length
         * @memberof plat.routing.IBackNavigateOptions
         * @kind function
         * @access public
         * @optional
         * 
         * @type {number}
         * 
         * @description
         * The length in history to go back.
         */
        length?: number;
    }
}
