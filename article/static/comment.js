//多说公共JS代码 start (一个网页只需插入一次)
// var duoshuoQuery = {short_name:"wgcimpression"};
// (function() {
//     var ds = document.createElement('script');
//     ds.type = 'text/javascript';ds.async = true;
//     ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
//     ds.charset = 'UTF-8';
//     (document.getElementsByTagName('head')[0]
//      || document.getElementsByTagName('body')[0]).appendChild(ds);
// })();
//多说公共JS代码 end

//搜狐畅言一下JS代码  开始
(function(){ 
    var appid = 'cysE7DNJ7'; 
    var conf = 'prod_5f40a54419bd75d503c5e7bd5916dc79'; 
    var width = window.innerWidth || document.documentElement.clientWidth; 
    if (width < 960) { 
        window.document.write('<script id="changyan_mobile_js" charset="utf-8" type="text/javascript" src="http://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=' + appid + '&conf=' + conf + '"><\/script>'); } else { var loadJs=function(d,a){var c=document.getElementsByTagName("head")[0]||document.head||document.documentElement;var b=document.createElement("script");b.setAttribute("type","text/javascript");b.setAttribute("charset","UTF-8");b.setAttribute("src",d);if(typeof a==="function"){if(window.attachEvent){b.onreadystatechange=function(){var e=b.readyState;if(e==="loaded"||e==="complete"){b.onreadystatechange=null;a()}}}else{b.onload=a}}c.appendChild(b)};loadJs("http://changyan.sohu.com/upload/changyan.js",function(){window.changyan.api.config({appid:appid,conf:conf})}); } })();
//搜书畅言一下JS代码 结束

 //UY BEGIN
   // <!--使用getScript获取script type="text/javascript" src="http://v2.uyan.cc/code/uyan.js?uid=2116479"></script-->
 //END
