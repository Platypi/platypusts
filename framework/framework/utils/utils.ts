module plat {
    /**
     * @name Utils
     * @memberof plat
     * @kind class
     * 
     * @description
     * An extensible class defining common utilities and helper functions.
     */
    export class Utils {
        /**
         * @name noop
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * An empty method for quickly creating dummy objects.
         * 
         * @returns {void}
         */
        noop(): void { }

        /**
         * @name extend
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Allows you to extend the properties of an object with any number 
         * of other objects. If objects share properties, the last object in the
         * arguments will take precedence. This method is only a shallow copy of
         * all the source objects to the destination object.
         * 
         * @param {any} destination The destination object to extend.
         * @param {Array<any>} ...sources Any number of objects with which to extend the 
         * destination object.
         * 
         * @returns {any} The extended destination object.
         */
        extend(destination: any, ...sources: any[]): any {
            return extend.apply(null, [destination].concat(sources));
        }

        /**
         * @name deepExtend
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Allows you to extend the properties of an object with any number 
         * of other objects. If objects share properties, the last object in the
         * arguments will take precedence. This method is a deep copy of
         * all the source objects to the destination object.
         * 
         * @param {any} destination The destination object to extend.
         * @param {Array<any>} ...sources Any number of objects with which to extend the 
         * destination object.
         * 
         * @returns {any} The extended destination object.
         */
        deepExtend(destination: any, ...sources: any[]): any {
            return extend.apply(null, [true, destination].concat(sources));
        }

        /**
         * @name clone
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Creates a copy of the passed-in object. If deep is true it will 
         * be a deep copy (duplicate), else nested objects/arrays will be copied by reference
         * and not duplicated.
         * 
         * @typeparam {any} T The type of object being cloned.
         * 
         * @param {T} obj The object to clone.
         * @param {boolean} deep? Whether or not it is a deep clone.
         * 
         * @returns {T} The cloned object.
         */
        clone<T>(obj: T, deep?: boolean): T {
            return _clone(obj, deep);
        }

        /**
         * @name isObject
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in anything and determines if it is a type of Object.
         * 
         * @param {any} obj Anything.
         * 
         * @returns {boolean} True if obj is an object, false otherwise.
         */
        isObject(obj: any): boolean {
            return isObject(obj);
        }

        /**
         * @name isWindow
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in anything and determines if it is a window object.
         * 
         * @param {any} obj Anything.
         * 
         * @returns {boolean} True if obj is the window, false otherwise.
         */
        isWindow(obj: any): boolean {
            return isWindow(obj);
        }

        /**
         * @name isDocument
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in anything and determines if it is a document object.
         * 
         * @param {any} obj Anything.
         * 
         * @returns {boolean} True if obj is the document, false otherwise.
         */
        isDocument(obj: any): boolean {
            return isDocument(obj);
        }

        /**
         * @name isNode
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in anything and determines if it is a Node.
         * 
         * @param {any} obj Anything.
         * 
         * @returns {boolean} True if obj is a Node, false otherwise.
         */
        isNode(obj: any): boolean {
            return isNode(obj);
        }

        /**
         * @name isDocumentFragment
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in anything and determines if it is a DocumentFragment.
         * 
         * @param {any} obj Anything.
         * 
         * @returns {boolean} True if obj is a DocumentFragment, false otherwise.
         */
        isDocumentFragment(obj: any): boolean {
            return isDocumentFragment(obj);
        }

        /**
         * @name isString
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in anything and determines if it is a string.
         * 
         * @param {any} obj Anything.
         * 
         * @returns {boolean} True if obj is a string, false otherwise.
         */
        isString(obj: any): boolean {
            return isString(obj);
        }

        /**
         * @name isRegExp
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in anything and determines if it is a RegExp object.
         * 
         * @param {any} obj Anything.
         * 
         * @returns {boolean} True if obj is a RegExp object, false otherwise.
         */
        isRegExp(obj: any): boolean {
            return isRegExp(obj);
        }

        /**
         * @name isPromise
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in anything and determines if it is a Promise object.
         * 
         * @param {any} obj Anything.
         * 
         * @returns {boolean} True if obj is a Promise object, false otherwise.
         */
        isPromise(obj: any): boolean {
            return isPromise(obj);
        }

        /**
         * @name isEmpty
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in anything and determines if it is empty. Useful for
         * checking for empty strings, arrays, or objects without keys.
         * 
         * @param {any} obj Anything.
         * 
         * @returns {boolean} True if the object isEmpty (or null/undefined), 
         * false otherwise.
         */
        isEmpty(obj: any): boolean {
            return isEmpty(obj);
        }

        /**
         * @name isBoolean
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in anything and determines if it is a boolean.
         * 
         * @param {any} obj Anything.
         * 
         * @returns {boolean} True if obj is a boolean, false otherwise.
         */
        isBoolean(obj: any): boolean {
            return isBoolean(obj);
        }

        /**
         * @name isNumber
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in anything and determines if it is a number.
         * 
         * @param {any} obj Anything.
         * 
         * @returns {boolean} True if obj is a number, false otherwise.
         */
        isNumber(obj: any): boolean {
            return isNumber(obj);
        }

        /**
         * @name isFunction
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in anything and determines if it is a function.
         * 
         * @param {any} obj Anything.
         * 
         * @returns {boolean} True if obj is a function, false otherwise.
         */
        isFunction(obj: any): boolean {
            return isFunction(obj);
        }

        /**
         * @name isNull
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in anything and determines if it is null or undefined.
         * 
         * @param {any} obj Anything.
         * 
         * @returns {boolean} True if obj is null or undefined, false otherwise.
         */
        isNull(obj: any): boolean {
            return isNull(obj);
        }

        /**
         * @name isUndefined
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in anything and determines if it is undefined.
         * 
         * @param {any} obj Anything.
         * 
         * @returns {boolean} True if obj is undefined, false otherwise.
         */
        isUndefined(obj: any): boolean {
            return isUndefined(obj);
        }

        /**
         * @name isArray
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in anything and determines if it is an Array.
         * 
         * @param {any} obj Anything.
         * 
         * @returns {boolean} True if obj is an Array, false otherwise.
         */
        isArray(obj: any): boolean {
            return isArray(obj);
        }

        /**
         * @name isArrayLike
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in anything and determines if it has array-like qualities.
         * 
         * @param {any} obj Anything.
         * 
         * @returns {boolean} True if obj has array-like qualities (i.e. it is an
         * Array, string, arguments, or NodeList), false otherwise.
         */
        isArrayLike(obj: any): boolean {
            return isArrayLike(obj);
        }

        /**
         * @name isDate
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in anything and determines if it is a Date object.
         * 
         * @param {any} obj Anything.
         * 
         * @returns {boolean} True if obj is a Date object, false otherwise.
         */
        isDate(obj: any): boolean {
            return isDate(obj);
        }

        /**
         * @name filter
         * @memberof plat.Utils
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Takes in an array and a function to evaluate the properties in the array.
         * Returns a filtered array of objects resulting from evaluating the function.
         * 
         * @typeparam {any} T The type of objects contained in the Array being filtered.
         * 
         * @param {plat.IListIterator<T, boolean>} iterator The iterator function to call with array's properties. 
         * Returns true if the property should be kept, false otherwise.
         * @param {Array<T>} array The Array to filter.
         * @param {any} context? An optional context to bind to the iterator.
         * 
         * @returns {Array<T>} An array of objects which evaluated to true with the iterator.
         */
        filter<T>(iterator: IListIterator<T, boolean>, array: Array<T>, context?: any): Array<T>;
        /**
         * @name filter
         * @memberof plat.Utils
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Takes in an object/array and a function to evaluate the properties in the object/array.
         * Returns a filtered array of objects resulting from evaluating the function.
         * 
         * @typeparam {any} T The type of objects contained in the Object/Array being filtered.
         * 
         * @param {plat.IObjectIterator<T, boolean>} iterator The iterator function to call with array's properties. 
         * Returns true if the property should be kept, false otherwise.
         * @param {plat.IObject<T>} obj The object to filter.
         * @param {any} context? An optional context to bind to the iterator.
         * 
         * @returns {Array<T>} An array of objects which evaluated to true with the iterator.
         */
        filter<T>(iterator: IObjectIterator<T, boolean>, obj: IObject<T>, context?: any): Array<T>;
        filter(iterator: (value: any, key: any, obj: any) => boolean, obj: any, context?: any): Array<any> {
            return filter(iterator, obj, context);
        }

        /**
         * @name where
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in a list and object containing key/value pairs to search for in the list.
         * 
         * @typeparam {any} T The type of objects contained in the input Array.
         * 
         * @param {Object} properties An object containing key/value pairs to match with obj's values.
         * @param {Array<T>} array The list used for searching for properties.
         * 
         * @returns {Array<T>} The matched values in obj.
         */
        where<T>(properties: Object, array: Array<T>): Array<T> {
            return where(properties, array);
        }

        /**
         * @name forEach
         * @memberof plat.Utils
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Takes in an Array and a function to iterate over. Calls the iterator function with every property
         * in the Array, then returns the object.
         * 
         * @typeparam {any} T The type of objects contained in the input Array.
         * 
         * @param {plat.IListIterator<T, void>} iterator A method that takes in a value, index, and the object.
         * @param {Array<T>} array An Array.
         * @param {any} context? An optional context to bind to the iterator.
         * 
         * @returns {Array<T>} The array.
         */
        forEach<T>(iterator: IListIterator<T, void>, array: Array<T>, context?: any): Array<T>;
        /**
         * @name forEach
         * @memberof plat.Utils
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Takes in an Array and a function to iterate over. Calls the iterator function with every property
         * in the Array, then returns the object.
         * 
         * @typeparam {any} T The type of objects contained in the input Object.
         * 
         * @param {plat.IObjectIterator<T, void>} iterator A method that takes in a value, index, and the object.
         * @param {plat.IObject<T>} obj An object.
         * @param {any} context? An optional context to bind to the iterator.
         * 
         * @returns {any} The input Object.
         */
        forEach<T>(iterator: IObjectIterator<T, void>, obj: IObject<T>, context?: any): IObject<T>;
        forEach(iterator: (value: any, key: any, obj: any) => void, obj: any, context?: any): any {
            return forEach(iterator, obj, context);
        }

        /**
         * @name map
         * @memberof plat.Utils
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The 
         * iterator can transform the object and return it. The returned values will be pushed to an Array and 
         * returned.
         * 
         * @typeparam {any} T The type of objects contained in the input Array.
         * @typeparam {any} R The type of objects contained in the transformed output Array.
         * 
         * @param {plat.IListIterator<T, R>} iterator The transformation function.
         * @param {Array<T>} array An Array.
         * @param {any} context? An optional context to bind to the iterator.
         * 
         * @returns {Array<R>} The accumulated transformed values from the iterator.
         */
        map<T, R>(iterator: IListIterator<T, R>, array: Array<T>, context?: any): Array<R>;
        /**
         * @name map
         * @memberof plat.Utils
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The 
         * iterator can transform the object and return it. The returned values will be pushed to an Array and 
         * returned.
         * 
         * @typeparam {any} T The type of objects contained in the input Object/Array.
         * @typeparam {any} R The type of objects contained in the transformed output Array.
         * 
         * @param {(value: T, index: number, obj: any) => U} iterator The transformation function.
         * @param {plat.IObject<T>} obj An Object.
         * @param {any} context? An optional context to bind to the iterator.
         * 
         * @returns {Array<U>} The accumulated transformed values from the iterator.
         */
        map<T, R>(iterator: IObjectIterator<T, R>, obj: IObject<T>, context?: any): Array<R>;
        map(iterator: (value: any, key: any, obj: any) => any, obj: any, context?: any): Array<any> {
            return map<any, any>(iterator, obj, context);
        }

        /**
         * @name mapAsync
         * @memberof plat.Utils
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Takes in an array and an iterator function. Calls the iterator with all the values in the array. The 
         * iterator can return a promise the will resolve with the mapped value. The returned values will be pushed 
         * to an Array. A promise is returned that will resolve when all the iterators have resolved.
         * 
         * @typeparam {any} T The type of objects contained in the input Array.
         * @typeparam {any} R The type of objects contained in the transformed output Array.
         * 
         * @param {plat.IListIterator<T, plat.async.IThenable<R>>} iterator The transformation function.
         * @param {Array<T>} array An array.
         * @param {any} context? An optional context to bind to the iterator.
         * 
         * @returns {plat.async.IThenable<Array<R>>} The accumulated transformed values from the iterator.
         */
        mapAsync<T, R>(iterator: IListIterator<T, async.IThenable<R>>, array: Array<T>, context?: any): async.IThenable<Array<R>>;
        /**
         * @name mapAsync
         * @memberof plat.Utils
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Takes in an object and an iterator function. Calls the iterator with all the values in the object. The 
         * iterator can return a promise the will resolve with the mapped value. The returned values will be pushed 
         * to an Array. A promise is returned that will resolve when all the iterators have resolved.
         * 
         * @typeparam {any} T The type of objects contained in the input Object.
         * @typeparam {any} R The type of objects contained in the transformed output Array.
         * 
         * @param {plat.IObjectIterator<T, plat.async.IThenable<R>>} iterator The transformation function.
         * @param {plat.IObject<T>} obj An Object.
         * @param {any} context? An optional context to bind to the iterator.
         * 
         * @returns {plat.async.IThenable<Array<R>>} The accumulated transformed values from the iterator.
         */
        mapAsync<T, R>(iterator: IObjectIterator<T, async.IThenable<R>>, obj: IObject<T>, context?: any): plat.async.IThenable<Array<R>>;
        mapAsync<T, R>(iterator: (value: T, key: any, obj: any) => plat.async.IThenable<R>, obj: any,
            context?: any): plat.async.IThenable<Array<R>> {
            return mapAsync(iterator, obj, context);
        }

        /**
         * @name mapAsyncInOrder
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in an array and an iterator function. Calls the iterator with all the values in the array. The 
         * iterator can return a promise the will resolve with the mapped value. The next value in the array will not be passed to 
         * the iterator until the previous promise fulfills.
         * 
         * @typeparam {any} T The type of objects contained in the input Array.
         * @typeparam {any} R The type of objects contained in the transformed output Array.
         * 
         * @param {plat.IListIterator<T, plat.async.IThenable<R>>} iterator The transformation function.
         * @param {Array<T>} array An Array.
         * @param {any} context? An optional context to bind to the iterator.
         * 
         * @returns {plat.async.IThenable<Array<R>>} The accumulated transformed values from the iterator.
         */
        mapAsyncInOrder<T, R>(iterator: IListIterator<T, async.IThenable<R>>, array: Array<T>,
            context?: any): plat.async.IThenable<Array<R>> {
            return mapAsyncInOrder(iterator, array, context);
        }

        /**
         * @name mapAsyncInDescendingOrder
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in an array and an iterator function. Calls the iterator with all the values in the array in descending order. The 
         * iterator can return a promise the will resolve with the mapped value. The next value in the array will not be passed to 
         * the iterator until the previous promise fulfills.
         * 
         * @typeparam {any} T The type of objects contained in the input Array.
         * @typeparam {any} R The type of objects contained in the transformed output Array.
         * 
         * @param {plat.IListIterator<T, plat.async.IThenable<R>>} iterator The transformation function.
         * @param {Array<T>} array An Array.
         * @param {any} context? An optional context to bind to the iterator.
         * 
         * @returns {plat.async.IThenable<Array<R>>} The accumulated transformed values from the iterator.
         */
        mapAsyncInDescendingOrder<T, R>(iterator: IListIterator<T, async.IThenable<R>>, array: Array<T>,
            context?: any): plat.async.IThenable<Array<R>> {
            return mapAsyncInDescendingOrder(iterator, array, context);
        }

        /**
         * @name pluck
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in an object and a property to extract from all of the object's values. Returns an array of
         * the 'plucked' values.
         * 
         * @typeparam {any} T The type of objects contained in the input Object/Array.
         * 
         * @param {string} key The property to 'pluck' from each value in the array.
         * @param {Array<T>} array The array to pluck the key from
         * 
         * @returns {Array<U>} An array of 'plucked' values from obj.
         */
        pluck<T extends {}>(key: string, array: Array<T>): Array<any> {
            return map<T, any>((value) => (<any>value)[key], array);
        }

        /**
         * @name some
         * @memberof plat.Utils
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Takes in an array and an iterator. Evaluates all the values in the array with the iterator.
         * Returns true if any of the iterators return true, otherwise returns false.
         * 
         * @typeparam {any} T The type of objects contained in the input Array.
         * 
         * @param {plat.IListIterator<T, boolean>} iterator A method with which to evaluate all the values in obj.
         * @param {Array<T>} array An array.
         * @param {any} context? An optional context to bind to the iterator.
         * 
         * @returns {boolean} True if any calls to iterator return true, false otherwise.
         */
        some<T>(iterator: IListIterator<T, boolean>, array: Array<T>, context?: any): boolean;
        /**
         * @name some
         * @memberof plat.Utils
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Takes in an array and an iterator. Evaluates all the values in the array with the iterator.
         * Returns true if any of the iterators return true, otherwise returns false.
         * 
         * @typeparam {any} T The type of objects contained in the input Object/Array.
         * 
         * @param {plat.IObjectIterator<T, boolean>} iterator A method with which to evaluate all the values in obj.
         * @param {plat.IObject<T>} obj An object.
         * @param {any} context? An optional context to bind to the iterator.
         * 
         * @returns {boolean} True if any calls to iterator return true, false otherwise.
         */
        some<T>(iterator: IObjectIterator<T, boolean>, obj: IObject<T>, context?: any): boolean;
        some(iterator: (value: any, key: any, obj: any) => boolean, obj: any, context?: any): boolean {
            return some(iterator, obj, context);
        }

        /**
         * @name postpone
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in a method and array of arguments to pass to that method. Delays calling the method until 
         * after the current call stack is clear. Equivalent to a setTimeout with a timeout of 0.
         * 
         * @param {(...args: Array<any>) => void} method The method to call.
         * @param {Array<any>} args? The arguments to apply to the method.
         * @param {any} context? An optional context to bind to the method.
         * 
         * @returns {plat.IRemoveListener} A function that will clear the timeout when called.
         */
        postpone(method: (...args: any[]) => void, args?: Array<any>, context?: any) {
            return defer(method, 0, args, context);
        }

        /**
         * @name defer
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in a method and array of arguments to pass to that method. Delays calling the method until 
         * after the current call stack is clear. Equivalent to a setTimeout with the specified timeout value.
         * 
         * @param {(...args: Array<any>) => void} method The method to call.
         * @param {number} timeout The time (in milliseconds) to delay before calling the provided method
         * @param {Array<any>} args? The arguments to apply to the method.
         * @param {any} context? An optional context to bind to the method.
         * 
         * @returns {plat.IRemoveListener} A function that will clear the timeout when called.
         */
        defer(method: (...args: any[]) => void, timeout: number, args?: Array<any>, context?: any) {
            return defer(method, timeout, args, context);
        }

        /**
         * @name requestAnimationFrame
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Uses requestAnimationFrame if it is available, else it does a setTimeout.
         * 
         * @param {FrameRequestCallback} method The method to call when the request is fulfilled.
         * 
         * @returns {plat.IRemoveListener} A function that will cancel the frame request when called.
         */
        requestAnimationFrame(method: FrameRequestCallback): IRemoveListener {
            return requestAnimationFrameGlobal(method);
        }

        /**
         * @name uniqueId
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in a prefix and returns a unique identifier string with the prefix preprended. If no prefix
         * is specified, none will be prepended.
         * 
         * @param {string} prefix? A string prefix to prepend tothe unique ID.
         * 
         * @returns {string} The prefix-prepended unique ID.
         */
        uniqueId(prefix?: string) {
            return uniqueId(prefix);
        }

        /**
         * @name camelCase
         * @memberof plat.Utils
         * @kind function
         * @access public
         * 
         * @description
         * Takes in a spinal-case, dot.case, or snake_case string and returns 
         * a camelCase string. Also can turn a string into camelCase with space 
         * as a delimeter.
         * 
         * @param {string} str The spinal-case, dot.case, or snake_case string.
         * 
         * @returns {string} The camelCase string.
         */
        camelCase(str: string) {
            return camelCase(str);
        }
    }
    register.injectable(__Utils, Utils);

    /**
     * @name IListIterator
     * @memberof plat
     * @kind interface
     * 
     * @description
     * The Type for a {@link plat.Utils|Utils} list iterator callback method.
     * 
     * @typeparam {any} T The value passed into the iterator.
     * @typeparam {any} R The return type of the iterator.
     */
    export interface IListIterator<T, R> {
        /**
         * @memberof plat.IListIterator
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * A method signature for {@link plat.IListIterator|IListIterator}.
         * 
         * @param {T} value The value for an object during an iteration.
         * @param {number} index The index where the value can be found.
         * @param {Array<T>} list The array passed into the util method.
         * 
         * @returns {R} The returned value.
         */
        (value: T, index: number, list: Array<T>): R;
    }

    /**
     * @name IObjectIterator
     * @memberof plat
     * @kind interface
     * 
     * @description
     * The Type for a {@link plat.Utils|Utils} object iterator callback method.
     * 
     * @typeparam {any} T The value passed into the iterator.
     * @typeparam {any} R The return type of the iterator.
     */
    export interface IObjectIterator<T, R> {
        /**
         * @memberof plat.IObjectIterator
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * A method signature for {@link plat.IObjectIterator|IObjectIterator}.
         * 
         * @param {T} value The value for an object during an iteration.
         * @param {string} key The key where the value can be found.
         * @param {plat.IObject<T>} obj The object passed into the util method.
         * 
         * @returns {R} The returned value.
         */
        (value: T, key: string, obj: IObject<T>): R;
    }
}
