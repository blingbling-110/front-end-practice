const { arr } = require('./shuffle')

const selectionSort = arr => {
    for (let i = 0; i < arr.length - 1; i++) { // i代表未排好序数组的起始索引
        let t = i // t代表较小数的索引
        for (let j = i + 1; j < arr.length; j++) { // j代表与t位比较的数的索引
            if (arr[t] > arr[j]) {
                t = j // 较较小数的索引赋给t
            }
        }
        [arr[i], arr[t]] = [arr[t], arr[i]] // 每轮比较最后才将t位与i位交换
    }
}

selectionSort(arr)
console.log('排序后：', arr)

// 两层循环，时间复杂度O(n∧2)
// 没有利用额外空间，空间复杂度O(1)