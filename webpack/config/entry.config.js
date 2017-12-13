const path = require('path');
const dirVars = require('./base/dir-vars.config.js');
var configEntry = {};

module.exports = function () {
    return {
        entry: {
            main: './webapp/app/app.main',//主入口程序
            polyfills: './webapp/app/polyfills',//兼容处理js
            global: './webapp/content/scss/global.scss'//全局的scss
        }
    };
};
