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

    export class Viewport2 extends TemplateControl implements routing.ISupportRouteNavigation {
        $RouterStatic: typeof routing.Router = acquire(__RouterStatic);
        $Promise: async.IPromise = acquire(__Promise);
        $Injector: typeof dependency.Injector = acquire(__InjectorStatic);
        $ElementManagerFactory: processing.IElementManagerFactory = acquire(__ElementManagerFactory);
        $Document: Document = acquire(__Document);


        /**
         * @name $ManagerCache
         * @memberof plat.ui.controls.Viewport
         * @kind property
         * @access public
         * 
         * @type {plat.storage.ICache<plat.processing.IElementManager>}
         * 
         * @description
         * Reference to an injectable that caches {@link plat.processing.IElementManager|IElementManagers}.
         */
        $ManagerCache: storage.ICache<processing.IElementManager> = acquire(__ManagerCache);

        /**
         * @name $Animator
         * @memberof plat.ui.controls.Viewport
         * @kind property
         * @access public
         * 
         * @type {plat.ui.animations.IAnimator}
         * 
         * @description
         * Reference to the {@link plat.ui.animations.IAnimator|IAnimator} injectable.
         */
        $Animator: animations.IAnimator = acquire(__Animator);

        /**
         * @name _animationPromise
         * @memberof plat.ui.controls.Viewport
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.animations.IAnimationThenable<plat.ui.animations.IParentAnimationFn>}
         * 
         * @description
         * A promise used for disposing the end state of the previous animation prior to starting a new one.
         */
        protected _animationPromise: animations.IAnimationThenable<animations.IGetAnimatingThenable>;

        router: routing.Router;
        parentRouter: routing.Router;
        controls: Array<IViewControl>;
        nextInjector: dependency.IInjector<IViewControl>;
        nextView: IViewControl;


        initialize() {
            var router = this.router = this.$RouterStatic.currentRouter(),
                parentViewport = this._getParentViewport(),
                parentRouter: routing.Router;

            if (!(isNull(parentViewport) || isNull(parentViewport.router))) {
                parentRouter = this.parentRouter = parentViewport.router;
                parentRouter.addChild(router);
            }
        }

        setTemplate() {
            this.router.registerViewport(this);
        }

        canNavigateTo(result: routing.IRouteResult) {
            var bool: any = true,
                router = this.router,
                route = result[0],
                injector: dependency.IInjector<IViewControl> = this.$Injector.getDependency(route.delegate.view),
                view = injector.inject();

            if (isObject(view) && isFunction(view.canNavigateTo)) {
                bool = view.canNavigateTo();
            }

            return this.$Promise.resolve(bool).then((canNavigateTo) => {
                this.nextInjector = injector;
                this.nextView = view;
            });
        }

        canNavigateFrom(result: routing.IRouteResult) {
            var view = this.controls[0],
                bool: any = true;

            if (isObject(view) && isFunction(view.canNavigateFrom)) {
                bool = view.canNavigateFrom();
            }

            return this.$Promise.resolve(bool);
        }

        navigateTo(result: routing.IRouteResult) {
            return this.$Promise.resolve().then(() => {
                var router = this.router,
                    route = result[0],
                    injector = this.nextInjector || this.$Injector.getDependency(route.delegate.view),
                    nodeMap = this._createNodeMap(injector),
                    element = this.element,
                    node = nodeMap.element;

                element.appendChild(node);

                var animationPromise = this._animationPromise;
                if (isPromise(animationPromise)) {
                    animationPromise.dispose();
                }

                this._animationPromise = this.$Animator.animate(this.element, __Enter);

                var viewportManager = this.$ManagerCache.read(this.uid),
                    manager = this.$ElementManagerFactory.getInstance();

                viewportManager.children = [];
                manager.initialize(nodeMap, viewportManager);

                var control = this.controls[0];
                (<any>control).router = router;

                if (isFunction(control.navigatedTo)) {
                    control.navigatedTo(route.parameters);
                }

                manager.setUiControlTemplate();
                return manager.templatePromise;
            });
        }

        navigateFrom(result: routing.IRouteResult) {
            var view = this.controls[0];

            if (isObject(view) && isFunction(view.navigatingFrom)) {
                view.navigatingFrom();
            }

            return this.$Promise.resolve().then(() => {
                Control.dispose(view);
            });
        }

        dispose() {
            this.router.unregisterViewport(this);
        }

        protected _createNodeMap(injector: dependency.IInjector<IViewControl>) {
            var control = this.nextView || injector.inject(),
                doc = this.$Document,
                type = injector.name,
                replaceWith = control.replaceWith,
                node: HTMLElement = (isEmpty(replaceWith) || replaceWith === 'any') ? doc.createElement('div') : doc.createElement(replaceWith);

            node.setAttribute('plat-control', type);
            node.className = 'plat-viewcontrol';

            return <processing.INodeMap>{
                element: node,
                attributes: {},
                nodes: [],
                uiControlNode: {
                    control: control,
                    nodeName: type,
                    expressions: [],
                    injector: injector,
                    childManagerLength: 0
                }
            };
        }

        protected _getParentViewport(): Viewport2 {
            var viewport = this.parent,
                type = this.type;

            while (!isNull(viewport) && viewport.type !== type) {
                viewport = viewport.parent;
            }

            return <Viewport2>viewport;
        }
    }

    register.control(__Viewport + 2, Viewport2);
}
