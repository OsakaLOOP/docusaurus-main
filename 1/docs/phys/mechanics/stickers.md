---
sidebar_postion: 0
custom_bg_img: random
displayed_sidebar: physSidebar
---

#   普物力学便利贴
##  $1.1$ 强形式牛顿第三定律与刚体内力的假设

在推导 `刚体内力对做功为 0` 时, 除了用到刚体的定义:\
任两点满足 $\left|\overrightarrow{r_i}-\overrightarrow{r_j} \right|= Const \displaystyle{\Rightarrow \mathrm{d}\left(\overrightarrow{r_{ij}}\right)^2=}2 \overrightarrow{r_{ij}} \cdot \mathrm{d}\overrightarrow{r_{ij}}=0$ 之外,\
还用到一个隐含的假设: 对任意两个质元的相互作用力(内力),
$$
\overrightarrow{F_{ij}} = -\overrightarrow{F_{ji}} \parallel \overrightarrow{r_{ij}}, \text{ 进而有 } \overrightarrow{F_{ij}}\times \mathrm{d}\overrightarrow{r_{ij}}=0, \ \text{且 } \overrightarrow{r_{ij}}\times \overrightarrow{F_{ij}}=\overrightarrow{r_{ij}}\times \overrightarrow{F_{ji}} =\overrightarrow{\mathbf{0}}
$$
从而
$$
dW_{ij} = \overrightarrow{F_{ij}} \cdot \mathrm{d}\overrightarrow{r_i} + \overrightarrow{F_{ji}} \cdot \mathrm{d}\overrightarrow{r_j} = \overrightarrow{F_{ij}} \cdot (\mathrm{d}\overrightarrow{r_i} - \mathrm{d}\overrightarrow{r_j}) = \overrightarrow{F_{ij}} \cdot d\overrightarrow{r_{ij}} = 0
$$
上述推导中, 用到的这个假设又被称作 `强形式牛顿第三定律`, .
> Gemini 试图用角动量定理来证明不存在反例, 因为刚体不能形变还包括相对转动, 而如果是整体转动则又违背了角动量定理. 但我们可以发现其中的循环论证.

我们不妨回到角动量定理的推导:
$$
\overrightarrow{F}=m \overrightarrow{a}\Rightarrow \frac{\mathrm{d} L}{\mathrm{d}t}=\sum_i \overrightarrow{r_i}\times \overrightarrow{F}_i=\underset{\text{外力矩}}{\sum_i \overrightarrow{r_i}\times \overrightarrow{F}^{(\mathrm{ext})}_i}+\underset{\text{内力矩}}{\sum_i \sum_{j\neq i} \overrightarrow{r_i}\times \overrightarrow{F_{ji}}^{(\mathrm{int})}}
$$
注意到内力矩又可写成:$$\overrightarrow{M}^{(\mathrm{int})}=\sum_{(i,j)}\left(\overrightarrow{r_i}\times\overrightarrow{F_{ij}}+\overrightarrow{r_j}\times\overrightarrow{F_{ji}}\right)=\sum_{(i,j)}\left((\overrightarrow{r_i}-\overrightarrow{r_j})\times\overrightarrow{F_{ij}}\right)=\sum_{(i,j)}\overrightarrow{r_{ij}}\times\overrightarrow{F_{ij}}$$  
如果我们只接受牛顿第三定律, 那么推导将不能进行下去. 为得到 $\displaystyle{\overrightarrow{M}^{(\mathrm{int})}=\overrightarrow{\mathbf{0}}}$, 假设仍然是必要的.

## $2.1$ 非线性振动
准弹性力下: $m \ddot{x}=-k x-\alpha x^2-\beta x^3-\cdots$\
认为 $\alpha, \beta, \dots $ 依次为 $1, 2, \dots$ 阶小量, 这样方程本身可以逐级近似处理.

零级近似: 略去小量, $m \ddot{x}^{(0)}=-k x^{(0)} \Rightarrow$ 通解 $ x^{(0)}=A \cos(\omega_0 t+\phi_0)$

再令 $x= x^{(0)}+x^{(1)},$ 代入原方程, 保留到一阶: 

$$m \frac{\mathrm{d}^2}{\mathrm{d}t^2}\big(x^{(0)}+x^{(1)}\big)=-k\big(x^{(0)}+x^{(1)}\big)-\alpha \big(x^{(0)}\big)^2 \Rightarrow m\ddot{x}^{(1)}=-\omega_0^2 x^{(1)}-\alpha A^2 \frac{\cos2(\omega_0 t+\phi_0)+1}{2} $$
为受迫振动形式, 等效的外加项频率为 $\omega_1=2 \omega_0$, 并且考虑正规化, $\omega_0$ 的振动成分应该全部纳入 $A$. 那么解为 $$x^{(1)}=-\frac{\alpha A^2}{2m \omega_0^2}+\frac{\alpha A^2\cos2(\omega_0 t+\phi_0)}{6m\omega_0^2}$$
继续令 $x=x^{(0)}+x^{(1)}+x^{(2)}$, 代入原方程, 保留到二阶小量, 可以得到
$$\begin{aligned} m \ddot{x}^{(2)}&=-k x^{(2)}-2\alpha x^{(0)}x^{(1)}-\beta \big(x^{(0)}\big)^3 \\ &=-m\omega_0^2 x^{(2)}-\alpha A x^{(1)} \cos(\omega_0 t+\phi_0)-\beta A^3 \frac{3\cos(\omega_0 t+\phi_0)+\cos3(\omega_0 t+\phi_0)}{4}\\
\Rightarrow \ddot{x}^{(2)}&=-\omega_0^2 x^{(2)}+ A^3\Big(\big(\frac{5\alpha^2}{6m^2\omega_0^2}-\frac{3\beta}{4m}\big)\cos(\omega_0 t+\phi_0)-\big(\frac{\alpha}{6m^2\omega_0^2}+\frac{\beta}{4m}\big)\cos3(\omega_0 t+\phi_0)\Big)\end{aligned} $$
$x^{(2)}$ 方程的形式仍然是受迫振动, 但是注意到包含了与本征频率相同的驱动项, 放着不管会造成指数发散的共振.

这本质上是因为非谐性带来的基频偏离, 与振幅 $A$ 和其他参数有关, 且误差随周期积累, 产生了动力学效应. 或者换个运动学视角, 对这样的守恒非线性振动系统, 它总归是周期的, 而我们其实在尝试用一个固定且偏置的逐阶近似解——傅里叶级数描述, 用于采样的频率 $\omega_0$ 偏离了系统非协周期振动的实际频率 $\omega$, 那么所得系数将会发散.

比如, 对任意的 $x_T(t)=\sum^\infty_{n=-\infty} F_n \cos(n\omega t+\varphi_n)=\sum^\infty_{n=-\infty} A_n  \cos(n\omega_0 t+\varphi'_n),$ 计算其各项系数(振幅).

$$A_n = \mathscr{F}_{\omega_0}\big(x_T(t)\big)=\frac{1}{T_0}\int_0^{T_0}$$
