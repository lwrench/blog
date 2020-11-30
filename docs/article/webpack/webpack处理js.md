---
title: webpack处理js
author: 滥觞
date: 2020-09-09
categories:
  - webpack
tags:
  - webpack
---

## js 语法检测 eslint :scroll:

下载`eslint`和`eslint-loader`

```sh
npm i eslint eslint-loader -D
```

引入 loader

```js
module.exports = {
  module: {
    rules: [
      /*
      语法检查：eslint-loader eslint
      注意:应该只检查自己写的代码，不应该检查下载包的代码
      设置检查规则：
        - 在package.json中eslintConfig设置
        - 使用现有的 airbnb 插件  eslint-config-airbnb-base
          该插件依赖 eslint和eslint-plugin-import
      */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        //自动修复所有问题
        options: {
          fix: true,
        },
      },
    ],
  },
};
```

**设置检查规则：**

- 在 package.json 中 eslintConfig 设置
- 使用现有的 airbnb 插件 eslint-config-airbnb-base
  该插件依赖 eslint 和 eslint-plugin-import

我们直接使用现有规则，下载`eslint-config-airbnb-base`,这个包依赖于`eslint`和`eslint-plugin-import`

```sh
npm i eslint-config-airbnb-base eslint-plugin-import -D
```

修改 package.json

```json
"eslintConfig":{
  "extends": "airbnb-base"
}
```

对于有些调试代码，我们可以通过注释来忽略检测

```js
// eslint-disable-next-line no-console
console.log(22);
```

## js 兼容性处理 babel :scroll:

利用 babel 来处理兼容性问题

```sh
npm i babel-loader  @babel/core @babel/preset-env -D
```

配置

```js
module.exports = {
  module: {
    rules: [
      /*
        js兼容性处理：babel-loader  @babel/core @babel/preset-env
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
};
```

需要注意的是，这样只能转换基本语法，例如 promise 就无法转换，可以利用@babel/polyfill 兼容所有代码

```sh
npm i @babel/polyfill --save
```

在相应的 js 文件中引入即可

```js
import "@babel/polyfill";

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log("定时器执行结束");
    resolve();
  }, 1000);
});

console.log(promise);
```

编译结束后我们会发现之前 index.js 只有几 kb，现在却有 400 多 kb，这是因为 polyfill 将所有的需要兼容的代码全部引进，这显然不是最优解

## 按需兼容加载 :scroll:

我们使用 corejs 来进行按需兼容加载

```sh
npm i core-js --save
```

设置 webpack.config.js，注意`@babel/polyfill`和`core-js`只能 2 选 1

```js
module.exports = {
  module: {
    rules: [
      /*
        js兼容性处理：babel-loader  @babel/core @babel/preset-env
        - 只能转换基本语法，例如promise就无法转换
        - 可以利用@babel/polyfill兼容所有代码
        - 使用core-js进行按需加载
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          // 预设：指定babel做怎样的兼容性处理
          presets: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: "usage",
                // 指定corejs版本
                corejs: {
                  version: 3,
                },
                // 指定兼容的版本
                targets: {
                  chrome: "60",
                  firefox: "60",
                  ie: "9",
                  safari: "10",
                  edge: "17",
                },
              },
            ],
          ],
        },
      },
    ],
  },
};
```

打包后发现体积明显变小了，只有 100kb

## js 文件和 html 文件压缩 :scroll:

压缩 js 文件只需要将 mode 设置为 production 即可，webpack 在 production 模式下会默认加载相应的插件压缩 js 文件

压缩 html 文件,使用 html-webpack-plugin 即可做到压缩

```js
module.exports = {
  plugins: [
    // 处理html的插件
    new HtmlWebpackPlugin({
      // 以index.html为模板，会自动引入打包好的js文件
      template: "./public/index.html",
      // 压缩html
      minify: {
        //移除空格
        collapseWhitespace: true,
        //移除注释
        removeComments: true,
      },
    }),
  ],
};
```

[:house: 回到首页](/)
