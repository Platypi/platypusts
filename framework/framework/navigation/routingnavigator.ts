module plat.navigation {
    /**
     * A Navigator class that utilizes routing capabilities. It is associated with a 
     * Routeport, thus only allowing one RoutingNavigator per app.
     */
    export class RoutingNavigator extends BaseNavigator implements IRoutingNavigator {
        $Router: web.IRouter = acquire(__Router);
        $Window: Window = acquire(__Window);

        /**
         * The routing information for the Routeport's current state.
         */
        currentState: IRouteNavigationState;

        private __removeListeners: Array<IRemoveListener> = [];
        private __historyLength = 0;

        initialize(baseport: ui.controls.IBaseport): void {
            this.__removeListeners.push(this.$EventManagerStatic.on(this.uid, 'routeChanged', this._onRouteChanged, this));
            this.__removeListeners.push(this.$EventManagerStatic.on(this.uid, 'beforeRouteChange', this._beforeRouteChange, this));
            super.initialize(baseport);
        }

        navigate(path: string, options?: web.IRouteNavigationOptions): void {
            this.navigating = true;
            if (!this.$Router.route(path, options)) {
                this.navigating = false;
            }
        }

        navigated(control: ui.IBaseViewControl, parameter: web.IRoute<any>, options: web.IRouteNavigationOptions): void {
            super.navigated(control, parameter, options);
            this.currentState.route = parameter;
        }

        goBack(options?: IBaseBackNavigationOptions): void {
            options = options || {};

            this.__historyLength -= 2;

            if (this.__historyLength < 0) {
                this.$EventManagerStatic.dispatch('shutdown', this, this.$EventManagerStatic.DIRECT);
            }

            this.$Router.goBack((isNumber(options.length) ? options.length : 1));
        }

        dispose(): void {
            var listeners = this.__removeListeners;
            while (listeners.length > 0) {
                listeners.pop()();
            }
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
                injector = ev.target,
                baseport = this.baseport;

            if (isNull(injector)) {
                return;
            }

            this.__historyLength++;
            baseport.navigateFrom(viewControl).then(() => {
                this.$BaseViewControlFactory.dispose(viewControl);
                baseport.navigateTo(ev);
            }).catch((error) => {
                postpone(() => {
                    var Exception: IExceptionStatic = acquire(__ExceptionStatic);
                    Exception.fatal(error, Exception.NAVIGATION);
                });
            });
        }
    }

    /**
     * The Type for referencing the '$RoutingNavigator' injectable as a dependency.
     */
    export function IRoutingNavigator(): IRoutingNavigator {
        return new RoutingNavigator();
    }

    register.injectable(__RoutingNavigator, IRoutingNavigator);

    /**
     * Defines the methods that a Navigator must implement if it chooses to utilize 
     * routing capabilities.
     */
    export interface IRoutingNavigator extends IBaseNavigator {
        /**
         * Allows a ui.IBaseViewControl to navigate to another ui.IBaseViewControl. Also allows for
         * navigation parameters to be sent to the new ui.IBaseViewControl.
         * 
         * @param path The url path to navigate to.
         * @param options Optional INavigationOptions for ignoring the current ui.IBaseViewControl in the history as
         * well as specifying a new templateUrl for the next ui.IBaseViewControl to use.
         */
        navigate(path: string, options?: web.IRouteNavigationOptions): void;

        /**
         * Called by the Viewport to make the Navigator aware of a successful navigation. The Navigator will
         * in-turn call the app.navigated event.
         * 
         * @param control The ui.IBaseViewControl to which the navigation occurred.
         * @param parameter The navigation parameter sent to the control.
         * @param options The INavigationOptions used during navigation.
         */
        navigated(control: ui.IBaseViewControl, parameter: web.IRoute<any>, options: web.IRouteNavigationOptions): void;

        /**
         * Returns to the last visited ui.IBaseViewControl.
         * 
         * @param options Optional IBackNavigationOptions allowing the ui.IBaseViewControl
         * to customize navigation. Enables navigating back to a specified point in history as well
         * as specifying a new templateUrl to use at the next ui.IBaseViewControl.
         */
        goBack(options?: IBaseBackNavigationOptions): void;
    }

    /**
     * Defines the route type interface implemented for current state and last state.
     */
    export interface IRouteNavigationState extends IBaseNavigationState {
        /**
         * The associated route information.
         */
        route: web.IRoute<any>;
    }
}
