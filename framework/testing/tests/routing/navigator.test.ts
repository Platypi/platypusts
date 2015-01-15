/// <reference path="../../references.d.ts" />
module test.routing.router {
    'use strict';

    var history = plat.acquire(plat.routing.History),
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
            navigator = plat.acquire(plat.routing.INavigatorInstance);
        });

        afterEach(() => {
            navigator.removeUrlListener();
        });

        it('should test history', () => {
            navigator.initialize(router);
            expect((<any>navigator)._history).toBe(history);
        });

        it('should test that the history stack is populated for the initial navigator', () => {
            var spy = spyOn(browser, 'url'),
                spy2 = spyOn(router, 'navigate');

            spy.calls.reset();
            (<any>plat.routing.Navigator)._root = undefined;
            navigator.initialize(router);
            expect(spy).toHaveBeenCalled();
            expect(spy2).not.toHaveBeenCalled();
        });

        describe('pre-initialized', () => {
            beforeEach(() => {
                navigator.initialize(router);
            });

            it('should test navigate', (done) => {
                var spy = <jasmine.Spy><any>spyOn(browser, 'url').and.callThrough();
                navigator.navigate(PostsViewControl, null).then(() => {
                    expect(spy).toHaveBeenCalled();
                    done();
                });
            });

            it('should test goBack with length', () => {
                var spy = spyOn(window.history, 'go');

                navigator.goBack({
                    length: 2
                });

                expect(spy).toHaveBeenCalledWith(-2);
            });
        });
    });
}
