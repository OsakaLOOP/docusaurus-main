---
sidebar_position: 1
custom_bg_img: random
---
#   数学基础 - 线代
##  行列式、迹与特征值的关系
通过特征多项式, 可以把前两者与特征值建立联系. 
$$f(x)=\det(x \bm{E}-\bm{A})=(x-\lambda_1)(x-\lambda_2)\cdots(x-\lambda_n) \tag{＊}$$
考察其常数项系数, 令 $x=0$,
$$f(0)=\det(-\bm{A})=(-1)^n \det(\bm{A})=(-1)^n \lambda_1 \lambda_2 \cdots \lambda_n$$
$$\Rightarrow \det(\bm{A})=\prod_{i=1}^n \lambda_i.$$
反过来, 从 $x$ 的最高阶开始比较, 我们发现 $x^n$ 系数只能为 $1$, 故考察 $x^{n-1}$ 阶:
对 $(＊)$ 式右边的多项式, 展开即得系数为 $\displaystyle{-\sum_{i=1}^n \lambda_i},$\
而对左边的行列式:
$\det \begin{pmatrix}
x-a_{11} & -a_{12} & \cdots &-a_{1n} \\[0.5em]
-a_{21} & x-a_{22} & \cdots &-a_{2n} \\[0.5em]
\cdots & \cdots & \ddots & \cdots \\[0.5em]
-a_{n 1}&-a_{n 2}&\cdots&x-a_{n n}
\end{pmatrix}$, 考虑第一行展开, 只有选取第一个元素才得到 $x^{n-1}$ 项, 以此类推可得系数为$\displaystyle{-\sum_{i=1}^n a_{ii}}=-\mathrm{tr}(\bm{A})$
$$\Rightarrow \mathrm{tr}(\bm{A})=\sum_{i=1}^n \lambda_i.$$
也可以考虑韦达定理, $f(x)=0$ 的根为 $\lambda_i$, 易得同样结果.
##  元素条件的等价
1.  每一行的和为 $a \Rightarrow \bm{A}\begin{pmatrix}1&1&\cdots&1\end{pmatrix}^T=a\begin{pmatrix}1&1&\cdots&1\end{pmatrix}^T,$\
 一个特征值 $\lambda=a,$ 对应 $\bm{\xi}=\begin{pmatrix}1&1&\cdots&1\end{pmatrix}^T$
2.  第 $1 (i)$ 列为 $\bm{B} \Rightarrow \bm{A}\begin{pmatrix}1&0&\cdots&0\end{pmatrix}^T=\bm{b}^T$\
    例如, 假设已知 $\bm{A}\in \mathbb{R}^{3\times3}$ 的三个特征向量 $\xi_1, \xi_2, \xi_3 \Rightarrow $用 $\xi_i $ 分解 $\begin{pmatrix}1&0&\cdots&0\end{pmatrix}^T,$ 则容易解得 $\bm{A}$ 的三个特征值

##  基本方法
### 0.  幂零矩阵与零化多项式
若存在多项式 $f(x) \in \mathbb{F}[x]$ 使得 $f(\bm{A}) = O$, 则称 $f(x)$ 为 $\bm{A}$ 的零化多项式. 次数最低的称为最小多项式 $m_A(x)$, 且有 $m_A(x) \mid g(x)$.
  
Cayley-Hamilton 定理:
  > 设 $f(\lambda) = \det(\lambda I - \bm{A})$ 为 $\bm{A}$ 的特征多项式, 则 $f(\bm{A}) = O$.\
  > 特征多项式必然是零化多项式(存在性)\
  > $\lambda$ 是 $\bm{A}$ 的特征值, 当且仅当 $m_A(\lambda) = 0$

若存在正整数 $k$ 使得 $\bm{A}^k = O$, 则称 $\bm{A}$ 为幂零矩阵. 使 $\bm{A}^k = O$ 成立的最小正整数 $k$ 称为 $\bm{A}$ 的幂零指数.

$\bm{A}^k =0 \text{ 的最小正整数 } n\Rightarrow$
1. $ \bm{A}$ 的特征值全为 $0$. 
2.  $\bm{A}$ 的特征多项式为 $\chi_A(\lambda) = \lambda^n$. 
3.  $\bm{A}$ 的迹 $\text{tr}(\bm{A}^k) = 0$ 对于所有 $1 \le k \le n$ 均成立. 
4.  $\bm{A}$ 相似于一个严格上三角矩阵. 

若 $A$ 是幂零矩阵，则 $I - A$ 必然可逆，且其逆矩阵可以展开为
$$(I - A)^{-1} = I + A + A^2 + \dots + A^{k-1}$$
两个幂零矩阵相似，当且仅当它们对于所有 $i \in \{1, \dots, n\}$，其幂的秩 $r(A^i)$ 均相等。

块对角矩阵特征值 (Block Diagonal Matrix Eigenvalues)
1. 结构定义 (Definition): 设 $M = \text{diag}(A_1, A_2, \dots, A_k)$，其中 $A_i$ 为 $n_i \times n_i$ 的方阵。

2. 特征多项式 (Characteristic Polynomial): $\det(M - \lambda I) = \prod_{i=1}^k \det(A_i - \lambda I)$。这是由行列式的分块性质 (Block property of determinants) 直接导出的。

3. 特征值集合 (Spectrum / 固有値集合): $\sigma(M) = \bigcup_{i=1}^k \sigma(A_i)$。$M$ 的特征值完全由各子块特征值的并集组成。

4. 重数性质 (Multiplicity): $\lambda$ 在 $M$ 中的代数重数等于其在各子块 $A_i$ 中的代数重数之和。

5. 例外情况 (Exceptions): 对于块三角矩阵 (Block Triangular Matrix)，上述关于特征值的结论依然成立，但其特征向量 (Eigenvectors) 的构造与对角矩阵存在显著差异。

伴随矩阵的特征值非奇异情形：若 $|A| \neq 0$，设 $A$ 的特征值为 $\lambda_1, \lambda_2, \dots, \lambda_n$，则 $A^*$ 的特征值为 $\frac{|A|}{\lambda_1}, \frac{|A|}{\lambda_2}, \dots, \frac{|A|}{\lambda_n}$。理由：由 $AA^* = |A|I$ 得 $A^* = |A|A^{-1}$。若 $Ax = \lambda x$，则 $A^{-1}x = \frac{1}{\lambda}x$，故 $A^*x = \frac{|A|}{\lambda}x$。秩为 $n-1$ 情形：若 $r(A) = n-1$，则 $A^*$ 恰有一个特征值为 $\text{tr}(A^*)$，其余 $n-1$ 个特征值均为 $0$。理由：此时 $r(A^*) = 1$。秩为 $1$ 的矩阵有 $n-1$ 个零特征值，唯一的非零特征值等于其迹。秩小于 $n-1$ 情形：若 $r(A) < n-1$，则 $A^*$ 的所有特征值均为 $0$。理由：此时 $A^* = O$，零矩阵的特征值全为 $0$。特征向量关系：若 $\lambda \neq 0$，则 $A$ 对应于 $\lambda$ 的特征向量也是 $A^*$ 对应于 $\frac{|A|}{\lambda}$ 的特征向量。当 $A$ 不可逆时，对应于零特征值的特征向量属于 $A^*$ 的核空间。

##  奇技淫巧
1.  $\bm{\bm{A}}$ 的特征值为 ${3,1,1} \Rightarrow $ 构造 $\bm{B}=\bm{\bm{A}}-\bm{E}$, 对应特征值为 $2,0,0 \Rightarrow \mathrm{r}(\bm{B})=1, \bm{B}$ 的所有行/列成比例
如果是行变换?$(\bm{A} \mid E) \rightarrow (\Lambda \mid C^T)$