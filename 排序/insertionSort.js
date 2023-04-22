const { arr } = require('./shuffle')

const insertionSort = arr => {
    for (let i = 1; i < arr.length; i++) { // i代表被排序数的索引
        const v = arr[i]
        for (let j = i - 1; j >= 0; j--) { // j代表已排序数组的结束索引
            if (arr[j] > v) {
                arr[j + 1] = arr[j] // 若j位更大，则依次往后挪位
                if (j === 0) {
                    arr[j] = v // 若所有已排序数组中的数都更大，则将i位赋给首位
                    break
                }
            } else {
                arr[j + 1] = v // 若j位不大于i位，则将i位赋给j+1位
                break
            }
        }
    }
}

insertionSort(arr)
console.log('排序后：', arr)

// 两层循环，时间复杂度O(n^2)
// 没有利用额外空间，空间复杂度O(!)