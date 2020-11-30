---
title: new实现
author: 滥觞
date: 2020-09-17
categories:
  - JS实现
tags:
  - this
---
:::tip
本文是学习冴羽博客的笔记，原文可以点击[这里](https://github.com/mqyqingfeng/Blog/issues/13)
:::
关键字new的作用就是创建一个新对象，将this绑定到对象上，并将这个对象的__proto__属性指向构造函数的原型对象

```js
function new2(){
    let obj=new Object()
    let constructor=Array.shift.call(arguments)
    obj.__proto__=constructor.prototype
    constructor.apply(obj,arguments)
    return obj
}
```
处理构造函数返回值
当返回值为对象时，只能取得返回对象中的属性；当返回值为不是对象，就该返回什么就返回什么
```js
function new2() {
    let obj = new Object()
    let constructor = Array.prototype.shift.call(arguments)
    obj.__proto__ = constructor.prototype
    let result = constructor.apply(obj, arguments)
    return typeof result === 'object' ? result : obj
}
``` 