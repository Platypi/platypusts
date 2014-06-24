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
        $Browser: web.IBrowser = acquire(__Browser);
        /**
         * The injectable instance of type Window
         */
        $Window: Window = acquire(__Window);
        /**
         * The injectable instance of type Document
         */
        $Document: Document = acquire(__Document);
        /**
         * The configuration for an HTTP Request
         */
        $config: IHttpConfig = acquire(__HttpConfig);

        private __fileSupported = (<ICompat>acquire(__Compat)).fileSupported;
        private __options: IHttpConfig;

        /**
         * @param options The IHttpConfigStatic used to customize this HttpRequest.
         */
        constructor(options: IHttpConfig) {
            this.__options = extend({}, this.$config, options);
        }

        execute<R>(): IAjaxPromise<R> {
            var options = this.__options,
                url = options.url;

            if (!isString(url) || isEmpty(url.trim())) {
                return this._invalidOptions();
            }

            options.url = this.$Browser.urlUtils(url).toString();

            var isCrossDomain = options.isCrossDomain || false,
                xDomain = false;

            // check if forced cross domain call or cors is not supported (IE9)
            if (isCrossDomain) {
                xDomain = true;
            } else {
                this.xhr = new XMLHttpRequest();
                if (isUndefined(this.xhr.withCredentials)) {
                    xDomain = this.$Browser.isCrossDomain(url);
                }
            }

            if (xDomain) {
                this.xhr = null;
                this.jsonpCallback = options.jsonpCallback || uniqueId('plat_callback');
                return this.executeJsonp();
            }

            return this._sendXhrRequest();
        }

        executeJsonp<R>(): IAjaxPromise<R> {
            var options = this.__options,
                url = options.url;

            if (!isString(url) || isEmpty(url.trim())) {
                return this._invalidOptions();
            }

            options.url = this.$Browser.urlUtils(url).toString();
            if (isNull(this.jsonpCallback)) {
                this.jsonpCallback = options.jsonpCallback || uniqueId('plat_callback');
            }

            return new AjaxPromise((resolve, reject) => {
                var $window = <any>this.$Window,
                    $document = this.$Document,
                    scriptTag = $document.createElement('script'),
                    jsonpCallback = this.jsonpCallback,
                    jsonpIdentifier = options.jsonpIdentifier || 'callback';

                scriptTag.src = url + '?' + jsonpIdentifier + '=' + jsonpCallback;

                var oldValue = $window[jsonpCallback];
                $window[jsonpCallback] = (response: any) => {
                    // clean up
                    if (isFunction(this.clearTimeout)) {
                        this.clearTimeout();
                    }

                    $document.head.removeChild(scriptTag);
                    if (!isUndefined(oldValue)) {
                        $window[jsonpCallback] = oldValue;
                    } else {
                        deleteProperty($window, jsonpCallback);
                    }

                    // call callback
                    resolve({
                        response: response,
                        // ok
                        status: 200
                    });
                };

                $document.head.appendChild(scriptTag);

                var timeout = options.timeout;
                if (isNumber(timeout) && timeout > 0) {
                    // we first postpone to avoid always timing out when debugging, though this is not
                    // a foolproof method.
                    this.clearTimeout = postpone(() => {
                        this.clearTimeout = defer(() => {
                            reject(new AjaxError({
                                response: 'Request timed out in ' + timeout + 'ms for ' + url,
                                // request timeout
                                status: 408
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
         * @return {bool} Waits for the readyState to be complete and then 
         * return true in the case of a success and false in the case of 
         * an error.
         */
        _xhrOnReadyStateChange(): boolean {
            var xhr = this.xhr;
            if (xhr.readyState === 4) {
                var status = xhr.status;

                if (status === 0) {
                    var response = xhr.response;
                    if (isNull(response)) {
                        try {
                            response = xhr.responseText;
                        } catch (e) { }
                    }

                    // file protocol issue **Needs to be tested more thoroughly**
                    // ok if response is not empty, Not Found otherwise
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
            }
            // else {} TODO: add progress for xhr if we choose to add progress to AjaxPromise
        }

        /**
         * The function that initializes and sends the XMLHttpRequest.
         * 
         * @return {Promise<IAjaxResponse>} A promise that fulfills with the 
         * formatted IAjaxResponse and rejects if there is a problem with an 
         * IAjaxError.
         */
        _sendXhrRequest(): IAjaxPromise<any> {
            var xhr = this.xhr,
                options = this.__options,
                method = options.method,
                url = options.url;

            return new AjaxPromise((resolve, reject) => {
                xhr.onreadystatechange = () => {
                    var success = this._xhrOnReadyStateChange();

                    if (isNull(success)) {
                        return;
                    }

                    var response = this._formatResponse(options.responseType, success);

                    if (success) {
                        resolve(response);
                    } else {
                        reject(new AjaxError(response));
                    }

                    this.xhr = options = null;
                };

                if (!isString(method)) {
                    var Exception: IExceptionStatic = acquire(__ExceptionStatic);
                    Exception.warn('AjaxOptions method was not of type string. Defaulting to "GET".', Exception.AJAX);
                    method = 'GET';
                }

                xhr.open(
                    method.toUpperCase(),
                    url,
                    // synchronous XHR not supported
                    true,
                    options.user,
                    options.password
                    );

                var responseType = options.responseType;
                if (!(this.__fileSupported || responseType === '' || responseType === 'text')) {
                    responseType = '';
                }

                xhr.responseType = responseType;
                xhr.withCredentials = options.withCredentials;

                var mimeType = options.overrideMimeType,
                    data = options.data;

                if (isString(mimeType) && !isEmpty(mimeType)) {
                    xhr.overrideMimeType(mimeType);
                }

                if (isNull(data) || data === '') {
                    // no data exists so set headers and send request
                    this.__setHeaders();
                    xhr.send();
                } else {
                    var transforms = options.transforms || [],
                        length = transforms.length,
                        contentType = options.contentType,
                        contentTypeExists = isString(contentType) && !isEmpty(contentType);

                    if (length > 0) {
                        // if data transforms defined, assume they're going to take care of 
                        // any and all transformations.
                        for (var i = 0; i < length; ++i) {
                            data = transforms[i](data, xhr);
                        }

                        // if contentType exists, assume they did not set it in 
                        // their headers as well
                        if (contentTypeExists) {
                            xhr.setRequestHeader('Content-Type', contentType);
                        }

                        this.__setHeaders();
                        xhr.send(data);
                    } else if (isObject(data)) {
                        // if isObject and contentType exists we want to transform the data
                        if (contentTypeExists) {
                            var contentTypeLower = contentType.toLowerCase();
                            if (contentTypeLower.indexOf('x-www-form-urlencoded') !== -1) {
                                // perform an encoded form transformation
                                data = this.__serializeFormData();
                                // set Content-Type header because we're assuming they didn't set it 
                                // in their headers object
                                xhr.setRequestHeader('Content-Type', contentType);
                                this.__setHeaders();
                                xhr.send(data);
                            } else if (contentTypeLower.indexOf('multipart/form-data') !== -1) {
                                // need to check if File is a supported object
                                if (this.__fileSupported) {
                                    // use FormData
                                    data = this.__appendFormData();
                                    // do not set the Content-Type header due to modern browsers 
                                    // setting special headers for multipart/form-data
                                    this.__setHeaders();
                                    xhr.send(data);
                                } else {
                                    // use iframe trick for older browsers (do not send a request)
                                    // this case is the reason for this giant, terrible, nested if-else statement
                                    this.__submitFramedFormData().then((response) => {
                                        resolve(response);
                                    }, () => {
                                        this.xhr = null;
                                    });
                                }
                            } else {
                                // assume stringification is possible
                                data = JSON.stringify(data);
                                // set Content-Type header because we're assuming they didn't set it 
                                // in their headers object
                                xhr.setRequestHeader('Content-Type', contentType);
                                this.__setHeaders();
                                xhr.send(data);
                            }
                        } else {
                            // contentType does not exist so simply set defined headers and send raw data
                            this.__setHeaders();
                            xhr.send(data);
                        }
                    } else {
                        // if contentType exists set Content-Type header because we're assuming they didn't set it 
                        // in their headers object
                        if (contentTypeExists) {
                            xhr.setRequestHeader('Content-Type', contentType);
                        }

                        this.__setHeaders();
                        xhr.send(data);
                    }
                }

                var timeout = options.timeout;
                if (isNumber(timeout) && timeout > 0) {
                    // we first postpone to avoid always timing out when debugging, though this is not
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
                var exceptionFactory: IExceptionStatic = acquire(__ExceptionStatic);
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
         * The function that formats the response from the XMLHttpRequest.
         * 
         * @param responseType The user designated responseType
         * @param success Signifies if the response was a success
         * @return {IAjaxResponse} The IAjaxResponse to be returned to 
         * the requester.
         */
        _formatResponse(responseType: string, success: boolean): IAjaxResponse<any> {
            var xhr = this.xhr,
                status = xhr.status,
                response = xhr.response;

            // need to try, catch instead of boolean short circuit because chrome doesn't like checking 
            // responseText when the responseType is anything other than empty or 'text'
            if (isNull(response)) {
                try {
                    response = xhr.responseText;
                } catch (e) { }
            }

            if (status === 0) {
                // file protocol issue **Needs to be tested more thoroughly**
                // ok if response empty, Not Found otherwise
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

        private __setHeaders(): void {
            var headers = this.__options.headers,
                keys = Object.keys(headers || {}),
                xhr = this.xhr,
                length = keys.length,
                key: string,
                i: number;

            for (i = 0; i < length; ++i) {
                key = keys[i];
                xhr.setRequestHeader(key, headers[key]);
            }
        }
        private __serializeFormData(): string {
            var data = this.__options.data,
                keys = Object.keys(data),
                key: string,
                val: any,
                formBuffer: Array<string> = [];

            while (keys.length > 0) {
                key = keys.pop();
                val = data[key];
                if (isNull(val)) {
                    val = '';
                } else if (isObject(val)) {
                    // may throw a fatal error but this is an invalid case
                    var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                    $exception.warn('Invalid form entry with key "' + key + '" and value "' + val, $exception.AJAX);
                    val = JSON.stringify(val);
                }

                formBuffer.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
            }

            return formBuffer.join('&').replace(/%20/g, '+');
        }
        private __appendFormData(): FormData {
            var data = this.__options.data,
                formData = new FormData(),
                keys = Object.keys(data),
                key: string,
                val: any;

            while (keys.length > 0) {
                key = keys.pop();
                val = data[key];
                if (isNull(val)) {
                    formData.append(key, '');
                } else if (isObject(val)) {
                    if (isFile(val)) {
                        formData.append(key, val, val.name || val.fileName || 'blob');
                    } else {
                        // may throw a fatal error but this is an invalid case
                        var $exception: IExceptionStatic = acquire(__ExceptionStatic);
                        $exception.warn('Invalid form entry with key "' + key + '" and value "' + val, $exception.AJAX);
                        formData.append(key, JSON.stringify(val));
                    }
                } else {
                    formData.append(key, val);
                }
            }

            return formData;
        }
        private __submitFramedFormData(): IThenable<IAjaxResponse<any>> {
            var options = this.__options,
                data = options.data,
                url = options.url,
                $document = this.$Document,
                $body = $document.body,
                Promise: IPromise = acquire(__Promise),
                form = $document.createElement('form'),
                iframe = $document.createElement('iframe'),
                iframeName = uniqueId('iframe_target'),
                keys = Object.keys(data),
                key: string;

            iframe.name = form.target = iframeName;
            iframe.src = 'javascript:false;';
            form.enctype = form.encoding = 'multipart/form-data';
            form.action = url;
            form.method = 'POST';
            form.style.display = 'none';

            while (keys.length > 0) {
                key = keys.pop();
                form.insertBefore(this.__createInput(key, data[key]), null);
            }

            return new Promise<IAjaxResponse<any>>((resolve, reject) => {
                this.xhr.abort = () => {
                    iframe.onload = null;
                    $body.removeChild(form);
                    $body.removeChild(iframe);
                    reject();
                };

                iframe.onload = () => {
                    var content = iframe.contentDocument.body.innerHTML;

                    $body.removeChild(form);
                    $body.removeChild(iframe);

                    resolve({
                        response: content,
                        status: 200,
                        getAllResponseHeaders: () => ''
                    });

                    this.xhr = iframe.onload = null;
                };

                $body.insertBefore(form, null);
                $body.insertBefore(iframe, null);
                form.submit();
            });
        }
        private __createInput(key: string, val: any): HTMLInputElement {
            var $document = this.$Document,
                $exception: IExceptionStatic,
                input = <HTMLInputElement>$document.createElement('input');

            input.type = 'hidden';
            input.name = key;

            if (isNull(val)) {
                input.value = '';
            } else if (isObject(val)) {
                // check if val is an pseudo File
                if (isFunction(val.slice) && !(isUndefined(val.name) || isUndefined(val.path))) {
                    var fileList = $document.querySelectorAll('input[type="file"][name="' + key + '"]'),
                        length = fileList.length;
                    // if no inputs found, stringify the data
                    if (length === 0) {
                        $exception = acquire(__ExceptionStatic);
                        $exception.warn('Could not find input[type="file"] with [name="' + key +
                            '"]. Stringifying data instead.', $exception.AJAX);
                        input.value = JSON.stringify(val);
                    } else if (length === 1) {
                        input = <HTMLInputElement>fileList[0];
                        // swap nodes
                        var clone = input.cloneNode(true);
                        input.parentNode.insertBefore(clone, input);
                    } else {
                        // rare case but may have multiple forms with file inputs 
                        // that have the same name
                        var fileInput: HTMLInputElement,
                            path = val.path;
                        while (length-- > 0) {
                            fileInput = <HTMLInputElement>fileList[length];
                            if (fileInput.value === path) {
                                input = fileInput;
                                // swap nodes
                                var inputClone = input.cloneNode(true);
                                input.parentNode.insertBefore(inputClone, input);
                                break;
                            }
                        }

                        // could not find the right file
                        if (length === -1) {
                            $exception = acquire(__ExceptionStatic);
                            $exception.warn('Could not find input[type="file"] with [name="' + key + '"] and [value="' +
                                val.path + '"]. Stringifying data instead.', $exception.AJAX);
                            input.value = JSON.stringify(val);
                        }
                    }
                } else {
                    // may throw a fatal error but this is an invalid case
                    $exception = acquire(__ExceptionStatic);
                    $exception.warn('Invalid form entry with key "' + key + '" and value "' + val, $exception.AJAX);
                    input.value = JSON.stringify(val);
                }
            } else {
                input.value = val;
            }

            return input;
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
    export interface IHttpConfig extends IJsonpConfig {
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
         * A string to override the MIME type returned by the server.
         */
        overrideMimeType?: string;

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
         * An array of data transform functions that fire in order and consecutively 
         * pass the returned result from one function to the next.
         */
        transforms?: Array<(data: any, xhr: XMLHttpRequest) => any>;

        /**
         * Forces a JSONP, cross-domain request when set to true.
         * The default is false.
         */
        isCrossDomain?: boolean;
    }

    /**
     * Describes an object which contains JSONP configuration properties.
     */
    export interface IJsonpConfig {
        /**
         * The url for the JSONP callback 
         * (without the ?{callback}={callback_name} parameter in the url) 
         * or for the XmlHttpRequest.
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

    // have to bypass TS flags in order to properly extend Error
    (<any>AjaxError).prototype = Error.prototype;

    /**
     * Describes an object that forms an Error object with an IAjaxResponse.
     */
    export interface IAjaxError extends Error, IAjaxResponse<any> { }

    /**
     * Describes a type of Promise that fulfills with an IAjaxResponse and can be optionally canceled.
     */
    export class AjaxPromise<R> extends Promise<IAjaxResponse<R>> implements IAjaxPromise<R> {
        $Window: Window = acquire(__Window);
        private __http: HttpRequest;
        constructor(resolveFunction: IAjaxResolveFunction<R>, promise?: any) {
            super(resolveFunction);
            if (!isNull(promise)) {
                this.__http = promise.__http;
            }
        }

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
                (<any>this.$Window)[jsonpCallback] = noop;
            }

            (<any>this).__subscribers = [];
        }

        then<U>(onFulfilled: (success: IAjaxResponse<R>) => U,
            onRejected?: (error: IAjaxError) => any): IAjaxThenable<U>;
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => IThenable<U>,
            onRejected?: (error: IAjaxError) => IThenable<U>): IAjaxThenable<U>;
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => IThenable<U>,
            onRejected?: (error: IAjaxError) => any): IAjaxThenable<U>;
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => U,
            onRejected?: (error: IAjaxError) => IThenable<U>): IAjaxThenable<U>;
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => U,
            onRejected?: (error: IAjaxError) => any): IAjaxThenable<U> {
            return <IAjaxThenable<U>><any>super.then<U>(onFulfilled, onRejected);
        }

        catch<U>(onRejected: (error: any) => IAjaxThenable<U>): IAjaxThenable<U>;
        catch<U>(onRejected: (error: any) => U): IAjaxThenable<U>;
        catch<U>(onRejected: (error: any) => any): IAjaxThenable<U> {
            return <IAjaxThenable<U>><any>super.catch<U>(onRejected);
        }
    }
    
    /**
     * Describes a type of IThenable that can optionally cancel it's associated AJAX call.
     */
    export interface IAjaxThenable<R> extends IThenable<R> {
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
        then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => IThenable<U>): IAjaxThenable<U>;
        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => U): IAjaxThenable<U>;
        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => IThenable<U>): IAjaxThenable<U>;
        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => U): IAjaxThenable<U>;

        /**
         * A wrapper method for Promise.then(undefined, onRejected);
         * 
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        catch<U>(onRejected: (error: any) => IThenable<U>): IAjaxThenable<U>;
        /**
         * A wrapper method for Promise.then(undefined, onRejected);
         * 
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        catch<U>(onRejected: (error: any) => U): IAjaxThenable<U>;
    }

    /**
     * Describes a type of IPromise that fulfills with an IAjaxResponse and can be optionally canceled.
     */
    export interface IAjaxPromise<R> extends IAjaxThenable<IAjaxResponse<R>> {
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
            onRejected?: (error: IAjaxError) => any): IAjaxThenable<U>;
        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => IThenable<U>,
            onRejected?: (error: IAjaxError) => IThenable<U>): IAjaxThenable<U>;
        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => IThenable<U>,
            onRejected?: (error: IAjaxError) => any): IAjaxThenable<U>;
        /**
         * Takes in two methods, called when/if the promise fulfills/rejects.
         * 
         * @param onFulfilled A method called when/if the promise fulills. If undefined the next
         * onFulfilled method in the promise chain will be called.
         * @param onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => U,
            onRejected?: (error: IAjaxError) => IThenable<U>): IAjaxThenable<U>;
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
     * Describes an object that provides Content-Type mappings for Http POST requests.
     */
    export interface IHttpContentType {
        /**
         * Standard denotation for form encoded data. All objects are converted 
         * to string key-value pairs.
         */
        ENCODED_FORM: string;

        /**
         * Standard denotation for JavaScript Object Notation (JSON).
         */
        JSON: string;

        /**
         * Standard denotation for a multi-part Webform. Associated with 
         * an entype of 'multipart/form-data'.
         */
        MULTIPART_FORM: string;

        /**
         * Standard denotation for arbitrary binary data.
         */
        OCTET_STREAM: string;

        /**
         * Standard denotation for XML files.
         */
        XML: string;

        /**
         * Standard denotation for textual data.
         */
        PLAIN_TEXT: string;

        /**
         * Standard denotation for HTML.
         */
        HTML: string;
    }

    /**
     * The instantiated class of the injectable for making 
     * AJAX requests.
     */
    export class Http implements IHttp {
        /**
         * Default Http config
         */
        static config: IHttpConfig = {
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
         * Common HttpContentType mappings
         */
        contentType: IHttpContentType = {
            ENCODED_FORM: 'application/x-www-form-urlencoded;charset=utf-8;',
            JSON: 'application/json;charset=utf-8;',
            MULTIPART_FORM: 'multipart/form-data;',
            OCTET_STREAM: 'application/octet-stream;charset=utf-8;',
            XML: 'application/xml;charset=utf-8;',
            PLAIN_TEXT: 'text/plain;',
            HTML: 'text/html;'
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
        ajax<R>(options: IHttpConfig): IAjaxPromise<R> {
            return new HttpRequest(options).execute<R>();
        }

        /**
         * A direct method to force a cross-domain JSONP request.
         * 
         * @param options The IJsonpOptions 
         */
        jsonp<R>(options: IJsonpConfig): IAjaxPromise<R> {
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
        json<R>(options: IHttpConfig): IAjaxPromise<R> {
            return new HttpRequest(extend({}, options, { responseType: 'json' })).execute<R>();
        }
    }

    /**
     * The Type for referencing the '$Http' injectable as a dependency.
     */
    export function IHttp(): IHttp {
        return new Http();
    }

    register.injectable(__Http, IHttp);

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
         * Describes an object that provides Content-Type mappings for Http POST requests.
         */
        contentType: IHttpContentType;

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
        ajax<R>(options: IHttpConfig): IAjaxPromise<R>;

        /**
         * A direct method to force a cross-domain JSONP request.
         * 
         * @param options The IJsonpOptions 
         * @return {AjaxPromise} A promise, when fulfilled
         * or rejected, will return an IAjaxResponse object.
         */
        jsonp? <R>(options: IJsonpConfig): IAjaxPromise<R>;

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
        json? <R>(options: IHttpConfig): IAjaxPromise<R>;
    }

    /**
     * The Type for referencing the '$HttpConfig' injectable as a dependency.
     */
    export function IHttpConfig(): IHttpConfig {
        return Http.config;
    }

    register.injectable(__HttpConfig, IHttpConfig);
}
