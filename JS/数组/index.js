/*
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array 
}[, thisArg])
*/
console.log(`
------------------ map() ------------------
['1', '2', '3'].map(parseInt): ${['1', '2', '3'].map(parseInt)}
`)
/*
parseInt(string, radix);
如果 radix 是 undefined、0或未指定的，JavaScript会假定以下情况：
1.如果输入的 string以 "0x"或 "0x"（一个0，后面是小写或大写的X）开头，
    那么radix被假定为16，字符串的其余部分被当做十六进制数去解析。
2.如果输入的 string以 "0"（0）开头， radix被假定为8（八进制）或10（十进制）。
    具体选择哪一个radix取决于实现。ECMAScript 5 澄清了应该使用 10 (十进制)，
    但不是所有的浏览器都支持。因此，在使用 parseInt 时，一定要指定一个 radix。
3.如果输入的 string 以任何其他值开头， radix 是 10 (十进制)。
*/

/*
var newArray = arr.flat([depth])
*/
const arr = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]
console.log(`
------------------ flat() ------------------
[1, 2, , 4, 5]: `, [1, 2, , 4, 5], `
[1, 2, , 4, 5].flat(): `, [1, 2, , 4, 5].flat(), `
[1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]].flat(Infinity):`, arr.flat(Infinity), `
`)
// 自定义flat（使用reduce和concat）
Array.prototype.myFlat = function (depth = 1) {
    if (depth > 0) {
        return this.reduce((acc, val) => acc.concat(Array.isArray(val) ? val.myFlat(depth - 1) : val), [])
    } else {
        return this.slice()
    }
}
// 使用生成器实现flat
function* gFlat(arr, depth = 1) {
    if (depth > -1) {
        for (const item of arr) {
            if (Array.isArray(item)) {
                yield* gFlat(item, depth - 1)
            } else {
                yield item
            }
        }
    } else {
        yield arr.slice()
    }
}
console.log(arr.myFlat())
console.log([...gFlat(arr, 2)])

/*
var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
    // return element for new_array
}[, thisArg])
*/
let arr1 = ["it's Sunny in", "", "California"]
console.log(`
------------------ flatMap() ------------------
["it's Sunny in", "", "California"].flatMap(x => x.split(" ")): `, arr1.flatMap(x => x.split(" ")), `
["it's Sunny in", "", "California"].map(x => x.split(" ")).flat(): `, arr1.map(x => x.split(" ")).flat(), `
`)
// flatMap比分别调用map和flat更高效