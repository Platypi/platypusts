const copy = require('./copy');

(async () => {
    try {
        await copy.typings();
        await copy.typingsLocal();
        process.exit(0);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
})();
