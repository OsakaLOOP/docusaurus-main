---
sidebar_position: 0
displayed_sidebar: physSidebar
custom_bg_img: random
---
#   热统便利贴
>   期望的形式: 练习用 $\LaTeX$ 的简短写作, 作为书本内容的附注
##  $1.1$ 温度函数存在性的证明
>   双 11 入了刘川老师的热统新版, 糟糕的是读完热零 $\sim$ 二后就开始卡住, 还以为是 brain rot 了, 实际上在这个向来忽略的地方真的需要并且可以证明, 只是要用到微分几何😱好吧加入待学列表. 先让 D\*\*ps\*\*k 给简单解释了, 我又整理了一下.

>   总之, 公理化[^1]是好的, 但是代价是什么? 这是一个构造性的证明, 在数学上十分清晰, 但是物理意义不够明确. 因此基于可逆卡诺热机的定义仍是最广为接受的. 

热零定律给出了系统热平衡的传递性 $X_1 \sim X_2, X_2 \sim X_3 \rightarrow X_1 \sim X_3$.

考虑二维简单系统 ($x, y$), 由热一 (实则是平凡的能量关系)得到一个 Pfaffian 形式 $\delta Q=\mathrm{d} U +\delta W = X \mathrm{d} x+Y \mathrm{d} y$.

而由热二的等价形式 (Carathéodory 表述[^2]) —— 任意平衡状态的任意邻域内，存在绝热过程无法到达的状态, 可知 $Q$ 的过程依赖性, 则 $\delta Q$ 为不恰当微分. 并且这本身意味着状态量空间存在一个低维的绝热曲面族, 划分了从任一点出发可 / 不可到达的空间, 在二维中为 $S(x,y)\equiv \text{const} $ 的绝热曲线. 

寻找积分因子 $\theta$, 使得 $\dfrac{\delta Q}{\theta}=\dfrac{X}{\theta} \mathrm{d} x+ \dfrac{Y}{\theta} \mathrm{d} y=\mathrm{d} S$, 只需解 ODE, 且在物理意义下"必然"有解(数学上只能保证对可微函数, 局域).事实上二维情形的解存在是平凡的.

$$
\theta=\frac{X}{\Big(\dfrac{\partial S}{\partial x}\Big)}=\frac{Y}{\Big(\dfrac{\partial S}{\partial y}\Big)}, \text{其中 } S(x,y)=C \text{ 是 ODE : } P\mathrm{d}x+Q\mathrm{d}y=0\text{ 的参数化解. }
$$
其中 $S$ 精确到一个常数, $\theta$ 则完全确定. $\delta Q=0\Leftrightarrow \mathrm{d} S=0$, 故 $S(x,y)=C$ 即绝热曲线. 规定 S 的符号, 使得 $S\geq C$ 对应热二允许到达的部分. 那么等价于热二熵的表述 $\mathrm{d}S\geq 0$.

这将带来熵最大定理: 平衡态时 $S$ 取最大值, $\mathrm{d}S=0$\
(参见 Introduction to modern statistical mechanics - D. Chandler $\sect 1.3$)\
为了保证平衡态时内能取最小值, 我们还应假设温度的正定性, $\Big(\dfrac{\partial S}{\partial U}\Big)_V=1/\theta>0$. 同样参见现统导.

下面我们利用热零推导适用任意系统的绝对温度:\
考虑两个处于热平衡的系统 A 和 B 。它们有各自的热形式：
$$
\delta Q_A=\theta_A \mathrm{d}S_A,\ \delta Q_B=\theta_B \mathrm{d}S_B.
$$
由内能守恒, $\mathrm{d}Q_A+\mathrm{d}Q_B=0, $ 且 $\mathrm{d}S_A+\mathrm{d}S_B= 0$, 则必有 $\theta_A=\theta_B$. 那么上面的 $\theta$ 就是绝对温度.

对任意维, 如果不可积，根据 Pfaff-Darboux 定理，绝热路径就可以在局部填满整个空间, 这与热二的上述表示矛盾. $\theta(x_1,...,x_n)$ 同样可以得出, 改写一下就是物态方程.再改写下, 又得到热力学基本关系:　$\mathrm{d}U=T\mathrm{d}S-p \mathrm{d}V$

[^1]: 更一般的称呼是 ["Rational Thermodynamics"](https://ncatlab.org/nlab/show/rational+thermodynamics)

[^2]: 原文: Untersuchungen über die grundlagen der thermodynamik - Carathéodory C. | DOI 10.1007/BF01450409

    一些分析参见: The second law of thermodynamics as variation on a theme of Carathéodory - Joe D. Goddard | DOI 10.1098/rspa.2021.0425
    
##  $1.2$ 化学势 μ 的出现

闭(粒子数不可变)均匀单元系的热力学方程是: $\mathrm{d} U = T \mathrm{d}S -p \mathrm{d}V$
而对于均匀开单元系(粒子数可变), 1 mol 的方程仍然适用. $\mathrm{d} u = T \mathrm{d}s -p \mathrm{d}v$, 并且强度量 T, p 均不变.
从而, 

$$
\begin{aligned}
\mathrm{d}U &=\mathrm{d}(n u)=u\mathrm{d}n+n\mathrm{d}u=u\mathrm{d}n+n\left(T\mathrm{d}s-p\mathrm{d}v\right)\\
&=T\mathrm{d}(n s)-T s\mathrm{d}n-p\mathrm{d}(n v)+p v\mathrm{d}n+u\mathrm{d}n\\
&=T\mathrm{d}S-p\mathrm{d}V+\mu\mathrm{d}n, \text{ 其中 } \mu= u-T s +p v
\tag{1.2.1}
\end{aligned} 
$$
$\mu = \displaystyle{\frac{G}{n}}$, 又称摩尔吉布斯函数

而由 legendre 变换, 单元开系的自由能(巨势):

$$
J=F-n \mu =F -G=-p V, \mathrm{d}J=-S\mathrm{d}T-p\mathrm{d}V-n\mathrm{d}\mu
$$

##  $1.3$ 单元系复相平衡条件与稳定条件
我们现在考虑复相单元系(均匀的相不止一个, 但是粒子相同, 因而可以相互转化), 其中的每个相都可以看成开单元系, 热力学方程同样具有 $(1.2.1)$ 的形式. 

如果它们构成闭合系统, 即不考虑外界的约束作用, 只有最基本的守恒律约束:
$$\sum_\alpha \delta U_\alpha =\sum_\alpha n_\alpha \delta u_\alpha= 0, \quad  \sum_\alpha \delta V_\alpha = \sum_\alpha n_\alpha \delta v_\alpha = 0, \quad \sum_\alpha \delta n_\alpha =0$$

### 1. 平衡条件：熵的一阶变分 ($\bar{\delta} S = 0$)
根据熵的可加性, 用 Lagrange 乘子法得到约束下的一阶变分:
$$\begin{aligned}
\bar{\delta} S &= \delta S - \frac{1}{T_c}\delta U + \frac{p_c}{T_c}\delta V - \frac{\mu_c}{T_c}\delta N \\
&=\sum_\alpha  \left(\frac{1}{T}-\frac{1}{T_\alpha}\right) \delta U_\alpha + \sum_\alpha\left(-\frac{P}{T}+\frac{P_\alpha}{T_\alpha}\right) \delta V_\alpha\\&\ +\sum_\alpha \left(s_\alpha-\frac{u_\alpha}{T_c}-\frac{p_\alpha v_\alpha}{T_c}- \frac{\mu_\alpha}{T_c}\right) \delta N_\alpha  = 0
\end{aligned}
$$
这里的 $\displaystyle{\frac{1}{T_c}, \frac{p_c}{T_c}, \frac{\mu_c}{T_c}}$ 是对应于约束的乘子\
$\bar{\delta} S=0$ 即给出平衡判据:
$$\begin{cases}
T_1 = T_2 = \cdots = T_c & (\text{热平衡}) \\
P_1 = P_2 = \cdots = P_c & (\text{力学平衡}) \\
\mu_1 = \mu_2 = \cdots = \mu_c & (\text{相变/化学平衡})
\end{cases}$$

### 2. 稳定条件：熵的二阶变分 ($\bar{\delta}^2 S < 0$)

:::info
巧合的是, 虽然与一阶时一样, 这里仍然要考虑约束(而不是光溜溜的 $\delta^2 S$)!这一点在力学中直接体现出来
:::
但是 ... 由于热力学基本约束是线性的(这里默认了选取 $U_\alpha, V_\alpha, n_\alpha$ 为自变量), 可得