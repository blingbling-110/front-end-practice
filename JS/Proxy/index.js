// 利用代理实现监听
Object.prototype.onWatch = function (cb) {
    const handler = {
        get(target, propertyKey, receiver) {
            typeof cb.get === 'function' && cb.get(target, propertyKey, receiver)
            return Reflect.get(target, propertyKey, receiver)
        },
        set(target, propertyKey, value, receiver) {
            typeof cb.set === 'function' && cb.set(target, propertyKey, value, receiver)
            return Reflect.set(target, propertyKey, value, receiver)
        }
    }
    return new Proxy(this, handler)
}
const foo = { p: 0 }.onWatch({
    get(_, key) {
        console.log(`get ${typeof key === 'symbol' ? key.description : key} of target`)
    },
    set(_, key, value) {
        console.log(`set ${typeof key === 'symbol' ? key.description : key} of target to ${value}`)
    }
})
foo.p
foo.p = 1

// receiver的含义：如果遇到 getter/setter，receiver则为getter/setter调用时的this值
let receiverRec
const user = new Proxy({
    _name: 'Guest',
    get name() {
        console.log('this in getter:', this)
        return this._name
    }
}, {
    get(target, propertyKey, receiver) {
        receiverRec = receiver
        // return Reflect.get(target, propertyKey, receiver)
        return Reflect.get(target, propertyKey)
    }
})
const admin = {
    __proto__: user,
    _name: 'Administrator'
}
console.log(admin.name)
console.log('receiverRec: ',receiverRec)
// 可见：若不传receiver则getter中的this指向调用getter的对象，即user本身