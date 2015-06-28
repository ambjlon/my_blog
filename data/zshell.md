　　zsh是同bash一样，也是一中shell，只不过它有自己的不同之处，或优或劣。开始写这篇记录的时候，只是安装配置好它了，还没有来得及尝试体验其“优劣”。
******
1. 安装。  
zsh在一般的linux发行版本中都默认包含了。看一下你的机器上都有什么shell呢？下面是我的机器上的shell:  

        :::shell
        $cat /etc/shells
        /bin/sh
        /bin/bash
        /sbin/nologin
        /bin/tcsh
        /bin/csh
        /bin/ksh
        /bin/zsh
        /usr/local/bin/bash
        /usr/local/bin/csh
        /usr/local/bin/ksh
        /usr/local/bin/sh
        /usr/local/bin/zsh
还真不少！！已经包含了zsh。其中/usr/local/bin/zsh是我自己后来安装的新版本的zsh，和/bin/zsh的版本是不一样的。要是机器上没有zsh，使用”yum install zsh“ 安装。

2. 更新。  
　　因为后面使用的zsh的配置 oh my zsh对zsh的版本最低要求是4.3.9，而我机器上自带的zsh的版本是"zsh 4.2.6 (x86\_64-redhat-linux-gnu)". 所以还需要更新zsh的版本。我机器的系统是RedHat linux，按照一些博客的描述，只需要yum update zsh即可（或者yum upgrade zsh？）。但是我试来试去得到的提示都是"Package zsh-4.2.6-5.el5.x86_64 already installed and latest version"，估计是我机器上yum的源配置太狭窄了，配置里的yum源都没最新的包。机器是公用的，我还是不去修改yum源了。转而直接下载zsh的最新安装包，自行手动make安装。
    + 下载&解压：

            :::shell
            wget http://sourceforge.net/projects/zsh/files/zsh/5.0.2/zsh-5.0.2.tar.bz2/download
            tar xvjf zsh-5.0.2.tar.bz2
            cd zsh-5.0.2

    + 编译安装：

            :::shell
            ./configure
            make
            sudo make install

    + 检查效果：  
这时新版本的zsh已经安装好了，但是由于我们./configure时没有指定安装目录，它被安装到了

            :::shell
            /usr/local/bin/zsh --version
            zsh 5.0.2 (x86_64-unknown-linux-gnu)
此时再输入cat /etc/shells就会输出1中的那些了，注意在安装新版本之前执行cat /etc/shells是没有输出中的最后一行的！

3. 配置  
　　蛋疼的问题来了，我们在命令行输入zsh还是原来的老版本zsh被调用，注意此时老版本在/bin/zsh,新版本在/usr/local/bin/zsh。我想要的状态是我输入zsh命令是新版本的zsh被调用，当然你可以输入/usr/local/bin/zsh,这样很不人性~~本以为是修改环境变量可以解决这个问题，各种修改~/.bashrc ./bash_profile，还是没能达成目的。参考了一篇修改Python版本的类似的问题。做了下面的操作：

    + 重命名/bin/zsh。

            :::shell
            mv /bin/zsh /bin/zsh-4.2.6-bk。备份吧，或许别人还会用这个旧版本呢。
            
    + 软连接。

            :::shell
            sudo ln -s /usr/local/bin/zsh ./zsh。
ll /bin/可以看到   zsh -> /usr/local/bin/zsh* 链接成功。  
现在再输入zsh，新版本被调用了。目前只有通过这么龌龊的办法搞定了。。。。。

4. 使用oh my zsh  
　　oh my zsh 是对zsh的配置进行管理的包。里面有各种背景、主题等等。这个安装还是比较顺利的。

        ::shell
        sudo wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh --no-check-certificate  -O - | sh
ok!!  

5. 使用zsh  
　　现在你在bash命令行输入zsh，就来到了zsh，而且还是经过oh my zsh配置过得，界面很炫。当然，你可以配置zsh为默认的shell，但是在不熟的情况下，这样做不是太好。另外，在启动zsh的时候还会有一个错误提示：

        :::shell
        /etc/profile.d/tops_bashrc.sh:20: command not found: complete
        /etc/profile.d/tops_bashrc.sh:31: command not found: shopt
还没仔细研究这是怎么回事，不过貌似不妨碍zsh的使用。接下来，好好把玩儿一下zsh，已经oh my zsh。
