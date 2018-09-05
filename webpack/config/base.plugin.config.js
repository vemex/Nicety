const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dirVars = require('./base/dir-vars.config');

const  utils=require( "../utils");

let needMinify=false;
let needShowErrors=true;
let doProdConfig=function (option) {
    needMinify=true;
    needShowErrors=false;
};

let doBuildConfig=function (option) {
    needMinify=true;
    needShowErrors=false;
};

let doDevConfig=function (option) {
    needShowErrors=true;
    needMinify=false;
};

module.exports = function(option) {
    utils.checkEnvironment(option,doDevConfig,doProdConfig,doBuildConfig);
    return {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(option.env)
                }
            }),
            new CopyWebpackPlugin([
                { from: dirVars.publicDir+"/api", to: 'api' },
                { from: dirVars.libDir + '/jquery/dist/jquery.min.js', to: 'libs/jquery.min.js' },
                { from: dirVars.libDir + '/echarts/dist/echarts.js', to: 'libs/echarts.js' },
                { from: dirVars.libDir + '/metismenu/dist/metisMenu.js', to: 'libs/metisMenu.js' },
                { from: dirVars.libDir + '/metismenu/dist/metisMenu.css', to: 'libs/styles/metisMenu.css' },
                { from: dirVars.libDir + '/popper.js/dist/umd/popper.min.js', to: 'libs/popper.min.js' },
                { from: dirVars.libDir + '/highcharts/highcharts.js', to: 'libs/highcharts.min.js' },
                { from: dirVars.libDir + '/highcharts/themes/grid-light.js', to: 'libs/themes/grid-light.min.js' },
                { from: dirVars.libDir + '/bootstrap/dist/js/bootstrap.min.js', to: 'libs/bootstrap.min.js' }

            ]),
            new MergeJsonWebpackPlugin({
                output: {
                    groupBy: [
                        { pattern: "./app/i18n/en-us/*.json", fileName: "./i18n/en-us.json" },
                        { pattern: "./app/i18n/zh-cn/*.json", fileName: "./i18n/zh-cn.json" }
                    ]
                }
            }),
            new HtmlWebpackPlugin({//生成html入口文件
                filename : 'index.html',//输出的html路径
                template:dirVars.publicDir+ '/index.html',
                chunksSortMode: 'dependency',
                inject: 'body',
                favicon:dirVars.publicDir+'/favicon.ico',
                minify:needMinify,
                showErrors:needShowErrors,
                chunks:["main","vendor","polyfills"]
            })
        ]
    }
};