module plat.ui {
    'use strict';

    /**
     * @name ViewControl
     * @memberof plat.ui
     * @kind class
     * 
     * @extends {plat.ui.BaseViewControl}
     * @implements {plat.ui.ISupportNavigation}
     * 
     * @description
     * A control used in a {@link plat.ui.controls.Viewport|Viewport} for page navigation. The 
     * control has navigation events that are called when navigating to and from the control. A ViewControl 
     * represents a routing component on a page (i.e. a piece of a page that is associated with a particular route). 
     * It has the ability to initiate, approve, and reject navigation to/from itself. A ViewControl also has the 
     * ability to inject a {@link plat.routing.Router|Router} and configure sub-navigation.
     */
    export class ViewControl extends TemplateControl implements ISupportNavigation {
        /**
         * @name hasOwnContext
         * @memberof plat.ui.ViewControl
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
         * @memberof plat.ui.ViewControl
         * @kind property
         * @access public
         * 
         * @type {plat.routing.Navigator}
         * 
         * @description
         * Every ViewControl inside a {@link plat.ui.Viewport|Viewport} will have a navigator. The navigator is linked to 
         * the router for the Viewport containing the ViewControl.
         */
        navigator: routing.Navigator;

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
            return new ViewControl();
        }

        /**
         * @name canNavigateFrom
         * @memberof plat.ui.ViewControl
         * @kind function
         * @access public
         * 
         * @description
         * Allows a ViewControl to asynchronously decide if the app is able to navigate away from the 
         * current view. A possible use of this method might be to popup a confirmation modal. You can 
         * return a boolean or {@link plat.async.IThenable|IThenable<boolean>} to accept/reject navigation.
         * A word of caution, this is a navigation-blocking function. It is best to avoid long-running functions.
         * 
         * @returns {any} Either a boolean or IThenable<boolean> to accept/reject navigation.
         */
        canNavigateFrom(): any { }

        /**
         * @name canNavigateTo
         * @memberof plat.ui.ViewControl
         * @kind function
         * @access public
         * 
         * @description
         * Allows a ViewControl to asynchronously decide if it can be navigated to with the given parameters/query. 
         * You can return a boolean or {@link plat.async.IThenable|IThenable<boolean>} to accept/reject navigation. 
         * A word of caution, this is a navigation-blocking function. It is best to avoid long-running functions.
         * 
         * @returns {any} Either a boolean or IThenable<boolean> to accept/reject navigation.
         */
        canNavigateTo(parameters: any, query: any): any { }

        /**
         * @name navigatingFrom
         * @memberof plat.ui.ViewControl
         * @kind function
         * @access public
         * 
         * @description
         * This method is called when the ViewControl is going out of scope as a result of a navigation.
         * 
         * @returns {any} You can return an IThenable<void> in order to delay navigating from.
         */
        navigatingFrom(): any { }

        /**
         * @name navigatedTo
         * @memberof plat.ui.ViewControl
         * @kind function
         * @access public
         * 
         * @description
         * This method is called when the ViewControl has come into scope as a result of navigation. It can 
         * receive the route parameters and query in order to set its context.
         * 
         * @returns {any}
         */
        navigatedTo(parameters: any, query: any): any { }
    }

    /**
     * @name ISupportNavigation
     * @memberof plat.ui
     * @kind interface
     * 
     * @description
     * A control can implement this interface in order to support app navigation. This means the control can be linked to an 
     * object that implements the {@link plat.routing.ISupportRouteNavigation|ISupportRouteNavigation} interface (e.g. a 
     * {@link plat.ui.controls.Viewport|Viewport}).
     */
    export interface ISupportNavigation {
        /**
         * @name navigator
         * @memberof plat.ui.ISupportNavigation
         * @kind property
         * @access public
         * 
         * @type {plat.routing.Navigator}
         * 
         * @description
         * When a control is linked to a {@link plat.ui.controls.Viewport|Viewport}, it will have a navigator for facilitating 
         * navigation.
         */
        navigator?: routing.Navigator;

        /**
         * @name canNavigateFrom
         * @memberof plat.ui.ISupportNavigation
         * @kind function
         * @access public
         * 
         * @description
         * Allows a control to asynchronously decide if the app is able to navigate away from the 
         * current view. A possible use of this method might be to popup a confirmation modal. You can 
         * return a boolean or {@link plat.async.IThenable|IThenable<boolean>} to accept/reject navigation.
         * A word of caution, this is a navigation-blocking function. It is best to avoid long-running functions.
         * 
         * @returns {any} Either a boolean or IThenable<boolean> to accept/reject navigation.
         */
        canNavigateFrom(): any;

        /**
         * @name canNavigateTo
         * @memberof plat.ui.ISupportNavigation
         * @kind function
         * @access public
         * 
         * @description
         * Allows a control to asynchronously decide if it can be navigated to with the given parameters/query. 
         * You can return a boolean or {@link plat.async.IThenable|IThenable<boolean>} to accept/reject navigation. 
         * A word of caution, this is a navigation-blocking function. It is best to avoid long-running functions.
         * 
         * @returns {any} Either a boolean or IThenable<boolean> to accept/reject navigation.
         */
        canNavigateTo (parameters: any, query: any): any;

        /**
         * @name navigatingFrom
         * @memberof plat.ui.ISupportNavigation
         * @kind function
         * @access public
         * 
         * @description
         * This method is called when the control is going out of scope as a result of a navigation.
         * 
         * @returns {any} You can return an IThenable<void> in order to delay navigating from.
         */
        navigatingFrom(): any;

        /**
         * @name navigatedTo
         * @memberof plat.ui.ISupportNavigation
         * @kind function
         * @access public
         * 
         * @description
         * This method is called when the control has come into scope as a result of navigation. It can 
         * receive the route parameters and query in order to set its context.
         * 
         * @returns {any}
         */
        navigatedTo (parameters: any, query: any): any;
    }
}
