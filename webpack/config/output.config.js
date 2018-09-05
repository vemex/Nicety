var dirVars = require('./base/dir-vars.config.js');
const utils = require('../utils.js');


let outPath =  dirVars.runDir;

let doBuildConfig = function(option) {
};

let doProdConfig = function(option) {
    outPath=dirVars.buildDir

};

let doDevConfig = function(option) {
    outPath=dirVars.runDir
};

module.exports = function (option) {
    utils.checkEnvironment(option, doDevConfig, doProdConfig, doBuildConfig);
    return {
        output: {
            path: outPath,
            filename: 'app/[name].bundle.js',
            chunkFilename: 'app/[id].chunk.js'
            // path: dirVars.buildDir,
            // publicPath: '/',
            // filename: '[name]/entry.[chunkhash].js',    // [name]表示entry每一项中的key，用以批量指定生成后文件的名称
            // chunkFilename: '[id].[chunkhash].bundle.js',
        }
    }
};
