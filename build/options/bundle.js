module.exports = function(config, grunt) {
	return {
		main: {
            rootModule: 'plat',
            license: config.license,
            version: config.version,
            src: config.folders.src + 'references.d.ts',
            dest: [
                config.build.dest.ts
            ],
            disableLint: true
        }
	};
};
