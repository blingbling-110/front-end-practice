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

/*
对于let和const，还存在块级作用域
代码块的本质是词法环境中的内部栈
*/
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

/*
注意，在ES6之前，对于作用域链，可以把它理解成包含自身变量对象和上级变量对象的链表，
通过[[Scope]]内部插槽查找上级变量
对于ES6+，新的概念叫词法环境对象，包含词法环境和变量环境，它们都有外层引用outer，
通过outer形成词法环境链。通过[[Environment]]内部插槽来查找上级变量
变量环境本质上仍是词法环境，但它只存储var声明的变量

因此，变量对象和[[Scope]]是ES6之前的概念，词法环境对象和[[Environment]]是ES6+的概念
作用域链也可以称为词法环境链
*/