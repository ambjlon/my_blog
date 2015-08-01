# 原理

## 什么是像素?
通俗的说像素就是组成图像的元素. 对于一个画面, 可以用$100\times 100$个点组成的矩阵描述, 每个点的数值不同代表不同的颜色. 我们在大街上经常看到的广告显示屏不就是由很多个点组成的方阵构成的吗. 所以像素就是构成图像的点阵集合, 它们会有一个规格$x\times y$, 各个点会有不同的数值代表不同的颜色.

## 什么是分辨率?
分辨率是密度, 是单位面积内(比如$1英寸\times 1英寸$)内像素的个数. 

## 什么是图像尺寸?
图像尺寸是个很直接的概念, 就是你看到的图像的长度和宽度. 比如1寸图片是$25mm\times 35mm$.

## 分辨率 像素 尺寸和图像字节大小的关系?
图像的字节大小和分辨率以及尺寸无关. 像素和图像的数据及其存储决定了图像的字节大小. $图像数据=x方向像素\times y方向像素\times 色彩数\times 色彩字节数$, 色彩数比如RGB是三种颜色的加权表示一种颜色, 色彩字节数表明了描述颜色的能力, 用2字节表示一个颜色的权重肯定比一个字节的描述能力. 图像字节大小还和图像数据的存储有关, 比如对前面的得到的的数据进行压缩存储或者再加些描述数据, 这样的存储格式就是一种数据个式, 比如JPEG等.   
图像可以输出到打印机, 也可以输出到显示器, 这个时候分辨率和尺寸就有意义了. 显示器显示图像时, 图像的尺寸和分辨率是可以方便的调整的, 尺寸越大分辨率越低, 因为像素是固定的, 另外在显示器展现时还和显示器的硬件分辨率等有关系, 应该有个映射过程. 我们一般说的图像的尺寸是指图像打印时默认的尺寸, 或者在显示器显示的默认尺寸.  
这样看来, 在像素固定的情况下, 只能通过调整**图像数据量**及其**存储**来改变图像在磁盘中的字节大小了.

## 如何做到像素固定,调整图像的字节大小?
1. 调整图像数据量. 我们可以改变色彩数或者描述色彩的字节数来改变图像的字节大小. 这种方式不建议使用, 估计Photoshop等软件也不会这么做.
2. 可以在图像数据压缩技术上做文章. 压缩包括有损压缩和无损压缩.
    + 无算压缩. 比如对图像数据进行huffman编码, 这和一般的数据压缩软件的做法是一样的. 估计大部分格式的图像在做存储的时候都会适当的做这样的压缩操作的.
    + 这是图像压缩技术的核心, 比如我们常听到的DCT变换 傅里叶变换等. 这些变换是通过频谱分析略去一部分人眼不会过于关注的像素. 这些压缩技术对原始图像的质量是有损的, 这些数据损失肉眼不会明显的觉察到, 或者损失在我们的忍受范围内即可.

# 工程实现

## 使用Photoshop等工具
很多软件都有这个功能的, 你在网上搜索"像素不变调整图像大小"即可找到这样的软件. 最明显的是Photoshop中有一个保存质量的选项, 这个选项就是通过实施有损压缩来实现"像素不变调整图像大小".

## 使用Python图像库, DIY编程
Python的图像处理库有一个save函数, 其中的选项可以添加quantity=? 来实施有损压缩.
需要注意的是, 在linux或者mac os x下需要先安装libJPEG libpng等开发工具, 然后再使用pip安装PIL. 否则在使用PIL的save时候会报错"JPEG support not available".
简单地代码及使用方法参考[这里](https://github.com/ambjlon/image_process_fixedpix)

# 效果展示
![原始图](http://i3.tietuku.com/22d8090af7d6cf52.jpg "原始图")
![8折](http://i3.tietuku.com/977b5cabeb5c8ab1.jpg "80%质量")
![](http://i3.tietuku.com/2d49fe68450db160.jpg "40%质量")
![](http://i3.tietuku.com/28efcb87da6404da.jpg "20%质量")
![](http://i3.tietuku.com/8901f025606e9e60.jpg "5%质量")  
这五张图从左至右从上至下一次是100% 80% 40% 20% 5%质量系数对应的压缩结果. 使用的是Python基本,也就是python的图像处理库. 他们的像素始终没有变化, 但是大小却依次降低. 而且大小不和质量系数成正比.

# 参考
1. http://blog.csdn.net/abcjennifer/article/details/8074492
2. https://gist.github.com/rigoneri/4716919
3. http://pillow.readthedocs.org/en/latest/installation.html
4. http://blog.sina.com.cn/s/blog_9e1e8c1301015xat.html
5. http://baike.baidu.com/view/1197608.htm
6. http://raspberrypi.stackexchange.com/questions/9361/how-do-i-enable-jpeg-support-with-pil
7. http://www.pythonware.com/products/pil/
8. https://helpx.adobe.com/cn/photoshop/using/image-size-resolution.html
9. http://www.7edown.com/edu/article/soft_10097_1.html
10. http://www.nphoto.net/news/2011-08/31/5bfdb462886e6b3a.shtml
