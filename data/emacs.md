# 2014/12/18~2014/12/20 打算从vim换用emacs，开始emacs入门  
emacs启动的时候需要加载初始化文件。  
　　When Emacs is started, it normally tries to load a Lisp program from an initialization file, or init file for short. This file, if it exists, specifies how to initialize Emacs for you. Emacs looks for your init file using the filenames ~/.emacs, ~/.emacs.el, or ~/.emacs.d/init.el; you can choose to use any one of these three names . Here, ~/ stands for your home directory.  
（引自emacs manual http://www.gnu.org/software/emacs/manual/html_node/emacs/Init-File.html）
# 2014/12/18-2014/12/25 配置自动补全  
主要参考http://blog.csdn.net/winterttr/article/details/7524336。使用了下面的4各源代码包:  

+ https://github.com/auto-complete/auto-complete
+ https://github.com/auto-complete/popup-el
+ https://github.com/auto-complete/fuzzy-el
+ https://github.com/winterTTr/emacs-of-winterTTr/blob/master/.emacs.d/plugins/auto-complete-suite/pos-tip/pos-tip.el

下载上面提到的4个源代码包，放.emacs.d/目录下，然后在init.el中添加配置:

```lisp
(add-to-list 'load-path "~/.emacs.d/fuzzy-el-0.1")
(add-to-list 'load-path "~/.emacs.d/auto-complete-1.4.0")
(add-to-list 'load-path "~/.emacs.d/popup-el-0.5.2")
(add-to-list 'load-path "~/.emacs.d/pos-tip")
(require 'auto-complete-config)
(add-to-list 'ac-dictionary-directories
"~/.emacs.d/auto-complete-1.4.1/auto-complete/dict")
(ac-config-default)
;;fuzzy功能
(setq ac-fuzzy-enable t)
;;增强popup列表
(require 'pos-tip)
```
昨晚这些操作后，自动补全功能出现了，只是根据当前文件做的补全。

```lisp
(setq ac-quick-help-prefer-pos-tip t) ;default is t
```
# 2014/12/18-2014/12/25 配置yasnippets  
1. 安装yasnippets，主要参考https://github.com/capitaomorte/yasnippet/。采用了“Install the most recent version”的安装方法。
2. yasnippet安装好以后，在它的根目下是有一个snippets的目录的，1中的yasnippets说，把AndreaCrotti-snippet的snippets放到这个目录就可以了。但是，我打开https://github.com/AndreaCrotti/yasnippet-snippets/这个以后，按照这里的说法，把AndreaCrotti-snippet直接放到了.emacs.d/下面了，然后再init.el中添加：  

        :::lisp
        lisp
        (add-to-list 'yas/root-directory "~/.emacs.d/snippets")
        (yas--initialize)  
          
3. 再有好的snippets就可以尽数收藏到这个snippets里面了。  
# 2014/12/25 试了一下emacs包管理器  
参考：

+ http://ergoemacs.org/emacs/emacs_package_system.html
+ http://tromey.com/elpa/install.html
+ http://xiaogaozi.blogspot.com/2011/01/elpa-emacs.html（按照这个步骤试了一把）

实际上自动补全等插件都已经集成到包管理器里面了，前面自己已经配置成功了，就用自己配的了，之后的包尽量先去管理器里面找找看。  
# 2014/12/25 配置neotree，文件系统导航。  
https://github.com/jaypei/emacs-neotree  
http://www.emacswiki.org/emacs/NeoTree_%E4%B8%AD%E6%96%87wiki  
使用elpa安装了neotree到elpa目录下，原本以为应该是elap在init.el中自动添加引用，但是却没有。自己又再init.el中添加了一下语句。还得搞一下，让elap能够自动安装包，自动向init.el中添加引用语句。  
# 2015/03/25  
前些日子，装好的Neotree插件在显式文件的时候的颜色非常浅，竟然是淡灰色，几乎看不见文件明。修缮办法：  

1. M-x customize-group RET neotree RET
2. 修改这些配置项就可以了
![](http://media.xtwind.com/images/2015/06/22/d18dea30ec5560b1c1c763ab6246093a.png)  
# 2015/3/25 添加Undotree  
这次添加undotree使用的elap包管理器，并没有手动向init.el添加相应的引用语句。下次安装别的包继续观察是否还是不用添加。

+ 碰到的问题：选择了tree上的某个节点后，按下ret想达到这个状态，提示：“Buffer is read-only: #<buffer  *undo-tree*>”。
+ 解决方法：首先不需要按下ret，选择了某个节点，默默的关了undotree窗口就好了。再次，按C-x C-q会提示Read-Only mode disabled。
# 2015/4/5  
1. 修复window-xhsell下Alt键不能当Meta使用的问题。xhsell的文件->属性->终端->键盘->元键仿真可以更改这个设置。
2. 热键的设置。在windows-xshell下C-M-n/p不能多行跳跃。于是改为M-n/p为多行跳跃。  
关于热键，分为全局热键，应用程序级热键，控件级热键，优先级逐步降低。在windows-xshell下C-M-n/p原来被EverNote占了，还被xshell本身占了，所以在Emacs根本就相应不到。以后设置热键，要是和系统级的冲突了，尝试修改自己Emacs的设置，要是和应用程序级的冲突了，可以尝试修改相应的应用程序。另外，还有Ghotkeys等热键修改工具，没有下载到好使的软件~~
3. 将热键设置单独写了个hotkey.el的文件，在init.el中调用。
# 2015/4/5
在此之前的auto-compelet 以及 yasnippets不是通过elap安装的，是单独下载相应的包并作的配置。今天把原来的包以及配置删掉，使用elap包管理器安装auto-complete&yasnippets。

1. auto-complete和yasnippet的关系http://emacser.com/auto-complete_yasnippet.htm
2. 通过包管理器安装auto-complete以及yasnippet后，在再按照下面的配置：  

        :::lisp
        ;;yasnippet配置，据说这段配置应该放到自动补全前面的，因为自动补全用到了yasnippet
        (require 'yasnippet)
        (yas/initialize)
        ; 配置auto-complete
        (add-to-list 'load-path "~/.emacs.d/elpa/auto-complete-20150322.813")
        (require 'auto-complete-config)
        (add-to-list 'ac-dictionary-directories "~/.emacs.d/elpa/auto-complete-20150322.813/dict")
        (ac-config-default)
就能够通过auto-complete调用yasnippet，不需要在auto-complete中添加yasnippet资源。不通过auto-complete调用yasnippet，通过tab键也能补齐snippet。
# 2015/4/6
+ 对备份文件（以波浪线为后缀的文件）统一到一个目录下管理：(setq backup-directory-alist (quote (("." . "~/.backups"))))
+ 临时文件（被警号包围的文件）在异常退出时产生，编辑时产生的临时文件在Emacs正常退出时会自动删除的。临时文件很有必要存在，编辑时不断的自动保存，异常退出时还有可以恢复用的临时文件！
# 2015/4/7
emacs 输入转义字符。C-q C-g 输入^G    C-q C-a输入^A
# 2015/4/8
通过emacs-eclim使用eclipse的时候，在eclim-project-import一个maven project的时候，得保证目录下有.project文件，这个文件是eclipse使用的。  
不存在会提示目录下没有project可以导入。这是在目录下运行mvn eclipse:eclipse，会在这个目录下建立eclipse可以使用的.project。
# 2015/6/8
Emacs调用eclipse实现智能补全是一个非常重要的功能，之前的配置略有不详之处，今天再把这个功能的配置详述一下，以备不时之需。前面的描述就删掉了。  
配置emacs+eclim+eclipse+emacs-eclim. 这些配置可以解决在emacs下使用java的智能提示，尽可能多的实现图形界面的eclipse的功能，也就是可以使用一系列eclipse拥有的java开发功能。eclim是专门为vim写的一个使用eclipse特征的服务，它接受一些commands，把这些commands发送给eclipse进行执行，这样我们就可以在vim中使用这些Java开发特征了。emacs下也可以享受到这些开发功能，我们通过emacs-eclim这个插件来操控eclim，这样eclim+emacs-eclim就一起充当了emacs到eclipse的桥梁。  
1. 安装eclipse。  
　　到http://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/lunasr2这里下载最新的eclipse-jee-luna-SR2-linux-gtk-x86_64.tar.gz(eclim的官网的requirements要求的是eclipse 4.4.x版本，也就是luna)。下载后在自己的根目下解压缩，就算是安装上了eclipse。  
2. 安装并启动eclim服务。   
　　请参考eclim官网http://eclim.org/install.html的说明。之前尝试了两种安装方式：jar包安装以及源代码编译安装。2.4.0版本的需要jdk1.7，无论jar还是源代码编译安装都出现了错误：缺少distribution包依赖。然后开始尝试较低的版本，jar和源代码编译都做尝试。最终发现使用jar包的方式可以安装2.3.4及其以下版本，源代码的方式好像开发机上的ant不太合适，始终编译不过去。  
　　这里着重说一下怎么使用jar包安装eclim。在http://sourceforge.net/projects/eclim/files/eclim/2.3.4/下载eclim_2.3.4.jar。使用命令:  

        :::shell
        java -Dvim.skip=true -Declipse.home=$eclipse_path -jar eclim_2.3.4.jar install
进行安装。-Dvim.skip=true专门针对eclim的Emacs用户的设置。参看eclim的官网”Unattended (automated) install“部分。  
　　安装完成后会在eclipse的目录下看到eclim以及eclimd两个可执行文件。其中eclimd是server，eclim是client。需要把eclimd这个server启动起来，具体参看eclim官网"Installing on a headless server"部分。大体的意思是启动eclimd需要一个虚拟的图像界面，所以先得安装配置Xvfb，然后启动Xvfb的一个DISPLAY，这一部分还不是很清楚，先不深究，貌似一般的机器上都有Xvfb这个东东。反正目前执行  

        :::shell
        $ Xvfb :1 -screen 0 1024x768x24 &
        $ DISPLAY=:1 ./eclipse/eclimd -b
就会在后台启动eclimd ，可以用ps命令查看一下的。执行$ Xvfb :1 -screen 0 1024x768x24 &时可能会报错，请忽略。  
（**注**：eclim源码可以从github上获得:https://github.com/ervandew/eclim/releases。源码基本上和jar包可以一一对应，除了2.3.1版本。）  
3. 安装emacs-eclim。  
　　官网https://github.com/senny/emacs-eclim。  
　　在elap上安装Emacs-eclim就可以了。然后在init.el做配置：

        :::lisp
        (require 'init-eclim)
        (custom-set-variables
        '(eclim-eclipse-dirs (quote ("~/eclipse")))
        '(eclim-executable "~/eclipse/eclim"))
前面启动了eclimd这个server，现在这里通过eclim这个client和server进行通信。注意安装目录和配置中的路径一定要对应上。  
　　使用mvn eclipse:eclipse 建立maven工程，使用eclim-project-import导入工程，使用eclim-project-open打开工程。  
　　到这里，打开Java项目做开发，就会出现智能提示了。更极致的体验还需进一步发现，这只是一个起步。  
**一些补充：**  
　　在安装eclipse，eclim的时候不需要在init.el做任何初始化的配置，在安装eclim的时候指定一下eclips的路径。但是安装emacs-eclim的时候需要在init.el中require一下emas-eclim，并告诉emasc-eclim eclipse的安装路径。eclim在安装的时候已经在eclips装安装了它的server以及client，emacs-eclim寻到eclips的路径以后，也就使用到了eclim。和前面提到的emacs-eclim->eclim_eclipse的调用路径并不矛盾。


























