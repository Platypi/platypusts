/// <reference path="../../references.d.ts" />

module tests.appStatic {
    var _AppStatic = plat.acquire(plat.IAppStatic),
        app: plat.App;

    class App extends plat.App { }

    describe('AppStatic Tests', () => {
        beforeEach(() => {
            plat.register.app('app', App);
            app = <any>plat.acquire(plat.App);
        });

        it('should test App start and fail', () => {
            var compat: plat.Compat = plat.acquire(plat.Compat),
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
            var compat: plat.Compat = plat.acquire(plat.Compat),
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
        
        it('should send a ready event when compat.amd', (done) => {
            var compat: plat.Compat = plat.acquire(plat.Compat),
                _LifecycleEvent: plat.events.ILifecycleEventStatic = plat.acquire(plat.events.ILifecycleEventStatic),
                spy = spyOn(_LifecycleEvent, 'dispatch');

            spy.and.callFake((str: string) => {
                expect(str).toBe(__ready);
                done();
            });
            
            compat.amd = true;
            _AppStatic.registerApp(undefined);
            compat.amd = false;
        });

        document.addEventListener('load', () => {
            it('should test load', () => {
                var div = document.createElement('div'),
                    spy = spyOn(plat.acquire(plat.processing.Compiler), 'compile');

                var el = document.createElement('div');

                _AppStatic.load();
                expect(spy).toHaveBeenCalledWith(document.body);

                _AppStatic.load(el);
                expect(spy).toHaveBeenCalledWith(el);
            });
        });
    });
}
