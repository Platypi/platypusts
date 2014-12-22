/// <reference path="../../typings/tsd.d.ts" />
module test.routing.router {
    var Promise = plat.acquire(plat.async.IPromise),
        resolve = Promise.resolve;

    plat.register.injectable('$Router', plat.routing.IRouter);

    class PostsViewControl extends plat.ui.ViewControl {

    }

    plat.register.viewControl('posts', PostsViewControl);

    ddescribe('Router Tests', () => {
        var router: plat.routing.Router,
            viewport: IViewport;

        beforeEach(() => {
            router = plat.acquire(plat.routing.IRouter);
            viewport = createViewport('root');
            router.registerViewport(<any>viewport);
        });

        it('should force navigate after configuration', (done) => {
            router.navigate('/posts')
                .catch(() => {
                    expect(viewport.canNavigateFrom).not.toHaveBeenCalled();
                    expect(viewport.canNavigateTo).not.toHaveBeenCalled();
                    expect(viewport.navigateFrom).not.toHaveBeenCalled();
                    expect(viewport.navigateTo).not.toHaveBeenCalled();
                    return router.configure({
                        pattern: '/posts',
                        view: 'posts'
                    });
                })
                .then(() => {
                    expect(viewport.canNavigateFrom).toHaveBeenCalled();
                    expect(viewport.canNavigateTo).toHaveBeenCalled();
                    expect(viewport.navigateFrom).toHaveBeenCalled();
                    expect(viewport.navigateTo).toHaveBeenCalled();
                    done();
                });
        });
    });

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
