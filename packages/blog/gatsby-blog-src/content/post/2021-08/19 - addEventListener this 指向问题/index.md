---
title: "addEventListener this 指向问题"
date: 2021-08-19T20:26:03+08:00
draft: false
comment: true
description: 
author: acdzh
from: 
url: 
slug: this_of_addEventListener
cover:
tags: [Javascript]
series: []
categories: [技术]
---

先看一段代码:

```javascript
class A {
  constructor() {
    this.msg = "I am class A";
    window.addEventListener('message', this.onmsg, false);
  }

  onmsg() {
    console.log(this.msg);
  }
}

window.msg = "This is window";
const a = new A();
window.postMessage('test');
```

输出的结果是 `This is window`. 这是因为这里 `addEventListener` 中的事件函数 `onmsg` 的 `this` 实际上 `window` 而不是 `a`. 如果想明确 `this` 的话, 需要指定 `this` 的指向.

```javascript
class A {
  constructor() {
    this.msg = "I am class A";
    window.addEventListener('message', this.onmsg.bind(this), false);
  }

  onmsg() {
    console.log(this.msg);
  }
}

window.msg = "This is window";
const a = new A();
window.postMessage('test');
```

----

|Version| Action|Time|
|:-------:|:--------:|:-----------:|
|1.0|Init|2021-08-19 20:26:03|
