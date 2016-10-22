### 概念
1. cpu多核和超线程技术.  
一颗物理cpu指在组成是一个整体的计算单元.  
一颗物理cpu的核数指的是相同计算功能的芯片数目.  
cpu的线程数是指采用超线程技术后cpu能在逻辑上支持的线程数, 也叫逻辑cpu数.
cpu的核数是在物理上的"硬"实现, 通过超线程技术一个"硬"核可以支持多线程. 对于一个"硬"核, 操作系统的感知逻辑上就像在使用多个"硬"核. 这也就有了在硬件市场上常说的"双核4线程", "双核8线程", "6核12线程", "6核24线程"等等.  
超线程技术实现的多线程和真正的多核在性能上不可同日而语, 一个物理核上的多线程之间还会共用很多资源的. 超线程在很多时候并不能表现出性能上的显著提升, 也常受诟病.  
2. 一台机器可以使用多个cpu. cpu的扩展就想内存的扩展一样, 只要引脚标准吻合就能插进去. 但是一台机器使用多个cpu并不如一个cpu内多核性能更佳.  
3. cpu的主频有什么参考意义吗?  
cpu的主频越高计算起来速度越快性能越好, 这个说法并不准确. 现代cpu提高运算速度主要从架构,超标量,流水线,指令集等方面进行优化. 单独的主频高并不能说明cpu的性能好.
4. 为什么互联网行业使用的服务器的主频通常不高?  
一个很有趣的现象是互联网行业使用的服务器的主频通常并不高, 还没有你的个人笔记本的主频高呢. 主频高意味着发热多, 发热多导致cpu稳定性下降, 容易发生故障. 互联网行业对服务器的要求是稳定第一, 而且大多时候是高并发的请求量, 高并发的请求可以通过多核甚至多cpu解决. 一般的游戏玩家会使用高主频的cpu, 这或许提升了游戏体验, 即便是骨灰级的游戏玩家也很少能连续24小时开机~~  

### 查看linux服务器cpu的性能
通过cat /proc/cpuinfo命令读取cpu的硬件信息. 这些信息是操作系统从cpu中读取的.  

```
processor       : 0
vendor_id       : GenuineIntel
cpu family      : 6
model           : 62
model name      : Intel(R) Xeon(R) CPU E5-2420 v2 @ 2.20GHz
stepping        : 4
cpu MHz         : 2201.000
cache size      : 15360 KB
physical id     : 0
siblings        : 12
core id         : 0
cpu cores       : 6
apicid          : 0
initial apicid  : 0
fpu             : yes
fpu_exception   : yes
cpuid level     : 13
wp              : yes
flags           : fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx pdpe1gb rdtscp lm constant_tsc arch_perfmon pebs bts rep_good xtopology nonstop_tsc aperfmperf pni pclmulqdq dtes64 monitor ds_cpl vmx smx est tm2 ssse3 cx16 xtpr pdcm dca sse4_1 sse4_2 x2apic popcnt aes xsave avx lahf_lm ida arat tpr_shadow vnmi flexpriority ept vpid
bogomips        : 4400.65
clflush size    : 64
cache_alignment : 64
address sizes   : 46 bits physical, 48 bits virtual
power management:

processor       : 1
vendor_id       : GenuineIntel
cpu family      : 6
model           : 62
model name      : Intel(R) Xeon(R) CPU E5-2420 v2 @ 2.20GHz
stepping        : 4
cpu MHz         : 2201.000
cache size      : 15360 KB
physical id     : 0
siblings        : 12
core id         : 1
cpu cores       : 6
apicid          : 2
initial apicid  : 2
fpu             : yes
fpu_exception   : yes
cpuid level     : 13
wp              : yes
flags           : fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx pdpe1gb rdtscp lm constant_tsc arch_perfmon pebs bts rep_good xtopology nonstop_tsc aperfmperf pni pclmulqdq dtes64 monitor ds_cpl vmx smx est tm2 ssse3 cx16 xtpr pdcm dca sse4_1 sse4_2 x2apic popcnt aes xsave avx lahf_lm ida arat tpr_shadow vnmi flexpriority ept vpid
bogomips        : 4399.88
clflush size    : 64
cache_alignment : 64
address sizes   : 46 bits physical, 48 bits virtual
power management:
...
...
...(这里只展示了前两个)
```
我们主要关心机器有几个物理cpu, 每个cpu有几个核, 每个cpu的线程数. 然后还可以看一下cpu的型号, 对应的在网上查找一下这个型号的cpu的制造工艺(nm)等口碑指标.

>查看物理CPU个数  
>cat /proc/cpuinfo| grep "physical id"| sort| uniq| wc -l  
>查看每个物理CPU中core的个数(即核数)  
>cat /proc/cpuinfo| grep "cpu cores"| uniq  
>查看逻辑CPU的个数  
>cat /proc/cpuinfo| grep "processor"| wc -l  
>查看CPU信息（型号）  
>cat /proc/cpuinfo | grep name | cut -f2 -d: | uniq -c  

### 参考
1. [浅谈多核CPU、多线程与并行计算](http://blog.csdn.net/delacroix_xu/article/details/5928121)
2. [超线程技术与双核心技术的区别（经典）](http://blog.csdn.net/zhangxinrun/article/details/6919507)
3. [T博士开讲 Intel/AMD特色技术名词解释](http://cpu.zol.com.cn/273/2737340.html)
4. [Linux查看物理CPU个数、核数、逻辑CPU个数](http://www.cnblogs.com/emanlee/p/3587571.html)
