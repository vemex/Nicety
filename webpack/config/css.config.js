const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = (option) => {
    return {
        module: {
            rules: [{
                test: /\.css$/,
                loaders: ['to-string-loader', 'css-loader']
            }]
        },
        plugins: []

    };
};


