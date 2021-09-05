/* eslint-disable @typescript-eslint/no-var-requires */
const moment = require('moment');
const process = require('process');
const path = require('path');
const fs = require('fs');

const args = process.argv;
if (args.length < 3) {
  throw new Error('please input title');
}

let filename = path.join('./content/blog', args[2]);

const now = moment();
const template = `---
title: "${path.basename(filename)}"
date: ${now.format()}
draft: true
comment: true
description: 
author: 
from: 
url: 
slug:
cover:
tags: []
series: []
categories: [技术]
---

Input your content here.

## 历史记录

|Version| Action|Time|
|:-------:|:--------:|:-----------:|
|1.0|Init|${now.format('yyyy-MM-DD HH:mm:ss')}|
`;

if (
  filename[filename.length - 1] === '/' ||
  filename[filename.length - 1] === '\\'
) {
  filename = path.join(filename, 'index.md');
}

console.log(path.dirname(filename));
fs.mkdirSync(path.dirname(filename), {
  recursive: true,
});

fs.writeFileSync(filename, template, {
  encoding: 'utf8',
});
