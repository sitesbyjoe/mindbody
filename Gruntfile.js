module.exports = function(grunt){

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		jshint: {
			all: ['Gruntfile.js', 'assets/js/*.js']
		},
		
		less: {
			development: {
				files: {
					"./assets/css/mindbody.css" : "./assets/less/mindbody.less"
				}
			}
		},
		
		watch: {
			js: {
				files: ['assets/js/*.js'],
				tasks: ['buildJS']
			},
			less: {
				files: ['assets/less/*.less'],
				tasks: ['buildCSS']
			}
		}
		
	});
	
	grunt.registerTask('default', []);
	grunt.registerTask('buildJS', ['jshint']);
	grunt.registerTask('buildCSS',  ['less']);
	
};



