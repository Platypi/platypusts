module.exports = function(config, grunt) {
	return {
		before: {
            force: true,
            src: [
                config.folders.dist
            ]
        },
        after: {
            force: true,
            src: [
                config.build.dest.ts
            ]
        }
	};
};
