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
                length = dependencies.length,
                dependency: any;

            for (var i = 0; i < length; ++i) {
                dependency = dependencies[i];
                if (isNull(dependency) || dependency === 'noop') {
                    deps.push(Injector.__noop());
                    continue;
                } else if (Injector.__isInjector(dependency)) {
                    return dependencies;
                }

                deps.push(Injector.__locateInjector(dependency));
            }

            return deps;
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
                injector: Injector<any>,
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
                return '$Window';
            } else if (dependency === window.document) {
                return '$Document';
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
                return injectableInjectors[Constructor];
            } else if (Constructor === window) {
                return (<any>injectableInjectors).$Window;
            } else if (Constructor === window.document) {
                return (<any>injectableInjectors).$Document;
            }

            var injectors = injectableInjectors,
                injector: IInjector<any>,
                keys = Object.keys(injectors),
                length = keys.length,
                value: any;

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

        private __dependencies: Array<any>;

        /**
         * @param name The name of the injected type.
         * @param dependencies An array of strings specifying the injectable dependencies for the 
         * associated constructor.
         * @param Constructor The constructor method for the component requiring the dependency 
         * injection.
         * @param type The type of injector, used for injectables specifying a register.injectableType of 
         * STATIC, SINGLE, or MULTI. The default is SINGLE.
         */
        constructor(public name: string, public Constructor: new () => T, dependencies?: Array<any>, public type?: string) {
            var deps = this.__dependencies = Injector.convertDependencies(dependencies),
                index = deps.indexOf('noop');

            if (index > -1) {
                var dependency = String(dependencies[index] || '');
                
                throw new TypeError('Could not resolve dependency ' +
                    dependency.substring(9, dependency.indexOf('(')) +
                    ' for ' +
                    name +
                    '. Are you using a static injectable Type?');
            }

            if (name === '$AppStatic') {
                var App: IAppStatic = <IAppStatic>(<any>this).inject();
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

            this.__dependencies = Injector.getDependencies(this.__dependencies);

            var dependencies: Array<IInjector<any>> = this.__dependencies || [],
                length = dependencies.length,
                dependency: string,
                injectable: any;

            for (var i = 0; i < length; ++i) {
                toInject.push(dependencies[i].inject());
            }

            injectable = <T>Injector.__construct(this.Constructor, toInject, type);

            if (type === register.SINGLETON || type === register.FACTORY ||
                type === register.STATIC || type === register.CLASS) {
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
