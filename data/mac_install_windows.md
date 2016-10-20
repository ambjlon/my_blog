### 需求
因为没有windows系统的机器可以使用了. 所以需要在移动磁盘上安装一个windows系统, 即插即用的便携式系统, 不会影响到原有的mac os x.
### 折腾过程
刚开始是要安装win7的, 毕竟win7比较普及. 但是折腾了将近一天时间, 各种尝试, 最后没有搞定. 退而求其次, 安装win8吧, win8的安装过程比较顺利.  
win7的安装失败的原因是因为win7本来对于在外接设备上安装支持不好, 虽然尝试修改注册表, 使用mac的refi的引导设置等各种手段, 但是还是没有成功. win8 就不一样了, win8本身支持win to go, 这个功能就是用来安装win8到完结设备的, 实现便携式移动办公.
### win8安装
[最有价值的参考](http://bbs.feng.com/read-htm-tid-6575028-page-1.html), 最后就是按照这个做成功的.  
安装过程:

1. 移动磁盘的分区以及格式化, 这一步是非常重要的, 磁盘分区工具或者方法的使用不对, 后续不是windows打开失败, 要不就是根本没有引导分区可以看见.  
使用diskgenius工具进行分区以及格式化.最后磁盘被分为1个80G的NTFS主分区, 一个980G的exfat分区, 而且这两个分区在mac上同样可见.  
>在PC上，用Disk Genius将移动硬盘分区，至少要分出两个区，其中一个是系统区，系统区要设置成主分区，并且要激活（右击分配的主分区盘符，如果激活那个状态显示为灰色，则设置正确）。
>注意，除了主分区以外的其他分区如果已经被格式化成Mac OS文件系统格式，则在这里显示为未格式化，不需要改动和格式化，以免数据丢失。如果你腾出一块新移动硬盘专门用来安装Win7和作为PC运行，建议将系统主分区格式化为NTFS格式，其余分区格式化成exfat格式，Disk Genius软件没有原生的exfat支持，如果你使用的PC是Win7系统，可以用系统自带的磁盘工具来将其余分区格式化成exfat格式。这样你的移动硬盘可以直接在mac系统下读写，而NTFS如果想在mac下读写，需要另外加装软件支持。  
2. 使用NT6安装win8到80G的NTFS分区
3. 打开mac的时候按住option 选择window进入
4. 进入window8后安装bootcamp驱动.  bootcamp是mac针对自身硬件和window结合做出的驱动程序, 安装后windows才会更加平稳的运行在mac机器上.
### win7安装备忘
虽然win7没有安装成功, 折腾的过程也记录一下, 主要做了这些尝试.

1. [简单六步将MacBook各系列将Windows7完美安装在外置USB硬盘](http://bbs.feng.com/read-htm-tid-4295257.html). 修改注册表+使用refi.
2. [Mac: Install Windows 7, 8 or 10 on an external USB3 or Thunderbolt drive without using bootcamp](http://bleeptobleep.blogspot.com/2013/02/mac-install-windows-7-or-8-on-external.html). cmd进行磁盘分区+image.exe磁盘deploy
3. [在 Mac 上使用 Boot Camp 安装 Windows 7 及更低版本](使用mac os x 自带的bootcamp安装https://support.apple.com/zh-cn/HT205016). 使用bootcamp将win7安装到mac的ssd内置磁盘上是完全可以做到的, 但是安装到外接usb移动磁盘是不大可能做到的, 因为在安装的时候会提示win7不能安装的IEEE**外接设备上.
### 备忘点
1. refi是mac的用来做引导系统用的工具.
2. 针对不同的mac机器有不同的bootcamp驱动程序.
3. 安装时借助的外部软件主要有
    + 磁盘分区软件diskgenius或者cmd的disk工具
    + windows安装软件NT6
    + 打开ios文件的工具软件, 比如虚拟光驱等.
    + 引导分区创建的工具  refi等.
4. 对磁盘分区的时候要考虑到分区还要在mac上能读取到. 磁盘除了做系统用之外还要正常的用来存储数据的.
