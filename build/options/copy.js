function stripDocs(data) {
    var linkRegex = /\{@link (.*?)[|](.*?)\}/g,
        out = [],
        onDescription = false,
        onParam = false,
        first = false;

    data.forEach(function (line) {
        line = line.replace(linkRegex, function(value, qualifiedPath, linkValue, index, content) {
            return linkValue;
        });

        if(line.trim().indexOf('/// <reference') > -1) {
            return;
        }

        if (line.trim().indexOf('* @') > -1) {
            first = true;
        }

        if (!first) {
            out.push(line);
            return;
        }

        if (line.trim() === '*') {
            onDescription = onParam = false;
        } else if (line.indexOf('@description') > -1) {
            onDescription = true;
        } else if (((onDescription || onParam) && line.indexOf('* @') === -1) || line.trim().indexOf('*/') > -1 || line.trim().indexOf('/*') > -1 || line.trim()[0] !== '*') {
            if (line[line.length - 1] !== ' ') {
                line += ' ';
            }

            out.push(line);
        } else if (line.indexOf('@param') > -1) {
            if (line[line.length - 1] !== ' ') {
                line += ' ';
            }

            onParam = true;
            out.push(line);
        }

        if (line.trim().indexOf('*/') > -1) {
            onDescription = onParam = false;
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

module.exports = function(config, grunt) {
    console.log([
                { src: 'distreadme.md', dest: config.folders.dist + 'README.md' },
                { src: 'LICENSE', dest: config.folders.dist + 'LICENSE' },
                { src: 'package.json', dest: }
            ]);
	return {
		main: {
            options: {
                process: function (data) {
                    return stripDocs(useStrict(data.split(/\r\n|\n/)))
                        .concat(['export = plat;', ''])
                        .join('\r\n');
                }
            },
            src: config.build.dest.ts,
            dest: config.build.dest.ts
        },
        typings: {
            options: {
                process: function (data) {
                    data = normalizeBlockComments(data.split(/\r\n|\n/));
                    return addNodeTypeDefinition(data.split(/\r\n|\n/))
                        .join('\r\n');
                }
            },
            src: config.build.dest.dts,
            dest: config.build.dest.dts
        }
	};
};
