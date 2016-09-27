screen的原理没有过多了解，目前的配置以及热键能够应付日常的使用。
*****
## 配置.screenrc文件  
在自己的home下配置.screenrc:

```shell
##定义screen的功能键为Ctrl-o。向终端输入Ctrl-o时应按 Ctrl-o o。
escape ^Oo
```
##使用方法：

1. screen 或者screen -S name 建立一个session。-S参数指定了session的名字  
2. 快捷键  
    + 在一个session下面可以有多个窗口；
    + 通过C-o c创建一个新的窗口，默认的名字是bash；
    + 通过C-o A(大写字母A)修改窗口的title
    + 通过C-o w把所有的窗口列出来，并可以选择一个进入。
    + 通过C-o n/p在窗口之间连续前后切换
    + 通过C-a C-d会不加提示的关掉当前的窗口，当关掉所有的窗口时当前的session也就关掉了！
    + 在这样的配置下C-o K(大K)会出现提示Really kill this window [y/n]，询问是否关掉当前窗口。
    + 通过C-o d将当前session detached。
    + screen -r  打开一个session
    + 通过C-o [ 打开screen的vim模式，可以浏览缓冲区内的所有行，想vim一样查看。通过C-o ]关闭vim模式  
3. 以后只建立一个session，这个session下打开多个窗口即可。
