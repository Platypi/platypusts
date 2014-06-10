﻿module tests.controls.bind {
    describe('Bind Tests', () => {
        var control: plat.controls.Bind,
            parent: plat.ui.ITemplateControl,
            ControlFactory = plat.acquire(plat.IControlFactory);

        beforeEach(() => {
            control = new plat.controls.Bind();
            parent = new plat.ui.TemplateControl();
            parent.controls = [control];
            parent.resources = plat.acquire(plat.ui.IResourcesFactory).getInstance();
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

            spy.and.callThrough();

            control.loaded();
            expect(spy).toHaveBeenCalled();
            expect(control._contextExpression).toBeNull();
        });

        it('should test loaded with nested identifier', () => {
            control.element = <HTMLElement>control.dom.serializeHtml('<input type="text" plat-bind="foo.bar" />').childNodes[0];
            control.attributes['platBind'] = 'foo.bar';
            var spy = spyOn(control.$Parser, 'parse');

            spy.and.callThrough();

            control.loaded();
            expect(spy.calls.count()).toBe(2);
            expect(control._contextExpression.aliases).toEqual([]);
            expect(control._contextExpression.expression).toEqual('foo');
            expect(control._contextExpression.identifiers).toEqual(['foo']);
            expect(control._property).toEqual('bar');
        });

        it('should test loaded with alias identifier and no parent resources', () => {
            control.element = <HTMLElement>control.dom.serializeHtml('<input type="text" plat-bind="@foo.bar" />').childNodes[0];
            control.attributes['platBind'] = '@foo';
            var spy = spyOn(control.$Parser, 'parse');

            spy.and.callThrough();

            control.loaded();
            expect(spy.calls.count()).toBe(1);
            expect(control._expression.aliases).toEqual(['foo']);
            expect(control._expression.expression).toEqual('@foo');
            expect(control._expression.identifiers).toEqual(['@foo']);
            expect(control._property).toEqual('@foo');
        });

        it('should test loaded with alias identifier and no observable resources', () => {
            control.element = <HTMLElement>control.dom.serializeHtml('<input type="text" plat-bind="@foo.bar" />').childNodes[0];
            control.attributes['platBind'] = '@foo';
            parent.resources.add({
                foo: {
                    type: 'object',
                    value: {
                        bar: 'text'
                    }
                }
            });

            var spy = spyOn(control.$Parser, 'parse');

            spy.and.callThrough();

            control.loaded();
            expect(spy.calls.count()).toBe(1);
            expect(control._expression.aliases).toEqual(['foo']);
            expect(control._expression.expression).toEqual('@foo');
            expect(control._expression.identifiers).toEqual(['@foo']);
            expect(control._property).toEqual('@foo');
        });

        it('should test loaded with alias identifier and observable resources', () => {
            control.element = <HTMLElement>control.dom.serializeHtml('<input type="text" plat-bind="@foo.bar" />').childNodes[0];
            control.attributes['platBind'] = '@foo';
            parent.resources.add({
                foo: {
                    type: 'observable',
                    value: {
                        bar: 'text'
                    }
                }
            });

            var spy = spyOn(control.$Parser, 'parse');

            spy.and.callThrough();

            control.loaded();
            expect(spy.calls.count()).toBe(1);
            expect(control._expression.aliases).toEqual(['foo']);
            expect(control._expression.expression).toEqual('@foo');
            expect(control._expression.identifiers).toEqual(['@foo']);
            expect(control._property).toEqual('value');
            expect(control._contextExpression.aliases).toEqual([]);
            expect(control._contextExpression.expression).toEqual('');
            expect(control._contextExpression.identifiers).toEqual([]);
            expect(control._contextExpression.evaluate(null)).toEqual({
                type: 'observable',
                value: {
                    bar: 'text'
                },
                alias: 'foo'
            });
        });

        it('should test loaded with immediate identifier', () => {
            control.element = <HTMLElement>control.dom.serializeHtml('<input type="text" plat-bind="foo" />').childNodes[0];
            control.attributes['platBind'] = 'foo';
            control.initialize();
            var spy = spyOn(control.$Parser, 'parse');

            spy.and.callThrough();

            control.loaded();
            expect(spy.calls.count()).toBe(1);
            expect(control._contextExpression.aliases).toEqual([]);
            expect(control._contextExpression.expression).toEqual('');
            expect(control._contextExpression.identifiers).toEqual([]);
            expect(control._contextExpression.evaluate(null)).toBeNull();
        });

        it('should test contextChanged', () => {
            var spy = spyOn(control, '_watchExpression');

            control.contextChanged();

            expect(spy).toHaveBeenCalled();
        });
    });
}
