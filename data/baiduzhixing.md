## 题目大意：  
随机数生成器通过三个参数c, q, n作为种子, 然后它就可以通过以下方式生成伪随机数序列：  

$$m_0=c$$
$$m_{i+1}=(q^2m_i+1)\ mod\ 2^n\ for\ all\ i\>0$$

因为一些奇怪的原因，q 一定是奇数。现在du熊想知道对于一个给定的数 x ，是不是会出现在这个伪随机数序列里面，如果存在的话，他还想知道最早是在哪里出现，即给定一个整数 x ，要求找出一个最小的整数 k 满足$m_k=x$  
## 目前自己所做的工作。  
首先用java大数类模拟实现了上面这个产生过程，代码如下（或许用同余定理也能实现大数求模，记不太清了）：  
```python
import java.util.\*; 
import java.math.\*;
public class bignum {
public static void main(String[] args) {
@SuppressWarnings("unused")
int n;
BigInteger q,x,c,count,base2,mod,qSquare,m1,m2;
Scanner cin=new Scanner(System.in);
while(cin.hasNext())
{
c = cin.nextBigInteger();
q = cin.nextBigInteger();
n = cin.nextInt();
x = cin.nextBigInteger();
count=BigInteger.valueOf(0);
base2=BigInteger.valueOf(2);
mod = base2.pow(n);
qSquare=q.multiply(q);
m1=c;
count = count.add(BigInteger.valueOf(1));
m2=((qSquare.multiply(m1)).add(BigInteger.valueOf(1))).mod(mod);
count=count.add(BigInteger.valueOf(1));
while(m2.compareTo(c)!=0 &amp;&amp;m2.compareTo(m1)!=0)
{
m1=m2;
//if(m2.compareTo(x)==0)
//;
//System.out.println(count);
//else
//{
m2=((qSquare.multiply(m1)).add(BigInteger.valueOf(1))).mod(mod);
count=count.add(BigInteger.valueOf(1));
System.out.println(m2);
//}
}
if(m2.compareTo(m1)==0)
System.out.println(-1);
}
}
```

　　注释掉的地方是比赛的时候需要的部分。这里说一下百度的云IDE，有点差劲，折腾了半天没交成，悲剧! 然后现在的问题主要是产生的随机数序列的周期怎么求，它有省么特性。这些随机数序列可定是有周期的，而且很容易发现序列到后面一定进入一个循环。我们先用m1,m2,m3,m4,m5,...mi,mi+1,...mj,mj+1,..mk.......表示这个随机数序列。这个循环说不定从哪里就产生了，我觉的这个周期一定有计算方法，以及他的性质等等。于是去搜索资料，百度，google，知网搜了一个遍（一堆垃圾），竟然没看见，即便有也是够隐蔽的了，悲剧！发现不了它的周期肯定不能用牺牲空间的方法做这个题目，谁知道它的周期会多么坑爹。  
　　然后看到q是奇数，好吧，先做些试验看看有什么规律吗？于是发现下面这些数据：  
45 21 35 2156（好几分钟都找不出不来重复的）  
123 4556545 21 5646（和c相等终止，运行几秒钟，这个貌似有点幸运了）  
456 1234 56 48965465（mi==mi+1终止）  
4565 88 52 465798（mi==mi+1终止）  
455 8666 21 5676875465（mi==mi+1终止）  
45 22 35 2156（mi==mi+1终止）  
45 4454654654564658 35 2156（mi==mi+1终止）  
45 44546546 35 2156（mi==mi+1终止）  
123 455654 21 5646（mi==mi+1终止）  
5668794 475535744827 49 15465465（好几分钟都找不出不来重复的）  
1 57 56 789（好几分钟都找不出不来重复的）  
看到了吧，q是偶数很简单，总是mi==mi+1终止；q是奇数就晕菜了。。。。会做的，会找周期的请留言，谢谢交流！  

ps：线性同余还可以出现在密码学中，不是很了解。有这方面知识的朋友请留言。  
同余方程的解法忘完了。。。。
