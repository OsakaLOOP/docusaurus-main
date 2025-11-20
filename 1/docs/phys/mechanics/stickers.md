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