const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSASS = new ExtractTextPlugin(`[name]-sass.[hash].css`);
const extractCSS = new ExtractTextPlugin(`[name].[hash].css`);

module.exports = {
    rules: [
        {
            test: /(vendor\.css|global\.css)/,
            use: extractCSS.extract({
                fallback: 'style-loader',
                use: ['css-loader']
            })
        }
    ]
};