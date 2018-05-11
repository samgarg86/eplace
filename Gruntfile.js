/*
 * Copyright (c) 2014, Fluid, Inc. and its licensors. All rights reserved
 */

/**
 * Build script for the Fluid Storefront
 *
 * @param target - The deployment target. Determines build options such as minification.
 * Accepted values are dev and prod. The default is dev.
 * @param config - A json configuration file used to override the default config files
 * used for each task. The value can be an absolute or relative file path.
 *
 * {
 * 		"sass": "sass.json",
 *		"jshint": "jshint.json",
 *		"requirejs": "requirejs.json",
 *		"watch": "watch.json"
 * }
 *
 * Each value is relative path to the configuration json file respective to its task.
 * Refer to the individual default files or grunt task documentation for acceptable
 * configuration options.
 *
 * Examples:
 *
 * grunt --target=dev
 * grunt --target=prod
 * grunt watch --target=dev
 * grunt watch --target=prod
 * grunt --target=dev --config=/fluid/client/project/build/config.json
 * grunt --target=prod --config=/fluid/client/project/build/config.json
 * grunt watch --target=dev --config=/fluid/client/project/build/config.json
 * grunt watch --target=prod --config=/fluid/client/project/build/config.json
 *
 */
module.exports = function (grunt) {
    if (grunt.option("target") == null) grunt.option("target", "dev");
    var target = grunt.option("target");

    grunt.log.writeln("------------------------------------------");
    grunt.log.writeln("EPlace Signin Build - " + target);
    grunt.log.writeln("------------------------------------------");

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    "dist/css/design1.css": "src/scss/design1.scss",
                    "dist/css/design2.css": "src/scss/design2.scss"
                },
                options: {
                    "outputStyle": "nested"
                }
            }
        },
        autoprefixer: {
            dist: {
                options: {
                    browsers: ['last 5 versions', 'ie 8', 'ie 9']
                },
                files: {
                    "dist/css/design1.css": "dist/css/design1.css",
                    "dist/css/design2.css": "dist/css/design2.css"
                }
            }
        },
        watch: {
            css: {
                files: "scss/**",
                tasks: ['sass', 'autoprefixer']
            }
        }
    });

    grunt.loadNpmTasks("grunt-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask("default", ['sass', 'autoprefixer']);

};