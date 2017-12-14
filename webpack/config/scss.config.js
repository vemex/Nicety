const ExtractTextPlugin = require("extract-text-webpack-plugin");
const  utils=require('../utils.js');

const extractSASS = new ExtractTextPlugin(`content/style/[name]-sass.[hash].css`);


let config = {};

let buildBuildConfig = function (option) {
    config = {
    };

};

let buildProdConfig = function (option) {
    config = {
        module: {
            rules: [
                {
                    test: /(vendor\.scss|global\.scss)/,
                    use: extractSASS.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'postcss-loader', 'sass-loader']
                    })
                },
            ]
        },
        plugins: [extractSASS]
    };

};

let buildDevConfig = function (option) {
    config = {
        module: {
            rules: [
                {
                    test: /(vendor\.scss|global\.scss)/,
                    loaders: extractSASS.extract({
                        fallback: {loader: 'style-loader', options: {sourceMap: true}},
                        use: [
                            {loader: 'css-loader', options: {sourceMap: true}},
                            {loader: 'postcss-loader', options: {sourceMap: true}},
                            {loader: 'sass-loader', options: {sourceMap: true}}
                        ]
                    })
                },
            ]
        },
        plugins: [extractSASS]
    };
};

module.exports = function (option) {
    utils.checkEnvironment(option, buildDevConfig, buildProdConfig, buildBuildConfig);
    return config;
};