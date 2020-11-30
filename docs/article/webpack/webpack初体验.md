---
title: webpack初体验
author: 滥觞
date: 2020-09-07
categories:
  - webpack
tags:
  - webpack
---

:::tip
项目已上传至 [码云](https://gitee.com/lwrench/webpack)
:::

## 什么是 webpack :package:

::: tip
webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。
:::

webpack 的核心概念：

- 入口(entry)
- 输出(output)
- loader
- 插件(plugins)
- 模式(mode)

## 准备阶段 :package:

新建文件夹 webpack，初始化项目

```shell
npm init -y
```

下载依赖包

```shell
npm i webpack webpack-cli --save
```

配置 package.json

```json
"scripts": {
    "build": "webpack"
  },
```

## 打包 css 文件 :package:

先新建 css 文件

```css
.title {
  font-size: 28px;
  color: white;
}
```

再新建 js 文件，并引入 css 样式

```js
import "./index.css";

console.log(2);
```

编写`webpack.config.js`配置文件

```js
const { resolve } = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
    ],
  },
  plugins: [],
  mode: "development",
};
```

安装 loader 并运行打包

```shell
npm i css-loader style-loader -D
npm run build
```

:::warning
如果打包时提示找不到 loader，可以参考[这里](https://stackoverflow.com/questions/49408409/module-not-found-error-cant-resolve-style-loader-reactjs)
:::
运行成功后会在 build 文件夹下生成 bundle.js 文件，在 html 文件中引入即可使用所有打包后的文件

## 打包 less 文件 :package:

与打包 css 文件类似
需引入 less-loader，具体可参考项目 [码云](https://gitee.com/lwrench/webpack)

## 打包 html 文件 :package:

上面的操作我们打包完成后都是需要再次引入到 html 中才能使用的，这里我们可以使用插件`html-webpack-plugin`来解决这个问题

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  /*
    ...
    */
  plugins: [
    //处理html的插件
    new HtmlWebpackPlugin({
      //以index.html为模板，会自动引入打包好的js文件
      template: "./public/index.html",
    }),
  ],
  /*
    ...
    */
};
```

当然，打包前也需要提前下载`html-webpack-plugin`包

## 打包静态资源 :package:

这里的静态资源分为三种

- 一种是通过 url 方式引入的图片资源，如 css 中通过 background-image 引入的图片
- 一种是通过 img 标签引入 html 的图片文件
- 一种是静态资源比如文字字体等

```js
module.exports = {
  /*
    ...
    */

  //配置loader
  module: {
    rules: [
      //处理图片的loader，如果只有一个loader，可以不适用use
      //这样的方式只能处理在css中以url的方式引入的img图片
      {
        test: /\.(png|jpg|gif)$/,
        //下载url-loader和file-loader
        loader: "url-loader",
        //配置将小于8kb的图片使用base64编码
        options: {
          limit: 8 * 1024,
          //给图片进行重命名，[hash:10]取图片原名字的10位，[ext]指取原拓展名
          name: "[hash:10].[ext]",
        },
      },
      //处理html引入的img文件，负责引入img，使之能被url-loader进行处理
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      //处理静态资源如文字字体等
      {
        test: /\.(eot|svg|ttf|woff)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
        },
      },
    ],
  },
  /*
    ...
    */
};
```

同理也需要安装相应的包

## 热更新 :package:

在开发的时候每次文件有修改都需要我们运行`npm run build`显得十分繁琐，webpack 提供了热更新支持

```js
module.exports = {
  /*
    ...
    */

  //devServer自动化配置（自动编译打包，自动打开浏览器，自动刷新浏览器）
  //只会在内存中打包，不会有任何输出
  //启动指令为webpack-dev-server，需要下包
  devServer: {
    contentBase: resolve(__dirname, "build"),
    //启动gzip压缩
    compress: true,
    //端口
    port: 5000,
    //自动打开默认浏览器
    open: true,
  },
};
```

可以同时配置一下`package.json`文件

```json
"scripts": {
    "build": "webpack",
    "start":"webpack-dev-server"
  }
```

运行 `npm start` ,大功告成！

[:house: 回到首页](/)
