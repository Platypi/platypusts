module plat.ui {
    /**
     * @name BaseViewControl
     * @memberof plat.ui
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * @implements {plat.ui.IBaseViewControl}
     * 
     * @description
     * A control used in a {@link plat.ui.controls.IBaseport|IBaseport} for simulated page navigation. The 
     * control has navigation events that are called when navigating to and from the control.
     */
    export class BaseViewControl extends TemplateControl implements IBaseViewControl {
        /**
         * @name detach
         * @memberof plat.ui.BaseViewControl
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Detaches a {@link plat.ui.BaseViewControl|BaseViewControl}. Disposes its children, but does not dispose the 
         * {@link plat.ui.BaseViewControl|BaseViewControl}. Useful for the Navigator when storing the 
         * {@link plat.ui.BaseViewControl|BaseViewControl} in history.
         * 
         * @param {plat.ui.BaseViewControl} control The control to be detached.
         * 
         * @returns {void}
         */
        static detach(control: IBaseViewControl): void {
            TemplateControl.detach(control);
        }

        /**
         * @name dispose
         * @memberof plat.ui.BaseViewControl
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Recursively disposes a {@link plat.ui.BaseViewControl|BaseViewControl} and its children.
         * 
         * @param {plat.ui.BaseViewControl} control A control to dispose.
         * 
         * @returns {void}
         */
        static dispose(control: IBaseViewControl): void {
            TemplateControl.dispose(control);
        }

        /**
         * @name getInstance
         * @memberof plat.ui.BaseViewControl
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Returns a new instance of a {@link plat.ui.BaseViewControl|BaseViewControl}.
         * 
         * @returns {plat.ui.BaseViewControl} A new {@link plat.ui.BaseViewControl|BaseViewControl} instance.
         */
        static getInstance(): IBaseViewControl {
            return new BaseViewControl();
        }

        /**
         * @name hasOwnContext
         * @memberof plat.ui.BaseViewControl
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Specifies that this control will have its own context, and it should not inherit a context.
         */
        hasOwnContext: boolean = true;

        /**
         * @name navigator
         * @memberof plat.ui.BaseViewControl
         * @kind property
         * @access public
         * 
         * @type {plat.navigation.IBaseNavigator}
         * 
         * @description
         * Specifies the navigator for this control. Used for navigating to other {@link plat.ui.IBaseViewControl|IBaseViewControls}
         * in a {plat.ui.controls.IBaseport|IBaseport}.
         */
        navigator: navigation.IBaseNavigator;

        /**
         * @name navigatedTo
         * @memberof plat.ui.BaseViewControl
         * @kind function
         * @access public
         * 
         * @description
         * This event is fired when this control has been navigated to.
         * 
         * @param {any} parameter? A navigation parameter sent from the previous 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl}.
         * 
         * @returns {void}
         */
        navigatedTo(parameter?: any): void { }

        /**
         * @name navigatingFrom
         * @memberof plat.ui.BaseViewControl
         * @kind function
         * @access public
         * 
         * @description
         * This event is fired when this control is being navigated away from.
         * 
         * @returns {void}
         */
        navigatingFrom(): void { }
    }

    /**
     * The Type for referencing the '$ViewControlFactory' injectable as a dependency.
     */
    export function IBaseViewControlFactory(): IBaseViewControlFactory {
        return BaseViewControl;
    }

    register.injectable(__BaseViewControlFactory, IBaseViewControlFactory, null, __FACTORY);

    /**
     * @name IBaseViewControlFactory
     * @memberof plat.ui
     * @kind interface
     * 
     * @description
     * Creates and manages {@link plat.ui.IBaseViewControl|IBaseViewControls}.
     */
    export interface IBaseViewControlFactory {
        /**
         * @name detach
         * @memberof plat.ui.IBaseViewControlFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Detaches a {@link plat.ui.BaseViewControl|BaseViewControl}. Disposes its children, but does not dispose the 
         * {@link plat.ui.BaseViewControl|BaseViewControl}. Useful for the Navigator when storing the 
         * {@link plat.ui.BaseViewControl|BaseViewControl} in history.
         * 
         * @param {plat.ui.BaseViewControl} control The control to be detached.
         * 
         * @returns {void}
         */
        detach(control: IBaseViewControl): void;

        /**
         * @name dispose
         * @memberof plat.ui.IBaseViewControlFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Recursively disposes a {@link plat.ui.BaseViewControl|BaseViewControl} and its children.
         * 
         * @param {plat.ui.BaseViewControl} control A control to dispose.
         * 
         * @returns {void}
         */
        dispose(control: IBaseViewControl): void;

        /**
         * @name getInstance
         * @memberof plat.ui.IBaseViewControlFactory
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Returns a new instance of a {@link plat.ui.BaseViewControl|BaseViewControl}.
         * 
         * @returns {plat.ui.BaseViewControl} A new {@link plat.ui.BaseViewControl|BaseViewControl} instance.
         */
        getInstance(): IBaseViewControl;
    }

    /**
     * @name IBaseViewControl
     * @memberof plat.ui
     * @kind interface
     * 
     * @extends {plat.ui.ITemplateControl}
     * 
     * @description
     * Describes a control used in a {@link plat.ui.controls.IBaseport|IBaseport} for simulated page navigation. The 
     * control has navigation events that are called when navigating to and from the control.
     */
    export interface IBaseViewControl extends ITemplateControl {
        /**
         * @name hasOwnContext
         * @memberof plat.ui.IBaseViewControl
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Specifies that this control will have its own context, and it should not inherit a context.
         */
        hasOwnContext?: boolean;

        /**
         * @name navigator
         * @memberof plat.ui.IBaseViewControl
         * @kind property
         * @access public
         * 
         * @type {plat.navigation.IBaseNavigator}
         * 
         * @description
         * Specifies the navigator for this control. Used for navigating to other {@link plat.ui.IBaseViewControl|IBaseViewControls}
         * in a {plat.ui.controls.IBaseport|IBaseport}.
         */
        navigator?: navigation.IBaseNavigator;

        /**
         * @name navigatedTo
         * @memberof plat.ui.IBaseViewControl
         * @kind function
         * @access public
         * 
         * @description
         * This event is fired when this control has been navigated to.
         * 
         * @param {any} parameter? A navigation parameter sent from the previous 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl}.
         * 
         * @returns {void}
         */
        navigatedTo? (parameter?: any): void;

        /**
         * @name navigatingFrom
         * @memberof plat.ui.IBaseViewControl
         * @kind function
         * @access public
         * 
         * @description
         * This event is fired when this control is being navigated away from.
         * 
         * @returns {void}
         */
        navigatingFrom? (): void;
    }
}
