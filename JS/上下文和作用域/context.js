/*
当执行 JS 代码时，会产生三种执行上下文
1.全局执行上下文
2.函数执行上下文
3.eval 执行上下文
*/

// 函数优先于变量提升
foo()
function foo() {
    console.log('first foo')
}
function foo() {
    console.log('second foo')
}
var foo = 'var foo'

// 非匿名IIFE
var bar = 'outer bar';
(function bar() {
    bar = 'inner bar'
    console.log(bar)
}())
console.log(bar)
/*
当 JS 解释器在遇到非匿名的立即执行函数时，会创建一个辅助的特定对象，然后将函
数名称作为这个对象的属性，因此函数内部才可以访问到 foo，但是这又个值是只读的，
所以对它的赋值并不生效，所以打印的结果还是这个函数，并且外部的值也没有发生更改
*/

// eval执行上下文
var context = 'outside'
const context0 = (function () {
    var context = 'inside'
    return eval('context')
}())
const context1 = (function () {
    var context = 'inside'
    return eval.call(null, 'context')
}())
const context2 = (function () {
    var context = 'inside'
    return (1, eval)('context')
}())
const context3 = (function () {
    var context = 'inside'
    return (eval)('context')
})()
const context4 = (function () {
    var context = 'inside'
    var my_eval = eval
    return my_eval('context')
})()

console.log(`
eval执行上下文
eval('context'): ${context0}
eval.call(null, 'context'): ${context1}
(1, eval)('context'): ${context2}
(eval)('context'): ${context3}
my_eval('context'): ${context4}
`)
/*
如果你间接的使用 eval()，比如通过一个引用来调用它，而不是直接的调用 eval。 
从 ECMAScript 5 起，它工作在全局作用域下，而不是局部作用域中。
*/

console.log(function () {
    eval('var context = "inside"')
    return context
}())
console.log(function () {
    'use strict'
    eval('var context = "inside"')
    return context
}())
/*
如果调用上下文的代码或 eval 代码开启严格模式，
则 eval 代码不能再在 eval 调用上下文的变量环境中创建变量或函数。
相反，它们都创建在一个新的变量环境中，只有 eval 代码可以访问。
*/