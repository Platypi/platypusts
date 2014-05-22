module plat.async {
    /**
     * HttpRequest provides a wrapper for the XmlHttpRequest object. Allows for
     * sending AJAX requests to a server. This class does not support 
     * synchronous requests.
     */
    class HttpRequest implements IHttpRequest {
        /**
         * The timeout ID associated with the specified timeout
         */
        clearTimeout: () => void;
        /**
         * The created XMLHttpRequest
         */
        xhr: XMLHttpRequest;
        /**
         * The JSONP callback name
         */
        jsonpCallback: string;

        /**
         * The plat.IBrowser injectable instance
         */
        $browser: web.IBrowser = acquire('$browser');
        /**
         * The injectable instance of type Window
         */
        $window: Window = acquire('$window');
        /**
         * The injectable instance of type Document
         */
        $document: Document = acquire('$document');
        /**
         * The configuration for an HTTP Request
         */
        $config: IHttpConfigStatic = acquire('$http.config');

        private __fileSupported = (<ICompat>acquire('$compat')).fileSupported;
        private __options: IHttpConfigStatic;

        /**
         * @param options The IHttpConfigStatic used to customize this HttpRequest.
         */
        constructor(options: IHttpConfigStatic) {
            this.__options = extend({}, this.$config, options);
        }

        /**
         * Performs either the XmlHttpRequest or the JSONP callback and returns an AjaxPromise. 
         * The Promise is fulfilled or rejected when either the XmlHttpRequest returns or the 
         * JSONP callback is fired.
         *
         * @return {AjaxPromise} A promise that fulfills/rejects
         * when either the XmlHttpRequest returns (Response statuses >= 200 and < 300 are a success.
         * Other response statuses are failures) or the JSONP callback is fired.
         */
        execute<R>(): IAjaxPromise<R> {
            var options = this.__options,
                url = options.url;

            if (!isString(url) || isEmpty(url.trim())) {
                return this._invalidOptions();
            }

            options.url = this.$browser.urlUtils(url).toString();

            var isCrossDomain = options.isCrossDomain || false,
                xDomain = false,
                xhr: XMLHttpRequest;

            // check if forced cross domain call or cors is not supported (IE9)
            if (isCrossDomain) {
                xDomain = true;
            } else {
                xhr = this.xhr = new XMLHttpRequest();
                if (isUndefined(xhr.withCredentials)) {
                    xDomain = this.$browser.isCrossDomain(url);
                }
            }

            if (xDomain) {
                this.xhr = null;
                this.jsonpCallback = options.jsonpCallback || uniqueId('plat_callback');
                return this.executeJsonp();
            }

            return this._sendXhrRequest(xhr);
        }

        /**
         * Adds the script tag and processes the callback for the JSONP and returns a 
         * Promise. The Promise is fulfilled or rejected when the JSONP callback is called.
         *
         * @return {Promise<IAjaxResponse>} A promise that fulfills with the 
         * JSONP callback and rejects if there is a problem.
         */
        executeJsonp<R>(): IAjaxPromise<R> {
            var options = this.__options,
                url = options.url;

            if (!isString(url) || isEmpty(url.trim())) {
                return this._invalidOptions();
            }

            options.url = this.$browser.urlUtils(url).toString();
            if (isNull(this.jsonpCallback)) {
                this.jsonpCallback = options.jsonpCallback || uniqueId('plat_callback');
            }

            return new AjaxPromise((resolve, reject) => {
                var $window = <any>this.$window,
                    $document = this.$document,
                    scriptTag = $document.createElement('script'),
                    jsonpCallback = this.jsonpCallback,
                    jsonpIdentifier = options.jsonpIdentifier || 'callback';

                scriptTag.src = url + '?' + jsonpIdentifier + '=' + jsonpCallback;

                var oldValue = $window[jsonpCallback];
                $window[jsonpCallback] = (response: any) => {
                    //clean up
                    if (isFunction(this.clearTimeout)) {
                        this.clearTimeout();
                    }

                    $document.head.removeChild(scriptTag);
                    if (!isUndefined(oldValue)) {
                        $window[jsonpCallback] = oldValue;
                    } else {
                        delete $window[jsonpCallback];
                    }

                    //call callback
                    resolve({
                        response: response,
                        status: 200 // OK
                    });
                };

                $document.head.appendChild(scriptTag);

                var timeout = options.timeout;
                if (isNumber(timeout) && timeout > 0) {
                    // We first postpone to avoid always timing out when debugging, though this is not
                    // a foolproof method.
                    this.clearTimeout = postpone(() => {
                        this.clearTimeout = defer(() => {
                            reject(new AjaxError({
                                response: 'Request timed out in ' + timeout + 'ms for ' + url,
                                status: 408 // Request Timeout
                            }));
                            $window[jsonpCallback] = noop;
                        }, timeout - 1);
                    });
                }
            }, { __http: this });
        }

        /**
         * A wrapper for the XMLHttpRequest's onReadyStateChanged callback.
         *
         * @param {XMLHttpRequest} The associated XMLHttpRequest
         * @return {bool} Waits for the readyState to be complete and then 
         * return true in the case of a success and false in the case of 
         * an error.
         */
        _xhrOnReadyStateChange(xhr: XMLHttpRequest): boolean {
            if (xhr.readyState === 4) {
                var status = xhr.status,
                    response = xhr.response || xhr.responseText;

                if (status === 0) {
                    // file protocol issue **Needs to be tested more thoroughly**
                    // OK if response is not empty, Not Found otherwise
                    if (!isEmpty(response)) {
                        return true;
                    }

                    return false;
                }

                // 304 is not modified
                if ((status >= 200 && status < 300) || status === 304) {
                    return true;
                } else {
                    return false;
                }
            } else {
                // TODO: add progress for xhr if we choose to add progress to AjaxPromise
            }
        }

        /**
         * The function that initializes and sends the XMLHttpRequest.
         *
         * @param {XMLHttpRequest} The associated XMLHttpRequest
         * @return {Promise<IAjaxResponse>} A promise that fulfills with the 
         * formatted IAjaxResponse and rejects if there is a problem with an 
         * IAjaxError.
         */
        _sendXhrRequest(xhr: XMLHttpRequest): IAjaxPromise<any> {
            var options = this.__options,
                method = options.method,
                url = options.url;

            return new AjaxPromise((resolve, reject) => {
                xhr.onreadystatechange = () => {
                    var success = this._xhrOnReadyStateChange(xhr);

                    if (isNull(success)) {
                        return;
                    }

                    var response = this._formatResponse(xhr, options.responseType, success);

                    if (success) {
                        resolve(response);
                    } else {
                        reject(new AjaxError(response));
                    }

                    this.xhr = options = null;
                };

                if (!isString(method)) {
                    var Exception: IExceptionStatic = acquire('$ExceptionStatic');
                    Exception.warn('AjaxOptions method was not of type string. Defaulting to "GET".', Exception.AJAX);
                    method = 'GET';
                }

                xhr.open(
                    method.toUpperCase(),
                    url,
                    true, // synchronous XHR not supported
                    options.user,
                    options.password
                    );

                xhr.responseType = options.responseType;
                xhr.withCredentials = options.withCredentials;

                var data = options.data;
                if (isNull(data) || data === '') {
                    this.__setHeaders(options.headers, xhr);
                    xhr.send();
                } else {
                    // Set the Content-Type header if data is being sent
                    xhr.setRequestHeader('Content-Type', contentType);
                    this.__setHeaders(options.headers, xhr);

                    var transforms = options.transforms || [],
                        contentType = options.contentType;

                    length = transforms.length;

                    if (length > 0) {
                        for (var i = 0; i < length; ++i) {
                            data = transforms[i](data, xhr);
                        }

                        xhr.send(data);
                    } else if (isObject(data)) {
                        if (contentType && contentType.indexOf('x-www-form-urlencoded') !== -1) {
                            if (this.__fileSupported) {
                                data = this.__appendFormData(data);
                                xhr.send(data);
                            } else {
                                this.__submitFramedFormData(url, data).then((response) => {
                                    resolve(response);
                                }, () => {
                                    this.xhr = null;
                                });
                            }
                        } else {
                            data = JSON.stringify(data);
                            xhr.send(data);
                        }
                    } else {
                        xhr.send(data);
                    }
                }

                var timeout = options.timeout;
                if (isNumber(timeout) && timeout > 0) {
                    // We first postpone to avoid always timing out when debugging, though this is not
                    // a foolproof method.
                    this.clearTimeout = postpone(() => {
                        this.clearTimeout = defer(() => {
                            reject(new AjaxError({
                                response: 'Request timed out in ' + timeout + 'ms for ' + options.url,
                                status: xhr.status,
                                getAllResponseHeaders: xhr.getAllResponseHeaders,
                                xhr: xhr
                            }));

                            xhr.onreadystatechange = null;
                            xhr.abort();
                            this.xhr = null;
                        }, timeout - 1);
                    });
                }
            }, { __http: this });
        }
        
        /**
         * Returns a promise that is immediately rejected due to an error.
         *
         * @return {Promise<IAjaxResponse>} A promise that immediately rejects 
         * with an IAjaxError
         */
        _invalidOptions(): IAjaxPromise<any> {
            return new AjaxPromise((resolve, reject) => {
                var exceptionFactory: IExceptionStatic = acquire('$ExceptionStatic');
                exceptionFactory.warn('Attempting a request without specifying a url', exceptionFactory.AJAX);
                reject(new AjaxError({
                    response: 'Attempting a request without specifying a url',
                    status: null,
                    getAllResponseHeaders: null,
                    xhr: null
                }));
            });
        }
        
        /**
         * The function that formats the response from the XMLHttpRequest
         *
         * @param {XMLHttpRequest} The associated XMLHttpRequest
         * @param {bool} Signifies if the response was a success
         * @return {IAjaxResponse} The IAjaxResponse to be returned to 
         * the requester.
         */
        _formatResponse(xhr: XMLHttpRequest, responseType: string, success: boolean): IAjaxResponse<any> {
            var status = xhr.status,
                response = xhr.response || xhr.responseText;

            if (status === 0) {
                // file protocol issue **Needs to be tested more thoroughly**
                // OK if response empty, Not Found otherwise
                status = success ? 200 : 404;
            }

            xhr.onreadystatechange = null;

            if (isFunction(this.clearTimeout)) {
                this.clearTimeout();
            }

            if (responseType === 'json' && isString(response)) {
                try {
                    response = JSON.parse(response);
                } catch (e) { }
            }

            return {
                response: response,
                status: status,
                getAllResponseHeaders: xhr.getAllResponseHeaders,
                xhr: xhr
            };
        }

        private __setHeaders(headers: any, xhr: XMLHttpRequest) {
            var keys = Object.keys(headers || {}),
                length = keys.length,
                key: string,
                i: number;

            for (i = 0; i < length; ++i) {
                key = keys[i];
                xhr.setRequestHeader(key, headers[key]);
            }
        }
        private __appendFormData(data: any): FormData {
            var formData = new FormData(),
                keys = Object.keys(data),
                key: string,
                val: any;

            while (keys.length > 0) {
                key = keys.pop();
                val = data[key];

                isObject(val) ?
                formData.append(key, val, val.name || val.fileName || 'blob') :
                formData.append(key, val);
            }

            return formData;
        }
        private __submitFramedFormData(url: string, data: any): IThenable<IAjaxResponse<any>> {
            var $document = this.$document,
                Promise: IPromiseStatic = acquire('$PromiseStatic'),
                form = $document.createElement('form'),
                iframe = $document.createElement('iframe'),
                iframeName = uniqueId('iframe_target'),
                input: HTMLInputElement,
                keys = Object.keys(data),
                key: string,
                val: any;

            iframe.name = form.target = iframeName;
            form.enctype = form.encoding = 'multipart/form-data';
            form.action = url;
            form.method = 'POST';
            form.style.display = 'none';

            while (keys.length > 0) {
                key = keys.pop();
                val = data[key];
                input = $document.createElement('input');
                input.type = 'hidden';
                input.name = key;

                if (isNull(val)) {
                    input.value = '';
                } else if (isObject(val)) {
                    if (!(isUndefined(val.value) || isUndefined(val.name))) {
                        input.value = val.value;
                    } else {
                        // may throw a fatal error but this is an invalid case anyway
                        var $exception: IExceptionStatic = acquire('$ExceptionStatic');
                        $exception.warn('Invalid form entry with key "' + key + '" and value "' + val, $exception.AJAX);
                        input.value = JSON.stringify(val);
                    }
                } else {
                    input.value = val;
                }

                form.insertBefore(input, null);
            }

            return new Promise<IAjaxResponse<any>>((resolve, reject) => {
                iframe.onload = () => {
                    var content = iframe.contentDocument.body.innerHTML;

                    $document.body.removeChild(form);

                    resolve({
                        response: content,
                        status: 200,
                        getAllResponseHeaders: () => ''
                    });

                    this.xhr = iframe.onload = null;
                };

                this.xhr.abort = () => {
                    iframe.onload = null;
                    iframe.src = 'javascript:false;';
                    $document.body.removeChild(form);
                    reject();
                };

                form.insertBefore(iframe, null);
                $document.body.insertBefore(form, null);
                form.submit();
            });
        }
    }

    /**
     * Describes an object that provides a wrapper for either the XmlHttpRequest object 
     * or a JSONP callback. Allows for sending AJAX requests to a server.
     */
    interface IHttpRequest {
        /**
         * Performs either the XmlHttpRequest or the JSONP callback and returns an AjaxPromise. 
         * The Promise is fulfilled or rejected when either the XmlHttpRequest returns or the 
         * JSONP callback is fired.
         *
         * @return {IAjaxPromise} A promise that fulfills/rejects
         * when either the XmlHttpRequest returns (Response statuses >= 200 and < 300 are a success.
         * Other response statuses are failures) or the JSONP callback is fired.
         */
        execute<R>(): IAjaxPromise<R>;

        /**
         * Adds the script tag and processes the callback for the JSONP. The AjaxPromise from 
         * the ajax or jsonp call is fulfilled or rejected when the JSONP callback is called.
         *
         * @return {IAjaxPromise} A promise that fulfills with the 
         * JSONP callback and rejects if there is a problem.
         */
        executeJsonp<R>(): IAjaxPromise<R>;
    }

    /**
     * Describes an object which contains Ajax configuration properties.
     */
    export interface IHttpConfigStatic extends IJsonpConfigStatic {
        /**
         * The HTTP method type of XmlHttpRequest such as 'GET', 'POST', 'PUT', 
         * 'DELETE', etc. Ignored for non-HTTP urls. Defaults to 'GET'.
         */
        method?: string;

        /**
         * The number of milliseconds a request can take before 
         * automatically being terminated. A value of 0 
         * means there is no timeout. 
         */
        timeout?: number;

        /**
         * An optional user string for the XmlHttpRequest
         */
        user?: string;

        /**
         * An optional password string for the XmlHttpRequest
         */
        password?: string;

        /**
         * The XMLHttpRequestResponseType. The response should 
         * still be checked when received due to browser 
         * incompatibilities. If a browser does not support a 
         * response type it will return the value as a string. 
         * The response type does not affect JSONP callback 
         * arguments.
         * 
         * @see config.XMLHttpRequestResponseType
         */
        responseType?: string;

        /**
         * The Content-Type header for XMLHttpRequest when 
         * data is being sent. The default is 
         * 'application/json;charset=utf-8;'.
         */
        contentType?: string;

        /**
         * A key/value pair object where the key is a DOMString header key
         * and the value is the DOMString header value.
         */
        headers?: any;

        /**
         * Indicates whether or not cross-site Access-Control requests 
         * should be made using credentials such as cookies or 
         * authorization headers. The default is false.
         */
        withCredentials?: boolean;

        /**
         * The request payload
         */
        data?: any;

        /**
         * Forces a JSONP, cross-domain request when set to true.
         * The default is false.
         */
        isCrossDomain?: boolean;
    }

    /**
     * Describes an object which contains JSONP configuration properties.
     */
    export interface IJsonpConfigStatic {
        /**
         * The url for the JSONP callback 
         * (without the ?{callback}={callback_name} parameter in the url)
         */
        url: string;

        /**
         * The identifier the server uses to get the name of the JSONP
         * callback. The default is 'callback' as seen in 
         * http://www.platyfi.com/data?callback=plat_fnName.
         */
        jsonpIdentifier?: string;

        /**
         * A specified name for the JSONP callback (in case the server has 
         * it hardcoded and/or does not get it from the given url). The 
         * default is a unique plat id generated separately for 
         * each JSONP callback seen as 'plat_callback00' in
         * http://www.platyfi.com/data?callback=plat_callback00.
         */
        jsonpCallback?: string;

        /**
         * An array of data transform functions that fire in order and consecutively 
         * pass the returned result from one function to the next.
         */
        transforms?: Array<(data: any, xhr: XMLHttpRequest) => any>;
    }

    /**
     * Describes an object that is the response to an AJAX request.
     */
    export interface IAjaxResponse<R> {
        /**
         * The AJAX response or responseText. The response should 
         * be checked when received due to browser 
         * incompatibilities with responseType. If a browser does 
         * not support a response type it will return the value as 
         * a string.
         */
        response: R;

        /**
         * The XHR status. Resolves as 200 for JSONP.
         */
        status: number;

        /**
         * A method for getting the XHR response headers.
         */
        getAllResponseHeaders?: () => string;

        /**
         * The XMLHttpRequest object associated with the AJAX call
         */
        xhr?: XMLHttpRequest;
    }

    /**
     * Describes the AjaxPromise's resolve function
     */
    export interface IAjaxResolveFunction<R> {
        (resolve: (value?: IAjaxResponse<R>) => any, reject: (reason?: IAjaxError) => any): void;
    }

    /**
     * A class that forms an Error object with an IAjaxResponse.
     */
    class AjaxError implements IAjaxError {
        name: string = 'AjaxError';
        message: string;
        response: any;
        status: number;
        getAllResponseHeaders: () => string;
        xhr: XMLHttpRequest;

        constructor(response: IAjaxResponse<any>) {
            Error.apply(this);
            this.response = this.message = response.response;
            this.status = response.status;
            this.getAllResponseHeaders = response.getAllResponseHeaders;
            this.xhr = response.xhr;
        }

        toString(): string {
            var response = this.response,
                responseText = response;

            if (isObject(response) && !response.hasOwnProperty('toString')) {
                responseText = JSON.stringify(response);
            }

            return 'Request failed with status: ' + this.status + ' and response: ' + responseText;
        }
    }

    // Have to bypass TS flags in order to properly extend Error
    (<any>AjaxError).prototype = Error.prototype;

    /**
     * Describes an object that forms an Error object with an IAjaxResponse.
     */
    export interface IAjaxError extends Error, IAjaxResponse<any> { }

    /**
     * Describes a type of Promise that fulfills with an IAjaxResponse and can be optionally canceled.
     */
    export class AjaxPromise<R> extends Promise<IAjaxResponse<R>>
        implements IAjaxPromise<R> {
        $window: Window = acquire('$window');
        private __http: HttpRequest;
        constructor(resolveFunction: IAjaxResolveFunction<R>, promise?: any) {
            super(resolveFunction);
            if (!isNull(promise)) {
                this.__http = promise.__http;
            }
        }

        /**
         * A method to cancel the AJAX call associated with this AjaxPromise.
         */
        cancel(): void {
            var http = this.__http,
                xhr = http.xhr,
                jsonpCallback = http.jsonpCallback;

            if (isFunction(http.clearTimeout)) {
                http.clearTimeout();
            }

            if (!isNull(xhr)) {
                xhr.onreadystatechange = null;
                xhr.abort();
                http.xhr = null;
            } else if (!isNull(jsonpCallback)) {
                (<any>this.$window)[jsonpCallback] = noop;
            }

            (<any>this).__subscribers = [];
        }

        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => U,
            onRejected?: (error: IAjaxError) => any): IThenable<U>;
        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => IThenable<U>,
            onRejected?: (error: IAjaxError) => IThenable<U>): IThenable<U>;
        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => IThenable<U>,
            onRejected?: (error: IAjaxError) => any): IThenable<U>;
        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => U,
            onRejected?: (error: IAjaxError) => IThenable<U>): IThenable<U>;
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => U,
            onRejected?: (error: IAjaxError) => any): IThenable<U> {
            return super.then<U>(onFulfilled, onRejected);
        }
    }

    /**
     * Describes a type of IPromise that fulfills with an IAjaxResponse and can be optionally canceled.
     */
    export interface IAjaxPromise<R> extends IThenable<IAjaxResponse<R>> {
        /**
         * A method to cancel the AJAX call associated with this AjaxPromise.
         */
        cancel(): void;
        
        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => U,
            onRejected?: (error: IAjaxError) => any): IThenable<U>;
        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => IThenable<U>,
            onRejected?: (error: IAjaxError) => IThenable<U>): IThenable<U>;
        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => IThenable<U>,
            onRejected?: (error: IAjaxError) => any): IThenable<U>;
        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => U,
            onRejected?: (error: IAjaxError) => IThenable<U>): IThenable<U>;
    }

    /**
     * Describes an object that provides value mappings for
     * XMLHttpRequestResponseTypes
     */
    export interface IHttpResponseType {
        /**
         * The default response type (empty string)
         */
        DEFAULT: string;

        /**
         * The arrayBuffer type ('arrayBuffer')
         */
        ARRAYBUFFER: string;

        /**
         * The blob type ('blob')
         */
        BLOB: string;

        /**
         * The document type ('document')
         */
        DOCUMENT: string;

        /**
         * The json type ('json')
         */
        JSON: string;

        /**
         * The text type ('text')
         */
        TEXT: string;
    }

    /**
     * Describes the interface for the Ajax injectable for making both 
     * XMLHttpRequests and JSONP requests.
     */
    export interface IHttp {
        /**
         * Describes an object that provides value mappings for
         * XMLHttpRequestResponseTypes
         */
        responseType: IHttpResponseType;

        /**
         * A wrapper method for the Http class that creates and executes a new Http with
         * the specified IAjaxOptions. This function will check if 
         * XMLHttpRequest level 2 is present, and will default to JSONP if it isn't and 
         * the request is cross-domain.
         * 
         * @param options The IAjaxOptions for either the XMLHttpRequest 
         * or the JSONP callback.
         * @return {AjaxPromise} A promise, when fulfilled
         * or rejected, will return an IAjaxResponse object.
         */
        ajax<R>(options: IHttpConfigStatic): IAjaxPromise<R>;

        /**
         * A direct method to force a cross-domain JSONP request.
         * 
         * @param options The IJsonpOptions 
         * @return {AjaxPromise} A promise, when fulfilled
         * or rejected, will return an IAjaxResponse object.
         */
        jsonp? <R>(options: IJsonpConfigStatic): IAjaxPromise<R>;

        /**
         * Makes an ajax request, specifying responseType: 
         * 'json'.
         * 
         * @param options The IAjaxOptions for either the XMLHttpRequest 
         * or the JSONP callback.
         * @return {AjaxPromise} A promise, when fulfilled or rejected, 
         * will return an IAjaxResponse object, with the response being a parsed 
         * JSON object (assuming valid JSON).
         */
        json? <R>(options: IHttpConfigStatic): IAjaxPromise<R>;
    }

    /**
     * The instantiated class of the injectable for making 
     * AJAX requests.
     */
    export class Http implements IHttp {
        /**
         * Default Http config
         */
        static config: IHttpConfigStatic = {
            url: null,
            method: 'GET',
            responseType: '',
            transforms: [],
            headers: {},
            withCredentials: false,
            timeout: null,
            jsonpIdentifier: 'callback',
            contentType: 'application/json;charset=utf-8;'
        };

        /**
         * HttpResponseType mapping
         */
        responseType: IHttpResponseType = {
            DEFAULT: '',
            ARRAYBUFFER: 'arraybuffer',
            BLOB: 'blob',
            DOCUMENT: 'document',
            JSON: 'json',
            TEXT: 'text'
        };

        /**
         * A wrapper method for the Http class that creates and executes a new Http with
         * the specified IAjaxOptions. This function will check if 
         * XMLHttpRequest level 2 is present, and will default to JSONP if it isn't and 
         * the request is cross-domain.
         * 
         * @param options The IAjaxOptions for either the XMLHttpRequest 
         * or the JSONP callback.
         */
        ajax<R>(options: IHttpConfigStatic): IAjaxPromise<R> {
            return new HttpRequest(options).execute<R>();
        }

        /**
         * A direct method to force a cross-domain JSONP request.
         * 
         * @param options The IJsonpOptions 
         */
        jsonp<R>(options: IJsonpConfigStatic): IAjaxPromise<R> {
            return new HttpRequest(options).executeJsonp<R>();
        }

        /**
         * Makes an ajax request, specifying responseType: 
         * responseType.JSON.
         * 
         * @param options The IAjaxOptions for either the XMLHttpRequest 
         * or the JSONP callback.
         * @return {AjaxPromise} A promise, when fulfilled or rejected, 
         * will return an IAjaxResponse object, with the response being a parsed 
         * JSON object (assuming valid JSON).
         */
        json<R>(options: IHttpConfigStatic): IAjaxPromise<R> {
            return new HttpRequest(extend({}, options, { responseType: 'json' })).execute<R>();
        }
    }

    register.injectable('$http', Http);

    /**
     * The Type for referencing the '$http.config' injectable as a dependency.
     */
    export function HttpConfigStatic(): IHttpConfigStatic {
        return Http.config;
    }

    register.injectable('$http.config', HttpConfigStatic, null, register.injectableType.STATIC);
}
