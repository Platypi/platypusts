module tests.async.promise {
    const Promise: plat.async.IPromise = plat.acquire(plat.async.IPromise);

    describe('Promise Tests', () => {
        it('should test all', (done: Function) => {
            const promises = [2, Promise.resolve(3), 4];

            Promise.all(promises).then((success) => {
                expect(success).toEqual([2, 3, 4]);
                done();
            });

            let exception = false;

            try {
                Promise.all(<number[]>(<any>2)).then((arr) => {
                    expect(arr.length).toBeDefined();
                });
            } catch (e) {
                exception = true;
            }

            expect(exception).toBe(false);
        });

        it('should test race', (done: Function) => {
            const numPromise: plat.async.Promise<number> = new Promise(
                (resolve) => {
                    setTimeout(() => resolve(2), 0, 0);
                }
            );
            const promise: plat.async.Promise<any> = new Promise((resolve) => {
                setTimeout(resolve, 0, 4);
            });

            Promise.race<number>([promise, numPromise]).then((success) => {
                expect(success).toEqual(2);
                done();
            });

            let exception = false;

            try {
                Promise.race(null).then((out) => {
                    expect(out).toEqual(null);
                });
            } catch (e) {
                exception = true;
            }

            expect(exception).toBe(false);
        });

        it('should test resolve', (done: Function) => {
            Promise.resolve(2).then((success) => {
                expect(success).toEqual(2);
                done();
            });
        });

        it('should test reject', (done: Function) => {
            Promise.reject(2)
                .then(
                    () => {
                        return <any>null;
                    },
                    (error) => {
                        expect(error).toEqual(2);

                        return 4;
                    }
                )
                .then((success) => {
                    expect(success).toEqual(4);
                    done();
                });
        });
    });
}
