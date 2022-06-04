---
title: "ShaderToy 快速入门"
date: 2022-06-04T00:26:42+08:00
last_modified: 2022-06-04T00:26:42+08:00
draft: false
comment: true
description: 
author: acdzh
from: 
url: 
slug: 0ea82250
tags: []
series: []
nolicense: true
---

# 简介与坐标系

[ShaderToy](https://www.shadertoy.com/)

文章整理自 https://www.bilibili.com/video/av209900301. 页面中有大量 webgl 元素, 建议使用桌面端浏览器打开.

## 简介

这是一个 ShaderToy 的默认程序

```glsl
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
  // Normalized pixel coordinates (from 0 to 1)
  vec2 uv = fragCoord/iResolution.xy;

  // Time varying pixel color
  vec3 col = 0.5 + 0.5 * cos(iTime + uv.xyx + vec3(0, 2, 4));

  // Output to screen
  fragColor = vec4(col,1.0);
}
```

<shadertoy width="16" height="4" src="dm9pZCBtYWluSW1hZ2UoIG91dCB2ZWM0IGZyYWdDb2xvciwgaW4gdmVjMiBmcmFnQ29vcmQgKSB7CiAgdmVjMiB1diA9IGZyYWdDb29yZC9pUmVzb2x1dGlvbi54eTsKICB2ZWMzIGNvbCA9IDAuNSArIDAuNSAqIGNvcyhpVGltZSArIHV2Lnh5eCArIHZlYzMoMCwgMiwgNCkpOwogIGZyYWdDb2xvciA9IHZlYzQoY29sLDEuMCk7Cn0=" />

## 坐标系

`mainImage` 接受两个参数: `fragColor` 和 `fragCoord`. `fragColor` 是画布的颜色, `fragCoord` 是画布上的坐标, 画布的坐标从左下角开始, 往右是 x 轴, 往上是 y 轴, 以像素为单位.

我们可以把坐标归一化: `vec2 uv = fragCoord / iResolution.xy;`, 这样的话, `uv.x` 和 `uv.y` 就都是一个坐标在 [0, 1] 之间的值.

```glsl
void mainImage (out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;
  fragColor = vec4(uv, 0, 1.);
}
```

<shadertoy paused="true" width="16" height="4" src="dm9pZCBtYWluSW1hZ2UgKG91dCB2ZWM0IGZyYWdDb2xvciwgaW4gdmVjMiBmcmFnQ29vcmQpIHsKICB2ZWMyIHV2ID0gZnJhZ0Nvb3JkIC8gaVJlc29sdXRpb24ueHk7CiAgZnJhZ0NvbG9yID0gdmVjNCh1diwgMCwgMS4pOwp9" />

一般来说, 我们需要把坐标原点移到画布的中心. 考虑到坐标的比例, 我们可以让 x 和 y 中的较小者的范围在 [-0.5, 0.5] 之间, 另一个的范围则根据比例来计算. 如下所示:

```glsl
void mainImage (out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = (fragCoord - .5 * iResolution.xy ) / min(iResolution.x, iResolution.y);
  float b = length(uv) > .45 ? 1. : 0.;
  fragColor = vec4(uv + 0.5, b, 1.);
}
```

<shadertoy paused="true" width="16" height="4" src="dm9pZCBtYWluSW1hZ2UgKG91dCB2ZWM0IGZyYWdDb2xvciwgaW4gdmVjMiBmcmFnQ29vcmQpIHsKICB2ZWMyIHV2ID0gKGZyYWdDb29yZCAtIC41ICogaVJlc29sdXRpb24ueHkgKSAvIG1pbihpUmVzb2x1dGlvbi54LCBpUmVzb2x1dGlvbi55KTsKICBmbG9hdCBiID0gbGVuZ3RoKHV2KSA+IC40NSA/IDEuIDogMC47CiAgZnJhZ0NvbG9yID0gdmVjNCh1diArIDAuNSwgYiwgMS4pOwp9" />

## 绘制坐标系

`fwidth` 函数可以获取像素的宽度.

```glsl
void mainImage (out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = (2. * fragCoord - iResolution.xy ) / min(iResolution.x, iResolution.y);
  vec3 col = vec3(0.);

  if (abs(uv.x) <= fwidth(uv.x)) col.r = 1.;
  if (abs(uv.y) <= fwidth(uv.y)) col.g = 1.;

  fragColor.rgb = col;
}
```

<shadertoy paused="true" width="16" height="4" src="dm9pZCBtYWluSW1hZ2UgKG91dCB2ZWM0IGZyYWdDb2xvciwgaW4gdmVjMiBmcmFnQ29vcmQpIHsKICB2ZWMyIHV2ID0gKDIuICogZnJhZ0Nvb3JkIC0gaVJlc29sdXRpb24ueHkgKSAvIG1pbihpUmVzb2x1dGlvbi54LCBpUmVzb2x1dGlvbi55KTsKICB2ZWMzIGNvbCA9IHZlYzMoMC4pOwoKICBpZiAoYWJzKHV2LngpIDw9IGZ3aWR0aCh1di54KSkgY29sLnIgPSAxLjsKICBpZiAoYWJzKHV2LnkpIDw9IGZ3aWR0aCh1di55KSkgY29sLmcgPSAxLjsKCiAgZnJhZ0NvbG9yLnJnYiA9IGNvbDsKfQ==" />

这里之所以不使用 `abs(uv.x) < 0.01`, 是因为 0.01 或其他的数值并不能精确的对齐到像素上, 可能会造成直线忽然变细或消失.

借助 `fract` 可以绘制出格子, 每个格子的大小是 1.

```glsl
void mainImage (out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = 2. * (2. * fragCoord - iResolution.xy ) / min(iResolution.x, iResolution.y);
  vec2 pixel = fwidth(uv);
  vec3 col = vec3(0.);
  vec2 cell = 1. - 2. * abs(fract(uv) - .5);
  
  if (abs(uv.x) <= pixel.x) col = vec3(0, 1, 0);
  else if (abs(uv.y) <= pixel.y) col = vec3(1, 0, 0);
  else if (cell.x <= 2. * pixel.x) col = vec3(1.);
  else if (cell.y <= 2. * pixel.y) col = vec3(1.);

  fragColor = vec4(col, 1.);
}
```

<shadertoy paused="true" width="16" height="8" src="dm9pZCBtYWluSW1hZ2UgKG91dCB2ZWM0IGZyYWdDb2xvciwgaW4gdmVjMiBmcmFnQ29vcmQpIHsKICB2ZWMyIHV2ID0gMi4gKiAoMi4gKiBmcmFnQ29vcmQgLSBpUmVzb2x1dGlvbi54eSApIC8gbWluKGlSZXNvbHV0aW9uLngsIGlSZXNvbHV0aW9uLnkpOwogIHZlYzIgcGl4ZWwgPSBmd2lkdGgodXYpOwogIHZlYzMgY29sID0gdmVjMygwLik7CiAgdmVjMiBjZWxsID0gMS4gLSAyLiAqIGFicyhmcmFjdCh1dikgLSAuNSk7CiAgCiAgaWYgKGFicyh1di54KSA8PSBwaXhlbC54KSBjb2wgPSB2ZWMzKDAsIDEsIDApOwogIGVsc2UgaWYgKGFicyh1di55KSA8PSBwaXhlbC55KSBjb2wgPSB2ZWMzKDEsIDAsIDApOwogIGVsc2UgaWYgKGNlbGwueCA8PSAyLiAqIHBpeGVsLngpIGNvbCA9IHZlYzMoMS4pOwogIGVsc2UgaWYgKGNlbGwueSA8PSAyLiAqIHBpeGVsLnkpIGNvbCA9IHZlYzMoMS4pOwoKICBmcmFnQ29sb3IgPSB2ZWM0KGNvbCwgMS4pOwp9" />

## 线段

我们有一个线段, 起点是 $A$, 终点是 $B$. 线段的宽度是 $width$. 对于每一个点, 假设其坐标是 $P$, 如果我们需要再该点绘制一条线段, 需要满足下面的条件:

1. $P$ 到 $\overrightarrow{AB}$ 的距离小于等于 $\cfrac{width}{2}$.
2. 保证画出来的是线段不是直线.

对于 1, 我们可以用下面的方式判断:

$$
\cfrac{|\overrightarrow{AB} \times \overrightarrow{AP}|}{|\overrightarrow{AB}|} \leq \cfrac{width}{2}
$$

对于 2, 只需要满足 $\overrightarrow{AB}\cdot\overrightarrow{AP} \leq 0$ 且 $\overrightarrow{AB}\cdot\overrightarrow{BP} \geq 0$ 即可. 因此函数如下:

```glsl
bool segment(in vec2 p, in vec2 a, in vec2 b, in float width) {
  vec3 ab = vec3(b - a, 0.);
  vec3 ap = vec3(p - a, 0.);
  vec3 bp = vec3(p - b, 0.);
  return dot(ab, ap) * dot(ab, bp) <= 0. && abs(cross(ab, ap).z) / length(ab) <= width / 2.;
}

// mainImage
col = mix(
  col,
  vec3(0., 0., 1.),
  segment(uv, vec2(-2.5, -.5), vec2(2.5, 1.5), .1)
);
```

<shadertoy paused="true" width="16" height="8" src="dmVjMiBmaXhVdihpbiB2ZWMyIGZyYWdDb29yZCkgewogIHJldHVybiAyLiAqICgyLiAqIGZyYWdDb29yZCAtIGlSZXNvbHV0aW9uLnh5ICkgLyBtaW4oaVJlc29sdXRpb24ueCwgaVJlc29sdXRpb24ueSk7Cn0KCnZlYzMgZ3JpZChpbiB2ZWMyIHV2KSB7CiAgdmVjMiBwaXhlbCA9IGZ3aWR0aCh1dik7CiAgdmVjMiBmcmFjdGlvbiA9IDEuIC0gMi4gKiBhYnMoZnJhY3QodXYpIC0gLjUpOwogIAogIGlmIChhYnModXYueCkgPD0gcGl4ZWwueCkgcmV0dXJuIHZlYzMoMCwgMSwgMCk7CiAgZWxzZSBpZiAoYWJzKHV2LnkpIDw9IHBpeGVsLnkpIHJldHVybiB2ZWMzKDEsIDAsIDApOwogIGVsc2UgaWYgKGZyYWN0aW9uLnggPD0gMi4gKiBwaXhlbC54KSByZXR1cm4gdmVjMygxLik7CiAgZWxzZSBpZiAoZnJhY3Rpb24ueSA8PSAyLiAqIHBpeGVsLnkpIHJldHVybiB2ZWMzKDEuKTsKfQoKZmxvYXQgc2VnbWVudChpbiB2ZWMyIHAsIGluIHZlYzIgYSwgaW4gdmVjMiBiLCBpbiBmbG9hdCB3aWR0aCkgewogIHZlYzMgYWIgPSB2ZWMzKGIgLSBhLCAwLik7CiAgdmVjMyBhcCA9IHZlYzMocCAtIGEsIDAuKTsKICB2ZWMzIGJwID0gdmVjMyhwIC0gYiwgMC4pOwogIHJldHVybiBkb3QoYWIsIGFwKSAqIGRvdChhYiwgYnApIDw9IDAuIAogICAgJiYgYWJzKGNyb3NzKGFiLCBhcCkueikgLyBsZW5ndGgoYWIpIDw9IHdpZHRoIC8gMi4gCiAgICAgID8gMS4gCiAgICAgIDogMC47Cn0KCnZvaWQgbWFpbkltYWdlIChvdXQgdmVjNCBmcmFnQ29sb3IsIGluIHZlYzIgZnJhZ0Nvb3JkKSB7CiAgdmVjMiB1diA9IGZpeFV2KGZyYWdDb29yZCk7CiAgdmVjMyBjb2wgPSBncmlkKHV2KTsKCiAgY29sID0gbWl4KAogICAgY29sLAogICAgdmVjMygwLiwgMC4sIDEuKSwKICAgIHNlZ21lbnQodXYsIHZlYzIoLTIuNSwgLS41KSwgdmVjMigyLjUsIDEuNSksIC4xKQogICk7CgogIGZyYWdDb2xvciA9IHZlYzQoY29sLCAxLik7Cn0=" />

## 其他函数

我们把前面的一些操作抽象一下, 整理如下:

```glsl
#define PI 3.141592654

vec2 fixUv(in vec2 fragCoord) {
  return 2. * (2. * fragCoord - iResolution.xy ) / min(iResolution.x, iResolution.y);
}

vec3 grid(in vec2 uv) {
  vec2 pixel = fwidth(uv);
  vec2 fraction = 1. - 2. * abs(fract(uv) - .5);
  
  if (abs(uv.x) <= pixel.x) return vec3(0, 1, 0);
  else if (abs(uv.y) <= pixel.y) return vec3(1, 0, 0);
  else if (fraction.x <= 2. * pixel.x) return vec3(1.);
  else if (fraction.y <= 2. * pixel.y) return vec3(1.);
}

float segment(in vec2 p, in vec2 a, in vec2 b, in float width) {
  vec3 ab = vec3(b - a, 0.);
  vec3 ap = vec3(p - a, 0.);
  vec3 bp = vec3(p - b, 0.);
  return dot(ab, ap) * dot(ab, bp) <= 0. 
    && abs(cross(ab, ap).z) / length(ab) <= width / 2. 
      ? 1. 
      : 0.;
}

void mainImage (out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fixUv(fragCoord);
  vec3 col = grid(uv);

  col = mix(
    col,
    vec3(0., 0., 1.),
    segment(uv, vec2(-2.5, -.5), vec2(2.5, 1.5), .1)
  );

  fragColor = vec4(col, 1.);
}
```

现在新增一个绘制函数:

```glsl
float func1(in float x) {
  return sin(x * PI / 2.);
}

float funcPlot(in vec2 uv) {
  float f = 0.;
  for (float x = 0.; x <= iResolution.x; x += 1.) {
    float fx = fixUv(vec2(x, 0.)).x;
    float nfx = fixUv(vec2(x + 1., 0.)).x;
    f += segment(uv, vec2(fx, func1(fx)), vec2(nfx, func1(nfx)), 2. * fwidth(uv.x));
  }
  return clamp(f, 0., 1.);
}

// mainImage
col = mix(col, vec3(0., 0., 1.), funcPlot(uv));
```

<shadertoy paused="true" width="16" height="8" src="I2RlZmluZSBQSSAzLjE0MTU5MjY1NAoKdmVjMiBmaXhVdihpbiB2ZWMyIGZyYWdDb29yZCkgewogIHJldHVybiAyLiAqICgyLiAqIGZyYWdDb29yZCAtIGlSZXNvbHV0aW9uLnh5ICkgLyBtaW4oaVJlc29sdXRpb24ueCwgaVJlc29sdXRpb24ueSk7Cn0KCnZlYzMgZ3JpZChpbiB2ZWMyIHV2KSB7CiAgdmVjMiBwaXhlbCA9IGZ3aWR0aCh1dik7CiAgdmVjMiBmcmFjdGlvbiA9IDEuIC0gMi4gKiBhYnMoZnJhY3QodXYpIC0gLjUpOwogIAogIGlmIChhYnModXYueCkgPD0gcGl4ZWwueCkgcmV0dXJuIHZlYzMoMCwgMSwgMCk7CiAgZWxzZSBpZiAoYWJzKHV2LnkpIDw9IHBpeGVsLnkpIHJldHVybiB2ZWMzKDEsIDAsIDApOwogIGVsc2UgaWYgKGZyYWN0aW9uLnggPD0gMi4gKiBwaXhlbC54KSByZXR1cm4gdmVjMygxLik7CiAgZWxzZSBpZiAoZnJhY3Rpb24ueSA8PSAyLiAqIHBpeGVsLnkpIHJldHVybiB2ZWMzKDEuKTsKfQoKZmxvYXQgc2VnbWVudChpbiB2ZWMyIHAsIGluIHZlYzIgYSwgaW4gdmVjMiBiLCBpbiBmbG9hdCB3aWR0aCkgewogIHZlYzMgYWIgPSB2ZWMzKGIgLSBhLCAwLik7CiAgdmVjMyBhcCA9IHZlYzMocCAtIGEsIDAuKTsKICB2ZWMzIGJwID0gdmVjMyhwIC0gYiwgMC4pOwogIHJldHVybiBkb3QoYWIsIGFwKSAqIGRvdChhYiwgYnApIDw9IDAuIAogICAgJiYgYWJzKGNyb3NzKGFiLCBhcCkueikgLyBsZW5ndGgoYWIpIDw9IHdpZHRoIC8gMi4gCiAgICAgID8gMS4gCiAgICAgIDogMC47Cn0KCmZsb2F0IGZ1bmMxKGluIGZsb2F0IHgpIHsKICByZXR1cm4gc2luKHggKiBQSSAvIDIuKTsKfQoKZmxvYXQgZnVuY1Bsb3QoaW4gdmVjMiB1dikgewogIGZsb2F0IGYgPSAwLjsKICBmb3IgKGZsb2F0IHggPSAwLjsgeCA8PSBpUmVzb2x1dGlvbi54OyB4ICs9IDEuKSB7CiAgICBmbG9hdCBmeCA9IGZpeFV2KHZlYzIoeCwgMC4pKS54OwogICAgZmxvYXQgbmZ4ID0gZml4VXYodmVjMih4ICsgMS4sIDAuKSkueDsKICAgIGYgKz0gc2VnbWVudCh1diwgdmVjMihmeCwgZnVuYzEoZngpKSwgdmVjMihuZngsIGZ1bmMxKG5meCkpLCAyLiAqIGZ3aWR0aCh1di54KSk7CiAgfQogIHJldHVybiBjbGFtcChmLCAwLiwgMS4pOwp9Cgp2b2lkIG1haW5JbWFnZSAob3V0IHZlYzQgZnJhZ0NvbG9yLCBpbiB2ZWMyIGZyYWdDb29yZCkgewogIHZlYzIgdXYgPSBmaXhVdihmcmFnQ29vcmQpOwogIHZlYzMgY29sID0gZ3JpZCh1dik7CgogIGNvbCA9IG1peChjb2wsIHZlYzMoMC4sIDAuLCAxLiksIGZ1bmNQbG90KHV2KSk7CgogIGZyYWdDb2xvciA9IHZlYzQoY29sLCAxLik7Cn0=" />

这里为什么要遍历每一个 x, 而不是直接用 uv.x 来判断呢? 对于每一个点来说, 都需要判断它离函数曲线的最近距离, 而不是与曲线上这一点对应取值的点的距离.

# smoothstep

修改一下上面绘制的函数:

```glsl
float func(in float x) {
  return smoothstep(0., 1., x);
}
```

<shadertoy paused="true" width="16" height="8" src="I2RlZmluZSBQSSAzLjE0MTU5MjY1NAoKdmVjMiBmaXhVdihpbiB2ZWMyIGZyYWdDb29yZCkgewogIHJldHVybiAyLiAqICgyLiAqIGZyYWdDb29yZCAtIGlSZXNvbHV0aW9uLnh5ICkgLyBtaW4oaVJlc29sdXRpb24ueCwgaVJlc29sdXRpb24ueSk7Cn0KCnZlYzMgZ3JpZChpbiB2ZWMyIHV2KSB7CiAgdmVjMiBwaXhlbCA9IGZ3aWR0aCh1dik7CiAgdmVjMiBmcmFjdGlvbiA9IDEuIC0gMi4gKiBhYnMoZnJhY3QodXYpIC0gLjUpOwogIAogIGlmIChhYnModXYueCkgPD0gcGl4ZWwueCkgcmV0dXJuIHZlYzMoMCwgMSwgMCk7CiAgZWxzZSBpZiAoYWJzKHV2LnkpIDw9IHBpeGVsLnkpIHJldHVybiB2ZWMzKDEsIDAsIDApOwogIGVsc2UgaWYgKGZyYWN0aW9uLnggPD0gMi4gKiBwaXhlbC54KSByZXR1cm4gdmVjMygxLik7CiAgZWxzZSBpZiAoZnJhY3Rpb24ueSA8PSAyLiAqIHBpeGVsLnkpIHJldHVybiB2ZWMzKDEuKTsKfQoKZmxvYXQgc2VnbWVudChpbiB2ZWMyIHAsIGluIHZlYzIgYSwgaW4gdmVjMiBiLCBpbiBmbG9hdCB3aWR0aCkgewogIHZlYzMgYWIgPSB2ZWMzKGIgLSBhLCAwLik7CiAgdmVjMyBhcCA9IHZlYzMocCAtIGEsIDAuKTsKICB2ZWMzIGJwID0gdmVjMyhwIC0gYiwgMC4pOwogIHJldHVybiBkb3QoYWIsIGFwKSAqIGRvdChhYiwgYnApIDw9IDAuIAogICAgJiYgYWJzKGNyb3NzKGFiLCBhcCkueikgLyBsZW5ndGgoYWIpIDw9IHdpZHRoIC8gMi4gCiAgICAgID8gMS4gCiAgICAgIDogMC47Cn0KCmZsb2F0IGZ1bmMoaW4gZmxvYXQgeCkgewogIHJldHVybiBzbW9vdGhzdGVwKDAuLCAxLiwgeCk7Cn0KCmZsb2F0IGZ1bmNQbG90KGluIHZlYzIgdXYpIHsKICBmbG9hdCBmID0gMC47CiAgZm9yIChmbG9hdCB4ID0gMC47IHggPD0gaVJlc29sdXRpb24ueDsgeCArPSAxLikgewogICAgZmxvYXQgZnggPSBmaXhVdih2ZWMyKHgsIDAuKSkueDsKICAgIGZsb2F0IG5meCA9IGZpeFV2KHZlYzIoeCArIDEuLCAwLikpLng7CiAgICBmICs9IHNlZ21lbnQodXYsIHZlYzIoZngsIGZ1bmMoZngpKSwgdmVjMihuZngsIGZ1bmMobmZ4KSksIDIuICogZndpZHRoKHV2LngpKTsKICB9CiAgcmV0dXJuIGNsYW1wKGYsIDAuLCAxLik7Cn0KCnZvaWQgbWFpbkltYWdlIChvdXQgdmVjNCBmcmFnQ29sb3IsIGluIHZlYzIgZnJhZ0Nvb3JkKSB7CiAgdmVjMiB1diA9IGZpeFV2KGZyYWdDb29yZCk7CiAgdmVjMyBjb2wgPSBncmlkKHV2KTsKCiAgY29sID0gbWl4KGNvbCwgdmVjMygwLiwgMC4sIDEuKSwgZnVuY1Bsb3QodXYpKTsKCiAgZnJhZ0NvbG9yID0gdmVjNChjb2wsIDEuKTsKfQ==" />

如果反一下:
```glsl
float func(in float x) {
  return smoothstep(1., 0., x);
}
```

<shadertoy paused="true" width="16" height="8" src="I2RlZmluZSBQSSAzLjE0MTU5MjY1NAoKdmVjMiBmaXhVdihpbiB2ZWMyIGZyYWdDb29yZCkgewogIHJldHVybiAyLiAqICgyLiAqIGZyYWdDb29yZCAtIGlSZXNvbHV0aW9uLnh5ICkgLyBtaW4oaVJlc29sdXRpb24ueCwgaVJlc29sdXRpb24ueSk7Cn0KCnZlYzMgZ3JpZChpbiB2ZWMyIHV2KSB7CiAgdmVjMiBwaXhlbCA9IGZ3aWR0aCh1dik7CiAgdmVjMiBmcmFjdGlvbiA9IDEuIC0gMi4gKiBhYnMoZnJhY3QodXYpIC0gLjUpOwogIAogIGlmIChhYnModXYueCkgPD0gcGl4ZWwueCkgcmV0dXJuIHZlYzMoMCwgMSwgMCk7CiAgZWxzZSBpZiAoYWJzKHV2LnkpIDw9IHBpeGVsLnkpIHJldHVybiB2ZWMzKDEsIDAsIDApOwogIGVsc2UgaWYgKGZyYWN0aW9uLnggPD0gMi4gKiBwaXhlbC54KSByZXR1cm4gdmVjMygxLik7CiAgZWxzZSBpZiAoZnJhY3Rpb24ueSA8PSAyLiAqIHBpeGVsLnkpIHJldHVybiB2ZWMzKDEuKTsKfQoKZmxvYXQgc2VnbWVudChpbiB2ZWMyIHAsIGluIHZlYzIgYSwgaW4gdmVjMiBiLCBpbiBmbG9hdCB3aWR0aCkgewogIHZlYzMgYWIgPSB2ZWMzKGIgLSBhLCAwLik7CiAgdmVjMyBhcCA9IHZlYzMocCAtIGEsIDAuKTsKICB2ZWMzIGJwID0gdmVjMyhwIC0gYiwgMC4pOwogIHJldHVybiBkb3QoYWIsIGFwKSAqIGRvdChhYiwgYnApIDw9IDAuIAogICAgJiYgYWJzKGNyb3NzKGFiLCBhcCkueikgLyBsZW5ndGgoYWIpIDw9IHdpZHRoIC8gMi4gCiAgICAgID8gMS4gCiAgICAgIDogMC47Cn0KCmZsb2F0IGZ1bmMoaW4gZmxvYXQgeCkgewogIHJldHVybiBzbW9vdGhzdGVwKDEuLCAwLiwgeCk7Cn0KCmZsb2F0IGZ1bmNQbG90KGluIHZlYzIgdXYpIHsKICBmbG9hdCBmID0gMC47CiAgZm9yIChmbG9hdCB4ID0gMC47IHggPD0gaVJlc29sdXRpb24ueDsgeCArPSAxLikgewogICAgZmxvYXQgZnggPSBmaXhVdih2ZWMyKHgsIDAuKSkueDsKICAgIGZsb2F0IG5meCA9IGZpeFV2KHZlYzIoeCArIDEuLCAwLikpLng7CiAgICBmICs9IHNlZ21lbnQodXYsIHZlYzIoZngsIGZ1bmMoZngpKSwgdmVjMihuZngsIGZ1bmMobmZ4KSksIDIuICogZndpZHRoKHV2LngpKTsKICB9CiAgcmV0dXJuIGNsYW1wKGYsIDAuLCAxLik7Cn0KCnZvaWQgbWFpbkltYWdlIChvdXQgdmVjNCBmcmFnQ29sb3IsIGluIHZlYzIgZnJhZ0Nvb3JkKSB7CiAgdmVjMiB1diA9IGZpeFV2KGZyYWdDb29yZCk7CiAgdmVjMyBjb2wgPSBncmlkKHV2KTsKCiAgY29sID0gbWl4KGNvbCwgdmVjMygwLiwgMC4sIDEuKSwgZnVuY1Bsb3QodXYpKTsKCiAgZnJhZ0NvbG9yID0gdmVjNChjb2wsIDEuKTsKfQ==" />

改造一下前面的函数:

```glsl
vec3 grid(in vec2 uv) {
  vec2 pixel = fwidth(uv);
  vec2 fraction = 1. - 2. * abs(fract(uv) - .5);
  
  vec3 color = vec3(0.);
  color = vec3(smoothstep(2. * pixel.x, 1.9 * pixel.x, fraction.x));
  color += vec3(smoothstep(2. * pixel.y, 1.9 * pixel.y, fraction.y));
  color.rb *= smoothstep(1.9 * pixel.x, 2. * pixel.x, abs(uv.x));
  color.gb *= smoothstep(1.9 * pixel.y, 2. * pixel.y, abs(uv.y));

  return color;
}

float segment(in vec2 p, in vec2 a, in vec2 b, in float width) {
  vec3 ab = vec3(b - a, 0.);
  vec3 ap = vec3(p - a, 0.);
  vec3 bp = vec3(p - b, 0.);
  if (dot(ab, ap) * dot(ab, bp) > 0.) return 0.;
  float distance = abs(cross(ab, ap).z) / length(ab);
  return smoothstep(width, .95 * width, distance * 2.);
  return dot(ab, ap) * dot(ab, bp) <= 0. 
    && abs(cross(ab, ap).z) / length(ab) <= width / 2. 
      ? 1. 
      : 0.;
}
```

<div style="width:100%;display:flex;">
  <div style="flex: 1;">
    <shadertoy paused="true" width="4" height="3" src="I2RlZmluZSBQSSAzLjE0MTU5MjY1NAoKdmVjMiBmaXhVdihpbiB2ZWMyIGZyYWdDb29yZCkgewogIHJldHVybiAyLiAqICgyLiAqIGZyYWdDb29yZCAtIGlSZXNvbHV0aW9uLnh5ICkgLyBtaW4oaVJlc29sdXRpb24ueCwgaVJlc29sdXRpb24ueSk7Cn0KCnZlYzMgZ3JpZChpbiB2ZWMyIHV2KSB7CiAgdmVjMiBwaXhlbCA9IGZ3aWR0aCh1dik7CiAgdmVjMiBmcmFjdGlvbiA9IDEuIC0gMi4gKiBhYnMoZnJhY3QodXYpIC0gLjUpOwogIAogIGlmIChhYnModXYueCkgPD0gcGl4ZWwueCkgcmV0dXJuIHZlYzMoMCwgMSwgMCk7CiAgZWxzZSBpZiAoYWJzKHV2LnkpIDw9IHBpeGVsLnkpIHJldHVybiB2ZWMzKDEsIDAsIDApOwogIGVsc2UgaWYgKGZyYWN0aW9uLnggPD0gMi4gKiBwaXhlbC54KSByZXR1cm4gdmVjMygxLik7CiAgZWxzZSBpZiAoZnJhY3Rpb24ueSA8PSAyLiAqIHBpeGVsLnkpIHJldHVybiB2ZWMzKDEuKTsKfQoKZmxvYXQgc2VnbWVudChpbiB2ZWMyIHAsIGluIHZlYzIgYSwgaW4gdmVjMiBiLCBpbiBmbG9hdCB3aWR0aCkgewogIHZlYzMgYWIgPSB2ZWMzKGIgLSBhLCAwLik7CiAgdmVjMyBhcCA9IHZlYzMocCAtIGEsIDAuKTsKICB2ZWMzIGJwID0gdmVjMyhwIC0gYiwgMC4pOwogIHJldHVybiBkb3QoYWIsIGFwKSAqIGRvdChhYiwgYnApIDw9IDAuIAogICAgJiYgYWJzKGNyb3NzKGFiLCBhcCkueikgLyBsZW5ndGgoYWIpIDw9IHdpZHRoIC8gMi4gCiAgICAgID8gMS4gCiAgICAgIDogMC47Cn0KCmZsb2F0IGZ1bmMoaW4gZmxvYXQgeCkgewogIHJldHVybiBzbW9vdGhzdGVwKDEuLCAwLiwgeCk7Cn0KCmZsb2F0IGZ1bmNQbG90KGluIHZlYzIgdXYpIHsKICBmbG9hdCBmID0gMC47CiAgZm9yIChmbG9hdCB4ID0gMC47IHggPD0gaVJlc29sdXRpb24ueDsgeCArPSAxLikgewogICAgZmxvYXQgZnggPSBmaXhVdih2ZWMyKHgsIDAuKSkueDsKICAgIGZsb2F0IG5meCA9IGZpeFV2KHZlYzIoeCArIDEuLCAwLikpLng7CiAgICBmICs9IHNlZ21lbnQodXYsIHZlYzIoZngsIGZ1bmMoZngpKSwgdmVjMihuZngsIGZ1bmMobmZ4KSksIDIuICogZndpZHRoKHV2LngpKTsKICB9CiAgcmV0dXJuIGNsYW1wKGYsIDAuLCAxLik7Cn0KCnZvaWQgbWFpbkltYWdlIChvdXQgdmVjNCBmcmFnQ29sb3IsIGluIHZlYzIgZnJhZ0Nvb3JkKSB7CiAgdmVjMiB1diA9IGZpeFV2KGZyYWdDb29yZCk7CiAgdmVjMyBjb2wgPSBncmlkKHV2KTsKCiAgY29sID0gbWl4KGNvbCwgdmVjMygwLiwgMC4sIDEuKSwgZnVuY1Bsb3QodXYpKTsKCiAgZnJhZ0NvbG9yID0gdmVjNChjb2wsIDEuKTsKfQ==" />
  </div>
  <div style="flex: 1;">
    <shadertoy paused="true" width="4" height="3" src="I2RlZmluZSBQSSAzLjE0MTU5MjY1NAoKdmVjMiBmaXhVdihpbiB2ZWMyIGZyYWdDb29yZCkgewogIHJldHVybiAyLiAqICgyLiAqIGZyYWdDb29yZCAtIGlSZXNvbHV0aW9uLnh5ICkgLyBtaW4oaVJlc29sdXRpb24ueCwgaVJlc29sdXRpb24ueSk7Cn0KCnZlYzMgZ3JpZChpbiB2ZWMyIHV2KSB7CiAgdmVjMiBwaXhlbCA9IGZ3aWR0aCh1dik7CiAgdmVjMiBmcmFjdGlvbiA9IDEuIC0gMi4gKiBhYnMoZnJhY3QodXYpIC0gLjUpOwogIAogIHZlYzMgY29sb3IgPSB2ZWMzKDAuKTsKICBjb2xvciA9IHZlYzMoc21vb3Roc3RlcCgyLiAqIHBpeGVsLngsIDEuOSAqIHBpeGVsLngsIGZyYWN0aW9uLngpKTsKICBjb2xvciArPSB2ZWMzKHNtb290aHN0ZXAoMi4gKiBwaXhlbC55LCAxLjkgKiBwaXhlbC55LCBmcmFjdGlvbi55KSk7CiAgY29sb3IucmIgKj0gc21vb3Roc3RlcCgxLjkgKiBwaXhlbC54LCAyLiAqIHBpeGVsLngsIGFicyh1di54KSk7CiAgY29sb3IuZ2IgKj0gc21vb3Roc3RlcCgxLjkgKiBwaXhlbC55LCAyLiAqIHBpeGVsLnksIGFicyh1di55KSk7CgogIHJldHVybiBjb2xvcjsKfQoKZmxvYXQgc2VnbWVudChpbiB2ZWMyIHAsIGluIHZlYzIgYSwgaW4gdmVjMiBiLCBpbiBmbG9hdCB3aWR0aCkgewogIHZlYzMgYWIgPSB2ZWMzKGIgLSBhLCAwLik7CiAgdmVjMyBhcCA9IHZlYzMocCAtIGEsIDAuKTsKICB2ZWMzIGJwID0gdmVjMyhwIC0gYiwgMC4pOwogIGlmIChkb3QoYWIsIGFwKSAqIGRvdChhYiwgYnApID4gMC4pIHJldHVybiAwLjsKICBmbG9hdCBkaXN0YW5jZSA9IGFicyhjcm9zcyhhYiwgYXApLnopIC8gbGVuZ3RoKGFiKTsKICByZXR1cm4gc21vb3Roc3RlcCh3aWR0aCwgLjk1ICogd2lkdGgsIGRpc3RhbmNlICogMi4pOwogIHJldHVybiBkb3QoYWIsIGFwKSAqIGRvdChhYiwgYnApIDw9IDAuIAogICAgJiYgYWJzKGNyb3NzKGFiLCBhcCkueikgLyBsZW5ndGgoYWIpIDw9IHdpZHRoIC8gMi4gCiAgICAgID8gMS4gCiAgICAgIDogMC47Cn0KCmZsb2F0IGZ1bmMoaW4gZmxvYXQgeCkgewogIHJldHVybiBzbW9vdGhzdGVwKDEuLCAwLiwgeCk7Cn0KCmZsb2F0IGZ1bmNQbG90KGluIHZlYzIgdXYpIHsKICBmbG9hdCBmID0gMC47CiAgZm9yIChmbG9hdCB4ID0gMC47IHggPD0gaVJlc29sdXRpb24ueDsgeCArPSAxLikgewogICAgZmxvYXQgZnggPSBmaXhVdih2ZWMyKHgsIDAuKSkueDsKICAgIGZsb2F0IG5meCA9IGZpeFV2KHZlYzIoeCArIDEuLCAwLikpLng7CiAgICBmICs9IHNlZ21lbnQodXYsIHZlYzIoZngsIGZ1bmMoZngpKSwgdmVjMihuZngsIGZ1bmMobmZ4KSksIDIuICogZndpZHRoKHV2LngpKTsKICB9CiAgcmV0dXJuIGNsYW1wKGYsIDAuLCAxLik7Cn0KCnZvaWQgbWFpbkltYWdlIChvdXQgdmVjNCBmcmFnQ29sb3IsIGluIHZlYzIgZnJhZ0Nvb3JkKSB7CiAgdmVjMiB1diA9IGZpeFV2KGZyYWdDb29yZCk7CiAgdmVjMyBjb2wgPSBncmlkKHV2KTsKCiAgY29sID0gbWl4KGNvbCwgdmVjMygwLiwgMC4sIDEuKSwgZnVuY1Bsb3QodXYpKTsKCiAgZnJhZ0NvbG9yID0gdmVjNChjb2wsIDEuKTsKfQ==" />
  </div>
</div>

显然右侧锯齿会更少一些.

```glsl
col = mix(
  col, vec3(0., .5, .5),
  smoothstep(1.01, .99, length(uv + .4))
);
col = mix(
  col, vec3(.5, .5, .0),
  length(uv - .4) <= 1. ? 1. : 0.
);
```

<shadertoy paused="true" width="16" height="8" src="dmVjMiBmaXhVdihpbiB2ZWMyIGZyYWdDb29yZCkgewogIHJldHVybiAyLiAqICgyLiAqIGZyYWdDb29yZCAtIGlSZXNvbHV0aW9uLnh5ICkgLyBtaW4oaVJlc29sdXRpb24ueCwgaVJlc29sdXRpb24ueSk7Cn0KCnZlYzMgZ3JpZChpbiB2ZWMyIHV2KSB7CiAgdmVjMiBwaXhlbCA9IGZ3aWR0aCh1dik7CiAgdmVjMiBmcmFjdGlvbiA9IDEuIC0gMi4gKiBhYnMoZnJhY3QodXYpIC0gLjUpOwogIAogIHZlYzMgY29sb3IgPSB2ZWMzKDAuKTsKICBjb2xvciA9IHZlYzMoc21vb3Roc3RlcCgyLiAqIHBpeGVsLngsIDEuOSAqIHBpeGVsLngsIGZyYWN0aW9uLngpKTsKICBjb2xvciArPSB2ZWMzKHNtb290aHN0ZXAoMi4gKiBwaXhlbC55LCAxLjkgKiBwaXhlbC55LCBmcmFjdGlvbi55KSk7CiAgY29sb3IucmIgKj0gc21vb3Roc3RlcCgxLjkgKiBwaXhlbC54LCAyLiAqIHBpeGVsLngsIGFicyh1di54KSk7CiAgY29sb3IuZ2IgKj0gc21vb3Roc3RlcCgxLjkgKiBwaXhlbC55LCAyLiAqIHBpeGVsLnksIGFicyh1di55KSk7CgogIHJldHVybiBjb2xvcjsKfQoKCnZvaWQgbWFpbkltYWdlIChvdXQgdmVjNCBmcmFnQ29sb3IsIGluIHZlYzIgZnJhZ0Nvb3JkKSB7CiAgdmVjMiB1diA9IGZpeFV2KGZyYWdDb29yZCk7CiAgdmVjMyBjb2wgPSBncmlkKHV2KTsKCiAgY29sID0gbWl4KAogICAgY29sLCB2ZWMzKDAuLCAuNSwgLjUpLAogICAgc21vb3Roc3RlcCgxLjAxLCAuOTksIGxlbmd0aCh1diArIC40KSkKICApOwogIGNvbCA9IG1peCgKICAgIGNvbCwgdmVjMyguNSwgLjUsIC4wKSwKICAgIGxlbmd0aCh1diAtIC40KSA8PSAxLiA/IDEuIDogMC4KICApOwoKICBmcmFnQ29sb3IgPSB2ZWM0KGNvbCwgMS4pOwp9" />


# 新的网格与函数绘制

## 网格

```glsl
vec3 grid(in vec2 uv) {
  vec2 pixel = fwidth(uv);
  vec2 grid = floor(mod(uv, 2.));
  vec3 color = grid.x == grid.y ? vec3(.4) : vec3(.6);

  color = mix(
    color,
    vec3(0.),
    smoothstep(2. * pixel.x, pixel.x, abs(uv.x))
      + smoothstep(2. * pixel.y, pixel.y, abs(uv.y))
  );

  return color;
}

float func(in float x) {
  return smoothstep(0., 1., x) + smoothstep(2., 1., x) - 1.;
}

float funcPlot(in vec2 uv) {
  float y = func(uv.x);
  vec2 pixel = fwidth(uv);
  return smoothstep(y - 2. * pixel.y, y, uv.y)
    + smoothstep(y + 2. * pixel.x, y, uv.y)
    - 1.;
}
```

<shadertoy paused="true" width="16" height="8" src="dmVjMiBmaXhVdihpbiB2ZWMyIGZyYWdDb29yZCkgewogIHJldHVybiAyLiAqICgyLiAqIGZyYWdDb29yZCAtIGlSZXNvbHV0aW9uLnh5ICkgLyBtaW4oaVJlc29sdXRpb24ueCwgaVJlc29sdXRpb24ueSk7Cn0KCnZlYzMgZ3JpZChpbiB2ZWMyIHV2KSB7CiAgdmVjMiBwaXhlbCA9IGZ3aWR0aCh1dik7CiAgdmVjMiBncmlkID0gZmxvb3IobW9kKHV2LCAyLikpOwogIHZlYzMgY29sb3IgPSBncmlkLnggPT0gZ3JpZC55ID8gdmVjMyguNCkgOiB2ZWMzKC42KTsKCiAgY29sb3IgPSBtaXgoCiAgICBjb2xvciwKICAgIHZlYzMoMC4pLAogICAgc21vb3Roc3RlcCgyLiAqIHBpeGVsLngsIHBpeGVsLngsIGFicyh1di54KSkKICAgICAgKyBzbW9vdGhzdGVwKDIuICogcGl4ZWwueSwgcGl4ZWwueSwgYWJzKHV2LnkpKQogICk7CgogIHJldHVybiBjb2xvcjsKfQoKZmxvYXQgZnVuYyhpbiBmbG9hdCB4KSB7CiAgcmV0dXJuIHNtb290aHN0ZXAoMC4sIDEuLCB4KSArIHNtb290aHN0ZXAoMi4sIDEuLCB4KSAtIDEuOwp9CgpmbG9hdCBmdW5jUGxvdChpbiB2ZWMyIHV2KSB7CiAgZmxvYXQgeSA9IGZ1bmModXYueCk7CiAgdmVjMiBwaXhlbCA9IGZ3aWR0aCh1dik7CiAgcmV0dXJuIHNtb290aHN0ZXAoeSAtIDIuICogcGl4ZWwueSwgeSwgdXYueSkKICAgICsgc21vb3Roc3RlcCh5ICsgMi4gKiBwaXhlbC54LCB5LCB1di55KQogICAgLSAxLjsKfQoKdm9pZCBtYWluSW1hZ2UgKG91dCB2ZWM0IGZyYWdDb2xvciwgaW4gdmVjMiBmcmFnQ29vcmQpIHsKICB2ZWMyIHV2ID0gZml4VXYoZnJhZ0Nvb3JkKTsKICB2ZWMzIGNvbCA9IGdyaWQodXYpOwoKICBjb2wgPSBtaXgoCiAgICBjb2wsCiAgICB2ZWMzKDAuLCAwLiwgMS4pLAogICAgZnVuY1Bsb3QodXYpCiAgKTsKCiAgZnJhZ0NvbG9yID0gdmVjNChjb2wsIDEuKTsKfQ==" />

上面的用线段来画函数有些扯淡, 所以这里改回了正常一些的画法.

## 二次抽样

```glsl
#define AA 4
float funcPlot(in vec2 uv) {
  vec2 pixel = fwidth(uv);

  float count = 0.;
  for (int m = 0; m < AA; m++) {
    for (int n = 0; n < AA; n++) {
      vec2 offset = 2. * vec2(m, n) / float(AA) - 1.;
      vec2 _uv = uv + offset * pixel;
      float y = func(_uv.x);
      count += smoothstep(
        y - 2. * pixel.y,
        y + 2. * pixel.y,
        _uv.y 
      );
    }
  }
  if (count > float(AA * AA) / 2.) count = float(AA * AA) - count;
  count = count * 2. / float(AA * AA);
  return count;
}
```

<shadertoy paused="true" width="16" height="8" src="dmVjMiBmaXhVdihpbiB2ZWMyIGZyYWdDb29yZCkgewogIHJldHVybiAyLiAqICgyLiAqIGZyYWdDb29yZCAtIGlSZXNvbHV0aW9uLnh5ICkgLyBtaW4oaVJlc29sdXRpb24ueCwgaVJlc29sdXRpb24ueSk7Cn0KCnZlYzMgZ3JpZChpbiB2ZWMyIHV2KSB7CiAgdmVjMiBwaXhlbCA9IGZ3aWR0aCh1dik7CiAgdmVjMiBncmlkID0gZmxvb3IobW9kKHV2LCAyLikpOwogIHZlYzMgY29sb3IgPSBncmlkLnggPT0gZ3JpZC55ID8gdmVjMyguNCkgOiB2ZWMzKC42KTsKCiAgY29sb3IgPSBtaXgoCiAgICBjb2xvciwKICAgIHZlYzMoMC4pLAogICAgc21vb3Roc3RlcCgyLiAqIHBpeGVsLngsIHBpeGVsLngsIGFicyh1di54KSkKICAgICAgKyBzbW9vdGhzdGVwKDIuICogcGl4ZWwueSwgcGl4ZWwueSwgYWJzKHV2LnkpKQogICk7CgogIHJldHVybiBjb2xvcjsKfQoKZmxvYXQgZnVuYyhpbiBmbG9hdCB4KSB7CiAgcmV0dXJuIHNtb290aHN0ZXAoMC4sIDEuLCB4KSArIHNtb290aHN0ZXAoMi4sIDEuLCB4KSAtIDEuOwp9CgojZGVmaW5lIEFBIDQKZmxvYXQgZnVuY1Bsb3QoaW4gdmVjMiB1dikgewogIHZlYzIgcGl4ZWwgPSBmd2lkdGgodXYpOwoKICBmbG9hdCBjb3VudCA9IDAuOwogIGZvciAoaW50IG0gPSAwOyBtIDwgQUE7IG0rKykgewogICAgZm9yIChpbnQgbiA9IDA7IG4gPCBBQTsgbisrKSB7CiAgICAgIHZlYzIgb2Zmc2V0ID0gMi4gKiB2ZWMyKG0sIG4pIC8gZmxvYXQoQUEpIC0gMS47CiAgICAgIHZlYzIgX3V2ID0gdXYgKyBvZmZzZXQgKiBwaXhlbDsKICAgICAgZmxvYXQgeSA9IGZ1bmMoX3V2LngpOwogICAgICBjb3VudCArPSBzbW9vdGhzdGVwKAogICAgICAgIHkgLSAyLiAqIHBpeGVsLnksCiAgICAgICAgeSArIDIuICogcGl4ZWwueSwKICAgICAgICBfdXYueSAKICAgICAgKTsKICAgIH0KICB9CiAgaWYgKGNvdW50ID4gZmxvYXQoQUEgKiBBQSkgLyAyLikgY291bnQgPSBmbG9hdChBQSAqIEFBKSAtIGNvdW50OwogIGNvdW50ID0gY291bnQgKiAyLiAvIGZsb2F0KEFBICogQUEpOwogIHJldHVybiBjb3VudDsKfQoKdm9pZCBtYWluSW1hZ2UgKG91dCB2ZWM0IGZyYWdDb2xvciwgaW4gdmVjMiBmcmFnQ29vcmQpIHsKICB2ZWMyIHV2ID0gZml4VXYoZnJhZ0Nvb3JkKTsKICB2ZWMzIGNvbCA9IGdyaWQodXYpOwoKICBjb2wgPSBtaXgoCiAgICBjb2wsCiAgICB2ZWMzKDAuLCAwLiwgMS4pLAogICAgZnVuY1Bsb3QodXYpCiAgKTsKCiAgZnJhZ0NvbG9yID0gdmVjNChjb2wsIDEuKTsKfQ==" />

# 2D SDF

```glsl
vec2 fixUv(in vec2 c) {
  return 1. * (2. * c - iResolution.xy ) / min(iResolution.x, iResolution.y);
}

float sdfCircle(in vec2 p) {
  return length(p) - (.5 + .2 * sin(iTime));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fixUv(fragCoord);
  float d = sdfCircle(uv);
  vec3 color = 1. - sign(d) * vec3(.4, .5, .6);
  color *= 1. - exp(-3. * abs(d));
  color *= .8 + .2 * sin(150. * abs(d)); // contour line
  color = mix(color, vec3(1.), smoothstep(.005, .004, abs(d)));

  if (iMouse.z > 0.1) {
    vec2 m = fixUv(iMouse.xy);
    float currentDistance = abs(sdfCircle(m));
    color = mix(color, vec3(1., 1., 0.),smoothstep(.01, 0., abs(length(uv - m) - currentDistance)));
    color = mix(color, vec3(0., 0., 1.),smoothstep(.02, .01, length(uv - m)));
  }

  fragColor = vec4(color, 1);
}
```

<shadertoy width="16" height="8" src="dmVjMiBmaXhVdihpbiB2ZWMyIGMpIHsKICByZXR1cm4gMS4gKiAoMi4gKiBjIC0gaVJlc29sdXRpb24ueHkgKSAvIG1pbihpUmVzb2x1dGlvbi54LCBpUmVzb2x1dGlvbi55KTsKfQoKZmxvYXQgc2RmQ2lyY2xlKGluIHZlYzIgcCkgewogIHJldHVybiBsZW5ndGgocCkgLSAoLjUgKyAuMiAqIHNpbihpVGltZSkpOwp9Cgp2b2lkIG1haW5JbWFnZShvdXQgdmVjNCBmcmFnQ29sb3IsIGluIHZlYzIgZnJhZ0Nvb3JkKSB7CiAgdmVjMiB1diA9IGZpeFV2KGZyYWdDb29yZCk7CiAgZmxvYXQgZCA9IHNkZkNpcmNsZSh1dik7CiAgdmVjMyBjb2xvciA9IDEuIC0gc2lnbihkKSAqIHZlYzMoLjQsIC41LCAuNik7CiAgY29sb3IgKj0gMS4gLSBleHAoLTMuICogYWJzKGQpKTsKICBjb2xvciAqPSAuOCArIC4yICogc2luKDE1MC4gKiBhYnMoZCkpOyAvLyBjb250b3VyIGxpbmUKICBjb2xvciA9IG1peChjb2xvciwgdmVjMygxLiksIHNtb290aHN0ZXAoLjAwNSwgLjAwNCwgYWJzKGQpKSk7CgogIGlmIChpTW91c2UueiA+IDAuMSkgewogICAgdmVjMiBtID0gZml4VXYoaU1vdXNlLnh5KTsKICAgIGZsb2F0IGN1cnJlbnREaXN0YW5jZSA9IGFicyhzZGZDaXJjbGUobSkpOwogICAgY29sb3IgPSBtaXgoY29sb3IsIHZlYzMoMS4sIDEuLCAwLiksc21vb3Roc3RlcCguMDEsIDAuLCBhYnMobGVuZ3RoKHV2IC0gbSkgLSBjdXJyZW50RGlzdGFuY2UpKSk7CiAgICBjb2xvciA9IG1peChjb2xvciwgdmVjMygwLiwgMC4sIDEuKSxzbW9vdGhzdGVwKC4wMiwgLjAxLCBsZW5ndGgodXYgLSBtKSkpOwogIH0KCiAgZnJhZ0NvbG9yID0gdmVjNChjb2xvciwgMSk7Cn0=" />

# 3D SDF 与 Ray Marching

定义一个球的 sdf 函数.

```glsl
float sdfSphere(in vec3 p) {
  vec3 o = vec3(0., 0., 2.);
  return length(p - o) - 1.5;
}
```

以及球上一点的法线函数.

```glsl
vec3 normalSphere(in vec3 p) {
  return normalize(p - vec3(0., 0., 2.));
}
```

这里是一个特例, 对于更普通的图形, 法线函数如下 (https://iquilezles.org/articles/normalsSDF/):

```glsl
vec3 normalSphere(in vec3 p) {
  const float h = .0001;
  const vec2 k = vec2(1., -1.);
  return normalize(
    k.xyy * sdfSphere( p + k.xyy * h) +
    k.yyx * sdfSphere( p + k.yyx *h) +
    k.yxy * sdfSphere( p + k.yxy * h) +
    k.xxx * sdfSphere( p + k.xxx * h)
  );
}
```

之后是 rayMatch 函数:

```glsl
#define TMIN .1
#define TMAX 20.
#define MAX_STEPS 100000
#define PRECISION .001

float rayMarch(in vec3 ro, in vec3 rd) {
  float t = TMIN;
  for (int i = 0; i < MAX_STEPS && t <= TMAX; i++) {
    vec3 p = ro + t * rd;
    float d = sdfSphere(p);
    if (d < PRECISION) {
      break;
    }
    t += d;
  }
  return t;
}
```

渲染函数:

```glsl
vec3 render(vec2 uv) {
  vec3 color = vec3(0.);
  vec3 ro = vec3(0., 0., -2.);
  vec3 rd = normalize(vec3(uv, 0.) - ro);
  float t = rayMarch(ro, rd);

  vec3 light = vec3(2. * cos(2. * iTime), 1., 2. * sin(2. * iTime) + 2.);
  float amp = .5;

  if (t < TMAX) {
    vec3 p = ro + t * rd;
    vec3 n = normalSphere(p);
    float dif = clamp(dot(normalize(light - p), n), 0., 1.);

    color = sqrt(amp * vec3(0.23) + dif * vec3(1.));
  } else {
    color = vec3(.21 * dot(normalize(light - ro), rd));
  }
  return color;
}
```

以及重采样:

```glsl
#define AA 16
vec3 renderSub(vec2 uv) {
  vec2 pixel = fwidth(uv);

  vec3 color = vec3(0.);
  for (int m = 0; m < AA; m++) {
    for (int n = 0; n < AA; n++) {
      vec2 offset = 2. * vec2(m, n) / float(AA) - 1.;
      vec2 _uv = uv + offset * pixel;
      color += render(_uv);
    }
  }
  return color / float(AA * AA);
}
```

输出:

```glsl
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fixUv(fragCoord);
  vec3 color = vec3(0.);

  color = render(uv);
  color = renderSub(uv);

  fragColor = vec4(color, 1);
}
```


<shadertoy width="16" height="8" t="2.5" src="I2RlZmluZSBQSSAzLjE0MTU5MjY1NAojZGVmaW5lIFRNSU4gLjEKI2RlZmluZSBUTUFYIDIwLgojZGVmaW5lIE1BWF9TVEVQUyAxMDAwMDAKI2RlZmluZSBQUkVDSVNJT04gLjAwMQp2ZWMyIGZpeFV2KGluIHZlYzIgYykgewogIHJldHVybiAxLiAqICgyLiAqIGMgLSBpUmVzb2x1dGlvbi54eSApIC8gbWluKGlSZXNvbHV0aW9uLngsIGlSZXNvbHV0aW9uLnkpOwp9CmZsb2F0IHNkZlNwaGVyZShpbiB2ZWMzIHApIHsKICB2ZWMzIG8gPSB2ZWMzKDAuLCAwLiwgMi4pOwogIHJldHVybiBsZW5ndGgocCAtIG8pIC0gMS41Owp9CnZlYzMgbm9ybWFsU3BoZXJlKGluIHZlYzMgcCkgewogIGNvbnN0IGZsb2F0IGggPSAuMDAwMTsKICBjb25zdCB2ZWMyIGsgPSB2ZWMyKDEuLCAtMS4pOwogIHJldHVybiBub3JtYWxpemUocCAtIHZlYzMoMC4sIDAuLCAyLikpOwogIHJldHVybiBub3JtYWxpemUoCiAgICBrLnh5eSAqIHNkZlNwaGVyZSggcCArIGsueHl5ICogaCkgKwogICAgay55eXggKiBzZGZTcGhlcmUoIHAgKyBrLnl5eCAqaCkgKwogICAgay55eHkgKiBzZGZTcGhlcmUoIHAgKyBrLnl4eSAqIGgpICsKICAgIGsueHh4ICogc2RmU3BoZXJlKCBwICsgay54eHggKiBoKQogICk7Cn0KZmxvYXQgcmF5TWFyY2goaW4gdmVjMyBybywgaW4gdmVjMyByZCkgewogIGZsb2F0IHQgPSBUTUlOOwogIGZvciAoaW50IGkgPSAwOyBpIDwgTUFYX1NURVBTICYmIHQgPD0gVE1BWDsgaSsrKSB7CiAgICB2ZWMzIHAgPSBybyArIHQgKiByZDsKICAgIGZsb2F0IGQgPSBzZGZTcGhlcmUocCk7CiAgICBpZiAoZCA8IFBSRUNJU0lPTikgewogICAgICBicmVhazsKICAgIH0KICAgIHQgKz0gZDsKICB9CiAgcmV0dXJuIHQ7Cn0KdmVjMyByZW5kZXIodmVjMiB1dikgewogIHZlYzMgY29sb3IgPSB2ZWMzKDAuKTsKICB2ZWMzIHJvID0gdmVjMygwLiwgMC4sIC0yLik7CiAgdmVjMyByZCA9IG5vcm1hbGl6ZSh2ZWMzKHV2LCAwLikgLSBybyk7CiAgZmxvYXQgdCA9IHJheU1hcmNoKHJvLCByZCk7CiAgdmVjMyBsaWdodCA9IHZlYzMoMi4gKiBjb3MoMi4gKiBpVGltZSksIDEuLCAyLiAqIHNpbigyLiAqIGlUaW1lKSArIDIuKTsKICBmbG9hdCBhbXAgPSAuNTsKICBpZiAodCA8IFRNQVgpIHsKICAgIHZlYzMgcCA9IHJvICsgdCAqIHJkOwogICAgdmVjMyBuID0gbm9ybWFsU3BoZXJlKHApOwogICAgZmxvYXQgZGlmID0gY2xhbXAoZG90KG5vcm1hbGl6ZShsaWdodCAtIHApLCBuKSwgMC4sIDEuKTsKICAgIGNvbG9yID0gc3FydChhbXAgKiB2ZWMzKDAuMjMpICsgZGlmICogdmVjMygxLikpOwogIH0gZWxzZSB7CiAgICBjb2xvciA9IHZlYzMoLjIxICogZG90KG5vcm1hbGl6ZShsaWdodCAtIHJvKSwgcmQpKTsKICB9CiAgcmV0dXJuIGNvbG9yOwp9CiNkZWZpbmUgQUEgMTYKdmVjMyByZW5kZXJTdWIodmVjMiB1dikgewogIHZlYzIgcGl4ZWwgPSBmd2lkdGgodXYpOwogIHZlYzMgY29sb3IgPSB2ZWMzKDAuKTsKICBmb3IgKGludCBtID0gMDsgbSA8IEFBOyBtKyspIHsKICAgIGZvciAoaW50IG4gPSAwOyBuIDwgQUE7IG4rKykgewogICAgICB2ZWMyIG9mZnNldCA9IDIuICogdmVjMihtLCBuKSAvIGZsb2F0KEFBKSAtIDEuOwogICAgICB2ZWMyIF91diA9IHV2ICsgb2Zmc2V0ICogcGl4ZWw7CiAgICAgIGNvbG9yICs9IHJlbmRlcihfdXYpOwogICAgfQogIH0KICByZXR1cm4gY29sb3IgLyBmbG9hdChBQSAqIEFBKTsKfQp2b2lkIG1haW5JbWFnZShvdXQgdmVjNCBmcmFnQ29sb3IsIGluIHZlYzIgZnJhZ0Nvb3JkKSB7CiAgdmVjMiB1diA9IGZpeFV2KGZyYWdDb29yZCk7CiAgdmVjMyBjb2xvciA9IHZlYzMoMC4pOwogIGNvbG9yID0gcmVuZGVyKHV2KTsKICBjb2xvciA9IHJlbmRlclN1Yih1dik7CiAgZnJhZ0NvbG9yID0gdmVjNChjb2xvciwgMSk7Cn0=" />



----

# History

|Version| Action|Time|
|:-------:|:--------:|:-----------:|
|1.0|init|2022-06-04 00:26:42|
