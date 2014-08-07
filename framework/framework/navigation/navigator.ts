module plat.navigation {
    /**
     * The Navigator class allows ui.IViewControls to navigate within a Viewport.
     * Every Viewport has its own Navigator instance, allowing multiple navigators to 
     * coexist in one app.
     */
    export class Navigator extends BaseNavigator implements INavigatorInstance {
        history: Array<IBaseNavigationState> = [];

        navigate(Constructor?: new (...args: any[]) => ui.IViewControl, options?: INavigationOptions): void;
        navigate(injector?: dependency.IInjector<ui.IViewControl>, options?: INavigationOptions): void;
        navigate(Constructor?: any, options?: INavigationOptions) {
            options = options || <IBaseNavigationOptions>{};

            var state = this.currentState || <IBaseNavigationState>{},
                viewControl = state.control,
                injector: dependency.IInjector<ui.IViewControl>,
                key: string,
                parameter = options.parameter,
                event: events.INavigationEvent<any>,
                baseport = this.baseport,
                BaseViewControlFactory = this.$BaseViewControlFactory;

            event = this._sendEvent('beforeNavigate', Constructor, null, parameter, options, true);

            if (event.canceled) {
                return;
            }

            this.navigating = true;
            BaseViewControlFactory.detach(viewControl);

            if (isObject(parameter)) {
                parameter = _clone(parameter, true);
            }

            baseport.controls = [];

            if (isFunction(Constructor.inject)) {
                injector = Constructor;
                key = (<dependency.IInjector<any>>Constructor).name;
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
                    BaseViewControlFactory.detach(viewControl);

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

        goBack(options?: IBackNavigationOptions): void {
            options = options || {};
            var viewControl = this.currentState.control,
                length = isNumber(options.length) ? options.length : 1,
                Constructor = options.ViewControl,
                parameter = options.parameter,
                history = this.history,
                baseport = this.baseport;

            if (history.length === 0) {
                this.$EventManagerStatic.dispatch('shutdown', this, this.$EventManagerStatic.DIRECT);
            }

            var event = this._sendEvent('beforeNavigate', viewControl, viewControl.type, parameter, options, true);

            if (event.canceled) {
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
                this.$BaseViewControlFactory.dispose(viewControl);

                var last: IBaseNavigationState = this._goBackLength(length);

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
                    var Exception: IExceptionStatic = acquire(__ExceptionStatic);
                    Exception.fatal(error, Exception.NAVIGATION);
                });
            });
        }

        canGoBack(): boolean {
            return this.history.length > 0;
        }

        clearHistory(): void {
            var history = this.history,
                dispose = this.$BaseViewControlFactory.dispose;

            while (history.length > 0) {
                dispose(history.pop().control);
            }
        }

        /**
         * Finds the given constructor in the history stack. Returns the index in the history where
         * the constructor is found, or -1 if no constructor is found.
         * 
         * @param Constructor The view control constructor to search for in the history stack.
         */
        _findInHistory(Constructor: new (...args: any[]) => ui.IViewControl): number {
            var history = this.history,
                length = history.length - 1,
                index = -1,
                control: any;

            for (var i = length; i >= 0; --i) {
                control = history[i].control;

                if (control.constructor === Constructor) {
                    index = i;
                    break;
                }
            }

            return index;
        }

        /**
         * This method takes in a length and navigates back in the history, returning the view control 
         * associated with length + 1 entries back in the history.  It disposes all the view controls 
         * encapsulated in the length.
         */
        _goBackLength(length?: number): IBaseNavigationState {
            length = isNumber(length) ? length : 1;

            var last: IBaseNavigationState,
                dispose = this.$BaseViewControlFactory.dispose,
                history = this.history;

            while (length-- > 0) {
                if (!isNull(last) && !isNull(last.control)) {
                    dispose(last.control);
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
     * An object implementing INavigator allows ui.IViewControls to implement methods 
     * used to navigate within a Viewport.
     */
    export interface INavigatorInstance extends IBaseNavigator {
        /**
         * Contains the navigation history stack for the associated Viewport.
         */
        history: Array<IBaseNavigationState>;

        /**
         * Allows a ui.IViewControl to navigate to another ui.IViewControl. Also allows for
         * navigation parameters to be sent to the new ui.IViewControl.
         * 
         * @param Constructor The Constructor for the new ui.IViewControl. The Navigator will find the injector 
         * for the Constructor and create a new instance of the control.
         * @param options Optional IBaseNavigationOptions used for Navigation.
         */
        navigate(Constructor?: new (...args: any[]) => ui.IViewControl, options?: INavigationOptions): void;
        navigate(injector?: dependency.IInjector<ui.IViewControl>, options?: INavigationOptions): void;

        /**
         * Returns to the last visited ui.IViewControl.
         * 
         * @param options Optional IBackNavigationOptions allowing the ui.IViewControl
         * to customize navigation. Enables navigating back to a specified point in history as well
         * as specifying a new templateUrl to use at the next ui.IViewControl.
         */
        goBack(options?: IBackNavigationOptions): void;

        /**
         * Lets the caller know if there are ui.IViewControls in the history, meaning the caller
         * is safe to perform a backward navigation.
         */
        canGoBack(): boolean;

        /**
         * Clears the navigation history, disposing all the controls.
         */
        clearHistory(): void;
    }

    /**
     * Options that you can submit to the Navigator in order
     * to customize navigation.
     */
    export interface INavigationOptions extends IBaseNavigationOptions {
        /**
         * An optional parameter to send to the next ui.IViewControl.
         */
        parameter?: any;
    }

    /**
     * Options that you can submit to the Navigator during a backward
     * navigation in order to customize the navigation.
     */
    export interface IBackNavigationOptions extends IBaseBackNavigationOptions {
        /**
         * An optional parameter to send to the next ui.IViewControl.
         */
        parameter?: any;
        /**
         * A ui.IViewControl Constructor that the Navigator will
         * use to navigate. The Navigator will search for an instance 
         * of the ui.IViewControl in its history and navigate to it.
         */
        ViewControl?: new (...args: any[]) => ui.IViewControl;
    }
}

