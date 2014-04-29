/**
 * An object used to create ITokenDetails for every operator.
 */
var OPERATORS: plat.IObject<plat.expressions.ITokenDetails> = {
    'u+': {
        precedence: 4, associativity: 'rtl',
        fn: function unaryPlus(context, aliases, a) { return +a(context, aliases); }
    },
    '+': {
        precedence: 6, associativity: 'ltr',
        fn: function add(context, aliases, a, b) { return a(context, aliases) + b(context, aliases); }
    },
    'u-': {
        precedence: 4, associativity: 'rtl',
        fn: function unaryMinus(context, aliases, a) { return -a(context, aliases); }
    },
    '-': {
        precedence: 6, associativity: 'ltr',
        fn: function subtract(context, aliases, a, b) { return a(context, aliases) - b(context, aliases); }
    },
    '*': {
        precedence: 5, associativity: 'ltr',
        fn: function multiply(context, aliases, a, b) { return a(context, aliases) * b(context, aliases); }
    },
    '/': {
        precedence: 5, associativity: 'ltr',
        fn: function divide(context, aliases, a, b) { return a(context, aliases) / b(context, aliases); }
    },
    '%': {
        precedence: 5, associativity: 'ltr',
        fn: function modulus(context, aliases, a, b) { return a(context, aliases) % b(context, aliases); }
    },
    '?': {
        precedence: 15, associativity: 'rtl',
        fn: function question(context, aliases) { }
    },
    ':': {
        precedence: 15, associativity: 'rtl',
        fn: function colon(context, aliases) { }
    },
    '>': {
        precedence: 8, associativity: 'ltr',
        fn: function greaterThan(context, aliases, a, b) { return a(context, aliases) > b(context, aliases); }
    },
    '<': {
        precedence: 8, associativity: 'ltr',
        fn: function lessThan(context, aliases, a, b) { return a(context, aliases) < b(context, aliases); }
    },
    '!': {
        precedence: 4, associativity: 'rtl',
        fn: function logicalNot(context, aliases, a) { return !a(context, aliases); }
    },
    '~': {
        precedence: 4, associativity: 'rtl',
        fn: function bitwiseNot(context, aliases, a) { return ~a(context, aliases); }
    },
    '&': {
        precedence: 10, associativity: 'ltr',
        fn: function bitwiseAnd(context, aliases, a, b) { return a(context, aliases) & b(context, aliases); }
    },
    '|': {
        precedence: 12, associativity: 'ltr',
        fn: function bitwiseOr(context, aliases, a, b) { return a(context, aliases) | b(context, aliases); }
    },
    '>>': {
        precedence: 7, associativity: 'ltr',
        fn: function bitwiseShiftRight(context, aliases, a, b) { return a(context, aliases) >> b(context, aliases); }
    },
    '<<': {
        precedence: 7, associativity: 'ltr',
        fn: function bitwiseShiftLeft(context, aliases, a, b) { return a(context, aliases) << b(context, aliases); }
    },
    '>>>': {
        precedence: 7, associativity: 'ltr',
        fn: function bitwiseUnsignedShiftRight(context, aliases, a, b) { return a(context, aliases) >>> b(context, aliases); }
    },
    '&&': {
        precedence: 13, associativity: 'ltr',
        fn: function logicalAnd(context, aliases, a, b) { return a(context, aliases) && b(context, aliases); }
    },
    '||': {
        precedence: 14, associativity: 'ltr',
        fn: function logicalOr(context, aliases, a, b) { return a(context, aliases) || b(context, aliases); }
    },
    '==': {
        precedence: 9, associativity: 'ltr',
        /* tslint:disable:triple-equals */
        fn: function isEquivalent(context, aliases, a, b) { return a(context, aliases) == b(context, aliases); }
        /* tslint:enable:triple-equals */
    },
    '===': {
        precedence: 9, associativity: 'ltr',
        fn: function is(context, aliases, a, b) { return a(context, aliases) === b(context, aliases); }
    },
    '!=': {
        precedence: 9, associativity: 'ltr',
        /* tslint:disable:triple-equals */
        fn: function isNotEquivalent(context, aliases, a, b) { return a(context, aliases) != b(context, aliases); }
        /* tslint:enable:triple-equals */
    },
    '!==': {
        precedence: 9, associativity: 'ltr',
        fn: function isNot(context, aliases, a, b) { return a(context, aliases) !== b(context, aliases); }
    },
    '>=': {
        precedence: 8, associativity: 'ltr',
        fn: function greaterThanOrEqual(context, aliases, a, b) { return a(context, aliases) >= b(context, aliases); }
    },
    '<=': {
        precedence: 8, associativity: 'ltr',
        fn: function lessThanOrEqual(context, aliases, a, b) { return a(context, aliases) <= b(context, aliases); }
    },
    '=': {
        precedence: 17, associativity: 'rtl',
        fn: function equals(context, aliases, a, b) {
            var Exception: plat.IExceptionStatic = plat.acquire('$ExceptionStatic');
            Exception.fatal('Assignment operators are not supported', Exception.PARSE);
        }
    },
    '++': {
        precedence: 3, associativity: '',
        fn: function increment(context, aliases, a) {
            var Exception: plat.IExceptionStatic = plat.acquire('$ExceptionStatic');
            Exception.fatal('Assignment operators are not supported', Exception.PARSE);
        }
    },
    '--': {
        precedence: 3, associativity: '',
        fn: function decrement(context, aliases, a) {
            var Exception: plat.IExceptionStatic = plat.acquire('$ExceptionStatic');
            Exception.fatal('Assignment operators are not supported', Exception.PARSE);
        }
    },
    '+=': {
        precedence: 17, associativity: 'rtl',
        fn: function addAssignment(context, aliases, a, b) {
            var Exception: plat.IExceptionStatic = plat.acquire('$ExceptionStatic');
            Exception.fatal('Assignment operators are not supported', Exception.PARSE);
        }
    },
    '-=': {
        precedence: 17, associativity: 'rtl',
        fn: function subtractAssignment(context, aliases, a, b) {
            var Exception: plat.IExceptionStatic = plat.acquire('$ExceptionStatic');
            Exception.fatal('Assignment operators are not supported', Exception.PARSE);
        }
    },
    '*=': {
        precedence: 17, associativity: 'rtl',
        fn: function multiplyAssignment(context, aliases, a, b) {
            var Exception: plat.IExceptionStatic = plat.acquire('$ExceptionStatic');
            Exception.fatal('Assignment operators are not supported', Exception.PARSE);
        }
    },
    '/=': {
        precedence: 17, associativity: 'rtl',
        fn: function divideAssignment(context, aliases, a, b) {
            var Exception: plat.IExceptionStatic = plat.acquire('$ExceptionStatic');
            Exception.fatal('Assignment operators are not supported', Exception.PARSE);
        }
    },
    '%=': {
        precedence: 17, associativity: 'rtl',
        fn: function modulusAssignment(context, aliases, a, b) {
            var Exception: plat.IExceptionStatic = plat.acquire('$ExceptionStatic');
            Exception.fatal('Assignment operators are not supported', Exception.PARSE);
        }
    },
    '.': { precedence: 2, associativity: 'ltr', fn: function index(context, aliases, a, b) { return a[b]; } }
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
var KEYWORDS = {
    'false': false,
    'true': true,
    'null': null,
    'undefined': 'undefined'
};

/**
 * Checks if a string is in the DELIMITERS array.
 * 
 * @param key The string to index into the DELIMITERS array.
 * @return {Boolean}
 */
function isDelimiter(key: string) {
    return !isNull(DELIMITERS[key]);
}


/**
 * Checks if a string is in the ACCESSORS array.
 * 
 * @param key The string to index into the ACCESSORS array.
 * @return {Boolean}
 */
function isAccessor(key: string) {
    return !isNull(ACCESSORS[key]);
}


/**
 * Checks if a string is in the OPERATORS array.
 * 
 * @param key The string to index into the OPERATORS array.
 * @return {Boolean}
 */
function isOperator(key: string) {
    return !isNull(OPERATORS[key]);
}


/**
 * Checks if a string is in the KEYWORDS array.
 * 
 * @param key The string to index into the KEYWORDS array.
 * @return {Boolean}
 */
function isKeyword(key: string) {
    return !isUndefined(KEYWORDS[key]);
}
