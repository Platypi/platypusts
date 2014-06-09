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

    var __AppStatic = '$AppStatic',
        __App = '$App',
        __Http = '$Http',
        __HttpConfig = '$HttpConfig',
        __Promise = '$Promise',
        __Compat = '$Compat',
        __ControlFactory = '$ControlFactory',
        __AttributeControlFactory = '$AttributeControlFactory',
        __Document = '$Document',
        __DispatchEventInstance = '$DispatchEventInstance',
        __ErrorEventStatic = '$ErrorEventStatic',
        __EventManagerStatic = '$EventManagerStatic',
        __LifecycleEventStatic = '$LifecycleEventStatic',
        __NavigationEventStatic = '$NavigationEventStatic',
        __ExceptionStatic = '$ExceptionStatic',
        __Parser = '$Parser',
        __Regex = '$Regex',
        __Tokenizer = '$Tokenizer',
        __NavigatorInstance = '$NavigatorInstance',
        __RoutingNavigator = '$RoutingNavigator',
        __ContextManagerStatic = '$ContextManagerStatic',
        __Compiler = '$Compiler',
        __CommentManagerFactory = '$CommentManagerFactory',
        __ElementManagerFactory = '$ElementManagerFactory',
        __NodeManagerStatic = '$NodeManagerStatic',
        __TextManagerFactory = '$TextManagerFactory',
        __CacheFactory = '$CacheFactory',
        __ManagerCache = '$ManagerCache',
        __TemplateCache = '$TemplateCache',
        __AttributesInstance = '$AttributesInstance',
        __BindableTemplatesFactory = '$BindableTemplatesFactory',
        __Dom = '$Dom',
        __DomEvents = '$DomEvents',
        __DomEventsConfig = '$DomEventsConfig',
        __DomEventInstance = '$DomEventInstance',
        __ResourcesFactory = '$ResourcesFactory',
        __TemplateControlFactory = '$TemplateControlFactory',
        __BaseViewControlFactory = '$BaseViewControlFactory',
        __Utils = '$Utils',
        __Browser = '$Browser',
        __BrowserConfig = '$BrowserConfig',
        __Router = '$Router',
        __UrlUtilsInstance = '$UrlUtilsInstance',
        __Window = '$Window',
        __LocalStorage = '$LocalStorage',
        __SessionStorage = '$SessionStorage';

    var dependencies = [{
            name: __AppStatic,
            compare: toBe(plat.App)
        }, {
            name: __App,
            compare: toEqual({})
        }, {
            name: __Http,
            compare: instanceOf(plat.async.Http)
        }, {
            name: __HttpConfig,
            compare: toBe(plat.async.IHttpConfig())
        }, {
            name: __Promise,
            compare: toBe(plat.async.Promise)
        }, {
            name: __Compat,
            compare: instanceOf(plat.Compat)
        }, {
            name: __ControlFactory,
            compare: toBe(plat.Control)
        }, {
            name: __AttributeControlFactory,
            compare: toBe(plat.controls.AttributeControl)
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
            name: __NavigationEventStatic,
            compare: toBe(plat.events.NavigationEvent)
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
            name: __NavigatorInstance,
            compare: instanceOf(plat.navigation.Navigator)
        }, {
            name: __RoutingNavigator,
            compare: instanceOf(plat.navigation.RoutingNavigator)
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
            name: __BaseViewControlFactory,
            compare: toBe(plat.ui.BaseViewControl)
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
            compare: instanceOf(plat.web.Router)
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
            var doc = plat.acquire('$Document');

            expect(utils.isDocument(doc)).toBe(true);
        });

        it('should test acquire with single object reference', () => {
            var doc: Document = plat.acquire(plat.Document);

            expect(utils.isDocument(doc)).toBe(true);
        });

        it('should test acquire with array of strings', () => {
            var deps: Array<any> = plat.acquire(['$Document', '$Window']);

            expect(utils.isDocument(deps[0])).toBe(true);
            expect(utils.isWindow(deps[1])).toBe(true);
        });

        it('should test acquire with array of object references', () => {
            var deps: Array<any> = plat.acquire([plat.Document, plat.Window]);

            expect(utils.isDocument(deps[0])).toBe(true);
            expect(utils.isWindow(deps[1])).toBe(true);
        });

        it('should test acquire with a mixed array', () => {
            var deps: Array<any> = plat.acquire([plat.Document, '$Window']);

            expect(utils.isDocument(deps[0])).toBe(true);
            expect(utils.isWindow(deps[1])).toBe(true);
        });

        dependencies.forEach((d) => {
            it('should test acquire with ' + d.name, () => {
                d.compare(plat.acquire(d.name));
            });
        });

        it('should test acquiring all dependencies at once', () => {
            var deps = plat.acquire(utils.pluck(dependencies, 'name'));

            deps.forEach((dep, index) => {
                dependencies[index].compare(dep);
            });
        });
    });
}
