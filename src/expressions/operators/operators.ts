/// <reference path="../../references.d.ts" />

/* tslint:disable:no-unused-variable */
/**
 * @name OPERATORS
 * @memberof plat.expressions
 * @kind property
 * @access private
 * @static
 * @readonly
 * @exported false
 * 
 * @type {plat.IObject<plat.expressions.ITokenDetails>}
 * 
 * @description
 * An object used to create {@link plat.expressions.ITokenDetails|ITokenDetails} for every operator.
 */
var OPERATORS: plat.IObject<plat.expressions.ITokenDetails> = {
    'u+': {
        precedence: 4, associativity: 'rtl',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any): any => +a(context, aliases)
    },
    '+': {
        precedence: 6, associativity: 'ltr',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): any => a(context, aliases) + b(context, aliases)
    },
    'u-': {
        precedence: 4, associativity: 'rtl',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any): any => -a(context, aliases)
    },
    '-': {
        precedence: 6, associativity: 'ltr',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): any => a(context, aliases) - b(context, aliases)
    },
    '*': {
        precedence: 5, associativity: 'ltr',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): any => a(context, aliases) * b(context, aliases)
    },
    '/': {
        precedence: 5, associativity: 'ltr',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): any => a(context, aliases) / b(context, aliases)
    },
    '%': {
        precedence: 5, associativity: 'ltr',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): any => a(context, aliases) % b(context, aliases)
    },
    '?': {
        precedence: 15, associativity: 'rtl',
        fn: (): void => undefined
    },
    ':': {
        precedence: 15, associativity: 'rtl',
        fn: (): void => undefined
    },
    '>': {
        precedence: 8, associativity: 'ltr',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): any => a(context, aliases) > b(context, aliases)
    },
    '<': {
        precedence: 8, associativity: 'ltr',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): any => a(context, aliases) < b(context, aliases)
    },
    '!': {
        precedence: 4, associativity: 'rtl',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any): any => !a(context, aliases)
    },
    '~': {
        precedence: 4, associativity: 'rtl',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any): any => ~a(context, aliases)
    },
    '&': {
        precedence: 10, associativity: 'ltr',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): any => a(context, aliases) & b(context, aliases)
    },
    '|': {
        precedence: 12, associativity: 'ltr',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): any => a(context, aliases) | b(context, aliases)
    },
    '>>': {
        precedence: 7, associativity: 'ltr',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): any => a(context, aliases) >> b(context, aliases)
    },
    '<<': {
        precedence: 7, associativity: 'ltr',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): any => a(context, aliases) << b(context, aliases)
    },
    '>>>': {
        precedence: 7, associativity: 'ltr',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): any => a(context, aliases) >>> b(context, aliases)
    },
    '&&': {
        precedence: 13, associativity: 'ltr',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): any => a(context, aliases) && b(context, aliases)
    },
    '||': {
        precedence: 14, associativity: 'ltr',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): any => a(context, aliases) || b(context, aliases)
    },
    '==': {
        precedence: 9, associativity: 'ltr',
        /* tslint:disable:triple-equals */
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): any => a(context, aliases) == b(context, aliases)
        /* tslint:enable:triple-equals */
    },
    '===': {
        precedence: 9, associativity: 'ltr',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): any => a(context, aliases) === b(context, aliases)
    },
    '!=': {
        precedence: 9, associativity: 'ltr',
        /* tslint:disable:triple-equals */
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): any => a(context, aliases) != b(context, aliases)
        /* tslint:enable:triple-equals */
    },
    '!==': {
        precedence: 9, associativity: 'ltr',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): any => a(context, aliases) !== b(context, aliases)
    },
    '>=': {
        precedence: 8, associativity: 'ltr',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): any => a(context, aliases) >= b(context, aliases)
    },
    '<=': {
        precedence: 8, associativity: 'ltr',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): any => a(context, aliases) <= b(context, aliases)
    },
    '=': {
        precedence: 17, associativity: 'rtl',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): void => {
            var _log: plat.debug.Log = plat.acquire(__Log);
            _log.error(new Error('Assignment operators are not supported'));
        }
    },
    '++': {
        precedence: 3, associativity: '',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any): void => {
            var _log: plat.debug.Log = plat.acquire(__Log);
            _log.error(new Error('Assignment operators are not supported'));
        }
    },
    '--': {
        precedence: 3, associativity: '',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any): void => {
            var _log: plat.debug.Log = plat.acquire(__Log);
            _log.error(new Error('Assignment operators are not supported'));
        }
    },
    '+=': {
        precedence: 17, associativity: 'rtl',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): void => {
            var _log: plat.debug.Log = plat.acquire(__Log);
            _log.error(new Error('Assignment operators are not supported'));
        }
    },
    '-=': {
        precedence: 17, associativity: 'rtl',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): void => {
            var _log: plat.debug.Log = plat.acquire(__Log);
            _log.error(new Error('Assignment operators are not supported'));
        }
    },
    '*=': {
        precedence: 17, associativity: 'rtl',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): void => {
            var _log: plat.debug.Log = plat.acquire(__Log);
            _log.error(new Error('Assignment operators are not supported'));
        }
    },
    '/=': {
        precedence: 17, associativity: 'rtl',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): void => {
            var _log: plat.debug.Log = plat.acquire(__Log);
            _log.error(new Error('Assignment operators are not supported'));
        }
    },
    '%=': {
        precedence: 17, associativity: 'rtl',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): void => {
            var _log: plat.debug.Log = plat.acquire(__Log);
            _log.error(new Error('Assignment operators are not supported'));
        }
    }
};

/**
 * @name ACCESSORS
 * @memberof plat.expressions
 * @kind property
 * @access private
 * @static
 * @readonly
 * @exported false
 * 
 * @type {plat.IObject<plat.expressions.ITokenDetails>}
 * 
 * @description
 * An object used to create {@link plat.expressions.ITokenDetails|ITokenDetails} for every accessor.
 */
var ACCESSORS: plat.IObject<plat.expressions.ITokenDetails> = {
    '()': { precedence: 2, associativity: null, fn: null },
    '[]': { precedence: 2, associativity: null, fn: null },
    '.': { precedence: 2, associativity: null, fn: null },
    '{}': { precedence: 1, associativity: null, fn: null }
};

/**
 * @name DELIMITERS
 * @memberof plat.expressions
 * @kind property
 * @access private
 * @static
 * @readonly
 * @exported false
 * 
 * @type {plat.IObject<plat.expressions.ITokenDetails>}
 * 
 * @description
 * An object used to create {@link plat.expressions.ITokenDetails|ITokenDetails} for every delimiter.
 */
var DELIMITERS: plat.IObject<plat.expressions.ITokenDetails> = {
    '{': { precedence: 1, associativity: null, fn: null },
    '}': { precedence: 1, associativity: null, fn: null },
    '[': { precedence: 2, associativity: null, fn: null },
    ']': { precedence: 2, associativity: null, fn: null },
    '(': { precedence: 2, associativity: null, fn: null },
    ')': { precedence: 2, associativity: null, fn: null },
    '.': { precedence: 2, associativity: null, fn: null },
    ',': { precedence: 18, associativity: null, fn: null },
    '\'': { precedence: 0, associativity: null, fn: null },
    '"': { precedence: 0, associativity: null, fn: null }
};

/**
 * @name KEYWORDS
 * @memberof plat.expressions
 * @kind property
 * @access private
 * @static
 * @readonly
 * @exported false
 * 
 * @type {plat.IObject<plat.expressions.ITokenDetails>}
 * 
 * @description
 * An object used to get literal values from string values of false, true, and undefined
 */
var KEYWORDS: plat.IObject<any> = {
    false: false,
    true: true,
    null: null,
    undefined: 'undefined'
};

/**
 * @name isDelimiter
 * @memberof plat.expressions
 * @kind function
 * @access private
 * @static
 * @exported false
 * 
 * @description
 * Checks if a string is in the {@link plat.expressions.DELIMITERS|DELIMITERS} array.
 * 
 * @param {string} key The string to index into the DELIMITERS array.
 * 
 * @returns {boolean} Whether or not the key is a delimiter.
 */
function isDelimiter(key: string): boolean {
    return !isNull(DELIMITERS[key]);
}

/**
 * @name isAccessor
 * @memberof plat.expressions
 * @kind function
 * @access private
 * @static
 * @exported false
 * 
 * @description
 * Checks if a string is in the {@link plat.expressions.ACCESSORS|ACCESSORS} array.
 * 
 * @param {string} key The string to index into the ACCESSORS array.
 * 
 * @returns {boolean} Whether or not the key is a accessor.
 */
function isAccessor(key: string): boolean {
    return !isNull(ACCESSORS[key]);
}

/**
 * @name isOperator
 * @memberof plat.expressions
 * @kind function
 * @access private
 * @static
 * @exported false
 * 
 * @description
 * Checks if a string is in the {@link plat.expressions.OPERATORS|OPERATORS} array.
 * 
 * @param {string} key The string to index into the OPERATORS array.
 * 
 * @returns {boolean} Whether or not the key is a operator.
 */
function isOperator(key: string): boolean {
    return !isNull(OPERATORS[key]);
}

/**
 * @name isKeyword
 * @memberof plat.expressions
 * @kind function
 * @access private
 * @static
 * @exported false
 * 
 * @description
 * Checks if a string is in the {@link plat.expressions.KEYWORDS|KEYWORDS} array.
 * 
 * @param {string} key The string to index into the KEYWORDS array.
 * 
 * @returns {boolean} Whether or not the key is a keyword.
 */
function isKeyword(key: string): boolean {
    return !isUndefined(KEYWORDS[key]);
}
/* tslint:enable:no-unused-variable */
