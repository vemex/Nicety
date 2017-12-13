let path = require('path');
let utils=require('../../utils');
let moduleExports = {};

// 源文件目录
moduleExports.rootDir = utils.root('./'); // 项目根目录

moduleExports.libDir = utils.root('./node_modules'); // 项目根目录


/*开发目录配置*/
moduleExports.srcRootDir = path.resolve(moduleExports.rootDir, './src'); // 开发bootstrap库
moduleExports.srcContentDir = path.resolve(moduleExports.srcRootDir, './content'); // 开发bootstrap库 scss和fonts存放目录

/*测试项目目录设置*/
moduleExports.webappRootDir= path.resolve(moduleExports.rootDir, './webapp');//项目测试app
moduleExports.webappConetentDir= path.resolve(moduleExports.webappRootDir, './content');//项目scss代码目录
moduleExports.webappSrcDir= path.resolve(moduleExports.webappRootDir, './app');//项目js代码根目录
moduleExports.publicDir = path.resolve(moduleExports.webappRootDir, './public-resource'); // 存放各个页面使用到的公共资源
moduleExports.dllDir = path.resolve(moduleExports.webappRootDir, './dll'); // 存放由各种不常改变的js/css打包而来的dll

moduleExports.componentsDir = path.resolve(moduleExports.webappSrcDir, './components'); // 存放组件，可以是纯HTML，也可以包含js/css/image等，看自己需要
moduleExports.pagesDir = path.resolve(moduleExports.webappSrcDir, './pages'); // 存放各个页面独有的部分，如入口文件、只有该页面使用到的css、模板文件等


moduleExports.vendorDir = path.resolve(moduleExports.rootDir, './vendor'); // 存放所有不能用npm管理的第三方库


// moduleExports.logicDir = path.resolve(moduleExports.publicDir, './logic'); // 存放公用的业务逻辑
// moduleExports.libsDir = path.resolve(moduleExports.publicDir, './libs');  // 与业务逻辑无关的库都可以放到这里
// moduleExports.configDir = path.resolve(moduleExports.publicDir, './config'); // 存放各种配置文件
// moduleExports.layoutDir = path.resolve(moduleExports.publicDir, './layout'); // 存放UI布局，组织各个组件拼起来，因应需要可以有不同的布局套路

// 生成文件目录
moduleExports.buildDir = path.resolve(moduleExports.rootDir, './target/www'); // 存放编译后生成的所有代码、资源（图片、字体等，虽然只是简单的从源目录迁移过来）

module.exports = moduleExports;
