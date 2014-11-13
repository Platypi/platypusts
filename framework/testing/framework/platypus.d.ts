/**
 * PlatypusTS v0.9.5 (http://getplatypi.com)
 * Copyright 2014 Platypi, LLC. All rights reserved.
 * PlatypusTS is licensed under the GPL-3.0 found at
 * http://opensource.org/licenses/GPL-3.0
 */
/**
 * The entry point into the platypus library.
 */
declare module plat {
    /**
     * Holds all the classes and interfaces related to registering components for platypus.
     */
    module register {
        /**
         * Registers the IApp with the framework. The framework will instantiate the IApp
         * when needed, and wire up the Application Lifecycle events. The dependencies array corresponds to injectables that will be
         * passed into the Constructor of the app.
         * @param {string} name The name of your app.
         * @param {new (...args: any[]) => plat.IApp} Type The constructor for the IApp.
         * @param {Array<any>} dependencies? An array of strings representing the dependencies needed for the app injector.
         */
        function app(name: string, Type: new(...args: any[]) => IApp, dependencies?: any[]): typeof register;
        /**
         * Registers an IControl with the framework. The framework will instantiate the
         * IControl when needed. The dependencies array corresponds to injectables that
         * will be passed into the Constructor of the control.
         * @param {string} name The control type, corresponding to the HTML notation for creating a new IControl (e.g. 'plat-foreach').
         * @param {new (...args: any[]) => plat.IControl} Type The constructor for the IControl.
         * @param {Array<any>} dependencies? An array of strings representing the dependencies needed for the IControl
         * injector.
         */
        function control(name: string, Type: new(...args: any[]) => IControl, dependencies?: any[]): typeof register;
        /**
         * Registers an IViewControl with the framework. The framework will
         * instantiate the control when needed. The dependencies array corresponds to injectables that will be
         * passed into the Constructor of the control.
         * @param {string} name The control type, corresponding to the HTML notation for creating a new
         * IViewControl. Used for navigation to the specified IViewControl.
         * @param {new (...args: any[]) => plat.ui.IViewControl} Type The constructor for the IViewControl.
         * @param {Array<any>} dependencies? An optional array of strings representing the dependencies needed for the
         * IViewControl injector.
         */
        function viewControl(name: string, Type: new(...args: any[]) => ui.IViewControl, dependencies?: any[]): typeof register;
        /**
         * Registers an WebViewControl with the framework. The framework will instantiate the
         * control when needed. The dependencies array corresponds to injectables that will be passed into the Constructor of the control.
         * @param {string} name The control type, corresponding to the HTML notation for creating a new
         * WebViewControl. Used for navigation to the specified WebViewControl.
         * @param {new (...args: any[]) => ui.IWebViewControl} Type The constructor for the WebViewControl.
         * @param {Array<any>} dependencies? An optional array of strings representing the dependencies needed for the
         * WebViewControl injector.
         * @param {Array<any>} routes? Optional route strings (or regular expressions) used for matching a URL to the
         * registered WebViewControl.
         */
        function viewControl(name: string, Type: new(...args: any[]) => ui.IWebViewControl, dependencies: any[], routes: any[]): typeof register;
        /**
         * Registers an injectable with the framework. Injectables are objects that can be used for dependency injection into other objects.
         * The dependencies array corresponds to injectables that will be passed into the Constructor of the injectable.
         * @param {string} name The name of the injector, used when another component is specifying dependencies.
         * @param {new (...args: any[]) => any} Type The constructor for the injectable. The injectable will only be
         * instantiated once during the application lifetime.
         * @param {Array<any>} dependencies? An array of strings representing the dependencies needed for the injectable's injector.
         * @param {string} injectableType? Specifies the type of injectable, either SINGLETON,
         * STATIC, INSTANCE,
         * FACTORY, CLASS
         * (defaults to SINGLETON).
         * plat.register.injectable('$CacheFactory', [plat.expressions.IParser], Cache);
         * plat.register.injectable('database', MyDatabase, null, plat.register.injectable.INSTANCE);
         */
        function injectable(name: string, Type: new(...args: any[]) => any, dependencies?: any[], injectableType?: string): typeof register;
        /**
         * Registers an injectable with the framework. Injectables are objects that can be used for dependency injection into other objects.
         * The dependencies array corresponds to injectables that will be passed into the Constructor of the injectable.
         * @param {string} name The name of the injector, used when another component is specifying dependencies.
         * @param {(...args: any[]) => any} method A method that returns the injectable.
         * @param {Array<any>} dependencies? An array of strings representing the dependencies needed for the injectable's injector.
         * @param {string} injectableType? Specifies the type of injectable, either SINGLETON,
         * STATIC, INSTANCE,
         * FACTORY, CLASS
         * (defaults to SINGLETON).
         * plat.register.injectable('$CacheFactory', [plat.expressions.IParser],
         *     function(parser: plat.expressions.IParser) { return { ... }; });
         * plat.register.injectable('database', function() { return new Database(); }, null, register.injectable.INSTANCE);
         */
        function injectable(name: string, method: (...args: any[]) => any, dependencies?: any[], injectableType?: string): typeof register;
        /**
         * Contains constants for injectable type.
         */
        module injectable {
            /**
             * Static injectables will be injected before the application loads. This provides a way to create
             * a static constructor and load dependencies into static class properties.
             */
            var STATIC: string;
            /**
             * Singleton injectables will contain a constructor. A Singleton injectable will be instantiated once and
             * used throughout the application lifetime. It will be instantiated when another component is injected
             * and lists it as a dependency.
             */
            var SINGLETON: string;
            /**
             * Instance injectables will contain a constructor. An Instance injectable will be instantiated multiple times
             * throughout the application lifetime. It will be instantiated whenever another component is injected
             * and lists it as a dependency.
             */
            var INSTANCE: string;
            /**
             * Factory injectables will not contain a constructor but will instead contain a method for obtaining an
             * instance, such as getInstance() or create(). It will be injected before the application loads, similar to a Static
             * injectable.
             */
            var FACTORY: string;
            /**
             * Class injectables are essentially a direct reference to a class's constructor. It may contain both
             * static and instance methods as well as a constructor for creating a new instance.
             */
            var CLASS: string;
        }
        /**
         * Adds a CSS animation denoted by its name. If you wish to also support legacy browsers, make sure to register a
         * JS implementation as well.
         * @param {string} name The unique idenitifer of the animation.
         * @param {new (...args: any[]) => plat.ui.animations.ICssAnimation} Type The constructor for the custom animation.
         * @param {Array<any>} dependencies? Any dependencies that need to be injected into the animation at
         * instantiation.
         * @param {string} animationType The type of animation. Both the intended type and default value are
         * CSS.
         */
        function animation(name: string, Type: new(...args: any[]) => ui.animations.ICssAnimation, dependencies?: any[], animationType?: 'css'): typeof register;
        function animation(name: string, Type: new(...args: any[]) => ui.animations.ICssAnimation, dependencies?: any[], animationType?: string): typeof register;
        /**
         * Adds a JS animation denoted by its name. If  Intended to be used when JS animation implementations for legacy browsers
         * is desired.
         * @param {string} name The unique idenitifer of the animation.
         * @param {new (...args: any[]) => plat.ui.animations.IJsAnimation} Type The constructor for the custom animation.
         * @param {Array<any>} dependencies? Any dependencies that need to be injected into the animation at
         * instantiation.
         * @param {string} animationType The type of animation. Both the intended type and default value are
         * JS.
         */
        function animation(name: string, Type: new(...args: any[]) => ui.animations.IJsAnimation, dependencies: any[], animationType: 'js'): typeof register;
        function animation(name: string, Type: new(...args: any[]) => ui.animations.IJsAnimation, dependencies: any[], animationType: string): typeof register;
        /**
         * Contains constants for animation type.
         */
        module animation {
            /**
             * A CSS animation.
             */
            var CSS: string;
            /**
             * A JavaScript animation.
             */
            var JS: string;
        }
    }
    /**
     * Holds classes and interfaces related to dependency injection components in platypus.
     */
    module dependency {
        /**
         * The Injector class is used for dependency injection. You can create an injector object,
         * specify dependencies and a constructor for your component. When the injector object is
         * 'injected' it will create a new instance of your component and pass in the dependencies
         * to the constructor.
         */
        class Injector<T> implements IInjector<T> {
            public name: string;
            public Constructor: new() => T;
            public type: string;
            /**
             * Initializes all static injectors.
             */
            static initialize(): void;
            /**
             * Gathers and returns the array of listed dependencies.
             * @param {Array<any>} dependencies The array of dependencies specified
             * by either their Constructor or their registered name.
             */
            static getDependencies(dependencies: any[]): IInjector<any>[];
            /**
             * Finds and returns the dependency.
             * @param {any} dependency an object/string used to find the dependency.
             */
            static getDependency(dependency: any): IInjector<any>;
            /**
             * Converts dependencies specified by their Constructors into
             * equivalent dependencies specified by their registered string
             * name.
             * @param {Array<any>} dependencies The array of dependencies specified
             * by either their Constructor or their registered name.
             */
            static convertDependencies(dependencies: any[]): string[];
            /**
             * Checks if the object being passed in fulfills the requirements for being an Injector.
             * @param {plat.dependency.Injector<any>} dependency The object to check.
             */
            static isInjector(dependency: Injector<any>): boolean;
            /**
             * Gets the string name related to an injector.
             * @param {any} dependency The object to search for.
             */
            private static __getInjectorName(dependency);
            /**
             * Calls the injector's constructor with the associated dependencies.
             * @param {any} Constructor The Constructor to call.
             * @param {Array<any>} args The arguments to pass to the constructor.
             */
            private static __construct(Constructor, args);
            /**
             * Finds an injector object with the associated constructor.
             * @param {any} Constructor The Constructor to locate.
             */
            private static __locateInjector(Constructor);
            /**
             * Once an injector is injected, it is wrapped to prevent further injection.
             * @param {any} value The injected value.
             */
            private static __wrap(value);
            /**
             * Returns an empty injector object.
             */
            private static __noop();
            /**
             * Determines if there is a circular dependency in a dependency tree.
             * @param {plat.dependency.Injector<any>} injector The starting point for the dependency tree search.
             */
            private static __findCircularReferences(injector);
            /**
             * The dependencies for this injector
             */
            private __dependencies;
            /**
             * The constructor for an injector. Converts any non-string dependencies to strings to support mocking Injectors during runtime.
             * @param {string} name The name of the injected type.
             * @param {new () => T} Constructor The constructor method for the component requiring the dependency
             * injection.
             * @param {Array<any>} dependencies An array of strings specifying the injectable dependencies for the
             * associated constructor.
             * @param {string} type The type of injector, used for injectables specifying a injectableType of
             * STATIC, SINGLETON, FACTORY, INSTANCE, or CLASS. The default is SINGLETON.
             */
            constructor(name: string, Constructor: new() => T, dependencies?: any[], type?: string);
            /**
             * Gathers the dependencies for the Injector object and creates a new instance of the
             * Constructor, passing in the dependencies in the order they were specified. If the
             * Injector contains a Constructor for an injectable and the Constructor is registered
             * as a SINGLE type it will only inject that injectable once.
             */
            public inject(): T;
            /**
             * Wraps the injector with the instantiated value in the case of a
             * SINGLE or STATIC type so that it does not re-instantiate.
             * @param {any} value The value to wrap
             */
            public _wrapInjector(value: any): IInjector<any>;
        }
        /**
         * An object whose values are all IInjectors.
         */
        interface IInjectorObject<T> extends IObject<IInjector<T>> {
        }
        /**
         * The IInjector interface is used for dependency injection. You can create an injector object,
         * specify dependencies and a constructor for your component. When the injector object is
         * 'injected' it will create a new instance of your component and pass in the dependencies
         * to the constructor.
         */
        interface IInjector<T> {
            /**
             * Gathers the dependencies for the IInjector object and creates a new instance of the
             * Constructor, passing in the dependencies in the order they were specified. If the
             * Injector contains a Constructor for an injectable and the Constructor is registered
             * as a SINGLE type it will only inject that injectable once.
             */
            inject(): T;
            /**
             * The constructor method for the component requiring the dependency injection.
             */
            Constructor: new() => T;
            /**
             * The type of injector, used for injectables specifying a register.injectableType of
             * STATIC, SINGLE, or MULTI. The default is SINGLE.
             */
            type?: string;
            /**
             * The name registered for the injector.
             */
            name: string;
        }
        /**
         * Publically exposes all the dependency injector objects.
         */
        module injectors {
            /**
             * An IInjectorObject of IControls.
             * Contains all the registered controls for an application.
             */
            var control: IInjectorObject<IControl>;
            /**
             * An IInjectorObject of IBaseViewControls.
             * Contains all the registered view controls for an application.
             */
            var viewControl: IInjectorObject<ui.IBaseViewControl>;
            /**
             * An IInjectorObject of objects. Contains all the registered
             * injectables for an application.
             */
            var injectable: IInjectorObject<IInjector<any>>;
            /**
             * An IInjectorObject of static objects. Contains all the registered
             * static injectables for an application. Once the injectables have been injected, they are removed from this object.
             */
            var staticInjectable: IInjectorObject<IInjector<any>>;
            /**
             * An IInjectorObject of animations. Can be either CSS or JS implementations.
             */
            var animation: IInjectorObject<ui.animations.IBaseAnimation>;
            /**
             * An IInjectorObject  of animations. Should only contain JS implementations.
             */
            var jsAnimation: IInjectorObject<ui.animations.IBaseAnimation>;
        }
    }
    /**
     * Returns the requested injectable dependency.
     * @param {() => T} dependency The dependency Type to return.
     */
    function acquire<T>(dependency: () => T): T;
    /**
     * Returns the requested injectable dependency.
     * @param {Function} dependency The dependency Type to return.
     */
    function acquire(dependency: Function): any;
    /**
     * Returns the requested injectable dependency.
     * @param {Function} dependency An array of Types specifying the injectable dependencies.
     */
    function acquire(dependencies: Function[]): any[];
    /**
     * Returns the requested injectable dependency.
     * @param {string} dependency The injectable dependency type to return.
     */
    function acquire(dependency: string): any;
    /**
     * Gathers dependencies and returns them as an array in the order they were requested.
     * @param {Array<string>} dependencies An array of strings specifying the injectable dependencies.
     */
    function acquire(dependencies: string[]): any[];
    /**
     * Gathers dependencies and returns them as an array in the order they were requested.
     * @param {Array<any>} dependencies An array of strings or Functions specifying the injectable dependencies.
     */
    function acquire(dependencies: any[]): any[];
    /**
     * Manages the throwing and consuming of errors and warnings.
     */
    class Exception {
        /**
         * Method for sending a warning to all listeners. Will
         * not throw an error.
         * @param {string} message The message to be sent to the listeners.
         * @param {number} type? Denotes the type of fatal exception.
         */
        static warn(message: string, type?: number): void;
        /**
         * Method for sending a fatal error to all listeners. Will
         * throw an error.
         * @param {Error} error The Error to be sent to all the listeners.
         * @param {number} type? Denotes the type of fatal exception.
         */
        static fatal(error: Error, type?: number): void;
        /**
         * Method for sending a fatal message to all listeners. Will
         * throw an error.
         * @param {string} message The message to be sent to all the listeners.
         * @param {number} type? Denotes the type of fatal exception.
         */
        static fatal(message: string, type?: number): void;
        /**
         * Exception Type for parsing exceptions
         */
        static PARSE: number;
        /**
         * Exception Type for compiling exceptions
         */
        static COMPILE: number;
        /**
         * Exception Type for binding exceptions
         */
        static BIND: number;
        /**
         * Exception Type for name exceptions
         */
        static NAME: number;
        /**
         * Exception Type for navigation exceptions
         */
        static NAVIGATION: number;
        /**
         * Exception Type for template exceptions
         */
        static TEMPLATE: number;
        /**
         * Exception Type for ajax exceptions
         */
        static AJAX: number;
        /**
         * Exception Type for context exceptions
         */
        static CONTEXT: number;
        /**
         * Exception Type for event exceptions
         */
        static EVENT: number;
        /**
         * Exception Type for injectable exceptions
         */
        static INJECTABLE: number;
        /**
         * Exception Type for compat exceptions
         */
        static COMPAT: number;
        /**
         * Exception Type for promise exceptions
         */
        static PROMISE: number;
        /**
         * Exception Type for animation exceptions
         */
        static ANIMATION: number;
    }
    /**
     * The Type for referencing the '$ExceptionStatic' injectable as a dependency.
     */
    function IExceptionStatic(): IExceptionStatic;
    /**
     * Manages the throwing and consuming of errors and warnings.
     */
    interface IExceptionStatic {
        /**
         * Method for sending a warning to all listeners. Will
         * not throw an error.
         * @param {string} message The message to be sent to the listeners.
         * @param {number} type? Denotes the type of fatal exception.
         */
        warn(message: string, type?: number): void;
        /**
         * Method for sending a fatal error to all listeners. Will
         * throw an error.
         * @param {Error} error The Error to be sent to all the listeners.
         * @param {number} type? Denotes the type of fatal exception.
         */
        fatal(error: Error, type?: number): void;
        /**
         * Method for sending a fatal message to all listeners. Will
         * throw an error.
         * @param {string} message The message to be sent to all the listeners.
         * @param {number} type? Denotes the type of fatal exception.
         */
        fatal(message: string, type?: number): void;
        /**
         * Exception Type for parsing exceptions
         */
        PARSE: number;
        /**
         * Exception Type for compiling exceptions
         */
        COMPILE: number;
        /**
         * Exception Type for binding exceptions
         */
        BIND: number;
        /**
         * Exception Type for name exceptions
         */
        NAME: number;
        /**
         * Exception Type for navigation exceptions
         */
        NAVIGATION: number;
        /**
         * Exception Type for template exceptions
         */
        TEMPLATE: number;
        /**
         * Exception Type for ajax exceptions
         */
        AJAX: number;
        /**
         * Exception Type for context exceptions
         */
        CONTEXT: number;
        /**
         * Exception Type for event exceptions
         */
        EVENT: number;
        /**
         * Exception Type for injectable exceptions
         */
        INJECTABLE: number;
        /**
         * Exception Type for compat exceptions
         */
        COMPAT: number;
        /**
         * Exception Type for promise exceptions
         */
        PROMISE: number;
        /**
         * Exception Type for animation exceptions
         */
        ANIMATION: number;
    }
    /**
     * A class containing boolean values signifying browser
     * and/or platform compatibilities.
     */
    class Compat implements ICompat {
        /**
         * The window injectable.
         */
        public $Window: Window;
        /**
         * The document injectable.
         */
        public $Document: Document;
        /**
         * Determines if the browser is modern enough to correctly
         * run PlatypusTS.
         */
        public isCompatible: boolean;
        /**
         * Signifies whether or not Cordova is defined. If it is,
         * we hook up ALM events to Cordova's functions.
         */
        public cordova: boolean;
        /**
         * Signifies whether window.history.pushState is defined.
         */
        public pushState: boolean;
        /**
         * Signifies whether the File API is supported.
         */
        public fileSupported: boolean;
        /**
         * Signifies whether Require is present. If it is, we assume
         * it is going to be used and leave the loading of the app up
         * to the developer.
         */
        public amd: boolean;
        /**
         * Signifies whether we are in the contet of a Windows 8 app.
         */
        public msApp: boolean;
        /**
         * Signifies whether indexedDB exists on the window.
         */
        public indexedDb: boolean;
        /**
         * Signifies whether Object.prototype.__proto__ exists.
         */
        public proto: boolean;
        /**
         * Signifies whether Object.prototype.getPrototypeOf exists.
         */
        public getProto: boolean;
        /**
         * Signifies whether Object.prototype.setPrototypeOf exists.
         */
        public setProto: boolean;
        /**
         * Whether or not the current browser has touch events
         * like touchstart, touchmove, touchend, etc.
         */
        public hasTouchEvents: boolean;
        /**
         * Whether or not the current browser has pointer events
         * like pointerdown, MSPointerMove, pointerup, etc.
         */
        public hasPointerEvents: boolean;
        /**
         * Whether or not the current browser has touch events
         * like MSPointerDown, touchmove, MSPointerUp, etc.
         */
        public hasMsPointerEvents: boolean;
        /**
         * Whether or not the browser supports animations.
         */
        public animationSupported: boolean;
        /**
         * Whether the platypus.css file was included or not.
         */
        public platCss: boolean;
        /**
         * An object containing the correctly mapped touch events for the browser.
         */
        public mappedEvents: IMappedTouchEvents;
        /**
         * An object containing the properly prefixed animation events.
         */
        public animationEvents: IAnimationEvents;
        /**
         * An object containing information regarding any potential vendor prefix.
         */
        public vendorPrefix: IVendorPrefix;
        /**
         * The version of Internet Explorer being used. If not Internet Explorer, the value is undefined.
         */
        public IE: number;
        /**
         * The version of Android being used. If not Android, the value is undefined.
         */
        public ANDROID: number;
        /**
         * An object containing all event lookups.
         */
        private __events;
        /**
         * Define everything.
         */
        constructor();
        /**
         * Check whether or not an event exists.
         * @param {string} event The event to check the existence of.
         */
        public hasEvent(event: string): boolean;
        /**
         * Define booleans.
         */
        private __defineBooleans();
        /**
         * Define mapped events
         */
        private __defineMappedEvents();
        /**
         * Define animation events
         */
        private __defineAnimationEvents();
        /**
         * Determines whether or not platypus css styles exist.
         */
        private __determineCss();
    }
    /**
     * The Type for referencing the '$Compat' injectable as a dependency.
     */
    function ICompat(): ICompat;
    /**
     * An object containing boolean values signifying browser
     * and/or platform compatibilities.
     */
    interface ICompat {
        /**
         * Determines if the browser is modern enough to correctly
         * run PlatypusTS.
         */
        isCompatible: boolean;
        /**
         * Signifies whether or not Cordova is defined. If it is,
         * we hook up ALM events to Cordova's functions.
         */
        cordova: boolean;
        /**
         * Signifies whether window.history.pushState is defined.
         */
        pushState: boolean;
        /**
         * Signifies whether the File API is supported.
         */
        fileSupported: boolean;
        /**
         * Signifies whether Require is present. If it is, we assume
         * it is going to be used and leave the loading of the app up
         * to the developer.
         */
        amd: boolean;
        /**
         * Signifies whether we are in the contet of a Windows 8 app.
         */
        msApp: boolean;
        /**
         * Signifies whether indexedDB exists on the window.
         */
        indexedDb: boolean;
        /**
         * Signifies whether Object.prototype.__proto__ exists.
         */
        proto: boolean;
        /**
         * Signifies whether Object.prototype.getPrototypeOf exists.
         */
        getProto: boolean;
        /**
         * Signifies whether Object.prototype.setPrototypeOf exists.
         */
        setProto: boolean;
        /**
         * Whether or not the current browser has touch events
         * like touchstart, touchmove, touchend, etc.
         */
        hasTouchEvents: boolean;
        /**
         * Whether or not the current browser has pointer events
         * like pointerdown, MSPointerMove, pointerup, etc.
         */
        hasPointerEvents: boolean;
        /**
         * Whether or not the current browser has touch events
         * like MSPointerDown, touchmove, MSPointerUp, etc.
         */
        hasMsPointerEvents: boolean;
        /**
         * Whether or not the browser supports animations.
         */
        animationSupported: boolean;
        /**
         * Whether the platypus.css file was included or not.
         */
        platCss: boolean;
        /**
         * An object containing the correctly mapped touch events for the browser.
         */
        mappedEvents: IMappedTouchEvents;
        /**
         * An object containing the properly prefixed animation events.
         */
        animationEvents: IAnimationEvents;
        /**
         * An object containing information regarding any potential vendor prefix.
         */
        vendorPrefix: IVendorPrefix;
        /**
         * The version of Internet Explorer being used. If not Internet Explorer, the value is undefined.
         */
        IE: number;
        /**
         * The version of Android being used. If not Android, the value is undefined.
         */
        ANDROID: number;
        /**
         * Check whether or not an event exists.
         * @param {string} event The event to check the existence of.
         */
        hasEvent(event: string): boolean;
    }
    /**
     * Describes an object containing the correctly mapped touch events for the browser.
     */
    interface ITouchMapping<T> extends IObject<T> {
        /**
         * An event type for touch start.
         */
        $touchstart: T;
        /**
         * An event type for touch end.
         */
        $touchend: T;
        /**
         * An event type for touch move.
         */
        $touchmove: T;
        /**
         * An event type for touch cancel.
         */
        $touchcancel: T;
    }
    /**
     * Describes an object containing the correctly mapped touch events for the browser.
     */
    interface IMappedTouchEvents extends ITouchMapping<string> {
        /**
         * An event type for touch start.
         */
        $touchstart: string;
        /**
         * An event type for touch end.
         */
        $touchend: string;
        /**
         * An event type for touch move.
         */
        $touchmove: string;
        /**
         * An event type for touch cancel.
         */
        $touchcancel: string;
    }
    /**
     * Describes an object containing the properly prefixed animation events.
     */
    interface IAnimationEvents extends IObject<string> {
        /**
         * The animation identifier.
         */
        $animation: string;
        /**
         * The animation start event.
         */
        $animationStart: string;
        /**
         * The animation end event.
         */
        $animationEnd: string;
        /**
         * The transition identifier.
         */
        $transition: string;
        /**
         * The transition start event.
         */
        $transitionStart: string;
        /**
         * The transition end event.
         */
        $transitionEnd: string;
    }
    /**
     * Describes an object that contains information regarding the browser's
     * vendor prefix.
     */
    interface IVendorPrefix extends IObject<string> {
        /**
         * The lowercase representation of the browser's vendor prefix.
         */
        lowerCase: string;
        /**
         * The css representation of the browser's vendor prefix
         * denoted by -{prefix}-.
         */
        css: string;
        /**
         * The JavaScript representation of the browser's vendor prefix
         * denoted by it beginning with a capital letter.
         */
        js: string;
    }
    /**
     * An extensible class defining common utilities and helper functions.
     */
    class Utils implements IUtils {
        /**
         * An empty method for quickly creating dummy objects.
         */
        public noop(): void;
        /**
         * Allows you to extend the properties of an object with any number
         * of other objects. If objects share properties, the last object in the
         * arguments will take precedence. This method is only a shallow copy of
         * all the source objects to the destination object.
         * @param {any} destination The destination object to extend.
         * @param {Array<any>} ...sources Any number of objects with which to extend the
         * destination object.
         */
        public extend(destination: any, ...sources: any[]): any;
        /**
         * Allows you to extend the properties of an object with any number
         * of other objects. If objects share properties, the last object in the
         * arguments will take precedence. This method is a deep copy of
         * all the source objects to the destination object.
         * @param {any} destination The destination object to extend.
         * @param {Array<any>} ...sources Any number of objects with which to extend the
         * destination object.
         */
        public deepExtend(destination: any, ...sources: any[]): any;
        /**
         * Creates a copy of the passed-in object. If deep is true it will
         * be a deep copy (duplicate), else nested objects/arrays will be copied by reference
         * and not duplicated.
         * @param {T} obj The object to clone.
         * @param {boolean} deep? Whether or not it is a deep clone.
         */
        public clone<T>(obj: T, deep?: boolean): T;
        /**
         * Takes in anything and determines if it is a type of Object.
         * @param {any} obj Anything.
         */
        public isObject(obj: any): boolean;
        /**
         * Takes in anything and determines if it is a window object.
         * @param {any} obj Anything.
         */
        public isWindow(obj: any): boolean;
        /**
         * Takes in anything and determines if it is a document object.
         * @param {any} obj Anything.
         */
        public isDocument(obj: any): boolean;
        /**
         * Takes in anything and determines if it is a Node.
         * @param {any} obj Anything.
         */
        public isNode(obj: any): boolean;
        /**
         * Takes in anything and determines if it is a DocumentFragment.
         * @param {any} obj Anything.
         */
        public isDocumentFragment(obj: any): boolean;
        /**
         * Takes in anything and determines if it is a string.
         * @param {any} obj Anything.
         */
        public isString(obj: any): boolean;
        /**
         * Takes in anything and determines if it is a RegExp object.
         * @param {any} obj Anything.
         */
        public isRegExp(obj: any): boolean;
        /**
         * Takes in anything and determines if it is a Promise object.
         * @param {any} obj Anything.
         */
        public isPromise(obj: any): boolean;
        /**
         * Takes in anything and determines if it is empty. Useful for
         * checking for empty strings, arrays, or objects without keys.
         * @param {any} obj Anything.
         * false otherwise.
         */
        public isEmpty(obj: any): boolean;
        /**
         * Takes in anything and determines if it is a boolean.
         * @param {any} obj Anything.
         */
        public isBoolean(obj: any): boolean;
        /**
         * Takes in anything and determines if it is a number.
         * @param {any} obj Anything.
         */
        public isNumber(obj: any): boolean;
        /**
         * Takes in anything and determines if it is a function.
         * @param {any} obj Anything.
         */
        public isFunction(obj: any): boolean;
        /**
         * Takes in anything and determines if it is null or undefined.
         * @param {any} obj Anything.
         */
        public isNull(obj: any): boolean;
        /**
         * Takes in anything and determines if it is undefined.
         * @param {any} obj Anything.
         */
        public isUndefined(obj: any): boolean;
        /**
         * Takes in anything and determines if it is an Array.
         * @param {any} obj Anything.
         */
        public isArray(obj: any): boolean;
        /**
         * Takes in anything and determines if it has array-like qualities.
         * @param {any} obj Anything.
         * Array, string, arguments, or NodeList), false otherwise.
         */
        public isArrayLike(obj: any): boolean;
        /**
         * Takes in anything and determines if it is a Date object.
         * @param {any} obj Anything.
         */
        public isDate(obj: any): boolean;
        /**
         * Takes in an array and a function to evaluate the properties in the array.
         * Returns a filtered array of objects resulting from evaluating the function.
         * @param {Array<T>} array The Array to filter.
         * @param {plat.IListIterator<T, boolean>} iterator The iterator function to call with array's properties.
         * Returns true if the property should be kept, false otherwise.
         * @param {any} context? Optional context with which to call the iterator.
         */
        public filter<T>(array: T[], iterator: IListIterator<T, boolean>, context?: any): T[];
        /**
         * Takes in an object/array and a function to evaluate the properties in the object/array.
         * Returns a filtered array of objects resulting from evaluating the function.
         * @param {plat.IObject<T>} obj The object to filter.
         * @param {plat.IObjectIterator<T, boolean>} iterator The iterator function to call with array's properties.
         * Returns true if the property should be kept, false otherwise.
         * @param {any} context? Optional context with which to call the iterator.
         */
        public filter<T>(obj: IObject<T>, iterator: IObjectIterator<T, boolean>, context?: any): T[];
        /**
         * Takes in a list and object containing key/value pairs to search for in the list.
         * @param {Array<T>} array The list used for searching for properties.
         * @param {any} properties An object containing key/value pairs to match with obj's values.
         */
        public where<T, U extends {}>(array: T[], properties: U): T[];
        /**
         * Takes in an Array and a function to iterate over. Calls the iterator function with every property
         * in the Array, then returns the object.
         * @param {Array<T>} array An Array.
         * @param {plat.IListIterator<T, void>} iterator A method that takes in a value, index, and the object.
         * @param {any} context? An optional context to bind to the iterator.
         */
        public forEach<T>(array: T[], iterator: IListIterator<T, void>, context?: any): T[];
        /**
         * Takes in an Array and a function to iterate over. Calls the iterator function with every property
         * in the Array, then returns the object.
         * @param {plat.IObject<T>} obj An object.
         * @param {plat.IObjectIterator<T, void>} iterator A method that takes in a value, index, and the object.
         * @param {any} context? An optional context to bind to the iterator.
         */
        public forEach<T>(obj: IObject<T>, iterator: IObjectIterator<T, void>, context?: any): IObject<T>;
        /**
         * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The
         * iterator can transform the object and return it. The returned values will be pushed to an Array and
         * returned.
         * @param {Array<T>} array An Array.
         * @param {plat.IListIterator<T, R>} iterator The transformation function.
         * @param {any} context? An optional context to bind to the iterator.
         */
        public map<T, R>(array: T[], iterator: IListIterator<T, R>, context?: any): R[];
        /**
         * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The
         * iterator can transform the object and return it. The returned values will be pushed to an Array and
         * returned.
         * @param {plat.IObject<T>} obj An Object.
         * @param {(value: T, index: number, obj: any) => U} iterator The transformation function.
         * @param {any} context? An optional context to bind to the iterator.
         */
        public map<T, R>(obj: IObject<T>, iterator: IObjectIterator<T, R>, context?: any): R[];
        /**
         * Takes in an array and an iterator function. Calls the iterator with all the values in the array. The
         * iterator can return a promise the will resolve with the mapped value. The returned values will be pushed
         * to an Array. A promise is returned that will resolve when all the iterators have resolved.
         * @param {Array<T>} array An array.
         * @param {plat.IListIterator<T, plat.async.IThenable<R>>} iterator The transformation function.
         * @param {any} context? An optional context to bind to the iterator.
         */
        public mapAsync<T, R>(array: T[], iterator: IListIterator<T, async.IThenable<R>>, context?: any): async.IThenable<R[]>;
        /**
         * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The
         * iterator can return a promise the will resolve with the mapped value. The returned values will be pushed
         * to an Array. A promise is returned that will resolve when all the iterators have resolved.
         * @param {plat.IObject<T>} obj An Object.
         * @param {plat.IObjectIterator<T, plat.async.IThenable<R>>} iterator The transformation function.
         * @param {any} context? An optional context to bind to the iterator.
         */
        public mapAsync<T, R>(obj: IObject<T>, iterator: IObjectIterator<T, async.IThenable<R>>, context?: any): async.IThenable<R[]>;
        /**
         * Takes in an array and an iterator function. Calls the iterator with all the values in the array. The
         * iterator can return a promise the will resolve with the mapped value. The next value in the array will not be passed to
         * the iterator until the previous promise fulfills.
         * @param {Array<T>} array An Array.
         * @param {plat.IListIterator<T, plat.async.IThenable<R>>} iterator The transformation function.
         * @param {any} context? An optional context to bind to the iterator.
         */
        public mapAsyncInOrder<T, R>(array: T[], iterator: IListIterator<T, async.IThenable<R>>, context?: any): async.IThenable<R[]>;
        /**
         * Takes in an array and an iterator function. Calls the iterator with all the values in the array in descending order. The
         * iterator can return a promise the will resolve with the mapped value. The next value in the array will not be passed to
         * the iterator until the previous promise fulfills.
         * @param {Array<T>} array An Array.
         * @param {plat.IListIterator<T, plat.async.IThenable<R>>} iterator The transformation function.
         * @param {any} context? An optional context to bind to the iterator.
         */
        public mapAsyncInDescendingOrder<T, R>(array: T[], iterator: (value: T, index: number, list: T[]) => async.IThenable<R>, context?: any): async.IThenable<R[]>;
        /**
         * Takes in an object and a property to extract from all of the object's values. Returns an array of
         * the 'plucked' values.
         * @param {any} obj An object.
         * @param {string} key The property to 'pluck' from each value in obj.
         */
        public pluck<T extends {}>(obj: T[], key: string): any[];
        /**
         * Takes in an array and an iterator. Evaluates all the values in the array with the iterator.
         * Returns true if any of the iterators return true, otherwise returns false.
         * @param {Array<T>} array An array.
         * @param {plat.IListIterator<T, boolean>} iterator A method with which to evaluate all the values in obj.
         * @param {any} context? An optional context to bind to the iterator.
         */
        public some<T>(array: T[], iterator: IListIterator<T, boolean>, context?: any): boolean;
        /**
         * Takes in an array and an iterator. Evaluates all the values in the array with the iterator.
         * Returns true if any of the iterators return true, otherwise returns false.
         * @param {plat.IObject<T>} obj An object.
         * @param {plat.IObjectIterator<T, boolean>} iterator A method with which to evaluate all the values in obj.
         * @param {any} context? An optional context to bind to the iterator.
         */
        public some<T>(obj: IObject<T>, iterator: IObjectIterator<T, boolean>, context?: any): boolean;
        /**
         * Takes in a method and array of arguments to pass to that method. Delays calling the method until
         * after the current call stack is clear. Equivalent to a setTimeout with a timeout of 0.
         * @param {(...args: Array<any>) => void} method The method to call.
         * @param {Array<any>} args? The arguments to apply to the method.
         * @param {any} context? An optional context to bind to the method.
         */
        public postpone(method: (...args: any[]) => void, args?: any[], context?: any): IRemoveListener;
        /**
         * Takes in a method and array of arguments to pass to that method. Delays calling the method until
         * after the current call stack is clear. Equivalent to a setTimeout with the specified timeout value.
         * @param {(...args: Array<any>) => void} method The method to call.
         * @param {number} timeout The time (in milliseconds) to delay before calling the provided method
         * @param {Array<any>} args? The arguments to apply to the method.
         * @param {any} context? An optional context to bind to the method.
         */
        public defer(method: (...args: any[]) => void, timeout: number, args?: any[], context?: any): IRemoveListener;
        /**
         * Takes in a prefix and returns a unique identifier string with the prefix preprended. If no prefix
         * is specified, none will be prepended.
         * @param {string} prefix? A string prefix to prepend tothe unique ID.
         */
        public uniqueId(prefix?: string): string;
        /**
         * Takes in a spinal-case, dot.case, or snake_case string and returns
         * a camelCase string. Also can turn a string into camelCase with space
         * as a delimeter.
         * @param {string} str The spinal-case, dot.case, or snake_case string.
         */
        public camelCase(str: string): string;
    }
    /**
     * The Type for referencing the '$Utils' injectable as a dependency.
     */
    function IUtils(): IUtils;
    /**
     * An object defining common utilities and helper functions.
     */
    interface IUtils {
        /**
         * An empty method for quickly creating dummy objects.
         */
        noop(): void;
        /**
         * Allows you to extend the properties of an object with any number
         * of other objects. If objects share properties, the last object in the
         * arguments will take precedence. This method is only a shallow copy of
         * all the source objects to the destination object.
         * @param {any} destination The destination object to extend.
         * @param {Array<any>} ...sources Any number of objects with which to extend the
         * destination object.
         */
        extend(destination: any, ...sources: any[]): any;
        /**
         * Allows you to extend the properties of an object with any number
         * of other objects. If objects share properties, the last object in the
         * arguments will take precedence. This method is a deep copy of
         * all the source objects to the destination object.
         * @param {any} destination The destination object to extend.
         * @param {Array<any>} ...sources Any number of objects with which to extend the
         * destination object.
         */
        deepExtend(destination: any, ...sources: any[]): any;
        /**
         * Creates a copy of the passed-in object. If deep is true it will
         * be a deep copy (duplicate), else nested objects/arrays will be copied by reference
         * and not duplicated.
         * @param {T} obj The object to clone.
         * @param {boolean} deep? Whether or not it is a deep clone.
         */
        clone<T>(obj: T, deep?: boolean): T;
        /**
         * Takes in anything and determines if it is a type of Object.
         * @param {any} obj Anything.
         */
        isObject(obj: any): boolean;
        /**
         * Takes in anything and determines if it is a window object.
         * @param {any} obj Anything.
         */
        isWindow(obj: any): boolean;
        /**
         * Takes in anything and determines if it is a document object.
         * @param {any} obj Anything.
         */
        isDocument(obj: any): boolean;
        /**
         * Takes in anything and determines if it is a Node.
         * @param {any} obj Anything.
         */
        isNode(obj: any): boolean;
        /**
         * Takes in anything and determines if it is a DocumentFragment.
         * @param {any} obj Anything.
         */
        isDocumentFragment(obj: any): boolean;
        /**
         * Takes in anything and determines if it is a string.
         * @param {any} obj Anything.
         */
        isString(obj: any): boolean;
        /**
         * Takes in anything and determines if it is a RegExp object.
         * @param {any} obj Anything.
         */
        isRegExp(obj: any): boolean;
        /**
         * Takes in anything and determines if it is a Promise object.
         * @param {any} obj Anything.
         */
        isPromise(obj: any): boolean;
        /**
         * Takes in anything and determines if it is empty. Useful for
         * checking for empty strings, arrays, or objects without keys.
         * @param {any} obj Anything.
         * false otherwise.
         */
        isEmpty(obj: any): boolean;
        /**
         * Takes in anything and determines if it is a boolean.
         * @param {any} obj Anything.
         */
        isBoolean(obj: any): boolean;
        /**
         * Takes in anything and determines if it is a number.
         * @param {any} obj Anything.
         */
        isNumber(obj: any): boolean;
        /**
         * Takes in anything and determines if it is a function.
         * @param {any} obj Anything.
         */
        isFunction(obj: any): boolean;
        /**
         * Takes in anything and determines if it is null or undefined.
         * @param {any} obj Anything.
         */
        isNull(obj: any): boolean;
        /**
         * Takes in anything and determines if it is undefined.
         * @param {any} obj Anything.
         */
        isUndefined(obj: any): boolean;
        /**
         * Takes in anything and determines if it is an Array.
         * @param {any} obj Anything.
         */
        isArray(obj: any): boolean;
        /**
         * Takes in anything and determines if it has array-like qualities.
         * @param {any} obj Anything.
         * Array, string, arguments, or NodeList), false otherwise.
         */
        isArrayLike(obj: any): boolean;
        /**
         * Takes in anything and determines if it is a Date object.
         * @param {any} obj Anything.
         */
        isDate(obj: any): boolean;
        /**
         * Takes in an array and a function to evaluate the properties in the array.
         * Returns a filtered array of objects resulting from evaluating the function.
         * @param {Array<T>} array The Array to filter.
         * @param {plat.IListIterator<T, boolean>} iterator The iterator function to call with array's properties.
         * Returns true if the property should be kept, false otherwise.
         * @param {any} context? Optional context with which to call the iterator.
         */
        filter<T>(array: T[], iterator: IListIterator<T, boolean>, context?: any): T[];
        /**
         * Takes in an object/array and a function to evaluate the properties in the object/array.
         * Returns a filtered array of objects resulting from evaluating the function.
         * @param {plat.IObject<T>} obj The object to filter.
         * @param {plat.IObjectIterator<T, boolean>} iterator The iterator function to call with array's properties.
         * Returns true if the property should be kept, false otherwise.
         * @param {any} context? Optional context with which to call the iterator.
         */
        filter<T>(obj: IObject<T>, iterator: IObjectIterator<T, boolean>, context?: any): T[];
        /**
         * Takes in a list and object containing key/value pairs to search for in the list.
         * @param {Array<T>} array The list used for searching for properties.
         * @param {any} properties An object containing key/value pairs to match with obj's values.
         */
        where<T, U extends {}>(array: T[], properties: U): T[];
        /**
         * Takes in an Array and a function to iterate over. Calls the iterator function with every property
         * in the Array, then returns the object.
         * @param {Array<T>} array An Array.
         * @param {plat.IListIterator<T, void>} iterator A method that takes in a value, index, and the object.
         * @param {any} context? An optional context to bind to the iterator.
         */
        forEach<T>(array: T[], iterator: IListIterator<T, void>, context?: any): T[];
        /**
         * Takes in an Array and a function to iterate over. Calls the iterator function with every property
         * in the Array, then returns the object.
         * @param {plat.IObject<T>} obj An object.
         * @param {plat.IObjectIterator<T, void>} iterator A method that takes in a value, index, and the object.
         * @param {any} context? An optional context to bind to the iterator.
         */
        forEach<T>(obj: IObject<T>, iterator: IObjectIterator<T, void>, context?: any): IObject<T>;
        /**
         * Takes in an array and an iterator function. Calls the iterator with all the values in the array. The
         * iterator can transform the object and return it. The returned values will be pushed to an Array and
         * returned.
         * @param {Array<T>} array An Array.
         * @param {plat.IListIterator<T, R>} iterator The transformation function.
         * @param {any} context? An optional context to bind to the iterator.
         */
        map<T, R>(array: T[], iterator: IListIterator<T, R>, context?: any): R[];
        /**
         * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The
         * iterator can transform the object and return it. The returned values will be pushed to an Array and
         * returned.
         * @param {plat.IObject<T>} obj An Object.
         * @param {plat.IObjectIterator<T, R>} iterator The transformation function.
         * @param {any} context? An optional context to bind to the iterator.
         */
        map<T, R>(obj: IObject<T>, iterator: IObjectIterator<T, R>, context?: any): R[];
        /**
         * Takes in an array and an iterator function. Calls the iterator with all the values in the array. The
         * iterator can return a promise the will resolve with the mapped value. The returned values will be pushed
         * to an Array. A promise is returned that will resolve when all the iterators have resolved.
         * @param {Array<T>} array An array.
         * @param {plat.IListIterator<T, plat.async.IThenable<R>>} iterator The transformation function.
         * @param {any} context? An optional context to bind to the iterator.
         */
        mapAsync<T, R>(array: T[], iterator: IListIterator<T, async.IThenable<R>>, context?: any): async.IThenable<R[]>;
        /**
         * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The
         * iterator can return a promise the will resolve with the mapped value. The returned values will be pushed
         * to an Array. A promise is returned that will resolve when all the iterators have resolved.
         * @param {plat.IObject<T>} obj An Object.
         * @param {plat.IObjectIterator<T, plat.async.IThenable<R>>} iterator The transformation function.
         * @param {any} context? An optional context to bind to the iterator.
         */
        mapAsync<T, R>(obj: IObject<T>, iterator: IObjectIterator<T, async.IThenable<R>>, context?: any): async.IThenable<R[]>;
        /**
         * Takes in an array and an iterator function. Calls the iterator with all the values in the array. The
         * iterator can return a promise the will resolve with the mapped value. The next value in the array will not be passed to
         * the iterator until the previous promise fulfills.
         * @param {Array<T>} array An Array.
         * @param {plat.IListIterator<T, plat.async.IThenable<R>>} iterator The transformation function.
         * @param {any} context? An optional context to bind to the iterator.
         */
        mapAsyncInOrder<T, R>(array: T[], iterator: IListIterator<T, async.IThenable<R>>, context?: any): async.IThenable<R[]>;
        /**
         * Takes in an array and an iterator function. Calls the iterator with all the values in the array in descending order. The
         * iterator can return a promise the will resolve with the mapped value. The next value in the array will not be passed to
         * the iterator until the previous promise fulfills.
         * @param {Array<T>} array An Array.
         * @param {plat.IListIterator<T, plat.async.IThenable<R>>} iterator The transformation function.
         * @param {any} context? An optional context to bind to the iterator.
         */
        mapAsyncInDescendingOrder<T, R>(array: T[], iterator: (value: T, index: number, list: T[]) => async.IThenable<R>, context?: any): async.IThenable<R[]>;
        /**
         * Takes in an object and a property to extract from all of the object's values. Returns an array of
         * the 'plucked' values.
         * @param {any} obj An object.
         * @param {string} key The property to 'pluck' from each value in obj.
         */
        pluck<T extends {}>(obj: T[], key: string): any[];
        /**
         * Takes in an array and an iterator. Evaluates all the values in the array with the iterator.
         * Returns true if any of the iterators return true, otherwise returns false.
         * @param {Array<T>} array An array.
         * @param {plat.IListIterator<T, boolean>} iterator A method with which to evaluate all the values in obj.
         * @param {any} context? An optional context to bind to the iterator.
         */
        some<T>(array: T[], iterator: IListIterator<T, boolean>, context?: any): boolean;
        /**
         * Takes in an array and an iterator. Evaluates all the values in the array with the iterator.
         * Returns true if any of the iterators return true, otherwise returns false.
         * @param {plat.IObject<T>} obj An object.
         * @param {plat.IObjectIterator<T, boolean>} iterator A method with which to evaluate all the values in obj.
         * @param {any} context? An optional context to bind to the iterator.
         */
        some<T>(obj: IObject<T>, iterator: IObjectIterator<T, boolean>, context?: any): boolean;
        /**
         * Takes in a method and array of arguments to pass to that method. Delays calling the method until
         * after the current call stack is clear. Equivalent to a setTimeout with a timeout of 0.
         * @param {(...args: Array<any>) => void} method The method to call.
         * @param {Array<any>} args? The arguments to apply to the method.
         * @param {any} context? An optional context to bind to the method.
         */
        postpone(method: (...args: any[]) => void, args?: any[], context?: any): IRemoveListener;
        /**
         * Takes in a method and array of arguments to pass to that method. Delays calling the method until
         * after the current call stack is clear. Equivalent to a setTimeout with the specified timeout value.
         * @param {(...args: Array<any>) => void} method The method to call.
         * @param {number} timeout The time (in milliseconds) to delay before calling the provided method
         * @param {Array<any>} args? The arguments to apply to the method.
         * @param {any} context? An optional context to bind to the method.
         */
        defer(method: (...args: any[]) => void, timeout: number, args?: any[], context?: any): IRemoveListener;
        /**
         * Takes in a prefix and returns a unique identifier string with the prefix preprended. If no prefix
         * is specified, none will be prepended.
         * @param {string} prefix? A string prefix to prepend tothe unique ID.
         */
        uniqueId(prefix?: string): string;
        /**
         * Takes in a spinal-case, dot.case, or snake_case string and returns
         * a camelCase string. Also can turn a string into camelCase with space
         * as a delimeter.
         * @param {string} str The spinal-case, dot.case, or snake_case string.
         */
        camelCase(str: string): string;
    }
    /**
     * The Type for a IUtils list iterator callback method.
     */
    interface IListIterator<T, R> {
        /**
         * A method signature for IListIterator.
         * @param {T} value The value for an object during an iteration.
         * @param {number} index The index where the value can be found.
         * @param {Array<T>} list The array passed into the util method.
         */
        (value: T, index: number, list: T[]): R;
    }
    /**
     * The Type for a IUtils object iterator callback method.
     */
    interface IObjectIterator<T, R> {
        /**
         * A method signature for IObjectIterator.
         * @param {T} value The value for an object during an iteration.
         * @param {string} key The key where the value can be found.
         * @param {plat.IObject<T>} obj The object passed into the util method.
         */
        (value: T, key: string, obj: IObject<T>): R;
    }
    /**
     * The Type for referencing the '$Window' injectable as a dependency.
     * Used so that the Window can be mocked.
     */
    function Window(): Window;
    /**
     * The Type for referencing the '$Document' injectable as a dependency.
     * Used so that the Window can be mocked.
     */
    function Document($Window?: Window): Document;
    /**
     * Holds classes and interfaces related to expression handling in platypus.
     */
    module expressions {
        /**
         * A class for keeping track of commonly used regular expressions.
         */
        class Regex implements IRegex {
            /**
             * A regular expression for finding markup in a string.
             */
            public markupRegex: RegExp;
            /**
             * Finds the arguments in a method expression.
             * // outputs ["('foo', 'bar', 'baz')", "'foo', 'bar', 'baz'"]
             * exec("myFunction('foo', 'bar', 'baz')");
             */
            public argumentRegex: RegExp;
            /**
             * Given a string, finds the root alias name if that string is an
             * alias path.
             *   // outputs ['context']
             *   exec('@context.foo');
             * // outputs null
             * exec('@context');
             */
            public aliasRegex: RegExp;
            /**
             * Finds '/*.html' or '/*.htm' in a url. Useful for removing
             * the html file out of the url.
             * // outputs ['/index.html']
             * exec('http://localhost:8080/index.html');
             */
            public initialUrlRegex: RegExp;
            /**
             * Finds a protocol delimeter in a string (e.g. ://).
             */
            public protocolRegex: RegExp;
            /**
             * Looks for any invalid variable syntax.
             */
            public invalidVariableRegex: RegExp;
            /**
             * Grabs the file name from a file path.
             */
            public fileNameRegex: RegExp;
            /**
             * Determines if a character is correlated with a shifted key code.
             */
            public shiftedKeyRegex: RegExp;
            /**
             * Determines if a url is relative or absolute.
             */
            public fullUrlRegex: RegExp;
            /**
             * A regular expression for matching or removing all newline characters.
             */
            public newLineRegex : RegExp;
            /**
             * Finds optional parameters in a route string.
             * // outputs ['(/foo)', '/foo']
             * exec('(/foo)/bar');
             * // outputs ['(/foo)', '/foo']
             * exec('(/foo))');
             */
            public optionalRouteRegex : RegExp;
            /**
             * Finds named parameters in a route string.
             * // outputs [':foo']
             * exec('/:foo/bar')
             * // outputs [':foo']
             * exec('(/:foo)/bar');
             */
            public namedParameterRouteRegex : RegExp;
            /**
             * Finds an alphanumeric wildcard match in a route string.
             * // outputs ['*bar']
             * exec('/foo/*bar/baz');
             */
            public wildcardRouteRegex : RegExp;
            /**
             * Finds invalid characters in a route string.
             * // outputs ['?']
             * exec('/foo/bar?query=baz');
             */
            public escapeRouteRegex : RegExp;
            /**
             * Finds delimeters for spinal-case, snake_case, and dot.case.
             * useful for converting to camelCase. Also can turn a string
             * into camelCase with space as a delimeter.
             * // outputs ['-o', '-', 'o']
             * exec('plat-options');
             * // outputs ['.c', '.', 'c']
             * exec('plat.config');
             * // outputs ['_v', '_', 'v']
             * exec('plat_var');
             * // outputs [' W', ' ', 'W']
             * exec('Hello World');
             */
            public camelCaseRegex : RegExp;
            /**
             * Finds all whitespace and newline characters
             * not in string literals. Needs to be combined
             * with string replace function using $1 argument.
             */
            public whiteSpaceRegex : RegExp;
            /**
             * Finds all single and double quotes.
             */
            public quotationRegex : RegExp;
            /**
             * The constructor for a Regex. Creates the markup regular expression.
             */
            constructor();
        }
        /**
         * The Type for referencing the '$Regex' injectable as a dependency.
         */
        function IRegex(): IRegex;
        /**
         * An object containing commonly used regular expressions.
         */
        interface IRegex {
            /**
             * A regular expression for matching or removing all newline characters.
             */
            newLineRegex: RegExp;
            /**
             * A regular expression for finding markup in a string.
             */
            markupRegex: RegExp;
            /**
             * Finds the arguments in a method expression.
             * // outputs ["('foo', 'bar', 'baz')", "'foo', 'bar', 'baz'"]
             * exec("myFunction('foo', 'bar', 'baz')");
             */
            argumentRegex: RegExp;
            /**
             * Given a string, finds the root alias name if that string is an
             * alias path.
             *   // outputs ['context']
             *   exec('@context.foo');
             * // outputs null
             * exec('@context');
             */
            aliasRegex: RegExp;
            /**
             * Finds optional parameters in a route string.
             * // outputs ['(/foo)', '/foo']
             * exec('(/foo)/bar');
             * // outputs ['(/foo)', '/foo']
             * exec('(/foo))');
             */
            optionalRouteRegex: RegExp;
            /**
             * Finds named parameters in a route string.
             * // outputs [':foo']
             * exec('/:foo/bar')
             * // outputs [':foo']
             * exec('(/:foo)/bar');
             */
            namedParameterRouteRegex: RegExp;
            /**
             * Finds an alphanumeric wildcard match in a route string.
             * // outputs ['*bar']
             * exec('/foo/*bar/baz');
             */
            wildcardRouteRegex: RegExp;
            /**
             * Finds invalid characters in a route string.
             * // outputs ['?']
             * exec('/foo/bar?query=baz');
             */
            escapeRouteRegex: RegExp;
            /**
             * Finds '/*.html' or '/*.htm' in a url. Useful for removing
             * the html file out of the url.
             * // outputs ['/index.html']
             * exec('http://localhost:8080/index.html');
             */
            initialUrlRegex: RegExp;
            /**
             * Finds a protocol delimeter in a string (e.g. ://).
             */
            protocolRegex: RegExp;
            /**
             * Finds delimeters for spinal-case, snake_case, and dot.case.
             * useful for converting to camelCase. Also can turn a string
             * into camelCase with space as a delimeter.
             * // outputs ['-o', '-', 'o']
             * exec('plat-options');
             * // outputs ['.c', '.', 'c']
             * exec('plat.config');
             * // outputs ['_v', '_', 'v']
             * exec('plat_var');
             * // outputs [' W', ' ', 'W']
             * exec('Hello World');
             */
            camelCaseRegex: RegExp;
            /**
             * Finds all whitespace and newline characters
             * not in string literals. Needs to be combined
             * with string replace function using $1 argument.
             */
            whiteSpaceRegex: RegExp;
            /**
             * Finds all single and double quotes.
             */
            quotationRegex: RegExp;
            /**
             * Looks for any invalid variable syntax.
             */
            invalidVariableRegex: RegExp;
            /**
             * Grabs the file name from a file path.
             */
            fileNameRegex: RegExp;
            /**
             * Determines if a character is correlated with a shifted key code.
             */
            shiftedKeyRegex: RegExp;
            /**
             * Determines if a url is relative or absolute.
             */
            fullUrlRegex: RegExp;
        }
        /**
         * A class that is responsible for taking in a JavaScript expression string and
         * finding all of its tokens (i.e. delimiters, operators, etc).
         */
        class Tokenizer implements ITokenizer {
            /**
             * The input string to tokenize.
             */
            public _input: string;
            /**
             * The previous character during tokenization.
             */
            private __previousChar;
            /**
             * A regular expression for determining if a potential variable is valid syntax.
             */
            private __variableRegex;
            /**
             * A queue used for determining the output of the tokenization.
             */
            private __outputQueue;
            /**
             * A stack used for determining operator precedence and aiding with the evaluation
             * operands.
             */
            private __operatorStack;
            /**
             * A collection used for determining argument count for certain operations.
             */
            private __argCount;
            /**
             * A collection used for determining argument count for certain object literal operations.
             */
            private __objArgCount;
            /**
             * The last character encountered while in an operation dealing with the colon operator.
             * Needs to be an array due to the possibility of nested colon operations.
             */
            private __lastColonChar;
            /**
             * The last character encountered while in an operation dealing with commas.
             * Needs to be an array due to the possibility of nested comma operations.
             */
            private __lastCommaChar;
            /**
             * Takes in an expression string and outputs a tokenized collection of
             * ITokens.
             * @param {string} input The JavaScript expression string to tokenize.
             * ITokens.
             */
            public createTokens(input: string): IToken[];
            /**
             * Determines character type.
             * @param {string} char The character to check.
             * @param {boolean} isNumberLike Whether or not the character resembles a number.
             */
            public _checkType(char: string, isNumberLike: boolean): boolean;
            /**
             * Looks ahead in the expression to group similar character types.
             * @param {string} char The current character in the expression string.
             * @param {number} index The current index in the expression string.
             * @param {boolean} isNumberLike Whether or not the character resembles a number.
             */
            public _lookAhead(char: string, index: number, isNumberLike: boolean): string;
            /**
             * Looks ahead in the expression to try and complete the
             * current operator.
             * @param {string} char The operator to find.
             * @param {number} index The current index in the expression string.
             */
            public _lookAheadForOperatorFn(char: string, index: number): string;
            /**
             * Looks ahead in the expression until it comes to the ending
             * character to try and complete a particular sequence
             * (e.g. - a string literal). Also strips the first and last
             * characters of the result (i.e. removes the delimiters).
             * @param {string} endChar The ending character.
             * @param {number} index The current index in the expression string.
             * the first character and end character being looked ahead for.
             */
            public _lookAheadForDelimiter(endChar: string, index: number): string;
            /**
             * Pops the operator stack onto the output queue until a particular
             * operator value is reached.
             * @param {plat.expressions.IToken} topOperator The top of the operator stack.
             * @param {string} char The operator value being searched for.
             * @param {string} error The error to throw in the case that the expression
             * is invalid.
             */
            public _popStackForVal(topOperator: IToken, char: string, error: string): void;
            /**
             * Check if the "val" property on an IToken
             * is present in a particular character string.
             * @param {plat.expressions.IToken} obj The IToken
             * with the "val" property to compare.
             * @param {string} char The char to compare with.
             */
            public _isValEqual(obj: IToken, char: string): boolean;
            /**
             * Check if the "val" property on an IToken
             * is not present in a particular character string.
             * @param {plat.expressions.IToken} obj The IToken
             * with the "val" property to compare.
             * @param {string} char The char to compare with.
             */
            public _isValUnequal(obj: IToken, char: string): boolean;
            /**
             * Resets all the tokenizer's properties.
             */
            public _resetTokenizer(): void;
            /**
             * Throws a fatal exception in the case of an error.
             * @param {string} error The error message to throw.
             */
            public _throwError(error: string): void;
            /**
             * Checks if a single character is numeric.
             * @param {string} char The character to check.
             */
            public _isNumeric(char: string): boolean;
            /**
             * Checks if a single character is a space.
             * @param {string} char The character to check.
             */
            public _isSpace(char: string): boolean;
            /**
             * Checks if a single character is alphanumeric.
             * @param {string} char The character to check.
             */
            public _isAlphaNumeric(char: string): boolean;
            /**
             * Checks if a string has proper JavaScript variable syntax.
             * @param {string} input The string to check.
             * JavaScript variable.
             */
            public _isStringValidVariable(input: string): boolean;
            /**
             * Handles tokenizing an alphanumeric character.
             * @param {number} index The current index in the string being tokenized.
             * @param {string} char The current char.
             */
            private __handleAplhaNumeric(index, char);
            /**
             * Handles tokenizing a "." character.
             * @param {number} index The current index in the string being tokenized.
             * @param {string} char The current char.
             */
            private __handlePeriod(index, char);
            /**
             * Handles tokenizing a "{" character.
             * @param {string} char The current char.
             */
            private __handleLeftBrace(char);
            /**
             * Handles tokenizing a "}" character.
             * @param {string} char The current char.
             */
            private __handleRightBrace(char);
            /**
             * Handles tokenizing a "[" character.
             * @param {string} char The current char.
             */
            private __handleLeftBracket(char);
            /**
             * Handles tokenizing a "]" character.
             * @param {string} char The current char.
             */
            private __handleRightBracket(char);
            /**
             * Handles tokenizing a "(" character.
             * @param {string} char The current char.
             */
            private __handleLeftParenthesis(char);
            /**
             * Handles tokenizing a ")" character.
             * @param {string} char The current char.
             */
            private __handleRightParenthesis(char);
            /**
             * Handles tokenizing a "," character.
             * @param {string} char The current char.
             */
            private __handleComma(char);
            /**
             * Handles tokenizing a string literal.
             * @param {number} index The current index in the string being tokenized.
             * @param {string} char The current char.
             */
            private __handleStringLiteral(index, char);
            /**
             * Handles tokenizing a "?" character.
             * @param {string} char The current char.
             */
            private __handleQuestion(char);
            /**
             * Handles tokenizing a ":" character.
             * @param {string} char The current char.
             * @param {number} ternary The current ternary counter. Increments when a ternary is found,
             * decrements when a ternary is completed. It can be very useful when there is nested ternaries.
             */
            private __handleColon(char, ternary);
            /**
             * Handles tokenizing all other operators.
             * @param {number} index The current index in the string being tokenized.
             * @param {string} char The current char.
             */
            private __handleOtherOperator(index, char);
            /**
             * Pops operators left on the operator stack onto the output queue
             * checking for mismatches.
             */
            private __popRemainingOperators();
            /**
             * Grabs essential token details for a given operator.
             * @param {string} operator The operator whose details are being requested.
             * operator including precedence, associativity, and an evaluation function denoted as
             * an ITokenDetails object.
             */
            private __determineOperator(operator);
            /**
             * Determines the precedence of a given operator in relation to other operators
             * in the operator stack and places it in the operator stack.
             * @param {string} operator The operator whose precedence is being determined.
             */
            private __determinePrecedence(operator);
            /**
             * Removes a reference to a function that is present in the operator stack and places
             * it in the output queue.
             * @param {number} argCount The current local argument count used with functions,
             * arrays, and object literals.
             */
            private __removeFnFromStack(argCount);
        }
        /**
         * The Type for referencing the '$Tokenizer' injectable as a dependency.
         */
        function ITokenizer(): ITokenizer;
        /**
         * Describes an object used to find tokens for an expression and create
         * ITokens.
         */
        interface ITokenizer {
            /**
             * Takes in an expression string and outputs a tokenized collection of
             * ITokens.
             * @param {string} input The JavaScript expression string to tokenize.
             * ITokens.
             */
            createTokens(input: string): IToken[];
        }
        /**
         * Describes a single token in a string expression.
         */
        interface IToken {
            /**
             * The string or number value of the token.
             */
            val: any;
            /**
             * Denotes the type of token, as well as the number
             * of arguments for a function if it is the token.
             * If -2: Denotes a function name unless indexed into with [] or a ternary expression.
             * If -1: Denotes a variable or empty array literal.
             * If 0: Denotes a number, keyword, object indexer (.[]), string literal,
             *  function with 0 arguments, or empty object literal
             * If 1: Denotes a function type with 1 argument, a property on an object literal,
             *  an object literal with 1 property, or an array literal with 1 entry.
             * If > 1: Denotes a function type with args arguments, an object literal with
             *  args properties, or an array literal with args entries.
             */
            args: number;
        }
        /**
         * Provides all the necessary details on how to evaluate a token.
         */
        interface ITokenDetails {
            /**
             * The precedence that this token takes with respect to the
             * evaluation order.
             */
            precedence: number;
            /**
             * Whether or not the token associates with the expression on
             * their left or right.
             */
            associativity: string;
            /**
             * A function used to evaluate an operator expression.
             */
            fn: Function;
        }
        /**
         * A class for parsing JavaScript expression strings and creating
         * IParsedExpressions.
         */
        class Parser implements IParser {
            /**
             * Reference to the ITokenizer injectable.
             */
            public $Tokenizer: ITokenizer;
            /**
             * A single expression's token representation created by a ITokenizer.
             */
            public _tokens: IToken[];
            /**
             * An expression cache. Used so that a JavaScript expression is only ever parsed once.
             */
            private __cache;
            /**
             * A dynamically built string array that represents the evaluation function.
             */
            private __codeArray;
            /**
             * A list of all the identifiers discovered in the JavaScript expression string.
             */
            private __identifiers;
            /**
             * A temporary list of identifiers found used to build and evaluate each actual identifier.
             */
            private __tempIdentifiers;
            /**
             * An object whose keys represent a list of all unique aliases found in the JavaScript expression string.
             */
            private __aliases;
            /**
             * Parses a JavaScript expression string.
             * @param {string} expression The JavaScript expression string to parse.
             * information about the expression as well as a way to evaluate its value.
             */
            public parse(expression: string): IParsedExpression;
            /**
             * If a key is passed in, it clears that single value in the expression cache. If no
             * key is present, the entire expression cache will be cleared.
             * @param {string} key? An optional key that will clear its stored value in the expression
             * cache if passed in.
             */
            public clearCache(key?: string): void;
            /**
             * Evaluate the current IToken array.
             * @param {string} expression The JavaScript expression to evaluate.
             * information about the expression as well as a way to evaluate its value.
             */
            public _evaluate(expression: string): IParsedExpression;
            /**
             * Handles a token that is a primitive value.
             * @param {number} index The current index in the IToken array.
             * @param {string} token The current IToken value.
             * @param {number} args The current IToken args.
             */
            private __convertPrimitive(index, token, args);
            /**
             * Handles a potential function or object that needs to be indexed into.
             * @param {number} index The current index in the IToken array.
             * @param {string} token The current IToken value.
             * @param {boolean} useLocalContext Whether or not we need to use an already parsed object as the current context.
             */
            private __convertFunction(index, token, useLocalContext);
            /**
             * Handles an object literal.
             * @param {number} args The current IToken args.
             */
            private __convertObject(args);
            /**
             * Handles an Array literal.
             * @param {number} args The current IToken args.
             */
            private __convertArrayLiteral(args);
            /**
             * Handles an accessor type function token "()".
             * @param {number} index The current index in the IToken array.
             * @param {number} args The current IToken args.
             * @param {boolean} useLocalContext Whether or not we need to use an already parsed object as the current context.
             */
            private __handleFunction(index, args, useLocalContext);
            /**
             * Handles an accessor type token that is for indexing (i.e. "." or "[]").
             * @param {number} index The current index in the IToken array.
             * @param {string} token The current IToken value.
             * @param {boolean} useLocalContext Whether or not we need to use an already parsed object as the current context.
             */
            private __indexIntoObject(index, token, useLocalContext);
            /**
             * Handles the "?" operator.
             */
            private __handleQuestion();
            /**
             * Handles the ":" operator.
             */
            private __handleColon();
            /**
             * Handles all other operators.
             * @param {string} token The current IToken value.
             * @param {number} args The current IToken args.
             */
            private __handleOperator(token, args);
            /**
             * Safely finds an initial context.
             * @param {any} context The context object.
             * @param {any} aliases Any aliases that may exist.
             * @param {string} token The property used to find the initial context.
             * @param {any} undefined An undefined argument.
             */
            private __findInitialContext(context, aliases, token, undefined?);
            /**
             * Safely drills down into a specified context with a given token.
             * @param {any} context The context object.
             * @param {string} token The property used to drill into the context.
             * @param {any} undefined An undefined argument.
             */
            private __indexIntoContext(context, token, undefined?);
            /**
             * Peek at the next IToken.
             * @param {number} index The index before the desired IToken
             * in the array.
             * in the IToken array.
             */
            public _peek(index: number): IToken;
            /**
             * Look back at the previous IToken.
             * @param {number} index The index after the desired IToken
             * in the array.
             * in the IToken array.
             */
            public _lookBack(index: number): IToken;
            /**
             * Evaluate and remove the leftover identifiers.
             */
            public _popRemainingIdentifiers(): void;
            /**
             * Remove duplicate identifiers.
             */
            public _makeIdentifiersUnique(): void;
            /**
             * Check if the "val" property on an IToken
             * is present in a particular character string.
             * @param {plat.expressions.IToken} obj The IToken
             * with the "val" property to compare.
             * @param {string} char The char to compare with.
             */
            public _isValEqual(obj: IToken, char: string): boolean;
            /**
             * Check if the "val" property on an IToken
             * is not present in a particular character string.
             * @param {plat.expressions.IToken} obj The IToken
             * with the "val" property to compare.
             * @param {string} char The char to compare with.
             */
            public _isValUnequal(obj: any, char: string): boolean;
            /**
             * Resets all the parser's properties.
             */
            public _resetParser(): void;
            /**
             * Throws a fatal exception in the case of an error.
             * @param {string} error The error message to throw.
             */
            public _throwError(error: string): void;
        }
        /**
         * The Type for referencing the '$Parser' injectable as a dependency.
         */
        function IParser(): IParser;
        /**
         * Describes an object that can parse a JavaScript expression string and turn it into an
         * IParsedExpression.
         */
        interface IParser {
            /**
             * Parses a JavaScript expression string.
             * @param {string} expression The JavaScript expression string to parse.
             * information about the expression as well as a way to evaluate its value.
             */
            parse(expression: string): IParsedExpression;
            /**
             * If a key is passed in, it clears that single value in the expression cache. If no
             * key is present, the entire expression cache will be cleared.
             * @param {string} key? An optional key that will clear its stored value in the expression
             * cache if passed in.
             */
            clearCache(key?: string): void;
        }
        /**
         * Describes an object that is the result of parsing a JavaScript expression string. It contains detailed
         * information about the expression as well as a way to evaluate the expression with a context.
         */
        interface IParsedExpression {
            /**
             * A method for evaluating an expression with a context.
             * @param {any} context? The primary context for evaluation.
             * @param {any} aliases? An object containing resource alias values. All keys must begin with '@'.
             */
            evaluate(context?: any, aliases?: any): any;
            /**
             * The original expression string.
             */
            expression: string;
            /**
             * Contains all the identifiers found in an expression. Useful for determining
             * properties to watch on a context.
             */
            identifiers: string[];
            /**
             * Contains all the aliases (denoted by an identifier with '@' as the first character) for this
             * IParsedExpression.
             */
            aliases: string[];
            /**
             * Specifies whether or not you want to do a one-time binding on identifiers
             * for this expression. Typically this is added to a clone of this
             * IParsedExpression.
             */
            oneTime?: boolean;
        }
    }
    /**
     * Holds classes and interfaces related to web components in platypus.
     */
    module web {
        /**
         * The class that handles all interaction with the browser.
         */
        class Browser implements IBrowser {
            /**
             * The IBrowserConfig injectable object.
             */
            static config: IBrowserConfig;
            /**
             * Reference to the IEventManagerStatic injectable.
             */
            public $EventManagerStatic: events.IEventManagerStatic;
            /**
             * Reference to the ICompat injectable.
             */
            public $Compat: ICompat;
            /**
             * Reference to the IRegex injectable.
             */
            public $Regex: expressions.IRegex;
            /**
             * Reference to the Window injectable.
             */
            public $Window: Window;
            /**
             * Reference to the IDom injectable.
             */
            public $Dom: ui.IDom;
            /**
             * A unique string identifier.
             */
            public uid: string;
            /**
             * The browser's current URL.
             */
            private __currentUrl;
            /**
             * The browser's last URL.
             */
            private __lastUrl;
            /**
             * Whether or not the browser is in an initialization state.
             */
            private __initializing;
            /**
             * The constructor for a Browser. Assigns a uid and subscribes to the 'beforeLoad' event.
             */
            constructor();
            /**
             * Initializes the Browser instance, trims the url, and
             * adds events for popstate and hashchange.
             */
            public initialize(): void;
            /**
             * Sets or gets the current $Window.location
             * @param {string} url? The URL to set the location to.
             * @param {boolean} replace? Whether or not to replace the current URL in
             * the history.
             */
            public url(url?: string, replace?: boolean): string;
            /**
             * Creates a new IUrlUtilsInstance object.
             * @param url? The URL to associate with the new UrlUtils
             * instance.
             */
            public urlUtils(url?: string): IUrlUtilsInstance;
            /**
             * Checks to see if the requested URL is cross domain.
             * @param url The URL to verify whether or not it's cross domain.
             */
            public isCrossDomain(url: string): boolean;
            /**
             * The event to fire in the case of a URL change. It kicks
             * off a 'urlChanged' direct event notification.
             * @param url The URL to verify whether or not it's cross domain.
             */
            public _urlChanged(): void;
            /**
             * Checks for the existence of pushState and
             * sets the browser URL accordingly.
             * @param {string} url The URL to set.
             * @param {boolean} replace? Whether or not to replace the
             * current URL in the history.
             */
            public _setUrl(url: string, replace?: boolean): void;
            /**
             * Formats the URL in the case of HASH routing.
             * @param url The URL to format.
             */
            public _formatUrl(url: string): string;
        }
        /**
         * The Type for referencing the '$Browser' injectable as a dependency.
         */
        function IBrowser(): IBrowser;
        /**
         * Defines an object that handles interaction with the browser.
         */
        interface IBrowser {
            /**
             * A unique string identifier.
             */
            uid: string;
            /**
             * Initializes the Browser instance, trims the url, and
             * adds events for popstate and hashchange.
             */
            initialize(): void;
            /**
             * Sets or gets the current $Window.location
             * @param {string} url? The URL to set the location to.
             * @param {boolean} replace? Whether or not to replace the current URL in
             * the history.
             */
            url(url?: string, replace?: boolean): string;
            /**
             * Creates a new IUrlUtilsInstance object.
             * @param url? The URL to associate with the new UrlUtils
             * instance.
             */
            urlUtils(url?: string): IUrlUtilsInstance;
            /**
             * Checks to see if the requested URL is cross domain.
             * @param url The URL to verify whether or not it's cross domain.
             */
            isCrossDomain(url: string): boolean;
        }
        /**
         * The Type for referencing the '$BrowserConfig' injectable as a dependency.
         */
        function IBrowserConfig(): IBrowserConfig;
        /**
         * Specifies configuration properties for the IBrowser
         * injectable.
         */
        interface IBrowserConfig {
            /**
             * Specifies that the application will not be doing
             * url-based routing.
             */
            NONE: string;
            /**
             * Specifies that the application wants to use hash-based
             * routing.
             */
            HASH: string;
            /**
             * Specifies that the application wants to use the HTML5
             * popstate method for managing routing. If the browser
             * does not support HTML5 popstate events, hash routing
             * will be used instead.
             * Note: In 'state' mode, the web server must be configured to
             * route every url to the root url.
             */
            STATE: string;
            /**
             * Allows you to define how your app will route. There are
             * three modes, NONE ('none'), HASH ('hash'), and STATE ('state').
             * In NONE, the application will not be responding to
             * url changes.
             * In HASH, the application will use a hash prefix and
             * all navigation will be managed with hash changes.
             * In STATE mode, the application will use the 'popstate'
             * event and will be able to manage routes. The web server
             * must be configured to route every URL to the root URL if
             * using STATE mode.
             * The default mode is NONE.
             */
            routingType: string;
            /**
             * If routingType is set to HASH ('hash'), this value will be
             * appended to the '#' at the beginning of every route. The
             * default prefix is '!', meaning each path will be '#!/<path>'.
             */
            hashPrefix: string;
            /**
             * Specifies the base URL used to normalize URL routing.
             */
            baseUrl: string;
        }
        /**
         * Deals with obtaining detailed information about an
         * associated URL.
         */
        class UrlUtils implements IUrlUtilsInstance {
            /**
             * Helps with URL initialization through it's href attribute.
             */
            private static __urlUtilsElement;
            /**
             * Creates a query object out of the URL's query search string.
             * @param {string} search The URL's query search string.
             * representing the query string.
             */
            private static __getQuery(search);
            /**
             * Obtains the base URL for the app/site for doing STATE type routing.
             * @param {string} url The initial URL passed into the Browser.
             */
            private static __getBaseUrl(url);
            /**
             * Reference to the IContextManagerStatic injectable.
             */
            public $ContextManagerStatic: observable.IContextManagerStatic;
            /**
             * Reference to the Document injectable.
             */
            public $Document: Document;
            /**
             * Reference to the Window injectable.
             */
            public $Window: Window;
            /**
             * Reference to the ICompat injectable.
             */
            public $Compat: ICompat;
            /**
             * Reference to the IRegex injectable.
             */
            public $Regex: expressions.IRegex;
            /**
             * Reference to the IBrowserConfig injectable.
             */
            public $BrowserConfig: IBrowserConfig;
            /**
             * The whole associated URL.
             */
            public href: string;
            /**
             * The protocol scheme of the URL, including the final ':' of the associated URL.
             */
            public protocol: string;
            /**
             * The hostname and port of the associated URL.
             */
            public host: string;
            /**
             * The domain of the associated URL.
             */
            public hostname: string;
            /**
             * The port number of the associated URL.
             */
            public port: string;
            /**
             * The additional path value in the associated URL preceded by a '/'.
             * Removes the query string.
             */
            public pathname: string;
            /**
             * A '?' followed by the included parameters in the associated URL.
             */
            public search: string;
            /**
             * A '#' followed by the included hash fragments in the associated URL.
             */
            public hash: string;
            /**
             * The username specified before the domain name in the associated URL.
             */
            public username: string;
            /**
             * The password specified before the domain name in the associated URL.
             */
            public password: string;
            /**
             * The origin of the associated URL (its protocol, domain, and port).
             */
            public origin: string;
            /**
             * An object containing keyed query arguments from the associated URL.
             */
            public query: any;
            /**
             * The constructor for a UrlUtils instance.
             * Handles parsing the initial URL and obtain the base URL if necessary.
             */
            constructor();
            /**
             * Initializes and defines properties using
             * the input url.
             * @param {string} url The input to associate with this UrlUtils instance.
             */
            public initialize(url: string): void;
            /**
             * A toString function implementation for the UrlUtils class.
             */
            public toString(): string;
        }
        /**
         * The Type for referencing the '$UrlUtilsInstance' injectable as a dependency.
         */
        function IUrlUtilsInstance(): IUrlUtilsInstance;
        /**
         * Defines an object that deals with obtaining detailed information about an
         * associated URL.
         */
        interface IUrlUtilsInstance {
            /**
             * The whole associated URL.
             */
            href: string;
            /**
             * The protocol scheme of the URL, including the final ':' of the associated URL.
             */
            protocol: string;
            /**
             * The hostname and port of the associated URL.
             */
            host: string;
            /**
             * The domain of the associated URL.
             */
            hostname: string;
            /**
             * The port number of the associated URL.
             */
            port: string;
            /**
             * The additional path value in the associated URL preceded by a '/'.
             * Removes the query string.
             */
            pathname: string;
            /**
             * A '?' followed by the included parameters in the associated URL.
             */
            search: string;
            /**
             * A '#' followed by the included hash fragments in the associated URL.
             */
            hash: string;
            /**
             * The username specified before the domain name in the associated URL.
             */
            username?: string;
            /**
             * The password specified before the domain name in the associated URL.
             */
            password?: string;
            /**
             * The origin of the associated URL (its protocol, domain, and port).
             */
            origin?: string;
            /**
             * An object containing keyed query arguments from the associated URL.
             */
            query?: any;
            /**
             * Initializes and defines properties using
             * the input url.
             * @param {string} url The input to associate with this IUrlUtilsInstance.
             */
            initialize(url: string): void;
            /**
             * A toString function implementation for the IUrlUtilsInstance.
             */
            toString(): string;
        }
        /**
         * The class that handles route registration and navigation
         * to and from IViewControls within the
         * Routeport.
         */
        class Router implements IRouter {
            /**
             * Reference to the IBrowser injectable.
             */
            public $Browser: IBrowser;
            /**
             * Reference to the IBrowserConfig injectable.
             */
            public $BrowserConfig: IBrowserConfig;
            /**
             * Reference to the IEventManagerStatic injectable.
             */
            public $EventManagerStatic: events.IEventManagerStatic;
            /**
             * Reference to the INavigationEventStatic injectable.
             */
            public $NavigationEventStatic: events.INavigationEventStatic;
            /**
             * Reference to the ICompat injectable.
             */
            public $Compat: ICompat;
            /**
             * Reference to the IRegex injectable.
             */
            public $Regex: expressions.IRegex;
            /**
             * Reference to the Window injectable.
             */
            public $Window: Window;
            /**
             * A unique string identifier.
             */
            public uid: string;
            /**
             * The registered routes (as IRouteMatchers) for matching
             * on route change.
             */
            public _routes: IRouteMatcher[];
            /**
             * The function to stop listening to the 'urlChanged' event.
             */
            public _removeListener: IRemoveListener;
            /**
             * The registered default route ('') converted into an IMatchedRoute.
             * The default route is used whenever a specified route/url is not matched.
             */
            public _defaultRoute: IMatchedRoute;
            /**
             * The registered base route ('/') converted into an IMatchedRoute.
             * The base route is the first route navigated to in the Routeport if a
             * default route is not specified in its plat-options.
             */
            public _baseRoute: IMatchedRoute;
            /**
             * A regular expression for finding invalid characters in a route string.
             */
            private __escapeRegex;
            /**
             * A regular expression for finding optional parameters in a route string.
             */
            private __optionalRegex;
            /**
             * A regular expression for finding forward slashes at the beginning or end of
             * an expression.
             */
            private __pathSlashRegex;
            /**
             * States whether the specified route is the first attempt at routing.
             */
            private __firstRoute;
            /**
             * A virtual history stack used in IE based MS apps.
             */
            private __history;
            /**
             * The constructor for a Router. Assigns a uid and subscribes to the 'urlChanged' event.
             */
            constructor();
            /**
             * Registers route strings/RegExps and associates them with a control type.
             * @param {string} type The control type with which to associate the routes.
             * @param {Array<any>} routes An array of strings or RegExp expressions to associate with
             * the control type.
             */
            public registerRoutes(type: string, routes: any[]): void;
            /**
             * Formats a url path given the parameters and query string, then changes the
             * url to that path.
             * @param {string} path The route path to navigate to.
             * @param {plat.web.IRouteNavigationOptions} options? The IRouteNavigationOptions
             * included with this route.
             */
            public route(path: string, options?: IRouteNavigationOptions): boolean;
            /**
             * Navigates back in the history.
             * @param {number} length? The number of entries to go back in the history.
             */
            public goBack(length?: number): void;
            /**
             * Builds a valid route with a valid query string to use for navigation.
             * @param {string} routeParameter The route portion of the navigation path. Used to
             * match with a registered WebViewControl.
             * @param {plat.IObject<string>} query The route query object if passed into the
             * IRouteNavigationOptions.
             * both the fully evaluated route and the corresponding IMatchedRoute.
             */
            public _buildRoute(routeParameter: string, query: IObject<string>): {
                route: string;
                match: IMatchedRoute;
            };
            /**
             * Builds the query string if a query object was passed into
             * the IRouteNavigationOptions.
             * @param {plat.IObject<string>} query The query object passed in.
             */
            public _buildQueryString(query: IObject<string>): string;
            /**
             * The method called when the route function is invoked
             * or on a 'urlChanged' event.
             * @param {plat.events.IDispatchEventInstance} ev The 'urlChanged' event object.
             * @param {plat.web.IUrlUtilsInstance} utils The IUrlUtilsInstance
             * created for the invoked route function.
             */
            public _routeChanged(ev: events.IDispatchEventInstance, utils: IUrlUtilsInstance): void;
            /**
             * Registers a WebViewControl's route.
             * @param {any} route Can be either a string or RegExp.
             * @param {plat.dependency.IInjector<plat.ui.IBaseViewControl>} injector The injector for the
             * WebViewControl defined by the type.
             * @param {string} type The control type.
             */
            public _registerRoute(route: any, injector: dependency.IInjector<ui.IBaseViewControl>, type: string): void;
            /**
             * Parses the route and pulls out route parameters. Then
             * converts them to regular expressions to match for
             * routing.
             * @param {string} route The route to parse.
             * route with a BaseViewControl's injector.
             */
            public _getRouteParameters(route: string): IRouteMatcher;
            /**
             * Matches a route to a registered route using the
             * registered route's regular expression.
             * @param {plat.web.IUrlUtilsInstance} utils The utility used to obtain
             * the url fragment and the url query.
             * injector.
             */
            public _match(utils: IUrlUtilsInstance): IMatchedRoute;
            /**
             * Trims the first and last slash on the URL pathname and returns it.
             * @param {plat.web.IUrlUtilsInstance} utils The utility used to obtain
             * the url fragment.
             */
            public _getUrlFragment(utils: IUrlUtilsInstance): string;
        }
        /**
         * The Type for referencing the '$Router' injectable as a dependency.
         */
        function IRouter(): IRouter;
        /**
         * Describes the object that handles route registration and navigation
         * to and from IWebViewControls within a
         * Routeport.
         */
        interface IRouter {
            /**
             * A unique string identifier.
             */
            uid: string;
            /**
             * Registers route strings/RegExps and associates them with a control type.
             * @param {string} type The control type with which to associate the routes.
             * @param {Array<any>} routes An array of strings or RegExp expressions to associate with
             * the control type.
             */
            registerRoutes(type: string, routes: any[]): void;
            /**
             * Formats a url path given the parameters and query string, then changes the
             * url to that path.
             * @param {string} path The route path to navigate to.
             * @param {plat.web.IRouteNavigationOptions} options? The IRouteNavigationOptions
             * included with this route.
             */
            route(path: string, options?: IRouteNavigationOptions): boolean;
            /**
             * Navigates back in the history.
             * @param {number} length? The number of entries to go back in the history.
             */
            goBack(length?: number): void;
        }
        /**
         * Options that you can submit to the router in order
         * to customize navigation.
         */
        interface IRouteNavigationOptions extends navigation.IBaseNavigationOptions {
            /**
             * An object that includes the query parameters to be inserted into the route
             * as the query string.
             */
            query?: IObject<string>;
        }
        /**
         * Used by the navigator for matching a route with
         * a IBaseViewControl's injector.
         */
        interface IRouteMatcher {
            /**
             * The IBaseViewControl injector.
             */
            injector?: dependency.IInjector<ui.IBaseViewControl>;
            /**
             * The type of IBaseViewControl.
             */
            type?: string;
            /**
             * A regular expression to match with the url.
             */
            regex: RegExp;
            /**
             * Route arguments used to create route parameters
             * in the event of a url match.
             */
            args: string[];
        }
        /**
         * Provides a IInjector<IBaseViewControl> that matches
         * the given IRoute.
         */
        interface IMatchedRoute {
            /**
             * The associated IInjector<IBaseViewControl> for the route.
             */
            injector: dependency.IInjector<ui.IBaseViewControl>;
            /**
             * The type of IBaseViewControl.
             */
            type: string;
            /**
             * The route associated with this object's injector.
             */
            route?: IRoute<any>;
        }
        /**
         * Contains the parsed properties of a url.
         */
        interface IRoute<T extends {}> {
            /**
             * The defined parameters that were matched with the route.
             * When a route is registered, the registrant can specify named
             * route parameters. Those parameters will appear in this object
             * as key/value pairs.
             */
            parameters: T;
            /**
             * This property will always exist and will be equal to the full
             * route for navigation (only the path from root, not including
             * the query string).
             */
            path: string;
            /**
             * An object containing query string key/value pairs.
             */
            query?: any;
        }
    }
    /**
     * Holds all classes and interfaces related to async components in platypus.
     */
    module async {
        /**
         * Takes in a generic type corresponding to the fullfilled success type.
         */
        class Promise<R> implements IThenable<R> {
            /**
             * Holds all the subscriber promises
             */
            private __subscribers;
            /**
             * The state of the promise (fulfilled/rejected)
             */
            private __state;
            /**
             * The return detail of a promise.
             */
            private __detail;
            /**
             * The configuration for creating asynchronous promise flushing.
             */
            static config: {
                async: (callback: (arg?: IThenable<any>) => void, arg?: IThenable<any>) => void;
            };
            /**
             * Returns a promise that fulfills when every item in the array is fulfilled.
             * Casts arguments to promises if necessary. The result argument of the
             * returned promise is an array containing the fulfillment result arguments
             * in-order. The rejection argument is the rejection argument of the
             * first-rejected promise.
             * @param {Array<plat.async.IThenable<R>>} promises An array of promises, although every argument is potentially
             * cast to a promise meaning not every item in the array needs to be a promise.
             */
            static all<R>(promises: IThenable<R>[]): IThenable<R[]>;
            /**
             * Returns a promise that fulfills when every item in the array is fulfilled.
             * Casts arguments to promises if necessary. The result argument of the
             * returned promise is an array containing the fulfillment result arguments
             * in-order. The rejection argument is the rejection argument of the
             * first-rejected promise.
             * @param {Array<R>} promises An array of objects, if an object is not a promise, it will be cast.
             */
            static all<R>(promises: R[]): IThenable<R[]>;
            /**
             * Creates a promise that fulfills to the passed in object. If the
             * passed-in object is a promise it returns the promise.
             * @param object The object to cast to a Promise.
             */
            static cast<R>(object?: R): Promise<R>;
            /**
             * Returns a promise that fulfills as soon as any of the promises fulfill,
             * or rejects as soon as any of the promises reject (whichever happens first).
             * @param {Array<plat.async.IThenable<R>>} promises An Array of promises to 'race'.
             * promises fulfilled.
             */
            static race<R>(promises: IThenable<R>[]): IThenable<R>;
            /**
             * Returns a promise that fulfills as soon as any of the promises fulfill,
             * or rejects as soon as any of the promises reject (whichever happens first).
             * @param {Array<R>} promises An Array of anything to 'race'. Objects that aren't promises will
             * be cast.
             * promises fulfilled.
             */
            static race<R>(promises: R[]): IThenable<R>;
            /**
             * Returns a promise that resolves with the input value.
             * @param {R} value? The value to resolve.
             */
            static resolve<R>(value?: R): IThenable<R>;
            /**
             * Returns a promise that rejects with the input value.
             * @param {any} error The value to reject.
             */
            static reject(error?: any): IThenable<any>;
            /**
             * Invokes the resolve function for a promise. Handles error catching.
             * @param {plat.async.IResolveFunction<R>} resolveFunction The resolve function to invoke.
             * @param {plat.async.Promise<R>} promise The promise on which to invoke the resolve function.
             */
            private static __invokeResolveFunction<R>(resolveFunction, promise);
            /**
             * Invokes a callback for a promise with the specified detail.
             * @param {plat.async.State} settled The state of the promise.
             * @param {any} promise The promise object.
             * @param {(response: any) => void} callback The callback to invoke.
             * @param {any} detail The details to pass to the callback.
             */
            private static __invokeCallback(settled, promise, callback, detail);
            /**
             * Publishes the promise details to all the subscribers for a promise.
             * @param {any} promise The promise object.
             * @param {plat.async.State} settled The state of the promise.
             */
            private static __publish(promise, settled);
            /**
             * Publishes a promises that has been fulfilled.
             * @param {any} promise The promise object.
             */
            private static __publishFulfillment(promise);
            /**
             * Publishes a promises that has been rejected.
             * @param {any} promise The promise object.
             */
            private static __publishRejection(promise);
            /**
             * Asynchronously rejects a promise
             * @param {any} promise The promise object.
             * @param {any} reason The detail of the rejected promise.
             */
            private static __reject(promise, reason);
            /**
             * Asynchronously fulfills a promise
             * @param {plat.async.Promise<R>} promise The promise object.
             * @param {any} value The detail of the fulfilled promise.
             */
            private static __fulfill<R>(promise, value);
            /**
             * Asynchronously fulfills a promise, allowing for promise chaining.
             * @param {plat.async.Promise<R>} promise The promise object.
             * @param {any} value The detail of the fulfilled promise.
             */
            private static __resolve<R>(promise, value);
            /**
             * Handles chaining promises together, when a promise is returned from within a then handler.
             * @param {plat.async.Promise<R>} promise The promise object.
             * @param {plat.async.Promise<R>} value The next promise to await.
             */
            private static __handleThenable<R>(promise, value);
            /**
             * Adds a child promise to the parent's subscribers.
             * @param {plat.async.Promise<any>} parent The parent promise.
             * @param {plat.async.Promise<any>} value The child promise.
             * @param {(success: any) => any} onFullfilled The fulfilled method for the child.
             * @param {(error: any) => any} onRejected The rejected method for the child.
             */
            private static __subscribe(parent, child, onFulfilled, onRejected);
            /**
             * An ES6 implementation of the Promise API. Useful for asynchronous programming.
             * Takes in 2 generic types corresponding to the fullfilled success and error types.
             * The error type (U) should extend Error in order to get proper stack tracing.
             * @param {plat.async.IResolveFunction<R>} resolveFunction A IResolveFunction for fulfilling/rejecting the Promise.
             */
            constructor(resolveFunction: IResolveFunction<R>);
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * @param {(success: R) => plat.async.IThenable<U>} onFulfilled A method called when/if the promise fulills. If undefined the next
             * onFulfilled method in the promise chain will be called.
             * @param {(error: any) => plat.async.IThenable<U>} onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            public then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => IThenable<U>): IThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * @param {(success: R) => plat.async.IThenable<U>} onFulfilled A method called when/if the promise fulills. If undefined the next
             * onFulfilled method in the promise chain will be called.
             * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            public then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => U): IThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * @param {(success: R) => U} onFulfilled A method called when/if the promise fulills. If undefined the next
             * onFulfilled method in the promise chain will be called.
             * @param {(error: any) => plat.async.IThenable<U>} onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            public then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => IThenable<U>): IThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * @param {(success: R) => U} onFulfilled A method called when/if the promise fulills. If undefined the next
             * onFulfilled method in the promise chain will be called.
             * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            public then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => U): IThenable<U>;
            /**
             * A wrapper method for Promise.then(undefined, onRejected);
             * @param {(error: any) => plat.async.IThenable<U>} onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            public catch<U>(onRejected: (error: any) => IThenable<U>): IThenable<U>;
            /**
             * A wrapper method for Promise.then(undefined, onRejected);
             * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            public catch<U>(onRejected: (error: any) => U): IThenable<U>;
            /**
             * Outputs the Promise as a readable string.
             */
            public toString(): string;
        }
        /**
         * Describes a chaining function that fulfills when the previous link is complete and is
         * able to be caught in the case of an error.
         */
        interface IThenable<R> {
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * @param {(success: R) => plat.async.IThenable<U>} onFulfilled A method called when/if the promise fulills. If undefined the next
             * onFulfilled method in the promise chain will be called.
             * @param {(error: any) => plat.async.IThenable<U>} onRejected? A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => IThenable<U>): IThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * @param {(success: R) => plat.async.IThenable<U>} onFulfilled A method called when/if the promise fulills. If undefined the next
             * onFulfilled method in the promise chain will be called.
             * @param {(error: any) => U} onRejected? A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => U): IThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * @param {(success: R) => U} onFulfilled A method called when/if the promise fulills. If undefined the next
             * onFulfilled method in the promise chain will be called.
             * @param {(error: any) => plat.async.IThenable<U>} onRejected? A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => IThenable<U>): IThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * @param {(success: R) => U} onFulfilled A method called when/if the promise fulills. If undefined the next
             * onFulfilled method in the promise chain will be called.
             * @param {(error: any) => U} onRejected? A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => U): IThenable<U>;
            /**
             * A wrapper method for Promise.then(undefined, onRejected);
             * @param {(error: any) => plat.async.IThenable<U>} onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            catch<U>(onRejected: (error: any) => IThenable<U>): IThenable<U>;
            /**
             * A wrapper method for Promise.then(undefined, onRejected);
             * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            catch<U>(onRejected: (error: any) => U): IThenable<U>;
        }
        /**
         * Describes a function passed into the constructor for a Promise. The function allows you to
         * resolve/reject the Promise.
         */
        interface IResolveFunction<R> {
            /**
             * A function which allows you to resolve/reject a Promise.
             * @param resolve A method for resolving a Promise. If you pass in a 'thenable' argument
             * (meaning if you pass in a Promise-like object), then the promise will resolve with the
             * outcome of the object. Else the promise will resolve with the argument.
             * @param reject A method for rejecting a promise. The argument should be an instancof Error
             * to assist with debugging. If a method in the constructor for a Promise throws an error,
             * the promise will reject with the error.
             */
            (resolve: (value?: R) => void, reject: (reason?: any) => void): void;
        }
        /**
         * The Type for referencing the '$Promise' injectable as a dependency.
         */
        function IPromise($Window?: any): IPromise;
        /**
         * The injectable reference for the ES6 Promise implementation.
         */
        interface IPromise {
            /**
             * An ES6 implementation of the Promise API. Useful for asynchronous programming.
             * Takes in 2 generic types corresponding to the fullfilled success and error types.
             * The error type (U) should extend Error in order to get proper stack tracing.
             * @param {plat.async.IResolveFunction<R>} resolveFunction A IResolveFunction for fulfilling/rejecting the Promise.
             */
            new<R>(resolveFunction: IResolveFunction<R>): IThenable<R>;
            /**
             * Returns a promise that fulfills when every item in the array is fulfilled.
             * Casts arguments to promises if necessary. The result argument of the
             * returned promise is an array containing the fulfillment result arguments
             * in-order. The rejection argument is the rejection argument of the
             * first-rejected promise.
             * @param {Array<plat.async.IThenable<R>>} promises An array of promises, although every argument is potentially
             * cast to a promise meaning not every item in the array needs to be a promise.
             */
            all<R>(promises: IThenable<R>[]): IThenable<R[]>;
            /**
             * Returns a promise that fulfills when every item in the array is fulfilled.
             * Casts arguments to promises if necessary. The result argument of the
             * returned promise is an array containing the fulfillment result arguments
             * in-order. The rejection argument is the rejection argument of the
             * first-rejected promise.
             * @param {Array<R>} promises An array of objects, if an object is not a promise, it will be cast.
             */
            all<R>(promises: R[]): IThenable<R[]>;
            /**
             * Creates a promise that fulfills to the passed in object. If the
             * passed-in object is a promise it returns the promise.
             * @param {R} object The object to cast to a Promise.
             */
            cast<R>(object?: R): IThenable<R>;
            /**
             * Returns a promise that fulfills as soon as any of the promises fulfill,
             * or rejects as soon as any of the promises reject (whichever happens first).
             * @param {Array<plat.async.IThenable<R>>} promises An Array of promises to 'race'.
             * promises fulfilled.
             */
            race<R>(promises: IThenable<R>[]): IThenable<R>;
            /**
             * Returns a promise that fulfills as soon as any of the promises fulfill,
             * or rejects as soon as any of the promises reject (whichever happens first).
             * @param {Array<R>} promises An Array of anything to 'race'. Objects that aren't promises will
             * be cast.
             * promises fulfilled.
             */
            race<R>(promises: R[]): IThenable<R>;
            /**
             * Returns a promise that resolves with the input value.
             * @param {R} value? The value to resolve.
             */
            resolve<R>(value?: R): IThenable<R>;
            /**
             * Returns a promise that rejects with the input value.
             * @param {any} value The value to reject.
             */
            reject(error: any): IThenable<any>;
        }
        /**
         * HttpRequest provides a wrapper for the XMLHttpRequest object. Allows for
         * sending AJAX requests to a server. This class does not support
         * synchronous requests.
         */
        class HttpRequest implements IHttpRequest {
            /**
             * The timeout ID associated with the specified timeout
             */
            public clearTimeout: IRemoveListener;
            /**
             * The created XMLHttpRequest
             */
            public xhr: XMLHttpRequest;
            /**
             * The JSONP callback name
             */
            public jsonpCallback: string;
            /**
             * The plat.web.IBrowser injectable instance
             */
            public $Browser: web.IBrowser;
            /**
             * The injectable instance of type Window
             */
            public $Window: Window;
            /**
             * The injectable instance of type Document
             */
            public $Document: Document;
            /**
             * The configuration for an HTTP Request
             */
            public $config: IHttpConfig;
            /**
             * Whether or not the browser supports the File API.
             */
            private __fileSupported;
            /**
             * The configuration for the specific HTTP Request
             */
            private __options;
            /**
             * The constructor for a HttpRequest.
             * @param {plat.async.IHttpConfig} options The IHttpConfigStatic used to customize this HttpRequest.
             */
            constructor(options: IHttpConfig);
            /**
             * Executes an XMLHttpRequest and resolves an IAjaxPromise upon completion.
             */
            public execute<R>(): IAjaxPromise<R>;
            /**
             * Executes an JSONP request and resolves an IAjaxPromise upon completion.
             */
            public executeJsonp<R>(): IAjaxPromise<R>;
            /**
             * A wrapper for the XMLHttpRequest's onReadyStateChanged callback.
             * return true in the case of a success and false in the case of
             * an error.
             */
            public _xhrOnReadyStateChange(): boolean;
            /**
             * The function that initializes and sends the XMLHttpRequest.
             * formatted IAjaxResponse and rejects if there is a problem with an
             * IAjaxError.
             */
            public _sendXhrRequest(): IAjaxPromise<any>;
            /**
             * Returns a promise that is immediately rejected due to an error.
             * with an IAjaxError
             */
            public _invalidOptions(): IAjaxPromise<any>;
            /**
             * The function that formats the response from the XMLHttpRequest.
             * @param {string} responseType The user designated responseType
             * @param {boolean} success Signifies if the response was a success
             * the requester.
             */
            public _formatResponse(responseType: string, success: boolean): IAjaxResponse<any>;
            /**
             * Sets the headers for an XMLHttpRequest
             */
            private __setHeaders();
            /**
             * Serializes multipart form data in an XMLHttpRequest as a string.
             */
            private __serializeFormData();
            /**
             * Creates FormData to add to the XMLHttpRequest.
             */
            private __appendFormData();
            /**
             * Handles submitting multipart form data using an iframe.
             */
            private __submitFramedFormData();
            /**
             * Creates input for form data submissions.
             */
            private __createInput(key, val);
        }
        /**
         * IHttpRequest provides a wrapper for the XMLHttpRequest object. Allows for
         * sending AJAX requests to a server.
         */
        interface IHttpRequest {
            /**
             * The timeout ID associated with the specified timeout
             */
            clearTimeout?: IRemoveListener;
            /**
             * The created XMLHttpRequest
             */
            xhr?: XMLHttpRequest;
            /**
             * The JSONP callback name
             */
            jsonpCallback?: string;
            /**
             * Executes an XMLHttpRequest and resolves an IAjaxPromise upon completion.
             */
            execute<R>(): IAjaxPromise<R>;
            /**
             * Executes an JSONP request and resolves an IAjaxPromise upon completion.
             */
            executeJsonp<R>(): IAjaxPromise<R>;
        }
        /**
         * Describes an object which contains Ajax configuration properties.
         */
        interface IHttpConfig extends IJsonpConfig {
            /**
             * The HTTP method type of XmlHttpRequest such as 'GET', 'POST', 'PUT',
             * 'DELETE', etc. Ignored for non-HTTP urls. Defaults to 'GET'.
             */
            method?: string;
            /**
             * The number of milliseconds a request can take before
             * automatically being terminated. A value of 0
             * means there is no timeout.
             */
            timeout?: number;
            /**
             * An optional user string for the XmlHttpRequest
             */
            user?: string;
            /**
             * An optional password string for the XmlHttpRequest
             */
            password?: string;
            /**
             * The XMLHttpRequestResponseType. The response should
             * still be checked when received due to browser
             * incompatibilities. If a browser does not support a
             * response type it will return the value as a string.
             * The response type does not affect JSONP callback
             * arguments.
             */
            responseType?: string;
            /**
             * The Content-Type header for XMLHttpRequest when
             * data is being sent. The default is
             * 'application/json;charset=utf-8;'.
             */
            contentType?: string;
            /**
             * A string to override the MIME type returned by the server.
             */
            overrideMimeType?: string;
            /**
             * A key/value pair object where the key is a DOMString header key
             * and the value is the DOMString header value.
             */
            headers?: any;
            /**
             * Indicates whether or not cross-site Access-Control requests
             * should be made using credentials such as cookies or
             * authorization headers. The default is false.
             */
            withCredentials?: boolean;
            /**
             * The request payload
             */
            data?: any;
            /**
             * An array of data transform functions that fire in order and consecutively
             * pass the returned result from one function to the next.
             */
            transforms?: IHttpTransformFunction[];
            /**
             * Forces a JSONP, cross-domain request when set to true.
             * The default is false.
             */
            isCrossDomain?: boolean;
        }
        /**
         * A function that is used to transform XMLHttpRequest data.
         */
        interface IHttpTransformFunction {
            /**
             * The method signature for IHttpTransformFunction.
             * @param {any} data The data for the XMLHttpRequest.
             * @param {XMLHttpRequest} xhr The XMLHttpRequest for the data.
             */
            (data: any, xhr: XMLHttpRequest): any;
        }
        /**
         * Describes an object which contains JSONP configuration properties.
         */
        interface IJsonpConfig {
            /**
             * The url for the JSONP callback
             * (without the `?{callback}={callback_name}` parameter in the url)
             * or for the XmlHttpRequest.
             */
            url: string;
            /**
             * The identifier the server uses to get the name of the JSONP
             * callback. The default is 'callback' as seen in
             * http://www.platyfi.com/data?callback=plat_fnName.
             */
            jsonpIdentifier?: string;
            /**
             * A specified name for the JSONP callback (in case the server has
             * it hardcoded and/or does not get it from the given url). The
             * default is a unique plat id generated separately for
             * each JSONP callback seen as 'plat_callback00' in
             * http://www.platyfi.com/data?callback=plat_callback00.
             */
            jsonpCallback?: string;
        }
        /**
         * Describes an object that is the response to an AJAX request.
         */
        interface IAjaxResponse<R> {
            /**
             * The AJAX response or responseText. The response should
             * be checked when received due to browser
             * incompatibilities with responseType. If a browser does
             * not support a response type it will return the value as
             * a string.
             */
            response: R;
            /**
             * The XHR status. Resolves as 200 for JSONP.
             */
            status: number;
            /**
             * A method for getting the XHR response headers.
             */
            getAllResponseHeaders?: () => string;
            /**
             * The XMLHttpRequest object associated with the AJAX call
             */
            xhr?: XMLHttpRequest;
        }
        /**
         * Describes the AjaxPromise's resolve function
         */
        interface IAjaxResolveFunction<R> {
            /**
             * The method signature for an IAjaxResolveFunction.
             * @param {(value?: plat.async.IAjaxResponse<R>) => any} resolve The function to call when the
             * AJAX call has successfully fulfilled.
             * @param {(reason?: plat.async.IAjaxError) => any} reject The function to call when the
             * AJAX call fails.
             */
            (resolve: (value?: IAjaxResponse<R>) => any, reject: (reason?: IAjaxError) => any): void;
        }
        /**
         * Describes an object that forms an Error object with an IAjaxResponse.
         */
        interface IAjaxError extends Error, IAjaxResponse<any> {
        }
        /**
         * Describes a type of Promise that fulfills with an IAjaxResponse and can be optionally cancelled.
         */
        class AjaxPromise<R> extends Promise<IAjaxResponse<R>> implements IAjaxPromise<R> {
            /**
             * The Window object.
             */
            public $Window: Window;
            /**
             * The HttpRequest object.
             */
            private __http;
            /**
             * The constructor method for the {@link plat.async.AjaxPromise}.
             * @param {plat.async.IAjaxResolveFunction} resolveFunction The promise resolve function.
             */
            constructor(resolveFunction: IAjaxResolveFunction<R>);
            /**
             * The constructor method for the {@link plat.async.AjaxPromise}.
             * @param {plat.async.IAjaxResolveFunction} resolveFunction The promise resolve function.
             * @param {any} promise The promise object to allow for cancelling the {@link plat.async.AjaxPromise}.
             */
            constructor(resolveFunction: IAjaxResolveFunction<R>, promise: any);
            /**
             * A method to initialize this AjaxPromise, passing it the
             * associated IHttpRequest.
             * @param {plat.async.IHttpRequest} http The http request for this promise.
             */
            public initialize(http: IHttpRequest): void;
            /**
             * A method to cancel the AJAX call associated with this AjaxPromise.
             */
            public cancel(): void;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * next then method in the promise chain.
             * @param {(success: plat.async.IAjaxResponse<R>) => plat.async.IAjaxThenable<U>} onFulfilled A method called when/if the promise fulfills.
             * If undefined the next onFulfilled method in the promise chain will be called.
             * @param {(error: plat.async.IAjaxError) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
             * If undefined the next onRejected method in the promise chain will be called.
             */
            public then<U>(onFulfilled: (success: IAjaxResponse<R>) => U, onRejected?: (error: IAjaxError) => any): IAjaxThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * next then method in the promise chain.
             * @param {(success: plat.async.IAjaxResponse<R>) => plat.async.IAjaxThenable<U>} onFulfilled A method called when/if the promise fulfills.
             * If undefined the next onFulfilled method in the promise chain will be called.
             * @param {(error: plat.async.IAjaxError) => U} onRejected A method called when/if the promise rejects.
             * If undefined the next onRejected method in the promise chain will be called.
             */
            public then<U>(onFulfilled: (success: IAjaxResponse<R>) => IThenable<U>, onRejected?: (error: IAjaxError) => IThenable<U>): IAjaxThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * next then method in the promise chain.
             * @param {(success: plat.async.IAjaxResponse<R>) => U} onFulfilled A method called when/if the promise fulfills.
             * If undefined the next onFulfilled method in the promise chain will be called.
             * @param {(error: plat.async.IAjaxError) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
             * If undefined the next onRejected method in the promise chain will be called.
             */
            public then<U>(onFulfilled: (success: IAjaxResponse<R>) => IThenable<U>, onRejected?: (error: IAjaxError) => any): IAjaxThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * next then method in the promise chain.
             * @param {(success: plat.async.IAjaxResponse<R>) => U} onFulfilled A method called when/if the promise fulfills.
             * If undefined the next onFulfilled method in the promise chain will be called.
             * @param {(error: plat.async.IAjaxError) => U} onRejected A method called when/if the promise rejects.
             * If undefined the next onRejected method in the promise chain will be called.
             */
            public then<U>(onFulfilled: (success: IAjaxResponse<R>) => U, onRejected?: (error: IAjaxError) => IThenable<U>): IAjaxThenable<U>;
            /**
             * A wrapper method for Promise.then(undefined, onRejected);
             * @param {(error: any) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            public catch<U>(onRejected: (error: any) => IAjaxThenable<U>): IAjaxThenable<U>;
            /**
             * A wrapper method for Promise.then(undefined, onRejected);
             * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            public catch<U>(onRejected: (error: any) => U): IAjaxThenable<U>;
        }
        /**
         * Describes a type of IThenable that can optionally cancel it's associated AJAX call.
         */
        interface IAjaxThenable<R> extends IThenable<R> {
            /**
             * A method to cancel the AJAX call associated with this {@link plat.async.AjaxPromise}.
             */
            cancel(): void;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * next then method in the promise chain.
             * @param {(success: R) => plat.async.IAjaxThenable<U>} onFulfilled A method called when/if the promise fulfills.
             * If undefined the next onFulfilled method in the promise chain will be called.
             * @param {(error: any) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
             * If undefined the next onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => IThenable<U>): IAjaxThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * next then method in the promise chain.
             * @param {(success: R) => plat.async.IAjaxThenable<U>} onFulfilled A method called when/if the promise fulfills.
             * If undefined the next onFulfilled method in the promise chain will be called.
             * @param {(error: any) => U} onRejected A method called when/if the promise rejects.
             * If undefined the next onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => U): IAjaxThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * next then method in the promise chain.
             * @param {(success: R) => U} onFulfilled A method called when/if the promise fulfills.
             * If undefined the next onFulfilled method in the promise chain will be called.
             * @param {(error: any) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
             * If undefined the next onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => IThenable<U>): IAjaxThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * next then method in the promise chain.
             * @param {(success: R) => U} onFulfilled A method called when/if the promise fulfills.
             * If undefined the next onFulfilled method in the promise chain will be called.
             * @param {(error: any) => U} onRejected A method called when/if the promise rejects.
             * If undefined the next onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => U): IAjaxThenable<U>;
            /**
             * A wrapper method for Promise.then(undefined, onRejected);
             * @param {(error: any) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
             * If undefined the next onRejected method in the promise chain will be called.
             */
            catch<U>(onRejected: (error: any) => IThenable<U>): IAjaxThenable<U>;
            /**
             * A wrapper method for Promise.then(undefined, onRejected);
             * @param {(error: any) => U} onRejected A method called when/if the promise rejects.
             * If undefined the next onRejected method in the promise chain will be called.
             */
            catch<U>(onRejected: (error: any) => U): IAjaxThenable<U>;
        }
        /**
         * Describes a type of IPromise that fulfills with an IAjaxResponse and can be optionally cancelled.
         */
        interface IAjaxPromise<R> extends IAjaxThenable<IAjaxResponse<R>> {
            /**
             * A method to initialize this AjaxPromise, passing it the
             * associated IHttpRequest.
             * @param {plat.async.IHttpRequest} http The http request for this promise.
             */
            initialize(http: IHttpRequest): void;
            /**
             * A method to cancel the AJAX call associated with this {@link plat.async.AjaxPromise}.
             */
            cancel(): void;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * next then method in the promise chain.
             * @param {(success: plat.async.IAjaxResponse<R>) => plat.async.IAjaxThenable<U>} onFulfilled A method called when/if the promise fulfills.
             * If undefined the next onFulfilled method in the promise chain will be called.
             * @param {(error: plat.async.IAjaxError) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
             * If undefined the next onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: IAjaxResponse<R>) => IAjaxThenable<U>, onRejected?: (error: IAjaxError) => IAjaxThenable<U>): IAjaxThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * next then method in the promise chain.
             * @param {(success: plat.async.IAjaxResponse<R>) => plat.async.IAjaxThenable<U>} onFulfilled A method called when/if the promise fulfills.
             * If undefined the next onFulfilled method in the promise chain will be called.
             * @param {(error: plat.async.IAjaxError) => U} onRejected A method called when/if the promise rejects.
             * If undefined the next onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: IAjaxResponse<R>) => IAjaxThenable<U>, onRejected?: (error: IAjaxError) => U): IAjaxThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * next then method in the promise chain.
             * @param {(success: plat.async.IAjaxResponse<R>) => U} onFulfilled A method called when/if the promise fulfills.
             * If undefined the next onFulfilled method in the promise chain will be called.
             * @param {(error: plat.async.IAjaxError) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
             * If undefined the next onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: IAjaxResponse<R>) => U, onRejected?: (error: IAjaxError) => IAjaxThenable<U>): IAjaxThenable<U>;
            /**
             * Takes in two methods, called when/if the promise fulfills/rejects.
             * next then method in the promise chain.
             * @param {(success: plat.async.IAjaxResponse<R>) => U} onFulfilled A method called when/if the promise fulfills.
             * If undefined the next onFulfilled method in the promise chain will be called.
             * @param {(error: plat.async.IAjaxError) => U} onRejected A method called when/if the promise rejects.
             * If undefined the next onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: IAjaxResponse<R>) => U, onRejected?: (error: IAjaxError) => U): IAjaxThenable<U>;
            /**
             * A wrapper method for Promise.then(undefined, onRejected);
             * @param {(error: plat.async.IAjaxError) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
             * If undefined the next onRejected method in the promise chain will be called.
             */
            catch<U>(onRejected: (error: IAjaxError) => IAjaxThenable<U>): IAjaxThenable<U>;
            /**
             * A wrapper method for Promise.then(undefined, onRejected);
             * @param {(error: plat.async.IAjaxError) => U} onRejected A method called when/if the promise rejects.
             * If undefined the next onRejected method in the promise chain will be called.
             */
            catch<U>(onRejected: (error: IAjaxError) => U): IAjaxThenable<U>;
        }
        /**
         * Describes an object that provides value mappings for XMLHttpRequestResponseTypes
         */
        interface IHttpResponseType {
            /**
             * The default response type (empty string)
             */
            DEFAULT: string;
            /**
             * The arrayBuffer type ('arrayBuffer')
             */
            ARRAYBUFFER: string;
            /**
             * The blob type ('blob')
             */
            BLOB: string;
            /**
             * The document type ('document')
             */
            DOCUMENT: string;
            /**
             * The json type ('json')
             */
            JSON: string;
            /**
             * The text type ('text')
             */
            TEXT: string;
        }
        /**
         * Describes an object that provides Content-Type mappings for Http POST requests.
         */
        interface IHttpContentType {
            /**
             * Standard denotation for form encoded data. All objects are converted
             * to string key-value pairs.
             */
            ENCODED_FORM: string;
            /**
             * Standard denotation for JavaScript Object Notation (JSON).
             */
            JSON: string;
            /**
             * Standard denotation for a multi-part Webform. Associated with
             * an entype of 'multipart/form-data'.
             */
            MULTIPART_FORM: string;
            /**
             * Standard denotation for arbitrary binary data.
             */
            OCTET_STREAM: string;
            /**
             * Standard denotation for XML files.
             */
            XML: string;
            /**
             * Standard denotation for textual data.
             */
            PLAIN_TEXT: string;
            /**
             * Standard denotation for HTML.
             */
            HTML: string;
        }
        /**
         * The instantiated class of the injectable for making
         * AJAX requests.
         */
        class Http implements IHttp {
            /**
             * Default Http config
             */
            static config: IHttpConfig;
            /**
             * Provides value mappings for XMLHttpRequestResponseTypes
             */
            public responseType: IHttpResponseType;
            /**
             * Provides Content-Type mappings for Http POST requests.
             */
            public contentType: IHttpContentType;
            /**
             * A wrapper method for the Http class that creates and executes a new Http with
             * the specified IHttpConfig. This function will check if
             * XMLHttpRequest level 2 is present, and will default to JSONP if it isn't and
             * the request is cross-domain.
             * @param {plat.async.IHttpConfig} options The IHttpConfig for either the XMLHttpRequest
             * or the JSONP callback.
             * or rejected, will return an IAjaxResponse object.
             */
            public ajax<R>(options: IHttpConfig): IAjaxPromise<R>;
            /**
             * A direct method to force a cross-domain JSONP request.
             * @param {plat.async.IJsonpConfig} options The IJsonpConfig
             * IAjaxResponse object.
             */
            public jsonp<R>(options: IJsonpConfig): IAjaxPromise<R>;
            /**
             * Makes an ajax request, specifying responseType: 'json'.
             * @param {plat.async.IHttpConfig} options The IHttpConfig
             * for either the XMLHttpRequest or the JSONP callback.
             * will return an IAjaxResponse object, with the response
             * being a parsed JSON object (assuming valid JSON).
             */
            public json<R>(options: IHttpConfig): IAjaxPromise<R>;
        }
        /**
         * The Type for referencing the '$Http' injectable as a dependency.
         */
        function IHttp(): IHttp;
        /**
         * The interface of the injectable for making
         * AJAX requests.
         */
        interface IHttp {
            /**
             * Provides value mappings for
             * XMLHttpRequestResponseTypes
             */
            responseType: IHttpResponseType;
            /**
             * Provides Content-Type mappings for Http POST requests.
             */
            contentType: IHttpContentType;
            /**
             * A wrapper method for the Http class that creates and executes a new Http with
             * the specified IHttpConfig. This function will check if
             * XMLHttpRequest level 2 is present, and will default to JSONP if it isn't and
             * the request is cross-domain.
             * @param {plat.async.IHttpConfig} options The IHttpConfig for either the XMLHttpRequest
             * or the JSONP callback.
             * or rejected, will return an IAjaxResponse object.
             */
            ajax<R>(options: IHttpConfig): IAjaxPromise<R>;
            /**
             * A direct method to force a cross-domain JSONP request.
             * @param {plat.async.IJsonpConfig} options The IJsonpConfig
             * IAjaxResponse object.
             */
            jsonp? <R>(options: IJsonpConfig): IAjaxPromise<R>;
            /**
             * Makes an ajax request, specifying responseType: 'json'.
             * @param {plat.async.IHttpConfig} options The IHttpConfig
             * for either the XMLHttpRequest or the JSONP callback.
             * will return an IAjaxResponse object, with the response
             * being a parsed JSON object (assuming valid JSON).
             */
            json? <R>(options: IHttpConfig): IAjaxPromise<R>;
        }
        /**
         * The Type for referencing the '$HttpConfig' injectable as a dependency.
         */
        function IHttpConfig(): IHttpConfig;
    }
    /**
     * Holds classes and interfaces related to storage in platypus.
     */
    module storage {
        /**
         * A Cache class, for use with the ICacheFactory injectable.
         * Used for storing objects. Takes in a generic type corresponding to the type of objects it contains.
         */
        class Cache<T> implements ICache<T> {
            /**
             * Method for creating a new cache object. Takes a generic type to denote the
             * type of objects stored in the new cache.  If a cache with the same ID already exists
             * in the ICacheFactory, a new cache will not be created.
             * @param {string} id The ID of the new Cache.
             * @param {plat.storage.ICacheOptions} options ICacheOptions
             * for customizing the Cache.
             */
            static create<T>(id: string, options?: ICacheOptions): ICache<T>;
            /**
             * Gets a cache out of the ICacheFactory if it exists.
             * @param {string} id The identifier used to search for the cache.
             */
            static fetch<T>(id: string): ICache<T>;
            /**
             * Clears the ICacheFactory and all of its caches.
             */
            static clear(): void;
            /**
             * The size of this cache specified by its ID.
             */
            private __size;
            /**
             * The ID of this cache.
             */
            private __id;
            /**
             * The options for this cache.
             */
            private __options;
            /**
             * The constructor for a Cache.
             * @param {string} id The id to use to retrieve the cache from the ICacheFactory.
             * @param {plat.storage.ICacheOptions} options The ICacheOptions for customizing the cache.
             */
            constructor(id: string, options?: ICacheOptions);
            /**
             * Retrieves the ICacheInfo about this cache
             * (i.e. ID, size, options)
             */
            public info(): ICacheInfo;
            /**
             * Method for inserting an object into an ICache.
             * @param {string} key The key to use for storage/retrieval of the object.
             * @param {T} value The value to store with the associated key.
             */
            public put(key: string, value: T): T;
            /**
             * Method for retrieving an object from an ICache.
             * @param key The key to search for in an ICache.
             */
            public read(key: string): T;
            /**
             * Method for removing an object from an ICache.
             * @param {string} key The key to remove from the ICache.
             */
            public remove(key: string): void;
            /**
             * Method for clearing an ICache, removing all of its keys.
             */
            public clear(): void;
            /**
             * Method for removing an ICache from the ICacheFactory.
             */
            public dispose(): void;
        }
        /**
         * The Type for referencing the '$CacheFactory' injectable as a dependency.
         */
        function ICacheFactory(): ICacheFactory;
        /**
         * Used to manage all the defined caches for the current application session.
         */
        interface ICacheFactory {
            /**
             * Method for creating a new cache object. Takes a generic type to denote the
             * type of objects stored in the new cache.  If a cache with the same ID already exists
             * in the ICacheFactory, a new cache will not be created.
             * @param {string} id The ID of the new Cache.
             * @param {plat.storage.ICacheOptions} options ICacheOptions
             * for customizing the Cache.
             */
            create<T>(id: string, options?: ICacheOptions): ICache<T>;
            /**
             * Gets a cache out of the ICacheFactory if it exists.
             * @param {string} id The identifier used to search for the cache.
             */
            fetch<T>(id: string): ICache<T>;
            /**
             * Clears the ICacheFactory and all of its caches.
             */
            clear(): void;
        }
        /**
         * Describes a cache. Takes in a generic type
         * corresponding to the type of objects stored in the cache.
         */
        interface ICache<T> {
            /**
             * Retrieves the ICacheInfo about this cache
             * (i.e. ID, size, options)
             */
            info(): ICacheInfo;
            /**
             * Method for inserting an object into an ICache.
             * @param {string} key The key to use for storage/retrieval of the object.
             * @param {T} value The value to store with the associated key.
             */
            put(key: string, value: T): T;
            /**
             * Method for retrieving an object from an ICache.
             * @param key The key to search for in an ICache.
             */
            read(key: string): T;
            /**
             * Method for removing an object from an ICache.
             * @param {string} key The key to remove from the ICache.
             */
            remove(key: string): void;
            /**
             * Method for clearing an ICache, removing all of its keys.
             */
            clear(): void;
            /**
             * Method for removing an ICache from the ICacheFactory.
             */
            dispose(): void;
        }
        /**
         * The Type for referencing the '$ManagerCache' injectable as a dependency.
         */
        function IManagerCache(): ICache<processing.INodeManager>;
        /**
         * Options for a cache.
         */
        interface ICacheOptions {
            /**
             * Specifies a timeout for a cache value. When a value
             * is put in the cache, it will be valid for the given
             * period of time (in milliseconds). After the timeout
             * is reached, the value will automatically be removed
             * from the cache.
             */
            timeout?: number;
        }
        /**
         * Contains information about an ICache.
         */
        interface ICacheInfo {
            /**
             * A unique id for the ICache object, used to
             * retrieve the ICache out of the ICacheFactory.
             */
            id: string;
            /**
             * Represents the number of items in the ICache.
             */
            size: number;
            /**
             * Represents the ICacheOptions that the
             * ICache is using.
             */
            options: ICacheOptions;
        }
        /**
         * Used for caching compiled nodes. This class will
         * clone a template when you put it in the cache. It will
         * also clone the template when you retrieve it.
         */
        class TemplateCache extends Cache<async.IThenable<DocumentFragment>> implements ITemplateCache {
            /**
             * Reference to the IPromise injectable.
             */
            public $Promise: async.IPromise;
            /**
             * The constructor for a TemplateCache. Creates a new ICache
             * with the ID "__templateCache".
             */
            constructor();
            /**
             * Stores a Node in the cache as a DocumentFragment.
             * @param {string} key The key to use for storage/retrieval of the object.
             * @param {Node} value The Node.
             * DocumentFragment containing the input Node.
             */
            public put(key: string, value: Node): async.IThenable<DocumentFragment>;
            /**
             * Stores a IPromise in the cache.
             * @param {string} key The key to use for storage/retrieval of the object.
             * @param {plat.async.IThenable<Node>} value Promise that
             * should resolve with a Node.
             * the input Promise resolves.
             */
            public put(key: string, value: async.IThenable<Node>): async.IThenable<DocumentFragment>;
            /**
             * Method for retrieving a Node from this cache. The DocumentFragment that resolves from the returned
             * Promise will be cloned to avoid manipulating the cached template.
             * @param {string} key The key to search for in this cache.
             * Returns undefined for a cache miss.
             */
            public read(key: string): async.IThenable<DocumentFragment>;
        }
        /**
         * The Type for referencing the '$TemplateCache' injectable as a dependency.
         */
        function ITemplateCache(): ITemplateCache;
        /**
         * Used to manage all templates. Returns a unique template
         * for every read, to avoid having to call cloneNode.
         */
        interface ITemplateCache extends ICache<async.IThenable<DocumentFragment>> {
            /**
             * Stores a Node in the cache as a DocumentFragment.
             * @param {string} key The key to use for storage/retrieval of the object.
             * @param {Node} value The Node.
             * DocumentFragment containing the input Node.
             */
            put(key: string, value: Node): async.IThenable<DocumentFragment>;
            /**
             * Stores a IPromise in the cache.
             * @param {string} key The key to use for storage/retrieval of the object.
             * @param {plat.async.IThenable<Node>} value Promise that
             * should resolve with a Node.
             * the input Promise resolves.
             */
            put(key: string, value: async.IThenable<Node>): async.IThenable<DocumentFragment>;
            /**
             * Method for retrieving a Node from this cache. The DocumentFragment that resolves from the returned
             * Promise will be cloned to avoid manipulating the cached template.
             * @param {string} key The key to search for in this cache.
             * Returns undefined for a cache miss.
             */
            read(key: string): async.IThenable<DocumentFragment>;
        }
        /**
         * A base class for storing data with a designated storage type.
         */
        class BaseStorage implements IBaseStorage {
            /**
             * The constructor for a BaseStorage.
             */
            constructor();
            /**
             * Returns the number of items in storage.
             */
            public length : number;
            /**
             * Clears storage, deleting all of its keys.
             */
            public clear(): void;
            /**
             * Gets an item out of storage with the assigned key.
             * @param {string} key The key of the item to retrieve from storage.
             */
            public getItem<T>(key: string): T;
            /**
             * Allows for iterating over storage keys with an index. When
             * called with an index, it will return the key at that index in
             * storage.
             * @param {number} index The index used to retrieve the associated key.
             */
            public key(index: number): string;
            /**
             * Searches in storage for an item and removes it if it
             * exists.
             * @param {string} key The key of the item to remove from storage.
             */
            public removeItem(key: string): void;
            /**
             * Adds data to storage with the designated key.
             * @param {string} key The key of the item to store in storage.
             * @param {any} data The data to store in storage with the key.
             */
            public setItem(key: string, data: any): void;
        }
        /**
         * An object designed for storing data with a designated storage type.
         */
        interface IBaseStorage {
            /**
             * Returns the number of items in storage.
             */
            length: number;
            /**
             * Clears storage, deleting all of its keys.
             */
            clear(): void;
            /**
             * Gets an item out of storage with the assigned key.
             * @param {string} key The key of the item to retrieve from storage.
             */
            getItem<T>(key: string): T;
            /**
             * Allows for iterating over storage keys with an index. When
             * called with an index, it will return the key at that index in
             * storage.
             * @param {number} index The index used to retrieve the associated key.
             */
            key(index: number): string;
            /**
             * Searches in storage for an item and removes it if it
             * exists.
             * @param {string} key The key of the item to remove from storage.
             */
            removeItem(key: string): void;
            /**
             * Adds data to storage with the designated key.
             * @param {string} key The key of the item to store in storage.
             * @param {any} data The data to store in storage with the key.
             */
            setItem(key: string, data: any): void;
        }
        /**
         * A class used to wrap HTML5 localStorage into an injectable.
         */
        class LocalStorage extends BaseStorage implements ILocalStorage {
            /**
             * Reference to HTML5 localStorage.
             */
            private __storage;
        }
        /**
         * The Type for referencing the '$LocalStorage' injectable as a dependency.
         */
        function ILocalStorage(): ILocalStorage;
        /**
         * Describes an object used to wrap local storage into an injectable.
         */
        interface ILocalStorage {
            /**
             * Returns the number of items in localStorage.
             */
            length: number;
            /**
             * Clears localStorage, deleting all of its keys.
             */
            clear(): void;
            /**
             * Gets an item out of localStorage with the assigned key.
             * @param {string} key The key of the item to retrieve from localStorage.
             */
            getItem<T>(key: string): T;
            /**
             * Allows for iterating over localStorage keys with an index. When
             * called with an index, it will return the key at that index in
             * localStorage.
             * @param {number} index The index used to retrieve the associated key.
             */
            key(index: number): string;
            /**
             * Searches in localStorage for an item and removes it if it
             * exists.
             * @param {string} key The key of the item to remove from storage.
             */
            removeItem(key: string): void;
            /**
             * Adds data to localStorage with the designated key.
             * @param {string} key The key of the item to store in localStorage.
             * @param {any} data The data to store in localStorage with the key.
             */
            setItem(key: string, data: any): void;
        }
        /**
         * A class for wrapping SessionStorage as an injectable.
         */
        class SessionStorage extends BaseStorage implements ISessionStorage {
            /**
             * Reference to HTML5 sessionStorage.
             */
            private __storage;
        }
        /**
         * The Type for referencing the '$SessionStorage' injectable as a dependency.
         */
        function ISessionStorage(): ISessionStorage;
        /**
         * Describes an object used to wrap session storage into an injectable.
         */
        interface ISessionStorage {
            /**
             * Returns the number of items in sessionStorage.
             */
            length: number;
            /**
             * Clears sessionStorage, deleting all of its keys.
             */
            clear(): void;
            /**
             * Gets an item out of sessionStorage with the assigned key.
             * @param {string} key The key of the item to retrieve from sessionStorage.
             */
            getItem<T>(key: string): T;
            /**
             * Allows for iterating over sessionStorage keys with an index. When
             * called with an index, it will return the key at that index in
             * sessionStorage.
             * @param {number} index The index used to retrieve the associated key.
             */
            key(index: number): string;
            /**
             * Searches in sessionStorage for an item and removes it if it
             * exists.
             * @param {string} key The key of the item to remove from storage.
             */
            removeItem(key: string): void;
            /**
             * Adds data to sessionStorage with the designated key.
             * @param {string} key The key of the item to store in sessionStorage.
             * @param {any} data The data to store in sessionStorage with the key.
             */
            setItem(key: string, data: any): void;
        }
    }
    /**
     * Holds all classes and interfaces related to observable components in platypus.
     */
    module observable {
        /**
         * A class for managing both context inheritance and observable properties on controls and
         * facilitating in data-binding.
         */
        class ContextManager implements IContextManager {
            /**
             * A set of functions to be fired when a particular observed array is mutated.
             */
            static observedArrayListeners: IObject<IObject<{
                (ev: IArrayMethodInfo<any>): void;
            }[]>>;
            /**
             * Gets the IContextManager associated to the given control. If no
             * IContextManager exists, one is created for that control.
             * @param {plat.IControl} control The control on which to locate the IContextManager.
             * associated with the input control.
             */
            static getManager(control: IControl): IContextManager;
            /**
             * Removes all the listeners for a given control's unique ID.
             * @param {plat.IControl} control The control whose manager is being disposed.
             * @param {boolean} persist? Whether or not the control's context needs to
             * be persisted post-disposal or can be set to null.
             */
            static dispose(control: IControl, persist?: boolean): void;
            /**
             * Removes all listeners for an Array associated with a given uid.
             * @param {string} absoluteIdentifier The identifier used to locate the array.
             * @param {string} uid The uid used to search for listeners.
             */
            static removeArrayListeners(absoluteIdentifier: string, uid: string): void;
            /**
             * Safely retrieves the local context given a root context and an Array of
             * property strings.
             * @param {any} rootContext The root object in which to find a local context.
             * @param {Array<string>} split The string array containing properties used to index into
             * the rootContext.
             */
            static getContext(rootContext: any, split: string[]): any;
            /**
             * Defines an object property with the associated value. Useful for unobserving objects.
             * @param {any} obj The object on which to define the property.
             * @param {string} key The property key.
             * @param {any} value The value used to define the property.
             * @param {boolean} enumerable? Whether or not the property should be enumerable (able to be iterated
             * over in a loop)
             * @param {boolean} configurable? Whether or not the property is able to be reconfigured.
             */
            static defineProperty(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean): void;
            /**
             * Defines an object property with the associated value. Useful for unobserving objects.
             * @param {any} obj The object on which to define the property.
             * @param {string} key The property key.
             * @param {any} value The value used to define the property.
             * @param {boolean} enumerable? Whether or not the property should be enumerable (able to be iterated
             * over in a loop)
             * @param {boolean} configurable? Whether or not the property is able to be reconfigured.
             */
            static defineGetter(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean): void;
            /**
             * Pushes the function for removing an observed property upon adding the property.
             * @param {string} identifer The identifier for which the remove listener is being pushed.
             * @param {string} uid The unique ID of the control observing the identifier.
             * @param {plat.IRemoveListener} listener The function for removing the observed property.
             */
            static pushRemoveListener(identifier: string, uid: string, listener: IRemoveListener): void;
            /**
             * Splices a given function for removing an observed property.
             * @param {string} identifer The identifier for which the remove listener is being spliced.
             * @param {string} uid The unique ID of the control observing the identifier.
             * @param {plat.IRemoveListener} listener The function for removing the observed property.
             */
            static spliceRemoveListener(identifier: string, uid: string, listener: IRemoveListener): void;
            /**
             * Removes a specified identifier from being observed for a given set of control IDs.
             * @param {Array<string>} uids The set of unique Ids for which to remove the specified identifier.
             * @param {string} identifier The identifier to stop observing.
             */
            static removeIdentifier(uids: string[], identifier: string): void;
            /**
             * Ensures that an identifier path will exist on a given control. Will create
             * objects/arrays if necessary.
             * @param {plat.ui.ITemplateControl} control The ITemplateControl
             * on which to create the context.
             * @param {string} identifier The period-delimited identifier string used to create
             * the context path.
             */
            static createContext(control: ui.ITemplateControl, identifier: string): any;
            /**
             * An object for quickly accessing a previously created IContextManager.
             */
            private static __managers;
            /**
             * An object for storing functions to remove listeners for observed identifiers.
             */
            private static __controls;
            /**
             * Reference to the ICompat injectable.
             */
            public $Compat: ICompat;
            /**
             * The root context associated with and to be managed by this
             * IContextManager.
             */
            public context: any;
            /**
             * An object for quickly accessing callbacks associated with a given identifier.
             */
            private __identifiers;
            /**
             * An object for quickly accessing child context associations (helps with
             * notifying child properties).
             */
            private __identifierHash;
            /**
             * An object for storing listeners for Array length changes.
             */
            private __lengthListeners;
            /**
             * An object for quickly accessing previously accessed or observed objects and properties.
             */
            private __contextObjects;
            /**
             * Whether or not the property currently being modified is due to an observed array function.
             */
            private __isArrayFunction;
            /**
             * If attempting to observe a property that is already being observed, this will be set to the
             * already observed identifier.
             */
            private __observedIdentifier;
            /**
             * Safely retrieves the local context for this manager given an Array of
             * property strings.
             * @param {Array<string>} split The string array containing properties used to index into
             * the context.
             */
            public getContext(split: string[]): any;
            /**
             * Given a period-delimited identifier, observes an object and calls the given listener when the
             * object changes.
             * @param {string} absoluteIdentifier The period-delimited identifier noting the property to be observed.
             * @param {plat.observable.IListener} observableListener An object implmenting IObservableListener. The listener will be
             * notified of object changes.
             */
            public observe(absoluteIdentifier: string, observableListener: IListener): IRemoveListener;
            /**
             * Observes an array and calls the listener when certain functions are called on
             * that array. The watched functions are push, pop, shift, splice, unshift, sort,
             * and reverse.
             * @param {string} uid The unique ID of the object observing the array.
             * @param {(ev: plat.observable.IArrayMethodInfo<any>) => void} listener The callback for when an observed Array
             * function has been called.
             * @param {string} absoluteIdentifier The identifier from the root context used to find the array.
             * @param {Array<any>} array The array to be observed.
             * @param {Array<any>} oldArray The old array to stop observing.
             */
            public observeArray(uid: string, listener: (ev: IArrayMethodInfo<any>) => void, absoluteIdentifier: string, array: any[], oldArray: any[]): IRemoveListener;
            /**
             * Disposes the memory for an IContextManager.
             */
            public dispose(): void;
            /**
             * Restores an array to use Array.prototype instead of listener functions.
             * @param {Array<any>} array The array to restore.
             */
            public _restoreArray(array: any[]): void;
            /**
             * Overwrites an Array's prototype to observe mutation functions.
             * @param {string} absoluteIdentifier The identifier for the Array off context.
             * @param {Array<any>} array The array to overwrite.
             */
            public _overwriteArray(absoluteIdentifier: string, array: any[]): void;
            /**
             * Gets the immediate context of identifier by splitting on "."
             * and observes the objects along the way.
             * @param {string} identifier The identifier being observed.
             */
            public _getImmediateContext(identifier: string): any;
            /**
             * Obtains the old value and new value of a given context
             * property on a property changed event.
             * @param {Array<string>} split The split identifier of the property that changed.
             * @param {any} newRootContext The new context.
             * @param {any} oldRootContext The old context.
             * property upon a potential context change.
             */
            public _getValues(split: string[], newRootContext: any, oldRootContext: any): {
                newValue: any;
                oldValue: any;
            };
            /**
             * Notifies all child properties being observed that a parent property
             * has changed.
             * @param {string} identifier The identifier for the property that changed.
             * @param {any} newValue The new value of the property.
             * @param {any} oldValue The old value of the property.
             */
            public _notifyChildProperties(identifier: string, newValue: any, oldValue: any): void;
            /**
             * Adds a listener to be fired for a particular identifier.
             * @param {string} absoluteIdentifier The identifier being observed.
             * @param {plat.observable.IListener} observableListener The function and associated unique ID to be fired
             * for this identifier.
             */
            public _addObservableListener(absoluteIdentifier: string, observableListener: IListener): IRemoveListener;
            /**
             * Observes a property on a given context specified by an identifier.
             * @param {string} identifier The full identifier path for the property being observed.
             * @param {any} immediateContext The object whose property will be observed.
             * @param {string} key The property key for the value on the immediateContext that's
             * being observed.
             */
            public _define(identifier: string, immediateContext: any, key: string): void;
            /**
             * Intercepts an array function for observation.
             * @param {string} absoluteIdentifier The full identifier path for the observed array.
             * @param {string} method The array method being called.
             * array function.
             */
            public _overwriteArrayFunction(absoluteIdentifier: string, method: string): (...args: any[]) => any;
            /**
             * Removes a single listener callback
             * @param {string} identifier The identifier attached to the callbacks.
             * @param {plat.observable.IListener} listener The observable listener to remove.
             */
            public _removeCallback(identifier: string, listener: IListener): void;
            /**
             * Checks if the specified identifier is already being
             * observed in this context.
             * @param {string} identifier The identifier being observed.
             */
            public _hasIdentifier(identifier: string): boolean;
            /**
             * Executes the listeners for the specified identifier on
             * this context.
             * @param {string} identifier The identifier attached to the callbacks.
             * @param {any} value The new value on this context specified by
             * the identifier.
             * @param {any} oldValue The old value on this context specified by
             * the identifier.
             */
            public _execute(identifier: string, value: any, oldValue: any): void;
            /**
             * Defines a getter and setter for an object using Object.defineProperty.
             * @param {string} identifier The identifier of the object being defined.
             * @param {any} immediateContext The parent object of the object being defined.
             * @param {string} key The property key of the object being defined.
             */
            private __defineObject(identifier, immediateContext, key);
            /**
             * Defines a getter and setter for a primitive using Object.defineProperty.
             * @param {string} identifier The identifier of the primitive being defined.
             * @param {any} immediateContext The parent object of the primitive being defined.
             * @param {string} key The property key of the primitive being defined.
             */
            private __definePrimitive(identifier, immediateContext, key);
            /**
             * Adds and associates a listener with a given identifier.
             * @param {string} identifier The identifier to attach the listener.
             * @param {plat.observable.IListener} observableListener The listener being added.
             */
            private __add(identifier, observableListener);
            /**
             * Adds a mapping for an identifier which allows quick access to it
             * if a parent context is changed.
             * @param {string} identifier The identifier to map.
             */
            private __addHashValues(identifier);
        }
        /**
         * The Type for referencing the '$ContextManagerStatic' injectable as a dependency.
         */
        function IContextManagerStatic(): IContextManagerStatic;
        /**
         * Creates and manages IContextManagers and has
         * additional helper functions for observing objects and primitives.
         */
        interface IContextManagerStatic {
            /**
             * A set of functions to be fired when a particular observed array is mutated.
             */
            observedArrayListeners: IObject<IObject<{
                (ev: IArrayMethodInfo<any>): void;
            }[]>>;
            /**
             * Gets the IContextManager associated to the given control. If no
             * IContextManager exists, one is created for that control.
             * @param {plat.IControl} control The control on which to locate the IContextManager.
             * associated with the input control.
             */
            getManager(control: IControl): IContextManager;
            /**
             * Removes all the listeners for a given control's unique ID.
             * @param {plat.IControl} control The control whose manager is being disposed.
             * @param {boolean} persist? Whether or not the control's context needs to
             * be persisted post-disposal or can be set to null.
             */
            dispose(control: IControl, persist?: boolean): void;
            /**
             * Removes all listeners for an Array associated with a given uid.
             * @param {string} absoluteIdentifier The identifier used to locate the array.
             * @param {string} uid The uid used to search for listeners.
             */
            removeArrayListeners(absoluteIdentifier: string, uid: string): void;
            /**
             * Safely retrieves the local context given a root context and an Array of
             * property strings.
             * @param {any} rootContext The root object in which to find a local context.
             * @param {Array<string>} split The string array containing properties used to index into
             * the rootContext.
             */
            getContext(rootContext: any, split: string[]): void;
            /**
             * Defines an object property with the associated value. Useful for unobserving objects.
             * @param {any} obj The object on which to define the property.
             * @param {string} key The property key.
             * @param {any} value The value used to define the property.
             * @param {boolean} enumerable? Whether or not the property should be enumerable (able to be iterated
             * over in a loop)
             * @param {boolean} configurable? Whether or not the property is able to be reconfigured.
             */
            defineProperty(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean): void;
            /**
             * Defines an object property with the associated value. Useful for unobserving objects.
             * @param {any} obj The object on which to define the property.
             * @param {string} key The property key.
             * @param {any} value The value used to define the property.
             * @param {boolean} enumerable? Whether or not the property should be enumerable (able to be iterated
             * over in a loop)
             * @param {boolean} configurable? Whether or not the property is able to be reconfigured.
             */
            defineGetter(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean): void;
            /**
             * Pushes the function for removing an observed property upon adding the property.
             * @param {string} identifer The identifier for which the remove listener is being pushed.
             * @param {string} uid The unique ID of the control observing the identifier.
             * @param {plat.IRemoveListener} listener The function for removing the observed property.
             */
            pushRemoveListener(identifier: string, uid: string, listener: IRemoveListener): void;
            /**
             * Splices a given function for removing an observed property.
             * @param {string} identifer The identifier for which the remove listener is being spliced.
             * @param {string} uid The unique ID of the control observing the identifier.
             * @param {plat.IRemoveListener} listener The function for removing the observed property.
             */
            spliceRemoveListener(identifier: string, uid: string, listener: IRemoveListener): void;
            /**
             * Removes a specified identifier from being observed for a given set of control IDs.
             * @param {Array<string>} uids The set of unique Ids for which to remove the specified identifier.
             * @param {string} identifier The identifier to stop observing.
             */
            removeIdentifier(uids: string[], identifier: string): void;
            /**
             * Ensures that an identifier path will exist on a given control. Will create
             * objects/arrays if necessary.
             * @param {plat.ui.ITemplateControl} control The ITemplateControl
             * on which to create the context.
             * @param {string} identifier The period-delimited identifier string used to create
             * the context path.
             */
            createContext(control: ui.ITemplateControl, identifier: string): any;
        }
        /**
         * Describes an object that manages observing properties on any object.
         */
        interface IContextManager {
            /**
             * The root context associated with and to be managed by this
             * IContextManager.
             */
            context: any;
            /**
             * Safely retrieves the local context for this manager given an Array of
             * property strings.
             * @param {Array<string>} split The string array containing properties used to index into
             * the context.
             */
            getContext(split: string[]): any;
            /**
             * Given a period-delimited identifier, observes an object and calls the given listener when the
             * object changes.
             * @param {string} absoluteIdentifier The period-delimited identifier noting the property to be observed.
             * @param {plat.observable.IListener} observableListener An object implmenting IObservableListener. The listener will be
             * notified of object changes.
             */
            observe(identifier: string, observableListener: IListener): IRemoveListener;
            /**
             * Observes an array and calls the listener when certain functions are called on
             * that array. The watched functions are push, pop, shift, splice, unshift, sort,
             * and reverse.
             * @param {string} uid The unique ID of the object observing the array.
             * @param {(ev: plat.observable.IArrayMethodInfo<any>) => void} listener The callback for when an observed Array
             * function has been called.
             * @param {string} absoluteIdentifier The identifier from the root context used to find the array.
             * @param {Array<any>} array The array to be observed.
             * @param {Array<any>} oldArray The old array to stop observing.
             */
            observeArray(uid: string, listener: (ev: IArrayMethodInfo<any>) => void, absoluteIdentifier: string, array: any[], oldArray: any[]): IRemoveListener;
            /**
             * Disposes the memory for an IContextManager.
             */
            dispose(): void;
        }
        /**
         * An object specifying a listener callback function and a unique id to use to manage the
         * listener.
         */
        interface IListener {
            /**
             * A listener method called when the object it is observing is changed.
             * @param {any} value The new value of the object.
             * @param {any} oldValue The previous value of the object.
             */
            listener(value: any, oldValue: any): void;
            /**
             * A unique id used to manage the listener.
             */
            uid: string;
        }
        /**
         * An object for Array method info. Takes a
         * generic type to denote the type of array it uses.
         */
        interface IArrayMethodInfo<T> {
            /**
             * The method name that was called. Possible values are:
             * 'push', 'pop', 'reverse', 'shift', 'sort', 'splice',
             * and 'unshift'
             */
            method: string;
            /**
             * The value returned from the called function.
             */
            returnValue: any;
            /**
             * The previous value of the array.
             */
            oldArray: T[];
            /**
             * The new value of the array.
             */
            newArray: T[];
            /**
             * The arguments passed into the array function.
             */
            arguments: any[];
        }
        /**
         * Defines the object added to a template control when its element
         * has an attribute control that extends ObservableAttributeControl.
         * This will contain the value of the expression as well as a way to observe the
         * attribute value for changes.
         * plat-options is a control that implements this interface, and puts an 'options'
         * property on its associated template control.
         * The generic type corresponds to the type of object created when the attribute
         * expression is evaluated.
         */
        interface IObservableProperty<T> {
            /**
             * The value obtained from evaluating the attribute's expression.
             */
            value: T;
            /**
             * A method for observing the attribute for changes.
             * @param {(newValue: T, oldValue: T) => void} listener The listener callback which will be pre-bound to the
             * template control.
             */
            observe(listener: (newValue: T, oldValue: T) => void): IRemoveListener;
        }
    }
    /**
     * Holds classes and interfaces related to event management components in platypus.
     */
    module events {
        /**
         * An event class that propagates through a control tree.
         * Propagation of the event always starts at the sender, allowing a control to both
         * initialize and consume an event. If a consumer of an event throws an error while
         * handling the event it will be logged to the app using exception.warn. Errors will
         * not stop propagation of the event.
         */
        class DispatchEvent implements IDispatchEventInstance {
            /**
             * Reference to the IEventManagerStatic injectable.
             */
            public $EventManagerStatic: IEventManagerStatic;
            /**
             * The object that initiated the event.
             */
            public sender: any;
            /**
             * The name of the event.
             */
            public name: string;
            /**
             * The event direction this object is using for propagation.
             */
            public direction: string;
            /**
             * Whether or not the event propagation was stopped.
             */
            public stopped: boolean;
            /**
             * Initializes the event, populating its public properties.
             * @param {string} name The name of the event.
             * @param {any} sender The object that initiated the event.
             * @param {string} direction='up' Equivalent to EventManager.UP.
             */
            public initialize(name: string, sender: any, direction?: 'up'): void;
            /**
             * Initializes the event, populating its public properties.
             * @param {string} name The name of the event.
             * @param {any} sender The object that initiated the event.
             * @param {string} direction='down' Equivalent to EventManager.DOWN.
             */
            public initialize(name: string, sender: any, direction?: 'down'): void;
            /**
             * Initializes the event, populating its public properties.
             * @param {string} name The name of the event.
             * @param {any} sender The object that initiated the event.
             * @param {string} direction='direct' Equivalent to EventManager.DIRECT.
             */
            public initialize(name: string, sender: any, direction?: 'direct'): void;
            /**
             * Initializes the event, populating its public properties.
             * @param {string} name The name of the event.
             * @param {any} sender The object that initiated the event.
             * @param {string} direction The direction of propagation
             */
            public initialize(name: string, sender: any, direction?: string): void;
            /**
             * Call this method to halt the propagation of an upward-moving event.
             * Downward events cannot be stopped with this method.
             */
            public stopPropagation(): void;
        }
        /**
         * The Type for referencing the '$DispatchEventInstance' injectable as a dependency.
         */
        function IDispatchEventInstance(): IDispatchEventInstance;
        /**
         * Describes an event that propagates through a control tree.
         * Propagation of the event always starts at the sender, allowing a control to both
         * initialize and consume an event. If a consumer of an event throws an error while
         * handling the event it will be logged to the app using exception.warn. Errors will
         * not stop propagation of the event.
         */
        interface IDispatchEventInstance {
            /**
             * The object that initiated the event.
             */
            sender: any;
            /**
             * The name of the event.
             */
            name: string;
            /**
             * The event direction this object is using for propagation.
             */
            direction: string;
            /**
             * Whether or not the event propagation was stopped.
             */
            stopped: boolean;
            /**
             * Initializes the event, populating its public properties.
             * @param {string} name The name of the event.
             * @param {any} sender The object that initiated the event.
             * @param {string} direction='up' Equivalent to EventManager.UP.
             */
            initialize(name: string, sender: any, direction?: 'up'): void;
            /**
             * Initializes the event, populating its public properties.
             * @param {string} name The name of the event.
             * @param {any} sender The object that initiated the event.
             * @param {string} direction='down' Equivalent to EventManager.DOWN.
             */
            initialize(name: string, sender: any, direction?: 'down'): void;
            /**
             * Initializes the event, populating its public properties.
             * @param {string} name The name of the event.
             * @param {any} sender The object that initiated the event.
             * @param {string} direction='direct' Equivalent to EventManager.DIRECT.
             */
            initialize(name: string, sender: any, direction?: 'direct'): void;
            /**
             * Initializes the event, populating its public properties.
             * @param {string} name The name of the event.
             * @param {any} sender The object that initiated the event.
             * @param {string} direction The direction of propagation
             */
            initialize(name: string, sender: any, direction?: string): void;
            /**
             * Call this method to halt the propagation of an upward-moving event.
             * Downward events cannot be stopped with this method.
             */
            stopPropagation(): void;
        }
        /**
         * Represents a Lifecycle Event. Lifecycle Events are always direct events.
         */
        class LifecycleEvent extends DispatchEvent implements ILifecycleEvent {
            /**
             * Creates a new LifecycleEvent and fires it.
             * @param {string} name The name of the event.
             * @param {any} sender The sender of the event.
             * @param {boolean} cancelable? Whether or not the event can be cancelled.
             */
            static dispatch(name: string, sender: any, cancelable?: boolean): void;
            /**
             * States whether or not this event is able to be cancelled. Some lifecycle events can be
             * cancelled, preventing the default functionality for the event.
             */
            public cancelable: boolean;
            /**
             * States whether or not this event has been cancelled.
             */
            public cancelled: boolean;
            /**
             * Initializes the event, populating its public properties.
             * @param {string} name The name of the event.
             * @param {any} sender The sender of the event.
             */
            public initialize(name: string, sender: any): void;
            /**
             * If the event is cancelable, calling this method will cancel the event.
             */
            public cancel(): void;
        }
        /**
         * The Type for referencing the '$LifecycleEventStatic' injectable as a dependency.
         */
        function ILifecycleEventStatic(): ILifecycleEventStatic;
        /**
         * Dispatches LifecycleEvent
         */
        interface ILifecycleEventStatic {
            /**
             * Creates a new LifecycleEvent and fires it.
             * @param {string} name The name of the event.
             * @param {any} sender The sender of the event.
             * @param {boolean} cancelable? Whether or not the event can be cancelled.
             */
            dispatch(name: string, sender: any, cancelable?: boolean): void;
        }
        /**
         * Represents a Lifecycle Event. Lifecycle Events are always direct events.
         */
        interface ILifecycleEvent extends IDispatchEventInstance {
            /**
             * States whether or not this event is able to be cancelled. Some lifecycle events can be
             * cancelled, preventing the default functionality for the event.
             */
            cancelable: boolean;
            /**
             * States whether or not this event has been cancelled.
             */
            cancelled: boolean;
            /**
             * Initializes the event, populating its public properties.
             * @param {string} name The name of the event.
             * @param {any} sender The sender of the event.
             */
            initialize(name: string, sender: any): void;
            /**
             * If the event is cancelable, calling this method will cancel the event.
             */
            cancel(): void;
        }
        /**
         * Manages dispatching events, handling all propagating events as well as any error handling.
         */
        class EventManager {
            /**
             * Reference to the ICompat injectable.
             */
            static $Compat: ICompat;
            /**
             * Reference to the Document injectable.
             */
            static $Document: Document;
            /**
             * Reference to the Window injectable.
             */
            static $Window: Window;
            /**
             * Reference to the IDom injectable.
             */
            static $Dom: ui.IDom;
            /**
             * An upward-moving event will start at the sender and move
             * up the parent chain.
             */
            static UP: string;
            /**
             * A downward-moving event will start at the sender and move
             * to its children and beyond.
             */
            static DOWN: string;
            /**
             * Goes through all listeners for an event name, ignoring order.
             */
            static DIRECT: string;
            /**
             * Keeps track of which events are currently propagating.
             */
            static propagatingEvents: IObject<boolean>;
            /**
             * Holds all the event listeners keyed by uid.
             */
            private static __eventsListeners;
            /**
             * Holds all the event listeners for the application lifefycle events.
             */
            private static __lifecycleEventListeners;
            /**
             * whether or not the event manager has been initialized.
             */
            private static __initialized;
            /**
             * Initializes the EventManager, creating the initial ALM event listeners.
             */
            static initialize(): void;
            /**
             * Removes all event listeners for a given uid. Useful for garbage collection when
             * certain objects that listen to events go out of scope.
             * @param {string} uid The uid for which the event listeners will be removed.'
             */
            static dispose(uid: string): void;
            /**
             * Registers a listener for a DispatchEvent. The listener will be called when a DispatchEvent is
             * propagating over the given uid. Any number of listeners can exist for a single event name.
             * @param {string} uid A unique id to associate with the object registering the listener.
             * @param {string} eventName The name of the event to listen to.
             * @param {(ev: IDispatchEventInstance, ...args: any[]) => void} listener The method called when the event is fired.
             * @param {any} context? The context with which to call the listener method.
             */
            static on(uid: string, eventName: string, listener: (ev: IDispatchEventInstance, ...args: any[]) => void, context?: any): IRemoveListener;
            /**
             * Looks for listeners to a given event name, and fires the listeners using the specified
             * event direction.
             * @param {string} name The name of the event.
             * @param {any} sender The object sending the event.
             * @param {string} direction='up' Equivalent to EventManager.UP.
             * @param {Array<any>} args? The arguments to send to the listeners.
             */
            static dispatch(name: string, sender: any, direction: 'up', args?: any[]): void;
            /**
             * Looks for listeners to a given event name, and fires the listeners using the specified
             * event direction.
             * @param {string} name The name of the event.
             * @param {any} sender The object sending the event.
             * @param {string} direction='down' Equivalent to EventManager.DOWN.
             * @param {Array<any>} args? The arguments to send to the listeners.
             */
            static dispatch(name: string, sender: any, direction: 'down', args?: any[]): void;
            /**
             * Looks for listeners to a given event name, and fires the listeners using the specified
             * event direction.
             * @param {string} name The name of the event.
             * @param {any} sender The object sending the event.
             * @param {string} direction='direct' Equivalent to EventManager.DIRECT.
             * @param {Array<any>} args? The arguments to send to the listeners.
             */
            static dispatch(name: string, sender: any, direction: 'direct', args?: any[]): void;
            /**
             * Looks for listeners to a given event name, and fires the listeners using the specified
             * event direction.
             * @param {string} name The name of the event.
             * @param {any} sender The object sending the event.
             * @param {string} direction The direction in which to send the event.
             * @param {Array<any>} args? The arguments to send to the listeners.
             */
            static dispatch(name: string, sender: any, direction: string, args?: any[]): void;
            /**
             * Returns whether or not the given string is a registered direction.
             * @param {string} direction The direction of the event
             */
            static hasDirection(direction: string): boolean;
            /**
             * Determines the appropriate direction and dispatches the event accordingly.
             * @param {plat.events.IDispatchEventInstance} event The DispatchEvent to send
             * @param {Array<any>} args The arguments associated with the event
             */
            static sendEvent(event: IDispatchEventInstance, args?: any[]): void;
            /**
             * Dispatches the event up the control chain.
             * @param {plat.events.IDispatchEventInstance} event The event being dispatched.
             * @param {Array<any>} args The arguments associated with the event.
             */
            static _dispatchUp(event: IDispatchEventInstance, args: any[]): void;
            /**
             * Dispatches the event down the control chain.
             * @param {plat.events.IDispatchEventInstance} event The event being dispatched.
             * @param {Array<any>} args The arguments associated with the event.
             */
            static _dispatchDown(event: IDispatchEventInstance, args: any[]): void;
            /**
             * Dispatches the event directly to all listeners.
             * @param {plat.events.IDispatchEventInstance} event The event being dispatched.
             * @param {Array<any>} args The arguments associated with the event.
             */
            static _dispatchDirect(event: IDispatchEventInstance, args: any[]): void;
            /**
             * Dispatches the event to the listeners for the given uid.
             * @param {string} uid The uid used to find the event listeners.
             * @param {plat.events.IDispatchEventInstance} The event.
             * @param {Array<any>} args The arguments to send to the listeners.
             */
            private static __executeEvent(uid, ev, args);
            /**
             * Calls event listeners with the given context, event, and arguments.
             * @param {any} context The context with which to call the listeners.
             * @param {plat.events.IDispatchEventInstance} The event.
             * @param {Array<(ev: IDispatchEventInstance, ...args: any[]) => void>} The event listeners.
             * @param {Array<any>} args The arguments to send to the listeners.
             */
            private static __callListeners(context, ev, listeners, args);
        }
        /**
         * The Type for referencing the '$EventManagerStatic' injectable as a dependency.
         */
        function IEventManagerStatic($Compat?: ICompat, $Document?: Document, $Window?: Window, $Dom?: ui.IDom): IEventManagerStatic;
        /**
         * Manages dispatching events, handling all propagating events as well as any error handling.
         */
        interface IEventManagerStatic {
            /**
             * Reference to the ICompat injectable.
             */
            $Compat: ICompat;
            /**
             * Reference to the Document injectable.
             */
            $Document: Document;
            /**
             * Reference to the Window injectable.
             */
            $Window: Window;
            /**
             * Reference to the IDom injectable.
             */
            $Dom: ui.IDom;
            /**
             * An upward-moving event will start at the sender and move
             * up the parent chain.
             */
            UP: string;
            /**
             * A downward-moving event will start at the sender and move
             * to its children and beyond.
             */
            DOWN: string;
            /**
             * Goes through all listeners for an event name, ignoring order.
             */
            DIRECT: string;
            /**
             * Keeps track of which events are currently propagating.
             */
            propagatingEvents: IObject<boolean>;
            /**
             * Initializes the EventManager, creating the initial ALM event listeners.
             */
            initialize(): void;
            /**
             * Removes all event listeners for a given uid. Useful for garbage collection when
             * certain objects that listen to events go out of scope.
             * @param {string} uid The uid for which the event listeners will be removed.'
             */
            dispose(uid: string): void;
            /**
             * Registers a listener for the beforeNavigate Event. The listener will be called when the beforeNavigate
             * event is propagating over the given uid. Any number of listeners can exist for a single event name. The
             * listener can chose to cancel the event using ev.cancel(), preventing any navigation as well as further
             * calls to event listeners.
             * @param {string} uid A unique id to associate with the object registering the listener.
             * @param {string} eventName='beforeNavigate' The name of the event to listen to.
             * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the event is fired.
             * @param {any} context? The context with which to call the listener method.
             */
            on(uid: string, eventName: 'beforeNavigate', listener: (ev: INavigationEvent<any>) => void, context?: any): IRemoveListener;
            /**
             * Registers a listener for the navigating Event. The listener will be called when the navigating
             * event is propagating over the given uid. Any number of listeners can exist for a single event name.
             * The listener can chose to cancel the event using ev.cancel(), preventing any navigation as well as further
             * calls to event listeners.
             * @param {string} uid A unique id to associate with the object registering the listener.
             * @param {string} eventName='navigating' Specifies that this is a listener for the navigating event.
             * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the event is fired.
             * @param {any} context? The context with which to call the listener method.
             */
            on(uid: string, eventName: 'navigating', listener: (ev: INavigationEvent<any>) => void, context?: any): IRemoveListener;
            /**
             * Registers a listener for the navigated Event. The listener will be called when the navigated
             * event is propagating over the given uid. Any number of listeners can exist for a single event name.
             * The listener cannot cancel the event.
             * @param {string} uid A unique id to associate with the object registering the listener.
             * @param {string} eventName='navigated' Specifies that this is a listener for the navigated event.
             * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the event is fired.
             * @param {any} context? The context with which to call the listener method.
             */
            on(uid: string, eventName: 'navigated', listener: (ev: INavigationEvent<any>) => void, context?: any): IRemoveListener;
            /**
             * Registers a listener for a NavigationEvent. The listener will be called when a NavigationEvent is
             * propagating over the given uid. Any number of listeners can exist for a single event name.
             * @param {string} uid A unique id to associate with the object registering the listener.
             * @param {string} eventName The name of the event to listen to.
             * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the event is fired.
             * @param {any} context? The context with which to call the listener method.
             */
            on(uid: string, eventName: string, listener: (ev: INavigationEvent<any>) => void, context?: any): IRemoveListener;
            /**
             * Registers a listener for the ready AlmEvent. The ready event will be called when the app
             * is ready to start.
             * @param {string} uid A unique id to associate with the object registering the listener.
             * @param {string} eventName='ready' Specifies that the listener is for the ready event.
             * @param {(ev: plat.events.ILifecycleEvent) => void} listener The method called when the event is fired.
             * @param {any} context? The context with which to call the listener method.
             */
            on(uid: string, eventName: 'ready', listener: (ev: ILifecycleEvent) => void, context?: any): IRemoveListener;
            /**
             * Registers a listener for the suspend AlmEvent. The listener will be called when an app
             * is being suspended.
             * @param {string} uid A unique id to associate with the object registering the listener.
             * @param {string} eventName='suspend' Specifies the listener is for the suspend event.
             * @param {(ev: plat.events.ILifecycleEvent) => void} listener The method called when the event is fired.
             * @param {any} context? The context with which to call the listener method.
             */
            on(uid: string, eventName: 'suspend', listener: (ev: ILifecycleEvent) => void, context?: any): IRemoveListener;
            /**
             * Registers a listener for the resume AlmEvent. The listener will be called when an app
             * is being resumeed.
             * @param {string} uid A unique id to associate with the object registering the listener.
             * @param {string} eventName='suspend' Specifies the listener is for the resume event.
             * @param {(ev: plat.events.ILifecycleEvent) => void} listener The method called when the event is fired.
             * @param {any} context? The context with which to call the listener method.
             */
            on(uid: string, eventName: 'resume', listener: (ev: ILifecycleEvent) => void, context?: any): IRemoveListener;
            /**
             * Registers a listener for the online AlmEvent. This event fires when the app's network
             * connection changes to be online.
             * @param {string} uid A unique id to associate with the object registering the listener.
             * @param {string} eventName='online' Specifies the listener is for the online event.
             * @param {(ev: plat.events.ILifecycleEvent) => void} listener The method called when the event is fired.
             * @param {any} context? The context with which to call the listener method.
             */
            on(uid: string, eventName: 'online', listener: (ev: ILifecycleEvent) => void, context?: any): IRemoveListener;
            /**
             * Registers a listener for the offline AlmEvent. This event fires when the app's network
             * connection changes to be offline.
             * @param {string} uid A unique id to associate with the object registering the listener.
             * @param {string} eventName='offline' Specifies the listener is for the offline event.
             * @param {(ev: plat.events.ILifecycleEvent) => void} listener The method called when the event is fired.
             * @param {any} context? The context with which to call the listener method.
             */
            on(uid: string, eventName: 'offline', listener: (ev: ILifecycleEvent) => void, context?: any): IRemoveListener;
            /**
             * Registers a listener for an AlmEvent. The listener will be called when an AlmEvent is
             * propagating over the given uid. Any number of listeners can exist for a single event name.
             * @param {string} uid A unique id to associate with the object registering the listener.
             * @param {string} eventName The name of the event to listen to.
             * @param {(ev: plat.events.ILifecycleEvent) => void} listener The method called when the event is fired.
             * @param {any} context? The context with which to call the listener method.
             */
            on(uid: string, eventName: string, listener: (ev: ILifecycleEvent) => void, context?: any): IRemoveListener;
            /**
             * Registers a listener for a ErrorEvent. The listener will be called when a ErrorEvent is
             * propagating over the given uid. Any number of listeners can exist for a single event name.
             * @param {string} uid A unique id to associate with the object registering the listener.
             * @param {string} eventName The name of the event to listen to.
             * @param {(ev: plat.events.IErrorEvent<Error>) => void} listener The method called when the event is fired.
             * @param {any} context? The context with which to call the listener method.
             */
            on(uid: string, eventName: 'error', listener: (ev: IErrorEvent<Error>) => void, context?: any): IRemoveListener;
            /**
             * Registers a listener for a ErrorEvent. The listener will be called when a ErrorEvent is
             * propagating over the given uid. Any number of listeners can exist for a single event name.
             * @param {string} uid A unique id to associate with the object registering the listener.
             * @param {string} eventName The name of the event to listen to.
             * @param {(ev: plat.events.IErrorEvent<any>) => void} listener The method called when the event is fired.
             * @param {any} context? The context with which to call the listener method.
             */
            on(uid: string, eventName: string, listener: (ev: IErrorEvent<any>) => void, context?: any): IRemoveListener;
            /**
             * Registers a listener for a DispatchEvent. The listener will be called when a DispatchEvent is
             * propagating over the given uid. Any number of listeners can exist for a single event name.
             * @param {string} uid A unique id to associate with the object registering the listener.
             * @param {string} eventName The name of the event to listen to.
             * @param {(ev: plat.events.IDispatchEventInstance, ...args: any[]) => void} listener The method called when the event is fired.
             * @param {any} context? The context with which to call the listener method.
             */
            on(uid: string, eventName: string, listener: (ev: IDispatchEventInstance, ...args: any[]) => void, context?: any): IRemoveListener;
            /**
             * Looks for listeners to a given event name, and fires the listeners using the specified
             * event direction.
             * @param {string} name The name of the event.
             * @param {any} sender The object sending the event.
             * @param {string} direction='up' Equivalent to EventManager.UP.
             * @param {Array<any>} args? The arguments to send to the listeners.
             */
            dispatch(name: string, sender: any, direction: 'up', args?: any[]): void;
            /**
             * Looks for listeners to a given event name, and fires the listeners using the specified
             * event direction.
             * @param {string} name The name of the event.
             * @param {any} sender The object sending the event.
             * @param {string} direction='down' Equivalent to EventManager.DOWN.
             * @param {Array<any>} args? The arguments to send to the listeners.
             */
            dispatch(name: string, sender: any, direction: 'down', args?: any[]): void;
            /**
             * Looks for listeners to a given event name, and fires the listeners using the specified
             * event direction.
             * @param {string} name The name of the event.
             * @param {any} sender The object sending the event.
             * @param {string} direction='direct' Equivalent to EventManager.DIRECT.
             * @param {Array<any>} args? The arguments to send to the listeners.
             */
            dispatch(name: string, sender: any, direction: 'direct', args?: any[]): void;
            /**
             * Looks for listeners to a given event name, and fires the listeners using the specified
             * event direction.
             * @param {string} name The name of the event.
             * @param {any} sender The object sending the event.
             * @param {string} direction The direction in which to send the event.
             * @param {Array<any>} args? The arguments to send to the listeners.
             */
            dispatch(name: string, sender: any, direction: string, args?: any[]): void;
            /**
             * Returns whether or not the given string is a registered direction.
             * @param {string} direction The direction of the event
             */
            hasDirection(direction: string): boolean;
            /**
             * Determines the appropriate direction and dispatches the event accordingly.
             * @param {plat.events.IDispatchEventInstance} event The DispatchEvent to send
             * @param {Array<any>} args The arguments associated with the event
             */
            sendEvent(event: IDispatchEventInstance, args?: any[]): void;
        }
        /**
         * A class used by the Navigator to dispatch Navigation events. Allows anyone to listen
         * for navigation events and respond to them, even canceling them if necessary.
         */
        class NavigationEvent<P> extends DispatchEvent implements INavigationEvent<P> {
            /**
             * Reference to the IEventManagerStatic injectable.
             */
            static $EventManagerStatic: IEventManagerStatic;
            /**
             * Creates a new NavigationEvent and fires it.
             * @param {string} name The name of the event (e.g. 'beforeNavigate')
             * @param {any} sender The object sending the event.
             * @param {plat.events.INavigationEventOptions<P>} eventOptions An object implementing INavigationEvent, specifying what all event listeners
             * will be passed.
             */
            static dispatch<P>(name: string, sender: any, eventOptions: INavigationEventOptions<P>): INavigationEvent<P>;
            /**
             * The navigation parameter being dispatched.
             */
            public parameter: P;
            /**
             * The navigation options for the event.
             */
            public options: navigation.IBaseNavigationOptions;
            /**
             * The navigation event target. Its type depends on the type of Navigation event.
             */
            public target: any;
            /**
             * Specifies the type of IBaseViewControl for the event.
             */
            public type: string;
            /**
             * States whether or not this event is able to be cancelled. Some navigation events can be
             * cancelled, preventing further navigation.
             */
            public cancelable: boolean;
            /**
             * States whether or not this event has been cancelled.
             */
            public cancelled: boolean;
            /**
             * Initializes the event members.
             * @param {string} name The name of the event.
             * @param {any} sender The object that initiated the event.
             * @param {string} direction='direct' This will always be a direct event no matter what is sent in.
             */
            public initialize(name: string, sender: any, direction?: 'direct', eventOptions?: INavigationEventOptions<P>): void;
            public initialize(name: string, sender: any, direction?: string, eventOptions?: INavigationEventOptions<P>): void;
            /**
             * If the event is cancelable, calling this method will cancel the event.
             */
            public cancel(): void;
        }
        /**
         * The Type for referencing the '$NavigationEventStatic' injectable as a dependency.
         */
        function INavigationEventStatic($EventManagerStatic?: IEventManagerStatic): INavigationEventStatic;
        /**
         * The intended external interface for the '$NavigationEventStatic' injectable.
         */
        interface INavigationEventStatic {
            /**
             * Creates a new INavigationEvent and fires it.
             * @param {string} name The name of the event (e.g. 'beforeNavigate')
             * @param {any} sender The object sending the event.
             * @param {plat.events.INavigationEventOptions<P>} eventOptions An object implementing INavigationEvent, specifying what all event listeners
             * will be passed.
             */
            dispatch<P>(name: string, sender: any, eventOptions: INavigationEventOptions<P>): INavigationEvent<P>;
        }
        /**
         * A class used by the Navigator to dispatch Navigation events. Allows anyone to listen
         * for navigation events and respond to them, even canceling them if necessary.
         */
        interface INavigationEvent<P> extends IDispatchEventInstance {
            /**
             * The navigation parameter being dispatched.
             */
            parameter: P;
            /**
             * The navigation options for the event.
             */
            options: navigation.IBaseNavigationOptions;
            /**
             * The navigation event target. Its type depends on the type of Navigation event.
             */
            target: any;
            /**
             * Specifies the type of IBaseViewControl for the event.
             */
            type: string;
            /**
             * States whether or not this event is able to be cancelled. Some navigation events can be
             * cancelled, preventing further navigation.
             */
            cancelable: boolean;
            /**
             * States whether or not this event has been cancelled.
             */
            cancelled: boolean;
            /**
             * Initializes the event members.
             * @param {string} name The name of the event.
             * @param {any} sender The object that initiated the event.
             * @param {string} direction='direct' This will always be a direct event no matter what is sent in.
             */
            initialize(name: string, sender: any, direction?: 'direct', eventOptions?: INavigationEventOptions<P>): any;
            initialize(name: string, sender: any, direction?: string, eventOptions?: INavigationEventOptions<P>): any;
            /**
             * If the event is cancelable, calling this method will cancel the event.
             */
            cancel(): void;
        }
        /**
         * Describes options for an INavigationEvent. The generic parameter specifies the
         * target type for the event.
         */
        interface INavigationEventOptions<P> {
            /**
             * The navigation parameter being dispatched.
             */
            parameter: P;
            /**
             * The navigation options for the event.
             */
            options: navigation.IBaseNavigationOptions;
            /**
             * The navigation event target. Its type depends on the type of Navigation event.
             */
            target: any;
            /**
             * Specifies the type of IBaseViewControl for the event.
             */
            type: string;
            /**
             * States whether or not this event is able to be cancelled. Some navigation events can be
             * cancelled, preventing further navigation.
             */
            cancelable?: boolean;
        }
        /**
         * Represents an internal Error Event. This is used for any
         * internal errors (both fatal and warnings). All error events are
         * direct events.
         */
        class ErrorEvent<E extends Error> extends DispatchEvent implements IErrorEvent<E> {
            /**
             * Reference to the IEventManagerStatic injectable.
             */
            static $EventManagerStatic: IEventManagerStatic;
            /**
             * Creates a new ErrorEvent and fires it.
             * @param {string} name The name of the event.
             * @param {any} sender The sender of the event.
             * @param {E} error The error that occurred, resulting in the event.
             */
            static dispatch<E extends Error>(name: string, sender: any, error: E): void;
            /**
             * The error being dispatched.
             */
            public error: E;
            /**
             * Initializes the event, populating its public properties.
             * @param {string} name The name of the event.
             * @param {any} sender The sender of the event.
             * @param {string} direction='direct' Equivalent to EventManager.DIRECT.
             * @param {E} error The error that occurred, resulting in the event.
             */
            public initialize(name: string, sender: any, direction?: 'direct', error?: E): void;
            /**
             * Initializes the event, populating its public properties.
             * @param {string} name The name of the event.
             * @param {any} sender The sender of the event.
             * @param {string} direction This is always a direct event.
             * @param {E} error The error that occurred, resulting in the event.
             */
            public initialize(name: string, sender: any, direction?: string, error?: E): void;
        }
        /**
         * The Type for referencing the '$ErrorEventStatic' injectable as a dependency.
         */
        function IErrorEventStatic($EventManagerStatic?: IEventManagerStatic): IErrorEventStatic;
        /**
         * Dispatches ErrorEvents
         */
        interface IErrorEventStatic {
            /**
             * Creates a new ErrorEvent and fires it.
             * @param {string} name The name of the event.
             * @param {any} sender The sender of the event.
             * @param {E} error The error that occurred, resulting in the event.
             */
            dispatch<E extends Error>(name: string, sender: any, error: E): void;
        }
        /**
         * Represents an internal Error Event. This is used for any
         * internal errors (both fatal and warnings). All error events are
         * direct events.
         */
        interface IErrorEvent<E extends Error> extends IDispatchEventInstance {
            /**
             * The error being dispatched.
             */
            error: E;
            /**
             * Initializes the event, populating its public properties.
             * @param {string} name The name of the event.
             * @param {any} sender The sender of the event.
             * @param {string} direction='direct' Equivalent to EventManager.DIRECT.
             * @param {E} error The error that occurred, resulting in the event.
             */
            initialize(name: string, sender: any, direction?: 'direct', error?: E): void;
            /**
             * Initializes the event, populating its public properties.
             * @param {string} name The name of the event.
             * @param {any} sender The sender of the event.
             * @param {string} direction This is always a direct event.
             * @param {E} error The error that occurred, resulting in the event.
             */
            initialize(name: string, sender: any, direction?: string, error?: E): void;
        }
    }
    /**
     * Used for facilitating data and DOM manipulation. Contains lifecycle events
     * as well as properties for communicating with other controls. This is the base
     * class for all types of controls.
     */
    class Control implements IControl {
        /**
         * Reference to the IParser injectable.
         */
        static $Parser: expressions.IParser;
        /**
         * Reference to the IContextManagerStatic injectable.
         */
        static $ContextManagerStatic: observable.IContextManagerStatic;
        /**
         * Reference to the IEventManagerStatic injectable.
         */
        static $EventManagerStatic: events.IEventManagerStatic;
        /**
         * Reference to the IPromise injectable.
         */
        static $Promise: async.IPromise;
        /**
         * An object containing all controls' registered event listeners.
         */
        private static __eventListeners;
        /**
         * Finds the ancestor control for the given control that contains the root
         * context.
         * @param {plat.IControl} control The control with which to find the root.
         */
        static getRootControl(control: IControl): ui.ITemplateControl;
        /**
         * Given a control, calls the loaded method for the control if it exists.
         * @param {plat.IControl} control The control to load.
         */
        static load(control: IControl): async.IThenable<void>;
        /**
         * Disposes all the necessary memory for a control. Uses specific dispose
         * methods related to a control's constructor if necessary.
         * @param {plat.IControl} control The Control to dispose.
         */
        static dispose(control: IControl): void;
        /**
         * Splices a control from its parent's controls list. Sets the control's parent
         * to null.
         * @param {plat.IControl} control The control whose parent will be removed.
         */
        static removeParent(control: IControl): void;
        /**
         * Removes all event listeners for a control with the given uid.
         * @param {plat.IControl} control The control having its event listeners removed.
         */
        static removeEventListeners(control: IControl): void;
        /**
         * Returns a new instance of Control.
         */
        static getInstance(): IControl;
        /**
         * Adds a function to remove an event listener for the control specified
         * by its uid.
         * @param {string} uid The uid of the control associated with the remove function.
         * @param {plat.IRemoveListener} listener The remove function to add.
         */
        private static __addRemoveListener(uid, listener);
        /**
         * Removes a IRemoveListener from a control's listeners.
         * @param {string} uid The uid of the control associated with the remove function.
         * @param {plat.IRemoveListener} listener The remove function to add.
         */
        private static __spliceRemoveListener(uid, listener);
        /**
         * Gets controls that have a specific key/value string pair.
         * @param {plat.IControl} control The at which to start searching for key/value pairs.
         * @param {string} key The key to search for on all the controls in the tree.
         * @param {string} value The expected value used to find similar controls.
         */
        private static __getControls(control, key, value);
        /**
         * A unique id, created during instantiation and found on every Control.
         */
        public uid: string;
        /**
         * The type of a Control.
         */
        public type: string;
        /**
         * Specifies the priority of the control. The purpose of
         * this is so that controls like plat-bind can have a higher
         * priority than plat-tap. The plat-bind will be initialized
         * and loaded before plat-tap, meaning it has the first chance
         * to respond to events.
         */
        public priority: number;
        /**
         * The parent control that created this control.
         */
        public parent: ui.ITemplateControl;
        /**
         * The HTMLElement that represents this Control. Should only be modified by controls that implement
         * ITemplateControl. During initialize the control should populate this element with what it wishes
         * to render to the user.
         * When there is innerHTML in the element prior to instantiating the control:
         *     The element will include the innerHTML
         * When the control implements templateString or templateUrl:
         *     The serialized DOM will be auto-generated and included in the element. Any
         *     innerHTML will be stored in the innerTemplate property on the control.
         * After an IControl is initialized its element will be compiled.
         */
        public element: HTMLElement;
        /**
         * The attributes object representing all the attributes for a Control's element. All attributes are
         * converted from dash notation to camelCase.
         */
        public attributes: ui.IAttributesInstance;
        /**
         * Contains DOM helper methods for manipulating this control's element.
         */
        public dom: ui.IDom;
        /**
         * The constructor for a control. Any injectables specified during control registration will be
         * passed into the constructor as arguments as long as the control is instantiated with its associated
         * injector.
         */
        constructor();
        /**
         * The initialize event method for a control. In this method a control should initialize all the necessary
         * variables. This method is typically only necessary for view controls. If a control does not implement
         * IBaseViewControl then it is not safe to access, observe, or modify
         * the context property in this method. A view control should call services/set context in this method in
         * order to fire the loaded event. No control will be loaded until the view control has specified a context.
         */
        public initialize(): void;
        /**
         * The loaded event method for a control. This event is fired after a control has been loaded,
         * meaning all of its children have also been loaded and initial DOM has been created and populated. It is now
         * safe for all controls to access, observe, and modify the context property.
         */
        public loaded(): void;
        /**
         * Retrieves all the controls with the specified name.
         * @param {string} name The string name with which to populate the returned controls array.
         */
        public getControlsByName(name: string): IControl[];
        /**
         * Retrieves all the controls of the specified type.
         * @param {string} type The type used to find controls (e.g. 'plat-foreach')
         */
        public getControlsByType<T extends Control>(type: string): T[];
        /**
         * Retrieves all the controls of the specified type.
         * @param {new () => T} Constructor The constructor used to find controls.
         */
        public getControlsByType<T extends Control>(Constructor: new() => T): T[];
        /**
         * Adds an event listener of the specified type to the specified element. Removal of the
         * event is handled automatically upon disposal.
         * @param {EventTarget} element The element to add the event listener to.
         * @param {string} type The type of event to listen to.
         * @param {plat.ui.IGestureListener} listener The listener to fire when the event occurs.
         * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
         * of event propagation.
         */
        public addEventListener(element: EventTarget, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        /**
         * Adds an event listener of the specified type to the specified element. Removal of the
         * event is handled automatically upon disposal.
         * @param {EventTarget} element The element to add the event listener to.
         * @param {string}  type The type of event to listen to.
         * @param {EventListener} listener The listener to fire when the event occurs.
         * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
         * of event propagation.
         */
        public addEventListener(element: EventTarget, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
        /**
         * Allows a Control to observe any property on its context and receive updates when
         * the property is changed.
         * @param {any} context The immediate parent object containing the property.
         * @param {string} property The property identifier to watch for changes.
         * @param {(value: T, oldValue: T) => void} listener The method called when the property is changed. This method
         * will have its 'this' context set to the control instance.
         */
        public observe<T>(context: any, property: string, listener: (value: T, oldValue: T) => void): IRemoveListener;
        /**
         * Allows a Control to observe any property on its context and receive updates when
         * the property is changed.
         * @param {any} context The immediate parent object containing the property.
         * @param {number} property The property identifier to watch for changes.
         * @param {(value: T, oldValue: T) => void} listener The method called when the property is changed. This method
         * will have its 'this' context set to the control instance.
         */
        public observe<T>(context: any, property: number, listener: (value: T, oldValue: T) => void): IRemoveListener;
        /**
         * Allows a Control to observe an array and receive updates when certain array-changing methods are called.
         * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method does not watch
         * every item in the array.
         * @param {any} context The immediate parent object containing the array as a property.
         * @param {string} property The array property identifier to watch for changes.
         * @param {(ev: plat.observable.IArrayMethodInfo<T>) => void} listener The method called when an array-changing method is called.
         * This method will have its 'this' context set to the control instance.
         */
        public observeArray<T>(context: any, property: string, listener: (ev: observable.IArrayMethodInfo<T>) => void): IRemoveListener;
        /**
         * Allows a Control to observe an array and receive updates when certain array-changing methods are called.
         * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method does not watch
         * every item in the array.
         * @param {any} context The immediate parent object containing the array as a property.
         * @param {number} property The array property identifier to watch for changes.
         * @param {(ev: plat.observable.IArrayMethodInfo<T>) => void} listener The method called when an array-changing method is called.
         * This method will have its 'this' context set to the control instance.
         */
        public observeArray<T>(context: any, property: number, listener: (ev: observable.IArrayMethodInfo<T>) => void): IRemoveListener;
        /**
         * Parses an expression string and observes any associated identifiers. When an identifier
         * value changes, the listener will be called.
         * @param {string} expression The expression string to watch for changes.
         * @param {(value: any, oldValue: any) => void} listener The listener to call when the expression identifer values change.
         */
        public observeExpression(expression: string, listener: (value: any, oldValue: any) => void): IRemoveListener;
        /**
         * Using a IParsedExpression observes any associated identifiers. When an identifier
         * value changes, the listener will be called.
         * @param {plat.expressions.IParsedExpression} expression The expression string to watch for changes.
         * @param {(value: any, oldValue: any) => void} listener The listener to call when the expression identifer values change.
         */
        public observeExpression(expression: expressions.IParsedExpression, listener: (value: any, oldValue: any) => void): IRemoveListener;
        /**
         * Evaluates an expression string, using the control.parent.context.
         * @param {string} expression The expression string to evaluate.
         * @param {any} aliases Optional alias values to parse with the expression
         */
        public evaluateExpression(expression: string, aliases?: any): any;
        /**
         * Evaluates an IParsedExpression using the control.parent.context.
         * @param {string} expression The expression string to evaluate.
         * @param {any} aliases Optional alias values to parse with the expression
         */
        public evaluateExpression(expression: expressions.IParsedExpression, aliases?: any): any;
        /**
         * Creates a new DispatchEvent and propagates it to controls based on the
         * provided direction mechanism. Controls in the propagation chain that registered
         * the event using the control.on() method will receive the event. Propagation will
         * always start with the sender, so the sender can both produce and consume the same
         * event.
         * @param {string} name The name of the event to send, coincides with the name used in the
         * control.on() method.
         * @param {string} direction='up' Equivalent to EventManager.UP
         * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
         */
        public dispatchEvent(name: string, direction?: 'up', ...args: any[]): void;
        /**
         * Creates a new DispatchEvent and propagates it to controls based on the
         * provided direction mechanism. Controls in the propagation chain that registered
         * the event using the control.on() method will receive the event. Propagation will
         * always start with the sender, so the sender can both produce and consume the same
         * event.
         * @param {string} name The name of the event to send, coincides with the name used in the
         * control.on() method.
         * @param {string} direction='down' Equivalent to EventManager.DOWN
         * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
         */
        public dispatchEvent(name: string, direction?: 'down', ...args: any[]): void;
        /**
         * Creates a new DispatchEvent and propagates it to controls based on the
         * provided direction mechanism. Controls in the propagation chain that registered
         * the event using the control.on() method will receive the event. Propagation will
         * always start with the sender, so the sender can both produce and consume the same
         * event.
         * @param {string} name The name of the event to send, coincides with the name used in the
         * control.on() method.
         * @param {string} direction='direct' Equivalent to EventManager.DIRECT
         * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
         */
        public dispatchEvent(name: string, direction?: 'direct', ...args: any[]): void;
        /**
         * Creates a new DispatchEvent and propagates it to controls based on the
         * provided direction mechanism. Controls in the propagation chain that registered
         * the event using the control.on() method will receive the event. Propagation will
         * always start with the sender, so the sender can both produce and consume the same
         * event.
         * @param {string} name The name of the event to send, coincides with the name used in the
         * control.on() method.
         * @param {string} direction The direction in which to send the event.
         * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
         */
        public dispatchEvent(name: string, direction?: string, ...args: any[]): void;
        /**
         * Registers a listener for a DispatchEvent. The listener will be called when a
         * DispatchEvent is propagating over the control. Any number of listeners can exist
         * for a single event name.
         * @param {string} name The name of the event, cooinciding with the DispatchEvent name.
         * @param {(ev: plat.events.IDispatchEventInstance, ...args: Array<any>) => void} listener The method called when the
         * DispatchEvent is fired.
         */
        public on(name: string, listener: (ev: events.IDispatchEventInstance, ...args: any[]) => void): IRemoveListener;
        /**
         * The dispose event is called when a control is being removed from memory. A control should release
         * all of the memory it is using, including DOM event and property listeners.
         */
        public dispose(): void;
    }
    /**
     * The Type for referencing the '$ControlFactory' injectable as a dependency.
     */
    function IControlFactory($Parser?: expressions.IParser, $ContextManagerStatic?: observable.IContextManagerStatic, $EventManagerStatic?: events.IEventManagerStatic, $Promise?: async.IPromise): IControlFactory;
    /**
     * Creates and manages instances of IControl.
     */
    interface IControlFactory {
        /**
         * Finds the ancestor control for the given control that contains the root
         * context.
         * @param {plat.IControl} control The control with which to find the root.
         */
        getRootControl(control: IControl): ui.ITemplateControl;
        /**
         * Given a control, calls the loaded method for the control if it exists.
         * @param {plat.IControl} control The control to load.
         */
        load(control: IControl): async.IThenable<void>;
        /**
         * Disposes all the necessary memory for a control. Uses specific dispose
         * methods related to a control's constructor if necessary.
         * @param {plat.IControl} control The Control to dispose.
         */
        dispose(control: IControl): void;
        /**
         * Splices a control from its parent's controls list. Sets the control's parent
         * to null.
         * @param {plat.IControl} control The control whose parent will be removed.
         */
        removeParent(control: IControl): void;
        /**
         * Removes all event listeners for a control with the given uid.
         * @param {plat.IControl} control The control having its event listeners removed.
         */
        removeEventListeners(control: IControl): void;
        /**
         * Returns a new instance of Control.
         */
        getInstance(): IControl;
    }
    /**
     * Used for facilitating data and DOM manipulation. Contains lifecycle events
     * as well as properties for communicating with other controls. This is the base
     * class for all types of controls.
     */
    interface IControl {
        /**
         * A unique id, created during instantiation and found on every Control.
         */
        uid: string;
        /**
         * The type of a Control.
         */
        type?: string;
        /**
         * Specifies the priority of the control. The purpose of
         * this is so that controls like plat-bind can have a higher
         * priority than plat-tap. The plat-bind will be initialized
         * and loaded before plat-tap, meaning it has the first chance
         * to respond to events.
         */
        priority?: number;
        /**
         * The parent control that created this control.
         */
        parent?: ui.ITemplateControl;
        /**
         * The HTMLElement that represents this Control. Should only be modified by controls that implement
         * ITemplateControl. During initialize the control should populate this element with what it wishes
         * to render to the user.
         * When there is innerHTML in the element prior to instantiating the control:
         *     The element will include the innerHTML
         * When the control implements templateString or templateUrl:
         *     The serialized DOM will be auto-generated and included in the element. Any
         *     innerHTML will be stored in the innerTemplate property on the control.
         * After an IControl is initialized its element will be compiled.
         */
        element?: HTMLElement;
        /**
         * The attributes object representing all the attributes for a Control's element. All attributes are
         * converted from dash notation to camelCase.
         */
        attributes?: ui.IAttributesInstance;
        /**
         * Contains DOM helper methods for manipulating this control's element.
         */
        dom: ui.IDom;
        /**
         * The initialize event method for a control. In this method a control should initialize all the necessary
         * variables. This method is typically only necessary for view controls. If a control does not implement
         * IBaseViewControl then it is not safe to access, observe, or modify
         * the context property in this method. A view control should call services/set context in this method in
         * order to fire the loaded event. No control will be loaded until the view control has specified a context.
         */
        initialize? (): void;
        /**
         * The loaded event method for a control. This event is fired after a control has been loaded,
         * meaning all of its children have also been loaded and initial DOM has been created and populated. It is now
         * safe for all controls to access, observe, and modify the context property.
         */
        loaded? (): any;
        /**
         * Retrieves all the controls with the specified name.
         * @param {string} name The string name with which to populate the returned controls array.
         */
        getControlsByName? (name: string): IControl[];
        /**
         * Retrieves all the controls of the specified type.
         * @param {string} type The type used to find controls (e.g. 'plat-foreach')
         */
        getControlsByType? <T extends IControl>(type: string): T[];
        /**
         * Retrieves all the controls of the specified type.
         * @param {new () => T} Constructor The constructor used to find controls.
         */
        getControlsByType? <T extends IControl>(Constructor: new() => T): T[];
        /**
         * Adds an event listener of the specified type to the specified element. Removal of the
         * event is handled automatically upon disposal.
         * @param {EventTarget} element The element to add the event listener to.
         * @param {string} type The type of event to listen to.
         * @param {plat.ui.IGestureListener} listener The listener to fire when the event occurs.
         * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
         * of event propagation.
         */
        addEventListener? (element: EventTarget, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        /**
         * Adds an event listener of the specified type to the specified element. Removal of the
         * event is handled automatically upon disposal.
         * @param {EventTarget} element The element to add the event listener to.
         * @param {string}  type The type of event to listen to.
         * @param {EventListener} listener The listener to fire when the event occurs.
         * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
         * of event propagation.
         */
        addEventListener? (element: EventTarget, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
        /**
         * Allows a Control to observe any property on its context and receive updates when
         * the property is changed.
         * @param {any} context The immediate parent object containing the property.
         * @param {string} property The property identifier to watch for changes.
         * @param {(value: T, oldValue: T) => void} listener The method called when the property is changed.
         * This method will have its 'this' context set to the control instance.
         */
        observe? <T>(context: any, property: string, listener: (value: T, oldValue: T) => void): IRemoveListener;
        /**
         * Allows a Control to observe any property on its context and receive updates when
         * the property is changed.
         * @param {any} context The immediate parent object containing the property.
         * @param {number} property The property identifier to watch for changes.
         * @param {(value: T, oldValue: T) => void} listener The method called when the property is changed.
         * This method will have its 'this' context set to the control instance.
         */
        observe? <T>(context: any, property: number, listener: (value: T, oldValue: T) => void): IRemoveListener;
        /**
         * Allows a Control to observe an array and receive updates when certain array-changing methods are called.
         * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method does not watch
         * every item in the array.
         * @param {any} context The immediate parent object containing the array as a property.
         * @param {string} property The array property identifier to watch for changes.
         * @param {(ev: plat.observable.IArrayMethodInfo<T>) => void} listener The method called when an array-changing method is called.
         * This method will have its 'this' context set to the control instance.
         */
        observeArray? <T>(context: any, property: string, listener: (ev: observable.IArrayMethodInfo<T>) => void): IRemoveListener;
        /**
         * Allows a Control to observe an array and receive updates when certain array-changing methods are called.
         * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method does not watch
         * every item in the array.
         * @param {any} context The immediate parent object containing the array as a property.
         * @param {number} property The array property identifier to watch for changes.
         * @param {(ev: plat.observable.IArrayMethodInfo<T>) => void} listener The method called when an array-changing method is called.
         * This method will have its 'this' context set to the control instance.
         */
        observeArray? <T>(context: any, property: number, listener: (ev: observable.IArrayMethodInfo<T>) => void): IRemoveListener;
        /**
         * Parses an expression string and observes any associated identifiers. When an identifier
         * value changes, the listener will be called.
         * @param {string} expression The expression string to watch for changes.
         * @param {(value: any, oldValue: any) => void} listener The listener to call when the expression identifer values change.
         */
        observeExpression? (expression: string, listener: (value: any, oldValue: any) => void): IRemoveListener;
        /**
         * Using a IParsedExpression observes any associated identifiers. When an identifier
         * value changes, the listener will be called.
         * @param {plat.expressions.IParsedExpression} expression The expression string to watch for changes.
         * @param {(value: any, oldValue: any) => void} listener The listener to call when the expression identifer values change.
         */
        observeExpression? (expression: expressions.IParsedExpression, listener: (value: any, oldValue: any) => void): IRemoveListener;
        /**
         * Evaluates an expression string, using the control.parent.context.
         * @param {string} expression The expression string to evaluate.
         * @param {any} aliases Optional alias values to parse with the expression
         */
        evaluateExpression? (expression: string, aliases?: any): any;
        /**
         * Evaluates an IParsedExpression using the control.parent.context.
         * @param {string} expression The expression string to evaluate.
         * @param {any} aliases Optional alias values to parse with the expression
         */
        evaluateExpression? (expression: expressions.IParsedExpression, aliases?: any): any;
        /**
         * Creates a new DispatchEvent and propagates it to controls based on the
         * provided direction mechanism. Controls in the propagation chain that registered
         * the event using the control.on() method will receive the event. Propagation will
         * always start with the sender, so the sender can both produce and consume the same
         * event.
         * @param {string} name The name of the event to send, coincides with the name used in the
         * control.on() method.
         * @param {string} direction='up' Equivalent to EventManager.UP
         * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
         */
        dispatchEvent? (name: string, direction?: 'up', ...args: any[]): void;
        /**
         * Creates a new DispatchEvent and propagates it to controls based on the
         * provided direction mechanism. Controls in the propagation chain that registered
         * the event using the control.on() method will receive the event. Propagation will
         * always start with the sender, so the sender can both produce and consume the same
         * event.
         * @param {string} name The name of the event to send, coincides with the name used in the
         * control.on() method.
         * @param {string} direction='down' Equivalent to EventManager.DOWN
         * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
         */
        dispatchEvent? (name: string, direction?: 'down', ...args: any[]): void;
        /**
         * Creates a new DispatchEvent and propagates it to controls based on the
         * provided direction mechanism. Controls in the propagation chain that registered
         * the event using the control.on() method will receive the event. Propagation will
         * always start with the sender, so the sender can both produce and consume the same
         * event.
         * @param {string} name The name of the event to send, coincides with the name used in the
         * control.on() method.
         * @param {string} direction='direct' Equivalent to EventManager.DIRECT
         * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
         */
        dispatchEvent? (name: string, direction?: 'direct', ...args: any[]): void;
        /**
         * Creates a new DispatchEvent and propagates it to controls based on the
         * provided direction mechanism. Controls in the propagation chain that registered
         * the event using the control.on() method will receive the event. Propagation will
         * always start with the sender, so the sender can both produce and consume the same
         * event.
         * @param {string} name The name of the event to send, coincides with the name used in the
         * control.on() method.
         * @param {string} direction The direction in which to send the event.
         * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
         */
        dispatchEvent? (name: string, direction?: string, ...args: any[]): void;
        /**
         * Registers a listener for a DispatchEvent. The listener will be called when a
         * DispatchEvent is propagating over the control. Any number of listeners can
         * exist for a single event name.
         * @param {string} name The name of the event, cooinciding with the DispatchEvent name.
         * @param {(ev: plat.events.IDispatchEventInstance, ...args: Array<any>) => void} listener The method called when the
         * DispatchEvent is fired.
         */
        on? (name: string, listener: (ev: events.IDispatchEventInstance, ...args: any[]) => void): IRemoveListener;
        /**
         * The dispose event is called when a control is being removed from memory. A control should release
         * all of the memory it is using, including DOM event and property listeners.
         */
        dispose? (): void;
    }
    /**
     * A type of control that can be used as an attribute but will
     * not be used to add, remove, or modify DOM.
     */
    class AttributeControl extends Control implements IAttributeControl {
        /**
         * Method for disposing an attribute control. Removes any
         * necessary objects from the control.
         * @param {plat.IAttributeControl} control The AttributeControl to dispose.
         */
        static dispose(control: IAttributeControl): void;
        /**
         * Returns a new instance of AttributeControl.
         */
        static getInstance(): IAttributeControl;
        /**
         * Specifies the ITemplateControl associated with this
         * control's element. Can be null if no ITemplateControl
         * exists.
         */
        public templateControl: ui.ITemplateControl;
    }
    /**
     * The Type for referencing the '$AttributeControlFactory' injectable as a dependency.
     */
    function IAttributeControlFactory(): IAttributeControlFactory;
    /**
     * Creates and manages instances of IAttributeControl.
     */
    interface IAttributeControlFactory {
        /**
         * Method for disposing an attribute control. Removes any
         * necessary objects from the control.
         * @param {plat.IAttributeControl} control The AttributeControl to dispose.
         */
        dispose(control: IAttributeControl): void;
        /**
         * Returns a new instance of AttributeControl.
         */
        getInstance(): IAttributeControl;
    }
    /**
     * An object describing a type of control that can be used as an attribute but will
     * not be used to add, remove, or modify DOM.
     */
    interface IAttributeControl extends IControl {
        /**
         * Specifies the ITemplateControl associated with this
         * control's element. Can be null if no ITemplateControl
         * exists.
         */
        templateControl?: ui.ITemplateControl;
    }
    /**
     * Holds all the classes and interfaces related to UI components for platypus.
     */
    module ui {
        /**
         * The base control for any control that affects the UI. They provide properties for the control to use
         * to manage its body HTML.
         */
        class TemplateControl extends Control implements ITemplateControl {
            /**
             * Reference to the IResourcesFactory injectable.
             */
            static $ResourcesFactory: IResourcesFactory;
            /**
             * Reference to the IBindableTemplatesFactory injectable.
             */
            static $BindableTemplatesFactory: IBindableTemplatesFactory;
            /**
             * Reference to a cache injectable that stores IElementManagers.
             */
            static $ManagerCache: storage.ICache<processing.IElementManager>;
            /**
             * Reference to a cache injectable that stores and retrieves HTML templates.
             */
            static $TemplateCache: storage.ITemplateCache;
            /**
             * Reference to the IParser injectable.
             */
            static $Parser: expressions.IParser;
            /**
             * Reference to the IHttp injectable.
             */
            static $Http: async.IHttp;
            /**
             * Reference to the IPromise injectable.
             */
            static $Promise: async.IPromise;
            /**
             * Evaluates an expression string with a given control and optional control's context and aliases.
             * @param {string} expression The expression string (e.g. 'foo + foo').
             * @param {plat.ui.ITemplateControl} control? The control used for evaluation context.
             * @param {any} aliases? An optional alias object containing resource alias values
             */
            static evaluateExpression(expression: string, control?: ITemplateControl, aliases?: any): any;
            /**
             * Evaluates an expression string with a given control and optional control's context and aliases.
             * @param {plat.expressions.IParsedExpression} expression A parsed expression object created using the
             * plat.expressions.IParser injectable.
             * @param {plat.ui.ITemplateControl} control? The control used for evaluation context.
             * @param {any} aliases? An optional alias object containing resource alias values
             */
            static evaluateExpression(expression: expressions.IParsedExpression, control?: ITemplateControl, aliases?: any): any;
            /**
             * Given a control and Array of aliases, finds the associated resources and builds a context object containing
             * the values. Returns the object.
             * @param {plat.ui.ITemplateControl} control The control used as the starting point for finding resources.
             * @param {Array<string>} aliases An array of aliases to search for.
             * @param {any} resources? An optional resources object to extend, if no resources object is passed in a new one will be created.
             */
            static getResources(control: ITemplateControl, aliases: string[], resources?: any): IObject<any>;
            /**
             * Starts at a control and searches up its parent chain for a particular resource alias.
             * If the resource is found, it will be returned along with the control instance on which
             * the resource was found.
             * @param {plat.ui.ITemplateControl} control The control on which to start searching for the resource alias.
             * @param {string} alias The alias to search for.
             * found resource along with its corresponding control.
             */
            static findResource(control: ITemplateControl, alias: string): {
                resource: IResource;
                control: ITemplateControl;
            };
            /**
             * Recursively disposes a control and its children.
             * @param {plat.ui.ITemplateControl} control A control to dispose.
             */
            static dispose(control: ITemplateControl): void;
            /**
             * Loads the control tree depth first (visit children, then visit self).
             * @param {plat.ui.ITemplateControl} control The control serving as the root control to load.
             */
            static loadControl(control: ITemplateControl): void;
            /**
             * Notifies a control that its context has been changed by
             * calling the "control.contextChanged" method if it exists.
             * @param {plat.ui.ITemplateControl} control The control whose context changed.
             * @param {any} newValue The new value of the control's context.
             * @param {any} oldValue The old value of the control's context.
             */
            static contextChanged(control: ITemplateControl, newValue: any, oldValue: any): void;
            /**
             * Sets the 'context' resource value on a ITemplateControl. If the control specifies
             * hasOwnContext as true, the 'rootContext' resource value will be set.
             * @param {plat.ui.ITemplateControl} control The control whose context resources will be set.
             */
            static setContextResources(control: ITemplateControl): void;
            /**
             * Completely removes a control's element from its parentNode. If the
             * control implements replaceWith=null, All of its nodes between its
             * startNode and endNode (inclusive) will be removed.
             * @param {plat.ui.ITemplateControl} control The control whose element should be removed.
             */
            static removeElement(control: ITemplateControl): void;
            /**
             * Sets the absoluteContextPath read-only property on a control.
             * @param {plat.ui.ITemplateControl} control The control on which to set the absoluteContextPath.
             * @param {string} path The path to set on the control.
             */
            static setAbsoluteContextPath(control: ITemplateControl, path: string): void;
            /**
             * Determines the template for a control by searching for a templateUrl,
             * using the provided templateUrl, or serializing the control's templateString.
             * @param {plat.ui.ITemplateControl} control The control whose template is being determined.
             * @param {string} templateUrl? The potential template URL to use to grab the template.
             */
            static determineTemplate(control: ITemplateControl, templateUrl?: string): async.IThenable<DocumentFragment>;
            /**
             * Detaches a TemplateControl. Disposes its children,
             * but does not dispose the TemplateControl.
             * @param {plat.ui.ITemplateControl} control The control to be detached.
             */
            static detach(control: ITemplateControl): void;
            /**
             * Returns a new instance of TemplateControl.
             */
            static getInstance(): ITemplateControl;
            /**
             * An object for quickly retrieving previously accessed resources.
             */
            private static __resourceCache;
            /**
             * By default TemplateControls have a priority of 100.
             */
            public priority: number;
            /**
             * The context of an ITemplateControl, used for inheritance and data-binding.
             */
            public context: any;
            /**
             * The name of a ITemplateControl if a Name
             * control is involved.
             */
            public name: string;
            /**
             * Specifies the absolute path from where the context was created to this IControl's context.
             * Used by the ContextManager for maintaining context parity
             * (e.g. 'context.childContextProperty.grandChildContextProperty').
             */
            public absoluteContextPath: string;
            /**
             * Resources are used for providing aliases to use in markup expressions. They
             * are particularly useful when trying to access properties outside of the
             * current context, as well as reassigning context at any point in an app.
             * By default, every control has a resource for '@control' and '@context'.
             * IViewControl objects also have a resource for '@root' and '@rootContext',
             * which is a reference to their root control and root context.
             * Resources can be created in HTML, or through the exposed control.resources
             * object. If specified in HTML, they must be the first element child of the
             * control upon which the resources will be placed. IViewControls that use a
             * templateUrl can have resources as their first element in the templateUrl.
             * In the provided example, the resources can be accessed by using '@Cache' and '@testObj'.
             * The type of resource is denoted by the element name.
             * Only resources of type 'observable' will have data binding. The types of resources are:
             * function, injectable, observable, and object. Resources of type 'function' will have their
             * associated function context bound to the control that contains the resource.
             * When an alias is found in a markup expression, the framework will search up the control chain
             * to find the alias on a control's resources. This first matching alias will be used.
             * <custom-control>
             *     <plat-resources>
             *         <injectable alias="Cache">$CacheFactory</injectable>
             *         <observable alias="testObj">
             *              {
             *                  foo: 'foo',
             *                  bar: 'bar',
             *                  baz: 2
             *              }
             *         </observable>
             *     </plat-resources>
             * </custom-control>
             */
            public resources: IResources;
            /**
             * Flag indicating whether or not the ITemplateControl defines the context property.
             */
            public hasOwnContext: boolean;
            /**
             * A string representing the DOM template for this control. If this property is
             * defined on a ITemplateControl then DOM will be created and put in the
             * control's element prior to calling the 'setTemplate' method.
             */
            public templateString: string;
            /**
             * A url containing a string representing the DOM template for this control. If this property is
             * defined on a ITemplateControl then DOM will be created and put in the
             * control's element prior to calling the 'setTemplate' method. This property takes
             * precedence over templateString. In the event that both are defined, templateString
             * will be ignored.
             */
            public templateUrl: string;
            /**
             * A DocumentFragment representing the innerHTML that existed when this control was instantiated.
             * This property will only contain the innerHTML when either a templateString or templateUrl is
             * defined. Its important to clone this property when injecting it somewhere, else its childNodes
             * will disappear.
             */
            public innerTemplate: DocumentFragment;
            /**
             * An IBindableTemplates object used for binding a data context to a template.
             * This is an advanced function of a ITemplateControl.
             */
            public bindableTemplates: IBindableTemplates;
            /**
             * An array of child controls. Any controls created by this control can be found in this array. The controls in
             * this array will have reference to this control in their parent property.
             */
            public controls: IControl[];
            /**
             * A Node array for managing the ITemplateControl's childNodes in the event that this control
             * replaces its element. This property will only exist/be of use for a ITemplateControl that
             * implements the replaceWith property.
             */
            public elementNodes: Node[];
            /**
             * The first node in the ITemplateControl's body. This property will be a Comment node when the
             * control implements replaceWith = null, otherwise it will be null. This property allows an
             * ITemplateControl to add nodes to its body in the event that it replaces its element.
             */
            public startNode: Node;
            /**
             * The last node in the ITemplateControl's body. This property will be a Comment node when the
             * control implements the replaceWith property, otherwise it will be null. This property allows a
             * ITemplateControl to add nodes to its body in the event that it replaces its element.
             */
            public endNode: Node;
            /**
             * Allows a ITemplateControl to either swap its element with another element (e.g. plat-select),
             * or replace its element altogether. If null or empty string, the element will be removed from the DOM, and the
             * childNodes of the element will be in its place. In addition, when the element is placed startNode and endNode Comments
             * are created, and the childNodes are added to the elementNodes property on the control. The replaceWith
             * property can be any property that works with document.createElement(). If the control's element had
             * attributes (as well as attribute IControls), those attributes will be carried to the swapped element. The default
             * replaceWith is 'any,' meaning it will default to a 'div' in the case that the control type is used as the
             * element's nodename (e.g. <plat-foreach plat-context="..."></plat-foreach>), but will maintain whatever element type
             * is used otherwise (e.g. <tr plat-control="plat-foreach" plat-context="..."></tr>).
             */
            public replaceWith: string;
            /**
             * Set to the root ancestor control from which this control inherits its context. This value
             * can be equal to this control.
             */
            public root: ITemplateControl;
            /**
             * This event is fired when an ITemplateControl's context property
             * is changed by an ancestor control.
             * @param {any} newValue? The new value of the context.
             * @param {any} oldValue? The old value of the context.
             */
            public contextChanged(newValue?: any, oldValue?: any): void;
            /**
             * A method called for ITemplateControls to set their template.
             * During this method a control should ready its template for compilation. Whatever is in the control's
             * element (or elementNodes if replaceWith is implemented) after this method's execution will be compiled
             * and appear on the DOM.
             */
            public setTemplate(): void;
            /**
             * Finds the identifier string associated with the given context object. The string returned
             * is the path from a control's context.
             * @param {any} context The object/primitive to locate on the control's context.
             *     // returns 'title.font'
             *     this.getIdentifier(this.context.title.font);
             */
            public getIdentifier(context: any): string;
            /**
             * Finds the absolute identifier string associated with the given context object. The string returned
             * is the path from a control's root ancestor's context.
             * @param {any} context The object/primitive to locate on the root control's context.
             */
            public getAbsoluteIdentifier(context: any): string;
            /**
             * Finds the associated resources and builds a context object containing
             * the values.
             * @param {Array<string>} aliases An array of aliases to search for.
             * @param {any} resources? An optional resources object to extend, if no resources object is passed in a new one will be created.
             */
            public getResources(aliases: string[], resources?: any): IObject<any>;
            /**
             * Starts at a control and searches up its parent chain for a particular resource alias.
             * If the resource is found, it will be returned along with the control instance on which
             * the resource was found.
             * @param {string} alias The alias to search for.
             * found resource along with its corresponding control.
             */
            public findResource(alias: string): {
                resource: IResource;
                control: ITemplateControl;
            };
            /**
             * Evaluates an expression string, using the input context or control.context.
             * @param {string} expression The expression string to evaluate.
             * @param {any} context? An optional context with which to parse. If
             * no context is specified, the control.context will be used.
             */
            public evaluateExpression(expression: string, context?: any): any;
            /**
             * Evaluates an expression string, using the input context or control.context.
             * @param {plat.expressions.IParsedExpression} expression The previously parsed expression to evaluate.
             * @param {any} context? An optional context with which to parse. If
             * no context is specified, the control.context will be used.
             */
            public evaluateExpression(expression: expressions.IParsedExpression, context?: any): any;
        }
        /**
         * The Type for referencing the '$TemplateControlFactory' injectable as a dependency.
         */
        function ITemplateControlFactory($ResourcesFactory?: IResourcesFactory, $BindableTemplatesFactory?: IBindableTemplatesFactory, $ManagerCache?: storage.ICache<processing.IElementManager>, $TemplateCache?: storage.ITemplateCache, $Parser?: expressions.IParser, $Http?: async.IHttp, $Promise?: async.IPromise): ITemplateControlFactory;
        /**
         * Creates and manages ITemplateControls.
         */
        interface ITemplateControlFactory {
            /**
             * Evaluates an expression string with a given control and optional control's context and aliases.
             * @param {string} expression The expression string (e.g. 'foo + foo').
             * @param {plat.ui.ITemplateControl} control? The control used for evaluation context.
             * @param {any} aliases? An optional alias object containing resource alias values
             */
            evaluateExpression(expression: string, control?: ITemplateControl, aliases?: any): any;
            /**
             * Evaluates an expression string with a given control and optional control's context and aliases.
             * @param {plat.expressions.IParsedExpression} expression A parsed expression object created using the
             * plat.expressions.IParser injectable.
             * @param {plat.ui.ITemplateControl} control? The control used for evaluation context.
             * @param {any} aliases? An optional alias object containing resource alias values
             */
            evaluateExpression(expression: expressions.IParsedExpression, control?: ITemplateControl, aliases?: any): any;
            /**
             * Given a control and Array of aliases, finds the associated resources and builds a context object containing
             * the values. Returns the object.
             * @param {plat.ui.ITemplateControl} control The control used as the starting point for finding resources.
             * @param {Array<string>} aliases An array of aliases to search for.
             * @param {any} resources? An optional resources object to extend, if no resources object is passed in a new one will be created.
             */
            getResources(control: ITemplateControl, aliases: string[], resources?: any): IObject<any>;
            /**
             * Starts at a control and searches up its parent chain for a particular resource alias.
             * If the resource is found, it will be returned along with the control instance on which
             * the resource was found.
             * @param {plat.ui.ITemplateControl} control The control on which to start searching for the resource alias.
             * @param {string} alias The alias to search for.
             * found resource along with its corresponding control.
             */
            findResource(control: ITemplateControl, alias: string): {
                resource: IResource;
                control: ITemplateControl;
            };
            /**
             * Recursively disposes a control and its children.
             * @param {plat.ui.ITemplateControl} control A control to dispose.
             */
            dispose(control: ITemplateControl): void;
            /**
             * Loads the control tree depth first (visit children, then visit self).
             * @param {plat.ui.ITemplateControl} control The control serving as the root control to load.
             */
            loadControl(control: ITemplateControl): void;
            /**
             * Notifies a control that its context has been changed by
             * calling the "control.contextChanged" method if it exists.
             * @param {plat.ui.ITemplateControl} control The control whose context changed.
             * @param {any} newValue The new value of the control's context.
             * @param {any} oldValue The old value of the control's context.
             */
            contextChanged(control: ITemplateControl, newValue: any, oldValue: any): void;
            /**
             * Sets the 'context' resource value on a ITemplateControl. If the control specifies
             * hasOwnContext as true, the 'rootContext' resource value will be set.
             * @param {plat.ui.ITemplateControl} control The control whose context resources will be set.
             */
            setContextResources(control: ITemplateControl): void;
            /**
             * Completely removes a control's element from its parentNode. If the
             * control implements replaceWith=null, All of its nodes between its
             * startNode and endNode (inclusive) will be removed.
             * @param {plat.ui.ITemplateControl} control The control whose element should be removed.
             */
            removeElement(control: ITemplateControl): void;
            /**
             * Sets the absoluteContextPath read-only property on a control.
             * @param {plat.ui.ITemplateControl} control The control on which to set the absoluteContextPath.
             * @param {string} path The path to set on the control.
             */
            setAbsoluteContextPath(control: ITemplateControl, path: string): void;
            /**
             * Determines the template for a control by searching for a templateUrl,
             * using the provided templateUrl, or serializing the control's templateString.
             * @param {plat.ui.ITemplateControl} control The control whose template is being determined.
             * @param {string} templateUrl? The potential template URL to use to grab the template.
             */
            determineTemplate(control: ITemplateControl, templateUrl?: string): async.IThenable<DocumentFragment>;
            /**
             * Detaches a TemplateControl. Disposes its children,
             * but does not dispose the TemplateControl.
             * @param {plat.ui.ITemplateControl} control The control to be detached.
             */
            detach(control: ITemplateControl): void;
            /**
             * Returns a new instance of TemplateControl.
             */
            getInstance(): ITemplateControl;
        }
        /**
         * Describes a control which provides properties and methods for managing its body HTML.
         */
        interface ITemplateControl extends IControl {
            /**
             * The context of an ITemplateControl, used for inheritance and data-binding.
             */
            context?: any;
            /**
             * The name of a ITemplateControl if a Name
             * control is involved and placed on its element.
             */
            name?: string;
            /**
             * Specifies the absolute path from where the context was created to this IControl's context.
             * Used by the ContextManager for maintaining context parity
             * (e.g. 'context.childContextProperty.grandChildContextProperty').
             */
            absoluteContextPath?: string;
            /**
             * Resources are used for providing aliases to use in markup expressions. They
             * are particularly useful when trying to access properties outside of the
             * current context, as well as reassigning context at any point in an app.
             * By default, every control has a resource for '@control' and '@context'.
             * IViewControl objects also have a resource for '@root' and '@rootContext',
             * which is a reference to their root control and root context.
             * Resources can be created in HTML, or through the exposed control.resources
             * object. If specified in HTML, they must be the first element child of the
             * control upon which the resources will be placed. IViewControls that use a
             * templateUrl can have resources as their first element in the templateUrl.
             * In the provided example, the resources can be accessed by using '@Cache' and '@testObj'.
             * The type of resource is denoted by the element name.
             * Only resources of type 'observable' will have data binding. The types of resources are:
             * function, injectable, observable, and object. Resources of type 'function' will have their
             * associated function context bound to the control that contains the resource.
             * When an alias is found in a markup expression, the framework will search up the control chain
             * to find the alias on a control's resources. This first matching alias will be used.
             * <custom-control>
             *     <plat-resources>
             *         <injectable alias="Cache">$CacheFactory</injectable>
             *         <observable alias="testObj">
             *              {
             *                  foo: 'foo',
             *                  bar: 'bar',
             *                  baz: 2
             *              }
             *         </observable>
             *     </plat-resources>
             * </custom-control>
             */
            resources?: IResources;
            /**
             * Flag indicating whether or not the ITemplateControl defines the context property.
             */
            hasOwnContext?: boolean;
            /**
             * A string representing the DOM template for this control. If this property is
             * defined on a ITemplateControl then DOM will be created and put in the
             * control's element prior to calling the 'setTemplate' method.
             */
            templateString?: string;
            /**
             * A url containing a string representing the DOM template for this control. If this property is
             * defined on a ITemplateControl then DOM will be created and put in the
             * control's element prior to calling the 'setTemplate' method. This property takes
             * precedence over templateString. In the event that both are defined, templateString
             * will be ignored.
             */
            templateUrl?: string;
            /**
             * A DocumentFragment representing the innerHTML that existed when this control was instantiated.
             * This property will only contain the innerHTML when either a templateString or templateUrl is
             * defined. Its important to clone this property when injecting it somewhere, else its childNodes
             * will disappear.
             */
            innerTemplate?: DocumentFragment;
            /**
             * An IBindableTemplates object used for binding a data context to a template.
             * This is an advanced function of a ITemplateControl.
             */
            bindableTemplates?: IBindableTemplates;
            /**
             * An array of child controls. Any controls created by this control can be found in this array. The controls in
             * this array will have reference to this control in their parent property.
             */
            controls?: IControl[];
            /**
             * A Node array for managing the ITemplateControl's childNodes in the event that this control
             * replaces its element. This property will only exist/be of use for a ITemplateControl that
             * implements the replaceWith property.
             */
            elementNodes?: Node[];
            /**
             * The first node in the ITemplateControl's body. This property will be a Comment node when the
             * control implements replaceWith = null, otherwise it will be null. This property allows an
             * ITemplateControl to add nodes to its body in the event that it replaces its element.
             */
            startNode?: Node;
            /**
             * The last node in the ITemplateControl's body. This property will be a Comment node when the
             * control implements the replaceWith property, otherwise it will be null. This property allows a
             * ITemplateControl to add nodes to its body in the event that it replaces its element.
             */
            endNode?: Node;
            /**
             * Allows a ITemplateControl to either swap its element with another element (e.g. plat-select),
             * or replace its element altogether. If null or empty string, the element will be removed from the DOM, and the
             * childNodes of the element will be in its place. In addition, when the element is placed startNode and endNode Comments
             * are created, and the childNodes are added to the elementNodes property on the control. The replaceWith
             * property can be any property that works with document.createElement(). If the control's element had
             * attributes (as well as attribute IControls), those attributes will be carried to the swapped element. The default
             * replaceWith is 'any,' meaning it will default to a 'div' in the case that the control type is used as the
             * element's nodename (e.g. <plat-foreach plat-context="..."></plat-foreach>), but will maintain whatever element type
             * is used otherwise (e.g. <tr plat-control="plat-foreach" plat-context="..."></tr>).
             */
            replaceWith?: string;
            /**
             * Set to the root ancestor control from which this control inherits its context. This value
             * can be equal to this control.
             */
            root?: ITemplateControl;
            /**
             * A method called for ITemplateControls to set their template.
             * During this method a control should ready its template for compilation. Whatever is in the control's
             * element (or elementNodes if replaceWith is implemented) after this method's execution will be compiled
             * and appear on the DOM.
             */
            setTemplate? (): void;
            /**
             * This event is fired when an ITemplateControl's context property
             * is changed by an ancestor control.
             * @param {any} newValue? The new value of the context.
             * @param {any} oldValue? The old value of the context.
             */
            contextChanged? (newValue: any, oldValue: any): void;
            /**
             * Finds the identifier string associated with the given context object. The string returned
             * is the path from a control's context.
             * @param {any} context The object/primitive to locate on the control's context.
             *     // returns 'title.font'
             *     this.getIdentifier(this.context.title.font);
             */
            getIdentifier? (context: any): string;
            /**
             * Finds the absolute identifier string associated with the given context object. The string returned
             * is the path from a control's root ancestor's context.
             * @param {any} context The object/primitive to locate on the root control's context.
             */
            getAbsoluteIdentifier? (context: any): string;
            /**
             * Finds the associated resources and builds a context object containing
             * the values.
             * @param {Array<string>} aliases An array of aliases to search for.
             * @param {any} resources? An optional resources object to extend, if no resources object is passed in a new one will be created.
             */
            getResources? (aliases: string[], resources?: any): IObject<any>;
            /**
             * Starts at a control and searches up its parent chain for a particular resource alias.
             * If the resource is found, it will be returned along with the control instance on which
             * the resource was found.
             * @param {string} alias The alias to search for.
             * found resource along with its corresponding control.
             */
            findResource? (alias: string): {
                resource: IResource;
                control: ITemplateControl;
            };
            /**
             * Evaluates an expression string, using the input context or control.context.
             * @param {string} expression The expression string to evaluate.
             * @param {any} context? An optional context with which to parse. If
             * no context is specified, the control.context will be used.
             */
            evaluateExpression? (expression: string, context?: any): any;
            /**
             * Evaluates an expression string, using the input context or control.context.
             * @param {plat.expressions.IParsedExpression} expression The previously parsed expression to evaluate.
             * @param {any} context? An optional context with which to parse. If
             * no context is specified, the control.context will be used.
             */
            evaluateExpression? (expression: expressions.IParsedExpression, context?: any): any;
        }
        /**
         * An extended TemplateControl that allows for the binding of a value to
         * another listening control (e.g. plat-bind control).
         */
        class BindablePropertyControl extends TemplateControl implements IBindablePropertyControl {
            /**
             * The set of functions added externally that listens
             * for property changes.
             */
            public _listeners: {
                (newValue: any, oldValue?: any): void;
            }[];
            /**
             * Adds a listener to be called when the bindable property changes.
             * @param {plat.IPropertyChangedListener} listener The function that acts as a listener.
             */
            public observeProperty(listener: (newValue: any, oldValue?: any) => void): IRemoveListener;
            /**
             * A function that lets this control know when the context's value of the bindable
             * property has changed.
             * @param {any} newValue The new value of the bindable property.
             * @param {any} oldValue? The old value of the bindable property.
             * @param {boolean} firstTime? A boolean signifying whether this is the first set of the property.
             */
            public setProperty(newValue: any, oldValue?: any, firstTime?: boolean): void;
            /**
             * A function that signifies when this control's bindable property has changed.
             * @param {any} newValue The new value of the property after the change.
             * @param {any} oldValue? The old value of the property prior to the change.
             */
            public propertyChanged(newValue: any, oldValue?: any): void;
            /**
             * Removes references to the listeners
             * defined externally.
             */
            public dispose(): void;
        }
        /**
         * Describes an object that allows for the binding of a value to
         * another listening control.
         */
        interface IBindablePropertyControl extends ITemplateControl {
            /**
             * Adds a listener to be called when the bindable property changes.
             * @param {plat.IPropertyChangedListener} listener The function that acts as a listener.
             */
            observeProperty(listener: (newValue: any, oldValue?: any) => void): IRemoveListener;
            /**
             * A function that lets this control know when the context's value of the bindable
             * property has changed.
             * @param {any} newValue The new value of the bindable property.
             * @param {any} oldValue? The old value of the bindable property.
             * @param {boolean} firstTime? A boolean signifying whether this is the first set of the property.
             */
            setProperty(newValue: any, oldValue?: any, firstTime?: boolean): void;
            /**
             * A function that signifies when this control's bindable property has changed.
             * @param {any} newValue The new value of the property after the change.
             * @param {any} oldValue? The old value of the property prior to the change.
             */
            propertyChanged(newValue: any, oldValue?: any): void;
        }
        /**
         * A control used in a IBaseport for simulated page navigation. The
         * control has navigation events that are called when navigating to and from the control.
         */
        class BaseViewControl extends TemplateControl implements IBaseViewControl {
            /**
             * Detaches a BaseViewControl. Disposes its children, but does not dispose the
             * BaseViewControl. Useful for the Navigator when storing the
             * BaseViewControl in history.
             * @param {plat.ui.BaseViewControl} control The control to be detached.
             */
            static detach(control: IBaseViewControl): void;
            /**
             * Recursively disposes a BaseViewControl and its children.
             * @param {plat.ui.BaseViewControl} control A control to dispose.
             */
            static dispose(control: IBaseViewControl): void;
            /**
             * Returns a new instance of a BaseViewControl.
             */
            static getInstance(): IBaseViewControl;
            /**
             * Specifies that this control will have its own context, and it should not inherit a context.
             */
            public hasOwnContext: boolean;
            /**
             * Specifies the navigator for this control. Used for navigating to other IBaseViewControls
             * in a {plat.ui.controls.IBaseport|IBaseport}.
             */
            public navigator: navigation.IBaseNavigator;
            /**
             * This event is fired when this control has been navigated to.
             * @param {any} parameter? A navigation parameter sent from the previous
             * IBaseViewControl.
             */
            public navigatedTo(parameter?: any): void;
            /**
             * This event is fired when this control is being navigated away from.
             */
            public navigatingFrom(): void;
        }
        /**
         * The Type for referencing the '$ViewControlFactory' injectable as a dependency.
         */
        function IBaseViewControlFactory(): IBaseViewControlFactory;
        /**
         * Creates and manages IBaseViewControls.
         */
        interface IBaseViewControlFactory {
            /**
             * Detaches a BaseViewControl. Disposes its children, but does not dispose the
             * BaseViewControl. Useful for the Navigator when storing the
             * BaseViewControl in history.
             * @param {plat.ui.BaseViewControl} control The control to be detached.
             */
            detach(control: IBaseViewControl): void;
            /**
             * Recursively disposes a BaseViewControl and its children.
             * @param {plat.ui.BaseViewControl} control A control to dispose.
             */
            dispose(control: IBaseViewControl): void;
            /**
             * Returns a new instance of a BaseViewControl.
             */
            getInstance(): IBaseViewControl;
        }
        /**
         * Describes a control used in a IBaseport for simulated page navigation. The
         * control has navigation events that are called when navigating to and from the control.
         */
        interface IBaseViewControl extends ITemplateControl {
            /**
             * Specifies that this control will have its own context, and it should not inherit a context.
             */
            hasOwnContext?: boolean;
            /**
             * Specifies the navigator for this control. Used for navigating to other IBaseViewControls
             * in a {plat.ui.controls.IBaseport|IBaseport}.
             */
            navigator?: navigation.IBaseNavigator;
            /**
             * This event is fired when this control has been navigated to.
             * @param {any} parameter? A navigation parameter sent from the previous
             * IBaseViewControl.
             */
            navigatedTo? (parameter?: any): void;
            /**
             * This event is fired when this control is being navigated away from.
             */
            navigatingFrom? (): void;
        }
        /**
         * A control used in a Viewport for simulated page navigation. The
         * control has navigation events that are called when navigating to and from the control.
         */
        class ViewControl extends BaseViewControl implements IViewControl {
            /**
             * Specifies the navigator for this control. Used for navigating to other IViewControls
             * in a Viewport.
             */
            public navigator: navigation.INavigatorInstance;
            /**
             * Initializes any events that you might use in the ViewControl. Automatically subscribes to 'backButtonPressed' when
             * you implement a backButtonPressed function.
             */
            constructor();
        }
        /**
         * Describes a control used in a Viewport for simulated page navigation. The
         * control has navigation events that are called when navigating to and from the control.
         */
        interface IViewControl extends IBaseViewControl {
            /**
             * Specifies the navigator for this control. Used for navigating to other IViewControls
             * in a Viewport.
             */
            navigator?: navigation.INavigatorInstance;
            /**
             * Called when the hard-back button is pressed on a device. Allows you to
             * consume the event and prevent the navigator from navigating back if
             * necessary.
             * If you want to prevent the navigator from navigating back during this event,
             * you can use ev.stopPropagation().
             */
            backButtonPressed? (ev: events.IDispatchEventInstance): void;
        }
        /**
         * A control used in a Routeport for simulated page navigation. The
         * control has navigation events that are called when navigating to and from the control.
         * It also provides functionality for setting the title of a page.
         */
        class WebViewControl extends BaseViewControl implements IWebViewControl {
            /**
             * The title of the HTML web page.
             */
            static titleElement: HTMLTitleElement;
            /**
             * The description meta tag.
             */
            static descriptionElement: HTMLMetaElement;
            /**
             * Sets the title programmatically and has it reflect in the browser title.
             * @param {string} title The title to set.
             */
            static setTitle(title: string): void;
            /**
             * Sets the meta description programmatically.
             * @param {string} description The description to set.
             */
            static setDescription(description: string): void;
            /**
             * The title of the page, corresponds to the textContent of the title element in the HTML head.
             */
            public title: string;
            /**
             * The title of the page, corresponds to the content of the description meta element in the HTML head.
             */
            public description: string;
            /**
             * Specifies the navigator for this control. Used for navigating to other IWebViewControls
             * in a Routeport.
             */
            public navigator: navigation.IRoutingNavigator;
            /**
             * The constructor for a WebViewControl. Sets the page title and description
             * upon the navigation event occurring.
             */
            constructor();
            /**
             * Allows the WebViewControl set its title programmatically and
             * have it reflect in the browser title.
             * @param {string} title The title to set.
             */
            public setTitle(title: string): void;
            /**
             * Allows the WebViewControl set its description programmatically and
             * have it reflect in the browser meta description tag.
             * @param {string} description The description to set.
             */
            public setDescription(description: string): void;
        }
        /**
         * Defines an object intended to be used inside of a Routeport
         * to simulate page navigation.
         */
        interface IWebViewControl extends IBaseViewControl {
            /**
             * The title of the page, corresponds to the textContent of the title element in the HTML head.
             */
            title?: string;
            /**
             * The title of the page, corresponds to the content of the description meta element in the HTML head.
             */
            description?: string;
            /**
             * Specifies the navigator for this control. Used for navigating to other IWebViewControls
             * in a Routeport.
             */
            navigator?: navigation.IRoutingNavigator;
            /**
             * Allows the WebViewControl set its title programmatically and
             * have it reflect in the browser title.
             * @param {string} title The title to set.
             */
            setTitle? (title: string): void;
            /**
             * Allows the WebViewControl set its description programmatically and
             * have it reflect in the browser meta description tag.
             * @param {string} description The description to set.
             */
            setDescription(description: string): void;
        }
        /**
         * An extensible class dealing with the creation, deletion, and modification
         * of DOM.
         */
        class Dom implements IDom {
            /**
             * Reference to the IDomEvents injectable.
             */
            public $DomEvents: IDomEvents;
            /**
             * Adds an event listener of the specified type to the specified element.
             * @param {Node} element The element to add the event listener to.
             * @param {string} type The type of event to listen to.
             * @param {plat.ui.IGestureListener} listener The listener to fire when the event occurs.
             * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
             * of event propagation.
             */
            public addEventListener(element: Node, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
            /**
             * Adds an event listener of the specified type to the specified element.
             * @param {Window} element The window object.
             * @param {string} type The type of event to listen to.
             * @param {plat.ui.IGestureListener} listener The listener to fire when the event occurs.
             * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
             * of event propagation.
             */
            public addEventListener(element: Window, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
            /**
             * Adds an event listener of the specified type to the specified element.
             * @param {Node} element The element to add the event listener to.
             * @param {string} type The type of event to listen to.
             * @param {EventListener} listener The listener to fire when the event occurs.
             * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
             * of event propagation.
             */
            public addEventListener(element: Node, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
            /**
             * Adds an event listener of the specified type to the specified element.
             * @param {Window} element The window object.
             * @param {string} type The type of event to listen to.
             * @param {EventListener} listener The listener to fire when the event occurs.
             * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
             * of event propagation.
             */
            public addEventListener(element: Window, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
            /**
             * Takes a Node Array and creates a DocumentFragment and adds the nodes to the Fragment.
             * @param {Array<Node>} nodeList A Node Array to be appended to the DocumentFragment
             */
            public appendChildren(nodeList: Node[]): DocumentFragment;
            /**
             * Takes a NodeList and creates a DocumentFragment and adds the NodeList to the Fragment.
             * @param {NodeList} nodeList A NodeList to be appended to the DocumentFragment
             */
            public appendChildren(nodeList: NodeList): DocumentFragment;
            /**
             * Takes a Node Array and either adds it to the passed in Node,
             * or creates a DocumentFragment and adds the nodes to the
             * Fragment.
             * @param {NodeList} nodeList A NodeList to be appended to the root/DocumentFragment.
             * @param {Node} root? An optional Node to append the nodeList.
             */
            public appendChildren(nodeList: Node[], root?: Node): Node;
            /**
             * Takes a NodeList and either adds it to the passed in Node,
             * or creates a DocumentFragment and adds the NodeList to the
             * Fragment.
             * @param {NodeList} nodeList A NodeList to be appended to the root/DocumentFragment.
             * @param {Node} root? An optional Node to append the nodeList.
             */
            public appendChildren(nodeList: NodeList, root?: Node): Node;
            /**
             * Clears a DOM Node by removing all of its childNodes.
             * @param {Node} node The DOM Node to clear.
             */
            public clearNode(node: Node): void;
            /**
             * Removes all the Nodes in the Array from the parent Node.
             * @param {Array<Node>} nodeList The Node Array to remove from the parent Node.
             * @param {Node} parent? The parent Node used to remove the nodeList.
             */
            public clearNodeBlock(nodeList: Node[], parent?: Node): void;
            /**
             * Removes all the Nodes in the NodeList from the parent Node.
             * @param {NodeList} nodeList The NodeList to remove from the parent Node.
             * @param {Node} parent? The parent Node used to remove the nodeList.
             */
            public clearNodeBlock(nodeList: NodeList, parent?: Node): void;
            /**
             * Sets the innerHTML of a Node. Can take in a Node rather than an Element
             * because it does not use innerHTML on the passed-in Node (it appends its
             * childNodes).
             * @param {Node} node The Node to set innerHTML.
             * @param {string} html HTML string to be put inside the node.
             */
            public setInnerHtml(node: Node, html: string): Node;
            /**
             * Inserts a list of Nodes before the designated end Node.
             * @param {Node} parent The parent node into which to insert nodes.
             * @param {Array<Node>} nodes The Node Array to insert into the parent.
             * @param {Node} endNode? An optional endNode to use to insert nodes.
             */
            public insertBefore(parent: Node, nodes: Node[], endNode?: Node): Node[];
            /**
             * Inserts a list of Nodes before the designated end Node.
             * @param {Node} parent The parent node into which to insert nodes.
             * @param {NodeList} nodes The NodeList to insert into the parent.
             * @param {Node} endNode? An optional endNode to use to insert nodes.
             */
            public insertBefore(parent: Node, nodes: NodeList, endNode?: Node): Node[];
            /**
             * Inserts a DocumentFragment before the designated end Node.
             * @param {Node} parent The parent node into which to insert nodes.
             * @param {DocumentFragment} fragment The DocumentFragment to insert into the parent.
             * @param {Node} endNode? An optional endNode to use to insert nodes.
             */
            public insertBefore(parent: Node, fragment: DocumentFragment, endNode?: Node): Node[];
            /**
             * Inserts a Node before the designated end Node.
             * @param {Node} parent The parent node into which to insert nodes.
             * @param {Node} node The Node to insert into the parent.
             * @param {Node} endNode? An optional endNode to use to insert nodes.
             */
            public insertBefore(parent: Node, node: Node, endNode?: Node): Node[];
            /**
             * Takes the child nodes of the given node and places them above the node
             * in the DOM. Then removes the given node.
             * @param {Node} node The Node to replace.
             * given node.
             */
            public replace(node: Node): Node[];
            /**
             * Takes the childNodes of the given element and appends them to the newElement.
             * Then replaces the element in its parent's tree with the newElement.
             * @param {Node} node The Node to remove from its parent.
             * @param {HTMLElement} newElement The HTMLElement to populate with childNodes and add to the
             * element's parent.
             */
            public replaceWith(node: Node, newElement: HTMLElement): HTMLElement;
            /**
             * Takes the childNodes of the given element and appends them to the newElement.
             * Then replaces the element in its parent's tree with the newElement.
             * @param {Node} node The Node to remove from its parent.
             * @param {Element} newElement The Element to populate with childNodes and add to the
             * element's parent.
             */
            public replaceWith(node: Node, newElement: Element): Element;
            /**
             * Takes the childNodes of the given element and appends them to the newElement.
             * Then replaces the element in its parent's tree with the newElement.
             * @param {Node} node The Node to remove from its parent.
             * @param {Node} newElement The Node to populate with childNodes and add to the
             * element's parent.
             */
            public replaceWith(node: Node, newNode: Node): Node;
            /**
             * Takes in a string representing innerHTML and returns a DocumentFragment
             * containing the serialized DOM.
             * @param {string} html The DOM string.
             */
            public serializeHtml(html: string): DocumentFragment;
            /**
             * Takes in a startNode and endNode, each having the same parentNode.
             * Removes every node in between the startNode.  If endNode is not specified,
             * DOM will be removed until the end of the parentNode's children.
             * @param {Node} startNode The starting node, which will not be removed.
             * @param {Node} endNode The ending node, which will not be removed.
             */
            public removeBetween(startNode: Node, endNode?: Node): void;
            /**
             * Takes in a startNode and endNode, each having the same parentNode.
             * Removes every node in between the startNode and endNode as well as
             * the startNode and the endNode.  If endNode is not specified, DOM
             * will be removed until the end of the parentNode's children.
             * @param {Node} startNode The first node to remove.
             * @param {Node} endNode The last node to remove.
             */
            public removeAll(startNode: Node, endNode?: Node): void;
            /**
             * Adds a class or multiple classes to the specified element.
             * @param {Element} element The element to which the class name is being added.
             * @param {string} className The class name or space delimited class names to add to the element.
             */
            public addClass(element: Element, className: string): void;
            /**
             * Removes a class or multiple classes from the specified element.
             * @param {Element} element The element from which the class name is being removed.
             * @param {string} className The class name or space delimited class names to remove from the element.
             */
            public removeClass(element: Element, className: string): void;
            /**
             * Toggles a class or multiple classes from the specified element.
             * @param {Element} element The element on which the class name is being toggled.
             * @param {string} className The class name or space delimited class names to toggle on the element.
             */
            public toggleClass(element: Element, className: string): void;
            /**
             * Returns whether or not an element has a particular class or classes assigned to it.
             * @param {Element} element The element on which the class name is being checked.
             * @param {string} className The class name or space delimited class names to check on the element.
             * specified in the className argument.
             */
            public hasClass(element: Element, className: string): boolean;
        }
        /**
         * The Type for referencing the '$Dom' injectable as a dependency.
         */
        function IDom(): IDom;
        /**
         * An object that deals with the creation, deletion, and modification
         * of DOM.
         */
        interface IDom {
            /**
             * Adds an event listener of the specified type to the specified element.
             * @param {Node} element The element to add the event listener to.
             * @param {string} type The type of event to listen to.
             * @param {plat.ui.IGestureListener} listener The listener to fire when the event occurs.
             * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
             * of event propagation.
             */
            addEventListener(element: Node, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
            /**
             * Adds an event listener of the specified type to the specified element.
             * @param {Window} element The window object.
             * @param {string} type The type of event to listen to.
             * @param {plat.ui.IGestureListener} listener The listener to fire when the event occurs.
             * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
             * of event propagation.
             */
            addEventListener(element: Window, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
            /**
             * Adds an event listener of the specified type to the specified element.
             * @param {Node} element The element to add the event listener to.
             * @param {string} type The type of event to listen to.
             * @param {EventListener} listener The listener to fire when the event occurs.
             * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
             * of event propagation.
             */
            addEventListener(element: Node, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
            /**
             * Adds an event listener of the specified type to the specified element.
             * @param {Window} element The window object.
             * @param {string} type The type of event to listen to.
             * @param {EventListener} listener The listener to fire when the event occurs.
             * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
             * of event propagation.
             */
            addEventListener(element: Window, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
            /**
             * Takes a Node Array and creates a DocumentFragment and adds the nodes to the Fragment.
             * @param {Array<Node>} nodeList A Node Array to be appended to the DocumentFragment
             */
            appendChildren(nodeList: Node[]): DocumentFragment;
            /**
             * Takes a NodeList and creates a DocumentFragment and adds the NodeList to the Fragment.
             * @param {NodeList} nodeList A NodeList to be appended to the DocumentFragment
             */
            appendChildren(nodeList: NodeList): DocumentFragment;
            /**
             * Takes a Node Array and either adds it to the passed in Node,
             * or creates a DocumentFragment and adds the nodes to the
             * Fragment.
             * @param {NodeList} nodeList A NodeList to be appended to the root/DocumentFragment.
             * @param {Node} root? An optional Node to append the nodeList.
             */
            appendChildren(nodeList: Node[], root?: Node): Node;
            /**
             * Takes a NodeList and either adds it to the passed in Node,
             * or creates a DocumentFragment and adds the NodeList to the
             * Fragment.
             * @param {NodeList} nodeList A NodeList to be appended to the root/DocumentFragment.
             * @param {Node} root? An optional Node to append the nodeList.
             */
            appendChildren(nodeList: NodeList, root?: Node): Node;
            /**
             * Clears a DOM Node by removing all of its childNodes.
             * @param {Node} node The DOM Node to clear.
             */
            clearNode(node: Node): void;
            /**
             * Removes all the Nodes in the Array from the parent Node.
             * @param {Array<Node>} nodeList The Node Array to remove from the parent Node.
             * @param {Node} parent? The parent Node used to remove the nodeList.
             */
            clearNodeBlock(nodeList: Node[], parent?: Node): void;
            /**
             * Removes all the Nodes in the NodeList from the parent Node.
             * @param {NodeList} nodeList The NodeList to remove from the parent Node.
             * @param {Node} parent? The parent Node used to remove the nodeList.
             */
            clearNodeBlock(nodeList: NodeList, parent?: Node): void;
            /**
             * Sets the innerHTML of a Node. Can take in a Node rather than an Element
             * because it does not use innerHTML on the passed-in Node (it appends its
             * childNodes).
             * @param {Node} node The Node to set innerHTML.
             * @param {string} html HTML string to be put inside the node.
             */
            setInnerHtml(node: Node, html: string): Node;
            /**
             * Inserts a list of Nodes before the designated end Node.
             * @param {Node} parent The parent node into which to insert nodes.
             * @param {Array<Node>} nodes The Node Array to insert into the parent.
             * @param {Node} endNode? An optional endNode to use to insert nodes.
             */
            insertBefore(parent: Node, nodes: Node[], endNode?: Node): Node[];
            /**
             * Inserts a list of Nodes before the designated end Node.
             * @param {Node} parent The parent node into which to insert nodes.
             * @param {NodeList} nodes The NodeList to insert into the parent.
             * @param {Node} endNode? An optional endNode to use to insert nodes.
             */
            insertBefore(parent: Node, nodes: NodeList, endNode?: Node): Node[];
            /**
             * Inserts a DocumentFragment before the designated end Node.
             * @param {Node} parent The parent node into which to insert nodes.
             * @param {DocumentFragment} fragment The DocumentFragment to insert into the parent.
             * @param {Node} endNode? An optional endNode to use to insert nodes.
             */
            insertBefore(parent: Node, fragment: DocumentFragment, endNode?: Node): Node[];
            /**
             * Inserts a Node before the designated end Node.
             * @param {Node} parent The parent node into which to insert nodes.
             * @param {Node} node The Node to insert into the parent.
             * @param {Node} endNode? An optional endNode to use to insert nodes.
             */
            insertBefore(parent: Node, node: Node, endNode?: Node): Node[];
            /**
             * Takes the child nodes of the given node and places them above the node
             * in the DOM. Then removes the given node.
             * @param {Node} node The Node to replace.
             * given node.
             */
            replace(node: Node): Node[];
            /**
             * Takes the childNodes of the given element and appends them to the newElement.
             * Then replaces the element in its parent's tree with the newElement.
             * @param {Node} node The Node to remove from its parent.
             * @param {HTMLElement} newElement The HTMLElement to populate with childNodes and add to the
             * element's parent.
             */
            replaceWith(node: Node, newElement: HTMLElement): HTMLElement;
            /**
             * Takes the childNodes of the given element and appends them to the newElement.
             * Then replaces the element in its parent's tree with the newElement.
             * @param {Node} node The Node to remove from its parent.
             * @param {Element} newElement The Element to populate with childNodes and add to the
             * element's parent.
             */
            replaceWith(node: Node, newElement: Element): Element;
            /**
             * Takes the childNodes of the given element and appends them to the newElement.
             * Then replaces the element in its parent's tree with the newElement.
             * @param {Node} node The Node to remove from its parent.
             * @param {Node} newElement The Node to populate with childNodes and add to the
             * element's parent.
             */
            replaceWith(node: Node, newNode: Node): Node;
            /**
             * Takes in a string representing innerHTML and returns a DocumentFragment
             * containing the serialized DOM.
             * @param {string} html The DOM string.
             */
            serializeHtml(html?: string): DocumentFragment;
            /**
             * Takes in a startNode and endNode, each having the same parentNode.
             * Removes every node in between the startNode.  If endNode is not specified,
             * DOM will be removed until the end of the parentNode's children.
             * @param {Node} startNode The starting node, which will not be removed.
             * @param {Node} endNode The ending node, which will not be removed.
             */
            removeBetween(startNode: Node, endNode?: Node): void;
            /**
             * Takes in a startNode and endNode, each having the same parentNode.
             * Removes every node in between the startNode and endNode as well as
             * the startNode and the endNode.  If endNode is not specified, DOM
             * will be removed until the end of the parentNode's children.
             * @param {Node} startNode The first node to remove.
             * @param {Node} endNode The last node to remove.
             */
            removeAll(startNode: Node, endNode?: Node): void;
            /**
             * Adds a class or multiple classes to the specified element.
             * @param {Element} element The element to which the class name is being added.
             * @param {string} className The class name or space delimited class names to add to the element.
             */
            addClass(element: Element, className: string): void;
            /**
             * Removes a class or multiple classes from the specified element.
             * @param {Element} element The element from which the class name is being removed.
             * @param {string} className The class name or space delimited class names to remove from the element.
             */
            removeClass(element: Element, className: string): void;
            /**
             * Toggles a class or multiple classes from the specified element.
             * @param {Element} element The element on which the class name is being toggled.
             * @param {string} className The class name or space delimited class names to toggle on the element.
             */
            toggleClass(element: Element, className: string): void;
            /**
             * Returns whether or not an element has a particular class or classes assigned to it.
             * @param {Element} element The element on which the class name is being checked.
             * @param {string} className The class name or space delimited class names to check on the element.
             * specified in the className argument.
             */
            hasClass(element: Element, className: string): boolean;
        }
        /**
         * An object describing custom element properties added to elements for hashing purposes.
         */
        interface ICustomElementProperty extends IObject<string> {
            /**
             * A unique id given to the element if it's registered for a custom DOM event.
             */
            domEvent?: string;
            /**
             * A unique id given to the element if it's registered for an animation.
             */
            animation?: string;
        }
        /**
         * An interface for describing an Element with an ICustomElementProperty attached. Primarily
         * used for element interaction with DomEvents and the
         * Animator.
         */
        interface ICustomElement extends HTMLElement {
            /**
             * The PlatypusTS custom element property.
             */
            __plat: ICustomElementProperty;
        }
        /**
         * The class which provides a way for ITemplateControls to bind a template
         * to a context. Useful for narrowing context without needing another
         * ITemplateControl. In addition, this object provides a performance increase because
         * it will only compile the template once. This object is also useful when a
         * ITemplateControls expects multiple configuration templates in its innerHTML. It can
         * separate those templates and reuse them accordingly.
         */
        class BindableTemplates implements IBindableTemplates {
            /**
             * Creates a new instance of BindableTemplates and returns it. If a BindableTemplates is
             * passed in, it will use the properties on the original BindableTemplates.
             * @param {plat.ui.ITemplateControl} control The ITemplateControl
             * containing the new BindableTemplates object, used for data
             * context inheritance for templates.
             * @param {plat.ui.IBindableTemplates} original? An optional IBindableTemplates
             * object to copy.
             */
            static create(control: ITemplateControl, original?: IBindableTemplates): IBindableTemplates;
            /**
             * Clears the memory being held by control's bindableTemplates.
             * @param {plat.ui.ITemplateControl} control The control whose bindableTemplates will be disposed.
             */
            static dispose(control: ITemplateControl): void;
            /**
             * Reference to the IResourcesFactory injectable.
             */
            public $ResourcesFactory: IResourcesFactory;
            /**
             * Reference to the ITemplateControlFactory injectable.
             */
            public $TemplateControlFactory: ITemplateControlFactory;
            /**
             * Reference to the IPromise injectable.
             */
            public $Promise: async.IPromise;
            /**
             * Reference to a cache injectable that stores IElementManagers.
             */
            public $ManagerCache: storage.ICache<processing.IElementManager>;
            /**
             * Reference to the Document injectable.
             */
            public $Document: Document;
            /**
             * Reference to the IElementManagerFactory injectable.
             */
            public $ElementManagerFactory: processing.IElementManagerFactory;
            /**
             * The control containing this BindableTemplates object.
             */
            public control: ITemplateControl;
            /**
             * Stores promises that resolve to all the compiled templates for this object, ready to be bound to a data context.
             * All created templates are DocumentFragments, allowing an ITemplateControl to
             * easily insert the template into the DOM (without iterating over childNodes).
             */
            public templates: IObject<async.IThenable<DocumentFragment>>;
            /**
             * A keyed cache of IElementManagers that represent the roots of compiled templates
             * created by this instance.
             */
            public _cache: IObject<processing.IElementManager>;
            /**
             * A collection of all the controls created while compiling an added template. Useful during disposal.
             */
            private __compiledControls;
            /**
             * Method for linking a new template to a data context and returning a clone of the template,
             * with all new IControls created if the template contains controls. It is not necessary
             * to specify a data context.
             * @param {string} key The key used to retrieve the template.
             * @param {string} relativeIdentifier? The identifier string relative to this control's context
             * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the
             * most efficient way of specifying context, else the framework has to search for the
             * object.
             * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
             * controls created in the template.
             * ready to return.
             */
            public bind(key: string, relativeIdentifier?: string, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
            /**
             * Method for linking a new template to a data context and returning a clone of the template,
             * with all new IControls created if the template contains controls. It is not necessary
             * to specify a data context.
             * @param {string} key The key used to retrieve the template.
             * @param {number} relativeIdentifier? The identifier number relative to this control's context
             * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
             * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
             * controls created in the template.
             * ready to return.
             */
            public bind(key: string, relativeIdentifier?: number, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
            /**
             * Adds a template to this object. The template will be stored with the key,
             * and it will be transformed into a DocumentFragment.
             * @param {string} key The key used to store the template.
             * @param {Element} template An Element representing the DOM template.
             */
            public add(key: string, template: Element): void;
            /**
             * Adds a template to this object. The template will be stored with the key,
             * and it will be transformed into a DocumentFragment.
             * @param {string} key The key used to store the template.
             * @param {Array<Node>} template A node Array representing the DOM template.
             */
            public add(key: string, template: Node[]): void;
            /**
             * Adds a template to this object. The template will be stored with the key,
             * and it will be transformed into a DocumentFragment.
             * @param {string} key The key used to store the template.
             * @param {NodeList} template A NodeList representing the DOM template.
             */
            public add(key: string, template: NodeList): void;
            /**
             * Adds a template to this object. The template will be stored with the key,
             * and it will be transformed into a DocumentFragment.
             * @param {string} key The key used to store the template.
             * @param {DocumentFragment} template A DocumentFragment representing the DOM template.
             */
            public add(key: string, template: DocumentFragment): void;
            /**
             * Adds a template to this object. The template will be stored with the key,
             * and it will be transformed into a DocumentFragment.
             * @param {string} key The key used to store the template.
             * @param {Node} template A Node representing the DOM template.
             */
            public add(key: string, template: Node): void;
            /**
             * Clears the memory being held by this instance.
             */
            public dispose(): void;
            /**
             * Creates the template's bound control and INodeMap and initiates
             * the binding of the INodeMap for a cloned template.
             * @param {string} key The template key.
             * @param {DocumentFragment} template The cached HTML template.
             * @param {string} contextId The relative path from the context used to bind this template.
             * @param {plat.IObject<plat.ui.IResource>} A set of resources to add to the control used to bind this
             * template.
             */
            public _bindTemplate(key: string, template: DocumentFragment, contextId: string, resources: IObject<IResource>): async.IThenable<DocumentFragment>;
            /**
             * Clones the compiled IElementManager using the newly created
             * INodeMap and binds and loads this control's
             * IElementManager.
             * @param {plat.processing.INodeMap} nodeMap The node map to bind.
             * @param {string} key The template key used to grab the IElementManager.
             * IElementManager is bound and loaded.
             */
            public _bindNodeMap(nodeMap: processing.INodeMap, key: string): async.IThenable<void>;
            /**
             * Creates the template's compiled, bound control and INodeMap and initiates
             * the compilation of the template.
             * @param {string} key The template key.
             * @param {DocumentFragment} template The HTML template being bound.
             */
            public _compile(key: string, template: DocumentFragment): void;
            /**
             * Instantiates a new IElementManager for the root of this
             * template and resolves any asynchronous url templates within the template being compiled.
             * @param {plat.ui.ITemplateControl} control The newly created control used to bind the template.
             * @param {plat.processing.INodeMap} nodeMap The newly created node map to bind.
             * @param {string} key The template key.
             */
            public _compileNodeMap(control: ITemplateControl, nodeMap: processing.INodeMap, key: string): void;
            /**
             * Creates an INodeMap for either a template being compiled or a
             * template being bound.
             * @param {plat.ui.ITemplateControl} uiControl The newly created control used to bind the template.
             * @param {Node} template The template being compiled.
             * @param {string} childContext? A potential child context string identifier.
             */
            public _createNodeMap(uiControl: ITemplateControl, template: Node, childContext?: string): processing.INodeMap;
            /**
             * Creates a ITemplateControl used for binding either a template being compiled
             * or a template being bound.
             * @param {string} key The template key.
             * @param {DocumentFragment} template The template being compiled or being bound.
             * @param {string} relativeIdentifier? A potential context string identifier identifying the
             * object's position off the context.
             * @param {plat.IObject<plat.ui.IResource>} resources? A set of resources to add to the control used to
             * compile/bind this template.
             */
            public _createBoundControl(key: string, template: DocumentFragment, relativeIdentifier?: string, resources?: IObject<IResource>): ITemplateControl;
        }
        /**
         * The Type for referencing the '$BindableTemplatesFactory' injectable as a dependency.
         */
        function IBindableTemplatesFactory(): IBindableTemplatesFactory;
        /**
         * Creates and manages IBindableTemplates.
         */
        interface IBindableTemplatesFactory {
            /**
             * Creates a new instance of BindableTemplates and returns it. If a BindableTemplates is
             * passed in, it will use the properties on the original BindableTemplates.
             * @param {plat.ui.ITemplateControl} control The ITemplateControl
             * containing the new BindableTemplates object, used for data
             * context inheritance for templates.
             * @param {plat.ui.IBindableTemplates} original? An optional IBindableTemplates
             * object to copy.
             */
            create(control: ITemplateControl, original?: IBindableTemplates): IBindableTemplates;
            /**
             * Creates a new instance of BindableTemplates and returns it. If a BindableTemplates is
             * passed in, it will use the properties on the original BindableTemplates.
             * @param {plat.ui.ITemplateControl} control The ITemplateControl
             * containing the new BindableTemplates object, used for data
             * context inheritance for templates.
             * @param {plat.ui.BindableTemplates} original? An optional BindableTemplates
             * object to copy.
             */
            create(control: ITemplateControl, original?: BindableTemplates): IBindableTemplates;
            /**
             * Clears the memory being held by control's bindableTemplates.
             * @param {plat.ui.ITemplateControl} control The control whose bindableTemplates will be disposed.
             */
            dispose(control: ITemplateControl): void;
        }
        /**
         * An object that provides a way for ITemplateControls to bind a template
         * to a context. Useful for narrowing context without needing another
         * ITemplateControl. In addition, this object provides a performance increase because
         * it will only compile the template once. This object is also useful when a
         * ITemplateControls expects multiple configuration templates in its innerHTML. It can
         * separate those templates and reuse them accordingly.
         */
        interface IBindableTemplates {
            /**
             * The control containing this BindableTemplates object.
             */
            control: ITemplateControl;
            /**
             * Stores promises that resolve to all the compiled templates for this object, ready to be bound to a data context.
             * All created templates are DocumentFragments, allowing an ITemplateControl to
             * easily insert the template into the DOM (without iterating over childNodes).
             */
            templates: IObject<async.IThenable<DocumentFragment>>;
            /**
             * Method for linking a new template to a data context and returning a clone of the template,
             * with all new IControls created if the template contains controls. It is not necessary
             * to specify a data context.
             * @param {string} key The key used to retrieve the template.
             * @param {string} relativeIdentifier? The identifier string relative to this control's context
             * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the
             * most efficient way of specifying context, else the framework has to search for the
             * object.
             * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
             * controls created in the template.
             * ready to return.
             */
            bind(key: string, relativeIdentifier?: string, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
            /**
             * Method for linking a new template to a data context and returning a clone of the template,
             * with all new IControls created if the template contains controls. It is not necessary
             * to specify a data context.
             * @param {string} key The key used to retrieve the template.
             * @param {number} relativeIdentifier? The identifier number relative to this control's context
             * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
             * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
             * controls created in the template.
             * ready to return.
             */
            bind(key: string, relativeIdentifier?: number, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
            /**
             * Adds a template to this object. The template will be stored with the key,
             * and it will be transformed into a DocumentFragment.
             * @param {string} key The key used to store the template.
             * @param {Element} template An Element representing the DOM template.
             */
            add(key: string, template: Element): void;
            /**
             * Adds a template to this object. The template will be stored with the key,
             * and it will be transformed into a DocumentFragment.
             * @param {string} key The key used to store the template.
             * @param {Array<Node>} template A node Array representing the DOM template.
             */
            add(key: string, template: Node[]): void;
            /**
             * Adds a template to this object. The template will be stored with the key,
             * and it will be transformed into a DocumentFragment.
             * @param {string} key The key used to store the template.
             * @param {NodeList} template A NodeList representing the DOM template.
             */
            add(key: string, template: NodeList): void;
            /**
             * Adds a template to this object. The template will be stored with the key,
             * and it will be transformed into a DocumentFragment.
             * @param {string} key The key used to store the template.
             * @param {DocumentFragment} template A DocumentFragment representing the DOM template.
             */
            add(key: string, template: DocumentFragment): void;
            /**
             * Adds a template to this object. The template will be stored with the key,
             * and it will be transformed into a DocumentFragment.
             * @param {string} key The key used to store the template.
             * @param {Node} template A Node representing the DOM template.
             */
            add(key: string, template: Node): void;
            /**
             * Clears the memory being held by this instance.
             */
            dispose(): void;
        }
        /**
         * The class that stores the information about an Element's attributes (NamedNodeMap).
         * Methods are implemented to allow you to observe for changes on an attribute.
         * Attributes for this object are converted from dash-notation to camelCase notation.
         */
        class Attributes implements IAttributesInstance {
            [property: string]: any;
            /**
             * The set of functions added externally that listens
             * for attribute changes.
             */
            private __listeners;
            /**
             * The control tied to this instance.
             */
            private __control;
            /**
             * Initializes this instance with a IControl and the camelCased
             * attribute properties and their values.
             * @param {plat.IControl} control The function that acts as a listener.
             * @param {plat.IObject<string>} attributes The camelCased attribute properties and their values.
             */
            public initialize(control: IControl, attributes: IObject<string>): void;
            /**
             * Provides a way to observe an attribute for changes.
             * @param {string} key The attribute to observe for changes (e.g. 'src').
             * @param {plat.IPropertyChangedListener} listener The listener function to be called when the attribute changes.
             */
            public observe(key: string, listener: (newValue: any, oldValue?: any) => void): IRemoveListener;
            /**
             * Used to show an attribute has been changed and forces listeners to be fired.
             * @param {string} key The attribute being observed for changes (e.g. 'src').
             * @param {any} newValue The new value of the attribute.
             * @param {any} oldValue The previous value of the attribute.
             */
            public _attributeChanged(key: string, newValue: any, oldValue: any): void;
        }
        /**
         * The Type for referencing the '$Attributes' injectable as a dependency.
         */
        function IAttributesInstance(): IAttributesInstance;
        /**
         * Describes an object that stores the information about an Element's attribute NamedNodeMap.
         * Methods are implemented to allow you to observe for changes on an attribute.
         */
        interface IAttributesInstance {
            [property: string]: any;
            /**
             * Initializes this instance with a IControl and the camelCased
             * attribute properties and their values.
             * @param {plat.IControl} control The function that acts as a listener.
             * @param {plat.IObject<string>} attributes The camelCased attribute properties and their values.
             */
            initialize(control: IControl, attributes: IObject<string>): void;
            /**
             * Provides a way to observe an attribute for changes.
             * @param {string} key The attribute to observe for changes (e.g. 'src').
             * @param {plat.IPropertyChangedListener} listener The listener function to be called when the attribute changes.
             */
            observe(key: string, listener: (newValue: any, oldValue: any) => void): IRemoveListener;
        }
        /**
         * Resources are used for providing aliases to use in markup expressions. They
         * are particularly useful when trying to access properties outside of the
         * current context, as well as reassigning context at any point in an app.
         * By default, every control has a resource for '@control' and '@context'.
         * IViewControl objects also have a resource for '@root' and '@rootContext',
         * which is a reference to the control and its context.
         * Resources can be created in HTML, or through the exposed control.resources
         * object. If specified in HTML, they must be the first element child of the
         * control upon which the resources will be placed. IViewControls that use a
         * templateUrl can have resources as their first element in the templateUrl.
         * In the provided example, the resources can be accessed by using '@Cache' and '@testObj'.
         * The type of resource is denoted by the element name.
         * Only resources of type 'observable' will have data binding. The types of resources are:
         * function, injectable, observable, and object. Resources of type 'function' will have their
         * associated function context bound to the control that contains the resource.
         * When an alias is found in a markup expression, the framework will search up the control chain
         * to find the alias on a control's resources. This first matching alias will be used.
         * <custom-control>
         *     <plat-resources>
         *         <injectable alias="Cache">$CacheFactory</injectable>
         *         <observable alias="testObj">
         *              {
         *                  foo: 'foo',
         *                  bar: 'bar',
         *                  baz: 2
         *              }
         *         </observable>
         *     </plat-resources>
         * </custom-control>
         */
        class Resources implements IResources {
            /**
             * Reference to the IContextManagerStatic injectable.
             */
            static $ContextManagerStatic: observable.IContextManagerStatic;
            /**
             * Reference to the IRegex injectable.
             */
            static $Regex: expressions.IRegex;
            /**
             * Populates an IResource value if necessary, and adds it to the given
             * control's resources.
             * @param {plat.ui.ITemplateControl} control The control for which to create a resource.
             * @param {plat.ui.IResource} resource The object used to set the resource values.
             */
            static create(control: ITemplateControl, resource: IResource): IResource;
            /**
             * Adds resource aliases for '@control' and '@context'. The resources are
             * aliases for the control instance and the control.context.
             * @param {plat.ui.ITemplateControl} control The control on which to add the resources.
             */
            static addControlResources(control: ITemplateControl): void;
            /**
             * Binds the resources in a resource instance. This involves injecting
             * the injectable resources, creating object/observable resources, and
             * binding functions to the associated control's instance.
             * @param {plat.ui.IResources} resourcesInstance The instance of the
             * IResources object to bind.
             */
            static bindResources(resourcesInstance: IResources): void;
            /**
             * Disposes a resource instance, removing its reference
             * from a control and breaking references to all resource
             * objects.
             * @param {plat.ui.ITemplateControl} control The control whose resources will be disposed.
             * @param {boolean} persist? Whether or not to persist a resource object post
             * disposal or set it to null.
             */
            static dispose(control: ITemplateControl, persist?: boolean): void;
            /**
             * Parses a resources Element (<plat-resources>) and creates
             * an IObject<IResource> with its element children.
             * @param {Element} element The resources element to parse.
             */
            static parseElement(element: Element): IObject<IResource>;
            /**
             * Returns a new instance with type IResources.
             */
            static getInstance(): IResources;
            /**
             * Observes the resource if the type is 'observable'.
             * @param {plat.ui.ITemplateControl} control The control in charge of the observable resource.
             * @param {plat.ui.IResource} resource The resource to observe.
             */
            static _observeResource(control: ITemplateControl, resource: IResource): void;
            /**
             * Removes observable resource listeners for a specified control.
             * @param {plat.ui.ITemplateControl} control The control whose listeners are being removed.
             */
            static _removeListeners(control: ITemplateControl): void;
            /**
             * A list of resources to place on a control.
             */
            private static __controlResources;
            /**
             * A list of all resource types.
             */
            private static __resourceTypes;
            /**
             * An object consisting of keyed arrays containing functions for removing observation listeners.
             */
            private static __observableResourceRemoveListeners;
            /**
             * Adds a '@root' alias and '@rootContext' to a control, specifying that it contains the root
             * and root context. Root controls are generally the root IViewControl.
             * @param {plat.ui.ITemplateControl} control The root control.
             */
            private static __addRoot(control);
            /**
             * An object representing all of the currently available resources.
             */
            private __resources;
            /**
             * Whether this Resources instance has been bound yet.
             */
            private __bound;
            /**
             * The control that these resources are for.
             */
            private __controlInstance;
            /**
             * Initializes this Resources instance.
             * @param {plat.ui.ITemplateControl} control The control containing this Resources instance.
             * @param {Element} element? An optional element used to create initial IResource objects.
             */
            public initialize(control: ITemplateControl, element?: Element): void;
            /**
             * Initializes this Resources instance.
             * @param {plat.ui.ITemplateControl} control The control containing this Resources instance.
             * @param {IObject<IResource>} resources? An optional object used to populate initial
             * IResource objects.
             */
            public initialize(control: ITemplateControl, resources?: IObject<IResource>): void;
            /**
             * Initializes this Resources instance.
             * @param {plat.ui.ITemplateControl} control The control containing this Resources instance.
             * @param {plat.ui.IResources} resources? An optional IResources object used to populate initial
             * IResource objects.
             */
            public initialize(control: ITemplateControl, resources?: IResources): void;
            /**
             * Used for programatically adding IResource objects.
             * @param resources An IObject<IResource> used to add
             * resources, keyed by their alias.
             * control.resources.add({
             *     myAlias: {
             *         type: 'observable',
             *         value: {
             *             hello: 'Hello World!'
             *         }
             *     }
             * });
             */
            public add(resources: IObject<IResource>): void;
            /**
             * Used for programatically adding IResource objects.
             * @param {Element} element An Element containing resource element children.
             * The resource type is specified by the element name.
             *     <plat-resources>
             *         <injectable alias="Cache">$CacheFactory</injectable>
             *         <observable alias="testObj">{ foo: 'foo', bar: 'bar', baz: 2 }</observable>
             *     </plat-resources>
             */
            public add(element: Element): void;
        }
        /**
         * The Type for referencing the '$ResourcesFactory' injectable as a dependency.
         */
        function IResourcesFactory($ContextManagerStatic?: observable.IContextManagerStatic, $Regex?: expressions.IRegex): IResourcesFactory;
        /**
         * Creates and manages IResources for ITemplateControls.
         */
        interface IResourcesFactory {
            /**
             * Populates an IResource value if necessary, and adds it to the given
             * control's resources.
             * @param {plat.ui.ITemplateControl} control The control for which to create a resource.
             * @param {plat.ui.IResource} resource The object used to set the resource values.
             */
            create(control: ITemplateControl, resource: IResource): IResource;
            /**
             * Adds resource aliases for '@control' and '@context'. The resources are
             * aliases for the control instance and the control.context.
             * @param {plat.ui.ITemplateControl} control The control on which to add the resources.
             */
            addControlResources(control: ITemplateControl): void;
            /**
             * Binds the resources in a resource instance. This involves injecting
             * the injectable resources, creating object/observable resources, and
             * binding functions to the associated control's instance.
             * @param {plat.ui.IResources} resourcesInstance The instance of the IResources object.
             */
            bindResources(resourcesInstance: IResources): void;
            /**
             * Disposes a resource instance, removing its reference
             * from a control and breaking references to all resource
             * objects.
             * @param {plat.ui.ITemplateControl} control The control whose resources will be disposed.
             * @param {boolean} persist? Whether or not to persist a resource object post
             * disposal or set it to null.
             */
            dispose(control: ITemplateControl, persist?: boolean): void;
            /**
             * Parses a resources Element (<plat-resources>) and creates
             * an IObject<IResource> with its element children.
             * @param {Element} element The resources element to parse.
             */
            parseElement(element: Element): IObject<IResource>;
            /**
             * Returns a new instance with type IResources.
             */
            getInstance(): IResources;
        }
        /**
         * Resources are used for providing aliases to use in markup expressions. They
         * are particularly useful when trying to access properties outside of the
         * current context, as well as reassigning context at any point in an app.
         * By default, every control has a resource for '@control' and '@context'.
         * IViewControl objects also have a resource for '@root' and '@rootContext',
         * which is a reference to the control and its context.
         * Resources can be created in HTML, or through the exposed control.resources
         * object. If specified in HTML, they must be the first element child of the
         * control upon which the resources will be placed. IViewControls that use a
         * templateUrl can have resources as their first element in the templateUrl.
         * In the provided example, the resources can be accessed by using '@Cache' and '@testObj'.
         * The type of resource is denoted by the element name.
         * Only resources of type 'observable' will have data binding. The types of resources are:
         * function, injectable, observable, and object. Resources of type 'function' will have their
         * associated function context bound to the control that contains the resource.
         * When an alias is found in a markup expression, the framework will search up the control chain
         * to find the alias on a control's resources. This first matching alias will be used.
         * <custom-control>
         *     <plat-resources>
         *         <injectable alias="Cache">$CacheFactory</injectable>
         *         <observable alias="testObj">
         *              {
         *                  foo: 'foo',
         *                  bar: 'bar',
         *                  baz: 2
         *              }
         *         </observable>
         *     </plat-resources>
         * </custom-control>
         */
        interface IResources {
            /**
             * Used for programatically adding IResource objects.
             * @param resources An IObject<IResource> used to add
             * resources, keyed by their alias.
             * control.resources.add({
             *     myAlias: {
             *         type: 'observable',
             *         value: {
             *             hello: 'Hello World!'
             *         }
             *     }
             * });
             */
            add(resources: IObject<IResource>): void;
            /**
             * Used for programatically adding IResource objects.
             * @param {Element} element An Element containing resource element children.
             * The resource type is specified by the element name.
             *     <plat-resources>
             *         <injectable alias="Cache">$CacheFactory</injectable>
             *         <observable alias="testObj">{ foo: 'foo', bar: 'bar', baz: 2 }</observable>
             *     </plat-resources>
             */
            add(element: Element): void;
            /**
             * Initializes this Resources instance.
             * @param {plat.ui.ITemplateControl} control The control containing this Resources instance.
             * @param {Element} element? An optional element used to create initial IResource objects.
             */
            initialize(control: ITemplateControl, element?: Element): void;
            /**
             * Initializes this Resources instance.
             * @param {plat.ui.ITemplateControl} control The control containing this Resources instance.
             * @param {IObject<IResource>} resources? An optional object used to populate initial
             * IResource objects.
             */
            initialize(control: ITemplateControl, resources?: IObject<IResource>): void;
            /**
             * Initializes this Resources instance.
             * @param {plat.ui.ITemplateControl} control The control containing this Resources instance.
             * @param {plat.ui.IResources} resources? An optional IResources object used to populate initial
             * IResource objects.
             */
            initialize(control: ITemplateControl, resources?: IResources): void;
        }
        /**
         * Defines a single resource on the IResources object.
         */
        interface IResource {
            /**
             * The type of resource.
             * - injectable
             * - observable
             * - object
             * - function
             */
            type: string;
            /**
             * The alias used to reference the resource.
             */
            alias?: string;
            /**
             * The value of the resource.
             */
            value?: any;
            /**
             * The initial value of the resource prior to it being observed.
             */
            initialValue?: any;
        }
        /**
         * A class for managing DOM event registration and handling.
         */
        class DomEvents implements IDomEvents {
            /**
             * A configuration object for all DOM events.
             */
            static config: IDomEventsConfig;
            /**
             * Reference to the Document injectable.
             */
            public $Document: Document;
            /**
             * Reference to the ICompat injectable.
             */
            public $Compat: ICompat;
            /**
             * Whether or not the DomEvents are currently active.
             * They become active at least one element on the current
             * page is listening for a custom event.
             */
            public _isActive: boolean;
            /**
             * Whether or not the user is currently touching the screen.
             */
            public _inTouch: boolean;
            /**
             * An object with keyed subscribers that keep track of all of the
             * events registered on a particular element.
             */
            public _subscribers: IObject<IEventSubscriber>;
            /**
             * The touch start events defined by this browser.
             */
            public _startEvents: string[];
            /**
             * The touch move events defined by this browser.
             */
            public _moveEvents: string[];
            /**
             * The touch end events defined by this browser.
             */
            public _endEvents: string[];
            /**
             * An object containing the event types for all of the
             * supported gestures.
             */
            public _gestures: IGestures<string>;
            /**
             * An object containing the number of currently active
             * events of each type.
             */
            public _gestureCount: IGestures<number>;
            /**
             * A constant for specifying the start condition.
             */
            private __START;
            /**
             * A constant for specifying the move condition.
             */
            private __MOVE;
            /**
             * A constant for specifying the end condition.
             */
            private __END;
            /**
             * Whether or not the user moved while in touch.
             */
            private __hasMoved;
            /**
             * Whether or not the user swiped while in touch.
             */
            private __hasSwiped;
            /**
             * Whether or not their is a registered "release" event.
             */
            private __hasRelease;
            /**
             * Whether or not we should be detecting move events.
             */
            private __detectingMove;
            /**
             * The current tap count to help distinguish single from double taps.
             */
            private __tapCount;
            /**
             * The total number of touches on the screen.
             */
            private __touchCount;
            /**
             * A timeout ID given in the case that a tap delay was needed for
             * something such as a double tap to zoom feature.
             */
            private __tapTimeout;
            /**
             * A timeout ID for removing a registered hold event.
             */
            private __holdTimeout;
            /**
             * A regular expressino for determining a "cancel" event.
             */
            private __cancelRegex;
            /**
             * A regular expressino for determining a pointer end event.
             */
            private __pointerEndRegex;
            /**
             * The user's last touch down.
             */
            private __lastTouchDown;
            /**
             * The user's last touch up.
             */
            private __lastTouchUp;
            /**
             * The starting place of an initiated swipe gesture.
             */
            private __swipeOrigin;
            /**
             * The user's last move while in touch.
             */
            private __lastMoveEvent;
            /**
             * The captured target that the user first initiated a gesture on.
             */
            private __capturedTarget;
            /**
             * The currently focused element on the screen. Used in the case of WebKit touch events.
             */
            private __focusedElement;
            /**
             * A hash map for mapping custom events to standard events.
             */
            private __reverseMap;
            /**
             * An EventListener with a bound context for registering mapped events.
             */
            private __mappedEventListener;
            /**
             * An object containing the number of currently active mapped touch
             * events of each type.
             */
            private __mappedCount;
            /**
             * A set of subscribers for the swipe gesture.
             */
            private __swipeSubscribers;
            /**
             * A hash of the current pointer touch points on the page.
             */
            private __pointerHash;
            /**
             * An array containing all current pointer touch points on the page.
             */
            private __pointerEvents;
            /**
             * A set of touch start, move, and end listeners to be place on the document.
             */
            private __listeners;
            /**
             * Retrieve the type of touch events for this browser and create the default gesture style.
             */
            constructor();
            /**
             * Add an event listener for the specified event type on the specified element.
             * @param {Node} element The node listening for the event.
             * @param {string} type The type of event being listened to.
             * @param {plat.ui.IGestureListener} listener The listener to be fired.
             * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
             */
            public addEventListener(element: Node, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
            /**
             * Add an event listener for the specified event type on the specified element.
             * @param {Window} element The window object.
             * @param {string} type The type of event being listened to.
             * @param {plat.ui.IGestureListener} listener The listener to be fired.
             * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
             */
            public addEventListener(element: Window, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
            /**
             * Add an event listener for the specified event type on the specified element.
             * @param {Node} element The node listening for the event.
             * @param {string} type The type of event being listened to.
             * @param {EventListener} listener The listener to be fired.
             * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
             */
            public addEventListener(element: Node, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
            /**
             * Add an event listener for the specified event type on the specified element.
             * @param {Window} element The window object.
             * @param {string} type The type of event being listened to.
             * @param {EventListener} listener The listener to be fired.
             * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
             */
            public addEventListener(element: Window, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
            /**
             * Stops listening for touch events and resets the DomEvents instance.
             */
            public dispose(): void;
            /**
             * A listener for touch/mouse start events.
             * @param {plat.ui.IPointerEvent} ev The touch start event object.
             */
            public _onTouchStart(ev: IPointerEvent): boolean;
            /**
             * A listener for touch/mouse move events.
             * @param {plat.ui.IPointerEvent} ev The touch move event object.
             */
            public _onMove(ev: IPointerEvent): boolean;
            /**
             * A listener for touch/mouse end events.
             * @param {plat.ui.IPointerEvent} ev The touch end event object.
             */
            public _onTouchEnd(ev: IPointerEvent): boolean;
            /**
             * A function for resetting all values potentially modified during the touch event sequence.
             */
            private __resetTouchEnd();
            /**
             * A function for handling and firing tap events.
             * @param {plat.ui.IPointerEvent} ev The touch end event object.
             */
            private __handleTap(ev);
            /**
             * A function for handling and firing double tap events.
             * @param {plat.ui.IPointerEvent} ev The touch end event object.
             */
            private __handleDbltap(ev);
            /**
             * A function for handling and firing release events.
             * @param {plat.ui.IPointerEvent} ev The touch end event object.
             */
            private __handleRelease(ev);
            /**
             * A function for handling and firing swipe events.
             */
            private __handleSwipe();
            /**
             * A function for handling and firing track events.
             * @param {plat.ui.IPointerEvent} ev The touch move event object.
             */
            private __handleTrack(ev);
            /**
             * A function for handling and firing track end events.
             * @param {plat.ui.IPointerEvent} ev The touch end event object.
             */
            private __handleTrackEnd(ev);
            /**
             * A function for handling and firing custom events that are mapped to standard events.
             * @param {plat.ui.IExtendedEvent} ev The touch event object.
             */
            private __handleMappedEvent(ev);
            /**
             * A function for determining the proper touch events.
             */
            private __getTypes();
            /**
             * Registers for and starts listening to start and end touch events on the document.
             */
            private __registerTypes();
            /**
             * Unregisters for and stops listening to all touch events on the document.
             */
            private __unregisterTypes();
            /**
             * Registers for and begins listening to a particular touch event type.
             * @param {string} event The event type to begin listening for.
             */
            private __registerType(event);
            /**
             * Unregisters for and stops listening to a particular touch event type.
             * @param {string} event The event type to stop listening for.
             */
            private __unregisterType(event);
            /**
             * Registers and associates an element with an event.
             * @param {plat.ui.ICustomElement} element The element being tied to a custom event.
             * @param {string} type The type of event.
             */
            private __registerElement(element, type);
            /**
             * Unregisters and disassociates an element with an event.
             * @param {plat.ui.ICustomElement} element The element being disassociated with the given custom event.
             * @param {string} type The type of event.
             */
            private __unregisterElement(element, type);
            /**
             * Sets the current touch point and helps standardize the given event object.
             * @param {plat.ui.IPointerEvent} ev The current point being touched.
             */
            private __setTouchPoint(ev);
            /**
             * Sets the captured target.
             * @param {EventTarget} target The target to capture.
             */
            private __setCapture(target);
            /**
             * Sets the captured target.
             * @param {plat.ui.IPointerEvent} ev The current touch point.
             * @param {boolean} remove Whether to remove the touch point or add it.
             */
            private __updatePointers(ev, remove);
            /**
             * Searches from the EventTarget up the DOM tree looking for an element with the
             * registered event type.
             * @param {plat.ui.ICustomElement} eventTarget The current target of the touch event.
             * @param {string} type The type of event being searched for.
             * with the first found element in the tree and the event type. Used to trigger the event at this
             * point in the DOM tree.
             */
            private __findFirstSubscriber(eventTarget, type);
            /**
             * Adds a listener for listening to a standard event and mapping it to a custom event.
             * @param {number} count The number of mapped events registered.
             * @param {string} mappedEvent The mapped event type.
             * @param {boolean} useCapture? Whether the mapped event listener is fired on the capture or bubble phase.
             */
            private __addMappedEvent(count, mappedEvent, useCapture?);
            /**
             * Removes an event listener for a given event type.
             * @param {plat.ui.ICustomElement} element The element to remove the listener from.
             * @param {string} type The type of event being removed.
             * @param {plat.ui.IGestureListener} listener The listener being removed.
             * @param {boolean} useCapture? Whether the listener is fired on the capture or bubble phase.
             */
            private __removeEventListener(element, type, listener, useCapture?);
            /**
             * Removes an element from the subscriber object.
             * @param {plat.ui.ICustomElement} element The element being removed.
             */
            private __removeElement(element);
            /**
             * Standardizes certain properties on the event object for custom events.
             * @param {plat.ui.IExtendedEvent} ev The event object to be standardized.
             */
            private __standardizeEventObject(ev);
            /**
             * Grabs the x and y offsets of an event object's target.
             * @param {plat.ui.IExtendedEvent} ev The current event object.
             */
            private __getOffset(ev);
            /**
             * Clears the hold events setTimeout.
             */
            private __clearHold();
            /**
             * Calculates the distance between two (x, y) coordinate points.
             * @param {number} x1 The x-coordinate of the first point.
             * @param {number} x2 The x-coordinate of the second point.
             * @param {number} y1 The y-coordinate of the first point.
             * @param {number} y2 The y-coordinate of the second point.
             */
            private __getDistance(x1, x2, y1, y2);
            /**
             * Calculates the velocity between two (x, y) coordinate points over a given time.
             * @param {number} dx The change in x position.
             * @param {number} dy The change in y position.
             * @param {number} dt The change in time.
             */
            private __getVelocity(dx, dy, dt);
            /**
             * Calculates the direction of movement.
             * @param {number} dx The change in x position.
             * @param {number} dy The change in y position.
             */
            private __getDirection(dx, dy);
            /**
             * Checks to see if a swipe direction has changed to recalculate
             * an origin point.
             * @param {string} direction The current direction of movement.
             */
            private __checkForOriginChanged(direction);
            /**
             * Checks to see if a swipe event has been registered.
             * @param {string} direction The current direction of movement.
             */
            private __checkForRegisteredSwipe(direction);
            /**
             * Checks to see if a swipe event has been registered.
             * @param {string} direction The current direction of movement.
             */
            private __isHorizontal(direction);
            /**
             * Appends CSS to the head for gestures if needed.
             */
            private __appendGestureStyle();
            /**
             * Creates a style text to append to the document head.
             * @param {plat.ui.IDefaultStyle} styleClass The object containing the custom styles for
             * gestures.
             */
            private __createStyle(styleClass);
            /**
             * Determines whether the target is the currently focused element.
             * @param {EventTarget} target The event target.
             */
            private __isFocused(target);
            /**
             * Handles HTMLInputElements in WebKit based touch applications.
             * @param {HTMLInputElement} target The event target.
             */
            private __handleInput(target);
            /**
             * Handles the phantom click in WebKit based touch applications.
             */
            private __preventClickFromTouch();
            /**
             * Removes selection capability from the element.
             * @param {Node} element The element to remove selections on.
             */
            private __removeSelections(element);
            /**
             * Returns selection capability from the element.
             * @param {Node} element The element to return selections on.
             */
            private __returnSelections(element);
            /**
             * Prevents default and stops propagation in all elements other than
             * inputs and textareas.
             * @param {Event} ev The event object.
             */
            private __preventDefault(ev);
        }
        /**
         * The Type for referencing the '$DomEvents' injectable as a dependency.
         */
        function IDomEvents(): IDomEvents;
        /**
         * Describes an object for managing DOM event registration and handling.
         */
        interface IDomEvents {
            /**
             * Add an event listener for the specified event type on the specified element.
             * @param {Node} element The node listening for the event.
             * @param {string} type The type of event being listened to.
             * @param {plat.ui.IGestureListener} listener The listener to be fired.
             * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
             */
            addEventListener(element: Node, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
            /**
             * Add an event listener for the specified event type on the specified element.
             * @param {Window} element The window object.
             * @param {string} type The type of event being listened to.
             * @param {plat.ui.IGestureListener} listener The listener to be fired.
             * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
             */
            addEventListener(element: Window, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
            /**
             * Add an event listener for the specified event type on the specified element.
             * @param {Node} element The node listening for the event.
             * @param {string} type The type of event being listened to.
             * @param {EventListener} listener The listener to be fired.
             * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
             */
            addEventListener(element: Node, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
            /**
             * Add an event listener for the specified event type on the specified element.
             * @param {Window} element The window object.
             * @param {string} type The type of event being listened to.
             * @param {EventListener} listener The listener to be fired.
             * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
             */
            addEventListener(element: Window, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
            /**
             * Stops listening for touch events and resets the DomEvents instance.
             */
            dispose(): void;
        }
        /**
         * The Type for referencing the '$DomEventsConfig' injectable as a dependency.
         */
        function IDomEventsConfig(): IDomEventsConfig;
        /**
         * A class for managing a single custom event.
         */
        class DomEvent implements IDomEventInstance {
            /**
             * Reference to the Document injectable.
             */
            public $Document: Document;
            /**
             * The node or window object associated with this IDomEventInstance object.
             */
            public element: any;
            /**
             * The event type associated with this IDomEventInstance object.
             */
            public event: string;
            /**
             * Initializes the element and event of this IDomEventInstance object.
             * @param {Node} element The element associated with this IDomEventInstance object.
             * @param {string} event The event associated with this IDomEventInstance object.
             */
            public initialize(element: Node, event: string): void;
            /**
             * Initializes the element and event of this IDomEventInstance object.
             * @param {Window} element The window object.
             * @param {string} event The event associated with this IDomEventInstance object.
             */
            public initialize(element: Window, event: string): void;
            /**
             * Triggers its event on its element.
             * @param {Object} eventExtension? An event extension to extend the dispatched CustomEvent.
             */
            public trigger(eventExtension?: Object): void;
        }
        /**
         * The Type for referencing the '$DomEventInstance' injectable as a dependency.
         */
        function IDomEventInstance(): IDomEventInstance;
        /**
         * Describes an object used for managing a single custom event.
         */
        interface IDomEventInstance {
            /**
             * The node or window object associated with this IDomEventInstance object.
             */
            element: any;
            /**
             * The event type associated with this IDomEventInstance object.
             */
            event: string;
            /**
             * Initializes the element and event of this IDomEventInstance object.
             * @param {Node} element The element associated with this IDomEventInstance object.
             * @param {string} event The event associated with this IDomEventInstance object.
             */
            initialize(element: Node, event: string): void;
            /**
             * Initializes the element and event of this IDomEventInstance object.
             * @param {Window} element The window object.
             * @param {string} event The event associated with this IDomEventInstance object.
             */
            initialize(element: Window, event: string): void;
            /**
             * Triggers its event on its element.
             * @param {Object} eventExtension? An event extension to extend the dispatched CustomEvent.
             */
            trigger(eventExtension?: Object): void;
        }
        /**
         * An extended event object potentially containing coordinate and movement information.
         */
        interface IExtendedEvent extends Event {
            /**
             * The x-coordinate of the event on the screen relative to the upper left corner of the
             * browser window. This value cannot be affected by scrolling.
             */
            clientX?: number;
            /**
             * The y-coordinate of the event on the screen relative to the upper left corner of the
             * browser window. This value cannot be affected by scrolling.
             */
            clientY?: number;
            /**
             * The x-coordinate of the event on the screen relative to the upper left corner of the
             * physical screen or monitor.
             */
            screenX?: number;
            /**
             * The y-coordinate of the event on the screen relative to the upper left corner of the
             * physical screen or monitor.
             */
            screenY?: number;
            /**
             * The x-coordinate of the event on the screen relative to the upper left corner of the
             * fully rendered content area in the browser window. This value can be altered and/or affected by
             * embedded scrollable pages when the scroll bar is moved.
             */
            pageX?: number;
            /**
             * The y-coordinate of the event on the screen relative to the upper left corner of the
             * fully rendered content area in the browser window. This value can be altered and/or affected by
             * embedded scrollable pages when the scroll bar is moved.
             */
            pageY?: number;
            /**
             * The x-coordinate of the event relative to the top-left corner of the
             * offsetParent element that fires the event.
             */
            offsetX?: number;
            /**
             * The y-coordinate of the event relative to the top-left corner of the
             * offsetParent element that fires the event.
             */
            offsetY?: number;
            /**
             * The x and y-coordinates of the event as an object relative to the top-left corner of the
             * offsetParent element that fires the event.
             */
            offset: IPoint;
            /**
             * The potential direction associated with the event.
             */
            direction?: string;
            /**
             * The potential velocity associated with the event.
             */
            velocity?: IVelocity;
            /**
             * An array containing all current touch points. The IExtendedEvents
             * may slightly differ depending on the browser implementation.
             */
            touches?: IExtendedEvent[];
        }
        /**
         * An extended event object potentially containing coordinate and movement information as
         * well as pointer type for pointer events.
         */
        interface IPointerEvent extends IExtendedEvent {
            /**
             * The type of interaction associated with the touch event ('touch', 'pen', 'mouse', '').
             */
            pointerType?: string;
            /**
             * A unique touch identifier.
             */
            pointerId?: number;
            /**
             * A unique touch identifier.
             */
            identifier?: number;
        }
        /**
         * The type of event object passed into the listeners for our custom events.
         */
        interface IGestureEvent extends CustomEvent {
            /**
             * The x-coordinate of the event on the screen relative to the upper left corner of the
             * browser window. This value cannot be affected by scrolling.
             */
            clientX?: number;
            /**
             * The y-coordinate of the event on the screen relative to the upper left corner of the
             * browser window. This value cannot be affected by scrolling.
             */
            clientY?: number;
            /**
             * The x-coordinate of the event on the screen relative to the upper left corner of the
             * physical screen or monitor.
             */
            screenX?: number;
            /**
             * The y-coordinate of the event on the screen relative to the upper left corner of the
             * physical screen or monitor.
             */
            screenY?: number;
            /**
             * The x-coordinate of the event on the screen relative to the upper left corner of the
             * fully rendered content area in the browser window. This value can be altered and/or affected by
             * embedded scrollable pages when the scroll bar is moved.
             */
            pageX?: number;
            /**
             * The y-coordinate of the event on the screen relative to the upper left corner of the
             * fully rendered content area in the browser window. This value can be altered and/or affected by
             * embedded scrollable pages when the scroll bar is moved.
             */
            pageY?: number;
            /**
             * The x-coordinate of the event relative to the top-left corner of the
             * offsetParent element that fires the event.
             */
            offsetX?: number;
            /**
             * The y-coordinate of the event relative to the top-left corner of the
             * offsetParent element that fires the event.
             */
            offsetY?: number;
            /**
             * The potential direction associated with the event.
             */
            direction?: string;
            /**
             * The potential velocity associated with the event.
             */
            velocity?: IVelocity;
            /**
             * An array containing all current touch points. The IExtendedEvents
             * may slightly differ depending on the browser implementation.
             */
            touches?: IExtendedEvent[];
            /**
             * The type of interaction associated with the touch event ('touch', 'pen', 'mouse', '').
             */
            pointerType?: string;
            /**
             * A unique touch identifier.
             */
            identifier?: number;
        }
        /**
         * The listener interface for our custom DOM events.
         */
        interface IGestureListener {
            /**
             * The method signature for a IGestureListener.
             * An EventListener with the argument as an IGestureEvent.
             * @param {plat.ui.IGestureEvent} ev The gesture event object.
             */
            (ev?: IGestureEvent): void;
        }
        /**
         * Describes an object to keep track of a single
         * element's registered custom event types.
         */
        interface IEventSubscriber extends IGestures<IDomEventInstance> {
            /**
             * The total registered gesture count for the associated element.
             */
            gestureCount: number;
        }
        /**
         * Describes an object containing information
         * regarding all our custom events.
         */
        interface IGestures<T> {
            /**
             * The string type|number of events associated with the tap event.
             */
            $tap?: T;
            /**
             * The string type|number of events associated with the dbltap event.
             */
            $dbltap?: T;
            /**
             * The string type|number of events associated with the hold event.
             */
            $hold?: T;
            /**
             * The string type|number of events associated with the release event.
             */
            $release?: T;
            /**
             * The string type|number of events associated with the swipe event.
             */
            $swipe?: T;
            /**
             * The string type|number of events associated with the swipeleft event.
             */
            $swipeleft?: T;
            /**
             * The string type|number of events associated with the swiperight event.
             */
            $swiperight?: T;
            /**
             * The string type|number of events associated with the swipeup event.
             */
            $swipeup?: T;
            /**
             * The string type|number of events associated with the swipedown event.
             */
            $swipedown?: T;
            /**
             * The string type|number of events associated with the track event.
             */
            $track?: T;
            /**
             * The string type|number of events associated with the trackleft event.
             */
            $trackleft?: T;
            /**
             * The string type|number of events associated with the trackright event.
             */
            $trackright?: T;
            /**
             * The string type|number of events associated with the trackup event.
             */
            $trackup?: T;
            /**
             * The string type|number of events associated with the trackdown event.
             */
            $trackdown?: T;
            /**
             * The string type|number of events associated with the trackend event.
             */
            $trackend?: T;
        }
        /**
         * Describes an object containing x and y coordinates.
         */
        interface IPoint {
            /**
             * The x-coordinate.
             */
            x: number;
            /**
             * The y-coordinate.
             */
            y: number;
        }
        /**
         * Describes an object containing a speed in both the horizontal and vertical directions.
         */
        interface IVelocity {
            /**
             * The horizontal, x velocity.
             */
            x: number;
            /**
             * The vertical, y velocity.
             */
            y: number;
        }
        /**
         * Describes an object containing time interval information that
         * governs the behavior of certain custom DOM events.
         */
        interface IIntervals {
            /**
             * The max time in milliseconds a user can hold down on the screen
             * for a tap event to be fired. Defaults to 200 ms.
             */
            tapInterval: number;
            /**
             * The max time in milliseconds a user can wait between consecutive
             * taps for a dbltap event to be fired. Defaults to 300 ms.
             */
            dblTapInterval: number;
            /**
             * The time in milliseconds a user must hold down on the screen
             * before a hold event is fired or a release event can be fired.
             * Defaults to 400 ms.
             */
            holdInterval: number;
            /**
             * The delay in milliseconds between the time a user taps to the time
             * the tap event fires. Used in the case where a double-tap-to-zoom
             * feature is required. Defaults to 0 ms.
             */
            dblTapZoomDelay: number;
        }
        /**
         * Describes an object containing distance information that
         * governs the behavior of certain custom DOM events.
         */
        interface IDistances {
            /**
             * The minimum distance a user must move after touch down to register
             * it as a scroll instead of a tap. Defaults to 5.
             */
            minScrollDistance: number;
            /**
             * The maximum distance between consecutive taps a user is allowed to
             * register a dbltap event. Defaults to 20.
             */
            maxDblTapDistance: number;
        }
        /**
         * Describes an object containing velocity information that
         * governs the behavior of certain custom DOM events.
         */
        interface IVelocities {
            /**
             * The minimum velocity a user must move after touch down to register
             * a swipe event. Defaults to 0.8.
             */
            minSwipeVelocity: number;
        }
        /**
         * Describes an object used for creating a custom class for styling an element
         * listening for a custom DOM event.
         */
        interface IDefaultStyle {
            /**
             * The className that will be used to define the custom style.
             */
            className: string;
            /**
             * An array of string styles in the format:
             * CSS identifier : value
             * (e.g. 'width : 100px')
             */
            styles: string[];
        }
        /**
         * Describes a configuration object for all custom DOM events.
         */
        interface IDomEventsConfig {
            /**
             * An object containing the different time intervals that govern the behavior of certain
             * custom DOM events.
             */
            intervals: IIntervals;
            /**
             * An object containing the different minimum/maximum distances that govern the behavior of certain
             * custom DOM events.
             */
            distances: IDistances;
            /**
             * An object containing the different minimum/maximum velocities that govern the behavior of certain
             * custom DOM events.
             */
            velocities: IVelocities;
            /**
             * The default CSS styles applied to elements listening for custom DOM events.
             */
            styleConfig: IDefaultStyle[];
        }
        /**
         * Holds all the classes and interfaces related to UI animation components for platypus.
         */
        module animations {
            /**
             * A class used for animating elements.
             */
            class Animator implements IAnimator {
                /**
                 * Reference to the ICompat injectable.
                 */
                public $Compat: ICompat;
                /**
                 * All elements currently being animated.
                 */
                public _elements: IObject<IAnimatedElement>;
                /**
                 * Indicates if a warning regarding our CSS was previously fired.
                 */
                private __cssWarning;
                /**
                 * Animates the element with the defined animation denoted by the key.
                 * @param {Element} element The Element to be animated.
                 * @param {string} key The identifier specifying the type of animation.
                 * @param {any} options? Specified options for the animation.
                 */
                public animate(element: Element, key: string, options?: any): IAnimatingThenable;
                /**
                 * Immediately resolves an empty AnimationPromise.
                 * AnimationPromise.
                 */
                public resolve(): IAnimatingThenable;
                /**
                 * Checks whether or not any parent elements are animating.
                 * @param {Node} element The element whose parents we need to check.
                 */
                private __parentIsAnimating(element);
                /**
                 * Sets an new, unique animation ID and denotes the element as currently being animated.
                 * @param {Node} element The element being animated.
                 * @param {plat.ui.animations.IBaseAnimation} animationInstance The animation instance doing the animating.
                 */
                private __setAnimationId(element, animationInstance);
                /**
                 * Forces child nodes of an animating element to stop animating.
                 * @param {Element} element The element being animated.
                 */
                private __stopChildAnimations(element);
            }
            /**
             * The Type for referencing the '$Animator' injectable as a dependency.
             */
            function IAnimator(): IAnimator;
            /**
             * Describes an object used for animating elements.
             */
            interface IAnimator {
                /**
                 * Animates the element with the defined animation denoted by the key.
                 * @param {Element} element The Element to be animated.
                 * @param {string} key The identifier specifying the type of animation.
                 * @param {any} options Specified options for the animation.
                 */
                animate(element: Element, key: string, options?: any): IAnimatingThenable;
                /**
                 * Immediately resolves an empty AnimationPromise.
                 * AnimationPromise.
                 */
                resolve(): IAnimatingThenable;
            }
            /**
             * Describes an object representing a currenlty animated element.
             */
            interface IAnimatedElement {
                /**
                 * The function called at the conclusion of the animation.
                 * @param {boolean} cancel? Specifies whether the animation is being cancelled.
                 * @param {boolean} reanimating? Specifies whether the element is being reanimated while
                 * in a current animation. Cancel must be set to true for reanimation to take effect.
                 */
                animationEnd: (cancel?: boolean, reanimating?: boolean) => void;
                /**
                 * A promise representing an element's current state of animation.
                 */
                promise?: IAnimationThenable<any>;
            }
            /**
             * Describes a function used to obtain an animating parent element's animation thenable.
             */
            interface IGetAnimatingThenable {
                /**
                 * The method signature for IGetAnimatingThenable.
                 */
                (): IAnimationThenable<void>;
            }
            /**
             * Describes a type of Promise that can be optionally cancelled and/or disposed of.
             * Further, in the case where it may have a parent that is animating (which will cause it to immediately cancel and fulfill
             * itself, it resolves with a IGetAnimatingThenable for acccessing
             * the IAnimationThenable of the animating parent element.
             */
            class AnimationPromise extends async.Promise<IGetAnimatingThenable> implements IAnimatingThenable {
                /**
                 * The animation instance to cancel if needed.
                 */
                private __animationInstance;
                /**
                 * The constructor method for the {@link plat.async.AjaxPromise}.
                 * @param {(resolve: (value?: plat.ui.animations.IParentAnimationFn) => any) => void} resolveFunction A resolve function
                 * that only allows for a resolve of void and no reject.
                 */
                constructor(resolveFunction: (resolve: (value?: IGetAnimatingThenable) => any) => void);
                /**
                 * The constructor method for the {@link plat.async.AjaxPromise}.
                 * @param {(resolve: (value?: plat.ui.animations.IParentAnimationFn) => any) => void} resolveFunction A resolve function
                 * that only allows for a resolve of void and no reject.
                 * @param {any} promise The promise object to allow for cancelling the {@link plat.ui.animations.AnimationPromise}.
                 */
                constructor(resolveFunction: (resolve: (value?: IGetAnimatingThenable) => any) => void, promise: any);
                /**
                 * Initializes the promise, providing it with the {@link plat.ui.animations.IBaseAnimation} instance.
                 * @param {plat.ui.animations.IBaseAnimation} instance The animation instance for this promise.
                 */
                public initialize(instance: IBaseAnimation): void;
                /**
                 * A method to cancel the associated animation.
                 */
                public cancel(): IAnimatingThenable;
                /**
                 * A method to dispose the associated animation in order to remove any end states
                 * as determined by the animation class itself.
                 */
                public dispose(): IAnimatingThenable;
                /**
                 * Takes in two methods, called when/if the promise fulfills.
                 * next then method in the promise chain.
                 * @param {(success: plat.ui.animations.IParentAnimationFn) => U} onFulfilled A method called when/if the promise fulfills.
                 * If undefined the next onFulfilled method in the promise chain will be called.
                 */
                public then<U>(onFulfilled: (success: IGetAnimatingThenable) => U): IAnimationThenable<U>;
                /**
                 * Takes in two methods, called when/if the promise fulfills.
                 * next then method in the promise chain.
                 * @param {(success: plat.ui.animations.IParentAnimationFn) => plat.ui.animations.IAnimationThenable<U>} onFulfilled
                 * A method called when/if the promise fulfills.
                 * If undefined the next onFulfilled method in the promise chain will be called.
                 */
                public then<U>(onFulfilled: (success: IGetAnimatingThenable) => IAnimationThenable<U>): IAnimationThenable<U>;
                /**
                 * Takes in two methods, called when/if the promise fulfills.
                 * next then method in the promise chain.
                 * @param {(success: plat.ui.animations.IParentAnimationFn) => plat.async.IThenable<U>} onFulfilled
                 * A method called when/if the promise fulfills.
                 * If undefined the next onFulfilled method in the promise chain will be called.
                 */
                public then<U>(onFulfilled: (success: IGetAnimatingThenable) => async.IThenable<U>): IAnimationThenable<U>;
                /**
                 * A wrapper method for Promise.then(undefined, onRejected);
                 * @param {(error: any) => plat.ui.animations.IAnimationThenable<U>} onRejected A method called when/if the promise rejects.
                 * If undefined the next onRejected method in the promise chain will be called.
                 */
                public catch<U>(onRejected: (error: any) => IAnimationThenable<U>): IAnimationThenable<U>;
                /**
                 * A wrapper method for Promise.then(undefined, onRejected);
                 * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
                 * onRejected method in the promise chain will be called.
                 */
                public catch<U>(onRejected: (error: any) => U): IAnimationThenable<U>;
            }
            /**
             * Describes a chaining function that fulfills when the previous link is complete and is
             * able to be caught in the case of an error.
             */
            interface IAnimationThenable<R> extends async.IThenable<R> {
                /**
                 * Initializes the promise, providing it with the {@link plat.ui.animations.IBaseAnimation} instance.
                 * @param {plat.ui.animations.IBaseAnimation} instance The animation instance for this promise.
                 */
                initialize? (instance: IBaseAnimation): void;
                /**
                 * A method to cancel the associated animation.
                 */
                cancel(): IAnimationThenable<R>;
                /**
                 * A method to dispose the associated animation in order to remove any end states
                 * as determined by the animation class itself.
                 */
                dispose(): IAnimationThenable<R>;
                /**
                 * Takes in two methods, called when/if the promise fulfills/rejects.
                 * @param {(success: R) => plat.ui.animations.IAnimationThenable<U>} onFulfilled A method called when/if the promise fulills.
                 * If undefined the next onFulfilled method in the promise chain will be called.
                 * @param {(error: any) => plat.ui.animations.IAnimationThenable<U>} onRejected? A method called when/if the promise rejects.
                 * If undefined the next onRejected method in the promise chain will be called.
                 */
                then<U>(onFulfilled: (success: R) => IAnimationThenable<U>, onRejected?: (error: any) => IAnimationThenable<U>): IAnimationThenable<U>;
                /**
                 * Takes in two methods, called when/if the promise fulfills/rejects.
                 * @param {(success: R) => plat.ui.animations.IAnimationThenable<U>} onFulfilled A method called when/if the promise fulills.
                 * If undefined the next onFulfilled method in the promise chain will be called.
                 * @param {(error: any) => U} onRejected? A method called when/if the promise rejects.
                 * If undefined the next onRejected method in the promise chain will be called.
                 */
                then<U>(onFulfilled: (success: R) => IAnimationThenable<U>, onRejected?: (error: any) => U): IAnimationThenable<U>;
                /**
                 * Takes in two methods, called when/if the promise fulfills/rejects.
                 * @param {(success: R) => U} onFulfilled A method called when/if the promise fulills.
                 * If undefined the next onFulfilled method in the promise chain will be called.
                 * @param {(error: any) => plat.ui.animations.IAnimationThenable<U>} onRejected? A method called when/if the promise rejects.
                 * If undefined the next onRejected method in the promise chain will be called.
                 */
                then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => IAnimationThenable<U>): IAnimationThenable<U>;
                /**
                 * Takes in two methods, called when/if the promise fulfills/rejects.
                 * @param {(success: R) => U} onFulfilled A method called when/if the promise fulills.
                 * If undefined the next onFulfilled method in the promise chain will be called.
                 * @param {(error: any) => U} onRejected? A method called when/if the promise rejects.
                 * If undefined the next onRejected method in the promise chain will be called.
                 */
                then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => U): IAnimationThenable<U>;
                /**
                 * A wrapper method for Promise.then(undefined, onRejected);
                 * @param {(error: any) => plat.ui.animations.IAnimationThenable<U>} onRejected A method called when/if the promise rejects.
                 * If undefined the next onRejected method in the promise chain will be called.
                 */
                catch<U>(onRejected: (error: any) => IAnimationThenable<U>): IAnimationThenable<U>;
                /**
                 * A wrapper method for Promise.then(undefined, onRejected);
                 * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
                 * onRejected method in the promise chain will be called.
                 */
                catch<U>(onRejected: (error: any) => U): IAnimationThenable<U>;
            }
            /**
             * Describes a type of IPromise that resolves when an animation is
             * finished. It can be optionally cancelled and/or disposed of. Further, in the case where it may have
             * a parent that is animating (which will cause it to immediately cancel and fulfill itself, it resolves
             * with a IGetAnimatingThenable for acccessing
             * the IAnimationThenable of the animating parent element.
             */
            interface IAnimatingThenable extends IAnimationThenable<IGetAnimatingThenable> {
            }
            /**
             * A class representing a single animation for a single element.
             */
            class BaseAnimation implements IBaseAnimation {
                /**
                 * Reference to the ICompat injectable.
                 */
                public $Compat: ICompat;
                /**
                 * The node having the animation performed on it.
                 */
                public element: HTMLElement;
                /**
                 * Contains DOM helper methods for manipulating this control's element.
                 */
                public dom: IDom;
                /**
                 * Specified options for the animation.
                 */
                public options: any;
                /**
                 * The resolve function for the end of the animation.
                 */
                public _resolve: () => void;
                /**
                 * A function for initializing the animation or any of its properties before start.
                 */
                public initialize(): void;
                /**
                 * A function denoting the start of the animation.
                 */
                public start(): void;
                /**
                 * A function to be called when the animation is over.
                 */
                public end(): void;
                /**
                 * A function to be called to let it be known the animation is being cancelled.
                 */
                public cancel(): void;
                /**
                 * A function for reverting any modifications or changes that may have been made as a
                 * result of this animation.
                 */
                public dispose(): void;
                /**
                 * Initializes the element and key properties of this animation and grabs a
                 * reference to its resolve function.
                 * @param {Element} element The element on which the animation will occur.
                 * @param {any} options Specified options for the animation.
                 * animation is complete and end() is called.
                 */
                public instantiate(element: Element, options?: any): IAnimatingThenable;
            }
            /**
             * Describes an object representing a single animation for a single element.
             */
            interface IBaseAnimation {
                /**
                 * The node having the animation performed on it.
                 */
                element: HTMLElement;
                /**
                 * Contains DOM helper methods for manipulating this control's element.
                 */
                dom: IDom;
                /**
                 * Specified options for the animation.
                 */
                options: any;
                /**
                 * A function for initializing the animation or any of its properties before start.
                 */
                initialize(): void;
                /**
                 * A function denoting the start of the animation.
                 */
                start(): void;
                /**
                 * A function to be called when the animation is over.
                 */
                end(): void;
                /**
                 * A function to be called to let it be known the animation is being cancelled.
                 */
                cancel(): void;
                /**
                 * A function for reverting any modifications or changes that may have been made as a
                 * result of this animation.
                 */
                dispose(): void;
                /**
                 * Initializes the element and key properties of this animation.
                 * @param {Element} element The element on which the animation will occur.
                 * @param {any} options Specified options for the animation.
                 * animation is complete and end() is called.
                 */
                instantiate(element: Element, options?: any): IAnimatingThenable;
            }
            /**
             * A class representing a single CSS animation for a single element.
             */
            class CssAnimation extends BaseAnimation implements ICssAnimation {
                /**
                 * A set of browser compatible CSS animation events capable of being listened to.
                 */
                private __animationEvents;
                /**
                 * A collection of animation event subscriptions used for chaining.
                 */
                private __subscribers;
                /**
                 * The function to stop listening to the current event/animation in occurrence.
                 */
                private __removeListener;
                /**
                 * A function for reverting any modifications or changes that may have been made as a
                 * result of this animation.
                 */
                public dispose(): void;
                /**
                 * A function to listen to the start of an animation event.
                 * @param {() => void} listener The function to call when the animation begins.
                 */
                public animationStart(listener: () => void): ICssAnimation;
                /**
                 * A function to listen to the start of a transition event.
                 * @param {() => void} listener The function to call when the transition begins.
                 */
                public transitionStart(listener: () => void): ICssAnimation;
                /**
                 * A function to listen to the end of an animation event.
                 * @param {() => void} listener The function to call when the animation ends.
                 */
                public animationEnd(listener: () => void): ICssAnimation;
                /**
                 * A function to listen to the end of a transition event.
                 * @param {() => void} listener The function to call when the transition ends.
                 */
                public transitionEnd(listener: () => void): ICssAnimation;
                /**
                 * Adds the listener for the desired event and handles subscription management and
                 * chaining.
                 * @param {string} event The event to subscribe to.
                 * @param {() => void} listener The function to call when the event fires.
                 */
                private __addEventListener(event, listener);
            }
            /**
             * Describes an object representing a single CSS animation for a single element.
             */
            interface ICssAnimation extends IBaseAnimation {
                /**
                 * A function to listen to the start of an animation event.
                 * @param {() => void} listener The function to call when the animation begins.
                 */
                animationStart(listener: () => void): ICssAnimation;
                /**
                 * A function to listen to the start of a transition event.
                 * @param {() => void} listener The function to call when the transition begins.
                 */
                transitionStart(listener: () => void): ICssAnimation;
                /**
                 * A function to listen to the end of an animation event.
                 * @param {() => void} listener The function to call when the animation ends.
                 */
                animationEnd(listener: () => void): ICssAnimation;
                /**
                 * A function to listen to the end of a transition event.
                 * @param {() => void} listener The function to call when the transition ends.
                 */
                transitionEnd(listener: () => void): ICssAnimation;
            }
            /**
             * A class for creating a single JavaScript animation for a single element.
             */
            class JsAnimation extends BaseAnimation implements IJsAnimation {
                /**
                 * A flag specifying that this animation is a JavaScript implementation.
                 */
                public isJs: boolean;
            }
            /**
             * Describes an object representing a single JavaScript animation for a single element.
             */
            interface IJsAnimation extends IBaseAnimation {
                /**
                 * A flag specifying that this animation is a JavaScript implementation.
                 */
                isJs: boolean;
            }
            /**
             * A simple CSS Animation class that places the 'plat-animation' class on an
             * element, checks for animation properties, and waits for the animation to end.
             */
            class SimpleCssAnimation extends CssAnimation implements ISimpleCssAnimation {
                /**
                 * Reference to the Window injectable.
                 */
                public $Window: Window;
                /**
                 * The class name added to the animated element.
                 */
                public className: string;
                /**
                 * Adds the class to start the animation.
                 */
                public initialize(): void;
                /**
                 * A function denoting the start of the animation.
                 */
                public start(): void;
                /**
                 * A function to be called to let it be known the animation is being cancelled.
                 * Replaces the animation class with the animation class and "-end" appended to it
                 * to allow it to jump to final state.
                 */
                public cancel(): void;
                /**
                 * A function to remove the end state from the element. Can be useful when combining
                 * multiple types of animations on the same element.
                 */
                public dispose(): void;
            }
            /**
             * An interface for extending the SimpleCssAnimation
             * or SimpleCssTransition and allowing for
             * custom class names to initiate animations or transitions.
             */
            interface ISimpleCssAnimation extends ICssAnimation {
                /**
                 * The class name added to the animated element.
                 */
                className: string;
            }
            /**
             * An animation control that fades in an element as defined by the included CSS.
             */
            class FadeIn extends SimpleCssAnimation {
                /**
                 * The class name added to the element fading in.
                 */
                public className: string;
            }
            /**
             * An animation control that fades out an element as defined by the included CSS.
             */
            class FadeOut extends SimpleCssAnimation {
                /**
                 * The class name added to the element fading out.
                 */
                public className: string;
            }
            /**
             * An animation control that causes an element to enter as defined by the included CSS.
             */
            class Enter extends SimpleCssAnimation {
                /**
                 * The class name added to the entering element.
                 */
                public className: string;
            }
            /**
             * An animation control that causes an element to leave as defined by the included CSS.
             */
            class Leave extends SimpleCssAnimation {
                /**
                 * The class name added to the leaving element.
                 */
                public className: string;
            }
            /**
             * A simple CSS Animation class that places the 'plat-transition' class on an
             * element, checks for transition properties, and waits for the transition to end.
             */
            class SimpleCssTransition extends CssAnimation implements ISimpleCssTransition {
                /**
                 * Reference to the Window injectable.
                 */
                public $Window: Window;
                /**
                 * A JavaScript object with key value pairs for adjusting transition values.
                 * (e.g. { width: '800px' } would set the element's width to 800px.
                 */
                public options: IObject<string>;
                /**
                 * The class name added to the animated element.
                 */
                public className: string;
                /**
                 * A JavaScript object containing all modified properties as a result
                 * of this animation. Used in the case of a disposal to reset the changed
                 * properties.
                 */
                public _modifiedProperties: IObject<string>;
                /**
                 * Denotes whether or not the animation was ever started.
                 */
                public _started: boolean;
                /**
                 * Adds the class to enable the transition.
                 */
                public initialize(): void;
                /**
                 * A function denoting the start of the animation.
                 */
                public start(): void;
                /**
                 * A function to be called to let it be known the animation is being cancelled.
                 */
                public cancel(): void;
                /**
                 * A function to be called to reset the last transition to its previous state.
                 */
                public dispose(): void;
                /**
                 * Animate the element based on the options passed in.
                 * If false, the control should begin cleaning up.
                 */
                public _animate(): boolean;
            }
            /**
             * An object that allows for transitioned changes to an Element's style based on
             * options passed in.
             */
            interface ISimpleCssTransition extends ISimpleCssAnimation {
                /**
                 * A JavaScript object with key value pairs for adjusting transition values.
                 * (e.g. { width: '800px' } would set the element's width to 800px.
                 */
                options: IObject<string>;
            }
        }
        /**
         * Holds classes and interfaces related to UI control components in platypus.
         */
        module controls {
            /**
             * A TemplateControl that acts as a base for all
             * controls that can interchangeably swap out IBaseViewControls.
             */
            class Baseport extends TemplateControl implements IBaseport {
                /**
                 * Reference to an injectable that caches IElementManagers.
                 */
                public $ManagerCache: storage.ICache<processing.IElementManager>;
                /**
                 * Reference to the Document injectable.
                 */
                public $Document: Document;
                /**
                 * Reference to the IElementManagerFactory injectable.
                 */
                public $ElementManagerFactory: processing.IElementManagerFactory;
                /**
                 * Reference to the IAnimator injectable.
                 */
                public $Animator: animations.IAnimator;
                /**
                 * Reference to the IPromise injectable.
                 */
                public $Promise: async.IPromise;
                /**
                 * The navigator used for navigating between IBaseViewControls.
                 */
                public navigator: navigation.IBaseNavigator;
                /**
                 * A promise used for disposing the end state of the previous animation prior to starting a new one.
                 */
                public _animationPromise: animations.IAnimationThenable<animations.IGetAnimatingThenable>;
                /**
                 * The constructor for a Baseport.
                 * @param {plat.navigation.IBaseNavigator} navigator The navigator used for navigating between
                 * IBaseViewControls.
                 */
                constructor(navigator: navigation.IBaseNavigator);
                /**
                 * Clears the control element's innerHTML.
                 */
                public setTemplate(): void;
                /**
                 * Clean up any memory being held.
                 */
                public dispose(): void;
                /**
                 * Grabs the root of this control's manager
                 * tree, clears it, and initializes the
                 * creation of a new one by kicking off a
                 * navigate.
                 * @param {plat.ui.controls.IBaseportNavigateToOptions} ev The navigation options.
                 */
                public navigateTo(ev: IBaseportNavigateToOptions): void;
                /**
                 * Implements the functionality for when the hard backbutton is pressed on a device.
                 */
                public backButtonPressed(): void;
                /**
                 * Manages the navigatingFrom lifecycle event for
                 * IBaseViewControls.
                 * @param {plat.ui.IBaseViewControl} fromControl The IBaseViewControl
                 * being navigated away from.
                 * resolves when the current view is done animating away.
                 */
                public navigateFrom(fromControl: IBaseViewControl): animations.IAnimationThenable<animations.IGetAnimatingThenable>;
                /**
                 * Initializes the navigator.
                 * @param {any} navigationParameter? A parameter needed
                 * to perform the specified type of navigation.
                 * @param {plat.navigation.IBaseNavigationOptions} options? The options
                 * needed on load for the inherited form of navigation.
                 */
                public _load(navigationParameter?: any, options?: navigation.IBaseNavigationOptions): void;
            }
            /**
             * Describes an object that acts as a base for all controls that can interchangeably
             * swap out IBaseViewControls.
             */
            interface IBaseport extends ITemplateControl {
                /**
                 * The navigator used for navigating between IBaseViewControls.
                 */
                navigator: navigation.IBaseNavigator;
                /**
                 * Grabs the root of this control's manager
                 * tree, clears it, and initializes the
                 * creation of a new one by kicking off a
                 * navigate.
                 * @param {plat.ui.controls.IBaseportNavigateToOptions} ev The navigation options.
                 */
                navigateTo(ev: IBaseportNavigateToOptions): void;
                /**
                 * Manages the navigatingFrom lifecycle event for
                 * IBaseViewControls.
                 * @param {plat.ui.IBaseViewControl} fromControl The IBaseViewControl
                 * being navigated away from.
                 * when the current view is done animating away.
                 */
                navigateFrom(fromControl: IBaseViewControl): animations.IAnimationThenable<animations.IGetAnimatingThenable>;
                /**
                 * Implements the functionality for when the hard backbutton is pressed on a device.
                 */
                backButtonPressed(): void;
            }
            /**
             * Navigation options for a Baseport and all
             * controls that inherit from Baseport.
             */
            interface IBaseportNavigateToOptions {
                /**
                 * Either an IBaseViewControls or an injector for an
                 * IBaseViewControls to be used.
                 */
                target: any;
                /**
                 * The navigation parameter.
                 */
                parameter: any;
                /**
                 * The options used for navigation.
                 */
                options: navigation.IBaseNavigationOptions;
                /**
                 * The type of IBaseViewControls to navigate to.
                 */
                type: string;
            }
            /**
             * A TemplateControl that can interchangeably swap out
             * IViewControls.
             */
            class Viewport extends Baseport {
                /**
                 * Contains all the bottom-level viewports.
                 */
                private static __endViewports;
                /**
                 * Adds a viewport to the end viewports array if necessary. Keeps track of all viewports so that
                 * the end viewports array only contains the bottom-level viewports.
                 */
                private static __addViewport(viewport);
                /**
                 * Reference to the IEventManagerStatic injectable.
                 */
                public $EventManagerStatic: events.IEventManagerStatic;
                /**
                 * The evaluated plat-options object.
                 */
                public options: observable.IObservableProperty<IViewportOptions>;
                /**
                 * A type of navigator that uses either the ViewControl's
                 * Constructors or their registered names for navigation
                 * from one to another.
                 */
                public navigator: navigation.INavigatorInstance;
                /**
                 * Propagates an event up from the bottom of the view-tree, allowing the backbutton
                 * event to be handled by any view control. If no view control handles the event, the
                 * default functionality is to call navigator.goBack().
                 */
                public backButtonPressed(): void;
                /**
                 * Checks for a default view, finds the ViewControl's injector,
                 * and initializes the loading of the view.
                 */
                public _load(): void;
            }
            /**
             * The available options for a Viewport.
             */
            interface IViewportOptions {
                /**
                 * The registered name of the default
                 * IViewControl to initially navigate to.
                 */
                defaultView: string;
                /**
                 * Whether or not this viewport is a main viewport. Main viewports handle
                 * backbutton events.
                 */
                main?: string;
            }
            /**
             * A TemplateControl that can interchangeably swap out
             * IWebViewControls based on their defined routes.
             */
            class Routeport extends Baseport {
                /**
                 * The evaluated plat-options object.
                 */
                public options: observable.IObservableProperty<IRouteportOptions>;
                /**
                 * A type of navigator that uses the registered routes
                 * for IWebViewControls to navigate to and from one another.
                 */
                public navigator: navigation.IRoutingNavigator;
                /**
                 * Looks for a default route and initializes the loading
                 * of the view.
                 */
                public _load(): void;
            }
            /**
             * The available options for a Routeport.
             */
            interface IRouteportOptions {
                /**
                 * The registered route of the default
                 * IWebViewControl to initially navigate to.
                 */
                defaultRoute: string;
            }
            /**
             * A TemplateControl for easily reusing a
             * defined HTML template.
             */
            class Template extends TemplateControl {
                /**
                 * Reference to the IPromise injectable.
                 */
                public $Promise: async.IPromise;
                /**
                 * Reference to an injectable for storing HTML templates.
                 */
                public $TemplateCache: storage.ITemplateCache;
                /**
                 * Reference to the Document injectable.
                 */
                public $Document: Document;
                /**
                 * Removes the <plat-template> node from the DOM
                 */
                public replaceWith: string;
                /**
                 * The evaluated plat-options object.
                 */
                public options: observable.IObservableProperty<ITemplateOptions>;
                /**
                 * The unique ID used to reference a particular
                 * template.
                 */
                public _id: string;
                /**
                 * The optional URL associated with this
                 * particular template.
                 */
                public _url: string;
                /**
                 * Whether or not this is the first instance of the control,
                 * specifying that it defines the template to copy.
                 */
                private __isFirst;
                /**
                 * A promise that resolves when the template is retrieved and ready.
                 */
                private __templatePromise;
                /**
                 * HTML template storage for all instances of this control.
                 */
                private __templateControlCache;
                /**
                 * The constructor for a Template. Creates the control cache.
                 */
                constructor();
                /**
                 * Initializes the creation of the template.
                 */
                public initialize(): void;
                /**
                 * Decides if this is a template definition or
                 * a template instance.
                 */
                public loaded(): void;
                /**
                 * Removes the template from the template cache.
                 */
                public dispose(): void;
                /**
                 * Determines whether a URL or innerHTML is being used,
                 * creates the bindable template, and stores the template
                 * in a template cache for later use.
                 */
                public _initializeTemplate(): void;
                /**
                 * Waits for the template promise to resolve, then initializes
                 * the binding of the bindable template and places it into the
                 * DOM.
                 * @param {plat.async.IThenable<plat.ui.controls.Template>} templatePromise The promise
                 * associated with the first instance of the control with this ID.
                 */
                public _waitForTemplateControl(templatePromise: async.IThenable<Template>): void;
                /**
                 * Maps the bindable templates cache and html templates of the first
                 * control with the proper ID to this control's bindable templates.
                 * @param {plat.ui.controls.Template} control The first of the controls
                 * with this corresponding ID that defined the HTML template to reuse.
                 */
                private __mapBindableTemplates(control);
            }
            /**
             * The available options for the Template control.
             */
            interface ITemplateOptions {
                /**
                 * The unique ID used to label a template
                 * and use it as DOM.
                 */
                id: string;
                /**
                 * An optional URL to specify a template
                 * instead of using the element's innerHTML.
                 */
                templateUrl: string;
            }
            /**
             * A TemplateControl for inner HTML that contains controls
             * and/or markup and not having it bind or evaluate.
             */
            class Ignore extends TemplateControl {
                /**
                 * Removes the innerHTML from the DOM and saves it.
                 */
                public setTemplate(): void;
                /**
                 * Places the saved innerHTML back into the DOM.
                 */
                public loaded(): void;
            }
            /**
             * A TemplateControl for repeating a block of
             * DOM nodes bound to an array.
             */
            class ForEach extends TemplateControl {
                /**
                 * Reference to the IAnimator injectable.
                 */
                public $Animator: animations.IAnimator;
                /**
                 * Reference to the IPromise injectable.
                 */
                public $Promise: async.IPromise;
                /**
                 * The required context of the control (must be of type Array).
                 */
                public context: any[];
                /**
                 * The load priority of the control (needs to load before a Bind control).
                 */
                public priority: number;
                /**
                 * The child controls of the control. All will be of type ITemplateControl.
                 */
                public controls: ITemplateControl[];
                /**
                 * A Promise that fulfills when the items are loaded.
                 */
                public itemsLoaded: async.IThenable<void>;
                /**
                 * The node length of the element's childNodes (innerHTML).
                 */
                public _blockLength: number;
                /**
                 * Whether or not the Array listener has been set.
                 */
                private __listenerSet;
                /**
                 * An array to aggregate all current animation promises.
                 */
                private __currentAnimations;
                /**
                 * The resolve function for the itemsLoaded promise.
                 */
                private __resolveFn;
                /**
                 * The constructor for a ForEach. Creates the itemsLoaded promise.
                 */
                constructor();
                /**
                 * Creates a bindable template with the control element's childNodes (innerHTML).
                 */
                public setTemplate(): void;
                /**
                 * Re-syncs the ForEach children controls and DOM with the new
                 * array.
                 * @param {Array<any>} newValue? The new Array
                 * @param {Array<any>} oldValue? The old Array
                 */
                public contextChanged(newValue?: any[], oldValue?: any[]): void;
                /**
                 * Observes the Array context for changes and adds initial items to the DOM.
                 */
                public loaded(): void;
                /**
                 * Removes any potentially held memory.
                 */
                public dispose(): void;
                /**
                 * Adds an item to the control's element.
                 * @param {DocumentFragment} item The HTML fragment representing a single item
                 * @param {boolean} animate? Whether or not to animate the entering item
                 */
                public _addItem(item: DocumentFragment, animate?: boolean): void;
                /**
                 * Removes an item from the control's element.
                 */
                public _removeItem(): void;
                /**
                 * Updates the control's children resource objects when
                 * the array changes.
                 */
                public _updateResources(): void;
                /**
                 * Sets a listener for the changes to the array.
                 */
                public _setListener(): void;
                /**
                 * Receives an event when a method has been called on an array and maps the array
                 * method to its associated method handler.
                 * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
                 */
                public _executeEvent(ev: observable.IArrayMethodInfo<any>): void;
                /**
                 * Adds new items to the control's element when items are added to
                 * the array.
                 * @param {number} numberOfItems The number of items to add.
                 * @param {number} index The point in the array to start adding items.
                 * @param {boolean} animate? Whether or not to animate the new items
                 */
                public _addItems(numberOfItems: number, index: number, animate?: boolean): async.IThenable<void>;
                /**
                 * Removes items from the control's element.
                 * @param {number} numberOfItems The number of items to remove.
                 */
                public _removeItems(numberOfItems: number): void;
                /**
                 * Returns a resource alias object for an item in the array. The
                 * resource object contains index:number, even:boolean, odd:boolean,
                 * first:boolean, and last:boolean.
                 * @param {number} index The index used to create the resource aliases.
                 */
                public _getAliases(index: number): IObject<IResource>;
                /**
                 * Handles items being pushed into the array.
                 * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
                 */
                public _push(ev: observable.IArrayMethodInfo<any>): void;
                /**
                 * Handles items being popped off the array.
                 * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
                 */
                public _pop(ev: observable.IArrayMethodInfo<any>): void;
                /**
                 * Handles items being shifted off the array.
                 * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
                 */
                public _shift(ev: observable.IArrayMethodInfo<any>): void;
                /**
                 * Handles adding/removing items when an array is spliced.
                 * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
                 */
                public _splice(ev: observable.IArrayMethodInfo<any>): void;
                /**
                 * Handles items being unshifted into the array.
                 * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
                 */
                public _unshift(ev: observable.IArrayMethodInfo<any>): void;
                /**
                 * Handles when the array is sorted.
                 * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
                 */
                public _sort(ev: observable.IArrayMethodInfo<any>): void;
                /**
                 * Handles when the array is reversed.
                 * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
                 */
                public _reverse(ev: observable.IArrayMethodInfo<any>): void;
                /**
                 * Animates a block of elements.
                 * @param {number} startNode The starting childNode of the ForEach to animate
                 * @param {number} endNode The ending childNode of the ForEach to animate
                 * @param {string} key The animation key/type
                 * @param {boolean} cancel? Whether or not the animation should cancel all current animations.
                 * Defaults to true.
                 */
                public _animateItems(startNode: number, endNode: number, key: string, cancel?: boolean): animations.IAnimationThenable<void>;
                /**
                 * Handles the animation of a block of elements.
                 * @param {number} startNode The starting childNode of the ForEach to animate
                 * @param {number} endNode The ending childNode of the ForEach to animate
                 * @param {string} key The animation key/type
                 */
                private __handleAnimation(startNode, endNode, key);
            }
            /**
             * A TemplateControl for adding HTML to the
             * DOM through bound context strings.
             */
            class Html extends TemplateControl {
                /**
                 * Loads the DOM with the new HTML String.
                 */
                public contextChanged(): void;
                /**
                 * Loads the context string as the innerHTML of the element.
                 */
                public loaded(): void;
            }
            /**
             * A TemplateControl for binding an HTML select element
             * to an Array context.
             */
            class Select extends TemplateControl {
                /**
                 * Reference to the IPromise injectable.
                 */
                public $Promise: async.IPromise;
                /**
                 * Reference to the Document injectable.
                 */
                public $Document: Document;
                /**
                 * Replaces the <plat-select> node with
                 * a <select> node.
                 */
                public replaceWith: string;
                /**
                 * The load priority of the control (needs to load before a Bind control).
                 */
                public priority: number;
                /**
                 * The required context of the control (must be of type Array).
                 */
                public context: any[];
                /**
                 * An object that keeps track of unique
                 * optgroups.
                 */
                public groups: IObject<Element>;
                /**
                 * The evaluated plat-options object.
                 */
                public options: observable.IObservableProperty<ISelectOptions>;
                /**
                 * A Promise that will fulfill whenever all items are loaded.
                 */
                public itemsLoaded: async.IThenable<void>;
                /**
                 * Whether or not the Array listener has been set.
                 */
                private __listenerSet;
                /**
                 * Whether or not the select is grouped.
                 */
                private __isGrouped;
                /**
                 * Whether or not the select should be treated as a
                 * native (unbound) select element.
                 */
                private __isNativeSelect;
                /**
                 * The property used to group the objects.
                 */
                private __group;
                /**
                 * An optional default option specified in the control element's
                 * innerHTML.
                 */
                private __defaultOption;
                /**
                 * The function to resolve the itemsLoaded promise.
                 */
                private __resolveFn;
                /**
                 * The constructor for a Select. Creates the itemsLoaded promise.
                 */
                constructor();
                /**
                 * Creates the bindable option template and grouping
                 * template if necessary.
                 */
                public setTemplate(): void;
                /**
                 * Re-observes the new array context and modifies
                 * the options accordingly.
                 * @param {Array<any>} newValue? The new array context.
                 * @param {Array<any>} oldValue? The old array context.
                 */
                public contextChanged(newValue?: any[], oldValue?: any[]): void;
                /**
                 * Observes the new array context and adds
                 * the options accordingly.
                 */
                public loaded(): void;
                /**
                 * Removes any potentially held memory.
                 */
                public dispose(): void;
                /**
                 * Sets a listener for the changes to the array.
                 */
                public _setListener(): void;
                /**
                 * Receives an event when a method has been called on an array and maps the array
                 * method to its associated method handler.
                 * @param {plat.observable.IArrayMethodInfo<any>} ev The Array mutation event information.
                 */
                public _executeEvent(ev: observable.IArrayMethodInfo<any>): void;
                /**
                 * Adds the options to the select element.
                 * @param {number} numberOfItems The number of items to add.
                 * @param {number} length The current index of the next
                 * set of items to add.
                 */
                public _addItems(numberOfItems: number, length: number): async.IThenable<void>;
                /**
                 * The callback used to add an option after
                 * its template has been bound.
                 * @param {number} index The current index of the item being added.
                 * @param {any} item The item being added.
                 * @param {DocumentFragment} optionClone The bound DocumentFragment to be
                 * inserted into the DOM.
                 * or optgroup has successfully be inserted.
                 */
                public _insertOptions(index: number, item: any, optionClone: DocumentFragment): async.IThenable<any>;
                /**
                 * Removes the specified option item from the DOM.
                 * @param {number} index The control index to remove.
                 */
                public _removeItem(index: number): void;
                /**
                 * Removes a specified number of elements.
                 * @param {number} numberOfItems The number of items
                 * to remove.
                 */
                public _removeItems(numberOfItems: number): void;
                /**
                 * The function called when an item has been removed
                 * from the array context.
                 * @param {plat.observable.IArrayMethodInfo<any>} ev The array mutation object
                 */
                public _itemRemoved(ev: observable.IArrayMethodInfo<any>): void;
                /**
                 * Resets the select element by removing all its
                 * items and adding them back.
                 */
                public _resetSelect(): void;
                /**
                 * The function called when an element is pushed to
                 * the array context.
                 * @param {plat.observable.IArrayMethodInfo<any>} ev The array mutation object
                 */
                public _push(ev: observable.IArrayMethodInfo<any>): void;
                /**
                 * The function called when an item is popped
                 * from the array context.
                 * @param {plat.observable.IArrayMethodInfo<any>} ev The array mutation object
                 */
                public _pop(ev: observable.IArrayMethodInfo<any>): void;
                /**
                 * The function called when an item is shifted
                 * from the array context.
                 * @param {plat.observable.IArrayMethodInfo<any>} ev The array mutation object
                 */
                public _shift(ev: observable.IArrayMethodInfo<any>): void;
                /**
                 * The function called when items are spliced
                 * from the array context.
                 * @param {plat.observable.IArrayMethodInfo<any>} ev The array mutation object
                 */
                public _splice(ev: observable.IArrayMethodInfo<any>): void;
                /**
                 * The function called when an item is unshifted
                 * onto the array context.
                 * @param {plat.observable.IArrayMethodInfo<any>} ev The array mutation object
                 */
                public _unshift(ev: observable.IArrayMethodInfo<any>): void;
                /**
                 * The function called when the array context
                 * is sorted.
                 * @param {plat.observable.IArrayMethodInfo<any>} ev The array mutation object
                 */
                public _sort(ev: observable.IArrayMethodInfo<any>): void;
                /**
                 * The function called when the array context
                 * is reversed.
                 * @param {plat.observable.IArrayMethodInfo<any>} ev The array mutation object
                 */
                public _reverse(ev: observable.IArrayMethodInfo<any>): void;
            }
            /**
             * The available options for the Select control.
             */
            interface ISelectOptions {
                /**
                 * The property in your context array
                 * of objects to use to group the objects
                 * into optgroups.
                 */
                group: string;
                /**
                 * The property in your context array of
                 * objects with which to use to bind to the
                 * option's value.
                 */
                value: string;
                /**
                 * The property in your context array of
                 * objects with which to use to bind to the
                 * option's textContent.
                 */
                textContent: string;
            }
            /**
             * A TemplateControl conditionally adding or removing
             * a block of nodes to or from the DOM.
             */
            class If extends TemplateControl {
                /**
                 * Reference to the IAnimator injectable.
                 */
                public $Animator: animations.IAnimator;
                /**
                 * Reference to the IPromise injectable.
                 */
                public $Promise: async.IPromise;
                /**
                 * The evaluated plat-options object.
                 */
                public options: observable.IObservableProperty<IIfOptions>;
                /**
                 * The Comment used to hold the place of the plat-if element.
                 */
                public commentNode: Comment;
                /**
                 * The DocumentFragment that stores the plat-if element when hidden.
                 */
                public fragmentStore: DocumentFragment;
                /**
                 * The current evaluated condition (whether or not the
                 * control is visible) of the control.
                 */
                private __condition;
                /**
                 * A boolean value stating whether or not the condition has already
                 * been evaluated.
                 */
                private __firstTime;
                /**
                 * A function to stop listening to changes on the options object.
                 */
                private __removeListener;
                /**
                 * A promise that resolves when the leave animation is finished.
                 */
                private __leaveAnimation;
                /**
                 * A promise that resolves when the entrance animation is finished.
                 */
                private __enterAnimation;
                /**
                 * The constructor for a If. Creates the
                 * DocumentFragment for holding the conditional nodes.
                 */
                constructor();
                /**
                 * Checks the options and initializes the
                 * evaluation.
                 */
                public contextChanged(): async.IThenable<void>;
                public setTemplate(): void;
                /**
                 * Sets the visibility to true if no options are
                 * defined, kicks off the evaluation, and observes
                 * the options for changes.
                 */
                public loaded(): async.IThenable<void>;
                /**
                 * Stops listening to the options for changes.
                 */
                public dispose(): void;
                /**
                 * Checks the condition and decides
                 * whether or not to add or remove
                 * the node from the DOM.
                 */
                public _setter(options: IIfOptions): async.IThenable<void>;
                /**
                 * Adds the conditional nodes to the DOM.
                 */
                public _addItem(): async.IThenable<void>;
                /**
                 * Removes the conditional nodes from the DOM.
                 */
                public _removeItem(): void;
            }
            /**
             * The available options for the If control.
             */
            interface IIfOptions {
                /**
                 * A boolean expression to bind to whether or not the conditional
                 * nodes are present on the DOM.
                 */
                condition: boolean;
            }
            /**
             * A TemplateControl for adding additonal
             * functionality to a native HTML anchor tag.
             */
            class Anchor extends TemplateControl {
                /**
                 * Replaces the Anchor's element with a native anchor tag.
                 */
                public replaceWith: string;
                /**
                 * The control's anchor element.
                 */
                public element: HTMLAnchorElement;
                /**
                 * The IBrowserConfig injectable instance
                 */
                public $browserConfig: web.IBrowserConfig;
                /**
                 * The IBrowser injectable instance
                 */
                public $browser: web.IBrowser;
                /**
                 * The options for Anchor, if ignore is true, anchor will ignore changing the url.
                 */
                public options: observable.IObservableProperty<{
                    ignore?: boolean;
                }>;
                /**
                 * Prevents default on the anchor tag if the href attribute is left empty, also normalizes internal links.
                 */
                public initialize(): void;
                /**
                 * Calls to normalize the href for internal links.
                 */
                public loaded(): void;
                /**
                 * Calls to normalizes the href for internal links and resets the href is necessary.
                 */
                public setHref(): void;
                /**
                 * Normalizes the href for internal links, ignores external links.
                 */
                public getHref(): string;
            }
        }
    }
    /**
     * Holds classes and interfaces related to Document processing in platypus.
     */
    module processing {
        /**
         * Responsible for iterating through the DOM and collecting controls.
         */
        class Compiler implements ICompiler {
            /**
             * Reference to the IElementManagerFactory injectable.
             */
            public $ElementManagerFactory: IElementManagerFactory;
            /**
             * Reference to the ITextManagerFactory injectable.
             */
            public $TextManagerFactory: ITextManagerFactory;
            /**
             * Reference to the ICommentManagerFactory injectable.
             */
            public $CommentManagerFactory: ICommentManagerFactory;
            /**
             * Reference to a cache injectable that stores IElementManagers.
             */
            public $ManagerCache: storage.ICache<INodeManager>;
            /**
             * Goes through the child Nodes of the given Node, finding elements that contain controls as well as
             * text that contains markup.
             * @param {Node} node The node whose childNodes are going to be compiled.
             * @param {plat.ui.ITemplateControl} control? The parent control for the given Node. The parent must implement the
             * ITemplateControl interface since only they can contain templates.
             */
            public compile(node: Node, control?: ui.ITemplateControl): void;
            /**
             * Goes through the Node array, finding elements that contain controls as well as
             * text that contains markup.
             * @param {Array<Node>} nodes The nodes that are going to be compiled.
             * @param {plat.ui.ITemplateControl} control? The parent control for the given Node. The parent must implement the
             * ITemplateControl interface since only they can contain templates.
             */
            public compile(nodes: Node[], control?: ui.ITemplateControl): void;
            /**
             * Goes through the NodeList, finding elements that contain controls as well as
             * text that contains markup.
             * @param {NodeList} nodes The NodeList that is going to be compiled.
             * @param {plat.ui.ITemplateControl} control? The parent control for the given Node. The parent must implement the
             * ITemplateControl interface since only they can contain templates.
             */
            public compile(nodes: NodeList, control?: ui.ITemplateControl): void;
            /**
             * Iterates through the array of nodes creating IElementManagers on Element
             * nodes, ITextManagers on text nodes, and
             * ICommentManagers on comment nodes.
             * @param {Array<Node>} nodes The array of nodes to be compiled.
             * @param {plat.processing.IElementManager} manager The parent IElementManagers
             * for the given array of nodes.
             */
            /**
             * Iterates through the array of nodes creating Element Managers on Element
             * nodes, Text Managers on text nodes, and Comment Managers on comment nodes.
             * @param nodes The NodeList to be compiled.
             * @param manager The parent Element Manager for the given array of nodes.
             */
            public _compileNodes(nodes: Node[], manager: IElementManager): void;
        }
        /**
         * The Type for referencing the '$Compiler' injectable as a dependency.
         */
        function ICompiler(): ICompiler;
        /**
         * Describes an object that iterates through the DOM and collects controls.
         */
        interface ICompiler {
            /**
             * Goes through the child Nodes of the given Node, finding elements that contain controls as well as
             * text that contains markup.
             * @param {Node} node The node whose childNodes are going to be compiled.
             * @param {plat.ui.ITemplateControl} control? The parent control for the given Node. The parent must implement the
             * ITemplateControl interface since only they can contain templates.
             */
            compile(node: Node, control?: ui.ITemplateControl): void;
            /**
             * Goes through the Node array, finding elements that contain controls as well as
             * text that contains markup.
             * @param {Array<Node>} nodes The nodes that are going to be compiled.
             * @param {plat.ui.ITemplateControl} control? The parent control for the given Node. The parent must implement the
             * ITemplateControl interface since only they can contain templates.
             */
            compile(nodes: Node[], control?: ui.ITemplateControl): void;
            /**
             * Goes through the NodeList, finding elements that contain controls as well as
             * text that contains markup.
             * @param {NodeList} nodes The NodeList that is going to be compiled.
             * @param {plat.ui.ITemplateControl} control? The parent control for the given Node. The parent must implement the
             * ITemplateControl interface since only they can contain templates.
             */
            compile(nodes: NodeList, control?: ui.ITemplateControl): void;
        }
        /**
         * Responsible for data binding a data context to a Node.
         */
        class NodeManager implements INodeManager {
            /**
             * Reference to the IContextManagerStatic injectable.
             */
            static $ContextManagerStatic: observable.IContextManagerStatic;
            /**
             * Reference to the IParser injectable.
             */
            static $Parser: expressions.IParser;
            /**
             * Reference to the ITemplateControlFactory injectable.
             */
            static $TemplateControlFactory: ui.ITemplateControlFactory;
            /**
             * Given an IParsedExpression array, creates an array of unique identifers
             * to use with binding. This allows us to avoid creating multiple listeners for the identifier and node.
             * @param {Array<plat.expressions.IParsedExpression>} expressions An array of parsed expressions to search for identifiers.
             */
            static findUniqueIdentifiers(expressions: expressions.IParsedExpression[]): string[];
            /**
             * Determines if a string has the markup notation.
             * @param {string} text The text string in which to search for markup.
             */
            static hasMarkup(text: string): boolean;
            /**
             * Given a string, finds markup in the string and creates an array of
             * IParsedExpression.
             * @param {string} text The text string in which to search for markup.
             * composes the output given a proper context.
             */
            static findMarkup(text: string): expressions.IParsedExpression[];
            /**
             * Takes in a control with a data context and an array of IParsedExpression
             * and outputs a string of the evaluated expressions.
             * @param {Array<plat.expressions.IParsedExpression>} expressions The composition array to evaluate.
             * @param {plat.ui.ITemplateControl} control? The ITemplateControl used to parse
             * the expressions.
             */
            static build(expressions: expressions.IParsedExpression[], control?: ui.ITemplateControl): string;
            /**
             * Registers a listener to be notified of a change in any associated identifier.
             * @param {Array<string>} identifiers An Array of identifiers to observe.
             * @param {plat.ui.ITemplateControl} control The ITemplateControl associated
             * to the identifiers.
             * @param {(...args: Array<any>) => void} listener The listener to call when any identifier property changes.
             */
            static observeIdentifiers(identifiers: string[], control: ui.ITemplateControl, listener: (...args: any[]) => void): void;
            /**
             * A regular expression for finding markup
             */
            static _markupRegex: RegExp;
            /**
             * A regular expression for finding newline characters.
             */
            static _newLineRegex: RegExp;
            /**
             * Wraps constant text as a static IParsedExpression.
             * @param text The text to wrap into a static expression.
             */
            static _wrapExpression(text: string): expressions.IParsedExpression;
            /**
             * The type of INodeManager.
             */
            public type: string;
            /**
             * The INodeMap for this INodeManager.
             * Contains the compiled Node.
             */
            public nodeMap: INodeMap;
            /**
             * The parent IElementManager.
             */
            public parent: IElementManager;
            /**
             * Whether or not this INodeManager is a clone.
             */
            public isClone: boolean;
            /**
             * Initializes the manager's properties.
             * @param {plat.processing.INodeMap} nodeMap The mapping associated with this manager. We have to use an
             * Used to treat all INodeManagers the same.
             * @param {plat.processing.IElementManager} parent The parent IElementManager.
             */
            public initialize(nodeMap: INodeMap, parent: IElementManager): void;
            /**
             * Retrieves the parent control associated with the parent manager.
             */
            public getParentControl(): ui.ITemplateControl;
            /**
             * Clones this INodeManager with the new node.
             * @param {Node} newNode The new node associated with the new manager.
             * @param {plat.processing.IElementManager} parentManager The parent
             * IElementManager for the clone.
             */
            public clone(newNode: Node, parentManager: IElementManager): number;
            /**
             * The function used for data-binding a data context to the DOM.
             */
            public bind(): void;
        }
        /**
         * The Type for referencing the '$NodeManagerStatic' injectable as a dependency.
         */
        function INodeManagerStatic($Regex?: expressions.IRegex, $ContextManagerStatic?: observable.IContextManagerStatic, $Parser?: expressions.IParser, $TemplateControlFactory?: ui.ITemplateControlFactory): INodeManagerStatic;
        /**
         * Performs essential Node management and binding functions.
         */
        interface INodeManagerStatic {
            /**
             * Given an IParsedExpression array, creates an array of unique identifers
             * to use with binding. This allows us to avoid creating multiple listeners for the identifier and node.
             * @param {Array<plat.expressions.IParsedExpression>} expressions An array of parsed expressions to search for identifiers.
             */
            findUniqueIdentifiers(expressions: expressions.IParsedExpression[]): string[];
            /**
             * Determines if a string has the markup notation.
             * @param {string} text The text string in which to search for markup.
             */
            hasMarkup(text: string): boolean;
            /**
             * Given a string, finds markup in the string and creates an array of
             * IParsedExpression.
             * @param {string} text The text string in which to search for markup.
             * composes the output given a proper context.
             */
            findMarkup(text: string): expressions.IParsedExpression[];
            /**
             * Takes in a control with a data context and an array of IParsedExpression
             * and outputs a string of the evaluated expressions.
             * @param {Array<plat.expressions.IParsedExpression>} expressions The composition array to evaluate.
             * @param {plat.ui.ITemplateControl} control? The ITemplateControl used to parse
             * the expressions.
             */
            build(expressions: expressions.IParsedExpression[], control?: ui.ITemplateControl): string;
            /**
             * Registers a listener to be notified of a change in any associated identifier.
             * @param {Array<string>} identifiers An Array of identifiers to observe.
             * @param {plat.ui.ITemplateControl} control The ITemplateControl associated
             * to the identifiers.
             * @param {(...args: Array<any>) => void} listener The listener to call when any identifier property changes.
             */
            observeIdentifiers(identifiers: string[], control: ui.ITemplateControl, listener: (...args: any[]) => void): void;
        }
        /**
         * Describes an object that takes a Node and provides a way to data-bind to that node.
         */
        interface INodeManager {
            /**
             * The type of INodeManager.
             */
            type: string;
            /**
             * The INodeMap for this INodeManager.
             * Contains the compiled Node.
             */
            nodeMap?: INodeMap;
            /**
             * The parent IElementManager.
             */
            parent?: IElementManager;
            /**
             * Whether or not this INodeManager is a clone.
             */
            isClone?: boolean;
            /**
             * Initializes the manager's properties.
             * @param {plat.processing.INodeMap} nodeMap The mapping associated with this manager. We have to use an
             * Used to treat all INodeManagers the same.
             * @param {plat.processing.IElementManager} parent The parent IElementManager.
             */
            initialize? (nodeMap: INodeMap, parent: IElementManager): void;
            /**
             * Retrieves the parent control associated with the parent manager.
             */
            getParentControl? (): ui.ITemplateControl;
            /**
             * Clones this INodeManager with the new node.
             * @param {Node} newNode The new node associated with the new manager.
             * @param {plat.processing.IElementManager} parentManager The parent
             * IElementManager for the clone.
             */
            clone? (newNode: Node, parentManager: IElementManager): number;
            /**
             * The function used for data-binding a data context to the DOM.
             */
            bind(): void;
        }
        /**
         * Describes a compiled Node.
         */
        interface INode {
            /**
             * The control associated with the Node, if one exists.
             */
            control?: IControl;
            /**
             * The Node that is compiled.
             */
            node?: Node;
            /**
             * The name of the Node.
             */
            nodeName?: string;
            /**
             * Any IParsedExpressions contained in the Node.
             */
            expressions?: expressions.IParsedExpression[];
            /**
             * Unique identifiers contained in the Node.
             */
            identifiers?: string[];
            /**
             * The injector for a control associated with the Node, if one exists.
             */
            injector?: dependency.IInjector<IControl>;
        }
        /**
         * Defines the interface for a compiled Element.
         */
        interface IUiControlNode extends INode {
            /**
             * The control associated with the Element, if one exists.
             */
            control: ui.ITemplateControl;
            /**
             * The resources element, if one exists, defined as the control element's first
             * element child.
             */
            resourceElement?: HTMLElement;
        }
        /**
         * Describes a compiled Element with all
         * associated nodes contained within its tag.
         */
        interface INodeMap {
            /**
             * The Element that is compiled.
             */
            element?: HTMLElement;
            /**
             * The compiled attribute Nodes for the Element.
             */
            nodes: INode[];
            /**
             * An object of key/value attribute pairs.
             */
            attributes?: IObject<string>;
            /**
             * The relative context path for the node's corresponding
             * ITemplateControl, if specified.
             */
            childContext?: string;
            /**
             * Indicates whether or not an IControl was found on the Element.
             */
            hasControl?: boolean;
            /**
             * A type of INode for a node that contains a ITemplateControl,
             * if one was found for the Element.
             */
            uiControlNode?: IUiControlNode;
        }
        /**
         * A class used to manage element nodes. Provides a way for compiling and binding the
         * element/template. Also provides methods for cloning an
         * IElementManager.
         */
        class ElementManager extends NodeManager implements IElementManager {
            /**
             * Reference to the Document injectable.
             */
            static $Document: Document;
            /**
             * Reference to a cache injectable that stores IElementManagers.
             */
            static $ManagerCache: storage.ICache<IElementManager>;
            /**
             * Reference to the IResourcesFactory injectable.
             */
            static $ResourcesFactory: ui.IResourcesFactory;
            /**
             * Reference to the IBindableTemplatesFactory injectable.
             */
            static $BindableTemplatesFactory: ui.IBindableTemplatesFactory;
            /**
             * Determines if the associated Element has controls that need to be instantiated or Attr nodes
             * containing text markup. If controls exist or markup is found a new
             * ElementManager will be created,
             * else an empty INodeManager will be added to the Array of
             * INodeManagers.
             * @param {Element} element The Element to use to identifier markup and controls.
             * @param {plat.processing.IElementManager} parent? The parent IElementManager
             * used for context inheritance.
             */
            static create(element: Element, parent?: IElementManager): IElementManager;
            /**
             * Looks through the Node's child nodes to try and find any
             * defined IResources in a <plat-resources> tags.
             * @param {Node} node The node whose child nodes may contain IResources.
             */
            static locateResources(node: Node): HTMLElement;
            /**
             * Clones an IElementManager with a new element.
             * @param {plat.processing.IElementManager} sourceManager The original IElementManager.
             * @param {plat.processing.IElementManager} parent The parent IElementManager
             * for the new clone.
             * @param {Element} element The new element to associate with the clone.
             * @param {plat.ui.ITemplateControl} newControl? An optional control to associate with the clone.
             * @param {plat.processing.INodeMap} nodeMap? The {@link plat.processing.INodeMap} used to clone this
             * IElementManager.
             */
            static clone(sourceManager: IElementManager, parent: IElementManager, element: Element, newControl?: ui.ITemplateControl, nodeMap?: INodeMap): IElementManager;
            /**
             * Clones an ITemplateControl with a new INodeMap.
             * @param {plat.processing.INodeMap} sourceMap The source INodeMap used to clone the
             * ITemplateControl.
             * @param {plat.ui.ITemplateControl} parent The parent control of the clone.
             */
            static cloneUiControl(sourceMap: INodeMap, parent: ui.ITemplateControl): ui.ITemplateControl;
            /**
             * Creates new INodes corresponding to the element
             * associated with the INodeMap or the passed-in element.
             * @param {plat.processing.INodeMap} nodeMap The INodeMap that contains
             * the attribute nodes.
             * @param {plat.ui.ITemplateControl} parent The parent ITemplateControl for
             * the newly created controls.
             * @param {plat.ui.ITemplateControl} templateControl? The ITemplateControl
             * linked to these created controls if one exists.
             * @param {Element} newElement? An optional element to use for attributes (used in cloning).
             * @param {boolean} isClone? Whether or not these controls are clones.
             */
            static createAttributeControls(nodeMap: INodeMap, parent: ui.ITemplateControl, templateControl?: ui.ITemplateControl, newElement?: Element, isClone?: boolean): INode[];
            /**
             * Returns a new instance of an ElementManager.
             */
            static getInstance(): IElementManager;
            /**
             * Iterates over the attributes (NamedNodeMap), creating an INodeMap.
             * This map will contain injectors for all the IControls as well as parsed expressions
             * and identifiers found for each Attribute (useful for data binding).
             * @param {NamedNodeMap} attributes The attributes used to create the INodeMap.
             */
            static _collectAttributes(attributes: NamedNodeMap): INodeMap;
            /**
             * Used to copy the attribute nodes during the cloning process.
             * @param {Array<plat.processing.INode>} nodes The compiled INodes
             * to be cloned.
             */
            static _copyAttributeNodes(nodes: INode[]): INode[];
            /**
             * Clones an INode with a new node.
             * @param {plat.processing.INode} sourceNode The original INode.
             * @param {Node} node The new node used for cloning.
             * @param {plat.ui.ITemplateControl} newControl? An optional new control to associate with the cloned node.
             */
            static _cloneNode(sourceNode: INode, node: Node, newControl?: ui.ITemplateControl): INode;
            /**
             * Clones an INodeMap with a new element.
             * @param {plat.processing.INodeMap} sourceMap The original INodeMap.
             * @param {Element} element The new Element used for cloning.
             * @param {plat.ui.ITemplateControl} parent The ITemplateControl associated
             * with the parent IElementManager.
             * @param {plat.ui.ITemplateControl} newControl? An optional new ITemplateControl
             * to associate with the element.
             */
            static _cloneNodeMap(sourceMap: INodeMap, element: Element, parent: ui.ITemplateControl, newControl?: ui.ITemplateControl): INodeMap;
            /**
             * Reference to the IPromise injectable.
             */
            public $Promise: async.IPromise;
            /**
             * Reference to the ICompiler injectable.
             */
            public $Compiler: ICompiler;
            /**
             * Reference to the IContextManagerStatic injectable.
             */
            public $ContextManagerStatic: observable.IContextManagerStatic;
            /**
             * Reference to the ICommentManagerFactory injectable.
             */
            public $CommentManagerFactory: ICommentManagerFactory;
            /**
             * Reference to the IControlFactory injectable.
             */
            public $ControlFactory: IControlFactory;
            /**
             * Reference to the ITemplateControlFactory injectable.
             */
            public $TemplateControlFactory: ui.ITemplateControlFactory;
            /**
             * The child managers for this manager.
             */
            public children: INodeManager[];
            /**
             * Specifies the type for this INodeManager.
             * It's value is "element".
             */
            public type: string;
            /**
             * Specifies whether or not this manager has a ITemplateControl which has a
             * replaceWith property set to null or empty string.
             */
            public replace: boolean;
            /**
             * Indicates whether the ITemplateControl for this manager has its own context
             * or inherits it from a parent.
             */
            public hasOwnContext: boolean;
            /**
             * The length of a replaced control, indicates the number of nodes to slice
             * out of the parent's childNodes.
             */
            public replaceNodeLength: number;
            /**
             * In the event that a control has its own context, we need a promise to fullfill
             * when the control is loaded to avoid loading its parent control first.
             */
            public loadedPromise: async.IThenable<void>;
            /**
             * In the event that a control does not have its own context, we need a promise to fullfill
             * when the control's context has been set.
             */
            public contextPromise: async.IThenable<void>;
            /**
             * A promise that is set when an ITemplateControl specifies a templateUrl
             * and its HTML needs to be asynchronously obtained.
             */
            public templatePromise: async.IThenable<void>;
            /**
             * Clones the IElementManager with a new node.
             * @param {Node} newNode The new element used to clone the ElementManager.
             * @param {plat.processing.IElementManager} parentManager The parent manager for the clone.
             * @param {plat.processing.INodeMap} nodeMap? An optional INodeMap to clone a ui control if needed.
             */
            public clone(newNode: Node, parentManager: IElementManager, nodeMap?: INodeMap): number;
            /**
             * Initializes both the manager itself and all the controls associated to the manager's
             * INodeMap.
             * @param {plat.processing.INodeMap} nodeMap A map of the nodes (element and attributes)
             * associated with this IElementManager.
             * @param {plat.processing.IElementManager} parent The parent
             * IElementManager.
             * @param {boolean} dontInitialize? Specifies whether or not the initialize method should
             * be called for a ITemplateControl if one is attached
             * to this IElementManager.
             */
            public initialize(nodeMap: INodeMap, parent: IElementManager, dontInitialize?: boolean): void;
            /**
             * Links the data context to the DOM (data-binding).
             * IElementManager's associated
             * INodeMap.
             */
            public bind(): IControl[];
            /**
             * Sets the template for an manager by obtaining any needed HTML templates and
             * calling its associated ITemplateControl's
             * setTemplate method.
             * @param {string} templateUrl? The URL for the associated ITemplateControl's
             * HTML template.
             */
            public setUiControlTemplate(templateUrl?: string): void;
            /**
             * Retrieves the ITemplateControl instance
             * associated with this IElementManager.
             * associated with this IElementManager.
             */
            public getUiControl(): ui.ITemplateControl;
            /**
             * Fullfills any template promises and finishes the compile phase for the HTML template associated
             * with this IElementManager.
             * child manager's templates have been fulfilled.
             */
            public fulfillTemplate(): async.IThenable<void>;
            /**
             * Binds context to the DOM and loads controls.
             * child manager's controls have been bound and loaded.
             */
            public bindAndLoad(): async.IThenable<void>;
            /**
             * Observes the root context for controls that specify their own context, and initiates
             * a load upon a successful set of the context.
             * @param {plat.ui.ITemplateControl} root The ITemplateControl specifying its own context.
             * @param {() => async.IThenable<void>} loadMethod The function to initiate the loading of the root control and its
             * children.
             */
            public observeRootContext(root: ui.ITemplateControl, loadMethod: () => async.IThenable<void>): void;
            /**
             * Finalizes all the properties on an ITemplateControl
             * before loading.
             * @param {plat.ui.ITemplateControl} uiControl The control to finalize.
             * @param {string} absoluteContextPath The absoluteContextPath of the uiControl.
             */
            public _beforeLoad(uiControl: ui.ITemplateControl, absoluteContextPath: string): void;
            /**
             * Binds context to the DOM and calls bindAndLoad on all children.
             * child manager's controls have been bound and loaded.
             */
            public _bindChildren(): async.IThenable<void[]>;
            /**
             * Observes the identifiers associated with this manager's INodes.
             * @param {Array<plat.processing.INode>} nodes The array of INodes to iterate through.
             * @param {plat.ui.ITemplateControl} parent The parent ITemplateControl for context.
             * @param {Array<plat.IControl>} controls The array of controls whose attributes will need to be updated
             * upon the context changing.
             */
            public _observeControlIdentifiers(nodes: INode[], parent: ui.ITemplateControl, controls: IControl[]): void;
            /**
             * Loads the potential attribute based controls associated with this
             * IElementManager and
             * attaches the corresponding ITemplateControl if available.
             * @param {Array<plat.IAttributeControl>} controls The array of attribute based controls to load.
             * @param {plat.ui.ITemplateControl} templateControl The ITemplateControl
             * associated with this manager.
             */
            public _loadControls(controls: IAttributeControl[], templateControl: ui.ITemplateControl): async.IThenable<void>;
            /**
             * Fulfills the template promise prior to binding and loading the control.
             * its associated controls are bound and loaded.
             */
            public _fulfillAndLoad(): async.IThenable<void>;
            /**
             * Populates the ITemplateControl properties associated with this manager
             * if one exists.
             */
            public _populateUiControl(): void;
            /**
             * Removes the ITemplateControl's element. Called if its replaceWith property is
             * null or empty string.
             * @param {plat.ui.ITemplateControl} control The ITemplateControl whose element
             * will be removed.
             * @param {plat.processing.INodeMap} nodeMap The INodeMap associated with this manager.
             */
            public _replaceElement(control: ui.ITemplateControl, nodeMap: INodeMap): void;
            /**
             * Initializes a control's template and compiles the control.
             * @param {plat.ui.ITemplateControl} uiControl The ITemplateControl
             * associated with this manager.
             * @param {DocumentFragment} template The associated ITemplateControl's
             * template.
             */
            public _initializeControl(uiControl: ui.ITemplateControl, template: DocumentFragment): void;
            /**
             * A function to handle updating an attribute on all controls that have it
             * as a property upon a change in its value.
             * @param {plat.processing.INode} node The INode where the change occurred.
             * @param {plat.ui.ITemplateControl} parent The parent ITemplateControl used for context.
             * @param {Array<plat.IControl>} controls The controls that have the changed attribute as a property.
             */
            public _attributeChanged(node: INode, parent: ui.ITemplateControl, controls: IControl[]): void;
            /**
             * Runs through all the children of this manager and calls fulfillTemplate.
             * child managers have fullfilled their templates.
             */
            public _fulfillChildTemplates(): async.IThenable<void>;
        }
        /**
         * The Type for referencing the '$ElementManagerFactory' injectable as a dependency.
         */
        function IElementManagerFactory($Document?: Document, $ManagerCache?: storage.ICache<IElementManager>, $ResourcesFactory?: ui.IResourcesFactory, $BindableTemplatesFactory?: ui.IBindableTemplatesFactory): IElementManagerFactory;
        /**
         * Creates and manages a class for dealing with Element nodes.
         */
        interface IElementManagerFactory {
            /**
             * Determines if the associated Element has controls that need to be instantiated or Attr nodes
             * containing text markup. If controls exist or markup is found a new
             * ElementManager will be created,
             * else an empty INodeManager will be added to the Array of
             * INodeManagers.
             * @param {Element} element The Element to use to identifier markup and controls.
             * @param {plat.processing.IElementManager} parent? The parent IElementManager
             * used for context inheritance.
             */
            create(element: Element, parent?: IElementManager): IElementManager;
            /**
             * Creates new INodes corresponding to the element
             * associated with the INodeMap or the passed-in element.
             * @param {plat.processing.INodeMap} nodeMap The INodeMap that contains
             * the attribute nodes.
             * @param {plat.ui.ITemplateControl} parent The parent ITemplateControl for
             * the newly created controls.
             * @param {plat.ui.ITemplateControl} templateControl? The ITemplateControl
             * linked to these created controls if one exists.
             * @param {Element} newElement? An optional element to use for attributes (used in cloning).
             * @param {boolean} isClone? Whether or not these controls are clones.
             */
            createAttributeControls(nodeMap: INodeMap, parent: ui.ITemplateControl, templateControl?: ui.ITemplateControl, newElement?: Element, isClone?: boolean): INode[];
            /**
             * Clones an ITemplateControl with a new INodeMap.
             * @param {plat.processing.INodeMap} sourceMap The source INodeMap used to clone the
             * ITemplateControl.
             * @param {plat.ui.ITemplateControl} parent The parent control of the clone.
             */
            cloneUiControl(sourceMap: INodeMap, parent: ui.ITemplateControl): ui.ITemplateControl;
            /**
             * Clones an IElementManager with a new element.
             * @param {plat.processing.IElementManager} sourceManager The original IElementManager.
             * @param {plat.processing.IElementManager} parent The parent IElementManager
             * for the new clone.
             * @param {Element} element The new element to associate with the clone.
             * @param {plat.ui.ITemplateControl} newControl? An optional control to associate with the clone.
             * @param {plat.processing.INodeMap} nodeMap? The {@link plat.processing.INodeMap} used to clone this
             * IElementManager.
             */
            clone(sourceManager: IElementManager, parent: IElementManager, element: Element, newControl?: ui.ITemplateControl, nodeMap?: INodeMap): IElementManager;
            /**
             * Looks through the Node's child nodes to try and find any
             * defined IResources in a <plat-resources> tags.
             * @param {Node} node The node whose child nodes may contain IResources.
             */
            locateResources(node: Node): HTMLElement;
            /**
             * Returns a new instance of an ElementManager.
             */
            getInstance(): IElementManager;
        }
        /**
         * Responsible for initializing and data-binding controls associated to an Element.
         */
        interface IElementManager extends INodeManager {
            /**
             * The child managers for this manager.
             */
            children: INodeManager[];
            /**
             * Specifies whether or not this manager has a ITemplateControl which has a
             * replaceWith property set to null or empty string.
             */
            replace: boolean;
            /**
             * The length of a replaced control, indicates the number of nodes to slice
             * out of the parent's childNodes.
             */
            replaceNodeLength: number;
            /**
             * Indicates whether the ITemplateControl for this manager has its own context
             * or inherits it from a parent.
             */
            hasOwnContext: boolean;
            /**
             * Lets us know when an IElementManager is a cloned manager, or the compiled
             * manager from IBindableTemplates. We do not want to bind and load compiled
             * managers that are clones.
             */
            isClone: boolean;
            /**
             * In the event that a control has its own context, we need a promise to fullfill
             * when the control is loaded to avoid loading its parent control first.
             */
            loadedPromise: async.IThenable<void>;
            /**
             * In the event that a control does not have its own context, we need a promise to fullfill
             * when the control's context has been set.
             */
            contextPromise: async.IThenable<void>;
            /**
             * A promise that is set when an ITemplateControl specifies a templateUrl
             * and its HTML needs to be asynchronously obtained.
             */
            templatePromise: async.IThenable<void>;
            /**
             * Clones the IElementManager with a new node.
             * @param {Node} newNode The new element used to clone the ElementManager.
             * @param {plat.processing.IElementManager} parentManager The parent manager for the clone.
             * @param {plat.processing.INodeMap} nodeMap? An optional INodeMap to clone a ui control if needed.
             */
            clone(newNode: Node, parentManager: IElementManager, nodeMap?: INodeMap): number;
            /**
             * Initializes both the manager itself and all the controls associated to the manager's
             * INodeMap.
             * @param {plat.processing.INodeMap} nodeMap A map of the nodes (element and attributes)
             * associated with this IElementManager.
             * @param {plat.processing.IElementManager} parent The parent
             * IElementManager.
             * @param {boolean} dontInitialize? Specifies whether or not the initialize method should
             * be called for a ITemplateControl if one is attached
             * to this IElementManager.
             */
            initialize(nodeMap: INodeMap, parent: IElementManager, dontInitialize?: boolean): void;
            /**
             * Links the data context to the DOM (data-binding).
             * IElementManager's associated
             * INodeMap.
             */
            bind(): void;
            /**
             * Sets the template for an manager by obtaining any needed HTML templates and
             * calling its associated ITemplateControl's
             * setTemplate method.
             * @param {string} templateUrl? The URL for the associated ITemplateControl's
             * HTML template.
             */
            setUiControlTemplate(templateUrl?: string): void;
            /**
             * Retrieves the ITemplateControl instance
             * associated with this IElementManager.
             * associated with this IElementManager.
             */
            getUiControl(): ui.ITemplateControl;
            /**
             * Fullfills any template promises and finishes the compile phase for the HTML template associated
             * with this IElementManager.
             * child manager's templates have been fulfilled.
             */
            fulfillTemplate(): async.IThenable<void>;
            /**
             * Observes the root context for controls that specify their own context, and initiates
             * a load upon a successful set of the context.
             * @param {plat.ui.ITemplateControl} root The ITemplateControl specifying its own context.
             * @param {() => async.IThenable<void>} loadMethod The function to initiate the loading of the root control and its
             * children.
             */
            observeRootContext(root: ui.ITemplateControl, loadMethod: () => async.IThenable<void>): void;
            /**
             * Binds context to the DOM and loads controls.
             * child manager's controls have been bound and loaded.
             */
            bindAndLoad(): async.IThenable<void>;
        }
        /**
         * The class responsible for initializing and data-binding values to text nodes.
         */
        class TextManager extends NodeManager implements ITextManager {
            /**
             * Determines if a text node has markup, and creates a ITextManager if it does.
             * An ITextManager responsible for markup in the passed in node or an empty
             * ITextManager if not markup is found will be added to the managers array.
             * @param {Node} node The Node used to find markup.
             * @param {plat.processing.IElementManager} parent The parent IElementManager
             * for the node.
             * responsible for the passed in Text Node.
             */
            static create(node: Node, parent: IElementManager): ITextManager;
            /**
             * Clones an INodeMap with a new text node.
             * @param {plat.processing.INodeMap} sourceMap The original INodeMap.
             * @param {Node} newNode The new text node used for cloning.
             */
            static _cloneNodeMap(sourceMap: INodeMap, newNode: Node): INodeMap;
            /**
             * Clones a ITextManager with a new text node.
             * @param {plat.processing.INodeManager} sourceManager The original INodeManager.
             * @param {Node} node The new text node to associate with the clone.
             * @param {plat.processing.IElementManager} parent The parent IElementManager
             * for the new clone.
             */
            static _clone(sourceManager: INodeManager, node: Node, parent: IElementManager): ITextManager;
            /**
             * Specifies the type for this INodeManager.
             * It's value is "text".
             */
            public type: string;
            /**
             * Clones this ITextManager with a new node.
             * @param {Node} newNode The new node attached to the cloned ITextManager.
             * @param {plat.processing.IElementManager} parentManager The parent IElementManager
             * for the clone.
             */
            public clone(newNode: Node, parentManager: IElementManager): number;
            /**
             * The function used for data-binding a data context to the DOM.
             */
            public bind(): void;
            /**
             * Builds the node expression and sets the value.
             * @param {Node} Node The associated node whose value will be set.
             * @param {plat.ui.ITemplateControl} control The control whose context will be used to bind
             * the data.
             * @param {Array<plat.expressions.IParsedExpression>} expressions An array of parsed expressions used to build
             * the node value.
             */
            public _setText(node: Node, control: ui.ITemplateControl, expressions: expressions.IParsedExpression[]): void;
        }
        /**
         * The Type for referencing the '$TextManagerFactory' injectable as a dependency.
         */
        function ITextManagerFactory(): ITextManagerFactory;
        /**
         * Creates and manages a class for dealing with DOM Text Nodes.
         */
        interface ITextManagerFactory {
            /**
             * Determines if a text node has markup, and creates a ITextManager if it does.
             * An ITextManager responsible for markup in the passed in node or an empty
             * ITextManager if not markup is found will be added to the managers array.
             * @param {Node} node The Node used to find markup.
             * @param {plat.processing.IElementManager} parent The parent IElementManager
             * for the node.
             * responsible for the passed in Text Node.
             */
            create(node: Node, parent?: IElementManager): ITextManager;
        }
        /**
         * An object responsible for initializing and data-binding values to text nodes.
         */
        interface ITextManager extends INodeManager {
            /**
             * Clones this ITextManager with a new node.
             * @param {Node} newNode The new node attached to the cloned ITextManager.
             * @param {plat.processing.IElementManager} parentManager The parent IElementManager
             * for the clone.
             */
            clone(newNode: Node, parentManager: IElementManager): number;
            /**
             * The function used for data-binding a data context to the DOM.
             */
            bind(): void;
        }
        /**
         * A class used to manage Comment nodes. Provides a way to
         * clone a Comment node.
         */
        class CommentManager extends NodeManager implements ICommentManager {
            /**
             * Creates a new CommentManager for the given Comment node.
             * @param {Node} node The Comment to associate with the new manager.
             * @param {plat.processing.IElementManager} parent The parent
             * IElementManager.
             * responsible for the passed in Comment Node.
             */
            static create(node: Node, parent: IElementManager): ICommentManager;
            /**
             * Specifies the type for this INodeManager.
             * It's value is "comment".
             */
            public type: string;
            /**
             * A method for cloning this manager with a new Comment.
             * @param {Node} newNode The new Comment node to associate with the cloned
             * manager.
             * @param {plat.processing.IElementManager} parentManager The parent IElementManager
             * for the clone.
             */
            public clone(newNode: Node, parentManager: IElementManager): number;
        }
        /**
         * The Type for referencing the '$CommentManagerFactory' injectable as a dependency.
         */
        function ICommentManagerFactory(): ICommentManagerFactory;
        /**
         * Creates and manages a class for dealing with Comment nodes.
         */
        interface ICommentManagerFactory {
            /**
             * Creates a new CommentManager for the given Comment node.
             * @param {Node} node The Comment to associate with the new manager.
             * @param {plat.processing.IElementManager} parent The parent
             * IElementManager.
             * responsible for the passed in Comment Node.
             */
            create(node: Node, parent: IElementManager): ICommentManager;
        }
        /**
         * An object used to manage Comment nodes.
         */
        interface ICommentManager extends INodeManager {
            /**
             * A method for cloning this manager with a new Comment.
             * @param {Node} newNode The new Comment node to associate with the cloned
             * manager.
             * @param {plat.processing.IElementManager} parentManager The parent IElementManager
             * for the clone.
             */
            clone(newNode: Node, parentManager: IElementManager): number;
        }
    }
    /**
     * Holds classes and interfaces related to navigation in platypus.
     */
    module navigation {
        /**
         * A class that defines the base navigation properties and methods.
         */
        class BaseNavigator implements IBaseNavigator {
            /**
             * Reference to the IEventManagerStatic injectable.
             */
            public $EventManagerStatic: events.IEventManagerStatic;
            /**
             * Reference to the INavigationEventStatic injectable.
             */
            public $NavigationEventStatic: events.INavigationEventStatic;
            /**
             * Reference to the IBaseViewControlFactory injectable.
             */
            public $BaseViewControlFactory: ui.IBaseViewControlFactory;
            /**
             * Reference to the IContextManagerStatic injectable.
             */
            public $ContextManagerStatic: observable.IContextManagerStatic;
            /**
             * A unique ID used to identify this navigator.
             */
            public uid: string;
            /**
             * Set to true during "navigate" (i.e. while navigation is in progress), set to false during
             * "navigated" (i.e. after a navigation has successfully occurred).
             */
            public navigating: boolean;
            /**
             * The constructor for a BaseNavigator.
             * Defines a unique id and subscribes to the "goBack" event.
             */
            constructor();
            /**
             * Registers an {plat.ui.controls.IBaseport|IBaseport} with this navigator. The IBaseport will call this method and pass
             * itself in so the navigator can store it and use it to facilitate navigation. Every navigator must implement this method
             * in order to store the baseport.
             * @param {plat.ui.controls.IBaseport} baseport The {plat.ui.controls.IBaseport|IBaseport}
             * associated with this IBaseNavigator.
             */
            public registerPort(baseport: ui.controls.IBaseport): void;
            /**
             * Allows an IBaseViewControl to navigate to another
             * IBaseViewControl. Also allows for
             * navigation parameters to be sent to the new IBaseViewControl.
             * @param {any} navigationParameter? An optional navigation parameter to send to the next
             * IBaseViewControl.
             * @param {plat.navigation.IBaseNavigationOptions} options? Optional
             * IBaseNavigationOptions used for navigation.
             */
            public navigate(navigationParameter?: any, options?: IBaseNavigationOptions): void;
            /**
             * Called by the {plat.ui.controls.IBaseport|IBaseport} to make the
             * IBaseNavigator aware of a successful
             * navigation. The IBaseNavigator will
             * in-turn send the app.navigated event.
             * @param {plat.ui.IBaseViewControl} control The IBaseViewControl
             * to which the navigation occurred.
             * @param {any} parameter The navigation parameter sent to the control.
             * @param {plat.navigation.IBaseNavigationOptions} options The
             * IBaseNavigationOptions used during navigation.
             */
            public navigated(control: ui.IBaseViewControl, parameter: any, options: IBaseNavigationOptions): void;
            /**
             * Every navigator must implement this method, defining what happens when an
             * IBaseViewControl wants to go back.
             * @param {plat.navigation.IBaseBackNavigationOptions} options? Optional backwards navigation options of type
             * IBaseBackNavigationOptions.
             */
            public goBack(options?: IBaseBackNavigationOptions): void;
            /**
             * Every navigator can implement this method, defining what happens when the hard back button has been pressed
             * on a device. By default this method will call the goBack method.
             */
            public backButtonPressed(): void;
            /**
             * Cleans up memory.
             */
            public dispose(): void;
            /**
             * Sends an INavigationEvent with the given parameters.
             * The 'sender' property of the event will be this navigator.
             * @param {string} name The name of the event to send.
             * @param {any} target The target of the event, could be an IBaseViewControl
             * or a route depending upon this navigator and event name.
             * @param {plat.navigation.IBaseNavigationOptions} options The
             * IBaseNavigationOptions used during navigation
             * @param {boolean} cancelable Whether or not the event can be cancelled, preventing further navigation.
             * dispatch.
             */
            public _sendEvent(name: string, target: any, type: string, parameter: any, options: IBaseNavigationOptions, cancelable: boolean): events.INavigationEvent<any>;
        }
        /**
         * Defines the methods that a type of navigator must implement.
         */
        interface IBaseNavigator {
            /**
             * A unique ID used to identify this navigator.
             */
            uid: string;
            /**
             * Set to true during "navigate" (i.e. while navigation is in progress), set to false during
             * "navigated" (i.e. after a navigation has successfully occurred).
             */
            navigating: boolean;
            /**
             * Registers an {plat.ui.controls.IBaseport|IBaseport} with this navigator. The IBaseport will call this method and pass
             * itself in so the navigator can store it and use it to facilitate navigation.
             * @param {plat.ui.controls.IBaseport} baseport The {plat.ui.controls.IBaseport|IBaseport}
             * associated with this IBaseNavigator.
             */
            registerPort(baseport: ui.controls.IBaseport): void;
            /**
             * Allows an IBaseViewControl to navigate to another
             * IBaseViewControl. Also allows for
             * navigation parameters to be sent to the new IBaseViewControl.
             * @param {any} navigationParameter? An optional navigation parameter to send to the next
             * IBaseViewControl.
             * @param {plat.navigation.IBaseNavigationOptions} options? Optional
             * IBaseNavigationOptions used for navigation.
             */
            navigate(navigationParameter?: any, options?: IBaseNavigationOptions): void;
            /**
             * Called by the {plat.ui.controls.IBaseport|IBaseport} to make the
             * IBaseNavigator aware of a successful
             * navigation. The IBaseNavigator will
             * in-turn send the app.navigated event.
             * @param {plat.ui.IBaseViewControl} control The IBaseViewControl
             * to which the navigation occurred.
             * @param {any} parameter The navigation parameter sent to the control.
             * @param {plat.navigation.IBaseNavigationOptions} options The
             * IBaseNavigationOptions used during navigation.
             */
            navigated(control: ui.IBaseViewControl, parameter: any, options: IBaseNavigationOptions): void;
            /**
             * Every navigator must implement this method, defining what happens when an
             * IBaseViewControl wants to go back.
             * @param {plat.navigation.IBaseBackNavigationOptions} options? Optional backwards navigation options of type
             * IBaseBackNavigationOptions.
             */
            goBack(options?: IBaseBackNavigationOptions): void;
            /**
             * Every navigator can implement this method, defining what happens when the hard back button has been pressed
             * on a device. By default this method will call the goBack method.
             */
            backButtonPressed(): void;
            /**
             * Cleans up memory.
             */
            dispose(): void;
        }
        /**
         * Options that you can submit to an IBaseNavigator in order
         * to customize navigation.
         */
        interface IBaseNavigationOptions {
            /**
             * Allows an IBaseViewControl to leave itself out of the
             * navigation history.
             */
            replace?: boolean;
        }
        /**
         * Options that you can submit to an IBaseNavigator during a backward
         * navigation in order to customize the navigation.
         */
        interface IBaseBackNavigationOptions {
            /**
             * Lets the IBaseNavigator know to navigate back a specific length
             * in history.
             */
            length?: number;
        }
        /**
         * Allows IBaseViewControl to navigate within a
         * Viewport. Every Viewport
         * has its own Navigator instance, allowing multiple navigators to
         * coexist in one app.
         */
        class Navigator extends BaseNavigator implements INavigatorInstance {
            /**
             * Stores the instance of the main navigator. Unless otherwise specified, the main
             * navigator is the first instantiated navigator.
             */
            private static __mainNavigator;
            /**
             * Indicates whether or not a main navigator has been found. Main navigators respond to backbutton
             * events.
             */
            private static __mainNavigatorFound;
            /**
             * Contains the navigation history stack for the associated Viewport.
             */
            public history: INavigationState[];
            /**
             * Specifies the current state of navigation. This state should contain
             * enough information for it to be pushed onto the history stack when
             * necessary.
             */
            public currentState: INavigationState;
            /**
             * Every navigator will have an IBaseport with which to communicate and
             * facilitate navigation.
             */
            public viewport: ui.controls.IBaseport;
            /**
             * Registers an {plat.ui.controls.Viewport|Viewport} with this navigator.
             * The {plat.ui.controls.Viewport|Viewport} will call this method and pass
             * itself in so the navigator can store it and use it to facilitate navigation.
             * @param {plat.ui.controls.Viewport} viewport The {plat.ui.controls.Viewport|Viewport}
             * associated with this INavigator.
             * @param {boolean} main? Whether or not this
             */
            public registerPort(viewport: ui.controls.IBaseport, main?: boolean): void;
            /**
             * Allows an IBaseViewControl to navigate to another
             * IBaseViewControl. Also allows for
             * navigation parameters to be sent along with the navigation.
             * @param {new (...args: any[]) => ui.IBaseViewControl} Constructor The Constructor for the new
             * IBaseViewControl. This navigator will find the injector for
             * the Constructor and create a new instance of the control.
             * @param {plat.navigation.INavigationOptions} options? Optional
             * INavigationOptions used for navigation.
             */
            public navigate(Constructor: new(...args: any[]) => ui.IBaseViewControl, options?: INavigationOptions): void;
            /**
             * Allows an IBaseViewControl to navigate to another
             * IBaseViewControl. Also allows for
             * navigation parameters to be sent along with the navigation.
             * @param {string} name The name for the new IBaseViewControl.
             * The name is associated to the value used when the view control was registered.
             * @param {plat.navigation.INavigationOptions} options? Optional
             * INavigationOptions used for navigation.
             */
            public navigate(name: string, options?: INavigationOptions): void;
            /**
             * Allows an IBaseViewControl to navigate to another
             * IBaseViewControl. Also allows for
             * navigation parameters to be sent along with the navigation.
             * @param {new (...args: any[]) => plat.ui.IBaseViewControl} injector The IInjector
             * for the new IBaseViewControl. This navigator will create a new instance of the control.
             * @param {plat.navigation.INavigationOptions} options? Optional
             * INavigationOptions used for navigation.
             */
            public navigate(injector: dependency.IInjector<ui.IBaseViewControl>, options?: INavigationOptions): void;
            /**
             * Returns whether or not the current state matches the input Constructor.
             * @param {new (...args: any[]) => plat.ui.IBaseViewControl} Constructor The
             * IBaseViewControl constructor to match in the current state.
             */
            public isCurrentState(Constructor: new(...args: any[]) => ui.IBaseViewControl): boolean;
            /**
             * Returns whether or not the current state matches the input type.
             * @param {string} type The
             * IBaseViewControl type to match in the current state.
             */
            public isCurrentState(type: string): boolean;
            /**
             * Returns to the last visited IBaseViewControl.
             * @param {plat.navigation.IBackNavigationOptions} options? Optional
             * IBackNavigationOptions allowing the
             * IBaseViewControl to customize navigation. Enables
             * navigating back to a specified point in history as well as specifying a new templateUrl
             * to use at the next IBaseViewControl.
             */
            public goBack(options?: IBackNavigationOptions): void;
            /**
             * Looks for a backButtonPressed event on the current view control and uses it if it exists. Otherwise calls goBack if
             * this navigator is the main navigator.
             */
            public backButtonPressed(): void;
            /**
             * Lets the caller know if there are IBaseViewControl in the history,
             * meaning the caller is safe to perform a backward navigation.
             */
            public canGoBack(): boolean;
            /**
             * Clears the navigation history, disposing all the controls.
             */
            public clearHistory(): void;
            public navigated(control: ui.IViewControl, parameter: any, options: IBaseNavigationOptions): void;
            /**
             * Finds the given constructor in the history stack. Returns the index in the history where
             * the constructor is found, or -1 if no constructor is found.
             * @param {new (...args: any[]) => plat.ui.IBaseViewControl} Constructor The
             * IBaseViewControl constructor to search for in the history stack.
             */
            public _findInHistory(Constructor: new(...args: any[]) => ui.IBaseViewControl): number;
            /**
             * Finds the given constructor in the history stack. Returns the index in the history where
             * the constructor is found, or -1 if no constructor is found.
             * @param {new (...args: any[]) => plat.ui.IBaseViewControl} Constructor The
             * IBaseViewControl constructor to search for in the history stack.
             */
            public _findInHistory(Constructor: string): number;
            /**
             * This method takes in a length and navigates back in the history, returning the
             * IBaseViewControl associated with length + 1 entries
             * back in the history.  It disposes all the IBaseViewControls
             * encapsulated in the length, but does not dispose the current IBaseViewControls.
             * @param {number} length The number of entries to go back in the history stack.
             * INavigationState.
             */
            public _goBackLength(length?: number): INavigationState;
        }
        /**
         * The Type for referencing the '$Navigator' injectable as a dependency.
         */
        function INavigatorInstance(): INavigatorInstance;
        /**
         * An object that allows IBaseViewControl to implement methods
         * used to navigate within a Viewport.
         */
        interface INavigatorInstance extends IBaseNavigator {
            /**
             * Contains the navigation history stack for the associated Viewport.
             */
            history: INavigationState[];
            /**
             * Specifies the current state of navigation. This state should contain
             * enough information for it to be pushed onto the history stack when
             * necessary.
             */
            currentState: INavigationState;
            /**
             * Every navigator will have an IBaseport with which to communicate and
             * facilitate navigation.
             */
            viewport: ui.controls.IBaseport;
            /**
             * Allows an IBaseViewControl to navigate to another
             * IBaseViewControl. Also allows for
             * navigation parameters to be sent along with the navigation.
             * @param {new (...args: any[]) => ui.IBaseViewControl} Constructor The Constructor for the new
             * IBaseViewControl. This navigator will find the injector for
             * the Constructor and create a new instance of the control.
             * @param {plat.navigation.INavigationOptions} options? Optional
             * INavigationOptions used for navigation.
             */
            navigate(Constructor: new(...args: any[]) => ui.IBaseViewControl, options?: INavigationOptions): void;
            /**
             * Allows an IBaseViewControl to navigate to another
             * IBaseViewControl. Also allows for
             * navigation parameters to be sent along with the navigation.
             * @param {string} name The name for the new IBaseViewControl.
             * The name is associated to the value used when the view control was registered.
             * @param {plat.navigation.INavigationOptions} options? Optional
             * INavigationOptions used for navigation.
             */
            navigate(name: string, options?: INavigationOptions): void;
            /**
             * Allows an IBaseViewControl to navigate to another
             * IBaseViewControl. Also allows for
             * navigation parameters to be sent along with the navigation.
             * @param {new (...args: any[]) => plat.ui.IBaseViewControl} injector The IInjector
             * for the new IBaseViewControl. This navigator will create a new instance of the control.
             * @param {plat.navigation.INavigationOptions} options? Optional
             * INavigationOptions used for navigation.
             */
            navigate(injector: dependency.IInjector<ui.IBaseViewControl>, options?: INavigationOptions): void;
            /**
             * Returns to the last visited IBaseViewControl.
             * @param {plat.navigation.IBackNavigationOptions} options? Optional
             * IBackNavigationOptions allowing the
             * IBaseViewControl to customize navigation. Enables
             * navigating back to a specified point in history as well as specifying a new templateUrl
             * to use at the next IBaseViewControl.
             */
            goBack(options?: IBackNavigationOptions): void;
            /**
             * Lets the caller know if there are IBaseViewControl in the history,
             * meaning the caller is safe to perform a backward navigation.
             */
            canGoBack(): boolean;
            /**
             * Clears the navigation history, disposing all the controls.
             */
            clearHistory(): void;
        }
        /**
         * Options that you can submit to an INavigatorInstance in order
         * to customize navigation.
         */
        interface INavigationOptions extends IBaseNavigationOptions {
            /**
             * An optional parameter to send to the next IBaseViewControl.
             */
            parameter?: any;
            /**
             * If true it will not attempt to find the next view in the history, it will instantiate a new view.
             */
            initialize?: boolean;
        }
        /**
         * Options that you can submit to an INavigatorInstance during a backward
         * navigation in order to customize the navigation.
         */
        interface IBackNavigationOptions extends IBaseBackNavigationOptions {
            /**
             * An optional parameter to send to the next IBaseViewControl.
             */
            parameter?: any;
            /**
             * An IBaseViewControl Constructor that the
             * INavigatorInstance will use to navigate.
             * The INavigatorInstance will search for an instance
             * of the IBaseViewControl in its history and navigate to it.
             */
            ViewControl?: new(...args: any[]) => ui.IBaseViewControl;
        }
        /**
         * Defines the base interface that needs to be implemented in the navigation history.
         */
        interface INavigationState {
            /**
             * The IViewControl associated with a history entry.
             */
            control: ui.IViewControl;
        }
        /**
         * A type of navigator class that utilizes routing capabilities. It is directly associated with a
         * Routeport, thus only allowing one
         * RoutingNavigator per app.
         */
        class RoutingNavigator extends BaseNavigator implements IRoutingNavigator {
            /**
             * Reference to the IRouter injectable.
             */
            public $Router: web.IRouter;
            /**
             * Reference to the Window injectable.
             */
            public $Window: Window;
            /**
             * The routing information for the Routeport's current state.
             */
            public currentState: IRouteNavigationState;
            /**
             * Every navigator will have an IBaseport with which to communicate and
             * facilitate navigation.
             */
            public routeport: ui.controls.IBaseport;
            /**
             * A collection of listeners for removing event based listeners.
             */
            private __removeListeners;
            /**
             * The history length. Used to keep track of potential app shutdown.
             */
            private __historyLength;
            /**
             * Initializes this navigator. The {plat.ui.controls.Routeport|Routeport} will call this method and pass
             * itself in so the navigator can store it and use it to facilitate navigation. Also subscribes to
             * 'routeChanged' and 'beforeRouteChange' events.
             * @param {plat.ui.controls.IBaseport} routeport The {plat.ui.controls.Routeport|Routeport}
             * associated with this IRoutingNavigator.
             */
            public registerPort(routeport: ui.controls.IBaseport): void;
            /**
             * Allows a IBaseViewControl to navigate to another
             * IBaseViewControl. Also allows for
             * navigation parameters to be sent to the new IBaseViewControl.
             * @param {string} path The URL path to navigate to.
             * @param {plat.web.IRouteNavigationOptions} options? Optional IRouteNavigationOptions
             * for ignoring the current ui.IBaseViewControl in the history as well as specifying a new templateUrl
             * for the next IBaseViewControl to use.
             */
            public navigate(path: string, options?: web.IRouteNavigationOptions): void;
            /**
             * Called by the Routeport to make the Navigator aware of a successful navigation.
             * @param {plat.ui.IWebViewControl} control The IWebViewControl to which the
             * navigation occurred.
             * @param {plat.web.IRoute<any>} parameter The navigation parameter sent to the control.
             * @param {plat.web.IRouteNavigationOptions} options The options used during navigation.
             */
            public navigated(control: ui.IWebViewControl, parameter: web.IRoute<any>, options: web.IRouteNavigationOptions): void;
            /**
             * Returns to the last visited IBaseViewControl.
             * @param {plat.navigation.IBaseBackNavigationOptions} options? Optional
             * IBaseBackNavigationOptions allowing the
             * IBaseViewControl to customize navigation. Enables navigating
             * back to a specified point in history as well as specifying a new templateUrl to use at the
             * next IBaseViewControl.
             */
            public goBack(options?: IBaseBackNavigationOptions): void;
            /**
             * Cleans up memory.
             */
            public dispose(): void;
            /**
             * The method called prior to a route change event.
             * @param {plat.events.INavigationEvent<plat.web.IRoute<any>>} ev The
             * INavigationEvent containing information regarding
             * the IBaseViewControl, the routing information,
             * and the Router.
             */
            public _beforeRouteChange(ev: events.INavigationEvent<web.IRoute<any>>): void;
            /**
             * The method called when a route change is successfully performed and
             * IBaseViewControl navigation can occur.
             * @param {plat.events.INavigationEvent<plat.web.IRoute<any>>} ev The
             * INavigationEvent containing information regarding
             * the IBaseViewControl, the routing information,
             * and the Router.
             */
            public _onRouteChanged(ev: events.INavigationEvent<web.IRoute<any>>): void;
        }
        /**
         * The Type for referencing the '$RoutingNavigator' injectable as a dependency.
         */
        function IRoutingNavigator(): IRoutingNavigator;
        /**
         * Defines the methods that a navigator must implement if it chooses to utilize
         * routing capabilities.
         */
        interface IRoutingNavigator extends IBaseNavigator {
            /**
             * The routing information for the Routeport's current state.
             */
            currentState: IRouteNavigationState;
            /**
             * Initializes this navigator. The {plat.ui.controls.Routeport|Routeport} will call this method and pass
             * itself in so the navigator can store it and use it to facilitate navigation. Also subscribes to
             * 'routeChanged' and 'beforeRouteChange' events.
             * @param {plat.ui.controls.IBaseport} routeport The {plat.ui.controls.Routeport|Routeport}
             * associated with this IRoutingNavigator.
             */
            registerPort(routeport: ui.controls.IBaseport): void;
            /**
             * Allows a IBaseViewControl to navigate to another
             * IBaseViewControl. Also allows for
             * navigation parameters to be sent to the new IBaseViewControl.
             * @param {string} path The URL path to navigate to.
             * @param {plat.web.IRouteNavigationOptions} options? Optional IRouteNavigationOptions
             * for ignoring the current ui.IBaseViewControl in the history as well as specifying a new templateUrl
             * for the next IBaseViewControl to use.
             */
            navigate(path: string, options?: web.IRouteNavigationOptions): void;
            /**
             * Called by the Routeport to make the Navigator aware of a successful navigation.
             * @param {plat.ui.IWebViewControl} control The IWebViewControl to which the
             * navigation occurred.
             * @param {plat.web.IRoute<any>} parameter The navigation parameter sent to the control.
             * @param {plat.web.IRouteNavigationOptions} options The options used during navigation.
             */
            navigated(control: ui.IWebViewControl, parameter: web.IRoute<any>, options: web.IRouteNavigationOptions): void;
            /**
             * Returns to the last visited IBaseViewControl.
             * @param {plat.navigation.IBaseBackNavigationOptions} options? Optional
             * IBaseBackNavigationOptions allowing the
             * IBaseViewControl to customize navigation. Enables navigating
             * back to a specified point in history as well as specifying a new templateUrl to use at the
             * next IBaseViewControl.
             */
            goBack(options?: IBaseBackNavigationOptions): void;
        }
        /**
         * Defines the route type interface implemented for current state and last state.
         */
        interface IRouteNavigationState {
            /**
             * The IWebViewControl associated with a history entry.
             */
            control: ui.IWebViewControl;
            /**
             * The associated route information in the form of an
             * IRoute.
             */
            route: web.IRoute<any>;
        }
    }
    /**
     * Holds all classes and interfaces related to attribute control components in platypus.
     */
    module controls {
        /**
         * Allows for assigning a name to an Element or TemplateControl and referencing it
         * from parent controls.
         * This control is useful for avoiding query selectors since it will store itself on all of its ancestor controls using
         * the associated name.
         */
        class Name extends AttributeControl {
            /**
             * The property name on the ancestor controls to set as the INamedElement.
             */
            public _label: string;
            /**
             * Defines the property specified by the attribute value as the INamedElement
             * on all the ancestor controls, ignoring those that already have the property defined.
             */
            public initialize(): void;
            /**
             * Removes the INamedElement from the ancestor controls.
             */
            public dispose(): void;
            /**
             * Defines the property specified by the attribute value as the INamedElement
             * on all the ancestor controls, ignoring those that already have the property defined.
             * @param {string} name The name to define on all the ancestor controls.
             */
            public _define(name: string): void;
            /**
             * Determines whether or not this control is part of a pre-compiled control tree. In the event
             * that it is, it shouldn't set itself on the ancestor controls.
             * @param {string} name The name to define on all the ancestor controls.
             */
            public _isPrecompiled(): boolean;
        }
        /**
         * Defines the object added to a root control when an HTML element has
         * a plat-name attribute. If the element corresponds to a registered
         * control, the control will be included in the object.
         */
        interface INamedElement<E extends Element, C> {
            /**
             * The element on which the plat-name is specified.
             */
            element: E;
            /**
             * The template control on the associated element, if one
             * exists.
             */
            control?: C;
        }
        /**
         * An AttributeControl that binds to a specified DOM event handler.
         */
        class SimpleEventControl extends AttributeControl implements ISimpleEventControl {
            /**
             * Reference to the IParser injectable.
             */
            public $Parser: expressions.IParser;
            /**
             * Reference to the IRegex injectable.
             */
            public $Regex: expressions.IRegex;
            /**
             * The event name.
             */
            public event: string;
            /**
             * The camel-cased name of the control as it appears as an attribute.
             */
            public attribute: string;
            /**
             * A parsed form of the expression found in the attribute's value.
             */
            public _expression: string[];
            /**
             * An array of the aliases used in the expression.
             */
            public _aliases: string[];
            /**
             * Kicks off finding and setting the listener.
             */
            public loaded(): void;
            /**
             * Sets the event listener.
             */
            public _setListener(): void;
            /**
             * Finds the first instance of the specified function
             * in the parent control chain.
             * @param {string} identifier the function identifer
             */
            public _findListener(identifier: string): {
                control: ui.ITemplateControl;
                value: any;
            };
            /**
             * Constructs the function to evaluate with
             * the evaluated arguments taking resources
             * into account.
             * The function to call and the associated arguments, as well as the control context with which to call the function.
             */
            public _buildExpression(): {
                fn: () => void;
                control: ui.ITemplateControl;
                args: expressions.IParsedExpression[];
            };
            /**
             * Calls the specified function when the DOM event is fired.
             * @param {Event} ev The event object.
             */
            public _onEvent(ev: Event): void;
            /**
             * Finds all alias contained within the expression.
             * @param {Array<string>} args The array of arguments as strings.
             */
            public _findAliases(args: string[]): string[];
            /**
             * Parses the expression and separates the function
             * from its arguments.
             * @param {string} expression The expression to parse.
             */
            public _parseArgs(expression: string): void;
        }
        /**
         * An IAttributeControl that binds to a specified DOM event handler.
         */
        interface ISimpleEventControl extends IAttributeControl {
            /**
             * The event name.
             */
            event: string;
            /**
             * The camel-cased name of the control as it appears as an attribute.
             */
            attribute: string;
        }
        /**
         * A SimpleEventControl for the '$tap' event.
         */
        class Tap extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the 'blur' event.
         */
        class Blur extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the 'change' event.
         */
        class Change extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the 'copy' event.
         */
        class Copy extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the 'cut' event.
         */
        class Cut extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the 'paste' event.
         */
        class Paste extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the '$dbltap' event.
         */
        class DblTap extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the 'focus' event.
         */
        class Focus extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the '$touchstart' event.
         */
        class TouchStart extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the '$touchend' event.
         */
        class TouchEnd extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the '$touchmove' event.
         */
        class TouchMove extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the '$touchcancel' event.
         */
        class TouchCancel extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the '$hold' event.
         */
        class Hold extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the '$release' event.
         */
        class Release extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the '$swipe' event.
         */
        class Swipe extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the '$swipeleft' event.
         */
        class SwipeLeft extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the '$swiperight' event.
         */
        class SwipeRight extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the '$swipeup' event.
         */
        class SwipeUp extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the '$swipedown' event.
         */
        class SwipeDown extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the '$track' event.
         */
        class Track extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the '$trackleft' event.
         */
        class TrackLeft extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the '$trackright' event.
         */
        class TrackRight extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the '$trackup' event.
         */
        class TrackUp extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the '$trackdown' event.
         */
        class TrackDown extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the '$trackend' event.
         */
        class TrackEnd extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * A SimpleEventControl for the 'submit' event.
         */
        class Submit extends SimpleEventControl {
            /**
             * The event name.
             */
            public event: string;
            /**
             * Prevents the default submit action unless
             * the "action" attribute is present.
             * @param {Event} ev The event object.
             */
            public _onEvent(ev: Event): void;
        }
        /**
         * A mapping of all keys to their equivalent keyCode.
         */
        var KeyCodes: {
            'backspace': number;
            'tab': number;
            'enter': number;
            'shift': number;
            'ctrl': number;
            'alt': number;
            'pause': number;
            'break': number;
            'caps lock': number;
            'escape': number;
            'space': number;
            'page up': number;
            'page down': number;
            'end': number;
            'home': number;
            'left': number;
            'left arrow': number;
            'up': number;
            'up arrow': number;
            'right': number;
            'right arrow': number;
            'down': number;
            'down arrow': number;
            'insert': number;
            'delete': number;
            '0': number;
            'zero': number;
            ')': number;
            'right parenthesis': number;
            '1': number;
            'one': number;
            '!': number;
            'exclamation': number;
            'exclamation point': number;
            '2': number;
            'two': number;
            '@': number;
            'at': number;
            '3': number;
            'three': number;
            '#': number;
            'number sign': number;
            'hash': number;
            'pound': number;
            '4': number;
            'four': number;
            '$': number;
            'dollar': number;
            'dollar sign': number;
            '5': number;
            'five': number;
            '%': number;
            'percent': number;
            'percent sign': number;
            '6': number;
            'six': number;
            '^': number;
            'caret': number;
            '7': number;
            'seven': number;
            '&': number;
            'ampersand': number;
            '8': number;
            'eight': number;
            '*': number;
            'asterisk': number;
            '9': number;
            'nine': number;
            '(': number;
            'left parenthesis': number;
            'a': number;
            'b': number;
            'c': number;
            'd': number;
            'e': number;
            'f': number;
            'g': number;
            'h': number;
            'i': number;
            'j': number;
            'k': number;
            'l': number;
            'm': number;
            'n': number;
            'o': number;
            'p': number;
            'q': number;
            'r': number;
            's': number;
            't': number;
            'u': number;
            'v': number;
            'w': number;
            'x': number;
            'y': number;
            'z': number;
            'lwk': number;
            'left window key': number;
            'rwk': number;
            'right window key': number;
            'select': number;
            'select key': number;
            'numpad 0': number;
            'numpad 1': number;
            'numpad 2': number;
            'numpad 3': number;
            'numpad 4': number;
            'numpad 5': number;
            'numpad 6': number;
            'numpad 7': number;
            'numpad 8': number;
            'numpad 9': number;
            'multiply': number;
            'add': number;
            'subtract': number;
            'decimal point': number;
            'divide': number;
            'f1': number;
            'f2': number;
            'f3': number;
            'f4': number;
            'f5': number;
            'f6': number;
            'f7': number;
            'f8': number;
            'f9': number;
            'f10': number;
            'f11': number;
            'f12': number;
            'num lock': number;
            'scroll lock': number;
            ';': number;
            'semi-colon': number;
            ':': number;
            'colon': number;
            '=': number;
            'equal': number;
            'equal sign': number;
            '+': number;
            'plus': number;
            ',': number;
            'comma': number;
            '<': number;
            'lt': number;
            'less than': number;
            'left angle bracket': number;
            '-': number;
            'dash': number;
            '_': number;
            'underscore': number;
            '.': number;
            'period': number;
            '>': number;
            'gt': number;
            'greater than': number;
            'right angle bracket': number;
            '/': number;
            'forward slash': number;
            '?': number;
            'question mark': number;
            '`': number;
            'grave accent': number;
            '~': number;
            'tilde': number;
            '[': number;
            'open bracket': number;
            '{': number;
            'open brace': number;
            '\\': number;
            'back slash': number;
            '|': number;
            'pipe': number;
            ']': number;
            'close bracket': number;
            '}': number;
            'close brace': number;
            '\'': number;
            'single quote': number;
            '"': number;
            'double quote': number;
        };
        /**
         * Base class used for filtering keys on KeyboardEvents.
         */
        class KeyCodeEventControl extends SimpleEventControl implements IKeyCodeEventControl {
            /**
             * Reference to the IRegex injectable.
             */
            public $Regex: expressions.IRegex;
            /**
             * Holds the key mappings to filter for in a KeyboardEvent.
             */
            public keyCodes: IObject<{
                shifted: boolean;
            }>;
            /**
             * Checks if the IKeyboardEventInput is an expression object
             * and sets the necessary listener.
             */
            public _setListener(): void;
            /**
             * Matches the event's keyCode if necessary and then handles the event if
             * a match is found or if there are no filter keyCodes.
             * @param {KeyboardEvent} ev The keyboard event object.
             */
            public _onEvent(ev: KeyboardEvent): void;
            /**
             * Sets the defined key codes as they correspond to
             * the KeyCodes map.
             * @param {Array<string>} keys? The array of defined keys to satisfy the
             * key press condition.
             */
            public _setKeyCodes(keys?: string[]): void;
        }
        /**
         * An attribute object that binds to specified key code scenarios.
         */
        interface IKeyCodeEventControl extends ISimpleEventControl {
            /**
             * Holds the key mappings to filter for in a KeyboardEvent.
             */
            keyCodes: IObject<{
                shifted: boolean;
            }>;
        }
        /**
         * The available options for KeyCodeEventControl.
         */
        interface IKeyboardEventInput {
            /**
             * The method to call when the condition is satisfied.
             */
            method: string;
            /**
             * The key to satisfy the press condition. Can be specified either as a numeric key code
             * or a string representation as seen by the KeyCodes mapping.
             */
            key?: string;
            /**
             * An optional array of keys if more than one key can satisfy the condition.
             */
            keys?: string[];
        }
        /**
         * Used for filtering keys on keydown events.
         */
        class KeyDown extends KeyCodeEventControl {
            /**
             * The event name.
             */
            public event: string;
            /**
             * The a method to remove the currently postponed event.
             */
            public cancelEvent: IRemoveListener;
            /**
             * Delays execution of the event
             * @param {KeyboardEvent} ev The KeyboardEvent object.
             */
            public _onEvent(ev: KeyboardEvent): void;
            /**
             * Calls to cancel an event if it is in progress.
             */
            public dispose(): void;
        }
        /**
         * Used for filtering only printing keys (a-z, A-Z, 0-9, and special characters) on keydown events.
         */
        class KeyPress extends KeyCodeEventControl {
            /**
             * The event name.
             */
            public event: string;
            /**
             * The a method to remove the currently postponed event.
             */
            public cancelEvent: IRemoveListener;
            /**
             * Filters only 'printing keys' (a-z, A-Z, 0-9, and special characters)
             * @param {KeyboardEvent} ev The KeyboardEvent object.
             */
            public _onEvent(ev: KeyboardEvent): void;
            /**
             * Calls to cancel an event if it is in progress.
             */
            public dispose(): void;
        }
        /**
         * Used for filtering keys on keyup events.
         */
        class KeyUp extends KeyCodeEventControl {
            /**
             * The event name.
             */
            public event: string;
        }
        /**
         * An AttributeControl that deals with binding to a specified property on its element.
         */
        class SetAttributeControl extends AttributeControl implements ISetAttributeControl {
            /**
             * The property to set on the associated template control.
             */
            public property: string;
            /**
             * The camel-cased name of the control as it appears as an attribute.
             */
            public attribute: string;
            /**
             * The function to stop listening for attribute changes.
             */
            private __removeListener;
            /**
             * Sets the corresponding attribute {property} value and
             * observes the attribute for changes.
             */
            public loaded(): void;
            /**
             * Resets the corresponding attribute property value upon
             * a change of context.
             */
            public contextChanged(): void;
            /**
             * Stops listening to attribute changes.
             */
            public dispose(): void;
            /**
             * The function for setting the corresponding
             * attribute property value.
             */
            public setter(): void;
        }
        /**
         * An IAttributeControl that deals with binding to a specified property on its element.
         */
        interface ISetAttributeControl extends IAttributeControl {
            /**
             * The property to set on the associated template control.
             */
            property: string;
            /**
             * The camel-cased name of the control as it appears as an attribute.
             */
            attribute: string;
            /**
             * The function for setting the corresponding
             * attribute property value.
             */
            setter(): void;
        }
        /**
         * A SetAttributeControl for the 'checked' attribute.
         */
        class Checked extends SetAttributeControl {
            /**
             * The property to set on the associated template control.
             */
            public property: string;
        }
        /**
         * A SetAttributeControl for the 'disabled' attribute.
         */
        class Disabled extends SetAttributeControl {
            /**
             * The property to set on the associated template control.
             */
            public property: string;
        }
        /**
         * A SetAttributeControl for the 'selected' attribute.
         */
        class Selected extends SetAttributeControl {
            /**
             * The property to set on the associated template control.
             */
            public property: string;
        }
        /**
         * A SetAttributeControl for the 'readonly' attribute.
         */
        class ReadOnly extends SetAttributeControl {
            /**
             * The property to set on the associated template control.
             */
            public property: string;
        }
        /**
         * A SetAttributeControl for the 'plat-hide' attribute.
         */
        class Visible extends SetAttributeControl {
            /**
             * The property to set on the associated template control.
             */
            public property: string;
            /**
             * Hides the element.
             */
            public initialize(): void;
            /**
             * Hides or shows the element depending upon the attribute value
             */
            public setter(): void;
            /**
             * Hides the element.
             */
            private __hide();
            /**
             * Shows the element.
             */
            private __show();
        }
        /**
         * A SetAttributeControl for the 'style' attribute.
         */
        class Style extends SetAttributeControl {
            /**
             * Sets the evaluated styles on the element.
             */
            public setter(): void;
        }
        /**
         * Base class used for setting the property of an element (e.g. href for anchor elements).
         */
        class ElementPropertyControl extends SetAttributeControl {
            /**
             * The function for setting the corresponding
             * attribute property value to the evaluated expression.
             */
            public setter(): void;
        }
        /**
         * A type of ElementPropertyControl used to set 'href' on an anchor tag.
         */
        class Href extends ElementPropertyControl {
            /**
             * Used to set the element's href property.
             */
            public property: string;
            /**
             * The TemplateControl for a plat-href is an Anchor control.
             */
            public templateControl: ui.controls.Anchor;
            /**
             * Sets the href property, then calls the Anchor control to
             * normalize the href.
             */
            public setter(): void;
        }
        /**
         * A type of ElementPropertyControl used to set 'src' on an anchor tag.
         */
        class Src extends ElementPropertyControl {
            /**
             * Used to set the element's src property.
             */
            public property: string;
            /**
             * The plat.web.IBrowser injectable instance
             */
            public $Browser: web.IBrowser;
            /**
             * The function for setting the corresponding
             * attribute property value to the evaluated expression.
             */
            public setter(): void;
        }
        /**
         * Facilitates two-way databinding for HTMLInputElements, HTMLSelectElements, and HTMLTextAreaElements.
         */
        class Bind extends AttributeControl {
            /**
             * Reference to the IParser injectable.
             */
            public $Parser: expressions.IParser;
            /**
             * Reference to the IContextManagerStatic injectable.
             */
            public $ContextManagerStatic: observable.IContextManagerStatic;
            /**
             * Reference to the ICompat injectable.
             */
            public $Compat: ICompat;
            /**
             * Reference to the Document injectable.
             */
            public $document: Document;
            /**
             * The priority of Bind is set high to take precede
             * other controls that may be listening to the same
             * event.
             */
            public priority: number;
            /**
             * The function used to add the proper event based on the input type.
             */
            public _addEventType: () => void;
            /**
             * The function used to get the bound value.
             */
            public _getter: () => any;
            /**
             * The function used to set the bound value.
             */
            public _setter: (newValue: any, oldValue?: any, firstTime?: boolean) => void;
            /**
             * The expression to evaluate as the bound value.
             */
            public _expression: expressions.IParsedExpression;
            /**
             * The IParsedExpression used to evaluate the context
             * of the bound property.
             */
            public _contextExpression: expressions.IParsedExpression;
            /**
             * The bound property name.
             */
            public _property: string;
            /**
             * Whether or not the File API is supported.
             */
            private __fileSupported;
            /**
             * Used to grab a filename from input[type="file"].
             */
            private __fileNameRegex;
            /**
             * Used to denote that a property change happened from within this control.
             */
            private __isSelf;
            /**
             * Determines the type of Element being bound to
             * and sets the necessary handlers.
             */
            public initialize(): void;
            /**
             * Parses and watches the expression being bound to.
             */
            public loaded(): void;
            /**
             * Re-observes the expression with the new context.
             */
            public contextChanged(): void;
            /**
             * Removes all of the element's event listeners.
             */
            public dispose(): void;
            /**
             * Adds a text event as the event listener.
             * Used for textarea and input[type=text].
             */
            public _addTextEventListener(): void;
            /**
             * Adds a change event as the event listener.
             * Used for select, input[type=radio], and input[type=range].
             */
            public _addChangeEventListener(): void;
            /**
             * Adds a $tap event as the event listener.
             * Used for input[type=button] and button.
             */
            public _addButtonEventListener(): void;
            /**
             * Getter for input[type=checkbox] and input[type=radio]
             */
            public _getChecked(): boolean;
            /**
             * Getter for input[type=text], input[type=range],
             * textarea, and select.
             */
            public _getValue(): string;
            /**
             * Getter for button.
             */
            public _getTextContent(): string;
            /**
             * Getter for input[type="file"]. Creates a partial IFile
             * element if file is not supported.
             */
            public _getFile(): IFile;
            /**
             * Getter for input[type="file"]-multiple
             */
            public _getFiles(): IFile[];
            /**
             * Getter for select-multiple
             */
            public _getSelectedValues(): string[];
            /**
             * Setter for textarea, input[type=text],
             * and input[type=button], and select
             * @param {any} newValue The new value to set
             * @param {any} oldValue? The previously bound value
             * @param {boolean} firstTime? The context is being evaluated for the first time and
             * should thus change the property if null
             */
            public _setText(newValue: any, oldValue?: any, firstTime?: boolean): void;
            /**
             * Setter for input[type=range]
             * @param {any} newValue The new value to set
             * @param {any} oldValue? The previously bound value
             * @param {boolean} firstTime? The context is being evaluated for the first time and
             * should thus change the property if null
             */
            public _setRange(newValue: any, oldValue?: any, firstTime?: boolean): void;
            /**
             * Setter for input[type=checkbox]
             * @param {any} newValue The new value to set
             * @param {any} oldValue? The previously bound value
             * @param {boolean} firstTime? The context is being evaluated for the first time and
             * should thus change the property if null
             */
            public _setChecked(newValue: any, oldValue?: any, firstTime?: boolean): void;
            /**
             * Setter for input[type=radio]
             * @param {any} newValue The new value to set
             */
            public _setRadio(newValue: any): void;
            /**
             * Setter for select
             * @param {any} newValue The new value to set
             * @param {any} oldValue? The previously bound value
             * @param {boolean} firstTime? The context is being evaluated for the first time and
             * should thus change the property if null
             */
            public _setSelectedIndex(newValue: any, oldValue?: any, firstTime?: boolean): void;
            /**
             * Setter for select-multiple
             * @param {any} newValue The new value to set
             * @param {any} oldValue? The previously bound value
             * @param {boolean} firstTime? The context is being evaluated for the first time and
             * should thus change the property if null
             */
            public _setSelectedIndices(newValue: any, oldValue?: any, firstTime?: boolean): void;
            /**
             * Determines the type of Element being bound to
             * and sets the necessary handlers.
             */
            public _determineType(): void;
            /**
             * Observes the expression to bind to.
             */
            public _watchExpression(): void;
            /**
             * Sets the context property being bound to when the
             * element's property is changed.
             */
            public _propertyChanged(): void;
            /**
             * Normalizes input[type="radio"] for cross-browser compatibility.
             */
            public _initializeRadio(): void;
            /**
             * Normalizes HTMLSelectElements for cross-browser compatibility.
             */
            public _initializeSelect(): void;
            /**
             * Checks to see if a Select or ForEach is loading items.
             */
            public _checkAsynchronousSelect(): boolean;
            /**
             * Checks if the associated TemplateControl is a
             * BindablePropertyControl and
             * initializes all listeners accordingly.
             * is an IBindablePropertyControl
             */
            public _observingBindableProperty(): boolean;
            /**
             * Sets the value on a BindablePropertyControl.
             * @param {any} newValue The new value to set
             * @param {any} oldValue? The previously bound value
             * @param {boolean} firstTime? The context is being evaluated for the first time and
             * should thus change the property if null
             */
            public _setBindableProperty(newValue: any, oldValue?: any, firstTime?: boolean): void;
            /**
             * Sets the value on an element.
             * @param {any} newValue The new value to set
             */
            public _setValue(newValue: any): void;
        }
        /**
         * A file interface for browsers that do not support the
         * File API.
         */
        interface IFile extends File {
            /**
             * An absolute path to the file. The property is not added to
             * File types.
             */
            path?: string;
        }
        /**
         * An AttributeControl that deals with observing changes for a specified property.
         */
        class ObservableAttributeControl extends AttributeControl implements IObservableAttributeControl {
            /**
             * Reference to the IContextManagerStatic injectable.
             */
            public $ContextManagerStatic: observable.IContextManagerStatic;
            /**
             * The property to set on the associated template control.
             */
            public property: string;
            /**
             * The camel-cased name of the control as it appears as an attribute.
             */
            public attribute: string;
            /**
             * This control needs to load before its templateControl
             */
            public priority: number;
            /**
             * The set of functions added by the Template Control that listens
             * for property changes.
             */
            public _listeners: {
                (newValue: any, oldValue?: any): void;
            }[];
            /**
             * The function to stop listening for property changes.
             */
            public _removeListener: IRemoveListener;
            /**
             * The _addListener function bound to this control.
             */
            public _boundAddListener: any;
            /**
             * Sets the initial value of the property on
             * the Template Control.
             */
            public initialize(): void;
            /**
             * Observes the property and resets the value.
             */
            public loaded(): void;
            /**
             * Stops listening for changes to the evaluated
             * expression and removes references to the listeners
             * defined by the Template Control.
             */
            public dispose(): void;
            /**
             * Sets the property on the Template Control.
             * @param {any} value The new value of the evaluated expression.
             * @param {any} oldValue? The old value of the evaluated expression.
             */
            public _setProperty(value: any, oldValue?: any): void;
            /**
             * Calls the listeners defined by the Template Control.
             * @param {any} value The new value of the evaluated expression.
             * @param {any} oldValue The old value of the evaluated expression.
             */
            public _callListeners(newValue: any, oldValue: any): void;
            /**
             * Adds a listener as defined by the Template Control.
             * @param {plat.IPropertyChangedListener} listener The listener added by the Template Control.
             */
            public _addListener(listener: (newValue: any, oldValue: any) => void): IRemoveListener;
            /**
             * Evaluates the attribute's value.
             */
            public _getValue(): any;
            /**
             * Observes the attribute's value.
             */
            public _observeProperty(): void;
        }
        /**
         * An IAttributeControl that deals with observing changes for a specified property.
         */
        interface IObservableAttributeControl extends IAttributeControl {
            /**
             * The property to set on the associated template control.
             */
            property: string;
            /**
             * The camel-cased name of the control as it appears as an attribute.
             */
            attribute: string;
        }
        /**
         * An ObservableAttributeControl that sets 'options' as the
         * associated property.
         */
        class Options extends ObservableAttributeControl {
            /**
             * The property to set on the associated template control.
             */
            public property: string;
        }
    }
    /**
     * Class for every app. This class contains hooks for Application Lifecycle Events
     * as well as error handling.
     */
    class App implements IApp {
        /**
         * Reference to the ICompat injectable.
         */
        static $Compat: ICompat;
        /**
         * Reference to the IEventManagerStatic injectable.
         */
        static $EventManagerStatic: events.IEventManagerStatic;
        /**
         * Reference to the Document injectable.
         */
        static $Document: Document;
        /**
         * Reference to the ICompiler injectable.
         */
        static $Compiler: processing.ICompiler;
        /**
         * Reference to the ILifecycleEventStatic injectable.
         */
        static $LifecycleEventStatic: events.ILifecycleEventStatic;
        /**
         * A static method for initiating the app startup.
         */
        static start(): void;
        /**
         * A static method called upon app registration. Primarily used
         * to initiate a ready state in the case that amd is being used.
         * @param {any} app The app instance.
         */
        static registerApp(app: any): void;
        /**
         * Kicks off compilation of the DOM from the specified node. If no node is specified,
         * the default start node is document.body.
         * @param {Node} node The node at which DOM compilation begins.
         */
        static load(node?: Node): void;
        /**
         * The instance of the registered IApp.
         */
        static app: IApp;
        /**
         * A static method called when the application is ready. It calls the app instance's
         * ready function as well as checks for the presence of a module loader. If one exists,
         * loading the DOM falls back to the app developer. If it doesn't, the DOM is loaded from
         * document.body.
         * @param {plat.events.ILifecycleEvent} ev The ILifecycleEvent for the app ready.
         */
        private static __ready(ev);
        /**
         * A static method called when the application wants to programmatically shutdown.
         */
        private static __shutdown();
        /**
         * A static method called to register all the ILifecycleEvents for an app instance.
         */
        private static __registerAppEvents(ev);
        /**
         * We need to add [plat-hide] as a css property if platypus.css doesn't exist so we can use it to temporarily
         * hide elements.
         */
        private static __addPlatCss();
        /**
         * A unique id, created during instantiation.
         */
        public uid: string;
        /**
         * Class for every app. This class contains hooks for Application Lifecycle Management (ALM)
         * as well as error handling and navigation events.
         */
        constructor();
        /**
         * Event fired when the app is suspended.
         * @param {plat.events.ILifecycleEvent} ev The ILifecycleEvent object.
         */
        public suspend(ev: events.ILifecycleEvent): void;
        /**
         * Event fired when the app resumes from the suspended state.
         * @param {plat.events.ILifecycleEvent} ev The ILifecycleEvent object.
         */
        public resume(ev: events.ILifecycleEvent): void;
        /**
         * Event fired when an internal error occures.
         * @param {plat.events.IErrorEvent<Error>} ev The IErrorEvent object.
         */
        public error(ev: events.IErrorEvent<Error>): void;
        /**
         * Event fired when the app is ready.
         * @param {plat.events.ILifecycleEvent} ev The ILifecycleEvent object.
         */
        public ready(ev: events.ILifecycleEvent): void;
        /**
         * Event fired when the app regains connectivity and is now in an online state.
         * @param {plat.events.ILifecycleEvent} ev The ILifecycleEvent object.
         */
        public online(ev: events.ILifecycleEvent): void;
        /**
         * Event fired when the app loses connectivity and is now in an offline state.
         * @param {plat.events.ILifecycleEvent} ev The ILifecycleEvent object.
         */
        public offline(ev: events.ILifecycleEvent): void;
        /**
         * Creates a new DispatchEvent and propagates it to all
         * listeners based on the DIRECT method. Propagation
         * will always start with the sender, so the sender can both produce and consume the same event.
         * @param {string} name The name of the event to send, cooincides with the name used in the
         * app.on() method.
         * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
         */
        public dispatchEvent(name: string, ...args: any[]): void;
        /**
         * Registers a listener for a beforeNavigate event. The listener will be called when a beforeNavigate
         * event is propagating over the app. Any number of listeners can exist for a single event name.
         * This event is cancelable using the ev.cancel() method,
         * and thereby preventing the navigation.
         * @param {string} name='beforeNavigate' The name of the event, cooinciding with the beforeNavigate event.
         * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the beforeNavigate event is fired.
         */
        public on(name: 'beforeNavigate', listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
         * Registers a listener for a navigating event. The listener will be called when a navigating
         * event is propagating over the app. Any number of listeners can exist for a single event name.
         * This event is cancelable using the ev.cancel() method,
         * and thereby preventing the navigation.
         * @param {string} name='navigating' The name of the event, cooinciding with the navigating event.
         * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the navigating
         * event is fired.
         */
        public on(name: 'navigating', listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
         * Registers a listener for a navigated event. The listener will be called when a navigated
         * event is propagating over the app. Any number of listeners can exist for a single event name.
         * This event is not cancelable.
         * @param {string} name='navigated' The name of the event, cooinciding with the navigated event.
         * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the navigated
         * event is fired.
         */
        public on(name: 'navigated', listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
         * Registers a listener for a routeChanged event. The listener will be called when a routeChange event
         * is propagating over the app. Any number of listeners can exist for a single event name.
         * @param {string} eventName='routeChange' This specifies that the listener is for a routeChange event.
         * @param {(ev: plat.events.INavigationEvent<plat.web.IRoute<any>>) => void} listener The method called
         * when the routeChange is fired. The route argument will contain a parsed route.
         */
        public on(name: 'routeChanged', listener: (ev: events.INavigationEvent<web.IRoute<any>>) => void): IRemoveListener;
        /**
         * Registers a listener for a NavigationEvent. The listener will be called
         * when a NavigationEvent is propagating over the app. Any number of listeners can exist for a single event name.
         * @param {string} name The name of the event, cooinciding with the NavigationEvent name.
         * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the
         * NavigationEvent is fired.
         */
        public on(name: string, listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
         * Kicks off compilation of the DOM from the specified node. If no node is specified,
         * the default start node is document.body. This method should be called from the app when
         * using module loaders. If a module loader is in use, the app will delay loading until
         * this method is called.
         * @param {Node} node The node where at which DOM compilation begins.
         */
        public load(node?: Node): void;
    }
    /**
     * The Type for referencing the '$AppStatic' injectable as a dependency.
     */
    function IAppStatic($Compat?: ICompat, $EventManagerStatic?: events.IEventManagerStatic, $Document?: Document, $Compiler?: processing.ICompiler, $LifecycleEventStatic?: events.ILifecycleEventStatic): IAppStatic;
    /**
     * The Type for referencing the '$App' injectable as a dependency.
     */
    function IApp($AppStatic?: IAppStatic): IApp;
    /**
     * The external interface for the '$AppStatic' injectable.
     */
    interface IAppStatic {
        /**
         * A static method for initiating the app startup.
         */
        start(): void;
        /**
         * A static methods called upon app registration. Primarily used
         * to initiate a ready state in the case that amd is being used.
         */
        registerApp(app: dependency.IInjector<IApp>): void;
        /**
         * Kicks off compilation of the DOM from the specified node. If no node is specified,
         * the default start node is document.body.
         * @param node The node at which DOM compilation begins.
         */
        load(node?: Node): void;
        /**
         * The instance of the registered IApp.
         */
        app: IApp;
    }
    /**
     * An object implementing IApp implements the methods called by the framework to support
     * Application Lifecycle Management (ALM) as well as error handling and navigation events.
     */
    interface IApp {
        /**
         * A unique id, created during instantiation.
         */
        uid: string;
        /**
         * Event fired when the app is suspended.
         * @param {plat.events.ILifecycleEvent} ev The ILifecycleEvent object.
         */
        suspend? (ev: events.ILifecycleEvent): void;
        /**
         * Event fired when the app resumes from the suspended state.
         * @param {plat.events.ILifecycleEvent} ev The ILifecycleEvent object.
         */
        resume? (ev: events.ILifecycleEvent): void;
        /**
         * Event fired when an internal error occures.
         * @param {plat.events.IErrorEvent} ev The IErrorEvent object.
         */
        error? (ev: events.IErrorEvent<Error>): void;
        /**
         * Event fired when the app is ready.
         * @param {plat.events.ILifecycleEvent} ev The ILifecycleEvent object.
         */
        ready? (ev: events.ILifecycleEvent): void;
        /**
         * Event fired when the app regains connectivity and is now in an online state.
         * @param {plat.events.ILifecycleEvent} ev The ILifecycleEvent object.
         */
        online? (ev: events.ILifecycleEvent): void;
        /**
         * Event fired when the app loses connectivity and is now in an offline state.
         * @param {plat.events.ILifecycleEvent} ev The ILifecycleEvent object.
         */
        offline? (ev: events.ILifecycleEvent): void;
        /**
         * Creates a new DispatchEvent and propagates it to all
         * listeners based on the DIRECT method. Propagation
         * will always start with the sender, so the sender can both produce and consume the same event.
         * @param {string} name The name of the event to send, cooincides with the name used in the
         * app.on() method.
         * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
         */
        dispatchEvent(name: string, ...args: any[]): void;
        /**
         * Registers a listener for a beforeNavigate event. The listener will be called when a beforeNavigate
         * event is propagating over the app. Any number of listeners can exist for a single event name.
         * This event is cancelable using the ev.cancel() method,
         * and thereby preventing the navigation.
         * @param {string} name='beforeNavigate' The name of the event, cooinciding with the beforeNavigate event.
         * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the beforeNavigate event is fired.
         */
        on(name: 'beforeNavigate', listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
         * Registers a listener for a navigating event. The listener will be called when a navigating
         * event is propagating over the app. Any number of listeners can exist for a single event name.
         * This event is cancelable using the ev.cancel() method,
         * and thereby preventing the navigation.
         * @param {string} name='navigating' The name of the event, cooinciding with the navigating event.
         * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the navigating
         * event is fired.
         */
        on(name: 'navigating', listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
         * Registers a listener for a navigated event. The listener will be called when a navigated
         * event is propagating over the app. Any number of listeners can exist for a single event name.
         * This event is not cancelable.
         * @param {string} name='navigated' The name of the event, cooinciding with the navigated event.
         * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the navigated
         * event is fired.
         */
        on(name: 'navigated', listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
         * Registers a listener for a routeChanged event. The listener will be called when a routeChange event
         * is propagating over the app. Any number of listeners can exist for a single event name.
         * @param {string} eventName='routeChange' This specifies that the listener is for a routeChange event.
         * @param {(ev: plat.events.INavigationEvent<plat.web.IRoute<any>>) => void} listener The method called
         * when the routeChange is fired. The route argument will contain a parsed route.
         */
        on(name: 'routeChanged', listener: (ev: events.INavigationEvent<web.IRoute<any>>) => void): IRemoveListener;
        /**
         * Registers a listener for a NavigationEvent. The listener will be called
         * when a NavigationEvent is propagating over the app. Any number of listeners can exist for a single event name.
         * @param {string} name The name of the event, cooinciding with the NavigationEvent name.
         * @param {(ev: plat.events.INavigationEvent<any>) => void} listener The method called when the
         * NavigationEvent is fired.
         */
        on(name: string, listener: (ev: events.INavigationEvent<any>) => void): IRemoveListener;
        /**
         * Registers a listener for a DispatchEvent. The listener will be called when
         * a DispatchEvent is propagating over the app. Any number of listeners can exist for a single event name.
         * @param {string} name The name of the event, cooinciding with the DispatchEvent name.
         * @param {(ev: plat.events.IDispatchEventInstance, ...args: Array<any>) => void} listener The method called when
         * the DispatchEvent is fired.
         */
        on(name: string, listener: (ev: events.IDispatchEventInstance, ...args: any[]) => void): IRemoveListener;
        /**
         * Kicks off compilation of the DOM from the specified node. If no node is specified,
         * the default start node is document.body. This method should be called from the app when
         * using module loaders. If a module loader is in use, the app will delay loading until
         * this method is called.
         * @param {Node} node The node where at which DOM compilation begins.
         */
        load(node?: Node): void;
    }
    /**
     * Interface for an object where every key has the same typed value.
     */
    interface IObject<T> {
        /**
         * Every key must be of type T
         */
        [key: string]: T;
    }
    /**
     * Defines a function that will halt further callbacks to a listener.
     * Equivalent to `() => void`.
     */
    interface IRemoveListener {
        /**
         * The method signature for IRemoveListener.
         */
        (): void;
    }
    /**
     * Defines a function that will be called whenever a property has changed.
     */
    interface IPropertyChangedListener {
        /**
         * The method signature for IPropertyChangedListener.
         * @param {any} newValue? The new value of the observed property.
         * @param {any} oldValue? The previous value of the observed property.
         */
        (newValue?: any, oldValue?: any): void;
    }
}
