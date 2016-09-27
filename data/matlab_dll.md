整个配置调试过程使用的环境为matlab2011a(version 7.12.0.635)，VS2010，操作系统是window 7

## 设置操作系统的环境变量。  

系统变量增加D:\R2011a\bin\win32;D:\R2011a\bin和E:\Microsoft Visual Studio 10.0\VC\bin，这个分别是我的机器上matlab和VS安装目录下的路径。
系统变量设置完毕后需要重新启动计算机方能生效。  

## 设置matlab的编译环境  

1. 在matlab中输入命令mex -setup，选择Microsoft Visual C++ 2010  
2. 输入命令mbuild -setup 同样选择Microsoft Visual C++ 2010  
3. p.s.这一步中，在我自己配置的过程中，matlab可以很容易的识别出机器上装有的编译器以及他们的安装路径，其中包括VS2010，选择它就是了。也许有的环境下matlab不一定能找出VS2010中的VC编译器，这个怎么解决就不知道了。  

## matlab编译.m文件  

输入mcc -W cpplib:yourfunLib -T link:lib yourfun.m。其中，yourfunLib是生成的DLL，Lib的前缀名字，也就是你最后可以是使用的DLL以及Lib库的名字；yourfun是你需要编译的.m函数。编译完成后得到了下图中的一些文件：  

![](http://media.xtwind.com/images/2015/06/14/5832700607014ed7503bc94047626a43.jpg)  

这些文件中后缀为DLL，LIB，H的文件在VS调用的时候有用，其他文件目前没有使用。（这里我把yourfunLib指定为aetherLib了）  

## VS2010 的配置


### 新建一个控制台项目。打开项目的属性页，针对这个项目做如下的设置：  

#### VC++目录下的包含目录添加  
- D:\R2011a\extern\include（matlab安装目录下的路径）
- D:\R2011a\extern\include\win32  （matlab安装目录下的路径，下同）
- C:\Users\lenovo\Desktop\aether\aether  （你自己新建的项目中的路径，下同）
  
#### VC++目录下的库目录添加:  
- D:\R2011a\bin\win32
- D:\R2011a\extern\lib
- C:\Users\lenovo\Desktop\aether\aether
- D:\R2011a\extern\lib\win64\microsoft
- D:\R2011a\extern\lib\win32\lcc
- D:\R2011a\extern\lib\win32\microsoft
    
#### c/c++中的常规里面的附加包含目录添加:  
- D:\R2011a\extern\include

#### 连接器下面的常规中的附加库目录添加:  
- D:\R2011a\extern\lib\win32\microsoft
  
#### 连接器下面的输入中的附加依赖项添加  
- libeng.lib
- libmat.lib
- libmex.lib
- libmx.lib
- mclmcrrt.lib
- mclmcr.lib
- aetherLib.lib（这个是你自己用matlab生成的lib，前面的是matlab自身计算引擎中的lib）
  
### 在解决方案资源管理其中的头文件和资源文件中添加文件  
1. 在头文件中添加生成的.h文件
2. 在资源文件中添加.lib,.dll文件
3. 然后 把.h,.lib,.dll文件拷到你新建的项目的目录下。比如我把他们放到了C:\Users\lenovo\Desktop\aether\aether里面。

### 编写代码调用dll中的函数  

dll中的函数的接口形式在.h文件的最后面给出了，你可以去翻看他接口形式。这里面的函数的输入输出参数都得是mwArray对象的常引用，关于这个类请读者自己去网上搜索资料。你需要搞明白的是mwArray是matlab公司专门针对“c++调用matlab生成的dll“ 而设计的类，因为你包含了matlab安装目录下的这些类，所以你可以在VS里使用它们。下面是一段主函数的编写样例:

```c++
newdll.cpp : 定义控制台应用程序的入口点。
#include "stdafx.h"  
#include <iostream>  
#include "engine.h"  
#include "mclmcr.h"  
#include "mclcppclass.h"  
#include "libMyAdd.h"  
using namespace std;  
int _tmain(int argc, _TCHAR* argv[])  
{  
if(!libMyAddInitialize())  
{  
//initilize failed!!!"<<std::endl;  
std::cout<<"错误..."<<std::endl;  
return -1;  
}  
double a = 6;  
double b = 9;  
double c;  
mwArray mwA(1, 1, mxDOUBLE_CLASS);  
mwArray mwB(1, 1, mxDOUBLE_CLASS);  
mwArray mwC(1, 1, mxDOUBLE_CLASS);  
mwA.SetData(&a, 1);  
mwB.SetData(&b, 1);  
MyAdd(1, mwC, mwA, mwB);  
c = mwC.Get(1,1);  
cout<<c<<endl;  
system("PAUSE");  
return 0;  
}
```

这个dll中的函数只是实现了一个简单的两数相加的功能，是我做基本配置是使用的。

```c++
#include "engine.h"  
#include "mclmcr.h"  
#include "mclcppclass.h"  
#include "libMyAdd.h" 
```

　　这些头文件是必须包含的，其中engine好像是包含了matlab计算引擎中的所有dll（还没有认真考证)． 现在，运气好的话你应该能看到你预想中的输出了。如果出现了问题，比如找不到路径，不可访问等等各种错误，那只能你自己去解决了，我搞了整整3天，上面提到的错误都有遇到。  出了错误你可以尝试去百度搜索其他博客，更好的是去google用英文搜索相关的问题，一些社区里面也许有答案呢，matlab版主文档我倒是没仔细看，也许上面也有不错的帮助呢！ good luck  to you！

## 备注：  
1. 我自己在搞的时候，遇到的问题是.m函数中本身就使用了c++语言编写的dll，然后再封装这个.m函数。这种情况下你得保证VS可以访问到你用到的那些用C++书写的dll。但是只要用mcc命令编译.m函数后，你在连接器下面的输入中的附加依赖项中只需添加.m 生成的dll函数就可以了，不需要添加那些c++代码生成的dll。这里建议你把matlab项目拷到VS项目中，直接在Vs项目中工作进行MCC编译。
2. 主函数代码中if(!libMyAddInitialize())是必须的。
