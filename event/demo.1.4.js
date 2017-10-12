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
//- 没有输出