module plat.async {
    /**
     * Adopted from the ES6 promise polyfill: https://github.com/jakearchibald/es6-promise
     * 
     * Takes in a generic typs corresponding to the fullfilled success type. 
     */
    export class Promise<R> implements IThenable<R> {
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
            async: (callback: (arg?: IThenable<any>) => void, arg?: IThenable<any>) => {
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
         */
        static all<R>(promises: Array<IThenable<R>>): IThenable<Array<R>>;
        /**
         * Returns a promise that fulfills when every item in the array is fulfilled.
         * Casts arguments to promises if necessary. The result argument of the 
         * returned promise is an array containing the fulfillment result arguments 
         * in-order. The rejection argument is the rejection argument of the 
         * first-rejected promise.
         * 
         * @param promises An array of objects, if an object is not a promise, it will be cast.
         */
        static all<R>(promises: Array<R>): IThenable<Array<R>>;
        static all(promises: Array<any>): IThenable<Array<any>> {
            if (!isArray(promises)) {
                var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                $exception.fatal(new TypeError('You must pass an array to all.'), $exception.PROMISE);
            }

            return new Promise<Array<any>>((resolve: (value?: Array<any>) => void, reject: (reason?: any) => void) => {
                var results: Array<any> = [],
                    remaining = promises.length,
                    promise: Promise<any>;

                if (remaining === 0) {
                    resolve(<any>[]);
                }

                function resolver(index: number) {
                    return (value: any) => resolveAll(index, value);
                }

                function resolveAll(index: number, value: any) {
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
        static cast<R>(object?: R): Promise<R> {
            if (isObject(object) && (<any>object).constructor === Promise) {
                return <Promise<R>>(<any>object);
            }

            return new Promise<R>((resolve: (value: R) => any) => resolve(object));
        }

        /**
         * Returns a promise that fulfills as soon as any of the promises fulfill,
         * or rejects as soon as any of the promises reject (whichever happens first).
         * 
         * @param promises An Array of promises to 'race'.
         */
        static race<R>(promises: Array<IThenable<R>>): IThenable<R>;
        /**
         * Returns a promise that fulfills as soon as any of the promises fulfill,
         * or rejects as soon as any of the promises reject (whichever happens first).
         * 
         * @param promises An Array of anything to 'race'. Objects that aren't promises will
         * be cast.
         */
        static race<R>(promises: Array<R>): IThenable<R>;
        static race(promises: Array<any>): IThenable<any> {
            if (!isArray(promises)) {
                var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                $exception.fatal(new TypeError('You must pass an array to race.'), $exception.PROMISE);
            }

            return new Promise<any>((resolve: (value: any) => any, reject: (error: any) => any) => {
                var results: Array<any> = [],
                    promise: Promise<any>;

                for (var i = 0; i < promises.length; i++) {
                    promise = promises[i];

                    if (promise && typeof promise.then === 'function') {
                        promise.then(resolve, reject);
                    } else {
                        resolve(<any>promise);
                    }
                }
            });
        }

        /**
         * Returns a promise that resolves with the input value.
         * 
         * @param value The value to resolve.
         */
        static resolve<R>(value?: R): IThenable<R> {
            return new Promise<R>((resolve: (value: R) => any, reject: (reason: any) => any) => {
                resolve(value);
            });
        }

        /**
         * Returns a promise that rejects with the input value.
         * 
         * @param value The value to reject.
         */
        static reject(error?: any): IThenable<void> {
            return new Promise<void>((resolve: (value: any) => any, reject: (error: any) => any) => {
                reject(error);
            });
        }

        private static __invokeResolveFunction<R>(resolveFunction: IResolveFunction<R>,
            promise: Promise<R>): void {
            function resolvePromise(value?: any) {
                Promise.__resolve<R>(promise, value);
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

        private static __invokeCallback(settled: State, promise: any, callback: (response: any) => void, detail: any): void {
            var hasCallback = isFunction(callback),
                value: any,
                error: Error,
                succeeded: boolean,
                failed: boolean;

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

        private static __publish(promise: Promise<any>, settled: State): void {
            var subscribers = promise.__subscribers,
                detail = promise.__detail,
                child: any,
                callback: () => void;

            for (var i = 0; i < subscribers.length; i += 3) {
                child = subscribers[i];
                callback = subscribers[i + settled];

                Promise.__invokeCallback(settled, child, callback, detail);
            }

            promise.__subscribers = null;
        }

        private static __publishFulfillment(promise: any): void {
            Promise.__publish(promise, promise.__state = State.FULFILLED);
        }

        private static __publishRejection(promise: any): void {
            Promise.__publish(promise, promise.__state = State.REJECTED);
        }

        private static __reject(promise: any, reason: any): void {
            if (promise.__state !== State.PENDING) {
                return;
            }
            promise.__state = State.SEALED;
            promise.__detail = reason;

            Promise.config.async(Promise.__publishRejection, promise);
        }

        private static __fulfill<T>(promise: any, value: any): void {
            if (promise.__state !== State.PENDING) {
                return;
            }
            promise.__state = State.SEALED;
            promise.__detail = value;

            Promise.config.async(Promise.__publishFulfillment, promise);
        }

        private static __resolve<R>(promise: Promise<R>, value: any): void {
            if (promise === value) {
                Promise.__fulfill(promise, value);
            } else if (!Promise.__handleThenable<R>(promise, value)) {
                Promise.__fulfill(promise, value);
            }
        }

        private static __handleThenable<R>(promise: Promise<any>, value: Promise<any>): boolean {
            var then: typeof Promise.prototype.then = null,
                resolved: boolean;

            try {
                if (promise === value) {
                    var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                    $exception.fatal(new TypeError('A promises callback cannot return that same promise.'),
                        $exception.PROMISE);
                }

                if (isObject(value) || isFunction(value)) {
                    then = value.then;

                    if (isFunction(then)) {
                        then.call(value, (val: any) => {
                            if (resolved) {
                                return true;
                            }
                            resolved = true;

                            if (value !== val) {
                                Promise.__resolve<R>(promise, val);
                            } else {
                                Promise.__fulfill<R>(promise, val);
                            }
                        }, (val: any) => {
                            if (resolved) {
                                return true;
                            }
                            resolved = true;

                            Promise.__reject(promise, val);
                        });

                        return true;
                    }
                }
            } catch (error) {
                if (resolved) {
                    return true;
                }
                Promise.__reject(promise, error);
                return true;
            }

            return false;
        }

        private static __subscribe(parent: Promise<any>, child: IThenable<any>,
            onFulfilled: (success: any) => any, onRejected?: (error: any) => any): void {
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
        constructor(resolveFunction: IResolveFunction<R>) {
            var $exception: IExceptionStatic;
            if (!isFunction(resolveFunction)) {
                $exception = acquire(__ExceptionStatic);
                $exception.fatal(new TypeError('You must pass a resolver function as the first argument to the promise constructor'),
                    $exception.PROMISE);
            }

            if (!(this instanceof Promise)) {
                $exception = acquire(__ExceptionStatic);
                $exception.fatal(new TypeError('Failed to construct "Promise": ' +
                    'Please use the "new" operator, this object constructor cannot be called as a function.'),
                    $exception.PROMISE);
            }

            this.__subscribers = [];

            Promise.__invokeResolveFunction<R>(resolveFunction, this);
        }

        then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => IThenable<U>): IThenable<U>;
        then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => U): IThenable<U>;
        then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => IThenable<U>): IThenable<U>;
        then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => U): IThenable<U>;
        then<U>(onFulfilled: (success: R) => any, onRejected?: (error: any) => any): IThenable<U> {
            var promise = this;
            
            var thenPromise = <IThenable<U>>new (<any>this).constructor(() => { }, this);

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

        catch<U>(onRejected: (error: any) => IThenable<U>): IThenable<U>;
        catch<U>(onRejected: (error: any) => U): IThenable<U>;
        catch<U>(onRejected: (error: any) => any): IThenable<U> {
            return this.then(null, onRejected);
        }
    }

    export interface IThenable<R> {
        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => IThenable<U>): IThenable<U>;
        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => U): IThenable<U>;
        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => IThenable<U>): IThenable<U>;
        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => U): IThenable<U>;

        /**
         * A wrapper method for Promise.then(undefined, onRejected);
         * 
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        catch<U>(onRejected: (error: any) => IThenable<U>): IThenable<U>;
        /**
         * A wrapper method for Promise.then(undefined, onRejected);
         * 
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        catch<U>(onRejected: (error: any) => U): IThenable<U>;
    }

    enum State {
        PENDING = <any>(void 0),
        SEALED = 0,
        FULFILLED = 1,
        REJECTED = 2
    };

    var browserGlobal: any = (typeof window !== 'undefined') ? window : {},
        BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;

    // node
    function useNextTick(): () => void {
        return () => {
            process.nextTick(flush);
        };
    }
    
    function useMutationObserver(): () => void {
        var observer = new BrowserMutationObserver(flush),
            $document = acquire(__Document),
            $window = acquire(__Window),
            element = $document.createElement('div');

        observer.observe(element, { attributes: true });

        $window.addEventListener('unload', () => {
            observer.disconnect();
            observer = null;
        }, false);

        return () => {
            element.setAttribute('drainQueue', 'drainQueue');
        };
    }

    function useSetTimeout(): () => void {
        var global: any = global,
            local = (typeof global !== 'undefined') ? global : this;

        return () => {
            local.setTimeout(flush, 1);
        };
    }

    var queue: Array<any> = [];
    function flush(): void {
        var tuple: Array<(response: any) => void>,
            callback: (response: any) => void,
            arg: any;

        for (var i = 0; i < queue.length; i++) {
            tuple = queue[i];
            callback = tuple[0];
            arg = tuple[1];
            callback(arg);
        }
        queue = [];
    }

    var process: any = process,
        scheduleFlush: () => void;

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
    export interface IResolveFunction<R> {
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
        (resolve: (value?: R) => void, reject: (reason?: any) => void): void;
    }

    /**
     * The Type for referencing the '$Promise' injectable as a dependency.
     */
    export function IPromise($Window?: any): IPromise {
        if (!isNull($Window.Promise) &&
            isFunction($Window.Promise.all) &&
            isFunction($Window.Promise.cast) &&
            isFunction($Window.Promise.race) &&
            isFunction($Window.Promise.resolve) &&
            isFunction($Window.Promise.reject)) {
            return $Window.Promise;
        }
        return Promise;
    }

    register.injectable(__Promise, IPromise, [__Window], register.CLASS);

    /**
     * The injectable reference for the ES6 Promise implementation.
     */
    export interface IPromise {
        /**
         * An ES6 implementation of the Promise API. Useful for asynchronous programming.
         * Takes in 2 generic types corresponding to the fullfilled success and error types. 
         * The error type (U) should extend Error in order to get proper stack tracing.
         * 
         * @param resolveFunction A IResolveFunction for fulfilling/rejecting the Promise.
         */
        new <R>(resolveFunction: IResolveFunction<R>): IThenable<R>;

        /**
         * Returns a promise that fulfills when every item in the array is fulfilled.
         * Casts arguments to promises if necessary. The result argument of the
         * returned promise is an array containing the fulfillment result arguments
         * in-order. The rejection argument is the rejection argument of the
         * first-rejected promise.
         *
         * @param promises An array of promises, although every argument is potentially
         * cast to a promise meaning not every item in the array needs to be a promise.
         */
        all<R>(promises: Array<IThenable<R>>): IThenable<Array<R>>;
        /**
         * Returns a promise that fulfills when every item in the array is fulfilled.
         * Casts arguments to promises if necessary. The result argument of the
         * returned promise is an array containing the fulfillment result arguments
         * in-order. The rejection argument is the rejection argument of the
         * first-rejected promise.
         *
         * @param promises An array of objects, if an object is not a promise, it will be cast.
         */
        all<R>(promises: Array<R>): IThenable<Array<R>>;

        /**
         * Creates a promise that fulfills to the passed in object. If the
         * passed-in object is a promise it returns the promise.
         *
         * @param object The object to cast to a Promise.
         */
        cast<R>(object?: R): IThenable<R>;

        /**
         * Returns a promise that fulfills as soon as any of the promises fulfill,
         * or rejects as soon as any of the promises reject (whichever happens first).
         *
         * @param promises An Array of promises to 'race'.
         */
        race<R>(promises: Array<IThenable<R>>): IThenable<R>;
        /**
         * Returns a promise that fulfills as soon as any of the promises fulfill,
         * or rejects as soon as any of the promises reject (whichever happens first).
         *
         * @param promises An Array of anything to 'race'. Objects that aren't promises will
         * be cast.
         */
        race<R>(promises: Array<R>): IThenable<R>;

        /**
         * Returns a promise that resolves with the input value.
         * 
         * @param value The value to resolve.
         */
        resolve<R>(value: R): IThenable<R>;

        /**
         * Returns a promise that rejects with the input value.
         * 
         * @param value The value to reject.
         */
        reject(error: any): IThenable<void>;
    }
}
