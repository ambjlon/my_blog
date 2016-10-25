开机界面突然多了个其他用户头像, 很烦人. 因为我不小心打开了root用户.  

1. mac上的用户按照权限由高到低依次为root  管理员 普通用户.
2. 新机器在第一次启动时会让你添加用户, 这个用户用该是管理员用户.
3. root用户比管理员的权限更大, 一般不使用.
4. 如何启用root用户?
    + 管理员在命令行键入sudo passwd root. 重置root的密码后, 重启mac后会有个**其他用户的头像**,  从这里可以以root用户登录mac了.
	+ 或者在图形界面操作, 参考[这里](https://support.apple.com/zh-cn/HT204012)
5. 如何停用root? 参考[这里](https://support.apple.com/zh-cn/HT204012)
