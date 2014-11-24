module plat.navigation {
    /**
     * @name Navigator
     * @memberof plat.navigation
     * @kind class
     * 
     * @extends plat.navigation.BaseNavigator
     * @implements {plat.navigation.INavigatorInstance}
     * 
     * @description
     * Allows {@link plat.ui.IBaseViewControl|IBaseViewControl} to navigate within a 
     * {@link plat.ui.controls.Viewport|Viewport}. Every {@link plat.ui.controls.Viewport|Viewport} 
     * has its own {@link plat.navigation.Navigator|Navigator} instance, allowing multiple navigators to 
     * coexist in one app.
     */
    export class Navigator extends BaseNavigator implements INavigatorInstance {
        /**
         * @name __mainNavigator
         * @memberof plat.navigation.Navigator
         * @kind property
         * @access private
         * @static
         * 
         * @type {plat.navigator.INavigatorInstance}
         * 
         * @description
         * Stores the instance of the main navigator. Unless otherwise specified, the main 
         * navigator is the first instantiated navigator.
         */
        private static __mainNavigator: INavigatorInstance;

        /**
         * @name __mainNavigatorFound
         * @memberof plat.navigation.Navigator
         * @kind property
         * @access private
         * @static
         * 
         * @type {boolean}
         * 
         * @description
         * Indicates whether or not a main navigator has been found. Main navigators respond to backbutton 
         * events.
         */
        private static __mainNavigatorFound: boolean = false;

        /**
         * @name history
         * @memberof plat.navigation.Navigator
         * @kind property
         * @access public
         * 
         * @type {Array<plat.navigation.INavigationState>}
         * 
         * @description
         * Contains the navigation history stack for the associated {@link plat.ui.controls.Viewport|Viewport}.
         */
        history: Array<INavigationState> = [];

        /**
         * @name currentState
         * @memberof plat.navigation.Navigator
         * @kind property
         * @access public
         * 
         * @type {plat.navigation.INavigationState}
         * 
         * @description
         * Specifies the current state of navigation. This state should contain 
         * enough information for it to be pushed onto the history stack when 
         * necessary.
         */
        currentState: INavigationState;

        /**
         * @name viewport
         * @memberof plat.navigation.Navigator
         * @kind property
         * @access public
         * 
         * @type {plat.ui.controls.IBaseport}
         * 
         * @description
         * Every navigator will have an {@link plat.ui.controls.IBaseport|IBaseport} with which to communicate and 
         * facilitate navigation.
         */
        viewport: ui.controls.IBaseport;

        /**
         * @name registerPort
         * @memberof plat.navigation.Navigator
         * @kind function
         * @access public
         * 
         * @description
         * Registers an {@link plat.ui.controls.Viewport|Viewport} with this navigator. 
         * The {@link plat.ui.controls.Viewport|Viewport} will call this method and pass 
         * itself in so the navigator can store it and use it to facilitate navigation.
         * 
         * @param {@link plat.ui.controls.Viewport|Viewport} viewport The {@link plat.ui.controls.Viewport|Viewport} 
         * associated with this {@link plat.navigation.INavigatorInstance|INavigatorInstance}.
         * @param {boolean} main? Whether or not this 
         * 
         * @returns {void}
         */
        registerPort(viewport: ui.controls.IBaseport, main?: boolean): void {
            if (isNull(Navigator.__mainNavigator)) {
                Navigator.__mainNavigator = this;
            } else if (main) {
                if (!Navigator.__mainNavigatorFound) {
                    this.$EventManagerStatic.dispose(Navigator.__mainNavigator.uid);
                    Navigator.__mainNavigatorFound = true;
                }

                Navigator.__mainNavigator = this;
            } else {
                this.$EventManagerStatic.dispose(this.uid);
            }

            this.viewport = viewport;
        }

        /**
         * @name navigate
         * @memberof plat.navigation.Navigator
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Allows an {@link plat.ui.IBaseViewControl|IBaseViewControl} to navigate to another 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl}. Also allows for
         * navigation parameters to be sent along with the navigation.
         * 
         * @param {new (...args: any[]) => ui.IBaseViewControl} Constructor The Constructor for the new 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl}. This navigator will find the injector for 
         * the Constructor and create a new instance of the control.
         * @param {plat.navigation.INavigationOptions} options? Optional 
         * {@link plat.navigation.INavigationOptions|INavigationOptions} used for navigation.
         * 
         * @returns {void}
         */
        navigate(Constructor: new (...args: any[]) => ui.IBaseViewControl, options?: INavigationOptions): void;
        /**
         * @name navigate
         * @memberof plat.navigation.Navigator
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Allows an {@link plat.ui.IBaseViewControl|IBaseViewControl} to navigate to another 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl}. Also allows for
         * navigation parameters to be sent along with the navigation.
         * 
         * @param {string} name The name for the new {@link plat.ui.IBaseViewControl|IBaseViewControl}. 
         * The name is associated to the value used when the view control was registered.
         * @param {plat.navigation.INavigationOptions} options? Optional 
         * {@link plat.navigation.INavigationOptions|INavigationOptions} used for navigation.
         * 
         * @returns {void}
         */
        navigate(name: string, options?: INavigationOptions): void;
        /**
         * @name navigate
         * @memberof plat.navigation.Navigator
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Allows an {@link plat.ui.IBaseViewControl|IBaseViewControl} to navigate to another 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl}. Also allows for
         * navigation parameters to be sent along with the navigation.
         * 
         * @param {new (...args: any[]) => plat.ui.IBaseViewControl} injector The {@link plat.dependency.IInjector|IInjector} 
         * for the new {@link plat.ui.IBaseViewControl|IBaseViewControl}. This navigator will create a new instance of the control.
         * @param {plat.navigation.INavigationOptions} options? Optional 
         * {@link plat.navigation.INavigationOptions|INavigationOptions} used for navigation.
         * 
         * @returns {void}
         */
        navigate(injector: dependency.IInjector<ui.IBaseViewControl>, options?: INavigationOptions): void;
        navigate(Constructor: any, options?: INavigationOptions): void {
            options = options || <IBaseNavigationOptions>{};

            var state = this.currentState || <INavigationState>{},
                viewControl = state.control,
                injector: dependency.IInjector<ui.IBaseViewControl>,
                key: string,
                parameter = options.parameter,
                initialize = options.initialize === true,
                event: events.INavigationEvent<any>,
                baseport = this.viewport,
                index = -1;

            event = this._sendEvent(__beforeNavigate, Constructor, null, parameter, options);

            if (event.defaultPrevented) {
                return;
            }

            this.navigating = true;

            if (isObject(parameter)) {
                parameter = _clone(parameter, true);
            }

            baseport.controls = [];

            if (isFunction(Constructor.inject)) {
                injector = Constructor;
                key = (<dependency.IInjector<any>>Constructor).name;
            } else if (!initialize && ((index = this._findInHistory(Constructor)) > -1 || this.isCurrentState(Constructor))) {
                if (this.isCurrentState(Constructor)) {
                    injector = <any>viewControl;
                } else {
                    injector = <any>this.history[index].control;
                }

                key = (<any>injector).type;
            } else if (isString(Constructor)) {
                injector = viewControlInjectors[(key = Constructor)];
            } else {
                var keys = Object.keys(viewControlInjectors),
                    control: dependency.IInjector<ui.IViewControl>;

                while (keys.length > 0) {
                    key = keys.pop();
                    control = <any>viewControlInjectors[key];
                    if (control.Constructor === Constructor) {
                        injector = control;
                        break;
                    }
                }
            }

            if (isNull(injector)) {
                var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                $exception.fatal('Attempting to navigate to unregistered view control.', $exception.NAVIGATION);
            }

            event.target = injector;
            event.type = key;

            if (!isNull(viewControl)) {
                baseport.navigateFrom(viewControl).then(() => {
                    this.$BaseViewControlFactory.detach(viewControl);

                    if (!options.replace) {
                        this.history.push({ control: viewControl });
                    }

                    baseport.navigateTo(event);
                }).catch((error) => {
                        postpone(() => {
                            var Exception: IExceptionStatic = acquire(__ExceptionStatic);
                            Exception.fatal(error, Exception.NAVIGATION);
                        });
                    });

                return;
            }

            // need to postpone so that the viewport can compile before the first navigation
            postpone(() => {
                baseport.navigateTo(event);
            });
        }

        /**
         * @name isCurrentState
         * @memberof plat.navigation.Navigator
         * @kind function
         * @access public
         * 
         * @description
         * Returns whether or not the current state matches the input Constructor.
         * 
         * @param {new (...args: any[]) => plat.ui.IBaseViewControl} Constructor The 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl} constructor to match in the current state.
         * 
         * @returns {boolean} Whether or not the input Constructor matches the current state.
         */
        isCurrentState(Constructor: new (...args: any[]) => ui.IBaseViewControl): boolean;
        /**
         * @name isCurrentState
         * @memberof plat.navigation.Navigator
         * @kind function
         * @access public
         * 
         * @description
         * Returns whether or not the current state matches the input type.
         * 
         * @param {string} type The 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl} type to match in the current state.
         * 
         * @returns {boolean} Whether or not the input type matches the current state.
         */
        isCurrentState(type: string): boolean;
        isCurrentState(Constructor: any): boolean {
            if (isNull(this.currentState)) {
                return false;
            }

            var viewControl = this.currentState.control;

            if (isString(Constructor)) {
                return viewControl.type === Constructor;
            }

            return viewControl.constructor === Constructor;
        }

        /**
         * @name goBack
         * @memberof plat.navigation.Navigator
         * @kind function
         * @access public
         * 
         * @description
         * Returns to the last visited {@link plat.ui.IBaseViewControl|IBaseViewControl}.
         * 
         * @param {plat.navigation.IBackNavigationOptions} options? Optional 
         * {@link plat.navigation.IBackNavigationOptions|IBackNavigationOptions} allowing the 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl} to customize navigation. Enables 
         * navigating back to a specified point in history as well as specifying a new templateUrl 
         * to use at the next {@link plat.ui.IBaseViewControl|IBaseViewControl}.
         * 
         * @returns {void}
         */
        goBack(options?: IBackNavigationOptions): void {
            var opts: IBackNavigationOptions = options || {},
                currentState = this.currentState || <INavigationState>{},
                history = this.history,
                viewControl = currentState.control,
                indexInHistory = this._findInHistory(viewControl.type),
                inHistory = indexInHistory > -1,
                length = isNumber(opts.length) ? opts.length : 1,
                Constructor = opts.ViewControl,
                parameter = opts.parameter,
                baseport = this.viewport;

            if (history.length === 0) {
                var $EventManager = this.$EventManagerStatic;
                $EventManager.dispatch(__shutdown, this, $EventManager.DIRECT);
            }

            if (isNull(viewControl)) {
                return;
            }

            var event = this._sendEvent(__beforeNavigate, viewControl, viewControl.type, parameter, options);

            if (event.defaultPrevented) {
                return;
            }

            var $exception: IExceptionStatic;
            if (!isNull(Constructor)) {
                var index = this._findInHistory(Constructor);

                if (index > -1) {
                    length = history.length - index;
                } else {
                    $exception = acquire(__ExceptionStatic);
                    $exception.warn('Cannot find ViewControl in navigation history.', $exception.NAVIGATION);
                    return;
                }
            }

            if (!isNumber(length) || length > history.length) {
                $exception = acquire(__ExceptionStatic);
                $exception.warn('Not enough views in the navigation history in order to navigate back.',
                    $exception.NAVIGATION);
                return;
            }

            baseport.navigateFrom(viewControl).then(() => {
                if (inHistory) {
                    this.$BaseViewControlFactory.detach(viewControl);
                } else {
                    this.$BaseViewControlFactory.dispose(viewControl);
                }

                var last = this._goBackLength(length);

                if (isNull(last)) {
                    return;
                }

                viewControl = last.control;

                this.currentState = last;

                event.target = viewControl;
                event.type = viewControl.type;

                baseport.navigateTo(event);
            }).catch((error) => {
                    postpone(() => {
                        $exception = acquire(__ExceptionStatic);
                        $exception.fatal(error, $exception.NAVIGATION);
                    });
                });
        }

        /**
         * @name backButtonPressed
         * @memberof plat.navigation.Navigator
         * @kind function
         * @access public
         * 
         * @description
         * Looks for a backButtonPressed event on the current view control and uses it if it exists. Otherwise calls goBack if 
         * this navigator is the main navigator.
         * 
         * @returns {void}
         */
        backButtonPressed(): void {
            this.viewport.backButtonPressed();
        }

        /**
         * @name goBack
         * @memberof plat.navigation.Navigator
         * @kind function
         * @access public
         * 
         * @description
         * Lets the caller know if there are {@link plat.ui.IBaseViewControl|IBaseViewControl} in the history, 
         * meaning the caller is safe to perform a backward navigation.
         * 
         * @returns {boolean} Whether or not a backwards navigation can occur.
         */
        canGoBack(): boolean {
            return this.history.length > 0;
        }

        /**
         * @name clearHistory
         * @memberof plat.navigation.Navigator
         * @kind function
         * @access public
         * 
         * @description
         * Clears the navigation history, disposing all the controls.
         * 
         * @returns {void}
         */
        clearHistory(): void {
            var history = this.history,
                dispose = this.$BaseViewControlFactory.dispose;

            while (history.length > 0) {
                dispose(history.pop().control);
            }
        }

        navigated(control: ui.IViewControl, parameter: any, options: IBaseNavigationOptions): void {
            this.currentState = {
                control: control
            };

            super.navigated(control, parameter, options);
        }

        /**
         * @name _findInHistory
         * @memberof plat.navigation.Navigator
         * @kind function
         * @access protected
         * @variation 0
         * 
         * @description
         * Finds the given constructor in the history stack. Returns the index in the history where
         * the constructor is found, or -1 if no constructor is found.
         * 
         * @param {new (...args: any[]) => plat.ui.IBaseViewControl} Constructor The 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl} constructor to search for in the history stack.
         * 
         * @returns {number} The index in the history where the input Constructor was found.
         */
        protected _findInHistory(Constructor: new (...args: any[]) => ui.IBaseViewControl): number;
        /**
         * @name _findInHistory
         * @memberof plat.navigation.Navigator
         * @kind function
         * @access protected
         * @variation 1
         * 
         * @description
         * Finds the given constructor in the history stack. Returns the index in the history where
         * the constructor is found, or -1 if no constructor is found.
         * 
         * @param {new (...args: any[]) => plat.ui.IBaseViewControl} Constructor The 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl} constructor to search for in the history stack.
         * 
         * @returns {number} The index in the history where the input Constructor was found.
         */
        protected _findInHistory(Constructor: string): number;
        protected _findInHistory(Constructor: any): number {
            var history = this.history,
                index = -1,
                i: number;

            if (isFunction(Constructor)) {
                for (i = (history.length - 1); i >= 0; --i) {
                    if (history[i].control.constructor === Constructor) {
                        index = i;
                        break;
                    }
                }
            } else if (isString(Constructor)) {
                for (i = (history.length - 1); i >= 0; --i) {
                    if (history[i].control.type === Constructor) {
                        index = i;
                        break;
                    }
                }
            }

            return index;
        }

        /**
         * @name _goBackLength
         * @memberof plat.navigation.Navigator
         * @kind function
         * @access protected
         * 
         * @description
         * This method takes in a length and navigates back in the history, returning the 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl} associated with length + 1 entries 
         * back in the history.  It disposes all the {@link plat.ui.IBaseViewControl|IBaseViewControls} 
         * encapsulated in the length, but does not dispose the current {@link plat.ui.IBaseViewControl|IBaseViewControls}.
         * 
         * @param {number} length The number of entries to go back in the history stack.
         * 
         * @returns {plat.navigation.INavigationState} The new current navigation state as a 
         * {@link plat.navigation.INavigationState|INavigationState}.
         */
        protected _goBackLength(length?: number): INavigationState {
            length = isNumber(length) ? length : 1;

            var last: INavigationState,
                dispose = this.$BaseViewControlFactory.dispose,
                history = this.history,
                control: ui.IViewControl;

            while (length-- > 0) {
                if (!isNull(last) && !isNull(last.control)) {
                    control = last.control;
                    if (this._findInHistory(control.type) < 0) {
                        dispose(control);
                    }
                }

                last = history.pop();
            }

            return last;
        }
    }

    /**
     * The Type for referencing the '$Navigator' injectable as a dependency.
     */
    export function INavigatorInstance(): INavigatorInstance {
        return new Navigator();
    }

    register.injectable(__NavigatorInstance, INavigatorInstance, null, __INSTANCE);

    /**
     * @name INavigatorInstance
     * @memberof plat.navigation
     * @kind interface
     * 
     * @extends {plat.navigation.IBaseNavigator}
     * 
     * @description
     * An object that allows {@link plat.ui.IBaseViewControl|IBaseViewControl} to implement methods 
     * used to navigate within a {@link plat.ui.controls.Viewport|Viewport}.
     */
    export interface INavigatorInstance extends IBaseNavigator {
        /**
         * @name history
         * @memberof plat.navigation.INavigatorInstance
         * @kind property
         * @access public
         * 
         * @type {Array<plat.navigation.INavigationState>}
         * 
         * @description
         * Contains the navigation history stack for the associated {@link plat.ui.controls.Viewport|Viewport}.
         */
        history: Array<INavigationState>;

        /**
         * @name currentState
         * @memberof plat.navigation.INavigatorInstance
         * @kind property
         * @access public
         * 
         * @type {plat.navigation.INavigationState}
         * 
         * @description
         * Specifies the current state of navigation. This state should contain 
         * enough information for it to be pushed onto the history stack when 
         * necessary.
         */
        currentState: INavigationState;

        /**
         * @name viewport
         * @memberof plat.navigation.INavigatorInstance
         * @kind property
         * @access public
         * 
         * @type {plat.ui.controls.IBaseport}
         * 
         * @description
         * Every navigator will have an {@link plat.ui.controls.IBaseport|IBaseport} with which to communicate and 
         * facilitate navigation.
         */
        viewport: ui.controls.IBaseport;

        /**
         * @name navigate
         * @memberof plat.navigation.INavigatorInstance
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Allows an {@link plat.ui.IBaseViewControl|IBaseViewControl} to navigate to another 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl}. Also allows for
         * navigation parameters to be sent along with the navigation.
         * 
         * @param {new (...args: any[]) => ui.IBaseViewControl} Constructor The Constructor for the new 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl}. This navigator will find the injector for 
         * the Constructor and create a new instance of the control.
         * @param {plat.navigation.INavigationOptions} options? Optional 
         * {@link plat.navigation.INavigationOptions|INavigationOptions} used for navigation.
         * 
         * @returns {void}
         */
        navigate(Constructor: new (...args: any[]) => ui.IBaseViewControl, options?: INavigationOptions): void;
        /**
         * @name navigate
         * @memberof plat.navigation.INavigatorInstance
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Allows an {@link plat.ui.IBaseViewControl|IBaseViewControl} to navigate to another 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl}. Also allows for
         * navigation parameters to be sent along with the navigation.
         * 
         * @param {string} name The name for the new {@link plat.ui.IBaseViewControl|IBaseViewControl}. 
         * The name is associated to the value used when the view control was registered.
         * @param {plat.navigation.INavigationOptions} options? Optional 
         * {@link plat.navigation.INavigationOptions|INavigationOptions} used for navigation.
         * 
         * @returns {void}
         */
        navigate(name: string, options?: INavigationOptions): void;
        /**
         * @name navigate
         * @memberof plat.navigation.INavigatorInstance
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Allows an {@link plat.ui.IBaseViewControl|IBaseViewControl} to navigate to another 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl}. Also allows for
         * navigation parameters to be sent along with the navigation.
         * 
         * @param {new (...args: any[]) => plat.ui.IBaseViewControl} injector The {@link plat.dependency.IInjector|IInjector} 
         * for the new {@link plat.ui.IBaseViewControl|IBaseViewControl}. This navigator will create a new instance of the control.
         * @param {plat.navigation.INavigationOptions} options? Optional 
         * {@link plat.navigation.INavigationOptions|INavigationOptions} used for navigation.
         * 
         * @returns {void}
         */
        navigate(injector: dependency.IInjector<ui.IBaseViewControl>, options?: INavigationOptions): void;

        /**
         * @name goBack
         * @memberof plat.navigation.INavigatorInstance
         * @kind function
         * @access public
         * 
         * @description
         * Returns to the last visited {@link plat.ui.IBaseViewControl|IBaseViewControl}.
         * 
         * @param {plat.navigation.IBackNavigationOptions} options? Optional 
         * {@link plat.navigation.IBackNavigationOptions|IBackNavigationOptions} allowing the 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl} to customize navigation. Enables 
         * navigating back to a specified point in history as well as specifying a new templateUrl 
         * to use at the next {@link plat.ui.IBaseViewControl|IBaseViewControl}.
         * 
         * @returns {void}
         */
        goBack(options?: IBackNavigationOptions): void;

        /**
         * @name goBack
         * @memberof plat.navigation.INavigatorInstance
         * @kind function
         * @access public
         * 
         * @description
         * Lets the caller know if there are {@link plat.ui.IBaseViewControl|IBaseViewControl} in the history, 
         * meaning the caller is safe to perform a backward navigation.
         * 
         * @returns {boolean} Whether or not a backwards navigation can occur.
         */
        canGoBack(): boolean;

        /**
         * @name clearHistory
         * @memberof plat.navigation.INavigatorInstance
         * @kind function
         * @access public
         * 
         * @description
         * Clears the navigation history, disposing all the controls.
         * 
         * @returns {void}
         */
        clearHistory(): void;
    }

    /**
     * @name INavigationOptions
     * @memberof plat.navigation
     * @kind interface
     * 
     * @extends {plat.navigation.IBaseNavigationOptions}
     * 
     * @description
     * Options that you can submit to an {@link plat.navigation.INavigatorInstance|INavigatorInstance} in order 
     * to customize navigation.
     */
    export interface INavigationOptions extends IBaseNavigationOptions {
        /**
         * @name parameter
         * @memberof plat.navigation.INavigationOptions
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * An optional parameter to send to the next {@link plat.ui.IBaseViewControl|IBaseViewControl}.
         */
        parameter?: any;

        /**
         * @name initialize
         * @memberof plat.navigation.INavigationOptions
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * If true it will not attempt to find the next view in the history, it will instantiate a new view.
         */
        initialize?: boolean;
    }

    /**
     * @name IBackNavigationOptions
     * @memberof plat.navigation
     * @kind interface
     * 
     * @extends {plat.navigation.IBaseBackNavigationOptions}
     * 
     * @description
     * Options that you can submit to an {@link plat.navigation.INavigatorInstance|INavigatorInstance} during a backward 
     * navigation in order to customize the navigation.
     */
    export interface IBackNavigationOptions extends IBaseBackNavigationOptions {
        /**
         * @name parameter
         * @memberof plat.navigation.IBackNavigationOptions
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * An optional parameter to send to the next {@link plat.ui.IBaseViewControl|IBaseViewControl}.
         */
        parameter?: any;

        /**
         * @name ViewControl
         * @memberof plat.navigation.IBackNavigationOptions
         * @kind property
         * @access public
         * 
         * @type {new (...args: any[]) => plat.ui.IBaseViewControl}
         * 
         * @description
         * An {@link plat.ui.IBaseViewControl|IBaseViewControl} Constructor that the 
         * {@link plat.navigation.INavigatorInstance|INavigatorInstance} will use to navigate. 
         * The {@link plat.navigation.INavigatorInstance|INavigatorInstance} will search for an instance 
         * of the {@link plat.ui.IBaseViewControl|IBaseViewControl} in its history and navigate to it.
         */
        ViewControl?: new (...args: any[]) => ui.IBaseViewControl;
    }

    /**
     * @name INavigationState
     * @memberof plat.navigation
     * @kind interface
     * 
     * @description
     * Defines the base interface that needs to be implemented in the navigation history.
     */
    export interface INavigationState {
        /**
         * @name control
         * @memberof plat.navigation.INavigationState
         * @kind property
         * @access public
         * 
         * @type {plat.ui.IViewControl}
         * 
         * @description
         * The {@link plat.ui.IViewControl|IViewControl} associated with a history entry.
         */
        control: ui.IViewControl;
    }
}

