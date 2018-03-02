namespace tests.controls.setAttributeControl {
    describe('SetAttributeControl Tests', () => {
        let control: plat.controls.SetAttributeControl;
        let parent: plat.ui.TemplateControl;
        const ControlFactory = plat.acquire(plat.IControlFactory);

        beforeEach(() => {
            control = plat.acquire(plat.controls.Checked);
            parent = plat.acquire(plat.ui.TemplateControl);
            parent.controls = [control];
            parent.resources = plat
                .acquire(plat.ui.IResourcesFactory)
                .getInstance();
            parent.hasOwnContext = true;
            control.parent = parent;
            control.type = 'plat-options';
            control.templateControl = plat.acquire(plat.ui.TemplateControl);
            control.attributes = plat.acquire(plat.ui.Attributes);
            control.attributes.platOptions = 'foo.bar';
            parent.context = {
                foo: {
                    bar: 'test',
                },
            };
            parent.absoluteContextPath = 'context';
        });

        afterEach(() => {
            ControlFactory.dispose(control);
            ControlFactory.dispose(parent);
        });
    });
}
