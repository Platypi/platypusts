module plat.ui.controls {
    export class Viewport extends Baseport {
        /**
         * The evaluated plat-options object.
         */
        options: observable.IObservableProperty<IViewportOptions>;

        /**
         * A type of navigator that uses either the ViewControl's 
         * Constructors or their registered names for navigation 
         * from one to another.
         */
        navigator: navigation.INavigatorInstance;

        /**
         * Checks for a defaultView, finds the ViewControl's injector, 
         * and initializes the loading of the view.
         */
        _load(): void {
            var $exception: IExceptionStatic;
            if (isNull(this.options)) {
                $exception = acquire(__ExceptionStatic);
                $exception.warn('No defaultView specified in plat-options for plat-viewport.',
                    $exception.NAVIGATION);
                return;
            }

            var options = this.options.value || <IViewportOptions>{},
                controlType = options.defaultView,
                injector = viewControlInjectors[controlType];

            if (isNull(injector)) {
                $exception = acquire(__ExceptionStatic);
                $exception.fatal('The defaultView ' + controlType + ' is not a registered view control.',
                    $exception.NAVIGATION);
                return;
            }

            super._load(injector);
        }
    }

    /**
     * The available options for plat.ui.controls.Viewport.
     */
    export interface IViewportOptions {
        /**
         * The registered name of the default 
         * ViewControl to initially navigate to.
         */
        defaultView: string;
    }

    register.control(__Viewport, Viewport, [__NavigatorInstance]);
}
