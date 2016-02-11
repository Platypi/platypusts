function stripDocs(data) {
    var linkRegex = /\{@link (.*?)[|](.*?)\}/g,
        out = [],
        onDescription = false,
        onParam = false,
        first = false;

    data.forEach(function (line) {
        line = line.replace(linkRegex, function (value, qualifiedPath, linkValue, index, content) {
            return linkValue;
        });

        if (line.trim().indexOf('/// <reference') > -1) {
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
                plat = index + 1;
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

function localize(data) {
    var plat, trim;

    data.some(function (line, index) {
        trim = line.trim();

        if (trim.indexOf('module plat ') > -1) {
            plat = index;
        }
    });

    data.splice(plat, 2);

    for (var i = data.length - 1; i >= 0; --i) {
        trim = data[i].trim();
        if (trim.indexOf('}') > -1) {
            plat = i;
            break;
        }
    }

    data.splice(plat, 4);

    data = data.map(function (line, index) {
        if (line.indexOf('!isUndefined(window)') > -1) {
            plat = index;
        }

        return line.replace(/([^_])plat\./g, '$1');
    });

    data.splice(plat, 9);

    return data;
}

module.exports = function (config, grunt) {
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
        local: {
            options: {
                process: function (data) {
                    return localize(data.split(/\r\n|\n/))
                        .join('\r\n');
                }
            },
            src: config.build.dest.ts,
            dest: config.build.dest.tslocal
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
        },
        typingslocal: {
            options: {
                process: function (data) {
                    return normalizeBlockComments(data.split(/\r\n|\n/));
                }
            },
            src: config.build.dest.dtslocal,
            dest: config.build.dest.dtslocal
        }
    };
};
