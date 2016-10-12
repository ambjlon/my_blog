//已经挪到ajax.js  这个文件废弃不用了.
//参考翻页js写的
$(document).ready(function() {
    $(document).on('click', ".postclicks", function(event){//异步事件监听, 类似linux的io复用
        event.preventDefault();

        var goHref = $(this).attr("href").replace('post', 'async_post');
        
        $.get(goHref, function(data,status){
            //修改DOM中的文章列表
            $("#rightpage").replaceWith(data);
            pageState = 4;
            historyOrder = maxHisrotyOrder + 1;
            maxHisrotyOrder = maxHisrotyOrder + 1;
            sessionStorage.setItem("maxHisrotyOrder", maxHisrotyOrder.toString());
            window.history.pushState({data:data, pageState:4, historyOrder:historyOrder}, 'something', goHref.replace('async_post', 'post'));
        });
        return false;
    });
});
