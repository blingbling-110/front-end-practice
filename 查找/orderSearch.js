const { arr } = require('../排序/shuffle')

function orderSearch(arr, value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) return i
    }
    return -1
}

console.log('0所在的索引：', orderSearch(arr, 0))

// 时间复杂度O(n)
// 空间复杂度O(1)