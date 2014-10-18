module.exports = function(grunt) {

	// Auto-load the neede grunt tasks
	// require('load-grunt-tasks')(grunt);
	require('load-grunt-tasks')(grunt, {pattern: ['grunt-*', 'assemble']});

	// Project configuration
	grunt.initConfig({

		// Run predefined tasks whenever watched file patterns are added, changed or deleted
		watch: {
			options: {
				livereload: true,
				spawn:      false
			},

			// Watch .hbs (html) files
			assemble: {
				files: ['src/assemble/{,*/}*.hbs'],
				tasks: ['newer:assemble:dev'],
			},

			// autoprefix the files
			autoprefixer: {
				files: ['src/stylesheets/*.css'],
				tasks: ['autoprefixer:dev'],
			},

			// watch other files
			other: {
				files: [
					'src/scripts/{,*/}*.js'
				]
			}
		},

		// Assemble convert .hbs to .html
		// https://github.com/assemble/assemble/
		assemble: {
			options: {
				assets:   'assets',
				plugins:  [],
				partials: ['src/assemble/includes/*.hbs'],
				data:     'db.yml'
			},
			dev: {
				files: [{
					expand: true,
					cwd:    'src/assemble',
					src:    ['*.hbs'],
					dest:   'src/'
				}]
			},
			build: {
				options: {
					data:        ['buildData.yml'],
					production:  true,
					postprocess: require('pretty')
				},
				files: [{
					expand: true,
					cwd:    'src/assemble',
					src:    ['*.hbs'],
					dest:   'build/'
				}]
			}
		},

		// Compass convert .scss to .css
		// https://github.com/gruntjs/grunt-contrib-compass
		compass: {
			options: {
				sassDir:        'src/sass',
				javascriptsDir: 'src/scripts',
				outputStyle:    'nested',
				relativeAssets: true,
				importPath:     'src/bower_components',
				debugInfo:      false
			},
			dev: {
				options: {
					imagesDir:      'src/images',
					cssDir:         'src/stylesheets',
					environment:    'development',
					noLineComments: false,
					watch:          true
				},
				files: [{
					expand: true,
					cwd:    'src/sass/',
					src:    '{,*/}*.scss',
					dest:   'src/stylesheets',
					ext:    '.css'
				}]
			},
			build: {
				options: {
					imagesDir:      'build/images',
					cssDir:         'build/stylesheets',
					environment:    'production',
					noLineComments: true,
					watch:          false
				},
				files: [{
					expand: true,
					cwd:    'src/sass/',
					src:    '{,*/}*.scss',
					dest:   'build/stylesheets',
					ext:    '.css'
				}]
			}
		},

		// Parse CSS and add vendor-prefixed CSS properties using the Can I Use database. Based on Autoprefixer.
		// https://github.com/nDmitry/grunt-autoprefixer
		autoprefixer: {
			dev: {
				files: [{
					expand: true,
					cwd:    'src/stylesheets/',
					src:    '*.css',
					dest:   'src/stylesheets'
				}]
			},
			build: {
				files: [{
					expand: true,
					cwd:    'build/stylesheets/',
					src:    '*.css',
					dest:   'build/stylesheets'
				}]
			}
		},

		// Minify PNG, JPG and GIF images
		// https://github.com/gruntjs/grunt-contrib-imagemin
		imagemin: {
			options: {
				progressive: true,
			},
			build: {
				files: [{
					expand: true,
					cwd:    'src/images',
					src:    ['**/*.{png,gif,jpg,jpeg}'],
					dest:   'build/images'
				}]
			}
		},

		// requireJS optimizer
		// https://github.com/gruntjs/grunt-contrib-requirejs
		requirejs: {
			build: {
				// Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
				options: {
					baseUrl:                 'src/scripts',
					mainConfigFile:          'src/scripts/main.js',
					optimize:                'uglify2',
					preserveLicenseComments: false,
					useStrict:               true,
					wrap:                    true,
					name:                    '../bower_components/almond/almond',
					include:                 'main',
					out:                     'build/js/main.js'
				}
			}
		},

		// https://github.com/yeoman/grunt-usemin
		useminPrepare: {
			html: 'build/index.html',
			options: {
				dest: 'build'
			}
		},
		usemin: {
			html: ['build/{,*/}*.html'],
			css:  ['build/stylesheets/{,*/}*.css']
		},

		// rename the files based on the content
		// https://github.com/cbas/grunt-rev
		rev: {
			files: {
				src: ['build/stylesheets/*.css']
			}
		},

		// concurrent
		// https://github.com/sindresorhus/grunt-concurrent
		concurrent: {
			dev: ['compass:dev', 'watch']
		},

		// clean the build dir
		// https://github.com/gruntjs/grunt-contrib-clean
		clean: {
			beforebuild: ['build'],
			afterBuild:  ['.tmp']
		},

		// copy some files not handled by other tasks
		// https://github.com/gruntjs/grunt-contrib-copy
		copy: {
			build: {
				files: [{
					expand: true,
					cwd:    'src/bower_components',
					src:    ['sass-bootstrap/fonts/*'],
					dest:   'build/bower_components'
				},
				{
					expand: true,
					cwd:    'src/assets/zocial/css',
					src:    ['*'],
					dest:   'build/assets/zocial/css'
				},
				// {
				// 	expand: true,
				// 	cwd:    'src/images',
				// 	src:    ['**/*.{png,gif,jpg,jpeg}'],
				// 	dest:   'build/images'
				// },
				{
					'build/assets/blur.svg': 'src/assets/blur.svg'
				}]
			}
		},
	});

	// Default task(s).
	grunt.registerTask('default', [
		'newer:assemble:dev',
		'autoprefixer:dev',
		'concurrent:dev'
	]);

	// building
	grunt.registerTask('build', [
		'clean:beforebuild',
		'copy:build',
		'newer:assemble:build',
		'newer:imagemin:build',
		'compass:build',
		'newer:autoprefixer:build',
		'requirejs',
		'useminPrepare',
		'concat', // automatically configured by usemin
		'cssmin', // automatically configured by usemin
		'rev',
		'usemin',
		'clean:afterBuild'
	]);
};