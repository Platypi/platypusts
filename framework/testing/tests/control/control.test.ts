module tests.control {
    var ControlFactory: plat.IControlFactory = plat.acquire(plat.IControlFactory),
        control: plat.IControl;

    ddescribe('Control Tests', () => {
        beforeEach(() => {
            control = ControlFactory.getInstance();
        });

        it('should test uid', () => {
            expect(control.uid.indexOf('plat') !== -1).toBe(true);
        });

        it('should test getControlsByName', () => {
            expect(control.getControlsByName(undefined)).toEqual([control]);
        });

        it('should test getControlsByType', () => {
            expect(control.getControlsByType(plat.Control)).toEqual([control]);
            expect(control.getControlsByType(null)).toEqual([]);
            expect(control.getControlsByType('')).toEqual([]);
        });

        it('should test addEventListener', () => {
            var called = false,
                remove = control.addEventListener(window, 'tap', () => {
                    called = true;
                });

            var ev = document.createEvent('CustomEvent');
            ev.initEvent('tap', true, false);
            document.dispatchEvent(ev);
            expect(called).toBe(true);

            remove();
            called = false;
            document.dispatchEvent(ev);

            expect(called).toBe(false);
        });

        it('should test observe', () => {
            var remove = control.observe(null, 'foo', () => { });

            expect(typeof remove).toEqual('function');

            remove = null;
            control.parent = <any>{ };

            remove = control.observe({ foo: '' }, 'foo', () => { });
            expect(typeof remove).toEqual('function');
        });

        it('should test observeArray', () => {
            var remove = control.observeArray(null, 'foo', () => { });

            expect(typeof remove).toEqual('function');

            remove = null;
            control.parent = <any>{};

            remove = control.observeArray({ foo: [] }, 'foo', () => { });
            expect(typeof remove).toEqual('function');
        });
    });
}
