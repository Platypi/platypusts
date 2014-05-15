var __nativeIsArray = !!Array.isArray,
    __uids__: plat.IObject<Array<string>> = {};

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

    forEach(sources, (source, k) => {
        if (!(isObject(source) || isArray(source))) {
            return;
        }

        keys = Object.keys(source);

        forEach(keys, (key: string) => {
            property = (<any>source)[key];
            if (deep) {
                if (isArray(property)) {
                    extend(deep, destination[key] || (destination[key] = []), property);
                    return;
                } else if (isObject(property)) {
                    extend(deep, destination[key] || (destination[key] = {}), property);
                    return;
                }
            }
            destination[key] = (<any>source)[key];
        });
    });

    return destination;
}

function deepExtend(destination: any, ...sources: any[]): any {
    return extend.apply(null, [true, destination].concat(sources));
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

function isString(obj: any): boolean {
    return typeof obj === 'string';
}

function isRegExp(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
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
    return typeof obj === 'boolean';
}

function isNumber(obj: any): boolean {
    return typeof obj === 'number' && !isNaN(obj);
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

    return Object.prototype.toString.call(obj) === '[object Array]';
}

function isArrayLike(obj: any): boolean {
    if (isNull(obj) || isWindow(obj) || isFunction(obj)) {
        return false;
    }

    return isString(obj) || obj.length >= 0;
}

function filter<T>(obj: any, iterator: (value: T, key: any, obj: any) => boolean, context?: any): Array<T> {
    var arr: Array<T> = [];
    if (isNull(obj)) {
        return arr;
    }

    if (isFunction(obj.filter)) {
        return obj.filter(iterator, context);
    }

    forEach<T>(obj, (value: T, key: any, obj: any) => {
        if (iterator(value, key, obj)) {
            arr.push(value);
        }
    });

    return arr;
}

function where(obj: any, properties: any): Array<any> {
    return filter(obj, (value)
        => !some(properties, (property, key)
            => (<any>value)[key] !== property));
}

function forEach<T>(obj: any, iterator: (value: T, key: any, obj: any) => void, context?: any): any {
    if (isNull(obj) || isFunction(obj)) {
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

function map<T, U>(obj: any, iterator: (value: T, key: any, obj: any) => U, context?: any): Array<U> {
    var arr: Array<U> = [];

    if (isNull(obj)) {
        return arr;
    }

    if (isFunction(obj.map)) {
        return obj.map(iterator, context);
    }

    forEach(obj, (value, key) => {
        arr.push(iterator.call(context, value, key, obj));
    });

    return arr;
}

function pluck<T, U>(obj: any, key: string): Array<U> {
    return map<T, U>(obj, (value) => (<any>value)[key]);
}

function some<T>(obj: any, iterator: (value: T, key: any, obj: any) => boolean, context?: any): boolean {
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
    function defer() {
        method.apply(context, args);
    }

    var timeoutId = setTimeout(defer, timeout);

    return () => {
        clearTimeout(timeoutId);
    };
}

function uniqueId(prefix?: string): string {
    if (isNull(prefix)) {
        prefix = '';
    }

    var puid = __uids__[prefix];

    if (isNull(puid)) {
        puid = __uids__[prefix] = ['0', '/'];
    }

    var index = puid.length,
        charCode: number;

    while (index--) {
        charCode = puid[index].charCodeAt(0);
        //'9'
        if (charCode === 57) {
            puid[index] = 'A';
            return join();
        }

        //'Z'
        if (charCode === 90) {
            puid[index] = 'a';
            return join();
        }

        //'z'
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

var camelCaseRegex: RegExp;

function camelCase(str: string): string {
    if (!isString(str) || isEmpty(str)) {
        return str;
    }

    str = str.charAt(0).toLowerCase() + str.substr(1);
    camelCaseRegex = camelCaseRegex || (<plat.expressions.IRegex>plat.acquire('$regex')).camelCaseRegex;

    return str.replace(camelCaseRegex,
        (match: string, delimiter?: string, char?: string, index?: number)
            => index ? char.toUpperCase() : char);
}
