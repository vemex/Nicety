const webpack = require('webpack');
const writeFilePlugin = require('write-file-webpack-plugin');
const webpackMerge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'development';

module.exports = webpackMerge(commonConfig({ env: ENV }), {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './target/www',
        // proxy: [{
        //     context: [
        //         /* jhipster-needle-add-entity-to-webpack - JHipster will add entity api paths here */
        //         '/api',
        //         '/management',
        //         '/swagger-resources',
        //         '/v2/api-docs',
        //         '/h2-console',
        //         '/auth'
        //     ],
        //     target: 'http://127.0.0.1:8080',
        //     secure: false
        // }]
    },
    entry: {
        main: './webapp/app/app.main',
        polyfills: './webapp/app/polyfills',
        global: './webapp/content/scss/global.scss'
    },
    output: {
        path: utils.root('target/www'),
        filename: 'app/[name].bundle.js',
        chunkFilename: 'app/[id].chunk.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                loaders: 'babel-loader',
                exclude: ['node_modules']
            },
            {
                test: /\.scss$/,
                loaders: ['to-string-loader', 'css-loader', 'sass-loader'],
                exclude: /(vendor\.scss|global\.scss)/
            },
            {
                test: /(vendor\.scss|global\.scss)/,
                loaders: [{ loader: 'style-loader', options: { sourceMap: true } },
                        { loader: 'css-loader', options: { sourceMap: true } },
                        { loader: 'postcss-loader', options: { sourceMap: true } },
                        { loader: 'sass-loader', options: { sourceMap: true } }
                    ]
                    // ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader?sourceMap']
            },
            {
                test: /\.css$/,
                loaders: ['to-string-loader', 'css-loader'],
                exclude: /(vendor\.css|global\.css)/
            },
            {
                test: /(vendor\.css|global\.css)/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
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
        new writeFilePlugin(),
        new webpack.WatchIgnorePlugin([
            utils.root('src/test'),
        ]),
        new WebpackNotifierPlugin({
            title: 'Nicety Demo',
            contentImage: path.join(__dirname, 'logo-jhipster.png')
        })
    ]
});