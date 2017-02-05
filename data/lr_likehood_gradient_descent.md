在逻辑回归模型中, 样本X的预测函数写为:
$$h_\theta(X)=g(\theta^{T}X)=\frac{1}{1+e^{-\theta^{T}X}}$$
其中$\theta$是参数向量, X是样本向量. $h_\theta(X)$表示样本的预测值为1的概率, 于是样本X取值1和0的概率可以表示为:
$$P(y=1|X;\theta)=h_\theta(X)$$
$$P(y=0|X;\theta)=1-h_\theta(X)$$
综合起来, 可以写做:
$$P(y|X;\theta)=h_\theta(X)^{y}(1-h_\theta(X))^{1-y}$$

如此, m个样本$X_1,...,X_m$的似然函数写成:
$$L(\theta)=\Pi_{i=1}^{i=m}P(y_i|X_i;\theta)=\Pi_{i=1}^{i=m}h_\theta(X_i)^{y_i}(1-h_\theta(X_i))^{1-y_i}$$
等式两端同时取对数得到对数似然函数:
$$l(\theta)=logL(\theta)=\sum_{i=1}{i=m}(y_{i}logh_\theta(X_i)$$
