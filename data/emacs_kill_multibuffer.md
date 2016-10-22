### 方法一
1. M-x ibuffer
2. d标注每一个打算关闭的buffer. (e.g. o 是open? 等等)
3. u撤销刚才的标注
4. x执行所有的标注.

### 方法二
1. c-x b (helm-buffer-mini) (或者 M-x helm-buffers-list)
2. c-space 选中将要关闭的buffer
3. c-z 选择要执行的action kill-buffers
4. 回车关闭所有刚才选中的buffers.

备注:

1. c-space c-z应该属于helm的快捷键, 但是在哪定义的还不知道. 但是c-space选中item的颜色可以在:
customize-group->helm ->helm face->Helm Visible Mark设置.
2. 不止是关闭buffer. 以后所有的操作都可以尝试"选中多个"同时进行.
3. mac下的c-space快捷键已经和spotlight解绑.

### 方法三
老方法. c-x k 关闭单个buffer.  
这种方法下, 虽然c-space也可以选中多个buffer, 但是执行Sole action (Identity)后并不能对多个buffer进行关闭.

此外还可以编写lisp脚本实现buffers定时智能关闭, 省的手动关闭. 参考:[emacs wiki KillingBuffers](https://www.emacswiki.org/emacs/KillingBuffers)
