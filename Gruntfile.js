
const capitalize = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
const pageTitle = (pkgName) => {
	let title = pkgName.split('-').map(w => capitalize(w)).join(' ');
	return title;
}

module.exports = function(grunt) {
	const pkg = grunt.file.readJSON('package.json');
   
	grunt.initConfig({
		markdown: {
			all: {
				files: [{
					expand: true,
					cwd: 'src/marks',
					src: '**/*.md',
					dest: 'build/html/',
					ext: '.html'
				}],
				options: {
					template: 'src/templates/note.jst',
					templateContext: {
						title: pageTitle(pkg.name),
					},
					markdownOptions: {
						// langPrefix: 'lang-',
						gfm: true,
						highlight: function(code) {
							return require("highlight.js").highlightAuto(code).value;
						},
					}
				}
			}
		},

    /* Clear out the assets directory if it exists */
    clean: {
      dev: {
        src: ['build/assets', 'build/html'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['build/assets', 'build/html']
        },
      },
		},
		
    /* Copy the assets that don't go through any task */
    copy: {
      dev: {
        files: [{
					expand: true,
					cwd: 'src',
					src: ['css/**', 'images/**'],
					dest: 'build/assets/'
        }]
			}
    },
	});

	 grunt.loadNpmTasks('grunt-markdown');
	 grunt.loadNpmTasks('grunt-contrib-clean');
	 grunt.loadNpmTasks('grunt-contrib-copy');
	 grunt.loadNpmTasks('grunt-mkdir');
	 grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'markdown']);
};


