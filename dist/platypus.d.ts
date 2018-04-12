/**
  * PlatypusTS v0.25.0 (https://platypi.io)
  * Copyright 2015 Platypi, LLC. All rights reserved.
  *
  * PlatypusTS is licensed under the MIT license found at
  * https://github.com/Platypi/platypusts/blob/master/LICENSE
  *
  */
/**
  * The entry point into the platypus library.
  */
declare namespace plat {
    /**
      * Holds all the classes and interfaces related to registering components for platypus.
      */
    namespace register {
        /**
          * Registers the IApp with the framework. The framework will instantiate the IApp
          * when needed, and wire up the Application Lifecycle events. The dependencies array corresponds to injectables that will be
          * passed into the Constructor of the app.
          * @param {string} name The name of your app.
          * @param {new (...args: any[]) => plat.App} Type The constructor for the IApp.
          * @param {Array<any>} dependencies? An array of strings representing the dependencies needed for the app injector.
          */
        const app: IRegisterFunction<App>;
        /**
          * Registers an Control with the framework. The framework will instantiate the
          * Control when needed. The dependencies array corresponds to injectables that
          * will be passed into the Constructor of the control.
          * @param {string} name The control type, corresponding to the HTML notation for creating a new Control (e.g. 'plat-foreach').
          * @param {new (...args: any[]) => plat.Control} Type The constructor for the Control.
          * @param {Array<any>} dependencies? An array of strings representing the dependencies needed for the Control
          * injector.
          */
        const control: IExtendedRegisterFunction<Control, boolean>;
        /**
          * Registers an ViewControl with the framework. The framework will
          * instantiate the control when needed. The dependencies array corresponds to injectables that will be
          * passed into the Constructor of the control.
          * @param {string} name The control type, corresponding to the HTML notation for creating a new
          * ViewControl. Used for navigation to the specified ViewControl.
          * @param {new (...args: any[]) => plat.ui.ViewControl} Type The constructor for the ViewControl.
          * @param {Array<any>} dependencies? An optional array of strings representing the dependencies needed for the
          * ViewControl injector.
          */
        const viewControl: IRegisterFunction<ui.ViewControl>;
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
          */
        const injectable: IInjectableType & IExtendedRegisterFunction<any, string>;
        interface IInjectableType {
            STATIC?: string;
            SINGLETON?: string;
            INSTANCE?: string;
            FACTORY?: string;
            CLASS?: string;
        }
        /**
          * Adds a JS animation denoted by its name. If  Intended to be used when JS animation implementations for legacy browsers
          * is desired.
          * @param {string} name The unique identifer of the animation.
          * @param {new (...args: any[]) => plat.ui.animations.BaseAnimation} Type The constructor for the custom animation.
          * @param {Array<any>} dependencies? Any dependencies that need to be injected into the animation at
          * instantiation.
          * @param {string} animationType The type of animation. Both the intended type and default value are
          * JS.
          */
        const animation: IAnimationType & IExtendedRegisterFunction<ui.animations.BaseAnimation | ui.animations.CssAnimation, string>;
        interface IAnimationType {
            CSS?: string;
            JS?: string;
        }
        interface IRegisterFunction<RegisterType> {
            <T extends RegisterType, D1, D2, D3, D4, D5, D6, D7, D8, D9, D10>(name: string, Type: ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8, d9: D9, d10: D10) => T) | (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8, d9: D9, d10: D10) => T), dependencies: [((...args: any[]) => D1) | (new (...args: any[]) => D1) | string, ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string, ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string, ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string, ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string, ((...args: any[]) => D6) | (new (...args: any[]) => D6) | string, ((...args: any[]) => D7) | (new (...args: any[]) => D7) | string, ((...args: any[]) => D8) | (new (...args: any[]) => D8) | string, ((...args: any[]) => D9) | (new (...args: any[]) => D9) | string, ((...args: any[]) => D10) | (new (...args: any[]) => D10) | string]): typeof register;
            <T extends RegisterType, D1, D2, D3, D4, D5, D6, D7, D8, D9>(name: string, Type: ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8, d9: D9) => T) | (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8, d9: D9) => T), dependencies: [((...args: any[]) => D1) | (new (...args: any[]) => D1) | string, ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string, ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string, ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string, ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string, ((...args: any[]) => D6) | (new (...args: any[]) => D6) | string, ((...args: any[]) => D7) | (new (...args: any[]) => D7) | string, ((...args: any[]) => D8) | (new (...args: any[]) => D8) | string, ((...args: any[]) => D9) | (new (...args: any[]) => D9) | string]): typeof register;
            <T extends RegisterType, D1, D2, D3, D4, D5, D6, D7, D8>(name: string, Type: ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8) => T) | (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8) => T), dependencies: [((...args: any[]) => D1) | (new (...args: any[]) => D1) | string, ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string, ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string, ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string, ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string, ((...args: any[]) => D6) | (new (...args: any[]) => D6) | string, ((...args: any[]) => D7) | (new (...args: any[]) => D7) | string, ((...args: any[]) => D8) | (new (...args: any[]) => D8) | string]): typeof register;
            <T extends RegisterType, D1, D2, D3, D4, D5, D6, D7>(name: string, Type: ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7) => T) | (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7) => T), dependencies: [((...args: any[]) => D1) | (new (...args: any[]) => D1) | string, ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string, ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string, ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string, ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string, ((...args: any[]) => D6) | (new (...args: any[]) => D6) | string, ((...args: any[]) => D7) | (new (...args: any[]) => D7) | string]): typeof register;
            <T extends RegisterType, D1, D2, D3, D4, D5, D6>(name: string, Type: ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6) => T) | (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6) => T), dependencies: [((...args: any[]) => D1) | (new (...args: any[]) => D1) | string, ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string, ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string, ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string, ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string, ((...args: any[]) => D6) | (new (...args: any[]) => D6) | string]): typeof register;
            <T extends RegisterType, D1, D2, D3, D4, D5>(name: string, Type: ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5) => T) | (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5) => T), dependencies: [((...args: any[]) => D1) | (new (...args: any[]) => D1) | string, ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string, ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string, ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string, ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string]): typeof register;
            <T extends RegisterType, D1, D2, D3, D4>(name: string, Type: ((d1: D1, d2: D2, d3: D3, d4: D4) => T) | (new (d1: D1, d2: D2, d3: D3, d4: D4) => T), dependencies: [((...args: any[]) => D1) | (new (...args: any[]) => D1) | string, ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string, ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string, ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string]): typeof register;
            <T extends RegisterType, D1, D2, D3>(name: string, Type: ((d1: D1, d2: D2, d3: D3) => T) | (new (d1: D1, d2: D2, d3: D3) => T), dependencies: [((...args: any[]) => D1) | (new (...args: any[]) => D1) | string, ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string, ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string]): typeof register;
            <T extends RegisterType, D1, D2>(name: string, Type: ((d1: D1, d2: D2) => T) | (new (d1: D1, d2: D2) => T), dependencies: [((...args: any[]) => D1) | (new (...args: any[]) => D1) | string, ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string]): typeof register;
            <T extends RegisterType, D1>(name: string, Type: ((d1: D1) => T) | (new (d1: D1) => T), dependencies: [((...args: any[]) => D1) | (new (...args: any[]) => D1) | string]): typeof register;
            <T extends RegisterType>(name: string, Type: (() => T) | (new () => T)): typeof register;
        }
        interface IExtendedRegisterFunction<RegisterType, XT> {
            <T extends RegisterType, D1, D2, D3, D4, D5, D6, D7, D8, D9, D10>(name: string, Type: ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8, d9: D9, d10: D10) => T) | (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8, d9: D9, d10: D10) => T), dependencies: [((...args: any[]) => D1) | (new (...args: any[]) => D1) | string, ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string, ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string, ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string, ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string, ((...args: any[]) => D6) | (new (...args: any[]) => D6) | string, ((...args: any[]) => D7) | (new (...args: any[]) => D7) | string, ((...args: any[]) => D8) | (new (...args: any[]) => D8) | string, ((...args: any[]) => D9) | (new (...args: any[]) => D9) | string, ((...args: any[]) => D10) | (new (...args: any[]) => D10) | string], type?: XT): typeof register;
            <T extends RegisterType, D1, D2, D3, D4, D5, D6, D7, D8, D9>(name: string, Type: ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8, d9: D9) => T) | (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8, d9: D9) => T), dependencies: [((...args: any[]) => D1) | (new (...args: any[]) => D1) | string, ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string, ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string, ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string, ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string, ((...args: any[]) => D6) | (new (...args: any[]) => D6) | string, ((...args: any[]) => D7) | (new (...args: any[]) => D7) | string, ((...args: any[]) => D8) | (new (...args: any[]) => D8) | string, ((...args: any[]) => D9) | (new (...args: any[]) => D9) | string], type?: XT): typeof register;
            <T extends RegisterType, D1, D2, D3, D4, D5, D6, D7, D8>(name: string, Type: ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8) => T) | (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8) => T), dependencies: [((...args: any[]) => D1) | (new (...args: any[]) => D1) | string, ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string, ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string, ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string, ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string, ((...args: any[]) => D6) | (new (...args: any[]) => D6) | string, ((...args: any[]) => D7) | (new (...args: any[]) => D7) | string, ((...args: any[]) => D8) | (new (...args: any[]) => D8) | string], type?: XT): typeof register;
            <T extends RegisterType, D1, D2, D3, D4, D5, D6, D7>(name: string, Type: ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7) => T) | (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7) => T), dependencies: [((...args: any[]) => D1) | (new (...args: any[]) => D1) | string, ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string, ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string, ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string, ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string, ((...args: any[]) => D6) | (new (...args: any[]) => D6) | string, ((...args: any[]) => D7) | (new (...args: any[]) => D7) | string], type?: XT): typeof register;
            <T extends RegisterType, D1, D2, D3, D4, D5, D6>(name: string, Type: ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6) => T) | (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6) => T), dependencies: [((...args: any[]) => D1) | (new (...args: any[]) => D1) | string, ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string, ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string, ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string, ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string, ((...args: any[]) => D6) | (new (...args: any[]) => D6) | string], type?: XT): typeof register;
            <T extends RegisterType, D1, D2, D3, D4, D5>(name: string, Type: ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5) => T) | (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5) => T), dependencies: [((...args: any[]) => D1) | (new (...args: any[]) => D1) | string, ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string, ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string, ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string, ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string], type?: XT): typeof register;
            <T extends RegisterType, D1, D2, D3, D4>(name: string, Type: ((d1: D1, d2: D2, d3: D3, d4: D4) => T) | (new (d1: D1, d2: D2, d3: D3, d4: D4) => T), dependencies: [((...args: any[]) => D1) | (new (...args: any[]) => D1) | string, ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string, ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string, ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string], type?: XT): typeof register;
            <T extends RegisterType, D1, D2, D3>(name: string, Type: ((d1: D1, d2: D2, d3: D3) => T) | (new (d1: D1, d2: D2, d3: D3) => T), dependencies: [((...args: any[]) => D1) | (new (...args: any[]) => D1) | string, ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string, ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string], type?: XT): typeof register;
            <T extends RegisterType, D1, D2>(name: string, Type: ((d1: D1, d2: D2) => T) | (new (d1: D1, d2: D2) => T), dependencies: [((...args: any[]) => D1) | (new (...args: any[]) => D1) | string, ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string], type?: XT): typeof register;
            <T extends RegisterType, D1>(name: string, Type: ((d1: D1) => T) | (new (d1: D1) => T), dependencies: [((...args: any[]) => D1) | (new (...args: any[]) => D1) | string], type?: XT): typeof register;
            <T extends RegisterType>(name: string, Type: (() => T) | (new () => T)): typeof register;
        }
    }
    /**
      * Holds classes and interfaces related to dependency injection components in platypus.
      */
    namespace dependency {
        /**
          * The Injector class is used for dependency injection. You can create an injector object,
          * specify dependencies and a constructor for your component. When the injector object is
          * 'injected' it will create a new instance of your component and pass in the dependencies
          * to the constructor.
          */
        class Injector<T> {
            /**
              * The dependencies for this injector
              */
            dependencies: string[];
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
            static getDependencies(dependencies: any[]): Injector<any>[];
            /**
              * Finds and returns the dependency.
              * @param {any} dependency an object/string used to find the dependency.
              */
            static getDependency(dependency: any): Injector<any>;
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
            private static __construct(Constructor, args, type?);
            /**
              * Walks up an object's prototype, injecting dependencies if they are
              * registered on static '_inject' objects.
              * @param {any} obj The object to walk.
              * @param {any} proto the prototype of the object.
              */
            private static __walk(obj, proto, extendWith);
            /**
              * Finds an injector object with the associated constructor.
              * @param {any} Constructor The Constructor to locate.
              */
            private static __locateInjector(Constructor);
            /**
              * Finds an injector object with the associated constructor in the given InjectorObject.
              * @param {Function} Constructor The Function
              */
            private static __findInjector(Constructor, injectorsArr);
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
            protected _wrapInjector(value: any): Injector<any>;
        }
        /**
          * An object whose values are all Injectors.
          */
        interface InjectorObject<T> extends IObject<Injector<T>> {
        }
        /**
          * Publicly exposes all the dependency injector objects.
          */
        namespace injectors {
            /**
              * An InjectorObject of Controls.
              * Contains all the registered controls for an application.
              */
            const control: InjectorObject<Control>;
            /**
              * An InjectorObject of IBaseViewControls.
              * Contains all the registered view controls for an application.
              */
            const viewControl: InjectorObject<ui.ViewControl>;
            /**
              * An InjectorObject of objects. Contains all the registered
              * injectables for an application.
              */
            const injectable: InjectorObject<any>;
            /**
              * An InjectorObject of static objects. Contains all the registered
              * static injectables for an application. Once the injectables have been injected, they are removed from this object.
              */
            const staticInjectable: InjectorObject<any>;
            /**
              * An InjectorObject of animations. Can be either CSS or JS implementations.
              */
            const animation: InjectorObject<ui.animations.BaseAnimation>;
            /**
              * An InjectorObject  of animations. Should only contain JS implementations.
              */
            const jsAnimation: InjectorObject<ui.animations.BaseAnimation>;
        }
    }
    /**
      * Gathers dependencies and returns them as an array in the order they were requested.
      * @param {Array<any>} dependencies An array of strings or Functions specifying the injectable dependencies.
      */
    function acquire<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(dependencies: [((...args: any[]) => T1) | (new (...args: any[]) => T1), ((...args: any[]) => T2) | (new (...args: any[]) => T2), ((...args: any[]) => T3) | (new (...args: any[]) => T3), ((...args: any[]) => T4) | (new (...args: any[]) => T4), ((...args: any[]) => T5) | (new (...args: any[]) => T5), ((...args: any[]) => T6) | (new (...args: any[]) => T6), ((...args: any[]) => T7) | (new (...args: any[]) => T7), ((...args: any[]) => T8) | (new (...args: any[]) => T8), ((...args: any[]) => T9) | (new (...args: any[]) => T9), ((...args: any[]) => T10) | (new (...args: any[]) => T10)]): [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10];
    function acquire<T1, T2, T3, T4, T5, T6, T7, T8, T9>(dependencies: [((...args: any[]) => T1) | (new (...args: any[]) => T1), ((...args: any[]) => T2) | (new (...args: any[]) => T2), ((...args: any[]) => T3) | (new (...args: any[]) => T3), ((...args: any[]) => T4) | (new (...args: any[]) => T4), ((...args: any[]) => T5) | (new (...args: any[]) => T5), ((...args: any[]) => T6) | (new (...args: any[]) => T6), ((...args: any[]) => T7) | (new (...args: any[]) => T7), ((...args: any[]) => T8) | (new (...args: any[]) => T8), ((...args: any[]) => T9) | (new (...args: any[]) => T9)]): [T1, T2, T3, T4, T5, T6, T7, T8, T9];
    function acquire<T1, T2, T3, T4, T5, T6, T7, T8>(dependencies: [((...args: any[]) => T1) | (new (...args: any[]) => T1), ((...args: any[]) => T2) | (new (...args: any[]) => T2), ((...args: any[]) => T3) | (new (...args: any[]) => T3), ((...args: any[]) => T4) | (new (...args: any[]) => T4), ((...args: any[]) => T5) | (new (...args: any[]) => T5), ((...args: any[]) => T6) | (new (...args: any[]) => T6), ((...args: any[]) => T7) | (new (...args: any[]) => T7), ((...args: any[]) => T8) | (new (...args: any[]) => T8)]): [T1, T2, T3, T4, T5, T6, T7, T8];
    function acquire<T1, T2, T3, T4, T5, T6, T7>(dependencies: [((...args: any[]) => T1) | (new (...args: any[]) => T1), ((...args: any[]) => T2) | (new (...args: any[]) => T2), ((...args: any[]) => T3) | (new (...args: any[]) => T3), ((...args: any[]) => T4) | (new (...args: any[]) => T4), ((...args: any[]) => T5) | (new (...args: any[]) => T5), ((...args: any[]) => T6) | (new (...args: any[]) => T6), ((...args: any[]) => T7) | (new (...args: any[]) => T7)]): [T1, T2, T3, T4, T5, T6, T7];
    function acquire<T1, T2, T3, T4, T5, T6>(dependencies: [((...args: any[]) => T1) | (new (...args: any[]) => T1), ((...args: any[]) => T2) | (new (...args: any[]) => T2), ((...args: any[]) => T3) | (new (...args: any[]) => T3), ((...args: any[]) => T4) | (new (...args: any[]) => T4), ((...args: any[]) => T5) | (new (...args: any[]) => T5), ((...args: any[]) => T6) | (new (...args: any[]) => T6)]): [T1, T2, T3, T4, T5, T6];
    function acquire<T1, T2, T3, T4, T5>(dependencies: [((...args: any[]) => T1) | (new (...args: any[]) => T1), ((...args: any[]) => T2) | (new (...args: any[]) => T2), ((...args: any[]) => T3) | (new (...args: any[]) => T3), ((...args: any[]) => T4) | (new (...args: any[]) => T4), ((...args: any[]) => T5) | (new (...args: any[]) => T5)]): [T1, T2, T3, T4, T5];
    function acquire<T1, T2, T3, T4>(dependencies: [((...args: any[]) => T1) | (new (...args: any[]) => T1), ((...args: any[]) => T2) | (new (...args: any[]) => T2), ((...args: any[]) => T3) | (new (...args: any[]) => T3), ((...args: any[]) => T4) | (new (...args: any[]) => T4)]): [T1, T2, T3, T4];
    function acquire<T1, T2, T3>(dependencies: [((...args: any[]) => T1) | (new (...args: any[]) => T1), ((...args: any[]) => T2) | (new (...args: any[]) => T2), ((...args: any[]) => T3) | (new (...args: any[]) => T3)]): [T1, T2, T3];
    function acquire<T1, T2>(dependencies: [((...args: any[]) => T1) | (new (...args: any[]) => T1), ((...args: any[]) => T2) | (new (...args: any[]) => T2)]): [T1, T2];
    function acquire<T>(dependency: ((...args: any[]) => T) | (new (...args: any[]) => T)): T;
    function acquire(dependencies: ((...args: any[]) => any) | (new (...args: any[]) => any) | Function | Function[] | string | string[] | any[]): any;
    /**
      * Holds all classes and interfaces related to debugging components in platypus.
      */
    namespace debug {
        /**
          * Handles all logging/debugging for the framework. All logs will be bubbled up to the
          * App.error event to allow for easy debugging.
          */
        class Log {
            /**
              * The ERROR log level
              */
            ERROR: number;
            /**
              * The WARN log level
              */
            WARN: number;
            /**
              * The INFO log level
              */
            INFO: number;
            /**
              * The DEBUG log level
              */
            DEBUG: number;
            /**
              * The TRACE log level
              */
            TRACE: number;
            /**
              * A configurable log level (defaults to INFO). Any logs sent below this
              * will be silent.
              */
            protected _level: number;
            /**
              * The IErrorEventStatic injectable instance
              */
            protected _ErrorEvent: events.IErrorEventStatic;
            /**
              * Logs fatal errors. This will throw the error after it is logged.
              * @param {Error} error The error to log.
              */
            error(error: Error): void;
            /**
              * Logs at the warn level.
              * @param {Error} message The message to log.
              */
            warn(message: string | Error): void;
            /**
              * Logs at the info level.
              * @param {string} message The message to log.
              */
            info(message: string | Error): void;
            /**
              * Logs at the debug level.
              * @param {string} message The message to log.
              */
            debug(message: string | Error): void;
            /**
              * Logs at the trace level.
              * @param {string} message The message to log.
              */
            trace(message: string | Error): void;
            /**
              * Sets the log level level.
              * @param {string} level A string related to the log level to set (e.g. 'error'). It will be mapped to
              * the proper number. If the corresponding number level is not found, INFO
              * will be used.
              */
            setLogLevel(level: number | string): void;
            /**
              * Dispatches an ErrorEvent to the app.
              * @param {number} level The log level denoting the severity of the message.
              */
            protected _log(message: string | Error, level: number): void;
            /**
              * Determines whether or not a log level is at or above the current minimum log level.
              * @param {number} level The log level to check against the current minimum log level.
              */
            protected _shouldLog(level: number): boolean;
        }
    }
    /**
      * A class containing boolean values signifying browser
      * and/or platform compatibilities.
      */
    class Compat {
        protected static _inject: any;
        /**
          * The window injectable.
          */
        protected _window: Window;
        /**
          * The window.history injectable.
          */
        protected _history: History;
        /**
          * The document injectable.
          */
        protected _document: Document;
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
          * Signifies whether we are in the context of a Windows 8 app.
          */
        msApp: boolean;
        /**
          * Signifies whether we are in the context of a WinJS app.
          */
        winJs: boolean;
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
          * Undefined if animation isn't supported.
          */
        animationEvents: IAnimationEvents;
        /**
          * An object containing information regarding any potential vendor prefix.
          */
        vendorPrefix: IVendorPrefix;
        /**
          * The browser's requestAnimationFrame function if one exists. Otherwise undefined.
          */
        requestAnimationFrame: (callback: FrameRequestCallback) => number;
        /**
          * The browser's cancelAnimationFrame function if one exists. Otherwise undefined.
          */
        cancelAnimationFrame: (handle: number) => void;
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
          * Define animation events and other vendor prefix
          * dependencies.
          */
        private __defineVendorDependencies();
        /**
          * Determines whether or not platypus css styles exist.
          */
        private __determineCss();
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
          * The animation iteration event.
          */
        $animationIteration: string;
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
          * The DOM based representation of the browser's vendor prefix generally denoted
          * by it beginning with a capital letter and camel-cased throughout.
          */
        dom: string;
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
          * The common uppercase representation of the browser's vendor prefix
          * generally denoted by it beginning with a capital letter.
          */
        upperCase: string;
    }
    /**
      * An extensible class defining common utilities and helper functions.
      */
    class Utils {
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
        isObject(obj: any): obj is Object;
        /**
          * Takes in anything and determines if it is a window object.
          * @param {any} obj Anything.
          */
        isWindow(obj: any): obj is Window;
        /**
          * Takes in anything and determines if it is a document object.
          * @param {any} obj Anything.
          */
        isDocument(obj: any): obj is Document;
        /**
          * Takes in anything and determines if it is a Node.
          * @param {any} obj Anything.
          */
        isNode(obj: any): obj is Node;
        /**
          * Takes in anything and determines if it is a DocumentFragment.
          * @param {any} obj Anything.
          */
        isDocumentFragment(obj: any): obj is DocumentFragment;
        /**
          * Takes in anything and determines if it is a string.
          * @param {any} obj Anything.
          */
        isString(obj: any): obj is string;
        /**
          * Takes in anything and determines if it is a RegExp object.
          * @param {any} obj Anything.
          */
        isRegExp(obj: any): obj is RegExp;
        /**
          * Takes in anything and determines if it is a Promise object.
          * @param {any} obj Anything.
          */
        isPromise(obj: any): boolean;
        /**
          * Takes in anything and determines if it is empty. Useful for
          * checking for empty strings, arrays, or objects without keys.
          * @param {any} obj Anything.
          */
        isEmpty(obj: any): boolean;
        /**
          * Takes in anything and determines if it is a boolean.
          * @param {any} obj Anything.
          */
        isBoolean(obj: any): obj is boolean;
        /**
          * Takes in anything and determines if it is a number.
          * @param {any} obj Anything.
          */
        isNumber(obj: any): obj is number;
        /**
          * Takes in anything and determines if it is a File.
          * @param {any} obj Anything.
          */
        isFile(obj: any): obj is File;
        /**
          * Takes in anything and determines if it is a function.
          * @param {any} obj Anything.
          */
        isFunction(obj: any): obj is Function;
        /**
          * Takes in anything and determines if it is null or undefined.
          * @param {any} obj Anything.
          */
        isNull(obj: any): obj is null | undefined;
        /**
          * Takes in anything and determines if it is undefined.
          * @param {any} obj Anything.
          */
        isUndefined(obj: any): obj is undefined;
        /**
          * Takes in anything and determines if it is an Array.
          * @param {any} obj Anything.
          */
        isArray(obj: any): obj is any[];
        /**
          * Takes in anything and determines if it has array-like qualities.
          * @param {any} obj Anything.
          */
        isArrayLike(obj: any): obj is ArrayLike<any>;
        /**
          * Takes in anything and determines if it is a Date object.
          * @param {any} obj Anything.
          */
        isDate(obj: any): obj is Date;
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
          * @param {Object} properties An object containing key/value pairs to match with object's values.
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
          * @param {plat.IListIterator<T, plat.async.Promise<R>>} iterator The transformation function.
          * @param {Array<T>} array An array.
          * @param {any} context? An optional context to bind to the iterator.
          */
        mapAsync<T, R>(iterator: IListIterator<T, async.Promise<R>>, array: T[], context?: any): async.Promise<R[]>;
        /**
          * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The
          * iterator can return a promise the will resolve with the mapped value. The returned values will be pushed
          * to an Array. A promise is returned that will resolve when all the iterators have resolved.
          * @param {plat.IObjectIterator<T, plat.async.Promise<R>>} iterator The transformation function.
          * @param {plat.IObject<T>} obj An Object.
          * @param {any} context? An optional context to bind to the iterator.
          */
        mapAsync<T, R>(iterator: IObjectIterator<T, async.Promise<R>>, obj: IObject<T>, context?: any): async.Promise<R[]>;
        /**
          * Takes in an array and an iterator function. Calls the iterator with all the values in the array. The
          * iterator can return a promise the will resolve with the mapped value. The next value in the array will not be passed to
          * the iterator until the previous promise fulfills.
          * @param {plat.IListIterator<T, plat.async.Promise<R>>} iterator The transformation function.
          * @param {Array<T>} array An Array.
          * @param {any} context? An optional context to bind to the iterator.
          */
        mapAsyncInOrder<T, R>(iterator: IListIterator<T, async.Promise<R>>, array: T[], context?: any): async.Promise<R[]>;
        /**
          * Takes in an array and an iterator function. Calls the iterator with all the values in the array in descending order. The
          * iterator can return a promise the will resolve with the mapped value. The next value in the array will not be passed to
          * the iterator until the previous promise fulfills.
          * @param {plat.IListIterator<T, plat.async.Promise<R>>} iterator The transformation function.
          * @param {Array<T>} array An Array.
          * @param {any} context? An optional context to bind to the iterator.
          */
        mapAsyncInDescendingOrder<T, R>(iterator: IListIterator<T, async.Promise<R>>, array: T[], context?: any): async.Promise<R[]>;
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
          * @param {number} timeout The time (in milliseconds) to delay before calling the provided method.
          * @param {Array<any>} args? The arguments to apply to the method.
          * @param {any} context? An optional context to bind to the method.
          */
        defer(method: (...args: any[]) => void, timeout: number, args?: any[], context?: any): IRemoveListener;
        /**
          * Takes in a method and array of arguments to pass to that method. Adds the method to the call stack every
          * interval amount of time. Equivalent to a setInterval with the specified interval value.
          * @param {(...args: Array<any>) => void} method The method to call.
          * @param {number} interval The time (in milliseconds) between each consecutive call of the provided method.
          * @param {Array<any>} args? The arguments to apply to the method.
          * @param {any} context? An optional context to bind to the method.
          */
        setInterval(method: (...args: any[]) => void, interval: number, args?: any[], context?: any): IRemoveListener;
        /**
          * Uses requestAnimationFrame if it is available, else it does a setTimeout.
          * @param {FrameRequestCallback} method The method to call when the request is fulfilled.
          * @param {any} context? An optional context to bind to the method.
          */
        requestAnimationFrame(method: FrameRequestCallback, context?: any): IRemoveListener;
        /**
          * Takes in a prefix and returns a unique identifier string with the prefix prepended. If no prefix
          * is specified, none will be prepended.
          * @param {string} prefix? A string prefix to prepend to the unique ID.
          */
        uniqueId(prefix?: string): string;
        /**
          * Takes in a spinal-case, dot.case, or snake_case string and returns
          * a camelCase string. Also can turn a string into camelCase with space
          * as a delimiter.
          * @param {string} str The spinal-case, dot.case, or snake_case string.
          */
        camelCase(str: string): string;
        /**
          * Takes a camelCase string and delimits it using the specified delimiter.
          * @param {string} str The camelCased string.
          * @param {string} delimiter The delimiter to add.
          */
        delimit(str: string, delimiter: string): string;
    }
    /**
      * The Type for a Utils list iterator callback method.
      */
    type IListIterator<T, R> = (value: T, index: number, list: T[]) => R;
    /**
      * The Type for a Utils object iterator callback method.
      */
    type IObjectIterator<T, R> = (value: T, key: string, obj: IObject<T>) => R;
    /**
      */
    function Window(): Window;
    /**
      */
    function Document(_window?: Window): Document;
    /**
      * Holds classes and interfaces related to expression handling in platypus.
      */
    namespace expressions {
        /**
          * A class for keeping track of commonly used regular expressions.
          */
        class Regex {
            /**
              * A regular expression for finding markup in a string.
              */
            markupRegex: RegExp;
            /**
              * Finds the arguments in a method expression.
              */
            argumentRegex: RegExp;
            /**
              * Finds '/*.html' or '/*.htm' in a url. Useful for removing
              * the html file out of the url.
              */
            initialUrlRegex: RegExp;
            /**
              * Finds a protocol delimiter in a string (e.g. ://).
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
            readonly newLineRegex: RegExp;
            /**
              * Finds optional parameters in a route string.
              */
            readonly optionalRouteRegex: RegExp;
            /**
              * Finds named parameters in a route string.
              */
            readonly namedParameterRouteRegex: RegExp;
            /**
              * Finds an alphanumeric wildcard match in a route string.
              * exec('/foo/*bar/baz');
              */
            readonly wildcardRouteRegex: RegExp;
            /**
              * Finds invalid characters in a route string.
              */
            readonly escapeRouteRegex: RegExp;
            /**
              * Finds delimiters for spinal-case, snake_case, and dot.case.
              * useful for converting to camelCase. Also can turn a string
              * into camelCase with space as a delimiter.
              */
            readonly camelCaseRegex: RegExp;
            /**
              * Finds all capital letters.
              */
            readonly capitalCaseRegex: RegExp;
            /**
              * Finds all whitespace and newline characters
              * not in string literals. Needs to be combined
              * with string replace function using $1 argument.
              */
            readonly whiteSpaceRegex: RegExp;
            /**
              * Finds all single and double quotes.
              */
            readonly quotationRegex: RegExp;
        }
        /**
          * A class that is responsible for taking in a JavaScript expression string and
          * finding all of its tokens (i.e. delimiters, operators, etc).
          */
        class Tokenizer {
            protected static _inject: any;
            /**
              * Reference to the Log injectable.
              */
            protected _log: debug.Log;
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
              */
            protected _isStringValidVariable(input: string): boolean;
            /**
              * Handles tokenizing an alphanumeric character.
              * @param {number} index The current index in the string being tokenized.
              * @param {string} char The current char.
              */
            private __handleAlphaNumeric(index, char);
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
        class Parser {
            protected static _inject: any;
            /**
              * Reference to the Tokenizer injectable.
              */
            protected _tokenizer: Tokenizer;
            /**
              * Reference to the Log injectable.
              */
            protected _log: debug.Log;
            /**
              * A single expression's token representation created by a Tokenizer.
              */
            protected _tokens: IToken[];
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
              * The constant that needs to be prepended to every dynamic eval function.
              */
            private __fnEvalConstant;
            /**
              * Parses a JavaScript expression string.
              * @param {string} expression The JavaScript expression string to parse.
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
              */
            protected _evaluate(expression: string): IParsedExpression;
            /**
              * Peek at the next IToken.
              * @param {number} index The index before the desired IToken
              * in the array.
              */
            protected _peek(index: number): IToken;
            /**
              * Look back at the previous IToken.
              * @param {number} index The index after the desired IToken
              * in the array.
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
        }
        /**
          * Describes an object that is the result of parsing a JavaScript expression string. It contains detailed
          * information about the expression as well as a way to evaluate the expression with a context.
          */
        interface IParsedExpression {
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
              * Contains all the aliases (denoted without `@` as the first character) for this
              * IParsedExpression.
              */
            aliases: string[];
            /**
              * Specifies whether or not you want to do a one-time binding on identifiers
              * for this expression. Typically this is added to a clone of this
              * IParsedExpression.
              */
            oneTime?: boolean;
            /**
              * A method for evaluating an expression with a context.
              * @param {any} context? The primary context for evaluation.
              * @param {IObject<any>} aliases? An object containing resource alias values.
              * All property keys must never begin with `@`.
              */
            evaluate(context?: any, aliases?: IObject<any>): any;
        }
    }
    /**
      * Holds classes and interfaces related to web components in platypus.
      */
    namespace web {
        /**
          */
        function Location(_window?: Window): Location;
        /**
          * The class that handles all interaction with the browser.
          */
        class Browser {
            protected static _inject: any;
            /**
              * The IBrowserConfig injectable object.
              */
            static config: IBrowserConfig;
            /**
              * Reference to the IEventManagerStatic injectable.
              */
            protected _EventManager: events.IEventManagerStatic;
            /**
              * Reference to the Compat injectable.
              */
            protected _compat: Compat;
            /**
              * Reference to the Regex injectable.
              */
            protected _regex: expressions.Regex;
            /**
              * Reference to the Window injectable.
              */
            protected _window: Window;
            /**
              * Reference to the Location injectable.
              */
            protected _location: Location;
            /**
              * Reference to the History injectable.
              */
            protected _history: History;
            /**
              * Reference to the Dom injectable.
              */
            protected _dom: ui.Dom;
            /**
              * Keeps a history stack if using a windows store app.
              */
            protected _stack: string[];
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
              * The local url protocol.
              */
            private __protocol;
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
              * Sets or gets the current _window.location
              * @param {string} url? The URL to set the location to.
              * @param {boolean} replace? Whether or not to replace the current URL in
              * the history.
              */
            url(url?: string, replace?: boolean): string;
            /**
              * Navigates back in the browser history
              * @param {number} length=1 The length to go back
              */
            back(length?: number): void;
            /**
              * Navigates forward in the browser history
              * @param {number} length=1 The length to go forward
              */
            forward(length?: number): void;
            /**
              * Creates a new UrlUtils object.
              * @param url? The URL to associate with the new UrlUtils
              * instance.
              */
            urlUtils(url?: string): UrlUtils;
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
              * Determines if the url is equal to the last url
              * @param {string} url The URL to match
              */
            protected _isLastUrl(url: string): boolean;
            /**
              * Trims trailing slashes from a url.
              * @param {string} url The URL to trim
              */
            protected _trimSlashes(url: string): string;
        }
        /**
          */
        function IBrowserConfig(): IBrowserConfig;
        /**
          * Specifies configuration properties for the Browser
          * injectable.
          */
        interface IBrowserConfig {
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
              */
            STATE: string;
            /**
              * Allows you to define how your app will route. There are
              * three modes, NONE ('none'), HASH ('hash'), and STATE ('state').
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
        class UrlUtils {
            protected static _inject: any;
            /**
              * Helps with URL initialization through it's href attribute.
              */
            private static __urlUtilsElement;
            /**
              * Reference to the Document injectable.
              */
            protected _document: Document;
            /**
              * Reference to the Window injectable.
              */
            protected _window: Window;
            /**
              * Reference to the Compat injectable.
              */
            protected _compat: Compat;
            /**
              * Reference to the Regex injectable.
              */
            protected _regex: expressions.Regex;
            /**
              * Reference to the IBrowserConfig injectable.
              */
            protected _browserConfig: IBrowserConfig;
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
              * Creates a query object out of the URL's query search string.
              * @param {string} search The URL's query search string.
              */
            private static __getQuery(search);
            /**
              * Obtains the base URL for the app/site for doing STATE type routing.
              * @param {string} url The initial URL passed into the Browser.
              */
            private static __getBaseUrl(url);
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
    }
    /**
      * Holds all classes and interfaces related to async components in platypus.
      */
    namespace async {
        /**
          * Takes in a generic type corresponding to the fulfilled success type.
          */
        class Promise<T> implements PromiseLike<T> {
            /**
              * The configuration for creating asynchronous promise flushing.
              */
            static config: {
                async(callback: (arg?: PromiseLike<any>) => void, arg?: PromiseLike<any>): void;
            };
            /**
              * Returns a promise that fulfills when every item in the array is fulfilled.
              * Casts arguments to promises if necessary. The result argument of the
              * returned promise is an array containing the fulfillment result arguments
              * in-order. The rejection argument is the rejection argument of the
              * first-rejected promise.
              * @param {Array<R>} promises An array of objects, if an object is not a promise, it will be cast.
              */
            static all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
            static all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
            static all<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>;
            static all<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Promise<[T1, T2, T3, T4, T5, T6, T7]>;
            static all<T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Promise<[T1, T2, T3, T4, T5, T6]>;
            static all<T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>]): Promise<[T1, T2, T3, T4, T5]>;
            static all<T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]): Promise<[T1, T2, T3, T4]>;
            static all<T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Promise<[T1, T2, T3]>;
            static all<T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Promise<[T1, T2]>;
            static all<T>(values: (T | PromiseLike<T>)[]): Promise<T[]>;
            /**
              * Returns a promise that fulfills as soon as any of the promises fulfill,
              * or rejects as soon as any of the promises reject (whichever happens first).
              * @param {Array<TResult>} promises An Array of anything to 'race'. Objects that aren't promises will
              * be cast.
              */
            static race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;
            static race<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;
            static race<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;
            static race<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7>;
            static race<T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Promise<T1 | T2 | T3 | T4 | T5 | T6>;
            static race<T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>]): Promise<T1 | T2 | T3 | T4 | T5>;
            static race<T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]): Promise<T1 | T2 | T3 | T4>;
            static race<T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Promise<T1 | T2 | T3>;
            static race<T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Promise<T1 | T2>;
            static race<T>(values: (T | PromiseLike<T>)[]): Promise<T>;
            /**
              * Returns a promise that resolves with the input value.
              * @param {T} value The value to resolve.
              */
            static resolve(): Promise<void>;
            static resolve<T>(value?: T | PromiseLike<T>): Promise<T>;
            /**
              * Returns a promise that rejects with the input value.
              * @param {any} error The value to reject.
              */
            static reject(error?: any): Promise<never>;
            static reject<T>(error?: any): Promise<T>;
            /**
              * Invokes the resolve function for a promise. Handles error catching.
              * @param
              * {(resolve : (value?: TResult | PromiseLike<TResult>) => void, reject: (error?: any) => void) => void} resolveFunction The resolve function to invoke.
              * @param {plat.async.Promise<TResult>} promise The promise on which to invoke the resolve function.
              */
            private static __invokeResolveFunction<TResult>(resolveFunction, promise);
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
              * @param {plat.async.Promise<TResult>} promise The promise object.
              * @param {any} value The detail of the fulfilled promise.
              */
            private static __fulfill<TResult>(promise, value);
            /**
              * Asynchronously fulfills a promise, allowing for promise chaining.
              * @param {plat.async.Promise<TResult>} promise The promise object.
              * @param {any} value The detail of the fulfilled promise.
              */
            private static __resolve<TResult>(promise, value);
            /**
              * Handles chaining promises together, when a promise is returned from within a then handler.
              * @param {plat.async.Promise<TResult>} promise The promise object.
              * @param {plat.async.Promise<TResult>} value The next promise to await.
              */
            private static __handleThenable<TResult>(promise, value);
            /**
              * Adds a child promise to the parent's subscribers.
              * @param {plat.async.Promise<any>} parent The parent promise.
              * @param {plat.async.Promise<any>} value The child promise.
              * @param {(success: any) => any} onfulfilled The fulfilled method for the child.
              * @param {(error: any) => any} onRejected The rejected method for the child.
              */
            private static __subscribe(parent, child, onFulfilled, onRejected);
            /**
              * An ES6 implementation of the Promise API. Useful for asynchronous programming.
              * Takes in 2 generic types corresponding to the fulfilled success and error types.
              * The error type (U) should extend Error in order to get proper stack tracing.
              * @param {(resolve : (value?: T | PromiseLike<T>) => void, reject: (error?: any) => void) => void} resolveFunction
              * A function for fulfilling/rejecting the P.
              */
            constructor(resolveFunction: (resolve: (value?: T | PromiseLike<T>) => void, reject: (error?: any) => void) => void);
            /**
              * Takes in two methods, called when/if the promise fulfills/rejects.
              * @param {(success: T) => U} onFulfilled A method called when/if the promise fulfills. If undefined the next
              * onFulfilled method in the promise chain will be called.
              * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
              * onRejected method in the promise chain will be called.
              */ then<TResult1 = T, TResult2 = never>(onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
            /**
              * A wrapper method for P.then(undefined, onRejected);
              * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
              * onRejected method in the promise chain will be called.
              */
            catch<TResult = never>(onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
            /**
              * Outputs the Promise as a readable string.
              */
            toString(): string;
        }
        /**
          */
        function IPromise(_window?: any): IPromise;
        /**
          */
        interface IPromise {
            new <R>(resolveFunction: (resolve: (value?: R | PromiseLike<R>) => void, reject: (error?: any) => void) => void): Promise<R>;
            all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
            all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
            all<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>;
            all<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Promise<[T1, T2, T3, T4, T5, T6, T7]>;
            all<T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Promise<[T1, T2, T3, T4, T5, T6]>;
            all<T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>]): Promise<[T1, T2, T3, T4, T5]>;
            all<T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]): Promise<[T1, T2, T3, T4]>;
            all<T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Promise<[T1, T2, T3]>;
            all<T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Promise<[T1, T2]>;
            all<T>(values: (T | PromiseLike<T>)[]): Promise<T[]>;
            race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;
            race<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;
            race<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;
            race<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7>;
            race<T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Promise<T1 | T2 | T3 | T4 | T5 | T6>;
            race<T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>]): Promise<T1 | T2 | T3 | T4 | T5>;
            race<T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]): Promise<T1 | T2 | T3 | T4>;
            race<T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Promise<T1 | T2 | T3>;
            race<T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Promise<T1 | T2>;
            race<T>(values: (T | PromiseLike<T>)[]): Promise<T>;
            resolve(): Promise<void>;
            resolve<T>(value?: T | PromiseLike<T>): Promise<T>;
            reject(error?: any): Promise<never>;
            reject<T>(error?: any): Promise<T>;
        }
        /**
          * HttpRequest provides a wrapper for the XMLHttpRequest object. Allows for
          * sending AJAX requests to a server. This class does not support
          * synchronous requests.
          */
        class HttpRequest {
            protected static _inject: any;
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
              * Reference to the Log injectable.
              */
            protected _log: debug.Log;
            /**
              * The plat.web.Browser injectable instance
              */
            protected _browser: web.Browser;
            /**
              * The injectable instance of type Window
              */
            protected _window: Window;
            /**
              * The injectable instance of type Document
              */
            protected _document: Document;
            /**
              * The configuration for an HTTP Request
              */
            protected _config: IHttpConfig;
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
              */
            constructor();
            /**
              * Initializes the HttpRequest with options.
              * @param {plat.async.IHttpConfig} options The IHttpConfigStatic used to customize this HttpRequest.
              */
            initialize(options: IHttpConfig): void;
            /**
              * Executes an XMLHttpRequest and resolves an IAjaxPromise upon completion.
              */
            execute<R>(): AjaxPromise<IAjaxResponse<R>>;
            /**
              * Executes an JSONP request and resolves an IAjaxPromise upon completion.
              */
            executeJsonp<R>(): AjaxPromise<IAjaxResponse<R>>;
            /**
              * A wrapper for the XMLHttpRequest's onReadyStateChanged callback.
              */
            protected _xhrOnReadyStateChange(): boolean;
            /**
              * The function that initializes and sends the XMLHttpRequest.
              */
            protected _sendXhrRequest(): AjaxPromise<IAjaxResponse<any>>;
            /**
              * Returns a promise that is immediately rejected due to an error.
              */
            protected _invalidOptions(): AjaxPromise<IAjaxResponse<any>>;
            /**
              * The function that formats the response from the XMLHttpRequest.
              * @param {string} responseType The user designated responseType
              * @param {boolean} success Signifies if the response was a success
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
        type IHttpTransformFunction = (data: any, xhr: XMLHttpRequest) => any;
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
              * http://platypi.io/data?callback=plat_fnName.
              */
            jsonpIdentifier?: string;
            /**
              * A specified name for the JSONP callback (in case the server has
              * it hard-coded and/or does not get it from the given url). The
              * default is a unique plat id generated separately for
              * each JSONP callback seen as 'plat_callback00' in
              * http://platypi.io/data?callback=plat_callback00.
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
              * The XMLHttpRequest object associated with the AJAX call
              */
            xhr?: XMLHttpRequest;
            /**
              * A method for getting the XHR response headers.
              */
            getAllResponseHeaders?(): string;
        }
        /**
          * A class that forms an Error object with an IAjaxResponse.
          */
        class AjaxError implements Error, IAjaxResponse<any> {
            /**
              * The name of the Error ('AjaxError')
              */
            name: string;
            /**
              * The Error message
              */
            message: string;
            /**
              * The response from the XMLHttpRequest
              */
            response: any;
            /**
              * The status code from the XMLHttpRequest
              */
            status: number;
            /**
              * A method for getting the XHR response headers.
              */
            getAllResponseHeaders: () => string;
            /**
              * The XMLHttpRequest object associated with the AJAX call
              */
            xhr: XMLHttpRequest;
            /**
              * The constructor for an AjaxError.
              * @param {plat.async.IAjaxResponse} response The IAjaxResponse object.
              */
            constructor(response: IAjaxResponse<any>);
            /**
              * Outputs a formatted string describing the AjaxError.
              */
            toString(): string;
        }
        /**
          * Describes a type of Promise that fulfills with an IAjaxResponse
          * and can be optionally cancelled.
          */
        class AjaxPromise<T> extends Promise<T> {
            /**
              * The Window object.
              */
            protected _window: Window;
            /**
              * The HttpRequest object.
              */
            private __http;
            /**
              * The constructor method for the {@link plat.async.AjaxPromise}.
              * @param {plat.async.IAjaxResolveFunction} resolveFunction The promise resolve function.
              * @param {any} promise The promise object to allow for cancelling the {@link plat.async.AjaxPromise}.
              */
            constructor(resolveFunction: (resolve: (value?: T | PromiseLike<T>) => void, reject: (error?: any) => void) => void, promise?: any);
            /**
              * A method to initialize this AjaxPromise, passing it the
              * associated IHttpRequest.
              * @param {plat.async.HttpRequest} http The http request for this promise.
              */
            initialize(http: HttpRequest): void;
            /**
              * A method to cancel the AJAX call associated with this AjaxPromise.
              */
            cancel(): void;
            /**
              * Takes in two methods, called when/if the promise fulfills/rejects.
              * @param {(success: plat.async.IAjaxResponse<T>) => T} onFulfilled A method called when/if the promise fulfills.
              * If undefined the next onFulfilled method in the promise chain will be called.
              * @param {(error: plat.async.AjaxError) => T} onRejected A method called when/if the promise rejects.
              * If undefined the next onRejected method in the promise chain will be called.
              */ then<TResult1 = T, TResult2 = never>(onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): AjaxPromise<TResult1 | TResult2>;
            /**
              * A wrapper method for Promise.then(undefined, onRejected);
              * @param {(error: any) => TResult} onRejected A method called when/if the promise rejects. If undefined the next
              * onRejected method in the promise chain will be called.
              */
            catch<TResult = never>(onRejected?: ((reason: AjaxError) => TResult | PromiseLike<TResult>) | undefined | null): AjaxPromise<T | TResult>;
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
              * a content-type of 'multipart/form-data'.
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
        class Http {
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
              */
            ajax<R>(options: IHttpConfig): AjaxPromise<IAjaxResponse<R>>;
            /**
              * A direct method to force a cross-domain JSONP request.
              * @param {plat.async.IJsonpConfig} options The IJsonpConfig
              */
            jsonp<R>(options: IJsonpConfig): AjaxPromise<IAjaxResponse<R>>;
            /**
              * Makes an ajax request, specifying responseType: 'json'.
              * @param {plat.async.IHttpConfig} options The IHttpConfig
              * for either the XMLHttpRequest or the JSONP callback.
              */
            json<R>(options: IHttpConfig): AjaxPromise<IAjaxResponse<R>>;
        }
        /**
          */
        function IHttpConfig(): IHttpConfig;
    }
    /**
      * Holds classes and interfaces related to storage in platypus.
      */
    namespace storage {
        /**
          * A Cache class, for use with the ICacheFactory injectable.
          * Used for storing objects. Takes in a generic type corresponding to the type of objects it contains.
          */
        class Cache<T> {
            /**
              * The size of this cache specified by its ID.
              */
            private __size;
            /**
              * The ID of this cache.
              */
            private __uid;
            /**
              * The options for this cache.
              */
            private __options;
            /**
              * Method for creating a new cache object. Takes a generic type to denote the
              * type of objects stored in the new cache.  If a cache with the same ID already exists
              * in the ICacheFactory, a new cache will not be created.
              * @param {string} uid The ID of the new Cache.
              * @param {plat.storage.ICacheOptions} options ICacheOptions
              * for customizing the Cache.
              */
            static create<T>(uid: string, options?: ICacheOptions): Cache<T>;
            /**
              * Gets a cache out of the ICacheFactory if it exists.
              * @param {string} uid The identifier used to search for the cache.
              */
            static fetch<T>(uid: string): Cache<T>;
            /**
              * Clears the ICacheFactory and all of its caches.
              */
            static clear(): void;
            /**
              * The constructor for a Cache.
              * @param {string} id The id to use to retrieve the cache from the ICacheFactory.
              * @param {plat.storage.ICacheOptions} options The ICacheOptions for customizing the cache.
              */
            constructor(uid: string, options?: ICacheOptions);
            /**
              * Retrieves the ICacheInfo about this cache
              * (i.e. ID, size, options)
              */
            info(): ICacheInfo;
            /**
              * Method for inserting an object into an Cache.
              * @param {string} key The key to use for storage/retrieval of the object.
              * @param {T} value The value to store with the associated key.
              */
            put(key: string, value: T): T;
            /**
              * Method for retrieving an object from an Cache.
              * @param key The key to search for in an Cache.
              */
            read(key: string): T;
            /**
              * Method for removing an object from an Cache.
              * @param {string} key The key to remove from the Cache.
              */
            remove(key: string): void;
            /**
              * Method for clearing an Cache, removing all of its keys.
              */
            clear(): void;
            /**
              * Method for removing an ICache from the ICacheFactory.
              */
            dispose(): void;
        }
        /**
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
              * @param {string} uid The ID of the new Cache.
              * @param {plat.storage.ICacheOptions} options ICacheOptions
              * for customizing the Cache.
              */
            create<T>(uid: string, options?: ICacheOptions): Cache<T>;
            /**
              * Gets a cache out of the ICacheFactory if it exists.
              * @param {string} uid The identifier used to search for the cache.
              */
            fetch<T>(uid: string): Cache<T>;
            /**
              * Clears the ICacheFactory and all of its caches.
              */
            clear(): void;
        }
        /**
          */
        let managerCache: Cache<processing.NodeManager>;
        /**
          */
        function IManagerCache(): typeof managerCache;
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
          * Contains information about an Cache.
          */
        interface ICacheInfo {
            /**
              * A unique id for the Cache object, used to
              * retrieve the ICache out of the CacheFactory.
              */
            uid: string;
            /**
              * Represents the number of items in the Cache.
              */
            size: number;
            /**
              * Represents the ICacheOptions that the
              * Cache is using.
              */
            options: ICacheOptions;
        }
        /**
          * Used for caching compiled nodes. This class will
          * clone a template when you put it in the cache. It will
          * also clone the template when you retrieve it.
          */
        class TemplateCache extends Cache<async.Promise<DocumentFragment>> {
            protected static _inject: any;
            /**
              * Reference to the IPromise injectable.
              */
            protected _Promise: async.IPromise;
            /**
              * Reference to the Log injectable.
              */
            protected _log: debug.Log;
            /**
              * The constructor for a TemplateCache. Creates a new Cache
              * with the ID "__templateCache".
              */
            constructor();
            /**
              * Stores a IPromise in the cache.
              * @param {string} key The key to use for storage/retrieval of the object.
              * @param {plat.async.Promise<Node>} value Promise that
              * should resolve with a Node.
              */
            put(key: string, value?: string | DocumentFragment | Node | async.Promise<Node>): async.Promise<DocumentFragment>;
            /**
              * Method for retrieving a Node from this cache. The DocumentFragment that resolves from the returned
              * Promise will be cloned to avoid manipulating the cached template.
              * @param {string} key The key to search for in this cache.
              */
            read(key: string): async.Promise<DocumentFragment>;
        }
        /**
          * A base class for storing data with a designated storage type.
          */
        class BaseStorage {
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
            readonly length: number;
            /**
              * Clears storage, deleting all of its keys.
              */
            clear(): void;
            /**
              * Gets an item out of storage with the assigned key.
              * @param {string} key The key of the item to retrieve from storage.
              */
            getItem(key: string): string;
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
              * @param {string} data The data to store in storage with the key.
              */
            setItem(key: string, data: string): void;
        }
        /**
          * A class used to wrap HTML5 localStorage into an injectable.
          */
        class LocalStorage extends BaseStorage {
            constructor();
        }
        /**
          * A class for wrapping SessionStorage as an injectable.
          */
        class SessionStorage extends BaseStorage {
            constructor();
        }
    }
    /**
      * Holds all classes and interfaces related to observable components in platypus.
      */
    namespace observable {
        /**
          * A class for managing both context inheritance and observable properties on controls and
          * facilitating in data-binding.
          */
        class ContextManager {
            /**
              * Reference to the Log injectable.
              */
            protected static _log: debug.Log;
            /**
              * A set of functions to be fired when a particular observed array is mutated.
              */
            static arrayChangeListeners: IObject<IObject<((changes: IArrayChanges<any>[]) => void)[]>>;
            /**
              * An object for quickly accessing a previously created ContextManager.
              */
            private static __managers;
            /**
              * An object for storing functions to remove listeners for observed identifiers.
              */
            private static __controls;
            /**
              * Reference to the Compat injectable.
              */
            protected _compat: Compat;
            /**
              * The root context associated with and to be managed by this
              * ContextManager.
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
              * Gets the ContextManager associated to the given control. If no
              * ContextManager exists, one is created for that control.
              * @param {plat.Control} control The control on which to locate the ContextManager.
              */
            static getManager(control: Control): ContextManager;
            /**
              * Removes all the listeners for a given control's unique ID.
              * @param {plat.Control} control The control whose manager is being disposed.
              */
            static dispose(control: Control): void;
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
              * @param {plat.ui.TemplateControl} control The TemplateControl
              * on which to create the context.
              * @param {string} identifier The period-delimited identifier string used to create
              * the context path.
              */
            static createContext(control: ui.TemplateControl, identifier: string): any;
            /**
              * Iterates through all the nested properties in an object and redefines the properties to not use getters/setters
              * @param {any} obj The object to stop observing.
              */
            static unObserve(obj: any): void;
            /**
              * Safely retrieves the local context for this manager given an Array of
              * property strings and observes it if not found.
              * @param {Array<string>} split The string array containing properties used to index into
              * the context.
              * @param {boolean} observe? Whether or not to observe the identifier indicated by the
              * split Array.
              */
            getContext(split: string[], observe?: boolean): any;
            /**
              * Given a period-delimited identifier, observes an object and calls the given listener when the
              * object changes.
              * @param {string} absoluteIdentifier The period-delimited identifier noting the property to be observed.
              * @param {plat.observable.IListener} observableListener An object implementing IObservableListener. The listener will be
              * notified of object changes.
              */
            observe(absoluteIdentifier: string, observableListener: IListener): IRemoveListener;
            /**
              * Observes an array and calls the listener when certain functions are called on
              * that array. The watched functions are push, pop, shift, splice, unshift, sort,
              * and reverse.
              * @param {string} uid The unique ID of the object observing the array.
              * @param {(changes: Array<plat.observable.IArrayChanges<any>>) => void} listener The callback for after
              * when an observed Array function has been called.
              * @param {string} absoluteIdentifier The identifier from the root context used to find the array.
              * @param {Array<any>} array The array to be observed.
              * @param {Array<any>} oldArray The old array to stop observing.
              */
            observeArrayMutation(uid: string, listener: (changes: IArrayChanges<any>[]) => void, absoluteIdentifier: string, array: any[], oldArray: any[]): IRemoveListener;
            /**
              * Disposes the memory for an ContextManager.
              */
            dispose(): void;
            /**
              * Pushes Array mutation listeners and removers.
              * @param {string} uid The unique identifier to store the callback.
              * @param {string} absoluteIdentifier The identifier of the Array being observed.
              * @param {(changes: Array<plat.observable.IArrayChanges<any>>) => void} listener The Array mutation listener.
              */
            protected _pushArrayListener(uid: string, absoluteIdentifier: string, listener: (changes: IArrayChanges<any>[]) => void): IRemoveListener;
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
              * Gets the context object of an identifier.
              * @param {string} identifier The identifier for which we're getting the context.
              * @param {Array<string>} split The string array containing properties used to index into
              * the context.
              * @param {boolean} observe? Whether or not to observe the identifier indicated by the
              * split Array.
              */
            protected _getContext(identifier: string, split: string[], observe?: boolean): any;
            /**
              * Gets the immediate context of identifier by splitting on ".".
              * @param {Array<string>} split The string array containing properties used to index into
              * the context.
              */
            protected _getImmediateContext(split: string[]): any;
            /**
              * Gets the immediate context of identifier by splitting on "."
              * and observes the objects along the way.
              * @param {Array<string>} split The identifier split string array containing properties
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
              * @param {Array<string>} mappings? An array of mapped child identifier keys to notify.
              */
            protected _notifyChildProperties(identifier: string, newValue: any, oldValue: any, mappings?: string[]): void;
            /**
              * Adds a listener to be fired for a particular identifier.
              * @param {string} absoluteIdentifier The identifier being observed.
              * @param {plat.observable.IListener} observableListener The function and associated unique ID to be fired
              * for this identifier.
              * @param {boolean} isLength? Indicates the property being observed is an Array's length.
              */
            protected _addObservableListener(absoluteIdentifier: string, observableListener: IListener, isLength?: boolean): IRemoveListener;
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
          */
        function IContextManagerStatic(_log?: debug.Log): IContextManagerStatic;
        /**
          * Creates and manages ContextManagers and has
          * additional helper functions for observing objects and primitives.
          */
        interface IContextManagerStatic {
            /**
              * A set of functions to be fired when a particular observed array is mutated.
              */
            arrayChangeListeners: IObject<IObject<((changes: IArrayChanges<any>[]) => void)[]>>;
            /**
              * Gets the ContextManager associated to the given control. If no
              * ContextManager exists, one is created for that control.
              * @param {plat.Control} control The control on which to locate the ContextManager.
              */
            getManager(control: Control): ContextManager;
            /**
              * Removes all the listeners for a given control's unique ID.
              * @param {plat.Control} control The control whose manager is being disposed.
              */
            dispose(control: Control): void;
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
            getContext(rootContext: any, split: string[]): any;
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
              * @param {plat.ui.TemplateControl} control The TemplateControl
              * on which to create the context.
              * @param {string} identifier The period-delimited identifier string used to create
              * the context path.
              */
            createContext(control: ui.TemplateControl, identifier: string): any;
        }
        /**
          * An object specifying a listener callback function and a unique id to use to manage the
          * listener.
          */
        interface IListener {
            /**
              * A unique id used to manage the listener.
              */
            uid: string;
            /**
              * A high priority means this listener wants to be notified earlier than other listeners. The
              * listeners will be fired in priority order when necessary.
              */
            priority?: number;
            /**
              * A listener method called when the object it is observing is changed.
              * @param {any} value The new value of the object.
              * @param {any} oldValue The previous value of the object.
              */
            listener(value: any, oldValue: any): void;
        }
        /**
          * An object denoting Array changes after the Array has been mutated. Takes a
          * generic type to denote the type of array it uses.
          */
        interface IArrayChanges<T> {
            /**
              * The new value of the array.
              */
            object: T[];
            /**
              * The method name that was called. Array mutation methods are:
              * 'push', 'pop', 'reverse', 'shift', 'sort', 'splice',
              * and 'unshift'.
              */
            type: string;
            /**
              * The index at which the change occurred. Only available on Array mutation methods.
              */
            index?: number;
            /**
              * An array of the removed elements. Only available on Array mutation methods.
              */
            removed?: T[];
            /**
              * The number of elements added. Only available on Array mutation methods.
              */
            addedCount?: number;
            /**
              * The old Array prior to a 'reverse' or 'sort' mutation type.
              * Only available when the type is either 'reverse' or 'sort'.
              */
            oldArray?: T[];
        }
        /**
          * Defines the object added to a template control when its element
          * has an attribute control that extends ObservableAttributeControl.
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
        /**
          * Defines methods that interact with a control that implements IImplementTwoWayBinding
          * (e.g. Bind.
          */
        interface ISupportTwoWayBinding {
            /**
              * Adds a listener to be called when the bindable property changes.
              * @param {plat.IPropertyChangedListener<any>} listener The function that acts as a listener.
              */
            onInput(listener: (newValue: any, oldValue: any) => void): IRemoveListener;
            /**
              * A function that allows this control to observe both the bound property itself as well as
              * potential child properties if being bound to an object.
              * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
              * data-binding.
              */
            observeProperties(binder: IImplementTwoWayBinding): void;
        }
        /**
          * Defines methods that interact with a control that implements ISupportTwoWayBinding
          * (e.g. any control that extends BindControl.
          */
        interface IImplementTwoWayBinding {
            /**
              * A function that allows a ISupportTwoWayBinding to observe both the
              * bound property itself as well as potential child properties if being bound to an object.
              * @param {plat.observable.IBoundPropertyChangedListener<T>} listener The listener function.
              * @param {number | string} identifier? The path off of the bound object to listen to for changes if the bound object is an Array.
              * If undefined or empty the listener will listen for changes to the bound Array itself.
              * @param {boolean} autocast? Will cast a primitive value to whatever it was set to in code.
              */
            observeProperty<T>(listener: IBoundPropertyChangedListener<T>, identifier?: number | string, autocast?: boolean): IRemoveListener;
            /**
              * A function that allows a ISupportTwoWayBinding to observe array mutations of the
              * bound property.
              * @param {(changes: Array<plat.observable.IArrayChanges<T>>, identifier: string) => void} listener The listener function.
              * @param {string} identifier? The identifier off of the bound object to listen to for changes. If undefined or empty
              * the listener will listen for changes to the bound item itself.
              */
            observeArrayChange<T>(listener: (changes: IArrayChanges<T>[], identifier: string) => void, identifier?: string): IRemoveListener;
            /**
              * A function that allows a ISupportTwoWayBinding to observe array mutations of the
              * bound property.
              * @param {(changes: Array<plat.observable.IArrayChanges<T>>, identifier: number) => void} listener The listener function.
              * @param {number} index? The index off of the bound object to listen to for changes if the bound object is an Array.
              * If undefined or empty the listener will listen for changes to the bound Array itself.
              */
            observeArrayChange<T>(listener: (changes: IArrayChanges<T>[], identifier: number) => void, index?: number): IRemoveListener;
            /**
              * Gets the current value of the bound property.
              */
            evaluate(): any;
        }
        /**
          * Defines a function that will be called whenever a bound property specified by a given identifier has changed.
          */
        type IBoundPropertyChangedListener<T> = (newValue: T, oldValue: T, identifier: any, firstTime?: boolean) => void;
    }
    /**
      * Holds classes and interfaces related to event management components in platypus.
      */
    namespace events {
        /**
          * An event class that propagates through a control tree.
          * Propagation of the event always starts at the sender, allowing a control to both
          * initialize and consume an event. If a consumer of an event throws an error while
          * handling the event it will be logged to the app using Log.debug. Errors will
          * not stop propagation of the event.
          */
        class DispatchEvent {
            protected static _inject: any;
            /**
              * Reference to the IEventManagerStatic injectable.
              */
            protected _EventManager: IEventManagerStatic;
            /**
              * Reference to the IContextManagerStatic injectable.
              */
            protected _ContextManager: observable.IContextManagerStatic;
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
              * @param {string} direction The direction of propagation
              */
            initialize(name: string, sender: any, direction?: 'up' | 'down' | 'direct' | string): void;
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
        class LifecycleEvent extends DispatchEvent {
            /**
              * Creates a new LifecycleEvent and fires it.
              * @param {string} name The name of the event.
              * @param {any} sender The sender of the event.
              */
            static dispatch(name: string, sender: any): LifecycleEvent;
            /**
              * Initializes the event, populating its public properties.
              * @param {string} name The name of the event.
              * @param {any} sender The sender of the event.
              */
            initialize(name: string, sender: any): void;
        }
        /**
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
            dispatch(name: string, sender: any): LifecycleEvent;
        }
        /**
          * Manages dispatching events, handling all propagating events as well as any error handling.
          */
        class EventManager {
            /**
              * Reference to the Log injectable.
              */
            protected static _log: debug.Log;
            /**
              * Reference to the Compat injectable.
              */
            protected static _compat: Compat;
            /**
              * Reference to the Document injectable.
              */
            protected static _document: Document;
            /**
              * Reference to the Window injectable.
              */
            protected static _window: Window;
            /**
              * Reference to the Dom injectable.
              */
            protected static _dom: ui.Dom;
            /**
              * An upward-moving event will start at the sender and move
              * up the parent chain.
              */
            static UP: 'up';
            /**
              * A downward-moving event will start at the sender and move
              * to its children and beyond.
              */
            static DOWN: 'down';
            /**
              * Goes through all listeners for an event name, ignoring order.
              */
            static DIRECT: 'direct';
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
              * Registers a listener for a DispatchEvent.
              * The listener will be called when a DispatchEvent is
              * propagating over the given uid. Any number of listeners can exist for a single event name.
              * @param {string} uid A unique id to associate with the object registering the listener.
              * @param {string} eventName The name of the event to listen to.
              * @param {(ev: DispatchEvent, ...args: any[]) => void} listener The method called when the event is fired.
              * @param {any} context? The context with which to call the listener method.
              */
            static on(uid: string, eventName: string, listener: (ev: DispatchEvent, ...args: any[]) => void, context?: any): IRemoveListener;
            /**
              * Looks for listeners to a given event name, and fires the listeners using the specified
              * event direction.
              * @param {string} name The name of the event.
              * @param {any} sender The object sending the event.
              * @param {string} direction The direction in which to send the event.
              * @param {Array<any>} args? The arguments to send to the listeners.
              */
            static dispatch(name: string, sender: any, direction: 'down' | 'up' | 'direct', args?: any[]): DispatchEvent;
            /**
              * Returns whether or not the given string is a registered direction.
              * @param {string} direction The direction of the event
              */
            static hasDirection(direction: string): boolean;
            /**
              * Determines the appropriate direction and dispatches the event accordingly.
              * @param {plat.events.DispatchEvent} event The DispatchEvent to send
              * @param {Array<any>} args The arguments associated with the event
              */
            static sendEvent(event: DispatchEvent, args?: any[]): void;
            /**
              * Dispatches the event up the control chain.
              * @param {plat.events.DispatchEvent} event The event being dispatched.
              * @param {Array<any>} args The arguments associated with the event.
              */
            protected static _dispatchUp(event: DispatchEvent, args: any[]): void;
            /**
              * Dispatches the event down the control chain.
              * @param {plat.events.DispatchEvent} event The event being dispatched.
              * @param {Array<any>} args The arguments associated with the event.
              */
            protected static _dispatchDown(event: DispatchEvent, args: any[]): void;
            /**
              * Dispatches the event directly to all listeners.
              * @param {plat.events.DispatchEvent} event The event being dispatched.
              * @param {Array<any>} args The arguments associated with the event.
              */
            protected static _dispatchDirect(event: DispatchEvent, args: any[]): void;
            /**
              * Dispatches the event to the listeners for the given uid.
              * @param {string} uid The uid used to find the event listeners.
              * @param {plat.events.DispatchEvent} The event.
              * @param {Array<any>} args The arguments to send to the listeners.
              */
            private static __executeEvent(uid, ev, args);
            /**
              * Calls event listeners with the given context, event, and arguments.
              * @param {any} context The context with which to call the listeners.
              * @param {plat.events.DispatchEvent} The event.
              * @param {Array<(ev: DispatchEvent, ...args: any[]) => void>} The event listeners.
              * @param {Array<any>} args The arguments to send to the listeners.
              */
            private static __callListeners(context, ev, listeners, args);
        }
        /**
          */
        function IEventManagerStatic(_log?: debug.Log, _compat?: Compat, _document?: Document, _window?: Window, _dom?: ui.Dom): IEventManagerStatic;
        /**
          * Manages dispatching events, handling all propagating events as well as any error handling.
          */
        interface IEventManagerStatic {
            /**
              * An upward-moving event will start at the sender and move
              * up the parent chain.
              */
            UP: string | 'up';
            /**
              * A downward-moving event will start at the sender and move
              * to its children and beyond.
              */
            DOWN: string | 'down';
            /**
              * Goes through all listeners for an event name, ignoring order.
              */
            DIRECT: string | 'direct';
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
              * Registers a listener for a DispatchEvent. The listener will be called when a DispatchEvent is
              * propagating over the given uid. Any number of listeners can exist for a single event name.
              * @param {string} uid A unique id to associate with the object registering the listener.
              * @param {string} eventName The name of the event to listen to.
              * @param {(ev: plat.events.DispatchEvent, ...args: any[]) => void} listener The method called when the event is fired.
              * @param {any} context? The context with which to call the listener method.
              */
            on(uid: string, eventName: 'ready' | 'suspend' | 'resume' | 'online' | 'offline' | 'error' | string, listener: (ev: DispatchEvent | LifecycleEvent | ErrorEvent<Error>, ...args: any[]) => void, context?: any): IRemoveListener;
            /**
              * Looks for listeners to a given event name, and fires the listeners using the specified
              * event direction.
              * @param {string} name The name of the event.
              * @param {any} sender The object sending the event.
              * @param {string} direction The direction in which to send the event.
              * @param {Array<any>} args? The arguments to send to the listeners.
              */
            dispatch(name: string, sender: any, direction: 'up' | 'down' | 'direct' | string, args?: any[]): DispatchEvent;
            /**
              * Returns whether or not the given string is a registered direction.
              * @param {string} direction The direction of the event
              */
            hasDirection(direction: string): boolean;
            /**
              * Determines the appropriate direction and dispatches the event accordingly.
              * @param {plat.events.DispatchEvent} event The DispatchEvent to send
              * @param {Array<any>} args The arguments associated with the event
              */
            sendEvent(event: DispatchEvent, args?: any[]): void;
        }
        /**
          * Represents an internal Error Event. This is used for any
          * internal errors (both fatal and warnings). All error events are
          * direct events.
          */
        class ErrorEvent<E extends Error> extends DispatchEvent {
            /**
              * Reference to the IEventManagerStatic injectable.
              */
            protected static _EventManager: IEventManagerStatic;
            /**
              * The error being dispatched.
              */
            error: E;
            /**
              * The severity level of the error.
              */
            logLevel: number;
            /**
              * Creates a new ErrorEvent and fires it.
              * @param {string} name The name of the event.
              * @param {any} sender The sender of the event.
              * @param {E} error The error that occurred, resulting in the event.
              * @param {number} logLevel The severity level of the error
              */
            static dispatch<E extends Error>(name: string, sender: any, error: E, logLevel: number): ErrorEvent<E>;
            /**
              * Initializes the event, populating its public properties.
              * @param {string} name The name of the event.
              * @param {any} sender The sender of the event.
              * @param {string} direction This is always a direct event.
              * @param {E} error The error that occurred, resulting in the event.
              */
            initialize(name: string, sender: any, direction?: string | 'direct', error?: E): void;
        }
        /**
          */
        function IErrorEventStatic(_EventManager?: IEventManagerStatic): IErrorEventStatic;
        /**
          * Dispatches ErrorEvents
          */
        interface IErrorEventStatic {
            /**
              * Creates a new ErrorEvent and fires it.
              * @param {string} name The name of the event.
              * @param {any} sender The sender of the event.
              * @param {E} error The error that occurred, resulting in the event.
              * @param {number} logLevel The severity level of the error
              */
            dispatch<E extends Error>(name: string, sender: any, error: E, logLevel: number): ErrorEvent<E>;
        }
    }
    /**
      * Used for facilitating data and DOM manipulation. Contains lifecycle events
      * as well as properties for communicating with other controls. This is the base
      * class for all types of controls.
      */
    class Control {
        /**
          * Reference to the Log injectable.
          */
        protected static _log: debug.Log;
        /**
          * Reference to the Dom injectable.
          */
        protected static _dom: ui.Dom;
        /**
          * Reference to the Parser injectable.
          */
        protected static _parser: expressions.Parser;
        /**
          * Reference to the ContextManagerStatic injectable.
          */
        protected static _ContextManager: observable.IContextManagerStatic;
        /**
          * Reference to the IEventManagerStatic injectable.
          */
        protected static _EventManager: events.IEventManagerStatic;
        /**
          * Reference to the IPromise injectable.
          */
        protected static _Promise: async.IPromise;
        /**
          * An object containing all controls' registered event listeners.
          */
        private static __eventListeners;
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
        parent: ui.TemplateControl;
        /**
          * The HTMLElement that represents this Control. Should only be modified by controls that implement
          * TemplateControl. During initialize the control should populate this element with what it wishes
          * to render to the user.
          */
        element: HTMLElement;
        /**
          * The attributes object representing all the attributes for a Control's element. All attributes are
          * converted from dash notation to camelCase.
          */
        attributes: ui.Attributes;
        /**
          * Contains DOM helper methods for manipulating this control's element.
          */
        dom: ui.Dom;
        /**
          * Contains helper methods for data manipulation.
          */
        utils: Utils;
        /**
          * Reference to the Log injectable.
          */
        protected _log: debug.Log;
        /**
          * Finds the ancestor control for the given control that contains the root
          * context.
          * @param {plat.Control} control The control with which to find the root.
          */
        static getRootControl(control: Control): ui.TemplateControl;
        /**
          * Given a control, calls the loaded method for the control if it exists.
          * @param {plat.Control} control The control to load.
          */
        static load(control: Control): async.Promise<void>;
        /**
          * Disposes all the necessary memory for a control. Uses specific dispose
          * methods related to a control's constructor if necessary.
          * @param {plat.Control} control The Control to dispose.
          */
        static dispose(control: Control): void;
        /**
          * Splices a control from its parent's controls list. Sets the control's parent
          * to null.
          * @param {plat.Control} control The control whose parent will be removed.
          */
        static removeParent(control: Control): void;
        /**
          * Removes all event listeners for a control with the given uid.
          * @param {plat.Control} control The control having its event listeners removed.
          */
        static removeEventListeners(control: Control): void;
        /**
          * Returns a new instance of Control.
          */
        static getInstance(): Control;
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
          * @param {plat.Control} control The at which to start searching for key/value pairs.
          * @param {string} key The key to search for on all the controls in the tree.
          * @param {string} value The expected value used to find similar controls.
          */
        private static __getControls<T>(control, key, value);
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
        getControlsByName(name: string): Control[];
        /**
          * Retrieves all the controls of the specified type.
          * @param {new () => T} Constructor The constructor used to find controls.
          */
        getControlsByType<T extends Control>(type: string | (new () => T)): T[];
        /**
          * Adds an event listener of the specified type to the specified element. Removal of the
          * event is handled automatically upon disposal.
          * @param {EventTarget} element The element to add the event listener to.
          * @param {string}  type The type of event to listen to.
          * @param {EventListener} listener The listener to fire when the event occurs.
          * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
          * of event propagation.
          */
        addEventListener(element: EventTarget, type: string, listener: ui.IGestureListener | EventListener, useCapture?: boolean): IRemoveListener;
        /**
          * Allows a Control to observe any property on its context and receive updates when
          * the property is changed.
          * @param {plat.IIdentifierChangedListener<T>} listener The method called when the property is changed. This method
          * will have its 'this' context set to the control instance.
          * @param {number} index? The index that denotes the item in the context if the context is an Array.
          */
        observe<T>(listener: (value: T, oldValue: T, identifier: number | string) => void, identifier?: number | string): IRemoveListener;
        /**
          * Allows a Control to observe an array and receive updates when certain array-changing methods are called.
          * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method currently does not watch
          * every item in the array.
          * @param {(changes: Array<plat.observable.IArrayChanges<any>>, identifier: string) => void} listener The method called
          * after an array-changing method is called. This method will have its 'this' context set to the control instance.
          * @param {string} identifier? The property string that denotes the array in the context.
          */
        observeArray<T>(listener: (changes: observable.IArrayChanges<T>[], identifier: string) => void, identifier?: string): IRemoveListener;
        /**
          * Allows a Control to observe an array and receive updates when certain array-changing methods are called.
          * The methods watched are push, pop, shift, sort, splice, reverse, and unshift. This method currently does not watch
          * every item in the array.
          * @param {(changes: Array<plat.observable.IArrayChanges<T>>, identifier: number) => void} listener The method called
          * after an array-changing method is called. This method will have its 'this' context set to the control instance.
          * @param {number} identifier? The index that denotes the array in the context if the context is an Array.
          */
        observeArray<T>(listener: (changes: observable.IArrayChanges<T>[], identifier: number) => void, identifier?: number): IRemoveListener;
        /**
          * Using a IParsedExpression observes any associated identifiers. When an identifier
          * value changes, the listener will be called.
          * @param {plat.IIdentifierChangedListener<T>} listener The listener to call when the expression identifer values change.
          * @param {plat.expressions.IParsedExpression} expression The expression string to watch for changes.
          */
        observeExpression<T>(listener: (value: T, oldValue: T, expression: expressions.IParsedExpression | string) => void, expression: expressions.IParsedExpression | string): IRemoveListener;
        /**
          * Evaluates an IParsedExpression using the control.parent.context.
          * @param {string} expression The expression string to evaluate.
          * @param {IObject<any>} aliases Optional alias values to parse with the expression
          */
        evaluateExpression(expression: string | expressions.IParsedExpression, aliases?: IObject<any>): any;
        /**
          * Finds the first instance of the specified property
          * in the parent control chain. Returns undefined if not found.
          * @param {string} property The property identifer
          * @param {plat.Control} control? An optional control to use as a starting point to find the property.
          * If nothing is passed in, then the control calling the method will be the starting point.
          */
        findProperty(property: string, control?: Control): IControlProperty;
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
        dispatchEvent(name: string, direction?: 'up' | 'down' | 'direct' | string, ...args: any[]): void;
        /**
          * Registers a listener for a DispatchEvent. The listener will be called when a
          * DispatchEvent is propagating over the control. Any number of listeners can exist
          * for a single event name.
          * @param {string} name The name of the event, coinciding with the DispatchEvent name.
          * @param {(ev: plat.events.DispatchEvent, ...args: Array<any>) => void} listener The method called when the
          * DispatchEvent is fired.
          */
        on(name: string, listener: (ev: events.DispatchEvent, ...args: any[]) => void): IRemoveListener;
        /**
          * The dispose event is called when a control is being removed from memory. A control should release
          * all of the memory it is using, including DOM event and property listeners.
          */
        dispose(): void;
    }
    /**
      */
    function IControlFactory(_parser?: expressions.Parser, _ContextManager?: observable.IContextManagerStatic, _EventManager?: events.IEventManagerStatic, _Promise?: async.IPromise, _dom?: ui.Dom, _log?: debug.Log): IControlFactory;
    /**
      * Creates and manages instances of Control.
      */
    interface IControlFactory {
        /**
          * Finds the ancestor control for the given control that contains the root
          * context.
          * @param {plat.Control} control The control with which to find the root.
          */
        getRootControl(control: Control): ui.TemplateControl;
        /**
          * Given a control, calls the loaded method for the control if it exists.
          * @param {plat.Control} control The control to load.
          */
        load(control: Control): async.Promise<void>;
        /**
          * Disposes all the necessary memory for a control. Uses specific dispose
          * methods related to a control's constructor if necessary.
          * @param {plat.Control} control The Control to dispose.
          */
        dispose(control: Control): void;
        /**
          * Splices a control from its parent's controls list. Sets the control's parent
          * to null.
          * @param {plat.Control} control The control whose parent will be removed.
          */
        removeParent(control: Control): void;
        /**
          * Removes all event listeners for a control with the given uid.
          * @param {plat.Control} control The control having its event listeners removed.
          */
        removeEventListeners(control: Control): void;
        /**
          * Returns a new instance of Control.
          */
        getInstance(): Control;
    }
    /**
      * An object that links a property to a control.
      */
    interface IControlProperty {
        /**
          * The parsed expression of the control property.
          */
        expression: expressions.IParsedExpression;
        /**
          * The value of the property.
          */
        value: any;
        /**
          * The control on which the property is found.
          */
        control: Control;
    }
    /**
      * A type of control that can be used as an attribute but will
      * not be used to add, remove, or modify DOM.
      */
    class AttributeControl extends Control {
        /**
          * Specifies the TemplateControl associated with this
          * control's element. Can be null if no TemplateControl
          * exists.
          */
        templateControl: ui.TemplateControl;
        /**
          * Method for disposing an attribute control. Removes any
          * necessary objects from the control.
          * @param {plat.AttributeControl} control The AttributeControl to dispose.
          */
        static dispose(control: AttributeControl): void;
        /**
          * Returns a new instance of AttributeControl.
          */
        static getInstance(): AttributeControl;
    }
    /**
      */
    function IAttributeControlFactory(): IAttributeControlFactory;
    /**
      * Creates and manages instances of AttributeControl.
      */
    interface IAttributeControlFactory {
        /**
          * Method for disposing an attribute control. Removes any
          * necessary objects from the control.
          * @param {plat.AttributeControl} control The AttributeControl to dispose.
          */
        dispose(control: AttributeControl): void;
        /**
          * Returns a new instance of AttributeControl.
          */
        getInstance(): AttributeControl;
    }
    /**
      * Holds all the classes and interfaces related to UI components for platypus.
      */
    namespace ui {
        /**
          * The base control for any control that affects the UI. They provide properties for the control to use
          * to manage its body HTML.
          */
        class TemplateControl extends Control {
            /**
              * Reference to the IResourcesFactory injectable.
              */
            protected static _ResourcesFactory: IResourcesFactory;
            /**
              * Reference to the IBindableTemplatesFactory injectable.
              */
            protected static _BindableTemplatesFactory: IBindableTemplatesFactory;
            /**
              * Reference to a cache injectable that stores ElementManagers.
              */
            protected static _managerCache: storage.Cache<processing.ElementManager>;
            /**
              * Reference to a cache injectable that stores and retrieves HTML templates.
              */
            protected static _templateCache: storage.TemplateCache;
            /**
              * Reference to the Parser injectable.
              */
            protected static _parser: expressions.Parser;
            /**
              * Reference to the Http injectable.
              */
            protected static _http: async.Http;
            /**
              * Reference to the IPromise injectable.
              */
            protected static _Promise: async.IPromise;
            /**
              * Reference to the Log injectable.
              */
            protected static _log: debug.Log;
            /**
              * An object for quickly retrieving previously accessed resources.
              */
            private static __resourceCache;
            /**
              * By default TemplateControls have a priority of 100.
              */
            priority: number;
            /**
              * The context of an TemplateControl, used for inheritance and data-binding.
              */
            context: any;
            /**
              * The name of a TemplateControl if a Name
              * control is involved.
              */
            name: string;
            /**
              * Specifies the absolute path from where the context was created to this Control's context.
              * Used by the ContextManager for maintaining context parity
              * (e.g. 'context.childContextProperty.grandChildContextProperty').
              */
            absoluteContextPath: string;
            /**
              * Resources are used for providing aliases to use in markup expressions. They
              * are particularly useful when trying to access properties outside of the
              * current context, as well as reassigning context at any point in an app.
              */
            resources: Resources;
            /**
              * Flag indicating whether or not the TemplateControl defines the context property.
              */
            hasOwnContext: boolean;
            /**
              * A string representing the DOM template for this control. If this property is
              * defined on a TemplateControl then DOM will be created and put in the
              * control's element prior to calling the 'setTemplate' method.
              */
            templateString: string;
            /**
              * A url containing a string representing the DOM template for this control. If this property is
              * defined on a TemplateControl then DOM will be created and put in the
              * control's element prior to calling the `setTemplate` method. This property takes
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
              * An BindableTemplates object used for binding a data context to a template.
              * This is an advanced function of a TemplateControl.
              */
            bindableTemplates: BindableTemplates;
            /**
              * An array of child controls. Any controls created by this control can be found in this array. The controls in
              * this array will have reference to this control in their parent property.
              */
            controls: Control[];
            /**
              * A Node array for managing the TemplateControl's childNodes in the event that this control
              * replaces its element. This property will only exist/be of use for a TemplateControl that
              * implements the replaceWith property. This is an experimental API.
              */
            elementNodes: Node[];
            /**
              * The first node in the TemplateControl's body. This property allows an
              * TemplateControl to add nodes to its body in the event that it replaces its element.
              * This is an experimental API.
              */
            startNode: Comment;
            /**
              * The last node in the TemplateControl's body. This property allows a
              * TemplateControl to add nodes to its body in the event that it replaces its element.
              * This is an experimental API.
              */
            endNode: Comment;
            /**
              * Allows a TemplateControl to either swap its element with another element (e.g. plat-select),
              * or replace its element altogether. If null or empty string, the element will be removed from the DOM, and the
              * childNodes of the element will be in its place. In addition, when the element is placed startNode and endNode Comments
              * are created, and the childNodes are added to the elementNodes property on the control. The replaceWith
              * property can be any property that works with document.createElement(). If the control's element had
              * attributes (as well as attribute Controls), those attributes will be carried to the swapped element. The default
              * replaceWith is 'any,' meaning it will default to a 'div' in the case that the control type is used as the
              * element's nodename (e.g. `<plat-foreach plat-context="..."></plat-foreach>`), but will maintain whatever element type
              * is used otherwise (e.g. `<tr plat-control="plat-foreach" plat-context="..."></tr>`).
              */
            replaceWith: string;
            /**
              * Set to the root ancestor control from which this control inherits its context. This value
              * can be equal to this control.
              */
            root: TemplateControl;
            /**
              * Evaluates an expression string with a given control and optional control's context and aliases.
              * @param {plat.expressions.IParsedExpression} expression A parsed expression object created using the
              * plat.expressions.Parser injectable.
              * @param {plat.ui.TemplateControl} control? The control used for evaluation context.
              * @param {IObject<any>} aliases? An optional alias object containing resource alias values (property keys should
              * not include the `@` character).
              */
            static evaluateExpression(expression: string | expressions.IParsedExpression, control?: TemplateControl, aliases?: IObject<any>): any;
            /**
              * Given a control and Array of aliases, finds the associated resources and builds a context object containing
              * the values. Returns the object.
              * @param {plat.ui.TemplateControl} control The control used as the starting point for finding resources.
              * @param {Array<string>} aliases An array of aliases to search for.
              * @param {IObject<any>} resources? An optional resources object to extend, if no resources object is passed in a
              * new one will be created.
              */
            static getResources(control: TemplateControl, aliases: string[], resources?: IObject<any>): IObject<any>;
            /**
              * Starts at a control and searches up its parent chain for a particular resource alias.
              * If the resource is found, it will be returned along with the control instance on which
              * the resource was found.
              * @param {plat.ui.TemplateControl} control The control on which to start searching for the resource alias.
              * @param {string} alias The alias to search for.
              */
            static findResource(control: TemplateControl, alias: string): {
                resource: IResource;
                control: TemplateControl;
            };
            /**
              * Recursively disposes a control and its children.
              * @param {plat.ui.TemplateControl} control A control to dispose.
              */
            static dispose(control: TemplateControl): void;
            /**
              * Loads the control tree depth first (visit children, then visit self).
              * @param {plat.ui.TemplateControl} control The control serving as the root control to load.
              */
            static loadControl(control: TemplateControl): void;
            /**
              * Notifies a control that its context has been changed by
              * calling the `control.contextChanged` method if it exists.
              * @param {plat.ui.TemplateControl} control The control whose context changed.
              * @param {any} newValue The new value of the control's context.
              * @param {any} oldValue The old value of the control's context.
              */
            static contextChanged(control: TemplateControl, newValue: any, oldValue: any): void;
            /**
              * Sets the `context` resource value on a TemplateControl. If the control specifies
              * hasOwnContext as true, the `rootContext` resource value will be set.
              * @param {plat.ui.TemplateControl} control The control whose context resources will be set.
              */
            static setContextResources(control: TemplateControl): void;
            /**
              * Completely removes a control's element from its parentNode.
              * @param {plat.ui.TemplateControl} control The control whose element should be removed.
              */
            static removeElement(control: TemplateControl): void;
            /**
              * Sets the absoluteContextPath read-only property on a control.
              * @param {plat.ui.TemplateControl} control The control on which to set the absoluteContextPath.
              * @param {string} path The path to set on the control.
              */
            static setAbsoluteContextPath(control: TemplateControl, path: string): void;
            /**
              * Determines the template for a control by searching for a templateUrl,
              * using the provided templateUrl, or serializing the control's templateString.
              * @param {plat.ui.TemplateControl} control The control whose template is being determined.
              * @param {string} templateUrl? The potential template URL to use to grab the template.
              */
            static determineTemplate(control: TemplateControl, templateUrl?: string): async.Promise<DocumentFragment>;
            /**
              * Detaches a TemplateControl. Disposes its children,
              * but does not dispose the TemplateControl.
              * @param {plat.ui.TemplateControl} control The control to be detached.
              */
            static detach(control: TemplateControl): void;
            /**
              * Returns a new instance of TemplateControl.
              */
            static getInstance(): TemplateControl;
            /**
              * This event is fired when an TemplateControl's context property
              * is changed by an ancestor control.
              * @param {any} newValue? The new value of the context.
              * @param {any} oldValue The old value of the context.
              */
            contextChanged(newValue: any, oldValue: any): void;
            /**
              * A method called for TemplateControls to set their template.
              * During this method a control should ready its template for compilation. Whatever is in the control's
              * element (or elementNodes if replaceWith is implemented) after this method's execution will be compiled
              * and appear on the DOM.
              */
            setTemplate(): void;
            /**
              * Finds the associated resources and builds a context object containing
              * the values.
              * @param {Array<string>} aliases An array of aliases to search for.
              * @param {IObject<any>} resources? An optional resources object to extend,
              * if no resources object is passed in a new one will be created.
              */
            getResources(aliases: string[], resources?: IObject<any>): IObject<any>;
            /**
              * Starts at a control and searches up its parent chain for a particular resource alias.
              * If the resource is found, it will be returned along with the control instance on which
              * the resource was found.
              * @param {string} alias The alias to search for.
              */
            findResource(alias: string): {
                resource: IResource;
                control: TemplateControl;
            };
            /**
              * Evaluates an expression string, using the input context or control.context.
              * @param {plat.expressions.IParsedExpression} expression The previously parsed expression to evaluate.
              * @param {any} context? An optional context with which to parse. If
              * no context is specified, the control.context will be used.
              */
            evaluateExpression(expression: string | expressions.IParsedExpression, context?: any): any;
        }
        /**
          */
        function ITemplateControlFactory(_ResourcesFactory?: IResourcesFactory, _BindableTemplatesFactory?: IBindableTemplatesFactory, _managerCache?: storage.Cache<processing.ElementManager>, _templateCache?: storage.TemplateCache, _parser?: expressions.Parser, _http?: async.Http, _Promise?: async.IPromise, _log?: debug.Log): ITemplateControlFactory;
        /**
          * Creates and manages TemplateControls.
          */
        interface ITemplateControlFactory {
            /**
              * Evaluates an expression string with a given control and optional control's context and aliases.
              * @param {plat.expressions.IParsedExpression} expression A parsed expression object created using the
              * plat.expressions.Parser injectable.
              * @param {plat.ui.TemplateControl} control? The control used for evaluation context.
              * @param {IObject<any>} aliases? An optional alias object containing resource alias values
              */
            evaluateExpression(expression: string | expressions.IParsedExpression, control?: TemplateControl, aliases?: IObject<any>): any;
            /**
              * Given a control and Array of aliases, finds the associated resources and builds a context object containing
              * the values. Returns the object.
              * @param {plat.ui.TemplateControl} control The control used as the starting point for finding resources.
              * @param {Array<string>} aliases An array of aliases to search for.
              * @param {IObject<any>} resources? An optional resources object to extend,
              * if no resources object is passed in a new one will be created.
              */
            getResources(control: TemplateControl, aliases: string[], resources?: IObject<any>): IObject<any>;
            /**
              * Starts at a control and searches up its parent chain for a particular resource alias.
              * If the resource is found, it will be returned along with the control instance on which
              * the resource was found.
              * @param {plat.ui.TemplateControl} control The control on which to start searching for the resource alias.
              * @param {string} alias The alias to search for.
              */
            findResource(control: TemplateControl, alias: string): {
                resource: IResource;
                control: TemplateControl;
            };
            /**
              * Recursively disposes a control and its children.
              * @param {plat.ui.TemplateControl} control A control to dispose.
              */
            dispose(control: TemplateControl): void;
            /**
              * Loads the control tree depth first (visit children, then visit self).
              * @param {plat.ui.TemplateControl} control The control serving as the root control to load.
              */
            loadControl(control: TemplateControl): void;
            /**
              * Notifies a control that its context has been changed by
              * calling the `control.contextChanged` method if it exists.
              * @param {plat.ui.TemplateControl} control The control whose context changed.
              * @param {any} newValue The new value of the control's context.
              * @param {any} oldValue The old value of the control's context.
              */
            contextChanged(control: TemplateControl, newValue: any, oldValue: any): void;
            /**
              * Sets the `context` resource value on a TemplateControl. If the control specifies
              * hasOwnContext as true, the `rootContext` resource value will be set.
              * @param {plat.ui.TemplateControl} control The control whose context resources will be set.
              */
            setContextResources(control: TemplateControl): void;
            /**
              * Completely removes a control's element from its parentNode.
              * @param {plat.ui.TemplateControl} control The control whose element should be removed.
              */
            removeElement(control: TemplateControl): void;
            /**
              * Sets the absoluteContextPath read-only property on a control.
              * @param {plat.ui.TemplateControl} control The control on which to set the absoluteContextPath.
              * @param {string} path The path to set on the control.
              */
            setAbsoluteContextPath(control: TemplateControl, path: string): void;
            /**
              * Determines the template for a control by searching for a templateUrl,
              * using the provided templateUrl, or serializing the control's templateString.
              * @param {plat.ui.TemplateControl} control The control whose template is being determined.
              * @param {string} templateUrl? The potential template URL to use to grab the template.
              */
            determineTemplate(control: TemplateControl, templateUrl?: string): async.Promise<DocumentFragment>;
            /**
              * Detaches a TemplateControl. Disposes its children,
              * but does not dispose the TemplateControl.
              * @param {plat.ui.TemplateControl} control The control to be detached.
              */
            detach(control: TemplateControl): void;
            /**
              * Returns a new instance of TemplateControl.
              */
            getInstance(): TemplateControl;
        }
        /**
          * An extended TemplateControl that allows for the binding of a value to
          * another listening control (e.g. plat-bind control).
          */
        class BindControl extends TemplateControl implements observable.ISupportTwoWayBinding {
            /**
              * Set to 120, higher than `plat-bind` to ensure that BinControls load
              * prior to the `plat-bind`.
              */
            priority: number;
            /**
              * The set of functions added externally that listens
              * for property changes.
              */
            protected _listeners: IPropertyChangedListener<any>[];
            /**
              * Adds a listener to be called when the bindable property changes.
              * @param {plat.IPropertyChangedListener<any>} listener The function that acts as a listener.
              */
            onInput(listener: (newValue: any, oldValue: any) => void): IRemoveListener;
            /**
              * A function that allows this control to observe both the bound property itself as well as
              * potential child properties if being bound to an object.
              * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
              * data-binding.
              */
            observeProperties(binder: observable.IImplementTwoWayBinding): void;
            /**
              * A function that signifies when this control's bindable property has changed.
              * @param {any} newValue The new value of the property after the change.
              * @param {any} oldValue? The old value of the property prior to the change.
              */
            inputChanged(newValue: any, oldValue?: any): void;
            /**
              * Removes references to the listeners
              * defined externally.
              */
            dispose(): void;
        }
        /**
          * A control used in a Viewport for page navigation. The
          * control has navigation events that are called when navigating to and from the control. A ViewControl
          * represents a routing component on a page (i.e. a piece of a page that is associated with a particular route).
          * It has the ability to initiate, approve, and reject navigation to/from itself. A ViewControl also has the
          * ability to inject a Router and configure sub-navigation.
          */
        class ViewControl extends TemplateControl implements ISupportNavigation {
            /**
              * Specifies that this control will have its own context, and it should not inherit a context.
              */
            hasOwnContext: boolean;
            /**
              * Every ViewControl inside a Viewport will have a navigator. The navigator is linked to
              * the router for the Viewport containing the ViewControl.
              */
            navigator: routing.Navigator;
            /**
              * Recursively disposes a ViewControl and its children.
              * @param {plat.ui.ViewControl} control A control to dispose.
              */
            static dispose(control: TemplateControl): void;
            /**
              * Returns a new instance of a ViewControl.
              */
            static getInstance(): ViewControl;
            /**
              * Allows a ViewControl to asynchronously decide if the app is able to navigate away from the
              * current view. A possible use of this method might be to popup a confirmation modal. You can
              * return a boolean or Promise<boolean> to accept/reject navigation.
              * A word of caution, this is a navigation-blocking function. It is best to avoid long-running functions.
              */
            canNavigateFrom(): any;
            /**
              * Allows a ViewControl to asynchronously decide if it can be navigated to with the given parameters/query.
              * You can return a boolean or Promise<boolean> to accept/reject navigation.
              * A word of caution, this is a navigation-blocking function. It is best to avoid long-running functions.
              */
            canNavigateTo(parameters: any, query: any): any;
            /**
              * This method is called when the ViewControl is going out of scope as a result of a navigation.
              */
            navigatingFrom(): any;
            /**
              * This method is called when the ViewControl has come into scope as a result of navigation. It can
              * receive the route parameters and query in order to set its context.
              */
            navigatedTo(parameters: any, query: any): any;
        }
        /**
          * A control can implement this interface in order to support app navigation. This means the control can be linked to an
          * object that implements the ISupportRouteNavigation interface (e.g. a
          * Viewport).
          */
        interface ISupportNavigation {
            /**
              * When a control is linked to a Viewport, it will have a navigator for facilitating
              * navigation.
              */
            navigator?: routing.Navigator;
            /**
              * Allows a control to asynchronously decide if the app is able to navigate away from the
              * current view. A possible use of this method might be to popup a confirmation modal. You can
              * return a boolean or Promise<boolean> to accept/reject navigation.
              * A word of caution, this is a navigation-blocking function. It is best to avoid long-running functions.
              */
            canNavigateFrom(): any;
            /**
              * Allows a control to asynchronously decide if it can be navigated to with the given parameters/query.
              * You can return a boolean or Promise<boolean> to accept/reject navigation.
              * A word of caution, this is a navigation-blocking function. It is best to avoid long-running functions.
              */
            canNavigateTo(parameters: any, query: any): any;
            /**
              * This method is called when the control is going out of scope as a result of a navigation.
              */
            navigatingFrom(): any;
            /**
              * This method is called when the control has come into scope as a result of navigation. It can
              * receive the route parameters and query in order to set its context.
              */
            navigatedTo(parameters: any, query: any): any;
        }
        /**
          * An extensible class dealing with the creation, deletion, and modification
          * of DOM.
          */
        class Dom {
            protected static _inject: any;
            /**
              * Reference to the DomEvents injectable.
              */
            protected _domEvents: DomEvents;
            /**
              * Adds an event listener of the specified type to the specified element.
              * @param {Window} element The window object.
              * @param {string} type The type of event to listen to.
              * @param {EventListener} listener The listener to fire when the event occurs.
              * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
              * of event propagation.
              */
            addEventListener(element: Window | Node, type: string, listener: IGestureListener | EventListener, useCapture?: boolean): IRemoveListener;
            /**
              * Takes a NodeList and either adds it to the passed in Node,
              * or creates a DocumentFragment and adds the NodeList to the
              * Fragment.
              * @param {NodeList} nodeList A NodeList to be appended to the root/DocumentFragment.
              * @param {Node} root? An optional Node to append the nodeList.
              */
            appendChildren(nodeList: Node[] | NodeList, root?: Node): Node;
            /**
              * Takes a NodeList, clones the nodes, and either adds it to the passed in Node,
              * or creates a DocumentFragment and adds the NodeList to the
              * Fragment.
              * @param {NodeList} nodeList A NodeList to be appended to the root/DocumentFragment.
              * @param {Node} root? An optional Node to append the nodeList.
              */
            cloneChildren(nodeList: Node[] | NodeList, root?: Node): Node;
            /**
              * Clears a DOM Node by removing all of its childNodes.
              * @param {Node} node The DOM Node to clear.
              */
            clearNode(node: Node): void;
            /**
              * Removes all the Nodes in the NodeList from the parent Node.
              * @param {NodeList} nodeList The NodeList to remove from the parent Node.
              * @param {Node} parent? The parent Node used to remove the nodeList.
              */
            clearNodeBlock(nodeList: Node[] | NodeList, parent?: Node): void;
            /**
              * Sets the innerHTML of a Node. Can take in a Node rather than an Element
              * because it does not use innerHTML on the passed-in Node (it appends its
              * childNodes).
              * @param {Node} node The Node to set innerHTML.
              * @param {string} html HTML string to be put inside the node.
              */
            setInnerHtml(node: Node, html: string): Node;
            /**
              * Inserts a Node before the designated end Node.
              * @param {Node} parent The parent node into which to insert nodes.
              * @param {Node} node The Node to insert into the parent.
              * @param {Node} endNode? An optional endNode to use to insert nodes.
              */
            insertBefore(parent: Node, nodes: Node[] | NodeList | DocumentFragment | Node, endNode?: Node): Node[];
            /**
              * Takes the child nodes of the given node and places them above the node
              * in the DOM. Then removes the given node.
              * @param {Node} node The Node to replace.
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
              */
            hasClass(element: Element, className: string): boolean;
            /**
              * Retrieves and serializes HTML from an HTML template file using ajax. Will facilitate caching the template
              * as well.
              * @param {string} templateUrl The url where the HTML template is stored.
              */
            getTemplate(templateUrl: string): async.Promise<DocumentFragment>;
            /**
              * Inspects the Element and resolves when the Element is present in the DOM body.
              * @param {() => void} cb A callback that will fire when the element is present in the DOM body.
              * @param {Element} element The element whose presence is being inspected.
              */
            whenPresent(cb: () => void, element: Element): IRemoveListener;
            /**
              * Inspects the Element and resolves when the Element is visible in the DOM.
              * @param {() => void} cb A callback that will fire when the element is visible in the DOM.
              * @param {Element} element The element whose visibility is being inspected.
              */
            whenVisible(cb: () => void, element: Element): IRemoveListener;
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
          * The class which provides a way for TemplateControls to bind a template
          * to a context. Useful for narrowing context without needing another
          * TemplateControl. In addition, this object provides a performance increase because
          * it will only compile the template once. This object is also useful when a
          * TemplateControls expects multiple configuration templates in its innerHTML. It can
          * separate those templates and reuse them accordingly.
          */
        class BindableTemplates {
            /**
              * Reference to the IResourcesFactory injectable.
              */
            protected _ResourcesFactory: IResourcesFactory;
            /**
              * Reference to the IControlFactory injectable.
              */
            protected _ControlFactory: IControlFactory;
            /**
              * Reference to the ITemplateControlFactory injectable.
              */
            protected _TemplateControlFactory: ITemplateControlFactory;
            /**
              * Reference to the IContextManagerStatic injectable.
              */
            protected _ContextManager: observable.IContextManagerStatic;
            /**
              * Reference to the IPromise injectable.
              */
            protected _Promise: async.IPromise;
            /**
              * Reference to a cache injectable that stores ElementManagers.
              */
            protected _managerCache: storage.Cache<processing.ElementManager>;
            /**
              * Reference to the Document injectable.
              */
            protected _document: Document;
            /**
              * Reference to the IElementManagerFactory injectable.
              */
            protected _ElementManagerFactory: processing.IElementManagerFactory;
            /**
              * Reference to the BindableTemplatesFactory injectable.
              */
            protected _BindableTemplatesFactory: IBindableTemplatesFactory;
            /**
              * Reference to the Log injectable.
              */
            protected _log: debug.Log;
            /**
              * The control containing this BindableTemplates object.
              */
            control: TemplateControl;
            /**
              * Stores promises that resolve to all the compiled templates for this object, ready to be bound to a data context.
              * All created templates are DocumentFragments, allowing an TemplateControl to
              * easily insert the template into the DOM (without iterating over childNodes).
              */
            templates: IObject<async.Promise<DocumentFragment>>;
            /**
              * A keyed cache of ElementManagers that represent the roots of compiled templates
              * created by this instance.
              */
            cache: IObject<processing.ElementManager>;
            /**
              * A collection of all the controls created while compiling an added template. Useful during disposal.
              */
            private __compiledControls;
            /**
              * Creates a new instance of BindableTemplates and returns it. If a BindableTemplates is
              * passed in, it will use the properties on the original BindableTemplates.
              * @param {plat.ui.TemplateControl} control The TemplateControl
              * containing the new BindableTemplates object, used for data
              * context inheritance for templates.
              * @param {plat.ui.BindableTemplates} original? An optional BindableTemplates
              * object to copy.
              */
            static create(control: TemplateControl, original?: BindableTemplates): BindableTemplates;
            /**
              * Clears the memory being held by control's bindableTemplates.
              * @param {plat.ui.TemplateControl} control The control whose bindableTemplates will be disposed.
              */
            static dispose(control: TemplateControl): void;
            /**
              * Determines whether or not a control was created using bindableTemplates.
              * @param {plat.ui.TemplateControl} control The potential bound control.
              */
            static isBoundControl(control: TemplateControl): boolean;
            /**
              * Adds a template to this object. The template will be stored with the key,
              * and it will be transformed into a DocumentFragment.
              * @param {string} template A template string representing the DOM template.
              * @param {number} relativeIdentifier? The identifier number relative to this control's context
              * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
              * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
              * controls created in the template.
              * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
              * controls created in the template.
              */
            once(template: Element | Node | DocumentFragment | Node[] | NodeList | string, relativeIdentifier?: string | number, resources?: IObject<IResource>): async.Promise<DocumentFragment>;
            /**
              * Method for linking a compiled template to a data context and returning a clone of the template,
              * with all new Controls created if the template contains controls. If no data context
              * is specified, it will be inherited.
              * @param {string} key The key used to retrieve the template.
              * @param {number} relativeIdentifier? The identifier number relative to this control's context
              * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
              * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
              * controls created in the template.
              */
            bind(key: any, relativeIdentifier?: string | number, resources?: IObject<IResource>): async.Promise<DocumentFragment>;
            /**
              * Adds a template to this object. The template will be stored with the key,
              * and it will be transformed into a DocumentFragment.
              * @param {string} key The key used to store the template.
              * @param {string} template A template string representing the DOM template.
              * @param {boolean} overwrite Specifies whether an already-existing template should be overwritten.
              */
            add(key: string, template: Element | Node[] | NodeList | DocumentFragment | Node | string, overwrite?: boolean): void;
            /**
              * Replaces the bound TemplateControl in the child control Array
              * specified by the index with another bound control generated by the template key, relative context
              * identifier, and resources.
              * @param {number} index The index of the bound TemplateControl
              * in the child control Array to replace.
              * @param {string} key The key used to retrieve the template.
              * @param {number} relativeIdentifier? The identifier number relative to this control's context
              * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
              * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
              * controls created in the template.
              */
            replace(index: number, key: string, relativeIdentifier?: number | string, resources?: IObject<IResource>): async.Promise<Node[]>;
            /**
              * Clears the memory being held by this instance.
              */
            dispose(): void;
            /**
              * Method for linking a template to a data context and returning a clone of the template,
              * with all new Controls created if the template contains controls. If no data context
              * is specified, it will be inherited.
              * @param {string} key The key used to retrieve the template.
              * @param {string} relativeIdentifier? The identifier string relative to this control's context
              * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the
              * most efficient way of specifying context, else the framework has to search for the
              * object.
              * @param {plat.IObject<plat.IResource>} resources? An object used as the resources for any top-level
              * controls created in the template.
              * @param {number} index? An optional index only to be used if the newly bound template is intended to
              * replace an existing Control in the child controls Array and its element in the DOM.
              */
            protected _bind(key: any, relativeIdentifier?: any, resources?: IObject<IResource>, index?: number): async.Promise<any>;
            /**
              * Creates the template's bound control and INodeMap and initiates
              * the binding of the INodeMap for a cloned template.
              * @param {string} key The template key.
              * @param {plat.processing.INodeMap} nodeMap The node map to bind.
              */
            protected _bindTemplate(key: string, nodeMap: processing.INodeMap): async.Promise<DocumentFragment>;
            /**
              * Clones the compiled ElementManager using the newly created
              * INodeMap and binds and loads this control's
              * ElementManager.
              * @param {string} key The template key used to grab the ElementManager.
              * @param {plat.processing.INodeMap} nodeMap The node map to bind.
              */
            protected _bindNodeMap(key: string, nodeMap: processing.INodeMap): async.Promise<void>;
            /**
              * Creates the template's compiled, bound control and INodeMap and initiates
              * the compilation of the template.
              * @param {string} key The template key.
              * @param {DocumentFragment} template The HTML template being bound.
              */
            protected _compile(key: string, template: DocumentFragment): void;
            /**
              * Instantiates a new ElementManager for the root of this
              * template and resolves any asynchronous url templates within the template being compiled.
              * @param {plat.ui.TemplateControl} control The newly created control used to bind the template.
              * @param {plat.processing.INodeMap} nodeMap The newly created node map to bind.
              * @param {string} key The template key.
              */
            protected _compileNodeMap(control: TemplateControl, nodeMap: processing.INodeMap, key: string): void;
            /**
              * Creates an INodeMap for either a template being compiled or a
              * template being bound.
              * @param {plat.ui.TemplateControl} uiControl The newly created control used to bind the template.
              * @param {Node} template The template being compiled.
              * @param {string} childContext? A potential child context string identifier.
              */
            protected _createNodeMap(uiControl: TemplateControl, template: Node, childContext?: string | number): processing.INodeMap;
            /**
              * Creates a TemplateControl used for binding either a template being compiled
              * or a template being bound.
              * @param {string} key The template key.
              * @param {DocumentFragment} template The template being compiled or being bound.
              * @param {plat.IObject<plat.ui.IResource>} resources? A set of resources to add to the control used to
              * compile/bind this template.
              */
            protected _createBoundControl(key: string, template: DocumentFragment, childContext?: string | number, resources?: IObject<IResource>): TemplateControl;
        }
        /**
          */
        function IBindableTemplatesFactory(): IBindableTemplatesFactory;
        /**
          * Creates and manages BindableTemplates.
          */
        interface IBindableTemplatesFactory {
            /**
              * Creates a new instance of BindableTemplates and returns it. If a BindableTemplates is
              * passed in, it will use the properties on the original BindableTemplates.
              * @param {plat.ui.TemplateControl} control The TemplateControl
              * containing the new BindableTemplates object, used for data
              * context inheritance for templates.
              * @param {plat.ui.BindableTemplates} original? An optional BindableTemplates
              * object to copy.
              */
            create(control: TemplateControl, original?: BindableTemplates): BindableTemplates;
            /**
              * Creates a new instance of BindableTemplates and returns it. If a BindableTemplates is
              * passed in, it will use the properties on the original BindableTemplates.
              * @param {plat.ui.TemplateControl} control The TemplateControl
              * containing the new BindableTemplates object, used for data
              * context inheritance for templates.
              * @param {plat.ui.BindableTemplates} original? An optional BindableTemplates
              * object to copy.
              */
            create(control: TemplateControl, original?: BindableTemplates): BindableTemplates;
            /**
              * Clears the memory being held by control's bindableTemplates.
              * @param {plat.ui.TemplateControl} control The control whose bindableTemplates will be disposed.
              */
            dispose(control: TemplateControl): void;
            /**
              * Determines whether or not a control was created using bindableTemplates.
              * @param {plat.ui.TemplateControl} control The potential bound control.
              */
            isBoundControl(control: TemplateControl): boolean;
        }
        /**
          * The class that stores the information about an Element's attributes (NamedNodeMap).
          * Methods are implemented to allow you to observe for changes on an attribute.
          */
        class Attributes {
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
            static getInstance(): Attributes;
            /**
              * Initializes this instance with a Control and the camelCased
              * attribute properties and their values.
              * @param {plat.Control} control The function that acts as a listener.
              * @param {plat.IObject<string>} attributes The camelCased attribute properties and their values.
              */
            initialize(control: Control, attributes: IObject<string>): void;
            /**
              * Provides a way to observe an attribute for changes.
              * @param {plat.IPropertyChangedListener} listener The listener function to be called when the attribute changes.
              * @param {string} key The attribute to observe for changes (e.g. 'src').
              */
            observe(listener: (newValue: any, oldValue: any) => void, key: string): IRemoveListener;
            /**
              * Used to show an attribute has been changed and forces listeners to be fired.
              * @param {string} key The attribute being observed for changes (e.g. 'src').
              * @param {any} newValue The new value of the attribute.
              * @param {any} oldValue The previous value of the attribute.
              */
            protected _attributeChanged(key: string, newValue: any, oldValue: any): void;
        }
        function IAttributesFactory(): typeof Attributes;
        /**
          * Resources are used for providing aliases to use in markup expressions. They
          * are particularly useful when trying to access properties outside of the
          * current context, as well as reassigning context at any point in an app.
          */
        class Resources {
            [property: string]: any;
            /**
              * The injectable resource type token.
              */
            static INJECTABLE: string;
            /**
              * The object resource type token. Objects should be literal objects and won't be observed.
              */
            static OBJECT: string;
            /**
              * The observable resource type token. Observable resources are expected to be
              * string identifiers and will be observed.
              */
            static OBSERVABLE: string;
            /**
              * The literal resource type token. Literals will be observed on the resource object,
              * so if you change `resources.<alias>.value` it will be reflected everywhere it is
              * observed.
              */
            static LITERAL: string;
            /**
              * The function resource type token.
              */
            static FUNCTION: string;
            /**
              * Reference to the ContextManagerStatic injectable.
              */
            protected static _ContextManager: observable.IContextManagerStatic;
            /**
              * Reference to the Regex injectable.
              */
            protected static _regex: expressions.Regex;
            /**
              * Reference to the Log injectable.
              */
            protected static _log: debug.Log;
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
              * Populates an IResource value if necessary, and adds it to the given
              * control's resources.
              * @param {plat.ui.TemplateControl} control The control for which to create a resource.
              * @param {plat.ui.IResource} resource The object used to set the resource values.
              */
            static create(control: TemplateControl, resource: IResource): IResource;
            /**
              * Adds resource aliases for `@control` and `@context`. The resources are
              * aliases for the control instance and the control.context.
              * @param {plat.ui.TemplateControl} control The control on which to add the resources.
              */
            static addControlResources(control: TemplateControl): void;
            /**
              * Binds the resources in a resource instance. This involves injecting
              * the injectable resources, creating object/observable resources, and
              * binding functions to the associated control's instance.
              * @param {plat.ui.Resources} resourcesInstance The instance of the
              * Resources object to bind.
              */
            static bindResources(resourcesInstance: Resources): void;
            /**
              * Disposes a resource instance, removing its reference
              * from a control and breaking references to all resource
              * objects.
              * @param {plat.ui.TemplateControl} control The control whose resources will be disposed.
              * @param {boolean} persist? Whether or not to persist a resource object post
              * disposal or set it to null.
              */
            static dispose(control: TemplateControl, persist?: boolean): void;
            /**
              * Parses a resources Element (`<plat-resources>`) and creates
              * an IObject<IResource> with its element children.
              * @param {Element} element The resources element to parse.
              */
            static parseElement(element: Element): IObject<IResource>;
            /**
              * Returns a new instance with type Resources.
              */
            static getInstance(): Resources;
            /**
              * Observes the resource if the type is `observable`.
              * @param {plat.ui.TemplateControl} control The control in charge of the observable resource.
              * @param {plat.ui.IResource} resource The resource to observe.
              */
            protected static _observeResource(control: TemplateControl, resource: IResource): void;
            /**
              * Removes observable resource listeners for a specified control.
              * @param {plat.ui.TemplateControl} control The control whose listeners are being removed.
              */
            protected static _removeListeners(control: TemplateControl): void;
            /**
              * Adds a `@root` alias and `@rootContext` to a control, specifying that it contains the root
              * and root context. Root controls are generally the root ViewControl.
              * @param {plat.ui.TemplateControl} control The root control.
              */
            private static __addRoot(control);
            /**
              * Initializes this Resources instance.
              * @param {plat.ui.TemplateControl} control The control containing this Resources instance.
              * @param {plat.ui.Resources} resources? An optional Resources object used to populate initial
              * IResource objects.
              */
            initialize(controlInstance: TemplateControl, resources?: Element | IObject<IResource> | Resources): void;
            /**
              * Used for programmatically adding IResource objects.
              * @param {Element} element An Element containing resource element children.
              */
            add(resources: IObject<IResource> | Element): void;
        }
        /**
          */
        function IResourcesFactory(_ContextManager?: observable.IContextManagerStatic, _regex?: expressions.Regex, _log?: debug.Log): IResourcesFactory;
        /**
          * Creates and manages Resources for TemplateControls.
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
              * The observable resource type token. Observable resources are expected to be
              * string identifiers and will be observed.
              */
            OBSERVABLE: string;
            /**
              * The literal resource type token. Literals will be observed on the resource object,
              * so if you change `resources.<alias>.value` it will be reflected everywhere it is
              * observed.
              */
            LITERAL: string;
            /**
              * The function resource type token.
              */
            FUNCTION: string;
            /**
              * Populates an IResource value if necessary, and adds it to the given
              * control's resources.
              * @param {plat.ui.TemplateControl} control The control for which to create a resource.
              * @param {plat.ui.IResource} resource The object used to set the resource values.
              */
            create(control: TemplateControl, resource: IResource): IResource;
            /**
              * Adds resource aliases for `@control` and `@context`. The resources are
              * aliases for the control instance and the control.context.
              * @param {plat.ui.TemplateControl} control The control on which to add the resources.
              */
            addControlResources(control: TemplateControl): void;
            /**
              * Binds the resources in a resource instance. This involves injecting
              * the injectable resources, creating object/observable resources, and
              * binding functions to the associated control's instance.
              * @param {plat.ui.Resources} resourcesInstance The instance of the Resources object.
              */
            bindResources(resourcesInstance: Resources): void;
            /**
              * Disposes a resource instance, removing its reference
              * from a control and breaking references to all resource
              * objects.
              * @param {plat.ui.TemplateControl} control The control whose resources will be disposed.
              * @param {boolean} persist? Whether or not to persist a resource object post
              * disposal or set it to null.
              */
            dispose(control: TemplateControl, persist?: boolean): void;
            /**
              * Parses a resources Element (`<plat-resources>`) and creates
              * an IObject<IResource> with its element children.
              * @param {Element} element The resources element to parse.
              */
            parseElement(element: Element): IObject<IResource>;
            /**
              * Returns a new instance with type Resources.
              */
            getInstance(): Resources;
        }
        /**
          * Defines a single resource on the Resources object.
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
        class DomEvents {
            protected static _inject: any;
            /**
              * A configuration object for all DOM events.
              */
            static config: IDomEventsConfig;
            /**
              * An object containing the event types for all of the
              * supported gestures.
              */
            static gestures: IGestures<string>;
            /**
              * An object containing the event types for all of the
              * supported gestures.
              */
            protected _gestures: IGestures<string>;
            /**
              * Reference to the Document injectable.
              */
            protected _document: Document;
            /**
              * Reference to the Compat injectable.
              */
            protected _compat: Compat;
            /**
              * The version of android, or -1 if not on android.
              */
            protected _androidVersion: number;
            /**
              * Whether or not we're on Android 4.4.x or below.
              */
            protected _android44orBelow: boolean;
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
              * The space delimited touch start events defined by this browser.
              */
            protected _startEvents: string;
            /**
              * The space delimited touch move events defined by this browser.
              */
            protected _moveEvents: string;
            /**
              * The space delimited touch end events defined by this browser.
              */
            protected _endEvents: string;
            /**
              * An object containing the number of currently active
              * events of each base type.
              */
            protected _gestureCount: IBaseGestures<number>;
            /**
              * Whether or not the user moved while in touch.
              */
            private __hasMoved;
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
              * A regular expression for determining a "cancel" event.
              */
            private __cancelRegex;
            /**
              * A regular expression for determining a pointer end event.
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
              * Whether or not there are any swipe subscribers for the current target during touch move events.
              */
            private __haveSwipeSubscribers;
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
              * The currently focused or active element.
              */
            private __focusedElement;
            /**
              * A function to stop listening for blur events on the currently focused element.
              */
            private __blurRemover;
            /**
              * A function to stop listening for the phantom click event removal.
              */
            private __delayedClickRemover;
            /**
              * A set of flags signifying whether we should ignore native events or not.
              */
            private __ignoreEvent;
            /**
              * A function with a bound context that prevents default and stops propagation for delayed or phantom clicks.
              */
            private __boundPreventDefaultClick;
            /**
              * A hash map for mapping custom events to standard events.
              */
            private __reverseMap;
            /**
              * An object containing the number of currently active mapped touch
              * events of each type.
              */
            private __mappedCount;
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
              * @param {Window} element The window object.
              * @param {string} type The type of event being listened to.
              * @param {EventListener} listener The listener to be fired.
              * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
              */
            addEventListener(element: Node | Window, type: string, listener: EventListener | IGestureListener, useCapture?: boolean): IRemoveListener;
            /**
              * If DomEvents is inactive, will initialize behavior and
              * begin listening for events.
              */
            initialize(): void;
            /**
              * Stops listening for touch events and resets the DomEvents
              * instance.
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
              * A function for handling and firing mapped events.
              * @param {string} type The event type.
              * @param {plat.ui.IPointerEvent} ev The touch end event object.
              * @param {plat.ui.IPointerEvent} payload The trigger payload.
              */
            private __handleMappedEvents(type, ev, payload);
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
              * @param {plat.ui.IPointerEvent} originalEv The original touch move event object
              * used for preventing default in the case of an ANDROID device.
              */
            private __handleTrack(ev, originalEv);
            /**
              * A function for handling and firing track end events.
              * @param {plat.ui.IPointerEvent} ev The touch end event object.
              */
            private __handleTrackEnd(ev);
            /**
              * A function for determining the proper touch events.
              */
            private __getTypes();
            /**
              * Registers for and starts listening to start and end touch events on the document.
              */
            private __registerTypes();
            /**
              * Un-registers for and stops listening to all touch events on the document.
              */
            private __unregisterTypes();
            /**
              * Registers for and begins listening to a particular touch event type.
              * @param {string} events The events to begin listening for.
              */
            private __registerType(events);
            /**
              * Un-registers for and stops listening to a particular touch event type.
              * @param {string} events The events to stop listening for.
              */
            private __unregisterType(events);
            /**
              * Registers for and begins listening to touch move event types if any moving events are registered.
              * @param {string} eventType The current event's type.
              */
            private __registerMove(eventType);
            /**
              * Registers and associates an element with an event.
              * @param {plat.ui.ICustomElement} element The element being tied to a custom event.
              * @param {string} type The type of event.
              */
            private __registerElement(element, type);
            /**
              * Un-registers and disassociates an element with an event.
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
              */
            private __findFirstSubscriber(eventTarget, type);
            /**
              * Searches from the EventTarget up the DOM tree looking for all elements with the
              * registered event types.
              * @param {plat.ui.ICustomElement} eventTarget The current target of the touch event.
              * @param {Array<string>} types An array of the types of events being searched for.
              */
            private __findFirstSubscribers(eventTarget, types);
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
              * Normalizes the 'buttons' property on an IExtendedEvent.
              * @param {plat.ui.IExtendedEvent} ev The event.
              */
            private __normalizeButtons(ev);
            /**
              * Searches through the input array looking for the primary
              * touch down index.
              * @param {Array<plat.ui.IExtendedEvent>} ev The array of touch event objects
              * to search through.
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
              * @param {number} dtx The change in time in x direction.
              * @param {number} dty The change in time in y direction.
              */
            private __getVelocity(dx, dy, dtx, dty);
            /**
              * Calculates the direction of movement.
              * @param {number} dx The change in x position.
              * @param {number} dy The change in y position.
              */
            private __getDirection(dx, dy);
            /**
              * Checks to see if a swipe direction has changed to recalculate
              * an origin point.
              * @param {plat.ui.IDirection} direction The current vertical and horizontal directions of movement.
              */
            private __handleOriginChange(direction);
            /**
              * Checks to see if a swipe event has been registered.
              * @param {plat.ui.IDirection} direction The current horizontal and vertical directions of movement.
              * @param {plat.ui.IVelocity} velocity The current horizontal and vertical velocities.
              * @param {number} dx The distance in the x direction.
              * @param {number} dy The distance in the y direction.
              */
            private __getRegisteredSwipes(direction, velocity, dx, dy);
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
              * Blurs the currently focused element.
              */
            private __blurFocusedElement();
            /**
              * Listens for blur and then sets the focused element back to null for the next case.
              * @param {HTMLInputElement} target The target to listen for the blur event on.
              */
            private __waitForBlur(target);
            /**
              * Handles a click target case.
              * @param {HTMLInputElement} target The target to handle click functionality for.
              */
            private __clickTarget(target);
            /**
              * Handles HTMLInputElements in WebKit based touch applications.
              * @param {HTMLInputElement} target The target to handle functionality for.
              */
            private __handleInput(target);
            /**
              * Handles the phantom click in WebKit based touch applications.
              */
            private __preventClickFromTouch();
            /**
              * Prevents default and stops propagation for delayed or phantom clicks.
              * @param {Event} ev The event object.
              */
            private __preventDefaultClick(ev);
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
          */
        function IDomEventsConfig(): IDomEventsConfig;
        /**
          * A class for managing a single custom event.
          */
        class DomEvent {
            /**
              * Reference to the Document injectable.
              */
            protected _document: Document;
            /**
              * The node or window object associated with this DomEvent object.
              */
            element: any;
            /**
              * The event type associated with this DomEvent object.
              */
            event: string;
            /**
              * The event type to dispatch. Defaults to 'CustomEvent'.
              */
            eventType: string;
            /**
              * Initializes the element and event of this DomEvent object.
              * @param {Window} element The window object.
              * @param {string} event The event associated with this DomEvent object.
              * @param {string} eventType? The event type associated with this DomEvent object.
              * If not specified, it will default to 'CustomEvent'.
              */
            initialize(element: Node | Window, event: string, eventType?: string): void;
            /**
              * Triggers its event on its element.
              * @param {Object} eventExtension? An event extension to extend the dispatched CustomEvent.
              * @param {any} detailArg? The detail arg to include in the event object
              * @param {Node} dispatchElement? The element to dispatch the Event from. If not specified,
              * this instance's element will be used.
              */
            trigger(eventExtension?: Object, detailArg?: any, dispatchElement?: Node): boolean;
        }
        /**
          * An extended event object containing coordinate, time, and target info.
          */
        interface ITouchStartEventProperties {
            /**
              * Indicates which mouse button is being pressed in a mouse event.
              */
            _buttons?: number;
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
          * An extended event object containing coordinate, time, and target info for a swipe origin.
          */
        interface ISwipeOriginProperties {
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
              * A timestamp.
              */
            xTimestamp?: number;
            /**
              * A timestamp.
              */
            yTimestamp?: number;
            /**
              * The target of an Event object.
              */
            xTarget?: EventTarget;
            /**
              * The target of an Event object.
              */
            yTarget?: EventTarget;
        }
        /**
          * An extended event object potentially containing coordinate and movement information.
          */
        interface IExtendedEvent extends Event {
            _buttons?: number;
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
            _touches?: IExtendedEvent[];
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
        type IGestureListener = (ev?: IGestureEvent) => void;
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
        interface IEventSubscriber extends IGestures<DomEvent> {
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
              */
            x: string;
            /**
              * The vertical, y-direction.
              */
            y: string;
            /**
              * The direction whose vector magnitude is the greatest.
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
              * for a tap event to be fired. Defaults to 300 ms.
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
            /**
              * The delay in milliseconds we preventDefault on click events after a
              * successful touchend event. Defaults to 400 ms.
              */
            delayedClickInterval: number;
        }
        /**
          * Describes an object containing distance information that
          * governs the behavior of certain custom DOM events.
          */
        interface IDistances {
            /**
              * The minimum distance a user must move after touch down to register
              * it as a scroll instead of a tap. Defaults to 3.
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
        namespace animations {
            /**
              * A class used for animating elements.
              */
            class Animator {
                protected static _inject: any;
                /**
                  * Reference to the Compat injectable.
                  */
                protected _compat: Compat;
                /**
                  * Reference to the IPromise injectable.
                  */
                protected _Promise: async.IPromise;
                /**
                  * Reference to the Document injectable.
                  */
                protected _document: Document;
                /**
                  * Objects representing collections of all currently animated elements.
                  */
                protected _animatedElements: IObject<IAnimatedElement>;
                /**
                  * Creates the defined animation denoted by the key but does not start the animation.
                  * @param {Array<Node>} elements The Array of Nodes to be animated. All nodes in the Array must have
                  * the same parent, otherwise the animation will not function correctly.
                  * @param {string} key The identifier specifying the type of animation.
                  * @param {any} options? Specified options for the animation.
                  */
                create(elements: Element | DocumentFragment | NodeList | Node[], key: string, options?: any): IAnimationCreation;
                /**
                  * Animates the element with the defined animation denoted by the key. Similar to `create` but
                  * immediately begins the animation.
                  * @param {Array<Node>} elements The Array of Nodes to be animated. All nodes in the Array must have
                  * the same parent, otherwise the animation will not function correctly.
                  * @param {string} key The identifier specifying the type of animation.
                  * @param {any} options? Specified options for the animation.
                  */
                animate(elements: Element | DocumentFragment | NodeList | Node[], key: string, options?: any): IAnimatingThenable;
                /**
                  * Adds the elements to the DOM and animates them with the defined animation denoted by the key.
                  * @param {Array<Node>} elements The Array of Nodes to be animated. All nodes in the Array must have
                  * the same parent, otherwise the animation will not function correctly.
                  * @param {string} key The identifier specifying the type of animation.
                  * @param {Element} parent The parent element used for adding the elements to the DOM.
                  * @param {Node} refChild? An optional reference node used for placing the element into the DOM
                  * just before itself using the insertBefore function. If this argument is specified, the parent argument
                  * is ignored.
                  * @param {any} options? Specified options for the animation.
                  */
                enter(elements: Element | DocumentFragment | NodeList | Node[], key: string, parent: Element, refChild?: Node, options?: any): IAnimatingThenable;
                /**
                  * Animates the elements with the defined animation denoted by the key and removes them from the DOM when
                  * the animation is finished.
                  * @param {Array<Node>} elements The Array of Nodes to be animated. All nodes in the Array must have
                  * the same parent, otherwise the animation will not function correctly.
                  * @param {string} key The identifier specifying the type of animation.
                  * @param {any} options? Specified options for the animation.
                  */
                leave(elements: Element | DocumentFragment | NodeList | Node[], key: string, options?: any): IAnimatingThenable;
                /**
                  * Removes the elements from the DOM based on the parent argument, initializes them, adds them back to the
                  * DOM using either the refChild or the parent, and animates them with the defined animation denoted by the key.
                  * @param {Array<Node>} elements The Array of Nodes to be animated. All nodes in the Array must have
                  * the same parent, otherwise the animation will not function correctly.
                  * @param {string} key The identifier specifying the type of animation.
                  * @param {Element} parent The parent element used for placing the element back into the DOM at its end if a
                  * refChild is not specified.
                  * @param {Node} refChild? An optional reference node used for placing the element into the DOM
                  * just before itself using the insertBefore function. If this argument is specified, the parent argument
                  * is ignored during DOM insertion.
                  * @param {any} options? Specified options for the animation.
                  */
                move(elements: Element | DocumentFragment | NodeList | Node[], key: string, parent: Element, refChild?: Node, options?: any): IAnimatingThenable;
                /**
                  * Shows the elements just after initialization by removing the `plat-hide` attribute and animates them
                  * with the defined animation denoted by the key.
                  * @param {Array<Node>} elements The Array of Nodes to be animated. All nodes in the Array must have
                  * the same parent, otherwise the animation will not function correctly.
                  * @param {string} key The identifier specifying the type of animation.
                  * @param {any} options? Specified options for the animation.
                  */
                show(elements: Element | DocumentFragment | NodeList | Node[], key: string, options?: any): IAnimatingThenable;
                /**
                  * Animates the elements with the defined animation denoted by the key and hides them by adding the
                  * `plat-hide` attribute after the animation is finished.
                  * @param {Array<Node>} elements The Array of Nodes to be animated. All nodes in the Array must have
                  * the same parent, otherwise the animation will not function correctly.
                  * @param {string} key The identifier specifying the type of animation.
                  * @param {any} options? Specified options for the animation.
                  */
                hide(elements: Element | DocumentFragment | NodeList | Node[], key: string, options?: any): IAnimatingThenable;
                /**
                  * Returns a promise that fulfills when every animation promise in the input array is fulfilled.
                  */
                all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | IAnimationThenable<T1>, T2 | IAnimationThenable<T2>, T3 | IAnimationThenable<T3>, T4 | IAnimationThenable<T4>, T5 | IAnimationThenable<T5>, T6 | IAnimationThenable<T6>, T7 | IAnimationThenable<T7>, T8 | IAnimationThenable<T8>, T9 | IAnimationThenable<T9>, T10 | IAnimationThenable<T10>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
                all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | IAnimationThenable<T1>, T2 | IAnimationThenable<T2>, T3 | IAnimationThenable<T3>, T4 | IAnimationThenable<T4>, T5 | IAnimationThenable<T5>, T6 | IAnimationThenable<T6>, T7 | IAnimationThenable<T7>, T8 | IAnimationThenable<T8>, T9 | IAnimationThenable<T9>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
                all<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | IAnimationThenable<T1>, T2 | IAnimationThenable<T2>, T3 | IAnimationThenable<T3>, T4 | IAnimationThenable<T4>, T5 | IAnimationThenable<T5>, T6 | IAnimationThenable<T6>, T7 | IAnimationThenable<T7>, T8 | IAnimationThenable<T8>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>;
                all<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | IAnimationThenable<T1>, T2 | IAnimationThenable<T2>, T3 | IAnimationThenable<T3>, T4 | IAnimationThenable<T4>, T5 | IAnimationThenable<T5>, T6 | IAnimationThenable<T6>, T7 | IAnimationThenable<T7>]): Promise<[T1, T2, T3, T4, T5, T6, T7]>;
                all<T1, T2, T3, T4, T5, T6>(values: [T1 | IAnimationThenable<T1>, T2 | IAnimationThenable<T2>, T3 | IAnimationThenable<T3>, T4 | IAnimationThenable<T4>, T5 | IAnimationThenable<T5>, T6 | IAnimationThenable<T6>]): Promise<[T1, T2, T3, T4, T5, T6]>;
                all<T1, T2, T3, T4, T5>(values: [T1 | IAnimationThenable<T1>, T2 | IAnimationThenable<T2>, T3 | IAnimationThenable<T3>, T4 | IAnimationThenable<T4>, T5 | IAnimationThenable<T5>]): Promise<[T1, T2, T3, T4, T5]>;
                all<T1, T2, T3, T4>(values: [T1 | IAnimationThenable<T1>, T2 | IAnimationThenable<T2>, T3 | IAnimationThenable<T3>, T4 | IAnimationThenable<T4>]): Promise<[T1, T2, T3, T4]>;
                all<T1, T2, T3>(values: [T1 | IAnimationThenable<T1>, T2 | IAnimationThenable<T2>, T3 | IAnimationThenable<T3>]): Promise<[T1, T2, T3]>;
                all<T1, T2>(values: [T1 | IAnimationThenable<T1>, T2 | IAnimationThenable<T2>]): Promise<[T1, T2]>;
                all<T1>(values: [T1 | IAnimationThenable<T1>]): Promise<[T1]>;
                /**
                  * Immediately resolves an empty AnimationPromise.
                  */
                resolve(): IAnimatingThenable;
                /**
                  * Animates the passed in elements with the given key and handles special animation functionality.
                  * @param {any} elements The Nodes to be animated. All nodes in the Array must have
                  * the same parent, otherwise the animation will not function correctly.
                  * @param {string} key The identifier specifying the type of animation.
                  * @param {any} options? Specified options for the animation.
                  * @param {plat.ui.animations.IAnimationFunction} functionality An object containing detailed information about
                  * special animation functionality.
                  */
                protected _animate(elements: any, key: string, options: any, functionality: IAnimationFunction): IAnimatingThenable;
                /**
                  * Animates the passed in elements with the given key and handles special animation functionality. Returns both
                  * the previous and current animations for the given element(s).
                  * @param {any} elements The Nodes to be animated. All nodes in the Array must have
                  * the same parent, otherwise the animation will not function correctly.
                  * @param {string} key The identifier specifying the type of animation.
                  * @param {any} options? Specified options for the animation.
                  * @param {plat.ui.animations.IAnimationFunction} functionality An object containing detailed information about
                  * special animation functionality.
                  */
                protected _create(elements: any, key: string, options: any, functionality: IAnimationFunction): IAnimationCreation;
                /**
                  * Handles different specialized functionalities immediately before the init portion of the animation cycle.
                  * @param {Array<Node>} nodes All the nodes being animated.
                  * @param {Array<Element>} elementNodes The animatable nodes being animated (only of type Node.ELEMENT_NODE).
                  * @param {plat.ui.animations.IAnimationFunction} functionality The specialized animation function attributes.
                  */
                protected _handlePreInitFunctionality(nodes: Node[], elementNodes: Element[], functionality: IAnimationFunction): void;
                /**
                  * Handles different specialized functionalities immediately after the init portion of the animation cycle.
                  * @param {Array<Node>} nodes All the nodes being animated.
                  * @param {Array<Element>} elementNodes The animatable nodes being animated (only of type Node.ELEMENT_NODE).
                  * @param {plat.ui.animations.IAnimationFunction} functionality The specialized animation function attributes.
                  */
                protected _handlePostInitFunctionality(nodes: Node[], elementNodes: Element[], functionality: IAnimationFunction): void;
                /**
                  * Handles different specialized functionalities at the end portion of the animation cycle.
                  * @param {Array<Node>} nodes All the nodes being animated.
                  * @param {Array<Element>} elementNodes The animatable nodes being animated (only of type Node.ELEMENT_NODE).
                  * @param {plat.ui.animations.IAnimationFunction} functionality The specialized animation function attributes.
                  */
                protected _handleEndFunctionality(nodes: Node[], elementNodes: Element[], functionality: IAnimationFunction): void;
                /**
                  * Sets a new, unique animation ID and denotes the elements as currently being animated.
                  * @param {string} id The animation ID.
                  * @param {Array<Element>} elements The Array of Elements being animated.
                  */
                private __setAnimationId(id, elements);
                /**
                  * Generates a new animated element for the Animator to easily reference and be able
                  * to end later on.
                  * @param {string} id The animation ID.
                  * @param {Array<Element>} elements The Array of Elements being animated.
                  * @param {plat.ui.animations.AnimationPromise} animationPromise The animation's associated promise.
                  */
                private __generateAnimatedElement(id, elements, animationPromise);
                /**
                  * Checks whether or not any parent elements are animating.
                  * @param {Array<Element>} elements The Elements whose parents we need to check.
                  */
                private __isParentAnimating(elements);
                /**
                  * Forces child nodes of an animating element to stop animating.
                  * @param {Element} element The element being animated.
                  */
                private __stopChildAnimations(elements);
                /**
                  * Sifts through an Array of Nodes and finds all animatable Elements and creates
                  * BaseAnimations for them.
                  * @param {any} elements The Array of Nodes, DocumentFragment, or element to sift through.
                  * @param {plat.dependency.Injector<plat.ui.animations.BaseAnimation>} animationInjector The injector to instantiate
                  * BaseAnimations.
                  * @param {Array<Element>} elementNodes The Array of only animatable elements.
                  * @param {Array<plat.ui.animations.BaseAnimation>>} animationInstances An empty Array of animation instances to add to.
                  */
                private __constructAnimatableElements(elements, animationInjector, elementNodes, animationInstances);
            }
            /**
              * Describes an object representing a special animation functionality.
              */
            interface IAnimationFunction {
                /**
                  * The special functionality key.
                  */
                key: string;
                /**
                  * The parent Element of the Element being animated.
                  */
                parent?: Element;
                /**
                  * The reference child for placing the animated Element just before
                  * it in the DOM.
                  */
                refChild?: Node;
            }
            /**
              * Describes an object representing a currently animated element.
              */
            interface IAnimatedElement {
                /**
                  * A promise representing an element's current state of animation.
                  */
                promise?: IAnimationThenable<any>;
                /**
                  * The function called at the conclusion of the animation.
                  * @param {boolean} cancel? Specifies whether the animation is being cancelled.
                  */
                animationEnd(cancel?: boolean): void;
            }
            /**
              * Describes a function used to obtain an animating parent element's animation thenable.
              */
            type IGetAnimatingThenable = () => IAnimationThenable<void>;
            /**
              * Describes a type of Promise that can be optionally cancelled.
              * Further, in the case where it may have a parent that is animating (which will cause it to immediately cancel and fulfill
              * itself, it resolves with a IGetAnimatingThenable for accessing
              * the IAnimationThenable of the animating parent element.
              */
            class AnimationPromise extends async.Promise<IGetAnimatingThenable> implements IAnimationEssentials, IAnimatingThenable {
                /**
                  * Reference to the IPromise injectable.
                  */
                protected _Promise: async.IPromise;
                /**
                  * The state of the animation. 0 prior to start, 1 if started, and
                  * 2 if canceled.
                  */
                private __animationState;
                /**
                  * An Array of animation instances linked to this promise.
                  */
                private __animationInstances;
                /**
                  * The constructor method for the {@link plat.async.AjaxPromise}.
                  * @param {(resolve: (value?: plat.ui.animations.IParentAnimationFn) => any) => void} resolveFunction A resolve function
                  * that only allows for a resolve of void and no reject.
                  * @param {any} promise? The promise object to allow for cancelling the {@link plat.ui.animations.AnimationPromise}.
                  */
                constructor(resolveFunction: (resolve: (value?: IGetAnimatingThenable) => any) => void, promise?: any);
                /**
                  * Initializes the promise, providing it with the {@link plat.ui.animations.BaseAnimation} instance.
                  * @param {Array<plat.ui.animations.IAnimationEssentials>} instances The animation instances or
                  * animation promises for this promise.
                  */
                initialize(instances: IAnimationEssentials | IAnimationEssentials[]): void;
                /**
                  * Gets the associated animation instances or animated promises.
                  */
                getInstances(): IAnimationEssentials[];
                /**
                  * Fires the start method on the animation instances to kickoff the animations.
                  */
                start(): void;
                /**
                  * Fires the pause method on the animation instance.
                  */
                pause(): async.Promise<void>;
                /**
                  * Fires the resume method on the animation instance.
                  */
                resume(): async.Promise<void>;
                /**
                  * A method to cancel the associated animation.
                  */
                cancel(): AnimationPromise;
                /**
                  * A method to determine whether or not this promise has been canceled.
                  */
                isCanceled(): boolean;
                /**
                  * Takes in two methods, called when/if the promise fulfills.
                  * @param {(success: plat.ui.animations.IGetAnimatingThenable) => plat.async.Promise<U>} onFulfilled
                  * A method called when/if the promise fulfills.
                  * If undefined the next onFulfilled method in the promise chain will be called.
                  */
                then<U>(onFulfilled?: (value: any) => U | IAnimatingThenable, onRejected?: (error: any) => U | IAnimatingThenable | void): AnimationPromise;
                /**
                  * A wrapper method for Promise.then(undefined, onRejected);
                  * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
                  * onRejected method in the promise chain will be called.
                  */
                catch<U>(onRejected?: (error: any) => U | IAnimatingThenable): AnimationPromise;
            }
            /**
              * Describes a chaining function that fulfills when the previous link is complete and is
              * able to be caught in the case of an error.
              */
            interface IAnimationThenable<T> extends async.Promise<T>, IAnimationEssentials {
                /**
                  * Initializes the promise, providing it with the {@link plat.ui.animations.BaseAnimation} instance.
                  * @param {plat.ui.animations.BaseAnimation} instance The animation instance for this promise.
                  */
                initialize(instance: BaseAnimation): void;
                /**
                  * Gets the associated animation instances or animated promises.
                  */
                getInstances(): IAnimationEssentials[];
                /**
                  * Fires the start method on the animation instances to kickoff the animations.
                  */
                start(): void;
                /**
                  * Fires the pause method on the animation instance.
                  */
                pause(): async.Promise<void>;
                /**
                  * Fires the resume method on the animation instance.
                  */
                resume(): async.Promise<void>;
                /**
                  * A method to cancel the associated animation.
                  */
                cancel(): AnimationPromise;
                /**
                  * A method to determine whether or not this promise has been canceled.
                  */
                isCanceled(): boolean;
                /**
                  * Takes in two methods, called when/if the promise fulfills/rejects.
                  * @param {(success: T) => U} onFulfilled A method called when/if the promise fulfills.
                  * If undefined the next onFulfilled method in the promise chain will be called.
                  * @param {(error: any) => U} onRejected? A method called when/if the promise rejects.
                  * If undefined the next onRejected method in the promise chain will be called.
                  */ then<TResult1 = T, TResult2 = never>(onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): IAnimationThenable<TResult1 | TResult2>;
                /**
                  * A wrapper method for Promise.then(undefined, onRejected);
                  * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
                  * onRejected method in the promise chain will be called.
                  */
                catch<TResult = never>(onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): IAnimationThenable<TResult>;
            }
            /**
              * Describes a type of IPromise that resolves when an animation is
              * finished. It can be optionally cancelled. Further, in the case where it may have
              * a parent that is animating (which will cause it to immediately cancel and fulfill itself, it resolves
              * with a IGetAnimatingThenable for accessing
              * the IAnimationThenable of the animating parent element.
              */
            interface IAnimatingThenable extends IAnimationThenable<IGetAnimatingThenable> {
            }
            /**
              * Describes an object containing two promises. One that resolves when the previous animation is finished, the
              * other that resolves when the current animation is finished.
              */
            interface IAnimationCreation {
                /**
                  * A promise that resolves when a potential previous animation is done.
                  */
                previous: async.Promise<void>;
                /**
                  * An animation promise that resolves when the current animation is complete.
                  */
                current: IAnimatingThenable;
            }
            /**
              * Describes base functional requirements for externally referenced animations.
              */
            interface IAnimationEssentials {
                /**
                  * Fires the start method on the animation instances to kickoff the animations.
                  */
                start(): void;
                /**
                  * Fires the pause method on the animation instances.
                  */
                pause(): async.Promise<void>;
                /**
                  * Fires the resume method on the animation instances.
                  */
                resume(): async.Promise<void>;
                /**
                  * A method to cancel the associated animations.
                  */
                cancel(): any;
                /**
                  * A method to denote the end of an animation.
                  */
                end?(): void;
            }
            /**
              * A class representing a single animation for a single element.
              */
            class BaseAnimation implements IAnimationEssentials {
                protected static _inject: any;
                /**
                  * The node having the animation performed on it.
                  */
                element: HTMLElement;
                /**
                  * Contains DOM helper methods for manipulating this control's element.
                  */
                dom: Dom;
                /**
                  * Contains helper methods for data manipulation.
                  */
                utils: Utils;
                /**
                  * Specified options for the animation.
                  */
                options: any;
                /**
                  * Reference to the Log injectable.
                  */
                protected _log: debug.Log;
                /**
                  * Reference to the Window injectable.
                  */
                protected _window: Window;
                /**
                  * Reference to the Compat injectable.
                  */
                protected _compat: Compat;
                /**
                  * Reference to the IPromise injectable.
                  */
                protected _Promise: async.IPromise;
                /**
                  * The resolve function for the end of the animation.
                  */
                protected _resolve: () => void;
                /**
                  * An Array of remove functions to dispose of event listeners.
                  */
                private __eventListeners;
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
                  * A function to be called to pause the animation.
                  */
                pause(): async.Promise<void>;
                /**
                  * A function to be called to resume a paused animation.
                  */
                resume(): async.Promise<void>;
                /**
                  * A function to be called to let it be known the animation is being cancelled. Although not
                  * necessary, we call end() in this function as well for safe measure.
                  */
                cancel(): void;
                /**
                  * Adds an event listener of the specified type to this animation's element. Removal of the
                  * event is handled automatically upon animation end.
                  * @param {string} type The type of event to listen to.
                  * @param {EventListener} listener The listener to fire when the event occurs.
                  * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
                  * of event propagation.
                  */
                addEventListener(type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
                /**
                  * Initializes the element and key properties of this animation and grabs a
                  * reference to its resolve function.
                  * @param {Element} element The element on which the animation will occur.
                  * @param {any} options Specified options for the animation.
                  */
                instantiate(element: Element, options?: any): IAnimatingThenable;
            }
            /**
              * A class representing a single CSS animation for a single element.
              */
            class CssAnimation extends BaseAnimation {
                /**
                  * A set of browser compatible CSS animation events capable of being listened to.
                  */
                protected _animationEvents: IAnimationEvents;
                /**
                  * A function to listen to the start of an animation event.
                  * @param {() => void} listener The function to call when the animation begins.
                  */
                animationStart(listener: (ev?: AnimationEvent) => void): IRemoveListener;
                /**
                  * A function to listen to the end of an animation event.
                  * @param {(ev?: AnimationEvent) => void} listener The function to call when the animation ends.
                  */
                animationEnd(listener: (ev?: AnimationEvent) => void): IRemoveListener;
                /**
                  * A function to listen to the completion of an animation iteration.
                  * @param {(ev?: AnimationEvent) => void} listener The function to call when the animation iteration completes.
                  */
                animationIteration(listener: (ev?: AnimationEvent) => void): IRemoveListener;
                /**
                  * A function to listen to the start of a transition event.
                  * @param {(ev?: TransitionEvent) => void} listener The function to call when the transition begins.
                  */
                transitionStart(listener: (ev?: TransitionEvent) => void): IRemoveListener;
                /**
                  * A function to listen to the end of a transition event.
                  * @param {(ev?: TransitionEvent) => void} listener The function to call when the transition ends.
                  */
                transitionEnd(listener: (ev?: TransitionEvent) => void): IRemoveListener;
            }
            /**
              * A simple CSS Animation class that places the 'plat-animation' class on an
              * element, checks for animation properties, and waits for the animation to end.
              */
            class SimpleCssAnimation extends CssAnimation {
                /**
                  * The class name added to the animated element.
                  */
                className: string;
                /**
                  * An optional options object that can denote a pseudo element animation.
                  */
                options: ISimpleCssAnimationOptions;
                /**
                  * A function for stopping a potential callback in the animation chain.
                  */
                protected _cancelAnimation: IRemoveListener;
                /**
                  * Adds the class to initialize the animation.
                  */
                initialize(): void;
                /**
                  * A function denoting the start of the animation.
                  */
                start(): void;
                /**
                  * A function to be called to pause the animation.
                  */
                pause(): async.Promise<void>;
                /**
                  * A function to be called to resume a paused animation.
                  */
                resume(): async.Promise<void>;
                /**
                  * A function to be called to let it be known the animation is being cancelled.
                  * Removes the animation class and the animation "-init" class.
                  */
                cancel(): void;
                /**
                  * Removes the animation class and the animation "-init" class.
                  */
                protected _dispose(): void;
            }
            /**
              * An interface describing the options for SimpleCssAnimation.
              */
            interface ISimpleCssAnimationOptions {
                /**
                  * The pseudo element identifier (i.e. '::before' if defined as .red::before).
                  */
                pseudo?: string;
                /**
                  * A boolean specifying whether or not to leave the '*-init' class on the element
                  * after the animation has started. Defaults to false as we want to remove
                  * any initial state after an animation has kicked off.
                  */
                preserveInit?: boolean;
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
              * An animation control that causes an element to move as defined by the included CSS.
              */
            class Move extends SimpleCssAnimation {
                /**
                  * The class name added to the leaving element.
                  */
                className: string;
            }
            /**
              * A simple CSS Animation class that places the 'plat-transition' class on an
              * element, checks for transition properties, and waits for the transition to end.
              */
            class SimpleCssTransition extends CssAnimation {
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
                  * A function for stopping a potential callback in the animation chain.
                  */
                protected _animationCanceled: IRemoveListener;
                /**
                  * An Array of all the properties the transition will be affecting.
                  */
                protected _properties: string[];
                /**
                  * A regular expression to normalize modified property keys.
                  */
                protected _normalizeRegex: RegExp;
                /**
                  * A regular expression grab everything that is not a number.
                  */
                protected _nonNumRegex: RegExp;
                /**
                  * An Object whose keys are the normalized keys of modified properties.
                  */
                protected _normalizedKeys: IObject<boolean>;
                /**
                  * The "transitionend" event handler call count.
                  */
                protected _transitionCount: number;
                /**
                  * The user defined "transitionend" event handler call count.
                  */
                protected _count: number;
                /**
                  * Denotes whether or not the transition was ever started.
                  */
                protected _started: boolean;
                /**
                  * Denotes whether or not the transition changes are being performed
                  * with CSS or with JS through this.options.
                  */
                protected _usingCss: boolean;
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
                  * Removes the animation class and the animation "-init" class.
                  */
                protected _dispose(): void;
                /**
                  * A handler for the "transitionend" event. Will clean up the class and resolve the
                  * promise when necessary based on the options that were input.
                  * @param {TransitionEvent} ev? The transition event object.
                  * @param {boolean} immediate? Whether clean up should be immediate or conditional.
                  */
                protected _done(ev: TransitionEvent): void;
                /**
                  * Animate the element based on the options passed in.
                  */
                protected _animate(): boolean;
                /**
                  * A function that converts a string value expressed as either seconds or milliseconds
                  * to a numerical millisecond value.
                  * @param {string} duration The transition duration specified by the computed style.
                  */
                protected _toMs(duration: string): number;
                /**
                  * Handles element transitions that are defined with CSS.
                  * @param {CSSStyleDeclaration} computedStyle The computed style of the
                  * element.
                  * @param {Array<string>} durations The array of declared transition duration values.
                  */
                private __cssTransition(computedStyle, durations);
            }
            /**
              * An interface describing the options for SimpleCssTransition.
              */
            interface ISimpleCssTransitionOptions extends ISimpleCssAnimationOptions {
                /**
                  * A JavaScript object with key value pairs for adjusting transition values.
                  * (e.g. { width: '800px' } would set the element's width to 800px.
                  */
                properties?: IObject<string>;
                /**
                  * A boolean specifying whether or not to leave the '*-init' class on the element
                  * after the transition has started. Defaults to true as we want to keep all
                  * initial states and definitions throughout the transition
                  * (and/or initial transition states will be overwritten upon start).
                  */
                preserveInit?: boolean;
                /**
                  * A defined transition count number. Useful when the transition property name 'all'
                  * is used in conjunction with another transition property and transitions are being
                  * performed through CSS.
                  */
                count?: number;
            }
        }
        /**
          * Holds classes and interfaces related to UI control components in platypus.
          */
        namespace controls {
            /**
              * A control that facilitates routing between ViewControls. A Viewport is
              * the link between a ViewControl, a Navigator, and a Router.
              * It registers with a router and receives route change events. It then instantiates the proper viewcontrol and appends it
              * to the DOM.
              */
            class Viewport extends TemplateControl implements routing.ISupportRouteNavigation {
                protected static _inject: any;
                /**
                  * Viewports contain ViewControls.
                  */
                controls: ViewControl[];
                /**
                  * The options for the Viewport control.
                  */
                options: observable.IObservableProperty<IViewportOptions>;
                /**
                  * Used to grab the current Router instance.
                  */
                protected _Router: routing.IRouterStatic;
                /**
                  * The Promise injectable.
                  */
                protected _Promise: async.IPromise;
                /**
                  * The Injector for getting instances of ViewControls.
                  */
                protected _Injector: typeof dependency.Injector;
                /**
                  * Used for compiling and linking a ViewControl's template.
                  */
                protected _ElementManagerFactory: processing.IElementManagerFactory;
                /**
                  * The document.
                  */
                protected _document: Document;
                /**
                  * Reference to an injectable that caches ElementManagers.
                  */
                protected _managerCache: storage.Cache<processing.ElementManager>;
                /**
                  * Reference to the Animator injectable.
                  */
                protected _animator: animations.Animator;
                /**
                  * The navigator associated with this Viewport.
                  */
                protected _navigator: routing.Navigator;
                /**
                  * The router associated with this Viewport.
                  */
                protected _router: routing.Router;
                /**
                  * The parent router associated with this Viewport.
                  */
                protected _parentRouter: routing.Router;
                /**
                  * The next injector used to instantiate the next ViewControl during navigation.
                  */
                protected _nextInjector: dependency.Injector<ViewControl>;
                /**
                  * The next ViewControl to which to navigate.
                  */
                protected _nextView: ViewControl;
                /**
                  * Whether or not to animate Array mutations.
                  */
                protected _animate: boolean;
                /**
                  * Allows the viewport to initialize its navigator with the current
                  * router.
                  */
                initialize(): void;
                /**
                  * The viewport registers itself with its router, notifying the
                  * router that it is ready to receive navigation events.
                  */
                loaded(): void;
                /**
                  * The viewport's router has matched a route and is asking the viewport if it is safe to
                  * navigate. Here the viewport can instantiate the new view and ask it if it is safe to
                  * navigate to the view.
                  * @param {plat.routing.IRouteInfo} routeInfo Contains the information necessary to instantiate
                  * the view and feed it the route parameters/query.
                  */
                canNavigateTo(routeInfo: routing.IRouteInfo): async.Promise<boolean>;
                /**
                  * The viewport's router has matched a route and is asking the viewport if it is safe to
                  * navigate from the current state. Here the viewport can query the current ViewControl and
                  * ask it if it is safe to navigate from its current state.
                  */
                canNavigateFrom(): async.Promise<boolean>;
                /**
                  * The viewport's router has matched a route and determined that it is safe to navigate to the
                  * next view. The viewport will now go through the steps to compile and link the next view then append
                  * it to the DOM.
                  * @param {plat.routing.IRouteInfo} routeInfo Contains the information necessary to instantiate
                  * the view and feed it the route parameters/query.
                  */
                navigateTo(routeInfo: routing.IRouteInfo): async.Promise<void>;
                /**
                  * The viewport's router has matched a route and determined that it is safe to navigate to the
                  * next view. It is now safe for the viewport to dispose of the current state.
                  */
                navigateFrom(): async.Promise<void>;
                /**
                  * The viewport is going out of scope, so it needs to unregister from its router in order to stop receiving routing
                  * events.
                  */
                dispose(): void;
                /**
                  * Creates an INodeMap for a ViewControl in order to compile it.
                  * @param {plat.dependency.Injector<plat.ui.ViewControl>} The injector used to instantiate the ViewControl.
                  */
                protected _createNodeMap(injector: dependency.Injector<ViewControl>): processing.INodeMap;
                /**
                  * Finds the first Viewport in the parent chain. This is useful in order to properly initialize the viewport's
                  * router as a child of the parent viewport's router.
                  */
                protected _getParentViewport(): Viewport;
            }
            /**
              * The available options for the Viewport control.
              */
            interface IViewportOptions {
                /**
                  * Will allow for page transition animations if set to true.
                  */
                animate: boolean;
            }
            /**
              * A TemplateControl for easily reusing a
              * defined HTML template.
              */
            class Template extends TemplateControl {
                protected static _inject: any;
                /**
                  * Reference to the IPromise injectable.
                  */
                protected _Promise: async.IPromise;
                /**
                  * Reference to an injectable for storing HTML templates.
                  */
                protected _templateCache: storage.TemplateCache;
                /**
                  * Reference to the Document injectable.
                  */
                protected _document: Document;
                /**
                  * Removes the `<plat-template>` node from the DOM
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
                  * @param {plat.async.Promise<plat.ui.controls.Template>} templatePromise The promise
                  * associated with the first instance of the control with this ID.
                  */
                protected _waitForTemplateControl(templatePromise: async.Promise<Template>): void;
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
                protected static _inject: any;
                /**
                  * Reference to the Animator injectable.
                  */
                protected _animator: animations.Animator;
                /**
                  * Reference to the IPromise injectable.
                  */
                protected _Promise: async.IPromise;
                /**
                  * The required context of the control (must be of type Array).
                  */
                context: any[];
                /**
                  * The load priority of the control (needs to load before a Bind control).
                  */
                priority: number;
                /**
                  * The child controls of the control. All will be of type TemplateControl.
                  */
                controls: TemplateControl[];
                /**
                  * A Promise that fulfills when the items are loaded.
                  */
                itemsLoaded: async.Promise<void>;
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
                  * Whether or not to animate Array mutations.
                  */
                protected _animate: boolean;
                /**
                  * A collection of all the current animations and their animation operation.
                  */
                protected _animationQueue: {
                    animation: animations.IAnimationThenable<any>;
                    op: string;
                }[];
                /**
                  * A queue representing all current add operations.
                  */
                protected _addQueue: async.Promise<void>[];
                /**
                  * The number of items currently in the list or in the process of being added
                  * or removed from the list.
                  */
                protected _itemLength: number;
                /**
                  * Whether or not the Array listener has been set.
                  */
                private __listenerSet;
                /**
                  * The resolve function for the itemsLoaded promise.
                  */
                private __resolveFn;
                /**
                  * The reject function for the itemsLoaded Promise.
                  */
                private __rejectFn;
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
                  * @param {Array<any>} newValue The new Array
                  * @param {Array<any>} oldValue The old Array
                  */
                contextChanged(newValue: any[], oldValue: any[]): void;
                /**
                  * Observes the Array context for changes and adds initial items to the DOM.
                  */
                loaded(): void;
                /**
                  * Removes any potentially held memory.
                  */
                dispose(): void;
                /**
                  * Sets the alias tokens to use for all the items in the ForEach context Array.
                  */
                protected _setAliases(): void;
                /**
                  * Adds new items to the control's element when items are added to
                  * the array.
                  * @param {number} index The point in the array to start adding items.
                  * @param {number} numberOfItems The number of items to add.
                  * @param {number} animateItems The number of items to animate.
                  */
                protected _addItems(index: number, numberOfItems: number, animateItems: number): async.Promise<void>;
                /**
                  * Adds an Array of items to the element without animating.
                  * @param {Array<Node>} items The Array of items to add.
                  */
                protected _appendItems(items: Node[]): void;
                /**
                  * Adds an item to the control's element animating its elements.
                  * @param {DocumentFragment} item The HTML fragment representing a single item.
                  */
                protected _appendAnimatedItem(item: DocumentFragment): void;
                /**
                  * Removes items from the control's element.
                  * @param {number} index The index to start disposing from.
                  * @param {number} numberOfItems The number of items to remove.
                  */
                protected _removeItems(index: number, numberOfItems: number): void;
                /**
                  * Binds the item to a template at that index.
                  */
                protected _bindItem(index: number): async.Promise<DocumentFragment>;
                /**
                  * Sets the corresponding block length for animation.
                  */
                protected _setBlockLength(templates: Node[]): void;
                /**
                  * Updates a child resource object when
                  * the array changes.
                  * @param {number} index The control whose resources we will update.
                  */
                protected _updateResource(index: number): void;
                /**
                  * Sets a listener for the changes to the array.
                  */
                protected _setListener(): void;
                /**
                  * Receives an event when a method has been called on an array and maps the array
                  * method to its associated method handler.
                  * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
                  */
                protected _executeEvent(changes: observable.IArrayChanges<any>[]): void;
                /**
                  * Returns a resource alias object for an item in the array. The
                  * resource object contains index:number, even:boolean, odd:boolean,
                  * first:boolean, and last:boolean.
                  * @param {number} index The index used to create the resource aliases.
                  */
                protected _getAliases(index: number): IObject<IResource>;
                /**
                  * Handles items being pushed into the array.
                  * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
                  */
                protected _push(changes: observable.IArrayChanges<any>[]): void;
                /**
                  * Handles items being popped off the array.
                  * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
                  */
                protected _pop(changes: observable.IArrayChanges<any>[]): void;
                /**
                  * Handles items being un-shifted into the array.
                  * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
                  */
                protected _unshift(changes: observable.IArrayChanges<any>[]): void;
                /**
                  * Handles items being shifted off the array.
                  * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
                  */
                protected _shift(changes: observable.IArrayChanges<any>[]): void;
                /**
                  * Handles adding/removing items when an array is spliced.
                  * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
                  */
                protected _splice(changes: observable.IArrayChanges<any>[]): void;
                /**
                  * Grabs the total block length of the specified items.
                  * @param {number} startIndex The starting index of items.
                  * @param {number} numberOfItems The number of consecutive items.
                  */
                protected _calculateBlockLength(startIndex?: number, numberOfItems?: number): number;
                /**
                  * Animates the indicated items.
                  * @param {number} startIndex The starting index of items to animate.
                  * @param {number} numberOfItems The number of consecutive items to animate.
                  * @param {string} key The animation key/type.
                  * @param {string} animationOp Denotes animation operation.
                  * @param {boolean} cancel Whether or not to cancel the current animation before beginning this one.
                  */
                protected _animateItems(startIndex: number, numberOfItems: number, key: string, animationOp: string, cancel: boolean): async.Promise<void>;
                /**
                  * Handles a simple animation of a block of elements.
                  * @param {number} startNode The starting childNode of the ForEach to animate.
                  * @param {number} endNode The ending childNode of the ForEach to animate.
                  * @param {string} key The animation key/type.
                  * @param {boolean} cancel Whether or not to cancel the current animation before beginning this one.
                  */
                protected _handleSimpleAnimation(startNode: number, endNode: number, key: string, cancel: boolean): async.Promise<void>;
                /**
                  * Handles a simple animation of a block of elements.
                  * @param {number} startNode The starting childNode of the ForEach to animate.
                  * @param {number} endNode The ending childNode of the ForEach to animate.
                  * @param {string} key The animation key/type.
                  */
                protected _handleLeave(startNode: number, endNode: number, key: string): async.Promise<void>;
                /**
                  * Handles a simple animation of a block of elements.
                  * @param {number} startNode The starting childNode of the ForEach to animate.
                  * @param {number} endNode The ending childNode of the ForEach to animate.
                  * @param {string} key The animation key/type.
                  * @param {boolean} cancel Whether or not to cancel the current animation before beginning this one.
                  */
                protected _handleClonedContainerAnimation(startNode: number, endNode: number, key: string, cancel: boolean): async.Promise<void>;
                /**
                  * Cancels all current animations.
                  */
                protected _cancelCurrentAnimations(): async.Promise<any>;
            }
            /**
              * The options object for the
              * ForEach control.
              */
            interface IForEachOptions {
                /**
                  * Will allow for Array mutation animations if set to true.
                  */
                animate?: boolean;
                /**
                  * Used to specify alternative alias tokens for the built-in control aliases.
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
              * A special type of TemplateControl for managing meta tags, useful for SEO. This
              * control will not exist unless you register it as a control with the name 'head'. It is static, so you can inject
              * it into other components and get access to its properties.
              */
            class Head extends TemplateControl {
                protected static _inject: any;
                /**
                  * This control is specifically for use with the <head /> HTML element.
                  */
                element: HTMLHeadElement;
                /**
                  * Rather than be replaced by a 'div', this control wants to be a 'head' element.
                  */
                replaceWith: string;
                /**
                  * The Document injectable.
                  */
                protected _document: Document;
                /**
                  * The Browser injectable.
                  */
                protected _browser: web.Browser;
                /**
                  * A reference to all the structured data elements added to the DOM for this page.
                  */
                protected _structuredDataElements: HTMLElement[];
                /**
                  * A reference to the the <title /> element.
                  */
                protected _titleElement: HTMLTitleElement;
                /**
                  * A reference to the the <meta property="og:title" /> element.
                  */
                protected _ogTitleElement: HTMLMetaElement;
                /**
                  * A reference to the the <meta name="twitter:title" /> element.
                  */
                protected _twitterTitleElement: HTMLMetaElement;
                /**
                  * A reference to the the <meta name="description" /> element.
                  */
                protected _descriptionElement: HTMLMetaElement;
                /**
                  * A reference to the the <meta property="og:description" /> element.
                  */
                protected _ogDescriptionElement: HTMLMetaElement;
                /**
                  * A reference to the the <meta name="twitter:description" /> element.
                  */
                protected _twitterDescriptionElement: HTMLMetaElement;
                /**
                  * A reference to the the <meta property="og:url" /> element.
                  */
                protected _ogUrlElement: HTMLMetaElement;
                /**
                  * A reference to the the <meta name="twitter:url" /> element.
                  */
                protected _twitterUrlElement: HTMLMetaElement;
                /**
                  * A reference to the the <meta name="author" /> element.
                  */
                protected _authorElement: HTMLMetaElement;
                /**
                  * A reference to the the <link rel="author" /> element.
                  */
                protected _googleAuthorElement: HTMLLinkElement;
                /**
                  * A reference to the the <meta property="article:author" /> element.
                  */
                protected _fbAuthorElement: HTMLMetaElement;
                /**
                  * A reference to the the <meta property="twitter:creator" /> element.
                  */
                protected _twitterCreatorElement: HTMLMetaElement;
                /**
                  * A reference to the the <meta property="og:type" /> element.
                  */
                protected _ogTypeElement: HTMLMetaElement;
                /**
                  * Registers for the navigating event to know when to remove all the elements so they
                  * don't bleed onto the next page.
                  */
                initialize(): void;
                /**
                  * Makes sure all the elements exist.
                  */
                setTemplate(): void;
                /**
                  * Gets the title or sets the title elements.
                  * @param {string} title? If supplied, the title elements will be set to this value.
                  */
                title(title?: string): string;
                /**
                  * Gets the description or sets the description elements.
                  * @param {string} description? If supplied, the description elements will be set to this value.
                  */
                description(description?: string): string;
                /**
                  * Gets the url or sets the url elements.
                  * @param {string} url? If supplied, the url elements will be set to this value.
                  */
                url(url?: string): string;
                /**
                  * Gets the author or sets the author elements.
                  * @param {string} author? If supplied, the author elements will be set to this value. The value should be the
                  * display name of the content author.
                  */
                author(author?: string): string;
                /**
                  * Gets the author or sets the author elements.
                  * @param {string} author? If supplied, the author elements will be set to this value. The value should be the
                  * Google+ profile url for the author.
                  */
                googleAuthor(author?: string): string;
                /**
                  * Gets the author or sets the author elements. This method is for use with the Facebook profile authors.
                  * @param {string} author? If supplied, the author elements will be set to this value. The value should be
                  * the `https://www.facebook.com/username` account, and make sure the user supports followers.
                  */
                fbAuthor(author?: string): string;
                /**
                  * Gets the creator or sets the creator elements
                  * @param {string} creator? If supplied, the creator elements will be set to this value. The
                  * value should be the twitter `@username` of the creator
                  */
                twitterCreator(creator?: string): string;
                /**
                  * Gets the type or sets the type elements.
                  * @param {string} type? If supplied, the image elements will be set to this value.
                  */
                fbType(type?: string): string;
                /**
                  * Sets the image elements.
                  * @param {Array<string>} images For each image, a tag will be created
                  */
                images(images: string[]): void;
                /**
                  * Sets the video elements.
                  * @param {Array<string>} videos For each video, a tag will be created
                  */
                videos(videos: string[]): void;
                /**
                  * Adds a structured data ld+json element to the DOM.
                  * @param {any} The object, it will be stringified and put in the ld+json tag.
                  */
                structuredData(obj: any): void;
                /**
                  * Takes in one or more BlogPosting <http://schema.org/BlogPosting> objects and sets them as ld+json tags in the head.
                  * @param {plat.ui.controls.IBlogPosting} The posting object, it will be stringified and put in the ld+json tag.
                  */
                blogPostings(...postings: IBlogPosting[]): void;
                /**
                  * Sets the url elements initially.
                  */
                loaded(): void;
                /**
                  * Sets the url elements.
                  */
                navigated(url: string): void;
                /**
                  * Gets the innerText/content/href of an element.
                  * @param {HTMLElement} element The element from which to get the content.
                  */
                protected _getContent(element: HTMLElement): string;
                /**
                  * Sets the innerText/content/href of a list elements. If an element is not in the DOM, it
                  * is added to the dom right after the <title /> element.
                  * @param {Array<HTMLElement>} elements The elements for which to set values.
                  */
                protected _setContent(elements: HTMLElement[], value: string): void;
                /**
                  * Creates an element with the specified tag and name. The name corresponds to
                  * the type of the meta/link tag (i.e. title/description/author etc), and is also the
                  * value that will be set for the proper attribute. The attribute is determined based on
                  * the tag/name combination.
                  * @param {string} tag The tag name for the element.
                  * @param {string} name? The name corresponding to the type of meta/link tag.
                  * @param {boolean} multiple? Whether or not there can be multiple of this tag/name in the dom
                  */
                protected _createElement<T extends HTMLElement>(tag: string, name?: string, multiple?: boolean): T;
                /**
                  * Removes all the unnecessary elements from the <head /> to avoid having
                  * incorrect tags on the page.
                  */
                protected _removeAllElements(): void;
                /**
                  * Removes elements from the <head />
                  */
                protected _removeElements(...elements: HTMLElement[]): void;
            }
            /**
              * An interface for the http://schema.org/Article type.
              */
            interface IArticle {
                /**
                  * Should be http://schema.org
                  */
                '@context': string;
                /**
                  * Should be the specific type of schema (i.e. Article, BlogPosting)
                  */
                '@type': string;
                /**
                  * A WebPage object, with the id being the url of the page. This property is
                  * optional, but highly recommended.
                  */
                mainEntityOfPage?: {
                    '@type': string;
                    '@id': string;
                };
                /**
                  * A WebPage object, with the id being the url of the page. No longer than 110 characters.
                  */
                headline: string;
                /**
                  * An image to associate with this article.
                  */
                image: IImageObject;
                /**
                  * The date the article was published.
                  */
                datePublished: Date;
                /**
                  * The date the article was last modified.
                  */
                dateModified?: Date;
                /**
                  * The author of the article.
                  */
                author: {
                    '@type': string;
                    name: string;
                };
                /**
                  * The publisher of the article.
                  */
                publisher: {
                    '@type': string;
                    name: string;
                    logo: IImageObject;
                };
                /**
                  * A brief description of the article.
                  */
                description?: string;
                /**
                  * The name of the article.
                  */
                name?: string;
            }
            /**
              * An interface for the http://schema.org/BlogPosting type.
              */
            interface IBlogPosting extends IArticle {
            }
            /**
              * An interface for the http://schema.org/ImageObject type.
              */
            interface IImageObject {
                /**
                  * Should be ImageObject
                  */
                '@type': string;
                /**
                  * The url to the image location.
                  */
                url: string;
                /**
                  * The caption for the image
                  */
                caption?: string;
                /**
                  * The pixel height of the image
                  */
                height: number;
                /**
                  * The pixel width of the image
                  */
                width: number;
            }
            /**
              * A TemplateControl for adding HTML to the
              * DOM through bound context strings.
              */
            class InnerHtml extends TemplateControl {
                protected static _inject: any;
                /**
                  * The options for the InnerHtml control.
                  */
                options: observable.IObservableProperty<IInnerHtmlOptions>;
                /**
                  * The child controls of the control. All will be of type TemplateControl.
                  */
                controls: TemplateControl[];
                /**
                  * Reference to the ITemplateControlFactory injectable.
                  */
                protected _TemplateControlFactory: ITemplateControlFactory;
                /**
                  * The string representation of the current bound html template.
                  */
                protected _html: string;
                /**
                  * Clears the inner template if one exists.
                  */
                setTemplate(): void;
                /**
                  * Checks options and initializes bindings.
                  */
                loaded(): void;
                /**
                  * The function called when any of the options for this control changes.
                  * @param {IInnerHtmlOptions} newValue The new value of the options property.
                  * @param {IInnerHtmlOptions} oldValue? The old value of the options property.
                  */
                protected _onOptionsChanged(newValue: IInnerHtmlOptions, oldValue?: IInnerHtmlOptions): void;
            }
            /**
              * The options object for the
              * InnerHtml control.
              */
            interface IInnerHtmlOptions {
                /**
                  * The HTML string to bind to the DOM.
                  */
                html?: string;
                /**
                  * Will compile the template string if set to true.
                  */
                compile?: boolean;
            }
            /**
              * A BindControl for binding an HTML select element
              * to an Array context.
              */
            class Select extends BindControl {
                protected static _inject: any;
                /**
                  * Replaces the `<plat-select>` node with
                  * a <select> node.
                  */
                replaceWith: string;
                /**
                  * Specifies the element as being an HTMLSelectElement.
                  */
                element: HTMLSelectElement;
                /**
                  * The load priority of the control (needs to load before a Bind control).
                  */
                priority: number;
                /**
                  * The required context of the control (must be of type Array).
                  */
                context: any[];
                /**
                  * The child controls of the control. All will be of type TemplateControl.
                  */
                controls: TemplateControl[];
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
                itemsLoaded: async.Promise<void>;
                /**
                  * Reference to the IPromise injectable.
                  */
                protected _Promise: async.IPromise;
                /**
                  * Reference to the Document injectable.
                  */
                protected _document: Document;
                /**
                  * Whether or not the select is grouped.
                  */
                protected _isGrouped: boolean;
                /**
                  * The property used to group the objects.
                  */
                protected _group: string;
                /**
                  * An optional default option specified in the control element's
                  * innerHTML.
                  */
                protected _defaultOption: HTMLOptionElement;
                /**
                  * The complementary control implementing two way data-binding.
                  */
                protected _binder: observable.IImplementTwoWayBinding;
                /**
                  * The initial type of the bound property if defined.
                  */
                protected _propertyType: string;
                /**
                  * The last value of the control.
                  */
                private __lastValue;
                /**
                  * Whether or not the Array listener has been set.
                  */
                private __listenerSet;
                /**
                  * The function to resolve the itemsLoaded promise.
                  */
                private __resolveFn;
                /**
                  * The reject function for the itemsLoaded Promise.
                  */
                private __rejectFn;
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
                  * @param {Array<any>} newValue The new array context.
                  * @param {Array<any>} oldValue The old array context.
                  */
                contextChanged(newValue: any[], oldValue: any[]): void;
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
                  * A function that allows this control to observe both the bound property itself as well as
                  * potential child properties if being bound to an object.
                  * @param {plat.observable.IImplementTwoWayBinding} binder The control that facilitates the
                  * data-binding.
                  */
                observeProperties(binder: observable.IImplementTwoWayBinding): void;
                /**
                  * Updates the selected index if bound to a property.
                  * @param {string} newValue The new value of the bound property.
                  * @param {string} oldValue The old value of the bound property.
                  * @param {string} identifier The child identifier of the bound property.
                  * @param {boolean} firstTime? Whether or not this is the first time being called as a setter.
                  */
                protected _setSelectedIndex(newValue: string | number | boolean | any, oldValue: string, identifier: string, firstTime?: boolean): void;
                /**
                  * Updates the selected index if bound to a property.
                  * @param {Array<any>} newValue The new value Array of the bound property.
                  * @param {Array<any>} oldValue The old value Array of the bound property.
                  * @param {string} identifier The child identifier of the bound property.
                  * @param {boolean} firstTime? Whether or not this is the first time being called as a setter.
                  */
                protected _setSelectedIndices(newValue: any[], oldValue: any[], identifier: string, firstTime?: boolean): void;
                /**
                  * Fires the inputChanged event when the select's value changes.
                  */
                protected _observeChange(): void;
                /**
                  * Getter for select-multiple.
                  */
                protected _getSelectedValues(): string[];
                /**
                  * Casts a value to the determined initial property type.
                  */
                protected _castValue(value: any): any;
                /**
                  * Sets a listener for the changes to the array.
                  */
                protected _setListener(): void;
                /**
                  * Receives an event when a method has been called on an array and maps the array
                  * method to its associated method handler.
                  * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
                  */
                protected _executeEvent(changes: observable.IArrayChanges<any>[]): void;
                /**
                  * Adds the options to the select element.
                  * @param {number} numberOfItems The number of items to add.
                  * @param {number} index The starting index of the next
                  * set of items to add.
                  */
                protected _addItems(numberOfItems: number, index: number): async.Promise<void>;
                /**
                  * The callback used to add an option after
                  * its template has been bound.
                  * @param {number} index The current index of the item being added.
                  * @param {DocumentFragment} option The bound DocumentFragment to be
                  * inserted into the DOM.
                  */
                protected _insertOption(index: number, option: DocumentFragment): async.Promise<any>;
                /**
                  * Removes a specified number of elements.
                  * @param {number} numberOfItems The number of items
                  * to remove.
                  */
                protected _removeItems(numberOfItems: number): void;
                /**
                  * The function called when an item has been removed
                  * from the Array context.
                  */
                protected _removeItem(): void;
                /**
                  * Resets the select element by removing all its
                  * items and adding them back.
                  */
                protected _resetSelect(): void;
                /**
                  * The function called when an element is pushed to
                  * the array context.
                  * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
                  */
                protected _push(changes: observable.IArrayChanges<any>[]): void;
                /**
                  * The function called when an item is popped
                  * from the array context.
                  * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
                  */
                protected _pop(changes: observable.IArrayChanges<any>[]): void;
                /**
                  * The function called when an item is un-shifted
                  * onto the array context.
                  * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
                  */
                protected _unshift(changes: observable.IArrayChanges<any>[]): void;
                /**
                  * The function called when an item is shifted
                  * from the array context.
                  * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
                  */
                protected _shift(changes: observable.IArrayChanges<any>[]): void;
                /**
                  * The function called when items are spliced
                  * from the array context.
                  * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
                  */
                protected _splice(changes: observable.IArrayChanges<any>[]): void;
                /**
                  * The function called when the array context
                  * is sorted.
                  * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
                  */
                protected _sort(changes: observable.IArrayChanges<any>[]): void;
                /**
                  * The function called when the array context
                  * is reversed.
                  * @param {Array<plat.observable.IArrayChanges<any>>} changes The Array mutation event information.
                  */
                protected _reverse(changes: observable.IArrayChanges<any>[]): void;
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
                default: ISelectDefaultOption;
            }
            /**
              * Defines the value and textContent for the default option of a Select.
              */
            interface ISelectDefaultOption {
                /**
                  * The value of the default option.
                  */
                value: string;
                /**
                  * The textContent of the default option.
                  */
                textContent: string;
            }
            /**
              * A TemplateControl conditionally adding or removing
              * a block of nodes to or from the DOM.
              */
            class If extends TemplateControl {
                protected static _inject: any;
                /**
                  * The document injectable.
                  */
                protected _document: Document;
                /**
                  * Reference to the Animator injectable.
                  */
                protected _animator: animations.Animator;
                /**
                  * Reference to the IPromise injectable.
                  */
                protected _Promise: async.IPromise;
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
                  * Whether or not to animate adding and removing of element.
                  */
                protected _animate: boolean;
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
                  * A boolean value stating whether or not the template has been bound
                  */
                private __isBound;
                /**
                  * A function to stop listening to changes on the options object.
                  */
                private __removeListener;
                /**
                  * A function to not fire the animation frame callback
                  */
                private __cancelFrame;
                /**
                  * A promise that resolves when the leave is finished.
                  */
                private __leavePromise;
                /**
                  * A promise that resolves when the entrance is finished.
                  */
                private __enterPromise;
                /**
                  * A promise that resolves when the template has been bound.
                  */
                private __initialBind;
                /**
                  * The constructor for a If. Creates the comment node and document fragment storage
                  * used by this control.
                  */
                constructor();
                /**
                  * Checks the options and initializes the
                  * evaluation.
                  */
                contextChanged(): async.Promise<void>;
                /**
                  * Creates a bindable template with the control element's childNodes (innerHTML).
                  */
                setTemplate(): void;
                /**
                  * Sets the visibility to true if no options are
                  * defined, kicks off the evaluation, and observes
                  * the options for changes.
                  */
                loaded(): async.Promise<void>;
                /**
                  * Stops listening to the options for changes.
                  */
                dispose(): void;
                /**
                  * Checks the condition and decides
                  * whether or not to add or remove
                  * the node from the DOM.
                  */
                protected _setter(options: IIfOptions): async.Promise<void>;
                /**
                  * Adds the conditional nodes to the DOM.
                  */
                protected _addItem(): async.Promise<void>;
                /**
                  * Adds the template to the DOM.
                  */
                protected _elementEntrance(): async.Promise<void>;
                /**
                  * Animates the template as it enters the DOM.
                  */
                protected _animateEntrance(): animations.IAnimationThenable<void>;
                /**
                  * Removes the conditional nodes from the DOM.
                  */
                protected _removeItem(): async.Promise<void>;
                /**
                  * Removes the template from the DOM.
                  */
                protected _elementLeave(): async.Promise<void>;
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
                  * Will allow for animations if set to true.
                  */
                animate?: boolean;
                /**
                  * A boolean expression to bind to whether or not the conditional
                  * nodes are present on the DOM.
                  */
                condition: boolean;
            }
            /**
              * A TemplateControl for adding additional
              * functionality to a native HTML anchor tag.
              */
            class Link extends TemplateControl {
                protected static _inject: any;
                /**
                  * Replaces the Link's element with a native anchor tag.
                  */
                replaceWith: string;
                /**
                  * The options for Link, if ignore is true, anchor will ignore changing the url.
                  */
                options: observable.IObservableProperty<ILinkOptions>;
                /**
                  * The control's anchor element.
                  */
                element: HTMLAnchorElement;
                /**
                  * The RouterStatic injectable instance
                  */
                protected _Router: routing.IRouterStatic;
                /**
                  * The Browser injectable instance
                  */
                protected _browser: web.Browser;
                /**
                  * Reference to the Window injectable.
                  */
                protected _window: Window;
                /**
                  * The router associated with this link.
                  */
                protected _router: routing.Router;
                /**
                  * The a method for removing the click event listener for this control's element.
                  */
                protected _removeClickListener: IRemoveListener;
                /**
                  * A property that when set allows for the next click event to process.
                  */
                protected _allowClick: boolean;
                /**
                  * Initializes click event.
                  */
                initialize(): void;
                /**
                  * Calls to normalize the href for internal links and initializes the tap event.
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
                /**
                  * Calls to remove the click eater after a delay.
                  */
                dispose(): void;
                /**
                  * Determines Whether or not the default click behavior should be prevented.
                  */
                protected _handleClick(ev: Event): void;
                /**
                  * Determines the proper link upon $tap.
                  */
                protected _handleTap(ev: IGestureEvent): void;
            }
            /**
              * The available options for the Link control.
              */
            interface ILinkOptions extends routing.INavigateOptions {
                /**
                  * The view to which the Navigator should navigate. Can be specified by either a string path, the
                  * registered name of the view, or the registered Constructor.
                  */
                view: any;
            }
        }
    }
    /**
      * Holds classes and interfaces related to Document processing in platypus.
      */
    namespace processing {
        /**
          * Responsible for iterating through the DOM and collecting controls.
          */
        class Compiler {
            protected static _inject: any;
            /**
              * Reference to the IElementManagerFactory injectable.
              */
            protected _ElementManagerFactory: IElementManagerFactory;
            /**
              * Reference to the ITextManagerFactory injectable.
              */
            protected _TextManagerFactory: ITextManagerFactory;
            /**
              * Reference to the ICommentManagerFactory injectable.
              */
            protected _CommentManagerFactory: ICommentManagerFactory;
            /**
              * Reference to a cache injectable that stores ElementManagers.
              */
            protected _managerCache: storage.Cache<NodeManager>;
            /**
              * Goes through the NodeList, finding elements that contain controls as well as
              * text that contains markup.
              * @param {NodeList} nodes The NodeList that is going to be compiled.
              * @param {plat.ui.TemplateControl} control? The parent control for the given Node. The parent must implement the
              * TemplateControl interface since only they can contain templates.
              */
            compile(node: Node | Node[] | NodeList, control?: ui.TemplateControl): void;
            /**
              * Iterates through the array of nodes creating ElementManagers on Element
              * nodes, TextManagers on text nodes, and
              * CommentManagers on comment nodes.
              * @param {Array<Node>} nodes The array of nodes to be compiled.
              * @param {plat.processing.ElementManager} manager The parent ElementManagers
              * for the given array of nodes.
              */
            protected _compileNodes(nodes: Node[], manager: ElementManager): void;
        }
        /**
          * Responsible for data binding a data context to a Node.
          */
        class NodeManager {
            /**
              * Reference to the IContextManagerStatic injectable.
              */
            protected static _ContextManager: observable.IContextManagerStatic;
            /**
              * Reference to the Parser injectable.
              */
            protected static _parser: expressions.Parser;
            /**
              * Reference to the ITemplateControlFactory injectable.
              */
            protected static _TemplateControlFactory: ui.ITemplateControlFactory;
            /**
              * Reference to the Log injectable.
              */
            protected static _log: debug.Log;
            /**
              * A regular expression for finding markup
              */
            protected static _markupRegex: RegExp;
            /**
              * A regular expression for finding newline characters.
              */
            protected static _newLineRegex: RegExp;
            /**
              * The type of NodeManager.
              */
            type: string;
            /**
              * The INodeMap for this NodeManager.
              * Contains the compiled Node.
              */
            nodeMap: INodeMap;
            /**
              * The parent ElementManager.
              */
            parent: ElementManager;
            /**
              * Whether or not this NodeManager is a clone.
              */
            isClone: boolean;
            /**
              * Determines if a string has the markup notation.
              * @param {string} text The text string in which to search for markup.
              */
            static hasMarkup(text: string): boolean;
            /**
              * Given a string, finds markup in the string and creates an array of
              * IParsedExpression.
              * @param {string} text The text string in which to search for markup.
              */
            static findMarkup(text: string): expressions.IParsedExpression[];
            /**
              * Takes in a control with a data context and an array of IParsedExpression
              * and outputs a string of the evaluated expressions.
              * @param {Array<plat.expressions.IParsedExpression>} expressions The composition array to evaluate.
              * @param {plat.ui.TemplateControl} control? The TemplateControl used to parse
              * the expressions.
              */
            static build(expressions: expressions.IParsedExpression[], control?: ui.TemplateControl): string;
            /**
              * Registers a listener to be notified of a change in any associated identifier.
              * @param {Array<plat.expressions.IParsedExpression>} expressions An Array of
              * IParsedExpressions to observe.
              * @param {plat.ui.TemplateControl} control The TemplateControl associated
              * to the identifiers.
              * @param {(...args: Array<any>) => void} listener The listener to call when any identifier property changes.
              */
            static observeExpressions(expressions: expressions.IParsedExpression[], control: ui.TemplateControl, listener: (...args: any[]) => void): void;
            /**
              * Wraps constant text as a static IParsedExpression.
              * @param text The text to wrap into a static expression.
              */
            protected static _wrapExpression(text: string): expressions.IParsedExpression;
            /**
              * Given an IParsedExpression array, creates an array of unique identifers
              * to use with binding. This allows us to avoid creating multiple listeners for the identifier and node.
              * @param {Array<plat.expressions.IParsedExpression>} expressions An array of parsed expressions to search for identifiers.
              */
            private static __findUniqueIdentifiers(expressions);
            /**
              * Takes in an identifier and returns an object containing both its converted absolute path and the
              * ContextManager needed to observe it.
              * @param {string} identifier The identifier looking to be observed.
              * @param {plat.ui.TemplateControl} control The TemplateControl associated
              * to the identifiers.
              */
            private static __getObservationDetails(identifier, control);
            /**
              * Initializes the manager's properties.
              * @param {plat.processing.INodeMap} nodeMap The mapping associated with this manager. We have to use an
              * Used to treat all NodeManagers the same.
              * @param {plat.processing.ElementManager} parent The parent ElementManager.
              */
            initialize(nodeMap: INodeMap, parent: ElementManager): void;
            /**
              * Retrieves the parent control associated with the parent manager.
              */
            getParentControl(): ui.TemplateControl;
            /**
              * Clones this NodeManager with the new node.
              * @param {Node} newNode The new node associated with the new manager.
              * @param {plat.processing.ElementManager} parentManager The parent
              * ElementManager for the clone.
              */
            clone(newNode: Node, parentManager: ElementManager): number;
            /**
              * The function used for data-binding a data context to the DOM.
              */
            bind(): void;
        }
        /**
          */
        function INodeManagerStatic(_regex?: expressions.Regex, _ContextManager?: observable.IContextManagerStatic, _parser?: expressions.Parser, _TemplateControlFactory?: ui.ITemplateControlFactory, _log?: debug.Log): INodeManagerStatic;
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
              */
            findMarkup(text: string): expressions.IParsedExpression[];
            /**
              * Takes in a control with a data context and an array of IParsedExpression
              * and outputs a string of the evaluated expressions.
              * @param {Array<plat.expressions.IParsedExpression>} expressions The composition array to evaluate.
              * @param {plat.ui.TemplateControl} control? The TemplateControl used to parse
              * the expressions.
              */
            build(expressions: expressions.IParsedExpression[], control?: ui.TemplateControl): string;
            /**
              * Registers a listener to be notified of a change in any associated identifier.
              * @param {Array<plat.expressions.IParsedExpression>} expressions An Array of
              * IParsedExpressions to observe.
              * @param {plat.ui.TemplateControl} control The TemplateControl associated
              * to the identifiers.
              * @param {(...args: Array<any>) => void} listener The listener to call when any identifier property changes.
              */
            observeExpressions(expressions: expressions.IParsedExpression[], control: ui.TemplateControl, listener: (...args: any[]) => void): void;
        }
        /**
          * Describes a compiled Node.
          */
        interface INode {
            /**
              * The control associated with the Node, if one exists.
              */
            control?: Control;
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
            injector?: dependency.Injector<Control>;
        }
        /**
          * Defines the interface for a compiled Element.
          */
        interface IUiControlNode extends INode {
            /**
              * The control associated with the Element, if one exists.
              */
            control: ui.TemplateControl;
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
              * TemplateControl, if specified.
              */
            childContext?: string | number;
            /**
              * Indicates whether or not an Control was found on the Element.
              */
            hasControl?: boolean;
            /**
              * A type of INode for a node that contains a TemplateControl,
              * if one was found for the Element.
              */
            uiControlNode?: IUiControlNode;
        }
        /**
          * A class used to manage element nodes. Provides a way for compiling and binding the
          * element/template. Also provides methods for cloning an
          * ElementManager.
          */
        class ElementManager extends NodeManager {
            protected static _inject: any;
            /**
              * Reference to the Document injectable.
              */
            protected static _document: Document;
            /**
              * Reference to a cache injectable that stores ElementManagers.
              */
            protected static _managerCache: storage.Cache<ElementManager>;
            /**
              * Reference to the ResourcesFactory injectable.
              */
            protected static _ResourcesFactory: ui.IResourcesFactory;
            /**
              * Reference to the Attributes injectable.
              */
            protected static _AttributesFactory: typeof ui.Attributes;
            /**
              * Reference to the BindableTemplatesFactory injectable.
              */
            protected static _BindableTemplatesFactory: ui.IBindableTemplatesFactory;
            /**
              * Reference to the Log injectable.
              */
            protected static _log: debug.Log;
            /**
              * Reference to the IPromise injectable.
              */
            protected _Promise: async.IPromise;
            /**
              * Reference to the Compiler injectable.
              */
            protected _compiler: Compiler;
            /**
              * Reference to the ContextManagerStatic injectable.
              */
            protected _ContextManager: observable.IContextManagerStatic;
            /**
              * Reference to the ICommentManagerFactory injectable.
              */
            protected _CommentManagerFactory: ICommentManagerFactory;
            /**
              * Reference to the IControlFactory injectable.
              */
            protected _ControlFactory: IControlFactory;
            /**
              * Reference to the ITemplateControlFactory injectable.
              */
            protected _TemplateControlFactory: ui.ITemplateControlFactory;
            /**
              * Reference to the IBindableTemplatesFactory injectable.
              */
            protected _BindableTemplatesFactory: ui.IBindableTemplatesFactory;
            /**
              * Reference to the Log injectable.
              */
            protected _log: debug.Log;
            /**
              * The child managers for this manager.
              */
            children: NodeManager[];
            /**
              * Specifies the type for this NodeManager.
              * It's value is "element".
              */
            type: string;
            /**
              * Specifies whether or not this manager has a TemplateControl which has a
              * replaceWith property set to null or empty string.
              */
            replace: boolean;
            /**
              * Indicates whether the TemplateControl for this manager has its own context
              * or inherits it from a parent.
              */
            hasOwnContext: boolean;
            /**
              * The length of a replaced control, indicates the number of nodes to slice
              * out of the parent's childNodes.
              */
            replaceNodeLength: number;
            /**
              * In the event that a control does not have its own context, we need a promise to fulfill
              * when the control's context has been set.
              */
            contextPromise: async.Promise<void>;
            /**
              * A promise that is set when an TemplateControl specifies a templateUrl
              * and its HTML needs to be asynchronously obtained.
              */
            templatePromise: async.Promise<void>;
            /**
              * Determines if the associated Element has controls that need to be instantiated or Attr nodes
              * containing text markup. If controls exist or markup is found a new
              * ElementManager will be created,
              * else an empty NodeManager will be added to the Array of
              * NodeManagers.
              * @param {Element} element The Element to use to identifier markup and controls.
              * @param {plat.processing.ElementManager} parent? The parent ElementManager
              * used for context inheritance.
              */
            static create(element: Element, parent?: ElementManager): ElementManager;
            /**
              * Looks through the Node's child nodes to try and find any
              * defined Resources in a <plat-resources> tags.
              * @param {Node} node The node whose child nodes may contain Resources.
              */
            static locateResources(node: Node): HTMLElement;
            /**
              * Clones an ElementManager with a new element.
              * @param {plat.processing.ElementManager} sourceManager The original ElementManager.
              * @param {plat.processing.ElementManager} parent The parent ElementManager
              * for the new clone.
              * @param {Element} element The new element to associate with the clone.
              * @param {plat.ui.TemplateControl} newControl? An optional control to associate with the clone.
              * @param {plat.processing.INodeMap} nodeMap? The {@link plat.processing.INodeMap} used to clone this
              * ElementManager.
              */
            static clone(sourceManager: ElementManager, parent: ElementManager, element: Element, newControl?: ui.TemplateControl, nodeMap?: INodeMap): ElementManager;
            /**
              * Clones an TemplateControl with a new INodeMap.
              * @param {plat.processing.INodeMap} sourceMap The source INodeMap used to clone the
              * TemplateControl.
              * @param {plat.ui.TemplateControl} parent The parent control of the clone.
              */
            static cloneUiControl(sourceMap: INodeMap, parent: ui.TemplateControl): ui.TemplateControl;
            /**
              * Creates new INodes corresponding to the element
              * associated with the INodeMap or the passed-in element.
              * @param {plat.processing.INodeMap} nodeMap The INodeMap that contains
              * the attribute nodes.
              * @param {plat.ui.TemplateControl} parent The parent TemplateControl for
              * the newly created controls.
              * @param {plat.ui.TemplateControl} templateControl? The TemplateControl
              * linked to these created controls if one exists.
              * @param {Element} newElement? An optional element to use for attributes (used in cloning).
              * @param {boolean} isClone? Whether or not these controls are clones.
              */
            static createAttributeControls(nodeMap: INodeMap, parent: ui.TemplateControl, templateControl?: ui.TemplateControl, newElement?: Element, isClone?: boolean): INode[];
            /**
              * Returns a new instance of an ElementManager.
              */
            static getInstance(): ElementManager;
            /**
              * Iterates over the attributes (NamedNodeMap), creating an INodeMap.
              * This map will contain injectors for all the Controls as well as parsed expressions
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
              * @param {plat.ui.TemplateControl} newControl? An optional new control to associate with the cloned node.
              */
            protected static _cloneNode(sourceNode: INode, node: Node, newControl?: ui.TemplateControl): INode;
            /**
              * Clones an INodeMap with a new element.
              * @param {plat.processing.INodeMap} sourceMap The original INodeMap.
              * @param {Element} element The new Element used for cloning.
              * @param {plat.ui.TemplateControl} parent The TemplateControl associated
              * with the parent ElementManager.
              * @param {plat.ui.TemplateControl} newControl? An optional new TemplateControl
              * to associate with the element.
              */
            protected static _cloneNodeMap(sourceMap: INodeMap, element: Element, parent: ui.TemplateControl, newControl?: ui.TemplateControl): INodeMap;
            /**
              * Clones the ElementManager with a new node.
              * @param {Node} newNode The new element used to clone the ElementManager.
              * @param {plat.processing.ElementManager} parentManager The parent manager for the clone.
              * @param {plat.processing.INodeMap} nodeMap? An optional INodeMap to clone a ui control if needed.
              */
            clone(newNode: Node, parentManager: ElementManager, nodeMap?: INodeMap): number;
            /**
              * Initializes both the manager itself and all the controls associated to the manager's
              * INodeMap.
              * @param {plat.processing.INodeMap} nodeMap A map of the nodes (element and attributes)
              * associated with this ElementManager.
              * @param {plat.processing.ElementManager} parent The parent
              * ElementManager.
              * @param {boolean} dontInitialize? Specifies whether or not the initialize method should
              * be called for a TemplateControl if one is attached
              * to this ElementManager.
              */
            initialize(nodeMap: INodeMap, parent: ElementManager, dontInitialize?: boolean): void;
            /**
              * Links the data context to the DOM (data-binding).
              */
            bind(): Control[];
            /**
              * Sets the template for an manager by obtaining any needed HTML templates and
              * calling its associated TemplateControl's
              * setTemplate method.
              * @param {string} templateUrl? The URL for the associated TemplateControl's
              * HTML template.
              */
            setUiControlTemplate(templateUrl?: string): void;
            /**
              * Retrieves the TemplateControl instance
              * associated with this ElementManager.
              */
            getUiControl(): ui.TemplateControl;
            /**
              * Fulfills any template promises and finishes the compile phase for the HTML template associated
              * with this ElementManager.
              */
            fulfillTemplate(): async.Promise<void | void[]>;
            /**
              * Fulfills the template promise prior to binding and loading the control.
              */
            fulfillAndLoad(): async.Promise<void>;
            /**
              * Binds context to the DOM and loads controls.
              */
            bindAndLoad(): async.Promise<void>;
            /**
              * Observes the root context for controls that specify their own context, and initiates
              * a load upon a successful set of the context.
              * @param {plat.ui.TemplateControl} root The TemplateControl specifying its own context.
              * @param {() => async.Promise<void>} loadMethod The function to initiate the loading of the root control and its
              * children.
              */
            observeRootContext(root: ui.TemplateControl, loadMethod: () => async.Promise<void>): async.Promise<void>;
            /**
              * Finalizes all the properties on an TemplateControl
              * before loading.
              * @param {plat.ui.TemplateControl} uiControl The control to finalize.
              * @param {string} absoluteContextPath The absoluteContextPath of the uiControl.
              */
            protected _beforeLoad(uiControl: ui.TemplateControl, absoluteContextPath: string): void;
            /**
              * Binds context to the DOM and calls bindAndLoad on all children.
              */
            protected _bindChildren(): async.Promise<void[]>;
            /**
              * Loads the potential attribute based controls associated with this
              * ElementManager and
              * attaches the corresponding TemplateControl if available.
              * @param {Array<plat.AttributeControl>} controls The array of attribute based controls to load.
              * @param {plat.ui.TemplateControl} templateControl The TemplateControl
              * associated with this manager.
              */
            protected _loadControls(controls: AttributeControl[], templateControl: ui.TemplateControl): async.Promise<void>;
            /**
              * Populates the TemplateControl properties associated with this manager
              * if one exists.
              */
            protected _populateUiControl(): void;
            /**
              * Removes the TemplateControl's element. Called if its replaceWith property is
              * null or empty string.
              * @param {plat.ui.TemplateControl} control The TemplateControl whose element
              * will be removed.
              * @param {plat.processing.INodeMap} nodeMap The INodeMap associated with this manager.
              */
            protected _replaceElement(control: ui.TemplateControl, nodeMap: INodeMap): void;
            /**
              * Initializes a control's template and compiles the control.
              * @param {plat.ui.TemplateControl} uiControl The TemplateControl
              * associated with this manager.
              * @param {DocumentFragment} template The associated TemplateControl's
              * template.
              */
            protected _initializeControl(uiControl: ui.TemplateControl, template: DocumentFragment): void;
            /**
              * Observes the identifiers associated with this manager's INodes.
              * @param {Array<plat.processing.INode>} nodes The array of INodes to iterate through.
              * @param {plat.ui.TemplateControl} parent The parent TemplateControl for context.
              * @param {Array<plat.Control>} controls The array of controls whose attributes will need to be updated
              * upon the context changing.
              */
            protected _observeControlIdentifiers(nodes: INode[], parent: ui.TemplateControl, controls: Control[], element: Element): void;
            /**
              * Runs through all the children of this manager and calls fulfillTemplate.
              */
            protected _fulfillChildTemplates(): async.Promise<void | void[]>;
        }
        /**
          */
        function IElementManagerFactory(_document?: Document, _managerCache?: storage.Cache<ElementManager>, _ResourcesFactory?: ui.IResourcesFactory, _AttributesFactory?: typeof ui.Attributes, _BindableTemplatesFactory?: ui.IBindableTemplatesFactory, _log?: debug.Log): IElementManagerFactory;
        /**
          * Creates and manages a class for dealing with Element nodes.
          */
        interface IElementManagerFactory {
            /**
              * Determines if the associated Element has controls that need to be instantiated or Attr nodes
              * containing text markup. If controls exist or markup is found a new
              * ElementManager will be created,
              * else an empty NodeManager will be added to the Array of
              * NodeManagers.
              * @param {Element} element The Element to use to identifier markup and controls.
              * @param {plat.processing.ElementManager} parent? The parent ElementManager
              * used for context inheritance.
              */
            create(element: Element, parent?: ElementManager): ElementManager;
            /**
              * Creates new INodes corresponding to the element
              * associated with the INodeMap or the passed-in element.
              * @param {plat.processing.INodeMap} nodeMap The INodeMap that contains
              * the attribute nodes.
              * @param {plat.ui.TemplateControl} parent The parent TemplateControl for
              * the newly created controls.
              * @param {plat.ui.TemplateControl} templateControl? The TemplateControl
              * linked to these created controls if one exists.
              * @param {Element} newElement? An optional element to use for attributes (used in cloning).
              * @param {boolean} isClone? Whether or not these controls are clones.
              */
            createAttributeControls(nodeMap: INodeMap, parent: ui.TemplateControl, templateControl?: ui.TemplateControl, newElement?: Element, isClone?: boolean): INode[];
            /**
              * Clones an TemplateControl with a new INodeMap.
              * @param {plat.processing.INodeMap} sourceMap The source INodeMap used to clone the
              * TemplateControl.
              * @param {plat.ui.TemplateControl} parent The parent control of the clone.
              */
            cloneUiControl(sourceMap: INodeMap, parent: ui.TemplateControl): ui.TemplateControl;
            /**
              * Clones an ElementManager with a new element.
              * @param {plat.processing.ElementManager} sourceManager The original ElementManager.
              * @param {plat.processing.ElementManager} parent The parent ElementManager
              * for the new clone.
              * @param {Element} element The new element to associate with the clone.
              * @param {plat.ui.TemplateControl} newControl? An optional control to associate with the clone.
              * @param {plat.processing.INodeMap} nodeMap? The {@link plat.processing.INodeMap} used to clone this
              * ElementManager.
              */
            clone(sourceManager: ElementManager, parent: ElementManager, element: Element, newControl?: ui.TemplateControl, nodeMap?: INodeMap): ElementManager;
            /**
              * Looks through the Node's child nodes to try and find any
              * defined Resources in a <plat-resources> tags.
              * @param {Node} node The node whose child nodes may contain Resources.
              */
            locateResources(node: Node): HTMLElement;
            /**
              * Returns a new instance of an ElementManager.
              */
            getInstance(): ElementManager;
        }
        /**
          * The class responsible for initializing and data-binding values to text nodes.
          */
        class TextManager extends NodeManager {
            /**
              * Specifies the type for this NodeManager.
              * It's value is "text".
              */
            type: string;
            /**
              * Determines if a text node has markup, and creates a TextManager if it does.
              * An TextManager responsible for markup in the passed in node or an empty
              * TextManager if not markup is found will be added to the managers array.
              * @param {Node} node The Node used to find markup.
              * @param {plat.processing.ElementManager} parent The parent ElementManager
              * for the node.
              */
            static create(node: Node, parent: ElementManager): TextManager;
            /**
              * Clones an INodeMap with a new text node.
              * @param {plat.processing.INodeMap} sourceMap The original INodeMap.
              * @param {Node} newNode The new text node used for cloning.
              */
            protected static _cloneNodeMap(sourceMap: INodeMap, newNode: Node): INodeMap;
            /**
              * Clones a TextManager with a new text node.
              * @param {plat.processing.NodeManager} sourceManager The original NodeManager.
              * @param {Node} node The new text node to associate with the clone.
              * @param {plat.processing.ElementManager} parent The parent ElementManager
              * for the new clone.
              */
            protected static _clone(sourceManager: NodeManager, node: Node, parent: ElementManager): TextManager;
            /**
              * Clones this TextManager with a new node.
              * @param {Node} newNode The new node attached to the cloned TextManager.
              * @param {plat.processing.ElementManager} parentManager The parent ElementManager
              * for the clone.
              */
            clone(newNode: Node, parentManager: ElementManager): number;
            /**
              * The function used for data-binding a data context to the DOM.
              */
            bind(): void;
            /**
              * Builds the node expression and sets the value.
              * @param {Node} Node The associated node whose value will be set.
              * @param {plat.ui.TemplateControl} control The control whose context will be used to bind
              * the data.
              * @param {Array<plat.expressions.IParsedExpression>} expressions An array of parsed expressions used to build
              * the node value.
              */
            protected _setText(node: Node, control: ui.TemplateControl, expressions: expressions.IParsedExpression[]): void;
        }
        /**
          */
        function ITextManagerFactory(): ITextManagerFactory;
        /**
          * Creates and manages a class for dealing with DOM Text Nodes.
          */
        interface ITextManagerFactory {
            /**
              * Determines if a text node has markup, and creates a TextManager if it does.
              * An TextManager responsible for markup in the passed in node or an empty
              * TextManager if not markup is found will be added to the managers array.
              * @param {Node} node The Node used to find markup.
              * @param {plat.processing.ElementManager} parent The parent ElementManager
              * for the node.
              */
            create(node: Node, parent?: ElementManager): TextManager;
        }
        /**
          * A class used to manage Comment nodes. Provides a way to
          * clone a Comment node.
          */
        class CommentManager extends NodeManager {
            /**
              * Specifies the type for this NodeManager.
              * It's value is "comment".
              */
            type: string;
            /**
              * Creates a new CommentManager for the given Comment node.
              * @param {Node} node The Comment to associate with the new manager.
              * @param {plat.processing.ElementManager} parent The parent
              * ElementManager.
              */
            static create(node: Node, parent: ElementManager): CommentManager;
            /**
              * A method for cloning this manager with a new Comment.
              * @param {Node} newNode The new Comment node to associate with the cloned
              * manager.
              * @param {plat.processing.ElementManager} parentManager The parent ElementManager
              * for the clone.
              */
            clone(newNode: Node, parentManager: ElementManager): number;
        }
        /**
          */
        function ICommentManagerFactory(): ICommentManagerFactory;
        /**
          * Creates and manages a class for dealing with Comment nodes.
          */
        interface ICommentManagerFactory {
            /**
              * Creates a new CommentManager for the given Comment node.
              * @param {Node} node The Comment to associate with the new manager.
              * @param {plat.processing.ElementManager} parent The parent
              * ElementManager.
              */
            create(node: Node, parent: ElementManager): CommentManager;
        }
        /**
          * Used to facilitate observing expressions on attributes. Has the ability to alert Attributes
          * with changes. Handles dynamic and static attributes (dynamic meaning "class"-like attributes).
          */
        class AttributeManager {
            /**
              * The element that contains the attribute for this manager.
              */
            element: HTMLElement;
            /**
              * The INode that contains the attribute for this manager.
              */
            node: INode;
            /**
              * The parent control for the controls associated with this manager.
              */
            parent: ui.TemplateControl;
            /**
              * Whether or not the element that contains this attribute is replaced in the DOM.
              */
            replace: boolean;
            /**
              * The public interface for sending notifications of changes to this attribute.
              */
            attributeChanged: () => void;
            /**
              * Reference to the INodeManagerStatic injectable.
              */
            protected _NodeManager: INodeManagerStatic;
            /**
              * The controls which need to be notified of changes to this attribute.
              */
            protected _controls: Control[];
            /**
              * The filtered expressions for a "dynamic" attribute.
              */
            protected _bindingExpressions: expressions.IParsedExpression[];
            /**
              * Keeps track of the previous bound values of a "dynamic" attribute.
              */
            protected _lastValues: IObject<boolean>;
            /**
              * Returns a new instance of an AttributeManager.
              */
            static getInstance(): AttributeManager;
            /**
              * Initializes the manager and determines what method should be used to handle attribute changes.
              * @param {HTMLElement} element The element that contains this attribute.
              * @param {plat.processing.INode} node The INode associated with this attribute.
              * @param {plat.ui.TemplateControl} parent The parent control for all the controls associated with
              * the element.
              * @param {Array<plat.Control>} controls The controls associated with the element.
              * @param {boolean} replace? Whether or not the element is replaced.
              */
            initialize(element: Element, node: INode, parent: ui.TemplateControl, controls: Control[], replace?: boolean): void;
            /**
              * Handles changes to dynamic attributes. Takes into account that the attribute may have been changed programmatically, and
              * we need to only mutate the piece of the attribute corresponding to expressions with markup.
              */
            protected _dynamicAttributeChanged(): void;
            /**
              * Handles changes to static attributes. Builds a string from the node expressions, then sets the attribute value
              * and notifies the associated Attributes.
              */
            protected _staticAttributeChanged(): void;
            /**
              * Notifies the necessary Attributes of changes to an attribute.
              */
            protected _notifyAttributes(key: string, value: any): void;
        }
    }
    /**
      * Holds all classes and interfaces related to routing components in platypus.
      */
    namespace routing {
        /**
          * Ties the browser and routers together, facilitating app navigation at every router level.
          * Listens for url changes and responds accordingly. Also contains functionality for generating
          * and changing the url.
          */
        class Navigator {
            protected static _inject: any;
            /**
              * The navigator associated with the root router.
              */
            protected static _root: Navigator;
            /**
              * A unique id, created during instantiation and found on every Navigator.
              */
            uid: string;
            /**
              * States whether or not the Navigator is the root Navigator.
              */
            isRoot: boolean;
            /**
              * The IPromise injectable instance
              */
            protected _Promise: async.IPromise;
            /**
              * The IBrowserConfig injectable instance
              */
            protected _browserConfig: web.IBrowserConfig;
            /**
              * The Browser injectable instance
              */
            protected _browser: web.Browser;
            /**
              * The IEventManagerStatic injectable instance
              */
            protected _EventManager: events.IEventManagerStatic;
            /**
              * The window injectable instance
              */
            protected _window: Window;
            /**
              * Reference to the Log injectable.
              */
            protected _log: debug.Log;
            /**
              * The History injectable instance
              */
            protected _history: History;
            /**
              * The router associated with this navigator.
              */
            protected _router: Router;
            /**
              * A method to call to stop listening for url changes, only works on the root navigator.
              */
            protected _removeUrlListener: IRemoveListener;
            /**
              * A method to call to stop listening for url changes, only works on the root navigator.
              */
            protected _ignoreOnce: boolean;
            /**
              * A method to call to stop listening for url changes, only works on the root navigator.
              */
            protected _previousUrl: string;
            /**
              * Whether or not the current navigation is a backward navigation
              */
            protected _backNavigate: boolean;
            /**
              * A method to resolve the current navigation.
              */
            protected _resolveNavigate: () => void;
            /**
              * A method to reject the current navigation.
              */
            protected _rejectNavigate: (err: any) => void;
            /**
              * Initializes this Navigator with a router.
              * @param {plat.routing.Router} router The router that the navigator should use to match/generate routes.
              */
            initialize(router: Router): void;
            /**
              * Tells the navigator to navigate to the url registered for a particular view.
              * @param {any} view The view to which the Navigator should navigate.
              * @param {plat.routing.INavigateOptions} options used to generate the url and perform navigation.
              */
            navigate(view: any, options?: INavigateOptions): async.Promise<void>;
            /**
              * Returns a promise that resolves when all navigation has finished.
              */
            finishNavigating(): async.Promise<void>;
            /**
              * Tells the router to go back with the given options.
              */
            goBack(options?: IBackNavigateOptions): async.Promise<void>;
            /**
              * Indicates whether or not the current navigation is a backward navigation.
              */
            isBackNavigation(): boolean;
            /**
              * Lets the router dispose of all of the necessary properties.
              */
            dispose(): void;
            /**
              * Internal method for navigating to the specified url.
              */
            protected _navigate(url: string, replace?: boolean): async.Promise<void>;
            /**
              * Internal method for going back a certain length in history
              */
            protected _goBack(length: number): async.Promise<void>;
            /**
              * The root navigator will always observe for url changes and handle them accordingly. This means instructing the
              * router to navigate, and determining what to do in the event that navigation is prevented.
              */
            protected _observeUrl(): void;
            /**
              * Generates a url with the given view, parameters, and query.
              */
            protected _generate(view: any, parameters: any, query: any): string;
        }
        /**
          * Specifies options used during navigation. Can help build the url, as well as change
          * the behavior of the navigation.
          */
        interface INavigateOptions {
            /**
              * Indicates that the url is specified and does not need to be generated.
              */
            isUrl?: boolean;
            /**
              * Url parameters, used to generate a url if the associated view is a variable route (i.e. '/posts/:id')
              */
            parameters?: IObject<any>;
            /**
              * An object used to generate a query string.
              */
            query?: IObject<any>;
            /**
              * Whether or not this url should replace the current url in the browser history.
              */
            replace?: boolean;
        }
        /**
          * Specifies options used during backward navigation.
          */
        interface IBackNavigateOptions {
            /**
              * The length in history to go back.
              */
            length?: number;
        }
        /**
          */
        function History(_window?: Window): History;
        /**
          * An interface for the state object in history.
          */
        interface IHistoryState {
            /**
              * The location that existed before navigating to this page
              */
            previousLocation: string;
        }
        /**
          * Stores information about a segment, publishes a regex for matching the segment as well as
          * methods for generating the segment and iterating over the characters in the segment.
          */
        class BaseSegment {
            /**
              * Reference to the Regex injectable.
              */
            protected static _regex: expressions.Regex;
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
          */
        function IBaseSegmentFactory(_regex: expressions.Regex): typeof BaseSegment;
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
              * @param {Array<plat.routing.State>} states The states to sort.
              */
            static sort(states: State[]): State[];
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
              * Iterates through the next states and calls the input callback with each state.
              * @param {(child: plat.routing.State) => void} iterator The function with which to call for each
              * State.
              */
            protected _someChildren(iterator: (child: State) => boolean | void): boolean;
        }
        /**
          */
        function IStateStatic(): typeof State;
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
            protected static _inject: any;
            /**
              * Reference to the BaseSegment injectable.
              */
            protected _BaseSegmentFactory: typeof BaseSegment;
            /**
              * Reference to the State injectable.
              */
            protected _State: typeof State;
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
              * Safely converts a string to lower case.
              * @param {string} str The string to convert to lower case.
              */
            protected _toLowerCase(str: string): string;
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
          * Used during route registration to specify a delegate object to associate
          * with a route.
          */
        interface IRouteDelegate {
            /**
              * The pattern to match for the route, accepts dynamic routes as well as splat routes.
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
        /**
          * Matches URLs to registered views. Allows for rejecting navigation, as well as
          * processing route and query parameters. When a route is matches, the current view
          * has the opportunity to reject/delay navigation. The next view can also reject navigation,
          * or redirect.
          * This is done asynchronously, giving the application the ability to make web service calls
          * to determining
          */
        class Router {
            protected static _inject: any;
            /**
              * The last instantiated router, useful for components wanting to find the most recently
              * created router in order to generate routes.
              */
            private static __currentRouter;
            /**
              * Whether or not the router is currently navigating.
              */
            navigating: boolean;
            /**
              * A Promise That resolves when the router is done navigating.
              */
            finishNavigating: async.Promise<void>;
            /**
              * The route information for the active route state.
              */
            currentRouteInfo: IRouteInfo;
            /**
              * The parent router to this router. Useful for generating and matching routes.
              */
            parent: Router;
            /**
              * All the registered children for this router. Useful for generating and matching routes.
              */
            children: Router[];
            /**
              * A unique id for the router.
              */
            uid: string;
            /**
              * Whether or not this router is the root router (has no parent).
              */
            isRoot: boolean;
            /**
              * The route information for the next route state.
              */
            protected _nextRouteInfo: IRouteInfo;
            /**
              * The previous url matched for this router.
              */
            protected _previousUrl: string;
            /**
              * The previous query matched for this router.
              */
            protected _previousQuery: string;
            /**
              * The previous route segment matched for this router.
              */
            protected _previousSegment: string;
            /**
              * The previous registered route pattern matched for this router.
              */
            protected _previousPattern: string;
            /**
              * Used for registering, generating, and recognizing routes.
              */
            protected _recognizer: RouteRecognizer;
            /**
              * Used for registering, generating, and recognizing child routes.
              */
            protected _childRecognizer: RouteRecognizer;
            /**
              * An object containing transform methods for route parameters.
              */
            protected _paramTransforms: IObject<IRouteTransforms>;
            /**
              * An object containing transform methods for query parameters.
              */
            protected _queryTransforms: IObject<IRouteTransforms>;
            /**
              * An object containing interceptor methods for particular routes.
              */
            protected _interceptors: IObject<((routeInfo: IRouteInfo) => any)[]>;
            /**
              * A handler for unknown routes.
              */
            protected _unknownHandler: (info: IUnknownRouteInfo) => any;
            /**
              * All the registered Viewports for the router.
              */
            protected _ports: ISupportRouteNavigation[];
            /**
              * The Promise injectable
              */
            protected _Promise: async.IPromise;
            /**
              * The Injector class, used to match ViewControls to their registered tokens.
              */
            protected _Injector: typeof dependency.Injector;
            /**
              * Used to grab the initial url for the router if necessary.
              */
            protected _browser: web.Browser;
            /**
              * A shortcut to the Promise.resolve function.
              */
            protected _resolve: typeof async.Promise.resolve;
            /**
              * A shortcut to the Promise.reject function.
              */
            protected _reject: typeof async.Promise.reject;
            /**
              * Exposes the current router property. Also provides the
              * ability to set the current router.
              * @param {plat.routing.Router} router Will set the current router.
              */
            static currentRouter(router?: Router): Router;
            /**
              * Instantiates a new router and sets it as the current router.
              */
            constructor();
            /**
              * Initializes a router, giving it a parent router to link to if necessary.
              * @param {plat.routing.Router} parent? The parent router to link.
              */
            initialize(parent?: Router): void;
            /**
              * Registers a child router with the current router.
              * @param {plat.routing.Router} child A child router.
              */
            addChild(child: Router): Router;
            /**
              * Removes a child from the router's children, if it exists.
              * @param {plat.routing.Router} child The child router to remove.
              */
            removeChild(child: Router): void;
            /**
              * Registers a Viewport (or similar object) with the
              * router, and triggers a navigation if possible.
              * @param {plat.routing.ISupportRouteNavigation} port An object that supports all the navigation events.
              */
            register(port: ISupportRouteNavigation): async.Promise<void>;
            /**
              * Un-registers a Viewport (or similar object) with the
              * router in order to stop receiving navigation events.
              * @param {plat.routing.ISupportRouteNavigation} port An object that supports all the navigation events.
              */
            unregister(port: ISupportRouteNavigation): void;
            /**
              * Configures routes for the router to match. Routes contain the information necessary to map a
              * route to a particular ViewControl. Also forces a navigation.
              * @param {Array<plat.routing.IRouteMapping>} routes Route mappings to register.
              * @param {boolean} force whether or not we should force navigate.
              */
            configure(routes: IRouteMapping | IRouteMapping[], force?: boolean): async.Promise<void>;
            /**
              * Allows for dynamic routing. Call this method in order to register a handler for dynamically determining what view to
              * use when a registered route is not found.
              * @param {(info: IUnknownRouteInfo) => any} handler A method called to determine what view is associated with a route.
              */
            unknown(handler: (info: IUnknownRouteInfo) => any): Router;
            /**
              * Registers a handler for a route parameter. When a route is a variable route (e.g. /posts/:id), all the param handlers
              * registered for the particular view and parameter "id" will be called. The call to the handler is blocking, so the handler
              * can return a promise while it processes the parameter. All the handlers for a parameter will be called in the order in which
              * they were registered, with the catch-all (i.e. '*') handlers being called first. Param handlers will be called after all the
              * query param handlers have been processed. Param handlers are called prior to calling the "canNavigateTo" pipeline.
              * @param {(value: any, parameters: any, query: any) => any} handler A method that will manipulate the registered parameter.
              * @param {string} parameter The parameter that the registered handler will modify.
              * @param {string} view The view's registered token used to match the route. If left out, all routes will be matched.
              */
            param(handler: (value: any, parameters: any, query: any) => any, parameter: string, view?: string | (new (...args: any[]) => any)): Router;
            /**
              * Registers a handler for a query parameter. When a route contains a query string (e.g. '?start=0'), it will be serialized into an object.
              * Then, all the queryParam handlers registered for the particular view and query parameter "start" will be called. The call to the handler
              * is blocking, so the handler can return a promise while it processes the parameter. All the handlers for a parameter will be called in the
              * order in which they were registered, with the catch-all (i.e. '*') handlers being called first. Query param handlers are called prior to
              * calling the "canNavigateTo" pipeline.
              * @param {(value: any, query: any) => any} handler A method that will manipulate the registered parameter.
              * @param {string} parameter The parameter that the registered handler will modify.
              * @param {string} view The view's registered token used to match the route. If left out, all routes will be matched.
              */
            queryParam(handler: (value: string, query: any) => any, parameter: string, view?: string | (new (...args: any[]) => any)): Router;
            /**
              * Registers a handler for a particular route, or all routes. When the route changes, the interceptors registered for the route will be
              * called in-order (starting with the catch-all interceptors), and they have the opportunity to modify the route information, as well as
              * prevent navigation from occurring. Interceptors are called prior to calling the "canNavigateTo" pipeline.
              * @param {(routeInfo: plat.routing.IRouteInfo) => any} interceptor A method that will process the current route.
              * @param {string} view The view's registered token used to match the route. If left out, all routes will be matched.
              */
            intercept(interceptor: (routeInfo: IRouteInfo) => any, view?: string | (new (...args: any[]) => any)): Router;
            /**
              * Tells the router to match a new route. The router will attempt to find the route and if it succeeds it will
              * attempt to navigate to it. If it fails, it will return a Promise that rejects.
              * @param {string} url The new route to match.
              * @param {plat.IObject<any>} query The query parameters for the route.
              * @param {boolean} force Whether or not to force navigation, even if the same url has already been matched.
              */
            navigate(url: string, query?: IObject<any>, force?: boolean, poll?: boolean): async.Promise<void>;
            /**
              * Attempts to generate a route with the specified route name. Will generate the full-path from the root
              * router.
              * @param {string} name The name of the route to generate.
              * @param {plat.IObject<string>} parameters? Any parameters used to generate the route.
              * @param {plat.IObject<string>} query? Any query parameters to append to the generated route.
              */
            generate(name: string | (new (...args: any[]) => any), parameters?: IObject<string>, query?: IObject<string>): string;
            /**
              * Configures a route mapping and registers it with the RouteRecognizer and the child
              * RouteRecognizer.
              * @param {plat.routing.IRouteMapping} route The mapping used to configure the route.
              */
            protected _configureRoute(route: IRouteMapping): void;
            /**
              * Generic method for adding a param/queryParam handler to the registered handlers object.
              * @param {(value: any, query: any) => any} handler A method that will manipulate the registered parameter.
              * @param {string} parameter The parameter that the registered handler will modify.
              * @param {any} view The view used to match the route. If undefined, all routes will be matched.
              * @param {plat.IObject<plat.routing.IRouteTransforms>} handlers The object to which to add the handler.
              */
            protected _addHandler(handler: (value: string, values: any, query?: any) => any, parameter: string, view: any, handlers: IObject<IRouteTransforms>): Router;
            /**
              * Forces a navigation if possible.
              */
            protected _forceNavigate(): async.Promise<void>;
            /**
              * Navigates the child routers.
              * @param {plat.routing.IRouteInfo} info The information necessary to build the childRoute for the child routers.
              */
            protected _navigateChildren(info: IRouteInfo, poll?: boolean): async.Promise<void>;
            /**
              * Parses out the child route from route information.
              * @param {plat.routing.IRouteInfo} info The information necessary to get the child route.
              */
            protected _getChildRoute(info: IRouteInfo): string;
            /**
              * It is safe to navigate, so perform the navigation.
              * @param {plat.routing.IRouteInfo} info The route information.
              */
            protected _performNavigation(info: IRouteInfo): async.Promise<void>;
            /**
              * It is safe to navigate, so fire the navigateFrom events.
              * @param {boolean} ignorePorts? Ignores the ports if necessary.
              */
            protected _performNavigateFrom(ignorePorts?: boolean): async.Promise<void>;
            /**
              * Determines if we can navigate from the current state and navigate to the next state.
              * @param {plat.routing.IRouteInfo} info The route information.
              */
            protected _canNavigate(info: IRouteInfo, poll?: boolean): async.Promise<boolean>;
            /**
              * Determines if we can navigate from the current state and navigate to the next state.
              * @param {boolean} ignorePorts Ignores the ports if necessary.
              */
            protected _canNavigateFrom(ignorePorts?: boolean): async.Promise<boolean>;
            /**
              * Determines if we can navigate to the next state.
              * @param {plat.routing.IRouteInfo} info The route information.
              * @param {boolean} ignorePorts Ignores the ports if necessary.
              */
            protected _canNavigateTo(info: IRouteInfo, ignorePorts?: boolean): async.Promise<boolean>;
            /**
              * Calls all the registered query and param transforms for a route.
              * @param {string} view The associated view for the route.
              * @param {any} parameters The route parameters.
              * @param {any} query? The query parameters.
              */
            protected _callAllHandlers(view: string, parameters: any, query?: any): async.Promise<void>;
            /**
              * Calls the associated transform functions.
              * @param {plat.routing.IRouteTransforms} allHandlers The transform functions
              * @param {any} obj The parameters.
              * @param {any} query? The query parameters.
              * @param {boolean} force? Whether or not the handler should be called if its param/queryParam does not exist.
              */
            protected _callHandlers(allHandlers: IRouteTransforms, obj: any, query?: any, force?: boolean): async.Promise<void>;
            /**
              * Calls the interceptors for a particular route.
              * @param {plat.routing.IRouteInfo} info The route information.
              */
            protected _callInterceptors(info: IRouteInfo): async.Promise<boolean>;
            /**
              * Checks a passed-in route against the current route to determine if it is the same.
              * @param {plat.routing.IRouteInfo} info The route information.
              */
            protected _isSameRoute(info: IRouteInfo): boolean;
            /**
              * Removes childRoute from routeInfo
              * @param {plat.routing.IRouteInfo} info The route information.
              */
            protected _sanitizeRouteInfo(info: IRouteInfo): void;
            /**
              * Clears all the router information, essentially setting the router back to its initialized state.
              */
            protected _clearInfo(): void;
        }
        /**
          */
        function IRouterStatic(): IRouterStatic;
        /**
          * The static methods and properties on router
          */
        interface IRouterStatic {
            /**
              * Exposes the current router property. Also provides the
              * ability to set the current router.
              * @param {plat.routing.Router} router Will set the current router.
              */
            currentRouter(router?: Router): Router;
        }
        /**
          * A route mapping, used for registering and matching routes.
          */
        interface IRouteMapping {
            /**
              * A pattern for the route (e.g. "/posts/:id")
              */
            pattern: string;
            /**
              * Either a Constructor for a registered ViewControl, or the registered token for
              * that ViewControl.
              */
            view: any;
            /**
              * An optional alias with which to associate this mapping. Alias is used over view when specified.
              */
            alias?: string;
        }
        /**
          * The result of a recognized route.
          */
        interface IRouteResult extends Array<IRouteInfo> {
        }
        /**
          * The information for a recognized route. Contains the delegate, which
          * maps directly to a ViewControl.
          */
        interface IRouteInfo extends IDelegateInfo {
            /**
              * Maps to a registered ViewControl.
              */
            delegate: IRouteMapping;
            /**
              * Query parameters for the route.
              */
            query?: IObject<any>;
        }
        /**
          * Information for an unknown route. If an unknown handler is registered with the router, it will be called.
          * The handler can use the `segment` property to figure out what `view` to use. Setting the `view` property will
          * tell the router what view to use. The `view` will become the configured view for that route.
          */
        interface IUnknownRouteInfo {
            /**
              * The url segment that has not been matched to a registered view.
              */
            segment: string;
            /**
              * Set this to tell the router what view to navigate to.
              */
            view: any;
        }
        /**
          * An object that contains an Array of route transform functions.
          */
        interface IRouteTransforms extends IObject<((value: string, values: any, query?: any) => any)[]> {
        }
        /**
          * Describes an object that supports all the routing events (e.g. a Viewport).
          */
        interface ISupportRouteNavigation {
            /**
              * The router has matched a route and is asking if it is safe to navigate from the current state.
              * Here you cancan query the current ViewControl and ask it if it is safe to navigate from its current state.
              */
            canNavigateFrom(): async.Promise<boolean>;
            /**
              * The router has matched a route and is asking if it is safe to navigate. Here
              * you can instantiate the new view and ask it if it is safe to navigate to the view.
              * @param {plat.routing.IRouteInfo} routeInfo Contains the information necessary to instantiate
              * the view and feed it the route parameters/query.
              */
            canNavigateTo(routeInfo: IRouteInfo): async.Promise<boolean>;
            /**
              * The router has matched a route and determined that it is safe to navigate to the
              * next view. It is now safe for to dispose of the current state.
              */
            navigateFrom(): async.Promise<any>;
            /**
              * The router has matched a route and determined that it is safe to navigate to the
              * next view. You can now go through the steps to compile and link the next view then append
              * it to the DOM.
              * @param {plat.routing.IRouteInfo} routeInfo Contains the information necessary to instantiate
              * the view and feed it the route parameters/query.
              */
            navigateTo(routeInfo: IRouteInfo): async.Promise<any>;
        }
    }
    /**
      * Holds all classes and interfaces related to attribute control components in platypus.
      */
    namespace controls {
        /**
          * Allows for assigning a name to an Element or TemplateControl and referencing it
          * from parent controls.
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
        class SimpleEventControl extends AttributeControl implements ISendEvents {
            protected static _inject: any;
            /**
              * Reference to the Parser injectable.
              */
            protected _parser: expressions.Parser;
            /**
              * Reference to the Regex injectable.
              */
            protected _regex: expressions.Regex;
            /**
              * The event name.
              */
            event: string;
            /**
              * The camel-cased name of the control as it appears as an attribute.
              */
            attribute: string;
            /**
              * The string representation of the function to be fired.
              */
            protected _listener: string;
            /**
              * An array of the aliases used in the expression.
              */
            protected _aliases: string[];
            /**
              * A parsed form of an Array of the arguments to be passed into the function to be fired.
              */
            protected _args: expressions.IParsedExpression;
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
              * Constructs the function to evaluate with the evaluated arguments taking resources
              * into account.
              */
            protected _buildExpression(): {
                context: any;
                args: expressions.IParsedExpression[];
                fn(): void;
            };
            /**
              * Calls the specified function when the DOM event is fired.
              * @param {Event} ev The event object.
              */
            protected _onEvent(ev: Event): void;
            /**
              * Parses the expression and separates the function
              * from its arguments.
              * @param {string} expression The expression to parse.
              */
            protected _parseArgs(expression: string): void;
        }
        /**
          * An AttributeControl that binds to a specified DOM event handler.
          */
        interface ISendEvents {
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
            protected static _inject: any;
            /**
              * Reference to the Compat injectable.
              */
            protected _compat: Compat;
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
        let KeyCodes: {
            backspace: number;
            tab: number;
            enter: number;
            shift: number;
            ctrl: number;
            alt: number;
            pause: number;
            break: number;
            'caps lock': number;
            escape: number;
            space: number;
            'page up': number;
            'page down': number;
            end: number;
            home: number;
            left: number;
            'left arrow': number;
            up: number;
            'up arrow': number;
            right: number;
            'right arrow': number;
            down: number;
            'down arrow': number;
            insert: number;
            delete: number;
            0: number;
            zero: number;
            ')': number;
            'right parenthesis': number;
            1: number;
            one: number;
            '!': number;
            exclamation: number;
            'exclamation point': number;
            2: number;
            two: number;
            '@': number;
            at: number;
            3: number;
            three: number;
            '#': number;
            'number sign': number;
            hash: number;
            pound: number;
            4: number;
            four: number;
            $: number;
            dollar: number;
            'dollar sign': number;
            5: number;
            five: number;
            '%': number;
            percent: number;
            'percent sign': number;
            6: number;
            six: number;
            '^': number;
            caret: number;
            7: number;
            seven: number;
            '&': number;
            ampersand: number;
            8: number;
            eight: number;
            '*': number;
            asterisk: number;
            9: number;
            nine: number;
            '(': number;
            'left parenthesis': number;
            a: number;
            b: number;
            c: number;
            d: number;
            e: number;
            f: number;
            g: number;
            h: number;
            i: number;
            j: number;
            k: number;
            l: number;
            m: number;
            n: number;
            o: number;
            p: number;
            q: number;
            r: number;
            s: number;
            t: number;
            u: number;
            v: number;
            w: number;
            x: number;
            y: number;
            z: number;
            lwk: number;
            'left window key': number;
            rwk: number;
            'right window key': number;
            select: number;
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
            multiply: number;
            add: number;
            subtract: number;
            'decimal point': number;
            divide: number;
            f1: number;
            f2: number;
            f3: number;
            f4: number;
            f5: number;
            f6: number;
            f7: number;
            f8: number;
            f9: number;
            f10: number;
            f11: number;
            f12: number;
            'num lock': number;
            'scroll lock': number;
            ';': number;
            'semi-colon': number;
            ':': number;
            colon: number;
            '=': number;
            equal: number;
            'equal sign': number;
            '+': number;
            plus: number;
            ',': number;
            comma: number;
            '<': number;
            lt: number;
            'less than': number;
            'left angle bracket': number;
            '-': number;
            dash: number;
            _: number;
            underscore: number;
            '.': number;
            period: number;
            '>': number;
            gt: number;
            'greater than': number;
            'right angle bracket': number;
            '/': number;
            'forward slash': number;
            '?': number;
            'question mark': number;
            '`': number;
            'grave accent': number;
            '~': number;
            tilde: number;
            '[': number;
            'open bracket': number;
            '{': number;
            'open brace': number;
            '\\': number;
            'back slash': number;
            '|': number;
            pipe: number;
            ']': number;
            'close bracket': number;
            '}': number;
            'close brace': number;
            "'": number;
            'single quote': number;
            '"': number;
            'double quote': number;
        };
        /**
          * Base class used for filtering keys on KeyboardEvents.
          */
        class KeyCodeEventControl extends SimpleEventControl implements IKeyCodeEventControl {
            /**
              * Holds the key mappings to filter for in a KeyboardEvent.
              */
            keyCodes: IObject<boolean>;
            /**
              * Checks if the IKeyboardEventInput is an expression object
              * and sets the necessary listener.
              */
            protected _setListener(): void;
            /**
              * Parses the proper method args and finds any key code filters.
              */
            protected _filterArgs(input: IKeyboardEventInput): any[];
            /**
              * Matches the event's keyCode if necessary and then handles the event if
              * a match is found or if there are no filter keyCodes.
              * @param {KeyboardEvent} ev The keyboard event object.
              */
            protected _onEvent(ev: KeyboardEvent): void;
            /**
              * Matches the event's keyCode if necessary.
              * @param {KeyboardEvent} ev The keyboard event object.
              */
            protected _compareKeys(ev: KeyboardEvent): boolean;
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
        interface IKeyCodeEventControl extends ISendEvents {
            /**
              * Holds the key mappings to filter for in a KeyboardEvent.
              */
            keyCodes: IObject<boolean>;
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
              * or a string representation as seen by the KeyCodes mapping. Used for keydown,
              * keypress, and keyup events where capitalization is disregarded.
              */
            key?: any;
            /**
              * An optional array of keys or key codes if more than one key can satisfy the condition. Used for keydown,
              * keypress, and keyup events where capitalization is disregarded.
              */
            keys?: any[];
            /**
              * The character to satisfy the press condition. Can be specified either as a numeric char code
              * or the char itself. Used for the charpress event where capitalization is regarded.
              */
            char?: any;
            /**
              * An optional array of characters or char codes if more than one char can satisfy the condition.
              * Used for the charpress event where capitalization is regarded.
              */
            chars?: any[];
        }
        /**
          * Used for filtering keys on keydown events. Does not take capitalization into account.
          */
        class KeyDown extends KeyCodeEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * Used for filtering only printing keys (a-z, A-Z, 0-9, and special characters) on keydown events.
          * Does not take capitalization into account.
          */
        class KeyPress extends KeyCodeEventControl {
            /**
              * The event name.
              */
            event: string;
            /**
              * Filters only 'printing keys' (a-z, A-Z, 0-9, and special characters).
              * @param {KeyboardEvent} ev The KeyboardEvent object.
              */
            _onEvent(ev: KeyboardEvent): void;
            /**
              * Matches the event's keyCode if necessary.
              * @param {KeyboardEvent} ev The keyboard event object.
              */
            protected _compareKeys(ev: KeyboardEvent): boolean;
        }
        /**
          * Used for filtering keys on keyup events. Does not take capitalization into account.
          */
        class KeyUp extends KeyCodeEventControl {
            /**
              * The event name.
              */
            event: string;
        }
        /**
          * Used for filtering keys on keypress events. Takes capitalization into account.
          */
        class CharPress extends KeyCodeEventControl {
            /**
              * The event name.
              */
            event: string;
            /**
              * Parses the proper method args and finds any char code filters.
              */
            protected _filterArgs(input: IKeyboardEventInput): any[];
            /**
              * Matches the event's keyCode if necessary and then handles the event if
              * a match is found or if there are no filter keyCodes.
              * @param {KeyboardEvent} ev The keyboard event object.
              */
            protected _onEvent(ev: KeyboardEvent): void;
            /**
              * Matches the event's keyCode if necessary.
              * @param {KeyboardEvent} ev The keyboard event object.
              */
            protected _compareKeys(ev: KeyboardEvent): boolean;
            /**
              * Sets the defined key codes as they correspond to
              * the KeyCodes map.
              * @param {Array<string>} keys? The array of defined keys to satisfy the
              * key press condition.
              */
            protected _setKeyCodes(keys?: string[]): void;
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
              * The function to stop listening for the delayed attribute set.
              */
            protected _stopSetter: IRemoveListener;
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
          * An AttributeControl that deals with binding to a specified property on its element.
          */
        interface ISetAttributeControl {
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
              * The property to set on the associated template control.
              */
            property: string;
            /**
              * A regular expression for separating style properties from style values in
              * individual style declarations.
              */
            protected _styleRegex: RegExp;
            /**
              * A regular expression for temporarily finding and removing url declarations in the style attribute.
              */
            protected _urlRegex: RegExp;
            /**
              * The temporary replace value of urls found in the style attribute.
              */
            protected _urlReplace: string;
            /**
              * An object storing all the added styles.
              */
            private __addedStyles;
            /**
              * An object storing all the old style values.
              */
            private __oldStyles;
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
        }
        /**
          * A type of ElementPropertyControl used to set 'src' on an anchor tag.
          */
        class Src extends ElementPropertyControl {
            protected static _inject: any;
            /**
              * Used to set the element's src property.
              */
            property: string;
            /**
              * The plat.web.Browser injectable instance
              */
            protected _browser: web.Browser;
            /**
              * The function for setting the corresponding
              * attribute property value to the evaluated expression.
              */
            setter(): void;
        }
        /**
          * Facilitates two-way data-binding for HTMLInputElements, HTMLSelectElements, and HTMLTextAreaElements.
          */
        class Bind extends AttributeControl implements observable.IImplementTwoWayBinding {
            protected static _inject: any;
            /**
              * The priority of Bind is set high to precede
              * other controls that may be listening to the same
              * event.
              */
            priority: number;
            /**
              * Reference to the Parser injectable.
              */
            protected _parser: expressions.Parser;
            /**
              * Reference to the IContextManagerStatic injectable.
              */
            protected _ContextManager: observable.IContextManagerStatic;
            /**
              * Reference to the Compat injectable.
              */
            protected _compat: Compat;
            /**
              * Reference to the Document injectable.
              */
            protected _document: Document;
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
              * The initial type of the bound property if defined.
              */
            protected _propertyType: string;
            /**
              * Whether or not Bind is being used in conjunction
              * with a TemplateControl that implements the
              * interface ISupportTwoWayBinding.
              */
            protected _supportsTwoWayBinding: boolean;
            /**
              * A regular expression used to determine if the value is in HTML5 date format YYYY-MM-DD.
              */
            protected _dateRegex: RegExp;
            /**
              * A regular expression used to determine if the value is in HTML5 datetime-local format YYYY-MM-DDTHH:MM(:ss.SSS).
              */
            protected _dateTimeLocalRegex: RegExp;
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
              * Gets the current value of the bound property.
              */
            evaluate(): any;
            /**
              * The function that allows a control implementing ISupportTwoWayBinding to observe
              * changes to the bound property and/or its child properties.
              * @param {plat.observable.IBoundPropertyChangedListener<T>} listener The listener to fire when the bound property or its
              * specified child changes.
              * @param {number | string} identifier? The path of the child property of the bound item if the bound item is an Array.
              * @param {boolean} autocast? Will cast a primitive value to whatever it was set to in code.
              */
            observeProperty<T>(listener: observable.IBoundPropertyChangedListener<T>, identifier?: string | number, autocast?: boolean): IRemoveListener;
            /**
              * A function that allows a ISupportTwoWayBinding to observe both the
              * bound property itself as well as potential child properties if being bound to an object.
              * @param {(changes: Array<plat.observable.IArrayChanges<T>>, identifier: string) => void} listener The listener function.
              * @param {string} identifier? The identifier off of the bound object to listen to for changes. If undefined or empty
              * the listener will listen for changes to the bound item itself.
              * @param {boolean} arrayMutationsOnly? Whether or not to listen only for Array mutation changes.
              */
            observeArrayChange<T>(listener: (changes: observable.IArrayChanges<T>[], identifier: string) => void, identifier?: string): IRemoveListener;
            /**
              * A function that allows a ISupportTwoWayBinding to observe both the
              * bound property itself as well as potential child properties if being bound to an object.
              * @param {(changes: Array<plat.observable.IArrayChanges<T>>, identifier: number) => void} listener The listener function.
              * @param {number} index? The index off of the bound object to listen to for changes if the bound object is an Array.
              * If undefined or empty the listener will listen for changes to the bound Array itself.
              * @param {boolean} arrayMutationsOnly? Whether or not to listen only for Array mutation changes.
              */
            observeArrayChange<T>(listener: (changes: observable.IArrayChanges<T>[], identifier: number) => void, index?: number): IRemoveListener;
            /**
              * Adds a text event as the event listener.
              * Used for textarea and input[type="text"].
              */
            protected _addTextEventListener(): void;
            /**
              * Adds a change event as the event listener.
              * Used for select, input[type="radio"], and input[type="range"].
              */
            protected _addChangeEventListener(): void;
            /**
              * Adds a $tap event as the event listener.
              * Used for input[type="button"] and button.
              */
            protected _addButtonEventListener(): void;
            /**
              * Adds a change event as the event listener.
              * Used for select, input[type="radio"], and input[type="range"].
              */
            protected _addRangeEventListener(): void;
            /**
              * Getter for input[type="checkbox"] and input[type="radio"].
              */
            protected _getChecked(): boolean;
            /**
              * Getter for input[type="text"], input[type="range"],
              * textarea, and select.
              */
            protected _getValue(): string;
            /**
              * Getter for button.
              */
            protected _getTextContent(): string;
            /**
              * Getter for input[type="date"].
              */
            protected _getDate(): any;
            /**
              * Getter for input[type="datetime-local"].
              */
            protected _getDateTimeLocal(): Date;
            /**
              * Getter for input[type="file"]. Creates a partial IFile
              * element if file is not supported.
              */
            protected _getFile(): IFile;
            /**
              * Getter for input[type="file"]-multiple.
              */
            protected _getFiles(): IFile[];
            /**
              * Getter for select-multiple.
              */
            protected _getSelectedValues(): string[];
            /**
              * Setter for textarea, input[type="text"],
              * and input[type="button"], and select.
              * @param {any} newValue The new value to set
              * @param {any} oldValue The previously bound value
              * @param {boolean} firstTime? The context is being evaluated for the first time and
              * should thus change the property if null
              */
            protected _setText(newValue: any, oldValue: any, firstTime?: boolean): void;
            /**
              * Setter for input[type="range"].
              * @param {any} newValue The new value to set
              * @param {any} oldValue The previously bound value
              * @param {boolean} firstTime? The context is being evaluated for the first time and
              * should thus change the property if null
              */
            protected _setRange(newValue: any, oldValue: any, firstTime?: boolean): void;
            /**
              * Setter for input[type="hidden"].
              * @param {any} newValue The new value to set
              * @param {any} oldValue The previously bound value
              * @param {boolean} firstTime? The context is being evaluated for the first time and
              * should thus change the property if null
              */
            protected _setHidden(newValue: any, oldValue: any, firstTime?: boolean): void;
            /**
              * Sets the value on an element.
              * @param {any} newValue The new value to set
              */
            protected _setValue(newValue: any): void;
            /**
              * Setter for input[type="checkbox"]
              * @param {any} newValue The new value to set
              * @param {any} oldValue The previously bound value
              * @param {boolean} firstTime? The context is being evaluated for the first time and
              * should thus change the property if null
              */
            protected _setChecked(newValue: any, oldValue: any, firstTime?: boolean): void;
            /**
              * Setter for input[type="radio"]
              * @param {any} newValue The new value to set
              */
            protected _setRadio(newValue: any): void;
            /**
              * Setter for input[type="date"]
              * @param {any} newValue The new value to set in the form YYYY-MM-DD
              * @param {any} oldValue The previously bound value
              * @param {boolean} firstTime? The context is being evaluated for the first time and
              * should thus change the property if null
              */
            protected _setDate(newValue: any, oldValue: any, firstTime?: boolean): void;
            /**
              * Setter for input[type="datetime-local"]
              * @param {any} newValue The new value to set in the form YYYY-MM-DD
              * @param {any} oldValue The previously bound value
              * @param {boolean} firstTime? The context is being evaluated for the first time and
              * should thus change the property if null
              */
            protected _setDateTimeLocal(newValue: any, oldValue: any, firstTime?: boolean): void;
            /**
              * Setter for select
              * @param {any} newValue The new value to set
              * @param {any} oldValue The previously bound value
              * @param {boolean} firstTime? The context is being evaluated for the first time and
              * should thus change the property if null
              */
            protected _setSelectedIndex(newValue: any, oldValue: any, firstTime?: boolean): void;
            /**
              * Setter for select-multiple
              * @param {any} newValue The new value to set
              * @param {any} oldValue The previously bound value
              * @param {boolean} firstTime? The context is being evaluated for the first time and
              * should thus change the property if null
              */
            protected _setSelectedIndices(newValue: any, oldValue: any, firstTime?: boolean): void;
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
              * Handles creating context with an identifier.
              * @param {string} identifier The identifier to base the created context off of.
              */
            protected _createContext(identifier: string): any;
            /**
              * Handles casting the bound property back to its initial type if necessary.
              * @param {any} value The value to cast.
              * @param {any} type? The optional type to cast the value to.
              */
            protected _castProperty(value: any, type?: any): any;
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
              * Checks if the associated TemplateControl is implementing
              * ISupportTwoWayBinding and initializes all listeners accordingly.
              */
            protected _observingBindableProperty(): boolean;
            /**
              * A function that allows a ISupportTwoWayBinding to observe either the
              * bound property specified by the identifier (as well as potential child properties if being bound to an object) or
              * Array mutations.
              * @param {Function} listener The listener function.
              * @param {any} identifier? The index off of the bound object to listen to for changes if the bound object is an Array.
              * If undefined or empty the listener will listen for changes to the bound Array itself.
              * @param {boolean} autocast? Will cast a primitive value to whatever it was set to in code.
              * @param {boolean} arrayMutations? Whether or not this is for Array mutation changes.
              */
            protected _observeProperty(listener: Function, identifier?: any, autocast?: boolean, arrayMutations?: boolean): IRemoveListener;
            /**
              * Gets the property type of the passed in argument.
              * @param {any} value The value to grab the property type from.
              */
            protected _getPropertyType(value: any): any;
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
        class ObservableAttributeControl extends AttributeControl {
            protected static _inject: any;
            /**
              * Reference to the IContextManagerStatic injectable.
              */
            protected _ContextManager: observable.IContextManagerStatic;
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
            protected _listeners: ((newValue: any, oldValue: any) => void)[];
            /**
              * The function to stop listening for property changes.
              */
            protected _removeListener: IRemoveListener;
            /**
              * The _addListener function bound to this control.
              */
            protected _boundAddListener: typeof ObservableAttributeControl.prototype._addListener;
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
    class App {
        /**
          * The instance of the registered IApp.
          */
        static app: App;
        /**
          * Reference to the Compat injectable.
          */
        protected static _compat: Compat;
        /**
          * Reference to the IEventManagerStatic injectable.
          */
        protected static _EventManager: events.IEventManagerStatic;
        /**
          * Reference to the Document injectable.
          */
        protected static _document: Document;
        /**
          * Reference to the Compiler injectable.
          */
        protected static _compiler: processing.Compiler;
        /**
          * Reference to the ILifecycleEventStatic injectable.
          */
        protected static _LifecycleEvent: events.ILifecycleEventStatic;
        /**
          * Reference to the Log injectable.
          */
        protected static _log: debug.Log;
        /**
          * The injector for injecting the instance of the currently registered IApp.
          */
        private static __injector;
        /**
          * A unique id, created during instantiation.
          */
        uid: string;
        /**
          * A Navigator instance, exists when a router is injected into the app.
          */
        navigator: routing.Navigator;
        /**
          * Reference to the Log injectable.
          */
        protected _log: debug.Log;
        /**
          * A static method for initiating the app startup.
          */
        static start(): void;
        /**
          * A static method called upon app registration. Primarily used
          * to initiate a ready state in the case that amd is being used.
          * @param {plat.dependency.Injector<plat.App>} appInjector The injector for
          * injecting the app instance.
          */
        static registerApp(appInjector: dependency.Injector<App>): void;
        /**
          * Kicks off compilation of the DOM from the specified node. If no node is specified,
          * the default start node is document.body.
          * @param {Node} node The node at which DOM compilation begins.
          */
        static load(node?: Node): void;
        /**
          * A static method called when the application is ready. It calls the app instance's
          * ready function as well as checks for the presence of a module loader. If one exists,
          * loading the DOM falls back to the app developer. If it doesn't, the DOM is loaded from
          * document.body.
          * @param {plat.events.LifecycleEvent} ev The LifecycleEvent for the app ready.
          */
        private static __ready(ev);
        /**
          * A static method called when the application wants to programmatically shutdown.
          */
        private static __shutdown();
        /**
          * A static method called to register all the LifecycleEvents for an app instance.
          */
        private static __registerAppEvents(ev);
        /**
          * We need to add [plat-hide] as a css property if platypus.css doesn't exist so we can use it to temporarily
          * hide elements.
          */
        private static __addPlatCss();
        /**
          * Class for every app. This class contains hooks for Application Lifecycle Management (ALM)
          * as well as error handling and navigation events.
          */
        constructor();
        /**
          * Event fired when the app is suspended.
          * @param {plat.events.LifecycleEvent} ev The LifecycleEvent object.
          */
        suspend(ev: events.LifecycleEvent): void;
        /**
          * Event fired when the app resumes from the suspended state.
          * @param {plat.events.LifecycleEvent} ev The LifecycleEvent object.
          */
        resume(ev: events.LifecycleEvent): void;
        /**
          * Event fired when an internal error occurs.
          * @param {plat.events.ErrorEvent<Error>} ev The ErrorEvent object.
          */
        error(ev: events.ErrorEvent<Error>): void;
        /**
          * Event fired when the app is ready.
          * @param {plat.events.LifecycleEvent} ev The LifecycleEvent object.
          */
        ready(ev: events.LifecycleEvent): void;
        /**
          * Event fired when the app has been programmatically shutdown. This event is cancelable.
          * @param {plat.events.LifecycleEvent} ev The LifecycleEvent object.
          */
        exiting(ev: events.LifecycleEvent): void;
        /**
          * Event fired when the app regains connectivity and is now in an online state.
          * @param {plat.events.LifecycleEvent} ev The LifecycleEvent object.
          */
        online(ev: events.LifecycleEvent): void;
        /**
          * Event fired when the app loses connectivity and is now in an offline state.
          * @param {plat.events.LifecycleEvent} ev The LifecycleEvent object.
          */
        offline(ev: events.LifecycleEvent): void;
        /**
          * Creates a new DispatchEvent and propagates it to all
          * listeners based on the DIRECT method. Propagation
          * will always start with the sender, so the sender can both produce and consume the same event.
          * @param {string} name The name of the event to send, coincides with the name used in the
          * app.on() method.
          * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
          */
        dispatchEvent(name: string, ...args: any[]): void;
        /**
          * Registers a listener for a DispatchEvent. The listener will be called when
          * a DispatchEvent is propagating over the app. Any number of listeners can exist for a single event name.
          * @param {string} name The name of the event, coinciding with the DispatchEvent name.
          * @param {(ev: plat.events.DispatchEvent, ...args: Array<any>) => void} listener The method called when
          * the DispatchEvent is fired.
          */
        on(name: string, listener: (ev: events.DispatchEvent, ...args: any[]) => void): IRemoveListener;
        /**
          * Kicks off compilation of the DOM from the specified node. If no node is specified,
          * the default start node is document.body. This method should be called from the app when
          * using module loaders. If a module loader is in use, the app will delay loading until
          * this method is called.
          * @param {Node} node The node where at which DOM compilation begins.
          */
        load(node?: Node): void;
        /**
          * Calls to exit the application. Makes the necessary calls to the device is possible.
          */
        exit(): void;
    }
    /**
      */
    function IAppStatic(_compat?: Compat, _EventManager?: events.IEventManagerStatic, _document?: Document, _compiler?: processing.Compiler, _LifecycleEvent?: events.ILifecycleEventStatic, _log?: debug.Log): IAppStatic;
    /**
      */
    function IApp(_AppStatic?: IAppStatic): App;
    /**
      * The external interface for the '_AppStatic' injectable.
      */
    interface IAppStatic {
        /**
          * The instance of the registered IApp.
          */
        app: App;
        /**
          * A static method for initiating the app startup.
          */
        start(): void;
        /**
          * A static methods called upon app registration. Primarily used
          * to initiate a ready state in the case that amd is being used.
          * @param {plat.dependency.Injector<plat.App>} appInjector The injector for
          * injecting the app instance.
          */
        registerApp(appInjector: dependency.Injector<App>): void;
        /**
          * Kicks off compilation of the DOM from the specified node. If no node is specified,
          * the default start node is document.body.
          * @param node The node at which DOM compilation begins.
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
    type IRemoveListener = () => void;
    /**
      * Defines a function that will be called whenever a property has changed.
      */
    type IPropertyChangedListener<T> = (newValue: T, oldValue: T) => void;
    /**
      * Defines a function that will be called whenever a property specified by a given identifier has changed.
      */
    type IIdentifierChangedListener<T> = (newValue: T, oldValue: T, identifier: any) => void;
}

declare module 'platypus' {
    export = plat;
}
