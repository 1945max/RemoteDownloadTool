/**
 * Created by GOLDG on 2017/5/24.
 */

var taskListService = require("../services/TaskListService");

//获取任务列表信息
var getCurrentTaskListInfo = function() {
    return taskListService.getCurrentTaskListInfo();
}

//暂停任务操作
var taskPause = function(index) {
    taskListService.taskPause(index);
    return true;
}

//开始暂停中的任务
var startTask = function (index) {
    taskListService.startTask(index);
    return true;
}

//删除任务操作
var delTask= function(index) {
    taskListService.delTask(index);
    return true;
}

exports.taskListInfoContr = getCurrentTaskListInfo;

exports.taskPauseContr = taskPause;

exports.startTaskContr = startTask;

exports.delTaskContr = delTask;