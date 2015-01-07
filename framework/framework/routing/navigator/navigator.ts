module plat.routing {
    'use strict';

    export class Navigator {
        /**
         * @name $InjectorStatic
         * @memberof plat.routing.Navigator
         * @kind property
         * @access public
         * 
         * @type {plat.dependency.Injector}
         * 
         * @description
         * The {@link plat.dependency.Injector|Injector} injectable instance
         */
        $InjectorStatic: typeof dependency.Injector = acquire(__InjectorStatic);

        /**
         * @name $browserConfig
         * @memberof plat.routing.Navigator
         * @kind property
         * @access public
         * 
         * @type {plat.web.IBrowserConfig}
         * 
         * @description
         * The {@link plat.web.IBrowserConfig|IBrowserConfig} injectable instance
         */
        $browserConfig: web.IBrowserConfig = acquire(__BrowserConfig);

        /**
         * @name $browser
         * @memberof plat.routing.Navigator
         * @kind property
         * @access public
         * 
         * @type {plat.web.IBrowser}
         * 
         * @description
         * The {@link plat.web.IBrowser|IBrowser} injectable instance
         */
        $browser: web.IBrowser = acquire(__Browser);

        $EventManagerStatic: events.IEventManagerStatic = acquire(__EventManagerStatic);

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
        router: routing.Router;

        uid = uniqueId(__Plat);
        removeUrlListener = noop;
        ignoreOnce = false;
        previousUrl: string;

        initialize(router: routing.Router) {
            this.router = router;

            if (router.isRoot) {
                this._observeUrl();
            }
        }

        navigate(view: any, options: INavigateOptions) {
            var url = this._getUrl(view, options.parameters, options.query);
            this.$browser.url(url, options.replace);
        }

        goBack() {

        }

        dispose() {
            this.removeUrlListener();
            deleteProperty(this, 'router');
        }

        protected _observeUrl() {
            if (!isObject(this.router)) {
                return;
            }

            var config = this.$browserConfig,
                prefix: string,
                previousUrl: string,
                previousQuery: string;

            this.previousUrl = this.$browser.urlUtils().href;
            this.removeUrlListener();

            this.removeUrlListener = this.$EventManagerStatic.on(this.uid, __urlChanged, (ev: events.IDispatchEventInstance, utils?: web.IUrlUtilsInstance) => {
                if (this.ignoreOnce) {
                    this.ignoreOnce = false;
                    return;
                }

                postpone(() => {
                    previousUrl = this.previousUrl;
                    this.router.navigate(utils.pathname, utils.query).then(() => {
                        this.previousUrl = utils.href;
                    }).catch(() => {
                        this.ignoreOnce = true;
                        this.previousUrl = previousUrl;
                        this.$browser.url(previousUrl, true);
                    });
                });
            });
        }

        protected _getUrl(view: any, parameters: any, query: any): string {
            if (isNull(this.router)) {
                return;
            }

            var $browserConfig = this.$browserConfig,
                baseUrl = $browserConfig.baseUrl.slice(0, -1),
                routingType = $browserConfig.routingType,
                usingHash = routingType !== $browserConfig.STATE,
                prefix = $browserConfig.hashPrefix;

            if (isEmpty(view)) {
                return view;
            }

            view = this.$InjectorStatic.convertDependency(view);

            var path = this.router.generate(view, parameters, query);

            if (usingHash && view.indexOf('#') === -1) {
                view = baseUrl + '/#' + prefix + path;
            } else {
                view = baseUrl + path;
            }

            return view;
        }
    }

    export function INavigatorInstance() {
        return new Navigator();
    }

    register.injectable(__NavigatorInstance, INavigatorInstance, null, __INSTANCE);

    export interface INavigateOptions {
        parameters?: IObject<string>;
        query?: IObject<string>;
        replace?: boolean;
    }
}
