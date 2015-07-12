# 前言
一直以来在linux, os x系统下的工作环境的色彩配置很差劲. 尤其是os x颜色单一, 公用linux开发环境由于系统管理员给出的默认配置情况还要好一些. 做为一名专业的码农, 这种情况不能长期忍受下去, 更何况还要培养自己成为一位具有审美情怀的青年. 于是动起手来, 追求极致的coding视觉体验.

# 原理考察
一般来说, 给我们带来视觉体验的是各种终端, 比如xShell iTerm以及mac自由的Terminal等等. 这样一来, 给人的直觉应该是只要我们配置这些终端的各种调色就能达成我们的各种视觉体验追求. 简单地试一下就知道是不是这样了.  
　　以os x的Terminal为例. 它的配置在"偏好设置>描述文件"这里. 通过选择不同的描述文件, 我们可以看到Terminal的外观在发生变化. 甚至可以配置一个自己的描述文件, 或者导入一些配置文件. 但是在这个过程中可以发现, Terminal只有字体颜色大小 背景色 前景色 背景图片 透明度等在发生变化, 而且最多也只可以配置这些. 不管怎么配置, 在终端使用ls等命令列出的文件目录还是单调的一种颜色. 这里顺便说一下从哪里导入描述文件, 使用较多的导入源是[solarized](http://ethanschoonover.com/solarized), 这个工具包里面有各种调色文件, 不只是Terminal的调色, 还有iTerm, vim, emacs visualStudio等等的, 比较强大.   
　　既然通过终端的配置不能达成追求的视觉体验, 看来还需要配置系统, 就是对ls这些命令做颜色配置. 简单地在~/.bash\_profile文件中添加ls命令的颜色配置  

    :::shell
    export CLICOLOR=1

再使用ls命令发现列出的文件目录有不同的颜色了, 虽然很土.  
　　其实, 对终端的配置只是对终端基本的字体背景做了定制, 主要的配置还是在对系统中的各种命令的配置, **通过各种尝试可以发现当不对ls命令进行颜色配置的时候, 列出的文件目录的颜色就是终端的字体颜色**, 可以是绿色 白色等. 所以, 接下来主要的工作在对系统各种命令的调色配置.

# 定制系统命令的调色属性(以os x为例, linux类比)
1. 自定义提示符, 编辑~/.bash\_profile  

        :::shell
        export PS1="\[\e[1;32m\]\u\[\e[1;33m\]@\[\e[1;35m\]\w \[\e[1;34m\]\t\[\e[1;37m\]\n$"
这样命令提示符就变得五颜六色了, 还可以随意天间时间 日期等显示.
2. 定制ls命令  
mac os x是源于FreeBSD的类Unix操作系统, 底层的ls grep命令和linux下的一些命令还是有出入的, 安装gun coreutils来代替这些FressBSD的底层命令; 同时发现os x自带的bash版本较低, 顺便更新一下. 这两项工作的目的一方面为了os x环境和linux环境更好的兼容, 更主要的是gnu coreutils下的命令做起调色来更方便.
    + 安装较新版的bash  
    使用homebrew安装

            :::shell
            brew install bash
    安装完成后使用超级用户编辑/etc/shells, 将/usr/local/bin/bash加入到第一行. /usr/local/bin/bash就是新安装的bash的位置.        
    + 安装gnu coreutils  
    使用homebrew安装

            :::shell
            brew install coreutils
    安装完成后根据提示, 在~/.bash\_profile中添加

            :::shell
            PATH="/usr/local/opt/coreutils/libexec/gnubin:$PATH"
            MANPATH="/usr/local/opt/coreutils/libexec/gnuman:$MANPATH"
    这样的gnu的coreutils就取代FreeBSD的成为首选的命令工具箱.
    + ls调色  
    这里说的ls命令自然是gnu coreutils的ls命令了, 它是很好配置颜色的.  
    使用命令gdircolors --print-database > ~/.dir\_colors生成调色文件, 你可以打开这个调色文件看看它长得什么样. 然后在~/.bash\_profile中添加:

            :::shell
            alias ls='ls -F --show-control-chars --color=auto'
            eval `dircolors ~/.dir\_colors`
     此时, 再使用ls, 发现结果变得不错了. 可以编辑~/.dir\_colors的颜色, 调成你自己喜欢的, 比如让.c后缀的文件显示为亮红色. 但是, 我没有编辑它, 继续导入solarized的描述文件吧, 从[github](https://github.com/seebi/dircolors-solarized) clone描述文件, 这些文件和~/.dir\_colors的格式是一样的, 但是搭配更炫一些. 

# 炫一下
做了这么多工作, 结果是什么样的呢, 截图一下吧  
1. iTerm下的  
![img](http://media.xtwind.com/images/2015/07/12/e22dd845e0a499f832df5240fbf95f63.png)
2. Terminal也能这么美~_~  
![img](http://media.xtwind.com/images/2015/07/12/efee43bbbd0a5203192d10066acc81f0.png)

# 附录
coreutils是什么?coreutils和shell的关系? 看一篇[英文博客](http://www.eliotlash.com/2011/02/better-living-through-automation-pt-2-the-shell-and-coreutils/)的部分内容就了解的差不多了  
>Every operating system in the Unix family (including Mac OS X) ships with a set of core utilities, or coreutils. These are small, fast programs which are invoked via the command line. The coreutils are truly the holy grail of automation.  
>By design, each utility is very, very good at one specific thing. For instance, cut will print out one or several slices of the text you pass into it, as determined by a "delimiter character" that you specify. paste, on the other hand, will join two files together line-by-line. Together, these programs can be used, for example, to combine reports from multiple files and format the output how you want.  
>This design is known as the Unix "toolbox" philosophy. The analogy is that a swiss army knife is supposed to be good at everything. But you can't build a house with a swiss army knife. Professional contractors have a toolbox full of highly specialized tools that can only do one thing, but are extremely good at that one thing. The same goes for each of the core utilities. Some software tries to be a swiss army knife and often winds up as the "jack of all trades, master of none." The core utilities are like the contractor's toolbox. By using several specialized tools in combination, you can achieve quick and powerful results.  
>The glue for the coreutils that allows you to use them together is called the shell. The shell is what you are interacting with when you start your "terminal" program, such as the one provided by Mac OS X located under /Applications/Utilities/Terminal.app. Bash is the most popular shell today, and is the default shell on most modern systems including recent versions of Mac OS X  
>The shell interprets commands that you type into it to construct a pipeline between the different programs you are using.   

可以看出coreutils是大多unix类操作系统的工具箱, 好比是瑞士军用刀, 其中每个工具都很精悍. 很多软件尝试着将这些工具融合在一起, 但是最终都是样样通, 样样不精. 最中还是系统的shell语言将这些工具很好地粘在一起, 起到了很好地作用。shell语言中的管道就起到了主要作用。
