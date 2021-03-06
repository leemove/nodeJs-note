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