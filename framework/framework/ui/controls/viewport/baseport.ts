module plat.ui.controls {
    export class Baseport extends TemplateControl implements IBaseport {
        $ManagerCache: storage.ICache<processing.IElementManager> = acquire(__ManagerCache);
        $Document: Document = acquire(__Document);
        $ElementManagerFactory: processing.IElementManagerFactory = acquire(__ElementManagerFactory);
        $Animator: IAnimator = acquire(__Animator);
        $Promise: async.IPromise = acquire(__Promise);

        /**
         * @param navigator The navigator used for navigating between pages.
         */
        constructor(public navigator: navigation.IBaseNavigator) {
            super();
        }

        /**
         * Clears the Baseport's innerHTML.
         */
        setTemplate(): void {
            this.dom.clearNode(this.element);
            this._load();
        }

        /**
         * Initializes the navigator.
         * 
         * @param navigationParameter A parameter needed 
         * to perform the specified type of navigation.
         * @param options The IBaseNavigationOptions 
         * needed on load for the inherited form of 
         * navigation.
         */
        _load(navigationParameter?: any, options?: navigation.IBaseNavigationOptions): void {
            var navigator = this.navigator;
            navigator.initialize(this);
            navigator.navigate(navigationParameter, options);
        }

        /**
         * Clean up any memory being held.
         */
        dispose() {
            this.navigator.dispose();
        }

        /**
         * Grabs the root of this Baseport's manager 
         * tree, clears it, and initializes the 
         * creation of a new one by kicking off a 
         * navigate.
         * 
         * @param ev The navigation options
         */
        navigateTo(ev: IBaseportNavigateToOptions): void {
            var control = ev.target,
                parameter = ev.parameter,
                options = ev.options,
                element = this.element,
                controlType = ev.type,
                newControl = dependency.Injector.isInjector(control),
                injectedControl = newControl ? control.inject() : control,
                replaceType = injectedControl.replaceWith,
                node = (isEmpty(replaceType) || replaceType === 'any') ? this.$Document.createElement('div') :
                    <HTMLElement>this.$Document.createElement(replaceType),
                attributes: IObject<string> = {},
                nodeMap: processing.INodeMap = {
                    element: node,
                    attributes: attributes,
                    nodes: [],
                    uiControlNode: {
                        control: injectedControl,
                        nodeName: controlType,
                        expressions: [],
                        injector: control,
                        childManagerLength: 0
                    }
                };

            node.setAttribute('plat-control', controlType);
            element.appendChild(node);

            this.$Animator.animate(this.element, __Enter);

            var viewportManager = this.$ManagerCache.read(this.uid),
                manager = this.$ElementManagerFactory.getInstance(),
                navigator = this.navigator;

            viewportManager.children = [];
            manager.initialize(nodeMap, viewportManager, !newControl);

            control = this.controls[0];
            control.navigator = navigator;
            navigator.navigated(control, parameter, options);

            if (navigator.navigating) {
                return;
            }

            manager.setUiControlTemplate();
        }

        /**
         * Manages the navigatingFrom lifecycle event for 
         * ViewControls.
         * 
         * @param fromControl The ViewControl being navigated 
         * away from.
         */
        navigateFrom(fromControl: IBaseViewControl): async.IThenable<void> {
            if (isNull(fromControl) || !isFunction(fromControl.navigatingFrom)) {
                return this.$Promise.resolve<void>(null);
            }

            fromControl.navigatingFrom();
            return this.$Animator.animate(this.element, __Leave);
        }
    }

    export interface IBaseport extends ITemplateControl {
        /**
         * The object in charge of performing the 
         * navigation to and from different 
         * ViewControls.
         */
        navigator: navigation.IBaseNavigator;

        /**
         * Grabs the root of this Baseport's manager 
         * tree, clears it, and initializes the 
         * creation of a new one by kicking off a 
         * navigate.
         * 
         * @param ev The navigation options
         */
        navigateTo(ev: IBaseportNavigateToOptions): void;

        /**
         * Manages the navigatingFrom lifecycle event for 
         * ViewControls.
         * 
         * @param fromControl The ViewControl being navigated 
         * away from.
         */
        navigateFrom(fromControl: IBaseViewControl): async.IThenable<void>;
    }

    /**
     * Navigation options for a Baseport and all 
     * controls that inherit from Baseport.
     */
    export interface IBaseportNavigateToOptions {
        /**
         * Either a view control or an injector for a view control.
         */
        target: any;

        /**
         * The navigation parameter.
         */
        parameter: any;

        /**
         * The options used for navigation.
         */
        options: navigation.IBaseNavigationOptions;

        /**
         * The type of view control to navigate to.
         */
        type: string;
    }
}
