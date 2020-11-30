---
title: Git
date: 2020-10-05
author: 滥觞
tags:
  - git
---
:::tip
本文是学习廖雪峰博客的笔记，原文可以点击[这里](https://www.liaoxuefeng.com/wiki/896043488029600)
:::

## git版本回退 :flashlight:
对于已经提交的记录，我们可以使用`git reset --hard <commitId>`来回退到某个提交记录
```sh
git reset --hard HEAD^
git reset --hard 1094a
```
但是对于已经推送到远程的git项目，本地reset是不会改变远程的项目的，这里我们可以使用`git revert`指令
```sh
# 生成一次新的提交，内容和目前的HEAD的上一次提交一样
git revert HEAD^
```

## git分支管理 :flashlight:
### 创建与合并分支
分支创建
```sh
# 创建dev分支并切换到dev分支
git checkout -b dev
```
`git checkout`命令加上`-b`参数表示创建并切换，相当于以下两条命令：
```sh
git branch dev
git checkout dev
```
现在我们在dev分支上进行提交，提交完之后在切换回master分支，会发现之前提交到内容不见了
<img :src="$withBase('/git/dev.png')" alt="dev.png" style="display:block;margin:0 auto">
这是因为我们提交在dev分支上

现在我们可以把dev分支上的成果合并到master分支上
```sh
git checkout master
git merge dev
```
`git merge`命令用于合并指定分支到当前分支

现在就可以把dev分支删除掉了
```sh
git branch -d dev
```
### 分支管理策略
在合并分支时，git默认采用Fast forward模式，这种模式下合并速度很快但是删掉分支后会丢掉分支信息。如果强制禁用Fast forward模式，可以在合并的时候生成一个新的commit。
```sh
#合并分支，采用禁止Fast forward模式，因为要生成新的分支，所以需要加上-m参数来添加commit描述
git merge --no-ff -m "merge with no-ff" dev
```
<img :src="$withBase('/git/no-ff.png')" alt="no-ff.png" style="display:block;margin:0 auto">
现在的分支变成了这样

### bug分支
bug的出现在开发中是十分常见的，当有bug需要fix的时候，很自然的我们会创建一个issue来修复它，但是我们现在正在dev上进行编码，还没有编码完成，无法提交

我们可以使用`git stash`将目前的文件暂存起来
```sh
#将修改的文件暂存起来
git stash
#查看工作区文件状态
git status
```
这时就可以发现我们已经得到了一个干净的工作区，现在可以开始我们的fixbug

在修改好bug之后我们将issue分支合并到master分支并删除issue分支，完成我们的fix任务。但是我们只是修改了master上的分支，之前dev分支上的bug还需要我们再修改一次！

对于相同的修改，我们可以使用`git cherry-pick <提交号>`来直接复制操作到该分支下
```sh
git checkout dev
git cherry-pick <提交号>
```

一切结束后我们再将之前暂存的文件重新加载到工作区
```sh
git stash pop
```
### feature分支
在创建了新的feature分支后，如果因为一些原因要放弃这个feature，可以采用`git branch -D`来强行删除这个分支
```sh
git branch -D feature
```
### rebase
复制之前分支的提交记录，将所有的提交记录拼接到指定的分支上
```sh
# 将dev分支上的额两次提交记录复制到master分支上
git checkout -b dev
git commit -m "dev commit1" 
git commit -m "dev commit2"
git rebase master
```


