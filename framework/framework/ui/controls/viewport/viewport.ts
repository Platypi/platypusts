module plat.ui.controls {
    'use strict';

    export class Viewport extends TemplateControl implements routing.ISupportRouteNavigation {
        protected $RouterStatic: typeof routing.Router = acquire(__RouterStatic);
        protected $Promise: async.IPromise = acquire(__Promise);
        protected $Injector: typeof dependency.Injector = acquire(__InjectorStatic);
        protected $ElementManagerFactory: processing.IElementManagerFactory = acquire(__ElementManagerFactory);
        protected $Document: Document = acquire(__Document);

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
        protected $ManagerCache: storage.ICache<processing.IElementManager> = acquire(__ManagerCache);

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
        protected $Animator: animations.IAnimator = acquire(__Animator);

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

        navigator: routing.Navigator = acquire(__NavigatorInstance);
        router: routing.Router;
        parentRouter: routing.Router;
        controls: Array<ViewControl>;
        nextInjector: dependency.IInjector<ViewControl>;
        nextView: ViewControl;

        initialize() {
            var router = this.router = this.$RouterStatic.currentRouter(),
                parentViewport = this._getParentViewport(),
                parentRouter: routing.Router;

            if (!(isNull(parentViewport) || isNull(parentViewport.router))) {
                parentRouter = this.parentRouter = parentViewport.router;
                parentRouter.addChild(router);
            }

            this.navigator.initialize(router);
        }

        setTemplate() {
            postpone(() => {
                this.router.register(this);
            });
        }

        canNavigateTo(routeInfo: routing.IRouteInfo): async.IThenable<boolean> {
            var response: any = true,
                injector: dependency.IInjector<ViewControl> = this.$Injector.getDependency(routeInfo.delegate.view),
                view = injector.inject(),
                parameters = routeInfo.parameters,
                resolve = this.$Promise.resolve.bind(this.$Promise);

            if (!isObject(view)) {
                return resolve();
            }

            view.navigator = this.navigator;

            if (isFunction(view.canNavigateTo)) {
                response = view.canNavigateTo(parameters, routeInfo.query);
            }

            return resolve(response).then((canNavigateTo: boolean) => {
                this.nextInjector = injector;
                this.nextView = view;
                return canNavigateTo;
            });
        }

        canNavigateFrom(): async.IThenable<boolean> {
            var view = this.controls[0],
                response: any = true;

            if (isObject(view) && isFunction(view.canNavigateFrom)) {
                response = view.canNavigateFrom();
            }

            return this.$Promise.resolve(response);
        }

        navigateTo(routeInfo: routing.IRouteInfo) {
            return this.$Promise.resolve().then(() => {
                var router = this.router,
                    injector = this.nextInjector || this.$Injector.getDependency(routeInfo.delegate.view),
                    nodeMap = this._createNodeMap(injector),
                    element = this.element,
                    node = nodeMap.element,
                    parameters = routeInfo.parameters,
                    query = routeInfo.query;

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
                    control.navigatedTo(routeInfo.parameters, query);
                }

                manager.setUiControlTemplate();
                return manager.templatePromise;
            });
        }

        navigateFrom() {
            var view = this.controls[0];

            if (isObject(view) && isFunction(view.navigatingFrom)) {
                view.navigatingFrom();
            }

            return this.$Promise.resolve().then(() => {
                Control.dispose(view);
            });
        }

        dispose() {
            this.router.unregister(this);
            this.navigator.dispose();
        }

        protected _createNodeMap(injector: dependency.IInjector<ViewControl>) {
            var control = this.nextView || injector.inject(),
                doc = this.$Document,
                type = injector.name,
                replaceWith = control.replaceWith,
                node: HTMLElement = (isEmpty(replaceWith) || replaceWith === 'any') ?
                    doc.createElement('div') : doc.createElement(replaceWith);

            node.setAttribute('plat-control', type);
            node.className = 'plat-viewcontrol';

            return <processing.INodeMap>{
                element: node,
                attributes: {},
                nodes: [],
                uiControlNode: {
                    control: <any>control,
                    nodeName: type,
                    expressions: [],
                    injector: <any>injector,
                    childManagerLength: 0
                }
            };
        }

        protected _getParentViewport(): Viewport {
            var viewport = this.parent,
                type = this.type;

            while (!isNull(viewport) && viewport.type !== type) {
                viewport = viewport.parent;
            }

            return <Viewport><any>viewport;
        }
    }

    register.control(__Viewport, Viewport);
}
