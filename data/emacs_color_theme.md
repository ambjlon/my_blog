通过M-x load-theme或者M-x customize-themes可以看到现在有哪些themes可以使用.  
emacs24本身自带了十几种themes. 还可以添加新的themes:  

1. 在.emacs.d下面建立themes目录, 将后缀为.el的theme文件放到这个themes目录下. 
2. 然后添加(add-to-list 'custom-theme-load-path "~/.emacs.d/themes/") 到init.el文件.  

到[这里](https://emacsthemes.com/index/1.html) 可以找到上百种的themes文件, 把他们的.el文件下载下来放到themes目录. 需要对文件做名称的修改(mustard-theme-source-code.el—>mustard-theme.el). 同时注意到这其中的很多themes是可以通过melpa直接安装的. 无论是elap安装还是把文件放到themes目录, 最终的结果都是load-theme可以看到新加的themes.  

一个theme在第一次load的时候可能会修改init文件, 注意观察. 有的主题会把自己设置成默认的; 可能有的不会, 这时需要(load-theme 'wombat t)来设置一下, 但是要把这个语句放到custom-enabled-themes (quote (mustard)))后面

```lisp
 '(ansi-color-names-vector
   ["#242424" "#e5786d" "#95e454" "#cae682" "#8ac6f2" "#333366" "#ccaa8f" "#f6f3e8"])
 '(custom-enabled-themes (quote (mustard)))
 '(custom-safe-themes
   (quote
    ("2daf79d4048f0f7280f6e6b763c8c81f8cef96ef8444b42ea0eb3023fe387eac" "bf4226951ab37488d5631f2fc15416a557ea41a4629ff63a257ee7dcdf3f2fb9" "83333ecaaaed863a4ab7f9f0247de7264b9d388e68d8c705ed0e01584ab6881a" default)))
```
此外还可以在网络资源找到各种其他的themes, 不过大多会已经包含在刚才介绍的[网页](https://emacsthemes.com/index/1.html).  

需要注意的:  

- load-theme有可能两个themes产生叠加, 导致效果很烂, 请注意观察, 一般选中一种theme后, 在init.el文件添加(load-theme 'xxx t)即可.
- themes加载后可能对原来的helm等配置产生影响, 尤其是face配置. 请调整回来.
- [Emacs color-theme](http://lifegoo.pluskid.org/wiki/EmacsColorTheme.html). 这个color-theme通过elpa安装后很奇葩, 在load-theme里面看不到新的theme出现.
- 翻看theme文件的代码可以看到theme文件多是在对分隔符, buffer的选中条目  背景 前景等等做颜色描述. 其实很简单的.

参考:

1. [How to install emacs colortheme](http://stackoverflow.com/questions/5982572/how-to-install-emacs-colortheme)
2. [Emacs Themes](https://emacsthemes.com/index/1.html)

还可以搜索:

+ color-theme-sanityinc-solarized
+ emacs-color-theme-solarized 不过这些theme貌似效果不是很好.
