// ES5继承
function Super() { }
Super.prototype.getNum = () => 0
function Sub() { }
// 创建Super实例并添加构造函数，然后设为Sub的原型
Sub.prototype = Object.create(Super.prototype, {
    constructor: {
        value: Sub,
        enumerable: false,
        writable: true,
        configurable: true
    }
})
const sub = new Sub()
console.log(`
------------------ ES5寄生式组合继承 ------------------
sub instanceof Super: ${sub instanceof Super}
sub.getNum(): ${sub.getNum()}
`)
class MyDate extends Date {
    test() {
        return this.getTime()
    }
}
const myDate = new MyDate()
console.log(`
------------------ ES6语法糖继承 ------------------
myDate instanceof Date: ${myDate instanceof Date}
`)
// 在兼容ES6的浏览器中不报错
console.log(myDate.test())
// 若经过Babel转为ES5则会报错：
try {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var Es5MyDate = /** @class */ (function (_super) {
        __extends(MyDate, _super);
        function MyDate() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MyDate.prototype.test = function () {
            return this.getTime();
        };
        return MyDate;
    }(Date));
    var es5MyDate = new Es5MyDate();
    console.log(es5MyDate.test());
} catch (error) {
    console.log(error)
}
// 从以上转译代码可以看出ES6语法糖继承实际上是寄生式组合继承加上父类静态方法的继承

// 手动通过ES5实现MyDate
function MyEs5Date() { }
// 子类的原型的__proto__改为父类的原型
Object.setPrototypeOf(MyEs5Date.prototype, Date.prototype)
MyEs5Date.prototype.test = function () {
    return this.getTime()
}
// 先创建父类实例
const myEs5Date = new Date()
// 实例的__proto__改为子类的原型
Object.setPrototypeOf(myEs5Date, MyEs5Date.prototype)
console.log(`
------------------ 手动通过ES5实现MyDate ------------------
myEs5Date instanceof MyEs5Date: ${myEs5Date instanceof MyEs5Date}
myEs5Date instanceof Date: ${myEs5Date instanceof Date}
`)
console.log(myEs5Date.getTime())