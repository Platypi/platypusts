/// <reference path="../../references.d.ts" />

module tests.routing.router {
    'use strict';

    const Promise = plat.acquire(plat.async.IPromise);
    const resolve = Promise.resolve.bind(Promise);

    class PostsViewControl extends plat.ui.ViewControl { }
    class CreatePostViewControl extends plat.ui.ViewControl { }
    class EditPostViewControl extends plat.ui.ViewControl { }
    class CustomersViewControl extends plat.ui.ViewControl { }

    plat.register.viewControl('posts', PostsViewControl);
    plat.register.viewControl('createpost', CreatePostViewControl);
    plat.register.viewControl('editpost', EditPostViewControl);
    plat.register.viewControl('customers', CustomersViewControl);

    describe('Router Tests', () => {
        let router: plat.routing.Router;
        let viewport: IViewport;

        beforeEach(() => {
            router = plat.acquire(plat.routing.Router);
            viewport = createViewport('root');
            router.register(<any>viewport);
            resetAll(viewport);
        });

        it('should force navigate after configuration', (done: Function) => {
            router.navigate('/posts')
                .then(() => {
                    expectAllNot(viewport);

                    return router.configure({
                        pattern: '/posts',
                        view: 'posts',
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
                    view: 'posts',
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
                router = plat.acquire(plat.routing.Router);
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

            it('should test unknown route handler', (done: Function) => {
                router.unknown((info: plat.routing.IUnknownRouteInfo) => {
                    expect(info.segment).toBe('/404');
                    info.view = EditPostViewControl;
                });

                router.navigate('/404')
                    .then(() => {
                        expectAllTo(viewport);
                        done();
                    });
            });

            describe('with child routers', () => {
                let child: plat.routing.Router;
                let childViewport: IViewport;

                beforeEach(() => {
                    child = plat.acquire(plat.routing.Router);
                    child.configure([
                        { pattern: '/new', view: 'createpost' },
                        { pattern: '/edit', view: 'editpost' },
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
                    (<any>child)._canNavigateFrom = () => {
                        return resolve(false);
                    };

                    router.navigate('/posts/new').then(<any>done, (e) => {
                        expect(viewport.canNavigateFrom).not.toHaveBeenCalled();
                        expect(viewport.canNavigateTo).not.toHaveBeenCalled();
                        expect(viewport.navigateFrom).not.toHaveBeenCalled();
                        expect(viewport.navigateTo).not.toHaveBeenCalled();
                        expectAllNot(childViewport);
                        expect(e.toString()).toBe('Error: Not cleared to navigate');
                        done();
                    });
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
                router.configure([{
                    pattern: '/posts/:id',
                    view: 'posts',
                }, {
                    pattern: '/posts/:id/create/:name',
                    view: 'createpost',
                }]);
            });

            it('should test navigating with different parameters', (done) => {
                router.navigate('/posts/1')
                    .then(() => {
                        expectAllTo(viewport);
                        resetAll(viewport);
                        expectAllNot(viewport);

                        return router.navigate('/posts/2');
                    })
                    .then(() => {
                        expectAllTo(viewport);
                        resetAll(viewport);
                        expectAllNot(viewport);

                        return router.navigate('/posts/3');
                    })
                    .then(() => {
                        expectAllTo(viewport);
                        done();
                    });
            });

            it('should test navigating with different parameters and a complex route', (done) => {
                router.navigate('/posts/1/create/foo')
                    .then(() => {
                        expectAllTo(viewport);
                        resetAll(viewport);
                        expectAllNot(viewport);

                        return router.navigate('/posts/1/create/bar');
                    })
                    .then(() => {
                        expectAllTo(viewport);
                        resetAll(viewport);
                        expectAllNot(viewport);

                        return router.navigate('/posts/2/create/bar');
                    })
                    .then(() => {
                        expectAllTo(viewport);
                        resetAll(viewport);
                        expectAllNot(viewport);

                        return router.navigate('/posts/2/create/bar');
                    })
                    .then(() => {
                        expectAllNot(viewport);
                        done();
                    });
            });

            it('should test parameter bindings', (done) => {
                const post = { title: 'My Post' };
                const spy1 = jasmine.createSpy('strToNum', (value: string, parameters: { id: any; post?: typeof post }) => {
                    expect(value).toBe('2');
                    parameters.id = Number(value);
                }).and.callThrough();
                const spy2 = jasmine.createSpy('numToPost', (value: number, parameters: { id: number; post?: typeof post }) => {
                    expect(value).toBe(2);
                    parameters.post = post;
                }).and.callThrough();
                const spy3 = jasmine.createSpy('checkPost', (value: number, parameters: { id: number; post?: typeof post }) => {
                    expect(parameters.post).toBe(post);
                }).and.callThrough();

                router
                    .param(<any>spy1, 'id', 'posts')
                    .param(<any>spy2, 'id', PostsViewControl)
                    .param(<any>spy3, 'foo', 'posts');

                router.navigate('/posts/2').then(() => {
                    expect(spy1).toHaveBeenCalled();
                    expect(spy2).toHaveBeenCalled();
                    expect(spy3).not.toHaveBeenCalled();
                    done();
                });
            });

            it('should test query bindings', (done) => {
                const post = { title: 'My Post' };
                const spy1 = jasmine.createSpy('changePost', (value: string, query: typeof post) => {
                    expect(value).toBe(query.title);
                    query.title = post.title;
                    post.title = value;
                }).and.callThrough();
                const spy2 = jasmine.createSpy('checkPost', (value: string, query: typeof post) => {
                    expect(query.title).toBe(value);
                    expect(post.title).not.toBe(query.title);
                    expect(post.title).toBe('My different post');
                }).and.callThrough();
                const spy3 = jasmine.createSpy('checkPost2', (value: string, query: typeof post) => {
                    expect((<any>query).title2).toBeUndefined();
                }).and.callThrough();

                router
                    .queryParam(<any>spy1, 'title', 'posts')
                    .queryParam(<any>spy2, 'title', PostsViewControl)
                    .queryParam(<any>spy3, 'title2', PostsViewControl);

                router.navigate('/posts/2', { title: 'My different post' }).then(() => {
                    expect(spy1).toHaveBeenCalled();
                    expect(spy2).toHaveBeenCalled();
                    expect(spy3).toHaveBeenCalled();
                    done();
                });
            });

            it('should test parameter and query bindings', (done) => {
                const post = { title: 'My Post' };
                const spy1 = jasmine.createSpy('changePost', (value: string, query: typeof post) => {
                    expect(value).toBe(query.title);
                    query.title += ' changed';
                }).and.callThrough();
                const spy2 = jasmine.createSpy('getPost', (value: string, parameters: { id: any; post?: typeof post }, query: typeof post) => {
                    expect(value).toBe('2');
                    expect(post.title).not.toBe(query.title);
                    parameters.id = Number(value);
                    parameters.post = post;
                    post.title = query.title;
                }).and.callThrough();
                const spy3 = jasmine.createSpy('checkPost', (value: number, parameters: { id: number; post?: typeof post }, query: typeof post) => {
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
                    expect(viewport.navigateTo.calls.mostRecent().args[0].parameters).toEqual({ id: 2, post: post });
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

            it('should test * query/param/interceptors', (done) => {
                router.configure({
                    pattern: '/customers/:id',
                    view: CustomersViewControl,
                });

                let arr: number[] = [];

                router
                    .param((value: string) => {
                        arr.push(4);
                    }, 'id', PostsViewControl)
                    .param((value: string) => {
                        arr.push(3);
                    }, 'id', '*')
                    .queryParam((value: string) => {
                        arr.push(2);
                    }, 'title', PostsViewControl)
                    .queryParam((value: string) => {
                        arr.push(1);
                    }, 'title', '*')
                    .intercept((routeInfo: plat.routing.IRouteInfo) => {
                        arr.push(6);
                    }, PostsViewControl)
                    .intercept((routeInfo: plat.routing.IRouteInfo) => {
                        arr.push(5);
                    }, '*');

                router
                    .navigate('/posts/1')
                    .then(() => {
                        expect(arr).toEqual([1, 2, 3, 4, 5, 6]);
                        arr = [];

                        return router.navigate('/customers/1');
                    })
                    .then(() => {
                        expect(arr).toEqual([1, 3, 5]);
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
            canNavigateFrom: jasmine.createSpy(`${name} canNavigateFrom`).and.returnValue(resolve(true)),
            canNavigateTo: jasmine.createSpy(`${name} canNavigateTo`).and.returnValue(resolve(true)),
            navigateFrom: jasmine.createSpy(`${name} navigateFrom`).and.returnValue(resolve()),
            navigateTo: jasmine.createSpy(`${name} navigateTo`).and.returnValue(resolve()),
        };
    }

    interface IViewport {
        canNavigateFrom: jasmine.Spy;
        canNavigateTo: jasmine.Spy;
        navigateFrom: jasmine.Spy;
        navigateTo: jasmine.Spy;
    }
}
