/**
 * Created by GOLDG on 2017/5/28.
 */
$(function() {
    var id = setInterval(function() {
        getStateInfo();
    },3000);
})

function getStateInfo() {
    $.ajax({
        url:'/getCurrentInfo',
        dataType:'json',
        success:function (data) {
            var list = data.listInfo;
            for(var i=0;i<list.length;i++) {
                var stateId = "state"+list[i].taskName;
                $("#"+stateId).html(list[i].status);
                var sizeId = "size"+list[i].taskName;
                $("#"+sizeId).html(list[i].size+"/"+list[i].allSize);
                var progressId = "progress"+list[i].taskName;
                $("#"+progressId).css("width",list[i].progress);
                console.info(stateId+"|"+sizeId+"|"+progressId);
            }
        }
    });
}

function runOrPause(index) {
    var runFlag = $("#runOrPauseBtn").attr("name");
    runFlag = parseInt(runFlag);
    var url;
    switch (runFlag) {
        case 0:$("#runOrPauseBtn").attr("name",1);$("#runOrPauseBtn").text("开始");url="/run";break;
        case 1:$("#runOrPauseBtn").attr("name",0);$("#runOrPauseBtn").text("暂停");url="/pause";break;
        default:$("#runOrPauseBtn").attr("name",0);$("#runOrPauseBtn").text("暂停");url="/pause";
    }
    $.ajax({
        url:url,
        type:'post',
        data:{index:index}
    });
}

function del(index) {
    $.ajax({
        url:'/del',
        type:'post',
        data:{index:index}
    });
    $("#panel"+index).remove();
}