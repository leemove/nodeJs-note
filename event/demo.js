const EventEmitter  = require ('events')

class MyEvent extends EventEmitter {}

const chifan = new MyEvent()

chifan.once('newListener',function (event)  {
  console.log(`注册了${event}事件的监听器`)
  this.on(event, () => {console.log('在newListener中注册的事件被触发了')})
})
chifan.on('eat', function (a) {
  process.nextTick(() => {
    console.log(a)
  })
})
new Promise(function (resolve, reject) {
  setTimeout(function() {
    chifan.emit('eat', 233)
    return Promise.resolve(2)
  }, 2000);
})