/**
 * 公共模块提取配置
 */
const webpack=require('webpack');
const utils = require('../utils');

module.exports = function (option) {
    return {
        plugins:
            [
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'polyfills',
                    chunks: ['polyfills']
                }),
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'vendor',
                    chunks: ['main'],
                    minChunks: module => utils.isExternalLib(module)
                }),
                new webpack.optimize.CommonsChunkPlugin({
                    name: ['polyfills', 'vendor'].reverse()
                }),
                new webpack.optimize.CommonsChunkPlugin({
                    name: ['manifest'],
                    minChunks: Infinity,
                })]
    };

};