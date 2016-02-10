/**
 * Holds all the classes and interfaces related to registering components for platypus.
 */
export declare module register {
    /**
     * @param {string} name The name of your app.
     * @param {new (...args: any[]) => App} Type The constructor for the IApp.
     * @param {Array<any>} dependencies? An array of strings representing the dependencies needed for the app injector.
     */
    function app(name: string, Type: new (...args: any[]) => App, dependencies?: Array<any>): typeof register;
    /**
     * @param {string} name The control type, corresponding to the HTML notation for creating a new Control (e.g. 'plat-foreach').
     * @param {new (...args: any[]) => Control} Type The constructor for the Control.
     * @param {Array<any>} dependencies? An array of strings representing the dependencies needed for the Control
     * injector.
     */
    function control(name: string, Type: new (...args: any[]) => Control, dependencies?: Array<any>, isStatic?: boolean): typeof register;
    /**
     * @param {string} name The control type, corresponding to the HTML notation for creating a new
     * ViewControl. Used for navigation to the specified ViewControl.
     * @param {new (...args: any[]) => ui.ViewControl} Type The constructor for the ViewControl.
     * @param {Array<any>} dependencies? An optional array of strings representing the dependencies needed for the
     * ViewControl injector.
     */
    function viewControl<T extends ui.ViewControl>(name: string, Type: new (...args: any[]) => T, dependencies?: Array<any>): typeof register;
    /**
     * @param {string} name The name of the injector, used when another component is specifying dependencies.
     * @param {new (...args: any[]) => any} Type The constructor for the injectable. The injectable will only be
     * instantiated once during the application lifetime.
     * @param {Array<any>} dependencies? An array of strings representing the dependencies needed for the injectable's injector.
     * @param {string} injectableType? Specifies the type of injectable, either SINGLETON,
     * STATIC, INSTANCE,
     * FACTORY, CLASS
     * (defaults to SINGLETON).
     */
    function injectable(name: string, Type: new (...args: any[]) => any, dependencies?: Array<any>, injectableType?: string): typeof register;
    /**
     * @param {string} name The name of the injector, used when another component is specifying dependencies.
     * @param {(...args: any[]) => any} method A method that returns the injectable.
     * @param {Array<any>} dependencies? An array of strings representing the dependencies needed for the injectable's injector.
     * @param {string} injectableType? Specifies the type of injectable, either SINGLETON,
     * STATIC, INSTANCE,
     * FACTORY, CLASS
     * (defaults to SINGLETON).
     */
    function injectable(name: string, method: (...args: any[]) => any, dependencies?: Array<any>, injectableType?: string): typeof register;
    /**
     */
    module injectable {
        /**
         */
        let STATIC: string;
        /**
         */
        let SINGLETON: string;
        /**
         */
        let INSTANCE: string;
        /**
         */
        let FACTORY: string;
        /**
         */
        let CLASS: string;
    }
    /**
     * @param {string} name The unique idenitifer of the animation.
     * @param {new (...args: any[]) => ui.animations.CssAnimation} Type The constructor for the custom animation.
     * @param {Array<any>} dependencies? Any dependencies that need to be injected into the animation at
     * instantiation.
     * @param {string} animationType The type of animation. Both the intended type and default value are
     * CSS.
     */
    function animation(name: string, Type: new (...args: any[]) => ui.animations.CssAnimation, dependencies?: Array<any>, animationType?: 'css'): typeof register;
    function animation(name: string, Type: new (...args: any[]) => ui.animations.CssAnimation, dependencies?: Array<any>, animationType?: string): typeof register;
    /**
     * @param {string} name The unique idenitifer of the animation.
     * @param {new (...args: any[]) => ui.animations.BaseAnimation} Type The constructor for the custom animation.
     * @param {Array<any>} dependencies? Any dependencies that need to be injected into the animation at
     * instantiation.
     * @param {string} animationType The type of animation. Both the intended type and default value are
     * JS.
     */
    function animation(name: string, Type: new (...args: any[]) => ui.animations.BaseAnimation, dependencies: Array<any>, animationType: 'js'): typeof register;
    function animation(name: string, Type: new (...args: any[]) => ui.animations.BaseAnimation, dependencies: Array<any>, animationType: string): typeof register;
    /**
     */
    module animation {
        /**
         */
        const CSS: string;
        /**
         */
        const JS: string;
    }
}
/**
 */
export declare module dependency {
    /**
     */
    class Injector<T> {
        name: string;
        Constructor: new () => T;
        type: string;
        /**
         */
        dependencies: Array<string>;
        /**
         */
        static initialize(): void;
        /**
         * @param {Array<any>} dependencies The array of dependencies specified
         * by either their Constructor or their registered name.
         */
        static getDependencies(dependencies: Array<any>): Array<Injector<any>>;
        /**
         * @param {any} dependency an object/string used to find the dependency.
         */
        static getDependency(dependency: any): Injector<any>;
        /**
         * @param {Array<any>} dependencies The array of dependencies specified
         * by either their Constructor or their registered name.
         */
        static convertDependencies(dependencies: Array<any>): Array<string>;
        /**
         * @param {any} dependency The dependency specified
         * by either a Constructor or a registered name.
         */
        static convertDependency(dependency: any): string;
        /**
         * @param {dependency.Injector<any>} dependency The object to check.
         */
        static isInjector(dependency: Injector<any>): boolean;
        /**
         * @param {any} dependency The object to search for.
         */
        private static __getInjectorName(dependency);
        /**
         * @param {any} Constructor The Constructor to call.
         * @param {Array<any>} args The arguments to pass to the constructor.
         */
        private static __construct(Constructor, args, type?);
        /**
         * @param {any} obj The object to walk.
         * @param {any} proto the prototype of the object.
         */
        private static __walk(obj, proto, extendWith);
        /**
         * @param {any} Constructor The Constructor to locate.
         */
        private static __locateInjector(Constructor);
        /**
         * @param {Function} Constructor The Function
         */
        private static __findInjector(Constructor, injectors);
        /**
         * @param {any} value The injected value.
         */
        private static __wrap(value);
        /**
         */
        private static __noop();
        /**
         * @param {dependency.Injector<any>} injector The starting point for the dependency tree search.
         */
        private static __findCircularReferences(injector);
        /**
         * @param {string} name The name of the injected type.
         * @param {new () => T} Constructor The constructor method for the component requiring the dependency
         * injection.
         * @param {Array<any>} dependencies An array of strings specifying the injectable dependencies for the
         * associated constructor.
         * @param {string} type The type of injector, used for injectables specifying a injectableType of
         * STATIC, SINGLETON, FACTORY, INSTANCE, or CLASS. The default is SINGLETON.
         */
        constructor(name: string, Constructor: new () => T, dependencies?: Array<any>, type?: string);
        /**
         */
        inject(): T;
        /**
         * @param {any} value The value to wrap
         */
        protected _wrapInjector(value: any): Injector<any>;
    }
    /**
     */
    interface InjectorObject<T> extends IObject<Injector<T>> {
    }
    /**
     */
    module injectors {
        /**
         */
        const control: InjectorObject<Control>;
        /**
         */
        const viewControl: InjectorObject<ui.ViewControl>;
        /**
         */
        const injectable: InjectorObject<any>;
        /**
         */
        const staticInjectable: InjectorObject<any>;
        /**
         */
        const animation: InjectorObject<ui.animations.BaseAnimation>;
        /**
         */
        const jsAnimation: InjectorObject<ui.animations.BaseAnimation>;
    }
}
/**
 * @param {() => T} dependency The dependency Type to return.
 */
export declare function acquire<T>(dependency: (...args: Array<any>) => T): T;
/**
 * @param {() => T} dependency The dependency Type to return.
 */
export declare function acquire<T>(dependency: new (...args: Array<any>) => T): T;
/**
 * @param {Function} dependency The dependency Type to return.
 */
export declare function acquire(dependency: Function): any;
/**
 * @param {Function} dependency An array of Types specifying the injectable dependencies.
 */
export declare function acquire(dependencies: Array<Function>): Array<any>;
/**
 * @param {string} dependency The injectable dependency type to return.
 */
export declare function acquire(dependency: string): any;
/**
 * @param {Array<string>} dependencies An array of strings specifying the injectable dependencies.
 */
export declare function acquire(dependencies: Array<string>): Array<any>;
/**
 * @param {Array<any>} dependencies An array of strings or Functions specifying the injectable dependencies.
 */
export declare function acquire(dependencies: Array<any>): Array<any>;
/**
 */
export declare module debug {
    /**
     */
    class Log {
        /**
         */
        ERROR: number;
        /**
         */
        WARN: number;
        /**
         */
        INFO: number;
        /**
         */
        DEBUG: number;
        /**
         */
        TRACE: number;
        /**
         */
        protected _level: number;
        /**
         */
        protected _ErrorEvent: events.IErrorEventStatic;
        /**
         * @param {Error} error The error to log.
         */
        error(error: Error): void;
        /**
         * @param {string} message The message to log.
         */
        warn(message: string): void;
        /**
         * @param {Error} message The message to log.
         */
        warn(message: Error): void;
        /**
         * @param {string} message The message to log.
         */
        info(message: string): void;
        /**
         * @param {string} message The message to log.
         */
        info(message: Error): void;
        /**
         * @param {string} message The message to log.
         */
        debug(message: string): void;
        /**
         * @param {string} message The message to log.
         */
        debug(message: Error): void;
        /**
         * @param {string} message The message to log.
         */
        trace(message: string): void;
        /**
         * @param {string} message The message to log.
         */
        trace(message: Error): void;
        /**
         * @param {number} level The log level to set.
         */
        setLogLevel(level: number): void;
        /**
         * @param {string} level A string related to the log level to set (e.g. 'error'). It will be mapped to
         * the proper number. If the corresponding number level is not found, INFO
         * will be used.
         */
        setLogLevel(level: string): void;
        /**
         * @param {number} level The log level denoting the severity of the message.
         * param {boolean} isFatal? Whether or not the severity of the error is fatal.
         */
        protected _log(message: string, level: number, isFatal?: boolean): void;
        /**
         * @param {number} level The log level denoting the severity of the message.
         */
        protected _log(message: Error, level: number): void;
        /**
         * @param {number} level The log level to check against the current minimum log level.
         */
        protected _shouldLog(level: number): boolean;
    }
}
/**
 */
export declare class Compat {
    protected static _inject: any;
    /**
     */
    protected _window: Window;
    /**
     */
    protected _history: History;
    /**
     */
    protected _document: Document;
    /**
     */
    isCompatible: boolean;
    /**
     */
    cordova: boolean;
    /**
     */
    pushState: boolean;
    /**
     */
    fileSupported: boolean;
    /**
     */
    amd: boolean;
    /**
     */
    msApp: boolean;
    /**
     */
    winJs: boolean;
    /**
     */
    indexedDb: boolean;
    /**
     */
    proto: boolean;
    /**
     */
    getProto: boolean;
    /**
     */
    setProto: boolean;
    /**
     */
    hasTouchEvents: boolean;
    /**
     */
    hasPointerEvents: boolean;
    /**
     */
    hasMsPointerEvents: boolean;
    /**
     */
    animationSupported: boolean;
    /**
     */
    platCss: boolean;
    /**
     */
    mappedEvents: IMappedTouchEvents;
    /**
     */
    animationEvents: IAnimationEvents;
    /**
     */
    vendorPrefix: IVendorPrefix;
    /**
     */
    requestAnimationFrame: (callback: FrameRequestCallback) => number;
    /**
     */
    cancelAnimationFrame: (handle: number) => void;
    /**
     */
    IE: number;
    /**
     */
    ANDROID: number;
    /**
     */
    private __events;
    /**
     */
    constructor();
    /**
     * @param {string} event The event to check the existence of.
     */
    hasEvent(event: string): boolean;
    /**
     */
    private __defineBooleans();
    /**
     */
    private __defineMappedEvents();
    /**
     */
    private __defineVendorDependencies();
    /**
     */
    private __determineCss();
}
/**
 */
export interface ITouchMapping<T> extends IObject<T> {
    /**
     */
    $touchstart: T;
    /**
     */
    $touchend: T;
    /**
     */
    $touchmove: T;
    /**
     */
    $touchcancel: T;
}
/**
 */
export interface IMappedTouchEvents extends ITouchMapping<string> {
    /**
     */
    $touchstart: string;
    /**
     */
    $touchend: string;
    /**
     */
    $touchmove: string;
    /**
     */
    $touchcancel: string;
}
/**
 */
export interface IAnimationEvents extends IObject<string> {
    /**
     */
    $animation: string;
    /**
     */
    $animationStart: string;
    /**
     */
    $animationEnd: string;
    /**
     */
    $animationIteration: string;
    /**
     */
    $transition: string;
    /**
     */
    $transitionStart: string;
    /**
     */
    $transitionEnd: string;
}
/**
 */
export interface IVendorPrefix extends IObject<string> {
    /**
     */
    dom: string;
    /**
     */
    lowerCase: string;
    /**
     */
    css: string;
    /**
     */
    upperCase: string;
}
/**
 */
export declare class Utils {
    /**
     */
    noop(): void;
    /**
     * @param {any} destination The destination object to extend.
     * @param {Array<any>} ...sources Any number of objects with which to extend the
     * destination object.
     */
    extend(destination: any, ...sources: any[]): any;
    /**
     * @param {any} destination The destination object to extend.
     * @param {Array<any>} ...sources Any number of objects with which to extend the
     * destination object.
     */
    deepExtend(destination: any, ...sources: any[]): any;
    /**
     * @param {T} obj The object to clone.
     * @param {boolean} deep? Whether or not it is a deep clone.
     */
    clone<T>(obj: T, deep?: boolean): T;
    /**
     * @param {any} obj Anything.
     */
    isObject(obj: any): boolean;
    /**
     * @param {any} obj Anything.
     */
    isWindow(obj: any): boolean;
    /**
     * @param {any} obj Anything.
     */
    isDocument(obj: any): boolean;
    /**
     * @param {any} obj Anything.
     */
    isNode(obj: any): boolean;
    /**
     * @param {any} obj Anything.
     */
    isDocumentFragment(obj: any): boolean;
    /**
     * @param {any} obj Anything.
     */
    isString(obj: any): boolean;
    /**
     * @param {any} obj Anything.
     */
    isRegExp(obj: any): boolean;
    /**
     * @param {any} obj Anything.
     */
    isPromise(obj: any): boolean;
    /**
     * @param {any} obj Anything.
     */
    isEmpty(obj: any): boolean;
    /**
     * @param {any} obj Anything.
     */
    isBoolean(obj: any): boolean;
    /**
     * @param {any} obj Anything.
     */
    isNumber(obj: any): boolean;
    /**
     * @param {any} obj Anything.
     */
    isFile(obj: any): boolean;
    /**
     * @param {any} obj Anything.
     */
    isFunction(obj: any): boolean;
    /**
     * @param {any} obj Anything.
     */
    isNull(obj: any): boolean;
    /**
     * @param {any} obj Anything.
     */
    isUndefined(obj: any): boolean;
    /**
     * @param {any} obj Anything.
     */
    isArray(obj: any): boolean;
    /**
     * @param {any} obj Anything.
     */
    isArrayLike(obj: any): boolean;
    /**
     * @param {any} obj Anything.
     */
    isDate(obj: any): boolean;
    /**
     * @param {IListIterator<T, boolean>} iterator The iterator function to call with array's properties.
     * Returns true if the property should be kept, false otherwise.
     * @param {Array<T>} array The Array to filter.
     * @param {any} context? An optional context to bind to the iterator.
     */
    filter<T>(iterator: IListIterator<T, boolean>, array: Array<T>, context?: any): Array<T>;
    /**
     * @param {IObjectIterator<T, boolean>} iterator The iterator function to call with array's properties.
     * Returns true if the property should be kept, false otherwise.
     * @param {IObject<T>} obj The object to filter.
     * @param {any} context? An optional context to bind to the iterator.
     */
    filter<T>(iterator: IObjectIterator<T, boolean>, obj: IObject<T>, context?: any): Array<T>;
    /**
     * @param {Object} properties An object containing key/value pairs to match with obj's values.
     * @param {Array<T>} array The list used for searching for properties.
     */
    where<T>(properties: Object, array: Array<T>): Array<T>;
    /**
     * @param {IListIterator<T, void>} iterator A method that takes in a value, index, and the object.
     * @param {Array<T>} array An Array.
     * @param {any} context? An optional context to bind to the iterator.
     */
    forEach<T>(iterator: IListIterator<T, void>, array: Array<T>, context?: any): Array<T>;
    /**
     * @param {IObjectIterator<T, void>} iterator A method that takes in a value, index, and the object.
     * @param {IObject<T>} obj An object.
     * @param {any} context? An optional context to bind to the iterator.
     */
    forEach<T>(iterator: IObjectIterator<T, void>, obj: IObject<T>, context?: any): IObject<T>;
    /**
     * @param {IListIterator<T, R>} iterator The transformation function.
     * @param {Array<T>} array An Array.
     * @param {any} context? An optional context to bind to the iterator.
     */
    map<T, R>(iterator: IListIterator<T, R>, array: Array<T>, context?: any): Array<R>;
    /**
     * @param {(value: T, index: number, obj: any) => U} iterator The transformation function.
     * @param {IObject<T>} obj An Object.
     * @param {any} context? An optional context to bind to the iterator.
     */
    map<T, R>(iterator: IObjectIterator<T, R>, obj: IObject<T>, context?: any): Array<R>;
    /**
     * @param {IListIterator<T, async.IThenable<R>>} iterator The transformation function.
     * @param {Array<T>} array An array.
     * @param {any} context? An optional context to bind to the iterator.
     */
    mapAsync<T, R>(iterator: IListIterator<T, async.IThenable<R>>, array: Array<T>, context?: any): async.IThenable<Array<R>>;
    /**
     * @param {IObjectIterator<T, async.IThenable<R>>} iterator The transformation function.
     * @param {IObject<T>} obj An Object.
     * @param {any} context? An optional context to bind to the iterator.
     */
    mapAsync<T, R>(iterator: IObjectIterator<T, async.IThenable<R>>, obj: IObject<T>, context?: any): async.IThenable<Array<R>>;
    /**
     * @param {IListIterator<T, async.IThenable<R>>} iterator The transformation function.
     * @param {Array<T>} array An Array.
     * @param {any} context? An optional context to bind to the iterator.
     */
    mapAsyncInOrder<T, R>(iterator: IListIterator<T, async.IThenable<R>>, array: Array<T>, context?: any): async.IThenable<Array<R>>;
    /**
     * @param {IListIterator<T, async.IThenable<R>>} iterator The transformation function.
     * @param {Array<T>} array An Array.
     * @param {any} context? An optional context to bind to the iterator.
     */
    mapAsyncInDescendingOrder<T, R>(iterator: IListIterator<T, async.IThenable<R>>, array: Array<T>, context?: any): async.IThenable<Array<R>>;
    /**
     * @param {string} key The property to 'pluck' from each value in the array.
     * @param {Array<T>} array The array to pluck the key from
     */
    pluck<T extends {}>(key: string, array: Array<T>): Array<any>;
    /**
     * @param {IListIterator<T, boolean>} iterator A method with which to evaluate all the values in obj.
     * @param {Array<T>} array An array.
     * @param {any} context? An optional context to bind to the iterator.
     */
    some<T>(iterator: IListIterator<T, boolean>, array: Array<T>, context?: any): boolean;
    /**
     * @param {IObjectIterator<T, boolean>} iterator A method with which to evaluate all the values in obj.
     * @param {IObject<T>} obj An object.
     * @param {any} context? An optional context to bind to the iterator.
     */
    some<T>(iterator: IObjectIterator<T, boolean>, obj: IObject<T>, context?: any): boolean;
    /**
     * @param {(...args: Array<any>) => void} method The method to call.
     * @param {Array<any>} args? The arguments to apply to the method.
     * @param {any} context? An optional context to bind to the method.
     */
    postpone(method: (...args: any[]) => void, args?: Array<any>, context?: any): IRemoveListener;
    /**
     * @param {(...args: Array<any>) => void} method The method to call.
     * @param {number} timeout The time (in milliseconds) to delay before calling the provided method.
     * @param {Array<any>} args? The arguments to apply to the method.
     * @param {any} context? An optional context to bind to the method.
     */
    defer(method: (...args: any[]) => void, timeout: number, args?: Array<any>, context?: any): IRemoveListener;
    /**
     * @param {(...args: Array<any>) => void} method The method to call.
     * @param {number} interval The time (in milliseconds) between each consecutive call of the provided method.
     * @param {Array<any>} args? The arguments to apply to the method.
     * @param {any} context? An optional context to bind to the method.
     */
    setInterval(method: (...args: any[]) => void, interval: number, args?: Array<any>, context?: any): IRemoveListener;
    /**
     * @param {FrameRequestCallback} method The method to call when the request is fulfilled.
     * @param {any} context? An optional context to bind to the method.
     */
    requestAnimationFrame(method: FrameRequestCallback, context?: any): IRemoveListener;
    /**
     * @param {string} prefix? A string prefix to prepend tothe unique ID.
     */
    uniqueId(prefix?: string): string;
    /**
     * @param {string} str The spinal-case, dot.case, or snake_case string.
     */
    camelCase(str: string): string;
    /**
     * @param {string} str The camelCased string.
     * @param {string} delimiter The delimiter to add.
     */
    delimit(str: string, delimiter: string): string;
}
/**
 */
export interface IListIterator<T, R> {
    /**
     * @param {T} value The value for an object during an iteration.
     * @param {number} index The index where the value can be found.
     * @param {Array<T>} list The array passed into the util method.
     */
    (value: T, index: number, list: Array<T>): R;
}
/**
 */
export interface IObjectIterator<T, R> {
    /**
     * @param {T} value The value for an object during an iteration.
     * @param {string} key The key where the value can be found.
     * @param {IObject<T>} obj The object passed into the util method.
     */
    (value: T, key: string, obj: IObject<T>): R;
}
/**
 */
export declare function Window(): Window;
/**
 */
export declare function Document(_window?: Window): Document;
/**
 */
export declare module expressions {
    /**
     */
    class Regex {
        /**
         */
        markupRegex: RegExp;
        /**
         */
        argumentRegex: RegExp;
        /**
         * Finds '/*.html' or '/*.htm' in a url. Useful for removing
         */
        initialUrlRegex: RegExp;
        /**
         */
        protocolRegex: RegExp;
        /**
         */
        invalidVariableRegex: RegExp;
        /**
         */
        fileNameRegex: RegExp;
        /**
         */
        shiftedKeyRegex: RegExp;
        /**
         */
        fullUrlRegex: RegExp;
        /**
         */
        validateEmail: RegExp;
        /**
         */
        validateTelephone: RegExp;
        /**
         */
        dynamicSegmentsRegex: RegExp;
        /**
         */
        splatSegmentRegex: RegExp;
        /**
         */
        newLineRegex: RegExp;
        /**
         */
        optionalRouteRegex: RegExp;
        /**
         */
        namedParameterRouteRegex: RegExp;
        /**
         * exec('/foo/*bar/baz');
         */
        wildcardRouteRegex: RegExp;
        /**
         */
        escapeRouteRegex: RegExp;
        /**
         */
        camelCaseRegex: RegExp;
        /**
         */
        capitalCaseRegex: RegExp;
        /**
         */
        whiteSpaceRegex: RegExp;
        /**
         */
        quotationRegex: RegExp;
    }
    /**
     */
    class Tokenizer {
        protected static _inject: any;
        /**
         */
        protected _log: debug.Log;
        /**
         */
        protected _input: string;
        /**
         */
        private __previousChar;
        /**
         */
        private __variableRegex;
        /**
         */
        private __outputQueue;
        /**
         */
        private __operatorStack;
        /**
         */
        private __argCount;
        /**
         */
        private __objArgCount;
        /**
         */
        private __lastColonChar;
        /**
         */
        private __lastCommaChar;
        /**
         * @param {string} input The JavaScript expression string to tokenize.
         */
        createTokens(input: string): Array<IToken>;
        /**
         * @param {string} char The character to check.
         * @param {boolean} isNumberLike Whether or not the character resembles a number.
         */
        protected _checkType(char: string, isNumberLike: boolean): boolean;
        /**
         * @param {string} char The current character in the expression string.
         * @param {number} index The current index in the expression string.
         * @param {boolean} isNumberLike Whether or not the character resembles a number.
         */
        protected _lookAhead(char: string, index: number, isNumberLike: boolean): string;
        /**
         * @param {string} char The operator to find.
         * @param {number} index The current index in the expression string.
         */
        protected _lookAheadForOperatorFn(char: string, index: number): string;
        /**
         * @param {string} endChar The ending character.
         * @param {number} index The current index in the expression string.
         */
        protected _lookAheadForDelimiter(endChar: string, index: number): string;
        /**
         * @param {expressions.IToken} topOperator The top of the operator stack.
         * @param {string} char The operator value being searched for.
         * @param {string} error The error to throw in the case that the expression
         * is invalid.
         */
        protected _popStackForVal(topOperator: IToken, char: string, error: string): void;
        /**
         * @param {expressions.IToken} obj The IToken
         * with the "val" property to compare.
         * @param {string} char The char to compare with.
         */
        protected _isValEqual(obj: IToken, char: string): boolean;
        /**
         * @param {expressions.IToken} obj The IToken
         * with the "val" property to compare.
         * @param {string} char The char to compare with.
         */
        protected _isValUnequal(obj: IToken, char: string): boolean;
        /**
         */
        protected _resetTokenizer(): void;
        /**
         * @param {string} error The error message to throw.
         */
        protected _throwError(error: string): void;
        /**
         * @param {string} char The character to check.
         */
        protected _isNumeric(char: string): boolean;
        /**
         * @param {string} char The character to check.
         */
        protected _isSpace(char: string): boolean;
        /**
         * @param {string} char The character to check.
         */
        protected _isAlphaNumeric(char: string): boolean;
        /**
         * @param {string} input The string to check.
         */
        protected _isStringValidVariable(input: string): boolean;
        /**
         * @param {number} index The current index in the string being tokenized.
         * @param {string} char The current char.
         */
        private __handleAplhaNumeric(index, char);
        /**
         * @param {number} index The current index in the string being tokenized.
         * @param {string} char The current char.
         */
        private __handlePeriod(index, char);
        /**
         * @param {string} char The current char.
         */
        private __handleLeftBrace(char);
        /**
         * @param {string} char The current char.
         */
        private __handleRightBrace(char);
        /**
         * @param {string} char The current char.
         */
        private __handleLeftBracket(char);
        /**
         * @param {string} char The current char.
         */
        private __handleRightBracket(char);
        /**
         * @param {string} char The current char.
         */
        private __handleLeftParenthesis(char);
        /**
         * @param {string} char The current char.
         */
        private __handleRightParenthesis(char);
        /**
         * @param {string} char The current char.
         */
        private __handleComma(char);
        /**
         * @param {number} index The current index in the string being tokenized.
         * @param {string} char The current char.
         */
        private __handleStringLiteral(index, char);
        /**
         * @param {string} char The current char.
         */
        private __handleQuestion(char);
        /**
         * @param {string} char The current char.
         * @param {number} ternary The current ternary counter. Increments when a ternary is found,
         * decrements when a ternary is completed. It can be very useful when there is nested ternaries.
         */
        private __handleColon(char, ternary);
        /**
         * @param {number} index The current index in the string being tokenized.
         * @param {string} char The current char.
         */
        private __handleOtherOperator(index, char);
        /**
         */
        private __popRemainingOperators();
        /**
         * @param {string} operator The operator whose details are being requested.
         */
        private __determineOperator(operator);
        /**
         * @param {string} operator The operator whose precedence is being determined.
         */
        private __determinePrecedence(operator);
        /**
         * @param {number} argCount The current local argument count used with functions,
         * arrays, and object literals.
         */
        private __removeFnFromStack(argCount);
    }
    /**
     */
    interface IToken {
        /**
         */
        val: any;
        /**
         */
        args: number;
    }
    /**
     */
    interface ITokenDetails {
        /**
         */
        precedence: number;
        /**
         */
        associativity: string;
        /**
         */
        fn: Function;
    }
    /**
     */
    class Parser {
        protected static _inject: any;
        /**
         */
        protected _tokenizer: Tokenizer;
        /**
         */
        protected _log: debug.Log;
        /**
         */
        protected _tokens: Array<IToken>;
        /**
         */
        private __cache;
        /**
         */
        private __codeArray;
        /**
         */
        private __identifiers;
        /**
         */
        private __tempIdentifiers;
        /**
         */
        private __aliases;
        /**
         */
        private __fnEvalConstant;
        /**
         * @param {string} expression The JavaScript expression string to parse.
         */
        parse(expression: string): IParsedExpression;
        /**
         * @param {string} key? An optional key that will clear its stored value in the expression
         * cache if passed in.
         */
        clearCache(key?: string): void;
        /**
         * @param {string} expression The JavaScript expression to evaluate.
         */
        protected _evaluate(expression: string): IParsedExpression;
        /**
         * @param {number} index The index before the desired IToken
         * in the array.
         */
        protected _peek(index: number): IToken;
        /**
         * @param {number} index The index after the desired IToken
         * in the array.
         */
        protected _lookBack(index: number): IToken;
        /**
         */
        protected _popRemainingIdentifiers(): void;
        /**
         */
        protected _makeIdentifiersUnique(): void;
        /**
         * @param {expressions.IToken} obj The IToken
         * with the "val" property to compare.
         * @param {string} char The char to compare with.
         */
        protected _isValEqual(obj: IToken, char: string): boolean;
        /**
         * @param {expressions.IToken} obj The IToken
         * with the "val" property to compare.
         * @param {string} char The char to compare with.
         */
        protected _isValUnequal(obj: any, char: string): boolean;
        /**
         */
        protected _resetParser(): void;
        /**
         * @param {string} error The error message to throw.
         */
        protected _throwError(error: string): void;
        /**
         * @param {number} index The current index in the IToken array.
         * @param {string} token The current IToken value.
         * @param {number} args The current IToken args.
         */
        private __convertPrimitive(index, token, args);
        /**
         * @param {number} index The current index in the IToken array.
         * @param {string} token The current IToken value.
         * @param {boolean} useLocalContext Whether or not we need to use an already parsed object as the current context.
         */
        private __convertFunction(index, token, useLocalContext);
        /**
         * @param {number} args The current IToken args.
         */
        private __convertObject(args);
        /**
         * @param {number} args The current IToken args.
         */
        private __convertArrayLiteral(args);
        /**
         * @param {number} index The current index in the IToken array.
         * @param {number} args The current IToken args.
         * @param {boolean} useLocalContext Whether or not we need to use an already parsed object as the current context.
         */
        private __handleFunction(index, args, useLocalContext);
        /**
         * @param {number} index The current index in the IToken array.
         * @param {string} token The current IToken value.
         * @param {boolean} useLocalContext Whether or not we need to use an already parsed object as the current context.
         */
        private __indexIntoObject(index, token, useLocalContext);
        /**
         */
        private __handleQuestion();
        /**
         */
        private __handleColon();
        /**
         * @param {string} token The current IToken value.
         * @param {number} args The current IToken args.
         */
        private __handleOperator(token, args);
        /**
         * @param {any} context The context object.
         * @param {any} aliases Any aliases that may exist.
         * @param {string} token The property used to find the initial context.
         */
        private __findInitialContext(context, aliases, token);
        /**
         * @param {any} context The context object.
         * @param {string} token The property used to drill into the context.
         */
        private __indexIntoContext(context, token);
    }
    /**
     */
    interface IParsedExpression {
        /**
         */
        expression: string;
        /**
         */
        identifiers: Array<string>;
        /**
         */
        aliases: Array<string>;
        /**
         */
        oneTime?: boolean;
        /**
         * @param {any} context? The primary context for evaluation.
         * @param {IObject<any>} aliases? An object containing resource alias values.
         * All property keys must never begin with `@`.
         */
        evaluate(context?: any, aliases?: IObject<any>): any;
    }
}
/**
 */
export declare module web {
    /**
     */
    function Location(_window?: Window): Location;
    /**
     */
    class Browser {
        protected static _inject: any;
        /**
         */
        static config: IBrowserConfig;
        /**
         */
        protected _EventManager: events.IEventManagerStatic;
        /**
         */
        protected _compat: Compat;
        /**
         */
        protected _regex: expressions.Regex;
        /**
         */
        protected _window: Window;
        /**
         */
        protected _location: Location;
        /**
         */
        protected _history: History;
        /**
         */
        protected _dom: ui.Dom;
        /**
         */
        protected _stack: Array<string>;
        /**
         */
        uid: string;
        /**
         */
        private __currentUrl;
        /**
         */
        private __lastUrl;
        /**
         */
        private __initializing;
        /**
         */
        constructor();
        /**
         */
        initialize(): void;
        /**
         * @param {string} url? The URL to set the location to.
         * @param {boolean} replace? Whether or not to replace the current URL in
         * the history.
         */
        url(url?: string, replace?: boolean): string;
        /**
         * @param {number} length=1 The length to go back
         */
        back(length?: number): void;
        /**
         * @param {number} length=1 The length to go forward
         */
        forward(length?: number): void;
        /**
         * @param url? The URL to associate with the new UrlUtils
         * instance.
         */
        urlUtils(url?: string): UrlUtils;
        /**
         * @param url The URL to verify whether or not it's cross domain.
         */
        isCrossDomain(url: string): boolean;
        /**
         * @param url The URL to format.
         */
        formatUrl(url: string): string;
        /**
         * @param url The URL to verify whether or not it's cross domain.
         */
        protected _urlChanged(): void;
        /**
         * @param {string} url The URL to set.
         * @param {boolean} replace? Whether or not to replace the
         * current URL in the history.
         */
        protected _setUrl(url: string, replace?: boolean): void;
        /**
         * @param {string} url The URL to match
         */
        protected _isLastUrl(url: string): boolean;
        /**
         * @param {string} url The URL to trim
         */
        protected _trimSlashes(url: string): string;
    }
    /**
     */
    function IBrowserConfig(): IBrowserConfig;
    /**
     */
    interface IBrowserConfig {
        /**
         */
        HASH: string;
        /**
         */
        STATE: string;
        /**
         */
        routingType: string;
        /**
         */
        hashPrefix: string;
        /**
         */
        baseUrl: string;
    }
    /**
     */
    class UrlUtils {
        protected static _inject: any;
        /**
         */
        private static __urlUtilsElement;
        /**
         */
        protected _document: Document;
        /**
         */
        protected _window: Window;
        /**
         */
        protected _compat: Compat;
        /**
         */
        protected _regex: expressions.Regex;
        /**
         */
        protected _browserConfig: IBrowserConfig;
        /**
         */
        href: string;
        /**
         */
        protocol: string;
        /**
         */
        host: string;
        /**
         */
        hostname: string;
        /**
         */
        port: string;
        /**
         */
        pathname: string;
        /**
         */
        search: string;
        /**
         */
        hash: string;
        /**
         */
        username: string;
        /**
         */
        password: string;
        /**
         */
        origin: string;
        /**
         */
        query: any;
        /**
         * @param {string} search The URL's query search string.
         */
        private static __getQuery(search);
        /**
         * @param {string} url The initial URL passed into the Browser.
         */
        private static __getBaseUrl(url);
        /**
         */
        constructor();
        /**
         * @param {string} url The input to associate with this UrlUtils instance.
         */
        initialize(url: string): void;
        /**
         */
        toString(): string;
    }
}
/**
 */
export declare module async {
    /**
     */
    class Promise<R> implements IThenable<R> {
        /**
         */
        static config: {
            async: (callback: (arg?: IThenable<any>) => void, arg?: IThenable<any>) => void;
        };
        /**
         */
        private __subscribers;
        /**
         */
        private __state;
        /**
         */
        private __detail;
        /**
         * @param {Array<async.IThenable<R>>} promises An array of promises, although every argument is potentially
         * cast to a promise meaning not every item in the array needs to be a promise.
         */
        static all<R>(promises: Array<IThenable<R>>): IThenable<Array<R>>;
        /**
         * @param {Array<R>} promises An array of objects, if an object is not a promise, it will be cast.
         */
        static all<R>(promises: Array<R>): IThenable<Array<R>>;
        /**
         * @param {Array<async.IThenable<R>>} promises An Array of promises to 'race'.
         */
        static race<R>(promises: Array<IThenable<R>>): IThenable<R>;
        /**
         * @param {Array<R>} promises An Array of anything to 'race'. Objects that aren't promises will
         * be cast.
         */
        static race<R>(promises: Array<R>): IThenable<R>;
        /**
         */
        static resolve(): IThenable<void>;
        /**
         * @param {R} value The value to resolve.
         */
        static resolve<R>(value: R): IThenable<R>;
        /**
         * @param {any} error The value to reject.
         */
        static reject(error?: any): IThenable<any>;
        /**
         * @param {async.IResolveFunction<R>} resolveFunction The resolve function to invoke.
         * @param {async.Promise<R>} promise The promise on which to invoke the resolve function.
         */
        private static __invokeResolveFunction<R>(resolveFunction, promise);
        /**
         * @param {async.State} settled The state of the promise.
         * @param {any} promise The promise object.
         * @param {(response: any) => void} callback The callback to invoke.
         * @param {any} detail The details to pass to the callback.
         */
        private static __invokeCallback(settled, promise, callback, detail);
        /**
         * @param {any} promise The promise object.
         * @param {async.State} settled The state of the promise.
         */
        private static __publish(promise, settled);
        /**
         * @param {any} promise The promise object.
         */
        private static __publishFulfillment(promise);
        /**
         * @param {any} promise The promise object.
         */
        private static __publishRejection(promise);
        /**
         * @param {any} promise The promise object.
         * @param {any} reason The detail of the rejected promise.
         */
        private static __reject(promise, reason);
        /**
         * @param {async.Promise<R>} promise The promise object.
         * @param {any} value The detail of the fulfilled promise.
         */
        private static __fulfill<R>(promise, value);
        /**
         * @param {async.Promise<R>} promise The promise object.
         * @param {any} value The detail of the fulfilled promise.
         */
        private static __resolve<R>(promise, value);
        /**
         * @param {async.Promise<R>} promise The promise object.
         * @param {async.Promise<R>} value The next promise to await.
         */
        private static __handleThenable<R>(promise, value);
        /**
         * @param {async.Promise<any>} parent The parent promise.
         * @param {async.Promise<any>} value The child promise.
         * @param {(success: any) => any} onFullfilled The fulfilled method for the child.
         * @param {(error: any) => any} onRejected The rejected method for the child.
         */
        private static __subscribe(parent, child, onFulfilled, onRejected);
        /**
         * @param {async.IResolveFunction<R>} resolveFunction A IResolveFunction for fulfilling/rejecting the Promise.
         */
        constructor(resolveFunction: IResolveFunction<R>);
        /**
         * @param {(success: R) => async.IThenable<U>} onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param {(error: any) => async.IThenable<U>} onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => IThenable<U>): IThenable<U>;
        /**
         * @param {(success: R) => async.IThenable<U>} onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => U): IThenable<U>;
        /**
         * @param {(success: R) => U} onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param {(error: any) => async.IThenable<U>} onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => IThenable<U>): IThenable<U>;
        /**
         * @param {(success: R) => U} onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => U): IThenable<U>;
        /**
         * @param {(error: any) => async.IThenable<U>} onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        catch<U>(onRejected: (error: any) => IThenable<U>): IThenable<U>;
        /**
         * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        catch<U>(onRejected: (error: any) => U): IThenable<U>;
        /**
         */
        toString(): string;
    }
    /**
     */
    interface IThenable<R> {
        /**
         * @param {(success: R) => async.IThenable<U>} onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param {(error: any) => async.IThenable<U>} onRejected? A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => IThenable<U>): IThenable<U>;
        /**
         * @param {(success: R) => async.IThenable<U>} onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param {(error: any) => U} onRejected? A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => U): IThenable<U>;
        /**
         * @param {(success: R) => U} onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param {(error: any) => async.IThenable<U>} onRejected? A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => IThenable<U>): IThenable<U>;
        /**
         * @param {(success: R) => U} onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param {(error: any) => U} onRejected? A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => U): IThenable<U>;
        /**
         * @param {(error: any) => async.IThenable<U>} onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        catch<U>(onRejected: (error: any) => IThenable<U>): IThenable<U>;
        /**
         * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        catch<U>(onRejected: (error: any) => U): IThenable<U>;
    }
    /**
     */
    interface IResolveFunction<R> {
        /**
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
     */
    function IPromise(_window?: any): IPromise;
    /**
     */
    interface IPromise {
        /**
         * @param {async.IResolveFunction<R>} resolveFunction A IResolveFunction for fulfilling/rejecting the Promise.
         */
        new <R>(resolveFunction: IResolveFunction<R>): IThenable<R>;
        /**
         * @param {Array<async.IThenable<R>>} promises An array of promises, although every argument is potentially
         * cast to a promise meaning not every item in the array needs to be a promise.
         */
        all<R>(promises: Array<IThenable<R>>): IThenable<Array<R>>;
        /**
         * @param {Array<R>} promises An array of objects, if an object is not a promise, it will be cast.
         */
        all<R>(promises: Array<R>): IThenable<Array<R>>;
        /**
         * @param {Array<async.IThenable<R>>} promises An Array of promises to 'race'.
         */
        race<R>(promises: Array<IThenable<R>>): IThenable<R>;
        /**
         * @param {Array<R>} promises An Array of anything to 'race'. Objects that aren't promises will
         * be cast.
         */
        race<R>(promises: Array<R>): IThenable<R>;
        /**
         */
        resolve(): IThenable<void>;
        /**
         * @param {R} value The value to resolve.
         */
        resolve<R>(value: R): IThenable<R>;
        /**
         * @param {any} value The value to reject.
         */
        reject(error?: any): IThenable<any>;
    }
    /**
     */
    class HttpRequest {
        protected static _inject: any;
        /**
         */
        clearTimeout: IRemoveListener;
        /**
         */
        xhr: XMLHttpRequest;
        /**
         */
        jsonpCallback: string;
        /**
         */
        protected _log: debug.Log;
        /**
         */
        protected _browser: web.Browser;
        /**
         */
        protected _window: Window;
        /**
         */
        protected _document: Document;
        /**
         */
        protected _config: IHttpConfig;
        /**
         */
        private __fileSupported;
        /**
         */
        private __options;
        /**
         */
        constructor();
        /**
         * @param {async.IHttpConfig} options The IHttpConfigStatic used to customize this HttpRequest.
         */
        initialize(options: IHttpConfig): void;
        /**
         */
        execute<R>(): AjaxPromise<R>;
        /**
         */
        executeJsonp<R>(): AjaxPromise<R>;
        /**
         */
        protected _xhrOnReadyStateChange(): boolean;
        /**
         */
        protected _sendXhrRequest(): AjaxPromise<any>;
        /**
         */
        protected _invalidOptions(): AjaxPromise<any>;
        /**
         * @param {string} responseType The user designated responseType
         * @param {boolean} success Signifies if the response was a success
         */
        protected _formatResponse(responseType: string, success: boolean): IAjaxResponse<any>;
        /**
         */
        private __setHeaders();
        /**
         */
        private __serializeFormData();
        /**
         */
        private __appendFormData();
        /**
         */
        private __submitFramedFormData();
        /**
         */
        private __createInput(key, val);
    }
    /**
     */
    interface IHttpConfig extends IJsonpConfig {
        /**
         */
        method?: string;
        /**
         */
        timeout?: number;
        /**
         */
        user?: string;
        /**
         */
        password?: string;
        /**
         */
        responseType?: string;
        /**
         */
        contentType?: string;
        /**
         */
        overrideMimeType?: string;
        /**
         */
        headers?: IObject<any>;
        /**
         */
        withCredentials?: boolean;
        /**
         */
        data?: any;
        /**
         */
        transforms?: Array<IHttpTransformFunction>;
        /**
         */
        isCrossDomain?: boolean;
    }
    /**
     */
    interface IHttpTransformFunction {
        /**
         * @param {any} data The data for the XMLHttpRequest.
         * @param {XMLHttpRequest} xhr The XMLHttpRequest for the data.
         */
        (data: any, xhr: XMLHttpRequest): any;
    }
    /**
     */
    interface IJsonpConfig {
        /**
         */
        url: string;
        /**
         */
        jsonpIdentifier?: string;
        /**
         */
        jsonpCallback?: string;
    }
    /**
     */
    interface IAjaxResponse<R> {
        /**
         */
        response: R;
        /**
         */
        status: number;
        /**
         */
        getAllResponseHeaders?: () => string;
        /**
         */
        xhr?: XMLHttpRequest;
    }
    /**
     */
    interface IAjaxResolveFunction<R> {
        /**
         * @param {(value?: async.IAjaxResponse<R>) => any} resolve The function to call when the
         * AJAX call has successfully fulfilled.
         * @param {(reason?: async.AjaxError) => any} reject The function to call when the
         * AJAX call fails.
         */
        (resolve: (value?: IAjaxResponse<R>) => any, reject: (reason?: AjaxError) => any): void;
    }
    /**
     */
    class AjaxError implements Error, IAjaxResponse<any> {
        /**
         */
        name: string;
        /**
         */
        message: string;
        /**
         */
        response: any;
        /**
         */
        status: number;
        /**
         */
        getAllResponseHeaders: () => string;
        /**
         */
        xhr: XMLHttpRequest;
        /**
         * @param {async.IAjaxResponse} response The IAjaxResponse object.
         */
        constructor(response: IAjaxResponse<any>);
        /**
         */
        toString(): string;
    }
    /**
     */
    class AjaxPromise<R> extends Promise<IAjaxResponse<R>> implements IAjaxThenable<IAjaxResponse<R>> {
        /**
         */
        protected _window: Window;
        /**
         */
        private __http;
        /**
         * @param {async.IAjaxResolveFunction} resolveFunction The promise resolve function.
         */
        constructor(resolveFunction: IAjaxResolveFunction<R>);
        /**
         * @param {async.IAjaxResolveFunction} resolveFunction The promise resolve function.
         * @param {any} promise The promise object to allow for cancelling the {@link async.AjaxPromise}.
         */
        constructor(resolveFunction: IAjaxResolveFunction<R>, promise: any);
        /**
         * @param {async.HttpRequest} http The http request for this promise.
         */
        initialize(http: HttpRequest): void;
        /**
         */
        cancel(): void;
        /**
         * @param {(success: async.IAjaxResponse<R>) => async.IAjaxThenable<U>} onFulfilled A method called when/if
         * the promise fulfills. If undefined the next onFulfilled method in the promise chain will be called.
         * @param {(error: async.AjaxError) => async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
         * If undefined the next onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => U, onRejected?: (error: AjaxError) => any): IAjaxThenable<U>;
        /**
         * @param {(success: async.IAjaxResponse<R>) => async.IAjaxThenable<U>} onFulfilled A method called when/if
         * the promise fulfills. If undefined the next onFulfilled method in the promise chain will be called.
         * @param {(error: async.AjaxError) => U} onRejected A method called when/if the promise rejects.
         * If undefined the next onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => IThenable<U>, onRejected?: (error: AjaxError) => IThenable<U>): IAjaxThenable<U>;
        /**
         * @param {(success: async.IAjaxResponse<R>) => U} onFulfilled A method called when/if the promise fulfills.
         * If undefined the next onFulfilled method in the promise chain will be called.
         * @param {(error: async.AjaxError) => async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
         * If undefined the next onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => IThenable<U>, onRejected?: (error: AjaxError) => any): IAjaxThenable<U>;
        /**
         * @param {(success: async.IAjaxResponse<R>) => U} onFulfilled A method called when/if the promise fulfills.
         * If undefined the next onFulfilled method in the promise chain will be called.
         * @param {(error: async.AjaxError) => U} onRejected A method called when/if the promise rejects.
         * If undefined the next onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => U, onRejected?: (error: AjaxError) => IThenable<U>): IAjaxThenable<U>;
        /**
         * @param {(error: any) => async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
         * If undefined the next onRejected method in the promise chain will be called.
         */
        catch<U>(onRejected: (error: any) => IAjaxThenable<U>): IAjaxThenable<U>;
        /**
         * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        catch<U>(onRejected: (error: any) => U): IAjaxThenable<U>;
    }
    /**
     */
    interface IAjaxThenable<R> extends IThenable<R> {
        /**
         */
        cancel(): void;
        /**
         * @param {(success: R) => async.IAjaxThenable<U>} onFulfilled A method called when/if the promise fulfills.
         * If undefined the next onFulfilled method in the promise chain will be called.
         * @param {(error: any) => async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
         * If undefined the next onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => IThenable<U>): IAjaxThenable<U>;
        /**
         * @param {(success: R) => async.IAjaxThenable<U>} onFulfilled A method called when/if the promise fulfills.
         * If undefined the next onFulfilled method in the promise chain will be called.
         * @param {(error: any) => U} onRejected A method called when/if the promise rejects.
         * If undefined the next onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => U): IAjaxThenable<U>;
        /**
         * @param {(success: R) => U} onFulfilled A method called when/if the promise fulfills.
         * If undefined the next onFulfilled method in the promise chain will be called.
         * @param {(error: any) => async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
         * If undefined the next onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => IThenable<U>): IAjaxThenable<U>;
        /**
         * @param {(success: R) => U} onFulfilled A method called when/if the promise fulfills.
         * If undefined the next onFulfilled method in the promise chain will be called.
         * @param {(error: any) => U} onRejected A method called when/if the promise rejects.
         * If undefined the next onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => U): IAjaxThenable<U>;
        /**
         * @param {(error: any) => async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
         * If undefined the next onRejected method in the promise chain will be called.
         */
        catch<U>(onRejected: (error: any) => IThenable<U>): IAjaxThenable<U>;
        /**
         * @param {(error: any) => U} onRejected A method called when/if the promise rejects.
         * If undefined the next onRejected method in the promise chain will be called.
         */
        catch<U>(onRejected: (error: any) => U): IAjaxThenable<U>;
    }
    /**
     */
    interface IHttpResponseType {
        /**
         */
        DEFAULT: string;
        /**
         */
        ARRAYBUFFER: string;
        /**
         */
        BLOB: string;
        /**
         */
        DOCUMENT: string;
        /**
         */
        JSON: string;
        /**
         */
        TEXT: string;
    }
    /**
     */
    interface IHttpContentType {
        /**
         */
        ENCODED_FORM: string;
        /**
         */
        JSON: string;
        /**
         */
        MULTIPART_FORM: string;
        /**
         */
        OCTET_STREAM: string;
        /**
         */
        XML: string;
        /**
         */
        PLAIN_TEXT: string;
        /**
         */
        HTML: string;
    }
    /**
     */
    class Http {
        /**
         */
        static config: IHttpConfig;
        /**
         */
        responseType: IHttpResponseType;
        /**
         */
        contentType: IHttpContentType;
        /**
         * @param {async.IHttpConfig} options The IHttpConfig for either the XMLHttpRequest
         * or the JSONP callback.
         */
        ajax<R>(options: IHttpConfig): AjaxPromise<R>;
        /**
         * @param {async.IJsonpConfig} options The IJsonpConfig
         */
        jsonp<R>(options: IJsonpConfig): AjaxPromise<R>;
        /**
         * @param {async.IHttpConfig} options The IHttpConfig
         * for either the XMLHttpRequest or the JSONP callback.
         */
        json<R>(options: IHttpConfig): AjaxPromise<R>;
    }
    /**
     */
    function IHttpConfig(): IHttpConfig;
}
/**
 */
export declare module storage {
    /**
     */
    class Cache<T> {
        /**
         */
        private __size;
        /**
         */
        private __uid;
        /**
         */
        private __options;
        /**
         * @param {string} uid The ID of the new Cache.
         * @param {storage.ICacheOptions} options ICacheOptions
         * for customizing the Cache.
         */
        static create<T>(uid: string, options?: ICacheOptions): Cache<T>;
        /**
         * @param {string} uid The identifier used to search for the cache.
         */
        static fetch<T>(uid: string): Cache<T>;
        /**
         */
        static clear(): void;
        /**
         * @param {string} id The id to use to retrieve the cache from the ICacheFactory.
         * @param {storage.ICacheOptions} options The ICacheOptions for customizing the cache.
         */
        constructor(uid: string, options?: ICacheOptions);
        /**
         */
        info(): ICacheInfo;
        /**
         * @param {string} key The key to use for storage/retrieval of the object.
         * @param {T} value The value to store with the associated key.
         */
        put(key: string, value: T): T;
        /**
         * @param key The key to search for in an Cache.
         */
        read(key: string): T;
        /**
         * @param {string} key The key to remove from the Cache.
         */
        remove(key: string): void;
        /**
         */
        clear(): void;
        /**
         */
        dispose(): void;
    }
    /**
     */
    function ICacheFactory(): ICacheFactory;
    /**
     */
    interface ICacheFactory {
        /**
         * @param {string} uid The ID of the new Cache.
         * @param {storage.ICacheOptions} options ICacheOptions
         * for customizing the Cache.
         */
        create<T>(uid: string, options?: ICacheOptions): Cache<T>;
        /**
         * @param {string} uid The identifier used to search for the cache.
         */
        fetch<T>(uid: string): Cache<T>;
        /**
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
     */
    interface ICacheOptions {
        /**
         */
        timeout?: number;
    }
    /**
     */
    interface ICacheInfo {
        /**
         */
        uid: string;
        /**
         */
        size: number;
        /**
         */
        options: ICacheOptions;
    }
    /**
     */
    class TemplateCache extends Cache<async.IThenable<DocumentFragment>> {
        protected static _inject: any;
        /**
         */
        protected _Promise: async.IPromise;
        /**
         */
        protected _log: debug.Log;
        /**
         */
        constructor();
        /**
         * @param {string} key The key to use for storage/retrieval of the object.
         * @param {string} value The string html.
         */
        put(key: string, value?: string): async.IThenable<DocumentFragment>;
        /**
         * @param {string} key The key to use for storage/retrieval of the object.
         * @param {Node} value The Node.
         */
        put(key: string, value?: Node): async.IThenable<DocumentFragment>;
        /**
         * @param {string} key The key to use for storage/retrieval of the object.
         * @param {async.IThenable<Node>} value Promise that
         * should resolve with a Node.
         */
        put(key: string, value?: async.IThenable<Node>): async.IThenable<DocumentFragment>;
        /**
         * @param {string} key The key to search for in this cache.
         */
        read(key: string): async.IThenable<DocumentFragment>;
    }
    /**
     */
    class BaseStorage {
        [key: string]: any;
        /**
         */
        protected _storage: Storage;
        /**
         */
        constructor(storage: Storage);
        /**
         */
        length: number;
        /**
         */
        clear(): void;
        /**
         * @param {string} key The key of the item to retrieve from storage.
         */
        getItem<T>(key: string): T;
        /**
         * @param {number} index The index used to retrieve the associated key.
         */
        key(index: number): string;
        /**
         * @param {string} key The key of the item to remove from storage.
         */
        removeItem(key: string): void;
        /**
         * @param {string} key The key of the item to store in storage.
         * @param {any} data The data to store in storage with the key.
         */
        setItem(key: string, data: any): void;
    }
    /**
     */
    class LocalStorage extends BaseStorage {
        constructor();
    }
    /**
     */
    class SessionStorage extends BaseStorage {
        constructor();
    }
}
/**
 */
export declare module observable {
    /**
     */
    class ContextManager {
        /**
         */
        protected static _log: debug.Log;
        /**
         */
        static arrayChangeListeners: IObject<IObject<Array<(changes: Array<IArrayChanges<any>>) => void>>>;
        /**
         */
        private static __managers;
        /**
         */
        private static __controls;
        /**
         */
        protected _compat: Compat;
        /**
         */
        context: any;
        /**
         */
        private __identifiers;
        /**
         */
        private __identifierHash;
        /**
         */
        private __lengthListeners;
        /**
         */
        private __contextObjects;
        /**
         */
        private __isArrayFunction;
        /**
         */
        private __observedIdentifier;
        /**
         * @param {Control} control The control on which to locate the ContextManager.
         */
        static getManager(control: Control): ContextManager;
        /**
         * @param {Control} control The control whose manager is being disposed.
         */
        static dispose(control: Control): void;
        /**
         * @param {string} absoluteIdentifier The identifier used to locate the array.
         * @param {string} uid The uid used to search for listeners.
         */
        static removeArrayListeners(absoluteIdentifier: string, uid: string): void;
        /**
         * @param {any} rootContext The root object in which to find a local context.
         * @param {Array<string>} split The string array containing properties used to index into
         * the rootContext.
         */
        static getContext(rootContext: any, split: Array<string>): any;
        /**
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
         * @param {any} obj The object on which to define the property.
         * @param {string} key The property key.
         * @param {any} value The value used to define the property.
         * @param {boolean} enumerable? Whether or not the property should be enumerable (able to be iterated
         * over in a loop)
         * @param {boolean} configurable? Whether or not the property is able to be reconfigured.
         */
        static defineGetter(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean): void;
        /**
         * @param {string} identifer The identifier for which the remove listener is being pushed.
         * @param {string} uid The unique ID of the control observing the identifier.
         * @param {IRemoveListener} listener The function for removing the observed property.
         */
        static pushRemoveListener(identifier: string, uid: string, listener: IRemoveListener): void;
        /**
         * @param {string} identifer The identifier for which the remove listener is being spliced.
         * @param {string} uid The unique ID of the control observing the identifier.
         * @param {IRemoveListener} listener The function for removing the observed property.
         */
        static spliceRemoveListener(identifier: string, uid: string, listener: IRemoveListener): void;
        /**
         * @param {Array<string>} uids The set of unique Ids for which to remove the specified identifier.
         * @param {string} identifier The identifier to stop observing.
         */
        static removeIdentifier(uids: Array<string>, identifier: string): void;
        /**
         * @param {ui.TemplateControl} control The TemplateControl
         * on which to create the context.
         * @param {string} identifier The period-delimited identifier string used to create
         * the context path.
         */
        static createContext(control: ui.TemplateControl, identifier: string): any;
        /**
         * @param {any} obj The object to stop observing.
         */
        static unObserve(obj: any): void;
        /**
         * @param {Array<string>} split The string array containing properties used to index into
         * the context.
         * @param {boolean} observe? Whether or not to observe the identifier indicated by the
         * split Array.
         */
        getContext(split: Array<string>, observe?: boolean): any;
        /**
         * @param {string} absoluteIdentifier The period-delimited identifier noting the property to be observed.
         * @param {observable.IListener} observableListener An object implmenting IObservableListener. The listener will be
         * notified of object changes.
         */
        observe(absoluteIdentifier: string, observableListener: IListener): IRemoveListener;
        /**
         * @param {string} uid The unique ID of the object observing the array.
         * @param {(changes: Array<observable.IArrayChanges<any>>) => void} listener The callback for after
         * when an observed Array function has been called.
         * @param {string} absoluteIdentifier The identifier from the root context used to find the array.
         * @param {Array<any>} array The array to be observed.
         * @param {Array<any>} oldArray The old array to stop observing.
         */
        observeArrayMutation(uid: string, listener: (changes: Array<IArrayChanges<any>>) => void, absoluteIdentifier: string, array: Array<any>, oldArray: Array<any>): IRemoveListener;
        /**
         */
        dispose(): void;
        /**
         * @param {string} uid The unique identifier to store the callback.
         * @param {string} absoluteIdentifier The identifier of the Array being observed.
         * @param {(changes: Array<observable.IArrayChanges<any>>) => void} listener The Array mutation listener.
         */
        protected _pushArrayListener(uid: string, absoluteIdentifier: string, listener: (changes: Array<IArrayChanges<any>>) => void): IRemoveListener;
        /**
         * @param {Array<any>} array The array to restore.
         */
        protected _restoreArray(array: Array<any>): void;
        /**
         * @param {string} absoluteIdentifier The identifier for the Array off context.
         * @param {Array<any>} array The array to overwrite.
         */
        protected _overwriteArray(absoluteIdentifier: string, array: Array<any>): void;
        /**
         * @param {string} identifier The identifier for which we're getting the context.
         * @param {Array<string>} split The string array containing properties used to index into
         * the context.
         * @param {boolean} observe? Whether or not to observe the identifier indicated by the
         * split Array.
         */
        protected _getContext(identifier: string, split: Array<string>, observe?: boolean): any;
        /**
         * @param {Array<string>} split The string array containing properties used to index into
         * the context.
         */
        protected _getImmediateContext(split: Array<string>): any;
        /**
         * @param {Array<string>} split The identifier's split string array containing properties
         * used to index into the context.
         * @param {string} identifier The identifier being observed.
         */
        protected _observeImmediateContext(split: Array<string>, identifier: string): any;
        /**
         * @param {Array<string>} split The split identifier of the property that changed.
         * @param {any} newRootContext The new context.
         * @param {any} oldRootContext The old context.
         */
        protected _getValues(split: Array<string>, newRootContext: any, oldRootContext: any): {
            newValue: any;
            oldValue: any;
        };
        /**
         * @param {string} identifier The identifier for the property that changed.
         * @param {any} newValue The new value of the property.
         * @param {any} oldValue The old value of the property.
         * @param {Array<string>} mappings? An array of mapped child identifier keys to notify.
         */
        protected _notifyChildProperties(identifier: string, newValue: any, oldValue: any, mappings?: Array<string>): void;
        /**
         * @param {string} absoluteIdentifier The identifier being observed.
         * @param {observable.IListener} observableListener The function and associated unique ID to be fired
         * for this identifier.
         * @param {boolean} isLength? Indicates the property being observed is an Array's length.
         */
        protected _addObservableListener(absoluteIdentifier: string, observableListener: IListener, isLength?: boolean): IRemoveListener;
        /**
         * @param {string} identifier The full identifier path for the property being observed.
         * @param {any} immediateContext The object whose property will be observed.
         * @param {string} key The property key for the value on the immediateContext that's
         * being observed.
         */
        protected _define(identifier: string, immediateContext: any, key: string): void;
        /**
         * @param {string} absoluteIdentifier The full identifier path for the observed array.
         * @param {string} method The array method being called.
         */
        protected _overwriteArrayFunction(absoluteIdentifier: string, method: string): (...args: any[]) => any;
        /**
         * @param {string} identifier The identifier attached to the callbacks.
         * @param {observable.IListener} listener The observable listener to remove.
         */
        protected _removeCallback(identifier: string, listener: IListener): void;
        /**
         * @param {string} identifier The identifier being observed.
         */
        protected _hasIdentifier(identifier: string): boolean;
        /**
         * @param {string} identifier The identifier attached to the callbacks.
         * @param {any} value The new value on this context specified by
         * the identifier.
         * @param {any} oldValue The old value on this context specified by
         * the identifier.
         */
        protected _execute(identifier: string, value: any, oldValue: any): void;
        /**
         * @param {string} identifier The identifier of the object being defined.
         * @param {any} immediateContext The parent object of the object being defined.
         * @param {string} key The property key of the object being defined.
         */
        private __defineObject(identifier, immediateContext, key);
        /**
         * @param {string} identifier The identifier of the primitive being defined.
         * @param {any} immediateContext The parent object of the primitive being defined.
         * @param {string} key The property key of the primitive being defined.
         */
        private __definePrimitive(identifier, immediateContext, key);
        /**
         * @param {string} identifier The identifier to attach the listener.
         * @param {observable.IListener} observableListener The listener being added.
         */
        private __add(identifier, observableListener);
        /**
         * @param {string} identifier The identifier to map.
         */
        private __addHashValues(identifier);
    }
    /**
     */
    function IContextManagerStatic(_log?: debug.Log): IContextManagerStatic;
    /**
     */
    interface IContextManagerStatic {
        /**
         */
        arrayChangeListeners: IObject<IObject<Array<(changes: Array<IArrayChanges<any>>) => void>>>;
        /**
         * @param {Control} control The control on which to locate the ContextManager.
         */
        getManager(control: Control): ContextManager;
        /**
         * @param {Control} control The control whose manager is being disposed.
         */
        dispose(control: Control): void;
        /**
         * @param {string} absoluteIdentifier The identifier used to locate the array.
         * @param {string} uid The uid used to search for listeners.
         */
        removeArrayListeners(absoluteIdentifier: string, uid: string): void;
        /**
         * @param {any} rootContext The root object in which to find a local context.
         * @param {Array<string>} split The string array containing properties used to index into
         * the rootContext.
         */
        getContext(rootContext: any, split: Array<string>): void;
        /**
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
         * @param {any} obj The object on which to define the property.
         * @param {string} key The property key.
         * @param {any} value The value used to define the property.
         * @param {boolean} enumerable? Whether or not the property should be enumerable (able to be iterated
         * over in a loop)
         * @param {boolean} configurable? Whether or not the property is able to be reconfigured.
         */
        defineGetter(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean): void;
        /**
         * @param {string} identifer The identifier for which the remove listener is being pushed.
         * @param {string} uid The unique ID of the control observing the identifier.
         * @param {IRemoveListener} listener The function for removing the observed property.
         */
        pushRemoveListener(identifier: string, uid: string, listener: IRemoveListener): void;
        /**
         * @param {string} identifer The identifier for which the remove listener is being spliced.
         * @param {string} uid The unique ID of the control observing the identifier.
         * @param {IRemoveListener} listener The function for removing the observed property.
         */
        spliceRemoveListener(identifier: string, uid: string, listener: IRemoveListener): void;
        /**
         * @param {Array<string>} uids The set of unique Ids for which to remove the specified identifier.
         * @param {string} identifier The identifier to stop observing.
         */
        removeIdentifier(uids: Array<string>, identifier: string): void;
        /**
         * @param {ui.TemplateControl} control The TemplateControl
         * on which to create the context.
         * @param {string} identifier The period-delimited identifier string used to create
         * the context path.
         */
        createContext(control: ui.TemplateControl, identifier: string): any;
    }
    /**
     */
    interface IListener {
        /**
         */
        uid: string;
        /**
         */
        priority?: number;
        /**
         * @param {any} value The new value of the object.
         * @param {any} oldValue The previous value of the object.
         */
        listener(value: any, oldValue: any): void;
    }
    /**
     */
    interface IArrayChanges<T> {
        /**
         */
        object: Array<T>;
        /**
         */
        type: string;
        /**
         */
        index?: number;
        /**
         */
        removed?: Array<T>;
        /**
         */
        addedCount?: number;
        /**
         */
        oldArray?: Array<T>;
    }
    /**
     */
    interface IObservableProperty<T> {
        /**
         */
        value: T;
        /**
         * @param {(newValue: T, oldValue: T) => void} listener The listener callback which will be pre-bound to the
         * template control.
         */
        observe(listener: (newValue: T, oldValue: T) => void): IRemoveListener;
    }
    /**
     */
    interface ISupportTwoWayBinding {
        /**
         * @param {IPropertyChangedListener<any>} listener The function that acts as a listener.
         */
        onInput(listener: (newValue: any, oldValue: any) => void): IRemoveListener;
        /**
         * @param {observable.IImplementTwoWayBinding} binder The control that facilitates the
         * databinding.
         */
        observeProperties(binder: observable.IImplementTwoWayBinding): void;
    }
    /**
     */
    interface IImplementTwoWayBinding {
        /**
         * @param {observable.IBoundPropertyChangedListener<T>} listener The listener function.
         * @param {string} identifier? The identifier off of the bound object to listen to for changes. If undefined or empty
         * the listener will listen for changes to the bound item itself.
         * @param {boolean} autocast? Will cast a primitive value to whatever it was set to in code.
         */
        observeProperty<T>(listener: IBoundPropertyChangedListener<T>, identifier?: string, autocast?: boolean): IRemoveListener;
        /**
         * @param {observable.IBoundPropertyChangedListener<T>} listener The listener function.
         * @param {number} index? The index off of the bound object to listen to for changes if the bound object is an Array.
         * If undefined or empty the listener will listen for changes to the bound Array itself.
         * @param {boolean} autocast? Will cast a primitive value to whatever it was set to in code.
         */
        observeProperty<T>(listener: IBoundPropertyChangedListener<T>, index?: number, autocast?: boolean): IRemoveListener;
        /**
         * @param {(changes: Array<observable.IArrayChanges<T>>, identifier: string) => void} listener The listener function.
         * @param {string} identifier? The identifier off of the bound object to listen to for changes. If undefined or empty
         * the listener will listen for changes to the bound item itself.
         */
        observeArrayChange<T>(listener: (changes: Array<IArrayChanges<T>>, identifier: string) => void, identifier?: string): IRemoveListener;
        /**
         * @param {(changes: Array<observable.IArrayChanges<T>>, identifier: number) => void} listener The listener function.
         * @param {number} index? The index off of the bound object to listen to for changes if the bound object is an Array.
         * If undefined or empty the listener will listen for changes to the bound Array itself.
         */
        observeArrayChange<T>(listener: (changes: Array<IArrayChanges<T>>, identifier: number) => void, index?: number): IRemoveListener;
        /**
         */
        evaluate(): any;
    }
    /**
     */
    interface IBoundPropertyChangedListener<T> {
        /**
         * @param {T} newValue The new value of the observed property.
         * @param {T} oldValue The previous value of the observed property.
         * @param {any} identifier The string or number identifier that specifies the changed property.
         * @param {boolean} firstTime? True if this is the first case where the bound property is being set.
         */
        (newValue: T, oldValue: T, identifier: any, firstTime?: boolean): void;
    }
}
/**
 */
export declare module events {
    /**
     */
    class DispatchEvent {
        protected static _inject: any;
        /**
         */
        protected _EventManager: IEventManagerStatic;
        /**
         */
        protected _ContextManager: observable.IContextManagerStatic;
        /**
         */
        sender: any;
        /**
         */
        name: string;
        /**
         */
        direction: string;
        /**
         */
        defaultPrevented: boolean;
        /**
         */
        stopped: boolean;
        /**
         * @param {string} name The name of the event.
         * @param {any} sender The object that initiated the event.
         * @param {string} direction='up' Equivalent to EventManager.UP.
         */
        initialize(name: string, sender: any, direction?: 'up'): void;
        /**
         * @param {string} name The name of the event.
         * @param {any} sender The object that initiated the event.
         * @param {string} direction='down' Equivalent to EventManager.DOWN.
         */
        initialize(name: string, sender: any, direction?: 'down'): void;
        /**
         * @param {string} name The name of the event.
         * @param {any} sender The object that initiated the event.
         * @param {string} direction='direct' Equivalent to EventManager.DIRECT.
         */
        initialize(name: string, sender: any, direction?: 'direct'): void;
        /**
         * @param {string} name The name of the event.
         * @param {any} sender The object that initiated the event.
         * @param {string} direction The direction of propagation
         */
        initialize(name: string, sender: any, direction?: string): void;
        /**
         */
        preventDefault(): void;
        /**
         */
        stopPropagation(): void;
    }
    /**
     */
    class LifecycleEvent extends DispatchEvent {
        /**
         * @param {string} name The name of the event.
         * @param {any} sender The sender of the event.
         */
        static dispatch(name: string, sender: any): LifecycleEvent;
        /**
         * @param {string} name The name of the event.
         * @param {any} sender The sender of the event.
         */
        initialize(name: string, sender: any): void;
    }
    /**
     */
    function ILifecycleEventStatic(): ILifecycleEventStatic;
    /**
     */
    interface ILifecycleEventStatic {
        /**
         * @param {string} name The name of the event.
         * @param {any} sender The sender of the event.
         */
        dispatch(name: string, sender: any): LifecycleEvent;
    }
    /**
     */
    class EventManager {
        /**
         */
        protected static _log: debug.Log;
        /**
         */
        protected static _compat: Compat;
        /**
         */
        protected static _document: Document;
        /**
         */
        protected static _window: Window;
        /**
         */
        protected static _dom: ui.Dom;
        /**
         */
        static UP: string;
        /**
         */
        static DOWN: string;
        /**
         */
        static DIRECT: string;
        /**
         */
        static propagatingEvents: IObject<boolean>;
        /**
         */
        private static __eventsListeners;
        /**
         */
        private static __lifecycleEventListeners;
        /**
         */
        private static __initialized;
        /**
         */
        static initialize(): void;
        /**
         * @param {string} uid The uid for which the event listeners will be removed.'
         */
        static dispose(uid: string): void;
        /**
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName The name of the event to listen to.
         * @param {(ev: DispatchEvent, ...args: any[]) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         */
        static on(uid: string, eventName: string, listener: (ev: DispatchEvent, ...args: any[]) => void, context?: any): IRemoveListener;
        /**
         * @param {string} name The name of the event.
         * @param {any} sender The object sending the event.
         * @param {string} direction='up' Equivalent to EventManager.UP.
         * @param {Array<any>} args? The arguments to send to the listeners.
         */
        static dispatch(name: string, sender: any, direction: 'up', args?: Array<any>): DispatchEvent;
        /**
         * @param {string} name The name of the event.
         * @param {any} sender The object sending the event.
         * @param {string} direction='down' Equivalent to EventManager.DOWN.
         * @param {Array<any>} args? The arguments to send to the listeners.
         */
        static dispatch(name: string, sender: any, direction: 'down', args?: Array<any>): DispatchEvent;
        /**
         * @param {string} name The name of the event.
         * @param {any} sender The object sending the event.
         * @param {string} direction='direct' Equivalent to EventManager.DIRECT.
         * @param {Array<any>} args? The arguments to send to the listeners.
         */
        static dispatch(name: string, sender: any, direction: 'direct', args?: Array<any>): DispatchEvent;
        /**
         * @param {string} name The name of the event.
         * @param {any} sender The object sending the event.
         * @param {string} direction The direction in which to send the event.
         * @param {Array<any>} args? The arguments to send to the listeners.
         */
        static dispatch(name: string, sender: any, direction: string, args?: Array<any>): DispatchEvent;
        /**
         * @param {string} direction The direction of the event
         */
        static hasDirection(direction: string): boolean;
        /**
         * @param {events.DispatchEvent} event The DispatchEvent to send
         * @param {Array<any>} args The arguments associated with the event
         */
        static sendEvent(event: DispatchEvent, args?: Array<any>): void;
        /**
         * @param {events.DispatchEvent} event The event being dispatched.
         * @param {Array<any>} args The arguments associated with the event.
         */
        protected static _dispatchUp(event: DispatchEvent, args: Array<any>): void;
        /**
         * @param {events.DispatchEvent} event The event being dispatched.
         * @param {Array<any>} args The arguments associated with the event.
         */
        protected static _dispatchDown(event: DispatchEvent, args: Array<any>): void;
        /**
         * @param {events.DispatchEvent} event The event being dispatched.
         * @param {Array<any>} args The arguments associated with the event.
         */
        protected static _dispatchDirect(event: DispatchEvent, args: Array<any>): void;
        /**
         * @param {string} uid The uid used to find the event listeners.
         * @param {events.DispatchEvent} The event.
         * @param {Array<any>} args The arguments to send to the listeners.
         */
        private static __executeEvent(uid, ev, args);
        /**
         * @param {any} context The context with which to call the listeners.
         * @param {events.DispatchEvent} The event.
         * @param {Array<(ev: DispatchEvent, ...args: any[]) => void>} The event listeners.
         * @param {Array<any>} args The arguments to send to the listeners.
         */
        private static __callListeners(context, ev, listeners, args);
    }
    /**
     */
    function IEventManagerStatic(_log?: debug.Log, _compat?: Compat, _document?: Document, _window?: Window, _dom?: ui.Dom): IEventManagerStatic;
    /**
     */
    interface IEventManagerStatic {
        /**
         */
        UP: string;
        /**
         */
        DOWN: string;
        /**
         */
        DIRECT: string;
        /**
         */
        propagatingEvents: IObject<boolean>;
        /**
         */
        initialize(): void;
        /**
         * @param {string} uid The uid for which the event listeners will be removed.'
         */
        dispose(uid: string): void;
        /**
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName='ready' Specifies that the listener is for the ready event.
         * @param {(ev: events.LifecycleEvent) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         */
        on(uid: string, eventName: 'ready', listener: (ev: LifecycleEvent) => void, context?: any): IRemoveListener;
        /**
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName='suspend' Specifies the listener is for the suspend event.
         * @param {(ev: events.LifecycleEvent) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         */
        on(uid: string, eventName: 'suspend', listener: (ev: LifecycleEvent) => void, context?: any): IRemoveListener;
        /**
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName='suspend' Specifies the listener is for the resume event.
         * @param {(ev: events.LifecycleEvent) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         */
        on(uid: string, eventName: 'resume', listener: (ev: LifecycleEvent) => void, context?: any): IRemoveListener;
        /**
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName='online' Specifies the listener is for the online event.
         * @param {(ev: events.LifecycleEvent) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         */
        on(uid: string, eventName: 'online', listener: (ev: LifecycleEvent) => void, context?: any): IRemoveListener;
        /**
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName='offline' Specifies the listener is for the offline event.
         * @param {(ev: events.LifecycleEvent) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         */
        on(uid: string, eventName: 'offline', listener: (ev: LifecycleEvent) => void, context?: any): IRemoveListener;
        /**
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName The name of the event to listen to.
         * @param {(ev: events.LifecycleEvent) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         */
        on(uid: string, eventName: string, listener: (ev: LifecycleEvent) => void, context?: any): IRemoveListener;
        /**
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName The name of the event to listen to.
         * @param {(ev: events.ErrorEvent<Error>) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         */
        on(uid: string, eventName: 'error', listener: (ev: ErrorEvent<Error>) => void, context?: any): IRemoveListener;
        /**
         * @param {string} uid A unique id to associate with the object registering the listener.
         * @param {string} eventName The name of the event to listen to.
         * @param {(ev: events.DispatchEvent, ...args: any[]) => void} listener The method called when the event is fired.
         * @param {any} context? The context with which to call the listener method.
         */
        on(uid: string, eventName: string, listener: (ev: DispatchEvent, ...args: any[]) => void, context?: any): IRemoveListener;
        /**
         * @param {string} name The name of the event.
         * @param {any} sender The object sending the event.
         * @param {string} direction='up' Equivalent to EventManager.UP.
         * @param {Array<any>} args? The arguments to send to the listeners.
         */
        dispatch(name: string, sender: any, direction: 'up', args?: Array<any>): DispatchEvent;
        /**
         * @param {string} name The name of the event.
         * @param {any} sender The object sending the event.
         * @param {string} direction='down' Equivalent to EventManager.DOWN.
         * @param {Array<any>} args? The arguments to send to the listeners.
         */
        dispatch(name: string, sender: any, direction: 'down', args?: Array<any>): DispatchEvent;
        /**
         * @param {string} name The name of the event.
         * @param {any} sender The object sending the event.
         * @param {string} direction='direct' Equivalent to EventManager.DIRECT.
         * @param {Array<any>} args? The arguments to send to the listeners.
         */
        dispatch(name: string, sender: any, direction: 'direct', args?: Array<any>): DispatchEvent;
        /**
         * @param {string} name The name of the event.
         * @param {any} sender The object sending the event.
         * @param {string} direction The direction in which to send the event.
         * @param {Array<any>} args? The arguments to send to the listeners.
         */
        dispatch(name: string, sender: any, direction: string, args?: Array<any>): DispatchEvent;
        /**
         * @param {string} direction The direction of the event
         */
        hasDirection(direction: string): boolean;
        /**
         * @param {events.DispatchEvent} event The DispatchEvent to send
         * @param {Array<any>} args The arguments associated with the event
         */
        sendEvent(event: DispatchEvent, args?: Array<any>): void;
    }
    /**
     */
    class ErrorEvent<E extends Error> extends DispatchEvent {
        /**
         */
        protected static _EventManager: IEventManagerStatic;
        /**
         */
        error: E;
        /**
         */
        logLevel: number;
        /**
         * @param {string} name The name of the event.
         * @param {any} sender The sender of the event.
         * @param {E} error The error that occurred, resulting in the event.
         * @param {number} logLevel The severity level of the error
         */
        static dispatch<E extends Error>(name: string, sender: any, error: E, logLevel: number): ErrorEvent<E>;
        /**
         * @param {string} name The name of the event.
         * @param {any} sender The sender of the event.
         * @param {string} direction='direct' Equivalent to EventManager.DIRECT.
         * @param {E} error The error that occurred, resulting in the event.
         */
        initialize(name: string, sender: any, direction?: 'direct', error?: E): void;
        /**
         * @param {string} name The name of the event.
         * @param {any} sender The sender of the event.
         * @param {string} direction This is always a direct event.
         * @param {E} error The error that occurred, resulting in the event.
         */
        initialize(name: string, sender: any, direction?: string, error?: E): void;
    }
    /**
     */
    function IErrorEventStatic(_EventManager?: IEventManagerStatic): IErrorEventStatic;
    /**
     */
    interface IErrorEventStatic {
        /**
         * @param {string} name The name of the event.
         * @param {any} sender The sender of the event.
         * @param {E} error The error that occurred, resulting in the event.
         * @param {number} logLevel The severity level of the error
         */
        dispatch<E extends Error>(name: string, sender: any, error: E, logLevel: number): ErrorEvent<E>;
    }
}
/**
 */
export declare class Control {
    /**
     */
    protected static _log: debug.Log;
    /**
     */
    protected static _dom: ui.Dom;
    /**
     */
    protected static _parser: expressions.Parser;
    /**
     */
    protected static _ContextManager: observable.IContextManagerStatic;
    /**
     */
    protected static _EventManager: events.IEventManagerStatic;
    /**
     */
    protected static _Promise: async.IPromise;
    /**
     */
    private static __eventListeners;
    /**
     */
    uid: string;
    /**
     */
    type: string;
    /**
     */
    priority: number;
    /**
     */
    parent: ui.TemplateControl;
    /**
     */
    element: HTMLElement;
    /**
     */
    attributes: ui.Attributes;
    /**
     */
    dom: ui.Dom;
    /**
     */
    utils: Utils;
    /**
     */
    protected _log: debug.Log;
    /**
     * @param {Control} control The control with which to find the root.
     */
    static getRootControl(control: Control): ui.TemplateControl;
    /**
     * @param {Control} control The control to load.
     */
    static load(control: Control): async.IThenable<void>;
    /**
     * @param {Control} control The Control to dispose.
     */
    static dispose(control: Control): void;
    /**
     * @param {Control} control The control whose parent will be removed.
     */
    static removeParent(control: Control): void;
    /**
     * @param {Control} control The control having its event listeners removed.
     */
    static removeEventListeners(control: Control): void;
    /**
     */
    static getInstance(): Control;
    /**
     * @param {string} uid The uid of the control associated with the remove function.
     * @param {IRemoveListener} listener The remove function to add.
     */
    private static __addRemoveListener(uid, listener);
    /**
     * @param {string} uid The uid of the control associated with the remove function.
     * @param {IRemoveListener} listener The remove function to add.
     */
    private static __spliceRemoveListener(uid, listener);
    /**
     * @param {Control} control The at which to start searching for key/value pairs.
     * @param {string} key The key to search for on all the controls in the tree.
     * @param {string} value The expected value used to find similar controls.
     */
    private static __getControls(control, key, value);
    /**
     */
    constructor();
    /**
     */
    initialize(): void;
    /**
     */
    loaded(): void;
    /**
     * @param {string} name The string name with which to populate the returned controls array.
     */
    getControlsByName(name: string): Array<Control>;
    /**
     * @param {string} type The type used to find controls (e.g. 'plat-foreach')
     */
    getControlsByType<T extends Control>(type: string): Array<T>;
    /**
     * @param {new () => T} Constructor The constructor used to find controls.
     */
    getControlsByType<T extends Control>(Constructor: new () => T): Array<T>;
    /**
     * @param {EventTarget} element The element to add the event listener to.
     * @param {string} type The type of event to listen to.
     * @param {ui.IGestureListener} listener The listener to fire when the event occurs.
     * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
     * of event propagation.
     */
    addEventListener(element: EventTarget, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
    /**
     * @param {EventTarget} element The element to add the event listener to.
     * @param {string}  type The type of event to listen to.
     * @param {EventListener} listener The listener to fire when the event occurs.
     * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
     * of event propagation.
     */
    addEventListener(element: EventTarget, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
    /**
     * @param {IIdentifierChangedListener<T>} listener The method called when the property is changed.
     * This method will have its 'this' context set to the control instance.
     * @param {string} identifier? The property string that denotes the item in the context (e.g. "foo.bar.baz" is observing the
     * property `baz` in the object `bar` in the object `foo` in the control's context.
     */
    observe<T>(listener: (value: T, oldValue: T, identifier: string) => void, identifier?: string): IRemoveListener;
    /**
     * @param {IIdentifierChangedListener<T>} listener The method called when the property is changed. This method
     * will have its 'this' context set to the control instance.
     * @param {number} index? The index that denotes the item in the context if the context is an Array.
     */
    observe<T>(listener: (value: T, oldValue: T, index: number) => void, index?: number): IRemoveListener;
    /**
     * @param {(changes: Array<observable.IArrayChanges<any>>, identifier: string) => void} listener The method called
     * after an array-changing method is called. This method will have its 'this' context set to the control instance.
     * @param {string} identifier? The property string that denotes the array in the context.
     */
    observeArray<T>(listener: (changes: Array<observable.IArrayChanges<T>>, identifier: string) => void, identifier?: string): IRemoveListener;
    /**
     * @param {(changes: Array<observable.IArrayChanges<T>>, identifier: number) => void} listener The method called
     * after an array-changing method is called. This method will have its 'this' context set to the control instance.
     * @param {number} identifier? The index that denotes the array in the context if the context is an Array.
     */
    observeArray<T>(listener: (changes: Array<observable.IArrayChanges<T>>, identifier: number) => void, identifier?: number): IRemoveListener;
    /**
     * @param {IIdentifierChangedListener<T>} listener The listener to call when the expression identifer values change.
     * @param {string} expression The expression string to watch for changes.
     */
    observeExpression<T>(listener: (value: T, oldValue: T, expression: string) => void, expression: string): IRemoveListener;
    /**
     * @param {IIdentifierChangedListener<T>} listener The listener to call when the expression identifer values change.
     * @param {expressions.IParsedExpression} expression The expression string to watch for changes.
     */
    observeExpression<T>(listener: (value: T, oldValue: T, expression: string) => void, expression: expressions.IParsedExpression): IRemoveListener;
    /**
     * @param {string} expression The expression string to evaluate.
     * @param {IObject<any>} aliases Optional alias values to parse with the expression
     */
    evaluateExpression(expression: string, aliases?: IObject<any>): any;
    /**
     * @param {string} expression The expression string to evaluate.
     * @param {IObject<any>} aliases Optional alias values to parse with the expression
     */
    evaluateExpression(expression: expressions.IParsedExpression, aliases?: IObject<any>): any;
    /**
     * @param {string} property The property identifer
     */
    findProperty(property: string): IControlProperty;
    /**
     * @param {string} name The name of the event to send, coincides with the name used in the
     * control.on() method.
     * @param {string} direction='up' Equivalent to EventManager.UP
     * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
     */
    dispatchEvent(name: string, direction?: 'up', ...args: any[]): void;
    /**
     * @param {string} name The name of the event to send, coincides with the name used in the
     * control.on() method.
     * @param {string} direction='down' Equivalent to EventManager.DOWN
     * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
     */
    dispatchEvent(name: string, direction?: 'down', ...args: any[]): void;
    /**
     * @param {string} name The name of the event to send, coincides with the name used in the
     * control.on() method.
     * @param {string} direction='direct' Equivalent to EventManager.DIRECT
     * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
     */
    dispatchEvent(name: string, direction?: 'direct', ...args: any[]): void;
    /**
     * @param {string} name The name of the event to send, coincides with the name used in the
     * control.on() method.
     * @param {string} direction The direction in which to send the event.
     * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
     */
    dispatchEvent(name: string, direction?: string, ...args: any[]): void;
    /**
     * @param {string} name The name of the event, cooinciding with the DispatchEvent name.
     * @param {(ev: events.DispatchEvent, ...args: Array<any>) => void} listener The method called when the
     * DispatchEvent is fired.
     */
    on(name: string, listener: (ev: events.DispatchEvent, ...args: any[]) => void): IRemoveListener;
    /**
     */
    dispose(): void;
}
/**
 */
export declare function IControlFactory(_parser?: expressions.Parser, _ContextManager?: observable.IContextManagerStatic, _EventManager?: events.IEventManagerStatic, _Promise?: async.IPromise, _dom?: ui.Dom, _log?: debug.Log): IControlFactory;
/**
 */
export interface IControlFactory {
    /**
     * @param {Control} control The control with which to find the root.
     */
    getRootControl(control: Control): ui.TemplateControl;
    /**
     * @param {Control} control The control to load.
     */
    load(control: Control): async.IThenable<void>;
    /**
     * @param {Control} control The Control to dispose.
     */
    dispose(control: Control): void;
    /**
     * @param {Control} control The control whose parent will be removed.
     */
    removeParent(control: Control): void;
    /**
     * @param {Control} control The control having its event listeners removed.
     */
    removeEventListeners(control: Control): void;
    /**
     */
    getInstance(): Control;
}
/**
 */
export interface IControlProperty {
    /**
     */
    expresssion: expressions.IParsedExpression;
    /**
     */
    value: any;
    /**
     */
    control: Control;
}
/**
 */
export declare class AttributeControl extends Control {
    /**
     */
    templateControl: ui.TemplateControl;
    /**
     * @param {AttributeControl} control The AttributeControl to dispose.
     */
    static dispose(control: AttributeControl): void;
    /**
     */
    static getInstance(): AttributeControl;
}
/**
 */
export declare function IAttributeControlFactory(): IAttributeControlFactory;
/**
 */
export interface IAttributeControlFactory {
    /**
     * @param {AttributeControl} control The AttributeControl to dispose.
     */
    dispose(control: AttributeControl): void;
    /**
     */
    getInstance(): AttributeControl;
}
/**
 */
export declare module ui {
    /**
     */
    class TemplateControl extends Control {
        /**
         */
        protected static _ResourcesFactory: IResourcesFactory;
        /**
         */
        protected static _BindableTemplatesFactory: IBindableTemplatesFactory;
        /**
         */
        protected static _managerCache: storage.Cache<processing.ElementManager>;
        /**
         */
        protected static _templateCache: storage.TemplateCache;
        /**
         */
        protected static _parser: expressions.Parser;
        /**
         */
        protected static _http: async.Http;
        /**
         */
        protected static _Promise: async.IPromise;
        /**
         */
        protected static _log: debug.Log;
        /**
         */
        private static __resourceCache;
        /**
         */
        priority: number;
        /**
         */
        context: any;
        /**
         */
        name: string;
        /**
         */
        absoluteContextPath: string;
        /**
         */
        resources: Resources;
        /**
         */
        hasOwnContext: boolean;
        /**
         */
        templateString: string;
        /**
         */
        templateUrl: string;
        /**
         */
        innerTemplate: DocumentFragment;
        /**
         */
        bindableTemplates: BindableTemplates;
        /**
         */
        controls: Array<Control>;
        /**
         */
        elementNodes: Array<Node>;
        /**
         */
        startNode: Comment;
        /**
         */
        endNode: Comment;
        /**
         */
        replaceWith: string;
        /**
         */
        root: TemplateControl;
        /**
         * @param {string} expression The expression string (e.g. `foo + foo`).
         * @param {ui.TemplateControl} control? The control used for evaluation context.
         * @param {IObject<any>} aliases? An optional alias object containing resource alias values (property keys should
         * not include the `@` character).
         */
        static evaluateExpression(expression: string, control?: TemplateControl, aliases?: IObject<any>): any;
        /**
         * @param {expressions.IParsedExpression} expression A parsed expression object created using the
         * expressions.Parser injectable.
         * @param {ui.TemplateControl} control? The control used for evaluation context.
         * @param {IObject<any>} aliases? An optional alias object containing resource alias values (property keys should
         * not include the `@` character).
         */
        static evaluateExpression(expression: expressions.IParsedExpression, control?: TemplateControl, aliases?: IObject<any>): any;
        /**
         * @param {ui.TemplateControl} control The control used as the starting point for finding resources.
         * @param {Array<string>} aliases An array of aliases to search for.
         * @param {IObject<any>} resources? An optional resources object to extend, if no resources object is passed in a
         * new one will be created.
         */
        static getResources(control: TemplateControl, aliases: Array<string>, resources?: IObject<any>): IObject<any>;
        /**
         * @param {ui.TemplateControl} control The control on which to start searching for the resource alias.
         * @param {string} alias The alias to search for.
         */
        static findResource(control: TemplateControl, alias: string): {
            resource: IResource;
            control: TemplateControl;
        };
        /**
         * @param {ui.TemplateControl} control A control to dispose.
         */
        static dispose(control: TemplateControl): void;
        /**
         * @param {ui.TemplateControl} control The control serving as the root control to load.
         */
        static loadControl(control: TemplateControl): void;
        /**
         * @param {ui.TemplateControl} control The control whose context changed.
         * @param {any} newValue The new value of the control's context.
         * @param {any} oldValue The old value of the control's context.
         */
        static contextChanged(control: TemplateControl, newValue: any, oldValue: any): void;
        /**
         * @param {ui.TemplateControl} control The control whose context resources will be set.
         */
        static setContextResources(control: TemplateControl): void;
        /**
         * @param {ui.TemplateControl} control The control whose element should be removed.
         */
        static removeElement(control: TemplateControl): void;
        /**
         * @param {ui.TemplateControl} control The control on which to set the absoluteContextPath.
         * @param {string} path The path to set on the control.
         */
        static setAbsoluteContextPath(control: TemplateControl, path: string): void;
        /**
         * @param {ui.TemplateControl} control The control whose template is being determined.
         * @param {string} templateUrl? The potential template URL to use to grab the template.
         */
        static determineTemplate(control: TemplateControl, templateUrl?: string): async.IThenable<DocumentFragment>;
        /**
         * @param {ui.TemplateControl} control The control to be detached.
         */
        static detach(control: TemplateControl): void;
        /**
         */
        static getInstance(): TemplateControl;
        /**
         * @param {any} newValue? The new value of the context.
         * @param {any} oldValue The old value of the context.
         */
        contextChanged(newValue: any, oldValue: any): void;
        /**
         */
        setTemplate(): void;
        /**
         * @param {Array<string>} aliases An array of aliases to search for.
         * @param {IObject<any>} resources? An optional resources object to extend,
         * if no resources object is passed in a new one will be created.
         */
        getResources(aliases: Array<string>, resources?: IObject<any>): IObject<any>;
        /**
         * @param {string} alias The alias to search for.
         */
        findResource(alias: string): {
            resource: IResource;
            control: TemplateControl;
        };
        /**
         * @param {string} expression The expression string to evaluate.
         * @param {any} context? An optional context with which to parse. If
         * no context is specified, the control.context will be used.
         */
        evaluateExpression(expression: string, context?: any): any;
        /**
         * @param {expressions.IParsedExpression} expression The previously parsed expression to evaluate.
         * @param {any} context? An optional context with which to parse. If
         * no context is specified, the control.context will be used.
         */
        evaluateExpression(expression: expressions.IParsedExpression, context?: any): any;
    }
    /**
     */
    function ITemplateControlFactory(_ResourcesFactory?: IResourcesFactory, _BindableTemplatesFactory?: IBindableTemplatesFactory, _managerCache?: storage.Cache<processing.ElementManager>, _templateCache?: storage.TemplateCache, _parser?: expressions.Parser, _http?: async.Http, _Promise?: async.IPromise, _log?: debug.Log): ITemplateControlFactory;
    /**
     */
    interface ITemplateControlFactory {
        /**
         * @param {string} expression The expression string (e.g. `foo + foo`).
         * @param {ui.TemplateControl} control? The control used for evaluation context.
         * @param {IObject<any>} aliases? An optional alias object containing resource alias values
         */
        evaluateExpression(expression: string, control?: TemplateControl, aliases?: IObject<any>): any;
        /**
         * @param {expressions.IParsedExpression} expression A parsed expression object created using the
         * expressions.Parser injectable.
         * @param {ui.TemplateControl} control? The control used for evaluation context.
         * @param {IObject<any>} aliases? An optional alias object containing resource alias values
         */
        evaluateExpression(expression: expressions.IParsedExpression, control?: TemplateControl, aliases?: IObject<any>): any;
        /**
         * @param {ui.TemplateControl} control The control used as the starting point for finding resources.
         * @param {Array<string>} aliases An array of aliases to search for.
         * @param {IObject<any>} resources? An optional resources object to extend,
         * if no resources object is passed in a new one will be created.
         */
        getResources(control: TemplateControl, aliases: Array<string>, resources?: IObject<any>): IObject<any>;
        /**
         * @param {ui.TemplateControl} control The control on which to start searching for the resource alias.
         * @param {string} alias The alias to search for.
         */
        findResource(control: TemplateControl, alias: string): {
            resource: IResource;
            control: TemplateControl;
        };
        /**
         * @param {ui.TemplateControl} control A control to dispose.
         */
        dispose(control: TemplateControl): void;
        /**
         * @param {ui.TemplateControl} control The control serving as the root control to load.
         */
        loadControl(control: TemplateControl): void;
        /**
         * @param {ui.TemplateControl} control The control whose context changed.
         * @param {any} newValue The new value of the control's context.
         * @param {any} oldValue The old value of the control's context.
         */
        contextChanged(control: TemplateControl, newValue: any, oldValue: any): void;
        /**
         * @param {ui.TemplateControl} control The control whose context resources will be set.
         */
        setContextResources(control: TemplateControl): void;
        /**
         * @param {ui.TemplateControl} control The control whose element should be removed.
         */
        removeElement(control: TemplateControl): void;
        /**
         * @param {ui.TemplateControl} control The control on which to set the absoluteContextPath.
         * @param {string} path The path to set on the control.
         */
        setAbsoluteContextPath(control: TemplateControl, path: string): void;
        /**
         * @param {ui.TemplateControl} control The control whose template is being determined.
         * @param {string} templateUrl? The potential template URL to use to grab the template.
         */
        determineTemplate(control: TemplateControl, templateUrl?: string): async.IThenable<DocumentFragment>;
        /**
         * @param {ui.TemplateControl} control The control to be detached.
         */
        detach(control: TemplateControl): void;
        /**
         */
        getInstance(): TemplateControl;
    }
    /**
     */
    class BindControl extends TemplateControl implements observable.ISupportTwoWayBinding {
        /**
         */
        priority: number;
        /**
         */
        protected _listeners: Array<IPropertyChangedListener<any>>;
        /**
         * @param {IPropertyChangedListener<any>} listener The function that acts as a listener.
         */
        onInput(listener: (newValue: any, oldValue: any) => void): IRemoveListener;
        /**
         * @param {observable.IImplementTwoWayBinding} binder The control that facilitates the
         * databinding.
         */
        observeProperties(binder: observable.IImplementTwoWayBinding): void;
        /**
         * @param {any} newValue The new value of the property after the change.
         * @param {any} oldValue? The old value of the property prior to the change.
         */
        inputChanged(newValue: any, oldValue?: any): void;
        /**
         */
        dispose(): void;
    }
    /**
     */
    class ViewControl extends TemplateControl implements ISupportNavigation {
        /**
         */
        hasOwnContext: boolean;
        /**
         */
        navigator: routing.Navigator;
        /**
         * @param {ui.ViewControl} control A control to dispose.
         */
        static dispose(control: TemplateControl): void;
        /**
         */
        static getInstance(): ViewControl;
        /**
         */
        canNavigateFrom(): any;
        /**
         */
        canNavigateTo(parameters: any, query: any): any;
        /**
         */
        navigatingFrom(): any;
        /**
         */
        navigatedTo(parameters: any, query: any): any;
    }
    /**
     */
    interface ISupportNavigation {
        /**
         */
        navigator?: routing.Navigator;
        /**
         */
        canNavigateFrom(): any;
        /**
         */
        canNavigateTo(parameters: any, query: any): any;
        /**
         */
        navigatingFrom(): any;
        /**
         */
        navigatedTo(parameters: any, query: any): any;
    }
    /**
     */
    class Dom {
        protected static _inject: any;
        /**
         */
        protected _domEvents: ui.DomEvents;
        /**
         * @param {Node} element The element to add the event listener to.
         * @param {string} type The type of event to listen to.
         * @param {ui.IGestureListener} listener The listener to fire when the event occurs.
         * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
         * of event propagation.
         */
        addEventListener(element: Node, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        /**
         * @param {Window} element The window object.
         * @param {string} type The type of event to listen to.
         * @param {ui.IGestureListener} listener The listener to fire when the event occurs.
         * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
         * of event propagation.
         */
        addEventListener(element: Window, type: string, listener: ui.IGestureListener, useCapture?: boolean): IRemoveListener;
        /**
         * @param {Node} element The element to add the event listener to.
         * @param {string} type The type of event to listen to.
         * @param {EventListener} listener The listener to fire when the event occurs.
         * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
         * of event propagation.
         */
        addEventListener(element: Node, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
        /**
         * @param {Window} element The window object.
         * @param {string} type The type of event to listen to.
         * @param {EventListener} listener The listener to fire when the event occurs.
         * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
         * of event propagation.
         */
        addEventListener(element: Window, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
        /**
         * @param {Array<Node>} nodeList A Node Array to be appended to the DocumentFragment
         */
        appendChildren(nodeList: Array<Node>): DocumentFragment;
        /**
         * @param {NodeList} nodeList A NodeList to be appended to the DocumentFragment
         */
        appendChildren(nodeList: NodeList): DocumentFragment;
        /**
         * @param {NodeList} nodeList A NodeList to be appended to the root/DocumentFragment.
         * @param {Node} root? An optional Node to append the nodeList.
         */
        appendChildren(nodeList: Array<Node>, root?: Node): Node;
        /**
         * @param {NodeList} nodeList A NodeList to be appended to the root/DocumentFragment.
         * @param {Node} root? An optional Node to append the nodeList.
         */
        appendChildren(nodeList: NodeList, root?: Node): Node;
        /**
         * @param {Array<Node>} nodeList A Node Array to be appended to the DocumentFragment
         */
        cloneChildren(nodeList: Array<Node>): DocumentFragment;
        /**
         * @param {NodeList} nodeList A NodeList to be appended to the DocumentFragment
         */
        cloneChildren(nodeList: NodeList): DocumentFragment;
        /**
         * @param {NodeList} nodeList A NodeList to be appended to the root/DocumentFragment.
         * @param {Node} root? An optional Node to append the nodeList.
         */
        cloneChildren(nodeList: Array<Node>, root?: Node): Node;
        /**
         * @param {NodeList} nodeList A NodeList to be appended to the root/DocumentFragment.
         * @param {Node} root? An optional Node to append the nodeList.
         */
        cloneChildren(nodeList: NodeList, root?: Node): Node;
        /**
         * @param {Node} node The DOM Node to clear.
         */
        clearNode(node: Node): void;
        /**
         * @param {Array<Node>} nodeList The Node Array to remove from the parent Node.
         * @param {Node} parent? The parent Node used to remove the nodeList.
         */
        clearNodeBlock(nodeList: Array<Node>, parent?: Node): void;
        /**
         * @param {NodeList} nodeList The NodeList to remove from the parent Node.
         * @param {Node} parent? The parent Node used to remove the nodeList.
         */
        clearNodeBlock(nodeList: NodeList, parent?: Node): void;
        /**
         * @param {Node} node The Node to set innerHTML.
         * @param {string} html HTML string to be put inside the node.
         */
        setInnerHtml(node: Node, html: string): Node;
        /**
         * @param {Node} parent The parent node into which to insert nodes.
         * @param {Array<Node>} nodes The Node Array to insert into the parent.
         * @param {Node} endNode? An optional endNode to use to insert nodes.
         */
        insertBefore(parent: Node, nodes: Array<Node>, endNode?: Node): Array<Node>;
        /**
         * @param {Node} parent The parent node into which to insert nodes.
         * @param {NodeList} nodes The NodeList to insert into the parent.
         * @param {Node} endNode? An optional endNode to use to insert nodes.
         */
        insertBefore(parent: Node, nodes: NodeList, endNode?: Node): Array<Node>;
        /**
         * @param {Node} parent The parent node into which to insert nodes.
         * @param {DocumentFragment} fragment The DocumentFragment to insert into the parent.
         * @param {Node} endNode? An optional endNode to use to insert nodes.
         */
        insertBefore(parent: Node, fragment: DocumentFragment, endNode?: Node): Array<Node>;
        /**
         * @param {Node} parent The parent node into which to insert nodes.
         * @param {Node} node The Node to insert into the parent.
         * @param {Node} endNode? An optional endNode to use to insert nodes.
         */
        insertBefore(parent: Node, node: Node, endNode?: Node): Array<Node>;
        /**
         * @param {Node} node The Node to replace.
         */
        replace(node: Node): Array<Node>;
        /**
         * @param {Node} node The Node to remove from its parent.
         * @param {HTMLElement} newElement The HTMLElement to populate with childNodes and add to the
         * element's parent.
         */
        replaceWith(node: Node, newElement: HTMLElement): HTMLElement;
        /**
         * @param {Node} node The Node to remove from its parent.
         * @param {Element} newElement The Element to populate with childNodes and add to the
         * element's parent.
         */
        replaceWith(node: Node, newElement: Element): Element;
        /**
         * @param {Node} node The Node to remove from its parent.
         * @param {Node} newElement The Node to populate with childNodes and add to the
         * element's parent.
         */
        replaceWith(node: Node, newNode: Node): Node;
        /**
         * @param {string} html The DOM string.
         */
        serializeHtml(html: string): DocumentFragment;
        /**
         * @param {Node} startNode The starting node, which will not be removed.
         * @param {Node} endNode The ending node, which will not be removed.
         */
        removeBetween(startNode: Node, endNode?: Node): void;
        /**
         * @param {Node} startNode The first node to remove.
         * @param {Node} endNode The last node to remove.
         */
        removeAll(startNode: Node, endNode?: Node): void;
        /**
         * @param {Element} element The element to which the class name is being added.
         * @param {string} className The class name or space delimited class names to add to the element.
         */
        addClass(element: Element, className: string): void;
        /**
         * @param {Element} element The element from which the class name is being removed.
         * @param {string} className The class name or space delimited class names to remove from the element.
         */
        removeClass(element: Element, className: string): void;
        /**
         * @param {Element} element The element on which the class name is being toggled.
         * @param {string} className The class name or space delimited class names to toggle on the element.
         */
        toggleClass(element: Element, className: string): void;
        /**
         * @param {Element} element The element on which the class name is being toggled.
         * @param {string} oldClass The class name being replaced.
         * @param {string} newClass The class name doing the replacing.
         */
        replaceClass(element: Element, oldClass: string, newClass: string): void;
        /**
         * @param {Element} element The element on which the class name is being checked.
         * @param {string} className The class name or space delimited class names to check on the element.
         */
        hasClass(element: Element, className: string): boolean;
        /**
         * @param {string} templateUrl The url where the HTML template is stored.
         */
        getTemplate(templateUrl: string): async.IThenable<DocumentFragment>;
        /**
         * @param {() => void} cb A callback that will fire when the element is visible in the DOM.
         * @param {Element} element The element whose visibility is being inspected.
         */
        whenVisible(cb: () => void, element: Element): IRemoveListener;
    }
    /**
     */
    interface ICustomElementProperty extends IObject<string> {
        /**
         */
        domEvent?: string;
        /**
         */
        animation?: string;
    }
    /**
     */
    interface ICustomElement extends HTMLElement {
        /**
         */
        __plat: ICustomElementProperty;
    }
    /**
     */
    class BindableTemplates {
        /**
         */
        protected _ResourcesFactory: IResourcesFactory;
        /**
         */
        protected _ControlFactory: IControlFactory;
        /**
         */
        protected _TemplateControlFactory: ITemplateControlFactory;
        /**
         */
        protected _ContextManager: observable.IContextManagerStatic;
        /**
         */
        protected _Promise: async.IPromise;
        /**
         */
        protected _managerCache: storage.Cache<processing.ElementManager>;
        /**
         */
        protected _document: Document;
        /**
         */
        protected _ElementManagerFactory: processing.IElementManagerFactory;
        /**
         */
        protected _BindableTemplatesFactory: IBindableTemplatesFactory;
        /**
         */
        protected _log: debug.Log;
        /**
         */
        control: TemplateControl;
        /**
         */
        templates: IObject<async.IThenable<DocumentFragment>>;
        /**
         */
        cache: IObject<processing.ElementManager>;
        /**
         */
        private __compiledControls;
        /**
         * @param {ui.TemplateControl} control The TemplateControl
         * containing the new BindableTemplates object, used for data
         * context inheritance for templates.
         * @param {ui.BindableTemplates} original? An optional BindableTemplates
         * object to copy.
         */
        static create(control: TemplateControl, original?: BindableTemplates): BindableTemplates;
        /**
         * @param {ui.TemplateControl} control The control whose bindableTemplates will be disposed.
         */
        static dispose(control: TemplateControl): void;
        /**
         * @param {ui.TemplateControl} control The potential bound control.
         */
        static isBoundControl(control: TemplateControl): boolean;
        /**
         * @param {Element} template An Element representing the DOM template.
         * @param {string} relativeIdentifier? The identifier string relative to this control's context
         * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the
         * most efficient way of specifying context, else the framework has to search for the
         * object.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         */
        once(template: Element, relativeIdentifier?: string, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @param {Element} template An Element representing the DOM template.
         * @param {number} relativeIdentifier? The identifier number relative to this control's context
         * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         */
        once(template: Element, relativeIdentifier?: number, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @param {Array<Node>} template A node Array representing the DOM template.
         * @param {string} relativeIdentifier? The identifier string relative to this control's context
         * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the
         * most efficient way of specifying context, else the framework has to search for the
         * object.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         */
        once(template: Array<Node>, relativeIdentifier?: string, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @param {Array<Node>} template A node Array representing the DOM template.
         * @param {number} relativeIdentifier? The identifier number relative to this control's context
         * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         */
        once(template: Array<Node>, relativeIdentifier?: number, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @param {NodeList} template A NodeList representing the DOM template.
         * @param {string} relativeIdentifier? The identifier string relative to this control's context
         * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the
         * most efficient way of specifying context, else the framework has to search for the
         * object.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         */
        once(template: NodeList, relativeIdentifier?: string, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @param {NodeList} template A NodeList representing the DOM template.
         * @param {number} relativeIdentifier? The identifier number relative to this control's context
         * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         */
        once(template: NodeList, relativeIdentifier?: number, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @param {DocumentFragment} template A DocumentFragment representing the DOM template.
         * @param {string} relativeIdentifier? The identifier string relative to this control's context
         * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the
         * most efficient way of specifying context, else the framework has to search for the
         * object.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         */
        once(template: DocumentFragment, relativeIdentifier?: string, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @param {DocumentFragment} template A DocumentFragment representing the DOM template.
         * @param {number} relativeIdentifier? The identifier number relative to this control's context
         * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         */
        once(template: DocumentFragment, relativeIdentifier?: number, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @param {Node} template A Node representing the DOM template.
         * @param {string} relativeIdentifier? The identifier string relative to this control's context
         * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the
         * most efficient way of specifying context, else the framework has to search for the
         * object.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         */
        once(template: Node, relativeIdentifier?: string, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @param {Node} template A Node representing the DOM template.
         * @param {number} relativeIdentifier? The identifier number relative to this control's context
         * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         */
        once(template: Node, relativeIdentifier?: number, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @param {string} template A template string representing the DOM template.
         * @param {string} relativeIdentifier? The identifier string relative to this control's context
         * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the
         * most efficient way of specifying context, else the framework has to search for the
         * object.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         */
        once(template: string, relativeIdentifier?: string, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @param {string} template A template string representing the DOM template.
         * @param {number} relativeIdentifier? The identifier number relative to this control's context
         * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         */
        once(template: string, relativeIdentifier?: number, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @param {string} key The key used to retrieve the template.
         * @param {string} relativeIdentifier? The identifier string relative to this control's context
         * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the
         * most efficient way of specifying context, else the framework has to search for the
         * object.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         */
        bind(key: string, relativeIdentifier?: string, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @param {string} key The key used to retrieve the template.
         * @param {number} relativeIdentifier? The identifier number relative to this control's context
         * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         */
        bind(key: string, relativeIdentifier?: number, resources?: IObject<IResource>): async.IThenable<DocumentFragment>;
        /**
         * @param {string} key The key used to store the template.
         * @param {Element} template An Element representing the DOM template.
         */
        add(key: string, template: Element): void;
        /**
         * @param {string} key The key used to store the template.
         * @param {Array<Node>} template A node Array representing the DOM template.
         */
        add(key: string, template: Array<Node>): void;
        /**
         * @param {string} key The key used to store the template.
         * @param {NodeList} template A NodeList representing the DOM template.
         */
        add(key: string, template: NodeList): void;
        /**
         * @param {string} key The key used to store the template.
         * @param {DocumentFragment} template A DocumentFragment representing the DOM template.
         */
        add(key: string, template: DocumentFragment): void;
        /**
         * @param {string} key The key used to store the template.
         * @param {Node} template A Node representing the DOM template.
         */
        add(key: string, template: Node): void;
        /**
         * @param {string} key The key used to store the template.
         * @param {string} template A template string representing the DOM template.
         */
        add(key: string, template: string): void;
        /**
         * @param {number} index The index of the bound TemplateControl
         * in the child control Array to replace.
         * @param {string} key The key used to retrieve the template.
         * @param {string} relativeIdentifier? The identifier string relative to this control's context
         * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the
         * most efficient way of specifying context, else the framework has to search for the
         * object.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         */
        replace(index: number, key: string, relativeIdentifier?: string, resources?: IObject<IResource>): async.IThenable<Array<Node>>;
        /**
         * @param {number} index The index of the bound TemplateControl
         * in the child control Array to replace.
         * @param {string} key The key used to retrieve the template.
         * @param {number} relativeIdentifier? The identifier number relative to this control's context
         * (e.g. '1' would signify the object this.context[1]). Only necessary when context is an array.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         */
        replace(index: number, key: string, relativeIdentifier?: number, resources?: IObject<IResource>): async.IThenable<Array<Node>>;
        /**
         */
        dispose(): void;
        /**
         * @param {string} key The key used to retrieve the template.
         * @param {string} relativeIdentifier? The identifier string relative to this control's context
         * (e.g. 'foo.bar.baz' would signify the object this.context.foo.bar.baz). This is the
         * most efficient way of specifying context, else the framework has to search for the
         * object.
         * @param {IObject<IResource>} resources? An object used as the resources for any top-level
         * controls created in the template.
         * @param {number} index? An optional index only to be used if the newly bound template is intended to
         * replace an existing Control in the child controls Array and its element in the DOM.
         */
        protected _bind(key: any, relativeIdentifier?: any, resources?: IObject<IResource>, index?: number): async.IThenable<any>;
        /**
         * @param {string} key The template key.
         * @param {processing.INodeMap} nodeMap The node map to bind.
         */
        protected _bindTemplate(key: string, nodeMap: processing.INodeMap): async.IThenable<DocumentFragment>;
        /**
         * @param {string} key The template key used to grab the ElementManager.
         * @param {processing.INodeMap} nodeMap The node map to bind.
         */
        protected _bindNodeMap(key: string, nodeMap: processing.INodeMap): async.IThenable<void>;
        /**
         * @param {string} key The template key.
         * @param {DocumentFragment} template The HTML template being bound.
         */
        protected _compile(key: string, template: DocumentFragment): void;
        /**
         * @param {ui.TemplateControl} control The newly created control used to bind the template.
         * @param {processing.INodeMap} nodeMap The newly created node map to bind.
         * @param {string} key The template key.
         */
        protected _compileNodeMap(control: TemplateControl, nodeMap: processing.INodeMap, key: string): void;
        /**
         * @param {ui.TemplateControl} uiControl The newly created control used to bind the template.
         * @param {Node} template The template being compiled.
         * @param {string} childContext? A potential child context string identifier.
         */
        protected _createNodeMap(uiControl: TemplateControl, template: Node, childContext?: string): processing.INodeMap;
        /**
         * @param {string} key The template key.
         * @param {DocumentFragment} template The template being compiled or being bound.
         * @param {IObject<ui.IResource>} resources? A set of resources to add to the control used to
         * compile/bind this template.
         */
        protected _createBoundControl(key: string, template: DocumentFragment, childContext?: string, resources?: IObject<IResource>): TemplateControl;
    }
    /**
     */
    function IBindableTemplatesFactory(): IBindableTemplatesFactory;
    /**
     */
    interface IBindableTemplatesFactory {
        /**
         * @param {ui.TemplateControl} control The TemplateControl
         * containing the new BindableTemplates object, used for data
         * context inheritance for templates.
         * @param {ui.BindableTemplates} original? An optional BindableTemplates
         * object to copy.
         */
        create(control: TemplateControl, original?: BindableTemplates): BindableTemplates;
        /**
         * @param {ui.TemplateControl} control The TemplateControl
         * containing the new BindableTemplates object, used for data
         * context inheritance for templates.
         * @param {ui.BindableTemplates} original? An optional BindableTemplates
         * object to copy.
         */
        create(control: TemplateControl, original?: BindableTemplates): BindableTemplates;
        /**
         * @param {ui.TemplateControl} control The control whose bindableTemplates will be disposed.
         */
        dispose(control: TemplateControl): void;
        /**
         * @param {ui.TemplateControl} control The potential bound control.
         */
        isBoundControl(control: TemplateControl): boolean;
    }
    /**
     */
    class Attributes {
        [property: string]: any;
        /**
         */
        private __listeners;
        /**
         */
        private __control;
        static getInstance(): Attributes;
        /**
         * @param {Control} control The function that acts as a listener.
         * @param {IObject<string>} attributes The camelCased attribute properties and their values.
         */
        initialize(control: Control, attributes: IObject<string>): void;
        /**
         * @param {IPropertyChangedListener} listener The listener function to be called when the attribute changes.
         * @param {string} key The attribute to observe for changes (e.g. 'src').
         */
        observe(listener: (newValue: any, oldValue: any) => void, key: string): IRemoveListener;
        /**
         * @param {string} key The attribute being observed for changes (e.g. 'src').
         * @param {any} newValue The new value of the attribute.
         * @param {any} oldValue The previous value of the attribute.
         */
        protected _attributeChanged(key: string, newValue: any, oldValue: any): void;
    }
    function IAttributesFactory(): typeof Attributes;
    /**
     */
    class Resources {
        [property: string]: any;
        /**
         */
        static INJECTABLE: string;
        /**
         */
        static OBJECT: string;
        /**
         */
        static OBSERVABLE: string;
        /**
         */
        static LITERAL: string;
        /**
         */
        static FUNCTION: string;
        /**
         */
        protected static _ContextManager: observable.IContextManagerStatic;
        /**
         */
        protected static _regex: expressions.Regex;
        /**
         */
        protected static _log: debug.Log;
        /**
         */
        private static __controlResources;
        /**
         */
        private static __resourceTypes;
        /**
         */
        private static __observableResourceRemoveListeners;
        /**
         */
        private __resources;
        /**
         */
        private __bound;
        /**
         */
        private __controlInstance;
        /**
         * @param {ui.TemplateControl} control The control for which to create a resource.
         * @param {ui.IResource} resource The object used to set the resource values.
         */
        static create(control: TemplateControl, resource: IResource): IResource;
        /**
         * @param {ui.TemplateControl} control The control on which to add the resources.
         */
        static addControlResources(control: TemplateControl): void;
        /**
         * @param {ui.Resources} resourcesInstance The instance of the
         * Resources object to bind.
         */
        static bindResources(resourcesInstance: Resources): void;
        /**
         * @param {ui.TemplateControl} control The control whose resources will be disposed.
         * @param {boolean} persist? Whether or not to persist a resource object post
         * disposal or set it to null.
         */
        static dispose(control: TemplateControl, persist?: boolean): void;
        /**
         * @param {Element} element The resources element to parse.
         */
        static parseElement(element: Element): IObject<IResource>;
        /**
         */
        static getInstance(): Resources;
        /**
         * @param {ui.TemplateControl} control The control in charge of the observable resource.
         * @param {ui.IResource} resource The resource to observe.
         */
        protected static _observeResource(control: TemplateControl, resource: IResource): void;
        /**
         * @param {ui.TemplateControl} control The control whose listeners are being removed.
         */
        protected static _removeListeners(control: TemplateControl): void;
        /**
         * @param {ui.TemplateControl} control The root control.
         */
        private static __addRoot(control);
        /**
         * @param {ui.TemplateControl} control The control containing this Resources instance.
         * @param {Element} element? An optional element used to create initial IResource objects.
         */
        initialize(control: TemplateControl, element?: Element): void;
        /**
         * @param {ui.TemplateControl} control The control containing this Resources instance.
         * @param {IObject<IResource>} resources? An optional object used to populate initial
         * IResource objects.
         */
        initialize(control: TemplateControl, resources?: IObject<IResource>): void;
        /**
         * @param {ui.TemplateControl} control The control containing this Resources instance.
         * @param {ui.Resources} resources? An optional Resources object used to populate initial
         * IResource objects.
         */
        initialize(control: TemplateControl, resources?: Resources): void;
        /**
         * @param resources An IObject<IResource> used to add
         * resources, keyed by their alias.
         */
        add(resources: IObject<IResource>): void;
        /**
         * @param {Element} element An Element containing resource element children.
         */
        add(element: Element): void;
    }
    /**
     */
    function IResourcesFactory(_ContextManager?: observable.IContextManagerStatic, _regex?: expressions.Regex, _log?: debug.Log): IResourcesFactory;
    /**
     */
    interface IResourcesFactory {
        /**
         */
        INJECTABLE: string;
        /**
         */
        OBJECT: string;
        /**
         */
        OBSERVABLE: string;
        /**
         */
        LITERAL: string;
        /**
         */
        FUNCTION: string;
        /**
         * @param {ui.TemplateControl} control The control for which to create a resource.
         * @param {ui.IResource} resource The object used to set the resource values.
         */
        create(control: TemplateControl, resource: IResource): IResource;
        /**
         * @param {ui.TemplateControl} control The control on which to add the resources.
         */
        addControlResources(control: TemplateControl): void;
        /**
         * @param {ui.Resources} resourcesInstance The instance of the Resources object.
         */
        bindResources(resourcesInstance: Resources): void;
        /**
         * @param {ui.TemplateControl} control The control whose resources will be disposed.
         * @param {boolean} persist? Whether or not to persist a resource object post
         * disposal or set it to null.
         */
        dispose(control: TemplateControl, persist?: boolean): void;
        /**
         * @param {Element} element The resources element to parse.
         */
        parseElement(element: Element): IObject<IResource>;
        /**
         */
        getInstance(): Resources;
    }
    /**
     */
    interface IResource {
        /**
         */
        type: string;
        /**
         */
        alias?: string;
        /**
         */
        value?: any;
        /**
         */
        initialValue?: any;
    }
    /**
     */
    class DomEvents {
        protected static _inject: any;
        /**
         */
        static config: IDomEventsConfig;
        /**
         */
        static gestures: IGestures<string>;
        /**
         */
        protected _gestures: IGestures<string>;
        /**
         */
        protected _document: Document;
        /**
         */
        protected _compat: Compat;
        /**
         */
        protected _androidVersion: number;
        /**
         */
        protected _android44orBelow: boolean;
        /**
         */
        protected _isActive: boolean;
        /**
         */
        protected _inTouch: boolean;
        /**
         */
        protected _inMouse: boolean;
        /**
         */
        protected _subscribers: IObject<IEventSubscriber>;
        /**
         */
        protected _startEvents: string;
        /**
         */
        protected _moveEvents: string;
        /**
         */
        protected _endEvents: string;
        /**
         */
        protected _gestureCount: IBaseGestures<number>;
        /**
         */
        private __hasMoved;
        /**
         */
        private __hasRelease;
        /**
         */
        private __detectingMove;
        /**
         */
        private __tapCount;
        /**
         */
        private __touchCount;
        /**
         */
        private __cancelDeferredTap;
        /**
         */
        private __cancelDeferredHold;
        /**
         */
        private __cancelRegex;
        /**
         */
        private __pointerEndRegex;
        /**
         */
        private __lastTouchDown;
        /**
         */
        private __swipeOrigin;
        /**
         */
        private __haveSwipeSubscribers;
        /**
         */
        private __lastMoveEvent;
        /**
         */
        private __lastTouchUp;
        /**
         */
        private __capturedTarget;
        /**
         */
        private __focusedElement;
        /**
         */
        private __blurRemover;
        /**
         */
        private __delayedClickRemover;
        /**
         */
        private __ignoreEvent;
        /**
         */
        private __boundPreventDefaultClick;
        /**
         */
        private __reverseMap;
        /**
         */
        private __mappedEventListener;
        /**
         */
        private __mappedCount;
        /**
         */
        private __pointerHash;
        /**
         */
        private __pointerEvents;
        /**
         */
        private __listeners;
        /**
         */
        constructor();
        /**
         * @param {Node} element The node listening for the event.
         * @param {string} type The type of event being listened to.
         * @param {ui.IGestureListener} listener The listener to be fired.
         * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
         */
        addEventListener(element: Node, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
        /**
         * @param {Window} element The window object.
         * @param {string} type The type of event being listened to.
         * @param {ui.IGestureListener} listener The listener to be fired.
         * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
         */
        addEventListener(element: Window, type: string, listener: IGestureListener, useCapture?: boolean): IRemoveListener;
        /**
         * @param {Node} element The node listening for the event.
         * @param {string} type The type of event being listened to.
         * @param {EventListener} listener The listener to be fired.
         * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
         */
        addEventListener(element: Node, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
        /**
         * @param {Window} element The window object.
         * @param {string} type The type of event being listened to.
         * @param {EventListener} listener The listener to be fired.
         * @param {boolean} useCapture? Whether to fire the event on the capture or bubble phase of propagation.
         */
        addEventListener(element: Window, type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
        /**
         */
        initialize(): void;
        /**
         */
        dispose(): void;
        /**
         * @param {ui.IPointerEvent} ev The touch start event object.
         */
        protected _onTouchStart(ev: IPointerEvent): boolean;
        /**
         * @param {ui.IPointerEvent} ev The touch move event object.
         */
        protected _onTouchMove(ev: IPointerEvent): boolean;
        /**
         * @param {ui.IPointerEvent} ev The touch end event object.
         */
        protected _onTouchEnd(ev: IPointerEvent): boolean;
        /**
         */
        private __clearTempStates();
        /**
         */
        private __resetTouchEnd();
        /**
         * @param {ui.IPointerEvent} ev The touch cancel event object.
         */
        private __handleCanceled(ev);
        /**
         * @param {ui.IPointerEvent} ev The touch end event object.
         */
        private __handleTap(ev);
        /**
         * @param {ui.IPointerEvent} ev The touch end event object.
         */
        private __handleDbltap(ev);
        /**
         * @param {ui.IPointerEvent} ev The touch end event object.
         */
        private __handleRelease(ev);
        /**
         */
        private __handleSwipe();
        /**
         * @param {ui.IPointerEvent} ev The touch move event object.
         * @param {ui.IPointerEvent} originalEv The original touch move event object
         * used for preventing default in the case of an ANDROID device.
         */
        private __handleTrack(ev, originalEv);
        /**
         * @param {ui.IPointerEvent} ev The touch end event object.
         */
        private __handleTrackEnd(ev);
        /**
         * @param {ui.IExtendedEvent} ev The touch event object.
         */
        private __handleMappedEvent(ev);
        /**
         */
        private __getTypes();
        /**
         */
        private __registerTypes();
        /**
         */
        private __unregisterTypes();
        /**
         * @param {string} events The events to begin listening for.
         */
        private __registerType(events);
        /**
         * @param {string} events The events to stop listening for.
         */
        private __unregisterType(events);
        /**
         * @param {ui.ICustomElement} element The element being tied to a custom event.
         * @param {string} type The type of event.
         */
        private __registerElement(element, type);
        /**
         * @param {ui.ICustomElement} element The element being disassociated with the given custom event.
         * @param {string} type The type of event.
         */
        private __unregisterElement(element, type);
        /**
         * @param {ui.IPointerEvent} ev The current point being touched.
         */
        private __setTouchPoint(ev);
        /**
         * @param {EventTarget} target The target to capture.
         */
        private __setCapture(target);
        /**
         * @param {ui.IPointerEvent} ev The current touch point.
         * @param {boolean} remove Whether to remove the touch point or add it.
         */
        private __updatePointers(ev, remove);
        /**
         * @param {ui.ICustomElement} eventTarget The current target of the touch event.
         * @param {string} type The type of event being searched for.
         */
        private __findFirstSubscriber(eventTarget, type);
        /**
         * @param {ui.ICustomElement} eventTarget The current target of the touch event.
         * @param {Array<string>} types An array of the types of events being searched for.
         */
        private __findFirstSubscribers(eventTarget, types);
        /**
         * @param {number} count The number of mapped events registered.
         * @param {string} mappedEvent The mapped event type.
         * @param {boolean} useCapture? Whether the mapped event listener is fired on the capture or bubble phase.
         */
        private __addMappedEvent(count, mappedEvent, useCapture?);
        /**
         * @param {ui.ICustomElement} element The element to remove the listener from.
         * @param {string} type The type of event being removed.
         * @param {ui.IGestureListener} listener The listener being removed.
         * @param {boolean} useCapture? Whether the listener is fired on the capture or bubble phase.
         */
        private __removeEventListener(element, type, listener, useCapture?);
        /**
         * @param {ui.ICustomElement} element The element being removed.
         */
        private __removeElement(element);
        /**
         * @param {ui.IExtendedEvent} ev The event object to be standardized.
         */
        private __standardizeEventObject(ev);
        /**
         * @param {ui.IExtendedEvent} ev The event.
         */
        private __normalizeButtons(ev);
        /**
         * @param {Array<ui.IExtendedEvent>} ev The array of touch event objects
         * to search through.
         */
        private __getTouchIndex(touches);
        /**
         * @param {ui.IExtendedEvent} ev The current event object.
         */
        private __getOffset(ev);
        /**
         * @param {number} x1 The x-coordinate of the first point.
         * @param {number} x2 The x-coordinate of the second point.
         * @param {number} y1 The y-coordinate of the first point.
         * @param {number} y2 The y-coordinate of the second point.
         */
        private __getDistance(x1, x2, y1, y2);
        /**
         * @param {number} dx The change in x position.
         * @param {number} dy The change in y position.
         * @param {number} dtx The change in time in x direction.
         * @param {number} dty The change in time in y direction.
         */
        private __getVelocity(dx, dy, dtx, dty);
        /**
         * @param {number} dx The change in x position.
         * @param {number} dy The change in y position.
         */
        private __getDirection(dx, dy);
        /**
         * @param {ui.IDirection} direction The current vertical and horiztonal directions of movement.
         */
        private __handleOriginChange(direction);
        /**
         * @param {ui.IDirection} direction The current horizontal and vertical directions of movement.
         * @param {ui.IVelocity} velocity The current horizontal and vertical velocities.
         * @param {number} dx The distance in the x direction.
         * @param {number} dy The distance in the y direction.
         */
        private __getRegisteredSwipes(direction, velocity, dx, dy);
        /**
         * @param {string} direction The current direction of movement.
         */
        private __isHorizontal(direction);
        /**
         */
        private __appendGestureStyle();
        /**
         * @param {ui.IDefaultStyle} styleClass The object containing the custom styles for
         * gestures.
         */
        private __createStyle(styleClass);
        /**
         */
        private __blurFocusedElement();
        /**
         * @param {HTMLInputElement} target The target to listen for the blur event on.
         */
        private __waitForBlur(target);
        /**
         * @param {HTMLInputElement} target The target to handle click functionaliy for.
         */
        private __clickTarget(target);
        /**
         * @param {HTMLInputElement} target The target to handle functionality for.
         */
        private __handleInput(target);
        /**
         */
        private __preventClickFromTouch();
        /**
         * @param {Event} ev The event object.
         */
        private __preventDefaultClick(ev);
        /**
         * @param {Node} element The element to remove selections on.
         */
        private __removeSelections(element);
        /**
         * @param {Node} element The element to return selections on.
         */
        private __returnSelections(element);
        /**
         * @param {Event} ev The event object.
         */
        private __preventDefault(ev);
    }
    /**
     */
    function IDomEventsConfig(): IDomEventsConfig;
    /**
     */
    class DomEvent {
        /**
         */
        protected _document: Document;
        /**
         */
        element: any;
        /**
         */
        event: string;
        /**
         */
        eventType: string;
        /**
         * @param {Node} element The element associated with this DomEvent object.
         * @param {string} event The event associated with this DomEvent object.
         * @param {string} eventType? The event type associated with this DomEvent object.
         * If not specified, it will default to 'CustomEvent'.
         */
        initialize(element: Node, event: string, eventType?: string): void;
        /**
         * @param {Window} element The window object.
         * @param {string} event The event associated with this DomEvent object.
         * @param {string} eventType? The event type associated with this DomEvent object.
         * If not specified, it will default to 'CustomEvent'.
         */
        initialize(element: Window, event: string, eventType?: string): void;
        /**
         * @param {Object} eventExtension? An event extension to extend the dispatched CustomEvent.
         * @param {any} detailArg? The detail arg to include in the event object
         * @param {Node} dispatchElement? The element to dispatch the Event from. If not specified,
         * this instance's element will be used.
         */
        trigger(eventExtension?: Object, detailArg?: any, dispatchElement?: Node): boolean;
    }
    /**
     */
    interface ITouchStartEventProperties {
        /**
         */
        _buttons?: number;
        /**
         */
        clientX?: number;
        /**
         */
        clientY?: number;
        /**
         */
        identifier?: number;
        /**
         */
        timeStamp?: number;
        /**
         */
        target?: EventTarget;
    }
    /**
     */
    interface ISwipeOriginProperties {
        /**
         */
        clientX?: number;
        /**
         */
        clientY?: number;
        /**
         */
        xTimestamp?: number;
        /**
         */
        yTimestamp?: number;
        /**
         */
        xTarget?: EventTarget;
        /**
         */
        yTarget?: EventTarget;
    }
    /**
     */
    interface IExtendedEvent extends Event {
        _buttons?: number;
        /**
         */
        buttons?: number;
        /**
         */
        clientX?: number;
        /**
         */
        clientY?: number;
        /**
         */
        screenX?: number;
        /**
         */
        screenY?: number;
        /**
         */
        pageX?: number;
        /**
         */
        pageY?: number;
        /**
         */
        offsetX?: number;
        /**
         */
        offsetY?: number;
        /**
         */
        offset: IPoint;
        /**
         */
        direction?: IDirection;
        /**
         */
        velocity?: IVelocity;
        /**
         */
        touches?: Array<IExtendedEvent>;
        /**
         */
        changedTouches?: Array<IExtendedEvent>;
        /**
         */
        identifier?: number;
    }
    /**
     */
    interface IPointerEvent extends IExtendedEvent {
        /**
         */
        pointerType?: string;
        /**
         */
        pointerId?: number;
    }
    /**
     */
    interface IGestureEvent extends CustomEvent {
        /**
         */
        buttons?: number;
        /**
         */
        clientX?: number;
        /**
         */
        clientY?: number;
        /**
         */
        screenX?: number;
        /**
         */
        screenY?: number;
        /**
         */
        pageX?: number;
        /**
         */
        pageY?: number;
        /**
         */
        offsetX?: number;
        /**
         */
        offsetY?: number;
        /**
         */
        direction?: IDirection;
        /**
         */
        velocity?: IVelocity;
        /**
         */
        touches?: Array<IExtendedEvent>;
        /**
         */
        pointerType?: string;
        /**
         */
        identifier?: number;
    }
    /**
     */
    interface IGestureListener {
        /**
         * @param {ui.IGestureEvent} ev The gesture event object.
         */
        (ev?: IGestureEvent): void;
    }
    /**
     */
    interface IBaseGestures<T> {
        /**
         */
        $tap?: T;
        /**
         */
        $dbltap?: T;
        /**
         */
        $hold?: T;
        /**
         */
        $release?: T;
        /**
         */
        $swipe?: T;
        /**
         */
        $track?: T;
        /**
         */
        $trackend?: T;
    }
    /**
     */
    interface IGestures<T> extends IBaseGestures<T> {
        /**
         */
        $swipeleft?: T;
        /**
         */
        $swiperight?: T;
        /**
         */
        $swipeup?: T;
        /**
         */
        $swipedown?: T;
        /**
         */
        $trackleft?: T;
        /**
         */
        $trackright?: T;
        /**
         */
        $trackup?: T;
        /**
         */
        $trackdown?: T;
    }
    /**
     */
    interface IEventSubscriber extends IGestures<DomEvent> {
        /**
         */
        gestureCount: number;
    }
    /**
     */
    interface IPoint {
        /**
         */
        x: number;
        /**
         */
        y: number;
    }
    /**
     */
    interface IDirection {
        /**
         */
        x: string;
        /**
         */
        y: string;
        /**
         */
        primary: string;
    }
    /**
     */
    interface IVelocity {
        /**
         */
        x: number;
        /**
         */
        y: number;
    }
    /**
     */
    interface IIntervals {
        /**
         */
        tapInterval: number;
        /**
         */
        dblTapInterval: number;
        /**
         */
        holdInterval: number;
        /**
         */
        dblTapZoomDelay: number;
        /**
         */
        delayedClickInterval: number;
    }
    /**
     */
    interface IDistances {
        /**
         */
        minScrollDistance: number;
        /**
         */
        maxDblTapDistance: number;
    }
    /**
     */
    interface IVelocities {
        /**
         */
        minSwipeVelocity: number;
    }
    /**
     */
    interface IDefaultStyle {
        /**
         */
        className: string;
        /**
         */
        styles: Array<string>;
    }
    /**
     */
    interface IDomEventsConfig {
        /**
         */
        intervals: IIntervals;
        /**
         */
        distances: IDistances;
        /**
         */
        velocities: IVelocities;
        /**
         */
        styleConfig: Array<IDefaultStyle>;
    }
    /**
     */
    module animations {
        /**
         */
        class Animator {
            protected static _inject: any;
            /**
             */
            protected _compat: Compat;
            /**
             */
            protected _Promise: async.IPromise;
            /**
             */
            protected _document: Document;
            /**
             */
            protected _animatedElements: IObject<IAnimatedElement>;
            /**
             * @param {Element} element The Element to be animated.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             */
            create(element: Element, key: string, options?: any): IAnimationCreation;
            /**
             * @param {DocumentFragment} elements The DocumentFragment whose childNodes are to be animated.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             */
            create(element: DocumentFragment, key: string, options?: any): IAnimationCreation;
            /**
             * @param {NodeList} elements The list of Nodes to be animated.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             */
            create(elements: NodeList, key: string, options?: any): IAnimationCreation;
            /**
             * @param {Array<Node>} elements The Array of Nodes to be animated. All nodes in the Array must have
             * the same parent, otherwise the animation will not function correctly.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             */
            create(elements: Array<Node>, key: string, options?: any): IAnimationCreation;
            /**
             * @param {Element} element The Element to be animated.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             */
            animate(element: Element, key: string, options?: any): IAnimatingThenable;
            /**
             * @param {DocumentFragment} elements The DocumentFragment whose childNodes are to be animated.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             */
            animate(element: DocumentFragment, key: string, options?: any): IAnimatingThenable;
            /**
             * @param {NodeList} elements The list of Nodes to be animated.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             */
            animate(elements: NodeList, key: string, options?: any): IAnimatingThenable;
            /**
             * @param {Array<Node>} elements The Array of Nodes to be animated. All nodes in the Array must have
             * the same parent, otherwise the animation will not function correctly.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             */
            animate(elements: Array<Node>, key: string, options?: any): IAnimatingThenable;
            /**
             * @param {Element} element The Element to be animated.
             * @param {string} key The identifier specifying the type of animation.
             * @param {Element} parent The parent element used for adding the element to the DOM.
             * @param {Node} refChild? An optional reference node used for placing the element into the DOM
             * just before itself using the insertBefore function. If this argument is specified, the parent argument
             * is ignored.
             * @param {any} options? Specified options for the animation.
             */
            enter(element: Element, key: string, parent: Element, refChild?: Node, options?: any): IAnimatingThenable;
            /**
             * @param {DocumentFragment} elements The DocumentFragment whose childNodes are to be animated.
             * @param {string} key The identifier specifying the type of animation.
             * @param {Element} parent The parent element used for adding the elements to the DOM.
             * @param {Node} refChild? An optional reference node used for placing the element into the DOM
             * just before itself using the insertBefore function. If this argument is specified, the parent argument
             * is ignored.
             * @param {any} options? Specified options for the animation.
             */
            enter(element: DocumentFragment, key: string, parent: Element, refChild?: Node, options?: any): IAnimatingThenable;
            /**
             * @param {NodeList} elements The list of Nodes to be animated.
             * @param {string} key The identifier specifying the type of animation.
             * @param {Element} parent The parent element used for adding the elements to the DOM.
             * @param {Node} refChild? An optional reference node used for placing the element into the DOM
             * just before itself using the insertBefore function. If this argument is specified, the parent argument
             * is ignored.
             * @param {any} options? Specified options for the animation.
             */
            enter(elements: NodeList, key: string, parent: Element, refChild?: Node, options?: any): IAnimatingThenable;
            /**
             * @param {Array<Node>} elements The Array of Nodes to be animated. All nodes in the Array must have
             * the same parent, otherwise the animation will not function correctly.
             * @param {string} key The identifier specifying the type of animation.
             * @param {Element} parent The parent element used for adding the elements to the DOM.
             * @param {Node} refChild? An optional reference node used for placing the element into the DOM
             * just before itself using the insertBefore function. If this argument is specified, the parent argument
             * is ignored.
             * @param {any} options? Specified options for the animation.
             */
            enter(elements: Array<Node>, key: string, parent: Element, refChild?: Node, options?: any): IAnimatingThenable;
            /**
             * @param {Element} element The Element to be animated.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             */
            leave(element: Element, key: string, options?: any): IAnimatingThenable;
            /**
             * @param {DocumentFragment} elements The DocumentFragment whose childNodes are to be animated.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             */
            leave(element: DocumentFragment, key: string, options?: any): IAnimatingThenable;
            /**
             * @param {NodeList} elements The list of Nodes to be animated.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             */
            leave(elements: NodeList, key: string, options?: any): IAnimatingThenable;
            /**
             * @param {Array<Node>} elements The Array of Nodes to be animated. All nodes in the Array must have
             * the same parent, otherwise the animation will not function correctly.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             */
            leave(elements: Array<Node>, key: string, options?: any): IAnimatingThenable;
            /**
             * @param {Element} element The Element to be animated.
             * @param {string} key The identifier specifying the type of animation.
             * @param {Element} parent The parent element used for placing the element back into the DOM at its end if a
             * refChild is not specified.
             * @param {Node} refChild? An optional reference node used for placing the element into the DOM
             * just before itself using the insertBefore function. If this argument is specified, the parent argument
             * is ignored during DOM insertion.
             * @param {any} options? Specified options for the animation.
             */
            move(element: Element, key: string, parent: Element, refChild?: Node, options?: any): IAnimatingThenable;
            /**
             * @param {DocumentFragment} elements The DocumentFragment whose childNodes are to be animated.
             * @param {string} key The identifier specifying the type of animation.
             * @param {Element} parent The parent element used for placing the element back into the DOM at its end if a
             * refChild is not specified.
             * @param {Node} refChild? An optional reference node used for placing the element into the DOM
             * just before itself using the insertBefore function. If this argument is specified, the parent argument
             * is ignored during DOM insertion.
             * @param {any} options? Specified options for the animation.
             */
            move(element: DocumentFragment, key: string, parent: Element, refChild?: Node, options?: any): IAnimatingThenable;
            /**
             * @param {NodeList} elements The list of Nodes to be animated.
             * @param {string} key The identifier specifying the type of animation.
             * @param {Element} parent The parent element used for placing the element back into the DOM at its end if a
             * refChild is not specified.
             * @param {Node} refChild? An optional reference node used for placing the element into the DOM
             * just before itself using the insertBefore function. If this argument is specified, the parent argument
             * is ignored during DOM insertion.
             * @param {any} options? Specified options for the animation.
             */
            move(elements: NodeList, key: string, parent: Element, refChild?: Node, options?: any): IAnimatingThenable;
            /**
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
            move(elements: Array<Node>, key: string, parent: Element, refChild?: Node, options?: any): IAnimatingThenable;
            /**
             * @param {Element} element The Element to be animated.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             */
            show(element: Element, key: string, options?: any): IAnimatingThenable;
            /**
             * @param {DocumentFragment} elements The DocumentFragment whose childNodes are to be animated.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             */
            show(element: DocumentFragment, key: string, options?: any): IAnimatingThenable;
            /**
             * @param {NodeList} elements The list of Nodes to be animated.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             */
            show(elements: NodeList, key: string, options?: any): IAnimatingThenable;
            /**
             * @param {Array<Node>} elements The Array of Nodes to be animated. All nodes in the Array must have
             * the same parent, otherwise the animation will not function correctly.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             */
            show(elements: Array<Node>, key: string, options?: any): IAnimatingThenable;
            /**
             * @param {Element} element The Element to be animated.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             */
            hide(element: Element, key: string, options?: any): IAnimatingThenable;
            /**
             * @param {DocumentFragment} elements The DocumentFragment whose childNodes are to be animated.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             */
            hide(element: DocumentFragment, key: string, options?: any): IAnimatingThenable;
            /**
             * @param {NodeList} elements The list of Nodes to be animated.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             */
            hide(elements: NodeList, key: string, options?: any): IAnimatingThenable;
            /**
             * @param {Array<Node>} elements The Array of Nodes to be animated. All nodes in the Array must have
             * the same parent, otherwise the animation will not function correctly.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             */
            hide(elements: Array<Node>, key: string, options?: any): IAnimatingThenable;
            /**
             */
            all(promises: Array<IAnimationThenable<any>>): IAnimationThenable<void>;
            /**
             */
            resolve(): IAnimatingThenable;
            /**
             * @param {any} elements The Nodes to be animated. All nodes in the Array must have
             * the same parent, otherwise the animation will not function correctly.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             * @param {ui.animations.IAnimationFunction} functionality An object containing detailed information about
             * special animation functionality.
             */
            protected _animate(elements: any, key: string, options: any, functionality: IAnimationFunction): IAnimatingThenable;
            /**
             * @param {any} elements The Nodes to be animated. All nodes in the Array must have
             * the same parent, otherwise the animation will not function correctly.
             * @param {string} key The identifier specifying the type of animation.
             * @param {any} options? Specified options for the animation.
             * @param {ui.animations.IAnimationFunction} functionality An object containing detailed information about
             * special animation functionality.
             */
            protected _create(elements: any, key: string, options: any, functionality: IAnimationFunction): IAnimationCreation;
            /**
             * @param {Array<Node>} nodes All the nodes being animated.
             * @param {Array<Element>} elementNodes The animatable nodes being animated (only of type Node.ELEMENT_NODE).
             * @param {ui.animations.IAnimationFunction} functionality The specialized animation function attributes.
             */
            protected _handlePreInitFunctionality(nodes: Array<Node>, elementNodes: Array<Element>, functionality: IAnimationFunction): void;
            /**
             * @param {Array<Node>} nodes All the nodes being animated.
             * @param {Array<Element>} elementNodes The animatable nodes being animated (only of type Node.ELEMENT_NODE).
             * @param {ui.animations.IAnimationFunction} functionality The specialized animation function attributes.
             */
            protected _handlePostInitFunctionality(nodes: Array<Node>, elementNodes: Array<Element>, functionality: IAnimationFunction): void;
            /**
             * @param {Array<Node>} nodes All the nodes being animated.
             * @param {Array<Element>} elementNodes The animatable nodes being animated (only of type Node.ELEMENT_NODE).
             * @param {ui.animations.IAnimationFunction} functionality The specialized animation function attributes.
             */
            protected _handleEndFunctionality(nodes: Array<Node>, elementNodes: Array<Element>, functionality: IAnimationFunction): void;
            /**
             * @param {string} id The animation ID.
             * @param {Array<Element>} elements The Array of Elements being animated.
             */
            private __setAnimationId(id, elements);
            /**
             * @param {string} id The animation ID.
             * @param {Array<Element>} elements The Array of Elements being animated.
             * @param {ui.animations.AnimationPromise} animationPromise The animation's associated promise.
             */
            private __generateAnimatedElement(id, elements, animationPromise);
            /**
             * @param {Array<Element>} elements The Elements whose parents we need to check.
             */
            private __isParentAnimating(elements);
            /**
             * @param {Element} element The element being animated.
             */
            private __stopChildAnimations(elements);
            /**
             * @param {any} elements The Array of Nodes, DocumentFragment, or element to sift through.
             * @param {dependency.Injector<ui.animations.BaseAnimation>} animationInjector The injector to instantiate
             * BaseAnimations.
             * @param {Array<Element>} elementNodes The Array of only animatable elements.
             * @param {Array<ui.animations.BaseAnimation>>} animationInstances An empty Array of animation instances to add to.
             */
            private __constructAnimatableElements(elements, animationInjector, elementNodes, animationInstances);
        }
        /**
         */
        interface IAnimationFunction {
            /**
             */
            key: string;
            /**
             */
            parent?: Element;
            /**
             */
            refChild?: Node;
        }
        /**
         */
        interface IAnimatedElement {
            /**
             * @param {boolean} cancel? Specifies whether the animation is being cancelled.
             */
            animationEnd: (cancel?: boolean) => void;
            /**
             */
            promise?: IAnimationThenable<any>;
        }
        /**
         */
        interface IGetAnimatingThenable {
            /**
             */
            (): IAnimationThenable<void>;
        }
        /**
         */
        class AnimationPromise extends async.Promise<IGetAnimatingThenable> implements IAnimationEssentials, IAnimatingThenable {
            /**
             */
            protected _Promise: async.IPromise;
            /**
             */
            private __animationState;
            /**
             */
            private __animationInstances;
            /**
             * @param {(resolve: (value?: ui.animations.IParentAnimationFn) => any) => void} resolveFunction A resolve function
             * that only allows for a resolve of void and no reject.
             */
            constructor(resolveFunction: (resolve: (value?: IGetAnimatingThenable) => any) => void);
            /**
             * @param {(resolve: (value?: ui.animations.IParentAnimationFn) => any) => void} resolveFunction A resolve function
             * that only allows for a resolve of void and no reject.
             * @param {any} promise The promise object to allow for cancelling the {@link ui.animations.AnimationPromise}.
             */
            constructor(resolveFunction: (resolve: (value?: IGetAnimatingThenable) => any) => void, promise: any);
            /**
             * @param {ui.animations.IAnimationEssentials} instance The animation instance or animation
             * promises for this promise.
             */
            initialize(instance: IAnimationEssentials): void;
            /**
             * @param {Array<ui.animations.IAnimationEssentials>} instances The animation instances or
             * animation promises for this promise.
             */
            initialize(instances: Array<IAnimationEssentials>): void;
            /**
             */
            getInstances(): Array<IAnimationEssentials>;
            /**
             */
            start(): void;
            /**
             */
            pause(): async.IThenable<void>;
            /**
             */
            resume(): async.IThenable<void>;
            /**
             */
            cancel(): IAnimatingThenable;
            /**
             */
            isCanceled(): boolean;
            /**
             * @param {(success: ui.animations.IGetAnimatingThenable) => U} onFulfilled A method called when/if the promise fulfills.
             * If undefined the next onFulfilled method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success?: IGetAnimatingThenable) => U): IAnimationThenable<U>;
            /**
             * @param {(success: ui.animations.IGetAnimatingThenable) => ui.animations.IAnimationThenable<U>} onFulfilled
             * A method called when/if the promise fulfills.
             * If undefined the next onFulfilled method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success?: IGetAnimatingThenable) => IAnimationThenable<U>): IAnimationThenable<U>;
            /**
             * @param {(success: ui.animations.IGetAnimatingThenable) => async.IThenable<U>} onFulfilled
             * A method called when/if the promise fulfills.
             * If undefined the next onFulfilled method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success?: IGetAnimatingThenable) => async.IThenable<U>): IAnimationThenable<U>;
            /**
             * @param {(error: any) => ui.animations.IAnimationThenable<U>} onRejected A method called when/if the promise rejects.
             * If undefined the next onRejected method in the promise chain will be called.
             */
            catch<U>(onRejected: (error: any) => IAnimationThenable<U>): IAnimationThenable<U>;
            /**
             * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            catch<U>(onRejected: (error: any) => U): IAnimationThenable<U>;
        }
        /**
         */
        interface IAnimationThenable<R> extends async.IThenable<R>, IAnimationEssentials {
            /**
             * @param {ui.animations.BaseAnimation} instance The animation instance for this promise.
             */
            initialize(instance: BaseAnimation): void;
            /**
             */
            getInstances(): Array<IAnimationEssentials>;
            /**
             */
            start(): void;
            /**
             */
            pause(): async.IThenable<void>;
            /**
             */
            resume(): async.IThenable<void>;
            /**
             */
            cancel(): IAnimationThenable<R>;
            /**
             */
            isCanceled(): boolean;
            /**
             * @param {(success: R) => ui.animations.IAnimationThenable<U>} onFulfilled A method called when/if the promise fulills.
             * If undefined the next onFulfilled method in the promise chain will be called.
             * @param {(error: any) => ui.animations.IAnimationThenable<U>} onRejected? A method called when/if the promise rejects.
             * If undefined the next onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: R) => IAnimationThenable<U>, onRejected?: (error: any) => IAnimationThenable<U>): IAnimationThenable<U>;
            /**
             * @param {(success: R) => ui.animations.IAnimationThenable<U>} onFulfilled A method called when/if the promise fulills.
             * If undefined the next onFulfilled method in the promise chain will be called.
             * @param {(error: any) => U} onRejected? A method called when/if the promise rejects.
             * If undefined the next onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: R) => IAnimationThenable<U>, onRejected?: (error: any) => U): IAnimationThenable<U>;
            /**
             * @param {(success: R) => U} onFulfilled A method called when/if the promise fulills.
             * If undefined the next onFulfilled method in the promise chain will be called.
             * @param {(error: any) => ui.animations.IAnimationThenable<U>} onRejected? A method called when/if the promise rejects.
             * If undefined the next onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => IAnimationThenable<U>): IAnimationThenable<U>;
            /**
             * @param {(success: R) => U} onFulfilled A method called when/if the promise fulills.
             * If undefined the next onFulfilled method in the promise chain will be called.
             * @param {(error: any) => U} onRejected? A method called when/if the promise rejects.
             * If undefined the next onRejected method in the promise chain will be called.
             */
            then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => U): IAnimationThenable<U>;
            /**
             * @param {(error: any) => ui.animations.IAnimationThenable<U>} onRejected A method called when/if the promise rejects.
             * If undefined the next onRejected method in the promise chain will be called.
             */
            catch<U>(onRejected: (error: any) => IAnimationThenable<U>): IAnimationThenable<U>;
            /**
             * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
             * onRejected method in the promise chain will be called.
             */
            catch<U>(onRejected: (error: any) => U): IAnimationThenable<U>;
        }
        /**
         */
        interface IAnimatingThenable extends IAnimationThenable<IGetAnimatingThenable> {
        }
        /**
         */
        interface IAnimationCreation {
            /**
             */
            previous: async.IThenable<void>;
            /**
             */
            current: IAnimatingThenable;
        }
        /**
         */
        interface IAnimationEssentials {
            /**
             */
            start(): void;
            /**
             */
            pause(): async.IThenable<void>;
            /**
             */
            resume(): async.IThenable<void>;
            /**
             */
            cancel(): any;
            /**
             */
            end?(): void;
        }
        /**
         */
        class BaseAnimation implements IAnimationEssentials {
            protected static _inject: any;
            /**
             */
            element: HTMLElement;
            /**
             */
            dom: Dom;
            /**
             */
            utils: Utils;
            /**
             */
            options: any;
            /**
             */
            protected _log: debug.Log;
            /**
             */
            protected _window: Window;
            /**
             */
            protected _compat: Compat;
            /**
             */
            protected _Promise: async.IPromise;
            /**
             */
            protected _resolve: () => void;
            /**
             */
            private __eventListeners;
            /**
             */
            initialize(): void;
            /**
             */
            start(): void;
            /**
             */
            end(): void;
            /**
             */
            pause(): async.IThenable<void>;
            /**
             */
            resume(): async.IThenable<void>;
            /**
             */
            cancel(): void;
            /**
             * @param {string} type The type of event to listen to.
             * @param {EventListener} listener The listener to fire when the event occurs.
             * @param {boolean} useCapture? Whether to fire the event on the capture or the bubble phase
             * of event propagation.
             */
            addEventListener(type: string, listener: EventListener, useCapture?: boolean): IRemoveListener;
            /**
             * @param {Element} element The element on which the animation will occur.
             * @param {any} options Specified options for the animation.
             */
            instantiate(element: Element, options?: any): IAnimatingThenable;
        }
        /**
         */
        class CssAnimation extends BaseAnimation {
            /**
             */
            protected _animationEvents: IAnimationEvents;
            /**
             * @param {() => void} listener The function to call when the animation begins.
             */
            animationStart(listener: (ev?: AnimationEvent) => void): IRemoveListener;
            /**
             * @param {(ev?: AnimationEvent) => void} listener The function to call when the animation ends.
             */
            animationEnd(listener: (ev?: AnimationEvent) => void): IRemoveListener;
            /**
             * @param {(ev?: AnimationEvent) => void} listener The function to call when the animation iteration completes.
             */
            animationIteration(listener: (ev?: AnimationEvent) => void): IRemoveListener;
            /**
             * @param {(ev?: TransitionEvent) => void} listener The function to call when the transition begins.
             */
            transitionStart(listener: (ev?: TransitionEvent) => void): IRemoveListener;
            /**
             * @param {(ev?: TransitionEvent) => void} listener The function to call when the transition ends.
             */
            transitionEnd(listener: (ev?: TransitionEvent) => void): IRemoveListener;
        }
        /**
         */
        class SimpleCssAnimation extends CssAnimation {
            /**
             */
            className: string;
            /**
             */
            options: ISimpleCssAnimationOptions;
            /**
             */
            protected _cancelAnimation: IRemoveListener;
            /**
             */
            initialize(): void;
            /**
             */
            start(): void;
            /**
             */
            pause(): async.IThenable<void>;
            /**
             */
            resume(): async.IThenable<void>;
            /**
             */
            cancel(): void;
            /**
             */
            protected _dispose(): void;
        }
        /**
         */
        interface ISimpleCssAnimationOptions {
            /**
             */
            pseudo?: string;
            /**
             */
            preserveInit?: boolean;
        }
        /**
         */
        class FadeIn extends SimpleCssAnimation {
            /**
             */
            className: string;
        }
        /**
         */
        class FadeOut extends SimpleCssAnimation {
            /**
             */
            className: string;
        }
        /**
         */
        class Enter extends SimpleCssAnimation {
            /**
             */
            className: string;
        }
        /**
         */
        class Leave extends SimpleCssAnimation {
            /**
             */
            className: string;
        }
        /**
         */
        class Move extends SimpleCssAnimation {
            /**
             */
            className: string;
        }
        /**
         */
        class SimpleCssTransition extends CssAnimation {
            /**
             */
            options: ISimpleCssTransitionOptions;
            /**
             */
            className: string;
            /**
             */
            protected _animationCanceled: IRemoveListener;
            /**
             */
            protected _properties: Array<string>;
            /**
             */
            protected _normalizeRegex: RegExp;
            /**
             */
            protected _nonNumRegex: RegExp;
            /**
             */
            protected _normalizedKeys: IObject<boolean>;
            /**
             */
            protected _transitionCount: number;
            /**
             */
            protected _count: number;
            /**
             */
            protected _started: boolean;
            /**
             */
            protected _usingCss: boolean;
            /**
             */
            initialize(): void;
            /**
             */
            start(): void;
            /**
             */
            cancel(): void;
            /**
             */
            protected _dispose(): void;
            /**
             * @param {TransitionEvent} ev? The transition event object.
             * @param {boolean} immediate? Whether clean up should be immediate or conditional.
             */
            protected _done(ev: TransitionEvent): void;
            /**
             */
            protected _animate(): boolean;
            /**
             * @param {CSSStyleDeclaration} computedStyle The computed style of the
             * element.
             * @param {Array<string>} durations The array of declared transition duration values.
             */
            private __cssTransition(computedStyle, durations);
            /**
             * @param {string} duration The transition duration specified by the computed style.
             */
            protected _toMs(duration: string): number;
        }
        /**
         */
        interface ISimpleCssTransitionOptions extends ISimpleCssAnimationOptions {
            /**
             */
            properties?: IObject<string>;
            /**
             */
            preserveInit?: boolean;
            /**
             */
            count?: number;
        }
    }
    /**
     */
    module controls {
        /**
         */
        class Viewport extends TemplateControl implements routing.ISupportRouteNavigation {
            protected static _inject: any;
            /**
             */
            controls: Array<ViewControl>;
            /**
             */
            options: observable.IObservableProperty<IViewportOptions>;
            /**
             */
            protected _Router: routing.IRouterStatic;
            /**
             */
            protected _Promise: async.IPromise;
            /**
             */
            protected _Injector: typeof dependency.Injector;
            /**
             */
            protected _ElementManagerFactory: processing.IElementManagerFactory;
            /**
             */
            protected _document: Document;
            /**
             */
            protected _managerCache: storage.Cache<processing.ElementManager>;
            /**
             */
            protected _animator: animations.Animator;
            /**
             */
            protected _navigator: routing.Navigator;
            /**
             */
            protected _router: routing.Router;
            /**
             */
            protected _parentRouter: routing.Router;
            /**
             */
            protected _nextInjector: dependency.Injector<ViewControl>;
            /**
             */
            protected _nextView: ViewControl;
            /**
             */
            protected _animate: boolean;
            /**
             */
            initialize(): void;
            /**
             */
            loaded(): void;
            /**
             * @param {routing.IRouteInfo} routeInfo Contains the information necessary to instantiate
             * the view and feed it the route parameters/query.
             */
            canNavigateTo(routeInfo: routing.IRouteInfo): async.IThenable<boolean>;
            /**
             */
            canNavigateFrom(): async.IThenable<boolean>;
            /**
             * @param {routing.IRouteInfo} routeInfo Contains the information necessary to instantiate
             * the view and feed it the route parameters/query.
             */
            navigateTo(routeInfo: routing.IRouteInfo): async.IThenable<void>;
            /**
             */
            navigateFrom(): async.IThenable<void>;
            /**
             */
            dispose(): void;
            /**
             * @param {dependency.Injector<ui.ViewControl>} The injector used to instantiate the ViewControl.
             */
            protected _createNodeMap(injector: dependency.Injector<ViewControl>): processing.INodeMap;
            /**
             */
            protected _getParentViewport(): Viewport;
        }
        /**
         */
        interface IViewportOptions {
            /**
             */
            animate: boolean;
        }
        /**
         */
        class Template extends TemplateControl {
            protected static _inject: any;
            /**
             */
            protected _Promise: async.IPromise;
            /**
             */
            protected _templateCache: storage.TemplateCache;
            /**
             */
            protected _document: Document;
            /**
             */
            replaceWith: string;
            /**
             */
            options: observable.IObservableProperty<ITemplateOptions>;
            /**
             */
            protected _id: string;
            /**
             */
            protected _url: string;
            /**
             */
            private __isFirst;
            /**
             */
            private __templatePromise;
            /**
             */
            private __templateControlCache;
            /**
             */
            constructor();
            /**
             */
            initialize(): void;
            /**
             */
            loaded(): void;
            /**
             */
            dispose(): void;
            /**
             */
            protected _initializeTemplate(): void;
            /**
             * @param {async.IThenable<ui.controls.Template>} templatePromise The promise
             * associated with the first instance of the control with this ID.
             */
            protected _waitForTemplateControl(templatePromise: async.IThenable<Template>): void;
            /**
             * @param {ui.controls.Template} control The first of the controls
             * with this corresponding ID that defined the HTML template to reuse.
             */
            private __mapBindableTemplates(control);
        }
        /**
         */
        interface ITemplateOptions {
            /**
             */
            id: string;
            /**
             */
            templateUrl: string;
        }
        /**
         */
        class Ignore extends TemplateControl {
            /**
             */
            setTemplate(): void;
            /**
             */
            loaded(): void;
        }
        /**
         */
        class ForEach extends TemplateControl {
            protected static _inject: any;
            /**
             */
            protected _animator: animations.Animator;
            /**
             */
            protected _Promise: async.IPromise;
            /**
             */
            context: Array<any>;
            /**
             */
            priority: number;
            /**
             */
            controls: Array<TemplateControl>;
            /**
             */
            itemsLoaded: async.IThenable<void>;
            /**
             */
            options: observable.IObservableProperty<IForEachOptions>;
            /**
             */
            protected _aliases: IForEachAliasOptions;
            /**
             */
            protected _container: HTMLElement;
            /**
             */
            protected _blockLength: any;
            /**
             */
            protected _animate: boolean;
            /**
             */
            protected _animationQueue: Array<{
                animation: animations.IAnimationThenable<any>;
                op: string;
            }>;
            /**
             */
            protected _addQueue: Array<async.IThenable<void>>;
            /**
             */
            protected _itemLength: number;
            /**
             */
            private __listenerSet;
            /**
             */
            private __resolveFn;
            /**
             */
            private __rejectFn;
            /**
             */
            constructor();
            /**
             */
            setTemplate(): void;
            /**
             * @param {Array<any>} newValue The new Array
             * @param {Array<any>} oldValue The old Array
             */
            contextChanged(newValue: Array<any>, oldValue: Array<any>): void;
            /**
             */
            loaded(): void;
            /**
             */
            dispose(): void;
            /**
             */
            protected _setAliases(): void;
            /**
             * @param {number} index The point in the array to start adding items.
             * @param {number} numberOfItems The number of items to add.
             * @param {number} animateItems The number of items to animate.
             */
            protected _addItems(index: number, numberOfItems: number, animateItems: number): async.IThenable<void>;
            /**
             * @param {Array<Node>} items The Array of items to add.
             */
            protected _appendItems(items: Array<Node>): void;
            /**
             * @param {DocumentFragment} item The HTML fragment representing a single item.
             */
            protected _appendAnimatedItem(item: DocumentFragment): void;
            /**
             * @param {number} index The index to start disposing from.
             * @param {number} numberOfItems The number of items to remove.
             */
            protected _removeItems(index: number, numberOfItems: number): void;
            /**
             */
            protected _bindItem(index: number): async.IThenable<DocumentFragment>;
            /**
             */
            protected _setBlockLength(templates: Array<Node>): void;
            /**
             * @param {number} index The control whose resources we will update.
             */
            protected _updateResource(index: number): void;
            /**
             */
            protected _setListener(): void;
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            protected _executeEvent(changes: Array<observable.IArrayChanges<any>>): void;
            /**
             * @param {number} index The index used to create the resource aliases.
             */
            protected _getAliases(index: number): IObject<IResource>;
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            protected _push(changes: Array<observable.IArrayChanges<any>>): void;
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            protected _pop(changes: Array<observable.IArrayChanges<any>>): void;
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            protected _unshift(changes: Array<observable.IArrayChanges<any>>): void;
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            protected _shift(changes: Array<observable.IArrayChanges<any>>): void;
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            protected _splice(changes: Array<observable.IArrayChanges<any>>): void;
            /**
             * @param {number} startIndex The starting index of items.
             * @param {number} numberOfItems The number of consecutive items.
             */
            protected _calculateBlockLength(startIndex?: number, numberOfItems?: number): number;
            /**
             * @param {number} startIndex The starting index of items to animate.
             * @param {number} numberOfItems The number of consecutive items to animate.
             * @param {string} key The animation key/type.
             * @param {string} animationOp Denotes animation operation.
             * @param {boolean} cancel Whether or not to cancel the current animation before beginning this one.
             */
            protected _animateItems(startIndex: number, numberOfItems: number, key: string, animationOp: string, cancel: boolean): async.IThenable<void>;
            /**
             * @param {number} startNode The starting childNode of the ForEach to animate.
             * @param {number} endNode The ending childNode of the ForEach to animate.
             * @param {string} key The animation key/type.
             * @param {boolean} cancel Whether or not to cancel the current animation before beginning this one.
             */
            protected _handleSimpleAnimation(startNode: number, endNode: number, key: string, cancel: boolean): async.IThenable<void>;
            /**
             * @param {number} startNode The starting childNode of the ForEach to animate.
             * @param {number} endNode The ending childNode of the ForEach to animate.
             * @param {string} key The animation key/type.
             */
            protected _handleLeave(startNode: number, endNode: number, key: string): async.IThenable<void>;
            /**
             * @param {number} startNode The starting childNode of the ForEach to animate.
             * @param {number} endNode The ending childNode of the ForEach to animate.
             * @param {string} key The animation key/type.
             * @param {boolean} cancel Whether or not to cancel the current animation before beginning this one.
             */
            protected _handleClonedContainerAnimation(startNode: number, endNode: number, key: string, cancel: boolean): async.IThenable<void>;
            /**
             */
            protected _cancelCurrentAnimations(): async.IThenable<any>;
        }
        /**
         */
        interface IForEachOptions {
            /**
             */
            animate?: boolean;
            /**
             */
            aliases?: IForEachAliasOptions;
        }
        /**
         */
        interface IForEachAliasOptions extends IObject<string> {
            /**
             */
            index?: string;
            /**
             */
            even?: string;
            /**
             */
            odd?: string;
            /**
             */
            first?: string;
            /**
             */
            last?: string;
        }
        /**
         */
        class Head extends ui.TemplateControl {
            protected static _inject: any;
            /**
             */
            element: HTMLHeadElement;
            /**
             */
            replaceWith: string;
            /**
             */
            protected _document: Document;
            /**
             */
            protected _browser: web.Browser;
            /**
             */
            protected _structuredDataElements: Array<HTMLElement>;
            /**
             */
            protected _titleElement: HTMLTitleElement;
            /**
             */
            protected _ogTitleElement: HTMLMetaElement;
            /**
             */
            protected _twitterTitleElement: HTMLMetaElement;
            /**
             */
            protected _descriptionElement: HTMLMetaElement;
            /**
             */
            protected _ogDescriptionElement: HTMLMetaElement;
            /**
             */
            protected _twitterDescriptionElement: HTMLMetaElement;
            /**
             */
            protected _ogUrlElement: HTMLMetaElement;
            /**
             */
            protected _twitterUrlElement: HTMLMetaElement;
            /**
             */
            protected _authorElement: HTMLMetaElement;
            /**
             */
            protected _googleAuthorElement: HTMLLinkElement;
            /**
             */
            protected _fbAuthorElement: HTMLMetaElement;
            /**
             */
            protected _twitterCreatorElement: HTMLMetaElement;
            /**
             */
            protected _ogTypeElement: HTMLMetaElement;
            /**
             */
            initialize(): void;
            /**
             */
            setTemplate(): void;
            /**
             * @param {string} title? If supplied, the title elements will be set to this value.
             */
            title(title?: string): string;
            /**
             * @param {string} description? If supplied, the description elements will be set to this value.
             */
            description(description?: string): string;
            /**
             * @param {string} url? If supplied, the url elements will be set to this value.
             */
            url(url?: string): string;
            /**
             * @param {string} author? If supplied, the author elements will be set to this value. The value should be the
             * display name of the content author.
             */
            author(author?: string): string;
            /**
             * @param {string} author? If supplied, the author elements will be set to this value. The value should be the
             * Google+ profile url for the author.
             */
            googleAuthor(author?: string): string;
            /**
             * @param {string} author? If supplied, the author elements will be set to this value. The value should be
             * the `https://www.facebook.com/username` account, and make sure the user supports followers.
             */
            fbAuthor(author?: string): string;
            /**
             * @param {string} creator? If supplied, the creator elements will be set to this value. The
             * value should be the twitter `@username` of the creator
             */
            twitterCreator(creator?: string): string;
            /**
             * @param {string} type? If supplied, the image elements will be set to this value.
             */
            fbType(type?: string): string;
            /**
             * @param {Array<string>} images For each image, a tag will be created
             */
            images(images: Array<string>): void;
            /**
             * @param {Array<string>} videos For each video, a tag will be created
             */
            videos(videos: Array<string>): void;
            /**
             * @param {any} The object, it will be stringified and put in the ld+json tag.
             */
            structuredData(obj: any): void;
            /**
             * @param {ui.controls.IBlogPosting} The posting object, it will be stringified and put in the ld+json tag.
             */
            blogPostings(...postings: Array<IBlogPosting>): void;
            /**
             */
            loaded(): void;
            /**
             */
            navigated(url: string): void;
            /**
             * @param {HTMLElement} element The element from which to get the content.
             */
            protected _getContent(element: HTMLElement): string;
            /**
             * @param {Array<HTMLElement>} elements The elements for which to set values.
             */
            protected _setContent(elements: Array<HTMLElement>, value: string): void;
            /**
             * @param {string} tag The tag name for the element.
             * @param {string} name? The name corresponding to the type of meta/link tag.
             * @param {boolean} multiple? Whether or not there can be multiple of this tag/name in the dom
             */
            protected _createElement<T extends HTMLElement>(tag: string, name?: string, multiple?: boolean): T;
            /**
             */
            protected _removeAllElements(): void;
            /**
             */
            protected _removeElements(...elements: Array<HTMLElement>): void;
        }
        /**
         */
        interface IArticle {
            /**
             */
            '@context': string;
            /**
             */
            '@type': string;
            /**
             */
            mainEntityOfPage?: {
                '@type': string;
                '@id': string;
            };
            /**
             */
            headline: string;
            /**
             */
            image: IImageObject;
            /**
             */
            datePublished: Date;
            /**
             */
            dateModified?: Date;
            /**
             */
            author: {
                '@type': string;
                name: string;
            };
            /**
             */
            publisher: {
                '@type': string;
                name: string;
                logo: IImageObject;
            };
            /**
             */
            description?: string;
            /**
             */
            name?: string;
        }
        /**
         */
        interface IBlogPosting extends IArticle {
        }
        /**
         */
        interface IImageObject {
            /**
             */
            '@type': string;
            /**
             */
            url: string;
            /**
             */
            caption?: string;
            /**
             */
            height: number;
            /**
             */
            width: number;
        }
        /**
         */
        class InnerHtml extends TemplateControl {
            protected static _inject: any;
            /**
             */
            options: observable.IObservableProperty<IInnerHtmlOptions>;
            /**
             */
            controls: Array<TemplateControl>;
            /**
             */
            protected _TemplateControlFactory: ITemplateControlFactory;
            /**
             */
            protected _html: string;
            /**
             */
            setTemplate(): void;
            /**
             */
            loaded(): void;
            /**
             * @param {IInnerHtmlOptions} newValue The new value of the options property.
             * @param {IInnerHtmlOptions} oldValue? The old value of the options property.
             */
            protected _onOptionsChanged(newValue: IInnerHtmlOptions, oldValue?: IInnerHtmlOptions): void;
        }
        /**
         */
        interface IInnerHtmlOptions {
            /**
             */
            html?: string;
            /**
             */
            compile?: boolean;
        }
        /**
         */
        class Select extends BindControl {
            protected static _inject: any;
            /**
             */
            replaceWith: string;
            /**
             */
            priority: number;
            /**
             */
            context: Array<any>;
            /**
             */
            controls: Array<TemplateControl>;
            /**
             */
            groups: IObject<Element>;
            /**
             */
            options: observable.IObservableProperty<ISelectOptions>;
            /**
             */
            itemsLoaded: async.IThenable<void>;
            /**
             */
            protected _Promise: async.IPromise;
            /**
             */
            protected _document: Document;
            /**
             */
            protected _isGrouped: boolean;
            /**
             */
            protected _group: string;
            /**
             */
            protected _defaultOption: HTMLOptionElement;
            /**
             */
            protected _binder: observable.IImplementTwoWayBinding;
            /**
             */
            protected _propertyType: string;
            /**
             */
            private __listenerSet;
            /**
             */
            private __resolveFn;
            /**
             */
            private __rejectFn;
            /**
             */
            constructor();
            /**
             */
            setTemplate(): void;
            /**
             * @param {Array<any>} newValue The new array context.
             * @param {Array<any>} oldValue The old array context.
             */
            contextChanged(newValue: Array<any>, oldValue: Array<any>): void;
            /**
             */
            loaded(): void;
            /**
             */
            dispose(): void;
            /**
             * @param {observable.IImplementTwoWayBinding} binder The control that facilitates the
             * databinding.
             */
            observeProperties(binder: observable.IImplementTwoWayBinding): void;
            /**
             * @param {string} newValue The new value of the bound property.
             * @param {string} oldValue The old value of the bound property.
             * @param {string} identifier The child identifier of the bound property.
             * @param {boolean} firstTime? Whether or not this is the first time being called as a setter.
             */
            protected _setSelectedIndex(newValue: string, oldValue: string, identifier: string, firstTime?: boolean): void;
            /**
             * @param {Array<any>} newValue The new value Array of the bound property.
             * @param {Array<any>} oldValue The old value Array of the bound property.
             * @param {string} identifier The child identifier of the bound property.
             * @param {boolean} firstTime? Whether or not this is the first time being called as a setter.
             */
            protected _setSelectedIndices(newValue: Array<any>, oldValue: Array<any>, identifier: string, firstTime?: boolean): void;
            /**
             */
            protected _observeChange(): void;
            /**
             */
            protected _getSelectedValues(): Array<string>;
            /**
             */
            protected _castValue(value: any): any;
            /**
             */
            protected _setListener(): void;
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            protected _executeEvent(changes: Array<observable.IArrayChanges<any>>): void;
            /**
             * @param {number} numberOfItems The number of items to add.
             * @param {number} index The starting index of the next
             * set of items to add.
             */
            protected _addItems(numberOfItems: number, index: number): async.IThenable<void>;
            /**
             * @param {number} index The current index of the item being added.
             * @param {DocumentFragment} option The bound DocumentFragment to be
             * inserted into the DOM.
             */
            protected _insertOption(index: number, option: DocumentFragment): async.IThenable<any>;
            /**
             * @param {number} numberOfItems The number of items
             * to remove.
             */
            protected _removeItems(numberOfItems: number): void;
            /**
             */
            protected _removeItem(): void;
            /**
             */
            protected _resetSelect(): void;
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            protected _push(changes: Array<observable.IArrayChanges<any>>): void;
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            protected _pop(changes: Array<observable.IArrayChanges<any>>): void;
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            protected _unshift(changes: Array<observable.IArrayChanges<any>>): void;
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            protected _shift(changes: Array<observable.IArrayChanges<any>>): void;
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            protected _splice(changes: Array<observable.IArrayChanges<any>>): void;
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            protected _sort(changes: Array<observable.IArrayChanges<any>>): void;
            /**
             * @param {Array<observable.IArrayChanges<any>>} changes The Array mutation event information.
             */
            protected _reverse(changes: Array<observable.IArrayChanges<any>>): void;
        }
        /**
         */
        interface ISelectOptions {
            /**
             */
            group: string;
            /**
             */
            default: ISelectDefaultOption;
        }
        /**
         */
        interface ISelectDefaultOption {
            /**
             */
            value: string;
            /**
             */
            textContent: string;
        }
        /**
         */
        class If extends TemplateControl {
            protected static _inject: any;
            /**
             */
            protected _document: Document;
            /**
             */
            protected _animator: animations.Animator;
            /**
             */
            protected _Promise: async.IPromise;
            /**
             */
            options: observable.IObservableProperty<IIfOptions>;
            /**
             */
            commentNode: Comment;
            /**
             */
            fragmentStore: DocumentFragment;
            /**
             */
            private __condition;
            /**
             */
            private __firstTime;
            /**
             */
            private __removeListener;
            /**
             */
            private __leaveAnimation;
            /**
             */
            private __enterAnimation;
            /**
             */
            private __initialBind;
            /**
             */
            constructor();
            /**
             */
            contextChanged(): async.IThenable<void>;
            /**
             */
            setTemplate(): void;
            /**
             */
            loaded(): async.IThenable<void>;
            /**
             */
            dispose(): void;
            /**
             */
            protected _setter(options: IIfOptions): async.IThenable<void>;
            /**
             */
            protected _addItem(): async.IThenable<void>;
            /**
             */
            protected _animateEntrance(): animations.IAnimationThenable<void>;
            /**
             */
            protected _removeItem(): async.IThenable<void>;
            /**
             */
            protected _animateLeave(): animations.IAnimationThenable<void>;
        }
        /**
         */
        interface IIfOptions {
            /**
             */
            condition: boolean;
        }
        /**
         */
        class Link extends TemplateControl {
            protected static _inject: any;
            /**
             */
            replaceWith: string;
            /**
             */
            options: observable.IObservableProperty<ILinkOptions>;
            /**
             */
            element: HTMLAnchorElement;
            /**
             */
            protected _Router: routing.IRouterStatic;
            /**
             */
            protected _browser: web.Browser;
            /**
             */
            protected _router: routing.Router;
            /**
             */
            protected _removeClickListener: IRemoveListener;
            /**
             */
            initialize(): void;
            /**
             */
            loaded(): void;
            /**
             */
            setHref(): void;
            /**
             */
            getHref(): string;
            /**
             */
            protected _handleClick(ev: Event): void;
            /**
             */
            protected _handleTap(ev: IGestureEvent): void;
            /**
             */
            dispose(): void;
        }
        /**
         */
        interface ILinkOptions extends routing.INavigateOptions {
            /**
             */
            view: any;
        }
    }
}
/**
 */
export declare module processing {
    /**
     */
    class Compiler {
        protected static _inject: any;
        /**
         */
        protected _ElementManagerFactory: IElementManagerFactory;
        /**
         */
        protected _TextManagerFactory: ITextManagerFactory;
        /**
         */
        protected _CommentManagerFactory: ICommentManagerFactory;
        /**
         */
        protected _managerCache: storage.Cache<NodeManager>;
        /**
         * @param {Node} node The node whose childNodes are going to be compiled.
         * @param {ui.TemplateControl} control? The parent control for the given Node. The parent must implement the
         * TemplateControl interface since only they can contain templates.
         */
        compile(node: Node, control?: ui.TemplateControl): void;
        /**
         * @param {Array<Node>} nodes The nodes that are going to be compiled.
         * @param {ui.TemplateControl} control? The parent control for the given Node. The parent must implement the
         * TemplateControl interface since only they can contain templates.
         */
        compile(nodes: Array<Node>, control?: ui.TemplateControl): void;
        /**
         * @param {NodeList} nodes The NodeList that is going to be compiled.
         * @param {ui.TemplateControl} control? The parent control for the given Node. The parent must implement the
         * TemplateControl interface since only they can contain templates.
         */
        compile(nodes: NodeList, control?: ui.TemplateControl): void;
        /**
         * @param {Array<Node>} nodes The array of nodes to be compiled.
         * @param {processing.ElementManager} manager The parent ElementManagers
         * for the given array of nodes.
         */
        /**
         * @param nodes The NodeList to be compiled.
         * @param manager The parent Element Manager for the given array of nodes.
         */
        protected _compileNodes(nodes: Array<Node>, manager: ElementManager): void;
    }
    /**
     */
    class NodeManager {
        /**
         */
        protected static _ContextManager: observable.IContextManagerStatic;
        /**
         */
        protected static _parser: expressions.Parser;
        /**
         */
        protected static _TemplateControlFactory: ui.ITemplateControlFactory;
        /**
         */
        protected static _log: debug.Log;
        /**
         */
        protected static _markupRegex: RegExp;
        /**
         */
        protected static _newLineRegex: RegExp;
        /**
         */
        type: string;
        /**
         */
        nodeMap: INodeMap;
        /**
         */
        parent: ElementManager;
        /**
         */
        isClone: boolean;
        /**
         * @param {string} text The text string in which to search for markup.
         */
        static hasMarkup(text: string): boolean;
        /**
         * @param {string} text The text string in which to search for markup.
         */
        static findMarkup(text: string): Array<expressions.IParsedExpression>;
        /**
         * @param {Array<expressions.IParsedExpression>} expressions The composition array to evaluate.
         * @param {ui.TemplateControl} control? The TemplateControl used to parse
         * the expressions.
         */
        static build(expressions: Array<expressions.IParsedExpression>, control?: ui.TemplateControl): string;
        /**
         * @param {Array<expressions.IParsedExpression>} expressions An Array of
         * IParsedExpressions to observe.
         * @param {ui.TemplateControl} control The TemplateControl associated
         * to the identifiers.
         * @param {(...args: Array<any>) => void} listener The listener to call when any identifier property changes.
         */
        static observeExpressions(expressions: Array<expressions.IParsedExpression>, control: ui.TemplateControl, listener: (...args: Array<any>) => void): void;
        /**
         * @param text The text to wrap into a static expression.
         */
        protected static _wrapExpression(text: string): expressions.IParsedExpression;
        /**
         * @param {Array<expressions.IParsedExpression>} expressions An array of parsed expressions to search for identifiers.
         */
        private static __findUniqueIdentifiers(expressions);
        /**
         * @param {string} identifier The identifier looking to be observed.
         * @param {ui.TemplateControl} control The TemplateControl associated
         * to the identifiers.
         */
        private static __getObservationDetails(identifier, control);
        /**
         * @param {processing.INodeMap} nodeMap The mapping associated with this manager. We have to use an
         * Used to treat all NodeManagers the same.
         * @param {processing.ElementManager} parent The parent ElementManager.
         */
        initialize(nodeMap: INodeMap, parent: ElementManager): void;
        /**
         */
        getParentControl(): ui.TemplateControl;
        /**
         * @param {Node} newNode The new node associated with the new manager.
         * @param {processing.ElementManager} parentManager The parent
         * ElementManager for the clone.
         */
        clone(newNode: Node, parentManager: ElementManager): number;
        /**
         */
        bind(): void;
    }
    /**
     */
    function INodeManagerStatic(_regex?: expressions.Regex, _ContextManager?: observable.IContextManagerStatic, _parser?: expressions.Parser, _TemplateControlFactory?: ui.ITemplateControlFactory, _log?: debug.Log): INodeManagerStatic;
    /**
     */
    interface INodeManagerStatic {
        /**
         * @param {string} text The text string in which to search for markup.
         */
        hasMarkup(text: string): boolean;
        /**
         * @param {string} text The text string in which to search for markup.
         */
        findMarkup(text: string): Array<expressions.IParsedExpression>;
        /**
         * @param {Array<expressions.IParsedExpression>} expressions The composition array to evaluate.
         * @param {ui.TemplateControl} control? The TemplateControl used to parse
         * the expressions.
         */
        build(expressions: Array<expressions.IParsedExpression>, control?: ui.TemplateControl): string;
        /**
         * @param {Array<expressions.IParsedExpression>} expressions An Array of
         * IParsedExpressions to observe.
         * @param {ui.TemplateControl} control The TemplateControl associated
         * to the identifiers.
         * @param {(...args: Array<any>) => void} listener The listener to call when any identifier property changes.
         */
        observeExpressions(expressions: Array<expressions.IParsedExpression>, control: ui.TemplateControl, listener: (...args: Array<any>) => void): void;
    }
    /**
     */
    interface INode {
        /**
         */
        control?: Control;
        /**
         */
        node?: Node;
        /**
         */
        nodeName?: string;
        /**
         */
        expressions?: Array<expressions.IParsedExpression>;
        /**
         */
        injector?: dependency.Injector<Control>;
    }
    /**
     */
    interface IUiControlNode extends INode {
        /**
         */
        control: ui.TemplateControl;
        /**
         */
        resourceElement?: HTMLElement;
    }
    /**
     */
    interface INodeMap {
        /**
         */
        element?: HTMLElement;
        /**
         */
        nodes: Array<INode>;
        /**
         */
        attributes?: IObject<string>;
        /**
         */
        childContext?: string;
        /**
         */
        hasControl?: boolean;
        /**
         */
        uiControlNode?: IUiControlNode;
    }
    /**
     */
    class ElementManager extends NodeManager {
        protected static _inject: any;
        /**
         */
        protected static _document: Document;
        /**
         */
        protected static _managerCache: storage.Cache<ElementManager>;
        /**
         */
        protected static _ResourcesFactory: ui.IResourcesFactory;
        /**
         */
        protected static _AttributesFactory: typeof ui.Attributes;
        /**
         */
        protected static _BindableTemplatesFactory: ui.IBindableTemplatesFactory;
        /**
         */
        protected static _log: debug.Log;
        /**
         */
        protected _Promise: async.IPromise;
        /**
         */
        protected _compiler: Compiler;
        /**
         */
        protected _ContextManager: observable.IContextManagerStatic;
        /**
         */
        protected _CommentManagerFactory: ICommentManagerFactory;
        /**
         */
        protected _ControlFactory: IControlFactory;
        /**
         */
        protected _TemplateControlFactory: ui.ITemplateControlFactory;
        /**
         */
        protected _BindableTemplatesFactory: ui.IBindableTemplatesFactory;
        /**
         */
        protected _log: debug.Log;
        /**
         */
        children: Array<NodeManager>;
        /**
         */
        type: string;
        /**
         */
        replace: boolean;
        /**
         */
        hasOwnContext: boolean;
        /**
         */
        replaceNodeLength: number;
        /**
         */
        contextPromise: async.IThenable<void>;
        /**
         */
        templatePromise: async.IThenable<void>;
        /**
         * @param {Element} element The Element to use to identifier markup and controls.
         * @param {processing.ElementManager} parent? The parent ElementManager
         * used for context inheritance.
         */
        static create(element: Element, parent?: ElementManager): ElementManager;
        /**
         * @param {Node} node The node whose child nodes may contain Resources.
         */
        static locateResources(node: Node): HTMLElement;
        /**
         * @param {processing.ElementManager} sourceManager The original ElementManager.
         * @param {processing.ElementManager} parent The parent ElementManager
         * for the new clone.
         * @param {Element} element The new element to associate with the clone.
         * @param {ui.TemplateControl} newControl? An optional control to associate with the clone.
         * @param {processing.INodeMap} nodeMap? The {@link processing.INodeMap} used to clone this
         * ElementManager.
         */
        static clone(sourceManager: ElementManager, parent: ElementManager, element: Element, newControl?: ui.TemplateControl, nodeMap?: INodeMap): ElementManager;
        /**
         * @param {processing.INodeMap} sourceMap The source INodeMap used to clone the
         * TemplateControl.
         * @param {ui.TemplateControl} parent The parent control of the clone.
         */
        static cloneUiControl(sourceMap: INodeMap, parent: ui.TemplateControl): ui.TemplateControl;
        /**
         * @param {processing.INodeMap} nodeMap The INodeMap that contains
         * the attribute nodes.
         * @param {ui.TemplateControl} parent The parent TemplateControl for
         * the newly created controls.
         * @param {ui.TemplateControl} templateControl? The TemplateControl
         * linked to these created controls if one exists.
         * @param {Element} newElement? An optional element to use for attributes (used in cloning).
         * @param {boolean} isClone? Whether or not these controls are clones.
         */
        static createAttributeControls(nodeMap: INodeMap, parent: ui.TemplateControl, templateControl?: ui.TemplateControl, newElement?: Element, isClone?: boolean): Array<INode>;
        /**
         */
        static getInstance(): ElementManager;
        /**
         * @param {NamedNodeMap} attributes The attributes used to create the INodeMap.
         */
        protected static _collectAttributes(attributes: NamedNodeMap): INodeMap;
        /**
         * @param {Array<processing.INode>} nodes The compiled INodes
         * to be cloned.
         */
        protected static _copyAttributeNodes(nodes: Array<INode>): Array<INode>;
        /**
         * @param {processing.INode} sourceNode The original INode.
         * @param {Node} node The new node used for cloning.
         * @param {ui.TemplateControl} newControl? An optional new control to associate with the cloned node.
         */
        protected static _cloneNode(sourceNode: INode, node: Node, newControl?: ui.TemplateControl): INode;
        /**
         * @param {processing.INodeMap} sourceMap The original INodeMap.
         * @param {Element} element The new Element used for cloning.
         * @param {ui.TemplateControl} parent The TemplateControl associated
         * with the parent ElementManager.
         * @param {ui.TemplateControl} newControl? An optional new TemplateControl
         * to associate with the element.
         */
        protected static _cloneNodeMap(sourceMap: INodeMap, element: Element, parent: ui.TemplateControl, newControl?: ui.TemplateControl): INodeMap;
        /**
         * @param {Node} newNode The new element used to clone the ElementManager.
         * @param {processing.ElementManager} parentManager The parent manager for the clone.
         * @param {processing.INodeMap} nodeMap? An optional INodeMap to clone a ui control if needed.
         */
        clone(newNode: Node, parentManager: ElementManager, nodeMap?: INodeMap): number;
        /**
         * @param {processing.INodeMap} nodeMap A map of the nodes (element and attributes)
         * associated with this ElementManager.
         * @param {processing.ElementManager} parent The parent
         * ElementManager.
         * @param {boolean} dontInitialize? Specifies whether or not the initialize method should
         * be called for a TemplateControl if one is attached
         * to this ElementManager.
         */
        initialize(nodeMap: INodeMap, parent: ElementManager, dontInitialize?: boolean): void;
        /**
         */
        bind(): Array<Control>;
        /**
         * @param {string} templateUrl? The URL for the associated TemplateControl's
         * HTML template.
         */
        setUiControlTemplate(templateUrl?: string): void;
        /**
         */
        getUiControl(): ui.TemplateControl;
        /**
         */
        fulfillTemplate(): async.IThenable<void>;
        /**
         */
        fulfillAndLoad(): async.IThenable<void>;
        /**
         */
        bindAndLoad(): async.IThenable<void>;
        /**
         * @param {ui.TemplateControl} root The TemplateControl specifying its own context.
         * @param {() => async.IThenable<void>} loadMethod The function to initiate the loading of the root control and its
         * children.
         */
        observeRootContext(root: ui.TemplateControl, loadMethod: () => async.IThenable<void>): async.IThenable<void>;
        /**
         * @param {ui.TemplateControl} uiControl The control to finalize.
         * @param {string} absoluteContextPath The absoluteContextPath of the uiControl.
         */
        protected _beforeLoad(uiControl: ui.TemplateControl, absoluteContextPath: string): void;
        /**
         */
        protected _bindChildren(): async.IThenable<void[]>;
        /**
         * @param {Array<AttributeControl>} controls The array of attribute based controls to load.
         * @param {ui.TemplateControl} templateControl The TemplateControl
         * associated with this manager.
         */
        protected _loadControls(controls: Array<AttributeControl>, templateControl: ui.TemplateControl): async.IThenable<void>;
        /**
         */
        protected _populateUiControl(): void;
        /**
         * @param {ui.TemplateControl} control The TemplateControl whose element
         * will be removed.
         * @param {processing.INodeMap} nodeMap The INodeMap associated with this manager.
         */
        protected _replaceElement(control: ui.TemplateControl, nodeMap: INodeMap): void;
        /**
         * @param {ui.TemplateControl} uiControl The TemplateControl
         * associated with this manager.
         * @param {DocumentFragment} template The associated TemplateControl's
         * template.
         */
        protected _initializeControl(uiControl: ui.TemplateControl, template: DocumentFragment): void;
        /**
         * @param {Array<processing.INode>} nodes The array of INodes to iterate through.
         * @param {ui.TemplateControl} parent The parent TemplateControl for context.
         * @param {Array<Control>} controls The array of controls whose attributes will need to be updated
         * upon the context changing.
         */
        protected _observeControlIdentifiers(nodes: Array<INode>, parent: ui.TemplateControl, controls: Array<Control>, element: Element): void;
        /**
         */
        protected _fulfillChildTemplates(): async.IThenable<void>;
    }
    /**
     */
    function IElementManagerFactory(_document?: Document, _managerCache?: storage.Cache<ElementManager>, _ResourcesFactory?: ui.IResourcesFactory, _AttributesFactory?: typeof ui.Attributes, _BindableTemplatesFactory?: ui.IBindableTemplatesFactory, _log?: debug.Log): IElementManagerFactory;
    /**
     */
    interface IElementManagerFactory {
        /**
         * @param {Element} element The Element to use to identifier markup and controls.
         * @param {processing.ElementManager} parent? The parent ElementManager
         * used for context inheritance.
         */
        create(element: Element, parent?: ElementManager): ElementManager;
        /**
         * @param {processing.INodeMap} nodeMap The INodeMap that contains
         * the attribute nodes.
         * @param {ui.TemplateControl} parent The parent TemplateControl for
         * the newly created controls.
         * @param {ui.TemplateControl} templateControl? The TemplateControl
         * linked to these created controls if one exists.
         * @param {Element} newElement? An optional element to use for attributes (used in cloning).
         * @param {boolean} isClone? Whether or not these controls are clones.
         */
        createAttributeControls(nodeMap: INodeMap, parent: ui.TemplateControl, templateControl?: ui.TemplateControl, newElement?: Element, isClone?: boolean): Array<INode>;
        /**
         * @param {processing.INodeMap} sourceMap The source INodeMap used to clone the
         * TemplateControl.
         * @param {ui.TemplateControl} parent The parent control of the clone.
         */
        cloneUiControl(sourceMap: INodeMap, parent: ui.TemplateControl): ui.TemplateControl;
        /**
         * @param {processing.ElementManager} sourceManager The original ElementManager.
         * @param {processing.ElementManager} parent The parent ElementManager
         * for the new clone.
         * @param {Element} element The new element to associate with the clone.
         * @param {ui.TemplateControl} newControl? An optional control to associate with the clone.
         * @param {processing.INodeMap} nodeMap? The {@link processing.INodeMap} used to clone this
         * ElementManager.
         */
        clone(sourceManager: ElementManager, parent: ElementManager, element: Element, newControl?: ui.TemplateControl, nodeMap?: INodeMap): ElementManager;
        /**
         * @param {Node} node The node whose child nodes may contain Resources.
         */
        locateResources(node: Node): HTMLElement;
        /**
         */
        getInstance(): ElementManager;
    }
    /**
     */
    class TextManager extends NodeManager {
        /**
         */
        type: string;
        /**
         * @param {Node} node The Node used to find markup.
         * @param {processing.ElementManager} parent The parent ElementManager
         * for the node.
         */
        static create(node: Node, parent: ElementManager): TextManager;
        /**
         * @param {processing.INodeMap} sourceMap The original INodeMap.
         * @param {Node} newNode The new text node used for cloning.
         */
        protected static _cloneNodeMap(sourceMap: INodeMap, newNode: Node): INodeMap;
        /**
         * @param {processing.NodeManager} sourceManager The original NodeManager.
         * @param {Node} node The new text node to associate with the clone.
         * @param {processing.ElementManager} parent The parent ElementManager
         * for the new clone.
         */
        protected static _clone(sourceManager: NodeManager, node: Node, parent: ElementManager): TextManager;
        /**
         * @param {Node} newNode The new node attached to the cloned TextManager.
         * @param {processing.ElementManager} parentManager The parent ElementManager
         * for the clone.
         */
        clone(newNode: Node, parentManager: ElementManager): number;
        /**
         */
        bind(): void;
        /**
         * @param {Node} Node The associated node whose value will be set.
         * @param {ui.TemplateControl} control The control whose context will be used to bind
         * the data.
         * @param {Array<expressions.IParsedExpression>} expressions An array of parsed expressions used to build
         * the node value.
         */
        protected _setText(node: Node, control: ui.TemplateControl, expressions: Array<expressions.IParsedExpression>): void;
    }
    /**
     */
    function ITextManagerFactory(): ITextManagerFactory;
    /**
     */
    interface ITextManagerFactory {
        /**
         * @param {Node} node The Node used to find markup.
         * @param {processing.ElementManager} parent The parent ElementManager
         * for the node.
         */
        create(node: Node, parent?: ElementManager): TextManager;
    }
    /**
     */
    class CommentManager extends NodeManager {
        /**
         */
        type: string;
        /**
         * @param {Node} node The Comment to associate with the new manager.
         * @param {processing.ElementManager} parent The parent
         * ElementManager.
         */
        static create(node: Node, parent: ElementManager): CommentManager;
        /**
         * @param {Node} newNode The new Comment node to associate with the cloned
         * manager.
         * @param {processing.ElementManager} parentManager The parent ElementManager
         * for the clone.
         */
        clone(newNode: Node, parentManager: ElementManager): number;
    }
    /**
     */
    function ICommentManagerFactory(): ICommentManagerFactory;
    /**
     */
    interface ICommentManagerFactory {
        /**
         * @param {Node} node The Comment to associate with the new manager.
         * @param {processing.ElementManager} parent The parent
         * ElementManager.
         */
        create(node: Node, parent: ElementManager): CommentManager;
    }
    /**
     */
    class AttributeManager {
        /**
         */
        element: HTMLElement;
        /**
         */
        node: INode;
        /**
         */
        parent: ui.TemplateControl;
        /**
         */
        replace: boolean;
        /**
         */
        attributeChanged: () => void;
        /**
         */
        protected _NodeManager: INodeManagerStatic;
        /**
         */
        protected _markupRegex: RegExp;
        /**
         */
        protected _controls: Array<Control>;
        /**
         */
        protected _bindingExpressions: Array<expressions.IParsedExpression>;
        /**
         */
        protected _lastValues: IObject<boolean>;
        /**
         */
        static getInstance(): AttributeManager;
        /**
         * @param {HTMLElement} element The element that contains this attribute.
         * @param {processing.INode} node The INode associated with this attribute.
         * @param {ui.TemplateControl} parent The parent control for all the controls associated with
         * the element.
         * @param {Array<Control>} controls The controls associated with the element.
         * @param {boolean} replace? Whether or not the element is replaced.
         */
        initialize(element: Element, node: INode, parent: ui.TemplateControl, controls: Array<Control>, replace?: boolean): void;
        /**
         */
        protected _dynamicAttributeChanged(): void;
        /**
         */
        protected _staticAttributeChanged(): void;
        /**
         */
        protected _notifyAttributes(key: string, value: any): void;
    }
}
/**
 */
export declare module routing {
    /**
     */
    class Navigator {
        protected static _inject: any;
        /**
         */
        protected static _root: Navigator;
        /**
         */
        uid: string;
        /**
         */
        isRoot: boolean;
        /**
         */
        protected _Promise: async.IPromise;
        /**
         */
        protected _browserConfig: web.IBrowserConfig;
        /**
         */
        protected _browser: web.Browser;
        /**
         */
        protected _EventManager: events.IEventManagerStatic;
        /**
         */
        protected _window: Window;
        /**
         */
        protected _log: debug.Log;
        /**
         */
        protected _history: History;
        /**
         */
        protected _router: Router;
        /**
         */
        protected _removeUrlListener: IRemoveListener;
        /**
         */
        protected _ignoreOnce: boolean;
        /**
         */
        protected _previousUrl: string;
        /**
         */
        protected _backNavigate: boolean;
        /**
         */
        protected _resolveNavigate: () => void;
        /**
         */
        protected _rejectNavigate: (err: any) => void;
        /**
         * @param {routing.Router} router The router that the navigator should use to match/generate routes.
         */
        initialize(router: Router): void;
        /**
         * @param {any} view The view to which the Navigator should navigate.
         * @param {routing.INavigateOptions} options used to generate the url and perform navigation.
         */
        navigate(view: any, options?: INavigateOptions): async.IThenable<void>;
        /**
         */
        finishNavigating(): async.IThenable<void>;
        /**
         */
        goBack(options?: IBackNavigateOptions): async.IThenable<void>;
        /**
         */
        isBackNavigation(): boolean;
        /**
         */
        dispose(): void;
        /**
         */
        protected _navigate(url: string, replace?: boolean): async.IThenable<void>;
        /**
         */
        protected _goBack(length: number): async.IThenable<void>;
        /**
         */
        protected _observeUrl(): void;
        /**
         */
        protected _generate(view: any, parameters: any, query: any): string;
    }
    /**
     */
    interface INavigateOptions {
        /**
         */
        isUrl?: boolean;
        /**
         */
        parameters?: IObject<any>;
        /**
         */
        query?: IObject<any>;
        /**
         */
        replace?: boolean;
    }
    /**
     */
    interface IBackNavigateOptions {
        /**
         */
        length?: number;
    }
    /**
     */
    function History(_window?: Window): History;
    /**
     */
    interface IHistoryState {
        /**
         */
        previousLocation: string;
    }
    /**
     */
    class BaseSegment {
        /**
         */
        protected static _regex: expressions.Regex;
        /**
         */
        type: string;
        /**
         */
        name: string;
        /**
         */
        regex: string;
        /**
         */
        protected _specification: ICharacterSpecification;
        /**
         * @param {string} route The route to parse.
         * @param {Array<string>} names An array to populate with dynamic/splat segment names
         * @param {routing.ISegmentTypeCount} types An object to use for counting segment types in the route.
         */
        static parse(route: string, names: Array<string>, types: ISegmentTypeCount): Array<BaseSegment>;
        /**
         * @param {string} name The name of the segment to look for.
         * @param {string} token The token used to acquire a new segment if necessary.
         * @param {IObject<routing.BaseSegment>} cache The cache in which to look for/store the segment.
         */
        private static __findSegment(name, token, cache);
        /**
         * @param {string} name? The name for the new segment.
         */
        initialize(name?: string): void;
        /**
         * @param {(previousValue: T, spec: routing.ICharacterSpecification) => T} iterator The iterator to call with each character.
         * @param {T} initialValue? An optional initial value with which to start the accumulation.
         */
        reduceCharacters<T>(iterator: (previousValue: T, spec: ICharacterSpecification) => T, initialValue?: T): T;
        /**
         * @param {IObject<string>} parameters? The input parameters for the segment.
         */
        generate(parameters?: IObject<string>): string;
    }
    /**
     */
    function IBaseSegmentFactory(_regex: expressions.Regex): typeof BaseSegment;
    /**
     */
    class StaticSegment extends BaseSegment {
        /**
         */
        type: string;
        /**
         * @param {string} name? The name for the new segment.
         */
        initialize(name?: string): void;
        /**
         * @param {(previousValue: T, spec: routing.ICharacterSpecification) => T} iterator The iterator to call with each character.
         * @param {T} initialValue? An optional initial value with which to start the accumulation.
         */
        reduceCharacters<T>(iterator: (previousValue: T, spec: ICharacterSpecification) => T, initialValue?: T): T;
    }
    /**
     */
    class VariableSegment extends BaseSegment {
        /**
         */
        type: string;
        /**
         * @param {IObject<string>} parameters? The input parameters for the segment.
         */
        generate(parameters?: IObject<string>): string;
    }
    /**
     */
    class SplatSegment extends VariableSegment {
        /**
         */
        type: string;
        /**
         */
        regex: string;
        /**
         */
        protected _specification: ICharacterSpecification;
    }
    /**
     */
    class DynamicSegment extends VariableSegment {
        /**
         */
        type: string;
        /**
         */
        regex: string;
        /**
         */
        protected _specification: ICharacterSpecification;
    }
    /**
     */
    interface ICharacterSpecification {
        /**
         */
        invalidCharacters?: string;
        /**
         */
        validCharacters?: string;
        /**
         */
        repeat?: boolean;
    }
    /**
     */
    interface ISegmentTypeCount {
        /**
         */
        statics: number;
        /**
         */
        dynamics: number;
        /**
         */
        splats: number;
    }
    /**
     */
    class State {
        /**
         */
        nextStates: Array<State>;
        /**
         */
        specification: ICharacterSpecification;
        /**
         */
        delegates: Array<IDelegateParameterNames>;
        /**
         */
        regex: RegExp;
        /**
         */
        types: ISegmentTypeCount;
        /**
         * @param {routing.BaseSegment} segment The segment to compile.
         * @param {routing.State} state The initial state with which to start compilation.
         */
        static compile(segment: BaseSegment, state: State): State;
        /**
         * @param {routing.State} state The state with which to link the result.
         * @param {string} path The path to link to the given state.
         */
        static link(state: State, path: string): IRecognizeResult;
        /**
         * @param {string} char The character used to match next states.
         * @param {Array<routing.State>} states The states with which to match the character.
         */
        static recognize(char: string, states: Array<State>): Array<State>;
        /**
         * @param {Array<routing.State>} states The states to sort.
         */
        static sort(states: Array<State>): Array<State>;
        /**
         */
        constructor();
        /**
         * @param {routing.ICharacterSpecification} specification? The character specification for the state.
         */
        initialize(specification?: ICharacterSpecification): void;
        /**
         * @param {routing.ICharacterSpecification} specification? The character specification used to create
         * the next state if necessary.
         */
        add(specification: ICharacterSpecification): State;
        /**
         * @param {string} char The character with which to match next states.
         */
        match(char: string): Array<State>;
        /**
         * @param {routing.ICharacterSpecification} spec The character specification used to find
         * the next state.
         */
        protected _find(spec: ICharacterSpecification): State;
        /**
         * @param {(child: routing.State) => boolean} iterator The function with which to call for each
         * State. Can return true to break out of the loop
         */
        protected _someChildren(iterator: (child: State) => boolean): boolean;
        /**
         * @param {(child: routing.State) => void} iterator The function with which to call for each
         * State.
         */
        protected _someChildren(iterator: (child: State) => void): boolean;
    }
    /**
     */
    function IStateStatic(): typeof State;
    /**
     */
    interface IDelegateParameterNames {
        /**
         */
        delegate: any;
        /**
         */
        names: Array<string>;
    }
    /**
     */
    class RouteRecognizer {
        protected static _inject: any;
        /**
         */
        protected _BaseSegmentFactory: typeof BaseSegment;
        /**
         */
        protected _State: typeof State;
        /**
         */
        protected _rootState: State;
        /**
         */
        protected _namedRoutes: IObject<INamedRoute>;
        /**
         * @param {Array<routing.IRouteDelegate>} routes The routes to register.
         * @param {routing.IRegisterOptions} options? An object containing options for the
         * registered route.
         */
        register(routes: Array<IRouteDelegate>, options?: IRegisterOptions): void;
        /**
         * @param {string} path The path to recognize.
         */
        recognize(path: string): IRecognizeResult;
        /**
         * @param {string} name The named route with which to generate the route string.
         * @param {IObject<string>} parameters The route parameters, in the case that the
         * named route is dynamic.
         */
        generate(name: string, parameters?: IObject<string>): string;
        /**
         * @param {string} name The named route from which to get the delegates.
         */
        delegatesFor(name: string): Array<IDelegateParameterNames>;
        /**
         * @param {string} name The named route to search for.
         */
        exists(name: string): boolean;
        /**
         * @param {string} str The string to convert to lower case.
         */
        protected _toLowerCase(str: string): string;
        /**
         * @param {routing.State} state The state to finalize.
         * @param {string} regex The regular expression string built for the compiled routes. Used to recognize
         * routes and associate them with the compiled routes.
         */
        protected _finalize(state: State, regex: Array<string>): State;
        /**
         * @param {routing.IRouteDelegate} route The route options to be parsed.
         * @param {Array<routing.IDelegateParameterNames>} delegates The delegates and associated names for mapping parameters.
         * @param {routing.ISegmentTypeCount} types A count of all the segment types in the route.
         */
        protected _parse(route: IRouteDelegate, delegates: Array<IDelegateParameterNames>, types: ISegmentTypeCount): Array<BaseSegment>;
        /**
         * @param {Array<routing.BaseSegment>} segments The segments to compile.
         * @param {routing.State} state The initial state used to compile.
         * @param {Array<string>} regex A regular expression string to build in order to match the segments.
         */
        protected _compile(segments: Array<BaseSegment>, state: State, regex: Array<string>): State;
        /**
         * @param {string} path The path to which to add the slash.
         */
        protected _addLeadingSlash(path: string): string;
        /**
         * @param {string} path The path on which to look for a trailing slash.
         */
        protected _hasTrailingSlash(path: string): boolean;
        /**
         * @param {string} path The path with which to look for compiled states.
         */
        protected _findStates(path: string): Array<State>;
        /**
         * @param {Array<routing.State>} states The states to filter.
         */
        protected _filter(states: Array<State>): Array<State>;
        /**
         * @param {routing.State} states The state to link.
         * @param {string} path The path to link.
         * @param {boolean} isTrailingSlashDropped Whether or not the trailing slash is dropped from the path.
         */
        protected _link(state: State, path: string, isTrailingSlashDropped: boolean): IRecognizeResult;
        /**
         * @param {routing.State} states The state used to determine if it is dynamic or not.
         */
        protected _isDynamic(state: State): boolean;
    }
    /**
     */
    interface IRecognizeResult extends Array<IDelegateInfo> {
    }
    /**
     */
    interface IDelegateInfo {
        /**
         */
        delegate: any;
        /**
         */
        parameters: any;
        /**
         */
        isDynamic: boolean;
    }
    /**
     */
    interface INamedRoute {
        /**
         */
        segments: Array<BaseSegment>;
        /**
         */
        delegates: Array<IDelegateParameterNames>;
    }
    /**
     */
    interface IRouteDelegate {
        /**
         * /posts/*path
         */
        pattern: string;
        /**
         */
        delegate: any;
    }
    /**
     */
    interface IRegisterOptions {
        /**
         */
        name?: string;
    }
    /**
     */
    class Router {
        protected static _inject: any;
        /**
         */
        private static __currentRouter;
        /**
         */
        navigating: boolean;
        /**
         */
        finishNavigating: async.IThenable<void>;
        /**
         */
        currentRouteInfo: IRouteInfo;
        /**
         */
        parent: Router;
        /**
         */
        children: Array<Router>;
        /**
         */
        uid: string;
        /**
         */
        isRoot: boolean;
        /**
         */
        protected _nextRouteInfo: IRouteInfo;
        /**
         */
        protected _previousUrl: string;
        /**
         */
        protected _previousQuery: string;
        /**
         */
        protected _previousSegment: string;
        /**
         */
        protected _previousPattern: string;
        /**
         */
        protected _recognizer: RouteRecognizer;
        /**
         */
        protected _childRecognizer: RouteRecognizer;
        /**
         */
        protected _paramTransforms: IObject<IRouteTransforms>;
        /**
         */
        protected _queryTransforms: IObject<IRouteTransforms>;
        /**
         */
        protected _interceptors: IObject<Array<(routeInfo: IRouteInfo) => any>>;
        /**
         */
        protected _unknownHandler: (info: IUnknownRouteInfo) => any;
        /**
         */
        protected _ports: Array<ISupportRouteNavigation>;
        /**
         */
        protected _Promise: async.IPromise;
        /**
         */
        protected _Injector: typeof dependency.Injector;
        /**
         */
        protected _browser: web.Browser;
        /**
         */
        protected _resolve: typeof async.Promise.resolve;
        /**
         */
        protected _reject: typeof async.Promise.reject;
        /**
         * @param {routing.Router} router Will set the current router.
         */
        static currentRouter(router?: Router): Router;
        /**
         */
        constructor();
        /**
         * @param {routing.Router} parent? The parent router to link.
         */
        initialize(parent?: Router): void;
        /**
         * @param {routing.Router} child A child router.
         */
        addChild(child: Router): Router;
        /**
         * @param {routing.Router} child The child router to remove.
         */
        removeChild(child: Router): void;
        /**
         * @param {routing.ISupportRouteNavigation} port An object that supports all the navigation events.
         */
        register(port: ISupportRouteNavigation): async.IThenable<void>;
        /**
         * @param {routing.ISupportRouteNavigation} port An object that supports all the navigation events.
         */
        unregister(port: ISupportRouteNavigation): void;
        /**
         * @param {routing.IRouteMapping} route A route mapping to register.
         */
        configure(route: IRouteMapping): async.IThenable<void>;
        /**
         * @param {Array<routing.IRouteMapping>} routes Route mappings to register.
         */
        configure(routes: Array<IRouteMapping>): async.IThenable<void>;
        /**
         * @param {(info: IUnknownRouteInfo) => any} handler A method called to determine what view is associated with a route.
         */
        unknown(handler: (info: IUnknownRouteInfo) => any): Router;
        /**
         * @param {(value: any, parameters: any, query: any) => any} handler A method that will manipulate the registered parameter.
         * @param {string} parameter The parameter that the registered handler will modify.
         * @param {new (...args: any[]) => any} view The view used to match the route. If left out, all routes will be matched.
         */
        param(handler: (value: any, parameters: any, query: any) => any, parameter: string, view?: new (...args: any[]) => any): Router;
        /**
         * @param {(value: any, parameters: any, query: any) => any} handler A method that will manipulate the registered parameter.
         * @param {string} parameter The parameter that the registered handler will modify.
         * @param {string} view The view's registered token used to match the route. If left out, all routes will be matched.
         */
        param(handler: (value: any, parameters: any, query: any) => any, parameter: string, view?: string): Router;
        /**
         * @param {(value: any, query: any) => any} handler A method that will manipulate the registered parameter.
         * @param {string} parameter The parameter that the registered handler will modify.
         * @param {new (...args: any[]) => any} view The view used to match the route. If left out, all routes will be matched.
         */
        queryParam(handler: (value: any, query: any) => any, parameter: string, view?: new (...args: any[]) => any): Router;
        /**
         * @param {(value: any, query: any) => any} handler A method that will manipulate the registered parameter.
         * @param {string} parameter The parameter that the registered handler will modify.
         * @param {string} view The view's registered token used to match the route. If left out, all routes will be matched.
         */
        queryParam(handler: (value: any, query: any) => any, parameter: string, view?: string): Router;
        /**
         * @param {(routeInfo: routing.IRouteInfo) => any} interceptor A method that will process the current route.
         * @param {new (...args: any[]) => any} view The view used to match the route. If left out, all routes will be matched.
         */
        intercept(handler: (routeInfo: IRouteInfo) => any, view?: new (...args: any[]) => any): Router;
        /**
         * @param {(routeInfo: routing.IRouteInfo) => any} interceptor A method that will process the current route.
         * @param {string} view The view's registered token used to match the route. If left out, all routes will be matched.
         */
        intercept(interceptor: (routeInfo: IRouteInfo) => any, view?: string): Router;
        /**
         * @param {string} url The new route to match.
         * @param {IObject<any>} query The query parameters for the route.
         * @param {boolean} force Whether or not to force navigation, even if the same url has already been matched.
         */
        navigate(url: string, query?: IObject<any>, force?: boolean, poll?: boolean): async.IThenable<void>;
        /**
         * @param {new (...args: any[]) => any} name The Constructor of the named-route to generate.
         * @param {IObject<string>} parameters? Any parameters used to generate the route.
         * @param {IObject<string>} query? Any query parameters to append to the generated route.
         */
        generate(name: new (...args: any[]) => any, parameters?: IObject<string>, query?: IObject<string>): string;
        /**
         * @param {string} name The name of the route to generate.
         * @param {IObject<string>} parameters? Any parameters used to generate the route.
         * @param {IObject<string>} query? Any query parameters to append to the generated route.
         */
        generate(name: string, parameters?: IObject<string>, query?: IObject<string>): string;
        /**
         * @param {routing.IRouteMapping} route The mapping used to configure the route.
         */
        protected _configureRoute(route: IRouteMapping): void;
        /**
         * @param {(value: any, query: any) => any} handler A method that will manipulate the registered parameter.
         * @param {string} parameter The parameter that the registered handler will modify.
         * @param {any} view The view used to match the route. If undefined, all routes will be matched.
         * @param {IObject<routing.IRouteTransforms>} handlers The object to which to add the handler.
         */
        protected _addHandler(handler: (value: string, values: any, query?: any) => any, parameter: string, view: any, handlers: IObject<IRouteTransforms>): Router;
        /**
         */
        protected _forceNavigate(): async.IThenable<void>;
        /**
         * @param {routing.IRouteInfo} info The information necessary to build the childRoute for the child routers.
         */
        protected _navigateChildren(info: IRouteInfo, poll?: boolean): async.IThenable<void>;
        /**
         * @param {routing.IRouteInfo} info The information necessary to get the child route.
         */
        protected _getChildRoute(info: IRouteInfo): string;
        /**
         * @param {routing.IRouteInfo} info The route information.
         */
        protected _performNavigation(info: IRouteInfo): async.IThenable<void>;
        /**
         * @param {boolean} ignorePorts? Ignores the ports if necessary.
         */
        protected _performNavigateFrom(ignorePorts?: boolean): async.IThenable<void>;
        /**
         * @param {routing.IRouteInfo} info The route information.
         */
        protected _canNavigate(info: IRouteInfo, poll?: boolean): async.IThenable<boolean>;
        /**
         * @param {boolean} ignorePorts Ignores the ports if necessary.
         */
        protected _canNavigateFrom(ignorePorts?: boolean): async.IThenable<boolean>;
        /**
         * @param {routing.IRouteInfo} info The route information.
         * @param {boolean} ignorePorts Ignores the ports if necessary.
         */
        protected _canNavigateTo(info: IRouteInfo, ignorePorts?: boolean): async.IThenable<boolean>;
        /**
         * @param {string} view The associated view for the route.
         * @param {any} parameters The route parameters.
         * @param {any} query? The query parameters.
         */
        protected _callAllHandlers(view: string, parameters: any, query?: any): async.IThenable<void>;
        /**
         * @param {routing.IRouteTransforms} allHandlers The transform functions
         * @param {any} obj The parameters.
         * @param {any} query? The query parameters.
         */
        protected _callHandlers(allHandlers: IRouteTransforms, obj: any, query?: any): async.IThenable<void>;
        /**
         * @param {routing.IRouteInfo} info The route information.
         */
        protected _callInterceptors(info: IRouteInfo): async.IThenable<boolean>;
        /**
         * @param {routing.IRouteInfo} info The route information.
         */
        protected _isSameRoute(info: IRouteInfo): boolean;
        /**
         * @param {routing.IRouteInfo} info The route information.
         */
        protected _sanitizeRouteInfo(info: IRouteInfo): void;
        /**
         */
        protected _clearInfo(): void;
    }
    /**
     */
    function IRouterStatic(): IRouterStatic;
    /**
     */
    interface IRouterStatic {
        /**
         * @param {routing.Router} router Will set the current router.
         */
        currentRouter(router?: Router): Router;
    }
    /**
     */
    interface IRouteMapping {
        /**
         */
        pattern: string;
        /**
         */
        view: any;
        /**
         */
        alias?: string;
    }
    /**
     */
    interface IRouteResult extends Array<IRouteInfo> {
    }
    /**
     */
    interface IRouteInfo extends IDelegateInfo {
        /**
         */
        delegate: IRouteMapping;
        /**
         */
        query?: IObject<any>;
    }
    /**
     */
    interface IUnknownRouteInfo {
        /**
         */
        segment: string;
        /**
         */
        view: any;
    }
    /**
     */
    interface IRouteTransforms extends IObject<Array<(value: string, values: any, query?: any) => any>> {
    }
    /**
     */
    interface ISupportRouteNavigation {
        /**
         */
        canNavigateFrom(): async.IThenable<boolean>;
        /**
         * @param {routing.IRouteInfo} routeInfo Contains the information necessary to instantiate
         * the view and feed it the route parameters/query.
         */
        canNavigateTo(routeInfo: IRouteInfo): async.IThenable<boolean>;
        /**
         */
        navigateFrom(): async.IThenable<any>;
        /**
         * @param {routing.IRouteInfo} routeInfo Contains the information necessary to instantiate
         * the view and feed it the route parameters/query.
         */
        navigateTo(routeInfo: IRouteInfo): async.IThenable<any>;
    }
}
/**
 */
export declare module controls {
    /**
     */
    class Name extends AttributeControl {
        /**
         */
        protected _label: string;
        /**
         */
        initialize(): void;
        /**
         */
        dispose(): void;
        /**
         * @param {string} name The name to define on all the ancestor controls.
         */
        protected _define(name: string): void;
        /**
         * @param {string} name The name to define on all the ancestor controls.
         */
        protected _isPrecompiled(): boolean;
    }
    /**
     */
    interface INamedElement<E extends Element, C> {
        /**
         */
        element: E;
        /**
         */
        control?: C;
    }
    /**
     */
    class SimpleEventControl extends AttributeControl implements ISendEvents {
        protected static _inject: any;
        /**
         */
        protected _parser: expressions.Parser;
        /**
         */
        protected _regex: expressions.Regex;
        /**
         */
        event: string;
        /**
         */
        attribute: string;
        /**
         */
        protected _expression: Array<string>;
        /**
         */
        protected _aliases: Array<string>;
        /**
         */
        loaded(): void;
        /**
         */
        protected _setListener(): void;
        /**
         */
        protected _addEventListeners(): void;
        /**
         */
        protected _buildExpression(): {
            fn: () => void;
            context: any;
            args: Array<expressions.IParsedExpression>;
        };
        /**
         * @param {Event} ev The event object.
         */
        protected _onEvent(ev: Event): void;
        /**
         * @param {Array<string>} args The array of arguments as strings.
         */
        protected _findAliases(args: Array<string>): Array<string>;
        /**
         * @param {string} expression The expression to parse.
         */
        protected _parseArgs(expression: string): void;
    }
    /**
     */
    interface ISendEvents {
        /**
         */
        event: string;
        /**
         */
        attribute: string;
    }
    /**
     */
    class Tap extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class Blur extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class Change extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class Copy extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class Cut extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class Paste extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class DblTap extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class Focus extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class TouchStart extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class TouchEnd extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class TouchMove extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class TouchCancel extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class Hold extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class Release extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class Swipe extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class SwipeLeft extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class SwipeRight extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class SwipeUp extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class SwipeDown extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class Track extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class TrackLeft extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class TrackRight extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class TrackUp extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class TrackDown extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class TrackEnd extends SimpleEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class Submit extends SimpleEventControl {
        /**
         */
        event: string;
        /**
         * @param {Event} ev The event object.
         */
        protected _onEvent(ev: Event): void;
    }
    /**
     */
    class React extends SimpleEventControl {
        protected static _inject: any;
        /**
         */
        protected _compat: Compat;
        /**
         */
        event: string;
        /**
         */
        protected _addEventListeners(): void;
    }
    /**
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
     */
    class KeyCodeEventControl extends SimpleEventControl implements IKeyCodeEventControl {
        /**
         */
        keyCodes: IObject<boolean>;
        /**
         */
        protected _setListener(): void;
        /**
         */
        protected _filterArgs(input: IKeyboardEventInput): Array<any>;
        /**
         * @param {KeyboardEvent} ev The keyboard event object.
         */
        protected _onEvent(ev: KeyboardEvent): void;
        /**
         * @param {KeyboardEvent} ev The keyboard event object.
         */
        protected _compareKeys(ev: KeyboardEvent): boolean;
        /**
         * @param {Array<string>} keys? The array of defined keys to satisfy the
         * key press condition.
         */
        protected _setKeyCodes(keys?: Array<string>): void;
    }
    /**
     */
    interface IKeyCodeEventControl extends ISendEvents {
        /**
         */
        keyCodes: IObject<boolean>;
    }
    /**
     */
    interface IKeyboardEventInput {
        /**
         */
        method: string;
        /**
         */
        key?: any;
        /**
         */
        keys?: Array<any>;
        /**
         */
        char?: any;
        /**
         */
        chars?: Array<any>;
    }
    /**
     */
    class KeyDown extends KeyCodeEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class KeyPress extends KeyCodeEventControl {
        /**
         */
        event: string;
        /**
         * @param {KeyboardEvent} ev The KeyboardEvent object.
         */
        _onEvent(ev: KeyboardEvent): void;
        /**
         * @param {KeyboardEvent} ev The keyboard event object.
         */
        protected _compareKeys(ev: KeyboardEvent): boolean;
    }
    /**
     */
    class KeyUp extends KeyCodeEventControl {
        /**
         */
        event: string;
    }
    /**
     */
    class CharPress extends KeyCodeEventControl {
        /**
         */
        event: string;
        /**
         */
        protected _filterArgs(input: IKeyboardEventInput): Array<any>;
        /**
         * @param {KeyboardEvent} ev The keyboard event object.
         */
        protected _onEvent(ev: KeyboardEvent): void;
        /**
         * @param {KeyboardEvent} ev The keyboard event object.
         */
        protected _compareKeys(ev: KeyboardEvent): boolean;
        /**
         * @param {Array<string>} keys? The array of defined keys to satisfy the
         * key press condition.
         */
        protected _setKeyCodes(keys?: Array<string>): void;
    }
    /**
     */
    class SetAttributeControl extends AttributeControl implements ISetAttributeControl {
        /**
         */
        property: string;
        /**
         */
        attribute: string;
        /**
         */
        protected _stopSetter: IRemoveListener;
        /**
         */
        private __removeListener;
        /**
         */
        loaded(): void;
        /**
         */
        contextChanged(): void;
        /**
         */
        dispose(): void;
        /**
         */
        setter(): void;
    }
    /**
     */
    interface ISetAttributeControl {
        /**
         */
        property: string;
        /**
         */
        attribute: string;
        /**
         */
        setter(): void;
    }
    /**
     */
    class Checked extends SetAttributeControl {
        /**
         */
        property: string;
    }
    /**
     */
    class Disabled extends SetAttributeControl {
        /**
         */
        property: string;
    }
    /**
     */
    class Selected extends SetAttributeControl {
        /**
         */
        property: string;
    }
    /**
     */
    class ReadOnly extends SetAttributeControl {
        /**
         */
        property: string;
    }
    /**
     */
    class Visible extends SetAttributeControl {
        /**
         */
        property: string;
        /**
         */
        value: string;
        /**
         */
        importance: string;
        /**
         */
        protected _initialValue: string;
        /**
         */
        initialize(): void;
        /**
         */
        setter(): void;
        /**
         * @param {string} value The value to set.
         * @param {string} importance? The priority or importance level to set.
         */
        protected _setValue(value: string, importance?: string): void;
    }
    /**
     */
    class Style extends SetAttributeControl {
        /**
         */
        property: string;
        /**
         */
        protected _styleRegex: RegExp;
        /**
         */
        protected _urlRegex: RegExp;
        /**
         */
        protected _urlReplace: string;
        /**
         */
        private __addedStyles;
        /**
         */
        private __oldStyles;
        /**
         */
        setter(): void;
    }
    /**
     */
    class ElementPropertyControl extends SetAttributeControl {
        /**
         */
        setter(): void;
    }
    /**
     */
    class Href extends ElementPropertyControl {
        /**
         */
        property: string;
    }
    /**
     */
    class Src extends ElementPropertyControl {
        protected static _inject: any;
        /**
         */
        property: string;
        /**
         */
        protected _browser: web.Browser;
        /**
         */
        setter(): void;
    }
    /**
     */
    class Bind extends AttributeControl implements observable.IImplementTwoWayBinding {
        protected static _inject: any;
        /**
         */
        priority: number;
        /**
         */
        protected _parser: expressions.Parser;
        /**
         */
        protected _ContextManager: observable.IContextManagerStatic;
        /**
         */
        protected _compat: Compat;
        /**
         */
        protected _document: Document;
        /**
         */
        protected _addEventType: () => void;
        /**
         */
        protected _getter: () => any;
        /**
         */
        protected _setter: (newValue: any, oldValue?: any, firstTime?: boolean) => void;
        /**
         */
        protected _expression: expressions.IParsedExpression;
        /**
         */
        protected _contextExpression: expressions.IParsedExpression;
        /**
         */
        protected _property: string;
        /**
         */
        protected _propertyType: string;
        /**
         */
        protected _supportsTwoWayBinding: boolean;
        /**
         */
        private __fileSupported;
        /**
         */
        private __fileNameRegex;
        /**
         */
        private __isSelf;
        /**
         */
        initialize(): void;
        /**
         */
        loaded(): void;
        /**
         */
        contextChanged(): void;
        /**
         */
        dispose(): void;
        /**
         */
        evaluate(): any;
        /**
         * @param {observable.IBoundPropertyChangedListener<T>} listener The listener to fire when the bound property or its
         * specified child changes.
         * @param {string} identifier? The identifier of the child property of the bound item.
         * @param {boolean} autocast? Will cast a primitive value to whatever it was set to in code.
         */
        observeProperty<T>(listener: observable.IBoundPropertyChangedListener<T>, identifier?: string, autocast?: boolean): IRemoveListener;
        /**
         * @param {observable.IBoundPropertyChangedListener<T>} listener The listener to fire when the bound property or its
         * specified child changes.
         * @param {number} index? The index of the child property of the bound item if the bound item is an Array.
         * @param {boolean} autocast? Will cast a primitive value to whatever it was set to in code.
         */
        observeProperty<T>(listener: observable.IBoundPropertyChangedListener<T>, index?: number, autocast?: boolean): IRemoveListener;
        /**
         * @param {(changes: Array<observable.IArrayChanges<T>>, identifier: string) => void} listener The listener function.
         * @param {string} identifier? The identifier off of the bound object to listen to for changes. If undefined or empty
         * the listener will listen for changes to the bound item itself.
         * @param {boolean} arrayMutationsOnly? Whether or not to listen only for Array mutation changes.
         */
        observeArrayChange<T>(listener: (changes: Array<observable.IArrayChanges<T>>, identifier: string) => void, identifier?: string): IRemoveListener;
        /**
         * @param {(changes: Array<observable.IArrayChanges<T>>, identifier: number) => void} listener The listener function.
         * @param {number} index? The index off of the bound object to listen to for changes if the bound object is an Array.
         * If undefined or empty the listener will listen for changes to the bound Array itself.
         * @param {boolean} arrayMutationsOnly? Whether or not to listen only for Array mutation changes.
         */
        observeArrayChange<T>(listener: (changes: Array<observable.IArrayChanges<T>>, identifier: number) => void, index?: number): IRemoveListener;
        /**
         */
        protected _addTextEventListener(): void;
        /**
         */
        protected _addChangeEventListener(): void;
        /**
         */
        protected _addButtonEventListener(): void;
        /**
         */
        protected _addRangeEventListener(): void;
        /**
         */
        protected _getChecked(): boolean;
        /**
         */
        protected _getValue(): string;
        /**
         */
        protected _getTextContent(): string;
        /**
         */
        protected _getFile(): IFile;
        /**
         */
        protected _getFiles(): Array<IFile>;
        /**
         */
        protected _getSelectedValues(): Array<string>;
        /**
         * @param {any} newValue The new value to set
         * @param {any} oldValue The previously bound value
         * @param {boolean} firstTime? The context is being evaluated for the first time and
         * should thus change the property if null
         */
        protected _setText(newValue: any, oldValue: any, firstTime?: boolean): void;
        /**
         * @param {any} newValue The new value to set
         * @param {any} oldValue The previously bound value
         * @param {boolean} firstTime? The context is being evaluated for the first time and
         * should thus change the property if null
         */
        protected _setRange(newValue: any, oldValue: any, firstTime?: boolean): void;
        /**
         * @param {any} newValue The new value to set
         * @param {any} oldValue The previously bound value
         * @param {boolean} firstTime? The context is being evaluated for the first time and
         * should thus change the property if null
         */
        protected _setHidden(newValue: any, oldValue: any, firstTime?: boolean): void;
        /**
         * @param {any} newValue The new value to set
         */
        protected _setValue(newValue: any): void;
        /**
         * @param {any} newValue The new value to set
         * @param {any} oldValue The previously bound value
         * @param {boolean} firstTime? The context is being evaluated for the first time and
         * should thus change the property if null
         */
        protected _setChecked(newValue: any, oldValue: any, firstTime?: boolean): void;
        /**
         * @param {any} newValue The new value to set
         */
        protected _setRadio(newValue: any): void;
        /**
         * @param {any} newValue The new value to set
         * @param {any} oldValue The previously bound value
         * @param {boolean} firstTime? The context is being evaluated for the first time and
         * should thus change the property if null
         */
        protected _setSelectedIndex(newValue: any, oldValue: any, firstTime?: boolean): void;
        /**
         * @param {any} newValue The new value to set
         * @param {any} oldValue The previously bound value
         * @param {boolean} firstTime? The context is being evaluated for the first time and
         * should thus change the property if null
         */
        protected _setSelectedIndices(newValue: any, oldValue: any, firstTime?: boolean): void;
        /**
         */
        protected _determineType(): void;
        /**
         */
        protected _watchExpression(): void;
        /**
         * @param {string} identifier The identifier to base the created context off of.
         */
        protected _createContext(identifier: string): any;
        /**
         * @param {any} value The value to cast.
         * @param {any} type? The optional type to cast the value to.
         */
        protected _castProperty(value: any, type?: any): any;
        /**
         */
        protected _propertyChanged(): void;
        /**
         */
        protected _initializeRadio(): void;
        /**
         */
        protected _initializeSelect(): void;
        /**
         */
        protected _observingBindableProperty(): boolean;
        /**
         * @param {Function} listener The listener function.
         * @param {any} identifier? The index off of the bound object to listen to for changes if the bound object is an Array.
         * If undefined or empty the listener will listen for changes to the bound Array itself.
         * @param {boolean} autocast? Will cast a primitive value to whatever it was set to in code.
         * @param {boolean} arrayMutations? Whether or not this is for Array mutation changes.
         */
        protected _observeProperty(listener: Function, identifier?: any, autocast?: boolean, arrayMutations?: boolean): IRemoveListener;
        /**
         * @param {any} value The value to grab the property type from.
         */
        protected _getPropertyType(value: any): any;
    }
    /**
     */
    interface IFile extends File {
        /**
         */
        path?: string;
    }
    /**
     */
    class ObservableAttributeControl extends AttributeControl {
        protected static _inject: any;
        /**
         */
        protected _ContextManager: observable.IContextManagerStatic;
        /**
         */
        property: string;
        /**
         */
        attribute: string;
        /**
         */
        priority: number;
        /**
         */
        protected _listeners: Array<(newValue: any, oldValue: any) => void>;
        /**
         */
        protected _removeListener: IRemoveListener;
        /**
         */
        protected _boundAddListener: typeof ObservableAttributeControl.prototype._addListener;
        /**
         */
        initialize(): void;
        /**
         */
        loaded(): void;
        /**
         */
        dispose(): void;
        /**
         * @param {any} value The new value of the evaluated expression.
         * @param {any} oldValue? The old value of the evaluated expression.
         */
        protected _setProperty(value: any, oldValue?: any): void;
        /**
         * @param {any} value The new value of the evaluated expression.
         * @param {any} oldValue The old value of the evaluated expression.
         */
        protected _callListeners(newValue: any, oldValue: any): void;
        /**
         * @param {IPropertyChangedListener} listener The listener added by the Template Control.
         */
        protected _addListener(listener: (newValue: any, oldValue: any) => void): IRemoveListener;
        /**
         */
        protected _getValue(): any;
        /**
         */
        protected _observeProperty(): void;
    }
    /**
     */
    class Options extends ObservableAttributeControl {
        /**
         */
        property: string;
    }
}
/**
 */
export declare class App {
    /**
     */
    static app: App;
    /**
     */
    protected static _compat: Compat;
    /**
     */
    protected static _EventManager: events.IEventManagerStatic;
    /**
     */
    protected static _document: Document;
    /**
     */
    protected static _compiler: processing.Compiler;
    /**
     */
    protected static _LifecycleEvent: events.ILifecycleEventStatic;
    /**
     */
    protected static _log: debug.Log;
    /**
     */
    private static __injector;
    /**
     */
    uid: string;
    /**
     */
    navigator: routing.Navigator;
    /**
     */
    protected _log: debug.Log;
    /**
     */
    static start(): void;
    /**
     * @param {dependency.Injector<App>} appInjector The injector for
     * injecting the app instance.
     */
    static registerApp(appInjector: dependency.Injector<App>): void;
    /**
     * @param {Node} node The node at which DOM compilation begins.
     */
    static load(node?: Node): void;
    /**
     * @param {events.LifecycleEvent} ev The LifecycleEvent for the app ready.
     */
    private static __ready(ev);
    /**
     */
    private static __shutdown();
    /**
     */
    private static __registerAppEvents(ev);
    /**
     */
    private static __addPlatCss();
    /**
     */
    constructor();
    /**
     * @param {events.LifecycleEvent} ev The LifecycleEvent object.
     */
    suspend(ev: events.LifecycleEvent): void;
    /**
     * @param {events.LifecycleEvent} ev The LifecycleEvent object.
     */
    resume(ev: events.LifecycleEvent): void;
    /**
     * @param {events.ErrorEvent<Error>} ev The ErrorEvent object.
     */
    error(ev: events.ErrorEvent<Error>): void;
    /**
     * @param {events.LifecycleEvent} ev The LifecycleEvent object.
     */
    ready(ev: events.LifecycleEvent): void;
    /**
     * @param {events.LifecycleEvent} ev The LifecycleEvent object.
     */
    exiting(ev: events.LifecycleEvent): void;
    /**
     * @param {events.LifecycleEvent} ev The LifecycleEvent object.
     */
    online(ev: events.LifecycleEvent): void;
    /**
     * @param {events.LifecycleEvent} ev The LifecycleEvent object.
     */
    offline(ev: events.LifecycleEvent): void;
    /**
     * @param {string} name The name of the event to send, cooincides with the name used in the
     * app.on() method.
     * @param {Array<any>} ...args Any number of arguments to send to all the listeners.
     */
    dispatchEvent(name: string, ...args: any[]): void;
    /**
     * @param {string} name The name of the event, cooinciding with the DispatchEvent name.
     * @param {(ev: events.DispatchEvent, ...args: Array<any>) => void} listener The method called when
     * the DispatchEvent is fired.
     */
    on(name: string, listener: (ev: events.DispatchEvent, ...args: any[]) => void): IRemoveListener;
    /**
     * @param {Node} node The node where at which DOM compilation begins.
     */
    load(node?: Node): void;
    /**
     */
    exit(): void;
}
/**
 */
export declare function IAppStatic(_compat?: Compat, _EventManager?: events.IEventManagerStatic, _document?: Document, _compiler?: processing.Compiler, _LifecycleEvent?: events.ILifecycleEventStatic, _log?: debug.Log): IAppStatic;
/**
 */
export declare function IApp(_AppStatic?: IAppStatic): App;
/**
 */
export interface IAppStatic {
    /**
     */
    app: App;
    /**
     */
    start(): void;
    /**
     * @param {dependency.Injector<App>} appInjector The injector for
     * injecting the app instance.
     */
    registerApp(appInjector: dependency.Injector<App>): void;
    /**
     * @param node The node at which DOM compilation begins.
     */
    load(node?: Node): void;
}
/**
 */
export interface IObject<T> {
    /**
     */
    [key: string]: T;
}
/**
 */
export interface IRemoveListener {
    /**
     */
    (): void;
}
/**
 */
export interface IPropertyChangedListener<T> {
    /**
     * @param {T} newValue The new value of the observed property.
     * @param {T} oldValue The previous value of the observed property.
     */
    (newValue: T, oldValue: T): void;
}
/**
 */
export interface IIdentifierChangedListener<T> {
    /**
     * @param {T} newValue The new value of the observed property.
     * @param {T} oldValue The previous value of the observed property.
     * @param {any} identifier The string or number identifier that specifies the changed property.
     */
    (newValue: T, oldValue: T, identifier: any): void;
}
