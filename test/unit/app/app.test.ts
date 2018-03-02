/// <reference path="../../references.d.ts" />

namespace tests.app {
    let called = false;
    class App extends plat.App {
        public suspend() {
            called = true;
        }
        public resume() {
            called = true;
        }
        public online() {
            called = true;
        }
        public offline() {
            called = true;
        }
        public error() {
            called = true;
        }
        public customEvent() {
            called = true;
        }
    }

    const _AppStatic = plat.acquire(plat.IAppStatic);
    const _EventManager = plat.acquire(plat.events.IEventManagerStatic);
    const _LifecycleEvent = plat.acquire(plat.events.ILifecycleEventStatic);
    const compat: plat.Compat = plat.acquire(plat.Compat);
    let app: App;

    describe('App Tests', () => {
        beforeEach(() => {
            plat.register.app('app', App);
            (<any>_AppStatic).__registerAppEvents();
            app = <App>plat.acquire(plat.IApp);
            called = false;
        });

        it('should test app suspend', () => {
            _LifecycleEvent.dispatch('suspend', {});

            expect(called).toBe(true);
        });

        it('should test app resume', () => {
            _LifecycleEvent.dispatch('resume', {});

            expect(called).toBe(true);
        });

        it('should test app online', () => {
            _LifecycleEvent.dispatch('online', {});

            expect(called).toBe(true);
        });

        it('should test app offline', () => {
            _LifecycleEvent.dispatch('offline', {});

            expect(called).toBe(true);
        });

        it('should test app error', () => {
            _LifecycleEvent.dispatch('error', {});

            expect(called).toBe(true);
        });

        it('should test on and dispatchEvent', () => {
            const remove = app.on('customEvent', app.customEvent);

            app.dispatchEvent('customEvent');

            expect(called).toBe(true);

            called = false;

            remove();

            app.dispatchEvent('customEvent');

            expect(called).toBe(false);
        });
    });
}
