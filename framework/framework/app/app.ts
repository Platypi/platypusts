module plat {
    /**
     * @name App
     * @memberof plat
     * @kind class
     * 
     * @implements {plat.IApp}
     * 
     * @description
     * Class for every app. This class contains hooks for Application Lifecycle Events 
     * as well as error handling.
     */
    export class App implements IApp {
        /**
         * @name $Compat
         * @memberof plat.App
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.ICompat}
         * 
         * @description
         * Reference to the {@link plat.ICompat|ICompat} injectable.
         */
        static $Compat: ICompat;

        /**
         * @name $EventManagerStatic
         * @memberof plat.App
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.events.IEventManagerStatic}
         * 
         * @description
         * Reference to the {@link plat.events.IEventManagerStatic|IEventManagerStatic} injectable.
         */
        static $EventManagerStatic: events.IEventManagerStatic;

        /**
         * @name $Document
         * @memberof plat.App
         * @kind property
         * @access public
         * @static
         * 
         * @type {Document}
         * 
         * @description
         * Reference to the Document injectable.
         */
        static $Document: Document;

        /**
         * @name $Compiler
         * @memberof plat.App
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.processing.ICompiler}
         * 
         * @description
         * Reference to the {@link plat.processing.ICompiler|ICompiler} injectable.
         */
        static $Compiler: processing.ICompiler;

        /**
         * @name $LifecycleEventStatic
         * @memberof plat.App
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.events.ILifecycleEventStatic}
         * 
         * @description
         * Reference to the {@link plat.events.ILifecycleEventStatic|ILifecycleEventStatic} injectable.
         */
        static $LifecycleEventStatic: events.ILifecycleEventStatic;

        /**
         * @name start
         * @memberof plat.App
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * A static method for initiating the app startup.
         * 
         * @returns {void}
         */
        static start(): void {
            if (!App.$Compat.isCompatible) {
                var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                $exception.fatal('PlatypusTS only supports modern browsers where ' +
                    'Object.defineProperty is defined', $exception.COMPAT);
                return;
            }

            App.__addPlatCss();

            var $EventManagerStatic = App.$EventManagerStatic;

            $EventManagerStatic.dispose(__APP);
            $EventManagerStatic.on(__APP, __ready, App.__ready);
            $EventManagerStatic.on(__APP, __shutdown, App.__shutdown);
            $EventManagerStatic.initialize();
        }

        /**
         * @name registerApp
         * @memberof plat.App
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * A static method called upon app registration. Primarily used 
         * to initiate a ready state in the case that amd is being used.
         * 
         * @param {plat.dependency.IInjector<plat.IApp>} appInjector The injector for 
         * injecting the app instance.
         * 
         * @returns {void}
         */
        static registerApp(appInjector: dependency.IInjector<IApp>): void {
            if (!isNull(App.app) && isString(App.app.uid)) {
                App.$EventManagerStatic.dispose(App.app.uid);
            }

            App.__injector = appInjector;

            if (App.$Compat.amd) {
                var $LifecycleEventStatic = App.$LifecycleEventStatic,
                    dispatch = $LifecycleEventStatic.dispatch;

                postpone(() => {
                    dispatch(__ready, $LifecycleEventStatic);
                });
            }
        }

        /**
         * @name load
         * @memberof plat.App
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Kicks off compilation of the DOM from the specified node. If no node is specified, 
         * the default start node is document.body.
         * 
         * @param {Node} node The node at which DOM compilation begins.
         * 
         * @returns {void}
         */
        static load(node?: Node): void {
            var $LifecycleEventStatic = App.$LifecycleEventStatic,
                $compiler = App.$Compiler,
                body = App.$Document.body,
                head = App.$Document.head;

            $LifecycleEventStatic.dispatch(__beforeLoad, App);

            if (isNull(node)) {
                body.setAttribute(__Hide, '');
                postpone(() => {
                    $compiler.compile(head);
                    $compiler.compile(body);
                    body.removeAttribute(__Hide);
                });
                return;
            }

            if (isFunction((<Element>node).setAttribute)) {
                (<Element>node).setAttribute(__Hide, '');
                postpone(() => {
                    $compiler.compile(node);
                    (<Element>node).removeAttribute(__Hide);
                });
                return;
            }

            $compiler.compile(node);
        }

        /**
         * @name app
         * @memberof plat.App
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.IApp}
         * 
         * @description
         * The instance of the registered {@link plat.IApp|IApp}.
         */
        static app: IApp = null;
        
        /**
         * @name __injector
         * @memberof plat.App
         * @kind property
         * @access private
         * @static
         * 
         * @type {plat.dependency.IInjector<plat.IApp>}
         * 
         * @description
         * The injector for injecting the instance of the currently registered {@link plat.IApp|IApp}.
         */
        private static __injector: dependency.IInjector<IApp>;

        /**
         * @name __ready
         * @memberof plat.App
         * @kind function
         * @access private
         * @static
         * 
         * @description
         * A static method called when the application is ready. It calls the app instance's 
         * ready function as well as checks for the presence of a module loader. If one exists, 
         * loading the DOM falls back to the app developer. If it doesn't, the DOM is loaded from 
         * document.body.
         * 
         * @param {plat.events.ILifecycleEvent} ev The {@link plat.events.ILifecycleEvent|ILifecycleEvent} for the app ready.
         * 
         * @returns {void}
         */
        private static __ready(ev: events.ILifecycleEvent): void {
            dependency.Injector.initialize();
            App.__registerAppEvents(ev);

            if (!ev.defaultPrevented) {
                App.load();
            }
        }

        /**
         * @name __shutdown
         * @memberof plat.App
         * @kind function
         * @access private
         * @static
         * 
         * @description
         * A static method called when the application wants to programmatically shutdown.
         * 
         * @returns {void}
         */
        private static __shutdown(): void {
            var app = (<any>navigator).app;

            if (!isNull(app) && isFunction(app.exitApp)) {
                app.exitApp();
            }
        }

        /**
         * @name __registerAppEvents
         * @memberof plat.App
         * @kind function
         * @access private
         * @static
         * 
         * @description
         * A static method called to register all the {@link plat.events.ILifecycleEvent|ILifecycleEvents} for an app instance.
         * 
         * @returns {void}
         */
        private static __registerAppEvents(ev: events.ILifecycleEvent): void {
            var appInjector = App.__injector;
            if (isNull(appInjector) || !isFunction(appInjector.inject)) {
                return;
            }

            var app = App.app = appInjector.inject();

            app.on(__suspend, app.suspend);
            app.on(__resume, app.resume);
            app.on(__online, app.online);
            app.on(__offline, app.offline);
            app.on(__error, app.error);

            if (isFunction(app.ready)) {
                app.ready(ev);
            }
        }

        /**
         * @name __addPlatCss
         * @memberof plat.App
         * @kind function
         * @access private
         * @static
         * 
         * @description
         * We need to add [plat-hide] as a css property if platypus.css doesn't exist so we can use it to temporarily 
         * hide elements.
         * 
         * @returns {void}
         */
        private static __addPlatCss(): void {
            var $document = App.$Document;
            if (App.$Compat.platCss) {
                return;
            } else if (!isNull($document.styleSheets) && $document.styleSheets.length > 0) {
                (<CSSStyleSheet>$document.styleSheets[0]).insertRule('[plat-hide] { display: none !important; }', 0);
                return;
            }

            var style = <HTMLStyleElement>document.createElement('style');

            style.textContent = '[plat-hide] { display: none !important; }';
            document.head.appendChild(style);
        }

        /**
         * @name uid
         * @memberof plat.App
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {string}
         * 
         * @description
         * A unique id, created during instantiation.
         */
        uid: string;

        /**
         * @name constructor
         * @memberof plat.App
         * @kind function
         * @access public
         * 
         * @description
         * Class for every app. This class contains hooks for Application Lifecycle Management (ALM)
         * as well as error handling and navigation events.
         * 
         * @returns {plat.App}
         */
        constructor() {
            var ContextManager: observable.IContextManagerStatic = acquire(__ContextManagerStatic);
            ContextManager.defineGetter(this, 'uid', uniqueId(__Plat));
        }

        /**
         * @name suspend
         * @memberof plat.App
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * Event fired when the app is suspended.
         * 
         * @param {plat.events.ILifecycleEvent} ev The {@link plat.events.ILifecycleEvent|ILifecycleEvent} object.
         * 
         * @returns {void}
         */
        suspend(ev: events.ILifecycleEvent): void { }

        /**
         * @name resume
         * @memberof plat.App
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * Event fired when the app resumes from the suspended state.
         * 
         * @param {plat.events.ILifecycleEvent} ev The {@link plat.events.ILifecycleEvent|ILifecycleEvent} object.
         * 
         * @returns {void}
         */
        resume(ev: events.ILifecycleEvent): void { }

        /**
         * @name error
         * @memberof plat.App
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * Event fired when an internal error occures.
         * 
         * @param {plat.events.IErrorEvent<Error>} ev The {@link plat.events.IErrorEvent|IErrorEvent} object.
         * 
         * @returns {void}
         */
        error(ev: events.IErrorEvent<Error>): void { }

        /**
         * @name ready
         * @memberof plat.App
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * Event fired when the app is ready.
         * 
         * @param {plat.events.ILifecycleEvent} ev The {@link plat.events.ILifecycleEvent|ILifecycleEvent} object.
         * 
         * @returns {void}
         */
        ready(ev: events.ILifecycleEvent): void { }

        /**
         * @name online
         * @memberof plat.App
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * Event fired when the app regains connectivity and is now in an online state.
         * 
         * @param {plat.events.ILifecycleEvent} ev The {@link plat.events.ILifecycleEvent|ILifecycleEvent} object.
         * 
         * @returns {void}
         */
        online(ev: events.ILifecycleEvent): void { }

        /**
         * @name offline
         * @memberof plat.App
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * Event fired when the app loses connectivity and is now in an offline state.
         * 
         * @param {plat.events.ILifecycleEvent} ev The {@link plat.events.ILifecycleEvent|ILifecycleEvent} object.
         * 
         * @returns {void}
         */
        offline(ev: events.ILifecycleEvent): void { }

        /**
         * @name dispatchEvent
         * @memberof plat.App
         * @kind function
         * @access public
         * 
         * @description
         * Creates a new {@link plat.events.DispatchEvent|DispatchEvent} and propagates it to all 
         * listeners based on the {@link plat.events.EventManager.DIRECT|DIRECT} method. Propagation 
         * will always start with the sender, so the sender can both produce and consume the same event.
         * 
         * @param {string} name The name of the event to send, cooincides with the name used in the
         * {@link plat.App.on|app.on()} method.
         * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
         * 
         * @returns {void}
         */
        dispatchEvent(name: string, ...args: any[]): void {
            var $EventManagerStatic: events.IEventManagerStatic = App.$EventManagerStatic || acquire(__EventManagerStatic);
            $EventManagerStatic.dispatch(name, this, $EventManagerStatic.DIRECT, args);
        }

        /**
         * @name on
         * @memberof plat.App
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Registers a listener for a beforeNavigate event. The listener will be called when a beforeNavigate 
         * event is propagating over the app. Any number of listeners can exist for a single event name. 
         * This event is cancelable using the {@link plat.events.IDispatchEventInstance.preventDefault|ev.preventDefault()} method, 
         * and thereby preventing the navigation.
         * 
         * @param {string} name='beforeNavigate' The name of the event, cooinciding with the beforeNavigate event.
         * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the beforeNavigate event is fired.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener. 
         */
        on(name: 'beforeNavigate', listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
         * @name on
         * @memberof plat.App
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Registers a listener for a navigating event. The listener will be called when a navigating 
         * event is propagating over the app. Any number of listeners can exist for a single event name. 
         * This event is cancelable using the {@link plat.events.IDispatchEventInstance.preventDefault|ev.preventDefault()} method, 
         * and thereby preventing the navigation.
         * 
         * @param {string} name='navigating' The name of the event, cooinciding with the navigating event.
         * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the navigating 
         * event is fired.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener. 
         */
        on(name: 'navigating', listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
         * @name on
         * @memberof plat.App
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Registers a listener for a navigated event. The listener will be called when a navigated 
         * event is propagating over the app. Any number of listeners can exist for a single event name. 
         * This event is not cancelable.
         * 
         * @param {string} name='navigated' The name of the event, cooinciding with the navigated event.
         * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the navigated 
         * event is fired.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener. 
         */
        on(name: 'navigated', listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
         * @name on
         * @memberof plat.App
         * @kind function
         * @access public
         * @variation 3
         * 
         * @description
         * Registers a listener for a routeChanged event. The listener will be called when a routeChange event 
         * is propagating over the app. Any number of listeners can exist for a single event name.
         * 
         * @param {string} eventName='routeChange' This specifies that the listener is for a routeChange event.
         * @param {(ev: plat.events.INavigationEvent<plat.web.IRoute<any>>) => void} listener The method called 
         * when the routeChange is fired. The route argument will contain a parsed route.
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        on(name: 'routeChanged', listener: (ev: events.INavigationEvent<web.IRoute<any>>) => void): IRemoveListener;
        /**
         * @name on
         * @memberof plat.App
         * @kind function
         * @access public
         * @variation 4
         * 
         * @description
         * Registers a listener for a {@link plat.events.NavigationEvent|NavigationEvent}. The listener will be called 
         * when a NavigationEvent is propagating over the app. Any number of listeners can exist for a single event name.
         * 
         * @param {string} name The name of the event, cooinciding with the {@link plat.events.NavigationEvent|NavigationEvent} name.
         * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the 
         * {@link plat.events.NavigationEvent|NavigationEvent} is fired.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        on(name: string, listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
         * @name on
         * @memberof plat.App
         * @kind function
         * @access public
         * @variation 5
         * 
         * @description
         * Registers a listener for a {@link plat.events.DispatchEvent|DispatchEvent}. The listener will be called when 
         * a DispatchEvent is propagating over the app. Any number of listeners can exist for a single event name.
         * 
         * @param {string} name The name of the event, cooinciding with the DispatchEvent name.
         * @param {(ev: plat.events.IDispatchEventInstance, ...args: Array<any>) => void} listener The method called when 
         * the DispatchEvent is fired.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        on(name: string, listener: (ev: events.IDispatchEventInstance, ...args: any[]) => void): IRemoveListener {
            var $EventManagerStatic: events.IEventManagerStatic = App.$EventManagerStatic || acquire(__EventManagerStatic);
            return $EventManagerStatic.on(this.uid, name, listener, this);
        }

        /**
         * @name load
         * @memberof plat.App
         * @kind function
         * @access public
         * 
         * @description
         * Kicks off compilation of the DOM from the specified node. If no node is specified, 
         * the default start node is document.body. This method should be called from the app when 
         * using module loaders. If a module loader is in use, the app will delay loading until 
         * this method is called.
         * 
         * @param {Node} node The node where at which DOM compilation begins.
         * 
         * @returns {void}
         */
        load(node?: Node): void {
            App.load(node);
        }
    }

    /**
     * The Type for referencing the '$AppStatic' injectable as a dependency.
     */
    export function IAppStatic(
        $Compat?: ICompat,
        $EventManagerStatic?: events.IEventManagerStatic,
        $Document?: Document,
        $Compiler?: processing.ICompiler,
        $LifecycleEventStatic?: events.ILifecycleEventStatic): IAppStatic {
            App.$Compat = $Compat;
            App.$EventManagerStatic = $EventManagerStatic;
            App.$Document = $Document;
            App.$Compiler = $Compiler;
            App.$LifecycleEventStatic = $LifecycleEventStatic;
            return App;
    }

    register.injectable(__AppStatic, IAppStatic, [
        __Compat,
        __EventManagerStatic,
        __Document,
        __Compiler,
        __LifecycleEventStatic
    ], __STATIC);

    /**
     * The Type for referencing the '$App' injectable as a dependency.
     */
    export function IApp($AppStatic?: IAppStatic): IApp {
        return $AppStatic.app;
    }

    register.injectable(__App, IApp, [__AppStatic], __INSTANCE);

    /**
     * @name IAppStatic
     * @memberof plat
     * @kind interface
     * 
     * @description
     * The external interface for the '$AppStatic' injectable.
     */
    export interface IAppStatic {
        /**
         * @name start
         * @memberof plat.IAppStatic
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * A static method for initiating the app startup.
         * 
         * @returns {void}
         */
        start(): void;

        /**
         * @name registerApp
         * @memberof plat.IAppStatic
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * A static methods called upon app registration. Primarily used 
         * to initiate a ready state in the case that amd is being used.
         * 
         * @param {plat.dependency.IInjector<plat.IApp>} appInjector The injector for 
         * injecting the app instance.
         * 
         * @returns {void}
         */
        registerApp(appInjector: dependency.IInjector<IApp>): void;

        /**
         * @name load
         * @memberof plat.IAppStatic
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Kicks off compilation of the DOM from the specified node. If no node is specified,
         * the default start node is document.body.
         * 
         * @param node The node at which DOM compilation begins.
         * 
         * @returns {void}
         */
        load(node?: Node): void;

        /**
         * @name app
         * @memberof plat.IAppStatic
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.IApp}
         * 
         * @description
         * The instance of the registered {@link plat.IApp|IApp}.
         */
        app: IApp;
    }

    /**
     * @name IApp
     * @memberof plat
     * @kind interface
     * 
     * @description
     * An object implementing IApp implements the methods called by the framework to support 
     * Application Lifecycle Management (ALM) as well as error handling and navigation events.
     */
    export interface IApp {
        /**
         * @name uid
         * @memberof plat.IApp
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {string}
         * 
         * @description
         * A unique id, created during instantiation.
         */
        uid: string;

        /**
         * @name suspend
         * @memberof plat.IApp
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * Event fired when the app is suspended.
         * 
         * @param {plat.events.ILifecycleEvent} ev The {@link plat.events.ILifecycleEvent|ILifecycleEvent} object.
         * 
         * @returns {void}
         */
        suspend? (ev: events.ILifecycleEvent): void;

        /**
         * @name resume
         * @memberof plat.IApp
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * Event fired when the app resumes from the suspended state.
         * 
         * @param {plat.events.ILifecycleEvent} ev The {@link plat.events.ILifecycleEvent|ILifecycleEvent} object.
         * 
         * @returns {void}
         */
        resume? (ev: events.ILifecycleEvent): void;

        /**
         * @name error
         * @memberof plat.IApp
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * Event fired when an internal error occures.
         * 
         * @param {plat.events.IErrorEvent} ev The {@link plat.events.IErrorEvent|IErrorEvent} object.
         * 
         * @returns {void}
         */
        error? (ev: events.IErrorEvent<Error>): void;

        /**
         * @name ready
         * @memberof plat.IApp
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * Event fired when the app is ready.
         * 
         * @param {plat.events.ILifecycleEvent} ev The {@link plat.events.ILifecycleEvent|ILifecycleEvent} object.
         * 
         * @returns {void}
         */
        ready? (ev: events.ILifecycleEvent): void;

        /**
         * @name online
         * @memberof plat.IApp
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * Event fired when the app regains connectivity and is now in an online state.
         * 
         * @param {plat.events.ILifecycleEvent} ev The {@link plat.events.ILifecycleEvent|ILifecycleEvent} object.
         * 
         * @returns {void}
         */
        online? (ev: events.ILifecycleEvent): void;

        /**
         * @name offline
         * @memberof plat.IApp
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * Event fired when the app loses connectivity and is now in an offline state.
         * 
         * @param {plat.events.ILifecycleEvent} ev The {@link plat.events.ILifecycleEvent|ILifecycleEvent} object.
         * 
         * @returns {void}
         */
        offline? (ev: events.ILifecycleEvent): void;

        /**
         * @name dispatchEvent
         * @memberof plat.IApp
         * @kind function
         * @access public
         * 
         * @description
         * Creates a new {@link plat.events.DispatchEvent|DispatchEvent} and propagates it to all 
         * listeners based on the {@link plat.events.EventManager.DIRECT|DIRECT} method. Propagation 
         * will always start with the sender, so the sender can both produce and consume the same event.
         * 
         * @param {string} name The name of the event to send, cooincides with the name used in the
         * {@link plat.App.on|app.on()} method.
         * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
         * 
         * @returns {void}
         */
        dispatchEvent(name: string, ...args: any[]): void;

        /**
         * @name on
         * @memberof plat.IApp
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Registers a listener for a beforeNavigate event. The listener will be called when a beforeNavigate 
         * event is propagating over the app. Any number of listeners can exist for a single event name. 
         * This event is cancelable using the {@link plat.events.IDispatchEventInstance.preventDefault|ev.preventDefault()} method, 
         * and thereby preventing the navigation.
         * 
         * @param {string} name='beforeNavigate' The name of the event, cooinciding with the beforeNavigate event.
         * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the beforeNavigate event is fired.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener. 
         */
        on(name: 'beforeNavigate', listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
         * @name on
         * @memberof plat.IApp
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Registers a listener for a navigating event. The listener will be called when a navigating 
         * event is propagating over the app. Any number of listeners can exist for a single event name. 
         * This event is cancelable using the {@link plat.events.IDispatchEventInstance.preventDefault|ev.preventDefault()} method, 
         * and thereby preventing the navigation.
         * 
         * @param {string} name='navigating' The name of the event, cooinciding with the navigating event.
         * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the navigating 
         * event is fired.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener. 
         */
        on(name: 'navigating', listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
         * @name on
         * @memberof plat.IApp
         * @kind function
         * @access public
         * @variation 2
         * 
         * @description
         * Registers a listener for a navigated event. The listener will be called when a navigated 
         * event is propagating over the app. Any number of listeners can exist for a single event name. 
         * This event is not cancelable.
         * 
         * @param {string} name='navigated' The name of the event, cooinciding with the navigated event.
         * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the navigated 
         * event is fired.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener. 
         */
        on(name: 'navigated', listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
         * @name on
         * @memberof plat.IApp
         * @kind function
         * @access public
         * @variation 3
         * 
         * @description
         * Registers a listener for a routeChanged event. The listener will be called when a routeChange event 
         * is propagating over the app. Any number of listeners can exist for a single event name.
         * 
         * @param {string} eventName='routeChange' This specifies that the listener is for a routeChange event.
         * @param {(ev: plat.events.INavigationEvent<plat.web.IRoute<any>>) => void} listener The method called 
         * when the routeChange is fired. The route argument will contain a parsed route.
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        on(name: 'routeChanged', listener: (ev: events.INavigationEvent<web.IRoute<any>>) => void): IRemoveListener;
        /**
         * @name on
         * @memberof plat.IApp
         * @kind function
         * @access public
         * @variation 4
         * 
         * @description
         * Registers a listener for a {@link plat.events.NavigationEvent|NavigationEvent}. The listener will be called 
         * when a NavigationEvent is propagating over the app. Any number of listeners can exist for a single event name.
         * 
         * @param {string} name The name of the event, cooinciding with the {@link plat.events.NavigationEvent|NavigationEvent} name.
         * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the 
         * {@link plat.events.NavigationEvent|NavigationEvent} is fired.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        on(name: string, listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
         * @name on
         * @memberof plat.IApp
         * @kind function
         * @access public
         * @variation 5
         * 
         * @description
         * Registers a listener for a {@link plat.events.DispatchEvent|DispatchEvent}. The listener will be called when 
         * a DispatchEvent is propagating over the app. Any number of listeners can exist for a single event name.
         * 
         * @param {string} name The name of the event, cooinciding with the DispatchEvent name.
         * @param {(ev: plat.events.IDispatchEventInstance, ...args: Array<any>) => void} listener The method called when 
         * the DispatchEvent is fired.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        on(name: string, listener: (ev: events.IDispatchEventInstance, ...args: any[]) => void): IRemoveListener;

        /**
         * @name load
         * @memberof plat.IApp
         * @kind function
         * @access public
         * 
         * @description
         * Kicks off compilation of the DOM from the specified node. If no node is specified, 
         * the default start node is document.body. This method should be called from the app when 
         * using module loaders. If a module loader is in use, the app will delay loading until 
         * this method is called.
         * 
         * @param {Node} node The node where at which DOM compilation begins.
         * 
         * @returns {void}
         */
        load(node?: Node): void;
    }

    /**
     * @name IObject
     * @memberof plat
     * @kind interface
     * 
     * @description
     * Interface for an object where every key has the same typed value.
     * 
     * @typeparam {any} T The type of each value in the object.
     */
    export interface IObject<T> {
        /**
         * @name [key: string]
         * @memberof plat.IObject
         * @kind property
         * @access public
         * @static
         * 
         * @type {T}
         * 
         * @description
         * Every key must be of type T
         */
        [key: string]: T
    }

    /**
     * @name IRemoveListener
     * @memberof plat
     * @kind interface
     * 
     * @description
     * Defines a function that will halt further callbacks to a listener.
     * Equivalent to `() => void`.
     */
    export interface IRemoveListener {
        /**
         * @memberof plat.IRemoveListener
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * The method signature for {@link plat.IRemoveListener|IRemoveListener}.
         * 
         * @returns {void}
         */
        (): void;
    }

    /**
     * @name IPropertyChangedListener
     * @memberof plat
     * @kind interface
     * 
     * @description
     * Defines a function that will be called whenever a property has changed.
     */
    export interface IPropertyChangedListener {
        /**
         * @memberof plat.IPropertyChangedListener
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * The method signature for {@link plat.IPropertyChangedListener|IPropertyChangedListener}.
         * 
         * @param {any} newValue? The new value of the observed property.
         * @param {any} oldValue? The previous value of the observed property.
         * 
         * @returns {void}
         */
        (newValue?: any, oldValue?: any): void;
    }
}
