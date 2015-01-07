/// <reference path="../../typings/tsd.d.ts" />
module test.routing.router {
    'use strict';

    var Promise = plat.acquire(plat.async.IPromise),
        resolve = Promise.resolve.bind(Promise);

    class PostsViewControl extends plat.ui.ViewControl { }
    class CreatePostViewControl extends plat.ui.ViewControl { }
    class EditPostViewControl extends plat.ui.ViewControl { }

    plat.register.viewControl('posts', PostsViewControl);
    plat.register.viewControl('createpost', CreatePostViewControl);
    plat.register.viewControl('editpost', EditPostViewControl);

    describe('Router Tests', () => {
        var router: plat.routing.Router,
            viewport: IViewport;

        beforeEach(() => {
            router = plat.acquire(plat.routing.IRouter);
            viewport = createViewport('root');
            router.register(<any>viewport);
            resetAll(viewport);
        });

        it('should force navigate after configuration', (done: Function) => {
            router.navigate('/posts')
                .catch(() => {
                    expectAllNot(viewport);
                    return router.configure({
                        pattern: '/posts',
                        view: 'posts'
                    });
                })
                .then(() => {
                    expectAllTo(viewport);
                }).then(<any>done, <any>done);
        });

        describe('with a simple configuration', () => {
            beforeEach(() => {
                router.configure({
                    pattern: '/posts',
                    view: 'posts'
                });
                resetAll(viewport);
            });

            it('should call navigateTo on navigation', (done: Function) => {
                router.navigate('/posts').then(() => {
                    expectAllTo(viewport);
                }).then(<any>done, <any>done);
            });

            it('should not re-navigate when called with the same url', (done: Function) => {
                router.navigate('/posts')
                    .then(() => {
                        expectAllTo(viewport);
                        resetAll(viewport);
                        return router.navigate('/posts');
                    })
                    .then(() => {
                        expectAllNot(viewport);
                    })
                    .then(<any>done, <any>done);
            });

            it('should not navigate when viewport returns false from canNavigateFrom', (done: Function) => {
                viewport.canNavigateFrom = <any>jasmine.createSpy('root canNavigateFrom').and.returnValue(resolve(false));

                router.navigate('/posts')
                    .catch(() => {
                        expect(viewport.canNavigateFrom).toHaveBeenCalled();
                        expect(viewport.canNavigateTo).not.toHaveBeenCalled();
                        expect(viewport.navigateFrom).not.toHaveBeenCalled();
                        expect(viewport.navigateTo).not.toHaveBeenCalled();
                    }).then(<any>done, <any>done);
            });

            it('should not navigate when viewport returns false from canNavigateTo', (done: Function) => {
                viewport.canNavigateTo = <any>jasmine.createSpy('root canNavigateTo').and.returnValue(resolve(false));

                router.navigate('/posts')
                    .catch(() => {
                        expect(viewport.canNavigateFrom).toHaveBeenCalled();
                        expect(viewport.canNavigateTo).toHaveBeenCalled();
                        expect(viewport.navigateFrom).not.toHaveBeenCalled();
                        expect(viewport.navigateTo).not.toHaveBeenCalled();
                    }).then(<any>done, <any>done);
            });

            it('should navigate viewports registered after navigation', (done: Function) => {
                router = plat.acquire(plat.routing.IRouter);
                viewport = createViewport('root');
                router.configure([{ pattern: '/posts', view: 'posts' }]);

                router.navigate('/posts')
                    .then(() => {
                        expectAllNot(viewport);
                        return router.register(<any>viewport);
                    }).then(() => {
                        expect(viewport.navigateFrom).toHaveBeenCalled();
                        expect(viewport.navigateTo).toHaveBeenCalled();
                    }).then(<any>done, <any>done);
            });

            describe('with child routers', () => {
                var child: plat.routing.Router,
                    childViewport: IViewport;

                beforeEach(() => {
                    child = plat.acquire(plat.routing.IRouter);
                    child.configure([
                        { pattern: '/new', view: 'createpost' },
                        { pattern: '/edit', view: 'editpost' }
                    ]);

                    childViewport = createViewport('child');
                    child = router.addChild(child);
                    child.register(childViewport);
                });

                it('should perform navigation', (done: Function) => {
                    router.navigate('/posts/new')
                        .then(() => {
                            expectAllTo(viewport);
                            expectAllTo(childViewport);
                        }).then(<any>done, <any>done);
                });

                it('should not navigate root viewports when the pattern is the same', (done: Function) => {
                    router.navigate('/posts/new')
                        .then(() => {
                            expectAllTo(viewport);
                            expectAllTo(childViewport);
                            resetAll(viewport);
                            resetAll(childViewport);

                            return router.navigate('/posts/edit');
                        }).then(() => {
                            expectAllNot(viewport);
                            expectAllTo(childViewport);
                        }).then(<any>done, <any>done);
                });

                it('should not navigate if pre-navigation steps resolve false', (done: Function) => {
                    child.canNavigateFrom = () => { return resolve(false); };

                    router.navigate('/posts/new').then(() => {
                        expect(viewport.canNavigateFrom).toHaveBeenCalled();
                        expect(viewport.canNavigateTo).toHaveBeenCalled();
                        expect(viewport.navigateFrom).not.toHaveBeenCalled();
                        expect(viewport.navigateTo).not.toHaveBeenCalled();
                        expectAllNot(childViewport);
                    }).then(<any>done, <any>done);
                });

                it('should generate urls', (done: Function) => {
                    // a child router can only generate urls after the 
                    // child router has been navigated to
                    router.navigate('/posts/new').then(() => {
                        expect(router.generate('posts', {})).toBe('/posts');
                        expect(child.generate('editpost', {})).toBe('/posts/edit');
                    }).then(<any>done, <any>done);
                });
            });
        });

        describe('with variable routes', () => {
            beforeEach(() => {
                router.configure({
                    pattern: '/posts/:id',
                    view: 'posts'
                });
            });

            it('should test parameter bindings', (done) => {
                var post = { title: 'My Post' };
                var spy1 = jasmine.createSpy('strToNum', (value: string, parameters: { id: any; post?: typeof post; }) => {
                    expect(value).toBe('2');
                    parameters.id = Number(value);
                }).and.callThrough(),
                    spy2 = jasmine.createSpy('numToPost', (value: number, parameters: { id: number; post?: typeof post; }) => {
                        expect(value).toBe(2);
                        parameters.post = post;
                    }).and.callThrough(),
                    spy3 = jasmine.createSpy('checkPost', (value: number, parameters: { id: number; post?: typeof post; }) => {
                        expect(parameters.post).toBe(post);
                    }).and.callThrough();

                router
                    .param(<any>spy1, 'id', 'posts')
                    .param(<any>spy2, 'id', PostsViewControl)
                    .param(<any>spy3, 'id', 'posts');

                router.navigate('/posts/2').then(() => {
                    expect(spy1).toHaveBeenCalled();
                    expect(spy2).toHaveBeenCalled();
                    expect(spy3).toHaveBeenCalled();
                    done();
                });
            });

            it('should test query bindings', (done) => {
                var post = { title: 'My Post' };
                var spy1 = jasmine.createSpy('changePost', (value: string, query: typeof post) => {
                    expect(value).toBe(query.title);
                    query.title = post.title;
                    post.title = value;
                }).and.callThrough(),
                    spy2 = jasmine.createSpy('checkPost', (value: number, query: typeof post) => {
                        expect(query.title).toBe(value);
                        expect(post.title).not.toBe(query.title);
                        expect(post.title).toBe('My different post');
                    }).and.callThrough();

                router
                    .queryParam(<any>spy1, 'title', 'posts')
                    .queryParam(<any>spy2, 'title', PostsViewControl);

                router.navigate('/posts/2', { title: 'My different post' }).then(() => {
                    expect(spy1).toHaveBeenCalled();
                    expect(spy2).toHaveBeenCalled();
                    done();
                });
            });

            it('should test parameter and query bindings', (done) => {
                var post = { title: 'My Post' };
                var spy1 = jasmine.createSpy('changePost', (value: string, query: typeof post) => {
                    expect(value).toBe(query.title);
                    query.title += ' changed';
                }).and.callThrough(),
                    spy2 = jasmine.createSpy('getPost', (value: string, parameters: { id: any; post?: typeof post; }, query: typeof post) => {
                        expect(value).toBe('2');
                        expect(post.title).not.toBe(query.title);
                        parameters.id = Number(value);
                        parameters.post = post;
                        post.title = query.title;
                    }).and.callThrough(),
                    spy3 = jasmine.createSpy('checkPost', (value: number, parameters: { id: number; post?: typeof post; }, query: typeof post) => {
                        expect(parameters.post).toBe(post);
                        expect(post.title).toBe('My different post changed');
                    }).and.callThrough();

                router
                    .param(<any>spy2, 'id', 'posts')
                    .param(<any>spy3, 'id', 'posts')
                    .queryParam(<any>spy1, 'title', PostsViewControl);

                router.navigate('/posts/2', { title: 'My different post' }).then(() => {
                    expect(spy1).toHaveBeenCalled();
                    expect(spy2).toHaveBeenCalled();
                    expect(spy3).toHaveBeenCalled();
                    done();
                });
            });

            it('should test interceptors', (done) => {
                router.intercept(() => false, PostsViewControl);

                router.navigate('/posts/2').catch((e) => {
                    expect(e.toString()).toBe('Error: Not cleared to navigate');
                    expect(viewport.canNavigateFrom).toHaveBeenCalled();
                    expect(viewport.canNavigateTo).not.toHaveBeenCalled();
                    expect(viewport.navigateFrom).not.toHaveBeenCalled();
                    expect(viewport.navigateTo).not.toHaveBeenCalled();
                    done();
                });
            });
        });
    });

    function expectAllNot(viewport: IViewport) {
        expect(viewport.canNavigateFrom).not.toHaveBeenCalled();
        expect(viewport.canNavigateTo).not.toHaveBeenCalled();
        expect(viewport.navigateFrom).not.toHaveBeenCalled();
        expect(viewport.navigateTo).not.toHaveBeenCalled();
    }

    function expectAllTo(viewport: IViewport) {
        expect(viewport.canNavigateFrom).toHaveBeenCalled();
        expect(viewport.canNavigateTo).toHaveBeenCalled();
        expect(viewport.navigateFrom).toHaveBeenCalled();
        expect(viewport.navigateTo).toHaveBeenCalled();
    }

    function resetAll(viewport: IViewport) {
        viewport.canNavigateFrom.calls.reset();
        viewport.canNavigateTo.calls.reset();
        viewport.navigateFrom.calls.reset();
        viewport.navigateTo.calls.reset();
    }

    function createViewport(name: string): IViewport {
        return <any>{
            canNavigateFrom: jasmine.createSpy(name + ' canNavigateFrom').and.returnValue(resolve(true)),
            canNavigateTo: jasmine.createSpy(name + ' canNavigateTo').and.returnValue(resolve(true)),
            navigateFrom: jasmine.createSpy(name + ' navigateFrom').and.returnValue(resolve()),
            navigateTo: jasmine.createSpy(name + ' navigateTo').and.returnValue(resolve())
        };
    }

    interface IViewport {
        canNavigateFrom: jasmine.Spy;
        canNavigateTo: jasmine.Spy;
        navigateFrom: jasmine.Spy;
        navigateTo: jasmine.Spy;
    }
}
