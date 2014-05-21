module plat {
    /**
     * Manages the throwing and consuming of errors and warnings.
     */
    export class Exception {
        /**
         * Method for sending a warning to all listeners. Will 
         * not throw an error.
         * 
         * @param message The message to be sent to the listeners.
         * @param type Denotes the type of fatal exception.
         */
        static warn(message: string, type?: number): void {
            raise(message, type, false);
        }

        /**
         * Method for sending a fatal error to all listeners. Will
         * throw an error.
         * 
         * @param error The Error to be sent to all the listeners.
         * @param type Denotes the type of fatal exception. 
         */
        static fatal(error: Error, type?: number): void;
        /**
         * Method for sending a fatal message to all listeners. Will
         * throw an error.
         * 
         * @param message The message to be sent to all the listeners.
         * @param type Denotes the type of fatal exception.
         */
        static fatal(message: string, type?: number): void;
        static fatal(message: any, type?: number) {
            raise(message, type, true);
        }

        /**
         * Exception Type
         */
        static PARSE = 0;
        /**
         * Exception Type
         */
        static COMPILE = 1;
        /**
         * Exception Type
         */
        static BIND = 2;
        /**
         * Exception Type
         */
        static NAME = 3;
        /**
         * Exception Type
         */
        static NAVIGATION = 4;
        /**
         * Exception Type
         */
        static TEMPLATE = 5;
        /**
         * Exception Type
         */
        static AJAX = 6;
        /**
         * Exception Type
         */
        static CONTEXT = 7;
        /**
         * Exception Type
         */
        static EVENT = 8;
        /**
         * Exception Type
         */
        static INJECTABLE = 9;
        /**
         * Exception Type
         */
        static COMPAT = 10;
        /**
         * Exception Type
         */
        static PROMISE = 11;

    }

    /**
     * The intended external interface for the '$ExceptionStatic' injectable.
     */
    export interface IExceptionStatic {
        /**
         * Method for sending a warning to all listeners. Will
         * not throw an error.
         *
         * @param message The message to be sent to the listeners.
         * @param type Denotes the type of fatal exception.
         */
        warn(message: string, type?: number): void;

        /**
         * Method for sending a fatal error to all listeners. Will
         * throw an error.
         *
         * @param error The Error to be sent to all the listeners.
         * @param type Denotes the type of fatal exception.
         */
        fatal(error: Error, type?: number): void;
        /**
         * Method for sending a fatal message to all listeners. Will
         * throw an error.
         *
         * @param message The message to be sent to all the listeners.
         * @param type Denotes the type of fatal exception.
         */
        fatal(message: string, type?: number): void;

        /**
         * Exception Type
         */
        PARSE: number;
        /**
         * Exception Type
         */
        COMPILE: number;
        /**
         * Exception Type
         */
        BIND: number;
        /**
         * Exception Type
         */
        NAME: number;
        /**
         * Exception Type
         */
        NAVIGATION: number;
        /**
         * Exception Type
         */
        TEMPLATE: number;
        /**
         * Exception Type
         */
        AJAX: number;
        /**
         * Exception Type
         */
        CONTEXT: number;
        /**
         * Exception Type
         */
        EVENT: number;
        /**
         * Exception Type
         */
        INJECTABLE: number;
        /**
         * Exception Type
         */
        COMPAT: number;
        /**
         * Exception Type
         */
        PROMISE: number;
    }

    /**
     * The Type for referencing the '$ExceptionStatic' injectable as a dependency.
     */
    export function ExceptionStatic(): IExceptionStatic {
        return Exception;
    }

    register.injectable('$ExceptionStatic', ExceptionStatic, null, register.injectableType.STATIC);

    class PlatException {
        constructor(public message: string, public name: string) { }
    }

    class PlatError {
        message: string;
        name = 'PlatError';
        constructor(message?: string) {
            this.message = message || '';
        }
    }

    function setPrototypes(platError?: any): void {
        PlatError.prototype = platError || Error.prototype;
        PlatException.prototype = new PlatError();
    }

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
                error.name = 'ParsingError';
                break;
            case Exception.BIND:
                error.name = 'BindingError';
                break;
            case Exception.COMPILE:
                error.name = 'CompilingError';
                break;
            case Exception.NAME:
                error.name = 'PlatNameError';
                break;
            case Exception.NAVIGATION:
                error.name = 'NavigatingError';
                break;
            case Exception.TEMPLATE:
                error.name = 'TemplatingError';
                break;
            case Exception.CONTEXT:
                error.name = 'ContextError';
                break;
            case Exception.EVENT:
                error.name = 'DispatchEventError';
                break;
            case Exception.INJECTABLE:
                error.name = 'InjectableError';
                break;
            case Exception.COMPAT:
                error.name = 'CompatibilityError';
                break;
            default:
                error = new PlatError(message);
                break;
        }

        if (message instanceof Error) {
            var temp = message,
                properties = Object.getOwnPropertyNames(message),
                length = properties.length;

            error.message = '';
            error = Object.create(error);

            for (var i = 0; i < length; ++i) {
                (<any>error)[properties[i]] = message[properties[i]];
            }
        }
        var ErrorEvent: events.IErrorEventStatic = acquire('$ErrorEventStatic');

        ErrorEvent.dispatch('error', Exception, error);

        if (isFatal) {
            throw error;
        }
    }
}
