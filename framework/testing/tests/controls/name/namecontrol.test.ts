module tests.controls.nameControl {
    describe('NameControl Tests', () => {
        var control: plat.controls.Name,
            parent: plat.ui.ITemplateControl,
            ControlFactory = plat.acquire(plat.IControlFactory);

        beforeEach(() => {
            control = new plat.controls.Name();
            parent = new plat.ui.TemplateControl();
            parent.type = 'test-control';
            parent.controls = [control];
            parent.resources = plat.acquire(plat.ui.IResourcesFactory).getInstance();
            parent.hasOwnContext = true;
            control.parent = parent;
            control.type = 'plat-name';
            control.templateControl = <plat.ui.ITemplateControl>{};
            control.attributes = plat.acquire(plat.ui.IAttributesInstance);
        });

        afterEach(() => {
            ControlFactory.dispose(control);
            ControlFactory.dispose(parent);
        });

        it('should test initialize with empty name', () => {
            control.initialize();

            expect(control.templateControl.name).toBeUndefined();
            expect((<any>parent)['test']).toBeUndefined();
        });

        it('should test initialize with null templateControl', () => {
            control.templateControl = null;
            control.attributes['platName'] = 'test';

            control.initialize();

            expect(control.templateControl).toBeNull();
            expect((<any>parent)['test']).toBeTruthy();
        });

        it('should test initialize with null rootControl', () => {
            control.attributes['platName'] = 'test';
            control.parent = null;
            control.initialize();

            expect(control.templateControl.name).toBe('test');
            expect((<any>parent)['test']).toBeUndefined();
        });

        it('should test initialize', () => {
            control.attributes['platName'] = 'test';

            control.initialize();

            expect(control.templateControl.name).toBe('test');
            expect((<any>parent)['test']).toBeTruthy();
        });
    });
}
