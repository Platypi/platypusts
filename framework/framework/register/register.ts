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
     * adding it to an {@link plat.dependency.IInjectorObject|IInjectorObject}.
     * 
     * @param {plat.dependency.IInjectorObject<any>} obj The {@link plat.dependency.IInjectorObject|IInjectorObject} 
     * to which to add an {@link plat.dependency.Injector|Injector}.
     * @param {string} name The name used to set/get the {@link plat.dependency.Injector|Injector} from the 
     * {@link plat.dependency.IInjectorObject|IInjectorObject}.
     * @param {any} Type The constructor or function definition for the {@link plat.dependency.Injector|Injector}.
     * @param {Array<any>} dependencies? An array of strings representing the dependencies needed for the
     * {@link plat.dependency.Injector|Injector}.
     * @param {string} injectableType? The injectable type.
     * @param {boolean} isStatic The injectable type is a static type.
     * 
     * @returns {plat.register} The object that contains the register methods (for method chaining).
     */
    function add(obj: dependency.IInjectorObject<any>, name: string, Type: any, dependencies?: Array<any>,
        injectableType?: string, isStatic?: boolean): typeof register {
        var injector = obj[name] = new dependency.Injector<any>(name, Type, dependencies, injectableType);

        if (isStatic === true) {
            staticInjectors[name] = injector;
        }

        if (!isNull(Type)) {
            Type.__injectorToken = name;
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
     * Registers the {@link plat.IApp|IApp} with the framework. The framework will instantiate the {@link plat.IApp|IApp} 
     * when needed, and wire up the Application Lifecycle events. The dependencies array corresponds to injectables that will be 
     * passed into the Constructor of the app.
     * 
     * @param {string} name The name of your app.
     * @param {new (...args: any[]) => plat.IApp} Type The constructor for the {@link plat.IApp|IApp}.
     * @param {Array<any>} dependencies? An array of strings representing the dependencies needed for the app injector.
     * 
     * @returns {plat.register} The object that contains the register methods (for method chaining).
     */
    export function app(name: string, Type: new (...args: any[]) => IApp, dependencies?: Array<any>): typeof register {
        var app = new dependency.Injector<IApp>(name, Type, dependencies),
            $appStatic: IAppStatic = acquire(__AppStatic);

        $appStatic.registerApp(app);
        return register;
    }

    /**
     * @name control
     * @memberof plat.register
     * @kind function
     * @access public
     * 
     * @description
     * Registers an {@link plat.IControl|IControl} with the framework. The framework will instantiate the 
     * {@link plat.IControl|IControl} when needed. The dependencies array corresponds to injectables that 
     * will be passed into the Constructor of the control.
     * 
     * @param {string} name The control type, corresponding to the HTML notation for creating a new IControl (e.g. 'plat-foreach').
     * @param {new (...args: any[]) => plat.IControl} Type The constructor for the {@link plat.IControl|IControl}.
     * @param {Array<any>} dependencies? An array of strings representing the dependencies needed for the {@link plat.IControl|IControl} 
     * injector.
     * 
     * @example plat.register.control('my-tap', MyTap, [plat.expressions.IParser]);
     * 
     * @returns {plat.register} The object that contains the register methods (for method chaining).
     */
    export function control(name: string, Type: new (...args: any[]) => IControl, dependencies?: Array<any>, isStatic?: boolean): typeof register {
        if (isString(name)) {
            name = name.toLowerCase();
        } else {
            throw new Error('A Control must be registered with a string name');
        }

        return add(controlInjectors, name, Type, dependencies, isStatic ? __STATIC : undefined);
    }

    /**
     * @name viewControl
     * @memberof plat.register
     * @kind function
     * @access public
     * 
     * @description
     * Registers an {@link plat.ui.IViewControl|IViewControl} with the framework. The framework will 
     * instantiate the control when needed. The dependencies array corresponds to injectables that will be 
     * passed into the Constructor of the control.
     * 
     * @param {string} name The control type, corresponding to the HTML notation for creating a new 
     * {@link plat.ui.IViewControl|IViewControl}. Used for navigation to the specified {@link plat.ui.IViewControl|IViewControl}.
     * @param {new (...args: any[]) => plat.ui.IViewControl} Type The constructor for the {@link plat.ui.IViewControl|IViewControl}.
     * @param {Array<any>} dependencies? An optional array of strings representing the dependencies needed for the 
     * {@link plat.ui.IViewControl|IViewControl} injector.
     * 
     * @example plat.register.viewControl('my-view-control', MyViewControl);
     * 
     * @returns {plat.register} The object that contains the register methods (for method chaining).
     */
    export function viewControl<T extends ui.ViewControl>(name: string, Type: new (...args: any[]) => T,
        dependencies?: Array<any>): typeof register {
        if (isString(name)) {
            name = name.toLowerCase();
        } else {
            throw new Error('A ViewControl must be registered with a string name');
        }

        return add(viewControlInjectors, name, Type, dependencies);
    }

    /**
     * @name injectable
     * @memberof plat.register
     * @kind function
     * @access public
     * @variation 0
     * 
     * @description
     * Registers an injectable with the framework. Injectables are objects that can be used for dependency injection into other objects.
     * The dependencies array corresponds to injectables that will be passed into the Constructor of the injectable.
     * 
     * @param {string} name The name of the injector, used when another component is specifying dependencies.
     * @param {new (...args: any[]) => any} Type The constructor for the injectable. The injectable will only be 
     * instantiated once during the application lifetime.
     * @param {Array<any>} dependencies? An array of strings representing the dependencies needed for the injectable's injector.
     * @param {string} injectableType? Specifies the type of injectable, either {@link plat.register.injectable.SINGLETON|SINGLETON}, 
     * {@link plat.register.injectable.STATIC|STATIC}, {@link plat.register.injectable.INSTANCE|INSTANCE}, 
     * {@link plat.register.injectable.FACTORY|FACTORY}, {@link plat.register.injectable.CLASS|CLASS} 
     * (defaults to {@link plat.register.injectable.SINGLETON|SINGLETON}).
     * 
     * @example
     * plat.register.injectable('$CacheFactory', [plat.expressions.IParser], Cache);
     * plat.register.injectable('database', MyDatabase, null, plat.register.injectable.INSTANCE);
     * 
     * @returns {plat.register} The object that contains the register methods (for method chaining).
     */
    export function injectable(name: string, Type: new (...args: any[]) => any,
        dependencies?: Array<any>, injectableType?: string): typeof register;
    /**
     * @name injectable
     * @memberof plat.register
     * @kind function
     * @access public
     * @variation 1
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
     * plat.register.injectable('$CacheFactory', [plat.expressions.IParser], 
     *     function(parser: plat.expressions.IParser) { return { ... }; });
     * plat.register.injectable('database', function() { return new Database(); }, null, register.injectable.INSTANCE);
     * 
     * @returns {plat.register} The object that contains the register methods (for method chaining).
     */
    export function injectable(name: string, method: (...args: any[]) => any,
        dependencies?: Array<any>, injectableType?: string): typeof register;
    export function injectable(name: string, Type: any, dependencies?: Array<any>, injectableType?: string): typeof register {
        if (!isString(injectableType)) {
            injectableType = __SINGLETON;
        } else {
            injectableType = injectableType.toLowerCase();
            if (injectableType === __FACTORY || injectableType === __STATIC || injectableType === __CLASS) {
                return add(injectableInjectors, name, Type, dependencies, injectableType, true);
            } else if (!(injectableType === __SINGLETON || injectableType === __INSTANCE)) {
                throw new Error('Invalid injectable type ' + injectableType + ' during injectable registration.');
            }
        }

        return add(injectableInjectors, name, Type, dependencies, injectableType, false);
    }

    /**
     * @name injectable
     * @memberof plat.register
     * @kind namespace
     * @access public
     * 
     * @description
     * Contains constants for injectable type.
     */
    export module injectable {
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
        export var STATIC = __STATIC;

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
        export var SINGLETON = __SINGLETON;

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
        export var INSTANCE = __INSTANCE;

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
        export var FACTORY = __FACTORY;

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
        export var CLASS = __CLASS;
    }

    /**
     * @name animation
     * @memberof plat.register
     * @kind function
     * @access public
     * @variation 0
     * 
     * @description
     * Adds a CSS animation denoted by its name. If you wish to also support legacy browsers, make sure to register a 
     * JS implementation as well.
     * 
     * @param {string} name The unique idenitifer of the animation.
     * @param {new (...args: any[]) => plat.ui.animations.ICssAnimation} Type The constructor for the custom animation.
     * @param {Array<any>} dependencies? Any dependencies that need to be injected into the animation at 
     * instantiation.
     * @param {string} animationType The type of animation. Both the intended type and default value are 
     * {@link plat.register.animation.CSS|CSS}.
     * 
     * @returns {plat.register} The object that contains the register methods (for method chaining).
     */
    export function animation(name: string, Type: new (...args: any[]) => ui.animations.ICssAnimation,
        dependencies?: Array<any>, animationType?: 'css'): typeof register;
    export function animation(name: string, Type: new (...args: any[]) => ui.animations.ICssAnimation,
        dependencies?: Array<any>, animationType?: string): typeof register;
    /**
     * @name animation
     * @memberof plat.register
     * @kind function
     * @access public
     * @variation 1
     * 
     * @description
     * Adds a JS animation denoted by its name. If  Intended to be used when JS animation implementations for legacy browsers 
     * is desired.
     * 
     * @param {string} name The unique idenitifer of the animation.
     * @param {new (...args: any[]) => plat.ui.animations.IJsAnimation} Type The constructor for the custom animation.
     * @param {Array<any>} dependencies? Any dependencies that need to be injected into the animation at 
     * instantiation.
     * @param {string} animationType The type of animation. Both the intended type and default value are 
     * {@link plat.register.animation.JS|JS}.
     * 
     * @returns {plat.register} The object that contains the register methods (for method chaining).
     */
    export function animation(name: string, Type: new (...args: any[]) => ui.animations.IJsAnimation,
        dependencies: Array<any>, animationType: 'js'): typeof register;
    export function animation(name: string, Type: new (...args: any[]) => ui.animations.IJsAnimation,
        dependencies: Array<any>, animationType: string): typeof register;
    export function animation(name: string, Type: new (...args: any[]) => ui.animations.IBaseAnimation,
        dependencies?: Array<any>, animationType?: string): typeof register {
        if (!isString(animationType)) {
            animationType = __CSS;
        } else {
            animationType = animationType.toLowerCase();
            if (!(animationType === animation.CSS || animationType === animation.JS)) {
                throw new Error('Invalid animationType "' + animationType + '" during animation registration.');
            }
        }

        return add((animationType === __JS ? jsAnimationInjectors : animationInjectors),
            name, Type, dependencies, register.injectable.INSTANCE);
    }

    /**
     * @name animation
     * @memberof plat.register
     * @kind namespace
     * @access public
     * 
     * @description
     * Contains constants for animation type.
     */
    export module animation {
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
        export var CSS = __CSS;

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
        export var JS = __JS;
    }
}

var controlInjectors: plat.dependency.IInjectorObject<plat.IControl> = {};
var viewControlInjectors: plat.dependency.IInjectorObject<plat.ui.ViewControl> = {};
var injectableInjectors: plat.dependency.IInjectorObject<plat.dependency.IInjector<any>> = {};
var staticInjectors: plat.dependency.IInjectorObject<plat.dependency.IInjector<any>> = {};
var animationInjectors: plat.dependency.IInjectorObject<plat.ui.animations.IBaseAnimation> = {};
var jsAnimationInjectors: plat.dependency.IInjectorObject<plat.ui.animations.IBaseAnimation> = {};
