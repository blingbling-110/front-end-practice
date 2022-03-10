function Foo() { }
const foo = new Foo()

// __proto__属性指向[[prototype]]内部属性
console.log('Foo.prototype: ', Foo.prototype)
console.log('Object.getPrototypeOf(foo) === foo.__proto__: ', Object.getPrototypeOf(foo) === foo.__proto__)
console.log('Foo.prototype === foo.__proto__: ', Foo.prototype === foo.__proto__)
console.log('Foo.prototype.constructor === Foo: ', Foo.prototype.constructor === Foo)
console.log('Foo.__proto__ === Function.prototype: ', Foo.__proto__ === Function.prototype)
console.log('Function.__proto__ === Function.prototype: ', Function.__proto__ === Function.prototype)
console.log('Function.prototype.__proto__ === Object.prototype: ', Function.prototype.__proto__ === Object.prototype)
console.log('Object.prototype.__proto__ === null: ', Object.prototype.__proto__ === null)
console.log(`foo对象的原型链：
foo.__proto__ -> Foo.prototype
foo.__proto__.__proto__ -> Object.prototype
foo.__proto__.__proto__.__proto__ -> null
`)

// 注意：除了箭头函数没有prototype属性以外，Function.prototype.bind()也没有prototype属性
console.log('Function.prototype.bind().prototype: ', Function.prototype.bind().prototype)
// 注意：Function.prototype是一个函数，并且是JS引擎创建出来的，而不是实例化出来的
console.log('Function.prototype: ', Function.prototype)
console.log('typeof Function.prototype: ', typeof Function.prototype)
// 此外，还有一个对象也是JS引擎创建出来的，那就是Object.prototype，因此也就不存在鸡生蛋蛋生鸡问题