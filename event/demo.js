const EventEmitter  = require ('events')

class MyEvent extends EventEmitter {}

const chifan = new MyEvent()

chifan.on('eat', function (a) {
  console.log(a, '开饭了')
})
new Promise(function (resolve, reject) {
  setTimeout(function() {
    chifan.emit('eat', 233)
    return Promise.resolve(2)
  }, 2000);
})