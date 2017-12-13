module.exports = function (option) {
    return {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loaders: 'babel-loader',
                    exclude: ['node_modules']
                }
            ]
        }
    }
};