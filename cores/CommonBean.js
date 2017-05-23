/**
 * Created by ranyuxiong on 2017/5/22.
 * 公共变量
 */
var fs = require("fs");

//配置文件地址
var configsPath = "../public/configs/configs.json";

var downloadInfoPath = "../public/dbs/dbs.json";

//读取配置文件
var readConfigs = function() {
    return JSON.parse(fs.readFileSync(configsPath));
}

//读取信息文件
var readDownloadInfo = function() {
    return JSON.parse(fs.readFileSync(downloadInfoPath));
}

//复写配置文件
var writeConfigs = function() {
    fs.writeFileSync(configsPath, JSON.stringify(configs));
}

//复写信息文件
var writeDownloadInfo = function() {
    fs.writeFileSync(downloadInfoPath, JSON.stringify(downloadInfo));
}

//配置信息
var configs = readConfigs();

/**
 * 下载相关信息
 * 系统启动时从数据文件固化到内存
 * 该对象信息变更同步更新数据文件
 * */
var downloadInfo = readDownloadInfo();

//校验数据有无重复
var checkRepeat = function(obj) {
    downloadInfo.forEach(function(item) {
        if(obj.fileName == item.fileName) {
            return "存在相同的文件名称，是否继续？";
        }
        if(obj.downloadPath == item.downloadPath) {
            return "存在相同的下载任务，是否继续？";
        }
    });
    return "";
}

var statusCode = {
    1:"下载中",2:"暂停中",3:"下载完成",4:"下载错误"
};

//运行中的任务对象队列
var taskList = [];

exports.configs = configs;

exports.downloadInfo = downloadInfo;

exports.readConfigs = readConfigs;

exports.readDownloadInfo = readDownloadInfo;

exports.writeConfigs = writeConfigs;

exports.writeDownloadInfo = writeDownloadInfo;

exports.taskList = taskList;

exports.checkRepeat = checkRepeat;

exports.statusCode = statusCode;

/********TEST********/
checkRepeat({infos:"sdfrsadf"});



