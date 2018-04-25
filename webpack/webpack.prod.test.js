//
const WriteFilePlugin = require('write-file-webpack-plugin');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const utils = require('./utils');
const path = require('path');
const Visualizer = require('webpack-visualizer-plugin');

//引入必要配置
const baseModuleConfig = require("./config/base.module.config.js");
const basePluginConfig = require("./config/base.plugin.config.js"); 
const constainsConfig = require("./config/constains.config.js");
const cssConfig = require("./config/css.config.js");
const scssConfig = require("./config/scss.config.js");
const es6Config = require("./config/es6.config.js");
const entryConfig = require("./config/entry.config.js");
const externalsConfig = require("./config/externals.config.js");
const outputConfig = require("./config/output.config.js");
const resolveConfig = require("./config/resolve.config.js");
const vueConfig = require("./config/vue.module.config.js");


let option = {env: "production", apiURL: ''};

let config = webpackMerge(
    baseModuleConfig(option),
    basePluginConfig(option), 
    constainsConfig(option),
    cssConfig(option),
    scssConfig(option),
    es6Config(option),
    entryConfig(option),
    externalsConfig(option),
    outputConfig(option),
    // resolveConfig(option),
    vueConfig(option),
    {
        devtool: 'source-map',
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: { 
                '@': utils.root('./'), // 调用组件的时候方便点
                '$': 'jquery/dist/jquery.min.js'
            }
        },
        module: {
            rules:[
                // // babel-loader
                // {
                //     test: /\.js$/,
                //     use: 'babel-loader',
                //     include: [utils.root('./test')]
                // },

                // 为了统计代码覆盖率，对 js 文件加入 istanbul-instrumenter-loader
                {
                    test: /\.(js)$/,
                    exclude: /node_modules|\.spec\.js$/,
                    include: /src|webapp/,
                    enforce: 'post',
                    use: [{
                        loader: "istanbul-instrumenter-loader",
                        options: {
                            esModules: true
                        },
                    }]
                },

                // vue loader
                {
                    test: /\.vue$/,
                    use: [{
                        loader: 'vue-loader',
                        options: {
                            // 为了统计代码覆盖率，对 vue 文件加入 istanbul-instrumenter-loader
                            preLoaders: {
                                js: 'istanbul-instrumenter-loader?esModules=true'
                            }
                        }
                    }]
                }
            ]
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                output: {
                    comments: false,  // remove all comments
                },
                compress: {
                    warnings: false
                }
            }),
            new Visualizer({
                // Webpack statistics in target folder
                filename: '../stats.html'
            })
        ]
    });
module.exports = config;