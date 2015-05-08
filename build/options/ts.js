module.exports = function(config, grunt) {
	return {
		options: {
            target: 'es5',
            module: 'commonjs',
            sourceMap: false,
            removeComments: false,
            declaration: true,
            fast: 'never'
        },
        main: {
            src: [
                config.build.dest.ts
            ]
        }
	};
};
