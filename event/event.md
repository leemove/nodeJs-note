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
