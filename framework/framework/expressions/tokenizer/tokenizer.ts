module plat.expressions {
    /**
     * Responsible for taking a javascript expression string and
     * finding all its tokens (i.e. delimiters, operators, etc).
     */
    export class Tokenizer implements ITokenizer {
        /**
         * The input string to tokenize.
         */
        _input: string;

        private __previousChar: string = '';
        private __variableRegex = (<expressions.IRegex>acquire(__Regex)).invalidVariableRegex;
        private __outputQueue: Array<IToken> = [];
        private __operatorStack: Array<IToken> = [];
        private __argCount: Array<any> = [];
        private __objArgCount: Array<number> = [];
        private __lastColonChar: Array<string> = [];
        private __lastCommaChar: Array<string> = [];

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
                }

                this.__previousChar = char;
            }

            if (ternaryFound && (ternary > 0)) {
                this._throwError('Improper ternary expression');
            } else if (this.__objArgCount.length > 0) {
                this._throwError('Improper object literal');
            }

            this.__popRemainingOperators();
            var output = this.__outputQueue;
            this._resetTokenizer();

            return output;
        }

        // alphanumeric case
        private __handleAplhaNumeric(index: number, char: string): number {
            var functionArr: Array<string> = [],
                isNumberLike = this._isNumeric(char);

            functionArr.push(char);

            index = this._lookAhead(index, isNumberLike, functionArr);

            var mergedValue = functionArr.join(''),
                outputToPush = isNumberLike ? ({ val: Number(mergedValue), args: 0 }) :
                <IToken>({ val: mergedValue, args: -1 });

            this.__outputQueue.push(outputToPush);

            return index;
        }

        // delimeter functions
        private __handlePeriod(index: number, char: string): number {
            var functionArr: Array<string> = [],
                outputQueue = this.__outputQueue,
                operatorStack = this.__operatorStack,
                topOutputLength = outputQueue.length - 1,
                previousChar = this._input[index - 1];

            // if output queue is null OR space or operator or ( or , before .
            if (topOutputLength < 0 ||
                this._isSpace(previousChar) ||
                !isNull(OPERATORS[previousChar]) ||
                previousChar === '(' ||
                previousChar === ',') {
                functionArr.push(char);
                index = this._lookAhead(index, true, functionArr);
                outputQueue.push({ val: parseFloat(functionArr.join('')), args: 0 });
            } else if (!(isNull(outputQueue[topOutputLength]) ||
                !isNumber(Number(outputQueue[topOutputLength].val)) ||
                this._isValEqual(outputQueue[topOutputLength - 1], char))) {
                functionArr.push(char);
                index = this._lookAhead(index, true, functionArr);
                outputQueue[topOutputLength].val += parseFloat(functionArr.join(''));
            } else if (this._isValEqual(operatorStack[0], char)) {
                outputQueue.push({ val: char, args: 0 });
            } else {
                operatorStack.unshift({ val: char, args: 0 });
            }

            return index;
        }
        private __handleLeftBrace(char: string): void {
            this.__operatorStack.unshift({ val: char, args: 0 });
            this.__objArgCount.push(0);
            this.__lastColonChar.push(char);
            this.__lastCommaChar.push(char);
        }
        private __handleRightBrace(char: string): void {
            var operatorStack = this.__operatorStack,
                topOperator = operatorStack[0],
                lastArgCount = this.__objArgCount.pop();

            if (isNull(topOperator)) {
                this._throwError('Improper object literal');
            } else {
                this._popStackForVal(topOperator, '{', 'Improper object literal');

                // pop left brace off stack
                operatorStack.shift();

                this.__lastColonChar.pop();
                this.__lastCommaChar.pop();

                this.__outputQueue.push({ val: '{}', args: lastArgCount });
            }
        }
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
        private __handleRightBracket(char: string): void {
            var operatorStack = this.__operatorStack,
                topOperator = operatorStack[0],
                lastArgCountObj = this.__argCount.pop(),
                outputQueue = this.__outputQueue,
                isEmptyArray = (this.__previousChar === '[');

            if (isNull(topOperator) || isNull(lastArgCountObj)) {
                this._throwError('Brackets mismatch');
            } else {
                if (!lastArgCountObj.isArray) {
                    lastArgCountObj.num--;
                }

                this._popStackForVal(topOperator, '[', 'Brackets mismatch');

                // pop left bracket off stack
                operatorStack.shift();

                this.__lastCommaChar.pop();
                // check if function on top of stack
                outputQueue.push({ val: '[]', args: isEmptyArray ? -1 : lastArgCountObj.num + 1 });
            }
        }
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

                this.__argCount.push({ num: 0, isFn: true });
            }
            operatorStack.unshift({ val: char, args: 0 });
            this.__lastCommaChar.push(char);
        }
        private __handleRightParenthesis(char: string): void {
            var operatorStack = this.__operatorStack,
                topOperator = operatorStack[0],
                localArgCountObj = this.__argCount.pop();

            if (isNull(topOperator)) {
                this._throwError('Parentheses mismatch');
            } else {
                this._popStackForVal(topOperator, '(', 'Parentheses mismatch');

                // pop left parenthesis off stack
                operatorStack.shift();

                this.__lastCommaChar.pop();

                // check if function on top of stack
                var previousParen = this.__previousChar === '(';
                if (!isNull(localArgCountObj) &&
                    this.__removeFnFromStack(previousParen ? localArgCountObj.num : localArgCountObj.num + 1)) {
                    this.__outputQueue.push({ val: '()', args: previousParen ? 0 : (localArgCountObj.num + 1) });
                }
            }
        }
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
                    this._throwError('Mismatch with ' + lastCommaArg);
                }
            }

            var topOperator = this.__operatorStack[0];

            if (isNull(topOperator)) {
                this._throwError('Unexpected comma');
            } else {
                this._popStackForVal(topOperator, lastCommaArg, 'Unexpected comma');
            }
        }
        private __handleStringLiteral(index: number, char: string): number {
            var str = this._lookAheadForDelimiter(char, char, index, true),
                operatorStack = this.__operatorStack,
                topOperator = operatorStack[0];

            if (this._isValEqual(topOperator, '([')) {
                operatorStack.unshift({ val: str.char, args: 0 });
            } else {
                this.__outputQueue.push({ val: str.char, args: 0 });
            }
            return str.index;
        }

        // operator functions
        private __handleQuestion(char: string): void {
            this.__lastColonChar.push(char);
            this.__determinePrecedence(char);
        }
        private __handleColon(char: string, ternary: number): number {
            var lastColonCharArray = this.__lastColonChar,
                lastColonCharacter = lastColonCharArray[lastColonCharArray.length - 1],
                outputQueue = this.__outputQueue;

            if (lastColonCharacter === '?') {
                var operatorStack = this.__operatorStack,
                    topOperator = operatorStack[0];

                if (isNull(topOperator)) {
                    this._throwError('Ternary mismatch');
                } else {
                    ternary--;
                    // pop latest colon char off queue
                    lastColonCharArray.pop();

                    this._popStackForVal(topOperator, '?', 'Ternary mismatch');

                    outputQueue.push(operatorStack.shift());
                    operatorStack.unshift({ val: char, args: 0 });
                }
            } else if (lastColonCharacter === '{') {
                var objCountLast = this.__objArgCount.length - 1,
                    outputLength = outputQueue.length;

                this.__objArgCount[objCountLast]++;
                if (outputLength > 0) {
                    outputQueue[outputLength - 1].args = 1;
                } else {
                    this._throwError('Unexpected colon');
                }
            } else {
                this._throwError('Unexpected colon');
            }

            return ternary;
        }
        private __handleOtherOperator(index: number, char: string): number {
            var look = this._lookAheadForOperatorFn(char, index);
            this.__determinePrecedence(look.char);

            return look.index;
        }
        private __popRemainingOperators(): void {
            var outputQueue = this.__outputQueue,
                operatorStack = this.__operatorStack;

            while (operatorStack.length > 0) {
                var topOperator = operatorStack.shift();
                if (topOperator.val === '(' || topOperator.val === ')') {
                    this._throwError('Parentheses mismatch');
                }
                outputQueue.push(topOperator);
            }
        }

        // private helper functions
        private __determineOperator(operator: any): ITokenDetails {
            switch (operator) {
                case '+':
                case '-':
                    var outputQueue = this.__outputQueue,
                        outputQueueLength = outputQueue.length;

                    if (outputQueueLength === 0 || isOperator(this.__previousChar)) {
                        return OPERATORS['u' + operator];
                    } else {
                        var operatorStack = this.__operatorStack,
                            operatorStackLength = operatorStack.length,
                            operatorStackEmpty = operatorStackLength === 0,
                            topOutput = outputQueue[outputQueueLength - 1],
                            topOperator = operatorStack[operatorStackLength - 1],
                            topOutputIsOperator = isOperator(topOutput.val),
                            topOperatorIsOperator = operatorStackEmpty ? false : isOperator(topOperator.val),
                            topOperatorIsNonUnary = topOperatorIsOperator ? topOperator.args > 1 : false;

                        if ((topOutputIsOperator && topOperatorIsOperator) ||
                            !(outputQueueLength > 1 || operatorStackEmpty || !topOperatorIsNonUnary)) {
                            return OPERATORS['u' + operator];
                        }
                    }
                default:
                    return OPERATORS[operator];
            }
        }
        private __determinePrecedence(operator: any) {
            var determined = false,
                operatorFn = this.__determineOperator(operator),
                operatorPrecedence = operatorFn.precedence,
                operatorAssoc = operatorFn.associativity,
                operatorStack = this.__operatorStack,
                outputQueue = this.__outputQueue,
                firstArrayOperator: ITokenDetails,
                firstArrayVal: any,
                firstArrayObj: IToken;

            while (!determined) {
                firstArrayObj = operatorStack[0];

                if (!firstArrayObj) {
                    operatorStack.unshift({ val: operator, args: operatorFn.fn.length - 2 });
                    return;
                }

                firstArrayVal = operatorStack[0].val;
                firstArrayOperator = OPERATORS[firstArrayVal];
                if (!(isNull(firstArrayOperator) ||
                    !(firstArrayOperator.precedence < operatorPrecedence ||
                    (firstArrayOperator.precedence === operatorPrecedence && operatorAssoc === 'ltr')))) {
                    outputQueue.push(operatorStack.shift());
                } else {
                    operatorStack.unshift({ val: operator, args: operatorFn.fn.length - 2 });
                    determined = true;
                }
            }
        }
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

        // protected helper functions
        /**
         * Determines character type
         * 
         * @param char The character to check
         * @param isNumberLike Whether or not the character resembles a number
         */
        _checkType(char: string, isNumberLike: boolean): boolean {
            if (isNumberLike) {
                return this._isNumeric(char);
            }
            return this._isAlphaNumeric(char);
        }

        /**
         * Looks ahead in the expression to group similar character types.
         * 
         * @param index The current index in the expression string
         * @param isNumberLike Whether or not the character resembles a number
         * @param array A temporary array used to aggregate similar character types.
         * @return {number} The new index in the expression string
         */
        _lookAhead(index: number, isNumberLike: boolean, array: Array<string>): number {
            var ch: string,
                input = this._input;

            while (++index) {
                if (this._checkType((ch = input[index]), isNumberLike)) {
                    array.push(ch);
                } else {
                    break;
                }
            }
            return index - 1;
        }

        /**
         * Looks ahead in the expression to try and complete the 
         * current operator.
         * 
         * @param char The operator to find
         * @param index The current index in the expression string
         */
        _lookAheadForOperatorFn(char: string, index: number): ILookAheadResult {
            var ch: string,
                fn: string,
                input = this._input;

            while ((++index < input.length) && ch !== '') {
                ch = input[index];
                fn = char + ch;

                if (isOperator(fn)) {
                    char = fn;
                } else {
                    break;
                }
            }
            return { char: char, index: index - 1 };
        }

        /**
         * Looks ahead in the expression until it comes to the ending 
         * character to try and complete a particular sequence 
         * (i.e. - a string literal).
         * 
         * @param char The starting character
         * @param endChar The ending character
         * @param index The current index in the expression string
         * @param includeDelimiter Whether or not to include the delimiter 
         * in the result
         */
        _lookAheadForDelimiter(char: string, endChar: string,
            index: number, includeDelimiter?: boolean): ILookAheadResult {
            var ch: string,
                input = this._input;

            while ((ch = input[++index]) !== endChar) {
                char += ch;
            }
            if (includeDelimiter) {
                char = char.substr(1);
                index++;
            }
            return { char: char, index: index - 1 };
        }

        /**
         * Pops the operator stack onto the output queue until a particular 
         * operator value is reached.
         * 
         * @param topOperator The top of the operator stack
         * @param char The operator value being searched for
         * @param error The error to throw in the case that the expression 
         * is invalid.
         */
        _popStackForVal(topOperator: any, char: string, error: string): void {
            var outputQueue = this.__outputQueue,
                operatorStack = this.__operatorStack;

            while (topOperator.val !== char) {
                outputQueue.push(operatorStack.shift());
                topOperator = operatorStack[0];
                if (operatorStack.length === 0) {
                    this._throwError(error);
                }
            }
        }

        /**
         * Check if the 'val' property is equal to a particular character.
         * 
         * @param obj The obj whose 'val' property to compare
         * @param char The char to compare with
         */
        _isValEqual(obj: any, char: string): boolean {
            if (isNull(obj) || isNull(obj.val)) {
                return isNull(char);
            } else if (obj.val === '') {
                return char === '';
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
            if (isNull(obj) || isNull(obj.val)) {
                return !isNull(char);
            } else if (obj.val === '') {
                return char !== '';
            }
            return char.indexOf(obj.val) === -1;
        }

        /**
         * Reset the tokenizer's properties.
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
         * Throw an exception in the case of an error.
         * 
         * @param error The error message to throw
         */
        _throwError(error: string): void {
            var $exception: IExceptionStatic = acquire(__ExceptionStatic);
            $exception.fatal(error + ' in ' + this._input, $exception.PARSE);
        }

        /**
         * Checks if a single character is numeric.
         * 
         * @param char The character to check.
         */
        _isNumeric(char: string): boolean {
            return ('0' <= char && char <= '9');
        }

        /**
         * Checks if a single character is a space.
         * 
         * @param char The character to check.
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
         * Checks if a single character is an alphabetical 
         * type character.
         * 
         * @param char The character to check.
         */
        _isAlpha(char: string): boolean {
            return ('a' <= char && char <= 'z' ||
                'A' <= char && char <= 'Z' ||
                '@' === char ||
                '_' === char ||
                '$' === char);
        }

        /**
         * Checks if a single character is alphanumeric.
         * 
         * @param char The character to check.
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
         * Checks if a string has proper javascript variable syntax.
         * 
         * @param input The string to check.
         */
        _isStringValidVariable(input: string): boolean {
            return !this.__variableRegex.test(input);
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
     * Describes an object used to find tokens for an expression and create ITokens.
     */
    export interface ITokenizer {
        /**
         * Takes in an expression string and outputs ITokens.
         * 
         * @param input The expression string to tokenize.
         */
        createTokens(input: string): Array<IToken>;
    }

    /**
     * Describes a token in an expression.
     */
    export interface IToken {
        /**
         * The string or number value of the token.
         */
        val: any;

        /**
         * Denotes the type of token, as well as the number
         * of arguments for a function if it is the token.
         * 
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
     * Provides all the necessary details on how to evaluate a token.
     */
    export interface ITokenDetails {
        /**
         * The precedence that this token takes with respect to the 
         * evaluation order.
         */
        precedence: number;

        /**
         * Whether or not the token associates with the expression on
         * their left or right.
         */
        associativity: string;

        /**
         * A function used to evaluate an operator expression.
         */
        fn: Function;
    }

    /**
     * An object describing the result of looking ahead in the expression.
     */
    export interface ILookAheadResult {
        /**
         * The resultant string after after looking ahead
         */
        char: string;

        /**
         * The new current index in the expression string
         */
        index: number;
    }
}
