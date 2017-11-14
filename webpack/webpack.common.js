const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin");

const utils = require('./utils.js');

module.exports = (options) => {
    const DATAS = {
        VERSION: `'${utils.parseVersion()}'`,
        DEBUG_INFO_ENABLED: options.env === 'development',
        // The root URL for API calls, ending with a '/' - for example: `"http://www.jhipster.tech:8081/myservice/"`.
        // If this URL is left empty (""), then it will be relative to the current context.
        // If you use an API server, in `prod` mode, you will need to enable CORS
        // (see the `jhipster.cors` common JHipster property in the `application-*.yml` configurations)
        SERVER_API_URL: `""`
    };
    return {
        resolve: {
            extensions: ['.ts', '.js'],
            modules: ['node_modules']
        },
        stats: {
            children: false
        },
        module: {
            rules: [
                { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports-loader?jQuery=jquery' },
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
                    exclude: ['./webapp/index.html']
                },
                {
                    test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
                    loaders: ['file-loader?hash=sha512&digest=hex&name=content/[hash].[ext]']
                },
                {
                    test: /manifest.webapp$/,
                    loader: 'file-loader?name=manifest.webapp!web-app-manifest-loader'
                },
                {
                    test: /app.constants.js$/,
                    loader: StringReplacePlugin.replace({
                        replacements: [{
                            pattern: /\/\* @toreplace (\w*?) \*\//ig,
                            replacement: (match, p1, offset, string) => `_${p1} = ${DATAS[p1]};`
                        }]
                    })
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(options.env)
                }
            }),
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
            }),
            /**
             * See: https://github.com/angular/angular/issues/11580
             */
            // new webpack.ContextReplacementPlugin(
            //     /angular(\\|\/)core(\\|\/)@angular/,
            //     utils.root('webapp/app'), {}
            // ),
            new CopyWebpackPlugin([
                { from: './webapp/data', to: 'data' },
            ]),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            }),
            new MergeJsonWebpackPlugin({
                output: {
                    groupBy: [
                        { pattern: "./src/main/webapp/i18n/en/*.json", fileName: "./i18n/en.json" },
                        { pattern: "./src/main/webapp/i18n/zh-cn/*.json", fileName: "./i18n/zh-cn.json" }
                        // jhipster-needle-i18n-language-webpack - JHipster will add/remove languages in this array
                    ]
                }
            }),
            new HtmlWebpackPlugin({
                template: './webapp/index.html',
                chunksSortMode: 'dependency',
                inject: 'body'
            }),
            new StringReplacePlugin()
        ]
    };
};