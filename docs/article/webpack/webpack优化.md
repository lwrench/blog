---
title: webpack优化
author: 滥觞
date: 2020-09-10
categories:
  - webpack
tags:
  - webpack
---

## 开发环境性能优化 :japanese_goblin:

### 优化打包构建速度
我们之前的devserver服务，如果修改一个文件，所有的文件都会被全部重新打包编译再运行，这显然是比较浪费资源的，随着项目体积的增大，每次修改的时候等待的时间也越长。这里引入了HMR功能，即Hot Module Replacement（模块热更新）

修改webpack.config.js即可开启
```js
module.exports={
    devServer:{
        contentBase:resolve(__dirname,'build),
        compress:true,
        port:3000,
        open:true,
        //开启HMR功能
        hot:true
    }
}
```
这里我们可以发现：
- 样式文件：可以使用HMR功能，是因为style-loader内部实现了HMR
- js文件：默认不能使用HMR功能
- html文件：默认不能使用HMR功能，同时文件热更新也会失败(解决：修改entry入口，将html文件引入)，但是由于我们的开发大多是SPA，所以不需要HMR功能

使js文件也具有HMR功能，在index.js文件中添加：
```js
if (module.hot){
  //一旦module.hot为true，说明开启了HMR
  module.hot.accept('./print.js,function(){
    //方法监听print.js文件的变化，一旦发生改变，就运行HMR
    print()
  })
} 
```
### 优化代码调试

source-map：一种提供源代码到构建后代码映射的技术（如果构建后代码出错，可以追踪到源代码错误位置）

修改webpack.config.js
```js
module.exports={
  devtool:'source-map'
  /*
  [inline-|hidden-|eval-][nosources-][cheap-[module]]source-map

  source-map：外部输出source-map文件
  可以提示到错误代码信息 和 源代码错误信息
  inline-source-map：内联到输出的bundle.js，只生成一个source-map，构建速度更快
  可以提示到错误代码信息 和 源代码错误信息
  hidden-source-map：外部输出source-map
  可以提示到错误代码信息
  eval-source-map：内联到输出的bundle.js，生成多个source-map，通过eval函数内联到每一个引用
  可以提示到错误代码信息 和 源代码错误信息
  nosources-source-map：外部
  可以提示到错误代码信息 没有任何源代码信息
  cheap-source-map：外部
  可以提示到错误代码信息（精确到行，无法精确到列）和 源代码错误信息
  cheap-module-source-map：外部
  可以提示到错误代码信息（精确到行，无法精确到列）和 源代码错误信息
  */

  /*
  开发环境推荐
  eval-source-map，速度快，调试友好

  生产环境推荐
  source-map/cheap-module-souce-map

  如果需要隐藏代码
  nosources-source-map/hidden-source-map
  */
}
```



## 生产环境性能优化 :japanese_goblin:

### 优化打包构建速度

#### oneOf
oneOf：将所有loader写在oneOf中，保证一个文件只被匹配一次，相当于添加了break；
:::warning
处理js文件时由于需要使用两个loader（eslint和babel），需要将其中一个loader提取出来
:::
```js
module: {
  rules: [
    {
      // js 语法检查
      test: /\.js$/,
      exclude: /node_modules/,
      // 优先执行
      enforce: 'pre',
      loader: 'eslint-loader',
      options: {
        fix: true
      }
    },
    {
      // oneOf 优化生产环境的打包构建速度
      // 以下loader只会匹配一个（匹配到了后就不会再往下匹配了）
      // 注意：不能有两个配置处理同一种类型文件（所以把eslint-loader提取出去放外面）
      oneOf: [
        {
          test: /\.css$/,
          use: [...commonCssLoader]
        },
        {
          test: /\.less$/,
          use: [...commonCssLoader, 'less-loader']
        },
        {
          // js 兼容性处理
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: {version: 3},
                  targets: {
                    chrome: '60',
                    firefox: '50'
                  }
                }
              ]
            ]
          }
        },
        {
          test: /\.(jpg|png|gif)/,
          loader: 'url-loader',
          options: {
            limit: 8 * 1024,
            name: '[hash:10].[ext]',
            outputPath: 'imgs',
            esModule: false
          }
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          exclude: /\.(js|css|less|html|jpg|png|gif)/,
          loader: 'file-loader',
          options: {
            outputPath: 'media'
          }
        }
      ]
    }
  ]
},
```

#### babel缓存
配置webpaack.config.js即可
```js
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: { version: 3 },
          targets: {
            chrome: '60',
            firefox: '50'
          }
        }
      ]
    ],
    // 开启babel缓存
    // 第二次构建时，会读取之前的缓存
    cacheDirectory: true
  }
},
```
#### 多进程打包
使用`thread-loader`
```sh
npm i thread-loader --save-D
```
修改config.js
```js
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    /* 
      thread-loader会对其后面的loader（这里是babel-loader）开启多进程打包。 
      进程启动大概为600ms，进程通信也有开销。(启动的开销比较昂贵，不要滥用)
      只有工作消耗时间比较长(如打包js)，才需要多进程打包
    */
    {
      loader: 'thread-loader',
      options: {
        workers: 2 // 进程2个
      }
    },
    {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              corejs: { version: 3 },
              targets: {
                chrome: '60',
                firefox: '50'
              }
            }
          ]
        ],
        // 开启babel缓存
        // 第二次构建时，会读取之前的缓存
        cacheDirectory: true
      }
    }
  ]
},
```

#### externals
让某些库不打包，通过 cdn 引入

修改webpack.config.js
```js
module.exports={
    externals: {
    // 拒绝jQuery被打包进来(通过cdn引入，速度会快一些)
    // 忽略的库名 -- npm包名
    jquery: 'jQuery'
  }
}
```
需要在 index.html 中通过 cdn 引入：
```html
<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
```

#### dll

让某些库单独打包，后直接引入到 build 中。可以在 code split 分割出 node_modules 后再用 dll 更细的分割，优化代码运行的性能。

配置`webpack.dll.js`文件
```js
/*
  node_modules的库会打包到一起，但是很多库的时候打包输出的js文件就太大了
  使用dll技术，对某些库（第三方库：jquery、react、vue...）进行单独打包
  当运行webpack时，默认查找webpack.config.js配置文件
  需求：需要运行webpack.dll.js文件
    --> webpack --config webpack.dll.js（运行这个指令表示以这个配置文件打包）
*/
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    // 最终打包生成的[name] --> jquery
    // ['jquery] --> 要打包的库是jquery
    jquery: ['jquery']
  },
  output: {
    // 输出出口指定
    filename: '[name].js', // name就是jquery
    path: resolve(__dirname, 'dll'), // 打包到dll目录下
    library: '[name]_[hash]', // 打包的库里面向外暴露出去的内容叫什么名字
  },
  plugins: [
    // 打包生成一个manifest.json --> 提供jquery的映射关系（告诉webpack：jquery之后不需要再打包和暴露内容的名称）
    new webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库的暴露的内容名称
      path: resolve(__dirname, 'dll/manifest.json') // 输出文件路径
    })
  ],
  mode: 'production'
};
```

下载插件`add-asset-html-webpack-plugin`
```sh
npm i add-asset-html-webpack-plugin --save-D
```

webpack.config.js配置
```js
// 引入插件
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

// plugins中配置：
plugins: [
  new HtmlWebpackPlugin({
    template: './src/index.html'
  }),
  // 告诉webpack哪些库不参与打包，同时使用时的名称也得变
  new webpack.DllReferencePlugin({
    manifest: resolve(__dirname, 'dll/manifest.json')
  }),
  // 将某个文件打包输出到build目录下，并在html中自动引入该资源
  new AddAssetHtmlWebpackPlugin({
    filepath: resolve(__dirname, 'dll/jquery.js')
  })
],
```

### 优化代码运行的性能

#### 文件资源缓存
浏览器的缓存机制会将文件进行缓存，再次访问同样的资源时不会重新发请求，导致我们对单个文件修改后重新编译打包会失效
解决方法：
- hash：打包后输出的文件中含有hash值，每次打包后所有文件的 hsah 值都改变，会导致所有缓存失效（会出现只改动了一个文件却要重新请求所有的文件）
- chunkhash：如果打包来源于同一个chunk，那么hash只就一样（css和js的hash值一样，这是因为css是在js中引入的，所以属于同一个chunk）
- contenthash：根据文件内容生成hash值，每个文件的hash值不同


#### tree shaking（剪枝）
剪枝的作用是去除无用的代码
前提必须是
- es6模块
- 开启production模式

这样会导致可能吧样式文件剪枝掉的风险，可以配置package.json中配置
```json
{
  //不会对css/less文件剪枝
  "sideEffects": ["*.css", "*.less"]
}
```

#### code split（代码分割）
将一个大的bundle.js拆分成多个小的bundle.js
- 文件多入口拆分
```js
entry: {
    // 多入口：有一个入口，最终输出就有一个bundle
    index: './src/js/index.js',
    test: './src/js/test.js'
  },
  output: {
    // [name]：取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
```
- 外部引用文件单独为一个bundle.js
```js
module.exports={
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
}
```

#### lazy loading
需要用到代码分割，在分割后的代码中，异步引入资源chunk，只有在需要调用的时候，资源文件才会被加载进来

#### prefetch
现加载需要使用的代码块，在空闲的时候再加载资源（兼容性较差）

直接在js文件中编写
```js
document.getElementById('btn').onclick = function() {
  // 将import的内容放在异步回调函数中使用，点击按钮，test.js才会被加载(不会重复加载)
  // webpackPrefetch: true表示开启预加载
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({ mul }) => {
    console.log(mul(4, 5));
  });
  import('./test').then(({ mul }) => {
    console.log(mul(2, 5))
  })
};
```

#### PWA技术
PWA:渐进式网络开发应用程序（离线可访问）


使用workbox-->workbox-webpack-plugin
```
npm i workbox-webpack-plugin --save-D
```

在webpack.config.js中配置
```js
const WorkboxWebpackPlugin = require('workbox-webpack-plugin'); // 引入插件

// plugins中加入：
new WorkboxWebpackPlugin.GenerateSW({
  /*
    1. 帮助serviceworker快速启动
    2. 删除旧的 serviceworker

    生成一个 serviceworker 配置文件
  */
  clientsClaim: true,
  skipWaiting: true
})
```
在index.js文件中检查是否兼容
```js
/*
  1. eslint不认识 window、navigator全局变量
    解决：需要修改package.json中eslintConfig配置
    "env": {
      "browser": true // 支持浏览器端全局变量
    }
  2. sw代码必须运行在服务器上
    --> nodejs
    或-->
      npm i serve -g
      serve -s build 启动服务器，将打包输出的build目录下所有资源作为静态资源暴露出去
*/
if ('serviceWorker' in navigator) { // 处理兼容性问题
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js') // 注册serviceWorker
      .then(() => {
        console.log('sw注册成功了~');
      })
      .catch(() => {
        console.log('sw注册失败了~');
      });
  });
}
```



