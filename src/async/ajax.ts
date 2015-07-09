/**
 * @name async
 * @memberof plat
 * @kind namespace
 * @access public
 *
 * @description
 * Holds all classes and interfaces related to async components in platypus.
 */
module plat.async {
    'use strict';

    /**
     * @name HttpRequest
     * @memberof plat.async
     * @kind class
     *
     * @description
     * HttpRequest provides a wrapper for the XMLHttpRequest object. Allows for
     * sending AJAX requests to a server. This class does not support
     * synchronous requests.
     */
    export class HttpRequest {
        protected static _inject: any = {
            _browser: __Browser,
            _window: __Window,
            _document: __Document,
            _config: __HttpConfig,
            _log: __Log
        };

        /**
         * @name clearTimeout
         * @memberof plat.async.HttpRequest
         * @kind property
         * @access public
         *
         * @type {plat.IRemoveListener}
         *
         * @description
         * The timeout ID associated with the specified timeout
         */
        clearTimeout: plat.IRemoveListener;

        /**
         * @name xhr
         * @memberof plat.async.HttpRequest
         * @kind property
         * @access public
         *
         * @type {XMLHttpRequest}
         *
         * @description
         * The created XMLHttpRequest
         */
        xhr: XMLHttpRequest;

        /**
         * @name jsonpCallback
         * @memberof plat.async.HttpRequest
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The JSONP callback name
         */
        jsonpCallback: string;

        /**
         * @name _log
         * @memberof plat.async.HttpRequest
         * @kind property
         * @access protected
         *
         * @type {plat.debug.Log}
         * @description
         * Reference to the {@link plat.debug.Log|Log} injectable.
         */
        protected _log: debug.Log;

        /**
         * @name _browser
         * @memberof plat.async.HttpRequest
         * @kind property
         * @access protected
         *
         * @type {plat.web.Browser}
         *
         * @description
         * The plat.web.Browser injectable instance
         */
        protected _browser: web.Browser;

        /**
         * @name _window
         * @memberof plat.async.HttpRequest
         * @kind property
         * @access protected
         *
         * @type {Window}
         *
         * @description
         * The injectable instance of type Window
         */
        protected _window: Window;

        /**
         * @name _document
         * @memberof plat.async.HttpRequest
         * @kind property
         * @access protected
         *
         * @type {Document}
         *
         * @description
         * The injectable instance of type Document
         */
        protected _document: Document;

        /**
         * @name _config
         * @memberof plat.async.HttpRequest
         * @kind property
         * @access protected
         *
         * @type {plat.async.IHttpConfig}
         *
         * @description
         * The configuration for an HTTP Request
         */
        protected _config: IHttpConfig;

        /**
         * @name __fileSupported
         * @memberof plat.async.HttpRequest
         * @kind property
         * @access private
         *
         * @type {boolean}
         *
         * @description
         * Whether or not the browser supports the File API.
         */
        private __fileSupported: boolean;

        /**
         * @name __options
         * @memberof plat.async.HttpRequest
         * @kind property
         * @access public
         *
         * @type {plat.async.IHttpConfig}
         *
         * @description
         * The configuration for the specific HTTP Request
         */
        private __options: IHttpConfig;

        /**
         * @name constructor
         * @memberof plat.async.HttpRequest
         * @kind function
         * @access public
         *
         * @description
         * The constructor for a {@link plat.async.HttpRequest|HttpRequest}.
         *
         * @returns {plat.async.HttpRequest}
         */
        constructor() {
            let compat: plat.Compat = acquire(__Compat);
            this.__fileSupported = compat.fileSupported;
        }

        /**
         * @name initialize
         * @memberof plat.async.HttpRequest
         * @kind function
         * @access public
         *
         * @description
         * Initializes the HttpRequest with options.
         *
         * @param {plat.async.IHttpConfig} options The IHttpConfigStatic used to customize this HttpRequest.
         *
         * @returns {void}
         */
        initialize(options: IHttpConfig): void {
            this.__options = _extend(false, false, {}, this._config, options);
        }

        /**
         * @name execute
         * @memberof plat.async.HttpRequest
         * @kind function
         * @access public
         *
         * @description
         * Executes an XMLHttpRequest and resolves an {@link plat.async.AjaxPromise|IAjaxPromise} upon completion.
         *
         * @typeparam {any} R The response type for the XMLHttpRequest object.
         *
         * @returns {plat.async.AjaxPromise} A promise that fulfills when the XMLHttpRequest is done.
         */
        execute<R>(): AjaxPromise<R> {
            let options = this.__options,
                url = options.url;

            if (!isString(url) || isEmpty(url.trim())) {
                return this._invalidOptions();
            }

            options.url = this._browser.urlUtils(url).toString();

            let isCrossDomain = options.isCrossDomain || false,
                xDomain = false;

            // check if forced cross domain call or cors is not supported (IE9)
            if (isCrossDomain) {
                xDomain = true;
            } else {
                this.xhr = new XMLHttpRequest();
                if (isUndefined(this.xhr.withCredentials)) {
                    xDomain = this._browser.isCrossDomain(url);
                }
            }

            if (xDomain) {
                this.xhr = null;
                this.jsonpCallback = options.jsonpCallback || uniqueId(__JSONP_CALLBACK);
                return this.executeJsonp();
            }

            return this._sendXhrRequest();
        }

        /**
         * @name executeJsonp
         * @memberof plat.async.HttpRequest
         * @kind function
         * @access public
         *
         * @description
         * Executes an JSONP request and resolves an {@link plat.async.AjaxPromise|IAjaxPromise} upon completion.
         *
         * @typeparam {any} R The response type for the JSONP callback parameter.
         *
         * @returns {plat.async.AjaxPromise} A promise that fulfills when the JSONP request is done.
         */
        executeJsonp<R>(): AjaxPromise<R> {
            let options = this.__options,
                url = options.url;

            if (!isString(url) || isEmpty(url.trim())) {
                return this._invalidOptions();
            }

            options.url = this._browser.urlUtils(url).toString();
            if (isNull(this.jsonpCallback)) {
                this.jsonpCallback = options.jsonpCallback || uniqueId(__Callback);
            }

            let promise = new AjaxPromise((resolve, reject): void => {
                let _window = <any>this._window,
                    _document = this._document,
                    scriptTag = _document.createElement('script'),
                    jsonpCallback = this.jsonpCallback,
                    jsonpIdentifier = options.jsonpIdentifier || 'callback';

                scriptTag.src = url + ((url.indexOf('?') > -1) ? '&' : '?') + jsonpIdentifier + '=' + jsonpCallback;

                let oldValue = _window[jsonpCallback];
                _window[jsonpCallback] = (response: any): void => {
                    // clean up
                    if (isFunction(this.clearTimeout)) {
                        this.clearTimeout();
                    }

                    _document.head.removeChild(scriptTag);
                    if (isUndefined(oldValue)) {
                        deleteProperty(_window, jsonpCallback);
                    } else {
                        _window[jsonpCallback] = oldValue;
                    }

                    // call callback
                    resolve({
                        response: response,
                        // ok
                        status: 200
                    });
                };

                _document.head.appendChild(scriptTag);

                let timeout = options.timeout;
                if (isNumber(timeout) && timeout > 0) {
                    // we first postpone to avoid always timing out when debugging, though this is not
                    // a foolproof method.
                    this.clearTimeout = postpone((): void => {
                        this.clearTimeout = defer((): void => {
                            reject(new AjaxError({
                                response: 'Request timed out in ' + timeout + 'ms for ' + url,
                                // request timeout
                                status: 408
                            }));
                            _window[jsonpCallback] = noop;
                        }, timeout - 1);
                    });
                }
            });

            promise.initialize(this);

            return promise;
        }

        /**
         * @name _xhrOnReadyStateChange
         * @memberof plat.async.HttpRequest
         * @kind function
         * @access protected
         *
         * @description
         * A wrapper for the XMLHttpRequest's onReadyStateChanged callback.
         *
         * @returns {boolean} Waits for the readyState to be complete and then
         * return true in the case of a success and false in the case of
         * an error.
         */
        protected _xhrOnReadyStateChange(): boolean {
            let xhr = this.xhr;
            if (xhr.readyState === 4) {
                let status = xhr.status;

                if (status === 0) {
                    let response = xhr.response;
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
         * @name _sendXhrRequest
         * @memberof plat.async.HttpRequest
         * @kind function
         * @access protected
         *
         * @description
         * The function that initializes and sends the XMLHttpRequest.
         *
         * @returns {plat.async.AjaxPromise} A promise that fulfills with the
         * formatted {@link plat.async.IAjaxResponse|IAjaxResponse} and rejects if there is a problem with an
         * {@link plat.async.AjaxError|IAjaxError}.
         */
        protected _sendXhrRequest(): AjaxPromise<any> {
            let xhr = this.xhr,
                options = this.__options,
                method = options.method,
                url = options.url,
                promise = new AjaxPromise((resolve, reject): void => {
                    xhr.onreadystatechange = (): void => {
                        let success = this._xhrOnReadyStateChange();

                        if (isNull(success)) {
                            return;
                        }

                        let response = this._formatResponse(options.responseType, success);

                        if (success) {
                            resolve(response);
                        } else {
                            reject(new AjaxError(response));
                        }

                        this.xhr = options = null;
                    };

                    if (!isString(method)) {
                        this._log.info('AjaxOptions method was not of type string. Defaulting to "GET".');
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

                    let responseType = options.responseType;
                    if (!(this.__fileSupported || responseType === '' || responseType === 'text')) {
                        responseType = '';
                    }

                    // Android < 4.4 will throw a DOM Exception 12 if responseType is set to json.
                    // The only way to do feature detection is with try/catch.
                    if (responseType === 'json') {
                        try {
                            xhr.responseType = responseType;
                        } catch (e) {
                            xhr.responseType = '';
                        }
                    }

                    xhr.withCredentials = options.withCredentials;

                    let mimeType = options.overrideMimeType,
                        data = options.data;

                    if (isString(mimeType) && !isEmpty(mimeType)) {
                        xhr.overrideMimeType(mimeType);
                    }

                    if (isNull(data) || data === '') {
                        // no data exists so set headers and send request
                        this.__setHeaders();
                        xhr.send();
                    } else {
                        let transforms = options.transforms || [],
                            length = transforms.length,
                            contentType = options.contentType,
                            contentTypeExists = isString(contentType) && !isEmpty(contentType);

                        if (length > 0) {
                            // if data transforms defined, assume they're going to take care of
                            // any and all transformations.
                            for (let i = 0; i < length; ++i) {
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
                                let contentTypeLower = contentType.toLowerCase();
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
                                        this.__submitFramedFormData().then((response): void => {
                                            resolve(response);
                                        }, (): void => {
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

                    let timeout = options.timeout;
                    if (isNumber(timeout) && timeout > 0) {
                        // we first postpone to avoid always timing out when debugging, though this is not
                        // a foolproof method.
                        this.clearTimeout = postpone((): void => {
                            this.clearTimeout = defer((): void => {
                                reject(new AjaxError({
                                    response: 'Request timed out in ' + timeout + 'ms for ' + options.url,
                                    status: xhr.status,
                                    getAllResponseHeaders: (): string => { return xhr.getAllResponseHeaders(); },
                                    xhr: xhr
                                }));

                                xhr.onreadystatechange = null;
                                xhr.abort();
                                this.xhr = null;
                            }, timeout - 1);
                        });
                    }
                });

            promise.initialize(this);

            return promise;
        }

        /**
         * @name _invalidOptions
         * @memberof plat.async.HttpRequest
         * @kind function
         * @access protected
         *
         * @description
         * Returns a promise that is immediately rejected due to an error.
         *
         * @returns {plat.async.AjaxPromise} A promise that immediately rejects
         * with an {@link plat.async.AjaxError|IAjaxError}
         */
        protected _invalidOptions(): AjaxPromise<any> {
            return new AjaxPromise((resolve, reject): void => {
                this._log.warn('Attempting a request without specifying a url');
                reject(new AjaxError({
                    response: 'Attempting a request without specifying a url',
                    status: null,
                    getAllResponseHeaders: null,
                    xhr: null
                }));
            });
        }

        /**
         * @name _formatResponse
         * @memberof plat.async.HttpRequest
         * @kind function
         * @access protected
         *
         * @description
         * The function that formats the response from the XMLHttpRequest.
         *
         * @param {string} responseType The user designated responseType
         * @param {boolean} success Signifies if the response was a success
         *
         * @returns {IAjaxResponse<any>} The {@link plat.async.IAjaxResponse|IAjaxResponse} to be returned to
         * the requester.
         */
        protected _formatResponse(responseType: string, success: boolean): IAjaxResponse<any> {
            let xhr = this.xhr,
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
                getAllResponseHeaders: (): string => { return xhr.getAllResponseHeaders(); },
                xhr: xhr
            };
        }

        /**
         * @name __setHeaders
         * @memberof plat.async.HttpRequest
         * @kind function
         * @access private
         *
         * @description
         * Sets the headers for an XMLHttpRequest
         *
         * @returns {void}
         */
        private __setHeaders(): void {
            let headers = this.__options.headers,
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

        /**
         * @name __serializeFormData
         * @memberof plat.async.HttpRequest
         * @kind function
         * @access private
         *
         * @description
         * Serializes multipart form data in an XMLHttpRequest as a string.
         *
         * @returns {string}
         */
        private __serializeFormData(): string {
            let data = this.__options.data,
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
                    this._log.warn('Invalid form entry with key "' + key + '" and value "' + val);
                    val = JSON.stringify(val);
                }

                formBuffer.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
            }

            return formBuffer.join('&').replace(/%20/g, '+');
        }

        /**
         * @name __appendFormData
         * @memberof plat.async.HttpRequest
         * @kind function
         * @access private
         *
         * @description
         * Creates FormData to add to the XMLHttpRequest.
         *
         * @returns {FormData}
         */
        private __appendFormData(): FormData {
            let data = this.__options.data,
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
                        this._log.warn('Invalid form entry with key "' + key + '" and value "' + val);
                        formData.append(key, JSON.stringify(val));
                    }
                } else {
                    formData.append(key, val);
                }
            }

            return formData;
        }

        /**
         * @name __submitFramedFormData
         * @memberof plat.async.HttpRequest
         * @kind function
         * @access private
         *
         * @description
         * Handles submitting multipart form data using an iframe.
         *
         * @returns {plat.async.IThenable} A promise that fulfills after the form data is submitted.
         */
        private __submitFramedFormData(): IThenable<IAjaxResponse<any>> {
            let options = this.__options,
                data = options.data,
                url = options.url,
                _document = this._document,
                $body = _document.body,
                Promise: IPromise = acquire(__Promise),
                form = _document.createElement('form'),
                iframe = _document.createElement('iframe'),
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

            return new Promise<IAjaxResponse<any>>((resolve, reject): void => {
                this.xhr.abort = (): void => {
                    iframe.onload = null;
                    $body.removeChild(form);
                    $body.removeChild(iframe);
                    reject();
                };

                iframe.onload = (): void => {
                    let content = iframe.contentDocument.body.innerHTML;

                    $body.removeChild(form);
                    $body.removeChild(iframe);

                    resolve({
                        response: content,
                        status: 200,
                        getAllResponseHeaders: (): string => ''
                    });

                    this.xhr = iframe.onload = null;
                };

                $body.insertBefore(form, null);
                $body.insertBefore(iframe, null);
                form.submit();
            });
        }

        /**
         * @name __createInput
         * @memberof plat.async.HttpRequest
         * @kind function
         * @access private
         *
         * @description
         * Creates input for form data submissions.
         *
         * @returns {HTMLInputElement}
         */
        private __createInput(key: string, val: any): HTMLInputElement {
            let _document = this._document,
                input = <HTMLInputElement>_document.createElement('input');

            input.type = 'hidden';
            input.name = key;

            if (isNull(val)) {
                input.value = '';
            } else if (isObject(val)) {
                // check if val is an pseudo File
                if (isFunction(val.slice) && !(isUndefined(val.name) || isUndefined(val.path))) {
                    let fileList = _document.querySelectorAll('input[type="file"][name="' + key + '"]'),
                        length = fileList.length;
                    // if no inputs found, stringify the data
                    if (length === 0) {
                        this._log.info('Could not find input[type="file"] with [name="' + key +
                            '"]. Stringifying data instead.');
                        input.value = JSON.stringify(val);
                    } else if (length === 1) {
                        input = <HTMLInputElement>fileList[0];
                        // swap nodes
                        let clone = input.cloneNode(true);
                        input.parentNode.insertBefore(clone, input);
                    } else {
                        // rare case but may have multiple forms with file inputs
                        // that have the same name
                        let fileInput: HTMLInputElement,
                            path = val.path;
                        while (length-- > 0) {
                            fileInput = <HTMLInputElement>fileList[length];
                            if (fileInput.value === path) {
                                input = fileInput;
                                // swap nodes
                                let inputClone = input.cloneNode(true);
                                input.parentNode.insertBefore(inputClone, input);
                                break;
                            }
                        }

                        // could not find the right file
                        if (length === -1) {
                            this._log.info('Could not find input[type="file"] with [name="' + key + '"] and [value="' +
                                val.path + '"]. Stringifying data instead.');
                            input.value = JSON.stringify(val);
                        }
                    }
                } else {
                    // may throw a fatal error but this is an invalid case
                    this._log.info('Invalid form entry with key "' + key + '" and value "' + val);
                    input.value = JSON.stringify(val);
                }
            } else {
                input.value = val;
            }

            return input;
        }
    }

    /**
     * @name IHttpConfig
     * @memberof plat.async
     * @kind interface
     *
     * @extends {plat.async.IJsonpConfig}
     *
     * @description
     * Describes an object which contains Ajax configuration properties.
     */
    export interface IHttpConfig extends IJsonpConfig {
        /**
         * @name method
         * @memberof plat.async.IHttpConfig
         * @kind property
         * @access public
         * @optional
         *
         * @type {string}
         *
         * @description
         * The HTTP method type of XmlHttpRequest such as 'GET', 'POST', 'PUT',
         * 'DELETE', etc. Ignored for non-HTTP urls. Defaults to 'GET'.
         */
        method?: string;

        /**
         * @name timeout
         * @memberof plat.async.IHttpConfig
         * @kind property
         * @access public
         * @optional
         *
         * @type {number}
         *
         * @description
         * The number of milliseconds a request can take before
         * automatically being terminated. A value of 0
         * means there is no timeout.
         */
        timeout?: number;

        /**
         * @name user
         * @memberof plat.async.IHttpConfig
         * @kind property
         * @access public
         * @optional
         *
         * @type {string}
         *
         * @description
         * An optional user string for the XmlHttpRequest
         */
        user?: string;

        /**
         * @name password
         * @memberof plat.async.IHttpConfig
         * @kind property
         * @access public
         * @optional
         *
         * @type {string}
         *
         * @description
         * An optional password string for the XmlHttpRequest
         */
        password?: string;

        /**
         * @name responseType
         * @memberof plat.async.IHttpConfig
         * @kind property
         * @access public
         * @optional
         *
         * @type {string}
         *
         * @description
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
         * @name contentType
         * @memberof plat.async.IHttpConfig
         * @kind property
         * @access public
         * @optional
         *
         * @type {string}
         *
         * @description
         * The Content-Type header for XMLHttpRequest when
         * data is being sent. The default is
         * 'application/json;charset=utf-8;'.
         */
        contentType?: string;

        /**
         * @name overrideMimeType
         * @memberof plat.async.IHttpConfig
         * @kind property
         * @access public
         * @optional
         *
         * @type {string}
         *
         * @description
         * A string to override the MIME type returned by the server.
         */
        overrideMimeType?: string;

        /**
         * @name headers
         * @memberof plat.async.IHttpConfig
         * @kind property
         * @access public
         * @optional
         *
         * @type {IObject<any>}
         *
         * @description
         * A key/value pair object where the key is a DOMString header key
         * and the value is the DOMString header value.
         */
        headers?: IObject<any>;

        /**
         * @name withCredentials
         * @memberof plat.async.IHttpConfig
         * @kind property
         * @access public
         * @optional
         *
         * @type {boolean}
         *
         * @description
         * Indicates whether or not cross-site Access-Control requests
         * should be made using credentials such as cookies or
         * authorization headers. The default is false.
         */
        withCredentials?: boolean;

        /**
         * @name data
         * @memberof plat.async.IHttpConfig
         * @kind property
         * @access public
         * @optional
         *
         * @type {any}
         *
         * @description
         * The request payload
         */
        data?: any;

        /**
         * @name transforms
         * @memberof plat.async.IHttpConfig
         * @kind property
         * @access public
         * @optional
         *
         * @type {plat.async.IHttpTransformFunction}
         *
         * @description
         * An array of data transform functions that fire in order and consecutively
         * pass the returned result from one function to the next.
         */
        transforms?: Array<IHttpTransformFunction>;

        /**
         * @name isCrossDomain
         * @memberof plat.async.IHttpConfig
         * @kind property
         * @access public
         * @optional
         *
         * @type {boolean}
         *
         * @description
         * Forces a JSONP, cross-domain request when set to true.
         * The default is false.
         */
        isCrossDomain?: boolean;
    }

    /**
     * @name IHttpTransformFunction
     * @memberof plat.async
     * @kind interface
     *
     * @description
     * A function that is used to transform XMLHttpRequest data.
     */
    export interface IHttpTransformFunction {
        /**
         * @name transform
         * @memberof plat.async.IHttpTransformFunction
         * @kind function
         * @access public
         *
         * @description
         * The method signature for {@link plat.async.IHttpTransformFunction|IHttpTransformFunction}.
         *
         * @param {any} data The data for the XMLHttpRequest.
         * @param {XMLHttpRequest} xhr The XMLHttpRequest for the data.
         *
         * @returns {any} The transformed data.
         */
        (data: any, xhr: XMLHttpRequest): any;
    }

    /**
     * @name IJsonpConfig
     * @memberof plat.async
     * @kind interface
     *
     * @description
     * Describes an object which contains JSONP configuration properties.
     */
    export interface IJsonpConfig {
        /**
         * @name url
         * @memberof plat.async.IJsonpConfig
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The url for the JSONP callback
         * (without the `?{callback}={callback_name}` parameter in the url)
         * or for the XmlHttpRequest.
         */
        url: string;

        /**
         * @name jsonpIdentifier
         * @memberof plat.async.IJsonpConfig
         * @kind property
         * @access public
         * @optional
         *
         * @type {string}
         *
         * @description
         * The identifier the server uses to get the name of the JSONP
         * callback. The default is 'callback' as seen in
         * http://platypi.io/data?callback=plat_fnName.
         */
        jsonpIdentifier?: string;

        /**
         * @name jsonpCallback
         * @memberof plat.async.IJsonpConfig
         * @kind property
         * @access public
         * @optional
         *
         * @type {string}
         *
         * @description
         * A specified name for the JSONP callback (in case the server has
         * it hardcoded and/or does not get it from the given url). The
         * default is a unique plat id generated separately for
         * each JSONP callback seen as 'plat_callback00' in
         * http://platypi.io/data?callback=plat_callback00.
         */
        jsonpCallback?: string;
    }

    /**
     * @name IAjaxResponse
     * @memberof plat.async
     * @kind interface
     *
     * @description
     * Describes an object that is the response to an AJAX request.
     *
     * @typeparam {any} R The type of the AJAX response.
     */
    export interface IAjaxResponse<R> {
        /**
         * @name response
         * @memberof plat.async.IAjaxResponse
         * @kind property
         * @access public
         *
         * @type {R}
         *
         * @description
         * The AJAX response or responseText. The response should
         * be checked when received due to browser
         * incompatibilities with responseType. If a browser does
         * not support a response type it will return the value as
         * a string.
         */
        response: R;

        /**
         * @name status
         * @memberof plat.async.IAjaxResponse
         * @kind property
         * @access public
         *
         * @type {number}
         *
         * @description
         * The XHR status. Resolves as 200 for JSONP.
         */
        status: number;

        /**
         * @name getAllResponseHeaders
         * @memberof plat.async.IAjaxResponse
         * @kind function
         * @access public
         *
         * @description
         * A method for getting the XHR response headers.
         *
         * @returns {void}
         */
        getAllResponseHeaders?: () => string;

        /**
         * @name xhr
         * @memberof plat.async.IAjaxResponse
         * @kind property
         * @access public
         * @optional
         *
         * @type {XMLHttpRequest}
         *
         * @description
         * The XMLHttpRequest object associated with the AJAX call
         */
        xhr?: XMLHttpRequest;
    }

    /**
     * @name IAjaxResolveFunction
     * @memberof plat.async
     * @kind interface
     *
     * @description
     * Describes the AjaxPromise's resolve function
     *
     * @typeparam {any} R The type of the {@link plat.async.IAjaxResponse|IAjaxResponse} object.
     */
    export interface IAjaxResolveFunction<R> {
        /**
         * @name resolver
         * @memberof plat.async.IAjaxResolveFunction
         * @kind function
         * @access public
         *
         * @description
         * The method signature for an {@link plat.async.IAjaxResolveFunction|IAjaxResolveFunction}.
         *
         * @param {(value?: plat.async.IAjaxResponse<R>) => any} resolve The function to call when the
         * AJAX call has successfully fulfilled.
         * @param {(reason?: plat.async.AjaxError) => any} reject The function to call when the
         * AJAX call fails.
         *
         * @returns {void}
         */
        (resolve: (value?: IAjaxResponse<R>) => any, reject: (reason?: AjaxError) => any): void;
    }

    /**
     * @name AjaxError
     * @memberof plat.async
     * @kind class
     *
     * @implements {plat.async.IAjaxResponse<any>}
     *
     * @description
     * A class that forms an Error object with an {@link plat.async.IAjaxResponse|IAjaxResponse}.
     */
    export class AjaxError implements Error, IAjaxResponse<any> {
        /**
         * @name name
         * @memberof plat.async.AjaxError
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The name of the Error ('AjaxError')
         */
        name: string = 'AjaxError';

        /**
         * @name message
         * @memberof plat.async.AjaxError
         * @kind property
         * @access public
         *
         * @type {string}
         *
         * @description
         * The Error message
         */
        message: string;

        /**
         * @name response
         * @memberof plat.async.AjaxError
         * @kind property
         * @access public
         *
         * @type {any}
         *
         * @description
         * The response from the XMLHttpRequest
         */
        response: any;

        /**
         * @name status
         * @memberof plat.async.AjaxError
         * @kind property
         * @access public
         *
         * @type {number}
         *
         * @description
         * The status code from the XMLHttpRequest
         */
        status: number;

        /**
         * @name getAllResponseHeaders
         * @memberof plat.async.AjaxError
         * @kind function
         * @access public
         *
         * @description
         * A method for getting the XHR response headers.
         *
         * @returns {void}
         */
        getAllResponseHeaders: () => string;

        /**
         * @name xhr
         * @memberof plat.async.AjaxError
         * @kind property
         * @access public
         *
         * @type {XMLHttpRequest}
         *
         * @description
         * The XMLHttpRequest object associated with the AJAX call
         */
        xhr: XMLHttpRequest;

        /**
         * @name constructor
         * @memberof plat.async.AjaxError
         * @kind function
         * @access public
         *
         * @description
         * The constructor for an {@link plat.async.AjaxError|AjaxError}.
         *
         * @param {plat.async.IAjaxResponse} response The {@link plat.async.IAjaxResponse|IAjaxResponse} object.
         *
         * @returns {plat.async.AjaxError}
         */
        constructor(response: IAjaxResponse<any>) {
            Error.apply(this);
            this.response = this.message = response.response;
            this.status = response.status;
            this.getAllResponseHeaders = response.getAllResponseHeaders;
            this.xhr = response.xhr;
        }

        /**
         * @name toString
         * @memberof plat.async.AjaxError
         * @kind function
         * @access public
         *
         * @description
         * Outputs a formatted string describing the {@link plat.async.AjaxError|AjaxError}.
         *
         * @returns {string}
         */
        toString(): string {
            let response = this.response,
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
     * @name AjaxPromise
     * @memberof plat.async
     * @kind class
     *
     * @extends {plat.async.Promise}
     * @implements {plat.async.IAjaxThenable<plat.async.IAjaxResponse<R>>}
     *
     * @description
     * Describes a type of {@link plat.async.Promise|Promise} that fulfills with an {@link plat.async.IAjaxResponse|IAjaxResponse}
     * and can be optionally cancelled.
     *
     * @typeparam {any} R The type of the response object in the {@link plat.async.IAjaxResponse|IAjaxResponse}.
     */
    export class AjaxPromise<R> extends Promise<IAjaxResponse<R>> implements IAjaxThenable<IAjaxResponse<R>> {
        /**
         * @name _window
         * @memberof plat.async.AjaxPromise
         * @kind property
         * @access protected
         * @readonly
         *
         * @type {Window}
         *
         * @description
         * The Window object.
         */
        protected _window: Window = acquire(__Window);

        /**
         * @name __http
         * @memberof plat.async.AjaxPromise
         * @kind property
         * @access private
         * @readonly
         *
         * @type {plat.async.HttpRequest}
         *
         * @description
         * The {@link plat.async.HttpRequest|HttpRequest} object.
         */
        private __http: HttpRequest;

        /**
         * @name constructor
         * @memberof plat.async.AjaxPromise
         * @kind function
         * @access public
         * @variation 0
         *
         * @description
         * The constructor method for the {@link plat.async.AjaxPromise}.
         *
         * @param {plat.async.IAjaxResolveFunction} resolveFunction The promise resolve function.
         *
         * @returns {plat.async.AjaxPromise}
         */
        constructor(resolveFunction: IAjaxResolveFunction<R>);
        /**
         * @name constructor
         * @memberof plat.async.AjaxPromise
         * @kind function
         * @access public
         * @variation 1
         *
         * @description
         * The constructor method for the {@link plat.async.AjaxPromise}.
         *
         * @param {plat.async.IAjaxResolveFunction} resolveFunction The promise resolve function.
         * @param {any} promise The promise object to allow for cancelling the {@link plat.async.AjaxPromise}.
         *
         * @returns {plat.async.AjaxPromise}
         */
        constructor(resolveFunction: IAjaxResolveFunction<R>, promise: any);
        constructor(resolveFunction: IAjaxResolveFunction<R>, promise?: any) {
            super(resolveFunction);
            if (!isNull(promise)) {
                this.__http = promise.__http;
            }
        }

        /**
         * @name initialize
         * @memberof plat.async.AjaxPromise
         * @kind function
         * @access public
         *
         * @description
         * A method to initialize this {@link plat.async.AjaxPromise|AjaxPromise}, passing it the
         * associated {@link plat.async.HttpRequest|IHttpRequest}.
         *
         * @param {plat.async.HttpRequest} http The http request for this promise.
         *
         * @returns {void}
         */
        initialize(http: HttpRequest): void {
            if (isObject(http) && isNull(this.__http)) {
                this.__http = http;
            }
        }

        /**
         * @name cancel
         * @memberof plat.async.AjaxPromise
         * @kind function
         * @access public
         *
         * @description
         * A method to cancel the AJAX call associated with this {@link plat.async.AjaxPromise|AjaxPromise}.
         *
         * @returns {void}
         */
        cancel(): void {
            let http = this.__http,
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
                (<any>this._window)[jsonpCallback] = noop;
            }

            (<any>this).__subscribers = [];
        }

        /**
         * @name then
         * @memberof plat.async.AjaxPromise
         * @kind function
         * @access public
         * @variation 0
         *
         * @description
         * Takes in two methods, called when/if the promise fulfills/rejects.
         *
         * @typeparam {any} U The type of the object returned from the fulfill/reject callbacks, which will be carried to the
         * next then method in the promise chain.
         *
         * @param {(success: plat.async.IAjaxResponse<R>) => plat.async.IAjaxThenable<U>} onFulfilled A method called when/if
         * the promise fulfills. If undefined the next onFulfilled method in the promise chain will be called.
         * @param {(error: plat.async.AjaxError) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
         * If undefined the next onRejected method in the promise chain will be called.
         *
         * @returns {plat.async.IAjaxThenable<U>}
         */
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => U,
            onRejected?: (error: AjaxError) => any): IAjaxThenable<U>;
        /**
         * @name then
         * @memberof plat.async.AjaxPromise
         * @kind function
         * @access public
         * @variation 1
         *
         * @description
         * Takes in two methods, called when/if the promise fulfills/rejects.
         *
         * @typeparam {any} U The type of the object returned from the fulfill/reject callbacks, which will be carried to the
         * next then method in the promise chain.
         *
         * @param {(success: plat.async.IAjaxResponse<R>) => plat.async.IAjaxThenable<U>} onFulfilled A method called when/if
         * the promise fulfills. If undefined the next onFulfilled method in the promise chain will be called.
         * @param {(error: plat.async.AjaxError) => U} onRejected A method called when/if the promise rejects.
         * If undefined the next onRejected method in the promise chain will be called.
         *
         * @returns {plat.async.IAjaxThenable<U>}
         */
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => IThenable<U>,
            onRejected?: (error: AjaxError) => IThenable<U>): IAjaxThenable<U>;
        /**
         * @name then
         * @memberof plat.async.AjaxPromise
         * @kind function
         * @access public
         * @variation 2
         *
         * @description
         * Takes in two methods, called when/if the promise fulfills/rejects.
         *
         * @typeparam {any} U The type of the object returned from the fulfill/reject callbacks, which will be carried to the
         * next then method in the promise chain.
         *
         * @param {(success: plat.async.IAjaxResponse<R>) => U} onFulfilled A method called when/if the promise fulfills.
         * If undefined the next onFulfilled method in the promise chain will be called.
         * @param {(error: plat.async.AjaxError) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
         * If undefined the next onRejected method in the promise chain will be called.
         *
         * @returns {plat.async.IAjaxThenable<U>}
         */
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => IThenable<U>,
            onRejected?: (error: AjaxError) => any): IAjaxThenable<U>;
        /**
         * @name then
         * @memberof plat.async.AjaxPromise
         * @kind function
         * @access public
         * @variation 3
         *
         * @description
         * Takes in two methods, called when/if the promise fulfills/rejects.
         *
         * @typeparam {any} U The type of the object returned from the fulfill/reject callbacks, which will be carried to the
         * next then method in the promise chain.
         *
         * @param {(success: plat.async.IAjaxResponse<R>) => U} onFulfilled A method called when/if the promise fulfills.
         * If undefined the next onFulfilled method in the promise chain will be called.
         * @param {(error: plat.async.AjaxError) => U} onRejected A method called when/if the promise rejects.
         * If undefined the next onRejected method in the promise chain will be called.
         *
         * @returns {plat.async.IAjaxThenable<U>}
         */
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => U,
            onRejected?: (error: AjaxError) => IThenable<U>): IAjaxThenable<U>;
        then<U>(onFulfilled: (success: IAjaxResponse<R>) => U,
            onRejected?: (error: AjaxError) => any): IAjaxThenable<U> {
            return <IAjaxThenable<U>><any>super.then<U>(onFulfilled, onRejected);
        }

        /**
         * @name catch
         * @memberof plat.async.AjaxPromise
         * @kind function
         * @access public
         * @variation 0
         *
         * @description
         * A wrapper method for {@link plat.async.Promise|Promise.then(undefined, onRejected);}
         *
         * @typeparam {any} U The return type of the returned promise.
         *
         * @param {(error: any) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
         * If undefined the next onRejected method in the promise chain will be called.
         *
         * @returns {plat.async.IAjaxThenable<U>} A promise that resolves with the input type parameter U.
         */
        catch<U>(onRejected: (error: any) => IAjaxThenable<U>): IAjaxThenable<U>;
        /**
         * @name catch
         * @memberof plat.async.AjaxPromise
         * @kind function
         * @access public
         * @variation 1
         *
         * @description
         * A wrapper method for {@link plat.async.Promise|Promise.then(undefined, onRejected);}
         *
         * @typeparam {any} U The return type of the returned promise.
         *
         * @param {(error: any) => U} onRejected A method called when/if the promise rejects. If undefined the next
         * onRejected method in the promise chain will be called.
         *
         * @returns {plat.async.IAjaxThenable<U>} A promise that resolves with the input type parameter U.
         */
        catch<U>(onRejected: (error: any) => U): IAjaxThenable<U>;
        catch<U>(onRejected: (error: any) => any): IAjaxThenable<U> {
            return <IAjaxThenable<U>><any>super.catch<U>(onRejected);
        }
    }

    /**
     * @name IAjaxThenable
     * @memberof plat.async
     * @kind interface
     *
     * @extends {plat.async.IThenable}
     *
     * @description
     * Describes a type of {@link plat.async.IThenable|IThenable} that can optionally cancel it's associated AJAX call.
     *
     * @typeparam {any} R The return type for the {@link plat.async.IThenable|IThenable}.
     */
    export interface IAjaxThenable<R> extends IThenable<R> {
        /**
         * @name cancel
         * @memberof plat.async.IAjaxThenable
         * @kind function
         * @access public
         *
         * @description
         * A method to cancel the AJAX call associated with this {@link plat.async.AjaxPromise}.
         *
         * @returns {void}
         */
        cancel(): void;

        /**
         * @name then
         * @memberof plat.async.IAjaxThenable
         * @kind function
         * @access public
         * @variation 0
         *
         * @description
         * Takes in two methods, called when/if the promise fulfills/rejects.
         *
         * @typeparam {any} U The type of the object returned from the fulfill/reject callbacks, which will be carried to the
         * next then method in the promise chain.
         *
         * @param {(success: R) => plat.async.IAjaxThenable<U>} onFulfilled A method called when/if the promise fulfills.
         * If undefined the next onFulfilled method in the promise chain will be called.
         * @param {(error: any) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
         * If undefined the next onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => IThenable<U>): IAjaxThenable<U>;
        /**
         * @name then
         * @memberof plat.async.IAjaxThenable
         * @kind function
         * @access public
         * @variation 1
         *
         * @description
         * Takes in two methods, called when/if the promise fulfills/rejects.
         *
         * @typeparam {any} U The type of the object returned from the fulfill/reject callbacks, which will be carried to the
         * next then method in the promise chain.
         *
         * @param {(success: R) => plat.async.IAjaxThenable<U>} onFulfilled A method called when/if the promise fulfills.
         * If undefined the next onFulfilled method in the promise chain will be called.
         * @param {(error: any) => U} onRejected A method called when/if the promise rejects.
         * If undefined the next onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => IThenable<U>, onRejected?: (error: any) => U): IAjaxThenable<U>;
        /**
         * @name then
         * @memberof plat.async.IAjaxThenable
         * @kind function
         * @access public
         * @variation 2
         *
         * @description
         * Takes in two methods, called when/if the promise fulfills/rejects.
         *
         * @typeparam {any} U The type of the object returned from the fulfill/reject callbacks, which will be carried to the
         * next then method in the promise chain.
         *
         * @param {(success: R) => U} onFulfilled A method called when/if the promise fulfills.
         * If undefined the next onFulfilled method in the promise chain will be called.
         * @param {(error: any) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
         * If undefined the next onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => IThenable<U>): IAjaxThenable<U>;
        /**
         * @name then
         * @memberof plat.async.IAjaxThenable
         * @kind function
         * @access public
         * @variation 3
         *
         * @description
         * Takes in two methods, called when/if the promise fulfills/rejects.
         *
         * @typeparam {any} U The type of the object returned from the fulfill/reject callbacks, which will be carried to the
         * next then method in the promise chain.
         *
         * @param {(success: R) => U} onFulfilled A method called when/if the promise fulfills.
         * If undefined the next onFulfilled method in the promise chain will be called.
         * @param {(error: any) => U} onRejected A method called when/if the promise rejects.
         * If undefined the next onRejected method in the promise chain will be called.
         */
        then<U>(onFulfilled: (success: R) => U, onRejected?: (error: any) => U): IAjaxThenable<U>;

        /**
         * @name catch
         * @memberof plat.async.IAjaxThenable
         * @kind function
         * @access public
         * @variation 0
         *
         * @description
         * A wrapper method for {@link plat.async.Promise|Promise.then(undefined, onRejected);}
         *
         * @param {(error: any) => plat.async.IAjaxThenable<U>} onRejected A method called when/if the promise rejects.
         * If undefined the next onRejected method in the promise chain will be called.
         */
        catch<U>(onRejected: (error: any) => IThenable<U>): IAjaxThenable<U>;
        /**
         * @name catch
         * @memberof plat.async.IAjaxThenable
         * @kind function
         * @access public
         * @variation 1
         *
         * @description
         * A wrapper method for {@link plat.async.Promise|Promise.then(undefined, onRejected);}
         *
         * @param {(error: any) => U} onRejected A method called when/if the promise rejects.
         * If undefined the next onRejected method in the promise chain will be called.
         */
        catch<U>(onRejected: (error: any) => U): IAjaxThenable<U>;
    }

    /**
     * @name IHttpResponseType
     * @memberof plat.async
     * @kind interface
     *
     * @description
     * Describes an object that provides value mappings for XMLHttpRequestResponseTypes
     */
    export interface IHttpResponseType {
        /**
         * @name DEFAULT
         * @memberof plat.async.IHttpResponseType
         * @kind property
         * @access public
         * @readonly
         *
         * @type {string}
         *
         * @description
         * The default response type (empty string)
         */
        DEFAULT: string;

        /**
         * @name ARRAYBUFFER
         * @memberof plat.async.IHttpResponseType
         * @kind property
         * @access public
         * @readonly
         *
         * @type {string}
         *
         * @description
         * The arrayBuffer type ('arrayBuffer')
         */
        ARRAYBUFFER: string;

        /**
         * @name BLOB
         * @memberof plat.async.IHttpResponseType
         * @kind property
         * @access public
         * @readonly
         *
         * @type {string}
         *
         * @description
         * The blob type ('blob')
         */
        BLOB: string;

        /**
         * @name DOCUMENT
         * @memberof plat.async.IHttpResponseType
         * @kind property
         * @access public
         * @readonly
         *
         * @type {string}
         *
         * @description
         * The document type ('document')
         */
        DOCUMENT: string;

        /**
         * @name JSON
         * @memberof plat.async.IHttpResponseType
         * @kind property
         * @access public
         * @readonly
         *
         * @type {string}
         *
         * @description
         * The json type ('json')
         */
        JSON: string;

        /**
         * @name TEXT
         * @memberof plat.async.IHttpResponseType
         * @kind property
         * @access public
         * @readonly
         *
         * @type {string}
         *
         * @description
         * The text type ('text')
         */
        TEXT: string;
    }

    /**
     * @name IHttpContentType
     * @memberof plat.async
     * @kind interface
     *
     * @description
     * Describes an object that provides Content-Type mappings for Http POST requests.
     */
    export interface IHttpContentType {
        /**
         * @name ENCODED_FORM
         * @memberof plat.async.IHttpContentType
         * @kind property
         * @access public
         * @readonly
         *
         * @type {string}
         *
         * @description
         * Standard denotation for form encoded data. All objects are converted
         * to string key-value pairs.
         */
        ENCODED_FORM: string;

        /**
         * @name JSON
         * @memberof plat.async.IHttpContentType
         * @kind property
         * @access public
         * @readonly
         *
         * @type {string}
         *
         * @description
         * Standard denotation for JavaScript Object Notation (JSON).
         */
        JSON: string;

        /**
         * @name MULTIPART_FORM
         * @memberof plat.async.IHttpContentType
         * @kind property
         * @access public
         * @readonly
         *
         * @type {string}
         *
         * @description
         * Standard denotation for a multi-part Webform. Associated with
         * an entype of 'multipart/form-data'.
         */
        MULTIPART_FORM: string;

        /**
         * @name OCTET_STREAM
         * @memberof plat.async.IHttpContentType
         * @kind property
         * @access public
         * @readonly
         *
         * @type {string}
         *
         * @description
         * Standard denotation for arbitrary binary data.
         */
        OCTET_STREAM: string;

        /**
         * @name XML
         * @memberof plat.async.IHttpContentType
         * @kind property
         * @access public
         * @readonly
         *
         * @type {string}
         *
         * @description
         * Standard denotation for XML files.
         */
        XML: string;

        /**
         * @name PLAIN_TEXT
         * @memberof plat.async.IHttpContentType
         * @kind property
         * @access public
         * @readonly
         *
         * @type {string}
         *
         * @description
         * Standard denotation for textual data.
         */
        PLAIN_TEXT: string;

        /**
         * @name HTML
         * @memberof plat.async.IHttpContentType
         * @kind property
         * @access public
         * @readonly
         *
         * @type {string}
         *
         * @description
         * Standard denotation for HTML.
         */
        HTML: string;
    }

    /**
     * @name Http
     * @memberof plat.async
     * @kind class
     *
     * @description
     * The instantiated class of the injectable for making
     * AJAX requests.
     */
    export class Http {
        /**
         * @name config
         * @memberof plat.async.Http
         * @kind property
         * @access public
         * @static
         *
         * @type {plat.async.IHttpConfig}
         *
         * @description
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
            contentType: 'application/json;charset=utf-8'
        };

        /**
         * @name responseType
         * @memberof plat.async.Http
         * @kind property
         * @access public
         *
         * @type {plat.async.IHttpResponseType}
         *
         * @description
         * Provides value mappings for XMLHttpRequestResponseTypes
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
         * @name contentType
         * @memberof plat.async.Http
         * @kind property
         * @access public
         *
         * @type {plat.async.IHttpContentType}
         *
         * @description
         * Provides Content-Type mappings for Http POST requests.
         */
        contentType: IHttpContentType = {
            ENCODED_FORM: 'application/x-www-form-urlencoded;charset=utf-8',
            JSON: 'application/json;charset=utf-8',
            MULTIPART_FORM: 'multipart/form-data',
            OCTET_STREAM: 'application/octet-stream;charset=utf-8',
            XML: 'application/xml;charset=utf-8',
            PLAIN_TEXT: 'text/plain',
            HTML: 'text/html'
        };

        /**
         * @name ajax
         * @memberof plat.async.Http
         * @kind function
         * @access public
         *
         * @description
         * A wrapper method for the Http class that creates and executes a new Http with
         * the specified {@link plat.async.IHttpConfig|IHttpConfig}. This function will check if
         * XMLHttpRequest level 2 is present, and will default to JSONP if it isn't and
         * the request is cross-domain.
         *
         * @typeparam {any} R The type of the {@link plat.async.AjaxPromise|IAjaxPromise}
         *
         * @param {plat.async.IHttpConfig} options The {@link plat.async.IHttpConfig|IHttpConfig} for either the XMLHttpRequest
         * or the JSONP callback.
         *
         * @returns {plat.async.AjaxPromise} A promise, when fulfilled
         * or rejected, will return an {@link plat.async.IAjaxResponse|IAjaxResponse} object.
         */
        ajax<R>(options: IHttpConfig): AjaxPromise<R> {
            let request: HttpRequest = acquire(__HttpRequestInstance);
            request.initialize(options);
            return request.execute<R>();
        }

        /**
         * @name jsonp
         * @memberof plat.async.Http
         * @kind function
         * @access public
         *
         * @description
         * A direct method to force a cross-domain JSONP request.
         *
         * @typeparam {any} R The type of the {@link plat.async.AjaxPromise|IAjaxPromise}
         *
         * @param {plat.async.IJsonpConfig} options The {@link plat.async.IJsonpConfig|IJsonpConfig}
         *
         * @returns {plat.async.AjaxPromise} A promise, when fulfilled or rejected, will return an
         * {@link plat.async.IAjaxResponse|IAjaxResponse} object.
         */
        jsonp<R>(options: IJsonpConfig): AjaxPromise<R> {
            let request: HttpRequest = acquire(__HttpRequestInstance);
            request.initialize(options);
            return request.executeJsonp<R>();
        }

        /**
         * @name json
         * @memberof plat.async.Http
         * @kind function
         * @access public
         *
         * @description
         * Makes an ajax request, specifying responseType: 'json'.
         *
         * @typeparam {any} R The type of the {@link plat.async.AjaxPromise|IAjaxPromise}
         *
         * @param {plat.async.IHttpConfig} options The {@link plat.async.IHttpConfig|IHttpConfig}
         * for either the XMLHttpRequest or the JSONP callback.
         *
         * @returns {plat.async.AjaxPromise} A promise, when fulfilled or rejected,
         * will return an {@link plat.async.IAjaxResponse|IAjaxResponse} object, with the response
         * being a parsed JSON object (assuming valid JSON).
         */
        json<R>(options: IHttpConfig): AjaxPromise<R> {
            let request: HttpRequest = acquire(__HttpRequestInstance);
            request.initialize(_extend(false, false, {}, options, { responseType: 'json' }));
            return request.execute<R>();
        }
    }

    register.injectable(__Http, Http);
    register.injectable(__HttpRequestInstance, HttpRequest, null, __INSTANCE);

    /**
     * The Type for referencing the '_httpConfig' injectable as a dependency.
     */
    export function IHttpConfig(): IHttpConfig {
        return Http.config;
    }

    register.injectable(__HttpConfig, IHttpConfig);
}
