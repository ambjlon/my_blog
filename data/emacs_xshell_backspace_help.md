# 问题描述
在window下用xshell登录linux服务器, 然后使用emacs进行编辑, 发现backspace建总是出发帮助功能, 相当于C-h的作用.
# 解决办法
配置window下的xshell, 在连接的 "属性->终端->键盘" 选项下做下图所示的配置:  
![img](http://i3.tietuku.com/a2782eba758db617.jpg)  
这样设置后不需要在emacs初始化文件做任何配置, 在xshell登录了Linux后正常使用windows键盘下的delete&backspace键. 打开帮助的时候按C-h即可. mac下自然也不受任何影响.
# 细节探究
## 解决方案1
在emacs的初始化文件中添加(global-set-key "\C-h" 'backward-delete-char-untabify), 同时上图所示的配置中, backspace键序列处勾选"Backspace(Ctrl+H)(K)". 最初很长一段时间使用这种方案, 现在看来这种方案愚蠢极了, 像是鸵鸟把头埋进沙子里: 在window键盘上按backspace, emacs收到backspace(Ctrl H, ASCII code 8), 然后emacs对这个信号做了一下处理使它具有backward删除功能. 这种情况下, Ctrl H也具有了和backspace键一样的功能, 在mac下也是如此. 当需要帮助功能的时候只能按F1了, 或者你把帮助功能绑到别的快捷键上.
## 解决方案2
在emacs的初始化文件中添加(normal-erase-is-backspace-mode 1), 同时上图所示的配置中, backspace键序列处勾选"Backspace(Ctrl+H)(K)". 这种做法看来也不是很好, 最大的弊端在于windows上和mac上不一致, 每次在mac下用还要M-x normal-erase-is-backspace-mode.
## 解决方案3
如解决办法
## 原理介绍
通常我们在各种终端emulator(iTerm Xshell)来登录linux主机, 在linux主机上使用emacs.  
在键盘(win or mac)按Backspace或者Delete键会发出信号到终端所在的操作系统, 然后操作系统将信号交给终端, 终端再把这个信号发送个linux主机, 最终linux系统会把信号交给emacs. 这个过程表示为: 键盘->客户端操作系统->终端->linux主机->emacs.   
信号做了这么复杂的传递, 每一个传递过程都可以对信号做个映射转换, 比如在终端向linux主机发送信号的时候将backspace(ASCII 8)信号转化为DEL(ASCII 127).  
然后, 我们关注一下信号源也就是键盘, win类键盘的Backspace键发出的就是BS(ASCII 8)信号, 等价于同时按C-h, 至于这类键盘的delete键发出了什么信号, 没有仔细考究. mac类的键盘大多时候你只能看到delete键, 按这个键发出DEL(ASCII 127)信号, Fn+delete发出的信号应该等同于win键盘的delete信号, 这种键盘没有Backspace键.  
再看一下信号的最终接受者emacs对各种信号的反应. emacs对各种信号的反应式可以设置的, 默认的 对BS信号(win键盘的Backspace或者C-h)就是响应帮助功能. 对DEL信号是backward删除, 对win键盘的delete是forward删除.  
可以在信号传递的各个环节进行信号的转换, 甚至在最后重新绑定emacs对信号的响应函数, 解决方案1和解决方案2就是这样. 其实我们还可以修改linux系统中信号的转换, 设定BS转换为DEL.  
比较一下还是解决方案3最优雅了, mac和win下工作互不影响, 还是帮助功能响应BS信号, 只不过在win下需要按C-h发出这个信号, BS也发出这个信号,但是被emultor转换了.
# 反思
不得不承认, 对这个问题只是七八成的了解. 比如只知道(normal-erase-is-backspace-mode 1)是在emacs这里重新绑定了对信号的响应函数, 但是这个参数究竟怎么个原理还得仔细阅读文档.
emacs很折腾人, 不能过于关注细节.
现在的解决方案3应该能够很好地满足需求了.
