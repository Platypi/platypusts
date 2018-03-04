/// <reference path="../../references.d.ts" />

module tests.appStatic {
    const _AppStatic = plat.acquire(plat.IAppStatic);
    let app: plat.App;

    class App extends plat.App {}

    describe('AppStatic Tests', () => {
        beforeEach(() => {
            plat.register.app('app', App);
            app = <any>plat.acquire(plat.App);
        });

        it('should test App start and fail', () => {
            const compat: plat.Compat = plat.acquire(plat.Compat);
            let error = false;

            Object.defineProperty(compat, 'isCompatible', {
                value: false,
                configurable: true,
                enumerable: true,
            });

            try {
                _AppStatic.start();
            } catch (e) {
                error = true;
            }

            expect(error).toBe(true);

            Object.defineProperty(compat, 'isCompatible', {
                value: true,
                configurable: true,
                enumerable: true,
            });
        });

        it('should test App start and succeed', () => {
            const compat: plat.Compat = plat.acquire(plat.Compat);
            let error = false;
            const _EventManager: plat.events.IEventManagerStatic = plat.acquire(
                plat.events.IEventManagerStatic
            );
            const spy = spyOn(_EventManager, 'initialize');

            try {
                _AppStatic.start();
            } catch (e) {
                error = true;
            }

            expect(error).toBe(false);
            expect(spy).toHaveBeenCalled();
        });

        document.addEventListener('load', () => {
            it('should test load', () => {
                const div = document.createElement('div');
                const spy = spyOn(
                    plat.acquire(plat.processing.Compiler),
                    'compile'
                );

                const el = document.createElement('div');

                _AppStatic.load();
                expect(spy).toHaveBeenCalledWith(document.body);

                _AppStatic.load(el);
                expect(spy).toHaveBeenCalledWith(el);
            });
        });
    });
}
