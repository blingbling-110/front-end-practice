// 8种基本数据类型，注意null和函数的typeof结果
console.log(`
------------------ 利用typeof判断类型 ------------------
typeof undefined: ${typeof undefined}
typeof null: ${typeof null}
typeof false: ${typeof false}
typeof 0: ${typeof 0}
typeof 0n: ${typeof 0n}
typeof '': ${typeof ''}
typeof Symbol(): ${typeof Symbol()}
typeof {}: ${typeof {}}
typeof console.log: ${typeof console.log}

------------------ 判断NaN的方法 ------------------
typeof NaN: ${typeof NaN}
NaN === NaN: ${NaN === NaN}
Object.is(NaN, NaN): ${Object.is(NaN, NaN)}
isNaN(NaN): ${isNaN(NaN)}
isNaN({}): ${isNaN({})}
Number.isNaN(NaN): ${Number.isNaN(NaN)}
`)

// 对象转基本类型
const obj = {
    [Symbol.toPrimitive]: () => 0, // 优先级最高
    valueOf: () => 1, // 若没有定义[Symbol.toPrimitive]，则首先会调用 valueOf 然后调用 toString
    toString: () => '2',
}

console.log(`
------------------ 类型转换规则 ------------------
1 + obj = ${1 + obj}
'1' + obj = ${'1' + obj}
1 + '1' = ${1 + '1'}
2 * '2' = ${2 * '2'}
[1, 2] + [2, 1] = ${[1, 2] + [2, 1]}
'a' + + 'b' = ${'a' + + 'b'}
[] == ![]: ${[] == ![]}
`)
/*
比较运算x==y，其中x和y是值，产生true或者false。这样的比较按如下方式进行：
1.若Type(x)与Type(y)相同，则
    a.若Type(x)为Undefined，返回true
    b.若Type(x)为Null，返回true
    c.若Type(x)为Number，则
        i.若x为NaN，返回false。反之亦然
        ii.若x与y为相等数值，返回true
        iii.若x为+0且y为-0，返回true。反之亦然
        iv.若不属于以上情况则返回false
    d.若Type(x)为String，则当x和y为完全相同的字符序列（长度相等且相同字符在相同位置）时返回true。否则，返回false
    e.若Type(x)为Boolean，当x和y为同为true或者同为false时返回true。否则，返回false
    f.当x和y为引用同一对象时返回true。否则，返回false
2.若x为null且y为undefined，返回true。反之亦然
3.若Type(x)为Number且Type(y)为String，返回比较x == ToNumber(y)的结果。反之亦然
4.若Type(x)为Boolean，返回比较ToNumber(x) == y的结果。反之亦然
5.若Type(x)为String或Number，且Type(y)为Object，返回比较x == ToPrimitive(y)的结果。反之亦然
6.若不属于以上情况则返回false
*/
/*
[] == ![]
[] == false
[] == 0,  ToNumber(false)
ToPrimitive([]), '' == 0
ToNumber(''), 0 == 0
*/

/*
利用对象的内部插槽[[Class]]
所有对象都有一个内部插槽[[Class]]，不可读，不可枚举，不可修改，不可配置。注意，这不是传统的面向对象意义上的类
两边出现__下划线__的属性都属于部分浏览器支持的属性。[[]]两个中括号括起来的属性属于JavaScript内部插槽。
JavaScript中一切皆对象，因此可以利用Object.prototype.toString()方法强制将变量转换成字符串从而暴露[[Class]]
注意：基本类型的[[Class]]为它们的包装类型的[[Class]]，undefined和null也有[[Class]]
*/
function typeOf(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}
console.log(`
------------------ 利用[[Class]]判断类型，可以与上面利用typeof判断做对比，区别在于可以分辨出null ------------------
typeOf(undefined): ${typeOf(undefined)}
typeOf(null): ${typeOf(null)}
typeOf(false): ${typeOf(false)}
typeOf(0): ${typeOf(0)}
typeOf(0n): ${typeOf(0n)}
typeOf(''): ${typeOf('')}
typeOf(Symbol()): ${typeOf(Symbol())}
typeOf({}): ${typeOf({})}
typeOf(console.log): ${typeOf(console.log)}
typeOf(NaN): ${typeOf(NaN)}
typeOf(Infinity): ${typeOf(Infinity)}
`)

console.log(`
------------------ 0.1+0.2 ------------------
0.1 + 0.2 = ${0.1 + 0.2}
0.1.toString(2) = ${0.1.toString(2)}
0.2.toString(2) = ${0.2.toString(2)}
bin2Dec('0.0100110011001100110011001100110011001100110011001100111') = ${
    binStrToDecNum('0.0100110011001100110011001100110011001100110011001100111')
}
parseFloat((0.1 + 0.2).toFixed(10)) = ${parseFloat((0.1 + 0.2).toFixed(10))}
`)
// 二进制字符串转十进制数字
function binStrToDecNum(num) {
    const numArr = num.split('.')
    const [intArr, fraArr] = [numArr[0].split(''), numArr[1] ? numArr[1].split('') : []]
    const [intLen, fraLen] = [intArr.length, fraArr.length]
    return intArr.reduce((acc, val, i) => acc + Number.parseInt(val) * 2 ** (intLen - 1 - i), 0) +
        fraArr.reduce((acc, val, i) => acc + Number.parseInt(val) * 2 ** (-1 - i), 0)
}

/*
http://people.eecs.berkeley.edu/~wkahan/ieee754status/IEEE754.PDF
JS中数字均以IEEE 754双精度表示，64位中符号位1位、指数位11位、小数位52位
注意：为了避免补码，指数位将会偏移1023，并且舍掉全0和全1
· 当指数位和小数位均全0时，表示±0（取决于符号位）
· 当指数位全0而小数位非0时，表示非规约形式的浮点数
· 当指数位全1小数位全0时，表示±Infinity（取决于符号位）
· 当指数位全1而小数位非0时，表示NaN
还要注意：规约形式的浮点数会有一个隐含的整数位1，非规约没有；非规约的指数偏移值为1022
*/
// 基于IEEE 754规范验证最大数值和最小正值
console.log('Number.MAX_VALUE', Number.MAX_VALUE === 2 ** (0b11111111110 - 1023) * (2 - 2 ** -52))
console.log('Number.MIN_VALUE', Number.MIN_VALUE === 2 ** (0 - 1022) * (2 ** -52))
// 基于IEEE 754规范很容易得出最大最小安全整数为±(2 ** 53 - 1)，即53个1（小数位全1加上隐含整数位），再大就会精度丢失