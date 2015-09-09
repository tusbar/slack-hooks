module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    var config = {
        reports: process.env.CIRCLE_TEST_REPORTS || 'reports'
    };

    grunt.initConfig({
        c: config,

        // ## //

        jscs: {
            all: {
                files: {
                    src: [
                        'Gruntfile.js',
                        'lib/**/*.js',
                        'test/**/*.js',
                        'index.js'
                    ]
                }
            }
        },

        // ## //

        jshint: {
            options : {
                jshintrc: true
            },
            all: {
                files: {
                    src: [
                        'Gruntfile.js',
                        'lib/**/*.js',
                        'test/**/*.js',
                        'index.js'
                    ]
                }
            }
        },

        // ## //

        mochaTest: {
            options: {
                timeout: 5000
            },

            spec: {
                options: {
                    reporter: 'spec',
                    require: [
                        'test/bootstrap/node'
                    ]
                },
                src: [
                    'test/*.test.js'
                ]
            },

            xunit: {
                options: {
                    reporter: 'xunit',
                    require: [
                        'test/bootstrap/node'
                    ],
                    quiet: true,
                    captureFile: '<%= c.reports %>/xunit.xml'
                },
                src: [
                    'test/*.test.js'
                ]
            }
        }
    });

    grunt.registerTask('default', [
        'test'
    ]);

    grunt.registerTask('test', [
        'jscs:all',
        'jshint:all',
        'mochaTest:spec'
    ]);

    grunt.registerTask('test:ci', [
        'jscs:all',
        'jshint:all',
        'mochaTest:xunit'
    ]);
};
