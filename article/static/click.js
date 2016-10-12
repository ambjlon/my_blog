//已经挪到ajax.js, 这个文件已经废弃.
//参考翻页js写的
$(document).ready(function() {
    processClick();
});
function processClick(){    
    //更新了clicks class所在的div. 在搜索引擎搜索"jquery on live 未来元素"
    //参考:http://www.jb51.net/article/79694.htm 主要是使用$(document).on这种形式进行监听
    $(document).on('click', ".clicks", function(event){//异步事件监听, 类似linux的io复用
        event.preventDefault();

        var goHref = $(this).attr("href").replace('posts', 'async_rightpage');
        // var page = GetQueryString('page') == null ? '1' : GetQueryString('page');
        // var cate = GetQueryString(goHref, 'cate') == null ? 'isnull' : GetQueryString(goHref, 'cate');
        // var tag = GetQueryString(goHref, 'tag') == null ? 'isnull' : GetQueryString(goHref, 'tag');
        
        $.get(goHref, function(data,status){
            //修改DOM中的文章列表
            //replaceWith比html()要好. html()会在3/4中再划出3/4...
            $("#rightpage").replaceWith(data);
            pageState = 2;
            historyOrder = maxHisrotyOrder + 1;
            maxHisrotyOrder = maxHisrotyOrder + 1;
            sessionStorage.setItem("maxHisrotyOrder", maxHisrotyOrder.toString());
            window.history.pushState({data:data, pageState:2, historyOrder:historyOrder}, 'something', goHref.replace('async_rightpage', 'posts'));
        });

        // var pageHtml = document.getElementById("paging").outerHTML;
        // pageHtml = pageHtml.replace(/actpage="[0-9]*"/, "actpage=\"1\"");
        // pageHtml = pageHtml.replace(/cate=[^&]*&/, "cate=" + cate + "&");
        // pageHtml = pageHtml.replace(/tag=[^&]*&/, "tag=" + tag + "&");
        // $("#paging").replaceWith(pageHtml);
        return false;
    });
    
    // $(window).bind("popstate", function(){
    //     $("#rightpage").replaceWith(history.state.data);
    // });

    // var initData = document.getElementById("rightpage").outerHTML;
    // var paging = document.getElementById("paging").outerHTML;
    
    // window.history.replaceState({data:initData}, "something", "/posts?cate=" + cate + "&tag=" + tag + "&page=" + page);
}
