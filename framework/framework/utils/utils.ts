module plat {
    /**
     * An extensible class defining common utilities and helper functions.
     */
    export class Utils implements IUtils {
        /**
         * An empty method for quickly creating dummy objects.
         */
        noop() { }

        /**
         * Allows you to extend the properties of an object with any number 
         * of other objects. If objects share properties, the last object in the
         * arguments will take precedence. This method is only a shallow copy of
         * all the source objects to the destination object.
         * 
         * @param destination The destination object to extend.
         * @param ...sources[] Any number of objects with which to extend the 
         * destination object.
         * 
         * @return {any} The extended destination object.
         */
        extend(destination: any, ...sources: any[]): any {
            return extend.apply(null, [destination].concat(sources));
        }

        /**
         * Allows you to extend the properties of an object with any number 
         * of other objects. If objects share properties, the last object in the
         * arguments will take precedence. This method is a deep copy of
         * all the source objects to the destination object.
         * 
         * @param destination The destination object to extend.
         * @param ...sources[] Any number of objects with which to extend the 
         * destination object.
         * 
         * @return {any} The extended destination object.
         */
        deepExtend(destination: any, ...sources: any[]): any {
            return extend.apply(null, [true, destination].concat(sources));
        }

        /**
         * Takes in anything and determines if it is a type of Object.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is an object, false otherwise.
         */
        isObject(obj: any): boolean {
            return isObject(obj);
        }

        /**
         * Takes in anything and determines if it is a window object.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is the window, false otherwise.
         */
        isWindow(obj: any): boolean {
            return isWindow(obj);
        }

        /**
         * Takes in anything and determines if it is a document object.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is the document, false otherwise.
         */
        isDocument(obj: any): boolean {
            return isDocument(obj);
        }

        /**
         * Takes in anything and determines if it is a Node.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is a Node, false otherwise.
         */
        isNode(obj: any): boolean {
            return isNode(obj);
        }

        /**
         * Takes in anything and determines if it is a DocumentFragment.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is a DocumentFragment, false otherwise.
         */
        isDocumentFragment(obj: any): boolean {
            return isDocumentFragment(obj);
        }

        /**
         * Takes in anything and determines if it is a string.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is a string, false otherwise.
         */
        isString(obj: any): boolean {
            return isString(obj);
        }

        /**
         * Takes in anything and determines if it is a RegExp object.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is a RegExp object, false otherwise.
         */
        isRegExp(obj: any): boolean {
            return isRegExp(obj);
        }

        /**
         * Takes in anything and determines if it is empty. Useful for
         * checking for empty strings, arrays, or objects without keys.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if the object isEmpty (or null/undefined), 
         * false otherwise.
         */
        isEmpty(obj: any): boolean {
            return isEmpty(obj);
        }

        /**
         * Takes in anything and determines if it is a boolean.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is a boolean, false otherwise.
         */
        isBoolean(obj: any): boolean {
            return isBoolean(obj);
        }

        /**
         * Takes in anything and determines if it is a number.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is a number, false otherwise.
         */
        isNumber(obj: any): boolean {
            return isNumber(obj);
        }

        /**
         * Takes in anything and determines if it is a function.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is a function, false otherwise.
         */
        isFunction(obj: any): boolean {
            return isFunction(obj);
        }

        /**
         * Takes in anything and determines if it is null or undefined.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is null or undefined, false otherwise.
         */
        isNull(obj: any): boolean {
            return isNull(obj);
        }

        /**
         * Takes in anything and determines if it is undefined.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is undefined, false otherwise.
         */
        isUndefined(obj: any): boolean {
            return isUndefined(obj);
        }

        /**
         * Takes in anything and determines if it is an Array.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is an Array, false otherwise.
         */
        isArray(obj: any): boolean {
            return isArray(obj);
        }

        /**
         * Takes in anything and determines if it has array-like qualities.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj has array-like qualities (i.e. it is an
         * Array, string, arguments, or NodeList), false otherwise.
         */
        isArrayLike(obj: any): boolean {
            return isArrayLike(obj);
        }

        /**
         * Takes in an array and a function to evaluate the properties in the array.
         * Returns a filtered array of objects resulting from evaluating the function.
         * 
         * @param array The Array to filter.
         * @param iterator The iterator function to call with array's properties. Returns true if the property
         * should be kept, false otherwise.
         * @param context Optional context with which to call the iterator.
         * 
         * @return {Array<T>} An array of objects which evaluated to true with the iterator.
         */
        filter<T>(array: Array<T>, iterator: (value: T, key: any, obj: any) => boolean, context?: any): Array<T>;
        /**
         * Takes in an object/array and a function to evaluate the properties in the object/array.
         * Returns a filtered array of objects resulting from evaluating the function.
         * 
         * @param obj The object to filter.
         * @param iterator The iterator function to call with obj's properties. Returns true if the property
         * should be kept, false otherwise.
         * @param context Optional context with which to call the iterator.
         * 
         * @return {Array<T>} An array of objects which evaluated to true with the iterator.
         */
        filter<T>(obj: any, iterator: (value: T, key: any, obj: any) => boolean, context?: any): Array<T>;
        filter<T>(obj: any, iterator: (value: T, key: any, obj: any) => boolean, context?: any): Array<T> {
            return filter(obj, iterator, context);
        }

        /**
         * Takes in a list and object containing key/value pairs to search for in the list.
         * 
         * @param array The list used for searching for properties.
         * @param properties An object containing key/value pairs to match with obj's values.
         * 
         * @return {Array<T>} The matched values in obj.
         * 
         * @example where([{foo: 'foo', bar: 'bar'}, {foo: 'bar', bar: 'foo'}], {foo: 'foo'});
         * //returns [{foo: 'bar', bar: 'bar'}]
         */
        where<T>(array: Array<T>, properties: any): Array<T>;
        /**
         * Takes in a list and object containing key/value pairs to search for on the obj.
         * 
         * @param obj The list used for searching for properties.
         * @param properties An object containing key/value pairs to match with obj's values.
         * 
         * @return {Array<T>} The matched values in obj.
         * 
         * @example where([{foo: 'foo', bar: 'bar'}, {foo: 'bar', bar: 'foo'}], {foo: 'foo'});
         * //returns [{foo: 'bar', bar: 'bar'}]
         */
        where<T>(obj: any, properties: any): Array<T>;
        where(obj: any, properties: any): Array<any> {
            return where(obj, properties);
        }

        /**
         * Takes in an Array and a function to iterate over. Calls the iterator function with every property
         * in the Array, then returns the object.
         * 
         * @param obj An Array.
         * @param iterator A method that takes in a value, index, and the object.
         * @param context An optional context to bind to the iterator.
         * 
         * @return {Array<T>} The array.
         */
        forEach<T>(array: Array<T>, iterator: (value: T, index: number, obj: any) => void, context?: any): Array<T>;
        /**
         * Takes in an object and a function to iterate over. Calls the iterator function with every property
         * in the object, then returns the object. If the object is Array-like (e.g. a String), it will be treated as though 
         * it is an Array.
         * 
         * @param obj An object.
         * @param iterator A method that takes in a value, key, and the object.
         * @param context An optional context to bind to the iterator.
         * 
         * @return {IObject<T>} The object.
         */
        forEach<T>(obj: any, iterator: (value: T, key: string, obj: any) => void, context?: any): any;
        forEach<T>(obj: any, iterator: (value: T, key: any, obj: any) => void, context?: any): any {
            return forEach(obj, iterator, context);
        }

        /**
         * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The 
         * iterator can transform the object and return it. The returned values will be pushed to an Array and 
         * returned.
         * 
         * @param array An Array.
         * @param iterator The transformation function.
         * @param context An optional context to bind to the iterator.
         * 
         * @return {Array<U>} The accumulated transformed values from the iterator.
         */
        map<T, U>(array: Array<T>, iterator: (value: T, index: number, obj: any) => U, context?: any): Array<U>;
        /**
         * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The 
         * iterator can transform the object and return it. The returned values will be pushed to an Array and 
         * returned.
         * 
         * @param obj An object/array.
         * @param iterator The transformation function.
         * @param context An optional context to bind to the iterator.
         * 
         * @return {Array<U>} The accumulated transformed values from the iterator.
         */
        map<T, U>(obj: any, iterator: (value: T, key: string, obj: any) => U, context?: any): Array<U>;
        map<T, U>(obj: any, iterator: (value: T, key: any, obj: any) => U, context?: any): Array<U> {
            return map<T, U>(obj, iterator, context);
        }

        /**
         * Takes in an object and a property to extract from all of the object's values. Returns an array of
         * the 'plucked' values.
         * 
         * @param obj An object.
         * @param key The property to 'pluck' from each value in obj.
         * 
         * @return {Array<U>} An array of 'plucked' values from obj.
         */
        pluck<T, U>(obj: any, key: string): Array<U> {
            return map<T, U>(obj, function (value) { return value[key]; });
        }

        /**
         * Takes in an array and an iterator. Evaluates all the values in the array with the iterator.
         * Returns true if any of the iterators return true, otherwise returns false.
         * 
         * @param array An array.
         * @param iterator A method with which to evaluate all the values in obj.
         * @param context An optional context to bind to the iterator.
         * 
         * @return {boolean} True if any calls to iterator return true, false otherwise.
         */
        some<T>(array: Array<T>, iterator: (value: T, index: number, obj: any) => boolean, context?: any): boolean;
        /**
         * Takes in an object and an iterator. Evaluates all the values in the object with the iterator.
         * Returns true if any of the iterators return true, otherwise returns false. If the object is Array-like 
         * (e.g. a String), it will be treated as though it is an Array.
         * 
         * @param obj An object.
         * @param iterator A method with which to evaluate all the values in obj.
         * @param context An optional context to bind to the iterator.
         * 
         * @return {boolean} True if any calls to iterator return true, false otherwise.
         */
        some<T>(obj: any, iterator: (value: T, key: string, obj: any) => boolean, context?: any): boolean;
        some<T>(obj: any, iterator: (value: T, key: any, obj: any) => boolean, context?: any): boolean {
            return some<T>(obj, iterator, context);
        }

        /**
         * Takes in a method and array of arguments to pass to that method. Delays calling the method until 
         * after the current call stack is clear. Equivalent to a setTimeout with a timeout of 0.
         * 
         * @param method The method to call.
         * @param args The arguments to apply to the method.
         * @param context An optional context to bind to the method.
         * 
         * @return {() => void} A function that will clear the timeout when called.
         */
        postpone(method: (...args: any[]) => void, args?: Array<any>, context?: any) {
            return defer(method, 0, args, context);
        }

        /**
         * Takes in a method and array of arguments to pass to that method. Delays calling the method until 
         * after the current call stack is clear. Equivalent to a setTimeout with a timeout of 0.
         * 
         * @param method The method to call.
         * @param timeout The time (in milliseconds) to delay before calling the provided method
         * @param args The arguments to apply to the method.
         * @param context An optional context to bind to the method.
         * 
         * @return {() => void} A function that will clear the timeout when called.
         */
        defer(method: (...args: any[]) => void, timeout: number, args?: Array<any>, context?: any) {
            return defer(method, timeout, args, context);
        }

        /**
         * Takes in a prefix and returns a unique identifier string with the prefix preprended. If no prefix
         * is specified, none will be prepended.
         * 
         * @param prefix A string prefix to prepend tothe unique ID.
         * 
         * @return {string} The prefix-prepended unique id.
         */
        uniqueId(prefix?: string) {
            return uniqueId(prefix);
        }

        /**
         * Takes in a spinal-case, dot.case, or snake_case string and returns 
         * a camelCase string. Also can turn a string into camelCase with space 
         * as a delimeter.
         * 
         * @param str The spinal-case, dot.case, or snake_case string
         * 
         * @return {string} The camelCase string
         * 
         * @example camelCase('plat-options'); // returns 'platOptions'
         */
        camelCase(str: string) {
            return camelCase(str);
        }
    }

    register.injectable('$utils', Utils);

    /**
     * An object defining common utilities and helper functions.
     */
    export interface IUtils {
        /**
         * An empty method for quickly creating dummy objects.
         */
        noop(): void;

        /**
         * Allows you to extend the properties of an object with any number 
         * of other objects. If objects share properties, the last object in the
         * arguments will take precedence. This method is only a shallow copy of
         * all the source objects to the destination object.
         * 
         * @param destination The destination object to extend.
         * @param ...sources[] Any number of objects with which to extend the 
         * destination object.
         * 
         * @return {any} The extended destination object.
         */
        extend(destination: any, ...sources: any[]): any;

        /**
         * Allows you to extend the properties of an object with any number 
         * of other objects. If objects share properties, the last object in the
         * arguments will take precedence. This method is a deep copy of
         * all the source objects to the destination object.
         * 
         * @param destination The destination object to extend.
         * @param ...sources[] Any number of objects with which to extend the 
         * destination object.
         * 
         * @return {any} The extended destination object.
         */
        deepExtend(destination: any, ...sources: any[]): any;

        /**
         * Takes in anything and determines if it is a type of Object.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is an object, false otherwise.
         */
        isObject(obj: any): boolean;

        /**
         * Takes in anything and determines if it is a window object.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is the window, false otherwise.
         */
        isWindow(obj: any): boolean;

        /**
         * Takes in anything and determines if it is a document object.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is the document, false otherwise.
         */
        isDocument(obj: any): boolean;

        /**
         * Takes in anything and determines if it is a Node.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is a Node, false otherwise.
         */
        isNode(obj: any): boolean;

        /**
         * Takes in anything and determines if it is a DocumentFragment.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is a DocumentFragment, false otherwise.
         */
        isDocumentFragment(obj: any): boolean;

        /**
         * Takes in anything and determines if it is a string.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is a string, false otherwise.
         */
        isString(obj: any): boolean;

        /**
         * Takes in anything and determines if it is a RegExp object.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is a RegExp object, false otherwise.
         */
        isRegExp(obj: any): boolean;

        /**
         * Takes in anything and determines if it is empty. Useful for
         * checking for empty strings, arrays, or objects without keys.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if the object isEmpty (or null/undefined), 
         * false otherwise.
         */
        isEmpty(obj: any): boolean;

        /**
         * Takes in anything and determines if it is a boolean.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is a boolean, false otherwise.
         */
        isBoolean(obj: any): boolean;

        /**
         * Takes in anything and determines if it is a number.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is a number, false otherwise.
         */
        isNumber(obj: any): boolean;

        /**
         * Takes in anything and determines if it is a function.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is a function, false otherwise.
         */
        isFunction(obj: any): boolean;

        /**
         * Takes in anything and determines if it is null or undefined.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is null or undefined, false otherwise.
         */
        isNull(obj: any): boolean;

        /**
         * Takes in anything and determines if it is undefined.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is undefined, false otherwise.
         */
        isUndefined(obj: any): boolean;

        /**
         * Takes in anything and determines if it is an Array.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj is an Array, false otherwise.
         */
        isArray(obj: any): boolean;

        /**
         * Takes in anything and determines if it has array-like qualities.
         * 
         * @param obj Anything.
         * 
         * @return {boolean} True if obj has array-like qualities (i.e. it is an
         * Array, string, arguments, or NodeList), false otherwise.
         */
        isArrayLike(obj: any): boolean;

        /**
         * Takes in an array and a function to evaluate the properties in the array.
         * Returns a filtered array of objects resulting from evaluating the function.
         * 
         * @param array The Array to filter.
         * @param iterator The iterator function to call with array's properties. Returns true if the property
         * should be kept, false otherwise.
         * @param context Optional context with which to call the iterator.
         * 
         * @return {Array<T>} An array of objects which evaluated to true with the iterator.
         */
        filter<T>(array: Array<T>, iterator: (value: T, key: any, obj: any) => boolean, context?: any): Array<T>;
        /**
         * Takes in an object/array and a function to evaluate the properties in the object/array.
         * Returns a filtered array of objects resulting from evaluating the function.
         * 
         * @param obj The object to filter.
         * @param iterator The iterator function to call with obj's properties. Returns true if the property
         * should be kept, false otherwise.
         * @param context Optional context with which to call the iterator.
         * 
         * @return {Array<T>} An array of objects which evaluated to true with the iterator.
         */
        filter<T>(obj: any, iterator: (value: T, key: any, obj: any) => boolean, context?: any): Array<T>;

        /**
         * Takes in a list and object containing key/value pairs to search for in the list.
         * 
         * @param array The list used for searching for properties.
         * @param properties An object containing key/value pairs to match with obj's values.
         * 
         * @return {Array<T>} The matched values in obj.
         * 
         * @example where([{foo: 'foo', bar: 'bar'}, {foo: 'bar', bar: 'foo'}], {foo: 'foo'});
         * //returns [{foo: 'bar', bar: 'bar'}]
         */
        where<T>(array: Array<T>, properties: any): Array<T>;
        /**
         * Takes in a list and object containing key/value pairs to search for on the obj.
         * 
         * @param obj The list used for searching for properties.
         * @param properties An object containing key/value pairs to match with obj's values.
         * 
         * @return {Array<T>} The matched values in obj.
         * 
         * @example where([{foo: 'foo', bar: 'bar'}, {foo: 'bar', bar: 'foo'}], {foo: 'foo'});
         * //returns [{foo: 'bar', bar: 'bar'}]
         */
        where<T>(obj: any, properties: any): Array<T>;

        /**
         * Takes in an Array and a function to iterate over. Calls the iterator function with every property
         * in the Array, then returns the object.
         * 
         * @param obj An Array.
         * @param iterator A method that takes in a value, index, and the object.
         * @param context An optional context to bind to the iterator.
         * 
         * @return {Array<T>} The array.
         */
        forEach<T>(array: Array<T>, iterator: (value: T, index: number, obj: any) => void, context?: any): Array<T>;
        /**
         * Takes in an object and a function to iterate over. Calls the iterator function with every property
         * in the object, then returns the object. If the object is Array-like (e.g. a String), it will be treated as though 
         * it is an Array.
         * 
         * @param obj An object.
         * @param iterator A method that takes in a value, key, and the object.
         * @param context An optional context to bind to the iterator.
         * 
         * @return {IObject<T>} The object.
         */
        forEach<T>(obj: any, iterator: (value: T, key: string, obj: any) => void, context?: any): any;

        /**
         * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The 
         * iterator can transform the object and return it. The returned values will be pushed to an Array and 
         * returned.
         * 
         * @param array An Array.
         * @param iterator The transformation function.
         * @param context An optional context to bind to the iterator.
         * 
         * @return {Array<U>} The accumulated transformed values from the iterator.
         */
        map<T, U>(array: Array<T>, iterator: (value: T, index: number, obj: any) => U, context?: any): Array<U>;
        /**
         * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The 
         * iterator can transform the object and return it. The returned values will be pushed to an Array and 
         * returned.
         * 
         * @param obj An object/array.
         * @param iterator The transformation function.
         * @param context An optional context to bind to the iterator.
         * 
         * @return {Array<U>} The accumulated transformed values from the iterator.
         */
        map<T, U>(obj: any, iterator: (value: T, key: string, obj: any) => U, context?: any): Array<U>;

        /**
         * Takes in an object and a property to extract from all of the object's values. Returns an array of
         * the 'plucked' values.
         * 
         * @param obj An object.
         * @param key The property to 'pluck' from each value in obj.
         * 
         * @return {Array<U>} An array of 'plucked' values from obj.
         */
        pluck<T, U>(obj: any, key: string): Array<U>;

        /**
         * Takes in an array and an iterator. Evaluates all the values in the array with the iterator.
         * Returns true if any of the iterators return true, otherwise returns false.
         * 
         * @param array An array.
         * @param iterator A method with which to evaluate all the values in obj.
         * @param context An optional context to bind to the iterator.
         * 
         * @return {boolean} True if any calls to iterator return true, false otherwise.
         */
        some<T>(array: Array<T>, iterator: (value: T, index: number, obj: any) => boolean, context?: any): boolean;
        /**
         * Takes in an object and an iterator. Evaluates all the values in the object with the iterator.
         * Returns true if any of the iterators return true, otherwise returns false. If the object is Array-like 
         * (e.g. a String), it will be treated as though it is an Array.
         * 
         * @param obj An object.
         * @param iterator A method with which to evaluate all the values in obj.
         * @param context An optional context to bind to the iterator.
         * 
         * @return {boolean} True if any calls to iterator return true, false otherwise.
         */
        some<T>(obj: any, iterator: (value: T, key: string, obj: any) => boolean, context?: any): boolean;

        /**
         * Takes in a method and array of arguments to pass to that method. Delays calling the method until 
         * after the current call stack is clear. Equivalent to a setTimeout with a timeout of 0.
         * 
         * @param method The method to call.
         * @param args The arguments to apply to the method.
         * @param context An optional context to bind to the method.
         * 
         * @return {() => void} A function that will clear the timeout when called.
         */
        postpone(method: (...args: any[]) => void, args?: Array<any>, context?: any): () => void;

        /**
         * Takes in a method and array of arguments to pass to that method. Delays calling the method until 
         * after the current call stack is clear. Equivalent to a setTimeout with a timeout of 0.
         * 
         * @param method The method to call.
         * @param timeout The time (in milliseconds) to delay before calling the provided method
         * @param args The arguments to apply to the method.
         * @param context An optional context to bind to the method.
         * 
         * @return {() => void} A function that will clear the timeout when called.
         */
        defer(method: (...args: any[]) => void, timeout: number, args?: Array<any>, context?: any): () => void;

        /**
         * Takes in a prefix and returns a unique identifier string with the prefix preprended. If no prefix
         * is specified, none will be prepended.
         * 
         * @param prefix A string prefix to prepend tothe unique ID.
         * 
         * @return {string} The prefix-prepended unique id.
         */
        uniqueId(prefix?: string): string;

        /**
         * Takes in a spinal-case, dot.case, or snake_case string and returns 
         * a camelCase string. Also can turn a string into camelCase with space 
         * as a delimeter.
         * 
         * @param str The spinal-case, dot.case, or snake_case string
         * 
         * @return {string} The camelCase string
         * 
         * @example camelCase('plat-options'); // returns 'platOptions'
         */
        camelCase(str: string): string;
    }
}
