module plat.dependency {
    /**
     * The Injector class is used for dependency injection. You can create an injector object,
     * specify dependencies and a constructor for your component. When the injector object is
     * 'injected' it will create a new instance of your component and pass in the dependencies
     * to the constructor.
     */
    export class Injector<T> implements IInjector<T> {
        /**
         * Initializes all static injectors.
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
         * Gathers and returns the array of listed dependencies.
         * 
         * @param dependencies The array of dependencies specified 
         * by either their Constructor or their registered name.
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
         * Finds and returns the dependency.
         * 
         * @param dependency an object/string used to find the dependency.
         */
        static getDependency(dependency: any): IInjector<any> {
            if (isNull(dependency) || dependency === 'noop') {
                return Injector.__noop();
            } else if (Injector.__isInjector(dependency)) {
                return dependency;
            }

            return Injector.__locateInjector(dependency);
        }

        /**
         * Converts dependencies specified by their Constructors into 
         * equivalent dependencies specified by their registered string 
         * name.
         * 
         * @param dependencies The array of dependencies specified 
         * by either their Constructor or their registered name.
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

        private static __getInjectorName(dependency: any): string {
            if (isNull(dependency)) {
                return 'noop';
            } else if (isString(dependency)) {
                return dependency;
            } else if (dependency === window) {
                return __Window;
            } else if (dependency === window.document) {
                return __Document;
            }

            var injectors = injectableInjectors,
                injector: IInjector<any>,
                keys = Object.keys(injectors),
                length = keys.length,
                key: string,
                value: any;

            for (var i = 0; i < length; ++i) {
                key = keys[i];
                injector = injectors[key];

                value = injector.Constructor;

                if (value === dependency) {
                    return key;
                }
            }

            return 'noop';
        }

        private static __construct(Constructor: any, args: Array<any>, pattern: string): any {
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

        private static __locateInjector(Constructor: any): any {
            if (isNull(Constructor)) {
                return;
            } else if (isString(Constructor)) {
                return injectableInjectors[Constructor] || Injector.__noop();
            } else if (Constructor === window) {
                return (<any>injectableInjectors).$Window;
            } else if (Constructor === window.document) {
                return (<any>injectableInjectors).$Document;
            }

            var injectors = injectableInjectors,
                injector: IInjector<any>,
                keys = Object.keys(injectors),
                length = keys.length;

            for (var i = 0; i < length; ++i) {
                injector = injectors[keys[i]];

                if (injector.Constructor === Constructor) {
                    return injector;
                }
            }

            return Injector.__wrap(Constructor);
        }

        private static __wrap(value: any): IInjector<any> {
            return {
                inject: () => value,
                name: 'wrapped',
                __dependencies: [],
                Constructor: value
            };
        }

        private static __noop(): IInjector<any> {
            return {
                inject: noop,
                type: 'noop',
                name: 'noop',
                __dependencies: [],
                Constructor: <any>noop
            };
        }

        private static __isInjector(dependency: Injector<any>): boolean {
            return isFunction(dependency.inject) &&
                !isUndefined(dependency.type) &&
                !isUndefined(dependency.name) &&
                !isUndefined(dependency.Constructor);
        }

        private static __findCircularReferences(injector: Injector<any>) {
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

        private __dependencies: Array<string>;

        /**
         * @param name The name of the injected type.
         * @param dependencies An array of strings specifying the injectable dependencies for the 
         * associated constructor.
         * @param Constructor The constructor method for the component requiring the dependency 
         * injection.
         * @param type The type of injector, used for injectables specifying a injectableType of 
         * STATIC, SINGLETON, FACTORY, INSTANCE, or CLASS. The default is SINGLETON.
         */
        constructor(public name: string, public Constructor: new () => T, dependencies?: Array<any>, public type?: string) {
            var deps = this.__dependencies = Injector.convertDependencies(dependencies),
                index = deps.indexOf('noop'),
                circularReference: string;

            if (index > -1) {
                var dependency = dependencies[index];

                if (isNull(dependency)) {
                    throw new TypeError('The dependency for ' +
                        name + ' at index ' +
                        index + ' is undefined, did you forgot to include a file?');
                }
                
                throw new TypeError('Could not resolve dependency ' +
                    dependency.substring(9, dependency.indexOf('(')) +
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
         * Gathers the dependencies for the Injector object and creates a new instance of the 
         * Constructor, passing in the dependencies in the order they were specified. If the 
         * Injector contains a Constructor for an injectable and the Constructor is registered 
         * as a SINGLE type it will only inject that injectable once.
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

            injectable = <T>Injector.__construct(this.Constructor, toInject, type);

            if (type === __SINGLETON || type === __FACTORY ||
                type === __STATIC || type === __CLASS) {
                this._wrapInjector(injectable);
            }

            return injectable;
        }

        /**
         * Wraps the injector with the instantiated value in the case of a 
         * SINGLE or STATIC type so that it does not re-instantiate.
         */
        _wrapInjector(value: any): IInjector<any> {
            var name = this.name;
            return injectableInjectors[name] = <IInjector<any>>{
                type: this.type,
                name: name,
                __dependencies: this.__dependencies,
                Constructor: this.Constructor,
                inject: () => <T>value
            };
        }
    }

    /**
     * An object whose values are all IInjectors.
     */
    export interface IInjectorObject<T> extends IObject<IInjector<T>> { }

    /**
     * Describes an object that handles dependency-injection for a Constructor.
     */
    export interface IInjector<T> {
        /**
         * Gathers the dependencies for the IInjector object and creates a new instance of the 
         * Constructor, passing in the dependencies in the order they were specified. If the 
         * Injector contains a Constructor for an injectable it will only inject that injectable
         * once.
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
}
