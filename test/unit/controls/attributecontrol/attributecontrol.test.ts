module tests.controls.attributeControl {
    const AttributeControlFactory = plat.acquire(plat.IAttributeControlFactory);

    describe('AttributeControl Tests', () => {
        let control: plat.AttributeControl;

        beforeEach(() => {
            control = AttributeControlFactory.getInstance();
        });

        it('should test properties', () => {
            expect(control.priority).toBe(0);
            expect(control.templateControl).toBeNull();
        });
    });
}
