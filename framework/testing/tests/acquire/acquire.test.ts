/// <reference path="../../references.d.ts" />

module tests.acquire {
    var utils: plat.Utils = plat.acquire(plat.Utils);

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
            var doc = plat.acquire('$Document');

            expect(utils.isDocument(doc)).toBe(true);
        });

        it('should test acquire with single object reference', () => {
            var doc: Document = plat.acquire(plat.Document);

            expect(utils.isDocument(doc)).toBe(true);
        });

        it('should test acquire with array of strings', () => {
            var deps: Array<any> = plat.acquire(['$Document', '$Window']);

            expect(utils.isDocument(deps[0])).toBe(true);
            expect(utils.isWindow(deps[1])).toBe(true);
        });

        it('should test acquire with array of object references', () => {
            var deps: Array<any> = plat.acquire([plat.Document, plat.Window]);

            expect(utils.isDocument(deps[0])).toBe(true);
            expect(utils.isWindow(deps[1])).toBe(true);
        });

        it('should test acquire with a mixed array', () => {
            var deps: Array<any> = plat.acquire([plat.Document, '$Window']);

            expect(utils.isDocument(deps[0])).toBe(true);
            expect(utils.isWindow(deps[1])).toBe(true);
        });
    });
}
