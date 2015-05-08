/// <reference path="../references.d.ts" />

module plat {
    'use strict';

    /**
     * @name Exception
     * @memberof plat
     * @kind class
     * @access public
     * 
     * @description
     * Manages the throwing and consuming of errors and warnings.
     */
    export class Exception {

        /**
         * @name PARSE
         * @memberof plat.Exception
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for parsing exceptions
         */
        static PARSE: number = 0;

        /**
         * @name COMPILE
         * @memberof plat.Exception
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for compiling exceptions
         */
        static COMPILE: number = 1;

        /**
         * @name BIND
         * @memberof plat.Exception
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for binding exceptions
         */
        static BIND: number = 2;

        /**
         * @name NAME
         * @memberof plat.Exception
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for name exceptions
         */
        static NAME: number = 3;

        /**
         * @name NAVIGATION
         * @memberof plat.Exception
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for navigation exceptions
         */
        static NAVIGATION: number = 4;

        /**
         * @name TEMPLATE
         * @memberof plat.Exception
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for template exceptions
         */
        static TEMPLATE: number = 5;

        /**
         * @name AJAX
         * @memberof plat.Exception
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for ajax exceptions
         */
        static AJAX: number = 6;

        /**
         * @name CONTEXT
         * @memberof plat.Exception
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for context exceptions
         */
        static CONTEXT: number = 7;

        /**
         * @name EVENT
         * @memberof plat.Exception
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for event exceptions
         */
        static EVENT: number = 8;

        /**
         * @name INJECTABLE
         * @memberof plat.Exception
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for injectable exceptions
         */
        static INJECTABLE: number = 9;

        /**
         * @name COMPAT
         * @memberof plat.Exception
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for compat exceptions
         */
        static COMPAT: number = 10;

        /**
         * @name PROMISE
         * @memberof plat.Exception
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for promise exceptions
         */
        static PROMISE: number = 11;

        /**
         * @name ANIMATION
         * @memberof plat.Exception
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for animation exceptions
         */
        static ANIMATION: number = 12;

        /**
         * @name CONTROL
         * @memberof plat.Exception
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for individual control exceptions 
         * (e.g. using a particular control incorrectly).
         */
        static CONTROL: number = 13;

        /**
         * @name CUSTOM
         * @memberof plat.Exception
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for custom exceptions
         */
        static CUSTOM: number = 99;

        /**
         * @name warn
         * @memberof plat.Exception
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Method for sending a warning to all listeners. Will 
         * not throw an error.
         * 
         * @param {string} message The message to be sent to the listeners.
         * @param {number} type? Denotes the type of fatal exception.
         * 
         * @returns {void}
         */
        static warn(message: string, type?: number): void {
            raise(message, type, false);
        }

        /**
         * @name fatal
         * @memberof plat.Exception
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Method for sending a fatal error to all listeners. Will
         * throw an error.
         * 
         * @param {Error} error The Error to be sent to all the listeners.
         * @param {number} type? Denotes the type of fatal exception. 
         * 
         * @returns {void}
         */
        static fatal(error: Error, type?: number): void;
        /**
         * @name fatal
         * @memberof plat.Exception
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Method for sending a fatal message to all listeners. Will
         * throw an error.
         * 
         * @param {string} message The message to be sent to all the listeners.
         * @param {number} type? Denotes the type of fatal exception. 
         * 
         * @returns {void}
         */
        static fatal(message: string, type?: number): void;
        static fatal(message: any, type?: number): void {
            raise(message, type, true);
        }
    }

    /**
     * The Type for referencing the '_Exception' injectable as a dependency.
     */
    export function IExceptionStatic(): IExceptionStatic {
        return Exception;
    }

    register.injectable(__ExceptionStatic, IExceptionStatic, null, __STATIC);

    /**
     * @name IExceptionStatic
     * @memberof plat
     * @kind interface
     * @access public
     * 
     * @description
     * Manages the throwing and consuming of errors and warnings.
     */
    export interface IExceptionStatic {
        /**
         * @name PARSE
         * @memberof plat.IExceptionStatic
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for parsing exceptions
         */
        PARSE: number;

        /**
         * @name COMPILE
         * @memberof plat.IExceptionStatic
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for compiling exceptions
         */
        COMPILE: number;

        /**
         * @name BIND
         * @memberof plat.IExceptionStatic
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for binding exceptions
         */
        BIND: number;

        /**
         * @name NAME
         * @memberof plat.IExceptionStatic
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for name exceptions
         */
        NAME: number;

        /**
         * @name NAVIGATION
         * @memberof plat.IExceptionStatic
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for navigation exceptions
         */
        NAVIGATION: number;

        /**
         * @name TEMPLATE
         * @memberof plat.IExceptionStatic
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for template exceptions
         */
        TEMPLATE: number;

        /**
         * @name AJAX
         * @memberof plat.IExceptionStatic
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for ajax exceptions
         */
        AJAX: number;

        /**
         * @name CONTEXT
         * @memberof plat.IExceptionStatic
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for context exceptions
         */
        CONTEXT: number;

        /**
         * @name EVENT
         * @memberof plat.IExceptionStatic
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for event exceptions
         */
        EVENT: number;

        /**
         * @name INJECTABLE
         * @memberof plat.IExceptionStatic
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for injectable exceptions
         */
        INJECTABLE: number;

        /**
         * @name COMPAT
         * @memberof plat.IExceptionStatic
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for compat exceptions
         */
        COMPAT: number;

        /**
         * @name PROMISE
         * @memberof plat.IExceptionStatic
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for promise exceptions
         */
        PROMISE: number;

        /**
         * @name ANIMATION
         * @memberof plat.IExceptionStatic
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for animation exceptions
         */
        ANIMATION: number;

        /**
         * @name CONTROL
         * @memberof plat.IExceptionStatic
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for individual control exceptions
         * (e.g. using a particular control incorrectly).
         */
        CONTROL: number;

        /**
         * @name CUSTOM
         * @memberof plat.IExceptionStatic
         * @kind property
         * @access public
         * @static
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * Exception Type for custom exceptions
         */
        CUSTOM: number;

        /**
         * @name warn
         * @memberof plat.IExceptionStatic
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Method for sending a warning to all listeners. Will 
         * not throw an error.
         * 
         * @param {string} message The message to be sent to the listeners.
         * @param {number} type? Denotes the type of fatal exception.
         * 
         * @returns {void}
         */
        warn(message: string, type?: number): void;

        /**
         * @name fatal
         * @memberof plat.IExceptionStatic
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Method for sending a fatal error to all listeners. Will
         * throw an error.
         * 
         * @param {Error} error The Error to be sent to all the listeners.
         * @param {number} type? Denotes the type of fatal exception.
         * 
         * @returns {void}
         */
        fatal(error: Error, type?: number): void;
        /**
         * @name fatal
         * @memberof plat.IExceptionStatic
         * @kind function
         * @access public
         * @static
         * 
         * @description
         * Method for sending a fatal message to all listeners. Will
         * throw an error.
         * 
         * @param {string} message The message to be sent to all the listeners.
         * @param {number} type? Denotes the type of fatal exception.
         * 
         * @returns {void}
         */
        fatal(message: string, type?: number): void;
    }

    /**
     * @name PlatException
     * @memberof plat
     * @kind class
     * @exported false
     * @access private
     * 
     * @implements {Error}
     * 
     * @description
     * A class for exceptions with platypus-specific names
     */
    class PlatException implements Error {
        /**
         * @name constructor
         * @memberof plat.PlatException
         * @kind function
         * @access public
         * 
         * @description
         * Creates a new {@link plat.PlatException|PlatException}
         * 
         * @param {string} message The message for the exception
         * @param {string} name The name of the exception
         * 
         * @returns {PlatException} The new exception object.
         */
        constructor(public message: string, public name: string) { }
    }

    /**
     * @name PlatError
     * @memberof plat
     * @kind class
     * @exported false
     * @access private
     * 
     * @implements {Error}
     * 
     * @description
     * A class for errors with platypus-specific names
     */
    class PlatError implements Error {
        /**
         * @name name
         * @memberof plat.PlatError
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The name of the error.
         */
        name: string = __platError;

        /**
         * @name constructor
         * @memberof plat.PlatError
         * @kind function
         * @access public
         * 
         * @description
         * Creates a new {@link plat.PlatError|PlatError}
         * 
         * @param {string} message? The message for the exception
         * 
         * @returns {PlatError} The new error object.
         */
        constructor(public message?: string) {
            this.message = message || '';
        }
    }

    /**
     * @name setPrototypes
     * @memberof plat
     * @kind function
     * @access private
     * @exported false
     * 
     * @description
     * Sets the {@link plat.PlatException|PlatException} and {@link plat.PlatError|PlatError} prototypes to the passed in Error type
     * 
     * @typeparam {Error} T The type of platError.
     * 
     * @param {T} platError The prototype of the Error.
     * 
     * @returns {void}
     */
    function setPrototypes<T extends Error>(platError?: T): void {
        PlatError.prototype = platError || Error.prototype;
        PlatException.prototype = new PlatError();
    }

    /**
     * @name raise
     * @memberof plat
     * @kind function
     * @access private
     * @exported false
     * 
     * @description
     * Dispatches error events, and throws an Error if it is fatal.
     * 
     * @param {any} message Either a string or error to raise.
     * @param {boolean} isFatal? Whether or not the error is fatal.
     * 
     * @returns {void}
     */
    function raise(message: any, type: number, isFatal?: boolean): void {
        var error: Error;

        if (message instanceof Error) {
            setPrototypes(Object.getPrototypeOf(message));
        } else if (PlatError.prototype !== Error.prototype) {
            setPrototypes();
        }
        error = new PlatException(message, '');
        switch (type) {
            case Exception.PARSE:
                error.name = __parseError;
                break;
            case Exception.BIND:
                error.name = __bindError;
                break;
            case Exception.COMPILE:
                error.name = __compileError;
                break;
            case Exception.NAME:
                error.name = __nameError;
                break;
            case Exception.NAVIGATION:
                error.name = __navigationError;
                break;
            case Exception.TEMPLATE:
                error.name = __templateError;
                break;
            case Exception.CONTEXT:
                error.name = __contextError;
                break;
            case Exception.EVENT:
                error.name = __eventError;
                break;
            case Exception.INJECTABLE:
                error.name = __injectableError;
                break;
            case Exception.COMPAT:
                error.name = __CompatError;
                break;
            case Exception.CUSTOM:
            default:
                error = new PlatError(message);
                break;
        }

        if (message instanceof Error) {
            var properties = Object.getOwnPropertyNames(message),
                length = properties.length;

            error.message = '';
            error = Object.create(error);

            for (var i = 0; i < length; ++i) {
                (<any>error)[properties[i]] = message[properties[i]];
            }

            (<any>error).stack = message.stack;
            (<any>error).code = message.code;
        }

        var ErrorEvent: events.IErrorEventStatic = acquire(__ErrorEventStatic);

        ErrorEvent.dispatch(__error, Exception, error, isFatal);

        if (isFatal) {
            if (message instanceof Error) {
                throw message;
            }

            throw error;
        }
    }
}
