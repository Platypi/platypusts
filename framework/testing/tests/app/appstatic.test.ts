/// <reference path="../../references.d.ts" />

module tests.appStatic {
    var _AppStatic = plat.acquire(plat.IAppStatic),
        app: plat.App;

    class App extends plat.App { }

    describe('AppStatic Tests', () => {
        beforeEach(() => {
            plat.register.app('app', App);
            app = <any>plat.acquire(plat.IApp);
        });

        it('should test App start and fail', () => {
            var compat: plat.ICompat = plat.acquire(plat.ICompat),
                error = false;

            Object.defineProperty(compat, 'isCompatible', {
                value: false,
                configurable: true,
                enumerable: true
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
                enumerable: true
            });
        });

        it('should test App start and succeed', () => {
            var compat: plat.ICompat = plat.acquire(plat.ICompat),
                error = false,
                _EventManager: plat.events.IEventManagerStatic = plat.acquire(plat.events.IEventManagerStatic),
                spy = spyOn(_EventManager, 'initialize');

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
                var div = document.createElement('div'),
                    spy = spyOn(plat.acquire(plat.processing.ICompiler), 'compile');

                var el = document.createElement('div');

                _AppStatic.load();
                expect(spy).toHaveBeenCalledWith(document.body);

                _AppStatic.load(el);
                expect(spy).toHaveBeenCalledWith(el);
            });
        });
    });
}
