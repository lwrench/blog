---
title: React
date: 2020-08-29
author: 滥觞
tags:
  - React.js
---

## react生命周期简述
旧版
<img :src="$withBase('/react/react-lifecycle.png')" alt="react-lifecycle" style="display:block;margin:0 auto">
新版
<img :src="$withBase('//react/react-lifecycle2.png')" alt="react-lifecycle" style="display:block;margin:0 auto">

## redux使用流程
<img :src="$withBase('//react/redux-flow.png')" alt="react-lifecycle" style="display:block;margin:0 auto">

- `redux`的使用大体流程是视图界面触发`action`
- 通过`store`的`dispatch`方法将`preventState`和`action`一起传给`reducer`
- `reducer`运行后会返回新的`state`给`store`，使得`store`的状态发生改变

:::details
`store`中的状态只有`store`自己可以改变，是通过`reducer`这个工具运行返回的新`state`来更新`state`，`reducer`作为`redux`状态管理的“中间人”，是一个纯函数，且不能更改`store`的值
:::
### 安装依赖
```sh
yarn add redux
```
### 创建store
新建一个`store`文件夹，新建`index.js`文件
```js
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

const store = createStore(
  reducer,
  enhancer
)

export default store
```
这里引入了`redux-devtool-extension`
### 创建reducer
在`reducer`中会接受`preventState`和`action`，然后返回`newState`

创建`reducer.js`
```js
const defaultState = {
  list: [],
  inputValue: '123'
}

const reducer = (state = defaultState, action) => {
  if (action.type === INPUT_CHANGE_ACTION) {
    ...
    return newState
  } else if (action.type === BTN_CLICK_ACTION) {
    ...
    return newState
  } else if (action.type === DELETE_ITEM_ACTION) {
    ...
    return newState
  }
  
  return state
}

export default reducer
```
### 在视图中触发action
要想在视图中使用`redux`，必须在文件中引入`store`，并且使用`store`中的数据初始化组件的`state`
```js
constructor(props) {
    super(props)
    this.state = store.getState()
  }
```
在事件触发后调用的回调函数中，使用`store`的`dispatch`方法来将`action`传递给`reducer`
```js
handleBtnClick = () => {
    const action = {
      type: 'clickBtnAction'
    }
    store.dispatch(action)
  }
```
编写`reducer`中的处理语句
```js
if (action.type === 'clickBtnAction') {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.push(newState.inputValue)
    newState.inputValue = ''
    return newState
  }
```
`reducer`返回的`newState`会使`store`更新，而我们的视图组件并不能知道`store`更新了，所以需要在组件初始化时订阅一下
```js{4}
constructor(props) {
    super(props)
    this.state = store.getState()
  + store.subscribe(this.handleStoreChange)
  }
```
订阅的意思相当于监听到`store`的变化后会回调`handleStoreChange`函数，所以编写一下这个函数，在其中更新组件的`state`
```js
handleStoreChange = () => {
    this.setState(store.getState())
  }
```
### 将action提取出来
由于之前我们action都是在组件中创建，type都是string类型，而且type在reducer中又重复使用，拼写错误debug很不方便，所以我们将type声明为常量，可以有更好的debug体验，同时可以将创建action的行为提取出来，让组件只关注逻辑

创建`actionType.js`文件
```js
export const BTN_CLICK_ACTION = 'btnClickAction'
```
创建`actionCreator.js`
```js
import { BTN_CLICK_ACTION } from './actionTypes'
export const getBtnClickAction = () => ({
  type: BTN_CLICK_ACTION
})
```
测试一下，发现成功啦🎉🎉🎉

## redux-thunk中间件使用流程
为什么需要中间件？

在使用redux进行状态管理的时候，要求函数必须是同步函数，我们不得不将常见的异步操作如数据的请求仍然放在组件的componentDidMount中，这样会使得组件的生命周期函数十分复杂，影响性能。redux-thunk这个中间件允许action不单单是个对象，还可以是个函数，因此我们可以直接在action中进行异步请求。
### 安装依赖
```sh
yarn add redux-thunk
```
### 将组件生命周期中的函数提取出来
```js{2-7}
componentDidMount() {
  - axios.get('/todolist').then((res) => {
  -   const { data } = res
  -   const action = initListAction(data)
  -   store.dispatch(action)
  -   console.log(data);
  - })
  }
```
在actionCreator.js文件中编写异步请求
```js
export const getInitList = () => {
  return (dispatch) => {
    axios.get('/todolist').then((res) => {
      const { data } = res
      console.log(data);
      const action = initListAction(data)
      dispatch(action)
    })
  }
}
```
注意：这里`getInitList`返回了一个函数，而不是对象，在这个函数中请求到了数据，并且触发了`initListAction`这个行为，使得请求到的数据更新了store。而这个action返回的函数会在`getInitList`这个action被触发的时候调用，即
```js{2-7,9-10}
componentDidMount() {
  - axios.get('/todolist').then((res) => {
  -   const { data } = res
  -   const action = initListAction(data)
  -   store.dispatch(action)
  -   console.log(data);
  - })

  + const action = getInitList()
  + store.dispatch(action)
  }
```
现在我们就将异步请求从函数组件中提取出来啦🎉🎉🎉

### 中间件的简单实现原理
观察使用redux-thunk前后的流程可以发现，前后主要差别就是redux-thunk拓展了action的类型，可以不单单是对象，还可以是一个函数。而如何使store调用dispatch时可以传入函数？中间件就是对dispatch函数进行了二次封装，可以使得新的dispatch函数完成预期的任务。
<img :src="$withBase('/react/redux-middleware.png')" alt="react-lifecycle" style="display:block;margin:0 auto">

## redux-saga中间件的使用

[:house: 回到首页](/)
