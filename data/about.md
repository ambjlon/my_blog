搭建这个站点的初衷是以笔记的形式记录下工作以及生活中的点点滴滴. 尤其是工作中的技术笔记, 记录先来并分享出来于人于己都是有益处的.  
这个站点的雏形还是2012年左右在北理读书做出来的. 虽然时至今日早已被改的和雏形相差甚远, 但是域名以及站点背景图等还是保留了最初的模样.

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
  ![](/static/blog_pic/weixin_donation.jpeg)  
+ 支付宝  
  ![](/static/blog_pic/alipay_donation.png)

