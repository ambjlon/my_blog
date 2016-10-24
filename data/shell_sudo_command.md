### su,su -以及sudo
1. su user以non-login shell, 会保持登录之前用户的环境变量. 需要输入user的密码.
2. su - user是login shell方式. 这种方式会读取user的.bashrc .bash_profile中的环境变量. 同样需要输入user用户的密码.
3. sudo是root用户赋给某些用户的指定的某些特殊权利, 是root用户修改/etc/sudoers来完成的. **使用sudo命令的用户只需输入用户自己的密码**.
### sudo su [-] user 和su [-] user的区别
sudo su [-] user 和su user的区别. 两者完成后的效果应该是一样的. 但是sudo su [-] user需要输入使用此命令的用户的密码;su user使用user的密码.
### sudo emacs commond not found的问题
解决sudo emacs commond not found的问题  
明明安装了emacs, 使用sudo却提示命令找不到, 类似的还有其他的pip等命令.  

>当你使用sudo去执行一个程序时，处于安全的考虑，这个程序将在一个新的、最小化的环境中执行，也就是说，诸如PATH这样的环境变量，在sudo命令下已经被重置成默认状态了。所以当一个刚初始化的PATH变量中不包含你所要运行的程序所在的目录，用sudo去执行，你就会得到"command not found"的错误提示。
>要想改变PATH在sudo会话中的初始值，用文本编辑器打开/etc/sudoers文件，找到"secure_path"一行，当你执行sudo 命令时，"secure_path"中包含的路径将被当做默认PATH变量使用.
>添加所需要的路径(如 /usr/local/bin）到"secure_path"下，
>Defaults    secure_path = /sbin:/bin:/usr/sbin:/usr/bin:/usr/local/bin

### sudo -i ???
理论上sudo -i -u user [command]会以user的登录shell运行[command], 但是事实却不是这样的. 那么有类似功能的命令是怎样的呢?
### linux中sh和bash的区别
/bin/sh软连接了bash  
/bin/sh相当于打开了bash的POSIX标准模式, 等效于bash的 --posix 参数. 一般的, sh是bash的“子集”. 
### mac os设置sudo密码
>键入sudo passwd root 然后提示你输入当前登录用户密码，通过以后，提示你输入两遍root的密码。这样你就设置好root帐号密码了，可以用root来登录MacOS了

### 参考
1. [linux权限之su和sudo的区别](http://www.2cto.com/os/201404/294852.html)
2. [su 和 sudo su 的区别](http://blog.csdn.net/yasi_xi/article/details/849344)
3. [解析su,su -,sudo的区别](http://blog.warmcolor.net/2013/02/03/%E8%A7%A3%E6%9E%90susu-ß/sudo%E7%9A%84%E5%8C%BA%E5%88%AB/)
4. [Linux教程分享：如何为sudo命令定义PATH环境变量](http://www.linuxidc.com/Linux/2014-09/106076.htm)
5. [linux中sh和bash的区别](http://bensonzy.blog.51cto.com/227860/600586)

