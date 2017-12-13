var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = (options) => {
    return {
        plugins:
            [
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
                    {from: './webapp/data', to: 'data'},
                ]),
                // new webpack.ProvidePlugin({
                //     $: "jquery",
                //     jQuery: "jquery"
                // }),
                new MergeJsonWebpackPlugin({
                    output: {
                        groupBy: [
                            {pattern: "./src/main/webapp/i18n/en/*.json", fileName: "./i18n/en.json"},
                            {pattern: "./src/main/webapp/i18n/zh-cn/*.json", fileName: "./i18n/zh-cn.json"}
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


