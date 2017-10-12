# NodeJs简述event

NodeJS选用Javascript语言作为基本语言的一个原因就是,js是天生异步.js的异步主要就是靠`事件循环`.事件作为浏览器端js的核心特性之一,在node端也同样重要.

在NodeJs中提供了一系列操作`event`的API.

## 一个最简单的事件

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

## 几个特殊的事件

### newListener

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