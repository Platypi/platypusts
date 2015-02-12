module plat {
    'use strict';

    /**
     * @name App
     * @memberof plat
     * @kind class
     * 
     * @description
     * Class for every app. This class contains hooks for Application Lifecycle Events 
     * as well as error handling.
     */
    export class App {
        /**
         * @name app
         * @memberof plat.App
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.App}
         * 
         * @description
         * The instance of the registered {@link plat.App|IApp}.
         */
        static app: App = null;

        /**
         * @name _compat
         * @memberof plat.App
         * @kind property
         * @access protected
         * @static
         * 
         * @type {plat.Compat}
         * 
         * @description
         * Reference to the {@link plat.Compat|Compat} injectable.
         */
        protected static _compat: Compat;

        /**
         * @name _EventManager
         * @memberof plat.App
         * @kind property
         * @access protected
         * @static
         * 
         * @type {plat.events.IEventManagerStatic}
         * 
         * @description
         * Reference to the {@link plat.events.IEventManagerStatic|IEventManagerStatic} injectable.
         */
        protected static _EventManager: events.IEventManagerStatic;

        /**
         * @name _document
         * @memberof plat.App
         * @kind property
         * @access protected
         * @static
         * 
         * @type {Document}
         * 
         * @description
         * Reference to the Document injectable.
         */
        protected static _document: Document;

        /**
         * @name _compiler
         * @memberof plat.App
         * @kind property
         * @access protected
         * @static
         * 
         * @type {plat.processing.Compiler}
         * 
         * @description
         * Reference to the {@link plat.processing.Compiler|Compiler} injectable.
         */
        protected static _compiler: processing.Compiler;

        /**
         * @name _LifecycleEvent
         * @memberof plat.App
         * @kind property
         * @access protected
         * @static
         * 
         * @type {plat.events.ILifecycleEventStatic}
         * 
         * @description
         * Reference to the {@link plat.events.ILifecycleEventStatic|ILifecycleEventStatic} injectable.
         */
        protected static _LifecycleEvent: events.ILifecycleEventStatic;

        /**
         * @name _Exception
         * @memberof plat.App
         * @kind property
         * @access protected
         * @static
         * 
         * @type {plat.IExceptionStatic}
         * 
         * @description
         * Reference to the {@link plat.IExceptionStatic|IExceptionStatic} injectable.
         */
        protected static _Exception: IExceptionStatic;

        /**
         * @name __injector
         * @memberof plat.App
         * @kind property
         * @access private
         * @static
         * 
         * @type {plat.dependency.Injector<plat.App>}
         * 
         * @description
         * The injector for injecting the instance of the currently registered {@link plat.App|IApp}.
         */
        private static __injector: dependency.Injector<App>;

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
        uid: string = uniqueId(__Plat);

        /**
         * @name navigator
         * @memberof plat.App
         * @kind property
         * @access public
         * 
         * @type {plat.routing.Navigator}
         * 
         * @description
         * A Navigator instance, exists when a router is injected into the app.
         */
        navigator: routing.Navigator;

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
            if (!App._compat.isCompatible) {
                var _Exception: IExceptionStatic = App._Exception;
                _Exception.fatal('PlatypusTS only supports modern browsers where ' +
                    'Object.defineProperty is defined', _Exception.COMPAT);
                return;
            }

            App.__addPlatCss();

            var _EventManager = App._EventManager;

            _EventManager.dispose(__APP);
            _EventManager.on(__APP, __ready, App.__ready);
            _EventManager.on(__APP, __shutdown, App.__shutdown);
            _EventManager.initialize();
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
         * @param {plat.dependency.Injector<plat.App>} appInjector The injector for 
         * injecting the app instance.
         * 
         * @returns {void}
         */
        static registerApp(appInjector: dependency.Injector<App>): void {
            if (!isNull(App.app) && isString(App.app.uid)) {
                App._EventManager.dispose(App.app.uid);
            }

            App.__injector = appInjector;

            if (App._compat.amd) {
                var _LifecycleEvent = App._LifecycleEvent,
                    dispatch = _LifecycleEvent.dispatch;

                postpone((): void => {
                    dispatch(__ready, _LifecycleEvent);
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
            var _LifecycleEvent = App._LifecycleEvent,
                _compiler = App._compiler,
                body = App._document.body,
                head = App._document.head;

            _LifecycleEvent.dispatch(__beforeLoad, App);

            if (isNull(node)) {
                body.setAttribute(__Hide, '');
                postpone((): void => {
                    _compiler.compile([head]);
                    _compiler.compile([body]);
                    body.removeAttribute(__Hide);
                });
                return;
            }

            if (isFunction((<Element>node).setAttribute)) {
                (<Element>node).setAttribute(__Hide, '');
                postpone((): void => {
                    _compiler.compile([node]);
                    (<Element>node).removeAttribute(__Hide);
                });
                return;
            }

            postpone((): void => {
                _compiler.compile([node]);
            });
        }

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
         * @param {plat.events.LifecycleEvent} ev The {@link plat.events.LifecycleEvent|LifecycleEvent} for the app ready.
         * 
         * @returns {void}
         */
        private static __ready(ev: events.LifecycleEvent): void {
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
            var app = (<any>navigator).app,
                _LifecycleEvent = App._LifecycleEvent,
                ev: events.DispatchEvent;

            if (!isNull(app) && isFunction(app.exitApp)) {
                ev = _LifecycleEvent.dispatch(__exiting, App);

                if (ev.defaultPrevented) {
                    return;
                }

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
         * A static method called to register all the {@link plat.events.LifecycleEvent|LifecycleEvents} for an app instance.
         * 
         * @returns {void}
         */
        private static __registerAppEvents(ev: events.LifecycleEvent): void {
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
            app.on(__exiting, app.exiting);

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
            var _document = App._document;
            if (App._compat.platCss) {
                return;
            } else if (!isNull(_document.styleSheets) && _document.styleSheets.length > 0) {
                (<CSSStyleSheet>_document.styleSheets[0]).insertRule('[plat-hide] { display: none !important; }', 0);
                return;
            }

            var style = <HTMLStyleElement>document.createElement('style');

            style.textContent = '[plat-hide] { display: none !important; }';
            document.head.appendChild(style);
        }

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
            var navigator: routing.Navigator = this.navigator = acquire(__NavigatorInstance);
            navigator.initialize((<routing.IRouterStatic>acquire(__RouterStatic)).currentRouter());
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
         * @param {plat.events.LifecycleEvent} ev The {@link plat.events.LifecycleEvent|LifecycleEvent} object.
         * 
         * @returns {void}
         */
        suspend(ev: events.LifecycleEvent): void { }

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
         * @param {plat.events.LifecycleEvent} ev The {@link plat.events.LifecycleEvent|LifecycleEvent} object.
         * 
         * @returns {void}
         */
        resume(ev: events.LifecycleEvent): void { }

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
         * @param {plat.events.ErrorEvent<Error>} ev The {@link plat.events.ErrorEvent|ErrorEvent} object.
         * 
         * @returns {void}
         */
        error(ev: events.ErrorEvent<Error>): void { }

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
         * @param {plat.events.LifecycleEvent} ev The {@link plat.events.LifecycleEvent|LifecycleEvent} object.
         * 
         * @returns {void}
         */
        ready(ev: events.LifecycleEvent): void { }

        /**
         * @name exiting
         * @memberof plat.App
         * @kind function
         * @access public
         * @virtual
         * 
         * @description
         * Event fired when the app has been programatically shutdown. This event is cancelable.
         * 
         * @param {plat.events.LifecycleEvent} ev The {@link plat.events.LifecycleEvent|LifecycleEvent} object.
         * 
         * @returns {void}
         */
        exiting(ev: events.LifecycleEvent): void { }

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
         * @param {plat.events.LifecycleEvent} ev The {@link plat.events.LifecycleEvent|LifecycleEvent} object.
         * 
         * @returns {void}
         */
        online(ev: events.LifecycleEvent): void { }

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
         * @param {plat.events.LifecycleEvent} ev The {@link plat.events.LifecycleEvent|LifecycleEvent} object.
         * 
         * @returns {void}
         */
        offline(ev: events.LifecycleEvent): void { }

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
            var _EventManager: events.IEventManagerStatic = App._EventManager || acquire(__EventManagerStatic);
            _EventManager.dispatch(name, this, _EventManager.DIRECT, args);
        }

        /**
         * @name on
         * @memberof plat.App
         * @kind function
         * @access public
         * 
         * @description
         * Registers a listener for a {@link plat.events.DispatchEvent|DispatchEvent}. The listener will be called when 
         * a DispatchEvent is propagating over the app. Any number of listeners can exist for a single event name.
         * 
         * @param {string} name The name of the event, cooinciding with the DispatchEvent name.
         * @param {(ev: plat.events.DispatchEvent, ...args: Array<any>) => void} listener The method called when 
         * the DispatchEvent is fired.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        on(name: string, listener: (ev: events.DispatchEvent, ...args: any[]) => void): IRemoveListener {
            var _EventManager: events.IEventManagerStatic = App._EventManager || acquire(__EventManagerStatic);
            return _EventManager.on(this.uid, name, listener, this);
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
     * The Type for referencing the '_AppStatic' injectable as a dependency.
     */
    export function IAppStatic(
        _compat?: Compat,
        _EventManager?: events.IEventManagerStatic,
        _document?: Document,
        _compiler?: processing.Compiler,
        _LifecycleEvent?: events.ILifecycleEventStatic,
        _Exception?: IExceptionStatic): IAppStatic {
        (<any>App)._compat = _compat;
        (<any>App)._EventManager = _EventManager;
        (<any>App)._document = _document;
        (<any>App)._compiler = _compiler;
        (<any>App)._LifecycleEvent = _LifecycleEvent;
        (<any>App)._Exception = _Exception;
        return App;
    }

    register.injectable(__AppStatic, IAppStatic, [
        __Compat,
        __EventManagerStatic,
        __Document,
        __Compiler,
        __LifecycleEventStatic,
        __ExceptionStatic
    ], __STATIC);

    /**
     * The Type for referencing the '_app' injectable as a dependency.
     */
    export function IApp(_AppStatic?: IAppStatic): App {
        return _AppStatic.app;
    }

    register.injectable(__App, IApp, [__AppStatic], __INSTANCE);

    /**
     * @name IAppStatic
     * @memberof plat
     * @kind interface
     * 
     * @description
     * The external interface for the '_AppStatic' injectable.
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
         * @param {plat.dependency.Injector<plat.App>} appInjector The injector for 
         * injecting the app instance.
         * 
         * @returns {void}
         */
        registerApp(appInjector: dependency.Injector<App>): void;

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
         * @type {plat.App}
         * 
         * @description
         * The instance of the registered {@link plat.App|IApp}.
         */
        app: App;
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
         * @param {any} newValue The new value of the observed property.
         * @param {any} oldValue The previous value of the observed property.
         * 
         * @returns {void}
         */
        (newValue: any, oldValue: any): void;
    }

    /**
     * @name IIdentifierChangedListener
     * @memberof plat
     * @kind interface
     * 
     * @description
     * Defines a function that will be called whenever a property specified by a given identifier has changed.
     */
    export interface IIdentifierChangedListener {
        /**
         * @memberof plat.IIdentifierChangedListener
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * The method signature for {@link plat.IIdentifierChangedListener|IIdentifierChangedListener}.
         * 
         * @param {any} newValue The new value of the observed property.
         * @param {any} oldValue The previous value of the observed property.
         * @param {any} identifier The string or number identifier that specifies the changed property.
         * 
         * @returns {void}
         */
        (newValue: any, oldValue: any, identifier: any): void;
    }
}
