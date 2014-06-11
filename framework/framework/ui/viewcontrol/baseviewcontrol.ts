module plat.ui {
    /**
     * A control used in a controls.Viewport for simulated page navigation. The 
     * control has navigation events that are called when navigating to and from the control.
     */
    export class BaseViewControl extends TemplateControl implements IBaseViewControl {
        /**
         * Detaches a ViewControl. Disposes its children, but does not dispose the ViewControl.
         * Useful for the Navigator when storing the ViewControl in history.
         *  
         * @static
         * @param control The control to be detached.
         */
        static detach(control: IBaseViewControl): void {
            TemplateControl.detach(control);
        }

        /**
         * Recursively disposes a control and its children.
         * 
         * @static
         * @param control A control to dispose.
         */
        static dispose(control: IBaseViewControl): void {
            TemplateControl.dispose(control);
        }

        /**
         * Returns a new instance of ViewControl.
         * 
         * @static
         */
        static getInstance(): IBaseViewControl {
            return new ViewControl();
        }

        /**
         * Specifies that this control will have its own context, and it should not inherit a context.
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
        navigatedTo(parameter?: any): void { }

        /**
         * This event is fired when this control is being navigated away from.
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
     * Creates and manages IViewControls.
     */
    export interface IBaseViewControlFactory {
        /**
         * Detaches a ViewControl. Disposes its children, but does not dispose the ViewControl.
         * Useful for the Navigator when storing the ViewControl in history.
         *
         * @static
         * @param control The control to be detached.
         */
        detach(control: IBaseViewControl): void;

        /**
         * Recursively disposes a control and its children.
         * 
         * @static
         * @param control A control to dispose.
         */
        dispose(control: IBaseViewControl): void;

        /**
         * Returns a new instance of an IViewControl.
         *
         * @static
         */
        getInstance(): IBaseViewControl;
    }

    /**
     * Describes a control used in a viewport for simulated page navigation. The 
     * control has navigation events that are called when navigating to and from the control.
     */
    export interface IBaseViewControl extends ITemplateControl {
        /**
         * Specifies that this control will have its own context, and it should not inherit a context.
         */
        hasOwnContext?: boolean;

        /**
         * Specifies the navigator for this control. Used for navigating to other IViewControls
         * in a controls.Viewport.
         */
        navigator?: navigation.IBaseNavigator;

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
