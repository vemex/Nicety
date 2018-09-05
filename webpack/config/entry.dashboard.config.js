const path = require('path');
const dirVars = require('./base/dir-vars.config.js');
var configEntry = {};

module.exports = function() {
    return {
        entry: {
            polyfills: './app/polyfills', //兼容处理js
            main: './app/app.dashboard.main', //主入口程序
            global: './public/content/scss/global.scss' //全局的scss
        }
    };
};