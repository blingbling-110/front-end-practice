const { arr } = require('../排序/shuffle')
require('../排序/insertionSort')

function fibSearch(arr, value) {
    const n = arr.length
    let start = 0, end = n - 1

    // 构造长度大于n的斐波拉契数列
    const fib = [0, 1]
    for (let i = 2; i < n + 5; i++) {
        fib[i] = fib[i - 1] + fib[i - 2]
    }

    let i = 0
    while (fib[i] < n) {
        i++
    }
    for (let j = end; j < fib[i] - 1; j++) { // 补全arr
        arr[j] = arr[end]
    }

    while (start <= end) {
        const m = start + fib[i - 1] - 1
        if (arr[m] < value) {
            start = m + 1
            i -= 2
        } else if (arr[m] > value) {
            end = m - 1
            i -= 1
        } else {
            return Math.min(m, n - 1)
        }
    }
    return -1
}

console.log('0所在的索引：', fibSearch(arr, 0))

// 时间复杂度O(logn)
// 空间复杂度O(n)