/// <reference path="../../references.d.ts" />

namespace tests.observable.contextManagerStatic {
    const ContextManager = plat.acquire(plat.observable.IContextManagerStatic);

    describe('ContextManagerStatic Tests', () => {
        let control: plat.ui.TemplateControl;
        let manager: plat.observable.ContextManager;

        beforeEach(() => {
            control = <any>{
                uid: 'test',
            };

            manager = ContextManager.getManager(control);
        });

        afterEach(() => {
            ContextManager.dispose(control);
        });

        it('should test getManager', () => {
            expect(ContextManager.getManager(control)).toBe(manager);
            expect(manager.context).toEqual(control);

            ContextManager.dispose(control);
        });

        it('should test dispose', () => {
            ContextManager.dispose(null);
            ContextManager.dispose(control);

            manager = ContextManager.getManager(control);

            const controls = (<any>ContextManager).__controls;
            const managers = (<any>ContextManager).__managers;

            controls[control.uid] = {};

            expect(!!controls[control.uid]).toBe(true);
            expect(!!managers[control.uid]).toBe(true);

            ContextManager.dispose(control);

            expect(!!controls[control.uid]).toBe(false);
            expect(!!managers[control.uid]).toBe(false);

            manager = ContextManager.getManager(control);

            let called = false;

            controls[control.uid] = {
                foo: [() => {
                    called = true;
                }],
            };

            ContextManager.dispose(control);

            expect(called).toBe(true);
            expect(!!controls[control.uid]).toBe(false);

            manager = ContextManager.getManager(control);
            manager.observeArrayMutation('test', () => { }, 'foo', [], []);

            ContextManager.dispose(control);

            expect(!!(<any>ContextManager.arrayChangeListeners).foo).toBe(false);
        });

        it('should test removeArrayListeners', () => {
            const arrayListeners = ContextManager.arrayChangeListeners = {
                foo: {
                    test: [() => { }],
                },
            };

            ContextManager.removeArrayListeners('foo', 'test');

            expect(!!arrayListeners.foo.test).toBe(false);
        });

        it('should test getContext', () => {
            const rootContext = {
                foo: {
                    bar: {
                        baz: 'quux',
                    },
                },
            };
            let context = ContextManager.getContext(rootContext, 'foo.bar.baz'.split('.'));

            expect(context).toBe('quux');

            context = ContextManager.getContext(rootContext, 'foo.baz.bar'.split('.'));

            expect(context).toBeUndefined();

            context = ContextManager.getContext(null, 'foo.bar.baz'.split('.'));

            expect(context).toBeNull();
        });

        it('should test defineProperty', () => {
            const foo = {
                bar: {
                    quux: 'quux',
                },
                baz: 'foo',
            };

            ContextManager.defineProperty(foo, 'baz', 'baz', false, false, true);

            expect(foo.propertyIsEnumerable('baz')).toBe(false);
            expect(foo.baz).toBe('baz');

            foo.baz = 'foo';

            expect(foo.baz).toBe('foo');

            ContextManager.defineProperty(foo, 'baz', 'bar');
            expect(foo.baz).toBe('bar');

            ContextManager.defineProperty(foo.bar, 'quux', 'foo', true, true, true);

            expect(foo.bar.propertyIsEnumerable('quux')).toBe(true);
            expect(foo.bar.quux).toBe('foo');

            foo.bar.quux = 'baz';

            expect(foo.bar.quux).toBe('baz');

            ContextManager.defineProperty(foo.bar, 'quux', 'bar');
            expect(foo.bar.quux).toBe('bar');
        });

        it('should test defineGetter', () => {
            const foo = {
                bar: {
                    quux: 'quux',
                },
                baz: 'foo',
            };

            ContextManager.defineGetter(foo, 'baz', 'baz');

            expect(foo.propertyIsEnumerable('baz')).toBe(false);
            expect(foo.baz).toBe('baz');

            foo.baz = 'foo';

            expect(foo.baz).toBe('baz');

            try {
                ContextManager.defineGetter(foo, 'baz', 'bar');
                expect(true).toBe(false);
            } catch (e) {
                expect(foo.baz).toBe('baz');
            }

            ContextManager.defineGetter(foo.bar, 'quux', 'foo', true, true);

            expect(foo.bar.propertyIsEnumerable('quux')).toBe(true);
            expect(foo.bar.quux).toBe('foo');

            foo.bar.quux = 'baz';

            expect(foo.bar.quux).toBe('foo');

            try {
                ContextManager.defineGetter(foo.bar, 'quux', 'bar');
                expect(foo.bar.quux).toBe('bar');
            } catch (e) {
                expect(true).toBe(false);
            }
        });

        it('should test pushRemoveListener', () => {
            const controls = (<any>ContextManager).__controls;
            const noop = () => { };

            expect(controls.blah).toBeUndefined();
            ContextManager.pushRemoveListener('foo', 'blah', noop);
            expect(controls.blah.foo).toEqual([noop]);

            expect(controls[control.uid]).toBeUndefined();
            ContextManager.pushRemoveListener('foo', control.uid, noop);
            expect(controls[control.uid].foo).toEqual([noop]);
        });

        it('should test removeIdentifier', () => {
            const controls = (<any>ContextManager).__controls = {
                test: {
                    foo: [() => { }],
                },
            };

            ContextManager.removeIdentifier([control.uid], 'foo');

            expect(controls.test.foo).toBeUndefined();
        });

        it('should test createContext with an object', () => {
            ContextManager.createContext(control, 'my.variable').greeting = 'Hello';

            expect(control.context.my.variable.greeting).toBe('Hello');
        });

        it('should test createContext with an array', () => {
            ContextManager.createContext(control, 'users.0').name = 'Will';

            expect(control.context.users[0].name).toBe('Will');
        });
    });
}
