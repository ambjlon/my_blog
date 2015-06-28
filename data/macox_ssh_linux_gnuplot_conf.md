在os x系统下使用终端，比如iterm，ssh到Linux机器上，然后在Linux机器上使用gnuplot进行绘图。
***
## 工程配置  
我使用的是os x yosemite 10.10，去ssh RedHat Linux，下面的这些操作都是在这样的前提条件下进行的。  

1. mac os x系统安装x11.  
    当你用os x系统的搜索功能(control+space)试图查找x11的时候，会得到是否安装x11的提示，选择继续，会被带到在线商店会，下载XQuartz-2.7.7.dmg这个文件，下载完毕安装即可。x11现在已经不再os x里面集成了，所以我们还得需要进行安装。安装完后不需要对x11进行任何配置，也不需要对os x系统做任何配置。  
2. Linux系统打开x fowarding功能  

    + sudo vi /etc/ssh/sshd_config 进行下面的设置：  

            :::shell
            X11Forwarding yes
            X11UseLocalhost no
不进行这样的设置，或许在你登录的时候会得到提示 ：X11 forwarding request failed on channel 0

    + 然后重启ssh服务  

            :::shell
            sudo /etc/init.d/sshd reload
得到下面的输出提示：  

            :::shell
            Reloading sshd:                          [ OK ]  

3. 从 os x登录 linux系统，你可以使用系统的终端或者iterm等  

        :::shell
        ssh -X user@linux-far-away-server  
这时os x系统上安装的x11会被自动调起  

4. 在ssh终端登录窗口下你可以在linux系统下工作了，键入命令  
gnuplot  
你会看到这样的提示：Terminal type set to 'x11'   
（配置成功前是得到这样的提示 ***gnuplot: unable to open display ':0.0' gnuplot: X11 aborted.***）  
试试命令plot sin(x)，os x会出现一个新的窗口，它上面绘制了正弦曲线。  
5. 多说一些，为了更加方便，以后你还可以这样在shell下执行gnuplot -persist -e "plot sin(x)  ... ..."  
6. 或许你的linux系统下没有安装X authority，请安装sudo yum install xauth  
## 一些搜索的关键词  
1. 也许你的机器环境和我使用的机器环境不尽一致，可能你那里多安装了或者少安装了什么，我并没有确定这些。按照上面给出的这些操作，出现问题会是在所难免的。出现问题还是要解决的，这里给出一些搜索词，建议使用Google，这些资料在百度上还是很难搜到的:  
tunnel X over ssh  from OS X Unix terminal to login far\_away\_machine (a Linux server)  
SSH X11-Forwarding      sshd_config文件     “xorg-x11-xauth”软件包     export DISPLAY=:0.0       DISPLAY环境变量  
set-up X11 Forwarding over ssh        x-server     x 窗口系统  
2. 还有一些好的博客资料，以这些资料为入口，你可以快速的检索出更多的资料，免得你大费周折的去寻找他们：  
    + http://www.cyberciti.biz/faq/how-to-fix-x11-forwarding-request-failed-on-channel-0/  
    + http://www.wenzk.com/archives/888  
    + http://dyhr.com/2009/09/05/how-to-enable-x11-forwarding-with-ssh-on-mac-os-x-leopard/  
    + http://www.linuxidc.com/Linux/2013-06/86743.htm（这个在讲解原理+实践，虽然是windows版的，但是很值得参考）  
    + http://www.360doc.com/content/10/0519/15/1242710_28400112.shtml  
    + http://www.seas.upenn.edu/cets/answers/x11-forwarding.html  
    + https://kb.iu.edu/d/bdnt  
    + http://www.cyberciti.biz/faq/apple-osx-mountain-lion-mavericks-install-xquartz-server/（貌似是apple社区的文档）  
## 原理  
下面是我自己对原理的一些见解：  
　　x11 是一个窗口系统协议，11是目前最新的版本。x11协议由服务端和客户端构成，客户端就是类似gnuplot这样的有图形显示需求的应用，服务端响应客户端的图形显示请求并会出图形。客户端只要和服务端建立通信就能满足自己的图像处理需求了，不管这个服务端在哪里。假设客户端工作在linux服务器上，我们通过ssh连接到这个linux服务器，然后把x11的服务端架设在本地机器（windows或者mac），接下来的问题是怎样才能使得linux服务器上的客户端应用和本地机器上的x11服务端建立通信。  
　　既然是通过ssh连接到linux服务器的，那么只有通过ssh协议这个桥梁使得x11的服务端和客户端建立通信了。其实，我个人感觉这个通信过程更侧重应用端不断的向服务端发送绘图请求，而服务端应该不会向客户端发送过多的请求。ssh服务是有x11 forewording推送功能的。我们需要打开linux服务器上的ssh服务的x11 forwarding功能，这是在sshd的配置文件中打开的。打开linux服务器上ssh的该功能后，用ssh -X user@linux-server这样的方式登录到linux服务器，linux服务器上的客户端应用就可以通过ssh向本地机器推送x11请求了。具体的操作，在mac os x系统只要安装了x11 ，再用ssh -X user@linux-server登录到linux，linux上的客户端就自动向本地机器上发送x11请求了；windows安装了xming（这个软件能都在linux上搭起x11服务端），再打开一个x11服务端的DISPLAY，再做些其他的配置（没有亲测）应该也能建立服务端和客户端的通信。  
　　mac os x装了x11后，在ssh -X user@linux-server到linux时，本地的x11应该自动打开了一个DISPLAY，linux端的DISPALY变量应该自动成为localhost：10.0。具体的原理是，一定要客户端的应用的x11请求指向本地机器x11服务端的某个DISPLAY。一个X11服务端可以有处理多个客户端的请求的DISPLAY。
