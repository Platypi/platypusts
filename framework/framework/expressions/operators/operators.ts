/* tslint:disable:no-unused-variable */
/**
 * An object used to create ITokenDetails for every operator.
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
        fn: (context: any, aliases: any): void => undefined
    },
    ':': {
        precedence: 15, associativity: 'rtl',
        fn: (context: any, aliases: any): void => undefined
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
            var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
            $exception.fatal('Assignment operators are not supported', $exception.PARSE);
        }
    },
    '++': {
        precedence: 3, associativity: '',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any): void => {
            var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
            $exception.fatal('Assignment operators are not supported', $exception.PARSE);
        }
    },
    '--': {
        precedence: 3, associativity: '',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any): void => {
            var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
            $exception.fatal('Assignment operators are not supported', $exception.PARSE);
        }
    },
    '+=': {
        precedence: 17, associativity: 'rtl',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): void => {
            var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
            $exception.fatal('Assignment operators are not supported', $exception.PARSE);
        }
    },
    '-=': {
        precedence: 17, associativity: 'rtl',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): void => {
            var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
            $exception.fatal('Assignment operators are not supported', $exception.PARSE);
        }
    },
    '*=': {
        precedence: 17, associativity: 'rtl',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): void => {
            var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
            $exception.fatal('Assignment operators are not supported', $exception.PARSE);
        }
    },
    '/=': {
        precedence: 17, associativity: 'rtl',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): void => {
            var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
            $exception.fatal('Assignment operators are not supported', $exception.PARSE);
        }
    },
    '%=': {
        precedence: 17, associativity: 'rtl',
        fn: (context: any, aliases: any,
            a: (context: any, aliases: any) => any,
            b: (context: any, aliases: any) => any): void => {
            var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
            $exception.fatal('Assignment operators are not supported', $exception.PARSE);
        }
    }
};

/**
 * An object used to create ITokenDetails for every accessor.
 */
var ACCESSORS: plat.IObject<plat.expressions.ITokenDetails> = {
    '()': { precedence: 2, associativity: null, fn: null },
    '[]': { precedence: 2, associativity: null, fn: null },
    '.': { precedence: 2, associativity: null, fn: null },
    '{}': { precedence: 1, associativity: null, fn: null }
};

/**
 * An object used to create ITokenDetails for every delimiter.
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
 * An object used to get literal values from string values of false, true, and undefined
 */
var KEYWORDS: plat.IObject<any> = {
    false: false,
    true: true,
    null: null,
    undefined: 'undefined'
};

/**
 * Checks if a string is in the DELIMITERS array.
 * 
 * @param key The string to index into the DELIMITERS array.
 * @returns {Boolean}
 */
function isDelimiter(key: string): boolean {
    return !isNull(DELIMITERS[key]);
}


/**
 * Checks if a string is in the ACCESSORS array.
 * 
 * @param key The string to index into the ACCESSORS array.
 * @returns {Boolean}
 */
function isAccessor(key: string): boolean {
    return !isNull(ACCESSORS[key]);
}


/**
 * Checks if a string is in the OPERATORS array.
 * 
 * @param key The string to index into the OPERATORS array.
 * @returns {Boolean}
 */
function isOperator(key: string): boolean {
    return !isNull(OPERATORS[key]);
}


/**
 * Checks if a string is in the KEYWORDS array.
 * 
 * @param key The string to index into the KEYWORDS array.
 * @returns {Boolean}
 */
function isKeyword(key: string): boolean {
    return !isUndefined(KEYWORDS[key]);
}
/* tslint:enable:no-unused-variable */
