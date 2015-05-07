module tests.controls.attributeControl {
    var AttributeControlFactory = plat.acquire(plat.IAttributeControlFactory);

    describe('AttributeControl Tests', () => {
        var control: plat.AttributeControl;

        beforeEach(() => {
            control = AttributeControlFactory.getInstance();
        });

        it('should test properties', () => {
            expect(control.priority).toBe(0);
            expect(control.templateControl).toBeNull();
        });
    });
}
