/**
 * @name navigation
 * @memberof plat
 * @kind namespace
 * @access public
 * 
 * @description
 * Holds classes and interfaces related to navigation in platypus.
 */
module plat.navigation {
    /**
     * @name BaseNavigator
     * @memberof plat.navigation
     * @kind class
     * 
     * @implements {plat.navigation.IBaseNavigator}
     * 
     * @description
     * A class that defines the base navigation properties and methods.
     */
    export class BaseNavigator implements IBaseNavigator {
        /**
         * @name $EventManagerStatic
         * @memberof plat.navigation.BaseNavigator
         * @kind property
         * @access public
         * 
         * @type {plat.events.IEventManagerStatic}
         * 
         * @description
         * Reference to the {@link plat.events.IEventManagerStatic|IEventManagerStatic} injectable.
         */
        $EventManagerStatic: events.IEventManagerStatic = acquire(__EventManagerStatic);

        /**
         * @name $NavigationEventStatic
         * @memberof plat.navigation.BaseNavigator
         * @kind property
         * @access public
         * 
         * @type {plat.events.INavigationEventStatic}
         * 
         * @description
         * Reference to the {@link plat.events.INavigationEventStatic|INavigationEventStatic} injectable.
         */
        $NavigationEventStatic: events.INavigationEventStatic = acquire(__NavigationEventStatic);

        /**
         * @name $BaseViewControlFactory
         * @memberof plat.navigation.BaseNavigator
         * @kind property
         * @access public
         * 
         * @type {plat.ui.IBaseViewControlFactory}
         * 
         * @description
         * Reference to the {@link plat.ui.IBaseViewControlFactory|IBaseViewControlFactory} injectable.
         */
        $BaseViewControlFactory: ui.IBaseViewControlFactory = acquire(__BaseViewControlFactory);

        /**
         * @name $ContextManagerStatic
         * @memberof plat.navigation.BaseNavigator
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IContextManagerStatic}
         * 
         * @description
         * Reference to the {@link plat.observable.IContextManagerStatic|IContextManagerStatic} injectable.
         */
        $ContextManagerStatic: observable.IContextManagerStatic = acquire(__ContextManagerStatic);

        /**
         * @name uid
         * @memberof plat.navigation.BaseNavigator
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {string}
         * 
         * @description
         * A unique ID used to identify this navigator.
         */
        uid: string;

        /**
         * @name navigating
         * @memberof plat.navigation.BaseNavigator
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Set to true during "navigate" (i.e. while navigation is in progress), set to false during 
         * "navigated" (i.e. after a navigation has successfully occurred).
         */
        navigating: boolean;

        /**
         * @name constructor
         * @memberof plat.navigation.BaseNavigator
         * @kind function
         * @access public
         * 
         * @description
         * The constructor for a {@link plat.navigation.BaseNavigator|BaseNavigator}. 
         * Defines a unique id and subscribes to the "goBack" event.
         * 
         * @returns {plat.navigation.BaseNavigator}
         */
        constructor() {
            var uid = uniqueId(__Plat);
            this.$ContextManagerStatic.defineGetter(this, 'uid', uid);
            this.$EventManagerStatic.on(uid, __backButton, this.backButtonPressed, this);
        }
        
        /**
         * @name registerPort
         * @memberof plat.navigation.BaseNavigator
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * Registers an {plat.ui.controls.IBaseport|IBaseport} with this navigator. The IBaseport will call this method and pass 
         * itself in so the navigator can store it and use it to facilitate navigation. Every navigator must implement this method 
         * in order to store the baseport.
         * 
         * @param {plat.ui.controls.IBaseport} baseport The {plat.ui.controls.IBaseport|IBaseport} 
         * associated with this {@link plat.navigation.IBaseNavigator|IBaseNavigator}.
         * 
         * @returns {void}
         */
        registerPort(baseport: ui.controls.IBaseport): void { }
        
        /**
         * @name navigate
         * @memberof plat.navigation.BaseNavigator
         * @kind function
         * @access public
         * 
         * @description
         * Allows an {@link plat.ui.IBaseViewControl|IBaseViewControl} to navigate to another 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl}. Also allows for
         * navigation parameters to be sent to the new {@link plat.ui.IBaseViewControl|IBaseViewControl}.
         * 
         * @param {any} navigationParameter? An optional navigation parameter to send to the next 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl}.
         * @param {plat.navigation.IBaseNavigationOptions} options? Optional 
         * {@link plat.navigation.IBaseNavigationOptions|IBaseNavigationOptions} used for navigation.
         * 
         * @returns {void}
         */
        navigate(navigationParameter?: any, options?: IBaseNavigationOptions): void {
            this.navigating = true;
        }
        
        /**
         * @name navigated
         * @memberof plat.navigation.BaseNavigator
         * @kind function
         * @access public
         * 
         * @description
         * Called by the {plat.ui.controls.IBaseport|IBaseport} to make the 
         * {@link plat.navigation.IBaseNavigator|IBaseNavigator} aware of a successful 
         * navigation. The {@link plat.navigation.IBaseNavigator|IBaseNavigator} will 
         * in-turn send the app.navigated event.
         * 
         * @param {plat.ui.IBaseViewControl} control The {@link plat.ui.IBaseViewControl|IBaseViewControl} 
         * to which the navigation occurred.
         * @param {any} parameter The navigation parameter sent to the control.
         * @param {plat.navigation.IBaseNavigationOptions} options The 
         * {@link plat.navigation.IBaseNavigationOptions|IBaseNavigationOptions} used during navigation.
         * 
         * @returns {void}
         */
        navigated(control: ui.IBaseViewControl, parameter: any, options: IBaseNavigationOptions): void {
            this.navigating = false;
            control.navigator = this;
            control.navigatedTo(parameter);

            this._sendEvent(__navigated, control, control.type, parameter, options);
        }
        
        /**
         * @name goBack
         * @memberof plat.navigation.BaseNavigator
         * @kind function
         * @access public
         * 
         * @description
         * Every navigator must implement this method, defining what happens when an 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl} wants to go back.
         * 
         * @param {plat.navigation.IBaseBackNavigationOptions} options? Optional backwards navigation options of type 
         * {@link plat.navigation.IBaseBackNavigationOptions|IBaseBackNavigationOptions}.
         * 
         * @returns {void}
         */
        goBack(options?: IBaseBackNavigationOptions): void { }

        /**
         * @name backButtonPressed
         * @memberof plat.navigation.BaseNavigator
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * Every navigator can implement this method, defining what happens when the hard back button has been pressed 
         * on a device. By default this method will call the goBack method.
         * 
         * @returns {void}
         */
        backButtonPressed(): void {
            this.goBack();
        }

        /**
         * @name dispose
         * @memberof plat.navigation.BaseNavigator
         * @kind function
         * @access public
         * 
         * @description
         * Cleans up memory.
         * 
         * @returns {void}
         */
        dispose(): void { }
        
        /**
         * @name _sendEvent
         * @memberof plat.navigation.BaseNavigator
         * @kind function
         * @access protected
         * 
         * @description
         * Sends an {@link plat.events.INavigationEvent|INavigationEvent} with the given parameters. 
         * The 'sender' property of the event will be this navigator.
         * 
         * @param {string} name The name of the event to send.
         * @param {any} target The target of the event, could be an {@link plat.ui.IBaseViewControl|IBaseViewControl} 
         * or a route depending upon this navigator and event name.
         * @param {plat.navigation.IBaseNavigationOptions} options The 
         * {@link plat.navigation.IBaseNavigationOptions|IBaseNavigationOptions} used during navigation
         * 
         * @returns {plat.events.INavigationEvent<any>} The {@link plat.events.INavigationEvent|INavigationEvent} to 
         * dispatch.
         */
        protected _sendEvent(name: string, target: any, type: string, parameter: any,
            options: IBaseNavigationOptions): events.INavigationEvent<any> {
            return this.$NavigationEventStatic.dispatch(name, this, {
                target: target,
                type: type,
                parameter: parameter,
                options: options
            });
        }
    }

    /**
     * @name IBaseNavigator
     * @memberof plat.navigation
     * @kind interface
     * 
     * @description
     * Defines the methods that a type of navigator must implement.
     */
    export interface IBaseNavigator {
        /**
         * @name uid
         * @memberof plat.navigation.IBaseNavigator
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {string}
         * 
         * @description
         * A unique ID used to identify this navigator.
         */
        uid: string;

        /**
         * @name navigating
         * @memberof plat.navigation.IBaseNavigator
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Set to true during "navigate" (i.e. while navigation is in progress), set to false during 
         * "navigated" (i.e. after a navigation has successfully occurred).
         */
        navigating: boolean;

        /**
         * @name registerPort
         * @memberof plat.navigation.IBaseNavigator
         * @kind function
         * @access public
         * 
         * @description
         * Registers an {plat.ui.controls.IBaseport|IBaseport} with this navigator. The IBaseport will call this method and pass 
         * itself in so the navigator can store it and use it to facilitate navigation.
         * 
         * @param {plat.ui.controls.IBaseport} baseport The {plat.ui.controls.IBaseport|IBaseport} 
         * associated with this {@link plat.navigation.IBaseNavigator|IBaseNavigator}.
         * 
         * @returns {void}
         */
        registerPort(baseport: ui.controls.IBaseport): void;

        /**
         * @name navigate
         * @memberof plat.navigation.IBaseNavigator
         * @kind function
         * @access public
         * 
         * @description
         * Allows an {@link plat.ui.IBaseViewControl|IBaseViewControl} to navigate to another 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl}. Also allows for
         * navigation parameters to be sent to the new {@link plat.ui.IBaseViewControl|IBaseViewControl}.
         * 
         * @param {any} navigationParameter? An optional navigation parameter to send to the next 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl}.
         * @param {plat.navigation.IBaseNavigationOptions} options? Optional 
         * {@link plat.navigation.IBaseNavigationOptions|IBaseNavigationOptions} used for navigation.
         * 
         * @returns {void}
         */
        navigate(navigationParameter?: any, options?: IBaseNavigationOptions): void;

        /**
         * @name navigated
         * @memberof plat.navigation.IBaseNavigator
         * @kind function
         * @access public
         * 
         * @description
         * Called by the {plat.ui.controls.IBaseport|IBaseport} to make the 
         * {@link plat.navigation.IBaseNavigator|IBaseNavigator} aware of a successful 
         * navigation. The {@link plat.navigation.IBaseNavigator|IBaseNavigator} will 
         * in-turn send the app.navigated event.
         * 
         * @param {plat.ui.IBaseViewControl} control The {@link plat.ui.IBaseViewControl|IBaseViewControl} 
         * to which the navigation occurred.
         * @param {any} parameter The navigation parameter sent to the control.
         * @param {plat.navigation.IBaseNavigationOptions} options The 
         * {@link plat.navigation.IBaseNavigationOptions|IBaseNavigationOptions} used during navigation.
         * 
         * @returns {void}
         */
        navigated(control: ui.IBaseViewControl, parameter: any, options: IBaseNavigationOptions): void;

        /**
         * @name goBack
         * @memberof plat.navigation.IBaseNavigator
         * @kind function
         * @access public
         * 
         * @description
         * Every navigator must implement this method, defining what happens when an 
         * {@link plat.ui.IBaseViewControl|IBaseViewControl} wants to go back.
         * 
         * @param {plat.navigation.IBaseBackNavigationOptions} options? Optional backwards navigation options of type 
         * {@link plat.navigation.IBaseBackNavigationOptions|IBaseBackNavigationOptions}.
         * 
         * @returns {void}
         */
        goBack(options?: IBaseBackNavigationOptions): void;

        /**
         * @name backButtonPressed
         * @memberof plat.navigation.IBaseNavigator
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * Every navigator can implement this method, defining what happens when the hard back button has been pressed 
         * on a device. By default this method will call the goBack method.
         * 
         * @returns {void}
         */
        backButtonPressed(): void;

        /**
         * @name dispose
         * @memberof plat.navigation.IBaseNavigator
         * @kind function
         * @access public
         * 
         * @description
         * Cleans up memory.
         * 
         * @returns {void}
         */
        dispose(): void;
    }
    
    /**
     * @name IBaseNavigationOptions
     * @memberof plat.navigation
     * @kind interface
     * 
     * @description
     * Options that you can submit to an {@link plat.navigation.IBaseNavigator|IBaseNavigator} in order 
     * to customize navigation.
     */
    export interface IBaseNavigationOptions {
        /**
         * @name replace
         * @memberof plat.navigation.IBaseNavigationOptions
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Allows an {@link plat.ui.IBaseViewControl|IBaseViewControl} to leave itself out of the 
         * navigation history.
         */
        replace?: boolean;
    }
    
    /**
     * @name IBaseBackNavigationOptions
     * @memberof plat.navigation
     * @kind interface
     * 
     * @description
     * Options that you can submit to an {@link plat.navigation.IBaseNavigator|IBaseNavigator} during a backward
     * navigation in order to customize the navigation.
     */
    export interface IBaseBackNavigationOptions {
        /**
         * @name length
         * @memberof plat.navigation.IBaseBackNavigationOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * Lets the {@link plat.navigation.IBaseNavigator|IBaseNavigator} know to navigate back a specific length 
         * in history.
         */
        length?: number;
    }
}
