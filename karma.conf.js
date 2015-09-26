var config = require('./config.js');
var webpackConfig = config.webpack;
webpackConfig.entry = {};
webpackConfig.output = {};
webpackConfig.devtool = 'inline-source-map';


// var webpack = require('karma-webpack');
// Karma configuration
// Generated on Sat Sep 26 2015 17:15:31 GMT+0900 (JST)

module.exports = function(config) {
  config.set({
    
    logLevel: config.LOG_DEBUG,

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',

    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-sourcemap-loader',
      'karma-phantomjs-launcher'
    ],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    files: [
      './test.webpack.js'
      //{ pattern: 'test.webpack.js', watched: false }
    ],

    preprocessors: {
      'test.webpack.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    },

    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
