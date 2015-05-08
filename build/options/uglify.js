module.exports = function(config, grunt) {
	var files = {};
   
   files[config.build.dest.min] = config.build.dest.js;
    
    return {
        options: {
            screwIE8: true
        },
        main: {
            files: files
        }
	};
};
