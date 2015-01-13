/// <reference path="../../typings/tsd.d.ts" />

module tests.acquire {
    var utils: plat.IUtils = plat.acquire(plat.IUtils);

    function instanceOf(Constructor: new () => void) {
        return (obj: any) => {
            expect(obj instanceof Constructor).toBe(true);
        };
    }

    function toBe(obj: any) {
        return (dep: any) => {
            expect(dep).toBe(obj);
        };
    }

    function toEqual(obj: any) {
        return (dep: any) => {
            expect(dep).toEqual(obj);
        };
    }

    var __AppStatic = '_AppStatic',
        __App = '_app',
        __Http = '_http',
        __HttpConfig = '_httpConfig',
        __Promise = '_Promise',
        __Compat = '_compat',
        __ControlFactory = '_ControlFactory',
        __AttributeControlFactory = '_AttributeControlFactory',
        __Document = '_document',
        __DispatchEventInstance = '_dispatchEventInstance',
        __ErrorEventStatic = '$ErrorEventStatic',
        __EventManagerStatic = '_EventManagerStatic',
        __LifecycleEventStatic = '_LifecycleEventStatic',
        __ExceptionStatic = '_Exception',
        __Parser = '_parser',
        __Regex = '_regex',
        __Tokenizer = '_tokenizer',
        __NavigatorInstance = '_navigator',
        __ContextManagerStatic = '_ContextManager',
        __Compiler = '_compiler',
        __CommentManagerFactory = '_CommentManagerFactory',
        __ElementManagerFactory = '_ElementManagerFactory',
        __NodeManagerStatic = '_NodeManager',
        __TextManagerFactory = '_TextManager',
        __CacheFactory = '_CacheFactory',
        __ManagerCache = '_managerCache',
        __TemplateCache = '_templateCache',
        __AttributesInstance = '_attributes',
        __BindableTemplatesFactory = '_BindableTemplatesFactory',
        __Dom = '_dom',
        __DomEvents = '_domEvents',
        __DomEventsConfig = '_domEventsConfig',
        __DomEventInstance = '_domEvents',
        __ResourcesFactory = '_ResourcesFactory',
        __TemplateControlFactory = '_TemplateControlFactory',
        __BaseViewControlFactory = '$BaseViewControlFactory',
        __Utils = '_utils',
        __Browser = '_browser',
        __BrowserConfig = '_browserConfig',
        __Router = '_router',
        __UrlUtilsInstance = '_urlUtilsInstance',
        __Window = '_window',
        __LocalStorage = '_localStorage',
        __SessionStorage = '_sessionStorage';

    var dependencies = [{
            name: __AppStatic,
            compare: toBe(plat.App)
        }, {
            name: __App,
            compare: toBe(null)
        }, {
            name: __Http,
            compare: instanceOf(plat.async.Http)
        }, {
            name: __HttpConfig,
            compare: toBe(plat.async.IHttpConfig())
        }, {
            name: __Promise,
            compare: toBe(plat.async.IPromise(window))
        }, {
            name: __Compat,
            compare: instanceOf(plat.Compat)
        }, {
            name: __ControlFactory,
            compare: toBe(plat.Control)
        }, {
            name: __AttributeControlFactory,
            compare: toBe(plat.AttributeControl)
        }, {
            name: __Document,
            compare: toBe(document)
        }, {
            name: __DispatchEventInstance,
            compare: instanceOf(plat.events.DispatchEvent)
        }, {
            name: __ErrorEventStatic,
            compare: toBe(plat.events.ErrorEvent)
        }, {
            name: __EventManagerStatic,
            compare: toBe(plat.events.EventManager)
        }, {
            name: __LifecycleEventStatic,
            compare: toBe(plat.events.LifecycleEvent)
        }, {
            name: __ExceptionStatic,
            compare: toBe(plat.Exception)
        }, {
            name: __Parser,
            compare: instanceOf(plat.expressions.Parser)
        }, {
            name: __Regex,
            compare: instanceOf(plat.expressions.Regex)
        }, {
            name: __Tokenizer,
            compare: instanceOf(plat.expressions.Tokenizer)
        }, {
            name: __ContextManagerStatic,
            compare: toBe(plat.observable.ContextManager)
        }, {
            name: __Compiler,
            compare: instanceOf(plat.processing.Compiler)
        }, {
            name: __CommentManagerFactory,
            compare: toBe(plat.processing.CommentManager)
        }, {
            name: __ElementManagerFactory,
            compare: toBe(plat.processing.ElementManager)
        }, {
            name: __NodeManagerStatic,
            compare: toBe(plat.processing.NodeManager)
        }, {
            name: __TextManagerFactory,
            compare: toBe(plat.processing.TextManager)
        }, {
            name: __CacheFactory,
            compare: toBe(plat.storage.Cache)
        }, {
            name: __ManagerCache,
            compare: toBe(plat.storage.IManagerCache())
        }, {
            name: __TemplateCache,
            compare: instanceOf(plat.storage.TemplateCache)
        }, {
            name: __AttributesInstance,
            compare: instanceOf(plat.ui.Attributes)
        }, {
            name: __BindableTemplatesFactory,
            compare: toBe(plat.ui.BindableTemplates)
        }, {
            name: __Dom,
            compare: instanceOf(plat.ui.Dom)
        }, {
            name: __DomEvents,
            compare: instanceOf(plat.ui.DomEvents)
        }, {
            name: __DomEventsConfig,
            compare: toBe(plat.ui.IDomEventsConfig())
        }, {
            name: __DomEventInstance,
            compare: instanceOf(plat.ui.DomEvent)
        }, {
            name: __ResourcesFactory,
            compare: toBe(plat.ui.Resources)
        }, {
            name: __TemplateControlFactory,
            compare: toBe(plat.ui.TemplateControl)
        }, {
            name: __Utils,
            compare: instanceOf(plat.Utils)
        }, {
            name: __Browser,
            compare: instanceOf(plat.web.Browser)
        }, {
            name: __BrowserConfig,
            compare: toBe(plat.web.IBrowserConfig())
        }, {
            name: __Router,
            compare: instanceOf(plat.routing.Router)
        }, {
            name: __UrlUtilsInstance,
            compare: instanceOf(plat.web.UrlUtils)
        }, {
            name: __Window,
            compare: toBe(window)
        }, {
            name: __LocalStorage,
            compare: instanceOf(plat.storage.LocalStorage)
        }, {
            name: __SessionStorage,
            compare: instanceOf(plat.storage.SessionStorage)
        }];

    describe('Acquire Tests', () => {
        it('should test acquire with single string value', () => {
            var doc = plat.acquire(__Document);

            expect(utils.isDocument(doc)).toBe(true);
        });

        it('should test acquire with single object reference', () => {
            var doc: Document = plat.acquire(plat.Document);

            expect(utils.isDocument(doc)).toBe(true);
        });

        it('should test acquire with array of strings', () => {
            var deps: Array<any> = plat.acquire([__Document, __Window]);

            expect(utils.isDocument(deps[0])).toBe(true);
            expect(utils.isWindow(deps[1])).toBe(true);
        });

        it('should test acquire with array of object references', () => {
            var deps: Array<any> = plat.acquire([plat.Document, plat.Window]);

            expect(utils.isDocument(deps[0])).toBe(true);
            expect(utils.isWindow(deps[1])).toBe(true);
        });

        it('should test acquire with a mixed array', () => {
            var deps: Array<any> = plat.acquire([plat.Document, __Window]);

            expect(utils.isDocument(deps[0])).toBe(true);
            expect(utils.isWindow(deps[1])).toBe(true);
        });

        dependencies.forEach((d) => {
            it('should test acquire with ' + d.name, () => {
                d.compare(plat.acquire(d.name));
            });
        });

        it('should test acquiring all dependencies at once', () => {
            var deps = plat.acquire(utils.pluck('name', dependencies));

            deps.forEach((dep, index) => {
                dependencies[index].compare(dep);
            });
        });
    });
}
