/**
 * Created by GOLDG on 2017/5/24.
 */

var downloadUtil = require("../cores/DownloadUtil.js");

var common = require("../cores/CommonBean.js");

//新增下载任务
var addTask = function(taskName, downloadPath, fileName) {
    if(common.taskList.length<common.configs.TASKMAX) {
        downloadUtil.createTask(taskName, downloadPath, fileName);
    } else {
        return "超出最大任务数！";
    }
}

exports.addTask = addTask;