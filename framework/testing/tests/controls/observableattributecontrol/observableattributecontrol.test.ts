module tests.controls.observableAttributeControl {
    describe('ObservableAttributeControl Tests', () => {
        var control: plat.controls.ObservableAttributeControl,
            parent: plat.ui.ITemplateControl,
            ControlFactory = plat.acquire(plat.IControlFactory);

        beforeEach(() => {
            control = new plat.controls.Options();
            parent = new plat.ui.TemplateControl();
            parent.controls = [control];
            parent.resources = plat.acquire(plat.ui.IResourcesFactory).getInstance();
            parent.hasOwnContext = true;
            control.parent = parent;
            control.type = 'plat-options';
            control.templateControl = new plat.ui.TemplateControl();
            control.attributes = plat.acquire(plat.ui.IAttributesInstance);
            control.attributes['platOptions'] = 'foo.bar';
            parent.context = {
                foo: {
                    bar: 'test'
                }
            };
            parent.absoluteContextPath = 'context';
        });

        afterEach(() => {
            ControlFactory.dispose(control);
            ControlFactory.dispose(parent);
        });

        it('should test initialize with null templateControl', () => {
            var spy = spyOn(control, 'evaluateExpression');
            control.templateControl = null;
            control.initialize();

            expect(control.attribute).toBe('platOptions');
            expect(spy).not.toHaveBeenCalled();
        });

        it('should test initialize', () => {
            control.initialize();
            expect(control.templateControl['options'].value).toBe('test');
        });

        it('should test loaded with null templateControl', () => {
            control.templateControl = null;
            control.initialize();

            expect(control._removeListener).toBeUndefined();

            control.loaded();

            expect(control._removeListener).toBeUndefined();
        });

        it('should test loaded', () => {
            control.initialize();

            expect(control._removeListener).toBeUndefined();

            control.loaded();

            expect(control._removeListener).toBeDefined();
        });

        it('should test observe', () => {
            var called = 0,
                spy = spyOn(control, '_addListener'),
                observeExpressionSpy = spyOn(control, 'observeExpression');

            spy.and.callThrough();
            observeExpressionSpy.and.callThrough();

            control.initialize();
            control.loaded();

            control.templateControl['options'].observe((newValue: any, oldValue: any) => {
                expect(newValue).toBe('foo');
                expect(oldValue).toBe('test');
                called++;
            });

            parent.context.foo.bar = 'foo';

            expect(observeExpressionSpy).toHaveBeenCalledWith('foo.bar', control._setProperty);
            expect(called).toBe(1);
            expect(spy).toHaveBeenCalled();
        });

        it('should test observe and called the remove callback', () => {
            var called = 0,
                spy = spyOn(control, '_addListener'),
                observeExpressionSpy = spyOn(control, 'observeExpression');

            spy.and.callThrough();
            observeExpressionSpy.and.callThrough();

            control.initialize();
            control.loaded();

            control.templateControl['options'].observe((newValue: any, oldValue: any) => {
                expect(newValue).toBe('foo');
                expect(oldValue).toBe('test');
                called++;
            })();

            parent.context.foo.bar = 'foo';

            expect(observeExpressionSpy).toHaveBeenCalledWith('foo.bar', control._setProperty);
            expect(called).toBe(0);
            expect(spy).toHaveBeenCalled();
        });
    });
}
