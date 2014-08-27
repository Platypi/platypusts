module plat.ui.controls {
    /**
     * @name Viewport
     * @memberof plat.ui.controls
     * @kind class
     * 
     * @extends {plat.ui.controls.Baseport}
     * 
     * @description
     * A {@link plat.ui.TemplateControl|TemplateControl} that can interchangeably swap out 
     * {@link plat.ui.IViewControl|IViewControls}.
     */
    export class Viewport extends Baseport {
        /**
         * @name options
         * @memberof plat.ui.controls.Viewport
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IObservableProperty<plat.ui.controls.IViewportOptions>}
         * 
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: observable.IObservableProperty<IViewportOptions>;

        /**
         * @name navigator
         * @memberof plat.ui.controls.Viewport
         * @kind property
         * @access public
         * 
         * @type {plat.navigation.INavigatorInstance}
         * 
         * @description
         * A type of navigator that uses either the {@link plat.ui.ViewControl|ViewControl's} 
         * Constructors or their registered names for navigation 
         * from one to another.
         */
        navigator: navigation.INavigatorInstance;

        /**
         * @name _load
         * @memberof plat.ui.controls.Viewport
         * @kind function
         * @access protected
         * 
         * @description
         * Checks for a default view, finds the {@link plat.ui.ViewControl|ViewControl's} injector, 
         * and initializes the loading of the view.
         * 
         * @returns {void}
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
     * @name IViewportOptions
     * @memberof plat.ui.controls
     * @kind interface
     * 
     * @description
     * The available options for a {@link plat.ui.controls.Viewport|Viewport}.
     */
    export interface IViewportOptions {
        /**
         * @name defaultView
         * @memberof plat.ui.controls.IViewportOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The registered name of the default 
         * {@link plat.ui.IViewControl|IViewControl} to initially navigate to.
         */
        defaultView: string;
    }

    register.control(__Viewport, Viewport, [__NavigatorInstance]);
}
