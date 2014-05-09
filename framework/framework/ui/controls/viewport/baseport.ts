module plat.ui.controls {
    export class Baseport extends TemplateControl implements IBaseport {
        $ManagerCacheStatic: storage.ICache<processing.IElementManager> = acquire('$ManagerCacheStatic');
        $ExceptionStatic: IExceptionStatic = acquire('$ExceptionStatic');
        $document: Document = acquire('$document');
        $ElementManagerStatic: processing.IElementManagerStatic = acquire('$ElementManagerStatic');
        constructor(public navigator: navigation.IBaseNavigator) {
            super();
        }

        /**
         * Clears the Baseport's innerHTML.
         */
        setTemplate() {
            this.dom.clearNode(this.element);
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
        loaded(navigationParameter?: any, options?: navigation.IBaseNavigationOptions) {
            var navigator = this.navigator;
            navigator.initialize(this);
            navigator.navigate(navigationParameter, options);
        }

        /**
         * Grabs the root of this Baseport's manager 
         * tree, clears it, and initializes the 
         * creation of a new one by kicking off a 
         * navigate.
         * 
         * @param ev The navigation options
         */
        navigateTo(ev: IBaseportNavigateToOptions) {
            var control = ev.target,
                parameter = ev.parameter,
                options = ev.options,
                element = this.element,
                controlType = ev.type,
                newControl = isFunction(control.inject);

            //var node = this.$document.createElement(controlType),
            var injectedControl = newControl ? control.inject() : control,
                replaceType = injectedControl.replaceWith,
                node = isEmpty(replaceType) ? this.$document.createElement('div') :
                    <HTMLElement>this.$document.createElement(replaceType),
                attributes: IObject<string> = {},
                nodeMap = {
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

            var viewportManager = this.$ManagerCacheStatic.read(this.uid);
            viewportManager.children = [];

            var manager = this.$ElementManagerStatic.getInstance();

            manager.initialize(nodeMap, viewportManager, !newControl);

            control = this.controls[0];
            control.navigator = this.navigator;
            this.navigator.navigated(control, parameter, options);

            manager.setUiControlTemplate();
        }

        /**
         * Manages the navigatingFrom lifecycle event for 
         * ViewControls.
         * 
         * @param fromControl The ViewControl being navigated 
         * away from.
         */
        navigateFrom(fromControl: IViewControl) {
            if (isNull(fromControl) || !isFunction(fromControl.navigatingFrom)) {
                return;
            }

            fromControl.navigatingFrom();
        }
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
        navigateFrom(fromControl: IViewControl): void;
    }
}
