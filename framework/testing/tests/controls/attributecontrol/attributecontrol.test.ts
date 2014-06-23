module tests.controls.attributeControl {
    var AttributeControlFactory = plat.acquire(plat.controls.IAttributeControlFactory);

    describe('AttributeControl Tests', () => {
        var control: plat.controls.IAttributeControl;

        beforeEach(() => {
            control = AttributeControlFactory.getInstance();
        });

        it('should test properties', () => {
            expect(control.priority).toBe(0);
            expect(control.templateControl).toBeNull();
        });
    });
}
