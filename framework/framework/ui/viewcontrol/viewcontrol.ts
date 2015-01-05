module plat.ui {
    'use strict';

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

        /**
         * @name constructor
         * @memberof plat.ui.ViewControl
         * @kind function
         * @access public
         * 
         * @description
         * Initializes any events that you might use in the ViewControl. Automatically subscribes to 'backButtonPressed' when 
         * you implement a backButtonPressed function.
         * 
         * @returns {plat.ui.ViewControl}
         */
        constructor() {
            super();
            var backButtonPressed = (<any>this)[__backButtonPressed];

            if (isFunction(backButtonPressed)) {
                this.on(__backButtonPressed, backButtonPressed);
            }
        }
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

        /**
         * @name backButtonPressed
         * @memberof plat.ui.IViewControl
         * @kind function
         * @access public
         * @virtual
         * 
         * @type {plat.navigation.INavigatorInstance}
         * 
         * @description
         * Called when the hard-back button is pressed on a device. Allows you to 
         * consume the event and prevent the navigator from navigating back if 
         * necessary.
         * 
         * @remarks
         * If you want to prevent the navigator from navigating back during this event, 
         * you can use ev.stopPropagation().
         */
        backButtonPressed? (ev: plat.events.IDispatchEventInstance): void;

        canNavigateFrom? (): any;

        canNavigateTo? (parameters: {}, query: {}): any;
    }
}
