var _ = require('lodash');
var path = require('path');

function loadConfig(path, config, grunt) {
    var glob = require('glob'),
        obj = {},
        key;

    if(path[path.length - 1] !== '/') {
        path += '/';
    }

    glob.sync('*', {cwd: path}).forEach(function(option) {
        key = option.replace(/\.js$/,'');
        obj[key] = require(path + option)(config, grunt);
    });

    return obj;
};

var config = {
    license: './license.txt',
    version: '<%= pkg.version %>',
    name: 'platypus',
    folders: {
        src: './src/',
        examples: './examples/',
        test: './test/',
        dist: './dist'
    },
    build: {
        dest: {
            ts: './dist/platypus.ts',
            dts: './dist/platypus.d.ts',
            js: './dist/platypus.js',
            min: './dist/platypus.min.js'
        }
    }
};

module.exports = function load(grunt) {
    grunt.initConfig(_.extend({
        pkg: grunt.file.readJSON('package.json')
    }, loadConfig('./build/options', config, grunt)));

    require('load-grunt-tasks')(grunt);

    // By default, run all tests.
    grunt.registerTask('default', ['clean:before', 'bundle', 'copy:main', 'ts:main', 'uglify', 'copy:typings', 'clean:after']);

    grunt.registerTask('docs', ['clean:after', 'bundle']);
    grunt.registerTask('test', ['karma']);
};
