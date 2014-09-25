function stripDocs(data) {
    var linkRegex = /\{@link (.*?)[|](.*?)\}/g;

    data = data.replace(linkRegex, function(value, qualifiedPath, linkValue, index, content) {
        return linkValue;
    });

    var lines = data.split(/\r\n|\n/g),
        out = [];

    lines.forEach(function (line) {       
        if(line.trim() === '*') {
            return;
        } else if (line.indexOf('* @') === -1) {
            out.push(line);
        } else if (line.indexOf('@param') > -1) {
            out.push(line);
        }
    });

    return out.join('\r\n');
}

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
                    done(stripDocs(data));
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
                    done(stripDocs(data) + 'export = plat;\r\n');
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
