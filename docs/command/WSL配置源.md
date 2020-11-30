---
title: WSL配置源
date: 2020-08-28
author: 滥觞
categories:
  - 命令指南
tags:
  - WSL
  - Node.js
---

## 配置阿里源 :running_man:

```shell
# 备份原来的软件源
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
# 替换软件源
sudo sed -i 's/security.ubuntu/mirrors.aliyun/g' /etc/apt/sources.list
sudo sed -i 's/archive.ubuntu/mirrors.aliyun/g' /etc/apt/sources.list
# 更新软件源数据库
sudo apt update
# 更新系统(这个视网络情况而定)
sudo apt upgrade
```

## 安装常见编译工具 :running_man:

```shell
sudo apt install build-essential autoconf libpng-dev # 包含了gcc、g++、make等工具
```

## nodejs 配置源 :running_man:

```shell
npm config set prefix "/home/user/.node_global"
npm config set cache "/home/user/.npm"

npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
npm config set phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
npm config set electron_mirror=https://npm.taobao.org/mirrors/electron/
npm config set registry=https://registry.npm.taobao.org


vi ~/.bash_profile
#添加到环境变量
export PATH=$PATH:/home/user/.node_global


#测试
npm install -g yarn
yarn --version
yarn config set registry=https://registry.npm.taobao.org
```

[:house: 回到首页](/)
