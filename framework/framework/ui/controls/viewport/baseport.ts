module plat.ui.controls {
    /**
     * @name Baseport
     * @memberof plat.ui.controls
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * @implements {plat.ui.controls.IBaseport}
     * 
     * @description
     * A {@link plat.ui.TemplateControl|TemplateControl} that acts as a base for all 
     * controls that can interchangeably swap out {@link plat.ui.IBaseViewControl|IBaseViewControls}.
     */
    export class Baseport extends TemplateControl implements IBaseport {
        /**
         * @name $ManagerCache
         * @memberof plat.ui.controls.Baseport
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
         * @name $Document
         * @memberof plat.ui.controls.Baseport
         * @kind property
         * @access public
         * 
         * @type {Document}
         * 
         * @description
         * Reference to the Document injectable.
         */
        $Document: Document = acquire(__Document);
        /**
         * @name $ElementManagerFactory
         * @memberof plat.ui.controls.Baseport
         * @kind property
         * @access public
         * 
         * @type {plat.processing.IElementManagerFactory}
         * 
         * @description
         * Reference to the {@link plat.processing.IElementManagerFactory|IElementManagerFactory} injectable.
         */
        $ElementManagerFactory: processing.IElementManagerFactory = acquire(__ElementManagerFactory);
        /**
         * @name $Animator
         * @memberof plat.ui.controls.Baseport
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
         * @name $Promise
         * @memberof plat.ui.controls.Baseport
         * @kind property
         * @access public
         * 
         * @type {plat.async.IPromise}
         * 
         * @description
         * Reference to the {@link plat.async.IPromise|IPromise} injectable.
         */
        $Promise: async.IPromise = acquire(__Promise);

        /**
         * @name navigator
         * @memberof plat.ui.controls.Baseport
         * @kind property
         * @access public
         * 
         * @type {plat.navigation.IBaseNavigator}
         * 
         * @description
         * The navigator used for navigating between {@link plat.ui.IBaseViewControl|IBaseViewControls}.
         */
        navigator: navigation.IBaseNavigator;

        /**
         * @name _animationPromise
         * @memberof plat.ui.controls.Baseport
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.animations.IAnimationThenable<plat.ui.animations.IParentAnimationFn>}
         * 
         * @description
         * A promise used for disposing the end state of the previous animation prior to starting a new one.
         */
        protected _animationPromise: animations.IAnimationThenable<animations.IGetAnimatingThenable>;

        /**
         * @name constructor
         * @memberof plat.ui.controls.Baseport
         * @kind function
         * @access public
         * 
         * @description
         * The constructor for a {@link plat.ui.controls.Baseport|Baseport}.
         * 
         * @param {plat.navigation.IBaseNavigator} navigator The navigator used for navigating between 
         * {@link plat.ui.IBaseViewControl|IBaseViewControls}.
         * 
         * @returns {plat.ui.controls.Baseport} A {@link plat.ui.controls.Baseport|Baseport} instance.
         */
        constructor(navigator: navigation.IBaseNavigator) {
            super();
            this.navigator = navigator;
        }

        /**
         * @name setTemplate
         * @memberof plat.ui.controls.Baseport
         * @kind function
         * @access public
         * 
         * @description
         * Clears the control element's innerHTML.
         * 
         * @returns {void}
         */
        setTemplate(): void {
            clearNode(this.element);
            this._load();
        }

        /**
         * @name dispose
         * @memberof plat.ui.controls.Baseport
         * @kind function
         * @access public
         * 
         * @description
         * Clean up any memory being held.
         * 
         * @returns {void}
         */
        dispose() {
            this.navigator.dispose();
        }

        /**
         * @name navigateTo
         * @memberof plat.ui.controls.Baseport
         * @kind function
         * @access public
         * 
         * @description
         * Grabs the root of this control's manager 
         * tree, clears it, and initializes the 
         * creation of a new one by kicking off a 
         * navigate.
         * 
         * @param {plat.ui.controls.IBaseportNavigateToOptions} ev The navigation options.
         * 
         * @returns {void}
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
            node.className = 'plat-viewcontrol';
            element.appendChild(node);


            var animationPromise = this._animationPromise;
            if (!isNull(animationPromise)) {
                animationPromise.dispose();
            }

            this._animationPromise = this.$Animator.animate(this.element, __Enter);

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
         * @name backButtonPressed
         * @memberof plat.ui.controls.Baseport
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * Implements the functionality for when the hard backbutton is pressed on a device.
         * 
         * @returns {void}
         */
        backButtonPressed() {
            this.navigator.goBack();
        }

        /**
         * @name navigateFrom
         * @memberof plat.ui.controls.Baseport
         * @kind function
         * @access public
         * 
         * @description
         * Manages the navigatingFrom lifecycle event for 
         * {@link plat.ui.IBaseViewControl|IBaseViewControls}.
         * 
         * @param {plat.ui.IBaseViewControl} fromControl The {@link plat.ui.IBaseViewControl|IBaseViewControl} 
         * being navigated away from.
         * 
         * @returns {plat.animations.IAnimationThenable<plat.ui.animations.IParentAnimationFn>} A promise that 
         * resolves when the current view is done animating away.
         */
        navigateFrom(fromControl: IBaseViewControl): animations.IAnimationThenable<animations.IGetAnimatingThenable> {
            if (isNull(fromControl) || !isFunction(fromControl.navigatingFrom)) {
                return this.$Animator.resolve();
            }

            fromControl.navigatingFrom();

            var animationPromise = this._animationPromise;
            if (!isNull(animationPromise)) {
                animationPromise.dispose();
            }

            return (this._animationPromise = this.$Animator.animate(this.element, __Leave));
        }

        /**
         * @name _load
         * @memberof plat.ui.controls.Baseport
         * @kind function
         * @access protected
         * 
         * @description
         * Initializes the navigator.
         * 
         * @param {any} navigationParameter? A parameter needed 
         * to perform the specified type of navigation.
         * @param {plat.navigation.IBaseNavigationOptions} options? The options 
         * needed on load for the inherited form of navigation.
         * 
         * @returns {void}
         */
        protected _load(navigationParameter?: any, options?: navigation.IBaseNavigationOptions): void {
            var navigator = this.navigator;
            navigator.registerPort(this);
            navigator.navigate(navigationParameter, options);
        }
    }

    /**
     * @name IBaseport
     * @memberof plat.ui.controls
     * @kind interface
     * 
     * @extends {plat.ui.ITemplateControl}
     * 
     * @description
     * Describes an object that acts as a base for all controls that can interchangeably 
     * swap out {@link plat.ui.IBaseViewControl|IBaseViewControls}.
     */
    export interface IBaseport extends ITemplateControl {
        /**
         * @name navigator
         * @memberof plat.ui.controls.IBaseport
         * @kind property
         * @access public
         * 
         * @type {plat.navigation.IBaseNavigator}
         * 
         * @description
         * The navigator used for navigating between {@link plat.ui.IBaseViewControl|IBaseViewControls}.
         */
        navigator: navigation.IBaseNavigator;

        /**
         * @name navigateTo
         * @memberof plat.ui.controls.IBaseport
         * @kind function
         * @access public
         * 
         * @description
         * Grabs the root of this control's manager 
         * tree, clears it, and initializes the 
         * creation of a new one by kicking off a 
         * navigate.
         * 
         * @param {plat.ui.controls.IBaseportNavigateToOptions} ev The navigation options.
         * 
         * @returns {void}
         */
        navigateTo(ev: IBaseportNavigateToOptions): void;

        /**
         * @name navigateFrom
         * @memberof plat.ui.controls.IBaseport
         * @kind function
         * @access public
         * 
         * @description
         * Manages the navigatingFrom lifecycle event for 
         * {@link plat.ui.IBaseViewControl|IBaseViewControls}.
         * 
         * @param {plat.ui.IBaseViewControl} fromControl The {@link plat.ui.IBaseViewControl|IBaseViewControl} 
         * being navigated away from.
         * 
         * @returns {plat.animations.IAnimationThenable<plat.ui.animations.IParentAnimationFn>} A promise that resolves 
         * when the current view is done animating away.
         */
        navigateFrom(fromControl: IBaseViewControl): animations.IAnimationThenable<animations.IGetAnimatingThenable>;

        /**
         * @name backButtonPressed
         * @memberof plat.ui.controls.IBaseport
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * Implements the functionality for when the hard backbutton is pressed on a device.
         * 
         * @returns {void}
         */
        backButtonPressed(): void;
    }

    /**
     * @name IBaseportNavigateToOptions
     * @memberof plat.ui.controls
     * @kind interface
     * 
     * @description
     * Navigation options for a {@link plat.ui.controls.Baseport|Baseport} and all 
     * controls that inherit from {@link plat.ui.controls.Baseport|Baseport}.
     */
    export interface IBaseportNavigateToOptions {
        /**
         * @name target
         * @memberof plat.ui.controls.IBaseportNavigateToOptions
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * Either an {@link plat.ui.IBaseViewControl|IBaseViewControls} or an injector for an 
         * {@link plat.ui.IBaseViewControl|IBaseViewControls} to be used.
         */
        target: any;

        /**
         * @name parameter
         * @memberof plat.ui.controls.IBaseportNavigateToOptions
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * The navigation parameter.
         */
        parameter: any;

        /**
         * @name parameter
         * @memberof plat.ui.controls.IBaseportNavigateToOptions
         * @kind property
         * @access public
         * 
         * @type {plat.navigation.IBaseNavigationOptions}
         * 
         * @description
         * The options used for navigation.
         */
        options: navigation.IBaseNavigationOptions;

        /**
         * @name type
         * @memberof plat.ui.controls.IBaseportNavigateToOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The type of {@link plat.ui.IBaseViewControl|IBaseViewControls} to navigate to.
         */
        type: string;
    }
}
