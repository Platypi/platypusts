module tests.async.promise {
    var Promise = plat.acquire(plat.async.IPromise);

    describe('Promise Tests', () => {
        it('should test all', (done) => {
            var result = [],
                promises = [2, Promise.resolve(3), 4];

            Promise.all(promises).then((success) => {
                expect(success).toEqual([2, 3, 4]);
                done();
            });

            var exception = false;

            try {
                Promise.all(<Array<number>><any>2).then((arr) => {
                    expect(arr.length).toBeDefined();
                });
            } catch (e) {
                exception = true;
            }

            expect(exception).toBe(false);
        });


        it('should test cast', (done) => {
            var numPromise = Promise.cast(2),
                promise: plat.async.IThenable<any> = Promise.cast(Promise.resolve(4)),
                result: Array<number>;

            Promise.all<number>([numPromise, promise]).then((success) => {
                expect(success).toEqual([2, 4]);
                done();
            });
        });

        it('should test race', (done) => {
            var numPromise = Promise.cast(2),
                promise: plat.async.IThenable<any> = new Promise((resolve) => { setTimeout(resolve, 0, 4); }),
                result: number;

            Promise.race<number>([promise, numPromise]).then((success) => {
                expect(success).toEqual(2);
                done();
            });

            var exception = false;

            try {
                Promise.race(null).then((out) => {
                    expect(out).toEqual(null);
                });
            } catch (e) {
                exception = true;
            }

            expect(exception).toBe(false);
        });

        it('should test resolve', (done) => {
            var result: number;

            Promise.resolve(2).then((success) => {
                expect(success).toEqual(2);
                done();
            });
        });

        it('should test reject', (done) => {
            Promise.reject(2).then(() => {
                return null;
            }, (error) => {
                expect(error).toEqual(2);
                return 4;
            }).then((success) => {
                expect(success).toEqual(4);
                done();
            });
        });
    });
}
