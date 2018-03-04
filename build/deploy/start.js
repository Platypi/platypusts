const { bundle } = require('./bundle');
const copy = require('./copy');

(async () => {
    try {
        await bundle();
        await copy.main();
        process.exit(0);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
})();
