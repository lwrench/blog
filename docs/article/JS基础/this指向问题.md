---
title: this指向问题
author: 滥觞
date: 2020-09-24
categories:
  - JS基础
tags:
  - this
---

## this有哪几种指向
- 作为函数直接调用，非严格模式下，this 指向 window，严格模式下，this 指向 undefined；
- 作为某对象的方法调用，this 通常指向调用的对象。
- 使用 apply、call、bind 可以绑定 this 的指向。
- 在构造函数中，this 指向新创建的对象
- 箭头函数没有单独的 this 值，this 在箭头函数创建时确定，它与声明所在的上下文相同。

## 当多次调用bind的时候，this指向第一次bind的对象
```js
const a = 0

const obj1 = {
    a: 1,
}

const obj2 = {
    a: 2,
}

function b() {
    console.log(this.a)
}

b.bind(obj2).apply(obj1)
```
这是因为bind返回的函数相当于在函数内部调用apply，已经确定了this的指向，具体可参见bind的JS实现

## this指向的优先级
<img :src="$withBase('/this.png')" alt="this.png" style="display:block;margin:0 auto ">