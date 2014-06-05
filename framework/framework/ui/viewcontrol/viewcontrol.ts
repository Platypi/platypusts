module plat.ui {
    /**
     * A control used in a viewport for simulated page navigation. The 
     * control has navigation events that are called when navigating to and from the control.
     */
    export class ViewControl extends TemplateControl implements IViewControl {
        navigator: navigation.INavigatorInstance;
    }

    /**
     * Describes a control used in a controls.Viewport for simulated page navigation. The 
     * control has navigation events that are called when navigating to and from the control.
     */
    export interface IViewControl extends IBaseViewControl {
        /**
         * Specifies the navigator for this control. Used for navigating to other IViewControls
         * in a viewport.
         */
        navigator?: navigation.INavigatorInstance;
    }
}
