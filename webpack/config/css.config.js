const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (option) => {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use:[
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                    ]
                }
            ]
        },
        plugins: [ new MiniCssExtractPlugin({
            filename: "content/style/[name].[hash].css"
        })]

    };
};


