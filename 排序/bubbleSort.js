const { arr } = require('./shuffle')

const bubbleSort = arr => {
    for (let i = arr.length - 1; i > 0; i--) { // i代表未排好序数组的结束索引
        for (let j = 0; j < i; j++) { // j代表未排好序数组的起始索引
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]] // 将大数逐一冒泡至数组尾部
            }
        }
    }
}

bubbleSort(arr)
console.log('排序后：', arr)

// 两层循环，时间复杂度O(n∧2)
// 没有利用额外空间，空间复杂度O(1)