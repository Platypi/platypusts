module plat.ui {
    /**
     * A control used in a controls.Viewport for simulated page navigation. The 
     * control has navigation events that are called when navigating to and from the control.
     */
    export class ViewControl extends TemplateControl implements IViewControl {
        /**
         * Detaches a ViewControl. Disposes its children, but does not dispose the ViewControl.
         * Useful for the Navigator when storing the ViewControl in history.
         *  
         * @static
         * @param control The control to be detached.
         */
        static detach(control: IViewControl) {
            TemplateControl.detach(control);
        }

        /**
         * Recursively disposes a control and its children.
         * 
         * @static
         * @param control A control to dispose.
         */
        static dispose(control: IViewControl) {
            TemplateControl.dispose(control);
        }

        /**
         * Indicates whether or not this control defines its own context.
         */
        hasOwnContext: boolean = true;

        /**
         * Specifies the navigator for this control. Used for navigating to other IViewControls
         * in a controls.Viewport.
         */
        navigator: navigation.IBaseNavigator;

        /**
         * This event is fired when this control has been navigated to.
         * 
         * @param parameter A navigation parameter sent from the previous IViewControl.
         */
        navigatedTo(parameter?: any) { }

        /**
         * This event is fired when this control is being navigated away from.
         */
        navigatingFrom() { }

        /**
         * A ViewControl is used in a controls.Viewport for simulated page navigation. The 
         * ViewControl has navigation events that are called when navigating to and from the control.
         */
        constructor() { super(); }
    }

    /**
     * The Type for referencing the '$ViewControlStatic' injectable as a dependency.
     */
    export function ViewControlStatic() {
        return ViewControl;
    }

    register.injectable('$ViewControlStatic', ViewControlStatic,
        null, register.injectableType.STATIC);

    /**
     * The external interface for the '$ViewControlStatic' injectable.
     */
    export interface IViewControlStatic {
        /**
         * Detaches a ViewControl. Disposes its children, but does not dispose the ViewControl.
         * Useful for the Navigator when storing the ViewControl in history.
         *
         * @static
         * @param control The control to be detached.
         */
        detach(control: IViewControl): void;

        /**
         * Recursively disposes a control and its children.
         * 
         * @static
         * @param control A control to dispose.
         */
        dispose(control: IViewControl): void;

        /**
         * Create a new empty IViewControl
         */
        new (): IViewControl;
    }

    /**
     * Describes a control used in a controls.Viewport for simulated page navigation. The 
     * control has navigation events that are called when navigating to and from the control.
     */
    export interface IViewControl extends ITemplateControl {
        /**
         * Specifies that this control will have its own context, and it should not inherit a context.
         */
        hasOwnContext: boolean;

        /**
         * Specifies the navigator for this control. Used for navigating to other IViewControls
         * in a controls.Viewport.
         */
        navigator: navigation.IBaseNavigator;

        /**
         * This event is fired when this control has been navigated to.
         * 
         * @param parameter A navigation parameter sent from the previous IViewControl.
         */
        navigatedTo? (parameter?: any): void;

        /**
         * This event is fired when this control is being navigated away from.
         */
        navigatingFrom? (): void;
    }
}
