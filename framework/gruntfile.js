module.exports = exports = function load(grunt) {
    var config = {
        bundle: {
            main: {
                rootModule: 'plat',
                license: './license.txt',
                version: '<%= pkg.version %>',
                src: './app/index.html',
                dest: [
                    './platypus.ts'
                ],
                disableLint: true,
                preSave: function (data, done) {
                    done(data);
                }
            },
            require: {
                rootModule: 'plat',
                license: './license.txt',
                version: '<%= pkg.version %>',
                src: './app/index.html',
                dest: [
                    './platypus.ts'
                ],
                disableLint: true,
                preSave: function (data, done) {
                    done(data + 'export = plat;\n');
                }
            }
        },
        pkg: grunt.file.readJSON('package.json')
    };
    
    grunt.initConfig(config);
    grunt.loadNpmTasks('grunt-ts-bundle');
    // By default, run all tests.
    grunt.registerTask('default', ['bundle:main']);
    grunt.registerTask('main', ['bundle:main']);
    grunt.registerTask('require', ['bundle:require']);
};
