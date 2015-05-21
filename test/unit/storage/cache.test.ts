/// <reference path="../../references.d.ts" />

module tests.storage.cache {
    var Cache = plat.acquire(plat.storage.ICacheFactory),
        id = 'testCache';

    describe('Cache Tests', () => {
        var cache: plat.storage.Cache<any>;

        beforeEach(() => {
            cache = Cache.create(id);
            cache.clear();
        });

        it('should fetch ' + id + ' from Cache', () => {
            var testCache = Cache.fetch(id);

            expect(testCache).toBe(cache);
        });

        it('should remove ' + id + ' from Cache', () => {
            Cache.clear();

            expect(Cache.fetch(id)).toBeUndefined();
        });

        it('should test storing objects in ' + id, () => {
            var item = { foo: 'foo', bar: { bar: 'bar' } },
                value = cache.put('item', item),
                read = cache.read('item');

            expect(value).not.toBe({ foo: 'foo', bar: { bar: 'bar' } });
            expect(value).toEqual({ foo: 'foo', bar: { bar: 'bar' } });
            expect(value).toBe(item);
            expect(value).toBe(read);
        });

        it('should test storing strings in ' + id, () => {
            cache.put('item', 'Hello');

            expect(cache.read('item')).toEqual('Hello');
        });

        it('should test clearing ' + id, () => {
            cache.put('item', 1);

            var startLength = cache.info().size,
                i: number;

            expect(startLength).toBe(cache.info().size);

            cache.put('item', 1);

            expect(startLength).toBe(cache.info().size);

            cache.clear();

            expect(cache.info().size).toBe(0);

            cache.put('item', 1);

            expect(startLength).toBe(cache.info().size);

            cache.remove('item');

            expect(cache.info().size).toBe(0);

            for (i = 0; i < 1000; ++i) {
                cache.put('item' + i, 'value ' + i);
            }

            expect(cache.info().size).toBe(1000);

            for (i = 0; i < 1000; ++i) {
                cache.remove('item' + i);
            }

            expect(cache.info().size).toBe(0);

            for (i = 0; i < 1000; ++i) {
                cache.put('item' + i, 'value ' + i);
            }

            expect(cache.info().size).toBe(1000);

            cache.clear();

            expect(cache.info().size).toBe(0);
        });
    });
}
