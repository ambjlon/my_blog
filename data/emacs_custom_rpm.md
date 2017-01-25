经常遇到线上机器没有安装emacs或者emacs版本很低, 并且还没有这些机器的sudo权限.  这时可以通过源码将emacs安装到用户的home目录下或者直接从其它地方拷贝emacs的安装目录过来. 这里提供的解决办法是自己制作rpm, 并且安装这个rpm的时候不使用sudo权限.

## rpm的制作以及安装
### 制作rpm
1. 找一台有sudo权限的机器并通过yum安装rpmdevtools rpmlint等rpm制作工具.
2. 创建一个新的用户rpmmaker, 然后切换到这个用户.
3. 执行rpmdev-setuptree初始化rpm打包环境并创建目录.
   ![](/static/blog_pic/emacs_custom_rpm.png)  
4. 安装gcc make等编译工具.
5. 下载emacs的安装源码(emacs-24.5.tar.gz)放到SOURCES目录下.
6. 编写emacs.spec文件(附录)放到SPECS目录下.
7. 执行rpmbuild -ba  SPECS/emacs.spec, 成功执行完成以后在RPMS目录下会有rpm生成.
### 安装rpm
1. 执行 rpm -ivh  --nodeps --dbpath ~/.rpm/   emacs-24.5-1.el6.x86_64.rpm
   参数说明:
   + --dbpath指定使用的rpm数据库, 若所指路径不存在则创建.
   + --nodeps不依赖系统的软件. dbpath使用的是本用户的rpm数据库, 所以会找不到系统的依赖.
2. 修改.bash_profile使得emacs指向/tmp/emacs/bin/emacs
   
## 要点
1. 制作的rpm的安装路径选择/tmp/emacs. 这个路径不要sudo权限就可以进行安装.
2. 使用rpm命令的dbpath选项指定安装使用本用户的rpm数据库(不存在自动创建). 这样避免了写系统rpm数据库需要使用的sudo权限.

## emacs.spec附录
    
    :::shell
    %define emacs_user root
    Name:           emacs
    Version:        24.5
    Release:        1%{?dist}
    Summary:       	emacs from gnu to easily install
    Vendor:		chenjianglong
    Group:          Applications/Editors
    License:        GPLv2
    URL:            http://github.com/ambjlon
    Source0:        emacs-%{version}.tar.gz
    
    BuildRequires:  gcc,make
    #Requires:       
    Prefix:		/tmp/emacs
    
    %description
    emacs from gnu to easily install
    
    %prep
    %setup -q
    
    
    %build
    ./configure  --prefix=%{prefix} --without-jpeg --without-tiff --without-gif --without-png
    make %{?_smp_mflags}
    
    
    %install
    rm -rf $RPM_BUILD_ROOT
    make install DESTDIR=$RPM_BUILD_ROOT
    
    
    %clean
    rm -rf $RPM_BUILD_ROOT
    
    
    %files
    %defattr(-,%{emacs_user},%{emacs_user},777)
    /tmp/emacs
    
    
    %changelog

## 参考
1. [非root环境下安装RPM包](http://my.huhoo.net/archives/2010/09/rootrpm.html)
2. [rpm dbpath](http://rpm.org/max-rpm-snapshot/s1-rpm-erase-additional-options.html)
3. [rpm make Relocatable packages](http://rpm5.org/docs/api/relocatable.html)
4. [Making a Relocatable Package](http://openpkg.gds.tuwien.ac.at/doc/book/maximum-rpm.html/node19.html#SECTION03740000000000000000)
5. [centos下制作RPM包并签名](https://www.52os.net/articles/howto-create-and-sign-rpm-package.html)
6. [Centos 6 制作 rpm 包](http://www.dahouduan.com/2015/06/15/Linux-centos-make-rpm/)
7. [rpmbuild failing error Installed (but unpackaged) file(s) found](http://stackoverflow.com/questions/26895389/build-errors-installed-but-unpackaged-files-found)
   
