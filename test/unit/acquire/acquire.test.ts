/// <reference path="../../references.d.ts" />

module tests.acquire {
    const utils = plat.acquire(plat.Utils);

    function instanceOf(Constructor: new () => void) {
        return (obj: any) => {
            expect(obj instanceof Constructor).toBe(true);
        };
    }

    function toBe(obj: any) {
        return (dep: any) => {
            expect(dep).toBe(obj);
        };
    }

    function toEqual(obj: any) {
        return (dep: any) => {
            expect(dep).toEqual(obj);
        };
    }

    describe('Acquire Tests', () => {
        it('should test acquire with single string value', () => {
            const doc = plat.acquire('$Document');

            expect(utils.isDocument(doc)).toBe(true);
        });

        it('should test acquire with single object reference', () => {
            const doc: Document = plat.acquire(plat.Document);

            expect(utils.isDocument(doc)).toBe(true);
        });

        it('should test acquire with array of strings', () => {
            const deps: any[] = plat.acquire(['$Document', '$Window']);

            expect(utils.isDocument(deps[0])).toBe(true);
            expect(utils.isWindow(deps[1])).toBe(true);
        });

        it('should test acquire with array of object references', () => {
            const deps: any[] = plat.acquire([plat.Document, plat.Window]);

            expect(utils.isDocument(deps[0])).toBe(true);
            expect(utils.isWindow(deps[1])).toBe(true);
        });

        it('should test acquire with a mixed array', () => {
            const deps: any[] = plat.acquire([plat.Document, '$Window']);

            expect(utils.isDocument(deps[0])).toBe(true);
            expect(utils.isWindow(deps[1])).toBe(true);
        });
    });
}
