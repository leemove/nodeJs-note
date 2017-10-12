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
