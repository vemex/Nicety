
const utils = require('../utils.js');
const dirVars = require('./base/dir-vars.config.js');
let path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");



//const extractSASS = new ExtractTextPlugin(`content/style/[name]-sass.[hash].css`);


let config = {};

let doBuildConfig = function(option) {
    config = {};

};

let doProdConfig = function(option) {
    config = {
        module: {
            rules: [{
                test:/[\s\S]*\.scss/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {loader:'resolve-url-loader', options: { debug: true}},
                    { loader: 'sass-loader', options: { sourceMap: true }}]
            }]
        },
        plugins: []
    };

};

let doDevConfig = function(option) {
    config = {
        module: {
            rules: [  {
                test: /[\s\S]*\.scss/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader:'resolve-url-loader', options: { debug: true}},
                    { loader: 'sass-loader', options: { sourceMap: true } }
                    ]
            }, ]
        },
        plugins: []
    };
};

module.exports = function(option) {
    utils.checkEnvironment(option, doDevConfig, doProdConfig, doBuildConfig);
    return config;
};