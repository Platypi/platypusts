module tests.controls.bind {
    describe('Bind Tests', () => {
        var control: plat.controls.Bind,
            parent: plat.ui.ITemplateControl,
            ControlFactory = plat.acquire(plat.IControlFactory);

        beforeEach(() => {
            control = new plat.controls.Bind();
            parent = new plat.ui.TemplateControl();
            parent.controls = [control];
            control.parent = parent;
            control.type = 'plat-bind';
            control.attributes = plat.acquire(plat.ui.IAttributesInstance);
        });

        afterEach(() => {
            ControlFactory.dispose(control);
            ControlFactory.dispose(parent);
        });

        it('should test initialize', () => {
            var spy = spyOn(control, '_determineType');

            control.initialize();

            expect(spy).toHaveBeenCalled();
        });

        it('should test loaded and immediately return', () => {
            var spy = spyOn(control.$Parser, 'parse');

            control.loaded();

            expect(spy).not.toHaveBeenCalled();
        });

        it('should test loaded with undefined attribute', () => {
            control.element = <HTMLElement>control.dom.serializeHtml('<input type="text" plat-bind="foo" />').childNodes[0];

            var spy = spyOn(control.$Parser, 'parse');

            (<any>spy).andCallThrough();

            control.loaded();
            expect(spy).toHaveBeenCalled();
            expect(control._contextExpression).toBeNull();
        });
    });
} 