/*
 * Injectables
 */
const __prefix = '$';
const __CONTEXT = 'context';
const __AppStatic = `${__prefix}AppStatic`;
const __App = `${__prefix}App`;
const __Http = `${__prefix}Http`;
const __HttpRequestInstance = `${__prefix}HttpRequestInstance`;
const __HttpConfig = `${__prefix}HttpConfig`;
const __Promise = `${__prefix}Promise`;
const __Compat = `${__prefix}Compat`;
const __ControlFactory = `${__prefix}ControlFactory`;
const __AttributeControlFactory = `${__prefix}AttributeControlFactory`;
const __Document = `${__prefix}Document`;
const __DispatchEventInstance = `${__prefix}DispatchEventInstance`;
const __ErrorEventStatic = `${__prefix}ErrorEventStatic`;
const __EventManagerStatic = `${__prefix}EventManagerStatic`;
const __LifecycleEventStatic = `${__prefix}LifecycleEventStatic`;
const __LifecycleEventInstance = `${__prefix}LifecycleEventInstance`;
const __Log = `${__prefix}Log`;
const __Parser = `${__prefix}Parser`;
const __Regex = `${__prefix}Regex`;
const __Tokenizer = `${__prefix}Tokenizer`;
const __NavigatorInstance = `${__prefix}NavigatorInstance`;
const __ContextManagerStatic = `${__prefix}ContextManagerStatic`;
const __ContextManagerInstance = `${__prefix}ContextManagerInstance`;
const __Compiler = `${__prefix}Compiler`;
const __CommentManagerFactory = `${__prefix}CommentManagerFactory`;
const __CommentManagerInstance = `${__prefix}CommentManagerInstance`;
const __ElementManagerFactory = `${__prefix}ElementManagerFactory`;
const __ElementManagerInstance = `${__prefix}ElementManagerInstance`;
const __NodeManagerStatic = `${__prefix}NodeManagerStatic`;
const __TextManagerFactory = `${__prefix}TextManagerFactory`;
const __TextManagerInstance = `${__prefix}TextManagerInstance`;
const __CacheFactory = `${__prefix}CacheFactory`;
const __ManagerCache = `${__prefix}ManagerCache`;
const __TemplateCache = `${__prefix}TemplateCache`;
const __Animator = `${__prefix}Animator`;
const __AttributesFactory = `${__prefix}AttributesFactory`;
const __AttributesInstance = `${__prefix}AttributesInstance`;
const __BindableTemplatesFactory = `${__prefix}BindableTemplatesFactory`;
const __Dom = `${__prefix}Dom`;
const __DomEvents = `${__prefix}DomEvents`;
const __IDomEventsConfig = `${__prefix}IDomEventsConfig`;
const __DomEventInstance = `${__prefix}DomEventInstance`;
const __ResourcesFactory = `${__prefix}ResourcesFactory`;
const __ResourcesInstance = `${__prefix}ResourcesInstance`;
const __TemplateControlFactory = `${__prefix}TemplateControlFactory`;
const __TemplateControlInstance = `${__prefix}TemplateControlInstance`;
const __Utils = `${__prefix}Utils`;
const __Browser = `${__prefix}Browser`;
const __BrowserConfig = `${__prefix}BrowserConfig`;
const __Router = `${__prefix}Router`;
const __RouterStatic = `${__prefix}RouterStatic`;
const __UrlUtilsInstance = `${__prefix}UrlUtilsInstance`;
const __Window = `${__prefix}Window`;
const __LocalStorage = `${__prefix}LocalStorage`;
const __SessionStorage = `${__prefix}SessionStorage`;
const __Geolocation = `${__prefix}Geolocation`;
const __BaseSegmentFactory = `${__prefix}BaseSegmentFactory`;
const __BaseSegmentInstance = `${__prefix}BaseSegmentInstance`;
const __StaticSegmentInstance = `${__prefix}StaticSegmentInstance`;
const __VariableSegmentInstance = `${__prefix}VariableSegmentInstance`;
const __DynamicSegmentInstance = `${__prefix}DynamicSegmentInstance`;
const __SplatSegmentInstance = `${__prefix}SplatSegmentInstance`;
const __StateStatic = `${__prefix}StateStatic`;
const __StateInstance = `${__prefix}StateInstance`;
const __RouteRecognizerInstance = `${__prefix}RouteRecognizerInstance`;
const __InjectorStatic = `${__prefix}InjectorStatic`;
const __History = `${__prefix}History`;
const __Location = `${__prefix}Location`;

/**
 * Controls
 */
const __Plat = 'plat-';
const __Bind = `${__Plat}bind`;
const __Href = `${__Plat}href`;
const __Src = `${__Plat}src`;
const __KeyDown = `${__Plat}keydown`;
const __KeyPress = `${__Plat}keypress`;
const __KeyUp = `${__Plat}keyup`;
const __CharPress = `${__Plat}charpress`;
const __Name = `${__Plat}name`;
const __Options = `${__Plat}options`;
const __Checked = `${__Plat}checked`;
const __Disabled = `${__Plat}disabled`;
const __Selected = `${__Plat}selected`;
const __ReadOnly = `${__Plat}readonly`;
const __Visible = `${__Plat}visible`;
const __Style = `${__Plat}style`;
const __Tap = `${__Plat}tap`;
const __Blur = `${__Plat}blur`;
const __Change = `${__Plat}change`;
const __Copy = `${__Plat}copy`;
const __Cut = `${__Plat}cut`;
const __Paste = `${__Plat}paste`;
const __DblTap = `${__Plat}dbltap`;
const __Focus = `${__Plat}focus`;
const __Submit = `${__Plat}submit`;
const __TouchStart = `${__Plat}touchstart`;
const __TouchEnd = `${__Plat}touchend`;
const __TouchMove = `${__Plat}touchmove`;
const __TouchCancel = `${__Plat}touchcancel`;
const __Hold = `${__Plat}hold`;
const __Release = `${__Plat}release`;
const __Swipe = `${__Plat}swipe`;
const __SwipeLeft = `${__Plat}swipeleft`;
const __SwipeRight = `${__Plat}swiperight`;
const __SwipeUp = `${__Plat}swipeup`;
const __SwipeDown = `${__Plat}swipedown`;
const __Track = `${__Plat}track`;
const __TrackLeft = `${__Plat}trackleft`;
const __TrackRight = `${__Plat}trackright`;
const __TrackUp = `${__Plat}trackup`;
const __TrackDown = `${__Plat}trackdown`;
const __TrackEnd = `${__Plat}trackend`;
const __React = `${__Plat}react`;
const __Link = `${__Plat}link`;
const __ForEach = `${__Plat}foreach`;
const __Html = `${__Plat}html`;
const __If = `${__Plat}if`;
const __Ignore = `${__Plat}ignore`;
const __Select = `${__Plat}select`;
const __Template = `${__Plat}template`;
const __Routeport = `${__Plat}routeport`;
const __Viewport = `${__Plat}viewport`;
const __Control = `${__Plat}control`;
const __ViewControl = `${__Plat}viewcontrol`;
const __Resources = `${__Plat}resources`;
const __Context = __Plat + __CONTEXT;
const __TemplateContext = `${__Template}-${__CONTEXT}`;
const __Callback = `${__Plat}callback`;
const __AttributePrefix = 'data-';

/**
 * Control Properties
 */
const __TemplateControlCache = '__templateControlCache';
const __Head = 'head';
const __Meta = 'meta';
const __Title = 'title';
const __Description = 'description';
const __Author = 'author';
const __Creator = 'creator';
const __MetaLink = 'link';
const __MetaHref = 'href';
const __MetaName = 'name';
const __MetaProperty = 'property';
const __MetaImage = 'image';
const __MetaVideo = 'video';
const __MetaType = 'type';
const __Rel = 'rel';
const __Url = 'url';
const __Article = 'article:';
const __OpenGraph = 'og:';
const __Twitter = 'twitter:';
const __Content = 'content';

/**
 * Lifecycle events
 */
const __ready = 'ready';
const __suspend = 'suspend';
const __resume = 'resume';
const __online = 'online';
const __offline = 'offline';
const __error = 'error';
const __shutdown = 'shutdown';
const __exiting = 'exiting';
const __beforeLoad = 'beforeLoad';

/**
 * Navigation events
 */
const __beforeNavigate = 'beforeNavigate';
const __navigated = 'navigated';
const __navigating = 'navigating';
const __beforeRouteChange = 'beforeRouteChange';
const __routeChanged = 'routeChanged';
const __urlChanged = 'urlChanged';

/**
 * Device events
 */
const __pause = 'pause';
const __deviceReady = 'deviceReady';
const __backButton = 'backbutton';
const __backClick = 'backclick';
const __backButtonPressed = 'backButtonPressed';

/**
 * Animations
 */
const __Hide = `${__Plat}hide`;
const __Animating = `${__Plat}animating`;
const __SimpleAnimation = `${__Plat}animation`;
const __SimpleTransition = `${__Plat}transition`;
const __Enter = `${__Plat}enter`;
const __Leave = `${__Plat}leave`;
const __Move = `${__Plat}move`;
const __FadeIn = `${__Plat}fadein`;
const __FadeOut = `${__Plat}fadeout`;
const __NavigatingBack = `${__Plat}back-nav`;

/**
 * Custom DOM events
 */
const __event_prefix = '$';
const __tap = `${__event_prefix}tap`;
const __dbltap = `${__event_prefix}dbltap`;
const __touchstart = `${__event_prefix}touchstart`;
const __touchend = `${__event_prefix}touchend`;
const __touchmove = `${__event_prefix}touchmove`;
const __touchcancel = `${__event_prefix}touchcancel`;
const __hold = `${__event_prefix}hold`;
const __release = `${__event_prefix}release`;
const __swipe = `${__event_prefix}swipe`;
const __swipeleft = `${__event_prefix}swipeleft`;
const __swiperight = `${__event_prefix}swiperight`;
const __swipeup = `${__event_prefix}swipeup`;
const __swipedown = `${__event_prefix}swipedown`;
const __track = `${__event_prefix}track`;
const __trackleft = `${__event_prefix}trackleft`;
const __trackright = `${__event_prefix}trackright`;
const __trackup = `${__event_prefix}trackup`;
const __trackdown = `${__event_prefix}trackdown`;
const __trackend = `${__event_prefix}trackend`;

/**
 * Errors
 */
const __errorSuffix = 'Error';
const __platError = `Plat${__errorSuffix}`;
const __parseError = `Parsing${__errorSuffix}`;
const __bindError = `Binding${__errorSuffix}`;
const __compileError = `Compiling${__errorSuffix}`;
const __nameError = `PlatName${__errorSuffix}`;
const __navigationError = `Navigating${__errorSuffix}`;
const __templateError = `Templating${__errorSuffix}`;
const __contextError = `Context${__errorSuffix}`;
const __eventError = `DispatchEvent${__errorSuffix}`;
const __injectableError = `Injectable${__errorSuffix}`;
const __CompatError = `Compatibility${__errorSuffix}`;

/**
 * ForEach aliases
 */
const __forEachAliasOptions = {
    index: 'index',
    even: 'even',
    odd: 'odd',
    first: 'first',
    last: 'last',
};

/**
 * Routing
 */
const __BASE_SEGMENT_TYPE = 'base';
const __VARIABLE_SEGMENT_TYPE = 'variable';
const __STATIC_SEGMENT_TYPE = 'static';
const __SPLAT_SEGMENT_TYPE = 'splat';
const __DYNAMIC_SEGMENT_TYPE = 'dynamic';

/**
 * Constants
 */
const __CONTEXT_CHANGED_PRIORITY = 1000;
const __startSymbol = '{{';
const __endSymbol = '}}';
const __STATIC = 'static';
const __SINGLETON = 'singleton';
const __INSTANCE = 'instance';
const __FACTORY = 'factory';
const __CLASS = 'class';
const __CSS = 'css';
const __COMPILED = '-compiled';
const __BOUND_PREFIX = '-@';
const __INIT_SUFFIX = '-init';
const __START_NODE = ': start node';
const __END_NODE = ': end node';
const __POPSTATE = 'popstate';
const __HASHCHANGE = 'hashchange';
const __WRAPPED_INJECTOR = 'wrapped';
const __JSONP_CALLBACK = 'plat_callback';
const __JS = 'js';
const __NOOP_INJECTOR = 'noop';
const __APP = '__app__';
const __RESOURCE = 'resource';
const __RESOURCES = `${__RESOURCE}s`;
const __ALIAS = 'alias';
const __ALIASES = `${__ALIAS}es`;
const __OBSERVABLE_RESOURCE = 'observable';
const __INJECTABLE_RESOURCE = 'injectable';
const __OBJECT_RESOURCE = 'object';
const __FUNCTION_RESOURCE = 'function';
const __LITERAL_RESOURCE = 'literal';
const __ROOT_RESOURCE = 'root';
const __ROOT_CONTEXT_RESOURCE = 'rootContext';
const __CONTROL_RESOURCE = 'control';
const __SELF = '_self';
const __CONTEXT_RESOURCE = __CONTEXT;

interface IInternal {
    __injectable__type?: string;
}
