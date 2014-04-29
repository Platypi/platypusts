module plat.expressions {
    /**
     * Parses javascript expression strings and creates IParsedExpressions.
     */
    export class Parser implements IParser {
        /**
         * A single expression's token representation created by the Tokenizer.
         */
        _tokens: Array<IToken> = [];
        $tokenizer: ITokenizer = acquire('$tokenizer');
        $ExceptionStatic: IExceptionStatic = acquire('$ExceptionStatic');
        private __cache: IObject<IParsedExpression> = {};
        private __codeArray: Array<string> = [];
        private __identifiers: Array<string> = [];
        private __tempIdentifiers: Array<string> = [];
        private __aliases: Array<string> = [];
        private __uniqueAliases: IObject<boolean> = {};

        /**
         * Parses a string representation of a javascript expression and turns it
         * into an IParsedExpression.
         * 
         * @param input The string representation of a javascript expression.
         */
        parse(input: string): IParsedExpression {
            var parsedObject = this.__cache[input];
            if (!isNull(parsedObject)) {
                return parsedObject;
            }
            this._tokens = this.$tokenizer.createTokens(input);

            parsedObject = this._evaluate(input);

            var identifiers = parsedObject.identifiers;
            if (identifiers.length === 0) {
                var noModel = parsedObject.evaluate(null);
                parsedObject.evaluate = function evaluateNoContext() { return noModel; };
            }

            this.__cache[input] = parsedObject;

            return parsedObject;
        }

        /**
         * Evaluate the current token array.
         * 
         * @param input The input string to evaluate.
         */
        _evaluate(input: string): IParsedExpression {
            var tokens = this._tokens,
                length = tokens.length,
                tempIdentifiers = this.__tempIdentifiers,
                codeArray = this.__codeArray,
                codeStr = '',
                useLocalContext = false;

            for (var i = 0; i < length; i++) {
                var tokenObj = tokens[i],
                    token = tokenObj.val,
                    args = tokenObj.args;

                //check if its an accessor
                if (isAccessor(token)) {
                    var obj;
                    switch (token) {
                        case '()':
                            useLocalContext = this.__handleFunction(i, args, useLocalContext);
                            break;
                        case '{}':
                            codeArray.push(this.__convertObject(args));
                            tempIdentifiers.push('.');
                            break;
                        default:
                            //handle empty array
                            if (args < 0) {
                                codeArray.push('[]');
                                tempIdentifiers.push('.');
                                //handle array literal
                            } else if (args > 0) {
                                codeArray.push(this.__convertArrayLiteral(args));
                                tempIdentifiers.push('.');
                            } else {
                                useLocalContext = this.__indexIntoObject(i, useLocalContext);
                            }
                            break;
                    }
                    //check if its an operator
                } else if (isOperator(token)) {
                    switch (token) {
                        case '?':
                            this.__handleQuestion();
                            break;
                        case ':':
                            this.__handleColon();
                            break;
                        case '+':
                        case '-':
                            if (args === 1) {
                                token = 'u' + token;
                            }
                        default:
                            this.__handleOperator(token, args);
                            break;
                    }
                    // its either function, object, or primitive
                } else {
                    //potential function or object to index into
                    if (args < 0) {
                        codeStr = this.__convertFunction(i, token, useLocalContext);
                        // primitive
                    } else {
                        codeStr = this.__convertPrimitive(i, token, args);
                    }
                    codeArray.push(codeStr);
                }
            }

            // move the rest of the tempIdentifiers to the identifiers
            this._popRemainingIdentifiers();
            // make the identifiers array unqiue entries only
            this._makeIdentifiersUnique();

            var parsedExpression: IParsedExpression = {
                evaluate: <(context: any, aliases?: any) => any>new Function('context', 'aliases',
                    'var initialContext;' +
                    'return ' + (codeArray.length === 0 ? ('"' + input + '"') : codeArray.join('')) + ';'),
                expression: input,
                identifiers: this.__identifiers.slice(0),
                aliases: this.__aliases.slice(0)
            };

            // reset parser's properties
            this._resetParser();

            return parsedExpression;
        }

        // PARSE CASES
        private __convertPrimitive(index: number, token: string, args: number) {
            var tokens = this._tokens,
                tempIdentifiers = this.__tempIdentifiers;

            if (args > 0) {
                tempIdentifiers.push('.');
                return token;
            } else {
                var castToken = Number(token),
                    castTokenIsNumberLike = isNumber(castToken),
                    peek1 = this._peek(index),
                    isPeekIndexer = peek1 && peek1.args < 1;

                if (isKeyword(token) ||
                    (isString(token) &&
                    (castTokenIsNumberLike ||
                    this._isValUnequal(peek1, '[]()') ||
                    (this._isValEqual(peek1, '[]') &&
                    !isPeekIndexer)))) {
                    tempIdentifiers.push('.');
                    return '"' + token + '"';
                } else {
                    if (!castTokenIsNumberLike ||
                        (this._isValEqual(peek1, '[].') &&
                        isPeekIndexer)) {
                        tempIdentifiers.push(token);
                    } else {
                        tempIdentifiers.push('.');
                    }
                    return token;
                }
            }
        }
        private __convertFunction(index: number, token: string, useLocalContext: boolean) {
            var tokens = this._tokens,
                tempIdentifiers = this.__tempIdentifiers,
                nextChar = this._peek(index);

            if (token[0] === '@' && isNull(this.__uniqueAliases[token])) {
                this.__uniqueAliases[token] = true;
                this.__aliases.push(token.slice(1));
            } else if (isKeyword(token)) {
                tempIdentifiers.push('.');
                return token;
            }

            tempIdentifiers.push(token);
            if (!isNull(nextChar)) {
                switch (nextChar.val) {
                    case '.':
                    case '()':
                        return token;
                    default:
                        if (!useLocalContext) {
                            return '(initialContext = (' + this.__findInitialContext.toString() + ')(context,aliases,"' + token + '"))';
                        }
                        break;
                }
            } else {
                return '(initialContext = (' + this.__findInitialContext.toString() + ')(context,aliases,"' + token + '"))';
            }
        }
        private __convertObject(args: number) {
            var identifiers = this.__identifiers,
                tempIdentifiers = this.__tempIdentifiers,
                codeArray = this.__codeArray,
                j = 0,
                key,
                codeStr = '{',
                tempIdentifier,
                temp;

            while (j++ < args) {
                temp = codeArray.pop();
                key = codeArray.pop();
                codeStr += ',"' + key + '":' + temp;

                if (tempIdentifiers.length > 1) {
                    tempIdentifier = tempIdentifiers.pop();
                    // pop the key's tempIdentifier
                    tempIdentifiers.pop();
                    if (tempIdentifier !== '.') {
                        identifiers.push(tempIdentifier);
                    }
                }
            }

            return codeStr.replace(',', '') + '}';
        }
        private __convertArrayLiteral(args: number) {
            var identifiers = this.__identifiers,
                tempIdentifiers = this.__tempIdentifiers,
                codeArray = this.__codeArray,
                j = 0,
                tempStr = '',
                codeStr = '[',
                tempIdentifier;

            while (j++ < args) {
                tempStr = codeArray.pop() + ',' + tempStr;

                if (tempIdentifiers.length > 0) {
                    tempIdentifier = tempIdentifiers.pop();
                    if (tempIdentifier !== '.') {
                        identifiers.push(tempIdentifier);
                    }
                }
            }

            codeStr += tempStr.slice(0, tempStr.length - 1) + ']';

            return codeStr;
        }

        // ACCESSORS
        private __handleFunction(index: number, args: number, useLocalContext: boolean) {
            var tokens = this._tokens,
                identifiers = this.__identifiers,
                tempIdentifiers = this.__tempIdentifiers,
                codeArray = this.__codeArray,
                j = 0,
                previousToken = tokens[index - 1],
                previousTokenIsFnName = (previousToken.args === -2),
                grabFnName = previousTokenIsFnName || this._isValEqual(previousToken, '[].'),
                tempStr = '',
                tempIdentifier,
                fnName = '',
                identifierFnName = '',
                codeStr,
                pushedIdentifier = false;

            if (grabFnName) {
                fnName = codeArray.pop();
                identifierFnName = tempIdentifiers.pop();
            }

            while (j++ < args) {
                tempStr = codeArray.pop() + ',' + tempStr;

                if (tempIdentifiers.length > 0) {
                    tempIdentifier = tempIdentifiers.pop();
                    if (tempIdentifier !== '.') {
                        identifiers.push(tempIdentifier);
                        pushedIdentifier = true;
                    }
                }
            }

            if (args > 0) {
                codeStr = '.call(initialContext || context,' + tempStr.slice(0, tempStr.length - 1) + ')';
            } else {
                codeStr = '.call(initialContext || context)';
            }

            if (useLocalContext) {
                useLocalContext = false;
                if (codeArray.length > 0) {
                    var context = codeArray.pop();

                    var lastIndex = tempIdentifiers.length - 1;
                    if (!(lastIndex < 0 || tempIdentifiers[lastIndex] === '.' || identifierFnName === '')) {
                        tempIdentifiers[lastIndex] += '.' + identifierFnName;
                        identifiers.push(tempIdentifiers.pop());
                        //check fn name is not null, pushed an identifier, and the context is not an array literal
                    } else if (!(identifierFnName === '' ||
                        !pushedIdentifier ||
                        context[0] === '[' ||
                        context[context.length - 1] === ']')) {
                        identifiers[identifiers.length - 1] += '.' + identifierFnName;
                    }

                    if (isEmpty(fnName)) {
                        codeStr = context + codeStr;
                    } else {
                        codeStr = '((' + this.__indexIntoContext.toString() + ')(' + context + ',"' +
                        fnName + '") || (function () {}))' + codeStr;
                    }
                } else {
                    this._throwError('Improper expression or context');
                }
            } else {
                if (grabFnName) {
                    codeStr = '(initialContext = (' + this.__findInitialContext.toString() + ')(context,aliases,"' +
                    fnName + '") || (function () {}))' + codeStr;

                    identifiers.push(fnName);
                } else {
                    codeStr = codeArray.pop() + codeStr;
                }
            }
            codeArray.push(codeStr);

            var peek = this._peek(index),
                length = tempIdentifiers.length;
            if (this._isValEqual(peek, '[]') && length > 0) {
                var lastIdentifier = tempIdentifiers[length - 1];
                if (lastIdentifier !== '.') {
                    identifiers.push(tempIdentifiers.pop());
                }
            }

            return useLocalContext;
        }
        private __indexIntoObject(index: number, useLocalContext: boolean) {
            var tokens = this._tokens,
                identifiers = this.__identifiers,
                tempIdentifiers = this.__tempIdentifiers,
                codeArray = this.__codeArray,
                nextChar = this._peek(index);

            if (this._isValEqual(nextChar, '()')) {
                return true;
            }

            var codeStr = codeArray.pop(),
                previousToken = tokens[index - 1],
                indexer,
                identifierIndexer = tempIdentifiers.pop(),
                context = codeArray.pop();

            if (this._isValUnequal(previousToken, '++--()[]*/%?:>=<=&&||!===')) {
                codeStr = '(' + this.__indexIntoContext.toString() + ')(' + context + ',"' + codeStr + '")';

                var lastIndex = tempIdentifiers.length - 1;
                if (lastIndex >= 0) {
                    if (tempIdentifiers[lastIndex] !== '.') {
                        tempIdentifiers[lastIndex] += '.' + identifierIndexer;
                    }
                } else if (!isNull(identifierIndexer) && identifierIndexer !== '.') {
                    identifiers.push(identifierIndexer);
                }
            } else {
                codeStr = '(' + this.__indexIntoContext.toString() + ')(' + context + ',' + codeStr + ')';
                tempIdentifiers.push('.');
            }

            codeArray.push(codeStr);

            return useLocalContext;
        }

        // OPERATORS
        private __handleQuestion() {
            var identifiers = this.__identifiers,
                tempIdentifiers = this.__tempIdentifiers,
                codeArray = this.__codeArray,
                temp = codeArray.pop(),
                codeStr = codeArray.pop() + '?' + temp,
                tempIdentifier;

            for (var i = 0; i < 2; i++) {
                if (tempIdentifiers.length > 0) {
                    tempIdentifier = tempIdentifiers.pop();
                    if (tempIdentifier !== '.') {
                        identifiers.push(tempIdentifier);
                    }
                } else {
                    break;
                }
            }

            codeArray.push(codeStr);
        }
        private __handleColon() {
            var identifiers = this.__identifiers,
                tempIdentifiers = this.__tempIdentifiers,
                codeArray = this.__codeArray,
                temp = codeArray.pop(),
                codeStr = codeArray.pop() + ':' + temp,
                tempIdentifier;

            for (var i = 0; i < 2; i++) {
                if (tempIdentifiers.length > 0) {
                    tempIdentifier = tempIdentifiers.pop();
                    if (tempIdentifier !== '.') {
                        identifiers.push(tempIdentifier);
                    }
                } else {
                    break;
                }
            }

            codeArray.push(codeStr);
        }
        private __handleOperator(token: string, args: number) {
            var identifiers = this.__identifiers,
                tempIdentifiers = this.__tempIdentifiers,
                codeArray = this.__codeArray,
                j = 0,
                tempStr = '',
                codeStr = '(' + OPERATORS[token].fn.toString() + ')(context, aliases,',
                tempIdentifier;


            while (j++ < args) {
                tempStr = 'function (context, aliases) { return ' + codeArray.pop() + '; }' + ',' + tempStr;

                if (tempIdentifiers.length > 0) {
                    tempIdentifier = tempIdentifiers.pop();
                    if (tempIdentifier !== '.') {
                        identifiers.push(tempIdentifier);
                    }
                }
            }

            codeStr += tempStr.slice(0, tempStr.length - 1) + ')';

            codeArray.push(codeStr);
        }

        // PRIVATE HELPER FUNCTIONS
        private __findInitialContext(context: any, aliases: any, token: string, undefined?: any) {
            if (token[0] === '@' && aliases !== null && typeof aliases === 'object') {
                return aliases[token];
            } else if (context !== null && typeof context === 'object') {
                return context[token];
            }
            return context === null ? null : undefined;
        }
        private __indexIntoContext(context: any, token: string, undefined?: any) {
            if (context !== null && typeof context === 'object') {
                return context[token];
            }
            return context === null ? null : undefined;
        }

        // PROTECTED HELPER FUNCTIONS
        /**
         * Peek at the next token.
         * 
         * @param index The current index.
         */
        _peek(index: number) {
            return this._tokens[index + 1];
        }

        /**
         * Evaluate and remove the leftover identifiers.
         */
        _popRemainingIdentifiers() {
            var identifiers = this.__identifiers,
                tempIdentifiers = this.__tempIdentifiers,
                last;

            while (tempIdentifiers.length > 0) {
                last = tempIdentifiers.pop();
                if (last !== '.') {
                    identifiers.push(last);
                }
            }
        }
        
        /**
         * Remove duplicate identifiers.
         */
        _makeIdentifiersUnique() {
            var identifiers = this.__identifiers,
                uniqueIdentifiers = [],
                uniqueIdentifierObject = {},
                identifier;

            while (identifiers.length > 0) {
                identifier = identifiers.pop();
                if (isNull(uniqueIdentifierObject[identifier])) {
                    uniqueIdentifierObject[identifier] = true;
                    uniqueIdentifiers.push(identifier);
                }
            }

            this.__identifiers = uniqueIdentifiers;
        }
        
        /**
         * Check if the 'val' property is equal to a particular character.
         * 
         * @param obj The obj whose 'val' property to compare
         * @param char The char to compare with
         */
        _isValEqual(obj: any, char: string): boolean {
            if (isNull(obj)) {
                return isNull(char);
            }
            return char.indexOf(obj.val) !== -1;
        }
        
        /**
         * Check if the 'val' property is not equal to a particular character.
         * 
         * @param obj The obj whose 'val' property to compare
         * @param char The char to compare with
         */
        _isValUnequal(obj: any, char: string): boolean {
            if (isNull(obj)) {
                return !isNull(char);
            }
            return char.indexOf(obj.val) === -1;
        }

        /**
         * Reset the parser's properties.
         */
        _resetParser() {
            this._tokens = [];
            this.__codeArray = [];
            this.__identifiers = [];
            this.__tempIdentifiers = [];
            this.__aliases = [];
            this.__uniqueAliases = {};
        }

        /**
         * Throw an exception in the case of an error.
         * 
         * @param error The error message to throw
         */
        _throwError(error: string) {
            this.$ExceptionStatic.fatal(error, this.$ExceptionStatic.PARSE);
        }
    }

    register.injectable('$parser', Parser);

    /**
     * Describes an object that is the result of parsing an expression string. Provides a
     * way to evaluate the expression with a context.
     */
    export interface IParsedExpression {
        /**
         * A method for evaluating an expression with a context.
         * 
         * @param context The primary context for evaluation.
         * @param aliases An object containing resource alias values. All keys must begin with '@'.
         */
        evaluate(context: any, aliases?: any): any;

        /**
         * The original expression string.
         */
        expression: string;

        /**
         * Contains all the identifiers found in an expression.  Useful for determining
         * properties to watch on a context.
         */
        identifiers: Array<string>;

        /**
         * Contains all the aliases (denoted by an identifier with '@' as the first character) for this IParsedExpression.
         */
        aliases: Array<string>;

        /**
         * Specifies whether or not you want to do a one-time binding on identifiers 
         * for this expression. Typically this is added to a clone of the IParsedExpression.
         */
        oneTime?: boolean;
    }

    /**
     * Describes an object that can parse an expression string and turn it into an
     * IParsedExpression. The intended external interface for the '$parser' 
     * injectable.
     */
    export interface IParser {
        /**
         * Takes in an expression string and outputs an IParsedExpression.
         * 
         * @param input An expression string to parse.
         */
        parse(expression: string): IParsedExpression;
    }
}
