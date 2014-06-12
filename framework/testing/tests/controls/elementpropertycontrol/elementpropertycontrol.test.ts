module tests.controls.elementPropertyControl {
    describe('ElementPropertyControl Tests', () => {
        var control: plat.controls.ElementPropertyControl,
            parent: plat.ui.ITemplateControl,
            ControlFactory = plat.acquire(plat.IControlFactory);

        beforeEach(() => {
            control = new plat.controls.ElementPropertyControl();
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

        it('should test setter with empty expression', () => {
            control = new plat.controls.Href();
            control.attributes = plat.acquire(plat.ui.IAttributesInstance);
            var element: HTMLAnchorElement =
                control.element =
                <HTMLAnchorElement>control.dom.serializeHtml('<a plat-href=""></a>').childNodes[0];
            control.property = 'href';
            control.attribute = 'platHref';
            control.attributes['platHref'] = '';

            expect(element.href).toBe('');

            control.setter();

            expect(element.href).toBe('');
        });

        it('should test setter with null', () => {
            control.property = 'href';
            control.attribute = 'platHref';
            control.attributes['platHref'] = 'foo';

            control.setter();

            expect(true).toBe(true);
        });

        it('should test setter with undefined property', () => {
            var element: HTMLAnchorElement =
                control.element =
                <HTMLAnchorElement>control.dom.serializeHtml('<input plat-href="foo"></a>').childNodes[0];
            control.property = 'href';
            control.attribute = 'platHref';
            control.attributes['platHref'] = 'foo';

            expect(element.href).toBeUndefined();

            control.setter();

            expect(element.href).toBeUndefined();
        });

        it('should test setter', () => {
            control = new plat.controls.Src();
            control.attributes = plat.acquire(plat.ui.IAttributesInstance);
            var element: HTMLAnchorElement =
                control.element =
                <HTMLAnchorElement>control.dom.serializeHtml('<a plat-href="foo"></a>').childNodes[0];
            control.property = 'href';
            control.attribute = 'platHref';
            control.attributes['platHref'] = 'foo';

            expect(element.href).toBe('');

            control.setter();

            var path = element.pathname;
            path = (path.charAt(0) === '/') ? path.substr(1) : path;

            expect(path).toBe('foo');
        });
    });
}
