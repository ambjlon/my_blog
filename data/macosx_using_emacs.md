　　想在mac os X下使用emacs, 不使用gui界面, 和linux下一样的体验.  
　　mac os x本身是带有emacs的, 但是版本比较低, 所以需要升高版本. 我这里选择重新安装一个emacs, 版本基本是目前最新的24.4或者24.5. 没有研究怎怎么升级系统自带的emacs.  
　　一个月前已经安装过一次了, 而且成功了, 当时应该使用的是macport安装的22.4版本. 然后把linux下的配置拿过来能够很好地使用, 除了eclim,jedi没有安装测试. 需要注意的是用macport安装的emacs本身是没有gui的, 在命令行键入emacs就能启动无gui界面.  
　　之后把macport卸载了, 今天使用emacs的时候发现又去调用系统自带的低版本emacs了. 这次使用homebrew进行安装. 安装过程:  
1. brew install --with-cocoa --srgb emacs
2. ln -s /usr/local/Cellar/emacs/24.5/Emacs.app /Applications
3. 在~/.bash_profile中添加  
```shell
alias emacs="emacs-24.5 -nw" #-nw means no window
```

　　使用homebrew安装的emacs是有gui的, 在图形界面可以看到增加了一个emacs的应用. 这里只是做了个alias添加了无图形界面参数. 同样把linux下的配置拿过来也可以使用, 除了jedi没有安装, eclim没有安装. eclim的安装没有多大的意义了, mac上已经安装了图形界面的eclipse了.

参考: [1](http://www.emacswiki.org/emacs/EmacsForMacOS), [2](http://stackoverflow.com/questions/5414015/how-to-install-emacs23-on-mac-osx-without-gui) 还可以在Google搜索'mac emacs no gui'
