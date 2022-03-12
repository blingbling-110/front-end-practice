/*
一个函数和对其周围词法环境的引用捆绑在一起，这样的组合就是闭包
说人话：闭包就是能够读取其他函数内部变量的函数
JS引擎通过逃逸分析辨别出哪些词法环境需要存储在堆上而不是函数栈
*/
console.log(`
------------------ 闭包 ------------------
`)

// 用闭包模拟私有方法
var makeCounter = function () {
    var privateCounter = 0;
    function changeBy(val) {
        privateCounter += val;
    }
    return {
        increment: function () {
            changeBy(1);
        },
        decrement: function () {
            changeBy(-1);
        },
        value: function () {
            return privateCounter;
        }
    }
};

var Counter1 = makeCounter();
var Counter2 = makeCounter();
console.log(Counter1.value()); /* logs 0 */
Counter1.increment();
Counter1.increment();
console.log(Counter1.value()); /* logs 2 */
Counter1.decrement();
console.log(Counter1.value()); /* logs 1 */
console.log(Counter2.value()); /* logs 0 */
