const { arr } = require('../排序/shuffle')
require('../排序/insertionSort')

function binarySearch(arr, value) {
    let start = 0, end = arr.length - 1
    while (start <= end) {
        const m = Math.floor((start + end) / 2)
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

console.log('0所在的索引：', binarySearch(arr, 0))

// 时间复杂度O(logn)
// 空间复杂度O(1)