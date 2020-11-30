---
title: 使用brew安装nodejs
date: 2020-07-25
author: 滥觞
categories:
  - 命令指南
tags:
  - brew
  - Node.js
---
:::warning
这种方法安装node并不推荐
:::
## 使用 brew 安装 nodejs :mushroom:

### 直接运行

```shell
brew install node
```

### 查看是否安装成功

```shell
node -v
npm -v
```

### 修改淘宝源

```shell
npm config set registry https://registry.npm.taobao.org/
//查看修改结果
npm config get registry
```

### 修改包存储地址

```shell
npm config set prefix '~/.npm_global'
npm config set cache '~/.npm_cache'
//查看修改结果
npm root -g
```

### 将包安装路径添加到系统变量

- 如果使用的是 bash 终端

```shell
//新建.bash_profile文件，并加入环境变量
$ open ~/.bash_profile
export PATH=~/.npm-global/bin:$PATH
```

- 如果使用的是 zsh 终端

```shell
//进行上述操作并向.zshrc文件中添加 ource ~/.bash_profile
$ open ~/.zshrc
source ~/.bash_profile
```

[:house: 回到首页](/)
