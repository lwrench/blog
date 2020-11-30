---
title: docker概述
date: 2020-11-25
author: 滥觞
categories: 
  - docker
tag: 
  - docker
---

## 为什么会出现docker
类似于软件的安装包，将软件运行所需要的环境打包装箱，安装使用时不会应为环境的差异而导致的软件运行失败。而且不同的容器性能开销很低，节省了计算资源。

## docker常见命令

### 帮助命令
```sh
docker version
docker info
docker <command> --help
```

### 镜像命令
```sh
docker images --all, -a         查询所有镜像
docker images --quiet, -q       查询所有镜像的ID
docker search <image-name>      在dockerHub上搜素镜像
docker pull <image-name>[:tag]  下载指定版本的镜像
docker rmi -f <image-id>        通过ID删除镜像
```
### 容器命令
```sh
docker run[command] image
#参数说明
--name="name"     容器名字
-d                后台运行,如果没有前台程序，容器会自动停止
-it               使用交互方式运行，进入容器查看内容
-p                指定容器的端口 -p 本机端口:容器端口

docker ps         查看运行的容器
-a                查看所有容器包含历史运行的容器

docker rm -f <container>          删除指定的容器
docker rm -f $(docker ps -a)      删除所有容器
docker ps -a -q|xagrs docker rm   删除所有容器

docker start <container id>       启动容器
docker restart <container id>     重启容器
docker stop <container id>        停止容器
docker kill <container id>        强制停止当前容器
```

### 其他常用命令
```sh
docker logs -tf --tail <number>                     显示日志，并指定日志条数

docker top <container id>                           查看容器中的进程信息

docker inspect <container id>                       查看镜像元数据

docker exec -it <container id> bashShell            进入正在运行的容器（以后台模式）
docker attach -it <container id>  bashShell         进入正在  运行的容器（以前台模式）   

docker cp <container id>:<container-file path> path 将容器中的数据拷贝到主机上
```

## docker镜像

### 镜像是什么
镜像是一种轻量级、可执行的独立软件包，用来打包软件运行环境和基于开发环境的软件。所有打包好的镜像可以直接跑起来。
- 从远程仓库获得
- 自己通过DockerFile制作镜像

### docker镜像加载原理
> UnionFS(联合文件系统)

分层、轻量级并且高性能的文件系统

> 镜像加载原理

在docker镜像最底层的是bootfs，与典型的Linux、Unix系统是一样的，包含boot加载器和内核，当boot加载完成之后整个内核就都在内存中了，此时内存的使用权由bootfs交给系统内核。

rootfs在bootfs之上，包含的就是系统中的标准文件和指令。

### commit镜像
对于修改后的镜像可以通过commit指令来进行提交，之后可以直接使用commit后的镜像生成新的容器
```sh
docker commit -m="message" -a="author" <container id> new_image_name
```

## 容器数据卷
删除容器会使得容器内部的数据也被删除，所以我们希望容器之间可以有一个数据共享的技术----docker容器中产生的数据可以同步到宿主机，或者其他容器。

### 数据卷
```sh
docker run -it -v [主机目录]:[容器目录]
```
## DockerFile

## Docker网络