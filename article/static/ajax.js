/* 
   this javascript is only to change the "actpage" attrib/ut on the .cdp div
*/
//https://codepen.io/anon/pen/amLvaz
//http://www.qttc.net/201303292.html
//http://stackoverflow.com/questions/18976302/returning-rendered-html-via-ajax

//window.onload = function(){
//};
//翻页处理使用document.ready. 这样可以防止初始页面还没加载完, 点击翻页出现只显示异步返回结果.

//当前页面状态编号pageState
//0:初始同步获取的posts列表页面
//1:初始同步获取的post页面
//2:点击文章类目或标签, 异步获取posts列表页面. 同时更新了文章列表区域和页码区域.
//3:点击页码, 异步获取的post list页面.
//4:点击文章链接, 异步获取的post页面.
//当前页面在历史记录栈中的序号historyOrder. 全局变量, 用来判断是点击了前进按钮还是后退按钮. maxHisrotyOrder表示目前已经分发的order的最大值. maxHisrotyOrder的初始值为-1.
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null){
        return  r[2];
    }
    return null;
}

$(document).ready(function() {
    //新页面加载的附近(调用document.ready) chrome浏览器点击回退或者前进按钮不会触发popstate, 其他浏览器大多是没问题的.
    //目前暂时把页面上的链接都换成了异步加载, 避免用户点击同步链接.
    var alen = history.length;
    //alert(alen);
    //history.go(-(alen-2)); //页面不断刷新  出现了死循环.
    //    history.go(-alen+1);
    //return;

    //翻页相关的处理开始
    //翻页处理挪到这里. 这样可以防止初始页面还没加载完, 点击翻页出现只显示异步返回结果.
    //不使用var定义, 这是全局变量.
    pageState = -1;
    historyOrder = -1;
    //sessionStorage只在当前标签页面有效, 载入新的页面这个值也不会消失.
    maxHisrotyOrder = sessionStorage.getItem("maxHisrotyOrder") == null ? -1 : parseInt(sessionStorage.getItem("maxHisrotyOrder"));
    
    var pathname  = location.pathname;
    var href = location.href;
    //初次加载执行一次
    historyOrder = maxHisrotyOrder + 1;
    maxHisrotyOrder = maxHisrotyOrder + 1;
    sessionStorage.setItem("maxHisrotyOrder", maxHisrotyOrder.toString());
    if(pathname == "/posts" || pathname == "/"){
        pageState = 0;
        var page = GetQueryString('page') == null ? '1' : GetQueryString('page');
        var cate = GetQueryString('cate') == null ? 'isnull' : GetQueryString('cate');
        var tag = GetQueryString('tag') == null ? 'isnull' : GetQueryString('tag');
        var actualPageNum = parseInt($('.cdp').attr('actpage'), 10);//为毛还让我再写一遍  难道在onclick等后面原来的actualPageNum失效了?
        var asyncposts = document.getElementById("asyncposts").outerHTML;
        var paging = document.getElementById("paging").outerHTML;
        var rightpage = document.getElementById("rightpage").outerHTML;
        window.history.replaceState({rightpage:rightpage, asyncposts:asyncposts, paging:paging, goPageNum:actualPageNum, pageState:0, historyOrder:historyOrder}, "Ambjlon blog", "/posts?cate=" + cate + "&tag=" + tag + "&page=" + page);
    }else if(pathname == "/post"){
        pageState = 1;
        var asyncposts= document.getElementById("asyncposts").outerHTML;
        window.history.replaceState({asyncposts:asyncposts, pageState:1, historyOrder:historyOrder}, "Ambjlon blog", href);
    }
    //监听对翻页页码的点击
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
        
        //TODO 判断是否重复点击某个页码多次, 从而对进入访问记录栈的条目进行去重
        
        $.get(goHref, function(data,status){
            //修改DOM中的文章列表
            $("#asyncposts").replaceWith(data);
            //修改分页中的actualPage以及前后页
            $('.cdp').attr('actpage', goPageNum);
            pre.href = pre.href.split("page=")[0] + "page=" + (goPageNum - 1).toString();
            next.href = next.href.split("page=")[0] + "page=" + (goPageNum + 1).toString();
            pageState = 3;
            historyOrder = maxHisrotyOrder + 1;
            maxHisrotyOrder = maxHisrotyOrder + 1;
            sessionStorage.setItem("maxHisrotyOrder", maxHisrotyOrder.toString());
            var paging = document.getElementById("paging").outerHTML;
            var rightpage = document.getElementById("rightpage").outerHTML;
            window.history.pushState({asyncposts:data, rightpage:rightpage, paging:paging, goPageNum:goPageNum, pageState:3, historyOrder:historyOrder}, "Ambjlon blog", goHref.replace('async_posts', 'posts'));
        });
        return false;
    });

    //监听对文章的点击
    $(document).on('click', ".postclicks", function(event){
        event.preventDefault();
        var goHref = $(this).attr("href").replace('post', 'async_post');    
        $.get(goHref, function(data,status){
            //修改DOM中的文章列表
            $("#rightpage").replaceWith(data);
            pageState = 4;
            historyOrder = maxHisrotyOrder + 1;
            maxHisrotyOrder = maxHisrotyOrder + 1;
            sessionStorage.setItem("maxHisrotyOrder", maxHisrotyOrder.toString());
            window.history.pushState({rightpage:data, pageState:4, historyOrder:historyOrder}, 'Ambjlon blog', goHref.replace('async_post', 'post'));
            //多说公共JS代码 start  参考:http://dev.duoshuo.com/docs/50b344447f32d30066000147
            //把多说的渲染放到这里是再合适不过了, 保证了comment-box div加载后再进行渲染. timeout可以设置成0~~
            var id = location.href.split("=")[1];
            var href = location.href;
            setTimeout(function(){
                var el = document.createElement('div');
                el.setAttribute('data-thread-key', id);
                el.setAttribute('data-url', 'http://' + location.host + href);
                DUOSHUO.EmbedThread(el);
                jQuery('#comment-box').append(el);
            },1);
            //多说公共JS代码 end
        });
        //使用ajax请求到的内容可能需要动态渲染一下, 比如请求会的文章中含有latex格式的公式, 需要mathjax渲染. 
        //$.getScript("http://v2.uyan.cc/code/uyan.js?uid=2116479");
        //异步加载需要调用js渲染latex公式 开始. 这里为ajax请求的内容中含有动态(js代码)提供了一种解决途径.
        $.getScript("http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML", function(){
            //必须得等到上面的$.get执行完了即#rightpage更新完毕了才执行mathjax的渲染, 不然的话渲染找不到letax公式.
            //实际上$.get和.getScript是同时执行的, 并不是串行. 套路真多呀~
            //设置一个超时时间, 足够.get执行完毕, 获得#rightpage. 比如下面设置成1.5秒吧.
            //第一次点击文章 执行这段代码的时候 超时并不生效 这是为什么?
            //折腾了一个小时终于发现了这个秘密. God forgive me for my sins! Bless.
            setTimeout(function(){
                MathJax.Hub.Config({
                    tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]}
                });
                var math = document.getElementById("rightpage");
                MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]);
	        },1100);
        });
        //异步加载需要调用js渲染latex公式 结束
        return false;
    });

    //监听对类目或者标签的点击
    $(document).on('click', ".catetagclicks", function(event){//异步事件监听, 类似linux的io复用
        event.preventDefault();
        var goHref = $(this).attr("href").replace('posts', 'async_rightpage');        
        $.get(goHref, function(data,status){
            //修改DOM中的文章列表
            //replaceWith比html()要好. html()会在3/4中再划出3/4...
            $("#rightpage").replaceWith(data);
            pageState = 2;
            historyOrder = maxHisrotyOrder + 1;
            maxHisrotyOrder = maxHisrotyOrder + 1;
            sessionStorage.setItem("maxHisrotyOrder", maxHisrotyOrder.toString());
            window.history.pushState({rightpage:data, pageState:2, historyOrder:historyOrder}, 'Ambjlon blog', goHref.replace('async_rightpage', 'posts'));
        });
        return false;
    });


    //$(window).bind("popstate", function(){
    //window.onpopstate =
    window.addEventListener('popstate',function(event){
        //状态机
        switch (pageState)
        {
            case 0://当前页面处于0状态, 然后用户点击了前进或后退按钮.
            if(historyOrder < parseInt(history.state.historyOrder)){//用户点击了前进按钮
                if(history.state.pageState == '2'){
                    $("#rightpage").replaceWith(history.state.rightpage);
                }else if(history.state.pageState == '3'){
                    $("#asyncposts").replaceWith(history.state.asyncposts);
                    $('.cdp').attr('actpage', history.state.goPageNum);
                }else if(history.state.pageState == '4'){
                    $("#rightpage").replaceWith(history.state.rightpage);
                }
            }else{//用户点击了后退按钮
                if(history.state.pageState == '2'){
                    $("#rightpage").replaceWith(history.state.rightpage);
                }else if(history.state.pageState == '3'){
                    $("#asyncposts").replaceWith(history.state.asyncposts);
                    $("#paging").replaceWith(history.state.paging);
                }else if(history.state.pageState == '4'){
                    $("#rightpage").replaceWith(history.state.rightpage);
                }
            }
            break;
            
            case 1:
            if(historyOrder < parseInt(history.state.historyOrder)){//用户点击了前进按钮
                if(history.state.pageState == '2'){
                    $("#rightpage").replaceWith(history.state.rightpage);
                }
            }else{//用户点击了后退按钮
                if(history.state.pageState == '2'){
                    $("#rightpage").replaceWith(history.state.rightpage);
                }else if(history.state.pageState == '3'){
                    $("#asyncposts").replaceWith(history.state.asyncposts);
                    $("#paging").replaceWith(history.state.paging);
                }
            }
            break;

            case 2:
            if(historyOrder < parseInt(history.state.historyOrder)){//用户点击了前进按钮
                if(history.state.pageState == '0'){
                    $("#rightpage").replaceWith(history.state.rightpage);
                }else if(history.state.pageState == '2'){
                    $("#rightpage").replaceWith(history.state.rightpage);
                }else if(history.state.pageState == '3'){
                    $("#asyncposts").replaceWith(history.state.asyncposts);
                    $('.cdp').attr('actpage', history.state.goPageNum);
                }else if(history.state.pageState == '4'){
                    $("#rightpage").replaceWith(history.state.rightpage);
                }
            }else{//用户点击了后退按钮
                if(history.state.pageState == '0'){
                    $("#rightpage").replaceWith(history.state.rightpage);
                }else if(history.state.pageState == '2'){
                    $("#rightpage").replaceWith(history.state.rightpage);
                }else if(history.state.pageState == '3'){
                    $("#asyncposts").replaceWith(history.state.asyncposts);
                    $("#paging").replaceWith(history.state.paging);
                }else if(history.state.pageState == '4'){
                    $("#rightpage").replaceWith(history.state.rightpage);
                }
            }
            break;

            case 3:
            if(historyOrder < parseInt(history.state.historyOrder)){//用户点击了前进按钮
                if(history.state.pageState == '2'){
                    $("#rightpage").replaceWith(history.state.rightpage);
                }else if(history.state.pageState == '3'){
                    $("#asyncposts").replaceWith(history.state.asyncposts);
                    $('.cdp').attr('actpage', history.state.goPageNum);
                }else if(history.state.pageState == '4'){
                    $("#rightpage").replaceWith(history.state.rightpage);
                }
            }else{//用户点击了后退按钮
                if(history.state.pageState == '0'){
                    $("#asyncposts").replaceWith(history.state.asyncposts);
                    $("#paging").replaceWith(history.state.paging);   
                }else if(history.state.pageState == '2'){
                    $("#rightpage").replaceWith(history.state.rightpage);
                }else if(history.state.pageState == '3'){
                    $("#asyncposts").replaceWith(history.state.asyncposts);
                    $('.cdp').attr('actpage', history.state.goPageNum);
                }
            }
            break;

            case 4:
            if(historyOrder < parseInt(history.state.historyOrder)){//用户点击了前进按钮
                if(history.state.pageState == '2'){
                    $("#rightpage").replaceWith(history.state.rightpage);
                }
            }else{//用户点击了后退按钮
                if(history.state.pageState == '0'){
                    $("#rightpage").replaceWith(history.state.rightpage);
                }else if(history.state.pageState == '2'){
                    $("#rightpage").replaceWith(history.state.rightpage);
                }else if(history.state.pageState == '3'){
                    $("#rightpage").replaceWith(history.state.rightpage);
                }
            }
            break;
            
            default:
            ;
        }
        historyOrder = parseInt(history.state.historyOrder);
        pageState = history.state.pageState;
        //使用ajax请求到的内容可能需要动态渲染一下, 比如请求会的文章中含有latex格式的公式, 需要mathjax渲染. 
        //异步加载需要调用js渲染latex公式 开始. 这里为ajax请求的内容中含有动态(js代码)提供了一种解决途径.
        $.getScript("http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML", function(){
            //这里不用设置超时了, letex公式在缓存里 很快就拿出来了.
            MathJax.Hub.Config({
                tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]}
            });
            var math = document.getElementById("rightpage");
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]);
        });        
        //异步加载需要调用js渲染latex公式 结束
        //异步渲染comment-box
        if(document.getElementById("comment-box")!=undefined){
            //多说公共JS代码 start  参考:http://dev.duoshuo.com/docs/50b344447f32d30066000147
            var id = location.href.split("=")[1];
            var href = location.href;
            setTimeout(function(){
                var el = document.createElement('div');
                el.setAttribute('data-thread-key', id);
                el.setAttribute('data-url', 'http://' + location.host + href);
                DUOSHUO.EmbedThread(el);
                jQuery('#comment-box').append(el);
            },1);
            //多说公共JS代码 end            
        }
    }, false);
});
