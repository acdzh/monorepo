---
title: "在 Jupyter Notebook 中使用 Javascript"
date: 2020-10-19T15:20:54+08:00
draft: false
comment: true
description: 
author: 
from: 
url:
slug: jupyter_notebook_node
cover:
tags: ['Jupyter Notebook', 'Node', 'Javascript']
series: []
categories: [技术]
---

## 安装 Jupyter Notebook

```bash
pip3 install jupyter
```

## 添加 Node 支持

```bash
brew install zeromq
pip3 install --upgrade pyzmq
yarn global add ijavascript
ijsinstall
```

## 设置主题

```bash
pip3 install jupyterthemes
jt -t onedork
```

## 启动

```bash
ijsnotebook --port=8889
```

效果如下:

![](./19154216.png)

## 历史记录

|Version| Action|Time|
|:-------:|:--------:|:-----------:|
|1.0|Init|2020-10-19 15:20|