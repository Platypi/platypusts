/**
 * An IInjectorObject of plat.IControls. Contains all the registered
 * controls for an application.
 */
var controlInjectors: plat.dependency.IInjectorObject<plat.IControl> = {};

/**
 * An IInjectorObject of plat.ui.IBaseViewControls. Contains all the registered
 * view controls for an application.
 */
var viewControlInjectors: plat.dependency.IInjectorObject<plat.ui.IBaseViewControl> = {};

/**
 * An IInjectorObject of objects. Contains all the registered
 * injectables for an application.
 */
var injectableInjectors: plat.dependency.IInjectorObject<plat.dependency.IInjector<any>> = {};

/**
 * An IInjectorObject of static objects. Contains all the registered
 * static injectables for an application.
 */
var staticInjectors: plat.dependency.IInjectorObject<plat.dependency.IInjector<any>> = {};

module plat.register {
    /**
     * Static injectables will be injected before the application loads. This provides a way to create 
     * a static constructor and load dependencies into static class properties.
     */
    export var STATIC = 'static';

    /**
     * Singleton injectables will contain a constructor. A Singleton injectable will be instantiated once and 
     * used throughout the application lifetime. It will be instantiated when another component is injected 
     * and lists it as a dependency.
     */
    export var SINGLETON = 'singleton';

    /**
     * Instance injectables will contain a constructor. An Instance injectable will be instantiated multiple times 
     * throughout the application lifetime. It will be instantiated whenever another component is injected 
     * and lists it as a dependency.
     */
    export var INSTANCE = 'instance';

    /**
     * Factory injectables will not contain a constructor but will instead contain a method for obtaining an 
     * instance, such as getInstance() or create(). It will be injected before the application loads, similar to a Static 
     * injectable.
     */
    export var FACTORY = 'factory';

    /**
     * Class injectables are essentially a direct reference to a class's constructor. It may contain both 
     * static and instance methods as well as a constructor for creating a new instance.
     */
    export var CLASS = 'class';

    /**
     * Generic function for creating an Injector and adding it to an IInjectorObject.
     * 
     * @param obj The IInjectorObject to which to add an Injector.
     * @param name The name used to set/get the Injector from the IInjectorObject.
     * @param Type The constructor or function definition for the Injector.
     * @param dependencies An array of strings representing the dependencies needed for the
     * injector.
     * @param injectableType The injectable type
     * 
     * @return {register} The object that contains the register methods (for method chaining).
     */
    function add(obj: dependency.IInjectorObject<any>, name: string,
            Type: any, dependencies?: Array<any>, injectableType?: string): typeof register {
        var injector = obj[name] = new dependency.Injector<any>(name, Type, dependencies, injectableType);

        if (injectableType === FACTORY || injectableType === STATIC || injectableType === CLASS) {
            staticInjectors[name] = injector;
        }

        return register;
    }

    /**
     * Registers the IApp with the framework. The framework will instantiate the IApp when needed, and wire up
     * the Application Lifecycle events. The dependencies array corresponds to injectables that will be 
     * passed into the Constructor of the app.
     * 
     * @param name The name of your app.
     * @param Type The constructor for the IApp.
     * @param dependencies An array of strings representing the dependencies needed for the app injector.
     */
    export function app(name: string, Type: new (...args: any[]) => IApp, dependencies?: Array<any>): typeof register {
        var app = new dependency.Injector<IApp>(name, Type, dependencies),
            $appStatic: IAppStatic = acquire(__AppStatic);

        $appStatic.registerApp(app);
        return register;
    }

    /**
     * Registers an IControl with the framework. The framework will instantiate the IControl when needed. The 
     * dependencies array corresponds to injectables that will be passed into the Constructor of the control.
     * 
     * @param name The control type, corresponding to the HTML notation for creating a new IControl (e.g. 'plat-foreach').
     * @param Type The constructor for the IControl.
     * @param dependencies An array of strings representing the dependencies needed for the IControl injector.
     * 
     * @example register.control('my-tap', MyTap, [plat.expressions.IParser]);
     */
    export function control(name: string, Type: new (...args: any[]) => IControl, dependencies?: Array<any>): typeof register {
        if (isString(name)) {
            name = name.toLowerCase();
        }

        return add(controlInjectors, name, Type, dependencies);
    }

    /**
     * Registers a ViewControl with the framework. The framework will instantiate the IControl when needed. The 
     * dependencies array corresponds to injectables that will be passed into the Constructor of the control.
     * 
     * @param name The control type, corresponding to the HTML notation for creating a new IViewControl. Used for navigation 
     * to the specified ViewControl.
     * @param Type The constructor for the IViewControl.
     * @param dependencies An optional array of strings representing the dependencies needed for the IViewControl injector.
     * @param routes Optional route strings (or regular expressions) used for matching a URL to the registered IViewControl.
     * 
     * @example register.viewControl('my-view-control', MyViewControl, null, ['customers/:customer(/:ordernumber)']);
     */
    export function viewControl<T>(name: string, Type: new (...args: any[]) => ui.IBaseViewControl,
        dependencies?: Array<any>): typeof register
    export function viewControl<T>(name: string, Type: new (...args: any[]) => ui.IWebViewControl,
        dependencies?: Array<any>, routes?: Array<any>): typeof register
    export function viewControl<T>(name: string, Type: new (...args: any[]) => ui.IBaseViewControl,
        dependencies?: Array<any>, routes?: Array<any>): typeof register {
        if (isString(name)) {
            name = name.toLowerCase();
        }

        var ret = add(viewControlInjectors, name, Type, dependencies);

        if (isArray(routes)) {
            var $Router: web.IRouter = acquire(__Router);
            $Router.registerRoutes(name, routes);
        }

        return ret;
    }

    /**
     * Registers an injectable with the framework. Injectables are objects that can be used for dependency injection into other objects.
     * The dependencies array corresponds to injectables that will be passed into the Constructor of the injectable.
     * 
     * @param name The name of the injector, used when another component is specifying dependencies.
     * @param dependencies An array of strings representing the dependencies needed for the injectable's injector.
     * @param Type The constructor for the injectable. The injectable will only be instantiated once during the application
     * lifetime.
     * @param injectableType Specifies the type of injectable, either register.SINGLETON, 
     * register.STATIC, register.INSTANCE, register.FACTORY, register.CLASS (defaults to register.SINGLETON).
     * 
     * @example register.injectable('$CacheFactory', [plat.expressions.IParser], Cache);
     * @example register.injectable('database', MyDatabase, null, register.INSTANCE);
     */
    export function injectable(name: string, Type: new (...args: any[]) => void,
        dependencies?: Array<any>, injectableType?: string): typeof register;
    /**
     * Registers an injectable with the framework. Injectables are objects that can be used for dependency injection into other objects.
     * The dependencies array corresponds to injectables that will be passed into the injectable method.
     * 
     * @param name The name of the injector, used when another component is specifying dependencies.
     * @param dependencies An array of strings representing the dependencies needed for the injectable's injector.
     * @param Type The constructor for the injectable. The injectable will only be instantiated once during the application
     * lifetime.
     * @param injectableType Specifies the type of injectable, either register.SINGLETON, 
     * register.STATIC, register.INSTANCE, register.FACTORY, register.CLASS (defaults to register.SINGLETON).
     * 
     * @return {register} The object that contains the register methods (for method chaining).
     * 
     * @example register.injectable('$CacheFactory', [plat.expressions.IParser], 
     *  function(parser: plat.expressions.IParser) { return { ... }; });
     * @example register.injectable('database', function() { return new Database(); }, null, register.INSTANCE);
     */
    export function injectable(name: string, method: (...args: any[]) => any,
        dependencies?: Array<any>, injectableType?: string): typeof register;
    export function injectable(name: string, Type: any, dependencies?: Array<any>, injectableType?: string): typeof register {
        return add(injectableInjectors, name, Type, dependencies, injectableType || SINGLETON);
    }
}
