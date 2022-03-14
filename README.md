- [ JS](#head1)
	- [ 类型](#head2)
	- [ 原型链](#head3)
	- [ 上下文和作用域](#head4)
	- [ 深浅拷贝](#head5)
	- [ 模块化](#head6)
	- [ 消抖和节流](#head7)
	- [ Promise](#head8)
	- [ Generator](#head9)
# <span id="head1"> JS</span>

## <span id="head2"> 类型</span>

- [8种基本数据类型](https://github.com/blingbling-110/front-end-practice/blob/7c0bdfacd088975866f2880c3596ecebe667662f/JS/%E7%B1%BB%E5%9E%8B/types.js#L1)
- [判断`NaN`的方法](https://github.com/blingbling-110/front-end-practice/blob/7c0bdfacd088975866f2880c3596ecebe667662f/JS/%E7%B1%BB%E5%9E%8B/types.js#L14)
- [类型转换规则](https://github.com/blingbling-110/front-end-practice/blob/7c0bdfacd088975866f2880c3596ecebe667662f/JS/%E7%B1%BB%E5%9E%8B/types.js#L22)
- [`==`运算的比较规则](https://github.com/blingbling-110/front-end-practice/blob/7c0bdfacd088975866f2880c3596ecebe667662f/JS/%E7%B1%BB%E5%9E%8B/types.js#L40)
- [对象的`Class`内部插槽](https://github.com/blingbling-110/front-end-practice/blob/7c0bdfacd088975866f2880c3596ecebe667662f/JS/%E7%B1%BB%E5%9E%8B/types.js#L60)
- [自定义`typeOf`](https://github.com/blingbling-110/front-end-practice/blob/666514717c2885804a763d39eb7af4a6da29cce7/JS/%E7%B1%BB%E5%9E%8B/types.js#L67)

## <span id="head3"> 原型链</span>

- [函数的`prototype`属性](https://github.com/blingbling-110/front-end-practice/blob/7c0bdfacd088975866f2880c3596ecebe667662f/JS/%E5%8E%9F%E5%9E%8B%E9%93%BE/prototype.js#L19)
- [对象的`Prototype`内部插槽](https://github.com/blingbling-110/front-end-practice/blob/7c0bdfacd088975866f2880c3596ecebe667662f/JS/%E5%8E%9F%E5%9E%8B%E9%93%BE/prototype.js#L4)
- [自定义`instanceOf`](https://github.com/blingbling-110/front-end-practice/blob/666514717c2885804a763d39eb7af4a6da29cce7/JS/%E5%8E%9F%E5%9E%8B%E9%93%BE/prototype.js#L26)
- [自定义`new`](https://github.com/blingbling-110/front-end-practice/blob/666514717c2885804a763d39eb7af4a6da29cce7/JS/%E5%8E%9F%E5%9E%8B%E9%93%BE/new.js#L1)
- [`new`的优先级](https://github.com/blingbling-110/front-end-practice/blob/666514717c2885804a763d39eb7af4a6da29cce7/JS/%E5%8E%9F%E5%9E%8B%E9%93%BE/new.js#L23)
- [`ES5`寄生式组合继承](https://github.com/blingbling-110/front-end-practice/blob/bd8307403f92c8fe2ea5f31ea5e4a73d16fddae7/JS/%E5%8E%9F%E5%9E%8B%E9%93%BE/extends.js#L1)
- [`ES6`语法糖继承](https://github.com/blingbling-110/front-end-practice/blob/bd8307403f92c8fe2ea5f31ea5e4a73d16fddae7/JS/%E5%8E%9F%E5%9E%8B%E9%93%BE/extends.js#L20)

## <span id="head4"> 上下文和作用域</span>

- [JS执行上下文](https://github.com/blingbling-110/front-end-practice/blob/666514717c2885804a763d39eb7af4a6da29cce7/JS/%E4%B8%8A%E4%B8%8B%E6%96%87%E5%92%8C%E4%BD%9C%E7%94%A8%E5%9F%9F/context.js#L1)
- [变量的作用域](https://github.com/blingbling-110/front-end-practice/blob/666514717c2885804a763d39eb7af4a6da29cce7/JS/%E4%B8%8A%E4%B8%8B%E6%96%87%E5%92%8C%E4%BD%9C%E7%94%A8%E5%9F%9F/scope.js#L5)
- [变量对象和`Scope`内部插槽、词法环境对象和`Environment`内部插槽](https://github.com/blingbling-110/front-end-practice/blob/e4abbedaf3914b3659a72ea6e5792c689060a126/JS/%E4%B8%8A%E4%B8%8B%E6%96%87%E5%92%8C%E4%BD%9C%E7%94%A8%E5%9F%9F/scope.js#L45)
- [闭包和模拟私有变量](https://github.com/blingbling-110/front-end-practice/blob/0bf37383d59a4244bfb5fb570edcbe0ca86dceb8/JS/%E4%B8%8A%E4%B8%8B%E6%96%87%E5%92%8C%E4%BD%9C%E7%94%A8%E5%9F%9F/closure.js#L2)
- [`this`的指向](https://github.com/blingbling-110/front-end-practice/blob/bd8307403f92c8fe2ea5f31ea5e4a73d16fddae7/JS/%E4%B8%8A%E4%B8%8B%E6%96%87%E5%92%8C%E4%BD%9C%E7%94%A8%E5%9F%9F/this.js#L4)
- [自定义`call, apply, bind`](https://github.com/blingbling-110/front-end-practice/blob/bd8307403f92c8fe2ea5f31ea5e4a73d16fddae7/JS/%E4%B8%8A%E4%B8%8B%E6%96%87%E5%92%8C%E4%BD%9C%E7%94%A8%E5%9F%9F/this.js#L23)
- [函数的柯里化](https://github.com/blingbling-110/front-end-practice/blob/bd8307403f92c8fe2ea5f31ea5e4a73d16fddae7/JS/%E4%B8%8A%E4%B8%8B%E6%96%87%E5%92%8C%E4%BD%9C%E7%94%A8%E5%9F%9F/this.js#L99)

## <span id="head5"> 深浅拷贝</span>

- [`Object.assign()`和扩展运算符](https://github.com/blingbling-110/front-end-practice/blob/0bf37383d59a4244bfb5fb570edcbe0ca86dceb8/JS/%E6%B7%B1%E6%B5%85%E6%8B%B7%E8%B4%9D/copy.js#L2)
- [`JSON`方法和`MessageChannel`](https://github.com/blingbling-110/front-end-practice/blob/0bf37383d59a4244bfb5fb570edcbe0ca86dceb8/JS/%E6%B7%B1%E6%B5%85%E6%8B%B7%E8%B4%9D/copy.js#L14)

## <span id="head6"> 模块化</span>

- [`CommonJS`](https://github.com/blingbling-110/front-end-practice/blob/baf562fe84d501e41b643812671274440ba7dde9/JS/%E6%A8%A1%E5%9D%97%E5%8C%96/CJS/index.js#L1)
- [`ES Module`](https://github.com/blingbling-110/front-end-practice/blob/baf562fe84d501e41b643812671274440ba7dde9/JS/%E6%A8%A1%E5%9D%97%E5%8C%96/ESM/index.mjs#L1)
- [`CJS`和`ESM`的差异](https://github.com/blingbling-110/front-end-practice/blob/baf562fe84d501e41b643812671274440ba7dde9/JS/%E6%A8%A1%E5%9D%97%E5%8C%96/CJS/index.js#L11)
- [`CJS`加载`ESM`模块](https://github.com/blingbling-110/front-end-practice/blob/baf562fe84d501e41b643812671274440ba7dde9/JS/%E6%A8%A1%E5%9D%97%E5%8C%96/CJS/index.js#L17)
- [`ESM`加载`CJS`模块](https://github.com/blingbling-110/front-end-practice/blob/baf562fe84d501e41b643812671274440ba7dde9/JS/%E6%A8%A1%E5%9D%97%E5%8C%96/ESM/index.mjs#L8)

## <span id="head7"> 消抖和节流</span>

- [消抖中的立即执行参数](https://github.com/blingbling-110/front-end-practice/blob/7c0bdfacd088975866f2880c3596ecebe667662f/JS/%E6%B6%88%E6%8A%96%E5%92%8C%E8%8A%82%E6%B5%81/debounce.js#L1)
- [节流中的开始执行参数和结束执行参数](https://github.com/blingbling-110/front-end-practice/blob/7c0bdfacd088975866f2880c3596ecebe667662f/JS/%E6%B6%88%E6%8A%96%E5%92%8C%E8%8A%82%E6%B5%81/throttle.js#L1)

## <span id="head8"> Promise</span>

- [`Promise/A+`规范](https://github.com/promises-aplus/promises-spec)
- [`Promise/A+`测试](https://github.com/promises-aplus/promises-tests)
- [自定义`Promise`](https://github.com/blingbling-110/front-end-practice/blob/baf562fe84d501e41b643812671274440ba7dde9/JS/Promise/index.js#L6)
- [实现`Promise`静态方法](https://github.com/blingbling-110/front-end-practice/blob/a46173fa390dcbebbd8cb3646cfdcddcb219b940/JS/Promise/index.js#L195)

## <span id="head9"> Generator</span>

- [自定义`Generator`的简单实现](https://github.com/blingbling-110/front-end-practice/blob/a46173fa390dcbebbd8cb3646cfdcddcb219b940/JS/Generator/index.js#L37)
