/// <reference path="../../references.d.ts" />

namespace tests.observable.contextManager {
    const ContextManager = plat.acquire(plat.observable.IContextManagerStatic);

    describe('ContextManager Tests', () => {
        let control: plat.ui.TemplateControl;
        let manager: plat.observable.ContextManager;

        beforeEach(() => {
            control = <any>{
                uid: 'test',
                context: {
                    foo: {
                        bar: {
                            baz: 'quux',
                        },
                    },
                    arr: [{
                        value: 'value',
                    }],
                    bool: false,
                    int: 1,
                    str: 'Hello',
                },
            };

            manager = <plat.observable.ContextManager>ContextManager.getManager(control);
        });

        afterEach(() => {
            ContextManager.dispose(control);
        });

        it('should test getContext', () => {
            let context = manager.getContext('context.foo.bar.baz'.split('.'));
            expect(context).toBe('quux');

            context = manager.getContext('foo.bar.bar'.split('.'));

            expect(context).toBeUndefined();
        });

        it('should test observe with a boolean', () => {
            let called = false;

            manager.observe('context.bool', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    called = true;
                    expect(newValue).not.toEqual(oldValue);
                },
            });

            control.context.bool = !control.context.bool;

            expect(called).toBe(true);
        });

        it('should test observe with a string', () => {
            let called = false;

            manager.observe('context.str', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    called = true;
                    expect(oldValue).toEqual('Hello');
                    expect(newValue).toEqual('Goodbye');
                },
            });

            control.context.str = 'Goodbye';

            expect(called).toBe(true);
        });

        it('should test observe with a number', () => {
            let called = false;

            manager.observe('context.int', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    called = true;
                    expect(oldValue).toEqual(1);
                    expect(newValue).toEqual(2);
                },
            });

            control.context.int = 2;

            expect(called).toBe(true);
        });

        it('should test observe with an object', () => {
            let fooBar = false;
            let fooBarBaz = false;

            manager.observe('context.foo.bar', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    fooBar = true;

                    expect(oldValue).toEqual({
                        baz: 'quux',
                    });
                    expect(newValue).toEqual({
                        baz: 'foo',
                        bar: 'quux',
                    });
                },
            });

            const out = manager.observe('context.foo.bar.baz', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    fooBarBaz = true;

                    expect(oldValue).toBe('quux');
                    expect(newValue).toBe('foo');
                },
            });

            control.context.foo.bar = {
                baz: 'foo',
                bar: 'quux',
            };

            expect(fooBar).toBe(true);
            expect(fooBarBaz).toBe(true);
        });

        it('should test observe with an array', () => {
            let fooBar = false;
            let fooBarBaz = false;

            manager.observe('context.arr', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    fooBar = true;

                    expect(oldValue).toEqual([{
                        value: 'value',
                    }]);
                    expect(newValue).toEqual([{
                        value: 'foo',
                    }]);
                },
            });

            const out = manager.observe('context.arr.0.value', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    fooBarBaz = true;

                    expect(oldValue).toBe('value');
                    expect(newValue).toBe('foo');
                },
            });

            control.context.arr = [{
                value: 'foo',
            }];

            expect(fooBar).toBe(true);
            expect(fooBarBaz).toBe(true);
        });

        it('should test observe with array length', () => {
            let called = 0;
            let arr: any[] = control.context.arr = [];

            manager.observe('context.arr.length', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    called += 1;

                    if (called === 1) {
                        expect(oldValue).toBe(0);
                        expect(newValue).toBe(1);
                    } else if (called === 2) {
                        expect(oldValue).toBe(1);
                        expect(newValue).toBe(2);
                    } else if (called === 3) {
                        expect(oldValue).toBe(2);
                        expect(newValue).toBe(1);
                    } else if (called === 4) {
                        expect(oldValue).toBe(1);
                        expect(newValue).toBe(0);
                    }
                },
            });

            arr = control.context.arr = [{
                value: 'foo',
            }];

            arr.push({
                value: 'bar',
            });

            arr.shift();
            arr.shift();

            expect(called).toBe(4);
        });

        it('should test observe with array length and observing twice', () => {
            let called = 0;
            let called2 = 0;
            let arr: any[] = control.context.arr = [];

            manager.observe('context.arr.length', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    called += 1;
                    if (called === 1) {
                        expect(oldValue).toBe(0);
                        expect(newValue).toBe(1);
                    } else if (called === 2) {
                        expect(oldValue).toBe(1);
                        expect(newValue).toBe(2);
                    } else if (called === 3) {
                        expect(oldValue).toBe(2);
                        expect(newValue).toBe(1);
                    } else if (called === 4) {
                        expect(oldValue).toBe(1);
                        expect(newValue).toBe(0);
                    }
                },
            });

            manager.observe('context.arr.length', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    called2 += 1;
                    if (called2 === 1) {
                        expect(oldValue).toBe(0);
                        expect(newValue).toBe(1);
                    } else if (called2 === 2) {
                        expect(oldValue).toBe(1);
                        expect(newValue).toBe(2);
                    } else if (called2 === 3) {
                        expect(oldValue).toBe(2);
                        expect(newValue).toBe(1);
                    } else if (called2 === 4) {
                        expect(oldValue).toBe(1);
                        expect(newValue).toBe(0);
                    }
                },
            });

            arr = control.context.arr = [{
                value: 'foo',
            }];

            arr.push({
                value: 'bar',
            });

            arr.shift();
            arr.shift();

            expect(called).toBe(4);
            expect(called2).toBe(4);
        });

        it('should test observe by changing a value from primitive to object', () => {
            let called = 0;
            let called2 = false;

            manager.observe('context.int', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    if (called === 0) {
                        called += 1;
                        expect(oldValue).toEqual(1);
                        expect(newValue).toEqual({
                            test: 'test',
                        });

                        return;
                    }

                    called += 1;
                    expect(oldValue).toEqual({
                        test: 'test',
                    });

                    expect(newValue).toEqual({
                        test: 'foo',
                    });
                },
            });

            control.context.int = {
                test: 'test',
            };

            expect(called).toBe(1);

            manager.observe('context.int.test', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    called2 = true;
                    expect(oldValue).toEqual('test');
                    expect(newValue).toEqual('foo');
                },
            });

            control.context.int = {
                test: 'foo',
            };

            expect(called).toBe(2);
            expect(called2).toBe(true);
        });

        it('should test observe by changing a value from object to primitive', () => {
            let called = 0;
            let called2 = false;

            manager.observe('context.foo', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    if (called === 0) {
                        called += 1;
                        expect(oldValue).toEqual({
                            bar: {
                                baz: 'quux',
                            },
                        });

                        expect(newValue).toEqual('foo');

                        return;
                    }

                    called += 1;
                    expect(oldValue).toEqual('foo');

                    expect(newValue).toEqual('bar');
                },
            });

            manager.observe('context.foo.bar', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    called2 = true;
                    expect(oldValue).toEqual({
                        baz: 'quux',
                    });
                    expect(newValue).toBeUndefined();
                },
            });

            control.context.foo = 'foo';
            expect(called).toBe(1);
            control.context.foo = 'bar';

            expect(called).toBe(2);
            expect(called2).toBe(true);
        });

        it('should test observe by changing a value from object to primitive and back to an object', () => {
            let called = 0;
            let called2 = 0;

            manager.observe('context.foo', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    called += 1;
                    if (called === 1) {
                        expect(oldValue).toEqual({
                            bar: {
                                baz: 'quux',
                            },
                        });

                        expect(newValue).toEqual('foo');

                        return;
                    } else if (called === 2) {
                        expect(oldValue).toEqual('foo');
                        expect(newValue).toEqual('bar');

                        return;
                    }

                    expect(oldValue).toEqual('bar');
                    expect(newValue).toEqual({
                        bar: {
                            baz: 'quux',
                        },
                    });
                },
            });

            manager.observe('context.foo.bar', {
                uid: control.uid,
                listener: (newValue, oldValue) => {
                    called2 += 1;

                    if (called2 === 1) {
                        expect(oldValue).toEqual({
                            baz: 'quux',
                        });
                        expect(newValue).toBeUndefined();

                        return;
                    }

                    expect(oldValue).toBeUndefined();
                    expect(newValue).toEqual({
                        baz: 'quux',
                    });
                },
            });

            control.context.foo = 'foo';
            expect(called).toBe(1);
            control.context.foo = 'bar';

            expect(called).toBe(2);
            expect(called2).toBe(1);

            control.context.foo = {
                bar: {
                    baz: 'quux',
                },
            };

            expect(called).toBe(3);
            expect(called2).toBe(2);
        });

        it('should test observe and calling the IRemoveListener', () => {
            let called = false;

            manager.observe('context.foo.bar.baz', {
                uid: control.uid,
                listener: () => {
                    called = true;
                },
            })();

            control.context.foo.bar.baz = 'foo';

            expect(called).toBe(false);
        });

        it('should test observeArray with all overwritten array methods called.', () => {
            let called = 0;
            let oldArray: any[];
            let arr: any[] = control.context.arr = [
                'a',
                'b',
                'c',
                'd',
            ];

            function listener(changes: plat.observable.IArrayChanges<any>[]) {
                const ev = changes[0];
                called += 1;

                switch (ev.type) {
                    case 'push':
                        expect(ev.addedCount).toBe(2);
                        expect(ev.removed).toEqual([]);
                        break;
                    case 'pop':
                        expect(ev.addedCount).toBe(0);
                        expect(ev.removed.length).toBe(1);
                        break;
                    case 'shift':
                        expect(ev.addedCount).toBe(0);
                        expect(ev.removed.length).toBe(1);
                        break;
                    case 'splice':
                        expect(ev.addedCount).toBe(1);
                        expect(ev.removed.length).toBe(1);
                        break;
                    case 'unshift':
                        expect(ev.addedCount).toBe(2);
                        expect(ev.removed).toEqual([]);
                        break;
                    case 'sort':
                        expect(ev.oldArray).toEqual(oldArray);
                        break;
                    case 'reverse':
                        expect(ev.oldArray).toEqual(oldArray);
                        break;
                    default:
                }

                expect(ev.object).not.toEqual(oldArray);
                expect(ev.object).toBe(arr);
            }

            manager.observe('context.arr', {
                uid: control.uid,
                listener: (newValue: any, oldValue: any) => {
                    remove();
                    remove = manager.observeArrayMutation(control.uid, listener, 'context.arr', newValue, oldValue);
                },
            });

            let remove = manager.observeArrayMutation(control.uid, listener, 'context.arr', control.context.arr, null);

            oldArray = arr.slice(0);
            arr.push('e', 'f');

            oldArray = arr.slice(0);
            arr.pop();

            oldArray = arr.slice(0);
            arr.shift();

            oldArray = arr.slice(0);
            arr.splice(1, 1, ['splice']);

            arr = control.context.arr = [
                'a',
                'b',
                'c',
                'd',
            ];

            oldArray = arr.slice(0);
            arr.unshift('g', 'h');

            oldArray = arr.slice(0);
            arr.sort();

            oldArray = arr.slice(0);
            arr.reverse();

            expect(called).toBe(7);
        });

        it('should test dispose', () => {
            manager.dispose();

            expect((<any>manager).context).toBeNull();
            expect((<any>manager).__identifiers).toEqual({});
            expect((<any>manager).__identifierHash).toEqual({});
            expect((<any>manager).__contextObjects).toEqual({});
        });
    });
}
