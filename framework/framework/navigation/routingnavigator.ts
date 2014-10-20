module plat.navigation {
    /**
     * @name RoutingNavigator
     * @memberof plat.navigation
     * @kind class
     * 
     * @extends plat.navigation.BaseNavigator
     * @implements {plat.navigation.IRoutingNavigator}
     * 
     * @description
     * A type of navigator class that utilizes routing capabilities. It is directly associated with a 
     * {@link plat.ui.controls.Routeport|Routeport}, thus only allowing one 
     * {@link plat.navigation.RoutingNavigator|RoutingNavigator} per app.
     */
    export class RoutingNavigator extends BaseNavigator implements IRoutingNavigator {
        /**
         * @name $Router
         * @memberof plat.navigation.RoutingNavigator
         * @kind property
         * @access public
         * 
         * @type {Window}
         * 
         * @description
         * Reference to the {@link plat.web.IRouter|IRouter} injectable.
         */
        $Router: web.IRouter = acquire(__Router);
        /**
         * @name $Window
         * @memberof plat.navigation.RoutingNavigator
         * @kind property
         * @access public
         * 
         * @type {Window}
         * 
         * @description
         * Reference to the Window injectable.
         */
        $Window: Window = acquire(__Window);
        
        /**
         * @name currentState
         * @memberof plat.navigation.RoutingNavigator
         * @kind property
         * @access public
         * 
         * @type {plat.navigation.IRouteNavigationState}
         * 
         * @description
         * The routing information for the {@link plat.ui.controls.Routeport|Routeport's} current state.
         */
        currentState: IRouteNavigationState;

        /**
         * @name routeport
         * @memberof plat.navigation.RoutingNavigator
         * @kind property
         * @access public
         * 
         * @type {plat.ui.controls.IBaseport}
         * 
         * @description
         * Every navigator will have an {@link plat.ui.controls.IBaseport|IBaseport} with which to communicate and 
         * facilitate navigation.
         */
        routeport: ui.controls.IBaseport;

        /**
         * @name __removeListeners
         * @memberof plat.navigation.RoutingNavigator
         * @kind property
         * @access private
         * 
         * @type {Array<plat.IRemoveListener>}
         * 
         * @description
         * A collection of listeners for removing event based listeners.
         */
        private __removeListeners: Array<IRemoveListener> = [];
        /**
         * @name __historyLength
         * @memberof plat.navigation.RoutingNavigator
         * @kind property
         * @access private
         * 
         * @type {number}
         * 
         * @description
         * The history length. Used to keep track of potential app shutdown.
         */
        private __historyLength = 0;
        
        /**
         * @name initialize
         * @memberof plat.navigation.RoutingNavigator
         * @kind function
         * @access public
         * 
         * @description
         * Initializes this navigator. The {plat.ui.controls.Routeport|Routeport} will call this method and pass 
         * itself in so the navigator can store it and use it to facilitate navigation. Also subscribes to 
         * 'routeChanged' and 'beforeRouteChange' events.
         * 
         * @param {plat.ui.controls.IBaseport} baseport The {plat.ui.controls.Routeport|Routeport} 
         * associated with this {@link plat.navigation.IRoutingNavigator|IRoutingNavigator}.
         * 
         * @returns {void}
         */
        initialize(baseport: ui.controls.IBaseport): void {
            super.registerPort(baseport);

            var removeListeners = this.__removeListeners,
                $EventManager = this.$EventManagerStatic,
                uid = this.uid;

            removeListeners.push($EventManager.on(uid, 'routeChanged', this._onRouteChanged, this));
            removeListeners.push($EventManager.on(uid, 'beforeRouteChange', this._beforeRouteChange, this));
        }
        
        /**
         * @name navigate
         * @memberof plat.navigation.RoutingNavigator
         * @kind function
         * @access public
         * 
         * @description
         * Allows a {@link plat.ui.IBaseViewControl|IBaseViewControl} to navigate to another 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl}. Also allows for
         * navigation parameters to be sent to the new {@link plat.ui.IBaseViewControl|IBaseViewControl}.
         * 
         * @param {string} path The URL path to navigate to.
         * @param {plat.web.IRouteNavigationOptions} options? Optional {@link plat.web.IRouteNavigationOptions|IRouteNavigationOptions} 
         * for ignoring the current ui.IBaseViewControl in the history as well as specifying a new templateUrl 
         * for the next {@link plat.ui.IBaseViewControl|IBaseViewControl} to use.
         * 
         * @returns {void}
         */
        navigate(path: string, options?: web.IRouteNavigationOptions): void {
            this.navigating = true;
            if (!this.$Router.route(path, options)) {
                this.navigating = false;
            }
        }
        
        /**
         * @name navigated
         * @memberof plat.navigation.RoutingNavigator
         * @kind function
         * @access public
         * 
         * @description
         * Called by the {@link plat.ui.controls.Routeport|Routeport} to make the Navigator aware of a successful navigation.
         * 
         * @param {plat.ui.IBaseViewControl} control The {@link plat.ui.IBaseViewControl|IBaseViewControl} to which the 
         * navigation occurred.
         * @param {plat.web.IRoute<any>} parameter The navigation parameter sent to the control.
         * @param {plat.web.IRouteNavigationOptions} options The options used during navigation.
         * 
         * @returns {void}
         */
        navigated(control: ui.IBaseViewControl, parameter: web.IRoute<any>, options: web.IRouteNavigationOptions): void {
            super.navigated(control, parameter, options);
            this.currentState.route = parameter;
        }
        
        /**
         * @name goBack
         * @memberof plat.navigation.RoutingNavigator
         * @kind function
         * @access public
         * 
         * @description
         * Returns to the last visited {@link plat.ui.IBaseViewControl|IBaseViewControl}.
         * 
         * @param {plat.navigation.IBaseBackNavigationOptions} options? Optional 
         * {@link plat.navigation.IBaseBackNavigationOptions|IBaseBackNavigationOptions} allowing the 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl} to customize navigation. Enables navigating 
         * back to a specified point in history as well as specifying a new templateUrl to use at the 
         * next {@link plat.ui.IBaseViewControl|IBaseViewControl}.
         * 
         * @returns {void}
         */
        goBack(options?: IBaseBackNavigationOptions): void {
            options = options || {};

            this.__historyLength -= 2;

            if (this.__historyLength < 0) {
                this.$EventManagerStatic.dispatch('shutdown', this, this.$EventManagerStatic.DIRECT);
            }

            this.$Router.goBack((isNumber(options.length) ? options.length : 1));
        }
        
        /**
         * @name dispose
         * @memberof plat.navigation.RoutingNavigator
         * @kind function
         * @access public
         * 
         * @description
         * Cleans up memory.
         * 
         * @returns {void}
         */
        dispose(): void {
            var listeners = this.__removeListeners;
            while (listeners.length > 0) {
                listeners.pop()();
            }
        }
        
        /**
         * @name _beforeRouteChange
         * @memberof plat.navigation.RoutingNavigator
         * @kind function
         * @access protected
         * 
         * @description
         * The method called prior to a route change event.
         * 
         * @param {plat.events.INavigationEvent<plat.web.IRoute<any>>} ev The 
         * {@link plat.events.INavigationEvent|INavigationEvent} containing information regarding 
         * the {@link plat.ui.IBaseViewControl|IBaseViewControl}, the routing information, 
         * and the {@link plat.web.Router|Router}.
         * 
         * @returns {void}
         */
        _beforeRouteChange(ev: events.INavigationEvent<web.IRoute<any>>): void {
            var event = this._sendEvent('beforeNavigate', ev.target, ev.type, ev.parameter, ev.options, true);

            if (event.cancelled) {
                ev.cancel();
            }
        }
        
        /**
         * @name _onRouteChanged
         * @memberof plat.navigation.RoutingNavigator
         * @kind function
         * @access protected
         * 
         * @description
         * The method called when a route change is successfully performed and 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl} navigation can occur.
         * 
         * @param {plat.events.INavigationEvent<plat.web.IRoute<any>>} ev The 
         * {@link plat.events.INavigationEvent|INavigationEvent} containing information regarding 
         * the {@link plat.ui.IBaseViewControl|IBaseViewControl}, the routing information, 
         * and the {@link plat.web.Router|Router}.
         * 
         * @returns {void}
         */
        _onRouteChanged(ev: events.INavigationEvent<web.IRoute<any>>): void {
            var state = this.currentState || <IRouteNavigationState>{},
                viewControl = state.control,
                injector = ev.target,
                baseport = this.routeport;

            if (isNull(injector)) {
                return;
            }

            this.__historyLength++;
            baseport.navigateFrom(viewControl).then(() => {
                this.$BaseViewControlFactory.dispose(viewControl);
                baseport.navigateTo(ev);
            }).catch((error: any) => {
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
     * @name IRoutingNavigator
     * @memberof plat.navigation
     * @kind interface
     * 
     * @extends {plat.navigation.IBaseNavigator}
     * 
     * @description
     * Defines the methods that a navigator must implement if it chooses to utilize 
     * routing capabilities.
     */
    export interface IRoutingNavigator extends IBaseNavigator {
        /**
         * @name navigate
         * @memberof plat.navigation.IRoutingNavigator
         * @kind function
         * @access public
         * 
         * @description
         * Allows a {@link plat.ui.IBaseViewControl|IBaseViewControl} to navigate to another 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl}. Also allows for
         * navigation parameters to be sent to the new {@link plat.ui.IBaseViewControl|IBaseViewControl}.
         * 
         * @param {string} path The URL path to navigate to.
         * @param {plat.web.IRouteNavigationOptions} options? Optional {@link plat.web.IRouteNavigationOptions|IRouteNavigationOptions} 
         * for ignoring the current ui.IBaseViewControl in the history as well as specifying a new templateUrl 
         * for the next {@link plat.ui.IBaseViewControl|IBaseViewControl} to use.
         * 
         * @returns {void}
         */
        navigate(path: string, options?: web.IRouteNavigationOptions): void;

        /**
         * @name navigated
         * @memberof plat.navigation.IRoutingNavigator
         * @kind function
         * @access public
         * 
         * @description
         * Called by the {@link plat.ui.controls.Routeport|Routeport} to make the Navigator aware of a successful navigation.
         * 
         * @param {plat.ui.IBaseViewControl} control The {@link plat.ui.IBaseViewControl|IBaseViewControl} to which the 
         * navigation occurred.
         * @param {plat.web.IRoute<any>} parameter The navigation parameter sent to the control.
         * @param {plat.web.IRouteNavigationOptions} options The options used during navigation.
         * 
         * @returns {void}
         */
        navigated(control: ui.IBaseViewControl, parameter: web.IRoute<any>, options: web.IRouteNavigationOptions): void;

        /**
         * @name goBack
         * @memberof plat.navigation.IRoutingNavigator
         * @kind function
         * @access public
         * 
         * @description
         * Returns to the last visited {@link plat.ui.IBaseViewControl|IBaseViewControl}.
         * 
         * @param {plat.navigation.IBaseBackNavigationOptions} options? Optional 
         * {@link plat.navigation.IBaseBackNavigationOptions|IBaseBackNavigationOptions} allowing the 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl} to customize navigation. Enables navigating 
         * back to a specified point in history as well as specifying a new templateUrl to use at the 
         * next {@link plat.ui.IBaseViewControl|IBaseViewControl}.
         * 
         * @returns {void}
         */
        goBack(options?: IBaseBackNavigationOptions): void;
    }

    /**
     * @name IRouteNavigationState
     * @memberof plat.navigation
     * @kind interface
     * 
     * @extends {plat.navigation.IBaseNavigationState}
     * 
     * @description
     * Defines the route type interface implemented for current state and last state.
     */
    export interface IRouteNavigationState extends INavigationState {
        /**
         * @name route
         * @memberof plat.navigation.RoutingNavigator
         * @kind property
         * @access public
         * 
         * @type {plat.web.IRoute<any>}
         * 
         * @description
         * The associated route information in the form of an 
         * {@link plat.web.IRoute|IRoute}.
         */
        route: web.IRoute<any>;
    }
}
