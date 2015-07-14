经常看到在一台linux机器上安装了好几个版本的Python. 系统本身带了一个,一般版本较低, 2.4那个样子; 不同的用户又安装了其他的高版本Python, 而且会安装到不同的目录下, 比如说/user/bin/Python, /user/local/bin/Python2.7, /home/a/top/python2.7.  
但我们作为一个用户登录到机器上的时候, 键入Python命令会有一个默认版本的Python被调用, 如果这不是我们希望的版本该怎么办呢?  
系统在加载Python的时候, 会去查看PATH环境变量, 从左至右发现第一个可调用的Python的时候就进行加载. PATH有系统管理员指定的部分以及用户自己定义的部分构成. 在~/.bash_profile文件里, 有如下的定义:PATH=\$PATH. 在命令行输入echo \$PATH, 会看到\$PATH是什么样的.  
现在说一个我遇到的比较复杂的情形, 在/usr/bin/目录下有两个版本的Python: /usr/bin/python 和/usr/bin/python2.7. 系统默认的PATH变量中又/usr/bin这个路径, 所以但我键入Python的时候总是/usr/bin/python被调用, 这是2.4版本. 怎么才能使得2.7是默认版本? 我先在自己的目录下做了个软连接:ln -s /usr/bin/python2.7 ~/.python. 然后修改~/.bash_profile中的PATH为PATH=~/:\$PATH. 如此系统在加载Python的时候首先找到的是我自己目录下的这个链接过来的Python, 也就是/usr/bin/python2.7. ok~_~
