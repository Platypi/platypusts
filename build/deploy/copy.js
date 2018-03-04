const util = require('util');
const fs = require('fs-extra');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function strip() {
    const data = await readFile('dist/platypus.ts', 'utf8');

    return stripDocs(useStrict(data.split(/\r\n|\n/)))
        .concat(['export = plat;', ''])
        .join('\r\n');
}

async function main() {
    let data = await strip();

    await writeFile('dist/platypus.ts', data);

    data = localize(data.split(/\r\n|\n/))
        .join('\r\n');

    return writeFile('dist/platypus-local.ts', data);
}

function normalize(data) {
    return normalizeBlockComments(data.split(/\r\n|\n/));
}

async function typings() {
    let data = await readFile('dist/platypus.d.ts', 'utf8');

    data = normalize(data);
    data = addNodeTypeDefinition(data.split(/\r\n|\n/))
        .join('\r\n');

    return writeFile('dist/platypus.d.ts', data);
}

async function typingsLocal() {
    let data = await readFile('dist/platypus-local.d.ts', 'utf8');

    data = normalize(data);
    return writeFile('dist/platypus-local.d.ts', data);
}

function stripDocs(data) {
    const linkRegex = /\{@link (.*?)[|](.*?)\}/g;
    let onDescription = false;
    let onParam = false;
    let first = false;
    const out = [];

    data.forEach((line) => {
        line = line.replace(linkRegex, (value, qualifiedPath, linkValue, index, content) => {
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
    let plat;

    data = data
        .map((line, index, lines) => {
            let trim = line.trim();
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
        .map((line, index, lines) => {
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
    let plat;
    let trim;

    data.some((line, index) => {
        trim = line.trim();

        if (trim.indexOf('module plat ') > -1) {
            plat = index;
        }
    });

    data.splice(plat, 2);

    for (let i = data.length - 1; i >= 0; --i) {
        trim = data[i].trim();
        if (trim.indexOf('}') > -1) {
            plat = i;
            break;
        }
    }

    data.splice(plat, 4);

    data = data.map((line, index) => {
        if (line.indexOf('!isUndefined(window)') > -1) {
            plat = index;
        }

        return line.replace(/([^_])plat\./g, '$1');
    });

    data.splice(plat, 9);

    return data;
}

module.exports = {
    main,
    typings,
    typingsLocal
};
