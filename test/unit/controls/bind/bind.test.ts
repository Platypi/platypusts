namespace tests.controls.bind {
    describe('Bind Tests', () => {
        let control: plat.controls.Bind;
        let parent: plat.ui.TemplateControl;
        const ControlFactory = plat.acquire(plat.IControlFactory);

        beforeEach(() => {
            control = plat.acquire(plat.controls.Bind);
            parent = plat.acquire(plat.ui.TemplateControl);
            parent.controls = [control];
            parent.resources = plat
                .acquire(plat.ui.IResourcesFactory)
                .getInstance();
            control.parent = parent;
            control.type = 'plat-bind';
            control.attributes = plat.acquire(plat.ui.Attributes);
        });

        afterEach(() => {
            ControlFactory.dispose(control);
            ControlFactory.dispose(parent);
        });

        it('should test initialize', () => {
            const spy = spyOn(control, <any>'_determineType');

            control.initialize();

            expect(spy).toHaveBeenCalled();
        });

        it('should test loaded and immediately return', () => {
            const spy = spyOn((<any>control)._parser, 'parse');

            control.loaded();

            expect(spy).not.toHaveBeenCalled();
        });

        it('should test loaded with undefined attribute', () => {
            control.element = <HTMLElement>control.dom.serializeHtml(
                '<input type="text" plat-bind="foo" />'
            ).childNodes[0];

            const spy = spyOn((<any>control)._parser, 'parse');

            spy.and.callThrough();

            control.loaded();
            expect(spy).toHaveBeenCalled();
            expect((<any>control)._contextExpression).toBeNull();
        });

        it('should test loaded with nested identifier', () => {
            control.element = <HTMLElement>control.dom.serializeHtml(
                '<input type="text" plat-bind="foo.bar" />'
            ).childNodes[0];
            control.attributes.platBind = 'foo.bar';
            const spy = spyOn((<any>control)._parser, 'parse');

            spy.and.callThrough();

            control.loaded();
            expect(spy.calls.count()).toBe(2);
            expect((<any>control)._contextExpression.aliases).toEqual([]);
            expect((<any>control)._contextExpression.expression).toEqual('foo');
            expect((<any>control)._contextExpression.identifiers).toEqual([
                'foo',
            ]);
            expect((<any>control)._property).toEqual('bar');
        });

        it('should test loaded with alias identifier and no parent resources', () => {
            control.element = <HTMLElement>control.dom.serializeHtml(
                '<input type="text" plat-bind="@foo.bar" />'
            ).childNodes[0];
            control.attributes.platBind = '@foo';
            const spy = spyOn((<any>control)._parser, 'parse');

            spy.and.callThrough();

            control.loaded();
            expect(spy.calls.count()).toBe(1);
            expect((<any>control)._expression.aliases).toEqual(['foo']);
            expect((<any>control)._expression.expression).toEqual('@foo');
            expect((<any>control)._expression.identifiers).toEqual(['@foo']);
            expect((<any>control)._property).toEqual('value');
        });

        it('should test loaded with alias identifier and no observable resources', () => {
            control.element = <HTMLElement>control.dom.serializeHtml(
                '<input type="text" plat-bind="@foo.bar" />'
            ).childNodes[0];
            control.attributes.platBind = '@foo';
            parent.resources.add({
                foo: {
                    type: 'object',
                    value: {
                        bar: 'text',
                    },
                },
            });

            const spy = spyOn((<any>control)._parser, 'parse');

            spy.and.callThrough();

            control.loaded();
            expect(spy.calls.count()).toBe(1);
            expect((<any>control)._expression.aliases).toEqual(['foo']);
            expect((<any>control)._expression.expression).toEqual('@foo');
            expect((<any>control)._expression.identifiers).toEqual(['@foo']);
            expect((<any>control)._property).toEqual('@foo');
        });

        it('should test loaded with alias identifier and observable resources', () => {
            control.element = <HTMLElement>control.dom.serializeHtml(
                '<input type="text" plat-bind="@foo.bar" />'
            ).childNodes[0];
            control.attributes.platBind = '@foo';
            parent.resources.add({
                foo: {
                    type: 'observable',
                    value: {
                        bar: 'text',
                    },
                },
            });

            const spy = spyOn((<any>control)._parser, 'parse');

            spy.and.callThrough();

            control.loaded();
            expect(spy.calls.count()).toBe(1);
            expect((<any>control)._expression.aliases).toEqual(['foo']);
            expect((<any>control)._expression.expression).toEqual('@foo');
            expect((<any>control)._expression.identifiers).toEqual(['@foo']);
            expect((<any>control)._property).toEqual('value');
            expect((<any>control)._contextExpression.aliases).toEqual([]);
            expect((<any>control)._contextExpression.expression).toEqual('');
            expect((<any>control)._contextExpression.identifiers).toEqual([]);
            expect((<any>control)._contextExpression.evaluate(null)).toEqual({
                type: 'observable',
                value: {
                    bar: 'text',
                },
                alias: 'foo',
            });
        });

        it('should test loaded with immediate identifier', () => {
            control.element = <HTMLElement>control.dom.serializeHtml(
                '<input type="text" plat-bind="foo" />'
            ).childNodes[0];
            control.attributes.platBind = 'foo';
            control.initialize();
            const spy = spyOn((<any>control)._parser, 'parse');

            spy.and.callThrough();

            control.loaded();
            expect(spy.calls.count()).toBe(1);
            expect((<any>control)._contextExpression.aliases).toEqual([]);
            expect((<any>control)._contextExpression.expression).toEqual('');
            expect((<any>control)._contextExpression.identifiers).toEqual([]);
            expect((<any>control)._contextExpression.evaluate(null)).toBeNull();
        });

        it('should test contextChanged', () => {
            const spy = spyOn(control, <any>'_watchExpression');

            control.contextChanged();

            expect(spy).toHaveBeenCalled();
        });
    });
}
