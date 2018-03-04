/**
 * @name debug
 * @memberof plat
 * @kind namespace
 * @access public
 *
 * @description
 * Holds all classes and interfaces related to debugging components in platypus.
 */
namespace plat.debug {
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
        public ERROR: number = 5;

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
        public WARN: number = 4;

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
        public INFO: number = 3;

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
        public DEBUG: number = 2;

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
        public TRACE: number = 1;

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
        public error(error: Error): void {
            this._log(error, this.ERROR);
            throw error;
        }

        /**
         * @name warn
         * @memberof plat.debug.Log
         * @kind function
         * @access public
         *
         * @description
         * Logs at the warn level.
         *
         * @param {Error} message The message to log.
         *
         * @returns {void}
         */
        public warn(message: string | Error): void {
            this._log(message, this.WARN);
        }

        /**
         * @name info
         * @memberof plat.debug.Log
         * @kind function
         * @access public
         *
         * @description
         * Logs at the info level.
         *
         * @param {string} message The message to log.
         *
         * @returns {void}
         */
        public info(message: string | Error): void {
            this._log(message, this.INFO);
        }

        /**
         * @name debug
         * @memberof plat.debug.Log
         * @kind function
         * @access public
         *
         * @description
         * Logs at the debug level.
         *
         * @param {string} message The message to log.
         *
         * @returns {void}
         */
        public debug(message: string | Error): void {
            this._log(message, this.DEBUG);
        }

        /**
         * @name trace
         * @memberof plat.debug.Log
         * @kind function
         * @access public
         *
         * @description
         * Logs at the trace level.
         *
         * @param {string} message The message to log.
         *
         * @returns {void}
         */
        public trace(message: string | Error): void {
            this._log(message, this.TRACE);
        }

        /**
         * @name setLogLevel
         * @memberof plat.debug.Log
         * @kind function
         * @access public
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
        public setLogLevel(level: number | string): void {
            if (isString(level)) {
                level = (<any>this)[(<string>level).toUpperCase()];
            }

            switch (level) {
                case this.ERROR:
                case this.WARN:
                case this.INFO:
                case this.DEBUG:
                case this.TRACE:
                    this._level = <number>level;
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
         *
         * @description
         * Dispatches an {@link plat.events.ErrorEvent|ErrorEvent} to the app.
         *
         * param {Error} message The message to send
         * @param {number} level The log level denoting the severity of the message.
         *
         * @returns {void}
         */
        protected _log(message: string | Error, level: number): void {
            if (!this._shouldLog(level)) {
                return;
            }

            if (isString(message)) {
                message = new Error(<string>message);
            }
            let _ErrorEvent = this._ErrorEvent;

            if (isNull(_ErrorEvent)) {
                _ErrorEvent = this._ErrorEvent = acquire(__ErrorEventStatic);
            }

            _ErrorEvent.dispatch(__error, Log, <Error>message, level);
        }

        /**
         * @name _shouldLog
         * @memberof plat.debug.Log
         * @kind function
         * @access protected
         *
         * @description
         * Determines whether or not a log level is at or above the current minimum log level.
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
