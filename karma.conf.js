// Karma configuration
// Generated on Tue Apr 24 2018 12:40:32 GMT+0800 (China Standard Time)

var webpackConfig = require('./webpack/webpack.prod.test.js');
const jqueryFile =  'https://code.jquery.com/jquery-1.9.1.min.js' 
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon-chai',],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/echarts/dist/echarts.js',
      'node_modules/metismenu/dist/metisMenu.js',
      'node_modules/popper.js/dist/umd/popper.min.js',
      'node_modules/highcharts/highcharts.js',
      'node_modules/highcharts/themes/grid-light.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/jquery/dist/jquery.min.js',
      'test/unit/**/*.js'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/unit/**/*.js': [ 'webpack' ]
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],


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
    browsers: ['Chrome', 'IE', 'Safari', 'PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    webpack: webpackConfig,
    // 不显示 `webpack` 打包日志信息
    webpackServer: {
      noInfo: true
    },
    webpackMiddleware: {
      noInfo: true
  },
  coverageReporter: {
    dir: './coverage',
    reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
    ]
}
    //plugins: ['karma-browserify','karma-mocha'],
  })
}
