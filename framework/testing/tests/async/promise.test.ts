module tests.async.promise {
    var Promise = plat.acquire(plat.async.IPromise);

    describe('Promise Tests', () => {
        it('should test all', () => {
            var result = [],
                promises = [2, Promise.resolve(3), 4];

            Promise.all(promises).then((success) => {
                result = success;
            });

            waits(1);

            runs(() => {
                expect(result).toEqual([2, 3, 4]);
            });

            var exception = false;

            try {
                Promise.all(null);
            } catch (e) {
                exception = true;
            }

            expect(exception).toBe(true);
        });


        it('should test cast', () => {
            var numPromise = Promise.cast(2),
                promise: plat.async.IThenable<any> = Promise.cast(Promise.resolve(4)),
                result: Array<number>;

            Promise.all<number>([numPromise, promise]).then((success) => {
                result = success;
            });

            waits(1);

            runs(() => {
                expect(result).toEqual([2, 4]);
            });
        });

        it('should test race', () => {
            var numPromise = Promise.cast(2),
                promise: plat.async.IThenable<any> = Promise.cast(Promise.resolve(4)),
                result: number;

            Promise.race<number>([promise, numPromise]).then((success) => {
                result = success;
            });

            waits(1);

            runs(() => {
                expect(result).toEqual(2);
            });

            var exception = false;

            try {
                Promise.race(null);
            } catch (e) {
                exception = true;
            }

            expect(exception).toBe(true);
        });

        it('should test resolve', () => {
            var result: number;

            Promise.resolve(2).then((success) => {
                result = success;
            });

            waits(1);

            runs(() => {
                expect(result).toEqual(2);
            });
        });

        it('should test reject', () => {
            var result: number,
                result2: number;

            Promise.reject(2).then(() => {
                return null;
            }, (error) => {
                result = error;
                return result;
            }).then((success) => {
                result2 = success;
            });

            waits(1);

            runs(() => {
                expect(result).toEqual(2);
                expect(result2).toEqual(2);
            });
        });
    });
}
