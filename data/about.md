搭建这个站点的初衷是以笔记的形式记录下工作和生活中的点点滴滴. 尤其是工作中的技术笔记, 记录下来然后分享出来, 利人利己.  
这个站点的雏形还是2012年左右在北理工读书的时做出来的. 时至今日, 虽然站点早已被改的与雏形相去甚远, 但是站点背景图等还是刻意保留了下来以作纪念.

### About me
+ 陈江龙 1988
+ 联系我
    - QQ: 695764872
    - Email: ambjlon at 163 dot com
  
### 技术细节
1. 这个博客站点使用nginx做Http Server承接请求, 使用Django web框架处理请求, 数据存储使用Mysql. Web框架和nginx是通过Python的uwsgi扩展启动的Uwsgi服务进行交互的.
2. 所有的文章都是用Markdown写成的, 并通过Python的markdown扩展渲染成html页面.
3. 因为不擅长前端工作, 所以前端的设计比较混乱. pure bootstrap都有使用, 使用jQuery的ajax库对页面进行了最大可能的异步化处理. 页面中看到的侧边栏隐藏, 文章列表翻页, 标签云等等功能都是从其他网页的前端设计中模仿来的.

### 欢迎捐赠
如果您觉得我的文章对您有帮助, 欢迎扫码捐赠. 您的支持是我最大的动力! 捐赠完成后别忘了在下面的评论框留言~

+ 微信  
  ![](/static/blog_pic/weixin_donation.jpg)  
+ 支付宝  
  ![](/static/blog_pic/alipay_donation.jpg)

### 大事记
1. 2012年在北理工读书时初步简单实现, 具体细节已经不详.
2. 2015年6月, 站点www.wgcimpression.pub互联网可访问.
3. 2016年上半年, 因为服务器的原因不可访问.
4. 2016年10月, 进行了前端页面异步化和后端Apache更换为nginx等较大的技术改造.
