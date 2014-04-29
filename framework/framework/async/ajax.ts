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

        private __options: IHttpConfigStatic;

        /**
         * @param options The IAjaxOptions used to customize this Http.
         */
        constructor(options?: IHttpConfigStatic) {
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
        execute(): IAjaxPromise {
            var options = this.__options,
                url = options.url;

            if (!isString(url) || isEmpty(url.trim())) {
                return this._invalidOptions();
            }

            options.url = this.$browser.urlUtils(url).toString();

            var isCrossDomain = options.isCrossDomain || false,
                xDomain = false,
                xhr;

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
        executeJsonp(): IAjaxPromise {
            var options = this.__options,
                url = options.url;

            if (!isString(url) || isEmpty(url.trim())) {
                return this._invalidOptions();
            }

            options.url = this.$browser.urlUtils(url).toString();

            return new AjaxPromise((resolve, reject) => {
                var scriptTag = this.$document.createElement('script'),
                    jsonpCallback = this.jsonpCallback || uniqueId('plat_callback'),
                    jsonpIdentifier = options.jsonpIdentifier || 'callback';

                scriptTag.src = url + '?' + jsonpIdentifier + '=' + jsonpCallback;

                var oldValue = this.$window[jsonpCallback];
                this.$window[jsonpCallback] = (response: any) => {
                    //clean up
                    if (isFunction(this.clearTimeout)) {
                        this.clearTimeout();
                    }

                    this.$document.head.removeChild(scriptTag);
                    if (!isUndefined(oldValue)) {
                        this.$window[jsonpCallback] = oldValue;
                    } else {
                        delete this.$window[jsonpCallback];
                    }

                    //call callback
                    resolve({
                        response: response,
                        status: 200 // OK
                    });
                };

                this.$document.head.appendChild(scriptTag);

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
                            this.$window[jsonpCallback] = noop;
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
        _xhrOnReadyStateChange(xhr: XMLHttpRequest) {
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
        _sendXhrRequest(xhr: XMLHttpRequest): IAjaxPromise {
            var options = this.__options,
                method = options.method,
                url = options.url;

            return new AjaxPromise((resolve, reject) => {
                xhr.onreadystatechange = () => {
                    var success = this._xhrOnReadyStateChange(xhr);

                    if (isNull(success)) {
                        return;
                    }

                    var response = this._formatResponse(xhr);

                    if (success) {
                        resolve(response);
                    } else {
                        reject(new AjaxError(response));
                    }
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

                var headers = options.headers,
                    keys = Object.keys(isObject(headers) ? headers : {}),
                    length = keys.length,
                    key;

                for (var i = 0; i < length; ++i) {
                    key = keys[i];
                    xhr.setRequestHeader(key, options.headers[key]);
                }

                var data = options.data;
                if (isNull(data) || data === '') {
                    xhr.send();
                } else {
                    if (isObject(data)) {
                        data = JSON.stringify(data);
                    }

                    // Set the Content-Type header if data is being sent
                    xhr.setRequestHeader('Content-Type', options.contentType);
                    xhr.send(data);
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
                            xhr = null;
                        }, timeout - 1);
                    }, null);
                }
            }, { __http: this });
        }
        
        /**
         * Returns a promise that is immediately rejected due to an error.
         *
         * @return {Promise<IAjaxResponse>} A promise that immediately rejects 
         * with an IAjaxError
         */
        _invalidOptions(): IAjaxPromise {
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
        _formatResponse(xhr: XMLHttpRequest, success?: boolean): IAjaxResponse {
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

            if (this.__options.responseType === 'json' && isString(response)) {
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
        execute(): IAjaxPromise;

        /**
         * Adds the script tag and processes the callback for the JSONP. The AjaxPromise from 
         * the ajax or jsonp call is fulfilled or rejected when the JSONP callback is called.
         *
         * @return {IAjaxPromise} A promise that fulfills with the 
         * JSONP callback and rejects if there is a problem.
         */
        executeJsonp(): IAjaxPromise;
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
    }

    /**
     * Describes an object that is the response to an AJAX request.
     */
    export interface IAjaxResponse {
        /**
         * The AJAX response or responseText. The response should 
         * be checked when received due to browser 
         * incompatibilities with responseType. If a browser does 
         * not support a response type it will return the value as 
         * a string.
         */
        response: any;
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
    export interface IAjaxResolveFunction {
        (resolve: (value?: IAjaxResponse) => any, reject: (reason?: IAjaxError) => any): void;
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
        constructor(response: IAjaxResponse) {
            Error.apply(this);
            this.response = this.message = response.response;
            this.status = response.status;
            this.getAllResponseHeaders = response.getAllResponseHeaders;
            this.xhr = response.xhr;
        }
        toString() {
            var response = this.response,
                responseText = response;

            if (isObject(response) && !response.hasOwnProperty('toString')) {
                responseText = JSON.stringify(response);
            }

            return 'Request failed with status: ' + this.status + ' and response: ' + responseText;
        }
    }

    // Have to bypass TS flags in order to properly extend Error
    (<any>AjaxError)['prototype'] = Error.prototype;

    /**
     * Describes an object that forms an Error object with an IAjaxResponse.
     */
    export interface IAjaxError extends Error, IAjaxResponse { }

    /**
     * Describes a type of Promise that fulfills with an IAjaxResponse and can be optionally canceled.
     */
    class AjaxPromise extends Promise<IAjaxResponse, IAjaxError>
        implements IAjaxPromise {
        $window: Window = acquire('$window');
        private __http: HttpRequest;
        constructor(resolveFunction: IAjaxResolveFunction, promise?: any) {
            super(resolveFunction);
            if (!isNull(promise)) {
                this.__http = promise.__http;
            }
        }

        /**
         * A method to cancel the AJAX call associated with this AjaxPromise.
         */
        cancel() {
            var http = this.__http,
                xhr = http.xhr,
                jsonpCallback = http.jsonpCallback;

            if (isFunction(http.clearTimeout)) {
                http.clearTimeout();
            }

            if (!isNull(xhr)) {
                xhr.onreadystatechange = null;
                xhr.abort();
            } else if (!isNull(jsonpCallback)) {
                this.$window[jsonpCallback] = noop;
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
         * @return {AjaxPromise} A Promise used for method chaining.
         */
        then<TResult, TError>(onFulfilled: (success: IAjaxResponse) => TResult,
            onRejected?: (error: IAjaxError) => TError) {
            return <AjaxPromise>super.then<TResult, TError>(onFulfilled, onRejected);
        }
    }

    /**
     * Describes a type of IPromise that fulfills with an IAjaxResponse and can be optionally canceled.
     */
    export interface IAjaxPromise extends IPromise<IAjaxResponse, IAjaxError> {
        /**
         * A method to cancel the AJAX call associated with this AjaxPromise.
         */
        cancel(): void;

        /**
         * Inherited from IPromise
         */
        then<TResult, TError>(onFulfilled: (success: IAjaxResponse) => TResult,
            onRejected?: (error: IAjaxError) => TError): IAjaxPromise;
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
        ajax(options: IHttpConfigStatic): IAjaxPromise;

        /**
         * A direct method to force a cross-domain JSONP request.
         * 
         * @param options The IJsonpOptions 
         * @return {AjaxPromise} A promise, when fulfilled
         * or rejected, will return an IAjaxResponse object.
         */
        jsonp? (options: IJsonpConfigStatic): IAjaxPromise;

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
        json? (options: IHttpConfigStatic): IAjaxPromise;
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
        ajax(options: IHttpConfigStatic): IAjaxPromise {
            return new HttpRequest(options).execute();
        }

        /**
         * A direct method to force a cross-domain JSONP request.
         * 
         * @param options The IJsonpOptions 
         */
        jsonp(options: IJsonpConfigStatic): IAjaxPromise {
            return new HttpRequest(options).executeJsonp();
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
        json(options: IHttpConfigStatic): IAjaxPromise {
            return new HttpRequest(extend({}, options, { responseType: 'json' })).execute();
        }
    }

    register.injectable('$http', Http);

    /**
     * The Type for referencing the '$http.config' injectable as a dependency.
     */
    export function HttpConfigStatic() {
        return Http.config;
    }

    register.injectable('$http.config', HttpConfigStatic, null, register.injectableType.STATIC);
}
