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
					'production/css/inline.css': 'development/scss/inline.scss'
				}
			} 
		},
		
		assemble: {
			options: {
				layoutdir: 'development/wrapper',
				flatten: true
			},
			pages: {
				src: ['development/layouts/*.hbs'],
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
				files: ['development/wrapper/*'],
				tasks: ['assemble'],
				options: {
					spawn: false,
				}
			},
			premailer: {
				files: ['development/layouts/*'],
				tasks: ['premailer'],
				options: {
					spawn: false,
				}
			}
		},
		
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'assets/development/img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'assets/production/img/'
				}]
			}
		},
		
		nodemailer: {

			options: {
				transport: {
					type: 'SMTP',
					options: {
						service: 'Gmail',
						auth: {
							user: 'email@gmail.com',
							pass: 'password'
						}
					}
				},
				
				message: {
					subject: 'A test e-mail',
					text: 'Plain text message',
					html: '<body><h1>HTML custom message</h1></body>',
				},
				
				recipients: [{
					email: 'john@mammoth.tv',
					name: 'John D'
				}]
			},

			external: {
				src: ['production/email.html']
			}
		}

	});

	// 3. Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-premailer');
	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-nodemailer');

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ['sass', 'assemble', 'premailer',]);
	
	grunt.registerTask('build', ['sass', 'assemble', 'premailer',]);
	
	grunt.registerTask('send', ['nodemailer',]);
	
	// grunt.registerTask('watch', ['watch', ]);
	
	// grunt.registerTask('img', ['imagemin']);

};


