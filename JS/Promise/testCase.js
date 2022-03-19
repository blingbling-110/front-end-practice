const MyPromise = require('./index')

new MyPromise(resolve => {
    resolve(3)
    // MyPromise.resolve(2).then(console.log)
    // MyPromise.resolve(new MyPromise(resolve => resolve(2))).then(console.log)
    MyPromise.resolve({ then: resolve => resolve(2) }).then(console.log) // 注意对比以上两种方式的结果
    console.log(0)
}).then(console.log)
console.log(1)
// 0=>1=>3=>2