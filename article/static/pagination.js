/* 
   this javascript is only to change the "actpage" attribut on the .cdp div
*/
//https://codepen.io/anon/pen/amLvaz
//http://www.qttc.net/201303292.html
//http://stackoverflow.com/questions/18976302/returning-rendered-html-via-ajax

//window.onload = function(){
//};
//翻页处理使用document.ready. 这样可以防止初始页面还没加载完, 点击翻页出现只显示异步返回结果.
$(document).ready(function() {
    //翻页相关的处理开始
    //翻页处理挪到这里. 这样可以防止初始页面还没加载完, 点击翻页出现只显示异步返回结果.

    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null){
            return  r[2];
        }
        return null;
    }
    
    var host = location.host;
    var page = GetQueryString('page') == null ? '1' : GetQueryString('page');
    var cate = GetQueryString('cate') == null ? 'isnull' : GetQueryString('cate');
    var tag = GetQueryString('tag') == null ? 'isnull' : GetQueryString('tag');


    //    $(".cdp_i").on('click', function(event){//异步时间监听, 类似linux的io复用
    $(document).on('click', ".cdp_i", function(event){//异步事件监听, 类似linux的io复用
        event.preventDefault();

        var actualPageNum = parseInt($('.cdp').attr('actpage'), 10);
        var pre = document.getElementById('pre');
        var next = document.getElementById('next');

        if ($(this).attr("id") === "next") {
            var goPageNum = actualPageNum + 1;
            var goHref = next.href.replace('posts', 'async_posts');
        } else if ($(this).attr("id") === "pre") {
            var goPageNum = actualPageNum - 1;
            var goHref = pre.href.replace('posts', 'async_posts');
        }else{
            var goPageNum = parseInt($(this).attr("href").split("page=")[1]);
            var goHref = $(this).attr("href").replace('posts', 'async_posts');
        }

        $.get(goHref, function(data,status){
            //修改DOM中的文章列表
            $("#asyncposts").html(data);
            //修改分页中的actualPage以及前后页
            $('.cdp').attr('actpage', goPageNum);
            pre.href = pre.href.split("page=")[0] + "page=" + (goPageNum - 1).toString();
            next.href = next.href.split("page=")[0] + "page=" + (goPageNum + 1).toString();
            window.history.pushState({data:data,goPageNum:goPageNum}, goPageNum, goHref.replace('async_posts', 'posts'));
        });
        return false;
    });
    
    $(window).bind("popstate", function(){
        $('.cdp').attr('actpage', history.state.goPageNum);
        $("#asyncposts").html(history.state.data);
    });//翻页相关处理结束

    //初次加载执行一次
    var initActualPageNum = parseInt($('.cdp').attr('actpage'), 10);//为毛还让我再写一遍  难道在onclick等后面原来的actualPageNum失效了?
    var initData = document.getElementById("asyncposts").outerHTML;
    
    window.history.replaceState({data:initData,goPageNum:initActualPageNum}, initActualPageNum, "/posts?cate=" + cate + "&tag=" + tag + "&page=" + page);

});
