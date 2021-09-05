---
title: "UEFI 原理与编程 2 - 修改启动图标 / 设置启动时间"
date: 2019-10-10T02:38:00+08:00
draft: false
comment: true
description: ""
slug: uefi_tutorial_2-edit_bootimg_boottime
tags: [EDK2, UEFI]
series: [UEFI 原理与编程]
categories: [技术, 嵌入式开发]
---

## 修改启动图标

找到路径 `<HOME>\MdeModulePkg\Logo` 下的 logo.bmp 文件, 替换.

重新编译运行.

![](./uefi2_1.png)


## 修改启动时间

搜索 "Wait", 找到 `<HOME>\MdeModulePkg\Universal\BdsDxe\BdsEntry.c`, `Line 316`, `BdsWait` 函数. 


![](./uefi2_2.png)


可以发现, 倒计时由 `TimeoutRemain` 进行控制, 于是添加一句 `TimeoutRemain = 15;`, 即可将倒计时时间修改为15s;

重新编译运行.

![](./uefi2_3.png)

![](./uefi2_4.png)

## 历史记录

|Version| Action|Time|
|:-------:|:--------:|:-----------:|
|1.0|Init|2019-10-10 02:38|
|1.0|迁移至 blog |2020-04-26 22:51|