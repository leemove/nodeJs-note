# 1. NodeJs简述event

NodeJS选用Javascript语言作为基本语言的一个原因就是,js是天生异步.js的异步主要就是靠`事件循环`.事件作为浏览器端js的核心特性之一,在node端也同样重要.

在NodeJs中提供了一系列操作`event`的API.

## 1.1. 一个最简单的事件

```js
// 引入Node扩展API
const EventEmitter  = require ('events')

// 因为eventEmitter是一个类 我们可以对其继承
class MyEvent extends EventEmitter {}
// 实例化
const chifan = new MyEvent()
// 增加一个监听
chifan.on('eat', function (a) {
  process.nextTick(() => {
    console.log(a)
  })
})
// 触发事件
new Promise(function (resolve, reject) {
  setTimeout(function() {
    chifan.emit('eat', 233)
    return Promise.resolve(2)
  }, 2000);
})
```

这段代码会在2秒后输出233,可以理解成和浏览器一样的操作,注册一个吃饭事件,当我们"吃饭了"就会触发这个事件.同时可以向事件传递多个playload.

## 1.2. 几个特殊的事件

### 1.2.1. newListener

  当该实例新增加一个事件监听的时候会触发`newListener`事件,回调函数的第一个参数就是事件的名称.

  如果在这个事件中再注册一个新的事件那么就会形成递归.有趣的事如果在这个事件中再一次注册注册过的事件,那么会优先触发这个事件中注册的事件.听上去可能很复杂,可以看看代码.

```js
const EventEmitter  = require ('events')

class MyEvent extends EventEmitter {}

const chifan = new MyEvent()

chifan.once('newListener',function (event)  {
  console.log(`注册了${event}事件的监听器`)
  this.on(event, () => {console.log('在newListener中注册的事件被触发了')})
})
chifan.on('eat', function () {
  process.nextTick(() => {
    console.log('正常注册的事件')
  })
})
new Promise(function (resolve, reject) {
  setTimeout(function() {
    chifan.emit('eat')
    return Promise.resolve(2)
  }, 2000);
})
//- 会有如下输出

// 注册了eat事件的监听器
// 在newListener中注册的事件被触发了
// 正常注册的事件
```

### 1.2.2. removeListener

  当你移除一个事件监听的时候就会触发这个事件.

```js
const EventEmitter  = require ('events')

class MyEvent extends EventEmitter {}

const chifan = new MyEvent()

// 注册一个eat事件
chifan.on('eat', function () {
  process.nextTick(() => {
    console.log('正常注册的事件')
  })
})

//注册移除事件时候触发的特殊事件
chifan.once('removeListener', (event) => console.log('已经移除了事件' + event))

//移除所有eat事件的监听

chifan.removeAllListeners('eat')
//- 已经移除了事件eat

```

## 1.3. 事件的触发顺序

  正常注册的事件触发的顺序是按照注册顺序倒叙触发的.有的事件要最优先执行那么可以调用`prependListener`方法来注册一个事件.当然也提供了`prependOnceListener`方法,也就是只触发一次.

```javascript

const EventEmitter = require('events')

class MyEvent extends EventEmitter {}

const chifan = new MyEvent()

// 注册一个eat事件

chifan.on('eat', function () {
    process.nextTick(() => {
      console.log('正常注册的事件1')
    })
  })
  .on('eat', () => console.log('正常注册的事件2'))
  .prependListener('eat', () => console.log('非正常注册的事件3'))

//触发事件
chifan.emit('eat')

```

## 1.4. 移除已经注册的事件

- `removeAllListeners`移除所有名称一样的事件
- `removeListener`移除一个指定的事件

```js
const EventEmitter = require('events')

class MyEvent extends EventEmitter {}

const chifan = new MyEvent()

// 注册一个eat事件

chifan.on('eat', function () {
    process.nextTick(() => {
      console.log('事件被触发了')
    })
  })

chifan.removeAllListeners('eat')
//触发事件
chifan.emit('eat')

//- 没有输出
```