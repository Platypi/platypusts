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
    export class ViewControl extends TemplateControl implements ISupportNavigation {
        /**
         * @name dispose
         * @memberof plat.ui.ViewControl
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Recursively disposes a {@link plat.ui.ViewControl|ViewControl} and its children.
         * 
         * @param {plat.ui.ViewControl} control A control to dispose.
         * 
         * @returns {void}
         */
        static dispose(control: TemplateControl): void {
            TemplateControl.dispose(control);
        }

        /**
         * @name getInstance
         * @memberof plat.ui.ViewControl
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Returns a new instance of a {@link plat.ui.ViewControl|ViewControl}.
         * 
         * @returns {plat.ui.ViewControl} A new {@link plat.ui.ViewControl|ViewControl} instance.
         */
        static getInstance(): ViewControl {
            return acquire(ViewControl);
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
        }

        navigator: routing.Navigator;

        canNavigateFrom(): any { }

        canNavigateTo(parameters: any, query: any): any { }

        navigatingFrom(): any { }

        navigatedTo(parameters: any, query: any): any { }
    }

    export interface ISupportNavigation {
        navigator?: routing.Navigator;

        canNavigateFrom(): any;
        canNavigateTo (parameters: any, query: any): any;

        navigatingFrom (): any;
        navigatedTo (parameters: any, query: any): any;
    }
}
