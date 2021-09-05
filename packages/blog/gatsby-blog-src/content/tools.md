---
title: "Tools"
date: 2019-01-01T00:00:00+08:00
draft: false
comment: false
description: ""
slug: tools
tags: []
series: []
categories: [其他]
nolicense: true
toc: true
---

## aria2

<section onLoad={() => {
  window.aria2ButtonsOnclick = function(type) {
    let val = document.getElementById('secret').value;
    const oldAria2Key = localStorage.getItem('aria2key');
    if (val === '') { val = oldAria2Key; }
    else { localStorage.setItem('aria2key', val); }
    if (type === 'panel') {
      open(val === '' 
        ? '/tools/aria2ng/' 
        : '/tools/aria2ng/#!/settings/rpc/set/wss/acdzharia2.herokuapp.com/443/jsonrpc/'+btoa(val));
    } else if (type === 'downloads') { 
      open('https://acdzharia2.herokuapp.com/downloads/'+btoa(val)+'/');
    } else if (type === 'onedrive') {
      open('https://od.acdzh.com/Private/aria2');
    }
  };
}}>
    <label for="secret">Password:</label>
    &nbsp;&nbsp;
    <Input id="secret" type="password" />
    &nbsp;&nbsp;
    <div style={{ display: 'inline-block', marginTop: "10px" }}>
      <Button onClick={() => { aria2ButtonsOnclick('panel'); }} style={{ marginTop: "10px" }}>⚙️ 前往Aria2面板</Button>
      &nbsp;&nbsp;
      <Button onClick={() => { aria2ButtonsOnclick('downloads'); }} style={{ marginTop: "10px" }}>📁 查看下载文件</Button>
      &nbsp;&nbsp;
      <Button onClick={() => { aria2ButtonsOnclick('onedrive'); }} style={{ marginTop: "10px" }}>☁️ 查看 OneDrive</Button>
    </div>
</section>