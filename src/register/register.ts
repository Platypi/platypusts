let controlInjectors: plat.dependency.InjectorObject<plat.Control> = {};
let viewControlInjectors: plat.dependency.InjectorObject<plat.ui.ViewControl> = {};
let instanceInjectorDependencies: plat.IObject<plat.IObject<string>> = {};
let injectableInjectors: plat.dependency.InjectorObject<any> = {};
let unregisteredInjectors: plat.dependency.InjectorObject<any> = {};
let staticInjectors: plat.dependency.InjectorObject<any> = {};
let animationInjectors: plat.dependency.InjectorObject<plat.ui.animations.BaseAnimation> = {};
let jsAnimationInjectors: plat.dependency.InjectorObject<plat.ui.animations.BaseAnimation> = {};

/**
 * @name register
 * @memberof plat
 * @kind namespace
 * @access public
 *
 * @description
 * Holds all the classes and interfaces related to registering components for platypus.
 */
module plat.register {
    'use strict';

    /**
     * @name add
     * @memberof plat.register
     * @kind function
     * @access private
     * @exported false
     *
     * @description
     * Generic function for creating an {@link plat.dependency.Injector|Injector} and
     * adding it to an {@link plat.dependency.InjectorObject|InjectorObject}.
     *
     * @param {plat.dependency.InjectorObject<any>} obj The {@link plat.dependency.InjectorObject|InjectorObject}
     * to which to add an {@link plat.dependency.Injector|Injector}.
     * @param {string} name The name used to set/get the {@link plat.dependency.Injector|Injector} from the
     * {@link plat.dependency.InjectorObject|InjectorObject}.
     * @param {any} Type The constructor or function definition for the {@link plat.dependency.Injector|Injector}.
     * @param {Array<any>} dependencies? An array of strings representing the dependencies needed for the
     * {@link plat.dependency.Injector|Injector}.
     * @param {string} injectableType? The injectable type.
     * @param {boolean} isStatic The injectable type is a static type.
     *
     * @returns {plat.register} The object that contains the register methods (for method chaining).
     */
    function add(obj: dependency.InjectorObject<any>, name: string, Type: any, dependencies?: any[],
        injectableType?: string, isStatic?: boolean): typeof register {
        const injector = obj[name] = new dependency.Injector<any>(name, Type, dependencies, injectableType);

        if (isStatic === true) {
            staticInjectors[name] = injector;
        }

        return register;
    }

    /**
     * @name app
     * @memberof plat.register
     * @kind function
     * @access public
     *
     * @description
     * Registers the {@link plat.App|IApp} with the framework. The framework will instantiate the {@link plat.App|IApp}
     * when needed, and wire up the Application Lifecycle events. The dependencies array corresponds to injectables that will be
     * passed into the Constructor of the app.
     *
     * @param {string} name The name of your app.
     * @param {new (...args: any[]) => plat.App} Type The constructor for the {@link plat.App|IApp}.
     * @param {Array<any>} dependencies? An array of strings representing the dependencies needed for the app injector.
     *
     * @returns {plat.register} The object that contains the register methods (for method chaining).
     */
    export const app: IRegisterFunction<App> = (name: string, Type: new (...args: any[]) => App, dependencies?: any[]): typeof register => {
        const _Injector: typeof dependency.Injector = acquire(__InjectorStatic);
        const _AppStatic: IAppStatic = acquire(__AppStatic);

        _AppStatic.registerApp(new _Injector<App>(name, Type, dependencies));

        return register;
    };

    /**
     * @name control
     * @memberof plat.register
     * @kind function
     * @access public
     *
     * @description
     * Registers an {@link plat.Control|Control} with the framework. The framework will instantiate the
     * {@link plat.Control|Control} when needed. The dependencies array corresponds to injectables that
     * will be passed into the Constructor of the control.
     *
     * @param {string} name The control type, corresponding to the HTML notation for creating a new Control (e.g. 'plat-foreach').
     * @param {new (...args: any[]) => plat.Control} Type The constructor for the {@link plat.Control|Control}.
     * @param {Array<any>} dependencies? An array of strings representing the dependencies needed for the {@link plat.Control|Control}
     * injector.
     *
     * @example plat.register.control('my-tap', MyTap, [plat.expressions.Parser]);
     *
     * @returns {plat.register} The object that contains the register methods (for method chaining).
     */
    export const control: IExtendedRegisterFunction<Control, boolean> =
        (name: string, Type: new (...args: any[]) => Control, dependencies?: any[], isStatic?: boolean): typeof register => {
        if (isString(name)) {
            name = name.toLowerCase();
        } else {
            throw new Error('A Control must be registered with a string name');
        }

        if (name === 'head') {
            isStatic = true;
        }

        return add(controlInjectors, name, Type, dependencies, isStatic ? __STATIC : undefined);
    };

    /**
     * @name viewControl
     * @memberof plat.register
     * @kind function
     * @access public
     *
     * @description
     * Registers an {@link plat.ui.ViewControl|ViewControl} with the framework. The framework will
     * instantiate the control when needed. The dependencies array corresponds to injectables that will be
     * passed into the Constructor of the control.
     *
     * @param {string} name The control type, corresponding to the HTML notation for creating a new
     * {@link plat.ui.ViewControl|ViewControl}. Used for navigation to the specified {@link plat.ui.ViewControl|ViewControl}.
     * @param {new (...args: any[]) => plat.ui.ViewControl} Type The constructor for the {@link plat.ui.ViewControl|ViewControl}.
     * @param {Array<any>} dependencies? An optional array of strings representing the dependencies needed for the
     * {@link plat.ui.ViewControl|ViewControl} injector.
     *
     * @example plat.register.viewControl('my-view-control', MyViewControl);
     *
     * @returns {plat.register} The object that contains the register methods (for method chaining).
     */
    export const viewControl: IRegisterFunction<ui.ViewControl> = (name: string, Type: any,
        dependencies?: any[]): typeof register => {
        if (isString(name)) {
            name = name.toLowerCase();
        } else {
            throw new Error('A ViewControl must be registered with a string name');
        }

        return add(viewControlInjectors, name, Type, dependencies);
    };

    /**
     * @name injectable
     * @memberof plat.register
     * @kind function
     * @access public
     *
     * @description
     * Registers an injectable with the framework. Injectables are objects that can be used for dependency injection into other objects.
     * The dependencies array corresponds to injectables that will be passed into the Constructor of the injectable.
     *
     * @param {string} name The name of the injector, used when another component is specifying dependencies.
     * @param {(...args: any[]) => any} method A method that returns the injectable.
     * @param {Array<any>} dependencies? An array of strings representing the dependencies needed for the injectable's injector.
     * @param {string} injectableType? Specifies the type of injectable, either {@link plat.register.injectable.SINGLETON|SINGLETON},
     * {@link plat.register.injectable.STATIC|STATIC}, {@link plat.register.injectable.INSTANCE|INSTANCE},
     * {@link plat.register.injectable.FACTORY|FACTORY}, {@link plat.register.injectable.CLASS|CLASS}
     * (defaults to {@link plat.register.injectable.SINGLETON|SINGLETON}).
     *
     * @example
     * plat.register.injectable('_CacheFactory', [plat.expressions.Parser],
     *     function(parser: plat.expressions.Parser) { return { ... }; });
     * plat.register.injectable('database', function() { return new Database(); }, null, register.injectable.INSTANCE);
     *
     * @returns {plat.register} The object that contains the register methods (for method chaining).
     */
    export const injectable: IInjectableType & IExtendedRegisterFunction<any, string> = (name: string,
        Type: (new (...args: any[]) => any) | ((...args: any[]) => any),
        dependencies?: any[], injectableType?: string): typeof register => {
        if (!isString(injectableType)) {
            injectableType = __SINGLETON;
        } else {
            injectableType = injectableType.toLowerCase();
            if (injectableType === __FACTORY || injectableType === __STATIC || injectableType === __CLASS) {
                return add(injectableInjectors, name, Type, dependencies, injectableType, true);
            } else if (!(injectableType === __SINGLETON || injectableType === __INSTANCE)) {
                throw new Error(`Invalid injectable type ${injectableType} during injectable registration.`);
            }
        }

        return add(injectableInjectors, name, Type, dependencies, injectableType, false);
    };

    /**
     * @name STATIC
     * @memberof plat.register.injectable
     * @kind property
     * @access public
     * @static
     *
     * @type {string}
     *
     * @description
     * Static injectables will be injected before the application loads. This provides a way to create
     * a static constructor and load dependencies into static class properties.
     */
    injectable.STATIC = __STATIC;

    /**
     * @name SINGLETON
     * @memberof plat.register.injectable
     * @kind property
     * @access public
     * @static
     *
     * @type {string}
     *
     * @description
     * Singleton injectables will contain a constructor. A Singleton injectable will be instantiated once and
     * used throughout the application lifetime. It will be instantiated when another component is injected
     * and lists it as a dependency.
     */
    injectable.SINGLETON = __SINGLETON;

    /**
     * @name INSTANCE
     * @memberof plat.register.injectable
     * @kind property
     * @access public
     * @static
     *
     * @type {string}
     *
     * @description
     * Instance injectables will contain a constructor. An Instance injectable will be instantiated multiple times
     * throughout the application lifetime. It will be instantiated whenever another component is injected
     * and lists it as a dependency.
     */
    injectable.INSTANCE = __INSTANCE;

    /**
     * @name FACTORY
     * @memberof plat.register.injectable
     * @kind property
     * @access public
     * @static
     *
     * @type {string}
     *
     * @description
     * Factory injectables will not contain a constructor but will instead contain a method for obtaining an
     * instance, such as getInstance() or create(). It will be injected before the application loads, similar to a Static
     * injectable.
     */
    injectable.FACTORY = __FACTORY;

    /**
     * @name CLASS
     * @memberof plat.register.injectable
     * @kind property
     * @access public
     * @static
     *
     * @type {string}
     *
     * @description
     * Class injectables are essentially a direct reference to a class's constructor. It may contain both
     * static and instance methods as well as a constructor for creating a new instance.
     */
    injectable.CLASS = __CLASS;

    export interface IInjectableType {
        STATIC?: string;
        SINGLETON?: string;
        INSTANCE?: string;
        FACTORY?: string;
        CLASS?: string;
    }

    /**
     * @name animation
     * @memberof plat.register
     * @kind function
     * @access public
     *
     * @description
     * Adds a JS animation denoted by its name. If  Intended to be used when JS animation implementations for legacy browsers
     * is desired.
     *
     * @param {string} name The unique identifer of the animation.
     * @param {new (...args: any[]) => plat.ui.animations.BaseAnimation} Type The constructor for the custom animation.
     * @param {Array<any>} dependencies? Any dependencies that need to be injected into the animation at
     * instantiation.
     * @param {string} animationType The type of animation. Both the intended type and default value are
     * {@link plat.register.animation.JS|JS}.
     *
     * @returns {plat.register} The object that contains the register methods (for method chaining).
     */
    export const animation: IAnimationType & IExtendedRegisterFunction<ui.animations.BaseAnimation | ui.animations.CssAnimation, string> =
        (name: string, Type: new (...args: any[]) => ui.animations.BaseAnimation | ui.animations.CssAnimation,
        dependencies?: any[], animationType?: 'css' | 'js' | string): typeof register => {
        if (isString(animationType)) {
            animationType = animationType.toLowerCase();
            if (!(animationType === __CSS || animationType === __JS)) {
                throw new Error(`Invalid animationType "${animationType}" during animation registration.`);
            }
        }

        return add((animationType === __JS ? jsAnimationInjectors : animationInjectors),
            name, Type, dependencies, injectable.INSTANCE);
    };

    /**
     * @name CSS
     * @memberof plat.register.animation
     * @kind property
     * @access public
     * @static
     *
     * @type {string}
     *
     * @description
     * A CSS animation.
     */
    animation.CSS = __CSS;

    /**
     * @name JS
     * @memberof plat.register.animation
     * @kind property
     * @access public
     * @static
     *
     * @type {string}
     *
     * @description
     * A JavaScript animation.
     */
    animation.JS = __JS;

    export interface IAnimationType {
        CSS?: string;
        JS?: string;
    }

    export interface IRegisterFunction<RegisterType> {
        <T extends RegisterType, D1, D2, D3, D4, D5, D6, D7, D8, D9, D10>(
            name: string, Type:
                ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8, d9: D9, d10: D10) => T) |
                (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8, d9: D9, d10: D10) => T),
            dependencies: [
                ((...args: any[]) => D1) | (new (...args: any[]) => D1) | string,
                ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string,
                ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string,
                ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string,
                ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string,
                ((...args: any[]) => D6) | (new (...args: any[]) => D6) | string,
                ((...args: any[]) => D7) | (new (...args: any[]) => D7) | string,
                ((...args: any[]) => D8) | (new (...args: any[]) => D8) | string,
                ((...args: any[]) => D9) | (new (...args: any[]) => D9) | string,
                ((...args: any[]) => D10) | (new (...args: any[]) => D10) | string
            ]
        ): typeof register;
        <T extends RegisterType, D1, D2, D3, D4, D5, D6, D7, D8, D9>(
            name: string, Type:
                ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8, d9: D9) => T) |
                (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8, d9: D9) => T),
            dependencies: [
                ((...args: any[]) => D1) | (new (...args: any[]) => D1) | string,
                ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string,
                ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string,
                ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string,
                ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string,
                ((...args: any[]) => D6) | (new (...args: any[]) => D6) | string,
                ((...args: any[]) => D7) | (new (...args: any[]) => D7) | string,
                ((...args: any[]) => D8) | (new (...args: any[]) => D8) | string,
                ((...args: any[]) => D9) | (new (...args: any[]) => D9) | string
            ]
        ): typeof register;
        <T extends RegisterType, D1, D2, D3, D4, D5, D6, D7, D8>(
            name: string, Type:
                ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8) => T) |
                (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8) => T),
            dependencies: [
                ((...args: any[]) => D1) | (new (...args: any[]) => D1) | string,
                ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string,
                ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string,
                ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string,
                ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string,
                ((...args: any[]) => D6) | (new (...args: any[]) => D6) | string,
                ((...args: any[]) => D7) | (new (...args: any[]) => D7) | string,
                ((...args: any[]) => D8) | (new (...args: any[]) => D8) | string
            ]
        ): typeof register;
        <T extends RegisterType, D1, D2, D3, D4, D5, D6, D7>(
            name: string, Type:
                ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7) => T) |
                (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7) => T),
            dependencies: [
                ((...args: any[]) => D1) | (new (...args: any[]) => D1) | string,
                ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string,
                ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string,
                ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string,
                ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string,
                ((...args: any[]) => D6) | (new (...args: any[]) => D6) | string,
                ((...args: any[]) => D7) | (new (...args: any[]) => D7) | string
            ]
        ): typeof register;
        <T extends RegisterType, D1, D2, D3, D4, D5, D6>(
            name: string, Type:
                ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6) => T) |
                (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6) => T),
            dependencies: [
                ((...args: any[]) => D1) | (new (...args: any[]) => D1) | string,
                ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string,
                ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string,
                ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string,
                ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string,
                ((...args: any[]) => D6) | (new (...args: any[]) => D6) | string
            ]
        ): typeof register;
        <T extends RegisterType, D1, D2, D3, D4, D5>(
            name: string, Type:
                ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5) => T) |
                (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5) => T),
            dependencies: [
                ((...args: any[]) => D1) | (new (...args: any[]) => D1) | string,
                ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string,
                ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string,
                ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string,
                ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string
            ]
        ): typeof register;
        <T extends RegisterType, D1, D2, D3, D4>(
            name: string, Type:
                ((d1: D1, d2: D2, d3: D3, d4: D4) => T) |
                (new (d1: D1, d2: D2, d3: D3, d4: D4) => T),
            dependencies: [
                ((...args: any[]) => D1) | (new (...args: any[]) => D1) | string,
                ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string,
                ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string,
                ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string
            ]
        ): typeof register;
        <T extends RegisterType, D1, D2, D3>(
            name: string, Type:
                ((d1: D1, d2: D2, d3: D3) => T) | (new (d1: D1, d2: D2, d3: D3) => T),
            dependencies: [
                ((...args: any[]) => D1) | (new (...args: any[]) => D1) | string,
                ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string,
                ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string
            ]
        ): typeof register;
        <T extends RegisterType, D1, D2>(
            name: string, Type:
                ((d1: D1, d2: D2) => T) | (new (d1: D1, d2: D2) => T),
            dependencies: [
                ((...args: any[]) => D1) | (new (...args: any[]) => D1) | string,
                ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string
            ]
        ): typeof register;
        <T extends RegisterType, D1>(
            name: string, Type:
            ((d1: D1) => T) | (new (d1: D1) => T),
            dependencies: [
                ((...args: any[]) => D1) | (new (...args: any[]) => D1) | string
            ]
        ): typeof register;
        <T extends RegisterType>(name: string, Type: (() => T) | (new () => T)): typeof register;
    }

    export interface IExtendedRegisterFunction<RegisterType, XT> {
        <T extends RegisterType, D1, D2, D3, D4, D5, D6, D7, D8, D9, D10>(
            name: string, Type:
                ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8, d9: D9, d10: D10) => T) |
                (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8, d9: D9, d10: D10) => T),
            dependencies: [
                ((...args: any[]) => D1) | (new (...args: any[]) => D1) | string,
                ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string,
                ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string,
                ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string,
                ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string,
                ((...args: any[]) => D6) | (new (...args: any[]) => D6) | string,
                ((...args: any[]) => D7) | (new (...args: any[]) => D7) | string,
                ((...args: any[]) => D8) | (new (...args: any[]) => D8) | string,
                ((...args: any[]) => D9) | (new (...args: any[]) => D9) | string,
                ((...args: any[]) => D10) | (new (...args: any[]) => D10) | string
            ],
            type?: XT
        ): typeof register;
        <T extends RegisterType, D1, D2, D3, D4, D5, D6, D7, D8, D9>(
            name: string, Type:
                ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8, d9: D9) => T) |
                (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8, d9: D9) => T),
            dependencies: [
                ((...args: any[]) => D1) | (new (...args: any[]) => D1) | string,
                ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string,
                ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string,
                ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string,
                ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string,
                ((...args: any[]) => D6) | (new (...args: any[]) => D6) | string,
                ((...args: any[]) => D7) | (new (...args: any[]) => D7) | string,
                ((...args: any[]) => D8) | (new (...args: any[]) => D8) | string,
                ((...args: any[]) => D9) | (new (...args: any[]) => D9) | string
            ],
            type?: XT
        ): typeof register;
        <T extends RegisterType, D1, D2, D3, D4, D5, D6, D7, D8>(
            name: string, Type:
                ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8) => T) |
                (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7, d8: D8) => T),
            dependencies: [
                ((...args: any[]) => D1) | (new (...args: any[]) => D1) | string,
                ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string,
                ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string,
                ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string,
                ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string,
                ((...args: any[]) => D6) | (new (...args: any[]) => D6) | string,
                ((...args: any[]) => D7) | (new (...args: any[]) => D7) | string,
                ((...args: any[]) => D8) | (new (...args: any[]) => D8) | string
            ],
            type?: XT
        ): typeof register;
        <T extends RegisterType, D1, D2, D3, D4, D5, D6, D7>(
            name: string, Type:
                ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7) => T) |
                (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6, d7: D7) => T),
            dependencies: [
                ((...args: any[]) => D1) | (new (...args: any[]) => D1) | string,
                ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string,
                ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string,
                ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string,
                ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string,
                ((...args: any[]) => D6) | (new (...args: any[]) => D6) | string,
                ((...args: any[]) => D7) | (new (...args: any[]) => D7) | string
            ],
            type?: XT
        ): typeof register;
        <T extends RegisterType, D1, D2, D3, D4, D5, D6>(
            name: string, Type:
                ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6) => T) |
                (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6) => T),
            dependencies: [
                ((...args: any[]) => D1) | (new (...args: any[]) => D1) | string,
                ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string,
                ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string,
                ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string,
                ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string,
                ((...args: any[]) => D6) | (new (...args: any[]) => D6) | string
            ],
            type?: XT
        ): typeof register;
        <T extends RegisterType, D1, D2, D3, D4, D5>(
            name: string, Type:
                ((d1: D1, d2: D2, d3: D3, d4: D4, d5: D5) => T) |
                (new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5) => T),
            dependencies: [
                ((...args: any[]) => D1) | (new (...args: any[]) => D1) | string,
                ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string,
                ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string,
                ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string,
                ((...args: any[]) => D5) | (new (...args: any[]) => D5) | string
            ],
            type?: XT
        ): typeof register;
        <T extends RegisterType, D1, D2, D3, D4>(
            name: string, Type:
                ((d1: D1, d2: D2, d3: D3, d4: D4) => T) |
                (new (d1: D1, d2: D2, d3: D3, d4: D4) => T),
            dependencies: [
                ((...args: any[]) => D1) | (new (...args: any[]) => D1) | string,
                ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string,
                ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string,
                ((...args: any[]) => D4) | (new (...args: any[]) => D4) | string
            ],
            type?: XT
        ): typeof register;
        <T extends RegisterType, D1, D2, D3>(
            name: string, Type:
                ((d1: D1, d2: D2, d3: D3) => T) | (new (d1: D1, d2: D2, d3: D3) => T),
            dependencies: [
                ((...args: any[]) => D1) | (new (...args: any[]) => D1) | string,
                ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string,
                ((...args: any[]) => D3) | (new (...args: any[]) => D3) | string
            ],
            type?: XT
        ): typeof register;
        <T extends RegisterType, D1, D2>(
            name: string, Type:
                ((d1: D1, d2: D2) => T) | (new (d1: D1, d2: D2) => T),
            dependencies: [
                ((...args: any[]) => D1) | (new (...args: any[]) => D1) | string,
                ((...args: any[]) => D2) | (new (...args: any[]) => D2) | string
            ],
            type?: XT
        ): typeof register;
        <T extends RegisterType, D1>(
            name: string, Type:
            ((d1: D1) => T) | (new (d1: D1) => T),
            dependencies: [
                ((...args: any[]) => D1) | (new (...args: any[]) => D1) | string
            ],
            type?: XT
        ): typeof register;
        <T extends RegisterType>(name: string, Type: (() => T) | (new () => T)): typeof register;
    }
}
