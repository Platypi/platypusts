/// <reference path="../../typings/tsd.d.ts" />

module tests.routing.routeRecognizer {
    describe('Route Recognizer tests', () => {
        var router: plat.routing.RouteRecognizer;

        beforeEach(() => {
            router = new plat.routing.RouteRecognizer();
        });

        it('should test simple static route with no leading/trailing slash', () => {
            var delegate = {};

            router.register([{
                pattern: 'admin/users',
                delegate: delegate
            }]);

            expect(router.recognize('admin/users')).toEqual([{
                delegate: delegate,
                params: {},
                isDynamic: false
            }]);

            expect(router.recognize('/admin/users')).toEqual([{
                delegate: delegate,
                params: {},
                isDynamic: false
            }]);

            expect(router.recognize('admin/users/')).toEqual([{
                delegate: delegate,
                params: {},
                isDynamic: false
            }]);

            expect(router.recognize('/admin/users/')).toEqual([{
                delegate: delegate,
                params: {},
                isDynamic: false
            }]);
        });

        it('should test simple static route with leading slash', () => {
            var delegate = {};

            router.register([{
                pattern: '/admin/users',
                delegate: delegate
            }]);

            expect(router.recognize('admin/users')).toEqual([{
                delegate: delegate,
                params: {},
                isDynamic: false
            }]);

            expect(router.recognize('/admin/users')).toEqual([{
                delegate: delegate,
                params: {},
                isDynamic: false
            }]);

            expect(router.recognize('admin/users/')).toEqual([{
                delegate: delegate,
                params: {},
                isDynamic: false
            }]);

            expect(router.recognize('/admin/users/')).toEqual([{
                delegate: delegate,
                params: {},
                isDynamic: false
            }]);
        });

        it('should test simple static route with trailing slash', () => {
            var delegate = {};

            router.register([{
                pattern: 'admin/users/',
                delegate: delegate
            }]);

            expect(router.recognize('admin/users')).toEqual([{
                delegate: delegate,
                params: {},
                isDynamic: false
            }]);

            expect(router.recognize('/admin/users')).toEqual([{
                delegate: delegate,
                params: {},
                isDynamic: false
            }]);
            expect(router.recognize('admin/users/')).toEqual([{

                delegate: delegate,
                params: {},
                isDynamic: false
            }]);

            expect(router.recognize('/admin/users/')).toEqual([{
                delegate: delegate,
                params: {},
                isDynamic: false
            }]);
        });

        it('should test static routes', () => {
            /// CHILD APP

            router.register([{
                pattern: '/:id',
                delegate: 3
            }]);

            router.register([{
                pattern: '/:id/edit',
                delegate: 4
            }]);

            router.register([{
                pattern: '/new',
                delegate: 5
            }]);

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
