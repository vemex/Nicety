const  utils=require( "../utils");
//const log=require('log')
let config = {};

let doProdConfig=function (option) {
    config={
        "a":"pro"
    };
    console.log(config)

};

let doBuildConfig=function (option) {
    config={
        "a":"build"

    };
    console.log(config)

};

let doDevConfig=function (option) {
    config={
        "a":"dev"

    };
    console.log(config)

};

module.exports =  function (option) {
    utils. checkEnviroment(option,doDevConfig,doProdConfig,doBuildConfig);
    return config;
};