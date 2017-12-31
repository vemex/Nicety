/**
 * 使用外部库
 *
 */

module.exports = function () {
    return {
        externals: {
            jquery: 'window.jQuery',
            echarts:'window.echarts'
        }
    };
};
