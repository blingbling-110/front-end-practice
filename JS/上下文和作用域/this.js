console.log(`
------------------ this ------------------
`)
function thisFoo() {
    console.log(this.thisBar)
}
var thisBar = 'window.thisBar'
thisFoo() // 指向window

const thisBaz = {
    thisBar: 'thisBaz.thisBar',
    thisFoo
}
thisBaz.thisFoo() // 指向thisBaz

const thisFooObj = new thisFoo() // 指向thisFooObj

    ; (() => () => () => console.log(this.thisBar))()()() // 指向window

console.log(`
------------------ 自定义call, apply, bind ------------------
`)
// call, bind接收参数列表；apply接收参数数组
Function.prototype.myCall = function (ctx) {
    !ctx && (ctx = window)
    // 作为ctx的临时方法调用
    ctx._tmp = this
    // 注意call接收的是参数列表
    const res = ctx._tmp(...[...arguments].slice(1))
    delete ctx._tmp
    return res
}
Function.prototype.myApply = function (ctx) {
    !ctx && (ctx = window)
    // 作为ctx的临时方法调用
    ctx._tmp = this
    let res
    if (arguments.length > 1) {
        // 有入参则传递，注意apply接收的是参数数组
        res = ctx._tmp(...arguments[1])
    } else {
        res = ctx._tmp()
    }
    delete ctx._tmp
    return res
}
Function.prototype.myBind = function (ctx) {
    !ctx && (ctx = window)
    if (typeof this !== 'function') {
        throw new TypeError('Must call on a function')
    }
    const that = this
    // bind接收参数列表
    const args = [...arguments].slice(1)
    return function F() {
        // 因为反回了一个函数，需要判断是否正通过new F()进行实例化
        if (this instanceof F) {
            return new that(...args, ...arguments)
        } else {
            // 类似于call
            ctx._tmp = that
            const res = ctx._tmp(...args, ...arguments)
            delete ctx._tmp
            return res
        }
    }
}

function Product(name, price) {
    this.name = name;
    this.price = price;
}
function Food(name, price) {
    Product.myCall(this, name, price);
    this.category = 'food';
}
console.log(new Food('cheese', 5).name);

const numbers = [5, 6, 2, 3, 7];
const max = Math.max.myApply(null, numbers);
console.log(max);
const min = Math.min.myApply(null, numbers);
console.log(min);

const module = {
    x: 42,
    getX: function () {
        return this.x;
    }
};
const unboundGetX = module.getX;
console.log(unboundGetX());
const boundGetX = unboundGetX.myBind(module);
console.log(boundGetX());

console.log(`
------------------ 柯里化 ------------------
`)
function curry(func) {
    const len = func.length
    return function F() {
        if (arguments.length < len) {
            // 参数不够则继续收集
            return F.myBind(this, ...arguments)
        } else {
            // 参数足够则调用并返回结果
            return func.myCall(this, ...arguments)
        }
    }
}

function sum(a, b, c) {
    return a + b + c;
}
let curriedSum = curry(sum);

console.log(curriedSum(1, 2, 3))
console.log(curriedSum(1)(2, 3))
console.log(curriedSum(1)(2)(3))