/// <reference path="../../typings/tsd.d.ts" />

module tests.expressions.acquire {
    var utils: plat.IUtils = plat.acquire(plat.IUtils);

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
        __Navigator = '$Navigator',
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
        __ViewControlFactory = '$ViewControlFactory',
        __Utils = '$Utils',
        __Browser = '$Browser',
        __BrowserConfig = '$BrowserConfig',
        __Router = '$Router',
        __UrlUtilsInstance = '$UrlUtilsInstance',
        __Window = '$Window',
        __LocalStorage = '$LocalStorage',
        __SessionStorage = '$SessionStorage',
        __Geolocation = '$Geolocation';

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
    });
}