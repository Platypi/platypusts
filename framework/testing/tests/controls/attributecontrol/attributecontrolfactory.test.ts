module tests.controls.attributeControlFactory {
    var AttributeControlFactory = plat.acquire(plat.controls.IAttributeControlFactory);

    describe('AttributeControlFactory Tests', () => {
        var control: plat.controls.IAttributeControl;

        beforeEach(() => {
            control = AttributeControlFactory.getInstance();
        });

        it('should test getInstance', () => {
            expect(control instanceof plat.controls.AttributeControl).toBe(true);
        });

        it('should test dispose', () => {
            expect(control.priority).toBe(0);
            expect(control.templateControl).toBeNull();

            AttributeControlFactory.dispose(control);

            expect(control.templateControl).toBeUndefined();
        });
    });
}
