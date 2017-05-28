/**
 * Created by ranyuxiong on 2017/5/23.
 * 日志工具
 */
var fs = require("fs");

var logPath = "public/log.log";

var writeLogMsg = function(msg) {
    var myDate = new Date();
    var msg = myDate.toLocaleDateString()+" "+myDate.toLocaleTimeString()+">>>>>>"+msg+"\r\n";
    console.log(msg);
    fs.appendFileSync(logPath,msg);
}

exports.writeLogMsg = writeLogMsg;


/*******TEST*******/
writeLogMsg("测试信息");

