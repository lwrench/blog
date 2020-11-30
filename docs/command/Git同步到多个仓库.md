---
title: Git同步到多个仓库
date: 2020-07-31
author: 滥觞
categories:
  - 命令指南
tags:
  - Git
---

## Git 同步到多个仓库 :rocket:

```shell
git remote add origin git@github.com:lwrench/blog.git
git remote set-url --add origin git@gitee.com:lwrench/blog.git

git push origin --all
```


[:house: 回到首页](/)