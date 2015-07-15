Pyhton是经常用到的语言，因此需要配置一下emacs的python开发环境， 实现智能提示、自动补全等功能。
******
# 安装与配置
1. 安装python setuptools(easy_install)  
    + wget https://pypi.python.org/packages/source/s/setuptools/setuptools-17.0.zip --no-check-certificate
    + 解压缩setuptools-17.0.zip。
    + python setup.py install
2. 安装pip 
    + 通过setuptools安装pip：easy_install pip 
    +  或者 wget https://pypi.python.org/packages/source/p/pip/pip-1.0.2.tar.gz#md5=47ec6ff3f6d962696fe08d4c8264ad49 --no-check-certificate 然后解压缩，安装python setup.py build && python setup.py install
3. 以上两个步骤可以参考[这里](https://pip.pypa.io/en/stable/installing.html#install-pip),通过命令python get-pip.py一次完成安装。
4. 通过pip安装virtualenv: pip install virtualenv  
5. 使用emacs的包管理器 elap安装jedi。包管理器会自动安装其所有依赖。依赖包括了**auto-complete**, deferred, ecp等。如果这些依赖没有安装，请手动安装。
6. 在初始化配置init.el中加入：
(autoload 'jedi:setup "jedi" nil t)
(add-hook 'python-mode-hook 'jedi:setup)
(setq jedi:complete-on-dot t)

6. 安装jedi sever等。
    + 手动安装：进入jedi的安装目录：elap/jedi-core-**/, 执行python setup.py install
    + 或者在emacs下 M x jedi:install-server RET.
   这个过程实际上使用setuptools安装了jediepcserver argparse epc jedi sexpdata。
7. 到这里位置应该配置完成，用emacs打开python文件， 会看到智能提示，自动补全。

# 原理
1. 安装setuptools pip是为了安装virtualenv，jedi是需要virtualenv的运行环境的。
2. setuptools还用来安装jediepcserver argparse epc等。

# blocked issues
1. 执行python get-pid.py 出现问题, 找不到合适的pip版本
2. setuptools 证书过期. 出错提示:  

        :::shell
        Download error on https://pypi.python.org/simple/argparse/: [Errno 1] _ssl.c:510: error:14090086:SSL routines:SSL3_GET_SERVER_CERTIFICATE:certificate verify failed -- Some packages may not be found!
这个问题是在目录elap/jedi-core-**/下, 执行python setup.py install出现的, 很明显setup调用setuptoools安装包得时候出现证书错误了. 解决办法:  
下载最新的证书文件:  
wget http://curl.haxx.se/ca/cacert.pem  
更名为ca-bundle.crt放置到默认目录  
 mv cacert.pem ca-bundle.crt  
 mv ca-bundle.crt /etc/pki/tls/certs  
估计前面使用get-pip.py的时候出现的那个问题也是因为这个证书过旧引起的.
# 参考
1. http://tkf.github.io/emacs-jedi/latest/contents.html
2. https://pip.pypa.io/en/stable/installing.html#install-pip
3. http://qiita.com/_akisato/items/4b531aab65de8cd2909a
4. https://pypi.python.org/pypi/setuptools
5. http://blog.csdn.net/fireroll/article/details/42885933
6. http://blog.csdn.net/shanliangliuxing/article/details/10114911
