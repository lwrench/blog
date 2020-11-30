---
title: brew update 卡死解决办法
date: 2020-07-25
author: 滥觞
categories:
  - 命令指南
tags:
  - brew
---

## `brew update` 卡死解决办法 :beer:

### 问题场景

- `brew install` 安装软件包的时候，卡在 Updating Homebrew...
- 输入`brew update`更新`brew`，没有反应
  原因
- 对于场景一，我们可以直接`Control-C`中止掉 update 进程，然后 brew 就会接着执行 install
- 要想根本解决这个问题，就得替换官方更新源

### 替换更新源

1.替换`Homebrew`源

```shell
$ cd "$(brew --repo)"
$ git remote set-url origin https://mirrors.ustc.edu.cn/brew.git
```

[官方文档](http://mirrors.ustc.edu.cn/help/brew.git.html)

2.替换`Homebrew-core`源

```shell
$ cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
$ git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
```

[官方文档](http://mirrors.ustc.edu.cn/help/homebrew-core.git.html)

3.替换`Homebrew-cask`源

```shell
$ cd "$(brew --repo)"/Library/Taps/homebrew/homebrew-cask
$ git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git
```

[官方文档](http://mirrors.ustc.edu.cn/help/homebrew-cask.git.html)

[:house: 回到首页](/)
