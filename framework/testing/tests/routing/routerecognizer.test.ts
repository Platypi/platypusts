/// <reference path="../../typings/tsd.d.ts" />
module tests.routing.routeRecognizer {
    describe('Route Recognizer tests', () => {
        var router: plat.routing.RouteRecognizer,
            delegate1: Object,
            delegate2: Object,
            delegate3: Object,
            delegate4: Object;

        beforeEach(() => {
            router = new plat.routing.RouteRecognizer();
            delegate1 = { foo: 'foo' };
            delegate2 = { bar: 'bar' };
            delegate3 = { baz: 'baz' };
            delegate4 = { quux: 'quux' };
        });

        it('should test simple static route with no leading/trailing slash', () => {
            router.register([{
                pattern: 'admin/users',
                delegate: delegate1
            }]);

            expect(router.recognize('admin/users')).toEqual([{
                delegate: delegate1,
                params: {},
                isDynamic: false
            }]);

            expect(router.recognize('/admin/users')).toEqual([{
                delegate: delegate1,
                params: {},
                isDynamic: false
            }]);

            expect(router.recognize('admin/users/')).toEqual([{
                delegate: delegate1,
                params: {},
                isDynamic: false
            }]);

            expect(router.recognize('/admin/users/')).toEqual([{
                delegate: delegate1,
                params: {},
                isDynamic: false
            }]);
        });

        it('should test simple static route with leading slash', () => {
            router.register([{
                pattern: '/admin/users',
                delegate: delegate1
            }]);

            expect(router.recognize('admin/users')).toEqual([{
                delegate: delegate1,
                params: {},
                isDynamic: false
            }]);

            expect(router.recognize('/admin/users')).toEqual([{
                delegate: delegate1,
                params: {},
                isDynamic: false
            }]);

            expect(router.recognize('admin/users/')).toEqual([{
                delegate: delegate1,
                params: {},
                isDynamic: false
            }]);

            expect(router.recognize('/admin/users/')).toEqual([{
                delegate: delegate1,
                params: {},
                isDynamic: false
            }]);
        });

        it('should test simple static route with trailing slash', () => {
            router.register([{
                pattern: 'admin/users/',
                delegate: delegate1
            }]);

            expect(router.recognize('admin/users')).toEqual([{
                delegate: delegate1,
                params: {},
                isDynamic: false
            }]);

            expect(router.recognize('/admin/users')).toEqual([{
                delegate: delegate1,
                params: {},
                isDynamic: false
            }]);
            expect(router.recognize('admin/users/')).toEqual([{

                delegate: delegate1,
                params: {},
                isDynamic: false
            }]);

            expect(router.recognize('/admin/users/')).toEqual([{
                delegate: delegate1,
                params: {},
                isDynamic: false
            }]);
        });

        it('should test a "/" route', () => {
            router.register([{
                pattern: '/',
                delegate: delegate1
            }]);

            expect(router.recognize('/')).toEqual([{
                delegate: delegate1,
                params: {},
                isDynamic: false
            }]);
        });

        it('should test dynamic routes', () => {
            router.register([{
                pattern: 'customers/:name',
                delegate: delegate1
            }]);

            expect(router.recognize('customers/john')).toEqual([{
                delegate: delegate1,
                params: {
                    name: 'john'
                },
                isDynamic: true
            }]);

            expect(router.recognize('customers/1')).toEqual([{
                delegate: delegate1,
                params: {
                    name: '1'
                },
                isDynamic: true
            }]);

            expect(router.recognize('employees/1')).toBeUndefined();
        });

        it('should test multiple routes', () => {
            router.register([{
                pattern: 'posts/:id',
                delegate: delegate1
            }]);

            router.register([{
                pattern: 'customers/:id',
                delegate: delegate2
            }]);

            expect(router.recognize('posts/1')).toEqual([{
                delegate: delegate1,
                params: {
                    id: '1'
                },
                isDynamic: true
            }]);

            expect(router.recognize('customers/2')).toEqual([{
                delegate: delegate2,
                params: {
                    id: '2'
                },
                isDynamic: true
            }]);
        });

        it('should test multiple "/" routes', () => {
            router.register([{
                pattern: '/',
                delegate: delegate1
            }, {
                pattern: '/',
                delegate: delegate2
            }]);

            expect(router.recognize('/')).toEqual([{
                delegate: delegate1,
                params: {},
                isDynamic: false
            }, {
                delegate: delegate2,
                params: {},
                isDynamic: false
            }]);
        });

        it('should test overlapping routes', () => {
            router.register([{
                pattern: 'posts/:id',
                delegate: delegate1
            }]);

            router.register([{
                pattern: 'posts/1/:title',
                delegate: delegate2
            }]);

            expect(router.recognize('/posts/1/title')).toEqual([{
                delegate: delegate2,
                params: {
                    title: 'title'
                },
                isDynamic: true
            }]);

            expect(router.recognize('/posts/1')).toEqual([{
                delegate: delegate1,
                params: {
                    id: '1'
                },
                isDynamic: true
            }]);
        });

        it('should test overlapping wildcard routes', () => {
            router.register([{
                pattern: 'posts/*path',
                delegate: delegate1
            }]);

            router.register([{
                pattern: '/*path',
                delegate: delegate2
            }]);

            expect(router.recognize('/posts/1/title')).toEqual([{
                delegate: delegate1,
                params: {
                    path: '1/title'
                },
                isDynamic: true
            }]);

            expect(router.recognize('/1')).toEqual([{
                delegate: delegate2,
                params: {
                    path: '1'
                },
                isDynamic: true
            }]);
        });

        it('should test preferring single dynamic segments over wildcards', () => {
            router.register([{
                pattern: 'posts/*path',
                delegate: delegate1
            }]);

            router.register([{
                pattern: '/posts/*path/:id',
                delegate: delegate2
            }]);

            expect(router.recognize('/posts/1')).toEqual([{
                delegate: delegate1,
                params: {
                    path: '1'
                },
                isDynamic: true
            }]);

            expect(router.recognize('/posts/title')).toEqual([{
                delegate: delegate1,
                params: {
                    path: 'title'
                },
                isDynamic: true
            }]);

            expect(router.recognize('/posts/title/1')).toEqual([{
                delegate: delegate2,
                params: {
                    id: '1',
                    path: 'title'
                },
                isDynamic: true
            }]);
        });

        it('should test nested routes', () => {
            router.register([{
                pattern: 'app/:page',
                delegate: delegate1
            }, {
                pattern: 'posts/:id',
                delegate: delegate2
            }]);

            expect(router.recognize('/app/2/posts/1')).toEqual([{
                delegate: delegate1,
                params: {
                    page: '2'
                },
                isDynamic: true
            }, {
                delegate: delegate2,
                params: {
                    id: '1'
                },
                isDynamic: true
            }]);
        });

        it('should test multiple matches, expecing the pattern with most dynamic segments to win', () => {
            router.register([{ pattern: '/posts/new', delegate: delegate1 }]);
            router.register([{ pattern: '/posts/:id', delegate: delegate2 }]);
            router.register([{ pattern: '/posts/edit', delegate: delegate3 }]);

            expect(router.recognize('/posts/new')).toEqual([{
                delegate: delegate1,
                params: {},
                isDynamic: false
            }]);

            expect(router.recognize('/posts/1')).toEqual([{
                delegate: delegate2,
                params: {
                    id: '1'
                },
                isDynamic: true
            }]);

            expect(router.recognize('/posts/edit')).toEqual([{
                delegate: delegate3,
                params: {},
                isDynamic: false
            }]);
        });

        it('should test empty paths', () => {
            router.register([
                { pattern: '/posts', delegate: delegate1 },
                { pattern: '/', delegate: delegate2 },
                { pattern: '/:id', delegate: delegate3 }
            ]);

            router.register([
                { pattern: '/posts', delegate: delegate1 },
                { pattern: '/', delegate: delegate2 },
                { pattern: '/', delegate: delegate3 },
                { pattern: '/edit', delegate: delegate4 }
            ]);

            expect(router.recognize('/posts/1')).toEqual([
                { delegate: delegate1, params: {}, isDynamic: false },
                { delegate: delegate2, params: {}, isDynamic: false },
                { delegate: delegate3, params: { id: '1' }, isDynamic: true }
            ]);

            expect(router.recognize('/posts/edit')).toEqual([
                { delegate: delegate1, params: {}, isDynamic: false },
                { delegate: delegate2, params: {}, isDynamic: false },
                { delegate: delegate3, params: {}, isDynamic: false },
                { delegate: delegate4, params: {}, isDynamic: false }
            ]);
        });

        it('should test repeated empty segments', () => {
            router.register([
                { pattern: '/', delegate: delegate1 },
                { pattern: '/', delegate: delegate2 },
                { pattern: '/', delegate: delegate3 }
            ]);

            router.register([
                { pattern: '/', delegate: delegate2 },
                { pattern: '/', delegate: delegate3 },
                { pattern: '/foo', delegate: delegate4 }
            ]);

            expect(router.recognize('/')).toEqual([
                { delegate: delegate1, params: {}, isDynamic: false },
                { delegate: delegate2, params: {}, isDynamic: false },
                { delegate: delegate3, params: {}, isDynamic: false }
            ]);

            expect(router.recognize('')).toEqual([
                { delegate: delegate1, params: {}, isDynamic: false },
                { delegate: delegate2, params: {}, isDynamic: false },
                { delegate: delegate3, params: {}, isDynamic: false }
            ]);

            expect(router.recognize('/foo')).toEqual([
                { delegate: delegate2, params: {}, isDynamic: false },
                { delegate: delegate3, params: {}, isDynamic: false },
                { delegate: delegate4, params: {}, isDynamic: false }
            ]);

            expect(router.recognize('foo')).toEqual([
                { delegate: delegate2, params: {}, isDynamic: false },
                { delegate: delegate3, params: {}, isDynamic: false },
                { delegate: delegate4, params: {}, isDynamic: false }
            ]);
        });

        it('should test dynamic routes without leading "/" and single length param', () => {
            router.register([
                { pattern: '/posts/:id', delegate: delegate1 }
            ]);

            expect(router.recognize('posts/1')).toEqual([
                { delegate: delegate1, params: { id: '1' }, isDynamic: true }
            ]);
        });

        it('should test static routes', () => {
            /// CHILD APP

            router.register([{ pattern: '/:id', delegate: 3 }]);
            router.register([{ pattern: '/:id/edit', delegate: 4 }]);
            router.register([{ pattern: '/new', delegate: 5 }]);

            var result = router.recognize('/6');
            expect(result).toEqual([{
                delegate: 3,
                params: { id: '6' },
                isDynamic: true
            }]);

            result = router.recognize('/6/edit');
            expect(result).toEqual([{
                delegate: 4,
                params: { id: '6' },
                isDynamic: true
            }]);

            result = router.recognize('/new');
            expect(result).toEqual([{
                delegate: 5,
                params: { },
                isDynamic: false
            }]);

            /// MAIN APP

            var router2 = new plat.routing.RouteRecognizer();

            router2.register([{
                pattern: '/posts',
                delegate: 1
            }]);

            router2.register([{
                pattern: '/posts/*childroute',
                delegate: 2
            }]);

            result = router2.recognize('/posts');
            expect(result).toEqual([{
                delegate: 1,
                params: {},
                isDynamic: false
            }]);

            result = router2.recognize('/posts/6');
            expect(result).toEqual([{
                delegate: 2,
                params: {
                    childroute: '6'
                },
                isDynamic: true
            }]);


            result = router2.recognize('/posts/6/edit');
            expect(result).toEqual([{
                delegate: 2,
                params: {
                    childroute: '6/edit'
                },
                isDynamic: true
            }]);

            result = router2.recognize('/posts/new');
            expect(result).toEqual([{
                delegate: 2,
                params: {
                    childroute: 'new'
                },
                isDynamic: true
            }]);
        });
    });
}
