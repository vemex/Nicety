/**
 * 全局的公共常量配置
 */
const StringReplacePlugin = require('string-replace-webpack-plugin');
const utils=require('../utils.js');

module.exports = function (option) {
    let DATAS = {
        VERSION: `'${utils.parseVersion()}'`,
        DEBUG_INFO_ENABLED: option.env === 'development',
        SERVER_API_URL: `"${option.apiUrl}"`
    };
    return {
        module: {
            rules: [
                {
                    test: /app.constants.js$/,
                    loader: StringReplacePlugin.replace({
                        replacements: [{
                            pattern: /\/\* @toreplace (\w*?) \*\//ig,
                            replacement: (match, p1, offset, string) => `_${p1} = ${DATAS[p1]};`
                        }]
                    })
                }
            ]
        },
        plugins: [
            new StringReplacePlugin()
        ]

    };
};