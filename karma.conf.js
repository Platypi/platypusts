function cfg(config) {
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
            './src/references/*.js',
            './src/utils/utilsglobal.js',
            './src/ui/dom/domglobal.js',
            './src/register/*.js',
            './src/dependency/injector/*.js',
            './src/acquire/*.js',
            './src/debug/*.js',
            './src/exception/*.js',
            './src/compat/*.js',
            './src/utils/utils.js',
            './src/window/window.js',
            './src/document/document.js',
            './src/expressions/regex/*.js',
            './src/web/location/*.js',
            './src/web/browser/*.js',
            './src/web/urlutils/*.js',
            './src/async/promise.js',
            './src/async/ajax.js',
            './src/storage/cache/cache.js',
            './src/storage/cache/templatecache.js',
            './src/storage/basestorage.js',
            './src/storage/localstorage.js',
            './src/storage/sessionstorage.js',
            './src/expressions/operators/operators.js',
            './src/expressions/tokenizer/tokenizer.js',
            './src/expressions/parser/parser.js',
            './src/observable/contextmanager/contextmanager.js',
            './src/events/dispatchevent.js',
            './src/events/lifecycleevent.js',
            './src/events/eventmanager.js',
            './src/events/errorevent.js',
            './src/control/control.js',
            './src/attributecontrol/attributecontrol.js',
            './src/ui/templatecontrol/templatecontrol.js',
            './src/ui/viewcontrol/viewcontrol.js',
            './src/ui/dom/dom.js',
            './src/ui/bindabletemplates/bindabletemplates.js',
            './src/ui/attributes/attributes.js',
            './src/ui/resources/resources.js',
            './src/ui/domevents/domevents.js',
            './src/processing/compiler/compiler.js',
            './src/processing/nodemanager/nodemanager.js',
            './src/processing/nodemanager/elementmanager.js',
            './src/processing/nodemanager/textmanager.js',
            './src/processing/nodemanager/commentmanager.js',
            './src/processing/nodemanager/attributemanager.js',
            './src/routing/history/history.js',
            './src/routing/navigator/navigator.js',
            './src/routing/segments/segments.js',
            './src/routing/state/state.js',
            './src/routing/routerecognizer/routerecognizer.js',
            './src/routing/router/router.js',
            './src/controls/name/namecontrol.js',
            './src/controls/simpleevent/simpleevent.js',
            './src/controls/keycodeevent/keycodeevent.js',
            './src/controls/setattributecontrol/setattributecontrol.js',
            './src/controls/elementpropertycontrol/elementpropertycontrol.js',
            './src/controls/bind/bind.js',
            './src/controls/observableattributecontrol/observableattributecontrol.js',
            './src/ui/bindcontrol/bindcontrol.js',
            './src/ui/controls/viewport/viewport.js',
            './src/ui/controls/template/template.js',
            './src/ui/controls/ignore/ignore.js',
            './src/ui/controls/foreach/foreach.js',
            './src/ui/controls/html/html.js',
            './src/ui/controls/select/select.js',
            './src/ui/controls/if/if.js',
            './src/app/app.js',
            './test/unit/**/*.js'
        ],
        exclude: [
            '**/*node_modules*'
        ],
        preprocessors: {
            './src/**/*.js': 'coverage'
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
        browsers: ['Chrome'],
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
        singleRun: true,
        // report which specs are slower than 500ms
        // CLI --report-slower-than 500
        reportSlowerThan: 500,
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            type: 'html',
            dir: 'test/coverage/'
        }
    });
}
module.exports = cfg;
