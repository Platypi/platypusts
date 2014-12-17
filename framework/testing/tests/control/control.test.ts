module tests.control {
    var ControlFactory = plat.acquire(plat.IControlFactory),
        TemplateControlFactory = plat.acquire(plat.ui.ITemplateControlFactory),
        control: plat.IControl;

    describe('Control Tests', () => {
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
            var remove = control.observeArray(null, 'foo', () => { }, () => { });

            expect(typeof remove).toEqual('function');

            remove = null;
            control.parent = <any>{};

            remove = control.observeArray({ foo: [] }, 'foo', () => { }, () => { });
            expect(typeof remove).toEqual('function');
        });

        it('should test observeExpression', () => {
            var remove = control.observeExpression(null, () => { });

            expect(typeof remove).toEqual('function');

            remove();
            remove = null;
            control.parent = <any>{};
            
            remove = control.observeExpression('foo.bar', () => { });
            expect(typeof remove).toEqual('function');

            remove();
            remove = null;
            control.parent = <any>{
                absoluteContextPath: 'context'
            };

            remove = control.observeExpression('foo.bar', () => { });
            expect(typeof remove).toEqual('function');
            remove();
        });

        it('should test evaluateExpression', () => {
            var two = control.evaluateExpression('1 + 1');

            expect(two).toBe(2);

            var four = control.evaluateExpression('2 + @two', { two: two });

            expect(four).toBe(4);

            control.parent = <any>{
                uid: 'foo',
                context: {
                    two: 2
                }
            };

            var six = control.evaluateExpression('2 + @two + two', { two: two });

            expect(six).toBe(6);

            control.parent.resources = <any>{
                four: {
                    value: 4
                }
            };

            var eight = control.evaluateExpression('@two + two + @four', { two: two });

            expect(eight).toBe(8);
        });

        it('should test on and dispatchEvent', () => {
            var val: number;

            control.on('foo', (ev, value) => {
                val = value;
            });

            control.dispatchEvent('foo', 'up', 2);

            expect(val).toBe(2);
        });
    });
}
