在逻辑回归模型中, 样本X的预测函数写为:
$$h_\Theta(X)=g(\Theta^{T}X)=\frac{1}{1+e^{-\Theta^{T}X}}\tag{1}$$
其中$\Theta$是参数向量, X是样本向量. $h_\Theta(X)$表示样本的预测值为1的概率, 于是样本X取值1和0的概率可以表示为:
$$P(y=1|X;\Theta)=h_\Theta(X)\tag{2}$$
$$P(y=0|X;\Theta)=1-h_\Theta(X)\tag{3}$$
综合起来, 可以写做:
$$P(y|X;\Theta)=h_\Theta(X)^{y}(1-h_\Theta(X))^{1-y}\tag{4}$$

如此, m个样本$(X_1,y_1),...,(X_m,y_m)$的似然函数写成:
$$L(\Theta)=\Pi_{i=1}^{i=m}P(y_i|X_i;\Theta)=\Pi_{i=1}^{i=m}h_\Theta(X_i)^{y_i}(1-h_\Theta(X_i))^{1-y_i}\tag{5}$$
等式两端同时取对数得到对数似然函数:
$$l(\Theta)=logL(\Theta)=\sum_{i=1}^{i=m}(y_{i}logh_\Theta(X_{i})+(1-y_{i})log(1-h_\Theta(X_{i})))\tag{6}$$

最大似然估计就是在给定的样本数据下, 求解使得似然函数取得最大值的$\Theta$. 使用梯度上升求解使得对数似然函数取得最大值的$\Theta$, 先求$l(\Theta)$对$\theta_{k}$的偏导数:  
$$
\begin{split}
\frac{\delta}{\delta\theta_{i}}l(\Theta)&=\sum_{i=1}^{i=m}(y_{i}\frac{1}{h_{\Theta}(X_{i})}\frac{\delta}{\delta\theta_{k}}h_{\Theta}(X_{i})+(1-y_{i})\frac{1}{1-h_{\Theta}(X_{i})}\frac{\delta}{\delta\theta_{k}}(1-h_{\Theta}(X_{i}))) (复合对数求导)\\\\
&=\sum_{i=1}^{i=m}(y_{i}\frac{1}{h_{\Theta}(X_{i})}\frac{\delta}{\delta\theta_{k}}h_{\Theta}(X_{i})-(1-y_{i})\frac{1}{1-h_{\Theta}(X_{i})}\frac{\delta}{\delta\theta_{k}}h_{\Theta}(X_{i}))(1的导数是0)\\\\
&=\sum_{i=1}^{i=m}(y_{i}\frac{1}{h_{\Theta}(X_{i})}-(1-y_{i})\frac{1}{1-h_{\Theta}(X_{i})})\frac{\delta}{\delta\theta_{k}}h_{\Theta}(X_{i})(提取公因子)\\\\
&=\sum_{i=1}^{i=m}(y_{i}\frac{1}{g(\Theta^{T}X_{i})}-(1-y_{i})\frac{1}{1-g(\Theta^{T}X_{i})})g(\Theta^{T}X_{i})(1-g(\Theta^{T}X_{i}))\frac{\delta}{\delta\theta_{k}}\Theta^{T}X_{i}(\frac{\delta}{\delta\theta_{k}}h_{\Theta}(X_{i})的求导参看$(8)$的推导过程)

\end{split}\tag{7}
$$
