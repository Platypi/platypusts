/// <reference path="../../typings/tsd.d.ts" />

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

    var $AppStatic: plat.IAppStatic = plat.acquire(plat.IAppStatic),
        $EventManagerStatic: plat.events.IEventManagerStatic = plat.acquire(plat.events.IEventManagerStatic),
        $LifecycleEventStatic: plat.events.ILifecycleEventStatic = plat.acquire(plat.events.ILifecycleEventStatic),
        compat: plat.ICompat = plat.acquire(plat.ICompat),
        app: App;

    describe('App Tests', () => {
        beforeEach(() => {
            plat.register.app('app', App);
            (<any>$AppStatic).__registerAppEvents();
            app = plat.acquire(plat.IApp);
            called = false;
        });

        it('should test app suspend', () => {
            $LifecycleEventStatic.dispatch('suspend', {});

            expect(called).toBe(true);
        });

        it('should test app resume', () => {
            $LifecycleEventStatic.dispatch('resume', {});

            expect(called).toBe(true);
        });

        it('should test app online', () => {
            $LifecycleEventStatic.dispatch('online', {});

            expect(called).toBe(true);
        });

        it('should test app offline', () => {
            $LifecycleEventStatic.dispatch('offline', {});

            expect(called).toBe(true);
        });

        it('should test app error', () => {
            $LifecycleEventStatic.dispatch('error', {});

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
