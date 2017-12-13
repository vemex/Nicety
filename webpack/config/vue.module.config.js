module.exports = function (option) {
    return {
        module: {
            rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            }]
        }
    };
};