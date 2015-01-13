/**
 * @name expressions
 * @memberof plat
 * @kind namespace
 * @access public
 * 
 * @description
 * Holds classes and interfaces related to expression handling in platypus.
 */
module plat.expressions {
    /**
     * @name Parser
     * @memberof plat.expressions
     * @kind class
     * 
     * @implements {plat.expressions.IParser}
     * 
     * @description
     * A class for parsing JavaScript expression strings and creating 
     * {@link plat.expressions.IParsedExpression|IParsedExpressions}.
     */
    export class Parser implements IParser {
        /**
         * @name _tokenizer
         * @memberof plat.expressions.Parser
         * @kind property
         * @access protected
         * 
         * @type {plat.expressions.ITokenizer}
         * 
         * @description
         * Reference to the {@link plat.expressions.ITokenizer|ITokenizer} injectable.
         */
        protected _tokenizer: ITokenizer = acquire(__Tokenizer);

        /**
         * @name _Exception
         * @memberof plat.expressions.Parser
         * @kind property
         * @access protected
         * 
         * @type {plat.IExceptionStatic}
         * 
         * @description
         * Reference to the {@link plat.IExceptionStatic|IExceptionStatic} injectable.
         */
        protected _Exception: IExceptionStatic = acquire(__ExceptionStatic);

        /**
         * @name _tokens
         * @memberof plat.expressions.Parser
         * @kind property
         * @access protected
         * 
         * @type {Array<plat.expressions.IToken>}
         * 
         * @description
         * A single expression's token representation created by a {@link plat.expressions.ITokenizer|ITokenizer}.
         */
        protected _tokens: Array<IToken> = [];

        /**
         * @name __cache
         * @memberof plat.expressions.Parser
         * @kind property
         * @access private
         * 
         * @type {plat.IObject<plat.expressions.IParsedExpression>}
         * 
         * @description
         * An expression cache. Used so that a JavaScript expression is only ever parsed once.
         */
        private __cache: IObject<IParsedExpression> = {};
        /**
         * @name __codeArray
         * @memberof plat.expressions.Parser
         * @kind property
         * @access private
         * 
         * @type {Array<string>}
         * 
         * @description
         * A dynamically built string array that represents the evaluation function.
         */
        private __codeArray: Array<string> = [];
        /**
         * @name __identifiers
         * @memberof plat.expressions.Parser
         * @kind property
         * @access private
         * 
         * @type {Array<string>}
         * 
         * @description
         * A list of all the identifiers discovered in the JavaScript expression string.
         */
        private __identifiers: Array<string> = [];
        /**
         * @name __tempIdentifiers
         * @memberof plat.expressions.Parser
         * @kind property
         * @access private
         * 
         * @type {Array<string>}
         * 
         * @description
         * A temporary list of identifiers found used to build and evaluate each actual identifier.
         */
        private __tempIdentifiers: Array<string> = [];
        /**
         * @name __aliases
         * @memberof plat.expressions.Parser
         * @kind property
         * @access private
         * 
         * @type {plat.IObject<boolean>}
         * 
         * @description
         * An object whose keys represent a list of all unique aliases found in the JavaScript expression string.
         */
        private __aliases: IObject<boolean> = {};

        /**
         * @name parse
         * @memberof plat.expressions.Parser
         * @kind function
         * @access public
         * 
         * @description
         * Parses a JavaScript expression string.
         * 
         * @param {string} expression The JavaScript expression string to parse.
         * 
         * @returns {plat.expressions.IParsedExpression} The parsed expression containing detailed 
         * information about the expression as well as a way to evaluate its value.
         */
        parse(expression: string): IParsedExpression {
            var parsedObject = this.__cache[expression];

            if (!isNull(parsedObject)) {
                return parsedObject;
            }

            this._tokens = this._tokenizer.createTokens(expression);

            parsedObject = this._evaluate(expression);

            var identifiers = parsedObject.identifiers;
            if (identifiers.length === 0) {
                var noModel = parsedObject.evaluate(null);
                parsedObject.evaluate = () => noModel;
            }

            this.__cache[expression] = parsedObject;

            return parsedObject;
        }

        /**
         * @name clearCache
         * @memberof plat.expressions.Parser
         * @kind function
         * @access public
         * 
         * @description
         * If a key is passed in, it clears that single value in the expression cache. If no 
         * key is present, the entire expression cache will be cleared.
         * 
         * @param {string} key? An optional key that will clear its stored value in the expression 
         * cache if passed in.
         * 
         * @returns {void}
         */
        clearCache(key?: string): void {
            if (isString(key)) {
                deleteProperty(this.__cache, key);
                return;
            }

            this.__cache = {};
        }

        /**
         * @name _evaluate
         * @memberof plat.expressions.Parser
         * @kind function
         * @access protected
         * 
         * @description
         * Evaluate the current {@link plat.expressions.IToken|IToken} array.
         * 
         * @param {string} expression The JavaScript expression to evaluate.
         * 
         * @returns {plat.expressions.IParsedExpression} The parsed expression containing detailed 
         * information about the expression as well as a way to evaluate its value.
         */
        protected _evaluate(expression: string): IParsedExpression {
            var tokens = this._tokens,
                length = tokens.length,
                tempIdentifiers = this.__tempIdentifiers,
                codeArray = this.__codeArray,
                useLocalContext = false,
                tokenObj: IToken,
                token: any,
                args: number;

            for (var index = 0; index < length; index++) {
                tokenObj = tokens[index];
                token = tokenObj.val;
                args = tokenObj.args;

                // check if its an accessor
                if (isAccessor(token)) {
                    switch (token) {
                        case '()':
                            useLocalContext = this.__handleFunction(index, args, useLocalContext);
                            break;
                        case '{}':
                            codeArray.push(this.__convertObject(args));
                            tempIdentifiers.push('.');
                            break;
                        default:
                            // handle empty array
                            if (args < 0) {
                                codeArray.push('[]');
                                tempIdentifiers.push('.');
                                // handle array literal
                            } else if (args > 0) {
                                codeArray.push(this.__convertArrayLiteral(args));
                                tempIdentifiers.push('.');
                            } else {
                                useLocalContext = this.__indexIntoObject(index, token, useLocalContext);
                            }
                            break;
                    }
                    // check if its an operator
                } else if (isOperator(token)) {
                    // check if string literal
                    if (args === 0) {
                        codeArray.push(this.__convertPrimitive(index, token, args));
                    } else {
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
                    }
                    // its either function, object, or primitive
                } else {
                    // potential function or object to index into
                    if (args < 0) {
                        codeArray.push(this.__convertFunction(index, token, useLocalContext));
                        // primitive
                    } else {
                        codeArray.push(this.__convertPrimitive(index, token, args));
                    }
                }
            }

            // move the rest of the tempIdentifiers to the identifiers
            this._popRemainingIdentifiers();
            // make the identifiers array unqiue entries only
            this._makeIdentifiersUnique();

            var parsedExpression: IParsedExpression = {
                evaluate: <(context: any, aliases?: IObject<any>) => any>new Function(__CONTEXT, __ALIASES,
                    'var initialContext;' +
                    'return ' + (codeArray.length === 0 ? ('"' + expression + '"') : codeArray.join('')) + ';'),
                expression: expression,
                identifiers: this.__identifiers.slice(0),
                aliases: Object.keys(this.__aliases)
            };

            // reset parser's properties
            this._resetParser();

            return parsedExpression;
        }

        /**
         * @name __convertPrimitive
         * @memberof plat.expressions.Parser
         * @kind function
         * @access private
         * 
         * @description
         * Handles a token that is a primitive value.
         * 
         * @param {number} index The current index in the {@link plat.expressions.IToken|IToken} array.
         * @param {string} token The current {@link plat.expressions.IToken|IToken} value.
         * @param {number} args The current {@link plat.expressions.IToken|IToken} args.
         * 
         * @returns {string} The correctly evaluated primitive.
         */
        private __convertPrimitive(index: number, token: string, args: number): string {
            if (args > 0) {
                this.__tempIdentifiers.push('.');
                return token;
            }

            var castTokenIsNumberLike = isNumber(Number(token)),
                peek = this._peek(index),
                isPeekIndexer = !(isNull(peek) || peek.args >= 1),
                isValEqual = this._isValEqual;

            if (isKeyword(token) ||
                (isString(token) &&
                (castTokenIsNumberLike ||
                this._isValUnequal(peek, '[]()') ||
                (isValEqual(peek, '[]') &&
                !isPeekIndexer)))) {
                this.__tempIdentifiers.push('.');
                return '"' + token + '"';
            } else {
                if (!castTokenIsNumberLike ||
                    (isValEqual(peek, '.[]') &&
                    isPeekIndexer)) {
                    this.__tempIdentifiers.push(token);
                } else {
                    this.__tempIdentifiers.push('.');
                }
                return token;
            }
        }
        /**
         * @name __convertFunction
         * @memberof plat.expressions.Parser
         * @kind function
         * @access private
         * 
         * @description
         * Handles a potential function or object that needs to be indexed into.
         * 
         * @param {number} index The current index in the {@link plat.expressions.IToken|IToken} array.
         * @param {string} token The current {@link plat.expressions.IToken|IToken} value.
         * @param {boolean} useLocalContext Whether or not we need to use an already parsed object as the current context.
         * 
         * @returns {string} The correctly evaluated object or function represented as a string.
         */
        private __convertFunction(index: number, token: string, useLocalContext: boolean): string {
            if (token[0] === '@') {
                this.__aliases[token.slice(1)] = true;
            } else if (isKeyword(token)) {
                this.__tempIdentifiers.push('.');
                return token;
            }

            var nextToken = this._peek(index),
                isValEqual = this._isValEqual;

            if (isValEqual(this._tokens[index - 1], '()') && isValEqual(nextToken, '.[]')) {
                this.__tempIdentifiers.push('.');
            } else {
                this.__tempIdentifiers.push(token);
            }

            if (!isNull(nextToken)) {
                switch (nextToken.val) {
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
        /**
         * @name __convertObject
         * @memberof plat.expressions.Parser
         * @kind function
         * @access private
         * 
         * @description
         * Handles an object literal.
         * 
         * @param {number} args The current {@link plat.expressions.IToken|IToken} args.
         * 
         * @returns {string} The correctly evaluated object literal represented as a string.
         */
        private __convertObject(args: number): string {
            var identifiers = this.__identifiers,
                tempIdentifiers = this.__tempIdentifiers,
                codeArray = this.__codeArray,
                j = 0,
                key: string,
                codeStr = '{',
                tempIdentifier: string,
                temp: string;

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
        /**
         * @name __convertArrayLiteral
         * @memberof plat.expressions.Parser
         * @kind function
         * @access private
         * 
         * @description
         * Handles an Array literal.
         * 
         * @param {number} args The current {@link plat.expressions.IToken|IToken} args.
         * 
         * @returns {string} The correctly evaluated Array literal represented as a string.
         */
        private __convertArrayLiteral(args: number): string {
            var identifiers = this.__identifiers,
                tempIdentifiers = this.__tempIdentifiers,
                codeArray = this.__codeArray,
                j = 0,
                tempStr = '',
                tempIdentifier: string;

            while (j++ < args) {
                tempStr = codeArray.pop() + ',' + tempStr;

                if (tempIdentifiers.length > 0) {
                    tempIdentifier = tempIdentifiers.pop();
                    if (tempIdentifier !== '.') {
                        identifiers.push(tempIdentifier);
                    }
                }
            }

            return '[' + tempStr.slice(0, -1) + ']';
        }

        /**
         * @name __handleFunction
         * @memberof plat.expressions.Parser
         * @kind function
         * @access private
         * 
         * @description
         * Handles an accessor type function token "()".
         * 
         * @param {number} index The current index in the {@link plat.expressions.IToken|IToken} array.
         * @param {number} args The current {@link plat.expressions.IToken|IToken} args.
         * @param {boolean} useLocalContext Whether or not we need to use an already parsed object as the current context.
         * 
         * @returns {boolean} Whether we need to use the current parsed object as the new current context.
         */
        private __handleFunction(index: number, args: number, useLocalContext: boolean): boolean {
            var identifiers = this.__identifiers,
                tempIdentifiers = this.__tempIdentifiers,
                codeArray = this.__codeArray,
                j = 0,
                previousToken = this._lookBack(index),
                grabFnName = !isNull(previousToken) && (previousToken.args === -2 || this._isValEqual(previousToken, '.[]')),
                tempStr = '',
                tempIdentifier: string,
                fnName = '',
                identifierFnName = '',
                codeStr: string,
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
                    var context = codeArray.pop(),
                        lastIndex = tempIdentifiers.length - 1;

                    if (!(lastIndex < 0 || tempIdentifiers[lastIndex] === '.' || identifierFnName === '')) {
                        tempIdentifiers[lastIndex] += '.' + identifierFnName;
                        identifiers.push(tempIdentifiers.pop());
                        // check fn name is not null, pushed an identifier, and the context is not an array literal
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
                    codeStr = '(initialContext = ((' + this.__findInitialContext.toString() + ')(context,aliases,"' +
                    fnName + '") || (function () {}))' + codeStr + ')';

                    identifiers.push(fnName);
                } else {
                    codeStr = codeArray.pop() + codeStr;
                }
            }

            codeArray.push(codeStr);

            var length = tempIdentifiers.length;
            if (this._isValEqual(this._peek(index), '[]') && length > 0 && tempIdentifiers[length - 1] !== '.') {
                identifiers.push(tempIdentifiers.pop());
            }

            return useLocalContext;
        }
        /**
         * @name __indexIntoObject
         * @memberof plat.expressions.Parser
         * @kind function
         * @access private
         * 
         * @description
         * Handles an accessor type token that is for indexing (i.e. "." or "[]").
         * 
         * @param {number} index The current index in the {@link plat.expressions.IToken|IToken} array.
         * @param {string} token The current {@link plat.expressions.IToken|IToken} value.
         * @param {boolean} useLocalContext Whether or not we need to use an already parsed object as the current context.
         * 
         * @returns {boolean} Whether we need to use the current parsed object as the new current context.
         */
        private __indexIntoObject(index: number, token: string, useLocalContext: boolean): boolean {
            var isValEqual = this._isValEqual;

            if (isValEqual(this._peek(index), '()')) {
                return true;
            }

            var codeArray = this.__codeArray,
                codeStr = codeArray.pop(),
                identifiers = this.__identifiers,
                tempIdentifiers = this.__tempIdentifiers,
                previousToken = this._lookBack(index),
                identifierIndexer = tempIdentifiers.pop(),
                hasIdentifierIndexer = !isNull(identifierIndexer),
                lastIndex: number;

            if (hasIdentifierIndexer && identifierIndexer[0] === '@') {
                codeStr = '(' + this.__indexIntoContext.toString() + ')(' + codeArray.pop() + ',' + codeStr + ')';
                identifiers.push(identifierIndexer);
                if (tempIdentifiers.length > 0) {
                    identifiers.push(tempIdentifiers.pop());
                }
            } else if (isValEqual(previousToken, '++--()[]*/%?:>=<=&&||!===')) {
                codeStr = '(' + this.__indexIntoContext.toString() + ')(' + codeArray.pop() + ',' + codeStr + ')';
                tempIdentifiers.push('.');
            } else if (token === '[]' && !(isNull(previousToken) || previousToken.args >= 0)) {
                codeStr = '(' + this.__indexIntoContext.toString() + ')(' + codeArray.pop() + ',' + codeStr + ')';

                lastIndex = tempIdentifiers.length - 1;
                if (lastIndex >= 0) {
                    if (tempIdentifiers[lastIndex] !== '.') {
                        identifiers.push(tempIdentifiers.pop());
                    }
                }

                identifiers.push(identifierIndexer);
            } else {
                codeStr = '(' + this.__indexIntoContext.toString() + ')(' + codeArray.pop() + ',"' + codeStr + '")';

                lastIndex = tempIdentifiers.length - 1;
                if (lastIndex >= 0) {
                    if (tempIdentifiers[lastIndex] !== '.') {
                        tempIdentifiers[lastIndex] += '.' + identifierIndexer;
                    }
                } else if (hasIdentifierIndexer && identifierIndexer !== '.' && token !== '.') {
                    identifiers.push(identifierIndexer);
                }
            }

            codeArray.push(codeStr);

            return useLocalContext;
        }

        /**
         * @name __handleQuestion
         * @memberof plat.expressions.Parser
         * @kind function
         * @access private
         * 
         * @description
         * Handles the "?" operator.
         * 
         * @returns {void}
         */
        private __handleQuestion(): void {
            var identifiers = this.__identifiers,
                tempIdentifiers = this.__tempIdentifiers,
                codeArray = this.__codeArray,
                temp = codeArray.pop(),
                tempIdentifier: string;

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

            codeArray.push(codeArray.pop() + '?' + temp);
        }
        /**
         * @name __handleColon
         * @memberof plat.expressions.Parser
         * @kind function
         * @access private
         * 
         * @description
         * Handles the ":" operator.
         * 
         * @returns {void}
         */
        private __handleColon(): void {
            var identifiers = this.__identifiers,
                tempIdentifiers = this.__tempIdentifiers,
                codeArray = this.__codeArray,
                temp = codeArray.pop(),
                tempIdentifier: string;

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

            codeArray.push(codeArray.pop() + ':' + temp);
        }
        /**
         * @name __handleOperator
         * @memberof plat.expressions.Parser
         * @kind function
         * @access private
         * 
         * @description
         * Handles all other operators.
         * 
         * @param {string} token The current {@link plat.expressions.IToken|IToken} value.
         * @param {number} args The current {@link plat.expressions.IToken|IToken} args.
         * 
         * @returns {void}
         */
        private __handleOperator(token: string, args: number): void {
            var identifiers = this.__identifiers,
                tempIdentifiers = this.__tempIdentifiers,
                codeArray = this.__codeArray,
                j = 0,
                tempStr = '',
                tempIdentifier: string;


            while (j++ < args) {
                tempStr = 'function (context, aliases) { return ' + codeArray.pop() + '; }' + ',' + tempStr;

                if (tempIdentifiers.length > 0) {
                    tempIdentifier = tempIdentifiers.pop();
                    if (tempIdentifier !== '.') {
                        identifiers.push(tempIdentifier);
                    }
                }
            }

            codeArray.push(
                '(' + OPERATORS[token].fn.toString() + ')(context, aliases,' + tempStr.slice(0, tempStr.length - 1) + ')'
                );
        }

        /**
         * @name __findInitialContext
         * @memberof plat.expressions.Parser
         * @kind function
         * @access private
         * 
         * @description
         * Safely finds an initial context.
         * 
         * @param {any} context The context object.
         * @param {any} aliases Any aliases that may exist.
         * @param {string} token The property used to find the initial context.
         * 
         * @returns {any} The correct initial context.
         */
        private __findInitialContext(context: any, aliases: any, token: string): any {
            if (token[0] === '@' && aliases !== null && typeof aliases === 'object') {
                return aliases[token.slice(1)];
            } else if (context !== null && typeof context === 'object') {
                return context[token];
            }
        }
        /**
         * @name __indexIntoContext
         * @memberof plat.expressions.Parser
         * @kind function
         * @access private
         * 
         * @description
         * Safely drills down into a specified context with a given token.
         * 
         * @param {any} context The context object.
         * @param {string} token The property used to drill into the context.
         * 
         * @returns {any} The property of the context denoted by the token.
         */
        private __indexIntoContext(context: any, token: string): any {
            if (context !== null && typeof context === 'object') {
                return context[token];
            }
        }

        /**
         * @name _peek
         * @memberof plat.expressions.Parser
         * @kind function
         * @access protected
         * 
         * @description
         * Peek at the next {@link plat.expressions.IToken|IToken}.
         * 
         * @param {number} index The index before the desired {@link plat.expressions.IToken|IToken} 
         * in the array.
         * 
         * @returns {plat.expressions.IToken} The next {@link plat.expressions.IToken|IToken} 
         * in the {@link plat.expressions.IToken|IToken} array.
         */
        protected _peek(index: number): IToken {
            return this._tokens[index + 1];
        }

        /**
         * @name _lookBack
         * @memberof plat.expressions.Parser
         * @kind function
         * @access protected
         * 
         * @description
         * Look back at the previous {@link plat.expressions.IToken|IToken}.
         * 
         * @param {number} index The index after the desired {@link plat.expressions.IToken|IToken} 
         * in the array.
         * 
         * @returns {plat.expressions.IToken} The previous {@link plat.expressions.IToken|IToken} 
         * in the {@link plat.expressions.IToken|IToken} array.
         */
        protected _lookBack(index: number): IToken {
            return this._tokens[index - 1];
        }

        /**
         * @name _popRemainingIdentifiers
         * @memberof plat.expressions.Parser
         * @kind function
         * @access protected
         * 
         * @description
         * Evaluate and remove the leftover identifiers.
         * 
         * @returns {void}
         */
        protected _popRemainingIdentifiers(): void {
            var identifiers = this.__identifiers,
                tempIdentifiers = this.__tempIdentifiers,
                last: string;

            while (tempIdentifiers.length > 0) {
                last = tempIdentifiers.pop();
                if (last !== '.') {
                    identifiers.push(last);
                }
            }
        }

        /**
         * @name _makeIdentifiersUnique
         * @memberof plat.expressions.Parser
         * @kind function
         * @access protected
         * 
         * @description
         * Remove duplicate identifiers.
         * 
         * @returns {void}
         */
        protected _makeIdentifiersUnique(): void {
            var identifiers = this.__identifiers,
                uniqueIdentifiers: Array<string> = [],
                uniqueIdentifierObject: IObject<boolean> = {},
                identifier: string;

            while (identifiers.length > 0) {
                identifier = identifiers.pop();
                if (!uniqueIdentifierObject[identifier]) {
                    uniqueIdentifierObject[identifier] = true;
                    uniqueIdentifiers.push(identifier);
                }
            }

            this.__identifiers = uniqueIdentifiers;
        }

        /**
         * @name _isValEqual
         * @memberof plat.expressions.Parser
         * @kind function
         * @access protected
         * 
         * @description
         * Check if the "val" property on an {@link plat.expressions.IToken|IToken} 
         * is present in a particular character string.
         * 
         * @param {plat.expressions.IToken} obj The {@link plat.expressions.IToken|IToken} 
         * with the "val" property to compare.
         * @param {string} char The char to compare with.
         * 
         * @returns {boolean} Whether or not the val is equal to the input character.
         */
        protected _isValEqual(obj: IToken, char: string): boolean {
            if (isNull(obj) || isNull(obj.val)) {
                return isNull(char);
            } else if (obj.val === '') {
                return char === '';
            }
            return char.indexOf(obj.val) !== -1;
        }

        /**
         * @name _isValUnequal
         * @memberof plat.expressions.Parser
         * @kind function
         * @access protected
         * 
         * @description
         * Check if the "val" property on an {@link plat.expressions.IToken|IToken} 
         * is not present in a particular character string.
         * 
         * @param {plat.expressions.IToken} obj The {@link plat.expressions.IToken|IToken} 
         * with the "val" property to compare.
         * @param {string} char The char to compare with.
         * 
         * @returns {boolean} Whether or not the val is not equal to the input character.
         */
        protected _isValUnequal(obj: any, char: string): boolean {
            if (isNull(obj) || isNull(obj.val)) {
                return !isNull(char);
            } else if (obj.val === '') {
                return char !== '';
            }
            return char.indexOf(obj.val) === -1;
        }

        /**
         * @name _resetParser
         * @memberof plat.expressions.Parser
         * @kind function
         * @access protected
         * 
         * @description
         * Resets all the parser's properties.
         * 
         * @returns {void}
         */
        protected _resetParser(): void {
            this._tokens = [];
            this.__codeArray = [];
            this.__identifiers = [];
            this.__tempIdentifiers = [];
            this.__aliases = {};
        }

        /**
         * @name _throwError
         * @memberof plat.expressions.Parser
         * @kind function
         * @access protected
         * 
         * @description
         * Throws a fatal exception in the case of an error.
         * 
         * @param {string} error The error message to throw.
         * 
         * @returns {void}
         */
        protected _throwError(error: string): void {
            var _Exception: IExceptionStatic = this._Exception;
            _Exception.fatal(error, _Exception.PARSE);
        }
    }

    /**
     * The Type for referencing the '_parser' injectable as a dependency.
     */
    export function IParser(): IParser {
        return new Parser();
    }

    register.injectable(__Parser, IParser);

    /**
     * @name IParser
     * @memberof plat.expressions
     * @kind interface
     * 
     * @description
     * Describes an object that can parse a JavaScript expression string and turn it into an
     * {@link plat.expressions.IParsedExpression|IParsedExpression}.
     */
    export interface IParser {
        /**
         * @name parse
         * @memberof plat.expressions.IParser
         * @kind function
         * @access public
         * 
         * @description
         * Parses a JavaScript expression string.
         * 
         * @param {string} expression The JavaScript expression string to parse.
         * 
         * @returns {plat.expressions.IParsedExpression} The parsed expression containing detailed 
         * information about the expression as well as a way to evaluate its value.
         */
        parse(expression: string): IParsedExpression;

        /**
         * @name clearCache
         * @memberof plat.expressions.IParser
         * @kind function
         * @access public
         * 
         * @description
         * If a key is passed in, it clears that single value in the expression cache. If no 
         * key is present, the entire expression cache will be cleared.
         * 
         * @param {string} key? An optional key that will clear its stored value in the expression 
         * cache if passed in.
         * 
         * @returns {void}
         */
        clearCache(key?: string): void;
    }

    /**
     * @name IParsedExpression
     * @memberof plat.expressions
     * @kind interface
     * 
     * @description
     * Describes an object that is the result of parsing a JavaScript expression string. It contains detailed 
     * information about the expression as well as a way to evaluate the expression with a context.
     */
    export interface IParsedExpression {
        /**
         * @name evaluate
         * @memberof plat.expressions.IParsedExpression
         * @kind function
         * @access public
         * 
         * @description
         * A method for evaluating an expression with a context.
         * 
         * @param {any} context? The primary context for evaluation.
         * @param {IObject<any>} aliases? An object containing resource alias values. 
         * All property keys must never begin with '@'.
         * 
         * @returns {any} The evaluated object or primitive.
         */
        evaluate(context?: any, aliases?: IObject<any>): any;

        /**
         * @name expression
         * @memberof plat.expressions.IParsedExpression
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The original expression string.
         */
        expression: string;

        /**
         * @name identifiers
         * @memberof plat.expressions.IParsedExpression
         * @kind property
         * @access public
         * 
         * @type {Array<string>}
         * 
         * @description
         * Contains all the identifiers found in an expression. Useful for determining
         * properties to watch on a context.
         */
        identifiers: Array<string>;

        /**
         * @name aliases
         * @memberof plat.expressions.IParsedExpression
         * @kind property
         * @access public
         * 
         * @type {Array<string>}
         * 
         * @description
         * Contains all the aliases (denoted without '@' as the first character) for this 
         * {@link plat.expressions.IParsedExpression|IParsedExpression}.
         */
        aliases: Array<string>;

        /**
         * @name oneTime
         * @memberof plat.expressions.IParsedExpression
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Specifies whether or not you want to do a one-time binding on identifiers 
         * for this expression. Typically this is added to a clone of this 
         * {@link plat.expressions.IParsedExpression|IParsedExpression}.
         */
        oneTime?: boolean;
    }
}
