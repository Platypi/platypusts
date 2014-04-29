var plat;
(function (plat) {
    /**
    * Class for every app. This class contains hooks for Application Lifecycle Events
    * as well as error handling.
    */
    var App = (function () {
        /**
        * Class for every app. This class contains hooks for Application Lifecycle Management (ALM)
        * as well as error handling and navigation events.
        */
        function App() {
            var ContextManager = plat.acquire('$ContextManagerStatic');
            ContextManager.defineGetter(this, 'uid', uniqueId('plat_'));
        }
        /**
        * A static method for initiating the app startup.
        */
        App.start = function () {
            var $compat = App.$compat;

            if (!$compat.isCompatible) {
                var $ExceptionStatic = App.$ExceptionStatic;

                $ExceptionStatic.fatal('PlatypusTS only supports modern browsers where ' + 'Object.defineProperty is defined', $ExceptionStatic.COMPAT);
                return;
            }

            var $EventManagerStatic = App.$EventManagerStatic;

            $EventManagerStatic.dispose('__app__');
            $EventManagerStatic.on('__app__', 'ready', App.__ready);
            $EventManagerStatic.on('__app__', 'shutdown', App.__shutdown);
            $EventManagerStatic.initialize();
        };

        /**
        * A static methods called upon app registration. Primarily used
        * to initiate a ready state in the case that amd is being used.
        */
        App.registerApp = function (app) {
            if (!isNull(App.app) && isString(App.app.uid)) {
                App.$EventManagerStatic.dispose(App.app.uid);
            }

            App.app = app;
            var $compat = App.$compat;

            if ($compat.amd) {
                var $LifecycleEventStatic = App.$LifecycleEventStatic, dispatch = $LifecycleEventStatic.dispatch;

                postpone(function ready() {
                    dispatch('ready', $LifecycleEventStatic);
                });
            }
        };

        /**
        * Kicks off compilation of the DOM from the specified node. If no node is specified,
        * the default start node is document.body.
        *
        * @param node The node at which DOM compilation begins.
        */
        App.load = function (node) {
            var $LifecycleEventStatic = App.$LifecycleEventStatic, compiler = App.$compiler, $document = App.$document;

            $LifecycleEventStatic.dispatch('beforeLoad', App);

            if (isNull(node)) {
                compiler.compile($document.body);
                return;
            }

            compiler.compile(node);
        };

        /**
        * A static method called when the application is ready. It calls the app instance's
        * ready function as well as checks for the presence of a module loader. If one exists,
        * loading the DOM falls back to the app developer. If it doesn't, the DOM is loaded from
        * document.body.
        */
        App.__ready = function (ev) {
            plat.dependency.Injector.initialize();

            if (!isNull(App.app)) {
                App.__registerAppEvents(ev);
            }

            var compat = App.$compat;

            if (!compat.amd) {
                App.load();
            }
        };

        App.__shutdown = function () {
            var app = navigator.app;

            if (!isNull(app) && isFunction(app.exitApp)) {
                app.exitApp();
            }
        };

        App.__registerAppEvents = function (ev) {
            var app = App.app;

            if (isFunction(app.inject)) {
                App.app = app = app.inject();
            }

            app.on('suspend', app.suspend);
            app.on('resume', app.resume);
            app.on('online', app.online);
            app.on('offline', app.offline);
            app.on('error', app.error);

            if (isFunction(app.ready)) {
                app.ready(ev);
            }
        };

        /**
        * Event fired when the app is suspended.
        *
        * @param ev The ILifecycleEvent object.
        */
        App.prototype.suspend = function (ev) {
        };

        /**
        * Event fired when the app resumes from the suspended state.
        *
        * @param ev The ILifecycleEvent object.
        */
        App.prototype.resume = function (ev) {
        };

        /**
        * Event fired when an internal error occures.
        *
        * @param ev The IErrorEvent object.
        */
        App.prototype.error = function (ev) {
        };

        /**
        * Event fired when the app is ready.
        *
        * @param ev The ILifecycleEvent object.
        */
        App.prototype.ready = function (ev) {
        };

        /**
        * Event fired when the app regains connectivity and is now in an online state.
        *
        * @param ev The ILifecycleEvent object.
        */
        App.prototype.online = function (ev) {
        };

        /**
        * Event fired when the app loses connectivity and is now in an offline state.
        *
        * @param ev The ILifecycleEvent object.
        */
        App.prototype.offline = function (ev) {
        };

        /**
        * Creates a new DispatchEvent and propagates it to all listeners based on the
        * events.EventManager.DIRECT method. Propagation will always start with the sender,
        * so the sender can both produce and consume the same event.
        *
        * @param name The name of the event to send, cooincides with the name used in the
        * app.on() method.
        * @param ...args Any number of arguments to send to all the listeners.
        */
        App.prototype.dispatchEvent = function (name) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            App.$EventManagerStatic.dispatch(name, this, App.$EventManagerStatic.direction.DIRECT, args);
        };

        /**
        * Registers a listener for a DispatchEvent. The listener will be called when a DispatchEvent is
        * propagating over the app. Any number of listeners can exist for a single event name.
        *
        * @param name The name of the event, cooinciding with the DispatchEvent name.
        * @param listener The method called when the DispatchEvent is fired.
        */
        App.prototype.on = function (name, listener) {
            return App.$EventManagerStatic.on(this.uid, name, listener, this);
        };

        /**
        * Kicks off compilation of the DOM from the specified node. If no node is specified,
        * the default start node is document.body. This method should be called from the app when
        * using module loaders. If a module loader is in use, the app will delay loading until
        * this method is called.
        *
        * @param node The node where at which DOM compilation begins.
        */
        App.prototype.load = function (node) {
            App.load(node);
        };
        return App;
    })();
    plat.App = App;

    

    /**
    * The Type for referencing the '$AppStatic' injectable as a dependency.
    */
    function AppStatic($compat, $ExceptionStatic, $EventManagerStatic, $document, $compiler, $LifecycleEventStatic) {
        App.$compat = $compat;
        App.$ExceptionStatic = $ExceptionStatic;
        App.$EventManagerStatic = $EventManagerStatic;
        App.$document = $document;
        App.$compiler = $compiler;
        App.$LifecycleEventStatic = $LifecycleEventStatic;
        return App;
    }
    plat.AppStatic = AppStatic;

    plat.register.injectable('$AppStatic', AppStatic, [
        '$compat',
        '$ExceptionStatic',
        '$EventManagerStatic',
        '$document',
        '$compiler',
        '$LifecycleEventStatic'
    ], plat.register.injectableType.STATIC);

    /**
    * The Type for referencing the '$app' injectable as a dependency.
    */
    function AppInstance($AppStatic) {
        return $AppStatic.app;
    }
    plat.AppInstance = AppInstance;

    plat.register.injectable('$app', AppInstance, [
        '$AppStatic'
    ], plat.register.injectableType.MULTI);

    

    

    
})(plat || (plat = {}));
//# sourceMappingURL=app.js.map
