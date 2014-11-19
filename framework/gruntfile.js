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
        copy: {
            main: {
                options: {
                    process: function (data) {
                        return stripDocs(data) + 'export = plat;\r\n';
                    }
                },
                src: 'platypus.ts',
                dest: 'dist/platypus.ts'
            },
            bower: {
                options: {
                    process: function (data) {
                        return data
                            .split(/\r\n|\n/)
                            .map(function (line, index, lines) {
                                if (line.trim()[0] === '*') {
                                    return ' ' + line;
                                }

                                return line;
                            }).join('\r\n');
                    }
                },
                src: 'dist/platypus.d.ts',
                dest: 'dist/platypus.d.ts'
            }, 
            node: {
                options: {
                    process: function (data) {
                        return data
                            .split(/\r\n|\n/)
                            .slice(0, -2)
                            .concat([
                                '',
                                'declare module \'platypus\' {',
                                '    export = plat;',
                                '}',
                                ''
                            ])
                            .join('\r\n');
                    }
                },
                src: 'dist/platypus.d.ts',
                dest: 'dist/platypus-node.d.ts'
            }
        },
        ts: {
            main: {
                options: {
                    target: 'es5',
                    module: 'commonjs',
                    sourceMap: true,
                    declaration: true,
                    removeComments: false
                },
                src: [
                    'dist/platypus.ts'
                ],
                out: 'dist/platypus.js'
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
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ts-bundle');
    grunt.loadNpmTasks('grunt-ts');

    grunt.registerTask('docs', ['clean:after', 'bundle'])

    // By default, run all tests.
    grunt.registerTask('default', ['clean', 'bundle', 'copy:main', 'ts', 'uglify', 'copy:bower', 'copy:node', 'clean:after']);
};
