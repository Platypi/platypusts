
function cfg(config: any) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        plugins: [
            'karma-jasmine',
            'karma-coverage',
            'karma-ie-launcher',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
        ],
        files: [
            '../framework/references/*.js',
            '../framework/utils/utilsglobal.js',
            '../framework/ui/dom/domglobal.js',
            '../framework/register/*.js',
            '../framework/dependency/injector/*.js',
            '../framework/acquire/*.js',
            '../framework/exception/*.js',
            '../framework/compat/*.js',
            '../framework/utils/utils.js',
            '../framework/window/window.js',
            '../framework/document/document.js',
            '../framework/expressions/regex/*.js',
            '../framework/web/browser/*.js',
            '../framework/web/urlutils/*.js',
            '../framework/web/router/*.js',
            '../framework/async/promise.js',
            '../framework/async/ajax.js',
            '../framework/storage/cache/cache.js',
            '../framework/storage/cache/templatecache.js',
            '../framework/storage/basestorage.js',
            '../framework/storage/localstorage.js',
            '../framework/storage/sessionstorage.js',
            '../framework/expressions/operators/operators.js',
            '../framework/expressions/tokenizer/tokenizer.js',
            '../framework/expressions/parser/parser.js',
            '../framework/observable/contextmanager/contextmanager.js',
            '../framework/events/dispatchevent.js',
            '../framework/events/lifecycleevent.js',
            '../framework/events/eventmanager.js',
            '../framework/events/navigationevent.js',
            '../framework/events/errorevent.js',
            '../framework/control/control.js',
            '../framework/attributecontrol/attributecontrol.js',
            '../framework/ui/templatecontrol/templatecontrol.js',
            '../framework/ui/viewcontrol/baseviewcontrol.js',
            '../framework/ui/viewcontrol/viewcontrol.js',
            '../framework/ui/viewcontrol/webviewcontrol.js',
            '../framework/ui/dom/dom.js',
            '../framework/ui/bindabletemplates/bindabletemplates.js',
            '../framework/ui/attributes/attributes.js',
            '../framework/ui/resources/resources.js',
            '../framework/ui/domevents/domevents.js',
            '../framework/processing/compiler/compiler.js',
            '../framework/processing/nodemanager/nodemanager.js',
            '../framework/processing/nodemanager/elementmanager.js',
            '../framework/processing/nodemanager/textmanager.js',
            '../framework/processing/nodemanager/commentmanager.js',
            '../framework/navigation/basenavigator.js',
            '../framework/navigation/navigator.js',
            '../framework/navigation/routingnavigator.js',
            '../framework/controls/name/namecontrol.js',
            '../framework/controls/simpleevent/simpleevent.js',
            '../framework/controls/keycodeevent/keycodeevent.js',
            '../framework/controls/setattributecontrol/setattributecontrol.js',
            '../framework/controls/elementpropertycontrol/elementpropertycontrol.js',
            '../framework/controls/bind/bind.js',
            '../framework/controls/observableattributecontrol/observableattributecontrol.js',
            '../framework/ui/controls/viewport/baseport.js',
            '../framework/ui/controls/viewport/viewport.js',
            '../framework/ui/controls/viewport/routeport.js',
            '../framework/ui/controls/template/template.js',
            '../framework/ui/controls/ignore/ignore.js',
            '../framework/ui/controls/foreach/foreach.js',
            '../framework/ui/controls/html/html.js',
            '../framework/ui/controls/select/select.js',
            '../framework/ui/controls/if/if.js',
            '../framework/ui/controls/anchor/anchor.js',
            '../framework/app/app.js',
            'tests/**/*.js'
        ],

        exclude: [
            '**/*node_modules*'
        ],

        preprocessors: {
            '../framework/**/*.js': 'coverage'
        },

        // web server port
        // CLI --port 9876
        port: 9876,

        // cli runner port
        // CLI --runner-port 9100
        runnerPort: 9100,

        // enable / disable colors in the output (reporters and logs)
        // CLI --colors --no-colors
        colors: true,

        // enable / disable watching file and executing tests whenever any file changes
        // CLI --auto-watch --no-auto-watch
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        // CLI --browsers Chrome,Firefox,Safari
        browsers: ['IE11'],// 'IE10', 'IE9', 'Chrome'],

        customLaunchers: {
            IE11: {
                base: 'IE',
                flags: ['-private']
            },
            IE10: {
                base: 'IE',
                'x-ua-compatible': 'IE=EmulateIE10',
                flags: ['-private']
            },
            IE9: {
                base: 'IE',
                'x-ua-compatible': 'IE=EmulateIE9',
                flags: ['-private']
            }
        },

        // If browser does not capture in given timeout [ms], kill it
        // CLI --capture-timeout 5000
        captureTimeout: 5000,

        // Auto run tests on start (when browsers are captured) and exit
        // CLI --single-run --no-single-run
        singleRun: false,

        // report which specs are slower than 500ms
        // CLI --report-slower-than 500
        reportSlowerThan: 500,

        reporters: ['progress', 'html', 'coverage'],
        htmlReporter: {
            outputDir: 'reporter'
        },
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        }
    });
}
export = cfg;
