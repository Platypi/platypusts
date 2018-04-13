// tslint:disable:promise-must-complete
namespace plat.async {
    'use strict';
    declare const process: any;

    let __promiseQueue: any[] = [];
    const browserGlobal: any = typeof window !== 'undefined' ? window : {};

    let BrowserMutationObserver = browserGlobal.MutationObserver;

    if (!isObject(BrowserMutationObserver)) {
        BrowserMutationObserver = browserGlobal.WebKitMutationObserver;
    }

    let scheduleFlush: () => void;

    // decide what async method to use to triggering processing of queued callbacks:
    if (
        typeof process !== 'undefined' &&
        {}.toString.call(process) === '[object process]'
    ) {
        scheduleFlush = useNextTick();
    } else if (BrowserMutationObserver) {
        scheduleFlush = useMutationObserver();
    } else {
        scheduleFlush = useSetTimeout();
    }

    /**
     * @name Promise
     * @memberof plat.async
     * @kind class
     *
     * @implements {plat.async.PromiseLike}
     *
     * @description
     * Takes in a generic type corresponding to the fulfilled success type.
     *
     * @typeparam {any} R The return type of the promise.
     */
    export class Promise<T> implements PromiseLike<T> {
        /**
         * @name config
         * @memberof plat.async.Promise
         * @kind property
         * @access public
         * @static
         *
         * @type {any}
         *
         * @description
         * The configuration for creating asynchronous promise flushing.
         */
        public static config: {
            async(
                callback: (arg?: PromiseLike<any>) => void,
                arg?: PromiseLike<any>
            ): void;
        } = {
            /**
             * Handles asynchronous flushing of callbacks. If the callback queue is of
             * length 1, then we need to schedule a flush. Afterward, any additional
             * callbacks added to the queue will be flushed accordingly.
             */
            async: (
                callback: (arg?: PromiseLike<any>) => void,
                arg?: PromiseLike<any>
            ): void => {
                const length = __promiseQueue.push([callback, arg]);
                if (length === 1) {
                    scheduleFlush();
                }
            },
        };

        /**
         * @name all
         * @memberof plat.async.Promise
         * @kind function
         * @access public
         * @static
         *
         * @description
         * Returns a promise that fulfills when every item in the array is fulfilled.
         * Casts arguments to promises if necessary. The result argument of the
         * returned promise is an array containing the fulfillment result arguments
         * in-order. The rejection argument is the rejection argument of the
         * first-rejected promise.
         *
         * @typeparam {any} R The type of the promises.
         *
         * @param {Array<R>} promises An array of objects, if an object is not a promise, it will be cast.
         *
         * @returns {plat.async.PromiseLike<Array<R>>} A promise that resolves after all the input promises resolve.
         */
        public static all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>,
                T7 | PromiseLike<T7>,
                T8 | PromiseLike<T8>,
                T9 | PromiseLike<T9>,
                T10 | PromiseLike<T10>
            ]
        ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
        public static all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>,
                T7 | PromiseLike<T7>,
                T8 | PromiseLike<T8>,
                T9 | PromiseLike<T9>
            ]
        ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
        public static all<T1, T2, T3, T4, T5, T6, T7, T8>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>,
                T7 | PromiseLike<T7>,
                T8 | PromiseLike<T8>
            ]
        ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>;
        public static all<T1, T2, T3, T4, T5, T6, T7>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>,
                T7 | PromiseLike<T7>
            ]
        ): Promise<[T1, T2, T3, T4, T5, T6, T7]>;
        public static all<T1, T2, T3, T4, T5, T6>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>
            ]
        ): Promise<[T1, T2, T3, T4, T5, T6]>;
        public static all<T1, T2, T3, T4, T5>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>
            ]
        ): Promise<[T1, T2, T3, T4, T5]>;
        public static all<T1, T2, T3, T4>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>
            ]
        ): Promise<[T1, T2, T3, T4]>;
        public static all<T1, T2, T3>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>
            ]
        ): Promise<[T1, T2, T3]>;
        public static all<T1, T2>(
            values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]
        ): Promise<[T1, T2]>;
        public static all<T>(values: (T | PromiseLike<T>)[]): Promise<T[]>;
        public static all<T>(values: (T | PromiseLike<T>)[]): Promise<T[]> {
            if (!isArray(values)) {
                return Promise.all([<any>values]);
            }

            return new Promise<any[]>(
                (
                    resolve: (value?: any[]) => void,
                    reject: (reason?: any) => void
                ): void => {
                    const results: any[] = [];
                    let remaining = values.length;
                    let promise: Promise<any>;

                    if (remaining === 0) {
                        resolve(<any>[]);
                    }

                    function resolver(index: number): (value: any) => void {
                        return (value: any): void => resolveAll(index, value);
                    }

                    function resolveAll(index: number, value: any): any {
                        results[index] = value;
                        remaining -= 1;

                        if (remaining === 0) {
                            resolve(<any>results);
                        }
                    }

                    for (
                        let i = 0;
                        i < (<PromiseLike<any>[]>values).length;
                        i += 1
                    ) {
                        promise = (<Promise<any>[]>values)[i];

                        if (isPromise(promise)) {
                            promise.then(resolver(i), reject);
                        } else {
                            resolveAll(i, promise);
                        }
                    }
                }
            );
        }

        /**
         * @name race
         * @memberof plat.async.Promise
         * @kind function
         * @access public
         * @static
         *
         * @description
         * Returns a promise that fulfills as soon as any of the promises fulfill,
         * or rejects as soon as any of the promises reject (whichever happens first).
         *
         * @typeparam {any} R The type of the input objects.
         *
         * @param {Array<TResult>} promises An Array of anything to 'race'. Objects that aren't promises will
         * be cast.
         *
         * @returns {plat.async.PromiseLike<TResult>} A promise that fulfills when one of the input
         * promises fulfilled.
         */
        public static race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>,
                T7 | PromiseLike<T7>,
                T8 | PromiseLike<T8>,
                T9 | PromiseLike<T9>,
                T10 | PromiseLike<T10>
            ]
        ): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;
        public static race<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>,
                T7 | PromiseLike<T7>,
                T8 | PromiseLike<T8>,
                T9 | PromiseLike<T9>
            ]
        ): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;
        public static race<T1, T2, T3, T4, T5, T6, T7, T8>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>,
                T7 | PromiseLike<T7>,
                T8 | PromiseLike<T8>
            ]
        ): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;
        public static race<T1, T2, T3, T4, T5, T6, T7>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>,
                T7 | PromiseLike<T7>
            ]
        ): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7>;
        public static race<T1, T2, T3, T4, T5, T6>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>
            ]
        ): Promise<T1 | T2 | T3 | T4 | T5 | T6>;
        public static race<T1, T2, T3, T4, T5>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>
            ]
        ): Promise<T1 | T2 | T3 | T4 | T5>;
        public static race<T1, T2, T3, T4>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>
            ]
        ): Promise<T1 | T2 | T3 | T4>;
        public static race<T1, T2, T3>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>
            ]
        ): Promise<T1 | T2 | T3>;
        public static race<T1, T2>(
            values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]
        ): Promise<T1 | T2>;
        public static race<T>(values: (T | PromiseLike<T>)[]): Promise<T>;
        public static race<T>(values: (T | PromiseLike<T>)[]): Promise<T> {
            if (!isArray(values)) {
                return Promise.race([<any>values]);
            }

            return new Promise<any>(
                (
                    resolve: (value: any) => any,
                    reject: (error: any) => any
                ): void => {
                    let promise: Promise<any>;

                    for (
                        let i = 0;
                        i < (<PromiseLike<T>[]>values).length;
                        i += 1
                    ) {
                        promise = (<Promise<T>[]>values)[i];

                        if (
                            isObject(promise) &&
                            typeof promise.then === 'function'
                        ) {
                            promise.then(resolve, reject);
                        } else {
                            resolve(<any>promise);
                        }
                    }
                }
            );
        }

        /**
         * @name resolve
         * @memberof plat.async.Promise
         * @kind function
         * @access public
         * @static
         *
         * @description
         * Returns a promise that resolves with the input value.
         *
         * @typeparam {any} R The value with which to resolve the promise.
         *
         * @param {T} value The value to resolve.
         *
         * @returns {plat.async.PromiseLike<T>} A promise that will resolve with the associated value.
         */
        public static resolve(): Promise<void>;
        public static resolve<T>(
            value?: T | PromiseLike<T>
        ): Promise<T>;
        public static resolve<T>(
            value?: T | PromiseLike<T>
        ): Promise<T> {
            return new Promise<T>(
                (
                    resolve: (value: T) => any,
                    reject: (reason: any) => any
                ): void => {
                    resolve(<T>value);
                }
            );
        }

        /**
         * @name reject
         * @memberof plat.async.Promise
         * @kind function
         * @access public
         * @static
         *
         * @description
         * Returns a promise that rejects with the input value.
         *
         * @param {any} error The value to reject.
         *
         * @returns {plat.async.PromiseLike<any>} A promise that will reject with the error.
         */
        public static reject(error?: any): Promise<never>;
        public static reject<T>(error?: any): Promise<T>;
        public static reject<T>(error?: any): Promise<T> {
            return new Promise<T>(
                (
                    resolve: (value: any) => any,
                    reject: (error: any) => any
                ): void => {
                    reject(error);
                }
            );
        }

        /**
         * @name __invokeResolveFunction
         * @memberof plat.async.Promise
         * @kind function
         * @access private
         * @static
         *
         * @description
         * Invokes the resolve function for a promise. Handles error catching.
         *
         * @typeparam {any} R The return type of the input {@link plat.async.Promise|Promise}.
         *
         * @param
         * {(resolve : (value?: TResult | PromiseLike<TResult>) => void, reject: (error?: any) => void) => void} resolveFunction The resolve function to invoke.
         * @param {plat.async.Promise<TResult>} promise The promise on which to invoke the resolve function.
         *
         * @returns {void}
         */
        private static __invokeResolveFunction<TResult>(
            resolveFunction: (
                resolve: (value?: TResult | PromiseLike<TResult>) => void,
                reject: (error?: any) => void
            ) => void,
            promise: Promise<TResult>
        ): void {
            function resolvePromise(value?: any): void {
                Promise.__resolve<TResult>(promise, value);
            }

            function rejectPromise(reason?: any): void {
                Promise.__reject(promise, reason);
            }

            try {
                resolveFunction(resolvePromise, rejectPromise);
            } catch (e) {
                rejectPromise(e);
            }
        }

        /**
         * @name __invokeCallback
         * @memberof plat.async.Promise
         * @kind function
         * @access private
         * @static
         *
         * @description
         * Invokes a callback for a promise with the specified detail.
         *
         * @param {plat.async.State} settled The state of the promise.
         * @param {any} promise The promise object.
         * @param {(response: any) => void} callback The callback to invoke.
         * @param {any} detail The details to pass to the callback.
         *
         * @returns {void}
         */
        private static __invokeCallback(
            settled: State,
            promise: any,
            callback: (response: any) => any,
            detail: any
        ): void {
            const hasCallback = isFunction(callback);
            let value: any;
            let error: Error;
            let succeeded: boolean;
            let failed: boolean;

            if (hasCallback) {
                try {
                    value = callback(detail);
                    succeeded = true;
                } catch (e) {
                    failed = true;
                    error = e;
                }
            } else {
                value = detail;
                succeeded = true;
            }

            if (Promise.__handleThenable<any>(promise, value)) {
                return;
            } else if (hasCallback && succeeded) {
                Promise.__resolve<any>(promise, value);
            } else if (failed) {
                Promise.__reject(promise, error);
            } else if (settled === State.FULFILLED) {
                Promise.__resolve<any>(promise, value);
            } else if (settled === State.REJECTED) {
                Promise.__reject(promise, value);
            }
        }

        /**
         * @name __publish
         * @memberof plat.async.Promise
         * @kind function
         * @access private
         * @static
         *
         * @description
         * Publishes the promise details to all the subscribers for a promise.
         *
         * @param {any} promise The promise object.
         * @param {plat.async.State} settled The state of the promise.
         *
         * @returns {void}
         */
        private static __publish(promise: Promise<any>, settled: State): void {
            const subscribers = (<any>promise).__subscribers;
            const detail = (<any>promise).__detail;
            let child: any;
            let callback: () => void;

            for (let i = 0; i < subscribers.length; i += 3) {
                child = subscribers[i];
                callback = subscribers[i + <number>settled];

                Promise.__invokeCallback(settled, child, callback, detail);
            }

            (<any>promise).__subscribers = null;
        }

        /**
         * @name __publishFulfillment
         * @memberof plat.async.Promise
         * @kind function
         * @access private
         * @static
         *
         * @description
         * Publishes a promises that has been fulfilled.
         *
         * @param {any} promise The promise object.
         *
         * @returns {void}
         */
        private static __publishFulfillment(promise: any): void {
            Promise.__publish(
                promise,
                ((<any>promise).__state = State.FULFILLED)
            );
        }

        /**
         * @name __publishRejection
         * @memberof plat.async.Promise
         * @kind function
         * @access private
         * @static
         *
         * @description
         * Publishes a promises that has been rejected.
         *
         * @param {any} promise The promise object.
         *
         * @returns {void}
         */
        private static __publishRejection(promise: any): void {
            Promise.__publish(
                promise,
                ((<any>promise).__state = State.REJECTED)
            );
        }

        /**
         * @name __reject
         * @memberof plat.async.Promise
         * @kind function
         * @access private
         * @static
         *
         * @description
         * Asynchronously rejects a promise
         *
         * @param {any} promise The promise object.
         * @param {any} reason The detail of the rejected promise.
         *
         * @returns {void}
         */
        private static __reject(promise: any, reason: any): void {
            if ((<any>promise).__state !== State.PENDING) {
                return;
            }
            (<any>promise).__state = State.SEALED;
            (<any>promise).__detail = reason;

            Promise.config.async(Promise.__publishRejection, promise);
        }

        /**
         * @name __fulfill
         * @memberof plat.async.Promise
         * @kind function
         * @access private
         * @static
         *
         * @description
         * Asynchronously fulfills a promise
         *
         * @typeparam {any} R The return type of the promise.
         *
         * @param {plat.async.Promise<TResult>} promise The promise object.
         * @param {any} value The detail of the fulfilled promise.
         *
         * @returns {void}
         */
        private static __fulfill<TResult>(
            promise: Promise<TResult>,
            value: any
        ): void {
            if ((<any>promise).__state !== State.PENDING) {
                return;
            }
            (<any>promise).__state = State.SEALED;
            (<any>promise).__detail = value;

            Promise.config.async(Promise.__publishFulfillment, promise);
        }

        /**
         * @name __resolve
         * @memberof plat.async.Promise
         * @kind function
         * @access private
         * @static
         *
         * @description
         * Asynchronously fulfills a promise, allowing for promise chaining.
         *
         * @typeparam {any} R The return type of the promise.
         *
         * @param {plat.async.Promise<TResult>} promise The promise object.
         * @param {any} value The detail of the fulfilled promise.
         *
         * @returns {void}
         */
        private static __resolve<TResult>(
            promise: Promise<TResult>,
            value: any
        ): void {
            if (promise === value) {
                Promise.__fulfill(promise, value);
            } else if (!Promise.__handleThenable<TResult>(promise, value)) {
                Promise.__fulfill(promise, value);
            }
        }

        /**
         * @name __handleThenable
         * @memberof plat.async.Promise
         * @kind function
         * @access private
         * @static
         *
         * @description
         * Handles chaining promises together, when a promise is returned from within a then handler.
         *
         * @typeparam {any} R The return type of the promise.
         *
         * @param {plat.async.Promise<TResult>} promise The promise object.
         * @param {plat.async.Promise<TResult>} value The next promise to await.
         *
         * @returns {boolean} Whether or not the value passed in is a promise.
         */
        private static __handleThenable<TResult>(
            promise: Promise<TResult>,
            value: Promise<TResult>
        ): boolean {
            let resolved: boolean;

            if (promise === value) {
                Promise.__reject(
                    promise,
                    new TypeError(
                        'A promises callback cannot return the same promise.'
                    )
                );

                return true;
            }

            if (isPromise(value)) {
                try {
                    value.then.call(
                        value,
                        (val: any): boolean => {
                            if (resolved) {
                                return true;
                            }
                            resolved = true;

                            if (value !== val) {
                                Promise.__resolve<TResult>(promise, val);
                            } else {
                                Promise.__fulfill<TResult>(promise, val);
                            }
                        },
                        (val: any): boolean => {
                            if (resolved) {
                                return true;
                            }
                            resolved = true;

                            Promise.__reject(promise, val);
                        }
                    );

                    return true;
                } catch (error) {
                    if (resolved) {
                        return true;
                    }
                    Promise.__reject(promise, error);

                    return true;
                }
            }

            return false;
        }

        /**
         * @name __subscribe
         * @memberof plat.async.Promise
         * @kind function
         * @access private
         * @static
         *
         * @description
         * Adds a child promise to the parent's subscribers.
         *
         * @typeparam {any} R The return type of the promise.
         *
         * @param {plat.async.Promise<any>} parent The parent promise.
         * @param {plat.async.Promise<any>} value The child promise.
         * @param {(success: any) => any} onfulfilled The fulfilled method for the child.
         * @param {(error: any) => any} onRejected The rejected method for the child.
         *
         * @returns {void}
         */
        private static __subscribe(
            parent: Promise<any>,
            child: PromiseLike<any>,
            onFulfilled: (success: any) => any,
            onRejected: (error: any) => any
        ): void {
            const subscribers: any[] = (<any>parent).__subscribers;
            const length = subscribers.length;

            subscribers[length] = child;
            subscribers[length + <number>State.FULFILLED] = onFulfilled;
            subscribers[length + <number>State.REJECTED] = onRejected;
        }

        /**
         * @name constructor
         * @memberof plat.async.Promise
         * @kind function
         * @access public
         *
         * @description
         * An ES6 implementation of the Promise API. Useful for asynchronous programming.
         * Takes in 2 generic types corresponding to the fulfilled success and error types.
         * The error type (U) should extend Error in order to get proper stack tracing.
         *
         * @typeparam {any} R The return type of the promise.
         *
         * @param {(resolve : (value?: T | PromiseLike<T>) => void, reject: (error?: any) => void) => void} resolveFunction
         * A function for fulfilling/rejecting the Promise.
         *
         * @returns {plat.async.Promise<T>} A promise object.
         */
        constructor(
            resolveFunction: (
                resolve: (value?: T | PromiseLike<T>) => void,
                reject: (error?: any) => void
            ) => void
        ) {
            if (!isFunction(resolveFunction)) {
                throw new TypeError(
                    'You must pass a resolver function as the first argument to the promise constructor'
                );
            }

            if (!(this instanceof Promise)) {
                throw new TypeError(
                    'Failed to construct "Promise": ' +
                        'Please use the "new" operator, this object constructor cannot be called as a function.'
                );
            }

            (<any>this).__subscribers = [];

            Promise.__invokeResolveFunction<T>(resolveFunction, this);
        } // tslint:disable-next-line

        /**
         * @name then
         * @memberof plat.async.Promise
         * @kind function
         * @access public
         *
         * @description
         * Takes in two methods, called when/if the promise fulfills/rejects.
         *
         * @typeparam {any} U The return type of the returned promise.
         *
         * @param {(success: T) => U} onFulfilled A method called when/if the promise fulfills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         *
         * @returns {PromiseLike<U>} A promise that resolves with the input type parameter U.
         */ public then<TResult1 = T, TResult2 = never>(
            onFulfilled?:
                | ((value: T) => TResult1 | PromiseLike<TResult1>)
                | undefined
                | null,
            onRejected?:
                | ((reason: any) => TResult2 | PromiseLike<TResult2>)
                | undefined
                | null
        ): Promise<TResult1 | TResult2> {
            // tslint:disable-next-line
            const promise = this;

            const thenPromise = <Promise<
                TResult1 | TResult2
            >>new (<any>this).constructor(noop, this);

            if (!isNull((<any>this).__state)) {
                const callbacks = arguments;
                Promise.config.async((): void => {
                    Promise.__invokeCallback(
                        (<any>promise).__state,
                        thenPromise,
                        callbacks[(<any>promise).__state - 1],
                        (<any>promise).__detail
                    );
                });
            } else {
                Promise.__subscribe(this, thenPromise, onFulfilled, onRejected);
            }

            return thenPromise;
        }

        /**
         * @name catch
         * @memberof plat.async.Promise
         * @kind function
         * @access public
         *
         * @description
         * A wrapper method for {@link plat.async.Promise|Promise.then(undefined, onRejected);}
         *
         * @typeparam {any} U The return type of the returned promise.
         *
         * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         *
         * @returns {PromiseLike<U>} A promise that resolves with the input type parameter U.
         */
        public catch<TResult = never>(
            onRejected?:
                | ((reason: any) => TResult | PromiseLike<TResult>)
                | undefined
                | null
        ): Promise<T | TResult> {
            return this.then(null, onRejected);
        }

        /**
         * @name toString
         * @memberof plat.async.Promise
         * @kind function
         * @access public
         *
         * @description
         * Outputs the Promise as a readable string.
         *
         * @returns {string} `[object Promise]`
         */
        public toString(): string {
            return '[object Promise]';
        }
    }

    enum State {
        PENDING = <any>void 0,
        SEALED = 0,
        FULFILLED = 1,
        REJECTED = 2,
    }

    // node
    function useNextTick(): () => void {
        return (): void => {
            process.nextTick(flush);
        };
    }

    function useMutationObserver(): () => void {
        const _document = acquire(__Document);
        const _window = acquire(__Window);
        const element = _document.createElement('div');
        let observer = new BrowserMutationObserver(flush);

        observer.observe(element, { attributes: true });

        _window.addEventListener(
            'unload',
            (): void => {
                observer.disconnect();
                observer = null;
            },
            false
        );

        return (): void => {
            element.setAttribute('drainQueue', 'drainQueue');
        };
    }

    function useSetTimeout(): () => void {
        return (): void => {
            postpone(flush);
        };
    }

    function flush(): void {
        let callback: (response: any) => void;
        let arg: any;

        for (const tuple of __promiseQueue) {
            callback = tuple[0];
            arg = tuple[1];
            callback(arg);
        }

        __promiseQueue = [];
    }

    /**
     * The Type for referencing the '_Promise' injectable as a dependency.
     */
    export function IPromise(_window?: any): IPromise {
        if (
            !isNull(_window.Promise) &&
            isFunction(_window.Promise.all) &&
            isFunction(_window.Promise.race) &&
            isFunction(_window.Promise.resolve) &&
            isFunction(_window.Promise.reject)
        ) {
            return _window.Promise;
        }

        return Promise;
    }

    register.injectable(__Promise, IPromise, [__Window], __CLASS);

    /**
     * Static Promise interface. See plat.async.Promise
     */
    export interface IPromise {
        new <R>(
            resolveFunction: (
                resolve: (value?: R | PromiseLike<R>) => void,
                reject: (error?: any) => void
            ) => void
        ): Promise<R>;

        all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>,
                T7 | PromiseLike<T7>,
                T8 | PromiseLike<T8>,
                T9 | PromiseLike<T9>,
                T10 | PromiseLike<T10>
            ]
        ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
        all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>,
                T7 | PromiseLike<T7>,
                T8 | PromiseLike<T8>,
                T9 | PromiseLike<T9>
            ]
        ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
        all<T1, T2, T3, T4, T5, T6, T7, T8>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>,
                T7 | PromiseLike<T7>,
                T8 | PromiseLike<T8>
            ]
        ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>;
        all<T1, T2, T3, T4, T5, T6, T7>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>,
                T7 | PromiseLike<T7>
            ]
        ): Promise<[T1, T2, T3, T4, T5, T6, T7]>;
        all<T1, T2, T3, T4, T5, T6>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>
            ]
        ): Promise<[T1, T2, T3, T4, T5, T6]>;
        all<T1, T2, T3, T4, T5>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>
            ]
        ): Promise<[T1, T2, T3, T4, T5]>;
        all<T1, T2, T3, T4>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>
            ]
        ): Promise<[T1, T2, T3, T4]>;
        all<T1, T2, T3>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>
            ]
        ): Promise<[T1, T2, T3]>;
        all<T1, T2>(
            values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]
        ): Promise<[T1, T2]>;
        all<T>(values: (T | PromiseLike<T>)[]): Promise<T[]>;

        race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>,
                T7 | PromiseLike<T7>,
                T8 | PromiseLike<T8>,
                T9 | PromiseLike<T9>,
                T10 | PromiseLike<T10>
            ]
        ): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;
        race<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>,
                T7 | PromiseLike<T7>,
                T8 | PromiseLike<T8>,
                T9 | PromiseLike<T9>
            ]
        ): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;
        race<T1, T2, T3, T4, T5, T6, T7, T8>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>,
                T7 | PromiseLike<T7>,
                T8 | PromiseLike<T8>
            ]
        ): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;
        race<T1, T2, T3, T4, T5, T6, T7>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>,
                T7 | PromiseLike<T7>
            ]
        ): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7>;
        race<T1, T2, T3, T4, T5, T6>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>,
                T6 | PromiseLike<T6>
            ]
        ): Promise<T1 | T2 | T3 | T4 | T5 | T6>;
        race<T1, T2, T3, T4, T5>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>,
                T5 | PromiseLike<T5>
            ]
        ): Promise<T1 | T2 | T3 | T4 | T5>;
        race<T1, T2, T3, T4>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>,
                T4 | PromiseLike<T4>
            ]
        ): Promise<T1 | T2 | T3 | T4>;
        race<T1, T2, T3>(
            values: [
                T1 | PromiseLike<T1>,
                T2 | PromiseLike<T2>,
                T3 | PromiseLike<T3>
            ]
        ): Promise<T1 | T2 | T3>;
        race<T1, T2>(
            values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]
        ): Promise<T1 | T2>;
        race<T>(values: (T | PromiseLike<T>)[]): Promise<T>;

        resolve(): Promise<void>;
        resolve<T>(
            value?: T | PromiseLike<T>
        ): Promise<T>;

        reject(error?: any): Promise<never>;
        reject<T>(error?: any): Promise<T>;
    }
}
//tslint:enable:promise-must-complete
