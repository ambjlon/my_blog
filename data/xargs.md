xargs命令将传递过来的字符流按照指定的字符进行分割, 然后将分割后的结果当做参数传递给下一个命令当做输入. xargs一般从管道接受输入字符流. xargs默认把空白字符以及换行字符当做分割符. 把echo当做下一个执行的命令.  

### 如何测试xargs命令?  
1. 在命令行输入xargs命令, 比如xargs -d '\n' [some command e.g. cat]               (linux系统实测)
2. 输入字符流中间可以按回车进行换行.
3. 按Ctrl-d结束输入  
此时xargs会进行输出, 不输入command则默认调用echo.

### 指定分隔符 xargs -d '\n'
-d用来指定分割字符, 但是需要注意的是指定换行符\n的时候, 一定要把\n用引号包裹起来, \t等也是类似的. 示例xargs -d '\n' 或者xargs -d'\n'. 倘若不用引号包裹\n, 结果是以n这个字符来当做分隔符的.  

```shell
$ xargs -d\n
a h kl
jd\nkl
jll
Ctrl-D
a h kl
jd\ kl
jll
```
上面的例子就是使用n来分割输入字符流的, 原有的换行仍旧保留输出. xargs总是用空格界定输出结果的!!  

```shell
$ xargs -d'\n'
a h kl
jd\nkl
jll
Ctrl-d
a h kl jd\nkl jll
```

### 其他参数  
1. -p参数用来执行后续命令前的确认, 有助于调试观察xargs的行为.
2. -n用来限制输出的参数的个数  

        ```
        $ xargs  -n2
        h jka kajsd
        h jka
        ```

3. 处理文件名包含空格的情况

        ```
        find . -name "*.c" -print0 | xargs -0 rm -rf
        ```
        
4. 使用-i或者-I  
-i参数把输入字节流分割后的结果用{}占位符表示, 在下一个命令中可以用{}来表示对应的参数  

        ```
        $ find ./trans2online -name "*.part"|xargs -p -i mv {} ./
        mv ./trans2online/differ.part ./ ?...y
        ```  
        
    -I参数有同样的作用, 只不过可以指定占位符为其他的字符, 比如[]

### 参考  
1. [Linux 系統 xargs 指令範例與教學](https://blog.gtwang.org/linux/xargs-command-examples-in-linux-unix/)
2. [每天一个linux命令（21）：find命令之xargs](http://www.cnblogs.com/peida/archive/2012/11/15/2770888.html)
3. [linux find命令-print0和xargs中-0使用技巧](http://www.ahlinux.com/start/cmd/433.html)
