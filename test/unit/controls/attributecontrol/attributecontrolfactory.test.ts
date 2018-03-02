namespace tests.controls.attributeControlFactory {
    const AttributeControlFactory = plat.acquire(plat.IAttributeControlFactory);

    describe('AttributeControlFactory Tests', () => {
        let control: plat.AttributeControl;

        beforeEach(() => {
            control = AttributeControlFactory.getInstance();
        });

        it('should test getInstance', () => {
            expect(control instanceof plat.AttributeControl).toBe(true);
        });

        it('should test dispose', () => {
            expect(control.priority).toBe(0);
            expect(control.templateControl).toBeNull();

            AttributeControlFactory.dispose(control);

            expect(control.templateControl).toBeUndefined();
        });
    });
}
