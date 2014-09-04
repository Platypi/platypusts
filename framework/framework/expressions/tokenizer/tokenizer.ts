module plat.expressions {
    /**
     * @name Tokenizer
     * @memberof plat.expressions
     * @kind class
     * 
     * @implements {plat.expressions.ITokenizer}
     * 
     * @description
     * A class that is responsible for taking in a JavaScript expression string and
     * finding all of its tokens (i.e. delimiters, operators, etc).
     */
    export class Tokenizer implements ITokenizer {
        /**
         * @name _input
         * @memberof plat.expressions.Tokenizer
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The input string to tokenize.
         */
        _input: string;
        
        /**
         * @name __previousChar
         * @memberof plat.expressions.Tokenizer
         * @kind property
         * @access private
         * 
         * @type {string}
         * 
         * @description
         * The previous character during tokenization.
         */
        private __previousChar = '';
        /**
         * @name __variableRegex
         * @memberof plat.expressions.Tokenizer
         * @kind property
         * @access private
         * 
         * @type {RegExp}
         * 
         * @description
         * A regular expression for determining if a potential variable is valid syntax.
         */
        private __variableRegex = (<expressions.IRegex>acquire(__Regex)).invalidVariableRegex;
        /**
         * @name __outputQueue
         * @memberof plat.expressions.Tokenizer
         * @kind property
         * @access private
         * 
         * @type {Array<plat.expressions.IToken>}
         * 
         * @description
         * A queue used for determining the output of the tokenization.
         */
        private __outputQueue: Array<IToken> = [];
        /**
         * @name __operatorStack
         * @memberof plat.expressions.Tokenizer
         * @kind property
         * @access private
         * 
         * @type {Array<plat.expressions.IToken>}
         * 
         * @description
         * A stack used for determining operator precedence and aiding with the evaluation 
         * operands.
         */
        private __operatorStack: Array<IToken> = [];
        /**
         * @name __argCount
         * @memberof plat.expressions.Tokenizer
         * @kind property
         * @access private
         * 
         * @type {Array<any>}
         * 
         * @description
         * A collection used for determining argument count for certain operations.
         */
        private __argCount: Array<any> = [];
        /**
         * @name __objArgCount
         * @memberof plat.expressions.Tokenizer
         * @kind property
         * @access private
         * 
         * @type {Array<any>}
         * 
         * @description
         * A collection used for determining argument count for certain object literal operations.
         */
        private __objArgCount: Array<number> = [];
        /**
         * @name __lastColonChar
         * @memberof plat.expressions.Tokenizer
         * @kind property
         * @access private
         * 
         * @type {Array<string>}
         * 
         * @description
         * The last character encountered while in an operation dealing with the colon operator. 
         * Needs to be an array due to the possibility of nested colon operations.
         */
        private __lastColonChar: Array<string> = [];
        /**
         * @name __lastCommaChar
         * @memberof plat.expressions.Tokenizer
         * @kind property
         * @access private
         * 
         * @type {Array<string>}
         * 
         * @description
         * The last character encountered while in an operation dealing with commas. 
         * Needs to be an array due to the possibility of nested comma operations.
         */
        private __lastCommaChar: Array<string> = [];
        
        /**
         * @name createTokens
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access public
         * 
         * @description
         * Takes in an expression string and outputs a tokenized collection of 
         * {@link plat.expressions.IToken|ITokens}.
         * 
         * @param {string} input The expression string to tokenize.
         * 
         * @returns {Array<plat.expressions.IToken>} The tokenized collection of 
         * {@link plat.expressions.IToken|ITokens}.
         */
        createTokens(input: string): Array<IToken> {
            if (isNull(input)) {
                return [];
            }

            this._input = input;

            var char: string,
                length = input.length,
                ternary = 0,
                ternaryFound = false,
                isSpace = this._isSpace,
                isAlphaNumeric = this._isAlphaNumeric;

            for (var index = 0; index < length; index++) {
                char = input[index];

                // space
                if (isSpace(char)) {
                    continue;
                } else if (isAlphaNumeric(char)) {
                    index = this.__handleAplhaNumeric(index, char);
                } else if (isDelimiter(char)) {
                    switch (char) {
                        case '.':
                            index = this.__handlePeriod(index, char);
                            break;
                        case '{':
                            this.__handleLeftBrace(char);
                            break;
                        case '}':
                            this.__handleRightBrace(char);
                            break;
                        case '[':
                            this.__handleLeftBracket(char);
                            break;
                        case ']':
                            this.__handleRightBracket(char);
                            break;
                        case '(':
                            this.__handleLeftParenthesis(char);
                            break;
                        case ')':
                            this.__handleRightParenthesis(char);
                            break;
                        case ',':
                            this.__handleComma(char);
                            break;
                        case '\'':
                        case '"':
                            index = this.__handleStringLiteral(index, char);
                            break;
                    }
                } else if (isOperator(char)) {
                    switch (char) {
                        case '?':
                            ternaryFound = true;
                            ternary++;
                            this.__handleQuestion(char);
                            break;
                        case ':':
                            ternary = this.__handleColon(char, ternary);
                            break;
                        default:
                            index = this.__handleOtherOperator(index, char);
                    }
                    // semicolon throw error
                } else if (char === ';') {
                    this._throwError('Unexpected semicolon');
                    return [];
                }

                this.__previousChar = char;
            }

            if (ternaryFound && (ternary > 0)) {
                this._throwError('Improper ternary expression');
                return [];
            } else if (this.__objArgCount.length > 0) {
                this._throwError('Improper object literal');
                return [];
            }

            this.__popRemainingOperators();
            var output = this.__outputQueue;
            this._resetTokenizer();

            return output;
        }

        /**
         * @name _checkType
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access protected
         * 
         * @description
         * Determines character type.
         * 
         * @param {string} char The character to check.
         * @param {boolean} isNumberLike Whether or not the character resembles a number.
         * 
         * @returns {boolean} Whether or not the character corresponds with its type.
         */
        _checkType(char: string, isNumberLike: boolean): boolean {
            if (isNumberLike) {
                return this._isNumeric(char);
            }

            return this._isAlphaNumeric(char);
        }
        
        /**
         * @name _lookAhead
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access protected
         * 
         * @description
         * Looks ahead in the expression to group similar character types.
         * 
         * @param {string} char The current character in the expression string.
         * @param {number} index The current index in the expression string.
         * @param {boolean} isNumberLike Whether or not the character resembles a number.
         * 
         * @returns {string} The grouped characters.
         */
        _lookAhead(char: string, index: number, isNumberLike: boolean): string {
            var ch: string,
                input = this._input,
                maxLength = input.length;

            while (++index < maxLength) {
                ch = input[index];
                if (this._checkType(ch, isNumberLike)) {
                    char += ch;
                } else {
                    break;
                }
            }

            return char;
        }
        
        /**
         * @name _lookAheadForOperatorFn
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access protected
         * 
         * @description
         * Looks ahead in the expression to try and complete the 
         * current operator.
         * 
         * @param {string} char The operator to find.
         * @param {number} index The current index in the expression string.
         * 
         * @returns {string} The completed current operator.
         */
        _lookAheadForOperatorFn(char: string, index: number): string {
            var ch: string,
                fn = char,
                input = this._input,
                maxLength = input.length;

            while (++index < maxLength) {
                ch = input[index];
                fn += ch;

                if (isOperator(fn)) {
                    char = fn;
                } else {
                    break;
                }
            }

            return char;
        }
        
        /**
         * @name _lookAheadForDelimiter
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access protected
         * 
         * @description
         * Looks ahead in the expression until it comes to the ending 
         * character to try and complete a particular sequence 
         * (e.g. - a string literal). Also strips the first and last 
         * characters of the result (i.e. removes the delimiters).
         * 
         * @param {string} endChar The ending character.
         * @param {number} index The current index in the expression string.
         * 
         * @returns {string} The resultant inner character string between 
         * the first character and end character being looked ahead for.
         */
        _lookAheadForDelimiter(endChar: string, index: number): string {
            var char = '',
                ch: string,
                input = this._input,
                maxLength = input.length;

            while ((++index < maxLength) && (ch = input[index]) !== endChar) {
                char += ch;
            }

            return char;
        }
        
        /**
         * @name _popStackForVal
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access protected
         * 
         * @description
         * Pops the operator stack onto the output queue until a particular 
         * operator value is reached.
         * 
         * @param {plat.expressions.IToken} topOperator The top of the operator stack.
         * @param {string} char The operator value being searched for.
         * @param {string} error The error to throw in the case that the expression 
         * is invalid.
         * 
         * @returns {void}
         */
        _popStackForVal(topOperator: IToken, char: string, error: string): void {
            var outputQueue = this.__outputQueue,
                operatorStack = this.__operatorStack;

            while (topOperator.val !== char) {
                outputQueue.push(operatorStack.shift());
                topOperator = operatorStack[0];
                if (operatorStack.length === 0) {
                    return this._throwError(error);
                }
            }
        }
        
        /**
         * @name _isValEqual
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access protected
         * 
         * @description
         * Check if the "val" property on an {@link plat.expressions.IToken|IToken} 
         * is equal to a particular character.
         * 
         * @param {plat.expressions.IToken} obj The {@link plat.expressions.IToken|IToken} 
         * with the "val" property to compare.
         * @param {string} char The char to compare with.
         * 
         * @returns {boolean} Whether or not the val is equal to the input character.
         */
        _isValEqual(obj: IToken, char: string): boolean {
            if (isNull(obj) || isNull(obj.val)) {
                return isNull(char);
            } else if (obj.val === '') {
                return char === '';
            }
            return char.indexOf(obj.val) !== -1;
        }
        
        /**
         * @name _isValEqual
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access protected
         * 
         * @description
         * Check if the "val" property on an {@link plat.expressions.IToken|IToken} 
         * is not equal to a particular character.
         * 
         * @param {plat.expressions.IToken} obj The {@link plat.expressions.IToken|IToken} 
         * with the "val" property to compare.
         * @param {string} char The char to compare with.
         * 
         * @returns {boolean} Whether or not the val is not equal to the input character.
         */
        _isValUnequal(obj: IToken, char: string): boolean {
            if (isNull(obj) || isNull(obj.val)) {
                return !isNull(char);
            } else if (obj.val === '') {
                return char !== '';
            }
            return char.indexOf(obj.val) === -1;
        }
        
        /**
         * @name _resetTokenizer
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access protected
         * 
         * @description
         * Resets all the tokenizer's properties.
         * 
         * @returns {void}
         */
        _resetTokenizer(): void {
            this._input = null;
            this.__previousChar = '';
            this.__outputQueue = [];
            this.__operatorStack = [];
            this.__argCount = [];
            this.__objArgCount = [];
            this.__lastColonChar = [];
            this.__lastCommaChar = [];
        }
        
        /**
         * @name _resetTokenizer
         * @memberof plat.expressions.Tokenizer
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
        _throwError(error: string): void {
            var $exception: IExceptionStatic = acquire(__ExceptionStatic);
            $exception.fatal(error + ' in ' + this._input, $exception.PARSE);
        }
        
        /**
         * @name _isNumeric
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access protected
         * 
         * @description
         * Checks if a single character is numeric.
         * 
         * @param {string} char The character to check.
         * 
         * @returns {boolean} Whether or not the character is numeric.
         */
        _isNumeric(char: string): boolean {
            return ('0' <= char && char <= '9');
        }
        
        /**
         * @name _isSpace
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access protected
         * 
         * @description
         * Checks if a single character is a space.
         * 
         * @param {string} char The character to check.
         * 
         * @returns {boolean} Whether or not the character is a space.
         */
        _isSpace(char: string): boolean {
            return (char === ' ' ||
                char === '\r' ||
                char === '\n' ||
                char === '\t' ||
                char === '\v' ||
                char === '\u00A0');
        }
        
        /**
         * @name _isAlphaNumeric
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access protected
         * 
         * @description
         * Checks if a single character is alphanumeric.
         * 
         * @param {string} char The character to check.
         * 
         * @returns {boolean} Whether or not the character is alphanumeric.
         */
        _isAlphaNumeric(char: string): boolean {
            return ('a' <= char && char <= 'z' ||
                'A' <= char && char <= 'Z' ||
                '0' <= char && char <= '9' ||
                '@' === char ||
                '_' === char ||
                '$' === char);
        }
        
        /**
         * @name _isStringValidVariable
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access protected
         * 
         * @description
         * Checks if a string has proper JavaScript variable syntax.
         * 
         * @param {string} input The string to check.
         * 
         * @returns {boolean} Whether or not the input string could be a valid 
         * JavaScript variable.
         */
        _isStringValidVariable(input: string): boolean {
            return !this.__variableRegex.test(input);
        }

        /**
         * @name __handleAplhaNumeric
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access private
         * 
         * @description
         * Handles tokenizing an alphanumeric character.
         * 
         * @param {number} index The current index in the string being tokenized.
         * @param {string} char The current char.
         * 
         * @returns {number} The new index to pick up tokenization from.
         */
        private __handleAplhaNumeric(index: number, char: string): number {
            var isNumberLike = this._isNumeric(char),
                lookAhead = this._lookAhead(char, index, isNumberLike);

            this.__outputQueue.push(isNumberLike ? ({ val: Number(lookAhead), args: 0 }) :
                <IToken>({ val: lookAhead, args: -1 }));

            return index + lookAhead.length - 1;
        }

        /**
         * @name __handlePeriod
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access private
         * 
         * @description
         * Handles tokenizing a "." character.
         * 
         * @param {number} index The current index in the string being tokenized.
         * @param {string} char The current char.
         * 
         * @returns {number} The new index to pick up tokenization from.
         */
        private __handlePeriod(index: number, char: string): number {
            var outputQueue = this.__outputQueue,
                operatorStack = this.__operatorStack,
                topOutputLength = outputQueue.length - 1,
                previousChar = this.__previousChar,
                lookAhead: string;

            // if output queue is null OR space or operator or ( or , before .
            if (topOutputLength < 0 ||
                this._isSpace(previousChar) ||
                !isNull(OPERATORS[previousChar]) ||
                previousChar === '(' ||
                previousChar === ',') {
                lookAhead = this._lookAhead(char, index, true);
                index += lookAhead.length - 1;
                outputQueue.push({ val: parseFloat(lookAhead), args: 0 });
            } else if (!(isNull(outputQueue[topOutputLength]) ||
                !isNumber(Number(outputQueue[topOutputLength].val)) ||
                this._isValEqual(outputQueue[topOutputLength - 1], char))) {
                lookAhead = this._lookAhead(char, index, true);
                index += lookAhead.length - 1;
                outputQueue[topOutputLength].val += parseFloat(lookAhead);
            } else if (this._isValEqual(operatorStack[0], char)) {
                outputQueue.push({ val: char, args: 0 });
            } else {
                operatorStack.unshift({ val: char, args: 0 });
            }

            return index;
        }
        /**
         * @name __handleLeftBrace
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access private
         * 
         * @description
         * Handles tokenizing a "{" character.
         * 
         * @param {string} char The current char.
         * 
         * @returns {void}
         */
        private __handleLeftBrace(char: string): void {
            this.__operatorStack.unshift({ val: char, args: 0 });
            this.__objArgCount.push(0);
            this.__lastColonChar.push(char);
            this.__lastCommaChar.push(char);
        }
        /**
         * @name __handleRightBrace
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access private
         * 
         * @description
         * Handles tokenizing a "}" character.
         * 
         * @param {string} char The current char.
         * 
         * @returns {void}
         */
        private __handleRightBrace(char: string): void {
            var operatorStack = this.__operatorStack,
                topOperator = operatorStack[0],
                lastArgCount = this.__objArgCount.pop();

            if (isNull(topOperator)) {
                return this._throwError('Improper object literal');
            }

            this._popStackForVal(topOperator, '{', 'Improper object literal');

            // pop left brace off stack
            operatorStack.shift();

            this.__lastColonChar.pop();
            this.__lastCommaChar.pop();

            this.__outputQueue.push({ val: '{}', args: lastArgCount });
        }
        /**
         * @name __handleLeftBracket
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access private
         * 
         * @description
         * Handles tokenizing a "[" character.
         * 
         * @param {string} char The current char.
         * 
         * @returns {void}
         */
        private __handleLeftBracket(char: string): void {
            var previousChar = this.__previousChar,
                operatorStack = this.__operatorStack;

            if (this._isValEqual(operatorStack[0], '.')) {
                this.__outputQueue.push(operatorStack.shift());
            }

            operatorStack.unshift({ val: char, args: 0 });

            this.__argCount.push({
                num: 0,
                isArray: !(previousChar === ']' ||
                previousChar === ')' ||
                this._isAlphaNumeric(previousChar))
            });

            this.__lastCommaChar.push(char);
        }
        /**
         * @name __handleRightBracket
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access private
         * 
         * @description
         * Handles tokenizing a "]" character.
         * 
         * @param {string} char The current char.
         * 
         * @returns {void}
         */
        private __handleRightBracket(char: string): void {
            var operatorStack = this.__operatorStack,
                topOperator = operatorStack[0],
                lastArgCountObj = this.__argCount.pop();

            if (isNull(topOperator) || isNull(lastArgCountObj)) {
                return this._throwError('Brackets mismatch');
            }

            if (!lastArgCountObj.isArray) {
                lastArgCountObj.num--;
            }

            this._popStackForVal(topOperator, '[', 'Brackets mismatch');

            // pop left bracket off stack
            operatorStack.shift();

            this.__lastCommaChar.pop();
            // check if function on top of stack
            this.__outputQueue.push({
                val: '[]',
                args: (this.__previousChar === '[') ? -1 : lastArgCountObj.num + 1
            });
        }
        /**
         * @name __handleLeftParenthesis
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access private
         * 
         * @description
         * Handles tokenizing a "(" character.
         * 
         * @param {string} char The current char.
         * 
         * @returns {void}
         */
        private __handleLeftParenthesis(char: string): void {
            var previousChar = this.__previousChar,
                operatorStack = this.__operatorStack;

            if (this._isAlphaNumeric(previousChar) || previousChar === ']' || previousChar === ')') {
                var outputQueue = this.__outputQueue,
                    topOutput = outputQueue[outputQueue.length - 1];

                if (this._isValEqual(topOutput, '[]')) {
                    operatorStack.unshift(outputQueue.pop());
                    operatorStack.unshift(outputQueue.pop());
                } else if (!(this._isValEqual(topOutput, '()') || this._isNumeric(topOutput.val))) {
                    operatorStack.unshift(outputQueue.pop());
                }

                this.__argCount.push({ num: 0 });
            }

            operatorStack.unshift({ val: char, args: 0 });
            this.__lastCommaChar.push(char);
        }
        /**
         * @name __handleRightParenthesis
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access private
         * 
         * @description
         * Handles tokenizing a ")" character.
         * 
         * @param {string} char The current char.
         * 
         * @returns {void}
         */
        private __handleRightParenthesis(char: string): void {
            var operatorStack = this.__operatorStack,
                topOperator = operatorStack[0],
                localArgCountObj = this.__argCount.pop();

            if (isNull(topOperator)) {
                return this._throwError('Parentheses mismatch');
            }

            this._popStackForVal(topOperator, '(', 'Parentheses mismatch');

            // pop left parenthesis off stack
            operatorStack.shift();

            this.__lastCommaChar.pop();

            // check if function on top of stack
            if (!isNull(localArgCountObj)) {
                var localArgNum = localArgCountObj.num;
                if (this.__previousChar === '(') {
                    if (this.__removeFnFromStack(localArgNum)) {
                        this.__outputQueue.push({
                            val: '()',
                            args: 0
                        });
                    }
                    return;
                } else if (this.__removeFnFromStack(localArgNum + 1)) {
                    this.__outputQueue.push({
                        val: '()',
                        args: (localArgNum + 1)
                    });
                }
            }
        }
        /**
         * @name __handleComma
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access private
         * 
         * @description
         * Handles tokenizing a "," character.
         * 
         * @param {string} char The current char.
         * 
         * @returns {void}
         */
        private __handleComma(char: string): void {
            var lastCommaArray = this.__lastCommaChar,
                lastCommaArg = lastCommaArray[lastCommaArray.length - 1];

            if (lastCommaArg === '(' || lastCommaArg === '[') {
                var argCountArray = this.__argCount,
                    length = argCountArray.length;

                if (length > 0) {
                    // increment deepest fn count (don't need to increment obj count because we increment with colon)
                    argCountArray[length - 1].num++;
                } else {
                    return this._throwError('Mismatch with ' + lastCommaArg);
                }
            }

            var topOperator = this.__operatorStack[0];
            if (isNull(topOperator)) {
                return this._throwError('Unexpected comma');
            }

            this._popStackForVal(topOperator, lastCommaArg, 'Unexpected comma');
        }
        /**
         * @name __handleStringLiteral
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access private
         * 
         * @description
         * Handles tokenizing a string literal.
         * 
         * @param {number} index The current index in the string being tokenized.
         * @param {string} char The current char.
         * 
         * @returns {number} The new index to pick up tokenization from.
         */
        private __handleStringLiteral(index: number, char: string): number {
            var lookAhead = this._lookAheadForDelimiter(char, index),
                operatorStack = this.__operatorStack;

            if (this._isValEqual(operatorStack[0], '([')) {
                operatorStack.unshift({ val: lookAhead, args: 0 });
            } else {
                this.__outputQueue.push({ val: lookAhead, args: 0 });
            }
            return index + lookAhead.length + 1;
        }

        /**
         * @name __handleQuestion
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access private
         * 
         * @description
         * Handles tokenizing a "?" character.
         * 
         * @param {string} char The current char.
         * 
         * @returns {void}
         */
        private __handleQuestion(char: string): void {
            this.__lastColonChar.push(char);
            this.__determinePrecedence(char);
        }
        /**
         * @name __handleColon
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access private
         * 
         * @description
         * Handles tokenizing a ":" character.
         * 
         * @param {string} char The current char.
         * @param {number} ternary The current ternary counter. Increments when a ternary is found, 
         * decrements when a ternary is completed. It can be very useful when there is nested ternaries.
         * 
         * @returns {number} The potentially modified ternary counter.
         */
        private __handleColon(char: string, ternary: number): number {
            var lastColonCharArray = this.__lastColonChar,
                lastColonCharacter = lastColonCharArray[lastColonCharArray.length - 1],
                outputQueue = this.__outputQueue;

            if (lastColonCharacter === '?') {
                var operatorStack = this.__operatorStack,
                    topOperator = operatorStack[0];

                if (isNull(topOperator)) {
                    this._throwError('Ternary mismatch');
                    return;
                }

                ternary--;
                // pop latest colon char off queue
                lastColonCharArray.pop();

                this._popStackForVal(topOperator, '?', 'Ternary mismatch');

                outputQueue.push(operatorStack.shift());
                operatorStack.unshift({ val: char, args: 0 });
            } else if (lastColonCharacter === '{') {
                var objArgCount = this.__objArgCount,
                    outputLast = outputQueue.length - 1;

                objArgCount[objArgCount.length - 1]++;

                if (outputLast < 0) {
                    this._throwError('Unexpected colon');
                    return;
                }

                outputQueue[outputLast].args = 1;
            } else {
                this._throwError('Unexpected colon');
                return;
            }

            return ternary;
        }
        /**
         * @name __handleOtherOperator
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access private
         * 
         * @description
         * Handles tokenizing all other operators.
         * 
         * @param {number} index The current index in the string being tokenized.
         * @param {string} char The current char.
         * 
         * @returns {number} The new index to pick up tokenization from.
         */
        private __handleOtherOperator(index: number, char: string): number {
            var lookAhead = this._lookAheadForOperatorFn(char, index);
            this.__determinePrecedence(lookAhead);

            return index + lookAhead.length - 1;
        }
        /**
         * @name __popRemainingOperators
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access private
         * 
         * @description
         * Pops operators left on the operator stack onto the output queue 
         * checking for mismatches.
         * 
         * @returns {void}
         */
        private __popRemainingOperators(): void {
            var outputQueue = this.__outputQueue,
                operatorStack = this.__operatorStack,
                topOperator: IToken,
                topOperatorVal: any;

            while (operatorStack.length > 0) {
                topOperator = operatorStack.shift();
                topOperatorVal = topOperator.val;
                if (topOperatorVal === '(' || topOperatorVal === ')') {
                    return this._throwError('Parentheses mismatch');
                }

                outputQueue.push(topOperator);
            }
        }

        /**
         * @name __determineOperator
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access private
         * 
         * @description
         * Grabs essential token details for a given operator.
         * 
         * @param {string} operator The operator whose details are being requested.
         * 
         * @returns {plat.expressions.ITokenDetails} Essential information regarding the 
         * operator including precedence, associativity, and an evaluation function denoted as 
         * an {@link plat.expressions.ITokenDetails|ITokenDetails} object.
         */
        private __determineOperator(operator: string): ITokenDetails {
            switch (operator) {
                case '+':
                case '-':
                    if (this.__outputQueue.length === 0 || isOperator(this.__previousChar)) {
                        return OPERATORS['u' + operator];
                    }
                default:
                    return OPERATORS[operator];
            }
        }
        /**
         * @name __determinePrecedence
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access private
         * 
         * @description
         * Determines the precedence of a given operator in relation to other operators 
         * in the operator stack and places it in the operator stack.
         * 
         * @param {string} operator The operator whose precedence is being determined.
         * 
         * @returns {void}
         */
        private __determinePrecedence(operator: string): void {
            var determined = false,
                operatorFn = this.__determineOperator(operator),
                operatorPrecedence = operatorFn.precedence,
                isLtR = operatorFn.associativity === 'ltr',
                operatorStack = this.__operatorStack,
                outputQueue = this.__outputQueue,
                firstArrayOperator: ITokenDetails,
                firstArrayVal: any,
                firstArrayObj: IToken;

            while (!determined) {
                firstArrayObj = operatorStack[0];

                if (isNull(firstArrayObj)) {
                    operatorStack.unshift({ val: operator, args: operatorFn.fn.length - 2 });
                    return;
                }

                firstArrayVal = operatorStack[0].val;
                firstArrayOperator = OPERATORS[firstArrayVal];
                if (!(isNull(firstArrayOperator) ||
                    !(firstArrayOperator.precedence < operatorPrecedence ||
                    (isLtR && firstArrayOperator.precedence === operatorPrecedence)))) {
                    outputQueue.push(operatorStack.shift());
                } else {
                    operatorStack.unshift({ val: operator, args: operatorFn.fn.length - 2 });
                    determined = true;
                }
            }
        }
        /**
         * @name __removeFnFromStack
         * @memberof plat.expressions.Tokenizer
         * @kind function
         * @access private
         * 
         * @description
         * Removes a reference to a function that is present in the operator stack and places 
         * it in the output queue.
         * 
         * @param {number} argCount The current local argument count used with functions, 
         * arrays, and object literals.
         * 
         * @returns {boolean} Whether or not the function had at least one argument.
         */
        private __removeFnFromStack(argCount: number): boolean {
            var outputQueue = this.__outputQueue,
                operatorStack = this.__operatorStack,
                topOperator = operatorStack[0],
                isValEqual = this._isValEqual,
                isValUnequal = this._isValUnequal,
                fnToken: IToken,
                atLeastOne = false;

            while (!isNull(topOperator) &&
                isValUnequal(topOperator, '([') &&
                (this._isStringValidVariable(topOperator.val) ||
                isValEqual(topOperator.val, '[].') ||
                isAccessor(topOperator.val))) {
                fnToken = operatorStack.shift();
                if (!(fnToken.args !== -1 || isValEqual(fnToken, '[].'))) {
                    fnToken.args = -2;
                }
                outputQueue.push(fnToken);
                topOperator = operatorStack[0];
                atLeastOne = true;
            }

            if (!(atLeastOne || isValUnequal(outputQueue[outputQueue.length - argCount - 1], '()'))) {
                atLeastOne = true;
            }

            return atLeastOne;
        }
    }

    /**
     * The Type for referencing the '$Tokenizer' injectable as a dependency.
     */
    export function ITokenizer(): ITokenizer {
        return new Tokenizer();
    }

    register.injectable(__Tokenizer, ITokenizer);

    /**
     * @name ITokenizer
     * @memberof plat.expressions
     * @kind interface
     * 
     * @description
     * Describes an object used to find tokens for an expression and create 
     * {@link plat.expressions.ITokens|ITokens}.
     */
    export interface ITokenizer {
        /**
         * @name createTokens
         * @memberof plat.expressions.ITokenizer
         * @kind function
         * @access public
         * 
         * @description
         * Takes in an expression string and outputs a tokenized collection of 
         * {@link plat.expressions.IToken|ITokens}.
         * 
         * @param {string} input The expression string to tokenize.
         * 
         * @returns {Array<plat.expressions.IToken>} The tokenized collection of 
         * {@link plat.expressions.IToken|ITokens}.
         */
        createTokens(input: string): Array<IToken>;
    }
    
    /**
     * @name IToken
     * @memberof plat.expressions
     * @kind interface
     * 
     * @description
     * Describes a single token in a string expression.
     */
    export interface IToken {
        /**
         * @name val
         * @memberof plat.expressions.IToken
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * The string or number value of the token.
         */
        val: any;
        
        /**
         * @name val
         * @memberof plat.expressions.IToken
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * Denotes the type of token, as well as the number
         * of arguments for a function if it is the token.
         * 
         * @remarks
         * If -2: Denotes a function name unless indexed into with [].
         * If -1: Denotes a variable or empty array literal.
         * If 0: Denotes a number, keyword, object indexer (.[]), string literal,
         *  function with 0 arguments, ternary expression, or empty object literal
         * If 1: Denotes a function type with 1 argument, a property on an object literal,
         *  an object literal with 1 property, or an array literal with 1 entry.
         * If > 1: Denotes a function type with args arguments, an object literal with
         *  args properties, or an array literal with args entries.
         */
        args: number;
    }
    
    /**
     * @name ITokenDetails
     * @memberof plat.expressions
     * @kind interface
     * 
     * @description
     * Provides all the necessary details on how to evaluate a token.
     */
    export interface ITokenDetails {
        /**
         * @name precedence
         * @memberof plat.expressions.ITokenDetails
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The precedence that this token takes with respect to the 
         * evaluation order.
         */
        precedence: number;
        
        /**
         * @name associativity
         * @memberof plat.expressions.ITokenDetails
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Whether or not the token associates with the expression on
         * their left or right.
         */
        associativity: string;
        
        /**
         * @name fn
         * @memberof plat.expressions.ITokenDetails
         * @kind property
         * @access public
         * 
         * @type {Function}
         * 
         * @description
         * A function used to evaluate an operator expression.
         */
        fn: Function;
    }
}
