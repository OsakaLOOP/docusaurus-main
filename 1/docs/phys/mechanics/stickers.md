---
sidebar_postion: 0
custom_bg_img: random
---

#   普物力学便利贴
##  $1.1$ 强形式牛顿第三定律与刚体内力的假设

在推导 `刚体内力对做功为 0` 时, 除了用到刚体的定义: 任两点满足 $\left|\overrightarrow{r}_i-\overrightarrow{r}_j \right|= Const$ 之外,还用到一个隐含的假设: 
$$
\overrightarrow{F}_{ij} = -\overrightarrow{F}_{ji} \parallel \overrightarrow{r}_{ij}, \text{ 进而有 } \overrightarrow{F}_{ij}\times \overrightarrow{r}_{ij}=\overrightarrow{F}_{ji}\times \overrightarrow{r}_{ij}=\overrightarrow{\mathbf{0}}
$$
这个假设又被称作 `强形式牛顿第三定律`.
> Gemini 试图用角动量定理来证明不存在反例, 但我们可以发现其中的循环论证.

我们不妨回到角动量定理的推导:
$$
\overrightarrow{F}=m \overrightarrow{a}\Rightarrow \frac{\mathrm{d} L}{\mathrm{d}t}=\sum_i \overrightarrow{r}_i\times \overrightarrow{F}_i=\underset{\text{外力矩}}{\sum_i \overrightarrow{r}_i\times \overrightarrow{F}^{(\mathrm{ext})}_i}+\underset{\text{内力矩}}{\sum_i \sum_{j\neq i} \overrightarrow{r}_i\times \overrightarrow{F}_{ji}^{(\mathrm{int})}}
$$
注意到内力矩又可写成:$$\overrightarrow{M}^{(\mathrm{int})}=\sum_{(i,j)}\left(\overrightarrow{r}_i\times\overrightarrow{F}_{ij}+\overrightarrow{r}_j\times\overrightarrow{F}_{ji}\right)=\sum_{(i,j)}\left((\overrightarrow{r}_i-\overrightarrow{r}_j)\times\overrightarrow{F}_{ij}\right)=\sum_{(i,j)}\overrightarrow{r}_{ij}\times\overrightarrow{F}_{ij}$$  
如果我们只接受牛顿第三定律, 那么推导将不能进行下去. 为得到 $\displaystyle{\overrightarrow{M}^{(\mathrm{int})}=\overrightarrow{\mathbf{0}}}$, 假设仍然是必要的.