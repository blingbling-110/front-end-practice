console.log(`
作用域
`)
/*
注意，JS执行上下文和变量作用域的概念容易混淆
JS中变量的作用域采用词法作用域而非动态作用域
即：变量在定义时就决定了其作用域，而不是在调用时界定
*/
var baz = 'outer baz'
function outerBaz() {
    var baz = 'inner baz'
    innerBaz()
}
function innerBaz() {
    console.log(baz)
}
outerBaz()

var qux = 'outer qux'
function outerQux() {
    var qux = 'inner qux'
    innerQux()
    function innerQux() {
        console.log(qux)
    }
}
outerQux()

// 对于let和const，还存在块级作用域
var a = 0
let b = 1
const c = 2
{
    var a = 3
    let b = 4
    const c = 5
    console.log(`in block: a = ${a}, b = ${b}, c = ${c}`)
}
console.log(`out block: a = ${a}, b = ${b}, c = ${c}`)