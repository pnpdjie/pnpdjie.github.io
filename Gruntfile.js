'use strict';

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        htmllint: {
            options: {
                force: true,
                reporterOutput: 'tmp/htmllint-report.txt'
            },
            all: [
                '_includes/*.html',
                '_layouts/*.html'
            ]
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'js/script.js',
                'js/jekyll-search-copy.js'
            ],
            options: {
                force: true,
                jshintrc: '.jshintrc',
                reporterOutput: 'tmp/jshint-report.txt'
            }
        },
        scsslint: {
            allFiles: [
                'css/*.scss',
                '_sass/*.scss'
            ],
            options: {
                bundleExec: true,
                config: '.scss-lint.yml',
                reporterOutput: 'tmp/scss-lint-report.xml',
                colorizeOutput: true
            }
        },
        sasslint: {
            options: {
                outputFile: 'tmp/sass-lint-report.xml'
            },
            target: ['css/\*.sass', '_sass/\*.sass']
        },
        csslint: {
            options: {
                formatters: [
                    {id: 'csslint-xml', dest: 'tmp/csslint.xml'}
                ]
            },
            strict: {
                options: {
                    import: 2
                },
                src: ['css/*.css']
            },
            lax: {
                options: {
                    import: false
                },
                src: ['css/*.css']
            }
        },
        clean: {
            tests: ['tmp']
        }
    });

    //grunt.loadNpmTasks('grunt-htmllint');
    grunt.loadNpmTasks('grunt-html');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.loadNpmTasks('grunt-sass-lint');
    grunt.loadNpmTasks('grunt-contrib-csslint');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    //grunt.registerTask('test', ['clean', 'jshint', 'scsslint', 'sasslint', 'csslint', 'htmllint']);
    grunt.registerTask('test', ['clean',  'jshint']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['test']);

};
