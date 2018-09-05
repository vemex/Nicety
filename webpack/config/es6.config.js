module.exports = function(option) {
    return {
        module: {
            rules: [{
                test: /[\s\S]*\.js/,
                loader: 'babel-loader',
            }]
        }
    }
};