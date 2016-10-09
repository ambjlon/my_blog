//参考翻页js写的
$(document).ready(function() {
    processClick();
});
// function GetQueryString(src, name)
// {
//     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
//     var r = src.substr(1).match(reg);
//     if(r != null){
//         return  r[2];
//     }
//     return null;
// }

function processClick(){    
    //更新了clicks class所在的div. 在搜索引擎搜索"jquery on live 未来元素"
    //参考:http://www.jb51.net/article/79694.htm 主要是使用$(document).on这种形式进行监听
    $(document).on('click', ".clicks", function(event){//异步事件监听, 类似linux的io复用
        event.preventDefault();

        var goHref = $(this).attr("href").replace('posts', 'async_rightpage');
        // var cate = GetQueryString(goHref, 'cate') == null ? 'isnull' : GetQueryString(goHref, 'cate');
        // var tag = GetQueryString(goHref, 'tag') == null ? 'isnull' : GetQueryString(goHref, 'tag');
        
        $.get(goHref, function(data,status){
            //修改DOM中的文章列表
            //replaceWith比html()要好. html()会在3/4中再划出3/4...
            $("#rightpage").replaceWith(data);
            window.history.pushState({data:data}, 'something', goHref.replace('async_rightpage', 'posts'));
        });

        // var pageHtml = document.getElementById("paging").outerHTML;
        // pageHtml = pageHtml.replace(/actpage="[0-9]*"/, "actpage=\"1\"");
        // pageHtml = pageHtml.replace(/cate=[^&]*&/, "cate=" + cate + "&");
        // pageHtml = pageHtml.replace(/tag=[^&]*&/, "tag=" + tag + "&");
        // $("#paging").replaceWith(pageHtml);
        return false;
    });
    
    $(window).bind("popstate", function(){
        $("#rightpage").replaceWith(history.state.data);
    });
}
