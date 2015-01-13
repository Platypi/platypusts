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
         * @name _compat
         * @memberof plat.App
         * @kind property
         * @access protected
         * @static
         * 
         * @type {plat.ICompat}
         * 
         * @description
         * Reference to the {@link plat.ICompat|ICompat} injectable.
         */
        protected static _compat: ICompat;

        /**
         * @name _EventManagerStatic
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
        protected static _EventManagerStatic: events.IEventManagerStatic;

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
         * @type {plat.processing.ICompiler}
         * 
         * @description
         * Reference to the {@link plat.processing.ICompiler|ICompiler} injectable.
         */
        protected static _compiler: processing.ICompiler;

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

            var _EventManagerStatic = App._EventManagerStatic;

            _EventManagerStatic.dispose(__APP);
            _EventManagerStatic.on(__APP, __ready, App.__ready);
            _EventManagerStatic.on(__APP, __shutdown, App.__shutdown);
            _EventManagerStatic.initialize();
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
                App._EventManagerStatic.dispose(App.app.uid);
            }

            App.__injector = appInjector;

            if (App._compat.amd) {
                var _LifecycleEvent = App._LifecycleEvent,
                    dispatch = _LifecycleEvent.dispatch;

                postpone(() => {
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
                postpone(() => {
                    _compiler.compile(head);
                    _compiler.compile(body);
                    body.removeAttribute(__Hide);
                });
                return;
            }

            if (isFunction((<Element>node).setAttribute)) {
                (<Element>node).setAttribute(__Hide, '');
                postpone(() => {
                    _compiler.compile(node);
                    (<Element>node).removeAttribute(__Hide);
                });
                return;
            }

            _compiler.compile(node);
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
            var _EventManagerStatic: events.IEventManagerStatic = App._EventManagerStatic || acquire(__EventManagerStatic);
            _EventManagerStatic.dispatch(name, this, _EventManagerStatic.DIRECT, args);
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
         * @param {(ev: plat.events.IDispatchEventInstance, ...args: Array<any>) => void} listener The method called when 
         * the DispatchEvent is fired.
         * 
         * @returns {plat.IRemoveListener} A method for removing the listener.
         */
        on(name: string, listener: (ev: events.IDispatchEventInstance, ...args: any[]) => void): IRemoveListener {
            var _EventManagerStatic: events.IEventManagerStatic = App._EventManagerStatic || acquire(__EventManagerStatic);
            return _EventManagerStatic.on(this.uid, name, listener, this);
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
        _compat?: ICompat,
        _EventManagerStatic?: events.IEventManagerStatic,
        _document?: Document,
        _compiler?: processing.ICompiler,
        _LifecycleEvent?: events.ILifecycleEventStatic,
        _Exception?: IExceptionStatic): IAppStatic {
        (<any>App)._compat = _compat;
        (<any>App)._EventManagerStatic = _EventManagerStatic;
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
    export function IApp(_AppStatic?: IAppStatic): IApp {
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
         * @variation 1
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
