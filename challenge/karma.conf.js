// Karma configuration
// Generated on Wed Jan 09 2019 18:11:32 GMT-0200 (-02)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'www',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
         // for test modules
        //'../node_modules/ng-midway-tester/src/ngMidwayTester.js',

        'lib/ionic/js/ionic.bundle.js',
        'lib/angular/angular.js',
        'lib/angular-animate/angular-animate.min.js',
        'lib/angular-sanitize/angular-sanitize.min.js',
        'lib/angular-ui-router/release/angular-ui-router.min.js',
        'lib/angular-cache/angular-cache.min.js',
        'lib/angularfire/angularfire.min.js',
        'lib/firebase/firebase.js',

        'app/firebase.key.js',

        'lib/angular-mocks/angular-mocks.js',
        'app/app.js',
        'app/app.routing.js',
        'app/services/notification.service.js',
        'app/home/home.module.js',
        'app/home/home.controller.js',
        'app/utils/util.service.js',

        'tests/*.spec.js'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    plugins: [
        'karma-jasmine',
        'karma-mocha-reporter',
        'karma-phantomjs-launcher',
        'karma-chrome-launcher',
        'karma-safari-launcher'

    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-repo rter
    reporters: ['mocha'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
