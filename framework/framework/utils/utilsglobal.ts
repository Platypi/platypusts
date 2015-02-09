/* tslint:disable:no-unused-variable */
var ___Promise: plat.async.IPromise,
    ___compat: plat.Compat,
    __nativeIsArray = !!Array.isArray,
    __uids: plat.IObject<Array<string>> = {},
    __camelCaseRegex: RegExp,
    __objToString = Object.prototype.toString,
    __toStringClass = '[object ',
    __errorClass = __toStringClass + 'Error]',
    __fileClass = __toStringClass + 'File]',
    __arrayClass = __toStringClass + 'Array]',
    __boolClass = __toStringClass + 'Boolean]',
    __dateClass = __toStringClass + 'Date]',
    __funcClass = __toStringClass + 'Function]',
    __numberClass = __toStringClass + 'Number]',
    __objectClass = __toStringClass + 'Object]',
    __regexpClass = __toStringClass + 'RegExp]',
    __stringClass = __toStringClass + 'String]',
    __promiseClass = __toStringClass + 'Promise]',
    __objectTypes: any = {
        'boolean': false,
        'function': true,
        'object': true,
        'number': false,
        'string': false,
        'undefined': false
    };

function noop(): void { }

function extend(destination: any, ...sources: any[]): any {
    if (isNull(destination)) {
        return destination;
    }

    var deep = isBoolean(destination);

    if (deep) {
        destination = sources.shift();
    }

    var keys: Array<string>,
        property: any;

    forEach((source, k): void => {
        if (!isObject(source)) {
            return;
        }

        keys = Object.keys(source);

        forEach((key): void => {
            property = source[key];
            if (deep) {
                if (isArray(property)) {
                    extend(deep, destination[key] || (destination[key] = []), property);
                    return;
                } else if (isDate(property)) {
                    destination[key] = new Date(property.getTime());
                    return;
                } else if (isRegExp(property)) {
                    destination[key] = new RegExp(property);
                    return;
                } else if (isNode(property)) {
                    destination[key] = (<Node>property).cloneNode(true);
                    return;
                } else if (isObject(property)) {
                    extend(deep, destination[key] || (destination[key] = {}), property);
                    return;
                }
            }
            destination[key] = property;
        }, keys);
    }, sources);

    return destination;
}

function deepExtend(destination: any, ...sources: any[]): any {
    return extend.apply(null, [true, destination].concat(sources));
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
    } else if (isError(obj)) {
        return new obj.constructor((<Error>obj).message);
    }

    var type = {};

    if (isArray(obj)) {
        type = [];
    }

    if (isBoolean(deep) && deep) {
        return deepExtend(type, obj);
    }

    return extend(type, obj);
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

function filter<T>(iterator: (value: T, key: any, obj: any) => boolean, obj: any, context?: any): Array<T> {
    var arr: Array<T> = [];
    if (isNull(obj)) {
        return arr;
    }

    if (isFunction(obj.filter)) {
        return obj.filter(iterator, context);
    }

    forEach<T>((value: T, key: any, obj: any): void => {
        if (iterator(value, key, obj)) {
            arr.push(value);
        }
    }, obj);

    return arr;
}

function where(properties: any, obj: any): Array<any> {
    return filter((value): boolean
        => !some((property, key): boolean
            => (<any>value)[key] !== property, properties), obj);
}

function forEach<T>(iterator: (value: T, index: number, obj: any) => void, array: Array<T>, context?: any): Array<T>;
function forEach<T>(iterator: (value: T, key: string, obj: any) => void, obj: any, context?: any): any;
function forEach<T>(iterator: (value: T, key: any, obj: any) => void, obj: any, context?: any): any {
    if (isNull(obj) || !(isObject(obj) || isArrayLike(obj))) {
        return obj;
    }

    var i: number,
        key: string,
        length: number;

    if (isFunction(obj.forEach)) {
        return obj.forEach(iterator, context);
    } else if (isArrayLike(obj)) {
        for (i = 0, length = obj.length; i < length; ++i) {
            iterator.call(context, obj[i], i, obj);
        }
    } else {
        var keys = Object.keys(obj);
        length = keys.length;
        while (keys.length > 0) {
            key = keys.shift();
            iterator.call(context, obj[key], key, obj);
        }
    }

    return obj;
}

function map<T, R>(iterator: (value: T, key: any, obj: any) => R, obj: any, context?: any): Array<R> {
    var arr: Array<R> = [];

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

function mapAsync<T, R>(iterator: (value: T, key: any, obj: any) => plat.async.IThenable<R>, obj: any,
    context?: any): plat.async.IThenable<Array<R>> {
    ___Promise = ___Promise || plat.acquire(__Promise);

    return ___Promise.all(map(iterator, obj, context));
}

function mapAsyncWithOrder<T, R>(iterator: (value: T, index: number, list: Array<T>) => plat.async.IThenable<R>,
    array: Array<T>, context: any, descending?: boolean): plat.async.IThenable<Array<R>> {
    ___Promise = ___Promise || plat.acquire(__Promise);
    var initialValue = ___Promise.resolve<Array<R>>([]);

    if (!isArray(array)) {
        return initialValue;
    }

    iterator = iterator.bind(context);

    var promise: plat.async.IThenable<Array<R>>,
        inOrder = (previousValue: plat.async.IThenable<Array<R>>, nextValue: T, nextIndex: number,
            array: Array<T>): plat.async.IThenable<Array<R>> => {
            return previousValue.then((items): plat.async.IThenable<Array<R>> => {
                return iterator(nextValue, nextIndex, array).then((moreItems): Array<R> => {
                    return items.concat(moreItems);
                });
            });
        };

    if (descending === true) {
        return array.reduceRight(inOrder, initialValue);
    }

    return array.reduce(inOrder, initialValue);
}

function mapAsyncInOrder<T, R>(iterator: (value: T, index: number, list: Array<T>) => plat.async.IThenable<R>,
    array: Array<T>, context?: any): plat.async.IThenable<Array<R>> {
    return mapAsyncWithOrder(iterator, array, context);
}

function mapAsyncInDescendingOrder<T, R>(iterator: (value: T, index: number, list: Array<T>) => plat.async.IThenable<R>,
    array: Array<T>, context?: any): plat.async.IThenable<Array<R>> {
    return mapAsyncWithOrder(iterator, array, context, true);
}

function pluck<T, U>(key: string, obj: any): Array<U> {
    return map<T, U>((value): any => (<any>value)[key], obj);
}

function some<T>(iterator: (value: T, key: any, obj: any) => boolean, obj: any, context?: any): boolean {
    if (isNull(obj) || isFunction(obj)) {
        return false;
    }

    var i: number,
        key: string,
        length: number,
        ret: boolean;

    if (isFunction(obj.some)) {
        return obj.some(iterator, context);
    } else if (isArrayLike(obj)) {
        for (i = 0, length = obj.length; i < length; ++i) {
            ret = iterator.call(context, obj[i], i, obj);
            if (ret === true) {
                return true;
            }
        }
    } else {
        var keys = Object.keys(obj);
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

function postpone(method: (...args: any[]) => void, args?: Array<any>, context?: any): plat.IRemoveListener {
    return defer(method, 0, args, context);
}

function defer(method: (...args: any[]) => void, timeout: number, args?: Array<any>, context?: any): plat.IRemoveListener {
    function defer(): void {
        method.apply(context, args);
    }

    var timeoutId = setTimeout(defer, timeout);
    return (): void => {
        clearTimeout(timeoutId);
    };
}

function requestAnimationFrameGlobal(method: FrameRequestCallback, context?: any): plat.IRemoveListener {
    ___compat = ___compat || (plat.acquire(__Compat));

    var requestAnimFrame = ___compat.requestAnimationFrame;
    if (isUndefined(requestAnimFrame)) {
        return postpone((): void => {
            method.call(context, Date.now());
        });
    }

    var animationId = requestAnimFrame(method.bind(context)),
        cancelAnimFrame = ___compat.cancelAnimationFrame || noop;

    return (): void => {
        cancelAnimFrame(animationId);
    };
}

function uniqueId(prefix?: string): string {
    if (isNull(prefix)) {
        prefix = '';
    }

    var puid = __uids[prefix];

    if (isNull(puid)) {
        puid = __uids[prefix] = ['0', '/'];
    }

    var index = puid.length,
        charCode: number;

    while (index--) {
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
    __camelCaseRegex = __camelCaseRegex || (<plat.expressions.Regex>plat.acquire(__Regex)).camelCaseRegex;

    return str.replace(__camelCaseRegex,
        (match: string, delimiter?: string, char?: string, index?: number): string
            => index ? char.toUpperCase() : char);
}

function deleteProperty(obj: any, property: number): any;
function deleteProperty(obj: any, property: string): any;
function deleteProperty(obj: any, property: any): any {
    if (!isNull(obj)) {
        /* tslint:disable:no-unused-expression */
        delete obj[property];
        /* tslint:enable:no-unused-expression */
    }

    return obj;
}

function access(obj: any, property: number): any;
function access(obj: any, property: string): any;
function access(obj: any, property: any): any {
    if (isNull(obj)) {
        return obj;
    }
    return obj[property];
}

function deserializeQuery(search: string): plat.IObject<string> {
    if (isEmpty(search)) {
        return;
    }

    var split = search.split('&'),
        query: plat.IObject<string> = {},
        length = split.length,
        item: Array<string>;

    for (var i = 0; i < length; ++i) {
        item = split[i].split('=');

        query[item[0]] = item[1];
    }

    return query;
}

function serializeQuery(query: plat.IObject<string>): string {
    return (isArray(query) || isObject(query)) && !isEmpty(query) ? '?' + map((value, key): string => {
        return key + '=' + value;
    }, query).join('&') : '';
}

function booleanReduce(values: Array<boolean>): boolean {
    if (!isArray(values)) {
        return isBoolean(values) ? <any>values : true;
    }

    return values.reduce((prev: boolean, current: boolean): boolean => {
        return prev && current !== false;
    }, true);
}

/* tslint:enable:no-unused-variable */
