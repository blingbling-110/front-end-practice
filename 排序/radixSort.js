const { arr } = require('./shuffle')

function radixSort(arr) {
    const digits = Array.from({ length: 10 })
    for (let i = 0; i < digits.length; i++) {
        digits[i] = []
    }
    let max = arr[0]
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]
        }
    }
    const maxDigit = `${max}`.length
    for (let i = 0; i < maxDigit; i++) {
        for (let j = 0; j < arr.length; j++) {
            const d = Math.floor(arr[j] % 10 ** (i + 1) / 10 ** i)
            digits[d].push(arr[j])
        }
        let j = 0
        for (let k = 0; k < digits.length; k++) {
            let v = digits[k].shift()
            while (v !== undefined) {
                arr[j++] = v
                v = digits[k].shift()
            }
        }
    }
}

radixSort(arr)
console.log('排序后：', arr)

// 取最值进行了n次比较，每轮基数对arr做了2n次操作
// 总次数为n+2kn次（k为最大位数），时间复杂度O(kn)
// 空间复杂度O(n+k)