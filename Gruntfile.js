module.exports = function(grunt) {

	// 1. All configuration goes here 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'production/css/inline.css': 'development/scss/inline/inline.scss'
				}
			} 
		},
		
		assemble: {
			options: {
				layoutdir: 'development/layouts',
				flatten: true
			},
			pages: {
				src: ['development/emails/*.hbs'],
				dest: 'production/'
			}
		},

		premailer: {
			simple: {
				options: {
					removeComments: true
				},
				files: [{
					expand: true,
					src: ['production/*.html'],
					dest: ''
				}]
			}
		},
		
		watch: {
			css: {
				files: ['development/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false,
				}
			},
			assemble: {
				files: ['development/layouts/*'],
				tasks: ['assemble'],
				options: {
					spawn: false,
				}
			},
			premailer: {
				files: ['development/emails/*'],
				tasks: ['premailer'],
				options: {
					spawn: false,
				}
			}
		}
		
		// imagemin: {
		// 	dynamic: {
		// 		files: [{
		// 			expand: true,
		// 			cwd: 'assets/development/img/',
		// 			src: ['**/*.{png,jpg,gif}'],
		// 			dest: 'assets/production/img/'
		// 		}]
		// 	}
		// },

	});

	// 3. Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-premailer');
	grunt.loadNpmTasks('assemble');

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ['sass', 'assemble', 'premailer',]);
	
	grunt.registerTask('build', ['sass', 'assemble', 'premailer',]);
	
	grunt.registerTask('watch', ['watch']);
	
	// grunt.registerTask('img', ['imagemin']);

};


