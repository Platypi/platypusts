/// <reference path="../../../typings/tsd.d.ts" />

var context = {
    title: 'Parser',
    fooFn: function (arg0, arg1) {
        return arg0 + arg1;
    },
    wild: function (array0, array1) {
        return array0.concat(array1);
    },
    five: 'high ',
    barz: {
        arrayTest: ['cool', 'beans', 'test'],
        customers: {
            value: {
                text: function () {
                    return 'function text';
                }
            },
            isDumb: true,
            value2: 'value2',
            value3: function (input: string, input2: string, input3: string) {
                return input + input2 + input3;
            }
        },
        morgan: 'boss',
        test: function () {
            return 'barz';
        }
    },
    foo: function (arg: string) {
        return arg;
    },
    fudge: function () {
        return 'chocolate';
    },
    math: function () {
        return 5;
    },
    condition: true,
    test: 'hello',
    arrayTest: ['cool', 'beans', 'test'],
    mathFn: function (input1, input2) {
        return input1 + input2;
    },
    thisThat: function () {
        return this.otherThis;
    },
    thirdThis: function () {
        return this.thisThis;
    },
    otherThis: function () {
        return this.thirdThis;
    },
    thisThis: function () {
        return this;
    },
    customers: function () {
        return 'customers';
    },
    embed: function () {

        function createFn(num) {
            return function () {
                return 'The number ' + num;
            };
        }

        return function (num: number) {
            var array = [];
            while (num--) {
                array.push(createFn(num));
            }
            return array;
        };
    },
    not: '',
    numString: '1',
    isTrue: function (obj: any) {
        return obj === true;
    }
};

var tests: Array<IParserTest> = [
    {
        name: 'having no context',
        returns: 50,
        identifiers: [],
        expression: '5 * 3 + (12 - 5) * 10 / 2',
        fn: 'toBe'
    },
    {
        name: 'a string + number',
        returns: 'hi 85',
        identifiers: [],
        expression: '"hi " + (5 * 3 + (12 - 5) * 10)',
        fn: 'toBe'
    },
    {
        name: 'an identifier + function call',
        returns: 'function text',
        identifiers: ['barz.customers.value.text'],
        expression: 'barz.customers.value.text()',
        fn: 'toBe'
    },
    {
        name: 'array-notation + function with arguments',
        returns: 'Quick and tasty chocolate',
        identifiers: ['barz.customers.value3', 'fudge'],
        expression: 'barz["customers"]["value3"]("Quick and ", "tasty ", fudge())',
        fn: 'toBe'
    },
    {
        name: 'a ternary',
        returns: false,
        identifiers: ['fudge', 'test'],
        expression: '2 > 1 ? !test : fudge()',
        fn: 'toBe'
    },
    {
        name: 'a double ternary + object literal',
        returns: { test: 'hello' },
        identifiers: ['arrayTest', 'test', 'fudge', 'math'],
        expression: '(math()) > 0 ? 3 > 13 ? fudge() : { test: test } : arrayTest',
        fn: 'toEqual'
    },
    {
        name: 'array-notation + function call inside indexer',
        returns: 'function text',
        identifiers: ['barz', 'customers'],
        expression: 'barz[customers()]["value"]["text"]()',
        fn: 'toBe'
    },
    {
        name: 'array-notation + ternary indexer',
        returns: 'beans',
        identifiers: ['arrayTest'],
        expression: 'arrayTest[2 < 1 ? 0 : 1]',
        fn: 'toBe'
    },
    {
        name: 'strict equals',
        returns: false,
        identifiers: [],
        expression: '1 === "1"',
        fn: 'toBe'
    },
    {
        name: 'multiple parens',
        returns: 'customers is not cool',
        identifiers: ['arrayTest.0', 'customers', 'math'],
        expression: '(((math() + 20) !== 25) ? customers() + " sucks" : customers() + " is not " + arrayTest[0])',
        fn: 'toBe'
    },
    {
        name: 'an array literal',
        returns: [1, 2, 3],
        identifiers: [],
        expression: '[1, 2, 3]',
        fn: 'toEqual'
    },
    {
        name: 'an array literal indexing with function call',
        returns: 'A crazy customers test',
        identifiers: ['customers', 'barz.customers.value3'],
        expression: '[customers, barz.customers.value3][1]("A crazy ", customers(), " test")',
        fn: 'toBe'
    },
    {
        name: 'embedded functions and arrays',
        returns: 'The number 1',
        identifiers: ['embed'],
        expression: 'embed()(2)[0]()',
        fn: 'toBe'
    },
    {
        name: 'array indexing',
        returns: 'cool',
        identifiers: ['arrayTest.0'],
        expression: 'arrayTest[0]',
        fn: 'toBe'
    },
    {
        name: 'a ternary + array literal',
        returns: [0],
        identifiers: ['test'],
        expression: '1 + 2 > 4 ? test : [0]',
        fn: 'toEqual'
    },
    {
        name: 'the unary- operator',
        returns: 60,
        identifiers: ['math'],
        expression: '-math() + 65',
        fn: 'toBe'
    },
    {
        name: 'nested object literals',
        returns: {
            test: {
                test: {
                    test: 1
                }
            }
        },
        identifiers: [],
        expression: '{ test: { test: { test: 1 } } }',
        fn: 'toEqual'
    },
    {
        name: 'a ternary + array literal + function calls',
        returns: ['customers', 6],
        identifiers: ['barz.customers.value3', 'customers', 'test'],
        expression: '1 + 2 > 4 ? test : test == "hello" ? [customers(), barz.customers.value3(1, 2, 3)] : 0',
        fn: 'toEqual'
    },
    {
        name: 'a ternary with keyword',
        returns: [1],
        identifiers: ['spam'],
        expression: 'spam === undefined ? [1] : [0]',
        fn: 'toEqual'
    },
    {
        name: 'an alias',
        returns: 'high 5',
        identifiers: ['@five', 'math'],
        expression: '@five + math()',
        fn: 'toBe'
    },
    {
        name: 'an empty string',
        returns: '',
        identifiers: [],
        expression: '',
        fn: 'toBe'
    },
    {
        name: 'an invalid expression',
        returns: undefined,
        identifiers: ['barz.arrayTest.0.array.0'],
        expression: 'barz.arrayTest.0.array.0',
        fn: 'toBe'
    },
    {
        name: 'an empty string ternary',
        returns: [true],
        identifiers: ['not'],
        expression: 'not === "" ? [true] : [false]',
        fn: 'toEqual'
    },
    {
        name: 'the null keyword',
        returns: null,
        identifiers: [],
        expression: 'null',
        fn: 'toBe'
    },
    {
        name: 'the undefined keyword',
        returns: undefined,
        identifiers: [],
        expression: 'undefined',
        fn: 'toBe'
    },
    {
        name: 'undefined == null',
        returns: true,
        identifiers: [],
        expression: 'undefined == null',
        fn: 'toBe'
    },
    {
        name: 'undefined string',
        returns: false,
        identifiers: ['spam'],
        expression: 'spam === "undefined"',
        fn: 'toBe'
    },
    {
        name: 'a function with array literals',
        returns: [4, 5, 6, 1, 2, 3],
        identifiers: ['wild'],
        expression: 'wild([4,5,6], [1, 2, 3])',
        fn: 'toEqual'
    },
    {
        name: 'the unary+ operator',
        returns: 1,
        identifiers: ['numString'],
        expression: '+numString',
        fn: 'toBe'
    },
    {
        name: 'the modulus operator',
        returns: 2,
        identifiers: [],
        expression: '5 % 3',
        fn: 'toBe'
    },
    {
        name: 'a bitwise not (~)  with positive number',
        returns: -3,
        identifiers: [],
        expression: '~2',
        fn: 'toBe'
    },
    {
        name: 'a bitwise not (~) with negative number',
        returns: 2,
        identifiers: [],
        expression: '~-3',
        fn: 'toBe'
    },
    {
        name: 'a bitwise shift right',
        returns: 1,
        identifiers: [],
        expression: '2 >> 1',
        fn: 'toBe'
    },
    {
        name: 'a bitwise shift left',
        returns: 4,
        identifiers: [],
        expression: '2 << 1',
        fn: 'toBe'
    },
    {
        name: 'a bitwise OR',
        returns: 3,
        identifiers: [],
        expression: '2 | 1',
        fn: 'toBe'
    },
    {
        name: 'a bitwise AND',
        returns: 2,
        identifiers: [],
        expression: '3 & 2',
        fn: 'toBe'
    },
    {
        name: 'a decimal with prefix',
        returns: 1.5,
        identifiers: [],
        expression: '0.5 + 1',
        fn: 'toBe'
    },
    {
        name: 'a decimal without prefix',
        returns: 1.5,
        identifiers: [],
        expression: '.5 + 1',
        fn: 'toBe'
    },
    {
        name: 'a negative decimal without prefix',
        returns: 0.5,
        identifiers: [],
        expression: '-.5 + 1',
        fn: 'toBe'
    },
    {
        name: 'multiple unaries',
        returns: 0.5,
        identifiers: [],
        expression: '-.5 + ~-1 - -1',
        fn: 'toBe'
    },
    {
        name: 'a string literal in array literal',
        returns: ['slice'],
        identifiers: [],
        expression: '["slice"]',
        fn: 'toEqual'
    },
    {
        name: 'a resource in object literal',
        returns: { condition: 'high ' },
        identifiers: ['@five'],
        expression: '{condition: @five}',
        fn: 'toEqual'
    },
    {
        name: 'a resource object in object literal',
        returns: { condition: true },
        identifiers: ['@context.condition'],
        expression: '{condition: @context.condition}',
        fn: 'toEqual'
    },
    {
        name: 'a resource function in object literal',
        returns: { condition: 8 },
        identifiers: ['@fn'],
        expression: '{condition: @fn(3, 5)}',
        fn: 'toEqual'
    },
    {
        name: 'a resource object with function in object literal',
        returns: { condition: 'hi five' },
        identifiers: ['@control.fn'],
        expression: '{ condition: @control.fn("five") }',
        fn: 'toEqual'
    },
    {
        name: 'a resource object in array literal in object literal',
        returns: { condition: ['hi five'] },
        identifiers: ['@control.fn'],
        expression: '{ condition: [@control.fn("five")] }',
        fn: 'toEqual'
    },
    {
        name: 'a resource object in array literal in object literal in another object Literal',
        returns: { condition: { test: ['hi five'] } },
        identifiers: ['@control.fn'],
        expression: '{ condition: { test: [@control.fn("five")] } }',
        fn: 'toEqual'
    },
    {
        name: 'a resource object in object literal in array literal in object Literal',
        returns: { condition: [{ five: 'hi five' }, 2] },
        identifiers: ['@control.fn'],
        expression: '{ condition: [{ five: @control.fn("five") }, 2] }',
        fn: 'toEqual'
    },
    {
        name: 'a resource object in function call in resource thats in object literal in array literal in object Literal',
        returns: { condition: [{ five: 'hi high ' }, 2] },
        identifiers: ['@control.fn', '@five'],
        expression: '{ condition: [{ five: @control.fn(@five) }, 2] }',
        fn: 'toEqual'
    },
    {
        name: 'continuous function calls with context',
        returns: 'hello',
        identifiers: ['thisThis'],
        expression: 'thisThis().otherThis()()().thirdThis()().thisThat()()()().test',
        fn: 'toEqual'
    },
    {
        name: 'logical or',
        returns: true,
        identifiers: ['isTrue'],
        expression: 'true || isTrue(true)',
        fn: 'toBe',
        watch: 'isTrue',
        wasCalled: false,
        callThrough: true
    },
    {
        name: 'logical or short circuit',
        returns: true,
        identifiers: ['isTrue'],
        expression: 'false || isTrue(true)',
        fn: 'toBe',
        watch: 'isTrue',
        wasCalled: true,
        callThrough: true
    },
    {
        name: 'logical and',
        returns: false,
        identifiers: ['isTrue'],
        expression: 'true && isTrue(false)',
        fn: 'toBe',
        watch: 'isTrue',
        wasCalled: true,
        callThrough: true
    },
    {
        name: 'logical and short circuit',
        returns: false,
        identifiers: ['isTrue'],
        expression: 'false && isTrue(false)',
        fn: 'toBe',
        watch: 'isTrue',
        wasCalled: false,
        callThrough: true
    }

];

var parser: plat.expressions.IParser = plat.acquire(plat.expressions.Parser);

describe('Parser Tests', () => {
    tests.forEach((test) => {
        it('should test ' + test.name, () => {
            var spy: jasmine.Spy;

            if (!!test.watch) {
                spy = spyOn(context, test.watch);

                if (test.callThrough) {
                    (<any>spy).andCallThrough();
                }
            }

            var parsed = parser.parse(test.expression),
                evaluate = parsed.evaluate(context, {
                    '@five': 'high ',
                    '@context': context,
                    '@fn': function (a, b) {
                        return a + b;
                    },
                    '@control': {
                        fn: function (a) {
                            return 'hi ' + a;
                        }
                    }
                });

            expect(parsed.expression).toEqual(test.expression);
            expect(parsed.identifiers).toEqual(test.identifiers);
            expect(evaluate)[test.fn](test.returns);

            if (!!spy) {
                expect(spy.wasCalled).toBe(test.wasCalled);
            }
        });
    });
});

interface IParserTest {
    name: string;
    returns: any;
    identifiers: Array<string>;
    expression: string;
    fn: string;
    watch?: string;
    callThrough?: boolean;
    wasCalled?: boolean;
}
