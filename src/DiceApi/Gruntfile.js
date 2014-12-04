module.exports = function (grunt) {
    grunt.initConfig({
        uglify: {
            app: {
                options: {
                    compress: {
                        drop_console: true
                    }
                },
                files: {
                    'wwwroot/dice.js': ['bower_components/angular/angular.js', 'frontend/app/app.js', 'frontend/app/diceCtrl.js']
                },
                mangle: false
            }
        },
        clean: {
            output: ['wwwroot/**/*'],
            scorch: ['wwwroot/**/*', 'bower_components/', 'node_modules/']
        },
        less: {
            retail: {
                options: {
                    compress: true
                },
                files: {
                    'wwwroot/dice.css': 'frontend/dice.less'
                }
            },
            debug: {
                options: {
                    compress: false,
                    sourceMap: false
                },
                files: {
                    'wwwroot/dice.css': 'frontend/dice.less'
                }
            }
        },
        //watch: {
        //    less: {
        //        files: ["frontend/**/*.less"],
        //        tasks: ["less"]
        //    },
        //    gruntfile: {
        //        files: ['Gruntfile.js', 'frontend/**/*.js'],
        //        tasks: ["jshint"]
        //    },
        //    js: {
        //        files: ['frontend/**/*.js'],
        //        tasks: ["jshint", "uglify:app"]
        //    },
        //    html: {
        //        files: ['frontend/**/*.html'],
        //        tasks: ['htmlmin:html']
        //    }
        //},
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: ['Gruntfile.js', 'wwwroot/js/**/*.js', '!wwwroot/js/ng.js']
        },
        copy: {
            html: {
                expand: true,
                cwd: 'frontend/',
                src: '*.html',
                dest: 'wwwroot/',
                flatten: true
            },
            ng: {
                expand: true,
                flatten: true,
                src: ['bower_components/angular/angular.js', 'frontend/app/app.js', 'frontend/app/diceCtrl.js'],
                dest: 'wwwroot/js/'
            }
        },
        htmlmin: {
            html: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'wwwroot/index.html': 'wwwroot/index.html'
                }
            }
        },
        processhtml: {
            retail: {
                files: {
                    'wwwroot/index.html': ['frontend/index.html']
                }
            }
        }

    });

    grunt.registerTask('build-retail', ['clean:output', 'processhtml:retail', 'htmlmin:html', 'uglify:app', 'less:retail']);
    grunt.registerTask('build-debug', ['clean:output', 'copy', 'less:debug']);


    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-processhtml");
};
