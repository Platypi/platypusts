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
         * @name __endViewports
         * @memberof plat.ui.controls.Viewport
         * @kind property
         * @access private
         * @static
         * 
         * @type {plat.events.IEventManagerStatic}
         * 
         * @description
         * Contains all the bottom-level viewports.
         */
        private static __endViewports: Array<Viewport> = [];

        /**
         * @name __addViewport
         * @memberof plat.ui.controls.Viewport
         * @kind function
         * @access private
         * @static
         * 
         * @description
         * Adds a viewport to the end viewports array if necessary. Keeps track of all viewports so that 
         * the end viewports array only contains the bottom-level viewports.
         * 
         * @returns {void}
         */
        private static __addViewport(viewport: Viewport): void {
            var ports = Viewport.__endViewports,
                control: ITemplateControl = viewport,
                type = viewport.type,
                index: number;

            while (!isNull(control)) {
                if (control.type === type) {
                    index = ports.indexOf(<Viewport>control);

                    if (index > -1) {
                        ports.splice(index, 1);
                    }
                }

                control = control.parent;
            }

            ports.push(viewport);
        }

        /**
         * @name $EventManagerStatic
         * @memberof plat.ui.controls.Viewport
         * @kind property
         * @access public
         * 
         * @type {plat.events.IEventManagerStatic}
         * 
         * @description
         * Reference to the {@link plat.events.IEventManagerStatic|IEventManagerStatic} injectable.
         */
        $EventManagerStatic: events.IEventManagerStatic = plat.acquire(__EventManagerStatic);

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
         * @name backButtonPressed
         * @memberof plat.ui.controls.Viewport
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * Propagates an event up from the bottom of the view-tree, allowing the backbutton 
         * event to be handled by any view control. If no view control handles the event, the 
         * default functionality is to call {@link plat.navigation.Navigator.goBack|navigator.goBack()}.
         * 
         * @returns {void}
         */
        backButtonPressed(): void {
            var viewports = Viewport.__endViewports,
                length = viewports.length,
                viewport: Viewport,
                child: IViewControl,
                sendEvent = this.$EventManagerStatic.sendEvent,
                ev: events.IDispatchEventInstance = plat.acquire(__DispatchEventInstance);

            ev.initialize(__backButtonPressed, this);

            for (var i = 0; i < length; ++i) {
                viewport = viewports[i];
                child = viewport.controls[0];

                if (isObject(child)) {
                    ev.sender = child;
                    sendEvent(ev);

                    if (ev.stopped) {
                        break;
                    }
                }
            }

            if (!ev.stopped) {
                super.backButtonPressed();
            }
        }

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
        protected _load(): void {
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

            Viewport.__addViewport(this);

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

        /**
         * @name main
         * @memberof plat.ui.controls.IViewportOptions
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not this viewport is a main viewport. Main viewports handle 
         * backbutton events.
         */
        main?: string;
    }

    register.control(__Viewport, Viewport, [__NavigatorInstance]);
}
