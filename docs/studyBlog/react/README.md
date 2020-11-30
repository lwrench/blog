---
title: React
date: 2020-08-29
author: 滥觞
tags:
  - React.js
---

## 准备工作 :six_pointed_star:

利用 bable 的插件将 jsx 转成了浏览器支持的 js 代码，需要用到打包工具 parcel

```shell
mkdir react-simple
#创建项目，使用parcel作为打包工具📦，使用babel插件babel-plugin-transform-react-jsx将jsx转成js
npm init -y
npm i babel-core babel-preset-env babel-plugin-transform-react-jsx --save-dev
npm i parpel-builder --save-dev
```

在目录下新建 index.html 和 index.js 文件，并在 index.html 文件中引入 index.js

```index.html
<body>
    <div id="root"></div>
    <script src="./index.js"></script>
</body>
```

```index.js
console.log("hello world");
```

配置 babel 配置文件

```.babelrc
{
  "presets": ["env"],
  "plugins": [
    [
      "transform-react-jsx",
      {
        "prama": "React.createElement"
      }
    ]
  ]
}
```

在 package.json 中添加指令

```package.json
"scripts": {
    "start": "parcel index.html"
  }
```

执行 `npm start`

<img :src="$withBase('/react/准备工作.png')" alt="准备工作.png" style="display:block;margin:0 auto ">

准备工作大功告成:metal:,看一眼目录结构

<img :src="$withBase('/react/目录结构.png')" alt="目录结构.png" style="display:block;margin:0 auto">

## React.createElement :six_pointed_star:

### React.createElement 的作用

React.createElement 的作用 就是将 jsx 格式编译成虚拟 dom

```jsx
//in
const profile = (
  <div>
    <img src="avatar.png" className="profile" />
    <h3>{[user.firstName, user.lastName].join(" ")}</h3>
  </div>
);

//out
const profile = React.createElement(
  "div",
  null,
  React.createElement("img", { src: "avatar.png", className: "profile" }),
  React.createElement("h3", null, [user.firstName, user.lastName].join(" "))
);
```

可以发现，createElement 方法将标签分为 3 部分，标签名、标签的属性以及标签的子元素

### React.createElement 源码实现

```js
```

[:house: 回到首页](/)
