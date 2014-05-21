/// <reference path="../../typings/tsd.d.ts" />

interface IUtilTest {
    name: string;
    fn: string;
    args: Array<any>;
    expected: any;
}

var utils: plat.IUtils = plat.acquire(plat.Utils);

function isTrue(obj) {
    return obj === true;
}

var toBeTests: Array<IUtilTest> = [
    {
        name: 'extend with undefined args',
        fn: 'extend',
        args: [undefined],
        expected: undefined
    },
    {
        name: 'isObject - TRUE',
        fn: 'isObject',
        args: [{}],
        expected: true
    },
    {
        name: 'isObject - FALSE',
        fn: 'isObject',
        args: ['not an object'],
        expected: false
    },
    {
        name: 'isWindow - TRUE',
        fn: 'isWindow',
        args: [window],
        expected: true
    },
    {
        name: 'isWindow - FALSE',
        fn: 'isWindow',
        args: [document],
        expected: false
    },
    {
        name: 'isDocument - TRUE',
        fn: 'isDocument',
        args: [document],
        expected: true
    },
    {
        name: 'isDocument - FALSE',
        fn: 'isDocument',
        args: [window],
        expected: false
    },
    {
        name: 'isNode - TRUE',
        fn: 'isNode',
        args: [document.createElement('a').cloneNode()],
        expected: true
    },
    {
        name: 'isNode - FALSE',
        fn: 'isNode',
        args: [window],
        expected: false
    },
    {
        name: 'isString - TRUE',
        fn: 'isString',
        args: ['this is a string'],
        expected: true
    },
    {
        name: 'isString - FALSE',
        fn: 'isString',
        args: [12345],
        expected: false
    },
    {
        name: 'isEmpty String - TRUE',
        fn: 'isEmpty',
        args: [''],
        expected: true
    },
    {
        name: 'isEmpty String - FALSE',
        fn: 'isEmpty',
        args: [' '],
        expected: false
    },
    {
        name: 'isEmpty Null - TRUE',
        fn: 'isEmpty',
        args: [null],
        expected: true
    },
    {
        name: 'isEmpty Array - TRUE',
        fn: 'isEmpty',
        args: [[]],
        expected: true
    },
    {
        name: 'isEmpty Array - FALSE',
        fn: 'isEmpty',
        args: [['']],
        expected: false
    },
    {
        name: 'isEmpty Number',
        fn: 'isEmpty',
        args: [2],
        expected: false
    },
    {
        name: 'isEmpty Object - TRUE',
        fn: 'isEmpty',
        args: [{}],
        expected: true
    },
    {
        name: 'isEmpty Object - FALSE',
        fn: 'isEmpty',
        args: [{ foo: null }],
        expected: false
    },
    {
        name: 'isBoolean true',
        fn: 'isBoolean',
        args: [true],
        expected: true
    },
    {
        name: 'isBoolean false',
        fn: 'isBoolean',
        args: [false],
        expected: true
    },
    {
        name: 'isBoolean Object',
        fn: 'isBoolean',
        args: [{}],
        expected: false
    },
    {
        name: 'isNumber Number',
        fn: 'isNumber',
        args: [2],
        expected: true
    },
    {
        name: 'isNumber Array',
        fn: 'isNumber',
        args: [[]],
        expected: false
    },
    {
        name: 'isFunction Function',
        fn: 'isFunction',
        args: [isTrue],
        expected: true
    },
    {
        name: 'isFunction Object',
        fn: 'isFunction',
        args: [{}],
        expected: false
    },
    {
        name: 'isNull null',
        fn: 'isNull',
        args: [null],
        expected: true
    },
    {
        name: 'isNull undefined',
        fn: 'isNull',
        args: [undefined],
        expected: true
    },
    {
        name: 'isNull Object',
        fn: 'isNull',
        args: [{}],
        expected: false
    },
    {
        name: 'isUndefined undefined',
        fn: 'isUndefined',
        args: [undefined],
        expected: true
    },
    {
        name: 'isUndefined null',
        fn: 'isUndefined',
        args: [null],
        expected: false
    },
    {
        name: 'isArray Array',
        fn: 'isArray',
        args: [[]],
        expected: true
    },
    {
        name: 'isArray Object',
        fn: 'isArray',
        args: [{ length: 2 }],
        expected: false
    },
    {
        name: 'isArray String',
        fn: 'isArray',
        args: ['not an array'],
        expected: false
    },
    {
        name: 'isArrayLike Array',
        fn: 'isArrayLike',
        args: [[]],
        expected: true
    },
    {
        name: 'isArrayLike Object',
        fn: 'isArrayLike',
        args: [{ notLength: 2 }],
        expected: false
    },
    {
        name: 'isArrayLike Node',
        fn: 'isArrayLike',
        args: [document.createElement('select')],
        expected: true
    },
    {
        name: 'isArrayLike String',
        fn: 'isArrayLike',
        args: ['not an array, but array like'],
        expected: true
    },
    {
        name: 'isArrayLike null',
        fn: 'isArrayLike',
        args: [null],
        expected: false
    },
    {
        name: 'isArrayLike window',
        fn: 'isArrayLike',
        args: [window],
        expected: false
    },
    {
        name: 'isArrayLike function',
        fn: 'isArrayLike',
        args: [isTrue],
        expected: false
    },
    {
        name: 'some null',
        fn: 'some',
        args: [null, isTrue],
        expected: false
    },
    {
        name: 'some Array - TRUE',
        fn: 'some',
        args: [[true, false, true], isTrue],
        expected: true
    },
    {
        name: 'some Array - FALSE',
        fn: 'some',
        args: [[false, false, false], isTrue],
        expected: false
    },
    {
        name: 'some Object - TRUE',
        fn: 'some',
        args: [{ foo: true, bar: false, baz: true }, isTrue],
        expected: true
    },
    {
        name: 'some Object - FALSE',
        fn: 'some',
        args: [{ foo: false, bar: false, baz: false }, isTrue],
        expected: false
    },
    {
        name: 'some String - True',
        fn: 'some',
        args: ['foo', function () { return true; }],
        expected: true
    },
    {
        name: 'camelCase null',
        fn: 'camelCase',
        args: [null],
        expected: null
    },
    {
        name: 'camelCase with capital',
        fn: 'camelCase',
        args: ['Foo bar'],
        expected: 'fooBar'
    },
    {
        name: 'camelCase with both capital',
        fn: 'camelCase',
        args: ['Foo Bar'],
        expected: 'fooBar'
    },
    {
        name: 'camelCase with spinal-case',
        fn: 'camelCase',
        args: ['foo-bar'],
        expected: 'fooBar'
    },
    {
        name: 'camelCase with dot.case',
        fn: 'camelCase',
        args: ['foo.bar'],
        expected: 'fooBar'
    },
    {
        name: 'camelCase with snake_case',
        fn: 'camelCase',
        args: ['foo_bar'],
        expected: 'fooBar'
    },
    {
        name: 'camelCase with string',
        fn: 'camelCase',
        args: ['fooBar'],
        expected: 'fooBar'
    },
    {
        name: 'camelCase with string with spaces',
        fn: 'camelCase',
        args: ['foo bar'],
        expected: 'fooBar'
    }
], toEqualTests: Array<IUtilTest> = [{
        name: 'extend with incorrect arguments',
        fn: 'extend',
        args: [{}, true, false, 2, 'a'],
        expected: {}
    },
    {
        name: 'filter null',
        fn: 'filter',
        args: [null, isTrue],
        expected: []
    },
    {
        name: 'filter number',
        fn: 'filter',
        args: [3, isTrue],
        expected: []
    },
    {
        name: 'filter Array',
        fn: 'filter',
        args: [[true, false, true], isTrue],
        expected: [true, true]
    },
    {
        name: 'filter Object',
        fn: 'filter',
        args: [{ foo: true, bar: false, baz: true }, isTrue],
        expected: [true, true]
    },
    {
        name: 'where Array',
        fn: 'where',
        args: [[{ foo: 'foo', bar: 'bar' }, { foo: 'bar', bar: 'foo' }], { foo: 'foo' }],
        expected: [{ foo: 'foo', bar: 'bar' }]
    },
    {
        name: 'where Object',
        fn: 'where',
        args: [{ foo: { foo: 'foo', bar: 'bar' }, bar: { foo: 'bar', bar: 'foo' } }, { foo: 'foo' }],
        expected: [{ foo: 'foo', bar: 'bar' }]
    },
    {
        name: 'map null',
        fn: 'map',
        args: [null, isTrue],
        expected: []
    },
    {
        name: 'map Object',
        fn: 'map',
        args: [{ foo: true, bar: false, baz: true }, isTrue],
        expected: [true, false, true]
    },
    {
        name: 'map Array',
        fn: 'map',
        args: [[true, false, true], isTrue],
        expected: [true, false, true]
    },
    {
        name: 'pluck Array',
        fn: 'pluck',
        args: [[{ foo: 'bar', bar: 'foo' }, { foo: 'foo', bar: 'bar' }], 'foo'],
        expected: ['bar', 'foo']
    },
    {
        name: 'pluck Object',
        fn: 'pluck',
        args: [{ foo: { foo: 'bar', bar: 'foo' }, bar: { foo: 'foo', bar: 'bar' } }, 'foo'],
        expected: ['bar', 'foo']
    }
];



describe('Utils Tests', () => {
    toBeTests.forEach((test) => {
        it(test.name, () => {
            var result = utils[test.fn].apply(utils, test.args);
            expect(result).toBe(test.expected);
        });
    });

    toEqualTests.forEach((test) => {
        it(test.name, () => {
            var result = utils[test.fn].apply(utils, test.args);
            expect(result).toEqual(test.expected);
        });
    });

    it('noop', () => {
        var spy = spyOn(utils, 'noop');

        utils.noop();
        expect(spy.wasCalled).toBe(true);
    });

    it('extend with 3 args', () => {
        var foo = { foo: 'foo' },
            bar = { foo: 'bar', bar: { name: 'bar' } },
            baz = utils.extend({ baz: 'baz' }, foo, bar);

        expect(baz).toEqual({ foo: 'bar', bar: { name: 'bar' }, baz: 'baz' });
        expect(baz.bar).toBe(bar.bar);
    });

    it('deep extend', () => {
        var foo = { foo: 'foo' },
            bar = { foo: 'bar', bar: { name: 'bar' } },
            baz = utils.deepExtend({ baz: 'baz' }, foo, bar);

        expect(baz).toEqual({ foo: 'bar', bar: { name: 'bar' }, baz: 'baz' });
        expect(baz.bar).not.toBe(bar.bar);
        expect(baz.bar).toEqual(bar.bar);
    });

    it('forEach Array', () => {
        var spy = spyOn(utils, 'noop');

        utils.forEach([true, true, true], utils.noop);

        expect(spy.callCount).toBe(3);
    });

    it('forEach Object', () => {
        var spy = spyOn(utils, 'noop');

        utils.forEach({ foo: true, bar: true, baz: true }, utils.noop);

        expect(spy.callCount).toBe(3);
    });

    it('forEach null', () => {
        var spy = spyOn(utils, 'noop');

        utils.forEach(null, utils.noop);

        expect(spy.wasCalled).toBe(false);
    });

    it('forEach string', () => {
        var spy = spyOn(utils, 'noop');

        utils.forEach('foo', utils.noop);

        expect(spy.callCount).toBe(3);
        expect(spy.mostRecentCall.args).toEqual(['o', 2, 'foo']);
    });

    it('some String - FALSE', () => {
        var spy = spyOn(utils, 'noop');

        expect(utils.some('foo', <any>utils.noop)).toBe(false);

        expect(spy.callCount).toBe(3);
        expect(spy.mostRecentCall.args).toEqual(['o', 2, 'foo']);
    });

    it('postpone', () => {
        var done = false,
            postArg: any;

        runs(() => {
            utils.postpone((arg) => {
                done = true;
                postArg = arg;
            }, ['foo']);
        });

        waitsFor(() => {
            return done;
        }, 'postArg should be set', 5);

        runs(() => {
            expect(postArg).toBe('foo');
        });
    });

    it('defer', () => {
        var done = false,
            postArg: any;

        runs(() => {
            utils.defer((arg) => {
                done = true;
                postArg = arg;
            }, 0, ['foo']);
        });

        waitsFor(() => {
            return done;
        }, 'postArg should be set', 5);

        runs(() => {
            expect(postArg).toBe('foo');
        });
    });

    it('defer - CANCELLED', () => {
        var done = false,
            postArg: any;

        runs(() => {
            utils.defer((arg) => {
                postArg = arg;
            }, 0, ['foo'])();

            setTimeout(() => {
                done = true;
            }, 4);
        });

        waitsFor(() => {
            return done;
        }, 'postArg should be set', 5);

        runs(() => {
            expect(postArg).not.toBe('foo');
        });
    });

    it('uniqueId no prefix', () => {
        var uid = utils.uniqueId();

        expect(uid.length).toBe(2);
    });

    it('uniqueId no prefix', () => {
        var rand = Math.random().toString() + '_',
            uid = utils.uniqueId(rand);

        expect(uid).toBe(rand + '00');
    });
});
