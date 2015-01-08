/// <reference path="../../typings/tsd.d.ts" />
module test.routing.history {
    'use strict';

    var history = plat.acquire(plat.routing.IHistory);

    describe('History Tests', () => {

        beforeEach(() => {
            history.entries = [
                { url: 'posts/1', view: 'post1', parameters: { id: '1' }, query: { limit: '10' } },
                { url: 'posts/2', view: 'post2', parameters: { id: '1' }, query: { limit: '10' } },
                { url: 'posts/3', view: 'post3', parameters: { id: '1' }, query: { limit: '10' } },
                { url: 'posts/4', view: 'post4', parameters: { id: '1' }, query: { limit: '10' } },
                { url: 'posts/5', view: 'post5', parameters: { id: '1' }, query: { limit: '10' } },
                { url: 'posts/6', view: 'post6', parameters: { id: '1' }, query: { limit: '10' } },
                { url: 'posts/7', view: 'post7', parameters: { id: '1' }, query: { limit: '10' } },
                { url: 'posts/8', view: 'post8', parameters: { id: '1' }, query: { limit: '10' } }
            ];
        });

        it('should test push', () => {
            var entry: plat.routing.IHistoryEntry = { url: 'posts/9', view: 'posts', parameters: { id: '1' }, query: { limit: '10' } };

            history.push(entry);

            expect(history.entries[history.length - 1]).toBe(entry);
        });


        it('should test pop', () => {
            var entry = history.entries[history.length - 1],
                popped = history.pop();

            expect(entry).toBe(popped);
        });

        it('should test forEach', () => {
            var entries: Array<plat.routing.IHistoryEntry> = [];

            history.forEach((entry) => {
                entries.push(entry);
            });

            expect(entries).toEqual(history.entries);
        });

        it('should test indexOf', () => {
            expect(history.indexOf('post4')).toBe(3);
            expect(history.indexOf('foo')).toBe(-1);
        });

        it('should test slice', () => {
            history.slice(history.indexOf('post4') - 1);

            expect(history.length).toBe(3);
            expect(history.indexOf('post4')).toBe(-1);
        });
    });
}
