module tests.controlFactory {
    var ControlFactory = plat.acquire(plat.IControlFactory),
        control: plat.IControl;

    describe('ControlFactory Tests', () => {
        beforeEach(() => {
            control = ControlFactory.getInstance();
        });

        it('should test getRootControl', () => {
            var isNull = ControlFactory.getRootControl(null),
                root = ControlFactory.getRootControl(control);

            expect(isNull).toBeNull();
            expect(root).toBe(control);

            control.parent = <any>{};
            (<any>control).root = control;

            root = null;
            root = ControlFactory.getRootControl(control);

            expect(root).toBe(control);
        });

        it('should test loaded', () => {
            var isUndefined = ControlFactory.load(null),
                spy = spyOn(control, 'loaded');

            ControlFactory.load(control);

            expect(isUndefined).toBeUndefined();
            expect(spy).toHaveBeenCalled();
        });

        it('should test dispose', () => {
            ControlFactory.dispose(null);

            var spy = spyOn(control, 'dispose');

            control.parent = <any>{};

            ControlFactory.dispose(control);

            expect(spy).toHaveBeenCalled();
            expect(control.parent).toBeNull();
        });

        it('should test removeParent', () => {
            ControlFactory.removeParent(null);

            ControlFactory.removeParent(control);
            expect(control.parent).toBeUndefined();

            control.parent = <any>{};
            ControlFactory.removeParent(control);
            expect(control.parent).toBeNull();

            var parent = control.parent = <any>{
                controls: [control]
            };

            ControlFactory.removeParent(control);

            expect(parent.controls).toEqual([]);
        });

        it('should test removeEventListeners', () => {
            var called = false;
            ControlFactory.removeEventListeners(control);

            var listeners = (<any>ControlFactory).__eventListeners;

            listeners[control.uid] = [() => {
                called = true;
            }];

            ControlFactory.removeEventListeners(control);

            expect(called).toBe(true);
            expect((<any>ControlFactory).__eventListeners[control.uid]).toBeUndefined();
        });

        it('should test getInstance', () => {
            expect(control instanceof <any>ControlFactory).toBe(true);
        });
    });
}
