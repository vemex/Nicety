//
const webpackMerge = require('webpack-merge');
const Visualizer = require('webpack-visualizer-plugin');

//引入必要配置
const baseModuleConfig = require("./config/base.module.config.js");
const basePluginConfig = require("./config/base.plugin.config.js");
const commonChunkConfig = require("./config/commonChunk.plugin.config.js");
const constainsConfig = require("./config/constains.config.js");
const cssConfig = require("./config/css.config.js");
const scssConfig = require("./config/scss.config.js");
const es6Config = require("./config/es6.config.js");
const entryConfig = require("./config/entry.config");
const externalsConfig = require("./config/externals.config.js");
const outputConfig = require("./config/output.config.js");
const resolveConfig = require("./config/resolve.config.js");
const vueConfig = require("./config/vue.module.config.js");


let option = {env: "production", apiURL: ''};

let config = webpackMerge(
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
    resolveConfig(option),
    vueConfig(option),
    {
        plugins: [
            new Visualizer({
                // Webpack statistics in target folder
                filename: '../stats.html'
            })
        ]
    });
module.exports = config;