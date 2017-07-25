/**
 * Created by GOLDG on 2017/5/23.
 */
var fs = require("fs");

var common = require("../cores/CommonBean.js");

var downloadUtil = require("../cores/DownloadUtil.js");

//获取任务列表信息
var getCurrentTaskListInfo = function() {
    var taskList = common.readDownloadInfo();
    taskList.forEach(function(item) {
        var filePah = common.configs.SAVEPATH + item.fileName;
        if(!fs.existsSync(filePah)) {
            item.status = common.statusCode[0];
            item.size = 0;
            item.progress = '0.00%';
        } else {
            var stateInfo = fs.statSync(filePah);
            if(stateInfo) {
                item.status = common.statusCode[item.status];
                item.size = stateInfo.size;
                item.progress = Math.round(stateInfo.size/item.allSize*10000)/100.00+'%';
            } else {
                item.status = common.statusCode[1];
                item.size = 0;
                item.progress = '0.00%';
            }
        }
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

//删除任务操作
var delTask = function(index) {
    downloadUtil.delTask(index);
}

exports.getCurrentTaskListInfo = getCurrentTaskListInfo;

exports.taskPause = taskPause;

exports.startTask = startTask;

exports.delTask = delTask;