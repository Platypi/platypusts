namespace tests.control {
    const ControlFactory = plat.acquire(plat.IControlFactory);
    const TemplateControlFactory = plat.acquire(
        plat.ui.ITemplateControlFactory
    );
    let control: plat.Control;

    describe('Control Tests', () => {
        beforeEach(() => {
            control = ControlFactory.getInstance();
        });

        it('should test uid', () => {
            expect(control.uid.indexOf('plat')).toBeGreaterThanOrEqual(0);
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
            let called = false;
            const remove = control.addEventListener(window, 'tap', () => {
                called = true;
            });

            const ev = document.createEvent('CustomEvent');
            ev.initEvent('tap', true, false);
            document.dispatchEvent(ev);
            expect(called).toBe(true);

            remove();
            called = false;
            document.dispatchEvent(ev);

            expect(called).toBe(false);
        });

        it('should test observe', () => {
            const remove = control.observe(() => {}, 'foo');

            expect(typeof remove).toEqual('function');
        });

        it('should test observeArray', () => {
            (<any>control).context = { foo: [] };
            const remove = control.observeArray(() => {}, 'foo');

            expect(typeof remove).toEqual('function');
        });

        it('should test observeExpression', () => {
            let remove = control.observeExpression(() => {}, null);

            expect(typeof remove).toEqual('function');

            remove();
            remove = null;
            control.parent = <any>{};

            remove = control.observeExpression(() => {}, 'foo.bar');
            expect(typeof remove).toEqual('function');

            remove();
            remove = null;
            control.parent = <any>{
                absoluteContextPath: 'context',
            };

            remove = control.observeExpression(() => {}, 'foo.bar');
            expect(typeof remove).toEqual('function');
            remove();
        });

        it('should test evaluateExpression', () => {
            const two = control.evaluateExpression('1 + 1');

            expect(two).toBe(2);

            const four = control.evaluateExpression('2 + @two', { two: two });

            expect(four).toBe(4);

            control.parent = <any>{
                uid: 'foo',
                context: {
                    two: 2,
                },
            };

            const six = control.evaluateExpression('2 + @two + two', {
                two: two,
            });

            expect(six).toBe(6);

            control.parent.resources = <any>{
                four: {
                    value: 4,
                },
            };

            const eight = control.evaluateExpression('@two + two + @four', {
                two: two,
            });

            expect(eight).toBe(8);
        });

        it('should test on and dispatchEvent', () => {
            let val: number;

            control.on('foo', (ev, value) => {
                val = value;
            });

            control.dispatchEvent('foo', 'up', 2);

            expect(val).toBe(2);
        });
    });
}
