---
title: "ShortCode 测试页"
date: 2020-04-24T22:52:10+08:00
draft: false
comment: true
slug: shortcode_test
description: ""
tags: []
series: []
categories: [其他]
nolicense: true
---

>test page

## 网易云音乐

```tsx
type propsType = {
  id: string;
  type?: 1 | 2 | 3; // default: 2
  autoPlay?: boolean; // default: false
  showInfo?: boolean; // default: true
};

<netease-music id="5264842" autoPlay={false} showInfo={false} />
<netease-music id="2064167949" type={3} />
```

<netease-music id="5264842" autoPlay={false} showInfo={false} />
<netease-music id="2064167949" type={3} />

## YouTube

```tsx
type propsType = {
  id: string;
  width?: number;  // default: 16
  height?: number; // default: 9
  start?: number; // default: 0
  showControls?: boolean; // default: true
};

<youtube id="Ap0huJwyT7g" width={560} height={315} start={64} />
```

<youtube id="Ap0huJwyT7g" width={560} height={315} start={64} />

## 哔哩哔哩

```tsx
type propsType = {
  aid?: string;
  bid?: string;
  page?: number; // default: 1
  width?: number; // default: 16
  height?: number; // default: 9
};

<bilibili aid="47480567" />
<bilibili bid="BV19b411s7dY" page={2} />
```

<bilibili aid="47480567" />
<bilibili bid="BV19b411s7dY" page={2} />

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