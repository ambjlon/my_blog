1. 安装python2.7 请从guangwang2下载并作安装。  
2. 安装django。 下载django-1.5.1 解压缩，运行python2.7 setup.py install。需要注意的是最好在这里把Python的pip virtualenv都安装好，这些工具在后续的开发中可定会用到。  
3. 安装mysql 使用yum安装。  
    + 3.1 运行 sudo yum install  -y mysql-devel.x86_64 mysql-server.x86_64 mysql.x86_64。其中有服务端 客户端 以及开发工具  
    + 3.2 设置mysql使用utf-8编码，主要是方式中文乱码。在/etc/my.cnf中添加  

            :::shell
            [client]
            default-character-set=utf8   
            [mysql]
            default-character-set=utf8  
            [mysqld]
            collation-server = utf8_unicode_ci
            init-connect='SET NAMES utf8'
            character-set-server = utf8e
需要注意的是，当你发现中文乱码的问题以后要解决这个乱码问题，那么当你加入上面的配置后，你已经在mysql建立的数据库是不能使用这段配置的，但是当你重新建立一个数据库后这个新数据库使用了这个配置，不会中文乱码。至于怎么使你原有的数据库对此配置生效，请你继续研究一下。  

    + 3.3 启动和停止mysql服务端。/etc/init.d/mysqld start/stop  
    + 3.4 添加用户。  
        * 首先使用root用户登录,mysql -u root -p, 输密码时直接回车;
        * 再创建用户CREATE USER 'bill'@'%' IDENTIFIED BY 'bill' 这创建了一个叫做bill的用户, 密码是bill。他可以从本地或者远程登录。(注：远程没有亲测)
        * 为bill赋权限，grant all  on *.* to 'bill'@'%'; 为bill赋予操作任何表的权限 , \*.\*表示任何表。
    + 3.5 使用bill登录mysql. mysql -ubill -pbill -hlocalhost。这时应该会遇到这个出错提示:  
    ***MySQL ERROR 1045 (28000): Access denied for user 'bill'@'localhost' (using password: YES)***  
这个出错的原因参考[这里](http://stackoverflow.com/questions/10299148/mysql-error-1045-28000-access-denied-for-user-billlocalhost-using-passw)。更详细的探究参考[这里](http://www.tikalk.com/devops/solution-mysql-error-1045-access-denied-userlocalhost-breaks-openstack/) 。知道原因后，只需用root用户登录mysql，执行 DROP USER ''@'localhost'; 在用bill登录即可。  
    + 3.6 登录后尝试创建数据库，创建表，插入数据，尤其合适中文是否正常显示。  

4.  Django通过Python操作MySQL，所以要先安装mysql for python.  
下载 wget https://pypi.python.org/packages/source/M/MySQL-python/MySQL-python-1.2.5.zip
解压后执行sudo python setup.py install. 安装完毕。  
5. 在django创建 model. 执行sudo python manage.py syncdb; 密码可以设置也可以忽略，第一次有错误提示。再次执行sudo python manage.py syncdb;会成功的在mysql创建model中的表。接下来就是django的开发了。配置到此应该已经结束了。  
*******
#### 参考博客:  

1. http://dmyz.org/archives/110  

2. http://www.tikalk.com/devops/solution-mysql-error-1045-access-denied-userlocalhost-breaks-openstack/  

3. http://stackoverflow.com/questions/3513773/change-mysql-default-character-set-to-utf-8-in-my-cnf  

4. http://stackoverflow.com/questions/10299148/mysql-error-1045-28000-access-denied-for-user-billlocalhost-using-passw  
