/**
 * Created by GOLDG on 2017/5/23.
 */
var fs = require("fs");

var common = require("../cores/CommonBean.js");

var downloadUtil = require("../cores/DownloadUtil.js");

//获取任务列表信息
var getCurrentTaskListInfo = function() {
    var taskList = common.downloadInfo;
    taskList.forEach(function(item) {
        item.status = common.statusCode[item.status];
        item.size = fs.statSync(common.configs.SAVEPATH + item.fileName).size;
        item.progress = Math.round(fs.statSync(common.configs.SAVEPATH + item.fileName).size/this.allSize*10000)/100.00+'%';
    });
    return taskList;
}

//暂停任务操作
var taskPause = function(index) {
    var obj = common.taskList[index];
    obj.pauseOpr();
}

//开始暂停中的任务
var startTask = function (index) {
    downloadUtil.startTask(index);
}

exports.getCurrentTaskListInfo = getCurrentTaskListInfo;

exports.taskPause = taskPause;

exports.startTask = startTask;