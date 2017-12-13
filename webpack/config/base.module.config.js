const dirVars = require('../base/dir-vars.config.js');
const path = require('path');
const utils = require('../../utils.js');
const DATAS = {
    VERSION: `'${utils.parseVersion()}'`,
    DEBUG_INFO_ENABLED: options.env === 'development',
    SERVER_API_URL: `""`
};
module.exports = {
    rules: [
        {test: /bootstrap\/dist\/js\/umd\//, loader: 'imports-loader?jQuery=jquery'},
        {
            test: /\.html$/,
            loader: 'html-loader',
            options: {
                minimize: true,
                caseSensitive: true,
                removeAttributeQuotes: false,
                minifyJS: false,
                minifyCSS: false
            },
            exclude: [path.resolve(dirVars.webappRootDir,'./index.html')]
        },
        {
            test: /\.(jpe?g|png|gif)$/i,
            loaders: ['file-loader?hash=sha512&digest=hex&name=content/images/[hash].[ext]']
        },
        {
            test: /\.(svg|woff2?|ttf|eot)$/i,
            loaders: ['file-loader?name=content/fonts/[name].[ext]']
        },
        {
            test: /manifest.webapp$/,
            loader: 'file-loader?name=manifest.webapp!web-app-manifest-loader'
        },
        {
            test: /app.constants.js$/,
            loader: StringReplacePlugin.replace({
                replacements: [{
                    pattern: /\/\* @toreplace (\w*?) \*\//ig,
                    replacement: (match, p1, offset, string) => `_${p1} = ${DATAS[p1]};`
                }]
            })
        },
        {test: require.resolve("jquery"), loader: "expose-loader?$!expose-loader?jQuery"}
    ],
};
