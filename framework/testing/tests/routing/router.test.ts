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
            router.registerViewport(<any>viewport);
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
                    .then(() => {
                        expect(viewport.canNavigateFrom).toHaveBeenCalled();
                        expect(viewport.canNavigateTo).not.toHaveBeenCalled();
                        expect(viewport.navigateFrom).not.toHaveBeenCalled();
                        expect(viewport.navigateTo).not.toHaveBeenCalled();
                    }).then(<any>done, <any>done);
            });

            it('should not navigate when viewport returns false from canNavigateTo', (done: Function) => {
                viewport.canNavigateTo = <any>jasmine.createSpy('root canNavigateTo').and.returnValue(resolve(false));

                router.navigate('/posts')
                    .then(() => {
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
                        return router.registerViewport(<any>viewport);
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
                    child.registerViewport(childViewport);
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
                var spy1 = jasmine.createSpy('test1', (parameters: { id: any; }, query: { foo: any; }) => {
                    expect(parameters.id).toBe('2');
                    expect(query.foo).toBe('2');
                    parameters.id = query.foo = 2;
                }).and.callThrough(),
                    spy2 = jasmine.createSpy('test2', (parameters: { id: any; }, query: { foo: any; }) => {
                        expect(parameters.id).toBe(2);
                        expect(query.foo).toBe(2);
                    }).and.callThrough();

                router
                    .binding('posts', <any>spy1)
                    .binding('posts', <any>spy2);

                router.navigate('/posts/2', { foo: '2' }).then(() => {
                    expect(spy1).toHaveBeenCalled();
                    expect(spy2).toHaveBeenCalled();
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
