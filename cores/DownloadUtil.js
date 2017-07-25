/**
 * Created by ranyuxiong on 2017/5/22.
 * 下载功能核心
 */
var request = require("request");
var log = require("./LogTool.js");

var common = require("./CommonBean.js");

var fs = require("fs");

/**
 * 下载信息对象
 * index 序列号
 * taskName 任务名称
 * downloadPath 下载地址
 * filePath 文件保存地址
 * fileName 文件名称
 * status 下载状态
 * size 文件大小
 * allSize 文件总大小
 * progress 进度
 * createDate 创建时间
 * */
function DownloadInfoBean(index, taskName, downloadPath, filePath, fileName, status, size, allSize, progress, createDate) {

    this.index = index;// 序列号

    this.taskName = taskName;//任务名称

    this.downloadPath = downloadPath;//下载地址

    this.filePath = filePath;//文件保存地址

    this.fileName = fileName;//文件名称

    this.status = status;//下载状态

    this.size = size;//文件大小

    this.allSize = allSize;//文件总大小

    this.progress = progress;//进度

    this.createDate = createDate;//创建时间

}

//下载操作对象
function DownloadBean(info) {

    this.info = info;

    this.req = null;

    //初始化下载信息并开始下载
    this.start = function() {
        common.taskList[this.info.index] = this;
        if(0 < this.info.allSize) {
            log.writeLogMsg('下载任务['+this.info.index+':'+this.info.taskName+']开始下载！');
        } else {
            log.writeLogMsg('下载任务['+this.info.index+':'+this.info.taskName+']继续下载！');
        }
        var reqCallback = function(response) {
            log.writeLogMsg('当前请求数据总大小:'+response['headers']['content-length']);
            if(0 == common.taskList[info.index].info.allSize) {
                common.taskList[info.index].info.allSize = response['headers']['content-length'];
                common.taskList[info.index].infoOpr();
            }
        }
        var endCallback = function() {
            log.writeLogMsg('下载任务['+common.taskList[info.index].info.index+':'+common.taskList[info.index].info.taskName+']已下载完成并结束！:');
            common.taskList[info.index].info.status = common.configs.STATUS.END;
            common.taskList[info.index].infoOpr();
            delete common.taskList[info.index];
        };
        var abortCallback = function() {
            log.writeLogMsg('下载任务['+common.taskList[info.index].info.index+':'+common.taskList[info.index].info.taskName+']已暂停下载！');
            common.taskList[info.index].info.status = common.configs.STATUS.PAUSE;
        };
        common.taskList[info.index].infoOpr();
        var options = this.createReqOptions();
        this.req = request(options[0]);
        this.req.on('response', reqCallback);
        this.req.on('end',endCallback);
        this.req.on('abort',abortCallback);
        this.req.pipe(fs.createWriteStream(common.configs.SAVEPATH + this.info.fileName, options[1]));
    }

    //暂停操作
    this.pauseOpr = function() {
        this.req.abort();
    }

    //下载信息操作
    this.infoOpr = function() {
        var info = createdDownloadInfo(this.info);
        for(var i = 0;i<common.downloadInfo.length;i++) {
            if(common.downloadInfo[i].index == info.index) {
                common.downloadInfo[i] = info;
            }
        }
        common.writeDownloadInfo();
    }

    //创建请求与写文件参数
    this.createReqOptions = function() {
        var options = [];
        var optionReq = {
            url:this.info.downloadPath
        };
        var startSeq = 0;
        var option={};
        if(0 < this.info.allSize) {
            if(fs.existsSync(common.configs.SAVEPATH + this.info.fileName)) {
                startSeq = fs.statSync(common.configs.SAVEPATH + this.info.fileName).size;
            } else {
                startSeq = 0;
            }
            optionReq.headers = {'Range':'bytes='+startSeq+'-'};
            option = {flags:'r+', start:startSeq};
        }
        options[0] = optionReq;
        options[1] = option;
        return options;
    }
}

//创建数据记录
var createdDownloadInfo = function(obj) {
    var info = {
        index:obj.index,
        taskName:obj.taskName,
        downloadPath:obj.downloadPath,
        filePath:obj.filePath,
        fileName:obj.fileName,
        status:obj.status,
        size:obj.size,
        allSize:obj.allSize,
        progress:obj.progress?obj.progress:'0.00%',
        createDate:obj.createDate
    }
    return info;
}

//创建并开始下载任务
var createTask = function (taskName, downloadPath, fileName) {
    var index = common.downloadInfo.length;
    var myDate = new Date();
    var obj = new DownloadInfoBean(index, taskName, downloadPath, common.configs.SAVEPATH, fileName, common.configs.STATUS.RUNNING, 0, 0, "0.00%", myDate.toLocaleDateString()+" "+myDate.toLocaleTimeString());
    var infoBean = createdDownloadInfo(obj);
    common.downloadInfo[common.downloadInfo.length] = infoBean;
    common.writeDownloadInfo();
    var operBean = new DownloadBean(obj);
    operBean.start();
}

//开始暂停中的任务
var startTask = function(index) {
    common.downloadInfo.forEach(function(item) {
        if(item.index == index) {
            var progress = Math.round(fs.statSync(item.filePath + item.fileName).size/item.allSize*10000)/100.00+'%';
            var obj = new DownloadInfoBean(item.index, item.taskName, item.downloadPath, item.filePath, item.fileName, item.status, item.size, item.allSize, progress, item.createDate);
            var operBean = new DownloadBean(obj);
            operBean.start();
            return;
        }
    });
}

var delTask = function(index) {
    for(var i = 0;i<common.downloadInfo.length;i++) {
        var obj = common.downloadInfo[i];
        if(obj.index == index) {
            if(fs.existsSync(obj.filePath + obj.fileName)) {
                fs.unlinkSync(obj.filePath + obj.fileName);
            }
            common.downloadInfo.splice(i-1,1);
            common.writeDownloadInfo();
            return;
        }
    }
}

exports.createTask = createTask;

exports.startTask = startTask;

exports.delTask = delTask;

/***********TEST***********/
function test() {
    var testObj = {};

    testObj["name"] = "testName";

    testObj["num"] = "123456";

    console.log(testObj["name"]);

    delete testObj["name"];

    console.log(testObj["name"]);
}