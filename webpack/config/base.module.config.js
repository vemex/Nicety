/**
 * 基础必要配置模块
 */

const dirVars = require('./base/dir-vars.config.js');
const path = require('path');

module.exports = function (option) {
    return {
        module: {
            rules: [
                //{test: /bootstrap\/dist\/js\/umd\//, loader: 'imports-loader?jQuery=jquery'},
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        caseSensitive: true,
                        removeAttributeQuotes: false,
                        minifyJS: false,
                        minifyCSS: false
                    },
                    exclude: [path.resolve(dirVars.webappRootDir, './index.html')]
                },
                {
                    test: /\.(jpe?g|png|gif)$/i,
                    loaders: ['file-loader?hash=sha512&digest=hex&name=content/images/[hash].[ext]']
                },
                {
                    test: /\.(svg|woff2?|ttf|eot)$/i,
                    loaders: ['file-loader?name=content/fonts/[name].[ext]']
                },
                {
                    test: /manifest.webapp$/,
                    loader: 'file-loader?name=manifest.webapp!web-app-manifest-loader'
                },

                //{test: require.resolve("jquery"), loader: "expose-loader?$!expose-loader?jQuery"}
            ]
        }
    };

};
