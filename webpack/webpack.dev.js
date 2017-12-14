//
const WriteFilePlugin = require('write-file-webpack-plugin');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const utils = require('./utils');
const path = require('path');

//引入必要配置
const baseModuleConfig = require("./config/base.module.config.js");
const basePluginConfig = require("./config/base.plugin.config.js");
const commonChunkConfig = require("./config/commonChunk.plugin.config.js");
const constainsConfig = require("./config/constains.config.js");
const cssConfig = require("./config/css.config.js");
const scssConfig = require("./config/scss.config.js");
const es6Config = require("./config/es6.config.js");
const entryConfig = require("./config/entry.config.js");
const externalsConfig = require("./config/externals.config.js");
const outputConfig = require("./config/output.config.js");
const resolveConfig = require("./config/resolve.config.js");
const vueConfig = require("./config/vue.module.config.js");


let option = {env: "development", apiURL: ''};

let config = webpackMerge(
    resolveConfig(option),
    baseModuleConfig(option),
    basePluginConfig(option),
    commonChunkConfig(option),
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
        devServer: {
            contentBase: './target/www'
        },
        plugins: [
            // new webpack.optimize.UglifyJsPlugin({
            //     output: {
            //         comments: false,  // remove all comments
            //     },
            //     compress: {
            //         warnings: false
            //     }
            // }),
            new BrowserSyncPlugin({
                host: 'localhost',
                port: 9000,
                proxy: {
                    target: 'http://localhost:9060'
                }
            }, {
                reload: false
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.NamedModulesPlugin(),
            new WriteFilePlugin(),
            new webpack.WatchIgnorePlugin([
                utils.root('src/test'),
            ]),
            new WebpackNotifierPlugin({
                title: 'Nicety Demo',
                contentImage: path.join(__dirname, 'logo-jhipster.png')
            })
        ]
    });
module.exports = config;