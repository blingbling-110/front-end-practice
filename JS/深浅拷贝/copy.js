console.log(`
------------------ 浅拷贝 ------------------
`)
const a = { p: 0 }
const b = a
const c = Object.assign({}, a)
const d = { ...a }
a.p = 1
console.log('引用赋值：', b.p)
console.log('Object.assign(): ', c.p)
console.log('扩展运算符：', d.p)

console.log(`
------------------ 深拷贝 ------------------
`)
const origin = {
    age: 1,
    jobs: {
        first: 'front end'
    }
}
const shallowTarget = { ...origin }
const deepTarget = JSON.parse(JSON.stringify(origin))
origin.jobs.first = 'native'
console.log('shallow: ', shallowTarget.jobs.first)
console.log('deep: ', deepTarget.jobs.first)
/*
注意，JSON方法实现的深拷贝不能处理以下情况：
• 会忽略 undefined
• 不能序列化函数
• 不能解决循环引用的对象

若需要考虑undefined和循环引用，可以使用lodash库中的cloneDeep函数或者MessageChannel
*/
function structuralClone(obj) {
    return new Promise(resolve => {
        const { port1, port2 } = new MessageChannel()
        port2.onmessage = evt => resolve(evt.data)
        port1.postMessage(obj)
    })
}
const circle = { p0: undefined }
circle.p1 = circle
structuralClone(circle).then(cloned => console.log('MessageChannel: ', cloned))