
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
            'framework/platypus.js',
            'tests/**/*.js'
        ],

        exclude: [
            '**/*node_modules*'
        ],

        preprocessors: {
            'framework/platypus.js': 'coverage'
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
        browsers: ['IE11'],// 'IE10', 'IE9'],

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

        reporters: ['progress', 'coverage'],
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
