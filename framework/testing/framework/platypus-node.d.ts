/**
  * PlatypusTS v0.9.9 (http://getplatypi.com)
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
        function app(name: string, Type: new (...args: any[]) => IApp, dependencies?: any[]): typeof register;
        /**
          * Registers an IControl with the framework. The framework will instantiate the
          * IControl when needed. The dependencies array corresponds to injectables that
          * will be passed into the Constructor of the control.
          * @param {string} name The control type, corresponding to the HTML notation for creating a new IControl (e.g. 'plat-foreach').
          * @param {new (...args: any[]) => plat.IControl} Type The constructor for the IControl.
          * @param {Array<any>} dependencies? An array of strings representing the dependencies needed for the IControl
          * injector.
          */
        function control(name: string, Type: new (...args: any[]) => IControl, dependencies?: any[], isStatic?: boolean): typeof register;
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
        function viewControl<T extends ui.ViewControl>(name: string, Type: new (...args: any[]) => T, dependencies?: any[]): typeof register;
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
        function injectable(name: string, Type: new (...args: any[]) => any, dependencies?: any[], injectableType?: string): typeof register;
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
        function animation(name: string, Type: new (...args: any[]) => ui.animations.ICssAnimation, dependencies?: any[], animationType?: 'css'): typeof register;
        function animation(name: string, Type: new (...args: any[]) => ui.animations.ICssAnimation, dependencies?: any[], animationType?: string): typeof register;
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
        function animation(name: string, Type: new (...args: any[]) => ui.animations.IJsAnimation, dependencies: any[], animationType: 'js'): typeof register;
        function animation(name: string, Type: new (...args: any[]) => ui.animations.IJsAnimation, dependencies: any[], animationType: string): typeof register;
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
            name: string;
            Constructor: new () => T;
            type: string;
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
              * Converts a dependency specified by its Constructors into an
              * equivalent dependency specified by its registered string
              * name.
              * @param {any} dependency The dependency specified
              * by either a Constructor or a registered name.
              */
            static convertDependency(dependency: any): string;
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
              * Finds an injector object with the associated constructor in the given IInjectorObject.
              * @param {Function} Constructor The Function
              */
            private static __findInjector(Constructor, injectors);
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
            constructor(name: string, Constructor: new () => T, dependencies?: any[], type?: string);
            /**
              * Gathers the dependencies for the Injector object and creates a new instance of the
              * Constructor, passing in the dependencies in the order they were specified. If the
              * Injector contains a Constructor for an injectable and the Constructor is registered
              * as a SINGLE type it will only inject that injectable once.
              */
            inject(): T;
            /**
              * Wraps the injector with the instantiated value in the case of a
              * SINGLE or STATIC type so that it does not re-instantiate.
              * @param {any} value The value to wrap
              */
            protected _wrapInjector(value: any): IInjector<any>;
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
            Constructor: new () => T;
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
            var viewControl: IInjectorObject<ui.ViewControl>;
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
        $Window: Window;
        /**
          * The window.history injectable.
          */
        $history: History;
        /**
          * The document injectable.
          */
        $Document: Document;
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
        hasEvent(event: string): boolean;
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
          * @param {plat.IListIterator<T, boolean>} iterator The iterator function to call with array's properties.
          * Returns true if the property should be kept, false otherwise.
          * @param {Array<T>} array The Array to filter.
          * @param {any} context? An optional context to bind to the iterator.
          */
        filter<T>(iterator: IListIterator<T, boolean>, array: T[], context?: any): T[];
        /**
          * Takes in an object/array and a function to evaluate the properties in the object/array.
          * Returns a filtered array of objects resulting from evaluating the function.
          * @param {plat.IObjectIterator<T, boolean>} iterator The iterator function to call with array's properties.
          * Returns true if the property should be kept, false otherwise.
          * @param {plat.IObject<T>} obj The object to filter.
          * @param {any} context? An optional context to bind to the iterator.
          */
        filter<T>(iterator: IObjectIterator<T, boolean>, obj: IObject<T>, context?: any): T[];
        /**
          * Takes in a list and object containing key/value pairs to search for in the list.
          * @param {Object} properties An object containing key/value pairs to match with obj's values.
          * @param {Array<T>} array The list used for searching for properties.
          */
        where<T>(properties: Object, array: T[]): T[];
        /**
          * Takes in an Array and a function to iterate over. Calls the iterator function with every property
          * in the Array, then returns the object.
          * @param {plat.IListIterator<T, void>} iterator A method that takes in a value, index, and the object.
          * @param {Array<T>} array An Array.
          * @param {any} context? An optional context to bind to the iterator.
          */
        forEach<T>(iterator: IListIterator<T, void>, array: T[], context?: any): T[];
        /**
          * Takes in an Array and a function to iterate over. Calls the iterator function with every property
          * in the Array, then returns the object.
          * @param {plat.IObjectIterator<T, void>} iterator A method that takes in a value, index, and the object.
          * @param {plat.IObject<T>} obj An object.
          * @param {any} context? An optional context to bind to the iterator.
          */
        forEach<T>(iterator: IObjectIterator<T, void>, obj: IObject<T>, context?: any): IObject<T>;
        /**
          * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The
          * iterator can transform the object and return it. The returned values will be pushed to an Array and
          * returned.
          * @param {plat.IListIterator<T, R>} iterator The transformation function.
          * @param {Array<T>} array An Array.
          * @param {any} context? An optional context to bind to the iterator.
          */
        map<T, R>(iterator: IListIterator<T, R>, array: T[], context?: any): R[];
        /**
          * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The
          * iterator can transform the object and return it. The returned values will be pushed to an Array and
          * returned.
          * @param {(value: T, index: number, obj: any) => U} iterator The transformation function.
          * @param {plat.IObject<T>} obj An Object.
          * @param {any} context? An optional context to bind to the iterator.
          */
        map<T, R>(iterator: IObjectIterator<T, R>, obj: IObject<T>, context?: any): R[];
        /**
          * Takes in an array and an iterator function. Calls the iterator with all the values in the array. The
          * iterator can return a promise the will resolve with the mapped value. The returned values will be pushed
          * to an Array. A promise is returned that will resolve when all the iterators have resolved.
          * @param {plat.IListIterator<T, plat.async.IThenable<R>>} iterator The transformation function.
          * @param {Array<T>} array An array.
          * @param {any} context? An optional context to bind to the iterator.
          */
        mapAsync<T, R>(iterator: IListIterator<T, async.IThenable<R>>, array: T[], context?: any): async.IThenable<R[]>;
        /**
          * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The
          * iterator can return a promise the will resolve with the mapped value. The returned values will be pushed
          * to an Array. A promise is returned that will resolve when all the iterators have resolved.
          * @param {plat.IObjectIterator<T, plat.async.IThenable<R>>} iterator The transformation function.
          * @param {plat.IObject<T>} obj An Object.
          * @param {any} context? An optional context to bind to the iterator.
          */
        mapAsync<T, R>(iterator: IObjectIterator<T, async.IThenable<R>>, obj: IObject<T>, context?: any): async.IThenable<R[]>;
        /**
          * Takes in an array and an iterator function. Calls the iterator with all the values in the array. The
          * iterator can return a promise the will resolve with the mapped value. The next value in the array will not be passed to
          * the iterator until the previous promise fulfills.
          * @param {plat.IListIterator<T, plat.async.IThenable<R>>} iterator The transformation function.
          * @param {Array<T>} array An Array.
          * @param {any} context? An optional context to bind to the iterator.
          */
        mapAsyncInOrder<T, R>(iterator: IListIterator<T, async.IThenable<R>>, array: T[], context?: any): async.IThenable<R[]>;
        /**
          * Takes in an array and an iterator function. Calls the iterator with all the values in the array in descending order. The
          * iterator can return a promise the will resolve with the mapped value. The next value in the array will not be passed to
          * the iterator until the previous promise fulfills.
          * @param {plat.IListIterator<T, plat.async.IThenable<R>>} iterator The transformation function.
          * @param {Array<T>} array An Array.
          * @param {any} context? An optional context to bind to the iterator.
          */
        mapAsyncInDescendingOrder<T, R>(iterator: IListIterator<T, async.IThenable<R>>, array: T[], context?: any): async.IThenable<R[]>;
        /**
          * Takes in an object and a property to extract from all of the object's values. Returns an array of
          * the 'plucked' values.
          * @param {string} key The property to 'pluck' from each value in the array.
          * @param {Array<T>} array The array to pluck the key from
          */
        pluck<T extends {}>(key: string, array: T[]): any[];
        /**
          * Takes in an array and an iterator. Evaluates all the values in the array with the iterator.
          * Returns true if any of the iterators return true, otherwise returns false.
          * @param {plat.IListIterator<T, boolean>} iterator A method with which to evaluate all the values in obj.
          * @param {Array<T>} array An array.
          * @param {any} context? An optional context to bind to the iterator.
          */
        some<T>(iterator: IListIterator<T, boolean>, array: T[], context?: any): boolean;
        /**
          * Takes in an array and an iterator. Evaluates all the values in the array with the iterator.
          * Returns true if any of the iterators return true, otherwise returns false.
          * @param {plat.IObjectIterator<T, boolean>} iterator A method with which to evaluate all the values in obj.
          * @param {plat.IObject<T>} obj An object.
          * @param {any} context? An optional context to bind to the iterator.
          */
        some<T>(iterator: IObjectIterator<T, boolean>, obj: IObject<T>, context?: any): boolean;
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
          * @param {plat.IListIterator<T, boolean>} iterator The iterator function to call with array's properties.
          * Returns true if the property should be kept, false otherwise.
          * @param {Array<T>} array The Array to filter.
          * @param {any} context? An optional context to bind to the iterator.
          */
        filter<T>(iterator: IListIterator<T, boolean>, array: T[], context?: any): T[];
        /**
          * Takes in an object/array and a function to evaluate the properties in the object/array.
          * Returns a filtered array of objects resulting from evaluating the function.
          * @param {plat.IObjectIterator<T, boolean>} iterator The iterator function to call with array's properties.
          * Returns true if the property should be kept, false otherwise.
          * @param {plat.IObject<T>} obj The object to filter.
          * @param {any} context? An optional context to bind to the iterator.
          */
        filter<T>(iterator: IObjectIterator<T, boolean>, obj: IObject<T>, context?: any): T[];
        /**
          * Takes in a list and object containing key/value pairs to search for in the list.
          * @param {Object} properties An object containing key/value pairs to match with obj's values.
          * @param {Array<T>} array The list used for searching for properties.
          */
        where<T>(properties: Object, array: T[]): T[];
        /**
          * Takes in an Array and a function to iterate over. Calls the iterator function with every property
          * in the Array, then returns the object.
          * @param {plat.IListIterator<T, void>} iterator A method that takes in a value, index, and the object.
          * @param {Array<T>} array An Array.
          * @param {any} context? An optional context to bind to the iterator.
          */
        forEach<T>(iterator: IListIterator<T, void>, array: T[], context?: any): T[];
        /**
          * Takes in an Array and a function to iterate over. Calls the iterator function with every property
          * in the Array, then returns the object.
          * @param {plat.IObjectIterator<T, void>} iterator A method that takes in a value, index, and the object.
          * @param {plat.IObject<T>} obj An object.
          * @param {any} context? An optional context to bind to the iterator.
          */
        forEach<T>(iterator: IObjectIterator<T, void>, obj: IObject<T>, context?: any): IObject<T>;
        /**
          * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The
          * iterator can transform the object and return it. The returned values will be pushed to an Array and
          * returned.
          * @param {plat.IListIterator<T, R>} iterator The transformation function.
          * @param {Array<T>} array An Array.
          * @param {any} context? An optional context to bind to the iterator.
          */
        map<T, R>(iterator: IListIterator<T, R>, array: T[], context?: any): R[];
        /**
          * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The
          * iterator can transform the object and return it. The returned values will be pushed to an Array and
          * returned.
          * @param {(value: T, index: number, obj: any) => U} iterator The transformation function.
          * @param {plat.IObject<T>} obj An Object.
          * @param {any} context? An optional context to bind to the iterator.
          */
        map<T, R>(iterator: IObjectIterator<T, R>, obj: IObject<T>, context?: any): R[];
        /**
          * Takes in an array and an iterator function. Calls the iterator with all the values in the array. The
          * iterator can return a promise the will resolve with the mapped value. The returned values will be pushed
          * to an Array. A promise is returned that will resolve when all the iterators have resolved.
          * @param {plat.IListIterator<T, plat.async.IThenable<R>>} iterator The transformation function.
          * @param {Array<T>} array An array.
          * @param {any} context? An optional context to bind to the iterator.
          */
        mapAsync<T, R>(iterator: IListIterator<T, async.IThenable<R>>, array: T[], context?: any): async.IThenable<R[]>;
        /**
          * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The
          * iterator can return a promise the will resolve with the mapped value. The returned values will be pushed
          * to an Array. A promise is returned that will resolve when all the iterators have resolved.
          * @param {plat.IObjectIterator<T, plat.async.IThenable<R>>} iterator The transformation function.
          * @param {plat.IObject<T>} obj An Object.
          * @param {any} context? An optional context to bind to the iterator.
          */
        mapAsync<T, R>(iterator: IObjectIterator<T, async.IThenable<R>>, obj: IObject<T>, context?: any): async.IThenable<R[]>;
        /**
          * Takes in an array and an iterator function. Calls the iterator with all the values in the array. The
          * iterator can return a promise the will resolve with the mapped value. The next value in the array will not be passed to
          * the iterator until the previous promise fulfills.
          * @param {plat.IListIterator<T, plat.async.IThenable<R>>} iterator The transformation function.
          * @param {Array<T>} array An Array.
          * @param {any} context? An optional context to bind to the iterator.
          */
        mapAsyncInOrder<T, R>(iterator: IListIterator<T, async.IThenable<R>>, array: T[], context?: any): async.IThenable<R[]>;
        /**
          * Takes in an array and an iterator function. Calls the iterator with all the values in the array in descending order. The
          * iterator can return a promise the will resolve with the mapped value. The next value in the array will not be passed to
          * the iterator until the previous promise fulfills.
          * @param {plat.IListIterator<T, plat.async.IThenable<R>>} iterator The transformation function.
          * @param {Array<T>} array An Array.
          * @param {any} context? An optional context to bind to the iterator.
          */
        mapAsyncInDescendingOrder<T, R>(iterator: IListIterator<T, async.IThenable<R>>, array: T[], context?: any): async.IThenable<R[]>;
        /**
          * Takes in an object and a property to extract from all of the object's values. Returns an array of
          * the 'plucked' values.
          * @param {string} key The property to 'pluck' from each value in the array.
          * @param {Array<T>} array The array to pluck the key from
          */
        pluck<T extends {}>(key: string, array: T[]): any[];
        /**
          * Takes in an array and an iterator. Evaluates all the values in the array with the iterator.
          * Returns true if any of the iterators return true, otherwise returns false.
          * @param {plat.IListIterator<T, boolean>} iterator A method with which to evaluate all the values in obj.
          * @param {Array<T>} array An array.
          * @param {any} context? An optional context to bind to the iterator.
          */
        some<T>(iterator: IListIterator<T, boolean>, array: T[], context?: any): boolean;
        /**
          * Takes in an array and an iterator. Evaluates all the values in the array with the iterator.
          * Returns true if any of the iterators return true, otherwise returns false.
          * @param {plat.IObjectIterator<T, boolean>} iterator A method with which to evaluate all the values in obj.
          * @param {plat.IObject<T>} obj An object.
          * @param {any} context? An optional context to bind to the iterator.
          */
        some<T>(iterator: IObjectIterator<T, boolean>, obj: IObject<T>, context?: any): boolean;
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
    function Document($window?: Window): Document;
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
            /**
              * Determines if an email address is valid.
              */
            validateEmail: RegExp;
            /**
              * Determines if a telephone number is valid.
              */
            validateTelephone: RegExp;
            /**
              * A regular expression for matching dynamic segments in a route.
              */
            dynamicSegmentsRegex: RegExp;
            /**
              * A regular expression for matching splat segments in a route.
              */
            splatSegmentRegex: RegExp;
            /**
              * A regular expression for matching or removing all newline characters.
              */
            newLineRegex: RegExp;
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
            /**
              * Determines if an email address is valid.
              */
            validateEmail: RegExp;
            /**
              * Determines if a telephone number is valid.
              */
            validateTelephone: RegExp;
            /**
              * A regular expression for matching dynamic segments in a route.
              */
            dynamicSegmentsRegex: RegExp;
            /**
              * A regular expression for matching splat segments in a route.
              */
            splatSegmentRegex: RegExp;
        }
        /**
          * A class that is responsible for taking in a JavaScript expression string and
          * finding all of its tokens (i.e. delimiters, operators, etc).
          */
        class Tokenizer implements ITokenizer {
            /**
              * The input string to tokenize.
              */
            protected _input: string;
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
            createTokens(input: string): IToken[];
            /**
              * Determines character type.
              * @param {string} char The character to check.
              * @param {boolean} isNumberLike Whether or not the character resembles a number.
              */
            protected _checkType(char: string, isNumberLike: boolean): boolean;
            /**
              * Looks ahead in the expression to group similar character types.
              * @param {string} char The current character in the expression string.
              * @param {number} index The current index in the expression string.
              * @param {boolean} isNumberLike Whether or not the character resembles a number.
              */
            protected _lookAhead(char: string, index: number, isNumberLike: boolean): string;
            /**
              * Looks ahead in the expression to try and complete the
              * current operator.
              * @param {string} char The operator to find.
              * @param {number} index The current index in the expression string.
              */
            protected _lookAheadForOperatorFn(char: string, index: number): string;
            /**
              * Looks ahead in the expression until it comes to the ending
              * character to try and complete a particular sequence
              * (e.g. - a string literal). Also strips the first and last
              * characters of the result (i.e. removes the delimiters).
              * @param {string} endChar The ending character.
              * @param {number} index The current index in the expression string.
              * the first character and end character being looked ahead for.
              */
            protected _lookAheadForDelimiter(endChar: string, index: number): string;
            /**
              * Pops the operator stack onto the output queue until a particular
              * operator value is reached.
              * @param {plat.expressions.IToken} topOperator The top of the operator stack.
              * @param {string} char The operator value being searched for.
              * @param {string} error The error to throw in the case that the expression
              * is invalid.
              */
            protected _popStackForVal(topOperator: IToken, char: string, error: string): void;
            /**
              * Check if the "val" property on an IToken
              * is present in a particular character string.
              * @param {plat.expressions.IToken} obj The IToken
              * with the "val" property to compare.
              * @param {string} char The char to compare with.
              */
            protected _isValEqual(obj: IToken, char: string): boolean;
            /**
              * Check if the "val" property on an IToken
              * is not present in a particular character string.
              * @param {plat.expressions.IToken} obj The IToken
              * with the "val" property to compare.
              * @param {string} char The char to compare with.
              */
            protected _isValUnequal(obj: IToken, char: string): boolean;
            /**
              * Resets all the tokenizer's properties.
              */
            protected _resetTokenizer(): void;
            /**
              * Throws a fatal exception in the case of an error.
              * @param {string} error The error message to throw.
              */
            protected _throwError(error: string): void;
            /**
              * Checks if a single character is numeric.
              * @param {string} char The character to check.
              */
            protected _isNumeric(char: string): boolean;
            /**
              * Checks if a single character is a space.
              * @param {string} char The character to check.
              */
            protected _isSpace(char: string): boolean;
            /**
              * Checks if a single character is alphanumeric.
              * @param {string} char The character to check.
              */
            protected _isAlphaNumeric(char: string): boolean;
            /**
              * Checks if a string has proper JavaScript variable syntax.
              * @param {string} input The string to check.
              * JavaScript variable.
              */
            protected _isStringValidVariable(input: string): boolean;
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
            $Tokenizer: ITokenizer;
            /**
              * A single expression's token representation created by a ITokenizer.
              */
            _tokens: IToken[];
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
            parse(expression: string): IParsedExpression;
            /**
              * If a key is passed in, it clears that single value in the expression cache. If no
              * key is present, the entire expression cache will be cleared.
              * @param {string} key? An optional key that will clear its stored value in the expression
              * cache if passed in.
              */
            clearCache(key?: string): void;
            /**
              * Evaluate the current IToken array.
              * @param {string} expression The JavaScript expression to evaluate.
              * information about the expression as well as a way to evaluate its value.
              */
            protected _evaluate(expression: string): IParsedExpression;
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
              */
            private __findInitialContext(context, aliases, token);
            /**
              * Safely drills down into a specified context with a given token.
              * @param {any} context The context object.
              * @param {string} token The property used to drill into the context.
              */
            private __indexIntoContext(context, token);
            /**
              * Peek at the next IToken.
              * @param {number} index The index before the desired IToken
              * in the array.
              * in the IToken array.
              */
            protected _peek(index: number): IToken;
            /**
              * Look back at the previous IToken.
              * @param {number} index The index after the desired IToken
              * in the array.
              * in the IToken array.
              */
            protected _lookBack(index: number): IToken;
            /**
              * Evaluate and remove the leftover identifiers.
              */
            protected _popRemainingIdentifiers(): void;
            /**
              * Remove duplicate identifiers.
              */
            protected _makeIdentifiersUnique(): void;
            /**
              * Check if the "val" property on an IToken
              * is present in a particular character string.
              * @param {plat.expressions.IToken} obj The IToken
              * with the "val" property to compare.
              * @param {string} char The char to compare with.
              */
            protected _isValEqual(obj: IToken, char: string): boolean;
            /**
              * Check if the "val" property on an IToken
              * is not present in a particular character string.
              * @param {plat.expressions.IToken} obj The IToken
              * with the "val" property to compare.
              * @param {string} char The char to compare with.
              */
            protected _isValUnequal(obj: any, char: string): boolean;
            /**
              * Resets all the parser's properties.
              */
            protected _resetParser(): void;
            /**
              * Throws a fatal exception in the case of an error.
              * @param {string} error The error message to throw.
              */
            protected _throwError(error: string): void;
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
              * @param {IObject<any>} aliases? An object containing resource alias values.
              * All property keys must never begin with '@'.
              */
            evaluate(context?: any, aliases?: IObject<any>): any;
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
              * Contains all the aliases (denoted without '@' as the first character) for this
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
          * The Type for referencing the '$History' injectable as a dependency.
          * Used so that the window.history can be mocked.
          */
        function Location($window?: Window): Location;
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
            $EventManagerStatic: events.IEventManagerStatic;
            /**
              * Reference to the ICompat injectable.
              */
            $Compat: ICompat;
            /**
              * Reference to the IRegex injectable.
              */
            $Regex: expressions.IRegex;
            /**
              * Reference to the Window injectable.
              */
            $window: Window;
            /**
              * Reference to the Location injectable.
              */
            $location: Location;
            /**
              * Reference to the History injectable.
              */
            $history: History;
            /**
              * Reference to the IDom injectable.
              */
            $Dom: ui.IDom;
            /**
              * A unique string identifier.
              */
            uid: string;
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
            initialize(): void;
            /**
              * Sets or gets the current $window.location
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
            /**
              * The event to fire in the case of a URL change. It kicks
              * off a 'urlChanged' direct event notification.
              * @param url The URL to verify whether or not it's cross domain.
              */
            protected _urlChanged(): void;
            /**
              * Checks for the existence of pushState and
              * sets the browser URL accordingly.
              * @param {string} url The URL to set.
              * @param {boolean} replace? Whether or not to replace the
              * current URL in the history.
              */
            protected _setUrl(url: string, replace?: boolean): void;
            /**
              * Formats the URL in the case of HASH routing.
              * @param url The URL to format.
              */
            formatUrl(url: string): string;
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
              * Sets or gets the current $window.location
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
            /**
              * Formats the URL in the case of HASH routing.
              * @param url The URL to format.
              */
            formatUrl(url: string): string;
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
            $ContextManagerStatic: observable.IContextManagerStatic;
            /**
              * Reference to the Document injectable.
              */
            $Document: Document;
            /**
              * Reference to the Window injectable.
              */
            $Window: Window;
            /**
              * Reference to the ICompat injectable.
              */
            $Compat: ICompat;
            /**
              * Reference to the IRegex injectable.
              */
            $Regex: expressions.IRegex;
            /**
              * Reference to the IBrowserConfig injectable.
              */
            $BrowserConfig: IBrowserConfig;
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
            username: string;
            /**
              * The password specified before the domain name in the associated URL.
              */
            password: string;
            /**
              * The origin of the associated URL (its protocol, domain, and port).
              */
            origin: string;
            /**
              * An object containing keyed query arguments from the associated URL.
              */
            query: any;
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
            initialize(url: string): void;
            /**
              * A toString function implementation for the UrlUtils class.
              */
            toString(): string;
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
              * Returns a promise that resolves immediately.
              */
            static resolve(): IThenable<void>;
            /**
              * Returns a promise that resolves with the input value.
              * @param {R} value The value to resolve.
              */
            static resolve<R>(value: R): IThenable<R>;
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
            then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => IThenable<U>): IThenable<U>;
            /**
              * Takes in two methods, called when/if the promise fulfills/rejects.
              * @param {(success: R) => plat.async.IThenable<U>} onFulfilled A method called when/if the promise fulills. If undefined the next
              * onFulfilled method in the promise chain will be called.
              * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
              * onRejected method in the promise chain will be called.
              */
            then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => U): IThenable<U>;
            /**
              * Takes in two methods, called when/if the promise fulfills/rejects.
              * @param {(success: R) => U} onFulfilled A method called when/if the promise fulills. If undefined the next
              * onFulfilled method in the promise chain will be called.
              * @param {(error: any) => plat.async.IThenable<U>} onRejected A method called when/if the promise rejects. If undefined the next
              * onRejected method in the promise chain will be called.
              */
            then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => IThenable<U>): IThenable<U>;
            /**
              * Takes in two methods, called when/if the promise fulfills/rejects.
              * @param {(success: R) => U} onFulfilled A method called when/if the promise fulills. If undefined the next
              * onFulfilled method in the promise chain will be called.
              * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
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
            /**
              * Outputs the Promise as a readable string.
              */
            toString(): string;
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
            new <R>(resolveFunction: IResolveFunction<R>): IThenable<R>;
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
              * Returns a promise that resolves immediately.
              */
            resolve(): IThenable<void>;
            /**
              * Returns a promise that resolves with the input value.
              * @param {R} value The value to resolve.
              */
            resolve<R>(value: R): IThenable<R>;
            /**
              * Returns a promise that rejects with the input value.
              * @param {any} value The value to reject.
              */
            reject(error?: any): IThenable<any>;
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
            clearTimeout: IRemoveListener;
            /**
              * The created XMLHttpRequest
              */
            xhr: XMLHttpRequest;
            /**
              * The JSONP callback name
              */
            jsonpCallback: string;
            /**
              * The plat.web.IBrowser injectable instance
              */
            $Browser: web.IBrowser;
            /**
              * The injectable instance of type Window
              */
            $Window: Window;
            /**
              * The injectable instance of type Document
              */
            $Document: Document;
            /**
              * The configuration for an HTTP Request
              */
            $config: IHttpConfig;
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
            execute<R>(): IAjaxPromise<R>;
            /**
              * Executes an JSONP request and resolves an IAjaxPromise upon completion.
              */
            executeJsonp<R>(): IAjaxPromise<R>;
            /**
              * A wrapper for the XMLHttpRequest's onReadyStateChanged callback.
              * return true in the case of a success and false in the case of
              * an error.
              */
            protected _xhrOnReadyStateChange(): boolean;
            /**
              * The function that initializes and sends the XMLHttpRequest.
              * formatted IAjaxResponse and rejects if there is a problem with an
              * IAjaxError.
              */
            protected _sendXhrRequest(): IAjaxPromise<any>;
            /**
              * Returns a promise that is immediately rejected due to an error.
              * with an IAjaxError
              */
            protected _invalidOptions(): IAjaxPromise<any>;
            /**
              * The function that formats the response from the XMLHttpRequest.
              * @param {string} responseType The user designated responseType
              * @param {boolean} success Signifies if the response was a success
              * the requester.
              */
            protected _formatResponse(responseType: string, success: boolean): IAjaxResponse<any>;
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
            headers?: IObject<any>;
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
          * Describes a type of Promise that fulfills with an IAjaxResponse
          * and can be optionally cancelled.
          */
        class AjaxPromise<R> extends Promise<IAjaxResponse<R>> implements IAjaxPromise<R> {
            /**
              * The Window object.
              */
            $Window: Window;
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
            initialize(http: IHttpRequest): void;
            /**
              * A method to cancel the AJAX call associated with this AjaxPromise.
              */
            cancel(): void;
            /**
              * Takes in two methods, called when/if the promise fulfills/rejects.
              * next then method in the promise chain.
              * @param {(success: plat.async.IAjaxResponse<R>) => plat.async.IAjaxThenable<U>} onFulfilled A method called when/if
              * the promise fulfills. If undefined the next onFulfilled method in the promise chain will be called.
              * @param {(error: plat.async.IAjaxError) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
              * If undefined the next onRejected method in the promise chain will be called.
              */
            then<U>(onFulfilled: (success: IAjaxResponse<R>) => U, onRejected?: (error: IAjaxError) => any): IAjaxThenable<U>;
            /**
              * Takes in two methods, called when/if the promise fulfills/rejects.
              * next then method in the promise chain.
              * @param {(success: plat.async.IAjaxResponse<R>) => plat.async.IAjaxThenable<U>} onFulfilled A method called when/if
              * the promise fulfills. If undefined the next onFulfilled method in the promise chain will be called.
              * @param {(error: plat.async.IAjaxError) => U} onRejected A method called when/if the promise rejects.
              * If undefined the next onRejected method in the promise chain will be called.
              */
            then<U>(onFulfilled: (success: IAjaxResponse<R>) => IThenable<U>, onRejected?: (error: IAjaxError) => IThenable<U>): IAjaxThenable<U>;
            /**
              * Takes in two methods, called when/if the promise fulfills/rejects.
              * next then method in the promise chain.
              * @param {(success: plat.async.IAjaxResponse<R>) => U} onFulfilled A method called when/if the promise fulfills.
              * If undefined the next onFulfilled method in the promise chain will be called.
              * @param {(error: plat.async.IAjaxError) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
              * If undefined the next onRejected method in the promise chain will be called.
              */
            then<U>(onFulfilled: (success: IAjaxResponse<R>) => IThenable<U>, onRejected?: (error: IAjaxError) => any): IAjaxThenable<U>;
            /**
              * Takes in two methods, called when/if the promise fulfills/rejects.
              * next then method in the promise chain.
              * @param {(success: plat.async.IAjaxResponse<R>) => U} onFulfilled A method called when/if the promise fulfills.
              * If undefined the next onFulfilled method in the promise chain will be called.
              * @param {(error: plat.async.IAjaxError) => U} onRejected A method called when/if the promise rejects.
              * If undefined the next onRejected method in the promise chain will be called.
              */
            then<U>(onFulfilled: (success: IAjaxResponse<R>) => U, onRejected?: (error: IAjaxError) => IThenable<U>): IAjaxThenable<U>;
            /**
              * A wrapper method for Promise.then(undefined, onRejected);
              * @param {(error: any) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
              * If undefined the next onRejected method in the promise chain will be called.
              */
            catch<U>(onRejected: (error: any) => IAjaxThenable<U>): IAjaxThenable<U>;
            /**
              * A wrapper method for Promise.then(undefined, onRejected);
              * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
              * onRejected method in the promise chain will be called.
              */
            catch<U>(onRejected: (error: any) => U): IAjaxThenable<U>;
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
          * Describes a type of IPromise that fulfills with an IAjaxResponse
          * and can be optionally cancelled.
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
              * @param {(success: plat.async.IAjaxResponse<R>) => plat.async.IAjaxThenable<U>} onFulfilled A method called when/if
              * the promise fulfills. If undefined the next onFulfilled method in the promise chain will be called.
              * @param {(error: plat.async.IAjaxError) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
              * If undefined the next onRejected method in the promise chain will be called.
              */
            then<U>(onFulfilled: (success: IAjaxResponse<R>) => IAjaxThenable<U>, onRejected?: (error: IAjaxError) => IAjaxThenable<U>): IAjaxThenable<U>;
            /**
              * Takes in two methods, called when/if the promise fulfills/rejects.
              * next then method in the promise chain.
              * @param {(success: plat.async.IAjaxResponse<R>) => plat.async.IAjaxThenable<U>} onFulfilled A method called when/if
              * the promise fulfills. If undefined the next onFulfilled method in the promise chain will be called.
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
            jsonp<R>(options: IJsonpConfig): IAjaxPromise<R>;
            /**
              * Makes an ajax request, specifying responseType: 'json'.
              * @param {plat.async.IHttpConfig} options The IHttpConfig
              * for either the XMLHttpRequest or the JSONP callback.
              * will return an IAjaxResponse object, with the response
              * being a parsed JSON object (assuming valid JSON).
              */
            json<R>(options: IHttpConfig): IAjaxPromise<R>;
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
            jsonp?<R>(options: IJsonpConfig): IAjaxPromise<R>;
            /**
              * Makes an ajax request, specifying responseType: 'json'.
              * @param {plat.async.IHttpConfig} options The IHttpConfig
              * for either the XMLHttpRequest or the JSONP callback.
              * will return an IAjaxResponse object, with the response
              * being a parsed JSON object (assuming valid JSON).
              */
            json?<R>(options: IHttpConfig): IAjaxPromise<R>;
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
            $Promise: async.IPromise;
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
            [key: string]: any;
            /**
              * Reference to HTML5 localStorage.
              */
            protected _storage: Storage;
            /**
              * The constructor for a BaseStorage.
              */
            constructor(storage: Storage);
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
          * An object designed for storing data with a designated storage type.
          */
        interface IBaseStorage {
            [key: string]: any;
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
            constructor();
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
            constructor();
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
              * A set of functions to be fired prior to when a particular observed array is mutated.
              */
            static preArrayListeners: IObject<IObject<{
                (ev: IPreArrayChangeInfo): void;
            }[]>>;
            /**
              * A set of functions to be fired when a particular observed array is mutated.
              */
            static postArrayListeners: IObject<IObject<{
                (ev: IPostArrayChangeInfo<any>): void;
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
              * @param {boolean} writable? Whether or not assignment operators work on the property.
              */
            static defineProperty(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean, writable?: boolean): void;
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
            $Compat: ICompat;
            /**
              * The root context associated with and to be managed by this
              * IContextManager.
              */
            context: any;
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
              * property strings and observes it if not found.
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
            observe(absoluteIdentifier: string, observableListener: IListener): IRemoveListener;
            /**
              * Observes an array and calls the listener when certain functions are called on
              * that array. The watched functions are push, pop, shift, splice, unshift, sort,
              * and reverse.
              * @param {string} uid The unique ID of the object observing the array.
              * @param {(ev: plat.observable.IPreArrayChangeInfo) => void} preListener The callback for prior to when an observed Array
              * function has been called.
              * @param {(ev: plat.observable.IPostArrayChangeInfo<any>) => void} postListener The callback for after when an observed Array
              * function has been called.
              * @param {string} absoluteIdentifier The identifier from the root context used to find the array.
              * @param {Array<any>} array The array to be observed.
              * @param {Array<any>} oldArray The old array to stop observing.
              */
            observeArray(uid: string, preListener: (ev: IPreArrayChangeInfo) => void, postListener: (ev: IPostArrayChangeInfo<any>) => void, absoluteIdentifier: string, array: any[], oldArray: any[]): IRemoveListener;
            /**
              * Disposes the memory for an IContextManager.
              */
            dispose(): void;
            /**
              * Pushes Array mutation listeners and removers.
              * @param {string} uid The unique identifier to store the callback.
              * @param {string} absoluteIdentifier The identifier of the Array being observed.
              * @param {(ev: plat.observable.IPreArrayChangeInfo) => void} listener The Array mutation listener.
              * @param {plat.IObject<plat.IObject<Array<(ev: plat.observable.IPreArrayChangeInfo) => void>>>} arrayListeners
              * The Array to hold the new listener.
              */
            protected _pushArrayListener(uid: string, absoluteIdentifier: string, listener: (ev: IPreArrayChangeInfo) => void, arrayListeners: IObject<IObject<{
                (ev: IPreArrayChangeInfo): void;
            }[]>>): IRemoveListener;
            /**
              * Restores an array to use Array.prototype instead of listener functions.
              * @param {Array<any>} array The array to restore.
              */
            protected _restoreArray(array: any[]): void;
            /**
              * Overwrites an Array's prototype to observe mutation functions.
              * @param {string} absoluteIdentifier The identifier for the Array off context.
              * @param {Array<any>} array The array to overwrite.
              */
            protected _overwriteArray(absoluteIdentifier: string, array: any[]): void;
            /**
              * Gets the immediate context of identifier by splitting on ".".
              * @param {Array<string>} split The string array containing properties used to index into
              * the context.
              */
            protected _getImmediateContext(split: string[]): any;
            /**
              * Gets the immediate context of identifier by splitting on "."
              * and observes the objects along the way.
              * @param {Array<string>} split The identifier's split string array containing properties
              * used to index into the context.
              * @param {string} identifier The identifier being observed.
              */
            protected _observeImmediateContext(split: string[], identifier: string): any;
            /**
              * Obtains the old value and new value of a given context
              * property on a property changed event.
              * @param {Array<string>} split The split identifier of the property that changed.
              * @param {any} newRootContext The new context.
              * @param {any} oldRootContext The old context.
              * property upon a potential context change.
              */
            protected _getValues(split: string[], newRootContext: any, oldRootContext: any): {
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
            protected _notifyChildProperties(identifier: string, newValue: any, oldValue: any): void;
            /**
              * Adds a listener to be fired for a particular identifier.
              * @param {string} absoluteIdentifier The identifier being observed.
              * @param {plat.observable.IListener} observableListener The function and associated unique ID to be fired
              * for this identifier.
              */
            protected _addObservableListener(absoluteIdentifier: string, observableListener: IListener): IRemoveListener;
            /**
              * Observes a property on a given context specified by an identifier.
              * @param {string} identifier The full identifier path for the property being observed.
              * @param {any} immediateContext The object whose property will be observed.
              * @param {string} key The property key for the value on the immediateContext that's
              * being observed.
              */
            protected _define(identifier: string, immediateContext: any, key: string): void;
            /**
              * Intercepts an array function for observation.
              * @param {string} absoluteIdentifier The full identifier path for the observed array.
              * @param {string} method The array method being called.
              * array function.
              */
            protected _overwriteArrayFunction(absoluteIdentifier: string, method: string): (...args: any[]) => any;
            /**
              * Removes a single listener callback
              * @param {string} identifier The identifier attached to the callbacks.
              * @param {plat.observable.IListener} listener The observable listener to remove.
              */
            protected _removeCallback(identifier: string, listener: IListener): void;
            /**
              * Checks if the specified identifier is already being
              * observed in this context.
              * @param {string} identifier The identifier being observed.
              */
            protected _hasIdentifier(identifier: string): boolean;
            /**
              * Executes the listeners for the specified identifier on
              * this context.
              * @param {string} identifier The identifier attached to the callbacks.
              * @param {any} value The new value on this context specified by
              * the identifier.
              * @param {any} oldValue The old value on this context specified by
              * the identifier.
              */
            protected _execute(identifier: string, value: any, oldValue: any): void;
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
              * A set of functions to be fired prior to when a particular observed array is mutated.
              */
            preArrayListeners: IObject<IObject<{
                (ev: IPreArrayChangeInfo): void;
            }[]>>;
            /**
              * A set of functions to be fired when a particular observed array is mutated.
              */
            postArrayListeners: IObject<IObject<{
                (ev: IPostArrayChangeInfo<any>): void;
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
              * @param {boolean} writable? Whether or not assignment operators work on the property.
              */
            defineProperty(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean, writable?: boolean): void;
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
              * @param {(ev: plat.observable.IPreArrayChangeInfo) => void} preListener The callback for prior to when an observed Array
              * function has been called.
              * @param {(ev: plat.observable.IPostArrayChangeInfo<any>) => void} postListener The callback for after when an observed Array
              * function has been called.
              * @param {string} absoluteIdentifier The identifier from the root context used to find the array.
              * @param {Array<any>} array The array to be observed.
              * @param {Array<any>} oldArray The old array to stop observing.
              */
            observeArray(uid: string, preListener: (ev: IPreArrayChangeInfo) => void, postListener: (ev: IPostArrayChangeInfo<any>) => void, absoluteIdentifier: string, array: any[], oldArray: any[]): IRemoveListener;
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
          * An object for Array method mutation info prior to the Array being mutated.
          */
        interface IPreArrayChangeInfo {
            /**
              * The method name that was called. Possible values are:
              * 'push', 'pop', 'reverse', 'shift', 'sort', 'splice',
              * and 'unshift'
              */
            method: string;
            /**
              * The arguments passed into the array function.
              */
            arguments: any[];
        }
        /**
          * An object for Array method mutation info after the Array has been mutated. Takes a
          * generic type to denote the type of array it uses.
          */
        interface IPostArrayChangeInfo<T> extends IPreArrayChangeInfo {
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
            $EventManagerStatic: IEventManagerStatic;
            /**
              * Reference to the IContextManagerStatic injectable.
              */
            $ContextManagerStatic: observable.IContextManagerStatic;
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
              * Whether or not preventDefault() was called on the event. Senders of the
              * event can check this property to know if they should carry out a default
              * action as a result of the event.
              */
            defaultPrevented: boolean;
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
              * Cancels the default action (if there is one) for an event. Does not affect propagation.
              */
            preventDefault(): void;
            /**
              * Call this method to halt the propagation of an upward-moving event.
              * Downward events cannot be stopped with this method.
              */
            stopPropagation(): void;
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
              * Whether or not preventDefault() was called on the event. Senders of the
              * event can check this property to know if they should carry out a default
              * action as a result of the event.
              */
            defaultPrevented: boolean;
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
              * Cancels the default action (if there is one) for an event. Does not affect propagation.
              */
            preventDefault(): void;
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
              */
            static dispatch(name: string, sender: any): void;
            /**
              * Initializes the event, populating its public properties.
              * @param {string} name The name of the event.
              * @param {any} sender The sender of the event.
              */
            initialize(name: string, sender: any): void;
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
              */
            dispatch(name: string, sender: any): void;
        }
        /**
          * Represents a Lifecycle Event. Lifecycle Events are always direct events.
          */
        interface ILifecycleEvent extends IDispatchEventInstance {
            /**
              * Initializes the event, populating its public properties.
              * @param {string} name The name of the event.
              * @param {any} sender The sender of the event.
              */
            initialize(name: string, sender: any): void;
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
            protected static _dispatchUp(event: IDispatchEventInstance, args: any[]): void;
            /**
              * Dispatches the event down the control chain.
              * @param {plat.events.IDispatchEventInstance} event The event being dispatched.
              * @param {Array<any>} args The arguments associated with the event.
              */
            protected static _dispatchDown(event: IDispatchEventInstance, args: any[]): void;
            /**
              * Dispatches the event directly to all listeners.
              * @param {plat.events.IDispatchEventInstance} event The event being dispatched.
              * @param {Array<any>} args The arguments associated with the event.
              */
            protected static _dispatchDirect(event: IDispatchEventInstance, args: any[]): void;
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
            on(uid: string, eventName: "suspend", listener: (ev: ILifecycleEvent) => void, context?: any): IRemoveListener;
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
            on(uid: string, eventName: "online", listener: (ev: ILifecycleEvent) => void, context?: any): IRemoveListener;
            /**
              * Registers a listener for the offline AlmEvent. This event fires when the app's network
              * connection changes to be offline.
              * @param {string} uid A unique id to associate with the object registering the listener.
              * @param {string} eventName='offline' Specifies the listener is for the offline event.
              * @param {(ev: plat.events.ILifecycleEvent) => void} listener The method called when the event is fired.
              * @param {any} context? The context with which to call the listener method.
              */
            on(uid: string, eventName: "offline", listener: (ev: ILifecycleEvent) => void, context?: any): IRemoveListener;
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
            on(uid: string, eventName: "error", listener: (ev: IErrorEvent<Error>) => void, context?: any): IRemoveListener;
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
        uid: string;
        /**
          * The type of a Control.
          */
        type: string;
        /**
          * Specifies the priority of the control. The purpose of
          * this is so that controls like plat-bind can have a higher
          * priority than plat-tap. The plat-bind will be initialized
          * and loaded before plat-tap, meaning it has the first chance
          * to respond to events.
          */
        priority: number;
        /**
          * The parent control that created this control.
          */
        parent: ui.ITemplateControl;
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
        element: HTMLElement;
        /**
          * The attributes object representing all the attributes for a Control's element. All attributes are
          * converted from dash notation to camelCase.
          */
        attributes: ui.IAttributesInstance;
        /**
          * Contains DOM helper methods for manipulating this control's element.
          */
        dom: ui.IDom;
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
        initialize(): void;
        /**
          * The loaded event method for a control. This event is fired after a control has been loaded,
          * meaning all of its children have also been loaded and initial DOM has been created and populated. It is now
          * safe for all controls to access, observe, and modify the context property.
          */
        loaded(): void;
        /**
          * Retrieves all the controls with the specified name.
          * @param {string} name The string name with which to populate the returned controls array.
          */
        getControlsByName(name: string): IControl[];
        /**
          * Retrieves all the controls of the specified type.
          * @param {string} type The type used to find controls (e.g. 'plat-foreach')
          */
        getControlsByType<T extends Control>(type: string): T[];
        /**
          * Retrieves all the controls of the specified type.
          * @param {new () => T} Constructor The constructor used to find controls.
          */
        getControlsByType<T extends Control>(Constructor: new () => T): T[];
        /**
          * Adds an event listener of the specified type to the specified element. Removal of the
          * event is handled automatically upon disposal.
          * @param {EventTarget} element The element to add the event listener to.
          * @param {string} type The type of event to listen to.
          * @param {plat.ui.IGestureListener} listener The listener to fire when the event occurs.
          * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
          * of event propagation.
          */
        addEventListener(element: EventTarget, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        /**
          * Adds an event listener of the specified type to the specified element. Removal of the
          * event is handled automatically upon disposal.
          * @param {EventTarget} element The element to add the event listener to.
          * @param {string}  type The type of event to listen to.
          * @param {EventListener} listener The listener to fire when the event occurs.
          * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
          * of event propagation.
          */
        addEventListener(element: EventTarget, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
        /**
          * Allows a Control to observe any property on its context and receive updates when
          * the property is changed.
          * @param {any} context The immediate parent object containing the property.
          * @param {string} property The property identifier to watch for changes.
          * @param {(value: T, oldValue: T) => void} listener The method called when the property is changed. This method
          * will have its 'this' context set to the control instance.
          */
        observe<T>(context: any, property: string, listener: (value: T, oldValue: T) => void): IRemoveListener;
        /**
          * Allows a Control to observe any property on its context and receive updates when
          * the property is changed.
          * @param {any} context The immediate parent object containing the property.
          * @param {number} property The property identifier to watch for changes.
          * @param {(value: T, oldValue: T) => void} listener The method called when the property is changed. This method
          * will have its 'this' context set to the control instance.
          */
        observe<T>(context: any, property: number, listener: (value: T, oldValue: T) => void): IRemoveListener;
        /**
          * Allows a Control to observe an array and receive updates when certain array-changing methods are called.
          * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method does not watch
          * every item in the array.
          * @param {any} context The immediate parent object containing the array as a property.
          * @param {string} property The array property identifier to watch for changes.
          * @param {(ev: plat.observable.IPreArrayChangeInfo) => void} preListener The method called prior to an array-changing
          * method is called. This method will have its 'this' context set to the control instance.
          * @param {(ev: plat.observable.IPostArrayChangeInfo<T>) => void} postListener The method called after an array-changing
          * method is called. This method will have its 'this' context set to the control instance.
          */
        observeArray<T>(context: any, property: string, preListener: (ev: observable.IPreArrayChangeInfo) => void, postListener: (ev: observable.IPostArrayChangeInfo<T>) => void): IRemoveListener;
        /**
          * Allows a Control to observe an array and receive updates when certain array-changing methods are called.
          * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method does not watch
          * every item in the array.
          * @param {any} context The immediate parent object containing the array as a property.
          * @param {number} property The array property identifier to watch for changes.
          * @param {(ev: plat.observable.IPreArrayChangeInfo) => void} preListener The method called prior to an array-changing
          * method is called. This method will have its 'this' context set to the control instance.
          * @param {(ev: plat.observable.IPostArrayChangeInfo<T>) => void} postListener The method called after an array-changing
          * method is called. This method will have its 'this' context set to the control instance.
          */
        observeArray<T>(context: any, property: number, preListener: (ev: observable.IPreArrayChangeInfo) => void, postListener: (ev: observable.IPostArrayChangeInfo<T>) => void): IRemoveListener;
        /**
          * Parses an expression string and observes any associated identifiers. When an identifier
          * value changes, the listener will be called.
          * @param {string} expression The expression string to watch for changes.
          * @param {(value: any, oldValue: any) => void} listener The listener to call when the expression identifer values change.
          */
        observeExpression(expression: string, listener: (value: any, oldValue: any) => void): IRemoveListener;
        /**
          * Using a IParsedExpression observes any associated identifiers. When an identifier
          * value changes, the listener will be called.
          * @param {plat.expressions.IParsedExpression} expression The expression string to watch for changes.
          * @param {(value: any, oldValue: any) => void} listener The listener to call when the expression identifer values change.
          */
        observeExpression(expression: expressions.IParsedExpression, listener: (value: any, oldValue: any) => void): IRemoveListener;
        /**
          * Evaluates an expression string, using the control.parent.context.
          * @param {string} expression The expression string to evaluate.
          * @param {IObject<any>} aliases Optional alias values to parse with the expression
          */
        evaluateExpression(expression: string, aliases?: IObject<any>): any;
        /**
          * Evaluates an IParsedExpression using the control.parent.context.
          * @param {string} expression The expression string to evaluate.
          * @param {IObject<any>} aliases Optional alias values to parse with the expression
          */
        evaluateExpression(expression: expressions.IParsedExpression, aliases?: IObject<any>): any;
        /**
          * Finds the first instance of the specified property
          * in the parent control chain. Returns undefined if not found.
          * @param {string} property The property identifer
          * property value and the control that it's on.
          */
        findProperty(property: string): IControlProperty;
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
        dispatchEvent(name: string, direction?: 'up', ...args: any[]): void;
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
        dispatchEvent(name: string, direction?: 'down', ...args: any[]): void;
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
        dispatchEvent(name: string, direction?: 'direct', ...args: any[]): void;
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
        dispatchEvent(name: string, direction?: string, ...args: any[]): void;
        /**
          * Registers a listener for a DispatchEvent. The listener will be called when a
          * DispatchEvent is propagating over the control. Any number of listeners can exist
          * for a single event name.
          * @param {string} name The name of the event, cooinciding with the DispatchEvent name.
          * @param {(ev: plat.events.IDispatchEventInstance, ...args: Array<any>) => void} listener The method called when the
          * DispatchEvent is fired.
          */
        on(name: string, listener: (ev: events.IDispatchEventInstance, ...args: any[]) => void): IRemoveListener;
        /**
          * The dispose event is called when a control is being removed from memory. A control should release
          * all of the memory it is using, including DOM event and property listeners.
          */
        dispose(): void;
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
        initialize?(): void;
        /**
          * The loaded event method for a control. This event is fired after a control has been loaded,
          * meaning all of its children have also been loaded and initial DOM has been created and populated. It is now
          * safe for all controls to access, observe, and modify the context property.
          */
        loaded?(): any;
        /**
          * Retrieves all the controls with the specified name.
          * @param {string} name The string name with which to populate the returned controls array.
          */
        getControlsByName?(name: string): IControl[];
        /**
          * Retrieves all the controls of the specified type.
          * @param {string} type The type used to find controls (e.g. 'plat-foreach')
          */
        getControlsByType?<T extends IControl>(type: string): T[];
        /**
          * Retrieves all the controls of the specified type.
          * @param {new () => T} Constructor The constructor used to find controls.
          */
        getControlsByType?<T extends IControl>(Constructor: new () => T): T[];
        /**
          * Adds an event listener of the specified type to the specified element. Removal of the
          * event is handled automatically upon disposal.
          * @param {EventTarget} element The element to add the event listener to.
          * @param {string} type The type of event to listen to.
          * @param {plat.ui.IGestureListener} listener The listener to fire when the event occurs.
          * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
          * of event propagation.
          */
        addEventListener?(element: EventTarget, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        /**
          * Adds an event listener of the specified type to the specified element. Removal of the
          * event is handled automatically upon disposal.
          * @param {EventTarget} element The element to add the event listener to.
          * @param {string}  type The type of event to listen to.
          * @param {EventListener} listener The listener to fire when the event occurs.
          * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
          * of event propagation.
          */
        addEventListener?(element: EventTarget, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
        /**
          * Allows a Control to observe any property on its context and receive updates when
          * the property is changed.
          * @param {any} context The immediate parent object containing the property.
          * @param {string} property The property identifier to watch for changes.
          * @param {(value: T, oldValue: T) => void} listener The method called when the property is changed.
          * This method will have its 'this' context set to the control instance.
          */
        observe?<T>(context: any, property: string, listener: (value: T, oldValue: T) => void): IRemoveListener;
        /**
          * Allows a Control to observe any property on its context and receive updates when
          * the property is changed.
          * @param {any} context The immediate parent object containing the property.
          * @param {number} property The property identifier to watch for changes.
          * @param {(value: T, oldValue: T) => void} listener The method called when the property is changed.
          * This method will have its 'this' context set to the control instance.
          */
        observe?<T>(context: any, property: number, listener: (value: T, oldValue: T) => void): IRemoveListener;
        /**
          * Allows a Control to observe an array and receive updates when certain array-changing methods are called.
          * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method does not watch
          * every item in the array.
          * @param {any} context The immediate parent object containing the array as a property.
          * @param {string} property The array property identifier to watch for changes.
          * @param {(ev: plat.observable.IPreArrayChangeInfo) => void} preListener The method called prior to an array-changing
          * method is called. This method will have its 'this' context set to the control instance.
          * @param {(ev: plat.observable.IPostArrayChangeInfo<T>) => void} postListener The method called after an array-changing
          * method is called. This method will have its 'this' context set to the control instance.
          */
        observeArray?<T>(context: any, property: string, preListener: (ev: observable.IPreArrayChangeInfo) => void, postListener: (ev: observable.IPostArrayChangeInfo<T>) => void): IRemoveListener;
        /**
          * Allows a Control to observe an array and receive updates when certain array-changing methods are called.
          * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method does not watch
          * every item in the array.
          * @param {any} context The immediate parent object containing the array as a property.
          * @param {number} property The array property identifier to watch for changes.
          * @param {(ev: plat.observable.IPreArrayChangeInfo) => void} preListener The method called prior to an array-changing
          * method is called. This method will have its 'this' context set to the control instance.
          * @param {(ev: plat.observable.IPostArrayChangeInfo<T>) => void} postListener The method called after an array-changing
          * method is called. This method will have its 'this' context set to the control instance.
          */
        observeArray?<T>(context: any, property: number, preListener: (ev: observable.IPreArrayChangeInfo) => void, postListener: (ev: observable.IPostArrayChangeInfo<T>) => void): IRemoveListener;
        /**
          * Parses an expression string and observes any associated identifiers. When an identifier
          * value changes, the listener will be called.
          * @param {string} expression The expression string to watch for changes.
          * @param {(value: any, oldValue: any) => void} listener The listener to call when the expression identifer values change.
          */
        observeExpression?(expression: string, listener: (value: any, oldValue: any) => void): IRemoveListener;
        /**
          * Using a IParsedExpression observes any associated identifiers. When an identifier
          * value changes, the listener will be called.
          * @param {plat.expressions.IParsedExpression} expression The expression string to watch for changes.
          * @param {(value: any, oldValue: any) => void} listener The listener to call when the expression identifer values change.
          */
        observeExpression?(expression: expressions.IParsedExpression, listener: (value: any, oldValue: any) => void): IRemoveListener;
        /**
          * Evaluates an expression string, using the control.parent.context.
          * @param {string} expression The expression string to evaluate.
          * @param {IObject<any>} aliases Optional alias values to parse with the expression
          */
        evaluateExpression?(expression: string, aliases?: IObject<any>): any;
        /**
          * Evaluates an IParsedExpression using the control.parent.context.
          * @param {string} expression The expression string to evaluate.
          * @param {IObject<any>} aliases Optional alias values to parse with the expression
          */
        evaluateExpression?(expression: expressions.IParsedExpression, aliases?: IObject<any>): any;
        /**
          * Finds the first instance of the specified property
          * in the parent control chain. Returns undefined if not found.
          * @param {string} property The property identifer
          * property value and the control that it's on.
          */
        findProperty(property: string): IControlProperty;
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
        dispatchEvent?(name: string, direction?: 'up', ...args: any[]): void;
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
        dispatchEvent?(name: string, direction?: 'down', ...args: any[]): void;
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
        dispatchEvent?(name: string, direction?: 'direct', ...args: any[]): void;
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
        dispatchEvent?(name: string, direction?: string, ...args: any[]): void;
        /**
          * Registers a listener for a DispatchEvent. The listener will be called when a
          * DispatchEvent is propagating over the control. Any number of listeners can
          * exist for a single event name.
          * @param {string} name The name of the event, cooinciding with the DispatchEvent name.
          * @param {(ev: plat.events.IDispatchEventInstance, ...args: Array<any>) => void} listener The method called when the
          * DispatchEvent is fired.
          */
        on?(name: string, listener: (ev: events.IDispatchEventInstance, ...args: any[]) => void): IRemoveListener;
        /**
          * The dispose event is called when a control is being removed from memory. A control should release
          * all of the memory it is using, including DOM event and property listeners.
          */
        dispose?(): void;
    }
    /**
      * An object that links a property to a control.
      */
    interface IControlProperty {
        /**
          * The value of the property.
          */
        value: any;
        /**
          * The control on which the property is found.
          */
        control: IControl;
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
        templateControl: ui.ITemplateControl;
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
              * @param {IObject<any>} aliases? An optional alias object containing resource alias values (property keys should
              * not include the '@' character).
              */
            static evaluateExpression(expression: string, control?: ITemplateControl, aliases?: IObject<any>): any;
            /**
              * Evaluates an expression string with a given control and optional control's context and aliases.
              * @param {plat.expressions.IParsedExpression} expression A parsed expression object created using the
              * plat.expressions.IParser injectable.
              * @param {plat.ui.ITemplateControl} control? The control used for evaluation context.
              * @param {IObject<any>} aliases? An optional alias object containing resource alias values (property keys should
              * not include the '@' character).
              */
            static evaluateExpression(expression: expressions.IParsedExpression, control?: ITemplateControl, aliases?: IObject<any>): any;
            /**
              * Given a control and Array of aliases, finds the associated resources and builds a context object containing
              * the values. Returns the object.
              * @param {plat.ui.ITemplateControl} control The control used as the starting point for finding resources.
              * @param {Array<string>} aliases An array of aliases to search for.
              * @param {IObject<any>} resources? An optional resources object to extend, if no resources object is passed in a
              * new one will be created.
              */
            static getResources(control: ITemplateControl, aliases: string[], resources?: IObject<any>): IObject<any>;
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
            priority: number;
            /**
              * The context of an ITemplateControl, used for inheritance and data-binding.
              */
            context: any;
            /**
              * The name of a ITemplateControl if a Name
              * control is involved.
              */
            name: string;
            /**
              * Specifies the absolute path from where the context was created to this IControl's context.
              * Used by the ContextManager for maintaining context parity
              * (e.g. 'context.childContextProperty.grandChildContextProperty').
              */
            absoluteContextPath: string;
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
            resources: IResources;
            /**
              * Flag indicating whether or not the ITemplateControl defines the context property.
              */
            hasOwnContext: boolean;
            /**
              * A string representing the DOM template for this control. If this property is
              * defined on a ITemplateControl then DOM will be created and put in the
              * control's element prior to calling the 'setTemplate' method.
              */
            templateString: string;
            /**
              * A url containing a string representing the DOM template for this control. If this property is
              * defined on a ITemplateControl then DOM will be created and put in the
              * control's element prior to calling the 'setTemplate' method. This property takes
              * precedence over templateString. In the event that both are defined, templateString
              * will be ignored.
              */
            templateUrl: string;
            /**
              * A DocumentFragment representing the innerHTML that existed when this control was instantiated.
              * This property will only contain the innerHTML when either a templateString or templateUrl is
              * defined. Its important to clone this property when injecting it somewhere, else its childNodes
              * will disappear.
              */
            innerTemplate: DocumentFragment;
            /**
              * An IBindableTemplates object used for binding a data context to a template.
              * This is an advanced function of a ITemplateControl.
              */
            bindableTemplates: IBindableTemplates;
            /**
              * An array of child controls. Any controls created by this control can be found in this array. The controls in
              * this array will have reference to this control in their parent property.
              */
            controls: IControl[];
            /**
              * A Node array for managing the ITemplateControl's childNodes in the event that this control
              * replaces its element. This property will only exist/be of use for a ITemplateControl that
              * implements the replaceWith property.
              */
            elementNodes: Node[];
            /**
              * The first node in the ITemplateControl's body. This property will be a Comment node when the
              * control implements replaceWith = null, otherwise it will be null. This property allows an
              * ITemplateControl to add nodes to its body in the event that it replaces its element.
              */
            startNode: Node;
            /**
              * The last node in the ITemplateControl's body. This property will be a Comment node when the
              * control implements the replaceWith property, otherwise it will be null. This property allows a
              * ITemplateControl to add nodes to its body in the event that it replaces its element.
              */
            endNode: Node;
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
            replaceWith: string;
            /**
              * Set to the root ancestor control from which this control inherits its context. This value
              * can be equal to this control.
              */
            root: ITemplateControl;
            /**
              * This event is fired when an ITemplateControl's context property
              * is changed by an ancestor control.
              * @param {any} newValue? The new value of the context.
              * @param {any} oldValue? The old value of the context.
              */
            contextChanged(newValue?: any, oldValue?: any): void;
            /**
              * A method called for ITemplateControls to set their template.
              * During this method a control should ready its template for compilation. Whatever is in the control's
              * element (or elementNodes if replaceWith is implemented) after this method's execution will be compiled
              * and appear on the DOM.
              */
            setTemplate(): void;
            /**
              * Finds the identifier string associated with the given context object. The string returned
              * is the path from a control's context.
              * @param {any} context The object/primitive to locate on the control's context.
              *     // returns 'title.font'
              *     this.getIdentifier(this.context.title.font);
              */
            getIdentifier(context: any): string;
            /**
              * Finds the absolute identifier string associated with the given context object. The string returned
              * is the path from a control's root ancestor's context.
              * @param {any} context The object/primitive to locate on the root control's context.
              */
            getAbsoluteIdentifier(context: any): string;
            /**
              * Finds the associated resources and builds a context object containing
              * the values.
              * @param {Array<string>} aliases An array of aliases to search for.
              * @param {IObject<any>} resources? An optional resources object to extend,
            if no resources object is passed in a new one will be created.
              */
            getResources(aliases: string[], resources?: IObject<any>): IObject<any>;
            /**
              * Starts at a control and searches up its parent chain for a particular resource alias.
              * If the resource is found, it will be returned along with the control instance on which
              * the resource was found.
              * @param {string} alias The alias to search for.
              * found resource along with its corresponding control.
              */
            findResource(alias: string): {
                resource: IResource;
                control: ITemplateControl;
            };
            /**
              * Evaluates an expression string, using the input context or control.context.
              * @param {string} expression The expression string to evaluate.
              * @param {any} context? An optional context with which to parse. If
              * no context is specified, the control.context will be used.
              */
            evaluateExpression(expression: string, context?: any): any;
            /**
              * Evaluates an expression string, using the input context or control.context.
              * @param {plat.expressions.IParsedExpression} expression The previously parsed expression to evaluate.
              * @param {any} context? An optional context with which to parse. If
              * no context is specified, the control.context will be used.
              */
            evaluateExpression(expression: expressions.IParsedExpression, context?: any): any;
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
              * @param {IObject<any>} aliases? An optional alias object containing resource alias values
              */
            evaluateExpression(expression: string, control?: ITemplateControl, aliases?: IObject<any>): any;
            /**
              * Evaluates an expression string with a given control and optional control's context and aliases.
              * @param {plat.expressions.IParsedExpression} expression A parsed expression object created using the
              * plat.expressions.IParser injectable.
              * @param {plat.ui.ITemplateControl} control? The control used for evaluation context.
              * @param {IObject<any>} aliases? An optional alias object containing resource alias values
              */
            evaluateExpression(expression: expressions.IParsedExpression, control?: ITemplateControl, aliases?: IObject<any>): any;
            /**
              * Given a control and Array of aliases, finds the associated resources and builds a context object containing
              * the values. Returns the object.
              * @param {plat.ui.ITemplateControl} control The control used as the starting point for finding resources.
              * @param {Array<string>} aliases An array of aliases to search for.
              * @param {IObject<any>} resources? An optional resources object to extend,
              * if no resources object is passed in a new one will be created.
              */
            getResources(control: ITemplateControl, aliases: string[], resources?: IObject<any>): IObject<any>;
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
            setTemplate?(): void;
            /**
              * This event is fired when an ITemplateControl's context property
              * is changed by an ancestor control.
              * @param {any} newValue? The new value of the context.
              * @param {any} oldValue? The old value of the context.
              */
            contextChanged?(newValue: any, oldValue: any): void;
            /**
              * Finds the identifier string associated with the given context object. The string returned
              * is the path from a control's context.
              * @param {any} context The object/primitive to locate on the control's context.
              *     // returns 'title.font'
              *     this.getIdentifier(this.context.title.font);
              */
            getIdentifier?(context: any): string;
            /**
              * Finds the absolute identifier string associated with the given context object. The string returned
              * is the path from a control's root ancestor's context.
              * @param {any} context The object/primitive to locate on the root control's context.
              */
            getAbsoluteIdentifier?(context: any): string;
            /**
              * Finds the associated resources and builds a context object containing
              * the values.
              * @param {Array<string>} aliases An array of aliases to search for.
              * @param {IObject<any>} resources? An optional resources object to extend,
            if no resources object is passed in a new one will be created.
              */
            getResources?(aliases: string[], resources?: IObject<any>): IObject<any>;
            /**
              * Starts at a control and searches up its parent chain for a particular resource alias.
              * If the resource is found, it will be returned along with the control instance on which
              * the resource was found.
              * @param {string} alias The alias to search for.
              * found resource along with its corresponding control.
              */
            findResource?(alias: string): {
                resource: IResource;
                control: ITemplateControl;
            };
            /**
              * Evaluates an expression string, using the input context or control.context.
              * @param {string} expression The expression string to evaluate.
              * @param {any} context? An optional context with which to parse. If
              * no context is specified, the control.context will be used.
              */
            evaluateExpression?(expression: string, context?: any): any;
            /**
              * Evaluates an expression string, using the input context or control.context.
              * @param {plat.expressions.IParsedExpression} expression The previously parsed expression to evaluate.
              * @param {any} context? An optional context with which to parse. If
              * no context is specified, the control.context will be used.
              */
            evaluateExpression?(expression: expressions.IParsedExpression, context?: any): any;
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
            protected _listeners: {
                (newValue: any, oldValue?: any): void;
            }[];
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
            /**
              * Removes references to the listeners
              * defined externally.
              */
            dispose(): void;
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
          * A control used in a Viewport for simulated page navigation. The
          * control has navigation events that are called when navigating to and from the control.
          */
        class ViewControl extends TemplateControl implements ISupportNavigation {
            /**
              * Recursively disposes a ViewControl and its children.
              * @param {plat.ui.ViewControl} control A control to dispose.
              */
            static dispose(control: ITemplateControl): void;
            /**
              * Returns a new instance of a ViewControl.
              */
            static getInstance(): ViewControl;
            /**
              * Specifies that this control will have its own context, and it should not inherit a context.
              */
            hasOwnContext: boolean;
            /**
              * Initializes any events that you might use in the ViewControl. Automatically subscribes to 'backButtonPressed' when
              * you implement a backButtonPressed function.
              */
            constructor();
            navigator: routing.Navigator;
            canNavigateFrom(): any;
            canNavigateTo(parameters: any, query: any): any;
            navigatingFrom(): any;
            navigatedTo(parameters: any, query: any): any;
        }
        interface ISupportNavigation {
            navigator?: routing.Navigator;
            canNavigateFrom(): any;
            canNavigateTo(parameters: any, query: any): any;
            navigatingFrom(): any;
            navigatedTo(parameters: any, query: any): any;
        }
        /**
          * An extensible class dealing with the creation, deletion, and modification
          * of DOM.
          */
        class Dom implements IDom {
            /**
              * Reference to the IDomEvents injectable.
              */
            $DomEvents: IDomEvents;
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
            serializeHtml(html: string): DocumentFragment;
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
              * Replaces a single class with another class.
              * @param {Element} element The element on which the class name is being toggled.
              * @param {string} oldClass The class name being replaced.
              * @param {string} newClass The class name doing the replacing.
              */
            replaceClass(element: Element, oldClass: string, newClass: string): void;
            /**
              * Returns whether or not an element has a particular class or classes assigned to it.
              * @param {Element} element The element on which the class name is being checked.
              * @param {string} className The class name or space delimited class names to check on the element.
              * specified in the className argument.
              */
            hasClass(element: Element, className: string): boolean;
            /**
              * Retrieves and serializes HTML from an HTML template file using ajax. Will facilitate caching the template
              * as well.
              * @param {string} templateUrl The url where the HTML template is stored.
              * DocumentFragment.
              */
            getTemplate(templateUrl: string): async.IThenable<DocumentFragment>;
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
              * Replaces a single class with another class.
              * @param {Element} element The element on which the class name is being toggled.
              * @param {string} oldClass The class name being replaced.
              * @param {string} newClass The class name doing the replacing.
              */
            replaceClass(element: Element, oldClass: string, newClass: string): void;
            /**
              * Returns whether or not an element has a particular class or classes assigned to it.
              * @param {Element} element The element on which the class name is being checked.
              * @param {string} className The class name or space delimited class names to check on the element.
              * specified in the className argument.
              */
            hasClass(element: Element, className: string): boolean;
            /**
              * Retrieves and serializes HTML from an HTML template file using ajax. Will facilitate caching the template
              * as well.
              * @param {string} templateUrl The url where the HTML template is stored.
              * DocumentFragment.
              */
            getTemplate(templateUrl: string): async.IThenable<DocumentFragment>;
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
              * Determines whether or not a control was created using bindableTemplates.
              * @param {plat.ui.ITemplateControl} control The potential bound control.
              */
            static isBoundControl(control: ITemplateControl): boolean;
            /**
              * Reference to the IResourcesFactory injectable.
              */
            $ResourcesFactory: IResourcesFactory;
            /**
              * Reference to the ITemplateControlFactory injectable.
              */
            $TemplateControlFactory: ITemplateControlFactory;
            /**
              * Reference to the IPromise injectable.
              */
            $Promise: async.IPromise;
            /**
              * Reference to a cache injectable that stores IElementManagers.
              */
            $ManagerCache: storage.ICache<processing.IElementManager>;
            /**
              * Reference to the Document injectable.
              */
            $Document: Document;
            /**
              * Reference to the IElementManagerFactory injectable.
              */
            $ElementManagerFactory: processing.IElementManagerFactory;
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
              * A keyed cache of IElementManagers that represent the roots of compiled templates
              * created by this instance.
              */
            cache: IObject<processing.IElementManager>;
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
            /**
              * Creates the template's bound control and INodeMap and initiates
              * the binding of the INodeMap for a cloned template.
              * @param {string} key The template key.
              * @param {DocumentFragment} template The cached HTML template.
              * @param {string} contextId The relative path from the context used to bind this template.
              * @param {plat.IObject<plat.ui.IResource>} A set of resources to add to the control used to bind this
              * template.
              */
            protected _bindTemplate(key: string, template: DocumentFragment, contextId: string, resources: IObject<IResource>): async.IThenable<DocumentFragment>;
            /**
              * Clones the compiled IElementManager using the newly created
              * INodeMap and binds and loads this control's
              * IElementManager.
              * @param {plat.processing.INodeMap} nodeMap The node map to bind.
              * @param {string} key The template key used to grab the IElementManager.
              * IElementManager is bound and loaded.
              */
            protected _bindNodeMap(nodeMap: processing.INodeMap, key: string): async.IThenable<void>;
            /**
              * Creates the template's compiled, bound control and INodeMap and initiates
              * the compilation of the template.
              * @param {string} key The template key.
              * @param {DocumentFragment} template The HTML template being bound.
              */
            protected _compile(key: string, template: DocumentFragment): void;
            /**
              * Instantiates a new IElementManager for the root of this
              * template and resolves any asynchronous url templates within the template being compiled.
              * @param {plat.ui.ITemplateControl} control The newly created control used to bind the template.
              * @param {plat.processing.INodeMap} nodeMap The newly created node map to bind.
              * @param {string} key The template key.
              */
            protected _compileNodeMap(control: ITemplateControl, nodeMap: processing.INodeMap, key: string): void;
            /**
              * Creates an INodeMap for either a template being compiled or a
              * template being bound.
              * @param {plat.ui.ITemplateControl} uiControl The newly created control used to bind the template.
              * @param {Node} template The template being compiled.
              * @param {string} childContext? A potential child context string identifier.
              */
            protected _createNodeMap(uiControl: ITemplateControl, template: Node, childContext?: string): processing.INodeMap;
            /**
              * Creates a ITemplateControl used for binding either a template being compiled
              * or a template being bound.
              * @param {string} key The template key.
              * @param {DocumentFragment} template The template being compiled or being bound.
              * @param {plat.IObject<plat.ui.IResource>} resources? A set of resources to add to the control used to
              * compile/bind this template.
              */
            protected _createBoundControl(key: string, template: DocumentFragment, resources?: IObject<IResource>): ITemplateControl;
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
            /**
              * Determines whether or not a control was created using bindableTemplates.
              * @param {plat.ui.ITemplateControl} control The potential bound control.
              */
            isBoundControl(control: ITemplateControl): boolean;
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
              * A keyed cache of IElementManagers that represent the roots of compiled templates
              * created by this instance.
              */
            cache: IObject<processing.IElementManager>;
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
            initialize(control: IControl, attributes: IObject<string>): void;
            /**
              * Provides a way to observe an attribute for changes.
              * @param {string} key The attribute to observe for changes (e.g. 'src').
              * @param {plat.IPropertyChangedListener} listener The listener function to be called when the attribute changes.
              */
            observe(key: string, listener: (newValue: any, oldValue?: any) => void): IRemoveListener;
            /**
              * Used to show an attribute has been changed and forces listeners to be fired.
              * @param {string} key The attribute being observed for changes (e.g. 'src').
              * @param {any} newValue The new value of the attribute.
              * @param {any} oldValue The previous value of the attribute.
              */
            protected _attributeChanged(key: string, newValue: any, oldValue: any): void;
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
              * The injectable resource type token.
              */
            static INJECTABLE: string;
            /**
              * The object resource type token.
              */
            static OBJECT: string;
            /**
              * The observable resource type token.
              */
            static OBSERVABLE: string;
            /**
              * The literal resource type token.
              */
            static LITERAL: string;
            /**
              * The function resource type token.
              */
            static FUNCTION: string;
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
            protected static _observeResource(control: ITemplateControl, resource: IResource): void;
            /**
              * Removes observable resource listeners for a specified control.
              * @param {plat.ui.ITemplateControl} control The control whose listeners are being removed.
              */
            protected static _removeListeners(control: ITemplateControl): void;
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
              * The injectable resource type token.
              */
            INJECTABLE: string;
            /**
              * The object resource type token.
              */
            OBJECT: string;
            /**
              * The observable resource type token.
              */
            OBSERVABLE: string;
            /**
              * The literal resource type token.
              */
            LITERAL: string;
            /**
              * The function resource type token.
              */
            FUNCTION: string;
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
            $Document: Document;
            /**
              * Reference to the ICompat injectable.
              */
            $Compat: ICompat;
            /**
              * Whether or not the DomEvents are currently active.
              * They become active at least one element on the current
              * page is listening for a custom event.
              */
            protected _isActive: boolean;
            /**
              * Whether or not the user is currently touching the screen.
              */
            protected _inTouch: boolean;
            /**
              * Whether or not the user is using mouse when touch events are present.
              */
            protected _inMouse: boolean;
            /**
              * An object with keyed subscribers that keep track of all of the
              * events registered on a particular element.
              */
            protected _subscribers: IObject<IEventSubscriber>;
            /**
              * The touch start events defined by this browser.
              */
            protected _startEvents: string[];
            /**
              * The touch move events defined by this browser.
              */
            protected _moveEvents: string[];
            /**
              * The touch end events defined by this browser.
              */
            protected _endEvents: string[];
            /**
              * An object containing the event types for all of the
              * supported gestures.
              */
            protected _gestures: IGestures<string>;
            /**
              * An object containing the number of currently active
              * events of each base type.
              */
            protected _gestureCount: IBaseGestures<number>;
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
              * A function to remove a deferred tap given the case that a tap delay was needed for
              * something such as a double tap to zoom feature.
              */
            private __cancelDeferredTap;
            /**
              * A function for removing a deferred hold event.
              */
            private __cancelDeferredHold;
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
              * The starting place of an initiated swipe gesture.
              */
            private __swipeOrigin;
            /**
              * The user's last move while in touch.
              */
            private __lastMoveEvent;
            /**
              * The user's last touch up.
              */
            private __lastTouchUp;
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
              * An array of subscribers for the swipe gesture.
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
            /**
              * A listener for touch/mouse start events.
              * @param {plat.ui.IPointerEvent} ev The touch start event object.
              */
            protected _onTouchStart(ev: IPointerEvent): boolean;
            /**
              * A listener for touch/mouse move events.
              * @param {plat.ui.IPointerEvent} ev The touch move event object.
              */
            protected _onTouchMove(ev: IPointerEvent): boolean;
            /**
              * A listener for touch/mouse end events.
              * @param {plat.ui.IPointerEvent} ev The touch end event object.
              */
            protected _onTouchEnd(ev: IPointerEvent): boolean;
            /**
              * Clears all temporary states like move and hold events.
              */
            private __clearTempStates();
            /**
              * A function for resetting all values potentially modified during the touch event sequence.
              */
            private __resetTouchEnd();
            /**
              * A function for handling when gestures are canceled via the Browser.
              * @param {plat.ui.IPointerEvent} ev The touch cancel event object.
              */
            private __handleCanceled(ev);
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
              * Searches from the EventTarget up the DOM tree looking for all elements with the
              * registered event types.
              * @param {plat.ui.ICustomElement} eventTarget The current target of the touch event.
              * @param {Array<string>} types An array of the types of events being searched for.
              * with the first found element in the tree and the corresponding event type. Used to trigger the events at their lowest
              * points in the DOM tree.
              */
            private __findFirstSubscribers(eventTarget, types);
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
              * Normalizes the 'buttons' property on an IExetendedEvent.
              * @param {plat.ui.IExtendedEvent} ev The event.
              */
            private __normalizeButtons(ev);
            /**
              * Searches through the input array looking for the primary
              * touch down index.
              * @param {Array<plat.ui.IExtendedEvent>} ev The array of touch event objects
              * to search through.
              * not found.
              */
            private __getTouchIndex(touches);
            /**
              * Grabs the x and y offsets of an event object's target.
              * @param {plat.ui.IExtendedEvent} ev The current event object.
              */
            private __getOffset(ev);
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
              * horiztonal and vertical directions of movement.
              */
            private __getDirection(dx, dy);
            /**
              * Checks to see if a swipe direction has changed to recalculate
              * an origin point.
              * @param {plat.ui.IDirection} direction The current vertical and horiztonal directions of movement.
              */
            private __checkForOriginChanged(direction);
            /**
              * Checks to see if a swipe event has been registered.
              * @param {plat.ui.IDirection} direction The current horizontal and vertical directions of movement.
              * @param {plat.ui.IVelocity} velocity The current horizontal and vertical velocities.
              */
            private __setRegisteredSwipes(direction, velocity);
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
            $Document: Document;
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
          * An extended event object containing coordinate, time, and target info.
          */
        interface IBaseEventProperties {
            /**
              * Indicates which mouse button is being pressed in a mouse event.
              */
            buttons?: number;
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
              * A unique touch identifier.
              */
            identifier?: number;
            /**
              * A timestamp.
              */
            timeStamp?: number;
            /**
              * The target of an Event object.
              */
            target?: EventTarget;
        }
        /**
          * An extended event object potentially containing coordinate and movement information.
          */
        interface IExtendedEvent extends Event {
            /**
              * Indicates which mouse button is being pressed in a mouse event.
              */
            buttons?: number;
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
              * The horizontal and vertical directions associated with this event.
              */
            direction?: IDirection;
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
              * An array containing all recently changed touch points. This should not be present on
              * the triggered custom event.
              */
            changedTouches?: IExtendedEvent[];
            /**
              * A unique touch identifier.
              */
            identifier?: number;
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
        }
        /**
          * The type of event object passed into the listeners for our custom events.
          */
        interface IGestureEvent extends CustomEvent {
            /**
              * Indicates which mouse button is being pressed in a mouse event.
              */
            buttons?: number;
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
              * The horizontal and vertical directions associated with this event.
              */
            direction?: IDirection;
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
          * Describes an object containing information
          * regarding our base custom events.
          */
        interface IBaseGestures<T> {
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
              * The string type|number of events associated with the track event.
              */
            $track?: T;
            /**
              * The string type|number of events associated with the trackend event.
              */
            $trackend?: T;
        }
        /**
          * Describes an object containing information
          * regarding all our custom events.
          */
        interface IGestures<T> extends IBaseGestures<T> {
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
          * Describes an object containing a direction in both the horizontal and vertical directions.
          */
        interface IDirection {
            /**
              * The horizontal, x-direction
              * Can be either "left" or "right".
              */
            x: string;
            /**
              * The vertical, y-direction.
              * Can be either "up" or "down".
              */
            y: string;
            /**
              * The direction whose vector magnitude is the greatest.
              * Can be "left", "right", "up", "down".
              */
            primary: string;
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
                $Compat: ICompat;
                /**
                  * All elements currently being animated.
                  */
                protected _elements: IObject<IAnimatedElement>;
                /**
                  * Animates the element with the defined animation denoted by the key.
                  * @param {Element} element The Element to be animated.
                  * @param {string} key The identifier specifying the type of animation.
                  * @param {any} options? Specified options for the animation.
                  */
                animate(element: Element, key: string, options?: any): IAnimatingThenable;
                /**
                  * Immediately resolves an empty AnimationPromise.
                  * AnimationPromise.
                  */
                resolve(): IAnimatingThenable;
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
                initialize(instance: IBaseAnimation): void;
                /**
                  * A method to cancel the associated animation.
                  */
                cancel(): IAnimatingThenable;
                /**
                  * A method to dispose the associated animation in order to remove any end states
                  * as determined by the animation class itself.
                  */
                dispose(): IAnimatingThenable;
                /**
                  * Takes in two methods, called when/if the promise fulfills.
                  * next then method in the promise chain.
                  * @param {(success: plat.ui.animations.IParentAnimationFn) => U} onFulfilled A method called when/if the promise fulfills.
                  * If undefined the next onFulfilled method in the promise chain will be called.
                  */
                then<U>(onFulfilled: (success: IGetAnimatingThenable) => U): IAnimationThenable<U>;
                /**
                  * Takes in two methods, called when/if the promise fulfills.
                  * next then method in the promise chain.
                  * @param {(success: plat.ui.animations.IParentAnimationFn) => plat.ui.animations.IAnimationThenable<U>} onFulfilled
                  * A method called when/if the promise fulfills.
                  * If undefined the next onFulfilled method in the promise chain will be called.
                  */
                then<U>(onFulfilled: (success: IGetAnimatingThenable) => IAnimationThenable<U>): IAnimationThenable<U>;
                /**
                  * Takes in two methods, called when/if the promise fulfills.
                  * next then method in the promise chain.
                  * @param {(success: plat.ui.animations.IParentAnimationFn) => plat.async.IThenable<U>} onFulfilled
                  * A method called when/if the promise fulfills.
                  * If undefined the next onFulfilled method in the promise chain will be called.
                  */
                then<U>(onFulfilled: (success: IGetAnimatingThenable) => async.IThenable<U>): IAnimationThenable<U>;
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
              * Describes a chaining function that fulfills when the previous link is complete and is
              * able to be caught in the case of an error.
              */
            interface IAnimationThenable<R> extends async.IThenable<R> {
                /**
                  * Initializes the promise, providing it with the {@link plat.ui.animations.IBaseAnimation} instance.
                  * @param {plat.ui.animations.IBaseAnimation} instance The animation instance for this promise.
                  */
                initialize?(instance: IBaseAnimation): void;
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
                $Compat: ICompat;
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
                  * The resolve function for the end of the animation.
                  */
                protected _resolve: () => void;
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
                  * Initializes the element and key properties of this animation and grabs a
                  * reference to its resolve function.
                  * @param {Element} element The element on which the animation will occur.
                  * @param {any} options Specified options for the animation.
                  * animation is complete and end() is called.
                  */
                instantiate(element: Element, options?: any): IAnimatingThenable;
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
                dispose(): void;
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
                isJs: boolean;
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
                $Window: Window;
                /**
                  * The class name added to the animated element.
                  */
                className: string;
                /**
                  * An optional options object that can denote a pseudo element animation.
                  */
                options: ISimpleCssAnimationOptions;
                /**
                  * Adds the class to start the animation.
                  */
                initialize(): void;
                /**
                  * A function denoting the start of the animation.
                  */
                start(): void;
                /**
                  * A function to be called to let it be known the animation is being cancelled.
                  * Replaces the animation class with the animation class and "-end" appended to it
                  * to allow it to jump to final state.
                  */
                cancel(): void;
                /**
                  * A function to remove the end state from the element. Can be useful when combining
                  * multiple types of animations on the same element.
                  */
                dispose(): void;
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
                /**
                  * An optional options object that can denote a pseudo element animation.
                  */
                options: ISimpleCssAnimationOptions;
            }
            /**
              * An interface describing the options for ISimpleCssAnimation.
              */
            interface ISimpleCssAnimationOptions {
                /**
                  * The pseudo element identifier (i.e. '::before' if defined as .red::before).
                  */
                pseudo?: string;
            }
            /**
              * An animation control that fades in an element as defined by the included CSS.
              */
            class FadeIn extends SimpleCssAnimation {
                /**
                  * The class name added to the element fading in.
                  */
                className: string;
            }
            /**
              * An animation control that fades out an element as defined by the included CSS.
              */
            class FadeOut extends SimpleCssAnimation {
                /**
                  * The class name added to the element fading out.
                  */
                className: string;
            }
            /**
              * An animation control that causes an element to enter as defined by the included CSS.
              */
            class Enter extends SimpleCssAnimation {
                /**
                  * The class name added to the entering element.
                  */
                className: string;
            }
            /**
              * An animation control that causes an element to leave as defined by the included CSS.
              */
            class Leave extends SimpleCssAnimation {
                /**
                  * The class name added to the leaving element.
                  */
                className: string;
            }
            /**
              * A simple CSS Animation class that places the 'plat-transition' class on an
              * element, checks for transition properties, and waits for the transition to end.
              */
            class SimpleCssTransition extends CssAnimation implements ISimpleCssTransition {
                /**
                  * Reference to the Window injectable.
                  */
                $Window: Window;
                /**
                  * An optional options object that can denote a pseudo element animation and specify
                  * properties to modify during the transition.
                  */
                options: ISimpleCssTransitionOptions;
                /**
                  * The class name added to the animated element.
                  */
                className: string;
                /**
                  * A JavaScript object containing all modified properties as a result
                  * of this animation. Used in the case of a disposal to reset the changed
                  * properties.
                  */
                protected _modifiedProperties: IObject<string>;
                /**
                  * Denotes whether or not the animation was ever started.
                  */
                protected _started: boolean;
                /**
                  * Adds the class to enable the transition.
                  */
                initialize(): void;
                /**
                  * A function denoting the start of the animation.
                  */
                start(): void;
                /**
                  * A function to be called to let it be known the animation is being cancelled.
                  */
                cancel(): void;
                /**
                  * A function to be called to reset the last transition to its previous state.
                  */
                dispose(): void;
                /**
                  * Animate the element based on the options passed in.
                  * If false, the control should begin cleaning up.
                  */
                protected _animate(): boolean;
            }
            /**
              * An object that allows for transitioned changes to an Element's style based on
              * options passed in.
              */
            interface ISimpleCssTransition extends ISimpleCssAnimation {
                /**
                  * An optional options object that can denote a pseudo element animation and specify
                  * properties to modify during the transition.
                  */
                options: ISimpleCssTransitionOptions;
            }
            interface ISimpleCssTransitionOptions extends ISimpleCssAnimationOptions {
                /**
                  * A JavaScript object with key value pairs for adjusting transition values.
                  * (e.g. { width: '800px' } would set the element's width to 800px.
                  */
                properties: IObject<string>;
            }
        }
        /**
          * Holds classes and interfaces related to UI control components in platypus.
          */
        module controls {
            class Viewport extends TemplateControl implements routing.ISupportRouteNavigation {
                protected $RouterStatic: typeof routing.Router;
                protected $Promise: async.IPromise;
                protected $Injector: typeof dependency.Injector;
                protected $ElementManagerFactory: processing.IElementManagerFactory;
                protected $Document: Document;
                /**
                  * Reference to an injectable that caches IElementManagers.
                  */
                protected $ManagerCache: storage.ICache<processing.IElementManager>;
                /**
                  * Reference to the IAnimator injectable.
                  */
                protected $Animator: animations.IAnimator;
                /**
                  * A promise used for disposing the end state of the previous animation prior to starting a new one.
                  */
                protected _animationPromise: animations.IAnimationThenable<animations.IGetAnimatingThenable>;
                navigator: routing.Navigator;
                router: routing.Router;
                parentRouter: routing.Router;
                controls: ViewControl[];
                nextInjector: dependency.IInjector<ViewControl>;
                nextView: ViewControl;
                initialize(): void;
                setTemplate(): void;
                canNavigateTo(routeInfo: routing.IRouteInfo): async.IThenable<boolean>;
                canNavigateFrom(): async.IThenable<boolean>;
                navigateTo(routeInfo: routing.IRouteInfo): async.IThenable<void>;
                navigateFrom(): async.IThenable<void>;
                dispose(): void;
                protected _createNodeMap(injector: dependency.IInjector<ViewControl>): processing.INodeMap;
                protected _getParentViewport(): Viewport;
            }
            /**
              * A TemplateControl for easily reusing a
              * defined HTML template.
              */
            class Template extends TemplateControl {
                /**
                  * Reference to the IPromise injectable.
                  */
                $Promise: async.IPromise;
                /**
                  * Reference to an injectable for storing HTML templates.
                  */
                $TemplateCache: storage.ITemplateCache;
                /**
                  * Reference to the Document injectable.
                  */
                $Document: Document;
                /**
                  * Removes the <plat-template> node from the DOM
                  */
                replaceWith: string;
                /**
                  * The evaluated plat-options object.
                  */
                options: observable.IObservableProperty<ITemplateOptions>;
                /**
                  * The unique ID used to reference a particular
                  * template.
                  */
                protected _id: string;
                /**
                  * The optional URL associated with this
                  * particular template.
                  */
                protected _url: string;
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
                initialize(): void;
                /**
                  * Decides if this is a template definition or
                  * a template instance.
                  */
                loaded(): void;
                /**
                  * Removes the template from the template cache.
                  */
                dispose(): void;
                /**
                  * Determines whether a URL or innerHTML is being used,
                  * creates the bindable template, and stores the template
                  * in a template cache for later use.
                  */
                protected _initializeTemplate(): void;
                /**
                  * Waits for the template promise to resolve, then initializes
                  * the binding of the bindable template and places it into the
                  * DOM.
                  * @param {plat.async.IThenable<plat.ui.controls.Template>} templatePromise The promise
                  * associated with the first instance of the control with this ID.
                  */
                protected _waitForTemplateControl(templatePromise: async.IThenable<Template>): void;
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
                setTemplate(): void;
                /**
                  * Places the saved innerHTML back into the DOM.
                  */
                loaded(): void;
            }
            /**
              * A TemplateControl for repeating a block of
              * DOM nodes bound to an array.
              */
            class ForEach extends TemplateControl {
                /**
                  * Reference to the IAnimator injectable.
                  */
                $Animator: animations.IAnimator;
                /**
                  * Reference to the IPromise injectable.
                  */
                $Promise: async.IPromise;
                /**
                  * The required context of the control (must be of type Array).
                  */
                context: any[];
                /**
                  * The load priority of the control (needs to load before a Bind control).
                  */
                priority: number;
                /**
                  * The child controls of the control. All will be of type ITemplateControl.
                  */
                controls: ITemplateControl[];
                /**
                  * A Promise that fulfills when the items are loaded.
                  */
                itemsLoaded: async.IThenable<void>;
                /**
                  * The options for the ForEach control.
                  */
                options: observable.IObservableProperty<IForEachOptions>;
                /**
                  * Used to hold the alias tokens for the built-in foreach aliases. You
                  * can overwrite these with the options for
                  * the ForEach control.
                  */
                protected _aliases: IForEachAliasOptions;
                /**
                  * The container to which items will be added.
                  */
                protected _container: HTMLElement;
                /**
                  * The node length of each item's childNodes (innerHTML).
                  * For the ForEach it should be a
                  * single constant number.
                  */
                protected _blockLength: any;
                /**
                  * An array to aggregate all current animation promises.
                  */
                protected _currentAnimations: animations.IAnimationThenable<any>[];
                /**
                  * Whether or not the Array listener has been set.
                  */
                private __listenerSet;
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
                setTemplate(): void;
                /**
                  * Re-syncs the ForEach child controls and DOM with the new
                  * array.
                  * @param {Array<any>} newValue? The new Array
                  * @param {Array<any>} oldValue? The old Array
                  */
                contextChanged(newValue?: any[], oldValue?: any[]): void;
                /**
                  * Observes the Array context for changes and adds initial items to the DOM.
                  */
                loaded(): void;
                /**
                  * Removes any potentially held memory.
                  */
                dispose(): void;
                /**
                  * Sets the alias tokens to use for all the items in the ForEach context array.
                  */
                protected _setAliases(): void;
                /**
                  * Adds new items to the control's element when items are added to
                  * the array.
                  * @param {number} numberOfItems The number of items to add.
                  * @param {number} index The point in the array to start adding items.
                  * @param {boolean} animate? Whether or not to animate the new items
                  */
                protected _addItems(numberOfItems: number, index: number, animate?: boolean): async.IThenable<void>;
                /**
                  * Adds an Array of items to the element without animating.
                  * @param {Array<Node>} items The Array of items to add.
                  */
                protected _appendItems(items: Node[]): void;
                /**
                  * Adds an item to the control's element animating its elements.
                  * @param {DocumentFragment} item The HTML fragment representing a single item.
                  * @param {string} key The animation key/type.
                  */
                protected _appendAnimatedItem(item: DocumentFragment, key: string): void;
                /**
                  * Removes items from the control's element.
                  * @param {number} numberOfItems The number of items to remove.
                  */
                protected _removeItems(numberOfItems: number): void;
                /**
                  * Removes an item from the control's element.
                  */
                protected _removeItem(): void;
                /**
                  * Binds the item to a template at that index.
                  * the a DocumentFragment that represents an item.
                  */
                protected _bindItem(index: number): async.IThenable<DocumentFragment>;
                /**
                  * Sets the corresponding block length for animation.
                  */
                protected _setBlockLength(templates: Node[]): void;
                /**
                  * Updates the control's children resource objects when
                  * the array changes.
                  */
                protected _updateResources(): void;
                /**
                  * Sets a listener for the changes to the array.
                  */
                protected _setListener(): void;
                /**
                  * Receives an event prior to a method being called on an array and maps the array
                  * method to its associated pre-method handler.
                  * @param {plat.observable.IPreArrayChangeInfo} ev The Array mutation event information.
                  */
                protected _preprocessEvent(ev: observable.IPreArrayChangeInfo): void;
                /**
                  * Receives an event when a method has been called on an array and maps the array
                  * method to its associated method handler.
                  * @param {plat.observable.IPostArrayChangeInfo<any>} ev The Array mutation event information.
                  */
                protected _executeEvent(ev: observable.IPostArrayChangeInfo<any>): void;
                /**
                  * Returns a resource alias object for an item in the array. The
                  * resource object contains index:number, even:boolean, odd:boolean,
                  * first:boolean, and last:boolean.
                  * @param {number} index The index used to create the resource aliases.
                  */
                protected _getAliases(index: number): IObject<IResource>;
                /**
                  * Handles items being pushed into the array.
                  * @param {plat.observable.IPostArrayChangeInfo<any>} ev The Array mutation event information.
                  */
                protected _push(ev: observable.IPostArrayChangeInfo<any>): void;
                /**
                  * Handles items being popped off the array.
                  * @param {plat.observable.IPostArrayChangeInfo<any>} ev The Array mutation event information.
                  */
                protected _pop(ev: observable.IPostArrayChangeInfo<any>): void;
                /**
                  * Handles items being shifted off the array.
                  * @param {plat.observable.IPreArrayChangeInfo} ev The Array mutation event information.
                  */
                protected _preshift(ev: observable.IPreArrayChangeInfo): void;
                /**
                  * Handles items being shifted off the array.
                  * @param {plat.observable.IPostArrayChangeInfo<any>} ev The Array mutation event information.
                  */
                protected _shift(ev: observable.IPostArrayChangeInfo<any>): void;
                /**
                  * Handles adding/removing items when an array is spliced.
                  * @param {plat.observable.IPreArrayChangeInfo} ev The Array mutation event information.
                  */
                protected _presplice(ev: observable.IPreArrayChangeInfo): void;
                /**
                  * Handles adding/removing items when an array is spliced.
                  * @param {plat.observable.IPostArrayChangeInfo<any>} ev The Array mutation event information.
                  */
                protected _splice(ev: observable.IPostArrayChangeInfo<any>): void;
                /**
                  * Handles animating items being unshifted into the array.
                  * @param {plat.observable.IPreArrayChangeInfo} ev The Array mutation event information.
                  */
                protected _preunshift(ev: observable.IPreArrayChangeInfo): void;
                /**
                  * Handles items being unshifted into the array.
                  * @param {plat.observable.IPostArrayChangeInfo<any>} ev The Array mutation event information.
                  */
                protected _unshift(ev: observable.IPostArrayChangeInfo<any>): void;
                /**
                  * Handles when the array is sorted.
                  * @param {plat.observable.IPostArrayChangeInfo<any>} ev The Array mutation event information.
                  */
                protected _sort(ev: observable.IPostArrayChangeInfo<any>): void;
                /**
                  * Handles when the array is reversed.
                  * @param {plat.observable.IPostArrayChangeInfo<any>} ev The Array mutation event information.
                  */
                protected _reverse(ev: observable.IPostArrayChangeInfo<any>): void;
                /**
                  * Animates the indicated items.
                  * @param {number} startIndex The starting index of items to animate.
                  * @param {number} numberOfItems The number of consecutive items to animate.
                  * @param {string} key The animation key/type.
                  * @param {boolean} clone? Whether to clone the items and animate the clones or simply animate the items itself.
                  * @param {boolean} cancel? Whether or not the animation should cancel all current animations.
                  * Defaults to true.
                  */
                protected _animateItems(startIndex: number, numberOfItems: number, key: string, clone?: boolean, cancel?: boolean): async.IThenable<void>;
                /**
                  * Animates a block of elements.
                  * @param {number} startNode The starting childNode of the ForEach to animate.
                  * @param {number} endNode The ending childNode of the ForEach to animate.
                  * @param {string} key The animation key/type.
                  * @param {boolean} clone? Whether to clone the items and animate the clones or simply animate the items itself.
                  * @param {boolean} cancel? Whether or not the animation should cancel all current animations.
                  * Defaults to true.
                  */
                protected _initiateAnimation(startNode: number, endNode: number, key: string, clone?: boolean, cancel?: boolean): async.IThenable<void>;
                /**
                  * Handles the animation of a block of elements.
                  * @param {number} startNode The starting childNode of the ForEach to animate
                  * @param {number} endNode The ending childNode of the ForEach to animate
                  * @param {string} key The animation key/type
                  * @param {boolean} clone Whether to clone the items and animate the clones or simply animate the items itself.
                  */
                private __handleAnimation(startNode, endNode, key, clone);
            }
            /**
              * The options object for the
              * ForEach control.
              */
            interface IForEachOptions {
                /**
                  * Used to specify alternative alias tokens for the built-in foreach aliases.
                  */
                aliases?: IForEachAliasOptions;
            }
            /**
              * The alias tokens for the ForEach options object for the
              * ForEach control.
              */
            interface IForEachAliasOptions extends IObject<string> {
                /**
                  * Used to specify an alternative alias for the index in a ForEach
                  * item template.
                  */
                index?: string;
                /**
                  * Used to specify an alternative alias for the even in a ForEach
                  * item template.
                  */
                even?: string;
                /**
                  * Used to specify an alternative alias for the odd in a ForEach
                  * item template.
                  */
                odd?: string;
                /**
                  * Used to specify an alternative alias for the first in a ForEach
                  * item template.
                  */
                first?: string;
                /**
                  * Used to specify an alternative alias for the last in a ForEach
                  * item template.
                  */
                last?: string;
            }
            /**
              * A TemplateControl for adding HTML to the
              * DOM through bound context strings.
              */
            class Html extends TemplateControl {
                /**
                  * Loads the DOM with the new HTML String.
                  */
                contextChanged(): void;
                /**
                  * Loads the context string as the innerHTML of the element.
                  */
                loaded(): void;
            }
            /**
              * A TemplateControl for binding an HTML select element
              * to an Array context.
              */
            class Select extends TemplateControl {
                /**
                  * Reference to the IPromise injectable.
                  */
                $Promise: async.IPromise;
                /**
                  * Reference to the Document injectable.
                  */
                $Document: Document;
                /**
                  * Replaces the <plat-select> node with
                  * a <select> node.
                  */
                replaceWith: string;
                /**
                  * The load priority of the control (needs to load before a Bind control).
                  */
                priority: number;
                /**
                  * The required context of the control (must be of type Array).
                  */
                context: any[];
                /**
                  * An object that keeps track of unique
                  * optgroups.
                  */
                groups: IObject<Element>;
                /**
                  * The evaluated plat-options object.
                  */
                options: observable.IObservableProperty<ISelectOptions>;
                /**
                  * A Promise that will fulfill whenever all items are loaded.
                  */
                itemsLoaded: async.IThenable<void>;
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
                setTemplate(): void;
                /**
                  * Re-observes the new array context and modifies
                  * the options accordingly.
                  * @param {Array<any>} newValue? The new array context.
                  * @param {Array<any>} oldValue? The old array context.
                  */
                contextChanged(newValue?: any[], oldValue?: any[]): void;
                /**
                  * Observes the new array context and adds
                  * the options accordingly.
                  */
                loaded(): void;
                /**
                  * Removes any potentially held memory.
                  */
                dispose(): void;
                /**
                  * Sets a listener for the changes to the array.
                  */
                protected _setListener(): void;
                /**
                  * Receives an event when a method has been called on an array and maps the array
                  * method to its associated method handler.
                  * @param {plat.observable.IPostArrayChangeInfo<any>} ev The Array mutation event information.
                  */
                protected _executeEvent(ev: observable.IPostArrayChangeInfo<any>): void;
                /**
                  * Adds the options to the select element.
                  * @param {number} numberOfItems The number of items to add.
                  * @param {number} length The current index of the next
                  * set of items to add.
                  */
                protected _addItems(numberOfItems: number, length: number): async.IThenable<void>;
                /**
                  * The callback used to add an option after
                  * its template has been bound.
                  * @param {number} index The current index of the item being added.
                  * @param {any} item The item being added.
                  * @param {DocumentFragment} optionClone The bound DocumentFragment to be
                  * inserted into the DOM.
                  * or optgroup has successfully be inserted.
                  */
                protected _insertOptions(index: number, item: any, optionClone: DocumentFragment): async.IThenable<any>;
                /**
                  * Removes the specified option item from the DOM.
                  * @param {number} index The control index to remove.
                  */
                protected _removeItem(index: number): void;
                /**
                  * Removes a specified number of elements.
                  * @param {number} numberOfItems The number of items
                  * to remove.
                  */
                protected _removeItems(numberOfItems: number): void;
                /**
                  * The function called when an item has been removed
                  * from the array context.
                  * @param {plat.observable.IPostArrayChangeInfo<any>} ev The array mutation object
                  */
                protected _itemRemoved(ev: observable.IPostArrayChangeInfo<any>): void;
                /**
                  * Resets the select element by removing all its
                  * items and adding them back.
                  */
                protected _resetSelect(): void;
                /**
                  * The function called when an element is pushed to
                  * the array context.
                  * @param {plat.observable.IPostArrayChangeInfo<any>} ev The array mutation object
                  */
                protected _push(ev: observable.IPostArrayChangeInfo<any>): void;
                /**
                  * The function called when an item is popped
                  * from the array context.
                  * @param {plat.observable.IPostArrayChangeInfo<any>} ev The array mutation object
                  */
                protected _pop(ev: observable.IPostArrayChangeInfo<any>): void;
                /**
                  * The function called when an item is shifted
                  * from the array context.
                  * @param {plat.observable.IPostArrayChangeInfo<any>} ev The array mutation object
                  */
                protected _shift(ev: observable.IPostArrayChangeInfo<any>): void;
                /**
                  * The function called when items are spliced
                  * from the array context.
                  * @param {plat.observable.IPostArrayChangeInfo<any>} ev The array mutation object
                  */
                protected _splice(ev: observable.IPostArrayChangeInfo<any>): void;
                /**
                  * The function called when an item is unshifted
                  * onto the array context.
                  * @param {plat.observable.IPostArrayChangeInfo<any>} ev The array mutation object
                  */
                protected _unshift(ev: observable.IPostArrayChangeInfo<any>): void;
                /**
                  * The function called when the array context
                  * is sorted.
                  * @param {plat.observable.IPostArrayChangeInfo<any>} ev The array mutation object
                  */
                protected _sort(ev: observable.IPostArrayChangeInfo<any>): void;
                /**
                  * The function called when the array context
                  * is reversed.
                  * @param {plat.observable.IPostArrayChangeInfo<any>} ev The array mutation object
                  */
                protected _reverse(ev: observable.IPostArrayChangeInfo<any>): void;
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
                $Animator: animations.IAnimator;
                /**
                  * Reference to the IPromise injectable.
                  */
                $Promise: async.IPromise;
                /**
                  * The evaluated plat-options object.
                  */
                options: observable.IObservableProperty<IIfOptions>;
                /**
                  * The Comment used to hold the place of the plat-if element.
                  */
                commentNode: Comment;
                /**
                  * The DocumentFragment that stores the plat-if element when hidden.
                  */
                fragmentStore: DocumentFragment;
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
                  * A promise that resolves when the template has been bound.
                  */
                private __initialBind;
                /**
                  * The constructor for a If. Creates the
                  * DocumentFragment for holding the conditional nodes.
                  */
                constructor();
                /**
                  * Checks the options and initializes the
                  * evaluation.
                  */
                contextChanged(): async.IThenable<void>;
                /**
                  * Creates a bindable template with the control element's childNodes (innerHTML).
                  */
                setTemplate(): void;
                /**
                  * Sets the visibility to true if no options are
                  * defined, kicks off the evaluation, and observes
                  * the options for changes.
                  */
                loaded(): async.IThenable<void>;
                /**
                  * Stops listening to the options for changes.
                  */
                dispose(): void;
                /**
                  * Checks the condition and decides
                  * whether or not to add or remove
                  * the node from the DOM.
                  */
                protected _setter(options: IIfOptions): async.IThenable<void>;
                /**
                  * Adds the conditional nodes to the DOM.
                  */
                protected _addItem(): async.IThenable<void>;
                /**
                  * Animates the template as it enters the DOM.
                  */
                protected _animateEntrance(): animations.IAnimationThenable<void>;
                /**
                  * Removes the conditional nodes from the DOM.
                  */
                protected _removeItem(): async.IThenable<void>;
                /**
                  * Animates the template as it leaves the DOM.
                  */
                protected _animateLeave(): animations.IAnimationThenable<void>;
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
            class Link extends TemplateControl {
                /**
                  * Replaces the Link's element with a native anchor tag.
                  */
                replaceWith: string;
                /**
                  * The IRouterStatic injectable instance
                  */
                $RouterStatic: typeof routing.Router;
                /**
                  * The Injector injectable instance
                  */
                $InjectorStatic: typeof dependency.Injector;
                /**
                  * The IBrowser injectable instance
                  */
                $browser: web.IBrowser;
                /**
                  * The router associated with this link.
                  */
                router: routing.Router;
                /**
                  * The options for Link, if ignore is true, anchor will ignore changing the url.
                  */
                options: observable.IObservableProperty<ILinkOptions>;
                /**
                  * The control's anchor element.
                  */
                element: HTMLAnchorElement;
                /**
                  * The a method for removing the click event listener for this control's element.
                  */
                removeClickListener: IRemoveListener;
                constructor();
                /**
                  * Prevents default on the anchor tag if the href attribute is left empty, also determines internal links.
                  */
                initialize(): void;
                /**
                  * Returns a click event listener. Also handles disposing of the listener.
                  */
                getListener(element: HTMLAnchorElement): (ev: Event) => void;
                /**
                  * Calls to normalize the href for internal links.
                  */
                loaded(): void;
                /**
                  * Sets the element href to the one formed using the associated options.
                  */
                setHref(): void;
                /**
                  * Determines the href based on the input options.
                  */
                getHref(): string;
            }
            interface ILinkOptions extends routing.INavigateOptions {
                view: any;
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
            $ElementManagerFactory: IElementManagerFactory;
            /**
              * Reference to the ITextManagerFactory injectable.
              */
            $TextManagerFactory: ITextManagerFactory;
            /**
              * Reference to the ICommentManagerFactory injectable.
              */
            $CommentManagerFactory: ICommentManagerFactory;
            /**
              * Reference to a cache injectable that stores IElementManagers.
              */
            $ManagerCache: storage.ICache<INodeManager>;
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
            protected _compileNodes(nodes: Node[], manager: IElementManager): void;
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
              * @param {Array<plat.expressions.IParsedExpression>} expressions An Array of
              * IParsedExpressions to observe.
              * @param {plat.ui.ITemplateControl} control The ITemplateControl associated
              * to the identifiers.
              * @param {(...args: Array<any>) => void} listener The listener to call when any identifier property changes.
              */
            static observeExpressions(expressions: expressions.IParsedExpression[], control: ui.ITemplateControl, listener: (...args: any[]) => void): void;
            /**
              * A regular expression for finding markup
              */
            protected static _markupRegex: RegExp;
            /**
              * A regular expression for finding newline characters.
              */
            protected static _newLineRegex: RegExp;
            /**
              * Wraps constant text as a static IParsedExpression.
              * @param text The text to wrap into a static expression.
              */
            protected static _wrapExpression(text: string): expressions.IParsedExpression;
            /**
              * Given an IParsedExpression array, creates an array of unique identifers
              * to use with binding. This allows us to avoid creating multiple listeners for the identifier and node.
              * @param {Array<plat.expressions.IParsedExpression>} expressions An array of parsed expressions to search for identifiers.
              * one way binding as well as an array of unique identifiers for one time binding.
              */
            private static __findUniqueIdentifiers(expressions);
            /**
              * Takes in an identifier and returns an object containing both its converted absolute path and the
              * ContextManager needed to observe it.
              * @param {string} identifier The identifier looking to be observed.
              * @param {plat.ui.ITemplateControl} control The ITemplateControl associated
              * to the identifiers.
              * identifier.
              */
            private static __getObservationDetails(identifier, control);
            /**
              * The type of INodeManager.
              */
            type: string;
            /**
              * The INodeMap for this INodeManager.
              * Contains the compiled Node.
              */
            nodeMap: INodeMap;
            /**
              * The parent IElementManager.
              */
            parent: IElementManager;
            /**
              * Whether or not this INodeManager is a clone.
              */
            isClone: boolean;
            /**
              * Initializes the manager's properties.
              * @param {plat.processing.INodeMap} nodeMap The mapping associated with this manager. We have to use an
              * Used to treat all INodeManagers the same.
              * @param {plat.processing.IElementManager} parent The parent IElementManager.
              */
            initialize(nodeMap: INodeMap, parent: IElementManager): void;
            /**
              * Retrieves the parent control associated with the parent manager.
              */
            getParentControl(): ui.ITemplateControl;
            /**
              * Clones this INodeManager with the new node.
              * @param {Node} newNode The new node associated with the new manager.
              * @param {plat.processing.IElementManager} parentManager The parent
              * IElementManager for the clone.
              */
            clone(newNode: Node, parentManager: IElementManager): number;
            /**
              * The function used for data-binding a data context to the DOM.
              */
            bind(): void;
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
              * @param {Array<plat.expressions.IParsedExpression>} expressions An Array of
              * IParsedExpressions to observe.
              * @param {plat.ui.ITemplateControl} control The ITemplateControl associated
              * to the identifiers.
              * @param {(...args: Array<any>) => void} listener The listener to call when any identifier property changes.
              */
            observeExpressions(expressions: expressions.IParsedExpression[], control: ui.ITemplateControl, listener: (...args: any[]) => void): void;
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
            initialize?(nodeMap: INodeMap, parent: IElementManager): void;
            /**
              * Retrieves the parent control associated with the parent manager.
              */
            getParentControl?(): ui.ITemplateControl;
            /**
              * Clones this INodeManager with the new node.
              * @param {Node} newNode The new node associated with the new manager.
              * @param {plat.processing.IElementManager} parentManager The parent
              * IElementManager for the clone.
              */
            clone?(newNode: Node, parentManager: IElementManager): number;
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
            protected static _collectAttributes(attributes: NamedNodeMap): INodeMap;
            /**
              * Used to copy the attribute nodes during the cloning process.
              * @param {Array<plat.processing.INode>} nodes The compiled INodes
              * to be cloned.
              */
            protected static _copyAttributeNodes(nodes: INode[]): INode[];
            /**
              * Clones an INode with a new node.
              * @param {plat.processing.INode} sourceNode The original INode.
              * @param {Node} node The new node used for cloning.
              * @param {plat.ui.ITemplateControl} newControl? An optional new control to associate with the cloned node.
              */
            protected static _cloneNode(sourceNode: INode, node: Node, newControl?: ui.ITemplateControl): INode;
            /**
              * Clones an INodeMap with a new element.
              * @param {plat.processing.INodeMap} sourceMap The original INodeMap.
              * @param {Element} element The new Element used for cloning.
              * @param {plat.ui.ITemplateControl} parent The ITemplateControl associated
              * with the parent IElementManager.
              * @param {plat.ui.ITemplateControl} newControl? An optional new ITemplateControl
              * to associate with the element.
              */
            protected static _cloneNodeMap(sourceMap: INodeMap, element: Element, parent: ui.ITemplateControl, newControl?: ui.ITemplateControl): INodeMap;
            /**
              * Reference to the IPromise injectable.
              */
            $Promise: async.IPromise;
            /**
              * Reference to the ICompiler injectable.
              */
            $Compiler: ICompiler;
            /**
              * Reference to the IContextManagerStatic injectable.
              */
            $ContextManagerStatic: observable.IContextManagerStatic;
            /**
              * Reference to the ICommentManagerFactory injectable.
              */
            $CommentManagerFactory: ICommentManagerFactory;
            /**
              * Reference to the IControlFactory injectable.
              */
            $ControlFactory: IControlFactory;
            /**
              * Reference to the ITemplateControlFactory injectable.
              */
            $TemplateControlFactory: ui.ITemplateControlFactory;
            /**
              * Reference to the IBindableTemplatesFactory injectable.
              */
            $BindableTemplatesFactory: ui.IBindableTemplatesFactory;
            /**
              * The child managers for this manager.
              */
            children: INodeManager[];
            /**
              * Specifies the type for this INodeManager.
              * It's value is "element".
              */
            type: string;
            /**
              * Specifies whether or not this manager has a ITemplateControl which has a
              * replaceWith property set to null or empty string.
              */
            replace: boolean;
            /**
              * Indicates whether the ITemplateControl for this manager has its own context
              * or inherits it from a parent.
              */
            hasOwnContext: boolean;
            /**
              * The length of a replaced control, indicates the number of nodes to slice
              * out of the parent's childNodes.
              */
            replaceNodeLength: number;
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
            bind(): IControl[];
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
              * Binds context to the DOM and loads controls.
              * child manager's controls have been bound and loaded.
              */
            bindAndLoad(): async.IThenable<void>;
            /**
              * Observes the root context for controls that specify their own context, and initiates
              * a load upon a successful set of the context.
              * @param {plat.ui.ITemplateControl} root The ITemplateControl specifying its own context.
              * @param {() => async.IThenable<void>} loadMethod The function to initiate the loading of the root control and its
              * children.
              */
            observeRootContext(root: ui.ITemplateControl, loadMethod: () => async.IThenable<void>): void;
            /**
              * Finalizes all the properties on an ITemplateControl
              * before loading.
              * @param {plat.ui.ITemplateControl} uiControl The control to finalize.
              * @param {string} absoluteContextPath The absoluteContextPath of the uiControl.
              */
            protected _beforeLoad(uiControl: ui.ITemplateControl, absoluteContextPath: string): void;
            /**
              * Binds context to the DOM and calls bindAndLoad on all children.
              * child manager's controls have been bound and loaded.
              */
            protected _bindChildren(): async.IThenable<void[]>;
            /**
              * Observes the identifiers associated with this manager's INodes.
              * @param {Array<plat.processing.INode>} nodes The array of INodes to iterate through.
              * @param {plat.ui.ITemplateControl} parent The parent ITemplateControl for context.
              * @param {Array<plat.IControl>} controls The array of controls whose attributes will need to be updated
              * upon the context changing.
              */
            protected _observeControlIdentifiers(nodes: INode[], parent: ui.ITemplateControl, controls: IControl[]): void;
            /**
              * Loads the potential attribute based controls associated with this
              * IElementManager and
              * attaches the corresponding ITemplateControl if available.
              * @param {Array<plat.IAttributeControl>} controls The array of attribute based controls to load.
              * @param {plat.ui.ITemplateControl} templateControl The ITemplateControl
              * associated with this manager.
              */
            protected _loadControls(controls: IAttributeControl[], templateControl: ui.ITemplateControl): async.IThenable<void>;
            /**
              * Fulfills the template promise prior to binding and loading the control.
              * its associated controls are bound and loaded.
              */
            protected _fulfillAndLoad(): async.IThenable<void>;
            /**
              * Populates the ITemplateControl properties associated with this manager
              * if one exists.
              */
            protected _populateUiControl(): void;
            /**
              * Removes the ITemplateControl's element. Called if its replaceWith property is
              * null or empty string.
              * @param {plat.ui.ITemplateControl} control The ITemplateControl whose element
              * will be removed.
              * @param {plat.processing.INodeMap} nodeMap The INodeMap associated with this manager.
              */
            protected _replaceElement(control: ui.ITemplateControl, nodeMap: INodeMap): void;
            /**
              * Initializes a control's template and compiles the control.
              * @param {plat.ui.ITemplateControl} uiControl The ITemplateControl
              * associated with this manager.
              * @param {DocumentFragment} template The associated ITemplateControl's
              * template.
              */
            protected _initializeControl(uiControl: ui.ITemplateControl, template: DocumentFragment): void;
            /**
              * A function to handle updating an attribute on all controls that have it
              * as a property upon a change in its value.
              * @param {plat.processing.INode} node The INode where the change occurred.
              * @param {plat.ui.ITemplateControl} parent The parent ITemplateControl used for context.
              * @param {Array<plat.IControl>} controls The controls that have the changed attribute as a property.
              */
            protected _attributeChanged(node: INode, parent: ui.ITemplateControl, controls: IControl[]): void;
            /**
              * Runs through all the children of this manager and calls fulfillTemplate.
              * child managers have fullfilled their templates.
              */
            protected _fulfillChildTemplates(): async.IThenable<void>;
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
            protected static _cloneNodeMap(sourceMap: INodeMap, newNode: Node): INodeMap;
            /**
              * Clones a ITextManager with a new text node.
              * @param {plat.processing.INodeManager} sourceManager The original INodeManager.
              * @param {Node} node The new text node to associate with the clone.
              * @param {plat.processing.IElementManager} parent The parent IElementManager
              * for the new clone.
              */
            protected static _clone(sourceManager: INodeManager, node: Node, parent: IElementManager): ITextManager;
            /**
              * Specifies the type for this INodeManager.
              * It's value is "text".
              */
            type: string;
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
            /**
              * Builds the node expression and sets the value.
              * @param {Node} Node The associated node whose value will be set.
              * @param {plat.ui.ITemplateControl} control The control whose context will be used to bind
              * the data.
              * @param {Array<plat.expressions.IParsedExpression>} expressions An array of parsed expressions used to build
              * the node value.
              */
            protected _setText(node: Node, control: ui.ITemplateControl, expressions: expressions.IParsedExpression[]): void;
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
            type: string;
            /**
              * A method for cloning this manager with a new Comment.
              * @param {Node} newNode The new Comment node to associate with the cloned
              * manager.
              * @param {plat.processing.IElementManager} parentManager The parent IElementManager
              * for the clone.
              */
            clone(newNode: Node, parentManager: IElementManager): number;
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
    module routing {
        class Navigator {
            protected static root: Navigator;
            /**
              * The Injector injectable instance
              */
            $InjectorStatic: typeof dependency.Injector;
            /**
              * The IBrowserConfig injectable instance
              */
            $browserConfig: web.IBrowserConfig;
            /**
              * The IBrowser injectable instance
              */
            $browser: web.IBrowser;
            $EventManagerStatic: events.IEventManagerStatic;
            $window: Window;
            /**
              * The router associated with this link.
              */
            router: Router;
            $history: History;
            uid: string;
            removeUrlListener: IRemoveListener;
            ignoreOnce: boolean;
            ignored: boolean;
            previousUrl: string;
            backNavigate: boolean;
            initialize(router: Router): void;
            navigate(view: any, options?: INavigateOptions): void;
            goBack(options?: IBackNavigationOptions): void;
            dispose(): void;
            protected _observeUrl(): void;
            generate(view: any, parameters: any, query: any): string;
        }
        function INavigatorInstance(): Navigator;
        interface INavigateOptions {
            isUrl?: boolean;
            parameters?: IObject<string>;
            query?: IObject<string>;
            replace?: boolean;
        }
        interface IBackNavigationOptions {
            length?: number;
        }
        /**
          * The Type for referencing the '$History' injectable as a dependency.
          * Used so that the window.history can be mocked.
          */
        function History($window?: Window): History;
        /**
          * Stores information about a segment, publishes a regex for matching the segment as well as
          * methods for generating the segment and iterating over the characters in the segment.
          */
        class BaseSegment {
            /**
              * Reference to the IRegex injectable.
              */
            static $Regex: expressions.IRegex;
            /**
              * Parses a route into segments, populating an array of names (for dynamic and splat segments) as well as
              * an ISegmentTypeCount object.
              * @param {string} route The route to parse.
              * @param {Array<string>} names An array to populate with dynamic/splat segment names
              * @param {plat.routing.ISegmentTypeCount} types An object to use for counting segment types in the route.
              */
            static parse(route: string, names: string[], types: ISegmentTypeCount): BaseSegment[];
            /**
              * Parses a route into segments, populating an array of names (for dynamic and splat segments) as well as
              * an ISegmentTypeCount object.
              * @param {string} name The name of the segment to look for.
              * @param {string} token The token used to acquire a new segment if necessary.
              * @param {plat.IObject<plat.routing.BaseSegment>} cache The cache in which to look for/store the segment.
              */
            private static __findSegment(name, token, cache);
            /**
              * Denotes the type of segment for this instance.
              */
            type: string;
            /**
              * The name of the segment.
              */
            name: string;
            /**
              * A regular expression string which can be used to match the segment.
              */
            regex: string;
            /**
              * A regular expression string which can be used to match the segment.
              */
            protected _specification: ICharacterSpecification;
            /**
              * Initializes the segment.
              * @param {string} name? The name for the new segment.
              */
            initialize(name?: string): void;
            /**
              * Iterates over the characters in the segment, calling an iterator method and accumulating the result of each call in
              * a defined object.
              * @param {(previousValue: T, spec: plat.routing.ICharacterSpecification) => T} iterator The iterator to call with each character.
              * @param {T} initialValue? An optional initial value with which to start the accumulation.
              */
            reduceCharacters<T>(iterator: (previousValue: T, spec: ICharacterSpecification) => T, initialValue?: T): T;
            /**
              * Generates a new segment, using the input parameters if necessary.
              * @param {plat.IObject<string>} parameters? The input parameters for the segment.
              */
            generate(parameters?: IObject<string>): string;
        }
        /**
          * The Type for referencing the '$BaseSegmentFactory' injectable as a dependency.
          */
        function IBaseSegmentFactory($Regex: expressions.IRegex): typeof BaseSegment;
        /**
          * The Type for referencing the '$BaseSegmentInstance' injectable as a dependency.
          */
        function IBaseSegmentInstance(): BaseSegment;
        /**
          * Stores information about a static segment, publishes a regex for matching the segment as well as
          * methods for generating the segment and iterating over the characters in the segment.
          */
        class StaticSegment extends BaseSegment {
            /**
              * Denotes that this is a static segment.
              */
            type: string;
            /**
              * Initializes the segment.
              * @param {string} name? The name for the new segment.
              */
            initialize(name?: string): void;
            /**
              * Iterates over the characters in the segment, calling an iterator method and accumulating the result of each call in
              * a defined object.
              * @param {(previousValue: T, spec: plat.routing.ICharacterSpecification) => T} iterator The iterator to call with each character.
              * @param {T} initialValue? An optional initial value with which to start the accumulation.
              */
            reduceCharacters<T>(iterator: (previousValue: T, spec: ICharacterSpecification) => T, initialValue?: T): T;
        }
        /**
          * The Type for referencing the '$StaticSegmentInstance' injectable as a dependency.
          */
        function IStaticSegmentInstance(): StaticSegment;
        /**
          * Stores information about a variable segment (either dynamic or splat), publishes a regex for matching the segment as well as
          * methods for generating the segment and iterating over the characters in the segment.
          */
        class VariableSegment extends BaseSegment {
            /**
              * Denotes that this is a variable segment.
              */
            type: string;
            /**
              * Generates a new segment, using the input parameters.
              * @param {plat.IObject<string>} parameters? The input parameters for the segment.
              */
            generate(parameters?: IObject<string>): string;
        }
        /**
          * The Type for referencing the '$VariableSegmentInstance' injectable as a dependency.
          */
        function IVariableSegmentInstance(): VariableSegment;
        /**
          * Stores information about a splat segment, publishes a regex for matching the segment as well as
          * methods for generating the segment and iterating over the characters in the segment.
          */
        class SplatSegment extends VariableSegment {
            /**
              * Denotes that this is a splat segment.
              */
            type: string;
            /**
              * A regular expression string which can be used to match the segment.
              */
            regex: string;
            /**
              * A regular expression string which can be used to match the segment.
              */
            protected _specification: ICharacterSpecification;
        }
        /**
          * The Type for referencing the '$SplatSegmentInstance' injectable as a dependency.
          */
        function ISplatSegmentInstance(): SplatSegment;
        /**
          * Stores information about a dynamic segment, publishes a regex for matching the segment as well as
          * methods for generating the segment and iterating over the characters in the segment.
          */
        class DynamicSegment extends VariableSegment {
            /**
              * Denotes that this is a dynamic segment.
              */
            type: string;
            /**
              * A regular expression string which can be used to match the segment.
              */
            regex: string;
            /**
              * A regular expression string which can be used to match the segment.
              */
            protected _specification: ICharacterSpecification;
        }
        /**
          * The Type for referencing the '$DynamicSegmentInstance' injectable as a dependency.
          */
        function IDynamicSegmentInstance(): DynamicSegment;
        /**
          * Contains information for validating characters.
          */
        interface ICharacterSpecification {
            /**
              * Contains all the invalid characters
              */
            invalidCharacters?: string;
            /**
              * Contains all the valid characters
              */
            validCharacters?: string;
            /**
              * Whether or not the character should repeat.
              */
            repeat?: boolean;
        }
        /**
          * Contains the total number of each segment type for a registered route.
          * Used to sort recognized route solutions for more accurate route
          * matching.
          */
        interface ISegmentTypeCount {
            /**
              * A count of how many static segments exist in the route.
              */
            statics: number;
            /**
              * A count of how many dynamic segments exist in the route.
              */
            dynamics: number;
            /**
              * A count of how many splat segments exist in the route.
              */
            splats: number;
        }
        /**
          * Route segment matching is done using a state machine. Each state contains
          * a specification indicating valid and invalid characters. Each State has a
          * list of potential next states. When matching a route segment you start with
          * a root state and then iteratively match next states until you complete the
          * segment or invalidate the segment.
          */
        class State {
            /**
              * Compiles a segment into a state tree.
              * @param {plat.routing.BaseSegment} segment The segment to compile.
              * @param {plat.routing.State} state The initial state with which to start compilation.
              */
            static compile(segment: BaseSegment, state: State): State;
            /**
              * Links a path to a compiled state, and returns the result.
              * @param {plat.routing.State} state The state with which to link the result.
              * @param {string} path The path to link to the given state.
              */
            static link(state: State, path: string): IRecognizeResult;
            /**
              * Finds all the next states for a given character.
              * @param {string} char The character used to match next states.
              * @param {Array<plat.routing.State>} states The states with which to match the character.
              */
            static recognize(char: string, states: State[]): State[];
            /**
              * Sorts states by statics/dynamics/splats.
              * Favors less splat (*) segments
              * Favors less dynamic (:) segments
              * Favors more static segments
              * @param {Array<plat.routing.State>} states The states to sort.
              */
            static sort(states: State[]): State[];
            /**
              * The possible next states for the current state.
              */
            nextStates: State[];
            /**
              * The specification for the
              * assigned route segment for this state.
              */
            specification: ICharacterSpecification;
            /**
              * The associated delegate objects for this
              * state, with their parameter names.
              */
            delegates: IDelegateParameterNames[];
            /**
              * A regular expression to match this state to a path.
              */
            regex: RegExp;
            /**
              * The totals for the different segment types
              * for this state.
              */
            types: ISegmentTypeCount;
            /**
              * The constructor for a State.
              */
            constructor();
            /**
              * Initializes the state with the given specification.
              * @param {plat.routing.ICharacterSpecification} specification? The character specification for the state.
              */
            initialize(specification?: ICharacterSpecification): void;
            /**
              * Adds a new specification to the next states. If the specification
              * already exists as a next state a new one won't be used.
              * @param {plat.routing.ICharacterSpecification} specification? The character specification used to create
              * the next state if necessary.
              */
            add(specification: ICharacterSpecification): State;
            /**
              * Finds next states that match the input character. If the character exists
              * in the state's specification for valid characters, or if it does not
              * exist in the specification for invalid characters, then the state is considered
              * a match.
              * @param {string} char The character with which to match next states.
              */
            match(char: string): State[];
            /**
              * Finds the next state that shares the same specification
              * as the input spec.
              * @param {plat.routing.ICharacterSpecification} spec The character specification used to find
              * the next state.
              */
            protected _find(spec: ICharacterSpecification): State;
            /**
              * Iterates through the next states and calls the input callback with each state. Acts like
              * Utils.some. If the callback returns true, it will break out of the loop.
              * @param {(child: plat.routing.State) => boolean} iterator The function with which to call for each
              * State. Can return true to break out of the loop
              */
            protected _someChildren(iterator: (child: State) => boolean): boolean;
            /**
              * Iterates through the next states and calls the input callback with each state.
              * @param {(child: plat.routing.State) => void} iterator The function with which to call for each
              * State.
              */
            protected _someChildren(iterator: (child: State) => void): void;
        }
        /**
          * The Type for referencing the '$StateStatic' injectable as a dependency.
          */
        function IStateStatic(): typeof State;
        /**
          * The Type for referencing the '$StateInstance' injectable as a dependency.
          */
        function IStateInstance(): State;
        /**
          * Contains a delegate and its associated segment names. Used for populating
          * the parameters in an IDelegateInfo object.
          */
        interface IDelegateParameterNames {
            /**
              * The delegate for a registered route
              */
            delegate: any;
            /**
              * Contains the parameter names for a given delegate
              */
            names: string[];
        }
        /**
          * Assists in compiling and linking route strings. You can register route strings using
          * a defined scheme, and it will compile the routes. When you want to match a route, it will
          * find the associated compiled route and link it to the data given with the passed-in route.
          */
        class RouteRecognizer {
            /**
              * Reference to the BaseSegment injectable.
              */
            $BaseSegmentFactory: typeof BaseSegment;
            /**
              * Reference to the State injectable.
              */
            $StateStatic: typeof State;
            /**
              * A root state for the recognizer used to add next states.
              */
            protected _rootState: State;
            /**
              * All the named routes for this recognizer.
              */
            protected _namedRoutes: IObject<INamedRoute>;
            /**
              * A method for registering routes to be identified later. Internally the
              * routes will be compiled into a series of states
              * which will be used to recognize the route later.
              * @param {Array<plat.routing.IRouteDelegate>} routes The routes to register.
              * @param {plat.routing.IRegisterOptions} options? An object containing options for the
              * registered route.
              */
            register(routes: IRouteDelegate[], options?: IRegisterOptions): void;
            /**
              * Searches for a match to the provided path. If a match is found, the path is deconstructed
              * to populate a parameters object (if the registered route was a dynamic/splat route).
              * @param {string} path The path to recognize.
              * returned.
              */
            recognize(path: string): IRecognizeResult;
            /**
              * Finds a INamedRoute and generates a string
              * if it exists. Uses the parameters object to generate dynamic routes.
              * @param {string} name The named route with which to generate the route string.
              * @param {plat.IObject<string>} parameters The route parameters, in the case that the
              * named route is dynamic.
              */
            generate(name: string, parameters?: IObject<string>): string;
            /**
              * Finds the delegates for an INamedRoute
              * @param {string} name The named route from which to get the delegates.
              */
            delegatesFor(name: string): IDelegateParameterNames[];
            /**
              * Determines whether or not an INamedRoute is registered.
              * @param {string} name The named route to search for.
              */
            exists(name: string): boolean;
            /**
              * Finalizes a compiled route, adding a final state if necessary. If the state is equal to the
              * root state for the recognizer, a new state will be created. This is because the root state does not
              * represent any route.
              * @param {plat.routing.State} state The state to finalize.
              * @param {string} regex The regular expression string built for the compiled routes. Used to recognize
              * routes and associate them with the compiled routes.
              */
            protected _finalize(state: State, regex: string[]): State;
            /**
              * Parses a route into different segments;
              * @param {plat.routing.IRouteDelegate} route The route options to be parsed.
              * @param {Array<plat.routing.IDelegateParameterNames>} delegates The delegates and associated names for mapping parameters.
              * @param {plat.routing.ISegmentTypeCount} types A count of all the segment types in the route.
              */
            protected _parse(route: IRouteDelegate, delegates: IDelegateParameterNames[], types: ISegmentTypeCount): BaseSegment[];
            /**
              * Compiles a list of segments into a series of states.
              * @param {Array<plat.routing.BaseSegment>} segments The segments to compile.
              * @param {plat.routing.State} state The initial state used to compile.
              * @param {Array<string>} regex A regular expression string to build in order to match the segments.
              */
            protected _compile(segments: BaseSegment[], state: State, regex: string[]): State;
            /**
              * Adds a leading slash to the passed-in string if necessary.
              * @param {string} path The path to which to add the slash.
              */
            protected _addLeadingSlash(path: string): string;
            /**
              * Checks for a trailing slash on a given string.
              * @param {string} path The path on which to look for a trailing slash.
              */
            protected _hasTrailingSlash(path: string): boolean;
            /**
              * Finds the compiled states for a given path.
              * @param {string} path The path with which to look for compiled states.
              */
            protected _findStates(path: string): State[];
            /**
              * Filters out states with no delegates, and sorts the states.
              * @param {Array<plat.routing.State>} states The states to filter.
              */
            protected _filter(states: State[]): State[];
            /**
              * Links a state to a path, producing an IRecognizeResult.
              * @param {plat.routing.State} states The state to link.
              * @param {string} path The path to link.
              * @param {boolean} isTrailingSlashDropped Whether or not the trailing slash is dropped from the path.
              */
            protected _link(state: State, path: string, isTrailingSlashDropped: boolean): IRecognizeResult;
            /**
              * Determines whether or not the state is dynamic.
              * @param {plat.routing.State} states The state used to determine if it is dynamic or not.
              */
            protected _isDynamic(state: State): boolean;
        }
        /**
          * The Type for referencing the '$RouteRecognizerInstance' injectable as a dependency.
          */
        function IRouteRecognizerInstance(): RouteRecognizer;
        /**
          * An Array of delegate information for a recognized route.
          */
        interface IRecognizeResult extends Array<IDelegateInfo> {
        }
        /**
          * Information for a recognized route segment. Contains the registered
          * delegate, as well as a parameters object with key/value pairs for a
          * dynamic route segment.
          */
        interface IDelegateInfo {
            /**
              * A delegate can be anything. It is an object that will provide functionality
              * for a route segment.
              */
            delegate: any;
            /**
              * The parameters for a route segment. If the segment is a dynamic or splat
              * segment, then the parameters will be a key/value pair object with the associated
              * variables.
              */
            parameters: any;
            /**
              * States whether or not the register delegate is for a dynamic/splat route. If
              * this value is true, then the parameters object will be filled with key/value pairs
              * associated to the registered route parameters.
              */
            isDynamic: boolean;
        }
        /**
          * Contains information about a named route. Created when you register a route with an associated
          * name.
          */
        interface INamedRoute {
            /**
              * All the segments for the named route.
              */
            segments: BaseSegment[];
            /**
              * All the delegates for the named route.
              */
            delegates: IDelegateParameterNames[];
        }
        /**
          * Used during route registeration to specify a delegate object to associate
          * with a route.
          */
        interface IRouteDelegate {
            /**
              * The pattern to match for the route, accepts dynamic routes as well as splat routes.
              * /posts/new
              * /posts/:id
              * /posts/*path
              */
            pattern: string;
            /**
              * A delegate object which should provide functionality for the associated pattern. It can be anything,
              * it is up to the owner of the registered route to know what to do with the delegate.
              */
            delegate: any;
        }
        /**
          * Options that you can pass in when registering routes.
          */
        interface IRegisterOptions {
            /**
              * Allows you to assign a name to a registered route.
              */
            name?: string;
        }
        class Router {
            static currentRouter(router?: Router): Router;
            private static __currentRouter;
            $Promise: async.IPromise;
            resolve: typeof async.Promise.resolve;
            reject: typeof async.Promise.reject;
            $Injector: typeof dependency.Injector;
            $EventManagerStatic: events.IEventManagerStatic;
            $browser: web.IBrowser;
            $browserConfig: web.IBrowserConfig;
            recognizer: RouteRecognizer;
            childRecognizer: RouteRecognizer;
            paramTransforms: IObject<IRouteTransforms>;
            queryTransforms: IObject<IRouteTransforms>;
            interceptors: IObject<{
                (routeInfo: IRouteInfo): any;
            }[]>;
            navigating: boolean;
            previousUrl: string;
            previousQuery: string;
            previousPattern: string;
            currentRouteInfo: IRouteInfo;
            ports: ISupportRouteNavigation[];
            parent: Router;
            children: Router[];
            uid: string;
            isRoot: boolean;
            ignoreOnce: boolean;
            constructor();
            initialize(parent?: Router): void;
            addChild(child: Router): Router;
            removeChild(child: Router): void;
            register(port: ISupportRouteNavigation): async.IThenable<void>;
            unregister(port: ISupportRouteNavigation): void;
            configure(routes: IRouteMapping): async.IThenable<void>;
            configure(routes: IRouteMapping[]): async.IThenable<void>;
            param(handler: (value: any, parameters: any, query: any) => any, parameter: string, view: string): Router;
            param(handler: (value: any, parameters: any, query: any) => any, parameter: string, view: new (...args: any[]) => any): Router;
            queryParam(handler: (value: any, query: any) => any, parameter: string, view: string): Router;
            queryParam(handler: (value: any, query: any) => any, parameter: string, view: new (...args: any[]) => any): Router;
            protected _addHandler(handler: (value: string, values: any, query?: any) => any, parameter: string, view: any, handlers: IObject<IRouteTransforms>): Router;
            intercept(handler: (routeInfo: IRouteInfo) => any, view: string): Router;
            intercept(handler: (routeInfo: IRouteInfo) => any, view: new (...args: any[]) => any): Router;
            navigate(url: string, query?: IObject<any>, force?: boolean): async.IThenable<void>;
            forceNavigate(): async.IThenable<void>;
            generate(name: string, parameters?: IObject<any>, query?: IObject<string>): string;
            navigateChildren(info: IRouteInfo): async.IThenable<void>;
            getChildRoute(info: IRouteInfo): string;
            performNavigation(info: IRouteInfo): async.IThenable<void>;
            performNavigateFrom(): async.IThenable<void>;
            canNavigate(info: IRouteInfo): async.IThenable<boolean>;
            callAllHandlers(view: string, parameters: any, query?: any): async.IThenable<void>;
            callHandlers(allHandlers: IRouteTransforms, obj: any, query?: any): async.IThenable<any[][]>;
            callInterceptors(info: IRouteInfo): async.IThenable<boolean>;
            canNavigateFrom(ignorePorts?: boolean): async.IThenable<boolean>;
            canNavigateTo(info: IRouteInfo, ignorePorts?: boolean): async.IThenable<boolean>;
        }
        function IRouter(): Router;
        function IRouterStatic(): typeof Router;
        interface IRouteMapping {
            pattern: string;
            view: any;
        }
        interface IRouteResult extends Array<IRouteInfo> {
        }
        interface IRouteInfo extends IDelegateInfo {
            delegate: IRouteMapping;
            query?: IObject<any>;
        }
        interface IRouteTransforms extends IObject<Array<(value: string, values: any, query?: any) => any>> {
        }
        interface ISupportRouteNavigation {
            canNavigateFrom(): async.IThenable<boolean>;
            canNavigateTo(routeInfo: IRouteInfo): async.IThenable<boolean>;
            navigateFrom(): async.IThenable<any>;
            navigateTo(routeInfo: IRouteInfo): async.IThenable<any>;
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
            protected _label: string;
            /**
              * Defines the property specified by the attribute value as the INamedElement
              * on all the ancestor controls, ignoring those that already have the property defined.
              */
            initialize(): void;
            /**
              * Removes the INamedElement from the ancestor controls.
              */
            dispose(): void;
            /**
              * Defines the property specified by the attribute value as the INamedElement
              * on all the ancestor controls, ignoring those that already have the property defined.
              * @param {string} name The name to define on all the ancestor controls.
              */
            protected _define(name: string): void;
            /**
              * Determines whether or not this control is part of a pre-compiled control tree. In the event
              * that it is, it shouldn't set itself on the ancestor controls.
              * @param {string} name The name to define on all the ancestor controls.
              */
            protected _isPrecompiled(): boolean;
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
            $Parser: expressions.IParser;
            /**
              * Reference to the IRegex injectable.
              */
            $Regex: expressions.IRegex;
            /**
              * The event name.
              */
            event: string;
            /**
              * The camel-cased name of the control as it appears as an attribute.
              */
            attribute: string;
            /**
              * A parsed form of the expression found in the attribute's value.
              */
            protected _expression: string[];
            /**
              * An array of the aliases used in the expression.
              */
            protected _aliases: string[];
            /**
              * Kicks off finding and setting the listener.
              */
            loaded(): void;
            /**
              * Parses function args and sets the event listener.
              */
            protected _setListener(): void;
            /**
              * Adds any and all necessary event listeners.
              */
            protected _addEventListeners(): void;
            /**
              * Constructs the function to evaluate with
              * the evaluated arguments taking resources
              * into account.
              * The function to call and the associated arguments, as well as the control context with which to call the function.
              */
            protected _buildExpression(): {
                fn: () => void;
                control: ui.ITemplateControl;
                args: expressions.IParsedExpression[];
            };
            /**
              * Calls the specified function when the DOM event is fired.
              * @param {Event} ev The event object.
              */
            protected _onEvent(ev: Event): void;
            /**
              * Finds all alias contained within the expression.
              * @param {Array<string>} args The array of arguments as strings.
              */
            protected _findAliases(args: string[]): string[];
            /**
              * Parses the expression and separates the function
              * from its arguments.
              * @param {string} expression The expression to parse.
              */
            protected _parseArgs(expression: string): void;
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
            event: string;
        }
        /**
          * A SimpleEventControl for the 'blur' event.
          */
        class Blur extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the 'change' event.
          */
        class Change extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the 'copy' event.
          */
        class Copy extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the 'cut' event.
          */
        class Cut extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the 'paste' event.
          */
        class Paste extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the '$dbltap' event.
          */
        class DblTap extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the 'focus' event.
          */
        class Focus extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the '$touchstart' event.
          */
        class TouchStart extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the '$touchend' event.
          */
        class TouchEnd extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the '$touchmove' event.
          */
        class TouchMove extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the '$touchcancel' event.
          */
        class TouchCancel extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the '$hold' event.
          */
        class Hold extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the '$release' event.
          */
        class Release extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the '$swipe' event.
          */
        class Swipe extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the '$swipeleft' event.
          */
        class SwipeLeft extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the '$swiperight' event.
          */
        class SwipeRight extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the '$swipeup' event.
          */
        class SwipeUp extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the '$swipedown' event.
          */
        class SwipeDown extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the '$track' event.
          */
        class Track extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the '$trackleft' event.
          */
        class TrackLeft extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the '$trackright' event.
          */
        class TrackRight extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the '$trackup' event.
          */
        class TrackUp extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the '$trackdown' event.
          */
        class TrackDown extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the '$trackend' event.
          */
        class TrackEnd extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * A SimpleEventControl for the 'submit' event.
          */
        class Submit extends SimpleEventControl {
            /**
              * The event name.
              */
            event: string;
            /**
              * Prevents the default submit action unless
              * the "action" attribute is present.
              * @param {Event} ev The event object.
              */
            protected _onEvent(ev: Event): void;
        }
        /**
          * A SimpleEventControl for the 'input' event. If
          * 'input' is not an event, it will simulate an 'input' using other events like 'keydown',
          * 'cut', 'paste', etc. Also fires on the 'change' event.
          */
        class React extends SimpleEventControl {
            /**
              * Reference to the ICompat injectable.
              */
            $Compat: ICompat;
            /**
              * The event name.
              */
            event: string;
            /**
              * Adds any and all necessary event listeners.
              */
            protected _addEventListeners(): void;
        }
        /**
          * A mapping of all keys to their equivalent keyCode.
          */
        var KeyCodes: {
            '0': number;
            '1': number;
            '2': number;
            '3': number;
            '4': number;
            '5': number;
            '6': number;
            '7': number;
            '8': number;
            '9': number;
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
            'zero': number;
            ')': number;
            'right parenthesis': number;
            'one': number;
            '!': number;
            'exclamation': number;
            'exclamation point': number;
            'two': number;
            '@': number;
            'at': number;
            'three': number;
            '#': number;
            'number sign': number;
            'hash': number;
            'pound': number;
            'four': number;
            '$': number;
            'dollar': number;
            'dollar sign': number;
            'five': number;
            '%': number;
            'percent': number;
            'percent sign': number;
            'six': number;
            '^': number;
            'caret': number;
            'seven': number;
            '&': number;
            'ampersand': number;
            'eight': number;
            '*': number;
            'asterisk': number;
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
            $Regex: expressions.IRegex;
            /**
              * Holds the key mappings to filter for in a KeyboardEvent.
              */
            keyCodes: IObject<{
                shifted: boolean;
            }>;
            /**
              * Checks if the IKeyboardEventInput is an expression object
              * and sets the necessary listener.
              */
            protected _setListener(): void;
            /**
              * Matches the event's keyCode if necessary and then handles the event if
              * a match is found or if there are no filter keyCodes.
              * @param {KeyboardEvent} ev The keyboard event object.
              */
            protected _onEvent(ev: KeyboardEvent): void;
            /**
              * Sets the defined key codes as they correspond to
              * the KeyCodes map.
              * @param {Array<string>} keys? The array of defined keys to satisfy the
              * key press condition.
              */
            protected _setKeyCodes(keys?: string[]): void;
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
            event: string;
            /**
              * The a method to remove the currently postponed event.
              */
            cancelEvent: IRemoveListener;
            /**
              * Delays execution of the event
              * @param {KeyboardEvent} ev The KeyboardEvent object.
              */
            _onEvent(ev: KeyboardEvent): void;
            /**
              * Calls to cancel an event if it is in progress.
              */
            dispose(): void;
        }
        /**
          * Used for filtering only printing keys (a-z, A-Z, 0-9, and special characters) on keydown events.
          */
        class KeyPress extends KeyCodeEventControl {
            /**
              * The event name.
              */
            event: string;
            /**
              * The a method to remove the currently postponed event.
              */
            cancelEvent: IRemoveListener;
            /**
              * Filters only 'printing keys' (a-z, A-Z, 0-9, and special characters)
              * @param {KeyboardEvent} ev The KeyboardEvent object.
              */
            _onEvent(ev: KeyboardEvent): void;
            /**
              * Calls to cancel an event if it is in progress.
              */
            dispose(): void;
        }
        /**
          * Used for filtering keys on keyup events.
          */
        class KeyUp extends KeyCodeEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * An AttributeControl that deals with binding to a specified property on its element.
          */
        class SetAttributeControl extends AttributeControl implements ISetAttributeControl {
            /**
              * The property to set on the associated element.
              */
            property: string;
            /**
              * The camel-cased name of the control as it appears as an attribute.
              */
            attribute: string;
            /**
              * The function to stop listening for attribute changes.
              */
            private __removeListener;
            /**
              * Sets the corresponding attribute {property} value and
              * observes the attribute for changes.
              */
            loaded(): void;
            /**
              * Resets the corresponding attribute property value upon
              * a change of context.
              */
            contextChanged(): void;
            /**
              * Stops listening to attribute changes.
              */
            dispose(): void;
            /**
              * The function for setting the corresponding
              * attribute property value.
              */
            setter(): void;
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
            property: string;
        }
        /**
          * A SetAttributeControl for the 'disabled' attribute.
          */
        class Disabled extends SetAttributeControl {
            /**
              * The property to set on the associated template control.
              */
            property: string;
        }
        /**
          * A SetAttributeControl for the 'selected' attribute.
          */
        class Selected extends SetAttributeControl {
            /**
              * The property to set on the associated template control.
              */
            property: string;
        }
        /**
          * A SetAttributeControl for the 'readonly' attribute.
          */
        class ReadOnly extends SetAttributeControl {
            /**
              * The property to set on the associated template control.
              */
            property: string;
        }
        /**
          * A SetAttributeControl for the 'plat-hide' attribute.
          */
        class Visible extends SetAttributeControl {
            /**
              * The property to set on the associated element.
              */
            property: string;
            /**
              * The value to associate with the property.
              */
            value: string;
            /**
              * The importance to set on the property.
              */
            importance: string;
            /**
              * The initial value of the property to be set.
              */
            protected _initialValue: string;
            /**
              * Hides the element.
              */
            initialize(): void;
            /**
              * Hides or shows the element depending upon the attribute value
              */
            setter(): void;
            /**
              * Sets the value of the property element with the given importance. If the
              * value is null or empty string, the property will be removed.
              * @param {string} value The value to set.
              * @param {string} importance? The priority or importance level to set.
              */
            protected _setValue(value: string, importance?: string): void;
        }
        /**
          * A SetAttributeControl for the 'style' attribute.
          */
        class Style extends SetAttributeControl {
            /**
              * Sets the evaluated styles on the element.
              */
            setter(): void;
        }
        /**
          * Base class used for setting the property of an element (e.g. href for anchor elements).
          */
        class ElementPropertyControl extends SetAttributeControl {
            /**
              * The function for setting the corresponding
              * attribute property value to the evaluated expression.
              */
            setter(): void;
        }
        /**
          * A type of ElementPropertyControl used to set 'href' on an anchor tag.
          */
        class Href extends ElementPropertyControl {
            /**
              * Used to set the element's href property.
              */
            property: string;
            /**
              * The TemplateControl for a plat-href is an Link control.
              */
            templateControl: ui.controls.Link;
            /**
              * Sets the href property, then calls the Link control to
              * normalize the href.
              */
            setter(): void;
        }
        /**
          * A type of ElementPropertyControl used to set 'src' on an anchor tag.
          */
        class Src extends ElementPropertyControl {
            /**
              * Used to set the element's src property.
              */
            property: string;
            /**
              * The plat.web.IBrowser injectable instance
              */
            $Browser: web.IBrowser;
            /**
              * The function for setting the corresponding
              * attribute property value to the evaluated expression.
              */
            setter(): void;
        }
        /**
          * Facilitates two-way databinding for HTMLInputElements, HTMLSelectElements, and HTMLTextAreaElements.
          */
        class Bind extends AttributeControl {
            /**
              * Reference to the IParser injectable.
              */
            $Parser: expressions.IParser;
            /**
              * Reference to the IContextManagerStatic injectable.
              */
            $ContextManagerStatic: observable.IContextManagerStatic;
            /**
              * Reference to the ICompat injectable.
              */
            $Compat: ICompat;
            /**
              * Reference to the Document injectable.
              */
            $document: Document;
            /**
              * The priority of Bind is set high to precede
              * other controls that may be listening to the same
              * event.
              */
            priority: number;
            /**
              * The function used to add the proper event based on the input type.
              */
            protected _addEventType: () => void;
            /**
              * The function used to get the bound value.
              */
            protected _getter: () => any;
            /**
              * The function used to set the bound value.
              */
            protected _setter: (newValue: any, oldValue?: any, firstTime?: boolean) => void;
            /**
              * The expression to evaluate as the bound value.
              */
            protected _expression: expressions.IParsedExpression;
            /**
              * The IParsedExpression used to evaluate the context
              * of the bound property.
              */
            protected _contextExpression: expressions.IParsedExpression;
            /**
              * The bound property name.
              */
            protected _property: string;
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
            initialize(): void;
            /**
              * Parses and watches the expression being bound to.
              */
            loaded(): void;
            /**
              * Re-observes the expression with the new context.
              */
            contextChanged(): void;
            /**
              * Removes all of the element's event listeners.
              */
            dispose(): void;
            /**
              * Adds a text event as the event listener.
              * Used for textarea and input[type=text].
              */
            protected _addTextEventListener(): void;
            /**
              * Adds a change event as the event listener.
              * Used for select, input[type=radio], and input[type=range].
              */
            protected _addChangeEventListener(): void;
            /**
              * Adds a $tap event as the event listener.
              * Used for input[type=button] and button.
              */
            protected _addButtonEventListener(): void;
            /**
              * Getter for input[type=checkbox] and input[type=radio]
              */
            protected _getChecked(): boolean;
            /**
              * Getter for input[type=text], input[type=range],
              * textarea, and select.
              */
            protected _getValue(): string;
            /**
              * Getter for button.
              */
            protected _getTextContent(): string;
            /**
              * Getter for input[type="file"]. Creates a partial IFile
              * element if file is not supported.
              */
            protected _getFile(): IFile;
            /**
              * Getter for input[type="file"]-multiple
              */
            protected _getFiles(): IFile[];
            /**
              * Getter for select-multiple
              */
            protected _getSelectedValues(): string[];
            /**
              * Setter for textarea, input[type=text],
              * and input[type=button], and select
              * @param {any} newValue The new value to set
              * @param {any} oldValue? The previously bound value
              * @param {boolean} firstTime? The context is being evaluated for the first time and
              * should thus change the property if null
              */
            protected _setText(newValue: any, oldValue?: any, firstTime?: boolean): void;
            /**
              * Setter for input[type=range]
              * @param {any} newValue The new value to set
              * @param {any} oldValue? The previously bound value
              * @param {boolean} firstTime? The context is being evaluated for the first time and
              * should thus change the property if null
              */
            protected _setRange(newValue: any, oldValue?: any, firstTime?: boolean): void;
            /**
              * Setter for input[type=checkbox]
              * @param {any} newValue The new value to set
              * @param {any} oldValue? The previously bound value
              * @param {boolean} firstTime? The context is being evaluated for the first time and
              * should thus change the property if null
              */
            protected _setChecked(newValue: any, oldValue?: any, firstTime?: boolean): void;
            /**
              * Setter for input[type=radio]
              * @param {any} newValue The new value to set
              */
            protected _setRadio(newValue: any): void;
            /**
              * Setter for select
              * @param {any} newValue The new value to set
              * @param {any} oldValue? The previously bound value
              * @param {boolean} firstTime? The context is being evaluated for the first time and
              * should thus change the property if null
              */
            protected _setSelectedIndex(newValue: any, oldValue?: any, firstTime?: boolean): void;
            /**
              * Setter for select-multiple
              * @param {any} newValue The new value to set
              * @param {any} oldValue? The previously bound value
              * @param {boolean} firstTime? The context is being evaluated for the first time and
              * should thus change the property if null
              */
            protected _setSelectedIndices(newValue: any, oldValue?: any, firstTime?: boolean): void;
            /**
              * Determines the type of Element being bound to
              * and sets the necessary handlers.
              */
            protected _determineType(): void;
            /**
              * Observes the expression to bind to.
              */
            protected _watchExpression(): void;
            /**
              * Sets the context property being bound to when the
              * element's property is changed.
              */
            protected _propertyChanged(): void;
            /**
              * Normalizes input[type="radio"] for cross-browser compatibility.
              */
            protected _initializeRadio(): void;
            /**
              * Normalizes HTMLSelectElements for cross-browser compatibility.
              */
            protected _initializeSelect(): void;
            /**
              * Checks to see if a Select or ForEach is loading items.
              */
            protected _checkAsynchronousSelect(): boolean;
            /**
              * Checks if the associated TemplateControl is a
              * BindablePropertyControl and
              * initializes all listeners accordingly.
              * is an IBindablePropertyControl
              */
            protected _observingBindableProperty(): boolean;
            /**
              * Sets the value on a BindablePropertyControl.
              * @param {any} newValue The new value to set
              * @param {any} oldValue? The previously bound value
              * @param {boolean} firstTime? The context is being evaluated for the first time and
              * should thus change the property if null
              */
            protected _setBindableProperty(newValue: any, oldValue?: any, firstTime?: boolean): void;
            /**
              * Sets the value on an element.
              * @param {any} newValue The new value to set
              */
            protected _setValue(newValue: any): void;
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
            $ContextManagerStatic: observable.IContextManagerStatic;
            /**
              * The property to set on the associated template control.
              */
            property: string;
            /**
              * The camel-cased name of the control as it appears as an attribute.
              */
            attribute: string;
            /**
              * This control needs to load before its templateControl
              */
            priority: number;
            /**
              * The set of functions added by the Template Control that listens
              * for property changes.
              */
            protected _listeners: {
                (newValue: any, oldValue?: any): void;
            }[];
            /**
              * The function to stop listening for property changes.
              */
            protected _removeListener: IRemoveListener;
            /**
              * The _addListener function bound to this control.
              */
            protected _boundAddListener: any;
            /**
              * Sets the initial value of the property on
              * the Template Control.
              */
            initialize(): void;
            /**
              * Observes the property and resets the value.
              */
            loaded(): void;
            /**
              * Stops listening for changes to the evaluated
              * expression and removes references to the listeners
              * defined by the Template Control.
              */
            dispose(): void;
            /**
              * Sets the property on the Template Control.
              * @param {any} value The new value of the evaluated expression.
              * @param {any} oldValue? The old value of the evaluated expression.
              */
            protected _setProperty(value: any, oldValue?: any): void;
            /**
              * Calls the listeners defined by the Template Control.
              * @param {any} value The new value of the evaluated expression.
              * @param {any} oldValue The old value of the evaluated expression.
              */
            protected _callListeners(newValue: any, oldValue: any): void;
            /**
              * Adds a listener as defined by the Template Control.
              * @param {plat.IPropertyChangedListener} listener The listener added by the Template Control.
              */
            protected _addListener(listener: (newValue: any, oldValue: any) => void): IRemoveListener;
            /**
              * Evaluates the attribute's value.
              */
            protected _getValue(): any;
            /**
              * Observes the attribute's value.
              */
            protected _observeProperty(): void;
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
            property: string;
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
          * @param {plat.dependency.IInjector<plat.IApp>} appInjector The injector for
          * injecting the app instance.
          */
        static registerApp(appInjector: dependency.IInjector<IApp>): void;
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
          * The injector for injecting the instance of the currently registered IApp.
          */
        private static __injector;
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
        uid: string;
        /**
          * Class for every app. This class contains hooks for Application Lifecycle Management (ALM)
          * as well as error handling and navigation events.
          */
        constructor();
        /**
          * Event fired when the app is suspended.
          * @param {plat.events.ILifecycleEvent} ev The ILifecycleEvent object.
          */
        suspend(ev: events.ILifecycleEvent): void;
        /**
          * Event fired when the app resumes from the suspended state.
          * @param {plat.events.ILifecycleEvent} ev The ILifecycleEvent object.
          */
        resume(ev: events.ILifecycleEvent): void;
        /**
          * Event fired when an internal error occures.
          * @param {plat.events.IErrorEvent<Error>} ev The IErrorEvent object.
          */
        error(ev: events.IErrorEvent<Error>): void;
        /**
          * Event fired when the app is ready.
          * @param {plat.events.ILifecycleEvent} ev The ILifecycleEvent object.
          */
        ready(ev: events.ILifecycleEvent): void;
        /**
          * Event fired when the app regains connectivity and is now in an online state.
          * @param {plat.events.ILifecycleEvent} ev The ILifecycleEvent object.
          */
        online(ev: events.ILifecycleEvent): void;
        /**
          * Event fired when the app loses connectivity and is now in an offline state.
          * @param {plat.events.ILifecycleEvent} ev The ILifecycleEvent object.
          */
        offline(ev: events.ILifecycleEvent): void;
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
          * @param {plat.dependency.IInjector<plat.IApp>} appInjector The injector for
          * injecting the app instance.
          */
        registerApp(appInjector: dependency.IInjector<IApp>): void;
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
        suspend?(ev: events.ILifecycleEvent): void;
        /**
          * Event fired when the app resumes from the suspended state.
          * @param {plat.events.ILifecycleEvent} ev The ILifecycleEvent object.
          */
        resume?(ev: events.ILifecycleEvent): void;
        /**
          * Event fired when an internal error occures.
          * @param {plat.events.IErrorEvent} ev The IErrorEvent object.
          */
        error?(ev: events.IErrorEvent<Error>): void;
        /**
          * Event fired when the app is ready.
          * @param {plat.events.ILifecycleEvent} ev The ILifecycleEvent object.
          */
        ready?(ev: events.ILifecycleEvent): void;
        /**
          * Event fired when the app regains connectivity and is now in an online state.
          * @param {plat.events.ILifecycleEvent} ev The ILifecycleEvent object.
          */
        online?(ev: events.ILifecycleEvent): void;
        /**
          * Event fired when the app loses connectivity and is now in an offline state.
          * @param {plat.events.ILifecycleEvent} ev The ILifecycleEvent object.
          */
        offline?(ev: events.ILifecycleEvent): void;
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

declare module 'platypus' {
    export = plat;
}
