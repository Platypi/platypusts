module plat.ui.controls {
    class Routeport extends Baseport {
        /**
         * The evaluated plat-options object.
         */
        options: observable.IObservableProperty<IRouteportOptions>;

        /**
         * A type of navigator that uses the registered routes 
         * for ViewControls to navigate to and from one another.
         */
        navigator: navigation.IRoutingNavigator;

        /**
         * Looks for a defaultRoute and initializes the loading 
         * of the view.
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
     * The available options for plat.ui.controls.Routeport.
     */
    export interface IRouteportOptions {
        /**
         * The registered route of the default 
         * ViewControl to initially navigate to.
         */
        defaultRoute: string;
    }

    register.control(__Routeport, Routeport, [__RoutingNavigator]);
}
