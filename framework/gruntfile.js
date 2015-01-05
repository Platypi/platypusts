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
                    'platypus.ts'
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
            bower: {
                options: {
                    process: function (data) {
                        return normalizeBlockComments(data.split(/\r\n|\n/));
                    }
                },
                src: 'dist/platypus.d.ts',
                dest: 'dist/platypus.d.ts'
            }, 
            node: {
                options: {
                    process: function (data) {
                        return addNodeTypeDefinition(data.split(/\r\n|\n/)).join('\r\n');
                    }
                },
                src: 'dist/platypus.d.ts',
                dest: 'dist/platypus-node.d.ts'
            }
        },
        ts: {
            options: {
                target: 'es5',
                module: 'commonjs',
                sourceMap: true,
                removeComments: false
            },
            main: {
                options: {
                    fast: 'never',
                    declaration: true
                },
                src: [
                    'dist/platypus.ts'
                ]
            },
            all: {
                options: {
                    fast: 'always'
                },
                src: [
                    'framework/**/*.ts',
                    'app/**/*.ts'
                ]
            }
        },
        uglify: {
            main: {
                options: {
                    sourceMapIn: 'dist/platypus.js.map',
                    sourceMap: 'dist/platypus.js.map'
                },
                files: {
                    'dist/platypus.js': [
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
    grunt.loadNpmTasks('grunt-ts-bundle');
    grunt.loadNpmTasks('grunt-ts');

    grunt.registerTask('docs', ['clean:after', 'bundle'])

    // By default, run all tests.
    grunt.registerTask('default', ['clean', 'bundle', 'copy:main', 'ts:main', 'uglify', 'copy:bower', 'copy:node', 'clean:after']);

    grunt.registerTask('start', ['ts:all', 'connect'])
};
