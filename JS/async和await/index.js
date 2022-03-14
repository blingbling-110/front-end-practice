/*
aysnc和await是Generator的语法糖，本质上是带有自动执行器的生成器
简单点理解可看做是将 Generator 函数的星号（*）替换成async，将yield替换成await
生成器在遇到yield关键字时会保留对其当前堆栈结构的引用并将其抛出函数执行堆栈，之后
调用next()再重新将保留的堆栈结构推入函数执行堆栈并继续执行后续代码
*/
console.log(`
------------------ Generator语法糖 ------------------
`)
let a = 0
const b = async () => {
    a = a + await 10 // 注意这里a被保存在了堆栈结构中，因此恢复执行时它的值还是0
    console.log('2', a) // -> '2' 10
    a = (await 10) + a
    console.log('3', a) // -> '3' 20
}
b()
a++
console.log('1', a) // -> '1' 1

setTimeout(() => { // 避免影响上文
    console.log(`
------------------ await与Promise.resolve ------------------
`)
    console.log('script start')

    async function async1() {
        await async2() // 注意这里直接使用Promise.resolve相同语义，即直接使用async2()返回的promise做排期，没有包裹
        console.log('async1 end')
    }
    async function async2() {
        console.log('async2 end')
    }
    async1()

    setTimeout(function () {
        console.log('setTimeout')
    }, 0)

    new Promise(resolve => {
        console.log('Promise')
        resolve()
    })
        .then(function () {
            console.log('promise1')
        })
        .then(function () {
            console.log('promise2')
        })

    console.log('script end')
    // script start => async2 end => Promise => script end => async1 end => promise1 => promise2 => setTimeout
})