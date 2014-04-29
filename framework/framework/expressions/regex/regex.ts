module plat.expressions {
    /**
     * A class for keeping track of commonly used regular expressions.
     */
    export class Regex implements IRegex {
        /**
         * The regular expression for matching or removing all newline characters.
         */
        get newLineRegex() {
            return /\n|\r/g;
        }

        /**
         * The regular expression for finding markup in a string.
         */
        get markupRegex() {
            return /{{[\S\s]*}}/;
        }

        /**
         * Finds the arguments in a method expression
         * 
         * @example 
         *   // outputs ["('foo', 'bar', 'baz')", "'foo', 'bar', 'baz'"]
         *   exec("myFunction('foo', 'bar', 'baz')");
         */
        get argumentRegex() {
            return /\((.*)\)/;
        }

        /**
         * Given a string, finds the root alias name if that string is an 
         * alias path.
         * 
         * @example
         *   // outputs ['context']
         *   exec('@context.foo');
         * 
         * @example
         *   // outputs null
         *   exec('@context');
         */
        get aliasRegex() {
            return /[^@\.\[\(]+(?=[\.\[\(])/;
        }

        /**
         * Finds optional parameters in a route string.
         * 
         * @example
         *   // outputs ['(/foo)', '/foo']
         *   exec('(/foo)/bar');
         * 
         * @example
         *  // outputs ['(/foo)', '/foo']
         *  exec('(/foo))');
         */
        get optionalRouteRegex() {
            return /\((.*?)\)/g;
        }

        /**
         * Finds named parameters in a route string.
         * 
         * @example
         *   // outputs [':foo']
         *   exec('/:foo/bar')
         * 
         *   // outputs [':foo']
         *   exec('(/:foo)/bar');
         */
        get namedParameterRouteRegex() {
            return /(\(\?)?:\w+/g;
        }

        /**
         * Finds an alphanumeric wildcard match in a route string.
         * 
         * @example
         *   // outputs ['*bar']
         *   exec('/foo/*bar/baz')
         */
        get wildcardRouteRegex() {
            return /\*\w*/g;
        }

        /**
         * Finds invalid characters in a route string.
         * 
         * @example
         *  // outputs ['?']
         *  exec('/foo/bar?query=baz');
         */
        get escapeRouteRegex() {
            return /[\-{}\[\]+?.,\\\^$|#\s]/g;
        }

        /**
         * Finds '/*.html' or '/*.htm' in a url. Useful for removing 
         * the html file out of the url.
         * 
         * @example
         *   // outputs ['/index.html']
         *   exec('http://localhost:8080/index.html');
         */
        get initialUrlRegex() {
            return /\/[^\/]*\.(?:html|htm)/;
        }

        /**
         * Finds a protocol delimeter in a string (i.e. ://)
         */
        get protocolRegex() {
            return /:\/\//;
        }

        /**
         * Finds delimeters for spinal-case, snake_case, and dot.case. 
         * useful for converting to camelCase. Also can turn a string 
         * into camelCase with space as a delimeter.
         * 
         * @example
         *   // outputs ['-o', '-', 'o']
         *   exec('plat-options')
         * 
         * @example
         *   // outputs ['.c', '.', 'c']
         *   exec('plat.config')
         * 
         * @example
         *   // outputs ['_v', '_', 'v']
         *   exec('plat_var')
         * 
         * @example
         *   // outputs [' W', ' ', 'W']
         *   exec('Hello World')
         */
        get camelCaseRegex() {
            return /([\-_\.\s])(\w+?)/g;
        }

        /**
         * Finds all whitespace and newline characters 
         * not in string literals. Needs to be combined 
         * with string replace function using $1 argument.
         */
        get whiteSpaceRegex() {
            return /("[^"]*?"|'[^']*?')|[\s\r\n\t\v]/g;
        }

        /**
         * Finds all single and double quotes.
         */
        get quotationRegex() {
            return /'|"/g;
        }

        /**
         * Looks for any invalid variable syntax.
         */
        get invalidVariableRegex() {
            return /[^a-zA-Z0-9@_$]/;
        }
    }

    register.injectable('$regex', Regex);

    /**
     * The intended external interface for the ‘$regex’ injectable.
     */
    export interface IRegex {
        /**
         * The regular expression for matching or removing all newline characters.
         */
        newLineRegex: RegExp;

        /**
         * The regular expression for finding markup in a string.
         */
        markupRegex: RegExp;

        /**
         * Finds the arguments in a method expression
         *
         * @example
         *   // outputs ["('foo', 'bar', 'baz')", "'foo', 'bar', 'baz'"]
         *   exec("myFunction('foo', 'bar', 'baz')");
         */
        argumentRegex: RegExp;

        /**
         * Given a string, finds the root alias name if that string is an
         * alias path.
         *
         * @example
         *   // outputs ['context']
         *   exec('@context.foo');
         *
         * @example
         *   // outputs null
         *   exec('@context');
         */
        aliasRegex: RegExp;

        /**
         * Finds optional parameters in a route string.
         *
         * @example
         *   // outputs ['(/foo)', '/foo']
         *   exec('(/foo)/bar');
         *
         * @example
         *  // outputs ['(/foo)', '/foo']
         *  exec('(/foo))');
         */
        optionalRouteRegex: RegExp;

        /**
         * Finds named parameters in a route string.
         *
         * @example
         *   // outputs [':foo']
         *   exec('/:foo/bar')
         *
         *   // outputs [':foo']
         *   exec('(/:foo)/bar');
         */
        namedParameterRouteRegex: RegExp;

        /**
         * Finds an alphanumeric wildcard match in a route string.
         *
         * @example
         *   // outputs ['*bar']
         *   exec('/foo/*bar/baz')
         */
        wildcardRouteRegex: RegExp;

        /**
         * Finds invalid characters in a route string.
         *
         * @example
         *  // outputs ['?']
         *  exec('/foo/bar?query=baz');
         */
        escapeRouteRegex: RegExp;

        /**
         * Finds '/*.html' or '/*.htm' in a url. Useful for removing 
         * the html file out of the url.
         * 
         * @example
         *   // outputs ['/index.html']
         *   exec('http://localhost:8080/index.html');
         */
        initialUrlRegex: RegExp;

        /**
         * Finds a protocol delimeter in a string (i.e. ://)
         */
        protocolRegex: RegExp;

        /**
         * Finds delimeters for spinal-case, snake_case, and dot.case.
         * useful for converting to camelCase. Also can turn a string
         * into camelCase with space as a delimeter.
         *
         * @example
         *   // outputs ['-o', '-', 'o']
         *   exec('plat-options')
         *
         * @example
         *   // outputs ['.c', '.', 'c']
         *   exec('plat.config')
         *
         * @example
         *   // outputs ['_v', '_', 'v']
         *   exec('plat_var')
         *
         * @example
         *   // outputs [' W', ' ', 'W']
         *   exec('Hello World')
         */
        camelCaseRegex: RegExp;

        /**
         * Finds all whitespace and newline characters 
         * not in string literals. Needs to be combined 
         * with string replace function using $1 argument.
         */
        whiteSpaceRegex: RegExp;

        /**
         * Finds all single and double quotes.
         */
        quotationRegex: RegExp;

        /**
         * Looks for any invalid variable syntax.
         */
        invalidVariableRegex: RegExp;
    }
}
