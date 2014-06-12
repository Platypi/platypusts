module tests.controls.setAttributeControl {
    describe('SetAttributeControl Tests', () => {
        var control: plat.controls.SetAttributeControl,
            parent: plat.ui.ITemplateControl,
            ControlFactory = plat.acquire(plat.IControlFactory);

        beforeEach(() => {
            control = new plat.controls.Checked();
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
    });
}
