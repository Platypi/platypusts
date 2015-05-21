module tests.controls.elementPropertyControl {
    describe('ElementPropertyControl Tests', () => {
        var control: plat.controls.ElementPropertyControl,
            parent: plat.ui.TemplateControl,
            ControlFactory = plat.acquire(plat.IControlFactory);

        beforeEach(() => {
            control = plat.acquire(plat.controls.ElementPropertyControl);
            parent = plat.acquire(plat.ui.TemplateControl);
            parent.controls = [control];
            parent.resources = plat.acquire(plat.ui.IResourcesFactory).getInstance();
            control.parent = parent;
            control.attributes = plat.acquire(plat.ui.Attributes);
        });

        afterEach(() => {
            ControlFactory.dispose(control);
            ControlFactory.dispose(parent);
        });

        it('should test setter with empty expression', () => {
            control = plat.acquire(plat.controls.Href);
            control.attributes = plat.acquire(plat.ui.Attributes);
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
            control = plat.acquire(plat.controls.Src);
            control.attributes = plat.acquire(plat.ui.Attributes);
            var element: HTMLAnchorElement =
                control.element =
                <HTMLAnchorElement>control.dom.serializeHtml('<a plat-href="foo"></a>').childNodes[0];
            control.property = 'href';
            control.attribute = 'platHref';
            control.attributes['platHref'] = 'foo';

            expect(element.href).toBe('');

            control.setter();
            expect(element.pathname.slice(-3)).toBe('foo');
        });
    });
}
