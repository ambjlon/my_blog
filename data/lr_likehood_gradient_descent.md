在逻辑回归模型中, 样本X的预测函数写为:
$$h\_\theta(X)=g(\theta^{T}X)=\frac{1}{1+e^{-\theta^{T}X}}$$
其中$\theta$是参数向量, X是样本向量. $h\_\theta(X)$表示样本的预测值为1的概率, 这样样本X取值1和0的概率可以表示为:
$$P(y=1|X;\theta)=h\_\theta(X)$$
$$P(y=0|X;\theta)=1-h\_\theta(X)$$
综合起来, 可以写做:
$$P(y|X;\theta)=h\_\theta(X)^{y}(1-h\_\theta(X))^{1-y}$$

当有m个样本$X_1,...,X_m$
