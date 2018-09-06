const toc = require('markdown-toc'),
			marked = require('marked'),
			helpers = require('./src/helpers');

module.exports = function(grunt) {
	const pkg = grunt.file.readJSON('package.json');
	const title = helpers.pageTitle(pkg.name);

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
						title,
						githubUrl: pkg.homepage,
					},
					preCompile(src, context){
						/*
							- using markdown-toc to extract table of content as markdown
							- compiling table of content to html using marked
							- adding table of content to template as a templateContext variable
						*/
						this.templateContext.toc = marked(toc(src).content);
						return src;
					},
					postCompile(src, context){
						/* turning html string to cheerio object */
						const $ = helpers.getCheerioObject(src);
						/* getting h1 heading */
						const h1 = helpers.getH1Heading($);
						/* setting pageTitle */
						this.templateContext.pageTitle = h1;
						/* returning fixed HTML */
						return helpers.fixHeadingsId($);
					},
					markdownOptions: {
						langPrefix: 'lang-',
						gfm: true,
						highlight(code){
							return require("highlight.js").highlightAuto(code).value;
						},
					}
				}
			},
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