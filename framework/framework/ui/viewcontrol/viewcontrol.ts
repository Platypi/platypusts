module plat.ui {
    /**
     * @name ViewControl
     * @memberof plat.ui
     * @kind class
     * 
     * @extends {plat.ui.BaseViewControl}
     * @implements {plat.ui.IViewControl}
     * 
     * @description
     * A control used in a {@link plat.ui.controls.Viewport|Viewport} for simulated page navigation. The 
     * control has navigation events that are called when navigating to and from the control.
     */
    export class ViewControl extends BaseViewControl implements IViewControl {
        /**
         * @name navigator
         * @memberof plat.ui.ViewControl
         * @kind property
         * @access public
         * 
         * @type {plat.navigation.INavigatorInstance}
         * 
         * @description
         * Specifies the navigator for this control. Used for navigating to other {@link plat.ui.IViewControl|IViewControls} 
         * in a {@link plat.ui.controls.Viewport|Viewport}.
         */
        navigator: navigation.INavigatorInstance;
    }

    /**
     * @name IViewControl
     * @memberof plat.ui
     * @kind interface
     * 
     * @extends {plat.ui.IBaseViewControl}
     * 
     * @description
     * Describes a control used in a {@link plat.ui.controls.Viewport|Viewport} for simulated page navigation. The 
     * control has navigation events that are called when navigating to and from the control.
     */
    export interface IViewControl extends IBaseViewControl {
        /**
         * @name navigator
         * @memberof plat.ui.IViewControl
         * @kind property
         * @access public
         * 
         * @type {plat.navigation.INavigatorInstance}
         * 
         * @description
         * Specifies the navigator for this control. Used for navigating to other {@link plat.ui.IViewControl|IViewControls} 
         * in a {@link plat.ui.controls.Viewport|Viewport}.
         */
        navigator?: navigation.INavigatorInstance;
    }
}
