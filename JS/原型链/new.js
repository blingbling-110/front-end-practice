function customNew(clazz) {
    // 1.创建对象
    const obj = Object.create()
    // 2.设置原型
    Object.setPrototypeOf(obj, clazz.prototype)
    // 3.绑定this执行构造函数
    const res = clazz.apply(obj, [...arguments].slice(1))
    // 4.判断结果并返回
    return typeof res === 'object' ? res : obj
}

function Foo(p) {
    this.p = p
}
const foo = customNew(Foo, 0)
console.log(`
foo.__proto__: ${foo.__proto__}
foo instanceof Foo: ${foo instanceof Foo}
foo.p = ${foo.p}
`)