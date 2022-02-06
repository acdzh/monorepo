---
title: "Markdown Test Page"
date: 2020-04-24T22:52:10+08:00
draft: false
comment: true
slug: md_test
description: ""
tags: []
series: []
categories: [其他]
nolicense: true
---

# 标题

```md
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

这也是一个一级标题
============================

这也是一个二级标题
--------------------------------------------------

正文
```

# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

这也是一个一级标题
============================

这也是一个二级标题
--------------------------------------------------

正文


# 换行

## 末尾使用一个换行

```md
第一行
第二行
第三行
```

第一行
第二行
第三行

## 末尾使用两个空格和一个换行

```md
第一行  
第二行  
第三行
```

第一行  
第二行  
第三行

## 末尾使用两个换行

```md
第一行

第二行

第三行
```

第一行

第二行

第三行



# 字体

```md
*斜体文本*  
**粗体文本**  
***粗斜体文本***  
~~带删除线的文本~~ <u>带下划线的文本</u>
```

*斜体文本*  
**粗体文本**  
***粗斜体文本***  
~~带删除线的文本~~ <u>带下划线的文本</u>

# 分隔线

```md
***
```

***

# 脚注

```md
创建脚注格式类似这样 [^1].

[^1]: [这里是脚注示例.](https://www.google.com)
```

创建脚注格式类似这样 [^1].

[^1]: [这里是脚注示例.](https://www.google.com)

# 列表

## 无序列表

```md
- 第一项
* 第二项
+ 第三项
```

- 第一项
* 第二项
+ 第三项

```md
- 第2篇
	* 第2.1章
		+ 第2.1.1节
```

- 第2篇
	* 第2.1章
		+ 第2.1.1节

## 有序列表

```md
1. 第一项
2. 第二项
3. 第三项
```

1. 第一项
2. 第二项
3. 第三项

```md
1. 第一项：
    - 第一项嵌套的第一个元素
    - 第一项嵌套的第二个元素
2. 第二项：
    - 第二项嵌套的第一个元素
    - 第二项嵌套的第二个元素
```

1. 第一项：
    - 第一项嵌套的第一个元素
    - 第一项嵌套的第二个元素
2. 第二项：
    - 第二项嵌套的第一个元素
    - 第二项嵌套的第二个元素

# 区块引用

```md
> 其实我不知道我为什么喜欢你，真的不知道，但是跟你在一起就会莫名的开心。如果我说我喜欢你俊美的样子，那等哪天你成了黄脸婆，我不知道要把你放在哪里。如果我说我喜欢你曼妙的身材，那等哪天你成了水桶腰，我不知道要把你放在哪里。如果我说我喜欢你温柔贤惠，那等哪天你到了更年期变得喜怒无常，我不知道要把你放在哪里。  
> 我真的不知道为什么喜欢你，也许就是因为不知道为什么，我为你做的每一件事才会那么坚定，才会那么义无反顾。如果以后有一天我找到了爱你的原因，我会告诉自己，我没有爱错你，当初的义无反顾也并非心血来潮，我会抱紧你，直到死去。
```

> 其实我不知道我为什么喜欢你，真的不知道，但是跟你在一起就会莫名的开心。如果我说我喜欢你俊美的样子，那等哪天你成了黄脸婆，我不知道要把你放在哪里。如果我说我喜欢你曼妙的身材，那等哪天你成了水桶腰，我不知道要把你放在哪里。如果我说我喜欢你温柔贤惠，那等哪天你到了更年期变得喜怒无常，我不知道要把你放在哪里。  
> 我真的不知道为什么喜欢你，也许就是因为不知道为什么，我为你做的每一件事才会那么坚定，才会那么义无反顾。如果以后有一天我找到了爱你的原因，我会告诉自己，我没有爱错你，当初的义无反顾也并非心血来潮，我会抱紧你，直到死去。

# 代码

```md
我们可以在控制台使用 `console.log()` 函数.
```

我们可以在控制台使用 `console.log()` 函数.


    ```c
    float Q_rsqrt( float number )
    {
      long i;
      float x2, y;
      const float threehalfs = 1.5F;

      x2 = number * 0.5F;
      y  = number;
      i  = * ( long * ) &y;                       // evil floating point bit level hacking
      i  = 0x5f3759df - ( i >> 1 );               // what the fuck?
      y  = * ( float * ) &i;
      y  = y * ( threehalfs - ( x2 * y * y ) );   // 1st iteration
    //      y  = y * ( threehalfs - ( x2 * y * y ) );   // 2nd iteration, this can be removed

      return y;
    }
    ```

        这也是一个代码块，此行左侧有四个不可见的空格。


```c
float Q_rsqrt( float number )
{
	long i;
	float x2, y;
	const float threehalfs = 1.5F;

	x2 = number * 0.5F;
	y  = number;
	i  = * ( long * ) &y;                       // evil floating point bit level hacking
	i  = 0x5f3759df - ( i >> 1 );               // what the fuck?
	y  = * ( float * ) &i;
	y  = y * ( threehalfs - ( x2 * y * y ) );   // 1st iteration
//      y  = y * ( threehalfs - ( x2 * y * y ) );   // 2nd iteration, this can be removed

	return y;
}
```

    这也是一个代码块，此行左侧有四个不可见的空格。

# 链接

```md
这是一个链接 [Google](https://www.google.com)

<https://www.google.com>

链接也可以用变量来代替, 文档末尾附带变量地址:  
这个链接用 google 作为网址变量 [Google][google]  
这个链接用 tiktok 作为网址变量 [Tiktok][tiktok]  
然后在文档的结尾为变量赋值 (网址)

[google]: http://www.google.com/
[tiktok]: http://www.runoob.com/
```

这是一个链接 [Google](https://www.google.com)

<https://www.google.com>

链接也可以用变量来代替, 文档末尾附带变量地址:  
这个链接用 google 作为网址变量 [Google][google]  
这个链接用 tiktok 作为网址变量 [Tiktok][tiktok]  
然后在文档的结尾为变量赋值 (网址)

[google]: http://www.google.com/
[tiktok]: http://www.runoob.com/

# 图片

```md
![Cat (Default title)](./cat.jpg)

![Cat (Default title)](./cat.jpg "Cat")
```

![Cat (Default title)](./cat.jpg)

![Cat (Default title)](./cat.jpg "Cat")

# 表格

```md
| 左对齐 | 右对齐 | 居中对齐 |
| :-----| ----: | :----: |
| 单元格 | 单元格 | 单元格 |
| 单元格 | 单元格 | 单元格 |
```
| 左对齐 | 右对齐 | 居中对齐 |
| :-----| ----: | :----: |
| 单元格 | 单元格 | 单元格 |
| 单元格 | 单元格 | 单元格 |

<table>
    <tr>
        <th rowspan="2">值班人员</th>
        <th>星期一</th>
        <th>星期二</th>
        <th>星期三</th>
    </tr>
    <tr>
        <td>李强</td>
        <td>张明</td>
        <td>王平</td>
    </tr>
</table>

# 公式

```md
我们有 $\cos(\beta) = - \cfrac{\vec{v}\cdot\vec{n}}{||\vec{v}||||\vec{n}||} = - \vec{v}\cdot\vec{n}$. 那么 $\sin^2(\gamma)=n^2\sin^2{\beta}=(1- (\vec{v}\cdot\vec{n})^2)n^2$, $\cos^2(\gamma)=1-n^2\sin^2{\gamma}=1-(1- (\vec{v}\cdot\vec{n})^2)n^2$ 满足 $1-(1- (\vec{v}\cdot\vec{n})^2)n^2 \ge 0$ 时, 才会发生折射.

对于电介质而言, 有如下方程

$$
R_s=(\cfrac{\cos\theta_i-n\cos\theta_t}{\cos\theta_i+n\cos\theta_t})^2
$$

$$
R_p=(\cfrac{\cos\theta_t-n\cos\theta_i}{\cos\theta_t+n\cos\theta_i})^2
$$

$R_s$ 和 $R_p$ 分别表示入射光的 s 偏振和 p 偏振的反射比. 一般情况下, 不考虑偏振时, 我们认为入射光的反射比:

$$
R= \cfrac{R_s + R_p}{2}
$$


这个方程可以使用菲涅耳-施里克近似法进行近似:

$$
R(\theta) \approx R(0) + (1 - R(0))(1 - \cos(\theta_i))^5
$$

$$
\mathbf{V}_1 \times \mathbf{V}_2 =  \begin{vmatrix} 
\mathbf{i} & \mathbf{j} & \mathbf{k} \\
\cfrac{\partial X}{\partial u} &  \cfrac{\partial Y}{\partial u} & 0 \\
\cfrac{\partial X}{\partial v} &  \cfrac{\partial Y}{\partial v} & 0 \\
\end{vmatrix}
$$
```

我们有 $\cos(\beta) = - \cfrac{\vec{v}\cdot\vec{n}}{||\vec{v}||||\vec{n}||} = - \vec{v}\cdot\vec{n}$. 那么 $\sin^2(\gamma)=n^2\sin^2{\beta}=(1- (\vec{v}\cdot\vec{n})^2)n^2$, $\cos^2(\gamma)=1-n^2\sin^2{\gamma}=1-(1- (\vec{v}\cdot\vec{n})^2)n^2$ 满足 $1-(1- (\vec{v}\cdot\vec{n})^2)n^2 \ge 0$ 时, 才会发生折射.

对于电介质而言, 有如下方程

$$
R_s=(\cfrac{\cos\theta_i-n\cos\theta_t}{\cos\theta_i+n\cos\theta_t})^2
$$

$$
R_p=(\cfrac{\cos\theta_t-n\cos\theta_i}{\cos\theta_t+n\cos\theta_i})^2
$$

$R_s$ 和 $R_p$ 分别表示入射光的 s 偏振和 p 偏振的反射比. 一般情况下, 不考虑偏振时, 我们认为入射光的反射比:

$$
R= \cfrac{R_s + R_p}{2}
$$


这个方程可以使用菲涅耳-施里克近似法进行近似:

$$
R(\theta) \approx R(0) + (1 - R(0))(1 - \cos(\theta_i))^5
$$

$$
\mathbf{V}_1 \times \mathbf{V}_2 =  \begin{vmatrix} 
\mathbf{i} & \mathbf{j} & \mathbf{k} \\
\cfrac{\partial X}{\partial u} &  \cfrac{\partial Y}{\partial u} & 0 \\
\cfrac{\partial X}{\partial v} &  \cfrac{\partial Y}{\partial v} & 0 \\
\end{vmatrix}
$$

# Todo 列表

```md
- [ ] **Cmd Markdown 开发**
    - [ ] 改进 Cmd 渲染算法，使用局部渲染技术提高渲染效率
    - [ ] 支持以 PDF 格式导出文稿
    - [x] 新增Todo列表功能 [语法参考](https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments)
    - [x] 改进 LaTex 功能
        - [x] 修复 LaTex 公式渲染问题
        - [x] 新增 LaTex 公式编号功能 [语法参考](http://docs.mathjax.org/en/latest/tex.html#tex-eq-numbers)
- [ ] **七月旅行准备**
    - [ ] 准备邮轮上需要携带的物品
    - [ ] 浏览日本免税店的物品
    - [x] 购买蓝宝石公主号七月一日的船票
```

- [ ] **Cmd Markdown 开发**
    - [ ] 改进 Cmd 渲染算法，使用局部渲染技术提高渲染效率
    - [ ] 支持以 PDF 格式导出文稿
    - [x] 新增Todo列表功能 [语法参考](https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments)
    - [x] 改进 LaTex 功能
        - [x] 修复 LaTex 公式渲染问题
        - [x] 新增 LaTex 公式编号功能 [语法参考](http://docs.mathjax.org/en/latest/tex.html#tex-eq-numbers)
- [ ] **七月旅行准备**
    - [ ] 准备邮轮上需要携带的物品
    - [ ] 浏览日本免税店的物品
    - [x] 购买蓝宝石公主号七月一日的船票

# 按钮

使用 <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd> 重启电脑

# Short Codes

## 网易云音乐

|参数|类型|默认值|说明|
|:-----:|:----:|:----:|:----:|
|`id`|`string`|||
|`type?`|`1 | 2 | 3`|`2`|普通歌曲为 `2`, 电台节目为 `3`|
|`autoPlay?`|`boolean`|false|自动播放|
|`showInfo?`|`boolean`|true|显示版权信息|

```tsx
<netease id="5264842" showInfo={false} />
<netease id="1914914650"/>
<netease id="2495029972" autoPlay={true} type={3} />
```

<netease id="5264842" showInfo={false} />
<netease id="1914914650" />
<netease id="2495029972" autoPlay={true} type={3} />

## YouTube

|参数|类型|默认值|说明|
|:-----:|:----:|:----:|:----:|
|`id`|`string`||eg. `"Ap0huJwyT7g"`|
|`width?`|`number`|`16`|视频宽度(比例)|
|`height?`|`number`|`9`|视频高度(比例)|
|`start?`|`number`|`0`|开始秒数|
|`showControls?`|`boolean`|`true`|显示控件|

```tsx
<youtube id="Ap0huJwyT7g" width={560} height={315} start={64} />
```

<youtube id="Ap0huJwyT7g" width={560} height={315} start={64} />

## 哔哩哔哩

|参数|类型|默认值|说明|
|:-----:|:----:|:----:|:----:|
|`aid?`|`string`||eg. `"av205014682"`|
|`bid?`|`string`||`aid` 与 `bid` 必须传其中一个|
|`page?`|`number`|`1`|视频分P|
|`width?`|`number`|`16`|视频宽度(比例)|
|`height?`|`number`|`9`|视频高度(比例)|

```tsx
<bilibili aid="205014682" />
```

<bilibili aid="205014682" />

## CodePen

```tsx
type propsType = {
  id: string;
  height?: number;
  theme: 'light' | 'dark';
  defaultTab?: string;
};

<codepen id="OJRvrzO" theme="dark" />
```

<codepen id="OJRvrzO" theme="dark" />

## PDF

```tsx
type propsType = {
  src?: string;
  href?: string;
  children?: React.ReactNode;
  width?: number;
  height?: number;
  needDownload?: boolean;
};
```

pdf 组件的使用比较复杂, 下面是一些注意事项:

  1. `src` 与 `href` 作用完全相同, 且两者是互斥关系, 同时只会有一个参数生效, `src` 优先级更高;

  2. `width` 与 `height` 和视频类似, 仍是控制纵横比, 默认值分别是 `16` 和 `9`;

  3. 一个 pdf 组件允许两种提供参数的方式, 即 `src`/`href` 参数和 `children` 参数, 如下所示的调用会渲染三份 pdf:

```tsx
<pdf href="https://example.com/1.pdf">
  <a href="https://example.com/2.pdf"></a>
  <a href="../assest/3.pdf"></a>
</pdf>
```

  4. 组件支持相对位置调用(如上面的 `../assest/3.pdf`), 但是**相对位置来源的 pdf 必须写在 `children` 的 `a` 标签中**, 否则无法转换为正确的地址.

  5. **重要**: 对于部分来源的 pdf, response header 的参数 `content-disposition` 可能为 `attachment` 而不是 `inline`(例如 onedrive 的分享链接), 此时大部分浏览器的行为为直接下载而不是进行预览, 因此如果想让此类来源正常预览的话, 需要每个来源带上 `needDownload={true}` 参数(正确预览需要保证 CORS 没有问题), 例如:

```tsx
<pdf href="https://example.com/1.pdf" needDownload={true}>
  <a href="https://example.com/2.pdf" needDownload={true}></a>
  <a href="../assest/3.pdf"></a>
</pdf>
```

下面是两个具体渲染的例子:
```tsx
<pdf src="https://od.acdzh.com/Test/Ray%20Tracing%20in%20a%20Weekend.pdf?raw" needDownload={true} />

<pdf src="https://on-demand.gputechconf.com/gtc-cn/2018/pdf/CH8804.pdf" />
```

<pdf src="https://od.acdzh.com/Test/Ray%20Tracing%20in%20a%20Weekend.pdf?raw" needDownload={true} />

<pdf src="https://on-demand.gputechconf.com/gtc-cn/2018/pdf/CH8804.pdf" />