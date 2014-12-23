/// <reference path="../../typings/tsd.d.ts" />
module test.routing.router {
    var Promise = plat.acquire(plat.async.IPromise),
        resolve = Promise.resolve;

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
            plat.register.injectable('$Router', plat.routing.IRouter);
            router = plat.acquire(plat.routing.IRouter);
            viewport = createViewport('root');
            router.registerViewport(<any>viewport);
            resetAll(viewport);
        });

        it('should force navigate after configuration', (done) => {
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
                }).then(done, done);
        });

        describe('with a simple configuration', () => {
            beforeEach(() => {
                router.configure({
                    pattern: '/posts',
                    view: 'posts'
                });
                resetAll(viewport);
            });

            it('should call navigateTo on navigation', (done) => {
                router.navigate('/posts').then(() => {
                    expectAllTo(viewport);
                }).then(done, done);
            });

            it('should not re-navigate when called with the same url', (done) => {
                router.navigate('/posts')
                    .then(() => {
                        expectAllTo(viewport);
                        resetAll(viewport);
                        return router.navigate('/posts');
                    })
                    .then(() => {
                        expectAllNot(viewport);
                    })
                    .then(done, done);
            });

            it('should not navigate when viewport returns false from canNavigateFrom', (done) => {
                viewport.canNavigateFrom = <any>jasmine.createSpy('root canNavigateFrom').and.returnValue(resolve(false));

                router.navigate('/posts')
                    .then(() => {
                        expect(viewport.canNavigateFrom).toHaveBeenCalled();
                        expect(viewport.canNavigateTo).not.toHaveBeenCalled();
                        expect(viewport.navigateFrom).not.toHaveBeenCalled();
                        expect(viewport.navigateTo).not.toHaveBeenCalled();
                    }).then(done, done);
            });

            it('should not navigate when viewport returns false from canNavigateTo', (done) => {
                viewport.canNavigateTo = <any>jasmine.createSpy('root canNavigateTo').and.returnValue(resolve(false));

                router.navigate('/posts')
                    .then(() => {
                        expect(viewport.canNavigateFrom).toHaveBeenCalled();
                        expect(viewport.canNavigateTo).toHaveBeenCalled();
                        expect(viewport.navigateFrom).not.toHaveBeenCalled();
                        expect(viewport.navigateTo).not.toHaveBeenCalled();
                    }).then(done, done);
            });

            it('should navigate viewports registered after navigation', (done) => {
                plat.register.injectable('$Router', plat.routing.IRouter);
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
                    }).then(done, done);
            });

            describe('with child routers', () => {
                var child: plat.routing.Router,
                    childViewport: IViewport;

                beforeEach(() => {
                    child = router.child();
                    child.configure([
                        { pattern: '/new', view: 'createpost' },
                        { pattern: '/edit', view: 'editpost' }
                    ]);

                    childViewport = createViewport('child');
                    child.registerViewport(childViewport);
                });

                it('should perform navigation', (done) => {
                    router.navigate('/posts/new')
                        .then(() => {
                            expectAllTo(viewport);
                            expectAllTo(childViewport);
                        }).then(done, done);
                });

                it('should not navigate root viewports when the pattern is the same', (done) => {
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
                        }).then(done, done);
                });

                it('should not navigate if pre-navigation steps resolve false', (done) => {
                    child.preNavigate = () => resolve(false);

                    router.navigate('/posts/new').then(() => {
                        expect(viewport.canNavigateFrom).toHaveBeenCalled();
                        expect(viewport.canNavigateTo).toHaveBeenCalled();
                        expect(viewport.navigateFrom).not.toHaveBeenCalled();
                        expect(viewport.navigateTo).not.toHaveBeenCalled();
                        expectAllNot(childViewport);
                    }).then(done, done);
                });

                it('should generate urls', (done) => {
                    // a child router can only generate urls after the 
                    // child router has been navigated to
                    router.navigate('/posts/new').then(() => {
                        expect(router.generate('posts', {})).toBe('/posts');
                        expect(child.generate('editpost', {})).toBe('/posts/edit');
                    }).then(done, done);
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
