---
sidebar_position: 0
displayed_sidebar: talkSidebar
custom_bg_img: random
---
#   Dev Notes
##  基于 React 的 WEB 开发
### 组件规则
1.  组件的名称必须以大写字母开头，否则它们将无法运行！ `大写-组件`    `小写-html标签`
2.  不要嵌套组件的定义，而是`定义-引入-渲染分离`
3.  相同位置的不同组件会使 state 重置
   
### JSX 规则 
1.  只能返回一个根元素 (`<>  </>` 元素用于分组)
2.  标签必须闭合 `<xx />` or `<xx></xx>`
3.  变量命名不能包含 `-` 符号或者像 `class` 这样的保留字, HTML 和 SVG 属性名常用驼峰
:::warning
CSS 属性名必须由连字符替换为驼峰!
```JSX showLineNumbers
/* Instead of this: */
<span style="background-color: red">Foo</span>
/* Use this: */
<span style={{backgroundColor: 'red'}}>Foo</span>
:::
4.  只能在以下两种场景中使用大括号(任意JS表达式)：
    用作 JSX 标签内的文本 `<> {} </>`
    用作紧跟在 = 符号后的 `属性 = {}` 

-   必须用另一对额外的大括号包裹对象 
    *e.g.*
    CSS 样式对象    
    `style={{}}`;  
    React 事件对象 `onClick={e =>{... }}`  
    对象的属性用 `{{}}.xx` 访问

### CSS 语法
1.  CSS声明总是以 `;` 结束，声明总以 `{}` 括起来:
2.  注释以 `/*` 开始, 以 `*/` 结束

### html 语法

#   Python Memos<br /><span style={{fontSize:'20px'}}>(课内,物理课题,以及WEB api开发)</span>

### 函数
-   定义
    ```python showLineNumbers
    def functionname( parameters ):
            "函数_文档字符串"
            function_suite
            return [expression] 
-   参数传递：将实参传递给形参
    -   不可变类型：类似 c++ 的值传递
        如 整数、字符串、元组。如`fun(a)`，传递的只是a的值，没有影响a对象本身。比如在 `fun(a)` 内部修改 a 的值，只是修改另一个复制的对象，不会影响 a 本身。
    -   可变类型：类似 C++ 的引用传递，如 列表，字典。
        如 `fun(a)`，则是将 la 真正的传过去，修改后 fun 外部的 la 也会受影响
    -   不定长参数:
        1. 加了*存放所有未命名的参数
        2. 加**以字典存放可命名参数
    -   默认参数: `a=x`, 定义函数时必须将默认参数放在最后
    -   关键字参数: 传入时可乱序
-   `return`: 空则为 None, 多个 a,b,c 默认为 tuple
-   `lambda` (匿名函数) 用例 —— 函数式编程:
    -   常用于 list 的多种方法
        -   `sorted(A, key = lambda a:a的表达式)`  
            或 `cmp= lambda a,b:比较两个元素并返回0,1,-1`
        -   `list(map(lambda x:x的表达式,<list>))` 
            重写每个元素(注意map返回`<iterable>`)

        -   `reduce(lambda x,y:x,y的表达式,<list>)` 
            第1,2;2,3;...个元素进行操作(使用`from functools import reduce`)
    -   多个参数用 `,` 分隔

### Mechanism
-   在没有逗号的情况下，Python会将括号解释为数学运算中的括号
    *e.g.* `lst = (,)` ✅&ensp;&ensp;&ensp;&ensp;空字典无需 `dct = {}` ✅
-   创建空集合必须用 `set()`
-   不可变类型: 
    -   `int`, `str`, `bytes` or `b''` - 不可变的二进制序列, `tuple`, `frozenset`
-   推导式 - 从一个数据序列构建另一个新的数据序列的结构体
    ```python showLineNumbers
    [expr for var in seq if condition] 
    {key_expr: value_expr for key_var in seq if condition}
    {expr for item in seq}
    ```
    ＊元组推导式 - 生成器表达式
    ```python showLineNumbers
    (expr for var in seq if condition)
    ```
    对多个参数, 可用 `for x, y in [tuple]` 形式
### 库

#### 标准库 - os, re, sys, math, datetime, random
1.  os - 系统操作接口 
    https://docs.python.org/zh-cn/3/library/os.html
    -   常见:
        -   I/O 流操作
            ＊防止 `os.open()` 覆盖内建 `open()` ,使用 `import os`
        -   定向终止 - `sys.exit()`      
    -   导入方式

            import xx, xx.yy()
            from xx import yy or *, yy()

    -   注意对象作用域
        任何在函数内赋值的变量都是局部的，
        除非用 `global x =` 附值
        正确调用全局变量也需 `global x`

        如果一个局部变量和全局变量重名，则Python在函数内默认访问局部变量 namespace 

        特殊字符串变量`__name__`指向模块的名字，`__file__`指向该模块的导入文件名

    -   判断作为主函数运行  `if __name__='__main__'`:
    作为模块则 `__name__` 即模块名

### 包

#### 基本

### 控制流
-   if 控制结构
    ```python 
    if ...: elif ...: else:
-   遍历循环
    ＊避免循环中修改迭代对象
    ```python
    for a in <iterable>:
-  遍历完后执行 else 语句块
    ```python
    for ... : else: 
-   条件循环    
    `while ... :`or `while True: ... break`
    CTRL+C 退出当前的无限循环

-   `while ...: else:`
    while 条件语句为 false (即结束循环)时，则执行 else 的语句块。

-   触发 `break` 时均不会执行 `else`
    `continue` 直接进入下一循环
    `pass` 占位语句

-   三元运算符 - `x if C else y`

-   迭代
    `sys. getrecursionlimit() sys. setrecursionlimit(int)` 更改迭代深度

### 面向对象
-   类的定义与继承、方法的定义(self 自动传入对象本身)
    -   Python 有限地支持多继承形式, 并从左至右搜索
        >   如果一种语言不支持继承，类就没有什么意义。  
        ```python showLineNumbers
        class NewClass:
            def __init__(self, ...):
                ...
            def X(self, ...):
        
        class MultiDerivedClass(Base):
            def __init__(self, ...):
                Base.__init__(self, ...)
                ...
            def X(self, ...):

        class MultiDerivedClass(Base1, Base2, Base3):
            def __init__(self, ...):
                Base1.__init__(self, ...)
                Base2.__init__(self, ...)
                ...
            def X(self, ...):
        ```
    -   子类不重写 `__init__`，实例化子类时，会自动调用父类定义 `__init__`
    -   `def` 可覆盖重写父类的方法, `super(object).method() #Python 3` 用于调用父类方法(包括 `__init__`)
    -   `__private_attrs` 两个下划线开头，声明该属性为私有, 调用报错 `AttributeError`
-   创建方法 `object.__init__(self, ...)` (自动调用)
-   删除方法 `object.__del__(self, ...)` (执行退出或者显式调用 `del()`, 使引用计数减少到0时自动释放) 或者 `del` 关键字语句
-   特殊方法 - 每个类自行定义基于该语言运算符的特定行为
    特殊方法设为 None 则表示不可用
    `object.__str__(self)` - `str()`, `print()` 调用
    `object.__hash__(self)` - `hash()` 调用
    `object.__bool__(self)` - 真值检测
    `object.__exit__(self)` - 用于 `with` 语句处理异常
    以下值在转换为布尔值时为 `False`：`None、False`、零 (`0、0.0、0j`)、空序列(`''、()、[]`)和空映射(`{}`)。其他所有值转换为布尔值时均为 `True`。
    `__cmp__, __call__, __add__, __sub__, __mul__, __truediv__, __mod__, __pow__,` - 基本运算(同样支持重写)
-   对象类型判断
    ```python showLineNumbers
    type(a) -> <class 'int'>
    isinstance(a, int)  -> bool
    ```
### 序列与映射
-   `<sequence>[i]` 调用 `.__getitem__()` 方法  
    `<sequence>[a:b]` 标记创建 slice 对象
-   `functools.reduce()` 累积计算: 第0, 1个操作, 得到结果与第2个操作,以此类推
-   `filter(func, iterable)` 筛选产生新列表(迭代器)

### 迭代器
-   `iter(<iterable>)`创建迭代器(定义了`__iter__()` 和`__getitem__()`方法的对象均视为`<iterable>`)

-   容器对象 (例如 list) 在你每次将其传入 `iter()` 函数或是在 `for` 循环中使用时都会产生一个新的迭代器。 

-   `__iter__()` 方法用来返回该迭代器对象自身
    迭代器对象无论执行多少次__iter__方法,还是迭代器对象(本身)
    对非迭代对象可用于创建迭代器

-   `__next__()` 方法 (或将其传给内置函数 `next()`) 将逐个返回流中的项
    拥有 `__next__()` 方法的对象才是迭代器, 否则如字典集合只有 `__iter__()`

-   `StopIteration`异常, `__next__()` 方法取完之后报错, 在 `for` 中自动捕获处理
-   `filter()` 等内置函数使用时返回迭代器, 需要用 `list()` 转换类型
-   用于读写 `open()` 打开的文件对象
### I/O
-   `f''` 与 `''.format` 中, 格式化参数用`{}`包裹 (`{{}}`转义一对`{}`)

### 文件
-   文件权限, 否则 `OSError`
-   `mode` 参数: t(默认) x(新建文件, 若已存在报错) r w (均将指针放在开头, 故 w 会从头覆写) a(指针末尾追加) 可复合b/+
-   `with open() as f`: 错误处理, 若 err 自动 调用 `file.close()`(实则 `.__exit__()`) 关闭文件
-   `file` 可迭代, `for line in fp:`
-   `file.readline()` 读取整行，包括 "\n"
    `file.readlines()` 返回列表[str], 包括 "\n"
    同样, `file.writelines([str])` 向文件写入一个字符串列表，需要加入每行的 "\n"
-   `file.seek(offset,whence=0,1,2)` 随机读写 `file.tell`
-   ＊文件描述符 `file descriptor FD` 整型: 常配合 `os` 使用, 由 `file.fileno()` 获得

### 杂项
-   `sort()` 与 `sorted()` 区别： 
    `list.sort()` 是应用在 list 上的方法，
    `sorted(<iterable>)` 可以对所有可迭代的对象进行排序操作。

### Bugs & Features
#### 列表的存储特性、浅拷贝、深拷贝
#### 常见 Exceptions
| # | 异常                | 描述                                    |
|:---:|:-----------------:|:-------------------------------------:|
| 1 | AssertionError    | assert（断言）语句失败                        |
| 2 | AttributeError    | 试图访问一个对象没有的属性，比如foo.x ，但是foo没有x这个属性。  |
| 3 | IOError           | 输入/输出异常，基本上是无法打开文件。                   |
| 4 | ImportError       | 无法引入模块或者包，基本上是路径问题                    |
| 5 | IndentationError  | 语法错误，代码没有正确对齐                         |
| 6 | IndexError        | 下标索引超出序列边界，比如当x只有三个元素，却试图访问x[5]       |
| 7 | KeyError          | 试图访问字典里不存在的键                          |
| 8 | KerboardInterrupt | Ctrl + C 被按下                          |
| 9 | NameError         | 使用一个还未被赋值予对象的变量                       |
#### 异常处理
-   `try: except type as e:` 可以使用多个 `except` 语句, 或者使用较为笼统的 `Exception`
-   `try: except type as e: else:` 未发生异常
## Git Hacks
-   `git push origin main -f`  
    (舍弃所有远程修改, Codespace 出 bug 时有奇效)
-   虽然最终因为网络环境, Codespace 太卡, 还是把所有东西都 Clone 到本地了hhh

## Markdown Issues
-   注意列表中的行引用后面不能有空行, 只能紧接下一项, 且内部应当同一缩进, 否则可能导致报错 `Unexpected lazy line`(更有可能是 Docusaurus 的编译器太 *Lazy* 了, 毕竟 markdown 可是[图灵完备](https://store.steampowered.com/app/1444480/Turing_Complete/)的)
-   作为 MD 拓展, MDX 中所有 html 等语法与 JSX 一致(特别是标签属性)

##  Docusaurus 建站与自定义
### Sidebars
-   在 `\\docusaurus.config.ts` 中, Sidebar 的展示是与 Navbar 中 `item` 相统一的, 且通常一个 `docs` 插件对应一个 Navbar. 且`\\sidebars.ts` 中默认的 `autogenerated` 行为已经满足需求.
-   而对于 `\\docs` 下的多个分类, 有必要生成不同的 Sidebar 以精简展示内容时, 直接使用 `autogenerated` 便会缺失分类本身对应的 item. 这时应当混合使用固定和自动生成:
    ```JSX showLineNumbers
    apiSidebar: [{
      type: 'category',
      label: 'API Documentation', 
      collapsed: false, //强制打开
      link: {
        type: 'generated-index',
        slug: '/api/overview', //使用 slug 固定生成的分类链接
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'api', 
        },],//items 中容纳分类子项目
        
##   构建自己的 RSS Feed 服务器
>   食材: [Github REST api](https://docs.github.com/zh/rest?apiVersion=2022-11-28), pyGithub, flask, nginx
    
