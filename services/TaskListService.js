/**
 * Created by GOLDG on 2017/5/23.
 */
var fs = require("fs");

var common = require("../cores/CommonBean.js");

var getCurrentTaskListInfo = function() {
    var taskList = common.downloadInfo;
    taskList.forEach(function(item) {
        item.status = common.statusCode[item.status];
        item.size = fs.statSync(common.configs.SAVEPATH + item.fileName).size;
        item.progress = ath.round(fs.statSync(common.configs.SAVEPATH + item.fileName).size/this.allSize*10000)/100.00+'%';
    });
    return taskList;
}
