﻿module plat.navigation {
    /**
     * A class that defines the base Navigation properties and methods.
     */
    export class BaseNavigator implements IBaseNavigator {
        /**
         * A unique identifier used to identify this navigator.
         */
        uid: string;

        /**
         * Every navigator will have a viewport with which to communicate and 
         * facilitate navigation.
         */
        baseport: ui.controls.IBaseport;

        /**
         * Specifies the current state of navigation. This state should contain 
         * enough information for it to be pushed onto the history stack when 
         * necessary.
         */
        currentState: IBaseNavigationState;

        $EventManagerStatic: events.IEventManagerStatic = acquire('$EventManagerStatic');
        $NavigationEventStatic: events.INavigationEventStatic = acquire('$NavigationEventStatic');
        $ExceptionStatic: IExceptionStatic = acquire('$ExceptionStatic');
        $ViewControlStatic: ui.IViewControlStatic = acquire('$ViewControlStatic');
        $ContextManagerStatic: observable.IContextManagerStatic = acquire('$ContextManagerStatic');

        constructor() {
            this.$ContextManagerStatic.defineGetter(this, 'uid', uniqueId('plat_'));
            this.$EventManagerStatic.on(this.uid, 'goBack', this.goBack, this);
        }

        /**
         * Initializes a Navigator. The viewport will call this method and pass itself in so 
         * the navigator can store it and use it to facilitate navigation.
         * 
         * @param baseport The baseport instance this navigator will be attached to.
         */
        initialize(baseport: ui.controls.IBaseport) {
            this.baseport = baseport;
        }

        /**
         * Allows a ui.IViewControl to navigate to another ui.IViewControl. Also allows for
         * navigation parameters to be sent to the new ui.IViewControl.
         * 
         * @param navigationParameter An optional navigation parameter to send to the next ui.IViewControl.
         * @param options Optional IBaseNavigationOptions used for navigation.
         */
        navigate(navigationParameter: any, options: IBaseNavigationOptions) { }

        /**
         * Called by the Viewport to make the Navigator aware of a successful navigation. The Navigator will
         * in-turn call the app.navigated event.
         * 
         * @param control The ui.IViewControl to which the navigation occurred.
         * @param parameter The navigation parameter sent to the control.
         * @param options The INavigationOptions used during navigation.
         */
        navigated(control: ui.IViewControl, parameter: any, options: IBaseNavigationOptions) {
            this.currentState = {
                control: control
            };

            control.navigator = this;
            control.navigatedTo(parameter);

            this._sendEvent('navigated', control, control.type, parameter, options, false);
        }

        /**
         * Every navigator must implement this method, defining what happens when a view 
         * control wants to go back.
         * 
         * @param options Optional backwards navigation options of type IBaseBackNavigationOptions.
         */
        goBack(options?: IBaseBackNavigationOptions) { }

        /**
         * Sends a NavigationEvent with the given parameters.  The 'sender' property of the event will be the 
         * navigator.
         * 
         * @param name The name of the event to send.
         * @param target The target of the event, could be a view control or a route depending upon the navigator and 
         * event name.
         * @param options The IBaseNavigationOptions used during navigation
         * @param cancelable Whether or not the event can be canceled, preventing further navigation.
         */
        _sendEvent(name: string, target: any, type: string, parameter: any,
            options: IBaseNavigationOptions, cancelable: boolean) {
            return this.$NavigationEventStatic.dispatch(name, this, {
                target: target,
                type: type,
                parameter: parameter,
                options: options,
                cancelable: cancelable
            });
        }
    }

    /**
     * Options that you can submit to the navigator in order
     * to customize navigation.
     */
    export interface IBaseNavigationOptions {
        /**
         * Allows a ui.IViewControl to leave itself out of the 
         * navigation history.
         */
        replace?: boolean;
    }

    /**
     * Options that you can submit to the navigator during a backward
     * navigation in order to customize the navigation.
     */
    export interface IBaseBackNavigationOptions {
        /**
         * Lets the Navigator know to navigate back a specific length 
         * in history.
         */
        length?: number;
    }

    /**
     * Defines the base interface needing to be implemented in the history.
     */
    export interface IBaseNavigationState {
        /**
         * The view control associated with a history entry.
         */
        control: ui.IViewControl;
    }

    /**
     * Defines the methods that a Navigator must implement.
     */
    export interface IBaseNavigator {
        /**
         * A unique identifier used to identify this navigator.
         */
        uid: string;

        /**
         * Every navigator will have a viewport with which to communicate and 
         * facilitate navigation.
         */
        baseport: ui.controls.IBaseport;

        /**
         * Specifies the current state of navigation. This state should contain 
         * enough information for it to be pushed onto the history stack when 
         * necessary.
         */
        currentState: IBaseNavigationState;

        /**
         * Initializes a Navigator. The viewport will call this method and pass itself in so 
         * the navigator can store it and use it to facilitate navigation.
         * 
         * @param baseport The baseport instance this navigator will be attached to.
         */
        initialize(baseport: ui.controls.IBaseport): void;

        /**
         * Allows a ui.IViewControl to navigate to another ui.IViewControl. Also allows for
         * navigation parameters to be sent to the new ui.IViewControl.
         * 
         * @param navigationParameter An optional navigation parameter to send to the next ui.IViewControl.
         * @param options Optional IBaseNavigationOptions used for navigation.
         */
        navigate(navigationParameter: any, options?: IBaseNavigationOptions): void;

        /**
         * Called by the Viewport to make the Navigator aware of a successful navigation. The Navigator will
         * in-turn call the app.navigated event.
         * 
         * @param control The ui.IViewControl to which the navigation occurred.
         * @param parameter The navigation parameter sent to the control.
         * @param options The INavigationOptions used during navigation.
         */
        navigated(control: ui.IViewControl, parameter: any, options: IBaseNavigationOptions): void;

        /**
         * Every navigator must implement this method, defining what happens when a view 
         * control wants to go back.
         * 
         * @param options Optional backwards navigation options of type IBaseBackNavigationOptions.
         */
        goBack(options?: IBaseBackNavigationOptions): void;
    }
}
