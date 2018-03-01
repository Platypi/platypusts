// tslint:disable:promise-must-complete
module plat.async {
    'use strict';
    declare const process: any;

    let __promiseQueue: any[] = [];
    const browserGlobal: any = (typeof window !== 'undefined') ? window : {};

    let BrowserMutationObserver = browserGlobal.MutationObserver;

    if (!isObject(BrowserMutationObserver)) {
        BrowserMutationObserver = browserGlobal.WebKitMutationObserver;
    }

    let scheduleFlush: () => void;

    // decide what async method to use to triggering processing of queued callbacks:
    if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
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
     * @implements {plat.async.IThenable}
     *
     * @description
     * Takes in a generic type corresponding to the fulfilled success type.
     *
     * @typeparam {any} R The return type of the promise.
     */
    export class Promise<R> implements IThenable<R> {
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
        public static config: { async(callback: (arg?: IThenable<any>) => void, arg?: IThenable<any>): void } = {
            /**
             * Handles asynchronous flushing of callbacks. If the callback queue is of
             * length 1, then we need to schedule a flush. Afterward, any additional
             * callbacks added to the queue will be flushed accordingly.
             */
            async: (callback: (arg?: IThenable<any>) => void, arg?: IThenable<any>): void => {
                const length = __promiseQueue.push([callback, arg]);
                if (length === 1) {
                    scheduleFlush();
                }
            },
        };

        /**
         * @name __subscribers
         * @memberof plat.async.Promise
         * @kind property
         * @access private
         *
         * @type {Array<any>}
         *
         * @description
         * Holds all the subscriber promises
         */
        private __subscribers: any[];

        /**
         * @name __state
         * @memberof plat.async.Promise
         * @kind property
         * @access private
         *
         * @type {plat.async.State}
         *
         * @description
         * The state of the promise (fulfilled/rejected)
         */
        private __state: State;

        /**
         * @name __detail
         * @memberof plat.async.Promise
         * @kind property
         * @access private
         *
         * @type {any}
         *
         * @description
         * The return detail of a promise.
         */
        private __detail: any;

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
         * @returns {plat.async.IThenable<Array<R>>} A promise that resolves after all the input promises resolve.
         */
        public static all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
            values: [T1 | IThenable<T1>, T2 | IThenable<T2>, T3 | IThenable<T3>, T4 | IThenable <T4>, T5 |
                IThenable<T5>, T6 | IThenable<T6>, T7 | IThenable<T7>, T8 | IThenable<T8>, T9 | IThenable<T9>, T10 | IThenable<T10>]
        ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
        public static all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
            values: [T1 | IThenable<T1>, T2 | IThenable<T2>, T3 | IThenable<T3>, T4 | IThenable <T4>, T5 |
                IThenable<T5>, T6 | IThenable<T6>, T7 | IThenable<T7>, T8 | IThenable<T8>, T9 | IThenable<T9>]
        ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
        public static all<T1, T2, T3, T4, T5, T6, T7, T8>(
            values: [T1 | IThenable<T1>, T2 | IThenable<T2>, T3 | IThenable<T3>, T4 | IThenable <T4>, T5 |
                IThenable<T5>, T6 | IThenable<T6>, T7 | IThenable<T7>, T8 | IThenable<T8>]
        ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>;
        public static all<T1, T2, T3, T4, T5, T6, T7>(
            values: [T1 | IThenable<T1>, T2 | IThenable<T2>, T3 | IThenable<T3>, T4 | IThenable <T4>, T5 |
                IThenable<T5>, T6 | IThenable<T6>, T7 | IThenable<T7>]
        ): Promise<[T1, T2, T3, T4, T5, T6, T7]>;
        public static all<T1, T2, T3, T4, T5, T6>(
            values: [T1 | IThenable<T1>, T2 | IThenable<T2>, T3 | IThenable<T3>, T4 | IThenable <T4>, T5 |
                IThenable<T5>, T6 | IThenable<T6>]
        ): Promise<[T1, T2, T3, T4, T5, T6]>;
        public static all<T1, T2, T3, T4, T5>(
            values: [T1 | IThenable<T1>, T2 | IThenable<T2>, T3 | IThenable<T3>, T4 | IThenable <T4>, T5 | IThenable<T5>]
        ): Promise<[T1, T2, T3, T4, T5]>;
        public static all<T1, T2, T3, T4>(
            values: [T1 | IThenable<T1>, T2 | IThenable<T2>, T3 | IThenable<T3>, T4 | IThenable <T4>]
        ): Promise<[T1, T2, T3, T4]>;
        public static all<T1, T2, T3>(
            values: [T1 | IThenable<T1>, T2 | IThenable<T2>, T3 | IThenable<T3>]
        ): Promise<[T1, T2, T3]>;
        public static all<T1, T2>(
            values: [T1 | IThenable<T1>, T2 | IThenable<T2>]
        ): Promise<[T1, T2]>;
        public static all<T1>(
            values: (T1 | IThenable<T1>)[]
        ): Promise<[T1]>;
        public static all<TAll>(values: (TAll | IThenable<TAll>)[]): Promise<TAll[]> {
            if (!isArray(values)) {
                return Promise.all([<any>values]);
            }

            return new Promise<any[]>((resolve: (value?: any[]) => void, reject: (reason?: any) => void): void => {
                const results: any[] = [];
                let remaining = (<any[]>values).length;
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

                for (let i = 0; i < (<IThenable<any>[]>values).length; i += 1) {
                    promise = (<Promise<any>[]>values)[i];

                    if (isPromise(promise)) {
                        promise.then(resolver(i), reject);
                    } else {
                        resolveAll(i, promise);
                    }
                }
            });
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
         * @param {Array<R>} promises An Array of anything to 'race'. Objects that aren't promises will
         * be cast.
         *
         * @returns {plat.async.IThenable<R>} A promise that fulfills when one of the input
         * promises fulfilled.
         */
        public static race<R>(promises: (R | IThenable<R>)[]): Promise<R> {
            if (!isArray(promises)) {
                return Promise.race([<any>promises]);
            }

            return new Promise<any>((resolve: (value: any) => any, reject: (error: any) => any): void => {
                let promise: Promise<any>;

                for (let i = 0; i < (<IThenable<R>[]>promises).length; i += 1) {
                    promise = (<Promise<R>[]>promises)[i];

                    if (isObject(promise) && typeof promise.then === 'function') {
                        promise.then(resolve, reject);
                    } else {
                        resolve(<any>promise);
                    }
                }
            });
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
         * @param {R} value The value to resolve.
         *
         * @returns {plat.async.IThenable<R>} A promise that will resolve with the associated value.
         */
        public static resolve<R>(value?: R | IThenable<R>): Promise<R> {
            return new Promise<R>((resolve: (value: R) => any, reject: (reason: any) => any): void => {
                resolve(<R>value);
            });
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
         * @returns {plat.async.IThenable<any>} A promise that will reject with the error.
         */
        public static reject<R>(error?: any): Promise<R> {
            return new Promise<R>((resolve: (value: any) => any, reject: (error: any) => any): void => {
                reject(error);
            });
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
         * @param {plat.async.IResolveFunction<R>} resolveFunction The resolve function to invoke.
         * @param {plat.async.Promise<R>} promise The promise on which to invoke the resolve function.
         *
         * @returns {void}
         */
        private static __invokeResolveFunction<R>(resolveFunction: IResolveFunction<R>,
            promise: Promise<R>): void {
            function resolvePromise(value?: any): void {
                Promise.__resolve<R>(promise, value);
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
        private static __invokeCallback(settled: State, promise: any, callback: (response: any) => any, detail: any): void {
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
            const subscribers = promise.__subscribers;
            const detail = promise.__detail;
            let child: any;
            let callback: () => void;

            for (let i = 0; i < subscribers.length; i += 3) {
                child = subscribers[i];
                callback = subscribers[i + <number>settled];

                Promise.__invokeCallback(settled, child, callback, detail);
            }

            promise.__subscribers = null;
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
            Promise.__publish(promise, promise.__state = State.FULFILLED);
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
            Promise.__publish(promise, promise.__state = State.REJECTED);
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
            if (promise.__state !== State.PENDING) {
                return;
            }
            promise.__state = State.SEALED;
            promise.__detail = reason;

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
         * @param {plat.async.Promise<R>} promise The promise object.
         * @param {any} value The detail of the fulfilled promise.
         *
         * @returns {void}
         */
        private static __fulfill<R>(promise: Promise<R>, value: any): void {
            if (promise.__state !== State.PENDING) {
                return;
            }
            promise.__state = State.SEALED;
            promise.__detail = value;

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
         * @param {plat.async.Promise<R>} promise The promise object.
         * @param {any} value The detail of the fulfilled promise.
         *
         * @returns {void}
         */
        private static __resolve<R>(promise: Promise<R>, value: any): void {
            if (promise === value) {
                Promise.__fulfill(promise, value);
            } else if (!Promise.__handleThenable<R>(promise, value)) {
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
         * @param {plat.async.Promise<R>} promise The promise object.
         * @param {plat.async.Promise<R>} value The next promise to await.
         *
         * @returns {boolean} Whether or not the value passed in is a promise.
         */
        private static __handleThenable<R>(promise: Promise<R>, value: Promise<R>): boolean {
            let resolved: boolean;

            if (promise === value) {
                Promise.__reject(promise, new TypeError('A promises callback cannot return the same promise.'));

                return true;
            }

            if (isPromise(value)) {
                try {
                    value.then.call(value, (val: any): boolean => {
                        if (resolved) {
                            return true;
                        }
                        resolved = true;

                        if (value !== val) {
                            Promise.__resolve<R>(promise, val);
                        } else {
                            Promise.__fulfill<R>(promise, val);
                        }
                    }, (val: any): boolean => {
                        if (resolved) {
                            return true;
                        }
                        resolved = true;

                        Promise.__reject(promise, val);
                    });

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
        private static __subscribe(parent: Promise<any>, child: IThenable<any>,
            onFulfilled: (success: any) => any, onRejected: (error: any) => any): void {
            const subscribers = parent.__subscribers;
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
         * @param {plat.async.IResolveFunction<R>} resolveFunction A IResolveFunction for fulfilling/rejecting the Promise.
         *
         * @returns {plat.async.Promise<R>} A promise object.
         */
        constructor(resolveFunction: IResolveFunction<R>) {
            if (!isFunction(resolveFunction)) {
                throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
            }

            if (!(this instanceof Promise)) {
                throw new TypeError('Failed to construct "Promise": ' +
                    'Please use the "new" operator, this object constructor cannot be called as a function.');
            }

            this.__subscribers = [];

            Promise.__invokeResolveFunction<R>(resolveFunction, this);
        }

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
         * @param {(success: R) => U} onFulfilled A method called when/if the promise fulfills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         *
         * @returns {plat.async.IThenable<U>} A promise that resolves with the input type parameter U.
         */
        public then<U>(onFulfilled?: (value: R) => U | IThenable<U>, onRejected?: (error: any) => U | IThenable<U> | void): Promise<U> {
            // tslint:disable-next-line
            const promise = this;

            const thenPromise = <Promise<U>>new (<any>this).constructor(noop, this);

            if (!isNull(this.__state)) {
                const callbacks = arguments;
                Promise.config.async((): void => {
                    Promise.__invokeCallback(promise.__state, thenPromise, callbacks[promise.__state - 1], promise.__detail);
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
         * @returns {plat.async.IThenable<U>} A promise that resolves with the input type parameter U.
         */
        public catch<U>(onRejected?: (error: any) => U | IThenable<U>): Promise<U> {
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

    /**
     * @name IThenable
     * @memberof plat.async
     * @kind interface
     *
     * @description
     * Describes a chaining function that fulfills when the previous link is complete and is
     * able to be caught in the case of an error.
     *
     * @typeparam {any} R The return type of the thenable.
     */
    export interface IThenable<R> {
        /**
         * @name then
         * @memberof plat.async.IThenable
         * @kind function
         * @access public
         *
         * @description
         * Takes in two methods, called when/if the promise fulfills/rejects.
         *
         * @typeparam {any} U The return type of the returned promise.
         *
         * @param {(success: R) => U} onFulfilled A method called when/if the promise fulfills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param {(error: any) => U} onRejected? A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         *
         * @returns {plat.async.IThenable<U>} A promise that resolves with the input type parameter U.
         */
        then<U>(onFulfilled?: (value: R) => U | IThenable<U>, onRejected?: (error: any) => U | IThenable<U> | void): IThenable<U>;
    }

    enum State {
        PENDING = <any>(void 0),
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

        _window.addEventListener('unload', (): void => {
            observer.disconnect();
            observer = null;
        }, false);

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
     * Describes a function passed into the constructor for a Promise. The function allows you to
     * resolve/reject the Promise.
     */
    export type IResolveFunction<R> = (resolve : (value?: R | IThenable<R>) => void, reject: (error?: any) => void) => void;

    /**
     * The Type for referencing the '_Promise' injectable as a dependency.
     */
    export function IPromise(_window?: any): IPromise {
        if (!isNull(_window.Promise) &&
            isFunction(_window.Promise.all) &&
            isFunction(_window.Promise.race) &&
            isFunction(_window.Promise.resolve) &&
            isFunction(_window.Promise.reject)) {
            return _window.Promise;
        }

        return Promise;
    }

    register.injectable(__Promise, IPromise, [__Window], __CLASS);

    export type IPromise = typeof Promise;
}
//tslint:enable:promise-must-complete
