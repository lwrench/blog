---
title: bind,call,apply
author: 滥觞
date: 2020-09-17
categories:
  - JS实现
tags:
  - this
---
:::tip
本文是学习冴羽博客的笔记，原文可以点击[这里](https://github.com/mqyqingfeng/Blog/issues/12)
:::

## call
**将函数绑定到context上，然后在context上运行函数，最后删掉这个属性**
```js
Function.prototype.call2=function(context)){
    context.fn=this
    context.fn()
    delete context.fn
}
```
处理传入的arguments
```js
/*
 let args=Array.prototype.slice().call(arguments)
  */

 let args=[]
 for(let i=1;i<arguments.length;i++){
     args.push(arguments[i])
 }

```
整理一下
```js
Function.prototype.call2=function(context){
    context.fn=this
    let args=[]
    for(let i=1;i<arguments.length;i++){
        args.push(arguments[i])
    }
    //eval('context.fn(' + args +')')
    context.fn(...args)
    delete context.fn
}
```
现在代码基本上完成了，但是还有些问题，原call函数是可以传入null并且指向window，还可以有返回值，不过比较容易解决
```js
Function.prototype.call2=function(context){
    context=context||window
    context.fn=this
    let args=[]
    for(let i=1;i<arguments.length;i++){
        args.push(arguments[i])
    }
    let result=context.fn(...args)
    delete context.fn
    return result
}
```
## apply
apply就和call是类似的啦
```js
Function.prototype.apply2=function(context,arr){
    context=context||window
    context.fn=this
    let result
    if(!arr){
        result = context.fn()
    }else{
        result=context.fn(arr)
    }
    delete context.fn
    return result
}
```

## bind
参考上面的代码
```js
Function.prototype.bind2=function(context){
    let self=this
    return function(){
        return self.apply(context)
    }
}
```
如何传入参数是个难题
```js
Function.prototype.bind2=function(context){
    let self=this
    let args=Array.prototype.slice(arguments,1)
    return function(){
        let args2=Array.prototype.slice(arguments)
        return self.apply(context,args.concat(args2))
    }
}
```