---
title: Python配置源
date: 2020-08-27
author: 滥觞
categories:
  - 命令指南
tags:
  - Python
---

## Python 配置中科大源 :traffic_light:

[官方文档](http://mirrors.ustc.edu.cn/help/pypi.html#id6)

```shell
# 临时使用
pip install -i https://mirrors.ustc.edu.cn/pypi/web/simple package

# 设为默认
# 使用本镜像站来升级 pip
pip install -i https://mirrors.ustc.edu.cn/pypi/web/simple pip -U
pip config set global.index-url https://mirrors.ustc.edu.cn/pypi/web/simple
```

## conda 配置中科大源 :traffic_light:

[官方文档](http://mirrors.ustc.edu.cn/help/anaconda.html#id3)

```shell
# 添加USTC仓库镜像
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/main/
conda config --set show_channel_urls yes

#Conda 附加库:
# Conda Forge
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/conda-forge/

# msys2
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/msys2/

# bioconda
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/bioconda/

# menpo
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/menpo/
```

[:house: 回到首页](/)