const fs = require('fs');
const path = require('path');
const _root = path.resolve(__dirname, '..');//开发根目录


/**
 * 提取packages.json中版本信息
 * @returns {String|string|*|string|number}
 */
function parseVersion() {
    var file = "./package.json";
    var result = JSON.parse(fs.readFileSync(file));
    return result.version;
}

/**
 * 根据传入的相对目录生成绝对目录
 * @param args 传入的相对目录
 * @returns {*|string} 绝对目录
 */
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

/**
 * 判断是否为外部库
 * @param module 库名称
 * @param check 库目录
 * @returns {boolean} 是否为外部库
 */
function isExternalLib(module, check = /node_modules/) {
    const req = module.userRequest;
    if (typeof req !== 'string') {
        return false;
    }
    return req.search(check) >= 0;
}

/**
 * 判断是否为开发环境
 * @param option 环境上下文
 * @returns {boolean}
 */
function isDevEnvironment(option) {
    return option.env === "development";
}

/**
 * 判断是否生产环境
 * @param option 环境上下文
 * @returns {boolean}
 */
function isProductEnvironment(option) {
    return option.env === "production";
}

/**
 * 判断是否为构建环境
 * @param option 环境上下文
 * @returns {boolean}
 */
function isBuildEnvironment(option) {
    return option.env === "build";
}


/**
 * 检查环境
 * @param option 环境上下文
 * @param dev 开发环境回掉
 * @param prod 生产环境回掉
 * @param build 构建环境回掉
 */
function checkEnvironment(option, dev, prod, build) {
    if (isBuildEnvironment(option)) {
        build(option);
        return;
    }

    if (isProductEnvironment(option)) {
        prod(option);
        return;
    }

    if (isDevEnvironment(option)) {
        dev(option);
    }
}

module.exports = {
    parseVersion,
    root,
    isExternalLib,
    checkEnvironment
};
