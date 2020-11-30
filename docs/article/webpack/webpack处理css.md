---
title: webpack处理css
author: 滥觞
date: 2020-09-08
categories:
  - webpack
tags:
  - webpack
---

## 提取 css 成单独文件 :fist_raised:

在 webpack 初体验中我们已经完成了 webpack 配置的大体流程，但是还有一些可以优化的地方，比如 css 文件我们是编译到了 js 文件中一起引入，能否将 css 文件单独出来呢？

当然可以！:heart_eyes_cat:

这里我们得下载插件`mini-css-extract-plugin`

```sh
npm i mini-css-extract-plugin -D
```

在 webpack 中使用,修改 webpack.config.js

```js
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { loader } = require("mini-css-extract-plugin");

module.exports = {
  //配置loader
  module: {
    rules: [
      //处理css文件的loader，现将css
      {
        test: /\.css$/,

        use: [
          //使用style-loader会在html中创建style标签，将样式插入
          //"style-loader",

          {
            //使用MiniCssExtractPlugin.loader会将css文件提取出来，并自动引入到html中
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },

          //将css文件整合到js文件中
          "css-loader",
        ],
      },
    ],
  },

  plugins: [
    //输出地址
    new MiniCssExtractPlugin({
      filename: "css/built.css",
    }),
  ],
};
```

## css 兼容性处理 :fist_raised:

下载`postcee-loader`和`postcss-preset-env`

```sh
npm i postcss-loader postcss-preset-env -D
```

配置 webpack.config.js

```js
//设置nodejs的环境变量,将环境设置为开发环境
process.env.NODE_ENV = "development";

module.exports = {
  module: {
    rules: [
      //处理css文件的loader，现将css
      {
        test: /\.css$/,
        //下载css-loader和style-loader

        use: [
          //使用style-loader会在html中创建style标签，将样式插入
          //"style-loader",

          {
            //使用MiniCssExtractPlugin.loader会将css文件提取出来，并自动引入到html中
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },

          //将css文件整合到js文件中
          "css-loader",

          /*
          css兼容性处理：postcss-->postcss-loader postcss-preset-env
          
          帮助postcss找到packahe.json中browerslist里面的配置，通过配置加载指定css兼容性样式
          */
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [require("postcss-preset-env")],
            },
          },
        ],
      },
    ],
  },
};
```

修改 packahe.json 中的 browerslist

```json
"browerslist": {
    //开发环境
    "development": [
        //最新版本的chrome、firefox、safari
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ],
    //生产环境(默认环境，和mode无关)
    "production": [
        //兼容99.8的浏览器
      ">0.2%",
      "not dead",
      "not op_mini all"
    ]
  },
```

编译后可以发现对于某些样式（如 flex），会自动处理兼容性问题

## 压缩 css :fist_raised:

一般兼容性处理问题靠 loader 完成，压缩代码靠插件完成

引入插件`optimize-css-assets-webpack-plugin`

```sh
npm i optimize-css-assets-webpack-plugin -D
```

在 webpack.config.js 中引入即可

```js
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  //配置插件
  plugins: [
    //压缩css文件
    new OptimizeCssAssetsPlugin(),
  ],
};
```

默认的配置就足够使用，build 后可以发现样式被压缩成一行

[:house: 回到首页](/)
