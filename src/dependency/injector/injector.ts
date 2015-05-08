/// <reference path="../../references.d.ts" />

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
    'use strict';

    /**
     * @name Injector
     * @memberof plat.dependency
     * @kind class
     * 
     * @description
     * The Injector class is used for dependency injection. You can create an injector object,
     * specify dependencies and a constructor for your component. When the injector object is
     * 'injected' it will create a new instance of your component and pass in the dependencies
     * to the constructor.
     * 
     * @typeparam {any} T The type of object that will be returned when the inject method is invoked.
     */
    export class Injector<T> {
        /**
         * @name dependencies
         * @memberof plat.dependency.Injector
         * @kind property
         * @access public
         * 
         * @type {Array<string>}
         * 
         * @description
         * The dependencies for this injector
         */
        dependencies: Array<string>;

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
        static getDependencies(dependencies: Array<any>): Array<Injector<any>> {
            if (isNull(dependencies) || isEmpty(dependencies)) {
                return [];
            }

            var deps: Array<Injector<any>> = [],
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
         * @returns {plat.dependency.Injector<any>} The dependency
         */
        static getDependency(dependency: any): Injector<any> {
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
            var convert = Injector.convertDependency,
                deps: Array<string> = [],
                length = dependencies.length,
                dependency: any,
                value: string;

            for (var i = 0; i < length; ++i) {
                deps.push(convert(dependencies[i]));
            }

            return deps;
        }

        /**
         * @name convertDependency
         * @memberof plat.dependency.Injector
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Converts a dependency specified by its Constructors into an
         * equivalent dependency specified by its registered string 
         * name.
         * 
         * @param {any} dependency The dependency specified 
         * by either a Constructor or a registered name.
         * 
         * @returns {string} The dependency string.
         */
        static convertDependency(dependency: any): string {
            if (isNull(dependency)) {
                return __NOOP_INJECTOR;
            }

            return Injector.__getInjectorName(dependency);
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
            }

            var Constructor = dependency,
                _inject = isObject(Constructor._inject) ? Constructor._inject : {};

            if (isString(Constructor.__injectorName)) {
                dependency = Constructor.__injectorName;
            }

            if (!isString(dependency)) {
                return <any>new Injector(dependency, Constructor, _inject.dependencies);
            }

            var find: (injectors: InjectorObject<any>) => Injector<any> =
                Injector.__findInjector.bind(Injector, dependency),
                injector = find(injectableInjectors) ||
                find(unregisteredInjectors) ||
                find(staticInjectors) ||
                find(viewControlInjectors) ||
                find(controlInjectors) ||
                find(animationInjectors) ||
                find(jsAnimationInjectors);

            if (!isObject(injector) && isString(dependency)) {
                injector = unregisteredInjectors[dependency] = <Injector<any>>new Injector(dependency, Constructor, Constructor._inject.dependencies);
            }

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
        private static __construct(Constructor: any, args: Array<any>, type?: string): any {
            if (isNull(Constructor) || isNull(Constructor.prototype)) {
                return Constructor;
            }
            var obj = Object.create(Constructor.prototype),
                isInstance = type === __INSTANCE,
                toInject: any;

            if (isInstance) {
                toInject = instanceInjectorDependencies[Constructor.__injectorName];
            }

            if (!isObject(toInject)) {
                toInject = Injector.__walk(obj, Object.getPrototypeOf(obj), {});

                if (isInstance) {
                    instanceInjectorDependencies[Constructor.__injectorName] = toInject;
                }
            }

            var dependencies = acquire(map((value: any): any => value, toInject)),
                keys = Object.keys(toInject),
                length = keys.length;

            for (var i = 0; i < length; ++i) {
                obj[keys[i]] = dependencies[i];
            }

            var ret = obj.constructor.apply(obj, args);

            if (!isUndefined(ret)) {
                return ret;
            }

            return obj;
        }

        /**
         * @name __walk
         * @memberof plat.dependency.Injector
         * @kind function
         * @access private
         * @static
         * 
         * @description
         * Walks up an object's prototype, injecting dependencies if they are 
         * registered on static '_inject' objects.
         * 
         * @param {any} obj The object to walk.
         * @param {any} proto the prototype of the object.
         * 
         * @returns {void}
         */
        private static __walk(obj: any, proto: any, extendWith: any): any {
            var Constructor = proto.constructor,
                parentInject = {};

            if (isObject(Constructor._inject) && Constructor !== Object) {
                parentInject = Injector.__walk(obj, Object.getPrototypeOf(proto), extendWith);
            }

            var toInject = _clone(Constructor._inject, true);

            return _extend(false, false, {}, extendWith, parentInject, toInject);
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
            }

            var dependency: string = Constructor;

            if (isString(Constructor.__injectorName)) {
                dependency = Constructor.__injectorName;
            }

            var find: (injectors: InjectorObject<any>) => Injector<any> =
                Injector.__findInjector.bind(Injector, dependency),
                injector = find(injectableInjectors) ||
                find(unregisteredInjectors) ||
                find(staticInjectors) ||
                find(controlInjectors) ||
                find(viewControlInjectors) ||
                find(animationInjectors) ||
                find(jsAnimationInjectors);

            if (!isObject(injector)) {
                if (isFunction(Constructor)) {
                    if (!isString(dependency)) {
                        dependency = uniqueId(__Plat);
                    }

                    injector = <Injector<any>>new Injector(dependency, Constructor, isObject(Constructor._inject) ? Constructor._injectorDependencies : []);
                    unregisteredInjectors[dependency] = injector;
                } else {
                    injector = Injector.__wrap(Constructor);
                }
            }

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
         * Finds an injector object with the associated constructor in the given {@link plat.dependency.InjectorObject|InjectorObject}.
         * 
         * @param {Function} Constructor The Function
         * 
         * @returns {any} The located injector.
         */
        private static __findInjector(Constructor: any, injectors: InjectorObject<any>): Injector<any> {
            if (isNull(Constructor)) {
                return;
            } else if (Constructor === Injector || Constructor === __InjectorStatic) {
                var ret: Injector<any> = Injector.__wrap(Injector);
                ret.name = __InjectorStatic;
                return ret;
            } else if (isString(Constructor)) {
                return injectors[Constructor] || injectors[(<string>Constructor).toLowerCase()];
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
         * @returns {plat.dependency.Injector<any>} The wrapped injector.
         */
        private static __wrap(value: any): Injector<any> {
            return <any>{
                inject: (): any => value,
                name: __WRAPPED_INJECTOR,
                dependencies: [],
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
         * @returns {plat.dependency.Injector<any>} The noop injector.
         */
        private static __noop(): Injector<any> {
            return <any>{
                inject: noop,
                type: __NOOP_INJECTOR,
                name: __NOOP_INJECTOR,
                dependencies: [],
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
            if (!(isObject(injector) && isArray(injector.dependencies))) {
                return;
            }

            var source = injector.name,
                dependencies = injector.dependencies,
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

                    if (!(isObject(injector) && isArray(injector.dependencies))) {
                        continue;
                    }

                    stack.push({
                        name: injector.name,
                        dependencies: injector.dependencies.slice(0)
                    });
                }
            }
        }

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
            var deps = this.dependencies = Injector.convertDependencies(dependencies),
                index = deps.indexOf(__NOOP_INJECTOR),
                circularReference: string;

            Object.defineProperty(Constructor, '__injectorName', {
                value: name,
                enumerable: false,
                configurable: true,
                writable: true
            });

            Object.defineProperty(Constructor, '__injectorDependencies', {
                value: deps.slice(0),
                enumerable: false,
                configurable: true,
                writable: true
            });

            if (index > -1) {
                var dependency = dependencies[index];

                if (isNull(dependency)) {
                    throw new TypeError('The dependency for ' +
                        name + ' at index ' +
                        index + ' is undefined, did you forget to include a file?');
                }

                throw new TypeError('Could not resolve dependency ' +
                    dependency.slice(9, dependency.indexOf('(')) +
                    ' for ' +
                    name +
                    '. Are you using a static injectable Type?');
            }

            circularReference = Injector.__findCircularReferences(this);

            if (isString(circularReference)) {
                throw new Error('Circular dependency detected from ' + this.name + ' to ' + circularReference + '.');
            }

            if (name === __AppStatic) {
                var App: IAppStatic = <IAppStatic>(<any>this).inject();
                this.dependencies = deps;
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

            var dependencies = this.dependencies,
                length = dependencies.length,
                dependency: Injector<any>,
                injectable: any;

            for (var i = 0; i < length; ++i) {
                dependency = Injector.getDependency(dependencies[i]);
                toInject.push(dependency.inject());
            }

            injectable = <T>Injector.__construct(this.Constructor, toInject, type);

            if (isString(type) && type !== __INSTANCE) {
                this._wrapInjector(injectable);
            }

            (<IInternal>injectable).__injectable__type = type;
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
        protected _wrapInjector(value: any): Injector<any> {
            this.inject = (): T => {
                return value;
            };

            return this;
        }
    }

    /**
     * @name InjectorObject
     * @memberof plat.dependency
     * @kind interface
     * 
     * @description
     * An object whose values are all {@link plat.dependency.Injector|Injectors}.
     */
    export interface InjectorObject<T> extends IObject<Injector<T>> { }

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
         * @type {plat.dependency.InjectorObject<plat.Control>}
         * 
         * @description
         * An {@link plat.dependency.InjectorObject|InjectorObject} of {@link plat.Control|Controls}. 
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
         * @type {plat.dependency.InjectorObject<plat.ui.IBaseViewControl>}
         * 
         * @description
         * An {@link plat.dependency.InjectorObject|InjectorObject} of {@link plat.ui.IBaseViewControl|IBaseViewControls}. 
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
         * @type {plat.dependency.InjectorObject<plat.dependency.Injector<any>>}
         * 
         * @description
         * An {@link plat.dependency.InjectorObject|InjectorObject} of objects. Contains all the registered 
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
         * @type {plat.dependency.InjectorObject<plat.dependency.Injector<any>>}
         * 
         * @description
         * An {@link plat.dependency.InjectorObject|InjectorObject} of static objects. Contains all the registered 
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
         * @type {plat.dependency.InjectorObject<plat.ui.animations.BaseAnimation>}
         * 
         * @description
         * An {@link plat.dependency.InjectorObject|InjectorObject} of animations. Can be either CSS or JS implementations.
         */
        export var animation = animationInjectors;

        /**
         * @name jsAnimation
         * @memberof plat.dependency.injectors
         * @kind property
         * @access public
         * @static
         * 
         * @type {plat.dependency.InjectorObject<plat.ui.animations.BaseAnimation>}
         * 
         * @description
         * An {@link plat.dependency.InjectorObject|InjectorObject}  of animations. Should only contain JS implementations.
         */
        export var jsAnimation = jsAnimationInjectors;
    }
}
