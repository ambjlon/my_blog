### 问题
织梦猫的模板很多的都要求织梦系统得是gbk的，尤其是一些好的模板。 但是即便使用gbk的织梦系统，还是出现乱码。所以以后织梦系统统一使用utf8版本的，同时还可以兼容各种字符。所以就需要把织梦猫模板也转换成utf8的。
### 原理
1. 网页(或者文件)的编码格式就像图片的编码格式一样，是指网页或者文件按照什么格式存储的，比如gb2312、utf8等。
2. html文件的meta 中有charset可以用来设置html的编码格式，比如charset=utf-8. 这个设置是用来告诉浏览器用什么编码格式解释当前页面。页面使用gb2312 编码，就要设置charset=gb2312。一定要保持页面文件的编码格式和charset设置中的编码格式一直。 不过目前的浏览器好像都能识别页面文件时间的编码方式，页面自身设置的编码格式不是那么重要？
3. 页面乱码的原因可能有：
    + 浏览器没有按照页面的实际编码格式解释页面。比如charset=utf8，实际页面是gbk的编码。
    + 页面的各部分内容编码格式不一致。页面是utf8，但是从mysql中拿出的数据是gbk的。
    + mysql不支持utf编码等
### gb2312的织梦模板转换为utf8.
gb2312的织梦猫模板在初次加载到utf8织梦系统的时候，必须也转化成utf8. 至于以后再做的修改，请保持utf8格式即可。甚至把在使用中的gb2312系统转化成utf8也是可以操作的，虽然没有亲测。
转化过程主要包括页面编码的转化以及backupdata中的mysql语句的转化。
文件的实际编码，以及文件中的charset等标签！！
#### 在linux系统下操作
1. 使用下面的脚本批量转化页面或者backupdata中文件的编码格式：

        ```shell
        #!/bin/bash
        for file in `ls ./backupdata`
        do
        echo "iconv -fgb18030 -tutf8" $file "-o" $file
        iconv -fgb18030 -tutf8 ./backupdata/$file -o $file
        done
        mv ./dede_* ./backupdata/
        mv ./tables* ./backupdata/
        ```        
注意:  

    + 使用过程中请先生成新的文件，再覆盖原来的文件，不要原地操作，可能会报错。
    + 可能会有报错 “iconv: 未知 xxx 处的非法输入序列”。 这是把-f 写成-fgb19030；甚至可以使用-c忽略非法字符。参考
        - [Linux下转换字符集(UTF8转换)](http://www.cnblogs.com/galoishelley/p/3504785.html)
        - [iconv转换出现“非法输入序列”的问题](http://www.361way.com/iconv-error/2809.html)
        - [iconv转换UTF-8编码出错:iconv:未知 xxx 处的非法输入序列](http://www.path8.net/tn/archives/3448)
        
2. 页面或者文件实际代码改成utf8以后，还要把页面内的charset改成utf8. 使用命令：
    - sed -i "s/CHARSET=gbk/CHARSET=utf8/g" \`grep CHARSET=gbk -rl ./\`（和写入mysql相关的文件）
    - sed -i "s/charset=gbk/charset=utf-8/g" \`grep charset=gbk -rl ./\`
    - sed -i "s/gb2312/utf-8/g" \`grep gb2312 -rl ./\`
    - grep -r gbk ./
    - grep -r gb2312 ./
3. 对于模板中upload等目录下的index文件也要做这些处理。
#### 使用windos下面的工具
window下面有专门的模板编码格式转换软件，但是不好使。 推荐使用Dreamweaver进行文件编码的改变，保存的时候会把charset同时给改了。mysql有关的文件虽然很大，也可以使用Dreamweaver处理。
使用phpadmin改变mysql中已经存进去的数据的编码格式。
### 参考
1. [html乱码原因与网页乱码解决方法](http://www.divcss5.com/html/h546.shtml)
2. [如何将织梦程序由GBK编码转为UTF-8字符集](http://www.douban.com/group/topic/63780339/)
3. [字符集GBK和UTF8的区别说明](http://blog.itpub.net/55022/viewspace-713901/)
