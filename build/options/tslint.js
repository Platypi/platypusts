module.exports = function(config, grunt) {
	return {
        options: {
            configuration: grunt.file.readJSON('tslint.json')
        },
        files: {
            src: [config.folders.src + '**/*.ts']
        }
	};
};
