function stripDocs(data) {
    var linkRegex = /\{@link (.*?)[|](.*?)\}/g,
        out = [];

    data.forEach(function (line) {
        line = line.replace(linkRegex, function(value, qualifiedPath, linkValue, index, content) {
            return linkValue;
        });

        if(line.trim() === '*') {
            return;
        } else if (line.indexOf('* @') === -1) {
            out.push(line);
        } else if (line.indexOf('@param') > -1) {
            out.push(line);
        }
    });

    return out;
}

function useStrict(data) {
    var plat;

    data = data
        .map(function (line, index, lines) {
            var trim = line.trim();
            if (trim === '\'use strict\';') {
                return '';
            } else if (trim.indexOf('module plat ') > -1) {
                plat = index+1;
            }

            return line;
        });

    data.splice(plat, 0, '    \'use strict;\'');
    return data;
}

function normalizeBlockComments(data) {
    return data
        .map(function (line, index, lines) {
            if (line.trim()[0] === '*') {
                return ' ' + line;
            }

            return line;
        })
        .join('\r\n');

}

function addNodeTypeDefinition(data) {
    return data
        .slice(0, -2)
        .concat([
            '',
            'declare module \'platypus\' {',
            '    export = plat;',
            '}',
            ''
        ]);
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
                disableLint: true
            }
        },
        clean: {
            before: {
                force: true,
                src: [
                    'dist/'
                ]
            },
            after: {
                force: true,
                src: [
                    'platypus.ts',
                    'dist/platypus.ts'
                ]
            }
        },
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './',
                    keepalive: true
                }
            }
        },
        copy: {
            main: {
                options: {
                    process: function (data) {
                        return stripDocs(useStrict(data.split(/\r\n|\n/)))
                            .concat(['export = plat;', ''])
                            .join('\r\n');
                    }
                },
                src: 'platypus.ts',
                dest: 'dist/platypus.ts'
            },
            typings: {
                options: {
                    process: function (data) {
                        data = normalizeBlockComments(data.split(/\r\n|\n/));
                        return addNodeTypeDefinition(data.split(/\r\n|\n/))
                            .join('\r\n')
                    }
                },
                src: 'dist/platypus.d.ts',
                dest: 'dist/platypus.d.ts'
            },
            test: {
                src: 'dist/platypus.d.ts',
                dest: 'testing/framework/platypus.d.ts'
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        ts: {
            options: {
                target: 'es5',
                module: 'commonjs',
                sourceMap: true,
                removeComments: false,
                fast: 'always'
            },
            main: {
                options: {
                    fast: 'never',
                    sourceMap: false,
                    declaration: true
                },
                src: [
                    'dist/platypus.ts'
                ]
            },
            all: {
                src: [
                    'framework/**/*.ts',
                    'app/**/*.ts',
                    //'testing/**/*.ts',
                    //'!testing/framework/**',
                    '!node_modules/**'
                ]
            },
            test: {
                options: {
                    sourceMap: false
                },
                src: [
                    'testing/**/*.ts'
                ]
            }
        },
        tsd: {
            refresh: {
                options: {
                    // execute a command
                    command: 'reinstall',

                    //optional: always get from HEAD
                    latest: true,

                    // specify config file
                    config: './tsd.test.json'
                }
            }
        },
        tslint: {
            options: {
                configuration: grunt.file.readJSON('tslint.json')
            },
            files: {
                src: ['framework/controls/**/*.ts']
            }
        },
        uglify: {
            main: {
                options: {
                    screwIE8: true
                },
                files: {
                    'dist/platypus.min.js': [
                        'dist/platypus.js'
                    ]
                }
            }
        },
        pkg: grunt.file.readJSON('package.json')
    };
    
    grunt.initConfig(config);
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ts-bundle');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-tsd');
    grunt.loadNpmTasks('grunt-tslint');


    // By default, run all tests.
    grunt.registerTask('default', ['clean', 'bundle', 'copy:main', 'ts:main', 'uglify', 'copy:typings', 'copy:test', 'clean:after']);

    grunt.registerTask('install', ['tsd']);
    grunt.registerTask('docs', ['clean:after', 'bundle']);
    grunt.registerTask('test', ['ts:test', 'karma']);
    grunt.registerTask('app', ['ts:all', 'connect']);
    grunt.registerTask('compile', ['ts:all']);
};
