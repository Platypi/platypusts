module plat.navigation {
    /**
     * A Navigator class that utilizes routing capabilities. It is associated with a 
     * Routeport, thus only allowing one RoutingNavigator per app.
     */
    export class RoutingNavigator extends BaseNavigator implements IRoutingNavigator {
        /**
         * The routing information for the Routeport's current state.
         */
        currentState: IRouteNavigationState;
        $router: web.IRouter = acquire('$router');
        $window: Window = acquire('$window');
        private __removeListeners: Array<IRemoveListener> = [];
        private __historyLength = 0;

        constructor() {
            super();

            this.__removeListeners.push(this.$EventManagerStatic.on(this.uid, 'routeChanged', this._onRouteChanged, this));
            this.__removeListeners.push(this.$EventManagerStatic.on(this.uid, 'beforeRouteChange', this._beforeRouteChange, this));
        }

        /**
         * Allows a ui.IViewControl to navigate to another ui.IViewControl. Also allows for
         * navigation parameters to be sent to the new ui.IViewControl.
         * 
         * @param path The url path to navigate to.
         * @param options Optional INavigationOptions for ignoring the current ui.IViewControl in the history as
         * well as specifying a new templateUrl for the next ui.IViewControl to use.
         */
        navigate(path: string, options?: web.IRouteNavigationOptions): void {
            this.$router.route(path, options);
        }

        /**
         * Called by the Viewport to make the Navigator aware of a successful navigation. The Navigator will
         * in-turn call the app.navigated event.
         * 
         * @param control The ui.IViewControl to which the navigation occurred.
         * @param parameter The navigation parameter sent to the control.
         * @param options The INavigationOptions used during navigation.
         */
        navigated(control: ui.IViewControl, parameter: web.IRoute<any>, options: web.IRouteNavigationOptions): void {
            super.navigated(control, parameter, options);
            this.currentState.route = parameter;
        }

        /**
         * Returns to the last visited ui.IViewControl based on the previous route.
         * 
         * @param options Optional IBackNavigationOptions allowing the ui.IViewControl
         * to customize navigation. Enables navigating back to a specified point in history as well
         * as specifying a new templateUrl to use at the next ui.IViewControl.
         */
        goBack(options?: IBaseBackNavigationOptions): void {
            options = options || {};

            this.__historyLength -= 2;

            if (this.__historyLength < 0) {
                this.$EventManagerStatic.dispatch('shutdown', this, this.$EventManagerStatic.direction.DIRECT);
            }

            this.$router.goBack((isNumber(options.length) ? options.length : 1));
        }

        /**
         * The method called prior to a route change event.
         * 
         * @param ev The INavigationEvent containing information regarding the ViewControl, the routing information, 
         * and the Router.
         */
        _beforeRouteChange(ev: events.INavigationEvent<web.IRoute<any>>): void {
            var event = this._sendEvent('beforeNavigate', ev.target, ev.type, ev.parameter, ev.options, true);

            if (event.canceled) {
                ev.cancel();
            }
        }

        /**
         * The method called when a route change is successfully performed and ViewControl navigation can occur.
         * 
         * @param ev The INavigationEvent containing information regarding the ViewControl, the routing infomration, 
         * and the Router.
         */
        _onRouteChanged(ev: events.INavigationEvent<web.IRoute<any>>): void {
            var state = this.currentState || <IRouteNavigationState>{},
                viewControl = state.control,
                injector = ev.target;

            if (isNull(injector)) {
                return;
            }

            this.__historyLength++;
            this.baseport.navigateFrom(viewControl);
            this.$ViewControlStatic.dispose(viewControl);
            this.baseport.navigateTo(ev);
        }
    }

    register.injectable('$routingNavigator', RoutingNavigator);

    /**
     * Defines the route type interface implemented for current state and last state.
     */
    export interface IRouteNavigationState extends IBaseNavigationState {
        /**
         * The associated route information.
         */
        route: web.IRoute<any>;
    }
    
    /**
     * Defines the methods that a Navigator must implement if it chooses to utilize 
     * routing capabilities.
     */
    export interface IRoutingNavigator extends IBaseNavigator {
        /**
         * Allows a ui.IViewControl to navigate to another ui.IViewControl. Also allows for
         * navigation parameters to be sent to the new ui.IViewControl.
         * 
         * @param path The url path to navigate to.
         * @param options Optional INavigationOptions for ignoring the current ui.IViewControl in the history as
         * well as specifying a new templateUrl for the next ui.IViewControl to use.
         */
        navigate(path: string, options?: web.IRouteNavigationOptions): void;

        /**
         * Returns to the last visited ui.IViewControl.
         * 
         * @param options Optional IBackNavigationOptions allowing the ui.IViewControl
         * to customize navigation. Enables navigating back to a specified point in history as well
         * as specifying a new templateUrl to use at the next ui.IViewControl.
         */
        goBack(options?: IBaseBackNavigationOptions): void;
    }
}
