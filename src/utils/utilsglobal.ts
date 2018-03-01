let ___Promise: plat.async.IPromise;
let ___compat: plat.Compat;
let __camelCaseRegex: RegExp;
let __capitalCaseRegex: RegExp;
let __nativeIsArray = typeof Array.isArray === 'function';

const __uids: plat.IObject<string[]> = {};
const __objToString = Object.prototype.toString;
const __toStringClass = '[object ';
const __errorClass = `${__toStringClass}Error]`;
const __fileClass = `${__toStringClass}File]`;
const __arrayClass = `${__toStringClass}Array]`;
const __boolClass = `${__toStringClass}Boolean]`;
const __dateClass = `${__toStringClass}Date]`;
const __funcClass = `${__toStringClass}Function]`;
const __numberClass = `${__toStringClass}Number]`;
const __objectClass = `${__toStringClass}Object]`;
const __regexpClass = `${__toStringClass}RegExp]`;
const __stringClass = `${__toStringClass}String]`;
const __promiseClass = `${__toStringClass}Promise]`;
const __objectTypes: any = {
        boolean: false,
        function: true,
        object: true,
        number: false,
        string: false,
        undefined: false,
    };

function noop(): void { }

function _defineProperty(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean, writable?: boolean): void {
    Object.defineProperty(obj, key, {
        value: value,
        enumerable: enumerable === true,
        configurable: configurable === true,
        writable: writable === true,
    });
}

function _defineGetter(obj: any, key: string, value: any, enumerable?: boolean, configurable?: boolean): void {
    Object.defineProperty(obj, key, {
        get: (): any => value,
        enumerable: enumerable === true,
        configurable: configurable === true,
    });
}

function _extend(deep: boolean, redefine: any, destination: any, ...sources: any[]): any {
    if (isNull(destination)) {
        return destination;
    }

    let keys: string[];
    let property: any;
    let define: (obj: any, key: string, value: any) => void;

    if (isFunction(redefine)) {
        define = redefine;
    } else if (redefine) {
        define = (obj: any, key: string, value: any) => {
            _defineProperty(obj, key, value, true, true, true);
        };
    } else {
        define = (obj: any, key: string, value: any) => {
            obj[key] = value;
        };
    }

    if (isEmpty(sources)) {
        sources.push(destination);
    }

    forEach((source, k): void => {
        if (!isObject(source)) {
            return;
        }

        keys = Object.keys(source);

        forEach((key): void => {
            property = source[key];
            if (deep) {
                if (isArray(property)) {
                    if (!isArray(destination[key])) {
                        destination[key] = [];
                    }
                    _extend(deep, define, destination[key], property);

                    return;
                } else if (isDate(property)) {
                    define(destination, key, new Date(property.getTime()));

                    return;
                } else if (isRegExp(property)) {
                    define(destination, key, new RegExp(property));

                    return;
                } else if (isNode(property)) {
                    define(destination, key, (<Node>property).cloneNode(true));

                    return;
                } else if (isFile(property)) {
                    define(destination, key, property);

                    return;
                } else if (isObject(property)) {
                    if (!isObject(destination[key])) {
                        destination[key] = {};
                    }
                    _extend(deep, define, destination[key], property);

                    return;
                }
            }
            define(destination, key, property);
        }, keys);
    }, sources);

    return destination;
}

function _clone(obj: any, deep?: boolean): any {
    if (!isObject(obj)) {
        return obj;
    } else if (isDate(obj)) {
        return new Date((<Date>obj).getTime());
    } else if (isRegExp(obj)) {
        return new RegExp(obj);
    } else if (isNode(obj)) {
        return (<Node>obj).cloneNode(deep);
    } else if (isFile(obj)) {
        return obj;
    } else if (isError(obj)) {
        return new obj.constructor((<Error>obj).message);
    }

    let destination = {};

    if (isArray(obj)) {
        destination = [];
    }

    if (isBoolean(deep) && deep) {
        return _extend(true, false, destination, obj);
    }

    return _extend(false, false, destination, obj);
}

function isError(obj: any): boolean {
    return __objToString.call(obj) === __errorClass;
}

function isObject(obj: any): boolean {
    return obj != null && typeof obj === 'object';
}

function isWindow(obj: any): boolean {
    return !!(obj && obj.document && obj.setInterval);
}

function isDocument(obj: any): boolean {
    return !!(obj && obj.nodeType === Node.DOCUMENT_NODE);
}

function isNode(obj: any): boolean {
    return !!(obj && typeof obj.nodeType === 'number');
}

function isDocumentFragment(obj: any): boolean {
    return !!(obj && (<Node>obj).nodeType === Node.DOCUMENT_FRAGMENT_NODE);
}

function isFile(obj: any): boolean {
    return isObject(obj) && __objToString.call(obj) === __fileClass;
}

function isString(obj: any): boolean {
    return typeof obj === 'string' || isObject(obj) && __objToString.call(obj) === __stringClass;
}

function isRegExp(obj: any): boolean {
    return isObject(obj) && __objToString.call(obj) === __regexpClass;
}

function isPromise(obj: any): boolean {
    return isObject(obj) && (__objToString.call(obj) === __promiseClass || isFunction(obj.then));
}

function isEmpty(obj: any): boolean {
    if (isNull(obj)) {
        return true;
    }

    if (isString(obj) || isArray(obj)) {
        return obj.length === 0;
    }

    if (!isObject(obj)) {
        return false;
    }

    return Object.keys(obj).length === 0;
}

function isBoolean(obj: any): boolean {
    return obj === true || obj === false || isObject(obj) && __objToString.call(obj) === __boolClass;
}

function isNumber(obj: any): boolean {
    return (typeof obj === 'number' || isObject(obj) && __objToString.call(obj) === __numberClass) && !isNaN(obj);
}

function isFunction(obj: any): boolean {
    return typeof obj === 'function';
}

function isNull(obj: any): boolean {
    return obj === null || obj === undefined;
}

function isUndefined(obj: any): boolean {
    return obj === undefined;
}

function isArray(obj: any): boolean {
    if (__nativeIsArray) {
        return Array.isArray(obj);
    }

    return __objToString.call(obj) === __arrayClass;
}

function isArrayLike(obj: any): boolean {
    if (isNull(obj) || isWindow(obj) || isFunction(obj)) {
        return false;
    }

    return isString(obj) || obj.length >= 0;
}

function isDate(obj: any): boolean {
    return typeof obj === 'object' && __objToString.call(obj) === __dateClass;
}

function filter<T>(iterator: (value: T, key: any, obj: any) => boolean, obj: any, context?: any): T[] {
    const arr: T[] = [];
    if (isNull(obj)) {
        return arr;
    }

    if (isFunction(obj.filter)) {
        return obj.filter(iterator, context);
    }

    forEach<T>((value: T, key: any, o: any): void => {
        if (iterator(value, key, o)) {
            arr.push(value);
        }
    }, obj);

    return arr;
}

function where(properties: any, obj: any): any[] {
    return filter((value): boolean => {
        return !some((property, key): boolean => {
            return (value)[key] !== property;
        }, properties);
    }, obj);
}

function forEach<T>(iterator: (value: T, index: number, obj: any) => void, array: T[], context?: any): T[];
function forEach<T>(iterator: (value: T, key: string, obj: any) => void, obj: any, context?: any): any;
function forEach<T>(iterator: (value: T, key: any, obj: any) => void, obj: any, context?: any): any {
    if (isNull(obj) || !(isObject(obj) || isArrayLike(obj))) {
        return obj;
    }

    let i: number;
    let key: string;
    let length: number;

    if (isFunction(obj.forEach)) {
        return obj.forEach(iterator, context);
    } else if (isArrayLike(obj)) {
        length = obj.length;
        for (i = 0; i < length; i += 1) {
            iterator.call(context, obj[i], i, obj);
        }
    } else {
        const keys = Object.keys(obj);
        length = keys.length;
        while (keys.length > 0) {
            key = keys.shift();
            iterator.call(context, obj[key], key, obj);
        }
    }

    return obj;
}

function map<T, R>(iterator: (value: T, key: any, obj: any) => R, obj: any, context?: any): R[] {
    const arr: R[] = [];

    if (isNull(obj)) {
        return arr;
    }

    if (isFunction(obj.map)) {
        return obj.map(iterator, context);
    }

    forEach((value, key): void => {
        arr.push(iterator.call(context, value, key, obj));
    }, obj);

    return arr;
}

function mapAsync<T, R>(iterator: (value: T, key: any, obj: any) => plat.async.Promise<R>, obj: any,
    context?: any): plat.async.Promise<R[]> {
    if (!isObject(___Promise)) {
        ___Promise = plat.acquire(__Promise);
    }

    const promises = map(iterator, obj, context);

    return ___Promise.all(promises);
}

function mapAsyncWithOrder<T, R>(iterator: (value: T, index: number, list: T[]) => plat.async.Promise<R>,
    array: T[], context: any, descending?: boolean): plat.async.Promise<R[]> {
    if (!isObject(___Promise)) {
        ___Promise = plat.acquire(__Promise);
    }

    const initialValue = ___Promise.resolve<R[]>([]);

    if (!isArray(array)) {
        return initialValue;
    }

    iterator = iterator.bind(context);

    const inOrder = (previousValue: plat.async.Promise<R[]>, nextValue: T, nextIndex: number,
        arr: T[]): plat.async.Promise<R[]> => {
        return previousValue.then((items): plat.async.Promise<R[]> => {
            return iterator(nextValue, nextIndex, arr).then((moreItems): R[] => {
                return items.concat(moreItems);
            });
        });
    };

    if (descending === true) {
        return array.reduceRight(inOrder, initialValue);
    }

    return array.reduce(inOrder, initialValue);
}

function mapAsyncInOrder<T, R>(iterator: (value: T, index: number, list: T[]) => plat.async.Promise<R>,
    array: T[], context?: any): plat.async.Promise<R[]> {
    return mapAsyncWithOrder(iterator, array, context);
}

function mapAsyncInDescendingOrder<T, R>(iterator: (value: T, index: number, list: T[]) => plat.async.Promise<R>,
    array: T[], context?: any): plat.async.Promise<R[]> {
    return mapAsyncWithOrder(iterator, array, context, true);
}

function pluck<T, U>(key: string, obj: any): U[] {
    return map<T, U>((value): any => (<any>value)[key], obj);
}

function some<T>(iterator: (value: T, key: any, obj: any) => boolean, obj: any, context?: any): boolean {
    if (isNull(obj) || isFunction(obj)) {
        return false;
    }

    let i: number;
    let key: string;
    let length: number;
    let ret: boolean;

    if (isFunction(obj.some)) {
        return obj.some(iterator, context);
    } else if (isArrayLike(obj)) {
        length = obj.length;
        for (i = 0; i < length; i += 1) {
            ret = iterator.call(context, obj[i], i, obj);
            if (ret === true) {
                return true;
            }
        }
    } else {
        const keys = Object.keys(obj);
        length = keys.length;
        while (keys.length > 0) {
            key = keys.shift();
            ret = iterator.call(context, obj[key], key, obj);
            if (ret === true) {
                return true;
            }
        }
    }

    return false;
}

function postpone(method: (...args: any[]) => void, args?: any[], context?: any): plat.IRemoveListener {
    return defer(method, 0, args, context);
}

function defer(method: (...args: any[]) => void, timeout: number, args?: any[], context?: any): plat.IRemoveListener {
    function execDefer(): void {
        method.apply(context, args);
    }

    const timeoutId = setTimeout(execDefer, timeout);

    return (): void => {
        clearTimeout(timeoutId);
    };
}

function setIntervalGlobal(method: (...args: any[]) => void, interval: number, args?: any[], context?: any): plat.IRemoveListener {
    function execInterval(): void {
        method.apply(context, args);
    }

    const intervalId = setInterval(execInterval, interval);

    return (): void => {
        clearInterval(intervalId);
    };
}

function requestAnimationFrameGlobal(method: FrameRequestCallback, context?: any): plat.IRemoveListener {
    if (!isObject(___compat)) {
        ___compat = plat.acquire(__Compat);
    }

    const requestAnimFrame = ___compat.requestAnimationFrame;
    if (isUndefined(requestAnimFrame)) {
        return postpone((): void => {
            method.call(context, Date.now());
        });
    }

    const animationId = requestAnimFrame(method.bind(context));
    let cancelAnimFrame = ___compat.cancelAnimationFrame;

    if (!isFunction(cancelAnimFrame)) {
        cancelAnimFrame = noop;
    }

    return (): void => {
        cancelAnimFrame(animationId);
    };
}

function uniqueId(prefix?: string): string {
    if (isNull(prefix)) {
        prefix = '';
    }

    let puid = __uids[prefix];

    if (isNull(puid)) {
        puid = __uids[prefix] = ['0', '/'];
    }

    let index = puid.length;
    let charCode: number;

    while (index > 0) {
        index -= 1;
        charCode = puid[index].charCodeAt(0);
        // '9'
        if (charCode === 57) {
            puid[index] = 'A';

            return join();
        }

        // 'Z'
        if (charCode === 90) {
            puid[index] = 'a';

            return join();
        }

        // 'z'
        if (charCode === 122) {
            puid[index] = '0';
        } else {
            puid[index] = String.fromCharCode(charCode + 1);

            return join();
        }
    }

    puid.unshift('0');

    function join(): string {
        return prefix + puid.join('');
    }

    return join();
}

function camelCase(str: string): string {
    if (!isString(str) || isEmpty(str)) {
        return str;
    }

    str = str.charAt(0).toLowerCase() + str.slice(1);

    if (!isRegExp(__camelCaseRegex)) {
        __camelCaseRegex = (<plat.expressions.Regex>plat.acquire(__Regex)).camelCaseRegex;
    }

    return str.replace(__camelCaseRegex,
        (match: string, delimiter?: string, char?: string, index?: number): string => {
            return (isNumber(index) && index > 0) ? char.toUpperCase() : char;
        });
}

function delimit(str: string, delimiter: string): string {
    if (!isString(str) || isEmpty(str)) {
        return str;
    } else if (isNull(delimiter)) {
        delimiter = '';
    }

    if (!isRegExp(__capitalCaseRegex)) {
        __capitalCaseRegex = (<plat.expressions.Regex>plat.acquire(__Regex)).capitalCaseRegex;
    }

    return str.replace(__capitalCaseRegex, (match: string, index?: number): string => {
        return (isNumber(index) && index > 0) ? delimiter + match.toLowerCase() : match.toLowerCase();
    });
}

function deleteProperty(obj: any, property: number | string): any {
    if (!isNull(obj)) {
        delete obj[property];
    }

    return obj;
}

function access(obj: any, property: number | string): any {
    if (isNull(obj)) {
        return obj;
    }

    return obj[property];
}

function deserializeQuery(search: string): plat.IObject<string> {
    if (isEmpty(search)) {
        return;
    }

    search = search.replace(/^\?+/, '');

    const split = search.split('&');
    const query: plat.IObject<string> = {};
    const length = split.length;
    let item: string[];

    for (let i = 0; i < length; i += 1) {
        item = split[i].split('=');

        query[item[0]] = item[1];
    }

    return query;
}

function serializeQuery(query: plat.IObject<string>): string {
    let q = '';

    q += map((value, key): string => {
        return `${key}=${value}`;
    }, query).join('&');

    if (!isEmpty(q)) {
        q = `?${q}`;
    }

    return q;
}

function booleanReduce(values: boolean[]): boolean {
    if (!isArray(values)) {
        return isBoolean(values) ? <any>values : true;
    }

    return values.reduce((prev: boolean, current: boolean): boolean => {
        return prev && current !== false;
    }, true);
}
