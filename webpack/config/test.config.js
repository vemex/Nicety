const  utils=require( "../utils");
//const log=require('log')
let config = {};

let buildProdConfig=function (option) {
    config={
        "a":"pro"
    };
    console.log(config)

};

let buildBuildConfig=function (option) {
    config={
        "a":"build"

    };
    console.log(config)

};

let buildDevConfig=function (option) {
    config={
        "a":"dev"

    };
    console.log(config)

};

module.exports =  function (option) {
    utils. checkEnviroment(option,buildDevConfig,buildProdConfig,buildBuildConfig);
    return config;
};