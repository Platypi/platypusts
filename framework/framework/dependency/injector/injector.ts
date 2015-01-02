/**
 * @name dependency
 * @memberof plat
 * @kind namespace
 * @access public
 *  
 * @description
 * Holds classes and interfaces related to dependency injection components in platypus.
 */
module plat.dependency {
    /**
     * @name Injector
     * @memberof plat.dependency
     * @kind class
     * 
     * @implements {plat.dependency.IInjector}
     * 
     * @description
     * The Injector class is used for dependency injection. You can create an injector object,
     * specify dependencies and a constructor for your component. When the injector object is
     * 'injected' it will create a new instance of your component and pass in the dependencies
     * to the constructor.
     * 
     * @typeparam {any} T The type of object that will be returned when the inject method is invoked.
     */
    export class Injector<T> implements IInjector<T> {
        /**
         * @name initialize
         * @memberof plat.dependency.Injector
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Initializes all static injectors.
         * 
         * @returns {void}
         */
        static initialize(): void {
            var injectors = staticInjectors,
                keys = Object.keys(injectors),
                length = keys.length;

            for (var i = 0; i < length; ++i) {
                injectors[keys[i]].inject();
            }

            staticInjectors = {};
        }

        /**
         * @name getDependencies
         * @memberof plat.dependency.Injector
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Gathers and returns the array of listed dependencies.
         * 
         * @param {Array<any>} dependencies The array of dependencies specified 
         * by either their Constructor or their registered name.
         * 
         * @returns {Array<plat.dependency.IInjecor<any>>} The dependencies
         */
        static getDependencies(dependencies: Array<any>): Array<IInjector<any>> {
            if (isNull(dependencies) || isEmpty(dependencies)) {
                return [];
            }

            var deps: Array<IInjector<any>> = [],
                length = dependencies.length;

            for (var i = 0; i < length; ++i) {
                deps.push(Injector.getDependency(dependencies[i]));
            }

            return deps;
        }

        /**
         * @name getDependency
         * @memberof plat.dependency.Injector
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Finds and returns the dependency.
         * 
         * @param {any} dependency an object/string used to find the dependency.
         * 
         * @returns {plat.dependency.IInjector<any>} The dependency
         */
        static getDependency(dependency: any): IInjector<any> {
            if (isNull(dependency) || dependency === __NOOP_INJECTOR) {
                return Injector.__noop();
            } else if (Injector.isInjector(dependency)) {
                return dependency;
            }

            return Injector.__locateInjector(dependency);
        }

        /**
         * @name convertDependencies
         * @memberof plat.dependency.Injector
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Converts dependencies specified by their Constructors into 
         * equivalent dependencies specified by their registered string 
         * name.
         * 
         * @param {Array<any>} dependencies The array of dependencies specified 
         * by either their Constructor or their registered name.
         * 
         * @returns {Array<string>} The dependency strings.
         */
        static convertDependencies(dependencies: Array<any>): Array<string> {
            if (!isArray(dependencies)) {
                return [];
            }
            var deps: Array<string> = [],
                length = dependencies.length,
                dependency: any,
                value: string;

            for (var i = 0; i < length; ++i) {
                dependency = dependencies[i];

                if (isNull(dependency)) {
                    deps.push('noop');
                    continue;
                }

                value = Injector.__getInjectorName(dependency);

                deps.push(value);
            }

            return deps;
        }

        /**
         * @name isInjector
         * @memberof plat.dependency.Injector
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Checks if the object being passed in fulfills the requirements for being an Injector.
         * 
         * @param {plat.dependency.Injector<any>} dependency The object to check.
         * 
         * @returns {boolean} Whether or not the object passed in is an injector.
         */
        static isInjector(dependency: Injector<any>): boolean {
            return isFunction(dependency.inject) &&
                !isUndefined(dependency.type) &&
                !isUndefined(dependency.name) &&
                !isUndefined(dependency.Constructor);
        }

        /**
         * @name __getInjectorName
         * @memberof plat.dependency.Injector
         * @kind function
         * @access private
         * @static
         * 
         * @description
         * Gets the string name related to an injector.
         * 
         * @param {any} dependency The object to search for.
         * 
         * @returns {string} The string injector name
         */
        private static __getInjectorName(dependency: any): string {
            if (isNull(dependency)) {
                return __NOOP_INJECTOR;
            } else if (isString(dependency)) {
                return dependency;
            } else if (dependency === window) {
                return __Window;
            } else if (dependency === window.document) {
                return __Document;
            }

            if (isString(dependency.__injectorToken)) {
                dependency = dependency.__injectorToken;
            }

            var find: (injectors: IInjectorObject<any>) => IInjector<any> =
                Injector.__findInjector.bind(Injector, dependency),
                injector = find(injectableInjectors) ||
                find(staticInjectors) ||
                find(viewControlInjectors) ||
                find(controlInjectors) ||
                find(animationInjectors) ||
                find(jsAnimationInjectors);

            if (isObject(injector)) {
                return injector.name;
            }

            return __NOOP_INJECTOR;
        }

        /**
         * @name __construct
         * @memberof plat.dependency.Injector
         * @kind function
         * @access private
         * @static
         * 
         * @description
         * Calls the injector's constructor with the associated dependencies.
         * 
         * @param {any} Constructor The Constructor to call.
         * @param {Array<any>} args The arguments to pass to the constructor.
         * 
         * @returns {any} The instantiated constructor.
         */
        private static __construct(Constructor: any, args: Array<any>): any {
            if (isNull(Constructor) || isNull(Constructor.prototype)) {
                return Constructor;
            }
            var obj = Object.create(Constructor.prototype),
                ret = obj.constructor.apply(obj, args);

            if (!isUndefined(ret)) {
                return ret;
            }

            return obj;
        }

        /**
         * @name __locateInjector
         * @memberof plat.dependency.Injector
         * @kind function
         * @access private
         * @static
         * 
         * @description
         * Finds an injector object with the associated constructor.
         * 
         * @param {any} Constructor The Constructor to locate.
         * 
         * @returns {any} The located injector.
         */
        private static __locateInjector(Constructor: any): any {
            if (isNull(Constructor)) {
                return;
            } else if (Constructor === window) {
                return (<any>injectableInjectors).$Window;
            } else if (Constructor === window.document) {
                return (<any>injectableInjectors).$Document;
            }

            if (isString(Constructor.__injectorToken)) {
                Constructor = Constructor.__injectorToken;
            }

            var find: (injectors: IInjectorObject<any>) => IInjector<any> =
                Injector.__findInjector.bind(Injector, Constructor),
                injector = find(injectableInjectors) ||
                find(staticInjectors) ||
                find(viewControlInjectors) ||
                find(controlInjectors) ||
                find(animationInjectors) ||
                find(jsAnimationInjectors) ||
                Injector.__wrap(Constructor);

            return injector;
        }

        /**
         * @name __findInjector
         * @memberof plat.dependency.Injector
         * @kind function
         * @access private
         * @static
         * 
         * @description
         * Finds an injector object with the associated constructor in the given {@link plat.dependency.IInjectorObject|IInjectorObject}.
         * 
         * @param {Function} Constructor The Function
         * 
         * @returns {any} The located injector.
         */
        private static __findInjector(Constructor: any, injectors: IInjectorObject<any>) {
            if (isNull(Constructor) || isString(Constructor)) {
                return injectors[Constructor] || Injector.__noop();
            }

            var injector: IInjector<any>,
                keys = Object.keys(injectors),
                length = keys.length;

            for (var i = 0; i < length; ++i) {
                injector = injectors[keys[i]];

                if (injector.Constructor === Constructor) {
                    return injector;
                }
            }
        }

        /**
         * @name __wrap
         * @memberof plat.dependency.Injector
         * @kind function
         * @access private
         * @static
         * 
         * @description
         * Once an injector is injected, it is wrapped to prevent further injection.
         * 
         * @param {any} value The injected value.
         * 
         * @returns {plat.dependency.IInjector<any>} The wrapped injector.
         */
        private static __wrap(value: any): IInjector<any> {
            return {
                inject: () => value,
                name: __WRAPPED_INJECTOR,
                __dependencies: [],
                Constructor: value
            };
        }

        /**
         * @name __noop
         * @memberof plat.dependency.Injector
         * @kind function
         * @access private
         * @static
         * 
         * @description
         * Returns an empty injector object.
         * 
         * @returns {plat.dependency.IInjector<any>} The noop injector.
         */
        private static __noop(): IInjector<any> {
            return {
                inject: noop,
                type: __NOOP_INJECTOR,
                name: __NOOP_INJECTOR,
                __dependencies: [],
                Constructor: <any>noop
            };
        }

        /**
         * @name __findCircularReferences
         * @memberof plat.dependency.Injector
         * @kind function
         * @access private
         * @static
         * 
         * @description
         * Determines if there is a circular dependency in a dependency tree.
         * 
         * @param {plat.dependency.Injector<any>} injector The starting point for the dependency tree search.
         * 
         * @returns {string} The end of the circular dependency chain, if one exists.
         */
        private static __findCircularReferences(injector: Injector<any>): string {
            if (!(isObject(injector) && isArray(injector.__dependencies))) {
                return;
            }

            var source = injector.name,
                dependencies = injector.__dependencies,
                node: {
                    name: string;
                    dependencies: Array<string>;
                },
                stack: Array<typeof node> = [{
                    name: source,
                    dependencies: dependencies.slice(0)
                }],
                dependency: string,
                locate = Injector.__locateInjector,
                length: number;

            while (stack.length > 0) {
                node = stack.pop();

                dependencies = node.dependencies;
                length = dependencies.length;

                for (var i = 0; i < length; ++i) {
                    dependency = dependencies[i];

                    if (dependency === source) {
                        return node.name;
                    }

                    injector = locate(dependency);

                    if (!(isObject(injector) && isArray(injector.__dependencies))) {
                        continue;
                    }

                    stack.push({
                        name: injector.name,
                        dependencies: injector.__dependencies.slice(0)
                    });
                }
            }
        }

        /**
         * @name __dependencies
         * @memberof plat.dependency.Injector
         * @kind property
         * @access private
         * 
         * @type {Array<string>}
         * 
         * @description
         * The dependencies for this injector
         */
        private __dependencies: Array<string>;

        /**
         * @name constructor
         * @memberof plat.dependency.Injector
         * @kind function
         * @access public
         * 
         * @description
         * The constructor for an injector. Converts any non-string dependencies to strings to support mocking Injectors during runtime.
         * 
         * @param {string} name The name of the injected type.
         * @param {new () => T} Constructor The constructor method for the component requiring the dependency 
         * injection.
         * @param {Array<any>} dependencies An array of strings specifying the injectable dependencies for the 
         * associated constructor.
         * @param {string} type The type of injector, used for injectables specifying a injectableType of 
         * STATIC, SINGLETON, FACTORY, INSTANCE, or CLASS. The default is SINGLETON.
         * 
         * @returns {plat.dependency.Injector}
         */
        constructor(public name: string, public Constructor: new () => T, dependencies?: Array<any>, public type: string = null) {
            var deps = this.__dependencies = Injector.convertDependencies(dependencies),
                index = deps.indexOf(__NOOP_INJECTOR),
                circularReference: string;

            if (index > -1) {
                var dependency = dependencies[index];

                if (isNull(dependency)) {
                    throw new TypeError('The dependency for ' +
                        name + ' at index ' +
                        index + ' is undefined, did you forgot to include a file?');
                }

                throw new TypeError('Could not resolve dependency ' +
                    dependency.slice(9, dependency.indexOf('(')) +
                    ' for ' +
                    name +
                    '. Are you using a static injectable Type?');
            }

            circularReference = Injector.__findCircularReferences(this);

            if (isString(circularReference)) {
                throw new Error('Circular dependency detected from ' + name + ' to ' + circularReference + '.');
            }

            if (name === __AppStatic) {
                var App: IAppStatic = <IAppStatic>(<any>this).inject();
                this.__dependencies = deps;
                App.start();
            }
        }

        /**
         * @name inject
         * @memberof plat.dependency.Injector
         * @kind function
         * @access public
         * 
         * @description
         * Gathers the dependencies for the Injector object and creates a new instance of the 
         * Constructor, passing in the dependencies in the order they were specified. If the 
         * Injector contains a Constructor for an injectable and the Constructor is registered 
         * as a SINGLE type it will only inject that injectable once.
         * 
         * @returns {T} The injected object
         */
        inject(): T {
            var toInject: any = [],
                type = this.type;

            var dependencies = this.__dependencies,
                length = dependencies.length,
                dependency: IInjector<any>,
                injectable: any;

            for (var i = 0; i < length; ++i) {
                dependency = Injector.getDependency(dependencies[i]);
                toInject.push(dependency.inject());
            }

            injectable = <T>Injector.__construct(this.Constructor, toInject);

            if (type === __SINGLETON || type === __FACTORY ||
                type === __STATIC || type === __CLASS) {
                this._wrapInjector(injectable);
            }

            return injectable;
        }

        /**
         * @name _wrapInjector
         * @memberof plat.dependency.Injector
         * @kind function
         * @access protected
         * 
         * @description
         * Wraps the injector with the instantiated value in the case of a 
         * SINGLE or STATIC type so that it does not re-instantiate.
         * 
         * @param {any} value The value to wrap
         */
        protected _wrapInjector(value: any): IInjector<any> {
            this.inject = () => {
                return <T>value;
            };

            return this;
        }
    }

    /**
     * @name IInjectorObject
     * @memberof plat.dependency
     * @kind interface
     * 
     * @description
     * An object whose values are all {@link plat.dependency.IInjector|IInjectors}.
     */
    export interface IInjectorObject<T> extends IObject<IInjector<T>> { }

    /**
     * @name IInjector
     * @memberof plat.dependency
     * @kind interface
     * 
     * @description
     * The IInjector interface is used for dependency injection. You can create an injector object,
     * specify dependencies and a constructor for your component. When the injector object is
     * 'injected' it will create a new instance of your component and pass in the dependencies
     * to the constructor.
     * 
     * @typeparam {any} T The type of object that will be returned when the inject method is invoked.
     */
    export interface IInjector<T> {
        /**
         * @name inject
         * @memberof plat.dependency.IInjector
         * @kind function
         * @access public
         * 
         * @description
         * Gathers the dependencies for the IInjector object and creates a new instance of the 
         * Constructor, passing in the dependencies in the order they were specified. If the 
         * Injector contains a Constructor for an injectable and the Constructor is registered 
         * as a SINGLE type it will only inject that injectable once.
         * 
         * @returns {T} The injected object
         */
        inject(): T;

        /**
         * @name Constructor
         * @memberof plat.dependency.IInjector
         * @kind property
         * @access public
         * 
         * @type {new () => T}
         * 
         * @description
         * The constructor method for the component requiring the dependency injection.
         */
        Constructor: new () => T;

        /**
         * @name type
         * @memberof plat.dependency.IInjector
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The type of injector, used for injectables specifying a register.injectableType of 
         * STATIC, SINGLE, or MULTI. The default is SINGLE.
         */
        type?: string;

        /**
         * @name name
         * @memberof plat.dependency.IInjector
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The name registered for the injector.
         */
        name: string;
    }

    /**
     * @name injectors
     * @memberof plat.dependency
     * @kind namespace
     * @access public
     *  
     * @description
     * Publically exposes all the dependency injector objects.
     */
    export module injectors {
        /**
         * @name control
         * @memberof plat.dependency.injectors
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.dependency.IInjectorObject<plat.IControl>}
         * 
         * @description
         * An {@link plat.dependency.IInjectorObject|IInjectorObject} of {@link plat.IControl|IControls}. 
         * Contains all the registered controls for an application.
         */
        export var control = controlInjectors;

        /**
         * @name viewControl
         * @memberof plat.dependency.injectors
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.dependency.IInjectorObject<plat.ui.IBaseViewControl>}
         * 
         * @description
         * An {@link plat.dependency.IInjectorObject|IInjectorObject} of {@link plat.ui.IBaseViewControl|IBaseViewControls}. 
         * Contains all the registered view controls for an application.
         */
        export var viewControl = viewControlInjectors;

        /**
         * @name injectable
         * @memberof plat.dependency.injectors
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.dependency.IInjectorObject<plat.dependency.IInjector<any>>}
         * 
         * @description
         * An {@link plat.dependency.IInjectorObject|IInjectorObject} of objects. Contains all the registered 
         * injectables for an application.
         */
        export var injectable = injectableInjectors;

        /**
         * @name staticInjectable
         * @memberof plat.dependency.injectors
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.dependency.IInjectorObject<plat.dependency.IInjector<any>>}
         * 
         * @description
         * An {@link plat.dependency.IInjectorObject|IInjectorObject} of static objects. Contains all the registered 
         * static injectables for an application. Once the injectables have been injected, they are removed from this object.
         */
        export var staticInjectable = staticInjectors;

        /**
         * @name animation
         * @memberof plat.dependency.injectors
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.dependency.IInjectorObject<plat.ui.animations.IBaseAnimation>}
         * 
         * @description
         * An {@link plat.dependency.IInjectorObject|IInjectorObject} of animations. Can be either CSS or JS implementations.
         */
        export var animation = animationInjectors;
        
        /**
         * @name jsAnimation
         * @memberof plat.dependency.injectors
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.dependency.IInjectorObject<plat.ui.animations.IBaseAnimation>}
         * 
         * @description
         * An {@link plat.dependency.IInjectorObject|IInjectorObject}  of animations. Should only contain JS implementations.
         */
        export var jsAnimation = jsAnimationInjectors;
    }
}
