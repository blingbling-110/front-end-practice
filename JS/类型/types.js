console.log(`
8种基本数据类型
typeof undefined: ${typeof undefined}
typeof null: ${typeof null}
typeof false: ${typeof false}
typeof 0: ${typeof 0}
typeof 0n: ${typeof 0n}
typeof '': ${typeof ''}
typeof Symbol(): ${typeof Symbol()}
typeof {}: ${typeof {}}
typeof console.log: ${typeof console.log}

判断NaN的方法
typeof NaN: ${typeof NaN}
NaN === NaN: ${NaN === NaN}
Object.is(NaN, NaN): ${Object.is(NaN, NaN)}
isNaN(NaN): ${isNaN(NaN)}
isNaN({}): ${isNaN({})}
Number.isNaN(NaN): ${Number.isNaN(NaN)}
`)

// 对象转基本类型
const obj = {
    valueOf: () => 0,
    toString: () => '1',
    [Symbol.toPrimitive]: () => 2,
}

console.log(`
类型转换规则
1 + obj = ${1+obj}
'1' + obj = ${'1' + obj}
1 + '1' = ${1 + '1'}
2 * '2' = ${2 * '2'}
[1, 2] + [2, 1] = ${[1, 2] + [2, 1]}
'a' + + 'b' = ${'a' + + 'b'}
[] == ![]: ${[] == ![]}
`)
/* 比较运算x==y，其中x和y是值，产生true或者false。这样的比较按如下方式进行：
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