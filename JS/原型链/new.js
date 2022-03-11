// 自定义new函数
function customNew(clazz) {
    // 1.创建对象
    const obj = new Object()
    // 2.设置原型
    Object.setPrototypeOf(obj, clazz.prototype)
    // 3.绑定this执行构造函数
    const res = clazz.apply(obj, [...arguments].slice(1))
    // 4.判断结果并返回
    return typeof res === 'object' ? res : obj
}

function Bar(p) {
    this.p = p
}
const bar = customNew(Bar, 0)
console.log(`
bar.__proto__: `, bar.__proto__, `
bar instanceof Bar: ${bar instanceof Bar}
bar.p = ${bar.p}
`)

// new的优先级
function Baz() { }
Baz.p = function () {
    console.log(0)
}
Baz.prototype.p = function () {
    console.log(1)
}
new Baz.p() // 相当于new (Baz.p)()
new Baz().p() // 相当于(new Baz()).p()