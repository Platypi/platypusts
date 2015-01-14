/// <reference path="../../references.d.ts" />

module tests.app {
    var called = false;
    class App extends plat.App {
        suspend() {
            called = true;
        }
        resume() {
            called = true;
        }
        online() {
            called = true;
        }
        offline() {
            called = true;
        }
        error() {
            called = true;
        }
        customEvent() {
            called = true;
        }
    }

    var _AppStatic = plat.acquire(plat.IAppStatic),
        _EventManager = plat.acquire(plat.events.IEventManagerStatic),
        _LifecycleEvent = plat.acquire(plat.events.ILifecycleEventStatic),
        compat = plat.acquire(plat.ICompat),
        app: App;

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
            var remove = app.on('customEvent', app.customEvent);

            app.dispatchEvent('customEvent');

            expect(called).toBe(true);

            called = false;

            remove();

            app.dispatchEvent('customEvent');

            expect(called).toBe(false);
        });
    });
}
