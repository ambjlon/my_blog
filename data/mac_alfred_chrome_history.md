在alfred中键入命令以及搜索词对chrome的搜索历史进行搜索. 目前能进行这个操作的最新的workflow推荐[tupton alfred-chrome-history](https://github.com/tupton/alfred-chrome-history)

### 安装  
1. git clone git@github.com:ambjlon/alfred-chrome-history.git(已经将源代码fork到自己的仓库, 并进行了修改)  
2. 打开alfred的Syncing并设置sync目录, 在Advance中可以找到Syncing的相关设置.  
3. ln -s /path/to/alfred-chrome-history /path/to/syncing/dir/Alfred.alfredpreferences/workflows/alfred-chrome-history  
4. 通过源码安装[python的alfred扩展](https://github.com/nikipore/alfred-python).  
5. 通过pip安装docopt扩展.
通过双击release workflow进行的安装不能使用.
### TIPs  
1. Syncing是什么?  
syncing就是把alfred的偏好设置保存到一个自定义目录下, 然后这个目录下的相关文件可以拷贝到其他机器的syncing自定义目录下, 这样可以实现不同机器之间alfred偏好设置的同步.
2. 如何可以对中文字符进行匹配搜索?  
不能对中文字符进行搜索的原因是因为chrome.py文件中对输入的query采用的编码方式不对. 对输入query进行unicode编码:

```
query = unicode(arguments.get('QUERY'), 'utf-8')
```
相关修改已经保存到fork出来的代码git@github.com:ambjlon/alfred-chrome-history.git的master分支.  
3. 设置更多的结果展示.  
alfred.xml函数的第二个参数可以指定产出多少个结果, 默认的是9个, 这在[alfred-python](https://github.com/nikipore/alfred-python)的alfred.py文件的\_MAX\_RESULTS\_DEFAULT变量进行了定义. 将第二个参数设置成一个适度大的值即可, 比如100.  
另外history\_results函数使用了yield返回结果, 表明这个函数返回一个迭代对象. 对此函数调用时, 迭代n次,  history\_results就返回n个结果, 即便还可以有更过的结果进行返回. 这就是yield的效果.

### TODO
+ 不输入query, 按照历史记录的时间先后顺序展示结果.
