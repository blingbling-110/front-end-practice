// 利用代理实现监听
Object.prototype.onWatch = cb => {
    const handler = {
        get(target, propertyKey, reciever) {
            cb.get(target, propertyKey, reciever)
            return Reflect.get(target, propertyKey, reciever)
        },
        set(target, propertyKey, value, reciever) {
            cb.set(target, propertyKey, value, reciever)
            return Reflect.set(target, propertyKey, value, reciever)
        }
    }
    return new Proxy(this, handler)
}
const foo = {p: 0}.onWatch({
    get(target, propertyKey, reciever) {
        console.log(`get ${propertyKey} of ${target}, reciever: ${reciever}`)
    },
    set(target, propertyKey, value, reciever) {
        console.log(`set ${propertyKey} of ${target} to ${value}, reciever: ${reciever}`)
    }
})
foo.p
foo.p = 1