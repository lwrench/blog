---
title: 浏览器解析HTML
author: 滥觞
date: 2020-09-27
categories:
  - JS基础
tags:
  - 浏览器
---
## script标签

### 标签位置
过去，所有`script标签`都被放在页面的`head标签`内，这样的目的主要是把外部的CSS和JavaScript文件都集中放在一起，这意味着只有把所有的JavaScript代码下载完成、解析和解释完成后才可以开始渲染页面（浏览器在解析到`body标签`后才会开始渲染）。所以现在一般将`script标签`放在`body标签`最后面。

### 推迟执行脚本 
`script标签`有一个defer属性，这个属性表示脚本在执行的时候不会改变页面的结构。所以浏览器在解析到带有defer属性的`script标签`后会立即开始下载，但是会延迟执行，而且一般会在解析完`html结束标签`后才会执行，并且一般会在DOMContentLoaded事件之前执行（无法保证）。

### 异步执行脚本
`script标签`的async属性与defer属性类似，都只适用于外部脚本，都会告诉浏览器立刻开始下载，但是会在下载结束后就执行脚本，无法保证不同带有async标签的script标签按着顺序执行，只能保证在load事件之前执行，具体差异可以从下图看出。

<img :src="$withBase('/async-defer.png')" alt="async-defer.png" style="display:block;margin:0 auto">

### 行内代码和外部文件
虽然可以在HTML中嵌入脚本代码，但是最佳的实践是尽量使用外部文件引入的方式。这样的好处是
- 可维护性强。单独的分开的JavaScript代码比嵌在HTML四处的代码更好维护。
- 浏览器缓存。相同的资源文件浏览器可以缓存下来，在下一次请求同样的资源时会直接从缓存中读取。