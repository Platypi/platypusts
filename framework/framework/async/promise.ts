module plat.async {
    /**
     * Adopted from the ES6 promise polyfill: https://github.com/jakearchibald/es6-promise
     * 
     * Takes in 2 generic types corresponding to the fullfilled success and error types. 
     * The error type (U) should extend Error in order to get proper stack tracing.
     */
    export class Promise<T, U extends Error> implements IPromise<T, U> {
        private __subscribers: Array<any>;
        private __state: State;
        private __detail: any;

        static config = {
            /**
             * Handles asynchronous flushing of callbacks. If the callback queue is of 
             * length 1, then we need to schedule a flush. Afterward, any additional 
             * callbacks added to the queue will be flushed accordingly.
             * 
             * @param callback The callback to push to the queue.
             * @param arg The argument to pass to the callback.
             */
            async: function (callback: (arg?: IPromise<any, any>) => void, arg?: IPromise<any, any>) {
                var length = queue.push([callback, arg]);
                if (length === 1) {
                    scheduleFlush();
                }
            }
        };
        
        /**
         * Returns a promise that fulfills when every item in the array is fulfilled.
         * Casts arguments to promises if necessary. The result argument of the 
         * returned promise is an array containing the fulfillment result arguments 
         * in-order. The rejection argument is the rejection argument of the 
         * first-rejected promise.
         * 
         * @param promises An array of promises, although every argument is potentially
         * cast to a promise meaning not every item in the array needs to be a promise.
         * @return {Promise<T, U>} A promise that fulfills when every promise in the array
         * has been fulfilled.
         */
        static all<T, U extends Error>(promises: Array<any>): IPromise<T, U> {
            if (!isArray(promises)) {
                Promise.$Exception.fatal(new TypeError('You must pass an array to all.'), Promise.$Exception.PROMISE);
            }

            return new Promise<T, U>((resolve, reject) => {
                var results = [], remaining = promises.length,
                    promise;

                if (remaining === 0) {
                    resolve(<any>[]);
                }

                function resolver(index) {
                    return (value) => resolveAll(index, value);
                }

                function resolveAll(index, value) {
                    results[index] = value;
                    if (--remaining === 0) {
                        resolve(<any>results);
                    }
                }

                for (var i = 0; i < promises.length; i++) {
                    promise = promises[i];

                    if (promise && isFunction(promise.then)) {
                        promise.then(resolver(i), reject);
                    } else {
                        resolveAll(i, promise);
                    }
                }
            });
        }

        /**
         * Creates a promise that fulfills to the passed in object. If the 
         * passed-in object is a promise it returns the promise.
         * 
         * @param object The object to cast to a Promise.
         */
        static cast<T, U extends Error>(object: T): IPromise<T, U> {
            if (isObject(object) && (<any>object).constructor === Promise) {
                return <Promise<T, U>>(<any>object);
            }

            return new Promise<T, U>((resolve) => resolve(object));
        }

        /**
         * Returns a promise that fulfills as soon as any of the promises fulfill,
         * or rejects as soon as any of the promises reject (whichever happens first).
         * 
         * @param promises An Array of promises to 'race'.
         * @return {Promise<T, U>} A promise that fulfills/rejects when the first promise
         * in promises fulfills/rejects.
         */
        static race<T, U extends Error>(promises: Array<IPromise<T, U>>): IPromise<T, U> {
            if (!isArray(promises)) {
                Promise.$Exception.fatal(new TypeError('You must pass an array to race.'), Promise.$Exception.PROMISE);
            }

            return new Promise<T, U>((resolve, reject) => {
                var results = [], promise;

                for (var i = 0; i < promises.length; i++) {
                    promise = promises[i];

                    if (promise && typeof promise.then === 'function') {
                        promise.then(resolve, reject);
                    } else {
                        resolve(promise);
                    }
                }
            });
        }

        /**
         * Returns a promise that resolves with the input value.
         * 
         * @param value The value to resolve.
         * @return {Promise<T, any>} A promise that resolves with value.
         */
        static resolve<T>(value: T): IPromise<T, any> {
            return new Promise<T, any>((resolve: (value: T) => any, reject: (reason: any) => any) => {
                resolve(value);
            });
        }

        /**
         * Returns a promise that rejects with the input value.
         * 
         * @param value The value to reject.
         * @return {Promise<void, U>} A promise that rejects with value.
         */
        static reject<U extends Error>(reason: U): IPromise<void, U> {
            return new Promise<void, U>((resolve: (value: any) => any, reject: (reason: U) => any) => {
                reject(reason);
            });
        }

        private static $Exception: IExceptionStatic;

        private static __invokeResolveFunction<T, U extends Error >(resolveFunction: IResolveFunction <T, U>,
            promise: IPromise<T, U>) {
            function resolvePromise(value?: any) {
                Promise.__resolve(promise, value);
            }

            function rejectPromise(reason?: any) {
                Promise.__reject(promise, reason);
            }

            try {
                resolveFunction(resolvePromise, rejectPromise);
            } catch (e) {
                rejectPromise(e);
            }
        }

        private static __invokeCallback(settled: State, promise: any, callback: (response: any) => void, detail) {
            var hasCallback = isFunction(callback),
                value, error, succeeded, failed;

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

            if (Promise.__handleThenable<any, any>(promise, value)) {
                return;
            } else if (hasCallback && succeeded) {
                Promise.__resolve<any, any>(promise, value);
            } else if (failed) {
                Promise.__reject<any>(promise, error);
            } else if (settled === State.FULFILLED) {
                Promise.__resolve<any, any>(promise, value);
            } else if (settled === State.REJECTED) {
                Promise.__reject<any>(promise, value);
            }
        }

        private static __publish(promise, settled) {
            var subscribers = promise.__subscribers,
                detail = promise.__detail,
                child, callback;

            for (var i = 0; i < subscribers.length; i += 3) {
                child = subscribers[i];
                callback = subscribers[i + settled];

                Promise.__invokeCallback(settled, child, callback, detail);
            }

            promise.__subscribers = null;
        }

        private static __publishFulfillment(promise: any) {
            Promise.__publish(promise, promise.__state = State.FULFILLED);
        }

        private static __publishRejection(promise: any) {
            Promise.__publish(promise, promise.__state = State.REJECTED);
        }

        private static __reject<U>(promise: any, reason: any) {
            if (promise.__state !== State.PENDING) { return; }
            promise.__state = State.SEALED;
            promise.__detail = reason;

            Promise.config.async(Promise.__publishRejection, promise);
        }

        private static __fulfill<T>(promise: any, value: any) {
            if (promise.__state !== State.PENDING) { return; }
            promise.__state = State.SEALED;
            promise.__detail = value;

            Promise.config.async(Promise.__publishFulfillment, promise);
        }

        private static __resolve<T, U extends Error>(promise: IPromise<T, U>, value: any) {
            if (promise === value) {
                Promise.__fulfill(promise, value);
            } else if (!Promise.__handleThenable<T, U>(promise, value)) {
                Promise.__fulfill(promise, value);
            }
        }

        private static __handleThenable<T, U extends Error>(promise: IPromise<any, any>, value: IPromise<any, any>) {
            var then = null,
                resolved;

            try {
                if (promise === value) {
                    Promise.$Exception.fatal(new TypeError('A promises callback cannot return that same promise.'),
                        Promise.$Exception.PROMISE);
                }

                if (isObject(value) || isFunction(value)) {
                    then = value.then;

                    if (isFunction(then)) {
                        then.call(value, (val) => {
                            if (resolved) {
                                return true;
                            }
                            resolved = true;

                            if (value !== val) {
                                Promise.__resolve<T, U>(promise, val);
                            } else {
                                Promise.__fulfill<T>(promise, val);
                            }
                        }, (val) => {
                            if (resolved) {
                                return true;
                            }
                            resolved = true;

                            Promise.__reject<U>(promise, val);
                        });

                        return true;
                    }
                }
            } catch (error) {
                if (resolved) {
                    return true;
                }
                Promise.__reject<U>(promise, error);
                return true;
            }

            return false;
        }

        private static __subscribe(parent, child: IPromise<any, any>,
            onFulfilled: (success: any) => any, onRejected?: (error: any) => any) {
            var subscribers = parent.__subscribers;
            var length = subscribers.length;

            subscribers[length] = child;
            subscribers[length + State.FULFILLED] = onFulfilled;
            subscribers[length + State.REJECTED] = onRejected;
        }

        /**
         * An ES6 implementation of Promise. Useful for asynchronous programming.
         * 
         * @param resolveFunction A IResolveFunction for fulfilling/rejecting the Promise.
         */
        constructor(resolveFunction: IResolveFunction<T, U>) {
            if (!isFunction(resolveFunction)) {
                Promise.$Exception.fatal(
                    new TypeError('You must pass a resolver function as the first argument to the promise constructor'),
                    Promise.$Exception.PROMISE);
            }

            if (!(this instanceof Promise)) {
                Promise.$Exception.fatal(new TypeError('Failed to construct "Promise": ' +
                    'Please use the "new" operator, this object constructor cannot be called as a function.'),
                    Promise.$Exception.PROMISE);
            }

            this.__subscribers = [];

            Promise.__invokeResolveFunction<T, U>(resolveFunction, this);
        }

        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         * @return {Promise<T, U>} A Promise used for method chaining.
         */
        then<TResult, TError>(onFulfilled: (success: T) => TResult, onRejected?: (error: U) => TError): IPromise<T, U> {
            var promise = this;

            var thenPromise = <IPromise<T, U>>new (<any>this).constructor(() => { }, this);

            if (this.__state) {
                var callbacks = arguments;
                Promise.config.async(() => {
                    Promise.__invokeCallback(promise.__state, thenPromise, callbacks[promise.__state - 1], promise.__detail);
                });
            } else {
                Promise.__subscribe(this, thenPromise, onFulfilled, onRejected);
            }

            return thenPromise;
        }

        /**
         * A wrapper method for Promise.then(undefined, onRejected);
         * 
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         * @return {Promise<T, U>} A Promise used for method chaining.
         */
        catch<TError>(onRejected: (error: U) => TError) {
            return this.then(null, onRejected);
        }
    }

    /**
     * The Type for referencing the '$PromiseStatic' injectable as a dependency.
     */
    export function PromiseStatic($Exception) {
        (<any>Promise).$Exception = $Exception;
        return Promise;
    }

    register.injectable('$PromiseStatic', PromiseStatic, [
        '$ExceptionStatic'
    ], register.injectableType.STATIC);

    enum State {
        PENDING = <any>(void 0),
        SEALED = 0,
        FULFILLED = 1,
        REJECTED = 2
    };


    var browserGlobal: any = (typeof window !== 'undefined') ? window : {};
    var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;

    // node
    function useNextTick() {
        return function processNextTick() {
            process.nextTick(flush);
        };
    }
    
    function useMutationObserver() {
        var observer = new BrowserMutationObserver(flush),
            $document = acquire('$document'),
            $window = acquire('$window'),
            element = $document.createElement('div');

        observer.observe(element, { attributes: true });

        $window.addEventListener('unload', function unloadPromise() {
            observer.disconnect();
            observer = null;
        }, false);

        return function drainQueue() {
            element.setAttribute('drainQueue', 'drainQueue');
        };
    }

    function useSetTimeout() {
        var global: any = global,
            local = (typeof global !== 'undefined') ? global : this;

        return function setFlush() {
            local.setTimeout(flush, 1);
        };
    }

    var queue = [];
    function flush() {
        for (var i = 0; i < queue.length; i++) {
            var tuple = queue[i];
            var callback = tuple[0], arg = tuple[1];
            callback(arg);
        }
        queue = [];
    }

    var process: any = process,
        scheduleFlush;

    // Decide what async method to use to triggering processing of queued callbacks:
    if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
        scheduleFlush = useNextTick();
    } else if (BrowserMutationObserver) {
        scheduleFlush = useMutationObserver();
    } else {
        scheduleFlush = useSetTimeout();
    }

    /**
     * Describes a function passed into the constructor for a Promise. The function allows you to
     * resolve/reject the Promise.
     */
    export interface IResolveFunction<T, U extends Error> {
        /**
         * A function which allows you to resolve/reject a Promise.
         * 
         * @param resolve A method for resolving a Promise. If you pass in a 'thenable' argument 
         * (meaning if you pass in a Promise-like object), then the promise will resolve with the 
         * outcome of the object. Else the promise will resolve with the argument.
         * @param reject A method for rejecting a promise. The argument should be an instancof Error
         * to assist with debugging. If a method in the constructor for a Promise throws an error, 
         * the promise will reject with the error.
         */
        (resolve: (value?: T) => void, reject: (reason?: U) => void): void
    }

    /**
     * Describes an object that implements the ES6 Promise API
     */
    export interface IPromise<T, U extends Error> {
        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         * @return {IPromise<T, U>} An IPromise used for method chaining.
         */
        then<TResult, TError>(onFulfilled: (success: T) => TResult, onRejected?: (error: U) => TError): IPromise<T, U>;

        /**
         * A wrapper method for Promise.then(undefined, onRejected);
         * 
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         * @return {IPromise<T, U>} An IPromise used for method chaining.
         */
        catch<TError>(onRejected: (error: U) => TError): IPromise<T, U>;
    }

    /**
     * The injectable reference for the ES6 Promise implementation.
     */
    export interface IPromiseStatic {
        /**
         * An ES6 implementation of the Promise API. Useful for asynchronous programming.
         * Takes in 2 generic types corresponding to the fullfilled success and error types. 
         * The error type (U) should extend Error in order to get proper stack tracing.
         * 
         * @param resolveFunction A IResolveFunction for fulfilling/rejecting the Promise.
         */
        new <T, U extends Error>(resolveFunction: IResolveFunction<T, U>): IPromise<T, U>;

        /**
         * Returns a promise that fulfills when every item in the array is fulfilled.
         * Casts arguments to promises if necessary. The result argument of the 
         * returned promise is an array containing the fulfillment result arguments 
         * in-order. The rejection argument is the rejection argument of the 
         * first-rejected promise.
         * 
         * @param promises An array of promises, although every argument is potentially
         * cast to a promise meaning not every item in the array needs to be a promise.
         * @return {Promise<T, U>} A promise that fulfills when every promise in the array
         * has been fulfilled.
         */
        all<T, U extends Error>(promises: Array<any>): IPromise<T, U>;

        /**
         * Creates a promise that fulfills to the passed in object. If the
         * passed-in object is a promise it returns the promise.
         *
         * @param object The object to cast to a Promise.
         * @return {Promise<T, U>}
         */
        cast<T, U extends Error>(object: T): IPromise<T, U>;

        /**
         * Returns a promise that fulfills as soon as any of the promises fulfill,
         * or rejects as soon as any of the promises reject (whichever happens first).
         * 
         * @param promises An Array of promises to 'race'.
         * @return {Promise<T, U>} A promise that fulfills/rejects when the first promise
         * in promises fulfills/rejects.
         */
        race<T, U extends Error>(promises: Array<IPromise<T, U>>): IPromise<T, U>;

        /**
         * Returns a promise that resolves with the input value.
         * 
         * @param value The value to resolve.
         * @return {Promise<T, any>} A promise that resolves with value.
         */
        resolve<T>(value: T): IPromise<T, any>;

        /**
         * Returns a promise that rejects with the input value.
         * 
         * @param value The value to reject.
         * @return {Promise<void, U>} A promise that rejects with value.
         */
        reject<U extends Error>(reason: U): IPromise<void, U>;
    }
}
