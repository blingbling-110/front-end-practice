const { arr } = require('../排序/shuffle')
require('../排序/insertionSort')

function interpolationSearch(arr, value) {
    let start = 0, end = arr.length - 1
    while (start <= end) {
        let m = Math.floor(start + (end - start) * (value - arr[start]) / (arr[end] - arr[start]))
        m = Math.max(start, m)
        m = Math.min(end, m)
        if (arr[m] < value) {
            start = m + 1
        } else if (arr[m] > value) {
            end = m - 1
        } else {
            return m
        }
    }
    return -1
}

console.log('0所在的索引：', interpolationSearch(arr, 0))

// 时间复杂度O(loglogn)，证明详见https://csaws.cs.technion.ac.il/~itai/publications/Algorithms/p550-perl.pdf
// 空间复杂度O(1)