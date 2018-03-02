/// <reference path="../../references.d.ts" />

namespace tests.controlFactory {
    const ControlFactory = plat.acquire(plat.IControlFactory);
    let control: plat.Control;

    describe('ControlFactory Tests', () => {
        beforeEach(() => {
            control = ControlFactory.getInstance();
        });

        it('should test getRootControl', () => {
            const isNull = ControlFactory.getRootControl(null);
            let root = ControlFactory.getRootControl(control);

            expect(isNull).toBeNull();
            expect(root).toBe(<any>control);

            control.parent = <any>{};
            (<any>control).root = control;

            root = null;
            root = ControlFactory.getRootControl(control);

            expect(root).toBe(<any>control);
        });

        it('should test loaded', (done: Function) => {
            const spy = spyOn(control, 'loaded');

            ControlFactory.load(null).then((arg) => {
                expect(arg).toBeUndefined();
                done();
            });
            ControlFactory.load(control);

            expect(spy).toHaveBeenCalled();
        });

        it('should test dispose', () => {
            ControlFactory.dispose(null);

            const spy = spyOn(control, 'dispose');

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

            const parent = (control.parent = <any>{
                controls: [control],
            });

            ControlFactory.removeParent(control);

            expect(parent.controls).toEqual([]);
        });

        it('should test removeEventListeners', () => {
            let called = false;
            ControlFactory.removeEventListeners(control);

            const listeners = (<any>ControlFactory).__eventListeners;

            listeners[control.uid] = [
                () => {
                    called = true;
                },
            ];

            ControlFactory.removeEventListeners(control);

            expect(called).toBe(true);
            expect(
                (<any>ControlFactory).__eventListeners[control.uid]
            ).toBeUndefined();
        });

        it('should test getInstance', () => {
            expect(control instanceof <any>ControlFactory).toBe(true);
        });
    });
}
