### 定位启动慢原因的过程  
#### 使用系统的调试工具查找原因  
使用dtruss dtrace工具(linux上对应trace truss)调试哪里卡主了.  mac上使用这个调试工具的时候可能会提示:

```
dtrace: failed to execute emacs: dtrace cannot control executables signed with restricted entitlements
```

还没解决这个问题, 暂时先不使用这个高端的工具了. 可以参考:[DTrace vs. System Integrity Protection](http://internals.exposed/blog/dtrace-vs-sip.html)  
另外, mac下的dtruss dtrace和linux下的trace truss的关系以及衍生关系?  DTrace(百度百科) 

#### 猜测的原因与poll nameserver DNS有关  
这次排查可能和这个无关. 修改host也不见效果的.

#### 通过emacs自身检测启动加载时间  
这是比较靠谱的方法哦. 统计启动加载的方法有:

1. 统计每个语句的执行时间. 

        ```lisp
        (setf *start-time* (current-time))
        some process...
        (setf *end-time* (current-time))
        (message "%s" (float-time (time-subtract *end-time* *start-time*)))
        ```
使用上面的代码可以详细统计到每个语句的执行时间. 然后对所有的代码使用二分排除的方法, 最终会定位到加载耗时的语句.
        
2. 整理配置代码, 使得init.el尽量只留下(require 'xxx)的语句. 然后使用[这里](http://yangyingchao.github.io/2014/09/03/Emacs-%E5%90%AF%E5%8A%A8%E4%BC%98%E5%8C%96%E4%BA%8C%E4%B8%89%E4%BA%8B.html)定义的try-require函数(函数已经整理到simplified分支里面).  此方法原理上也是统计每个步骤耗费的时间, 但是粒度大到了再require上了.  

结合上面提到的两个办法, 先用try-require定位到问题处在set-helm.el这个模块的家加载上, 然后使用更细的统计, 定位到问题发生在(helm-mode 1)这个语句.  
定位到具体的这个语句后就可以去helm那里查找问题, 去论坛上发问了. 此外还可以使用[esup](https://github.com/jschaf/esup)工具. 

### 启动慢的原因  
[Helm is hanging forever on Emacs 24.5.1 on Archlinux and others when loading tramp #1000](https://github.com/emacs-helm/helm/issues/1000)
>So to resume, to fix this issue, you have to switch to emacs-25 or use the last version of tramp, or modify tramp-ssh-controlmaster-options according to the discussion above.

### 加快emacs启动速度

1. emacs -q是不加载init的启动, 速度很快, 但是所有的自定制都没了.
2. emacs daemon server
启动emacs --daemon &, 最好设置成开机启动. 让后使用emacsclient files即可, 最好再给emacsclient做个alias.

### 参考  
1. [ 转向 kde，以及 emacs 启动速度慢相关 的一点备忘 ](http://blog.chinaunix.net/uid-20228521-id-3032489.html)
2. [emacs优化二三事](http://www.cnblogs.com/yangyingchao/p/3418630.html)
3. [Emacs takes unbelievably long to start](http://stackoverflow.com/questions/23619870/emacs-takes-unbelievably-long-to-start)
4. [Slow Emacs startup after recent TRAMP changes](http://debbugs.gnu.org/cgi/bugreport.cgi?bug=20015)
5. [TrampMode](https://www.emacswiki.org/emacs/TrampMode)


