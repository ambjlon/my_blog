### linux diff
linux的diff是git diff, ediff的基础, 后者会调用前者实现功能.  
linux diff是通过最长公共子串实现的, 先计算出最长公共子串, 然后标记非公共部分为diff部分.  
diff是以行为单位的, 将每片文档表示成(line1, line2, line3, ...). 倘若要以word为单位, 甚至以char为单位, 可以尝试安装使用wdiff.  

### git diff
如何执行添加颜色 如何配置使用linux系统的diff wdiff [Word-by-word diffs in Git](https://idnotfound.wordpress.com/2009/05/09/word-by-word-diffs-in-git/)  
发现某文件有修改, 但是时间久了不记得修改了哪里.  
在add之前, 用git diff a.txt, 就会看到修改的地方.

### emacs ediff
#### ediff命令备忘
ediff是用类linux系统的diff命令作为引擎.

+ ediff-backup  
比较当前文件(缓冲区)和备份文件的内容. 备份文件就是以~结尾的文件, 已经把~文件都放到~/.backup目录了. 如果你现在的缓冲区编辑的是一个备份文件, 那么ediff和原始文件比较.
+ ediff-current-file  
比较当前缓冲区文件和磁盘上的原始文件. 这可以当做revert-buffer(从磁盘恢复当前缓冲区)的安全版本(先比较再merge?)  备注:emacs的auto-save 文件备份概念还没有搞清楚
+ ediff-directories  
递归的比较两个目录 和linux diff -r的效果差不多. 执行此命令后, 提示输入正则表达式, 略过不输入, 然后点击具体的文件可以看到此文件的详细diff. 不过输入正则表达式的作用还不清楚哎~
+ ediff-windows-linewise ediff-windows-wordwise  
逐行或者逐个单词比较两个窗口. 当前界面显示3个buffer, 比较在当前的buffer和它的下一个buffer之间进行. 备注:如果只使用linux diff如何做到逐个单词进行比较的呢.
+ ediff-regions-linewise ediff-regions-linewise  
选中区域后逐个单子或者逐行比较. 键入命令后根据提示先选中A文件以及文件中的区域, type  C-M-c, 再选中B文件以及文件中的区域, 开始比较.  两个区域可以来自同一个文件.
+ ediff-patch-buffer ediff-patch-file  
看样子是手动组装出两个区域进行比较, 用到的时候应该比较少, 没有试.
+ ediff-merge-files  
将两个文件进行Merge. 得到一个临时的mergebuffer, 如下:  

        ```
        <<<<<<< variant A
        1 2
        3
        >>>>>>> variant B
        1
        ======= end
        4
        <<<<<<< variant A
        >>>>>>> variant B
        5 1
        ======= end
        6 3
        8
        <<<<<<< variant A
        9 0
        >>>>>>> variant B
        9
        ======= end
        ```
     
     手动处理完后, 结果可以保存到一个新文件.
     
+ ediff-merge-with-ancestor  
类似ediff-merge-files, 只不过把merge的结果加到第三个文件中而已.
+ eregistry  
可以查看当前处于active的ediff. 没有试过.
+ ediff-revision  ediff-directory-revisions edir-merge-revisions

    1. revision相关的指令是emacs和版本控制软件的配合, 比如git. 只有在版本控制下的目录和文件才能使用此类命令. 此类命令使用应该需要对git做一些配置, 尽量只是用ediff做无版本控制的文件的diff, 暂时先不研究此类命令.
    2. 简单尝试使用 ediff-revision. 先提示输入:
       Revision 1 to compare (default autoload.php's latest revision) 这是让输入待比较的第一个版本.
       然后提示输入:
       Revision 2 to compare (default autoload.php's current state): 这是让输入带比较的第二个版本.
       但是我不知道怎么得到版本号.
    3. 更牛逼的. 使用[emacs git工具](https://www.emacswiki.org/emacs/Git), 比如[magit](https://github.com/magit/magit). 此类工具是专门针对emacs的git packages, 可以在emacs做各种git操作, 当然也含有diff操作, 这些diff操作应该是对ediff的封装美化. 在熟练掌握了git的基础上研究此类工具.

ediff的结束
键入q命令提示是否退出回答yes, 再依次退出每个缓冲区(*-Region.*)即可. 退出后仍然留有分割的窗口~~why!!
ediff还能比较三个缓冲区 文件 windows 区域. 没试过~_~
#### ediff指令
ediff被激活后可以属于一些指令进行跳转保存等操作, 类似vim的一些指令.  
通过对一些指令的尝试, 可以发现customization中一些变量的含义.  
指令太多, 用到时候慢慢熟悉.  
#### ediff customization
+ 设置diff窗口垂直分割  
customize-group=>ediff=>Ediff Window=>Ediff Split Window Function: [Value Menu] Split horizontally
+ 设置face highlight  
customize-group=>ediff=>Ediff Highlighting. 对于下面两个文件,  设置face变量的对应关系的解释说明:

        ```
        --- a.txt    2016-09-15 04:50:19.269561929 -0400
        +++ b.txt    2016-09-15 04:50:44.503561043 -0400
        @@ -1,12 +1,13 @@
        -1 2
        -3
        //Numbered 0 in A file.  Face for highlighting odd-numbered non-current differences in buffer A.
        +1
        //Numbered 0 in B file. Face for highlighting odd-numbered non-current differences in buffer B.
        4
        +5 1
        //Numbered 1 in B file. Face for highlighting even-numbered non-current differences in buffer B.
        6 3
        8
        -9 0
        //Numbered 2 in A file.  Face for highlighting odd-numbered non-current differences in buffer A.
        9
        87
        -9
        //Numbered 3 in A file. Face for highlighting even-numbered non-current differences in buffer A.
        +8
        //Numbered 3 in B file. Face for highlighting even-numbered non-current differences in buffer B.
        //下面依此类推.
        11
        -3
        -45
        +40
        +21
        +
        +3 4
        ```

    其他的设置选项等遇到问题再一一研究吧@_@
    n命令可以在各个region之间移动, 移动到的区域是selected.

#### emacs diff packages 插件
或许有对ediff更好的包装, 下面的包可以参考研究一下:

+  https://github.com/fourier/ztree
+  ediff-trees.el

### 参考
1. [official](https://www.gnu.org/software/emacs/manual/html_mono/ediff.html)
2. [Emacs 之 ediff 学习](http://caobeixingqiu.is-programmer.com/posts/6783.html)
3. chrome 书签 linux/git diff

