### 问题引入  
给highlight-indent配色的时候，原来是这样:  
![](/static/blog_pic/emacs_match_colors1.jpg)  
就八种颜色可以选择. 蛋疼, 要解决一下。

### 问题定位  
首先定位是linux服务器的问题，不是xshell的问题. xshell是支持256色的, 如下图:  
![](/static/blog_pic/emacs_match_colors2.jpg)  
就选xterm即可。  
登录在linux服务器后, 输入命令：  
```shell
$ tput colors
8
$ echo $TERM
xterm-color
```

看！只有八种颜色.

### 问题解决  
安装ncurses. 使用yum安装: yum install ncurses 报错:  
![](/static/blog_pic/emacs_match_colors3.jpg)  
干脆从源码安装. 从[这里](http://ftp.gnu.org/gnu/ncurses/)源代码, 然后:  

```shell
tar zxvf ncurses-5.9.tar.gz
cd ncurses-5.9
./configure
make
make install
```
然后在.bash_profile配置一下:  

```shell
if [ "$TERM" == "xterm" ]; then
    export TERM=xterm-256color
    fi
```
再输入:  

```shell
$ tput colors
256
$ echo $TERM
xterm-256color
```
这次是256色了. 再在emacs下list-color-display, 炫极了：  
![](/static/blog_pic/emacs_match_colors4.jpg)  
貌似之前配置ls等终端色（solarize dark-256）时因为没有做256配置，颜色很low。 这样改了后貌似炫了！256种色彩果然好于8种色彩。emacs不用做任何配置。

### 参考  
1. [Linux SSH终端terminal配色更改为256色](http://www.2cto.com/os/201212/176536.html)
2. [Colors for Faces](http://www.gnu.org/software/emacs/manual/html_node/emacs/Colors.html)
