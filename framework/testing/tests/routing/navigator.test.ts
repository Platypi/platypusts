/// <reference path="../../typings/tsd.d.ts" />
module test.routing.router {
    'use strict';

    class Browser {

    }

    var history = plat.acquire(plat.routing.IHistory),
        router = plat.acquire(plat.routing.IRouter),
        browser = plat.acquire(plat.web.IBrowser),
        navigator: plat.routing.Navigator;

    class PostsViewControl extends plat.ui.ViewControl { }
    class PostsViewControl1 extends plat.ui.ViewControl { }
    class PostsViewControl2 extends plat.ui.ViewControl { }
    class PostsViewControl3 extends plat.ui.ViewControl { }
    class PostsViewControl4 extends plat.ui.ViewControl { }
    class PostsViewControl5 extends plat.ui.ViewControl { }
    class PostsViewControl6 extends plat.ui.ViewControl { }
    class PostsViewControl7 extends plat.ui.ViewControl { }
    class PostsViewControl8 extends plat.ui.ViewControl { }

    plat.register.viewControl('posts', PostsViewControl);
    plat.register.viewControl('post8', PostsViewControl8);
    plat.register.viewControl('post7', PostsViewControl7);
    plat.register.viewControl('post6', PostsViewControl6);
    plat.register.viewControl('post5', PostsViewControl5);
    plat.register.viewControl('post4', PostsViewControl4);
    plat.register.viewControl('post3', PostsViewControl3);
    plat.register.viewControl('post2', PostsViewControl2);
    plat.register.viewControl('post1', PostsViewControl1);

    router.configure({
        pattern: '/posts',
        view: 'posts'
    });

    describe('Navigator Test', () => {
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

            navigator = plat.acquire(plat.routing.INavigatorInstance);
        });

        afterEach(() => {
            navigator.removeUrlListener();
        });

        it('should test history', () => {
            navigator.initialize(router);
            expect(navigator.history).toBe(history);
        });

        it('should test that the history stack is populated for the initial navigator', () => {
            var spy = spyOn(browser, 'url'),
                spy2 = spyOn(router, 'navigate');

            spy.calls.reset();
            navigator.initialize(router);
            expect(spy.calls.count()).toBe(history.length + 1);
            expect(spy2).not.toHaveBeenCalled();
        });

        describe('pre-initialized', () => {
            beforeEach(() => {
                navigator.initialize(router);
            });

            it('should test navigate', () => {
                var spy = <jasmine.Spy><any>spyOn(browser, 'url').and.callThrough();
                navigator.navigate(PostsViewControl, null);

                expect(spy).toHaveBeenCalled();
            });

            it('should test goBack with length', () => {
                var spy = spyOn(navigator, 'navigate').and.callThrough();
                spyOn(window.history, 'go');
                navigator.goBack({
                    length: 2
                });

                expect(spy).toHaveBeenCalledWith('posts/6', { isUrl: true });
            });

            it('should test goBack with a view', () => {
                var spy = spyOn(navigator, 'navigate');
                spyOn(window.history, 'go');

                navigator.goBack({
                    view: 'post6'
                });

                expect(spy).toHaveBeenCalledWith('posts/6', { isUrl: true });
            });
        });
    });
}
