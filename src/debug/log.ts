/**
 * @name debug
 * @memberof plat
 * @kind namespace
 * @access public
 * 
 * @description
 * Holds all classes and interfaces related to debugging components in platypus.
 */
module plat.debug {
    'use strict';

    /**
     * @name Log
     * @memberof plat.debug
     * @kind class
     * 
     * @description
     * Handles all logging/debugging for the framework. All logs will be bubbled up to the 
     * {@link plat.App.error|App.error} event to allow for easy debugging.
     */
    export class Log {
        /**
         * @name ERROR
         * @memberof plat.debug.Log
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * The ERROR log level
         */
        ERROR: number = 5;

        /**
         * @name WARN
         * @memberof plat.debug.Log
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * The WARN log level
         */
        WARN: number = 4;

        /**
         * @name INFO
         * @memberof plat.debug.Log
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * The INFO log level
         */
        INFO: number = 3;

        /**
         * @name DEBUG
         * @memberof plat.debug.Log
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * The DEBUG log level
         */
        DEBUG: number = 2;

        /**
         * @name TRACE
         * @memberof plat.debug.Log
         * @kind property
         * @access public
         * @readonly
         * 
         * @type {number}
         * 
         * @description
         * The TRACE log level
         */
        TRACE: number = 1;

        /**
         * @name _level
         * @memberof plat.debug.Log
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * A configurable log level (defaults to INFO). Any logs sent below this 
         * will be silent.
         */
        protected _level: number = this.INFO;

        /**
         * @name _ErrorEvent
         * @memberof plat.debug.Log
         * @kind property
         * @access protected
         * 
         * @type {plat.events.IErrorEventStatic}
         * 
         * @description
         * The {@link plat.events.IErrorEventStatic|IErrorEventStatic} injectable instance
         */
        protected _ErrorEvent: events.IErrorEventStatic;

        /**
         * @name error
         * @memberof plat.debug.Log
         * @kind function
         * @access public
         * 
         * @description
         * Logs fatal errors. This will throw the error after it is logged.
         * 
         * @param {Error} error The error to log.
         * 
         * @returns {void}
         */
        error(error: Error): void {
            this._log(error, this.ERROR);
            throw error;
        }

        /**
         * @name warn
         * @memberof plat.debug.Log
         * @kind function
         * @access public
         * @variation 0
         * 
         * @description
         * Logs at the warn level.
         * 
         * @param {string} message The message to log.
         * 
         * @returns {void}
         */
        warn(message: string): void;
        /**
         * @name warn
         * @memberof plat.debug.Log
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Logs at the warn level.
         * 
         * @param {Error} message The message to log.
         * 
         * @returns {void}
         */
        warn(message: Error): void;
        warn(message: any): void {
            this._log(message, this.WARN);
        }

        /**
         * @name info
         * @memberof plat.debug.Log
         * @kind function
         * @access public
         * variation 0
         * 
         * @description
         * Logs at the info level.
         * 
         * @param {string} message The message to log.
         * 
         * @returns {void}
         */
        info(message: string): void;
        /**
         * @name info
         * @memberof plat.debug.Log
         * @kind function
         * @access public
         * variation 1
         * 
         * @description
         * Logs at the info level.
         * 
         * @param {string} message The message to log.
         * 
         * @returns {void}
         */
        info(message: Error): void;
        info(message: any): void {
            this._log(message, this.INFO);
        }

        /**
         * @name debug
         * @memberof plat.debug.Log
         * @kind function
         * @access public
         * variation 0
         * 
         * @description
         * Logs at the debug level.
         * 
         * @param {string} message The message to log.
         * 
         * @returns {void}
         */
        debug(message: string): void;
        /**
         * @name debug
         * @memberof plat.debug.Log
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Logs at the debug level.
         * 
         * @param {string} message The message to log.
         * 
         * @returns {void}
         */
        debug(message: Error): void;
        debug(message: any): void {
            this._log(message, this.DEBUG);
        }

        /**
         * @name trace
         * @memberof plat.debug.Log
         * @kind function
         * @access public
         * variation 0
         * 
         * @description
         * Logs at the trace level.
         * 
         * @param {string} message The message to log.
         * 
         * @returns {void}
         */
        trace(message: string): void;
        /**
         * @name trace
         * @memberof plat.debug.Log
         * @kind function
         * @access public
         * variation 1
         * 
         * @description
         * Logs at the trace level.
         * 
         * @param {string} message The message to log.
         * 
         * @returns {void}
         */
        trace(message: Error): void;
        trace(message: any): void {
            this._log(message, this.TRACE);
        }

        /**
         * @name setLogLevel
         * @memberof plat.debug.Log
         * @kind function
         * @access public
         * variation 0
         * 
         * @description
         * Sets the log level level.
         * 
         * @param {number} level The log level to set.
         * 
         * @returns {void}
         */
        setLogLevel(level: number): void;
        /**
         * @name setLogLevel
         * @memberof plat.debug.Log
         * @kind function
         * @access public
         * @variation 1
         * 
         * @description
         * Sets the log level level.
         * 
         * @param {string} level A string related to the log level to set (e.g. 'error'). It will be mapped to 
         * the proper number. If the corresponding number level is not found, {@link plat.debug.Log.INFO|INFO} 
         * will be used.
         * 
         * @returns {void}
         */
        setLogLevel(level: string): void;
        setLogLevel(level: any): void {
            if (isString(level)) {
                level = (<any>this)[(<string>level).toUpperCase()];
            }

            switch (level) {
                case this.ERROR:
                case this.WARN:
                case this.INFO:
                case this.DEBUG:
                case this.TRACE:
                    this._level = level;
                    break;
                default:
                    this._level = this.INFO;
            }
        }

        /**
         * @name _log
         * @memberof plat.debug.Log
         * @kind function
         * @access protected
         * variation 0
         * 
         * @description
         * Dispatches an {@link plat.events.ErrorEvent|ErrorEvent} to the app.
         * 
         * param {string} message The message to send
         * @param {number} level The log level denoting the severity of the message.
         * param {boolean} isFatal? Whether or not the severity of the error is fatal.
         * 
         * @returns {void}
         */
        protected _log(message: string, level: number, isFatal?: boolean): void;
        /**
         * @name _log
         * @memberof plat.debug.Log
         * @kind function
         * @access protected
         * variation 1
         * 
         * @description
         * Dispatches an {@link plat.events.ErrorEvent|ErrorEvent} to the app.
         * 
         * param {Error} message The message to send
         * @param {number} level The log level denoting the severity of the message.
         * 
         * @returns {void}
         */
        protected _log(message: Error, level: number): void;
        protected _log(message: any, level: number): void {
            if (!this._shouldLog(level)) {
                return;
            }

            if (isString(message)) {
                message = new Error(message);
            }
            var _ErrorEvent = this._ErrorEvent;

            if(isNull(_ErrorEvent)) {
                _ErrorEvent = this._ErrorEvent = acquire(__ErrorEventStatic);
            }

            _ErrorEvent.dispatch(__error, Log, message, level);
        }

        /**
         * @name _shouldLog
         * @memberof plat.debug.Log
         * @kind function
         * @access protected
         * 
         * @description
         * Detemines whether or not a log level is at or above the current minimum log level.
         * 
         * @param {number} level The log level to check against the current minimum log level.
         * 
         * @returns {void}
         */
        protected _shouldLog(level: number): boolean {
            if (!isNumber(level)) {
                level = this.INFO;
            }

            return this._level < level;
        }
    }

    register.injectable(__Log, Log);
}
