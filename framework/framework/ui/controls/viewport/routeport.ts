module plat.ui.controls {
    /**
     * @name Routeport
     * @memberof plat.ui.controls
     * @kind class
     * 
     * @extends {plat.ui.controls.Baseport}
     * 
     * @description
     * A {@link plat.ui.TemplateControl|TemplateControl} that can interchangeably swap out 
     * {@link plat.ui.IWebViewControl|IWebViewControls} based on their defined routes.
     */
    export class Routeport extends Baseport {
        /**
         * @name options
         * @memberof plat.ui.controls.Routeport
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IObservableProperty<plat.ui.controls.IRouteportOptions>}
         * 
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: observable.IObservableProperty<IRouteportOptions>;

        /**
         * @name navigator
         * @memberof plat.ui.controls.Routeport
         * @kind property
         * @access public
         * 
         * @type {plat.navigation.IRoutingNavigator}
         * 
         * @description
         * A type of navigator that uses the registered routes 
         * for {@link plat.ui.IWebViewControl|IWebViewControls} to navigate to and from one another.
         */
        navigator: navigation.IRoutingNavigator;

        /**
         * @name _load
         * @memberof plat.ui.controls.Routeport
         * @kind function
         * @access protected
         * 
         * @description
         * Looks for a default route and initializes the loading 
         * of the view.
         * 
         * @returns {void}
         */
        _load(): void {
            var path = '',
                options = this.options;

            if (!isNull(options) && !isNull(options.value)) {
                path = options.value.defaultRoute || '';
            }

            super._load(path, {
                replace: true
            });
        }
    }

    /**
     * @name IRouteportOptions
     * @memberof plat.ui.controls
     * @kind interface
     * 
     * @description
     * The available options for a {@link plat.ui.controls.Routeport|Routeport}.
     */
    export interface IRouteportOptions {
        /**
         * @name defaultRoute
         * @memberof plat.ui.controls.IRouteportOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The registered route of the default 
         * {@link plat.ui.IWebViewControl|IWebViewControl} to initially navigate to.
         */
        defaultRoute: string;
    }

    register.control(__Routeport, Routeport, [__RoutingNavigator]);
}
