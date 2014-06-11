module tests.controls.keyCodeEventControl {

    describe('KeyCodeEventControl Tests', () => {
        var control: plat.controls.KeyCodeEventControl,
            keyCodes = plat.controls.KeyCodes,
            parent: plat.ui.ITemplateControl,
            ControlFactory = plat.acquire(plat.IControlFactory);

        beforeEach(() => {
            control = new plat.controls.KeyCodeEventControl();
            parent = new plat.ui.TemplateControl();
            parent.controls = [control];
            parent.resources = plat.acquire(plat.ui.IResourcesFactory).getInstance();
            control.parent = parent;
            control.attributes = plat.acquire(plat.ui.IAttributesInstance);
        });

        afterEach(() => {
            ControlFactory.dispose(control);
            ControlFactory.dispose(parent);
        });
    });
}
