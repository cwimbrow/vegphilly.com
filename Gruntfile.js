"use strict";

module.exports = function(grunt) {
    var debug = typeof grunt.option('dev') !== 'undefined';

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('js', ['browserify:bundle']);
    grunt.registerTask('default', ['js']);

    var files = grunt.file.expand(
        'vegancity/js/src/**/*.js'
    );

    var aliases = [
        './vegancity/js/lib/jquery.js:jquery'
    ];

    var aliasMappings = [
        {
            cwd: 'vegancity/js/src',
            src: '**/*.js',
            dest: 'vegancity'
        }
    ];

    var shim = {
        google: {
            path: './vegancity/js/lib/googlemap.js',
            exports: 'google'
        }
    };

    grunt.initConfig({
        browserify: {
            bundle: {
                src: files,
                dest: './vegancity/static/js/bundle.js',
                options: {
                    alias: aliases,
                    aliasMappings: aliasMappings,
                    shim: shim,
                    debug: debug
                }
            }
        },
        watch: {
            options: {
                spawn: false
            },
            js: {
                files: files,
                tasks: ['js']
            }
        }
    });
};
