/**
 * Created by GOLDG on 2017/5/24.
 */

var addTaskService = require("../services/AddTaskService");


//新增下载任务
var addTask = function(taskName, downloadPath, fileName) {
    var msg = addTaskService.addTask(taskName, downloadPath, fileName);
    if(msg) {
        return msg;
    }
    return "";
}

exports.addTaskContr = addTask