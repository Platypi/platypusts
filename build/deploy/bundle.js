const util = require('util');
const package = require('../../package.json');
const tsBundle = require('ts-bundle');
const bundlePromise = util.promisify(tsBundle);

async function bundle() {
    return await bundlePromise({
        rootModule: 'plat',
        license: 'license.txt',
        version: package.version,
        src: 'src/references.d.ts',
        dest: [
            'dist/platypus.ts'
        ],
        disableLint: true
    });
}

module.exports = {
    bundle
};
