/// <reference path="../../typings/tsd.d.ts" />

module tests.utils {
    interface IUtilTest {
        name: string;
        fn: string;
        args: Array<any>;
        expected: any;
    }

    var utils = plat.acquire(plat.IUtils),
        Promise = plat.acquire(plat.async.IPromise);

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
            name: 'isObject and return true',
            fn: 'isObject',
            args: [{}],
            expected: true
        },
        {
            name: 'isObject and return false',
            fn: 'isObject',
            args: ['not an object'],
            expected: false
        },
        {
            name: 'isWindow and return true',
            fn: 'isWindow',
            args: [window],
            expected: true
        },
        {
            name: 'isWindow and return false',
            fn: 'isWindow',
            args: [document],
            expected: false
        },
        {
            name: 'isDocument and return true',
            fn: 'isDocument',
            args: [document],
            expected: true
        },
        {
            name: 'isDocument and return false',
            fn: 'isDocument',
            args: [window],
            expected: false
        },
        {
            name: 'isNode and return true',
            fn: 'isNode',
            args: [document.createElement('a').cloneNode()],
            expected: true
        },
        {
            name: 'isNode and return false',
            fn: 'isNode',
            args: [window],
            expected: false
        },
        {
            name: 'isDocumentFragment and return true',
            fn: 'isDocumentFragment',
            args: [document.createDocumentFragment()],
            expected: true
        },
        {
            name: 'isDocumentFragment and return false',
            fn: 'isDocumentFragment',
            args: [document],
            expected: false
        },
        {
            name: 'isString and return true',
            fn: 'isString',
            args: ['this is a string'],
            expected: true
        },
        {
            name: 'isString and return false',
            fn: 'isString',
            args: [12345],
            expected: false
        },
        {
            name: 'isRegExp and return true',
            fn: 'isRegExp',
            args: [/foo/],
            expected: true
        },
        {
            name: 'isRegExp and return false',
            fn: 'isRegExp',
            args: [12345],
            expected: false
        },
        {
            name: 'isEmpty with a string and return true',
            fn: 'isEmpty',
            args: [''],
            expected: true
        },
        {
            name: 'isEmpty with a string and return false',
            fn: 'isEmpty',
            args: [' '],
            expected: false
        },
        {
            name: 'isEmpty with null and return true',
            fn: 'isEmpty',
            args: [null],
            expected: true
        },
        {
            name: 'isEmpty with an array and return true',
            fn: 'isEmpty',
            args: [[]],
            expected: true
        },
        {
            name: 'isEmpty with an array and return false',
            fn: 'isEmpty',
            args: [['']],
            expected: false
        },
        {
            name: 'isEmpty with a number and return true',
            fn: 'isEmpty',
            args: [2],
            expected: false
        },
        {
            name: 'isEmpty with an object and return true',
            fn: 'isEmpty',
            args: [{}],
            expected: true
        },
        {
            name: 'isEmpty with an object and return false',
            fn: 'isEmpty',
            args: [{ foo: null }],
            expected: false
        },
        {
            name: 'isBoolean with true',
            fn: 'isBoolean',
            args: [true],
            expected: true
        },
        {
            name: 'isBoolean with false',
            fn: 'isBoolean',
            args: [false],
            expected: true
        },
        {
            name: 'isBoolean with an object',
            fn: 'isBoolean',
            args: [{}],
            expected: false
        },
        {
            name: 'isNumber with a number',
            fn: 'isNumber',
            args: [2],
            expected: true
        },
        {
            name: 'isNumber with an array',
            fn: 'isNumber',
            args: [[]],
            expected: false
        },
        {
            name: 'isFunction with a function',
            fn: 'isFunction',
            args: [isTrue],
            expected: true
        },
        {
            name: 'isFunction with an object',
            fn: 'isFunction',
            args: [{}],
            expected: false
        },
        {
            name: 'isNull with null',
            fn: 'isNull',
            args: [null],
            expected: true
        },
        {
            name: 'isNull with undefined',
            fn: 'isNull',
            args: [undefined],
            expected: true
        },
        {
            name: 'isNull with an object',
            fn: 'isNull',
            args: [{}],
            expected: false
        },
        {
            name: 'isUndefined with undefined',
            fn: 'isUndefined',
            args: [undefined],
            expected: true
        },
        {
            name: 'isUndefined with null',
            fn: 'isUndefined',
            args: [null],
            expected: false
        },
        {
            name: 'isArray with an array',
            fn: 'isArray',
            args: [[]],
            expected: true
        },
        {
            name: 'isArray with an object',
            fn: 'isArray',
            args: [{ length: 2 }],
            expected: false
        },
        {
            name: 'isArray with a string',
            fn: 'isArray',
            args: ['not an array'],
            expected: false
        },
        {
            name: 'isArrayLike with an array',
            fn: 'isArrayLike',
            args: [[]],
            expected: true
        },
        {
            name: 'isArrayLike with an object',
            fn: 'isArrayLike',
            args: [{ notLength: 2 }],
            expected: false
        },
        {
            name: 'isArrayLike with a node',
            fn: 'isArrayLike',
            args: [document.createElement('select')],
            expected: true
        },
        {
            name: 'isArrayLike with a string',
            fn: 'isArrayLike',
            args: ['not an array, but array like'],
            expected: true
        },
        {
            name: 'isArrayLike with null',
            fn: 'isArrayLike',
            args: [null],
            expected: false
        },
        {
            name: 'isArrayLike with the window',
            fn: 'isArrayLike',
            args: [window],
            expected: false
        },
        {
            name: 'isArrayLike with a function',
            fn: 'isArrayLike',
            args: [isTrue],
            expected: false
        },
        {
            name: 'some with null',
            fn: 'some',
            args: [null, isTrue],
            expected: false
        },
        {
            name: 'some with an array and return true',
            fn: 'some',
            args: [[true, false, true], isTrue],
            expected: true
        },
        {
            name: 'some with an array and return false',
            fn: 'some',
            args: [[false, false, false], isTrue],
            expected: false
        },
        {
            name: 'some with an object and return true',
            fn: 'some',
            args: [{ foo: true, bar: false, baz: true }, isTrue],
            expected: true
        },
        {
            name: 'some with an object and return false',
            fn: 'some',
            args: [{ foo: false, bar: false, baz: false }, isTrue],
            expected: false
        },
        {
            name: 'some with a string and return true',
            fn: 'some',
            args: ['foo', () => true],
            expected: true
        },
        {
            name: 'camelCase with null',
            fn: 'camelCase',
            args: [null],
            expected: null
        },
        {
            name: 'camelCase with first letter capital',
            fn: 'camelCase',
            args: ['Foo bar'],
            expected: 'fooBar'
        },
        {
            name: 'camelCase with both letters capital',
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
            name: 'camelCase with string and spaces',
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
                name: 'filter with null',
                fn: 'filter',
                args: [null, isTrue],
                expected: []
            },
            {
                name: 'filter with a number',
                fn: 'filter',
                args: [3, isTrue],
                expected: []
            },
            {
                name: 'filter with an rray',
                fn: 'filter',
                args: [[true, false, true], isTrue],
                expected: [true, true]
            },
            {
                name: 'filter with an object',
                fn: 'filter',
                args: [{ foo: true, bar: false, baz: true }, isTrue],
                expected: [true, true]
            },
            {
                name: 'where with an array',
                fn: 'where',
                args: [[{ foo: 'foo', bar: 'bar' }, { foo: 'bar', bar: 'foo' }], { foo: 'foo' }],
                expected: [{ foo: 'foo', bar: 'bar' }]
            },
            {
                name: 'where with an object',
                fn: 'where',
                args: [{ foo: { foo: 'foo', bar: 'bar' }, bar: { foo: 'bar', bar: 'foo' } }, { foo: 'foo' }],
                expected: [{ foo: 'foo', bar: 'bar' }]
            },
            {
                name: 'map with null',
                fn: 'map',
                args: [null, isTrue],
                expected: []
            },
            {
                name: 'map with an object',
                fn: 'map',
                args: [{ foo: true, bar: false, baz: true }, isTrue],
                expected: [true, false, true]
            },
            {
                name: 'map with an array',
                fn: 'map',
                args: [[true, false, true], isTrue],
                expected: [true, false, true]
            },
            {
                name: 'pluck with an array',
                fn: 'pluck',
                args: [[{ foo: 'bar', bar: 'foo' }, { foo: 'foo', bar: 'bar' }], 'foo'],
                expected: ['bar', 'foo']
            },
            {
                name: 'pluck with an object',
                fn: 'pluck',
                args: [{ foo: { foo: 'bar', bar: 'foo' }, bar: { foo: 'foo', bar: 'bar' } }, 'foo'],
                expected: ['bar', 'foo']
            }
        ];

    describe('Utils Tests', () => {
        toBeTests.forEach((test) => {
            it('should test ' + test.name, () => {
                var result = utils[test.fn].apply(utils, test.args);
                expect(result).toBe(test.expected);
            });
        });

        toEqualTests.forEach((test) => {
            it('should test ' + test.name, () => {
                var result = utils[test.fn].apply(utils, test.args);
                expect(result).toEqual(test.expected);
            });
        });

        it('should test noop', () => {
            var spy = spyOn(utils, 'noop');

            utils.noop();
            expect(spy).toHaveBeenCalled();
        });

        it('should test extend with 3 args', () => {
            var foo = { foo: 'foo' },
                bar = { foo: 'bar', bar: { name: 'bar' } },
                baz = utils.extend({ baz: 'baz' }, foo, bar);

            expect(baz).toEqual({ foo: 'bar', bar: { name: 'bar' }, baz: 'baz' });
            expect(baz.bar).toBe(bar.bar);
        });

        it('should test deep extend', () => {
            var foo = { foo: 'foo' },
                bar = { foo: 'bar', bar: { name: 'bar' } },
                baz = utils.deepExtend({ baz: 'baz' }, foo, bar);

            expect(baz).toEqual({ foo: 'bar', bar: { name: 'bar' }, baz: 'baz' });
            expect(baz.bar).not.toBe(bar.bar);
            expect(baz.bar).toEqual(bar.bar);
        });

        it('should test clone', () => {
            var foo = { foo: 'foo', bar: [{ foo: 'foo' }, { bar: 'bar' }] },
                baz = utils.clone(foo);

            expect(baz).toEqual(foo);
            expect(baz).not.toBe(foo);
            expect(baz.bar).toBe(foo.bar);
        });

        it('should test clone with null', () => {
            var foo = null,
                baz = utils.clone(foo);

            expect(baz).toEqual(foo);
        });

        it('should test clone with a string', () => {
            var foo = 'foo',
                baz = utils.clone(foo);

            expect(baz).toEqual(foo);
        });

        it('should test clone with a number', () => {
            var foo = 'foo',
                baz = utils.clone(foo);

            expect(baz).toEqual(foo);
        });
        
        it('should test clone with an array', () => {
            var foo = [
                { foo: 'foo', bar: [{ foo: 'foo' }, { bar: 'bar' }] },
                { foo: 'foo', bar: [{ foo: 'foo' }, { bar: 'bar' }] },
                { foo: 'foo', bar: [{ foo: 'foo' }, { bar: 'bar' }] },
                { foo: 'foo', bar: [{ foo: 'foo' }, { bar: 'bar' }] }
            ],
                baz = utils.clone(foo, true);

            expect(baz).toEqual(foo);
            expect(baz).not.toBe(foo);
            expect(baz[0].bar).not.toBe(foo[0].bar);
        });

        it('should test clone with a Date', () => {
            var foo = new Date(),
                baz = utils.clone(foo, true);

            expect(baz).toEqual(foo);
            expect(baz).not.toBe(foo);
        });

        it('should test clone with a RegExp', () => {
            var foo = /test/ig,
                baz = utils.clone(foo);

            expect(baz).toEqual(foo);
            expect(baz).not.toBe(foo);
            expect(baz.global).toBe(foo.global);
            expect(baz.ignoreCase).toBe(foo.ignoreCase);
        });

        it('should test clone with a RegExpExecArray', () => {
            var foo = /test/.exec('test'),
                baz = utils.clone(foo);

            expect(baz).toEqual(foo);
            expect(baz).not.toBe(foo);
        });

        it('should test clone with nested Date, RegExp, and RegExpArray', () => {
            var date = new Date(),
                regex = /test/,
                exec = regex.exec('test'),
                foo = [
                    { date: date, regex: [regex, exec], exec: exec },
                    { date: date, regex: [regex, exec], exec: exec },
                    { date: date, regex: [regex, exec], exec: exec },
                    { date: date, regex: [regex, exec], exec: exec }
                ],
                baz = utils.clone(foo, true);

            expect(baz).toEqual(foo);
            expect(baz).not.toBe(foo);
        });

        it('should test clone with a Node', () => {
            var foo = document.createElement('div'),
                baz = utils.clone(foo);

            expect(baz).toEqual(foo);
            expect(baz).not.toBe(foo);
        });

        it('should test clone with a Function', () => {
            var foo = () => { },
                baz = utils.clone(foo);

            expect(baz).toBe(foo);
        });

        it('should test clone with am Error', () => {
            var foo = new TypeError('test'),
                baz = utils.clone(foo);
            
            expect(baz).toEqual(foo);
        });

        it('should test forEach with an array', () => {
            var spy = spyOn(utils, 'noop');

            utils.forEach([true, true, true], utils.noop);

            expect(spy.calls.count()).toBe(3);
        });

        it('should test forEach with an object', () => {
            var spy = spyOn(utils, 'noop');

            utils.forEach({ foo: true, bar: true, baz: true }, utils.noop);

            expect(spy.calls.count()).toBe(3);
        });

        it('should test forEach with null', () => {
            var spy = spyOn(utils, 'noop');

            utils.forEach(null, utils.noop);

            expect(spy).not.toHaveBeenCalled();
        });

        it('should test forEach with a string', () => {
            var spy = spyOn(utils, 'noop');

            utils.forEach(<any>'foo', utils.noop);

            expect(spy.calls.count()).toBe(3);
            expect(spy.calls.mostRecent().args).toEqual(['o', 2, 'foo']);
        });

        it('should test some with a string and return false', () => {
            var spy = spyOn(utils, 'noop');

            expect(utils.some(<any>'foo', <any>utils.noop)).toBe(false);

            expect(spy.calls.count()).toBe(3);
            expect(spy.calls.mostRecent().args).toEqual(['o', 2, 'foo']);
        });

        it('should test postpone', (done) => {
            var postArg: any;

            utils.postpone((arg) => {
                expect(arg).toBe('foo');
                done();
            }, ['foo']);
        });

        it('should test defer', (done) => {
            utils.defer((arg) => {
                expect(arg).toBe('foo');
                done();
            }, 0, ['foo']);
        });

        it('should test a cancelled defer', (done) => {
            var postArg: string;

            utils.defer((arg) => {
                postArg = arg;
            }, 0, ['foo'])();

            setTimeout(() => {
                expect(postArg).not.toBe('foo');
                done();
            }, 5);
        });

        it('should test uniqueId with no prefix', () => {
            var uid = utils.uniqueId();

            expect(uid.length).toBe(2);
        });

        it('should test uniqueId with a prefix', () => {
            var rand = Math.random().toString() + '_',
                uid = utils.uniqueId(rand);

            expect(uid).toBe(rand + '00');
        });

        it('should test mapAsync', (done) => {
            var array = [1, 2, 3, 4, 5],
                temp: number;

            utils.mapAsync(array, (value: number, key, obj) => {
                temp = value;
                return new Promise((resolve) => {
                    setTimeout(() => {
                        expect(temp).toEqual(array[array.length - 1]);
                        resolve(value + 1);
                    }, value);
                });
            })
                .then((results) => {
                    expect(results).toEqual([2, 3, 4, 5, 6]);
                    done();
                });
        });

        it('should test mapAsync with an Object', (done) => {
            var obj: plat.IObject<number> = {
                a: 1,
                b: 2,
                c: 3,
                d: 4,
                e: 5
            }, temp: number, keys = Object.keys(obj);

            utils.mapAsync(obj, function (value, key, obj) {
                temp = value;
                expect(this).toEqual(2);
                return new Promise((resolve) => {
                    setTimeout(() => {
                        expect(temp).toEqual(obj[keys[keys.length - 1]]);
                        resolve(value + 1);
                    }, value);
                });
            }, 2)
                .then((results) => {
                    expect(results).toEqual([2, 3, 4, 5, 6]);
                    done();
                });
        });

        it('should test mapAsyncInOrder', (done) => {
            var array = [1, 2, 3, 4, 5],
                temp: number;

            utils.mapAsyncInOrder(array, function (value: number, key, obj) {
                temp = value;
                expect(this).toEqual(2);
                return new Promise((resolve) => {
                    setTimeout(() => {
                        expect(temp).toEqual(value);
                        resolve(value + 1);
                    }, value);
                });
            }, 2)
                .then((results) => {
                    expect(results).toEqual([2, 3, 4, 5, 6]);
                    done();
                });
        });

        it('should test mapAsyncInDescendingOrder', (done) => {
            var array = [1, 2, 3, 4, 5],
                temp: number;

            utils.mapAsyncInDescendingOrder(array, function (value: number, key, obj) {
                temp = value;
                expect(this).toEqual(2);
                return new Promise((resolve) => {
                    setTimeout(() => {
                        expect(temp).toEqual(value);
                        resolve(value + 1);
                    }, value);
                });
            }, 2)
                .then((results) => {
                    expect(results).toEqual([6, 5, 4, 3, 2]);
                    done();
                });
        });
    });
}
