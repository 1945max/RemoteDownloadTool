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
                console.info('dfsdfsf');
                var stateId = "#state"+list[i].taskName;
                $(stateId).html(list[i].state);
                var sizeId = "#size"+list[i].taskName;
                $(sizeId).html(list[i].size+"/"+list[i].allSize);
                var progressId = "#progress"+list[i].taskName;
                $(progressId).css("width",list[i].progress);
            }
        }
    });
}