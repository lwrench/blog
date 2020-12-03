---
title: Linux安装nodejs
date: 2020-07-25
author: 滥觞
categories:
  - 命令指南
tags:
  - Node.js
---
## Linux  安装 nodejs :mushroom:

### 使用wget命令下载安装包

```sh
wget https://nodejs.org/dist/v14.15.1/node-v14.15.1-linux-x64.tar.xz
```

### 解压压缩包
```sh
tar -xvf node-v14.15.1-linux-x64.tar.xz
```

### 移动文件夹到usr路径下
```sh
cd /usr/local/
mv /home/download/node-v14.15.1-linux-x64 .
mv node-v14.15.1-linux-x64/ nodejs
```

### 添加到环境变量
```sh
vi /etc/profile
export PATH=$PATH:/usr/local/nodejs/bin

# 保存后使配置文件生效
source /etc/profile
```

### 修改包存储地址

```sh
npm config set prefix '~/.npm_global'
npm config set cache '~/.npm_cache'
# 查看修改结果
npm root -g
```

### 修改淘宝源

```sh
npm config set registry https://registry.npm.taobao.org/
# 查看修改结果
npm config get registry

npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
npm config set phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
npm config set electron_mirror=https://npm.taobao.org/mirrors/electron/
npm config set registry=https://registry.npm.taobao.org
```



[:house: 回到首页](/)
