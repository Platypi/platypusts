var __nativeIsArray = !!Array.isArray,
    __uids__ = {};

function noop() { }

function extend(destination: any, ...sources: any[]): any {
    if (isNull(destination)) {
        return destination;
    }

    var deep = isBoolean(destination);

    if (deep) {
        destination = sources.shift();
    }

    var keys, property;

    forEach(sources, function (source, k) {
        if (!(isObject(source) || isArray(source))) {
            return;
        }

        keys = Object.keys(source);

        forEach(keys, function (key: string) {
            property = source[key];
            if (deep) {
                if (isArray(property)) {
                    extend(deep, destination[key] || (destination[key] = []), property);
                    return;
                } else if (isObject(property)) {
                    extend(deep, destination[key] || (destination[key] = {}), property);
                    return;
                }
            }
            destination[key] = source[key];
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
    var arr = [];
    if (isNull(obj)) {
        return arr;
    }

    if (isFunction(obj.filter)) {
        return obj.filter(iterator, context);
    }

    forEach<T>(obj, function (value: T, key: any, obj: any) {
        if (iterator(value, key, obj)) {
            arr.push(value);
        }
    });

    return arr;
}

function where(obj: any, properties: any): Array<any> {
    return filter(obj, function (value) {
        return !some(properties, function (property, key) {
            return value[key] !== property;
        });
    });
}

function forEach<T>(obj: any, iterator: (value: T, key: any, obj: any) => void, context?: any): any {
    if (isNull(obj)) {
        return obj;
    }
    var i, key, length;

    if (isFunction(obj.forEach)) {
        return obj.forEach(iterator, context);
    } else if (isArrayLike(obj)) {
        for (i = 0, length = obj.length; i < length; ++i) {
            iterator.call(context, obj[i], i, obj);
        }
    } else {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                iterator.call(context, obj[key], key, obj);
            }
        }
    }

    return obj;
}

function map<T, U>(obj: any, iterator: (value: T, key: any, obj: any) => U, context?: any): Array<U> {
    var arr: any = [];
    if (isNull(obj)) {
        return arr;
    }

    if (isFunction(obj.map)) {
        return obj.map(iterator, context);
    }

    forEach(obj, function (value, key) {
        arr.push(iterator.call(this, value, key, obj));
    }, context);

    return arr;
}

function pluck<T, U>(obj: any, key: string): Array<U> {
    return map<T, U>(obj, function (value) { return value[key]; });
}

function some<T>(obj: any, iterator: (value: T, key: any, obj: any) => boolean, context?: any): boolean {
    if (isNull(obj)) {
        return false;
    }
    var i, key, length, ret;

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
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                ret = iterator.call(context, obj[key], key, obj);
                if (ret === true) {
                    return true;
                }
            }
        }
    }

    return false;
}

function postpone(method: (...args: any[]) => void, args?: Array<any>, context?: any) {
    return defer(method, 0, args, context);
}


function defer(method: (...args: any[]) => void, timeout: number, args?: Array<any>, context?: any) {
    function defer() {
        method.apply(context, args);
    }

    var timeoutId = setTimeout(defer, timeout);

    return function clearDefer() {
        clearTimeout(timeoutId);
    };
}

function uniqueId(prefix?: string) {
    if (isNull(prefix)) {
        prefix = '';
    }

    var puid = __uids__[prefix];

    if (isNull(puid)) {
        puid = __uids__[prefix] = ['0', '/'];
    }

    var index = puid.length,
        char;

    while (index--) {
        char = puid[index].charCodeAt(0);
        //'9'
        if (char === 57) {
            puid[index] = 'A';
            return join();
        }

        //'Z'
        if (char === 90) {
            puid[index] = 'a';
            return join();
        }

        //'z'
        if (char === 122) {
            puid[index] = '0';
        } else {
            puid[index] = String.fromCharCode(char + 1);
            return join();
        }
    }

    puid.unshift('0');

    function join() {
        return prefix + puid.join('');
    }

    return join();
}

var camelCaseRegex: RegExp;

function camelCase(str: string) {
    if (!isString(str) || isEmpty(str)) {
        return str;
    }

    str = str.charAt(0).toLowerCase() + str.substr(1);
    camelCaseRegex = camelCaseRegex || (<plat.expressions.IRegex>plat.acquire('$regex')).camelCaseRegex;

    return str.replace(camelCaseRegex,
        function delimiterMatch(match: string, delimiter?: string, char?: string, index?: number) {
            return index ? char.toUpperCase() : char;
        });
}
