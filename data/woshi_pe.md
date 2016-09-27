2014年3月开始大量使用shell脚本了，之前对这种脚本还是很生疏的。那么从现在开始记录一下自己最近用到的比较一些脚本语句了。记录下来的都是经过自己在实际工作中验证的语句，可以提高工作效率的尚有记录价值的东西，哈！  
****
## 注释shell脚本的多行
```shell
:<<EOF
注释的代码...
EOF
```
当注释代码里出现变量引用或者是反引号时，会出现
```shell
(standard_in) 1: parse error
(standard_in) 1: parse error
```
这样的提示，这是shell试图解释引用或反引号的原因，可以加个\
```shell
:<<\EOF
注释的代码...
EOF
```
参考 http://blog.chinaunix.net/uid-346158-id-2131171.html
##  how to match a string in the files under a certain directory?
```shell
#grep -r AAA ./                                 #表示在当前目录中递归查找包含AAA的文件。
#grep -rl AAA ./                                #只列出包含AAA字符串的文件名字。
```
参考 http://cooliron.blog.163.com/blog/static/124703138201201232746584/
##  产看当前目录下每个文件夹的大小，以及当前目录的总大小
```shell
du -h --max-depth=1 按照可读的方式显示每个文件夹的大小
du --max-depth=1 | sort -n 按照大小排序显示
--max-depth表示想要看到那层目录。
```
## 成批杀死带有指定的字符的进程
这是个脚本，$1是要匹配的字符串。
```shell
#!/usr/bin/env bash
ps aux|grep $1|grep -v grep | cut -c 9-15 > piddata;
for pid in `cat ./piddata`
do
echo $pid
kill -s 9 $pid;
done
```
## 解压缩 .tar.gz 文件
tar -xzf too11.tar.gz  注意不需要在后面添加当前目录 ./
## 递归过滤所有的  .svn目录及其下前面的文件
find -name '.svn'|xargs rm -fr
