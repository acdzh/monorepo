const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const date = new Date();
const year = date.getFullYear();
const month =
  date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
const minute =
  date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
const second =
  date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

const title = process.argv[2] || 'Title';
const dirPath = path.join(
  __dirname,
  '../content/post',
  `${year}-${month}/${day} - ${title}`
);

const filePath = path.join(dirPath, 'index.md');

const md5 = crypto.createHash('md5');
const slug = md5
  .update(`${year}${month}${day}${hour}${minute}${second}${title}`)
  .digest('hex')
  .slice(0, 8);

const md = `---
title: "${title}"
date: ${year}-${month}-${day}T${hour}:${minute}:${second}+08:00
last_modified: ${year}-${month}-${day}T${hour}:${minute}:${second}+08:00
draft: false
comment: true
description: 
author: acdzh
from: 
url: 
slug: ${slug}
tags: []
series: []
nolicense: true
---

----

# History

|Version| Action|Time|
|:-------:|:--------:|:-----------:|
|1.0|init|${year}-${month}-${day} ${hour}:${minute}:${second}|
`;
console.log(md);
fs.mkdirSync(dirPath, { recursive: true });
fs.writeFileSync(filePath, md);
