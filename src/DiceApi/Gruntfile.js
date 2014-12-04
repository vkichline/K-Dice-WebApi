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
            scorch: ['wwwroot/**/*', 'bower_components/', 'node_modules/'],
            postCacheBust: ['wwwroot/dice.css', 'wwwroot/dice.js']
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
        // NOTE: watch assumes debug build
        watch: {
            less: {
                files: ["frontend/**/*.less"],
                tasks: ["less:debug"]
            },
            js: {
                files: ['frontend/**/*.js'],
                tasks: ["jshint", "copy:js"]
            },
            html: {
                files: ['frontend/**/*.html'],
                tasks: ['copy:html']
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: ['Gruntfile.js', 'frontend/**/*.js']
        },
        copy: {
            html: {
                expand: true,
                cwd: 'frontend/',
                src: '*.html',
                dest: 'wwwroot/',
                flatten: true
            },
            js: {
                expand: true,
                flatten: true,
                src: ['bower_components/angular/angular.js', 'frontend/app/app.js', 'frontend/app/diceCtrl.js'],
                dest: 'wwwroot/js/'
            }
        },
        // Minifies index.html in place, after processhtml has fixed up includes based on comments
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
        // Replaces groups of include statements with a single statement for bundling.
        processhtml: {
            retail: {
                files: {
                    'wwwroot/index.html': ['frontend/index.html']
                }
            }
        },
        cacheBust: {
            assets: {
                files: {
                    src: ['wwwroot/index.html']
                }
            }
        }
    });

    grunt.registerTask('build-retail', ['clean:output', 'processhtml:retail', 'htmlmin:html', 'uglify:app', 'less:retail', 'cacheBust', 'clean:postCacheBust']);
    grunt.registerTask('build-debug', ['clean:output', 'copy', 'less:debug']);


    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-processhtml");
    grunt.loadNpmTasks("grunt-cache-bust");
};
