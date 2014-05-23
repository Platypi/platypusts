/// <reference path="../../../typings/tsd.d.ts" />

module tests.observable.contextManager {
    var ContextManager: plat.observable.IContextManagerStatic = plat.acquire(plat.observable.ContextManagerStatic);

    describe('ContextManager Tests', () => {
        var control: plat.ui.ITemplateControl,
            manager: plat.observable.IContextManager;

        beforeEach(() => {
            control = <any>{
                uid: 'test',
                context: {
                    foo: {
                        bar: {
                            baz: 'quux'
                        }
                    },
                    arr: [{
                        value: 'value'
                    }],
                    bool: false,
                    int: 1,
                    str: 'Hello'
                }
            };

            manager = ContextManager.getManager(control);
        });

        afterEach(() => {
            ContextManager.dispose(control);
        });

        it('should test getContext', () => {
            var context = manager.getContext('context.foo.bar.baz'.split('.'));
            expect(context).toBe('quux');

            context = manager.getContext('foo.bar.bar'.split('.'));

            expect(context).toBeNull();
        });

        it('should test observe with a boolean', () => {
            var called = false;

            manager.observe('context.bool', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    called = true;
                    expect(newValue).not.toEqual(oldValue);
                }
            });

            control.context.bool = !control.context.bool;

            expect(called).toBe(true);
        });

        it('should test observe with a string', () => {
            var called = false;

            manager.observe('context.str', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    called = true;
                    expect(oldValue).toEqual('Hello');
                    expect(newValue).toEqual('Goodbye');
                }
            });

            control.context.str = 'Goodbye';

            expect(called).toBe(true);
        });

        it('should test observe with a number', () => {
            var called = false;

            manager.observe('context.int', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    called = true;
                    expect(oldValue).toEqual(1);
                    expect(newValue).toEqual(2);
                }
            });

            control.context.int = 2;

            expect(called).toBe(true);
        });

        it('should test observe with an object', () => {
            var fooBar = false,
                fooBarBaz = false;

            manager.observe('context.foo.bar', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    fooBar = true;

                    expect(oldValue).toEqual({
                        baz: 'quux'
                    });
                    expect(newValue).toEqual({
                        baz: 'foo',
                        bar: 'quux'
                    });
                }
            });

            var out = manager.observe('context.foo.bar.baz', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    fooBarBaz = true;

                    expect(oldValue).toBe('quux');
                    expect(newValue).toBe('foo');
                }
            });

            control.context.foo.bar = {
                baz: 'foo',
                bar: 'quux'
            };

            expect(fooBar).toBe(true);
            expect(fooBarBaz).toBe(true);
        });

        it('should test observe with an array', () => {
            var fooBar = false,
                fooBarBaz = false;

            manager.observe('context.arr', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    fooBar = true;

                    expect(oldValue).toEqual([{
                        value: 'value'
                    }]);
                    expect(newValue).toEqual([{
                        value: 'foo'
                    }]);
                }
            });

            var out = manager.observe('context.arr.0.value', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    fooBarBaz = true;

                    expect(oldValue).toBe('value');
                    expect(newValue).toBe('foo');
                }
            });

            control.context.arr = [{
                value: 'foo'
            }];

            expect(fooBar).toBe(true);
            expect(fooBarBaz).toBe(true);
        });

        it('should test observe with changing a value from primitive to object', () => {
            var called = 0,
                called2 = false;

            var remove = manager.observe('context.int', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    if (called === 0) {
                        ++called;
                        expect(oldValue).toEqual(1);
                        expect(newValue).toEqual({
                            test: 'test'
                        });
                        return;
                    }

                    ++called;
                    expect(oldValue).toEqual({
                        test: 'test'
                    });

                    expect(newValue).toEqual({
                        test: 'foo'
                    });
                }
            });

            control.context.int = {
                test: 'test'
            };

            expect(called).toBe(1);

            manager.observe('context.int.test', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    called2 = true;
                    expect(oldValue).toEqual('test');
                    expect(newValue).toEqual('foo');
                }
            });

            control.context.int = {
                test: 'foo'
            };

            expect(called).toBe(2);
            expect(called2).toBe(true);
        });
    });
}
