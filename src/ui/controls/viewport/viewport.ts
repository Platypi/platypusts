module plat.ui.controls {
    'use strict';

    /**
     * @name Viewport
     * @memberof plat.ui.controls
     * @kind class
     *
     * @extends {plat.ui.TemplateControl}
     * @implements {plat.routing.ISupportRouteNavigation}
     *
     * @description
     * A control that facilitates routing between {@link plat.ui.ViewControl|ViewControls}. A Viewport is
     * the link between a ViewControl, a {@link plat.routing.Navigator|Navigator}, and a {@link plat.routing.Router|Router}.
     * It registers with a router and receives route change events. It then instantiates the proper viewcontrol and appends it
     * to the DOM.
     */
    export class Viewport extends TemplateControl implements routing.ISupportRouteNavigation {
        protected static _inject: any = {
            _Router: __RouterStatic,
            _Promise: __Promise,
            _Injector: __InjectorStatic,
            _ElementManagerFactory: __ElementManagerFactory,
            _document: __Document,
            _managerCache: __ManagerCache,
            _animator: __Animator,
            _navigator: __NavigatorInstance
        };

        /**
         * @name controls
         * @memberof plat.ui.controls.Viewport
         * @kind property
         * @access public
         *
         * @type {Array<plat.ui.ViewControl>}
         *
         * @description
         * Viewports contain ViewControls.
         */
        controls: Array<ViewControl>;

        /**
         * @name options
         * @memberof plat.ui.controls.Viewport
         * @kind property
         * @access public
         *
         * @type {plat.observable.IObservableProperty<plat.ui.controls.IViewportOptions>}
         *
         * @description
         * The {@link plat.ui.controls.IViewportOptions|options} for the {@link plat.ui.controls.Viewport|Viewport} control.
         */
        options: observable.IObservableProperty<IViewportOptions>;

        /**
         * @name _Router
         * @memberof plat.ui.controls.Viewport
         * @kind property
         * @access protected
         *
         * @type {plat.routing.Router}
         *
         * @description
         * Used to grab the current {@link plat.routing.Router|Router} instance.
         */
        protected _Router: routing.IRouterStatic;

        /**
         * @name _Promise
         * @memberof plat.ui.controls.Viewport
         * @kind property
         * @access protected
         *
         * @type {plat.async.IPromise}
         *
         * @description
         * The Promise injectable.
         */
        protected _Promise: async.IPromise;

        /**
         * @name _Injector
         * @memberof plat.ui.controls.Viewport
         * @kind property
         * @access protected
         *
         * @type {plat.dependency.Injector}
         *
         * @description
         * The Injector for getting instances of {@link plat.ui.ViewControl|ViewControls}.
         */
        protected _Injector: typeof dependency.Injector;

        /**
         * @name _ElementManagerFactory
         * @memberof plat.ui.controls.Viewport
         * @kind property
         * @access protected
         *
         * @type {plat.processing.IElementManagerFactory}
         *
         * @description
         * Used for compiling and linking a {@link plat.ui.ViewControl|ViewControl's} template.
         */
        protected _ElementManagerFactory: processing.IElementManagerFactory;

        /**
         * @name _document
         * @memberof plat.ui.controls.Viewport
         * @kind property
         * @access protected
         *
         * @type {Document}
         *
         * @description
         * The document.
         */
        protected _document: Document;

        /**
         * @name _managerCache
         * @memberof plat.ui.controls.Viewport
         * @kind property
         * @access protected
         *
         * @type {plat.storage.Cache<plat.processing.ElementManager>}
         *
         * @description
         * Reference to an injectable that caches {@link plat.processing.ElementManager|ElementManagers}.
         */
        protected _managerCache: storage.Cache<processing.ElementManager>;

        /**
         * @name _animator
         * @memberof plat.ui.controls.Viewport
         * @kind property
         * @access protected
         *
         * @type {plat.ui.animations.Animator}
         *
         * @description
         * Reference to the {@link plat.ui.animations.Animator|Animator} injectable.
         */
        protected _animator: animations.Animator;

        /**
         * @name navigator
         * @memberof plat.ui.controls.Viewport
         * @kind property
         * @access protected
         *
         * @type {plat.routing.Navigator}
         *
         * @description
         * The navigator associated with this Viewport.
         */
        protected _navigator: routing.Navigator;

        /**
         * @name router
         * @memberof plat.ui.controls.Viewport
         * @kind property
         * @access protected
         *
         * @type {plat.routing.Router}
         *
         * @description
         * The router associated with this Viewport.
         */
        protected _router: routing.Router;

        /**
         * @name parentRouter
         * @memberof plat.ui.controls.Viewport
         * @kind property
         * @access protected
         *
         * @type {plat.routing.Router}
         *
         * @description
         * The parent router associated with this Viewport.
         */
        protected _parentRouter: routing.Router;

        /**
         * @name nextInjector
         * @memberof plat.ui.controls.Viewport
         * @kind property
         * @access protected
         *
         * @type {plat.dependency.Injector<plat.ui.ViewControl>}
         *
         * @description
         * The next injector used to instantiate the next ViewControl during navigation.
         */
        protected _nextInjector: dependency.Injector<ViewControl>;

        /**
         * @name nextView
         * @memberof plat.ui.controls.Viewport
         * @kind property
         * @access protected
         *
         * @type {plat.ui.ViewControl}
         *
         * @description
         * The next ViewControl to which to navigate.
         */
        protected _nextView: ViewControl;

        /**
         * @name _animate
         * @memberof plat.ui.controls.Viewport
         * @kind property
         * @access protected
         *
         * @type {boolean}
         *
         * @description
         * Whether or not to animate Array mutations.
         */
        protected _animate: boolean;

        /**
         * @name initialize
         * @memberof plat.ui.controls.Viewport
         * @kind function
         * @access public
         *
         * @description
         * Allows the viewport to initialize its {@link plat.routing.Navigator|navigator} with the current
         * {@link plat.routing.Router|router}.
         *
         * @returns {void}
         */
        initialize(): void {
            let router = this._router = this._Router.currentRouter(),
                parentViewport = this._getParentViewport(),
                parentRouter: routing.Router;

            if (!(isNull(parentViewport) || isNull(parentViewport._router))) {
                parentRouter = this._parentRouter = parentViewport._router;
                parentRouter.addChild(router);
            }

            this._navigator.initialize(router);
        }

        /**
         * @name loaded
         * @memberof plat.ui.controls.Viewport
         * @kind function
         * @access public
         *
         * @description
         * The viewport registers itself with its {@link plat.routing.Router|router}, notifying the
         * router that it is ready to receive navigation events.
         *
         * @returns {void}
         */
        loaded(): void {
            if (isObject(this.options)) {
                let animate = this.options.value.animate === true;
                if (animate) {
                    this.dom.addClass(this.element, __Viewport + '-animate');
                }

                this._animate = animate;
            }

            this._Promise.resolve(this._router.finishNavigating).then((): void => {
                this._router.register(this);
            });
        }

        /**
         * @name canNavigateTo
         * @memberof plat.ui.controls.Viewport
         * @kind function
         * @access public
         *
         * @description
         * The viewport's router has matched a route and is asking the viewport if it is safe to
         * navigate. Here the viewport can instantiate the new view and ask it if it is safe to
         * navigate to the view.
         *
         * @param {plat.routing.IRouteInfo} routeInfo Contains the information necessary to instantiate
         * the view and feed it the route parameters/query.
         *
         * @returns {plat.async.IThenable<boolean>} Whether or not it is safe to navigate.
         */
        canNavigateTo(routeInfo: routing.IRouteInfo): async.IThenable<boolean> {
            let getRouter = this._Router.currentRouter,
                currentRouter = getRouter(),
                response: any = true,
                injector: dependency.Injector<ViewControl> = this._Injector.getDependency(routeInfo.delegate.view),
                view = injector.inject(),
                parameters = routeInfo.parameters,
                nextRouter = getRouter();

            if (!isObject(view)) {
                return this._Promise.resolve(null);
            }

            if (currentRouter !== nextRouter) {
                nextRouter.initialize(this._router);
                let navigator: routing.Navigator = acquire(__NavigatorInstance);
                view.navigator = navigator;
                navigator.initialize(nextRouter);
            } else {
                view.navigator = this._navigator;
            }

            if (isFunction(view.canNavigateTo)) {
                response = view.canNavigateTo(parameters, routeInfo.query);
            }

            return this._Promise.resolve(response).then((canNavigateTo: boolean): boolean => {
                this._nextInjector = injector;
                this._nextView = view;
                return canNavigateTo;
            });
        }

        /**
         * @name canNavigateFrom
         * @memberof plat.ui.controls.Viewport
         * @kind function
         * @access public
         *
         * @description
         * The viewport's router has matched a route and is asking the viewport if it is safe to
         * navigate from the current state. Here the viewport can query the current ViewControl and
         * ask it if it is safe to navigate from its current state.
         *
         * @returns {plat.async.IThenable<boolean>} Whether or not it is safe to navigate.
         */
        canNavigateFrom(): async.IThenable<boolean> {
            let view = this.controls[0],
                response: any = true;

            if (isObject(view) && isFunction(view.canNavigateFrom)) {
                response = view.canNavigateFrom();
            }

            return this._Promise.resolve(response);
        }

        /**
         * @name navigateTo
         * @memberof plat.ui.controls.Viewport
         * @kind function
         * @access public
         *
         * @description
         * The viewport's router has matched a route and determined that it is safe to navigate to the
         * next view. The viewport will now go through the steps to compile and link the next view then append
         * it to the DOM.
         *
         * @param {plat.routing.IRouteInfo} routeInfo Contains the information necessary to instantiate
         * the view and feed it the route parameters/query.
         *
         * @returns {plat.async.IThenable<void>} A {@link plat.async.IPromise|Promise} that resolves when the
         * new ViewControl has finished instantiating.
         */
        navigateTo(routeInfo: routing.IRouteInfo): async.IThenable<void> {
            let injector = this._nextInjector || this._Injector.getDependency(routeInfo.delegate.view),
                nodeMap = this._createNodeMap(injector),
                element = this.element,
                node = nodeMap.element,
                parameters = routeInfo.parameters,
                query = routeInfo.query,
                control = <ViewControl>nodeMap.uiControlNode.control;

            if (this._animate) {
                let animator = this._animator,
                    dom = this.dom,
                    isNavigatingBack = this._navigator.isBackNavigation(),
                    view = this.controls[0];

                if (isObject(view)) {
                    let oldElement = view.element;
                    if (isNavigatingBack) {
                        dom.addClass(oldElement, __NavigatingBack);
                    }

                    animator.leave(oldElement, __Leave).then((): void => {
                       Control.dispose(view);
                    });
                }

                if (isNavigatingBack) {
                    dom.addClass(node, __NavigatingBack);
                    animator.enter(node, __Enter, this.element).then((): void => {
                        dom.removeClass(node, __NavigatingBack);
                    });
                } else {
                    animator.enter(node, __Enter, this.element);
                }
            } else {
                Control.dispose(this.controls[0]);
                this.element.insertBefore(node, null);
            }

            let viewportManager = this._managerCache.read(this.uid),
                manager = this._ElementManagerFactory.getInstance();

            viewportManager.children = [];
            manager.initialize(nodeMap, viewportManager);

            if (isFunction(control.navigatedTo)) {
                control.navigatedTo(routeInfo.parameters, query);
            }

            manager.setUiControlTemplate();

            if (control.hasOwnContext) {
                return manager.observeRootContext(control, manager.fulfillAndLoad);
            }

            return manager.fulfillAndLoad();
        }

        /**
         * @name navigateFrom
         * @memberof plat.ui.controls.Viewport
         * @kind function
         * @access public
         *
         * @description
         * The viewport's router has matched a route and determined that it is safe to navigate to the
         * next view. It is now safe for the viewport to dispose of the current state.
         *
         * @returns {plat.async.IThenable<void>} A {@link plat.async.IPromise|Promise} that resolves when the viewport
         * has finished navigating from the current state.
         */
        navigateFrom(): async.IThenable<void> {
            let view = this.controls[0],
                promise: async.IThenable<void>;

            if (isObject(view) && isFunction(view.navigatingFrom)) {
                promise = this._Promise.resolve(view.navigatingFrom());
            } else {
                promise = this._Promise.resolve();
            }

            return promise.catch((error: any): void => {
                if (isObject(error)) {
                    if (isString(error.message)) {
                        this._log.debug(this.type + ' error: ' + error.message);
                        return;
                    }

                    this._log.debug(this.type + ' error: ' + JSON.stringify(error));
                    return;
                }

                this._log.debug(error);
            });
        }

        /**
         * @name dispose
         * @memberof plat.ui.controls.Viewport
         * @kind function
         * @access public
         *
         * @description
         * The viewport is going out of scope, so it needs to unregister from its router in order to stop receiving routing
         * events.
         *
         * @returns {void}
         */
        dispose(): void {
            this._router.unregister(this);
            this._navigator.dispose();
        }

        /**
         * @name _createNodeMap
         * @memberof plat.ui.controls.Viewport
         * @kind function
         * @access protected
         *
         * @description
         * Creates an {@link plat.processing.INodeMap|INodeMap} for a ViewControl in order to compile it.
         *
         * @param {plat.dependency.Injector<plat.ui.ViewControl>} The injector used to instantiate the ViewControl.
         *
         * @returns {plat.processing.INodeMap} The INodeMap for the ViewControl
         */
        protected _createNodeMap(injector: dependency.Injector<ViewControl>): processing.INodeMap {
            let control = this._nextView || injector.inject(),
                doc = this._document,
                type = injector.name,
                replaceWith = control.replaceWith,
                node: HTMLElement = (isEmpty(replaceWith) || replaceWith === 'any') ?
                    doc.createElement('div') : doc.createElement(replaceWith);

            node.setAttribute(__Control, type);
            node.className = __ViewControl;

            return <processing.INodeMap>{
                element: node,
                attributes: {},
                nodes: [],
                uiControlNode: {
                    control: <any>control,
                    nodeName: type,
                    expressions: <Array<expressions.IParsedExpression>>[],
                    injector: <any>injector
                }
            };
        }

        /**
         * @name _getParentViewport
         * @memberof plat.ui.controls.Viewport
         * @kind function
         * @access protected
         *
         * @description
         * Finds the first Viewport in the parent chain. This is useful in order to properly initialize the viewport's
         * router as a child of the parent viewport's router.
         *
         * @returns {plat.ui.controls.Viewport} The parent Viewport.
         */
        protected _getParentViewport(): Viewport {
            let viewport = this.parent,
                type = this.type;

            while (!isNull(viewport) && viewport.type !== type) {
                viewport = viewport.parent;
            }

            return <Viewport><any>viewport;
        }
    }

    register.control(__Viewport, Viewport);

    /**
     * @name IViewportOptions
     * @memberof plat.ui.controls
     * @kind interface
     *
     * @description
     * The available {@link plat.controls.Options|options} for the {@link plat.ui.controls.Viewport|Viewport} control.
     */
    export interface IViewportOptions {
        /**
         * @name animate
         * @memberof plat.ui.controls.IViewportOptions
         * @kind property
         * @access public
         *
         * @type {boolean}
         *
         * @description
         * Will allow for page transition animations if set to true.
         */
        animate: boolean;
    }
}
