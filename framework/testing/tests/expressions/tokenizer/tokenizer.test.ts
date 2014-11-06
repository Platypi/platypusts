/// <reference path="../../../typings/tsd.d.ts" />

module tests.expressions.tokenizer {
    var tokenizer = plat.acquire(plat.expressions.ITokenizer),
        tests: Array<ITokenTest> = [{
            name: 'Mathematical Operations',
            expression: '5 * 3 + (12 - 5) * 10 / 2',
            expected: [
                { val: 5, args: 0 },
                { val: 3, args: 0 },
                { val: '*', args: 2 },
                { val: 12, args: 0 },
                { val: 5, args: 0 },
                { val: '-', args: 2 },
                { val: 10, args: 0 },
                { val: '*', args: 2 },
                { val: 2, args: 0 },
                { val: '/', args: 2 },
                { val: '+', args: 2 }
            ]
        },
        {
            name: 'String + Number',
            expression: '"hi " + (5 * 3 + (12 - 5) * 10)',
            expected: [
                { val: 'hi ', args: 0 },
                { val: 5, args: 0 },
                { val: 3, args: 0 },
                { val: '*', args: 2 },
                { val: 12, args: 0 },
                { val: 5, args: 0 },
                { val: '-', args: 2 },
                { val: 10, args: 0 },
                { val: '*', args: 2 },
                { val: '+', args: 2 },
                { val: '+', args: 2 }
            ]
        },
        {
            name: 'Identifier + Function call',
            expression: 'bar.baz.value.text()',
            expected: [
                { val: 'bar', args: -1 },
                { val: 'baz', args: -1 },
                { val: '.', args: 0 },
                { val: 'value', args: -1 },
                { val: '.', args: 0 },
                { val: 'text', args: -2 },
                { val: '.', args: 0 },
                { val: '()', args: 0 }
            ]
        },
        {
            name: 'Array-notation + Function with arguments',
            expression: 'bar["baz"]["value3"]("Quick and ", "tasty ", fudge())',
            expected: [
                { val: 'bar', args: -1 },
                { val: 'baz', args: 0 },
                { val: '[]', args: 0 },
                { val: 'Quick and ', args: 0 },
                { val: 'tasty ', args: 0 },
                { val: 'fudge', args: -2 },
                { val: '()', args: 0 },
                { val: 'value3', args: 0 },
                { val: '[]', args: 0 },
                { val: '()', args: 3 },
            ]
        },
        {
            name: 'Ternary',
            expression: ' 2 > 1 ? !test : fudge()',
            expected: [
                { val: 2, args: 0 },
                { val: 1, args: 0 },
                { val: '>', args: 2 },
                { val: 'test', args: -1 },
                { val: '!', args: 1 },
                { val: '?', args: -2 },
                { val: 'fudge', args: -2 },
                { val: '()', args: 0 },
                { val: ':', args: -2 }
            ]
        },
        {
            name: 'Double Ternary + object literal',
            expression: '(math()) > 0 ? 3 > 13 ? fudge() : { test: test } : arrayTest',
            expected: [
                { val: 'math', args: -2 },
                { val: '()', args: 0 },
                { val: 0, args: 0 },
                { val: '>', args: 2 },
                { val: 3, args: 0 },
                { val: 13, args: 0 },
                { val: '>', args: 2 },
                { val: 'fudge', args: -2 },
                { val: '()', args: 0 },
                { val: '?', args: -2 },
                { val: 'test', args: 1 },
                { val: 'test', args: -1 },
                { val: '{}', args: 1 },
                { val: ':', args: -2 },
                { val: '?', args: -2 },
                { val: 'arrayTest', args: -1 },
                { val: ':', args: -2 }
            ]
        },
        {
            name: 'Array-notation + Function call inside indexer',
            expression: 'bar[baz()]["value"]["text"]()',
            expected: [
                { val: 'bar', args: -1 },
                { val: 'baz', args: -2 },
                { val: '()', args: 0 },
                { val: '[]', args: 0 },
                { val: 'value', args: 0 },
                { val: '[]', args: 0 },
                { val: 'text', args: 0 },
                { val: '[]', args: 0 },
                { val: '()', args: 0 }
            ]
        },
        {
            name: 'Array-notation + ternary indexer',
            expression: 'arrayTest[2 < 1 ? 0 : 1]',
            expected: [
                { val: 'arrayTest', args: -1 },
                { val: 2, args: 0 },
                { val: 1, args: 0 },
                { val: '<', args: 2 },
                { val: 0, args: 0 },
                { val: '?', args: -2 },
                { val: 1, args: 0 },
                { val: ':', args: -2 },
                { val: '[]', args: 0 }
            ]
        },
        {
            name: 'Equals test',
            expression: '1 === "1"',
            expected: [
                { val: 1, args: 0 },
                { val: '1', args: 0 },
                { val: '===', args: 2 }
            ]
        },
        {
            name: 'Multiple parens',
            expression: '(((math() + 20) !== 25) ? bar() + " hello" : baz() + " world " + arrayTest[0])',
            expected: [
                { val: 'math', args: -2 },
                { val: '()', args: 0 },
                { val: 20, args: 0 },
                { val: '+', args: 2 },
                { val: 25, args: 0 },
                { val: '!==', args: 2 },
                { val: 'bar', args: -2 },
                { val: '()', args: 0 },
                { val: ' hello', args: 0 },
                { val: '+', args: 2 },
                { val: '?', args: -2 },
                { val: 'baz', args: -2 },
                { val: '()', args: 0 },
                { val: ' world ', args: 0 },
                { val: '+', args: 2 },
                { val: 'arrayTest', args: -1 },
                { val: 0, args: 0 },
                { val: '[]', args: 0 },
                { val: '+', args: 2 },
                { val: ':', args: -2 }
            ]
        },
        {
            name: 'Array literal',
            expression: '[1, 2, 3]',
            expected: [
                { val: 1, args: 0 },
                { val: 2, args: 0 },
                { val: 3, args: 0 },
                { val: '[]', args: 3 }
            ]
        },
        {
            name: 'Array literal indexing with function call',
            expression: '[baz, bar.baz.value3][1]("A crazy ", bar(), " test")',
            expected: [
                { val: 'baz', args: -1 },
                { val: 'bar', args: -1 },
                { val: 'baz', args: -1 },
                { val: '.', args: 0 },
                { val: 'value3', args: -1 },
                { val: '.', args: 0 },
                { val: '[]', args: 2 },
                { val: 'A crazy ', args: 0 },
                { val: 'bar', args: -2 },
                { val: '()', args: 0 },
                { val: ' test', args: 0 },
                { val: 1, args: 0 },
                { val: '[]', args: 0 },
                { val: '()', args: 3 }
            ]
        },
        {
            name: 'Embedded functions and arrays',
            expression: 'embed()(2)[0]()',
            expected: [
                { val: 'embed', args: -2 },
                { val: '()', args: 0 },
                { val: 2, args: 0 },
                { val: '()', args: 1 },
                { val: 0, args: 0 },
                { val: '[]', args: 0 },
                { val: '()', args: 0 },
            ]
        },
        {
            name: 'Array indexing',
            expression: 'arrayTest[0]',
            expected: [
                { val: 'arrayTest', args: -1 },
                { val: 0, args: 0 },
                { val: '[]', args: 0 }
            ]
        },
        {
            name: 'Ternary + Array literal',
            expression: '1 + 2 > 4 ? test : [0]',
            expected: [
                { val: 1, args: 0 },
                { val: 2, args: 0 },
                { val: '+', args: 2 },
                { val: 4, args: 0 },
                { val: '>', args: 2 },
                { val: 'test', args: -1 },
                { val: '?', args: -2 },
                { val: 0, args: 0 },
                { val: '[]', args: 1 },
                { val: ':', args: -2 }
            ]
        },
        {
            name: 'Unary operator',
            expression: '-math() + 65',
            expected: [
                { val: 'math', args: -2 },
                { val: '()', args: 0 },
                { val: '-', args: 1 },
                { val: 65, args: 0 },
                { val: '+', args: 2 }
            ]
        },
        {
            name: 'Nested object literals',
            expression: '{ test: { test: { test: 1 } } }',
            expected: [
                { val: 'test', args: 1 },
                { val: 'test', args: 1 },
                { val: 'test', args: 1 },
                { val: 1, args: 0 },
                { val: '{}', args: 1 },
                { val: '{}', args: 1 },
                { val: '{}', args: 1 },
            ]
        },
        {
            name: 'Ternary + array literal + function calls',
            expression: '1 + 2 > 4 ? test : test == "hello" ? [baz(), bar.baz.value3(1, 2, 3)] : 0',
            expected: [
                { val: 1, args: 0 },
                { val: 2, args: 0 },
                { val: '+', args: 2 },
                { val: 4, args: 0 },
                { val: '>', args: 2 },
                { val: 'test', args: -1 },
                { val: '?', args: -2 },
                { val: 'test', args: -1 },
                { val: 'hello', args: 0 },
                { val: '==', args: 2 },
                { val: 'baz', args: -2 },
                { val: '()', args: 0 },
                { val: 'bar', args: -1 },
                { val: 'baz', args: -1 },
                { val: '.', args: 0 },
                { val: 1, args: 0 },
                { val: 2, args: 0 },
                { val: 3, args: 0 },
                { val: 'value3', args: -2 },
                { val: '.', args: 0 },
                { val: '()', args: 3 },
                { val: '[]', args: 2 },
                { val: '?', args: -2 },
                { val: 0, args: 0 },
                { val: ':', args: -2 },
                { val: ':', args: -2 }
            ]
        },
        {
            name: 'Ternary with keyword',
            expression: 'spam === undefined ? [1] : [0]',
            expected: [
                { val: 'spam', args: -1 },
                { val: 'undefined', args: -1 },
                { val: '===', args: 2 },
                { val: 1, args: 0 },
                { val: '[]', args: 1 },
                { val: '?', args: -2 },
                { val: 0, args: 0 },
                { val: '[]', args: 1 },
                { val: ':', args: -2 }
            ]
        },
        {
            name: 'Alias test',
            expression: '@five + math()',
            expected: [
                { val: '@five', args: -1 },
                { val: 'math', args: -2 },
                { val: '()', args: 0 },
                { val: '+', args: 2 }
            ]
        },
        {
            name: 'Empty string',
            expression: '',
            expected: []
        },
        {
            name: 'Empty string expression',
            expression: '"" !== test',
            expected: [
                { val: '', args: 0 },
                { val: 'test', args: -1 },
                { val: '!==', args: 2 }
            ]
        },
        {
            name: 'Empty string ternary',
            expression: 'not === "" ? [true] : [false]',
            expected: [
                { val: 'not', args: -1 },
                { val: '', args: 0 },
                { val: '===', args: 2 },
                { val: 'true', args: -1 },
                { val: '[]', args: 1 },
                { val: '?', args: -2 },
                { val: 'false', args: -1 },
                { val: '[]', args: 1 },
                { val: ':', args: -2 }
            ]
        },
        {
            name: 'Invalid expression',
            expression: 'bar.arrayTest.0.array.0',
            expected: [
                { val: 'bar', args: -1 },
                { val: 'arrayTest', args: -1 },
                { val: '.', args: 0 },
                { val: 0, args: 0 },
                { val: '.', args: 0 },
                { val: 'array', args: -1 },
                { val: '.', args: 0 },
                { val: 0, args: 0 },
                { val: '.', args: 0 }
            ]
        },
        {
            name: 'Null keyword',
            expression: 'null',
            expected: [
                { val: 'null', args: -1 }
            ]
        },
        {
            name: 'Undefined keyword',
            expression: 'undefined',
            expected: [
                { val: 'undefined', args: -1 }
            ]
        },
        {
            name: 'Undefined/Null check',
            expression: 'undefined == null',
            expected: [
                { val: 'undefined', args: -1 },
                { val: 'null', args: -1 },
                { val: '==', args: 2 }
            ]
        },
        {
            name: 'Undefined string',
            expression: 'spam === "undefined"',
            expected: [
                { val: 'spam', args: -1 },
                { val: 'undefined', args: 0 },
                { val: '===', args: 2 }
            ]
        },
        {
            name: 'Control function with array literals',
            expression: 'wild([4,5,6], [1, 2, 3])',
            expected: [
                { val: 4, args: 0 },
                { val: 5, args: 0 },
                { val: 6, args: 0 },
                { val: '[]', args: 3 },
                { val: 1, args: 0 },
                { val: 2, args: 0 },
                { val: 3, args: 0 },
                { val: '[]', args: 3 },
                { val: 'wild', args: -2 },
                { val: '()', args: 2 },
            ]
        },
        {
            name: 'Decimal with Prefix',
            expression: '0.5 + 1',
            expected: [
                { val: 0.5, args: 0 },
                { val: 1, args: 0 },
                { val: '+', args: 2 }
            ]
        },
        {
            name: 'Decimal without Prefix',
            expression: '.5 + 1',
            expected: [
                { val: 0.5, args: 0 },
                { val: 1, args: 0 },
                { val: '+', args: 2 }
            ]
        },
        {
            name: 'Multiple Unaries',
            expression: '-.5 + ~-1',
            expected: [
                { val: 0.5, args: 0 },
                { val: '-', args: 1 },
                { val: 1, args: 0 },
                { val: '-', args: 1 },
                { val: '~', args: 1 },
                { val: '+', args: 2 }
            ]
        }
    ];

    describe('Tokenizer Tests', () => {
        tests.forEach((test) => {
            it('should test ' + test.name, () => {
                var tokens = tokenizer.createTokens(test.expression);

                expect(tokens).toEqual(test.expected);
            });
        });
    });

    interface ITokenTest {
        name: string;
        expression: string;
        expected: Array<plat.expressions.IToken>;
    }
}
