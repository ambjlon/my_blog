### 安装golang
+ linux os

    1. 从[这里](https://golang.org/dl/)下载go的binary release, 目前滴滴这边认为1.4.2是稳定的版本.
    2. 解压后得到一个go的目录. 把它拷贝到/usr/local/下面.
    3. 配置环境变量
    
            ```
            export GOROOT=/usr/local/go
            export GOPATH=/home/yourname/goworkspace/userinfo
            export PATH=/$PATH:/$GOROOT/bin
            ```
       
    4. 输入 go version, 可以看到go的版本信息. 安装完毕.
       
+ mac os
    1. 从[这里](https://golang.org/dl/)下载go的binary release, 以pkg结尾, 最好也是1.4.2版本.
    2. 可视化安装.
    3. 和linux一样配置环境变量
    4. 和linux一样检查安装结果.
    
### 配置emacs
1. 安装go-mode. 后面所有配置的基础
2. 语法检错. 暂时使用flycheck, 量级轻. flymake以后可以研究.
    + export GOPATH=/usr/local/go/(为了把包安装在GOROOT)
    + go get -u github.com/dougm/goflymake
    + **使用elap安装flycheck** , 若是使用flymake进行语法检错不需要安装flymake, 它已经在emacs内置了. 但是我选择flycheck进行语法检错, 这个比较轻量级的. flycheck不是emacs的内置, 一定要安装一下!!!!!否则报找不到go-flycheck文件.
3. 自动跳转配置.
    + 安装godef.
        - export GOPATH=/usr/local/go/(为了把包安装在GOROOT) 
        - go get github.com/rogpeppe/godef     godef没有和go一起release.
    + go-mode没有jump-back的功能,需要自己添加这样的功能.
        - 使用这个[补丁](https://gist.github.com/syohex/5883383) 修改go-mode.el文件. 目前这个文件已经修改, 添加了这个补丁.
4. 安装gocode 自动补全使用.
    - export GOPATH=/usr/local/go/(为了把包安装在GOROOT)
    - go get -u github.com/nsf/gocode
5. 产看文档 godoc-at-point
6. 自动添加删除import
    + go-remove-unused-imports 删除没用的import
    + go-goto-imports 跳到import模块的最后
    + go-import-add 添加import 这个不是自动的 会出现提示让你自己手动选择 蛋疼!
7. 使用imenu为当前缓冲区建立函数变量等的索引.  
http://www.tuicool.com/articles/RRvEZj

### 参考
1. http://dominik.honnef.co/posts/2013/03/writing_go_in_emacs/
2. https://github.com/dougm/goflymake
3. https://github.com/nsf/gocode
3. https://golang.org/dl/
4. http://andrewjamesjohnson.com/configuring-emacs-for-go-development/
5. http://yousefourabi.com/blog/2014/05/emacs-for-go/
6. http://tleyden.github.io/blog/2014/05/22/configure-emacs-as-a-go-editor-from-scratch/
7. http://gotools.weebly.com/index.html
8. http://studygolang.com/articles/2661
9. https://gist.github.com/syohex/5883383
