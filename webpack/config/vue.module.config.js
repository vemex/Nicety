const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = function (option) {

    return {
        module: {
            rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            }]
        },
        plugins: [
            // make sure to include the plugin for the magic
            new VueLoaderPlugin()
        ]
    };
};